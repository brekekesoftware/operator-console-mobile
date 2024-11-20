import { WidgetData } from '../../../data/widgetData/WidgetData'
import { i18n } from '../../../i18n'
import { EditorWidgetTemplate } from './EditorWidgetTemplate'

export class LegacyExtensionStatusEditorWidgetTemplate extends EditorWidgetTemplate {
  constructor(editorWidgetTemplateFactoryAsParent) {
    super(
      editorWidgetTemplateFactoryAsParent,
      WidgetData.WIDGET_TYPE_IDS.legacyExtensionStatus,
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
    return (
      <div className='led-box' style={{}}>
        <div className='led-grey'></div>
        <p>{i18n.t('extension_status')}</p>
      </div>
    )
  }
}
