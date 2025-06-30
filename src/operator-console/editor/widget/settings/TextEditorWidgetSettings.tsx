import { Input } from '@ant-design/react-native'
import { Platform, Text } from 'react-native'

import { ColorPicker } from '../../../common/ColorPicker'
import { InputNumber } from '../../../common/InputNumber'
import { i18n } from '../../../i18n'
import { EditorWidgetSettings } from './EditorWidgetSettings'

export class TextEditorWidgetSettings extends EditorWidgetSettings {
  constructor(props) {
    super(props)
  }

  _onChangeTextFontSize(n) {
    const widgetData = this._getWidgetData()
    widgetData.setTextFontSize(n)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeTextFgColor(color) {
    const widgetData = this._getWidgetData()
    widgetData.setTextFgColor(color)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeTextBgColor(color) {
    const widgetData = this._getWidgetData()
    widgetData.setTextBgColor(color)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeTextBorderRadius(n) {
    const widgetData = this._getWidgetData()
    widgetData.setTextBorderRadius(n)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeTextArea(e) {
    const text = e.currentTarget.value
    this._getWidgetData().setText(text)
    this.getEditScreenViewAsParent().setState({ rerender: true })
  }

  getEditScreenViewAsParent() {
    return this._EditScreenViewAsParent
  }

  // !override
  _getRenderMainJsx() {
    const widgetData = this._getWidgetData()
    const jsx = (
      <>
        <Text>{i18n.t('text')}</Text>
        {Platform.OS === 'web' ? (
          <Input
            multiline
            style={{
              width: '100%',
              height: 160,
              borderWidth: 1,
              borderColor: '#efefef',
              borderRadius: 4,
              padding: 10,
              alignItems: 'flex-start',
            }}
            styles={{
              input: { width: '100%', height: '100%', overflow: 'scroll' },
            }}
            value={widgetData.getText()}
            onChange={e => this._onChangeTextArea(e)}
          />
        ) : (
          <Input.TextArea
            style={{
              width: '100%',
              height: 160,
              borderWidth: 1,
              borderColor: '#efefef',
              borderRadius: 4,
              padding: 10,
            }}
            value={widgetData.getText()}
            onChange={e => this._onChangeTextArea(e)}
          />
        )}

        <Text>{i18n.t('Text_size')}</Text>
        <InputNumber
          min='0'
          value={widgetData.getTextFontSize()}
          onChange={n => this._onChangeTextFontSize(n)}
        />
        <Text>{i18n.t('fgColor')}</Text>
        <ColorPicker
          color={widgetData.getTextFgColor()}
          onColorChangeComplete={color => this._onChangeTextFgColor(color)}
        />
        <Text>{i18n.t('bgColor')}</Text>
        <ColorPicker
          color={widgetData.getTextBgColor()}
          onColorChangeComplete={color => this._onChangeTextBgColor(color)}
        />
        <Text>{i18n.t('borderRadius')}</Text>
        <InputNumber
          min='0'
          value={widgetData.getTextBorderRadius()}
          onChange={n => this._onChangeTextBorderRadius(n)}
        />
      </>
    )
    return jsx
  }
}
