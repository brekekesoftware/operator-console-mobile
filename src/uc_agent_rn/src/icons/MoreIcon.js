import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const MoreIcon = ({ width = 24, height = 24, color = '#212121', ...props }) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1'
        d='M6.66666663,10.4 C5.78293329,10.4 5.06666662,11.1162667 5.06666662,12 C5.06666662,12.8837333 5.78293329,13.6 6.66666663,13.6 C7.55039997,13.6 8.26666664,12.8837333 8.26666664,12 C8.26666664,11.1162667 7.55039997,10.4 6.66666663,10.4 Z M12,10.4 C11.1162667,10.4 10.4,11.1162667 10.4,12 C10.4,12.8837333 11.1162667,13.6 12,13.6 C12.8837333,13.6 13.6,12.8837333 13.6,12 C13.6,11.1162667 12.8837333,10.4 12,10.4 Z M17.3333334,10.4 C16.4496,10.4 15.7333334,11.1162667 15.7333334,12 C15.7333334,12.8837333 16.4496,13.6 17.3333334,13.6 C18.2170667,13.6 18.9333334,12.8837333 18.9333334,12 C18.9333334,11.1162667 18.2170667,10.4 17.3333334,10.4 Z'
      />
      <Mask id='mask-2'>
        <Use xlinkHref='#path-1'></Use>
      </Mask>
      <Use xlinkHref='#path-1' />
    </Defs>
    <G
      id='icon/more'
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

export default MoreIcon
