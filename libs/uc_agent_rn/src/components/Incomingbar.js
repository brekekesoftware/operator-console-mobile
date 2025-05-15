import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
} from 'react-native'
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
 * props.style - Style object for the incomingbar
 */
export default class Incomingbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      someDragging: false,
      collapsedSessionId: '',
      animationValue: new Animated.Value(0),
    }
  }

  componentDidMount() {
    this.startAnimation()
  }

  startAnimation() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.animationValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(this.state.animationValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start()
  }

  handleDragOver = () => {
    if (!this.state.someDragging) {
      this.setState({ someDragging: true })
      setTimeout(this.checkDragEnd, 1000)
    }
  }

  checkDragEnd = () => {
    if (this.state.someDragging) {
      // TODO: Implement drag end detection
      this.setState({ someDragging: false })
    }
  }

  handleIncomingbarPanelLinkPress = (panelType, panelCode) => {
    this.props.uiData.fire('incomingbarPanelLink_onClick', panelType, panelCode)
  }

  handleIncomingbarCollapseButtonPress = (sessionId, incomingProgress) => {
    this.setState({
      collapsedSessionId:
        this.state.collapsedSessionId === sessionId ? '' : sessionId,
    })
  }

  render() {
    const { props } = this
    let session = null
    let panel = {}
    let panelSession = {}

    Object.keys(props.uiData.panelSessionTable).some(panelKey => {
      const ps = props.uiData.panelSessionTable[panelKey]
      const s = ps?.sessionId && props.uiData.phone?.getSession(ps.sessionId)

      if (
        s?.rtcSession &&
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
      session?.rtcSession?.direction === 'incoming' &&
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
        props.uiData.ucUiStore.getChatHeaderInfo({
          chatType: panel.panelType,
          chatCode: panel.panelCode,
        })?.title,
      )
    } else if (panel.panelType === 'EXTERNALCALL') {
      buddy.name = string(
        props.uiData.externalCallWorkTable?.[panel.panelCode]?.display_name ||
          panel.panelCode,
      )
      if (buddy.name && buddy.name !== panel.panelCode) {
        buddy.name += ` (${panel.panelCode})`
      }
    }

    if (!session) {
      return null
    }

    return (
      <View
        style={[
          styles.brIncomingbar,
          incomingProgress && styles.brIncomingProgress,
          collapsed && styles.brCollapsed,
          this.state.someDragging && styles.brSomeDragging,
          this.props.style,
        ]}
      >
        <Animated.View
          style={[
            styles.brIncomingbarAnimation,
            {
              opacity: this.state.animationValue,
            },
          ]}
        />

        <Image
          style={[
            styles.brIncomingImage,
            !buddy.profile_image_url && styles.brNoImage,
            buddy.profile_image_url &&
              string(buddy.profile_image_url).indexOf(
                Constants.PROFILE_IMAGE_URL_DOWNLOAD,
              ) === -1 &&
              styles.brMyProfileImageUrl,
          ]}
          source={
            buddy.profile_image_url ? { uri: buddy.profile_image_url } : null
          }
        />

        <TouchableOpacity
          style={styles.brIncomingbarMessage}
          onPress={() =>
            this.handleIncomingbarPanelLinkPress(
              panel.panelType,
              panel.panelCode,
            )
          }
        >
          <Text style={styles.messageText}>
            {incomingProgress ? (
              <Text>
                {string(
                  session.remoteWithVideo
                    ? uawMsgs.MSG_INCOMINGBAR_MESSAGE_WITH_VIDEO
                    : uawMsgs.MSG_INCOMINGBAR_MESSAGE,
                ).replace('{0}', string(buddy.name))}
              </Text>
            ) : (
              <Text>{string(buddy.name)}</Text>
            )}
          </Text>
        </TouchableOpacity>

        <View style={styles.controlButtons}>
          {/* TODO: Add icon name for component ButtonIconic */}
          <ButtonIconic
            style={styles.brVideoRefreshButton}
            disabled={!session || !session.withVideo}
            hidden={
              incomingProgress ||
              !(
                int(
                  props.uiData.ucUiStore.getOptionalSetting({
                    key: ['dbgopt'],
                  }),
                ) & 2
              )
            }
            iconName='refresh'
            onPress={() =>
              props.uiData.fire(
                'callVideoRefreshButton_onClick',
                panel.panelType,
                panel.panelCode,
              )
            }
          />

          <ButtonIconic
            style={[
              styles.brMicrophoneMuteButton,
              session?.muted?.main && styles.brMuted,
            ]}
            disabled={!session}
            hidden={incomingProgress}
            iconName='block_microphone'
            onPress={() =>
              props.uiData.fire(
                'callMuteButton_onClick',
                panel.panelType,
                panel.panelCode,
                'main',
              )
            }
          />

          <ButtonIconic
            style={[
              styles.brCameraMuteButton,
              panelSession.cameraMuted && styles.brMuted,
            ]}
            disabled={!session}
            hidden={incomingProgress}
            iconName='no_video'
            onPress={() =>
              props.uiData.fire(
                'callCameraMuteButton_onClick',
                panel.panelType,
                panel.panelCode,
              )
            }
          />

          <ButtonIconic
            style={[
              styles.brScreenToggleButton,
              panelSession.isScreen && styles.brIsScreen,
            ]}
            disabled={!session}
            hidden={incomingProgress}
            iconName='channel_mosaic_1'
            onPress={() =>
              props.uiData.fire(
                'callScreenToggleButton_onClick',
                panel.panelType,
                panel.panelCode,
              )
            }
          />

          {incomingProgress && (
            <>
              <ButtonIconic
                style={styles.brCallAnswerButton}
                iconName='phone'
                onPress={() =>
                  props.uiData.fire(
                    'callAnswerButton_onClick',
                    panel.panelType,
                    panel.panelCode,
                    false,
                  )
                }
              />

              <ButtonIconic
                style={styles.brCallAnswerWithVideoButton}
                iconName='video_call'
                onPress={() =>
                  props.uiData.fire(
                    'callAnswerButton_onClick',
                    panel.panelType,
                    panel.panelCode,
                    true,
                  )
                }
              />
            </>
          )}

          <ButtonIconic
            style={styles.brCallDeclineButton}
            iconName='end_call'
            onPress={() =>
              props.uiData.fire(
                'callHangUpButton_onClick',
                panel.panelType,
                panel.panelCode,
              )
            }
          />

          <ButtonIconic
            style={styles.brIncomingbarCollapseButton}
            iconName={collapsed ? 'phone_talking' : 'chevron_right'}
            onPress={() =>
              this.handleIncomingbarCollapseButtonPress(
                string(session?.sessionId),
                incomingProgress,
              )
            }
          />
        </View>
      </View>
    )
  }
}

