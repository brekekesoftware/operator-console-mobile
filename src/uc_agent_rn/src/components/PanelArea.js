import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import {
  View,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
  Text,
  findNodeHandle,
  UIManager,
  NativeModules,
} from 'react-native'
import ButtonIconic from './ButtonIconic.js'
import DndableSafe from './DndableSafe.js'
import DropDownMenu from './DropDownMenu.js'
import MenuBalloonDialog from './MenuBalloonDialog.js'
import MenuItem from './MenuItem.js'
import NameEmbeddedSpan from './NameEmbeddedSpan.js'
import TextBox from './TextBox.js'
import PanelHeaderHideButton from './PanelHeaderHideButton.js'
import PanelHeaderUndockButton from './PanelHeaderUndockButton.js'
import PanelHeaderHideSubButton from './PanelHeaderHideSubButton.js'
import PanelHeaderDockButton from './PanelHeaderDockButton.js'
import PanelHeaderCloseChatButton from './PanelHeaderCloseChatButton.js'
import PanelHeaderRejoinButton from './PanelHeaderRejoinButton.js'
import ChatPanel from './ChatPanel.js'
import PreferencePanel from './PreferencePanel.js'
import WebchatQueuePanel from './WebchatQueuePanel.js'
import HistorySearchPanel from './HistorySearchPanel.js'
import HistorySummariesPanel from './HistorySummariesPanel.js'
import HistoryDetailPanel from './HistoryDetailPanel.js'

