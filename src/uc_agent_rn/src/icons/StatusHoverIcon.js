import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs } from 'react-native-svg'

const StatusHoverIcon = ({
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
        fill='#FFFFFF'
        fillRule='nonzero'
        cx='4'
        cy='4'
        r='4'
      ></Circle>

      <Mask id='mask-2' fill='white'>
        <Use xlinkHref='#path-1'></Use>
      </Mask>
      <Use
        id='Shape'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1'
      ></Use>

      <Rect id='Rectangle' x='0' y='0' width='12' height='12'></Rect>
    </G>
  </Svg>
)

export default StatusHoverIcon
