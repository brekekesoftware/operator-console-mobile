import React from 'react'

import type { EditorPane } from '../editor/EditorPane'
import type { EditScreenView } from '../editor/EditScreenView'
import type { RuntimeChildPane } from '../runtime/RuntimeChildPane'
import type { RuntimeScreenView_ver2 } from '../runtime/RuntimeScreenView_ver2'

type Props = {
  editorPaneAsParent?: EditorPane
  paneData: any
  editScreenViewAsAncestor?: any
  paneType?: number
  className: string
  runtimeScreenViewAsParent?: RuntimeScreenView_ver2
  runtimePaneAsParent?: RuntimeChildPane
  runtimeScreenViewAsAncestor?: any
  foregroundColor?: string
  backgroundColor?: string
  editScreenViewAsParent?: EditScreenView
}
export class BasePane extends React.Component<Props> {
  constructor(props) {
    super(props)
  }
}
