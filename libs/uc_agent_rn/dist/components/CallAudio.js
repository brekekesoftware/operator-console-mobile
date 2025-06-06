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
 * CallAudio
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.phone
 * props.sessionId
 * props.streamMarker
 * props.isLocal
 * props.deviceId
 * props.style - Renamed from className for React Native
 */
var _default = (exports.default = /*#__PURE__*/ (function (_React$Component) {
  function _default(props) {
    var _this
    _classCallCheck(this, _default)
    _this = _callSuper(this, _default, [props])
    _this.sound = null
    _this.state = {
      isPlaying: false,
    }

    // Enable playback in silence mode (iOS only)
    _reactNativeSound.default.setCategory('Playback', true)
    // Set default audio output to speaker
    _reactNativeSound.default.setMode('VideoChat')
    return _this
  }
  _inherits(_default, _React$Component)
  return _createClass(_default, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.setupAudio()
        this.play()
      },
    },
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        var props = this.props
        if (
          !prevProps ||
          props.sessionId !== prevProps.sessionId ||
          props.streamMarker !== prevProps.streamMarker
        ) {
          this.play()
        } else if (!prevProps || props.deviceId !== prevProps.deviceId) {
          this.updateAudioOutput()
        }
      },
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.cleanup()
      },
    },
    {
      key: 'setupAudio',
      value: function setupAudio() {
        // Configure audio session
        if (_reactNative.Platform.OS === 'ios') {
          _reactNativeSound.default.setCategory('PlayAndRecord')
        }
      },
    },
    {
      key: 'play',
      value: function play() {
        var _this2 = this
        var props = this.props
        var stream = null
        var url = ''

        // Cleanup previous sound instance
        this.cleanup()
        if (props.uiData.phone) {
          var session =
            props.uiData.phone && props.uiData.phone.getSession(props.sessionId)
          if (session) {
            if (props.isLocal) {
              stream = session.localStreamObject || null
              url = session.localStreamUrl || ''
            } else {
              stream = session.remoteStreamObject || null
              url = session.remoteStreamUrl || ''
            }
          }
        }
        try {
          if (url) {
            this.sound = new _reactNativeSound.default(url, '', function (
              error,
            ) {
              if (error) {
                props.uiData.ucUiStore
                  .getLogger()
                  .log('warn', 'Failed to load sound', error)
                return
              }

              // Start playing the sound
              _this2.sound.play(function (success) {
                if (!success) {
                  props.uiData.ucUiStore
                    .getLogger()
                    .log('warn', 'Playback failed')
                }
                _this2.setState({
                  isPlaying: false,
                })
              })
              _this2.setState({
                isPlaying: true,
              })
            })

            // Set volume and enable looping if needed
            this.sound.setVolume(1.0)
            // this.sound.setNumberOfLoops(-1); // Uncomment for infinite loop
          } else if (stream) {
            // For handling WebRTC streams, you might need to use react-native-webrtc
            // This would require additional implementation specific to your streaming setup
            props.uiData.ucUiStore
              .getLogger()
              .log('warn', 'Stream handling requires WebRTC implementation')
          }
        } catch (error) {
          props.uiData.ucUiStore.getLogger().log('warn', error)
        }
      },
    },
    {
      key: 'updateAudioOutput',
      value: function updateAudioOutput() {
        try {
          if (this.sound && _reactNative.Platform.OS === 'android') {
            // TODO: Implement audio output selection for Android
            // On Android, you can use the AudioManager to switch output
            // This requires a native module implementation
            // You might want to create a native module that interfaces with Android's AudioManager
            // or use an existing library that provides this functionality
          }
          // iOS handles audio routing through the system settings
        } catch (error) {
          this.props.uiData.ucUiStore.getLogger().log('warn', error)
        }
      },
    },
    {
      key: 'cleanup',
      value: function cleanup() {
        if (this.sound) {
          try {
            this.sound.stop()
            this.sound.release()
            this.sound = null
          } catch (error) {
            this.props.uiData.ucUiStore.getLogger().log('warn', error)
          }
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        return null
      },
    },
  ])
})(_react.default.Component))
