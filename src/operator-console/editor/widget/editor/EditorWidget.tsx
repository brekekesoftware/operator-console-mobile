import React from 'react'
import { Dimensions } from 'react-native'

import {
  CONNECTOR_BOTTOM_MIDDLE,
  CONNECTOR_MIDDLE_LEFT,
  CONNECTOR_MIDDLE_RIGHT,
  CONNECTOR_TOP_MIDDLE,
} from '../../../lib/rnd/Connector'
import { Rnd } from '../../../lib/rnd/Rnd'
import type { ColorPaneContextType } from '../../ColorPaneContext'
import { ColorPaneContext } from '../../ColorPaneContext'

export class EditorWidget extends React.Component<
  any,
  any,
  ColorPaneContextType
> {
  _EditorPaneAsParent

  static contextType = ColorPaneContext
  constructor(props, context) {
    super(props, context)
    this._EditorPaneAsParent = props['editorPane'] // tabs or noTabs
  }

  getWidgetData() {
    return this.props['widgetData']
  }

  componentDidMount() {
    // !empty for subclass
  }

  componentDidUpdate() {
    // !empty for subclass
  }

  componentWillUnmount() {
    // !empty for subclass
  }

  getEditorPaneAsParent() {
    return this._EditorPaneAsParent
  }

  _onWidgetMoved = (x, y, widgetData) => {
    const editView = this._EditorPaneAsParent.getEditScreenView()
    const editingScreenGrid = editView.getEditingScreenGrid()

    // drag limit
    if (x <= -widgetData.getWidgetWidth()) {
      x = -widgetData.getWidgetWidth() + editingScreenGrid
    }
    if (y <= -widgetData.getWidgetHeight()) {
      y = -widgetData.getWidgetHeight() + editingScreenGrid
    }

    // const editingWidgets = [...this.state.editingWidgets];
    const rx = x % editingScreenGrid
    if (rx > editingScreenGrid * 0.5) {
      x += editingScreenGrid - rx
    } else {
      x -= rx
    }
    const ry = y % editingScreenGrid
    if (ry > editingScreenGrid * 0.5) {
      y += editingScreenGrid - ry
    } else {
      y -= ry
    }

    const paneData = this._EditorPaneAsParent.getEditingPaneData()
    let widgetDatas
    if (paneData.getEnableTabs() === true) {
      const tabsData = paneData.getTabsData()
      const tabData = tabsData.getSelectedTabData()
      widgetDatas = tabData.getWidgetDatas()
    } else {
      widgetDatas = paneData.getWidgetDatasForNoTabs()
    }

    // const widgetDataArray = widgetDatas.getWidgetDataArray();
    // const widgetData = widgetDataArray[ widgetIndex ];
    widgetData.setWidgetRelativePositionX(x)
    widgetData.setWidgetRelativePositionY(y)
    widgetDatas.setIndexToLastByWidgetData(widgetData) // render last
  }

  _onDragStop(data, widgetData) {
    this._onWidgetMoved(data.lastX, data.lastY, widgetData)
    //        this.makeWidgetOnTop(i);
    this._EditorPaneAsParent
      .getEditScreenView()
      .setSelectingEditorWidgetDataToState(widgetData)
    this._EditorPaneAsParent.setState({ rerender: true })
  }

  _onResizeStop(pos, widgetData) {
    this._onWidgetResized(null, pos.x, pos.y, null, pos.w, pos.h, widgetData)
  }

  _onWidgetResized = (dir, x, y, delta, width, height, widgetData) => {
    const paneData = this._EditorPaneAsParent.getEditingPaneData()
    let widgetDatas
    if (paneData.getEnableTabs() === true) {
      const tabsData = paneData.getTabsData()
      const tabData = tabsData.getSelectedTabData()
      widgetDatas = tabData.getWidgetDatas()
    } else {
      widgetDatas = paneData.getWidgetDatasForNoTabs()
    }

    const editView = this._EditorPaneAsParent.getEditScreenView()
    const editingScreenGrid = editView.getEditingScreenGrid()
    // resize limit
    if (Math.floor(x) + width <= 0) {
      width = editingScreenGrid - Math.floor(x)
    }
    if (Math.floor(y) + height <= 0) {
      height = editingScreenGrid - Math.floor(y)
    }

    widgetData.setWidgetRelativePositionX(x)
    widgetData.setWidgetRelativePositionY(y)
    widgetData.setWidgetWidth(width)
    widgetData.setWidgetHeight(height)

    widgetDatas.setIndexToLastByWidgetData(widgetData) // render last

    this._EditorPaneAsParent.setState({ rerender: true })
  }

  _onMouseDown(ev, widgetData) {
    this._EditorPaneAsParent
      .getEditScreenView()
      .setSelectingEditorWidgetDataToState(widgetData)
  }

  render() {
    const editScreenView = this._EditorPaneAsParent.getEditScreenView()
    const editingScreenGrid = editScreenView.getEditingScreenGrid()

    const widgetData = this.getWidgetData()
    const relativePositionX = widgetData.getWidgetRelativePositionX()
    const relativePositionY = widgetData.getWidgetRelativePositionY()
    const widgetWidth = widgetData.getWidgetWidth()
    const widgetHeight = widgetData.getWidgetHeight()

    const jsx = (
      <Rnd
        w={widgetWidth}
        h={widgetHeight}
        x={relativePositionX}
        y={relativePositionY}
        grid={[editingScreenGrid, editingScreenGrid]}
        limitation={{
          x: 0,
          y: 0,
          w: Dimensions.get('screen').width,
          h: Dimensions.get('screen').height,
        }}
        connectors={[
          CONNECTOR_BOTTOM_MIDDLE,
          CONNECTOR_TOP_MIDDLE,
          CONNECTOR_MIDDLE_LEFT,
          CONNECTOR_MIDDLE_RIGHT,
        ]}
        isResizable={true}
        isDraggable
        onDragEnd={([x, y]) =>
          this._onDragStop({ lastX: x, lastY: y }, widgetData)
        }
        onResizeEnd={data => this._onResizeStop(data, widgetData)}
        onPress={ev => this._onMouseDown(ev, widgetData)}
      >
        {this._getRenderMainJsx()}
      </Rnd>
    )
    return jsx
  }

  // abstract
  _getRenderMainJsx(): any {
    throw new Error('Not implemented.')
  }
}
