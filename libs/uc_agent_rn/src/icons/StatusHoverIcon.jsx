import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const StatusHoverIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 8 8' {...props}>
    <Defs>
      <Mask id='mask-2mhgk0j9q8' fill='white'>
        <Use xlinkHref='#path-1mhgk0j9q8'></Use>
      </Mask>
      <Polygon id='path-1mhgk0j9q8' points='4 5 6 7 8 5' />
      <Use xlinkHref='#path-1mhgk0j9q8' />
      <Use
        id='Shapemhgk0j9q8'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1mhgk0j9q8'
      />
    </Defs>
    <G
      id='icon/status-hovermhgk0j9q8'
      fill='none'
      mask='url(#mask-2mhgk0j9q8)'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
      transform='translate(-2.000000, -2.000000)'
    >
      <Circle
        id='components/avatar/status-onlinemhgk0j9q8'
        stroke='#F5F5F5'
        fill='#FFFFFF'
        fillRule='nonzero'
        cx='4'
        cy='4'
        r='4'
      ></Circle>

      <Mask id='mask-2mhgk0j9q8' fill='white'>
        <Use xlinkHref='#path-1mhgk0j9q8'></Use>
      </Mask>
      <Use
        id='Shapemhgk0j9q8'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1mhgk0j9q8'
      ></Use>

      <Rect id='Rectanglemhgk0j9q8' x='0' y='0' width='12' height='12'></Rect>
    </G>
  </Svg>
)

export default StatusHoverIcon
