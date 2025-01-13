import { Checkbox } from '@ant-design/react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { createRef } from 'react'
import type { StyleProp, TextStyle } from 'react-native'
import { Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { Button } from '../common/Button'
import { Input } from '../common/Input'
import { Notification } from '../common/Notification'
import { Popconfirm } from '../common/Popconfirm'
import { Cell, Table, TableWrapper } from '../common/Table'
import { WidgetButton } from '../common/WidgetButton'
import { i18n } from '../i18n'
import { OCUtil } from '../OCUtil'
import { BrekekeOperatorConsole } from '../OperatorConsole'
import { OperatorConsoleStyles } from '../OperatorConsoleStyles'
import { PhonebookContactInfo_AutoDialView_ver2 } from './PhonebookContactInfo_AutoDialView_ver2'

const BUILTIN_CUSTOM_ITEM_KEYNAMES = Object.freeze([
  'Address(Work)',
  'Email(Work)',
  'Ext.',
  'Fax',
  'Job title',
  'Middle name',
  'Nickname',
  'Other',
  'Prefix',
  'Suffix',
  'Website',
])
class PbContactInfozCustomItem {
  _name
  _value
  constructor(options) {
    const pbContactInfozItem = options['pbContactInfozItem']
    if (pbContactInfozItem) {
      this._name = pbContactInfozItem.getInfoKeyName()
      this._value = pbContactInfozItem.getValue()
    } else {
      // const name = options["name"];
      // const value = options["value"];
      // this.setName( name );
      // this.setValue( value );
      this._name = ''
      this._value = ''
    }
  }

  getName() {
    return this._name
  }

  getValue() {
    return this._value
  }

  setValue(val) {
    this._value = val
  }

  setName(name) {
    // let validName = name.replace("$", "");
    let validName = OCUtil.removeChar(name, '$')
    validName = validName.trim()
    this._name = validName
  }
}

let _INSTANCE

type Props = {}
type State = {
  pbContactInfo: any
  sharedChecked?: boolean | null
  refresh?: boolean
}
export class PhonebookContactInfozInfoView extends React.Component<
  Props,
  State
> {
  _PbContactInfozCustomItemArray
  _PbSummaryArray
  refItems
  refTel
  refContact
  constructor(props) {
    super(props)
    this.state = {
      pbContactInfo: null,
    }
    this.refItems = createRef<Array<any>>()
    this.refItems.current = []
    this.refTel = createRef<Array<any>>()
    this.refTel.current = {}
    this.refContact = createRef()
    console.log('#Duy Phan console this.refItems', this.refItems)
    this._PbContactInfozCustomItemArray = new Array()
    this._PbSummaryArray = new Array()
    _INSTANCE = this
  }

  static getStaticPhonebookContactInfozInfoViewInstance() {
    return _INSTANCE
  }

  getPhonebookContactInfoFromState() {
    return this.state.pbContactInfo
  }

  _onInputFocus() {
    const oc = BrekekeOperatorConsole.getStaticInstance()
    oc.addDisableKeydownToDialingCounter()
    oc.addDisablePasteToDialingCounter()
  }

  _onInputBlur() {
    const oc = BrekekeOperatorConsole.getStaticInstance()
    oc.subtractDisableKeydownToDialingCounter()
    oc.subtractDisablePasteToDialingCounter()
  }

  _onCustomItemNameInputFocus(customItem, e) {
    setTimeout(() => {
      const name = customItem.getName()
      e.target.value = name
    }, 1)
    this._onInputFocus()
  }

  _onCustomItemValueInputFocus(customItem, e) {
    setTimeout(() => {
      const value = customItem.getValue()
      e.target.value = value
    }, 1)
    this._onInputFocus()
  }

  _onCustomItemNameInputBlur(customItem, e) {
    setTimeout(() => {
      const name = customItem.getName()
      e.target.value = name
    }, 1)
    this._onInputBlur()
  }

  _onCustomItemValueInputBlur(customItem, e) {
    setTimeout(() => {
      const value = customItem.getValue()
      e.target.value = value
    }, 1)
    this._onInputBlur()
  }

  _reloadContactInfo(aid) {
    this._PbContactInfozCustomItemArray.length = 0
    this._PbSummaryArray.length = 0
    const getContactOptions = {
      methodName: 'getContact',
      methodParams: JSON.stringify({
        aid,
      }),
    }
    const oc = BrekekeOperatorConsole.getStaticInstance()
    const promise = oc
      .getPalRestApi()
      .callPalRestApiMethodAsync(getContactOptions)
    promise
      .then(contact => {
        if (!contact) {
          OCUtil.logErrorWithNotification(
            'Failed to get phonebook contact.',
            i18n.t('Failed_to_get_phone_book_contact'),
          )
        } else {
          const pbGotContactInfo = new PhonebookContactInfo_AutoDialView_ver2(
            contact,
          )
          console.log(
            '#Duy Phan console pbGotContactInfo',
            pbGotContactInfo.getPhonebookName(),
          )

          // Collect info's custom items.
          const pbContactInfozInfoArray =
            pbGotContactInfo.getFreezedPhonebookContactInfozInfoArray()
          for (let i = 0; i < pbContactInfozInfoArray.length; i++) {
            const infozItem = pbContactInfozInfoArray[i]
            if (infozItem.isCustomKey()) {
              const infozCustomItem = new PbContactInfozCustomItem({
                pbContactInfozItem: infozItem,
              })

              this._PbContactInfozCustomItemArray.push(infozCustomItem)
            }
          }

          // const eShared = document.getElementById("shared_PhonebookContactInfozInfoView_brOC");
          const bShared = pbGotContactInfo.getIsShared()
          // eShared.checked = bShared;
          this.setState(
            { pbContactInfo: pbGotContactInfo, sharedChecked: bShared },
            () => {
              // Refresh custom item element's name&value
              for (
                let i = 0;
                i < this._PbContactInfozCustomItemArray.length;
                i++
              ) {
                const customItem = this._PbContactInfozCustomItemArray[i]
                const name = customItem.getName()
                const value = customItem.getValue()
                this.refItems.current[i].itemName.setValue(name)
                this.refItems.current[i].itemValue.setValue(value)
                console.log('#Duy Phan console name value', name, value)
              }
            },
          )
        }
      })
      .catch(rej => {
        OCUtil.logErrorWithNotification(
          'Failed to get phonebook contact.',
          i18n.t('Failed_to_get_phone_book_contact'),
          rej,
        )
      })
  }

  async _reloadEmptyContactInfo() {
    this._PbContactInfozCustomItemArray.length = 0
    this._PbSummaryArray.length = 0

    const getPhonebooksOptions = {
      methodName: 'getPhonebooks',
      // methodParams : JSON.stringify({
      // }),
    }
    const oc = BrekekeOperatorConsole.getStaticInstance()
    const pbSummaryArray = await oc
      .getPalRestApi()
      .callPalRestApiMethodAsync(getPhonebooksOptions)
      .catch(resOrError => {
        OCUtil.logErrorWithNotification(
          'Failed to get phone books.',
          i18n.t('Failed_to_get_phone_books'),
          resOrError,
        )
        return
      })
    if (Array.isArray(pbSummaryArray)) {
      this._PbSummaryArray.length = pbSummaryArray.length
      for (let i = 0; i < pbSummaryArray.length; i++) {
        // !optimize. copy
        this._PbSummaryArray[i] = pbSummaryArray[i]
      }
    }
    const pbContactInfo = new PhonebookContactInfo_AutoDialView_ver2() // empty
    this.setState({ pbContactInfo })
  }

  openPhonebookContactInfozInfoView(pbContactInfo) {
    this.setState({ pbContactInfo: null, sharedChecked: null }, () => {
      if (pbContactInfo) {
        this._reloadContactInfo(pbContactInfo.getAid())
      } else {
        this._reloadEmptyContactInfo()
      }
    })
  }

  closePhonebookContactInfozInfoView(thenFunc = () => {}) {
    this.setState({ pbContactInfo: null, sharedChecked: null }, () => {
      this._PbContactInfozCustomItemArray.length = 0
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

  _save() {
    const oc = BrekekeOperatorConsole.getStaticInstance()
    // validation
    console.log(
      '#Duy Phan console this.state.pbContactInfo',
      this.state.pbContactInfo,
    )
    const phonebookName = this.state.pbContactInfo
      ? this.state.pbContactInfo.getPhonebookName()
      : this.refContact.current.getValue()
    if (!phonebookName || phonebookName.length === 0) {
      Notification.warning({ message: i18n.t('No_phonebook_assigned') })
      return
    }

    const isShared = this.state.sharedChecked
    const isAdmin = oc.getIsAdmin()
    const isSaveable =
      isShared === false || (isShared === true && isAdmin === true)
    if (isSaveable !== true) {
      console.warn('You do not have permission to save phone book contact.')
      Notification.warning({
        message: i18n.t(
          'You_do_not_have_permission_to_save_phone_book_contact',
        ),
      })
      return
    }

    const oInfo = {}

    Object.entries(this.refTel.current as any).forEach(([k, v]) => {
      oInfo[k] = v.getValue()
    })
    console.log('#Duy Phan console oInfo', oInfo)

    // Collect custom items
    for (let i = 0; i < this._PbContactInfozCustomItemArray.length; i++) {
      const customItem = this._PbContactInfozCustomItemArray[i]
      const name = customItem.getName()
      if (name.length === 0) {
        continue
      }
      oInfo[name] = customItem.getValue()
    }

    let aid = null // add
    if (this.state.pbContactInfo) {
      aid = this.state.pbContactInfo.getAid()
    }
    // const sIsShared = this.state.pbContactInfo.getIsShared().toString();

    const oMethodParams = {
      phonebook: phonebookName,
      shared: isShared.toString(),
      info: oInfo,
    }
    if (aid) {
      oMethodParams['aid'] = aid
    }

    const setContactOptions = {
      methodName: 'setContact',
      methodParams: JSON.stringify(oMethodParams),
    }

    const promise = oc
      .getPalRestApi()
      .callPalRestApiMethodAsync(setContactOptions)
    promise
      .then(result => {
        if (result == null) {
          OCUtil.logErrorWithNotification(
            'Failed to set contact(PAL rest API).',
            i18n.t('failed_to_save_data_to_pbx'),
          )
        } else {
          Notification.success({
            message: i18n.t('saved_data_to_pbx_successfully'),
          })
          const sAid = result['aid']
          this._reloadContactInfo(sAid)
        }
      })
      .catch(errorOrResponse => {
        OCUtil.logErrorWithNotification(
          'Failed to set contact(PAL rest API).',
          i18n.t('failed_to_save_data_to_pbx'),
          errorOrResponse,
        )
      })
  }

  _addItem() {
    const customItem = new PbContactInfozCustomItem('')
    this._PbContactInfozCustomItemArray.push(customItem)
    this.setState({ refresh: true }, () => {
      // Refresh custom item element's name&value
      for (let i = 0; i < this._PbContactInfozCustomItemArray.length; i++) {
        const customItem1 = this._PbContactInfozCustomItemArray[i]
        const name = customItem1.getName()
        const value = customItem1.getValue()
        this.refItems.current[i].itemName.setValue(name)
        this.refItems.current[i].itemValue.setValue(value)
        console.log('#Duy Phan console name value', name, value)
      }
    })
  }

  _onChangeCustomItemInputName(customItem, e) {
    const name = e.target.value
    customItem.setName(name)
  }

  _onChangeCustomItemInputValue(customItem, e) {
    const value = e.target.value
    customItem.setValue(value)
  }

  _isAddContact() {
    return !this.state.pbContactInfo || !this.state.pbContactInfo.getAid()
  }

  _deleteContact() {
    const oc = BrekekeOperatorConsole.getStaticInstance()
    const isShared = this.state.pbContactInfo.getIsShared() === true
    const isAdmin = oc.getIsAdmin()
    const isDeletable =
      isShared === false || (isShared === true && isAdmin === true)
    if (isDeletable !== true) {
      console.warn(
        'You do not have permission to delete phone book contact.. aid=' + aid,
      )
      Notification.warning({
        message: i18n.t(
          'You_do_not_have_permission_to_delete_phone_book_contact',
        ),
      })
      return
    }

    const failFunc = resOrError => {
      if (Array.isArray(resOrError)) {
        const aid = resOrError[0]
        console.error('Failed to delete phone book contact. aid=' + aid)
        Notification.error({
          message: i18n.t('failed_to_save_data_to_pbx'),
          duration: 0,
        })
      } else {
        OCUtil.logErrorWithNotification(
          'Failed to delete phone book contact.',
          i18n.t('failed_to_save_data_to_pbx'),
          resOrError,
        )
      }
    }

    const aid = this.state.pbContactInfo.getAid()
    const deleteContactOptions = {
      methodName: 'deleteContact',
      methodParams: JSON.stringify({
        aid,
      }),
      onSuccessFunction: ret => {
        let bSuccess = false
        const arSucceeded = ret['succeeded']
        if (Array.isArray(arSucceeded)) {
          if (arSucceeded.length !== 0) {
            const iAidRet = arSucceeded[0]
            let aidIntegerOrString = aid
            if (Number.isInteger(iAidRet) && OCUtil.isString(aid)) {
              aidIntegerOrString = parseInt(aid)
            }
            bSuccess = aidIntegerOrString === iAidRet
          }
        }
        if (bSuccess === true) {
          Notification.success({
            message: i18n.t('saved_data_to_pbx_successfully'),
          })
          this.closePhonebookContactInfozInfoView()
        } else {
          // const arFailed = ret["failed"];
          failFunc(null)
        }
      },
      onFailFunction: resOrError => failFunc(resOrError),
    }
    oc.getPalRestApi().callPalRestApiMethod(deleteContactOptions)
  }

  _rerenderShared(isChecked) {
    this.setState({ sharedChecked: isChecked })
  }

  render() {
    if (!this.state.pbContactInfo) {
      return null
    }
    const oc = BrekekeOperatorConsole.getStaticInstance()
    const extensionsStatus = oc.state.extensionsStatus
    const extensions = oc.state.extensions
    const isShared = this.state.pbContactInfo.getIsShared()
    const isAdmin = oc.getIsAdmin()
    const isSaveable =
      isShared === false || (isShared === true && isAdmin === true)

    let sharedChecked
    if (
      this.state.sharedChecked === undefined ||
      this.state.sharedChecked === null
    ) {
      sharedChecked = isShared
    } else {
      sharedChecked = this.state.sharedChecked
    }
    const textHeader: StyleProp<TextStyle> = {
      textTransform: 'uppercase',
      fontWeight: 'bold',
    }

    return (
      <View
        style={{
          position: 'absolute',
          right: 0,
          top: 48,
          borderRadius: 5,
          zIndex: 114,
          overflow: 'hidden',
        }}
      >
        <Table
          style={{
            borderRadius: 5,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: '#e0e0e0',
            padding: 15,
            width: 650,
            // height: 400,
            backgroundColor: '#F5F5F5',
            overflow: 'hidden',
          }}
        >
          <View style={{ flex: 1 }}>
            <TableWrapper>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                {isSaveable && (
                  <Popconfirm
                    title={i18n.t('are_you_sure')}
                    onConfirm={() => this.closePhonebookContactInfozInfoView()}
                    okText={i18n.t('yes')}
                    cancelText={i18n.t('no')}
                  >
                    <FontAwesomeIcon
                      icon={['far', 'window-close']}
                      color='#584937'
                      size={25}
                    />
                  </Popconfirm>
                )}
                {!isSaveable && (
                  <TouchableOpacity
                    onPress={e => this.closePhonebookContactInfozInfoView()}
                  >
                    <FontAwesomeIcon
                      icon={['far', 'window-close']}
                      color='#584937'
                      size={25}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </TableWrapper>
            <TableWrapper style={{ flex: 1, backgroundColor: 'white' }}>
              <View
                style={{
                  // maxHeight: 500,
                  height: 500,
                  flex: 1,
                  // overflow: 'hidden',
                }}
              >
                <ScrollView>
                  <TableWrapper>
                    <Cell
                      style={{
                        backgroundColor: '#5C9842',
                        paddingTop: 6,
                      }}
                      textStyle={{
                        textTransform: 'none',
                        height: 19,
                        color: '#FFFFFF',
                      }}
                    >
                      {this.state.pbContactInfo.getDisplayName()}
                    </Cell>
                  </TableWrapper>
                  <TableWrapper
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingLeft: 20,
                      paddingTop: 20,
                    }}
                  >
                    <View style={{ width: 130 }}>
                      <Text
                        style={{
                          textTransform: 'uppercase',
                          fontWeight: 'bold',
                        }}
                      >
                        {i18n.t('Phonebook')}
                      </Text>
                    </View>
                    <View>
                      {!this._isAddContact() && (
                        <Input
                          ref={this.refContact}
                          defaultValue={this.state.pbContactInfo.getPhonebookName()}
                          style={{
                            width: 300,
                            opacity: 0.7,
                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                          }}
                          disabled={true}
                        />
                      )}
                      {this._isAddContact() && (
                        <>
                          <Input
                            type='text'
                            ref={this.refContact}
                            list='phonebookName_datalist_PhonebookContactInfozInfoView'
                            maxLength={100}
                            onFocus={e => this._onInputFocus()}
                            onBlur={e => this._onInputBlur()}
                            style={{ width: 300 }}
                          />
                          {/* <datalist id='phonebookName_datalist_PhonebookContactInfozInfoView'>
                              {this._PbSummaryArray.map((pbSummary, i) => {
                                const phonebookName = pbSummary['phonebook']
                                return (
                                  <option key={i} value={phonebookName}>
                                    {phonebookName}
                                  </option>
                                )
                              })}
                            </datalist> */}
                        </>
                      )}
                    </View>
                  </TableWrapper>
                  <TableWrapper
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingLeft: 20,
                      height: 60,
                    }}
                  >
                    <View style={{ width: 130 }}>
                      <Text
                        style={{
                          textTransform: 'uppercase',
                          fontWeight: 'bold',
                        }}
                      >
                        {i18n.t('Shared')}
                      </Text>
                    </View>
                    <View>
                      <Checkbox
                        // defaultChecked={sharedDefaultChecked}
                        checked={sharedChecked}
                        onChange={e => this._rerenderShared(e.target.checked)}
                        disabled={isAdmin !== true}
                      />
                    </View>
                  </TableWrapper>
                  {PhonebookContactInfo_AutoDialView_ver2.BUILTIN_DEFAULT_PHONEBOOK_CONTACTINFO_ITEM_KEYNAMES.map(
                    (key, i) => {
                      const info =
                        this.state.pbContactInfo.getPhonebookContactInfoByKeyname(
                          key,
                        )
                      if (info.isTelKey()) {
                        return null
                      }

                      const infoKeyName = info.getInfoKeyName()
                      return (
                        <TableWrapper
                          key={i}
                          style={{
                            height: 60,
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingLeft: 20,
                          }}
                        >
                          <View style={{ width: 130 }}>
                            <Text
                              style={{
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                              }}
                            >
                              {info.getTitle()}
                            </Text>
                          </View>
                          <Cell
                            style={{ alignItems: 'flex-start', padding: 0 }}
                          >
                            <Input
                              data-br-isinfoparam='true'
                              ref={el => (this.refTel.current[key] = el)}
                              defaultValue={info.getValue()}
                              style={{ width: 300 }}
                              disabled={!isSaveable}
                              maxLength={1000}
                              onFocus={e => this._onInputFocus()}
                              onBlur={e => this._onInputBlur()}
                            />
                          </Cell>
                        </TableWrapper>
                      )
                    },
                  )}
                  <TableWrapper style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <View style={{ width: 130 }}>
                      <Text
                        style={{
                          textTransform: 'uppercase',
                          fontWeight: 'bold',
                          textAlign: 'left',
                        }}
                      >
                        {i18n.t('Tels')}
                      </Text>
                    </View>

                    <Table
                      style={{
                        // paddingLeft: 20,
                        flex: 1,
                        backgroundColor: 'transparent',
                        borderColor: '#e0e0e0',
                        borderWidth: 1,
                      }}
                    >
                      <TableWrapper
                        style={{ borderColor: '#e0e0e0', borderBottomWidth: 1 }}
                      >
                        <Cell style={{ paddingTop: 6 }} textStyle={textHeader}>
                          {i18n.t('Type')}
                        </Cell>
                        <Cell style={{ paddingTop: 6 }} textStyle={textHeader}>
                          {i18n.t('Tel')}
                        </Cell>
                        <Cell style={{ paddingTop: 6 }} textStyle={textHeader}>
                          {i18n.t('Status')}
                        </Cell>
                        <Cell style={{ paddingTop: 6 }} textStyle={textHeader}>
                          {i18n.t('Call')}
                        </Cell>
                      </TableWrapper>

                      <View>
                        {PhonebookContactInfo_AutoDialView_ver2.BUILTIN_DEFAULT_PHONEBOOK_CONTACTINFO_TEL_ITEM_KEYNAMES.map(
                          (telKeyName, i) => {
                            const telInfo =
                              this.state.pbContactInfo.getPhonebookContactInfozInfoByInfoKeyName(
                                telKeyName,
                              )
                            let tel
                            if (telInfo) {
                              tel = telInfo.getValue()
                            } else {
                              tel = ''
                            }
                            const telTitle =
                              this.state.pbContactInfo.getFreezedTelInfoTitleArray()[
                                i
                              ]

                            const isExtension =
                              OCUtil.indexOfArrayFromExtensions(
                                extensions,
                                tel,
                              ) !== -1
                            const statusClassName = isExtension
                              ? OCUtil.getExtensionStatusClassName(
                                  tel,
                                  extensionsStatus,
                                )
                              : ''
                            return (
                              <TableWrapper
                                key={i}
                                style={{
                                  borderColor: '#e0e0e0',
                                  borderBottomWidth: 1,
                                }}
                              >
                                <Cell>{telTitle}</Cell>
                                <Cell>
                                  <Input
                                    ref={el =>
                                      (this.refTel.current[telKeyName] = el)
                                    }
                                    defaultValue={tel}
                                    style={{ width: 160 }}
                                    disabled={!isSaveable}
                                    maxLength={1000}
                                    onFocus={e => this._onInputFocus()}
                                    onBlur={e => this._onInputBlur()}
                                  />
                                </Cell>
                                <Cell>
                                  <View
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                    }}
                                  >
                                    <View
                                      style={
                                        OperatorConsoleStyles[statusClassName]
                                      }
                                    ></View>
                                  </View>
                                </Cell>
                                <Cell>
                                  {tel.length !== 0 && (
                                    <View
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                      }}
                                    >
                                      <WidgetButton
                                        style={{
                                          padding: 2,
                                          width: 40,
                                          height: 40,
                                        }}
                                        onPress={e => this._makeCall(tel)}
                                      >
                                        <FontAwesomeIcon
                                          size={16}
                                          icon={['fas', 'phone']}
                                        />
                                      </WidgetButton>
                                    </View>
                                  )}
                                </Cell>
                              </TableWrapper>
                            )
                          },
                        )}
                      </View>
                    </Table>
                  </TableWrapper>
                  {this._PbContactInfozCustomItemArray.map((customItem, i) => (
                    <TableWrapper key={i}>
                      <Cell>
                        <Input
                          ref={el => {
                            console.log(
                              '#Duy Phan console el',
                              el?.getValue() ?? 'asd',
                            )
                            this.refItems.current[i] = {}
                            this.refItems.current[i].itemName = el
                          }}
                          list={
                            'brOC_PhonebookContactInfozInfoView_datalist_customItemName_' +
                            i
                          }
                          // defaultValue={customItem.getName()}
                          style={{ width: 200 }}
                          // disabled={!isSaveable}
                          maxLength={1000}
                          onChange={e =>
                            this._onChangeCustomItemInputName(customItem, e)
                          }
                          // onFocus={e =>
                          //   this._onCustomItemNameInputFocus(customItem, e)
                          // }
                          // onBlur={e =>
                          //   this._onCustomItemNameInputBlur(customItem, e)
                          // }
                        />
                        {/* <datalist
                              id={
                                'brOC_PhonebookContactInfozInfoView_datalist_customItemName_' +
                                i
                              }
                            >
                              {BUILTIN_CUSTOM_ITEM_KEYNAMES.map(
                                (keyname, i) => (
                                  <option key={i} value={keyname}>
                                    {keyname}
                                  </option>
                                ),
                              )}
                            </datalist> */}
                      </Cell>
                      <Cell>
                        <Input
                          ref={el => {
                            // this.refItems.current[i] = {}
                            this.refItems.current[i].itemValue = el
                          }}
                          data-br-name={
                            'PhonebookContactInfozInfoView_customItemValue_' + i
                          }
                          // defaultValue={customItem.getValue()}
                          style={{ width: 300 }}
                          // disabled={!isSaveable}
                          maxLength={1000}
                          onChange={e =>
                            this._onChangeCustomItemInputValue(customItem, e)
                          }
                          // onFocus={e =>
                          //   this._onCustomItemValueInputFocus(customItem, e)
                          // }
                          // onBlur={e =>
                          //   this._onCustomItemValueInputBlur(customItem, e)
                          // }
                        />
                      </Cell>
                    </TableWrapper>
                  ))}
                  <TableWrapper style={{ backgroundColor: 'transparent' }}>
                    <Cell
                      style={{
                        paddingTop: 4,
                        paddingRight: 4,
                        backgroundColor: 'transparent',
                        alignItems: 'flex-start',
                      }}
                    >
                      {isSaveable && (
                        <TouchableOpacity onPress={e => this._addItem()}>
                          <Text
                            style={
                              {
                                // textDecoration: 'underline',
                              }
                            }
                          >
                            &gt;&gt;{i18n.t('Add_item')}
                          </Text>
                        </TouchableOpacity>
                      )}
                      {!isSaveable && (
                        <Text
                          style={{
                            // textDecoration: 'underline',
                            // cursor: 'not-allowed',
                            color: '#D8D8D8',
                          }}
                        >
                          &gt;&gt;{i18n.t('Add_item')}
                        </Text>
                      )}
                    </Cell>
                  </TableWrapper>
                </ScrollView>
              </View>
            </TableWrapper>
            <TableWrapper>
              <Cell style={{ paddingTop: 4, paddingRight: 4, width: '100%' }}>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  {isSaveable && this._isAddContact() !== true && (
                    <Popconfirm
                      title={i18n.t('are_you_sure')}
                      onConfirm={() => this._deleteContact()}
                      okText={i18n.t('yes')}
                      cancelText={i18n.t('no')}
                      popStyle={{ zIndex: 99999, top: -180 }}
                    >
                      <Button style={{ marginRight: 4 }} disabled>
                        {i18n.t('Delete')}
                      </Button>
                    </Popconfirm>
                  )}
                  <Button
                    type='success'
                    onPress={e => this._save()}
                    disabled={!isSaveable}
                  >
                    {i18n.t('save')}
                  </Button>
                </View>
              </Cell>
            </TableWrapper>
          </View>
        </Table>
      </View>
    )
  }
}
