import { Children } from 'react'
import type { FlexAlignType, ViewStyle } from 'react-native'
import { View } from 'react-native'

type Props = {
  children?: string | JSX.Element | JSX.Element[] | (() => JSX.Element)
  style?: ViewStyle
  direction?: 'vertical' | 'horizontal'
  align?: FlexAlignType
  size?: number
  hasFlex?: boolean
}

export const Space = ({
  children,
  style,
  direction = 'horizontal',
  align,
  size = 10,
  hasFlex,
}: Props) => {
  const s: ViewStyle =
    direction === 'horizontal'
      ? { flexDirection: 'row', alignItems: align }
      : { flexDirection: 'column', alignItems: align }
  return children ? (
    <View style={[style, { gap: size }, s]}>
      {Children.map(children, (child, index) =>
        hasFlex ? (
          <View key={index.toString()} style={{ flex: 1 }}>
            {child}
          </View>
        ) : (
          <>{child}</>
        ),
      )}
    </View>
  ) : (
    <View style={[style, { margin: size }]}></View>
  )
}
