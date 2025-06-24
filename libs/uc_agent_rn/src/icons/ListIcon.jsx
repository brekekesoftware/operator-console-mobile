import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const ListIcon = ({ width = 24, height = 24, color = '#212121', ...props }) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1xmatj71so'
        d='M5.52380952,6.38095238 C4.89262695,6.38095238 4.38095238,6.89262695 4.38095238,7.52380952 C4.38095238,8.1549921 4.89262695,8.66666667 5.52380952,8.66666667 C6.1549921,8.66666667 6.66666667,8.1549921 6.66666667,7.52380952 C6.66666667,6.89262695 6.1549921,6.38095238 5.52380952,6.38095238 Z M8.57142857,6.76190476 L8.57142857,8.28571429 L20,8.28571429 L20,6.76190476 L8.57142857,6.76190476 Z M5.52380952,10.952381 C4.89262695,10.952381 4.38095238,11.4640555 4.38095238,12.0952381 C4.38095238,12.7264207 4.89262695,13.2380952 5.52380952,13.2380952 C6.1549921,13.2380952 6.66666667,12.7264207 6.66666667,12.0952381 C6.66666667,11.4640555 6.1549921,10.952381 5.52380952,10.952381 Z M8.57142857,11.3333333 L8.57142857,12.8571429 L20,12.8571429 L20,11.3333333 L8.57142857,11.3333333 Z M5.52380952,15.5238095 C4.89262695,15.5238095 4.38095238,16.0354841 4.38095238,16.6666667 C4.38095238,17.2978492 4.89262695,17.8095238 5.52380952,17.8095238 C6.1549921,17.8095238 6.66666667,17.2978492 6.66666667,16.6666667 C6.66666667,16.0354841 6.1549921,15.5238095 5.52380952,15.5238095 Z M8.57142857,15.9047619 L8.57142857,17.4285714 L20,17.4285714 L20,15.9047619 L8.57142857,15.9047619 Z'
      />
      <Mask id='mask-2xmatj71so' fill='white'>
        <Use xlinkHref='#path-1xmatj71so'></Use>
      </Mask>
      <Use xlinkHref='#path-1xmatj71so' />
      <Use
        id='Shapexmatj71so'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1xmatj71so'
      />
    </Defs>
    <G
      id='icon/listxmatj71so'
      fill='none'
      mask='url(#mask-2xmatj71so)'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
    >
      <Mask id='mask-2xmatj71so' fill='white'>
        <Use xlinkHref='#path-1xmatj71so'></Use>
      </Mask>
      <Use
        id='Shapexmatj71so'
        fill='#191919'
        fillRule='nonzero'
        xlinkHref='#path-1xmatj71so'
      ></Use>

      <Rect id='Rectanglexmatj71so' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default ListIcon
