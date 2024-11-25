import { WidgetButton } from '../../../../common/WidgetButton'
import { Util } from '../../../../Util'
import { LegacyButtonEditorSubWidget } from './LegacyButtonEditorSubWidget'

export class LegacyButtonEditorSubWidget_callbackButton extends LegacyButtonEditorSubWidget {
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

    const subtypeName = this._getLegacyButtonWidgetSubTypeName()
    return (
      <WidgetButton disabled={true} style={cStyle.s} textStyle={cStyle.tStyle}>
        {this._getIconJsx()}
      </WidgetButton>
    )
  }
}
