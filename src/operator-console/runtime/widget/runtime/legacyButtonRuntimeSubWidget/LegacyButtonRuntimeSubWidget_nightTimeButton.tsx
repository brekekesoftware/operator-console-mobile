import { WidgetButton } from '../../../../common/WidgetButton'
import { Util } from '../../../../Util'
import { LegacyButtonRuntimeSubWidget } from './LegacyButtonRuntimeSubWidget'

export class LegacyButtonRuntimeSubWidget_nightTimeButton extends LegacyButtonRuntimeSubWidget {
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
    const iconJsx = this._getIconJsx()
    return (
      <WidgetButton style={cStyle.s} textStyle={cStyle.tStyle}>
        {iconJsx}
      </WidgetButton>
    )
  }
}
