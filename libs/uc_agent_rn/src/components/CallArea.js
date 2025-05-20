import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  findNodeHandle,
  UIManager,
  NativeModules,
  PanResponder,
  Animated,
} from 'react-native'
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
import ChevronDownIcon from '../icons/ChevronDownIcon.js'
import ChevronUpIcon from '../icons/ChevronUpIcon.js'
import ArrowRightIcon from '../icons/ArrowRightIcon.js'
import ArrowLeftIcon from '../icons/ArrowLeftIcon.js'
import EndCallIcon from '../icons/EndCallIcon.js'
import PhoneIcon from '../icons/PhoneIcon.js'
import ConferenceForegroundSelectedIcon from '../icons/ConferenceForegroundSelectedIcon.js'
import BlockMicrophoneIcon from '../icons/BlockMicrophoneIcon.js'
import ExpandIcon from '../icons/ExpandIcon.js'
import HoldIcon from '../icons/HoldIcon.js'
import KeypadIcon from '../icons/KeypadIcon.js'
import TriangleLeftIcon from '../icons/TriangleLeftIcon.js'
import TriangleRightIcon from '../icons/TriangleRightIcon.js'
import NoVideoIcon from '../icons/NoVideoIcon.js'
import MoreIcon from '../icons/MoreIcon.js'
import VideoCallIcon from '../icons/VideoCallIcon.js'

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
    this.state = {
      transferMenuShowingDialogVersion: null,
      dtmfMenuShowingDialogVersion: null,
      cameraMenuShowingDialogVersion: null,
      microphoneMenuShowingDialogVersion: null,
      callVideoOptionsMenuShowingDialogVersion: null,
      callVideoOptionsMenuShowingDialogVideoClientSessionId: null,
      callLocalVideoX: -40,
      callLocalVideoY: -40,
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
      height: 0,
    }

    // Create refs
    this.callAreaRef = React.createRef()
    this.callVideoAreaRef = React.createRef()
    this.callRemoteVideoRefs = {}

    // Create animated value for splitter position
    this.splitterPosition = new Animated.Value(0)

    // Initialize pan responder for drag functionality
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => {
        // Only capture touch events on the splitter area
        const { locationY } = evt.nativeEvent
        return locationY <= 10 // Capture touches within 10px of the top
      },
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Only capture move events if we started on the splitter
        const { locationY } = evt.nativeEvent
        return locationY <= 10
      },
      onPanResponderGrant: () => {
        this.splitterPosition.setOffset(this.splitterPosition._value)
        this.splitterPosition.setValue(0)
      },
      onPanResponderMove: (evt, gestureState) => {
        this.splitterPosition.setValue(gestureState.dy)
      },
      onPanResponderRelease: () => {
        this.splitterPosition.flattenOffset()
        const currentPosition = this.splitterPosition._value
        let newSplitterHeight = this.state.splitterHeight + currentPosition

        // Apply constraints
        if (this.callVideoAreaRef.current) {
          this.callVideoAreaRef.current.measure(
            (x, y, width, height, pageX, pageY) => {
              const maxHeight = height || 88
              const minHeight = Math.min(maxHeight, 88)
              newSplitterHeight = Math.max(minHeight, newSplitterHeight)
              newSplitterHeight = Math.min(maxHeight, newSplitterHeight)

              this.setState({ splitterHeight: newSplitterHeight })
              props.uiData.ucUiAction.setLocalStoragePreference({
                keyValueList: [
                  { key: 'callAreaHeight', value: string(newSplitterHeight) },
                ],
              })
            },
          )
        }
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

    if (this.callAreaRef.current) {
      this.callAreaRef.current.measure((x, y, width, height, pageX, pageY) => {
        const maxHeight = height || 88
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
                newState.splitterHeight = maxHeight
              }

              newState.height =
                newState.splitterHeight || this.state.splitterHeight
            } else {
              newState.height = maxHeight
            }
          } else {
            // audio only
            newState.height = minHeight
          }
        } else if (panelSession && panelSession.target) {
          // outgoing (session not created yet)
          newState.height = minHeight
        } else {
          // no call
          newState.height = 0
          if (this.state.dtmfTime) {
            newState.dtmfTime = 0
          }
          if (this.state.dtmfLog) {
            newState.dtmfLog = ''
          }
        }

        // Check for header buttons collapsible state
        if (width < 400 && !this.state.headerButtonsCollapsible) {
          newState.headerButtonsCollapsible = true
        } else if (width >= 400 && this.state.headerButtonsCollapsible) {
          newState.headerButtonsCollapsible = false
        }
      })
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
    console.log('#Duy Phan console componentDidUpdate')
  }

  componentWillUnmount() {
    const props = this.props
    if (props.uiData && props.uiData.ucUiAction) {
      props.uiData.ucUiAction.setLocalStoragePreference({
        keyValueList: [
          { key: 'callAreaHeight', value: string(this.state.splitterHeight) },
        ],
      })
    }
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
      if (this.transferTargetInputRef.current) {
        setTimeout(() => {
          if (this.transferTargetInputRef.current) {
            this.transferTargetInputRef.current.focus()
            this.transferTargetInputRef.current.select()
          }
        }, 0)
      }
    }
  }
  handleTransferMenuDropDownMenuShowingDialogUpdate() {
    const props = this.props
    this.setState({
      transferMenuShowingDialogVersion: props.uiData.showingDialogVersion,
    })
  }
  handleTransferTargetInputKeyDown(ev) {
    const props = this.props
    if (
      ev &&
      ev.nativeEvent &&
      ev.nativeEvent.key === 'Enter' &&
      !ev.nativeEvent.shiftKey
    ) {
      if (this.transferTargetInputRef.current) {
        props.uiData.fire(
          'callTransferButton_onClick',
          props.panelType,
          props.panelCode,
          string(this.transferTargetInputRef.current.value),
        )
      }
    }
  }
  handleTransferTargetButtonClick(ev) {
    const props = this.props
    if (this.transferTargetInputRef.current) {
      props.uiData.fire(
        'callTransferButton_onClick',
        props.panelType,
        props.panelCode,
        string(this.transferTargetInputRef.current.value),
      )
    }
  }
  handleTransferTargetUserGroupClick(groupName, ev) {
    const props = this.props
    if (ev && ev.nativeEvent && ev.nativeEvent.target) {
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
    if (this.transferTargetInputRef.current) {
      this.transferTargetInputRef.current.value = string(user_id)
      if (this.transferTargetButtonRef.current) {
        this.transferTargetButtonRef.current.focus()
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
    const props = this.props
    if (this.callVideoAreaRef.current) {
      try {
        NativeModules.FullScreenModule.enterFullScreen(
          this.callVideoAreaRef.current,
        )
        this.fullscreenEntered = true
      } catch (ex) {
        props.uiData.ucUiStore.getLogger().log('warn', ex)
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
    props.uiData.ucUiAction.setLocalStoragePreference({
      keyValueList: [{ key: 'callVideoOptionsHidden', value: 'true' }],
    })
    ev.stopPropagation()
  }
  handleCallVideoOptionsFullscreenButtonClick(videoClientSessionId, ev) {
    const props = this.props
    const videoRef = this.callRemoteVideoRefs[videoClientSessionId]
    if (videoRef && videoRef.current) {
      try {
        NativeModules.FullScreenModule.enterFullScreen(videoRef.current)
        this.fullscreenEntered = true
      } catch (ex) {
        props.uiData.ucUiStore.getLogger().log('warn', ex)
      }
    }
  }
  checkResized() {
    const props = this.props
    if (this.callAreaRef.current) {
      this.callAreaRef.current.measure((x, y, width, height, pageX, pageY) => {
        if (height !== this.lastHeight) {
          this.lastHeight = height
          if (typeof props.onResize === 'function') {
            props.onResize({ height: height })
          }
        }
      })
    }
  }
  render() {
    const props = this.props
    console.log(
      '#Duy Phan console props.uiData.ucUiAction',
      !!props.uiData.ucUiAction,
    )
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
        ref={this.callAreaRef}
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
          { height: this.state.height },
        ]}
        onLayout={this.handleTransitionEnd.bind(this)}
      >
        <View style={styles.brIncomingArea}>
          <View style={styles.brIncomingAnimation} />
          <View
            style={[
              styles.brIncomingImage,
              !buddy.profile_image_url && styles.brNoImage,
              buddy.profile_image_url &&
                string(buddy.profile_image_url).indexOf(
                  Constants.PROFILE_IMAGE_URL_DOWNLOAD,
                ) === -1 &&
                styles.brMyProfileImageUrl,
              buddy.profile_image_url
                ? { backgroundImage: `url(${buddy.profile_image_url})` }
                : {},
            ]}
          />
          <Text style={styles.brIncomingMessage}>
            {session && session.remoteWithVideo
              ? uawMsgs.LBL_CALL_INCOMING_WITH_VIDEO
              : uawMsgs.LBL_CALL_INCOMING}
          </Text>
          <ButtonIconic
            style={styles.brCallAnswerButton}
            title={uawMsgs.LBL_CALL_ANSWER_BUTTON_TOOLTIP}
            onPress={props.uiData.fire.bind(
              props.uiData,
              'callAnswerButton_onClick',
              props.panelType,
              props.panelCode,
              false,
            )}
            iconSource={<PhoneIcon />}
          >
            <View style={styles.brCallAnswerButtonIcon} />
          </ButtonIconic>
          <ButtonIconic
            style={styles.brCallAnswerWithVideoButton}
            title={uawMsgs.LBL_CALL_ANSWER_WITH_VIDEO_BUTTON_TOOLTIP}
            onPress={props.uiData.fire.bind(
              props.uiData,
              'callAnswerButton_onClick',
              props.panelType,
              props.panelCode,
              true,
            )}
            iconSource={<VideoCallIcon />}
          >
            <View style={styles.brCallAnswerButtonIcon} />
          </ButtonIconic>
          <ButtonIconic
            style={styles.brCallDeclineButton}
            title={uawMsgs.LBL_CALL_DECLINE_BUTTON_TOOLTIP}
            onPress={props.uiData.fire.bind(
              props.uiData,
              'callHangUpButton_onClick',
              props.panelType,
              props.panelCode,
            )}
            iconSource={<EndCallIcon />}
          >
            <View style={styles.brCallDeclineButtonIcon} />
          </ButtonIconic>
        </View>
        <SoundAudio
          uiData={props.uiData}
          className='brRingSoundAudio'
          src={
            (props.uiData.configurations &&
              props.uiData.configurations.alternativeRingTone) ||
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
          className='brRingbackSoundAudio'
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
        <SoundAudio
          uiData={props.uiData}
          className='brBeginedSoundAudio'
          src={CURRENT_SCRIPT_URL.DIR + '../sounds/tone1.mp3'}
          playing={
            isSafari && session && +new Date() - this.sessionBeginTime < 5000
          }
        />
        <SoundAudio
          uiData={props.uiData}
          className='brTerminatedSoundAudio'
          src={CURRENT_SCRIPT_URL.DIR + '../sounds/terminated.mp3'}
          playing={!session && +new Date() - this.sessionEndTime < 5000}
        />
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
              ref={ref =>
                (this.callRemoteVideoRefs[videoClientSessionId] = ref)
              }
              style={[
                styles.brCallRemoteVideo,
                {
                  width:
                    Math.floor(
                      100 / Math.ceil(Math.sqrt(videoClientSessionIds.length)),
                    ) + '%',
                  height:
                    Math.floor(
                      100 /
                        Math.ceil(
                          (Math.sqrt(4 * videoClientSessionIds.length + 1) -
                            1) /
                            2,
                        ),
                    ) + '%',
                },
              ]}
              onPress={this.handleCallRemoteVideoClick.bind(
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
              />
              <Text style={styles.brCallVideoName}>
                {(user =>
                  buddyForVideoNameTable[user] ||
                  buddyForVideoNameTable[
                    Object.keys(buddyForVideoNameTable).find(
                      user_id =>
                        user.indexOf(string(user_id).replace('#', '')) !== -1,
                    )
                  ] ||
                  user)(
                  string(
                    session &&
                      session.videoClientSessionTable &&
                      session.videoClientSessionTable[videoClientSessionId] &&
                      session.videoClientSessionTable[videoClientSessionId]
                        .user,
                  ),
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
                <ButtonIconic
                  style={styles.brCallVideoOptionsOptionsButton}
                  onPress={this.handleCallVideoOptionsOptionsButtonClick.bind(
                    this,
                    videoClientSessionId,
                  )}
                >
                  <View style={styles.brCallVideoOptionsOptionsButtonIcon}>
                    <MoreIcon />
                  </View>
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
                    style={styles.brCallVideoOptionsMenuItem}
                    onPress={this.handleCallVideoOptionsHideMenuItemClick.bind(
                      this,
                      videoClientSessionId,
                    )}
                  >
                    <Text>{uawMsgs.LBL_CALL_VIDEO_OPTIONS_HIDE_MENU}</Text>
                  </MenuItem>
                </MenuBalloonDialog>
                <ButtonIconic
                  style={styles.brCallVideoOptionsFullscreenButton}
                  onPress={this.handleCallVideoOptionsFullscreenButtonClick.bind(
                    this,
                    videoClientSessionId,
                  )}
                >
                  <View style={[styles.brCallVideoOptionsFullscreenButtonIcon]}>
                    {props.uiData.ownerDocument &&
                    props.uiData.ownerDocument.fullscreenElement &&
                    string(
                      props.uiData.ownerDocument.fullscreenElement.className,
                    ).indexOf('brCallRemoteVideo') !== -1 ? (
                      <CollapseIcon />
                    ) : (
                      <ExpandIcon />
                    )}
                  </View>
                </ButtonIconic>
              </View>
            </TouchableOpacity>
          ))}
          {session && session.localVideoStreamObject && (
            <View
              style={[
                styles.brCallLocalVideo,
                {
                  transform: [
                    { translateX: this.state.callLocalVideoX },
                    { translateY: this.state.callLocalVideoY },
                  ],
                },
              ]}
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
              />
            </View>
          )}
        </View>
        <View style={styles.brOutgoingAnimation} />
        <View
          style={[
            styles.brOutgoingImage,
            !buddy.profile_image_url && styles.brNoImage,
            buddy.profile_image_url &&
              string(buddy.profile_image_url).indexOf(
                Constants.PROFILE_IMAGE_URL_DOWNLOAD,
              ) === -1 &&
              styles.brMyProfileImageUrl,
            buddy.profile_image_url
              ? { backgroundImage: `url(${buddy.profile_image_url})` }
              : {},
          ]}
        />
        <Text style={styles.brOutgoingMessage}>
          {uawMsgs.LBL_CALL_OUTGOING}
        </Text>
        <CallTimer
          startTime={int(
            session && session.rtcSession && +session.rtcSession.start_time,
          )}
        />
        <ButtonIconic
          style={styles.brTheaterButton}
          hidden={!(session && session.withVideo)}
          onPress={props.uiData.fire.bind(
            props.uiData,
            'callAreaTheaterButton_onClick',
            props.panelType,
            props.panelCode,
          )}
        >
          <View style={[styles.brTheaterButtonIcon]}>
            {callAreaTheaterPreference ? <ChevronUpIcon /> : <ChevronUpIcon />}
          </View>
        </ButtonIconic>
        <Animated.View
          style={[
            styles.splitterHeight,
            {
              transform: [{ translateY: this.splitterPosition }],
            },
          ]}
          {...this.panResponder.panHandlers}
        />
        <View style={styles.brCallMenuItemButtonArea}>
          <ButtonLabeled
            style={[
              styles.brCallMenuItemButton,
              styles.brTransferMenuButton,
              !(
                session &&
                session.sessionStatus === 'connected' &&
                panelSession &&
                (panelSession.holded || panelSession.transferring)
              ) && styles.brDisabled,
            ]}
            title={uawMsgs.LBL_CALL_TRANSFER_MENU_BUTTON_TOOLTIP}
            onPress={this.handleTransferMenuButtonClick.bind(this)}
          >
            <View style={[styles.brCallMenuItemIcon]}>
              <PhoneIcon />
              <View style={[styles.brCallMenuItemIconIcon]}>
                <ArrowRightIcon />
              </View>
            </View>
            {!this.state.headerButtonsCollapsible && (
              <Text>{uawMsgs.LBL_CALL_TRANSFER_MENU_BUTTON}</Text>
            )}
            <View style={[styles.brCallMenuItemMenuIcon]}>
              {props.uiData.showingDialogVersion !==
              this.state.transferMenuShowingDialogVersion ? (
                <TriangleRightIcon />
              ) : (
                <TriangleLeftIcon />
              )}
            </View>
          </ButtonLabeled>
        </View>
        <View style={styles.brCallMenuItemButtonArea}>
          <ButtonLabeled
            style={[
              styles.brCallMenuItemButton,
              styles.brHoldButton,
              !(session && session.sessionStatus === 'connected') &&
                styles.brDisabled,
            ]}
            title={
              panelSession && panelSession.holded
                ? uawMsgs.LBL_CALL_UNHOLD_BUTTON_TOOLTIP
                : uawMsgs.LBL_CALL_HOLD_BUTTON_TOOLTIP
            }
            onPress={props.uiData.fire.bind(
              props.uiData,
              'callHoldButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          >
            <View
              style={[
                styles.brCallMenuItemIcon,

                panelSession && panelSession.holded && styles.brHolded,
              ]}
            >
              <HoldIcon />
            </View>
            <Text>
              {!this.state.headerButtonsCollapsible &&
                (panelSession && panelSession.holded
                  ? uawMsgs.LBL_CALL_UNHOLD_BUTTON
                  : uawMsgs.LBL_CALL_HOLD_BUTTON)}
            </Text>
          </ButtonLabeled>
        </View>
        <View style={styles.brCallMenuItemButtonArea}>
          <ButtonLabeled
            style={[
              styles.brCallMenuItemButton,
              styles.brDtmfMenuButton,
              !session && styles.brDisabled,
            ]}
            title={uawMsgs.LBL_CALL_DTMF_MENU_BUTTON_TOOLTIP}
            onPress={this.handleDtmfMenuButtonClick.bind(this)}
          >
            <View style={[styles.brCallMenuItemIcon]}>
              <KeypadIcon />
            </View>
            {!this.state.headerButtonsCollapsible && (
              <Text>{uawMsgs.LBL_CALL_DTMF_MENU_BUTTON}</Text>
            )}
            <View style={[styles.brCallMenuItemMenuIcon]}>
              {props.uiData.showingDialogVersion !==
              this.state.dtmfMenuShowingDialogVersion ? (
                <TriangleRightIcon />
              ) : (
                <TriangleLeftIcon />
              )}
            </View>
          </ButtonLabeled>
        </View>
        <View style={styles.brCallMenuItemButtonArea}>
          <ButtonLabeled
            style={[
              styles.brCallMenuItemButton,
              styles.brFullscreenButton,
              !(session && session.withVideo) && styles.brDisabled,
            ]}
            title={uawMsgs.LBL_CALL_FULLSCREEN_BUTTON_TOOLTIP}
            onPress={this.handleFullscreenButtonClick.bind(this)}
          >
            <View style={[styles.brCallMenuItemIcon]}>
              <ExpandIcon />
            </View>
            {!this.state.headerButtonsCollapsible && (
              <Text>{uawMsgs.LBL_CALL_FULLSCREEN_BUTTON}</Text>
            )}
          </ButtonLabeled>
        </View>
        <View style={styles.brCallMenuItemButtonArea}>
          <ButtonLabeled
            style={[
              styles.brCallMenuItemButton,
              styles.brCameraMuteButton,
              !session && styles.brDisabled,
            ]}
            title={
              panelSession && panelSession.cameraMuted
                ? uawMsgs.LBL_CALL_CAMERA_UNMUTE_BUTTON_TOOLTIP
                : uawMsgs.LBL_CALL_CAMERA_MUTE_BUTTON_TOOLTIP
            }
            onPress={props.uiData.fire.bind(
              props.uiData,
              'callCameraMuteButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          >
            <View
              style={[
                styles.brCallMenuItemIcon,
                panelSession && panelSession.cameraMuted && styles.brMuted,
              ]}
            >
              <NoVideoIcon />
            </View>
            {!this.state.headerButtonsCollapsible && (
              <Text>
                {panelSession && panelSession.cameraMuted
                  ? uawMsgs.LBL_CALL_CAMERA_UNMUTE_BUTTON
                  : uawMsgs.LBL_CALL_CAMERA_MUTE_BUTTON}
              </Text>
            )}
          </ButtonLabeled>
          <ButtonLabeled
            style={[
              styles.brCallMenuItemButton,
              styles.brCameraMenuButton,
              !session && styles.brDisabled,
            ]}
            title={uawMsgs.LBL_CALL_CAMERA_MENU_BUTTON_TOOLTIP}
            onPress={this.handleCameraMenuButtonClick.bind(this)}
          >
            <View style={[styles.brCallMenuItemMenuIcon]}>
              {props.uiData.showingDialogVersion !==
              this.state.cameraMenuShowingDialogVersion ? (
                <TriangleRightIcon />
              ) : (
                <TriangleLeftIcon />
              )}
            </View>
          </ButtonLabeled>
          <View style={styles.brCallMenuItemButtonAreaSeparator} />
        </View>
        <View style={styles.brCallMenuItemButtonArea}>
          <ButtonLabeled
            style={[
              styles.brCallMenuItemButton,
              styles.brMicrophoneMuteButton,
              !session && styles.brDisabled,
            ]}
            title={
              session && session.muted && session.muted.main
                ? uawMsgs.LBL_CALL_MICROPHONE_UNMUTE_BUTTON_TOOLTIP
                : uawMsgs.LBL_CALL_MICROPHONE_MUTE_BUTTON_TOOLTIP
            }
            onPress={props.uiData.fire.bind(
              props.uiData,
              'callMuteButton_onClick',
              props.panelType,
              props.panelCode,
              'main',
            )}
          >
            <View
              style={[
                styles.brCallMenuItemIcon,
                session &&
                  session.muted &&
                  session.muted.main &&
                  styles.brMuted,
              ]}
            >
              <BlockMicrophoneIcon />
            </View>
            {!this.state.headerButtonsCollapsible && (
              <Text>
                {session && session.muted && session.muted.main
                  ? uawMsgs.LBL_CALL_MICROPHONE_UNMUTE_BUTTON
                  : uawMsgs.LBL_CALL_MICROPHONE_MUTE_BUTTON}
              </Text>
            )}
          </ButtonLabeled>
          <ButtonLabeled
            style={[
              styles.brCallMenuItemButton,
              styles.brMicrophoneMenuButton,
              !session && styles.brDisabled,
            ]}
            title={uawMsgs.LBL_CALL_MICROPHONE_MENU_BUTTON_TOOLTIP}
            onPress={this.handleMicrophoneMenuButtonClick.bind(this)}
          >
            <View style={[styles.brCallMenuItemMenuIcon]}>
              {props.uiData.showingDialogVersion !==
              this.state.microphoneMenuShowingDialogVersion ? (
                <TriangleRightIcon />
              ) : (
                <TriangleLeftIcon />
              )}
            </View>
          </ButtonLabeled>
          {session && session.analyser && (
            <CallMicrophoneLevel
              uiData={props.uiData}
              sessionId={string(session && session.sessionId)}
            />
          )}
          <View style={styles.brCallMenuItemButtonAreaSeparator} />
        </View>
        <MenuBalloonDialog
          showing={
            props.uiData.showingDialogVersion ===
              this.state.transferMenuShowingDialogVersion && callMenuOpened
          }
          style={styles.brTransferMenuBalloon}
        >
          <View style={styles.brTransferTargetArea}>
            <DropDownMenu
              uiData={props.uiData}
              style={styles.brTransferTargetUserMenu}
              dialogStyle={styles.brCallAreaDialog}
              onShowingDialogUpdate={this.handleTransferMenuDropDownMenuShowingDialogUpdate.bind(
                this,
              )}
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
                      styles.brTransferTargetUserGroup,
                      groupName && styles.brGroupName,
                    ]}
                    onPress={this.handleTransferTargetUserGroupClick.bind(
                      this,
                      groupName,
                    )}
                  >
                    <View style={[styles.brTransferTargetUserGroupIcon]}>
                      {this.state.transferTargetUserGroupOpen
                        .split(',')
                        .indexOf(groupName) !== -1 ? (
                        <ChevronUpIcon />
                      ) : (
                        <ChevronDownIcon />
                      )}
                    </View>
                    <Text style={styles.brTransferTargetUserGroupName}>
                      {groupName}
                    </Text>
                    {groupTable[groupName].buddyNodes}
                  </TouchableOpacity>
                ))}
            </DropDownMenu>
            <TextBox
              ref={this.transferTargetInputRef}
              style={styles.brTransferTargetInput}
              autoCapitalize='off'
              onKeyPress={this.handleTransferTargetInputKeyDown.bind(this)}
            />
          </View>
          <ButtonLabeled
            ref={this.transferTargetButtonRef}
            style={[styles.brTransferButton, styles.brTransferTargetButton]}
            disabled={
              !(
                session &&
                session.sessionStatus === 'connected' &&
                panelSession &&
                panelSession.holded &&
                !panelSession.transferring
              )
            }
            ghost={true}
            title={uawMsgs.LBL_CALL_TRANSFER_TARGET_BUTTON_TOOLTIP}
            onPress={this.handleTransferTargetButtonClick.bind(this)}
          >
            <View style={[styles.brTransferIcon]}>
              <PhoneIcon />
              <View style={[styles.brTransferIconIcon]}>
                <ArrowRightIcon />
              </View>
            </View>
          </ButtonLabeled>
          <ButtonLabeled
            style={[styles.brTransferButton, styles.brTransferCompleteButton]}
            disabled={
              !(
                session &&
                session.sessionStatus === 'connected' &&
                panelSession &&
                panelSession.transferring
              )
            }
            vivid={true}
            title={uawMsgs.LBL_CALL_TRANSFER_COMPLETE_BUTTON_TOOLTIP}
            onPress={props.uiData.fire.bind(
              props.uiData,
              'callHangUpButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          >
            <View style={[styles.brTransferIcon]}>
              <PhoneIcon />
              <View style={[styles.brTransferIconIcon]}>
                <ArrowRightIcon />
              </View>
            </View>
            <Text>{uawMsgs.LBL_CALL_TRANSFER_COMPLETE_BUTTON}</Text>
          </ButtonLabeled>
          <ButtonLabeled
            style={[styles.brTransferButton, styles.brTransferConferenceButton]}
            disabled={
              !(
                session &&
                session.sessionStatus === 'connected' &&
                panelSession &&
                panelSession.transferring
              )
            }
            hidden={!(dtmfShortcutPreference & 8)}
            ghost={true}
            title={uawMsgs.LBL_CALL_TRANSFER_CONFERENCE_BUTTON_TOOLTIP}
            onPress={props.uiData.fire.bind(
              props.uiData,
              'callTransferConferenceButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          >
            <View style={[styles.brTransferIcon]}>
              <ConferenceForegroundSelectedIcon />
            </View>
            <Text>{uawMsgs.LBL_CALL_TRANSFER_CONFERENCE_BUTTON}</Text>
          </ButtonLabeled>
          <ButtonLabeled
            style={[styles.brTransferButton, styles.brTransferCancelButton]}
            disabled={
              !(
                session &&
                session.sessionStatus === 'connected' &&
                panelSession &&
                panelSession.transferring
              )
            }
            ghost={true}
            title={uawMsgs.LBL_CALL_TRANSFER_CANCEL_BUTTON_TOOLTIP}
            onPress={props.uiData.fire.bind(
              props.uiData,
              'callHoldButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          >
            <View style={[styles.brTransferIcon]}>
              <PhoneIcon />
              <View style={[styles.brTransferIconIcon]}>
                <ArrowLeftIcon />
              </View>
            </View>
            <Text>{uawMsgs.LBL_CALL_TRANSFER_CANCEL_BUTTON}</Text>
          </ButtonLabeled>
        </MenuBalloonDialog>
        <MenuBalloonDialog
          showing={
            props.uiData.showingDialogVersion ===
              this.state.dtmfMenuShowingDialogVersion && callMenuOpened
          }
          style={styles.brDtmfMenuBalloon}
        >
          <Text style={styles.brDtmfLog}>{this.state.dtmfLog}</Text>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map(
            (tone, i) => (
              <ButtonLabeled
                key={i}
                style={[
                  styles.brCallDtmfButton,
                  styles[`brCallDtmfButton${i + 1}`],
                ]}
                ghost={true}
                title={tone}
                onPress={this.handleCallDtmfButtonClick.bind(this, tone)}
              >
                <Text>{tone}</Text>
                <SoundAudio
                  uiData={props.uiData}
                  style={styles.brDtmfSoundAudio}
                  src={
                    CURRENT_SCRIPT_URL.DIR +
                    '../sounds/' +
                    (tone === '*'
                      ? 'asterisk'
                      : tone === '#'
                        ? 'pound'
                        : tone) +
                    '.mp3'
                  }
                  playing={
                    tone === string(this.state.dtmfLog).slice(-1) &&
                    +new Date() - this.state.dtmfTime < 100
                  }
                  localStoragePreferenceKey='audioTarget'
                />
              </ButtonLabeled>
            ),
          )}
        </MenuBalloonDialog>
        <MenuBalloonDialog
          showing={
            props.uiData.showingDialogVersion ===
              this.state.cameraMenuShowingDialogVersion && callMenuOpened
          }
          style={styles.brCameraMenuBalloon}
        >
          <Text
            style={[styles.brChangeDeviceTitle, styles.brChangeVideoinputTitle]}
          >
            {uawMsgs.LBL_CALL_CAMERA_CHANGE}
          </Text>
          <DropDownMenu
            uiData={props.uiData}
            style={[styles.brChangeDeviceMenu, styles.brChangeVideoinputMenu]}
            disabled={panelSession && panelSession.isScreen}
            hidden={!callMenuOpened}
            text={this.getDeviceLabel({
              deviceId: videoSourcePreference,
              kind: 'videoinput',
            })}
            onShowingDialogUpdate={this.handleCameraMenuDropDownMenuShowingDialogUpdate.bind(
              this,
            )}
          >
            {this.state.devices
              .filter(device => device.kind === 'videoinput')
              .map(device => (
                <MenuItem
                  key={device.deviceId}
                  style={[
                    styles.brChangeDeviceMenuItem,
                    styles.brChangeVideoinputMenuItem,
                  ]}
                  dropDown={true}
                  onPress={props.uiData.fire.bind(
                    props.uiData,
                    'callAreaChangeDeviceMenuItem_onClick',
                    props.panelType,
                    props.panelCode,
                    device,
                  )}
                >
                  <Text>{this.getDeviceLabel(device)}</Text>
                </MenuItem>
              ))}
          </DropDownMenu>
        </MenuBalloonDialog>
        <MenuBalloonDialog
          showing={
            props.uiData.showingDialogVersion ===
              this.state.microphoneMenuShowingDialogVersion && callMenuOpened
          }
          style={styles.brMicrophoneMenuBalloon}
        >
          <Text
            style={[styles.brChangeDeviceTitle, styles.brChangeAudioinputTitle]}
          >
            {uawMsgs.LBL_CALL_MICROPHONE_CHANGE}
          </Text>
          <DropDownMenu
            uiData={props.uiData}
            style={[styles.brChangeDeviceMenu, styles.brChangeAudioinputMenu]}
            hidden={!callMenuOpened}
            text={this.getDeviceLabel({
              deviceId: audioSourcePreference,
              kind: 'audioinput',
            })}
            onShowingDialogUpdate={this.handleMicrophoneMenuDropDownMenuShowingDialogUpdate.bind(
              this,
            )}
          >
            {this.state.devices
              .filter(device => device.kind === 'audioinput')
              .map(device => (
                <MenuItem
                  key={device.deviceId}
                  style={[
                    styles.brChangeDeviceMenuItem,
                    styles.brChangeAudioinputMenuItem,
                  ]}
                  dropDown={true}
                  onPress={props.uiData.fire.bind(
                    props.uiData,
                    'callAreaChangeDeviceMenuItem_onClick',
                    props.panelType,
                    props.panelCode,
                    device,
                  )}
                >
                  <Text>{this.getDeviceLabel(device)}</Text>
                </MenuItem>
              ))}
          </DropDownMenu>
          <Text
            style={[
              styles.brChangeDeviceTitle,
              styles.brChangeAudiooutputTitle,
            ]}
          >
            {uawMsgs.LBL_CALL_SPEAKER_CHANGE}
          </Text>
          <DropDownMenu
            uiData={props.uiData}
            style={[styles.brChangeDeviceMenu, styles.brChangeAudiooutputMenu]}
            hidden={!callMenuOpened}
            text={this.getDeviceLabel({
              deviceId: audioTargetPreference,
              kind: 'audiooutput',
            })}
            onShowingDialogUpdate={this.handleMicrophoneMenuDropDownMenuShowingDialogUpdate.bind(
              this,
            )}
          >
            {this.state.devices
              .filter(device => device.kind === 'audiooutput')
              .map(device => (
                <MenuItem
                  key={device.deviceId}
                  style={[
                    styles.brChangeDeviceMenuItem,
                    styles.brChangeAudiooutputMenuItem,
                  ]}
                  dropDown={true}
                  onPress={props.uiData.fire.bind(
                    props.uiData,
                    'callAreaChangeDeviceMenuItem_onClick',
                    props.panelType,
                    props.panelCode,
                    device,
                  )}
                >
                  <Text>{this.getDeviceLabel(device)}</Text>
                </MenuItem>
              ))}
          </DropDownMenu>
        </MenuBalloonDialog>
        <ButtonLabeled
          style={styles.brCallMenuButton}
          disabled={!session}
          hidden={!((panelSession && panelSession.target) || session)}
          vivid={true}
          title={uawMsgs.LBL_CALL_MENU_BUTTON_TOOLTIP}
          onPress={this.handleCallMenuButtonClick.bind(this)}
        >
          <View style={[styles.brCallMenuIcon]}>
            <ChevronDownIcon />
          </View>
        </ButtonLabeled>
        <ButtonLabeled
          style={styles.brCallHangUpButton}
          hidden={!((panelSession && panelSession.target) || session)}
          title={uawMsgs.LBL_CALL_HANG_UP_BUTTON_TOOLTIP}
          onPress={props.uiData.fire.bind(
            props.uiData,
            'callHangUpButton_onClick',
            props.panelType,
            props.panelCode,
          )}
        >
          <View style={[styles.brCallHangUpIcon]}>
            <EndCallIcon />
          </View>
        </ButtonLabeled>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  brCallArea: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    height: 0,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5', // @hint_gray
    transition: 'height 0.3s 1s',
  },
  brWithTarget: {
    transition: 'height 0.3s',
  },
  brWithSession: {
    transition: 'none',
    overflow: 'visible',
  },
  brIncomingProgress: {
    position: 'static',
  },
  brIncomingArea: {
    display: 'none',
    position: 'absolute',
    width: 160,
    height: 200,
    left: '50%',
    top: '50%',
    transform: [{ translateX: -80 }, { translateY: -100 }],
    borderRadius: 4,
    backgroundColor: '#F5F5F5',
  },
  brIncomingAnimation: {
    position: 'absolute',
    left: 61,
    top: 41,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#48D1CC', // @medium_turquoise
  },
  brIncomingImage: {
    position: 'absolute',
    left: 60,
    top: 40,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  brNoImage: {
    backgroundImage: 'url(../img/noimage.png)',
  },
  brMyProfileImageUrl: {
    backgroundSize: 'cover',
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
    lineHeight: 16,
    letterSpacing: 0.3,
  },
  brCallAnswerButton: {
    position: 'absolute',
    left: 16,
    top: 140,
    backgroundColor: '#74C365', // @mantis
  },
  brCallAnswerButtonIcon: {
    display: 'flex',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    tintColor: '#FFFFFF',
  },
  brCallAnswerWithVideoButton: {
    position: 'absolute',
    left: 64,
    top: 140,
    backgroundColor: '#74C365',
  },
  brCallDeclineButton: {
    position: 'absolute',
    left: 112,
    top: 140,
    backgroundColor: '#FF5A36', // @portland_orange
  },
  brCallDeclineButtonIcon: {
    display: 'flex',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    tintColor: '#FFFFFF',
  },
  brCallVideoArea: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 8,
  },
  brTheater: {
    bottom: 0,
  },
  brCallLocalVideo: {
    position: 'absolute',
    right: 0,
    width: '20%',
    bottom: 0,
    height: '20%',
  },
  brCallRemoteVideo: {
    display: 'flex',
    position: 'relative',
  },
  brMultiRemoteVideo: {
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: 'rgba(128, 128, 128, 0.5)',
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
    lineHeight: 20,
    letterSpacing: 0.3,
  },
  brCallVideoOptionsPanel: {
    position: 'absolute',
    left: 0,
    width: '100%',
    top: 0,
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    opacity: 0,
    transition: 'opacity 1s',
  },
  brHidden: {
    display: 'none',
  },
  brVisible: {
    opacity: 1,
    transition: 'opacity 0.3s',
  },
  brEnabled: {
    pointerEvents: 'auto',
  },
  brCallVideoOptionsOptionsButton: {
    position: 'absolute',
    left: 8,
    bottom: 8,
  },
  brCallVideoOptionsOptionsButtonIcon: {
    display: 'flex',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    tintColor: '#FFFFFF',
  },
  brCallVideoOptionsFullscreenButton: {
    position: 'absolute',
    right: 48,
    bottom: 8,
  },
  brCallVideoOptionsFullscreenButtonIcon: {
    display: 'flex',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    tintColor: '#FFFFFF',
  },
  brCallVideoOptionsMenuBalloon: {
    position: 'absolute',
    left: 8,
    bottom: 40,
  },
  brOutgoingAnimation: {
    display: 'none',
    position: 'absolute',
    right: 25,
    top: 25,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#48D1CC',
  },
  brOutgoingImage: {
    display: 'none',
    position: 'absolute',
    right: 24,
    top: 24,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  brOutgoingMessage: {
    display: 'none',
    position: 'absolute',
    right: 12,
    top: 32,
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.3,
  },
  brCallTimer: {
    position: 'absolute',
    right: 12,
    top: 32,
  },
  brTheaterButton: {
    position: 'absolute',
    right: 8,
    bottom: 16,
  },
  brTheaterButtonIcon: {
    display: 'flex',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    tintColor: '#FFFFFF',
  },
  brSplitterHeight: {
    height: 8,
    backgroundColor: '#E5E5E5',
    width: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1,
  },
  brCallMenuItemButtonArea: {
    position: 'absolute',
    left: 24,
    top: 16,
    width: 160,
    height: 0,
    borderRadius: 4,
    overflow: 'hidden',
    transition: 'top 0.3s, height 0s 0.3s',
  },
  brOpened: {
    height: 32,
    shadowColor: '#E5E4E2',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    transition: 'top 0.3s',
  },
  brHeaderButtonsCollapsible: {
    width: 72,
  },
  brTransferMenuButton: {
    top: 280,
  },
  brHoldButton: {
    top: 240,
  },
  brDtmfMenuButton: {
    top: 200,
  },
  brFullscreenButton: {
    top: 160,
  },
  brCameraButton: {
    top: 120,
  },
  brMicrophoneButton: {
    top: 80,
  },
  brCallMenuItemButton: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 0,
    color: '#1A472A',
    backgroundColor: '#FFFFFF',
  },
  brDisabled: {
    color: '#B8B8B8',
    backgroundColor: '#FFFFFF',
  },
  brCameraMenuButton: {
    right: 0,
    width: 34,
  },
  brMicrophoneMenuButton: {
    right: 0,
    width: 34,
  },
  brCallMenuItemButtonAreaSeparator: {
    position: 'absolute',
    right: 34,
    width: 3,
    top: 0,
    bottom: 0,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    backgroundColor: '#E5E4E2',
  },
  brCallMenuButton: {
    position: 'absolute',
    left: 24,
    top: 16,
    width: 72,
    height: 40,
  },
  brCallMenuIcon: {
    display: 'flex',
    position: 'absolute',
    left: 16,
    top: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 32,
    tintColor: '#FFFFFF',
    transform: [{ rotate: '0deg' }],
  },
  brCallHangUpButton: {
    position: 'absolute',
    left: 112,
    top: 16,
    width: 72,
    height: 40,
    backgroundColor: '#FF5A36',
  },
  brCallHangUpIcon: {
    display: 'flex',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 32,
    tintColor: '#FFFFFF',
  },
})
