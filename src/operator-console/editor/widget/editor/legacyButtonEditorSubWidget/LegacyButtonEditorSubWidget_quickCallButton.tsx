import { i18n } from '../../../../i18n'
import BrekekeOperatorConsole from '../../../../OperatorConsole'
import Util from '../../../../Util'
import { LegacyButtonEditorSubWidget } from './LegacyButtonEditorSubWidget'

export class LegacyButtonEditorSubWidget_quickCallButton extends LegacyButtonEditorSubWidget {
  constructor(
    legacyButtonEditorWidgetAsParent,
    legacyButtonEditorSubWidgetData,
  ) {
    super(legacyButtonEditorWidgetAsParent, legacyButtonEditorSubWidgetData)
  }

  // !override
  getRenderJsx() {
    const widgetData =
      this.getLegacyButtonSubWidgetData().getLegacyButtonWidgetDataAsParent()
    const sButtonFontSize = widgetData.getFontSize()
      ? widgetData.getFontSize() + 'px'
      : '1rem' // !default
    const buttonFgColor = widgetData.getFgColor()
    const buttonBgColor = widgetData.getBgColor()
    const buttonOuterBorderColor = widgetData.getOuterBorderColor()
    const buttonOuterBorderThickness = widgetData.getOuterBorderThickness()
    const buttonOuterBorderRadius = widgetData.getOuterBorderRadius()

    let color = Util.isAntdRgbaProperty(buttonFgColor)
      ? Util.getRgbaCSSStringFromAntdColor(buttonFgColor)
      : ''
    let backgroundColor = Util.isAntdRgbaProperty(buttonBgColor)
      ? Util.getRgbaCSSStringFromAntdColor(buttonBgColor)
      : ''
    const border =
      Util.isNumeric(buttonOuterBorderThickness) &&
      Util.isAntdRgbaProperty(buttonOuterBorderColor)
        ? 'solid ' +
          buttonOuterBorderThickness +
          'px ' +
          Util.getRgbaCSSStringFromAntdColor(buttonOuterBorderColor)
        : ''
    const borderRadius = Util.isNumber(buttonOuterBorderRadius)
      ? buttonOuterBorderRadius + 'px'
      : ''

    const oc = BrekekeOperatorConsole.getStaticInstance()
    const subtypeName = this._getLegacyButtonWidgetSubTypeName()
    const iconJsx = this._getIconJsx()
    const currentQuickCallSubData =
      oc.getCurrentScreenQuickCallWidgetSubDataFromState()
    const isDanger =
      currentQuickCallSubData &&
      currentQuickCallSubData
        .getLegacyButtonWidgetDataAsParent()
        .getWidgetUuid() ===
        this._LegacyButtonEditorSubWidgetData
          .getLegacyButtonWidgetDataAsParent()
          .getWidgetUuid()
    if (isDanger) {
      color = null
      backgroundColor = null
    }
    return (
      <button
        title={i18n.t(`legacy_button_description.${subtypeName}`)}
        className={clsx(
          'kbc-button kbc-button-fill-parent',
          isDanger && 'kbc-button-danger',
        )}
        style={{
          fontSize: sButtonFontSize,
          border,
          borderRadius,
          color,
          backgroundColor,
        }}
        disabled={true}
      >
        {iconJsx}
      </button>
    )
  }
}
