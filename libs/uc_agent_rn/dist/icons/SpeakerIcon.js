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
var SpeakerIcon = function SpeakerIcon(_ref) {
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
        d: 'M12,5.99999996 L7.99999997,9.99999999 L5.33333329,9.99999999 L5.33333329,14 L7.99999997,14 L12,18 L12,5.99999996 Z M13.3333333,6.06640623 L13.3333333,7.39973957 C15.4583334,7.71223957 17.1150714,9.43147785 17.313802,11.567708 C17.3270507,11.710124 17.3333334,11.8541667 17.3333334,12 C17.3333334,14.3333333 15.6,16.2669274 13.3333333,16.6002607 L13.3333333,17.933594 C16.3333334,17.6002607 18.6666667,15.0666667 18.6666667,12 C18.6666667,8.93333331 16.3333334,6.39973956 13.3333333,6.06640623 Z M13.3333333,8.73307291 L13.3333333,10.1328125 C14.1333333,10.3994792 14.6666667,11.1333333 14.6666667,12 C14.6666667,12.8666667 14.1333333,13.6005207 13.3333333,13.8671873 L13.3333333,15.2669274 C14.8666667,14.933594 16,13.6 16,12 C16,10.4 14.8666667,9.06640625 13.3333333,8.73307291 Z',
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
        id: 'icon/speaker',
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
var _default = (exports.default = SpeakerIcon)
