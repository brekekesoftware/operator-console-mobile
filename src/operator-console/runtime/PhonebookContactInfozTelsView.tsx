import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Component } from 'react'
import { TouchableOpacity, View } from 'react-native'

import { Cell, Table, TableWrapper } from '../common/Table'
import { WidgetButton } from '../common/WidgetButton'
import { i18n } from '../i18n'
import { OCUtil } from '../OCUtil'
import { BrekekeOperatorConsole } from '../OperatorConsole'
import { OperatorConsoleStyles } from '../OperatorConsoleStyles'

let _INSTANCE

type State = {
  pbContactInfo: any
}
type Props = {}
export class PhonebookContactInfozTelsView extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      pbContactInfo: null,
    }
    _INSTANCE = this
  }

  static getStaticPhonebookContactInfozTelsViewInstance() {
    return _INSTANCE
  }

  openPhonebookContactInfozTelsView(pbContactInfo) {
    this.setState({ pbContactInfo })
  }

  closePhonebookContactInfozTelsView(thenFunc = () => {}) {
    this.setState({ pbContactInfo: null }, () => {
      if (thenFunc) {
        thenFunc()
      }
    })
  }

  _makeCall(tel) {
    const oc = BrekekeOperatorConsole.getStaticInstance()
    oc.setDialingAndMakeCall(tel)
    oc.abortAutoDialView_ver2()
  }

  render() {
    if (!this.state.pbContactInfo) {
      return null
    }
    const oc = BrekekeOperatorConsole.getStaticInstance()
    const extensionsStatus = oc.state.extensionsStatus
    const extensions = oc.state.extensions

    const telInfoArray =
      this.state.pbContactInfo.getFreezedPhonebookContactInfozTelInfoArray()
    return (
      <View
        style={{
          position: 'absolute',
          right: 0,
          top: 48,
          borderRadius: 5,
          zIndex: 113,
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
              <Cell textStyle={{ textAlign: 'right', verticalAlign: 'top' }}>
                <TouchableOpacity
                  onPress={e => this.closePhonebookContactInfozTelsView()}
                >
                  <FontAwesomeIcon
                    icon={['far', 'window-close']}
                    color='#584937'
                    size={16}
                  />
                </TouchableOpacity>
              </Cell>
            </TableWrapper>
            <TableWrapper>
              <Cell>
                <Table style={{ paddingLeft: 20 }}>
                  <TableWrapper>
                    <TableWrapper>
                      <Cell
                        textStyle={{
                          textTransform: 'none',
                          backgroundColor: '#5C9842',
                          color: '#FFFFFF',
                          paddingTop: 6,
                        }}
                      >
                        {this.state.pbContactInfo.getDisplayName()}
                      </Cell>
                    </TableWrapper>
                    <TableWrapper>
                      <Cell>{i18n.t('Type')}</Cell>
                      <Cell>{i18n.t('Tel')}</Cell>
                      <Cell>{i18n.t('Status')}</Cell>
                      <Cell>{i18n.t('Call')}</Cell>
                    </TableWrapper>
                  </TableWrapper>
                  <View>
                    {telInfoArray.map((telInfo, i) => {
                      const tel = telInfo.getValue()
                      const isExtension =
                        OCUtil.indexOfArrayFromExtensions(extensions, tel) !==
                        -1
                      const statusClassName = isExtension
                        ? OCUtil.getExtensionStatusClassName(
                            tel,
                            extensionsStatus,
                          )
                        : ''
                      return (
                        <TableWrapper key={i}>
                          <Cell>{telInfo.getTitle()}</Cell>
                          <Cell>{telInfo.getValue()}</Cell>
                          <Cell>
                            <View
                              style={OperatorConsoleStyles[statusClassName]}
                            ></View>
                          </Cell>
                          <Cell>
                            {
                              <WidgetButton
                                style={{ padding: 2 }}
                                onPress={e =>
                                  this._makeCall(telInfo.getValue())
                                }
                              >
                                <FontAwesomeIcon
                                  size={16}
                                  icon={['fas', 'phone']}
                                />
                              </WidgetButton>
                            }
                          </Cell>
                        </TableWrapper>
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
