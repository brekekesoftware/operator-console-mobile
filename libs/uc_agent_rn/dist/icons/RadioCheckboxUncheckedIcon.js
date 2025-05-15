import React from 'react'
import { View } from 'react-native'
import Svg, { Circle } from 'react-native-svg'

const RadioCheckboxUncheckedIcon = ({ size = 24, color = '#757575' }) => {
  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
        <Circle cx='12' cy='12' r='10' stroke={color} strokeWidth='2' />
      </Svg>
    </View>
  )
}

export default RadioCheckboxUncheckedIcon
