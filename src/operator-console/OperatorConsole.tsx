import { ActivityIndicator, Provider, Tabs } from '@ant-design/react-native'
import { library as FontAwesomeLibrary } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { cloneDeep } from 'lodash'
import React from 'react'
import ReactDOM from 'react-dom/client'
import type { ImageSourcePropType } from 'react-native'
import { Dimensions, Image, Text, View } from 'react-native'
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown'

import logo from './logo.png'

import { RnAsyncStorage } from '../components/Rn'
import { ACallInfo } from './call/ACallInfo'
import { CallHistory } from './call/CallHistory'
import { CallHistory2 } from './call/CallHistory2'
import { CallPanel } from './call/CallPanel'
import { LegacyCallPanelSettings } from './call/LegacyCallPanelSettings'
import { PalPhoneClient } from './call/PalPhoneClient'
import { PalRestApi } from './call/PalRestApi'
import { WebphonePhoneClient } from './call/WebphonePhoneClient'
import { Button } from './common/Button'
import { ColorPicker } from './common/ColorPicker'
import { DropdownOverlay } from './common/DropdownOverlay'
import { Empty } from './common/Empty'
import { GridLines } from './common/GridLines'
import { InputNumber } from './common/InputNumber'
import { Modal } from './common/Modal'
import { Notification } from './common/Notification'
import { Popconfirm } from './common/Popconfirm'
import { Space } from './common/Space'
import { Cell, Table, TableWrapper } from './common/Table'
import { PaneData } from './data/PaneData'
import { ScreenData } from './data/ScreenData'
import { WidgetData } from './data/widgetData/WidgetData'
import { DropDownMenu } from './dropdown-menu/DropDownMenu'
import { EditScreenView } from './editor/EditScreenView'
import { BrekekeOperatorConsoleEx } from './extension/BrekekeOperatorConsoleEx'
import { ExtensionsStatus } from './extension/ExtensionsStatus'
import { ExtensionTableSettings } from './extension/ExtensionTableSettings'
import { FileInfosLoader } from './file/FileInfosLoader'
import { DEFAULT_LOCALE, i18n, isValidLocale } from './i18n'
import { LegacyAlarmButton } from './legacy/LegacyAlarmButton'
import { LegacyAutoDialButton } from './legacy/LegacyAutoDialButton'
import { LegacyAvailableButton } from './legacy/LegacyAvailableButton'
import { LegacyBackspaceButton } from './legacy/LegacyBackspaceButton'
import { LegacyButtonSettings } from './legacy/LegacyButtonSettings'
import { LegacyCallbackButton } from './legacy/LegacyCallbackButton'
import { LegacyCallTalkingButton } from './legacy/LegacyCallTalkingButton'
import { LegacyDummyButton } from './legacy/LegacyDummyButton'
import { LegacyExtensionStatus } from './legacy/LegacyExtensionStatus'
import { LegacyExtensionStatusSettings } from './legacy/LegacyExtensionStatusSettings'
import { LegacyHangUpCallButton } from './legacy/LegacyHangUpCallButton'
import { LegacyHoldCallButton } from './legacy/LegacyHoldCallButton'
import { LegacyIncomingCallButton } from './legacy/LegacyIncomingCallButton'
import { LegacyKeypadButton } from './legacy/LegacyKeypadButton'
import { LegacyLeavingSeatButton } from './legacy/LegacyLeavingSeatButton'
import { LegacyLineButton } from './legacy/LegacyLineButton'
import { LegacyMakeCallButton } from './legacy/LegacyMakeCallButton'
import { LegacyMonitorDialingExtensionButton } from './legacy/LegacyMonitorDialingExtensionButton'
import { LegacyMonitoringCallButton } from './legacy/LegacyMonitoringCallButton'
import { LegacyNextCallButton } from './legacy/LegacyNextCallButton'
import { LegacyNightTimeButton } from './legacy/LegacyNightTimeButton'
import { LegacyNoAnswerButton } from './legacy/LegacyNoAnswerButton'
import { LegacyOneTouchDialButton } from './legacy/LegacyOneTouchDialButton'
import { LegacyOutgoingCallButton } from './legacy/LegacyOutgoingCallButton'
import { LegacyParkCallButton } from './legacy/LegacyParkCallButton'
import { LegacyPickUpCallButton } from './legacy/LegacyPickUpCallButton'
import { LegacyPrevCallButton } from './legacy/LegacyPrevCallButton'
import { LegacyQuickCallButton } from './legacy/LegacyQuickCallButton'
import { LegacySeriesSetButton } from './legacy/LegacySeriesSetButton'
import { LegacyStartButton } from './legacy/LegacyStartButton'
import { LegacyStationLineDesignationButton } from './legacy/LegacyStationLineDesignationButton'
import { LegacyThreeWayCallButton } from './legacy/LegacyThreeWayCallButton'
import { LegacyToggleMutedButton } from './legacy/LegacyToggleMutedButton'
import { LegacyToggleRecordingButton } from './legacy/LegacyToggleRecordingButton'
import { LegacyTransferButton } from './legacy/LegacyTransferButton'
import { LegacyUnholdCallButton } from './legacy/LegacyUnholdCallButton'
import { PalWrapper } from './lib/PalWrapper'
import { Rnd } from './lib/rnd/Rnd'
import { Login } from './login/Login'
import { Note } from './note/Note'
import { NotePreview } from './note/NotePreview'
import { NoteSettings } from './note/NoteSettings'
import type { LoginParams, OptionsInitSystem } from './octypes'
import { ShowScreenView_ver2 } from './runtime/ShowScreenView_ver2'
import { Campon } from './system/Campon'
import { NoScreensView } from './system/NoScreensView'
import { SystemSettingsData } from './system/SystemSettingsData'
import { SystemSettingsView } from './system/SystemSettingsView'
import { CallTable } from './table/CallTable'
import { CallTableSettings } from './table/CallTableSettings'
import { ExtensionTable } from './table/ExtensionTable'
import { LineTable } from './table/LineTable'
import { LineTableSettings } from './table/LineTableSettings'
import { TextSettings } from './text/TextSettings'
import { TextWidget } from './text/TextWidget'
import { LegacyUccacWidgetSettings } from './uc/LegacyUccacWidgetSettings'
import { UccacWidget } from './uc/UccacWidget'
import { UccacWrapper } from './uc/UccacWrapper'
import { Util } from './Util'

FontAwesomeLibrary.add(fas, far, fab)
const PBX_APP_DATA_NAME = 'operator_console'
// const PBX_APP_DATA_VERSION = '0.1';
const PBX_APP_DATA_VERSION = '2.0.0'
// const WIDGET_LEFT_SPACE_FOR_IMPORT_FROM_VER_0_1 = 10;
// const WIDGET_TOP_SPACE_FOR_IMPORT_FROM_VER_0_1 = 0;
const VERSION = '2.1.3'
export const brOcDisplayStates = Object.freeze({
  // loading: 0,
  showScreen: 1,
  editingScreen: 2,
  waitQuickCallKey: 3,
  systemSettingsView: 4,
  noScreens: 5,
  editingScreen_ver2: 6,
  showScreen_ver2: 7,
  waitQuickCallKey_ver2: 8,
})

const LegacyCallPanel = ({
  operatorConsoleAsParent,
  borderRadius,
  callpanelBgColor,
  callpanelFgColor,
  outsideShadow_horizontalOffset,
  outsideShadow_verticalOffset,
  outsideShadow_blur,
  outsideShadow_spread,
  outsideShadow_color,
  insideShadow_horizontalOffset,
  insideShadow_verticalOffset,
  insideShadow_blur,
  insideShadow_spread,
  insideShadow_color,
  context,
}) => {
  // const { currentCallIndex, callIds = [], callById = {}, dialing  } = context;
  const dialing = !!context ? context.dialing : undefined
  // const currentCall = callById[callIds[currentCallIndex]];
  const currentCallInfo = operatorConsoleAsParent
    .getPhoneClient()
    .getCallInfos()
    .getCurrentCallInfo()
  return (
    <CallPanel
      operatorConsoleAsParent={operatorConsoleAsParent}
      currentCallInfo={currentCallInfo}
      dialing={dialing}
      borderRadius={borderRadius}
      callpanelBgColor={callpanelBgColor}
      callpanelFgColor={callpanelFgColor}
      outsideShadow_horizontalOffset={outsideShadow_horizontalOffset}
      outsideShadow_verticalOffset={outsideShadow_verticalOffset}
      outsideShadow_blur={outsideShadow_blur}
      outsideShadow_spread={outsideShadow_spread}
      outsideShadow_color={outsideShadow_color}
      insideShadow_horizontalOffset={insideShadow_horizontalOffset}
      insideShadow_verticalOffset={insideShadow_verticalOffset}
      insideShadow_blur={insideShadow_blur}
      insideShadow_spread={insideShadow_spread}
      insideShadow_color={insideShadow_color}
      isEditMode={!context}
    />
  )
}
const LegacyUccacWidget = ({
  operatorConsoleAsParent,
  uccacWrapper,
  borderRadius,
  uccacwidgetBgColor,
  uccacwidgetFgColor,
  outsideShadow_horizontalOffset,
  outsideShadow_verticalOffset,
  outsideShadow_blur,
  outsideShadow_spread,
  outsideShadow_color,
  insideShadow_horizontalOffset,
  insideShadow_verticalOffset,
  insideShadow_blur,
  insideShadow_spread,
  insideShadow_color,
  context,
}) => (
  <UccacWidget
    operatorConsoleAsParent={operatorConsoleAsParent}
    uccacWrapper={uccacWrapper}
    borderRadius={borderRadius}
    uccacwidgetBgColor={uccacwidgetBgColor}
    uccacwidgetFgColor={uccacwidgetFgColor}
    outsideShadow_horizontalOffset={outsideShadow_horizontalOffset}
    outsideShadow_verticalOffset={outsideShadow_verticalOffset}
    outsideShadow_blur={outsideShadow_blur}
    outsideShadow_spread={outsideShadow_spread}
    outsideShadow_color={outsideShadow_color}
    insideShadow_horizontalOffset={insideShadow_horizontalOffset}
    insideShadow_verticalOffset={insideShadow_verticalOffset}
    insideShadow_blur={insideShadow_blur}
    insideShadow_spread={insideShadow_spread}
    insideShadow_color={insideShadow_color}
    context={context}
  />
)
// !later

export const _getQuickCallDialingBySymbol = (symbol, quickCallWidget) => {
  if (!quickCallWidget) {
    return null
  }
  if (symbol === '0') {
    return quickCallWidget.keypad_zero
  }
  if (symbol === '1') {
    return quickCallWidget.keypad_one
  }
  if (symbol === '2') {
    return quickCallWidget.keypad_two
  }
  if (symbol === '3') {
    return quickCallWidget.keypad_three
  }
  if (symbol === '4') {
    return quickCallWidget.keypad_four
  }
  if (symbol === '5') {
    return quickCallWidget.keypad_five
  }
  if (symbol === '6') {
    return quickCallWidget.keypad_six
  }
  if (symbol === '7') {
    return quickCallWidget.keypad_seven
  }
  if (symbol === '8') {
    return quickCallWidget.keypad_eight
  }
  if (symbol === '9') {
    return quickCallWidget.keypad_nine
  }
  if (symbol === '*') {
    return quickCallWidget.keypad_asterisk
  }
  if (symbol === '#') {
    return quickCallWidget.keypad_sharp
  }
  return null
}

export const getIconJsx = (icon, label) => {
  let iconJsx
  if (!icon) {
    iconJsx = label
  } else if (icon.startsWith('PATH:')) {
    let alt = ''
    if (label) {
      alt = label
    } else {
      alt = icon
    }
    const src = icon.substring(5, icon.length) // 5 is path:
    // iconJsx = <Image source={{ uri: src || undefined }} style={{ width: 32, height: 32 }} />
    iconJsx = <></>
  } else {
    iconJsx = <FontAwesomeIcon size={20} icon={icon} />
  }
  return iconJsx
}

const CallTablePreview = () => (
  <Table>
    <View>
      <TableWrapper>
        <Cell data={i18n.t('CallTable')}></Cell>
      </TableWrapper>
    </View>
  </Table>
)

const ExtensionTablePreview = () => (
  <Table>
    <View>
      <TableWrapper>
        <Cell data={i18n.t('ExtensionTable')}></Cell>
      </TableWrapper>
    </View>
  </Table>
)

const LineTablePreview = () => (
  <Table>
    <View>
      <TableWrapper>
        <Cell data={i18n.t('LineTable')}></Cell>
      </TableWrapper>
    </View>
  </Table>
)

const UccacWidgetPreview = () => (
  <Table>
    <View>
      <TableWrapper>
        <Cell data={i18n.t('LineTucChatAgentComponentable')}></Cell>
      </TableWrapper>
    </View>
  </Table>
)

export const LegacyButtonMap = {
  [LegacyDummyButton.name]: LegacyDummyButton,
  [LegacyCallTalkingButton.name]: LegacyCallTalkingButton,
  [LegacyNoAnswerButton.name]: LegacyNoAnswerButton,
  [LegacyCallbackButton.name]: LegacyCallbackButton,
  [LegacyTransferButton.name]: LegacyTransferButton,
  [LegacyToggleRecordingButton.name]: LegacyToggleRecordingButton,
  [LegacyAlarmButton.name]: LegacyAlarmButton,
  [LegacyPrevCallButton.name]: LegacyPrevCallButton,
  [LegacyMonitorDialingExtensionButton.name]:
    LegacyMonitorDialingExtensionButton,
  [LegacyStationLineDesignationButton.name]: LegacyStationLineDesignationButton,
  [LegacyParkCallButton.name]: LegacyParkCallButton,
  [LegacySeriesSetButton.name]: LegacySeriesSetButton,
  [LegacyMonitoringCallButton.name]: LegacyMonitoringCallButton,
  [LegacyStartButton.name]: LegacyStartButton,
  [LegacyToggleMutedButton.name]: LegacyToggleMutedButton,
  [LegacyLeavingSeatButton.name]: LegacyLeavingSeatButton,
  [LegacyNightTimeButton.name]: LegacyNightTimeButton,
  [LegacyAvailableButton.name]: LegacyAvailableButton,
  [LegacyNextCallButton.name]: LegacyNextCallButton,
  [LegacyLineButton.name]: LegacyLineButton,
  [LegacyKeypadButton.name]: LegacyKeypadButton,
  [LegacyMakeCallButton.name]: LegacyMakeCallButton,
  [LegacyBackspaceButton.name]: LegacyBackspaceButton,
  [LegacyIncomingCallButton.name]: LegacyIncomingCallButton,
  [LegacyThreeWayCallButton.name]: LegacyThreeWayCallButton,
  [LegacyOutgoingCallButton.name]: LegacyOutgoingCallButton,
  [LegacyHangUpCallButton.name]: LegacyHangUpCallButton,
  [LegacyUnholdCallButton.name]: LegacyUnholdCallButton,
  [LegacyHoldCallButton.name]: LegacyHoldCallButton,
  [LegacyPickUpCallButton.name]: LegacyPickUpCallButton,
  [LegacyQuickCallButton.name]: LegacyQuickCallButton,
  [LegacyAutoDialButton.name]: LegacyAutoDialButton,
  [LegacyOneTouchDialButton.name]: LegacyOneTouchDialButton,
}

const LegacyButton = props => {
  const Component = LegacyButtonMap[props.subtype]
  if (!Component) {
    return null
  }
  const label = props.label || i18n.t(`legacy_button_label.${props.subtype}`)
  return <Component {...props} label={label} />
}

const WidgetMap = {
  [LegacyButton.name]: LegacyButton,
  [LegacyCallPanel.name]: LegacyCallPanel,
  [LegacyExtensionStatus.name]: LegacyExtensionStatus,
  ['Text']: TextWidget,
  [CallTable.name]: CallTable,
  [ExtensionTable.name]: ExtensionTable,
  ['Note']: Note,
  [LineTable.name]: LineTable,
  [LegacyUccacWidget.name]: LegacyUccacWidget,
}
const WidgetPreviewMap = {
  [CallTablePreview.name]: CallTablePreview,
  [ExtensionTablePreview.name]: ExtensionTablePreview,
  [NotePreview.name]: NotePreview,
  [LineTablePreview.name]: LineTablePreview,
  [UccacWidgetPreview.name]: UccacWidgetPreview,
}
const WidgetSettingsMap = {
  [LegacyButton.name]: LegacyButtonSettings,
  [LegacyExtensionStatus.name]: LegacyExtensionStatusSettings,
  ['Text']: TextSettings,
  ['Note']: NoteSettings,
  [LineTable.name]: LineTableSettings,
  [LegacyCallPanel.name]: LegacyCallPanelSettings,
  [CallTable.name]: CallTableSettings,
  [ExtensionTable.name]: ExtensionTableSettings,
  [LegacyUccacWidget.name]: LegacyUccacWidgetSettings,
}

