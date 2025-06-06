import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const VolumeLoudIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1'
        d='M12,5 L7.2,9.66666667 L4,9.66666667 L4,14.3333333 L7.2,14.3333333 L12,19 L12,5 Z M13.6,5.07747398 L13.6,6.63302953 C16.15,6.99761287 18.1380856,9.00339084 18.3765624,11.4956593 C18.3924608,11.6618113 18.4,11.8298611 18.4,12 C18.4,14.7222222 16.32,16.9780819 13.6,17.3669708 L13.6,18.9225263 C17.2,18.5336374 20,15.5777778 20,12 C20,8.42222222 17.2,5.46636287 13.6,5.07747398 Z M13.6,8.18858509 L13.6,9.82161462 C14.56,10.1327257 15.2,10.9888889 15.2,12 C15.2,13.0111111 14.56,13.8672741 13.6,14.1783852 L13.6,15.8114152 C15.44,15.4225263 16.8,13.8666667 16.8,12 C16.8,10.1333333 15.44,8.57747398 13.6,8.18858509 Z'
      />
      <Mask id='mask-2' fill='white'>
        <Use xlinkHref='#path-1'></Use>
      </Mask>
      <Use xlinkHref='#path-1' />
      <Use id='Shape' fill='#191919' fillRule='nonzero' xlinkHref='#path-1' />
    </Defs>
    <G
      id='icon/volume-loud'
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

export default VolumeLoudIcon
