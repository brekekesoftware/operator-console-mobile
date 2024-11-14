import BaseDividerData from '../data/BaseDividerData'
import PaneData from '../data/PaneData'
import { EditorPane } from './EditorPane'
import HorizontalEditorDivider from './HorizontalEditorDivider'
import VerticalEditorDivider from './VerticalEditorDivider'

export class EditorChildPane extends EditorPane {
  constructor(props) {
    super(props)
    // this._EditorPaneAsParent = props["editorPaneAsParent"];
    this._EditScreenViewAsAncestor = this.getEditScreenViewFromProps(props)
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
            <div
              data-br-container-id={paneNumber}
              style={paneCss}
              className={widthClassName + ' ' + heightClassName}
            >
              <EditorChildPane
                editorPaneAsParent={this}
                paneData={upperPaneData}
                editScreenViewAsAncestor={editScreenView}
                className={'upperContainer'}
                parent-container={this}
                paneType={PaneData.PANE_TYPES.upperPane}
              />
              <HorizontalEditorDivider editorPaneAsParent={this} />
              <EditorChildPane
                editorPaneAsParent={this}
                paneData={bottomPaneData}
                editScreenViewAsAncestor={editScreenView}
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
              <EditorChildPane
                editorPaneAsParent={this}
                paneData={leftPaneData}
                editScreenViewAsAncestor={editScreenView}
                className={'leftContainer '}
                parent-container={this}
                paneType={PaneData.PANE_TYPES.leftPane}
              />
              <VerticalEditorDivider editorPaneAsParent={this} />
              <EditorChildPane
                editorPaneAsParent={this}
                paneData={rightPaneData}
                editScreenViewAsAncestor={editScreenView}
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
