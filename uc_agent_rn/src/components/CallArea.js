import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ReactDOM from 'react-dom'
import Draggable from 'react-draggable'
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
    }
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
    const node = ReactDOM.findDOMNode(this)
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
        node.style.height = '0px'
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
            node.style.height =
              (newState.splitterHeight || this.state.splitterHeight) + 'px'
          } else {
            node.style.height = maxHeight + 'px'
          }
        } else {
          // audio only
          node.style.height = minHeight + 'px'
        }
      } else if (panelSession && panelSession.target) {
        // outgoing (session not created yet)
        node.style.height = minHeight + 'px'
      } else {
        // no call
        node.style.height = '0px'
        if (this.state.dtmfTime) {
          newState.dtmfTime = 0
        }
        if (this.state.dtmfLog) {
          newState.dtmfLog = ''
        }
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
    if (
      node &&
      node.clientWidth < 400 &&
      !this.state.headerButtonsCollapsible
    ) {
      newState.headerButtonsCollapsible = true
    } else if (
      node &&
      node.clientWidth >= 400 &&
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
      const input = ReactDOM.findDOMNode(this.refs['transferTargetInput'])
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
  handleTransferTargetInputKeyDown(ev) {
    const props = this.props
    if (ev && ev.keyCode === 13 && !ev.shiftKey) {
      const input = ev.target
      if (input && input.value) {
        props.uiData.fire(
          'callTransferButton_onClick',
          props.panelType,
          props.panelCode,
          string(input.value),
        )
      }
    }
  }
  handleTransferTargetButtonClick(ev) {
    const props = this.props
    const input = ReactDOM.findDOMNode(this.refs['transferTargetInput'])
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
    const input = ReactDOM.findDOMNode(this.refs['transferTargetInput'])
    if (input) {
      input.value = string(user_id)
      const button = ReactDOM.findDOMNode(this.refs['transferTargetButton'])
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
  checkResized() {
    const props = this.props
    const node = ReactDOM.findDOMNode(this)
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
    const props = this.props
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
      <div
        className={
          'brCallArea' +
          (this.state.headerButtonsCollapsible
            ? ' brHeaderButtonsCollapsible'
            : '') +
          (panelSession && panelSession.target ? ' brWithTarget' : '') +
          (session ? ' brWithSession' : '') +
          (session && session.withVideo ? ' brWithVideo' : '') +
          (session &&
          session.rtcSession &&
          session.rtcSession.direction === 'outgoing' &&
          session.sessionStatus === 'dialing'
            ? ' brOutgoingDialing'
            : '') +
          (session &&
          session.rtcSession &&
          session.rtcSession.direction === 'outgoing' &&
          session.sessionStatus === 'progress'
            ? ' brOutgoingProgress'
            : '') +
          (session &&
          session.rtcSession &&
          session.rtcSession.direction === 'incoming' &&
          session.sessionStatus === 'progress' &&
          !session.answering
            ? ' brIncomingProgress'
            : '') +
          (callAreaTheaterPreference ? ' brTheater' : '') +
          (callMenuOpened ? ' brOpened' : ' brClosed')
        }
        onTransitionEnd={this.handleTransitionEnd.bind(this)}
      >
        <div className='brIncomingArea'>
          <div className='brIncomingAnimation'></div>
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
          <div className='brIncomingMessage'>
            {session && session.remoteWithVideo
              ? uawMsgs.LBL_CALL_INCOMING_WITH_VIDEO
              : uawMsgs.LBL_CALL_INCOMING}
          </div>
          <ButtonIconic
            className='brCallAnswerButton'
            title={uawMsgs.LBL_CALL_ANSWER_BUTTON_TOOLTIP}
            onClick={props.uiData.fire.bind(
              props.uiData,
              'callAnswerButton_onClick',
              props.panelType,
              props.panelCode,
              false,
            )}
          >
            <span className='brCallAnswerButtonIcon br_bi_icon_phone_svg'></span>
          </ButtonIconic>
          <ButtonIconic
            className='brCallAnswerWithVideoButton'
            title={uawMsgs.LBL_CALL_ANSWER_WITH_VIDEO_BUTTON_TOOLTIP}
            onClick={props.uiData.fire.bind(
              props.uiData,
              'callAnswerButton_onClick',
              props.panelType,
              props.panelCode,
              true,
            )}
          >
            <span className='brCallAnswerButtonIcon br_bi_icon_video_call_svg'></span>
          </ButtonIconic>
          <ButtonIconic
            className='brCallDeclineButton'
            title={uawMsgs.LBL_CALL_DECLINE_BUTTON_TOOLTIP}
            onClick={props.uiData.fire.bind(
              props.uiData,
              'callHangUpButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          >
            <span className='brCallDeclineButtonIcon br_bi_icon_end_call_svg'></span>
          </ButtonIconic>
        </div>
        <SoundAudio
          uiData={props.uiData}
          className='brRingSoundAudio'
          src={
            (props.uiData.configurations &&
              props.uiData.configurations.alternativeRingTone) ||
            CURRENT_SCRIPT_URL.DIR + '../../../sounds/ring.mp3'
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
          src={CURRENT_SCRIPT_URL.DIR + '../../../sounds/ringback.mp3'}
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
          src={CURRENT_SCRIPT_URL.DIR + '../../../sounds/tone1.mp3'}
          playing={
            isSafari && session && +new Date() - this.sessionBeginTime < 5000
          }
        />
        <SoundAudio
          uiData={props.uiData}
          className='brTerminatedSoundAudio'
          src={CURRENT_SCRIPT_URL.DIR + '../../../sounds/terminated.mp3'}
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
        <div
          ref='callVideoArea'
          className={
            'brCallVideoArea' +
            (videoClientSessionIds.length >= 2 ? ' brMultiRemoteVideo' : '')
          }
        >
          {videoClientSessionIds
            .map(videoClientSessionId => (
              <div
                key={videoClientSessionId}
                ref={'callRemoteVideo' + videoClientSessionId}
                className='brCallRemoteVideo'
                style={{
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
                }}
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
                />
                <div className='brCallVideoName'>
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
                </div>
                <div
                  className={
                    'brCallVideoOptionsPanel' +
                    (callVideoOptionsHiddenPreference ? ' brHidden' : '') +
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
                    className='brCallVideoOptionsOptionsButton'
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
                      className='brCallVideoOptionsMenuItem brCallVideoOptionsHideMenuItem'
                      onClick={this.handleCallVideoOptionsHideMenuItemClick.bind(
                        this,
                        videoClientSessionId,
                      )}
                    >
                      {uawMsgs.LBL_CALL_VIDEO_OPTIONS_HIDE_MENU}
                    </MenuItem>
                  </MenuBalloonDialog>
                  <ButtonIconic
                    className='brCallVideoOptionsFullscreenButton'
                    onClick={this.handleCallVideoOptionsFullscreenButtonClick.bind(
                      this,
                      videoClientSessionId,
                    )}
                  >
                    <span
                      className={
                        'brCallVideoOptionsFullscreenButtonIcon' +
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
                </div>
              </div>
            ))
            .concat(
              session && session.localVideoStreamObject
                ? [
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
                        />
                      </div>
                    </Draggable>,
                  ]
                : [],
            )}
        </div>
        <div className='brOutgoingAnimation'></div>
        <div
          className={
            'brOutgoingImage' +
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
        <div className='brOutgoingMessage'>{uawMsgs.LBL_CALL_OUTGOING}</div>
        <CallTimer
          startTime={int(
            session && session.rtcSession && +session.rtcSession.start_time,
          )}
        />
        <ButtonIconic
          className='brTheaterButton'
          hidden={!(session && session.withVideo)}
          onClick={props.uiData.fire.bind(
            props.uiData,
            'callAreaTheaterButton_onClick',
            props.panelType,
            props.panelCode,
          )}
        >
          <span
            className={
              'brTheaterButtonIcon' +
              (callAreaTheaterPreference
                ? ' br_bi_icon_chevron_up_svg'
                : ' br_bi_icon_chevron_down_svg')
            }
          ></span>
        </ButtonIconic>
        <Draggable
          axis='y'
          position={{ x: 0, y: this.state.splitterHeight }}
          onDrag={this.handleSplitterHeightDrag.bind(this)}
          onStop={this.handleSplitterHeightStop.bind(this)}
        >
          <div className='brSplitterHeight'></div>
        </Draggable>
        <div
          className={
            'brCallMenuItemButtonArea brTransferMenuButtonArea' +
            (((panelSession && panelSession.target) || session) &&
            dtmfShortcutPreference & 2
              ? ''
              : ' brHidden')
          }
        >
          <ButtonLabeled
            className='brCallMenuItemButton brTransferMenuButton'
            disabled={
              !(
                session &&
                session.sessionStatus === 'connected' &&
                panelSession &&
                (panelSession.holded || panelSession.transferring)
              )
            }
            title={uawMsgs.LBL_CALL_TRANSFER_MENU_BUTTON_TOOLTIP}
            onClick={this.handleTransferMenuButtonClick.bind(this)}
          >
            <span className='brCallMenuItemIcon br_bi_icon_phone_svg'>
              <span className='brCallMenuItemIconIcon br_bi_icon_arrow_right_svg'></span>
            </span>
            {this.state.headerButtonsCollapsible
              ? ''
              : uawMsgs.LBL_CALL_TRANSFER_MENU_BUTTON}
            <span
              className={
                'brCallMenuItemMenuIcon' +
                (props.uiData.showingDialogVersion !==
                this.state.transferMenuShowingDialogVersion
                  ? ' br_bi_icon_triangle_right_svg'
                  : ' br_bi_icon_triangle_left_svg')
              }
            ></span>
          </ButtonLabeled>
        </div>
        <div
          className={
            'brCallMenuItemButtonArea brHoldButtonArea' +
            (((panelSession && panelSession.target) || session) &&
            dtmfShortcutPreference & 1
              ? ''
              : ' brHidden')
          }
        >
          <ButtonLabeled
            className='brCallMenuItemButton brHoldButton'
            disabled={!(session && session.sessionStatus === 'connected')}
            title={
              panelSession && panelSession.holded
                ? uawMsgs.LBL_CALL_UNHOLD_BUTTON_TOOLTIP
                : uawMsgs.LBL_CALL_HOLD_BUTTON_TOOLTIP
            }
            onClick={props.uiData.fire.bind(
              props.uiData,
              'callHoldButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          >
            <span
              className={
                'brCallMenuItemIcon br_bi_icon_hold_svg' +
                (panelSession && panelSession.holded ? ' brHolded' : '')
              }
            ></span>
            {this.state.headerButtonsCollapsible
              ? ''
              : panelSession && panelSession.holded
                ? uawMsgs.LBL_CALL_UNHOLD_BUTTON
                : uawMsgs.LBL_CALL_HOLD_BUTTON}
          </ButtonLabeled>
        </div>
        <div
          className={
            'brCallMenuItemButtonArea brDtmfMenuButtonArea' +
            ((panelSession && panelSession.target) || session
              ? ''
              : ' brHidden')
          }
        >
          <ButtonLabeled
            className='brCallMenuItemButton brDtmfMenuButton'
            disabled={!session}
            title={uawMsgs.LBL_CALL_DTMF_MENU_BUTTON_TOOLTIP}
            onClick={this.handleDtmfMenuButtonClick.bind(this)}
          >
            <span className='brCallMenuItemIcon br_bi_icon_keypad_svg'></span>
            {this.state.headerButtonsCollapsible
              ? ''
              : uawMsgs.LBL_CALL_DTMF_MENU_BUTTON}
            <span
              className={
                'brCallMenuItemMenuIcon' +
                (props.uiData.showingDialogVersion !==
                this.state.dtmfMenuShowingDialogVersion
                  ? ' br_bi_icon_triangle_right_svg'
                  : ' br_bi_icon_triangle_left_svg')
              }
            ></span>
          </ButtonLabeled>
        </div>
        <div
          className={
            'brCallMenuItemButtonArea brFullscreenButtonArea' +
            ((panelSession && panelSession.target) || session
              ? ''
              : ' brHidden')
          }
        >
          <ButtonLabeled
            className='brCallMenuItemButton brFullscreenButton'
            disabled={!session || !session.withVideo}
            title={uawMsgs.LBL_CALL_FULLSCREEN_BUTTON_TOOLTIP}
            onClick={this.handleFullscreenButtonClick.bind(this)}
          >
            <span className='brCallMenuItemIcon br_bi_icon_expand_svg'></span>
            {this.state.headerButtonsCollapsible
              ? ''
              : uawMsgs.LBL_CALL_FULLSCREEN_BUTTON}
          </ButtonLabeled>
        </div>
        <div
          className={
            'brCallMenuItemButtonArea brCameraButtonArea' +
            ((panelSession && panelSession.target) || session
              ? ''
              : ' brHidden')
          }
        >
          <ButtonLabeled
            className='brCallMenuItemButton brCameraMuteButton'
            disabled={!session}
            title={
              panelSession && panelSession.cameraMuted
                ? uawMsgs.LBL_CALL_CAMERA_UNMUTE_BUTTON_TOOLTIP
                : uawMsgs.LBL_CALL_CAMERA_MUTE_BUTTON_TOOLTIP
            }
            onClick={props.uiData.fire.bind(
              props.uiData,
              'callCameraMuteButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          >
            <span
              className={
                'brCallMenuItemIcon br_bi_icon_no_video_svg' +
                (panelSession && panelSession.cameraMuted ? ' brMuted' : '')
              }
            ></span>
            {this.state.headerButtonsCollapsible
              ? ''
              : panelSession && panelSession.cameraMuted
                ? uawMsgs.LBL_CALL_CAMERA_UNMUTE_BUTTON
                : uawMsgs.LBL_CALL_CAMERA_MUTE_BUTTON}
          </ButtonLabeled>
          <ButtonLabeled
            className='brCallMenuItemButton brCameraMenuButton'
            disabled={!session}
            title={uawMsgs.LBL_CALL_CAMERA_MENU_BUTTON_TOOLTIP}
            onClick={this.handleCameraMenuButtonClick.bind(this)}
          >
            <span
              className={
                'brCallMenuItemMenuIcon' +
                (props.uiData.showingDialogVersion !==
                this.state.cameraMenuShowingDialogVersion
                  ? ' br_bi_icon_triangle_right_svg'
                  : ' br_bi_icon_triangle_left_svg')
              }
            ></span>
          </ButtonLabeled>
          <div className='brCallMenuItemButtonAreaSeparator' />
        </div>
        <div
          className={
            'brCallMenuItemButtonArea brMicrophoneButtonArea' +
            ((panelSession && panelSession.target) || session
              ? ''
              : ' brHidden')
          }
        >
          <ButtonLabeled
            className='brCallMenuItemButton brMicrophoneMuteButton'
            disabled={!session}
            title={
              session && session.muted && session.muted.main
                ? uawMsgs.LBL_CALL_MICROPHONE_UNMUTE_BUTTON_TOOLTIP
                : uawMsgs.LBL_CALL_MICROPHONE_MUTE_BUTTON_TOOLTIP
            }
            onClick={props.uiData.fire.bind(
              props.uiData,
              'callMuteButton_onClick',
              props.panelType,
              props.panelCode,
              'main',
            )}
          >
            <span
              className={
                'brCallMenuItemIcon br_bi_icon_block_microphone_svg' +
                (session && session.muted && session.muted.main
                  ? ' brMuted'
                  : '')
              }
            ></span>
            {this.state.headerButtonsCollapsible
              ? ''
              : session && session.muted && session.muted.main
                ? uawMsgs.LBL_CALL_MICROPHONE_UNMUTE_BUTTON
                : uawMsgs.LBL_CALL_MICROPHONE_MUTE_BUTTON}
          </ButtonLabeled>
          <ButtonLabeled
            className='brCallMenuItemButton brMicrophoneMenuButton'
            disabled={!session}
            title={uawMsgs.LBL_CALL_MICROPHONE_MENU_BUTTON_TOOLTIP}
            onClick={this.handleMicrophoneMenuButtonClick.bind(this)}
          >
            <span
              className={
                'brCallMenuItemMenuIcon' +
                (props.uiData.showingDialogVersion !==
                this.state.microphoneMenuShowingDialogVersion
                  ? ' br_bi_icon_triangle_right_svg'
                  : ' br_bi_icon_triangle_left_svg')
              }
            ></span>
          </ButtonLabeled>
          {session && session.analyser ? (
            <CallMicrophoneLevel
              uiData={props.uiData}
              sessionId={string(session && session.sessionId)}
            />
          ) : (
            ''
          )}
          <div className='brCallMenuItemButtonAreaSeparator' />
        </div>
        <MenuBalloonDialog
          showing={
            props.uiData.showingDialogVersion ===
              this.state.transferMenuShowingDialogVersion && callMenuOpened
          }
          className='brTransferMenuBalloon'
        >
          <span className='brTransferTargetArea'>
            <DropDownMenu
              uiData={props.uiData}
              className='brTransferTargetUserMenu'
              dialogClassName='brCallAreaDialog brTransferTargetUserDialog'
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
                  <div
                    key={groupName}
                    className={
                      'brTransferTargetUserGroup' +
                      (groupName ? ' brGroupName' : '')
                    }
                    title={groupName}
                    onClick={this.handleTransferTargetUserGroupClick.bind(
                      this,
                      groupName,
                    )}
                  >
                    <div
                      className={
                        'brTransferTargetUserGroupIcon' +
                        (this.state.transferTargetUserGroupOpen
                          .split(',')
                          .indexOf(groupName) !== -1
                          ? ' br_bi_icon_chevron_up_svg'
                          : ' br_bi_icon_chevron_down_svg')
                      }
                    />
                    <div className='brTransferTargetUserGroupName'>
                      {groupName}
                    </div>
                    {groupTable[groupName].buddyNodes}
                  </div>
                ))}
            </DropDownMenu>
            <TextBox
              ref='transferTargetInput'
              className='brTransferTargetInput'
              autoCapitalize='off'
              onKeyDown={this.handleTransferTargetInputKeyDown.bind(this)}
            ></TextBox>
          </span>
          <ButtonLabeled
            ref='transferTargetButton'
            className='brTransferButton brTransferTargetButton'
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
            onClick={this.handleTransferTargetButtonClick.bind(this)}
          >
            <span className='brTransferIcon br_bi_icon_phone_svg'></span>
          </ButtonLabeled>
          <ButtonLabeled
            className='brTransferButton brTransferCompleteButton'
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
            onClick={props.uiData.fire.bind(
              props.uiData,
              'callHangUpButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          >
            <span className='brTransferIcon br_bi_icon_phone_svg'>
              <span className='brTransferIconIcon br_bi_icon_arrow_right_svg'></span>
            </span>
            {uawMsgs.LBL_CALL_TRANSFER_COMPLETE_BUTTON}
          </ButtonLabeled>
          <ButtonLabeled
            className='brTransferButton brTransferConferenceButton'
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
            onClick={props.uiData.fire.bind(
              props.uiData,
              'callTransferConferenceButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          >
            <span className='brTransferIcon br_bi_icon_conference_foreground_selected_svg'></span>
            {uawMsgs.LBL_CALL_TRANSFER_CONFERENCE_BUTTON}
          </ButtonLabeled>
          <ButtonLabeled
            className='brTransferButton brTransferCancelButton'
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
            onClick={props.uiData.fire.bind(
              props.uiData,
              'callHoldButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          >
            <span className='brTransferIcon br_bi_icon_phone_svg'>
              <span className='brTransferIconIcon br_bi_icon_arrow_left_svg'></span>
            </span>
            {uawMsgs.LBL_CALL_TRANSFER_CANCEL_BUTTON}
          </ButtonLabeled>
        </MenuBalloonDialog>
        <MenuBalloonDialog
          showing={
            props.uiData.showingDialogVersion ===
              this.state.dtmfMenuShowingDialogVersion && callMenuOpened
          }
          className='brDtmfMenuBalloon'
        >
          <span className='brDtmfLog'>{this.state.dtmfLog}</span>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map(
            (tone, i) => (
              <ButtonLabeled
                key={i}
                className={'brCallDtmfButton brCallDtmfButton' + (i + 1)}
                ghost={true}
                title={tone}
                onClick={this.handleCallDtmfButtonClick.bind(this, tone)}
              >
                {tone}
                <SoundAudio
                  uiData={props.uiData}
                  className='brDtmfSoundAudio'
                  src={
                    CURRENT_SCRIPT_URL.DIR +
                    '../../../sounds/' +
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
          className='brCameraMenuBalloon'
        >
          <div className='brChangeDeviceTitle brChangeVideoinputTitle'>
            {uawMsgs.LBL_CALL_CAMERA_CHANGE}
          </div>
          <DropDownMenu
            uiData={props.uiData}
            className='brChangeDeviceMenu brChangeVideoinputMenu'
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
                  className='brChangeDeviceMenuItem brChangeVideoinputMenuItem'
                  dropDown={true}
                  onClick={props.uiData.fire.bind(
                    props.uiData,
                    'callAreaChangeDeviceMenuItem_onClick',
                    props.panelType,
                    props.panelCode,
                    device,
                  )}
                >
                  {this.getDeviceLabel(device)}
                </MenuItem>
              ))}
          </DropDownMenu>
        </MenuBalloonDialog>
        <MenuBalloonDialog
          showing={
            props.uiData.showingDialogVersion ===
              this.state.microphoneMenuShowingDialogVersion && callMenuOpened
          }
          className='brMicrophoneMenuBalloon'
        >
          <div className='brChangeDeviceTitle brChangeAudioinputTitle'>
            {uawMsgs.LBL_CALL_MICROPHONE_CHANGE}
          </div>
          <DropDownMenu
            uiData={props.uiData}
            className='brChangeDeviceMenu brChangeAudioinputMenu'
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
                  className='brChangeDeviceMenuItem brChangeAudioinputMenuItem'
                  dropDown={true}
                  onClick={props.uiData.fire.bind(
                    props.uiData,
                    'callAreaChangeDeviceMenuItem_onClick',
                    props.panelType,
                    props.panelCode,
                    device,
                  )}
                >
                  {this.getDeviceLabel(device)}
                </MenuItem>
              ))}
          </DropDownMenu>
          <div className='brChangeDeviceTitle brChangeAudiooutputTitle'>
            {uawMsgs.LBL_CALL_SPEAKER_CHANGE}
          </div>
          <DropDownMenu
            uiData={props.uiData}
            className='brChangeDeviceMenu brChangeAudiooutputMenu'
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
                  className='brChangeDeviceMenuItem brChangeAudiooutputMenuItem'
                  dropDown={true}
                  onClick={props.uiData.fire.bind(
                    props.uiData,
                    'callAreaChangeDeviceMenuItem_onClick',
                    props.panelType,
                    props.panelCode,
                    device,
                  )}
                >
                  {this.getDeviceLabel(device)}
                </MenuItem>
              ))}
          </DropDownMenu>
        </MenuBalloonDialog>
        <ButtonLabeled
          className='brCallMenuButton'
          disabled={!session}
          hidden={!((panelSession && panelSession.target) || session)}
          vivid={true}
          title={uawMsgs.LBL_CALL_MENU_BUTTON_TOOLTIP}
          onClick={this.handleCallMenuButtonClick.bind(this)}
        >
          <span className='brCallMenuIcon br_bi_icon_chevron_down_svg'></span>
        </ButtonLabeled>
        <ButtonLabeled
          className='brCallHangUpButton'
          hidden={!((panelSession && panelSession.target) || session)}
          title={uawMsgs.LBL_CALL_HANG_UP_BUTTON_TOOLTIP}
          onClick={props.uiData.fire.bind(
            props.uiData,
            'callHangUpButton_onClick',
            props.panelType,
            props.panelCode,
          )}
        >
          <span className='brCallHangUpIcon br_bi_icon_end_call_svg'></span>
        </ButtonLabeled>
      </div>
    )
  }
}
