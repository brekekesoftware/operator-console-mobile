import { BaseDividerData } from '../data/BaseDividerData'
import { PaneData } from '../data/PaneData'
import { HorizontalRuntimeDivider } from './HorizontalRuntimeDivider'
import { RuntimeChildPane } from './RuntimeChildPane'
import { RuntimePane } from './RuntimePane'
import { VerticalRuntimeDivider } from './VerticalRuntimeDivider'

export class RuntimeRootPane extends RuntimePane {
  _RuntimeScreenViewAsParent
  constructor(props) {
    super(props)
    this._RuntimeScreenViewAsParent = this.getRuntimeScreenViewFromProps(props)
  }

  // !override
  getRuntimeScreenView() {
    return this._RuntimeScreenViewAsParent
  }

  // !override
  getRuntimeScreenViewFromProps(props) {
    const v = props['runtimeScreenViewAsParent']
    return v
  }

  // !override
  _getChildrenJsx(dividerDirection, widthClassName, heightClassName) {
    const runtimeScreenView = this.getRuntimeScreenView()
    let jsx
    const paneData = this.props['paneData']
    const paneNumber = paneData.getPaneNumber()
    const screenPaneDatas = paneData.getScreenDatasAsParent()
    const screenData = screenPaneDatas.getScreenDataAsParent()

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
          paneCss['backgroundColor'] = screenData.getScreenBackgroundColor()
          paneCss['color'] = screenData.getScreenForegroundColor()
          const paneWidth = paneData.getPaneWidth()
          if (paneWidth && paneWidth !== -1) {
            const dividerHalfWidthPx = getComputedStyle(
              document.documentElement,
            ).getPropertyValue('--broc_dividerHalfWidth')
            paneCss['width'] =
              'calc(' + paneWidth + '% - ' + dividerHalfWidthPx + ')'
          }
          const paneHeight = paneData.getPaneHeight()
          if (paneHeight && paneHeight !== -1) {
            const dividerHalfHeightPx = getComputedStyle(
              document.documentElement,
            ).getPropertyValue('--broc_dividerHalfHeight')
            paneCss['height'] =
              'calc(' + paneHeight + '% - ' + dividerHalfHeightPx + ')'
          }

          jsx = (
            <div
              data-br-container-id={paneNumber}
              style={paneCss}
              className={widthClassName + ' ' + heightClassName}
            >
              <RuntimeChildPane
                runtimePaneAsParent={this}
                paneData={upperPaneData}
                runtimeScreenViewAsAncestor={runtimeScreenView}
                className={'upperContainer'}
                parent-container={this}
                paneType={PaneData.PANE_TYPES.upperPane}
              />
              <HorizontalRuntimeDivider runtimePaneAsParent={this} />
              <RuntimeChildPane
                runtimePaneAsParent={this}
                paneData={bottomPaneData}
                runtimeScreenViewAsAncestor={runtimeScreenView}
                className={'bottomContainer'}
                parent-container={this}
                paneType={PaneData.PANE_TYPES.bottomPane}
              />
            </div>
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
          paneCss['backgroundColor'] = screenData.getScreenBackgroundColor()
          paneCss['color'] = screenData.getScreenForegroundColor()

          const paneWidth = paneData.getPaneWidth()
          if (paneWidth && paneWidth !== -1) {
            paneCss['width'] = paneWidth + '%'
          }
          const paneHeight = paneData.getPaneHeight()
          if (paneHeight && paneHeight !== -1) {
            paneCss['height'] = paneHeight + '%'
          }

          jsx = (
            <div
              data-br-container-id={paneNumber}
              style={paneCss}
              className={widthClassName + ' ' + heightClassName}
            >
              <RuntimeChildPane
                runtimePaneAsParent={this}
                paneData={leftPaneData}
                runtimeScreenViewAsAncestor={runtimeScreenView}
                className={'leftContainer'}
                parent-container={this}
                paneType={PaneData.PANE_TYPES.leftPane}
              />
              <VerticalRuntimeDivider runtimePaneAsParent={this} />
              <RuntimeChildPane
                runtimePaneAsParent={this}
                paneData={rightPaneData}
                runtimeScreenViewAsAncestor={runtimeScreenView}
                className={'rightContainer'}
                parent-container={this}
                paneType={PaneData.PANE_TYPES.rightPane}
              />
            </div>
          )
        }
        break
    }
    return jsx
  }
}
