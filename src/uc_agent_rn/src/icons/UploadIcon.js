import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs } from 'react-native-svg'

const UploadIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1'
        d='M12,4.49999996 L7.49999998,8.99999998 L10.5,8.99999998 L10.5,15 C10.5,15.414 10.836,15.75 11.25,15.75 L12.75,15.75 C13.164,15.75 13.5,15.414 13.5,15 L13.5,8.99999998 L16.5,8.99999998 L12,4.49999996 Z M4.49999996,18 L4.49999996,19.5 L19.5,19.5 L19.5,18 L4.49999996,18 Z'
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

export default UploadIcon
