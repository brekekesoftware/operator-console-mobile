import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs } from 'react-native-svg'

const MarkerPenIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1'
        d='M16,5.33333329 L8.66666665,11.0833333 L12.9166667,15.3333334 L18.6666667,7.99999997 L16,5.33333329 Z M7.74999997,12 L6.87499997,12.875 C6.6145833,13.1354167 6.6145833,13.5520833 6.87499997,13.8125 C7.3932293,14.3307293 7.3932293,15.190104 6.87499997,15.7083334 L8.29166664,17.125 C8.80989598,16.6067707 9.66927065,16.6067707 10.1875,17.125 C10.4479167,17.3854167 10.8645833,17.3854167 11.125,17.125 L12,16.25 L7.74999997,12 Z M6.24999996,16.3541667 L5.33333329,17.25 L7.2083333,18.2083334 L7.64583331,17.75 L6.24999996,16.3541667 Z'
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

export default MarkerPenIcon
