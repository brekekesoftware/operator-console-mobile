import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const CloseIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Mask id='mask-233rr9s193' fill='white'>
        <Use xlinkHref='#path-133rr9s193'></Use>
      </Mask>
      <Polygon
        id='path-133rr9s193'
        points='5.29923726 4 4 5.29923726 10.7007632 12.0000001 4 18.7007631 5.29923726 20 12.0000001 13.299237 18.7007631 20 20 18.7007631 13.299237 12.0000001 20 5.29923726 18.7007631 4 12.0000001 10.7007632'
      />
      <Use xlinkHref='#path-133rr9s193' />
      <Use
        id='Shape33rr9s193'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-133rr9s193'
      />
    </Defs>
    <G
      id='icon/close33rr9s193'
      fill='none'
      mask='url(#mask-233rr9s193)'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
    >
      <Mask id='mask-233rr9s193' fill='white'>
        <Use xlinkHref='#path-133rr9s193'></Use>
      </Mask>
      <Use
        id='Shape33rr9s193'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-133rr9s193'
      ></Use>

      <Rect id='Rectangle33rr9s193' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default CloseIcon
