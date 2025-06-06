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
var CircleIcon = function CircleIcon(_ref) {
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
        d: 'M12,18 C15.3137085,18 18,15.3137085 18,12 C18,8.6862915 15.3137085,6 12,6 C8.6862915,6 6,8.6862915 6,12 C6,15.3137085 8.6862915,18 12,18 Z M12,20 C7.581722,20 4,16.418278 4,12 C4,7.581722 7.581722,4 12,4 C16.418278,4 20,7.581722 20,12 C20,16.418278 16.418278,20 12,20 Z',
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
      /*#__PURE__*/ _react.default.createElement(_reactNativeSvg.Use, {
        id: 'Oval',
        fill: '#383B41',
        fillRule: 'nonzero',
        xlinkHref: '#path-1',
      }),
    ),
    /*#__PURE__*/ _react.default.createElement(
      _reactNativeSvg.G,
      {
        id: 'icon/circle',
        fill: 'none',
        mask: 'url(#mask-2)',
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
      /*#__PURE__*/ _react.default.createElement(_reactNativeSvg.Use, {
        id: 'Oval',
        fill: '#383B41',
        fillRule: 'nonzero',
        xlinkHref: '#path-1',
      }),
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
var _default = (exports.default = CircleIcon)
