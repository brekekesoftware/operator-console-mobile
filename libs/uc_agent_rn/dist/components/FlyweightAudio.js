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
}
/**
 * FlyweightAudio
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.phone
 * props.src
 * props.loop
 * props.playing
 * props.deviceId
 * props.localStoragePreferenceKey
 * props.className
 */
var FlyweightAudio = (exports.default = /*#__PURE__*/ (function (
  _React$Component,
) {
  function FlyweightAudio(props) {
    var _this
    _classCallCheck(this, FlyweightAudio)
    _this = _callSuper(this, FlyweightAudio, [props])
    _this.audioPlaying = false
    _this.sound = null
    return _this
  }
  _inherits(FlyweightAudio, _React$Component)
  return _createClass(FlyweightAudio, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.initSound()
      },
    },
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        if (prevProps.src !== this.props.src) {
          this.releaseSound()
          this.initSound()
        } else {
          this.play()
        }
      },
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.releaseSound()
      },
    },
    {
      key: 'initSound',
      value: function initSound() {
        var _this2 = this
        var props = this.props
        _reactNativeSound.default.setCategory('Playback')
        this.sound = new _reactNativeSound.default(
          props.src,
          _reactNativeSound.default.MAIN_BUNDLE,
          function (error) {
            if (error) {
              props.uiData.ucUiStore.getLogger().log('warn', error)
              return
            }
            if (props.loop) {
              _this2.sound.setNumberOfLoops(-1)
            }
            if (props.playing) {
              _this2.play()
            }
          },
        )
      },
    },
    {
      key: 'releaseSound',
      value: function releaseSound() {
        if (this.sound) {
          this.sound.release()
          this.sound = null
        }
        this.audioPlaying = false
      },
    },
    {
      key: 'play',
      value: function play() {
        var props = this.props
        if (!this.sound) {
          return
        }
        if (props.playing && !this.audioPlaying) {
          try {
            this.sound.play(function (success) {
              if (!success) {
                props.uiData.ucUiStore
                  .getLogger()
                  .log('warn', 'Sound playback failed')
              }
            })
          } catch (ex) {
            props.uiData.ucUiStore.getLogger().log('warn', ex)
          }
        } else if (!props.playing && this.audioPlaying) {
          try {
            this.sound.stop()
            this.sound.setCurrentTime(0)
          } catch (ex) {
            props.uiData.ucUiStore.getLogger().log('warn', ex)
          }
        }
        if (props.loop && this.sound.getNumberOfLoops() !== -1) {
          this.sound.setNumberOfLoops(-1)
        } else if (!props.loop && this.sound.getNumberOfLoops() === -1) {
          this.sound.setNumberOfLoops(0)
        }
        this.audioPlaying = props.playing
      },
    },
    {
      key: 'render',
      value: function render() {
        return /*#__PURE__*/ _react.default.createElement(_reactNative.View, {
          style: styles.brFlyweightAudio,
        })
      },
    },
  ])
})(_react.default.Component))
var styles = _reactNative.StyleSheet.create({
  brFlyweightAudio: {
    width: 0,
    height: 0,
    opacity: 0,
  },
})
