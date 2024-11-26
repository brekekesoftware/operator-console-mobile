import { WidgetButton } from '../../../../common/WidgetButton'
import { BrekekeOperatorConsole } from '../../../../OperatorConsole'
import { Util } from '../../../../Util'
import { LegacyButtonRuntimeSubWidget } from './LegacyButtonRuntimeSubWidget'

export class LegacyButtonRuntimeSubWidget_parkCallButton extends LegacyButtonRuntimeSubWidget {
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

    const oc = BrekekeOperatorConsole.getStaticInstance()
    const myParksStatus = oc.getMyParksStatus()
    const parksStatus = oc.getParksStatus()
    const number = this._LegacyButtonRuntimeSubWidgetData.getNumber()
    const light = myParksStatus[number]
      ? 'kbc-button-success-flash-slow'
      : parksStatus[number]
        ? 'kbc-button-danger-flash-slow'
        : ''
    const iconJsx = this._getIconJsx()
    return (
      <WidgetButton
        style={cStyle.s}
        textStyle={cStyle.tStyle}
        onPress={() => oc.handlePark(number)}
      >
        {iconJsx}
      </WidgetButton>
    )
  }
}
