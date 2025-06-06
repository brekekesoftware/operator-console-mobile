import React from 'react'
import uawMsgs from '../utilities/uawmsgs'
import Constants from '../utilities/constants'
import { int, string } from '../utilities/strings'
import ButtonIconic from './ButtonIconic'
import DndableSafe from './DndableSafe'
import MenuBalloonDialog from './MenuBalloonDialog'
import MenuItem from './MenuItem'
import NameEmbeddedSpan from './NameEmbeddedSpan'
import StatusIcon from './StatusIcon'
import TextBox from './TextBox'
import {
  formatStr,
  formatMessageDateTime,
  toPlainText,
} from '../utilities/strings'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native'
import AboutIcon from '../icons/AboutIcon'
import PhoneIcon from '../icons/PhoneIcon'
import ConferenceForegroundSelectedIcon from '../icons/ConferenceForegroundSelectedIcon'
import BroadcastingIcon from '../icons/BroadcastingIcon'
import SendIcon from '../icons/SendIcon'
import AddFolderIcon from '../icons/AddFolderIcon'
import ListIcon from '../icons/ListIcon'
import FiltrationIcon from '../icons/FiltrationIcon'
import BinIcon from '../icons/BinIcon'
import EditIcon from '../icons/EditIcon'
import UserIcon from '../icons/UserIcon'
import HistoryIcon from '../icons/HistoryIcon'
import SettingsIcon from '../icons/SettingsIcon'
import MoreIcon from '../icons/MoreIcon'
import LogOutIcon from '../icons/LogOutIcon'
import CheckIcon from '../icons/CheckIcon'
import SquareIcon from '../icons/SquareIcon'
import ChevronUpIcon from '../icons/ChevronUpIcon'
import ChevronDownIcon from '../icons/ChevronDownIcon'
import ChannelMosaic4Icon from '../icons/ChannelMosaic4Icon'
import ChannelMosaic12Icon from '../icons/ChannelMosaic12Icon'
import InternetIcon from '../icons/InternetIcon'
import ChannelMosaic1Icon from '../icons/ChannelMosaic1Icon'

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

    // Add refs
    this.controlProfileRef = React.createRef()
    this.areaSplitterButtonRef = React.createRef()
    this.signOutButtonRef = React.createRef()

    this.state = {
      buddylistFilterShowingDialogVersion: null,
      controlProfileShowingDialogVersion: null,
      areaSplitterShowingDialogVersion: null,
      controlButtonsCollapsedMenuShowingDialogVersion: null,
      buddylistFilterInputValue: '',
      controlButtonsCollapsedCount: 0,
    }

    this.statusDisplayAnim = new Animated.Value(0)
  }
  componentDidUpdate() {
    const props = this.props
    const newState = {}

    // Get measurements using onLayout
    Promise.all([
      new Promise(resolve => {
        if (this.controlProfileRef.current) {
          this.controlProfileRef.current.measure(
            (x, y, width, height, pageX, pageY) => {
              resolve(pageY) // This is equivalent to offsetTop
            },
          )
        } else {
          resolve(0)
        }
      }),
      new Promise(resolve => {
        if (this.areaSplitterButtonRef.current) {
          this.areaSplitterButtonRef.current.measure(
            (x, y, width, height, pageX, pageY) => {
              resolve(pageY + height) // This is equivalent to offsetTop + offsetHeight
            },
          )
        } else {
          resolve(0)
        }
      }),
      new Promise(resolve => {
        if (this.signOutButtonRef.current) {
          this.signOutButtonRef.current.measure(
            (x, y, width, height, pageX, pageY) => {
              resolve(pageY + height) // This is equivalent to offsetTop + offsetHeight
            },
          )
        } else {
          resolve(0)
        }
      }),
    ]).then(([controlProfileY1, areaSplitterButtonY2, signOutButtonY2]) => {
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
    })

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
  animateStatusDisplay() {
    Animated.sequence([
      Animated.timing(this.statusDisplayAnim, {
        toValue: -30,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.delay(1000),
      Animated.timing(this.statusDisplayAnim, {
        toValue: -60,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start()
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
          style={[
            styles.brBuddylistItem,
            displayCallStatus & 1 && styles.brWithColor,
            displayCallStatus & 2 && styles.brWithIcon,
            status.ui_customized_status?.callStatus > 0 && styles.brCallStatus,
            status.ui_customized_status?.conferenceStatus >= 1 &&
              status.ui_customized_status?.conferenceStatus < 100 &&
              styles.brConferenceStatus,
            status.ui_customized_status?.conferenceStatus >= 100 &&
              styles.brConferenceStatusWebchat,
            selected && styles.brSelected,
            status.status === Constants.STATUS_OFFLINE && styles.brOffline,
            { height },
          ]}
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
          onDrop={() =>
            props.uiData.fire('sidebarBuddylistDndable_onDrop', {
              dropTargetInfoType: 'buddylistItem',
              dropTargetInfoCode: panelCode,
            })
          }
          onPress={() =>
            props.uiData.fire('sidebarBuddylistItem_onClick', {
              tenant: buddy.tenant,
              user_id: buddy.user_id,
            })
          }
        >
          <View style={styles.brBuddylistItemHeader}>
            <NameEmbeddedSpan
              ucUiStore={props.uiData.ucUiStore}
              format={`{0}${nameDisplayMode === 1 ? ` (${buddy.user_id})` : ''}`}
              title={`{0}${nameDisplayMode === 1 ? ` (${buddy.user_id}) ` : ' '}${string(status.display)}`}
              buddy={buddy}
            />
            <PhoneIcon width={16} height={16} />
            <View style={{ marginHorizontal: 4 }}>
              <ConferenceForegroundSelectedIcon width={16} height={16} />
            </View>
            <View style={{ marginHorizontal: 4 }}>
              <InternetIcon width={16} height={16} />
            </View>
            <Text
              style={styles.brBuddylistItemInfo}
              accessibilityLabel={string(status.display)}
            >
              {string(status.display)}
            </Text>
          </View>

          <View style={styles.brBuddylistItemMessage}>
            <Text
              style={styles.brBuddylistItemInfo}
              accessibilityLabel={message}
              numberOfLines={1}
            >
              {message}
            </Text>
          </View>

          <View style={styles.brBuddylistItemTime}>
            <Text
              style={styles.brBuddylistItemInfo}
              accessibilityLabel={formatMessageDateTime(
                messageObject.sentTimeValue,
              )}
            >
              {time}
            </Text>
          </View>

          <View style={styles.brBuddylistItemMarker} />

          {unread ? (
            <View style={styles.brBuddylistItemUnread}>
              <Text style={styles.brBuddylistItemInfo}>{unread}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            style={[
              styles.brBuddylistItemImage,
              !buddy.profile_image_url && styles.brNoImage,
              buddy.profile_image_url &&
                string(buddy.profile_image_url).indexOf(
                  Constants.PROFILE_IMAGE_URL_DOWNLOAD,
                ) === -1 &&
                styles.brMyProfileImageUrl,
              status.status === Constants.STATUS_OFFLINE && styles.brOffline,
            ]}
            accessibilityLabel={string(user.name)}
            onPress={() =>
              props.uiData.ucUiAction.uncacheProfileImageUrl({
                minSignInOKCount: 1,
                uncacheParam2: int(Date.now() / 3600000),
              })
            }
          >
            {buddy.profile_image_url && (
              <Image
                source={{ uri: buddy.profile_image_url }}
                style={styles.profileImage}
              />
            )}
          </TouchableOpacity>

          <StatusIcon
            style={styles.brBuddylistItemStatusIcon}
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
        <View key={groupName} style={styles.brBuddylistGroup}>
          <DndableSafe
            uiData={props.uiData}
            style={[
              styles.brBuddylistGroupTitle,
              groupName && styles.brGroupName,
            ]}
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
            onDrop={() =>
              props.uiData.fire('sidebarBuddylistDndable_onDrop', {
                dropTargetInfoType: 'buddylistGroupTitle',
                dropTargetInfoCode: groupName,
              })
            }
            onPress={() =>
              props.uiData.fire('sidebarBuddylistGroupTitle_onClick', groupName)
            }
          >
            <View style={styles.brBuddylistGroupLabel}>
              <Text style={styles.brBuddylistGroupName}>{groupName}</Text>
              <Text style={styles.brBuddylistGroupOnlines}>
                {groupTable[groupName].buddyNodes.length
                  ? ` ${groupTable[groupName].onlines}/${groupTable[groupName].buddyNodes.length}`
                  : ''}
              </Text>
            </View>
            <View style={{ marginLeft: 4 }}>
              {buddylistOpenList.indexOf(groupName) !== -1 ? (
                <ChevronUpIcon width={16} height={16} />
              ) : (
                <ChevronDownIcon width={16} height={16} />
              )}
            </View>
          </DndableSafe>

          <View
            style={[
              styles.brBuddylistItems,
              { height: groupTable[groupName].height },
            ]}
          >
            {groupTable[groupName].buddyNodes}
          </View>
        </View>
      ))
    const collapsibleControlButtons = [
      <ButtonIconic
        key='createConferenceButton'
        style={[styles.brControlButton, styles.brCreateConferenceButton]}
        iconSource={<ConferenceForegroundSelectedIcon />}
        accessibilityLabel={
          uawMsgs.LBL_SIDEBAR_CREATE_CONFERENCE_BUTTON_TOOLTIP
        }
        onPress={() =>
          props.uiData.fire('sidebarCreateConferenceButton_onClick')
        }
      />,
      <ButtonIconic
        key='sendBroadcastTextButton'
        style={[styles.brControlButton, styles.brSendBroadcastTextButton]}
        iconSource={<BroadcastingIcon />}
        accessibilityLabel={
          uawMsgs.LBL_SIDEBAR_SEND_BROADCAST_TEXT_BUTTON_TOOLTIP
        }
        onPress={() =>
          props.uiData.fire('sidebarSendBroadcastTextButton_onClick')
        }
      />,
      <ButtonIconic
        key='externalCallButton'
        style={[styles.brControlButton, styles.brExternalCallButton]}
        iconSource={<PhoneIcon width={16} height={16} />}
        accessibilityLabel={uawMsgs.LBL_SIDEBAR_EXTERNAL_CALL_BUTTON_TOOLTIP}
        onPress={() => props.uiData.fire('sidebarExternalCallButton_onClick')}
      />,
    ]
    if (
      (configProperties?.optional_config?.awsl || []).some(
        aws =>
          aws.og &&
          !aws.og.disabled &&
          aws.og.reply_types?.length &&
          aws.senders,
      )
    ) {
      collapsibleControlButtons.push(
        <ButtonIconic
          key='outgoingWebchatButton'
          style={[styles.brControlButton, styles.brOutgoingWebchatButton]}
          iconSource={<SendIcon />}
          accessibilityLabel={
            uawMsgs.LBL_SIDEBAR_OUTGOING_WEBCHAT_BUTTON_TOOLTIP
          }
          onPress={() =>
            props.uiData.fire('sidebarOutgoingWebchatButton_onClick')
          }
        />,
      )
    }
    if (configProperties.buddy_mode !== Constants.BUDDY_MODE_AUTO) {
      collapsibleControlButtons.push(
        <ButtonIconic
          key='createGroupButton'
          style={[styles.brControlButton, styles.brCreateGroupButton]}
          iconSource={<AddFolderIcon />}
          accessibilityLabel={uawMsgs.LBL_SIDEBAR_CREATE_GROUP_BUTTON_TOOLTIP}
          onPress={() => props.uiData.fire('sidebarCreateGroupButton_onClick')}
        />,
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
          style={[
            styles.brControlButton,
            styles.brUserListButton,
            statusMe.status !== Constants.STATUS_OFFLINE &&
              !buddylist.screened &&
              allUsersCount > buddy_max &&
              styles.brOver,
          ]}
          iconSource={<ListIcon />}
          accessibilityLabel={uawMsgs.LBL_SIDEBAR_USER_LIST_BUTTON_TOOLTIP}
          onPress={() => props.uiData.fire('sidebarUserListButton_onClick')}
        />,
      )
    }
    this.collapsibleControlButtonsCount = collapsibleControlButtons.length
    return (
      <View
        style={[
          styles.brSidebar,
          this.state.controlButtonsCollapsedCount &&
            styles.brControlButtonsCollapsible,
          this.state.controlButtonsCollapsedCount && {
            ...styles[
              `brControlButtonsCollapsedCount${this.state.controlButtonsCollapsedCount}`
            ],
          },
          props.style,
        ]}
      >
        <View style={styles.brBuddylistbar}>
          <View style={styles.brBuddylist}>{groupNodes}</View>

          <View style={styles.brBuddylistFilterArea}>
            <TextBox
              style={styles.brBuddylistFilterInput}
              value={this.state.buddylistFilterInputValue}
              placeholder={
                uawMsgs.LBL_SIDEBAR_BUDDYLIST_FILTER_INPUT_PLACEHOLDER
              }
              onChangeText={text =>
                this.setState({ buddylistFilterInputValue: string(text) })
              }
            />
          </View>

          <ButtonIconic
            style={styles.brBuddylistFilterButton}
            iconSource={<FiltrationIcon />}
            accessibilityLabel={
              uawMsgs.LBL_SIDEBAR_BUDDYLIST_FILTER_BUTTON_TOOLTIP
            }
            onPress={this.handleBuddylistFilterButtonClick.bind(this)}
          >
            <MenuBalloonDialog
              showing={
                props.uiData.showingDialogVersion ===
                this.state.buddylistFilterShowingDialogVersion
              }
              style={styles.brBuddylistFilterBalloonDialog}
            >
              <TouchableOpacity
                style={[
                  styles.brBuddylistFilterOnlineOnlyCheckBox,
                  onlineOnly ? styles.brChecked : styles.brUnchecked,
                ]}
                onPress={() =>
                  props.uiData.fire(
                    'sidebarBuddylistFilterOnlineOnlyCheckBox_onClick',
                  )
                }
              >
                <View style={{ marginRight: 8 }}>
                  {onlineOnly ? <CheckIcon /> : <SquareIcon />}
                </View>
                <Text style={styles.checkboxLabel}>
                  {uawMsgs.LBL_SIDEBAR_ONLINE_ONLY_ITEM}
                </Text>
              </TouchableOpacity>
            </MenuBalloonDialog>
          </ButtonIconic>

          <DndableSafe
            uiData={props.uiData}
            style={styles.brBuddylistGroupRemoveDndable}
            iconSource={<BinIcon />}
            onCheckCanDrop={ev =>
              configProperties.buddy_mode !== Constants.BUDDY_MODE_AUTO &&
              ev.dragSourceInfo &&
              ev.dragSourceInfo.dragSourceInfoType === 'buddylistGroupTitle' &&
              ev.dragSourceInfo.dragSourceInfoCode
            }
            onDrop={() =>
              props.uiData.fire('sidebarBuddylistGroupRemoveDndable_onDrop')
            }
          />
        </View>
        <View style={styles.brControlbar}>
          <Image
            source={
              (profile.user_type !== Constants.USER_TYPE_SYSTEM_ADMIN ||
                props.uiData.configurations.hideProductComp === 'true') &&
              props.uiData.configurations.logoPath
                ? { uri: props.uiData.configurations.logoPath }
                : require('../images/logo.png')
            }
            style={styles.brControlLogo}
            accessibilityLabel={
              props.uiData.configurations.productShortName || 'UC'
            }
          />

          <TouchableOpacity
            ref={this.controlProfileRef}
            style={[
              styles.brControlProfile,
              !userMe.profile_image_url && styles.brNoImage,
              userMe.profile_image_url &&
                string(userMe.profile_image_url).indexOf(
                  Constants.PROFILE_IMAGE_URL_DOWNLOAD,
                ) === -1 &&
                styles.brMyProfileImageUrl,
            ]}
            accessibilityLabel={userMe.name + ' ' + statusMe.display}
            onPress={this.handleControlProfileClick.bind(this)}
            onPressIn={() =>
              props.uiData.fire('sidebarControlProfile_onMouseEnter')
            }
          >
            {userMe.profile_image_url && (
              <Image
                source={{ uri: userMe.profile_image_url }}
                style={styles.profileImage}
              />
            )}
            <StatusIcon
              style={styles.brControlProfileStatusIcon}
              status={statusMe.status}
            />
          </TouchableOpacity>

          <MenuBalloonDialog
            showing={
              props.uiData.showingDialogVersion ===
              this.state.controlProfileShowingDialogVersion
            }
            style={styles.brControlProfileBalloonDialog}
            onPress={this.handleControlProfileBalloonDialogClick.bind(this)}
          >
            <View style={styles.brControlProfileHeader}>
              <Text style={styles.brControlProfileName}>
                {userMe.name +
                  (nameDisplayMode === 1 ? ` (${profile.user_id}) ` : ' ')}
              </Text>
              <Text style={styles.brControlProfileDisplay}>
                {statusMe.display + ' '}
              </Text>
              <ButtonIconic
                style={[
                  styles.brEditStatusDisplay,
                  statusMe.status === Constants.STATUS_OFFLINE &&
                    styles.brHidden,
                ]}
                iconSource={<EditIcon />}
                accessibilityLabel={
                  uawMsgs.LBL_SIDEBAR_EDIT_STATUS_DISPLAY_BUTTON_TOOLTIP
                }
                onPress={() =>
                  props.uiData.fire('sidebarEditStatusDisplayButton_onClick')
                }
              />
            </View>
            {statusList.map(s => (
              <TouchableOpacity
                key={s.status}
                style={styles.brControlProfileStatusItem}
                onPress={() =>
                  props.uiData.fire(
                    'sidebarControlProfileStatusItem_onClick',
                    s.status,
                  )
                }
              >
                <StatusIcon
                  style={styles.brControlProfileStatusItemStatusIcon}
                  status={s.status}
                />
                <View
                  style={[
                    styles.brControlProfileStatusItemChecked,
                    s.status === statusMe.status
                      ? styles.brIconOok
                      : styles.brHidden,
                  ]}
                >
                  <CheckIcon />
                </View>
                <Text>{s.label}</Text>
              </TouchableOpacity>
            ))}
            <View style={styles.brSeparator} />

            <TouchableOpacity
              style={[styles.brControlProfileItem, styles.brPreferenceButton]}
              onPress={() =>
                props.uiData.fire('sidebarPreferenceButton_onClick')
              }
            >
              <UserIcon width={20} height={20} />
              <Text>{uawMsgs.LBL_SIDEBAR_PREFERENCE_ITEM}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.brControlProfileItem, styles.brHistoryButton]}
              onPress={() => props.uiData.fire('sidebarHistoryButton_onClick')}
            >
              <View style={styles.menuIcon}>
                <HistoryIcon width={20} height={20} />
              </View>
              <Text>{uawMsgs.LBL_SIDEBAR_HISTORY_ITEM}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.brControlProfileItem,
                styles.brWebchatRequestsButton,
              ]}
              onPress={() =>
                props.uiData.fire('sidebarWebchatRequestsButton_onClick')
              }
              disabled={configProperties.webchat_enabled !== 'true'}
            >
              <View style={{ marginHorizontal: 4 }}>
                <InternetIcon width={20} height={20} />
              </View>
              <Text>{uawMsgs.LBL_SIDEBAR_WEBCHAT_REQUESTS_ITEM}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.brControlProfileItem,
                styles.brServerPropertiesButton,
              ]}
              onPress={() =>
                props.uiData.fire('sidebarServerPropertiesButton_onClick')
              }
              disabled={
                true /* profile.user_type !== Constants.USER_TYPE_TENANT_ADMIN */
              }
            >
              <View style={styles.menuIcon}>
                <SettingsIcon width={20} height={20} />
              </View>
              <Text>{uawMsgs.LBL_SIDEBAR_SERVER_PROPERTIES_ITEM}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.brControlProfileItem, styles.brAboutButton]}
              onPress={() => props.uiData.fire('sidebarAboutButton_onClick')}
              disabled={
                props.uiData.configurations.hideProduct === 'true' &&
                (profile.user_type !== Constants.USER_TYPE_SYSTEM_ADMIN ||
                  props.uiData.configurations.hideProductComp === 'true')
              }
            >
              <AboutIcon width={20} height={20} />
              <Text>
                {formatStr(
                  uawMsgs.LBL_SIDEBAR_ABOUT_ITEM,
                  props.uiData.configurations.productName || 'UC',
                )}
              </Text>
            </TouchableOpacity>
          </MenuBalloonDialog>
          <View style={styles.brControlStatusDisplayArea}>
            <Animated.Text
              style={[
                styles.brControlStatusDisplayLabel,
                props.uiData.runningAnimationTable['controlstatusdisplay'] && {
                  transform: [
                    { rotate: '-90deg' },
                    { translateX: this.statusDisplayAnim },
                  ],
                },
              ]}
            >
              {statusMe.display}
            </Animated.Text>
          </View>
          {this.state.controlButtonsCollapsedCount
            ? collapsibleControlButtons.slice(
                0,
                -this.state.controlButtonsCollapsedCount - 1,
              )
            : collapsibleControlButtons}
          <ButtonIconic
            style={[
              styles.brControlButton,
              styles.brControlButtonsCollapsedMenuButton,
              this.state.controlButtonsCollapsedCount === 0 && styles.brHidden,
            ]}
            iconSource={<MoreIcon />}
            accessibilityLabel={
              uawMsgs.LBL_SIDEBAR_CONTROL_BUTTONS_COLLAPSED_MENU_BUTTON_TOOLTIP
            }
            onPress={this.handleControlButtonsCollapsedMenuButtonClick.bind(
              this,
            )}
          >
            <MenuBalloonDialog
              showing={
                props.uiData.showingDialogVersion ===
                this.state.controlButtonsCollapsedMenuShowingDialogVersion
              }
              style={styles.brControlButtonsCollapsedMenuBalloonDialog}
            >
              {this.state.controlButtonsCollapsedCount
                ? collapsibleControlButtons.slice(
                    -this.state.controlButtonsCollapsedCount - 1,
                  )
                : []}
            </MenuBalloonDialog>
          </ButtonIconic>
          <ButtonIconic
            ref={this.areaSplitterButtonRef}
            style={[
              styles.brControlButton,
              styles.brAreaSplitterButton,
              props.uiData.mainAreaSplitters === 2 &&
                styles.brIconChannelMosaic4,
              props.uiData.mainAreaSplitters === 1 &&
                styles.brIconChannelMosaic12,
              props.uiData.mainAreaSplitters === 0 &&
                styles.brIconChannelMosaic1,
            ]}
            iconSource={
              props.uiData.mainAreaSplitters === 2 ? (
                <ChannelMosaic4Icon />
              ) : props.uiData.mainAreaSplitters === 1 ? (
                <ChannelMosaic12Icon />
              ) : (
                <ChannelMosaic1Icon />
              )
            }
            accessibilityLabel={
              uawMsgs.LBL_SIDEBAR_AREA_SPLITTER_BUTTON_TOOLTIP
            }
            onPress={this.handleAreaSplitterButtonClick.bind(this)}
          >
            <MenuBalloonDialog
              showing={
                props.uiData.showingDialogVersion ===
                this.state.areaSplitterShowingDialogVersion
              }
              style={styles.brAreaSplitterBalloonDialog}
            >
              <TouchableOpacity
                style={[styles.brAreaSplitterItem, styles.brIconChannelMosaic1]}
                onPress={() =>
                  props.uiData.fire('sidebarAreaSplitterItem_onClick', 0)
                }
              >
                <View style={styles.menuIcon}>
                  <ChannelMosaic1Icon />
                </View>
                <Text style={styles.menuItemText}>
                  {uawMsgs.LBL_SIDEBAR_AREA_SPLITTER_ITEM_0}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.brAreaSplitterItem,
                  styles.brIconChannelMosaic12,
                ]}
                onPress={() =>
                  props.uiData.fire('sidebarAreaSplitterItem_onClick', 1)
                }
              >
                <View style={styles.menuIcon}>
                  <ChannelMosaic12Icon />
                </View>
                <Text style={styles.menuItemText}>
                  {uawMsgs.LBL_SIDEBAR_AREA_SPLITTER_ITEM_1}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.brAreaSplitterItem, styles.brIconChannelMosaic4]}
                onPress={() =>
                  props.uiData.fire('sidebarAreaSplitterItem_onClick', 2)
                }
              >
                <View style={styles.menuIcon}>
                  <ChannelMosaic4Icon />
                </View>
                <Text style={styles.menuItemText}>
                  {uawMsgs.LBL_SIDEBAR_AREA_SPLITTER_ITEM_2}
                </Text>
              </TouchableOpacity>
            </MenuBalloonDialog>
          </ButtonIconic>
          <ButtonIconic
            ref={this.signOutButtonRef}
            style={[styles.brControlButton, styles.brSignOutButton]}
            iconSource={<LogOutIcon />}
            accessibilityLabel={uawMsgs.LBL_SIDEBAR_SIGN_OUT_BUTTON_TOOLTIP}
            onPress={() => props.uiData.fire('sidebarSignOutButton_onClick')}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  brBuddylistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#ffffff',
  },
  // TODO: Remove this if not use
  brWithColor: {},
  brWithIcon: {},
  brCallStatus: {},
  brConferenceStatus: {},
  brConferenceStatusWebchat: {},
  brSelected: {
    backgroundColor: '#eeeeee',
  },
  brOffline: {
    opacity: 0.5,
  },
  brBuddylistItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  brCallStatusIcon: {
    width: 16,
    height: 16,
    marginHorizontal: 4,
  },
  brConferenceStatusIcon: {
    width: 16,
    height: 16,
    marginHorizontal: 4,
  },
  brConferenceStatusWebchatIcon: {
    width: 16,
    height: 16,
    marginHorizontal: 4,
  },
  brBuddylistItemInfo: {
    fontSize: 13,
    color: '#212121',
  },
  brBuddylistItemMessage: {
    marginTop: 4,
  },
  brBuddylistItemTime: {
    marginTop: 2,
    fontSize: 12,
    color: '#9e9e9e',
  },
  brBuddylistItemMarker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#40E0D0',
    marginHorizontal: 4,
  },
  brBuddylistItemUnread: {
    backgroundColor: '#ff4526',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  brBuddylistItemImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 8,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  brNoImage: {
    backgroundColor: '#eeeeee',
  },
  brMyProfileImageUrl: {
    borderWidth: 2,
    borderColor: '#40E0D0',
  },
  brBuddylistItemStatusIcon: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  brBuddylistGroup: {
    marginBottom: 8,
  },
  brBuddylistGroupTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
  },
  brGroupName: {
    backgroundColor: '#f5f5f5', // or whatever color you want for named groups
  },
  brBuddylistGroupLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  brBuddylistGroupName: {
    fontSize: 13,
    fontWeight: '500',
    color: '#212121',
  },
  brBuddylistGroupOnlines: {
    fontSize: 12,
    color: '#9e9e9e',
    marginLeft: 4,
  },
  brBuddylistGroupOpenIcon: {
    width: 16,
    height: 16,
    marginLeft: 8,
  },
  brBuddylistItems: {
    overflow: 'hidden', // This replaces the height animation from CSS
  },
  brControlButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
    borderRadius: 20,
    backgroundColor: '#ffffff',
  },
  brCreateConferenceButton: {
    // Add any specific styles for conference button
  },
  brSendBroadcastTextButton: {
    // Add any specific styles for broadcast button
  },
  brExternalCallButton: {
    // Add any specific styles for call button
  },
  brOutgoingWebchatButton: {
    // Add any specific styles for webchat button
  },
  brCreateGroupButton: {
    // Add any specific styles for group button
  },
  brUserListButton: {
    // Add any specific styles for user list button
  },
  brOver: {
    backgroundColor: '#ff4526',
  },
  brBuddylistbar: {
    flex: 1,
    flexDirection: 'column',
  },
  brBuddylistFilterArea: {
    padding: 8,
    backgroundColor: '#ffffff',
  },
  brBuddylistFilterInput: {
    height: 36,
    paddingHorizontal: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
  },
  brBuddylistFilterButton: {
    width: 32,
    height: 32,
    margin: 4,
  },
  brBuddylistFilterBalloonDialog: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  brBuddylistFilterOnlineOnlyCheckBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  checkboxIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#212121',
  },
  brBuddylistGroupRemoveDndable: {
    width: 32,
    height: 32,
    margin: 4,
  },
  brControlbar: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    padding: 8,
  },
  brControlLogo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  brControlProfile: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brControlProfileStatusIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  brChecked: {
    backgroundColor: '#e3f2fd',
  },
  brUnchecked: {
    backgroundColor: '#ffffff',
  },
  brSidebar: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  brControlButtonsCollapsible: {
    // Add styles for collapsed state
  },
  brControlButtonsCollapsedCount1: {
    // Styles for 1 collapsed button
  },
  brControlButtonsCollapsedCount2: {
    // Styles for 2 collapsed buttons
  },
  brControlProfileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  brControlProfileName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#212121',
  },
  brControlProfileDisplay: {
    fontSize: 13,
    color: '#757575',
    marginRight: 8,
  },
  brEditStatusDisplay: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brHidden: {
    display: 'none',
  },
  brControlProfileBalloonDialog: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  brControlProfileStatusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  brControlProfileStatusItemStatusIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  brControlProfileStatusItemChecked: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  brIconOok: {
    opacity: 1,
  },
  brSeparator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 8,
  },
  brControlProfileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  menuIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  brControlStatusDisplayArea: {
    padding: 8,
  },
  brControlStatusDisplayLabel: {
    fontSize: 13,
    color: '#212121',
  },
  brAnimation: {
    transform: [
      { rotate: '-90deg' },
      {
        translateX: 0, // Will need to be animated using Animated API
      },
    ],
  },
  brAreaSplitterBalloonDialog: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  brAreaSplitterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  menuItemText: {
    fontSize: 14,
    color: '#212121',
    marginLeft: 8,
  },
  brIconChannelMosaic1: {
    // Add specific styles if needed
  },
  brIconChannelMosaic12: {
    // Add specific styles if needed
  },
  brIconChannelMosaic4: {
    // Add specific styles if needed
  },
  brControlButtonsCollapsedMenuButton: {
    // Add specific styles for collapsed menu button
  },
  brAreaSplitterButton: {
    // Add specific styles for area splitter button
  },
  brSignOutButton: {
    // Add specific styles for sign out button
  },
})
