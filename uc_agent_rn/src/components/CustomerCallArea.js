import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  PanResponder,
  Platform,
  StatusBar,
} from 'react-native'
import uawMsgs from '../utilities/uawmsgs.js'
import { int, string } from '../utilities/strings.js'
import ButtonIconic from './ButtonIconic.js'
import CallAudio from './CallAudio.js'
import CallVideo from './CallVideo.js'
import CallTimer from './CallTimer.js'
import MenuBalloonDialog from './MenuBalloonDialog.js'
import MenuItem from './MenuItem.js'
import MultipleAudio from '../components/MultipleAudio.js'
import CURRENT_SCRIPT_URL from '../utilities/currentscript.js'
import { RTCView } from 'react-native-webrtc'
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from 'react-native-reanimated'

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
export default class CustomerCallArea extends React.Component {
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
      callLocalVideoPosition: {
        x: -40,
        y: -40,
      },
      videoOptionsPanelTime: {},
      isFullscreen: false,
      fullscreenVideo: null,
    }

    // Create refs
    this.callVideoAreaRef = React.createRef()
    this.videoRefs = {}

    // Setup pan responder for draggable local video
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        this.setState({
          touchStartX: gestureState.x0,
          touchStartY: gestureState.y0,
          touchStartTime: Date.now(),
        })
      },
      onPanResponderMove: (evt, gestureState) => {
        this.setState({
          touchMoveX: gestureState.moveX,
          touchMoveY: gestureState.moveY,
        })

        if (this.props.uiData.callAreaExpanded) {
          this.setState({
            callLocalVideoPosition: {
              x: gestureState.dx + this.state.callLocalVideoPosition.x,
              y: gestureState.dy + this.state.callLocalVideoPosition.y,
            },
          })
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        const nowTime = Date.now()
        const dTime = nowTime - this.state.touchStartTime
        const dY = gestureState.dy

        if (dTime < 1000) {
          if (24 < dY && dY < 200) {
            this.setState({ swipedTime: nowTime })
            this.props.uiData.fire('callArea_onSwipedDown', evt)
          } else if (-200 < dY && dY < -24) {
            this.setState({ swipedTime: nowTime })
            this.props.uiData.fire('callArea_onSwipedUp', evt)
          }
        }
      },
    })
  }
  componentDidUpdate() {
    const props = this.props
    const session = props.uiData.phone && props.uiData.phone.getSession()

    if (!session && this.fullscreenEntered) {
      this.fullscreenEntered = false
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
  handleFullscreenButtonClick() {
    if (Platform.OS === 'ios') {
      // iOS fullscreen handling
      if (this.callVideoAreaRef.current) {
        if (!this.fullscreenEntered) {
          // Enter fullscreen
          this.setState({
            isFullscreen: true,
          })
          this.fullscreenEntered = true
        } else {
          // Exit fullscreen
          this.setState({
            isFullscreen: false,
          })
          this.fullscreenEntered = false
        }
      }
    } else {
      // Android fullscreen handling
      if (this.callVideoAreaRef.current) {
        if (!this.fullscreenEntered) {
          // Enter fullscreen
          StatusBar.setHidden(true)
          this.setState({
            isFullscreen: true,
          })
          this.fullscreenEntered = true
        } else {
          // Exit fullscreen
          StatusBar.setHidden(false)
          this.setState({
            isFullscreen: false,
          })
          this.fullscreenEntered = false
        }
      }
    }
  }
  handleCallRemoteVideoClick(videoClientSessionId, ev) {
    const props = this.props
    props.uiData.callVideoOptionsHidden = false
    this.state.videoOptionsPanelTime[videoClientSessionId] = Date.now()
    this.setState({ videoOptionsPanelTime: this.state.videoOptionsPanelTime })
    setTimeout(() => this.setState({}), 2000)
    setTimeout(() => this.setState({}), 3000)
  }
  handleCallRemoteVideoMouseMove(videoClientSessionId, ev) {
    const props = this.props
    this.state.videoOptionsPanelTime[videoClientSessionId] = Date.now()
    this.setState({ videoOptionsPanelTime: this.state.videoOptionsPanelTime })
    setTimeout(() => this.setState({}), 2000)
    setTimeout(() => this.setState({}), 3000)
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
  handleCallVideoOptionsFullscreenButtonClick(videoClientSessionId) {
    const videoRef = this.videoRefs[videoClientSessionId]

    if (Platform.OS === 'ios') {
      // iOS fullscreen handling
      if (videoRef) {
        if (!this.fullscreenEntered) {
          this.setState({
            fullscreenVideo: videoClientSessionId,
            isFullscreen: true,
          })
          this.fullscreenEntered = true
        } else {
          this.setState({
            fullscreenVideo: null,
            isFullscreen: false,
          })
          this.fullscreenEntered = false
        }
      }
    } else {
      // Android fullscreen handling
      if (videoRef) {
        if (!this.fullscreenEntered) {
          StatusBar.setHidden(true)
          this.setState({
            fullscreenVideo: videoClientSessionId,
            isFullscreen: true,
          })
          this.fullscreenEntered = true
        } else {
          StatusBar.setHidden(false)
          this.setState({
            fullscreenVideo: null,
            isFullscreen: false,
          })
          this.fullscreenEntered = false
        }
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
              <View
                key={videoClientSessionId}
                ref={ref => (this.videoRefs[videoClientSessionId] = ref)}
                style={[
                  styles.brCallRemoteVideo,
                  { width, height },
                  this.state.fullscreenVideo === videoClientSessionId &&
                    styles.fullscreen,
                ]}
                onTouchStart={() =>
                  this.handleCallRemoteVideoClick(videoClientSessionId)
                }
                onTouchMove={() =>
                  this.handleCallRemoteVideoMouseMove(videoClientSessionId)
                }
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
                  style={
                    props.uiData.callAreaExpanded
                      ? styles.brCancelCallAreaClick
                      : null
                  }
                />
                <Text style={styles.brCallVideoName}>
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
                </Text>
                <View
                  style={[
                    styles.brCallVideoOptionsPanel,
                    styles.brCancelCallAreaClick,
                    props.uiData.callVideoOptionsHidden ||
                      (!props.uiData.callAreaExpanded && styles.brHidden),
                    Date.now() <
                      this.state.videoOptionsPanelTime[videoClientSessionId] +
                        1500 && styles.brVisible,
                    Date.now() <
                      this.state.videoOptionsPanelTime[videoClientSessionId] +
                        2500 && styles.brEnabled,
                  ]}
                >
                  <ButtonIconic
                    style={[
                      styles.brCallVideoOptionsOptionsButton,
                      styles.brCancelCallAreaClick,
                    ]}
                    onPress={() =>
                      this.handleCallVideoOptionsOptionsButtonClick(
                        videoClientSessionId,
                      )
                    }
                  >
                    <View
                      style={[
                        styles.brCallVideoOptionsOptionsButtonIcon,
                        styles.br_bi_icon_more_svg,
                      ]}
                    />
                  </ButtonIconic>
                  <MenuBalloonDialog
                    showing={
                      props.uiData.showingDialogVersion ===
                        this.state.callVideoOptionsMenuShowingDialogVersion &&
                      videoClientSessionId ===
                        this.state
                          .callVideoOptionsMenuShowingDialogVideoClientSessionId
                    }
                    style={styles.brCallVideoOptionsMenuBalloon}
                  >
                    <MenuItem
                      style={[
                        styles.brCallVideoOptionsMenuItem,
                        styles.brCallVideoOptionsHideMenuItem,
                        styles.brCancelCallAreaClick,
                      ]}
                      onPress={() =>
                        this.handleCallVideoOptionsHideMenuItemClick(
                          videoClientSessionId,
                        )
                      }
                    >
                      <Text>{uawMsgs.LBL_CALL_VIDEO_OPTIONS_HIDE_MENU}</Text>
                    </MenuItem>
                  </MenuBalloonDialog>
                  <ButtonIconic
                    style={[styles.brCallVideoOptionsTheaterButton]}
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
                    onPress={() =>
                      props.uiData.fire('callAreaTheaterButton_onClick')
                    }
                  >
                    <View
                      style={[
                        styles.brCallVideoOptionsTheaterButtonIcon,
                        props.uiData.callAreaTheater
                          ? styles.br_bi_icon_chevron_up_svg
                          : styles.br_bi_icon_chevron_down_svg,
                      ]}
                    />
                  </ButtonIconic>
                </View>
              </View>
            ))
          }
          if (props.uiData.callAreaExpanded) {
            videos.push(
              <Animated.View
                key='local'
                style={[
                  styles.brCallLocalVideo,
                  {
                    transform: [
                      { translateX: this.state.callLocalVideoPosition.x },
                      { translateY: this.state.callLocalVideoPosition.y },
                    ],
                  },
                ]}
                {...this.panResponder.panHandlers}
              >
                <CallVideo
                  uiData={props.uiData}
                  sessionId={string(session && session.sessionId)}
                  streamMarker={string(
                    session &&
                      session.localVideoStreamObject &&
                      session.localVideoStreamObject.id,
                  )}
                  isLocal={true}
                  style={styles.brCancelCallAreaClick}
                />
              </Animated.View>,
            )
          } else {
            videos.push(
              <View key='local' style={styles.brCallLocalVideo}>
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
              </View>,
            )
          }
        }
        if (session.rtcSession && session.rtcSession.start_time) {
          startTime = +session.rtcSession.start_time
        }
      }
      return (
        <View
          style={[
            styles.brCallArea,
            className,
            {
              ...this.panResponder.panHandlers,
            },
          ]}
          {...this.panResponder.panHandlers}
        >
          <View style={styles.brCallHeaderArea}>
            <TouchableOpacity
              style={[styles.brCallMuteMicButton, styles.brCallAreaButton]}
              onPress={() => props.uiData.fire('callMuteMicButton_onClick')}
            >
              <View
                style={[
                  styles.brCallMuteMicIcon,
                  styles.brCallAreaIcon,
                  styles.br_bi_icon_block_microphone_svg,
                ]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.brCallMuteCamButton, styles.brCallAreaButton]}
              onPress={() => props.uiData.fire('callMuteCamButton_onClick')}
            >
              <View
                style={[
                  styles.brCallMuteCamIcon,
                  styles.brCallAreaIcon,
                  styles.br_bi_icon_no_video_svg,
                ]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.brCallScreenButton, styles.brCallAreaButton]}
              onPress={() => props.uiData.fire('callScreenButton_onClick')}
            >
              <View style={styles.brCallScreenIconArea}>
                <View
                  style={[
                    styles.brCallScreenIcon,
                    styles.brCallAreaIconAreaIcon,
                    styles.br_bi_icon_channel_mosaic_1_svg,
                  ]}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.brCallHangUpButton, styles.brCallAreaButton]}
              onPress={() => props.uiData.fire('callHangUpButton_onClick')}
            >
              <View
                style={[
                  styles.brCallHangUpIcon,
                  styles.brCallAreaIcon,
                  styles.br_bi_icon_end_call_svg,
                ]}
              />
            </TouchableOpacity>
            <CallTimer startTime={startTime} />
          </View>
          <View style={styles.brCallAnswerArea}>
            <View style={styles.brCallIncomingArea}>
              <Image
                style={styles.brCallIncomingIcon}
                source={{ uri: imcomingRemoteBuddy.profile_image_url }}
              />
              <View style={styles.brCallIncomingMessageArea}>
                <Text style={styles.brCallIncomingName}>
                  {imcomingRemoteBuddy.name}
                </Text>
                <Text style={styles.brCallIncomingMessage}>
                  {uawMsgs.LBL_CALL_INCOMING}
                </Text>
              </View>
            </View>
            <View style={styles.brCallAnswerButtonArea}>
              <TouchableOpacity
                style={[
                  styles.brCallAnswerButton,
                  styles.brCallAnswerAreaButton,
                ]}
                onPress={() => props.uiData.fire('callAnswerButton_onClick')}
              />
              <TouchableOpacity
                style={[
                  styles.brCallAnswerWithVideoButton,
                  styles.brCallAnswerAreaButton,
                ]}
                onPress={() =>
                  props.uiData.fire('callAnswerWithVideoButton_onClick')
                }
              />
              <TouchableOpacity
                style={[
                  styles.brCallDeclineButton,
                  styles.brCallAnswerAreaButton,
                ]}
                onPress={() => props.uiData.fire('callDeclineButton_onClick')}
              />
            </View>
          </View>
          <View
            ref={this.callVideoAreaRef}
            style={[
              styles.brCallVideoArea,
              Object.keys((session && session.videoClientSessionTable) || {})
                .length >= 2 && styles.brMultiRemoteVideo,
              this.state.isFullscreen && styles.fullscreen,
            ]}
          >
            {videos}
          </View>
          <MultipleAudio
            uiData={props.uiData}
            style={styles.brRingMultipleAudio}
            src={CURRENT_SCRIPT_URL.DIR + '../sounds/ring.mp3'}
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
            style={styles.brRingbackMultipleAudio}
            src={CURRENT_SCRIPT_URL.DIR + '../sounds/ringback.mp3'}
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
            style={styles.brCallRemoteAudio}
          />
        </View>
      )
    } else {
      return <View />
    }
  }
}

