import ACallInfo from '../../../../ACallInfo'
import { i18n } from '../../../../i18n'
import BrekekeOperatorConsole from '../../../../OperatorConsole'
import { Util } from '../../../../Util'
import LegacyButtonRuntimeSubWidget from './LegacyButtonRuntimeSubWidget'

export class LegacyButtonRuntimeSubWidget_pickUpCallButton extends LegacyButtonRuntimeSubWidget {
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

    // const callInfos = oc.getPhoneClient().getCallInfos();
    // const callInfoCount = callInfos.getCallInfoCount();
    // let isFlash = false;
    // for( let i = 0; i < callInfoCount; i++ ){
    //     const callInfo = callInfos.getCallInfoAt( i );
    //     const isIncoming = callInfo.getCallStatus() === ACallInfo.CALL_STATUSES.incoming;
    //     if( isIncoming === true  ){
    //         isFlash = true;
    //         break;
    //     }
    // }

    const isFlash =
      currentCallInfo &&
      currentCallInfo.getCallStatus() === ACallInfo.CALL_STATUSES.incoming &&
      currentCallInfo.getIsAnswered() === false

    return (
      <button
        title={i18n.t(`legacy_button_description.${subtypeName}`)}
        className={clsx(
          'kbc-button kbc-button-fill-parent',
          isFlash === true && 'kbc-button-danger-flash',
        )}
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
          const bIsIncoming = currentCallInfo.getIsIncoming()
          if (!bIsIncoming) {
            return
          }
          const bIsAnswered = currentCallInfo.getIsAnswered()
          if (bIsAnswered) {
            return
          }

          oc.answerCall()
        }}
      >
        {iconJsx}
      </button>
    )
  }
}
