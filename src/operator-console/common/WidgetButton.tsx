import { useEffect, useRef } from 'react'
import type { TextStyle, TouchableOpacityProps, ViewStyle } from 'react-native'
import { Animated, Text, TouchableOpacity } from 'react-native'

type Props = {
  children?: string | JSX.Element | JSX.Element[]
  style?: ViewStyle
  textStyle?: TextStyle
  isFlash?: boolean
  isFlashSlow?: boolean
} & TouchableOpacityProps

export const WidgetButton = ({
  style,
  children,
  textStyle,
  isFlash,
  ...rest
}: Props) => {
  const bgFlash = useRef(new Animated.Value(0)).current
  useEffect(() => {
    if (isFlash) {
      startFlashing()
    } else {
      stopFlashing()
    }
  }, [isFlash])

  const startFlashing = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bgFlash, {
          toValue: 1,
          duration: 250,
          useNativeDriver: false,
        }),
        Animated.timing(bgFlash, {
          toValue: 0,
          duration: 250,
          useNativeDriver: false,
        }),
      ]),
    ).start()
  }

  const stopFlashing = () => {
    bgFlash.stopAnimation()
    bgFlash.setValue(0)
  }

  const interpolatedBackgroundColor = bgFlash.interpolate({
    inputRange: [0, 1],
    outputRange: ['#dc3545', '#e4606d'], // Flashing background colors
  })

  const interpolatedTextColor = bgFlash.interpolate({
    inputRange: [0, 1],
    outputRange: ['#f8f9fa', '#ffffff'], // Flashing text colors
  })
  return (
    <TouchableOpacity
      {...rest}
      style={[
        {
          // marginBottom: 7,
          // marginRight: 4,
          // marginLeft: 4,
          // marginTop: 4,
          backgroundColor: 'white',
          borderStyle: 'solid',
          borderColor: '#d9d9d9',
          borderWidth: 1,
          // elevation: 1,
          borderRadius: 8,
          // flex: 1,
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          { flex: 1, alignItems: 'center', justifyContent: 'center' },
          {
            backgroundColor: isFlash
              ? interpolatedBackgroundColor
              : style?.backgroundColor,
          },
        ]}
      >
        {typeof children === 'string' ? (
          <Text
            style={[
              {
                fontFamily:
                  'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                fontWeight: '400',
                textAlign: 'center',
              },
              textStyle,
            ]}
          >
            {children}
          </Text>
        ) : (
          children
        )}
      </Animated.View>
    </TouchableOpacity>
  )
}
