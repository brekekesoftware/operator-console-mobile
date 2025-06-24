import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const AddFolderIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1ad59qhte1'
        d='M17.3333334,7.3333333 L11.3333333,7.3333333 L9.99999999,5.99999996 L6.66666663,5.99999996 C5.9296873,5.99999996 5.33333329,6.59635397 5.33333329,7.3333333 L5.33333329,15.3333334 C5.33333329,16.0703127 5.9296873,16.6666667 6.66666663,16.6666667 L17.3333334,16.6666667 C18.0703127,16.6666667 18.6666667,16.0703127 18.6666667,15.3333334 L18.6666667,8.66666665 C18.6666667,7.92968731 18.0703127,7.3333333 17.3333334,7.3333333 Z M14.6666667,12.6666667 L12.6666667,12.6666667 L12.6666667,14.6666667 L11.3333333,14.6666667 L11.3333333,12.6666667 L9.33333332,12.6666667 L9.33333332,11.3333333 L11.3333333,11.3333333 L11.3333333,9.33333332 L12.6666667,9.33333332 L12.6666667,11.3333333 L14.6666667,11.3333333 L14.6666667,12.6666667 Z'
      />
      <Mask id='mask-2ad59qhte1' fill='white'>
        <Use xlinkHref='#path-1ad59qhte1'></Use>
      </Mask>
      <Use xlinkHref='#path-1ad59qhte1' />
    </Defs>
    <G
      id='icon/add-folderad59qhte1'
      fill='none'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
    >
      <Mask id='mask-2ad59qhte1' fill='white'>
        <Use xlinkHref='#path-1ad59qhte1'></Use>
      </Mask>
    </G>
    <G
      id='colors/default/blackad59qhte1'
      fill='#212121'
      mask='url(#mask-2ad59qhte1)'
    >
      <Rect id='Rectanglead59qhte1' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default AddFolderIcon
