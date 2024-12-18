import { createRef } from 'react'
import type { LayoutRectangle } from 'react-native'
import { LayoutChangeEvent, ScrollView, Text, View } from 'react-native'

import { BasePane } from '../base/BasePane'
import { GridLines } from '../common/GridLines'
import { BaseDividerData } from '../data/BaseDividerData'
import { WidgetData } from '../data/widgetData/WidgetData'
import { dndEventEmiter } from '../lib/rnd/DndEventEmiter'
import { EditorTabFunctionComponent } from './EditorTabFunctionComponent'
import type { EditScreenView } from './EditScreenView'
import { EditorWidgetFactory } from './widget/editor/EditorWidgetFactory'
import { EditorWidgetTemplateFactory } from './widget/template/EditorWidgetTemplateFactory'

const _PANES = new Object()

// !abstract class
export class EditorPane extends BasePane {
  // !abstract
  getEditScreenView(): EditScreenView {
    throw new Error('Not implemented.')
  }

  // !abstract
  getEditScreenViewFromProps(props) {
    throw new Error('Not implemented.')
  }

  getPaneData() {
    return this.props['paneData']
  }

  _VerticalDepth
  _HorizontalDepth
  _EditorVerticalAreaClassName
  _WidthWithPercent: string
  _EditorHorizontalAreaClassName
  _HeightWithPercent: string
  _ClassName: string
  _Layout: LayoutRectangle | null = null
  _refEditor
  _Position = { px: 0, py: 0 }
  constructor(props) {
    super(props)

    // const screenData = this.getEditScreenViewFromProps(props).getScreenData();
    this._refEditor = createRef()
    const parentContainer = props['parent-container']
    const paneType = props['paneType']
    const paneData = props['paneData']
    // let paneData;
    // if( parentContainer ){
    //     const parentPaneData = parentContainer.getEditingPaneData();
    //     paneData = screenData.addPaneData( paneType, parentPaneData  );
    //
    // }
    // else {
    //     paneData = screenData.addPaneData( PaneData.PANE_TYPES.rootPane );
    // }

    const paneNumber = paneData.getPaneNumber()
    _PANES[paneNumber] = this

    let verticalDepth
    let horizontalDepth
    if (parentContainer) {
      verticalDepth = parentContainer._VerticalDepth
      horizontalDepth = parentContainer._HorizontalDepth
      const dividerData = parentContainer.getDividerData()
      const direction = dividerData.getDividerDirection()
      switch (direction) {
        case BaseDividerData.DIVIDER_DIRECTIONS.vertical:
          verticalDepth++
          break
        case BaseDividerData.DIVIDER_DIRECTIONS.horizontal:
          horizontalDepth++
          break
      }
    } else {
      verticalDepth = 0
      horizontalDepth = 0
    }
    this._VerticalDepth = verticalDepth
    this._HorizontalDepth = horizontalDepth

    // let depth;
    // if( parentContainer ){
    //     depth = parentContainer._Depth + 1;
    // }
    // else{
    //     depth = 0;
    // }
    // this._Depth = depth;
    //
    // let width = 100
    // for( let i = 0; i < this._Depth ; i++ ){
    //     width /= 2;
    // }
    let width
    let editorVerticalAreaClassName
    if (this._VerticalDepth === 0) {
      width = 100
      editorVerticalAreaClassName = 'editorVerticalAreaWidth100Percent'
    } else {
      width = 50
      editorVerticalAreaClassName = 'editorVerticalAreaWidth50Percent'
    }
    this._EditorVerticalAreaClassName = editorVerticalAreaClassName
    this._WidthWithPercent = width + '%'

    let height
    let editorHorizontalAreaClassName
    if (this._HorizontalDepth === 0) {
      height = 100
      editorHorizontalAreaClassName = 'editorHorizontalAreaHeight100Percent'
    } else {
      height = 50
      editorHorizontalAreaClassName = 'editorHorizontalAreaHeight50Percent'
    }
    this._EditorHorizontalAreaClassName = editorHorizontalAreaClassName
    this._HeightWithPercent = height + '%'

    // if( parentContainer && parentContainer.getDividerData() ){
    //     const parentDividerData = parentContainer.getDividerData();
    //
    // }

    this._ClassName = props['className']

    this.state = {
      parentContainer,
    }
  }

  getEditingPaneData() {
    return this.props['paneData']
  }

  setEditorPanezSelectedTabKeyAsString(sTabKey) {
    this.props['paneData'].getTabsData().setSelectedTabKeyAsString(sTabKey)
  }

  setEditorPanezEnableTabs(b) {
    this.props['paneData'].setEnableTabs(b)
  }

  getEditorPanezEnableTabs() {
    const b = this.props['paneData'].getEnableTabs()
    return b
  }

  getPaneId() {
    return this.props['paneData'].getPaneNumber()
  }

  static getEditorPaneByContainerId(containerId) {
    const container = _PANES[containerId]
    return container
  }

