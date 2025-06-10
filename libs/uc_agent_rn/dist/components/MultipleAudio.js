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
var _strings = require('../utilities/strings')
var _jsxRuntime = require('react/jsx-runtime')
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e }
}
function _createForOfIteratorHelper(r, e) {
  var t =
    ('undefined' != typeof Symbol && r[Symbol.iterator]) || r['@@iterator']
  if (!t) {
    if (
      Array.isArray(r) ||
      (t = _unsupportedIterableToArray(r)) ||
      (e && r && 'number' == typeof r.length)
    ) {
      t && (r = t)
      var _n = 0,
        F = function F() {}
      return {
        s: F,
        n: function n() {
          return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }
        },
        e: function e(r) {
          throw r
        },
        f: F,
      }
    }
    throw new TypeError(
      'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
    )
  }
  var o,
    a = !0,
    u = !1
  return {
    s: function s() {
      t = t.call(r)
    },
    n: function n() {
      var r = t.next()
      return (a = r.done), r
    },
    e: function e(r) {
      ;(u = !0), (o = r)
    },
    f: function f() {
      try {
        a || null == t.return || t.return()
      } finally {
        if (u) throw o
      }
    },
  }
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ('string' == typeof r) return _arrayLikeToArray(r, a)
    var t = {}.toString.call(r).slice(8, -1)
    return (
      'Object' === t && r.constructor && (t = r.constructor.name),
      'Map' === t || 'Set' === t
        ? Array.from(r)
        : 'Arguments' === t ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
          ? _arrayLikeToArray(r, a)
          : void 0
    )
  }
}
function _arrayLikeToArray(r, a) {
  ;(null == a || a > r.length) && (a = r.length)
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]
  return n
}
function _regenerator() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e,
    t,
    r = 'function' == typeof Symbol ? Symbol : {},
    n = r.iterator || '@@iterator',
    o = r.toStringTag || '@@toStringTag'
  function i(r, n, o, i) {
    var c = n && n.prototype instanceof Generator ? n : Generator,
      u = Object.create(c.prototype)
    return (
      _regeneratorDefine2(
        u,
        '_invoke',
        (function (r, n, o) {
          var i,
            c,
            u,
            f = 0,
            p = o || [],
            y = !1,
            G = {
              p: 0,
              n: 0,
              v: e,
              a: d,
              f: d.bind(e, 4),
              d: function d(t, r) {
                return (i = t), (c = 0), (u = e), (G.n = r), a
              },
            }
          function d(r, n) {
            for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) {
              var o,
                i = p[t],
                d = G.p,
                l = i[2]
              r > 3
                ? (o = l === n) &&
                  ((c = i[4] || 3),
                  (u = i[5] === e ? i[3] : i[5]),
                  (i[4] = 3),
                  (i[5] = e))
                : i[0] <= d &&
                  ((o = r < 2 && d < i[1])
                    ? ((c = 0), (G.v = n), (G.n = i[1]))
                    : d < l &&
                      (o = r < 3 || i[0] > n || n > l) &&
                      ((i[4] = r), (i[5] = n), (G.n = l), (c = 0)))
            }
            if (o || r > 1) return a
            throw ((y = !0), n)
          }
          return function (o, p, l) {
            if (f > 1) throw TypeError('Generator is already running')
            for (
              y && 1 === p && d(p, l), c = p, u = l;
              (t = c < 2 ? e : u) || !y;

            ) {
              i ||
                (c
                  ? c < 3
                    ? (c > 1 && (G.n = -1), d(c, u))
                    : (G.n = u)
                  : (G.v = u))
              try {
                if (((f = 2), i)) {
                  if ((c || (o = 'next'), (t = i[o]))) {
                    if (!(t = t.call(i, u)))
                      throw TypeError('iterator result is not an object')
                    if (!t.done) return t
                    ;(u = t.value), c < 2 && (c = 0)
                  } else
                    1 === c && (t = i.return) && t.call(i),
                      c < 2 &&
                        ((u = TypeError(
                          "The iterator does not provide a '" + o + "' method",
                        )),
                        (c = 1))
                  i = e
                } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break
              } catch (t) {
                ;(i = e), (c = 1), (u = t)
              } finally {
                f = 1
              }
            }
            return { value: t, done: y }
          }
        })(r, o, i),
        !0,
      ),
      u
    )
  }
  var a = {}
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  t = Object.getPrototypeOf
  var c = [][n]
      ? t(t([][n]()))
      : (_regeneratorDefine2((t = {}), n, function () {
          return this
        }),
        t),
    u =
      (GeneratorFunctionPrototype.prototype =
      Generator.prototype =
        Object.create(c))
  function f(e) {
    return (
      Object.setPrototypeOf
        ? Object.setPrototypeOf(e, GeneratorFunctionPrototype)
        : ((e.__proto__ = GeneratorFunctionPrototype),
          _regeneratorDefine2(e, o, 'GeneratorFunction')),
      (e.prototype = Object.create(u)),
      e
    )
  }
  return (
    (GeneratorFunction.prototype = GeneratorFunctionPrototype),
    _regeneratorDefine2(u, 'constructor', GeneratorFunctionPrototype),
    _regeneratorDefine2(
      GeneratorFunctionPrototype,
      'constructor',
      GeneratorFunction,
    ),
    (GeneratorFunction.displayName = 'GeneratorFunction'),
    _regeneratorDefine2(GeneratorFunctionPrototype, o, 'GeneratorFunction'),
    _regeneratorDefine2(u),
    _regeneratorDefine2(u, o, 'Generator'),
    _regeneratorDefine2(u, n, function () {
      return this
    }),
    _regeneratorDefine2(u, 'toString', function () {
      return '[object Generator]'
    }),
    (_regenerator = function _regenerator() {
      return { w: i, m: f }
    })()
  )
}
function _regeneratorDefine2(e, r, n, t) {
  var i = Object.defineProperty
  try {
    i({}, '', {})
  } catch (e) {
    i = 0
  }
  ;(_regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) {
    if (r)
      i
        ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t })
        : (e[r] = n)
    else {
      var o = function o(r, n) {
        _regeneratorDefine2(e, r, function (e) {
          return this._invoke(r, n, e)
        })
      }
      o('next', 0), o('throw', 1), o('return', 2)
    }
  }),
    _regeneratorDefine2(e, r, n, t)
}
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value
  } catch (n) {
    return void e(n)
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o)
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments
    return new Promise(function (r, o) {
      var a = n.apply(t, e)
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, 'next', n)
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, 'throw', n)
      }
      _next(void 0)
    })
  }
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
 * MultipleAudio - React Native version
 * A component that handles playing audio on multiple devices
 *
 * props.uiData - UI data object
 * props.uiData.ucUiStore - UI store
 * props.uiData.phone - Phone object
 * props.src - Source URL of the audio
 * props.loop - Whether to loop the audio
 * props.playing - Whether the audio should be playing
 * props.deviceId - Device ID to play audio on
 * props.localStoragePreferenceKey - Key for local storage preference
 * props.style - Additional styles
 */
