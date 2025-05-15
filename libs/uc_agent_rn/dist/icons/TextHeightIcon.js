import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const TextHeightIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1'
        d='M17.3333334,5.33333329 L15.3333334,8.66666665 L16.6666667,8.66666665 L16.6666667,15.3333334 L15.3333334,15.3333334 L17.3333334,18.6666667 L19.3333334,15.3333334 L18,15.3333334 L18,8.66666665 L19.3333334,8.66666665 L17.3333334,5.33333329 Z M4.66666662,6.66666663 L4.66666662,7.99999997 L8.66666665,7.99999997 L8.66666665,17.3333334 L10.6666667,17.3333334 L10.6666667,7.99999997 L14.6666667,7.99999997 L14.6666667,6.66666663 L4.66666662,6.66666663 Z'
      />
      <Mask id='mask-2' fill='white'>
        <Use xlinkHref='#path-1'></Use>
      </Mask>
      <Use xlinkHref='#path-1' />
    </Defs>
    <G
      id='icon/text-height'
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

export default TextHeightIcon
