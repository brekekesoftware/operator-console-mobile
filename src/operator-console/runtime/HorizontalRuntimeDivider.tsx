import { BaseDividerData } from '../data/BaseDividerData'
import { RuntimeDivider } from './RuntimeDivider'

export class HorizontalRuntimeDivider extends RuntimeDivider {
  constructor(props) {
    super(props)
  }

  // !override
  getProps() {
    return {
      cssClass: 'horizontalDivider',
      dividerDirection: BaseDividerData.DIVIDER_DIRECTIONS.horizontal,
    }
  }

  // !override
  getDividerDirection() {
    return BaseDividerData.DIVIDER_DIRECTIONS.horizontal
  }
}
