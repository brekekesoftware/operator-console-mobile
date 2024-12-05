import { Tabs } from '@ant-design/react-native'
import type { TabData } from '@ant-design/react-native/lib/tabs/PropsType'
import { ScrollView, Text, TouchableOpacity } from 'react-native'
import DragList from 'react-native-draglist'

import { GridLines } from '../common/GridLines'
import { EditorWidgetFactory } from './widget/editor/EditorWidgetFactory'
import { EditorWidgetTemplateFactory } from './widget/template/EditorWidgetTemplateFactory'

const _onTabClick = (tabKey, mouseEvent, editorPaneAsParent) => {
  const pane = editorPaneAsParent
  const paneId = pane.getPaneId()
  pane.onTabClickByEditorTabFunctionComponent(tabKey, mouseEvent)
}

const _onDragOver = function (ev) {
  ev.preventDefault()
  // ev.target.style.cursor = 'grabbing';
}

const _onDragEnter = function (ev) {
  ev.preventDefault()
  // ev.dataTransfer.dropEffect = "grabbing";
}

const _onDrop = function (ev, editorPane, tabData, tabId) {
  ev.preventDefault()
  ev.stopPropagation()
  // const e = ev.target;
  const sWidgetTypeId = ev.dataTransfer.getData('editorWidgetTypeId')
  if (!sWidgetTypeId) {
    return
  }
  // const paneData = this.props["paneData"];
  const widgetTypeId = parseInt(sWidgetTypeId)
  const editorWidgetTemplate =
    EditorWidgetTemplateFactory.getStaticEditorWidgetSettingsFactoryInstance().getEditorWidgetTemplateByWidgetTypeId(
      widgetTypeId,
    )
  const widgetWidth = editorWidgetTemplate.getWidth()
  const widgetHeight = editorWidgetTemplate.getHeight()

  const offsetX = parseInt(ev.dataTransfer.getData('offsetX'))
  const offsetY = parseInt(ev.dataTransfer.getData('offsetY'))
  const eTabRoot = document.querySelector('[data-broc-tab-id="' + tabId + '"]')
  const boundingRect = eTabRoot.getBoundingClientRect()
  const editingScreenGrid = editorPane
    .getEditScreenView()
    .getEditingScreenGrid()

  let widgetRelativePositionX = ev.clientX - boundingRect.left - offsetX
  let widgetRelativePositionY = ev.clientY - boundingRect.top - offsetY

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

export const EditorTabFunctionComponent = props => {
  const editorPaneAsParent = props['editorPaneAsParent']
  const tabsData = props['tabsData']

  // css["position"] = "relative";

  const tabItems = new Array(tabsData.getTabDataCount())
  const editScreenView = editorPaneAsParent.getEditScreenView()
  const editingScreenGrid = editScreenView.getEditingScreenGrid()
  for (let i = 0; i < tabItems.length; i++) {
    const tabData = tabsData.getTabDataAt(i)
    const widgetDataArray = tabData.getWidgetDatas().getWidgetDataArray()

    const tabId =
      editorPaneAsParent.getPaneId() + '_' + tabData.getTabKeyAsString()

    const tabChildren = (
      <GridLines
        data-broc-tab-id={tabId}
        style={{ width: '100%', height: '100%', position: 'relative' }}
        strokeWidth={2}
        cellWidth={editingScreenGrid * 10}
        cellWidth2={editingScreenGrid}
        cellHeight={editingScreenGrid * 10}
        cellHeight2={editingScreenGrid}
        // onDragEnter={ev => _onDragEnter(ev)}
        onDragOver={ev => {
          _onDragOver(ev)
        }}
        onDrop={ev => _onDrop(ev, editorPaneAsParent, tabData, tabId)}
      >
        <ScrollView>
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
      editorPaneAsParent.setState({ rerender: true })
    }
  }

  const _onChangeByTabs = selectedKey => {
    tabsData.setSelectedTabKeyAsString(selectedKey)
    editorPaneAsParent.setState({ rerender: true })
  }

  const activeKey = tabsData.getSelectedTabKeyAsString()
  const className = props['className'] + ' overflowAuto'
  const paneId = props['data-br-container-id']
  const css = props['css']
  const jsx = (
    <Tabs
      data-br-container-id={paneId}
      tabBarTextStyle={css}
      // onMouseDown={ev => {
      //   ev.stopPropagation()
      //   // ev.preventDefault();
      //   editScreenView.setCurrentEditorPaneToState(editorPaneAsParent)
      // }}
      // className={className}
      onChange={selectedKey => _onChangeByTabs(selectedKey)}
      onTabClick={(tabKey, mouseEvent) => {
        _onTabClick(tabKey, mouseEvent, editorPaneAsParent)
      }}
      tabs={tabItems}
      renderTabBar={tabBarProps => (
        <DragList<TabData>
          data={tabBarProps.tabs}
          keyExtractor={(_, i) => i.toString()}
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
      {tabItems.map(tab => tab.tabChildren)}
    </Tabs>
  )
  return jsx
}
