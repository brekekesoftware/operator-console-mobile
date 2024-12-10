import React from 'react'
import { Dimensions, Image, ImageSourcePropType, View } from 'react-native'

import logo from '../logo.png'

import { DropDownMenu } from '../dropdown-menu/DropDownMenu'
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

  onTabClickByRuntimePane(runtimePanelAsCaller, tabKey, mouseEvent) {
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
          height: '100%',
        }}
      >
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            height: 47,
            // color: screenData_ver2.getScreenForegroundColor(),
            backgroundColor: screenData_ver2.getScreenBackgroundColor(),
          }}
        >
          {/* <View>
            <Image
              style={{ marginTop: 4, marginLeft: 4 }}
              source={logo as ImageSourcePropType}
            />
          </View> */}
          <DropDownMenu
            operatorConsole={this._OperatorConsoleAsParent}
          ></DropDownMenu>
          {/* <AutoDialView_ver2 isVisible={isVisibleAutoDialView_Ver2} />
          <QuickBusy_ver2 /> */}
        </View>
        <View
          style={{
            display: 'flex',
            height: Dimensions.get('screen').height - 47,
          }}
        >
          <View
            style={{
              width: '100%',
              overflow: 'scroll',
              marginLeft: 10,
              marginBottom: 10,
            }}
          >
            {/* <RuntimeRootPane
              paneData={rootPaneData}
              runtimeScreenViewAsParent={this}
              className='width100percentAndHeight100percent'
            /> */}
          </View>
        </View>
      </View>
    )
  }
}
