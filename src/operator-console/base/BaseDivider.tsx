import { Component } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'

import type { EditorPane } from '../editor/EditorPane'
import type { EditorRootPane } from '../editor/EditorRootPane'
import type { RuntimeChildPane } from '../runtime/RuntimeChildPane'
import type { RuntimeRootPane } from '../runtime/RuntimeRootPane'

type Props = {
  editorPaneAsParent?: any
  runtimePaneAsParent?: any
  cssClass?: StyleProp<ViewStyle>
}
type State = {
  upperHeight: number
  leftWidth: number
}
export class BaseDivider extends Component<Props, State> {
  constructor(props: any) {
    super(props)
  }
}
