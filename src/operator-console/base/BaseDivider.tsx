import { Component } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'

import type { EditorPane } from '../editor/EditorPane'
import type { EditorRootPane } from '../editor/EditorRootPane'
import type { RuntimeChildPane } from '../runtime/RuntimeChildPane'
import type { RuntimeRootPane } from '../runtime/RuntimeRootPane'

type Props = {
  editorPaneAsParent?: EditorPane | EditorRootPane
  runtimePaneAsParent?: RuntimeChildPane | RuntimeRootPane
  cssClass?: StyleProp<ViewStyle>
}
export class BaseDivider extends Component<Props> {
  constructor(props: any) {
    super(props)
  }
}
