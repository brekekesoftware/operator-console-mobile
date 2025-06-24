import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const FileIcon = ({ width = 24, height = 24, color = '#212121', ...props }) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1vbrmatw1f'
        d='M18.4,0 L1.6,0 C0.72,0 0,0.73125 0,1.625 L0,22.375 C0,23.26875 0.72,24 1.6,24 L22.4,24 C23.28,24 24,23.26875 24,22.375 L24,5.625 Q24,4.952 23.524,4.476 L19.549,0.476 Q19.073,0 18.4,0 Z M22.4,22.375 L1.6,22.375 L1.6,1.625 L18.4,1.625 L18.4,4 C18.4,4.89375 19.12,5.625 20,5.625 L22.4,5.625 L22.4,22.375 Z'
      />
      <Mask id='mask-2vbrmatw1f' fill='white'>
        <Use xlinkHref='#path-1vbrmatw1f'></Use>
      </Mask>
      <Use xlinkHref='#path-1vbrmatw1f' />
      <Use
        id='Shapevbrmatw1f'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1vbrmatw1f'
      />
    </Defs>
    <G
      id='icon/foldervbrmatw1f'
      fill='none'
      mask='url(#mask-2vbrmatw1f)'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
    >
      <Mask id='mask-2vbrmatw1f' fill='white'>
        <Use xlinkHref='#path-1vbrmatw1f'></Use>
      </Mask>
      <Use
        id='Shapevbrmatw1f'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1vbrmatw1f'
      ></Use>

      <Rect id='Rectanglevbrmatw1f' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default FileIcon
