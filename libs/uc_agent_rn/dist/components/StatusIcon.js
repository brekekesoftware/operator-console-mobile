'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _reactNative = require('react-native')
var _reactNativeSvg = _interopRequireWildcard(require('react-native-svg'))
var _strings = require('../utilities/strings')
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
var colors = {
  statusAvailable: '#5fac3f',
  statusInvisible: '#bdbdbd',
  statusIdle: '#f3c915',
  statusBusy: '#ff4526',
  white: '#FFFFFF',
}
var styles = _reactNative.StyleSheet.create({
  container: {
    width: 12,
    height: 12,
  },
  baseStatusIcon: _objectSpread(
    {
      width: 12,
      height: 12,
    },
    _reactNative.Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  ),
})
var getStatusColor = function getStatusColor(status) {
  console.log('#Duy Phan console status', status)
  switch ((0, _strings.int)(status)) {
    case 1:
      return colors.statusAvailable
    case 2:
      return colors.statusIdle
    case 3:
      return colors.statusBusy
    default:
      return colors.statusInvisible
  }
}

/**
 * StatusIcon
 * props.style - Additional style for the icon
 * props.status - Status number
 * props.degree - Degree for conic gradient (if applicable)
 */
var _default = (exports.default = function _default(props) {
  // if (props.status === 32767) {
  //   return null
  // }

  var statusColor = getStatusColor(props.status)
  var degree = props.degree || 0
  var createConicGradientPath = function createConicGradientPath(degree) {
    var radius = 6
    var centerX = 6
    var centerY = 6
    if (degree >= 360) {
      return 'M '
        .concat(centerX, ' ')
        .concat(centerY, ' m -')
        .concat(radius, ' 0 a ')
        .concat(radius, ' ')
        .concat(radius, ' 0 1 0 ')
        .concat(radius * 2, ' 0 a ')
        .concat(radius, ' ')
        .concat(radius, ' 0 1 0 -')
        .concat(radius * 2, ' 0')
    }
    var angleInRadians = (degree - 90) * (Math.PI / 180)
    var endX = centerX + radius * Math.cos(angleInRadians)
    var endY = centerY + radius * Math.sin(angleInRadians)
    var path = 'M '.concat(centerX, ' ').concat(centerY, ' ')
    path += 'L '.concat(centerX, ' ').concat(centerY - radius, ' ')
    if (degree > 0) {
      path += 'A '
        .concat(radius, ' ')
        .concat(radius, ' 0 ')
        .concat(degree > 180 ? 1 : 0, ' 1 ')
        .concat(endX, ' ')
        .concat(endY, ' ')
    }
    path += 'Z'
    return path
  }
  return /*#__PURE__*/ React.createElement(
    _reactNative.View,
    {
      style: [styles.container, props.style],
    },
    /*#__PURE__*/ React.createElement(
      _reactNativeSvg.default,
      {
        width: '12',
        height: '12',
        style: styles.baseStatusIcon,
      },
      /*#__PURE__*/ React.createElement(_reactNativeSvg.Circle, {
        cx: '6',
        cy: '6',
        r: '5',
        fill: statusColor,
        stroke: statusColor,
        strokeWidth: '2',
      }),
      props.degree &&
        /*#__PURE__*/ React.createElement(_reactNativeSvg.Path, {
          d: createConicGradientPath(degree),
          fill: colors.white,
          fillOpacity: 0.5,
        }),
    ),
  )
})
