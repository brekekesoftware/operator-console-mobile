import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  StatusBar,
  Animated,
  PanResponder,
  Dimensions,
  ScreenOrientation,
} from 'react-native'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ButtonIconic from './ButtonIconic.js'
import ButtonLabeled from './ButtonLabeled.js'
import CallAudio from './CallAudio.js'
import CallMicrophoneLevel from './CallMicrophoneLevel.js'
import CallTimer from './CallTimer.js'
import CallVideo from './CallVideo.js'
import DropDownMenu from './DropDownMenu.js'
import MenuBalloonDialog from './MenuBalloonDialog.js'
import MenuItem from './MenuItem.js'
import SoundAudio from '../components/SoundAudio.js'
import NameEmbeddedSpan from '../components/NameEmbeddedSpan.js'
import StatusIcon from '../components/StatusIcon.js'
import TextBox from '../components/TextBox.js'
import CURRENT_SCRIPT_URL from '../utilities/currentscript.js'
import PhoneIcon from '../icons/PhoneIcon.js'
import VideoCallIcon from '../icons/VideoCallIcon.js'
import EndCallIcon from '../icons/EndCallIcon.js'
import MoreIcon from '../icons/MoreIcon.js'
import TriangleRightIcon from '../icons/TriangleRightIcon.js'
import TriangleLeftIcon from '../icons/TriangleLeftIcon.js'
import HoldIcon from '../icons/HoldIcon.js'
import KeypadIcon from '../icons/KeypadIcon.js'
import NoVideoIcon from '../icons/NoVideoIcon.js'
import BlockMicrophoneIcon from '../icons/BlockMicrophoneIcon.js'
import ConferenceForegroundSelectedIcon from '../icons/ConferenceForegroundSelectedIcon.js'
import ChevronUpIcon from '../icons/ChevronUpIcon.js'
import ChevronDownIcon from '../icons/ChevronDownIcon.js'
import ArrowRightIcon from '../icons/ArrowRightIcon.js'
import ArrowLeftIcon from '../icons/ArrowLeftIcon.js'

