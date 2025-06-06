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
var InternetIcon = function InternetIcon(_ref) {
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
        d: 'M7.3333333,5.99999996 C6.59666663,5.99999996 5.99999996,6.59666663 5.99999996,7.3333333 L5.99999996,9.99999999 L5.99999996,16.6666667 C5.99999996,17.402 6.59799997,18 7.3333333,18 L11.058594,18 C10.8879273,17.5793334 10.7702393,17.1326667 10.7122393,16.6666667 L7.3333333,16.6666667 L7.3333333,9.99999999 L16.6666667,9.99999999 L16.6666667,10.7122393 C17.1326667,10.7702393 17.5793334,10.8879273 18,11.058594 L18,9.33333332 L18,7.3333333 C18,6.59666663 17.4033334,5.99999996 16.6666667,5.99999996 L7.3333333,5.99999996 Z M7.99999997,7.3333333 C8.36799998,7.3333333 8.66666665,7.63199997 8.66666665,7.99999997 C8.66666665,8.36799998 8.36799998,8.66666665 7.99999997,8.66666665 C7.63199997,8.66666665 7.3333333,8.36799998 7.3333333,7.99999997 C7.3333333,7.63199997 7.63199997,7.3333333 7.99999997,7.3333333 Z M9.99999999,7.3333333 C10.368,7.3333333 10.6666667,7.63199997 10.6666667,7.99999997 C10.6666667,8.36799998 10.368,8.66666665 9.99999999,8.66666665 C9.63199999,8.66666665 9.33333332,8.36799998 9.33333332,7.99999997 C9.33333332,7.63199997 9.63199999,7.3333333 9.99999999,7.3333333 Z M12,7.3333333 L16.6666667,7.3333333 L16.6666667,8.66666665 L12,8.66666665 L12,7.3333333 Z M16,12 C13.7987573,12 12,13.7987573 12,16 C12,18.2012427 13.7987573,20.0000001 16,20.0000001 C18.2012427,20.0000001 20.0000001,18.2012427 20.0000001,16 C20.0000001,13.7987573 18.2012427,12 16,12 Z M16.6497394,13.4205727 C17.81085,13.709584 18.6666667,14.7451547 18.6666667,16 C18.6666667,16.699406 18.3949487,17.326808 17.9596354,17.8007814 C17.873716,17.53192 17.630578,17.3333334 17.3333334,17.3333334 L17.3333334,16.6666667 C17.3333334,16.2986667 17.0346667,16 16.6666667,16 L15.3333334,16 L15.3333334,15.3333334 C15.7013334,15.3333334 16,15.0346667 16,14.6666667 L16,14 C16.3370667,14 16.605234,13.7454793 16.6497394,13.4205727 Z M13.403646,15.403646 L14,16 L14.6666667,16.6666667 L14.6666667,17.3333334 C14.6666667,17.7013334 14.9653334,18 15.3333334,18 L15.407552,18 L15.407552,18.596354 C14.2166107,18.3283487 13.3333333,17.2758667 13.3333333,16 C13.3333333,15.7938967 13.36009,15.5959274 13.403646,15.403646 Z',
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
        id: 'icon/internet',
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
var _default = (exports.default = InternetIcon)
