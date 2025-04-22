import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const UserIcon = ({ width = 24, height = 24, color = '#212121', ...props }) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1'
        d='M12,5.99999996 C10.5272407,5.99999996 9.33333332,7.1939073 9.33333332,8.66666665 C9.33333332,10.139426 10.5272407,11.3333333 12,11.3333333 C13.4727593,11.3333333 14.6666667,10.139426 14.6666667,8.66666665 C14.6666667,7.1939073 13.4727593,5.99999996 12,5.99999996 Z M9.87369792,13.595052 C7.99569791,14.011052 5.99999996,14.9233334 5.99999996,16.3333334 L5.99999996,18 L18,18 L18,16.3333334 C18,14.9233334 16.004302,14.011052 14.126302,13.595052 C13.6396353,14.2423853 12.872,14.6666667 12,14.6666667 C11.128,14.6666667 10.3603646,14.2423853 9.87369792,13.595052 Z'
      />
      <Mask id='mask-2'>
        <Use xlinkHref='#path-1'></Use>
      </Mask>
      <Use xlinkHref='#path-1' />
    </Defs>
    <G
      id='icon/user'
      fill='none'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
    >
      <Mask id='mask-2' fill='white'>
        <Use xlinkHref='#path-1'></Use>
      </Mask>
    </G>
    <G id='colors/default/black' fill='#212121' mask='url(#mask-2)'>
      <Rect id='Rectangle' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default UserIcon
