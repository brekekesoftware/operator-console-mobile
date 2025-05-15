import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const ErrorIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1'
        d='M19.9509995,17.0174444 L12.7534541,5.63466667 C12.5022723,5.23722222 12.0612723,5 11.5736359,5 C11.0859995,5 10.6449995,5.23722222 10.3946359,5.63388889 L3.19627226,17.0174444 C2.94099953,17.4211111 2.93445408,17.9258889 3.17827226,18.3357778 C3.42127226,18.7456667 3.88027226,19 4.37609044,19 L18.7719995,19 C19.2669995,19 19.7268177,18.7456667 19.9698177,18.3357778 C20.2136359,17.9258889 20.2062723,17.4211111 19.9509995,17.0174444 Z M12.3918177,16.6666667 L10.7554541,16.6666667 L10.7554541,15.1111111 L12.3918177,15.1111111 L12.3918177,16.6666667 Z M12.3918177,13.5555556 L10.7554541,13.5555556 L10.7554541,9.66666667 L12.3918177,9.66666667 L12.3918177,13.5555556 Z'
      />
      <Mask id='mask-2' fill='white'>
        <Use xlinkHref='#path-1'></Use>
      </Mask>
      <Use xlinkHref='#path-1' />
      <Use id='Shape' fill='#191919' fillRule='nonzero' xlinkHref='#path-1' />
    </Defs>
    <G
      id='icon/error'
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

export default ErrorIcon
