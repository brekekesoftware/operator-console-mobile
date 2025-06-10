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
var _reactNativeLinearGradient = _interopRequireDefault(
  require('react-native-linear-gradient'),
)
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
 * CallMicrophoneLevel
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.phone
 * props.analyser
 * props.sessionId
 * props.style - Additional styles
 */
var _default = (exports.default = /*#__PURE__*/ (function (_React$Component) {
  function _default(props) {
    var _this
    _classCallCheck(this, _default)
    _this = _callSuper(this, _default, [props])
    _this.errorInTick = null
    _this.state = {
      level: 0,
    }
    _this.indicatorPosition = new _reactNative.Animated.Value(0)
    return _this
  }
  _inherits(_default, _React$Component)
  return _createClass(_default, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.interval = setInterval(this.tick.bind(this), 100)
      },
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        clearInterval(this.interval)
      },
    },
    {
      key: 'tick',
      value: function tick() {
        var props = this.props
        var analyser = props.analyser
        if (!analyser && props.sessionId) {
          var session =
            props.uiData.phone && props.uiData.phone.getSession(props.sessionId)
          if (
            session &&
            session.analyser &&
            !(session.muted && session.muted.main)
          ) {
            analyser = session.analyser
          }
        }
        if (analyser) {
          if (
            analyser.getByteTimeDomainData &&
            typeof Uint8Array !== 'undefined'
          ) {
            var dataArray = new Uint8Array(analyser.fftSize)
            analyser.getByteTimeDomainData(dataArray)
            var sum = 0
            for (var i = 0; i < dataArray.length; i++) {
              sum += Math.abs(dataArray[i] - 128)
            }
            var val = (sum * 10) / dataArray.length
            var level = val
            if (val > 350) {
              level = (val - 350) / 37.2 + 75
            } else if (val > 100) {
              level = (val - 100) / 10 + 50
            } else if (val > 25) {
              level = (val - 25) / 3 + 25
            }
            var finalLevel = Math.min(100, Math.ceil(level))
            this.setState({
              level: finalLevel,
            })

            // Animate the indicator position
            _reactNative.Animated.spring(this.indicatorPosition, {
              toValue: finalLevel,
              useNativeDriver: false,
              tension: 40,
              friction: 7,
            }).start()
          } else {
            if (!this.errorInTick) {
              this.errorInTick =
                'analyser error getByteTimeDomainData=' +
                analyser.getByteTimeDomainData
              props.uiData.ucUiStore.getLogger().log('warn', this.errorInTick)
            }
            this.setState({
              level: 100,
            })
            this.indicatorPosition.setValue(100)
          }
        } else {
          this.setState({
            level: 0,
          })
          this.indicatorPosition.setValue(0)
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        var indicatorLeft = this.indicatorPosition.interpolate({
          inputRange: [0, 100],
          outputRange: ['100%', '0%'],
        })
        return /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: [styles.brCallMicrophoneLevel, this.props.style],
          children: [
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
              _reactNativeLinearGradient.default,
              {
                style: styles.brCallMicrophoneLevelBackground,
                colors: ['#80ff80', '#ffff80', '#ff8080'],
                start: {
                  x: 0,
                  y: 0,
                },
                end: {
                  x: 1,
                  y: 0,
                },
              },
            ),
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
              style: [
                styles.brCallMicrophoneLevelIndicator,
                {
                  left: indicatorLeft,
                },
              ],
            }),
          ],
        })
      },
    },
  ])
})(_react.default.Component))
var styles = _reactNative.StyleSheet.create({
  brCallMicrophoneLevel: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  brCallMicrophoneLevelBackground: {
    position: 'absolute',
    left: '0%',
    right: '0%',
    top: '0%',
    bottom: '0%',
  },
  brCallMicrophoneLevelIndicator: {
    position: 'absolute',
    right: '0%',
    top: '0%',
    bottom: '0%',
    backgroundColor: '#FFFFFF', // @white
  },
})
