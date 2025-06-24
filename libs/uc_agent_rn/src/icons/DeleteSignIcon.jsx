import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const DeleteSignIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Mask id='mask-20pq9c9apz' fill='white'>
        <Use xlinkHref='#path-10pq9c9apz'></Use>
      </Mask>
      <Polygon
        id='path-10pq9c9apz'
        points='7.13802077 6.1953125 6.1953125 7.13802077 11.057292 12 6.1953125 16.8619794 7.13802077 17.8046874 12 12.942708 16.8619794 17.8046874 17.8046874 16.8619794 12.942708 12 17.8046874 7.13802077 16.8619794 6.1953125 12 11.057292'
      />
      <Use xlinkHref='#path-10pq9c9apz' />
    </Defs>
    <G
      id='icon/delete-sign0pq9c9apz'
      fill='none'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
    >
      <Mask id='mask-20pq9c9apz' fill='white'>
        <Use xlinkHref='#path-10pq9c9apz'></Use>
      </Mask>
    </G>
    <G
      id='colors/default/black0pq9c9apz'
      fill='#212121'
      mask='url(#mask-20pq9c9apz)'
    >
      <Rect id='Rectangle0pq9c9apz' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default DeleteSignIcon
