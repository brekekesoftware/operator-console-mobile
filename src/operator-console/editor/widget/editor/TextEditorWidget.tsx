import { Text, View } from 'react-native'

import { Util } from '../../../Util'
import { EditorWidget } from './EditorWidget'

export class TextEditorWidget extends EditorWidget {
  constructor(props, context) {
    super(props, context)
  }

  // !overload
  _getRenderMainJsx() {
    const widgetData = this.props.widgetData
    const text = widgetData.getText()
    const textFontSize = widgetData.getTextFontSize()
      ? widgetData.getTextFontSize()
      : 14
    const textFgColor = Util.getRgbaCSSStringFromAntdColor(
      widgetData.getTextFgColor(),
      this.context.fgColor,
    )
    const textBgColor = Util.getRgbaCSSStringFromAntdColor(
      widgetData.getTextBgColor(),
      'rgb(245,245,245)',
    )
    const textBorderRadius =
      widgetData.getTextBorderRadius() || widgetData.getTextBorderRadius() === 0
        ? widgetData.getTextBorderRadius()
        : 0
    return (
      <View
        style={{
          overflow: 'hidden',
          width: '100%',
          height: '100%',
          backgroundColor: textBgColor,
          borderRadius: textBorderRadius,
        }}
      >
        <Text
          // numberOfLines={1}
          style={{
            textAlign: 'center',
            fontSize: textFontSize,
            color: textFgColor,
          }}
        >
          {text}
        </Text>
      </View>
    )
  }
}
