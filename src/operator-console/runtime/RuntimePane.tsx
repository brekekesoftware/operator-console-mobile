import { createRef } from 'react'
import { ScrollView, StyleProp, Text, View, ViewStyle } from 'react-native'

import { BasePane } from '../base/BasePane'
import { BaseDividerData } from '../data/BaseDividerData'
import { EditorPane } from '../editor/EditorPane'
import { EditScreenView } from '../editor/EditScreenView'
import { Util } from '../Util'
import { RuntimeChildPane } from './RuntimeChildPane'
import { RuntimeRootPane } from './RuntimeRootPane'
import { RuntimeScreenView_ver2 } from './RuntimeScreenView_ver2'
import { RuntimeTabFunctionComponent } from './RuntimeTabFunctionComponent'
import { RuntimeWidgetFactory } from './widget/runtime/RuntimeWidgetFactory'

const _PANES = new Object()

// !abstract class
export class RuntimePane extends BasePane {
  paneNum
  _refEditor
  _refScroll
  // !abstract
  getRuntimeScreenView() {
    throw new Error('Not implemented.')
  }

  // !abstract
  getRuntimeScreenViewFromProps(props) {
    throw new Error('Not implemented.')
  }

  getPaneData() {
    return this.props['paneData']
  }

  constructor(props) {
    super(props)

    // const screenData = this.getEditScreenViewFromProps(props).getScreenData();
    const parentContainer = props['parent-container']
    const paneType = props['paneType']
    const paneData = props['paneData']
    this.paneNum = paneData.getPaneNumber()
    this._refEditor = createRef()
    this._refScroll = createRef()

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
    let runtimeVerticalAreaClassName
    if (this._VerticalDepth === 0) {
      width = 100
      runtimeVerticalAreaClassName = 'editorVerticalAreaWidth100Percent'
    } else {
      width = 50
      runtimeVerticalAreaClassName = 'editorVerticalAreaWidth50Percent'
    }
    this._RuntimeVerticalAreaClassName = runtimeVerticalAreaClassName
    this._WidthWithPercent = width + '%'

    let height
    let runtimeHorizontalAreaClassName
    if (this._HorizontalDepth === 0) {
      height = 100
      runtimeHorizontalAreaClassName = 'editorHorizontalAreaHeight100Percent'
    } else {
      height = 50
      runtimeHorizontalAreaClassName = 'editorHorizontalAreaHeight50Percent'
    }
    this._RuntimeHorizontalAreaClassName = runtimeHorizontalAreaClassName
    this._HeightWithPercent = height + '%'

    const backgroundColor = props['backgroundColor']

    // if( parentContainer && parentContainer.getDividerData() ){
    //     const parentDividerData = parentContainer.getDividerData();
    //
    // }

    this.state = {
      parentContainer,
      backgroundColor,
    }
  }

  getRuntimePaneData() {
    return this.props['paneData']
  }

  setRuntimePanezSelectedTabKeyAsString(sTabKey) {
    this.props['paneData'].getTabsData().setSelectedTabKeyAsString(sTabKey)
  }

  setRuntimePanezEnableTabs(b) {
    this.props['paneData'].setEnableTabs(b)
  }

  getRuntimePanezEnableTabs() {
    const b = this.props['paneData'].getEnableTabs()
    return b
  }

  getPaneId() {
    return this.props['paneData'].getPaneNumber()
  }

  static getRuntimePaneByContainerId(containerId) {
    const container = _PANES[containerId]
    return container
  }

  // _getCSS(){
  //     const css = {
  //         backgroundColor:this.state.backgroundColor,
  //         width:"100%",
  //         height:"100%"
  //     };
  //     return css;
  // }

  setDivider(direction) {
    const paneData = this.props['paneData']
    paneData.setDivider(direction)
    this.setState({ rerender: true })
  }

  componentDidUpdate(): void {
    const widgetDatas = this.props.paneData.getWidgetDatasForNoTabs()
    const widgetDataArray = widgetDatas.getWidgetDataArray()
    const { width: w, height: h } = Util.caculateCanvasSize(widgetDataArray)
    this._refEditor?.current?.measure((fx, fy, width, height, px, py) => {
      console.log('#Duy Phan console 1122', w, h, width, height)
      this._refScroll.current?.setNativeProps({
        style: {
          width: w < width ? width : w,
          height: h < height ? height : h,
        },
      })
    })
  }

  getDividerData() {
    return this.props['paneData'].getDividerData()
  }

  onTabClickByRuntimeTabFunctionComponent(tabKey) {
    this.getRuntimeScreenView().onTabClickByRuntimePane(this, tabKey)
  }

  // !abstract
  _getChildrenJsx(
    dividerDirection,
    widthClassName,
    heightClassName,
    refEditor,
  ) {
    throw new Error('Not Implemented.')
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
          widthClassName = { width: '50%' }
        } else {
          widthClassName = { width: '100%' }
        }
      } else {
        widthClassName = { width: '100%' }
      }
      if (this.state.parentContainer) {
        if (
          this.state.parentContainer.getDividerData().getDividerDirection() ===
          BaseDividerData.DIVIDER_DIRECTIONS.horizontal
        ) {
          heightClassName = { height: '50%' }
        } else {
          heightClassName = { height: '100%' }
        }
      } else {
        heightClassName = { height: '100%' }
      }

      jsx = this._getChildrenJsx(
        dividerDirection,
        widthClassName,
        heightClassName,
        this._refEditor,
      )
    } else {
      const css = {
        position: 'relative',
      }

      if (!this.state.parentContainer) {
        // root container
        css['width'] = '100%'
        css['height'] = '100%'
      }
      // }
      const className = 'containerContent ' + this.props.className
      const paneData = this.props['paneData']
      const screenData = paneData.getPaneDatasAsParent().getScreenDataAsParent()
      css['color'] = screenData.getScreenForegroundColor()
      css['backgroundColor'] = screenData.getScreenBackgroundColor()

      const paneWidth = paneData.getPaneWidth()
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
          <RuntimeTabFunctionComponent
            data-br-container-id={paneData.getPaneNumber()}
            tabsData={paneData.getTabsData()}
            runtimePaneAsParent={this}
            className={className}
            css={css}
            ref={this._refEditor}
          />
        )
      } else {
        const runtimeScreenView = this.getRuntimeScreenView()
        const widgetDatas = paneData.getWidgetDatasForNoTabs()
        const widgetDataArray = widgetDatas.getWidgetDataArray()
        jsx = (
          <View
            data-br-container-id={paneData.getPaneNumber()}
            // parent-container={this.state.parentContainer}
            style={[{ width: '100%', height: '100%' }, this.props.style, css]}
            ref={this._refEditor}
            collapsable={false}
          >
            <ScrollView horizontal bounces={false}>
              <ScrollView bounces={false}>
                <View ref={this._refScroll}>
                  {widgetDataArray.map((widgetData, index) => {
                    const widgetJsx =
                      RuntimeWidgetFactory.getStaticRuntimeWidgetFactoryInstance().getRuntimeWidgetJsx(
                        {
                          runtimePane: this,
                          widgetData,
                          jsxKey: index,
                        },
                      )
                    return widgetJsx
                  })}
                </View>
              </ScrollView>
            </ScrollView>
          </View>
        )
      }
    }

    return jsx
  }
}
