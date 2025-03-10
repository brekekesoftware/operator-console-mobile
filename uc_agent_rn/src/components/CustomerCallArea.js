import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ReactDOM from 'react-dom'
import Draggable from 'react-draggable'
import ButtonIconic from './ButtonIconic.js'
import CallAudio from './CallAudio.js'
import CallVideo from './CallVideo.js'
import CallTimer from './CallTimer.js'
import MenuBalloonDialog from './MenuBalloonDialog.js'
import MenuItem from './MenuItem.js'
import MultipleAudio from '../components/MultipleAudio.js'
import CURRENT_SCRIPT_URL from '../utilities/currentscript.js'

/**
 * CustomerCallArea
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.phone
 * props.uiData.cameraOff
 * props.uiData.isScreen
 * props.uiData.configurations
 * props.uiData.showingDialogVersion
 * props.uiData.callAreaExpanded
 * props.uiData.callAreaTheater
 * props.uiData.callVideoOptionsHidden
 * props.uiData.showingDialog_update
 * props.uiData.callArea_onClick
 * props.uiData.callArea_onSwipedDown
 * props.uiData.callArea_onSwipedUp
 * props.uiData.callAreaTheaterButton_onClick
 * props.uiData.callMuteMicButton_onClick
 * props.uiData.callMuteCamButton_onClick
 * props.uiData.callScreenButton_onClick
 * props.uiData.callHangUpButton_onClick
 * props.uiData.callAnswerButton_onClick
 * props.uiData.callAnswerWithVideoButton_onClick
 * props.uiData.callDeclineButton_onClick
 * props.withMenuOptions
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.fullscreenEntered = false
    this.state = {
      callVideoOptionsMenuShowingDialogVersion: null,
      callVideoOptionsMenuShowingDialogVideoClientSessionId: null,
      touchStartX: 0,
      touchStartY: 0,
      touchStartTime: 0,
      touchMoveX: 0,
      touchMoveY: 0,
      swipedTime: 0,
      callLocalVideoX: -40,
      callLocalVideoY: -40,
      videoOptionsPanelTime: {},
    }
  }
  componentDidUpdate() {
    const props = this.props
    const session = props.uiData.phone && props.uiData.phone.getSession()
    if (!session) {
      // no call
      if (this.fullscreenEntered) {
        const doc = props.uiData.ownerDocument
        if (doc) {
          try {
            const p = (
              doc.exitFullscreen ||
              doc.webkitExitFullscreen ||
              doc.mozCancelFullScreen ||
              doc.msExitFullscreen ||
              function () {}
            ).call(doc)
            if (p && p.catch) {
              p.catch(error => {
                props.uiData.ucUiStore.getLogger().log('warn', error)
              })
            }
          } catch (ex) {
            props.uiData.ucUiStore.getLogger().log('warn', ex)
          }
        }
        this.fullscreenEntered = false
      }
    }
  }
  handleEvent(ev) {
    const props = this.props
    if (ev.type === 'click') {
      if (+new Date() - this.state.swipedTime > 500) {
        props.uiData.fire('callArea_onClick', ev)
      }
    } else if (ev.type === 'touchstart') {
      if (ev.touches && ev.touches[0]) {
        this.setState({
          touchStartX: ev.touches[0].pageX,
          touchStartY: ev.touches[0].pageY,
          touchStartTime: +new Date(),
          touchMoveX: ev.touches[0].pageX,
          touchMoveY: ev.touches[0].pageY,
        })
      }
    } else if (ev.type === 'touchmove') {
      if (ev.touches && ev.changedTouches[0]) {
        this.setState({
          touchMoveX: ev.changedTouches[0].pageX,
          touchMoveY: ev.changedTouches[0].pageY,
        })
      }
    } else if (ev.type === 'touchend') {
      const nowTime = +new Date()
      const dTime = nowTime - this.state.touchStartTime
      const dY = this.state.touchMoveY - this.state.touchStartY
      if (dTime < 1000) {
        if (24 < dY && dY < 200) {
          this.setState({ swipedTime: nowTime })
          props.uiData.fire('callArea_onSwipedDown', ev)
        } else if (-200 < dY && dY < -24) {
          this.setState({ swipedTime: nowTime })
          props.uiData.fire('callArea_onSwipedUp', ev)
        }
      }
    }
  }
  handleFullscreenButtonClick(ev) {
    const props = this.props
    const v = ReactDOM.findDOMNode(this.refs['callVideoArea'])
    if (v) {
      try {
        const p = (
          v.requestFullscreen ||
          v.webkitRequestFullScreen ||
          v.mozRequestFullScreen ||
          v.msRequestFullscreen ||
          function () {}
        ).call(v)
        if (p && p.catch) {
          p.catch(error => {
            props.uiData.ucUiStore.getLogger().log('warn', error)
          })
        }
      } catch (ex) {
        props.uiData.ucUiStore.getLogger().log('warn', ex)
      }
      this.fullscreenEntered = true
    }
  }
  handleCallRemoteVideoClick(videoClientSessionId, ev) {
    const props = this.props
    props.uiData.callVideoOptionsHidden = false
    this.state.videoOptionsPanelTime[videoClientSessionId] = +new Date()
    this.setState({ videoOptionsPanelTime: this.state.videoOptionsPanelTime })
    setTimeout(this.setState.bind(this, {}), 2000)
    setTimeout(this.setState.bind(this, {}), 3000)
  }
  handleCallRemoteVideoMouseMove(videoClientSessionId, ev) {
    const props = this.props
    this.state.videoOptionsPanelTime[videoClientSessionId] = +new Date()
    this.setState({ videoOptionsPanelTime: this.state.videoOptionsPanelTime })
    setTimeout(this.setState.bind(this, {}), 2000)
    setTimeout(this.setState.bind(this, {}), 3000)
  }
  handleCallRemoteVideoMouseLeave(videoClientSessionId, ev) {
    const props = this.props
    delete this.state.videoOptionsPanelTime[videoClientSessionId]
    this.setState({ videoOptionsPanelTime: this.state.videoOptionsPanelTime })
  }
  handleCallVideoOptionsOptionsButtonClick(videoClientSessionId, ev) {
    const props = this.props
    if (
      props.uiData.showingDialogVersion !==
        this.state.callVideoOptionsMenuShowingDialogVersion ||
      videoClientSessionId !==
        this.state.callVideoOptionsMenuShowingDialogVideoClientSessionId
    ) {
      this.setState({
        callVideoOptionsMenuShowingDialogVersion: ++props.uiData
          .showingDialogVersion,
        callVideoOptionsMenuShowingDialogVideoClientSessionId:
          videoClientSessionId,
      })
      ev.stopPropagation()
      props.uiData.fire('showingDialog_update')
    }
  }
  handleCallVideoOptionsHideMenuItemClick(videoClientSessionId, ev) {
    const props = this.props
    props.uiData.callVideoOptionsHidden = true
    ev.stopPropagation()
  }
  handleCallVideoOptionsFullscreenButtonClick(videoClientSessionId, ev) {
    const props = this.props
    const v = ReactDOM.findDOMNode(
      this.refs['callRemoteVideo' + videoClientSessionId],
    )
    if (v) {
      const doc = props.uiData.ownerDocument
      if (!(doc && doc.fullscreenElement === v)) {
        try {
          const p = (
            v.requestFullscreen ||
            v.webkitRequestFullScreen ||
            v.mozRequestFullScreen ||
            v.msRequestFullscreen ||
            function () {}
          ).call(v)
          if (p && p.catch) {
            p.catch(error => {
              props.uiData.ucUiStore.getLogger().log('warn', error)
            })
          }
        } catch (ex) {
          props.uiData.ucUiStore.getLogger().log('warn', ex)
        }
        this.fullscreenEntered = true
      } else {
        try {
          const p = (
            doc.exitFullscreen ||
            doc.webkitExitFullscreen ||
            doc.mozCancelFullScreen ||
            doc.msExitFullscreen ||
            function () {}
          ).call(doc)
          if (p && p.catch) {
            p.catch(error => {
              props.uiData.ucUiStore.getLogger().log('warn', error)
            })
          }
        } catch (ex) {
          props.uiData.ucUiStore.getLogger().log('warn', ex)
        }
        this.fullscreenEntered = false
      }
    }
    delete this.state.videoOptionsPanelTime[videoClientSessionId]
    this.setState({ videoOptionsPanelTime: this.state.videoOptionsPanelTime })
  }
  render() {
    const props = this.props
    if (props.uiData.phone) {
      const session = props.uiData.phone && props.uiData.phone.getSession()
      let className = 'brCallArea'
      let videos = []
      let startTime = 0
      const remoteBuddies =
        Object.values(props.uiData.ucUiStore.getBuddyTable())[0] || {}
      let imcomingRemoteBuddy = props.uiData.ucUiStore.getBuddyUserForUi({
        user_id: string(
          session &&
            session.rtcSession &&
            session.rtcSession.remote_identity &&
            session.rtcSession.remote_identity.uri &&
            session.rtcSession.remote_identity.uri.user,
        ),
      })
      if (!imcomingRemoteBuddy.name && !imcomingRemoteBuddy.profile_image_url) {
        imcomingRemoteBuddy = props.uiData.ucUiStore.getBuddyUserForUi(
          Object.values(remoteBuddies).filter(b => !b.isMe)[0],
        )
      }
      if (props.withMenuOptions) {
        className += ' brWithMenuOptions'
      }
      if (
        props.uiData.configurations &&
        props.uiData.configurations.cameraButton
      ) {
        className += ' brWithCameraButton'
      }
      if (
        props.uiData.configurations &&
        props.uiData.configurations.screenButton
      ) {
        className += ' brWithScreenButton'
      }
      if (
        props.uiData.configurations &&
        props.uiData.configurations.fullscreenButton
      ) {
        className += ' brWithFullscreenButton'
      }
      if (session) {
        if (props.uiData.callAreaExpanded) {
          className += ' brExpanded'
        } else {
          className += ' brContracted'
        }
        if (props.uiData.callAreaTheater) {
          className += ' brTheater'
        } else if (
          session.withVideo &&
          session.remoteUserOptionsTable &&
          Object.keys(session.remoteUserOptionsTable).some(user => {
            let remoteSoundOnly = false
            try {
              remoteSoundOnly = JSON.parse(
                session.remoteUserOptionsTable[user].exInfo,
              ).soundOnly
            } catch (ex) {}
            return (
              session.remoteUserOptionsTable[user] &&
              session.remoteUserOptionsTable[user].withVideo &&
              !remoteSoundOnly
            )
          })
        ) {
          className += ' brNonTheaterLarge'
        } else if (session.withVideo) {
          className += ' brNonTheaterSmall'
        } else {
          className += ' brNonTheaterHidden'
        }
        if (
          session.rtcSession &&
          session.rtcSession.direction === 'incoming' &&
          session.sessionStatus === 'progress' &&
          !session.answering
        ) {
          className += ' brIncomingProgress'
        }
        if (session.muted.main) {
          className += ' brMicMuted'
        }
        if (props.uiData.cameraOff) {
          className += ' brCameraOff'
        }
        if (props.uiData.isScreen) {
          className += ' brIsScreen'
        }
        if (session.withVideo) {
          className += ' brWithVideo'
          if (session.videoClientSessionTable) {
            const keys = Object.keys(session.videoClientSessionTable)
            const width =
              Math.floor(100 / Math.ceil(Math.sqrt(keys.length))) + '%'
            const height =
              Math.floor(
                100 / Math.ceil((Math.sqrt(4 * keys.length + 1) - 1) / 2),
              ) + '%'
            videos = keys.map((videoClientSessionId, index) => (
              <div
                key={videoClientSessionId}
                ref={'callRemoteVideo' + videoClientSessionId}
                className='brCallRemoteVideo'
                style={{ width: width, height: height }}
                onClick={this.handleCallRemoteVideoClick.bind(
                  this,
                  videoClientSessionId,
                )}
                onTouchStart={this.handleCallRemoteVideoClick.bind(
                  this,
                  videoClientSessionId,
                )}
                onMouseMove={this.handleCallRemoteVideoMouseMove.bind(
                  this,
                  videoClientSessionId,
                )}
                onMouseLeave={this.handleCallRemoteVideoMouseLeave.bind(
                  this,
                  videoClientSessionId,
                )}
              >
                <CallVideo
                  uiData={props.uiData}
                  sessionId={string(session && session.sessionId)}
                  videoClientSessionId={videoClientSessionId}
                  streamMarker={string(
                    session &&
                      session.videoClientSessionTable &&
                      session.videoClientSessionTable[videoClientSessionId] &&
                      session.videoClientSessionTable[videoClientSessionId]
                        .remoteStreamObject &&
                      session.videoClientSessionTable[videoClientSessionId]
                        .remoteStreamObject.id,
                  )}
                  isLocal={false}
                  className={
                    props.uiData.callAreaExpanded ? 'brCancelCallAreaClick' : ''
                  }
                />
                <div className='brCallVideoName'>
                  {
                    (user =>
                      remoteBuddies[user] ||
                      remoteBuddies[
                        Object.keys(remoteBuddies).find(
                          user_id =>
                            user.indexOf(string(user_id).replace('#', '')) !==
                            -1,
                        )
                      ] || { name: user })(
                      string(
                        session &&
                          session.videoClientSessionTable &&
                          session.videoClientSessionTable[
                            videoClientSessionId
                          ] &&
                          session.videoClientSessionTable[videoClientSessionId]
                            .user,
                      ),
                    ).name
                  }
                </div>
                <div
                  className={
                    'brCallVideoOptionsPanel brCancelCallAreaClick' +
                    (props.uiData.callVideoOptionsHidden ||
                    !props.uiData.callAreaExpanded
                      ? ' brHidden'
                      : '') +
                    (+new Date() <
                    int(
                      this.state.videoOptionsPanelTime[videoClientSessionId],
                    ) +
                      1500
                      ? ' brVisible'
                      : '') +
                    (+new Date() <
                    int(
                      this.state.videoOptionsPanelTime[videoClientSessionId],
                    ) +
                      2500
                      ? ' brEnabled'
                      : '')
                  }
                >
                  <ButtonIconic
                    className='brCallVideoOptionsOptionsButton brCancelCallAreaClick'
                    onClick={this.handleCallVideoOptionsOptionsButtonClick.bind(
                      this,
                      videoClientSessionId,
                    )}
                  >
                    <span className='brCallVideoOptionsOptionsButtonIcon br_bi_icon_more_svg'></span>
                  </ButtonIconic>
                  <MenuBalloonDialog
                    showing={
                      props.uiData.showingDialogVersion ===
                        this.state.callVideoOptionsMenuShowingDialogVersion &&
                      videoClientSessionId ===
                        this.state
                          .callVideoOptionsMenuShowingDialogVideoClientSessionId
                    }
                    className='brCallVideoOptionsMenuBalloon'
                  >
                    <MenuItem
                      className='brCallVideoOptionsMenuItem brCallVideoOptionsHideMenuItem brCancelCallAreaClick'
                      onClick={this.handleCallVideoOptionsHideMenuItemClick.bind(
                        this,
                        videoClientSessionId,
                      )}
                    >
                      {uawMsgs.LBL_CALL_VIDEO_OPTIONS_HIDE_MENU}
                    </MenuItem>
                  </MenuBalloonDialog>
                  <ButtonIconic
                    className='brCallVideoOptionsFullscreenButton brCancelCallAreaClick'
                    onClick={this.handleCallVideoOptionsFullscreenButtonClick.bind(
                      this,
                      videoClientSessionId,
                    )}
                  >
                    <span
                      className={
                        'brCallVideoOptionsFullscreenButtonIcon brCancelCallAreaClick' +
                        (props.uiData.ownerDocument &&
                        props.uiData.ownerDocument.fullscreenElement &&
                        string(
                          props.uiData.ownerDocument.fullscreenElement
                            .className,
                        ).indexOf('brCallRemoteVideo') !== -1
                          ? ' br_bi_icon_collapse_svg'
                          : ' br_bi_icon_expand_svg')
                      }
                    ></span>
                  </ButtonIconic>
                  <ButtonIconic
                    className='brCallVideoOptionsTheaterButton'
                    hidden={
                      !(
                        props.uiData.configurations &&
                        props.uiData.configurations.theaterButton
                      ) ||
                      (props.uiData.ownerDocument &&
                        props.uiData.ownerDocument.fullscreenElement &&
                        string(
                          props.uiData.ownerDocument.fullscreenElement
                            .className,
                        ).indexOf('brCallRemoteVideo') !== -1)
                    }
                    onClick={props.uiData.fire.bind(
                      props.uiData,
                      'callAreaTheaterButton_onClick',
                    )}
                  >
                    <span
                      className={
                        'brCallVideoOptionsTheaterButtonIcon' +
                        (props.uiData.callAreaTheater
                          ? ' br_bi_icon_chevron_up_svg'
                          : ' br_bi_icon_chevron_down_svg')
                      }
                    ></span>
                  </ButtonIconic>
                </div>
              </div>
            ))
          }
          if (props.uiData.callAreaExpanded) {
            videos.push(
              <Draggable
                key='local'
                bounds='parent'
                defaultPosition={{
                  x: this.state.callLocalVideoX,
                  y: this.state.callLocalVideoY,
                }}
                onStop={(e, position) =>
                  this.setState({
                    callLocalVideoX: position.x,
                    callLocalVideoY: position.y,
                  })
                }
              >
                <div className='brCallLocalVideo'>
                  <CallVideo
                    uiData={props.uiData}
                    sessionId={string(session && session.sessionId)}
                    streamMarker={string(
                      session &&
                        session.localVideoStreamObject &&
                        session.localVideoStreamObject.id,
                    )}
                    isLocal={true}
                    className='brCancelCallAreaClick'
                  />
                </div>
              </Draggable>,
            )
          } else {
            videos.push(
              <div key='local' className='brCallLocalVideo'>
                <CallVideo
                  uiData={props.uiData}
                  sessionId={string(session && session.sessionId)}
                  streamMarker={string(
                    session &&
                      session.localVideoStreamObject &&
                      session.localVideoStreamObject.id,
                  )}
                  isLocal={true}
                />
              </div>,
            )
          }
        }
        if (session.rtcSession && session.rtcSession.start_time) {
          startTime = +session.rtcSession.start_time
        }
      }
      return (
        <div
          className={className}
          onClick={this.handleEvent.bind(this)}
          onTouchStart={this.handleEvent.bind(this)}
          onTouchMove={this.handleEvent.bind(this)}
          onTouchEnd={this.handleEvent.bind(this)}
        >
          <div className='brCallHeaderArea'>
            <button
              className='brCallMuteMicButton brCallAreaButton brCancelCallAreaClick'
              title={
                session && session.muted && session.muted.main
                  ? uawMsgs.LBL_CALL_MICROPHONE_UNMUTE_BUTTON_TOOLTIP
                  : uawMsgs.LBL_CALL_MICROPHONE_MUTE_BUTTON_TOOLTIP
              }
              onClick={props.uiData.fire.bind(
                props.uiData,
                'callMuteMicButton_onClick',
              )}
            >
              <span className='brCallMuteMicIcon brCallAreaIcon brCancelCallAreaClick br_bi_icon_block_microphone_svg'></span>
            </button>
            <button
              className='brCallMuteCamButton brCallAreaButton brCancelCallAreaClick'
              title={
                props.uiData.cameraOff
                  ? uawMsgs.LBL_CALL_CAMERA_UNMUTE_BUTTON_TOOLTIP
                  : uawMsgs.LBL_CALL_CAMERA_MUTE_BUTTON_TOOLTIP
              }
              onClick={props.uiData.fire.bind(
                props.uiData,
                'callMuteCamButton_onClick',
              )}
            >
              <span className='brCallMuteCamIcon brCallAreaIcon brCancelCallAreaClick br_bi_icon_no_video_svg'></span>
            </button>
            <button
              className='brCallScreenButton brCallAreaButton brCancelCallAreaClick'
              title={
                props.uiData.isScreen
                  ? uawMsgs.LBL_CALL_SCREEN_END_BUTTON_TOOLTIP
                  : uawMsgs.LBL_CALL_SCREEN_BUTTON_TOOLTIP
              }
              onClick={props.uiData.fire.bind(
                props.uiData,
                'callScreenButton_onClick',
              )}
            >
              <span className='brCallScreenIconArea brCallAreaIconArea'>
                <span className='brCallScreenIcon brCallAreaIconAreaIcon brCancelCallAreaClick br_bi_icon_channel_mosaic_1_svg'></span>
              </span>
            </button>
            <button
              className='brCallHangUpButton brCallAreaButton brCancelCallAreaClick'
              title={uawMsgs.LBL_CALL_HANG_UP_BUTTON_TOOLTIP}
              onClick={props.uiData.fire.bind(
                props.uiData,
                'callHangUpButton_onClick',
              )}
            >
              <span className='brCallHangUpIcon brCallAreaIcon brCancelCallAreaClick br_bi_icon_end_call_svg'></span>
            </button>
            <button
              className='brCallFullscreenButton brCallAreaButton brCancelCallAreaClick br_bi_icon_expand_svg'
              title={uawMsgs.LBL_CALL_FULLSCREEN_BUTTON_TOOLTIP}
              onClick={this.handleFullscreenButtonClick.bind(this)}
            ></button>
            <CallTimer startTime={startTime} />
          </div>
          <div className='brCallAnswerArea brCancelCallAreaClick'>
            <div className='brCallIncomingArea brCancelCallAreaClick'>
              <img
                className='brCallIncomingIcon brCancelCallAreaClick'
                src={imcomingRemoteBuddy.profile_image_url}
              />
              <span className='brCallIncomingMessageArea brCancelCallAreaClick'>
                <span className='brCallIncomingName brCancelCallAreaClick'>
                  {imcomingRemoteBuddy.name}
                </span>
                <br />
                <span className='brCallIncomingMessage brCancelCallAreaClick'>
                  {uawMsgs.LBL_CALL_INCOMING}
                </span>
              </span>
            </div>
            <div className='brCallAnswerButtonArea brCancelCallAreaClick'>
              <button
                className='brCallAnswerButton brCallAnswerAreaButton brCancelCallAreaClick'
                title={uawMsgs.LBL_CALL_ANSWER_BUTTON_TOOLTIP}
                onClick={props.uiData.fire.bind(
                  props.uiData,
                  'callAnswerButton_onClick',
                )}
              ></button>
              <button
                className='brCallAnswerWithVideoButton brCallAnswerAreaButton brCancelCallAreaClick'
                title={uawMsgs.LBL_CALL_ANSWER_WITH_VIDEO_BUTTON_TOOLTIP}
                onClick={props.uiData.fire.bind(
                  props.uiData,
                  'callAnswerWithVideoButton_onClick',
                )}
              ></button>
              <button
                className='brCallDeclineButton brCallAnswerAreaButton brCancelCallAreaClick'
                title={uawMsgs.LBL_CALL_DECLINE_BUTTON_TOOLTIP}
                onClick={props.uiData.fire.bind(
                  props.uiData,
                  'callDeclineButton_onClick',
                )}
              ></button>
            </div>
          </div>
          <div
            ref='callVideoArea'
            className={
              'brCallVideoArea' +
              (Object.keys((session && session.videoClientSessionTable) || {})
                .length >= 2
                ? ' brMultiRemoteVideo'
                : '')
            }
          >
            {videos}
          </div>
          <MultipleAudio
            uiData={props.uiData}
            className='brRingMultipleAudio'
            src={CURRENT_SCRIPT_URL.DIR + '../../../sounds/ring.mp3'}
            loop={true}
            playing={
              props.uiData.configurations &&
              props.uiData.configurations.ringTone &&
              session &&
              session.rtcSession &&
              session.rtcSession.direction === 'incoming' &&
              session.sessionStatus === 'progress' &&
              !session.answering
            }
          />
          <MultipleAudio
            uiData={props.uiData}
            className='brRingbackMultipleAudio'
            src={CURRENT_SCRIPT_URL.DIR + '../../../sounds/ringback.mp3'}
            loop={true}
            playing={
              props.uiData.configurations &&
              props.uiData.configurations.ringbackTone &&
              session &&
              !session.remoteStreamObject &&
              session.rtcSession &&
              session.rtcSession.direction === 'outgoing' &&
              session.sessionStatus === 'progress'
            }
          />
          <CallAudio
            uiData={props.uiData}
            sessionId={string(session && session.sessionId)}
            streamMarker={
              string(
                session &&
                  session.remoteStreamObject &&
                  session.remoteStreamObject.id,
              ) + string(session && session.remoteStreamUrl)
            }
            isLocal={false}
            className='brCallRemoteAudio'
          />
        </div>
      )
    } else {
      return <div></div>
    }
  }
}
