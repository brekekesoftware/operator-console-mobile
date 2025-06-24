import type { PanResponderInstance } from 'react-native'
import { PanResponder, Platform, View } from 'react-native'

import { BaseDivider } from '../base/BaseDivider'
import { BaseDividerData } from '../data/BaseDividerData'
import type { RuntimeChildPane } from './RuntimeChildPane'
import { RuntimePane } from './RuntimePane'

let _RUNTIME_DIVIDER_ID = -1
const _RUNTIME_DIVIDER_OBJECT = new Object()

export class RuntimeDivider extends BaseDivider {
  _RuntimePaneAsParent: RuntimeChildPane
  _RuntimeDividerId
  panResponder: PanResponderInstance
  constructor(props) {
    super(props)
    this._RuntimePaneAsParent = props['runtimePaneAsParent']
    _RUNTIME_DIVIDER_ID++
    this._RuntimeDividerId = _RUNTIME_DIVIDER_ID
    _RUNTIME_DIVIDER_OBJECT[this._RuntimeDividerId] = this

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, gestureState) => {},
      onPanResponderMove: (e, gestureState) => {
        this._onMouseDown(gestureState)
      },
      onPanResponderRelease: (e, gestureState) => {
        this._onTouchEnd(e, gestureState)
      },
    })

    this.state = {
      upperHeight: 0,
      leftWidth: 0,
    }
  }

  componentDidMount(): void {
    this.props.runtimePaneAsParent?.refLeft?._refEditor?.current?.measure(
      (fx, fy, w, h, x, y) => {
        this.setState({ leftWidth: w })
      },
    )
    this.props.runtimePaneAsParent?.refTop?._refEditor?.current?.measure(
      (fx, fy, w, h, x, y) => {
        this.setState({ upperHeight: h })
      },
    )
  }

  static getRuntimeDividerByContainerId(id) {
    const o = _RUNTIME_DIVIDER_OBJECT[id]
    return o
  }

  // !abstract
  getDividerDirection(): number {
    throw new Error('Not implemented.')
  }

  // abstract
  getProps(): any {
    throw new Error('Not implemented.')
  }
  _onTouchEnd(e, gestureState) {
    const direction = this.getDividerDirection()
    switch (direction) {
      case BaseDividerData.DIVIDER_DIRECTIONS.horizontal:
        this.setState({ upperHeight: this.state.upperHeight + gestureState.dy })
        break
      case BaseDividerData.DIVIDER_DIRECTIONS.vertical:
        this.setState({ leftWidth: this.state.leftWidth + gestureState.dx })
        break
    }

    this._RuntimePaneAsParent
      .getRuntimeScreenView()
      .setState({ rerender: true })
  }

  _onMouseDown(gestureState) {
    const direction = this.getDividerDirection()
    switch (direction) {
      case BaseDividerData.DIVIDER_DIRECTIONS.horizontal:
        this._mouseMoveHandlerForHorizontal(gestureState)
        break
      case BaseDividerData.DIVIDER_DIRECTIONS.vertical:
        this._mouseMoveHandlerForVertical(gestureState)

        break
    }
  }

  _mouseMoveHandlerForHorizontal(gestureState) {
    this.props.runtimePaneAsParent?.refMain?.measure((fx, fy, mW, mH, x, y) => {
      const newTopWidth =
        ((this.state.upperHeight + gestureState.dy) * 100) / mH
      if (newTopWidth < 0 || newTopWidth > 100) {
        return
      }
      const leftPaneId = this.props.runtimePaneAsParent?.refTop?.paneNum
      const leftEditorPane = RuntimePane.getRuntimePaneByContainerId(leftPaneId)
      const leftEditorPaneData = leftEditorPane.getRuntimePaneData()
      leftEditorPaneData.setPaneHeight(newTopWidth)
      const newBottomWidth = 100 - newTopWidth
      if (newBottomWidth > 0) {
        const rightPaneId = this.props.runtimePaneAsParent?.refBottom?.paneNum
        const rightEditorPane =
          RuntimePane.getRuntimePaneByContainerId(rightPaneId)
        const rightEditorPaneData = rightEditorPane.getRuntimePaneData()
        rightEditorPaneData.setPaneHeight(newBottomWidth)
        this.props.runtimePaneAsParent
          ?.getRuntimeScreenView()
          .setState({ rerender: true })
      }
    })
  }

  _mouseMoveHandlerForVertical(gestureState) {
    this.props.runtimePaneAsParent?.refMain?.measure((fx, fy, mW, h, x, y) => {
      const newLeftWidth = ((this.state.leftWidth + gestureState.dx) * 100) / mW
      if (newLeftWidth < 0 || newLeftWidth > 100) {
        return
      }
      const leftPaneId = this.props.runtimePaneAsParent?.refLeft?.paneNum
      const leftEditorPane = RuntimePane.getRuntimePaneByContainerId(leftPaneId)
      const leftEditorPaneData = leftEditorPane.getRuntimePaneData()

      leftEditorPaneData.setPaneWidth(newLeftWidth)
      const newRightWidth = 100 - newLeftWidth
      if (newRightWidth > 0) {
        const rightPaneId = this.props.runtimePaneAsParent?.refRight?.paneNum
        const rightEditorPane =
          RuntimePane.getRuntimePaneByContainerId(rightPaneId)
        const rightEditorPaneData = rightEditorPane.getRuntimePaneData()
        rightEditorPaneData.setPaneWidth(newRightWidth)
        this.props.runtimePaneAsParent
          ?.getRuntimeScreenView()
          .setState({ rerender: true })
      }
    })
  }

  render() {
    const props = this.getProps()
    const direction = this.getDividerDirection()
    return (
      <View
        data-br-runtime-divider-id={this._RuntimeDividerId}
        style={[
          props.cssClass,
          Platform.OS === 'web'
            ? {
                cursor:
                  direction === BaseDividerData.DIVIDER_DIRECTIONS.vertical
                    ? 'col-resize'
                    : 'row-resize',
              }
            : undefined,
        ]}
        {...this.panResponder.panHandlers}
      ></View>
    )
  }
}
