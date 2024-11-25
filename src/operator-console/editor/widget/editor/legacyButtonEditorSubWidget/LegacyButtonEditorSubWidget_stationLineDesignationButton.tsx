import { WidgetButton } from '../../../../common/WidgetButton'
import { Util } from '../../../../Util'
import { LegacyButtonEditorSubWidget } from './LegacyButtonEditorSubWidget'

export class LegacyButtonEditorSubWidget_stationLineDesignationButton extends LegacyButtonEditorSubWidget {
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
    const cStyle = Util.getLegacyButtonEditorStyle(widgetData)

    return (
      <WidgetButton style={cStyle.s} textStyle={cStyle.tStyle} disabled={true}>
        {this._getIconJsx()}
      </WidgetButton>
    )
  }
}
