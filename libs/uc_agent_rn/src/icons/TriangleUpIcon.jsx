import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const TriangleUpIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Mask id='mask-2c34r4m2v7' fill='white'>
        <Use xlinkHref='#path-1c34r4m2v7'></Use>
      </Mask>
      <Polygon id='path-1c34r4m2v7' points='8 10 12 14 16 10' />
      <Use xlinkHref='#path-1c34r4m2v7' />
      <Use
        id='Shapec34r4m2v7'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1c34r4m2v7'
      />
    </Defs>
    <G
      id='icon/triangle-upc34r4m2v7'
      fill='none'
      mask='url(#mask-2c34r4m2v7)'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
      transform='translate(12.000000, 12.000000) rotate(-180.000000) translate(-12.000000, -12.000000) '
    >
      <Mask id='mask-2c34r4m2v7' fill='white'>
        <Use xlinkHref='#path-1c34r4m2v7'></Use>
      </Mask>
      <Use
        id='Shapec34r4m2v7'
       fill={color}
        fillRule='nonzero'
        xlinkHref='#path-1c34r4m2v7'
      ></Use>

      <Rect id='Rectanglec34r4m2v7' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default TriangleUpIcon
