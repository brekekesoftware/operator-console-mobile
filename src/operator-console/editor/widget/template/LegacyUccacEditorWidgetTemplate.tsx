import { Text, View } from 'react-native'

import { Cell, Table, TableWrapper } from '../../../common/Table'
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
    return 58
  }

  // !overload
  getRenderMainJsx() {
    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: '#e0e0e0',
          backgroundColor: '#f8f8f8',
          padding: 12,
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            textTransform: 'uppercase',
            fontSize: 14,
            fontWeight: 'bold',
          }}
          numberOfLines={2}
        >
          {i18n.t('ucChatAgentComponent')}
        </Text>
      </View>
    )
  }
}
