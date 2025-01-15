import { WidgetButton } from '../../../common/WidgetButton'
import { WidgetData } from '../../../data/widgetData/WidgetData'
import { EditorWidgetTemplate } from './EditorWidgetTemplate'

export class LegacyButtonEditorWidgetTemplate extends EditorWidgetTemplate {
  constructor(editorWidgetTemplateFactoryAsParent) {
    super(
      editorWidgetTemplateFactoryAsParent,
      WidgetData.WIDGET_TYPE_IDS.legacyButton,
    )
  }

  // !overload
  getWidth() {
    return 64
  }

  // !overload
  getHeight() {
    return 64
  }

  // !overload
  getRenderMainJsx() {
    return <WidgetButton disabled={true} stretch></WidgetButton>
  }
}
