import { WidgetButton } from '../../../../common/WidgetButton'
import { BrekekeOperatorConsole } from '../../../../OperatorConsole'
import { Util } from '../../../../Util'
import { LegacyButtonRuntimeSubWidget } from './LegacyButtonRuntimeSubWidget'

export class LegacyButtonRuntimeSubWidget_toggleRecordingButton extends LegacyButtonRuntimeSubWidget {
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

    const oc = BrekekeOperatorConsole.getStaticInstance()
    const currentCallInfo = oc
      .getPhoneClient()
      .getCallInfos()
      .getCurrentCallInfo()
    const iconJsx = this._getIconJsx()
    const isDanger = currentCallInfo?.getIsRecording()
    const cStyle = Util.getLegacyButtonEditorStyle(widgetData, isDanger)

    return (
      <WidgetButton
        style={cStyle.s}
        textStyle={cStyle.tStyle}
        onPress={() => {
          oc.toggleCallRecording()
        }}
      >
        {iconJsx}
      </WidgetButton>
    )
  }
}
