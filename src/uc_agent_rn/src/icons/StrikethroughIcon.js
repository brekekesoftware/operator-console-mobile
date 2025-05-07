import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const StrikethroughIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Mask id='mask-2' fill='white'>
        <Use xlinkHref='#path-1'></Use>
      </Mask>
      <Polygon
        id='path-1'
        points='7.3333333 5.99999996 7.3333333 7.60416664 11 7.60416664 11 11.3333333 7.99999997 11.3333333 7.99999997 12.6666667 11 12.6666667 11 18 13 18 13 12.6666667 16 12.6666667 16 11.3333333 13 11.3333333 13 7.60416664 16.6666667 7.60416664 16.6666667 5.99999996'
      />
      <Use xlinkHref='#path-1' />
    </Defs>
    <G
      id='icon/strikethrough'
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

export default StrikethroughIcon
