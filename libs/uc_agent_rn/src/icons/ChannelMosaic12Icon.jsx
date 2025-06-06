import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const ChannelMosaic12Icon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1'
        d='M5.33333329,6.66666663 L5.33333329,15.3333334 L18.6666667,15.3333334 L18.6666667,6.66666663 L5.33333329,6.66666663 Z M6.66666663,7.99999997 L17.3333334,7.99999997 L17.3333334,14 L6.66666663,14 L6.66666663,7.99999997 Z M7.99999997,8.66666665 L7.99999997,11.3333333 L11.3333333,11.3333333 L11.3333333,8.66666665 L7.99999997,8.66666665 Z M12.6666667,8.66666665 L12.6666667,11.3333333 L16,11.3333333 L16,8.66666665 L12.6666667,8.66666665 Z M7.99999997,11.3333333 L7.99999997,13.3333333 L11.3333333,13.3333333 L11.3333333,11.3333333 L7.99999997,11.3333333 Z M12.6666667,11.3333333 L12.6666667,13.3333333 L16,13.3333333 L16,11.3333333 L12.6666667,11.3333333 Z M8.66666665,16 L8.66666665,17.3333334 L15.3333334,17.3333334 L15.3333334,16 L8.66666665,16 Z'
      />
      <Mask id='mask-2' fill='white'>
        <Use xlinkHref='#path-1'></Use>
      </Mask>
      <Use xlinkHref='#path-1' />
    </Defs>
    <G
      id='icon/channel-mosaic-1-2'
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

export default ChannelMosaic12Icon
