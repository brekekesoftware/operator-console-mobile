import { WidgetButton } from '../../../../common/WidgetButton'
import { Util } from '../../../../Util'
import { LegacyButtonEditorSubWidget } from './LegacyButtonEditorSubWidget'

export class LegacyButtonEditorSubWidget_alarmButton extends LegacyButtonEditorSubWidget {
  constructor(
    legacyButtonEditorWidgetAsParent,
    legacyButtonEditorSubWidgetData,
  ) {
    super(legacyButtonEditorWidgetAsParent, legacyButtonEditorSubWidgetData)
  }

  // !override
  getRenderJsx() {
    const widgetData =
      this.getLegacyButtonSubWidgetData().getLegacyButtonWidgetDataAsParent()

    const subtypeName = this._getLegacyButtonWidgetSubTypeName()
    const iconJsx = this._getIconJsx()
    const cStyle = Util.getLegacyButtonEditorStyle(widgetData)
    return (
      <WidgetButton disabled={true} style={cStyle.s} textStyle={cStyle.tStyle}>
        {iconJsx}
      </WidgetButton>
    )
  }
}
