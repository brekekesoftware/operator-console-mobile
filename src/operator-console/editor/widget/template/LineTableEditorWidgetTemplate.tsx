import { View } from 'react-native'

import { Cell, Table, TableWrapper } from '../../../common/Table'
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
      <Table>
        <View>
          <TableWrapper style={{ height: '100%' }}>
            <Cell data={i18n.t('LineTable')}></Cell>
          </TableWrapper>
        </View>
      </Table>
    )
  }
}
