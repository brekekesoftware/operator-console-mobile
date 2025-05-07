import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const PlusMathIcon = ({
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
        points='11.3333333 5.99999996 11.3333333 11.3333333 5.99999996 11.3333333 5.99999996 12.6666667 11.3333333 12.6666667 11.3333333 18 12.6666667 18 12.6666667 12.6666667 18 12.6666667 18 11.3333333 12.6666667 11.3333333 12.6666667 5.99999996'
      />
      <Use xlinkHref='#path-1' />
    </Defs>
    <G
      id='icon/plus-math'
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

export default PlusMathIcon
