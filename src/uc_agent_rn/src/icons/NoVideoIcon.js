import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const NoVideoIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1'
        d='M6.2708333,5.33333329 L5.33333329,6.2708333 L7.06249997,7.99999997 L6.66666663,7.99999997 C5.9296873,7.99999997 5.33333329,8.59635398 5.33333329,9.33333332 L5.33333329,14.6666667 C5.33333329,15.403646 5.9296873,16 6.66666663,16 L14,16 C14.2968753,16 14.5703127,15.8932294 14.7916667,15.7291667 L17.7291667,18.6666667 L18.6666667,17.7291667 L6.2708333,5.33333329 Z M10.6666667,7.99999997 L15.3333334,12.6666667 L15.3333334,9.33333332 C15.3333334,8.59635398 14.7369794,7.99999997 14,7.99999997 L10.6666667,7.99999997 Z M18.6666667,8.66666665 L16,10.6666667 L16,13.3333333 L18.6666667,16 L18.6666667,8.66666665 Z'
      />
      <Mask id='mask-2'>
        <Use xlinkHref='#path-1'></Use>
      </Mask>
      <Use xlinkHref='#path-1' />
    </Defs>
    <G
      id='icon/no-video'
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

export default NoVideoIcon
