import { createRef } from 'react'
import { View } from 'react-native'

import { BaseDividerData } from '../data/BaseDividerData'
import { PaneData } from '../data/PaneData'
import { EditorPane } from './EditorPane'
import { HorizontalEditorDivider } from './HorizontalEditorDivider'
import { VerticalEditorDivider } from './VerticalEditorDivider'

export class EditorChildPane extends EditorPane {
  _EditScreenViewAsAncestor
  refLeft
  refRight
  refTop
  refBottom
  refMain
  constructor(props) {
    super(props)
    // this._EditorPaneAsParent = props["editorPaneAsParent"];
    this._EditScreenViewAsAncestor = this.getEditScreenViewFromProps(props)
    this.refLeft = createRef()
    this.refRight = createRef()
  }

  // !override
  getEditScreenView() {
    return this._EditScreenViewAsAncestor
  }

  getEditScreenViewFromProps(props) {
    const v = props['editScreenViewAsAncestor']
    return v
  }

  // !override
  _getChildrenJsx(dividerDirection, widthClassName, heightClassName) {
    console.log('#Duy Phan console style child', this.props.style)
    const editScreenView = this.getEditScreenView()
    let jsx
    const paneData = this.props['paneData']
    const paneNumber = paneData.getPaneNumber()
    const screenPaneDatas = paneData.getScreenDatasAsParent()

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
          paneCss['display'] = 'flex'
          paneCss['flexFlow'] = 'column'
          paneCss['alignItems'] = 'stretch'
          const paneWidth = paneData.getPaneWidth()
          if (paneWidth && paneWidth !== -1) {
            paneCss['width'] = paneWidth + '%'
          }
          const paneHeight = paneData.getPaneHeight()
          if (paneHeight && paneHeight !== -1) {
            paneCss['height'] = paneHeight + '%'
          }

          jsx = (
            <View
              data-br-container-id={paneNumber}
              style={[paneCss, { flex: 1 }]}
              // className={widthClassName + ' ' + heightClassName}
              ref={r => (this.refMain = r)}
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
            const dividerHalfWidthPx = 3
            paneCss['width'] = paneWidth + '%'
          }
          const paneHeight = paneData.getPaneHeight()
          if (paneHeight && paneHeight !== -1) {
            const dividerHalfHeightPx = 3
            paneCss['height'] = paneHeight + '%'
          }

          jsx = (
            <View
              data-br-container-id={paneNumber}
              style={[paneCss, { flex: 1, flexDirection: 'row' }]}
              ref={r => (this.refMain = r)}
              collapsable={false}
              // className={widthClassName + ' ' + heightClassName}
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
