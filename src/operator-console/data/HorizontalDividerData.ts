import { BaseDividerData } from './BaseDividerData'

export class HorizontalDividerData extends BaseDividerData {
  constructor(panelDataAsParent: any = undefined) {
    super(panelDataAsParent)
  }

  // override
  getDividerDirection() {
    return BaseDividerData.DIVIDER_DIRECTIONS.horizontal
  }
}
