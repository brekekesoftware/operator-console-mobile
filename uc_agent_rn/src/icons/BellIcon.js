import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs } from 'react-native-svg'

const BellIcon = ({ width = 24, height = 24, color = '#212121', ...props }) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1'
        d='M12.5,4 C11.82725,4 11.28125,4.5376 11.28125,5.2 L11.28125,5.75625 C9.17946168,6.289676 7.625,8.16384008 7.625,10.4 L7.625,14.4 L17.375,14.4 L17.375,10.4 C17.375,8.16384008 15.820538,6.289676 13.71875,5.75625 L13.71875,5.2 C13.71875,4.5376 13.17275,4 12.5,4 Z M6,16 L6,17.6 L11.0939939,17.6 C10.9509212,17.8431081 10.8753907,18.1190263 10.875,18.4 C10.875,19.2836556 11.6025373,20 12.5,20 C13.3974627,20 14.125,19.2836556 14.125,18.4 C14.1241272,18.1188841 14.0480468,17.8429565 13.9044193,17.6 L19,17.6 L19,16 L6,16 Z'
      />
    </Defs>
    <G>
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

export default BellIcon
