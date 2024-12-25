import React from 'react'
import type { StyleProp, ViewStyle } from 'react-native'

import type { EditorPane } from '../editor/EditorPane'
import type { EditScreenView } from '../editor/EditScreenView'
import type { RuntimeChildPane } from '../runtime/RuntimeChildPane'
import type { RuntimeScreenView_ver2 } from '../runtime/RuntimeScreenView_ver2'

type Props = {
  editorPaneAsParent?: EditorPane
  paneData: any
  editScreenViewAsAncestor?: any
  paneType?: number
  runtimeScreenViewAsParent?: RuntimeScreenView_ver2
  runtimePaneAsParent?: RuntimeChildPane
  runtimeScreenViewAsAncestor?: any
  foregroundColor?: string
  backgroundColor?: string
  editScreenViewAsParent?: EditScreenView
  style?: StyleProp<ViewStyle>
}

type State = {
  parentContainer?: any
  rerender?: boolean
  width?: ViewStyle['width']
  height?: ViewStyle['height']
}
export class BasePane extends React.Component<Props, State> {
  constructor(props) {
    super(props)
  }
}
