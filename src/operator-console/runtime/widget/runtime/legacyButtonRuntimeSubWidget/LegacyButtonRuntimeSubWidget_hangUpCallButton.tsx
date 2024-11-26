import { ACallInfo } from '../../../../call/ACallInfo'
import { WidgetButton } from '../../../../common/WidgetButton'
import { BrekekeOperatorConsole } from '../../../../OperatorConsole'
import { Util } from '../../../../Util'
import { LegacyButtonRuntimeSubWidget } from './LegacyButtonRuntimeSubWidget'

export class LegacyButtonRuntimeSubWidget_hangUpCallButton extends LegacyButtonRuntimeSubWidget {
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
    let bDisabled
    if (currentCallInfo) {
      const callStatus = currentCallInfo.getCallStatus()
      const bHolding = callStatus === ACallInfo.CALL_STATUSES.holding
      if (bHolding === true) {
        bDisabled = true
      } else {
        bDisabled = false
      }
    } else {
      bDisabled = false
    }
    const iconJsx = this._getIconJsx()
    return (
      <WidgetButton
        style={cStyle.s}
        textStyle={cStyle.tStyle}
        onPress={() => {
          if (!currentCallInfo) {
            return
          }
          oc.hangUpCall()
        }}
        disabled={bDisabled}
      >
        {iconJsx}
      </WidgetButton>
    )
  }
}
