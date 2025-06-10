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
var KeypadIcon = function KeypadIcon(_ref) {
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
                d: 'M7.3333333,6.66666663 C6.9653333,6.66666663 6.66666663,6.9653333 6.66666663,7.3333333 L6.66666663,7.99999997 C6.66666663,8.36799998 6.9653333,8.66666665 7.3333333,8.66666665 L8.66666665,8.66666665 C9.03466665,8.66666665 9.33333332,8.36799998 9.33333332,7.99999997 L9.33333332,7.3333333 C9.33333332,6.9653333 9.03466665,6.66666663 8.66666665,6.66666663 L7.3333333,6.66666663 Z M11.3333333,6.66666663 C10.9653333,6.66666663 10.6666667,6.9653333 10.6666667,7.3333333 L10.6666667,7.99999997 C10.6666667,8.36799998 10.9653333,8.66666665 11.3333333,8.66666665 L12.6666667,8.66666665 C13.0346667,8.66666665 13.3333333,8.36799998 13.3333333,7.99999997 L13.3333333,7.3333333 C13.3333333,6.9653333 13.0346667,6.66666663 12.6666667,6.66666663 L11.3333333,6.66666663 Z M15.3333334,6.66666663 C14.9653334,6.66666663 14.6666667,6.9653333 14.6666667,7.3333333 L14.6666667,7.99999997 C14.6666667,8.36799998 14.9653334,8.66666665 15.3333334,8.66666665 L16.6666667,8.66666665 C17.0346667,8.66666665 17.3333334,8.36799998 17.3333334,7.99999997 L17.3333334,7.3333333 C17.3333334,6.9653333 17.0346667,6.66666663 16.6666667,6.66666663 L15.3333334,6.66666663 Z M7.3333333,9.99999999 C6.9653333,9.99999999 6.66666663,10.2986667 6.66666663,10.6666667 L6.66666663,11.3333333 C6.66666663,11.7013333 6.9653333,12 7.3333333,12 L8.66666665,12 C9.03466665,12 9.33333332,11.7013333 9.33333332,11.3333333 L9.33333332,10.6666667 C9.33333332,10.2986667 9.03466665,9.99999999 8.66666665,9.99999999 L7.3333333,9.99999999 Z M11.3333333,9.99999999 C10.9653333,9.99999999 10.6666667,10.2986667 10.6666667,10.6666667 L10.6666667,11.3333333 C10.6666667,11.7013333 10.9653333,12 11.3333333,12 L12.6666667,12 C13.0346667,12 13.3333333,11.7013333 13.3333333,11.3333333 L13.3333333,10.6666667 C13.3333333,10.2986667 13.0346667,9.99999999 12.6666667,9.99999999 L11.3333333,9.99999999 Z M15.3333334,9.99999999 C14.9653334,9.99999999 14.6666667,10.2986667 14.6666667,10.6666667 L14.6666667,11.3333333 C14.6666667,11.7013333 14.9653334,12 15.3333334,12 L16.6666667,12 C17.0346667,12 17.3333334,11.7013333 17.3333334,11.3333333 L17.3333334,10.6666667 C17.3333334,10.2986667 17.0346667,9.99999999 16.6666667,9.99999999 L15.3333334,9.99999999 Z M7.3333333,13.3333333 C6.9653333,13.3333333 6.66666663,13.632 6.66666663,14 L6.66666663,14.6666667 C6.66666663,15.0346667 6.9653333,15.3333334 7.3333333,15.3333334 L8.66666665,15.3333334 C9.03466665,15.3333334 9.33333332,15.0346667 9.33333332,14.6666667 L9.33333332,14 C9.33333332,13.632 9.03466665,13.3333333 8.66666665,13.3333333 L7.3333333,13.3333333 Z M11.3333333,13.3333333 C10.9653333,13.3333333 10.6666667,13.632 10.6666667,14 L10.6666667,14.6666667 C10.6666667,15.0346667 10.9653333,15.3333334 11.3333333,15.3333334 L12.6666667,15.3333334 C13.0346667,15.3333334 13.3333333,15.0346667 13.3333333,14.6666667 L13.3333333,14 C13.3333333,13.632 13.0346667,13.3333333 12.6666667,13.3333333 L11.3333333,13.3333333 Z M15.3333334,13.3333333 C14.9653334,13.3333333 14.6666667,13.632 14.6666667,14 L14.6666667,14.6666667 C14.6666667,15.0346667 14.9653334,15.3333334 15.3333334,15.3333334 L16.6666667,15.3333334 C17.0346667,15.3333334 17.3333334,15.0346667 17.3333334,14.6666667 L17.3333334,14 C17.3333334,13.632 17.0346667,13.3333333 16.6666667,13.3333333 L15.3333334,13.3333333 Z M11.3333333,16.6666667 C10.9653333,16.6666667 10.6666667,16.9653334 10.6666667,17.3333334 L10.6666667,18 C10.6666667,18.368 10.9653333,18.6666667 11.3333333,18.6666667 L12.6666667,18.6666667 C13.0346667,18.6666667 13.3333333,18.368 13.3333333,18 L13.3333333,17.3333334 C13.3333333,16.9653334 13.0346667,16.6666667 12.6666667,16.6666667 L11.3333333,16.6666667 Z',
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
            id: 'icon/keypad',
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
var _default = (exports.default = KeypadIcon)
