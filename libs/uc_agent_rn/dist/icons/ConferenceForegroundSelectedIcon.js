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
var ConferenceForegroundSelectedIcon =
  function ConferenceForegroundSelectedIcon(_ref) {
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
                  d: 'M12,8.66666665 C10.8958333,8.66666665 9.99999999,9.56249998 9.99999999,10.6666667 C9.99999999,11.7708333 10.8958333,12.6666667 12,12.6666667 C13.1041667,12.6666667 14,11.7708333 14,10.6666667 C14,9.56249998 13.1041667,8.66666665 12,8.66666665 Z M6.99999997,9.33333332 C6.0781253,9.33333332 5.33333329,10.0781253 5.33333329,11 C5.33333329,11.9218753 6.0781253,12.6666667 6.99999997,12.6666667 C7.92187531,12.6666667 8.66666665,11.9218753 8.66666665,11 C8.66666665,10.0781253 7.92187531,9.33333332 6.99999997,9.33333332 Z M17,9.33333332 C16.0781254,9.33333332 15.3333334,10.0781253 15.3333334,11 C15.3333334,11.9218753 16.0781254,12.6666667 17,12.6666667 C17.9218754,12.6666667 18.6666667,11.9218753 18.6666667,11 C18.6666667,10.0781253 17.9218754,9.33333332 17,9.33333332 Z M6.99999997,10.6666667 C7.18489597,10.6666667 7.3333333,10.815104 7.3333333,11 C7.3333333,11.184896 7.18489597,11.3333333 6.99999997,11.3333333 C6.81510397,11.3333333 6.66666663,11.184896 6.66666663,11 C6.66666663,10.815104 6.81510397,10.6666667 6.99999997,10.6666667 Z M17,10.6666667 C17.184896,10.6666667 17.3333334,10.815104 17.3333334,11 C17.3333334,11.184896 17.184896,11.3333333 17,11.3333333 C16.815104,11.3333333 16.6666667,11.184896 16.6666667,11 C16.6666667,10.815104 16.815104,10.6666667 17,10.6666667 Z M6.93749997,13.3333333 C4.58333329,13.3333333 3.99999995,15.3333334 3.99999995,15.3333334 L3.99999995,16.6666667 L7.99999997,16.6666667 L7.99999997,15.4375 L8.04166664,15.3333334 L5.45833329,15.3333334 C5.45833329,15.3333334 5.76041663,14.6666667 6.93749997,14.6666667 C7.66145864,14.6666667 7.94791664,14.9114587 8.12499998,15.1041667 C8.24479198,14.8489587 8.48697931,14.4192707 8.89583331,13.9791667 C8.44791664,13.625 7.82552064,13.3333333 6.93749997,13.3333333 Z M12,13.3333333 C9.46874998,13.3333333 8.66666665,15.5625 8.66666665,15.5625 L8.66666665,16.6666667 L15.3333334,16.6666667 L15.3333334,15.5625 C15.3333334,15.5625 14.53125,13.3333333 12,13.3333333 Z M17.0625,13.3333333 C16.1744794,13.3333333 15.5520834,13.625 15.1041667,13.9791667 C15.5130207,14.4192707 15.7552087,14.8489587 15.875,15.1041667 C16.0546874,14.9114587 16.338542,14.6666667 17.0625,14.6666667 C18.2395834,14.6666667 18.5416667,15.3333334 18.5416667,15.3333334 L15.9583334,15.3333334 L16,15.4375 L16,16.6666667 L20.0000001,16.6666667 L20.0000001,15.3333334 C20.0000001,15.3333334 19.4166667,13.3333333 17.0625,13.3333333 Z',
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
              id: 'icon/conference-foreground-selected',
              fill: 'none',
              fillRule: 'evenodd',
              stroke: 'none',
              strokeWidth: '1',
              children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                _reactNativeSvg.Mask,
                {
                  id: 'mask-2',
                  fill: 'white',
                  children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                    _reactNativeSvg.Use,
                    {
                      xlinkHref: '#path-1',
                    },
                  ),
                },
              ),
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNativeSvg.G, {
              id: 'colors/default/black',
              fill: color,
              mask: 'url(#mask-2)',
              children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                _reactNativeSvg.Rect,
                {
                  id: 'Rectangle',
                  x: '0',
                  y: '0',
                  width: '24',
                  height: '24',
                },
              ),
            }),
          ],
        },
      ),
    )
  }
var _default = (exports.default = ConferenceForegroundSelectedIcon)
