import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs } from 'react-native-svg'

const CloseWindowIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1'
        d='M16.6666667,5.99999996 L7.3333333,5.99999996 C6.59666663,5.99999996 5.99999996,6.59666663 5.99999996,7.3333333 L5.99999996,16.6666667 C5.99999996,17.4033334 6.59666663,18 7.3333333,18 L16.6666667,18 C17.4033334,18 18,17.4033334 18,16.6666667 L18,7.3333333 C18,6.59666663 17.4033334,5.99999996 16.6666667,5.99999996 Z M15.3333334,14.3933333 L14.3933333,15.3333334 L12,12.94 L9.60666665,15.3333334 L8.66666665,14.3933333 L11.06,12 L8.66666665,9.60666665 L9.60666665,8.66666665 L12,11.06 L14.3933333,8.66666665 L15.3333334,9.60666665 L12.94,12 L15.3333334,14.3933333 Z'
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

export default CloseWindowIcon
