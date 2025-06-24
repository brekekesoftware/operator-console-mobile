import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const FolderIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1pdla2cevu'
        d='M18.4,7.625 L12,7.625 L10.4,6 L5.6,6 C4.72,6 4,6.73125 4,7.625 L4,17.375 C4,18.26875 4.72,19 5.6,19 L18.4,19 C19.28,19 20,18.26875 20,17.375 L20,9.25 C20,8.35625 19.28,7.625 18.4,7.625 Z M18.4,17.375 L5.6,17.375 L5.6,9.25 L18.4,9.25 L18.4,17.375 Z'
      />
      <Mask id='mask-2pdla2cevu' fill='white'>
        <Use xlinkHref='#path-1pdla2cevu'></Use>
      </Mask>
      <Use xlinkHref='#path-1pdla2cevu' />
      <Use
        id='Shapepdla2cevu'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1pdla2cevu'
      />
    </Defs>
    <G
      id='icon/folderpdla2cevu'
      fill='none'
      mask='url(#mask-2pdla2cevu)'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
    >
      <Mask id='mask-2pdla2cevu' fill='white'>
        <Use xlinkHref='#path-1pdla2cevu'></Use>
      </Mask>
      <Use
        id='Shapepdla2cevu'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1pdla2cevu'
      ></Use>

      <Rect id='Rectanglepdla2cevu' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default FolderIcon
