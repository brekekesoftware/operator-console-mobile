import { Component } from 'react'

import type { EditorPane } from '../editor/EditorPane'
import type { RuntimeChildPane } from '../runtime/RuntimeChildPane'

type Props = {
  editorPaneAsParent?: EditorPane
  runtimePaneAsParent?: RuntimeChildPane
}
export class BaseDivider extends Component<Props> {
  constructor(props: any) {
    super(props)
  }
}
