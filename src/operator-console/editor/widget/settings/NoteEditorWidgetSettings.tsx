import { Text } from 'react-native'

import { AutoComplete } from '../../../common/AutoComplete'
import { ColorPicker } from '../../../common/ColorPicker'
import { Divider } from '../../../common/Divider'
import { InputNumber } from '../../../common/InputNumber'
import { i18n } from '../../../i18n'
import { OCUtil } from '../../../OCUtil'
import { BrekekeOperatorConsole } from '../../../OperatorConsole'
import { EditorWidgetSettings } from './EditorWidgetSettings'

export class NoteEditorWidgetSettings extends EditorWidgetSettings {
  constructor(props) {
    super(props)
    this.state = {
      nameOptions: [],
    }
  }

  componentDidMount() {
    super.componentDidMount()
    const oc = BrekekeOperatorConsole.getStaticInstance()
    const getNoteNamesOptions = {
      methodName: 'getNoteNames',
      methodParams: JSON.stringify({ tenant: oc.getLoggedinTenant() }),
      onSuccessFunction: names => {
        this.setState({ nameOptions: names.map(value => ({ value })) })
      },
      onFailFunction: errOrResponse => {
        // !testit
        OCUtil.logErrorWithNotification(
          'Failed to get note names.',
          i18n.t('Failed_to_get_note_names'),
          errOrResponse,
        )
      },
    }
    oc.getPalRestApi().callPalRestApiMethod(getNoteNamesOptions)
  }

  // componentDidUpdate(){
  //     super.componentDidUpdate();
  //     const widgetData = this._getWidgetData();
  //     if( this._latestWidgetData !== widgetData  ){
  //
  //     }
  //     this._latestWidgetData = widgetData;
  // }

  // componentDidUpdate() {
  //     super.componentDidUpdate();
  //     const oc = BrekekeOperatorConsole.getStaticInstance();
  //     oc.getNoteNames().then((names) => {
  //         this.setState({ nameOptions: names.map((value) => ({ value })) });
  //     })
  // }

  _onChangeNoteName(noteName) {
    // const noteName = e.currentTarget.value;
    this._getWidgetData().setNoteName(noteName)
    this.getEditScreenViewAsParent().setState({ rerender: true })
    const oc = BrekekeOperatorConsole.getStaticInstance()
    const getNoteNamesOptions = {
      methodName: 'getNoteNames',
      methodParams: JSON.stringify({ tenant: oc.getLoggedinTenant() }),
      onSuccessFunction: names => {
        this.setState({ nameOptions: names.map(value => ({ value })) })
      },
      onFailFunction: errOrResponse => {
        // !testit
        OCUtil.logErrorWithNotification(
          'Failed to get note names.',
          i18n.t('Failed_to_get_note_names'),
          errOrResponse,
        )
      },
    }
    oc.getPalRestApi().callPalRestApiMethod(getNoteNamesOptions)
  }

  _onChangeNoteTitleFontSize(n) {
    const widgetData = this._getWidgetData()
    widgetData.setNoteTitleFontSize(n)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeNoteBodyFontSize(n) {
    const widgetData = this._getWidgetData()
    widgetData.setNoteBodyFontSize(n)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  getEditScreenViewAsParent() {
    return this._EditScreenViewAsParent
  }

  _onChangeNoteNameFgColor(color) {
    const widgetData = this._getWidgetData()
    widgetData.setNoteNameFgColor(color)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeNoteNameBgColor(color) {
    const widgetData = this._getWidgetData()
    widgetData.setNoteNameBgColor(color)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeNoteTextFgColor(color) {
    const widgetData = this._getWidgetData()
    widgetData.setNoteTextFgColor(color)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeNoteBgStartColor(color) {
    const widgetData = this._getWidgetData()
    widgetData.setNoteBgStartColor(color)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeNoteBgEndColor(color) {
    const widgetData = this._getWidgetData()
    widgetData.setNoteBgEndColor(color)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeNoteBorderRadius(n) {
    const widgetData = this._getWidgetData()
    widgetData.setNoteBorderRadius(n)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  // !override
  _getRenderMainJsx() {
    const widgetData = this._getWidgetData()
    const noteName = widgetData.getNoteName()
    const jsx = (
      <>
        <Text>{i18n.t('borderRadius')}</Text>
        <InputNumber
          min='0'
          value={widgetData.getNoteBorderRadius()}
          onChange={n => this._onChangeNoteBorderRadius(n)}
        />
        <Divider>{i18n.t('Note_name_settings')}</Divider>
        <Text>{i18n.t('Name')}</Text>
        <AutoComplete
          value={noteName}
          options={this.state.nameOptions}
          onChange={v => this._onChangeNoteName(v)}
          style={{ width: '100%' }}
        />
        <Text>{i18n.t('Text_size')}</Text>
        <InputNumber
          min='0'
          value={widgetData.getNoteTitleFontSize()}
          onChange={n => this._onChangeNoteTitleFontSize(n)}
        />
        <Text>{i18n.t('fgColor')}</Text>
        <ColorPicker
          color={widgetData.getNoteNameFgColor()}
          onColorChange={color => this._onChangeNoteNameFgColor(color)}
        />
        <Text>{i18n.t('bgColor')}</Text>
        <ColorPicker
          color={widgetData.getNoteNameBgColor()}
          onColorChange={color => this._onChangeNoteNameBgColor(color)}
        />
        <Divider>{i18n.t('noteText_settings')}</Divider>
        <Text>{i18n.t('Text_size')}</Text>
        <InputNumber
          min='0'
          value={widgetData.getNoteBodyFontSize()}
          onChange={n => this._onChangeNoteBodyFontSize(n)}
        />
        <Text>{i18n.t('fgColor')}</Text>
        <ColorPicker
          color={widgetData.getNoteTextFgColor()}
          onColorChange={color => this._onChangeNoteTextFgColor(color)}
        />
        <Text>{i18n.t('startBgColor')}</Text>
        <ColorPicker
          color={widgetData.getNoteBgStartColor()}
          onColorChange={color => this._onChangeNoteBgStartColor(color)}
        />
        <Text>{i18n.t('endBgColor')}</Text>
        <ColorPicker
          color={widgetData.getNoteBgEndColor()}
          onColorChange={color => this._onChangeNoteBgEndColor(color)}
        />
      </>
    )
    return jsx
  }
}
