import { ACallInfo } from '../../../../call/ACallInfo'
import { WidgetButton } from '../../../../common/WidgetButton'
import { BrekekeOperatorConsole } from '../../../../OperatorConsole'
import { Util } from '../../../../Util'
import { LegacyButtonRuntimeSubWidget } from './LegacyButtonRuntimeSubWidget'

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
    const cStyle = Util.getLegacyButtonEditorStyle(widgetData)

    const oc = BrekekeOperatorConsole.getStaticInstance()
    const currentCallInfo = oc
      .getPhoneClient()
      .getCallInfos()
      .getCurrentCallInfo()
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
      <WidgetButton
        // className={clsx(
        //   'kbc-button kbc-button-fill-parent',
        //   isFlash === true && 'kbc-button-danger-flash',
        // )}
        style={cStyle.s}
        textStyle={cStyle.tStyle}
        onPress={() => {
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
      </WidgetButton>
    )
  }
}
