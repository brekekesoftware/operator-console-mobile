import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const SpeechBubbleIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1'
        d='M6.66666663,5.99999996 C5.9333333,5.99999996 5.33333329,6.59999997 5.33333329,7.3333333 L5.33333329,15.3333334 L7.3333333,13.3333333 L13.3333333,13.3333333 C14.0666667,13.3333333 14.6666667,12.7333333 14.6666667,12 L14.6666667,7.3333333 C14.6666667,6.59999997 14.0666667,5.99999996 13.3333333,5.99999996 L6.66666663,5.99999996 Z M16,9.33333332 L16,12 C16,13.4706667 14.804,14.6666667 13.3333333,14.6666667 L9.33333332,14.6666667 L9.33333332,15.3333334 C9.33333332,16.0666667 9.93333332,16.6666667 10.6666667,16.6666667 L16.6666667,16.6666667 L18.6666667,18.6666667 L18.6666667,10.6666667 C18.6666667,9.93333332 18.0666667,9.33333332 17.3333334,9.33333332 L16,9.33333332 Z'
      />
      <Mask id='mask-2'>
        <Use xlinkHref='#path-1'></Use>
      </Mask>
      <Use xlinkHref='#path-1' />
    </Defs>
    <G
      id='icon/speech_bubble'
      fill='none'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
    >
      <Mask id='mask-2' fill='white'>
        <Use xlinkHref='#path-1'></Use>
      </Mask>
    </G>
    <G id='colors/default/black' fill='#212121' mask='url(#mask-2)'>
      <Rect id='Rectangle' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default SpeechBubbleIcon
