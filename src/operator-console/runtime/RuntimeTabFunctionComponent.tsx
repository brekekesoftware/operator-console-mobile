import { Tabs } from '@ant-design/react-native'
import type { TabData } from '@ant-design/react-native/lib/tabs/PropsType'
import { forwardRef, useRef } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import DragList from 'react-native-draglist'

import { RuntimeWidgetFactory } from './widget/runtime/RuntimeWidgetFactory'

const _onTabClick = (tabKey, mouseEvent, runtimePaneAsParent) => {
  const pane = runtimePaneAsParent
  const paneId = pane.getPaneId()
  pane.onTabClickByRuntimeTabFunctionComponent(tabKey, mouseEvent)
}

const _onDragOver = function (ev) {
  ev.preventDefault()
  // ev.target.style.cursor = 'grabbing';
}

const _onDragEnter = function (ev) {
  ev.preventDefault()
  // ev.dataTransfer.dropEffect = "grabbing";
}

export const RuntimeTabFunctionComponent = forwardRef((props, ref) => {
  const runtimePaneAsParent = props['runtimePaneAsParent']
  const tabsData = props['tabsData']

  // css["position"] = "relative";
  const refTab = useRef()

  const tabItems = new Array(tabsData.getTabDataCount())
  for (let i = 0; i < tabItems.length; i++) {
    const tabData = tabsData.getTabDataAt(i)
    const widgetDataArray = tabData.getWidgetDatas().getWidgetDataArray()

    const tabId =
      runtimePaneAsParent.getPaneId() + '_' + tabData.getTabKeyAsString()

    const tabChildren = (
      <View data-broc-tab-id={tabId}>
        {widgetDataArray.map((widgetData, index) => {
          const options = {
            runtimePane: runtimePaneAsParent,
            widgetData,
            jsxKey: index,
          }
          const widgetJsx =
            RuntimeWidgetFactory.getStaticRuntimeWidgetFactoryInstance().getRuntimeWidgetJsx(
              options,
            )
          return widgetJsx
        })}
      </View>
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
  const jsx = (
    <View style={css} ref={ref}>
      <Tabs
        data-br-container-id={paneId}
        onChange={selectedKey => _onChangeByTabs(selectedKey)}
        onTabClick={(tabKey, mouseEvent) =>
          _onTabClick(tabKey, mouseEvent, runtimePaneAsParent)
        }
        tabs={tabItems}
        renderTabBar={tabBarProps => (
          <DragList<TabData>
            data={tabBarProps.tabs}
            keyExtractor={(item, i) => i.toString()}
            renderItem={info => (
              <TouchableOpacity
                activeOpacity={0.9}
                style={{
                  padding: 6,
                }}
              >
                <Text
                  style={{
                    color: activeKey === info.index ? 'green' : '#333333',
                  }}
                >
                  {info.item.title}
                </Text>
              </TouchableOpacity>
            )}
            onReordered={(f, t) => onDragEnd({ over: f, active: t })}
          />
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
})
