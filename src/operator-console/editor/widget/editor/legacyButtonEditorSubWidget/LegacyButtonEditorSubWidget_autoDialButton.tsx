import { WidgetButton } from '../../../../common/WidgetButton'
import { BrekekeOperatorConsole } from '../../../../OperatorConsole'
import { Util } from '../../../../Util'
import { LegacyButtonEditorSubWidget } from './LegacyButtonEditorSubWidget'

export class LegacyButtonEditorSubWidget_autoDialButton extends LegacyButtonEditorSubWidget {
  constructor(
    legacyButtonEditorWidgetAsParent,
    legacyButtonEditorSubWidgetData,
  ) {
    super(legacyButtonEditorWidgetAsParent, legacyButtonEditorSubWidgetData)
  }

  _findWidgetUuidIndex(subWidgetDatas, subWidgetData) {
    const widgetData = subWidgetData.getLegacyButtonWidgetDataAsParent()
    const widgetUuid = widgetData.getWidgetUuid()
    for (let i = 0; i < subWidgetDatas.length; i++) {
      // !optimize
      const currentSubWidgetData = subWidgetDatas[i]
      const currentWidgetData =
        currentSubWidgetData.getLegacyButtonWidgetDataAsParent()
      const currentWidgetUuid = currentWidgetData.getWidgetUuid()
      if (widgetUuid === currentWidgetUuid) {
        return i
      }
    }
    return -1
  }

  // !override
  getRenderJsx() {
    const widgetData =
      this.getLegacyButtonSubWidgetData().getLegacyButtonWidgetDataAsParent()
    const cStyle = Util.getLegacyButtonEditorStyle(widgetData)

    const oc = BrekekeOperatorConsole.getStaticInstance()
    const subWidgetData = this.getLegacyButtonSubWidgetData()
    const subWidgetDatas = oc.getShowAutoDialWidgetSubDatas_ver2()
    const isRedColor =
      subWidgetDatas &&
      this._findWidgetUuidIndex(subWidgetDatas, subWidgetData) !== -1

    if (isRedColor) {
      cStyle.tStyle.color = '#f8f9fa'
      cStyle.s.backgroundColor =
        'rgb(227.5316455696, 96.4683544304, 109.0253164557)'
    }

    const subtypeName = this._getLegacyButtonWidgetSubTypeName()
    const iconJsx = this._getIconJsx()
    return (
      <WidgetButton style={cStyle.s} textStyle={cStyle.tStyle} disabled={true}>
        {iconJsx}
      </WidgetButton>
    )
  }
}
