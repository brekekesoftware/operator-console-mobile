import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Empty, Spin } from 'antd'
import { debounce } from 'lodash'
import { Component } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

import { Util } from '../Util'
import { NoteGradient } from './NoteGradient'

type NoteProps = {
  context: any
  noteName: string
  noteNameFgColor: string
  noteNameBgColor: string
  noteBorderRadius: number
  noteTextFgColor: string
  noteBgStartColor: string
  noteBgEndColor: string
}

type NoteState = {
  content: string
  loading: boolean
  saving: boolean
  error: boolean
  readonly: boolean
}

export class Note extends Component<NoteProps, NoteState> {
  constructor(props) {
    super(props)
    this.state = {
      content: '',
      loading: false,
      saving: false,
      error: false,
      readonly: true,
    }
  }

  componentDidMount() {
    if (this.props.context?.getNote) {
      this.setState({ loading: true })
      this.props.context
        .getNote(this.props.noteName)
        .then(({ note, useraccess }) => {
          this.setState({
            content: note,
            loading: false,
            readonly: useraccess != 2,
          })
        })
        .catch(err => {
          console.error('Failed  to getNote.', err)
          this.setState({ error: true })
          throw err
        })
    }
  }

  _setNoteDebounced = debounce(() => {
    if (this.props.context?.setNote) {
      this.props.context
        .setNote(this.props.noteName, this.state.content)
        .then(() => this.setState({ saving: false }))
        .catch(() => this.setState({ error: true }))
    }
  }, 500)

  onContentChanged = e => {
    this.setState({ content: e.target.value, saving: true, error: false })
    this._setNoteDebounced()
  }

  render() {
    const noteNameFgColor = Util.getRgbaCSSStringFromAntdColor(
      this.props.noteNameFgColor,
      '',
    )
    const noteNameBackground = Util.getRgbaCSSStringFromAntdColor(
      this.props.noteNameBgColor,
      '',
    )

    const borderRadius = this.props.noteBorderRadius
      ? this.props.noteBorderRadius
      : 3 // !default
    const noteTextForegroundColor = Util.getRgbaCSSStringFromAntdColor(
      this.props.noteTextFgColor,
      '',
    )
    const background =
      this.props.noteBgStartColor && this.props.noteBgEndColor
        ? 'linear-gradient(' +
          Util.getRgbaCSSStringFromAntdColor(this.props.noteBgStartColor, '') +
          ',' +
          Util.getRgbaCSSStringFromAntdColor(this.props.noteBgEndColor, '') +
          ')'
        : ''

    return (
      <NoteGradient>
        <View
          style={[
            styles.container,
            { backgroundColor: background, borderRadius },
          ]}
        >
          <View
            style={[styles.noteName, { backgroundColor: noteNameBackground }]}
          >
            <Text style={{ color: noteNameFgColor }}>
              {this.props.noteName}
            </Text>
          </View>
          {this.state.loading ? (
            <Empty image={null} description={<Spin />} />
          ) : (
            <TextInput
              value={this.state.content}
              onChange={this.onContentChanged}
              style={{
                color: noteTextForegroundColor,
              }}
              multiline
              numberOfLines={4}
            />
          )}
          {(this.state.error || this.state.saving) && (
            <FontAwesomeIcon
              icon='fa-solid fa-cloud-arrow-up'
              color={this.state.error ? '#FF4526' : 'black'}
              style={{ position: 'absolute', top: 10, right: 12 }}
            />
          )}
        </View>
      </NoteGradient>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 3,
    overflow: 'hidden',
    width: '100%',
    height: '100%',
  },
  noteName: {
    padding: 4,
    backgroundColor: '#f2dc50',
  },
})
