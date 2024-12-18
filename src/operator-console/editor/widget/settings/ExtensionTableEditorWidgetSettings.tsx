import { Text } from 'react-native'

import { ColorPicker } from '../../../common/ColorPicker'
import { Divider } from '../../../common/Divider'
import { InputNumber } from '../../../common/InputNumber'
import { i18n } from '../../../i18n'
import { EditorWidgetSettings } from './EditorWidgetSettings'

export class ExtensionTableEditorWidgetSettings extends EditorWidgetSettings {
  _onChangeExtensiontableBgColor(color) {
    const widgetData = this._getWidgetData()
    widgetData.setExtensiontableBgColor(color)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeExtensiontableOuterBorderThickness(n) {
    const widgetData = this._getWidgetData()
    widgetData.setExtensiontableOuterBorderThickness(n)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeExtensiontableOuterBorderColor(color) {
    const widgetData = this._getWidgetData()
    widgetData.setExtensiontableOuterBorderColor(color)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeExtensiontableOuterBorderRadius(n) {
    const widgetData = this._getWidgetData()
    widgetData.setExtensiontableOuterBorderRadius(n)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeExtensiontableHeaderFgColor(color) {
    const widgetData = this._getWidgetData()
    widgetData.setExtensiontableHeaderFgColor(color)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeExtensiontableHeaderRowUnderlineThickness(n) {
    const widgetData = this._getWidgetData()
    widgetData.setExtensiontableHeaderRowUnderlineThickness(n)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeExtensiontableHeaderRowUnderlineColor(color) {
    const widgetData = this._getWidgetData()
    widgetData.setExtensiontableHeaderRowUnderlineColor(color)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeExtensiontableBodyFgColor(color) {
    const widgetData = this._getWidgetData()
    widgetData.setExtensiontableBodyFgColor(color)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeExtensiontableBodyRowUnderlineThickness(n) {
    const widgetData = this._getWidgetData()
    widgetData.setExtensiontableBodyRowUnderlineThickness(n)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeExtensiontableBodyRowUnderlineColor(color) {
    const widgetData = this._getWidgetData()
    widgetData.setExtensiontableBodyRowUnderlineColor(color)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeExtensiontableBodyFontSize(n) {
    const widgetData = this._getWidgetData()
    widgetData.setExtensiontableBodyFontSize(n)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeExtensiontableHeaderFontSize(n) {
    const widgetData = this._getWidgetData()
    widgetData.setExtensiontableHeaderFontSize(n)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  // !override
  _getRenderMainJsx() {
    const widgetData = this._getWidgetData()
    const jsx = (
      <>
        <Text>{i18n.t('bgColor')}</Text>
        <ColorPicker
          color={widgetData.getExtensiontableBgColor()}
          onColorChangeComplete={color =>
            this._onChangeExtensiontableBgColor(color)
          }
        />
        <Text>{i18n.t('outerBorderThickness')}</Text>
        <InputNumber
          min='0'
          value={widgetData.getExtensiontableOuterBorderThickness()}
          onChange={n => this._onChangeExtensiontableOuterBorderThickness(n)}
        />
        <Text>{i18n.t('outerBorderColor')}</Text>
        <ColorPicker
          color={widgetData.getExtensiontableOuterBorderColor()}
          onColorChangeComplete={color =>
            this._onChangeExtensiontableOuterBorderColor(color)
          }
        />
        <Text>{i18n.t('outerBorderRadius')}</Text>
        <InputNumber
          min='0'
          value={widgetData.getExtensiontableOuterBorderRadius()}
          onChange={n => this._onChangeExtensiontableOuterBorderRadius(n)}
        />
        <Divider>{i18n.t('header_settings')}</Divider>
        <Text>{i18n.t('Text_size')}</Text>
        <InputNumber
          min='0'
          value={widgetData.getExtensiontableHeaderFontSize()}
          onChange={n => this._onChangeExtensiontableHeaderFontSize(n)}
        />
        <Text>{i18n.t('fgColor')}</Text>
        <ColorPicker
          color={widgetData.getExtensiontableHeaderFgColor()}
          onColorChangeComplete={color =>
            this._onChangeExtensiontableHeaderFgColor(color)
          }
        />
        <Text>{i18n.t('rowUnderlineThickness')}</Text>
        <InputNumber
          min='0'
          value={widgetData.getExtensiontableHeaderRowUnderlineThickness()}
          onChange={n =>
            this._onChangeExtensiontableHeaderRowUnderlineThickness(n)
          }
        />
        <Text>{i18n.t('rowUnderlineColor')}</Text>
        <ColorPicker
          color={widgetData.getExtensiontableHeaderRowUnderlineColor()}
          onColorChangeComplete={color =>
            this._onChangeExtensiontableHeaderRowUnderlineColor(color)
          }
        />
        <Divider>{i18n.t('body_settings')}</Divider>
        <Text>{i18n.t('Text_size')}</Text>
        <InputNumber
          min='0'
          value={widgetData.getExtensiontableBodyFontSize()}
          onChange={n => this._onChangeExtensiontableBodyFontSize(n)}
        />
        <Text>{i18n.t('fgColor')}</Text>
        <ColorPicker
          color={widgetData.getExtensiontableBodyFgColor()}
          onColorChangeComplete={color =>
            this._onChangeExtensiontableBodyFgColor(color)
          }
        />
        <Text>{i18n.t('rowUnderlineThickness')}</Text>
        <InputNumber
          min='0'
          value={widgetData.getExtensiontableBodyRowUnderlineThickness()}
          onChange={n =>
            this._onChangeExtensiontableBodyRowUnderlineThickness(n)
          }
        />
        <Text>{i18n.t('rowUnderlineColor')}</Text>
        <ColorPicker
          color={widgetData.getExtensiontableBodyRowUnderlineColor()}
          onColorChangeComplete={color =>
            this._onChangeExtensiontableBodyRowUnderlineColor(color)
          }
        />
      </>
    )
    return jsx
  }
}
