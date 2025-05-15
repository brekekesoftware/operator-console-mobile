import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const PlusIcon = ({ width = 24, height = 24, color = '#212121', ...props }) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Mask id='mask-2' fill='white'>
        <Use xlinkHref='#path-1'></Use>
      </Mask>
      <Polygon
        id='path-1'
        points='11.2222222 5 11.2222222 11.2222222 5 11.2222222 5 12.7777778 11.2222222 12.7777778 11.2222222 19 12.7777778 19 12.7777778 12.7777778 19 12.7777778 19 11.2222222 12.7777778 11.2222222 12.7777778 5'
      />
      <Use xlinkHref='#path-1' />
      <Use id='Shape' fill='#191919' fillRule='nonzero' xlinkHref='#path-1' />
    </Defs>
    <G
      id='icon/plus'
      fill='none'
      mask='url(#mask-2)'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
    >
      <Mask id='mask-2' fill='white'>
        <Use xlinkHref='#path-1'></Use>
      </Mask>
      <Use
        id='Shape'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1'
      ></Use>

      <Rect id='Rectangle' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default PlusIcon
