import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const ArrowRightIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Mask id='mask-2t13p52hh2' fill='white'>
        <Use xlinkHref='#path-1t13p52hh2'></Use>
      </Mask>
      <Polygon
        id='path-1t13p52hh2'
        points='10.7275401 0 10.7275401 20.1581192 6.419144 15.8497229 5 17.2688665 11.7311337 24 18.4622672 17.2688665 17.0431236 15.8497229 12.7347273 20.1581192 12.7347273 0'
      />
      <Use xlinkHref='#path-1t13p52hh2' />
      <Use
        id='Shapet13p52hh2'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1t13p52hh2'
      />
    </Defs>
    <G
      id='icon/arrow-rightt13p52hh2'
      fill='none'
      mask='url(#mask-2t13p52hh2)'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
      transform='translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000) '
    >
      <Mask id='mask-2t13p52hh2' fill='white'>
        <Use xlinkHref='#path-1t13p52hh2'></Use>
      </Mask>
      <Use
        id='Shapet13p52hh2'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1t13p52hh2'
      ></Use>

      <Rect id='Rectanglet13p52hh2' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default ArrowRightIcon