const ToolboxWidgets = [
  {
    type: LegacyButton.name,
    width: 72,
    height: 72,
    subtype: LegacyDummyButton.name,
  },
  {
    type: LegacyCallPanel.name,
    width: 200,
    height: 128,
    // borderRadius:8,
    // callpanelBgColor:"#A8C64E",
    // //callpanelFgColor:"",
    // outsideShadow_horizontalOffset:0, outsideShadow_verticalOffset:-1,
    // outsideShadow_blur:7,outsideShadow_spread:1,
    // outsideShadow_color:{"r":0,"g":0,"b":0,"a":0.2},
    // insideShadow_horizontalOffset:0,insideShadow_verticalOffset:-1,
    // insideShadow_blur:9,insideShadow_spread:0,
    // insideShadow_color:{"r":48,"g":71,"b":1,"a":1} //"#304701"
  },
  { type: LegacyExtensionStatus.name, width: 64, extension: '' },
  { type: 'Text', width: 64, height: 72, text: 'Text' },
  {
    type: CallTable.name,
    width: 640,
    height: 128,
    preview: CallTablePreview.name,
    previewWidth: 128,
    previewHeight: 64,
  },
  {
    type: ExtensionTable.name,
    width: 640,
    height: 128,
    preview: ExtensionTablePreview.name,
    previewWidth: 128,
    previewHeight: 64,
  },
  {
    type: 'Note',
    previewWidth: 64,
    previewHeight: 64,
    width: 320,
    height: 320,
    preview: NotePreview.name,
  },
  {
    type: LineTable.name,
    width: 640,
    height: 128,
    preview: LineTablePreview.name,
    previewWidth: 128,
    previewHeight: 64,
  },
  {
    type: LegacyUccacWidget.name,
    width: 470,
    height: 300,
    preview: UccacWidgetPreview.name,
    // borderRadius:8,
    // uccacWidgetBgColor:"#A8C64E",
    // //uccacWidgetFgColor:"",
    // outsideShadow_horizontalOffset:0, outsideShadow_verticalOffset:-1,
    // outsideShadow_blur:7,outsideShadow_spread:1,
    // outsideShadow_color:{"r":0,"g":0,"b":0,"a":0.2},
    // insideShadow_horizontalOffset:0,insideShadow_verticalOffset:-1,
    // insideShadow_blur:9,insideShadow_spread:0,
    // insideShadow_color:{"r":48,"g":71,"b":1,"a":1} //"#304701"
  },
]

const DEFAULT_WIDGETS = [
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyLineButton',
    x: 0,
    y: 0,
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyLineButton',
    x: 80,
    y: 0,
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyCallTalkingButton',
    x: 160,
    y: 0,
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyLineButton',
    x: 240,
    y: 0,
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyNoAnswerButton',
    x: 320,
    y: 0,
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyCallbackButton',
    x: 400,
    y: 0,
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyTransferButton',
    x: 480,
    y: 0,
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyToggleRecordingButton',
    x: 720,
    y: 0,
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyAlarmButton',
    x: 960,
    y: 0,
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyPrevCallButton',
    icon: 'fas fa-chevron-up',
    x: 1040,
    y: 0,
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyMonitorDialingExtensionButton',
    x: 80,
    y: 80,
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyStationLineDesignationButton',
    x: 160,
    y: 80,
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyParkCallButton',
    x: 240,
    y: 80,
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacySeriesSetButton',
    x: 320,
    y: 80,
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyMonitoringCallButton',
    x: 400,
    y: 80,
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyStartButton',
    x: 640,
    y: 80,
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyToggleMutedButton',
    x: 720,
    y: 80,
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyLeavingSeatButton',
    x: 800,
    y: 80,
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyNightTimeButton',
    x: 880,
    y: 80,
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyAvailableButton',
    x: 960,
    y: 80,
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyNextCallButton',
    icon: 'fas fa-chevron-down',
    x: 1040,
    y: 80,
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyLineButton',
    x: 0,
    y: 200,
    label: 'Line 1',
    line: 'external/1',
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyLineButton',
    x: 0,
    y: 280,
    label: 'Line 2',
    line: 'external/2',
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyLineButton',
    x: 0,
    y: 360,
    label: 'Line 3',
    line: 'external/3',
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyLineButton',
    x: 0,
    y: 440,
    label: 'Line 4',
    line: 'external/4',
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyLineButton',
    x: 0,
    y: 520,
    label: 'Line 5',
    line: 'external/5',
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyLineButton',
    x: 0,
    y: 610,
    label: 'Line 6',
    line: 'external/6',
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyKeypadButton',
    x: 340,
    y: 310,
    symbol: '1',
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyKeypadButton',
    x: 420,
    y: 310,
    symbol: '2',
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyKeypadButton',
    x: 500,
    y: 310,
    symbol: '3',
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyKeypadButton',
    x: 340,
    y: 390,
    symbol: '4',
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyKeypadButton',
    x: 420,
    y: 390,
    symbol: '5',
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyKeypadButton',
    x: 500,
    y: 390,
    symbol: '6',
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyKeypadButton',
    x: 340,
    y: 470,
    symbol: '7',
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyKeypadButton',
    x: 420,
    y: 470,
    symbol: '8',
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyKeypadButton',
    x: 500,
    y: 470,
    symbol: '9',
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyKeypadButton',
    x: 340,
    y: 550,
    symbol: '*',
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyKeypadButton',
    x: 420,
    y: 550,
    symbol: '0',
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyKeypadButton',
    x: 500,
    y: 550,
    symbol: '#',
  },
  {
    type: 'LegacyButton',
    width: 152,
    height: 72,
    subtype: 'LegacyMakeCallButton',
    icon: 'fas fa-phone',
    x: 340,
    y: 630,
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyBackspaceButton',
    icon: 'fas fa-delete-left',
    x: 500,
    y: 630,
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyIncomingCallButton',
    x: 690,
    y: 310,
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyThreeWayCallButton',
    x: 770,
    y: 310,
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyOutgoingCallButton',
    x: 850,
    y: 310,
  },
  {
    type: 'LegacyButton',
    width: 150,
    height: 70,
    subtype: 'LegacyHangUpCallButton',
    x: 1010,
    y: 310,
  },
  {
    type: 'LegacyButton',
    width: 150,
    height: 70,
    subtype: 'LegacyUnholdCallButton',
    x: 690,
    y: 400,
  },
  {
    type: 'LegacyButton',
    width: 150,
    height: 70,
    subtype: 'LegacyHoldCallButton',
    x: 850,
    y: 400,
  },
  {
    type: 'LegacyButton',
    width: 150,
    height: 70,
    subtype: 'LegacyPickUpCallButton',
    x: 1010,
    y: 400,
  },
  {
    type: 'LegacyCallPanel',
    width: 290,
    height: 140,
    x: 310,
    y: 160,
    // "borderRadius": 8,
    // "callpanelBgColor": "#A8C64E",
    // //"callpanelFgColor": "",
    // outsideShadow_horizontalOffset:0, outsideShadow_verticalOffset:-1,
    // outsideShadow_blur:7,outsideShadow_spread:1,
    // outsideShadow_color:{"r":0,"g":0,"b":0,"a":0.2},
    // insideShadow_horizontalOffset:0, insideShadow_verticalOffset:-1,
    // insideShadow_blur:9,insideShadow_spread:0,
    // insideShadow_color:{"r":48,"g":71,"b":1,"a":1} //"#304701"
  },
  {
    type: 'LegacyExtensionStatus',
    width: 72,
    height: 72,
    extension: '1001',
    x: 690,
    y: 180,
  },
  {
    type: 'LegacyExtensionStatus',
    width: 72,
    height: 72,
    extension: '1002',
    x: 760,
    y: 180,
  },
  {
    type: 'LegacyExtensionStatus',
    width: 72,
    height: 72,
    extension: '1003',
    x: 830,
    y: 180,
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyDummyButton',
    x: 560,
    y: 0,
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyDummyButton',
    x: 640,
    y: 0,
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyDummyButton',
    x: 0,
    y: 80,
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyDummyButton',
    x: 480,
    y: 80,
  },
  {
    type: 'LegacyButton',
    width: 72,
    height: 72,
    subtype: 'LegacyDummyButton',
    x: 560,
    y: 80,
  },
]
const DEFAULT_SCREEN = {
  widgets: [],
  background: '#ffffff00',
  foreground: '#000000',
  width: 1280,
  height: 720,
  grid: 10,
  tabDatas: [
    {
      tabTitle: 'Untitled tab',
      widgetDatas: new Array(),
    },
  ],
}
const DEFAULT_SCREENS = [
  cloneDeep({ ...DEFAULT_SCREEN, widgets: DEFAULT_WIDGETS }),
  cloneDeep(DEFAULT_SCREEN),
  cloneDeep(DEFAULT_SCREEN),
]

const EMPTY_SCREENS = [cloneDeep(DEFAULT_SCREEN)]

const INIT_STATE = {
  i18nReady: false,
  isInitialized: false,
  loginUser: null,
  syncDownedScreens: false,
  syncDownedSystemSettings: false,
  _downedLayoutAndSystemSettings: false,
  syncLoadedCallHistory: false,
  dialing: '',
  extensions: [],
  autoRejectIncoming: false,
  extensionsStatus: {},
  monitoringExtension: '',
  linesStatus: {},
  parksStatus: {},
  myParksStatus: {},
  usingLine: '',
  selectingWidgetIndex: -1,
  editingScreenWidth: 400,
  editingScreenHeight: 400,
  editingScreenGrid: 10,
  editingScreenBackground: '#ffffff00',
  editingScreenForeground: '#000000',
  currentScreenQuickCallWidget: null,
  currentScreenQuickCallWidgetSubData: null,
  currentScreenIndex: 0,
  screens: [DEFAULT_SCREEN],
  locale: '',
  displayState: undefined,
  showAutoDialWidgets: [],
  showAutoDialWidgetSubDatas_ver2: [],
  currentScreenTabIndex: 0,
  isSelectingTabInEditLayout: false,
  editingTabDatas: new Array(),
  isAboutOCModalOpen: false,
}

type BrekekeOperatorConsoleProps = {}
type BrekekeOperatorConsoleState = {
  systemSettingsData?: any
  isAboutOCModalOpen: boolean
  _downedLayoutAndSystemSettings: boolean
  displayState?: number
  screenData_ver2?: any
  editingTabDatas: Array<any>
  isSelectingTabInEditLayout: boolean
  currentScreenTabIndex: number
  showAutoDialWidgetSubDatas_ver2: Array<any>
  showAutoDialWidgets: Array<any>
  locale: string
  screens: Array<any>
  currentScreenIndex: number
  currentScreenQuickCallWidgetSubData: any
  currentScreenQuickCallWidget: any
  editingScreenForeground: string
  editingScreenBackground: string
  editingScreenWidth: number
  editingScreenHeight: number
  editingScreenGrid: number
  selectingWidgetIndex: number
  i18nReady: boolean
  isInitialized: boolean
  loginUser: any
  syncDownedScreens: boolean
  syncDownedSystemSettings: boolean
  syncLoadedCallHistory: boolean
  dialing: string
  extensions: Array<any>
  autoRejectIncoming: boolean
  extensionsStatus: any
  monitoringExtension: string
  linesStatus: any
  parksStatus: any
  myParksStatus: any
  usingLine: string
  newLayoutModalOpen?: boolean
  lastLayoutShortname?: string
  showConfirmDeleteWidget?: boolean
  showConfirmDeleteTab?: boolean
  lastLoginAccount?: any
  refresh?: boolean
  isAdmin?: boolean
}

export class BrekekeOperatorConsole extends React.Component<
  BrekekeOperatorConsoleProps,
  BrekekeOperatorConsoleState
