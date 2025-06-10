'use strict'

function _typeof(o) {
  '@babel/helpers - typeof'
  return (
    (_typeof =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (o) {
            return typeof o
          }
        : function (o) {
            return o &&
              'function' == typeof Symbol &&
              o.constructor === Symbol &&
              o !== Symbol.prototype
              ? 'symbol'
              : typeof o
          }),
    _typeof(o)
  )
}
Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _react = _interopRequireDefault(require('react'))
var _reactNative = require('react-native')
var _reactNativeWebrtc = require('react-native-webrtc')
var _uawmsgs = _interopRequireDefault(require('../utilities/uawmsgs'))
var _constants = _interopRequireDefault(require('../utilities/constants'))
var _strings = require('../utilities/strings')
var _ButtonLabeled = _interopRequireDefault(require('./ButtonLabeled'))
var _CallMicrophoneLevel = _interopRequireDefault(
  require('./CallMicrophoneLevel'),
)
var _DropDownMenu = _interopRequireDefault(require('./DropDownMenu'))
var _MenuItem = _interopRequireDefault(require('./MenuItem'))
var _MultipleAudio = _interopRequireDefault(require('./MultipleAudio'))
var _StatusIcon = _interopRequireDefault(require('./StatusIcon'))
var _TextBox = _interopRequireDefault(require('./TextBox'))
var _currentscript = _interopRequireDefault(
  require('../utilities/currentscript'),
)
var ImagePicker = _interopRequireWildcard(require('react-native-image-picker'))
var _jsxRuntime = require('react/jsx-runtime')
function _interopRequireWildcard(e, t) {
  if ('function' == typeof WeakMap)
    var r = new WeakMap(),
      n = new WeakMap()
  return (_interopRequireWildcard = function _interopRequireWildcard(e, t) {
    if (!t && e && e.__esModule) return e
    var o,
      i,
      f = { __proto__: null, default: e }
    if (null === e || ('object' != _typeof(e) && 'function' != typeof e))
      return f
    if ((o = t ? n : r)) {
      if (o.has(e)) return o.get(e)
      o.set(e, f)
    }
    for (var _t in e)
      'default' !== _t &&
        {}.hasOwnProperty.call(e, _t) &&
        ((i =
          (o = Object.defineProperty) &&
          Object.getOwnPropertyDescriptor(e, _t)) &&
        (i.get || i.set)
          ? o(f, _t, i)
          : (f[_t] = e[_t]))
    return f
  })(e, t)
}
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e }
}
function _classCallCheck(a, n) {
  if (!(a instanceof n))
    throw new TypeError('Cannot call a class as a function')
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t]
    ;(o.enumerable = o.enumerable || !1),
      (o.configurable = !0),
      'value' in o && (o.writable = !0),
      Object.defineProperty(e, _toPropertyKey(o.key), o)
  }
}
function _createClass(e, r, t) {
  return (
    r && _defineProperties(e.prototype, r),
    t && _defineProperties(e, t),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  )
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, 'string')
  return 'symbol' == _typeof(i) ? i : i + ''
}
function _toPrimitive(t, r) {
  if ('object' != _typeof(t) || !t) return t
  var e = t[Symbol.toPrimitive]
  if (void 0 !== e) {
    var i = e.call(t, r || 'default')
    if ('object' != _typeof(i)) return i
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return ('string' === r ? String : Number)(t)
}
function _callSuper(t, o, e) {
  return (
    (o = _getPrototypeOf(o)),
    _possibleConstructorReturn(
      t,
      _isNativeReflectConstruct()
        ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor)
        : o.apply(t, e),
    )
  )
}
function _possibleConstructorReturn(t, e) {
  if (e && ('object' == _typeof(e) || 'function' == typeof e)) return e
  if (void 0 !== e)
    throw new TypeError(
      'Derived constructors may only return object or undefined',
    )
  return _assertThisInitialized(t)
}
function _assertThisInitialized(e) {
  if (void 0 === e)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    )
  return e
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {}),
    )
  } catch (t) {}
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
    return !!t
  })()
}
function _getPrototypeOf(t) {
  return (
    (_getPrototypeOf = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t)
        }),
    _getPrototypeOf(t)
  )
}
function _inherits(t, e) {
  if ('function' != typeof e && null !== e)
    throw new TypeError('Super expression must either be null or a function')
  ;(t.prototype = Object.create(e && e.prototype, {
    constructor: { value: t, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(t, 'prototype', { writable: !1 }),
    e && _setPrototypeOf(t, e)
}
function _setPrototypeOf(t, e) {
  return (
    (_setPrototypeOf = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (t, e) {
          return (t.__proto__ = e), t
        }),
    _setPrototypeOf(t, e)
  )
}
var sound = require('../sounds/bell.mp3')

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
var PreferencePanel = (exports.default = /*#__PURE__*/ (function (
  _React$Component,
) {
  function PreferencePanel(props) {
    var _this
    _classCallCheck(this, PreferencePanel)
    _this = _callSuper(this, PreferencePanel, [props])
    _this._isMounted = false
    _this.lampTypeTestTimer = null
    _this.state = {
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
    _this.preferenceContentRef = /*#__PURE__*/ _react.default.createRef()
    _this.videoSourceTestAreaRef = /*#__PURE__*/ _react.default.createRef()
    _this.videoSourceTestVideoRef = /*#__PURE__*/ _react.default.createRef()
    _this.bellAudioTargetTestMultipleAudioRef =
      /*#__PURE__*/ _react.default.createRef()
    return _this
  }
  _inherits(PreferencePanel, _React$Component)
  return _createClass(PreferencePanel, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var props = this.props
        this._isMounted = true
        if (props.uiData.phone && props.uiData.phone.checkUserMedia) {
          props.uiData.phone.checkUserMedia(this.getDevices.bind(this))
        } else {
          this.getDevices()
        }
      },
    },
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps, prevState) {
        var _this$state$testingVi, _prevState$testingVid
        var props = this.props

        // Handle preference content and video test area dimensions
        if (
          this.preferenceContentRef.current &&
          this.videoSourceTestAreaRef.current
        ) {
          // Update video test area dimensions
          if (this.state.testingVideoSource) {
            var maxHeight = this.state.preferenceContentLayout.height || 88
            var minHeight = Math.min(maxHeight, 88)
            var newHeight = (minHeight + maxHeight) / 2
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
          ((_this$state$testingVi = this.state.testingVideoSource) === null ||
          _this$state$testingVi === void 0
            ? void 0
            : _this$state$testingVi.streamObject) !==
          ((_prevState$testingVid = prevState.testingVideoSource) === null ||
          _prevState$testingVid === void 0
            ? void 0
            : _prevState$testingVid.streamObject)
        ) {
          if (this.videoSourceTestVideoRef.current) {
            var _this$state$testingVi2
            this.videoSourceTestVideoRef.current.setNativeProps({
              streamURL:
                ((_this$state$testingVi2 = this.state.testingVideoSource) ===
                  null ||
                _this$state$testingVi2 === void 0 ||
                (_this$state$testingVi2 =
                  _this$state$testingVi2.streamObject) === null ||
                _this$state$testingVi2 === void 0
                  ? void 0
                  : _this$state$testingVi2.toURL()) || null,
              objectFit: 'cover',
            })
          }
        }
      },
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        var props = this.props
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
      },
    },
    {
      key: 'getDevices',
      value: function getDevices() {
        var _this2 = this
        var props = this.props
        if (
          typeof navigator !== 'undefined' &&
          navigator.mediaDevices &&
          navigator.mediaDevices.enumerateDevices
        ) {
          navigator.mediaDevices
            .enumerateDevices()
            .then(function (devices) {
              if (_this2._isMounted) {
                var isSafari =
                  typeof navigator !== 'undefined'
                    ? new RegExp(
                        (props.uiData.configurations &&
                          props.uiData.configurations.uaForFlyweightAudio) ||
                          '^(?=.*Safari)(?!.*Chrome).*$',
                      ).test(navigator.userAgent)
                    : false
                _this2.setState({
                  devices: [
                    {
                      deviceId: '',
                      groupId: '',
                      kind: 'audioinput',
                      label: '',
                    },
                    {
                      deviceId: '',
                      groupId: '',
                      kind: 'videoinput',
                      label: '',
                    },
                    {
                      deviceId: '',
                      groupId: '',
                      kind: 'audiooutput',
                      label: '',
                    },
                  ]
                    .concat(
                      devices.filter(function (device) {
                        return device && device.deviceId
                      }),
                    )
                    .concat(
                      !isSafari &&
                        devices.some(function (d) {
                          return d.kind === 'audiooutput'
                        })
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
            .catch(function (error) {
              props.uiData.ucUiStore.getLogger().log('warn', error)
            })
        } else {
          props.uiData.ucUiStore
            .getLogger()
            .log('warn', 'enumerateDevices() not supported.')
        }
      },
    },
    {
      key: 'getDeviceLabel',
      value: function getDeviceLabel(device) {
        var props = this.props
        var label = ''
        if (device) {
          if (device.deviceId === '') {
            label = _uawmsgs.default.LBL_CALL_DEVICE_AUTO
          } else if (device.deviceId === '_all_devices') {
            label = _uawmsgs.default.LBL_CALL_DEVICE_ALL
          } else if (device.deviceId) {
            var existingDevice
            if (typeof device.label === 'undefined') {
              existingDevice = this.state.devices.find(function (d) {
                return d.kind === device.kind && d.deviceId === device.deviceId
              })
            } else {
              existingDevice = device
            }
            if (existingDevice) {
              var existingDeviceId = (0, _strings.string)(
                existingDevice.deviceId,
              )
              if (existingDevice.label) {
                label = (0, _strings.string)(existingDevice.label)
              } else if (existingDeviceId.length > 20) {
                label =
                  (0, _strings.string)(existingDevice.kind) +
                  ' ' +
                  existingDeviceId.substring(0, 17) +
                  '...'
              } else {
                label =
                  (0, _strings.string)(existingDevice.kind) +
                  ' ' +
                  existingDeviceId
              }
            } else {
              label = '...'
            }
          }
        }
        return label
      },
    },
    {
      key: 'changePreferenceWork',
      value: function changePreferenceWork(key, getValue) {
        var props = this.props
        var preferenceWork =
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
          this.setState({
            testingAudioSource: null,
          })
        } else if (key === 'videoSource' && this.state.testingVideoSource) {
          if (typeof this.state.testingVideoSource.dispose === 'function') {
            this.state.testingVideoSource.dispose()
          }
          this.setState({
            testingVideoSource: null,
          })
        } else {
          this.setState({})
        }
      },
    },
    {
      key: 'handleProfileImageUploadButtonClick',
      value: function handleProfileImageUploadButtonClick(ev) {
        var props = this.props
        var preferenceWork =
          props.uiData.preferenceWorkTable &&
          props.uiData.preferenceWorkTable[props.panelCode]
        if (!preferenceWork) {
          return
        }
        var options = {
          mediaType: 'photo',
          quality: 1,
          includeBase64: false,
        }
        ImagePicker.launchImageLibrary(options, function (response) {
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
      },
    },
    {
      key: 'handleAudioSourceTestButtonClick',
      value: function handleAudioSourceTestButtonClick(ev) {
        var _this3 = this
        var props = this.props
        if (!this.state.testingAudioSource) {
          props.uiData.ucUiStore
            .getLogger()
            .log('debug', 'audio source test started')
          var preferenceWork =
            props.uiData.preferenceWorkTable &&
            props.uiData.preferenceWorkTable[props.panelCode]
          if (
            preferenceWork &&
            props.uiData.phone &&
            typeof props.uiData.phone.checkUserMedia === 'function'
          ) {
            this.setState({
              testingAudioSource: {},
              testingVideoSource: null,
            })
            props.uiData.phone.checkUserMedia(
              function (e) {
                props.uiData.ucUiStore
                  .getLogger()
                  .log(
                    'debug',
                    'audio source test checkUserMedia: e.message=' + e.message,
                  )
                if (_this3._isMounted && _this3.state.testingAudioSource) {
                  _this3.setState({
                    testingAudioSource: e,
                  })
                } else {
                  if (typeof e.dispose === 'function') {
                    e.dispose()
                  }
                }
              },
              {
                mediaConstraints: {
                  audio: {
                    deviceId: preferenceWork.audioSource,
                  },
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
          this.setState({
            testingAudioSource: null,
          })
        }
      },
    },
    {
      key: 'handleVideoSourceTestButtonClick',
      value: function handleVideoSourceTestButtonClick(ev) {
        var _this4 = this
        var props = this.props
        if (!this.state.testingVideoSource) {
          props.uiData.ucUiStore
            .getLogger()
            .log('debug', 'video source test started')
          var preferenceWork =
            props.uiData.preferenceWorkTable &&
            props.uiData.preferenceWorkTable[props.panelCode]
          if (
            preferenceWork &&
            props.uiData.phone &&
            typeof props.uiData.phone.checkUserMedia === 'function'
          ) {
            this.setState({
              testingAudioSource: null,
              testingVideoSource: {},
            })
            var webRTCTypeName =
              !preferenceWork.webRTCTypeName ||
              preferenceWork.tenantWebRTCTypeNameLocked
                ? preferenceWork.tenantWebRTCTypeName
                : preferenceWork.webRTCTypeName
            var options = {}
            try {
              options =
                JSON.parse(
                  preferenceWork.webRTCTypes.find(function (type) {
                    return type.name === webRTCTypeName
                  }).options,
                ) || {}
            } catch (ex) {}
            var video =
              (options.callOptions &&
                options.callOptions.mediaConstraints &&
                options.callOptions.mediaConstraints.video) ||
              {}
            props.uiData.phone.checkUserMedia(
              function (e) {
                props.uiData.ucUiStore
                  .getLogger()
                  .log(
                    'debug',
                    'video source test checkUserMedia: e.message=' + e.message,
                  )
                if (_this4._isMounted && _this4.state.testingVideoSource) {
                  _this4.setState({
                    testingVideoSource: e,
                  })
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
          this.setState({
            testingVideoSource: null,
          })
        }
      },
    },
    {
      key: 'handleLampTypeTestButtonClick',
      value: function handleLampTypeTestButtonClick(ev) {
        var props = this.props
        if (!this.state.testingLampType) {
          props.uiData.ucUiStore
            .getLogger()
            .log('debug', 'lamp type test started')
          this.lampTypeTestTimer = setTimeout(
            this.lampTypeTestTimerTick.bind(this),
            1000,
          )
          this.setState({
            testingLampType: 5,
          })
        }
      },
    },
    {
      key: 'lampTypeTestTimerTick',
      value: function lampTypeTestTimerTick() {
        var props = this.props
        if (this.state.testingLampType > 1) {
          this.lampTypeTestTimer = setTimeout(
            this.lampTypeTestTimerTick.bind(this),
            1000,
          )
          this.setState({
            testingLampType: this.state.testingLampType - 1,
          })
        } else if (this.state.testingLampType === 1) {
          this.lampTypeTestTimer = null
          this.setState({
            testingLampType: 0,
          })
          props.uiData.fire(
            'preferenceLampTypeTestTimer_onTick',
            props.panelType,
            props.panelCode,
          )
        }
      },
    },
    {
      key: 'handleBellAudioTargetTestButtonClick',
      value: function handleBellAudioTargetTestButtonClick(ev) {
        var props = this.props
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
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this5 = this
        var props = this.props
        var preferenceWork =
          (props.uiData.preferenceWorkTable &&
            props.uiData.preferenceWorkTable[props.panelCode]) ||
          {}
        var statusList = [
          _constants.default.STATUS_AVAILABLE,
          _constants.default.STATUS_OFFLINE,
          _constants.default.STATUS_BUSY,
        ]
        var statusTable = {}
        statusTable[_constants.default.STATUS_AVAILABLE] = {
          label: _uawmsgs.default.CMN_OWN_STATUS_STRING_AVAILABLE,
        }
        statusTable[_constants.default.STATUS_OFFLINE] = {
          label: _uawmsgs.default.CMN_OWN_STATUS_STRING_INVISIBLE,
        }
        statusTable[_constants.default.STATUS_BUSY] = {
          label: _uawmsgs.default.CMN_OWN_STATUS_STRING_BUSY,
        }
        var languageTable = {}
        languageTable[''] = {
          label: _uawmsgs.default.LBL_PREFERENCE_LANGUAGE_AUTO,
        }
        ;(preferenceWork.validLanguages || []).forEach(function (language) {
          languageTable[language] = {
            label:
              _uawmsgs.default[
                'CMN_LANGUAGE_' + (0, _strings.string)(language).toUpperCase()
              ],
          }
        })
        var lampTypeNameDisplayTable = {}
        lampTypeNameDisplayTable[''] =
          _uawmsgs.default.LBL_PREFERENCE_LAMP_TYPE_STANDARD
        lampTypeNameDisplayTable['_silent'] =
          _uawmsgs.default.LBL_PREFERENCE_LAMP_TYPE_SILENT
        return /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: [
            styles.brPreferencePanel,
            props.uiData.currentSelectedTab ===
              ''.concat(props.panelType, '_').concat(props.panelCode) &&
              styles.brSelected,
            preferenceWork.statusOptionsEnabled &&
              styles.brStatusOptionsEnabled,
            preferenceWork.statusOptionsEnabledLocked &&
              styles.brStatusOptionsEnabledLocked,
          ],
          children: [
            /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.ScrollView, {
              ref: this.preferenceContentRef,
              style: styles.brPreferenceContent,
              onLayout: function onLayout(event) {
                var _event$nativeEvent$la = event.nativeEvent.layout,
                  width = _event$nativeEvent$la.width,
                  height = _event$nativeEvent$la.height
                _this5.setState({
                  preferenceContentLayout: {
                    width: width,
                    height: height,
                  },
                })
              },
              children: [
                /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                  style: styles.preferenceSectionContainer,
                  children: [
                    /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                      style: styles.preferenceRow,
                      children: [
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                          style: styles.categoryText,
                          children:
                            _uawmsgs.default.LBL_PREFERENCE_CATEGORY_USER,
                        }),
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                          style: styles.labelText,
                          children:
                            _uawmsgs.default.LBL_PREFERENCE_INITIAL_STATUS,
                        }),
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                          style: styles.controlContainer,
                          children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _DropDownMenu.default,
                            {
                              uiData: props.uiData,
                              style: styles.brInitialStatusMenu,
                              text: /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                                _reactNative.View,
                                {
                                  style: styles.brInitialStatusMenuText,
                                  children: [
                                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                      _StatusIcon.default,
                                      {
                                        status: (0, _strings.int)(
                                          preferenceWork.initialStatus,
                                        ),
                                      },
                                    ),
                                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                      _reactNative.Text,
                                      {
                                        children: (0, _strings.string)(
                                          (
                                            statusTable[
                                              (0, _strings.int)(
                                                preferenceWork.initialStatus,
                                              )
                                            ] || {}
                                          ).label,
                                        ),
                                      },
                                    ),
                                  ],
                                },
                              ),
                              children: statusList.map(function (status) {
                                return /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                                  _MenuItem.default,
                                  {
                                    style: [
                                      styles.brPreferencePanelMenuItem,
                                      styles.brInitialStatusItem,
                                    ],
                                    dropDown: true,
                                    onPress: _this5.changePreferenceWork.bind(
                                      _this5,
                                      'initialStatus',
                                      function () {
                                        return status
                                      },
                                    ),
                                    children: [
                                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                        _StatusIcon.default,
                                        {
                                          status: status,
                                        },
                                      ),
                                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                        _reactNative.Text,
                                        {
                                          children: statusTable[status].label,
                                        },
                                      ),
                                    ],
                                  },
                                  status,
                                )
                              }),
                            },
                          ),
                        }),
                      ],
                    }),
                    !preferenceWork.statusOptionsEnabledLocked &&
                      /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                        style: styles.preferenceRow,
                        children: [
                          /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _reactNative.View,
                            {
                              style: styles.emptyCell,
                            },
                          ),
                          /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _reactNative.View,
                            {
                              style: styles.brStatusOptionsBottomTd,
                              children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                _reactNative.Text,
                                {
                                  children:
                                    _uawmsgs.default
                                      .LBL_PREFERENCE_STATUS_OPTIONS_ENABLED,
                                },
                              ),
                            },
                          ),
                          /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _reactNative.View,
                            {
                              style: styles.brStatusOptionsBottomTd,
                              children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                _reactNative.TouchableOpacity,
                                {
                                  style: [
                                    styles.brPreferencePanelCheckBox,
                                    styles.brStatusOptionsEnabledCheck,
                                    preferenceWork.statusOptionsEnabled
                                      ? styles.br_bi_icon_square_svg
                                      : [
                                          styles.brSelected,
                                          styles.br_bi_icon_check_svg,
                                        ],
                                  ],
                                  onPress: this.changePreferenceWork.bind(
                                    this,
                                    'statusOptionsEnabled',
                                    preferenceWork.statusOptionsEnabled
                                      ? function () {
                                          return false
                                        }
                                      : function () {
                                          return true
                                        },
                                  ),
                                  children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                    _reactNative.Text,
                                    {
                                      children:
                                        _uawmsgs.default
                                          .LBL_PREFERENCE_STATUS_OPTIONS_ENABLED_CHECK,
                                    },
                                  ),
                                },
                              ),
                            },
                          ),
                        ],
                      }),
                    statusList.map(function (status, index) {
                      var statusOption =
                        preferenceWork.statusOptions[status] || {}
                      return /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                        _react.default.Fragment,
                        {
                          children: [
                            /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                              _reactNative.View,
                              {
                                style: [
                                  styles.preferenceRow,
                                  styles.brStatusOptionsStatusLabelTr,
                                ],
                                children: [
                                  /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                    _reactNative.View,
                                    {
                                      style: styles.emptyCell,
                                    },
                                  ),
                                  /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                    _reactNative.View,
                                    {
                                      style: styles.statusLabelContainer,
                                      children: /*#__PURE__*/ (0,
                                      _jsxRuntime.jsxs)(_reactNative.View, {
                                        style: [
                                          styles.brStatusOptionsStatusLabel,
                                          styles.brStatusOptionsTdContent,
                                        ],
                                        children: [
                                          /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                            _StatusIcon.default,
                                            {
                                              status: status,
                                            },
                                          ),
                                          /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                            _reactNative.Text,
                                            {
                                              children:
                                                statusTable[status].label,
                                            },
                                          ),
                                        ],
                                      }),
                                    },
                                  ),
                                  /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                    _reactNative.View,
                                    {
                                      style: styles.emptyCell,
                                    },
                                  ),
                                ],
                              },
                            ),
                            /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                              _reactNative.View,
                              {
                                style: [
                                  styles.preferenceRow,
                                  styles.brStatusOptionsLampTypeTr,
                                ],
                                children: [
                                  /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                    _reactNative.View,
                                    {
                                      style: styles.emptyCell,
                                    },
                                  ),
                                  /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                    _reactNative.View,
                                    {
                                      style: styles.brStatusOptionsBottomTd,
                                      children: /*#__PURE__*/ (0,
                                      _jsxRuntime.jsx)(_reactNative.View, {
                                        style: [
                                          styles.brStatusOptionsLampTypeLabel,
                                          styles.brStatusOptionsTdContent,
                                        ],
                                        children: /*#__PURE__*/ (0,
                                        _jsxRuntime.jsx)(_reactNative.Text, {
                                          children:
                                            _uawmsgs.default
                                              .LBL_PREFERENCE_STATUS_OPTIONS_LAMP_TYPE,
                                        }),
                                      }),
                                    },
                                  ),
                                  /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                    _reactNative.View,
                                    {
                                      style: styles.brStatusOptionsBottomTd,
                                      children: /*#__PURE__*/ (0,
                                      _jsxRuntime.jsx)(_reactNative.View, {
                                        style: styles.brStatusOptionsTdContent,
                                        children: /*#__PURE__*/ (0,
                                        _jsxRuntime.jsxs)(
                                          _DropDownMenu.default,
                                          {
                                            uiData: props.uiData,
                                            style:
                                              styles.brStatusOptionsLampTypeMenu,
                                            text:
                                              typeof statusOption.lampTypeName !==
                                              'undefined'
                                                ? lampTypeNameDisplayTable[
                                                    (0, _strings.string)(
                                                      statusOption.lampTypeName,
                                                    )
                                                  ] ||
                                                  (0, _strings.string)(
                                                    statusOption.lampTypeName,
                                                  )
                                                : _uawmsgs.default
                                                    .LBL_PREFERENCE_STATUS_OPTIONS_LAMP_TYPE_DEFAULT,
                                            children: [
                                              /*#__PURE__*/ (0,
                                              _jsxRuntime.jsx)(
                                                _MenuItem.default,
                                                {
                                                  className:
                                                    'brPreferencePanelMenuItem brStatusOptionsLampTypeItem brStatusOptionsLampTypeDefault',
                                                  dropDown: true,
                                                  onClick:
                                                    _this5.changePreferenceWork.bind(
                                                      _this5,
                                                      'statusOptions',
                                                      function (statusOptions) {
                                                        if (
                                                          statusOptions[status]
                                                        ) {
                                                          delete statusOptions[
                                                            status
                                                          ].lampTypeName
                                                        }
                                                        return statusOptions
                                                      },
                                                    ),
                                                  children:
                                                    _uawmsgs.default
                                                      .LBL_PREFERENCE_STATUS_OPTIONS_LAMP_TYPE_DEFAULT,
                                                },
                                              ),
                                              (
                                                preferenceWork.lampTypes || []
                                              ).map(function (type) {
                                                return /*#__PURE__*/ (0,
                                                _jsxRuntime.jsx)(
                                                  _MenuItem.default,
                                                  {
                                                    className:
                                                      'brPreferencePanelMenuItem brStatusOptionsLampTypeItem',
                                                    dropDown: true,
                                                    onClick:
                                                      _this5.changePreferenceWork.bind(
                                                        _this5,
                                                        'statusOptions',
                                                        function (
                                                          statusOptions,
                                                        ) {
                                                          if (
                                                            !statusOptions[
                                                              status
                                                            ]
                                                          ) {
                                                            statusOptions[
                                                              status
                                                            ] = {}
                                                          }
                                                          statusOptions[
                                                            status
                                                          ].lampTypeName = (0,
                                                          _strings.string)(
                                                            type.name,
                                                          )
                                                          return statusOptions
                                                        },
                                                      ),
                                                    children:
                                                      lampTypeNameDisplayTable[
                                                        (0, _strings.string)(
                                                          type.name,
                                                        )
                                                      ] ||
                                                      (0, _strings.string)(
                                                        type.name,
                                                      ),
                                                  },
                                                  (0, _strings.string)(
                                                    type.name,
                                                  ),
                                                )
                                              }),
                                            ],
                                          },
                                        ),
                                      }),
                                    },
                                  ),
                                ],
                              },
                            ),
                          ],
                        },
                        'status-option-'.concat(index),
                      )
                    }),
                  ],
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                  style: styles.preferenceRow,
                  children: [
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                      style: styles.emptyCell,
                    }),
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.labelText,
                      children: _uawmsgs.default.LBL_PREFERENCE_PROFILE_IMAGE,
                    }),
                    /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                      style: styles.controlContainer,
                      children: [
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                          _reactNative.TouchableOpacity,
                          {
                            style: [
                              styles.brProfileImagePreview,
                              (!preferenceWork.profileImageUrl ||
                                preferenceWork.profileImageTo === 'DELETE') &&
                                styles.brNoImage,
                              preferenceWork.profileImageUploading &&
                                styles.brProgress,
                            ],
                            onPress: function onPress() {
                              return props.uiData.fire(
                                'preferenceProfileImagePreview_onClick',
                                props.panelType,
                                props.panelCode,
                              )
                            },
                            children:
                              preferenceWork.profileImageUrl &&
                              preferenceWork.profileImageTo !== 'DELETE' &&
                              !preferenceWork.profileImageUploading &&
                              /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                _reactNative.Image,
                                {
                                  source: {
                                    uri: preferenceWork.profileImageUrl,
                                  },
                                  style: styles.profileImage,
                                  resizeMode: 'cover',
                                },
                              ),
                          },
                        ),
                        /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                          style: styles.imageButtonsContainer,
                          children: [
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _ButtonLabeled.default,
                              {
                                style: styles.brProfileImageUploadButton,
                                disabled: preferenceWork.profileImageUploading,
                                ghost: true,
                                title:
                                  _uawmsgs.default
                                    .LBL_PREFERENCE_PROFILE_IMAGE_UPLOAD_BUTTON_TOOLTIP,
                                onPress:
                                  this.handleProfileImageUploadButtonClick.bind(
                                    this,
                                  ),
                                children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                  _reactNative.Text,
                                  {
                                    children:
                                      _uawmsgs.default
                                        .LBL_PREFERENCE_PROFILE_IMAGE_UPLOAD_BUTTON,
                                  },
                                ),
                              },
                            ),
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _ButtonLabeled.default,
                              {
                                style: styles.brProfileImageDeleteButton,
                                disabled: preferenceWork.profileImageUploading,
                                ghost: true,
                                title:
                                  _uawmsgs.default
                                    .LBL_PREFERENCE_PROFILE_IMAGE_DELETE_BUTTON_TOOLTIP,
                                onPress: this.changePreferenceWork.bind(
                                  this,
                                  'profileImageTo',
                                  function () {
                                    return 'DELETE'
                                  },
                                ),
                                children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                  _reactNative.Text,
                                  {
                                    children:
                                      _uawmsgs.default
                                        .LBL_PREFERENCE_PROFILE_IMAGE_DELETE_BUTTON,
                                  },
                                ),
                              },
                            ),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                  style: styles.preferenceRow,
                  children: [
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                      style: styles.emptyCell,
                    }),
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.labelText,
                      children: _uawmsgs.default.LBL_PREFERENCE_LANGUAGE,
                    }),
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                      style: styles.controlContainer,
                      children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                        _DropDownMenu.default,
                        {
                          uiData: props.uiData,
                          style: styles.brLanguageMenu,
                          disabled: preferenceWork.languageDisabled,
                          text: (0, _strings.string)(
                            (
                              languageTable[
                                (0, _strings.string)(
                                  preferenceWork.userLanguage,
                                )
                              ] || {}
                            ).label,
                          ),
                          children: Object.keys(languageTable).map(
                            function (key) {
                              return /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                _MenuItem.default,
                                {
                                  style: [
                                    styles.brPreferencePanelMenuItem,
                                    styles.brLanguageItem,
                                  ],
                                  dropDown: true,
                                  onPress: _this5.changePreferenceWork.bind(
                                    _this5,
                                    'userLanguage',
                                    function () {
                                      return key
                                    },
                                  ),
                                  children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                    _reactNative.Text,
                                    {
                                      children: languageTable[key].label,
                                    },
                                  ),
                                },
                                key,
                              )
                            },
                          ),
                        },
                      ),
                    }),
                  ],
                }),
                !preferenceWork.loginPasswordLocked &&
                  /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
                    children: [
                      /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                        style: styles.preferenceRow,
                        children: [
                          /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _reactNative.View,
                            {
                              style: styles.emptyCell,
                            },
                          ),
                          /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _reactNative.Text,
                            {
                              style: styles.labelText,
                              children:
                                _uawmsgs.default.LBL_PREFERENCE_LOGIN_PASSWORD,
                            },
                          ),
                          /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _reactNative.View,
                            {
                              style: styles.controlContainer,
                              children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                _TextBox.default,
                                {
                                  style: styles.brLoginPassword,
                                  value: (0, _strings.string)(
                                    preferenceWork.loginPassword,
                                  ),
                                  secureTextEntry: true,
                                  onChangeText: function onChangeText(text) {
                                    return _this5.changePreferenceWork(
                                      'loginPassword',
                                      function () {
                                        return (0, _strings.string)(text)
                                      },
                                    )
                                  },
                                },
                              ),
                            },
                          ),
                        ],
                      }),
                      /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                        style: styles.preferenceRow,
                        children: [
                          /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _reactNative.View,
                            {
                              style: styles.emptyCell,
                            },
                          ),
                          /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _reactNative.Text,
                            {
                              style: styles.labelText,
                              children:
                                _uawmsgs.default
                                  .LBL_PREFERENCE_LOGIN_PASSWORD_CONFIRM,
                            },
                          ),
                          /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _reactNative.View,
                            {
                              style: styles.controlContainer,
                              children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                _TextBox.default,
                                {
                                  style: styles.brLoginPasswordConfirm,
                                  value: (0, _strings.string)(
                                    preferenceWork.loginPasswordConfirm,
                                  ),
                                  secureTextEntry: true,
                                  onChangeText: function onChangeText(text) {
                                    return _this5.changePreferenceWork(
                                      'loginPasswordConfirm',
                                      function () {
                                        return (0, _strings.string)(text)
                                      },
                                    )
                                  },
                                },
                              ),
                            },
                          ),
                        ],
                      }),
                    ],
                  }),
                !preferenceWork.displayNameLocked &&
                  /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                    style: styles.preferenceRow,
                    children: [
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                        style: styles.emptyCell,
                      }),
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                        style: styles.labelText,
                        children:
                          _uawmsgs.default.LBL_PREFERENCE_WEBCHAT_DISPLAY_NAME,
                      }),
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                        style: styles.controlContainer,
                        children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                          _TextBox.default,
                          {
                            style: styles.brDisplayNameInput,
                            value: (0, _strings.string)(
                              preferenceWork.displayName,
                            ),
                            onChangeText: function onChangeText(text) {
                              return _this5.changePreferenceWork(
                                'displayName',
                                function () {
                                  return (0, _strings.string)(text)
                                },
                              )
                            },
                          },
                        ),
                      }),
                    ],
                  }),
                !preferenceWork.sendingConfirmationLocked &&
                  /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                    style: styles.preferenceRow,
                    children: [
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                        style: styles.emptyCell,
                      }),
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                        style: styles.labelText,
                        children:
                          _uawmsgs.default.LBL_PREFERENCE_SENDING_CONFIRMATION,
                      }),
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                        style: styles.controlContainer,
                        children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                          _reactNative.TouchableOpacity,
                          {
                            style: [
                              styles.brPreferencePanelCheckBox,
                              styles.brSendingConfirmationCheck,
                              preferenceWork.sendingConfirmation
                                ? [
                                    styles.brSelected,
                                    styles.br_bi_icon_check_svg,
                                  ]
                                : styles.br_bi_icon_square_svg,
                            ],
                            onPress: this.changePreferenceWork.bind(
                              this,
                              'sendingConfirmation',
                              preferenceWork.sendingConfirmation
                                ? function () {
                                    return false
                                  }
                                : function () {
                                    return true
                                  },
                            ),
                            children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _reactNative.Text,
                              {
                                children:
                                  _uawmsgs.default
                                    .LBL_PREFERENCE_SENDING_CONFIRMATION_CHECK,
                              },
                            ),
                          },
                        ),
                      }),
                    ],
                  }),
                !preferenceWork.nameDisplayModeLocked &&
                  /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                    style: styles.preferenceRow,
                    children: [
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                        style: styles.emptyCell,
                      }),
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                        style: styles.labelText,
                        children:
                          _uawmsgs.default.LBL_PREFERENCE_NAME_DISPLAY_MODE,
                      }),
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                        style: styles.controlContainer,
                        children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                          _reactNative.TouchableOpacity,
                          {
                            style: [
                              styles.brPreferencePanelCheckBox,
                              styles.brNameDisplayModeCheck,
                              preferenceWork.nameDisplayMode === 1
                                ? [
                                    styles.brSelected,
                                    styles.br_bi_icon_check_svg,
                                  ]
                                : styles.br_bi_icon_square_svg,
                            ],
                            onPress: this.changePreferenceWork.bind(
                              this,
                              'nameDisplayMode',
                              preferenceWork.nameDisplayMode === 1
                                ? function () {
                                    return 0
                                  }
                                : function () {
                                    return 1
                                  },
                            ),
                            children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _reactNative.Text,
                              {
                                children:
                                  _uawmsgs.default
                                    .LBL_PREFERENCE_NAME_DISPLAY_MODE_CHECK,
                              },
                            ),
                          },
                        ),
                      }),
                    ],
                  }),
                !preferenceWork.notifyCallStatusLocked &&
                  /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                    style: styles.preferenceRow,
                    children: [
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                        style: styles.emptyCell,
                      }),
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                        style: styles.labelText,
                        children:
                          _uawmsgs.default.LBL_PREFERENCE_NOTIFY_CALL_STATUS,
                      }),
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                        style: styles.controlContainer,
                        children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                          _reactNative.TouchableOpacity,
                          {
                            style: [
                              styles.brPreferencePanelCheckBox,
                              styles.brNotifyCallStatusCheck,
                              preferenceWork.notifyCallStatus
                                ? [
                                    styles.brSelected,
                                    styles.br_bi_icon_check_svg,
                                  ]
                                : styles.br_bi_icon_square_svg,
                            ],
                            onPress: this.changePreferenceWork.bind(
                              this,
                              'notifyCallStatus',
                              preferenceWork.notifyCallStatus
                                ? function () {
                                    return false
                                  }
                                : function () {
                                    return true
                                  },
                            ),
                            children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _reactNative.Text,
                              {
                                children:
                                  _uawmsgs.default
                                    .LBL_PREFERENCE_NOTIFY_CALL_STATUS_CHECK,
                              },
                            ),
                          },
                        ),
                      }),
                    ],
                  }),
                !preferenceWork.notifyConfStatusLocked &&
                  /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                    style: styles.preferenceRow,
                    children: [
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                        style: styles.emptyCell,
                      }),
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                        style: styles.labelText,
                        children:
                          _uawmsgs.default.LBL_PREFERENCE_NOTIFY_CONF_STATUS,
                      }),
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                        style: styles.controlContainer,
                        children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                          _reactNative.TouchableOpacity,
                          {
                            style: [
                              styles.brPreferencePanelCheckBox,
                              styles.brNotifyConfStatusCheck,
                              preferenceWork.notifyConfStatus
                                ? [
                                    styles.brSelected,
                                    styles.br_bi_icon_check_svg,
                                  ]
                                : styles.br_bi_icon_square_svg,
                            ],
                            onPress: this.changePreferenceWork.bind(
                              this,
                              'notifyConfStatus',
                              preferenceWork.notifyConfStatus
                                ? function () {
                                    return false
                                  }
                                : function () {
                                    return true
                                  },
                            ),
                            children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _reactNative.Text,
                              {
                                children:
                                  _uawmsgs.default
                                    .LBL_PREFERENCE_NOTIFY_CONF_STATUS_CHECK,
                              },
                            ),
                          },
                        ),
                      }),
                    ],
                  }),
                !preferenceWork.dtmfShortcutLocked &&
                  /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
                    children: [
                      /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                        style: styles.preferenceRow,
                        children: [
                          /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _reactNative.View,
                            {
                              style: styles.emptyCell,
                            },
                          ),
                          /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _reactNative.Text,
                            {
                              style: styles.labelText,
                              children:
                                _uawmsgs.default.LBL_PREFERENCE_DTMF_SHORTCUT,
                            },
                          ),
                          /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _reactNative.View,
                            {
                              style: styles.controlContainer,
                              children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                _reactNative.TouchableOpacity,
                                {
                                  style: [
                                    styles.brPreferencePanelCheckBox,
                                    styles.brDtmfShortcutCheck,
                                    styles.brDtmfShortcut0Check,
                                    preferenceWork.dtmfShortcut & 1
                                      ? [
                                          styles.brSelected,
                                          styles.br_bi_icon_check_svg,
                                        ]
                                      : styles.br_bi_icon_square_svg,
                                  ],
                                  onPress: this.changePreferenceWork.bind(
                                    this,
                                    'dtmfShortcut',
                                    preferenceWork.dtmfShortcut & 1
                                      ? function (p) {
                                          return p & ~1
                                        }
                                      : function (p) {
                                          return p | 1
                                        },
                                  ),
                                  children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                    _reactNative.Text,
                                    {
                                      children:
                                        _uawmsgs.default
                                          .LBL_PREFERENCE_DTMF_SHORTCUT_0_CHECK,
                                    },
                                  ),
                                },
                              ),
                            },
                          ),
                        ],
                      }),
                      [
                        {
                          bit: 2,
                          label:
                            _uawmsgs.default
                              .LBL_PREFERENCE_DTMF_SHORTCUT_1_CHECK,
                        },
                        {
                          bit: 8,
                          label:
                            _uawmsgs.default
                              .LBL_PREFERENCE_DTMF_SHORTCUT_3_CHECK,
                        },
                        {
                          bit: 4,
                          label:
                            _uawmsgs.default
                              .LBL_PREFERENCE_DTMF_SHORTCUT_2_CHECK,
                        },
                      ].map(function (shortcut, index) {
                        return /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                          _reactNative.View,
                          {
                            style: styles.preferenceRow,
                            children: [
                              /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                _reactNative.View,
                                {
                                  style: styles.emptyCell,
                                },
                              ),
                              /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                _reactNative.View,
                                {
                                  style: styles.emptyCell,
                                },
                              ),
                              /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                _reactNative.View,
                                {
                                  style: styles.controlContainer,
                                  children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                    _reactNative.TouchableOpacity,
                                    {
                                      style: [
                                        styles.brPreferencePanelCheckBox,
                                        styles.brDtmfShortcutCheck,
                                        preferenceWork.dtmfShortcut &
                                        shortcut.bit
                                          ? [
                                              styles.brSelected,
                                              styles.br_bi_icon_check_svg,
                                            ]
                                          : styles.br_bi_icon_square_svg,
                                      ],
                                      onPress: _this5.changePreferenceWork.bind(
                                        _this5,
                                        'dtmfShortcut',
                                        preferenceWork.dtmfShortcut &
                                          shortcut.bit
                                          ? function (p) {
                                              return p & ~shortcut.bit
                                            }
                                          : function (p) {
                                              return p | shortcut.bit
                                            },
                                      ),
                                      children: /*#__PURE__*/ (0,
                                      _jsxRuntime.jsx)(_reactNative.Text, {
                                        children: shortcut.label,
                                      }),
                                    },
                                  ),
                                },
                              ),
                            ],
                          },
                          'dtmf-'.concat(index),
                        )
                      }),
                    ],
                  }),
                !preferenceWork.displayPeriodLocked &&
                  /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                    style: styles.preferenceRow,
                    children: [
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                        style: styles.emptyCell,
                      }),
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                        style: styles.labelText,
                        children:
                          _uawmsgs.default.LBL_PREFERENCE_DISPLAY_PERIOD,
                      }),
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                        style: styles.controlContainer,
                        children: /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                          _reactNative.View,
                          {
                            style: styles.displayPeriodContainer,
                            children: [
                              /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                _reactNative.Text,
                                {
                                  children: (0, _strings.string)(
                                    _uawmsgs.default
                                      .LBL_PREFERENCE_DISPLAY_PERIOD_LABEL,
                                  ).split('{0}')[0],
                                },
                              ),
                              /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                _TextBox.default,
                                {
                                  style: styles.brDisplayPeriodInput,
                                  value: (0, _strings.string)(
                                    preferenceWork.displayPeriod,
                                  ),
                                  onChangeText: function onChangeText(text) {
                                    return _this5.changePreferenceWork(
                                      'displayPeriod',
                                      function () {
                                        return (0, _strings.string)(text)
                                      },
                                    )
                                  },
                                },
                              ),
                              /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                _reactNative.Text,
                                {
                                  children: (0, _strings.string)(
                                    _uawmsgs.default
                                      .LBL_PREFERENCE_DISPLAY_PERIOD_LABEL,
                                  ).split('{0}')[1],
                                },
                              ),
                            ],
                          },
                        ),
                      }),
                    ],
                  }),
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                  style: styles.separator,
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                  style: styles.preferenceRow,
                  children: [
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.categoryText,
                      children:
                        _uawmsgs.default.LBL_PREFERENCE_CATEGORY_TERMINAL,
                    }),
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.labelText,
                      children: _uawmsgs.default.LBL_PREFERENCE_AUTO_SIGN_IN,
                    }),
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                      style: styles.controlContainer,
                      children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                        _reactNative.TouchableOpacity,
                        {
                          style: [
                            styles.brPreferencePanelCheckBox,
                            styles.brAutoSignInCheck,
                            preferenceWork.autoSignIn
                              ? [styles.brSelected, styles.br_bi_icon_check_svg]
                              : styles.br_bi_icon_square_svg,
                          ],
                          onPress: this.changePreferenceWork.bind(
                            this,
                            'autoSignIn',
                            preferenceWork.autoSignIn
                              ? function () {
                                  return false
                                }
                              : function () {
                                  return true
                                },
                          ),
                          children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _reactNative.Text,
                            {
                              children:
                                _uawmsgs.default
                                  .LBL_PREFERENCE_AUTO_SIGN_IN_CHECK,
                            },
                          ),
                        },
                      ),
                    }),
                  ],
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                  style: styles.preferenceRow,
                  children: [
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                      style: styles.emptyCell,
                    }),
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.labelText,
                      children: _uawmsgs.default.LBL_PREFERENCE_WEBRTC_ENABLED,
                    }),
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                      style: styles.controlContainer,
                      children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                        _reactNative.TouchableOpacity,
                        {
                          style: [
                            styles.brPreferencePanelCheckBox,
                            styles.brWebRTCEnabledCheck,
                            preferenceWork.webRTCDisabled
                              ? styles.br_bi_icon_square_svg
                              : [
                                  styles.brSelected,
                                  styles.br_bi_icon_check_svg,
                                ],
                          ],
                          onPress: this.changePreferenceWork.bind(
                            this,
                            'webRTCDisabled',
                            preferenceWork.webRTCDisabled
                              ? function () {
                                  return false
                                }
                              : function () {
                                  return true
                                },
                          ),
                          children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _reactNative.Text,
                            {
                              children:
                                _uawmsgs.default
                                  .LBL_PREFERENCE_WEBRTC_ENABLED_CHECK,
                            },
                          ),
                        },
                      ),
                    }),
                  ],
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                  style: styles.preferenceRow,
                  children: [
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                      style: styles.emptyCell,
                    }),
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.labelText,
                      children: _uawmsgs.default.LBL_PREFERENCE_WEBRTC_TYPE,
                    }),
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                      style: styles.controlContainer,
                      children: /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                        _DropDownMenu.default,
                        {
                          uiData: props.uiData,
                          style: styles.brWebRTCTypeMenu,
                          disabled: preferenceWork.tenantWebRTCTypeNameLocked,
                          text:
                            !preferenceWork.webRTCTypeName ||
                            preferenceWork.tenantWebRTCTypeNameLocked
                              ? _uawmsgs.default
                                  .LBL_PREFERENCE_WEBRTC_TYPE_DEFAULT
                              : preferenceWork.webRTCTypeName === '_standard'
                                ? _uawmsgs.default
                                    .LBL_PREFERENCE_WEBRTC_TYPE_STANDARD
                                : (0, _strings.string)(
                                    preferenceWork.webRTCTypeName,
                                  ),
                          children: [
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _MenuItem.default,
                              {
                                style: [
                                  styles.brPreferencePanelMenuItem,
                                  styles.brWebRTCTypeItem,
                                ],
                                dropDown: true,
                                onPress: this.changePreferenceWork.bind(
                                  this,
                                  'webRTCTypeName',
                                  function () {
                                    return ''
                                  },
                                ),
                                children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                  _reactNative.Text,
                                  {
                                    children:
                                      _uawmsgs.default
                                        .LBL_PREFERENCE_WEBRTC_TYPE_DEFAULT,
                                  },
                                ),
                              },
                            ),
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _MenuItem.default,
                              {
                                style: [
                                  styles.brPreferencePanelMenuItem,
                                  styles.brWebRTCTypeItem,
                                ],
                                dropDown: true,
                                onPress: this.changePreferenceWork.bind(
                                  this,
                                  'webRTCTypeName',
                                  function () {
                                    return '_standard'
                                  },
                                ),
                                children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                  _reactNative.Text,
                                  {
                                    children:
                                      _uawmsgs.default
                                        .LBL_PREFERENCE_WEBRTC_TYPE_STANDARD,
                                  },
                                ),
                              },
                            ),
                            (preferenceWork.webRTCTypes || []).map(
                              function (type) {
                                return /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                  _MenuItem.default,
                                  {
                                    style: [
                                      styles.brPreferencePanelMenuItem,
                                      styles.brWebRTCTypeItem,
                                    ],
                                    dropDown: true,
                                    onPress: _this5.changePreferenceWork.bind(
                                      _this5,
                                      'webRTCTypeName',
                                      function () {
                                        return (0, _strings.string)(type.name)
                                      },
                                    ),
                                    children: /*#__PURE__*/ (0,
                                    _jsxRuntime.jsx)(_reactNative.Text, {
                                      children: (0, _strings.string)(type.name),
                                    }),
                                  },
                                  (0, _strings.string)(type.name),
                                )
                              },
                            ),
                          ],
                        },
                      ),
                    }),
                  ],
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                  style: styles.preferenceRow,
                  children: [
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                      style: styles.emptyCell,
                    }),
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.labelText,
                      children: _uawmsgs.default.LBL_PREFERENCE_NO_VIDEO_MODE,
                    }),
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                      style: styles.controlContainer,
                      children: /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                        _DropDownMenu.default,
                        {
                          uiData: props.uiData,
                          style: styles.brNoVideoModeMenu,
                          text:
                            preferenceWork.noVideoMode === 'CONFERENCE'
                              ? _uawmsgs.default
                                  .LBL_PREFERENCE_NO_VIDEO_MODE_CONFERENCE
                              : preferenceWork.noVideoMode === '.*'
                                ? _uawmsgs.default
                                    .LBL_PREFERENCE_NO_VIDEO_MODE_SOUND
                                : _uawmsgs.default
                                    .LBL_PREFERENCE_NO_VIDEO_MODE_DISPLAY,
                          children: [
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _MenuItem.default,
                              {
                                style: [
                                  styles.brPreferencePanelMenuItem,
                                  styles.brNoVideoModeItem,
                                ],
                                dropDown: true,
                                onPress: this.changePreferenceWork.bind(
                                  this,
                                  'noVideoMode',
                                  function () {
                                    return ''
                                  },
                                ),
                                children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                  _reactNative.Text,
                                  {
                                    children:
                                      _uawmsgs.default
                                        .LBL_PREFERENCE_NO_VIDEO_MODE_DISPLAY,
                                  },
                                ),
                              },
                            ),
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _MenuItem.default,
                              {
                                style: [
                                  styles.brPreferencePanelMenuItem,
                                  styles.brNoVideoModeItem,
                                ],
                                dropDown: true,
                                onPress: this.changePreferenceWork.bind(
                                  this,
                                  'noVideoMode',
                                  function () {
                                    return 'CONFERENCE'
                                  },
                                ),
                                children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                  _reactNative.Text,
                                  {
                                    children:
                                      _uawmsgs.default
                                        .LBL_PREFERENCE_NO_VIDEO_MODE_CONFERENCE,
                                  },
                                ),
                              },
                            ),
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _MenuItem.default,
                              {
                                style: [
                                  styles.brPreferencePanelMenuItem,
                                  styles.brNoVideoModeItem,
                                ],
                                dropDown: true,
                                onPress: this.changePreferenceWork.bind(
                                  this,
                                  'noVideoMode',
                                  function () {
                                    return '.*'
                                  },
                                ),
                                children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                  _reactNative.Text,
                                  {
                                    children:
                                      _uawmsgs.default
                                        .LBL_PREFERENCE_NO_VIDEO_MODE_SOUND,
                                  },
                                ),
                              },
                            ),
                          ],
                        },
                      ),
                    }),
                  ],
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                  style: styles.preferenceRow,
                  children: [
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                      style: styles.emptyCell,
                    }),
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.labelText,
                      children: _uawmsgs.default.LBL_PREFERENCE_AUDIO_SOURCE,
                    }),
                    /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                      style: styles.controlContainer,
                      children: [
                        /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                          style: styles.audioSourceContainer,
                          children: [
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _DropDownMenu.default,
                              {
                                uiData: props.uiData,
                                style: styles.brAudioSourceMenu,
                                text: this.getDeviceLabel({
                                  deviceId: preferenceWork.audioSource,
                                  kind: 'audioinput',
                                }),
                                children: this.state.devices
                                  .filter(function (device) {
                                    return device.kind === 'audioinput'
                                  })
                                  .map(function (device) {
                                    return /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                      _MenuItem.default,
                                      {
                                        style: [
                                          styles.brPreferencePanelMenuItem,
                                          styles.brAudioSourceItem,
                                        ],
                                        dropDown: true,
                                        onPress:
                                          _this5.changePreferenceWork.bind(
                                            _this5,
                                            'audioSource',
                                            function () {
                                              return device.deviceId
                                            },
                                          ),
                                        children: /*#__PURE__*/ (0,
                                        _jsxRuntime.jsx)(_reactNative.Text, {
                                          children:
                                            _this5.getDeviceLabel(device),
                                        }),
                                      },
                                      device.deviceId,
                                    )
                                  }),
                              },
                            ),
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _ButtonLabeled.default,
                              {
                                style: styles.brAudioSourceTestButton,
                                ghost: true,
                                title: this.state.testingAudioSource
                                  ? _uawmsgs.default
                                      .LBL_PREFERENCE_AUDIO_SOURCE_STOP_BUTTON_TOOLTIP
                                  : _uawmsgs.default
                                      .LBL_PREFERENCE_AUDIO_SOURCE_TEST_BUTTON_TOOLTIP,
                                onPress:
                                  this.handleAudioSourceTestButtonClick.bind(
                                    this,
                                  ),
                                children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                  _reactNative.Text,
                                  {
                                    children: this.state.testingAudioSource
                                      ? _uawmsgs.default
                                          .LBL_PREFERENCE_AUDIO_SOURCE_STOP_BUTTON
                                      : _uawmsgs.default
                                          .LBL_PREFERENCE_AUDIO_SOURCE_TEST_BUTTON,
                                  },
                                ),
                              },
                            ),
                          ],
                        }),
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                          style: [
                            styles.brAudioSourceTestArea,
                            this.state.testingAudioSource && styles.brTesting,
                          ],
                          children:
                            this.state.testingAudioSource &&
                            this.state.testingAudioSource.analyser
                              ? /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                  _CallMicrophoneLevel.default,
                                  {
                                    uiData: props.uiData,
                                    analyser:
                                      this.state.testingAudioSource.analyser,
                                  },
                                )
                              : /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                  _reactNative.Text,
                                  {
                                    children: (0, _strings.string)(
                                      this.state.testingAudioSource &&
                                        (this.state.testingAudioSource
                                          .message ||
                                          _uawmsgs.default
                                            .MSG_PREFERENCE_AUDIO_SOURCE_TESTING),
                                    ),
                                  },
                                ),
                        }),
                      ],
                    }),
                  ],
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                  style: styles.preferenceRow,
                  children: [
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                      style: styles.emptyCell,
                    }),
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.labelText,
                      children: _uawmsgs.default.LBL_PREFERENCE_VIDEO_SOURCE,
                    }),
                    /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                      style: styles.controlContainer,
                      children: [
                        /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                          style: styles.videoSourceContainer,
                          children: [
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _DropDownMenu.default,
                              {
                                uiData: props.uiData,
                                style: styles.brVideoSourceMenu,
                                text: this.getDeviceLabel({
                                  deviceId: preferenceWork.videoSource,
                                  kind: 'videoinput',
                                }),
                                children: this.state.devices
                                  .filter(function (device) {
                                    return device.kind === 'videoinput'
                                  })
                                  .map(function (device) {
                                    return /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                      _MenuItem.default,
                                      {
                                        style: [
                                          styles.brPreferencePanelMenuItem,
                                          styles.brVideoSourceItem,
                                        ],
                                        dropDown: true,
                                        onPress:
                                          _this5.changePreferenceWork.bind(
                                            _this5,
                                            'videoSource',
                                            function () {
                                              return device.deviceId
                                            },
                                          ),
                                        children: /*#__PURE__*/ (0,
                                        _jsxRuntime.jsx)(_reactNative.Text, {
                                          children:
                                            _this5.getDeviceLabel(device),
                                        }),
                                      },
                                      device.deviceId,
                                    )
                                  }),
                              },
                            ),
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _ButtonLabeled.default,
                              {
                                style: styles.brVideoSourceTestButton,
                                ghost: true,
                                title: this.state.testingVideoSource
                                  ? _uawmsgs.default
                                      .LBL_PREFERENCE_VIDEO_SOURCE_STOP_BUTTON_TOOLTIP
                                  : _uawmsgs.default
                                      .LBL_PREFERENCE_VIDEO_SOURCE_TEST_BUTTON_TOOLTIP,
                                onPress:
                                  this.handleVideoSourceTestButtonClick.bind(
                                    this,
                                  ),
                                children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                  _reactNative.Text,
                                  {
                                    children: this.state.testingVideoSource
                                      ? _uawmsgs.default
                                          .LBL_PREFERENCE_VIDEO_SOURCE_STOP_BUTTON
                                      : _uawmsgs.default
                                          .LBL_PREFERENCE_VIDEO_SOURCE_TEST_BUTTON,
                                  },
                                ),
                              },
                            ),
                          ],
                        }),
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                          ref: this.videoSourceTestAreaRef,
                          style: [
                            styles.brVideoSourceTestArea,
                            {
                              minWidth:
                                this.state.preferenceContentLayout.width - 32,
                              width: '100%',
                              height: this.state.testingVideoSource
                                ? (this.state.preferenceContentLayout.height +
                                    88) /
                                  2
                                : 0,
                            },
                          ],
                          onLayout: function onLayout(event) {
                            var _event$nativeEvent$la2 =
                                event.nativeEvent.layout,
                              width = _event$nativeEvent$la2.width,
                              height = _event$nativeEvent$la2.height
                            _this5.setState({
                              videoTestAreaLayout: {
                                width: width,
                                height: height,
                              },
                            })
                          },
                          children:
                            this.state.testingVideoSource &&
                            this.state.testingVideoSource.streamObject
                              ? /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                  _reactNativeWebrtc.RTCView,
                                  {
                                    ref: this.videoSourceTestVideoRef,
                                    style: styles.brVideoSourceTestVideo,
                                    streamURL:
                                      this.state.testingVideoSource.streamObject.toURL(),
                                    objectFit: 'cover',
                                    zOrder: 1,
                                  },
                                )
                              : /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                  _reactNative.Text,
                                  {
                                    style: styles.testMessage,
                                    children: (0, _strings.string)(
                                      this.state.testingVideoSource &&
                                        this.state.testingVideoSource.message,
                                    ),
                                  },
                                ),
                        }),
                      ],
                    }),
                  ],
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                  style: styles.preferenceRow,
                  children: [
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                      style: styles.emptyCell,
                    }),
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.labelText,
                      children: _uawmsgs.default.LBL_PREFERENCE_LAMP_TYPE,
                    }),
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                      style: styles.controlContainer,
                      children: /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                        _reactNative.View,
                        {
                          style: styles.lampTypeContainer,
                          children: [
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _DropDownMenu.default,
                              {
                                uiData: props.uiData,
                                style: styles.brLampTypeMenu,
                                text:
                                  lampTypeNameDisplayTable[
                                    (0, _strings.string)(
                                      preferenceWork.lampTypeName,
                                    )
                                  ] ||
                                  (0, _strings.string)(
                                    preferenceWork.lampTypeName,
                                  ),
                                children: (preferenceWork.lampTypes || []).map(
                                  function (type) {
                                    return /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                      _MenuItem.default,
                                      {
                                        style: [
                                          styles.brPreferencePanelMenuItem,
                                          styles.brLampTypeItem,
                                        ],
                                        dropDown: true,
                                        onPress:
                                          _this5.changePreferenceWork.bind(
                                            _this5,
                                            'lampTypeName',
                                            function () {
                                              return (0, _strings.string)(
                                                type.name,
                                              )
                                            },
                                          ),
                                        children: /*#__PURE__*/ (0,
                                        _jsxRuntime.jsx)(_reactNative.Text, {
                                          children:
                                            lampTypeNameDisplayTable[
                                              (0, _strings.string)(type.name)
                                            ] ||
                                            (0, _strings.string)(type.name),
                                        }),
                                      },
                                      (0, _strings.string)(type.name),
                                    )
                                  },
                                ),
                              },
                            ),
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _ButtonLabeled.default,
                              {
                                style: styles.brLampTypeTestButton,
                                disabled: this.state.testingLampType,
                                ghost: true,
                                title: this.state.testingLampType
                                  ? ''
                                  : _uawmsgs.default
                                      .LBL_PREFERENCE_LAMP_TYPE_TEST_BUTTON_TOOLTIP,
                                onPress:
                                  this.handleLampTypeTestButtonClick.bind(this),
                                children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                  _reactNative.Text,
                                  {
                                    children: (0, _strings.string)(
                                      this.state.testingLampType ||
                                        _uawmsgs.default
                                          .LBL_PREFERENCE_LAMP_TYPE_TEST_BUTTON,
                                    ),
                                  },
                                ),
                              },
                            ),
                          ],
                        },
                      ),
                    }),
                  ],
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                  style: styles.preferenceRow,
                  children: [
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                      style: styles.emptyCell,
                    }),
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.labelText,
                      children:
                        _uawmsgs.default.LBL_PREFERENCE_BELL_AUDIO_TARGET,
                    }),
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                      style: styles.controlContainer,
                      children: /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                        _reactNative.View,
                        {
                          style: styles.bellAudioTargetContainer,
                          children: [
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _DropDownMenu.default,
                              {
                                uiData: props.uiData,
                                style: styles.brBellAudioTargetMenu,
                                text: this.getDeviceLabel({
                                  deviceId: preferenceWork.bellAudioTarget,
                                  kind: 'audiooutput',
                                }),
                                children: this.state.devices
                                  .filter(function (device) {
                                    return device.kind === 'audiooutput'
                                  })
                                  .map(function (device) {
                                    return /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                      _MenuItem.default,
                                      {
                                        style: [
                                          styles.brPreferencePanelMenuItem,
                                          styles.brBellAudioTargetItem,
                                        ],
                                        dropDown: true,
                                        onPress:
                                          _this5.changePreferenceWork.bind(
                                            _this5,
                                            'bellAudioTarget',
                                            function () {
                                              return device.deviceId
                                            },
                                          ),
                                        children: /*#__PURE__*/ (0,
                                        _jsxRuntime.jsx)(_reactNative.Text, {
                                          children:
                                            _this5.getDeviceLabel(device),
                                        }),
                                      },
                                      device.deviceId,
                                    )
                                  }),
                              },
                            ),
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _ButtonLabeled.default,
                              {
                                style: styles.brBellAudioTargetTestButton,
                                ghost: true,
                                title:
                                  _uawmsgs.default
                                    .LBL_PREFERENCE_BELL_AUDIO_TARGET_TEST_BUTTON_TOOLTIP,
                                onPress:
                                  this.handleBellAudioTargetTestButtonClick.bind(
                                    this,
                                  ),
                                children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                  _reactNative.Text,
                                  {
                                    children:
                                      _uawmsgs.default
                                        .LBL_PREFERENCE_BELL_AUDIO_TARGET_TEST_BUTTON,
                                  },
                                ),
                              },
                            ),
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _MultipleAudio.default,
                              {
                                ref: this.bellAudioTargetTestMultipleAudioRef,
                                uiData: props.uiData,
                                style:
                                  styles.brBellAudioTargetTestMultipleAudio,
                                audioClassName: 'brBellAudioTargetTestAudio',
                                src: sound,
                                deviceId: preferenceWork.bellAudioTarget,
                              },
                            ),
                          ],
                        },
                      ),
                    }),
                  ],
                }),
                !preferenceWork.chatBgColorLocked &&
                  /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                    style: styles.preferenceRow,
                    children: [
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                        style: styles.emptyCell,
                      }),
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                        style: styles.labelText,
                        children: _uawmsgs.default.LBL_PREFERENCE_CHAT_BG_COLOR,
                      }),
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                        style: styles.controlContainer,
                        children: /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                          _DropDownMenu.default,
                          {
                            uiData: props.uiData,
                            style: styles.brChatBgColorMenu,
                            disabled: preferenceWork.chatBgColorLocked,
                            text: !preferenceWork.chatBgColor
                              ? _uawmsgs.default
                                  .LBL_PREFERENCE_CHAT_BG_COLOR_STANDARD
                              : _uawmsgs.default
                                  .LBL_PREFERENCE_CHAT_BG_COLOR_CUSTOM,
                            children: [
                              /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                _MenuItem.default,
                                {
                                  style: [
                                    styles.brPreferencePanelMenuItem,
                                    styles.brChatBgColorItem,
                                  ],
                                  dropDown: true,
                                  onPress: function onPress() {
                                    return props.uiData.fire(
                                      'preferenceChatBgColorStandard_onClick',
                                      props.panelType,
                                      props.panelCode,
                                    )
                                  },
                                  children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                    _reactNative.Text,
                                    {
                                      children:
                                        _uawmsgs.default
                                          .LBL_PREFERENCE_CHAT_BG_COLOR_STANDARD,
                                    },
                                  ),
                                },
                              ),
                              /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                _MenuItem.default,
                                {
                                  style: [
                                    styles.brPreferencePanelMenuItem,
                                    styles.brChatBgColorItem,
                                  ],
                                  dropDown: true,
                                  onPress: function onPress() {
                                    return props.uiData.fire(
                                      'preferenceChatBgColorCustom_onClick',
                                      props.panelType,
                                      props.panelCode,
                                    )
                                  },
                                  children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                    _reactNative.Text,
                                    {
                                      children:
                                        _uawmsgs.default
                                          .LBL_PREFERENCE_CHAT_BG_COLOR_CUSTOM,
                                    },
                                  ),
                                },
                              ),
                            ],
                          },
                        ),
                      }),
                    ],
                  }),
                !preferenceWork.dbgoptLocked &&
                  /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                    style: styles.preferenceRow,
                    children: [
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                        style: styles.emptyCell,
                      }),
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                        style: styles.labelText,
                        children: _uawmsgs.default.LBL_PREFERENCE_DBGOPT,
                      }),
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                        style: styles.controlContainer,
                        children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                          _TextBox.default,
                          {
                            style: styles.brDbgoptInput,
                            value: (0, _strings.string)(preferenceWork.dbgopt),
                            onChangeText: function onChangeText(text) {
                              return _this5.changePreferenceWork(
                                'dbgopt',
                                function () {
                                  return (0, _strings.string)(text)
                                },
                              )
                            },
                          },
                        ),
                      }),
                    ],
                  }),
              ],
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.brPreferenceFooter,
              children: [
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(_ButtonLabeled.default, {
                  style: styles.brSaveButton,
                  disabled: preferenceWork.nowSaving,
                  progress: preferenceWork.nowSaving,
                  vivid: true,
                  title: _uawmsgs.default.CMN_SAVE,
                  onPress: props.uiData.fire.bind(
                    props.uiData,
                    'preferenceSaveButton_onClick',
                    props.panelType,
                    props.panelCode,
                  ),
                  children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                    _reactNative.Text,
                    {
                      children: _uawmsgs.default.CMN_SAVE,
                    },
                  ),
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(_ButtonLabeled.default, {
                  style: styles.brCloseButton,
                  title: _uawmsgs.default.CMN_CLOSE,
                  onPress: props.uiData.fire.bind(
                    props.uiData,
                    'tabLinkHideButton_onClick',
                    props.panelType,
                    props.panelCode,
                  ),
                  children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                    _reactNative.Text,
                    {
                      children: _uawmsgs.default.CMN_CLOSE,
                    },
                  ),
                }),
              ],
            }),
          ],
        })
      },
    },
  ])
})(_react.default.Component))
var styles = _reactNative.StyleSheet.create({
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
