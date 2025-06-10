import { Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

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
    return (
      <LinearGradient colors={['#F9EFAF', '#F7E98D']} style={{ flex: 1 }}>
        <View
          style={{
            borderRadius: 3,
            overflow: 'hidden',
            width: '100%',
            height: ' 100%',
          }}
        >
          <Text>{i18n.t('Note')}</Text>
        </View>
      </LinearGradient>
    )
  }
}
