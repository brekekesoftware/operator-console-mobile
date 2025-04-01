import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs } from 'react-native-svg'

const StatusOfflineIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 8 8' {...props}>
    <G>
      <Circle
        id='components/avatar/status-online'
        stroke='#F5F5F5'
        fill='#E0E0E0'
        fillRule='nonzero'
        cx='4'
        cy='4'
        r='4'
      ></Circle>
    </G>
  </Svg>
)

export default StatusOfflineIcon
