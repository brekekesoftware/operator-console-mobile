import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const ChevronRightIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Mask id='mask-2jcque8h7s' fill='white'>
        <Use xlinkHref='#path-1jcque8h7s'></Use>
      </Mask>
      <Polygon
        id='path-1jcque8h7s'
        points='8.98841703 10 8 10.988417 12.0000002 14.9884169 16 10.988417 15.011583 10 12.0000002 13.0115828'
      />
      <Use xlinkHref='#path-1jcque8h7s' />
      <Use
        id='Shapejcque8h7s'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1jcque8h7s'
      />
    </Defs>
    <G
      id='icon/chevron-rightjcque8h7s'
      fill='none'
      mask='url(#mask-2jcque8h7s)'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
      transform='translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000) '
    >
      <Mask id='mask-2jcque8h7s' fill='white'>
        <Use xlinkHref='#path-1jcque8h7s'></Use>
      </Mask>
      <Use
        id='Shapejcque8h7s'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1jcque8h7s'
      ></Use>

      <Rect id='Rectanglejcque8h7s' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default ChevronRightIcon
