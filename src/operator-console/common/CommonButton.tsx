import { useEffect, useRef } from 'react'
import { Animated, Text, TouchableOpacity } from 'react-native'

import type { BrekekeOperatorConsole } from '../OperatorConsole'
import { getIconJsx } from '../OperatorConsole'
import { Util } from '../Util'

type Props = {
  operatorConsoleAsParent?: BrekekeOperatorConsole
  subtype: string
  icon: string
  label: string
  buttonFgColor: string
  buttonBgColor: string
  buttonOuterBorderRadius: number
  buttonOuterBorderThickness: number
  buttonOuterBorderColor: number
  context?: any
  onPress?: () => void
  className?: string
  disabled?: boolean
  childNode?: React.ReactNode
  isFlash?: boolean
}

export const CommonButton = ({
  subtype,
  icon,
  label,
  buttonFgColor,
  buttonBgColor,
  buttonOuterBorderColor,
  buttonOuterBorderRadius,
  buttonOuterBorderThickness,
  onPress,
  className,
  disabled,
  childNode,
  isFlash = false,
}: Props) => {
  const color = Util.isAntdRgbaProperty(buttonFgColor)
    ? Util.getRgbaCSSStringFromAntdColor(buttonFgColor)
    : ''
  const backgroundColor = Util.isAntdRgbaProperty(buttonBgColor)
    ? Util.getRgbaCSSStringFromAntdColor(buttonBgColor)
    : undefined
  const border =
    Util.isNumeric(buttonOuterBorderThickness) &&
    Util.isAntdRgbaProperty(buttonOuterBorderColor)

  const borderRadius = Util.isNumber(buttonOuterBorderRadius)
    ? buttonOuterBorderRadius
    : undefined
  const iconJsx = getIconJsx(icon, label)

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
      style={{
        borderStyle: border ? 'solid' : undefined,
        borderWidth: border ? buttonOuterBorderThickness : undefined,
        borderColor: border
          ? Util.getRgbaCSSStringFromAntdColor(buttonOuterBorderColor)
          : undefined,
        borderRadius,
        backgroundColor,
      }}
      onPress={onPress}
      disabled={disabled}
    >
      <Animated.View
        style={[
          { flex: 1 },
          {
            backgroundColor: isFlash
              ? interpolatedBackgroundColor
              : backgroundColor,
          },
        ]}
      >
        {childNode ? (
          childNode
        ) : (
          <>
            <Text style={{ color }}>
              {`legacy_button_description.${subtype}`}
            </Text>
            {iconJsx}
          </>
        )}
      </Animated.View>
    </TouchableOpacity>
  )
}
