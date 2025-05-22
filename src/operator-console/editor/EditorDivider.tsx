import { createRef } from 'react'
import type { PanResponderInstance } from 'react-native'
import { PanResponder, TouchableWithoutFeedback, View } from 'react-native'

import { BaseDivider } from '../base/BaseDivider'
import { BaseDividerData } from '../data/BaseDividerData'
import { Draggable } from '../lib/rnd/Draggable'
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

    this.state = {
      startX: 0,
      startY: 0,
      upperHeight: 0,
      bottomHeight: 0,
      leftWidth: 0,
      rightWidth: 0,
    }

    this.upperContainerRef = createRef()
    this.bottomContainerRef = createRef()
    this.leftContainerRef = createRef()
    this.rightContainerRef = createRef()
  }

  _onTouchStart(e, gestureState) {
    const { pageX, pageY } = gestureState

    this.setState({
      startX: pageX,
      startY: pageY,
    })

    const direction = this.getDividerDirection()
    if (BaseDividerData.DIVIDER_DIRECTIONS.horizontal === direction) {
      this.upperContainerRef.current.measure((x, y, width, height) => {
        this.setState({ upperHeight: height })
      })
      this.bottomContainerRef.current.measure((x, y, width, height) => {
        this.setState({ bottomHeight: height })
      })
    } else if (BaseDividerData.DIVIDER_DIRECTIONS.vertical === direction) {
      this.leftContainerRef.current.measure((x, y, width, height) => {
        this.setState({ leftWidth: width })
      })
      this.rightContainerRef.current.measure((x, y, width, height) => {
        this.setState({ rightWidth: width })
      })
    }
  }

  _onTouchMove(e, gestureState) {
    const { dx, dy } = gestureState
    const direction = this.getDividerDirection()

    if (BaseDividerData.DIVIDER_DIRECTIONS.horizontal === direction) {
      const newUpperHeight = this.state.upperHeight + dy
      const newBottomHeight = this.state.bottomHeight - dy

      this._EditorPaneAsParent.updatePaneHeights(
        newUpperHeight,
        newBottomHeight,
      )
    } else if (BaseDividerData.DIVIDER_DIRECTIONS.vertical === direction) {
      const newLeftWidth = this.state.leftWidth + dx
      const newRightWidth = this.state.rightWidth - dx

      this._EditorPaneAsParent.updatePaneWidths(newLeftWidth, newRightWidth)
    }
  }

  _onTouchEnd(e, gestureState) {
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
        // console.log('#Duy Phan console this.props.editorPaneAsParent?.refLeft?._refEditor',this.props.editorPaneAsParent?.refLeft?._refEditor)
        const eLeftContainer = this.props.editorPaneAsParent?.refLeft
          ?._refEditor as any
        this._leftContainerElement = eLeftContainer
        // this._startLeftWidth = eLeftContainer.getBoundingClientRect().width
        // // const eRightContainer = container.getChildRightContainerElement();
        // const eRightContainer = this._element.nextElementSibling
        this._rightContainerElement = this.props.editorPaneAsParent?.refRight
          ?._refEditor as any
        // console.log('#Duy Phan console eLeftContainer',this._rightContainerElement)
        // console.log('#Duy Phan console  this._rightContainerElement', this._rightContainerElement)
        this._mouseMoveHandlerForVertical(gestureState)

        break
    }
  }

  _mouseMoveHandlerForHorizontal(gestureState) {
    let topWidth = 0
    // const x = this._startClientX
    // const y = this._startClientY

    // const leftSide = this._leftContainerElement
    // const rightSide = this._rightContainerElement
    // const verticalDivider = this._element
    // const dx = e.clientX - x

    this.props.editorPaneAsParent?.refTop?._refEditor?.current?.measure(
      (fx, fy, w, h, x, y) => {
        topWidth = h

        this.props.editorPaneAsParent?.refMain?.measure(
          (fx, fy, mW, mH, x, y) => {
            const newTopWidth = ((topWidth + gestureState.dy * 0.2) * 100) / mH
            if (newTopWidth < 0 || newTopWidth > 100) {
              return
            }
            const leftPaneId = this.props.editorPaneAsParent?.refTop?.paneNum
            const leftEditorPane =
              EditorPane.getEditorPaneByContainerId(leftPaneId)
            const leftEditorPaneData = leftEditorPane.getEditingPaneData()

            leftEditorPaneData.setPaneHeight(newTopWidth)
            const newBottomWidth = 100 - newTopWidth
            if (newBottomWidth > 0) {
              const rightPaneId =
                this.props.editorPaneAsParent?.refBottom?.paneNum
              const rightEditorPane =
                EditorPane.getEditorPaneByContainerId(rightPaneId)
              const rightEditorPaneData = rightEditorPane.getEditingPaneData()
              rightEditorPaneData.setPaneHeight(newBottomWidth)
              this._EditorPaneAsParent
                .getEditScreenView()
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

    this.props.editorPaneAsParent?.refLeft?._refEditor?.current?.measure(
      (fx, fy, w, h, x, y) => {
        leftWidth = w
        // console.log('#Duy Phan console leftWidth', leftWidth)

        this.props.editorPaneAsParent?.refMain?.measure(
          (fx, fy, mW, h, x, y) => {
            const newLeftWidth =
              ((leftWidth + gestureState.dx * 0.2) * 100) / mW

            if (newLeftWidth < 0 || newLeftWidth > 100) {
              return
            }

            const leftPaneId = this.props.editorPaneAsParent?.refLeft?.paneNum
            const leftEditorPane =
              EditorPane.getEditorPaneByContainerId(leftPaneId)
            const leftEditorPaneData = leftEditorPane.getEditingPaneData()

            leftEditorPaneData.setPaneWidth(newLeftWidth)
            const newRightWidth = 100 - newLeftWidth

            if (newRightWidth > 0) {
              const rightPaneId =
                this.props.editorPaneAsParent?.refRight?.paneNum
              const rightEditorPane =
                EditorPane.getEditorPaneByContainerId(rightPaneId)
              const rightEditorPaneData = rightEditorPane.getEditingPaneData()
              rightEditorPaneData.setPaneWidth(newRightWidth)
              this._EditorPaneAsParent
                .getEditScreenView()
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
      <View style={[props.cssClass]} {...this.panResponder.panHandlers}>
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
