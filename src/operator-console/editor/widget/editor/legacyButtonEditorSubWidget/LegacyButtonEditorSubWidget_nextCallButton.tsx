import { WidgetButton } from '../../../../common/WidgetButton'
import { BrekekeOperatorConsole } from '../../../../OperatorConsole'
import { Util } from '../../../../Util'
import { LegacyButtonEditorSubWidget } from './LegacyButtonEditorSubWidget'

export class LegacyButtonEditorSubWidget_nextCallButton extends LegacyButtonEditorSubWidget {
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
    const callInfos = oc.getPhoneClient().getCallInfos()
    const currentCallIndex = callInfos.getCurrentCallIndex()
    const callInfoCount = callInfos.getCallInfoCount()
    const subtypeName = this._getLegacyButtonWidgetSubTypeName()
    const iconJsx = this._getIconJsx()
    return (
      <WidgetButton
        style={cStyle.s}
        textStyle={cStyle.tStyle}
        disabled={true}
        isFlash={currentCallIndex < callInfoCount - 1}
      >
        {iconJsx}
      </WidgetButton>
    )
  }
}
