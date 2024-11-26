import { WidgetButton } from '../../../../common/WidgetButton'
import { BrekekeOperatorConsole } from '../../../../OperatorConsole'
import { Util } from '../../../../Util'
import { LegacyButtonRuntimeSubWidget } from './LegacyButtonRuntimeSubWidget'

export class LegacyButtonRuntimeSubWidget_autoDialButton extends LegacyButtonRuntimeSubWidget {
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
    const subWidgetData = this.getLegacyButtonSubWidgetData()
    const subWidgetDatas = oc.getShowAutoDialWidgetSubDatas_ver2()
    const isRedColor =
      subWidgetDatas &&
      BrekekeOperatorConsole._getIndexFromArray(
        subWidgetDatas,
        subWidgetData,
      ) !== -1

    const cStyle = Util.getLegacyButtonEditorStyle(widgetData, isRedColor)
    const iconJsx = this._getIconJsx()
    return (
      <WidgetButton
        style={cStyle.s}
        textStyle={cStyle.tStyle}
        onPress={() => oc.onClickAutoDialButton_ver2(this)}
      >
        {iconJsx}
      </WidgetButton>
    )
  }
}
