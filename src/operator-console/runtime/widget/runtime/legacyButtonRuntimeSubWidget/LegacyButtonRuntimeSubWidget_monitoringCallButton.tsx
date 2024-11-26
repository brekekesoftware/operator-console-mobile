import { WidgetButton } from '../../../../common/WidgetButton'
import { BrekekeOperatorConsole } from '../../../../OperatorConsole'
import { Util } from '../../../../Util'
import { LegacyButtonRuntimeSubWidget } from './LegacyButtonRuntimeSubWidget'

export class LegacyButtonRuntimeSubWidget_monitoringCallButton extends LegacyButtonRuntimeSubWidget {
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
    const iconJsx = this._getIconJsx()

    const isDanger = !!oc.getMonitoringExtension()
    const cStyle = Util.getLegacyButtonEditorStyle(widgetData, isDanger)

    return (
      <WidgetButton style={cStyle.s} textStyle={cStyle.tStyle}>
        {iconJsx}
      </WidgetButton>
    )
  }
}
