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
var _NameEmbeddedSpan = _interopRequireDefault(require('./NameEmbeddedSpan'))
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
var colors = {
  dark_gray: '#9e9e9e',
  portland_orange: '#ff4526',
}

/**
 * ChatSysmsg
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.configurations
 * props.sysmsg
 * props.sysmsg.sysmsgLevel
 * props.sysmsg.sysmsgType
 * props.sysmsg.buddy
 * props.sysmsg.sysmsgData
 * props.nextChat
 */
var ChatSysmsg = (exports.default = /*#__PURE__*/ (function (_React$Component) {
  function ChatSysmsg(props) {
    var _this
    _classCallCheck(this, ChatSysmsg)
    _this = _callSuper(this, ChatSysmsg, [props])
    _this.state = {
      animation: new _reactNative.Animated.Value(0),
    }
    return _this
  }
  _inherits(ChatSysmsg, _React$Component)
  return _createClass(ChatSysmsg, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this2 = this
        if (this.shouldAnimate()) {
          var delay = this.props.uiData.configurations.sysmsgDelay || 3000
          setTimeout(function () {
            _reactNative.Animated.timing(_this2.state.animation, {
              toValue: 1,
              duration: 300,
              useNativeDriver: false,
            }).start()
          }, delay)
        }
      },
    },
    {
      key: 'shouldAnimate',
      value: function shouldAnimate() {
        var props = this.props
        return (
          props.sysmsg.sysmsgType === 'MSG_CONFERENCE_MEMBER_OFFLINE' &&
          (!props.nextChat ||
            (props.nextChat.type === 'sysmsg' &&
              props.nextChat.sysmsgType === 'MSG_CONFERENCE_MEMBER_ONLINE'))
        )
      },
    },
    {
      key: 'render',
      value: function render() {
        var _props$nextChat, _props$nextChat2
        var props = this.props
        var isError = props.sysmsg.sysmsgLevel === 'error'
        var isOffline =
          props.sysmsg.sysmsgType === 'MSG_CONFERENCE_MEMBER_OFFLINE'
        var isOnline =
          props.sysmsg.sysmsgType === 'MSG_CONFERENCE_MEMBER_ONLINE'
        var isEndOfList = !props.nextChat
        var isBeforeOnline =
          ((_props$nextChat = props.nextChat) === null ||
          _props$nextChat === void 0
            ? void 0
            : _props$nextChat.type) === 'sysmsg' &&
          ((_props$nextChat2 = props.nextChat) === null ||
          _props$nextChat2 === void 0
            ? void 0
            : _props$nextChat2.sysmsgType) === 'MSG_CONFERENCE_MEMBER_ONLINE'
        var format = _uawmsgs.default[props.sysmsg.sysmsgType] || '{0}'
        var animatedStyle = this.shouldAnimate()
          ? {
              height: this.state.animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 24],
              }),
              paddingTop: this.state.animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 4],
              }),
              paddingBottom: this.state.animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 4],
              }),
              paddingLeft: this.state.animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 16],
              }),
            }
          : {}
        return /*#__PURE__*/ _react.default.createElement(
          _reactNative.Animated.View,
          {
            style: [styles.brChatSysmsg, animatedStyle],
          },
          /*#__PURE__*/ _react.default.createElement(
            _reactNative.Text,
            {
              style: [
                styles.sysmsgText,
                isError && styles.brChatError,
                isOffline && isBeforeOnline && styles.brBeforeOnline,
                isOnline &&
                  isBeforeOnline &&
                  styles.brConferenceMemberOnlineCollapsed,
              ],
            },
            props.sysmsg.sysmsgData
              ? format.split('{0}').join(props.sysmsg.sysmsgData)
              : /*#__PURE__*/ _react.default.createElement(
                  _NameEmbeddedSpan.default,
                  {
                    ucUiStore: props.uiData.ucUiStore,
                    format: format,
                    buddy: props.sysmsg.buddy,
                  },
                ),
          ),
        )
      },
    },
  ])
})(_react.default.Component))
var styles = _reactNative.StyleSheet.create({
  brChatSysmsg: {
    overflow: 'hidden',
  },
  sysmsgText: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 20.8,
    // 1.6 * 13
    letterSpacing: 0.3,
    paddingVertical: 4,
    paddingLeft: 16,
    color: colors.dark_gray,
  },
  brChatError: {
    color: colors.portland_orange,
  },
  brBeforeOnline: {
    height: 0,
    paddingVertical: 0,
    paddingLeft: 0,
    overflow: 'hidden',
  },
  brConferenceMemberOnlineCollapsed: {
    height: 0,
    paddingVertical: 0,
    paddingLeft: 0,
    overflow: 'hidden',
  },
})
