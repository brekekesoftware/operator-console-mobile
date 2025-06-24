import React from 'react'
import Svg, { Path, G, Mask, Use, Rect, Defs, Polygon } from 'react-native-svg'

const CircleIcon = ({
  width = 24,
  height = 24,
  color = '#212121',
  ...props
}) => (
  <Svg width={width} height={height} viewBox='0 0 24 24' {...props}>
    <Defs>
      <Path
        id='path-1znfsty3b9'
        d='M12,18 C15.3137085,18 18,15.3137085 18,12 C18,8.6862915 15.3137085,6 12,6 C8.6862915,6 6,8.6862915 6,12 C6,15.3137085 8.6862915,18 12,18 Z M12,20 C7.581722,20 4,16.418278 4,12 C4,7.581722 7.581722,4 12,4 C16.418278,4 20,7.581722 20,12 C20,16.418278 16.418278,20 12,20 Z'
      />
      <Mask id='mask-2znfsty3b9' fill='white'>
        <Use xlinkHref='#path-1znfsty3b9'></Use>
      </Mask>
      <Use xlinkHref='#path-1znfsty3b9' />
      <Use
        id='Ovalznfsty3b9'
        fill='#383B41'
        fillRule='nonzero'
        xlinkHref='#path-1znfsty3b9'
      />
    </Defs>
    <G
      id='icon/circleznfsty3b9'
      fill='none'
      mask='url(#mask-2znfsty3b9)'
      fillRule='evenodd'
      stroke='none'
      strokeWidth='1'
    >
      <Mask id='mask-2znfsty3b9' fill='white'>
        <Use xlinkHref='#path-1znfsty3b9'></Use>
      </Mask>
      <Use
        id='Ovalznfsty3b9'
        fill='#383B41'
        fillRule='nonzero'
        xlinkHref='#path-1znfsty3b9'
      ></Use>

      <Rect id='Rectangleznfsty3b9' x='0' y='0' width='24' height='24'></Rect>
    </G>
  </Svg>
)

export default CircleIcon
