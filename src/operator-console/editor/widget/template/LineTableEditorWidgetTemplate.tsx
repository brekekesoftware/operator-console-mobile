import { Text, View } from 'react-native'

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
      <View
        style={{
          borderWidth: 1,
          borderColor: '#e0e0e0',
          backgroundColor: '#f8f8f8',
          padding: 14,
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            textTransform: 'uppercase',
            fontSize: 14,
            fontWeight: 'bold',
          }}
        >
          {i18n.t('LineTable')}
        </Text>
      </View>
    )
  }
}
