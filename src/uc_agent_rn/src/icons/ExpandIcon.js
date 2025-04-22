import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const ExpandIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1'
        d='M5.33333329,5.33333329 L5.33333329,9.99999999 L6.66666663,9.99999999 L6.66666663,7.60416664 L9.72916665,10.6666667 L10.6666667,9.72916665 L7.60416664,6.66666663 L9.99999999,6.66666663 L9.99999999,5.33333329 L5.33333329,5.33333329 Z M14,5.33333329 L14,6.66666663 L16.3958334,6.66666663 L13.3333333,9.72916665 L14.2708333,10.6666667 L17.3333334,7.60416664 L17.3333334,9.99999999 L18.6666667,9.99999999 L18.6666667,5.33333329 L14,5.33333329 Z M9.72916665,13.3333333 L6.66666663,16.3958334 L6.66666663,14 L5.33333329,14 L5.33333329,18.6666667 L9.99999999,18.6666667 L9.99999999,17.3333334 L7.60416664,17.3333334 L10.6666667,14.2708333 L9.72916665,13.3333333 Z M14.2708333,13.3333333 L13.3333333,14.2708333 L16.3958334,17.3333334 L14,17.3333334 L14,18.6666667 L18.6666667,18.6666667 L18.6666667,14 L17.3333334,14 L17.3333334,16.3958334 L14.2708333,13.3333333 Z'
      />
      <Mask id='mask-2'>
        <Use xlinkHref='#path-1'></Use>
      </Mask>
      <Use xlinkHref='#path-1' />
    </Defs>
    <G
      id='icon/expand'
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

export default ExpandIcon
