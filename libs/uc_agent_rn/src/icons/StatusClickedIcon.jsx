import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const StatusClickedIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 8 8' {...props}>
    <Defs>
      <Mask id='mask-2hse0brql2' fill='white'>
        <Use xlinkHref='#path-1hse0brql2'></Use>
      </Mask>
      <Polygon id='path-1hse0brql2' points='4 5 6 7 8 5' />
      <Use xlinkHref='#path-1hse0brql2' />
      <Use
        id='Shapehse0brql2'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1hse0brql2'
      />
    </Defs>
    <G
      id='icon/status-clickedhse0brql2'
      fill='none'
      mask='url(#mask-2hse0brql2)'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
      transform='translate(-2.000000, -2.000000)'
    >
      <Circle
        id='components/avatar/status-onlinehse0brql2'
        stroke='#F5F5F5'
        fill='#FFFFFF'
        fillRule='nonzero'
        cx='4'
        cy='4'
        r='4'
      ></Circle>

      <Mask id='mask-2hse0brql2' fill='white'>
        <Use xlinkHref='#path-1hse0brql2'></Use>
      </Mask>
      <Use
        id='Shapehse0brql2'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1hse0brql2'
      ></Use>

      <Rect id='Rectanglehse0brql2' x='0' y='0' width='12' height='12'></Rect>
    </G>
  </Svg>
)

export default StatusClickedIcon
