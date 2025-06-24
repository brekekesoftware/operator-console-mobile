import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const LogOutIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1q16ba2xme'
        d='M9.33333332,5.33333329 C8.59666665,5.33333329 7.99999997,5.92999996 7.99999997,6.66666663 L7.99999997,17.3333334 C7.99999997,18.07 8.59666665,18.6666667 9.33333332,18.6666667 L14.6666667,18.6666667 C15.4033334,18.6666667 16,18.07 16,17.3333334 L16,12.6666667 L11.3333333,12.6666667 L11.3333333,11.3333333 L16,11.3333333 L16,6.66666663 C16,5.92999996 15.4033334,5.33333329 14.6666667,5.33333329 L9.33333332,5.33333329 Z M16,11.3333333 L16,12.6666667 L17.3333334,12.6666667 L17.3333334,14.6666667 L20.0000001,12 L17.3333334,9.33333332 L17.3333334,11.3333333 L16,11.3333333 Z'
      />
      <Mask id='mask-2q16ba2xme' fill='white'>
        <Use xlinkHref='#path-1q16ba2xme'></Use>
      </Mask>
      <Use xlinkHref='#path-1q16ba2xme' />
    </Defs>
    <G
      id='icon/log-outq16ba2xme'
      fill='none'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
    >
      <Mask id='mask-2q16ba2xme' fill='white'>
        <Use xlinkHref='#path-1q16ba2xme'></Use>
      </Mask>
    </G>
    <G
      id='colors/default/blackq16ba2xme'
      fill='#212121'
      mask='url(#mask-2q16ba2xme)'
    >
      <Rect id='Rectangleq16ba2xme' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default LogOutIcon
