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
var _reactNative = require('react-native')
var _reactNativeSound = _interopRequireDefault(require('react-native-sound'))
var _jsxRuntime = require('react/jsx-runtime')
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e }
}
function _classCallCheck(a, n) {
  if (!(a instanceof n))
    throw new TypeError('Cannot call a class as a function')
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t]
    ;(o.enumerable = o.enumerable || !1),
      (o.configurable = !0),
      'value' in o && (o.writable = !0),
      Object.defineProperty(e, _toPropertyKey(o.key), o)
  }
}
function _createClass(e, r, t) {
  return (
    r && _defineProperties(e.prototype, r),
    t && _defineProperties(e, t),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
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
function _callSuper(t, o, e) {
  return (
    (o = _getPrototypeOf(o)),
    _possibleConstructorReturn(
      t,
      _isNativeReflectConstruct()
        ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor)
        : o.apply(t, e),
    )
  )
}
function _possibleConstructorReturn(t, e) {
  if (e && ('object' == _typeof(e) || 'function' == typeof e)) return e
  if (void 0 !== e)
    throw new TypeError(
      'Derived constructors may only return object or undefined',
    )
  return _assertThisInitialized(t)
}
function _assertThisInitialized(e) {
  if (void 0 === e)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    )
  return e
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {}),
    )
  } catch (t) {}
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
    return !!t
  })()
}
function _getPrototypeOf(t) {
  return (
    (_getPrototypeOf = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t)
        }),
    _getPrototypeOf(t)
  )
}
function _inherits(t, e) {
  if ('function' != typeof e && null !== e)
    throw new TypeError('Super expression must either be null or a function')
  ;(t.prototype = Object.create(e && e.prototype, {
    constructor: { value: t, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(t, 'prototype', { writable: !1 }),
    e && _setPrototypeOf(t, e)
}
function _setPrototypeOf(t, e) {
  return (
    (_setPrototypeOf = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (t, e) {
          return (t.__proto__ = e), t
        }),
    _setPrototypeOf(t, e)
  )
} /**
 * FlyweightAudioFactory - React Native version
 * A component for preloading audio resources
 *
 * props.srcs - Array of audio source URLs
 * props.className - Additional class name for the component (not used in RN)
 * props.audioClassName - Additional class name for the audio elements (not used in RN)
 */
var FlyweightAudioFactory = (exports.default = /*#__PURE__*/ (function (
  _React$Component,
) {
  function FlyweightAudioFactory(props) {
    var _this
    _classCallCheck(this, FlyweightAudioFactory)
    _this = _callSuper(this, FlyweightAudioFactory, [props])
    _this.soundObjects = []
    _reactNativeSound.default.setCategory('Playback')
    return _this
  }
  _inherits(FlyweightAudioFactory, _React$Component)
  return _createClass(
    FlyweightAudioFactory,
    [
      {
        key: 'componentDidMount',
        value: function componentDidMount() {
          this.loadAudios()
        },
      },
      {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
          if (prevProps.srcs !== this.props.srcs) {
            this.releaseAudios()
            this.loadAudios()
          }
        },
      },
      {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          this.releaseAudios()
        },
      },
      {
        key: 'loadAudios',
        value: function loadAudios() {
          var _this2 = this
          var srcs = this.props.srcs
          if (!srcs || !Array.isArray(srcs)) {
            return
          }
          srcs.forEach(function (src, index) {
            var sound = new _reactNativeSound.default(src, null, function (
              error,
            ) {
              if (error) {
                console.warn('Failed to load sound '.concat(src, ':'), error)
                return
              }
            })
            _this2.soundObjects[index] = sound
          })
        },
      },
      {
        key: 'releaseAudios',
        value: function releaseAudios() {
          this.soundObjects.forEach(function (sound) {
            if (sound) {
              sound.release()
            }
          })
          this.soundObjects = []
        },
      },
      {
        key: 'render',
        value: function render() {
          return /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
            style: styles.container,
          })
        },
      },
    ],
    [
      {
        key: 'getAudio',
        value: function getAudio(src) {
          return null
        },
      },
    ],
  )
})(_react.default.Component))
var styles = _reactNative.StyleSheet.create({
  container: {
    width: 0,
    height: 0,
    opacity: 0,
    position: 'absolute',
  },
})
