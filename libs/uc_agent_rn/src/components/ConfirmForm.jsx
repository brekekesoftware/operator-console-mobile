import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { int, string } from '../utilities/strings'
import TextBox from './TextBox'

const colors = {
  darkGray: '#666666',
}

const styles = StyleSheet.create({
  confirmForm: {
    paddingTop: 8,
    paddingHorizontal: 32,
  },
  confirmMessage: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 31.2, // 2.4 * 13
    letterSpacing: 0.3,
    color: colors.darkGray,
  },
  textInput: {
    marginTop: 8,
  },
})

/**
 * ConfirmForm
 * props.uiData
 * props.params
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: string(props.params && props.params.text),
    }
    this.textInputRef = React.createRef()
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.textInputRef.current) {
        this.textInputRef.current.focus()
      }
    }, 100)
  }

  handleTextChange = text => {
    this.setState({ text: string(text) })
  }

  render() {
    const { props } = this

    return (
      <View style={styles.confirmForm}>
        <Text style={styles.confirmMessage}>
          {string(props.params && props.params.message)}
        </Text>
        <TextBox
          ref={this.textInputRef}
          style={styles.textInput}
          value={this.state.text}
          placeholder={string(props.params && props.params.placeholder)}
          autoCapitalize={props.params && props.params.autoCapitalize}
          onChangeText={this.handleTextChange}
        />
      </View>
    )
  }
}
