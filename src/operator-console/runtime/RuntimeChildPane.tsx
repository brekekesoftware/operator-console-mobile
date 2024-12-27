import { createRef } from 'react'
import { View } from 'react-native'

import { BaseDividerData } from '../data/BaseDividerData'
import { PaneData } from '../data/PaneData'
import { HorizontalRuntimeDivider } from './HorizontalRuntimeDivider'
import { RuntimePane } from './RuntimePane'
import { VerticalRuntimeDivider } from './VerticalRuntimeDivider'

export class RuntimeChildPane extends RuntimePane {
  _RuntimeScreenViewAsAncestor
  refLeft
  refRight
  refTop
  refBottom
  refMain
  constructor(props) {
    super(props)
    // this._RuntimePaneAsParent = props["runtimePaneAsParent"];
    this._RuntimeScreenViewAsAncestor =
      this.getRuntimeScreenViewFromProps(props)
    this.refLeft = createRef()
    this.refRight = createRef()
    this.refTop = createRef()
    this.refBottom = createRef()
  }

  // !override
  getRuntimeScreenView() {
    return this._RuntimeScreenViewAsAncestor
  }

  getRuntimeScreenViewFromProps(props) {
    const v = props['runtimeScreenViewAsAncestor']
    return v
  }

  // !override
  _getChildrenJsx(dividerDirection, widthClassName, heightClassName) {
    const runtimeScreenView = this.getRuntimeScreenView()
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
          paneCss['position'] = 'relative'
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
              style={[{ flex: 1 }, paneCss]}
              // className={widthClassName + ' ' + heightClassName}
              ref={r => (this.refMain = r)}
              collapsable={false}
            >
              <RuntimeChildPane
                runtimePaneAsParent={this}
                paneData={upperPaneData}
                runtimeScreenViewAsAncestor={runtimeScreenView}
                style={{ height: '50%' }}
                parent-container={this}
                paneType={PaneData.PANE_TYPES.upperPane}
                ref={r => (this.refTop = r)}
              />
              <HorizontalRuntimeDivider runtimePaneAsParent={this} />
              <RuntimeChildPane
                runtimePaneAsParent={this}
                paneData={bottomPaneData}
                runtimeScreenViewAsAncestor={runtimeScreenView}
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
              style={[{ flex: 1, flexDirection: 'row' }, paneCss]}
              // className={widthClassName + ' ' + heightClassName}
              ref={r => (this.refMain = r)}
              collapsable={false}
            >
              <RuntimeChildPane
                runtimePaneAsParent={this}
                paneData={leftPaneData}
                runtimeScreenViewAsAncestor={runtimeScreenView}
                style={{ width: '50%' }}
                parent-container={this}
                paneType={PaneData.PANE_TYPES.leftPane}
                ref={r => (this.refLeft = r)}
              />
              <VerticalRuntimeDivider runtimePaneAsParent={this} />
              <RuntimeChildPane
                runtimePaneAsParent={this}
                paneData={rightPaneData}
                runtimeScreenViewAsAncestor={runtimeScreenView}
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
