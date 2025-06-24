import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const SquareIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1uxx5v9d40'
        d='M6,6 L6,18 L18,18 L18,6 L6,6 Z M6,4 L18,4 C19.1045695,4 20,4.8954305 20,6 L20,18 C20,19.1045695 19.1045695,20 18,20 L6,20 C4.8954305,20 4,19.1045695 4,18 L4,6 C4,4.8954305 4.8954305,4 6,4 Z'
      />
      <Mask id='mask-2uxx5v9d40' fill='white'>
        <Use xlinkHref='#path-1uxx5v9d40'></Use>
      </Mask>
      <Use xlinkHref='#path-1uxx5v9d40' />
      <Use
        id='Rectangleuxx5v9d40'
        fill='#383B41'
        fillRule='nonzero'
        xlinkHref='#path-1uxx5v9d40'
      />
    </Defs>
    <G
      id='icon/squareuxx5v9d40'
      fill='none'
      mask='url(#mask-2uxx5v9d40)'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
    >
      <Mask id='mask-2uxx5v9d40' fill='white'>
        <Use xlinkHref='#path-1uxx5v9d40'></Use>
      </Mask>
      <Use
        id='Rectangleuxx5v9d40'
        fill='#383B41'
        fillRule='nonzero'
        xlinkHref='#path-1uxx5v9d40'
      ></Use>

      <Rect id='Rectangleuxx5v9d40' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default SquareIcon
