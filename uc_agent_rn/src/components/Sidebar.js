import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ReactDOM from 'react-dom'
import ButtonIconic from './ButtonIconic.js'
import DndableSafe from './DndableSafe.js'
import MenuBalloonDialog from './MenuBalloonDialog.js'
import MenuItem from './MenuItem.js'
import NameEmbeddedSpan from './NameEmbeddedSpan.js'
import StatusIcon from './StatusIcon.js'
import TextBox from './TextBox.js'
import {
  formatStr,
  formatMessageDateTime,
  toPlainText,
} from '../utilities/strings.js'

/**
 * Sidebar
 * props.uiData
 * props.uiData.ucUiAction
 * props.uiData.ucUiStore
 * props.uiData.configurations
 * props.uiData.runningAnimationTable
 * props.uiData.showingDialogVersion
 * props.uiData.mainAreaSplitters
 * props.uiData.currentSelectedTab
 * props.uiData.blinkingTabs
 * props.uiData.unscrolledTabs
 * props.uiData.showingDialog_update
 * props.uiData.sidebarBuddylistItem_onClick
 * props.uiData.sidebarBuddylistDndable_onDrop
 * props.uiData.sidebarBuddylistGroupTitle_onClick
 * props.uiData.sidebarBuddylistFilterOnlineOnlyCheckBox_onClick
 * props.uiData.sidebarBuddylistGroupRemoveDndable_onDrop
 * props.uiData.sidebarEditStatusDisplayButton_onClick
 * props.uiData.sidebarControlProfileStatusItem_onClick
 * props.uiData.sidebarPreferenceButton_onClick
 * props.uiData.sidebarHistoryButton_onClick
 * props.uiData.sidebarWebchatRequestsButton_onClick
 * props.uiData.sidebarServerPropertiesButton_onClick
 * props.uiData.sidebarAboutButton_onClick
 * props.uiData.sidebarCreateConferenceButton_onClick
 * props.uiData.sidebarSendBroadcastTextButton_onClick
 * props.uiData.sidebarExternalCallButton_onClick
 * props.uiData.sidebarCreateGroupButton_onClick
 * props.uiData.sidebarAreaSplitterItem_onClick
 * props.uiData.sidebarSignOutButton_onClick
 * props.style
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.interval = null
    this.delay = 0
    this.collapsibleControlButtonsCount = 0
    this.state = {
      buddylistFilterShowingDialogVersion: null,
      controlProfileShowingDialogVersion: null,
      areaSplitterShowingDialogVersion: null,
      controlButtonsCollapsedMenuShowingDialogVersion: null,
      buddylistFilterInputValue: '',
      controlButtonsCollapsedCount: 0,
    }
  }
  componentDidUpdate() {
    const props = this.props
    const newState = {}
    const controlProfile = ReactDOM.findDOMNode(this.refs['controlProfile'])
    const areaSplitterButton = ReactDOM.findDOMNode(
      this.refs['areaSplitterButton'],
    )
    const signOutButton = ReactDOM.findDOMNode(this.refs['signOutButton'])
    const controlProfileY1 = int(controlProfile && controlProfile.offsetTop)
    const areaSplitterButtonY2 = int(
      areaSplitterButton &&
        areaSplitterButton.offsetTop + areaSplitterButton.offsetHeight,
    )
    const signOutButtonY2 = int(
      signOutButton && signOutButton.offsetTop + signOutButton.offsetHeight,
    )
    if (
      controlProfileY1 - signOutButtonY2 < 0 &&
      this.state.controlButtonsCollapsedCount <
        this.collapsibleControlButtonsCount - 1
    ) {
      newState.controlButtonsCollapsedCount =
        this.state.controlButtonsCollapsedCount + 1
    } else if (
      controlProfileY1 - signOutButtonY2 >=
        signOutButtonY2 - areaSplitterButtonY2 &&
      this.state.controlButtonsCollapsedCount > 0
    ) {
      newState.controlButtonsCollapsedCount =
        this.state.controlButtonsCollapsedCount - 1
    }
    if (Object.keys(newState).length) {
      this.setState(newState)
    }
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
    if (this.delay) {
      this.interval = setInterval(this.setState.bind(this, {}), this.delay)
    }
  }
  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
  }
  handleBuddylistFilterInputTextBoxChange(ev) {
    const props = this.props
    this.setState({ buddylistFilterInputValue: string(ev.target.value) })
  }
  handleBuddylistFilterButtonClick(ev) {
    const props = this.props
    if (
      props.uiData.showingDialogVersion !==
      this.state.buddylistFilterShowingDialogVersion
    ) {
      this.setState({
        buddylistFilterShowingDialogVersion: ++props.uiData
          .showingDialogVersion,
      })
      ev.stopPropagation()
      props.uiData.fire('showingDialog_update')
    }
  }
  handleControlProfileClick(ev) {
    const props = this.props
    if (
      props.uiData.showingDialogVersion !==
      this.state.controlProfileShowingDialogVersion
    ) {
      this.setState({
        controlProfileShowingDialogVersion: ++props.uiData.showingDialogVersion,
      })
      ev.stopPropagation()
      props.uiData.fire('showingDialog_update')
    }
    props.uiData.ucUiAction.uncacheProfileImageUrl({ minSignInOKCount: 2 })
  }
  handleControlProfileBalloonDialogClick(ev) {
    const props = this.props
    if (
      ev &&
      ev.target &&
      ev.target.matches &&
      ev.target.matches(
        '.brControlProfileStatusItem,.brControlProfileStatusItem *',
      )
    ) {
      ev.stopPropagation()
    }
  }
  handleControlButtonsCollapsedMenuButtonClick(ev) {
    const props = this.props
    if (
      props.uiData.showingDialogVersion !==
      this.state.controlButtonsCollapsedMenuShowingDialogVersion
    ) {
      this.setState({
        controlButtonsCollapsedMenuShowingDialogVersion: ++props.uiData
          .showingDialogVersion,
      })
      ev.stopPropagation()
      props.uiData.fire('showingDialog_update')
    }
  }
  handleAreaSplitterButtonClick(ev) {
    const props = this.props
    if (
      props.uiData.showingDialogVersion !==
      this.state.areaSplitterShowingDialogVersion
    ) {
      this.setState({
        areaSplitterShowingDialogVersion: ++props.uiData.showingDialogVersion,
      })
      ev.stopPropagation()
      props.uiData.fire('showingDialog_update')
    }
  }
  render() {
    const props = this.props
    const profile = props.uiData.ucUiStore.getChatClient().getProfile()
    const buddylist = props.uiData.ucUiStore.getChatClient().getBuddylist()
    const configProperties = props.uiData.ucUiStore.getConfigProperties()
    const userMe = props.uiData.ucUiStore.getBuddyUserForUi(profile)
    const statusMe = props.uiData.ucUiStore.getChatClient().getStatus()
    const statusList =
      props.uiData.ucUiStore.getSignInStatus() === 3
        ? [
            {
              status: Constants.STATUS_AVAILABLE,
              label: uawMsgs.CMN_OWN_STATUS_STRING_AVAILABLE,
            },
            {
              status: Constants.STATUS_OFFLINE,
              label: uawMsgs.CMN_OWN_STATUS_STRING_INVISIBLE,
            },
            {
              status: Constants.STATUS_BUSY,
              label: uawMsgs.CMN_OWN_STATUS_STRING_BUSY,
            },
          ]
        : [
            {
              status: Constants.STATUS_OFFLINE,
              label: uawMsgs.CMN_OWN_STATUS_STRING_OFFLINE,
            },
          ]
    const BUDDYLIST_ITEM_HEIGHT = 58
    const nameDisplayMode = int(
      props.uiData.ucUiStore.getOptionalSetting({ key: ['name_display_mode'] }),
    )
    const displayCallStatus = int(
      props.uiData.ucUiStore.getOptionalSetting({
        key: ['display_call_status'],
      }),
    )
    const onlineOnly = props.uiData.ucUiStore.getLocalStoragePreference({
      keyList: ['onlineOnly'],
    })[0]
    const buddylistOpenList = props.uiData.ucUiStore
      .getLocalStoragePreference({ keyList: ['buddylistOpenList'] })[0]
      .split(',')
    const buddyTable =
      props.uiData.ucUiStore.getBuddyTable()[profile.tenant] || {}
    const buddies = Object.keys(buddyTable)
      .map(key => buddyTable[key])
      .filter(buddy => !buddy.isMe && buddy.isBuddy && !buddy.isTemporaryBuddy)
      .sort((buddy1, buddy2) => int(buddy1.buddyIndex) - int(buddy2.buddyIndex))
    const groupTable = {}
    this.delay = 0
    buddies.forEach(buddy => {
      const groupName = string(buddy.group)
      if (!groupTable[groupName]) {
        groupTable[groupName] = {
          groupIndex: int(buddy.groupIndex),
          buddyNodes: [],
          height: 0,
          onlines: 0,
        }
      }
      const panelCode = JSON.stringify({
        tenant: buddy.tenant,
        user_id: buddy.user_id,
      })
      const selected =
        props.uiData.currentSelectedTab === 'CHAT' + '_' + panelCode
      const user = props.uiData.ucUiStore.getBuddyUserForUi(buddy) || {}
      const status = props.uiData.getCurrentBuddyStatus(buddy) || {}
      let height = BUDDYLIST_ITEM_HEIGHT
      if (onlineOnly && status.status === Constants.STATUS_OFFLINE) {
        height = 0
      }
      if (
        this.state.buddylistFilterInputValue &&
        string(user.name)
          .toLowerCase()
          .indexOf(
            string(this.state.buddylistFilterInputValue).toLowerCase(),
          ) === -1
      ) {
        height = 0
      }
      const messageObject =
        (
          (
            props.uiData.ucUiStore
              .getChatList({ chatType: 'CHAT', chatCode: panelCode })
              .filter(chat => chat.type === 'paragraph')
              .pop() || {}
          ).messageList || []
        ).pop() || {} // TODO: yano
      let message = ''
      if (messageObject.ctype === Constants.CTYPE_FILE_REQUEST) {
        message = string(
          messageObject.messageFile && messageObject.messageFile.name,
        )
      } else if (messageObject.ctype === Constants.CTYPE_CALL_RESULT) {
        try {
          const callResult = JSON.parse(messageObject.messageText) || {}
          const senderUser =
            (!callResult.externalincoming &&
              props.uiData.ucUiStore.getBuddyUserForUi(
                messageObject.senderInfo,
              )) ||
            {}
          const min = Math.floor(int(callResult.talklen) / 60000)
          const sec =
            0 < callResult.talklen && callResult.talklen < 1000
              ? 1
              : Math.floor((int(callResult.talklen) % 60000) / 1000)
          if (senderUser.isMe || callResult.talklen) {
            message = uawMsgs.LBL_SIDEBAR_BUDDYLIST_ITEM_CALL + ' \u00A0 '
            message +=
              min > 0
                ? formatStr(
                    uawMsgs.LBL_SIDEBAR_BUDDYLIST_ITEM_CALL_RESULT_LENGTH_MIN,
                    min,
                    sec,
                  )
                : formatStr(
                    uawMsgs.LBL_SIDEBAR_BUDDYLIST_ITEM_CALL_RESULT_LENGTH_SEC,
                    sec,
                  )
          } else {
            message =
              uawMsgs.LBL_SIDEBAR_BUDDYLIST_ITEM_CALL_RESULT_DIRECTION_INCOMING_MISSED
          }
        } catch (ex) {}
      } else if (messageObject.ctype === Constants.CTYPE_OBJECT) {
      } else {
        message = toPlainText(messageObject.messageText)
      }
      let time = ''
      if (messageObject.sentTimeValue) {
        const timeValue = +new Date() - messageObject.sentTimeValue
        if (timeValue < 60000) {
          time = ''
          if (!this.delay || this.delay > 60000) {
            this.delay = 60000
          }
        } else if (timeValue < 3600000) {
          time = formatStr(
            uawMsgs.CMN_FORMAT_MINUTES_AGO,
            int(timeValue / 60000),
          )
          if (!this.delay || this.delay > 60000) {
            this.delay = 60000
          }
        } else if (timeValue < 86400000) {
          time = formatStr(
            uawMsgs.CMN_FORMAT_HOURS_AGO,
            int(timeValue / 3600000),
          )
          if (!this.delay || this.delay > 3600000) {
            this.delay = 3600000
          }
        } else {
          const sentTimeDate = new Date(messageObject.sentTimeValue)
          const year = sentTimeDate.getFullYear()
          const monthNum = sentTimeDate.getMonth() + 1
          const day = sentTimeDate.getDate()
          time = formatStr(
            uawMsgs.CMN_FORMAT_DATE,
            year,
            monthNum,
            day,
            uawMsgs['CMN_MONTH_STR_' + ('0' + monthNum).slice(-2)],
          )
        }
      }
      const unread =
        int(props.uiData.blinkingTabs['CHAT' + '_' + panelCode]) +
        int(props.uiData.unscrolledTabs['CHAT' + '_' + panelCode])
      if (!groupName || buddylistOpenList.indexOf(groupName) !== -1) {
        groupTable[groupName].height += height
      }
      if (status.status !== Constants.STATUS_OFFLINE) {
        groupTable[groupName].onlines++
      }
      groupTable[groupName].buddyNodes.push(
        <DndableSafe
          key={panelCode}
          uiData={props.uiData}
          className={
            'brBuddylistItem' +
            (displayCallStatus & 1 ? ' brWithColor' : '') +
            (displayCallStatus & 2 ? '' : ' brWithIcon') +
            (status.ui_customized_status &&
            status.ui_customized_status.callStatus > 0
              ? ' brCallStatus'
              : '') +
            (status.ui_customized_status &&
            1 <= status.ui_customized_status.conferenceStatus &&
            status.ui_customized_status.conferenceStatus < 100
              ? ' brConferenceStatus'
              : '') +
            (status.ui_customized_status &&
            100 <= status.ui_customized_status.conferenceStatus
              ? ' brConferenceStatusWebchat'
              : '') +
            (selected ? ' brSelected' : '') +
            (status.status === Constants.STATUS_OFFLINE ? ' brOffline' : '')
          }
          style={{ height: height }}
          dragSourceInfo={{
            dragSourceInfoType: 'buddylistItem',
            dragSourceInfoCode: panelCode,
          }}
          onCheckCanDrop={ev =>
            configProperties.buddy_mode !== Constants.BUDDY_MODE_AUTO &&
            ev.dragSourceInfo &&
            ev.dragSourceInfo.dragSourceInfoType === 'buddylistItem' &&
            ev.dragSourceInfo.dragSourceInfoCode !== panelCode
          }
          onDrop={props.uiData.fire.bind(
            props.uiData,
            'sidebarBuddylistDndable_onDrop',
            {
              dropTargetInfoType: 'buddylistItem',
              dropTargetInfoCode: panelCode,
            },
          )}
          onClick={props.uiData.fire.bind(
            props.uiData,
            'sidebarBuddylistItem_onClick',
            { tenant: buddy.tenant, user_id: buddy.user_id },
          )}
        >
          <div className='brBuddylistItemHeader'>
            <NameEmbeddedSpan
              ucUiStore={props.uiData.ucUiStore}
              format={
                '{0}' +
                (nameDisplayMode === 1 ? ' (' + buddy.user_id + ')' : '')
              }
              title={
                '{0}' +
                (nameDisplayMode === 1 ? ' (' + buddy.user_id + ') ' : ' ') +
                string(status.display)
              }
              buddy={buddy}
            />
            <span
              className='brCallStatusIcon br_bi_icon_phone_svg'
              title={uawMsgs.LBL_SIDEBAR_CALL_STATUS_ICON_TOOLTIP}
            ></span>
            <span
              className='brConferenceStatusIcon br_bi_icon_conference_foreground_selected_svg'
              title={uawMsgs.LBL_SIDEBAR_CONFERENCE_STATUS_ICON_TOOLTIP}
            ></span>
            <span
              className='brConferenceStatusWebchatIcon br_bi_icon_internet_svg'
              title={
                uawMsgs.LBL_SIDEBAR_CONFERENCE_STATUS_ICON_TOOLTIP +
                ' (Webchat)'
              }
            ></span>
            <span
              className='brBuddylistItemInfo'
              title={string(status.display)}
            >
              {string(status.display)}
            </span>
          </div>
          <div className='brBuddylistItemMessage'>
            <span className='brBuddylistItemInfo' title={message}>
              {message}
            </span>
          </div>
          <div className='brBuddylistItemTime'>
            <span
              className='brBuddylistItemInfo'
              title={formatMessageDateTime(messageObject.sentTimeValue)}
            >
              {time}
            </span>
          </div>
          <div className='brBuddylistItemMarker' />
          <div
            className={'brBuddylistItemUnread' + (unread ? '' : ' brHidden')}
          >
            <span className='brBuddylistItemInfo'>{unread}</span>
          </div>
          <div
            className={
              'brBuddylistItemImage' +
              (buddy.profile_image_url ? '' : ' brNoImage') +
              (buddy.profile_image_url &&
              string(buddy.profile_image_url).indexOf(
                Constants.PROFILE_IMAGE_URL_DOWNLOAD,
              ) === -1
                ? ' brMyProfileImageUrl'
                : '') +
              (status.status === Constants.STATUS_OFFLINE ? ' brOffline' : '')
            }
            title={string(user.name)}
            style={
              buddy.profile_image_url
                ? { backgroundImage: 'url(' + buddy.profile_image_url + ')' }
                : {}
            }
            onClick={props.uiData.ucUiAction.uncacheProfileImageUrl.bind(
              props.uiData.ucUiAction,
              { minSignInOKCount: 1, uncacheParam2: int(Date.now() / 3600000) },
            )}
          />
          <StatusIcon
            className='brBuddylistItemStatusIcon'
            status={status.status}
            degree={status.degree}
          />
        </DndableSafe>,
      )
    })
    ;[{ id: '' }].concat(buddylist.user).forEach((buddy, index) => {
      if (buddy && typeof buddy.id === 'string' && !groupTable[buddy.id]) {
        // add empty group
        groupTable[buddy.id] = {
          groupIndex: index - 1,
          buddyNodes: [],
          height: 0,
          onlines: 0,
        }
      }
    })
    const groupNodes = Object.keys(groupTable)
      .sort(
        (groupName1, groupName2) =>
          (groupTable[groupName1].groupIndex >>> 0) -
          (groupTable[groupName2].groupIndex >>> 0),
      )
      .map(groupName => (
        <div key={groupName} className='brBuddylistGroup'>
          <DndableSafe
            uiData={props.uiData}
            className={
              'brBuddylistGroupTitle' + (groupName ? ' brGroupName' : '')
            }
            dragSourceInfo={{
              dragSourceInfoType: 'buddylistGroupTitle',
              dragSourceInfoCode: groupName,
            }}
            onCheckCanDrop={ev =>
              configProperties.buddy_mode !== Constants.BUDDY_MODE_AUTO &&
              ev.dragSourceInfo &&
              (ev.dragSourceInfo.dragSourceInfoType === 'buddylistItem' ||
                (ev.dragSourceInfo.dragSourceInfoType ===
                  'buddylistGroupTitle' &&
                  ev.dragSourceInfo.dragSourceInfoCode !== groupName &&
                  ev.dragSourceInfo.dragSourceInfoCode &&
                  groupName))
            }
            onDrop={props.uiData.fire.bind(
              props.uiData,
              'sidebarBuddylistDndable_onDrop',
              {
                dropTargetInfoType: 'buddylistGroupTitle',
                dropTargetInfoCode: groupName,
              },
            )}
            onClick={props.uiData.fire.bind(
              props.uiData,
              'sidebarBuddylistGroupTitle_onClick',
              groupName,
            )}
          >
            <div className='brBuddylistGroupLabel'>
              <span className='brBuddylistGroupName'>{groupName}</span>
              <span className='brBuddylistGroupOnlines'>
                {groupTable[groupName].buddyNodes.length
                  ? ' ' +
                    groupTable[groupName].onlines +
                    '/' +
                    groupTable[groupName].buddyNodes.length
                  : ''}
              </span>
            </div>
            <div
              className={
                'brBuddylistGroupOpenIcon' +
                (buddylistOpenList.indexOf(groupName) !== -1
                  ? ' br_bi_icon_chevron_up_svg'
                  : ' br_bi_icon_chevron_down_svg')
              }
            />
          </DndableSafe>
          <div
            className='brBuddylistItems'
            style={{ height: groupTable[groupName].height }}
          >
            {groupTable[groupName].buddyNodes}
          </div>
        </div>
      ))
    const collapsibleControlButtons = [
      <ButtonIconic
        key='createConferenceButton'
        className='brControlButton brCreateConferenceButton br_bi_icon_conference_foreground_selected_svg'
        title={uawMsgs.LBL_SIDEBAR_CREATE_CONFERENCE_BUTTON_TOOLTIP}
        onClick={props.uiData.fire.bind(
          props.uiData,
          'sidebarCreateConferenceButton_onClick',
        )}
      ></ButtonIconic>,
      <ButtonIconic
        key='sendBroadcastTextButton'
        className='brControlButton brSendBroadcastTextButton br_bi_icon_broadcasting_svg'
        title={uawMsgs.LBL_SIDEBAR_SEND_BROADCAST_TEXT_BUTTON_TOOLTIP}
        onClick={props.uiData.fire.bind(
          props.uiData,
          'sidebarSendBroadcastTextButton_onClick',
        )}
      ></ButtonIconic>,
      <ButtonIconic
        key='externalCallButton'
        className='brControlButton brExternalCallButton br_bi_icon_phone_svg'
        title={uawMsgs.LBL_SIDEBAR_EXTERNAL_CALL_BUTTON_TOOLTIP}
        onClick={props.uiData.fire.bind(
          props.uiData,
          'sidebarExternalCallButton_onClick',
        )}
      ></ButtonIconic>,
    ]
    if (
      (
        (configProperties &&
          configProperties.optional_config &&
          configProperties.optional_config.awsl) ||
        []
      ).some(
        aws =>
          aws.og &&
          !aws.og.disabled &&
          aws.og.reply_types &&
          aws.og.reply_types.length &&
          aws.senders,
      )
    ) {
      collapsibleControlButtons.push(
        <ButtonIconic
          key='outgoingWebchatButton'
          className='brControlButton brOutgoingWebchatButton br_bi_icon_send_svg'
          title={uawMsgs.LBL_SIDEBAR_OUTGOING_WEBCHAT_BUTTON_TOOLTIP}
          onClick={props.uiData.fire.bind(
            props.uiData,
            'sidebarOutgoingWebchatButton_onClick',
          )}
        ></ButtonIconic>,
      )
    }
    if (configProperties.buddy_mode !== Constants.BUDDY_MODE_AUTO) {
      collapsibleControlButtons.push(
        <ButtonIconic
          key='createGroupButton'
          className='brControlButton brCreateGroupButton br_bi_icon_add_folder_svg'
          title={uawMsgs.LBL_SIDEBAR_CREATE_GROUP_BUTTON_TOOLTIP}
          onClick={props.uiData.fire.bind(
            props.uiData,
            'sidebarCreateGroupButton_onClick',
          )}
        ></ButtonIconic>,
      )
    }
    const userListButtonType = int(
      props.uiData.configurations.userListButtonType,
    )
    const allUsersCount = (
      (props.uiData.ucUiStore.getChatClient().getAllUsers() || {}).user || []
    ).filter(u => !u.disabledBuddy && u.user_id !== profile.user_id).length
    const buddy_max = int(
      props.uiData.ucUiStore.getOptionalSetting({ key: 'buddy_max' }),
    )
    if (
      !(
        userListButtonType === 2 ||
        (userListButtonType === 1 &&
          configProperties.buddy_mode !== Constants.BUDDY_MODE_MANUAL &&
          !buddylist.screened &&
          allUsersCount <= buddy_max)
      )
    ) {
      collapsibleControlButtons.push(
        <ButtonIconic
          key='userListButton'
          className={
            'brControlButton brUserListButton br_bi_icon_list_svg' +
            (statusMe.status !== Constants.STATUS_OFFLINE &&
            !buddylist.screened &&
            allUsersCount > buddy_max
              ? ' brOver'
              : '')
          }
          title={uawMsgs.LBL_SIDEBAR_USER_LIST_BUTTON_TOOLTIP}
          onClick={props.uiData.fire.bind(
            props.uiData,
            'sidebarUserListButton_onClick',
          )}
        ></ButtonIconic>,
      )
    }
    this.collapsibleControlButtonsCount = collapsibleControlButtons.length
    return (
      <div
        className={
          'brSidebar' +
          (this.state.controlButtonsCollapsedCount
            ? ' brControlButtonsCollapsible' +
              ' brControlButtonsCollapsedCount' +
              this.state.controlButtonsCollapsedCount
            : '')
        }
        style={props.style || {}}
      >
        <div className='brBuddylistbar'>
          <div className='brBuddylist'>{groupNodes}</div>
          <div className='brBuddylistFilterArea'>
            <TextBox
              className='brBuddylistFilterInput'
              value={this.state.buddylistFilterInputValue}
              placeholder={
                uawMsgs.LBL_SIDEBAR_BUDDYLIST_FILTER_INPUT_PLACEHOLDER
              }
              onChange={this.handleBuddylistFilterInputTextBoxChange.bind(this)}
            />
          </div>
          <ButtonIconic
            className='brBuddylistFilterButton br_bi_icon_filtration_svg'
            title={uawMsgs.LBL_SIDEBAR_BUDDYLIST_FILTER_BUTTON_TOOLTIP}
            onClick={this.handleBuddylistFilterButtonClick.bind(this)}
          >
            <MenuBalloonDialog
              showing={
                props.uiData.showingDialogVersion ===
                this.state.buddylistFilterShowingDialogVersion
              }
              className='brBuddylistFilterBalloonDialog'
            >
              <div
                className={
                  'brBuddylistFilterOnlineOnlyCheckBox' +
                  (onlineOnly
                    ? ' br_bi_icon_check_svg'
                    : ' br_bi_icon_square_svg')
                }
                onClick={props.uiData.fire.bind(
                  props.uiData,
                  'sidebarBuddylistFilterOnlineOnlyCheckBox_onClick',
                )}
              >
                {uawMsgs.LBL_SIDEBAR_ONLINE_ONLY_ITEM}
              </div>
            </MenuBalloonDialog>
          </ButtonIconic>
          <DndableSafe
            uiData={props.uiData}
            className='brBuddylistGroupRemoveDndable br_bi_icon_bin_svg'
            onCheckCanDrop={ev =>
              configProperties.buddy_mode !== Constants.BUDDY_MODE_AUTO &&
              ev.dragSourceInfo &&
              ev.dragSourceInfo.dragSourceInfoType === 'buddylistGroupTitle' &&
              ev.dragSourceInfo.dragSourceInfoCode
            }
            onDrop={props.uiData.fire.bind(
              props.uiData,
              'sidebarBuddylistGroupRemoveDndable_onDrop',
            )}
          ></DndableSafe>
        </div>
        <div className='brControlbar'>
          <div
            className='brControlLogo'
            title={props.uiData.configurations.productShortName || 'UC'}
            style={{
              backgroundImage:
                'url(' +
                (((profile.user_type !== Constants.USER_TYPE_SYSTEM_ADMIN ||
                  props.uiData.configurations.hideProductComp === 'true') &&
                  props.uiData.configurations.logoPath) ||
                  'img/logo.png') +
                ')',
            }}
          />
          <div
            ref='controlProfile'
            className={
              'brControlProfile' +
              (userMe.profile_image_url ? '' : ' brNoImage') +
              (userMe.profile_image_url &&
              string(userMe.profile_image_url).indexOf(
                Constants.PROFILE_IMAGE_URL_DOWNLOAD,
              ) === -1
                ? ' brMyProfileImageUrl'
                : '')
            }
            title={userMe.name + ' ' + statusMe.display}
            style={
              userMe.profile_image_url
                ? { backgroundImage: 'url(' + userMe.profile_image_url + ')' }
                : {}
            }
            onClick={this.handleControlProfileClick.bind(this)}
            onMouseEnter={props.uiData.fire.bind(
              props.uiData,
              'sidebarControlProfile_onMouseEnter',
            )}
          >
            <StatusIcon
              className='brControlProfileStatusIcon'
              status={statusMe.status}
            />
          </div>
          <MenuBalloonDialog
            showing={
              props.uiData.showingDialogVersion ===
              this.state.controlProfileShowingDialogVersion
            }
            className='brControlProfileBalloonDialog'
            onClick={this.handleControlProfileBalloonDialogClick.bind(this)}
          >
            <div className='brControlProfileHeader'>
              <span className='brControlProfileName'>
                {userMe.name +
                  (nameDisplayMode === 1 ? ' (' + profile.user_id + ') ' : ' ')}
              </span>
              <span className='brControlProfileDisplay'>
                {statusMe.display + ' '}
              </span>
              <ButtonIconic
                className='brEditStatusDisplay br_bi_icon_edit_svg'
                hidden={statusMe.status === Constants.STATUS_OFFLINE}
                title={uawMsgs.LBL_SIDEBAR_EDIT_STATUS_DISPLAY_BUTTON_TOOLTIP}
                onClick={props.uiData.fire.bind(
                  props.uiData,
                  'sidebarEditStatusDisplayButton_onClick',
                )}
              ></ButtonIconic>
            </div>
            {statusList.map(s => (
              <MenuItem
                key={s.status}
                className='brControlProfileStatusItem'
                onClick={props.uiData.fire.bind(
                  props.uiData,
                  'sidebarControlProfileStatusItem_onClick',
                  s.status,
                )}
              >
                <StatusIcon
                  className='brControlProfileStatusItemStatusIcon'
                  status={s.status}
                />
                <div
                  className={
                    'brControlProfileStatusItemChecked' +
                    (s.status === statusMe.status
                      ? ' br_bi_icon_ook_svg'
                      : ' brHidden')
                  }
                />
                {s.label}
              </MenuItem>
            ))}
            <div className='brSeparator' />
            <MenuItem
              className='brControlProfileItem brPreferenceButton br_bi_icon_user_svg'
              onClick={props.uiData.fire.bind(
                props.uiData,
                'sidebarPreferenceButton_onClick',
              )}
            >
              <span>{uawMsgs.LBL_SIDEBAR_PREFERENCE_ITEM}</span>
            </MenuItem>
            <MenuItem
              className='brControlProfileItem brHistoryButton br_bi_icon_history_svg'
              onClick={props.uiData.fire.bind(
                props.uiData,
                'sidebarHistoryButton_onClick',
              )}
            >
              <span>{uawMsgs.LBL_SIDEBAR_HISTORY_ITEM}</span>
            </MenuItem>
            <MenuItem
              className='brControlProfileItem brWebchatRequestsButton br_bi_icon_internet_svg'
              hidden={configProperties.webchat_enabled !== 'true'}
              onClick={props.uiData.fire.bind(
                props.uiData,
                'sidebarWebchatRequestsButton_onClick',
              )}
            >
              <span>{uawMsgs.LBL_SIDEBAR_WEBCHAT_REQUESTS_ITEM}</span>
            </MenuItem>
            <MenuItem
              className='brControlProfileItem brServerPropertiesButton br_bi_icon_settings_svg'
              hidden={
                true /* profile.user_type !== Constants.USER_TYPE_TENANT_ADMIN */
              }
              onClick={props.uiData.fire.bind(
                props.uiData,
                'sidebarServerPropertiesButton_onClick',
              )}
            >
              <span>{uawMsgs.LBL_SIDEBAR_SERVER_PROPERTIES_ITEM}</span>
            </MenuItem>
            <MenuItem
              className='brControlProfileItem brAboutButton br_bi_icon_about_svg'
              hidden={
                props.uiData.configurations.hideProduct === 'true' &&
                (profile.user_type !== Constants.USER_TYPE_SYSTEM_ADMIN ||
                  props.uiData.configurations.hideProductComp === 'true')
              }
              onClick={props.uiData.fire.bind(
                props.uiData,
                'sidebarAboutButton_onClick',
              )}
            >
              <span>
                {formatStr(
                  uawMsgs.LBL_SIDEBAR_ABOUT_ITEM,
                  props.uiData.configurations.productName || 'UC',
                )}
              </span>
            </MenuItem>
          </MenuBalloonDialog>
          <div className='brControlStatusDisplayArea'>
            <div
              className={
                'brControlStatusDisplayLabel' +
                (props.uiData.runningAnimationTable['controlstatusdisplay']
                  ? ' brAnimation'
                  : '')
              }
            >
              {statusMe.display}
            </div>
          </div>
          {this.state.controlButtonsCollapsedCount
            ? collapsibleControlButtons.slice(
                0,
                -this.state.controlButtonsCollapsedCount - 1,
              )
            : collapsibleControlButtons}
          <ButtonIconic
            className='brControlButton brControlButtonsCollapsedMenuButton br_bi_icon_more_svg'
            hidden={this.state.controlButtonsCollapsedCount === 0}
            title={
              uawMsgs.LBL_SIDEBAR_CONTROL_BUTTONS_COLLAPSED_MENU_BUTTON_TOOLTIP
            }
            onClick={this.handleControlButtonsCollapsedMenuButtonClick.bind(
              this,
            )}
          >
            <MenuBalloonDialog
              showing={
                props.uiData.showingDialogVersion ===
                this.state.controlButtonsCollapsedMenuShowingDialogVersion
              }
              className='brControlButtonsCollapsedMenuBalloonDialog'
            >
              {this.state.controlButtonsCollapsedCount
                ? collapsibleControlButtons.slice(
                    -this.state.controlButtonsCollapsedCount - 1,
                  )
                : []}
            </MenuBalloonDialog>
          </ButtonIconic>
          <ButtonIconic
            ref='areaSplitterButton'
            className={
              'brControlButton brAreaSplitterButton' +
              (props.uiData.mainAreaSplitters === 2
                ? ' br_bi_icon_channel_mosaic_4_svg'
                : props.uiData.mainAreaSplitters === 1
                  ? ' br_bi_icon_channel_mosaic_1_2_svg'
                  : ' br_bi_icon_channel_mosaic_1_svg')
            }
            title={uawMsgs.LBL_SIDEBAR_AREA_SPLITTER_BUTTON_TOOLTIP}
            onClick={this.handleAreaSplitterButtonClick.bind(this)}
          >
            <MenuBalloonDialog
              showing={
                props.uiData.showingDialogVersion ===
                this.state.areaSplitterShowingDialogVersion
              }
              className='brAreaSplitterBalloonDialog'
            >
              <MenuItem
                className='brAreaSplitterItem br_bi_icon_channel_mosaic_1_svg'
                onClick={props.uiData.fire.bind(
                  props.uiData,
                  'sidebarAreaSplitterItem_onClick',
                  0,
                )}
              >
                <span>{uawMsgs.LBL_SIDEBAR_AREA_SPLITTER_ITEM_0}</span>
              </MenuItem>
              <MenuItem
                className='brAreaSplitterItem br_bi_icon_channel_mosaic_1_2_svg'
                onClick={props.uiData.fire.bind(
                  props.uiData,
                  'sidebarAreaSplitterItem_onClick',
                  1,
                )}
              >
                <span>{uawMsgs.LBL_SIDEBAR_AREA_SPLITTER_ITEM_1}</span>
              </MenuItem>
              <MenuItem
                className='brAreaSplitterItem br_bi_icon_channel_mosaic_4_svg'
                onClick={props.uiData.fire.bind(
                  props.uiData,
                  'sidebarAreaSplitterItem_onClick',
                  2,
                )}
              >
                <span>{uawMsgs.LBL_SIDEBAR_AREA_SPLITTER_ITEM_2}</span>
              </MenuItem>
            </MenuBalloonDialog>
          </ButtonIconic>
          <ButtonIconic
            ref='signOutButton'
            className='brControlButton brSignOutButton br_bi_icon_log_out_svg'
            title={uawMsgs.LBL_SIDEBAR_SIGN_OUT_BUTTON_TOOLTIP}
            onClick={props.uiData.fire.bind(
              props.uiData,
              'sidebarSignOutButton_onClick',
            )}
          ></ButtonIconic>
        </div>
      </div>
    )
  }
}
