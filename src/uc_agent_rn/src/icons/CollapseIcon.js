import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const CollapseIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1'
        d='M6.2708333,5.33333329 L5.33333329,6.2708333 L8.39583331,9.33333332 L5.99999996,9.33333332 L5.99999996,10.6666667 L10.6666667,10.6666667 L10.6666667,5.99999996 L9.33333332,5.99999996 L9.33333332,8.39583331 L6.2708333,5.33333329 Z M17.7291667,5.33333329 L14.6666667,8.39583331 L14.6666667,5.99999996 L13.3333333,5.99999996 L13.3333333,10.6666667 L18,10.6666667 L18,9.33333332 L15.6041667,9.33333332 L18.6666667,6.2708333 L17.7291667,5.33333329 Z M5.99999996,13.3333333 L5.99999996,14.6666667 L8.39583331,14.6666667 L5.33333329,17.7291667 L6.2708333,18.6666667 L9.33333332,15.6041667 L9.33333332,18 L10.6666667,18 L10.6666667,13.3333333 L5.99999996,13.3333333 Z M13.3333333,13.3333333 L13.3333333,18 L14.6666667,18 L14.6666667,15.6041667 L17.7291667,18.6666667 L18.6666667,17.7291667 L15.6041667,14.6666667 L18,14.6666667 L18,13.3333333 L13.3333333,13.3333333 Z'
      />
      <Mask id='mask-2' fill='white'>
        <Use xlinkHref='#path-1'></Use>
      </Mask>
      <Use xlinkHref='#path-1' />
    </Defs>
    <G
      id='icon/collapse'
      fill='none'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
    >
      <Mask id='mask-2' fill='white'>
        <Use xlinkHref='#path-1'></Use>
      </Mask>
    </G>
    <G id='colors/default/black' fill='#212121' mask='url(#mask-2)'>
      <Rect id='Rectangle' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default CollapseIcon
