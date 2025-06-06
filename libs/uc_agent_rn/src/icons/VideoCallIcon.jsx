import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const VideoCallIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1'
        d='M5.99999996,7.3333333 C5.26466662,7.3333333 4.66666662,7.93133331 4.66666662,8.66666665 L4.66666662,15.3333334 C4.66666662,16.0686667 5.26466662,16.6666667 5.99999996,16.6666667 L14.6666667,16.6666667 C15.402,16.6666667 16,16.0686667 16,15.3333334 L16,13.3867187 L19.3333334,16.0533854 L19.3333334,7.94661457 L16,10.6132813 L16,8.66666665 C16,7.93133331 15.402,7.3333333 14.6666667,7.3333333 L5.99999996,7.3333333 Z'
      />
      <Mask id='mask-2' fill='white'>
        <Use xlinkHref='#path-1'></Use>
      </Mask>
      <Use xlinkHref='#path-1' />
    </Defs>
    <G
      id='icon/video-call'
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

export default VideoCallIcon
