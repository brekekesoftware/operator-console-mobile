import { Tabs } from '@ant-design/react-native'
import { forwardRef, useEffect, useRef } from 'react'
import type { LayoutRectangle } from 'react-native'
import {
  InteractionManager,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist'

import { GridLines } from '../common/GridLines'
import { WidgetData } from '../data/widgetData/WidgetData'
import { dndEventEmiter } from '../lib/rnd/DndEventEmiter'
import { Util } from '../Util'
import { EditorWidgetFactory } from './widget/editor/EditorWidgetFactory'
import { EditorWidgetTemplateFactory } from './widget/template/EditorWidgetTemplateFactory'

const _onTabClick = (tabKey, editorPaneAsParent) => {
  const pane = editorPaneAsParent
  const paneId = pane.getPaneId()
  pane.onTabClickByEditorTabFunctionComponent(tabKey)
}

const isDropZone = (gesture, measure) => {
  if (measure) {
    return (
      gesture.moveX > measure.px &&
      gesture.moveX < measure.px + measure.width &&
      gesture.moveY > measure.py &&
      gesture.moveY < measure.py + measure.height
    )
  }
  return false
}

const _onDrop = function ({
  editorWidgetTypeId,
  nX: offsetX,
  nY: offsetY,
  editorPane,
  tabData,
  px,
  py,
}) {
  const sWidgetTypeId = editorWidgetTypeId
  if (!sWidgetTypeId) {
    return
  }
  const widgetTypeId = parseInt(sWidgetTypeId)
  const editorWidgetTemplate =
    EditorWidgetTemplateFactory.getStaticEditorWidgetSettingsFactoryInstance().getEditorWidgetTemplateByWidgetTypeId(
      widgetTypeId,
    )
  let widgetWidth = editorWidgetTemplate.getWidth()
  let widgetHeight = editorWidgetTemplate.getHeight()

  switch (widgetTypeId) {
    case WidgetData.WIDGET_TYPE_IDS.callTable:
      widgetWidth = 640
      widgetHeight = 160
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

  const editingScreenGrid = editorPane
    .getEditScreenView()
    .getEditingScreenGrid()

  let widgetRelativePositionX = offsetX - px
  let widgetRelativePositionY = offsetY - py - 40 // height measure top

  widgetRelativePositionX -= widgetRelativePositionX % editingScreenGrid
  widgetRelativePositionY -= widgetRelativePositionY % editingScreenGrid
  const widgetDatas = tabData.getWidgetDatas()
  widgetDatas.addWidgetData(
    widgetTypeId,
    widgetRelativePositionX,
    widgetRelativePositionY,
    widgetWidth,
    widgetHeight,
  )
  const widgetIndex = widgetDatas.getWidgetDataCount() - 1
  const widgetData = widgetDatas.getWidgetDataAt(widgetIndex)
  editorPane.getEditScreenView().setSelectingEditorWidgetDataToState(widgetData)
}

const EditorTabChildren = ({
  widgetDataArray,
  editingScreenGrid,
  tabId,
  editorPaneAsParent,
}) => {
  const refLayout = useRef<View | null>(null)
  const refScroll = useRef<View | null>(null)

  useEffect(() => {
    const { width: w, height: h } = Util.caculateCanvasSize(widgetDataArray)
    InteractionManager.runAfterInteractions(() => {
      refLayout?.current?.measure((fx, fy, width, height, px, py) => {
        console.log('#Duy Phan console wh1', w, h, width, height)
        refScroll.current?.setNativeProps({
          style: {
            width: w < width ? width : w,
            height: h < height ? height : h,
          },
        })
      })
    })
  })

  return (
    <View
      style={[{ width: '100%', height: '100%', flex: 1 }]}
      // onLayout={e => (refLayout.current = e.nativeEvent.layout)}
      ref={refLayout}
      collapsable={false}
    >
      <GridLines
        data-broc-tab-id={tabId}
        style={{ flex: 1, overflow: 'hidden' }}
        strokeWidth={2}
        cellWidth={editingScreenGrid * 10}
        cellWidth2={editingScreenGrid}
        cellHeight={editingScreenGrid * 10}
        cellHeight2={editingScreenGrid}
      >
        <ScrollView horizontal bounces={false}>
          <ScrollView bounces={false}>
            <View ref={refScroll}>
              {widgetDataArray.map((widgetData, index) => {
                const options = {
                  editorPane: editorPaneAsParent,
                  widgetData,
                  jsxKey: widgetData._widgetUuid,
                }
                const widgetJsx =
                  EditorWidgetFactory.getStaticEditorWidgetFactoryInstance().getEditorWidgetJsx(
                    options,
                  )
                return widgetJsx
              })}
            </View>
          </ScrollView>
        </ScrollView>
      </GridLines>
    </View>
  )
}

export const EditorTabFunctionComponent = forwardRef((props, ref: any) => {
  const editorPaneAsParent = props['editorPaneAsParent']
  const tabsData = props['tabsData']

  const refLayout = useRef<View | null>(null)
  const refTabs = useRef<Tabs | null>(null)

  // css["position"] = "relative";

  const tabItems = new Array(tabsData.getTabDataCount())
  const editScreenView = editorPaneAsParent.getEditScreenView()
  const activeKey = tabsData.getSelectedTabKeyAsString()
  const editingScreenGrid = editScreenView.getEditingScreenGrid()

  useEffect(() => {
    dndEventEmiter.on('drop', d => {
      refLayout.current?.measure((fx, fy, width, height, px, py) => {
        console.log('#Duy Phan console', d)
        if (
          isDropZone(
            { moveX: d.nX, moveY: d.nY },
            { fx, fy, width, height, px, py },
          )
        ) {
          _onDrop({
            editorPane: editorPaneAsParent,
            tabData: tabsData.getSelectedTabData(),
            ...d,
            px,
            py,
          })
        }
      })
    })
    // refTabs.current?.setState({containerHeight: 500, containerWidth: 600, })
  }, [])

  for (let i = 0; i < tabItems.length; i++) {
    const tabData = tabsData.getTabDataAt(i)
    const widgetDataArray = tabData.getWidgetDatas().getWidgetDataArray()

    const tabId =
      editorPaneAsParent.getPaneId() + '_' + tabData.getTabKeyAsString()

    const tabItem = {
      key: tabData.getTabKeyAsString(),
      title: tabData.getTabLabel(),
      [tabData.getTabKeyAsString()]: {
        children: (
          <EditorTabChildren
            widgetDataArray={widgetDataArray}
            editingScreenGrid={editingScreenGrid}
            tabId={tabId}
            editorPaneAsParent={editorPaneAsParent}
          />
        ),
      },
    }
    tabItems[i] = tabItem
  }

  const tabsCheck = tabItems.map(item => ({ key: item.key, title: item.title }))

  const onDragEnd = ({ from, to }) => {
    tabsData.replaceTabData(from, to)
    editorPaneAsParent.setState({ rerender: true })
  }

  const _onChangeByTabs = selectedKey => {
    tabsData.setSelectedTabKeyAsString(selectedKey)
    editorPaneAsParent.setState({ rerender: true })
  }

  const paneId = props['data-br-container-id']
  const css = props['css']

  useEffect(() => {
    const activeIndex = tabItems.findIndex(item => item.key === activeKey)
    setTimeout(() => {
      refTabs.current?.tabClickGoToTab(activeIndex)
      refTabs.current?.goToTab(activeIndex)
    }, 300)
  }, [])

  useEffect(() => {
    const activeIndex = tabItems.findIndex(item => item.key === activeKey)

    setTimeout(() => {
      refTabs.current?.tabClickGoToTab(activeIndex)
      refTabs.current?.goToTab(activeIndex)
    }, 0)
  }, [JSON.stringify(tabsCheck)])

  const renderT = data =>
    data.map((tab, i) => (
      <View style={{ flex: 1 }} key={tab.key || i}>
        {tab[tab.key].children}
      </View>
    ))

  const renderItem = (info, tabBarProps) => {
    const index = info.getIndex()
    return (
      <ScaleDecorator>
        <TouchableOpacity
          activeOpacity={0.9}
          style={{
            padding: 6,
            borderColor: activeKey === info.item.key ? '#1677ff' : undefined,
            borderBottomWidth: activeKey === info.item.key ? 1 : undefined,
          }}
          onLongPress={info.drag}
          onPress={() => {
            _onTabClick(info.item.key, editorPaneAsParent)
            _onChangeByTabs(info.item.key)
            const { goToTab, onTabClick } = tabBarProps
            onTabClick && onTabClick(tabBarProps.tabs[index], index)
            goToTab && goToTab(index)
            console.log('#Duy Phan console tab111s', index)
          }}
        >
          <Text
            style={{
              color: activeKey === info.item.key ? '#1677ff' : '#333333',
            }}
          >
            {info.item.label}
          </Text>
        </TouchableOpacity>
      </ScaleDecorator>
    )
  }

  const jsx = (
    <View
      style={[{ overflow: 'hidden' }, props.style, css]}
      ref={r => {
        refLayout.current = r
        ref.current = r
      }}
      collapsable={false}
      onLayout={e =>
        refTabs.current?.setState({
          containerWidth: e.nativeEvent.layout.width,
          containerHeight: e.nativeEvent.layout.height,
        })
      }
    >
      <Tabs
        data-br-container-id={paneId}
        ref={refTabs}
        // tabBarTextStyle={css}
        // onMouseDown={ev => {
        //   ev.stopPropagation()
        //   // ev.preventDefault();
        //   editScreenView.setCurrentEditorPaneToState(editorPaneAsParent)
        // }}
        // className={className}
        tabs={tabItems}
        // initialPage={activeKey}
        // page={activeKey}
        swipeable={false}
        // prerenderingSiblingsNumber={0}
        animated={false}
        renderTabBar={tabBarProps => (
          <DraggableFlatList
            data={tabItems.map(item => ({
              key: item.key,
              label: item.title,
              width: 100,
              height: 40,
            }))}
            keyExtractor={item => item.key}
            renderItem={info => renderItem(info, tabBarProps)}
            horizontal
            onDragEnd={onDragEnd}
          />
        )}
      >
        {renderT(tabItems)}
      </Tabs>
    </View>
  )
  return jsx
})
