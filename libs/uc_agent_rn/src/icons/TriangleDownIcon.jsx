import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const TriangleDownIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Mask id='mask-2m9mnxlk6v' fill='white'>
        <Use xlinkHref='#path-1m9mnxlk6v'></Use>
      </Mask>
      <Polygon id='path-1m9mnxlk6v' points='8 10 12 14 16 10' />
      <Use xlinkHref='#path-1m9mnxlk6v' />
      <Use
        id='Shapem9mnxlk6v'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1m9mnxlk6v'
      />
    </Defs>
    <G
      id='icon/triangle-downm9mnxlk6v'
      fill='none'
      mask='url(#mask-2m9mnxlk6v)'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
    >
      <Mask id='mask-2m9mnxlk6v' fill='white'>
        <Use xlinkHref='#path-1m9mnxlk6v'></Use>
      </Mask>
      <Use
        id='Shapem9mnxlk6v'
        fill={color}
        fillRule='nonzero'
        xlinkHref='#path-1m9mnxlk6v'
      ></Use>

      <Rect id='Rectanglem9mnxlk6v' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default TriangleDownIcon
