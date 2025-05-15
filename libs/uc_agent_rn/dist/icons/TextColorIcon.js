import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const TextColorIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1'
        d='M11.2708333,5.33333329 L7.4583333,15.3333334 L9.27083332,15.3333334 L10.0625,13 L13.9375,13 L14.7916667,15.3333334 L16.6041667,15.3333334 L12.7916667,5.33333329 L11.2708333,5.33333329 Z M12,7.4583333 L13.3958333,11.6041667 L10.5416667,11.6041667 L12,7.4583333 Z M6.66666663,16.6666667 L6.66666663,18.6666667 L17.3333334,18.6666667 L17.3333334,16.6666667 L6.66666663,16.6666667 Z'
      />
      <Mask id='mask-2' fill='white'>
        <Use xlinkHref='#path-1'></Use>
      </Mask>
      <Use xlinkHref='#path-1' />
    </Defs>
    <G
      id='icon/text-color'
      fill='none'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
    >
      <Mask id='mask-2' fill='white'>
        <Use xlinkHref='#path-1'></Use>
      </Mask>
    </G>
    <G id='colors/default/black' fill={color} mask='url(#mask-2)'>
      <Rect id='Rectangle' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default TextColorIcon
