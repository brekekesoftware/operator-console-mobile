import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const NextIcon = ({ width = 24, height = 24, color = '#212121', ...props }) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1v99h4nyoa'
        d='M5,7 L5,17 L11.6111111,12 L5,7 Z M12,7 L12,17 L18.6111111,12 L12,7 Z'
      />
      <Mask id='mask-2v99h4nyoa' fill='white'>
        <Use xlinkHref='#path-1v99h4nyoa'></Use>
      </Mask>
      <Use xlinkHref='#path-1v99h4nyoa' />
      <Use
        id='Shapev99h4nyoa'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1v99h4nyoa'
      />
    </Defs>
    <G
      id='icon/nextv99h4nyoa'
      fill='none'
      mask='url(#mask-2v99h4nyoa)'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
    >
      <Mask id='mask-2v99h4nyoa' fill='white'>
        <Use xlinkHref='#path-1v99h4nyoa'></Use>
      </Mask>
      <Use
        id='Shapev99h4nyoa'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1v99h4nyoa'
      ></Use>

      <Rect id='Rectanglev99h4nyoa' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default NextIcon