  setDivider(direction) {
    const paneData = this.props['paneData']
    paneData.setDivider(direction)
    this.setState({ rerender: true })
  }

  getDividerData() {
    return this.props['paneData'].getDividerData()
  }

  onTabClickByEditorTabFunctionComponent(tabKey, mouseEvent) {
    this.getEditScreenView().onTabClickByEditorPanel(this, tabKey, mouseEvent)
  }

  removeEditorDivider(onRemoveEditorDividerFunction) {
    const paneData = this.props['paneData']
    paneData.removeDividerData()

    this.setState({ rerender: true }, () => {
      if (onRemoveEditorDividerFunction) {
        onRemoveEditorDividerFunction(this)
      }
    })
  }

  componentDidMount(): void {
    dndEventEmiter.on('drop', d => {
      this._onDrop(d)
    })

    this._refEditor.measure((fx, fy, width, height, px, py) => {
      this._Position.px = px
      this._Position.py = py
    })
  }

  // _getChildContainerElement( className ){
  //     const eThis  = document.querySelector('[data-br-container-id="' + this._containerId + '"]');
  //     const e = eThis.querySelector("." + className );
  //     return e;
  // }
  //
  // getChildLeftContainerElement(){
  //     const e = this._getChildContainerElement("leftContainer");
  //     return e;
  // }
  //
  // getChildRightContainerElement(){
  //     const e = this._getChildContainerElement("rightContainer");
  //     return e;
  // }
  //
  // getChildUpperContainerElement(){
  //     const e = this._getChildContainerElement("upperContainer");
  //     return e;
  // }
  //
  // getChildBottomContainerElement(){
  //     const e = this._getChildContainerElement("bottomContainer");
  //     return e;
  // }

  // !abstract
  _getChildrenJsx(dividerDirection, widthClassName, heightClassName) {
    throw new Error('Not Implemented.')
  }

  isDropZone(gesture) {
    const dz = this._Layout
    if (dz) {
      return (
        gesture.moveX > dz.x + 240 &&
        gesture.moveX < dz.x + dz.width + 240 &&
        gesture.moveY < dz.y + dz.height + 55
      )
    }
    return false
  }

  _onDrop({
    editorWidgetTypeId,
    nX: offsetX,
    nY: offsetY,
    gestureState,
    px,
    py,
  }) {
    const sWidgetTypeId = editorWidgetTypeId
    if (
      !sWidgetTypeId ||
      !this.isDropZone({ moveX: offsetX, moveY: offsetY })
    ) {
      return
    }
    const paneData = this.props['paneData']
    const widgetTypeId = parseInt(sWidgetTypeId)
    const editorPanelId = paneData.getPaneNumber()

    const widgetDatas = paneData.getWidgetDatasForNoTabs()

    const editorWidgetTemplate =
      EditorWidgetTemplateFactory.getStaticEditorWidgetSettingsFactoryInstance().getEditorWidgetTemplateByWidgetTypeId(
        widgetTypeId,
      )
    let widgetWidth = editorWidgetTemplate.getWidth()
    let widgetHeight = editorWidgetTemplate.getHeight()
    // Set editor widget value
    switch (widgetTypeId) {
      case WidgetData.WIDGET_TYPE_IDS.callTable:
        widgetWidth = 640
        widgetHeight = 128
        break
      case WidgetData.WIDGET_TYPE_IDS.extensionTable:
        widgetWidth = 640
        widgetHeight = 128
        break
      case WidgetData.WIDGET_TYPE_IDS.text:
        widgetWidth = 160
        widgetHeight = 160
        break
      case WidgetData.WIDGET_TYPE_IDS.note:
        widgetWidth = 160
        widgetHeight = 160
        break
      case WidgetData.WIDGET_TYPE_IDS.lineTable:
        widgetWidth = 640
        widgetHeight = 128
        break
      case WidgetData.WIDGET_TYPE_IDS.legacyUccac:
        widgetWidth = 470
        widgetHeight = 300
        break
      case WidgetData.WIDGET_TYPE_IDS.legacyButton:
        widgetWidth = 80
        widgetHeight = 80
        break
    }

    const editingScreenGrid = this.getEditScreenView().getEditingScreenGrid()

    let widgetRelativePositionX = offsetX - 240
    let widgetRelativePositionY = offsetY - 46
    widgetRelativePositionX -= widgetRelativePositionX % editingScreenGrid

    widgetRelativePositionY -= widgetRelativePositionY % editingScreenGrid

    console.log('#Duy Phan console widgetTypeId', widgetTypeId)

    widgetDatas.addWidgetData(
      widgetTypeId,
      widgetRelativePositionX,
      widgetRelativePositionY,
      widgetWidth,
      widgetHeight,
    )
    const widgetIndex = widgetDatas.getWidgetDataCount() - 1
    const widgetData = widgetDatas.getWidgetDataAt(widgetIndex)
    this.getEditScreenView().setSelectingEditorWidgetDataToState(
      widgetData,
      () => {},
    )
  }

