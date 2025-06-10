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
var CostIcon = function CostIcon(_ref) {
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
                d: 'M18.8625,4.00960023 C18.7467654,3.99259869 18.6260394,3.99766119 18.5056644,4.02893619 L4.79121096,7.60081119 L11.9349606,7.60081119 L17.2962894,6.20510811 C17.5239894,6.53990802 17.8888692,6.75535965 18.2929692,6.79045965 L18.5056644,7.60081119 L20.3654298,7.60081119 L19.6025394,4.6740534 C19.5087144,4.3136034 19.2097029,4.06060494 18.8625,4.00960023 Z M3.9,9.40081119 C3.40296431,9.40086089 3.0000497,9.80377551 3,10.3008112 L3,19.3008112 C3.0000497,19.7978469 3.40296431,20.2007615 3.9,20.2008112 L20.1,20.2008112 C20.5970357,20.2007615 20.9999503,19.7978469 21,19.3008112 L21,10.3008112 C20.9999503,9.80377551 20.5970357,9.40086089 20.1,9.40081119 L3.9,9.40081119 Z M5.62089846,11.2008112 L18.3791019,11.2008112 C18.5151012,11.5841342 18.816677,11.88571 19.2,12.0217093 L19.2,17.5799131 C18.816677,17.7159124 18.5151012,18.0174882 18.3791019,18.4008112 L5.62089846,18.4008112 C5.48489904,18.0174881 5.18332317,17.7159123 4.8,17.5799131 L4.8,12.0217093 C5.18332317,11.88571 5.48489904,11.5841343 5.62089846,11.2008112 Z M12,12.1008112 C10.5088312,12.1008112 9.3,13.3096424 9.3,14.8008112 C9.3,16.29198 10.5088312,17.5008112 12,17.5008112 C13.4911688,17.5008112 14.7,16.29198 14.7,14.8008112 C14.7,13.3096424 13.4911688,12.1008112 12,12.1008112 Z M7.5,13.9008112 C7.0032,13.9008112 6.6,14.3031112 6.6,14.8008112 C6.6,15.2985112 7.0032,15.7008112 7.5,15.7008112 C7.9968,15.7008112 8.4,15.2985112 8.4,14.8008112 C8.4,14.3031112 7.9968,13.9008112 7.5,13.9008112 Z M16.5,13.9008112 C16.0032,13.9008112 15.6,14.3031112 15.6,14.8008112 C15.6,15.2985112 16.0032,15.7008112 16.5,15.7008112 C16.9968,15.7008112 17.4,15.2985112 17.4,14.8008112 C17.4,14.3031112 16.9968,13.9008112 16.5,13.9008112 Z',
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
            id: 'icon/cost',
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
var _default = (exports.default = CostIcon)
