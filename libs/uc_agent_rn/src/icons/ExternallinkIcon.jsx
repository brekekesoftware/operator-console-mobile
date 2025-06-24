import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const ExternallinkIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1gr2wvlucy'
        d='M14,5.33333329 L14,6.66666663 L16.3958334,6.66666663 L13.3333333,9.72916665 L14.2708333,10.6666667 L17.3333334,7.60416664 L17.3333334,9.99999999 L18.6666667,9.99999999 L18.6666667,5.33333329 L14,5.33333329 Z M6.66666663,17.3333334 L6.66666663,10.6666667 L5.33333329,10.6666667 L5.33333329,18.6666667 L13.3333333,18.6666667 L13.3333333,17.3333334 L6.66666663,17.3333334 Z M9.99999999,14 L9.99999999,8.66666667 L12.6666667,8.66666667 L12.6666667,7.33333333 L8.66666667,7.33333333 L8.66666667,15.3333333 L16.6666667,15.3333333 L16.6666667,11.3333333 L15.3333333,11.3333333 L15.3333333,14 L9.99999999,14 Z'
      />
      <Mask id='mask-2gr2wvlucy' fill='white'>
        <Use xlinkHref='#path-1gr2wvlucy'></Use>
      </Mask>
      <Use xlinkHref='#path-1gr2wvlucy' />
    </Defs>
    <G
      id='icon/expandgr2wvlucy'
      fill='none'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
    >
      <Mask id='mask-2gr2wvlucy' fill='white'>
        <Use xlinkHref='#path-1gr2wvlucy'></Use>
      </Mask>
    </G>
    <G
      id='colors/default/blackgr2wvlucy'
      fill='#212121'
      mask='url(#mask-2gr2wvlucy)'
    >
      <Rect id='Rectanglegr2wvlucy' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default ExternallinkIcon
