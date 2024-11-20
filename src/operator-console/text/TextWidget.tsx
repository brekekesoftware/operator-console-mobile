import { Text, View } from 'react-native'

import { Util } from '../Util'

export const TextWidget = ({
  operatorConsoleAsParent,
  text,
  textFgColor,
  textBgColor,
  textBorderRadius,
}) => {
  const color = Util.isAntdRgbaProperty(textFgColor)
    ? Util.getRgbaCSSStringFromAntdColor(textFgColor)
    : ''
  const backgroundColor = Util.isAntdRgbaProperty(textBgColor)
    ? Util.getRgbaCSSStringFromAntdColor(textBgColor)
    : '#f5f5f5' // !default
  // const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
  //    "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
  const borderRadius = Util.isNumber(textBorderRadius) ? textBorderRadius : 0

  return (
    <View
      style={{
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        backgroundColor,
        borderRadius,
      }}
    >
      <Text style={{ color, textAlign: 'center' }} numberOfLines={1}>
        {text}
      </Text>
    </View>
  )
}
