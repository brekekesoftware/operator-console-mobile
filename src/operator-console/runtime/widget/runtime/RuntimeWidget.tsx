import { Component } from 'react'

type Props = {}
type State = {
  duration: string
}

export class RuntimeWidget extends Component<Props, State> {
  _RuntimePaneAsParent
  constructor(props) {
    super(props)
    this._RuntimePaneAsParent = props['runtimePane'] // tabs or noTabs
  }

  getWidgetData() {
    return this.props['widgetData']
  }

  getRuntimePaneAsParent() {
    return this._RuntimePaneAsParent
  }

  componentDidUpdate() {
    // empty( for subclass )
  }

  componentWillUnmount() {
    // empty( for subclass )
  }

  componentDidMount() {
    // empty( for subclass )
  }

  render() {
    const widgetData = this.getWidgetData()

    const relativePositionX = widgetData.getWidgetRelativePositionX()
    const relativePositionY = widgetData.getWidgetRelativePositionY()
    const widgetWidth = widgetData.getWidgetWidth()
    const widgetHeight = widgetData.getWidgetHeight()
    const widgetIndex = this.props['widgetIndex']

    const css = {
      position: 'absolute',
      left: relativePositionX + 'px',
      top: relativePositionY + 'px',
      width: widgetWidth + 'px',
      height: widgetHeight + 'px',
    }
    const jsx = <div style={css}>{this._getRenderMainJsx()}</div>
    return jsx
  }

  // abstract
  _getRenderMainJsx() {
    throw new Error('Not implemented.')
  }
}
