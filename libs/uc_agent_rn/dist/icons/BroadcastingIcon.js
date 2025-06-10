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
var BroadcastingIcon = function BroadcastingIcon(_ref) {
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
                d: 'M12,5.33333329 C10.8958333,5.33333329 9.99999999,6.22916663 9.99999999,7.3333333 C9.99999999,8.43749998 10.8958333,9.33333332 12,9.33333332 C13.1041667,9.33333332 14,8.43749998 14,7.3333333 C14,6.22916663 13.1041667,5.33333329 12,5.33333329 Z M9.99999999,9.99999999 C7.78385397,9.99999999 5.99999996,11.783854 5.99999996,14 L5.99999996,15.3333334 L7.3333333,15.3333334 L7.3333333,14 C7.3333333,12.6796873 8.21093731,11.6432293 9.43749998,11.3958333 C9.37499998,11.588542 9.33333332,11.7864587 9.33333332,12 L9.33333332,15.3333334 L10.6666667,15.3333334 L10.6666667,12 C10.6666667,11.6302087 10.963542,11.3333333 11.3333333,11.3333333 L12.6666667,11.3333333 C13.0364587,11.3333333 13.3333333,11.6302087 13.3333333,12 L13.3333333,15.3333334 L14.6666667,15.3333334 L14.6666667,12 C14.6666667,11.7864587 14.625,11.588542 14.5625,11.3958333 C15.7890627,11.6432293 16.6666667,12.6796873 16.6666667,14 L16.6666667,15.3333334 L18,15.3333334 L18,14 C18,11.783854 16.216146,9.99999999 14,9.99999999 L9.99999999,9.99999999 Z M6.66666663,16 C5.9296873,16 5.33333329,16.596354 5.33333329,17.3333334 C5.33333329,18.0703127 5.9296873,18.6666667 6.66666663,18.6666667 C7.40364597,18.6666667 7.99999997,18.0703127 7.99999997,17.3333334 C7.99999997,16.596354 7.40364597,16 6.66666663,16 Z M9.99999999,16 C9.26302065,16 8.66666665,16.596354 8.66666665,17.3333334 C8.66666665,18.0703127 9.26302065,18.6666667 9.99999999,18.6666667 C10.7369793,18.6666667 11.3333333,18.0703127 11.3333333,17.3333334 C11.3333333,16.596354 10.7369793,16 9.99999999,16 Z M14,16 C13.2630207,16 12.6666667,16.596354 12.6666667,17.3333334 C12.6666667,18.0703127 13.2630207,18.6666667 14,18.6666667 C14.7369794,18.6666667 15.3333334,18.0703127 15.3333334,17.3333334 C15.3333334,16.596354 14.7369794,16 14,16 Z M17.3333334,16 C16.596354,16 16,16.596354 16,17.3333334 C16,18.0703127 16.596354,18.6666667 17.3333334,18.6666667 C18.0703127,18.6666667 18.6666667,18.0703127 18.6666667,17.3333334 C18.6666667,16.596354 18.0703127,16 17.3333334,16 Z',
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
            id: 'icon/broadcasting',
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
var _default = (exports.default = BroadcastingIcon)
