import { WidgetData } from '../../../data/widgetData/WidgetData'
import { i18n } from '../../../i18n'
import { EditorWidgetTemplate } from './EditorWidgetTemplate'

export class LineTableEditorWidgetTemplate extends EditorWidgetTemplate {
  constructor(editorWidgetTemplateFactoryAsParent) {
    super(
      editorWidgetTemplateFactoryAsParent,
      WidgetData.WIDGET_TYPE_IDS.lineTable,
    )
  }

  // !overload
  getWidth() {
    return 128
  }

  // !overload
  getHeight() {
    return 64
  }

  // !overload
  getRenderMainJsx() {
    return (
      <table style={{ display: 'table' }}>
        <thead>
          <tr style={{ height: '100%' }}>
            <th>{i18n.t('LineTable')}</th>
          </tr>
        </thead>
      </table>
    )
  }
}
