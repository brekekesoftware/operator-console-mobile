import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const FillColorIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1'
        d='M9.47916665,5.33333329 L8.52083331,6.2708333 L10.375,8.12499998 L6.54166663,11.8541667 L6.5208333,11.8541667 C5.75260396,12.622396 5.75260396,13.8984373 6.5208333,14.6666667 L6.56249997,14.7083334 L9.93749999,18.0625 C10.7057293,18.8307294 11.9296873,18.8828127 12.6666667,18.1458334 L16.0625,14.7291667 C16.8307294,13.9609373 16.8307294,12.7057293 16.0625,11.9375 L14.7291667,10.6041667 L11.8125,7.66666664 L9.47916665,5.33333329 Z M11.3125,9.06249998 L15.125,12.875 C15.2734374,13.0234373 15.3541667,13.1796873 15.3541667,13.3333333 L7.2708333,13.3333333 C7.24739597,13.15625 7.30989597,12.9817707 7.47916664,12.8125 L11.3125,9.06249998 Z M17.3333334,14.6666667 C17.3333334,14.6666667 16,16.5989587 16,17.3333334 C16,18.0677087 16.5989587,18.6666667 17.3333334,18.6666667 C18.0677087,18.6666667 18.6666667,18.0677087 18.6666667,17.3333334 C18.6666667,16.5989587 17.3333334,14.6666667 17.3333334,14.6666667 Z'
      />
      <Mask id='mask-2' fill='white'>
        <Use xlinkHref='#path-1'></Use>
      </Mask>
      <Use xlinkHref='#path-1' />
    </Defs>
    <G
      id='icon/fill-color'
      fill='none'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
    >
      <Mask id='mask-2' fill='white'>
        <Use xlinkHref='#path-1'></Use>
      </Mask>
    </G>
    <G id='colors/default/black' fill={color} mask='url(#mask-2)'>
      <Rect id='Rectangle' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default FillColorIcon
