import { View } from 'react-native'

import { WidgetData } from '../../../data/widgetData/WidgetData'
import { EditorWidgetTemplate } from './EditorWidgetTemplate'

export class CallPanelEditorWidgetTemplate extends EditorWidgetTemplate {
  constructor(editorWidgetTemplateFactoryAsParent) {
    super(
      editorWidgetTemplateFactoryAsParent,
      WidgetData.WIDGET_TYPE_IDS.callPanel,
    )
  }

  // !overload
  getWidth() {
    return 210
  }

  // !overload
  getHeight() {
    return 110
  }

  // !overload
  getRenderMainJsx() {
    return (
      <View
        style={{
          borderRadius: 8,
          width: '100%',
          height: ' 100%',
          // color: #304701;
          backgroundColor: '#A8C64E',
          elevation: 4,
        }}
      ></View>
    )
  }
}
