import { Text } from 'react-native'

import { ColorPicker } from '../../../common/ColorPicker'
import { Divider } from '../../../common/Divider'
import { InputNumber } from '../../../common/InputNumber'
import { i18n } from '../../../i18n'
import { EditorWidgetSettings } from './EditorWidgetSettings'

export class CallPanelEditorWidgetSettings extends EditorWidgetSettings {
  _onChangeCallpanelFgColor(color) {
    const widgetData = this._getWidgetData()
    widgetData.setCallpanelFgColor(color)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeCallpanelBgColor(color) {
    const widgetData = this._getWidgetData()
    widgetData.setCallpanelBgColor(color)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeCallpanelBorderRadius(n) {
    const widgetData = this._getWidgetData()
    widgetData.setCallpanelBorderRadius(n)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeInsideShadow_horizontalOffset(n) {
    const widgetData = this._getWidgetData()
    widgetData.setInsideShadow_horizontalOffset(n)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeInsideShadow_verticalOffset(n) {
    const widgetData = this._getWidgetData()
    widgetData.setInsideShadow_verticalOffset(n)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeInsideShadow_blur(n) {
    const widgetData = this._getWidgetData()
    widgetData.setInsideShadow_blur(n)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeInsideShadow_spread(n) {
    const widgetData = this._getWidgetData()
    widgetData.setInsideShadow_spread(n)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeInsideShadow_color(color) {
    const widgetData = this._getWidgetData()
    widgetData.setInsideShadow_color(color)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeOutsideShadow_horizontalOffset(n) {
    const widgetData = this._getWidgetData()
    widgetData.setOutsideShadow_horizontalOffset(n)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeOutsideShadow_verticalOffset(n) {
    const widgetData = this._getWidgetData()
    widgetData.setOutsideShadow_verticalOffset(n)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeOutsideShadow_blur(n) {
    const widgetData = this._getWidgetData()
    widgetData.setOutsideShadow_blur(n)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeOutsideShadow_spread(n) {
    const widgetData = this._getWidgetData()
    widgetData.setOutsideShadow_spread(n)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  _onChangeOutsideShadow_color(color) {
    const widgetData = this._getWidgetData()
    widgetData.setOutsideShadow_color(color)
    this._EditScreenViewAsParent.setState({ rerender: true })
  }

  // !override
  _getRenderMainJsx() {
    const widgetData = this._getWidgetData()
    const jsx = (
      <>
        <Text>{i18n.t('fgColor')}</Text>
        <ColorPicker
          color={widgetData.getCallpanelFgColor()}
          onColorChangeComplete={color => this._onChangeCallpanelFgColor(color)}
        />
        <Text>{i18n.t('bgColor')}</Text>
        <ColorPicker
          color={widgetData.getCallpanelBgColor()}
          onColorChangeComplete={color => this._onChangeCallpanelBgColor(color)}
        />
        <Text>{i18n.t('borderRadius')}</Text>
        <InputNumber
          min='0'
          value={widgetData.getCallpanelBorderRadius()}
          onChange={n => this._onChangeCallpanelBorderRadius(n)}
        />
        <Divider>{i18n.t('insideShadow_settings')}</Divider>
        <Text>{i18n.t('horizontalOffset')}</Text>
        <InputNumber
          step={1}
          value={widgetData.getInsideShadow_horizontalOffset()}
          onChange={n => this._onChangeInsideShadow_horizontalOffset(n)}
        />
        <Text>{i18n.t('verticalOffset')}</Text>
        <InputNumber
          step={1}
          value={widgetData.getInsideShadow_verticalOffset()}
          onChange={n => this._onChangeInsideShadow_verticalOffset(n)}
        />
        <Text>{i18n.t('blur')}</Text>
        <InputNumber
          step={1}
          value={widgetData.getInsideShadow_blur()}
          onChange={n => this._onChangeInsideShadow_blur(n)}
        />
        <Text>{i18n.t('spread')}</Text>
        <InputNumber
          step={1}
          value={widgetData.getInsideShadow_spread()}
          onChange={n => this._onChangeInsideShadow_spread(n)}
        />
        <Text>{i18n.t('color')}</Text>
        <ColorPicker
          color={widgetData.getInsideShadow_color()}
          onColorChangeComplete={color =>
            this._onChangeInsideShadow_color(color)
          }
        />
        <Divider>{i18n.t('outsideShadow_settings')}</Divider>
        <Text>{i18n.t('horizontalOffset')}</Text>
        <InputNumber
          step={1}
          value={widgetData.getOutsideShadow_horizontalOffset()}
          onChange={n => this._onChangeOutsideShadow_horizontalOffset(n)}
        />
        <Text>{i18n.t('verticalOffset')}</Text>
        <InputNumber
          step={1}
          value={widgetData.getOutsideShadow_verticalOffset()}
          onChange={n => this._onChangeOutsideShadow_verticalOffset(n)}
        />
        <Text>{i18n.t('blur')}</Text>
        <InputNumber
          step={1}
          value={widgetData.getOutsideShadow_blur()}
          onChange={n => this._onChangeOutsideShadow_blur(n)}
        />
        <Text>{i18n.t('spread')}</Text>
        <InputNumber
          step={1}
          value={widgetData.getOutsideShadow_spread()}
          onChange={n => this._onChangeOutsideShadow_spread(n)}
        />
        <Text>{i18n.t('color')}</Text>
        <ColorPicker
          value={widgetData.getOutsideShadow_color()}
          onChange={color => this._onChangeOutsideShadow_color(color)}
        />
      </>
    )
    return jsx
  }
}
