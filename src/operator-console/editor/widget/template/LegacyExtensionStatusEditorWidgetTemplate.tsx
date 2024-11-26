import { Text, View } from 'react-native'

import { WidgetData } from '../../../data/widgetData/WidgetData'
import { i18n } from '../../../i18n'
import { OperatorConsoleStyles } from '../../../OperatorConsoleStyles'
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
      <View style={OperatorConsoleStyles['led-red']}>
        <View style={OperatorConsoleStyles['led-grey']}></View>
        <Text>{i18n.t('extension_status')}</Text>
      </View>
    )
  }
}
