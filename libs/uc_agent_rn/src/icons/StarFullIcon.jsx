import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const StarFullIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Mask id='mask-2uidpkv1x1' fill='white'>
        <Use xlinkHref='#path-1uidpkv1x1'></Use>
      </Mask>
      <Polygon
        id='path-1uidpkv1x1'
        points='12 16.1442963 16.9441781 19.1111111 15.6319551 13.52 20 9.75805291 14.2480774 9.2730582 12 4 9.75192255 9.2730582 4 9.75805291 8.36804487 13.52 7.05582195 19.1111111'
      />
      <Use xlinkHref='#path-1uidpkv1x1' />
      <Use
        id='Shapeuidpkv1x1'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1uidpkv1x1'
      />
    </Defs>
    <G
      id='icon/star-fulluidpkv1x1'
      fill='none'
      mask='url(#mask-2uidpkv1x1)'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
    >
      <Mask id='mask-2uidpkv1x1' fill='white'>
        <Use xlinkHref='#path-1uidpkv1x1'></Use>
      </Mask>
      <Use
        id='Shapeuidpkv1x1'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1uidpkv1x1'
      ></Use>

      <Rect id='Rectangleuidpkv1x1' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default StarFullIcon
