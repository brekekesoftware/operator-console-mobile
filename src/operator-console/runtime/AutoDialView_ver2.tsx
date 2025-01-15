import { ActivityIndicator, Checkbox, Switch } from '@ant-design/react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { createRef } from 'react'
import type { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { RnIcon } from '../../components/RnIcon'
import { BrekekeOperatorConsole } from '..//OperatorConsole'
import { CallHistory2 } from '../call/CallHistory2'
import { Button } from '../common/Button'
import { Input } from '../common/Input'
import { Notification } from '../common/Notification'
import { Popconfirm } from '../common/Popconfirm'
import { Cell, Table, TableWrapper } from '../common/Table'
import { WidgetButton } from '../common/WidgetButton'
import { i18n } from '../i18n'
import { OCUtil } from '../OCUtil'
import { OperatorConsoleStyles } from '../OperatorConsoleStyles'
import { PhonebookContactInfo_AutoDialView_ver2 } from './PhonebookContactInfo_AutoDialView_ver2'
import { PhonebookContactInfozInfoView } from './PhonebookContactInfozInfoView'
import { PhonebookContactInfozTelsView } from './PhonebookContactInfozTelsView'

let AUTO_DIAL_VIEW_VER2
const _GET_CONTACT_LIST_LIMIT = 1000 // !limit max 1000

type Props = {
  isVisible: boolean
}

type State = {
  recentShowDetailChecked: boolean
  rerender?: boolean
  tab?: 'recent' | 'ext' | 'phonebook'
  isOnlyShareContact: boolean
}

export class AutoDialView_ver2 extends React.Component<Props, State> {
  _phonebookContactInfoArray
  _latestSearchPhonebookName
  _latestSearchPhonebookShared
  _latestSearchPhonebookKeywords
  refKeyword
  constructor(props) {
    super(props)
    this.state = {
      recentShowDetailChecked: false,
      tab: 'recent',
      isOnlyShareContact: false,
    }
    this.refKeyword = createRef()
    AUTO_DIAL_VIEW_VER2 = this
    this._phonebookContactInfoArray = null
    this._latestSearchPhonebookName = null
    this._latestSearchPhonebookShared = null
    this._latestSearchPhonebookKeywords = null
  }

  _getPhonebookScrollableDivElement() {
    return document.getElementById(
      'phonebookScrollableDiv_brOC_AutoDialView_ver2',
    )
  }

  _isPhonebookScrollableDivzVerticalScrollbarVisible() {
    const e = this._getPhonebookScrollableDivElement()
    const scrollHeight = e.scrollHeight
    const clientHeight = e.clientHeight
    const b = scrollHeight > clientHeight
    return b
  }

  _resetPhonebookContactInfoArrayAsync(pbKeywords, pbShared, pbName = '') {
    const oc = BrekekeOperatorConsole.getStaticInstance()
    const systemSettingsData = oc.getSystemSettingsData()
    if (!pbName) {
      pbName = systemSettingsData.getAutoDialPhonebookName()
    }

    this._latestSearchPhonebookName = pbName
    this._latestSearchPhonebookShared = pbShared
    this._latestSearchPhonebookKeywords = pbKeywords
    if (this._phonebookContactInfoArray == null) {
      this._phonebookContactInfoArray = new Array()
    } else {
      this._phonebookContactInfoArray.length = 0 // clear array
    }
    this.setState({ rerender: true })
    this._appendPhonebookContactsRecursive()
  }

  _appendPhonebookContactsRecursive() {
    setTimeout(() => {
      // if (this._isPhonebookScrollableDivzVerticalScrollbarVisible() !== true) {
      this._appendPhonebookContactsAsync()
        .then(contactListCount => {
          this.setState({ rerender: true })
          if (contactListCount > 0) {
            this._appendPhonebookContactsRecursive()
          }
        })
        .catch(err => {
          console.error('Failed to get phonebook contacts.', err)
          try {
            const sErr = JSON.stringify(err)
            Notification.error({
              message:
                i18n.t('An_error_occurred_while_retrieving_the_phone_book') +
                '\r\n' +
                sErr,
              duration: 0,
            })
          } catch (err) {
            Notification.error({
              message:
                i18n.t('An_error_occurred_while_retrieving_the_phone_book') +
                '\r\n' +
                err,
              duration: 0,
            })
          }
        })
      // }
    }, 1)
  }

  static getStaticInstance() {
    return AUTO_DIAL_VIEW_VER2
  }

  _clearCallNoHistory2(this_) {
    const oc = BrekekeOperatorConsole.getStaticInstance()
    const promise = oc.getCallHistory2().clearCallHistory2(
      () => {
        Notification.success({
          key: 'sync',
          message: i18n.t('saved_data_to_pbx_successfully'),
        })
      },
      errorOrResponse => {
        OCUtil.logErrorWithNotification(
          'Faild to clear call histories.',
          i18n.t('failed_to_save_data_to_pbx'),
          errorOrResponse,
        )
      },
    )
  }

  _tabSwitchAndSortIfNeedCallHistory2(e) {
    this.tabSwitch(e)
    const oc = BrekekeOperatorConsole.getStaticInstance()
    const sort = oc.getSystemSettingsData().getAutoDialRecentDisplayOrder()
    oc.getCallHistory2().sortIfNeed(sort)
  }

  tabSwitch = e => {
    this.setState({ tab: e })
  }

  _onClickClose() {
    const oc = BrekekeOperatorConsole.getStaticInstance()
    oc.abortAutoDialView_ver2()
    PhonebookContactInfozTelsView.getStaticPhonebookContactInfozTelsViewInstance().closePhonebookContactInfozTelsView()
  }

  _onClickGetContactList(e) {
    const keywords = this._getPhonebookKeywordsValue()
    const bOnlySharedContacts = this._getPhonebookSharedValue()
    this._resetPhonebookContactInfoArrayAsync(keywords, bOnlySharedContacts)
  }

  _getPhonebookKeywordsValue() {
    const keywords = this.refKeyword.current?.getValue()
    return keywords
  }

  _getPhonebookSharedValue() {
    return this.state.isOnlyShareContact
  }

  _onPhonebookKeywordsFocus(e) {
    const oc = BrekekeOperatorConsole.getStaticInstance()
    oc.addDisableKeydownToDialingCounter()
    oc.addDisablePasteToDialingCounter()
  }

  _onPhonebookKeywordsBlur(e) {
    const oc = BrekekeOperatorConsole.getStaticInstance()
    oc.subtractDisableKeydownToDialingCounter()
    oc.subtractDisablePasteToDialingCounter()
  }

  _onScrollPhonebookScrollableDiv(e) {
    if (this._isPhonebookScrollableDivzVerticalScrollbarVisible() !== true) {
      return
    }

    const { scrollHeight, scrollTop, clientHeight, offsetHeight } = e.target

    // if (Math.abs(scrollHeight - clientHeight - scrollTop) < 1) {  //!comment not perfect
    if (scrollHeight - offsetHeight - scrollTop < 1) {
      this._appendPhonebookContactsAsync()
        .then(() => {
          this.setState({ rerender: true })
        })
        .catch(err => {
          console.error(
            'An error occurred while processing the phone book.',
            err,
          )
          try {
            const sErr = JSON.stringify(err)
            Notification.error({
              message:
                i18n.t('An_error_occurred_while_processing_the_phone_book') +
                '\r\n' +
                sErr,
              duration: 0,
            })
          } catch (err) {
            Notification.error({
              message:
                i18n.t('An_error_occurred_while_processing_the_phone_book') +
                '\r\n' +
                err,
              duration: 0,
            })
          }
        })
    }
  }

  /**
   *
   * @returns {Promise<number>}   error:-2,contactList is null:-1:other:contactList's count
   * @private
   */
  async _appendPhonebookContactsAsync() {
    const oc = BrekekeOperatorConsole.getStaticInstance()
    const pbBaseName = this._latestSearchPhonebookName
    const pbShared = this._latestSearchPhonebookShared
    const pbKeywords = this._latestSearchPhonebookKeywords

    // const pbShared = this._getPhonebookSharedValue();
    // const pbKeywords = this._getPhonebookKeywordsValue();
    const options = {}
    if (pbBaseName && pbBaseName.length !== 0) {
      options['phonebook'] = pbBaseName
    }
    if (pbShared !== undefined && pbShared !== null) {
      options['shared'] = pbShared
    }
    if (pbKeywords && pbKeywords.length !== 0) {
      options['search_text'] = pbKeywords
    }
    if (_GET_CONTACT_LIST_LIMIT > 0) {
      options['limit'] = _GET_CONTACT_LIST_LIMIT
    }

    const phoneClient = oc.getPhoneClient()
    const offset = this._phonebookContactInfoArray.length
    options['offset'] = offset
    let contactListCount

    const getContactListOptions = {
      methodName: 'getContactList',
      methodParams: JSON.stringify(options),
    }

    const contactList = await oc
      .getPalRestApi()
      .callPalRestApiMethodAsync(getContactListOptions)
      .catch(rej => {
        OCUtil.logErrorWithNotification(
          'Failed to get phonebook contact list.',
          i18n.t('Failed_to_get_phone_book_contact_list'),
          rej,
        )
        contactListCount = -2
        return contactListCount
      })

    if (contactList) {
      for (let i = 0; i < contactList.length; i++) {
        const contactListItem = contactList[i]
        const aid = contactListItem['aid']
        const getContactOptions = {
          methodName: 'getContact',
          methodParams: JSON.stringify({
            aid,
          }),
        }
        const contact = await oc
          .getPalRestApi()
          .callPalRestApiMethodAsync(getContactOptions)
          .catch(rej => {
            OCUtil.logErrorWithNotification(
              'Failed to get phonebook contact.',
              i18n.t('Failed_to_get_phone_book_contact'),
              rej,
            )
            contactListCount = -2
            return contactListCount
          })
        const contactInfo = new PhonebookContactInfo_AutoDialView_ver2(contact)
        this._phonebookContactInfoArray.push(contactInfo)
        contactListCount = contactList.length
      }
    } else {
      contactListCount = -1
    }
    return contactListCount
  }

  _callPhonebookCallInfozTel(pbContactInfozTeIInfo) {
    const tel = pbContactInfozTeIInfo.getValue()
    const oc = BrekekeOperatorConsole.getStaticInstance()
    oc.setDialingAndMakeCall(tel)
    oc.abortAutoDialView_ver2()
  }

  _openPhonebookCallInfozTelsView(pbContactInfo) {
    const pbContactInfozTelsView =
      PhonebookContactInfozTelsView.getStaticPhonebookContactInfozTelsViewInstance()
    pbContactInfozTelsView.closePhonebookContactInfozTelsView(() =>
      pbContactInfozTelsView.openPhonebookContactInfozTelsView(pbContactInfo),
    )
  }

  _openPhonebookCallInfozInfoView(pbContactInfo) {
    const pbContactInfozInfoView =
      PhonebookContactInfozInfoView.getStaticPhonebookContactInfozInfoViewInstance()
    const pbContactInfozTelsView =
      PhonebookContactInfozTelsView.getStaticPhonebookContactInfozTelsViewInstance()
    pbContactInfozTelsView.closePhonebookContactInfozTelsView(() => {
      pbContactInfozInfoView.closePhonebookContactInfozInfoView(() =>
        pbContactInfozInfoView.openPhonebookContactInfozInfoView(pbContactInfo),
      )
    })
  }

  _deleteContact(pbContactInfo) {
    const oc = BrekekeOperatorConsole.getStaticInstance()
    const isShared = pbContactInfo.getIsShared() === true
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

    const aid = pbContactInfo.getAid()

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
      this._resetPhonebookContactInfoArrayAsync(
        this._latestSearchPhonebookKeywords,
        this._latestSearchPhonebookShared,
        this._latestSearchPhonebookName,
      )
    }

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
          this._resetPhonebookContactInfoArrayAsync(
            this._latestSearchPhonebookKeywords,
            this._latestSearchPhonebookShared,
            this._latestSearchPhonebookName,
          )
        } else {
          // const arFailed = ret["failed"];
          failFunc()
        }
      },
      onFailFunction: resOrError => failFunc(resOrError),
    }
    oc.getPalRestApi().callPalRestApiMethod(deleteContactOptions)
  }

  _openAddContactView() {
    const pbContactInfozInfoView =
      PhonebookContactInfozInfoView.getStaticPhonebookContactInfozInfoViewInstance()
    const pbContactInfozTelsView =
      PhonebookContactInfozTelsView.getStaticPhonebookContactInfozTelsViewInstance()
    pbContactInfozTelsView.closePhonebookContactInfozTelsView(() => {
      pbContactInfozInfoView.closePhonebookContactInfozInfoView(() =>
        pbContactInfozInfoView.openPhonebookContactInfozInfoView(),
      )
    })
  }

  _onRecentShowDetailChange(e) {
    const checked = e.target.checked
    this.setState({ recentShowDetailChecked: checked })
  }

  render() {
    if (!this.props.isVisible) {
      return null
    }

    const tabStyle: StyleProp<ViewStyle> = {
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderColor: '#E0E0E0',
      borderWidth: 1,
      flex: 1,
    }

    const tabStyleSelected: StyleProp<ViewStyle> = {
      backgroundColor: '#5C9842',
    }

    const textStyle: StyleProp<TextStyle> = {
      textAlign: 'center',
    }

    const textStyleSelected: StyleProp<TextStyle> = {
      color: '#ffffff',
    }

    const textHeader: StyleProp<TextStyle> = {
      textTransform: 'uppercase',
      fontWeight: 'bold',
    }

    const oc = BrekekeOperatorConsole.getStaticInstance()
    const callHistory2 = oc.getCallHistory2()
    const systemSettingsData = oc.getSystemSettingsData()
    callHistory2.sortIfNeed(systemSettingsData.getAutoDialRecentDisplayOrder()) // !bad Not a render logic
    const recentDisplayOrder =
      systemSettingsData.getAutoDialRecentDisplayOrder()
    const recentDisplayCount = systemSettingsData.getAutoDialMaxDisplayCount()
    return (
      <>
        <PhonebookContactInfozInfoView />
        <PhonebookContactInfozTelsView />
        <View
          style={{
            position: 'absolute',
            top: 100,
            // bottom: 0,
            right: 48,
            zIndex: 111,
            borderRadius: 5,
            backgroundColor: 'white',
          }}
        >
          <Table
            style={{
              borderRadius: 5,
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: '#e0e0e0',
              padding: 15,
              backgroundColor: '#F5F5F5',
              width: 500,
              flex: 1,
              position: 'relative',
            }}
          >
            <Table style={{ width: '100%', zIndex: 200 }}>
              <TableWrapper style={{ flex: 1, flexDirection: 'row' }}>
                <Cell style={{ flex: 1, alignItems: 'flex-start' }}>
                  <Popconfirm
                    title={i18n.t('are_you_sure')}
                    onConfirm={() => this._clearCallNoHistory2(this)}
                    okText={i18n.t('yes')}
                    cancelText={i18n.t('no')}
                  >
                    <Button
                      disabled
                      style={{ width: 150, backgroundColor: 'white' }}
                    >
                      {i18n.t('ClearRecent')}
                    </Button>
                  </Popconfirm>
                </Cell>
                <View>
                  <TouchableOpacity onPress={this._onClickClose.bind(this)}>
                    <FontAwesomeIcon
                      icon={['far', 'window-close']}
                      size={25}
                      color='#584937'
                    />
                  </TouchableOpacity>
                </View>
              </TableWrapper>
            </Table>

            <Table
              style={{
                marginTop: 6,
                flex: 1,
                backgroundColor: 'white',
                zIndex: 111,
              }}
            >
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={[
                      tabStyle,
                      this.state.tab === 'recent' ? tabStyleSelected : {},
                    ]}
                  >
                    <TouchableOpacity
                      onPress={e =>
                        this._tabSwitchAndSortIfNeedCallHistory2('recent')
                      }
                      style={{ flex: 1 }}
                    >
                      <Text
                        style={[
                          textStyle,
                          this.state.tab === 'recent' ? textStyleSelected : {},
                        ]}
                      >
                        {i18n.t('Recent')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={[
                      tabStyle,
                      this.state.tab === 'ext' ? tabStyleSelected : {},
                    ]}
                  >
                    <TouchableOpacity
                      style={{ flex: 1 }}
                      onPress={() => this.tabSwitch('ext')}
                    >
                      <Text
                        style={[
                          textStyle,
                          this.state.tab === 'ext' ? textStyleSelected : {},
                        ]}
                      >
                        {i18n.t('ExtensionNumber')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={[
                      tabStyle,
                      this.state.tab === 'phonebook' ? tabStyleSelected : {},
                    ]}
                  >
                    <TouchableOpacity
                      style={{ flex: 1 }}
                      onPress={e => {
                        this.tabSwitch('phonebook')
                        if (this._phonebookContactInfoArray === null) {
                          this._resetPhonebookContactInfoArrayAsync()
                        }
                      }}
                    >
                      <Text
                        style={[
                          textStyle,
                          this.state.tab === 'phonebook'
                            ? textStyleSelected
                            : {},
                        ]}
                      >
                        {i18n.t('Phonebook')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View
                  style={{
                    flex: 1,
                    borderColor: '#ccc',
                    borderBottomRightRadius: 5,
                    borderBottomLeftRadius: 5,
                    borderWidth: 1,
                  }}
                >
                  {this.state.tab === 'recent' && (
                    <View style={{ flex: 1 }}>
                      {recentDisplayOrder ===
                        CallHistory2.RECENT_DISPLAY_ORDERS
                          .CALL_OR_INCOMING_COUNT_DESC && (
                        <View style={{ flex: 1 }}>
                          <Table style={{ flex: 1 }}>
                            <TableWrapper
                              style={{
                                paddingTop: 6,
                                borderColor: '#e0e0e0',
                                borderWidth: 1,
                              }}
                            >
                              <Cell
                                style={{ width: '1%' }}
                                textStyle={textHeader}
                              >
                                {i18n.t('CallNo')}
                              </Cell>
                              <Cell
                                style={{ width: 20 }}
                                textStyle={textHeader}
                              >
                                {i18n.t('Status')}
                              </Cell>
                              <Cell></Cell>
                              <Cell textStyle={textHeader}>
                                {i18n.t('LatestStartedAt')}
                              </Cell>
                            </TableWrapper>

                            <View style={{ flex: 1 }}>
                              {callHistory2
                                .getCallHistory2CallInfoArray()
                                .slice(0, recentDisplayCount)
                                .map((callHistory2CallInfo, i) => {
                                  const partyNumber =
                                    callHistory2CallInfo.getPartyNumber()
                                  const isExtension =
                                    OCUtil.indexOfArrayFromExtensions(
                                      oc.state.extensions,
                                      partyNumber,
                                    ) !== -1
                                  const extensionsStatus =
                                    oc.state.extensionsStatus
                                  const statusClassName = isExtension
                                    ? OCUtil.getExtensionStatusClassName(
                                        partyNumber,
                                        extensionsStatus,
                                      )
                                    : ''
                                  const sAddDateTime = new Date(
                                    callHistory2CallInfo.getAddCallMillisTime(),
                                  ).toLocaleString()
                                  return (
                                    <TableWrapper
                                      key={i}
                                      style={{
                                        borderBottomWidth: 1,
                                        borderColor: '#e0e0e0',
                                      }}
                                    >
                                      <Cell style={{ width: '1%' }}>
                                        {partyNumber}
                                      </Cell>
                                      <Cell>
                                        <View
                                          style={
                                            OperatorConsoleStyles[
                                              statusClassName
                                            ]
                                          }
                                        ></View>
                                      </Cell>
                                      <Cell>
                                        {partyNumber && (
                                          <View
                                            style={{
                                              display: 'flex',
                                              justifyContent: 'center',
                                            }}
                                          >
                                            <WidgetButton
                                              style={{
                                                // padding: 2,
                                                // marginLeft: 2,
                                                // marginRight: 2,
                                                // marginBottom: 8,
                                                height: 40,
                                                width: 40,
                                              }}
                                              paddingHorizontal={0}
                                              stretch={false}
                                              onPress={() => {
                                                oc.abortAutoDialView_ver2()
                                                // this.props.operatorConsoleAsParent.setDialingAndMakeCall2( callNo, this.props.currentCallIndex, this.props.callIds, this.props.callById );
                                                oc.setDialingAndMakeCall2(
                                                  partyNumber,
                                                )
                                              }}
                                            >
                                              {
                                                <FontAwesomeIcon
                                                  size={16}
                                                  icon={['fas', 'phone']}
                                                />
                                              }
                                            </WidgetButton>
                                          </View>
                                        )}
                                      </Cell>
                                      <Cell>{sAddDateTime}</Cell>
                                    </TableWrapper>
                                  )
                                })}
                            </View>
                          </Table>
                        </View>
                      )}
                      {recentDisplayOrder ===
                        CallHistory2.RECENT_DISPLAY_ORDERS
                          .ADD_DATETIME_DESC && (
                        <>
                          <View
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              margin: 4,
                            }}
                          >
                            <Checkbox
                              // id='recentShowDetail_brOC_AutoDialView_ver2'
                              checked={this.state.recentShowDetailChecked}
                              onChange={e => this._onRecentShowDetailChange(e)}
                            />
                            <Text style={{ marginLeft: 2 }}>
                              {i18n.t('Show_detail')}
                            </Text>
                          </View>
                          <View
                            style={{
                              maxHeight: 400,
                              height: 400,
                            }}
                          >
                            <ScrollView contentContainerStyle={{ flex: 0 }}>
                              <Table style={{ marginLeft: 20 }}>
                                <View>
                                  <TableWrapper style={{ paddingTop: 6 }}>
                                    <Cell style={{ width: '1%' }}>
                                      {i18n.t('Tel')}
                                    </Cell>
                                    <Cell style={{ width: 20 }}>
                                      {i18n.t('Status')}
                                    </Cell>
                                    <Cell></Cell>
                                    <Cell>{i18n.t('Incoming')}</Cell>
                                    <Cell>{i18n.t('StartedAt')}</Cell>
                                    {this.state.recentShowDetailChecked && (
                                      <Cell>{i18n.t('AnsweredAt')}</Cell>
                                    )}
                                    {this.state.recentShowDetailChecked && (
                                      <Cell>{i18n.t('EndedAt')}</Cell>
                                    )}
                                  </TableWrapper>
                                </View>
                                <View>
                                  {callHistory2
                                    .getCallHistory2CallInfoArray()
                                    .slice(0, recentDisplayCount)
                                    .map((callHistory2CallInfo, i) => {
                                      const partyNumber =
                                        callHistory2CallInfo.getPartyNumber()
                                      const isExtension =
                                        OCUtil.indexOfArrayFromExtensions(
                                          oc.state.extensions,
                                          partyNumber,
                                        ) !== -1
                                      const extensionsStatus =
                                        oc.state.extensionsStatus
                                      const statusClassName = isExtension
                                        ? OCUtil.getExtensionStatusClassName(
                                            partyNumber,
                                            extensionsStatus,
                                          )
                                        : ''
                                      const sIsIncoming =
                                        callHistory2CallInfo.getIsIncoming()
                                          ? '✓'
                                          : ''
                                      const sStartedAt = new Date(
                                        callHistory2CallInfo.getAddCallMillisTime(),
                                      ).toLocaleString()
                                      const sAnsweredAt =
                                        callHistory2CallInfo.getAnsweredAt()
                                          ? new Date(
                                              callHistory2CallInfo.getAnsweredAt(),
                                            ).toLocaleString()
                                          : ''
                                      const sEndedAt =
                                        callHistory2CallInfo.getEndCallMillisTime()
                                          ? new Date(
                                              callHistory2CallInfo.getEndCallMillisTime(),
                                            ).toLocaleString()
                                          : ''
                                      return (
                                        <TableWrapper key={i}>
                                          <Cell
                                            style={{
                                              width: '1%',
                                            }}
                                          >
                                            {partyNumber}
                                          </Cell>
                                          <Cell>
                                            <View
                                              style={
                                                OperatorConsoleStyles[
                                                  statusClassName
                                                ]
                                              }
                                            ></View>
                                          </Cell>
                                          <Cell>
                                            {partyNumber && (
                                              <View
                                                style={{
                                                  display: 'flex',
                                                  justifyContent: 'center',
                                                }}
                                              >
                                                <WidgetButton
                                                  style={{
                                                    padding: 2,
                                                    marginLeft: 2,
                                                    marginRight: 2,
                                                    marginBottom: 8,
                                                  }}
                                                  paddingHorizontal={0}
                                                  stretch={false}
                                                  onPress={() => {
                                                    oc.abortAutoDialView_ver2()
                                                    // this.props.operatorConsoleAsParent.setDialingAndMakeCall2( callNo, this.props.currentCallIndex, this.props.callIds, this.props.callById );
                                                    oc.setDialingAndMakeCall2(
                                                      partyNumber,
                                                    )
                                                  }}
                                                >
                                                  {
                                                    <FontAwesomeIcon
                                                      size={30}
                                                      icon={['fas', 'phone']}
                                                    />
                                                  }
                                                </WidgetButton>
                                              </View>
                                            )}
                                          </Cell>
                                          <Cell
                                            textStyle={{
                                              textAlign: 'center',
                                            }}
                                          >
                                            {sIsIncoming}
                                          </Cell>
                                          <Cell>{sStartedAt}</Cell>
                                          {this.state
                                            .recentShowDetailChecked && (
                                            <Cell>{sAnsweredAt}</Cell>
                                          )}
                                          {this.state
                                            .recentShowDetailChecked && (
                                            <Cell>{sEndedAt}</Cell>
                                          )}
                                        </TableWrapper>
                                      )
                                    })}
                                </View>
                              </Table>
                            </ScrollView>
                          </View>
                        </>
                      )}
                    </View>
                  )}
                  {this.state.tab === 'ext' && (
                    <View style={{ maxHeight: 400, height: 400 }}>
                      <Table style={{ flex: 1 }}>
                        <TableWrapper
                          style={{
                            paddingTop: 6,
                            borderWidth: 1,
                            borderStyle: 'solid',
                            borderColor: '#e0e0e0',
                          }}
                        >
                          <Cell textStyle={textHeader}>{i18n.t('ID')}</Cell>
                          <Cell textStyle={textHeader}>{i18n.t('Name')}</Cell>
                          <Cell textStyle={textHeader}>{i18n.t('Status')}</Cell>
                          <Cell></Cell>
                        </TableWrapper>

                        <View style={{ height: 300 }}>
                          <ScrollView style={{ flex: 1 }}>
                            <View style={{ flex: 1 }}>
                              {oc.state.extensions.map((ext, i) => {
                                const extensionsStatus =
                                  oc.state.extensionsStatus
                                const statusClassName =
                                  OCUtil.getExtensionStatusClassName(
                                    ext.id,
                                    extensionsStatus,
                                  )

                                return (
                                  <TableWrapper
                                    key={i}
                                    style={{
                                      borderBottomWidth: 1,
                                      borderStyle: 'solid',
                                      borderColor: '#e0e0e0',
                                    }}
                                  >
                                    <Cell style={{ width: 100 }}>{ext.id}</Cell>
                                    <Cell style={{ width: 100 }}>
                                      {ext.name}
                                    </Cell>
                                    <Cell style={{ width: 20 }}>
                                      <View
                                        style={
                                          OperatorConsoleStyles[statusClassName]
                                        }
                                      ></View>
                                    </Cell>
                                    <Cell>
                                      <View
                                        style={{
                                          display: 'flex',
                                          justifyContent: 'center',
                                        }}
                                      >
                                        <WidgetButton
                                          style={{
                                            // padding: 2,
                                            // marginLeft: 2,
                                            // marginRight: 2,
                                            // marginBottom: 8,
                                            height: 40,
                                            width: 40,
                                          }}
                                          paddingHorizontal={0}
                                          stretch={false}
                                          onPress={() => {
                                            // oc.setDialingAndMakeCall2( ext.id, this.props.currentCallIndex, this.props.callIds, this.props.callById );
                                            oc.setDialingAndMakeCall2(ext.id)
                                            oc.abortAutoDialView_ver2()
                                          }}
                                        >
                                          {
                                            <FontAwesomeIcon
                                              size={16}
                                              icon={['fas', 'phone']}
                                            />
                                          }
                                        </WidgetButton>
                                      </View>
                                    </Cell>
                                  </TableWrapper>
                                )
                              })}
                            </View>
                          </ScrollView>
                        </View>
                      </Table>
                    </View>
                  )}
                  {this.state.tab === 'phonebook' && (
                    <Table style={{ flex: 1 }}>
                      <TableWrapper style={{ paddingTop: 6 }}>
                        <View style={{ paddingLeft: 20 }}>
                          <Input
                            ref={this.refKeyword}
                            maxLength={1000}
                            placeholder={i18n.t('Keywords')}
                            allowClear
                            defaultValue={''}
                            onFocus={e => this._onPhonebookKeywordsFocus(e)}
                            onBlur={e => this._onPhonebookKeywordsBlur(e)}
                            style={{ width: 300 }}
                          />
                        </View>
                        <View style={{ paddingLeft: 4 }}>
                          <WidgetButton
                            style={{
                              padding: 2,
                              marginLeft: 2,
                              marginRight: 2,
                              marginBottom: 8,
                              width: 40,
                              height: 40,
                            }}
                            paddingHorizontal={0}
                            stretch={false}
                            onPress={e => this._onClickGetContactList(e)}
                          >
                            <RnIcon path='M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z' />
                          </WidgetButton>
                        </View>
                        <View style={{ width: '99%' }}></View>
                      </TableWrapper>
                      <TableWrapper style={{ paddingTop: 6 }}>
                        <Cell>{i18n.t('OnlySharedContacts')}</Cell>
                        <Cell style={{ paddingLeft: 0 }}>
                          <Switch
                            checked={this.state.isOnlyShareContact}
                            onChange={e =>
                              this.setState({ isOnlyShareContact: e })
                            }
                            // defaultChecked={false}   //!bug? Sometimes it stops working.
                          />
                        </Cell>
                        <Cell style={{ width: '99%' }}></Cell>
                      </TableWrapper>
                      <TableWrapper style={{ paddingTop: 6 }}>
                        <View
                          // colSpan='3'
                          style={{ padding: 0, width: '100%' }}
                        >
                          <View
                            style={{ maxHeight: 300 }}
                            id='phonebookScrollableDiv_brOC_AutoDialView_ver2'
                            // onScroll={e =>
                            //   this._onScrollPhonebookScrollableDiv(
                            //     e,
                            //   )
                            // }
                          >
                            <ScrollView
                              contentContainerStyle={{ overflow: 'visible' }}
                            >
                              {this._phonebookContactInfoArray === null && (
                                <View
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: 'auto',
                                  }}
                                >
                                  <ActivityIndicator />
                                </View>
                              )}
                              {this._phonebookContactInfoArray !== null && (
                                <Table
                                  style={{
                                    width: '100%',
                                  }}
                                >
                                  <TableWrapper
                                    style={{
                                      borderColor: '#e0e0e0',
                                      borderWidth: 1,
                                    }}
                                  >
                                    <Cell textStyle={textHeader}>
                                      {i18n.t('DisplayName')}
                                    </Cell>
                                    <Cell
                                      textStyle={{
                                        textAlign: 'center',
                                        ...textHeader,
                                      }}
                                    >
                                      {i18n.t('Call')}
                                    </Cell>
                                    <Cell
                                      textStyle={{
                                        textAlign: 'center',
                                        ...textHeader,
                                      }}
                                    >
                                      {i18n.t('Info')}
                                    </Cell>
                                    <Cell
                                      textStyle={{
                                        textAlign: 'center',
                                        ...textHeader,
                                      }}
                                    >
                                      {i18n.t('Delete')}
                                    </Cell>
                                  </TableWrapper>
                                  <View>
                                    {this._phonebookContactInfoArray.map(
                                      (pbContactInfo, i) => {
                                        const isShared =
                                          pbContactInfo.getIsShared()
                                        const isAdmin = oc.getIsAdmin()
                                        const isDeletable =
                                          isShared === false ||
                                          (isShared === true &&
                                            isAdmin === true)
                                        return (
                                          <TableWrapper
                                            key={i}
                                            style={{
                                              height: 42,
                                              borderColor: '#e0e0e0',
                                              borderBottomWidth: 1,
                                            }}
                                          >
                                            <Cell>
                                              {pbContactInfo.getDisplayName()}
                                            </Cell>
                                            <Cell>
                                              <View
                                                style={{
                                                  display: 'flex',
                                                  alignItems: 'center',
                                                  justifyContent: 'center',
                                                }}
                                              >
                                                {pbContactInfo.getFreezedPhonebookContactInfozTelInfoArray()
                                                  .length === 1 && (
                                                  <WidgetButton
                                                    style={{
                                                      padding: 2,
                                                      marginLeft: 2,
                                                      marginRight: 2,
                                                      marginBottom: 8,
                                                    }}
                                                    paddingHorizontal={0}
                                                    stretch={false}
                                                    onPress={e =>
                                                      this._callPhonebookCallInfozTel(
                                                        pbContactInfo.getFreezedPhonebookContactInfozTelInfoArray()[0],
                                                      )
                                                    }
                                                  >
                                                    <FontAwesomeIcon
                                                      size={16}
                                                      icon={['fas', 'phone']}
                                                    />
                                                  </WidgetButton>
                                                )}
                                                {pbContactInfo.getFreezedPhonebookContactInfozTelInfoArray()
                                                  .length > 1 && (
                                                  <TouchableOpacity
                                                    onPress={e =>
                                                      this._openPhonebookCallInfozTelsView(
                                                        pbContactInfo,
                                                      )
                                                    }
                                                  >
                                                    <FontAwesomeIcon
                                                      size={16}
                                                      icon={['fas', 'phone']}
                                                    />
                                                  </TouchableOpacity>
                                                )}
                                              </View>
                                            </Cell>
                                            <Cell>
                                              <View
                                                style={{
                                                  display: 'flex',
                                                  alignItems: 'center',
                                                  justifyContent: 'center',
                                                }}
                                              >
                                                <TouchableOpacity
                                                  onPress={e =>
                                                    this._openPhonebookCallInfozInfoView(
                                                      pbContactInfo,
                                                    )
                                                  }
                                                >
                                                  {
                                                    <FontAwesomeIcon
                                                      size={16}
                                                      icon={[
                                                        'fas',
                                                        'info-circle',
                                                      ]}
                                                    />
                                                  }
                                                </TouchableOpacity>
                                              </View>
                                            </Cell>
                                            <Cell>
                                              {isDeletable && (
                                                <View
                                                  style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                  }}
                                                >
                                                  <Popconfirm
                                                    title={i18n.t(
                                                      'are_you_sure',
                                                    )}
                                                    onConfirm={() =>
                                                      this._deleteContact(
                                                        pbContactInfo,
                                                      )
                                                    }
                                                    okText={i18n.t('yes')}
                                                    cancelText={i18n.t('no')}
                                                    popStyle={{
                                                      zIndex: 130,
                                                      top: -50,
                                                      left: -170,
                                                    }}
                                                  >
                                                    {
                                                      <FontAwesomeIcon
                                                        size={16}
                                                        icon={['fas', 'trash']}
                                                      />
                                                    }
                                                  </Popconfirm>
                                                </View>
                                              )}
                                            </Cell>
                                          </TableWrapper>
                                        )
                                      },
                                    )}
                                  </View>
                                </Table>
                              )}
                            </ScrollView>
                          </View>
                        </View>
                      </TableWrapper>
                      <TableWrapper
                        style={{
                          backgroundColor: 'transparent',
                          // flex: 1
                        }}
                      >
                        <Cell
                          style={{
                            paddingRight: 4,
                            paddingTop: 4,
                            backgroundColor: 'transparent',
                            width: '100%',
                          }}
                        >
                          <View
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              flexDirection: 'row',
                              justifyContent: 'flex-end',
                              // backgroundColor: 'red',
                              width: '100%',
                            }}
                          >
                            <Button onPress={e => this._openAddContactView()}>
                              {i18n.t('Add_contact')}
                            </Button>
                          </View>
                        </Cell>
                      </TableWrapper>
                    </Table>
                  )}
                </View>
              </View>
            </Table>
          </Table>
        </View>
        {/* <DropDownMenu operatorConsole={oc} ></DropDownMenu>*/}
      </>
    )
  }
}
