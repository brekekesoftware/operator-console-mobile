import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const StatusBusyIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 8 8' {...props}>
    <Defs></Defs>
    <G
      id='icon/status-busyw2ikyqemf'
      fill='none'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
    >
      <Circle
        id='components/avatar/status-onlinew2ikyqemf'
        stroke='#F5F5F5'
        fill='#FF1441'
        fillRule='nonzero'
        cx='4'
        cy='4'
        r='4'
      ></Circle>
    </G>
  </Svg>
)

export default StatusBusyIcon
