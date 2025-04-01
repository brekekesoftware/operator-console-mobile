import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs } from 'react-native-svg'

const DownloadIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1'
        d='M12,15.75 L7.49999998,11.75 L10.5,11.75 L10.5,5.75 C10.5,5.336 10.836,5 11.25,5 L12.75,5 C13.164,5 13.5,5.336 13.5,5.75 L13.5,11.75 L16.5,11.75 L12,15.75 Z M4.49999996,18 L4.49999996,19.5 L19.5,19.5 L19.5,18 L4.49999996,18 Z'
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

export default DownloadIcon
