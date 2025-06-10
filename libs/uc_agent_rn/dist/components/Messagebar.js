'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _react = _interopRequireDefault(require('react'))
var _reactNative = require('react-native')
var _uawmsgs = _interopRequireDefault(require('../utilities/uawmsgs'))
var _strings = require('../utilities/strings')
var _ButtonLabeled = _interopRequireDefault(require('./ButtonLabeled'))
var _errors = _interopRequireDefault(require('../utilities/errors'))
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
 * Messagebar - React Native version
 * A component that displays connection status messages and actions
 *
 * props.uiData - UI data object
 * props.uiData.ucUiStore - UI store
 * props.uiData.ownerDocument - Document object
 * props.uiData.messagebarCancelButton_onClick - Cancel button click handler
 * props.uiData.messagebarReloadButton_onClick - Reload button click handler
 * props.uiData.messagebarRetryButton_onClick - Retry button click handler
 * props.style - Additional styles
 */
var Messagebar = (exports.default = /*#__PURE__*/ (function (_React$Component) {
  function Messagebar(props) {
    var _this
    _classCallCheck(this, Messagebar)
    _this = _callSuper(this, Messagebar, [props])
    _defineProperty(_this, 'handleDrag', function () {
      if (!_this.state.someDragging) {
        _this.setState({
          someDragging: true,
        })
        setTimeout(_this.checkDragEnd, 1000)
      }
    })
    _defineProperty(_this, 'checkDragEnd', function () {
      if (_this.state.someDragging) {
        _this.setState({
          someDragging: false,
        })
      }
    })
    _this.interval = null
    _this.state = {
      someDragging: false,
      secondsElapsed: 0,
    }
    return _this
  }
  _inherits(Messagebar, _React$Component)
  return _createClass(Messagebar, [
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        var props = this.props
        var signInStatus = props.uiData.ucUiStore.getSignInStatus()
        var lastSignOutReason = props.uiData.ucUiStore.getLastSignOutReason()
        var reSignInTime = (0, _strings.int)(
          (signInStatus === 0 || signInStatus === 1) &&
            lastSignOutReason.reSignInTime,
        )
        if (reSignInTime) {
          if (!this.interval) {
            this.interval = setInterval(this.tick.bind(this), 500)
          }
        } else {
          if (this.interval) {
            clearInterval(this.interval)
            this.interval = null
          }
          if (this.state.secondsElapsed) {
            this.setState({
              secondsElapsed: 0,
            })
          }
        }
      },
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (this.interval) {
          clearInterval(this.interval)
          this.interval = null
        }
      },
    },
    {
      key: 'tick',
      value: function tick() {
        var props = this.props
        var signInStatus = props.uiData.ucUiStore.getSignInStatus()
        var lastSignOutReason = props.uiData.ucUiStore.getLastSignOutReason()
        var reSignInTime = (0, _strings.int)(
          (signInStatus === 0 || signInStatus === 1) &&
            lastSignOutReason.reSignInTime,
        )
        if (reSignInTime) {
          this.setState({
            secondsElapsed: (0, _strings.int)(
              (999 + reSignInTime - +new Date()) / 1000,
            ),
          })
        } else if (this.state.secondsElapsed) {
          this.setState({
            secondsElapsed: 0,
          })
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        var props = this.props
        var signInStatus = props.uiData.ucUiStore.getSignInStatus()
        var lastSignOutReason = props.uiData.ucUiStore.getLastSignOutReason()
        var isHidden = signInStatus === 3 || lastSignOutReason.code === 1
        if (isHidden) {
          return null
        }
        var messageText = ''
        if (
          lastSignOutReason.code === _errors.default.UPDATE_STARTED ||
          lastSignOutReason.code === _errors.default.VERSION_INVALID
        ) {
          messageText = _uawmsgs.default.MSG_MESSAGEBAR_MAINTENANCE
        } else if (
          lastSignOutReason.code === _errors.default.PLEONASTIC_LOGIN ||
          lastSignOutReason.code === _errors.default.ALREADY_SIGNED_IN
        ) {
          messageText = _uawmsgs.default.MSG_MESSAGEBAR_PLEONASTIC
        } else if (
          lastSignOutReason.code === _errors.default.CANNOT_START_MFA
        ) {
          messageText = _uawmsgs.default.MSG_MESSAGEBAR_MFA
        } else {
          messageText = _uawmsgs.default.MSG_MESSAGEBAR_DISCONNECTED
        }
        if (signInStatus === 2) {
          messageText += ' ' + _uawmsgs.default.MSG_MESSAGEBAR_CONNECTING
        } else if (this.state.secondsElapsed) {
          messageText +=
            ' ' +
            (0, _strings.formatStr)(
              _uawmsgs.default.MSG_MESSAGEBAR_RETRY,
              this.state.secondsElapsed,
            )
        }
        var showCancelButton =
          (signInStatus === 0 || signInStatus === 1) &&
          this.state.secondsElapsed
        var showReloadButton =
          (signInStatus === 0 || signInStatus === 1) &&
          (lastSignOutReason.code === _errors.default.UPDATE_STARTED ||
            lastSignOutReason.code === _errors.default.VERSION_INVALID ||
            lastSignOutReason.code === _errors.default.CANNOT_START_MFA)
        var showRetryButton =
          (signInStatus === 0 || signInStatus === 1) &&
          !(
            lastSignOutReason.code === _errors.default.UPDATE_STARTED ||
            lastSignOutReason.code === _errors.default.VERSION_INVALID ||
            lastSignOutReason.code === _errors.default.CANNOT_START_MFA
          )
        return /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: [
            styles.messagebar,
            this.state.someDragging && styles.someDragging,
            props.style,
          ],
          children: [
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: styles.messagebarMessage,
              children: messageText,
            }),
            showCancelButton &&
              /*#__PURE__*/ (0, _jsxRuntime.jsx)(_ButtonLabeled.default, {
                style: [styles.messagebarButton, styles.cancelButton],
                title: _uawmsgs.default.LBL_MESSAGEBAR_CANCEL_BUTTON_TOOLTIP,
                onClick: props.uiData.fire.bind(
                  props.uiData,
                  'messagebarCancelButton_onClick',
                ),
                children: _uawmsgs.default.LBL_MESSAGEBAR_CANCEL_BUTTON,
              }),
            showReloadButton &&
              /*#__PURE__*/ (0, _jsxRuntime.jsx)(_ButtonLabeled.default, {
                style: [styles.messagebarButton, styles.reloadButton],
                title: _uawmsgs.default.LBL_MESSAGEBAR_RELOAD_BUTTON_TOOLTIP,
                onClick: props.uiData.fire.bind(
                  props.uiData,
                  'messagebarReloadButton_onClick',
                ),
                children: _uawmsgs.default.LBL_MESSAGEBAR_RELOAD_BUTTON,
              }),
            showRetryButton &&
              /*#__PURE__*/ (0, _jsxRuntime.jsx)(_ButtonLabeled.default, {
                style: [styles.messagebarButton, styles.retryButton],
                title: _uawmsgs.default.LBL_MESSAGEBAR_RETRY_BUTTON_TOOLTIP,
                onClick: props.uiData.fire.bind(
                  props.uiData,
                  'messagebarRetryButton_onClick',
                ),
                children: _uawmsgs.default.LBL_MESSAGEBAR_RETRY_BUTTON,
              }),
          ],
        })
      },
    },
  ])
})(_react.default.Component)) // Define colors from CSS variables
var colors = {
  mediumTurquoise: '#4BC5DE',
  // @medium_turquoise
  white: '#FFFFFF',
  // @white
  darkJungleGreen: '#212121',
  // @dark_jungle_green
  isabelline: '#EEEEEE',
  // @isabelline
  platinum: '#E0E0E0',
  // @platinum
  snow: '#FAFAFA',
  // @snow
  whiteSmoke: '#F5F5F5',
  // @white_smoke
  darkGray: '#9E9E9E',
  // @dark_gray
  portlandOrange: '#FF4526', // @portland_orange
}
var styles = _reactNative.StyleSheet.create({
  messagebar: {
    width: 240,
    height: 48,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: colors.mediumTurquoise,
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
  someDragging: {
    pointerEvents: 'none',
  },
  messagebarMessage: {
    position: 'absolute',
    left: 24,
    right: 200,
    top: '50%',
    transform: [
      {
        translateY: -10,
      },
    ],
    color: colors.white,
    fontSize: (13 * 16) / 16,
    fontWeight: '400',
    lineHeight: 1.6 * ((13 * 16) / 16),
    letterSpacing: (0.3 * 16) / 16,
  },
  messagebarButton: {
    position: 'absolute',
    width: 88,
    top: 12,
    height: 24,
    color: colors.darkJungleGreen,
    backgroundColor: colors.white,
  },
  cancelButton: {
    right: 112,
  },
  reloadButton: {
    right: 12,
  },
  retryButton: {
    right: 12,
  },
})
