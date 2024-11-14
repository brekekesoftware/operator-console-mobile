import { i18n } from '../../../../i18n'
import BrekekeOperatorConsole from '../../../../OperatorConsole'
import { Util } from '../../../../Util'
import LegacyButtonRuntimeSubWidget from './LegacyButtonRuntimeSubWidget'

export class LegacyButtonRuntimeSubWidget_unholdCallButton extends LegacyButtonRuntimeSubWidget {
  constructor(
    legacyButtonRuntimeWidgetAsParent,
    legacyButtonRuntimeSubWidgetData,
  ) {
    super(legacyButtonRuntimeWidgetAsParent, legacyButtonRuntimeSubWidgetData)
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

    const color = Util.isAntdRgbaProperty(buttonFgColor)
      ? Util.getRgbaCSSStringFromAntdColor(buttonFgColor)
      : ''
    const backgroundColor = Util.isAntdRgbaProperty(buttonBgColor)
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
    const currentCallInfo = oc
      .getPhoneClient()
      .getCallInfos()
      .getCurrentCallInfo()

    const subtypeName = this._getLegacyButtonWidgetSubTypeName()
    const iconJsx = this._getIconJsx()
    return (
      <button
        title={i18n.t(`legacy_button_description.${subtypeName}`)}
        className='kbc-button kbc-button-fill-parent'
        style={{
          fontSize: sButtonFontSize,
          border,
          borderRadius,
          color,
          backgroundColor,
        }}
        onClick={() => {
          if (!currentCallInfo) {
            return
          }
          const bHolding = currentCallInfo.getIsHolding()
          if (!bHolding) {
            return
          }
          oc.resumeCall()
        }}
      >
        {iconJsx}
      </button>
    )
  }
}
