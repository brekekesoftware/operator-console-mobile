import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs } from 'react-native-svg'

const AddIcon = ({ width = 24, height = 24, color = '#212121', ...props }) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1'
        d='M12,5.33333329 C8.31799998,5.33333329 5.33333329,8.31799998 5.33333329,12 C5.33333329,15.682 8.31799998,18.6666667 12,18.6666667 C15.682,18.6666667 18.6666667,15.682 18.6666667,12 C18.6666667,8.31799998 15.682,5.33333329 12,5.33333329 Z M14.6666667,12.6666667 L12.6666667,12.6666667 L12.6666667,14.6666667 L11.3333333,14.6666667 L11.3333333,12.6666667 L9.33333332,12.6666667 L9.33333332,11.3333333 L11.3333333,11.3333333 L11.3333333,9.33333332 L12.6666667,9.33333332 L12.6666667,11.3333333 L14.6666667,11.3333333 L14.6666667,12.6666667 Z'
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

export default AddIcon
