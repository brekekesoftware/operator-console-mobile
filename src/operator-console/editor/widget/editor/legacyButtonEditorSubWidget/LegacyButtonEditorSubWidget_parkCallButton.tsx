import { WidgetButton } from '../../../../common/WidgetButton'
import { BrekekeOperatorConsole } from '../../../../OperatorConsole'
import { Util } from '../../../../Util'
import { LegacyButtonEditorSubWidget } from './LegacyButtonEditorSubWidget'

export class LegacyButtonEditorSubWidget_parkCallButton extends LegacyButtonEditorSubWidget {
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
    const myParksStatus = oc.getMyParksStatus()
    const parksStatus = oc.getParksStatus()
    const number = this._LegacyButtonEditorSubWidgetData.getNumber()

    const subtypeName = this._getLegacyButtonWidgetSubTypeName()
    const light = myParksStatus[number]
      ? 'kbc-button-success-flash-slow'
      : parksStatus[number]
        ? 'kbc-button-danger-flash-slow'
        : ''
    const iconJsx = this._getIconJsx()
    return (
      <WidgetButton style={cStyle.s} textStyle={cStyle.tStyle} disabled={true}>
        {iconJsx}
      </WidgetButton>
    )
  }
}
