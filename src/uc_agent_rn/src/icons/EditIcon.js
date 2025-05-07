import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const EditIcon = ({ width = 24, height = 24, color = '#212121', ...props }) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1'
        d='M16.2760414,5.33333329 C16.1054587,5.33333329 15.9346874,5.39831243 15.8046874,5.52864583 L14.6666667,6.66666663 L17.3333334,9.33333332 L18.471354,8.19531251 C18.7320207,7.93464577 18.7320207,7.51260417 18.471354,7.2526041 L16.747396,5.52864583 C16.6170627,5.39831243 16.4466247,5.33333329 16.2760414,5.33333329 Z M13.6666667,7.66666664 L5.99999996,15.3333334 L5.99999996,18 L8.66666665,18 L16.3333334,10.3333333 L13.6666667,7.66666664 Z'
      />
      <Mask id='mask-2' fill='white'>
        <Use xlinkHref='#path-1'></Use>
      </Mask>
      <Use xlinkHref='#path-1' />
    </Defs>
    <G
      id='icon/edit'
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

export default EditIcon
