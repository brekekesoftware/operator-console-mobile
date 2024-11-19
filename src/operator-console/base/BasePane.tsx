import React from 'react'

type Props = {
  editorPaneAsParent: any
  paneData: any
  editScreenViewAsAncestor: any
  paneType: number
  className: string
}
export class BasePane extends React.Component<Props> {
  constructor(props) {
    super(props)
  }
}