  _onDragOver(ev) {
    ev.preventDefault()
    // ev.target.style.cursor = 'grabbing';
  }

  _onDragEnter(ev) {
    ev.preventDefault()
    // ev.dataTransfer.dropEffect = "grabbing";
  }

  render() {
    const paneData = this.props['paneData']
    const dividerData = paneData.getDividerData()
    let jsx
    if (dividerData) {
      const dividerDirection = dividerData.getDividerDirection()
      let widthClassName
      let heightClassName
      if (this.state.parentContainer) {
        if (
          this.state.parentContainer.getDividerData().getDividerDirection() ===
          BaseDividerData.DIVIDER_DIRECTIONS.vertical
        ) {
          widthClassName = 'width50PercentMinusDividerWidth'
        } else {
          widthClassName = 'width100Percent'
        }
      } else {
        widthClassName = 'width100Percent'
      }
      if (this.state.parentContainer) {
        if (
          this.state.parentContainer.getDividerData().getDividerDirection() ===
          BaseDividerData.DIVIDER_DIRECTIONS.horizontal
        ) {
          heightClassName = 'height50PercentMinusDividerHeight'
        } else {
          heightClassName = 'height100Percent'
        }
      } else {
        heightClassName = 'height100Percent'
      }

      jsx = this._getChildrenJsx(
        dividerDirection,
        widthClassName,
        heightClassName,
      )
    } else {
      const css = {
        color: this.props.foregroundColor,
        backgroundColor: this.props.backgroundColor,
      }

      // if( dividerData ){
      //     const dividerDirection =  dividerData.getDividerDirection();
      //     switch( dividerDirection ){
      //         case BaseDividerData.DIVIDER_DIRECTIONS.vertical:
      //             css["height"] = "100%";
      //             break;
      //         case BaseDividerData.DIVIDER_DIRECTIONS.horizontal:
      //             css["width"] = "100%";
      //             break;
      //
      //     }
      // }
      // else{
      if (this.state.parentContainer) {
      } else {
        // root container
        css['width'] = '100%'
        css['height'] = '100%'
      }
      // }
      const className = 'containerContent ' + this._ClassName
      const paneData = this.props['paneData']

      const paneWidth = paneData.getPaneWidth()
      if (paneWidth && paneWidth !== -1) {
        const dividerHalfWidthPx = getComputedStyle(
          document.documentElement,
        ).getPropertyValue('--broc_dividerHalfWidth')
        css['width'] = 'calc(' + paneWidth + '% - ' + dividerHalfWidthPx + ')'
      }
      const paneHeight = paneData.getPaneHeight()
      if (paneHeight && paneHeight !== -1) {
        const dividerHalfHeightPx = getComputedStyle(
          document.documentElement,
        ).getPropertyValue('--broc_dividerHalfHeight')
        css['height'] =
          'calc(' + paneHeight + '% - ' + dividerHalfHeightPx + ')'
      }

      if (paneData.getEnableTabs()) {
        jsx = (
          <EditorTabFunctionComponent
            data-br-container-id={paneData.getPaneNumber()}
            tabsData={paneData.getTabsData()}
            editorPaneAsParent={this}
            className={className}
            css={css}
          />
        )
      } else {
        const editScreenView = this.getEditScreenView()
        const editingScreenGrid = editScreenView.getEditingScreenGrid()
        const widgetDatas = paneData.getWidgetDatasForNoTabs()
        const widgetDataArray = widgetDatas.getWidgetDataArray()
        jsx = (
          <View
            data-br-container-id={paneData.getPaneNumber()}
            ref={r => (this._refEditor = r)}
            // parent-container={this.state.parentContainer}
            // className={className}
            // style={css}
            // onMouseDown={ev =>
            //   this.getEditScreenView().onMouseDownEditorPaneInSettingsMode(ev)
            // }
            // onDragEnter={ev => this._onDragEnter(ev)}
            // onDragOver={ev => {
            //   this._onDragOver(ev)
            // }}
            // onDrop={ev => this._onDrop(ev)}
            style={{ width: '100%', height: '100%' }}
            onLayout={e => {
              this._Layout = e.nativeEvent.layout
            }}
          >
            <GridLines
              style={{
                width: '100%',
                height: '100%',
                // position: 'relative',
              }}
              strokeWidth={2}
              cellWidth={editingScreenGrid * 10}
              cellWidth2={editingScreenGrid}
              cellHeight={editingScreenGrid * 10}
              cellHeight2={editingScreenGrid}
            >
              <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ flex: 1 }}
                // horizontal
              >
                {widgetDataArray.map((widgetData, index) => {
                  const widgetJsx =
                    EditorWidgetFactory.getStaticEditorWidgetFactoryInstance().getEditorWidgetJsx(
                      {
                        editorPane: this,
                        widgetData: widgetDataArray[index],
                        jsxKey: index,
                      },
                    )
                  return widgetJsx
                })}
              </ScrollView>
            </GridLines>
          </View>
        )
      }
    }

    return jsx
  }
}