var MultipleAudio = (exports.default = /*#__PURE__*/ (function (
  _React$Component,
) {
  function MultipleAudio(props) {
    var _this
    _classCallCheck(this, MultipleAudio)
    _this = _callSuper(this, MultipleAudio, [props])
    _this.lastDeviceId = null
    _this.audioSounds = []
    _this.audioPlaying = false
    _this.state = {
      outputDevices: [null],
    }
    _reactNativeSound.default.setCategory('Playback', true)
    return _this
  }
  _inherits(MultipleAudio, _React$Component)
  return _createClass(MultipleAudio, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var props = this.props
        var deviceId = (0, _strings.string)(
          props.deviceId ||
            props.uiData.ucUiStore.getLocalStoragePreference({
              keyList: [props.localStoragePreferenceKey || 'bellAudioTarget'],
            })[0],
        )
        this.requestAudioPermission()
        this.setOutputDevices(deviceId)
        this.lastDeviceId = deviceId
        this.loadAudioSources()
      },
    },
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        var props = this.props
        var deviceId = (0, _strings.string)(
          props.deviceId ||
            props.uiData.ucUiStore.getLocalStoragePreference({
              keyList: [props.localStoragePreferenceKey || 'bellAudioTarget'],
            })[0],
        )
        if (deviceId !== this.lastDeviceId) {
          this.setOutputDevices(deviceId)
          this.lastDeviceId = deviceId
          this.loadAudioSources()
        } else if (prevProps.src !== props.src) {
          this.loadAudioSources()
        } else if (prevProps.playing !== props.playing) {
          this.updatePlayback()
        }
      },
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.unloadAudioSources()
      },
    },
    {
      key: 'requestAudioPermission',
      value: (function () {
        var _requestAudioPermission = _asyncToGenerator(
          /*#__PURE__*/ _regenerator().m(function _callee() {
            var granted, _t
            return _regenerator().w(
              function (_context) {
                while (1)
                  switch (_context.n) {
                    case 0:
                      _context.p = 0
                      if (!(_reactNative.Platform.OS === 'android')) {
                        _context.n = 2
                        break
                      }
                      _context.n = 1
                      return _reactNative.PermissionsAndroid.request(
                        _reactNative.PermissionsAndroid.PERMISSIONS
                          .RECORD_AUDIO,
                        {
                          title: 'Audio Permission',
                          message:
                            'App needs access to your microphone to handle audio devices',
                          buttonNeutral: 'Ask Me Later',
                          buttonNegative: 'Cancel',
                          buttonPositive: 'OK',
                        },
                      )
                    case 1:
                      granted = _context.v
                      if (
                        granted !==
                        _reactNative.PermissionsAndroid.RESULTS.GRANTED
                      ) {
                        this.props.uiData.ucUiStore
                          .getLogger()
                          .log('warn', 'Audio permission not granted')
                      }
                    case 2:
                      _context.n = 4
                      break
                    case 3:
                      _context.p = 3
                      _t = _context.v
                      this.props.uiData.ucUiStore.getLogger().log('warn', _t)
                    case 4:
                      return _context.a(2)
                  }
              },
              _callee,
              this,
              [[0, 3]],
            )
          }),
        )
        function requestAudioPermission() {
          return _requestAudioPermission.apply(this, arguments)
        }
        return requestAudioPermission
      })(),
    },
    {
      key: 'setOutputDevices',
      value: function setOutputDevices(deviceId) {
        var _this2 = this
        var props = this.props
        try {
          this.unloadAudioSources()
          if (
            deviceId === '_all_devices' &&
            _reactNative.Platform.OS === 'web'
          ) {
            if (
              typeof navigator !== 'undefined' &&
              navigator.mediaDevices &&
              navigator.mediaDevices.enumerateDevices
            ) {
              navigator.mediaDevices
                .enumerateDevices()
                .then(function (devices) {
                  var audioOutputDevices = devices
                    .filter(function (device) {
                      return (
                        device.kind === 'audiooutput' &&
                        device.deviceId !== 'default' &&
                        device.deviceId !== 'communications'
                      )
                    })
                    .map(function (device) {
                      return device.deviceId
                    })
                  _this2.setState(
                    {
                      outputDevices:
                        audioOutputDevices.length > 0
                          ? audioOutputDevices
                          : [null],
                    },
                    function () {
                      _this2.loadAudioSources()
                    },
                  )
                })
                .catch(function (error) {
                  props.uiData.ucUiStore.getLogger().log('warn', error)
                  _this2.setState(
                    {
                      outputDevices: [null],
                    },
                    function () {
                      _this2.loadAudioSources()
                    },
                  )
                })
            } else {
              props.uiData.ucUiStore
                .getLogger()
                .log('warn', 'enumerateDevices() not supported.')
              this.setState(
                {
                  outputDevices: [null],
                },
                function () {
                  _this2.loadAudioSources()
                },
              )
            }
          } else {
            // On mobile, can't select output device at the app level
            // so just use one audio channel
            // TODO: Add support for selecting output device on mobile
            this.setState(
              {
                outputDevices: [deviceId !== '' ? deviceId : null],
              },
              function () {
                _this2.loadAudioSources()
              },
            )
          }
        } catch (error) {
          props.uiData.ucUiStore.getLogger().log('warn', error)
          this.setState(
            {
              outputDevices: [null],
            },
            function () {
              _this2.loadAudioSources()
            },
          )
        }
      },
    },
    {
      key: 'loadAudioSources',
      value: function loadAudioSources() {
        var _this3 = this
        var props = this.props
        this.unloadAudioSources()
        this.audioSounds = []
        console.log('#Duy Phan console props.src', props.src)
        try {
          var _loop = function _loop() {
            var sound = new _reactNativeSound.default(
              props.src,
              null,
              function (error) {
                if (error) {
                  // props.uiData.ucUiStore
                  //   .getLogger()
                  //   .log('warn', `Failed to load sound: ${error}`)
                  console.log('#Duy Phan console error', error)
                  return
                }
                sound.setNumberOfLoops(props.loop ? -1 : 0)
                _this3.updatePlayback()
              },
            )
            _this3.audioSounds.push(sound)
          }
          for (var i = 0; i < this.state.outputDevices.length; i++) {
            _loop()
          }
        } catch (error) {
          props.uiData.ucUiStore.getLogger().log('warn', error)
        }
      },
    },
    {
      key: 'unloadAudioSources',
      value: function unloadAudioSources() {
        try {
          var _iterator = _createForOfIteratorHelper(this.audioSounds),
            _step
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done; ) {
              var sound = _step.value
              if (sound) {
                sound.stop()
                sound.release()
              }
            }
          } catch (err) {
            _iterator.e(err)
          } finally {
            _iterator.f()
          }
          this.audioSounds = []
          this.audioPlaying = false
        } catch (error) {
          this.props.uiData.ucUiStore.getLogger().log('warn', error)
        }
      },
    },
    {
      key: 'updatePlayback',
      value: function updatePlayback() {
        var props = this.props
        try {
          if (props.playing && !this.audioPlaying) {
            var _iterator2 = _createForOfIteratorHelper(this.audioSounds),
              _step2
            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
                var sound = _step2.value
                if (sound) {
                  sound.setCurrentTime(0)
                  sound.play(function (success) {
                    if (!success) {
                      props.uiData.ucUiStore
                        .getLogger()
                        .log('warn', 'Audio playback failed')
                    }
                  })
                }
              }
            } catch (err) {
              _iterator2.e(err)
            } finally {
              _iterator2.f()
            }
            this.audioPlaying = true
          } else if (!props.playing && this.audioPlaying) {
            var _iterator3 = _createForOfIteratorHelper(this.audioSounds),
              _step3
            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
                var _sound = _step3.value
                if (_sound) {
                  _sound.stop()
                  _sound.setCurrentTime(0)
                }
              }
            } catch (err) {
              _iterator3.e(err)
            } finally {
              _iterator3.f()
            }
            this.audioPlaying = false
          }
        } catch (error) {
          props.uiData.ucUiStore.getLogger().log('warn', error)
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        return /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
          style: [styles.multipleAudio, this.props.style],
        })
      },
    },
  ])
})(_react.default.Component))
var styles = _reactNative.StyleSheet.create({
  multipleAudio: {
    width: 0,
    height: 0,
    opacity: 0,
  },
})
