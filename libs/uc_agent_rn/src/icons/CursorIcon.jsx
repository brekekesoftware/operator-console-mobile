import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const CursorIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Mask id='mask-2ltkuijywq' fill='white'>
        <Use xlinkHref='#path-1ltkuijywq'></Use>
      </Mask>
      <Use xlinkHref='#path-1ltkuijywq' />
    </Defs>
    <G
      id='icon/cursorltkuijywq'
      fill='none'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
    >
      <Mask id='mask-2ltkuijywq' fill='white'>
        <Use xlinkHref='#path-1ltkuijywq'></Use>
      </Mask>
    </G>
    <G
      id='colors/default/blackltkuijywq'
      fill='#212121'
      mask='url(#mask-2ltkuijywq)'
    >
      <Rect id='Rectangleltkuijywq' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default CursorIcon
