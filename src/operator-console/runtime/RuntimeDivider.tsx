import type { PanResponderInstance } from 'react-native'
import { PanResponder, View } from 'react-native'

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
      onPanResponderGrant: (e, gestureState) => {
        // this._onTouchStart(e, gestureState);
      },
      onPanResponderMove: (e, gestureState) => {
        // this._onTouchMove(e, gestureState)

        this._onMouseDown(gestureState)
      },
      onPanResponderRelease: (e, gestureState) => {
        // this._onTouchEnd(e, gestureState);
      },
    })
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

  _onMouseDown(gestureState) {
    // const eDivider = ev.target
    // this._element = eDivider

    // this._startClientX = ev.clientX
    // this._startClientY = ev.clientY

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
    let topWidth = 0
    console.log('#Duy Phan console gestureState1', gestureState.dy)
    // console.log('#Duy Phan console topWidth',this.props.runtimePaneAsParent?.refTop?._refEditor)
    this.props.runtimePaneAsParent?.refTop?._refEditor?.current?.measure(
      (fx, fy, w, h, x, y) => {
        topWidth = h
        console.log('#Duy Phan console topWidth', topWidth)

        this.props.runtimePaneAsParent?.refMain?.measure(
          (fx, fy, mW, mH, x, y) => {
            console.log('#Duy Phan console mH', mH, gestureState.dy)
            console.log('#Duy Phan console', fx, fy, mW, mH, x, y)
            const newTopWidth = ((topWidth + gestureState.dy) * 100) / mH
            const leftPaneId = this.props.runtimePaneAsParent?.refTop?.paneNum
            const leftEditorPane =
              RuntimePane.getRuntimePaneByContainerId(leftPaneId)
            const leftEditorPaneData = leftEditorPane.getRuntimePaneData()
            console.log('#Duy Phan console newTopWidth', newTopWidth)
            leftEditorPaneData.setPaneHeight(newTopWidth)
            const newBottomWidth = 100 - newTopWidth
            if (newBottomWidth > 0) {
              const rightPaneId =
                this.props.runtimePaneAsParent?.refBottom?.paneNum
              const rightEditorPane =
                RuntimePane.getRuntimePaneByContainerId(rightPaneId)
              const rightEditorPaneData = rightEditorPane.getRuntimePaneData()
              rightEditorPaneData.setPaneHeight(newBottomWidth)
              this.props.runtimePaneAsParent
                ?.getRuntimeScreenView()
                .setState({ rerender: true })
            }
          },
        )
      },
    )
  }

  _mouseMoveHandlerForVertical(gestureState) {
    let leftWidth = this._startLeftWidth
    // const x = this._startClientX
    // const y = this._startClientY

    // const leftSide = this._leftContainerElement
    // const rightSide = this._rightContainerElement
    // const verticalDivider = this._element
    // const dx = e.clientX - x

    this.props.runtimePaneAsParent?.refLeft?._refEditor?.current?.measure(
      (fx, fy, w, h, x, y) => {
        leftWidth = w

        this.props.runtimePaneAsParent?.refMain?.measure(
          (fx, fy, mW, h, x, y) => {
            const newLeftWidth = ((leftWidth + gestureState.dx) * 100) / mW
            const leftPaneId = this.props.runtimePaneAsParent?.refLeft?.paneNum
            const leftEditorPane =
              RuntimePane.getRuntimePaneByContainerId(leftPaneId)
            const leftEditorPaneData = leftEditorPane.getRuntimePaneData()

            leftEditorPaneData.setPaneWidth(newLeftWidth)
            const newRightWidth = 100 - newLeftWidth
            if (newRightWidth > 0) {
              const rightPaneId =
                this.props.runtimePaneAsParent?.refRight?.paneNum
              const rightEditorPane =
                RuntimePane.getRuntimePaneByContainerId(rightPaneId)
              const rightEditorPaneData = rightEditorPane.getRuntimePaneData()
              rightEditorPaneData.setPaneWidth(newRightWidth)
              this.props.runtimePaneAsParent
                ?.getRuntimeScreenView()
                .setState({ rerender: true })
            }
          },
        )
      },
    )
  }

  render() {
    const props = this.getProps()
    return (
      <View
        data-br-runtime-divider-id={this._RuntimeDividerId}
        style={props.cssClass}
        {...this.panResponder.panHandlers}
      ></View>
    )
  }
}
