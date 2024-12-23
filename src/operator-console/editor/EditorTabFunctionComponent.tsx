import { Tabs } from '@ant-design/react-native'
import type { TabData } from '@ant-design/react-native/lib/tabs/PropsType'
import type {
  DraggableStackProps,
  ObjectWithId,
} from '@mgcrea/react-native-dnd'
import {
  DndProvider,
  Draggable,
  DraggableStack,
} from '@mgcrea/react-native-dnd'
import { useEffect, useRef } from 'react'
import type { LayoutRectangle } from 'react-native'
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import DragList from 'react-native-draglist'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { GridLines } from '../common/GridLines'
import { dndEventEmiter } from '../lib/rnd/DndEventEmiter'
import { EditorWidgetFactory } from './widget/editor/EditorWidgetFactory'
import { EditorWidgetTemplateFactory } from './widget/template/EditorWidgetTemplateFactory'

const _onTabClick = (tabKey, editorPaneAsParent) => {
  const pane = editorPaneAsParent
  const paneId = pane.getPaneId()
  pane.onTabClickByEditorTabFunctionComponent(tabKey)
}

const isDropZone = (gesture, dz) => {
  if (dz) {
    return (
      gesture.moveX > dz.x + 240 &&
      gesture.moveX < dz.x + dz.width + 240 &&
      gesture.moveY < dz.y + dz.height + 55
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
  tabId,
  dz,
}) {
  const sWidgetTypeId = editorWidgetTypeId
  if (!sWidgetTypeId || !isDropZone({ moveX: offsetX, moveY: offsetY }, dz)) {
    return
  }
  const widgetTypeId = parseInt(sWidgetTypeId)
  const editorWidgetTemplate =
    EditorWidgetTemplateFactory.getStaticEditorWidgetSettingsFactoryInstance().getEditorWidgetTemplateByWidgetTypeId(
      widgetTypeId,
    )
  const widgetWidth = editorWidgetTemplate.getWidth()
  const widgetHeight = editorWidgetTemplate.getHeight()

  const editingScreenGrid = editorPane
    .getEditScreenView()
    .getEditingScreenGrid()

  let widgetRelativePositionX = offsetX - 240
  let widgetRelativePositionY = offsetY - 46

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
  tabData,
  activeKey,
  tabKey,
}) => {
  const refLayout = useRef<LayoutRectangle | null>(null)
  console.log('#Duy Phan console activeKey', activeKey, tabKey)

  // useEffect(() => {
  //   console.log('#Duy Phan console dddd', Date.now())
  //   dndEventEmiter.on('drop', d => {

  //     if (activeKey === tabKey) {
  //       _onDrop({
  //         editorPane: editorPaneAsParent,
  //         tabData,
  //         tabId,
  //         dz: refLayout.current,
  //         ...d,
  //       })
  //     }
  //   })
  // }, [])

  return (
    <View
      style={{ flex: 1 }}
      onLayout={e => (refLayout.current = e.nativeEvent.layout)}
    >
      <TouchableWithoutFeedback style={{ flex: 1 }}>
        <GridLines
          data-broc-tab-id={tabId}
          style={{ flex: 1 }}
          strokeWidth={2}
          cellWidth={editingScreenGrid * 10}
          cellWidth2={editingScreenGrid}
          cellHeight={editingScreenGrid * 10}
          cellHeight2={editingScreenGrid}
        >
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
            {widgetDataArray.map((widgetData, index) => {
              const options = {
                editorPane: editorPaneAsParent,
                widgetData: widgetDataArray[index],
                jsxKey: index,
              }
              const widgetJsx =
                EditorWidgetFactory.getStaticEditorWidgetFactoryInstance().getEditorWidgetJsx(
                  options,
                )
              return widgetJsx
            })}
          </ScrollView>
        </GridLines>
      </TouchableWithoutFeedback>
    </View>
  )
}

