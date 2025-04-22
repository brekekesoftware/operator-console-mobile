import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const SearchIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1'
        d='M9.6,4 C6.51668112,4 4,6.51668112 4,9.6 C4,12.6833192 6.51668112,15.2 9.6,15.2 C10.9983984,15.2 12.2760072,14.6784192 13.2593752,13.825 L13.6,14.1656248 L13.6,15.2 L18.4,20 L20,18.4 L15.2,13.6 L14.1656248,13.6 L13.825,13.2593752 C14.6784192,12.2760072 15.2,10.9983984 15.2,9.6 C15.2,6.51668112 12.6833192,4 9.6,4 Z M9.6,5.6 C11.8186144,5.6 13.6,7.38138528 13.6,9.6 C13.6,11.8186144 11.8186144,13.6 9.6,13.6 C7.38138528,13.6 5.6,11.8186144 5.6,9.6 C5.6,7.38138528 7.38138528,5.6 9.6,5.6 Z'
      />
      <Mask id='mask-2'>
        <Use xlinkHref='#path-1'></Use>
      </Mask>
      <Use xlinkHref='#path-1' />
      <Use id='Shape' fill='#191919' fillRule='nonzero' xlinkHref='#path-1' />
    </Defs>
    <G
      id='icon/search'
      fill='none'
      mask='url(#mask-2)'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
    >
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

export default SearchIcon
