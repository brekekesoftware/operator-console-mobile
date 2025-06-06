'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _react = _interopRequireDefault(require('react'))
var _reactNative = require('react-native')
var _uawmsgs = _interopRequireDefault(require('../utilities/uawmsgs'))
var _constants = _interopRequireDefault(require('../utilities/constants'))
var _ButtonIconic = _interopRequireDefault(require('./ButtonIconic'))
var _StatusIcon = _interopRequireDefault(require('./StatusIcon'))
var _OokIcon = _interopRequireDefault(require('../icons/OokIcon'))
var _CloseIcon = _interopRequireDefault(require('../icons/CloseIcon'))
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
var colors = {
  white: '#FFFFFF',
  platinum: '#E5E5E5',
  darkJungleGreen: '#1F2937',
  darkGray: '#666666',
}
var styles = _reactNative.StyleSheet.create({
  statusbar: _objectSpread(
    {
      position: 'relative',
      width: 240,
      height: 48,
      borderRadius: 6,
      overflow: 'hidden',
      backgroundColor: colors.white,
    },
    _reactNative.Platform.select({
      ios: {
        shadowColor: colors.platinum,
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  ),
  statusbarMessage: {
    position: 'absolute',
    left: 24,
    right: 200,
    top: '50%',
    transform: [
      {
        translateY: -12,
      },
    ], // Approximate -50% for the content height
  },
  statusbarMessageHeader: {
    marginRight: 8,
    color: colors.darkJungleGreen,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 20.8,
    // 1.6 * 13
    letterSpacing: 0.3,
  },
  statusbarMessageStatusIconArea: {
    position: 'relative',
    width: 12,
    height: 12,
    marginRight: 8,
  },
  statusbarMessageStatusIcon: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  statusbarMessageStatusChecked: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    tintColor: colors.white, // Equivalent to filter: brightness(0) invert(100%)
  },
  statusbarMessageStatusLabel: {
    marginRight: 8,
    color: colors.darkJungleGreen,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 20.8,
    letterSpacing: 0.3,
  },
  statusbarMessageStatusDisplay: {
    fontSize: 9,
    fontWeight: '400',
    lineHeight: 14.4,
    // 1.6 * 9
    letterSpacing: 1.3,
    color: colors.darkGray,
  },
  statusbarCloseButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 16,
    height: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

/**
 * Statusbar
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.runningAnimationTable
 * props.uiData.statusbarCloseButton_onClick
 * props.style - Style object for the statusbar
 */
var _default = (exports.default = /*#__PURE__*/ (function (_React$Component) {
  function _default(props) {
    var _this
    _classCallCheck(this, _default)
    _this = _callSuper(this, _default, [props])
    _this.fadeAnim = new _reactNative.Animated.Value(0)
    return _this
  }
  _inherits(_default, _React$Component)
  return _createClass(_default, [
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        var props = this.props
        var signInStatus = props.uiData.ucUiStore.getSignInStatus()
        var statusMe = props.uiData.ucUiStore.getChatClient().getStatus()
        var shouldAnimate =
          signInStatus === 3 &&
          (statusMe.status !== _constants.default.STATUS_AVAILABLE ||
            statusMe.display) &&
          props.uiData.runningAnimationTable['statusbar']
        if (shouldAnimate) {
          this.startAnimation()
        }
      },
    },
    {
      key: 'startAnimation',
      value: function startAnimation() {
        this.fadeAnim.setValue(0.9)
        _reactNative.Animated.sequence([
          _reactNative.Animated.delay(2000),
          _reactNative.Animated.timing(this.fadeAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]).start()
      },
    },
    {
      key: 'render',
      value: function render() {
        var props = this.props
        var signInStatus = props.uiData.ucUiStore.getSignInStatus()
        var statusMe = props.uiData.ucUiStore.getChatClient().getStatus()
        var shouldShow =
          signInStatus === 3 &&
          (statusMe.status !== _constants.default.STATUS_AVAILABLE ||
            statusMe.display) &&
          props.uiData.runningAnimationTable['statusbar']
        if (!shouldShow) {
          return null
        }
        return /*#__PURE__*/ _react.default.createElement(
          _reactNative.Animated.View,
          {
            style: [
              styles.statusbar,
              {
                opacity: this.fadeAnim,
              },
              this.props.style,
            ],
          },
          /*#__PURE__*/ _react.default.createElement(
            _reactNative.View,
            {
              style: styles.statusbarMessage,
            },
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.View,
              {
                style: styles.row,
              },
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.Text,
                {
                  style: styles.statusbarMessageHeader,
                },
                _uawmsgs.default.MSG_STATUSBAR_MESSAGE_HEADER,
              ),
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.View,
                {
                  style: styles.statusbarMessageStatusIconArea,
                },
                /*#__PURE__*/ _react.default.createElement(
                  _StatusIcon.default,
                  {
                    style: styles.statusbarMessageStatusIcon,
                    status: statusMe.status,
                  },
                ),
                /*#__PURE__*/ _react.default.createElement(
                  _reactNative.View,
                  {
                    style: styles.statusbarMessageStatusChecked,
                  },
                  /*#__PURE__*/ _react.default.createElement(
                    _OokIcon.default,
                    null,
                  ),
                ),
              ),
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.Text,
                {
                  style: styles.statusbarMessageStatusLabel,
                },
                statusMe.status === _constants.default.STATUS_AVAILABLE
                  ? _uawmsgs.default.CMN_OWN_STATUS_STRING_AVAILABLE
                  : statusMe.status === _constants.default.STATUS_OFFLINE
                    ? _uawmsgs.default.CMN_OWN_STATUS_STRING_INVISIBLE
                    : statusMe.status === _constants.default.STATUS_BUSY
                      ? _uawmsgs.default.CMN_OWN_STATUS_STRING_BUSY
                      : '',
              ),
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.Text,
                {
                  style: styles.statusbarMessageStatusDisplay,
                },
                statusMe.display,
              ),
            ),
          ),
          /*#__PURE__*/ _react.default.createElement(_ButtonIconic.default, {
            style: styles.statusbarCloseButton,
            iconSource: /*#__PURE__*/ _react.default.createElement(
              _CloseIcon.default,
              null,
            ),
            title: _uawmsgs.default.CMN_CLOSE,
            onPress: function onPress() {
              return props.uiData.fire('statusbarCloseButton_onClick')
            },
          }),
        )
      },
    },
  ])
})(_react.default.Component))
