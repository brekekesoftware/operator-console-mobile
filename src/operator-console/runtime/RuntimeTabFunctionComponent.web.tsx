import { Tabs } from '@ant-design/react-native'
import type { TabData } from '@ant-design/react-native/lib/tabs/PropsType'
import { DndContext, PointerSensor, useSensor } from '@dnd-kit/core'
import {
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { cloneElement, forwardRef, useCallback, useEffect, useRef } from 'react'
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist'

import { RuntimeTabChildren } from './RuntimeTabChildren'

const _onTabClick = (tabKey, runtimePaneAsParent) => {
  const pane = runtimePaneAsParent
  const paneId = pane.getPaneId()
  pane.onTabClickByRuntimeTabFunctionComponent(tabKey)
}

const DraggableTabNode = ({ className, ...props }) => {
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

export const RuntimeTabFunctionComponent = forwardRef((props, ref) => {
  const runtimePaneAsParent = props['runtimePaneAsParent']
  const tabsData = props['tabsData']

  // css["position"] = "relative";
  const refTabs = useRef<Tabs | null>(null)

  const tabItems = new Array(tabsData.getTabDataCount())
  for (let i = 0; i < tabItems.length; i++) {
    const tabData = tabsData.getTabDataAt(i)
    const widgetDataArray = tabData.getWidgetDatas().getWidgetDataArray()

    const tabId =
      runtimePaneAsParent.getPaneId() + '_' + tabData.getTabKeyAsString()

    const tabChildren = (
      <RuntimeTabChildren
        widgetDataArray={widgetDataArray}
        runtimePaneAsParent={runtimePaneAsParent}
      />
    )

    const tabItem = {
      key: tabData.getTabKeyAsString(),
      label: tabData.getTabLabel(),
      children: tabChildren,
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
      runtimePaneAsParent.setState({ rerender: true })
    }
  }

  const _onChangeByTabs = selectedKey => {
    tabsData.setSelectedTabKeyAsString(selectedKey)
    runtimePaneAsParent.setState({ rerender: true })
  }

  const activeKey = tabsData.getSelectedTabKeyAsString()
  const className = props['className'] + ' overflowAuto'
  const paneId = props['data-br-container-id']
  const css = props['css']
  const tabsCheck = tabItems.map(item => ({ key: item.key, title: item.title }))

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

  const renderItem = useCallback(
    (info, tabBarProps) => {
      const index = info.index
      return (
        <View key={info.key}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={{
              padding: 6,
              borderColor: activeKey === info.key ? '#1677ff' : undefined,
              borderBottomWidth: activeKey === info.key ? 2 : undefined,
            }}
            onPress={() => {
              _onTabClick(info.key, runtimePaneAsParent)
              _onChangeByTabs(info.key)

              const { goToTab, onTabClick } = tabBarProps
              // tslint:disable-next-line:no-unused-expression
              onTabClick && onTabClick(tabBarProps.tabs[index], index)
              // tslint:disable-next-line:no-unused-expression
              goToTab && goToTab(index)
            }}
          >
            <Text
              style={{
                color: activeKey === info.key ? '#1677ff' : '#333333',
              }}
            >
              {info.label}
            </Text>
          </TouchableOpacity>
        </View>
      )
    },
    [activeKey],
  )

  const renderTabs = useCallback(
    () =>
      tabItems.map(tab => (
        <View style={{ flex: 1 }} key={tab.key}>
          {tab.children}
        </View>
      )),
    [],
  )
  const sensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  })

  const jsx = (
    <View style={css} ref={ref}>
      <Tabs
        data-br-container-id={paneId}
        ref={refTabs}
        animated={false}
        // onChange={selectedKey => _onChangeByTabs(selectedKey)}
        tabs={tabItems}
        initialPage={activeKey}
        swipeable={false}
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
        {renderTabs()}
      </Tabs>
    </View>
  )
  return jsx
})
