import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const ArrowLeftIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Mask id='mask-2' fill='white'>
        <Use xlinkHref='#path-1'></Use>
      </Mask>
      <Polygon
        id='path-1'
        points='10.7275401 0 10.7275401 20.1581192 6.419144 15.8497229 5 17.2688665 11.7311337 24 18.4622672 17.2688665 17.0431236 15.8497229 12.7347273 20.1581192 12.7347273 0'
      />
      <Use xlinkHref='#path-1' />
      <Use id='Shape' fill='#191919' fillRule='nonzero' xlinkHref='#path-1' />
    </Defs>
    <G
      id='icon/arrow-left'
      fill='none'
      mask='url(#mask-2)'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
      transform='translate(12.000000, 12.000000) rotate(-270.000000) translate(-12.000000, -12.000000) '
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

export default ArrowLeftIcon
