import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const TimeIcon = ({ width = 24, height = 24, color = '#212121', ...props }) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1447gszsc1'
        d='M12,4 C7.5816,4 4,7.5816 4,12 C4,16.4184 7.5816,20 12,20 C16.4184,20 20,16.4184 20,12 C20,7.5816 16.4184,4 12,4 Z M14.6344,15.7656 L11.2,12.3312 L11.2,7.2 L12.8,7.2 L12.8,11.6688 L15.7656,14.6344 L14.6344,15.7656 Z'
      />
      <Mask id='mask-2447gszsc1' fill='white'>
        <Use xlinkHref='#path-1447gszsc1'></Use>
      </Mask>
      <Use xlinkHref='#path-1447gszsc1' />
      <Use
        id='Shape447gszsc1'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1447gszsc1'
      />
    </Defs>
    <G
      id='icon/time447gszsc1'
      fill='none'
      mask='url(#mask-2447gszsc1)'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
    >
      <Mask id='mask-2447gszsc1' fill='white'>
        <Use xlinkHref='#path-1447gszsc1'></Use>
      </Mask>
      <Use
        id='Shape447gszsc1'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1447gszsc1'
      ></Use>

      <Rect id='Rectangle447gszsc1' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default TimeIcon
