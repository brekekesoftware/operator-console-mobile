import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs } from 'react-native-svg'

const JobIcon = ({ width = 24, height = 24, color = '#212121', ...props }) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1'
        d='M9.6,5 L9.6,5.8 L5.6,5.8 C4.716,5.8 4,6.516 4,7.4 L4,12.2 C4,13.0824 4.7176,13.8 5.6,13.8 L18.4,13.8 C19.2824,13.8 20,13.0824 20,12.2 L20,7.4 C20,6.516 19.284,5.8 18.4,5.8 L14.4,5.8 L14.4,5 L9.6,5 Z M12,10.6 C12.4416,10.6 12.8,10.9584 12.8,11.4 C12.8,11.8416 12.4416,12.2 12,12.2 C11.5584,12.2 11.2,11.8416 11.2,11.4 C11.2,10.9584 11.5584,10.6 12,10.6 Z M4,14.9546872 L4,17 C4,17.884 4.716,18.6 5.6,18.6 L18.4,18.6 C19.284,18.6 20,17.884 20,17 L20,14.9546872 C19.5272,15.2298872 18.9856,15.4 18.4,15.4 L5.6,15.4 C5.0144,15.4 4.4728,15.2298872 4,14.9546872 Z'
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

export default JobIcon
