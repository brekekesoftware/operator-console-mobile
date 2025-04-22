import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const LocationIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1'
        d='M12.5,4 C9.46242857,4 7,6.5072 7,9.6 C7,13.6 12.5,20 12.5,20 C12.5,20 18,13.6 18,9.6 C18,6.5072 15.5375714,4 12.5,4 Z M12.5,11.6 C11.4149286,11.6 10.5357143,10.7048 10.5357143,9.6 C10.5357143,8.4952 11.4149286,7.6 12.5,7.6 C13.5850714,7.6 14.4642857,8.4952 14.4642857,9.6 C14.4642857,10.7048 13.5850714,11.6 12.5,11.6 Z'
      />
      <Mask id='mask-2'>
        <Use xlinkHref='#path-1'></Use>
      </Mask>
      <Use xlinkHref='#path-1' />
      <Use id='Shape' fill='#191919' fillRule='nonzero' xlinkHref='#path-1' />
    </Defs>
    <G
      id='icon/location'
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

export default LocationIcon
