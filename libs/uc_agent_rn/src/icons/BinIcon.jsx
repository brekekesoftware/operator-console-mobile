import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const BinIcon = ({ width = 24, height = 24, color = '#212121', ...props }) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1cluy678rt'
        d='M10.875,4 L10.0625,4.8 L6,4.8 L6,6.4 L8.4375,6.4 L16.5625,6.4 L19,6.4 L19,4.8 L14.9375,4.8 L14.125,4 L10.875,4 Z M6.8125,8 L6.8125,18.4 C6.8125,19.28 7.54375,20 8.4375,20 L16.5625,20 C17.45625,20 18.1875,19.28 18.1875,18.4 L18.1875,8 L6.8125,8 Z'
      />
      <Mask id='mask-2cluy678rt' fill='white'>
        <Use xlinkHref='#path-1cluy678rt'></Use>
      </Mask>
      <Use xlinkHref='#path-1cluy678rt' />
      <Use
        id='Shapecluy678rt'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1cluy678rt'
      />
    </Defs>
    <G
      id='icon/bincluy678rt'
      fill='none'
      mask='url(#mask-2cluy678rt)'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
    >
      <Mask id='mask-2cluy678rt' fill='white'>
        <Use xlinkHref='#path-1cluy678rt'></Use>
      </Mask>
      <Use
        id='Shapecluy678rt'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1cluy678rt'
      ></Use>

      <Rect id='Rectanglecluy678rt' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default BinIcon
