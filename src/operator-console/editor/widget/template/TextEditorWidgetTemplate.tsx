import { Text, View } from 'react-native'

import { WidgetData } from '../../../data/widgetData/WidgetData'
import { i18n } from '../../../i18n'
import { EditorWidgetTemplate } from './EditorWidgetTemplate'

export class TextEditorWidgetTemplate extends EditorWidgetTemplate {
  constructor(editorWidgetTemplateFactoryAsParent) {
    super(editorWidgetTemplateFactoryAsParent, WidgetData.WIDGET_TYPE_IDS.text)
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
      <View
        style={{
          overflow: 'hidden',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgb(245,245,245)',
        }}
      >
        <Text style={{ textAlign: 'center' }} numberOfLines={1}>
          {i18n.t('text')}
        </Text>
      </View>
    )
  }
}