const styles = StyleSheet.create({
  brCallArea: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    height: 0,
    backgroundColor: '#F5F5F5', // hint_gray
    overflow: 'hidden',
  },
  brHeaderButtonsCollapsible: {
    // Handled via conditional styles in render
  },
  brWithTarget: {
    // Handled via conditional styles in render
  },
  brWithSession: {
    overflow: 'visible',
  },
  brWithVideo: {
    // Handled via conditional styles in render
  },
  brOutgoingDialing: {
    // Handled via conditional styles in render
  },
  brOutgoingProgress: {
    // Handled via conditional styles in render
  },
  brIncomingProgress: {
    position: 'relative',
  },
  brTheater: {
    bottom: 0,
  },
  brOpened: {
    // Handled via conditional styles in render
  },
  brClosed: {
    // Handled via conditional styles in render
  },
  brIncomingArea: {
    position: 'absolute',
    width: 160,
    height: 200,
    left: '50%',
    top: '50%',
    transform: [{ translateX: -80 }, { translateY: -100 }],
    borderRadius: 4,
    backgroundColor: '#F5F5F5',
  },
  incomingAnimation: {
    position: 'absolute',
    left: 61,
    top: 41,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#48D1CC', // medium_turquoise
  },
  brIncomingImage: {
    position: 'absolute',
    left: 60,
    top: 40,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  brNoImage: {
    backgroundColor: '#F5F5F5', // hint_gray
  },
  brMyProfileImageUrl: {
    resizeMode: 'cover',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  brIncomingMessage: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 104,
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '400',
    letterSpacing: 0.3,
  },
  videoCallButtons: {
    flexDirection: 'row',
    position: 'absolute',
    left: 16,
    top: 140,
  },
  brCallAnswerButton: {
    width: 40,
    height: 40,
    backgroundColor: '#74C365', // mantis
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brCallAnswerButtonIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
  brCallAnswerWithVideoButton: {
    width: 40,
    height: 40,
    backgroundColor: '#74C365',
    borderRadius: 20,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brCallDeclineButton: {
    width: 40,
    height: 40,
    backgroundColor: '#FF5349', // portland_orange
    borderRadius: 20,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brCallDeclineButtonIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
  brCallVideoArea: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 8,
  },
  brCallLocalVideo: {
    position: 'absolute',
    right: 0,
    width: '20%',
    bottom: 0,
    height: '20%',
  },
  brCallRemoteVideo: {
    flex: 1,
    position: 'relative',
  },
  brMultiRemoteVideo: {
    borderWidth: 2,
    borderColor: 'rgba(128, 128, 128, 0.5)',
  },
  brCallVideoName: {
    position: 'absolute',
    left: -2,
    bottom: 0,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(128, 128, 128, 0.5)',
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '400',
    letterSpacing: 0.3,
  },
  brCallVideoOptionsPanel: {
    position: 'absolute',
    left: 0,
    width: '100%',
    top: 0,
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    opacity: 0,
  },
  brHidden: {
    display: 'none',
  },
  brVisible: {
    opacity: 1,
  },
  brEnabled: {
    // Handled via conditional styles in render
  },
  brCallVideoOptionsOptionsButton: {
    position: 'absolute',
    left: 8,
    bottom: 8,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brCallVideoOptionsOptionsButtonIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
  brCallVideoOptionsFullscreenButton: {
    position: 'absolute',
    right: 48,
    bottom: 8,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brCallVideoOptionsMenuBalloon: {
    position: 'absolute',
    left: 8,
    bottom: 40,
  },
  controlsContainer: {
    position: 'absolute',
    left: 24,
    top: 16,
    width: 160,
    height: 32,
    borderRadius: 4,
    overflow: 'hidden',
  },
  buttonContainer: {
    flex: 1,
  },
  menuButton: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIcon: {
    width: 32,
    height: 32,
  },
  arrowIcon: {
    width: 16,
    height: 16,
    marginHorizontal: 4,
  },
  menuIcon: {
    width: 12,
    height: 12,
    marginLeft: 4,
  },
  buttonText: {
    color: '#1A2421', // dark_jungle_green
    fontSize: 13,
    marginLeft: 8,
  },
  disabled: {
    opacity: 0.5,
  },
  holdedIcon: {
    tintColor: '#FF5349', // portland_orange
  },
  mutedIcon: {
    tintColor: '#FF5349',
  },
  cameraControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  microphoneControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transferMenuBalloon: {
    position: 'absolute',
    left: 192,
    top: 124,
    width: 160,
    padding: 8,
    paddingBottom: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  transferTargetArea: {
    width: 108,
    marginTop: 8,
  },
  transferTargetUserMenu: {
    position: 'absolute',
    width: 108,
  },
  transferTargetInput: {
    position: 'absolute',
    width: 84,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 4,
    padding: 8,
  },
  transferButtonsContainer: {
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'space-between',
  },
  transferButton: {
    height: 32,
    paddingHorizontal: 12,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transferIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transferIcon: {
    width: 16,
    height: 16,
    tintColor: '#FFFFFF',
  },
  transferArrowIcon: {
    width: 12,
    height: 12,
    marginLeft: 4,
    tintColor: '#FFFFFF',
  },
  transferButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    marginLeft: 8,
  },
  transferTargetUserGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  transferTargetUserGroupIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  transferTargetUserGroupName: {
    fontSize: 13,
    color: '#1A2421',
  },
  dtmfMenuBalloon: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  dtmfLog: {
    fontSize: 16,
    color: '#1A2421',
    textAlign: 'center',
    marginBottom: 16,
  },
  dtmfButtonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dtmfButton: {
    width: '30%',
    aspectRatio: 1,
    margin: '1.5%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 4,
  },
  dtmfButtonText: {
    fontSize: 24,
    color: '#1A2421',
  },
  deviceTitle: {
    fontSize: 13,
    color: '#1A2421',
    marginBottom: 8,
  },
  deviceMenu: {
    marginBottom: 16,
  },
  deviceMenuItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
})

/**
 * CallArea
 * props.uiData
 * props.uiData.ucUiAction
 * props.uiData.ucUiStore
 * props.uiData.phone
 * props.uiData.configurations
 * props.uiData.panelSessionTable
 * props.uiData.ownerDocument
 * props.uiData.showingDialogVersion
 * props.uiData.showingDialog_update
 * props.uiData.callAnswerButton_onClick
 * props.uiData.callAreaTheaterButton_onClick
 * props.uiData.callTransferButton_onClick
 * props.uiData.callTransferConferenceButton_onClick
 * props.uiData.callHoldButton_onClick
 * props.uiData.callDtmfButton_onClick
 * props.uiData.callAreaChangeDeviceMenuItem_onClick
 * props.uiData.callMuteButton_onClick
 * props.uiData.callCameraMuteButton_onClick
 * props.uiData.callHangUpButton_onClick
 * props.panelType
 * props.panelCode
 * props.onResize
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.lastHeight = 0
    this.fullscreenEntered = false
    this.sessionExisting = false
    this.sessionBeginTime = 0
    this.sessionEndTime = 0

    // Create refs for React Native
    this.callVideoAreaRef = React.createRef()
    this.transferTargetInputRef = React.createRef()
    this.transferTargetButtonRef = React.createRef()
    this.videoRefs = {}
    this.containerRef = React.createRef()

    this.state = {
      transferMenuShowingDialogVersion: null,
      dtmfMenuShowingDialogVersion: null,
      cameraMenuShowingDialogVersion: null,
      microphoneMenuShowingDialogVersion: null,
      callVideoOptionsMenuShowingDialogVersion: null,
      callVideoOptionsMenuShowingDialogVideoClientSessionId: null,
      callLocalVideoPosition: new Animated.ValueXY({ x: -40, y: -40 }),
      splitterHeight: int(
        props.uiData.ucUiStore.getLocalStoragePreference({
          keyList: ['callAreaHeight'],
        })[0],
      ),
      callMenuSessionId: '',
      transferTargetUserGroupOpen:
        props.uiData.ucUiStore.getLocalStoragePreference({
          keyList: ['buddylistOpenList'],
        })[0],
      dtmfTime: 0,
      dtmfLog: '',
      devices: [],
      headerButtonsCollapsible: false,
      videoOptionsPanelTime: {},
      isFullscreen: false,
      fullscreenVideo: null,
      layout: {
        width: 0,
        height: 0,
      },
    }

    // Setup PanResponder for draggable video
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        this.state.callLocalVideoPosition.setOffset({
          x: this.state.callLocalVideoPosition.x._value,
          y: this.state.callLocalVideoPosition.y._value,
        })
        this.state.callLocalVideoPosition.setValue({ x: 0, y: 0 })
      },
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: this.state.callLocalVideoPosition.x,
            dy: this.state.callLocalVideoPosition.y,
          },
        ],
        { useNativeDriver: false },
      ),
      onPanResponderRelease: () => {
        this.state.callLocalVideoPosition.flattenOffset()
      },
    })
  }
  componentDidUpdate() {
    const props = this.props
    const newState = {}
    const panelSession =
      props.uiData.panelSessionTable &&
      props.uiData.panelSessionTable[props.panelType + '_' + props.panelCode]
    const session =
      panelSession &&
      panelSession.sessionId &&
      props.uiData.phone &&
      props.uiData.phone.getSession(panelSession.sessionId)
    const node = this.containerRef.current
    if (node && node.style) {
      const maxHeight =
        int(node.parentNode && node.parentNode.clientHeight) || 88
      const minHeight = Math.min(maxHeight, 88)
      if (
        session &&
        session.rtcSession &&
        session.rtcSession.direction === 'incoming' &&
        session.sessionStatus === 'progress' &&
        !session.answering
      ) {
        // incoming (not answered yet)
        newState.height = 0
      } else if (session) {
        // session exists
        if (session && session.withVideo) {
          // with video
          if (
            !props.uiData.ucUiStore.getLocalStoragePreference({
              keyList: ['callAreaTheater'],
            })[0]
          ) {
            if (this.state.splitterHeight === 0) {
              newState.splitterHeight = int((minHeight + maxHeight) / 2)
            } else if (this.state.splitterHeight < minHeight) {
              newState.splitterHeight = minHeight
            } else if (maxHeight < this.state.splitterHeight) {
              if (node.parentNode && node.parentNode.clientHeight) {
                newState.splitterHeight = maxHeight
              } else {
                // do not reduce height if parentNode does not have height
              }
            }
            newState.height =
              (newState.splitterHeight || this.state.splitterHeight) + 'px'
          } else {
            newState.height = maxHeight + 'px'
          }
        } else {
          // audio only
          newState.height = minHeight + 'px'
        }
      } else if (panelSession && panelSession.target) {
        // outgoing (session not created yet)
        newState.height = minHeight + 'px'
      } else {
        // no call
        newState.height = '0px'
        if (this.state.dtmfTime) {
          newState.dtmfTime = 0
        }
        if (this.state.dtmfLog) {
          newState.dtmfLog = ''
        }
        if (this.fullscreenEntered) {
          const isWeb = Platform.OS === 'web'
          if (isWeb) {
            try {
              const doc = props.uiData.ownerDocument
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
          } else {
            // React Native fullscreen handling using ScreenOrientation
          }
          this.fullscreenEntered = false
        }
      }
    }
    if (this.state.layout.width < 400 && !this.state.headerButtonsCollapsible) {
      newState.headerButtonsCollapsible = true
    } else if (
      this.state.layout.width >= 400 &&
      this.state.headerButtonsCollapsible
    ) {
      newState.headerButtonsCollapsible = false
    }
    if (
      session &&
      session.sessionId &&
      session.sessionId !== this.state.callMenuSessionId &&
      props.uiData.ucUiStore.getLocalStoragePreference({
        keyList: ['callMenuOpened'],
      })[0]
    ) {
      newState.callMenuSessionId = session.sessionId
      this.getDevicesList()
    }
    if (Object.keys(newState).length) {
      this.setState(newState)
    }
    this.checkResized()
  }
  componentWillUnmount() {
    const props = this.props
    props.uiData.ucUiAction.setLocalStoragePreference({
      keyValueList: [
        { key: 'callAreaHeight', value: string(this.state.splitterHeight) },
      ],
    })
  }
  handleTransitionEnd(ev) {
    const props = this.props
    this.checkResized()
  }
  handleSplitterHeightDrag(ev, ui) {
    const props = this.props
    const splitterHeight = this.state.splitterHeight + ui.deltaY
    this.setState({ splitterHeight: splitterHeight })
  }
  handleSplitterHeightStop() {
    const props = this.props
    props.uiData.ucUiAction.setLocalStoragePreference({
      keyValueList: [
        { key: 'callAreaHeight', value: string(this.state.splitterHeight) },
      ],
    })
  }
  handleCallMenuButtonClick(ev) {
    const props = this.props
    const panelSession =
      props.uiData.panelSessionTable &&
      props.uiData.panelSessionTable[props.panelType + '_' + props.panelCode]
    const session =
      panelSession &&
      panelSession.sessionId &&
      props.uiData.phone &&
      props.uiData.phone.getSession(panelSession.sessionId)
    if (session && session.sessionId === this.state.callMenuSessionId) {
      this.setState({ callMenuSessionId: '' })
      props.uiData.ucUiAction.setLocalStoragePreference({
        keyValueList: [{ key: 'callMenuOpened', value: '' }],
      })
    } else {
      this.setState({ callMenuSessionId: session.sessionId })
      props.uiData.ucUiAction.setLocalStoragePreference({
        keyValueList: [{ key: 'callMenuOpened', value: 'true' }],
      })
      this.getDevicesList()
    }
  }
  getDevicesList() {
    const props = this.props
    // get devices list
    if (
      typeof navigator !== 'undefined' &&
      navigator.mediaDevices &&
      navigator.mediaDevices.enumerateDevices
    ) {
      navigator.mediaDevices
        .enumerateDevices()
        .then(devices => {
          this.setState({
            devices: [
              { deviceId: '', groupId: '', kind: 'audioinput', label: '' },
              { deviceId: '', groupId: '', kind: 'videoinput', label: '' },
              { deviceId: '', groupId: '', kind: 'audiooutput', label: '' },
            ].concat(devices.filter(device => device && device.deviceId)),
          })
        })
        .catch(error => {
          props.uiData.ucUiStore.getLogger().log('warn', error)
        })
    } else {
      props.uiData.ucUiStore
        .getLogger()
        .log('warn', 'enumerateDevices() not supported.')
    }
  }
  getDeviceLabel(device) {
    const props = this.props
    let label = ''
    if (device) {
      if (device.deviceId === '') {
        label = uawMsgs.LBL_CALL_DEVICE_AUTO
      } else if (device.deviceId === '_all_devices') {
        label = uawMsgs.LBL_CALL_DEVICE_ALL
      } else if (device.deviceId) {
        let existingDevice
        if (typeof device.label === 'undefined') {
          existingDevice = this.state.devices.find(
            d => d.kind === device.kind && d.deviceId === device.deviceId,
          )
        } else {
          existingDevice = device
        }
        if (existingDevice) {
          const existingDeviceId = string(existingDevice.deviceId)
          if (existingDevice.label) {
            label = string(existingDevice.label)
          } else if (existingDeviceId.length > 20) {
            label =
              string(existingDevice.kind) +
              ' ' +
              existingDeviceId.substring(0, 17) +
              '...'
          } else {
            label = string(existingDevice.kind) + ' ' + existingDeviceId
          }
        } else {
          label = '...'
        }
      }
    }
    return label
  }
  handleTransferMenuButtonClick(ev) {
    const props = this.props
    if (
      props.uiData.showingDialogVersion !==
      this.state.transferMenuShowingDialogVersion
    ) {
      this.setState({
        transferMenuShowingDialogVersion: ++props.uiData.showingDialogVersion,
      })
      ev.stopPropagation()
      props.uiData.fire('showingDialog_update')
      // focus
      const input = this.transferTargetInputRef.current
      setTimeout(() => {
        if (input) {
          input.focus()
          input.select()
        }
      }, 0)
    }
  }
  handleTransferMenuDropDownMenuShowingDialogUpdate() {
    const props = this.props
    this.setState({
      transferMenuShowingDialogVersion: props.uiData.showingDialogVersion,
    })
  }
  handleTransferTargetInputSubmit() {
    const props = this.props
    const input = this.transferTargetInputRef.current
    if (input && input.value) {
      props.uiData.fire(
        'callTransferButton_onClick',
        props.panelType,
        props.panelCode,
        string(input.value),
      )
    }
  }
  handleTransferTargetUserGroupClick(groupName, ev) {
    const props = this.props
    if (
      string(ev && ev.target && ev.target.className).indexOf(
        'brTransferTargetUserGroup',
      ) !== -1
    ) {
      if (
        this.state.transferTargetUserGroupOpen.split(',').indexOf(groupName) !==
        -1
      ) {
        this.setState({
          transferTargetUserGroupOpen: this.state.transferTargetUserGroupOpen
            .split(',')
            .filter(g => g !== groupName)
            .join(','),
        })
      } else {
        this.setState({
          transferTargetUserGroupOpen: this.state.transferTargetUserGroupOpen
            ? this.state.transferTargetUserGroupOpen + ',' + groupName
            : groupName,
        })
      }
    }
  }
  handleTransferTargetUserItemClick(user_id, ev) {
    const props = this.props
    const input = this.transferTargetInputRef.current
    if (input) {
      input.value = string(user_id)
      const button = this.transferTargetButtonRef.current
      if (button && button.focus) {
        button.focus()
      }
    }
  }
  handleDtmfMenuButtonClick(ev) {
    const props = this.props
    if (
      props.uiData.showingDialogVersion !==
      this.state.dtmfMenuShowingDialogVersion
    ) {
      this.setState({
        dtmfMenuShowingDialogVersion: ++props.uiData.showingDialogVersion,
      })
      ev.stopPropagation()
      props.uiData.fire('showingDialog_update')
    }
  }
  handleCallDtmfButtonClick(tone, ev) {
    const props = this.props
    this.setState({ dtmfTime: +new Date(), dtmfLog: this.state.dtmfLog + tone })
    props.uiData.fire(
      'callDtmfButton_onClick',
      props.panelType,
      props.panelCode,
      tone,
    )
  }
  handleFullscreenButtonClick(ev) {
    const { props } = this
    if (Platform.OS !== 'web') {
      try {
        if (!this.state.isFullscreen) {
          ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.LANDSCAPE,
          )
          this.setState({ isFullscreen: true })
        } else {
          ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.PORTRAIT,
          )
          this.setState({ isFullscreen: false })
        }
      } catch (error) {
        props.uiData.ucUiStore.getLogger().log('warn', error)
      }
    }
  }
  handleCameraMenuButtonClick(ev) {
    const props = this.props
    if (
      props.uiData.showingDialogVersion !==
      this.state.cameraMenuShowingDialogVersion
    ) {
      this.setState({
        cameraMenuShowingDialogVersion: ++props.uiData.showingDialogVersion,
      })
      ev.stopPropagation()
      props.uiData.fire('showingDialog_update')
    }
  }
  handleCameraMenuDropDownMenuShowingDialogUpdate() {
    const props = this.props
    this.setState({
      cameraMenuShowingDialogVersion: props.uiData.showingDialogVersion,
    })
  }
  handleMicrophoneMenuButtonClick(ev) {
    const props = this.props
    if (
      props.uiData.showingDialogVersion !==
      this.state.microphoneMenuShowingDialogVersion
    ) {
      this.setState({
        microphoneMenuShowingDialogVersion: ++props.uiData.showingDialogVersion,
      })
      ev.stopPropagation()
      props.uiData.fire('showingDialog_update')
    }
  }
  handleMicrophoneMenuDropDownMenuShowingDialogUpdate() {
    const props = this.props
    this.setState({
      microphoneMenuShowingDialogVersion: props.uiData.showingDialogVersion,
    })
  }
  handleCallRemoteVideoClick(videoClientSessionId, ev) {
    const props = this.props
    props.uiData.ucUiAction.setLocalStoragePreference({
      keyValueList: [{ key: 'callVideoOptionsHidden', value: '' }],
    })
    this.state.videoOptionsPanelTime[videoClientSessionId] = +new Date()
    this.setState({ videoOptionsPanelTime: this.state.videoOptionsPanelTime })
    setTimeout(this.setState.bind(this, {}), 2000)
    setTimeout(this.setState.bind(this, {}), 3000)
  }
  handleCallRemoteVideoTouchMove(videoClientSessionId, ev) {
    const props = this.props
    this.state.videoOptionsPanelTime[videoClientSessionId] = +new Date()
    this.setState({ videoOptionsPanelTime: this.state.videoOptionsPanelTime })
    setTimeout(this.setState.bind(this, {}), 2000)
    setTimeout(this.setState.bind(this, {}), 3000)
  }
  handleCallRemoteVideoTouchEnd(videoClientSessionId, ev) {
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
    props.uiData.ucUiAction.setLocalStoragePreference({
      keyValueList: [{ key: 'callVideoOptionsHidden', value: 'true' }],
    })
    ev.stopPropagation()
  }
  handleCallVideoOptionsFullscreenButtonClick(videoClientSessionId, ev) {
    const props = this.props
    const v = this.callVideoAreaRef.current
    if (v) {
      const isWeb = Platform.OS === 'web'
      if (!isWeb) {
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
  checkResized() {
    const props = this.props
    const node = this.containerRef.current
    if (node) {
      const height = int(node.offsetHeight)
      if (height !== this.lastHeight) {
        this.lastHeight = height
        if (typeof props.onResize === 'function') {
          props.onResize({ height: height })
        }
      }
    }
  }
  render() {
    const { props } = this
    const profile = props.uiData.ucUiStore.getChatClient().getProfile()
    const lampTypeOptionsCache = () =>
      lampTypeOptionsCache.value ||
      (lampTypeOptionsCache.value = props.uiData.getlampTypeOptions() || {}) // lazy evaluation
    const isSafari =
      typeof navigator !== 'undefined'
        ? new RegExp(
            (props.uiData.configurations &&
              props.uiData.configurations.uaForBeginedTone) ||
              '^(?=.*Safari)(?!.*Chrome).*$',
          ).test(navigator.userAgent)
        : false
    const panelSession =
      props.uiData.panelSessionTable &&
      props.uiData.panelSessionTable[props.panelType + '_' + props.panelCode]
    const session =
      panelSession &&
      panelSession.sessionId &&
      props.uiData.phone &&
      props.uiData.phone.getSession(panelSession.sessionId)
    const videoClientSessionIds =
      (session &&
        session.videoClientSessionTable &&
        Object.keys(session.videoClientSessionTable)) ||
      []
    const callMenuOpened =
      session &&
      session.sessionId === this.state.callMenuSessionId &&
      ((session.rtcSession && session.rtcSession.direction === 'outgoing') ||
        session.sessionStatus === 'connected')
    const dtmfShortcutPreference = int(
      props.uiData.ucUiStore.getOptionalSetting({ key: ['dtmf_shortcut'] }),
    )
    const localStoragePreference =
      props.uiData.ucUiStore.getLocalStoragePreference({
        keyList: [
          'callAreaTheater',
          'videoSource',
          'audioSource',
          'audioTarget',
          'callVideoOptionsHidden',
        ],
      })
    const callAreaTheaterPreference = localStoragePreference[0]
    const videoSourcePreference = localStoragePreference[1]
    const audioSourcePreference = localStoragePreference[2]
    const audioTargetPreference = localStoragePreference[3]
    const callVideoOptionsHiddenPreference = localStoragePreference[4]
    const allBuddyTable = props.uiData.ucUiStore.getBuddyTable() || {}
    const buddyTable = allBuddyTable[profile.tenant] || {}
    const buddies = Object.keys(buddyTable)
      .map(key => buddyTable[key])
      .filter(buddy => !buddy.isMe && buddy.isBuddy && !buddy.isTemporaryBuddy)
      .sort((buddy1, buddy2) => int(buddy1.buddyIndex) - int(buddy2.buddyIndex))
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
        this.state.transferTargetUserGroupOpen.split(',').indexOf(groupName) !==
          -1
      ) {
        const buddyStatus = props.uiData.getCurrentBuddyStatus(buddy) || {}
        if (
          dtmfShortcutPreference & 4 ||
          int(buddyStatus.status) !== Constants.STATUS_OFFLINE
        ) {
          groupTable[groupName].buddyNodes.push(
            <MenuItem
              key={JSON.stringify({
                tenant: buddy.tenant,
                user_id: buddy.user_id,
              })}
              className='brTransferTargetUserItem'
              dropDown={true}
              onClick={this.handleTransferTargetUserItemClick.bind(
                this,
                buddy.user_id,
              )}
            >
              <StatusIcon
                status={buddyStatus.status}
                degree={buddyStatus.degree}
              />
              <NameEmbeddedSpan
                ucUiStore={props.uiData.ucUiStore}
                format={'{0}'}
                title={'{0}'}
                buddy={buddy}
              />
            </MenuItem>,
          )
        }
      }
    })
    let buddy = {}
    if (props.panelType === 'CHAT') {
      try {
        buddy =
          props.uiData.ucUiStore.getBuddyUserForUi(
            JSON.parse(props.panelCode),
          ) || {}
      } catch (ex) {}
    }
    const buddyForVideoNameTable = {}
    Object.keys(allBuddyTable).forEach(tenant => {
      Object.keys(allBuddyTable[tenant]).forEach(user_id => {
        buddyForVideoNameTable[user_id] = string(
          allBuddyTable[tenant][user_id].name,
        )
      })
    })
    if (session) {
      if (!this.sessionExisting) {
        this.sessionExisting = true
        this.sessionBeginTime = +new Date()
      }
    } else {
      if (this.sessionExisting) {
        this.sessionExisting = false
        this.sessionEndTime = +new Date()
      }
    }
    return (
      <View
        style={[
          styles.brCallArea,
          this.state.headerButtonsCollapsible &&
            styles.brHeaderButtonsCollapsible,
          panelSession && panelSession.target && styles.brWithTarget,
          session && styles.brWithSession,
          session && session.withVideo && styles.brWithVideo,
          session &&
            session.rtcSession &&
            session.rtcSession.direction === 'outgoing' &&
            session.sessionStatus === 'dialing' &&
            styles.brOutgoingDialing,
          session &&
            session.rtcSession &&
            session.rtcSession.direction === 'outgoing' &&
            session.sessionStatus === 'progress' &&
            styles.brOutgoingProgress,
          session &&
            session.rtcSession &&
            session.rtcSession.direction === 'incoming' &&
            session.sessionStatus === 'progress' &&
            !session.answering &&
            styles.brIncomingProgress,
          callAreaTheaterPreference && styles.brTheater,
          callMenuOpened ? styles.brOpened : styles.brClosed,
        ]}
        ref={this.containerRef}
      >
        <View style={styles.brIncomingArea}>
          <Animated.View style={styles.brIncomingAnimation} />
          <View
            style={[
              styles.brIncomingImage,
              !buddy.profile_image_url && styles.brNoImage,
              buddy.profile_image_url &&
                string(buddy.profile_image_url).indexOf(
                  Constants.PROFILE_IMAGE_URL_DOWNLOAD,
                ) === -1 &&
                styles.brMyProfileImageUrl,
            ]}
          >
            {buddy.profile_image_url ? (
              <Image
                source={{ uri: buddy.profile_image_url }}
                style={styles.profileImage}
              />
            ) : (
              <Image
                source={require('../images/noimage.png')}
                style={styles.profileImage}
              />
            )}
          </View>

          <Text style={styles.brIncomingMessage}>
            {session && session.remoteWithVideo
              ? uawMsgs.LBL_CALL_INCOMING_WITH_VIDEO
              : uawMsgs.LBL_CALL_INCOMING}
          </Text>

          <View style={styles.videoCallButtons}>
            <ButtonIconic
              style={styles.brCallAnswerButton}
              title={uawMsgs.LBL_CALL_ANSWER_BUTTON_TOOLTIP}
              onPress={() =>
                props.uiData.fire(
                  'callAnswerButton_onClick',
                  props.panelType,
                  props.panelCode,
                  false,
                )
              }
            >
              <PhoneIcon width={24} height={24} color='#ffffff' />
            </ButtonIconic>

            <ButtonIconic
              style={styles.brCallAnswerWithVideoButton}
              title={uawMsgs.LBL_CALL_ANSWER_WITH_VIDEO_BUTTON_TOOLTIP}
              onPress={() =>
                props.uiData.fire(
                  'callAnswerButton_onClick',
                  props.panelType,
                  props.panelCode,
                  true,
                )
              }
            >
              <VideoCallIcon width={24} height={24} color='#ffffff' />
            </ButtonIconic>

            <ButtonIconic
              style={styles.brCallDeclineButton}
              title={uawMsgs.LBL_CALL_DECLINE_BUTTON_TOOLTIP}
              onPress={() =>
                props.uiData.fire(
                  'callHangUpButton_onClick',
                  props.panelType,
                  props.panelCode,
                )
              }
            >
              <EndCallIcon width={24} height={24} color='#ffffff' />
            </ButtonIconic>
          </View>
        </View>

        <SoundAudio
          uiData={props.uiData}
          style={styles.brRingSoundAudio}
          src={
            props.uiData.configurations?.alternativeRingTone ||
            CURRENT_SCRIPT_URL.DIR + '../sounds/ring.mp3'
          }
          loop={true}
          playing={
            session &&
            session.rtcSession &&
            session.rtcSession.direction === 'incoming' &&
            session.sessionStatus === 'progress' &&
            !session.answering &&
            (!lampTypeOptionsCache().silent ||
              lampTypeOptionsCache().ring === true) &&
            lampTypeOptionsCache().ring !== false
          }
        />

        <SoundAudio
          uiData={props.uiData}
          style={styles.brRingbackSoundAudio}
          src={CURRENT_SCRIPT_URL.DIR + '../sounds/ringback.mp3'}
          loop={true}
          playing={
            session &&
            !session.remoteStreamObject &&
            session.rtcSession &&
            session.rtcSession.direction === 'outgoing' &&
            session.sessionStatus === 'progress'
          }
          localStoragePreferenceKey='audioTarget'
        />

        <View
          ref={this.callVideoAreaRef}
          style={[
            styles.brCallVideoArea,
            videoClientSessionIds.length >= 2 && styles.brMultiRemoteVideo,
          ]}
        >
          {videoClientSessionIds.map(videoClientSessionId => (
            <TouchableOpacity
              key={videoClientSessionId}
              ref={ref => (this.videoRefs[videoClientSessionId] = ref)}
              style={[
                styles.brCallRemoteVideo,
                {
                  width: `${Math.floor(100 / Math.ceil(Math.sqrt(videoClientSessionIds.length)))}%`,
                  height: `${Math.floor(100 / Math.ceil((Math.sqrt(4 * videoClientSessionIds.length + 1) - 1) / 2))}%`,
                },
              ]}
              onPress={() =>
                this.handleCallRemoteVideoClick(videoClientSessionId)
              }
              onTouchMove={() =>
                this.handleCallRemoteVideoTouchMove(videoClientSessionId)
              }
              onTouchEnd={() =>
                this.handleCallRemoteVideoTouchEnd(videoClientSessionId)
              }
            >
              <CallVideo
                uiData={props.uiData}
                sessionId={string(session?.sessionId)}
                videoClientSessionId={videoClientSessionId}
                streamMarker={string(
                  session?.videoClientSessionTable?.[videoClientSessionId]
                    ?.remoteStreamObject?.id,
                )}
                isLocal={false}
              />

              <Text style={styles.brCallVideoName}>
                {this.getVideoName(
                  session,
                  videoClientSessionId,
                  buddyForVideoNameTable,
                )}
              </Text>

              <View
                style={[
                  styles.brCallVideoOptionsPanel,
                  callVideoOptionsHiddenPreference && styles.brHidden,
                  +new Date() <
                    int(
                      this.state.videoOptionsPanelTime[videoClientSessionId],
                    ) +
                      1500 && styles.brVisible,
                  +new Date() <
                    int(
                      this.state.videoOptionsPanelTime[videoClientSessionId],
                    ) +
                      2500 && styles.brEnabled,
                ]}
              >
                {this.renderVideoOptionsButtons(videoClientSessionId)}
              </View>
            </TouchableOpacity>
          ))}

          {session?.localVideoStreamObject && (
            <Animated.View
              style={[
                styles.brCallLocalVideo,
                {
                  transform:
                    this.state.callLocalVideoPosition.getTranslateTransform(),
                },
              ]}
              {...this.panResponder.panHandlers}
            >
              <CallVideo
                uiData={props.uiData}
                sessionId={string(session?.sessionId)}
                streamMarker={string(session?.localVideoStreamObject?.id)}
                isLocal={true}
              />
            </Animated.View>
          )}
        </View>

        {this.renderCallControls(session, panelSession, callMenuOpened)}

        {this.renderMenuDialogs(session, panelSession, callMenuOpened)}

        {session && (
          <CallAudio
            uiData={props.uiData}
            sessionId={string(session && session.sessionId)}
            streamMarker={string(
              session &&
                session.remoteStreamObject &&
                session.remoteStreamObject.id,
            )}
            isLocal={false}
            deviceId={audioTargetPreference}
          />
        )}

        {session && (
          <CallTimer
            startTime={int(
              session && session.rtcSession && +session.rtcSession.start_time,
            )}
          />
        )}
      </View>
    )
  }

  renderVideoOptionsButtons(videoClientSessionId) {
    const { props } = this
    return (
      <>
        <ButtonIconic
          style={styles.brCallVideoOptionsOptionsButton}
          onPress={() =>
            this.handleCallVideoOptionsOptionsButtonClick(videoClientSessionId)
          }
        >
          <MoreIcon width={24} height={24} color='#ffffff' />
        </ButtonIconic>

        <MenuBalloonDialog
          showing={
            props.uiData.showingDialogVersion ===
              this.state.callVideoOptionsMenuShowingDialogVersion &&
            videoClientSessionId ===
              this.state.callVideoOptionsMenuShowingDialogVideoClientSessionId
          }
          style={styles.brCallVideoOptionsMenuBalloon}
        >
          <MenuItem
            style={[
              styles.brCallVideoOptionsMenuItem,
              styles.brCallVideoOptionsHideMenuItem,
            ]}
            onPress={() =>
              this.handleCallVideoOptionsHideMenuItemClick(videoClientSessionId)
            }
          >
            <Text>{uawMsgs.LBL_CALL_VIDEO_OPTIONS_HIDE_MENU}</Text>
          </MenuItem>
        </MenuBalloonDialog>
      </>
    )
  }

  renderCallControls(session, panelSession, callMenuOpened) {
    const { props } = this
    const dtmfShortcutPreference = int(
      props.uiData.ucUiStore.getOptionalSetting({ key: ['dtmf_shortcut'] }),
    )

    return (
      <View style={styles.controlsContainer}>
        {/* Transfer Menu Button */}
        {(panelSession?.target || session) && dtmfShortcutPreference & 2 && (
          <View style={styles.buttonContainer}>
            <ButtonLabeled
              style={[
                styles.menuButton,
                styles.transferButton,
                !(
                  session?.sessionStatus === 'connected' &&
                  panelSession &&
                  (panelSession.holded || panelSession.transferring)
                ) && styles.disabled,
              ]}
              onPress={this.handleTransferMenuButtonClick}
            >
              <View style={styles.buttonContent}>
                <PhoneIcon width={32} height={32} />
                <ArrowRightIcon width={16} height={16} />
                {!this.state.headerButtonsCollapsible && (
                  <Text style={styles.buttonText}>
                    {uawMsgs.LBL_CALL_TRANSFER_MENU_BUTTON}
                  </Text>
                )}
                <View style={styles.menuIcon}>
                  {props.uiData.showingDialogVersion !==
                  this.state.transferMenuShowingDialogVersion ? (
                    <TriangleRightIcon width={24} height={24} />
                  ) : (
                    <TriangleLeftIcon width={24} height={24} />
                  )}
                </View>
                {props.uiData.showingDialogVersion !==
                this.state.transferMenuShowingDialogVersion ? (
                  <TriangleRightIcon width={24} height={24} />
                ) : (
                  <TriangleLeftIcon width={24} height={24} />
                )}
              </View>
            </ButtonLabeled>
          </View>
        )}

        {/* Hold Button */}
        {(panelSession?.target || session) && dtmfShortcutPreference & 1 && (
          <View style={styles.buttonContainer}>
            <ButtonLabeled
              style={[
                styles.menuButton,
                styles.holdButton,
                !(session?.sessionStatus === 'connected') && styles.disabled,
              ]}
              onPress={() =>
                props.uiData.fire(
                  'callHoldButton_onClick',
                  props.panelType,
                  props.panelCode,
                )
              }
            >
              <View style={styles.buttonContent}>
                <View style={styles.buttonIcon}>
                  <HoldIcon
                    width={24}
                    height={24}
                    color={panelSession?.holded ? '#FF5349' : undefined}
                  />
                </View>

                {!this.state.headerButtonsCollapsible && (
                  <Text style={styles.buttonText}>
                    {panelSession?.holded
                      ? uawMsgs.LBL_CALL_UNHOLD_BUTTON
                      : uawMsgs.LBL_CALL_HOLD_BUTTON}
                  </Text>
                )}
              </View>
            </ButtonLabeled>
          </View>
        )}

        {/* DTMF Menu Button */}
        {(panelSession?.target || session) && (
          <View style={styles.buttonContainer}>
            <ButtonLabeled
              style={[
                styles.menuButton,
                styles.dtmfButton,
                !session && styles.disabled,
              ]}
              onPress={this.handleDtmfMenuButtonClick}
            >
              <View style={styles.buttonContent}>
                <KeypadIcon width={32} height={32} />
                {!this.state.headerButtonsCollapsible && (
                  <Text style={styles.buttonText}>
                    {uawMsgs.LBL_CALL_DTMF_MENU_BUTTON}
                  </Text>
                )}
                <View>
                  {props.uiData.showingDialogVersion !==
                  this.state.dtmfMenuShowingDialogVersion ? (
                    <TriangleRightIcon width={24} height={24} />
                  ) : (
                    <TriangleLeftIcon width={24} height={24} />
                  )}
                </View>
              </View>
            </ButtonLabeled>
          </View>
        )}

        {/* Camera Controls */}
        {(panelSession?.target || session) && (
          <View style={styles.cameraControls}>
            <ButtonLabeled
              style={[
                styles.menuButton,
                styles.cameraButton,
                !session && styles.disabled,
              ]}
              onPress={() =>
                props.uiData.fire(
                  'callCameraMuteButton_onClick',
                  props.panelType,
                  props.panelCode,
                )
              }
            >
              <View style={styles.buttonContent}>
                <NoVideoIcon
                  width={24}
                  height={24}
                  color={panelSession?.cameraMuted ? '#FF5349' : undefined}
                />
                {!this.state.headerButtonsCollapsible && (
                  <Text style={styles.buttonText}>
                    {panelSession?.cameraMuted
                      ? uawMsgs.LBL_CALL_CAMERA_UNMUTE_BUTTON
                      : uawMsgs.LBL_CALL_CAMERA_MUTE_BUTTON}
                  </Text>
                )}
              </View>
            </ButtonLabeled>

            <ButtonLabeled
              style={[
                styles.menuButton,
                styles.cameraMenuButton,
                !session && styles.disabled,
              ]}
              onPress={this.handleCameraMenuButtonClick}
            >
              <View style={styles.menuButton}>
                {props.uiData.showingDialogVersion !==
                this.state.cameraMenuShowingDialogVersion ? (
                  <TriangleRightIcon width={24} height={24} />
                ) : (
                  <TriangleLeftIcon width={24} height={24} />
                )}
              </View>
            </ButtonLabeled>
          </View>
        )}

        {/* Microphone Controls */}
        {(panelSession?.target || session) && (
          <View style={styles.microphoneControls}>
            <ButtonLabeled
              style={[
                styles.menuButton,
                styles.microphoneButton,
                !session && styles.disabled,
              ]}
              onPress={() =>
                props.uiData.fire(
                  'callMuteButton_onClick',
                  props.panelType,
                  props.panelCode,
                  'main',
                )
              }
            >
              <View style={styles.buttonContent}>
                <BlockMicrophoneIcon
                  width={32}
                  height={32}
                  color={session?.muted?.main ? '#FF5349' : undefined}
                />
                {!this.state.headerButtonsCollapsible && (
                  <Text style={styles.buttonText}>
                    {session?.muted?.main
                      ? uawMsgs.LBL_CALL_MICROPHONE_UNMUTE_BUTTON
                      : uawMsgs.LBL_CALL_MICROPHONE_MUTE_BUTTON}
                  </Text>
                )}
              </View>
            </ButtonLabeled>

            {session?.analyser && (
              <CallMicrophoneLevel
                uiData={props.uiData}
                sessionId={session.sessionId}
              />
            )}
          </View>
        )}

        {/* Main Call Controls */}
        <View style={styles.mainControls}>
          <ButtonLabeled
            style={[
              styles.menuButton,
              styles.callMenuButton,
              !session && styles.disabled,
              !(panelSession?.target || session) && styles.hidden,
            ]}
            onPress={this.handleCallMenuButtonClick}
          >
            <ChevronDownIcon width={32} height={32} />
          </ButtonLabeled>

          <ButtonLabeled
            style={[
              styles.menuButton,
              styles.hangUpButton,
              !(panelSession?.target || session) && styles.hidden,
            ]}
            onPress={() =>
              props.uiData.fire(
                'callHangUpButton_onClick',
                props.panelType,
                props.panelCode,
              )
            }
          >
            <View style={styles.buttonIcon}>
              <EndCallIcon width={24} height={24} />
            </View>
          </ButtonLabeled>
        </View>
      </View>
    )
  }

  renderMenuDialogs(session, panelSession, callMenuOpened) {
    const { props } = this
    const dtmfShortcutPreference = int(
      props.uiData.ucUiStore.getOptionalSetting({ key: ['dtmf_shortcut'] }),
    )

    return (
      <>
        {/* Transfer Menu Dialog */}
        <MenuBalloonDialog
          showing={
            props.uiData.showingDialogVersion ===
              this.state.transferMenuShowingDialogVersion && callMenuOpened
          }
          style={styles.brTransferMenuBalloon}
        >
          <View style={styles.transferTargetArea}>
            <DropDownMenu
              uiData={props.uiData}
              style={styles.transferTargetUserMenu}
              dialogStyle={styles.transferTargetUserDialog}
              onShowingDialogUpdate={
                this.handleTransferMenuDropDownMenuShowingDialogUpdate
              }
            >
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
                      styles.transferTargetUserGroup,
                      groupName && styles.groupName,
                    ]}
                    onPress={() =>
                      this.handleTransferTargetUserGroupClick(groupName)
                    }
                  >
                    {this.state.transferTargetUserGroupOpen
                      .split(',')
                      .indexOf(groupName) !== -1 ? (
                      <ChevronUpIcon width={16} height={16} />
                    ) : (
                      <ChevronDownIcon width={16} height={16} />
                    )}
                    <Text style={styles.transferTargetUserGroupName}>
                      {groupName}
                    </Text>
                    {groupTable[groupName].buddyNodes}
                  </TouchableOpacity>
                ))}
            </DropDownMenu>

            <TextBox
              ref={this.transferTargetInputRef}
              style={styles.transferTargetInput}
              autoCapitalize='none'
              onSubmitEditing={this.handleTransferTargetInputSubmit}
            />
          </View>

          {/* Transfer Buttons */}
          <View style={styles.transferButtonsContainer}>
            <ButtonLabeled
              ref={this.transferTargetButtonRef}
              style={[
                styles.transferButton,
                styles.transferTargetButton,
                !(
                  session?.sessionStatus === 'connected' &&
                  panelSession?.holded &&
                  !panelSession?.transferring
                ) && styles.disabled,
              ]}
              ghost={true}
              onPress={this.handleTransferTargetButtonClick}
            >
              <PhoneIcon width={16} height={16} />
            </ButtonLabeled>

            <ButtonLabeled
              style={[
                styles.transferButton,
                styles.transferCompleteButton,
                !(
                  session?.sessionStatus === 'connected' &&
                  panelSession?.transferring
                ) && styles.disabled,
              ]}
              vivid={true}
              onPress={() =>
                props.uiData.fire(
                  'callHangUpButton_onClick',
                  props.panelType,
                  props.panelCode,
                )
              }
            >
              <View style={styles.transferIconContainer}>
                <PhoneIcon width={16} height={16} />
                <ArrowRightIcon width={16} height={16} />
              </View>
              <Text style={styles.transferButtonText}>
                {uawMsgs.LBL_CALL_TRANSFER_COMPLETE_BUTTON}
              </Text>
            </ButtonLabeled>

            {dtmfShortcutPreference & 8 && (
              <ButtonLabeled
                style={[
                  styles.transferButton,
                  styles.transferConferenceButton,
                  !(
                    session?.sessionStatus === 'connected' &&
                    panelSession?.transferring
                  ) && styles.disabled,
                ]}
                ghost={true}
                onPress={() =>
                  props.uiData.fire(
                    'callTransferConferenceButton_onClick',
                    props.panelType,
                    props.panelCode,
                  )
                }
              >
                <ConferenceForegroundSelectedIcon
                  width={16}
                  height={16}
                  color='#FFFFFF'
                />
                <Text style={styles.transferButtonText}>
                  {uawMsgs.LBL_CALL_TRANSFER_CONFERENCE_BUTTON}
                </Text>
              </ButtonLabeled>
            )}

            <ButtonLabeled
              style={[
                styles.transferButton,
                styles.transferCancelButton,
                !(
                  session?.sessionStatus === 'connected' &&
                  panelSession?.transferring
                ) && styles.disabled,
              ]}
              ghost={true}
              onPress={() =>
                props.uiData.fire(
                  'callHoldButton_onClick',
                  props.panelType,
                  props.panelCode,
                )
              }
            >
              <View style={styles.transferIconContainer}>
                <PhoneIcon width={16} height={16} />
                <View style={{ marginLeft: 4 }}>
                  <ArrowLeftIcon width={12} height={12} />
                </View>
              </View>
              <Text style={styles.transferButtonText}>
                {uawMsgs.LBL_CALL_TRANSFER_CANCEL_BUTTON}
              </Text>
            </ButtonLabeled>
          </View>
        </MenuBalloonDialog>

        {/* DTMF Menu Dialog */}
        <MenuBalloonDialog
          showing={
            props.uiData.showingDialogVersion ===
              this.state.dtmfMenuShowingDialogVersion && callMenuOpened
          }
          style={styles.dtmfMenuBalloon}
        >
          <Text style={styles.dtmfLog}>{this.state.dtmfLog}</Text>
          <View style={styles.dtmfButtonsGrid}>
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map(
              (tone, i) => (
                <ButtonLabeled
                  key={i}
                  style={[styles.dtmfButton, styles[`dtmfButton${i + 1}`]]}
                  ghost={true}
                  onPress={() => this.handleCallDtmfButtonClick(tone)}
                >
                  <Text style={styles.dtmfButtonText}>{tone}</Text>
                  <SoundAudio
                    uiData={props.uiData}
                    style={styles.dtmfSoundAudio}
                    src={`${CURRENT_SCRIPT_URL.DIR}../sounds/${
                      tone === '*' ? 'asterisk' : tone === '#' ? 'pound' : tone
                    }.mp3`}
                    playing={
                      tone === string(this.state.dtmfLog).slice(-1) &&
                      +new Date() - this.state.dtmfTime < 100
                    }
                    localStoragePreferenceKey='audioTarget'
                  />
                </ButtonLabeled>
              ),
            )}
          </View>
        </MenuBalloonDialog>

        {/* Camera Menu Dialog */}
        <MenuBalloonDialog
          showing={
            props.uiData.showingDialogVersion ===
              this.state.cameraMenuShowingDialogVersion && callMenuOpened
          }
          style={styles.cameraMenuBalloon}
        >
          <Text style={styles.deviceTitle}>
            {uawMsgs.LBL_CALL_CAMERA_CHANGE}
          </Text>
          <DropDownMenu
            uiData={props.uiData}
            style={[
              styles.deviceMenu,
              styles.videoInputMenu,
              panelSession?.isScreen && styles.disabled,
              !callMenuOpened && styles.hidden,
            ]}
            text={this.getDeviceLabel({
              deviceId: videoSourcePreference,
              kind: 'videoinput',
            })}
            onShowingDialogUpdate={
              this.handleCameraMenuDropDownMenuShowingDialogUpdate
            }
          >
            {this.state.devices
              .filter(device => device.kind === 'videoinput')
              .map(device => (
                <MenuItem
                  key={device.deviceId}
                  style={[styles.deviceMenuItem, styles.videoInputMenuItem]}
                  dropDown={true}
                  onPress={() =>
                    props.uiData.fire(
                      'callAreaChangeDeviceMenuItem_onClick',
                      props.panelType,
                      props.panelCode,
                      device,
                    )
                  }
                >
                  <Text>{this.getDeviceLabel(device)}</Text>
                </MenuItem>
              ))}
          </DropDownMenu>
        </MenuBalloonDialog>

        {/* Microphone Menu Dialog */}
        <MenuBalloonDialog
          showing={
            props.uiData.showingDialogVersion ===
              this.state.microphoneMenuShowingDialogVersion && callMenuOpened
          }
          style={styles.microphoneMenuBalloon}
        >
          {/* Audio Input Section */}
          <Text style={styles.deviceTitle}>
            {uawMsgs.LBL_CALL_MICROPHONE_CHANGE}
          </Text>
          <DropDownMenu
            uiData={props.uiData}
            style={[
              styles.deviceMenu,
              styles.audioInputMenu,
              !callMenuOpened && styles.hidden,
            ]}
            text={this.getDeviceLabel({
              deviceId: audioSourcePreference,
              kind: 'audioinput',
            })}
            onShowingDialogUpdate={
              this.handleMicrophoneMenuDropDownMenuShowingDialogUpdate
            }
          >
            {this.state.devices
              .filter(device => device.kind === 'audioinput')
              .map(device => (
                <MenuItem
                  key={device.deviceId}
                  style={[styles.deviceMenuItem, styles.audioInputMenuItem]}
                  dropDown={true}
                  onPress={() =>
                    props.uiData.fire(
                      'callAreaChangeDeviceMenuItem_onClick',
                      props.panelType,
                      props.panelCode,
                      device,
                    )
                  }
                >
                  <Text>{this.getDeviceLabel(device)}</Text>
                </MenuItem>
              ))}
          </DropDownMenu>

          {/* Audio Output Section */}
          <Text style={styles.deviceTitle}>
            {uawMsgs.LBL_CALL_SPEAKER_CHANGE}
          </Text>
          <DropDownMenu
            uiData={props.uiData}
            style={[
              styles.deviceMenu,
              styles.audioOutputMenu,
              !callMenuOpened && styles.hidden,
            ]}
            text={this.getDeviceLabel({
              deviceId: audioTargetPreference,
              kind: 'audiooutput',
            })}
            onShowingDialogUpdate={
              this.handleMicrophoneMenuDropDownMenuShowingDialogUpdate
            }
          >
            {this.state.devices
              .filter(device => device.kind === 'audiooutput')
              .map(device => (
                <MenuItem
                  key={device.deviceId}
                  style={[styles.deviceMenuItem, styles.audioOutputMenuItem]}
                  dropDown={true}
                  onPress={() =>
                    props.uiData.fire(
                      'callAreaChangeDeviceMenuItem_onClick',
                      props.panelType,
                      props.panelCode,
                      device,
                    )
                  }
                >
                  <Text>{this.getDeviceLabel(device)}</Text>
                </MenuItem>
              ))}
          </DropDownMenu>
        </MenuBalloonDialog>
      </>
    )
  }

  getVideoName(session, videoClientSessionId, buddyForVideoNameTable) {
    const { props } = this
    const videoClientSessionTable = session && session.videoClientSessionTable
    const videoClientSession =
      videoClientSessionTable && videoClientSessionTable[videoClientSessionId]
    const user = videoClientSession && videoClientSession.user
    return (user =>
      buddyForVideoNameTable[user] ||
      buddyForVideoNameTable[
        Object.keys(buddyForVideoNameTable).find(
          user_id => user.indexOf(string(user_id).replace('#', '')) !== -1,
        )
      ] ||
      user)(string(user))
  }
}
