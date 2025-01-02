import React, { createRef } from 'react'
import type { ImageSourcePropType } from 'react-native'
import { Dimensions, Image, Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import logo from '../logo.png'

import { Button } from '../common/Button'
import { ColorPicker } from '../common/ColorPicker'
import { DropdownOverlay } from '../common/DropdownOverlay'
import { Input } from '../common/Input'
import { InputNumber } from '../common/InputNumber'
import { Notification } from '../common/Notification'
import { Popconfirm } from '../common/Popconfirm'
import { Select, SelectOption } from '../common/Select'
import { Space } from '../common/Space'
import { BaseDividerData } from '../data/BaseDividerData'
import { i18n } from '../i18n'
import type { BrekekeOperatorConsole } from '../OperatorConsole'
import { brOcDisplayStates } from '../OperatorConsole'
import { ColorPaneContextProvider } from './ColorPaneContext'
import { EditorDivider } from './EditorDivider'
import { EditorHandlerTap } from './EditorHandlerTab'
import { EditorPane } from './EditorPane'
import { EditorRootPane } from './EditorRootPane'
import { EditorWidgetSettingsFactory } from './widget/settings/EditorWidgetSettingsFactory'
import { EditorWidgetTemplateFactory } from './widget/template/EditorWidgetTemplateFactory'

const _TABS_SELECT_OPTIONS = Object.freeze({
  disable: false,
  enable: true,
})

const _PROPERTIES_MODE = Object.freeze({
  none: -1,
  pane: 0,
  divider: 1,
  tab: 2,
  widget: 3,
})

type Props = {
  operatorConsoleAsParent: BrekekeOperatorConsole
  screenData: any
}

type State = {
  settingsContainerOrDivider: EditorPane | null
  propertiesMode: number
  selectingEditorWidgetData: any
  rerender?: boolean
}

export class EditScreenView extends React.Component<Props, State> {
  _OperatorConsoleAsParent: BrekekeOperatorConsole
  _ScreenData
  _RootPaneData
  refTabLabel
  constructor(props) {
    super(props)
    this._OperatorConsoleAsParent = props['operatorConsoleAsParent']
    this.refTabLabel = createRef()
    this.state = {
      settingsContainerOrDivider: null,
      propertiesMode: _PROPERTIES_MODE.none,
      selectingEditorWidgetData: null,
    }
    this._ScreenData = props['screenData']
    const rootPaneData = this._ScreenData
      .getScreenPaneDatas()
      .getOrAddRootPaneData()
    this._RootPaneData = rootPaneData
    // const rootPaneData = this._OperatorConsoleAsParent.getOperatorConsoleData().getScreenData().addPaneData();
    // this._RootPaneData = rootPaneData;
  }

  getOperatorConsoleAsParent() {
    return this._OperatorConsoleAsParent
  }

  getEditingScreenGrid() {
    return this._ScreenData.getEditingScreenGrid()
  }

  setEditingScreenGrid(editingScreenGrid) {
    this._ScreenData.setEditingScreenGrid(editingScreenGrid)
    this.setState({ rerender: true })
  }

  setScreenBackgroundColor = color => {
    console.log('#Duy Phan console color', color)
    this._ScreenData.setScreenBackgroundColor(color.hex)
    this.setState({ rerender: true })
  }

  setScreenForegroundColor = color => {
    this._ScreenData.setScreenForegroundColor(color.hex)
    this.setState({ rerender: true })
  }

  getScreenData() {
    return this._ScreenData
  }

  setSelectingEditorWidgetDataToState(
    selectingEditorWidgetData,
    onSetStateFunc,
  ) {
    this.setState(
      { selectingEditorWidgetData, propertiesMode: _PROPERTIES_MODE.widget },
      onSetStateFunc,
    )
  }

  _abortEditingScreen() {
    this._OperatorConsoleAsParent.setDisplayState(
      brOcDisplayStates.showScreen_ver2,
    )
  }

  _saveEditingScreen() {
    this._OperatorConsoleAsParent.saveEditingScreen_ver2()
  }

  onMouseDownEditorPaneInSettingsMode(id) {
    const containerId = String(id)
    if (!containerId) {
      // drag editor widget
      return
    }
    const container = EditorPane.getEditorPaneByContainerId(containerId)
    this.setCurrentEditorPaneToState(container)
  }

  setCurrentEditorPaneToState(editorPane) {
    this.setState({
      settingsContainerOrDivider: editorPane,
      propertiesMode: _PROPERTIES_MODE.pane,
    })
  }

  onClickByEditorDivider(dividerId) {
    const editorDivider = EditorDivider.getEditorDividerByContainerId(dividerId)
    this.setState({
      settingsContainerOrDivider: editorDivider,
      propertiesMode: _PROPERTIES_MODE.divider,
    })
  }

  _splitVertically() {
    const parentContainer = this.state.settingsContainerOrDivider
    parentContainer?.setDivider(BaseDividerData.DIVIDER_DIRECTIONS.vertical)
    this.setState({
      settingsContainerOrDivider: null,
      propertiesMode: _PROPERTIES_MODE.none,
    })
  }

  _splitHorizontally() {
    const parentContainer = this.state.settingsContainerOrDivider
    parentContainer?.setDivider(BaseDividerData.DIVIDER_DIRECTIONS.horizontal)
    this.setState({
      settingsContainerOrDivider: null,
      propertiesMode: _PROPERTIES_MODE.none,
    })
  }

  _removeSplitter() {
    const editorDivider = this.state.settingsContainerOrDivider

    editorDivider?.removeEditorDivider(() => {
      this.setState({
        settingsContainerOrDivider: null,
        propertiesMode: _PROPERTIES_MODE.none,
      })
    })
  }

  onTabClickByEditorPanel(editorPanelAsCaller, tabKey) {
    editorPanelAsCaller.setEditorPanezSelectedTabKeyAsString(tabKey)
    // this.setState({menuMode:_MENU_MODES.tab});
    this.setState({
      settingsContainerOrDivider: editorPanelAsCaller,
      propertiesMode: _PROPERTIES_MODE.tab,
    })
  }

  _onChangeTabsEnable(value) {
    const currentEditingPane = this.state.settingsContainerOrDivider
    const b = value === 'true'
    currentEditingPane?.setEditorPanezEnableTabs(b)
    this.setState({ rerender: true })
  }

  _onClickAddTab = tabLabel => {
    if (tabLabel.length === 0) {
      Notification.warning({ message: i18n.t('tabLabelIsEmpty') })
      return
    }
    const currentEditingPane = this.state.settingsContainerOrDivider

    const tabsData = currentEditingPane?.getEditingPaneData().getTabsData()
    const insertedTabData = tabsData.insertTab(tabLabel)
    const tabKeyAsInt = insertedTabData.getTabKeyAsInt()
    tabsData.setSelectedTabKeyAsInt(tabKeyAsInt)

    this.setState({ rerender: true })
  }

  _onClickRenameTab = tabLabel => {
    if (tabLabel.length === 0) {
      Notification.warning({ message: i18n.t('tabLabelIsEmpty') })
      return
    }
    const currentEditingPane = this.state.settingsContainerOrDivider
    const tabsData = currentEditingPane?.getEditingPaneData().getTabsData()
    const tabData = tabsData.getSelectedTabData()
    tabData.setTabLabel(tabLabel)
    this.setState({ rerender: true })
  }

  onConfirmOkRemoveEditorWidget(editorWidgetData) {
    const widgetDatas = editorWidgetData.getWidgetDatasAsParent()
    const b = widgetDatas.removeWidgetDataByWidgetData(editorWidgetData)
    if (b !== true) {
      throw new Error('Remove EditorWidget failed.')
    }
    this.setState({
      settingsContainerOrDivider: null,
      propertiesMode: _PROPERTIES_MODE.none,
    })
  }

  _onClickRemoveTab = () => {
    const currentEditingPane = this.state.settingsContainerOrDivider
    const tabsData = currentEditingPane?.getEditingPaneData().getTabsData()
    if (tabsData.getTabDataCount() === 1) {
      console.log('#Duy Phan console warn')
      Notification.warning({ message: i18n.t('youCanNotRemoveLastTab') })
      return
    }

    tabsData.removeSelectedTabData()
    console.log('#Duy Phan console removed')
    this.setState({ rerender: true })
  }

  _getWidgetTemplatesAreaJsx() {
    const widgetTemplateArray =
      EditorWidgetTemplateFactory.getStaticEditorWidgetSettingsFactoryInstance().getEditorWidgetTemplateArray()

    return (
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {widgetTemplateArray.map((widgetTemplate, index) =>
          widgetTemplate.getRenderJsx(index, this),
        )}
      </View>
    )
  }

  _getSettingsAreaJsx() {
    let jsx

    switch (this.state.propertiesMode) {
      case _PROPERTIES_MODE.pane: {
        const currentEditingPane = this.state.settingsContainerOrDivider
        const enableTabs = currentEditingPane?.getEditorPanezEnableTabs()
        jsx = (
          <>
            <View>
              <Text>{i18n.t('Tabs')}:</Text>
              <View>
                <Select
                  name='enableTabs'
                  onSelect={item => this._onChangeTabsEnable(item.value)}
                  defaultValue={enableTabs.toString()}
                  data={[
                    {
                      title: i18n.t('Disable'),
                      value: _TABS_SELECT_OPTIONS.disable.toString(),
                    },
                    {
                      title: i18n.t('Enable'),
                      value: _TABS_SELECT_OPTIONS.enable.toString(),
                    },
                  ]}
                ></Select>
              </View>
            </View>
            <View>
              <Text>{i18n.t('Area')}:</Text>
              <View>
                <Button
                  style={{ width: '100%' }}
                  onPress={() => {
                    this._splitVertically()
                  }}
                >
                  {i18n.t('splitVertically')}
                </Button>
              </View>
              <View>
                <Button
                  style={{ width: '100%' }}
                  onPress={() => {
                    this._splitHorizontally()
                  }}
                >
                  {i18n.t('splitHorizontally')}
                </Button>
              </View>
            </View>
          </>
        )
        break
      }
      case _PROPERTIES_MODE.divider: {
        jsx = (
          <Popconfirm
            title={i18n.t('confirmRemoveSplitter')}
            onConfirm={() => this._removeSplitter()}
            okText={i18n.t('yes')}
            cancelText={i18n.t('no')}
          >
            <Button disabled>{i18n.t('removeSplitter')}</Button>
          </Popconfirm>
        )
        break
      }
      case _PROPERTIES_MODE.tab: {
        jsx = (
          <EditorHandlerTap
            _onClickAddTab={this._onClickAddTab}
            _onClickRemoveTab={this._onClickRemoveTab}
            _onClickRenameTab={this._onClickRenameTab}
          />
        )
        break
      }
      case _PROPERTIES_MODE.widget: {
        const widgetData = this.state.selectingEditorWidgetData
        jsx =
          EditorWidgetSettingsFactory.getStaticEditorWidgetSettingsFactoryInstance().getRenderJsx(
            this,
            widgetData,
          )
        break
      }
      default: {
        jsx = (
          <Text>
            {i18n.t(
              'Click_on_any_area_or_splitter_or_widget_or_tab_on_the_left',
            )}
          </Text>
        )
        break
      }
    }
    return jsx
  }

  render() {
    const settingsAreaJsx = this._getSettingsAreaJsx()
    return (
      <GestureHandlerRootView>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            height: '100%',
          }}
        >
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              height: 47,
              flexDirection: 'row',
            }}
          >
            <View style={{ width: 240 }}>
              <Image
                style={{ marginTop: 4, marginLeft: 4 }}
                source={logo as ImageSourcePropType}
              />
            </View>
            <Space style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 14 }}>{i18n.t('grid')} : </Text>
                <InputNumber
                  value={this.getEditingScreenGrid()}
                  style={{ width: 120 }}
                  // onPressEnter={e =>
                  //   this.setEditingScreenGrid(parseInt(e.target.value))
                  // }
                  onStep={v => this.setEditingScreenGrid(v)}
                />
              </View>
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
              >
                <Text style={{ fontSize: 14 }}>{i18n.t('foreground')}: </Text>
                <DropdownOverlay
                  overlay={
                    <ColorPicker
                      color={this._ScreenData.getScreenForegroundColor()}
                      onColorChangeComplete={this.setScreenForegroundColor}
                      isDefault
                      type='hex'
                    />
                  }
                >
                  <View
                    style={{
                      width: 48,
                      height: 30,
                      borderColor: ' #e0e0e0',
                      borderStyle: 'solid',
                      borderWidth: 1,
                      backgroundColor:
                        this._ScreenData.getScreenForegroundColor(),
                    }}
                  ></View>
                </DropdownOverlay>
              </View>
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
              >
                <Text style={{ fontSize: 14 }}>{i18n.t('background')}: </Text>
                <DropdownOverlay
                  overlay={
                    <ColorPicker
                      color={this._ScreenData.getScreenBackgroundColor()}
                      onColorChangeComplete={this.setScreenBackgroundColor}
                      isDefault
                      type='hex'
                    />
                  }
                >
                  <View
                    style={{
                      width: 48,
                      height: 30,
                      borderColor: ' #e0e0e0',
                      borderStyle: 'solid',
                      borderWidth: 1,
                      backgroundColor:
                        this._ScreenData.getScreenBackgroundColor(),
                    }}
                  ></View>
                </DropdownOverlay>
              </View>
            </Space>
            <View style={{ marginLeft: 'auto', marginRight: 4 }}>
              <Space>
                <Popconfirm
                  title={i18n.t('are_you_sure')}
                  onConfirm={() => this._abortEditingScreen()}
                  okText={i18n.t('yes')}
                  cancelText={i18n.t('no')}
                >
                  <Button type='secondary' style={{ minWidth: 80 }} disabled>
                    {i18n.t('discard')}
                  </Button>
                </Popconfirm>
                <Space size={0} />
                <Button
                  type='success'
                  style={{ minWidth: 80 }}
                  onPress={() => this._saveEditingScreen()}
                >
                  {i18n.t('save')}
                </Button>
              </Space>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              height: Dimensions.get('screen').height - 47,
              flexDirection: 'row',
            }}
          >
            <View style={{ width: 240 }}>
              {/* left -  widget templates area*/}
              {this._getWidgetTemplatesAreaJsx()}
            </View>
            <View style={{ flex: 1 }}>
              <ColorPaneContextProvider
                fg={this._ScreenData.getScreenForegroundColor()}
                bg={this._ScreenData.getScreenBackgroundColor()}
              >
                <EditorRootPane
                  paneData={this._RootPaneData}
                  editScreenViewAsParent={this}
                  foregroundColor={this._ScreenData.getScreenForegroundColor()}
                  backgroundColor={this._ScreenData.getScreenBackgroundColor()}
                />
              </ColorPaneContextProvider>
            </View>
            <View
              style={{
                width: 260,
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                margin: 4,
                height: '100%',
                // backgroundColor: 'white'
              }}
            >
              {settingsAreaJsx}
            </View>
          </View>
        </View>
      </GestureHandlerRootView>
    )
  }
}
