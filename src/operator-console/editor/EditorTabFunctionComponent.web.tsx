import { Tabs } from '@ant-design/react-native'
import { DndContext, PointerSensor, useSensor } from '@dnd-kit/core'
import {
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { cloneElement, forwardRef, useEffect, useRef } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import { WidgetData } from '../data/widgetData/WidgetData'
import { dndEventEmiter } from '../lib/rnd/DndEventEmiter'
import { EditorTabChildren } from './EditorTabChildren'
import { EditorWidgetTemplateFactory } from './widget/template/EditorWidgetTemplateFactory'

const _onTabClick = (tabKey, editorPaneAsParent) => {
  const pane = editorPaneAsParent
  const paneId = pane.getPaneId()
  pane.onTabClickByEditorTabFunctionComponent(tabKey)
}

const DraggableTabNode = ({ className, ...props }) => {
  console.log('#Duy Phan console key', props.nodeKey)
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props['nodeKey'],
    })
  const style = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: 'move',
  }
  return cloneElement(props.children, {
    ref: setNodeRef,
    style,
    ...attributes,
    ...listeners,
  })
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
            editScreenView={props['editScreenView']}
            paneData={props['paneData']}
          />
        ),
      },
    }
    tabItems[i] = tabItem
  }

  const tabsCheck = tabItems.map(item => ({ key: item.key, title: item.title }))

  const onDragEnd = ({ active, over }) => {
    if (!over) {
      return
    }

    if (active.id !== over.id) {
      const activeIndex = tabItems.findIndex(i => i.key === active.id)
      const overIndex = tabItems.findIndex(i => i.key === over?.id)
      tabsData.replaceTabData(activeIndex, overIndex)
      editorPaneAsParent.setState({ rerender: true })

      // setItems((prev) => {
      //     const activeIndex = prev.findIndex((i) => i.key === active.id);
      //     const overIndex = prev.findIndex((i) => i.key === over?.id);
      //     const arrayMoved = arrayMove(prev, activeIndex, overIndex);
      //     return arrayMoved;
      // });
    }
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
    const index = info.index
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.9}
          style={{
            padding: 6,
            borderColor: activeKey === info.key ? '#1677ff' : undefined,
            borderBottomWidth: activeKey === info.key ? 2 : undefined,
            // minWidth: 120,
          }}
          onPress={() => {
            _onTabClick(info.key, editorPaneAsParent)
            _onChangeByTabs(info.key)
            const { goToTab, onTabClick } = tabBarProps
            onTabClick && onTabClick(tabBarProps.tabs[index], index)
            goToTab && goToTab(index)
            console.log('#Duy Phan console tab111s', index)
          }}
        >
          <Text
            style={{
              color: activeKey === info.key ? '#1677ff' : '#333333',
            }}
          >
            {info.title}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  const sensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  })

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
        tabs={tabItems}
        swipeable={false}
        animated={false}
        renderTabBar={tabBarProps => (
          <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
            <SortableContext
              items={tabItems.map(i => i.key)}
              strategy={horizontalListSortingStrategy}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {tabItems.map((item, index) => (
                  <DraggableTabNode nodeKey={item.key} {...item} key={item.key}>
                    {renderItem({ ...item, index }, tabBarProps)}
                  </DraggableTabNode>
                ))}
              </View>
            </SortableContext>
          </DndContext>
        )}
      >
        {renderT(tabItems)}
      </Tabs>
    </View>
  )
  return jsx
})
