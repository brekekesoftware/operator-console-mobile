import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs } from 'react-native-svg'

const ReplyIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1'
        d='M17.3333334,5.99999996 L6.66666663,5.99999996 C5.9333333,5.99999996 5.33999996,6.59999997 5.33999996,7.3333333 L5.33333329,19.3333334 L7.99999997,16.6666667 L17.3333334,16.6666667 C18.0666667,16.6666667 18.6666667,16.0666667 18.6666667,15.3333334 L18.6666667,7.3333333 C18.6666667,6.59999997 18.0666667,5.99999996 17.3333334,5.99999996 Z M11.25,8.4166667 L11.25,10.6666667 L15.75,10.6666667 L15.75,12.1666667 L11.25,12.1666667 L11.25,14.4166667 L8.25,11.4166667 L11.25,8.4166667 Z'
      />
    </Defs>
    <G>
      <Mask id='mask-2' fill='white'>
        <Use xlinkHref='#path-1'></Use>
      </Mask>
    </G>
    <G>
      <Rect id='Rectangle' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default ReplyIcon
