import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ReactDOM from 'react-dom'
import ButtonLabeled from './ButtonLabeled.js'
import CallMicrophoneLevel from './CallMicrophoneLevel.js'
import DropDownMenu from './DropDownMenu.js'
import MenuItem from './MenuItem.js'
import MultipleAudio from './MultipleAudio.js'
import StatusIcon from './StatusIcon.js'
import TextBox from './TextBox.js'
import CURRENT_SCRIPT_URL from '../utilities/currentscript.js'

/**
 * PreferencePanel
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.phone
 * props.uiData.configurations
 * props.uiData.currentSelectedTab
 * props.uiData.preferenceWorkTable
 * props.uiData.preferenceProfileImagePreview_onClick
 * props.uiData.preferenceProfileImageUploadInput_onChange
 * props.uiData.preferenceChatBgColorStandard_onClick
 * props.uiData.preferenceChatBgColorCustom_onClick
 * props.uiData.preferenceLampTypeTestTimer_onTick
 * props.uiData.preferenceSaveButton_onClick
 * props.uiData.tabLinkHideButton_onClick
 * props.panelType
 * props.panelCode
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this._isMounted = false
    this.lampTypeTestTimer = null
    this.state = {
      devices: [],
      testingAudioSource: null,
      testingAudioTarget: false,
      testingVideoSource: null,
      testingLampType: 0,
    }
  }
  componentDidMount() {
    const props = this.props
    this._isMounted = true
    if (props.uiData.phone && props.uiData.phone.checkUserMedia) {
      props.uiData.phone.checkUserMedia(this.getDevices.bind(this))
    } else {
      this.getDevices()
    }
  }
  componentDidUpdate() {
    const props = this.props
    const preferenceContent = ReactDOM.findDOMNode(
      this.refs['preferenceContent'],
    )
    const videoSourceTestArea = ReactDOM.findDOMNode(
      this.refs['videoSourceTestArea'],
    )
    if (preferenceContent && videoSourceTestArea && videoSourceTestArea.style) {
      videoSourceTestArea.style.minWidth =
        preferenceContent.clientWidth - 32 + 'px'
      videoSourceTestArea.style.width = '100%'
      if (this.state.testingVideoSource) {
        const maxHeight = int(preferenceContent.clientHeight) || 88
        const minHeight = Math.min(maxHeight, 88)
        videoSourceTestArea.style.height =
          int((minHeight + maxHeight) / 2) + 'px'
      } else {
        videoSourceTestArea.style.height = '0px'
      }
    }
    const videoSourceTestVideo = ReactDOM.findDOMNode(
      this.refs['videoSourceTestVideo'],
    )
    if (videoSourceTestVideo) {
      videoSourceTestVideo.setAttribute('autoplay', '')
      videoSourceTestVideo.setAttribute('muted', '')
      videoSourceTestVideo.setAttribute('playsinline', '')
      try {
        videoSourceTestVideo.srcObject =
          (this.state.testingVideoSource &&
            this.state.testingVideoSource.streamObject) ||
          null
      } catch (e) {}
    }
  }
  componentWillUnmount() {
    const props = this.props
    this._isMounted = false
    if (
      this.state.testingAudioSource &&
      typeof this.state.testingAudioSource.dispose === 'function'
    ) {
      this.state.testingAudioSource.dispose()
    }
    if (
      this.state.testingVideoSource &&
      typeof this.state.testingVideoSource.dispose === 'function'
    ) {
      this.state.testingVideoSource.dispose()
    }
    if (this.lampTypeTestTimer) {
      clearTimeout(this.lampTypeTestTimer)
    }
  }
  getDevices() {
    const props = this.props
    if (
      typeof navigator !== 'undefined' &&
      navigator.mediaDevices &&
      navigator.mediaDevices.enumerateDevices
    ) {
      navigator.mediaDevices
        .enumerateDevices()
        .then(devices => {
          if (this._isMounted) {
            const isSafari =
              typeof navigator !== 'undefined'
                ? new RegExp(
                    (props.uiData.configurations &&
                      props.uiData.configurations.uaForFlyweightAudio) ||
                      '^(?=.*Safari)(?!.*Chrome).*$',
                  ).test(navigator.userAgent)
                : false
            this.setState({
              devices: [
                { deviceId: '', groupId: '', kind: 'audioinput', label: '' },
                { deviceId: '', groupId: '', kind: 'videoinput', label: '' },
                { deviceId: '', groupId: '', kind: 'audiooutput', label: '' },
              ]
                .concat(devices.filter(device => device && device.deviceId))
                .concat(
                  !isSafari && devices.some(d => d.kind === 'audiooutput')
                    ? [
                        {
                          deviceId: '_all_devices',
                          groupId: '',
                          kind: 'audiooutput',
                          label: '',
                        },
                      ]
                    : [],
                ),
            })
          }
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
  changePreferenceWork(key, getValue) {
    const props = this.props
    const preferenceWork =
      props.uiData.preferenceWorkTable &&
      props.uiData.preferenceWorkTable[props.panelCode]
    if (!preferenceWork) {
      return
    }
    preferenceWork[key] = getValue(preferenceWork[key])
    if (key === 'audioSource' && this.state.testingAudioSource) {
      if (typeof this.state.testingAudioSource.dispose === 'function') {
        this.state.testingAudioSource.dispose()
      }
      this.setState({ testingAudioSource: null })
    } else if (key === 'videoSource' && this.state.testingVideoSource) {
      if (typeof this.state.testingVideoSource.dispose === 'function') {
        this.state.testingVideoSource.dispose()
      }
      this.setState({ testingVideoSource: null })
    } else {
      this.setState({})
    }
  }
  handleProfileImageUploadButtonClick(ev) {
    const props = this.props
    const preferenceWork =
      props.uiData.preferenceWorkTable &&
      props.uiData.preferenceWorkTable[props.panelCode]
    if (!preferenceWork) {
      return
    }
    const profileImageUploadInput = ReactDOM.findDOMNode(
      this.refs['profileImageUploadInput'],
    )
    if (profileImageUploadInput && profileImageUploadInput.click) {
      profileImageUploadInput.click()
    }
  }
  handleAudioSourceTestButtonClick(ev) {
    const props = this.props
    if (!this.state.testingAudioSource) {
      props.uiData.ucUiStore
        .getLogger()
        .log('debug', 'audio source test started')
      const preferenceWork =
        props.uiData.preferenceWorkTable &&
        props.uiData.preferenceWorkTable[props.panelCode]
      if (
        preferenceWork &&
        props.uiData.phone &&
        typeof props.uiData.phone.checkUserMedia === 'function'
      ) {
        this.setState({ testingAudioSource: {}, testingVideoSource: null })
        props.uiData.phone.checkUserMedia(
          e => {
            props.uiData.ucUiStore
              .getLogger()
              .log(
                'debug',
                'audio source test checkUserMedia: e.message=' + e.message,
              )
            if (this._isMounted && this.state.testingAudioSource) {
              this.setState({ testingAudioSource: e })
            } else {
              if (typeof e.dispose === 'function') {
                e.dispose()
              }
            }
          },
          {
            mediaConstraints: {
              audio: { deviceId: preferenceWork.audioSource },
              video: false,
            },
          },
          false,
          true,
        )
      }
    } else {
      props.uiData.ucUiStore
        .getLogger()
        .log('debug', 'audio source test stopped')
      if (typeof this.state.testingAudioSource.dispose === 'function') {
        this.state.testingAudioSource.dispose()
      }
      this.setState({ testingAudioSource: null })
    }
  }
  handleVideoSourceTestButtonClick(ev) {
    const props = this.props
    if (!this.state.testingVideoSource) {
      props.uiData.ucUiStore
        .getLogger()
        .log('debug', 'video source test started')
      const preferenceWork =
        props.uiData.preferenceWorkTable &&
        props.uiData.preferenceWorkTable[props.panelCode]
      if (
        preferenceWork &&
        props.uiData.phone &&
        typeof props.uiData.phone.checkUserMedia === 'function'
      ) {
        this.setState({ testingAudioSource: null, testingVideoSource: {} })
        const webRTCTypeName =
          !preferenceWork.webRTCTypeName ||
          preferenceWork.tenantWebRTCTypeNameLocked
            ? preferenceWork.tenantWebRTCTypeName
            : preferenceWork.webRTCTypeName
        let options = {}
        try {
          options =
            JSON.parse(
              preferenceWork.webRTCTypes.find(
                type => type.name === webRTCTypeName,
              ).options,
            ) || {}
        } catch (ex) {}
        const video =
          (options.callOptions &&
            options.callOptions.mediaConstraints &&
            options.callOptions.mediaConstraints.video) ||
          {}
        props.uiData.phone.checkUserMedia(
          e => {
            props.uiData.ucUiStore
              .getLogger()
              .log(
                'debug',
                'video source test checkUserMedia: e.message=' + e.message,
              )
            if (this._isMounted && this.state.testingVideoSource) {
              this.setState({ testingVideoSource: e })
            } else {
              if (typeof e.dispose === 'function') {
                e.dispose()
              }
            }
          },
          {
            mediaConstraints: {
              audio: false,
              video: Object.assign(video, {
                deviceId: preferenceWork.videoSource,
              }),
            },
          },
          false,
          true,
        )
      }
    } else {
      props.uiData.ucUiStore
        .getLogger()
        .log('debug', 'video source test stopped')
      if (typeof this.state.testingVideoSource.dispose === 'function') {
        this.state.testingVideoSource.dispose()
      }
      this.setState({ testingVideoSource: null })
    }
  }
  handleLampTypeTestButtonClick(ev) {
    const props = this.props
    if (!this.state.testingLampType) {
      props.uiData.ucUiStore.getLogger().log('debug', 'lamp type test started')
      this.lampTypeTestTimer = setTimeout(
        this.lampTypeTestTimerTick.bind(this),
        1000,
      )
      this.setState({ testingLampType: 5 })
    }
  }
  lampTypeTestTimerTick() {
    const props = this.props
    if (this.state.testingLampType > 1) {
      this.lampTypeTestTimer = setTimeout(
        this.lampTypeTestTimerTick.bind(this),
        1000,
      )
      this.setState({ testingLampType: this.state.testingLampType - 1 })
    } else if (this.state.testingLampType === 1) {
      this.lampTypeTestTimer = null
      this.setState({ testingLampType: 0 })
      props.uiData.fire(
        'preferenceLampTypeTestTimer_onTick',
        props.panelType,
        props.panelCode,
      )
    }
  }
  handleBellAudioTargetTestButtonClick(ev) {
    const props = this.props
    const multipleAudio = ReactDOM.findDOMNode(
      this.refs['bellAudioTargetTestMultipleAudio'],
    )
    const audios =
      multipleAudio &&
      multipleAudio.getElementsByClassName &&
      multipleAudio.getElementsByClassName('brBellAudioTargetTestAudio')
    if (audios && audios.length > 0) {
      props.uiData.ucUiStore
        .getLogger()
        .log('debug', 'bell audio target test started')
      Array.prototype.forEach.call(audios, audio => audio.play && audio.play())
    } else {
      props.uiData.ucUiStore
        .getLogger()
        .log('info', 'brBellAudioTargetTestAudio not found')
    }
  }
  render() {
    const props = this.props
    const preferenceWork =
      (props.uiData.preferenceWorkTable &&
        props.uiData.preferenceWorkTable[props.panelCode]) ||
      {}
    const statusList = [
      Constants.STATUS_AVAILABLE,
      Constants.STATUS_OFFLINE,
      Constants.STATUS_BUSY,
    ]
    const statusTable = {}
    statusTable[Constants.STATUS_AVAILABLE] = {
      label: uawMsgs.CMN_OWN_STATUS_STRING_AVAILABLE,
    }
    statusTable[Constants.STATUS_OFFLINE] = {
      label: uawMsgs.CMN_OWN_STATUS_STRING_INVISIBLE,
    }
    statusTable[Constants.STATUS_BUSY] = {
      label: uawMsgs.CMN_OWN_STATUS_STRING_BUSY,
    }
    const languageTable = {}
    languageTable[''] = { label: uawMsgs.LBL_PREFERENCE_LANGUAGE_AUTO }
    ;(preferenceWork.validLanguages || []).forEach(language => {
      languageTable[language] = {
        label: uawMsgs['CMN_LANGUAGE_' + string(language).toUpperCase()],
      }
    })
    const lampTypeNameDisplayTable = {}
    lampTypeNameDisplayTable[''] = uawMsgs.LBL_PREFERENCE_LAMP_TYPE_STANDARD
    lampTypeNameDisplayTable['_silent'] =
      uawMsgs.LBL_PREFERENCE_LAMP_TYPE_SILENT
    return (
      <div
        className={
          'brPreferencePanel' +
          (props.uiData.currentSelectedTab ===
          props.panelType + '_' + props.panelCode
            ? ' brSelected'
            : '') +
          (preferenceWork.statusOptionsEnabled
            ? ' brStatusOptionsEnabled'
            : '') +
          (preferenceWork.statusOptionsEnabledLocked
            ? ' brStatusOptionsEnabledLocked'
            : '')
        }
      >
        <div ref='preferenceContent' className='brPreferenceContent'>
          <table className='brPreferenceTable'>
            <tbody>
              <tr>
                <td>{uawMsgs.LBL_PREFERENCE_CATEGORY_USER}</td>
                <td>{uawMsgs.LBL_PREFERENCE_INITIAL_STATUS}</td>
                <td>
                  <DropDownMenu
                    uiData={props.uiData}
                    className='brInitialStatusMenu'
                    text={
                      <span className='brInitialStatusMenuText'>
                        <StatusIcon
                          status={int(preferenceWork.initialStatus)}
                        />
                        {string(
                          (statusTable[int(preferenceWork.initialStatus)] || {})
                            .label,
                        )}
                      </span>
                    }
                  >
                    {statusList.map(status => (
                      <MenuItem
                        key={status}
                        className='brPreferencePanelMenuItem brInitialStatusItem'
                        dropDown={true}
                        onClick={this.changePreferenceWork.bind(
                          this,
                          'initialStatus',
                          () => status,
                        )}
                      >
                        <StatusIcon status={status} />
                        {statusTable[status].label}
                      </MenuItem>
                    ))}
                  </DropDownMenu>
                </td>
              </tr>
              <tr
                style={
                  preferenceWork.statusOptionsEnabledLocked
                    ? { display: 'none' }
                    : {}
                }
              >
                <td></td>
                <td className='brStatusOptionsBottomTd'>
                  {uawMsgs.LBL_PREFERENCE_STATUS_OPTIONS_ENABLED}
                </td>
                <td className='brStatusOptionsBottomTd'>
                  <span
                    className={
                      'brPreferencePanelCheckBox brStatusOptionsEnabledCheck' +
                      (preferenceWork.statusOptionsEnabled
                        ? ' br_bi_icon_square_svg'
                        : ' brSelected br_bi_icon_check_svg')
                    }
                    onClick={this.changePreferenceWork.bind(
                      this,
                      'statusOptionsEnabled',
                      preferenceWork.statusOptionsEnabled
                        ? () => false
                        : () => true,
                    )}
                  >
                    {uawMsgs.LBL_PREFERENCE_STATUS_OPTIONS_ENABLED_CHECK}
                  </span>
                </td>
              </tr>
              {statusList.reduce((a, status, index) => {
                const statusOption = preferenceWork.statusOptions[status] || {}
                a.push(
                  <tr
                    key={'statusOptionsStatusLabelTr' + index}
                    className='brStatusOptionsStatusLabelTr'
                  >
                    <td></td>
                    <td>
                      <div className='brStatusOptionsStatusLabel brStatusOptionsTdContent'>
                        <StatusIcon status={status} />
                        {statusTable[status].label}
                      </div>
                    </td>
                    <td></td>
                  </tr>,
                )
                a.push(
                  <tr
                    key={'statusOptionsLampTypeTr' + index}
                    className='brStatusOptionsLampTypeTr'
                  >
                    <td></td>
                    <td className='brStatusOptionsBottomTd'>
                      <div className='brStatusOptionsLampTypeLabel brStatusOptionsTdContent'>
                        {uawMsgs.LBL_PREFERENCE_STATUS_OPTIONS_LAMP_TYPE}
                      </div>
                    </td>
                    <td className='brStatusOptionsBottomTd'>
                      <div className='brStatusOptionsTdContent'>
                        <DropDownMenu
                          uiData={props.uiData}
                          className='brStatusOptionsLampTypeMenu'
                          text={
                            typeof statusOption.lampTypeName !== 'undefined'
                              ? lampTypeNameDisplayTable[
                                  string(statusOption.lampTypeName)
                                ] || string(statusOption.lampTypeName)
                              : uawMsgs.LBL_PREFERENCE_STATUS_OPTIONS_LAMP_TYPE_DEFAULT
                          }
                        >
                          <MenuItem
                            className='brPreferencePanelMenuItem brStatusOptionsLampTypeItem brStatusOptionsLampTypeDefault'
                            dropDown={true}
                            onClick={this.changePreferenceWork.bind(
                              this,
                              'statusOptions',
                              statusOptions => {
                                if (statusOptions[status]) {
                                  delete statusOptions[status].lampTypeName
                                }
                                return statusOptions
                              },
                            )}
                          >
                            {
                              uawMsgs.LBL_PREFERENCE_STATUS_OPTIONS_LAMP_TYPE_DEFAULT
                            }
                          </MenuItem>
                          {(preferenceWork.lampTypes || []).map(type => (
                            <MenuItem
                              key={string(type.name)}
                              className='brPreferencePanelMenuItem brStatusOptionsLampTypeItem'
                              dropDown={true}
                              onClick={this.changePreferenceWork.bind(
                                this,
                                'statusOptions',
                                statusOptions => {
                                  if (!statusOptions[status]) {
                                    statusOptions[status] = {}
                                  }
                                  statusOptions[status].lampTypeName = string(
                                    type.name,
                                  )
                                  return statusOptions
                                },
                              )}
                            >
                              {lampTypeNameDisplayTable[string(type.name)] ||
                                string(type.name)}
                            </MenuItem>
                          ))}
                        </DropDownMenu>
                      </div>
                    </td>
                  </tr>,
                )
                return a
              }, [])}
              <tr>
                <td></td>
                <td>{uawMsgs.LBL_PREFERENCE_PROFILE_IMAGE}</td>
                <td>
                  <div
                    className={
                      'brProfileImagePreview' +
                      (preferenceWork.profileImageUrl &&
                      preferenceWork.profileImageTo !== 'DELETE'
                        ? ''
                        : ' brNoImage') +
                      (preferenceWork.profileImageUploading
                        ? ' brProgress'
                        : '')
                    }
                    style={
                      preferenceWork.profileImageUrl &&
                      preferenceWork.profileImageTo !== 'DELETE' &&
                      !preferenceWork.profileImageUploading
                        ? {
                            backgroundImage:
                              'url(' + preferenceWork.profileImageUrl + ')',
                          }
                        : {}
                    }
                    onClick={props.uiData.fire.bind(
                      props.uiData,
                      'preferenceProfileImagePreview_onClick',
                      props.panelType,
                      props.panelCode,
                    )}
                  />
                  <div className='brProfileImageUploadFormArea'>
                    <form
                      target={'profileImageUploadIframe_' + props.panelCode}
                    >
                      <input
                        ref='profileImageUploadInput'
                        type='file'
                        name='profileImageUploadInput'
                        onChange={props.uiData.fire.bind(
                          props.uiData,
                          'preferenceProfileImageUploadInput_onChange',
                          props.panelType,
                          props.panelCode,
                        )}
                      />
                    </form>
                    <iframe
                      name={'profileImageUploadIframe_' + props.panelCode}
                    />
                  </div>
                  <ButtonLabeled
                    className='brProfileImageUploadButton'
                    disabled={preferenceWork.profileImageUploading}
                    ghost={true}
                    title={
                      uawMsgs.LBL_PREFERENCE_PROFILE_IMAGE_UPLOAD_BUTTON_TOOLTIP
                    }
                    onClick={this.handleProfileImageUploadButtonClick.bind(
                      this,
                    )}
                  >
                    {uawMsgs.LBL_PREFERENCE_PROFILE_IMAGE_UPLOAD_BUTTON}
                  </ButtonLabeled>
                  <ButtonLabeled
                    className='brProfileImageDeleteButton'
                    disabled={preferenceWork.profileImageUploading}
                    ghost={true}
                    title={
                      uawMsgs.LBL_PREFERENCE_PROFILE_IMAGE_DELETE_BUTTON_TOOLTIP
                    }
                    onClick={this.changePreferenceWork.bind(
                      this,
                      'profileImageTo',
                      () => 'DELETE',
                    )}
                  >
                    {uawMsgs.LBL_PREFERENCE_PROFILE_IMAGE_DELETE_BUTTON}
                  </ButtonLabeled>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>{uawMsgs.LBL_PREFERENCE_LANGUAGE}</td>
                <td>
                  <DropDownMenu
                    uiData={props.uiData}
                    className='brLanguageMenu'
                    disabled={preferenceWork.languageDisabled}
                    text={string(
                      (languageTable[string(preferenceWork.userLanguage)] || {})
                        .label,
                    )}
                  >
                    {Object.keys(languageTable).map(key => (
                      <MenuItem
                        key={key}
                        className='brPreferencePanelMenuItem brLanguageItem'
                        dropDown={true}
                        onClick={this.changePreferenceWork.bind(
                          this,
                          'userLanguage',
                          () => key,
                        )}
                      >
                        {languageTable[key].label}
                      </MenuItem>
                    ))}
                  </DropDownMenu>
                </td>
              </tr>
              <tr
                style={
                  preferenceWork.loginPasswordLocked ? { display: 'none' } : {}
                }
              >
                <td></td>
                <td>{uawMsgs.LBL_PREFERENCE_LOGIN_PASSWORD}</td>
                <td>
                  <TextBox
                    className='brLoginPassword'
                    value={string(preferenceWork.loginPassword)}
                    type='password'
                    onChange={ev =>
                      this.changePreferenceWork('loginPassword', () =>
                        string(ev && ev.target && ev.target.value),
                      )
                    }
                  />
                </td>
              </tr>
              <tr
                style={
                  preferenceWork.loginPasswordLocked ? { display: 'none' } : {}
                }
              >
                <td></td>
                <td>{uawMsgs.LBL_PREFERENCE_LOGIN_PASSWORD_CONFIRM}</td>
                <td>
                  <TextBox
                    className='brLoginPasswordConfirm'
                    value={string(preferenceWork.loginPasswordConfirm)}
                    type='password'
                    onChange={ev =>
                      this.changePreferenceWork('loginPasswordConfirm', () =>
                        string(ev && ev.target && ev.target.value),
                      )
                    }
                  />
                </td>
              </tr>
              <tr
                style={
                  preferenceWork.displayNameLocked ? { display: 'none' } : {}
                }
              >
                <td></td>
                <td>{uawMsgs.LBL_PREFERENCE_WEBCHAT_DISPLAY_NAME}</td>
                <td>
                  <TextBox
                    className='brDisplayNameInput'
                    value={string(preferenceWork.displayName)}
                    onChange={ev =>
                      this.changePreferenceWork('displayName', () =>
                        string(ev && ev.target && ev.target.value),
                      )
                    }
                  />
                </td>
              </tr>
              <tr
                style={
                  preferenceWork.sendingConfirmationLocked
                    ? { display: 'none' }
                    : {}
                }
              >
                <td></td>
                <td>{uawMsgs.LBL_PREFERENCE_SENDING_CONFIRMATION}</td>
                <td>
                  <span
                    className={
                      'brPreferencePanelCheckBox brSendingConfirmationCheck' +
                      (preferenceWork.sendingConfirmation
                        ? ' brSelected br_bi_icon_check_svg'
                        : ' br_bi_icon_square_svg')
                    }
                    onClick={this.changePreferenceWork.bind(
                      this,
                      'sendingConfirmation',
                      preferenceWork.sendingConfirmation
                        ? () => false
                        : () => true,
                    )}
                  >
                    {uawMsgs.LBL_PREFERENCE_SENDING_CONFIRMATION_CHECK}
                  </span>
                </td>
              </tr>
              <tr
                style={
                  preferenceWork.nameDisplayModeLocked
                    ? { display: 'none' }
                    : {}
                }
              >
                <td></td>
                <td>{uawMsgs.LBL_PREFERENCE_NAME_DISPLAY_MODE}</td>
                <td>
                  <span
                    className={
                      'brPreferencePanelCheckBox brNameDisplayModeCheck' +
                      (preferenceWork.nameDisplayMode === 1
                        ? ' brSelected br_bi_icon_check_svg'
                        : ' br_bi_icon_square_svg')
                    }
                    onClick={this.changePreferenceWork.bind(
                      this,
                      'nameDisplayMode',
                      preferenceWork.nameDisplayMode === 1 ? () => 0 : () => 1,
                    )}
                  >
                    {uawMsgs.LBL_PREFERENCE_NAME_DISPLAY_MODE_CHECK}
                  </span>
                </td>
              </tr>
              <tr
                style={
                  preferenceWork.notifyCallStatusLocked
                    ? { display: 'none' }
                    : {}
                }
              >
                <td></td>
                <td>{uawMsgs.LBL_PREFERENCE_NOTIFY_CALL_STATUS}</td>
                <td>
                  <span
                    className={
                      'brPreferencePanelCheckBox brNotifyCallStatusCheck' +
                      (preferenceWork.notifyCallStatus
                        ? ' brSelected br_bi_icon_check_svg'
                        : ' br_bi_icon_square_svg')
                    }
                    onClick={this.changePreferenceWork.bind(
                      this,
                      'notifyCallStatus',
                      preferenceWork.notifyCallStatus
                        ? () => false
                        : () => true,
                    )}
                  >
                    {uawMsgs.LBL_PREFERENCE_NOTIFY_CALL_STATUS_CHECK}
                  </span>
                </td>
              </tr>
              <tr
                style={
                  preferenceWork.notifyConfStatusLocked
                    ? { display: 'none' }
                    : {}
                }
              >
                <td></td>
                <td>{uawMsgs.LBL_PREFERENCE_NOTIFY_CONF_STATUS}</td>
                <td>
                  <span
                    className={
                      'brPreferencePanelCheckBox brNotifyConfStatusCheck' +
                      (preferenceWork.notifyConfStatus
                        ? ' brSelected br_bi_icon_check_svg'
                        : ' br_bi_icon_square_svg')
                    }
                    onClick={this.changePreferenceWork.bind(
                      this,
                      'notifyConfStatus',
                      preferenceWork.notifyConfStatus
                        ? () => false
                        : () => true,
                    )}
                  >
                    {uawMsgs.LBL_PREFERENCE_NOTIFY_CONF_STATUS_CHECK}
                  </span>
                </td>
              </tr>
              <tr
                style={
                  preferenceWork.dtmfShortcutLocked ? { display: 'none' } : {}
                }
              >
                <td></td>
                <td>{uawMsgs.LBL_PREFERENCE_DTMF_SHORTCUT}</td>
                <td>
                  <span
                    className={
                      'brPreferencePanelCheckBox brDtmfShortcutCheck brDtmfShortcut0Check' +
                      (preferenceWork.dtmfShortcut & 1
                        ? ' brSelected br_bi_icon_check_svg'
                        : ' br_bi_icon_square_svg')
                    }
                    onClick={this.changePreferenceWork.bind(
                      this,
                      'dtmfShortcut',
                      preferenceWork.dtmfShortcut & 1
                        ? p => p & ~1
                        : p => p | 1,
                    )}
                  >
                    {uawMsgs.LBL_PREFERENCE_DTMF_SHORTCUT_0_CHECK}
                  </span>
                </td>
              </tr>
              <tr
                style={
                  preferenceWork.dtmfShortcutLocked ? { display: 'none' } : {}
                }
              >
                <td></td>
                <td></td>
                <td>
                  <span
                    className={
                      'brPreferencePanelCheckBox brDtmfShortcutCheck brDtmfShortcut1Check' +
                      (preferenceWork.dtmfShortcut & 2
                        ? ' brSelected br_bi_icon_check_svg'
                        : ' br_bi_icon_square_svg')
                    }
                    onClick={this.changePreferenceWork.bind(
                      this,
                      'dtmfShortcut',
                      preferenceWork.dtmfShortcut & 2
                        ? p => p & ~2
                        : p => p | 2,
                    )}
                  >
                    {uawMsgs.LBL_PREFERENCE_DTMF_SHORTCUT_1_CHECK}
                  </span>
                </td>
              </tr>
              <tr
                style={
                  preferenceWork.dtmfShortcutLocked ? { display: 'none' } : {}
                }
              >
                <td></td>
                <td></td>
                <td>
                  <span
                    className={
                      'brPreferencePanelCheckBox brDtmfShortcutCheck brDtmfShortcut3Check' +
                      (preferenceWork.dtmfShortcut & 8
                        ? ' brSelected br_bi_icon_check_svg'
                        : ' br_bi_icon_square_svg')
                    }
                    onClick={this.changePreferenceWork.bind(
                      this,
                      'dtmfShortcut',
                      preferenceWork.dtmfShortcut & 8
                        ? p => p & ~8
                        : p => p | 8,
                    )}
                  >
                    {uawMsgs.LBL_PREFERENCE_DTMF_SHORTCUT_3_CHECK}
                  </span>
                </td>
              </tr>
              <tr
                style={
                  preferenceWork.dtmfShortcutLocked ? { display: 'none' } : {}
                }
              >
                <td></td>
                <td></td>
                <td>
                  <span
                    className={
                      'brPreferencePanelCheckBox brDtmfShortcutCheck brDtmfShortcut2Check' +
                      (preferenceWork.dtmfShortcut & 4
                        ? ' brSelected br_bi_icon_check_svg'
                        : ' br_bi_icon_square_svg')
                    }
                    onClick={this.changePreferenceWork.bind(
                      this,
                      'dtmfShortcut',
                      preferenceWork.dtmfShortcut & 4
                        ? p => p & ~4
                        : p => p | 4,
                    )}
                  >
                    {uawMsgs.LBL_PREFERENCE_DTMF_SHORTCUT_2_CHECK}
                  </span>
                </td>
              </tr>
              <tr
                style={
                  preferenceWork.displayPeriodLocked ? { display: 'none' } : {}
                }
              >
                <td></td>
                <td>{uawMsgs.LBL_PREFERENCE_DISPLAY_PERIOD}</td>
                <td>
                  {string(
                    string(uawMsgs.LBL_PREFERENCE_DISPLAY_PERIOD_LABEL).split(
                      '{0}',
                    )[0],
                  )}
                  <TextBox
                    className='brDisplayPeriodInput'
                    value={string(preferenceWork.displayPeriod)}
                    onChange={ev =>
                      this.changePreferenceWork('displayPeriod', () =>
                        string(ev && ev.target && ev.target.value),
                      )
                    }
                  />
                  {string(
                    string(uawMsgs.LBL_PREFERENCE_DISPLAY_PERIOD_LABEL).split(
                      '{0}',
                    )[1],
                  )}
                </td>
              </tr>
              <tr
                style={
                  preferenceWork.chatBgColorLocked ? { display: 'none' } : {}
                }
              >
                <td></td>
                <td>{uawMsgs.LBL_PREFERENCE_CHAT_BG_COLOR}</td>
                <td>
                  <DropDownMenu
                    uiData={props.uiData}
                    className='brChatBgColorMenu'
                    disabled={preferenceWork.chatBgColorLocked}
                    text={
                      !preferenceWork.chatBgColor
                        ? uawMsgs.LBL_PREFERENCE_CHAT_BG_COLOR_STANDARD
                        : uawMsgs.LBL_PREFERENCE_CHAT_BG_COLOR_CUSTOM
                    }
                  >
                    <MenuItem
                      className='brPreferencePanelMenuItem brChatBgColorItem'
                      dropDown={true}
                      onClick={props.uiData.fire.bind(
                        props.uiData,
                        'preferenceChatBgColorStandard_onClick',
                        props.panelType,
                        props.panelCode,
                      )}
                    >
                      {uawMsgs.LBL_PREFERENCE_CHAT_BG_COLOR_STANDARD}
                    </MenuItem>
                    <MenuItem
                      className='brPreferencePanelMenuItem brChatBgColorItem'
                      dropDown={true}
                      onClick={props.uiData.fire.bind(
                        props.uiData,
                        'preferenceChatBgColorCustom_onClick',
                        props.panelType,
                        props.panelCode,
                      )}
                    >
                      {uawMsgs.LBL_PREFERENCE_CHAT_BG_COLOR_CUSTOM}
                    </MenuItem>
                  </DropDownMenu>
                </td>
              </tr>
              <tr
                style={preferenceWork.dbgoptLocked ? { display: 'none' } : {}}
              >
                <td></td>
                <td>{uawMsgs.LBL_PREFERENCE_DBGOPT}</td>
                <td>
                  <TextBox
                    className='brDbgoptInput'
                    value={string(preferenceWork.dbgopt)}
                    onChange={ev =>
                      this.changePreferenceWork('dbgopt', () =>
                        string(ev && ev.target && ev.target.value),
                      )
                    }
                  />
                </td>
              </tr>
              <tr>
                <td colSpan='3' className='brSeparator'></td>
              </tr>
              <tr>
                <td>{uawMsgs.LBL_PREFERENCE_CATEGORY_TERMINAL}</td>
                <td>{uawMsgs.LBL_PREFERENCE_AUTO_SIGN_IN}</td>
                <td>
                  <span
                    className={
                      'brPreferencePanelCheckBox brAutoSignInCheck' +
                      (preferenceWork.autoSignIn
                        ? ' brSelected br_bi_icon_check_svg'
                        : ' br_bi_icon_square_svg')
                    }
                    onClick={this.changePreferenceWork.bind(
                      this,
                      'autoSignIn',
                      preferenceWork.autoSignIn ? () => false : () => true,
                    )}
                  >
                    {uawMsgs.LBL_PREFERENCE_AUTO_SIGN_IN_CHECK}
                  </span>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>{uawMsgs.LBL_PREFERENCE_WEBRTC_ENABLED}</td>
                <td>
                  <span
                    className={
                      'brPreferencePanelCheckBox brWebRTCEnabledCheck' +
                      (preferenceWork.webRTCDisabled
                        ? ' br_bi_icon_square_svg'
                        : ' brSelected br_bi_icon_check_svg')
                    }
                    onClick={this.changePreferenceWork.bind(
                      this,
                      'webRTCDisabled',
                      preferenceWork.webRTCDisabled ? () => false : () => true,
                    )}
                  >
                    {uawMsgs.LBL_PREFERENCE_WEBRTC_ENABLED_CHECK}
                  </span>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>{uawMsgs.LBL_PREFERENCE_WEBRTC_TYPE}</td>
                <td>
                  <DropDownMenu
                    uiData={props.uiData}
                    className='brWebRTCTypeMenu'
                    disabled={preferenceWork.tenantWebRTCTypeNameLocked}
                    text={
                      !preferenceWork.webRTCTypeName ||
                      preferenceWork.tenantWebRTCTypeNameLocked
                        ? uawMsgs.LBL_PREFERENCE_WEBRTC_TYPE_DEFAULT
                        : preferenceWork.webRTCTypeName === '_standard'
                          ? uawMsgs.LBL_PREFERENCE_WEBRTC_TYPE_STANDARD
                          : string(preferenceWork.webRTCTypeName)
                    }
                  >
                    <MenuItem
                      className='brPreferencePanelMenuItem brWebRTCTypeItem'
                      dropDown={true}
                      onClick={this.changePreferenceWork.bind(
                        this,
                        'webRTCTypeName',
                        () => '',
                      )}
                    >
                      {uawMsgs.LBL_PREFERENCE_WEBRTC_TYPE_DEFAULT}
                    </MenuItem>
                    <MenuItem
                      className='brPreferencePanelMenuItem brWebRTCTypeItem'
                      dropDown={true}
                      onClick={this.changePreferenceWork.bind(
                        this,
                        'webRTCTypeName',
                        () => '_standard',
                      )}
                    >
                      {uawMsgs.LBL_PREFERENCE_WEBRTC_TYPE_STANDARD}
                    </MenuItem>
                    {(preferenceWork.webRTCTypes || []).map(type => (
                      <MenuItem
                        key={string(type.name)}
                        className='brPreferencePanelMenuItem brWebRTCTypeItem'
                        dropDown={true}
                        onClick={this.changePreferenceWork.bind(
                          this,
                          'webRTCTypeName',
                          () => string(type.name),
                        )}
                      >
                        {string(type.name)}
                      </MenuItem>
                    ))}
                  </DropDownMenu>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>{uawMsgs.LBL_PREFERENCE_NO_VIDEO_MODE}</td>
                <td>
                  <DropDownMenu
                    uiData={props.uiData}
                    className='brNoVideoModeMenu'
                    text={
                      preferenceWork.noVideoMode === 'CONFERENCE'
                        ? uawMsgs.LBL_PREFERENCE_NO_VIDEO_MODE_CONFERENCE
                        : preferenceWork.noVideoMode === '.*'
                          ? uawMsgs.LBL_PREFERENCE_NO_VIDEO_MODE_SOUND
                          : uawMsgs.LBL_PREFERENCE_NO_VIDEO_MODE_DISPLAY
                    }
                  >
                    <MenuItem
                      className='brPreferencePanelMenuItem brNoVideoModeItem'
                      dropDown={true}
                      onClick={this.changePreferenceWork.bind(
                        this,
                        'noVideoMode',
                        () => '',
                      )}
                    >
                      {uawMsgs.LBL_PREFERENCE_NO_VIDEO_MODE_DISPLAY}
                    </MenuItem>
                    <MenuItem
                      className='brPreferencePanelMenuItem brNoVideoModeItem'
                      dropDown={true}
                      onClick={this.changePreferenceWork.bind(
                        this,
                        'noVideoMode',
                        () => 'CONFERENCE',
                      )}
                    >
                      {uawMsgs.LBL_PREFERENCE_NO_VIDEO_MODE_CONFERENCE}
                    </MenuItem>
                    <MenuItem
                      className='brPreferencePanelMenuItem brNoVideoModeItem'
                      dropDown={true}
                      onClick={this.changePreferenceWork.bind(
                        this,
                        'noVideoMode',
                        () => '.*',
                      )}
                    >
                      {uawMsgs.LBL_PREFERENCE_NO_VIDEO_MODE_SOUND}
                    </MenuItem>
                  </DropDownMenu>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>{uawMsgs.LBL_PREFERENCE_AUDIO_SOURCE}</td>
                <td>
                  <DropDownMenu
                    uiData={props.uiData}
                    className='brAudioSourceMenu'
                    text={this.getDeviceLabel({
                      deviceId: preferenceWork.audioSource,
                      kind: 'audioinput',
                    })}
                  >
                    {this.state.devices
                      .filter(device => device.kind === 'audioinput')
                      .map(device => (
                        <MenuItem
                          key={device.deviceId}
                          className='brPreferencePanelMenuItem brAudioSourceItem'
                          dropDown={true}
                          onClick={this.changePreferenceWork.bind(
                            this,
                            'audioSource',
                            () => device.deviceId,
                          )}
                        >
                          {this.getDeviceLabel(device)}
                        </MenuItem>
                      ))}
                  </DropDownMenu>
                  <ButtonLabeled
                    className='brAudioSourceTestButton'
                    ghost={true}
                    title={
                      this.state.testingAudioSource
                        ? uawMsgs.LBL_PREFERENCE_AUDIO_SOURCE_STOP_BUTTON_TOOLTIP
                        : uawMsgs.LBL_PREFERENCE_AUDIO_SOURCE_TEST_BUTTON_TOOLTIP
                    }
                    onClick={this.handleAudioSourceTestButtonClick.bind(this)}
                  >
                    {this.state.testingAudioSource
                      ? uawMsgs.LBL_PREFERENCE_AUDIO_SOURCE_STOP_BUTTON
                      : uawMsgs.LBL_PREFERENCE_AUDIO_SOURCE_TEST_BUTTON}
                  </ButtonLabeled>
                </td>
              </tr>
              <tr>
                <td className='brAudioSourceTestTd'></td>
                <td className='brAudioSourceTestTd'></td>
                <td className='brAudioSourceTestTd'>
                  <div
                    className={
                      'brAudioSourceTestArea' +
                      (this.state.testingAudioSource ? ' brTesting' : '')
                    }
                    title={string(
                      this.state.testingAudioSource &&
                        this.state.testingAudioSource.message,
                    )}
                  >
                    {this.state.testingAudioSource &&
                    this.state.testingAudioSource.analyser ? (
                      <CallMicrophoneLevel
                        uiData={props.uiData}
                        analyser={this.state.testingAudioSource.analyser}
                      />
                    ) : (
                      string(
                        this.state.testingAudioSource &&
                          (this.state.testingAudioSource.message ||
                            uawMsgs.MSG_PREFERENCE_AUDIO_SOURCE_TESTING),
                      )
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>{uawMsgs.LBL_PREFERENCE_AUDIO_TARGET}</td>
                <td>
                  <DropDownMenu
                    uiData={props.uiData}
                    className='brAudioTargetMenu'
                    text={this.getDeviceLabel({
                      deviceId: preferenceWork.audioTarget,
                      kind: 'audiooutput',
                    })}
                  >
                    {this.state.devices
                      .filter(
                        device =>
                          device.kind === 'audiooutput' &&
                          device.deviceId !== '_all_devices',
                      )
                      .map(device => (
                        <MenuItem
                          key={device.deviceId}
                          className='brPreferencePanelMenuItem brAudioTargetItem'
                          dropDown={true}
                          onClick={this.changePreferenceWork.bind(
                            this,
                            'audioTarget',
                            () => device.deviceId,
                          )}
                        >
                          {this.getDeviceLabel(device)}
                        </MenuItem>
                      ))}
                  </DropDownMenu>
                  <ButtonLabeled
                    className='brAudioTargetTestButton'
                    ghost={true}
                    title={
                      this.state.testingAudioTarget
                        ? uawMsgs.LBL_PREFERENCE_AUDIO_TARGET_STOP_BUTTON_TOOLTIP
                        : uawMsgs.LBL_PREFERENCE_AUDIO_TARGET_TEST_BUTTON_TOOLTIP
                    }
                    onClick={this.setState.bind(
                      this,
                      { testingAudioTarget: !this.state.testingAudioTarget },
                      undefined,
                    )}
                  >
                    {this.state.testingAudioTarget
                      ? uawMsgs.LBL_PREFERENCE_AUDIO_TARGET_STOP_BUTTON
                      : uawMsgs.LBL_PREFERENCE_AUDIO_TARGET_TEST_BUTTON}
                  </ButtonLabeled>
                  <MultipleAudio
                    uiData={props.uiData}
                    className='brAudioTargetTestMultipleAudio'
                    audioClassName='brAudioTargetTestAudio'
                    src={
                      CURRENT_SCRIPT_URL.DIR + '../../../sounds/ringback.mp3'
                    }
                    loop={true}
                    playing={this.state.testingAudioTarget}
                    deviceId={preferenceWork.audioTarget}
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td>{uawMsgs.LBL_PREFERENCE_VIDEO_SOURCE}</td>
                <td>
                  <DropDownMenu
                    uiData={props.uiData}
                    className='brVideoSourceMenu'
                    text={this.getDeviceLabel({
                      deviceId: preferenceWork.videoSource,
                      kind: 'videoinput',
                    })}
                  >
                    {this.state.devices
                      .filter(device => device.kind === 'videoinput')
                      .map(device => (
                        <MenuItem
                          key={device.deviceId}
                          className='brPreferencePanelMenuItem brVideoSourceItem'
                          dropDown={true}
                          onClick={this.changePreferenceWork.bind(
                            this,
                            'videoSource',
                            () => device.deviceId,
                          )}
                        >
                          {this.getDeviceLabel(device)}
                        </MenuItem>
                      ))}
                  </DropDownMenu>
                  <ButtonLabeled
                    className='brVideoSourceTestButton'
                    ghost={true}
                    title={
                      this.state.testingVideoSource
                        ? uawMsgs.LBL_PREFERENCE_VIDEO_SOURCE_STOP_BUTTON_TOOLTIP
                        : uawMsgs.LBL_PREFERENCE_VIDEO_SOURCE_TEST_BUTTON_TOOLTIP
                    }
                    onClick={this.handleVideoSourceTestButtonClick.bind(this)}
                  >
                    {this.state.testingVideoSource
                      ? uawMsgs.LBL_PREFERENCE_VIDEO_SOURCE_STOP_BUTTON
                      : uawMsgs.LBL_PREFERENCE_VIDEO_SOURCE_TEST_BUTTON}
                  </ButtonLabeled>
                </td>
              </tr>
              <tr>
                <td colSpan='3' className='brVideoSourceTestTd'>
                  <div
                    ref='videoSourceTestArea'
                    className='brVideoSourceTestArea'
                    title={string(
                      this.state.testingVideoSource &&
                        this.state.testingVideoSource.message,
                    )}
                  >
                    {this.state.testingVideoSource &&
                    this.state.testingVideoSource.streamObject ? (
                      <video
                        ref='videoSourceTestVideo'
                        className='brVideoSourceTestVideo'
                      ></video>
                    ) : (
                      string(
                        this.state.testingVideoSource &&
                          this.state.testingVideoSource.message,
                      )
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>{uawMsgs.LBL_PREFERENCE_LAMP_TYPE}</td>
                <td>
                  <DropDownMenu
                    uiData={props.uiData}
                    className='brLampTypeMenu'
                    text={
                      lampTypeNameDisplayTable[
                        string(preferenceWork.lampTypeName)
                      ] || string(preferenceWork.lampTypeName)
                    }
                  >
                    {(preferenceWork.lampTypes || []).map(type => (
                      <MenuItem
                        key={string(type.name)}
                        className='brPreferencePanelMenuItem brLampTypeItem'
                        dropDown={true}
                        onClick={this.changePreferenceWork.bind(
                          this,
                          'lampTypeName',
                          () => string(type.name),
                        )}
                      >
                        {lampTypeNameDisplayTable[string(type.name)] ||
                          string(type.name)}
                      </MenuItem>
                    ))}
                  </DropDownMenu>
                  <ButtonLabeled
                    className='brLampTypeTestButton'
                    disabled={this.state.testingLampType}
                    ghost={true}
                    title={
                      this.state.testingLampType
                        ? ''
                        : uawMsgs.LBL_PREFERENCE_LAMP_TYPE_TEST_BUTTON_TOOLTIP
                    }
                    onClick={this.handleLampTypeTestButtonClick.bind(this)}
                  >
                    {string(
                      this.state.testingLampType ||
                        uawMsgs.LBL_PREFERENCE_LAMP_TYPE_TEST_BUTTON,
                    )}
                  </ButtonLabeled>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>{uawMsgs.LBL_PREFERENCE_BELL_AUDIO_TARGET}</td>
                <td>
                  <DropDownMenu
                    uiData={props.uiData}
                    className='brBellAudioTargetMenu'
                    text={this.getDeviceLabel({
                      deviceId: preferenceWork.bellAudioTarget,
                      kind: 'audiooutput',
                    })}
                  >
                    {this.state.devices
                      .filter(device => device.kind === 'audiooutput')
                      .map(device => (
                        <MenuItem
                          key={device.deviceId}
                          className='brPreferencePanelMenuItem brBellAudioTargetItem'
                          dropDown={true}
                          onClick={this.changePreferenceWork.bind(
                            this,
                            'bellAudioTarget',
                            () => device.deviceId,
                          )}
                        >
                          {this.getDeviceLabel(device)}
                        </MenuItem>
                      ))}
                  </DropDownMenu>
                  <ButtonLabeled
                    className='brBellAudioTargetTestButton'
                    ghost={true}
                    title={
                      uawMsgs.LBL_PREFERENCE_BELL_AUDIO_TARGET_TEST_BUTTON_TOOLTIP
                    }
                    onClick={this.handleBellAudioTargetTestButtonClick.bind(
                      this,
                    )}
                  >
                    {uawMsgs.LBL_PREFERENCE_BELL_AUDIO_TARGET_TEST_BUTTON}
                  </ButtonLabeled>
                  <MultipleAudio
                    ref='bellAudioTargetTestMultipleAudio'
                    uiData={props.uiData}
                    className='brBellAudioTargetTestMultipleAudio'
                    audioClassName='brBellAudioTargetTestAudio'
                    src={CURRENT_SCRIPT_URL.DIR + '../../../sounds/bell.mp3'}
                    deviceId={preferenceWork.bellAudioTarget}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='brPreferenceFooter'>
          <ButtonLabeled
            className='brSaveButton'
            disabled={preferenceWork.nowSaving}
            progress={preferenceWork.nowSaving}
            vivid={true}
            title={uawMsgs.CMN_SAVE}
            onClick={props.uiData.fire.bind(
              props.uiData,
              'preferenceSaveButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          >
            {uawMsgs.CMN_SAVE}
          </ButtonLabeled>
          <ButtonLabeled
            className='brCloseButton'
            title={uawMsgs.CMN_CLOSE}
            onClick={props.uiData.fire.bind(
              props.uiData,
              'tabLinkHideButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          >
            {uawMsgs.CMN_CLOSE}
          </ButtonLabeled>
        </div>
      </div>
    )
  }
}
