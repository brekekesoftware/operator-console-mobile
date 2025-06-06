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
var _uawmsgs = _interopRequireDefault(require('../utilities/uawmsgs'))
var _strings = require('../utilities/strings')
var _ButtonIconic = _interopRequireDefault(require('./ButtonIconic'))
var _CallAudio = _interopRequireDefault(require('./CallAudio'))
var _CallVideo = _interopRequireDefault(require('./CallVideo'))
var _CallTimer = _interopRequireDefault(require('./CallTimer'))
var _MenuBalloonDialog = _interopRequireDefault(require('./MenuBalloonDialog'))
var _MenuItem = _interopRequireDefault(require('./MenuItem'))
var _MultipleAudio = _interopRequireDefault(
  require('../components/MultipleAudio'),
)
var _currentscript = _interopRequireDefault(
  require('../utilities/currentscript'),
)
var _reactNativeReanimated = _interopRequireWildcard(
  require('react-native-reanimated'),
)
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
function _extends() {
  return (
    (_extends = Object.assign
      ? Object.assign.bind()
      : function (n) {
          for (var e = 1; e < arguments.length; e++) {
            var t = arguments[e]
            for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r])
          }
          return n
        }),
    _extends.apply(null, arguments)
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
}
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
var CustomerCallArea = (exports.default = /*#__PURE__*/ (function (
  _React$Component,
) {
  function CustomerCallArea(props) {
    var _this
    _classCallCheck(this, CustomerCallArea)
    _this = _callSuper(this, CustomerCallArea, [props])
    _this.fullscreenEntered = false
    _this.state = {
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
    _this.callVideoAreaRef = /*#__PURE__*/ _react.default.createRef()
    _this.videoRefs = {}

    // Setup pan responder for draggable local video
    _this.panResponder = _reactNative.PanResponder.create({
      onStartShouldSetPanResponder: function onStartShouldSetPanResponder() {
        return true
      },
      onMoveShouldSetPanResponder: function onMoveShouldSetPanResponder() {
        return true
      },
      onPanResponderGrant: function onPanResponderGrant(evt, gestureState) {
        _this.setState({
          touchStartX: gestureState.x0,
          touchStartY: gestureState.y0,
          touchStartTime: Date.now(),
        })
      },
      onPanResponderMove: function onPanResponderMove(evt, gestureState) {
        _this.setState({
          touchMoveX: gestureState.moveX,
          touchMoveY: gestureState.moveY,
        })
        if (_this.props.uiData.callAreaExpanded) {
          _this.setState({
            callLocalVideoPosition: {
              x: gestureState.dx + _this.state.callLocalVideoPosition.x,
              y: gestureState.dy + _this.state.callLocalVideoPosition.y,
            },
          })
        }
      },
      onPanResponderRelease: function onPanResponderRelease(evt, gestureState) {
        var nowTime = Date.now()
        var dTime = nowTime - _this.state.touchStartTime
        var dY = gestureState.dy
        if (dTime < 1000) {
          if (24 < dY && dY < 200) {
            _this.setState({
              swipedTime: nowTime,
            })
            _this.props.uiData.fire('callArea_onSwipedDown', evt)
          } else if (-200 < dY && dY < -24) {
            _this.setState({
              swipedTime: nowTime,
            })
            _this.props.uiData.fire('callArea_onSwipedUp', evt)
          }
        }
      },
    })
    return _this
  }
  _inherits(CustomerCallArea, _React$Component)
  return _createClass(CustomerCallArea, [
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        var props = this.props
        var session = props.uiData.phone && props.uiData.phone.getSession()
        if (!session && this.fullscreenEntered) {
          this.fullscreenEntered = false
        }
      },
    },
    {
      key: 'handleEvent',
      value: function handleEvent(ev) {
        var props = this.props
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
          var nowTime = +new Date()
          var dTime = nowTime - this.state.touchStartTime
          var dY = this.state.touchMoveY - this.state.touchStartY
          if (dTime < 1000) {
            if (24 < dY && dY < 200) {
              this.setState({
                swipedTime: nowTime,
              })
              props.uiData.fire('callArea_onSwipedDown', ev)
            } else if (-200 < dY && dY < -24) {
              this.setState({
                swipedTime: nowTime,
              })
              props.uiData.fire('callArea_onSwipedUp', ev)
            }
          }
        }
      },
    },
    {
      key: 'handleFullscreenButtonClick',
      value: function handleFullscreenButtonClick() {
        if (_reactNative.Platform.OS === 'ios') {
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
              _reactNative.StatusBar.setHidden(true)
              this.setState({
                isFullscreen: true,
              })
              this.fullscreenEntered = true
            } else {
              // Exit fullscreen
              _reactNative.StatusBar.setHidden(false)
              this.setState({
                isFullscreen: false,
              })
              this.fullscreenEntered = false
            }
          }
        }
      },
    },
    {
      key: 'handleCallRemoteVideoClick',
      value: function handleCallRemoteVideoClick(videoClientSessionId, ev) {
        var _this2 = this
        var props = this.props
        props.uiData.callVideoOptionsHidden = false
        this.state.videoOptionsPanelTime[videoClientSessionId] = Date.now()
        this.setState({
          videoOptionsPanelTime: this.state.videoOptionsPanelTime,
        })
        setTimeout(function () {
          return _this2.setState({})
        }, 2000)
        setTimeout(function () {
          return _this2.setState({})
        }, 3000)
      },
    },
    {
      key: 'handleCallRemoteVideoMouseMove',
      value: function handleCallRemoteVideoMouseMove(videoClientSessionId, ev) {
        var _this3 = this
        var props = this.props
        this.state.videoOptionsPanelTime[videoClientSessionId] = Date.now()
        this.setState({
          videoOptionsPanelTime: this.state.videoOptionsPanelTime,
        })
        setTimeout(function () {
          return _this3.setState({})
        }, 2000)
        setTimeout(function () {
          return _this3.setState({})
        }, 3000)
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
        props.uiData.callVideoOptionsHidden = true
        ev.stopPropagation()
      },
    },
    {
      key: 'handleCallVideoOptionsFullscreenButtonClick',
      value: function handleCallVideoOptionsFullscreenButtonClick(
        videoClientSessionId,
      ) {
        var videoRef = this.videoRefs[videoClientSessionId]
        if (_reactNative.Platform.OS === 'ios') {
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
              _reactNative.StatusBar.setHidden(true)
              this.setState({
                fullscreenVideo: videoClientSessionId,
                isFullscreen: true,
              })
              this.fullscreenEntered = true
            } else {
              _reactNative.StatusBar.setHidden(false)
              this.setState({
                fullscreenVideo: null,
                isFullscreen: false,
              })
              this.fullscreenEntered = false
            }
          }
        }
        delete this.state.videoOptionsPanelTime[videoClientSessionId]
        this.setState({
          videoOptionsPanelTime: this.state.videoOptionsPanelTime,
        })
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this4 = this
        var props = this.props
        if (props.uiData.phone) {
          var session = props.uiData.phone && props.uiData.phone.getSession()
          var className = 'brCallArea'
          var videos = []
          var startTime = 0
          var remoteBuddies =
            Object.values(props.uiData.ucUiStore.getBuddyTable())[0] || {}
          var imcomingRemoteBuddy = props.uiData.ucUiStore.getBuddyUserForUi({
            user_id: (0, _strings.string)(
              session &&
                session.rtcSession &&
                session.rtcSession.remote_identity &&
                session.rtcSession.remote_identity.uri &&
                session.rtcSession.remote_identity.uri.user,
            ),
          })
          if (
            !imcomingRemoteBuddy.name &&
            !imcomingRemoteBuddy.profile_image_url
          ) {
            imcomingRemoteBuddy = props.uiData.ucUiStore.getBuddyUserForUi(
              Object.values(remoteBuddies).filter(function (b) {
                return !b.isMe
              })[0],
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
              Object.keys(session.remoteUserOptionsTable).some(function (user) {
                var remoteSoundOnly = false
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
                var keys = Object.keys(session.videoClientSessionTable)
                var width =
                  Math.floor(100 / Math.ceil(Math.sqrt(keys.length))) + '%'
                var height =
                  Math.floor(
                    100 / Math.ceil((Math.sqrt(4 * keys.length + 1) - 1) / 2),
                  ) + '%'
                videos = keys.map(function (videoClientSessionId, index) {
                  return /*#__PURE__*/ _react.default.createElement(
                    _reactNative.View,
                    {
                      key: videoClientSessionId,
                      ref: function ref(_ref) {
                        return (_this4.videoRefs[videoClientSessionId] = _ref)
                      },
                      style: [
                        styles.brCallRemoteVideo,
                        {
                          width: width,
                          height: height,
                        },
                        _this4.state.fullscreenVideo === videoClientSessionId &&
                          styles.fullscreen,
                      ],
                      onTouchStart: function onTouchStart() {
                        return _this4.handleCallRemoteVideoClick(
                          videoClientSessionId,
                        )
                      },
                      onTouchMove: function onTouchMove() {
                        return _this4.handleCallRemoteVideoMouseMove(
                          videoClientSessionId,
                        )
                      },
                    },
                    /*#__PURE__*/ _react.default.createElement(
                      _CallVideo.default,
                      {
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
                        style: props.uiData.callAreaExpanded
                          ? styles.brCancelCallAreaClick
                          : null,
                      },
                    ),
                    /*#__PURE__*/ _react.default.createElement(
                      _reactNative.Text,
                      {
                        style: styles.brCallVideoName,
                      },
                      (function (user) {
                        return (
                          remoteBuddies[user] ||
                          remoteBuddies[
                            Object.keys(remoteBuddies).find(function (user_id) {
                              return (
                                user.indexOf(
                                  (0, _strings.string)(user_id).replace(
                                    '#',
                                    '',
                                  ),
                                ) !== -1
                              )
                            })
                          ] || {
                            name: user,
                          }
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
                      ).name,
                    ),
                    /*#__PURE__*/ _react.default.createElement(
                      _reactNative.View,
                      {
                        style: [
                          styles.brCallVideoOptionsPanel,
                          styles.brCancelCallAreaClick,
                          props.uiData.callVideoOptionsHidden ||
                            (!props.uiData.callAreaExpanded && styles.brHidden),
                          Date.now() <
                            _this4.state.videoOptionsPanelTime[
                              videoClientSessionId
                            ] +
                              1500 && styles.brVisible,
                          Date.now() <
                            _this4.state.videoOptionsPanelTime[
                              videoClientSessionId
                            ] +
                              2500 && styles.brEnabled,
                        ],
                      },
                      /*#__PURE__*/ _react.default.createElement(
                        _ButtonIconic.default,
                        {
                          style: [
                            styles.brCallVideoOptionsOptionsButton,
                            styles.brCancelCallAreaClick,
                          ],
                          onPress: function onPress() {
                            return _this4.handleCallVideoOptionsOptionsButtonClick(
                              videoClientSessionId,
                            )
                          },
                        },
                        /*#__PURE__*/ _react.default.createElement(
                          _reactNative.View,
                          {
                            style: [
                              styles.brCallVideoOptionsOptionsButtonIcon,
                              styles.br_bi_icon_more_svg,
                            ],
                          },
                        ),
                      ),
                      /*#__PURE__*/ _react.default.createElement(
                        _MenuBalloonDialog.default,
                        {
                          showing:
                            props.uiData.showingDialogVersion ===
                              _this4.state
                                .callVideoOptionsMenuShowingDialogVersion &&
                            videoClientSessionId ===
                              _this4.state
                                .callVideoOptionsMenuShowingDialogVideoClientSessionId,
                          style: styles.brCallVideoOptionsMenuBalloon,
                        },
                        /*#__PURE__*/ _react.default.createElement(
                          _MenuItem.default,
                          {
                            style: [
                              styles.brCallVideoOptionsMenuItem,
                              styles.brCallVideoOptionsHideMenuItem,
                              styles.brCancelCallAreaClick,
                            ],
                            onPress: function onPress() {
                              return _this4.handleCallVideoOptionsHideMenuItemClick(
                                videoClientSessionId,
                              )
                            },
                          },
                          /*#__PURE__*/ _react.default.createElement(
                            _reactNative.Text,
                            null,
                            _uawmsgs.default.LBL_CALL_VIDEO_OPTIONS_HIDE_MENU,
                          ),
                        ),
                      ),
                      /*#__PURE__*/ _react.default.createElement(
                        _ButtonIconic.default,
                        {
                          style: [styles.brCallVideoOptionsTheaterButton],
                          hidden:
                            !(
                              props.uiData.configurations &&
                              props.uiData.configurations.theaterButton
                            ) ||
                            (props.uiData.ownerDocument &&
                              props.uiData.ownerDocument.fullscreenElement &&
                              (0, _strings.string)(
                                props.uiData.ownerDocument.fullscreenElement
                                  .className,
                              ).indexOf('brCallRemoteVideo') !== -1),
                          onPress: function onPress() {
                            return props.uiData.fire(
                              'callAreaTheaterButton_onClick',
                            )
                          },
                        },
                        /*#__PURE__*/ _react.default.createElement(
                          _reactNative.View,
                          {
                            style: [
                              styles.brCallVideoOptionsTheaterButtonIcon,
                              props.uiData.callAreaTheater
                                ? styles.br_bi_icon_chevron_up_svg
                                : styles.br_bi_icon_chevron_down_svg,
                            ],
                          },
                        ),
                      ),
                    ),
                  )
                })
              }
              if (props.uiData.callAreaExpanded) {
                videos.push(
                  /*#__PURE__*/ _react.default.createElement(
                    _reactNativeReanimated.default.View,
                    _extends(
                      {
                        key: 'local',
                        style: [
                          styles.brCallLocalVideo,
                          {
                            transform: [
                              {
                                translateX: this.state.callLocalVideoPosition.x,
                              },
                              {
                                translateY: this.state.callLocalVideoPosition.y,
                              },
                            ],
                          },
                        ],
                      },
                      this.panResponder.panHandlers,
                    ),
                    /*#__PURE__*/ _react.default.createElement(
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
                        style: styles.brCancelCallAreaClick,
                      },
                    ),
                  ),
                )
              } else {
                videos.push(
                  /*#__PURE__*/ _react.default.createElement(
                    _reactNative.View,
                    {
                      key: 'local',
                      style: styles.brCallLocalVideo,
                    },
                    /*#__PURE__*/ _react.default.createElement(
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
                  ),
                )
              }
            }
            if (session.rtcSession && session.rtcSession.start_time) {
              startTime = +session.rtcSession.start_time
            }
          }
          return /*#__PURE__*/ _react.default.createElement(
            _reactNative.View,
            _extends(
              {
                style: [
                  styles.brCallArea,
                  className,
                  _objectSpread({}, this.panResponder.panHandlers),
                ],
              },
              this.panResponder.panHandlers,
            ),
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.View,
              {
                style: styles.brCallHeaderArea,
              },
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.TouchableOpacity,
                {
                  style: [styles.brCallMuteMicButton, styles.brCallAreaButton],
                  onPress: function onPress() {
                    return props.uiData.fire('callMuteMicButton_onClick')
                  },
                },
                /*#__PURE__*/ _react.default.createElement(_reactNative.View, {
                  style: [
                    styles.brCallMuteMicIcon,
                    styles.brCallAreaIcon,
                    styles.br_bi_icon_block_microphone_svg,
                  ],
                }),
              ),
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.TouchableOpacity,
                {
                  style: [styles.brCallMuteCamButton, styles.brCallAreaButton],
                  onPress: function onPress() {
                    return props.uiData.fire('callMuteCamButton_onClick')
                  },
                },
                /*#__PURE__*/ _react.default.createElement(_reactNative.View, {
                  style: [
                    styles.brCallMuteCamIcon,
                    styles.brCallAreaIcon,
                    styles.br_bi_icon_no_video_svg,
                  ],
                }),
              ),
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.TouchableOpacity,
                {
                  style: [styles.brCallScreenButton, styles.brCallAreaButton],
                  onPress: function onPress() {
                    return props.uiData.fire('callScreenButton_onClick')
                  },
                },
                /*#__PURE__*/ _react.default.createElement(
                  _reactNative.View,
                  {
                    style: styles.brCallScreenIconArea,
                  },
                  /*#__PURE__*/ _react.default.createElement(
                    _reactNative.View,
                    {
                      style: [
                        styles.brCallScreenIcon,
                        styles.brCallAreaIconAreaIcon,
                        styles.br_bi_icon_channel_mosaic_1_svg,
                      ],
                    },
                  ),
                ),
              ),
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.TouchableOpacity,
                {
                  style: [styles.brCallHangUpButton, styles.brCallAreaButton],
                  onPress: function onPress() {
                    return props.uiData.fire('callHangUpButton_onClick')
                  },
                },
                /*#__PURE__*/ _react.default.createElement(_reactNative.View, {
                  style: [
                    styles.brCallHangUpIcon,
                    styles.brCallAreaIcon,
                    styles.br_bi_icon_end_call_svg,
                  ],
                }),
              ),
              /*#__PURE__*/ _react.default.createElement(_CallTimer.default, {
                startTime: startTime,
              }),
            ),
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.View,
              {
                style: styles.brCallAnswerArea,
              },
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.View,
                {
                  style: styles.brCallIncomingArea,
                },
                /*#__PURE__*/ _react.default.createElement(_reactNative.Image, {
                  style: styles.brCallIncomingIcon,
                  source: {
                    uri: imcomingRemoteBuddy.profile_image_url,
                  },
                }),
                /*#__PURE__*/ _react.default.createElement(
                  _reactNative.View,
                  {
                    style: styles.brCallIncomingMessageArea,
                  },
                  /*#__PURE__*/ _react.default.createElement(
                    _reactNative.Text,
                    {
                      style: styles.brCallIncomingName,
                    },
                    imcomingRemoteBuddy.name,
                  ),
                  /*#__PURE__*/ _react.default.createElement(
                    _reactNative.Text,
                    {
                      style: styles.brCallIncomingMessage,
                    },
                    _uawmsgs.default.LBL_CALL_INCOMING,
                  ),
                ),
              ),
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.View,
                {
                  style: styles.brCallAnswerButtonArea,
                },
                /*#__PURE__*/ _react.default.createElement(
                  _reactNative.TouchableOpacity,
                  {
                    style: [
                      styles.brCallAnswerButton,
                      styles.brCallAnswerAreaButton,
                    ],
                    onPress: function onPress() {
                      return props.uiData.fire('callAnswerButton_onClick')
                    },
                  },
                ),
                /*#__PURE__*/ _react.default.createElement(
                  _reactNative.TouchableOpacity,
                  {
                    style: [
                      styles.brCallAnswerWithVideoButton,
                      styles.brCallAnswerAreaButton,
                    ],
                    onPress: function onPress() {
                      return props.uiData.fire(
                        'callAnswerWithVideoButton_onClick',
                      )
                    },
                  },
                ),
                /*#__PURE__*/ _react.default.createElement(
                  _reactNative.TouchableOpacity,
                  {
                    style: [
                      styles.brCallDeclineButton,
                      styles.brCallAnswerAreaButton,
                    ],
                    onPress: function onPress() {
                      return props.uiData.fire('callDeclineButton_onClick')
                    },
                  },
                ),
              ),
            ),
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.View,
              {
                ref: this.callVideoAreaRef,
                style: [
                  styles.brCallVideoArea,
                  Object.keys(
                    (session && session.videoClientSessionTable) || {},
                  ).length >= 2 && styles.brMultiRemoteVideo,
                  this.state.isFullscreen && styles.fullscreen,
                ],
              },
              videos,
            ),
            /*#__PURE__*/ _react.default.createElement(_MultipleAudio.default, {
              uiData: props.uiData,
              style: styles.brRingMultipleAudio,
              src: _currentscript.default.DIR + '../sounds/ring.mp3',
              loop: true,
              playing:
                props.uiData.configurations &&
                props.uiData.configurations.ringTone &&
                session &&
                session.rtcSession &&
                session.rtcSession.direction === 'incoming' &&
                session.sessionStatus === 'progress' &&
                !session.answering,
            }),
            /*#__PURE__*/ _react.default.createElement(_MultipleAudio.default, {
              uiData: props.uiData,
              style: styles.brRingbackMultipleAudio,
              src: _currentscript.default.DIR + '../sounds/ringback.mp3',
              loop: true,
              playing:
                props.uiData.configurations &&
                props.uiData.configurations.ringbackTone &&
                session &&
                !session.remoteStreamObject &&
                session.rtcSession &&
                session.rtcSession.direction === 'outgoing' &&
                session.sessionStatus === 'progress',
            }),
            /*#__PURE__*/ _react.default.createElement(_CallAudio.default, {
              uiData: props.uiData,
              sessionId: (0, _strings.string)(session && session.sessionId),
              streamMarker:
                (0, _strings.string)(
                  session &&
                    session.remoteStreamObject &&
                    session.remoteStreamObject.id,
                ) + (0, _strings.string)(session && session.remoteStreamUrl),
              isLocal: false,
              style: styles.brCallRemoteAudio,
            }),
          )
        } else {
          return /*#__PURE__*/ _react.default.createElement(
            _reactNative.View,
            null,
          )
        }
      },
    },
  ])
})(_react.default.Component))
var styles = _reactNative.StyleSheet.create({
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
    shadowColor: '#FF5722',
    // @portland_orange
    shadowOffset: {
      width: 0,
      height: 0,
    },
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
    shadowOffset: {
      width: 0,
      height: 0,
    },
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
    shadowColor: '#48D1CC',
    // @medium_turquoise
    shadowOffset: {
      width: 0,
      height: 0,
    },
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
    transform: [
      {
        translateX: -50,
      },
      {
        translateY: -50,
      },
    ],
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
