import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const HappyIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1f0abzihnd'
        d='M12,5.33333329 C8.31799998,5.33333329 5.33333329,8.31799998 5.33333329,12 C5.33333329,15.682 8.31799998,18.6666667 12,18.6666667 C15.682,18.6666667 18.6666667,15.682 18.6666667,12 C18.6666667,8.31799998 15.682,5.33333329 12,5.33333329 Z M14.3333333,9.33333332 C14.8866667,9.33333332 15.3333334,9.77999999 15.3333334,10.3333333 C15.3333334,10.8866667 14.8866667,11.3333333 14.3333333,11.3333333 C13.78,11.3333333 13.3333333,10.8866667 13.3333333,10.3333333 C13.3333333,9.77999999 13.78,9.33333332 14.3333333,9.33333332 Z M9.66666665,9.33333332 C10.22,9.33333332 10.6666667,9.77999999 10.6666667,10.3333333 C10.6666667,10.8866667 10.22,11.3333333 9.66666665,11.3333333 C9.11333332,11.3333333 8.66666665,10.8866667 8.66666665,10.3333333 C8.66666665,9.77999999 9.11333332,9.33333332 9.66666665,9.33333332 Z M12,15.6666667 C10.4466667,15.6666667 9.12666665,14.6933334 8.59333331,13.3333333 L15.4066667,13.3333333 C14.8733334,14.6933334 13.5533333,15.6666667 12,15.6666667 Z'
      />
      <Mask id='mask-2f0abzihnd' fill='white'>
        <Use xlinkHref='#path-1f0abzihnd'></Use>
      </Mask>
      <Use xlinkHref='#path-1f0abzihnd' />
    </Defs>
    <G
      id='icon/happyf0abzihnd'
      fill='none'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
    >
      <Mask id='mask-2f0abzihnd' fill='white'>
        <Use xlinkHref='#path-1f0abzihnd'></Use>
      </Mask>
    </G>
    <G
      id='colors/default/blackf0abzihnd'
      fill='#212121'
      mask='url(#mask-2f0abzihnd)'
    >
      <Rect id='Rectanglef0abzihnd' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default HappyIcon
