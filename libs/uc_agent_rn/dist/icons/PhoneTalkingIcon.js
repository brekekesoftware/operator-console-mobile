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
var PhoneTalkingIcon = function PhoneTalkingIcon(_ref) {
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
                d: 'M14.3486667,17.3253333 C13.9286667,17.3153333 13.4,17.2906667 13.066,17.232 C12.7046667,17.168 12.27,17.044 11.964,16.9486667 C11.724,16.874 11.4626667,16.94 11.2846667,17.1173333 L9.8066667,18.5866667 C8.7853333,18.0486667 7.9673333,17.422 7.2746667,16.7253333 C6.57799998,16.0326667 5.95133331,15.2146667 5.41333331,14.1933333 L6.88266665,12.71466665 C7.06,12.53666665 7.126,12.27533332 7.0513333,12.03533331 C6.95666665,11.72999998 6.83199999,11.29533331 6.76866665,10.93399997 C6.70933332,10.59999997 6.68533332,10.0713333 6.67466665,9.6513333 C6.66599999,9.28799996 6.36999998,8.99999996 6.00666665,8.99999996 L3.66666663,8.99999996 C3.37466663,8.99999996 2.99999996,9.21866663 2.99999996,9.66666663 C2.99999996,12.69266665 4.22666664,15.5826667 6.31066665,17.6893334 C8.4173333,19.7733334 11.3073333,21 14.3333334,21 C14.7813334,21 15,20.6253334 15,20.3333334 L15,17.9933334 C15,17.63 14.712,17.334 14.3486667,17.3253333 Z M10.6,14.6 C9.9375,14.6 9.4,14.0625 9.4,13.4 C9.4,12.7375 9.9375,12.2 10.6,12.2 C11.2625,12.2 11.8,12.7375 11.8,13.4 C11.8,14.0625 11.2625,14.6 10.6,14.6 Z M16.3875,14.6 L14.7187504,14.6 C14.8312504,14.2156248 14.9125,13.8187504 14.9125,13.4 C14.9125,11.0218752 12.9781248,9.0875 10.6,9.0875 C10.5031248,9.0875 10.4062504,9.0906248 10.3125,9.0968752 C9.9968752,9.1187504 9.6937504,9.1812504 9.4,9.2687504 L9.4,7.6187504 C9.6625,7.5625 9.9312504,7.5187504 10.2062504,7.5031248 C10.3375,7.4937504 10.4687504,7.4906248 10.6,7.4906248 C13.8593752,7.4906248 16.5125,10.1406248 16.5125,13.4 C16.5125,13.8125 16.4687504,14.2125 16.3875,14.6 Z M20.5218752,14.6 L18.9031248,14.6 C18.9593752,14.2062504 19,13.8093752 19,13.4 C19,8.7687504 15.2312504,5 10.6,5 C10.1906248,5 9.7937504,5.0406248 9.4,5.0968752 L9.4,3.4781248 C9.7937504,3.4312504 10.1937504,3.4 10.6,3.4 C16.1156248,3.4 20.6,7.8843752 20.6,13.4 C20.6,13.8062504 20.5687504,14.2062504 20.5218752,14.6 Z',
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
            id: 'icon/phone',
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
var _default = (exports.default = PhoneTalkingIcon)
