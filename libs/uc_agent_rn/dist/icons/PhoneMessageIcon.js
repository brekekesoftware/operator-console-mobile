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
var PhoneMessageIcon = function PhoneMessageIcon(_ref) {
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
                d: 'M6.66666663,5.99999996 C6.26666663,5.99999996 5.99999996,6.26666663 5.99999996,6.66666663 L5.99999996,7.99999997 C5.99999996,12.7326667 11.9606667,18 16,18 L17.3333334,18 C17.7333334,18 18,17.7333334 18,17.3333334 L18,14.6666667 C18,14.2666667 17.7333334,14 17.3333334,14 L14.6666667,14 L12.9596353,15.7070314 C11.1429687,14.687698 9.33340625,12.9707393 8.27473958,11.1080727 C8.27340624,11.095406 8.26692704,11.078406 8.26692704,11.066406 L9.99999999,9.33333332 L9.99999999,6.66666663 C9.99999999,6.26666663 9.73333332,5.99999996 9.33333332,5.99999996 L6.66666663,5.99999996 Z M12.6666667,5.99999996 C12.3,5.99999996 12,6.29999996 12,6.66666663 L12,12 L13.3333333,10.6666667 L17.3333334,10.6666667 C17.7,10.6666667 18,10.3666667 18,9.99999999 L18,6.66666663 C18,6.29999996 17.7,5.99999996 17.3333334,5.99999996 L12.6666667,5.99999996 Z',
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
            id: 'icon/phone-message',
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
var _default = (exports.default = PhoneMessageIcon)
