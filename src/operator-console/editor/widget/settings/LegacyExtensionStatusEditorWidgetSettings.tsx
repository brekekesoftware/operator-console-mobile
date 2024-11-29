import { Input } from '@ant-design/react-native'
import { Text } from 'react-native'

import { ColorPicker } from '../../../common/ColorPicker'
import { InputNumber } from '../../../common/InputNumber'
import { i18n } from '../../../i18n'
import { EditorWidgetSettings } from './EditorWidgetSettings'

export class LegacyExtensionStatusEditorWidgetSettings extends EditorWidgetSettings {
  constructor(props) {
    super(props)
  }

  _onChangeExtension(e) {
    const extension = e.currentTarget.value
    this._getWidgetData().setExtension(extension)
    this.getEditScreenViewAsParent().setState({ rerender: true })
  }

  _onChangeExtensionStatusFgColor(color) {
    const widgetData = this._getWidgetData()
    widgetData.setExtensionStatusFgColor(color)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeExtensionStatusLampSize(size) {
    const widgetData = this._getWidgetData()
    widgetData.setExtensionStatusLampSize(size)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeExtensionStatusExtensionFontSize(size) {
    const widgetData = this._getWidgetData()
    widgetData.setExtensionStatusExtensionFontSize(size)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeExtensionStatusExtensionTextTopMargin(size) {
    const widgetData = this._getWidgetData()
    widgetData.setExtensionStatusExtensionTextTopMargin(size)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  getEditScreenViewAsParent() {
    return this._EditScreenViewAsParent
  }

  // !override
  _getRenderMainJsx() {
    const widgetData = this._getWidgetData()
    const jsx = (
      <>
        <Text>{i18n.t('extension')}</Text>
        <Input
          value={widgetData.getExtension()}
          onChange={e => this._onChangeExtension(e)}
        />
        <Text>{i18n.t('fgColor')}</Text>
        <ColorPicker
          color={widgetData.getExtensionStatusFgColor()}
          onColorChange={color => this._onChangeExtensionStatusFgColor(color)}
        />
        <Text>{i18n.t('Lamp_size')}</Text>
        <InputNumber
          min={0}
          value={widgetData.getExtensionStatusLampSize()}
          onChange={val => this._onChangeExtensionStatusLampSize(val)}
        />
        <Text>{i18n.t('Text_top_margin')}</Text>
        <InputNumber
          value={widgetData.getExtensionStatusExtensionTextTopMargin()}
          onChange={val =>
            this._onChangeExtensionStatusExtensionTextTopMargin(val)
          }
        />
        <Text>{i18n.t('Text_size')}</Text>
        <InputNumber
          min={0}
          value={widgetData.getExtensionStatusExtensionFontSize()}
          onChange={val => this._onChangeExtensionStatusExtensionFontSize(val)}
        />
      </>
    )
    return jsx
  }
}
