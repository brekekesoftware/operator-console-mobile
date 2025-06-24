import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const PharmaIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1wb1jcvua6'
        d='M5.6,5 L5.6,6.6 L18.4,6.6 L18.4,5 L5.6,5 Z M5.6,8.2 L4,11.4 L4,13 L4.8,13 L4.8,19.4 L19.2,19.4 L19.2,13 L20,13 L20,11.4 L18.4,8.2 L5.6,8.2 Z M6.4,13 L17.6,13 L17.6,17.8 L6.4,17.8 L6.4,13 Z'
      />
      <Mask id='mask-2wb1jcvua6' fill='white'>
        <Use xlinkHref='#path-1wb1jcvua6'></Use>
      </Mask>
      <Use xlinkHref='#path-1wb1jcvua6' />
      <Use
        id='Shapewb1jcvua6'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1wb1jcvua6'
      />
    </Defs>
    <G
      id='icon/pharmawb1jcvua6'
      fill='none'
      mask='url(#mask-2wb1jcvua6)'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
    >
      <Mask id='mask-2wb1jcvua6' fill='white'>
        <Use xlinkHref='#path-1wb1jcvua6'></Use>
      </Mask>
      <Use
        id='Shapewb1jcvua6'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1wb1jcvua6'
      ></Use>

      <Rect id='Rectanglewb1jcvua6' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default PharmaIcon
