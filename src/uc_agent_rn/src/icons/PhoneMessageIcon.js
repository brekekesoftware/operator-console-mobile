import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const PhoneMessageIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1'
        d='M6.66666663,5.99999996 C6.26666663,5.99999996 5.99999996,6.26666663 5.99999996,6.66666663 L5.99999996,7.99999997 C5.99999996,12.7326667 11.9606667,18 16,18 L17.3333334,18 C17.7333334,18 18,17.7333334 18,17.3333334 L18,14.6666667 C18,14.2666667 17.7333334,14 17.3333334,14 L14.6666667,14 L12.9596353,15.7070314 C11.1429687,14.687698 9.33340625,12.9707393 8.27473958,11.1080727 C8.27340624,11.095406 8.26692704,11.078406 8.26692704,11.066406 L9.99999999,9.33333332 L9.99999999,6.66666663 C9.99999999,6.26666663 9.73333332,5.99999996 9.33333332,5.99999996 L6.66666663,5.99999996 Z M12.6666667,5.99999996 C12.3,5.99999996 12,6.29999996 12,6.66666663 L12,12 L13.3333333,10.6666667 L17.3333334,10.6666667 C17.7,10.6666667 18,10.3666667 18,9.99999999 L18,6.66666663 C18,6.29999996 17.7,5.99999996 17.3333334,5.99999996 L12.6666667,5.99999996 Z'
      />
      <Mask id='mask-2' fill='white'>
        <Use xlinkHref='#path-1'></Use>
      </Mask>
      <Use xlinkHref='#path-1' />
    </Defs>
    <G
      id='icon/phone-message'
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

export default PhoneMessageIcon
