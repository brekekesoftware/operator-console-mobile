import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const CancelIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1'
        d='M12,5.33333329 C8.31333331,5.33333329 5.33333329,8.31333331 5.33333329,12 C5.33333329,15.6866667 8.31333331,18.6666667 12,18.6666667 C15.6866667,18.6666667 18.6666667,15.6866667 18.6666667,12 C18.6666667,8.31333331 15.6866667,5.33333329 12,5.33333329 Z M15.3333334,14.3933333 L14.3933333,15.3333334 L12,12.94 L9.60666665,15.3333334 L8.66666665,14.3933333 L11.06,12 L8.66666665,9.60666665 L9.60666665,8.66666665 L12,11.06 L14.3933333,8.66666665 L15.3333334,9.60666665 L12.94,12 L15.3333334,14.3933333 Z'
      />
      <Mask id='mask-2'>
        <Use xlinkHref='#path-1'></Use>
      </Mask>
      <Use xlinkHref='#path-1' />
    </Defs>
    <G
      id='icon/cancel'
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

export default CancelIcon
