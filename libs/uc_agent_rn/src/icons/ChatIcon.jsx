import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const ChatIcon = ({ width = 24, height = 24, color = '#212121', ...props }) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1tf2tvbqb2'
        d='M5.6,4 C4.72,4 4,4.72 4,5.6 L4,15.2 L6.4,12.8 L13.6,12.8 C14.48,12.8 15.2,12.08 15.2,11.2 L15.2,5.6 C15.2,4.72 14.48,4 13.6,4 L5.6,4 Z M16.8,8 L16.8,11.2 C16.8,12.9648 15.3648,14.4 13.6,14.4 L8.8,14.4 L8.8,15.2 C8.8,16.08 9.52,16.8 10.4,16.8 L17.6,16.8 L20,19.2 L20,9.6 C20,8.72 19.28,8 18.4,8 L16.8,8 Z'
      />
      <Mask id='mask-2tf2tvbqb2' fill='white'>
        <Use xlinkHref='#path-1tf2tvbqb2'></Use>
      </Mask>
      <Use xlinkHref='#path-1tf2tvbqb2' />
      <Use
        id='Shapetf2tvbqb2'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1tf2tvbqb2'
      />
    </Defs>
    <G
      id='icon/chattf2tvbqb2'
      fill='none'
      mask='url(#mask-2tf2tvbqb2)'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
    >
      <Mask id='mask-2tf2tvbqb2' fill='white'>
        <Use xlinkHref='#path-1tf2tvbqb2'></Use>
      </Mask>
      <Use
        id='Shapetf2tvbqb2'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1tf2tvbqb2'
      ></Use>

      <Rect id='Rectangletf2tvbqb2' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default ChatIcon
