import { ActivityIndicator, Input } from '@ant-design/react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import debounce from 'debounce'
import { Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import { Empty } from '../../../common/Empty'
import { BrekekeOperatorConsole } from '../../../OperatorConsole'
import { Util } from '../../../Util'
import { RuntimeWidget } from './RuntimeWidget'

export class NoteRuntimeWidget extends RuntimeWidget {
  _readonly: boolean
  _lastNoteName: string = ''
  constructor(props) {
    super(props)
    this._readonly = true
    let loading = false

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
            const useraccess = res['useraccess']
            const note = res['note']
            this._readonly = useraccess != 2
            this._lastNoteName = noteName
            this.setState({ loading: false, content: note })
          } else {
            this._lastNoteName = noteName
            this.setState({ loading: false })
          }
        },
        onFailFunction: errorOrResponse => {
          console.log('Failed  to getNote.', errorOrResponse)
          this._lastNoteName = noteName
          this._readonly = true
          // throw err;
          this.setState({ loading: false, content: '', error: true })
        },
      }
      oc.getPalRestApi().callPalRestApiMethod(getNoteOptions)
      loading = true
    }
    this.state = { content: '', loading, saving: false, error: false }
  }

  componentDidMount() {
    super.componentDidMount()
    const widgetData = this.getWidgetData()
    const noteName = widgetData.getNoteName()
    const oc = BrekekeOperatorConsole.getStaticInstance()
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
            const useraccess = res['useraccess']
            const note = res['note']
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
          // !testit
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
      '',
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
      <LinearGradient colors={['#F9EFAF', '#F7E98D']}>
        <View
          style={{
            borderRadius,
            backgroundColor: background,
            overflow: 'hidden',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
          }}
        >
          <View
            style={{
              backgroundColor: noteNameBackground ?? '#f2dc50',
              padding: 3,
            }}
          >
            <Text
              style={{
                fontSize: noteTitleFontSize,
                color: noteNameFgColor,
                lineHeight: 1.5,
              }}
            >
              {noteName}
            </Text>
          </View>
          {this.state.loading ? (
            <Empty image={null} description={<ActivityIndicator />} />
          ) : (
            <Input.TextArea
              value={this.state.content}
              onChange={this._onContentChanged}
              onFocus={() => {
                const oc = BrekekeOperatorConsole.getStaticInstance()
                oc.addDisableKeydownToDialingCounter()
                oc.addDisablePasteToDialingCounter()
              }}
              onBlur={() => {
                const oc = BrekekeOperatorConsole.getStaticInstance()
                oc.subtractDisableKeydownToDialingCounter()
                oc.subtractDisablePasteToDialingCounter()
              }}
              readOnly={this._readonly}
              maxLength={10000000}
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
