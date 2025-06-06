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
var _reactNativeSvg = _interopRequireWildcard(require('react-native-svg'))
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
var RadioCheckboxUncheckedIcon = function RadioCheckboxUncheckedIcon(_ref) {
  var _ref$size = _ref.size,
    size = _ref$size === void 0 ? 24 : _ref$size,
    _ref$color = _ref.color,
    color = _ref$color === void 0 ? '#757575' : _ref$color
  return /*#__PURE__*/ _react.default.createElement(
    _reactNative.View,
    {
      style: {
        width: size,
        height: size,
      },
    },
    /*#__PURE__*/ _react.default.createElement(
      _reactNativeSvg.default,
      {
        width: size,
        height: size,
        viewBox: '0 0 24 24',
        fill: 'none',
      },
      /*#__PURE__*/ _react.default.createElement(_reactNativeSvg.Circle, {
        cx: '12',
        cy: '12',
        r: '10',
        stroke: color,
        strokeWidth: '2',
      }),
    ),
  )
}
var _default = (exports.default = RadioCheckboxUncheckedIcon)
