import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const ItalicIcon = ({
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
        points='9.99999999 5.99999996 9.99999999 7.99999997 11.5416667 7.99999997 10.375 16 8.66666665 16 8.66666665 18 14 18 14 16 12.375 16 13.5416667 7.99999997 15.3333334 7.99999997 15.3333334 5.99999996'
      />
      <Use xlinkHref='#path-1' />
    </Defs>
    <G
      id='icon/italic'
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

export default ItalicIcon
