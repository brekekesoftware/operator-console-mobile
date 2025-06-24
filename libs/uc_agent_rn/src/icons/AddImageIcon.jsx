import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const AddImageIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-183lecngp3'
        d='M6.66666663,6.66666663 C5.93229196,6.66666663 5.33333329,7.2656253 5.33333329,7.99999997 L5.33333329,16 C5.33333329,16.7343754 5.93229196,17.3333334 6.66666663,17.3333334 L17.3333334,17.3333334 C18.0677087,17.3333334 18.6666667,16.7343754 18.6666667,16 L18.6666667,7.99999997 C18.6666667,7.2656253 18.0677087,6.66666663 17.3333334,6.66666663 L6.66666663,6.66666663 Z M6.66666663,7.99999997 L17.3333334,7.99999997 L17.3333334,16 L6.66666663,16 L6.66666663,7.99999997 Z M11.3333333,9.33333332 L11.3333333,11.3333333 L9.33333332,11.3333333 L9.33333332,12.6666667 L11.3333333,12.6666667 L11.3333333,14.6666667 L12.6666667,14.6666667 L12.6666667,12.6666667 L14.6666667,12.6666667 L14.6666667,11.3333333 L12.6666667,11.3333333 L12.6666667,9.33333332 L11.3333333,9.33333332 Z'
      />
      <Mask id='mask-283lecngp3' fill='white'>
        <Use xlinkHref='#path-183lecngp3'></Use>
      </Mask>
      <Use xlinkHref='#path-183lecngp3' />
    </Defs>
    <G
      id='icon/add-image83lecngp3'
      fill='none'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
    >
      <Mask id='mask-283lecngp3' fill='white'>
        <Use xlinkHref='#path-183lecngp3'></Use>
      </Mask>
    </G>
    <G
      id='colors/default/black83lecngp3'
      fill='#212121'
      mask='url(#mask-283lecngp3)'
    >
      <Rect id='Rectangle83lecngp3' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default AddImageIcon