export const EditorTabFunctionComponent = props => {
  const editorPaneAsParent = props['editorPaneAsParent']
  const tabsData = props['tabsData']

  const refLayout = useRef<LayoutRectangle | null>(null)

  // css["position"] = "relative";

  const tabItems = new Array(tabsData.getTabDataCount())
  const editScreenView = editorPaneAsParent.getEditScreenView()
  const activeKey = tabsData.getSelectedTabKeyAsString()
  const editingScreenGrid = editScreenView.getEditingScreenGrid()

  useEffect(() => {
    dndEventEmiter.on('drop', d => {
      _onDrop({
        editorPane: editorPaneAsParent,
        tabData: tabsData.getSelectedTabData(),
        dz: refLayout.current,
        ...d,
      })
    })
  }, [])

  for (let i = 0; i < tabItems.length; i++) {
    const tabData = tabsData.getTabDataAt(i)
    const widgetDataArray = tabData.getWidgetDatas().getWidgetDataArray()

    const tabId =
      editorPaneAsParent.getPaneId() + '_' + tabData.getTabKeyAsString()

    const tabItem = {
      key: tabData.getTabKeyAsString(),
      title: tabData.getTabLabel(),
      children: (
        <EditorTabChildren
          widgetDataArray={widgetDataArray}
          editingScreenGrid={editingScreenGrid}
          tabData={tabData}
          tabKey={tabData.getTabKeyAsString()}
          tabId={tabId}
          editorPaneAsParent={editorPaneAsParent}
          activeKey={activeKey}
        />
      ),
    }
    tabItems[i] = tabItem
  }

  const onDragEnd = ({ active, over }) => {
    if (!over) {
      return
    }

    if (active.id !== over.id) {
      const activeIndex = tabItems.findIndex(i => i.key === active.id)
      const overIndex = tabItems.findIndex(i => i.key === over?.id)
      tabsData.replaceTabData(activeIndex, overIndex)
      editorPaneAsParent.setState({ rerender: true })
    }
  }

  const _onChangeByTabs = selectedKey => {
    tabsData.setSelectedTabKeyAsString(selectedKey)
    editorPaneAsParent.setState({ rerender: true })
  }

  const className = props['className'] + ' overflowAuto'
  const paneId = props['data-br-container-id']
  const css = props['css']
  console.log('#Duy Phan console css', css)
  const jsx = (
    <View
      style={{ flex: 1, overflow: 'hidden' }}
      onLayout={e => (refLayout.current = e.nativeEvent.layout)}
    >
      <Tabs
        data-br-container-id={paneId}
        // tabBarTextStyle={css}
        // onMouseDown={ev => {
        //   ev.stopPropagation()
        //   // ev.preventDefault();
        //   editScreenView.setCurrentEditorPaneToState(editorPaneAsParent)
        // }}
        // className={className}
        style={{ flex: 1 }}
        tabs={tabItems}
        renderTabBar={tabBarProps => (
          // <DragList<TabData>
          //   data={tabBarProps.tabs}
          //   keyExtractor={(_, i) => i.toString()}
          //   renderItem={(info: any) => {

          //     return <TouchableOpacity
          //     activeOpacity={0.9}
          //     style={{
          //       padding: 6,
          //     }}
          //     onLongPress={info.drag}
          //     onPress={() => {
          //       _onTabClick(info.item.key, editorPaneAsParent)
          //       _onChangeByTabs(info.item.key)
          //     }}
          //     disabled={ activeKey !== info.item.key}
          //   >
          //     <Text
          //       style={{
          //         color: activeKey === info.item.key ? 'green' : '#333333',
          //       }}
          //     >
          //       {info.item.title}
          //     </Text>
          //   </TouchableOpacity>}

          //   }
          //   // horizontal
          //   // onReordered={(f, t) => onDragEnd({ over: f, active: t })}

          // />
          <DndProvider>
            <DraggableStack
              direction='row'
              gap={10}
              // style={styles.stack}
              // onOrderChange={onStackOrderChange}
              // onOrderUpdate={onStackOrderUpdate}
            >
              {tabBarProps.tabs.map((info, i) => (
                <Draggable key={info.key} id={info.key ?? i.toString()}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    key={info.key}
                    style={{
                      padding: 6,
                    }}
                    onLongPress={info.drag}
                    onPress={() => {
                      _onTabClick(info.key, editorPaneAsParent)
                      _onChangeByTabs(info.key)
                      const { goToTab, onTabClick } = tabBarProps
                      // tslint:disable-next-line:no-unused-expression
                      onTabClick && onTabClick(tabBarProps.tabs[i], i)
                      // tslint:disable-next-line:no-unused-expression
                      goToTab && goToTab(i)
                    }}
                  >
                    <Text
                      style={{
                        color: activeKey === info.key ? 'green' : '#333333',
                      }}
                    >
                      {info.title}
                    </Text>
                  </TouchableOpacity>
                </Draggable>
              ))}
            </DraggableStack>
          </DndProvider>
        )}
      >
        {tabItems.map(tab => (
          <View style={{ flex: 1 }} key={tab.key}>
            {tab.children}
          </View>
        ))}
      </Tabs>
    </View>
  )
  return jsx
}
