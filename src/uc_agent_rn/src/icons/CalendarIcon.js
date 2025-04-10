import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs } from 'react-native-svg'

const CalendarIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1'
        d='M7.4,4 L7.4,5.6 L6.6,5.6 C5.72,5.6 5,6.32 5,7.2 L5,18.4 C5,19.28 5.72,20 6.6,20 L17.8,20 C18.68,20 19.4,19.28 19.4,18.4 L19.4,7.2 C19.4,6.32 18.68,5.6 17.8,5.6 L17,5.6 L17,4 L15.4,4 L15.4,5.6 L9,5.6 L9,4 L7.4,4 Z M6.6,9.6 L17.8,9.6 L17.8,18.4 L6.6,18.4 L6.6,9.6 Z'
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

export default CalendarIcon
