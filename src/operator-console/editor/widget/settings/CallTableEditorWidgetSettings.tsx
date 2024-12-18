import { Text } from 'react-native'

import { ColorPicker } from '../../../common/ColorPicker'
import { Divider } from '../../../common/Divider'
import { InputNumber } from '../../../common/InputNumber'
import { i18n } from '../../../i18n'
import { EditorWidgetSettings } from './EditorWidgetSettings'

export class CallTableEditorWidgetSettings extends EditorWidgetSettings {
  _onChangeCalltableBgColor(color) {
    const widgetData = this._getWidgetData()
    widgetData.setCalltableBgColor(color)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeCalltableOuterBorderThickness(n) {
    const widgetData = this._getWidgetData()
    widgetData.setCalltableOuterBorderThickness(n)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeCalltableOuterBorderColor(color) {
    const widgetData = this._getWidgetData()
    widgetData.setCalltableOuterBorderColor(color)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeCalltableOuterBorderRadius(n) {
    const widgetData = this._getWidgetData()
    widgetData.setCalltableOuterBorderRadius(n)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeCalltableHeaderFgColor(color) {
    const widgetData = this._getWidgetData()
    widgetData.setCalltableHeaderFgColor(color)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeCalltableHeaderRowUnderlineThickness(n) {
    const widgetData = this._getWidgetData()
    widgetData.setCalltableHeaderRowUnderlineThickness(n)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeCalltableHeaderRowUnderlineColor(color) {
    const widgetData = this._getWidgetData()
    widgetData.setCalltableHeaderRowUnderlineColor(color)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeCalltableBodyFgColor(color) {
    const widgetData = this._getWidgetData()
    widgetData.setCalltableBodyFgColor(color)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeCalltableBodyRowUnderlineThickness(n) {
    const widgetData = this._getWidgetData()
    widgetData.setCalltableBodyRowUnderlineThickness(n)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeCalltableBodyRowUnderlineColor(color) {
    const widgetData = this._getWidgetData()
    widgetData.setCalltableBodyRowUnderlineColor(color)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeCalltableBodyActiveRowBgColor(color) {
    const widgetData = this._getWidgetData()
    widgetData.setCalltableBodyActiveRowBgColor(color)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeCalltableHeaderFontSize(size) {
    const widgetData = this._getWidgetData()
    widgetData.setCalltableHeaderFontSize(size)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeCalltableBodyFontSize(size) {
    const widgetData = this._getWidgetData()
    widgetData.setCalltableBodyFontSize(size)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeCalltableActiveButtonWidth(n) {
    const widgetData = this._getWidgetData()
    widgetData.setCalltableActiveButtonWidth(n)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeCalltableActiveButtonHeight(n) {
    const widgetData = this._getWidgetData()
    widgetData.setCalltableActiveButtonHeight(n)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeCalltableActiveButtonFontSize(size) {
    const widgetData = this._getWidgetData()
    widgetData.setCalltableActiveButtonFontSize(size)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  // !override
  _getRenderMainJsx() {
    const widgetData = this._getWidgetData()
    const jsx = (
      <>
        <Text>{i18n.t('bgColor')}</Text>
        <ColorPicker
          color={widgetData.getCalltableBgColor()}
          onColorChangeComplete={color => this._onChangeCalltableBgColor(color)}
        />
        <Text>{i18n.t('outerBorderThickness')}</Text>
        <InputNumber
          min='0'
          value={widgetData.getCalltableOuterBorderThickness()}
          onChange={n => this._onChangeCalltableOuterBorderThickness(n)}
        />
        <Text>{i18n.t('outerBorderColor')}</Text>
        <ColorPicker
          color={widgetData.getCalltableOuterBorderColor()}
          onColorChangeComplete={color =>
            this._onChangeCalltableOuterBorderColor(color)
          }
        />
        <Text>{i18n.t('outerBorderRadius')}</Text>
        <InputNumber
          min='0'
          value={widgetData.getCalltableOuterBorderRadius()}
          onChange={n => this._onChangeCalltableOuterBorderRadius(n)}
        />
        <Divider>{i18n.t('header_settings')}</Divider>
        <Text>{i18n.t('Text_size')}</Text>
        <InputNumber
          min='0'
          value={widgetData.getCalltableHeaderFontSize()}
          onChange={size => this._onChangeCalltableHeaderFontSize(size)}
        />
        <Text>{i18n.t('fgColor')}</Text>
        <ColorPicker
          color={widgetData.getCalltableHeaderFgColor()}
          onColorChangeComplete={color =>
            this._onChangeCalltableHeaderFgColor(color)
          }
        />
        <Text>{i18n.t('rowUnderlineThickness')}</Text>
        <InputNumber
          min='0'
          value={widgetData.getCalltableHeaderRowUnderlineThickness()}
          onChange={n => this._onChangeCalltableHeaderRowUnderlineThickness(n)}
        />
        <Text>{i18n.t('rowUnderlineColor')}</Text>
        <ColorPicker
          color={widgetData.getCalltableHeaderRowUnderlineColor()}
          onColorChangeComplete={color =>
            this._onChangeCalltableHeaderRowUnderlineColor(color)
          }
        />
        <Divider>{i18n.t('body_settings')}</Divider>
        <Text>{i18n.t('Text_size')}</Text>
        <InputNumber
          min='0'
          value={widgetData.getCalltableBodyFontSize()}
          onChange={size => this._onChangeCalltableBodyFontSize(size)}
        />
        <Text>{i18n.t('fgColor')}</Text>
        <ColorPicker
          color={widgetData.getCalltableBodyFgColor()}
          onColorChangeComplete={color =>
            this._onChangeCalltableBodyFgColor(color)
          }
        />
        <Text>{i18n.t('rowUnderlineThickness')}</Text>
        <InputNumber
          min='0'
          value={widgetData.getCalltableBodyRowUnderlineThickness()}
          onChange={n => this._onChangeCalltableBodyRowUnderlineThickness(n)}
        />
        <Text>{i18n.t('rowUnderlineColor')}</Text>
        <ColorPicker
          color={widgetData.getCalltableBodyRowUnderlineColor()}
          onColorChangeComplete={color =>
            this._onChangeCalltableBodyRowUnderlineColor(color)
          }
        />
        <Text>{i18n.t('activeRowBgColor')}</Text>
        <ColorPicker
          color={widgetData.getCalltableBodyActiveRowBgColor()}
          onColorChangeComplete={color =>
            this._onChangeCalltableBodyActiveRowBgColor(color)
          }
        />
        <Divider>{i18n.t('Active_button_settings')}</Divider>
        <Text>{i18n.t('Text_size')}</Text>
        <InputNumber
          min='0'
          value={widgetData.getCalltableActiveButtonFontSize()}
          onChange={n => this._onChangeCalltableActiveButtonFontSize(n)}
        />
        <Text>{i18n.t('width')}</Text>
        <InputNumber
          min='0'
          value={widgetData.getCalltableActiveButtonWidth()}
          onChange={n => this._onChangeCalltableActiveButtonWidth(n)}
        />
        <Text>{i18n.t('height')}</Text>
        <InputNumber
          min='0'
          value={widgetData.getCalltableActiveButtonHeight()}
          onChange={n => this._onChangeCalltableActiveButtonHeight(n)}
        />
      </>
    )
    return jsx
  }
}
