import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs } from 'react-native-svg'

const OkIcon = ({ width = 24, height = 24, color = '#212121', ...props }) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1'
        d='M12,4 C7.5816,4 4,7.5816 4,12 C4,16.4184 7.5816,20 12,20 C16.4184,20 20,16.4184 20,12 C20,7.5816 16.4184,4 12,4 Z M10.4,16.3312 L6.6344,12.5656 L7.7656,11.4344 L10.4,14.0688 L16.2344,8.2344 L17.3656,9.3656 L10.4,16.3312 Z'
      />
    </Defs>
    <G>
      <Mask id='mask-2' fill='white'>
        <Use xlinkHref='#path-1'></Use>
      </Mask>
    </G>
    <G>
      <Rect id='Rectangle' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default OkIcon
