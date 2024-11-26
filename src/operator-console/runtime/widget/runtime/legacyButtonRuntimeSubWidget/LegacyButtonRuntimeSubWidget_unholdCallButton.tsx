import { WidgetButton } from '../../../../common/WidgetButton'
import { BrekekeOperatorConsole } from '../../../../OperatorConsole'
import { Util } from '../../../../Util'
import { LegacyButtonRuntimeSubWidget } from './LegacyButtonRuntimeSubWidget'

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
    const cStyle = Util.getLegacyButtonEditorStyle(widgetData)

    const oc = BrekekeOperatorConsole.getStaticInstance()
    const currentCallInfo = oc
      .getPhoneClient()
      .getCallInfos()
      .getCurrentCallInfo()
    const iconJsx = this._getIconJsx()
    return (
      <WidgetButton
        style={cStyle.s}
        textStyle={cStyle.tStyle}
        onPress={() => {
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
      </WidgetButton>
    )
  }
}
