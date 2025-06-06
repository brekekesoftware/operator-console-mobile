import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const SendIcon = ({ width = 24, height = 24, color = '#212121', ...props }) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1'
        d='M5.99999997,5.99999997 C5.17124996,5.99999997 4.49999996,6.67124997 4.49999996,7.49999998 L4.49999996,16.5 C4.49999996,17.32875 5.17124996,18 5.99999997,18 L12,18 L12,16.5 C12,15.67125 12.67125,15 13.5,15 L16.5,15 L16.5,14.25 L16.5,12.9799808 C16.5,12.1122308 17.5498478,11.678004 18.1625978,12.291504 L19.0605465,13.1894535 L19.5,13.6289063 L19.5,7.49999998 C19.5,6.67124997 18.82875,5.99999997 18,5.99999997 L5.99999997,5.99999997 Z M5.99999997,7.49999997 L12,11.25 L18,7.49999997 L18,8.99999998 L12,12.75 L5.99999997,8.99999998 L5.99999997,7.49999997 Z M18,14.25 L18,16.5 L13.5,16.5 L13.5,18 L18,18 L18,20.25 L21.0000001,17.25 L18,14.25 Z'
      />
      <Mask id='mask-2' fill='white'>
        <Use xlinkHref='#path-1'></Use>
      </Mask>
      <Use xlinkHref='#path-1' />
    </Defs>
    <G
      id='icon/send'
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

export default SendIcon