> {
  static WAIT_HOLD_TIMELIMIT_MILLIS_AT_ONETOUCHDIAL
  static DIALING_MAX_LENGTH
  static TAB_TITLE_MAX_LENGTH
  static PAL_NOTE_USERACCESSES
  static DTMF_CHARS
  _DefaultPbxDirectoryName: string = 'pbx'
  _disableKeydownToDialingCounter: number
  _disablePasteToDialingCounter: number
  _isDTMFInput: boolean
  _OnBackspaceKeypadValueCallbacks
  _OnAppendKeypadValueCallbacks
  _OnClearDialingCallbacks
  _systemSettingsView
  _PalRestApi
  _CallHistory
  _CallHistory2
  _OnBeginSaveEditingScreenFunctions
  _Campon
  _ExtensionsStatus
  _UccacWrapper
  _BrekekeOperatorConsoleEx
  _OnAddCallInfoEventListeners
  _OnUpdateCallInfoEventListeners
  _OnHoldCallInfoEventListeners
  _OnUnholdCallInfoEventListeners
  _OnRemoveCallInfoEventListeners
  _OnUnloadExtensionScriptEventListeners
  _aphone
  _loggedinPal
  _LoginPalWrapper
  _RootURLString
  _DefaultButtonImageFileInfos
  _OnBeforeUnloadFunc
  _OnUnloadFunc
  _defaultSystemSettingsData
  _onPasteFunction
  _onKeydownFunction
  _editingScreenData_ver2
  _onKeydownAtEditingScreenFunc
  _quickBusy
  _prevCurrentCallStatus
  constructor(props) {
    super(props)
    BREKEKE_OPERATOR_CONSOLE = this
    this._DefaultPbxDirectoryName = 'pbx'
    this._disableKeydownToDialingCounter = 0
    this._disablePasteToDialingCounter = 0
    this._isDTMFInput = false
    this._OnBackspaceKeypadValueCallbacks = []
    this._OnAppendKeypadValueCallbacks = []
    this._OnClearDialingCallbacks = []
    this._systemSettingsView = null
    this.state = cloneDeep(INIT_STATE)
    this._PalRestApi = new PalRestApi()
    this._CallHistory = new CallHistory(this)
    this._CallHistory2 = new CallHistory2(this)
    this._OnBeginSaveEditingScreenFunctions = []
    this._Campon = new Campon(this)
    this._ExtensionsStatus = new ExtensionsStatus(this)
    this._UccacWrapper = new UccacWrapper(this)
    this._BrekekeOperatorConsoleEx = new BrekekeOperatorConsoleEx(this)

    this._OnAddCallInfoEventListeners = new Array()
    this._OnUpdateCallInfoEventListeners = new Array()
    this._OnHoldCallInfoEventListeners = new Array()
    this._OnUnholdCallInfoEventListeners = new Array()
    this._OnRemoveCallInfoEventListeners = new Array()

    this._OnUnloadExtensionScriptEventListeners = new Array()
    this._aphone = null
    this._loggedinPal = null

    this._LoginPalWrapper = new PalWrapper()

    // this._RootURLString = Util.getRootUrlString()
    this._DefaultButtonImageFileInfos = new FileInfosLoader()
    this._defaultSystemSettingsData = new SystemSettingsData(this)
  }

  static get BREKEKE_OPERATOR_CONSOLE_VERSION() {
    return VERSION
  }

  getIsOpenAboutOCModalByState() {
    const b = this.state.isAboutOCModalOpen
    return b
  }

  openAboutOCModalByState() {
    this.setState({ isAboutOCModalOpen: true })
  }

  closeAboutOCModalByState() {
    this.setState({ isAboutOCModalOpen: false })
  }

  getDefaultButtonImageFileInfos() {
    return this._DefaultButtonImageFileInfos
  }

  getPhoneClient() {
    return this._aphone
  }

  onAnswerCalleeByPalCallInfo(palCallInfo) {
    // If the call is not active when the other party answers, it will be put on hold.
    const currentCallId = this._aphone.getCallInfos().getCurrentCallId()
    const callId = palCallInfo.getCallId()
    const isActive = currentCallId === callId
    if (!isActive) {
      if (!palCallInfo.getIsHolding()) {
        palCallInfo.toggleHoldWithCheck()
      }
    }
  }

  onDeinitUccacWrapperByUccacWrapper(uccacWrapperAsCaller) {
    // const screen = this._getCurrentScreen();
    // const widgets = screen.widgets;
    // for( let i = 0; i < widgets.length; i++ ){
    //     const widget = widgets[i];
    //     const widgetType = widget.type;
    //     if( widgetType === "LegacyUccacWidget") {
    //         widget.onDeinitUccacWrapperByOperatorConsole(this, uccacWrapperAsCaller );
    //     }
    // }
  }

  onInitUccacWrapperSuccessByUccacWrapper(uccacWrapperAsCaller) {
    // const screen = this._getCurrentScreen();
    // const widgets = screen.widgets;
    // for( let i = 0; i < widgets.length; i++ ){
    //     const widget = widgets[i];
    //     const widgetType = widget.type;
    //     if( widgetType === "LegacyUccacWidget") {
    //         widget.onInitUccacWrapperSuccessByOperatorConsole(this, uccacWrapperAsCaller );
    //     }
    // }
  }

  onSelectOCNoteByShortnameFromNoScreensView(noScreensViewAsCaller) {
    // this.reloadSystemSettingsExtensionScript();
    this.setState({
      _downedLayoutAndSystemSettings: true,
      displayState: brOcDisplayStates.showScreen_ver2,
    })
  }

  onSavedNewLayoutFromNoScreensView(layoutName, layoutsAndSettingsData) {
    const systemSettingsData = this.getSystemSettingsData()
    console.log('#Duy Phan console save')
    const this_ = this
    systemSettingsData.setSystemSettingsDataData(
      layoutsAndSettingsData.systemSettings,
      () => {
        console.log('#Duy Phan console save222')
        this_.setLastLayoutShortname(layoutName)
        const screenData_ver2 = new ScreenData()
        this_.setState({
          screenData_ver2,
          _downedLayoutAndSystemSettings: true,
          screens: layoutsAndSettingsData.screens,
          systemSettingsData,
          displayState: brOcDisplayStates.showScreen_ver2,
          newLayoutModalOpen: false,
        })
      },
      e => {
        // initFail
        // !testit
        if (Array.isArray(e)) {
          for (let i = 0; i < e.length; i++) {
            const err = e[i]
            console.error(
              'setSystemSettingsDataData failed. errors[' + i + ']=',
              err,
            )
          }
        } else {
          console.error('setSystemSettingsDataData failed. error=', e)
        }

        try {
          e = JSON.stringify(e)
        } catch (err) {}
        Notification.error({
          message: i18n.t('failedToSetupSystemSettingsDataData') + '\r\n' + e,
          duration: 0,
        })
      },
    )
  }

  _initAphoneClient(aphone, initOptions: OptionsInitSystem) {
    this._aphone = aphone
    this._aphone.initPhoneClient(initOptions)
  }

  _deinitAphoneClient() {
    if (!this._aphone) {
      return
    }
    this._aphone.deinitPhoneClient()
    this._aphone = null
  }

  addOnClearDialingCallbacks(callback) {
    this._OnClearDialingCallbacks.push(callback)
  }

  static getAppDataVersion() {
    return PBX_APP_DATA_VERSION
  }

  getSystemSettingsData() {
    const systemSettingsData = this.state.systemSettingsData
    return systemSettingsData
  }

  static getDefaultScreens() {
    return DEFAULT_SCREENS
  }

  static getEmptyScreens() {
    return EMPTY_SCREENS
  }

  getCampon() {
    return this._Campon
  }

  getExtensionsStatusInstance() {
    return this._ExtensionsStatus
  }

  getState() {
    return this.state
  }

  // getCallByRoomId( roomId ) {
  //     const call = Object.values( this.callById).find((call) => call.pbxRoomId === roomId );
  //     return call;
  // }

  getCallHistory2() {
    return this._CallHistory2
  }

  onSavingSystemSettings(systemSettingsAsCaller) {
    this.getCallHistory().onSavingSystemSettings(this)
    this._CallHistory2.onSavingSystemSettingsForCallHistory2(this)
  }

  onBeginSetSystemSettingsData(
    newData,
    systemSettingsDataAsCaller,
    onInitSuccessUccacFunction,
    onInitFailUccacFunction,
  ) {
    const isUCMinScript = false // !dev
    const this_ = this
    const bPhoneTerminalChanged =
      newData.phoneTerminal !== systemSettingsDataAsCaller.getPhoneTerminal()
    if (bPhoneTerminalChanged || this._aphone == null) {
      this._deinitAphoneClient()
      const options = {
        operatorConsoleAsParent: this,
      }
      const pt = newData.phoneTerminal
      let phoneClient
      console.log('#Duy Phan console pt', pt)
      if (pt === 'phoneTerminal_pal') {
        phoneClient = new PalPhoneClient(options)
      } else {
        phoneClient = new WebphonePhoneClient(options)
      }
      // phoneClient = new PalPhoneClient(options)

      this._getLastLoginAccount().then(initOptions => {
        console.log('#Duy Phan console initOptions', initOptions)
        const newOptions: OptionsInitSystem = { ...initOptions }
        newOptions.onInitSuccessFunction = function (oExtensions) {
          console.log('extensions', oExtensions)
          this_.setState({ extensions: oExtensions }, () => {
            // Todo:
            // const initAsync =
            //   this_._UccacWrapper.onBeginSetSystemSettingsDataByOperatorConsoleAsParent(
            //     newData,
            //     systemSettingsDataAsCaller,
            //     () => {
            //       onInitSuccessUccacFunction()
            //       this_._deinitPalWrapper()
            //     },
            //     onInitFailUccacFunction,
            //     isUCMinScript,
            //   )
            // return initAsync;
            onInitSuccessUccacFunction()
          })
        }
        newOptions.onInitFailFunction = function (error) {
          onInitFailUccacFunction(error)
        }
        this._initAphoneClient(phoneClient, newOptions)
      })

      return false
    } else {
      console.log('#Duy Phan console option2')
      const initAsync =
        this_._UccacWrapper.onBeginSetSystemSettingsDataByOperatorConsoleAsParent(
          newData,
          systemSettingsDataAsCaller,
          () => {
            onInitSuccessUccacFunction()
            this_._deinitPalWrapper()
          },
          onInitFailUccacFunction,
          isUCMinScript,
        )
      return initAsync
    }
  }

  getCallHistory() {
    return this._CallHistory
  }

  componentDidMount() {
    this.startShowScreen()

    i18n.onChange(() => {
      if (i18n.locale !== this.state.locale) {
        // this.setState({ i18nReady: false, locale: i18n.locale }, () => {
        //   loadTranslations(i18n.locale)
        //     .then(() => {
        //       this.setState({ i18nReady: true })
        //     })
        //     .catch(e => {
        //       console.error('Load translations failed. error=', e)
        //       Notification.error({
        //         message: 'Load translations failed.',
        //         duration: 0,
        //       })
        //     })
        // })
        this.setState({ i18nReady: true })
      }
    })
    i18n.defaultLocale = ''
  }

  getIsDTMFInput() {
    return this._isDTMFInput
  }

  addDisableKeydownToDialingCounter() {
    this._disableKeydownToDialingCounter++
  }

  subtractDisableKeydownToDialingCounter() {
    this._disableKeydownToDialingCounter--
  }

  addDisablePasteToDialingCounter() {
    this._disablePasteToDialingCounter++
  }

  subtractDisablePasteToDialingCounter() {
    this._disablePasteToDialingCounter--
  }

  async _getLastLayoutLocalstorageKeyName() {
    const info = await this._getLastLoginAccount()
    let pbxDirectoryName = info['pbxDirectoryName']
    if (!pbxDirectoryName || pbxDirectoryName.length === 0) {
      pbxDirectoryName = this._DefaultPbxDirectoryName
    }

    const key =
      info.hostname +
      '\t' +
      info.port +
      '\t' +
      info.tenant +
      '\t' +
      info.username +
      '\t' +
      pbxDirectoryName
    return key
  }

  getLoggedinTenant() {
    if (!this.state.loginUser) {
      return null
    }
    const tenant = this.state.loginUser.pbxTenant
    return tenant
  }

  getLoggedinUsername() {
    if (!this.state.loginUser) {
      return null
    }
    const user = this.state.loginUser.pbxUsername
    return user
  }

  getLoggedinPbxHost() {
    if (!this.state.loginUser) {
      return null
    }
    const pbxHost = this.state.loginUser.pbxHost
    return pbxHost
  }

  getLoggedinPbxPort() {
    if (!this.state.loginUser) {
      return null
    }
    const pbxPort = this.state.loginUser.pbxPort
    return pbxPort
  }

  getLoggedinPassword() {
    if (!this.state.loginUser) {
      return null
    }
    const pbxPassword = this.state.loginUser.pbxPassword
    return pbxPassword
  }

  getLoggedinLanguage() {
    if (!this.state.loginUser) {
      return null
    }
    const language = this.state.loginUser.language
    return language
  }

  getDialing() {
    return this.state.dialing
  }

  async _getLastLayoutShortname() {
    const key = await this._getLastLayoutLocalstorageKeyName()
    const shortName = await RnAsyncStorage.getItem(key)
    return shortName
  }

  _getLastLayoutFullname() {
    const shortName = this._getLastLayoutShortname()
    if (!shortName) {
      return shortName
    }
    return this._getLayoutFullname(shortName)
  }

  _getLayoutFullname(shortName) {
    const fullName = BrekekeOperatorConsole.LAYOUT_NOTE_NAME_PREFIX + shortName
    return fullName
  }

  async setLastLayoutShortname(shortName) {
    const key = await this._getLastLayoutLocalstorageKeyName()
    await RnAsyncStorage.setItem(key, shortName)
    this.setState({ lastLayoutShortname: shortName })
  }

  async _removeLastLayoutShortname() {
    const key = await this._getLastLayoutLocalstorageKeyName()
    RnAsyncStorage.removeItem(key)
  }

  getLastLayoutShortname() {
    return this.state.lastLayoutShortname
  }

  getDisplayState() {
    return this.state.displayState
  }

  setDisplayState(displayState, otherSetStates = {}, callback = () => {}) {
    const states = { displayState, ...otherSetStates }
    this.setState(states, callback)
  }

  _getCurrentScreen() {
    const screen = this.state.screens[this.state.currentScreenIndex]
    return screen
  }

  onClickDropDownMenu(e) {
    this.setState({
      showAutoDialWidgets: [],
      currentScreenQuickCallWidget: null,
    })
  }

  _onEditingTabClick(sKey) {
    const tabIndex = parseInt(sKey)
    this.setState({
      currentScreenTabIndex: tabIndex,
      isSelectingTabInEditLayout: true,
      selectingWidgetIndex: -1,
    })
  }

  _onShowScreenTabClick(sKey) {
    const tabIndex = parseInt(sKey)
    this.setState({
      currentScreenTabIndex: tabIndex,
    })
  }

  render() {
    if (!this.state.i18nReady) {
      return <Empty image={null} description={<ActivityIndicator />} />
    }

    const editingWidgetDatas = this._getSelectingEditingWidgetDatas()

    // const selectingWidget = this.state.editingWidgets[this.state.selectingWidgetIndex];
    let selectingEditingWidget
    if (editingWidgetDatas) {
      selectingEditingWidget =
        editingWidgetDatas[this.state.selectingWidgetIndex]
    } else {
      selectingEditingWidget = null
    }
    const SeletingEditingWidgetSettings =
      WidgetSettingsMap[selectingEditingWidget?.type]
    const selectingWidgetSettingsKey = 0

    const handleShowConfirmDeleteWidgetOk = () => {
      this.setState({ showConfirmDeleteWidget: false })
      this.onWidgetRemoved(this.state.selectingWidgetIndex)
    }
    const handleShowConfirmDeleteWidgetCancel = () => {
      this.setState({ showConfirmDeleteWidget: false })
    }

    const handleShowConfirmDeleteTabOk = () => {
      this.setState({ showConfirmDeleteTab: false })
      this.removeTabInEditMode(this.state.currentScreenTabIndex)
    }
    const handleShowConfirmDeleteTabCancel = () => {
      this.setState({ showConfirmDeleteTab: false })
    }

    const isEditingScreen =
      !!this.state.isInitialized &&
      this.state._downedLayoutAndSystemSettings &&
      this.state.displayState === brOcDisplayStates.editingScreen
    let editingTabItems
    if (isEditingScreen) {
      // const editingScreen = this.state.screens[ this.state.currentScreenIndex ];
      const tabDatas = this.state.editingTabDatas
      editingTabItems = new Array(tabDatas.length)
      for (let i = 0; i < editingTabItems.length; i++) {
        // const tabData = tabDatas[i];
        const editingTabData = this.state.editingTabDatas[i]
        const editingWidgetDatas = editingTabData.widgetDatas
        const editingTabJsx = (
          <Rnd
            limitation={{
              x: 0,
              y: 0,
              w: Dimensions.get('window').width,
              h: Dimensions.get('window').height,
            }}
            w={this.state.editingScreenWidth}
            h={this.state.editingScreenHeight}
            style={{
              borderStyle: 'solid',
              borderColor: '#E0E0E0',
              borderWidth: 1,
              backgroundColor: this.state.editingScreenBackground,
            }}
            onResizeEnd={data => {
              this.setEditingScreenSize(data.w, data.h)
            }}
          >
            <GridLines
              style={{ height: '100%' }}
              strokeWidth={2}
              cellWidth={this.state.editingScreenGrid * 10}
              cellWidth2={this.state.editingScreenGrid}
              cellHeight={this.state.editingScreenGrid * 10}
              cellHeight2={this.state.editingScreenGrid}
            >
              {editingWidgetDatas.map((widget, i) => {
                const Widget = WidgetMap[widget.type]
                if (!Widget) {
                  return null
                }
                return (
                  <Rnd
                    limitation={{
                      x: 0,
                      y: 0,
                      w: Dimensions.get('window').width,
                      h: Dimensions.get('window').height,
                    }}
                    key={i}
                    w={widget.width}
                    h={widget.height}
                    x={widget.x}
                    y={widget.y}
                    grid={[
                      this.state.editingScreenGrid,
                      this.state.editingScreenGrid,
                    ]}
                    onPress={e => {
                      this.selectWidget(i)
                      // e.stopPropagation()
                    }}
                    onDragEnd={([lastX, lastY]) => {
                      this.onWidgetMoved(i, lastX, lastY)
                      this.makeWidgetOnTop(i)
                    }}
                    isDraggable={this.state.selectingWidgetIndex === i}
                    onResizeEnd={data => {
                      this.onWidgetResized(i, data.x, data.y, data.w, data.h)
                    }}
                  >
                    <Widget
                      {...widget}
                      color={this.state.editingScreenForeground}
                      operatorConsoleAsParent={this}
                      uccacWrapper={this._UccacWrapper}
                    />
                  </Rnd>
                )
              })}
            </GridLines>
          </Rnd>
        )

        const editingTabItem = {
          key: i.toString(),
          label: editingTabData.tabTitle,
          children: editingTabJsx,
        }
        editingTabItems[i] = editingTabItem
      }
    } else {
      editingTabItems = null
    }

    const editingTabData = this._getSelectingEditingTabData()
    const tabsActiveKey = this.state.currentScreenTabIndex.toString()
    const isEditingScreen_ver2 =
      this.state.displayState === brOcDisplayStates.editingScreen_ver2
    if (isEditingScreen_ver2) {
      const srcScreenData_ver2 = this.state.screenData_ver2
      const dstScreenData_ver2 = srcScreenData_ver2.cloneScreenData()
      this._editingScreenData_ver2 = dstScreenData_ver2
      return (
        <EditScreenView
          operatorConsoleAsParent={this}
          screenData={this._editingScreenData_ver2}
        ></EditScreenView>
      )
    }
    console.log(
      '#Duy Phan console this.state.isInitialized',
      this.state.displayState,
    )
    return (
      <Provider>
        {!!this.state.isInitialized ? (
          <View
            style={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <Image
              style={{ position: 'absolute', top: 4, left: 4, zIndex: 1 }}
              source={logo as ImageSourcePropType}
            />
            {this.state._downedLayoutAndSystemSettings ? (
              this.state.displayState === brOcDisplayStates.waitQuickCallKey ? (
                <>
                  <View
                    style={{
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      overflow: 'hidden',
                      backgroundColor:
                        this.state.screens[this.state.currentScreenIndex]
                          .background,
                      // color:
                      //   this.state.screens[this.state.currentScreenIndex]
                      //     .foreground,
                    }}
                  >
                    {this.state.screens.map((screen, screenIndex) => {
                      const tabItems = new Array(screen.tabDatas.length)
                      for (let i = 0; i < tabItems.length; i++) {
                        const tabData = screen.tabDatas[i]
                        const tabTitle = tabData.tabTitle
                        let tabJsx
                        if (
                          !tabData.widgetDatas ||
                          tabData.widgetDatas.length === 0
                        ) {
                          tabJsx = (
                            <Empty
                              image={null}
                              description={i18n.t('no_widgets')}
                            />
                          )
                        } else {
                          tabJsx = tabData.widgetDatas.map((widgetData, i) => {
                            const Widget = WidgetMap[widgetData.type]
                            if (!Widget) {
                              return null
                            }
                            return (
                              <View
                                key={i}
                                style={{
                                  position: 'absolute',
                                  left: widgetData.x,
                                  top: widgetData.y,
                                  width: widgetData.width,
                                  height: widgetData.height,
                                }}
                              >
                                <Widget
                                  {...widgetData}
                                  operatorConsoleAsParent={this}
                                  uccacWrapper={this._UccacWrapper}
                                  context={{
                                    loginUser: this.state.loginUser,
                                    currentCallIndex:
                                      this._getCurrentCallIndex(),
                                    // callIds: this._callIds,
                                    // callById: this.callById,
                                    dialing: this.state.dialing,
                                    extensions: this.state.extensions,
                                    extensionsStatus:
                                      this.state.extensionsStatus,
                                    linesStatus: this.state.linesStatus,
                                    parksStatus: this.state.parksStatus,
                                    myParksStatus: this.state.myParksStatus,
                                    usingLine: this.state.usingLine,
                                    autoRejectIncoming:
                                      this.state.autoRejectIncoming,
                                    monitoringExtension:
                                      this.state.monitoringExtension,
                                    switchCallUp: this.switchCallUp,
                                    switchCallDown: this.switchCallDown,
                                    switchCallIndex: this.switchCallIndex,
                                    monitorDialingExtension:
                                      this.monitorDialingExtension,
                                    joinConversation: this.joinConversation,
                                    appendKeypadValue: this.appendKeypadValue,
                                    setDialingAndMakeCall:
                                      this.setDialingAndMakeCall,
                                    backspaceKeypadValue:
                                      this.backspaceKeypadValue,
                                    toggleCallRecording:
                                      this.toggleCallRecording,
                                    toggleCallMuted: this.toggleCallMuted,
                                    toggleAutoRejectIncoming:
                                      this.toggleAutoRejectIncoming,
                                    resumeCall: this.resumeCall,
                                    holdCall: this.holdCall,
                                    hangUpCall: this.hangUpCall,
                                    answerCall: this.answerCall,
                                    sendDTMFIfNeed: this.sendDTMFIfNeed,
                                    makeCall: this.makeCall,
                                    transferCall: this.transferCall,
                                    handleLine: this.handleLine,
                                    handlePark: this.handlePark,
                                    // getNote: this.getNote,
                                    // setNote: this.setNote,
                                    toggleQuickCallScreen:
                                      this.toggleQuickCallScreen,
                                    onClickAutoDial: this.onClickAutoDial,
                                    currentScreenQuickCallWidget:
                                      this.state.currentScreenQuickCallWidget,
                                    widget: widgetData,
                                    showAutoDialWidgets:
                                      this.state.showAutoDialWidgets,
                                    operatorConsole: this,
                                  }}
                                />
                              </View>
                            )
                          })
                        }
                        const key = i.toString()
                        const tabItem = {
                          key,
                          label: tabTitle,
                          children: tabJsx,
                        }
                        tabItems[i] = tabItem
                      }

                      return (
                        <View key={screenIndex}>
                          <View
                            style={{
                              position: 'relative',
                              width: screen.width,
                              height: screen.height,
                              margin: 'auto',
                              marginTop: 48,
                            }}
                          >
                            {/* <Tabs
                              activeKey={tabsActiveKey}
                              items={tabItems}
                              onTabClick={key =>
                                this._onShowScreenTabClick(key)
                              }
                            /> */}
                          </View>
                        </View>
                      )
                    })}
                    {/* </Carousel>*/}
                  </View>
                  <DropDownMenu operatorConsole={this}></DropDownMenu>
                </>
              ) : this.state.displayState ===
                brOcDisplayStates.systemSettingsView ? (
                <SystemSettingsView operatorConsole={this} />
              ) : this.state.displayState ===
                brOcDisplayStates.showScreen_ver2 ? (
                <ShowScreenView_ver2 operatorConsoleAsParent={this} />
              ) : (
                <>
                  <View
                    style={{
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      overflow: 'hidden',
                      backgroundColor:
                        this.state.screens[this.state.currentScreenIndex]
                          .background,
                      // color:
                      //   this.state.screens[this.state.currentScreenIndex]
                      //     .foreground,
                    }}
                  >
                    {this.state.screens.map((screen, screenIndex) => {
                      const tabItems = new Array(screen.tabDatas.length)
                      for (let i = 0; i < tabItems.length; i++) {
                        const tabData = screen.tabDatas[i]
                        const tabTitle = tabData.tabTitle
                        let tabJsx
                        if (
                          !tabData.widgetDatas ||
                          tabData.widgetDatas.length === 0
                        ) {
                          tabJsx = (
                            <Empty
                              image={null}
                              description={i18n.t('no_widgets')}
                            />
                          )
                        } else {
                          tabJsx = tabData.widgetDatas.map((widgetData, i) => {
                            const Widget = WidgetMap[widgetData.type]
                            if (!Widget) {
                              return null
                            }
                            return (
                              <View
                                key={i}
                                style={{
                                  position: 'absolute',
                                  left: widgetData.x,
                                  top: widgetData.y,
                                  width: widgetData.width,
                                  height: widgetData.height,
                                }}
                              >
                                <Widget
                                  {...widgetData}
                                  widgetIndex={i}
                                  operatorConsoleAsParent={this}
                                  uccacWrapper={this._UccacWrapper}
                                  context={{
                                    loginUser: this.state.loginUser,
                                    currentCallIndex:
                                      this._getCurrentCallIndex(),
                                    // callIds: this._callIds,
                                    // callById: this.callById,
                                    dialing: this.state.dialing,
                                    extensions: this.state.extensions,
                                    extensionsStatus:
                                      this.state.extensionsStatus,
                                    linesStatus: this.state.linesStatus,
                                    parksStatus: this.state.parksStatus,
                                    myParksStatus: this.state.myParksStatus,
                                    usingLine: this.state.usingLine,
                                    autoRejectIncoming:
                                      this.state.autoRejectIncoming,
                                    monitoringExtension:
                                      this.state.monitoringExtension,
                                    switchCallUp: this.switchCallUp,
                                    switchCallDown: this.switchCallDown,
                                    switchCallIndex: this.switchCallIndex,
                                    monitorDialingExtension:
                                      this.monitorDialingExtension,
                                    joinConversation: this.joinConversation,
                                    appendKeypadValue: this.appendKeypadValue,
                                    setDialingAndMakeCall:
                                      this.setDialingAndMakeCall,
                                    backspaceKeypadValue:
                                      this.backspaceKeypadValue,
                                    toggleCallRecording:
                                      this.toggleCallRecording,
                                    toggleCallMuted: this.toggleCallMuted,
                                    toggleAutoRejectIncoming:
                                      this.toggleAutoRejectIncoming,
                                    resumeCall: this.resumeCall,
                                    holdCall: this.holdCall,
                                    hangUpCall: this.hangUpCall,
                                    answerCall: this.answerCall,
                                    sendDTMFIfNeed: this.sendDTMFIfNeed,
                                    makeCall: this.makeCall,
                                    transferCall: this.transferCall,
                                    handleLine: this.handleLine,
                                    handlePark: this.handlePark,
                                    // getNote: this.getNote,
                                    // setNote: this.setNote,
                                    toggleQuickCallScreen:
                                      this.toggleQuickCallScreen,
                                    currentScreenQuickCallWidget:
                                      this.state.currentScreenQuickCallWidget,
                                    onClickAutoDial: this.onClickAutoDial,
                                    widget: widgetData,
                                    makeCallWithShortDial:
                                      this.makeCallWithShortDial,
                                    showAutoDialWidgets:
                                      this.state.showAutoDialWidgets,
                                    operatorConsole: this,
                                  }}
                                />
                              </View>
                            )
                          })
                        }
                        const tabItem = {
                          key: i.toString(),
                          label: tabTitle,
                          children: tabJsx,
                        }
                        tabItems[i] = tabItem
                      }

                      return (
                        <View key={screenIndex}>
                          <View
                            style={{
                              position: 'relative',
                              width: screen.width,
                              height: screen.height,
                              margin: 'auto',
                              marginTop: 48,
                            }}
                          >
                            <Tabs
                              // activeKey={tabsActiveKey}
                              tabs={tabItems}
                              onTabClick={key =>
                                this._onShowScreenTabClick(key)
                              }
                            />
                          </View>
                        </View>
                      )
                    })}
                  </View>
                  <DropDownMenu operatorConsole={this}></DropDownMenu>
                </>
              )
            ) : this.state.displayState === brOcDisplayStates.noScreens ? (
              <NoScreensView operatorConsoleAsParent={this} />
            ) : (
              <Empty image={null} description={<ActivityIndicator />} />
            )}
          </View>
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              backgroundColor: '#fafafa',
            }}
          >
            <Login
              operatorConsoleAsParent={this}
              initialValues={this._getLastLoginAccount()}
            />
          </View>
        )}

        <View id='brOCPhone'></View>
      </Provider>
      // </AutocompleteDropdownContextProvider>
    )
  }

  setLastLoginAccount(lastLoginAccount) {
    this.setState({ lastLoginAccount })
  }

  async _getLastLoginAccount() {
    const sLastLoginAccount = await RnAsyncStorage.getItem('lastLoginAccount')
    if (sLastLoginAccount) {
      try {
        const lastLoginAccount: LoginParams = JSON.parse(sLastLoginAccount)

        if (
          !lastLoginAccount['pbxDirectoryName'] ||
          lastLoginAccount['pbxDirectoryName'].length === 0
        ) {
          lastLoginAccount['pbxDirectoryName'] = this._DefaultPbxDirectoryName
        }

        return lastLoginAccount
      } catch (err) {
        console.error(err)
      }
    }
    // const lastLoginAccount = this.state.lastLoginAccount;
    const lastLoginAccount: LoginParams = {
      hostname: location.hostname,
      port: location.port,
      pbxDirectoryName: this._DefaultPbxDirectoryName,
    }
    console.log('set lastLoginAccount from location info.')
    return lastLoginAccount
  }

  setEditingScreenSize = (width, height) => {
    this.setState({ editingScreenWidth: width, editingScreenHeight: height })
  }
  setEditingScreenGrid = grid => {
    this.setState({ editingScreenGrid: Math.max(grid, 5) })
  }
  setEditingScreenBackground = color => {
    this.setState({ editingScreenBackground: color.hex })
  }
  setEditingScreenForeground = color => {
    this.setState({ editingScreenForeground: color.hex })
  }

  startEditingScreen_ver2 = () => {
    this.setDisplayState(brOcDisplayStates.editingScreen_ver2)
  }

  startShowScreen = () => {
    this.setDisplayState(brOcDisplayStates.showScreen)
  }

  startShowScreen_ver2 = () => {
    this.setDisplayState(brOcDisplayStates.showScreen_ver2)
  }

  startSettingsScreen = () => {
    this.setDisplayState(brOcDisplayStates.systemSettingsView)
  }

  getShowAutoDialWidgetSubDatas_ver2() {
    return this.state.showAutoDialWidgetSubDatas_ver2
  }

  toggleQuickCallScreen = quickCallButtonWidget => {
    console.log('quickCallButtonWidget=' + quickCallButtonWidget)

    if (this.state.currentScreenQuickCallWidget === quickCallButtonWidget) {
      this.setDisplayState(brOcDisplayStates.showScreen, {
        currentScreenQuickCallWidget: null,
      }) // toggle off
    } else {
      this.setDisplayState(brOcDisplayStates.waitQuickCallKey, {
        currentScreenQuickCallWidget: quickCallButtonWidget,
      })
    }
  }

  toggleQuickCallButton_ver2 = quickCallButtonWidgetSubData => {
    console.log('quickCallButtonWidgetSubData=' + quickCallButtonWidgetSubData)

    if (
      this.state.currentScreenQuickCallWidgetSubData ===
      quickCallButtonWidgetSubData
    ) {
      this.setState({ currentScreenQuickCallWidgetSubData: null }) // toggle off
    } else {
      this.setState({
        currentScreenQuickCallWidgetSubData: quickCallButtonWidgetSubData,
      })
    }
  }

  getCurrentScreenQuickCallWidgetSubDataFromState() {
    return this.state.currentScreenQuickCallWidgetSubData
  }

  static _getIndexFromArray(array, item) {
    let index = -1
    for (let i = 0; i < array.length; i++) {
      if (array[i] === item) {
        index = i
        break
      }
    }
    return index
  }

  onClickAutoDial = autoDialButtonWidget => {
    console.log('autoDialButtonWidget=' + autoDialButtonWidget)
    const widgets = this.state.showAutoDialWidgets
    const index = BrekekeOperatorConsole._getIndexFromArray(
      widgets,
      autoDialButtonWidget,
    )
    if (index === -1) {
      // visible autoDialView
      widgets.push(autoDialButtonWidget)
    } else {
      widgets.splice(index, 1)
      // if( widgets.length === 0 ){
      //   //invisible
      // }
    }
    this.setState({ showAutoDialWidgets: widgets }) // for rerender
  }

  // isShowAutoDialView_ver2(){
  //     const b = this.getShowAutoDialWidgetSubDatas_ver2().length !== 0;
  //     return b;
  // }

  onClickAutoDialButton_ver2 = legacyButtonRuntimeSubWidget_autoDialButton => {
    // console.log("onClick LegacyButtonRuntimeSubWidget_autoDialButton=" + legacyButtonRuntimeSubWidget_autoDialButton);
    const subDatas = this.getShowAutoDialWidgetSubDatas_ver2()
    const subData =
      legacyButtonRuntimeSubWidget_autoDialButton.getLegacyButtonSubWidgetData()
    const index = BrekekeOperatorConsole._getIndexFromArray(subDatas, subData)
    if (index === -1) {
      // visible autoDialView_ver2
      const sort = this.getSystemSettingsData().getAutoDialRecentDisplayOrder()
      this._CallHistory2.sortIfNeed(sort)
      subDatas.push(subData)
    } else {
      subDatas.splice(index, 1)
      // if( widgets.length === 0 ){
      //   //invisible
      // }
    }
    this.setState({ showAutoDialWidgetSubDatas_ver2: subDatas }) // for rerender
  }

  addOnBeginSaveEditingScreenFunctionIfNotExists(func) {
    for (let i = 0; i < this._OnBeginSaveEditingScreenFunctions.length; i++) {
      if (this._OnBeginSaveEditingScreenFunctions[i] === func) {
        return false
      }
    }
    this._OnBeginSaveEditingScreenFunctions.push(func)
    return true
  }

  _getCurrentTabDatas() {
    const screen = this.state.screens[this.state.currentScreenIndex]
    const tabDatas = screen.tabDatas
    return tabDatas
  }

  _getCurrentTabData() {
    const tabDatas = this._getCurrentTabDatas()
    const tabData = tabDatas[this.state.currentScreenTabIndex]
    return tabData
  }

  saveEditingScreen = () => {
    for (let i = 0; i < this._OnBeginSaveEditingScreenFunctions.length; i++) {
      const cantSaveMessage = this._OnBeginSaveEditingScreenFunctions[i](this)
      if (cantSaveMessage) {
        Notification.error({ message: cantSaveMessage })
        return
      }
    }

    // const screen = this.state.screens[ this.state.currentScreenIndex ];
    // const tabDatas = screen.tabDatas;

    // const tabIndex = this.state.currentScreenTabIndex;
    // const tabData = tabDatas[ tabIndex ];
    // tabData.widgetDatas = this.state.editingWidgets;

    const newTabDatas = cloneDeep(this.state.editingTabDatas)

    const screens = [...this.state.screens]
    screens[this.state.currentScreenIndex] = {
      // widgets: this.state.editingWidgets,
      background: this.state.editingScreenBackground,
      width: this.state.editingScreenWidth,
      height: this.state.editingScreenHeight,
      grid: this.state.editingScreenGrid,
      foreground: this.state.editingScreenForeground,
      tabDatas: newTabDatas,
    }
    console.log('saving screen', screens[this.state.currentScreenIndex])

    this.setState({ screens }, () => {
      this._syncUp(() => {
        this.setDisplayState(
          brOcDisplayStates.showScreen,
          { screens },
          () => {},
        )
      })
    })
  }

  saveEditingScreen_ver2 = () => {
    for (let i = 0; i < this._OnBeginSaveEditingScreenFunctions.length; i++) {
      const cantSaveMessage = this._OnBeginSaveEditingScreenFunctions[i](this)
      if (cantSaveMessage) {
        Notification.error({ message: cantSaveMessage })
        return
      }
    }

    const clonedScreenData_ver2 = this._editingScreenData_ver2.cloneScreenData()

    this.setState({ screenData_ver2: clonedScreenData_ver2 }, () => {
      this._syncUp(() => {
        this.setDisplayState(brOcDisplayStates.showScreen_ver2, {}, () => {})
      })
    })
  }

  getScreenData_ver2() {
    return this.state.screenData_ver2
  }

  _syncUp = async (onSuccessFunction = () => {}) => {
    // if (!pal) return;
    const systemSettingsData = this.getSystemSettingsData()
    const systemSettingsDataData = systemSettingsData.getData()

    const oScreen_ver2 = this.state.screenData_ver2.getDataAsObject()

    const layoutsAndSettingsData = {
      version: BrekekeOperatorConsole.getAppDataVersion(),
      screens: this.state.screens,
      systemSettings: systemSettingsDataData,
      screen_ver2: oScreen_ver2,
    }

    const shortname = this.getLastLayoutShortname()
    const noteContent = JSON.stringify(layoutsAndSettingsData)
    const noteName = BrekekeOperatorConsole.getOCNoteName(shortname)

    const setNoteOptions = {
      methodName: 'setNote',
      methodParams: JSON.stringify({
        tenant: this.getLoggedinTenant(),
        name: noteName,
        description: '',
        useraccess: BrekekeOperatorConsole.PAL_NOTE_USERACCESSES.ReadWrite,
        note: noteContent,
      }),
      onSuccessFunction: res => {
        console.log('#Duy Phan console saved_data_to_pbx_successfully')
        Notification.success({
          message: i18n.t('saved_data_to_pbx_successfully'),
        })
        // this.setLastSystemSettingsDataData( systemSettingsDataData );
        if (onSuccessFunction) {
          onSuccessFunction()
        }
      },
      onFailFunction: errorOrResponse => {
        console.error('Failed to save data to PBX.', errorOrResponse)
        Notification.error({
          message: i18n.t('failed_to_save_data_to_pbx'),
          content: (
            <>
              <Text>{i18n.t('failed_to_save_data_to_pbx')}</Text>
              <Button
                type='primary'
                size='small'
                onPress={() => {
                  this._syncUp()
                  // Notification.close('sync');
                }}
              >
                {i18n.t('retry')}
              </Button>
            </>
          ),
          duration: 0,
        })
      },
    }

    this.getPalRestApi().callPalRestApiMethod(setNoteOptions)
  }

  setSystemSettingsView(view) {
    this._systemSettingsView = view
  }

  abortEditingScreen = () => {
    this.setDisplayState(brOcDisplayStates.showScreen)
  }

  abortAutoDialView_ver2 = () => {
    this.setState({ showAutoDialWidgetSubDatas_ver2: [] }) // for rerender
  }

  abortSystemSettings = () => {
    this.setDisplayState(brOcDisplayStates.showScreen_ver2)
  }

  setCurrentScreenIndex = index => {
    this.setState({ currentScreenIndex: index })
  }

  onBeforeCurrentScreenIndexChange = index => {
    this.setState({
      showAutoDialWidgets: [],
      currentScreenQuickCallWidget: null,
    })
    this._quickBusy.onBeforeCurrentScreenIndexChange(this, index)
  }
  setQuickBusy = quickBusy => {
    this._quickBusy = quickBusy
  }

  duplicateScreen = () => {
    const screens = [...this.state.screens]
    screens.splice(
      this.state.currentScreenIndex + 1,
      0,
      cloneDeep(screens[this.state.currentScreenIndex]),
    )
    this.setState(
      { screens, currentScreenIndex: this.state.currentScreenIndex + 1 },
      () => {
        this.syncUp()
      },
    )
  }
  addNextScreen = () => {
    const screens = [...this.state.screens]
    screens.splice(
      this.state.currentScreenIndex + 1,
      0,
      cloneDeep(DEFAULT_SCREEN),
    )
    this.setState(
      { screens, currentScreenIndex: this.state.currentScreenIndex + 1 },
      () => {
        this.syncUp()
      },
    )
  }
  addPreviousScreen = () => {
    const screens = [...this.state.screens]
    screens.splice(
      this.state.currentScreenIndex - 1,
      0,
      cloneDeep(DEFAULT_SCREEN),
    )
    this.setState({ screens }, () => {
      this.syncUp()
    })
  }
  removeCurrentScreen = () => {
    if (this.state.screens.length <= 1) {
      Notification.warning({ message: i18n.t('YouCanNotDeleteLastScreen') })
      return
    }

    let newCurrentScreenIndex = this.state.currentScreenIndex
    if (this.state.currentScreenIndex == this.state.screens.length - 1) {
      newCurrentScreenIndex = newCurrentScreenIndex - 1
    }

    const screens = [...this.state.screens]
    screens.splice(this.state.currentScreenIndex, 1)

    this.setCurrentScreenIndex(newCurrentScreenIndex)

    this.setState({ screens }, () => {
      this.syncUp()
    })
  }

  _getSelectingEditingTabData() {
    const tabData = this.state.editingTabDatas[this.state.currentScreenTabIndex]
    return tabData
  }

  _getSelectingEditingWidgetDatas() {
    const tabData = this._getSelectingEditingTabData()
    if (!tabData) {
      return null
    }
    const widgetDatas = tabData.widgetDatas
    return widgetDatas
  }

  onWidgetMoved = (i, x, y) => {
    // const editingWidgets = [...this.state.editingWidgets];
    const editingTabData = this._getSelectingEditingTabData()
    const editingWidgetDatas = [...editingTabData.widgetDatas]
    const rx = x % this.state.editingScreenGrid
    if (rx > this.state.editingScreenGrid * 0.5) {
      x += this.state.editingScreenGrid - rx
    } else {
      x -= rx
    }
    const ry = y % this.state.editingScreenGrid
    if (ry > this.state.editingScreenGrid * 0.5) {
      y += this.state.editingScreenGrid - ry
    } else {
      y -= ry
    }
    editingWidgetDatas[i].x = x
    editingWidgetDatas[i].y = y
    editingTabData.widgetDatas = editingWidgetDatas
    this.state.editingTabDatas[this.state.currentScreenTabIndex] =
      editingTabData // !optimize no need.
    this.setState({ editingTabDatas: this.state.editingTabDatas })
    // this.setState({editingWidgets});
  }
  onWidgetResized = (i, x, y, width, height) => {
    // const editingWidgets = [...this.state.editingWidgets];
    const editingTabData = this._getSelectingEditingTabData()
    const editingWidgets = [...editingTabData.widgetDatas]

    editingWidgets[i].x = x
    editingWidgets[i].y = y
    editingWidgets[i].width = width
    editingWidgets[i].height = height

    editingTabData.widgetDatas = editingWidgets
    this.setState({ editingTabDatas: this.state.editingTabDatas })
    // this.setState({editingWidgets});
  }
  onWidgetRemoved = i => {
    // const widget = this.state.editingWidgets[i];
    // const tWidget = widget.subtype;
    // if( tWidget === "LegacyAutoDialButton" ){
    //     const iW = BrekekeOperatorConsole._getIndexFromArray( this.state.showAutoDialWidgets, widget );
    //     this.state.showAutoDialWidgets.splice( 1, iW );
    //     this.setState( { showAutoDialWidgets:this.state.showAutoDialWidgets});
    // }

    // const editingWidgets = [...this.state.editingWidgets];

    const editingTabDatas = this.state.editingTabDatas
    const editingTabData = editingTabDatas[this.state.currentScreenTabIndex]
    const editingWidgetDatas = editingTabData.widgetDatas

    // const removingWidget = editingWidgets[ i ];
    // const func = removingWidget.OnRemovingWidget;
    // if( func ){
    //   func(this,i);
    // }
    editingWidgetDatas.splice(i, 1)
    this.setState({
      editingTabDatas,
    })
    this.selectWidget(
      this.state.selectingWidgetIndex === i
        ? -1
        : this.state.selectingWidgetIndex,
    )
  }

  removeTabInEditMode(tabIndex) {
    const screen = this.state.screens[this.state.currentScreenIndex]
    if (this.state.editingTabDatas.length == 1) {
      Notification.warning({ message: i18n.t('YouCanNotDeleteLastTab') })
      return
    }

    const editingTabDatas = this.state.editingTabDatas
    editingTabDatas.splice(tabIndex, 1)

    let newSelectingTabIndex
    if (tabIndex == editingTabDatas.length) {
      newSelectingTabIndex = tabIndex - 1
    } else {
      newSelectingTabIndex = tabIndex
    }

    this.setState({
      editingTabDatas,
      currentScreenTabIndex: newSelectingTabIndex,
    })
    // this.setState({ editingTabdatas :  this.state.editingTabDatas, currentScreenTabIndex: newSelectingTabIndex });
  }

  getEditingWidget() {
    if (this.state.selectingWidgetIndex >= 0) {
      const editingWidgetDatasOrg = this._getSelectingEditingWidgetDatas()
      // const editingWidgets = [...editingWidgetDatasOrg];
      // const editingWidget = editingWidgets[this.state.selectingWidgetIndex];
      const editingWidget =
        editingWidgetDatasOrg[this.state.selectingWidgetIndex]
      return editingWidget
    }
    return null
  }

  getEditingWidgets() {
    const editingWidgetDatasOrg = this._getSelectingEditingWidgetDatas()
    const editingWidgets = [...editingWidgetDatasOrg]
    return editingWidgets
  }

  duplicateWidget = i => {
    const editingWidgetDatasOrg = this._getSelectingEditingWidgetDatas()
    const editingWidgets = [...editingWidgetDatasOrg]
    const widget = cloneDeep(editingWidgets[this.state.selectingWidgetIndex])
    widget.x += 25
    widget.y += 25
    editingWidgets.splice(i + 1, 0, widget)
    // this.setState({
    //     editingWidgets
    // });
    const editingTabData = this._getSelectingEditingTabData()
    editingTabData.widgetDatas = editingWidgets
    const editingTabDatas = this.state.editingTabDatas
    editingTabDatas[this.state.currentScreenTabIndex] = editingTabData // !optimize no need
    this.setState({ editingTabDatas })

    this.selectWidget(this.state.selectingWidgetIndex + 1)
  }

  _getEditingNewTabTitle(newTabTitle, currentTabData = undefined) {
    const editingTabDatas = this.state.editingTabDatas
    let tabTitle = newTabTitle
    for (let i = 0; i < editingTabDatas.length; i++) {
      const editingTabData = editingTabDatas[i]
      if (editingTabData === currentTabData) {
        continue
      }
      const currentTabTitle = editingTabData.tabTitle
      if (currentTabTitle === newTabTitle) {
        tabTitle = newTabTitle + ' (2)'
        return this._getEditingNewTabTitle(tabTitle)
      }
    }

    if (tabTitle.length > BrekekeOperatorConsole.TAB_TITLE_MAX_LENGTH) {
      return null
    }

    return tabTitle
  }

  duplicateTabInEditMode() {
    const editingTabDatas = this.state.editingTabDatas
    const editingTabData = editingTabDatas[this.state.currentScreenTabIndex]
    const newTabTitle = this._getEditingNewTabTitle(editingTabData.tabTitle)
    if (newTabTitle === null) {
      Notification.warning({ message: i18n.t('tabTitleIsTooLong.') })
      return
    }

    const newWidgetDatas = [...editingTabData.widgetDatas]
    const newTabData = {
      tabTitle: newTabTitle,
      widgetDatas: newWidgetDatas,
    }
    const insertIndex = this.state.currentScreenTabIndex
    editingTabDatas.splice(insertIndex, 0, newTabData)
    this.setState({ editingTabDatas })
  }

  selectWidget = i => {
    if (
      i !== this.state.selectingWidgetIndex &&
      this.state.selectingWidgetIndex >= 0
    ) {
    }

    this.setState({
      selectingWidgetIndex: i,
      isSelectingTabInEditLayout: false,
    })
  }

  makeWidgetOnTop = i => {
    const editingWidgetDatas = [...this._getSelectingEditingWidgetDatas()]
    const [widget] = editingWidgetDatas.splice(i, 1)
    editingWidgetDatas.push(widget)
    const editingTabDatas = this.state.editingTabDatas
    const editingTabData = editingTabDatas[this.state.currentScreenTabIndex]
    editingTabData.widgetDatas = editingWidgetDatas
    editingTabDatas[this.state.currentScreenTabIndex] = editingTabData // !optimize no need.
    this.setState({
      editingTabDatas,
    })
    this.selectWidget(editingWidgetDatas.length - 1)
  }

  updateSelectingWidgetSettings = settings => {
    // const editingWidgets = [...this.state.editingWidgets];
    const editingWidgetDatas = [...this._getSelectingEditingWidgetDatas()]
    editingWidgetDatas[this.state.selectingWidgetIndex] = {
      ...editingWidgetDatas[this.state.selectingWidgetIndex],
      ...settings,
    }

    const editingTabDatas = this.state.editingTabDatas
    const editingTabData = editingTabDatas[this.state.currentScreenTabIndex]
    editingTabData.widgetDatas = editingWidgetDatas
    editingTabDatas[this.state.currentScreenTabIndex] = editingTabData // !optimize no need
    this.setState({ editingTabDatas })
    // this.setState({editingWidgets});
  }

  // //!obsolute
  // getCurrentCall = () => {
  //     const id = this.getCurrentCallIdForWebphoneCallInfos();
  //     if( !id ){
  //         return null;
  //     }
  //     const call = this._getCallByCallIdForWebphoneCallInfos(id);
  //     return call;
  // }

  getCurrentCallInfo() {
    return this._aphone.getCallInfos().getCurrentCallInfo()
  }

  _getCurrentCallIndex() {
    return this._aphone.getCallInfos().getCurrentCallIndex()
  }

  // !obsolute
  getCurrentCallIdForWebphoneCallInfos() {
    return this._aphone.getCallInfos().getCurrentCallId()
  }

  // //!obsolute
  // _getCallByCallIdForWebphoneCallInfos = (id ) =>{
  //     return this._aphone.getCallInfos().getCallByCallId();
  // }

  switchCallUp = () => {
    const currentCallIndex = this._getCurrentCallIndex()
    if (currentCallIndex > 0) {
      this.holdCall()
      this.setCurrentCallIndex(currentCallIndex - 1)
    }
  }

  setCurrentCallIndex(index) {
    const currentCallIndex = this._getCurrentCallIndex()

    this._aphone.getCallInfos().setCurrentCallIndexByOperatorConsole(index)
    this.setState({ refresh: true })
    if (index === currentCallIndex) {
      return false
    }
    // this._onChangeCurrentCallIndex( index, currentCallIndex  );

    this._onChangeCurrentCallIndex(currentCallIndex, index)

    return true
  }

  _onChangeCurrentCallIndex(currentCallIndex, index) {
    this._resetCallInput()
  }

  // _onChangeCurrentCallIndex(index, prevIndex ){
  //     // let currentCallId;
  //     // if( index !== -1 ) {
  //     //     currentCallId = this._callIds[index];
  //     // }
  //     // else{
  //     //     currentCallId = null;
  //     // }
  //     const callInfos = this._aphone.getCallInfos();
  //     const currentCallId = callInfos.getCallIdByIndex( index );
  //     const prevCallId = callInfos.getCallIdByIndex( prevIndex );
  //
  //     // let prevCallId;
  //     // if( prevIndex !== -1 ){
  //     //     prevCallId = this._callIds[prevIndex];
  //     // }
  //     // else{
  //     //     prevCallId = null;
  //     // }
  //
  //     const options = {
  //         currentCallId : currentCallId,
  //         previousCallId : prevCallId
  //     };
  //
  //     for(let i = 0; i < this._OnChangeCurrentCallIdEventListeners.length; i++ ){
  //         const event = this._OnChangeCurrentCallIdEventListeners[i];
  //         event( options );   //!forBug need tryCatch?
  //     }
  // }

  switchCallDown = () => {
    const currentCallIndex = this._getCurrentCallIndex()
    const callInfoCount = this._aphone.getCallInfos().getCallInfoCount()
    if (currentCallIndex < callInfoCount - 1) {
      this.holdCall()
      this.setCurrentCallIndex(currentCallIndex + 1)
    }
  }

  // getCallIndexByCallId = (callId ) =>{
  //     const index = this._callIds.indexOf( callId );
  //     return index;
  // }

  switchCallIndex = index => {
    const currentCallIndex = this._getCurrentCallIndex()
    if (currentCallIndex === index) {
      return false
    }
    this.holdCall()
    this.setCurrentCallIndex(index)
    return true

    // const ok = this.switchCallIndexWithoutHold( index )
    // if( ok ) {
    //     this.holdCall();
    // }
  }

  switchCallIndexWithoutHold = index => {
    if (this._getCurrentCallIndex() === index) {
      return false
    }
    this.setCurrentCallIndex(index)
    return true
  }

  monitorDialingExtension = async () => {
    if (this._aphone.isPalReady()) {
      const extStatus = this.state.extensionsStatus[this.state.dialing]
      if (!extStatus) {
        Notification.error({
          message: i18n.t('talking_monitored_extension_required'),
        })
        return
      }
      const talker_id = Object.keys(extStatus.callStatus).find(
        talker_id => extStatus.callStatus[talker_id] === 'talking',
      )
      if (!talker_id) {
        Notification.error({
          message: i18n.t('talking_monitored_extension_required'),
        })
        return
      }

      const tenant = this.state.loginUser?.pbxTenant
      const user = this.state.dialing
      await this._aphone.bargeAsync(tenant, user, talker_id).catch(err => {
        console.error('Failed to monitor extension.', err)
        Notification.error({ message: i18n.t('failed_to_monitor_extension') })
        throw err
      })
      this.setState({ monitoringExtension: this.state.dialing })
    }
  }

  joinConversation = () => {
    const currentCallInfo = this._aphone.getCallInfos().getCurrentCallInfo()
    if (!currentCallInfo) {
      return
    }
    currentCallInfo.conference()
  }

  appendKeypadValue = key => {
    let dialing = this.state.dialing + key
    if (this._isDTMFInput === true) {
      const bSend = this.sendDTMFIfNeed(key)
      if (!bSend) {
        return
      }
      if (dialing.length > BrekekeOperatorConsole.DIALING_MAX_LENGTH) {
        dialing = dialing.substring(
          dialing.length - BrekekeOperatorConsole.DIALING_MAX_LENGTH,
          dialing.length,
        )
      }
    } else {
      if (dialing.length > BrekekeOperatorConsole.DIALING_MAX_LENGTH) {
        return
      }
    }
    this.setState({ dialing }, () => this._onAppendKeypadValue(key))
  }

  _onAppendKeypadValue(key) {
    for (let i = 0; i < this._OnAppendKeypadValueCallbacks.length; i++) {
      const func = this._OnAppendKeypadValueCallbacks[i]
      func(this, key)
    }
  }

  addOnAppendKeypadValueCallback(func) {
    this._OnAppendKeypadValueCallbacks.push(func)
  }

  setDialingAndMakeCall = (sDialing, context) => {
    this.setState({ dialing: sDialing }, () => {
      if (context) {
        context.makeCall()
      } else {
        this.makeCall()
      }
    })
  }

  setDialing = sDialing => {
    this.setState({ dialing: sDialing })
  }

  setDialingAndMakeCall2 = sDialing => {
    this.setState({ dialing: sDialing }, () => this.makeCall2())
  }

  backspaceKeypadValue = () => {
    if (this._isDTMFInput === true) {
      return
    }

    if (!this.state.dialing || this.state.dialing.length == 0) {
      return
    }
    const dialing = this.state.dialing.slice(0, -1)
    this.setState({ dialing }, () => this._onBackspaceKeypadVakue())
  }

  _onBackspaceKeypadVakue() {
    const callbacks = this._OnBackspaceKeypadValueCallbacks
    for (let i = 0; i < callbacks.length; i++) {
      const func = callbacks[i]
      func(this)
    }
  }

  addOnbackspaceKeypadValueCallback = func => {
    this._OnBackspaceKeypadValueCallbacks.push(func)
  }

  onRemoveCallInfoByCallInfos(callInfosAsCaller, callInfo) {
    this.setState({ refresh: true })

    this._CallHistory2.onRemoveCallInfoForCallHistory2(this, callInfo)

    const options = {
      callInfo,
    }
    // this._BusylightStatusChanger.onRemoveCall( options );  //!dev
    for (let i = 0; i < this._OnRemoveCallInfoEventListeners.length; i++) {
      const event = this._OnRemoveCallInfoEventListeners[i]
      event(options) // !forBug need tryCatch?
    }
  }

  setOnUnholdCallInfoEventListener(function_) {
    const index = this._OnUnholdCallInfoEventListeners.indexOf(function_)
    if (index !== -1) {
      return false
    }
    this._OnUnholdCallInfoEventListeners.push(function_)
    return true
  }

  removeOnUnholdCallInfoEventListener(function_) {
    const removedIndex = Util.removeItemFromArray(
      this._OnUnholdCallInfoEventListeners,
      function_,
    )
    return removedIndex
  }

  _clearOnUnholdCallInfoEventListeners() {
    this._OnUnholdCallInfoEventListeners.splice(0)
  }

  setOnHoldCallInfoEventListener(function_) {
    const index = this._OnHoldCallInfoEventListeners.indexOf(function_)
    if (index !== -1) {
      return false
    }
    this._OnHoldCallInfoEventListeners.push(function_)
    return true
  }

  removeOnHoldCallInfoEventListener(function_) {
    const removedIndex = Util.removeItemFromArray(
      this._OnHoldCallInfoEventListeners,
      function_,
    )
    return removedIndex
  }

  _clearOnHoldCallInfoEventListeners() {
    this._OnHoldCallInfoEventListeners.splice(0)
  }

  onAnswerIncomingCallByCallInfo(callInfoAsCaller) {
    this._CallHistory.addCallNoAndSave(callInfoAsCaller.getPartyNumber())
  }

  onAddCallInfoByCallInfos(callInfos, callInfo) {
    const callStatus = callInfo.getCallStatus()
    if (callStatus === ACallInfo.CALL_STATUSES.calling) {
      this._CallHistory.addCallNoAndSave(callInfo.getPartyNumber())
    }

    this.setState({ refresh: true })

    this._CallHistory2.onAddCallInfoForCallHistory2(this, callInfo)

    const options = {
      callInfo,
    }
    // this._BusylightStatusChanger.onInsertCall( options );  //!dev
    for (let i = 0; i < this._OnAddCallInfoEventListeners.length; i++) {
      const event = this._OnAddCallInfoEventListeners[i]
      event(options) // !forBug need tryCatch?
    }
  }

  // onUpdateWebphoneCallObjectPropertyByWebphoneCallInfos( webphoneCallInfosAsCaller, webphoneCallObject, field, val ){
  //     this.setState({refresh:true});
  //     const options = {
  //         call : webphoneCallObject,
  //         field: field,
  //         value: val
  //     };  //!forBug need copy objects/array?
  //     for(let i = 0; i < this._OnChangeCallEventListeners.length; i++ ){
  //         const event = this._OnChangeCallEventListeners[i];
  //         event( options );   //!forBug need tryCatch?
  //     }
  // }

  setOnAddCallInfoEventListener(function_) {
    const index = this._OnAddCallInfoEventListeners.indexOf(function_)
    if (index !== -1) {
      return false
    }
    this._OnAddCallInfoEventListeners.push(function_)
    return true
  }

  removeOnAddCallInfoEventListener(function_) {
    const removedIndex = Util.removeItemFromArray(
      this._OnAddCallInfoEventListeners,
      function_,
    )
    return removedIndex
  }

  _clearOnAddCallInfoEventListeners() {
    this._OnAddCallInfoEventListeners.splice(0)
  }

  setOnRemoveCallInfoEventListener(function_) {
    const index = this._OnRemoveCallInfoEventListeners.indexOf(function_)
    if (index !== -1) {
      return false
    }
    this._OnRemoveCallInfoEventListeners.push(function_)
    return true
  }

  removeOnRemoveCallInfoEventListener(function_) {
    const removedIndex = Util.removeItemFromArray(
      this._OnRemoveCallInfoEventListeners,
      function_,
    )
    return removedIndex
  }

  _clearOnRemoveCallInfoEventListeners() {
    this._OnRemoveCallInfoEventListeners.splice(0)
  }

  // setOnChangeCurrentCallIdEventListener(function_ ){
  //     const index = this._OnChangeCurrentCallIdEventListeners.indexOf( function_ );
  //     if( index !== -1 ){
  //         return false;
  //     }
  //     this._OnChangeCurrentCallIdEventListeners.push( function_ );
  //     return true;
  // }

  // removeOnChangeCurrentCallIdEventListener( function_ ){
  //     const removedIndex = Util.removeItemFromArray( this._OnChangeCurrentCallIdEventListeners, function_ );
  //     return removedIndex;
  // }

  // clearOnChangeCurrentCallIdEventListeners(){
  //     this._OnChangeCurrentCallIdEventListeners.splice(0);
  // }

  _clearAllEventListenersForEx() {
    // this.clearOnChangeCallEventListeners();
    // this.clearOnChangeCurrentCallIdEventListeners();

    this._clearOnUnloadExtensionScriptEventListeners()
    this._clearOnRemoveCallInfoEventListeners()
    this._clearOnAddCallInfoEventListeners()
    this._clearOnUpdateCallInfoEventListeners()
    this._clearOnUnholdCallInfoEventListeners()
    this._clearOnHoldCallInfoEventListeners()
  }

  reloadSystemSettingsExtensionScript() {
    const systemSettingsData = this.state.systemSettingsData
    const script = systemSettingsData.getExtensionScript()
    this._onUnloadExtensionScript()
    // eval( script );
    try {
      eval(script)
    } catch (err) {
      console.error(
        i18n.t('anExtensionScriptExecutingErrorHasOccurred') + '. error=',
        err,
      )
      Notification.error({
        message:
          i18n.t('anExtensionScriptExecutingErrorHasOccurred') + '\r\n' + err,
        duration: 0,
      })
      return
    }
  }

  _onUnloadExtensionScript() {
    for (
      let i = 0;
      i < this._OnUnloadExtensionScriptEventListeners.length;
      i++
    ) {
      const event = this._OnUnloadExtensionScriptEventListeners[i]
      try {
        event()
      } catch (err) {
        console.error(
          i18n.t('anExtensionScriptUnloadingErrorHasOccurred') + '. error=',
          err,
        )
        Notification.error({
          message:
            i18n.t('anExtensionScriptUnloadingErrorHasOccurred') + '\r\n' + err,
          duration: 0,
        })
      }
    }
    this._clearAllEventListenersForEx()
  }

  setOnUnloadExtensionScriptEventListener(function_) {
    const index = this._OnUnloadExtensionScriptEventListeners.indexOf(function_)
    if (index !== -1) {
      return false
    }
    this._OnUnloadExtensionScriptEventListeners.push(function_)
    return true
  }

  removeOnUnloadExtensionScriptEventListener(function_) {
    const removedIndex = Util.removeItemFromArray(
      this._OnUnloadExtensionScriptEventListeners,
      function_,
    )
    return removedIndex
  }

  _clearOnUnloadExtensionScriptEventListeners() {
    this._OnUnloadExtensionScriptEventListeners.splice(0)
  }

  // setOnChangeCallEventListener(function_ ){
  //     const index = this._OnChangeCallEventListeners.indexOf( function_ );
  //     if( index !== -1 ){
  //         return false;
  //     }
  //     this._OnChangeCallEventListeners.push( function_ );
  //     return true;
  // }

  // removeOnChangeCallEventListener(function_ ){
  //     const removedIndex = Util.removeItemFromArray( this._OnChangeCallEventListeners, function_ );
  //     return removedIndex;
  // }

  // clearOnChangeCallEventListeners(){
  //     this._OnChangeCallEventListeners.splice(0);
  // }

  _resetCallInput() {
    const callInfos = this._aphone.getCallInfos()
    const currentCallIndex = callInfos.getCurrentCallIndex()
    const bDisconnected = currentCallIndex < 0
    if (bDisconnected) {
      this._clearDialing()
      this._isDTMFInput = false
      return
    }
    const currentCallInfo = callInfos.getCallInfoAt(currentCallIndex)

    const callStatus = currentCallInfo.getCallStatus()
    const prevCallStatus = this._prevCurrentCallStatus
    if (callStatus === prevCallStatus) {
      return
    }

    this._prevCurrentCallStatus = callStatus

    // !ref to 202404240424
    switch (callStatus) {
      case ACallInfo.CALL_STATUSES.talking:
      case ACallInfo.CALL_STATUSES.calling:
        this._clearDialing()
        this._isDTMFInput = true
        break
      case ACallInfo.CALL_STATUSES.holding:
      case ACallInfo.CALL_STATUSES.incoming:
        this._clearDialing()
        this._isDTMFInput = false
        break
      default:
        console.error('Could not reset CallInput!')
        break
    }

    // Not need.
    // this.setState({refresh:true} );
  }

  // !callme
  onUpdateCallInfoByCallInfo = callInfoAsCaller => {
    this._resetCallInput()
    this.setState({ refresh: true })

    this._CallHistory2.onUpdateCallInfoForCallHistory2(this, callInfoAsCaller)

    const options = {
      callInfo: callInfoAsCaller,
    }
    // this._BusylightStatusChanger.onUpdateCall( options );   //!dev
    for (let i = 0; i < this._OnUpdateCallInfoEventListeners.length; i++) {
      const event = this._OnUpdateCallInfoEventListeners[i]
      event(options) // !forBug need tryCatch?
    }
  }

  // !callme
  onCallSuccessByPalCallInfo(palCallInfoAsCaller) {
    this._resetCallInput()
  }

  // !callme
  onHoldByCallInfo(callInfoAsCaller) {
    this._resetCallInput()
    this.setState({ refresh: true })

    const options = {
      callInfo: callInfoAsCaller,
    }
    // this._BusylightStatusChanger.onInsertCall( options );  //!dev
    for (let i = 0; i < this._OnHoldCallInfoEventListeners.length; i++) {
      const event = this._OnHoldCallInfoEventListeners[i]
      event(options) // !forBug need tryCatch?
    }
  }

  // !callme
  onUnholdByCallInfo(callInfoAsCaller) {
    this._resetCallInput()
    this.setState({ refresh: true })

    const options = {
      callInfo: callInfoAsCaller,
    }
    // this._BusylightStatusChanger.onInsertCall( options );  //!dev
    for (let i = 0; i < this._OnUnholdCallInfoEventListeners.length; i++) {
      const event = this._OnUnholdCallInfoEventListeners[i]
      event(options) // !forBug need tryCatch?
    }
  }

  setOnUpdateCallInfoEventListener(function_) {
    const index = this._OnUpdateCallInfoEventListeners.indexOf(function_)
    if (index !== -1) {
      return false
    }
    this._OnUpdateCallInfoEventListeners.push(function_)
    return true
  }

  removeOnUpdateCallInfoEventListener(function_) {
    const removedIndex = Util.removeItemFromArray(
      this._OnUpdateCallInfoEventListeners,
      function_,
    )
    return removedIndex
  }

  _clearOnUpdateCallInfoEventListeners() {
    this._OnUpdateCallInfoEventListeners.splice(0)
  }

  toggleCallRecording = () => {
    const currentCallInfo = this._aphone.getCallInfos().getCurrentCallInfo()
    if (currentCallInfo) {
      const promise = currentCallInfo.toggleRecordingAsync()
      promise
        .then(result => {})
        .catch(errMsg => {
          Notification.error({ message: errMsg, duration: 0 })
        })
        .finally(() => {
          this.setState({ refresh: true })
        })
    }
  }

  toggleCallMuted = () => {
    const currentCallInfo = this._aphone.getCallInfos().getCurrentCallInfo()
    if (currentCallInfo) {
      const promise = currentCallInfo.toggleMutedAsync()
      promise
        .then(result => {})
        .catch(errMsg => {
          Notification.error({ message: errMsg, duration: 0 })
        })
        .finally(() => {
          this.setState({ refresh: true })
        })
    }
  }

  toggleAutoRejectIncoming = () => {
    this.setState({ autoRejectIncoming: !this.state.autoRejectIncoming })
  }

  getAutoRejectIncoming() {
    return this.state.autoRejectIncoming
  }

  resumeCall = () => {
    const currentCallInfo = this._aphone.getCallInfos().getCurrentCallInfo()
    if (currentCallInfo && currentCallInfo.getIsHolding()) {
      currentCallInfo.toggleHoldWithCheck()
    }
  }

  holdCall = () => {
    const currentCallInfo = this._aphone.getCallInfos().getCurrentCallInfo()
    if (!currentCallInfo) {
      return false
    }
    if (currentCallInfo.getIsHolding()) {
      return false
    }

    const status = currentCallInfo.getCallStatus()
    if (
      status === ACallInfo.CALL_STATUSES.calling ||
      status === ACallInfo.CALL_STATUSES.incoming
    ) {
      return false
    }

    currentCallInfo.toggleHoldWithCheck()
    // this.setState({dialing: ''});
  }

  hangUpCall = () => {
    const currentCallInfo = this._aphone.getCallInfos().getCurrentCallInfo()
    if (currentCallInfo) {
      currentCallInfo.hangup()
    }
  }

  answerCall = () => {
    const currentCallInfo = this._aphone.getCallInfos().getCurrentCallInfo()
    if (currentCallInfo && !currentCallInfo.getIsAnswered()) {
      currentCallInfo.answerCall()
      // const callerNo = currentCallInfo.getPartyNumber();
      // this._CallHistory.addCallNoAndSave(callerNo);
    }
  }

  transferDialingCall = async () => {
    const mode = undefined // use attended
    this.transferCall(this.state.dialing, mode).then(() => {
      this._clearDialing() // !todo I want to run it after the transfer is complete.
    })
  }

  transferCall = async (dialing, mode, callInfo: any = undefined) => {
    if (!callInfo) {
      callInfo = this._aphone.getCallInfos().getCurrentCallInfo()
    }
    if (!callInfo) {
      return false
    }
    // const tenant = callInfo.pbxTenant;
    const tenant = undefined // !testit
    const talkerId = callInfo.getPbxTalkerId()
    await this.transferCallCore(
      dialing,
      mode,
      talkerId,
      tenant,
      (this_, message) => {
        if (mode === 'blind') {
          if (message && message.toLowerCase().startsWith('fail')) {
            // !fail
          } else {
            callInfo.hangup()
          }
        }
      },
    )

    return true
  }

  transferCallCore = async (dialing, mode, talkerId, tenant, onDoneFunc) => {
    if (this._aphone.isPalReady() && dialing) {
      const promise = this._aphone.transferAsync(
        tenant,
        dialing,
        talkerId,
        mode,
      )
      await promise
        .then(message => {
          console.log('transferCallCore. result message=' + message)
          if (onDoneFunc) {
            onDoneFunc(this, message)
          }
        })
        .catch(err => {
          console.error('Failed to transfer call.', err)
          Notification.error({
            message: i18n.t('failed_to_transfer_call'),
            duration: 0,
          })
          throw err
        })
    } else {
      // !testit
      console.error(
        'Failed to transfer call. isPalReady=' +
          this._aphone.isPalReady() +
          ',dialing=' +
          dialing,
      )
      Notification.error({
        message: i18n.t('failed_to_transfer_call'),
        duration: 0,
      })
    }
  }

  _isSendDTMFChar(key) {
    if (!key || key.length !== 1) {
      return false
    }
    const b = BrekekeOperatorConsole.DTMF_CHARS.indexOf(key) !== -1
    return b
  }

  sendDTMFIfNeed = key => {
    if (this._isDTMFInput !== true) {
      return false
    }

    const currentCallInfo = this._aphone.getCallInfos().getCurrentCallInfo()
    if (!currentCallInfo) {
      return false
    }
    const bNeedSendDTMF = this._isSendDTMFChar(key)
    // if (this._aphone.isPalReady() && currentCallInfo) {
    if (bNeedSendDTMF) {
      // const tenant = currentCall.pbxTenant;
      const tenant = undefined // !testit
      const signal = key
      const talker_id = currentCallInfo.getPbxTalkerId()
      this._aphone.sendDTMF(tenant, talker_id, signal)
    }
    return bNeedSendDTMF
  }

  makeCallWithShortDial = async context => {
    const dialing = this.state.dialing

    // Search short dial
    const shortDials = this.getSystemSettingsData().getShortDials()
    if (dialing && shortDials) {
      for (let i = 0; i < shortDials.length; i++) {
        const shortDialObject = shortDials[i]
        const shortDial = shortDialObject.shortDial
        if (shortDial === dialing) {
          const dial = shortDialObject.dial
          this.setDialingAndMakeCall(dial, context)
          return
        }
      }
    }
    await this.makeCall()
  }

  // findCallByTalkerId= ( talkerId  ) =>{
  //     const calls = Object.values( this.callById );
  //     const itm = calls.find( ( element ) =>{
  //         if( element.pbxTalkerId === talkerId ){
  //             return true;
  //         }
  //         return false;
  //     });
  //     return itm;
  // }

  makeCall2 = async () => {
    const sDialing = this.state.dialing
    if (!sDialing) {
      return false
    }
    console.log('makeCall: sDialing=' + sDialing)
    // this._CallHistory.addCallNoAndSave(sDialing);

    const bUsingLine = this.state.usingLine

    // const bCall = this._aphone.callByPhoneClient(  sDialing, bUsingLine );
    // if( !bCall ){
    //     return false;
    // }
    this._aphone.callByPhoneClient(sDialing, bUsingLine)

    this._clearDialing()
    if (this.state.currentScreenQuickCallWidget) {
      this.setDisplayState(brOcDisplayStates.showScreen, {
        currentScreenQuickCallWidget: null,
      })
    }
    // this.setState({isCalling:true});
    return true
  }

  _clearDialing() {
    this.setState({ dialing: '' }, () => this._onClearDialing())
  }

  _onClearDialing() {
    for (let i = 0; i < this._OnClearDialingCallbacks.length; i++) {
      const callback = this._OnClearDialingCallbacks[i]
      callback(this)
    }
  }

  makeCall = async () => {
    // const {currentCallIndex, callIds = [], callById = {}} = context;
    await this.makeCall2()
  }

  handleLine = async line => {
    const { line_talker = '', room_id = '' } =
      this.state.linesStatus[line] || {}
    const park = this.state.parksStatus[line]
    if (park) {
      this._aphone.callByPhoneClient(line)
      return
    }

    // const lineCall = Object.values(this.callById).find((call) => call.pbxRoomId === room_id)
    const callInfos = this._aphone.getCallInfos()
    const lineCallInfo = callInfos.getCallInfoWherePbxRoomIdEqual(room_id)
    if (lineCallInfo) {
      if (lineCallInfo.getIsIncoming() && !lineCallInfo.getIsAnswered()) {
        const currentCallInfo = callInfos.getCurrentCallInfo()
        // if( !currentCallInfo ){
        //     const callIndex = callInfos.getCallIndexWhereCallIdEqual( lineCallInfo.getCallId() );
        //     callInfos.setCurrentCallIndex( callIndex );
        //     this.resumeCall();
        // }
        // else if ( currentCallInfo.getCallId() !== lineCallInfo.getCallId()) {
        if (currentCallInfo.getCallId() !== lineCallInfo.getCallId()) {
          if (currentCallInfo.getIsAnswered()) {
            this.holdCall()
          }
          const callIndex = callInfos.getCallIndexWhereCallIdEqual(
            lineCallInfo.getCallId(),
          )
          this.setCurrentCallIndex(callIndex)
          // this.resumeCall();
        }
        lineCallInfo.answerCall()
      } else if (lineCallInfo.getIsAnswered) {
        const tenant = this.state.loginUser.pbxTenant
        const talkerId = lineCallInfo.getPbxTalkerId()
        const number = line

        const promise = this._aphone.parkAsync(tenant, talkerId, number)
        await promise.catch(err => {
          console.error('Failed to park call.', err)
          Notification.error({
            message: i18n.t('failed_to_park_call'),
            duration: 0,
          })
          throw err
        })
        const myParksStatus = { ...this.state.myParksStatus, [line]: true }
        this.setState({ myParksStatus })
      }

      return
    }

    if (line_talker) {
      if (line_talker === this.state.loginUser.pbxUsername) {
        const promise = this._aphone.lineAsync(line, 'off')
        await promise.catch(err => {
          console.error('Failed to unhold line.', err)
          Notification.error({
            message: i18n.t('failed_to_unhold_line'),
            duration: 0,
          })
          throw err
        })
        this.setState({ usingLine: '' })
      }
    } else {
      if (this.state.usingLine) {
        const line_ = this.state.usingLine
        const promise = this._aphone.lineAsync(line_, 'off')
        await promise.catch(err => {
          console.error('Failed to unhold line.', err)
          Notification.error({
            message: i18n.t('failed_to_unhold_line'),
            duration: 0,
          })
          throw err
        })
        this.setState({ usingLine: '' })
      }
      const promise = this._aphone.lineAsync(line, 'on')
      await promise.catch(err => {
        console.error('Failed to hold line.', err)
        Notification.error({
          message: i18n.t('failed_to_hold_line'),
          duration: 0,
        })
        throw err
      })
      this.setState({ usingLine: line })
    }
  }

  isAphoneNull() {
    const b = this._aphone === null
    return b
  }

  handlePark = async number => {
    if (!number) {
      return
    }

    if (this.state.parksStatus[number]) {
      this.holdCall()
      this._aphone.callByPhoneClient(number)
      return
    }

    const currentCallInfo = this._aphone.getCallInfos().getCurrentCallInfo()
    if (currentCallInfo) {
      const tenant = this.state.loginUser.pbxTenant
      const talkerId = currentCallInfo.getPbxTalkerId()
      const promise = this._aphone.parkAsync(tenant, talkerId, number)
      await promise.catch(err => {
        console.error('Failed to park call.', err)
        Notification.error({
          message: i18n.t('failed_to_park_call'),
          duration: 0,
        })
        throw err
      })

      const myParksStatus = { ...this.state.myParksStatus, [number]: true }
      this.setState({ myParksStatus })
    }
  }

  // _flushLineStatusEvents() {
  //
  // }

  _onBeforeUnloadMain(event) {
    // const phoneClient = this.getPhoneClient();
    // let hasCall;
    // if( phoneClient ){
    //     hasCall = phoneClient.getCallInfos().getCallInfoCount() !== 0;
    // }
    // else{
    //     hasCall = false;
    // }
    // if( hasCall ) {
    //     event.preventDefault();
    //     event.returnValue = i18n.t("areYouSureLeaveThePage");
    // }
    event.preventDefault()
    event.returnValue = i18n.t('areYouSureLeaveThePage')
  }

  _onBeforeUnload(event) {
    this._onBeforeUnloadMain(event)
  }

  _onUnload(event) {
    console.log('OperatorConsole:onUnload. this.aphone=' + this._aphone)
    this._CallHistory2.onUnloadForCallHistory2(this, event)
    this._deinitAphoneClient()
    this._deinitPalWrapper()
  }

  _deinitPalWrapper() {
    if (this._loggedinPal) {
      this._loggedinPal.close()
      this._loggedinPal = null
    }
    this._LoginPalWrapper.deinitPalWrapper()
  }

  // onPalNotifyStatus( options ){
  //     for(let i = 0; i < this._OnPalNotifyStatusEventListeners.length; i++ ){
  //         const event = this._OnPalNotifyStatusEventListeners[i];
  //         event( options );   //!forBug need tryCatch?
  //     }
  // }

  // setOnPalNotifyStatusEventListener(function_ ){
  //     const index = this._OnPalNotifyStatusEventListeners.indexOf( function_ );
  //     if( index !== -1 ){
  //         return false;
  //     }
  //     this._OnPalNotifyStatusEventListeners.push( function_ );
  //     return true;
  // }

  // removeOnPalNotifyStatusEventListener( function_ ){
  //     const removedIndex = Util.removeItemFromArray( this._OnPalNotifyStatusEventListeners, function_ );
  //     return removedIndex;
  // }

  // clearOnPalNotifyStatusEventListeners(){
  //     this._OnPalNotifyStatusEventListeners.splice(0);
  // }

  _setOCNoteFailAtDownLayoutAndSystemSettings(
    e,
    downLayoutAndSystemSettingsFailFunction,
  ) {
    // !testit
    if (Array.isArray(e)) {
      for (let i = 0; i < e.length; i++) {
        const err = e[i]
        console.error('setOCNote failed. errors[' + i + ']=', err)
      }
    } else {
      console.error('setOCNote failed. error=', e)
    }
    try {
      const sError = JSON.stringify(e)
      Notification.error({
        message: i18n.t('failed_to_save_data_to_pbx') + '\r\n' + sError,
        duration: 0,
      })
    } catch (err) {
      Notification.error({
        message: i18n.t('failed_to_save_data_to_pbx') + '\r\n' + e,
        duration: 0,
      })
    }
    // Notification.error({message: i18n.t('failed_to_save_data_to_pbx') , duration:0 });

    // let message = eventArg ? eventArg.message : "";
    // if (!message) {
    //     message = "";
    // }
    // console.error("Failed to setOCNote.", message);
    // if (message) {
    //     Notification.error({message: message,duration:0});
    // }
    // throw new Error(message);

    // console.warn("Failed to getNote." , err );
    // this.setState({ error: true })
    // this.setState( { error:true, _downedLayoutAndSystemSettings:true, displayState:bcOcDisplayStates.noScreens } );   //!need?
    this._removeLastLayoutShortname() // !reset
    this.setState({ displayState: brOcDisplayStates.noScreens }, () =>
      downLayoutAndSystemSettingsFailFunction(),
    )
    // throw err;
  }

  isInitialized() {
    return this.state.isInitialized
  }

  _downLayoutAndSystemSettingsForLoggedin(
    downLayoutAndSystemSettingsSuccessFunction,
    downLayoutAndSystemSettingsFailFunction,
  ) {
    if (!this._loggedinPal || this.state._downedLayoutAndSystemSettings) {
      downLayoutAndSystemSettingsFailFunction({
        message: i18n.t('CouldNotDownloadLayoutAndSystemSettings'),
      })
      return false
    }

    this._getLastLayoutShortname().then(layoutShortname => {
      if (layoutShortname) {
        const layoutFullname = this._getLayoutFullname(layoutShortname)
        const getNoteOptions = {
          tenant: this.state.loginUser.pbxTenant,
          name: layoutFullname,
        }
        const this_ = this
        this._loggedinPal.getNote(
          getNoteOptions,
          (res, obj) => {
            const sNote = res.note
            const oNote = JSON.parse(sNote)
            this_.setOCNote(
              layoutShortname,
              oNote,
              () => {
                this_.setState(
                  {
                    _downedLayoutAndSystemSettings: true,
                    displayState: brOcDisplayStates.showScreen_ver2,
                  },
                  () => {
                    downLayoutAndSystemSettingsSuccessFunction()
                  },
                )
              },
              e => {
                this_._setOCNoteFailAtDownLayoutAndSystemSettings(
                  e,
                  downLayoutAndSystemSettingsFailFunction,
                )
              },
            )
          },
          err => {
            console.warn('Failed to getNote. error=', err)
            this_._removeLastLayoutShortname() // !reset
            this_.setState({ displayState: brOcDisplayStates.noScreens })
          },
        )
      } else {
        this.setState({ displayState: brOcDisplayStates.noScreens })
      }
    })

    return false
  }

  getDefaultSystemSettingsData() {
    return this._defaultSystemSettingsData
  }

  static getStaticInstance() {
    return BREKEKE_OPERATOR_CONSOLE
  }

  setI18nLocaleByWebphonePhoneClient(locale) {
    i18n.locale = isValidLocale(locale) ? locale : DEFAULT_LOCALE
  }

  onPalNotifyServerstatusByWebphonePhoneClient(e) {
    this._Campon.onPalNotifyServerstatus(this, e)
  }

  getExtensionsStatus() {
    const o = this.state.extensionsStatus
    return o
  }

  getUccacWrapper() {
    return this._UccacWrapper
  }

  getMonitoringExtension() {
    const o = this.state.monitoringExtension
    return o
  }

  getUsingLine() {
    const o = this.state.usingLine
    return o
  }

  getLinesStatus() {
    const o = this.state.linesStatus
    return o
  }

  getParksStatus() {
    const o = this.state.parksStatus
    return o
  }

  getMyParksStatus() {
    const o = this.state.myParksStatus
    return o
  }

  setParksStatusAndMyParksStatus(parksStatus, myParksStatus) {
    this.setState({ parksStatus, myParksStatus })
  }

  setExtensionsStatusAndMonitoringExtension(
    extensionsStatus,
    monitoringExtension,
  ) {
    this.setState({ extensionsStatus, monitoringExtension })
  }

  setLinesStatusAndUsingLine(linesStatus, usingLine) {
    this.setState({ linesStatus, usingLine })
  }

  onLoggedinByLogin(
    loggedinPal,
    pbxHost,
    pbxPort,
    tenant,
    user,
    password,
    isAdmin,
    language,
  ) {
    this._loggedinPal = loggedinPal
    i18n.locale = isValidLocale(language) ? language : DEFAULT_LOCALE
    const this_ = this
    const loginUser = {
      pbxHost,
      pbxPort,
      pbxUsername: user,
      pbxTenant: tenant,
      pbxPassword: password,
      language,
      isAdmin,
    }
    this.setState(
      {
        loginUser,
        isInitialized: true,
        systemSettingsData: new SystemSettingsData(this),
      },
      () => {
        //            this.syncDownScreens();
        //            this._syncDownLayout();
        const fileRootUrl = ''
        const filesFileUrl = 'components/button/icons/default/filenames.txt'
        const loadDefaultButtonImageFileInfosOptions = {
          filesFileUrl,
          timeoutMillisecond: 60000,
          loadSuccessFunction: options => {
            this._startDownLayoutAndSystemSettingsForLoggedin()
          },
          loadFailFunction: options => {
            const xhrFail = options['xhrFail']
            // const filesfile = options["filesFile"];
            const httpStatus = xhrFail.status
            if (httpStatus !== 404) {
              // defined
              console.error(
                'Failed to load file list. requestOptions=',
                loadDefaultButtonImageFileInfosOptions,
                ',responseOptions=',
                options,
              )
              Notification.error({
                message: i18n.t('FailedToLoadFileList') + '\r\n' + fileRootUrl,
                duration: 0,
              })
            }
            this._startDownLayoutAndSystemSettingsForLoggedin()
          },
          loadErrorFunction: options => {
            console.error(
              'An error occurred while loading the file list. requestOptions=',
              loadDefaultButtonImageFileInfosOptions,
              ',responseOptions=',
              options,
            )
            // Notification.error({
            //   message:
            //     i18n.t('AnErrorOccurredWhileLoadingTheFileList') +
            //     '\r\n' +
            //     fileRootUrl,
            //   duration: 0,
            // })
            this._startDownLayoutAndSystemSettingsForLoggedin()
          },
          loadTimeoutFunction: options => {
            console.error(
              'Loading the file list timed out. requestOptions=',
              loadDefaultButtonImageFileInfosOptions,
              ',responseOptions=',
              options,
            )
            Notification.error({
              message:
                i18n.t('LoadingTheFileListTimedOut') + '\r\n' + fileRootUrl,
              duration: 0,
            })
            this._startDownLayoutAndSystemSettingsForLoggedin()
          },
        }
        // Todo
        this._DefaultButtonImageFileInfos.load(
          loadDefaultButtonImageFileInfosOptions,
        )
      },
    )
  }

  _startDownLayoutAndSystemSettingsForLoggedin() {
    this._downLayoutAndSystemSettingsForLoggedin(
      () => {},
      () => {},
    )
  }

  getIsAdmin() {
    return this.getLoggedinUserIsAdmin()
  }

  getLoggedinUserIsAdmin() {
    const loginUser = this.state.loginUser
    if (!loginUser) {
      console.warn('loginUser is undefined.')
      return false
    }
    const isAdmin = loginUser.isAdmin
    return isAdmin
  }

  setIsAdminByWebphonePhoneClient(bool) {
    this.setState({ isAdmin: bool })
  }

  // getOCNoteNamesPromise(){
  //     const loginUser = this.state.loginUser;
  //     const tenant = loginUser?.pbxTenant;
  //     const filter = BrekekeOperatorConsole.LAYOUT_NOTE_NAME_FILTER;
  //
  //     const promise = this._aphone.getNoteNamesPromise( tenant, filter );
  //     return promise;
  // }

  getLoginPalWrapper() {
    return this._LoginPalWrapper
  }

  getLoginUser() {
    return this.state.loginUser
  }

  getExtensions() {
    return this.state.extensions // !check use cache
  }

  getPalRestApi() {
    return this._PalRestApi
  }

  logout = () => {
    this._CallHistory2.onBeginLogoutForCallHistory2(this)
    this._Campon.onBeginLogout(this)

    this._deinitAphoneClient()

    // this._Campon.onBeginLogout(this); //!old location
    // this._BusylightStatusChanger.deinit();  //!dev
    this._onUnloadExtensionScript()
    this._UccacWrapper?.deinitUccacWrapper()
    this._deinitPalWrapper()
    this._PalRestApi.deinitPalRestApi()

    this.setState({
      ...cloneDeep(INIT_STATE),
      i18nReady: true,
      locale: this.state.locale,
    })
  }

  // _setDefaultTabDatasToStateScreens(){
  //     const screens = this.state.screens;
  //     for( let i = 0; i < screens.length; i++ ){
  //         const screen = screens[i];
  //         let  tabDatas = screen.tabDatas;
  //         if( tabDatas ){
  //             continue;
  //         }
  //         tabDatas = new Array(1);
  //         const tabData = {
  //             //tabTitle : i18n.t("defaultTabTitle"), //Can not do this
  //             tabTitle : "Untitled tab",
  //             widgetDatas : new Array()
  //         };
  //         tabDatas[0] = tabData;
  //         screen.tabDatas = tabDatas;
  //     }
  //     this.setState({screens:screens});
  // }

  // !testit
  syncUp = async () => {
    const oScreen_ver2 = this.state.screenData_ver2.getDataAsObject()

    const dataId = PBX_APP_DATA_NAME
    // !old Do not use.
    const data = {
      version: PBX_APP_DATA_VERSION,
      screens: this.state.screens,
      screen_ver2: oScreen_ver2,
    }

    const setAppDataOptions = {
      methodName: 'setAppData',
      methodParams: JSON.stringify({
        data_id: dataId,
        data,
      }),
      onSuccessFunction: res => {
        Notification.success({
          message: i18n.t('saved_data_to_pbx_successfully'),
        })
      },
      onFailFunction: errorOrResponse => {
        console.error(errorOrResponse)
        Notification.error({
          message: i18n.t('failed_to_save_data_to_pbx'),
          content: (
            <>
              <Text>{i18n.t('failed_to_save_data_to_pbx')}</Text>
              <Button
                type='primary'
                size='small'
                onPress={() => {
                  this.syncUp()
                  Notification.removeAll()
                }}
              >
                {i18n.t('retry')}
              </Button>
            </>
          ),
          duration: 0,
        })
      },
    }
    this.getPalRestApi().callPalRestApiMethod(setAppDataOptions)
  }

  setNoteByLoggedinPal(noteName, content, successFunction, errorFunction) {
    const tenant = this.state.loginUser.pbxTenant
    const description = ''
    const useraccess = BrekekeOperatorConsole.PAL_NOTE_USERACCESSES.ReadWrite
    const options = {
      tenant,
      name: noteName,
      description,
      useraccess,
      note: content,
    }
    this._loggedinPal.setNote(options, successFunction, errorFunction)
  }

  getNoteNamesByLoggedinPal(successFunction, errorFunction) {
    const tenant = this.state.loginUser.pbxTenant
    this._loggedinPal.getNoteNames({ tenant }, successFunction, errorFunction)
  }

  static LAYOUT_NOTE_NAME_PREFIX = 'OperatorConsole-'
  static LAYOUT_NOTE_NAME_FILTER =
    BrekekeOperatorConsole.LAYOUT_NOTE_NAME_PREFIX + '*'

  static getOCNoteName(shortName) {
    const noteName = BrekekeOperatorConsole.LAYOUT_NOTE_NAME_PREFIX + shortName
    return noteName
  }

  static getOCNoteShortname(name) {
    const shortname = name.substring(
      BrekekeOperatorConsole.LAYOUT_NOTE_NAME_PREFIX.length,
    )
    return shortname
  }

  _convertAppData_version_0_1To2_0_0(oOldContent) {
    const oContent: any = {}
    oContent.version = PBX_APP_DATA_VERSION
    const oldScreens = oOldContent.screens
    oContent.screens = oldScreens // !bad. Not used but still available  //!forBug. Need deep copy?
    oContent.systemSettings = oOldContent.systemSettings // !forBug. Need deep copy?

    const oldScreen = oldScreens[0]

    const screenDataVer2 = new ScreenData()

    const background = oldScreen.background
    if (background) {
      screenDataVer2.setScreenBackgroundColor(background)
    }
    const foreground = oldScreen.foreground
    if (foreground) {
      screenDataVer2.setScreenForegroundColor(foreground)
    }
    const grid = oldScreen.grid
    if (grid) {
      screenDataVer2.setEditingScreenGrid(grid)
    }

    const screenPaneDatas = screenDataVer2.getScreenPaneDatas()
    const screenPaneData = screenPaneDatas.addPaneData(
      PaneData.PANE_TYPES.rootPane,
      null,
    )
    const widgetDatas = screenPaneData.getWidgetDatasForNoTabs()

    const oldWidgets = oldScreen.widgets
    if (oldWidgets && Array.isArray(oldWidgets)) {
      for (let i = 0; i < oldWidgets.length; i++) {
        const oldWidget = oldWidgets[i]

        const widgetTypeId = WidgetData.getWidgetTypeIdByWidgetTypeName(
          oldWidget.type,
        )
        if (widgetTypeId === -1) {
          console.warn(
            'Unable to convert due to unknown widget type.. type=' +
              oldWidget.type,
          )
        }

        const widgetRelativePositionX = oldWidget.x
        const widgetRelativePositionY = oldWidget.y
        const widgetData = widgetDatas.addWidgetData(
          widgetTypeId,
          widgetRelativePositionX,
          widgetRelativePositionY,
          oldWidget.width,
          oldWidget.height,
        )
        if (widgetData) {
          widgetData.importFromWidget_ver0_1(oldWidget)
        }
      }
    }

    const oScreen_ver2 = screenDataVer2.getDataAsObject()
    oContent.screen_ver2 = oScreen_ver2
    return oContent
  }

  _onSetSystemSettingsDataDataSuccessAtSetOCNote(
    oScreen_ver2,
    screens,
    systemSettingsData,
    setLastLayoutShortName,
    shortName,
    setOCNoteSuccessFunction,
    setOCNoteFailFunction,
  ) {
    let screenData_ver2
    if (!oScreen_ver2) {
      screenData_ver2 = new ScreenData()
    } else {
      screenData_ver2 = ScreenData.createScreenDataFromObject(oScreen_ver2)
    }
    this.setState({ screens, screenData_ver2, systemSettingsData }, () => {
      // this._BusylightStatusChanger.onBeforeReloadBusylightStatusChanger( );  //!dev
      this._CallHistory2.loadCallHistory2(
        () => {
          this._toSetNoteSuccess(
            setLastLayoutShortName,
            shortName,
            setOCNoteSuccessFunction,
          )
        },
        errorOrResponse => {
          if (setOCNoteFailFunction) {
            setOCNoteFailFunction(errorOrResponse)
          }
        },
      )
    })
  }

  _toSetNoteSuccess(
    setLastLayoutShortName,
    shortName,
    setOCNoteSuccessFunction,
  ) {
    this.reloadSystemSettingsExtensionScript()
    // this._BusylightStatusChanger.init();    //!dev
    if (setLastLayoutShortName) {
      this.setLastLayoutShortname(shortName)
    }
    setOCNoteSuccessFunction()
  }

  /**
   *
   * @param shortName
   * @param oContent
   * @param setOCNoteSuccessFunction
   * @param setOCNoteFailFunction
   * @param setLastLayoutShortName
   * @param skipSetSystemSettingsDataData
   * @returns {*|boolean} is async or sync
   */
  setOCNote(
    shortName,
    oContent,
    setOCNoteSuccessFunction,
    setOCNoteFailFunction,
    setLastLayoutShortName = true,
    skipSetSystemSettingsDataData = false,
  ) {
    const version = oContent.version
    if (version !== PBX_APP_DATA_VERSION) {
      if (version === '0.1') {
        oContent = this._convertAppData_version_0_1To2_0_0(oContent)
        // !dev
        if (!oContent) {
          setOCNoteFailFunction({ message: i18n.t('DataVersionMismatch') })
          return false
        }
      } else {
        // return i18n.t("DataVersionMismatch");
        setOCNoteFailFunction({ message: i18n.t('DataVersionMismatch') })
        return false
      }
    }

    const screens = oContent.screens
    // set default tabDatas
    for (let i = 0; i < screens.length; i++) {
      const screen = screens[i]
      if (!screen.tabDatas) {
        screen.tabDatas = [
          {
            tabTitle: i18n.t('defaultTabTitle'),
            widgetDatas: new Array(),
          },
        ]
      }
    }

    const systemSettingsDataData = oContent.systemSettings
    const systemSettingsData = this.state.systemSettingsData
    const oScreen_ver2 = oContent.screen_ver2

    if (skipSetSystemSettingsDataData === false) {
      const this_ = this
      const bStartInit = systemSettingsData.setSystemSettingsDataData(
        systemSettingsDataData,
        () => {
          this_._onSetSystemSettingsDataDataSuccessAtSetOCNote(
            oScreen_ver2,
            screens,
            systemSettingsData,
            setLastLayoutShortName,
            shortName,
            setOCNoteSuccessFunction,
            setOCNoteFailFunction,
          )
        },
        e => {
          setOCNoteFailFunction(e)
        },
      )
      return bStartInit
    } else {
      this._onSetSystemSettingsDataDataSuccessAtSetOCNote(
        oScreen_ver2,
        screens,
        systemSettingsData,
        setLastLayoutShortName,
        shortName,
        setOCNoteSuccessFunction,
        setOCNoteFailFunction,
      )
      return false
    }
  }

  async getLoginPassword() {
    const { password } = await this._getLastLoginAccount()
    return password
  }

  getLoginUsername() {
    if (!this.state.loginUser) {
      return null
    }

    const loginUsername = this.state.loginUser['pbxUsername']
    return loginUsername
  }

  getLoginTenantname() {
    if (!this.state.loginUser) {
      return null
    }
    const loginTenantname = this.state.loginUser['pbxTenant']
    return loginTenantname
  }
}
let BREKEKE_OPERATOR_CONSOLE: BrekekeOperatorConsole
BrekekeOperatorConsole.PAL_NOTE_USERACCESSES = {
  NoAccess: 0,
  ReadOnly: 1,
  ReadWrite: 2,
}
BrekekeOperatorConsole.DTMF_CHARS = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '*',
  '#',
]
BrekekeOperatorConsole.DIALING_MAX_LENGTH = 20 // !const
BrekekeOperatorConsole.TAB_TITLE_MAX_LENGTH = 30 // !const
BrekekeOperatorConsole.WAIT_HOLD_TIMELIMIT_MILLIS_AT_ONETOUCHDIAL = 20 * 1000

export const OperatorConsole = (el, props) => {
  const root = ReactDOM.createRoot(el)
  root.render(<BrekekeOperatorConsole {...props} />)
}
