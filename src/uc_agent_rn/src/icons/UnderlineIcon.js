import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const UnderlineIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1'
        d='M8.06249998,5.99999996 L8.06249998,12.4583333 C8.06249998,13.591146 8.39062531,14.463542 9.12499998,15.0625 C9.85937532,15.6614587 10.7994793,16 12,16 C13.1328127,16 14.125,15.6614587 14.7916667,15.0625 C15.526042,14.463542 15.9375,13.591146 15.9375,12.4583333 L15.9375,5.99999996 L14,5.99999996 L14,12.4583333 C14,13.125 13.7916667,13.6666667 13.4583333,14 C13.057292,14.3333333 12.5989587,14.5416667 12,14.5416667 C11.401042,14.5416667 10.9375,14.3333333 10.6041667,14 C10.2708333,13.5989587 10.0625,13.125 10.0625,12.4583333 L10.0625,5.99999996 L8.06249998,5.99999996 Z M7.99999997,17.3333334 L7.99999997,18.6666667 L16,18.6666667 L16,17.3333334 L7.99999997,17.3333334 Z'
      />
      <Mask id='mask-2'>
        <Use xlinkHref='#path-1'></Use>
      </Mask>
      <Use xlinkHref='#path-1' />
    </Defs>
    <G
      id='icon/underline'
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

export default UnderlineIcon
