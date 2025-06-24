import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const PlusIcon = ({ width = 24, height = 24, color = '#212121', ...props }) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Mask id='mask-286mbklhxy' fill='white'>
        <Use xlinkHref='#path-186mbklhxy'></Use>
      </Mask>
      <Polygon
        id='path-186mbklhxy'
        points='11.2222222 5 11.2222222 11.2222222 5 11.2222222 5 12.7777778 11.2222222 12.7777778 11.2222222 19 12.7777778 19 12.7777778 12.7777778 19 12.7777778 19 11.2222222 12.7777778 11.2222222 12.7777778 5'
      />
      <Use xlinkHref='#path-186mbklhxy' />
      <Use
        id='Shape86mbklhxy'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-186mbklhxy'
      />
    </Defs>
    <G
      id='icon/plus86mbklhxy'
      fill='none'
      mask='url(#mask-286mbklhxy)'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
    >
      <Mask id='mask-286mbklhxy' fill='white'>
        <Use xlinkHref='#path-186mbklhxy'></Use>
      </Mask>
      <Use
        id='Shape86mbklhxy'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-186mbklhxy'
      ></Use>

      <Rect id='Rectangle86mbklhxy' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default PlusIcon
