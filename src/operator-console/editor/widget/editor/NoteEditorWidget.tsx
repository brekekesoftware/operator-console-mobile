import { ActivityIndicator, Input } from '@ant-design/react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import debounce from 'debounce'
import { Platform, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import { Empty } from '../../../common/Empty'
import { BrekekeOperatorConsole } from '../../../OperatorConsole'
import { Util } from '../../../Util'
import { EditorWidget } from './EditorWidget'

export class NoteEditorWidget extends EditorWidget {
  _readonly
  state
  _lastNoteName
  constructor(props) {
    super(props)
    this._readonly = false
    this.state = { loading: false, content: '' }
  }

  componentDidMount() {
    super.componentDidMount()
    const oc = BrekekeOperatorConsole.getStaticInstance()
    const widgetData = this.getWidgetData()
    const noteName = widgetData.getNoteName()
    if (noteName) {
      const getNoteOptions = {
        methodName: 'getNote',
        methodParams: JSON.stringify({
          tenant: oc.getLoggedinTenant(),
          name: noteName,
        }),
        onSuccessFunction: res => {
          if (res) {
            const note = res['note']
            const useraccess = res['useraccess']
            this._readonly = useraccess != 2
            this._lastNoteName = noteName
            this.setState({ loading: false, content: note })
          } else {
            // Note not found.
            this._lastNoteName = noteName
            this.setState({ loading: false })
          }
        },
        onFailFunction: errorOrResponse => {
          console.log('Failed  to getNote.', errorOrResponse)
          this._lastNoteName = noteName
          // this._readonly = true;
          // throw err;
          this.setState({ loading: false, content: '', error: true })
        },
      }
      oc.getPalRestApi().callPalRestApiMethod(getNoteOptions)
      this.setState({ loading: true, saving: false, error: false })
    }
  }

  componentDidUpdate() {
    super.componentDidUpdate()

    const oc = BrekekeOperatorConsole.getStaticInstance()

    const widgetData = this.getWidgetData()
    const noteName = widgetData.getNoteName()
    if (
      this.state.loading === false &&
      noteName &&
      this._lastNoteName !== noteName
    ) {
      const getNoteOptions = {
        methodName: 'getNote',
        methodParams: JSON.stringify({
          tenant: oc.getLoggedinTenant(),
          name: noteName,
        }),
        onSuccessFunction: res => {
          if (res) {
            const note = res['note']
            const useraccess = res['useraccess']
            this._readonly = useraccess != 2
            this._lastNoteName = noteName
            this.setState({ loading: false, content: note })
          } else {
            // Note not found.
            this._lastNoteName = noteName
            this.setState({ loading: false })
          }
        },
        onFailFunction: errorOrResponse => {
          console.log('Failed  to getNote.', errorOrResponse)
          this._lastNoteName = noteName
          this._readonly = false
          // throw err;
          this.setState({ loading: false, content: '', error: true })
        },
      }
      oc.getPalRestApi().callPalRestApiMethod(getNoteOptions)
      this.setState({ loading: true })
    }
  }

  _setNoteDebounced = debounce(() => {
    const oc = BrekekeOperatorConsole.getStaticInstance()
    const widgetData = this.getWidgetData()
    const noteName = widgetData.getNoteName()

    if (noteName) {
      const setNoteOptions = {
        methodName: 'setNote',
        methodParams: JSON.stringify({
          tenant: oc.getLoggedinTenant(),
          name: noteName,
          description: '',
          useraccess: BrekekeOperatorConsole.PAL_NOTE_USERACCESSES.ReadWrite,
          note: this.state.content,
        }),
        onSuccessFunction: res => {
          this.setState({ saving: false })
        },
        onFailFunction: errOrResponse => {
          this.setState({ error: true })
        },
      }
      oc.getPalRestApi().callPalRestApiMethod(setNoteOptions)
    }
  }, 500)

  _onContentChanged = e => {
    const content = e.target.value
    this.setState({ content, saving: true, error: false }, () =>
      this._setNoteDebounced(),
    )
  }

  // !overload
  _getRenderMainJsx() {
    const widgetData = this.getWidgetData()
    const noteName = widgetData.getNoteName()
    const noteTitleFontSize = widgetData.getNoteTitleFontSize()
      ? widgetData.getNoteTitleFontSize()
      : 14
    const noteBodyFontSize = widgetData.getNoteBodyFontSize()
      ? widgetData.getNoteBodyFontSize()
      : 14
    const noteNameFgColor = Util.getRgbaCSSStringFromAntdColor(
      widgetData.getNoteNameFgColor(),
      '',
    )
    const noteNameBackground = Util.getRgbaCSSStringFromAntdColor(
      widgetData.getNoteNameBgColor(),
      '#f2dc50',
    )

    const borderRadius =
      widgetData.getNoteBorderRadius() || widgetData.getNoteBorderRadius() === 0
        ? widgetData.getNoteBorderRadius()
        : 3 // !default
    const noteTextForegroundColor = Util.getRgbaCSSStringFromAntdColor(
      widgetData.getNoteTextFgColor(),
      '',
    )
    const background =
      widgetData.getNoteBgStartColor() && widgetData.getNoteBgEndColor()
        ? 'linear-gradient(' +
          Util.getRgbaCSSStringFromAntdColor(
            widgetData.getNoteBgStartColor(),
            '',
          ) +
          ',' +
          Util.getRgbaCSSStringFromAntdColor(
            widgetData.getNoteBgEndColor(),
            '',
          ) +
          ')'
        : ''

    return (
      <LinearGradient
        colors={['#F9EFAF', '#F7E98D']}
        style={{
          borderRadius,
          backgroundColor: background,
          width: '100%',
          height: '100%',
        }}
      >
        <View
          style={{
            borderRadius,
            backgroundColor: background,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              padding: 4,
              backgroundColor: noteNameBackground,
            }}
          >
            <Text
              style={{
                color: noteNameFgColor,
                fontSize: noteTitleFontSize,
                fontWeight: 'bold',
              }}
            >
              {noteName}
            </Text>
          </View>
          {this.state.loading ? (
            <Empty image={null} description={<ActivityIndicator />} />
          ) : Platform.OS === 'web' ? (
            <Input
              value={this.state.content}
              onChange={this._onContentChanged}
              readOnly={this._readonly}
              maxLength={10000000}
              multiline
              styles={{
                input: { width: '100%', height: '100%', overflow: 'scroll' },
              }}
              style={{ flex: 1 }}
              // autoSize={{ maxRows: 30, minRows: 2 }}
              // style={{
              //   fontSize: noteBodyFontSize,
              //   color: noteTextForegroundColor,
              // }}
            />
          ) : (
            <Input.TextArea
              value={this.state.content}
              onChange={this._onContentChanged}
              readOnly={this._readonly}
              maxLength={10000000}
              multiline
              autoSize={{ maxRows: 30, minRows: 2 }}
              // style={{
              //   fontSize: noteBodyFontSize,
              //   color: noteTextForegroundColor,
              // }}
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
      </LinearGradient>
    )
  }
}
