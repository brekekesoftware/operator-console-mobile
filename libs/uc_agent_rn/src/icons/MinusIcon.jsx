import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const MinusIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Mask id='mask-2v4rr0is93' fill='white'>
        <Use xlinkHref='#path-1v4rr0is93'></Use>
      </Mask>
      <Polygon id='path-1v4rr0is93' points='5 11 5 13 19 13 19 11' />
      <Use xlinkHref='#path-1v4rr0is93' />
      <Use
        id='Shapev4rr0is93'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1v4rr0is93'
      />
    </Defs>
    <G
      id='icon/minusv4rr0is93'
      fill='none'
      mask='url(#mask-2v4rr0is93)'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
    >
      <Mask id='mask-2v4rr0is93' fill='white'>
        <Use xlinkHref='#path-1v4rr0is93'></Use>
      </Mask>
      <Use
        id='Shapev4rr0is93'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1v4rr0is93'
      ></Use>

      <Rect id='Rectanglev4rr0is93' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default MinusIcon
