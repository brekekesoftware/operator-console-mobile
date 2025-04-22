import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const RefreshIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1'
        d='M12,4 C7.5888,4 4,7.5888 4,12 C4,16.4112 7.5888,20 12,20 C16.4112,20 20,16.4112 20,12 L18.4,12 C18.4,15.5288 15.5288,18.4 12,18.4 C8.4712,18.4 5.6,15.5288 5.6,12 C5.6,8.4712 8.4712,5.6 12,5.6 C13.7647928,5.6 15.3621792,6.32038136 16.5203128,7.47968752 L14.4,9.6 L20,9.6 L20,4 L17.6484376,6.35156248 C16.2014288,4.90101472 14.2058336,4 12,4 Z'
      />
      <Mask id='mask-2'>
        <Use xlinkHref='#path-1'></Use>
      </Mask>
      <Use xlinkHref='#path-1' />
      <Use id='Shape' fill='#191919' fillRule='nonzero' xlinkHref='#path-1' />
    </Defs>
    <G
      id='icon/refresh'
      fill='none'
      mask='url(#mask-2)'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
    >
      <Mask id='mask-2' fill='white'>
        <Use xlinkHref='#path-1'></Use>
      </Mask>
      <Use
        id='Shape'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1'
      ></Use>

      <Rect id='Rectangle' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default RefreshIcon
