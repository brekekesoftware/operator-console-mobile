import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ReactDOM from 'react-dom'
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
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'

const icons = {
  logOut: require('../assets/icons/log-out.png'),
  reply: require('../assets/icons/reply.png'),
  envelope: require('../assets/icons/envelope.png'),
  upload: require('../assets/icons/upload.png'),
  phone: require('../assets/icons/phone.png'),
  videoCall: require('../assets/icons/video-call.png'),
  channelMosaic1: require('../assets/icons/channel-mosaic-1.png'),
  history: require('../assets/icons/history.png'),
  chevronUp: require('../assets/icons/chevron-up.png'),
  chevronDown: require('../assets/icons/chevron-down.png'),
  search: require('../assets/icons/search.png'),
  more: require('../assets/icons/more.png'),
}

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

    // Create refs for elements we need to measure
    this.panelHeaderAreaRef = React.createRef()
    this.panelHeaderTitleRef = React.createRef()
    this.panelHeaderInfoRef = React.createRef()
    this.panelHeaderMembersRef = React.createRef()
    this.panelHeaderButtonsAreaRef = React.createRef()
    this.headerSearchConditionsContentInputRef = React.createRef()
  }

  componentDidMount() {
    // Focus input if available
    if (this.headerSearchConditionsContentInputRef.current) {
      this.headerSearchConditionsContentInputRef.current.focus()
    }
  }

  componentDidUpdate() {
    // Use measure() to get dimensions
    this.updateHeaderLayout()
  }

  // New method to handle layout measurements
  updateHeaderLayout() {
    const newState = {}

    // Create a promise array for all measurements
    const measurements = []

    if (this.panelHeaderAreaRef.current) {
      measurements.push(
        new Promise(resolve => {
          this.panelHeaderAreaRef.current.measure(
            (x, y, width, height, pageX, pageY) => {
              resolve({ width, pageX })
            },
          )
        }),
      )
    }

    if (this.panelHeaderTitleRef.current) {
      measurements.push(
        new Promise(resolve => {
          this.panelHeaderTitleRef.current.measure(
            (x, y, width, height, pageX) => {
              resolve({ type: 'title', width, pageX })
            },
          )
        }),
      )
    }

    if (this.panelHeaderInfoRef.current) {
      measurements.push(
        new Promise(resolve => {
          this.panelHeaderInfoRef.current.measure(
            (x, y, width, height, pageX) => {
              resolve({ type: 'info', width, pageX })
            },
          )
        }),
      )
    }

    if (this.panelHeaderMembersRef.current) {
      measurements.push(
        new Promise(resolve => {
          this.panelHeaderMembersRef.current.measure(
            (x, y, width, height, pageX) => {
              resolve({ type: 'members', width, pageX })
            },
          )
        }),
      )
    }

    if (this.panelHeaderButtonsAreaRef.current) {
      measurements.push(
        new Promise(resolve => {
          this.panelHeaderButtonsAreaRef.current.measure(
            (x, y, width, height, pageX) => {
              resolve({ type: 'buttons', width, pageX })
            },
          )
        }),
      )
    }

    // Process all measurements
    Promise.all(measurements).then(results => {
      const areaWidth = results[0].width

      // Find rightmost edge of text elements
      let rightOfTexts = null
      const textMeasurements = results.slice(1)

      for (const measure of textMeasurements) {
        if (measure.type === 'members' && measure.width) {
          rightOfTexts = measure.pageX + measure.width
          break
        } else if (measure.type === 'info' && measure.width) {
          rightOfTexts = measure.pageX + measure.width
          break
        } else if (measure.type === 'title' && measure.width) {
          rightOfTexts = measure.pageX + measure.width
          break
        }
      }

      if (typeof rightOfTexts === 'number') {
        const buttonsResult = results.find(r => r.type === 'buttons')
        if (buttonsResult) {
          const leftOfButtons = (areaWidth - buttonsResult.width) / 2

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
          areaWidth - rightOfTexts
        ) {
          newState.headerSearchConditionsWidth = areaWidth - rightOfTexts
        }
      }

      if (Object.keys(newState).length) {
        this.setState(newState)
      }
    })
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

      // Get measurements for positioning dialog
      if (this.panelHeaderAreaRef.current && ev.target) {
        Promise.all([
          new Promise(resolve => {
            this.panelHeaderAreaRef.current.measure(
              (x, y, width, height, pageX, pageY) => {
                resolve({ pageX, pageY })
              },
            )
          }),
          new Promise(resolve => {
            ev.target.measure((x, y, width, height, pageX, pageY) => {
              resolve({ pageX, pageY, height })
            })
          }),
        ]).then(([areaRect, buttonRect]) => {
          replyDialogStyle.left = buttonRect.pageX - areaRect.pageX
          replyDialogStyle.top =
            buttonRect.pageY - areaRect.pageY + buttonRect.height

          this.setState({
            showingDialogVersion: props.uiData.showingDialogVersion,
            showingReplyDialogVersion: props.uiData.showingDialogVersion,
            replyDialogStyle,
          })
        })
      }

      props.uiData.fire('showingDialog_update')
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
        ev && ev.target && ev.target.value,
      ),
    })
  }

  handleHeaderSearchConditionsContentInputBlur(ev) {
    const props = this.props
    // save value to store
    this.setSearchCondition('_any', string(ev && ev.target && ev.target.value))
    // clear cached value in state
    this.setState({ headerSearchConditionsContentCache: null })
  }

  handleHeaderSearchConditionsContentInputKeyDown(ev) {
    const props = this.props
    if (ev && ev.keyCode === 13 && !ev.shiftKey) {
      // save value to store
      this.setSearchCondition(
        '_any',
        string(ev && ev.target && ev.target.value),
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
              // className={
              //   'brConfStatus' +
              //   (
              //     conference.user.find(
              //       u =>
              //         u.tenant === member.tenant &&
              //         u.user_id === member.user_id,
              //     ) || {}
              //   ).conf_status
              // }
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
            style={[
              styles.brPanelHeaderButton,
              styles.brLeaveButton,
              !props.uiData.currentSelectedTab.includes(
                props.panelType + '_' + props.panelCode,
              ) && styles.brNotSelected,
              conference.conf_status !==
                Constants.CONF_STATUS_JOINED /* || conference.conf_type === 'webchat' && conference.user.filter(u => u.conf_status === Constants.CONF_STATUS_JOINED).length < 3 */,
            ]}
            disabled={
              conference.conf_status !==
              Constants.CONF_STATUS_JOINED /* || conference.conf_type === 'webchat' && conference.user.filter(u => u.conf_status === Constants.CONF_STATUS_JOINED).length < 3 */
            }
            iconSource={icons.logOut}
            accessibilityLabel={uawMsgs.LBL_PANEL_HEADER_LEAVE_BUTTON_TOOLTIP}
            onPress={props.uiData.fire.bind(
              props.uiData,
              'panelHeaderLeaveButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          />,
        )
      }
      if (chatHeaderInfo.confType === 'webchat') {
        panelTypeClassName += ' brWebchat'
        //if (!(props.uiData.configurations.headerButtons && props.uiData.configurations.headerButtons.indexOf('kick') === -1)) {
        //    headerButtons.push((
        //        <ButtonIconic
        //            key="kick"
        //            className="brPanelHeaderButton brKickButton"
        //            disabled={!props.uiData.ucUiStore.getWebchatQueue({ conf_id: conf_id }).isTalking}
        //            title={uawMsgs.LBL_PANEL_HEADER_KICK_BUTTON_TOOLTIP}
        //            onClick={props.uiData.fire.bind(props.uiData, 'panelHeaderKickButton_onClick', props.panelType, props.panelCode)}
        //        >
        //            <span className="brPanelHeaderButtonIcon br_bi_icon_close_svg"></span>
        //        </ButtonIconic>
        //    ));
        //}
        if (
          !(
            props.uiData.configurations.headerButtons &&
            props.uiData.configurations.headerButtons.indexOf('reply') === -1
          )
        ) {
          headerButtons.push(
            <ButtonIconic
              key='reply'
              style={[
                styles.brPanelHeaderButton,
                styles.brReplyWebchatButton,
                !replyOptions.length && styles.brDisabled,
                !props.uiData.currentSelectedTab.includes(
                  props.panelType + '_' + props.panelCode,
                ) && styles.brNotSelected,
              ]}
              disabled={!replyOptions.length}
              iconSource={icons.reply}
              accessibilityLabel={uawMsgs.LBL_PANEL_HEADER_REPLY_BUTTON_TOOLTIP}
              onPress={
                replyOptions.length === 1
                  ? replyOptions[0].event
                  : this.handleReplyWebchatButtonClick.bind(this)
              }
            />,
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
            style={[
              styles.brPanelHeaderButton,
              styles.brInviteButton,
              (conference.conf_status !== Constants.CONF_STATUS_JOINED ||
                (chatHeaderInfo.confType === 'webchat' &&
                  (-int(
                    (conference.webchatinfo &&
                      string(conference.webchatinfo.invite_button_type)) ||
                      '-98',
                  ) &
                    myUcCimUserType) !==
                    myUcCimUserType)) &&
                styles.brDisabled,
              !props.uiData.currentSelectedTab.includes(
                props.panelType + '_' + props.panelCode,
              ) && styles.brNotSelected,
            ]}
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
            iconSource={icons.envelope}
            accessibilityLabel={uawMsgs.LBL_PANEL_HEADER_INVITE_BUTTON_TOOLTIP}
            onPress={props.uiData.fire.bind(
              props.uiData,
              'panelHeaderInviteButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          />,
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
              style={[
                styles.brPanelHeaderButton,
                styles.brFileButton,
                (conference.conf_status !== Constants.CONF_STATUS_JOINED ||
                  joinedCount < 2) &&
                  styles.brDisabled,
                !props.uiData.currentSelectedTab.includes(
                  props.panelType + '_' + props.panelCode,
                ) && styles.brNotSelected,
              ]}
              disabled={
                conference.conf_status !== Constants.CONF_STATUS_JOINED ||
                joinedCount < 2
              }
              iconSource={icons.upload}
              accessibilityLabel={uawMsgs.LBL_PANEL_HEADER_FILE_BUTTON_TOOLTIP}
              onPress={props.uiData.fire.bind(
                props.uiData,
                'panelHeaderFileButton_onClick',
                props.panelType,
                props.panelCode,
              )}
            />,
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
            style={[
              styles.brPanelHeaderButton,
              styles.brVoiceButton,
              (conference.conf_status !== Constants.CONF_STATUS_JOINED ||
                !props.uiData.phone ||
                props.uiData.phone.getPhoneStatus() !== 'started' ||
                panelSession) &&
                styles.brDisabled,
              !props.uiData.currentSelectedTab.includes(
                props.panelType + '_' + props.panelCode,
              ) && styles.brNotSelected,
            ]}
            disabled={
              conference.conf_status !== Constants.CONF_STATUS_JOINED ||
              !props.uiData.phone ||
              props.uiData.phone.getPhoneStatus() !== 'started' ||
              panelSession
            }
            iconSource={icons.phone}
            accessibilityLabel={uawMsgs.LBL_PANEL_HEADER_VOICE_BUTTON_TOOLTIP}
            onPress={props.uiData.fire.bind(
              props.uiData,
              'panelHeaderVoiceButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          />,
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
            style={[
              styles.brPanelHeaderButton,
              styles.brVideoButton,
              (conference.conf_status !== Constants.CONF_STATUS_JOINED ||
                !props.uiData.phone ||
                props.uiData.phone.getPhoneStatus() !== 'started' ||
                panelSession) &&
                styles.brDisabled,
              !props.uiData.currentSelectedTab.includes(
                props.panelType + '_' + props.panelCode,
              ) && styles.brNotSelected,
            ]}
            disabled={
              conference.conf_status !== Constants.CONF_STATUS_JOINED ||
              !props.uiData.phone ||
              props.uiData.phone.getPhoneStatus() !== 'started' ||
              panelSession
            }
            iconSource={icons.videoCall}
            accessibilityLabel={uawMsgs.LBL_PANEL_HEADER_VIDEO_BUTTON_TOOLTIP}
            onPress={props.uiData.fire.bind(
              props.uiData,
              'panelHeaderVideoButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          />,
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
            style={[
              styles.brPanelHeaderButton,
              styles.brScreenButton,
              (conference.conf_status !== Constants.CONF_STATUS_JOINED ||
                !props.uiData.phone ||
                props.uiData.phone.getPhoneStatus() !== 'started' ||
                panelSession) &&
                styles.brDisabled,
              !props.uiData.currentSelectedTab.includes(
                props.panelType + '_' + props.panelCode,
              ) && styles.brNotSelected,
            ]}
            disabled={
              conference.conf_status !== Constants.CONF_STATUS_JOINED ||
              !props.uiData.phone ||
              props.uiData.phone.getPhoneStatus() !== 'started' ||
              panelSession
            }
            iconSource={icons.channelMosaic1}
            accessibilityLabel={uawMsgs.LBL_PANEL_HEADER_SCREEN_BUTTON_TOOLTIP}
            onPress={props.uiData.fire.bind(
              props.uiData,
              'panelHeaderScreenButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          />,
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
              style={[
                styles.brPanelHeaderButton,
                styles.brFileButton,
                (conference.conf_status !== Constants.CONF_STATUS_JOINED ||
                  joinedCount < 2) &&
                  styles.brDisabled,
                !props.uiData.currentSelectedTab.includes(
                  props.panelType + '_' + props.panelCode,
                ) && styles.brNotSelected,
              ]}
              disabled={
                conference.conf_status !== Constants.CONF_STATUS_JOINED ||
                joinedCount < 2
              }
              iconSource={icons.upload}
              accessibilityLabel={uawMsgs.LBL_PANEL_HEADER_FILE_BUTTON_TOOLTIP}
              onPress={props.uiData.fire.bind(
                props.uiData,
                'panelHeaderFileButton_onClick',
                props.panelType,
                props.panelCode,
              )}
            />,
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
            style={[
              styles.brPanelHeaderButton,
              styles.brVoiceButton,
              (conference.conf_status !== Constants.CONF_STATUS_JOINED ||
                !props.uiData.phone ||
                props.uiData.phone.getPhoneStatus() !== 'started' ||
                panelSession) &&
                styles.brDisabled,
              !props.uiData.currentSelectedTab.includes(
                props.panelType + '_' + props.panelCode,
              ) && styles.brNotSelected,
            ]}
            disabled={
              conference.conf_status !== Constants.CONF_STATUS_JOINED ||
              !props.uiData.phone ||
              props.uiData.phone.getPhoneStatus() !== 'started' ||
              panelSession
            }
            iconSource={icons.phone}
            accessibilityLabel={uawMsgs.LBL_PANEL_HEADER_VOICE_BUTTON_TOOLTIP}
            onPress={props.uiData.fire.bind(
              props.uiData,
              'panelHeaderVoiceButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          />,
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
            style={[
              styles.brPanelHeaderButton,
              styles.brVideoButton,
              (conference.conf_status !== Constants.CONF_STATUS_JOINED ||
                !props.uiData.phone ||
                props.uiData.phone.getPhoneStatus() !== 'started' ||
                panelSession) &&
                styles.brDisabled,
              !props.uiData.currentSelectedTab.includes(
                props.panelType + '_' + props.panelCode,
              ) && styles.brNotSelected,
            ]}
            disabled={
              conference.conf_status !== Constants.CONF_STATUS_JOINED ||
              !props.uiData.phone ||
              props.uiData.phone.getPhoneStatus() !== 'started' ||
              panelSession
            }
            iconSource={icons.videoCall}
            accessibilityLabel={uawMsgs.LBL_PANEL_HEADER_VIDEO_BUTTON_TOOLTIP}
            onPress={props.uiData.fire.bind(
              props.uiData,
              'panelHeaderVideoButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          />,
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
            style={[
              styles.brPanelHeaderButton,
              styles.brScreenButton,
              (conference.conf_status !== Constants.CONF_STATUS_JOINED ||
                !props.uiData.phone ||
                props.uiData.phone.getPhoneStatus() !== 'started' ||
                panelSession) &&
                styles.brDisabled,
              !props.uiData.currentSelectedTab.includes(
                props.panelType + '_' + props.panelCode,
              ) && styles.brNotSelected,
            ]}
            disabled={
              conference.conf_status !== Constants.CONF_STATUS_JOINED ||
              !props.uiData.phone ||
              props.uiData.phone.getPhoneStatus() !== 'started' ||
              panelSession
            }
            iconSource={icons.channelMosaic1}
            accessibilityLabel={uawMsgs.LBL_PANEL_HEADER_SCREEN_BUTTON_TOOLTIP}
            onPress={props.uiData.fire.bind(
              props.uiData,
              'panelHeaderScreenButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          />,
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
            style={[
              styles.brPanelHeaderButton,
              styles.brHistoryButton,
              !props.uiData.currentSelectedTab.includes(
                props.panelType + '_' + props.panelCode,
              ) && styles.brNotSelected,
            ]}
            disabled={
              !(
                props.uiData.historyDetailWorkTable &&
                props.uiData.historyDetailWorkTable[props.panelCode] &&
                props.uiData.historyDetailWorkTable[props.panelCode]
                  .chatPanelCode
              )
            }
            iconSource={icons.history}
            accessibilityLabel={uawMsgs.LBL_PANEL_HEADER_HISTORY_BUTTON_TOOLTIP}
            onPress={props.uiData.fire.bind(
              props.uiData,
              'panelHeaderHistoryButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          />,
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
            style={[
              styles.brPanelHeaderButton,
              styles.brVoiceButton,
              (conference.conf_status !== Constants.CONF_STATUS_JOINED ||
                !props.uiData.phone ||
                props.uiData.phone.getPhoneStatus() !== 'started' ||
                panelSession) &&
                styles.brDisabled,
              !props.uiData.currentSelectedTab.includes(
                props.panelType + '_' + props.panelCode,
              ) && styles.brNotSelected,
            ]}
            disabled={
              conference.conf_status !== Constants.CONF_STATUS_JOINED ||
              !props.uiData.phone ||
              props.uiData.phone.getPhoneStatus() !== 'started' ||
              panelSession
            }
            iconSource={icons.phone}
            accessibilityLabel={uawMsgs.LBL_PANEL_HEADER_VOICE_BUTTON_TOOLTIP}
            onPress={props.uiData.fire.bind(
              props.uiData,
              'panelHeaderVoiceButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          />,
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
            style={[
              styles.brPanelHeaderButton,
              styles.brVideoButton,
              (conference.conf_status !== Constants.CONF_STATUS_JOINED ||
                !props.uiData.phone ||
                props.uiData.phone.getPhoneStatus() !== 'started' ||
                panelSession) &&
                styles.brDisabled,
              !props.uiData.currentSelectedTab.includes(
                props.panelType + '_' + props.panelCode,
              ) && styles.brNotSelected,
            ]}
            disabled={
              conference.conf_status !== Constants.CONF_STATUS_JOINED ||
              !props.uiData.phone ||
              props.uiData.phone.getPhoneStatus() !== 'started' ||
              panelSession
            }
            iconSource={icons.videoCall}
            accessibilityLabel={uawMsgs.LBL_PANEL_HEADER_VIDEO_BUTTON_TOOLTIP}
            onPress={props.uiData.fire.bind(
              props.uiData,
              'panelHeaderVideoButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          />,
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
            style={[
              styles.brPanelHeaderButton,
              styles.brScreenButton,
              (conference.conf_status !== Constants.CONF_STATUS_JOINED ||
                !props.uiData.phone ||
                props.uiData.phone.getPhoneStatus() !== 'started' ||
                panelSession) &&
                styles.brDisabled,
              !props.uiData.currentSelectedTab.includes(
                props.panelType + '_' + props.panelCode,
              ) && styles.brNotSelected,
            ]}
            disabled={
              conference.conf_status !== Constants.CONF_STATUS_JOINED ||
              !props.uiData.phone ||
              props.uiData.phone.getPhoneStatus() !== 'started' ||
              panelSession
            }
            iconSource={icons.channelMosaic1}
            accessibilityLabel={uawMsgs.LBL_PANEL_HEADER_SCREEN_BUTTON_TOOLTIP}
            onPress={props.uiData.fire.bind(
              props.uiData,
              'panelHeaderScreenButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          />,
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
                ? styles.iconChevronUp
                : styles.iconChevronDown,
            ]}
            iconSource={
              this.state.historySummariesWithHeader
                ? icons.chevronUp
                : icons.chevronDown
            }
            accessibilityLabel={
              uawMsgs.LBL_PANEL_HEADER_SEARCH_DETAIL_BUTTON_TOOLTIP
            }
            onPress={this.handleHeaderSearchConditionsDetailButtonClick.bind(
              this,
            )}
          />

          <View style={styles.brHeaderSearchConditionsContentArea}>
            <TextBox
              ref='headerSearchConditionsContentInput'
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
              onKeyPress={this.handleHeaderSearchConditionsContentInputKeyDown.bind(
                this,
              )}
            />

            <ButtonIconic
              style={styles.brHeaderSearchConditionsSearchButton}
              iconSource={icons.search}
              accessibilityLabel={
                uawMsgs.LBL_PANEL_HEADER_SEARCH_BUTTON_TOOLTIP
              }
              onPress={this.handleHeaderSearchConditionsSearchButtonClick.bind(
                this,
              )}
            />
          </View>

          <View style={styles.brHeaderSearchConditionsUserArea}>
            <DropDownMenu
              uiData={props.uiData}
              style={styles.brHeaderSearchConditionsUserMenu}
              dialogStyle={styles.brHeaderSearchConditionsUserDialog}
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
                <Text>{uawMsgs.LBL_PANEL_HEADER_SEARCH_USER_ALL}</Text>
              </MenuItem>

              {Object.keys(groupTable)
                .sort(
                  (groupName1, groupName2) =>
                    (groupTable[groupName1].groupIndex >>> 0) -
                    (groupTable[groupName2].groupIndex >>> 0),
                )
                .map(groupName => (
                  <TouchableOpacity
                    key={groupName}
                    style={[
                      styles.brHeaderSearchConditionsUserGroup,
                      groupName && styles.brGroupName,
                    ]}
                    accessibilityLabel={groupName}
                    onPress={() =>
                      this.handleHeaderSearchConditionsUserGroupClick(groupName)
                    }
                  >
                    <Image
                      source={
                        this.state.headerSearchConditionsUserGroupOpen
                          .split(',')
                          .indexOf(groupName) !== -1
                          ? icons.chevronUp
                          : icons.chevronDown
                      }
                      style={styles.brHeaderSearchConditionsUserGroupIcon}
                    />
                    <Text style={styles.brHeaderSearchConditionsUserGroupName}>
                      {groupName}
                    </Text>
                    {groupTable[groupName].buddyNodes}
                  </TouchableOpacity>
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
            style={[
              styles.brPanelHeaderButton,
              styles.brChatButton,
              !isBuddy && styles.brDisabled,
              !props.uiData.currentSelectedTab.includes(
                props.panelType + '_' + props.panelCode,
              ) && styles.brNotSelected,
            ]}
            disabled={!isBuddy}
            accessibilityLabel={uawMsgs.LBL_PANEL_HEADER_CHAT_BUTTON_TOOLTIP}
            onPress={props.uiData.fire.bind(
              props.uiData,
              'panelHeaderChatButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          />,
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
            style={[
              styles.brPanelHeaderButton,
              styles.brHistoryButton,
              !props.uiData.currentSelectedTab.includes(
                props.panelType + '_' + props.panelCode,
              ) && styles.brNotSelected,
            ]}
            disabled={
              !(
                props.uiData.historyDetailWorkTable &&
                props.uiData.historyDetailWorkTable[props.panelCode] &&
                props.uiData.historyDetailWorkTable[props.panelCode]
                  .chatPanelCode
              )
            }
            accessibilityLabel={uawMsgs.LBL_PANEL_HEADER_HISTORY_BUTTON_TOOLTIP}
            onPress={props.uiData.fire.bind(
              props.uiData,
              'panelHeaderHistoryButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          />,
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
    return (
      <View
        style={[
          styles.brPanelArea,
          styles[panelTypeClassName],
          props.uiData.currentSelectedTab ===
            props.panelType + '_' + props.panelCode && styles.brSelected,
          this.state.headerButtonsCollapsible &&
            styles.brHeaderButtonsCollapsible,
          props.uiData.configurations.headerButtonsVisible &&
            styles.brHeaderButtonsVisible,
        ]}
      >
        <View style={styles.brPanelAreaInner}>{contents}</View>

        <View ref={this.panelHeaderAreaRef} style={styles.brPanelHeaderArea}>
          <View
            ref={this.panelHeaderTitleRef}
            style={[styles.brPanelHeaderTitle, !headerTitle && styles.brHidden]}
            accessibilityLabel={headerTitle}
          >
            <Text>{headerTitle}</Text>
          </View>

          <View
            ref={this.panelHeaderInfoRef}
            style={[styles.brPanelHeaderInfo, !headerInfo && styles.brHidden]}
            accessibilityLabel={headerInfo}
          >
            <Text>{headerInfo}</Text>
          </View>

          <View
            ref={this.panelHeaderMembersRef}
            style={[
              styles.brPanelHeaderMembers,
              !headerMembers.length && styles.brHidden,
            ]}
            accessibilityLabel={headerMembersTitle}
          >
            {headerMembers}
          </View>

          <View
            ref={this.panelHeaderButtonsAreaRef}
            style={styles.brPanelHeaderButtonsArea}
          >
            {headerButtons}
          </View>

          <ButtonIconic
            style={[
              styles.brPanelHeaderButtonsMenu,
              !headerButtons.length && styles.brHidden,
            ]}
            iconSource={icons.more}
            accessibilityLabel={uawMsgs.LBL_PANEL_HEADER_MORE_BUTTON_TOOLTIP}
            onPress={this.handlePanelHeaderButtonsMenuClick.bind(this)}
          >
            <View
              style={[
                styles.brPanelHeaderButtonsBalloonDialog,
                props.uiData.showingDialogVersion !==
                  this.state.showingDialogVersion && styles.brHidden,
              ]}
            >
              {headerButtons}
            </View>
          </ButtonIconic>

          <MenuBalloonDialog
            style={[styles.brReplyDialog, this.state.replyDialogStyle]}
            accessibilityLabel={uawMsgs.LBL_PANEL_HEADER_REPLY_BUTTON_TOOLTIP}
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
                accessibilityLabel={s.label}
                onPress={s.event}
              />
            ))}
          </MenuBalloonDialog>

          <View
            style={[
              styles.brPanelHeaderSimpleButtonsArea,
              props.uiData.configurations.panelHeader && styles.brVisible,
            ]}
          >
            {headerSimpleButtons}
          </View>

          <View
            ref='panelHeaderSearchConditions'
            style={[
              styles.brHeaderSearchConditions,
              !headerSearchConditions && styles.brHidden,
            ]}
            accessibilityLabel={
              uawMsgs.LBL_PANEL_HEADER_SEARCH_CONDITIONS_TOOLTIP
            }
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
  },

  brPanelHeaderArea: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5', // @platinum
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
  },

  brPanelHeaderTitle: {
    maxHeight: '100%',
    paddingLeft: 22,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 25.6, // 1.6 * 16
    letterSpacing: 0.3,
  },

  brPanelHeaderInfo: {
    maxHeight: '100%',
    paddingLeft: 26,
    fontSize: 9,
    fontWeight: '400',
    lineHeight: 14.4, // 1.6 * 9
    letterSpacing: 1.3,
    color: '#666666', // @dark_gray
  },

  brPreferenceHeaderInfo: {
    marginLeft: 16,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
    borderWidth: 1,
    borderColor: '#FF4526', // @portland_orange
    color: '#FF4526',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 20.8, // 1.6 * 13
    letterSpacing: 0.3,
  },

  brPanelHeaderMembers: {
    maxHeight: '100%',
    paddingLeft: 22,
    fontSize: 9,
    fontWeight: '400',
    lineHeight: 14.4, // 1.6 * 9
    letterSpacing: 1.3,
    color: '#666666', // @dark_gray
  },

  brConfStatus1: {
    color: '#E5E5E5', // @platinum
  },

  brPanelHeaderButtonsArea: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    height: 0,
    transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
    overflow: 'hidden',
  },

  brHeaderButtonsVisible: {
    height: 32,
  },

  brPanelHeaderButton: {
    marginHorizontal: 2,
    backgroundColor: '#82C341',
  },

  brNotSelected: {
    opacity: 0.5,
  },

  brDisabled: {
    backgroundColor: '#A0A0A0',
  },

  brKickButton: {
    backgroundColor: '#FF4526',
  },

  brPanelHeaderButtonsMenu: {
    position: 'absolute',
    right: 8,
    top: '50%',
    transform: [{ translateY: '-50%' }],
    display: 'none',
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
    shadowRadius: 4,
    shadowOpacity: 1,
    elevation: 4,
  },

  brPanelHeaderSimpleButtonsArea: {
    position: 'absolute',
    right: 2,
    top: '50%',
    height: 20,
    transform: [{ translateY: '-50%' }],
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
    transform: [{ translateY: '-50%' }],
    overflow: 'hidden',
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
    overflow: 'hidden',
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
    width: 16,
    height: 16,
    position: 'absolute',
    right: 4,
    top: 4,
  },

  brHeaderSearchConditionsUserGroupName: {
    position: 'absolute',
    left: 0,
    width: '100%',
    top: 0,
    height: 24,
    lineHeight: 24,
    overflow: 'hidden',
    fontSize: 9,
    fontWeight: '400',
    letterSpacing: 1.3,
    paddingLeft: 8,
    color: '#666666',
  },

  brPanelHeaderInviteDndable: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },

  brCanDrop: {},

  brIsOver: {
    borderWidth: 3,
    borderColor: '#48D1CC',
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

  brVisible: {
    display: 'flex',
  },
})
