import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs } from 'react-native-svg'

const HamburgerIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1'
        d='M4,6 L4,7.6 L20,7.6 L20,6 L4,6 Z M4,10.8 L4,12.4 L20,12.4 L20,10.8 L4,10.8 Z M4,15.6 L4,17.2 L20,17.2 L20,15.6 L4,15.6 Z'
      />
    </Defs>
    <G>
      <Mask id='mask-2' fill='white'>
        <Use xlinkHref='#path-1'></Use>
      </Mask>
      <Use
        id='Shape'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1'
      ></Use>

      <Rect id='Rectangle' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default HamburgerIcon
