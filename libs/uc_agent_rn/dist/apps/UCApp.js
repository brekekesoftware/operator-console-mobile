'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _react = _interopRequireDefault(require('react'))
var _reactNative = require('react-native')
var _WidgetBody = _interopRequireDefault(require('../components/WidgetBody'))
var _FlyweightAudioFactory = _interopRequireDefault(
  require('../components/FlyweightAudioFactory'),
)
var _Incomingbar = _interopRequireDefault(require('../components/Incomingbar'))
var _Licensebar = _interopRequireDefault(require('../components/Licensebar'))
var _MainArea = _interopRequireDefault(require('../components/MainArea'))
var _Messagebar = _interopRequireDefault(require('../components/Messagebar'))
var _MultipleAudio = _interopRequireDefault(
  require('../components/MultipleAudio'),
)
var _Sidebar = _interopRequireDefault(require('../components/Sidebar'))
var _Statusbar = _interopRequireDefault(require('../components/Statusbar'))
var _currentscript = _interopRequireDefault(
  require('../utilities/currentscript'),
)
var _reactNativeGestureHandler = require('react-native-gesture-handler')
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e }
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
var sound = require('../sounds/bell.mp3')

/**
 * UCApp
 * props.uiData
 */
var UCApp = /*#__PURE__*/ (function (_React$Component) {
  function UCApp(props) {
    var _this
    _classCallCheck(this, UCApp)
    _this = _callSuper(this, UCApp, [props])
    _defineProperty(_this, 'handleLeftDrag', function (event) {
      var translationX = event.nativeEvent.translationX
      var splitterLeft = _this.state.splitterLeft + translationX
      _this.setState({
        splitterLeft: splitterLeft,
      })
    })
    _this.state = {
      splitterLeft: 300,
    }
    return _this
  }
  _inherits(UCApp, _React$Component)
  return _createClass(UCApp, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.componentDidUpdate()
      },
    },
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        var _Dimensions$get = _reactNative.Dimensions.get('window'),
          width = _Dimensions$get.width
        var newState = {}
        var minWidth = 240
        var minLeft = Math.min(minWidth, width / 2)
        var maxLeft = width - minLeft
        if (this.state.splitterLeft < minLeft) {
          newState.splitterLeft = minLeft
        } else if (maxLeft < this.state.splitterLeft) {
          newState.splitterLeft = maxLeft
        }
        if (Object.keys(newState).length) {
          this.setState(newState)
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        var uiData = this.props.uiData
        var soundFiles = '0123456789'
          .split('')
          .concat([
            'asterisk',
            'bell',
            'pound',
            'ring',
            'ringback',
            'ringlong',
            'silent',
            'terminated',
            'tone1',
          ])
          .map(function (s) {
            return _currentscript.default.DIR + '../sounds/' + s + '.mp3'
          })
        return /*#__PURE__*/ _react.default.createElement(
          _reactNative.View,
          {
            style: styles.container,
          },
          /*#__PURE__*/ _react.default.createElement(
            _WidgetBody.default,
            {
              uiData: uiData,
              modalOverlayStyle: styles.modalOverlay,
            },
            /*#__PURE__*/ _react.default.createElement(_MainArea.default, {
              style: {
                left: this.state.splitterLeft,
              },
              uiData: uiData,
            }),
            /*#__PURE__*/ _react.default.createElement(_Sidebar.default, {
              uiData: uiData,
              style: {
                width: this.state.splitterLeft + 1,
              },
            }),
            /*#__PURE__*/ _react.default.createElement(
              _reactNativeGestureHandler.PanGestureHandler,
              {
                onGestureEvent: this.handleLeftDrag,
              },
              /*#__PURE__*/ _react.default.createElement(_reactNative.View, {
                style: [
                  styles.splitterLeft,
                  {
                    left: this.state.splitterLeft,
                  },
                ],
              }),
            ),
            /*#__PURE__*/ _react.default.createElement(_Licensebar.default, {
              uiData: uiData,
              style: styles.licensebar,
            }),
            /*#__PURE__*/ _react.default.createElement(_Statusbar.default, {
              uiData: uiData,
              style: styles.statusbar,
            }),
            /*#__PURE__*/ _react.default.createElement(_Incomingbar.default, {
              uiData: uiData,
              style: styles.incomingbar,
            }),
            /*#__PURE__*/ _react.default.createElement(_Messagebar.default, {
              uiData: uiData,
              style: styles.messagebar,
            }),
          ),
        )
      },
    },
  ])
})(_react.default.Component)
var styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'white',
  },
  bellAudio: {},
  splitterLeft: {
    position: 'absolute',
    left: -2,
    width: 5,
    top: 0,
    bottom: 0,
    backgroundColor: '#e0e0e0',
    zIndex: 1000,
  },
  licensebar: {
    position: 'absolute',
    top: 50,
    left: 272,
    right: 32,
  },
  statusbar: {
    position: 'absolute',
    top: 50,
    left: 272,
    right: 32,
  },
  incomingbar: {
    position: 'absolute',
    top: 50,
    left: 272,
    right: 32,
  },
  messagebar: {
    position: 'absolute',
    top: 50,
    left: 272,
    right: 32,
  },
})
var _default = (exports.default = UCApp)
