import { useState } from 'react'
import { View } from 'react-native'

import type { ButtonTypes } from './shadow-button/AwesomeButton'
import { AwesomeButton } from './shadow-button/AwesomeButton'

type Props = {
  style?: any
  textStyle?: any
} & ButtonTypes

export const WidgetButton = ({
  style,
  textStyle,
  stretch = true,
  ...rest
}: Props) => {
  const [height, setHeight] = useState<number>(style?.height ?? 10)

  return (
    <View
      onLayout={e => setHeight(e.nativeEvent.layout.height)}
      style={stretch ? { flex: 1 } : undefined}
    >
      <AwesomeButton
        backgroundColor='white'
        textColor={textStyle?.color}
        backgroundActive='white'
        backgroundShadow='white'
        raiseLevel={5}
        backgroundDarker='#d1d8df'
        borderRadius={5}
        animatedPlaceholder={false}
        borderColor='#e0e0e0'
        borderWidth={1}
        backgroundPlaceholder='white'
        height={height}
        stretch={stretch}
        paddingHorizontal={2}
        {...rest}
        {...style}
        textFontFamily='
                  SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
        textSize={textStyle?.fontSize}
      />
    </View>
  )
}
