import { WidgetButton } from '../../../../common/WidgetButton'
import { BrekekeOperatorConsole } from '../../../../OperatorConsole'
import { Util } from '../../../../Util'
import { LegacyButtonEditorSubWidget } from './LegacyButtonEditorSubWidget'

export class LegacyButtonEditorSubWidget_quickCallButton extends LegacyButtonEditorSubWidget {
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

    const oc = BrekekeOperatorConsole.getStaticInstance()
    const iconJsx = this._getIconJsx()
    const currentQuickCallSubData =
      oc.getCurrentScreenQuickCallWidgetSubDataFromState()
    const isDanger =
      currentQuickCallSubData &&
      currentQuickCallSubData
        .getLegacyButtonWidgetDataAsParent()
        .getWidgetUuid() ===
        this._LegacyButtonEditorSubWidgetData
          .getLegacyButtonWidgetDataAsParent()
          .getWidgetUuid()
    if (isDanger) {
      cStyle.tStyle.color = '#f8f9fa'
      cStyle.s.backgroundColor =
        'rgb(227.5316455696, 96.4683544304, 109.0253164557)'
    }
    return (
      <WidgetButton style={cStyle.s} textStyle={cStyle.tStyle} disabled={true}>
        {iconJsx}
      </WidgetButton>
    )
  }
}
