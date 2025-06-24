import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const EnvelopeIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-101vzc7fhj'
        d='M18.4,6 L5.6,6 C4.716,6 4,6.716 4,7.6 L4,17.2 C4,18.084 4.716,18.8 5.6,18.8 L18.4,18.8 C19.284,18.8 20,18.084 20,17.2 L20,7.6 C20,6.716 19.284,6 18.4,6 Z M18.4,9.2 L12,13.2 L5.6,9.2 L5.6,7.6 L12,11.6 L18.4,7.6 L18.4,9.2 Z'
      />
      <Mask id='mask-201vzc7fhj' fill='white'>
        <Use xlinkHref='#path-101vzc7fhj'></Use>
      </Mask>
      <Use xlinkHref='#path-101vzc7fhj' />
      <Use
        id='Shape01vzc7fhj'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-101vzc7fhj'
      />
    </Defs>
    <G
      id='icon/envelope01vzc7fhj'
      fill='none'
      mask='url(#mask-201vzc7fhj)'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
    >
      <Mask id='mask-201vzc7fhj' fill='white'>
        <Use xlinkHref='#path-101vzc7fhj'></Use>
      </Mask>
      <Use
        id='Shape01vzc7fhj'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-101vzc7fhj'
      ></Use>

      <Rect id='Rectangle01vzc7fhj' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default EnvelopeIcon
