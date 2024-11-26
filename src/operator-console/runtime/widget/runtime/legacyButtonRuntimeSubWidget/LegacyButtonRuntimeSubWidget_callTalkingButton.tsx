import { WidgetButton } from '../../../../common/WidgetButton'
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

  // !override
  getRenderJsx() {
    const widgetData =
      this.getLegacyButtonSubWidgetData().getLegacyButtonWidgetDataAsParent()

    const currentCallInfo = BrekekeOperatorConsole.getStaticInstance()
      .getPhoneClient()
      .getCallInfos()
      .getCurrentCallInfo()

    const isDanger =
      currentCallInfo?.getIsAnswered() && !currentCallInfo?.getIsHolding()
    const cStyle = Util.getLegacyButtonEditorStyle(widgetData, isDanger)

    return (
      <WidgetButton style={cStyle.s} textStyle={cStyle.tStyle}>
        {this._getIconJsx()}
      </WidgetButton>
    )
  }
}
