import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const AboutIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1wsn8vwnr8'
        d='M17.3333334,5.99999996 L6.66666663,5.99999996 C5.9333333,5.99999996 5.33999996,6.59999997 5.33999996,7.3333333 L5.33333329,19.3333334 L7.99999997,16.6666667 L17.3333334,16.6666667 C18.0666667,16.6666667 18.6666667,16.0666667 18.6666667,15.3333334 L18.6666667,7.3333333 C18.6666667,6.59999997 18.0666667,5.99999996 17.3333334,5.99999996 Z M11.3333333,8.66666665 L12.6666667,8.66666665 L12.6666667,9.99999999 L11.3333333,9.99999999 L11.3333333,8.66666665 Z M11.3333333,11.3333333 L12.6666667,11.3333333 L12.6666667,14 L11.3333333,14 L11.3333333,11.3333333 Z'
      />
      <Mask id='mask-2wsn8vwnr8' fill='white'>
        <Use xlinkHref='#path-1wsn8vwnr8'></Use>
      </Mask>
      <Use xlinkHref='#path-1wsn8vwnr8' />
    </Defs>
    <G
      id='icon/aboutwsn8vwnr8'
      fill='none'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
    >
      <Mask id='mask-2wsn8vwnr8' fill='white'>
        <Use xlinkHref='#path-1wsn8vwnr8'></Use>
      </Mask>
    </G>
    <G
      id='colors/default/blackwsn8vwnr8'
      fill='#212121'
      mask='url(#mask-2wsn8vwnr8)'
    >
      <Rect id='Rectanglewsn8vwnr8' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default AboutIcon
