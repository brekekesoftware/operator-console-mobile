import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const BackIcon = ({ width = 24, height = 24, color = '#212121', ...props }) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1384a5qkqb'
        d='M5,7 L5,17 L11.6111111,12 L5,7 Z M12,7 L12,17 L18.6111111,12 L12,7 Z'
      />
      <Mask id='mask-2384a5qkqb' fill='white'>
        <Use xlinkHref='#path-1384a5qkqb'></Use>
      </Mask>
      <Use xlinkHref='#path-1384a5qkqb' />
      <Use
        id='Shape384a5qkqb'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1384a5qkqb'
      />
    </Defs>
    <G
      id='icon/back-384a5qkqb'
      fill='none'
      mask='url(#mask-2384a5qkqb)'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
      transform='translate(12.000000, 12.000000) scale(-1, 1) translate(-12.000000, -12.000000) '
    >
      <Mask id='mask-2384a5qkqb' fill='white'>
        <Use xlinkHref='#path-1384a5qkqb'></Use>
      </Mask>
      <Use
        id='Shape384a5qkqb'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1384a5qkqb'
      ></Use>

      <Rect id='Rectangle384a5qkqb' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default BackIcon
