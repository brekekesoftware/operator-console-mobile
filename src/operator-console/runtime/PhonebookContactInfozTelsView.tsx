import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

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
          width: 400,
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
            flex: 1,
            backgroundColor: '#F5F5F5',
          }}
        >
          <TableWrapper
            style={{ justifyContent: 'flex-end', alignItems: 'center' }}
          >
            <View>
              <TouchableOpacity
                onPress={e => this.closePhonebookContactInfozTelsView()}
              >
                <FontAwesomeIcon
                  icon={['far', 'window-close']}
                  color='#584937'
                  size={25}
                />
              </TouchableOpacity>
            </View>
          </TableWrapper>
          <TableWrapper
            style={{ flex: 1, backgroundColor: 'white', borderRadius: 5 }}
          >
            <Table style={{ flex: 1, width: '100%' }}>
              <TableWrapper style={{ width: '100%' }}>
                <View
                  style={{
                    width: '100%',
                    backgroundColor: '#5C9842',
                    paddingLeft: 20,
                    paddingVertical: 6,
                  }}
                >
                  <Text
                    style={{
                      textTransform: 'none',
                      color: '#FFFFFF',
                      // paddingTop: 6,
                      padding: 0,
                      textAlign: 'left',
                      alignItems: 'flex-start',
                      fontSize: 16,
                    }}
                  >
                    {this.state.pbContactInfo.getDisplayName()}
                  </Text>
                </View>
              </TableWrapper>
              <TableWrapper
                style={{
                  borderBottomWidth: 1,
                  borderStyle: 'solid',
                  borderColor: '#e0e0e0',
                }}
              >
                <Cell
                  textStyle={{ textTransform: 'uppercase', fontWeight: 'bold' }}
                >
                  {i18n.t('Type')}
                </Cell>
                <Cell
                  textStyle={{ textTransform: 'uppercase', fontWeight: 'bold' }}
                >
                  {i18n.t('Tel')}
                </Cell>
                <Cell
                  textStyle={{ textTransform: 'uppercase', fontWeight: 'bold' }}
                >
                  {i18n.t('Status')}
                </Cell>
                <Cell
                  textStyle={{ textTransform: 'uppercase', fontWeight: 'bold' }}
                >
                  {i18n.t('Call')}
                </Cell>
              </TableWrapper>
              <View style={{ flex: 1 }}>
                {telInfoArray.map((telInfo, i) => {
                  const tel = telInfo.getValue()
                  const isExtension =
                    OCUtil.indexOfArrayFromExtensions(extensions, tel) !== -1
                  const statusClassName = isExtension
                    ? OCUtil.getExtensionStatusClassName(tel, extensionsStatus)
                    : ''
                  return (
                    <TableWrapper
                      key={i}
                      style={{
                        borderBottomWidth: 1,
                        borderStyle: 'solid',
                        borderColor: '#e0e0e0',
                      }}
                    >
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
                            style={{ padding: 2, width: 40, height: 40 }}
                            onPress={e => this._makeCall(telInfo.getValue())}
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
          </TableWrapper>
        </Table>
      </View>
    )
  }
}
