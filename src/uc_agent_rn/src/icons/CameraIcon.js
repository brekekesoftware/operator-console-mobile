import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const CameraIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1'
        d='M9.74999999,4.49999996 L8.24999998,5.99999997 L5.99999997,5.99999997 C5.17382846,5.99999997 4.49999996,6.67382847 4.49999996,7.49999997 L4.49999996,16.5 C4.49999996,17.3261723 5.17382846,18 5.99999997,18 L18,18 C18.8261723,18 19.5,17.3261723 19.5,16.5 L19.5,7.49999997 C19.5,6.67382847 18.8261723,5.99999997 18,5.99999997 L15.75,5.99999997 L14.25,4.49999996 L9.74999999,4.49999996 Z M12,8.24999998 C14.1005858,8.24999998 15.75,9.89941424 15.75,12 C15.75,14.1005858 14.1005858,15.75 12,15.75 C9.89941424,15.75 8.24999998,14.1005858 8.24999998,12 C8.24999998,9.89941424 9.89941424,8.24999998 12,8.24999998 Z M12,9.37499999 C10.5498045,9.37499999 9.37499999,10.5498045 9.37499999,12 C9.37499999,13.4501955 10.5498045,14.625 12,14.625 C13.4501955,14.625 14.625,13.4501955 14.625,12 C14.625,10.5498045 13.4501955,9.37499999 12,9.37499999 Z'
      />
      <Mask id='mask-2'>
        <Use xlinkHref='#path-1'></Use>
      </Mask>
      <Use xlinkHref='#path-1' />
    </Defs>
    <G
      id='icon/camera'
      fill='none'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
    >
      <Mask id='mask-2' fill='white'>
        <Use xlinkHref='#path-1'></Use>
      </Mask>
    </G>
    <G id='colors/default/black' fill='#212121' mask='url(#mask-2)'>
      <Rect id='Rectangle' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default CameraIcon
