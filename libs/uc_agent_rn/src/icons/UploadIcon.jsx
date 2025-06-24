import React from 'react'
import Svg, { Path } from 'react-native-svg'

const UploadIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" {...props}>
    <Path
      d="M12,4.5 L7.5,9 L10.5,9 L10.5,15 C10.5,15.414 10.836,15.75 11.25,15.75 L12.75,15.75 C13.164,15.75 13.5,15.414 13.5,15 L13.5,9 L16.5,9 L12,4.5 Z M4.5,18 L4.5,19.5 L19.5,19.5 L19.5,18 L4.5,18 Z"
      fill={color}
    />
  </Svg>
)

export default UploadIcon