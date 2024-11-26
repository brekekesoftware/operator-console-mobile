import { WidgetButton } from '../../../../common/WidgetButton'
import { BrekekeOperatorConsole } from '../../../../OperatorConsole'
import { Util } from '../../../../Util'
import { LegacyButtonRuntimeSubWidget } from './LegacyButtonRuntimeSubWidget'

export class LegacyButtonRuntimeSubWidget_nextCallButton extends LegacyButtonRuntimeSubWidget {
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
    const callInfos = oc.getPhoneClient().getCallInfos()
    const currentCallIndex = callInfos.getCurrentCallIndex()
    const callInfoCount = callInfos.getCallInfoCount()
    const iconJsx = this._getIconJsx()
    return (
      <WidgetButton
        // className={clsx(
        //   'kbc-button kbc-button-fill-parent',
        //   currentCallIndex < callInfoCount - 1 && 'kbc-button-danger-flash',
        // )}
        style={cStyle.s}
        textStyle={cStyle.tStyle}
        onPress={
          !callInfoCount || currentCallIndex === callInfoCount - 1
            ? undefined
            : oc.switchCallDown
        }
      >
        {iconJsx}
      </WidgetButton>
    )
  }
}
