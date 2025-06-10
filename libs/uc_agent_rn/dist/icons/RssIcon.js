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
var _jsxRuntime = require('react/jsx-runtime')
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
var RssIcon = function RssIcon(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 24 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 24 : _ref$height,
    _ref$color = _ref.color,
    color = _ref$color === void 0 ? '#212121' : _ref$color,
    props = _objectWithoutProperties(_ref, _excluded)
  return /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
    _reactNativeSvg.default,
    _objectSpread(
      _objectSpread(
        {
          width: width,
          height: height,
          viewBox: '0 0 24 24',
        },
        props,
      ),
      {},
      {
        children: [
          /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNativeSvg.Defs, {
            children: [
              /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNativeSvg.Path, {
                id: 'path-1',
                d: 'M18.4,4 L5.6,4 C4.7187504,4 4,4.7187504 4,5.6 L4,18.4 C4,19.2812504 4.7187504,20 5.6,20 L18.4,20 C19.2812504,20 20,19.2812504 20,18.4 L20,5.6 C20,4.7187504 19.2812504,4 18.4,4 Z M7.6,17.6 C6.9375,17.6 6.4,17.0625 6.4,16.4 C6.4,15.7375 6.9375,15.2 7.6,15.2 C8.2625,15.2 8.8,15.7375 8.8,16.4 C8.8,17.0625 8.2625,17.6 7.6,17.6 Z M13.3875,17.6 L11.7187504,17.6 C11.8312504,17.2156248 11.9125,16.8187504 11.9125,16.4 C11.9125,14.0218752 9.9781248,12.0875 7.6,12.0875 C7.5031248,12.0875 7.4062504,12.0906248 7.3125,12.0968752 C6.9968752,12.1187504 6.6937504,12.1812504 6.4,12.2687504 L6.4,10.6187504 C6.6625,10.5625 6.9312504,10.5187504 7.2062504,10.5031248 C7.3375,10.4937504 7.4687504,10.4906248 7.6,10.4906248 C10.8593752,10.4906248 13.5125,13.1406248 13.5125,16.4 C13.5125,16.8125 13.4687504,17.2125 13.3875,17.6 Z M17.5218752,17.6 L15.9031248,17.6 C15.9593752,17.2062504 16,16.8093752 16,16.4 C16,11.7687504 12.2312504,8 7.6,8 C7.1906248,8 6.7937504,8.0406248 6.4,8.0968752 L6.4,6.4781248 C6.7937504,6.4312504 7.1937504,6.4 7.6,6.4 C13.1156248,6.4 17.6,10.8843752 17.6,16.4 C17.6,16.8062504 17.5687504,17.2062504 17.5218752,17.6 Z',
              }),
              /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNativeSvg.Mask, {
                id: 'mask-2',
                fill: 'white',
                children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                  _reactNativeSvg.Use,
                  {
                    xlinkHref: '#path-1',
                  },
                ),
              }),
              /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNativeSvg.Use, {
                xlinkHref: '#path-1',
              }),
              /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNativeSvg.Use, {
                id: 'Shape',
                fill: '#191919',
                fillRule: 'nonzero',
                xlinkHref: '#path-1',
              }),
            ],
          }),
          /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNativeSvg.G, {
            id: 'icon/rss',
            fill: 'none',
            mask: 'url(#mask-2)',
            fillRule: 'evenodd',
            stroke: 'none',
            strokeWidth: '1',
            children: [
              /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNativeSvg.Mask, {
                id: 'mask-2',
                fill: 'white',
                children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                  _reactNativeSvg.Use,
                  {
                    xlinkHref: '#path-1',
                  },
                ),
              }),
              /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNativeSvg.Use, {
                id: 'Shape',
                fill: '#191919',
                fillRule: 'nonzero',
                xlinkHref: '#path-1',
              }),
              /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNativeSvg.Rect, {
                id: 'Rectangle',
                x: '0',
                y: '0',
                width: '24',
                height: '24',
              }),
            ],
          }),
        ],
      },
    ),
  )
}
var _default = (exports.default = RssIcon)