// Define colors
const colors = {
  // medium_turquoise: '#color2', // Replace with actual color
  // blue_green: '#darkenColor2', // Replace with actual color
  // mantis: '#color1', // Replace with actual color
  // moss_green: '#lightenColor1', // Replace with actual color
  // green: '#darkenColor1', // Replace with actual color
  // sap_green: '#darkenColor1More', // Replace with actual color
  white: '#ffffff',
  snow: '#fafafa',
  white_smoke: '#f5f5f5',
  isabelline: '#eeeeee',
  isabelline_tp: 'rgba(0, 0, 0, 0.065)',
  platinum: '#e0e0e0',
  dark_gray: '#9e9e9e',
  dark_jungle_green: '#212121',
  portland_orange: '#ff4526',
  disabled_gray: '#bdbdbd',
  pressed_gray: '#9e9e9e',
  hover_gray: '#616161',
  hint_gray: '#424242',
  status_available: '#5fac3f',
  status_idle: '#f3c915',
  status_busy: '#ff4526',
  status_invisible: '#bdbdbd',
}

const styles = StyleSheet.create({
  brIncomingbar: {
    width: 240,
    height: 48,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: colors.hint_gray,
    shadowColor: colors.platinum,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
  },
  brCollapsed: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  brHidden: {
    display: 'none',
  },
  brSomeDragging: {
    opacity: 0.5,
  },
  brIncomingbarAnimation: {
    position: 'absolute',
    left: 25,
    top: 5,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.medium_turquoise,
    transform: [{ scale: 1 }],
  },
  brIncomingImage: {
    position: 'absolute',
    left: 24,
    top: 4,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.hint_gray,
  },
  brNoImage: {
    backgroundColor: colors.hint_gray,
  },
  brMyProfileImageUrl: {
    resizeMode: 'cover',
  },
  brIncomingbarMessage: {
    position: 'absolute',
    left: 88,
    right: 0,
    top: '50%',
    transform: [{ translateY: -8 }],
    color: colors.white,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.3,
  },
  messageText: {
    color: colors.white,
  },
  controlButtons: {
    flexDirection: 'row',
    position: 'absolute',
    right: 8,
    top: 8,
  },
  brVideoRefreshButton: {
    backgroundColor: colors.white,
    marginRight: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  brMicrophoneMuteButton: {
    backgroundColor: colors.white,
    marginRight: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  brCameraMuteButton: {
    backgroundColor: colors.white,
    marginRight: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  brScreenToggleButton: {
    backgroundColor: colors.white,
    marginRight: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  brCallAnswerButton: {
    backgroundColor: colors.mantis,
    marginRight: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  brCallAnswerWithVideoButton: {
    backgroundColor: colors.mantis,
    marginRight: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  brCallDeclineButton: {
    backgroundColor: colors.portland_orange,
    marginRight: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  brIncomingbarCollapseButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  // Button states
  buttonDisabled: {
    backgroundColor: colors.disabled_gray,
  },
  buttonPressed: {
    backgroundColor: colors.pressed_gray,
  },
  buttonMuted: {
    opacity: 0.5,
  },
  buttonIsScreen: {
    backgroundColor: colors.medium_turquoise,
  },
  // Icon styles
  iconBase: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  iconDisabled: {
    opacity: 0.2,
  },
  iconMuted: {
    tintColor: colors.portland_orange,
  },
  iconInverted: {
    tintColor: colors.white,
  },
})
