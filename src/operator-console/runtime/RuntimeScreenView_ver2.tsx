import React from 'react'
import type { ImageSourcePropType } from 'react-native'
import { Dimensions, Image, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import logo from '../logo.png'

import { Notification } from '../common/Notification'
import { DropDownMenu } from '../dropdown-menu/DropDownMenu'
import { ColorPaneContextProvider } from '../editor/ColorPaneContext'
import type { BrekekeOperatorConsole } from '../OperatorConsole'
import { AutoDialView_ver2 } from './AutoDialView_ver2'
import { QuickBusy_ver2 } from './QuickBusy_ver2'
import { RuntimeRootPane } from './RuntimeRootPane'

type Props = {
  operatorConsoleAsParent: BrekekeOperatorConsole
}
export class RuntimeScreenView_ver2 extends React.Component<Props> {
  _OperatorConsoleAsParent: BrekekeOperatorConsole
  constructor(props) {
    super(props)
    this._OperatorConsoleAsParent = props['operatorConsoleAsParent']
  }

  onTabClickByRuntimePane(runtimePanelAsCaller, tabKey) {
    runtimePanelAsCaller.setRuntimePanezSelectedTabKeyAsString(tabKey)
  }

  render() {
    const screenData_ver2 = this._OperatorConsoleAsParent.getScreenData_ver2()
    const rootPaneData = screenData_ver2
      .getScreenPaneDatas()
      .getOrAddRootPaneData()
    const isVisibleAutoDialView_Ver2 =
      this._OperatorConsoleAsParent.state.showAutoDialWidgetSubDatas_ver2 &&
      this._OperatorConsoleAsParent.state.showAutoDialWidgetSubDatas_ver2
        .length !== 0
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          // height: '100%',
          flex: 1,
        }}
      >
        <View
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            height: 47,
            // color: screenData_ver2.getScreenForegroundColor(),
            backgroundColor: screenData_ver2.getScreenBackgroundColor(),
            zIndex: 15,
          }}
        >
          <View>
            <Image
              style={{ marginTop: 4, marginLeft: 4 }}
              source={logo as ImageSourcePropType}
            />
          </View>
          <DropDownMenu
            operatorConsole={this._OperatorConsoleAsParent}
          ></DropDownMenu>
          <AutoDialView_ver2 isVisible={isVisibleAutoDialView_Ver2} />
          <QuickBusy_ver2 />
        </View>
        <View
          style={{
            display: 'flex',
            flex: 1,
          }}
        >
          <View
            style={{
              marginLeft: 10,
              marginBottom: 10,
              flex: 1,
            }}
          >
            <ColorPaneContextProvider
              bg={screenData_ver2.getScreenBackgroundColor()}
              fg={screenData_ver2.getScreenForegroundColor()}
            >
              <RuntimeRootPane
                paneData={rootPaneData}
                runtimeScreenViewAsParent={this}
              />
            </ColorPaneContextProvider>
          </View>
        </View>
      </View>
    )
  }
}
