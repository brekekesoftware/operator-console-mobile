'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _react = _interopRequireDefault(require('react'))
var _reactNative = require('react-native')
var _jsxRuntime = require('react/jsx-runtime')
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
} /**
 * MenuBalloonDialog - React Native version
 * A popup dialog component for menus
 *
 * props.showing - Whether the dialog is visible
 * props.style - Additional styles for the component
 * props.onPress - Function called when the dialog is pressed
 */
var MenuBalloonDialog = (exports.default = /*#__PURE__*/ (function (
  _React$Component,
) {
  function MenuBalloonDialog(props) {
    var _this
    _classCallCheck(this, MenuBalloonDialog)
    _this = _callSuper(this, MenuBalloonDialog, [props])
    _defineProperty(_this, 'handlePress', function (event) {
      var onPress = _this.props.onPress
      if (typeof onPress === 'function') {
        onPress(event)
      }
    })
    _defineProperty(_this, 'handleScroll', function () {
      if (!_this.state.isHovered) {
        _this.setState({
          isHovered: true,
        })
        if (_this.hoverTimeout) {
          clearTimeout(_this.hoverTimeout)
        }
        _this.hoverTimeout = setTimeout(function () {
          _this.setState({
            isHovered: false,
          })
        }, 1500)
      }
    })
    _this.state = {
      isHovered: false,
    }
    return _this
  }
  _inherits(MenuBalloonDialog, _React$Component)
  return _createClass(MenuBalloonDialog, [
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (this.hoverTimeout) {
          clearTimeout(this.hoverTimeout)
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this2 = this
        var _this$props = this.props,
          showing = _this$props.showing,
          style = _this$props.style,
          children = _this$props.children
        if (!showing) {
          return null
        }
        var _Dimensions$get = _reactNative.Dimensions.get('window'),
          width = _Dimensions$get.width,
          height = _Dimensions$get.height
        var maxDimension = Math.min(width, height) * 0.7
        return /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
          style: [
            styles.menuBalloonDialog,
            // { maxWidth: maxDimension, maxHeight: maxDimension },
            style,
          ],
          children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
            _reactNative.ScrollView,
            {
              style: styles.scrollView,
              contentContainerStyle: styles.contentContainer,
              showsVerticalScrollIndicator: true,
              showsHorizontalScrollIndicator: false,
              scrollIndicatorInsets: {
                right: 2,
              },
              onScroll: this.handleScroll,
              scrollEventThrottle: 16,
              indicatorStyle: this.state.isHovered ? 'default' : 'white',
              onTouchStart: function onTouchStart() {
                return _this2.setState({
                  isHovered: true,
                })
              },
              onTouchEnd: function onTouchEnd() {
                setTimeout(function () {
                  return _this2.setState({
                    isHovered: false,
                  })
                }, 1500)
              },
              children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                _reactNative.TouchableWithoutFeedback,
                {
                  onPress: this.handlePress,
                  children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                    _reactNative.View,
                    {
                      children: children,
                    },
                  ),
                },
              ),
            },
          ),
        })
      },
    },
  ])
})(_react.default.Component))
var colors = {
  white: '#FFFFFF',
  // @white
  platinum: '#E0E0E0',
  // @platinum
  darkGray: '#9E9E9E', // @dark_gray
}
var styles = _reactNative.StyleSheet.create({
  menuBalloonDialog: {
    backgroundColor: colors.white,
    borderRadius: 4,
    shadowColor: colors.platinum,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
    padding: 10,
  },
  scrollView: {},
  contentContainer: {},
})
