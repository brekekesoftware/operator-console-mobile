import { BaseDividerData } from './BaseDividerData'

export class VerticalDividerData extends BaseDividerData {
  constructor(panelDataAsParent) {
    super(panelDataAsParent)
  }

  // override
  getDividerDirection() {
    return BaseDividerData.DIVIDER_DIRECTIONS.vertical
  }
}
