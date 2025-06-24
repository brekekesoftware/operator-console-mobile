import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const ChevronLeftIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Mask id='mask-2xteeuo5ml' fill='white'>
        <Use xlinkHref='#path-1xteeuo5ml'></Use>
      </Mask>
      <Polygon
        id='path-1xteeuo5ml'
        points='8.98841703 10 8 10.988417 12.0000002 14.9884169 16 10.988417 15.011583 10 12.0000002 13.0115828'
      />
      <Use xlinkHref='#path-1xteeuo5ml' />
      <Use
        id='Shapexteeuo5ml'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1xteeuo5ml'
      />
    </Defs>
    <G
      id='icon/chevron-leftxteeuo5ml'
      fill='none'
      mask='url(#mask-2xteeuo5ml)'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
      transform='translate(12.000000, 12.000000) rotate(-270.000000) translate(-12.000000, -12.000000) '
    >
      <Mask id='mask-2xteeuo5ml' fill='white'>
        <Use xlinkHref='#path-1xteeuo5ml'></Use>
      </Mask>
      <Use
        id='Shapexteeuo5ml'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1xteeuo5ml'
      ></Use>

      <Rect id='Rectanglexteeuo5ml' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default ChevronLeftIcon
