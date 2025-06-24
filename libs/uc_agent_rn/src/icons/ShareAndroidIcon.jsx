import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const ShareAndroidIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1f5u7fz2ik'
        d='M16.6666667,4 C15.3780023,4 14.3333333,5.0745166 14.3333333,6.4 C14.3338086,6.55052039 14.3480497,6.70066103 14.3758684,6.84843752 L8.84179686,10.16875 C8.42028577,9.80147542 7.88575741,9.59993723 7.33333333,9.6 C6.04466892,9.6 5,10.6745166 5,12 C5,13.3254834 6.04466892,14.4 7.33333333,14.4 C7.884904,14.398887 8.41825821,14.196832 8.8387587,13.8296872 L14.3758684,17.1515624 C14.3480497,17.2993389 14.3338086,17.4494796 14.3333333,17.6 C14.3333333,18.9254834 15.3780023,20 16.6666667,20 C17.9553311,20 19,18.9254834 19,17.6 C19,16.2745166 17.9553311,15.2 16.6666667,15.2 C16.1145734,15.2007436 15.5806212,15.4028212 15.1597222,15.7703128 L9.62413194,12.4484376 C9.65195056,12.3006611 9.66619154,12.1505204 9.66666667,12 C9.66619154,11.8494796 9.65195056,11.6993389 9.62413194,11.5515624 L15.1582032,8.23125 C15.5797143,8.59852456 16.1142426,8.80006275 16.6666667,8.8 C17.9553311,8.8 19,7.7254834 19,6.4 C19,5.0745166 17.9553311,4 16.6666667,4 Z'
      />
      <Mask id='mask-2f5u7fz2ik' fill='white'>
        <Use xlinkHref='#path-1f5u7fz2ik'></Use>
      </Mask>
      <Use xlinkHref='#path-1f5u7fz2ik' />
      <Use
        id='Shapef5u7fz2ik'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1f5u7fz2ik'
      />
    </Defs>
    <G
      id='icon/share-androidf5u7fz2ik'
      fill='none'
      mask='url(#mask-2f5u7fz2ik)'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
    >
      <Mask id='mask-2f5u7fz2ik' fill='white'>
        <Use xlinkHref='#path-1f5u7fz2ik'></Use>
      </Mask>
      <Use
        id='Shapef5u7fz2ik'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1f5u7fz2ik'
      ></Use>

      <Rect id='Rectanglef5u7fz2ik' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default ShareAndroidIcon
