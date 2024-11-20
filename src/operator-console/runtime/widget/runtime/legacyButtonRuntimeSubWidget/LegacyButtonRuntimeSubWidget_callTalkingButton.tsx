import { i18n } from '../../../../i18n'
import { BrekekeOperatorConsole } from '../../../../OperatorConsole'
import { Util } from '../../../../Util'
import { LegacyButtonRuntimeSubWidget } from './LegacyButtonRuntimeSubWidget'

export class LegacyButtonRuntimeSubWidget_callTalkingButton extends LegacyButtonRuntimeSubWidget {
  constructor(
    legacyButtonRuntimeWidgetAsParent,
    legacyButtonRuntimeSubWidgetData,
  ) {
    super(legacyButtonRuntimeWidgetAsParent, legacyButtonRuntimeSubWidgetData)
  }

  // //!override
  // getRenderJsx() {
  //     return <div
  //         style={{
  //             border: "1px solid #000000",
  //             backgroundColor: "#0000FF",
  //             width: "100%",
  //             height: "100%",
  //             boxSizing: "border-box"
  //         }}></div>
  // }

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

    const currentCallInfo = BrekekeOperatorConsole.getStaticInstance()
      .getPhoneClient()
      .getCallInfos()
      .getCurrentCallInfo()
    const subtypeName = this._getLegacyButtonWidgetSubTypeName()

    const isDanger =
      currentCallInfo?.getIsAnswered() && !currentCallInfo?.getIsHolding()
    if (isDanger) {
      // Use default.
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
      >
        {this._getIconJsx()}
      </button>
    )
  }
}
