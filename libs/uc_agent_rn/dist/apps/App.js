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
var _WidgetBody = _interopRequireDefault(require('../components/WidgetBody'))
var _MainArea = _interopRequireDefault(require('../components/MainArea'))
var _WebchatQueueButton = _interopRequireDefault(
  require('../components/WebchatQueueButton'),
)
var _WebchatPickupButton = _interopRequireDefault(
  require('../components/WebchatPickupButton'),
)
var _WebchatDropButton = _interopRequireDefault(
  require('../components/WebchatDropButton'),
)
var _BuddylistButton = _interopRequireDefault(
  require('../components/BuddylistButton'),
)
var _Toolbar = _interopRequireDefault(require('../components/Toolbar'))
var _reactNative = require('react-native')
var _RnAudioPlayer = require('../components/RnAudioPlayer')
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
 * App
 * props.uiData
 */
var App = /*#__PURE__*/ (function (_React$Component) {
  function App() {
    _classCallCheck(this, App)
    return _callSuper(this, App, arguments)
  }
  _inherits(App, _React$Component)
  return _createClass(App, [
    {
      key: 'render',
      value: function render() {
        var props = this.props
        return /*#__PURE__*/ _react.default.createElement(
          _reactNative.View,
          {
            style: {
              flex: 1,
            },
          },
          /*#__PURE__*/ _react.default.createElement(
            _WidgetBody.default,
            {
              uiData: props.uiData,
              modalOverlayClassName: 'brUCAgentApp',
            },
            /*#__PURE__*/ _react.default.createElement(
              _RnAudioPlayer.RnAudioPlayer,
              {
                source: sound,
              },
            ),
            /*#__PURE__*/ _react.default.createElement(_MainArea.default, {
              className: 'brWithToolbar',
              uiData: props.uiData,
            }),
            /*#__PURE__*/ _react.default.createElement(
              _Toolbar.default,
              null,
              /*#__PURE__*/ _react.default.createElement(
                _WebchatQueueButton.default,
                {
                  uiData: props.uiData,
                  disabled: false,
                },
              ),
              /*#__PURE__*/ _react.default.createElement(
                _WebchatPickupButton.default,
                {
                  uiData: props.uiData,
                  disabled: false,
                },
              ),
              /*#__PURE__*/ _react.default.createElement(
                _WebchatDropButton.default,
                {
                  uiData: props.uiData,
                  disabled: false,
                },
              ),
              /*#__PURE__*/ _react.default.createElement(
                _BuddylistButton.default,
                {
                  uiData: props.uiData,
                  disabled: false,
                },
              ),
            ),
          ),
        )
      },
    },
  ])
})(_react.default.Component)
var _default = (exports.default = App)
