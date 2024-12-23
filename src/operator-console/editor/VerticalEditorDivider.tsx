import type { ViewStyle } from 'react-native'

import { BaseDividerData } from '../data/BaseDividerData'
import { EditorDivider } from './EditorDivider'

export class VerticalEditorDivider extends EditorDivider {
  constructor(props) {
    super(props)
  }

  // override
  getProps() {
    return {
      cssClass: {
        width: 6,
        height: '100%',
        backgroundColor: 'lightgray',
      } as ViewStyle,
      dividerDirection: BaseDividerData.DIVIDER_DIRECTIONS.vertical,
    }
  }

  // !override
  getDividerDirection() {
    return BaseDividerData.DIVIDER_DIRECTIONS.vertical
  }
}
