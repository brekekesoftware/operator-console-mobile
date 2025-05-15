import React from 'react'
import { View } from 'react-native'
import Svg, { Circle, Path } from 'react-native-svg'

const RadioCheckboxCheckedIcon = ({ size = 24, color = '#4CAF50' }) => {
  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
        <Circle cx='12' cy='12' r='10' stroke={color} strokeWidth='2' />
        <Circle cx='12' cy='12' r='6' fill={color} />
      </Svg>
    </View>
  )
}

export default RadioCheckboxCheckedIcon
