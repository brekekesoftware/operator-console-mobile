import { useState } from 'react'
import { View } from 'react-native'

import type { ButtonTypes } from './shadow-button/AwesomeButton'
import { AwesomeButton } from './shadow-button/AwesomeButton'

export const ShadowButton = (props: ButtonTypes) => {
  const [height, setHeight] = useState<number>(100)

  return (
    <View
      onLayout={e => setHeight(e.nativeEvent.layout.height)}
      style={{ flex: 1 }}
    >
      <AwesomeButton
        backgroundColor='#eff3f7'
        textColor='black'
        backgroundActive='white'
        backgroundShadow='white'
        raiseLevel={5}
        backgroundDarker='#d1d8df'
        borderRadius={5}
        animatedPlaceholder={false}
        backgroundPlaceholder='#eff3f7'
        stretch
        {...props}
        height={height}
      />
    </View>
  )
}
