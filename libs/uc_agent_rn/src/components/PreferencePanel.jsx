import React from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Platform,
  Dimensions,
  Animated,
} from 'react-native'
import { RTCView } from 'react-native-webrtc'
import uawMsgs from '../utilities/uawmsgs'
import Constants from '../utilities/constants'
import { int, string } from '../utilities/strings'
import ButtonLabeled from './ButtonLabeled'
import CallMicrophoneLevel from './CallMicrophoneLevel'
import DropDownMenu from './DropDownMenu'
import MenuItem from './MenuItem'
import MultipleAudio from './MultipleAudio'
import StatusIcon from './StatusIcon'
import TextBox from './TextBox'
import CURRENT_SCRIPT_URL from '../utilities/currentscript'
import * as ImagePicker from 'react-native-image-picker'

const sound = require('../sounds/bell.mp3')

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
export default class PreferencePanel extends React.Component {
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
      preferenceContentLayout: {
        width: 0,
        height: 0,
      },
      videoTestAreaLayout: {
        width: 0,
        height: 0,
      },
    }
    this.preferenceContentRef = React.createRef()
    this.videoSourceTestAreaRef = React.createRef()
    this.videoSourceTestVideoRef = React.createRef()
    this.bellAudioTargetTestMultipleAudioRef = React.createRef()
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
  componentDidUpdate(prevProps, prevState) {
    const props = this.props

    // Handle preference content and video test area dimensions
    if (
      this.preferenceContentRef.current &&
      this.videoSourceTestAreaRef.current
    ) {
      // Update video test area dimensions
      if (this.state.testingVideoSource) {
        const maxHeight = this.state.preferenceContentLayout.height || 88
        const minHeight = Math.min(maxHeight, 88)
        const newHeight = (minHeight + maxHeight) / 2

        this.videoSourceTestAreaRef.current.setNativeProps({
          style: {
            minWidth: this.state.preferenceContentLayout.width - 32,
            width: '100%',
            height: newHeight,
          },
        })
      } else {
        this.videoSourceTestAreaRef.current.setNativeProps({
          style: {
            height: 0,
          },
        })
      }
    }

    // Handle video stream updates
    if (
      this.state.testingVideoSource?.streamObject !==
      prevState.testingVideoSource?.streamObject
    ) {
      if (this.videoSourceTestVideoRef.current) {
        this.videoSourceTestVideoRef.current.setNativeProps({
          streamURL:
            this.state.testingVideoSource?.streamObject?.toURL() || null,
          objectFit: 'cover',
        })
      }
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

    const options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: false,
    }

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        return
      }

      if (response.error) {
        props.uiData.ucUiStore
          .getLogger()
          .log('warn', 'Image picker error: ' + response.error)
        return
      }

      if (response.assets && response.assets[0]) {
        // Create a synthetic event to match the web version's expected format
        props.uiData.fire(
          'preferenceProfileImageUploadInput_onChange',
          props.panelType,
          props.panelCode,
          {
            target: {
              files: [
                {
                  uri: response.assets[0].uri,
                  type: response.assets[0].type,
                  name: response.assets[0].fileName,
                },
              ],
            },
          },
        )
      }
    })
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
    if (this.bellAudioTargetTestMultipleAudioRef.current) {
      props.uiData.ucUiStore
        .getLogger()
        .log('debug', 'bell audio target test started')
      this.bellAudioTargetTestMultipleAudioRef.current.play()
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
      <View
        style={[
          styles.brPreferencePanel,
          props.uiData.currentSelectedTab ===
            `${props.panelType}_${props.panelCode}` && styles.brSelected,
          preferenceWork.statusOptionsEnabled && styles.brStatusOptionsEnabled,
          preferenceWork.statusOptionsEnabledLocked &&
            styles.brStatusOptionsEnabledLocked,
        ]}
      >
        <ScrollView
          ref={this.preferenceContentRef}
          style={styles.brPreferenceContent}
          onLayout={event => {
            const { width, height } = event.nativeEvent.layout
            this.setState({
              preferenceContentLayout: {
                width,
                height,
              },
            })
          }}
        >
          <View style={styles.preferenceSectionContainer}>
            <View style={styles.preferenceRow}>
              <Text style={styles.categoryText}>
                {uawMsgs.LBL_PREFERENCE_CATEGORY_USER}
              </Text>
              <Text style={styles.labelText}>
                {uawMsgs.LBL_PREFERENCE_INITIAL_STATUS}
              </Text>
              <View style={styles.controlContainer}>
                <DropDownMenu
                  uiData={props.uiData}
                  style={styles.brInitialStatusMenu}
                  text={
                    <View style={styles.brInitialStatusMenuText}>
                      <StatusIcon status={int(preferenceWork.initialStatus)} />
                      <Text>
                        {string(
                          (statusTable[int(preferenceWork.initialStatus)] || {})
                            .label,
                        )}
                      </Text>
                    </View>
                  }
                >
                  {statusList.map(status => (
                    <MenuItem
                      key={status}
                      style={[
                        styles.brPreferencePanelMenuItem,
                        styles.brInitialStatusItem,
                      ]}
                      dropDown={true}
                      onPress={this.changePreferenceWork.bind(
                        this,
                        'initialStatus',
                        () => status,
                      )}
                    >
                      <StatusIcon status={status} />
                      <Text>{statusTable[status].label}</Text>
                    </MenuItem>
                  ))}
                </DropDownMenu>
              </View>
            </View>

            {!preferenceWork.statusOptionsEnabledLocked && (
              <View style={styles.preferenceRow}>
                <View style={styles.emptyCell} />
                <View style={styles.brStatusOptionsBottomTd}>
                  <Text>{uawMsgs.LBL_PREFERENCE_STATUS_OPTIONS_ENABLED}</Text>
                </View>
                <View style={styles.brStatusOptionsBottomTd}>
                  <TouchableOpacity
                    style={[
                      styles.brPreferencePanelCheckBox,
                      styles.brStatusOptionsEnabledCheck,
                      preferenceWork.statusOptionsEnabled
                        ? styles.br_bi_icon_square_svg
                        : [styles.brSelected, styles.br_bi_icon_check_svg],
                    ]}
                    onPress={this.changePreferenceWork.bind(
                      this,
                      'statusOptionsEnabled',
                      preferenceWork.statusOptionsEnabled
                        ? () => false
                        : () => true,
                    )}
                  >
                    <Text>
                      {uawMsgs.LBL_PREFERENCE_STATUS_OPTIONS_ENABLED_CHECK}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {statusList.map((status, index) => {
              const statusOption = preferenceWork.statusOptions[status] || {}
              return (
                <React.Fragment key={`status-option-${index}`}>
                  <View
                    style={[
                      styles.preferenceRow,
                      styles.brStatusOptionsStatusLabelTr,
                    ]}
                  >
                    <View style={styles.emptyCell} />
                    <View style={styles.statusLabelContainer}>
                      <View
                        style={[
                          styles.brStatusOptionsStatusLabel,
                          styles.brStatusOptionsTdContent,
                        ]}
                      >
                        <StatusIcon status={status} />
                        <Text>{statusTable[status].label}</Text>
                      </View>
                    </View>
                    <View style={styles.emptyCell} />
                  </View>

                  <View
                    style={[
                      styles.preferenceRow,
                      styles.brStatusOptionsLampTypeTr,
                    ]}
                  >
                    <View style={styles.emptyCell} />
                    <View style={styles.brStatusOptionsBottomTd}>
                      <View
                        style={[
                          styles.brStatusOptionsLampTypeLabel,
                          styles.brStatusOptionsTdContent,
                        ]}
                      >
                        <Text>
                          {uawMsgs.LBL_PREFERENCE_STATUS_OPTIONS_LAMP_TYPE}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.brStatusOptionsBottomTd}>
                      <View style={styles.brStatusOptionsTdContent}>
                        <DropDownMenu
                          uiData={props.uiData}
                          style={styles.brStatusOptionsLampTypeMenu}
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
                      </View>
                    </View>
                  </View>
                </React.Fragment>
              )
            })}
          </View>

          {/* Profile Image Section */}
          <View style={styles.preferenceRow}>
            <View style={styles.emptyCell} />
            <Text style={styles.labelText}>
              {uawMsgs.LBL_PREFERENCE_PROFILE_IMAGE}
            </Text>
            <View style={styles.controlContainer}>
              <TouchableOpacity
                style={[
                  styles.brProfileImagePreview,
                  (!preferenceWork.profileImageUrl ||
                    preferenceWork.profileImageTo === 'DELETE') &&
                    styles.brNoImage,
                  preferenceWork.profileImageUploading && styles.brProgress,
                ]}
                onPress={() =>
                  props.uiData.fire(
                    'preferenceProfileImagePreview_onClick',
                    props.panelType,
                    props.panelCode,
                  )
                }
              >
                {preferenceWork.profileImageUrl &&
                  preferenceWork.profileImageTo !== 'DELETE' &&
                  !preferenceWork.profileImageUploading && (
                    <Image
                      source={{ uri: preferenceWork.profileImageUrl }}
                      style={styles.profileImage}
                      resizeMode='cover'
                    />
                  )}
              </TouchableOpacity>

              <View style={styles.imageButtonsContainer}>
                <ButtonLabeled
                  style={styles.brProfileImageUploadButton}
                  disabled={preferenceWork.profileImageUploading}
                  ghost={true}
                  title={
                    uawMsgs.LBL_PREFERENCE_PROFILE_IMAGE_UPLOAD_BUTTON_TOOLTIP
                  }
                  onPress={this.handleProfileImageUploadButtonClick.bind(this)}
                >
                  <Text>
                    {uawMsgs.LBL_PREFERENCE_PROFILE_IMAGE_UPLOAD_BUTTON}
                  </Text>
                </ButtonLabeled>

                <ButtonLabeled
                  style={styles.brProfileImageDeleteButton}
                  disabled={preferenceWork.profileImageUploading}
                  ghost={true}
                  title={
                    uawMsgs.LBL_PREFERENCE_PROFILE_IMAGE_DELETE_BUTTON_TOOLTIP
                  }
                  onPress={this.changePreferenceWork.bind(
                    this,
                    'profileImageTo',
                    () => 'DELETE',
                  )}
                >
                  <Text>
                    {uawMsgs.LBL_PREFERENCE_PROFILE_IMAGE_DELETE_BUTTON}
                  </Text>
                </ButtonLabeled>
              </View>
            </View>
          </View>

          {/* Language Section */}
          <View style={styles.preferenceRow}>
            <View style={styles.emptyCell} />
            <Text style={styles.labelText}>
              {uawMsgs.LBL_PREFERENCE_LANGUAGE}
            </Text>
            <View style={styles.controlContainer}>
              <DropDownMenu
                uiData={props.uiData}
                style={styles.brLanguageMenu}
                disabled={preferenceWork.languageDisabled}
                text={string(
                  (languageTable[string(preferenceWork.userLanguage)] || {})
                    .label,
                )}
              >
                {Object.keys(languageTable).map(key => (
                  <MenuItem
                    key={key}
                    style={[
                      styles.brPreferencePanelMenuItem,
                      styles.brLanguageItem,
                    ]}
                    dropDown={true}
                    onPress={this.changePreferenceWork.bind(
                      this,
                      'userLanguage',
                      () => key,
                    )}
                  >
                    <Text>{languageTable[key].label}</Text>
                  </MenuItem>
                ))}
              </DropDownMenu>
            </View>
          </View>

          {/* Login Password Section */}
          {!preferenceWork.loginPasswordLocked && (
            <>
              <View style={styles.preferenceRow}>
                <View style={styles.emptyCell} />
                <Text style={styles.labelText}>
                  {uawMsgs.LBL_PREFERENCE_LOGIN_PASSWORD}
                </Text>
                <View style={styles.controlContainer}>
                  <TextBox
                    style={styles.brLoginPassword}
                    value={string(preferenceWork.loginPassword)}
                    secureTextEntry={true}
                    onChangeText={text =>
                      this.changePreferenceWork('loginPassword', () =>
                        string(text),
                      )
                    }
                  />
                </View>
              </View>

              <View style={styles.preferenceRow}>
                <View style={styles.emptyCell} />
                <Text style={styles.labelText}>
                  {uawMsgs.LBL_PREFERENCE_LOGIN_PASSWORD_CONFIRM}
                </Text>
                <View style={styles.controlContainer}>
                  <TextBox
                    style={styles.brLoginPasswordConfirm}
                    value={string(preferenceWork.loginPasswordConfirm)}
                    secureTextEntry={true}
                    onChangeText={text =>
                      this.changePreferenceWork('loginPasswordConfirm', () =>
                        string(text),
                      )
                    }
                  />
                </View>
              </View>
            </>
          )}

          {/* Display Name Section */}
          {!preferenceWork.displayNameLocked && (
            <View style={styles.preferenceRow}>
              <View style={styles.emptyCell} />
              <Text style={styles.labelText}>
                {uawMsgs.LBL_PREFERENCE_WEBCHAT_DISPLAY_NAME}
              </Text>
              <View style={styles.controlContainer}>
                <TextBox
                  style={styles.brDisplayNameInput}
                  value={string(preferenceWork.displayName)}
                  onChangeText={text =>
                    this.changePreferenceWork('displayName', () => string(text))
                  }
                />
              </View>
            </View>
          )}

          {/* Sending Confirmation Section */}
          {!preferenceWork.sendingConfirmationLocked && (
            <View style={styles.preferenceRow}>
              <View style={styles.emptyCell} />
              <Text style={styles.labelText}>
                {uawMsgs.LBL_PREFERENCE_SENDING_CONFIRMATION}
              </Text>
              <View style={styles.controlContainer}>
                <TouchableOpacity
                  style={[
                    styles.brPreferencePanelCheckBox,
                    styles.brSendingConfirmationCheck,
                    preferenceWork.sendingConfirmation
                      ? [styles.brSelected, styles.br_bi_icon_check_svg]
                      : styles.br_bi_icon_square_svg,
                  ]}
                  onPress={this.changePreferenceWork.bind(
                    this,
                    'sendingConfirmation',
                    preferenceWork.sendingConfirmation
                      ? () => false
                      : () => true,
                  )}
                >
                  <Text>
                    {uawMsgs.LBL_PREFERENCE_SENDING_CONFIRMATION_CHECK}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Name Display Mode Section */}
          {!preferenceWork.nameDisplayModeLocked && (
            <View style={styles.preferenceRow}>
              <View style={styles.emptyCell} />
              <Text style={styles.labelText}>
                {uawMsgs.LBL_PREFERENCE_NAME_DISPLAY_MODE}
              </Text>
              <View style={styles.controlContainer}>
                <TouchableOpacity
                  style={[
                    styles.brPreferencePanelCheckBox,
                    styles.brNameDisplayModeCheck,
                    preferenceWork.nameDisplayMode === 1
                      ? [styles.brSelected, styles.br_bi_icon_check_svg]
                      : styles.br_bi_icon_square_svg,
                  ]}
                  onPress={this.changePreferenceWork.bind(
                    this,
                    'nameDisplayMode',
                    preferenceWork.nameDisplayMode === 1 ? () => 0 : () => 1,
                  )}
                >
                  <Text>{uawMsgs.LBL_PREFERENCE_NAME_DISPLAY_MODE_CHECK}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Notify Call Status Section */}
          {!preferenceWork.notifyCallStatusLocked && (
            <View style={styles.preferenceRow}>
              <View style={styles.emptyCell} />
              <Text style={styles.labelText}>
                {uawMsgs.LBL_PREFERENCE_NOTIFY_CALL_STATUS}
              </Text>
              <View style={styles.controlContainer}>
                <TouchableOpacity
                  style={[
                    styles.brPreferencePanelCheckBox,
                    styles.brNotifyCallStatusCheck,
                    preferenceWork.notifyCallStatus
                      ? [styles.brSelected, styles.br_bi_icon_check_svg]
                      : styles.br_bi_icon_square_svg,
                  ]}
                  onPress={this.changePreferenceWork.bind(
                    this,
                    'notifyCallStatus',
                    preferenceWork.notifyCallStatus ? () => false : () => true,
                  )}
                >
                  <Text>{uawMsgs.LBL_PREFERENCE_NOTIFY_CALL_STATUS_CHECK}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Notify Conference Status Section */}
          {!preferenceWork.notifyConfStatusLocked && (
            <View style={styles.preferenceRow}>
              <View style={styles.emptyCell} />
              <Text style={styles.labelText}>
                {uawMsgs.LBL_PREFERENCE_NOTIFY_CONF_STATUS}
              </Text>
              <View style={styles.controlContainer}>
                <TouchableOpacity
                  style={[
                    styles.brPreferencePanelCheckBox,
                    styles.brNotifyConfStatusCheck,
                    preferenceWork.notifyConfStatus
                      ? [styles.brSelected, styles.br_bi_icon_check_svg]
                      : styles.br_bi_icon_square_svg,
                  ]}
                  onPress={this.changePreferenceWork.bind(
                    this,
                    'notifyConfStatus',
                    preferenceWork.notifyConfStatus ? () => false : () => true,
                  )}
                >
                  <Text>{uawMsgs.LBL_PREFERENCE_NOTIFY_CONF_STATUS_CHECK}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* DTMF Shortcut Section */}
          {!preferenceWork.dtmfShortcutLocked && (
            <>
              <View style={styles.preferenceRow}>
                <View style={styles.emptyCell} />
                <Text style={styles.labelText}>
                  {uawMsgs.LBL_PREFERENCE_DTMF_SHORTCUT}
                </Text>
                <View style={styles.controlContainer}>
                  <TouchableOpacity
                    style={[
                      styles.brPreferencePanelCheckBox,
                      styles.brDtmfShortcutCheck,
                      styles.brDtmfShortcut0Check,
                      preferenceWork.dtmfShortcut & 1
                        ? [styles.brSelected, styles.br_bi_icon_check_svg]
                        : styles.br_bi_icon_square_svg,
                    ]}
                    onPress={this.changePreferenceWork.bind(
                      this,
                      'dtmfShortcut',
                      preferenceWork.dtmfShortcut & 1
                        ? p => p & ~1
                        : p => p | 1,
                    )}
                  >
                    <Text>{uawMsgs.LBL_PREFERENCE_DTMF_SHORTCUT_0_CHECK}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Additional DTMF Shortcuts */}
              {[
                { bit: 2, label: uawMsgs.LBL_PREFERENCE_DTMF_SHORTCUT_1_CHECK },
                { bit: 8, label: uawMsgs.LBL_PREFERENCE_DTMF_SHORTCUT_3_CHECK },
                { bit: 4, label: uawMsgs.LBL_PREFERENCE_DTMF_SHORTCUT_2_CHECK },
              ].map((shortcut, index) => (
                <View key={`dtmf-${index}`} style={styles.preferenceRow}>
                  <View style={styles.emptyCell} />
                  <View style={styles.emptyCell} />
                  <View style={styles.controlContainer}>
                    <TouchableOpacity
                      style={[
                        styles.brPreferencePanelCheckBox,
                        styles.brDtmfShortcutCheck,
                        preferenceWork.dtmfShortcut & shortcut.bit
                          ? [styles.brSelected, styles.br_bi_icon_check_svg]
                          : styles.br_bi_icon_square_svg,
                      ]}
                      onPress={this.changePreferenceWork.bind(
                        this,
                        'dtmfShortcut',
                        preferenceWork.dtmfShortcut & shortcut.bit
                          ? p => p & ~shortcut.bit
                          : p => p | shortcut.bit,
                      )}
                    >
                      <Text>{shortcut.label}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </>
          )}

          {/* Display Period Section */}
          {!preferenceWork.displayPeriodLocked && (
            <View style={styles.preferenceRow}>
              <View style={styles.emptyCell} />
              <Text style={styles.labelText}>
                {uawMsgs.LBL_PREFERENCE_DISPLAY_PERIOD}
              </Text>
              <View style={styles.controlContainer}>
                <View style={styles.displayPeriodContainer}>
                  <Text>
                    {
                      string(uawMsgs.LBL_PREFERENCE_DISPLAY_PERIOD_LABEL).split(
                        '{0}',
                      )[0]
                    }
                  </Text>
                  <TextBox
                    style={styles.brDisplayPeriodInput}
                    value={string(preferenceWork.displayPeriod)}
                    onChangeText={text =>
                      this.changePreferenceWork('displayPeriod', () =>
                        string(text),
                      )
                    }
                  />
                  <Text>
                    {
                      string(uawMsgs.LBL_PREFERENCE_DISPLAY_PERIOD_LABEL).split(
                        '{0}',
                      )[1]
                    }
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Separator */}
          <View style={styles.separator} />

          {/* Terminal Category Section */}
          <View style={styles.preferenceRow}>
            <Text style={styles.categoryText}>
              {uawMsgs.LBL_PREFERENCE_CATEGORY_TERMINAL}
            </Text>
            <Text style={styles.labelText}>
              {uawMsgs.LBL_PREFERENCE_AUTO_SIGN_IN}
            </Text>
            <View style={styles.controlContainer}>
              <TouchableOpacity
                style={[
                  styles.brPreferencePanelCheckBox,
                  styles.brAutoSignInCheck,
                  preferenceWork.autoSignIn
                    ? [styles.brSelected, styles.br_bi_icon_check_svg]
                    : styles.br_bi_icon_square_svg,
                ]}
                onPress={this.changePreferenceWork.bind(
                  this,
                  'autoSignIn',
                  preferenceWork.autoSignIn ? () => false : () => true,
                )}
              >
                <Text>{uawMsgs.LBL_PREFERENCE_AUTO_SIGN_IN_CHECK}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* WebRTC Settings */}
          <View style={styles.preferenceRow}>
            <View style={styles.emptyCell} />
            <Text style={styles.labelText}>
              {uawMsgs.LBL_PREFERENCE_WEBRTC_ENABLED}
            </Text>
            <View style={styles.controlContainer}>
              <TouchableOpacity
                style={[
                  styles.brPreferencePanelCheckBox,
                  styles.brWebRTCEnabledCheck,
                  preferenceWork.webRTCDisabled
                    ? styles.br_bi_icon_square_svg
                    : [styles.brSelected, styles.br_bi_icon_check_svg],
                ]}
                onPress={this.changePreferenceWork.bind(
                  this,
                  'webRTCDisabled',
                  preferenceWork.webRTCDisabled ? () => false : () => true,
                )}
              >
                <Text>{uawMsgs.LBL_PREFERENCE_WEBRTC_ENABLED_CHECK}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* WebRTC Type */}
          <View style={styles.preferenceRow}>
            <View style={styles.emptyCell} />
            <Text style={styles.labelText}>
              {uawMsgs.LBL_PREFERENCE_WEBRTC_TYPE}
            </Text>
            <View style={styles.controlContainer}>
              <DropDownMenu
                uiData={props.uiData}
                style={styles.brWebRTCTypeMenu}
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
                  style={[
                    styles.brPreferencePanelMenuItem,
                    styles.brWebRTCTypeItem,
                  ]}
                  dropDown={true}
                  onPress={this.changePreferenceWork.bind(
                    this,
                    'webRTCTypeName',
                    () => '',
                  )}
                >
                  <Text>{uawMsgs.LBL_PREFERENCE_WEBRTC_TYPE_DEFAULT}</Text>
                </MenuItem>
                <MenuItem
                  style={[
                    styles.brPreferencePanelMenuItem,
                    styles.brWebRTCTypeItem,
                  ]}
                  dropDown={true}
                  onPress={this.changePreferenceWork.bind(
                    this,
                    'webRTCTypeName',
                    () => '_standard',
                  )}
                >
                  <Text>{uawMsgs.LBL_PREFERENCE_WEBRTC_TYPE_STANDARD}</Text>
                </MenuItem>
                {(preferenceWork.webRTCTypes || []).map(type => (
                  <MenuItem
                    key={string(type.name)}
                    style={[
                      styles.brPreferencePanelMenuItem,
                      styles.brWebRTCTypeItem,
                    ]}
                    dropDown={true}
                    onPress={this.changePreferenceWork.bind(
                      this,
                      'webRTCTypeName',
                      () => string(type.name),
                    )}
                  >
                    <Text>{string(type.name)}</Text>
                  </MenuItem>
                ))}
              </DropDownMenu>
            </View>
          </View>

          {/* No Video Mode */}
          <View style={styles.preferenceRow}>
            <View style={styles.emptyCell} />
            <Text style={styles.labelText}>
              {uawMsgs.LBL_PREFERENCE_NO_VIDEO_MODE}
            </Text>
            <View style={styles.controlContainer}>
              <DropDownMenu
                uiData={props.uiData}
                style={styles.brNoVideoModeMenu}
                text={
                  preferenceWork.noVideoMode === 'CONFERENCE'
                    ? uawMsgs.LBL_PREFERENCE_NO_VIDEO_MODE_CONFERENCE
                    : preferenceWork.noVideoMode === '.*'
                      ? uawMsgs.LBL_PREFERENCE_NO_VIDEO_MODE_SOUND
                      : uawMsgs.LBL_PREFERENCE_NO_VIDEO_MODE_DISPLAY
                }
              >
                <MenuItem
                  style={[
                    styles.brPreferencePanelMenuItem,
                    styles.brNoVideoModeItem,
                  ]}
                  dropDown={true}
                  onPress={this.changePreferenceWork.bind(
                    this,
                    'noVideoMode',
                    () => '',
                  )}
                >
                  <Text>{uawMsgs.LBL_PREFERENCE_NO_VIDEO_MODE_DISPLAY}</Text>
                </MenuItem>
                <MenuItem
                  style={[
                    styles.brPreferencePanelMenuItem,
                    styles.brNoVideoModeItem,
                  ]}
                  dropDown={true}
                  onPress={this.changePreferenceWork.bind(
                    this,
                    'noVideoMode',
                    () => 'CONFERENCE',
                  )}
                >
                  <Text>{uawMsgs.LBL_PREFERENCE_NO_VIDEO_MODE_CONFERENCE}</Text>
                </MenuItem>
                <MenuItem
                  style={[
                    styles.brPreferencePanelMenuItem,
                    styles.brNoVideoModeItem,
                  ]}
                  dropDown={true}
                  onPress={this.changePreferenceWork.bind(
                    this,
                    'noVideoMode',
                    () => '.*',
                  )}
                >
                  <Text>{uawMsgs.LBL_PREFERENCE_NO_VIDEO_MODE_SOUND}</Text>
                </MenuItem>
              </DropDownMenu>
            </View>
          </View>

          {/* Audio Source */}
          <View style={styles.preferenceRow}>
            <View style={styles.emptyCell} />
            <Text style={styles.labelText}>
              {uawMsgs.LBL_PREFERENCE_AUDIO_SOURCE}
            </Text>
            <View style={styles.controlContainer}>
              <View style={styles.audioSourceContainer}>
                <DropDownMenu
                  uiData={props.uiData}
                  style={styles.brAudioSourceMenu}
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
                        style={[
                          styles.brPreferencePanelMenuItem,
                          styles.brAudioSourceItem,
                        ]}
                        dropDown={true}
                        onPress={this.changePreferenceWork.bind(
                          this,
                          'audioSource',
                          () => device.deviceId,
                        )}
                      >
                        <Text>{this.getDeviceLabel(device)}</Text>
                      </MenuItem>
                    ))}
                </DropDownMenu>
                <ButtonLabeled
                  style={styles.brAudioSourceTestButton}
                  ghost={true}
                  title={
                    this.state.testingAudioSource
                      ? uawMsgs.LBL_PREFERENCE_AUDIO_SOURCE_STOP_BUTTON_TOOLTIP
                      : uawMsgs.LBL_PREFERENCE_AUDIO_SOURCE_TEST_BUTTON_TOOLTIP
                  }
                  onPress={this.handleAudioSourceTestButtonClick.bind(this)}
                >
                  <Text>
                    {this.state.testingAudioSource
                      ? uawMsgs.LBL_PREFERENCE_AUDIO_SOURCE_STOP_BUTTON
                      : uawMsgs.LBL_PREFERENCE_AUDIO_SOURCE_TEST_BUTTON}
                  </Text>
                </ButtonLabeled>
              </View>

              <View
                style={[
                  styles.brAudioSourceTestArea,
                  this.state.testingAudioSource && styles.brTesting,
                ]}
              >
                {this.state.testingAudioSource &&
                this.state.testingAudioSource.analyser ? (
                  <CallMicrophoneLevel
                    uiData={props.uiData}
                    analyser={this.state.testingAudioSource.analyser}
                  />
                ) : (
                  <Text>
                    {string(
                      this.state.testingAudioSource &&
                        (this.state.testingAudioSource.message ||
                          uawMsgs.MSG_PREFERENCE_AUDIO_SOURCE_TESTING),
                    )}
                  </Text>
                )}
              </View>
            </View>
          </View>

          {/* Video Source */}
          <View style={styles.preferenceRow}>
            <View style={styles.emptyCell} />
            <Text style={styles.labelText}>
              {uawMsgs.LBL_PREFERENCE_VIDEO_SOURCE}
            </Text>
            <View style={styles.controlContainer}>
              <View style={styles.videoSourceContainer}>
                <DropDownMenu
                  uiData={props.uiData}
                  style={styles.brVideoSourceMenu}
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
                        style={[
                          styles.brPreferencePanelMenuItem,
                          styles.brVideoSourceItem,
                        ]}
                        dropDown={true}
                        onPress={this.changePreferenceWork.bind(
                          this,
                          'videoSource',
                          () => device.deviceId,
                        )}
                      >
                        <Text>{this.getDeviceLabel(device)}</Text>
                      </MenuItem>
                    ))}
                </DropDownMenu>
                <ButtonLabeled
                  style={styles.brVideoSourceTestButton}
                  ghost={true}
                  title={
                    this.state.testingVideoSource
                      ? uawMsgs.LBL_PREFERENCE_VIDEO_SOURCE_STOP_BUTTON_TOOLTIP
                      : uawMsgs.LBL_PREFERENCE_VIDEO_SOURCE_TEST_BUTTON_TOOLTIP
                  }
                  onPress={this.handleVideoSourceTestButtonClick.bind(this)}
                >
                  <Text>
                    {this.state.testingVideoSource
                      ? uawMsgs.LBL_PREFERENCE_VIDEO_SOURCE_STOP_BUTTON
                      : uawMsgs.LBL_PREFERENCE_VIDEO_SOURCE_TEST_BUTTON}
                  </Text>
                </ButtonLabeled>
              </View>

              <View
                ref={this.videoSourceTestAreaRef}
                style={[
                  styles.brVideoSourceTestArea,
                  {
                    minWidth: this.state.preferenceContentLayout.width - 32,
                    width: '100%',
                    height: this.state.testingVideoSource
                      ? (this.state.preferenceContentLayout.height + 88) / 2
                      : 0,
                  },
                ]}
                onLayout={event => {
                  const { width, height } = event.nativeEvent.layout
                  this.setState({
                    videoTestAreaLayout: {
                      width,
                      height,
                    },
                  })
                }}
              >
                {this.state.testingVideoSource &&
                this.state.testingVideoSource.streamObject ? (
                  <RTCView
                    ref={this.videoSourceTestVideoRef}
                    style={styles.brVideoSourceTestVideo}
                    streamURL={this.state.testingVideoSource.streamObject.toURL()}
                    objectFit='cover'
                    zOrder={1}
                  />
                ) : (
                  <Text style={styles.testMessage}>
                    {string(
                      this.state.testingVideoSource &&
                        this.state.testingVideoSource.message,
                    )}
                  </Text>
                )}
              </View>
            </View>
          </View>

          {/* Lamp Type Section */}
          <View style={styles.preferenceRow}>
            <View style={styles.emptyCell} />
            <Text style={styles.labelText}>
              {uawMsgs.LBL_PREFERENCE_LAMP_TYPE}
            </Text>
            <View style={styles.controlContainer}>
              <View style={styles.lampTypeContainer}>
                <DropDownMenu
                  uiData={props.uiData}
                  style={styles.brLampTypeMenu}
                  text={
                    lampTypeNameDisplayTable[
                      string(preferenceWork.lampTypeName)
                    ] || string(preferenceWork.lampTypeName)
                  }
                >
                  {(preferenceWork.lampTypes || []).map(type => (
                    <MenuItem
                      key={string(type.name)}
                      style={[
                        styles.brPreferencePanelMenuItem,
                        styles.brLampTypeItem,
                      ]}
                      dropDown={true}
                      onPress={this.changePreferenceWork.bind(
                        this,
                        'lampTypeName',
                        () => string(type.name),
                      )}
                    >
                      <Text>
                        {lampTypeNameDisplayTable[string(type.name)] ||
                          string(type.name)}
                      </Text>
                    </MenuItem>
                  ))}
                </DropDownMenu>
                <ButtonLabeled
                  style={styles.brLampTypeTestButton}
                  disabled={this.state.testingLampType}
                  ghost={true}
                  title={
                    this.state.testingLampType
                      ? ''
                      : uawMsgs.LBL_PREFERENCE_LAMP_TYPE_TEST_BUTTON_TOOLTIP
                  }
                  onPress={this.handleLampTypeTestButtonClick.bind(this)}
                >
                  <Text>
                    {string(
                      this.state.testingLampType ||
                        uawMsgs.LBL_PREFERENCE_LAMP_TYPE_TEST_BUTTON,
                    )}
                  </Text>
                </ButtonLabeled>
              </View>
            </View>
          </View>

          {/* Bell Audio Target Section */}
          <View style={styles.preferenceRow}>
            <View style={styles.emptyCell} />
            <Text style={styles.labelText}>
              {uawMsgs.LBL_PREFERENCE_BELL_AUDIO_TARGET}
            </Text>
            <View style={styles.controlContainer}>
              <View style={styles.bellAudioTargetContainer}>
                <DropDownMenu
                  uiData={props.uiData}
                  style={styles.brBellAudioTargetMenu}
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
                        style={[
                          styles.brPreferencePanelMenuItem,
                          styles.brBellAudioTargetItem,
                        ]}
                        dropDown={true}
                        onPress={this.changePreferenceWork.bind(
                          this,
                          'bellAudioTarget',
                          () => device.deviceId,
                        )}
                      >
                        <Text>{this.getDeviceLabel(device)}</Text>
                      </MenuItem>
                    ))}
                </DropDownMenu>
                <ButtonLabeled
                  style={styles.brBellAudioTargetTestButton}
                  ghost={true}
                  title={
                    uawMsgs.LBL_PREFERENCE_BELL_AUDIO_TARGET_TEST_BUTTON_TOOLTIP
                  }
                  onPress={this.handleBellAudioTargetTestButtonClick.bind(this)}
                >
                  <Text>
                    {uawMsgs.LBL_PREFERENCE_BELL_AUDIO_TARGET_TEST_BUTTON}
                  </Text>
                </ButtonLabeled>
                <MultipleAudio
                  ref={this.bellAudioTargetTestMultipleAudioRef}
                  uiData={props.uiData}
                  style={styles.brBellAudioTargetTestMultipleAudio}
                  audioClassName='brBellAudioTargetTestAudio'
                  src={sound}
                  deviceId={preferenceWork.bellAudioTarget}
                />
              </View>
            </View>
          </View>

          {/* Chat Background Color Section */}
          {!preferenceWork.chatBgColorLocked && (
            <View style={styles.preferenceRow}>
              <View style={styles.emptyCell} />
              <Text style={styles.labelText}>
                {uawMsgs.LBL_PREFERENCE_CHAT_BG_COLOR}
              </Text>
              <View style={styles.controlContainer}>
                <DropDownMenu
                  uiData={props.uiData}
                  style={styles.brChatBgColorMenu}
                  disabled={preferenceWork.chatBgColorLocked}
                  text={
                    !preferenceWork.chatBgColor
                      ? uawMsgs.LBL_PREFERENCE_CHAT_BG_COLOR_STANDARD
                      : uawMsgs.LBL_PREFERENCE_CHAT_BG_COLOR_CUSTOM
                  }
                >
                  <MenuItem
                    style={[
                      styles.brPreferencePanelMenuItem,
                      styles.brChatBgColorItem,
                    ]}
                    dropDown={true}
                    onPress={() =>
                      props.uiData.fire(
                        'preferenceChatBgColorStandard_onClick',
                        props.panelType,
                        props.panelCode,
                      )
                    }
                  >
                    <Text>{uawMsgs.LBL_PREFERENCE_CHAT_BG_COLOR_STANDARD}</Text>
                  </MenuItem>
                  <MenuItem
                    style={[
                      styles.brPreferencePanelMenuItem,
                      styles.brChatBgColorItem,
                    ]}
                    dropDown={true}
                    onPress={() =>
                      props.uiData.fire(
                        'preferenceChatBgColorCustom_onClick',
                        props.panelType,
                        props.panelCode,
                      )
                    }
                  >
                    <Text>{uawMsgs.LBL_PREFERENCE_CHAT_BG_COLOR_CUSTOM}</Text>
                  </MenuItem>
                </DropDownMenu>
              </View>
            </View>
          )}

          {/* Debug Options Section */}
          {!preferenceWork.dbgoptLocked && (
            <View style={styles.preferenceRow}>
              <View style={styles.emptyCell} />
              <Text style={styles.labelText}>
                {uawMsgs.LBL_PREFERENCE_DBGOPT}
              </Text>
              <View style={styles.controlContainer}>
                <TextBox
                  style={styles.brDbgoptInput}
                  value={string(preferenceWork.dbgopt)}
                  onChangeText={text =>
                    this.changePreferenceWork('dbgopt', () => string(text))
                  }
                />
              </View>
            </View>
          )}
        </ScrollView>

        <View style={styles.brPreferenceFooter}>
          <ButtonLabeled
            style={styles.brSaveButton}
            disabled={preferenceWork.nowSaving}
            progress={preferenceWork.nowSaving}
            vivid={true}
            title={uawMsgs.CMN_SAVE}
            onPress={props.uiData.fire.bind(
              props.uiData,
              'preferenceSaveButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          >
            <Text>{uawMsgs.CMN_SAVE}</Text>
          </ButtonLabeled>
          <ButtonLabeled
            style={styles.brCloseButton}
            title={uawMsgs.CMN_CLOSE}
            onPress={props.uiData.fire.bind(
              props.uiData,
              'tabLinkHideButton_onClick',
              props.panelType,
              props.panelCode,
            )}
          >
            <Text>{uawMsgs.CMN_CLOSE}</Text>
          </ButtonLabeled>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  brPreferencePanel: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },

  brSelected: {
    // Add selected state styles
  },

  brStatusOptionsEnabled: {
    // Add enabled state styles
  },

  brStatusOptionsEnabledLocked: {
    // Add locked state styles
  },

  brPreferenceContent: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 64,
  },

  brPreferenceTable: {
    padding: 12,
  },

  tableCellBase: {
    padding: 4,
    paddingLeft: 8,
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.3,
  },

  brInitialStatusMenu: {
    paddingLeft: 42,
  },

  brInitialStatusMenuText: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  brStatusIcon: {
    position: 'absolute',
    left: 16,
    width: 10,
    height: 10,
  },

  brStatusOptionsBottomTd: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },

  brStatusOptionsStatusLabel: {
    position: 'relative',
    paddingLeft: 42,
    flexDirection: 'row',
    alignItems: 'center',
  },

  brStatusOptionsTdContent: {
    maxHeight: 100,
    overflow: 'hidden',
    opacity: 1,
  },

  brStatusOptionsLampTypeLabel: {
    paddingLeft: 16,
  },

  brProfileImagePreview: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },

  brNoImage: {
    backgroundColor: '#E0E0E0',
  },

  brProgress: {
    opacity: 0.7,
  },

  brProfileImageUploadButton: {
    marginLeft: 4,
  },

  brProfileImageDeleteButton: {
    marginLeft: 4,
  },

  brPreferencePanelCheckBox: {
    paddingLeft: 40,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: 0.3,
    color: '#1A1A1A',
    flexDirection: 'row',
    alignItems: 'center',
  },

  brDisplayPeriodInput: {
    width: 60,
  },

  audioSourceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  brAudioSourceMenu: {
    alignSelf: 'center',
  },

  brAudioSourceTestButton: {
    marginLeft: 4,
    width: 80,
  },

  brAudioSourceTestArea: {
    position: 'relative',
    height: 0,
    overflow: 'hidden',
    color: '#FF5722',
  },

  brTesting: {
    height: 20,
  },

  brCallMicrophoneLevel: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 200,
    height: 4,
  },

  videoSourceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  brVideoSourceTestArea: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
    borderRadius: 4,
  },

  brVideoSourceTestVideo: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },

  lampTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  brLampTypeMenu: {
    alignSelf: 'center',
  },

  brLampTypeTestButton: {
    marginLeft: 4,
    width: 80,
  },

  bellAudioTargetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  brBellAudioTargetMenu: {
    alignSelf: 'center',
  },

  brBellAudioTargetTestButton: {
    marginLeft: 4,
    width: 80,
  },

  brPreferenceFooter: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 64,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    padding: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  brSaveButton: {
    width: 160,
    marginRight: 16,
  },

  brCloseButton: {
    width: 160,
    marginRight: 16,
  },

  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 16,
  },

  displayPeriodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  categoryText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },

  labelText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },

  controlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  emptyCell: {
    flex: 1,
  },

  statusLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  brStatusOptionsStatusLabelTr: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  brStatusOptionsLampTypeTr: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  brStatusOptionsEnabledCheck: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },

  brSendingConfirmationCheck: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },

  brNameDisplayModeCheck: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },

  brNotifyCallStatusCheck: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },

  brNotifyConfStatusCheck: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },

  brDtmfShortcutCheck: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },

  brDtmfShortcut0Check: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },

  brAutoSignInCheck: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },

  brWebRTCEnabledCheck: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },

  brWebRTCTypeMenu: {
    minWidth: 200,
  },

  brWebRTCTypeItem: {
    // Add WebRTC type item styles
  },

  brNoVideoModeMenu: {
    minWidth: 200,
  },

  brNoVideoModeItem: {
    // Add No Video Mode item styles
  },

  brLanguageMenu: {
    minWidth: 200,
  },

  brLanguageItem: {
    // Add language item styles
  },

  brLoginPassword: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
  },

  brLoginPasswordConfirm: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
  },

  brDisplayNameInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
  },

  brChatBgColorMenu: {
    minWidth: 200,
  },

  brChatBgColorItem: {
    // Add chat background color item styles
  },

  brDbgoptInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    width: '100%',
  },

  testMessage: {
    padding: 16,
    textAlign: 'center',
    color: '#FF5722',
  },
})
