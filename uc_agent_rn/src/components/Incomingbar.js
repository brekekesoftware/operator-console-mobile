import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ButtonIconic from './ButtonIconic.js'
import { formatStr, parsePanelKey } from '../utilities/strings.js'

/**
 * Incomingbar
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.phone
 * props.uiData.panelSessionTable
 * props.uiData.ownerDocument
 * props.uiData.externalCallWorkTable
 * props.uiData.incomingbarPanelLink_onClick
 * props.uiData.callAnswerButton_onClick
 * props.uiData.callMuteButton_onClick
 * props.uiData.callCameraMuteButton_onClick
 * props.uiData.callScreenToggleButton_onClick
 * props.uiData.callVideoRefreshButton_onClick
 * props.uiData.callHangUpButton_onClick
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      someDragging: false,
      collapsedSessionId: '',
    }
  }
  handleDragOver(ev) {
    const props = this.props
    if (!this.state.someDragging) {
      this.setState({ someDragging: true })
      setTimeout(this.checkDragEnd.bind(this), 1000)
    }
  }
  checkDragEnd() {
    const props = this.props
    if (this.state.someDragging) {
      if (
        props.uiData.ownerDocument &&
        props.uiData.ownerDocument.querySelector &&
        props.uiData.ownerDocument.querySelector('.brCanDrop')
      ) {
        setTimeout(this.checkDragEnd.bind(this), 1000)
      } else {
        this.setState({ someDragging: false })
      }
    }
  }
  handleIncomingbarPanelLinkClick(panelType, panelCode, ev) {
    const props = this.props
    props.uiData.fire('incomingbarPanelLink_onClick', panelType, panelCode, ev)
  }
  handleIncomingbarCollapseButtonClick(sessionId, incomingProgress, ev) {
    const props = this.props
    if (this.state.collapsedSessionId === sessionId) {
      this.setState({ collapsedSessionId: '' })
    } else {
      this.setState({ collapsedSessionId: sessionId })
    }
  }
  render() {
    const props = this.props
    let session = null
    let panel = {}
    let panelSession = {}
    Object.keys(props.uiData.panelSessionTable).some(panelKey => {
      const ps = props.uiData.panelSessionTable[panelKey]
      const s =
        ps &&
        ps.sessionId &&
        props.uiData.phone &&
        props.uiData.phone.getSession(ps.sessionId)
      if (
        s &&
        s.rtcSession &&
        ((s.rtcSession.direction === 'incoming' &&
          s.sessionStatus === 'progress') ||
          s.sessionStatus === 'connected')
      ) {
        session = s
        panel = parsePanelKey(panelKey)
        panelSession = ps
        return true
      }
      return false
    })
    const incomingProgress =
      session &&
      session.rtcSession &&
      session.rtcSession.direction === 'incoming' &&
      session.sessionStatus === 'progress' &&
      !session.answering
    const collapsed =
      session && session.sessionId === this.state.collapsedSessionId
    let buddy = {}
    if (panel.panelType === 'CHAT') {
      try {
        buddy =
          props.uiData.ucUiStore.getBuddyUserForUi(
            JSON.parse(panel.panelCode),
          ) || {}
      } catch (ex) {}
    } else if (panel.panelType === 'CONFERENCE') {
      buddy.name = string(
        (
          props.uiData.ucUiStore.getChatHeaderInfo({
            chatType: panel.panelType,
            chatCode: panel.panelCode,
          }) || {}
        ).title,
      )
    } else if (panel.panelType === 'EXTERNALCALL') {
      buddy.name = string(
        (props.uiData.externalCallWorkTable &&
          props.uiData.externalCallWorkTable[panel.panelCode] &&
          props.uiData.externalCallWorkTable[panel.panelCode].display_name) ||
          panel.panelCode,
      )
      if (buddy.name && buddy.name !== panel.panelCode) {
        buddy.name += ' ' + '(' + panel.panelCode + ')'
      }
    }
    let message = (
      <a
        className='brIncomingbarPanelLink'
        href='javascript:void(0)'
        onClick={this.handleIncomingbarPanelLinkClick.bind(
          this,
          panel.panelType,
          panel.panelCode,
        )}
      >
        {string(buddy.name)}
      </a>
    )
    let messageStr = string(buddy.name)
    if (incomingProgress) {
      const format = string(
        session.remoteWithVideo
          ? uawMsgs.MSG_INCOMINGBAR_MESSAGE_WITH_VIDEO
          : uawMsgs.MSG_INCOMINGBAR_MESSAGE,
      )
      message = (
        <span>
          <span>{string(format.split('{0}')[0])}</span>
          <span>{message}</span>
          <span>{string(format.split('{0}')[1])}</span>
        </span>
      )
      messageStr = formatStr(format, string(buddy.name))
    }
    return (
      <div
        className={
          'brIncomingbar' +
          (session ? '' : ' brHidden') +
          (incomingProgress ? ' brIncomingProgress' : '') +
          (collapsed ? ' brCollapsed' : '') +
          (this.state.someDragging ? ' brSomeDragging' : '')
        }
        title={
          collapsed
            ? uawMsgs.LBL_INCOMINGBAR_CALL_MENU_BUTTON_TOOLTIP +
              ' (' +
              string(buddy.name) +
              ')'
            : ''
        }
        onDragOver={this.handleDragOver.bind(this)}
      >
        <div className='brIncomingbarAnimation'></div>
        <div
          className={
            'brIncomingImage' +
            (buddy.profile_image_url ? '' : ' brNoImage') +
            (buddy.profile_image_url &&
            string(buddy.profile_image_url).indexOf(
              Constants.PROFILE_IMAGE_URL_DOWNLOAD,
            ) === -1
              ? ' brMyProfileImageUrl'
              : '')
          }
          title={string(buddy.name)}
          style={
            buddy.profile_image_url
              ? { backgroundImage: 'url(' + buddy.profile_image_url + ')' }
              : {}
          }
        />
        <div className='brIncomingbarMessage' title={messageStr}>
          {message}
        </div>
        <ButtonIconic
          className='brVideoRefreshButton'
          disabled={!session || !session.withVideo}
          hidden={
            incomingProgress ||
            !(
              int(
                props.uiData.ucUiStore.getOptionalSetting({ key: ['dbgopt'] }),
              ) & 2
            )
          }
          title={uawMsgs.LBL_CALL_VIDEO_REFRESH_BUTTON_TOOLTIP}
          onClick={props.uiData.fire.bind(
            props.uiData,
            'callVideoRefreshButton_onClick',
            panel.panelType,
            panel.panelCode,
          )}
        >
          <span className='brVideoRefreshButtonIcon br_bi_icon_refresh_svg'></span>
          <span className='brVideoRefreshButtonIcon brSmallIcon br_bi_icon_video_call_svg'></span>
        </ButtonIconic>
        <ButtonIconic
          className={
            'brMicrophoneMuteButton' +
            (session && session.muted && session.muted.main ? ' brMuted' : '')
          }
          disabled={!session}
          hidden={incomingProgress}
          title={
            session && session.muted && session.muted.main
              ? uawMsgs.LBL_CALL_MICROPHONE_UNMUTE_BUTTON_TOOLTIP
              : uawMsgs.LBL_CALL_MICROPHONE_MUTE_BUTTON_TOOLTIP
          }
          onClick={props.uiData.fire.bind(
            props.uiData,
            'callMuteButton_onClick',
            panel.panelType,
            panel.panelCode,
            'main',
          )}
        >
          <span className='brMicrophoneMuteButtonIcon br_bi_icon_block_microphone_svg'></span>
        </ButtonIconic>
        <ButtonIconic
          className={
            'brCameraMuteButton' + (panelSession.cameraMuted ? ' brMuted' : '')
          }
          disabled={!session}
          hidden={incomingProgress}
          title={
            panelSession.cameraMuted
              ? uawMsgs.LBL_CALL_CAMERA_UNMUTE_BUTTON_TOOLTIP
              : uawMsgs.LBL_CALL_CAMERA_MUTE_BUTTON_TOOLTIP
          }
          onClick={props.uiData.fire.bind(
            props.uiData,
            'callCameraMuteButton_onClick',
            panel.panelType,
            panel.panelCode,
          )}
        >
          <span className='brCameraMuteButtonIcon br_bi_icon_no_video_svg'></span>
        </ButtonIconic>
        <ButtonIconic
          className={
            'brScreenToggleButton' +
            (panelSession.isScreen ? ' brIsScreen' : '')
          }
          disabled={!session}
          hidden={incomingProgress}
          title={
            panelSession.isScreen
              ? uawMsgs.LBL_CALL_SCREEN_END_BUTTON_TOOLTIP
              : uawMsgs.LBL_CALL_SCREEN_BUTTON_TOOLTIP
          }
          onClick={props.uiData.fire.bind(
            props.uiData,
            'callScreenToggleButton_onClick',
            panel.panelType,
            panel.panelCode,
          )}
        >
          <span className='brScreenToggleButtonIcon br_bi_icon_channel_mosaic_1_svg'></span>
        </ButtonIconic>
        <ButtonIconic
          className='brCallAnswerButton'
          disabled={!incomingProgress}
          title={uawMsgs.LBL_CALL_ANSWER_BUTTON_TOOLTIP}
          onClick={props.uiData.fire.bind(
            props.uiData,
            'callAnswerButton_onClick',
            panel.panelType,
            panel.panelCode,
            false,
          )}
        >
          <span className='brCallAnswerButtonIcon br_bi_icon_phone_svg'></span>
        </ButtonIconic>
        <ButtonIconic
          className='brCallAnswerWithVideoButton'
          disabled={!incomingProgress}
          title={uawMsgs.LBL_CALL_ANSWER_WITH_VIDEO_BUTTON_TOOLTIP}
          onClick={props.uiData.fire.bind(
            props.uiData,
            'callAnswerButton_onClick',
            panel.panelType,
            panel.panelCode,
            true,
          )}
        >
          <span className='brCallAnswerButtonIcon br_bi_icon_video_call_svg'></span>
        </ButtonIconic>
        <ButtonIconic
          className='brCallDeclineButton'
          title={
            incomingProgress
              ? uawMsgs.LBL_CALL_DECLINE_BUTTON_TOOLTIP
              : uawMsgs.LBL_CALL_HANG_UP_BUTTON_TOOLTIP
          }
          onClick={props.uiData.fire.bind(
            props.uiData,
            'callHangUpButton_onClick',
            panel.panelType,
            panel.panelCode,
          )}
        >
          <span className='brCallDeclineButtonIcon br_bi_icon_end_call_svg'></span>
        </ButtonIconic>
        <ButtonIconic
          className='brIncomingbarCollapseButton'
          onClick={this.handleIncomingbarCollapseButtonClick.bind(
            this,
            string(session && session.sessionId),
            incomingProgress,
          )}
        >
          <span
            className={
              'brIncomingbarCollapseButtonIcon' +
              (collapsed
                ? ' br_bi_icon_phone_talking_svg'
                : ' br_bi_icon_chevron_right_svg')
            }
          ></span>
        </ButtonIconic>
      </div>
    )
  }
}