const styles = StyleSheet.create({
  brCallArea: {
    position: 'absolute',
    width: '100%',
    height: 48,
    left: 0,
    top: -48,
    backgroundColor: 'transparent',
  },
  brContracted: {
    top: 0,
  },
  brExpanded: {
    top: 0,
  },
  brIncomingProgress: {
    top: 0,
    height: 'auto',
    bottom: 64,
  },
  brWithVideo: {
    top: 0,
    height: 'auto',
    bottom: 64,
  },
  brNonTheaterLarge: {
    top: 0,
    height: '50%',
  },
  brNonTheaterSmall: {
    top: 0,
    height: 144,
  },
  brCallHeaderArea: {
    position: 'relative',
    backgroundColor: '#F5F5F5', // @hint_gray
  },
  brCallAreaButton: {
    width: 48,
    maxWidth: '12%',
    height: 32,
    margin: 8,
    marginHorizontal: 4,
    borderRadius: 4,
    backgroundColor: '#FFFFFF', // @white
  },
  brCallMuteMicButton: {
    margin: 8,
    marginLeft: 8,
    marginRight: 4,
  },
  brMicMutedButton: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#FF5722', // @portland_orange
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 4,
  },
  brCallMuteCamButton: {
    // Default styles
  },
  brCameraOffButton: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#FF5722',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 4,
  },
  brCallScreenButton: {
    // Default styles
  },
  brIsScreenButton: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#48D1CC', // @medium_turquoise
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 4,
  },
  brCallHangUpButton: {
    alignSelf: 'flex-end',
    margin: 8,
    marginLeft: 4,
    marginRight: 8,
    backgroundColor: '#FF5722', // @portland_orange
  },
  brCallAreaIcon: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
  brCallAreaIconArea: {
    position: 'absolute',
    left: 5,
    top: 5,
    right: 5,
    bottom: 5,
  },
  brCallAreaIconAreaIcon: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
  brCallAnswerArea: {
    display: 'none',
  },
  brCallAnswerAreaVisible: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 48,
    bottom: 0,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  brCallIncomingArea: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: '50%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
  },
  brCallIncomingIcon: {
    margin: 4,
  },
  brCallIncomingMessageArea: {
    margin: 4,
  },
  brCallIncomingName: {
    color: '#FFFFFF',
    fontWeight: 'normal',
    fontSize: 13,
  },
  brCallIncomingMessage: {
    color: '#F3C915',
    fontWeight: 'bold',
    fontSize: 24,
  },
  brCallAnswerButtonArea: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },
  brCallAnswerAreaButton: {
    width: 48,
    height: 48,
    marginHorizontal: 16,
    marginBottom: 32,
    borderRadius: 24,
    backgroundColor: '#F0F0EC',
  },
  brCallAnswerButton: {
    backgroundColor: '#4CAF50',
  },
  brCallAnswerWithVideoButton: {
    backgroundColor: '#2196F3',
  },
  brCallDeclineButton: {
    backgroundColor: '#F44336',
  },
  brCallVideoArea: {
    display: 'none',
  },
  brCallVideoAreaVisible: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 48,
    bottom: 0,
    backgroundColor: '#F5F5F5', // @hint_gray
  },
  brCallVideoAreaContracted: {
    left: '75%',
    width: '20%',
    top: 48,
    height: '20%',
    opacity: 0.5,
  },
  brCallRemoteVideo: {
    position: 'relative',
  },
  brMultiRemoteVideo: {
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderLeftColor: 'transparent',
    borderTopColor: 'transparent',
    borderRightColor: 'rgba(128, 128, 128, 0.5)',
    borderBottomColor: 'rgba(128, 128, 128, 0.5)',
  },
  brCallVideoName: {
    display: 'none',
    position: 'absolute',
    left: -2,
    bottom: 0,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(128, 128, 128, 0.5)',
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: 0.3,
  },
  brCallVideoOptionsPanel: {
    position: 'absolute',
    left: 0,
    width: '100%',
    top: 0,
    height: '100%',
    backgroundColor: 'transparent',
    opacity: 0,
  },
  brCallVideoOptionsPanelVisible: {
    opacity: 1,
  },
  brCallVideoOptionsOptionsButton: {
    position: 'absolute',
    left: 8,
    bottom: 8,
  },
  brCallVideoOptionsOptionsButtonIcon: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    tintColor: '#FFFFFF',
  },
  brCallVideoOptionsFullscreenButton: {
    position: 'absolute',
    right: 48,
    bottom: 8,
  },
  brCallVideoOptionsTheaterButton: {
    position: 'absolute',
    right: 8,
    bottom: 8,
  },
  brCallVideoOptionsMenuBalloon: {
    position: 'absolute',
    left: 8,
    bottom: 40,
  },
  brCallLocalVideo: {
    position: 'absolute',
    right: 0,
    width: '20%',
    bottom: 0,
    height: '20%',
    backgroundColor: 'transparent',
  },
  brCallLocalVideoExpanded: {
    height: '50%',
  },
  brCallTimer: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
  // Icon styles
  br_bi_icon_more_svg: {
    tintColor: '#FFFFFF',
  },
  br_bi_icon_chevron_up_svg: {
    tintColor: '#FFFFFF',
  },
  br_bi_icon_chevron_down_svg: {
    tintColor: '#FFFFFF',
  },
  br_bi_icon_block_microphone_svg: {
    tintColor: '#FF5722',
  },
  br_bi_icon_no_video_svg: {
    tintColor: '#FF5722',
  },
  br_bi_icon_channel_mosaic_1_svg: {
    tintColor: '#48D1CC',
  },
  br_bi_icon_end_call_svg: {
    tintColor: '#FFFFFF',
  },
  brRingMultipleAudio: {
    // Add audio styles
  },
  brRingbackMultipleAudio: {
    // Add audio styles
  },
  brCallRemoteAudio: {
    // Add audio styles
  },
  fullscreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    backgroundColor: '#000',
  },
})
