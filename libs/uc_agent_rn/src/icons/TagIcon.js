import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const TagIcon = ({ width = 24, height = 24, color = '#212121', ...props }) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1'
        d='M15.1530151,5 L8.54401225,11.7233452 C7.8761551,12.4027569 7.8761551,13.5064799 8.54401225,14.1858916 L11.9655151,17.6665898 C12.6333723,18.3460015 13.7183244,18.3460015 14.3861816,17.6665898 L20.9951841,10.9432446 L20.9951841,5 L15.1530151,5 Z M10.7654594,5.24126842 L4.4695145,11.6461393 C3.84408897,12.2823858 3.84290165,13.3409686 4.4695145,13.9767926 L8.81121841,18.3936122 L9.95593559,17.2290898 L5.61423176,12.8106618 L11.9101769,6.4057904 L10.7654594,5.24126842 Z M18.5666127,6.64705882 C19.0134699,6.64705882 19.3761365,7.016 19.3761365,7.47058824 C19.3761365,7.92517647 19.0134699,8.29411765 18.5666127,8.29411765 C18.1197556,8.29411765 17.7570889,7.92517647 17.7570889,7.47058824 C17.7570889,7.016 18.1197556,6.64705882 18.5666127,6.64705882 Z'
      />
      <Mask id='mask-2' fill='white'>
        <Use xlinkHref='#path-1'></Use>
      </Mask>
      <Use xlinkHref='#path-1' />
      <Use id='Shape' fill='#191919' fillRule='nonzero' xlinkHref='#path-1' />
    </Defs>
    <G
      id='icon/tag'
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

export default TagIcon
