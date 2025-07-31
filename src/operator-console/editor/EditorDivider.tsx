import type { PanResponderInstance } from 'react-native'
import {
  PanResponder,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import { BaseDivider } from '../base/BaseDivider'
import { BaseDividerData } from '../data/BaseDividerData'
import { EditorPane } from './EditorPane'

let _EDITOR_DIVIDER_ID = -1
const _EDITOR_DIVIDER_OBJECT = new Object()

export class EditorDivider extends BaseDivider {
  _EditorPaneAsParent: EditorPane
  _EditorDividerId: number
  _element
  _upperContainerElement
  _startClientX
  _startClientY
  _bottomContainerElement
  _startUpperHeight
  _mouseMoveEventListenerForHorizontalFunction
  _mouseUpEventListenerForHorizontalFunction
  panResponder: PanResponderInstance
  upperContainerRef
  bottomContainerRef
  leftContainerRef
  rightContainerRef
  _leftContainerElement
  _rightContainerElement

  constructor(props) {
    super(props)
    this._EditorPaneAsParent = props['editorPaneAsParent']
    _EDITOR_DIVIDER_ID++
    this._EditorDividerId = _EDITOR_DIVIDER_ID
    _EDITOR_DIVIDER_OBJECT[this._EditorDividerId] = this
    // this._EditorPaneAsParent.getEditingPaneData().setDivider( this.getDividerDirection() );

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, gestureState) => {
        this._onTouchStart(e, gestureState)
      },
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
    this.props.editorPaneAsParent?.refLeft?._refEditor?.current?.measure(
      (fx, fy, w, h, x, y) => {
        this.setState({ leftWidth: w })
      },
    )
    this.props.editorPaneAsParent?.refTop?._refEditor?.current?.measure(
      (fx, fy, w, h, x, y) => {
        this.setState({ upperHeight: h })
      },
    )
  }
  _onTouchStart(e, gestureState) {
    if (Platform.OS === 'web') {
      const direction = this.getDividerDirection()
      switch (direction) {
        case BaseDividerData.DIVIDER_DIRECTIONS.horizontal:
          const upperSide =
            this.props.editorPaneAsParent?.refTop?._refEditor?.current
          const bottomSide =
            this.props.editorPaneAsParent?.refBottom?._refEditor?.current
          upperSide.style.userSelect = 'none'
          upperSide.style.pointerEvents = 'none'

          bottomSide.style.userSelect = 'none'
          bottomSide.style.pointerEvents = 'none'
          break
        case BaseDividerData.DIVIDER_DIRECTIONS.vertical:
          const leftSide =
            this.props.editorPaneAsParent?.refLeft?._refEditor?.current
          const rightSide =
            this.props.editorPaneAsParent?.refRight?._refEditor?.current
          leftSide.style.userSelect = 'none'
          leftSide.style.pointerEvents = 'none'

          rightSide.style.userSelect = 'none'
          rightSide.style.pointerEvents = 'none'
          break
      }
    }
  }

  _onTouchEnd(e, gestureState) {
    const direction = this.getDividerDirection()
    switch (direction) {
      case BaseDividerData.DIVIDER_DIRECTIONS.horizontal:
        this.setState({ upperHeight: this.state.upperHeight + gestureState.dy })
        if (Platform.OS === 'web') {
          const upperSide =
            this.props.editorPaneAsParent?.refTop?._refEditor?.current
          const bottomSide =
            this.props.editorPaneAsParent?.refBottom?._refEditor?.current
          upperSide.style.removeProperty('user-select')
          upperSide.style.removeProperty('pointer-events')

          bottomSide.style.removeProperty('user-select')
          bottomSide.style.removeProperty('pointer-events')
        }
        break
      case BaseDividerData.DIVIDER_DIRECTIONS.vertical:
        this.setState({ leftWidth: this.state.leftWidth + gestureState.dx })
        if (Platform.OS === 'web') {
          const leftSide =
            this.props.editorPaneAsParent?.refLeft?._refEditor?.current
          const rightSide =
            this.props.editorPaneAsParent?.refRight?._refEditor?.current
          leftSide.style.removeProperty('user-select')
          leftSide.style.removeProperty('pointer-events')

          rightSide.style.removeProperty('user-select')
          rightSide.style.removeProperty('pointer-events')
        }
        break
    }

    this._EditorPaneAsParent.getEditScreenView().setState({ rerender: true })
  }

  static getEditorDividerByContainerId(id) {
    const o = _EDITOR_DIVIDER_OBJECT[id]
    return o
  }

  removeEditorDivider(onRemoveDitorDividerFunction) {
    this._EditorPaneAsParent.removeEditorDivider(onRemoveDitorDividerFunction)
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
    this.props.editorPaneAsParent?.refMain?.measure((fx, fy, mW, mH, x, y) => {
      const dividerH = (8 / mH) * 100
      const newTopWidth =
        ((this.state.upperHeight + gestureState.dy) * 100) / mH
      if (newTopWidth < 0 || newTopWidth > 100) {
        return
      }
      const leftPaneId = this.props.editorPaneAsParent?.refTop?.paneNum
      const leftEditorPane = EditorPane.getEditorPaneByContainerId(leftPaneId)
      const leftEditorPaneData = leftEditorPane.getEditingPaneData()

      leftEditorPaneData.setPaneHeight(newTopWidth - dividerH)
      const newBottomWidth = 100 - newTopWidth - dividerH
      if (newBottomWidth > 0) {
        const rightPaneId = this.props.editorPaneAsParent?.refBottom?.paneNum
        const rightEditorPane =
          EditorPane.getEditorPaneByContainerId(rightPaneId)
        const rightEditorPaneData = rightEditorPane.getEditingPaneData()
        rightEditorPaneData.setPaneHeight(newBottomWidth)
        this._EditorPaneAsParent
          .getEditScreenView()
          .setState({ rerender: true })
      }
    })
  }

  _mouseMoveHandlerForVertical(gestureState) {
    this.props.editorPaneAsParent?.refMain?.measure((fx, fy, mW, h, x, y) => {
      const newLeftWidth = ((this.state.leftWidth + gestureState.dx) * 100) / mW
      const dividerW = (8 / mW) * 100
      if (newLeftWidth < 0 || newLeftWidth > 100) {
        return
      }

      const leftPaneId = this.props.editorPaneAsParent?.refLeft?.paneNum
      const leftEditorPane = EditorPane.getEditorPaneByContainerId(leftPaneId)
      const leftEditorPaneData = leftEditorPane.getEditingPaneData()

      leftEditorPaneData.setPaneWidth(newLeftWidth - dividerW)

      const newRightWidth = 100 - newLeftWidth - dividerW

      if (newRightWidth > 0) {
        const rightPaneId = this.props.editorPaneAsParent?.refRight?.paneNum
        const rightEditorPane =
          EditorPane.getEditorPaneByContainerId(rightPaneId)
        const rightEditorPaneData = rightEditorPane.getEditingPaneData()
        rightEditorPaneData.setPaneWidth(newRightWidth)
        this._EditorPaneAsParent
          .getEditScreenView()
          .setState({ rerender: true })
      }
    })
  }

  render() {
    const props = this.getProps()
    const direction = this.getDividerDirection()
    return (
      <View
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
      >
        <TouchableWithoutFeedback
          data-br-editor-divider-id={this._EditorDividerId}
          style={{ flex: 1 }}
          onPress={ev =>
            this._EditorPaneAsParent
              .getEditScreenView()
              .onClickByEditorDivider(this._EditorDividerId)
          }
        >
          <View style={{ flex: 1 }}></View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}
