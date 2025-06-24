import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const OokIcon = ({ width = 24, height = 24, color = '#212121', ...props }) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1jhapoucd0'
        d='M9.05299 15.7569L18.5629 6.24707L19.7536 7.43786L9.05299 18.1385L4.24707 13.3326L5.43786 12.1418L9.05299 15.7569Z'
      />
      <Mask id='mask-2jhapoucd0' fill='white'>
        <Use xlinkHref='#path-1jhapoucd0'></Use>
      </Mask>
      <Use xlinkHref='#path-1jhapoucd0' />
    </Defs>
    <G
      id='icon/okjhapoucd0'
      fill='none'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
    >
      <Mask id='mask-2jhapoucd0' fill='white'>
        <Use xlinkHref='#path-1jhapoucd0'></Use>
      </Mask>
    </G>
    <G
      id='colors/default/blackjhapoucd0'
      fill='#212121'
      mask='url(#mask-2jhapoucd0)'
    >
      <Rect id='Rectanglejhapoucd0' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default OokIcon
