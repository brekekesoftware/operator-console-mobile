import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const MediumVolumeIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1'
        d='M12,5.99999996 L7.99999997,9.99999999 L5.33333329,9.99999999 L5.33333329,14 L7.99999997,14 L12,18 L12,5.99999996 Z M13.3333333,7.3333333 L13.3333333,8.66666665 C14.8515627,8.97656265 16,10.3906253 16,12 C16,13.6093753 14.8515627,15.0234374 13.3333333,15.3333334 L13.3333333,16.6666667 C15.591146,16.341146 17.3333334,14.346354 17.3333334,12 C17.3333334,9.65364599 15.591146,7.65885397 13.3333333,7.3333333 Z M13.3333333,9.99999999 L13.3333333,14 C14.0833333,13.7916667 14.6666667,12.9843753 14.6666667,12 C14.6666667,11.0156253 14.0833333,10.2578127 13.3333333,9.99999999 Z'
      />
      <Mask id='mask-2'>
        <Use xlinkHref='#path-1'></Use>
      </Mask>
      <Use xlinkHref='#path-1' />
    </Defs>
    <G
      id='icon/medium_volume'
      fill='none'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
    >
      <Mask id='mask-2' fill='white'>
        <Use xlinkHref='#path-1'></Use>
      </Mask>
    </G>
    <G id='colors/default/black' fill='#212121' mask='url(#mask-2)'>
      <Rect id='Rectangle' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default MediumVolumeIcon
