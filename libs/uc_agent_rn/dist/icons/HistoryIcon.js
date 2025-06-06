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
var _reactNativeSvg = _interopRequireWildcard(require('react-native-svg'))
var _excluded = ['width', 'height', 'color']
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
function _objectWithoutProperties(e, t) {
  if (null == e) return {}
  var o,
    r,
    i = _objectWithoutPropertiesLoose(e, t)
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e)
    for (r = 0; r < n.length; r++)
      (o = n[r]),
        -1 === t.indexOf(o) &&
          {}.propertyIsEnumerable.call(e, o) &&
          (i[o] = e[o])
  }
  return i
}
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {}
  var t = {}
  for (var n in r)
    if ({}.hasOwnProperty.call(r, n)) {
      if (-1 !== e.indexOf(n)) continue
      t[n] = r[n]
    }
  return t
}
var HistoryIcon = function HistoryIcon(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 24 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 24 : _ref$height,
    _ref$color = _ref.color,
    color = _ref$color === void 0 ? '#212121' : _ref$color,
    props = _objectWithoutProperties(_ref, _excluded)
  return /*#__PURE__*/ _react.default.createElement(
    _reactNativeSvg.default,
    _extends(
      {
        width: width,
        height: height,
        viewBox: '0 0 24 24',
      },
      props,
    ),
    /*#__PURE__*/ _react.default.createElement(
      _reactNativeSvg.Defs,
      null,
      /*#__PURE__*/ _react.default.createElement(_reactNativeSvg.Path, {
        id: 'path-1',
        d: 'M6.66666663,5.33333329 L6.66666663,14.6666667 L7.99999997,14.6666667 L7.99999997,6.66666663 L16.6666667,6.66666663 L16.6666667,10.6666667 L18,10.6666667 L18,5.33333329 L6.66666663,5.33333329 Z M9.33333332,8.66666665 L9.33333332,9.99999999 L10.6666667,9.99999999 L10.6666667,8.66666665 L9.33333332,8.66666665 Z M11.3333333,8.66666665 L11.3333333,9.99999999 L15.3333334,9.99999999 L15.3333334,8.66666665 L11.3333333,8.66666665 Z M9.33333332,12 L9.33333332,13.3333333 L10.6666667,13.3333333 L10.6666667,12 L9.33333332,12 Z M13.466146,12 C13,12 12.6666667,12.3333333 12.6666667,12.7994793 L12.6666667,13.3333333 L13.3333333,13.3333333 C13.5989587,14.7343754 14.466146,15.5989587 15,16.065104 C14.466146,16.533854 13.6666667,17.466146 13.3984373,18.6666667 L12.6666667,18.6666667 L12.6666667,19.2005207 C12.6666667,19.6666667 13,20.0000001 13.466146,20.0000001 L19.2005207,20.0000001 C19.6666667,20.0000001 20,19.6666667 20,19.2005207 L20,18.6666667 L19.3333334,18.6666667 C19,17.466146 18.2005207,16.533854 17.6666667,16.065104 C18.2005207,15.5989587 19.0677087,14.7343754 19.3333334,13.3333333 L20,13.3333333 L20,12.7994793 C20,12.3333333 19.6666667,12 19.2005207,12 L13.466146,12 Z M14.1328127,13.3333333 L18.533854,13.3333333 C18.1328127,14.932292 17,15.6666667 16.934896,15.6666667 C16.934896,15.6666667 16.401042,16 16.8671874,16.3333334 C17.2682294,16.6666667 18.2005207,17.401042 18.466146,18.6666667 L17.934896,18.6666667 C17.466146,18 16.7994794,17.3333334 16.3333334,17.3333334 C15.8671874,17.3333334 15.2005207,18 14.7317707,18.6666667 L14.2005207,18.6666667 C14.533854,17.401042 15.3984374,16.6666667 15.7994794,16.3333334 C16.2656254,16 15.7317707,15.6666667 15.7317707,15.6666667 C15.6666667,15.6666667 14.533854,14.932292 14.1328127,13.3333333 Z M15.533854,14 C15.533854,14.3333333 16,15.2005207 16.3333334,15.2005207 C16.6666667,15.2005207 17.1328127,14.3333333 17.1328127,14 L15.533854,14 Z M5.33333329,15.3333334 L5.33333329,17.3333334 C5.33333329,18.0677087 5.93229196,18.6666667 6.66666663,18.6666667 L12,18.6666667 C12.0625,18.125 12.4427087,17.3333334 12.4427087,17.3333334 C12.65625,16.8515627 12.9166667,16.434896 13.1770833,16.091146 C13.0078127,15.872396 12.838542,15.6145834 12.6770833,15.3333334 L5.33333329,15.3333334 Z',
      }),
      /*#__PURE__*/ _react.default.createElement(
        _reactNativeSvg.Mask,
        {
          id: 'mask-2',
          fill: 'white',
        },
        /*#__PURE__*/ _react.default.createElement(_reactNativeSvg.Use, {
          xlinkHref: '#path-1',
        }),
      ),
      /*#__PURE__*/ _react.default.createElement(_reactNativeSvg.Use, {
        xlinkHref: '#path-1',
      }),
    ),
    /*#__PURE__*/ _react.default.createElement(
      _reactNativeSvg.G,
      {
        id: 'icon/history',
        fill: 'none',
        fillRule: 'evenodd',
        stroke: 'none',
        strokeWidth: '1',
      },
      /*#__PURE__*/ _react.default.createElement(
        _reactNativeSvg.Mask,
        {
          id: 'mask-2',
          fill: 'white',
        },
        /*#__PURE__*/ _react.default.createElement(_reactNativeSvg.Use, {
          xlinkHref: '#path-1',
        }),
      ),
    ),
    /*#__PURE__*/ _react.default.createElement(
      _reactNativeSvg.G,
      {
        id: 'colors/default/black',
        fill: color,
        mask: 'url(#mask-2)',
      },
      /*#__PURE__*/ _react.default.createElement(_reactNativeSvg.Rect, {
        id: 'Rectangle',
        x: '0',
        y: '0',
        width: '24',
        height: '24',
      }),
    ),
  )
}
var _default = (exports.default = HistoryIcon)
