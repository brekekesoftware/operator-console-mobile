import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ReactDOM from 'react-dom'
import Draggable from 'react-draggable'
import ButtonIconic from './ButtonIconic.js'
import MenuBalloonDialog from './MenuBalloonDialog.js'
import MenuItem from './MenuItem.js'
import TextBox from './TextBox.js'

/**
 * EditorArea
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.phone
 * props.uiData.panelSessionTable
 * props.uiData.configurations
 * props.uiData.showingDialogVersion
 * props.uiData.showingDialog_update
 * props.uiData.currentSelectedTab
 * props.uiData.selectedButNotFocusedTab
 * props.uiData.editorTextarea_onKeyDown
 * props.uiData.editorSendButton_onClick
 * props.uiData.panelHeaderLeaveButton_onClick
 * props.uiData.panelHeaderInviteButton_onClick
 * props.uiData.panelHeaderFileButton_onClick
 * props.uiData.panelHeaderVoiceButton_onClick
 * props.uiData.panelHeaderVideoButton_onClick
 * props.uiData.panelHeaderScreenButton_onClick
 * props.uiData.panelHeaderContinuationMenuItem_onClick
 * props.panelType
 * props.panelCode
 * props.disabled
 * props.hidden
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.currentEditorType = ''
    this.hidden = false
    this.state = {
      showingDialogVersion: null,
      showingReplyDialogVersion: null,
      replyDialogStyle: {},
      selectedEditorType: '',
      showingChangeEditorTypeDialogVersion: null,
      changeEditorTypeDialogStyle: {},
      splitterHeight: 10000,
    }
  }
  componentDidMount() {
    const props = this.props
    const editorTextarea = ReactDOM.findDOMNode(this.refs['editorTextarea'])
    if (editorTextarea && !editorTextarea.disabled) {
      editorTextarea.focus()
      if (
        props.uiData.selectedButNotFocusedTab ===
        props.panelType + '_' + props.panelCode
      ) {
        props.uiData.selectedButNotFocusedTab = ''
      }
    }
  }
  componentDidUpdate() {
    const props = this.props
    const isEmail = this.currentEditorType === 'Email'
    if (
      props.uiData.selectedButNotFocusedTab ===
      props.panelType + '_' + props.panelCode
    ) {
      const editorTextarea = ReactDOM.findDOMNode(this.refs['editorTextarea'])
      if (editorTextarea && !editorTextarea.disabled) {
        editorTextarea.focus()
        props.uiData.selectedButNotFocusedTab = ''
      }
    }
    const editorArea = ReactDOM.findDOMNode(this)
    if (
      editorArea &&
      editorArea.style &&
      editorArea.parentNode &&
      editorArea.parentNode.clientHeight
    ) {
      const parentHeight = int(editorArea.parentNode.clientHeight)
      const editorHeight = int(editorArea.offsetHeight)
      const chatArea = editorArea.parentNode.querySelector('.brChatArea')
      const chatAreaScrollToBottomButton = editorArea.parentNode.querySelector(
        '.brChatAreaScrollToBottomButton ',
      )
      if (this.hidden) {
        if (chatArea && chatArea.style) {
          chatArea.style.bottom = 0 + 'px'
        }
        if (
          chatAreaScrollToBottomButton &&
          chatAreaScrollToBottomButton.style
        ) {
          chatAreaScrollToBottomButton.style.bottom = 26 + 'px'
        }
      } else if (isEmail && editorArea.offsetHeight) {
        if (parentHeight < editorHeight && this.state.splitterHeight) {
          this.setState({ splitterHeight: 0 })
          return
        }
        if (chatArea && chatArea.style) {
          chatArea.style.bottom = editorHeight + 'px'
        }
        if (
          chatAreaScrollToBottomButton &&
          chatAreaScrollToBottomButton.style
        ) {
          chatAreaScrollToBottomButton.style.bottom = editorHeight + 26 + 'px'
        }
      }
      if (isEmail) {
        if (
          editorArea.parentNode.className &&
          string(editorArea.parentNode.className).indexOf('brHideSysmsg') === -1
        ) {
          editorArea.parentNode.className += ' brHideSysmsg'
        }
      }
    }
  }
  handleSplitterHeightDrag(ev, ui) {
    const props = this.props
    const isEmail = this.currentEditorType === 'Email'
    let splitterHeight =
      this.state.splitterHeight === 10000 && isEmail
        ? int(
            props.uiData.ucUiStore.getLocalStoragePreference({
              keyList: ['emailSplitterHeight'],
            })[0],
          )
        : this.state.splitterHeight
    splitterHeight = Math.min(0, splitterHeight)
    splitterHeight += ui.deltaY
    const editorArea = ReactDOM.findDOMNode(this)
    if (
      editorArea &&
      editorArea.parentNode &&
      editorArea.parentNode.clientHeight
    ) {
      splitterHeight = Math.max(
        70 - int(editorArea.parentNode.clientHeight),
        splitterHeight,
      )
    }
    splitterHeight = Math.min(0, splitterHeight)
    this.setState({ splitterHeight: splitterHeight })
  }
  handleSplitterHeightStop() {
    const props = this.props
    props.uiData.ucUiAction.setLocalStoragePreference({
      keyValueList: [
        {
          key: 'emailSplitterHeight',
          value: string(this.state.splitterHeight),
        },
      ],
    })
  }
  handleSendButtonClick(ev) {
    const props = this.props
    const editorTextarea = ReactDOM.findDOMNode(this.refs['editorTextarea'])
    const isEmail = this.currentEditorType === 'Email'
    props.uiData.fire(
      'editorSendButton_onClick',
      props.panelType,
      props.panelCode,
      editorTextarea,
      ReactDOM.findDOMNode(this.refs['subjectTextBox']),
      isEmail,
      ev,
    )
  }
  handleOptionsLinkClick(ev) {
    const props = this.props
    if (props.uiData.showingDialogVersion !== this.state.showingDialogVersion) {
      this.setState({
        showingDialogVersion: ++props.uiData.showingDialogVersion,
      })
      ev.stopPropagation()
      props.uiData.fire('showingDialog_update')
    }
  }
  handleReplyWebchatMenuClick(ev) {
    const props = this.props
    if (
      props.uiData.showingDialogVersion !== this.state.showingDialogVersion ||
      props.uiData.showingDialogVersion !== this.state.showingReplyDialogVersion
    ) {
      props.uiData.showingDialogVersion++
      const replyDialogStyle = {}
      const editorArea = ReactDOM.findDOMNode(this)
      const editorAreaRect = editorArea && editorArea.getBoundingClientRect()
      const editorOptionsBalloon = ReactDOM.findDOMNode(
        this.refs['editorOptionsBalloon'],
      )
      const editorOptionsBalloonRect =
        editorOptionsBalloon && editorOptionsBalloon.getBoundingClientRect()
      const replyWebchatMenuRect =
        ev && ev.target && ev.target.getBoundingClientRect()
      if (editorAreaRect && replyWebchatMenuRect) {
        replyDialogStyle.left =
          (editorOptionsBalloonRect || replyWebchatMenuRect).right -
          editorAreaRect.left +
          'px'
        replyDialogStyle.top =
          replyWebchatMenuRect.top - editorAreaRect.top + 'px'
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
  handleChangeEditorTypeMenuClick(ev) {
    const props = this.props
    if (
      props.uiData.showingDialogVersion !== this.state.showingDialogVersion ||
      props.uiData.showingDialogVersion !==
        this.state.showingChangeEditorTypeDialogVersion
    ) {
      props.uiData.showingDialogVersion++
      const changeEditorTypeDialogStyle = {}
      const editorArea = ReactDOM.findDOMNode(this)
      const editorAreaRect = editorArea && editorArea.getBoundingClientRect()
      const editorOptionsBalloon = ReactDOM.findDOMNode(
        this.refs['editorOptionsBalloon'],
      )
      const editorOptionsBalloonRect =
        editorOptionsBalloon && editorOptionsBalloon.getBoundingClientRect()
      const changeEditorTypeMenuRect =
        ev && ev.target && ev.target.getBoundingClientRect()
      if (editorAreaRect && changeEditorTypeMenuRect) {
        changeEditorTypeDialogStyle.position = 'absolute'
        changeEditorTypeDialogStyle.left =
          (editorOptionsBalloonRect || changeEditorTypeMenuRect).right -
          editorAreaRect.left +
          'px'
        changeEditorTypeDialogStyle.bottom =
          editorAreaRect.bottom - changeEditorTypeMenuRect.bottom + 'px'
      }
      this.setState({
        showingDialogVersion: props.uiData.showingDialogVersion,
        showingChangeEditorTypeDialogVersion: props.uiData.showingDialogVersion,
        changeEditorTypeDialogStyle: changeEditorTypeDialogStyle,
      })
      ev.stopPropagation()
      props.uiData.fire('showingDialog_update')
    }
  }
  render() {
    const props = this.props
    const profile = props.uiData.ucUiStore.getChatClient().getProfile()
    const configProperties = props.uiData.ucUiStore.getConfigProperties()
    const myUcCimUserType = int(props.uiData.ucUiStore.getUcCimUserType())
    const chatHeaderInfo =
      props.uiData.ucUiStore.getChatHeaderInfo({
        chatType: props.panelType,
        chatCode: props.panelCode,
      }) || {}
    const editorTypes = string(
      chatHeaderInfo.editorTypes ||
        props.uiData.ucUiStore.getOptionalSetting({ key: ['editor_types'] }) ||
        '_',
    ).split(',')
    const initialEditorType = string(
      chatHeaderInfo.initialEditorType ||
        props.uiData.ucUiStore.getOptionalSetting({
          key: ['initial_editor_type'],
        }) ||
        '',
    )
    this.currentEditorType =
      this.state.selectedEditorType ||
      this.currentEditorType ||
      editorTypes.find(t => t === initialEditorType) ||
      editorTypes[0]
    const isEmail = this.currentEditorType === 'Email'
    const panelSession =
      props.uiData.panelSessionTable &&
      props.uiData.panelSessionTable[props.panelType + '_' + props.panelCode]
    const session =
      panelSession &&
      panelSession.sessionId &&
      props.uiData.phone &&
      props.uiData.phone.getSession(panelSession.sessionId)
    let className = 'brEditorArea brEditorType' + this.currentEditorType
    let splitterHeight =
      this.state.splitterHeight === 10000 && isEmail
        ? int(
            props.uiData.ucUiStore.getLocalStoragePreference({
              keyList: ['emailSplitterHeight'],
            })[0],
          )
        : this.state.splitterHeight
    let disabled = props.disabled
    this.hidden = props.hidden
    let menuOptions = []
    const replyOptions = []
    if (
      props.uiData.currentSelectedTab ===
      props.panelType + '_' + props.panelCode
    ) {
      className += ' brSelected'
    }
    if (
      (props.uiData.configurations && props.uiData.configurations.sendButton) ||
      isEmail
    ) {
      className += ' brWithSendButton'
    }
    if (
      props.uiData.configurations &&
      props.uiData.configurations.withMenuOptions
    ) {
      className += ' brWithMenuOptions'
    }
    if (isEmail && chatHeaderInfo.lastConfType === 'emptylast') {
      className += ' brMaximized'
    }
    if (props.panelType === 'CONFERENCE') {
      const conf_id = string(chatHeaderInfo.conf_id)
      const conference = props.uiData.ucUiStore
        .getChatClient()
        .getConference(conf_id)
      const joinedCount = conference.user.filter(
        u => u.conf_status === Constants.CONF_STATUS_JOINED,
      ).length
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
          label: uawMsgs.LBL_EDITOR_REPLY_MANUAL_CONTINUATION_MENU,
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
      const mustDisable = !(
        (conference.conf_status === Constants.CONF_STATUS_JOINED &&
          joinedCount >= 2) ||
        chatHeaderInfo.nextDistributionTarget === profile.user_id
      )
      if (mustDisable) {
        disabled = true
      }
      if (isEmail && (!chatHeaderInfo.lastConfType || mustDisable)) {
        this.hidden = true
      }
      menuOptions = [
        {
          headerButtonName: 'leave',
          label: uawMsgs.LBL_EDITOR_LEAVE_LINK,
          iconClass: 'br_bi_icon_log_out_svg',
          eventName: 'panelHeaderLeaveButton_onClick',
          enabled: conference.conf_status === Constants.CONF_STATUS_JOINED,
        },
        {
          headerButtonName: 'invite',
          label: uawMsgs.LBL_EDITOR_INVITE_LINK,
          iconClass: 'br_bi_icon_envelope_svg',
          eventName: 'panelHeaderInviteButton_onClick',
          enabled:
            conference.conf_status === Constants.CONF_STATUS_JOINED &&
            (chatHeaderInfo.confType !== 'webchat' ||
              (-int(
                (conference.webchatinfo &&
                  string(conference.webchatinfo.invite_button_type)) ||
                  '-98',
              ) &
                myUcCimUserType) ===
                myUcCimUserType),
        },
        {
          headerButtonName: 'file',
          label: uawMsgs.LBL_EDITOR_FILE_LINK,
          iconClass: 'br_bi_icon_upload_svg',
          eventName: 'panelHeaderFileButton_onClick',
          enabled:
            conference.conf_status === Constants.CONF_STATUS_JOINED &&
            joinedCount >= 2,
        },
        {
          headerButtonName: 'voice',
          label: uawMsgs.LBL_EDITOR_VOICE_LINK,
          iconClass: 'br_bi_icon_phone_svg',
          eventName: 'panelHeaderVoiceButton_onClick',
          enabled:
            conference.conf_status === Constants.CONF_STATUS_JOINED &&
            props.uiData.phone &&
            props.uiData.phone.getPhoneStatus() === 'started' &&
            !panelSession,
        },
        {
          headerButtonName: 'video',
          label: uawMsgs.LBL_EDITOR_VIDEO_LINK,
          iconClass: 'br_bi_icon_video_call_svg',
          eventName: 'panelHeaderVideoButton_onClick',
          enabled:
            conference.conf_status === Constants.CONF_STATUS_JOINED &&
            props.uiData.phone &&
            props.uiData.phone.getPhoneStatus() === 'started' &&
            !panelSession,
        },
        {
          headerButtonName: 'screen',
          label: uawMsgs.LBL_EDITOR_SCREEN_LINK,
          iconClass: 'br_bi_icon_channel_mosaic_1_svg',
          eventName: 'panelHeaderScreenButton_onClick',
          enabled:
            conference.conf_status === Constants.CONF_STATUS_JOINED &&
            props.uiData.phone &&
            props.uiData.phone.getPhoneStatus() === 'started' &&
            !panelSession,
        },
      ]
      if (chatHeaderInfo.confType === 'webchat') {
        menuOptions.splice(
          1,
          0,
          //{ headerButtonName: 'kick', label: uawMsgs.LBL_EDITOR_KICK_LINK, iconClass: 'br_bi_icon_close_svg', eventName: 'panelHeaderKickButton_onClick', enabled: props.uiData.ucUiStore.getWebchatQueue({ conf_id: conf_id }).isTalking },
          {
            headerButtonName: 'reply',
            label: uawMsgs.LBL_EDITOR_REPLY_LINK,
            iconClass: 'br_bi_icon_reply_svg',
            event:
              replyOptions.length === 1
                ? replyOptions[0].event
                : this.handleReplyWebchatMenuClick.bind(this),
            enabled: replyOptions.length,
          },
        )
        //menuOptions[0].enabled = conference.conf_status === Constants.CONF_STATUS_JOINED && conference.user.filter(u => u.conf_status === Constants.CONF_STATUS_JOINED).length >= 3;
      }
      if (
        isEmail &&
        !chatHeaderInfo.originalWebchatId &&
        props.uiData.ucUiStore
          .getChatClient()
          .getConferenceTag({ conf_id: conf_id, tag_key: '_outgoing_email_id' })
      ) {
        // TODO: yano temporary implementation
        className += ' brWithSubjectTextBox'
      }
    } else if (props.panelType === 'CHAT') {
      menuOptions = [
        {
          headerButtonName: 'file',
          label: uawMsgs.LBL_EDITOR_FILE_LINK,
          iconClass: 'br_bi_icon_upload_svg',
          eventName: 'panelHeaderFileButton_onClick',
          enabled: true,
        },
        {
          headerButtonName: 'voice',
          label: uawMsgs.LBL_EDITOR_VOICE_LINK,
          iconClass: 'br_bi_icon_phone_svg',
          eventName: 'panelHeaderVoiceButton_onClick',
          enabled:
            props.uiData.phone &&
            props.uiData.phone.getPhoneStatus() === 'started' &&
            !panelSession,
        },
        {
          headerButtonName: 'video',
          label: uawMsgs.LBL_EDITOR_VIDEO_LINK,
          iconClass: 'br_bi_icon_video_call_svg',
          eventName: 'panelHeaderVideoButton_onClick',
          enabled:
            props.uiData.phone &&
            props.uiData.phone.getPhoneStatus() === 'started' &&
            !panelSession,
        },
        {
          headerButtonName: 'screen',
          label: uawMsgs.LBL_EDITOR_SCREEN_LINK,
          iconClass: 'br_bi_icon_channel_mosaic_1_svg',
          eventName: 'panelHeaderScreenButton_onClick',
          enabled:
            props.uiData.phone &&
            props.uiData.phone.getPhoneStatus() === 'started' &&
            !panelSession,
        },
        {
          headerButtonName: 'history',
          label: uawMsgs.LBL_EDITOR_HISTORY_LINK,
          iconClass: 'br_bi_icon_history_svg',
          eventName: 'panelHeaderHistoryButton_onClick',
          enabled: true,
        },
      ]
    } else if (props.panelType === 'EXTERNALCALL') {
      this.hidden = true
    }
    if (this.hidden) {
      className += ' brHidden'
    }
    if (disabled) {
      className += ' brDisabled'
    }
    if (editorTypes.length >= 2) {
      menuOptions.push({
        label: 'Change editor',
        iconClass: 'br_bi_icon_edit_svg',
        event: this.handleChangeEditorTypeMenuClick.bind(this),
        enabled: true,
      }) // TODO: yano language
    }
    if (props.uiData.configurations.headerButtons) {
      menuOptions = menuOptions.filter(
        s =>
          !s.headerButtonName ||
          props.uiData.configurations.headerButtons.indexOf(
            s.headerButtonName,
          ) !== -1,
      )
    }
    if (
      (int(props.uiData.ucUiStore.getOptionalSetting({ key: 'fsp' })) &
        myUcCimUserType) ===
      myUcCimUserType
    ) {
      menuOptions = menuOptions.filter(s => s.headerButtonName !== 'file')
    }
    if (menuOptions.length) {
      className += ' brMenuOptionsLength'
    }
    return (
      <div
        className={className}
        style={
          isEmail && chatHeaderInfo.lastConfType === 'webchat'
            ? { height: 70 - Math.min(0, splitterHeight) + 'px' }
            : {}
        }
      >
        <TextBox
          ref='subjectTextBox'
          className='brSubjectTextBox'
          placeholder={uawMsgs.LBL_EDITOR_SUBJECT_PLACEHOLDER}
          disabled={disabled}
        ></TextBox>
        <div className='brEditorTextareaContainer'>
          <textarea
            ref='editorTextarea'
            className='brEditorTextarea'
            placeholder={
              disabled || isEmail ? '' : uawMsgs.LBL_EDITOR_TEXTAREA_PLACEHOLDER
            }
            onKeyDown={props.uiData.fire.bind(
              props.uiData,
              'editorTextarea_onKeyDown',
              props.panelType,
              props.panelCode,
              disabled,
              isEmail,
            )}
          />
        </div>
        <Draggable
          axis='y'
          position={{ x: 0, y: Math.min(0, splitterHeight) }}
          onDrag={this.handleSplitterHeightDrag.bind(this)}
          onStop={this.handleSplitterHeightStop.bind(this)}
        >
          <div
            className={
              'brSplitterHeight' +
              (isEmail && chatHeaderInfo.lastConfType === 'webchat'
                ? ''
                : ' brHidden')
            }
          ></div>
        </Draggable>
        <ButtonIconic
          className={
            'brEditorSendButton' +
            (isEmail ? ' br_bi_icon_send_svg' : ' br_bi_icon_chat_svg')
          }
          title={uawMsgs.LBL_EDITOR_SEND_BUTTON_TOOLTIP}
          disabled={disabled}
          onClick={this.handleSendButtonClick.bind(this)}
        ></ButtonIconic>
        <button
          className='brEditorOptionsButton'
          title={uawMsgs.LBL_EDITOR_OPTIONS_LINK}
          onClick={this.handleOptionsLinkClick.bind(this)}
        >
          <span
            className={
              'brEditorOptionsIcon' +
              (props.uiData.showingDialogVersion ===
              this.state.showingDialogVersion
                ? ' br_bi_icon_triangle_up_svg'
                : ' br_bi_icon_triangle_down_svg')
            }
          ></span>
        </button>
        <MenuBalloonDialog
          ref='editorOptionsBalloon'
          showing={
            props.uiData.showingDialogVersion ===
            this.state.showingDialogVersion
          }
          className='brEditorOptionsBalloon'
        >
          {menuOptions.map((s, i) => (
            <MenuItem
              key={i}
              className={'brEditorOptionsItem ' + s.iconClass}
              disabled={!s.enabled}
              onClick={
                s.event ||
                props.uiData.fire.bind(
                  props.uiData,
                  s.eventName,
                  props.panelType,
                  props.panelCode,
                )
              }
            >
              {s.label}
            </MenuItem>
          ))}
        </MenuBalloonDialog>
        <MenuBalloonDialog
          showing={
            props.uiData.showingDialogVersion ===
              this.state.showingDialogVersion &&
            props.uiData.showingDialogVersion ===
              this.state.showingReplyDialogVersion
          }
          className='brEditorOptionsReplyWebchatBalloon'
          style={this.state.replyDialogStyle}
        >
          {replyOptions.map((s, i) => (
            <MenuItem
              key={i}
              className={'brEditorOptionsReplyWebchatMenuItem ' + s.className}
              onClick={s.event}
            >
              {s.label}
            </MenuItem>
          ))}
        </MenuBalloonDialog>
        <MenuBalloonDialog
          showing={
            props.uiData.showingDialogVersion ===
              this.state.showingDialogVersion &&
            props.uiData.showingDialogVersion ===
              this.state.showingChangeEditorTypeDialogVersion
          }
          className='brEditorOptionsChangeEditorTypeBalloon'
          style={this.state.changeEditorTypeDialogStyle}
        >
          {editorTypes.map((t, i) => (
            <MenuItem
              key={i}
              className={
                'brEditorOptionsChangeEditorTypeMenuItem brEditorType' + t
              }
              onClick={() => this.setState({ selectedEditorType: t })}
            >
              {uawMsgs['LBL_EDITOR_TYPE_' + t] || t}
            </MenuItem>
          ))}
        </MenuBalloonDialog>
      </div>
    )
  }
}
