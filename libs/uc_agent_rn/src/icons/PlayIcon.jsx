import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const PlayIcon = ({ width = 24, height = 24, color = '#212121', ...props }) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Mask id='mask-2tn7sbaxx3' fill='white'>
        <Use xlinkHref='#path-1tn7sbaxx3'></Use>
      </Mask>
      <Polygon id='path-1tn7sbaxx3' points='8 7 8 18 17 12.5' />
      <Use xlinkHref='#path-1tn7sbaxx3' />
      <Use
        id='Shapetn7sbaxx3'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1tn7sbaxx3'
      />
    </Defs>
    <G
      id='icon/playtn7sbaxx3'
      fill='none'
      mask='url(#mask-2tn7sbaxx3)'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
    >
      <Mask id='mask-2tn7sbaxx3' fill='white'>
        <Use xlinkHref='#path-1tn7sbaxx3'></Use>
      </Mask>
      <Use
        id='Shapetn7sbaxx3'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1tn7sbaxx3'
      ></Use>

      <Rect id='Rectangletn7sbaxx3' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default PlayIcon
