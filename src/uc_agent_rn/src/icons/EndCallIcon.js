import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const EndCallIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1'
        d='M19.1995194,11.8774037 L18.3389422,11.0144234 C15.3221157,7.99999997 8.18509598,8.43028859 5.60096181,11.0144234 L4.73798088,11.8774037 C4.49278826,12.1225963 4.49278826,12.4927883 4.73798088,12.7379809 L6.46153843,14.3990388 C6.70673104,14.6466345 7.07692305,14.6466345 7.32211566,14.3990388 L8.9230769,12.8004806 L8.9230769,10.5841348 C9.53846152,9.96875014 14.5240388,9.96875014 15.0769231,10.5841348 L15.0769231,12.8605772 L16.677885,14.4615385 C16.923077,14.7067311 17.2932696,14.7067311 17.5384616,14.4615385 L19.2620191,12.7379809 C19.4471157,12.4927883 19.4471157,12.0625003 19.1995194,11.8774037 Z'
      />
      <Mask id='mask-2' fill='white'>
        <Use xlinkHref='#path-1'></Use>
      </Mask>
      <Use xlinkHref='#path-1' />
    </Defs>
    <G
      id='icon/end_call'
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

export default EndCallIcon
