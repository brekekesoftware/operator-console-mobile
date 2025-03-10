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
  }
  componentDidMount() {
    const props = this.props
    const headerSearchConditionsContentInput = ReactDOM.findDOMNode(
      this.refs['headerSearchConditionsContentInput'],
    )
    if (
      headerSearchConditionsContentInput &&
      headerSearchConditionsContentInput.focus
    ) {
      headerSearchConditionsContentInput.focus()
    }
  }
  componentDidUpdate() {
    const props = this.props
    const newState = {}
    const panelHeaderArea = ReactDOM.findDOMNode(this.refs['panelHeaderArea'])
    const panelHeaderTitle = ReactDOM.findDOMNode(this.refs['panelHeaderTitle'])
    const panelHeaderInfo = ReactDOM.findDOMNode(this.refs['panelHeaderInfo'])
    const panelHeaderMembers = ReactDOM.findDOMNode(
      this.refs['panelHeaderMembers'],
    )
    const panelHeaderButtonsArea = ReactDOM.findDOMNode(
      this.refs['panelHeaderButtonsArea'],
    )
    const widthOfArea = panelHeaderArea && int(panelHeaderArea.offsetWidth)
    if (typeof widthOfArea === 'number' && widthOfArea > 0) {
      const rightOfTexts =
        panelHeaderMembers && panelHeaderMembers.offsetWidth
          ? int(panelHeaderMembers.offsetLeft + panelHeaderMembers.offsetWidth)
          : panelHeaderInfo && panelHeaderInfo.offsetWidth
            ? int(panelHeaderInfo.offsetLeft + panelHeaderInfo.offsetWidth)
            : panelHeaderTitle && panelHeaderTitle.offsetWidth
              ? int(panelHeaderTitle.offsetLeft + panelHeaderTitle.offsetWidth)
              : null
      if (typeof rightOfTexts === 'number') {
        const leftOfButtons =
          panelHeaderButtonsArea &&
          (widthOfArea - int(panelHeaderButtonsArea.offsetWidth)) / 2
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
          newState.headerSearchConditionsWidth = widthOfArea - rightOfTexts
        }
      }
    }
    if (Object.keys(newState).length) {
      this.setState(newState)
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
      const panelHeaderArea = ReactDOM.findDOMNode(this.refs['panelHeaderArea'])
      const panelHeaderAreaRect =
        panelHeaderArea && panelHeaderArea.getBoundingClientRect()
      const replyWebchatButtonRect =
        ev && ev.target && ev.target.getBoundingClientRect()
      if (panelHeaderAreaRect && replyWebchatButtonRect) {
        replyDialogStyle.left =
          replyWebchatButtonRect.left - panelHeaderAreaRect.left + 'px'
        replyDialogStyle.top =
          replyWebchatButtonRect.bottom - panelHeaderAreaRect.top + 'px'
      }
      this.setState({
        showingDialogVersion: props.uiData.showingDialogVersion,
        showingReplyDialogVersion: props.uiData.showingDialogVersion,
        replyDialogStyle: replyDialogStyle,
      })
      ev.stopPropagation()
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
            <span
              key={i}
              className={
                'brConfStatus' +
                (
                  conference.user.find(
                    u =>
                      u.tenant === member.tenant &&
                      u.user_id === member.user_id,
                  ) || {}
                ).conf_status
              }
            >
              {props.uiData.ucUiStore.getBuddyUserForUi(member).name + '\n'}
            </span>
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
            className='brPanelHeaderButton brLeaveButton'
            disabled={
              conference.conf_status !==
              Constants.CONF_STATUS_JOINED /* || conference.conf_type === 'webchat' && conference.user.filter(u => u.conf_status === Constants.CONF_STATUS_JOINED).length < 3 */
            }
            title={uawMsgs.LBL_PANEL_HEADER_LEAVE_BUTTON_TOOLTIP}
            onClick={props.uiData.fire.bind(
              props.uiData,
              'panelHeaderLeaveButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          >
            <span className='brPanelHeaderButtonIcon br_bi_icon_log_out_svg'></span>
          </ButtonIconic>,
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
              className='brPanelHeaderButton brReplyWebchatButton'
              disabled={!replyOptions.length}
              title={uawMsgs.LBL_PANEL_HEADER_REPLY_BUTTON_TOOLTIP}
              onClick={
                replyOptions.length === 1
                  ? replyOptions[0].event
                  : this.handleReplyWebchatButtonClick.bind(this)
              }
            >
              <span className='brPanelHeaderButtonIcon br_bi_icon_reply_svg'></span>
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
            className='brPanelHeaderButton brInviteButton'
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
            onClick={props.uiData.fire.bind(
              props.uiData,
              'panelHeaderInviteButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          >
            <span className='brPanelHeaderButtonIcon br_bi_icon_envelope_svg'></span>
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
              className='brPanelHeaderButton brFileButton'
              disabled={
                conference.conf_status !== Constants.CONF_STATUS_JOINED ||
                joinedCount < 2
              }
              title={uawMsgs.LBL_PANEL_HEADER_FILE_BUTTON_TOOLTIP}
              onClick={props.uiData.fire.bind(
                props.uiData,
                'panelHeaderFileButton_onClick',
                props.panelType,
                props.panelCode,
              )}
            >
              <span className='brPanelHeaderButtonIcon br_bi_icon_upload_svg'></span>
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
            className='brPanelHeaderButton brVoiceButton'
            disabled={
              conference.conf_status !== Constants.CONF_STATUS_JOINED ||
              !props.uiData.phone ||
              props.uiData.phone.getPhoneStatus() !== 'started' ||
              panelSession
            }
            title={uawMsgs.LBL_PANEL_HEADER_VOICE_BUTTON_TOOLTIP}
            onClick={props.uiData.fire.bind(
              props.uiData,
              'panelHeaderVoiceButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          >
            <span className='brPanelHeaderButtonIcon br_bi_icon_phone_svg'></span>
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
            className='brPanelHeaderButton brVideoButton'
            disabled={
              conference.conf_status !== Constants.CONF_STATUS_JOINED ||
              !props.uiData.phone ||
              props.uiData.phone.getPhoneStatus() !== 'started' ||
              panelSession
            }
            title={uawMsgs.LBL_PANEL_HEADER_VIDEO_BUTTON_TOOLTIP}
            onClick={props.uiData.fire.bind(
              props.uiData,
              'panelHeaderVideoButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          >
            <span className='brPanelHeaderButtonIcon br_bi_icon_video_call_svg'></span>
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
            className='brPanelHeaderButton brScreenButton'
            disabled={
              conference.conf_status !== Constants.CONF_STATUS_JOINED ||
              !props.uiData.phone ||
              props.uiData.phone.getPhoneStatus() !== 'started' ||
              panelSession
            }
            title={uawMsgs.LBL_PANEL_HEADER_SCREEN_BUTTON_TOOLTIP}
            onClick={props.uiData.fire.bind(
              props.uiData,
              'panelHeaderScreenButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          >
            <span className='brPanelHeaderButtonIcon br_bi_icon_channel_mosaic_1_svg'></span>
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
              className='brPanelHeaderButton brFileButton'
              title={uawMsgs.LBL_PANEL_HEADER_FILE_BUTTON_TOOLTIP}
              onClick={props.uiData.fire.bind(
                props.uiData,
                'panelHeaderFileButton_onClick',
                props.panelType,
                props.panelCode,
              )}
            >
              <span className='brPanelHeaderButtonIcon br_bi_icon_upload_svg'></span>
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
            className='brPanelHeaderButton brVoiceButton'
            disabled={
              !props.uiData.phone ||
              props.uiData.phone.getPhoneStatus() !== 'started' ||
              panelSession
            }
            title={uawMsgs.LBL_PANEL_HEADER_VOICE_BUTTON_TOOLTIP}
            onClick={props.uiData.fire.bind(
              props.uiData,
              'panelHeaderVoiceButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          >
            <span className='brPanelHeaderButtonIcon br_bi_icon_phone_svg'></span>
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
            className='brPanelHeaderButton brVideoButton'
            disabled={
              !props.uiData.phone ||
              props.uiData.phone.getPhoneStatus() !== 'started' ||
              panelSession
            }
            title={uawMsgs.LBL_PANEL_HEADER_VIDEO_BUTTON_TOOLTIP}
            onClick={props.uiData.fire.bind(
              props.uiData,
              'panelHeaderVideoButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          >
            <span className='brPanelHeaderButtonIcon br_bi_icon_video_call_svg'></span>
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
            className='brPanelHeaderButton brScreenButton'
            disabled={
              !props.uiData.phone ||
              props.uiData.phone.getPhoneStatus() !== 'started' ||
              panelSession
            }
            title={uawMsgs.LBL_PANEL_HEADER_SCREEN_BUTTON_TOOLTIP}
            onClick={props.uiData.fire.bind(
              props.uiData,
              'panelHeaderScreenButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          >
            <span className='brPanelHeaderButtonIcon br_bi_icon_channel_mosaic_1_svg'></span>
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
            className='brPanelHeaderButton brHistoryButton'
            title={uawMsgs.LBL_PANEL_HEADER_HISTORY_BUTTON_TOOLTIP}
            onClick={props.uiData.fire.bind(
              props.uiData,
              'panelHeaderHistoryButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          >
            <span className='brPanelHeaderButtonIcon br_bi_icon_history_svg'></span>
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
            className='brPanelHeaderButton brVoiceButton'
            disabled={
              !props.uiData.phone ||
              props.uiData.phone.getPhoneStatus() !== 'started' ||
              panelSession
            }
            title={uawMsgs.LBL_PANEL_HEADER_VOICE_BUTTON_TOOLTIP}
            onClick={props.uiData.fire.bind(
              props.uiData,
              'panelHeaderVoiceButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          >
            <span className='brPanelHeaderButtonIcon br_bi_icon_phone_svg'></span>
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
            className='brPanelHeaderButton brVideoButton'
            disabled={
              !props.uiData.phone ||
              props.uiData.phone.getPhoneStatus() !== 'started' ||
              panelSession
            }
            title={uawMsgs.LBL_PANEL_HEADER_VIDEO_BUTTON_TOOLTIP}
            onClick={props.uiData.fire.bind(
              props.uiData,
              'panelHeaderVideoButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          >
            <span className='brPanelHeaderButtonIcon br_bi_icon_video_call_svg'></span>
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
            className='brPanelHeaderButton brScreenButton'
            disabled={
              !props.uiData.phone ||
              props.uiData.phone.getPhoneStatus() !== 'started' ||
              panelSession
            }
            title={uawMsgs.LBL_PANEL_HEADER_SCREEN_BUTTON_TOOLTIP}
            onClick={props.uiData.fire.bind(
              props.uiData,
              'panelHeaderScreenButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          >
            <span className='brPanelHeaderButtonIcon br_bi_icon_channel_mosaic_1_svg'></span>
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
              className='brHeaderSearchConditionsUserItem'
              dropDown={true}
              onClick={this.handleHeaderSearchConditionsUserItemClick.bind(
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
        <div>
          <ButtonIconic
            className={
              'brHeaderSearchConditionsDetailButton' +
              (this.state.historySummariesWithHeader
                ? ' br_bi_icon_chevron_up_svg'
                : ' br_bi_icon_chevron_down_svg')
            }
            title={uawMsgs.LBL_PANEL_HEADER_SEARCH_DETAIL_BUTTON_TOOLTIP}
            onClick={this.handleHeaderSearchConditionsDetailButtonClick.bind(
              this,
            )}
          />
          <div className='brHeaderSearchConditionsContentArea'>
            <TextBox
              ref='headerSearchConditionsContentInput'
              className='brHeaderSearchConditionsContentInput'
              value={
                this.state.headerSearchConditionsContentCache === null
                  ? string(conditions._any.conditionValue)
                  : this.state.headerSearchConditionsContentCache
              }
              placeholder={uawMsgs.LBL_PANEL_HEADER_SEARCH_INPUT_PLACEHOLDER}
              onChange={this.handleHeaderSearchConditionsContentInputChange.bind(
                this,
              )}
              onBlur={this.handleHeaderSearchConditionsContentInputBlur.bind(
                this,
              )}
              onKeyDown={this.handleHeaderSearchConditionsContentInputKeyDown.bind(
                this,
              )}
            />
            <ButtonIconic
              className='brHeaderSearchConditionsSearchButton br_bi_icon_search_svg'
              title={uawMsgs.LBL_PANEL_HEADER_SEARCH_BUTTON_TOOLTIP}
              onClick={this.handleHeaderSearchConditionsSearchButtonClick.bind(
                this,
              )}
            />
          </div>
          <div className='brHeaderSearchConditionsUserArea'>
            <DropDownMenu
              uiData={props.uiData}
              className='brHeaderSearchConditionsUserMenu'
              dialogClassName='brPanelAreaDialog brHeaderSearchConditionsUserDialog'
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
                className='brHeaderSearchConditionsUserItem'
                dropDown={true}
                onClick={this.handleHeaderSearchConditionsUserAllClick.bind(
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
                  <div
                    key={groupName}
                    className={
                      'brHeaderSearchConditionsUserGroup' +
                      (groupName ? ' brGroupName' : '')
                    }
                    title={groupName}
                    onClick={this.handleHeaderSearchConditionsUserGroupClick.bind(
                      this,
                      groupName,
                    )}
                  >
                    <div
                      className={
                        'brHeaderSearchConditionsUserGroupIcon' +
                        (this.state.headerSearchConditionsUserGroupOpen
                          .split(',')
                          .indexOf(groupName) !== -1
                          ? ' br_bi_icon_chevron_up_svg'
                          : ' br_bi_icon_chevron_down_svg')
                      }
                    />
                    <div className='brHeaderSearchConditionsUserGroupName'>
                      {groupName}
                    </div>
                    {groupTable[groupName].buddyNodes}
                  </div>
                ))}
            </DropDownMenu>
          </div>
        </div>
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
            className='brPanelHeaderButton brChatButton'
            disabled={!isBuddy}
            title={uawMsgs.LBL_PANEL_HEADER_CHAT_BUTTON_TOOLTIP}
            onClick={props.uiData.fire.bind(
              props.uiData,
              'panelHeaderChatButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          >
            <span className='brPanelHeaderButtonIcon br_bi_icon_chat_svg'></span>
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
            className='brPanelHeaderButton brHistoryButton'
            disabled={
              !(
                props.uiData.historyDetailWorkTable &&
                props.uiData.historyDetailWorkTable[props.panelCode] &&
                props.uiData.historyDetailWorkTable[props.panelCode]
                  .chatPanelCode
              )
            }
            title={uawMsgs.LBL_PANEL_HEADER_HISTORY_BUTTON_TOOLTIP}
            onClick={props.uiData.fire.bind(
              props.uiData,
              'panelHeaderHistoryButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          >
            <span className='brPanelHeaderButtonIcon br_bi_icon_history_svg'></span>
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
    return (
      <div
        className={
          'brPanelArea ' +
          panelTypeClassName +
          (props.uiData.currentSelectedTab ===
          props.panelType + '_' + props.panelCode
            ? ' brSelected'
            : '') +
          (this.state.headerButtonsCollapsible
            ? ' brHeaderButtonsCollapsible'
            : '') +
          (props.uiData.configurations.headerButtonsVisible
            ? ' brHeaderButtonsVisible'
            : '')
        }
      >
        <div className='brPanelAreaInner'>{contents}</div>
        <div ref='panelHeaderArea' className='brPanelHeaderArea'>
          <div
            ref='panelHeaderTitle'
            className={'brPanelHeaderTitle' + (headerTitle ? '' : ' brHidden')}
            title={headerTitle}
          >
            {headerTitle}
          </div>
          <div
            ref='panelHeaderInfo'
            className={'brPanelHeaderInfo' + (headerInfo ? '' : ' brHidden')}
            title={headerInfo}
          >
            {headerInfo}
          </div>
          <div
            ref='panelHeaderMembers'
            className={
              'brPanelHeaderMembers' + (headerMembers.length ? '' : ' brHidden')
            }
            title={headerMembersTitle}
          >
            {headerMembers}
          </div>
          <div
            ref='panelHeaderButtonsArea'
            className='brPanelHeaderButtonsArea'
          >
            {headerButtons}
          </div>
          <ButtonIconic
            className={
              'brPanelHeaderButtonsMenu br_bi_icon_more_svg' +
              (headerButtons.length ? '' : ' brHidden')
            }
            onClick={this.handlePanelHeaderButtonsMenuClick.bind(this)}
          >
            <div
              className={
                'brPanelHeaderButtonsBalloonDialog' +
                (props.uiData.showingDialogVersion ===
                this.state.showingDialogVersion
                  ? ''
                  : ' brHidden')
              }
            >
              {headerButtons}
            </div>
          </ButtonIconic>
          <MenuBalloonDialog
            className='brReplyWebchatBalloonDialog'
            showing={
              props.uiData.showingDialogVersion ===
                this.state.showingDialogVersion &&
              props.uiData.showingDialogVersion ===
                this.state.showingReplyDialogVersion
            }
            style={this.state.replyDialogStyle}
          >
            {replyOptions.map((s, i) => (
              <MenuItem
                key={i}
                className={'brReplyWebchatMenuItem ' + s.className}
                onClick={s.event}
              >
                {s.label}
              </MenuItem>
            ))}
          </MenuBalloonDialog>
          <div
            className={
              'brPanelHeaderSimpleButtonsArea' +
              (props.uiData.configurations.panelHeader ? ' brVisible' : '')
            }
          >
            {headerSimpleButtons}
          </div>
          <div
            ref='panelHeaderSearchConditions'
            className={
              'brHeaderSearchConditions' +
              (headerSearchConditions ? '' : ' brHidden')
            }
            style={{ width: this.state.headerSearchConditionsWidth + 'px' }}
          >
            {headerSearchConditions}
          </div>
          <DndableSafe
            uiData={props.uiData}
            className='brPanelHeaderInviteDndable'
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
        </div>
      </div>
    )
  }
}
