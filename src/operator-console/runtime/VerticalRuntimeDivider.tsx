import { BaseDividerData } from '../data/BaseDividerData'
import { RuntimeDivider } from './RuntimeDivider'

export class VerticalRuntimeDivider extends RuntimeDivider {
  constructor(props) {
    super(props)
  }

  // override
  getProps() {
    return {
      cssClass: 'verticalDivider',
      dividerDirection: BaseDividerData.DIVIDER_DIRECTIONS.vertical,
    }
  }

  // !override
  getDividerDirection() {
    return BaseDividerData.DIVIDER_DIRECTIONS.vertical
  }
}
