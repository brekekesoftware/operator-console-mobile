import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const ChevronDownIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Mask id='mask-2t7oozvkxh' fill='white'>
        <Use xlinkHref='#path-1t7oozvkxh'></Use>
      </Mask>
      <Polygon
        id='path-1t7oozvkxh'
        points='8.98841703 10 8 10.988417 12.0000002 14.9884169 16 10.988417 15.011583 10 12.0000002 13.0115828'
      />
      <Use xlinkHref='#path-1t7oozvkxh' />
      <Use
        id='Shapet7oozvkxh'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1t7oozvkxh'
      />
    </Defs>
    <G
      id='icon/chevron-downt7oozvkxh'
      fill='none'
      mask='url(#mask-2t7oozvkxh)'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
    >
      <Mask id='mask-2t7oozvkxh' fill='white'>
        <Use xlinkHref='#path-1t7oozvkxh'></Use>
      </Mask>
      <Use
        id='Shapet7oozvkxh'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1t7oozvkxh'
      ></Use>

      <Rect id='Rectanglet7oozvkxh' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default ChevronDownIcon
