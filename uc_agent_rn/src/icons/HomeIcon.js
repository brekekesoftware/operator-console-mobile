import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs } from 'react-native-svg'

const HomeIcon = ({ width = 24, height = 24, color = '#212121', ...props }) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1'
        d='M8,5 L4,10.6 L4.8,10.6 L4.8,19.4 L19.2,19.4 L19.2,10.6 L20,10.6 L16,5 L8,5 Z M9.2,6.67968752 L12,10.6 L17.6,10.6 L17.6,17.8 L11.2,17.8 L11.2,13 L8,13 L8,17.8 L6.4,17.8 L6.4,10.6 L9.2,6.67968752 Z M12.8,13 L12.8,16.2 L16,16.2 L16,13 L12.8,13 Z'
      />
    </Defs>
    <G>
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

export default HomeIcon
