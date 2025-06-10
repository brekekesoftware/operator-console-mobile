'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _react = _interopRequireDefault(require('react'))
var _reactNative = require('react-native')
var _uawmsgs = _interopRequireDefault(require('../utilities/uawmsgs'))
var _constants = _interopRequireDefault(require('../utilities/constants'))
var _strings = require('../utilities/strings')
var _ButtonIconic = _interopRequireDefault(require('./ButtonIconic'))
var _jsxRuntime = require('react/jsx-runtime')
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e }
}
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
} /**
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
var Incomingbar = (exports.default = /*#__PURE__*/ (function (
  _React$Component,
) {
  function Incomingbar(props) {
    var _this
    _classCallCheck(this, Incomingbar)
    _this = _callSuper(this, Incomingbar, [props])
    _defineProperty(_this, 'handleDragOver', function () {
      if (!_this.state.someDragging) {
        _this.setState({
          someDragging: true,
        })
        setTimeout(_this.checkDragEnd, 1000)
      }
    })
    _defineProperty(_this, 'checkDragEnd', function () {
      if (_this.state.someDragging) {
        // TODO: Implement drag end detection
        _this.setState({
          someDragging: false,
        })
      }
    })
    _defineProperty(
      _this,
      'handleIncomingbarPanelLinkPress',
      function (panelType, panelCode) {
        _this.props.uiData.fire(
          'incomingbarPanelLink_onClick',
          panelType,
          panelCode,
        )
      },
    )
    _defineProperty(
      _this,
      'handleIncomingbarCollapseButtonPress',
      function (sessionId, incomingProgress) {
        _this.setState({
          collapsedSessionId:
            _this.state.collapsedSessionId === sessionId ? '' : sessionId,
        })
      },
    )
    _this.state = {
      someDragging: false,
      collapsedSessionId: '',
      animationValue: new _reactNative.Animated.Value(0),
    }
    return _this
  }
  _inherits(Incomingbar, _React$Component)
  return _createClass(Incomingbar, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.startAnimation()
      },
    },
    {
      key: 'startAnimation',
      value: function startAnimation() {
        _reactNative.Animated.loop(
          _reactNative.Animated.sequence([
            _reactNative.Animated.timing(this.state.animationValue, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
            _reactNative.Animated.timing(this.state.animationValue, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true,
            }),
          ]),
        ).start()
      },
    },
    {
      key: 'render',
      value: function render() {
        var _session,
          _this2 = this,
          _session2
        var props = this.props
        var session = null
        var panel = {}
        var panelSession = {}
        Object.keys(props.uiData.panelSessionTable).some(function (panelKey) {
          var _props$uiData$phone
          var ps = props.uiData.panelSessionTable[panelKey]
          var s =
            (ps === null || ps === void 0 ? void 0 : ps.sessionId) &&
            ((_props$uiData$phone = props.uiData.phone) === null ||
            _props$uiData$phone === void 0
              ? void 0
              : _props$uiData$phone.getSession(ps.sessionId))
          if (
            s !== null &&
            s !== void 0 &&
            s.rtcSession &&
            ((s.rtcSession.direction === 'incoming' &&
              s.sessionStatus === 'progress') ||
              s.sessionStatus === 'connected')
          ) {
            session = s
            panel = (0, _strings.parsePanelKey)(panelKey)
            panelSession = ps
            return true
          }
          return false
        })
        var incomingProgress =
          ((_session = session) === null ||
          _session === void 0 ||
          (_session = _session.rtcSession) === null ||
          _session === void 0
            ? void 0
            : _session.direction) === 'incoming' &&
          session.sessionStatus === 'progress' &&
          !session.answering
        var collapsed =
          session && session.sessionId === this.state.collapsedSessionId
        var buddy = {}
        if (panel.panelType === 'CHAT') {
          try {
            buddy =
              props.uiData.ucUiStore.getBuddyUserForUi(
                JSON.parse(panel.panelCode),
              ) || {}
          } catch (ex) {}
        } else if (panel.panelType === 'CONFERENCE') {
          var _props$uiData$ucUiSto
          buddy.name = (0, _strings.string)(
            (_props$uiData$ucUiSto = props.uiData.ucUiStore.getChatHeaderInfo({
              chatType: panel.panelType,
              chatCode: panel.panelCode,
            })) === null || _props$uiData$ucUiSto === void 0
              ? void 0
              : _props$uiData$ucUiSto.title,
          )
        } else if (panel.panelType === 'EXTERNALCALL') {
          var _props$uiData$externa
          buddy.name = (0, _strings.string)(
            ((_props$uiData$externa = props.uiData.externalCallWorkTable) ===
              null ||
            _props$uiData$externa === void 0 ||
            (_props$uiData$externa = _props$uiData$externa[panel.panelCode]) ===
              null ||
            _props$uiData$externa === void 0
              ? void 0
              : _props$uiData$externa.display_name) || panel.panelCode,
          )
          if (buddy.name && buddy.name !== panel.panelCode) {
            buddy.name += ' ('.concat(panel.panelCode, ')')
          }
        }
        if (!session) {
          return null
        }
        return /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: [
            styles.brIncomingbar,
            incomingProgress && styles.brIncomingProgress,
            collapsed && styles.brCollapsed,
            this.state.someDragging && styles.brSomeDragging,
            this.props.style,
          ],
          children: [
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
              style: [
                styles.brIncomingbarAnimation,
                {
                  opacity: this.state.animationValue,
                },
              ],
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Image, {
              style: [
                styles.brIncomingImage,
                !buddy.profile_image_url && styles.brNoImage,
                buddy.profile_image_url &&
                  (0, _strings.string)(buddy.profile_image_url).indexOf(
                    _constants.default.PROFILE_IMAGE_URL_DOWNLOAD,
                  ) === -1 &&
                  styles.brMyProfileImageUrl,
              ],
              source: buddy.profile_image_url
                ? {
                    uri: buddy.profile_image_url,
                  }
                : null,
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
              style: styles.brIncomingbarMessage,
              onPress: function onPress() {
                return _this2.handleIncomingbarPanelLinkPress(
                  panel.panelType,
                  panel.panelCode,
                )
              },
              children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.messageText,
                children: incomingProgress
                  ? /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                      children: (0, _strings.string)(
                        session.remoteWithVideo
                          ? _uawmsgs.default.MSG_INCOMINGBAR_MESSAGE_WITH_VIDEO
                          : _uawmsgs.default.MSG_INCOMINGBAR_MESSAGE,
                      ).replace('{0}', (0, _strings.string)(buddy.name)),
                    })
                  : /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                      children: (0, _strings.string)(buddy.name),
                    }),
              }),
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.controlButtons,
              children: [
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(_ButtonIconic.default, {
                  style: styles.brVideoRefreshButton,
                  disabled: !session || !session.withVideo,
                  hidden:
                    incomingProgress ||
                    !(
                      (0, _strings.int)(
                        props.uiData.ucUiStore.getOptionalSetting({
                          key: ['dbgopt'],
                        }),
                      ) & 2
                    ),
                  iconName: 'refresh',
                  onPress: function onPress() {
                    return props.uiData.fire(
                      'callVideoRefreshButton_onClick',
                      panel.panelType,
                      panel.panelCode,
                    )
                  },
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(_ButtonIconic.default, {
                  style: [
                    styles.brMicrophoneMuteButton,
                    ((_session2 = session) === null ||
                    _session2 === void 0 ||
                    (_session2 = _session2.muted) === null ||
                    _session2 === void 0
                      ? void 0
                      : _session2.main) && styles.brMuted,
                  ],
                  disabled: !session,
                  hidden: incomingProgress,
                  iconName: 'block_microphone',
                  onPress: function onPress() {
                    return props.uiData.fire(
                      'callMuteButton_onClick',
                      panel.panelType,
                      panel.panelCode,
                      'main',
                    )
                  },
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(_ButtonIconic.default, {
                  style: [
                    styles.brCameraMuteButton,
                    panelSession.cameraMuted && styles.brMuted,
                  ],
                  disabled: !session,
                  hidden: incomingProgress,
                  iconName: 'no_video',
                  onPress: function onPress() {
                    return props.uiData.fire(
                      'callCameraMuteButton_onClick',
                      panel.panelType,
                      panel.panelCode,
                    )
                  },
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(_ButtonIconic.default, {
                  style: [
                    styles.brScreenToggleButton,
                    panelSession.isScreen && styles.brIsScreen,
                  ],
                  disabled: !session,
                  hidden: incomingProgress,
                  iconName: 'channel_mosaic_1',
                  onPress: function onPress() {
                    return props.uiData.fire(
                      'callScreenToggleButton_onClick',
                      panel.panelType,
                      panel.panelCode,
                    )
                  },
                }),
                incomingProgress &&
                  /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
                    children: [
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                        _ButtonIconic.default,
                        {
                          style: styles.brCallAnswerButton,
                          iconName: 'phone',
                          onPress: function onPress() {
                            return props.uiData.fire(
                              'callAnswerButton_onClick',
                              panel.panelType,
                              panel.panelCode,
                              false,
                            )
                          },
                        },
                      ),
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                        _ButtonIconic.default,
                        {
                          style: styles.brCallAnswerWithVideoButton,
                          iconName: 'video_call',
                          onPress: function onPress() {
                            return props.uiData.fire(
                              'callAnswerButton_onClick',
                              panel.panelType,
                              panel.panelCode,
                              true,
                            )
                          },
                        },
                      ),
                    ],
                  }),
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(_ButtonIconic.default, {
                  style: styles.brCallDeclineButton,
                  iconName: 'end_call',
                  onPress: function onPress() {
                    return props.uiData.fire(
                      'callHangUpButton_onClick',
                      panel.panelType,
                      panel.panelCode,
                    )
                  },
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(_ButtonIconic.default, {
                  style: styles.brIncomingbarCollapseButton,
                  iconName: collapsed ? 'phone_talking' : 'chevron_right',
                  onPress: function onPress() {
                    var _session3
                    return _this2.handleIncomingbarCollapseButtonPress(
                      (0, _strings.string)(
                        (_session3 = session) === null || _session3 === void 0
                          ? void 0
                          : _session3.sessionId,
                      ),
                      incomingProgress,
                    )
                  },
                }),
              ],
            }),
          ],
        })
      },
    },
  ])
})(_react.default.Component)) // Define colors
var colors = {
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
var styles = _reactNative.StyleSheet.create({
  brIncomingbar: {
    width: 240,
    height: 48,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: colors.hint_gray,
    shadowColor: colors.platinum,
    shadowOffset: {
      width: 2,
      height: 2,
    },
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
    transform: [
      {
        scale: 1,
      },
    ],
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
    transform: [
      {
        translateY: -8,
      },
    ],
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
