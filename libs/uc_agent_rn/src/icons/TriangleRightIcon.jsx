import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const TriangleRightIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Mask id='mask-2gfe8zhut5' fill='white'>
        <Use xlinkHref='#path-1gfe8zhut5'></Use>
      </Mask>
      <Polygon id='path-1gfe8zhut5' points='8 10 12 14 16 10' />
      <Use xlinkHref='#path-1gfe8zhut5' />
      <Use
        id='Shapegfe8zhut5'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1gfe8zhut5'
      />
    </Defs>
    <G
      id='icon/triangle-rightgfe8zhut5'
      fill='none'
      mask='url(#mask-2gfe8zhut5)'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
      transform='translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000) '
    >
      <Mask id='mask-2gfe8zhut5' fill='white'>
        <Use xlinkHref='#path-1gfe8zhut5'></Use>
      </Mask>
      <Use
        id='Shapegfe8zhut5'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1gfe8zhut5'
      ></Use>

      <Rect id='Rectanglegfe8zhut5' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default TriangleRightIcon
