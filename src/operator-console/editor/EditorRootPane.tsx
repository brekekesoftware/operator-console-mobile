import { createRef } from 'react'
import type { LayoutRectangle } from 'react-native'
import { Dimensions, View } from 'react-native'

import { BaseDividerData } from '../data/BaseDividerData'
import { PaneData } from '../data/PaneData'
import { EditorChildPane } from './EditorChildPane'
import { EditorPane } from './EditorPane'
import type { EditScreenView } from './EditScreenView'
import { HorizontalEditorDivider } from './HorizontalEditorDivider'
import { VerticalEditorDivider } from './VerticalEditorDivider'

export class EditorRootPane extends EditorPane {
  _EditScreenViewAsParent: EditScreenView
  refLeft
  refRight
  refTop
  refBottom
  refMain
  constructor(props) {
    super(props)
    this._EditScreenViewAsParent = this.getEditScreenViewFromProps(props)
    this.state = {
      width: '100%',
      height: '100%',
    }
    this.refLeft = createRef()
    this.refRight = createRef()
    this.refMain = createRef()
  }

  // !override
  getEditScreenView() {
    return this._EditScreenViewAsParent
  }

  // !override
  getEditScreenViewFromProps(props) {
    const v = props['editScreenViewAsParent']
    return v
  }

  handleSplitSize = (l: LayoutRectangle, t: number) => {
    if (BaseDividerData.DIVIDER_DIRECTIONS.horizontal === t) {
      this.setState({
        width: l.width,
        height: l.height / 2 - 6,
        rerender: true,
      })
    } else {
      this.setState({
        width: l.width / 2 - 6,
        height: l.height,
        rerender: true,
      })
    }
  }

  // !override
  _getChildrenJsx(
    dividerDirection,
    widthClassName,
    heightClassName,
    _refEditor,
  ) {
    const editScreenView = this.getEditScreenView()
    let jsx
    const paneData = this.props['paneData']
    const paneNumber = paneData.getPaneNumber()
    const screenPaneDatas = paneData.getScreenDatasAsParent()
    // const screenData = screenPaneDatas.getScreenDataAsParent();

    switch (dividerDirection) {
      case BaseDividerData.DIVIDER_DIRECTIONS.horizontal:
        {
          const upperPaneDataNumber = paneData.getChildPaneNumberByPaneType(
            PaneData.PANE_TYPES.upperPane,
          )
          const upperPaneData =
            screenPaneDatas.getPaneDataByPaneNumber(upperPaneDataNumber)
          const bottomPaneDataNumber = paneData.getChildPaneNumberByPaneType(
            PaneData.PANE_TYPES.bottomPane,
          )
          const bottomPaneData =
            screenPaneDatas.getPaneDataByPaneNumber(bottomPaneDataNumber)

          const paneCss = {}
          // paneCss['display'] = 'flex'
          // paneCss['flexFlow'] = 'column'
          // paneCss['alignItems'] = 'stretch'
          paneCss['color'] = this.props.foregroundColor
          paneCss['backgroundColor'] = this.props.backgroundColor
          const paneWidth = paneData.getPaneWidth()
          if (paneWidth && paneWidth !== -1) {
            const dividerHalfWidthPx = 3
            paneCss['width'] = paneWidth + '%'
          }
          const paneHeight = paneData.getPaneHeight()
          if (paneHeight && paneHeight !== -1) {
            const dividerHalfHeightPx = 3
            paneCss['height'] = paneHeight + '%'
          }
          console.log('#Duy Phan console paneCss1', paneCss)
          jsx = (
            <View
              data-br-container-id={paneNumber}
              style={[widthClassName, heightClassName, paneCss]}
              ref={r => {
                this.refMain = r
                _refEditor.current = r
              }}
              collapsable={false}
            >
              <EditorChildPane
                editorPaneAsParent={this}
                paneData={upperPaneData}
                editScreenViewAsAncestor={editScreenView}
                style={{ height: '50%' }}
                parent-container={this}
                paneType={PaneData.PANE_TYPES.upperPane}
                ref={r => (this.refTop = r)}
              />
              <HorizontalEditorDivider editorPaneAsParent={this} />
              <EditorChildPane
                editorPaneAsParent={this}
                paneData={bottomPaneData}
                editScreenViewAsAncestor={editScreenView}
                style={{ height: '50%' }}
                parent-container={this}
                paneType={PaneData.PANE_TYPES.bottomPane}
                ref={r => (this.refBottom = r)}
              />
            </View>
          )
        }
        break
      case BaseDividerData.DIVIDER_DIRECTIONS.vertical:
        {
          const leftPaneDataNumber = paneData.getChildPaneNumberByPaneType(
            PaneData.PANE_TYPES.leftPane,
          )
          const leftPaneData =
            screenPaneDatas.getPaneDataByPaneNumber(leftPaneDataNumber)
          const rightPaneDataNumber = paneData.getChildPaneNumberByPaneType(
            PaneData.PANE_TYPES.rightPane,
          )
          const rightPaneData =
            screenPaneDatas.getPaneDataByPaneNumber(rightPaneDataNumber)

          const paneCss = {}
          paneCss['display'] = 'flex'
          const paneWidth = paneData.getPaneWidth()
          if (paneWidth && paneWidth !== -1) {
            paneCss['width'] = paneWidth + '%'
          }
          const paneHeight = paneData.getPaneHeight()
          if (paneHeight && paneHeight !== -1) {
            paneCss['height'] = paneHeight + '%'
          }
          paneCss['color'] = this.props.foregroundColor
          paneCss['backgroundColor'] = this.props.backgroundColor
          console.log('#Duy Phan console paneCss2', paneCss)

          jsx = (
            <View
              data-br-container-id={paneNumber}
              ref={r => {
                this.refMain = r
                _refEditor.current = r
              }}
              collapsable={false}
              style={[
                { flexDirection: 'row' },
                widthClassName,
                heightClassName,
                paneCss,
              ]}
            >
              <EditorChildPane
                editorPaneAsParent={this}
                paneData={leftPaneData}
                editScreenViewAsAncestor={editScreenView}
                style={{ width: '50%' }}
                parent-container={this}
                paneType={PaneData.PANE_TYPES.leftPane}
                ref={r => (this.refLeft = r)}
              />
              <VerticalEditorDivider editorPaneAsParent={this} />
              <EditorChildPane
                editorPaneAsParent={this}
                paneData={rightPaneData}
                editScreenViewAsAncestor={editScreenView}
                style={{ width: '50%' }}
                parent-container={this}
                paneType={PaneData.PANE_TYPES.rightPane}
                ref={r => (this.refRight = r)}
              />
            </View>
          )
        }
        break
    }
    return jsx
  }
}
