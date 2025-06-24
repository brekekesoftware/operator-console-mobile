import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const HamburgerIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1k0dznmbpl'
        d='M4,6 L4,7.6 L20,7.6 L20,6 L4,6 Z M4,10.8 L4,12.4 L20,12.4 L20,10.8 L4,10.8 Z M4,15.6 L4,17.2 L20,17.2 L20,15.6 L4,15.6 Z'
      />
      <Mask id='mask-2k0dznmbpl' fill='white'>
        <Use xlinkHref='#path-1k0dznmbpl'></Use>
      </Mask>
      <Use xlinkHref='#path-1k0dznmbpl' />
      <Use
        id='Shapek0dznmbpl'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1k0dznmbpl'
      />
    </Defs>
    <G
      id='icon/hamburgerk0dznmbpl'
      fill='none'
      mask='url(#mask-2k0dznmbpl)'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
    >
      <Mask id='mask-2k0dznmbpl' fill='white'>
        <Use xlinkHref='#path-1k0dznmbpl'></Use>
      </Mask>
      <Use
        id='Shapek0dznmbpl'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1k0dznmbpl'
      ></Use>

      <Rect id='Rectanglek0dznmbpl' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default HamburgerIcon
