import { useEffect, useRef } from 'react'
import { Animated, View } from 'react-native'
// import AwesomeButton from 'react-native-really-awesome-button'
import type { ButtonTypes } from 'react-native-really-awesome-button/lib/typescript/src/Button'

import { AwesomeButton } from './shadow-button/AwesomeButton'

export const ShadowButton = ({
  isFlash,
  ...rest
}: ButtonTypes & { isFlash?: boolean }) => {
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
    <AwesomeButton
      {...rest}
      backgroundColor='#eff3f7'
      textColor='black'
      backgroundActive='white'
      backgroundShadow='white'
      raiseLevel={5}
      backgroundDarker='#d1d8df'
      borderRadius={5}
      // style={{backgroundColor: interpolatedTextColor}}
    />
  )
}
