import { WidgetData } from '../../../data/widgetData/WidgetData'
import { EditorWidgetTemplate } from './EditorWidgetTemplate'

export class CallPanelEditorWidgetTemplate extends EditorWidgetTemplate {
  constructor(editorWidgetTemplateFactoryAsParent) {
    super(
      editorWidgetTemplateFactoryAsParent,
      WidgetData.WIDGET_TYPE_IDS.callPanel,
    )
  }

  // !overload
  getWidth() {
    return 210
  }

  // !overload
  getHeight() {
    return 110
  }

  // !overload
  getRenderMainJsx(jsxKey, editScreenViewAsCaller) {
    return <div className='brOCCallPanel' style={{}}></div>
  }
}
