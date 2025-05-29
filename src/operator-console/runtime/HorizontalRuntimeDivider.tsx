import type { ViewStyle } from 'react-native'

import { BaseDividerData } from '../data/BaseDividerData'
import { RuntimeDivider } from './RuntimeDivider'

export class HorizontalRuntimeDivider extends RuntimeDivider {
  constructor(props) {
    super(props)
  }

  // !override
  getProps() {
    return {
      cssClass: {
        width: '100%',
        height: 8,
        backgroundColor: 'lightgray',
      } as ViewStyle,
      dividerDirection: BaseDividerData.DIVIDER_DIRECTIONS.horizontal,
    }
  }

  // !override
  getDividerDirection() {
    return BaseDividerData.DIVIDER_DIRECTIONS.horizontal
  }
}
