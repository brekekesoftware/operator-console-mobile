import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const ChannelMosaic4Icon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1msj6vvs3s'
        d='M5.33333329,6.66666663 L5.33333329,15.3333334 L18.6666667,15.3333334 L18.6666667,6.66666663 L5.33333329,6.66666663 Z M6.66666663,7.99999997 L17.3333334,7.99999997 L17.3333334,14 L6.66666663,14 L6.66666663,7.99999997 Z M7.99999997,8.66666665 L7.99999997,10.6666667 L11.3333333,10.6666667 L11.3333333,8.66666665 L7.99999997,8.66666665 Z M12.6666667,8.66666665 L12.6666667,10.6666667 L16,10.6666667 L16,8.66666665 L12.6666667,8.66666665 Z M7.99999997,11.3333333 L7.99999997,13.3333333 L11.3333333,13.3333333 L11.3333333,11.3333333 L7.99999997,11.3333333 Z M12.6666667,11.3333333 L12.6666667,13.3333333 L16,13.3333333 L16,11.3333333 L12.6666667,11.3333333 Z M8.66666665,16 L8.66666665,17.3333334 L15.3333334,17.3333334 L15.3333334,16 L8.66666665,16 Z'
      />
      <Mask id='mask-2msj6vvs3s' fill='white'>
        <Use xlinkHref='#path-1msj6vvs3s'></Use>
      </Mask>
      <Use xlinkHref='#path-1msj6vvs3s' />
    </Defs>
    <G
      id='icon/channel-mosaic-4msj6vvs3s'
      fill='none'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
    >
      <Mask id='mask-2msj6vvs3s' fill='white'>
        <Use xlinkHref='#path-1msj6vvs3s'></Use>
      </Mask>
    </G>
    <G
      id='colors/default/blackmsj6vvs3s'
      fill='#212121'
      mask='url(#mask-2msj6vvs3s)'
    >
      <Rect id='Rectanglemsj6vvs3s' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default ChannelMosaic4Icon