/**
 * PanelArea
 * props.uiData
 * props.uiData.ucUiAction
 * props.uiData.ucUiStore
 * props.uiData.phone
 * props.uiData.panelSessionTable
 * props.uiData.configurations
 * props.uiData.showingDialogVersion
 * props.uiData.currentSelectedTab
 * props.uiData.historyDetailWorkTable
 * props.uiData.preferenceWorkTable
 * props.uiData.isSubWindow
 * props.uiData.showingDialog_update
 * props.uiData.panelHeaderLeaveButton_onClick
 * props.uiData.panelHeaderInviteButton_onClick
 * props.uiData.panelHeaderFileButton_onClick
 * props.uiData.panelHeaderVoiceButton_onClick
 * props.uiData.panelHeaderVideoButton_onClick
 * props.uiData.panelHeaderScreenButton_onClick
 * props.uiData.panelHeaderContinuationMenuItem_onClick
 * props.uiData.panelHeaderInviteDndable_onCheckCanDrop
 * props.uiData.panelHeaderInviteDndable_onDrop
 * props.panelType
 * props.panelCode
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showingDialogVersion: null,
      showingReplyDialogVersion: null,
      replyDialogStyle: {},
      headerButtonsCollapsible: false,
      headerSearchConditionsWidth: 0,
      headerSearchConditionsContentCache: null,
      headerSearchConditionsUserGroupOpen:
        props.uiData.ucUiStore.getLocalStoragePreference({
          keyList: ['buddylistOpenList'],
        })[0],
      historySummariesWithHeader: false,
    }
    this.panelHeaderAreaRef = React.createRef()
    this.panelHeaderTitleRef = React.createRef()
    this.panelHeaderInfoRef = React.createRef()
    this.panelHeaderMembersRef = React.createRef()
    this.panelHeaderButtonsAreaRef = React.createRef()
    this.headerSearchConditionsContentInputRef = React.createRef()
    this.panelHeaderSearchConditionsRef = React.createRef()
  }
  componentDidMount() {
    const props = this.props
    if (
      this.headerSearchConditionsContentInputRef.current &&
      this.headerSearchConditionsContentInputRef.current.focus
    ) {
      this.headerSearchConditionsContentInputRef.current.focus()
    }
  }
  componentDidUpdate() {
    const props = this.props
    const newState = {}

    if (this.panelHeaderAreaRef.current) {
      this.panelHeaderAreaRef.current.measure(
        (x, y, width, height, pageX, pageY) => {
          const widthOfArea = width

          if (typeof widthOfArea === 'number' && widthOfArea > 0) {
            let rightOfTexts = null

            if (this.panelHeaderMembersRef.current) {
              this.panelHeaderMembersRef.current.measure(
                (x, y, width, height, pageX, pageY) => {
                  rightOfTexts = int(pageX + width)
                },
              )
            } else if (this.panelHeaderInfoRef.current) {
              this.panelHeaderInfoRef.current.measure(
                (x, y, width, height, pageX, pageY) => {
                  rightOfTexts = int(pageX + width)
                },
              )
            } else if (this.panelHeaderTitleRef.current) {
              this.panelHeaderTitleRef.current.measure(
                (x, y, width, height, pageX, pageY) => {
                  rightOfTexts = int(pageX + width)
                },
              )
            }

            if (typeof rightOfTexts === 'number') {
              let leftOfButtons = null

              if (this.panelHeaderButtonsAreaRef.current) {
                this.panelHeaderButtonsAreaRef.current.measure(
                  (x, y, width, height, pageX, pageY) => {
                    leftOfButtons = (widthOfArea - int(width)) / 2
                  },
                )
              }

              if (typeof leftOfButtons === 'number') {
                if (
                  leftOfButtons < rightOfTexts &&
                  !this.state.headerButtonsCollapsible
                ) {
                  newState.headerButtonsCollapsible = true
                } else if (
                  leftOfButtons >= rightOfTexts &&
                  this.state.headerButtonsCollapsible
                ) {
                  newState.headerButtonsCollapsible = false
                }
              }

              if (
                this.state.headerSearchConditionsWidth !==
                widthOfArea - rightOfTexts
              ) {
                newState.headerSearchConditionsWidth =
                  widthOfArea - rightOfTexts
              }
            }
          }

          if (Object.keys(newState).length) {
            this.setState(newState)
            console.log('#Duy Phan console newState2', newState)
          }
        },
      )
    }
  }
  handlePanelHeaderButtonsMenuClick(ev) {
    const props = this.props
    if (props.uiData.showingDialogVersion !== this.state.showingDialogVersion) {
      this.setState({
        showingDialogVersion: ++props.uiData.showingDialogVersion,
      })
      ev.stopPropagation()
      props.uiData.fire('showingDialog_update')
    }
  }
  handleReplyWebchatButtonClick(ev) {
    const props = this.props
    if (
      props.uiData.showingDialogVersion !== this.state.showingDialogVersion ||
      props.uiData.showingDialogVersion !== this.state.showingReplyDialogVersion
    ) {
      props.uiData.showingDialogVersion++
      const replyDialogStyle = {}

      if (this.panelHeaderAreaRef.current) {
        this.panelHeaderAreaRef.current.measure(
          (x, y, width, height, pageX, pageY) => {
            const panelHeaderAreaRect = {
              left: pageX,
              top: pageY,
              width,
              height,
            }
            const replyWebchatButtonRect =
              ev && ev.target && ev.target.measure
                ? ev.target.measure((x, y, width, height, pageX, pageY) => ({
                    left: pageX,
                    top: pageY,
                    width,
                    height,
                  }))
                : null

            if (panelHeaderAreaRect && replyWebchatButtonRect) {
              replyDialogStyle.left =
                replyWebchatButtonRect.left - panelHeaderAreaRect.left
              replyDialogStyle.top =
                replyWebchatButtonRect.top +
                replyWebchatButtonRect.height -
                panelHeaderAreaRect.top
            }

            this.setState({
              showingDialogVersion: props.uiData.showingDialogVersion,
              showingReplyDialogVersion: props.uiData.showingDialogVersion,
              replyDialogStyle: replyDialogStyle,
            })
            ev.stopPropagation()
            props.uiData.fire('showingDialog_update')
          },
        )
      }
    }
  }
  handleHeaderSearchConditionsDetailButtonClick(ev) {
    const props = this.props
    this.setState({
      historySummariesWithHeader: !this.state.historySummariesWithHeader,
    })
  }
  handleHeaderSearchConditionsContentInputChange(ev) {
    const props = this.props
    // cache value to state not to store (do not render uiData)
    this.setState({
      headerSearchConditionsContentCache: string(
        ev && ev.nativeEvent && ev.nativeEvent.text,
      ),
    })
  }
  handleHeaderSearchConditionsContentInputBlur(ev) {
    const props = this.props
    // save value to store
    this.setSearchCondition(
      '_any',
      string(ev && ev.nativeEvent && ev.nativeEvent.text),
    )
    // clear cached value in state
    this.setState({ headerSearchConditionsContentCache: null })
  }
  handleHeaderSearchConditionsContentInputKeyDown(ev) {
    const props = this.props
    if (
      ev &&
      ev.nativeEvent &&
      ev.nativeEvent.key === 'Enter' &&
      !ev.nativeEvent.shiftKey
    ) {
      // save value to store
      this.setSearchCondition(
        '_any',
        string(ev && ev.nativeEvent && ev.nativeEvent.text),
      )
      // clear cached value in state
      this.setState({ headerSearchConditionsContentCache: null })
      // do search
      props.uiData.ucUiAction.doSearch({
        chatType: props.panelType,
        chatCode: props.panelCode,
        emphasize: true,
        queueing: true,
      })
    }
  }
  handleHeaderSearchConditionsSearchButtonClick(ev) {
    const props = this.props
    // do search
    props.uiData.ucUiAction.doSearch({
      chatType: props.panelType,
      chatCode: props.panelCode,
      emphasize: true,
      queueing: true,
    })
  }
  handleHeaderSearchConditionsUserGroupClick(groupName, ev) {
    const props = this.props
    if (
      string(ev && ev.target && ev.target.className).indexOf(
        'brHeaderSearchConditionsUserGroup',
      ) !== -1
    ) {
      if (
        this.state.headerSearchConditionsUserGroupOpen
          .split(',')
          .indexOf(groupName) !== -1
      ) {
        this.setState({
          headerSearchConditionsUserGroupOpen:
            this.state.headerSearchConditionsUserGroupOpen
              .split(',')
              .filter(g => g !== groupName)
              .join(','),
        })
      } else {
        this.setState({
          headerSearchConditionsUserGroupOpen: this.state
            .headerSearchConditionsUserGroupOpen
            ? this.state.headerSearchConditionsUserGroupOpen + ',' + groupName
            : groupName,
        })
      }
    }
  }
  handleHeaderSearchConditionsUserItemClick(user_id, ev) {
    const props = this.props
    this.setSearchCondition('_userId', user_id)
    props.uiData.ucUiAction.doSearch({
      chatType: props.panelType,
      chatCode: props.panelCode,
      emphasize: true,
      queueing: true,
    })
  }
  handleHeaderSearchConditionsUserAllClick(ev) {
    const props = this.props
    const searchConditions =
      props.uiData.ucUiStore.getSearchConditions({
        chatType: props.panelType,
        chatCode: props.panelCode,
      }) || []
    props.uiData.ucUiAction.setSearchConditions({
      chatType: props.panelType,
      chatCode: props.panelCode,
      searchConditions: searchConditions.filter(
        condition => condition.conditionKey !== '_userId',
      ),
    })
    props.uiData.ucUiAction.doSearch({
      chatType: props.panelType,
      chatCode: props.panelCode,
      emphasize: true,
      queueing: true,
    })
  }
  setSearchCondition(conditionKey, conditionValue) {
    const props = this.props
    const searchConditions =
      props.uiData.ucUiStore.getSearchConditions({
        chatType: props.panelType,
        chatCode: props.panelCode,
      }) || []
    if (
      !searchConditions.some(
        condition =>
          condition.conditionKey === conditionKey &&
          ((condition.conditionValue = conditionValue) || true),
      )
    ) {
      searchConditions.push({
        conditionKey: conditionKey,
        conditionValue: conditionValue,
      })
    }
    props.uiData.ucUiAction.setSearchConditions({
      chatType: props.panelType,
      chatCode: props.panelCode,
      searchConditions: searchConditions,
    })
  }
  render() {
    const props = this.props
    const profile = props.uiData.ucUiStore.getChatClient().getProfile()
    const configProperties = props.uiData.ucUiStore.getConfigProperties()
    const myUcCimUserType = int(props.uiData.ucUiStore.getUcCimUserType())
    const panelSession =
      props.uiData.panelSessionTable &&
      props.uiData.panelSessionTable[props.panelType + '_' + props.panelCode]
    const session =
      panelSession &&
      panelSession.sessionId &&
      props.uiData.phone &&
      props.uiData.phone.getSession(panelSession.sessionId)
    let panelTypeClassName = ''
    let headerTitle = ''
    let headerInfo = ''
    let headerMembers = []
    let headerMembersTitle = ''
    const headerButtons = []
    const replyOptions = []
    const headerSimpleButtons = []
    let headerSearchConditions = ''
    let contents = ''
    if (props.panelType === 'CONFERENCE') {
      panelTypeClassName = 'brConference'
      const conf_id = string(
        props.uiData.ucUiStore.getChatHeaderInfo({
          chatType: props.panelType,
          chatCode: props.panelCode,
        }).conf_id,
      )
      const conference = props.uiData.ucUiStore
        .getChatClient()
        .getConference(conf_id)
      const joinedCount = conference.user.filter(
        u => u.conf_status === Constants.CONF_STATUS_JOINED,
      ).length
      const chatHeaderInfo =
        props.uiData.ucUiStore.getChatHeaderInfo({
          chatType: props.panelType,
          chatCode: props.panelCode,
        }) || {}
      const replyTypes = string(chatHeaderInfo.replyTypes).split(',')
      if ('TRUE' === string(chatHeaderInfo.webchatContinuable).toUpperCase()) {
        replyOptions.push({
          className: 'brManualContinuation',
          event: props.uiData.fire.bind(
            props.uiData,
            'panelHeaderContinuationMenuItem_onClick',
            props.panelType,
            props.panelCode,
            '',
          ),
          label: uawMsgs.LBL_PANEL_HEADER_REPLY_MANUAL_CONTINUATION_MENU,
        })
      }
      if (
        !props.uiData.ucUiStore.getWebchatQueue({ conf_id: conf_id })
          .isTalking &&
        (
          (configProperties.optional_config &&
            configProperties.optional_config.awsl) ||
          []
        ).some(aws => aws.id === chatHeaderInfo.webchatServiceId && aws.senders)
      ) {
        replyTypes.forEach((replyType, i) => {
          if (replyType) {
            replyOptions.push({
              className: 'brContinuation',
              event: props.uiData.fire.bind(
                props.uiData,
                'panelHeaderContinuationMenuItem_onClick',
                props.panelType,
                props.panelCode,
                replyType,
              ),
              label: replyType,
            })
          }
        })
      }
      if (chatHeaderInfo.guest && chatHeaderInfo.guest.user_id) {
        headerTitle = string(chatHeaderInfo.title)
        headerInfo = string(chatHeaderInfo.guestProfinfo)
      } else {
        headerMembers = props.uiData.ucUiStore
          .getMemberList({
            chatType: props.panelType,
            chatCode: props.panelCode,
          })
          .map((member, i) => (
            <Text
              key={i}
              style={[
                styles.brConfStatus1,
                {
                  color:
                    (
                      conference.user.find(
                        u =>
                          u.tenant === member.tenant &&
                          u.user_id === member.user_id,
                      ) || {}
                    ).conf_status === '1'
                      ? '#E5E5E5'
                      : undefined,
                },
              ]}
            >
              {props.uiData.ucUiStore.getBuddyUserForUi(member).name + '\n'}
            </Text>
          ))
        headerMembersTitle = props.uiData.ucUiStore
          .getMemberList({
            chatType: props.panelType,
            chatCode: props.panelCode,
          })
          .reduce(
            (a, member) =>
              a + props.uiData.ucUiStore.getBuddyUserForUi(member).name + '\n',
            chatHeaderInfo.title + '\n\n',
          )
      }
      if (
        !(
          props.uiData.configurations.headerButtons &&
          props.uiData.configurations.headerButtons.indexOf('leave') === -1
        )
      ) {
        headerButtons.push(
          <ButtonIconic
            key='leave'
            style={styles.brPanelHeaderButton}
            disabled={conference.conf_status !== Constants.CONF_STATUS_JOINED}
            title={uawMsgs.LBL_PANEL_HEADER_LEAVE_BUTTON_TOOLTIP}
            onPress={props.uiData.fire.bind(
              props.uiData,
              'panelHeaderLeaveButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          >
            <View style={styles.brPanelHeaderButtonIcon} />
          </ButtonIconic>,
        )
      }
      if (chatHeaderInfo.confType === 'webchat') {
        panelTypeClassName += ' brWebchat'
        if (
          !(
            props.uiData.configurations.headerButtons &&
            props.uiData.configurations.headerButtons.indexOf('reply') === -1
          )
        ) {
          headerButtons.push(
            <ButtonIconic
              key='reply'
              style={styles.brPanelHeaderButton}
              disabled={!replyOptions.length}
              title={uawMsgs.LBL_PANEL_HEADER_REPLY_BUTTON_TOOLTIP}
              onPress={
                replyOptions.length === 1
                  ? replyOptions[0].event
                  : this.handleReplyWebchatButtonClick.bind(this)
              }
            >
              <View style={styles.brPanelHeaderButtonIcon} />
            </ButtonIconic>,
          )
        }
      }
      if (
        !(
          props.uiData.configurations.headerButtons &&
          props.uiData.configurations.headerButtons.indexOf('invite') === -1
        )
      ) {
        headerButtons.push(
          <ButtonIconic
            key='invite'
            style={styles.brPanelHeaderButton}
            disabled={
              conference.conf_status !== Constants.CONF_STATUS_JOINED ||
              (chatHeaderInfo.confType === 'webchat' &&
                (-int(
                  (conference.webchatinfo &&
                    string(conference.webchatinfo.invite_button_type)) ||
                    '-98',
                ) &
                  myUcCimUserType) !==
                  myUcCimUserType)
            }
            title={uawMsgs.LBL_PANEL_HEADER_INVITE_BUTTON_TOOLTIP}
            onPress={props.uiData.fire.bind(
              props.uiData,
              'panelHeaderInviteButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          >
            <View style={styles.brPanelHeaderButtonIcon} />
          </ButtonIconic>,
        )
      }
      if (
        (int(props.uiData.ucUiStore.getOptionalSetting({ key: 'fsp' })) &
          myUcCimUserType) !==
        myUcCimUserType
      ) {
        if (
          !(
            props.uiData.configurations.headerButtons &&
            props.uiData.configurations.headerButtons.indexOf('file') === -1
          )
        ) {
          headerButtons.push(
            <ButtonIconic
              key='file'
              style={styles.brPanelHeaderButton}
              disabled={
                conference.conf_status !== Constants.CONF_STATUS_JOINED ||
                joinedCount < 2
              }
              title={uawMsgs.LBL_PANEL_HEADER_FILE_BUTTON_TOOLTIP}
              onPress={props.uiData.fire.bind(
                props.uiData,
                'panelHeaderFileButton_onClick',
                props.panelType,
                props.panelCode,
              )}
            >
              <View style={styles.brPanelHeaderButtonIcon} />
            </ButtonIconic>,
          )
        }
      }
      if (
        !(
          props.uiData.configurations.headerButtons &&
          props.uiData.configurations.headerButtons.indexOf('voice') === -1
        )
      ) {
        headerButtons.push(
          <ButtonIconic
            key='voice'
            style={styles.brPanelHeaderButton}
            disabled={
              conference.conf_status !== Constants.CONF_STATUS_JOINED ||
              !props.uiData.phone ||
              props.uiData.phone.getPhoneStatus() !== 'started' ||
              panelSession
            }
            title={uawMsgs.LBL_PANEL_HEADER_VOICE_BUTTON_TOOLTIP}
            onPress={props.uiData.fire.bind(
              props.uiData,
              'panelHeaderVoiceButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          >
            <View style={styles.brPanelHeaderButtonIcon} />
          </ButtonIconic>,
        )
      }
      if (
        !(
          props.uiData.configurations.headerButtons &&
          props.uiData.configurations.headerButtons.indexOf('video') === -1
        )
      ) {
        headerButtons.push(
          <ButtonIconic
            key='video'
            style={styles.brPanelHeaderButton}
            disabled={
              conference.conf_status !== Constants.CONF_STATUS_JOINED ||
              !props.uiData.phone ||
              props.uiData.phone.getPhoneStatus() !== 'started' ||
              panelSession
            }
            title={uawMsgs.LBL_PANEL_HEADER_VIDEO_BUTTON_TOOLTIP}
            onPress={props.uiData.fire.bind(
              props.uiData,
              'panelHeaderVideoButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          >
            <View style={styles.brPanelHeaderButtonIcon} />
          </ButtonIconic>,
        )
      }
      if (
        !(
          props.uiData.configurations.headerButtons &&
          props.uiData.configurations.headerButtons.indexOf('screen') === -1
        )
      ) {
        headerButtons.push(
          <ButtonIconic
            key='screen'
            style={styles.brPanelHeaderButton}
            disabled={
              conference.conf_status !== Constants.CONF_STATUS_JOINED ||
              !props.uiData.phone ||
              props.uiData.phone.getPhoneStatus() !== 'started' ||
              panelSession
            }
            title={uawMsgs.LBL_PANEL_HEADER_SCREEN_BUTTON_TOOLTIP}
            onPress={props.uiData.fire.bind(
              props.uiData,
              'panelHeaderScreenButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          >
            <View style={styles.brPanelHeaderButtonIcon} />
          </ButtonIconic>,
        )
      }
      if (!props.uiData.isSubWindow) {
        headerSimpleButtons.unshift(
          <PanelHeaderHideButton
            key='hide'
            uiData={props.uiData}
            panelType={props.panelType}
            panelCode={props.panelCode}
            disabled={
              !props.uiData.configurations.hideable &&
              conference.conf_status === Constants.CONF_STATUS_JOINED
            }
          />,
        )
        if (props.uiData.configurations.undockable) {
          headerSimpleButtons.unshift(
            <PanelHeaderUndockButton
              key='undock'
              uiData={props.uiData}
              panelType={props.panelType}
              panelCode={props.panelCode}
            />,
          )
        }
      } else {
        headerSimpleButtons.unshift(
          <PanelHeaderHideSubButton
            key='hidesub'
            uiData={props.uiData}
            panelType={props.panelType}
            panelCode={props.panelCode}
            disabled={
              !props.uiData.configurations.hideable &&
              conference.conf_status === Constants.CONF_STATUS_JOINED
            }
          />,
        )
        if (props.uiData.configurations.undockable) {
          headerSimpleButtons.unshift(
            <PanelHeaderDockButton
              key='dock'
              uiData={props.uiData}
              panelType={props.panelType}
              panelCode={props.panelCode}
            />,
          )
        }
      }
      headerSimpleButtons.unshift(
        <PanelHeaderCloseChatButton
          key='closechat'
          uiData={props.uiData}
          panelType={props.panelType}
          panelCode={props.panelCode}
          disabled={conference.conf_status !== Constants.CONF_STATUS_JOINED}
        />,
      )
      headerSimpleButtons.unshift(
        <PanelHeaderRejoinButton
          key='rejoin'
          uiData={props.uiData}
          panelType={props.panelType}
          panelCode={props.panelCode}
          disabled={conference.conf_status !== Constants.CONF_STATUS_INVITED}
        />,
      )
      contents = (
        <ChatPanel
          uiData={props.uiData}
          panelType={props.panelType}
          panelCode={props.panelCode}
        />
      )
    } else if (props.panelType === 'CHAT') {
      panelTypeClassName = 'brChat'
      const chatHeaderInfo =
        props.uiData.ucUiStore.getChatHeaderInfo({
          chatType: props.panelType,
          chatCode: props.panelCode,
        }) || {}
      headerTitle = string(chatHeaderInfo.title)
      try {
        headerInfo = string(
          props.uiData.getCurrentBuddyStatus(JSON.parse(props.panelCode))
            .display,
        )
      } catch (e) {}
      if (
        (int(props.uiData.ucUiStore.getOptionalSetting({ key: 'fsp' })) &
          myUcCimUserType) !==
        myUcCimUserType
      ) {
        if (
          !(
            props.uiData.configurations.headerButtons &&
            props.uiData.configurations.headerButtons.indexOf('file') === -1
          )
        ) {
          headerButtons.push(
            <ButtonIconic
              key='file'
              style={styles.brPanelHeaderButton}
              title={uawMsgs.LBL_PANEL_HEADER_FILE_BUTTON_TOOLTIP}
              onPress={props.uiData.fire.bind(
                props.uiData,
                'panelHeaderFileButton_onClick',
                props.panelType,
                props.panelCode,
              )}
            >
              <View style={styles.brPanelHeaderButtonIcon} />
            </ButtonIconic>,
          )
        }
      }
      if (
        !(
          props.uiData.configurations.headerButtons &&
          props.uiData.configurations.headerButtons.indexOf('voice') === -1
        )
      ) {
        headerButtons.push(
          <ButtonIconic
            key='voice'
            style={styles.brPanelHeaderButton}
            disabled={
              !props.uiData.phone ||
              props.uiData.phone.getPhoneStatus() !== 'started' ||
              panelSession
            }
            title={uawMsgs.LBL_PANEL_HEADER_VOICE_BUTTON_TOOLTIP}
            onPress={props.uiData.fire.bind(
              props.uiData,
              'panelHeaderVoiceButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          >
            <View style={styles.brPanelHeaderButtonIcon} />
          </ButtonIconic>,
        )
      }
      if (
        !(
          props.uiData.configurations.headerButtons &&
          props.uiData.configurations.headerButtons.indexOf('video') === -1
        )
      ) {
        headerButtons.push(
          <ButtonIconic
            key='video'
            style={styles.brPanelHeaderButton}
            disabled={
              !props.uiData.phone ||
              props.uiData.phone.getPhoneStatus() !== 'started' ||
              panelSession
            }
            title={uawMsgs.LBL_PANEL_HEADER_VIDEO_BUTTON_TOOLTIP}
            onPress={props.uiData.fire.bind(
              props.uiData,
              'panelHeaderVideoButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          >
            <View style={styles.brPanelHeaderButtonIcon} />
          </ButtonIconic>,
        )
      }
      if (
        !(
          props.uiData.configurations.headerButtons &&
          props.uiData.configurations.headerButtons.indexOf('screen') === -1
        )
      ) {
        headerButtons.push(
          <ButtonIconic
            key='screen'
            style={styles.brPanelHeaderButton}
            disabled={
              !props.uiData.phone ||
              props.uiData.phone.getPhoneStatus() !== 'started' ||
              panelSession
            }
            title={uawMsgs.LBL_PANEL_HEADER_SCREEN_BUTTON_TOOLTIP}
            onPress={props.uiData.fire.bind(
              props.uiData,
              'panelHeaderScreenButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          >
            <View style={styles.brPanelHeaderButtonIcon} />
          </ButtonIconic>,
        )
      }
      if (
        !(
          props.uiData.configurations.headerButtons &&
          props.uiData.configurations.headerButtons.indexOf('history') === -1
        )
      ) {
        headerButtons.push(
          <ButtonIconic
            key='history'
            style={styles.brPanelHeaderButton}
            title={uawMsgs.LBL_PANEL_HEADER_HISTORY_BUTTON_TOOLTIP}
            onPress={props.uiData.fire.bind(
              props.uiData,
              'panelHeaderHistoryButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          >
            <View style={styles.brPanelHeaderButtonIcon} />
          </ButtonIconic>,
        )
      }
      if (!props.uiData.isSubWindow) {
        headerSimpleButtons.unshift(
          <PanelHeaderHideButton
            key='hide'
            uiData={props.uiData}
            panelType={props.panelType}
            panelCode={props.panelCode}
          />,
        )
        if (props.uiData.configurations.undockable) {
          headerSimpleButtons.unshift(
            <PanelHeaderUndockButton
              key='undock'
              uiData={props.uiData}
              panelType={props.panelType}
              panelCode={props.panelCode}
            />,
          )
        }
      } else {
        headerSimpleButtons.unshift(
          <PanelHeaderHideSubButton
            key='hidesub'
            uiData={props.uiData}
            panelType={props.panelType}
            panelCode={props.panelCode}
          />,
        )
        if (props.uiData.configurations.undockable) {
          headerSimpleButtons.unshift(
            <PanelHeaderDockButton
              key='dock'
              uiData={props.uiData}
              panelType={props.panelType}
              panelCode={props.panelCode}
            />,
          )
        }
      }
      contents = (
        <ChatPanel
          uiData={props.uiData}
          panelType={props.panelType}
          panelCode={props.panelCode}
        />
      )
    } else if (props.panelType === 'EXTERNALCALL') {
      panelTypeClassName = 'brExternalCall'
      headerTitle = props.panelCode
      if (
        !(
          props.uiData.configurations.headerButtons &&
          props.uiData.configurations.headerButtons.indexOf('voice') === -1
        )
      ) {
        headerButtons.push(
          <ButtonIconic
            key='voice'
            style={styles.brPanelHeaderButton}
            disabled={
              !props.uiData.phone ||
              props.uiData.phone.getPhoneStatus() !== 'started' ||
              panelSession
            }
            title={uawMsgs.LBL_PANEL_HEADER_VOICE_BUTTON_TOOLTIP}
            onPress={props.uiData.fire.bind(
              props.uiData,
              'panelHeaderVoiceButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          >
            <View style={styles.brPanelHeaderButtonIcon} />
          </ButtonIconic>,
        )
      }
      if (
        !(
          props.uiData.configurations.headerButtons &&
          props.uiData.configurations.headerButtons.indexOf('video') === -1
        )
      ) {
        headerButtons.push(
          <ButtonIconic
            key='video'
            style={styles.brPanelHeaderButton}
            disabled={
              !props.uiData.phone ||
              props.uiData.phone.getPhoneStatus() !== 'started' ||
              panelSession
            }
            title={uawMsgs.LBL_PANEL_HEADER_VIDEO_BUTTON_TOOLTIP}
            onPress={props.uiData.fire.bind(
              props.uiData,
              'panelHeaderVideoButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          >
            <View style={styles.brPanelHeaderButtonIcon} />
          </ButtonIconic>,
        )
      }
      if (
        !(
          props.uiData.configurations.headerButtons &&
          props.uiData.configurations.headerButtons.indexOf('screen') === -1
        )
      ) {
        headerButtons.push(
          <ButtonIconic
            key='screen'
            style={styles.brPanelHeaderButton}
            disabled={
              !props.uiData.phone ||
              props.uiData.phone.getPhoneStatus() !== 'started' ||
              panelSession
            }
            title={uawMsgs.LBL_PANEL_HEADER_SCREEN_BUTTON_TOOLTIP}
            onPress={props.uiData.fire.bind(
              props.uiData,
              'panelHeaderScreenButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          >
            <View style={styles.brPanelHeaderButtonIcon} />
          </ButtonIconic>,
        )
      }
      contents = (
        <ChatPanel
          uiData={props.uiData}
          panelType={props.panelType}
          panelCode={props.panelCode}
        />
      )
    } else if (props.panelType === 'PREFERENCE') {
      panelTypeClassName = 'brPreference'
      headerTitle = uawMsgs.LBL_PANEL_HEADER_PREFERENCE_TITLE
      headerInfo = string(
        (
          (props.uiData.preferenceWorkTable &&
            props.uiData.preferenceWorkTable[props.panelCode]) ||
          {}
        ).saveMessage,
      )
      contents = (
        <PreferencePanel
          uiData={props.uiData}
          panelType={props.panelType}
          panelCode={props.panelCode}
        />
      )
    } else if (props.panelType === 'WEBCHATQUEUE') {
      panelTypeClassName = 'brWebchatQueue'
      headerTitle = uawMsgs.TAB_WEBCHATQUEUE
      headerSimpleButtons.unshift(
        <PanelHeaderHideButton
          key='hide'
          uiData={props.uiData}
          panelType={props.panelType}
          panelCode={props.panelCode}
        />,
      )
      contents = <WebchatQueuePanel uiData={props.uiData} />
    } else if (props.panelType === 'HISTORYSEARCH') {
      panelTypeClassName = 'brHistorySearch'
      contents = (
        <HistorySearchPanel
          uiData={props.uiData}
          panelType={props.panelType}
          panelCode={props.panelCode}
        />
      )
    } else if (props.panelType === 'HISTORYSUMMARIES') {
      panelTypeClassName = 'brHistorySummaries'
      headerTitle = uawMsgs.LBL_PANEL_HEADER_HISTORYSUMMARIES_TITLE
      const searchConditions =
        props.uiData.ucUiStore.getSearchConditions({
          chatType: props.panelType,
          chatCode: props.panelCode,
        }) || []
      const conditions = { _any: {}, _userId: {} }
      searchConditions.forEach(
        condition => (conditions[condition.conditionKey] = condition),
      )
      const buddyTable =
        props.uiData.ucUiStore.getBuddyTable()[profile.tenant] || {}
      const buddies = Object.keys(buddyTable)
        .map(key => buddyTable[key])
        .filter(
          buddy => !buddy.isMe && buddy.isBuddy && !buddy.isTemporaryBuddy,
        )
        .sort(
          (buddy1, buddy2) => int(buddy1.buddyIndex) - int(buddy2.buddyIndex),
        )
      const groupTable = {}
      buddies.forEach(buddy => {
        const groupName = string(buddy.group)
        if (!groupTable[groupName]) {
          groupTable[groupName] = {
            groupIndex: int(buddy.groupIndex),
            buddyNodes: [],
          }
        }
        if (
          !groupName ||
          this.state.headerSearchConditionsUserGroupOpen
            .split(',')
            .indexOf(groupName) !== -1
        ) {
          groupTable[groupName].buddyNodes.push(
            <MenuItem
              key={JSON.stringify({
                tenant: buddy.tenant,
                user_id: buddy.user_id,
              })}
              style={styles.brHeaderSearchConditionsUserItem}
              dropDown={true}
              onPress={this.handleHeaderSearchConditionsUserItemClick.bind(
                this,
                buddy.user_id,
              )}
            >
              <NameEmbeddedSpan
                ucUiStore={props.uiData.ucUiStore}
                format={'{0}'}
                title={'{0}'}
                buddy={buddy}
              />
            </MenuItem>,
          )
        }
      })
      headerSearchConditions = (
        <View>
          <ButtonIconic
            style={[
              styles.brHeaderSearchConditionsDetailButton,
              this.state.historySummariesWithHeader
                ? styles.br_bi_icon_chevron_up_svg
                : styles.br_bi_icon_chevron_down_svg,
            ]}
            title={uawMsgs.LBL_PANEL_HEADER_SEARCH_DETAIL_BUTTON_TOOLTIP}
            onPress={this.handleHeaderSearchConditionsDetailButtonClick.bind(
              this,
            )}
          />
          <View style={styles.brHeaderSearchConditionsContentArea}>
            <TextBox
              ref={this.headerSearchConditionsContentInputRef}
              style={styles.brHeaderSearchConditionsContentInput}
              value={
                this.state.headerSearchConditionsContentCache === null
                  ? string(conditions._any.conditionValue)
                  : this.state.headerSearchConditionsContentCache
              }
              placeholder={uawMsgs.LBL_PANEL_HEADER_SEARCH_INPUT_PLACEHOLDER}
              onChangeText={this.handleHeaderSearchConditionsContentInputChange.bind(
                this,
              )}
              onBlur={this.handleHeaderSearchConditionsContentInputBlur.bind(
                this,
              )}
              onSubmitEditing={this.handleHeaderSearchConditionsContentInputKeyDown.bind(
                this,
              )}
            />
            <ButtonIconic
              style={styles.brHeaderSearchConditionsSearchButton}
              title={uawMsgs.LBL_PANEL_HEADER_SEARCH_BUTTON_TOOLTIP}
              onPress={this.handleHeaderSearchConditionsSearchButtonClick.bind(
                this,
              )}
            />
          </View>
          <View style={styles.brHeaderSearchConditionsUserArea}>
            <DropDownMenu
              uiData={props.uiData}
              style={styles.brHeaderSearchConditionsUserMenu}
              dialogStyle={styles.brPanelAreaDialog}
              text={
                conditions._userId.conditionValue
                  ? string(
                      (buddyTable[conditions._userId.conditionValue] || {})
                        .name || conditions._userId.conditionValue,
                    )
                  : uawMsgs.LBL_PANEL_HEADER_SEARCH_USER_ALL
              }
            >
              <MenuItem
                style={styles.brHeaderSearchConditionsUserItem}
                dropDown={true}
                onPress={this.handleHeaderSearchConditionsUserAllClick.bind(
                  this,
                )}
              >
                {uawMsgs.LBL_PANEL_HEADER_SEARCH_USER_ALL}
              </MenuItem>
              {Object.keys(groupTable)
                .sort(
                  (groupName1, groupName2) =>
                    (groupTable[groupName1].groupIndex >>> 0) -
                    (groupTable[groupName2].groupIndex >>> 0),
                )
                .map(groupName => (
                  <View
                    key={groupName}
                    style={[
                      styles.brHeaderSearchConditionsUserGroup,
                      groupName ? styles.brGroupName : null,
                    ]}
                    title={groupName}
                    onPress={this.handleHeaderSearchConditionsUserGroupClick.bind(
                      this,
                      groupName,
                    )}
                  >
                    <View
                      style={[
                        styles.brHeaderSearchConditionsUserGroupIcon,
                        this.state.headerSearchConditionsUserGroupOpen
                          .split(',')
                          .indexOf(groupName) !== -1
                          ? styles.br_bi_icon_chevron_up_svg
                          : styles.br_bi_icon_chevron_down_svg,
                      ]}
                    />
                    <Text style={styles.brHeaderSearchConditionsUserGroupName}>
                      {groupName}
                    </Text>
                    {groupTable[groupName].buddyNodes}
                  </View>
                ))}
            </DropDownMenu>
          </View>
        </View>
      )
      contents = (
        <HistorySummariesPanel
          uiData={props.uiData}
          panelType={props.panelType}
          panelCode={props.panelCode}
          withHeader={this.state.historySummariesWithHeader}
        />
      )
    } else if (props.panelType === 'HISTORYDETAIL') {
      panelTypeClassName = 'brHistoryDetail'
      headerTitle =
        uawMsgs.LBL_PANEL_HEADER_HISTORYDETAIL_TITLE +
        string(
          (
            (props.uiData.historyDetailWorkTable &&
              props.uiData.historyDetailWorkTable[props.panelCode]) ||
            {}
          ).historyDetailName,
        )
      let isBuddy = false
      try {
        isBuddy = props.uiData.ucUiStore.getBuddyUserForUi(
          JSON.parse(
            (props.uiData.historyDetailWorkTable &&
              props.uiData.historyDetailWorkTable[props.panelCode] &&
              props.uiData.historyDetailWorkTable[props.panelCode]
                .chatPanelCode) ||
              '{}',
          ),
        ).isBuddy
      } catch (e) {}
      if (
        !(
          props.uiData.configurations.headerButtons &&
          props.uiData.configurations.headerButtons.indexOf('chat') === -1
        )
      ) {
        headerButtons.push(
          <ButtonIconic
            key='chat'
            style={styles.brPanelHeaderButton}
            disabled={!isBuddy}
            title={uawMsgs.LBL_PANEL_HEADER_CHAT_BUTTON_TOOLTIP}
            onPress={props.uiData.fire.bind(
              props.uiData,
              'panelHeaderChatButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          >
            <View style={styles.brPanelHeaderButtonIcon} />
          </ButtonIconic>,
        )
      }
      if (
        !(
          props.uiData.configurations.headerButtons &&
          props.uiData.configurations.headerButtons.indexOf('history') === -1
        )
      ) {
        headerButtons.push(
          <ButtonIconic
            key='history'
            style={styles.brPanelHeaderButton}
            disabled={
              !(
                props.uiData.historyDetailWorkTable &&
                props.uiData.historyDetailWorkTable[props.panelCode] &&
                props.uiData.historyDetailWorkTable[props.panelCode]
                  .chatPanelCode
              )
            }
            title={uawMsgs.LBL_PANEL_HEADER_HISTORY_BUTTON_TOOLTIP}
            onPress={props.uiData.fire.bind(
              props.uiData,
              'panelHeaderHistoryButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          >
            <View style={styles.brPanelHeaderButtonIcon} />
          </ButtonIconic>,
        )
      }
      contents = (
        <HistoryDetailPanel
          uiData={props.uiData}
          panelType={props.panelType}
          panelCode={props.panelCode}
        />
      )
    }
    console.log('#Duy Phan console headerButtons', headerButtons.length)

    return (
      <View
        ref={this.panelHeaderAreaRef}
        style={[
          styles.brPanelArea,
          styles[panelTypeClassName],
          props.uiData.currentSelectedTab ===
          props.panelType + '_' + props.panelCode
            ? styles.brSelected
            : null,
          this.state.headerButtonsCollapsible
            ? styles.brHeaderButtonsCollapsible
            : null,
          props.uiData.configurations.headerButtonsVisible
            ? styles.brHeaderButtonsVisible
            : null,
        ]}
      >
        <View style={styles.brPanelAreaInner}>{contents}</View>
        <View ref={this.panelHeaderAreaRef} style={styles.brPanelHeaderArea}>
          <Text
            ref={this.panelHeaderTitleRef}
            style={[
              styles.brPanelHeaderTitle,
              headerTitle ? null : styles.brPanelHeaderTitleHidden,
            ]}
            numberOfLines={1}
            ellipsizeMode='tail'
          >
            {headerTitle}
          </Text>
          <Text
            ref={this.panelHeaderInfoRef}
            style={[
              styles.brPanelHeaderInfo,
              headerInfo ? null : styles.brPanelHeaderInfoHidden,
              props.panelType === 'PREFERENCE'
                ? styles.brPreferencePanelHeaderInfo
                : null,
            ]}
            numberOfLines={1}
            ellipsizeMode='tail'
          >
            {headerInfo}
          </Text>

          <View
            ref={this.panelHeaderMembersRef}
            style={[
              styles.brPanelHeaderMembers,
              headerMembers.length ? null : styles.brPanelHeaderMembersHidden,
            ]}
          >
            {headerMembers}
          </View>
          <View
            ref={this.panelHeaderButtonsAreaRef}
            style={styles.brPanelHeaderButtonsArea}
          >
            {headerButtons}
          </View>
          <TouchableOpacity
            style={[
              styles.brPanelHeaderButtonsMenu,
              headerButtons.length ? null : styles.brHidden,
            ]}
            onPress={this.handlePanelHeaderButtonsMenuClick.bind(this)}
          >
            <View
              style={[
                styles.brPanelHeaderButtonsBalloonDialog,
                props.uiData.showingDialogVersion ===
                this.state.showingDialogVersion
                  ? null
                  : styles.brPanelHeaderButtonsBalloonDialogHidden,
              ]}
            >
              {headerButtons}
            </View>
          </TouchableOpacity>
          <MenuBalloonDialog
            style={[
              styles.brReplyWebchatBalloonDialog,
              this.state.replyDialogStyle,
            ]}
            showing={
              props.uiData.showingDialogVersion ===
                this.state.showingDialogVersion &&
              props.uiData.showingDialogVersion ===
                this.state.showingReplyDialogVersion
            }
          >
            {replyOptions.map((s, i) => (
              <MenuItem
                key={i}
                style={[styles.brReplyWebchatMenuItem, styles[s.className]]}
                onPress={s.event}
              >
                {s.label}
              </MenuItem>
            ))}
          </MenuBalloonDialog>
          <View
            style={[
              styles.brPanelHeaderSimpleButtonsArea,
              props.uiData.configurations.panelHeader
                ? styles.brPanelHeaderSimpleButtonsAreaVisible
                : null,
            ]}
          >
            {headerSimpleButtons}
          </View>
          <View
            ref={this.panelHeaderSearchConditionsRef}
            style={[
              styles.brHeaderSearchConditions,
              headerSearchConditions
                ? null
                : styles.brHeaderSearchConditionsHidden,
              { width: this.state.headerSearchConditionsWidth },
            ]}
          >
            {headerSearchConditions}
          </View>
          <DndableSafe
            uiData={props.uiData}
            style={styles.brPanelHeaderInviteDndable}
            onCheckCanDrop={props.uiData.fire.bind(
              props.uiData,
              'panelHeaderInviteDndable_onCheckCanDrop',
              props.panelType,
              props.panelCode,
            )}
            onDrop={props.uiData.fire.bind(
              props.uiData,
              'panelHeaderInviteDndable_onDrop',
              props.panelType,
              props.panelCode,
            )}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  brPanelArea: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    // width: 500,
    // height: 500,
    // backgroundColor: 'blue',
  },
  brPanelHeaderArea: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0', // @platinum
    // backgroundColor: 'red',
  },
  brPanelHeaderTitle: {
    maxHeight: '100%',
    paddingLeft: 22,
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.3,
  },
  brPanelHeaderTitleHidden: {
    display: 'none',
  },
  brPanelHeaderInfo: {
    maxHeight: '100%',
    paddingLeft: 26,
    fontSize: 9,
    fontWeight: '400',
    letterSpacing: 1.3,
    color: '#666666', // @dark_gray
  },
  brPanelHeaderInfoHidden: {
    display: 'none',
  },
  brPreferencePanelHeaderInfo: {
    marginLeft: 16,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
    borderWidth: 1,
    borderColor: '#FF5A1F', // @portland_orange
    color: '#FF5A1F', // @portland_orange
    fontSize: 13,
    fontWeight: '400',
    letterSpacing: 0.3,
  },
  brPanelHeaderMembers: {
    maxHeight: '100%',
    paddingLeft: 22,
    fontSize: 9,
    fontWeight: '400',
    letterSpacing: 1.3,
    color: '#666666', // @dark_gray
  },
  brPanelHeaderMembersHidden: {
    display: 'none',
  },
  brConfStatus1: {
    color: '#E5E5E5', // @platinum
  },
  brPanelHeaderButtonsArea: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    height: 0,
    transform: [
      { translateX: -16 }, // Half of the default button width
      { translateY: -16 }, // Half of the default button height
    ],
    display: 'none',
  },
  brHeaderButtonsVisible: {
    height: 32,
  },
  brPanelHeaderButton: {
    marginHorizontal: 2,
    backgroundColor: '#7AC142', // @mantis
  },
  brPanelHeaderButtonDisabled: {
    backgroundColor: '#CCCCCC', // @disabled_gray
  },
  brPanelHeaderButtonKick: {
    backgroundColor: '#FF5A1F', // @portland_orange
  },
  brPanelHeaderButtonIcon: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    tintColor: '#FFFFFF',
  },
  brPanelHeaderButtonsMenu: {
    position: 'absolute',
    right: 8,
    top: '50%',
    transform: [{ translateY: -16 }], // Half of the default button height
  },
  brPanelHeaderButtonsBalloonDialog: {
    position: 'absolute',
    right: -4,
    top: 36,
    height: 40,
    padding: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    shadowColor: '#E5E5E5',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  brPanelHeaderButtonsBalloonDialogHidden: {
    display: 'none',
  },
  brReplyWebchatBalloonDialog: {
    position: 'absolute',
  },
  brPanelHeaderSimpleButtonsArea: {
    position: 'absolute',
    right: 2,
    top: '50%',
    height: 20,
    transform: [{ translateY: -10 }], // Half of the height
    display: 'none',
  },
  brPanelHeaderSimpleButtonsAreaVisible: {
    display: 'flex',
  },
  brSimpleButton: {
    width: 20,
    height: 20,
    marginLeft: 2,
  },
  brHeaderSearchConditions: {
    position: 'absolute',
    right: 0,
    maxWidth: 600,
    top: '50%',
    height: 42,
    transform: [{ translateY: -21 }], // Half of the height
  },
  brHeaderSearchConditionsHidden: {
    display: 'none',
  },
  brHeaderSearchConditionsDetailButton: {
    position: 'absolute',
    right: 8,
    width: 32,
    top: 5,
    height: 32,
  },
  brHeaderSearchConditionsContentArea: {
    position: 'absolute',
    left: 200,
    right: 48,
    top: 0,
    height: 42,
  },
  brHeaderSearchConditionsContentInput: {
    position: 'absolute',
    left: 0,
    width: '100%',
    top: 0,
    height: '100%',
  },
  brHeaderSearchConditionsSearchButton: {
    position: 'absolute',
    right: 5,
    width: 32,
    top: 5,
    height: 32,
    opacity: 0.2,
  },
  brHeaderSearchConditionsUserArea: {
    position: 'absolute',
    left: 12,
    width: 176,
    top: 5,
    height: 32,
  },
  brHeaderSearchConditionsUserMenu: {
    position: 'absolute',
    left: 0,
    width: '100%',
    top: 0,
    height: '100%',
  },
  brHeaderSearchConditionsUserGroup: {
    position: 'relative',
    minWidth: 80,
    paddingTop: 24,
  },
  brHeaderSearchConditionsUserGroupIcon: {
    position: 'absolute',
    right: 4,
    width: 16,
    top: 4,
    height: 16,
  },
  brHeaderSearchConditionsUserGroupName: {
    position: 'absolute',
    left: 0,
    width: '100%',
    top: 0,
    height: 24,
    fontSize: 9,
    fontWeight: '400',
    letterSpacing: 1.3,
    paddingLeft: 8,
    color: '#666666', // @dark_gray
  },
  brPanelHeaderInviteDndable: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  brPanelHeaderInviteDndableCanDrop: {
    display: 'flex',
  },
  brPanelHeaderInviteDndableIsOver: {
    borderWidth: 3,
    borderColor: '#48C9B0', // @medium_turquoise
  },
  brPanelAreaInner: {
    position: 'absolute',
    left: 0,
    top: 56,
    bottom: 0,
    width: '100%',
  },
  brHidden: {
    display: 'none',
  },
})
