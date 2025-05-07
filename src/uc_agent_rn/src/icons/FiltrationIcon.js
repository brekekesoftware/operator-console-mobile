import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const FiltrationIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1'
        d='M6.66666663,5.33333329 L6.66666663,7.99999997 L5.33333329,7.99999997 L7.3333333,10.6666667 L9.33333332,7.99999997 L7.99999997,7.99999997 L7.99999997,5.33333329 L6.66666663,5.33333329 Z M11.3333333,5.33333329 L11.3333333,7.99999997 L9.99999999,7.99999997 L12,10.6666667 L14,7.99999997 L12.6666667,7.99999997 L12.6666667,5.33333329 L11.3333333,5.33333329 Z M16,5.33333329 L16,7.99999997 L14.6666667,7.99999997 L16.6666667,10.6666667 L18.6666667,7.99999997 L17.3333334,7.99999997 L17.3333334,5.33333329 L16,5.33333329 Z M5.33333329,11.3333333 L5.33333329,12.6666667 L18.6666667,12.6666667 L18.6666667,11.3333333 L5.33333329,11.3333333 Z M8.66666665,13.3333333 L8.66666665,16 L7.3333333,16 L9.33333332,18.6666667 L11.3333333,16 L9.99999999,16 L9.99999999,13.3333333 L8.66666665,13.3333333 Z M14,13.3333333 L14,16 L12.6666667,16 L14.6666667,18.6666667 L16.6666667,16 L15.3333334,16 L15.3333334,13.3333333 L14,13.3333333 Z'
      />
      <Mask id='mask-2' fill='white'>
        <Use xlinkHref='#path-1'></Use>
      </Mask>
      <Use xlinkHref='#path-1' />
    </Defs>
    <G
      id='icon/filtration'
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

export default FiltrationIcon
