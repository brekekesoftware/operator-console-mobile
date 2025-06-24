import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const HoldIcon = ({ width = 24, height = 24, color = '#212121', ...props }) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-14wlz0b5rr'
        d='M6,6 L6,18 L10,18 L10,6 L6,6 Z M14,6 L14,18 L18,18 L18,6 L14,6 Z'
      />
      <Mask id='mask-24wlz0b5rr' fill='white'>
        <Use xlinkHref='#path-14wlz0b5rr'></Use>
      </Mask>
      <Use xlinkHref='#path-14wlz0b5rr' />
      <Use
        id='Shape4wlz0b5rr'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-14wlz0b5rr'
      />
    </Defs>
    <G
      id='icon/hamburger4wlz0b5rr'
      fill='none'
      mask='url(#mask-24wlz0b5rr)'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
    >
      <Mask id='mask-24wlz0b5rr' fill='white'>
        <Use xlinkHref='#path-14wlz0b5rr'></Use>
      </Mask>
      <Use
        id='Shape4wlz0b5rr'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-14wlz0b5rr'
      ></Use>

      <Rect id='Rectangle4wlz0b5rr' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default HoldIcon
