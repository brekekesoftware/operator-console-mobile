import { WidgetData } from '../../../data/widgetData/WidgetData'
import { i18n } from '../../../i18n'
import { EditorWidgetTemplate } from './EditorWidgetTemplate'

export class NoteEditorWidgetTemplate extends EditorWidgetTemplate {
  constructor(editorWidgetTemplateFactoryAsParent) {
    super(editorWidgetTemplateFactoryAsParent, WidgetData.WIDGET_TYPE_IDS.note)
  }

  // !overload
  getWidth() {
    return 64
  }

  // !overload
  getHeight() {
    return 48
  }

  // !overload
  getRenderMainJsx() {
    return <div className='brOCStickyNote'>{i18n.t('Note')}</div>
  }
}
