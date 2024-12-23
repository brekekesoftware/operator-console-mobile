import type { ViewStyle } from 'react-native'

import { BaseDividerData } from '../data/BaseDividerData'
import { EditorDivider } from './EditorDivider'

export class HorizontalEditorDivider extends EditorDivider {
  constructor(props) {
    super(props)
  }

  // !override
  getProps() {
    return {
      cssClass: {
        width: '100%',
        height: 6,
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
