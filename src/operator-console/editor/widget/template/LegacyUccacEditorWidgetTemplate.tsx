import { WidgetData } from '../../../data/widgetData/WidgetData'
import { i18n } from '../../../i18n'
import { EditorWidgetTemplate } from './EditorWidgetTemplate'

export class LegacyUccacEditorWidgetTemplate extends EditorWidgetTemplate {
  constructor(editorWidgetTemplateFactoryAsParent) {
    super(
      editorWidgetTemplateFactoryAsParent,
      WidgetData.WIDGET_TYPE_IDS.legacyUccac,
    )
  }

  // !overload
  getWidth() {
    return 200
  }

  // !overload
  getHeight() {
    return 48
  }

  // !overload
  getRenderMainJsx(jsxKey, editScreenViewAsCaller) {
    return (
      <table>
        <thead>
          <tr>
            <th>{i18n.t('ucChatAgentComponent')}</th>
          </tr>
        </thead>
      </table>
    )
  }
}
