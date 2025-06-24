import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const MicrophoneIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-18srvw4b4h'
        d='M11.8947368,4 C10.4993684,4 9.36842105,5.13094737 9.36842105,6.52631579 L9.36842105,11.5789474 C9.36842105,12.9743158 10.4993684,14.1052632 11.8947368,14.1052632 C13.2901053,14.1052632 14.4210526,12.9743158 14.4210526,11.5789474 L14.4210526,6.52631579 C14.4210526,5.13094737 13.2901053,4 11.8947368,4 Z M6,11.5789474 C6,14.5476177 8.19735949,16.9964008 11.0526316,17.4062501 L11.0526316,20 L12.7368421,20 L12.7368421,17.4062501 C15.5921145,16.9964008 17.7894737,14.5476177 17.7894737,11.5789474 L16.1052632,11.5789474 C16.1052632,13.904 14.2197895,15.7894737 11.8947368,15.7894737 C9.56968421,15.7894737 7.68421053,13.904 7.68421053,11.5789474 L6,11.5789474 Z'
      />
      <Mask id='mask-28srvw4b4h' fill='white'>
        <Use xlinkHref='#path-18srvw4b4h'></Use>
      </Mask>
      <Use xlinkHref='#path-18srvw4b4h' />
    </Defs>
    <G
      id='icon/microphone8srvw4b4h'
      fill='none'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
    >
      <Mask id='mask-28srvw4b4h' fill='white'>
        <Use xlinkHref='#path-18srvw4b4h'></Use>
      </Mask>
    </G>
    <G
      id='colors/default/black8srvw4b4h'
      fill='#212121'
      mask='url(#mask-28srvw4b4h)'
    >
      <Rect id='Rectangle8srvw4b4h' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default MicrophoneIcon
