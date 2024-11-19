import { LegacyButtonRuntimeSubWidgetFactory } from './legacyButtonRuntimeSubWidget/LegacyButtonRuntimeSubWidgetFactory'
import { RuntimeWidget } from './RuntimeWidget'

export class LegacyButtonRuntimeWidget extends RuntimeWidget {
  constructor(props) {
    super(props)
  }

  // !overload
  _getRenderMainJsx() {
    const widgetData = this.props.widgetData
    const legacyButtonWidgetSubData = widgetData.getSubData()
    const subWidget =
      LegacyButtonRuntimeSubWidgetFactory.getStaticLegacyButtonRuntimeSubWidgetFactoryInstance().newLegacyButtonRuntimeSubWidget(
        this,
        legacyButtonWidgetSubData,
      )
    const jsx = subWidget.getRenderJsx()
    return jsx
  }
}
