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
var _strings = require('../utilities/strings')
var _reactNative = require('react-native')
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
/**
 * TimerSpan
 * props.baseTime
 */
var _default = (exports.default = /*#__PURE__*/ (function (_React$Component) {
  function _default(props) {
    var _this
    _classCallCheck(this, _default)
    _this = _callSuper(this, _default, [props])
    _this.state = {
      now: +new Date(),
    }
    _this.interval = null
    _this.delay = 500
    return _this
  }
  _inherits(_default, _React$Component)
  return _createClass(_default, [
    {
      key: 'tick',
      value: function tick() {
        var props = this.props
        var now = +new Date()
        this.setState({
          now: now,
        })
        var time = now - props.baseTime
        if (time >= 60000 && this.delay < 30000) {
          this.delay = 30000
          clearInterval(this.interval)
          this.interval = setInterval(this.tick.bind(this), this.delay)
        }
      },
    },
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var props = this.props
        this.interval = setInterval(this.tick.bind(this), this.delay)
      },
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        var props = this.props
        clearInterval(this.interval)
      },
    },
    {
      key: 'render',
      value: function render() {
        var props = this.props
        var time = this.state.now - props.baseTime
        var output = ''
        if (time >= 86400000) {
          var baseTimeDate = new Date(props.baseTime)
          var year = baseTimeDate.getFullYear()
          var monthNum = baseTimeDate.getMonth() + 1
          var day = baseTimeDate.getDate()
          output = (0, _strings.formatStr)(
            _uawmsgs.default.CMN_FORMAT_DATE,
            year,
            monthNum,
            day,
            _uawmsgs.default['CMN_MONTH_STR_' + ('0' + monthNum).slice(-2)],
          )
        } else if (time >= 3600000) {
          var hour = (0, _strings.int)(time / 3600000)
          output = (0, _strings.formatStr)(
            _uawmsgs.default.CMN_FORMAT_HOURS_AGO,
            hour,
          )
        } else if (time >= 60000) {
          var min = (0, _strings.int)(time / 60000)
          output = (0, _strings.formatStr)(
            _uawmsgs.default.CMN_FORMAT_MINUTES_AGO,
            min,
          )
        } else {
          var _min = (0, _strings.int)(time / 60000)
          var sec = (0, _strings.int)(time / 1000) % 60
          output = ('0' + _min).slice(-2) + ':' + ('0' + sec).slice(-2)
        }
        return /*#__PURE__*/ _react.default.createElement(
          _reactNative.Text,
          {
            title: (0, _strings.formatMessageDateTime)(props.baseTime),
          },
          output,
        )
      },
    },
  ])
})(_react.default.Component))
