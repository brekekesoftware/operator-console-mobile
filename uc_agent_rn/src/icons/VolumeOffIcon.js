import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs } from 'react-native-svg'

const VolumeOffIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1'
        d='M12.1141046,5 L7.24564184,9.73322768 L4,9.73322768 L4,14.4664554 L7.24564184,14.4664554 L12.1141046,19.199683 L12.1141046,5 Z M14.3201268,8.37735517 L13.1537242,9.51135763 L15.4358162,11.7054059 L13.1537242,13.8994541 L14.3201268,15.0334566 L16.5768621,12.8147561 L18.8335975,15.0334566 L20,13.8994541 L17.7179081,11.7054059 L20,9.51135763 L18.8335975,8.37735517 L16.5768621,10.5960556 L14.3201268,8.37735517 Z'
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

export default VolumeOffIcon
