import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const TriangleLeftIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Mask id='mask-2anc6w6awz' fill='white'>
        <Use xlinkHref='#path-1anc6w6awz'></Use>
      </Mask>
      <Polygon id='path-1anc6w6awz' points='8 10 12 14 16 10' />
      <Use xlinkHref='#path-1anc6w6awz' />
      <Use
        id='Shapeanc6w6awz'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1anc6w6awz'
      />
    </Defs>
    <G
      id='icon/triangle-leftanc6w6awz'
      fill='none'
      mask='url(#mask-2anc6w6awz)'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
      transform='translate(12.000000, 12.000000) rotate(-270.000000) translate(-12.000000, -12.000000) '
    >
      <Mask id='mask-2anc6w6awz' fill='white'>
        <Use xlinkHref='#path-1anc6w6awz'></Use>
      </Mask>
      <Use
        id='Shapeanc6w6awz'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1anc6w6awz'
      ></Use>

      <Rect id='Rectangleanc6w6awz' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default TriangleLeftIcon
