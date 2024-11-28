import React from 'react'
import { TouchableOpacity, View } from 'react-native'

import { Cell, Table, TableWrapper } from '../common/Table'
import { OCUtil } from '../OCUtil'
import type { BrekekeOperatorConsole } from '../OperatorConsole'
import { brOcDisplayStates } from '../OperatorConsole'
import { OperatorConsoleStyles } from '../OperatorConsoleStyles'

const QUICK_BUSY_CLICK_TO_CALL = true
type Props = {
  operatorConsoleAsParent: BrekekeOperatorConsole
}

type State = {
  candidateCallNos: any
}
export class QuickBusy extends React.Component<Props, State> {
  _operatorConsoleAsParent: BrekekeOperatorConsole

  constructor(props) {
    super(props)
    this._operatorConsoleAsParent = props.operatorConsoleAsParent
    this._operatorConsoleAsParent.setQuickBusy(this)

    this.state = {
      candidateCallNos: null,
    }

    this._operatorConsoleAsParent.addOnAppendKeypadValueCallback(
      this._onAppendKeypadValue.bind(this),
    )
    this._operatorConsoleAsParent.addOnbackspaceKeypadValueCallback(
      this._onBackspaceKeypadValue.bind(this),
    )
    this._operatorConsoleAsParent.addOnClearDialingCallbacks(
      this._onClearDialing.bind(this),
    )
    // this._operatorConsoleAsParent.addOnSetCurrentScreenIndexCallback( this._onSetCurrentScreenIndex.bind(this) );
  }

  _onClearDialing(operatorConsoleAsCaller) {
    this._resetCandidateCallNos()
  }

  static getDefaultQuickBusyClickToCall() {
    return QUICK_BUSY_CLICK_TO_CALL
  }

  _onAppendKeypadValue(operatorConsoleAsSender, key) {
    const displayState = this._operatorConsoleAsParent.getDisplayState()
    if (displayState !== brOcDisplayStates.showScreen) {
      return
    }

    const ocState = this._operatorConsoleAsParent.getState()
    const dialing = ocState.dialing
    this._resetCandidateCallNos(dialing)
  }

  _onBackspaceKeypadValue(operatorConsoleAsSender) {
    const ocState = operatorConsoleAsSender.getState()
    const dialing = ocState.dialing
    this._resetCandidateCallNos(dialing)
  }

  static _compare(x, y) {
    if (x < y) {
      return -1
    }

    if (x === y) {
      return 0
    }

    // x > y
    return 1
  }

  /**
   *
   * @param ary
   * @param target
   * @return -1 if found item
   */
  static _getInsertIndex(ary, target) {
    for (let i = 0; i < ary.length; i++) {
      const itm = ary[i]
      const iCompare = QuickBusy._compare(target, itm)
      if (iCompare === 0) {
        return -1
      }
      if (iCompare === -1) {
        return i
      }
    }
    return ary.length
  }

  _collectCandidateCallNos(dialing) {
    // history
    const historyCallNos = this._operatorConsoleAsParent
      .getCallHistory()
      .getSortedCallNos()
    // const callNos = Array.from(historyCallNos);
    const callNos = []
    if (historyCallNos) {
      for (let i = 0; i < historyCallNos.length; i++) {
        const historyCallNo = historyCallNos[i]
        if (historyCallNo.startsWith(dialing)) {
          callNos.push(historyCallNo)
        }
      }
    }

    // callNos.sort();

    // extensions
    const extensions = this._operatorConsoleAsParent.state.extensions
    if (extensions) {
      for (let i = 0; i < extensions.length; i++) {
        const ext = extensions[i]
        if (ext.id.startsWith(dialing)) {
          const iInsertIndex = QuickBusy._getInsertIndex(callNos, ext.id)
          if (iInsertIndex === -1) {
            // already exists
            continue
          }
          callNos.splice(iInsertIndex, 0, ext.id)
        }
      }
    }

    return callNos
  }

  _resetCandidateCallNos(dialing = '') {
    if (!dialing || dialing.length === 0) {
      this.setState({ candidateCallNos: null })
      return
    }

    const candidateCallNos = this._collectCandidateCallNos(dialing)
    // const visible = candidateCallNos.length !== 0;
    // const bBecomeVisible = this.state.visible === false && visible;
    // if( bBecomeVisible ){
    //     this._operatorConsoleAsParent.onVisibleQuickBusy(this);
    // }
    this.setState({ candidateCallNos })
  }

  // _onSetCurrentScreenIndex( operatorConsoleAsSender, currentScreenIndex, previousScreenIndex ){
  // }

  onBeforeCurrentScreenIndexChange(operatorConsoleAsSender, index) {
    this.setState({ candidateCallNos: null })
  }

  _onClickCallNo(callNo) {
    const isClickToCall = this._operatorConsoleAsParent
      .getSystemSettingsData()
      .getQuickBusyClickToCall()
    if (isClickToCall === false) {
      this._operatorConsoleAsParent.setDialing(callNo)
    } else {
      this._operatorConsoleAsParent.setDialingAndMakeCall2(callNo)
    }
  }

  render() {
    if (
      !this.state.candidateCallNos ||
      this.state.candidateCallNos.length == 0
    ) {
      return null
    }

    const ocState = this._operatorConsoleAsParent.getState()

    const dialing = ocState.dialing
    const extensions = ocState.extensions
    const extensionsStatus = ocState.extensionsStatus

    return (
      <View
        style={{
          position: 'absolute',
          right: 0,
          top: 48,
          borderRadius: 5,
          zIndex: 114,
        }}
      >
        <Table
          style={{
            borderRadius: 5,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: '#e0e0e0',
            padding: 15,
          }}
        >
          <View>
            <TableWrapper>
              <Cell>
                <Table>
                  <View style={{ paddingLeft: 20 }}>
                    {this.state.candidateCallNos.map((callNo, i) => {
                      const isExtension =
                        OCUtil.indexOfArrayFromExtensions(
                          this._operatorConsoleAsParent.state.extensions,
                          callNo,
                        ) !== -1
                      const extensionsStatus =
                        this._operatorConsoleAsParent.state.extensionsStatus
                      const statusClassName = isExtension
                        ? OCUtil.getExtensionStatusClassName(
                            callNo,
                            extensionsStatus,
                          )
                        : ''

                      return (
                        <TouchableOpacity
                          onPress={this._onClickCallNo.bind(this, callNo)}
                        >
                          <TableWrapper key={i}>
                            <Cell>{callNo}</Cell>
                            <Cell>
                              <View
                                style={OperatorConsoleStyles[statusClassName]}
                              ></View>
                            </Cell>
                          </TableWrapper>
                        </TouchableOpacity>
                      )
                    })}
                  </View>
                </Table>
              </Cell>
            </TableWrapper>
          </View>
        </Table>
      </View>
    )
  }
}
