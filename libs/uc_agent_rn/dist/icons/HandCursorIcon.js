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
var HandCursorIcon = function HandCursorIcon(_ref) {
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
                d: 'M10.5,4.99999996 C9.67773449,4.99999996 8.99999998,5.67773446 8.99999998,6.49999997 L8.99999998,12.40625 L8.67187498,12.0625 L8.54687498,11.953125 C7.97070297,11.376953 7.02929697,11.376953 6.45312497,11.953125 C5.87695296,12.529297 5.87695296,13.470703 6.45312497,14.046875 L6.45312497,14.0625 L10.546875,18.109375 L10.578125,18.125 L10.59375,18.15625 C11.267578,18.6621095 12.126953,19 13.09375,19 L13.953125,19 C16.220703,19 18.046875,17.173828 18.046875,14.90625 L18.046875,11 C18.046875,10.1777345 17.3691405,9.49999998 16.546875,9.49999998 C16.3339845,9.49999998 16.136719,9.55859398 15.953125,9.64062499 C15.7890625,8.99023448 15.1972655,8.49999998 14.5,8.49999998 C14.1171875,8.49999998 13.765625,8.65039048 13.5,8.89062498 C13.234375,8.65039048 12.8828125,8.49999998 12.5,8.49999998 C12.324219,8.49999998 12.158203,8.53710948 12,8.59374998 L12,6.49999997 C12,5.67773446 11.3222655,4.99999996 10.5,4.99999996 Z M10.5,5.99999996 C10.777344,5.99999996 11,6.22265646 11,6.49999997 L11,12 L12,12 L12,9.99999999 C12,9.72265649 12.2226565,9.49999998 12.5,9.49999998 C12.777344,9.49999998 13,9.72265649 13,9.99999999 L13,12 L14,12 L14,9.99999999 C14,9.72265649 14.2226565,9.49999998 14.5,9.49999998 C14.777344,9.49999998 15,9.72265649 15,9.99999999 L15,12 L16.046875,12 L16.046875,11 C16.046875,10.7226565 16.2695315,10.5 16.546875,10.5 C16.824219,10.5 17.046875,10.7226565 17.046875,11 L17.046875,14.90625 C17.046875,16.638672 15.685547,18 13.953125,18 L13.09375,18 C12.361328,18 11.7285155,17.7382815 11.203125,17.34375 L7.15624997,13.34375 C6.93359397,13.121094 6.93359397,12.8789065 7.15624997,12.65625 C7.37890647,12.433594 7.62109397,12.433594 7.84374997,12.65625 L9.99999999,14.8125 L9.99999999,6.49999997 C9.99999999,6.22265646 10.2226565,5.99999996 10.5,5.99999996 Z',
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
            ],
          }),
          /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNativeSvg.G, {
            id: 'icon/hand-cursor',
            fill: 'none',
            fillRule: 'evenodd',
            stroke: 'none',
            strokeWidth: '1',
            children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNativeSvg.Mask, {
              id: 'mask-2',
              fill: 'white',
              children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                _reactNativeSvg.Use,
                {
                  xlinkHref: '#path-1',
                },
              ),
            }),
          }),
          /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNativeSvg.G, {
            id: 'colors/default/black',
            fill: color,
            mask: 'url(#mask-2)',
            children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNativeSvg.Rect, {
              id: 'Rectangle',
              x: '0',
              y: '0',
              width: '24',
              height: '24',
            }),
          }),
        ],
      },
    ),
  )
}
var _default = (exports.default = HandCursorIcon)
