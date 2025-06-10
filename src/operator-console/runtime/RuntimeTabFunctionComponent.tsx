import { Tabs } from '@ant-design/react-native'
import type { TabData } from '@ant-design/react-native/lib/tabs/PropsType'
import { forwardRef, useCallback, useEffect, useRef } from 'react'
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

import { Util } from '../Util'
import { RuntimeWidgetFactory } from './widget/runtime/RuntimeWidgetFactory'

const _onTabClick = (tabKey, runtimePaneAsParent) => {
  const pane = runtimePaneAsParent
  const paneId = pane.getPaneId()
  pane.onTabClickByRuntimeTabFunctionComponent(tabKey)
}

const RuntimeTabChildren = ({ widgetDataArray, runtimePaneAsParent }) => {
  const refLayout = useRef<View | null>(null)
  const refScroll = useRef<View | HTMLElement | null>(null)

  useEffect(() => {
    const { width: w, height: h } = Util.caculateCanvasSize(widgetDataArray)
    refLayout?.current?.measure((fx, fy, width, height, px, py) => {
      console.log('#Duy Phan console wh12', w, h, width, height)
      if (refScroll.current) {
        if (Platform.OS !== 'web') {
          const el = refScroll.current as View
          el.setNativeProps({
            style: {
              width: w < width ? width : w,
              height: h < height ? height : h,
            },
          })
        } else {
          const el = refScroll.current as HTMLElement
          el.style.width = w < width ? `${width}px` : `${w}px`
          el.style.height = h < height ? `${height}px` : `${h}px`
        }
      }
    })
  })

  return (
    <View style={{ flex: 1 }} ref={refLayout} collapsable={false}>
      <ScrollView horizontal bounces={false}>
        <ScrollView bounces={false}>
          <View ref={refScroll}>
            {widgetDataArray.map((widgetData, index) => {
              const options = {
                runtimePane: runtimePaneAsParent,
                widgetData,
                jsxKey: widgetData._widgetUuid,
              }
              const widgetJsx =
                RuntimeWidgetFactory.getStaticRuntimeWidgetFactoryInstance().getRuntimeWidgetJsx(
                  options,
                )
              return widgetJsx
            })}
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  )
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

  const onDragEnd = ({ from, to }) => {
    tabsData.replaceTabData(from, to)
    tabsData.replaceTabData(to, to)
    runtimePaneAsParent.setState({ rerender: true })
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
      const index = info.getIndex()
      return (
        <ScaleDecorator key={info.item.key}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={{
              padding: 6,
              borderColor: activeKey === info.item.key ? '#1677ff' : undefined,
              borderBottomWidth: activeKey === info.item.key ? 1 : undefined,
            }}
            onLongPress={info.drag}
            onPress={() => {
              _onTabClick(info.item.key, runtimePaneAsParent)
              _onChangeByTabs(info.item.key)

              const { goToTab, onTabClick } = tabBarProps
              // tslint:disable-next-line:no-unused-expression
              onTabClick && onTabClick(tabBarProps.tabs[index], index)
              // tslint:disable-next-line:no-unused-expression
              goToTab && goToTab(index)
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
          <DraggableFlatList
            data={tabItems.map(item => ({
              key: item.key,
              label: item.label,
              height: 40,
              width: 100,
            }))}
            keyExtractor={(_, i) => i.toString()}
            renderItem={(info: any) => renderItem(info, tabBarProps)}
            horizontal
            onDragEnd={onDragEnd}
          />
        )}
      >
        {renderTabs()}
      </Tabs>
    </View>
  )
  return jsx
})
