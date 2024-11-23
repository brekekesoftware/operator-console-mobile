import { Component } from 'react'
import type { ViewStyle } from 'react-native'
import { View } from 'react-native'

type Props = {
  widgetData: any
}
type State = {
  duration?: string
  loading: boolean
  content: string
  error: boolean
  saving: boolean
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

    const css: ViewStyle = {
      position: 'absolute',
      left: relativePositionX,
      top: relativePositionY,
      width: widgetWidth,
      height: widgetHeight,
    }
    const jsx = <View style={css}>{this._getRenderMainJsx()}</View>
    return jsx
  }

  // abstract
  _getRenderMainJsx(): React.ReactNode {
    throw new Error('Not implemented.')
  }
}
