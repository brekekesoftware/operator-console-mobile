import { WidgetButton } from '../../../../common/WidgetButton'
import { BrekekeOperatorConsole } from '../../../../OperatorConsole'
import { Util } from '../../../../Util'
import { LegacyButtonRuntimeSubWidget } from './LegacyButtonRuntimeSubWidget'

export class LegacyButtonRuntimeSubWidget_quickCallButton extends LegacyButtonRuntimeSubWidget {
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
    const currentQuickCallSubData =
      oc.getCurrentScreenQuickCallWidgetSubDataFromState()
    const isDanger =
      currentQuickCallSubData &&
      currentQuickCallSubData
        .getLegacyButtonWidgetDataAsParent()
        .getWidgetUuid() ===
        this._LegacyButtonRuntimeSubWidgetData
          .getLegacyButtonWidgetDataAsParent()
          .getWidgetUuid()
    const cStyle = Util.getLegacyButtonEditorStyle(widgetData, isDanger)
    return (
      <WidgetButton
        style={cStyle.s}
        textStyle={cStyle.tStyle}
        onPress={() =>
          oc.toggleQuickCallButton_ver2(this._LegacyButtonRuntimeSubWidgetData)
        }
      >
        {iconJsx}
      </WidgetButton>
    )
  }
}
