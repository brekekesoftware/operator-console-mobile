import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs } from 'react-native-svg'

const FavouriteIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1'
        d='M15.6,5 C13.284,5 12,6.65 12,6.65 C12,6.65 10.716,5 8.4,5 C5.9696,5 4,6.94368421 4,9.34210526 C4,12.635 7.9296,15.8260526 9.0248,16.8342105 C10.2864,17.9947368 12,19.4868421 12,19.4868421 C12,19.4868421 13.7136,17.9947368 14.9752,16.8342105 C16.0704,15.8260526 20,12.635 20,9.34210526 C20,6.94368421 18.0304,5 15.6,5 Z'
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

export default FavouriteIcon
