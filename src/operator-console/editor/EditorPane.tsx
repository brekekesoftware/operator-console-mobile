import { createRef } from 'react'
import type { LayoutRectangle, StyleProp, ViewStyle } from 'react-native'
import { ScrollView, TouchableWithoutFeedback, View } from 'react-native'

import { BasePane } from '../base/BasePane'
import { GridLines } from '../common/GridLines'
import { BaseDividerData } from '../data/BaseDividerData'
import { WidgetData } from '../data/widgetData/WidgetData'
import { dndEventEmiter } from '../lib/rnd/DndEventEmiter'
import { DividerContext } from './DividerContext'
import { EditorTabFunctionComponent } from './EditorTabFunctionComponent'
import type { EditScreenView } from './EditScreenView'
import { EditorWidgetFactory } from './widget/editor/EditorWidgetFactory'
import { EditorWidgetTemplateFactory } from './widget/template/EditorWidgetTemplateFactory'

const _PANES = new Object()

// !abstract class
export class EditorPane extends BasePane {
  static contextType = DividerContext
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
  _Style: StyleProp<ViewStyle>
  _Layout: LayoutRectangle | null = null
  _refEditor
  _Position = { px: 0, py: 0 }
  paneNum
  constructor(props, context) {
    super(props)

    // const screenData = this.getEditScreenViewFromProps(props).getScreenData();
    this._refEditor = createRef()
    const parentContainer = props['parent-container']
    const paneType = props['paneType']
    const paneData = props['paneData']
    this.paneNum = paneData.getPaneNumber()

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

    this._Style = props['style']

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

  onTabClickByEditorTabFunctionComponent(tabKey) {
    this.getEditScreenView().onTabClickByEditorPanel(this, tabKey)
  }

  removeEditorDivider(onRemoveEditorDividerFunction) {
    const paneData = this.props['paneData']
    paneData.removeDividerData()
    console.log('#Duy Phan console delete')

    this.setState({ rerender: true }, () => {
      if (onRemoveEditorDividerFunction) {
        onRemoveEditorDividerFunction(this)
      }
    })
  }

  componentDidMount(): void {
    const paneData = this.props['paneData']
    dndEventEmiter.on('drop', d => {
      if (!paneData.getEnableTabs()) {
        // console.log('#Duy Phan console this._refEditor', this._refEditor)
        this._refEditor?.current?.measure((fx, fy, width, height, px, py) => {
          console.log('#Duy Phan console data', fx, fy, px, py, width, height)
          console.log('#Duy Phan console d', d)
          if (
            this.isDropZone(
              { moveX: d.nX, moveY: d.nY },
              { fx, fy, width, height, px, py },
            )
          ) {
            console.log('#Duy Phan console drop times', Date.now())
            this._onDrop({ ...d, px, py })
          }
        })
      }
    })
  }

  // !abstract
  _getChildrenJsx(dividerDirection, widthClassName, heightClassName) {
    throw new Error('Not Implemented.')
  }

  isDropZone(gesture, measure) {
    if (measure) {
      return (
        gesture.moveX > measure.px &&
        gesture.moveX < measure.px + measure.width &&
        gesture.moveY < measure.py + measure.height
      )
    }
    return false
  }

  _onDrop({ editorWidgetTypeId, nX: offsetX, nY: offsetY, px, py }) {
    const sWidgetTypeId = editorWidgetTypeId
    if (!sWidgetTypeId) {
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

    let widgetRelativePositionX = offsetX - px
    let widgetRelativePositionY = offsetY - py
    widgetRelativePositionX -= widgetRelativePositionX % editingScreenGrid

    widgetRelativePositionY -= widgetRelativePositionY % editingScreenGrid

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

      if (this.state.parentContainer) {
      } else {
        // root container
        css['width'] = '100%'
        css['height'] = '100%'
      }
      // }
      // const className = 'containerContent ' + this._ClassName
      const paneData = this.props['paneData']

      const paneWidth = paneData.getPaneWidth()
      console.log('#Duy Phan console paneWidth', paneWidth)
      if (paneWidth && paneWidth !== -1) {
        const dividerHalfWidthPx = 3
        css['width'] = paneWidth + '%'
      }
      const paneHeight = paneData.getPaneHeight()
      if (paneHeight && paneHeight !== -1) {
        const dividerHalfHeightPx = 3
        css['height'] = paneHeight + '%'
      }

      if (paneData.getEnableTabs()) {
        jsx = (
          <EditorTabFunctionComponent
            data-br-container-id={paneData.getPaneNumber()}
            tabsData={paneData.getTabsData()}
            editorPaneAsParent={this}
            // className={className}
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
            ref={this._refEditor}
            collapsable={false}
            // parent-container={this.state.parentContainer}
            // className={className}
            // style={}

            style={[{ width: '100%', height: '100%' }, this.props.style, css]}
            // onLayout={e => {
            //   this._Layout = e.nativeEvent.layout
            // }}
          >
            <TouchableWithoutFeedback
              onPress={ev =>
                this.getEditScreenView().onMouseDownEditorPaneInSettingsMode(
                  paneData.getPaneNumber(),
                )
              }
            >
              <GridLines
                style={{
                  width: '100%',
                  height: '100%',
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
            </TouchableWithoutFeedback>
          </View>
        )
      }
    }

    return jsx
  }
}
