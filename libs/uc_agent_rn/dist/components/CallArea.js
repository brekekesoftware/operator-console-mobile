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
var _uawmsgs = _interopRequireDefault(require('../utilities/uawmsgs'))
var _constants = _interopRequireDefault(require('../utilities/constants'))
var _strings = require('../utilities/strings')
var _reactNative = require('react-native')
var _ButtonIconic = _interopRequireDefault(require('./ButtonIconic'))
var _ButtonLabeled = _interopRequireDefault(require('./ButtonLabeled'))
var _CallAudio = _interopRequireDefault(require('./CallAudio'))
var _CallMicrophoneLevel = _interopRequireDefault(
  require('./CallMicrophoneLevel'),
)
var _CallTimer = _interopRequireDefault(require('./CallTimer'))
var _CallVideo = _interopRequireDefault(require('./CallVideo'))
var _DropDownMenu = _interopRequireDefault(require('./DropDownMenu'))
var _MenuBalloonDialog = _interopRequireDefault(require('./MenuBalloonDialog'))
var _MenuItem = _interopRequireDefault(require('./MenuItem'))
var _SoundAudio = _interopRequireDefault(require('../components/SoundAudio'))
var _NameEmbeddedSpan = _interopRequireDefault(
  require('../components/NameEmbeddedSpan'),
)
var _StatusIcon = _interopRequireDefault(require('../components/StatusIcon'))
var _TextBox = _interopRequireDefault(require('../components/TextBox'))
var _currentscript = _interopRequireDefault(
  require('../utilities/currentscript'),
)
var _ChevronDownIcon = _interopRequireDefault(
  require('../icons/ChevronDownIcon'),
)
var _ChevronUpIcon = _interopRequireDefault(require('../icons/ChevronUpIcon'))
var _ArrowRightIcon = _interopRequireDefault(require('../icons/ArrowRightIcon'))
var _ArrowLeftIcon = _interopRequireDefault(require('../icons/ArrowLeftIcon'))
var _EndCallIcon = _interopRequireDefault(require('../icons/EndCallIcon'))
var _PhoneIcon = _interopRequireDefault(require('../icons/PhoneIcon'))
var _ConferenceForegroundSelectedIcon = _interopRequireDefault(
  require('../icons/ConferenceForegroundSelectedIcon'),
)
var _BlockMicrophoneIcon = _interopRequireDefault(
  require('../icons/BlockMicrophoneIcon'),
)
var _ExpandIcon = _interopRequireDefault(require('../icons/ExpandIcon'))
var _HoldIcon = _interopRequireDefault(require('../icons/HoldIcon'))
var _KeypadIcon = _interopRequireDefault(require('../icons/KeypadIcon'))
var _TriangleLeftIcon = _interopRequireDefault(
  require('../icons/TriangleLeftIcon'),
)
var _TriangleRightIcon = _interopRequireDefault(
  require('../icons/TriangleRightIcon'),
)
var _NoVideoIcon = _interopRequireDefault(require('../icons/NoVideoIcon'))
var _MoreIcon = _interopRequireDefault(require('../icons/MoreIcon'))
var _VideoCallIcon = _interopRequireDefault(require('../icons/VideoCallIcon'))
var _jsxRuntime = require('react/jsx-runtime')
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e }
}
function ownKeys(e, r) {
  var t = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e)
    r &&
      (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable
      })),
      t.push.apply(t, o)
  }
  return t
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {}
    r % 2
      ? ownKeys(Object(t), !0).forEach(function (r) {
          _defineProperty(e, r, t[r])
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
        : ownKeys(Object(t)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r))
          })
  }
  return e
}
function _defineProperty(e, r, t) {
  return (
    (r = _toPropertyKey(r)) in e
      ? Object.defineProperty(e, r, {
          value: t,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[r] = t),
    e
  )
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
} /**
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
var _default = (exports.default = /*#__PURE__*/ (function (_React$Component) {
  function _default(props) {
    var _this
    _classCallCheck(this, _default)
    _this = _callSuper(this, _default, [props])
    _this.lastHeight = 0
    _this.fullscreenEntered = false
    _this.sessionExisting = false
    _this.sessionBeginTime = 0
    _this.sessionEndTime = 0
    _this.state = {
      transferMenuShowingDialogVersion: null,
      dtmfMenuShowingDialogVersion: null,
      cameraMenuShowingDialogVersion: null,
      microphoneMenuShowingDialogVersion: null,
      callVideoOptionsMenuShowingDialogVersion: null,
      callVideoOptionsMenuShowingDialogVideoClientSessionId: null,
      callLocalVideoX: -40,
      callLocalVideoY: -40,
      splitterHeight: (0, _strings.int)(
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
    _this.callAreaRef = /*#__PURE__*/ _react.default.createRef()
    _this.callVideoAreaRef = /*#__PURE__*/ _react.default.createRef()
    _this.callRemoteVideoRefs = {}

    // Create animated value for splitter position
    _this.splitterPosition = new _reactNative.Animated.Value(0)

    // Initialize pan responder for drag functionality
    _this.panResponder = _reactNative.PanResponder.create({
      onStartShouldSetPanResponder: function onStartShouldSetPanResponder(
        evt,
        gestureState,
      ) {
        // Only capture touch events on the splitter area
        var locationY = evt.nativeEvent.locationY
        return locationY <= 10 // Capture touches within 10px of the top
      },
      onMoveShouldSetPanResponder: function onMoveShouldSetPanResponder(
        evt,
        gestureState,
      ) {
        // Only capture move events if we started on the splitter
        var locationY = evt.nativeEvent.locationY
        return locationY <= 10
      },
      onPanResponderGrant: function onPanResponderGrant() {
        _this.splitterPosition.setOffset(_this.splitterPosition._value)
        _this.splitterPosition.setValue(0)
      },
      onPanResponderMove: function onPanResponderMove(evt, gestureState) {
        _this.splitterPosition.setValue(gestureState.dy)
      },
      onPanResponderRelease: function onPanResponderRelease() {
        _this.splitterPosition.flattenOffset()
        var currentPosition = _this.splitterPosition._value
        var newSplitterHeight = _this.state.splitterHeight + currentPosition

        // Apply constraints
        if (_this.callVideoAreaRef.current) {
          _this.callVideoAreaRef.current.measure(
            function (x, y, width, height, pageX, pageY) {
              var maxHeight = height || 88
              var minHeight = Math.min(maxHeight, 88)
              newSplitterHeight = Math.max(minHeight, newSplitterHeight)
              newSplitterHeight = Math.min(maxHeight, newSplitterHeight)
              _this.setState({
                splitterHeight: newSplitterHeight,
              })
              props.uiData.ucUiAction.setLocalStoragePreference({
                keyValueList: [
                  {
                    key: 'callAreaHeight',
                    value: (0, _strings.string)(newSplitterHeight),
                  },
                ],
              })
            },
          )
        }
      },
    })
    return _this
  }
  _inherits(_default, _React$Component)
  return _createClass(_default, [
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        var _this2 = this
        var props = this.props
        var newState = {}
        var panelSession =
          props.uiData.panelSessionTable &&
          props.uiData.panelSessionTable[
            props.panelType + '_' + props.panelCode
          ]
        var session =
          panelSession &&
          panelSession.sessionId &&
          props.uiData.phone &&
          props.uiData.phone.getSession(panelSession.sessionId)
        if (this.callAreaRef.current) {
          this.callAreaRef.current.measure(
            function (x, y, width, height, pageX, pageY) {
              var maxHeight = height || 88
              var minHeight = Math.min(maxHeight, 88)
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
                    if (_this2.state.splitterHeight === 0) {
                      newState.splitterHeight = (0, _strings.int)(
                        (minHeight + maxHeight) / 2,
                      )
                    } else if (_this2.state.splitterHeight < minHeight) {
                      newState.splitterHeight = minHeight
                    } else if (maxHeight < _this2.state.splitterHeight) {
                      newState.splitterHeight = maxHeight
                    }
                    newState.height =
                      newState.splitterHeight || _this2.state.splitterHeight
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
                if (_this2.state.dtmfTime) {
                  newState.dtmfTime = 0
                }
                if (_this2.state.dtmfLog) {
                  newState.dtmfLog = ''
                }
              }

              // Check for header buttons collapsible state
              if (width < 400 && !_this2.state.headerButtonsCollapsible) {
                newState.headerButtonsCollapsible = true
              } else if (
                width >= 400 &&
                _this2.state.headerButtonsCollapsible
              ) {
                newState.headerButtonsCollapsible = false
              }
            },
          )
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
      },
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        var props = this.props
        if (props.uiData && props.uiData.ucUiAction) {
          props.uiData.ucUiAction.setLocalStoragePreference({
            keyValueList: [
              {
                key: 'callAreaHeight',
                value: (0, _strings.string)(this.state.splitterHeight),
              },
            ],
          })
        }
      },
    },
    {
      key: 'handleTransitionEnd',
      value: function handleTransitionEnd(ev) {
        var props = this.props
        this.checkResized()
      },
    },
    {
      key: 'handleSplitterHeightDrag',
      value: function handleSplitterHeightDrag(ev, ui) {
        var props = this.props
        var splitterHeight = this.state.splitterHeight + ui.deltaY
        this.setState({
          splitterHeight: splitterHeight,
        })
      },
    },
    {
      key: 'handleSplitterHeightStop',
      value: function handleSplitterHeightStop() {
        var props = this.props
        props.uiData.ucUiAction.setLocalStoragePreference({
          keyValueList: [
            {
              key: 'callAreaHeight',
              value: (0, _strings.string)(this.state.splitterHeight),
            },
          ],
        })
      },
    },
    {
      key: 'handleCallMenuButtonClick',
      value: function handleCallMenuButtonClick(ev) {
        var props = this.props
        var panelSession =
          props.uiData.panelSessionTable &&
          props.uiData.panelSessionTable[
            props.panelType + '_' + props.panelCode
          ]
        var session =
          panelSession &&
          panelSession.sessionId &&
          props.uiData.phone &&
          props.uiData.phone.getSession(panelSession.sessionId)
        if (session && session.sessionId === this.state.callMenuSessionId) {
          this.setState({
            callMenuSessionId: '',
          })
          props.uiData.ucUiAction.setLocalStoragePreference({
            keyValueList: [
              {
                key: 'callMenuOpened',
                value: '',
              },
            ],
          })
        } else {
          this.setState({
            callMenuSessionId: session.sessionId,
          })
          props.uiData.ucUiAction.setLocalStoragePreference({
            keyValueList: [
              {
                key: 'callMenuOpened',
                value: 'true',
              },
            ],
          })
          this.getDevicesList()
        }
      },
    },
    {
      key: 'getDevicesList',
      value: function getDevicesList() {
        var _this3 = this
        var props = this.props
        // get devices list
        if (
          typeof navigator !== 'undefined' &&
          navigator.mediaDevices &&
          navigator.mediaDevices.enumerateDevices
        ) {
          navigator.mediaDevices
            .enumerateDevices()
            .then(function (devices) {
              _this3.setState({
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
                ].concat(
                  devices.filter(function (device) {
                    return device && device.deviceId
                  }),
                ),
              })
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
      key: 'handleTransferMenuButtonClick',
      value: function handleTransferMenuButtonClick(ev) {
        var _this4 = this
        var props = this.props
        if (
          props.uiData.showingDialogVersion !==
          this.state.transferMenuShowingDialogVersion
        ) {
          this.setState({
            transferMenuShowingDialogVersion: ++props.uiData
              .showingDialogVersion,
          })
          ev.stopPropagation()
          props.uiData.fire('showingDialog_update')
          // focus
          if (this.transferTargetInputRef.current) {
            setTimeout(function () {
              if (_this4.transferTargetInputRef.current) {
                _this4.transferTargetInputRef.current.focus()
                _this4.transferTargetInputRef.current.select()
              }
            }, 0)
          }
        }
      },
    },
    {
      key: 'handleTransferMenuDropDownMenuShowingDialogUpdate',
      value: function handleTransferMenuDropDownMenuShowingDialogUpdate() {
        var props = this.props
        this.setState({
          transferMenuShowingDialogVersion: props.uiData.showingDialogVersion,
        })
      },
    },
    {
      key: 'handleTransferTargetInputKeyDown',
      value: function handleTransferTargetInputKeyDown(ev) {
        var props = this.props
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
              (0, _strings.string)(this.transferTargetInputRef.current.value),
            )
          }
        }
      },
    },
    {
      key: 'handleTransferTargetButtonClick',
      value: function handleTransferTargetButtonClick(ev) {
        var props = this.props
        if (this.transferTargetInputRef.current) {
          props.uiData.fire(
            'callTransferButton_onClick',
            props.panelType,
            props.panelCode,
            (0, _strings.string)(this.transferTargetInputRef.current.value),
          )
        }
      },
    },
    {
      key: 'handleTransferTargetUserGroupClick',
      value: function handleTransferTargetUserGroupClick(groupName, ev) {
        var props = this.props
        if (ev && ev.nativeEvent && ev.nativeEvent.target) {
          if (
            this.state.transferTargetUserGroupOpen
              .split(',')
              .indexOf(groupName) !== -1
          ) {
            this.setState({
              transferTargetUserGroupOpen:
                this.state.transferTargetUserGroupOpen
                  .split(',')
                  .filter(function (g) {
                    return g !== groupName
                  })
                  .join(','),
            })
          } else {
            this.setState({
              transferTargetUserGroupOpen: this.state
                .transferTargetUserGroupOpen
                ? this.state.transferTargetUserGroupOpen + ',' + groupName
                : groupName,
            })
          }
        }
      },
    },
    {
      key: 'handleTransferTargetUserItemClick',
      value: function handleTransferTargetUserItemClick(user_id, ev) {
        var props = this.props
        if (this.transferTargetInputRef.current) {
          this.transferTargetInputRef.current.value = (0, _strings.string)(
            user_id,
          )
          if (this.transferTargetButtonRef.current) {
            this.transferTargetButtonRef.current.focus()
          }
        }
      },
    },
    {
      key: 'handleDtmfMenuButtonClick',
      value: function handleDtmfMenuButtonClick(ev) {
        var props = this.props
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
      },
    },
    {
      key: 'handleCallDtmfButtonClick',
      value: function handleCallDtmfButtonClick(tone, ev) {
        var props = this.props
        this.setState({
          dtmfTime: +new Date(),
          dtmfLog: this.state.dtmfLog + tone,
        })
        props.uiData.fire(
          'callDtmfButton_onClick',
          props.panelType,
          props.panelCode,
          tone,
        )
      },
    },
    {
      key: 'handleFullscreenButtonClick',
      value: function handleFullscreenButtonClick(ev) {
        var props = this.props
        if (this.callVideoAreaRef.current) {
          try {
            _reactNative.NativeModules.FullScreenModule.enterFullScreen(
              this.callVideoAreaRef.current,
            )
            this.fullscreenEntered = true
          } catch (ex) {
            props.uiData.ucUiStore.getLogger().log('warn', ex)
          }
        }
      },
    },
    {
      key: 'handleCameraMenuButtonClick',
      value: function handleCameraMenuButtonClick(ev) {
        var props = this.props
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
      },
    },
    {
      key: 'handleCameraMenuDropDownMenuShowingDialogUpdate',
      value: function handleCameraMenuDropDownMenuShowingDialogUpdate() {
        var props = this.props
        this.setState({
          cameraMenuShowingDialogVersion: props.uiData.showingDialogVersion,
        })
      },
    },
    {
      key: 'handleMicrophoneMenuButtonClick',
      value: function handleMicrophoneMenuButtonClick(ev) {
        var props = this.props
        if (
          props.uiData.showingDialogVersion !==
          this.state.microphoneMenuShowingDialogVersion
        ) {
          this.setState({
            microphoneMenuShowingDialogVersion: ++props.uiData
              .showingDialogVersion,
          })
          ev.stopPropagation()
          props.uiData.fire('showingDialog_update')
        }
      },
    },
    {
      key: 'handleMicrophoneMenuDropDownMenuShowingDialogUpdate',
      value: function handleMicrophoneMenuDropDownMenuShowingDialogUpdate() {
        var props = this.props
        this.setState({
          microphoneMenuShowingDialogVersion: props.uiData.showingDialogVersion,
        })
      },
    },
    {
      key: 'handleCallRemoteVideoClick',
      value: function handleCallRemoteVideoClick(videoClientSessionId, ev) {
        var props = this.props
        props.uiData.ucUiAction.setLocalStoragePreference({
          keyValueList: [
            {
              key: 'callVideoOptionsHidden',
              value: '',
            },
          ],
        })
        this.state.videoOptionsPanelTime[videoClientSessionId] = +new Date()
        this.setState({
          videoOptionsPanelTime: this.state.videoOptionsPanelTime,
        })
        setTimeout(this.setState.bind(this, {}), 2000)
        setTimeout(this.setState.bind(this, {}), 3000)
      },
    },
    {
      key: 'handleCallRemoteVideoMouseMove',
      value: function handleCallRemoteVideoMouseMove(videoClientSessionId, ev) {
        var props = this.props
        this.state.videoOptionsPanelTime[videoClientSessionId] = +new Date()
        this.setState({
          videoOptionsPanelTime: this.state.videoOptionsPanelTime,
        })
        setTimeout(this.setState.bind(this, {}), 2000)
        setTimeout(this.setState.bind(this, {}), 3000)
      },
    },
    {
      key: 'handleCallRemoteVideoMouseLeave',
      value: function handleCallRemoteVideoMouseLeave(
        videoClientSessionId,
        ev,
      ) {
        var props = this.props
        delete this.state.videoOptionsPanelTime[videoClientSessionId]
        this.setState({
          videoOptionsPanelTime: this.state.videoOptionsPanelTime,
        })
      },
    },
    {
      key: 'handleCallVideoOptionsOptionsButtonClick',
      value: function handleCallVideoOptionsOptionsButtonClick(
        videoClientSessionId,
        ev,
      ) {
        var props = this.props
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
      },
    },
    {
      key: 'handleCallVideoOptionsHideMenuItemClick',
      value: function handleCallVideoOptionsHideMenuItemClick(
        videoClientSessionId,
        ev,
      ) {
        var props = this.props
        props.uiData.ucUiAction.setLocalStoragePreference({
          keyValueList: [
            {
              key: 'callVideoOptionsHidden',
              value: 'true',
            },
          ],
        })
        ev.stopPropagation()
      },
    },
    {
      key: 'handleCallVideoOptionsFullscreenButtonClick',
      value: function handleCallVideoOptionsFullscreenButtonClick(
        videoClientSessionId,
        ev,
      ) {
        var props = this.props
        var videoRef = this.callRemoteVideoRefs[videoClientSessionId]
        if (videoRef && videoRef.current) {
          try {
            _reactNative.NativeModules.FullScreenModule.enterFullScreen(
              videoRef.current,
            )
            this.fullscreenEntered = true
          } catch (ex) {
            props.uiData.ucUiStore.getLogger().log('warn', ex)
          }
        }
      },
    },
    {
      key: 'checkResized',
      value: function checkResized() {
        var _this5 = this
        var props = this.props
        if (this.callAreaRef.current) {
          this.callAreaRef.current.measure(
            function (x, y, width, height, pageX, pageY) {
              if (height !== _this5.lastHeight) {
                _this5.lastHeight = height
                if (typeof props.onResize === 'function') {
                  props.onResize({
                    height: height,
                  })
                }
              }
            },
          )
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this6 = this
        var props = this.props
        console.log(
          '#Duy Phan console props.uiData.ucUiAction',
          !!props.uiData.ucUiAction,
        )
        var profile = props.uiData.ucUiStore.getChatClient().getProfile()
        var _lampTypeOptionsCache = function lampTypeOptionsCache() {
          return (
            _lampTypeOptionsCache.value ||
            (_lampTypeOptionsCache.value =
              props.uiData.getlampTypeOptions() || {})
          )
        } // lazy evaluation
        var isSafari =
          typeof navigator !== 'undefined'
            ? new RegExp(
                (props.uiData.configurations &&
                  props.uiData.configurations.uaForBeginedTone) ||
                  '^(?=.*Safari)(?!.*Chrome).*$',
              ).test(navigator.userAgent)
            : false
        var panelSession =
          props.uiData.panelSessionTable &&
          props.uiData.panelSessionTable[
            props.panelType + '_' + props.panelCode
          ]
        var session =
          panelSession &&
          panelSession.sessionId &&
          props.uiData.phone &&
          props.uiData.phone.getSession(panelSession.sessionId)
        var videoClientSessionIds =
          (session &&
            session.videoClientSessionTable &&
            Object.keys(session.videoClientSessionTable)) ||
          []
        var callMenuOpened =
          session &&
          session.sessionId === this.state.callMenuSessionId &&
          ((session.rtcSession &&
            session.rtcSession.direction === 'outgoing') ||
            session.sessionStatus === 'connected')
        var dtmfShortcutPreference = (0, _strings.int)(
          props.uiData.ucUiStore.getOptionalSetting({
            key: ['dtmf_shortcut'],
          }),
        )
        var localStoragePreference =
          props.uiData.ucUiStore.getLocalStoragePreference({
            keyList: [
              'callAreaTheater',
              'videoSource',
              'audioSource',
              'audioTarget',
              'callVideoOptionsHidden',
            ],
          })
        var callAreaTheaterPreference = localStoragePreference[0]
        var videoSourcePreference = localStoragePreference[1]
        var audioSourcePreference = localStoragePreference[2]
        var audioTargetPreference = localStoragePreference[3]
        var callVideoOptionsHiddenPreference = localStoragePreference[4]
        var allBuddyTable = props.uiData.ucUiStore.getBuddyTable() || {}
        var buddyTable = allBuddyTable[profile.tenant] || {}
        var buddies = Object.keys(buddyTable)
          .map(function (key) {
            return buddyTable[key]
          })
          .filter(function (buddy) {
            return !buddy.isMe && buddy.isBuddy && !buddy.isTemporaryBuddy
          })
          .sort(function (buddy1, buddy2) {
            return (
              (0, _strings.int)(buddy1.buddyIndex) -
              (0, _strings.int)(buddy2.buddyIndex)
            )
          })
        var groupTable = {}
        buddies.forEach(function (buddy) {
          var groupName = (0, _strings.string)(buddy.group)
          if (!groupTable[groupName]) {
            groupTable[groupName] = {
              groupIndex: (0, _strings.int)(buddy.groupIndex),
              buddyNodes: [],
            }
          }
          if (
            !groupName ||
            _this6.state.transferTargetUserGroupOpen
              .split(',')
              .indexOf(groupName) !== -1
          ) {
            var buddyStatus = props.uiData.getCurrentBuddyStatus(buddy) || {}
            if (
              dtmfShortcutPreference & 4 ||
              (0, _strings.int)(buddyStatus.status) !==
                _constants.default.STATUS_OFFLINE
            ) {
              groupTable[groupName].buddyNodes.push(
                /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                  _MenuItem.default,
                  {
                    className: 'brTransferTargetUserItem',
                    dropDown: true,
                    onClick: _this6.handleTransferTargetUserItemClick.bind(
                      _this6,
                      buddy.user_id,
                    ),
                    children: [
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_StatusIcon.default, {
                        status: buddyStatus.status,
                        degree: buddyStatus.degree,
                      }),
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                        _NameEmbeddedSpan.default,
                        {
                          ucUiStore: props.uiData.ucUiStore,
                          format: '{0}',
                          title: '{0}',
                          buddy: buddy,
                        },
                      ),
                    ],
                  },
                  JSON.stringify({
                    tenant: buddy.tenant,
                    user_id: buddy.user_id,
                  }),
                ),
              )
            }
          }
        })
        var buddy = {}
        if (props.panelType === 'CHAT') {
          try {
            buddy =
              props.uiData.ucUiStore.getBuddyUserForUi(
                JSON.parse(props.panelCode),
              ) || {}
          } catch (ex) {}
        }
        var buddyForVideoNameTable = {}
        Object.keys(allBuddyTable).forEach(function (tenant) {
          Object.keys(allBuddyTable[tenant]).forEach(function (user_id) {
            buddyForVideoNameTable[user_id] = (0, _strings.string)(
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
        return /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
          ref: this.callAreaRef,
          style: [
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
            {
              height: this.state.height,
            },
          ],
          onLayout: this.handleTransitionEnd.bind(this),
          children: [
            /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.brIncomingArea,
              children: [
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                  style: styles.brIncomingAnimation,
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                  style: [
                    styles.brIncomingImage,
                    !buddy.profile_image_url && styles.brNoImage,
                    buddy.profile_image_url &&
                      (0, _strings.string)(buddy.profile_image_url).indexOf(
                        _constants.default.PROFILE_IMAGE_URL_DOWNLOAD,
                      ) === -1 &&
                      styles.brMyProfileImageUrl,
                    buddy.profile_image_url
                      ? {
                          backgroundImage: 'url('.concat(
                            buddy.profile_image_url,
                            ')',
                          ),
                        }
                      : {},
                  ],
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.brIncomingMessage,
                  children:
                    session && session.remoteWithVideo
                      ? _uawmsgs.default.LBL_CALL_INCOMING_WITH_VIDEO
                      : _uawmsgs.default.LBL_CALL_INCOMING,
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(_ButtonIconic.default, {
                  style: styles.brCallAnswerButton,
                  title: _uawmsgs.default.LBL_CALL_ANSWER_BUTTON_TOOLTIP,
                  onPress: props.uiData.fire.bind(
                    props.uiData,
                    'callAnswerButton_onClick',
                    props.panelType,
                    props.panelCode,
                    false,
                  ),
                  iconSource: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                    _PhoneIcon.default,
                    {},
                  ),
                  children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                    _reactNative.View,
                    {
                      style: styles.brCallAnswerButtonIcon,
                    },
                  ),
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(_ButtonIconic.default, {
                  style: styles.brCallAnswerWithVideoButton,
                  title:
                    _uawmsgs.default.LBL_CALL_ANSWER_WITH_VIDEO_BUTTON_TOOLTIP,
                  onPress: props.uiData.fire.bind(
                    props.uiData,
                    'callAnswerButton_onClick',
                    props.panelType,
                    props.panelCode,
                    true,
                  ),
                  iconSource: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                    _VideoCallIcon.default,
                    {},
                  ),
                  children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                    _reactNative.View,
                    {
                      style: styles.brCallAnswerButtonIcon,
                    },
                  ),
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(_ButtonIconic.default, {
                  style: styles.brCallDeclineButton,
                  title: _uawmsgs.default.LBL_CALL_DECLINE_BUTTON_TOOLTIP,
                  onPress: props.uiData.fire.bind(
                    props.uiData,
                    'callHangUpButton_onClick',
                    props.panelType,
                    props.panelCode,
                  ),
                  iconSource: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                    _EndCallIcon.default,
                    {},
                  ),
                  children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                    _reactNative.View,
                    {
                      style: styles.brCallDeclineButtonIcon,
                    },
                  ),
                }),
              ],
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(_SoundAudio.default, {
              uiData: props.uiData,
              className: 'brRingSoundAudio',
              src:
                (props.uiData.configurations &&
                  props.uiData.configurations.alternativeRingTone) ||
                _currentscript.default.DIR + '../sounds/ring.mp3',
              loop: true,
              playing:
                session &&
                session.rtcSession &&
                session.rtcSession.direction === 'incoming' &&
                session.sessionStatus === 'progress' &&
                !session.answering &&
                (!_lampTypeOptionsCache().silent ||
                  _lampTypeOptionsCache().ring === true) &&
                _lampTypeOptionsCache().ring !== false,
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(_SoundAudio.default, {
              uiData: props.uiData,
              className: 'brRingbackSoundAudio',
              src: _currentscript.default.DIR + '../sounds/ringback.mp3',
              loop: true,
              playing:
                session &&
                !session.remoteStreamObject &&
                session.rtcSession &&
                session.rtcSession.direction === 'outgoing' &&
                session.sessionStatus === 'progress',
              localStoragePreferenceKey: 'audioTarget',
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(_SoundAudio.default, {
              uiData: props.uiData,
              className: 'brBeginedSoundAudio',
              src: _currentscript.default.DIR + '../sounds/tone1.mp3',
              playing:
                isSafari &&
                session &&
                +new Date() - this.sessionBeginTime < 5000,
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(_SoundAudio.default, {
              uiData: props.uiData,
              className: 'brTerminatedSoundAudio',
              src: _currentscript.default.DIR + '../sounds/terminated.mp3',
              playing: !session && +new Date() - this.sessionEndTime < 5000,
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(_CallAudio.default, {
              uiData: props.uiData,
              sessionId: (0, _strings.string)(session && session.sessionId),
              streamMarker: (0, _strings.string)(
                session &&
                  session.remoteStreamObject &&
                  session.remoteStreamObject.id,
              ),
              isLocal: false,
              deviceId: audioTargetPreference,
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
              ref: this.callVideoAreaRef,
              style: [
                styles.brCallVideoArea,
                videoClientSessionIds.length >= 2 && styles.brMultiRemoteVideo,
              ],
              children: [
                videoClientSessionIds.map(function (videoClientSessionId) {
                  return /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                    _reactNative.TouchableOpacity,
                    {
                      ref: function ref(_ref) {
                        return (_this6.callRemoteVideoRefs[
                          videoClientSessionId
                        ] = _ref)
                      },
                      style: [
                        styles.brCallRemoteVideo,
                        {
                          width:
                            Math.floor(
                              100 /
                                Math.ceil(
                                  Math.sqrt(videoClientSessionIds.length),
                                ),
                            ) + '%',
                          height:
                            Math.floor(
                              100 /
                                Math.ceil(
                                  (Math.sqrt(
                                    4 * videoClientSessionIds.length + 1,
                                  ) -
                                    1) /
                                    2,
                                ),
                            ) + '%',
                        },
                      ],
                      onPress: _this6.handleCallRemoteVideoClick.bind(
                        _this6,
                        videoClientSessionId,
                      ),
                      children: [
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)(_CallVideo.default, {
                          uiData: props.uiData,
                          sessionId: (0, _strings.string)(
                            session && session.sessionId,
                          ),
                          videoClientSessionId: videoClientSessionId,
                          streamMarker: (0, _strings.string)(
                            session &&
                              session.videoClientSessionTable &&
                              session.videoClientSessionTable[
                                videoClientSessionId
                              ] &&
                              session.videoClientSessionTable[
                                videoClientSessionId
                              ].remoteStreamObject &&
                              session.videoClientSessionTable[
                                videoClientSessionId
                              ].remoteStreamObject.id,
                          ),
                          isLocal: false,
                        }),
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                          style: styles.brCallVideoName,
                          children: (function (user) {
                            return (
                              buddyForVideoNameTable[user] ||
                              buddyForVideoNameTable[
                                Object.keys(buddyForVideoNameTable).find(
                                  function (user_id) {
                                    return (
                                      user.indexOf(
                                        (0, _strings.string)(user_id).replace(
                                          '#',
                                          '',
                                        ),
                                      ) !== -1
                                    )
                                  },
                                )
                              ] ||
                              user
                            )
                          })(
                            (0, _strings.string)(
                              session &&
                                session.videoClientSessionTable &&
                                session.videoClientSessionTable[
                                  videoClientSessionId
                                ] &&
                                session.videoClientSessionTable[
                                  videoClientSessionId
                                ].user,
                            ),
                          ),
                        }),
                        /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                          style: [
                            styles.brCallVideoOptionsPanel,
                            callVideoOptionsHiddenPreference && styles.brHidden,
                            +new Date() <
                              (0, _strings.int)(
                                _this6.state.videoOptionsPanelTime[
                                  videoClientSessionId
                                ],
                              ) +
                                1500 && styles.brVisible,
                            +new Date() <
                              (0, _strings.int)(
                                _this6.state.videoOptionsPanelTime[
                                  videoClientSessionId
                                ],
                              ) +
                                2500 && styles.brEnabled,
                          ],
                          children: [
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _ButtonIconic.default,
                              {
                                style: styles.brCallVideoOptionsOptionsButton,
                                onPress:
                                  _this6.handleCallVideoOptionsOptionsButtonClick.bind(
                                    _this6,
                                    videoClientSessionId,
                                  ),
                                children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                  _reactNative.View,
                                  {
                                    style:
                                      styles.brCallVideoOptionsOptionsButtonIcon,
                                    children: /*#__PURE__*/ (0,
                                    _jsxRuntime.jsx)(_MoreIcon.default, {}),
                                  },
                                ),
                              },
                            ),
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _MenuBalloonDialog.default,
                              {
                                showing:
                                  props.uiData.showingDialogVersion ===
                                    _this6.state
                                      .callVideoOptionsMenuShowingDialogVersion &&
                                  videoClientSessionId ===
                                    _this6.state
                                      .callVideoOptionsMenuShowingDialogVideoClientSessionId,
                                style: styles.brCallVideoOptionsMenuBalloon,
                                children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                  _MenuItem.default,
                                  {
                                    style: styles.brCallVideoOptionsMenuItem,
                                    onPress:
                                      _this6.handleCallVideoOptionsHideMenuItemClick.bind(
                                        _this6,
                                        videoClientSessionId,
                                      ),
                                    children: /*#__PURE__*/ (0,
                                    _jsxRuntime.jsx)(_reactNative.Text, {
                                      children:
                                        _uawmsgs.default
                                          .LBL_CALL_VIDEO_OPTIONS_HIDE_MENU,
                                    }),
                                  },
                                ),
                              },
                            ),
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _ButtonIconic.default,
                              {
                                style:
                                  styles.brCallVideoOptionsFullscreenButton,
                                onPress:
                                  _this6.handleCallVideoOptionsFullscreenButtonClick.bind(
                                    _this6,
                                    videoClientSessionId,
                                  ),
                                children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                  _reactNative.View,
                                  {
                                    style: [
                                      styles.brCallVideoOptionsFullscreenButtonIcon,
                                    ],
                                    children:
                                      props.uiData.ownerDocument &&
                                      props.uiData.ownerDocument
                                        .fullscreenElement &&
                                      (0, _strings.string)(
                                        props.uiData.ownerDocument
                                          .fullscreenElement.className,
                                      ).indexOf('brCallRemoteVideo') !== -1
                                        ? /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                            CollapseIcon,
                                            {},
                                          )
                                        : /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                            _ExpandIcon.default,
                                            {},
                                          ),
                                  },
                                ),
                              },
                            ),
                          ],
                        }),
                      ],
                    },
                    videoClientSessionId,
                  )
                }),
                session &&
                  session.localVideoStreamObject &&
                  /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                    style: [
                      styles.brCallLocalVideo,
                      {
                        transform: [
                          {
                            translateX: this.state.callLocalVideoX,
                          },
                          {
                            translateY: this.state.callLocalVideoY,
                          },
                        ],
                      },
                    ],
                    children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                      _CallVideo.default,
                      {
                        uiData: props.uiData,
                        sessionId: (0, _strings.string)(
                          session && session.sessionId,
                        ),
                        streamMarker: (0, _strings.string)(
                          session &&
                            session.localVideoStreamObject &&
                            session.localVideoStreamObject.id,
                        ),
                        isLocal: true,
                      },
                    ),
                  }),
              ],
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
              style: styles.brOutgoingAnimation,
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
              style: [
                styles.brOutgoingImage,
                !buddy.profile_image_url && styles.brNoImage,
                buddy.profile_image_url &&
                  (0, _strings.string)(buddy.profile_image_url).indexOf(
                    _constants.default.PROFILE_IMAGE_URL_DOWNLOAD,
                  ) === -1 &&
                  styles.brMyProfileImageUrl,
                buddy.profile_image_url
                  ? {
                      backgroundImage: 'url('.concat(
                        buddy.profile_image_url,
                        ')',
                      ),
                    }
                  : {},
              ],
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.brOutgoingMessage,
              children: _uawmsgs.default.LBL_CALL_OUTGOING,
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(_CallTimer.default, {
              startTime: (0, _strings.int)(
                session && session.rtcSession && +session.rtcSession.start_time,
              ),
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(_ButtonIconic.default, {
              style: styles.brTheaterButton,
              hidden: !(session && session.withVideo),
              onPress: props.uiData.fire.bind(
                props.uiData,
                'callAreaTheaterButton_onClick',
                props.panelType,
                props.panelCode,
              ),
              children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                style: [styles.brTheaterButtonIcon],
                children: callAreaTheaterPreference
                  ? /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                      _ChevronUpIcon.default,
                      {},
                    )
                  : /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                      _ChevronUpIcon.default,
                      {},
                    ),
              }),
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
              _reactNative.Animated.View,
              _objectSpread(
                {
                  style: [
                    styles.splitterHeight,
                    {
                      transform: [
                        {
                          translateY: this.splitterPosition,
                        },
                      ],
                    },
                  ],
                },
                this.panResponder.panHandlers,
              ),
            ),
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
              style: styles.brCallMenuItemButtonArea,
              children: /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                _ButtonLabeled.default,
                {
                  style: [
                    styles.brCallMenuItemButton,
                    styles.brTransferMenuButton,
                    !(
                      session &&
                      session.sessionStatus === 'connected' &&
                      panelSession &&
                      (panelSession.holded || panelSession.transferring)
                    ) && styles.brDisabled,
                  ],
                  title: _uawmsgs.default.LBL_CALL_TRANSFER_MENU_BUTTON_TOOLTIP,
                  onPress: this.handleTransferMenuButtonClick.bind(this),
                  children: [
                    /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                      style: [styles.brCallMenuItemIcon],
                      children: [
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                          _PhoneIcon.default,
                          {},
                        ),
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                          style: [styles.brCallMenuItemIconIcon],
                          children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _ArrowRightIcon.default,
                            {},
                          ),
                        }),
                      ],
                    }),
                    !this.state.headerButtonsCollapsible &&
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                        children:
                          _uawmsgs.default.LBL_CALL_TRANSFER_MENU_BUTTON,
                      }),
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                      style: [styles.brCallMenuItemMenuIcon],
                      children:
                        props.uiData.showingDialogVersion !==
                        this.state.transferMenuShowingDialogVersion
                          ? /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _TriangleRightIcon.default,
                              {},
                            )
                          : /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _TriangleLeftIcon.default,
                              {},
                            ),
                    }),
                  ],
                },
              ),
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
              style: styles.brCallMenuItemButtonArea,
              children: /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                _ButtonLabeled.default,
                {
                  style: [
                    styles.brCallMenuItemButton,
                    styles.brHoldButton,
                    !(session && session.sessionStatus === 'connected') &&
                      styles.brDisabled,
                  ],
                  title:
                    panelSession && panelSession.holded
                      ? _uawmsgs.default.LBL_CALL_UNHOLD_BUTTON_TOOLTIP
                      : _uawmsgs.default.LBL_CALL_HOLD_BUTTON_TOOLTIP,
                  onPress: props.uiData.fire.bind(
                    props.uiData,
                    'callHoldButton_onClick',
                    props.panelType,
                    props.panelCode,
                  ),
                  children: [
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                      style: [
                        styles.brCallMenuItemIcon,
                        panelSession && panelSession.holded && styles.brHolded,
                      ],
                      children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                        _HoldIcon.default,
                        {},
                      ),
                    }),
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                      children:
                        !this.state.headerButtonsCollapsible &&
                        (panelSession && panelSession.holded
                          ? _uawmsgs.default.LBL_CALL_UNHOLD_BUTTON
                          : _uawmsgs.default.LBL_CALL_HOLD_BUTTON),
                    }),
                  ],
                },
              ),
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
              style: styles.brCallMenuItemButtonArea,
              children: /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                _ButtonLabeled.default,
                {
                  style: [
                    styles.brCallMenuItemButton,
                    styles.brDtmfMenuButton,
                    !session && styles.brDisabled,
                  ],
                  title: _uawmsgs.default.LBL_CALL_DTMF_MENU_BUTTON_TOOLTIP,
                  onPress: this.handleDtmfMenuButtonClick.bind(this),
                  children: [
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                      style: [styles.brCallMenuItemIcon],
                      children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                        _KeypadIcon.default,
                        {},
                      ),
                    }),
                    !this.state.headerButtonsCollapsible &&
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                        children: _uawmsgs.default.LBL_CALL_DTMF_MENU_BUTTON,
                      }),
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                      style: [styles.brCallMenuItemMenuIcon],
                      children:
                        props.uiData.showingDialogVersion !==
                        this.state.dtmfMenuShowingDialogVersion
                          ? /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _TriangleRightIcon.default,
                              {},
                            )
                          : /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _TriangleLeftIcon.default,
                              {},
                            ),
                    }),
                  ],
                },
              ),
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
              style: styles.brCallMenuItemButtonArea,
              children: /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                _ButtonLabeled.default,
                {
                  style: [
                    styles.brCallMenuItemButton,
                    styles.brFullscreenButton,
                    !(session && session.withVideo) && styles.brDisabled,
                  ],
                  title: _uawmsgs.default.LBL_CALL_FULLSCREEN_BUTTON_TOOLTIP,
                  onPress: this.handleFullscreenButtonClick.bind(this),
                  children: [
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                      style: [styles.brCallMenuItemIcon],
                      children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                        _ExpandIcon.default,
                        {},
                      ),
                    }),
                    !this.state.headerButtonsCollapsible &&
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                        children: _uawmsgs.default.LBL_CALL_FULLSCREEN_BUTTON,
                      }),
                  ],
                },
              ),
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.brCallMenuItemButtonArea,
              children: [
                /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_ButtonLabeled.default, {
                  style: [
                    styles.brCallMenuItemButton,
                    styles.brCameraMuteButton,
                    !session && styles.brDisabled,
                  ],
                  title:
                    panelSession && panelSession.cameraMuted
                      ? _uawmsgs.default.LBL_CALL_CAMERA_UNMUTE_BUTTON_TOOLTIP
                      : _uawmsgs.default.LBL_CALL_CAMERA_MUTE_BUTTON_TOOLTIP,
                  onPress: props.uiData.fire.bind(
                    props.uiData,
                    'callCameraMuteButton_onClick',
                    props.panelType,
                    props.panelCode,
                  ),
                  children: [
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                      style: [
                        styles.brCallMenuItemIcon,
                        panelSession &&
                          panelSession.cameraMuted &&
                          styles.brMuted,
                      ],
                      children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                        _NoVideoIcon.default,
                        {},
                      ),
                    }),
                    !this.state.headerButtonsCollapsible &&
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                        children:
                          panelSession && panelSession.cameraMuted
                            ? _uawmsgs.default.LBL_CALL_CAMERA_UNMUTE_BUTTON
                            : _uawmsgs.default.LBL_CALL_CAMERA_MUTE_BUTTON,
                      }),
                  ],
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(_ButtonLabeled.default, {
                  style: [
                    styles.brCallMenuItemButton,
                    styles.brCameraMenuButton,
                    !session && styles.brDisabled,
                  ],
                  title: _uawmsgs.default.LBL_CALL_CAMERA_MENU_BUTTON_TOOLTIP,
                  onPress: this.handleCameraMenuButtonClick.bind(this),
                  children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                    _reactNative.View,
                    {
                      style: [styles.brCallMenuItemMenuIcon],
                      children:
                        props.uiData.showingDialogVersion !==
                        this.state.cameraMenuShowingDialogVersion
                          ? /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _TriangleRightIcon.default,
                              {},
                            )
                          : /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _TriangleLeftIcon.default,
                              {},
                            ),
                    },
                  ),
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                  style: styles.brCallMenuItemButtonAreaSeparator,
                }),
              ],
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.brCallMenuItemButtonArea,
              children: [
                /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_ButtonLabeled.default, {
                  style: [
                    styles.brCallMenuItemButton,
                    styles.brMicrophoneMuteButton,
                    !session && styles.brDisabled,
                  ],
                  title:
                    session && session.muted && session.muted.main
                      ? _uawmsgs.default
                          .LBL_CALL_MICROPHONE_UNMUTE_BUTTON_TOOLTIP
                      : _uawmsgs.default
                          .LBL_CALL_MICROPHONE_MUTE_BUTTON_TOOLTIP,
                  onPress: props.uiData.fire.bind(
                    props.uiData,
                    'callMuteButton_onClick',
                    props.panelType,
                    props.panelCode,
                    'main',
                  ),
                  children: [
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                      style: [
                        styles.brCallMenuItemIcon,
                        session &&
                          session.muted &&
                          session.muted.main &&
                          styles.brMuted,
                      ],
                      children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                        _BlockMicrophoneIcon.default,
                        {},
                      ),
                    }),
                    !this.state.headerButtonsCollapsible &&
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                        children:
                          session && session.muted && session.muted.main
                            ? _uawmsgs.default.LBL_CALL_MICROPHONE_UNMUTE_BUTTON
                            : _uawmsgs.default.LBL_CALL_MICROPHONE_MUTE_BUTTON,
                      }),
                  ],
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(_ButtonLabeled.default, {
                  style: [
                    styles.brCallMenuItemButton,
                    styles.brMicrophoneMenuButton,
                    !session && styles.brDisabled,
                  ],
                  title:
                    _uawmsgs.default.LBL_CALL_MICROPHONE_MENU_BUTTON_TOOLTIP,
                  onPress: this.handleMicrophoneMenuButtonClick.bind(this),
                  children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                    _reactNative.View,
                    {
                      style: [styles.brCallMenuItemMenuIcon],
                      children:
                        props.uiData.showingDialogVersion !==
                        this.state.microphoneMenuShowingDialogVersion
                          ? /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _TriangleRightIcon.default,
                              {},
                            )
                          : /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _TriangleLeftIcon.default,
                              {},
                            ),
                    },
                  ),
                }),
                session &&
                  session.analyser &&
                  /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                    _CallMicrophoneLevel.default,
                    {
                      uiData: props.uiData,
                      sessionId: (0, _strings.string)(
                        session && session.sessionId,
                      ),
                    },
                  ),
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                  style: styles.brCallMenuItemButtonAreaSeparator,
                }),
              ],
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_MenuBalloonDialog.default, {
              showing:
                props.uiData.showingDialogVersion ===
                  this.state.transferMenuShowingDialogVersion && callMenuOpened,
              style: styles.brTransferMenuBalloon,
              children: [
                /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                  style: styles.brTransferTargetArea,
                  children: [
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_DropDownMenu.default, {
                      uiData: props.uiData,
                      style: styles.brTransferTargetUserMenu,
                      dialogStyle: styles.brCallAreaDialog,
                      onShowingDialogUpdate:
                        this.handleTransferMenuDropDownMenuShowingDialogUpdate.bind(
                          this,
                        ),
                      children: Object.keys(groupTable)
                        .sort(function (groupName1, groupName2) {
                          return (
                            (groupTable[groupName1].groupIndex >>> 0) -
                            (groupTable[groupName2].groupIndex >>> 0)
                          )
                        })
                        .map(function (groupName) {
                          return /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                            _reactNative.TouchableOpacity,
                            {
                              style: [
                                styles.brTransferTargetUserGroup,
                                groupName && styles.brGroupName,
                              ],
                              onPress:
                                _this6.handleTransferTargetUserGroupClick.bind(
                                  _this6,
                                  groupName,
                                ),
                              children: [
                                /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                  _reactNative.View,
                                  {
                                    style: [
                                      styles.brTransferTargetUserGroupIcon,
                                    ],
                                    children:
                                      _this6.state.transferTargetUserGroupOpen
                                        .split(',')
                                        .indexOf(groupName) !== -1
                                        ? /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                            _ChevronUpIcon.default,
                                            {},
                                          )
                                        : /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                            _ChevronDownIcon.default,
                                            {},
                                          ),
                                  },
                                ),
                                /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                  _reactNative.Text,
                                  {
                                    style: styles.brTransferTargetUserGroupName,
                                    children: groupName,
                                  },
                                ),
                                groupTable[groupName].buddyNodes,
                              ],
                            },
                            groupName,
                          )
                        }),
                    }),
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_TextBox.default, {
                      ref: this.transferTargetInputRef,
                      style: styles.brTransferTargetInput,
                      autoCapitalize: 'off',
                      onKeyPress:
                        this.handleTransferTargetInputKeyDown.bind(this),
                    }),
                  ],
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(_ButtonLabeled.default, {
                  ref: this.transferTargetButtonRef,
                  style: [
                    styles.brTransferButton,
                    styles.brTransferTargetButton,
                  ],
                  disabled: !(
                    session &&
                    session.sessionStatus === 'connected' &&
                    panelSession &&
                    panelSession.holded &&
                    !panelSession.transferring
                  ),
                  ghost: true,
                  title:
                    _uawmsgs.default.LBL_CALL_TRANSFER_TARGET_BUTTON_TOOLTIP,
                  onPress: this.handleTransferTargetButtonClick.bind(this),
                  children: /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                    _reactNative.View,
                    {
                      style: [styles.brTransferIcon],
                      children: [
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                          _PhoneIcon.default,
                          {},
                        ),
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                          style: [styles.brTransferIconIcon],
                          children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _ArrowRightIcon.default,
                            {},
                          ),
                        }),
                      ],
                    },
                  ),
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_ButtonLabeled.default, {
                  style: [
                    styles.brTransferButton,
                    styles.brTransferCompleteButton,
                  ],
                  disabled: !(
                    session &&
                    session.sessionStatus === 'connected' &&
                    panelSession &&
                    panelSession.transferring
                  ),
                  vivid: true,
                  title:
                    _uawmsgs.default.LBL_CALL_TRANSFER_COMPLETE_BUTTON_TOOLTIP,
                  onPress: props.uiData.fire.bind(
                    props.uiData,
                    'callHangUpButton_onClick',
                    props.panelType,
                    props.panelCode,
                  ),
                  children: [
                    /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                      style: [styles.brTransferIcon],
                      children: [
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                          _PhoneIcon.default,
                          {},
                        ),
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                          style: [styles.brTransferIconIcon],
                          children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _ArrowRightIcon.default,
                            {},
                          ),
                        }),
                      ],
                    }),
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                      children:
                        _uawmsgs.default.LBL_CALL_TRANSFER_COMPLETE_BUTTON,
                    }),
                  ],
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_ButtonLabeled.default, {
                  style: [
                    styles.brTransferButton,
                    styles.brTransferConferenceButton,
                  ],
                  disabled: !(
                    session &&
                    session.sessionStatus === 'connected' &&
                    panelSession &&
                    panelSession.transferring
                  ),
                  hidden: !(dtmfShortcutPreference & 8),
                  ghost: true,
                  title:
                    _uawmsgs.default
                      .LBL_CALL_TRANSFER_CONFERENCE_BUTTON_TOOLTIP,
                  onPress: props.uiData.fire.bind(
                    props.uiData,
                    'callTransferConferenceButton_onClick',
                    props.panelType,
                    props.panelCode,
                  ),
                  children: [
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                      style: [styles.brTransferIcon],
                      children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                        _ConferenceForegroundSelectedIcon.default,
                        {},
                      ),
                    }),
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                      children:
                        _uawmsgs.default.LBL_CALL_TRANSFER_CONFERENCE_BUTTON,
                    }),
                  ],
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_ButtonLabeled.default, {
                  style: [
                    styles.brTransferButton,
                    styles.brTransferCancelButton,
                  ],
                  disabled: !(
                    session &&
                    session.sessionStatus === 'connected' &&
                    panelSession &&
                    panelSession.transferring
                  ),
                  ghost: true,
                  title:
                    _uawmsgs.default.LBL_CALL_TRANSFER_CANCEL_BUTTON_TOOLTIP,
                  onPress: props.uiData.fire.bind(
                    props.uiData,
                    'callHoldButton_onClick',
                    props.panelType,
                    props.panelCode,
                  ),
                  children: [
                    /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                      style: [styles.brTransferIcon],
                      children: [
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                          _PhoneIcon.default,
                          {},
                        ),
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                          style: [styles.brTransferIconIcon],
                          children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _ArrowLeftIcon.default,
                            {},
                          ),
                        }),
                      ],
                    }),
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                      children:
                        _uawmsgs.default.LBL_CALL_TRANSFER_CANCEL_BUTTON,
                    }),
                  ],
                }),
              ],
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_MenuBalloonDialog.default, {
              showing:
                props.uiData.showingDialogVersion ===
                  this.state.dtmfMenuShowingDialogVersion && callMenuOpened,
              style: styles.brDtmfMenuBalloon,
              children: [
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.brDtmfLog,
                  children: this.state.dtmfLog,
                }),
                [
                  '1',
                  '2',
                  '3',
                  '4',
                  '5',
                  '6',
                  '7',
                  '8',
                  '9',
                  '*',
                  '0',
                  '#',
                ].map(function (tone, i) {
                  return /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                    _ButtonLabeled.default,
                    {
                      style: [
                        styles.brCallDtmfButton,
                        styles['brCallDtmfButton'.concat(i + 1)],
                      ],
                      ghost: true,
                      title: tone,
                      onPress: _this6.handleCallDtmfButtonClick.bind(
                        _this6,
                        tone,
                      ),
                      children: [
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                          children: tone,
                        }),
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                          _SoundAudio.default,
                          {
                            uiData: props.uiData,
                            style: styles.brDtmfSoundAudio,
                            src:
                              _currentscript.default.DIR +
                              '../sounds/' +
                              (tone === '*'
                                ? 'asterisk'
                                : tone === '#'
                                  ? 'pound'
                                  : tone) +
                              '.mp3',
                            playing:
                              tone ===
                                (0, _strings.string)(
                                  _this6.state.dtmfLog,
                                ).slice(-1) &&
                              +new Date() - _this6.state.dtmfTime < 100,
                            localStoragePreferenceKey: 'audioTarget',
                          },
                        ),
                      ],
                    },
                    i,
                  )
                }),
              ],
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_MenuBalloonDialog.default, {
              showing:
                props.uiData.showingDialogVersion ===
                  this.state.cameraMenuShowingDialogVersion && callMenuOpened,
              style: styles.brCameraMenuBalloon,
              children: [
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: [
                    styles.brChangeDeviceTitle,
                    styles.brChangeVideoinputTitle,
                  ],
                  children: _uawmsgs.default.LBL_CALL_CAMERA_CHANGE,
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(_DropDownMenu.default, {
                  uiData: props.uiData,
                  style: [
                    styles.brChangeDeviceMenu,
                    styles.brChangeVideoinputMenu,
                  ],
                  disabled: panelSession && panelSession.isScreen,
                  hidden: !callMenuOpened,
                  text: this.getDeviceLabel({
                    deviceId: videoSourcePreference,
                    kind: 'videoinput',
                  }),
                  onShowingDialogUpdate:
                    this.handleCameraMenuDropDownMenuShowingDialogUpdate.bind(
                      this,
                    ),
                  children: this.state.devices
                    .filter(function (device) {
                      return device.kind === 'videoinput'
                    })
                    .map(function (device) {
                      return /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                        _MenuItem.default,
                        {
                          style: [
                            styles.brChangeDeviceMenuItem,
                            styles.brChangeVideoinputMenuItem,
                          ],
                          dropDown: true,
                          onPress: props.uiData.fire.bind(
                            props.uiData,
                            'callAreaChangeDeviceMenuItem_onClick',
                            props.panelType,
                            props.panelCode,
                            device,
                          ),
                          children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _reactNative.Text,
                            {
                              children: _this6.getDeviceLabel(device),
                            },
                          ),
                        },
                        device.deviceId,
                      )
                    }),
                }),
              ],
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_MenuBalloonDialog.default, {
              showing:
                props.uiData.showingDialogVersion ===
                  this.state.microphoneMenuShowingDialogVersion &&
                callMenuOpened,
              style: styles.brMicrophoneMenuBalloon,
              children: [
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: [
                    styles.brChangeDeviceTitle,
                    styles.brChangeAudioinputTitle,
                  ],
                  children: _uawmsgs.default.LBL_CALL_MICROPHONE_CHANGE,
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(_DropDownMenu.default, {
                  uiData: props.uiData,
                  style: [
                    styles.brChangeDeviceMenu,
                    styles.brChangeAudioinputMenu,
                  ],
                  hidden: !callMenuOpened,
                  text: this.getDeviceLabel({
                    deviceId: audioSourcePreference,
                    kind: 'audioinput',
                  }),
                  onShowingDialogUpdate:
                    this.handleMicrophoneMenuDropDownMenuShowingDialogUpdate.bind(
                      this,
                    ),
                  children: this.state.devices
                    .filter(function (device) {
                      return device.kind === 'audioinput'
                    })
                    .map(function (device) {
                      return /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                        _MenuItem.default,
                        {
                          style: [
                            styles.brChangeDeviceMenuItem,
                            styles.brChangeAudioinputMenuItem,
                          ],
                          dropDown: true,
                          onPress: props.uiData.fire.bind(
                            props.uiData,
                            'callAreaChangeDeviceMenuItem_onClick',
                            props.panelType,
                            props.panelCode,
                            device,
                          ),
                          children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _reactNative.Text,
                            {
                              children: _this6.getDeviceLabel(device),
                            },
                          ),
                        },
                        device.deviceId,
                      )
                    }),
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: [
                    styles.brChangeDeviceTitle,
                    styles.brChangeAudiooutputTitle,
                  ],
                  children: _uawmsgs.default.LBL_CALL_SPEAKER_CHANGE,
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(_DropDownMenu.default, {
                  uiData: props.uiData,
                  style: [
                    styles.brChangeDeviceMenu,
                    styles.brChangeAudiooutputMenu,
                  ],
                  hidden: !callMenuOpened,
                  text: this.getDeviceLabel({
                    deviceId: audioTargetPreference,
                    kind: 'audiooutput',
                  }),
                  onShowingDialogUpdate:
                    this.handleMicrophoneMenuDropDownMenuShowingDialogUpdate.bind(
                      this,
                    ),
                  children: this.state.devices
                    .filter(function (device) {
                      return device.kind === 'audiooutput'
                    })
                    .map(function (device) {
                      return /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                        _MenuItem.default,
                        {
                          style: [
                            styles.brChangeDeviceMenuItem,
                            styles.brChangeAudiooutputMenuItem,
                          ],
                          dropDown: true,
                          onPress: props.uiData.fire.bind(
                            props.uiData,
                            'callAreaChangeDeviceMenuItem_onClick',
                            props.panelType,
                            props.panelCode,
                            device,
                          ),
                          children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _reactNative.Text,
                            {
                              children: _this6.getDeviceLabel(device),
                            },
                          ),
                        },
                        device.deviceId,
                      )
                    }),
                }),
              ],
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(_ButtonLabeled.default, {
              style: styles.brCallMenuButton,
              disabled: !session,
              hidden: !((panelSession && panelSession.target) || session),
              vivid: true,
              title: _uawmsgs.default.LBL_CALL_MENU_BUTTON_TOOLTIP,
              onPress: this.handleCallMenuButtonClick.bind(this),
              children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                style: [styles.brCallMenuIcon],
                children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                  _ChevronDownIcon.default,
                  {},
                ),
              }),
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(_ButtonLabeled.default, {
              style: styles.brCallHangUpButton,
              hidden: !((panelSession && panelSession.target) || session),
              title: _uawmsgs.default.LBL_CALL_HANG_UP_BUTTON_TOOLTIP,
              onPress: props.uiData.fire.bind(
                props.uiData,
                'callHangUpButton_onClick',
                props.panelType,
                props.panelCode,
              ),
              children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                style: [styles.brCallHangUpIcon],
                children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                  _EndCallIcon.default,
                  {},
                ),
              }),
            }),
          ],
        })
      },
    },
  ])
})(_react.default.Component))
var styles = _reactNative.StyleSheet.create({
  brCallArea: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    height: 0,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
    // @hint_gray
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
    transform: [
      {
        translateX: -80,
      },
      {
        translateY: -100,
      },
    ],
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
    shadowOffset: {
      width: 0,
      height: 0,
    },
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
    transform: [
      {
        rotate: '0deg',
      },
    ],
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
