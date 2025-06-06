'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _react = _interopRequireDefault(require('react'))
var _reactNative = require('react-native')
var _strings = require('../utilities/strings')
var _TriangleDownIcon = _interopRequireDefault(
  require('../icons/TriangleDownIcon'),
)
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
var styles = _reactNative.StyleSheet.create({
  toolbarButton: _objectSpread(
    {
      width: 42,
      height: 38,
      borderWidth: 1,
      borderColor: 'transparent',
      borderRadius: 2,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      marginHorizontal: 5,
      position: 'relative',
    },
    _reactNative.Platform.select({
      ios: {
        shadowColor: '#c0c0c0',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0,
        shadowRadius: 4,
      },
      android: {
        elevation: 0,
      },
    }),
  ),
  toolbarButtonActive: _objectSpread(
    {
      borderColor: '#dcdcd5',
      backgroundColor: '#f0f0f0',
    },
    _reactNative.Platform.select({
      ios: {
        shadowOpacity: 0.5,
      },
      android: {
        elevation: 2,
      },
    }),
  ),
  toolbarButtonHover: {
    borderColor: '#dcdcd5',
    backgroundColor: 'white',
  },
  disabled: {
    opacity: 0.33,
  },
  icon: {
    width: 40,
    height: 36,
    resizeMode: 'contain',
  },
  dropDownButton: {
    width: 65,
  },
  arrowButtonInner: {
    position: 'absolute',
    right: -10,
    display: 'none',
  },
  arrowButtonInnerVisible: {
    display: 'flex',
  },
})

/**
 * ToolbarButton
 * props.style - Additional styles
 * props.iconSource - Image source for the icon
 * props.title - Button tooltip
 * props.clickableInterval - Minimum time between clicks
 * props.disabled - Disable button
 * props.dropDown - Show dropdown arrow
 * props.onPress - Press handler
 */
var _default = (exports.default = /*#__PURE__*/ (function (_React$Component) {
  function _default(_props) {
    var _this
    _classCallCheck(this, _default)
    _this = _callSuper(this, _default, [_props])
    _defineProperty(_this, 'handlePress', function () {
      var _this2 = _this,
        props = _this2.props
      if (!props.disabled && props.onPress) {
        var now = +new Date()
        if (
          !props.clickableInterval ||
          _this.state.clickTime + (0, _strings.int)(props.clickableInterval) <
            now
        ) {
          _this.setState({
            clickTime: now,
          })
          props.onPress()
        }
      }
    })
    _defineProperty(_this, 'handlePressIn', function () {
      _this.setState({
        isPressed: true,
      })
    })
    _defineProperty(_this, 'handlePressOut', function () {
      _this.setState({
        isPressed: false,
      })
    })
    _this.state = {
      clickTime: 0,
      isPressed: false,
    }
    return _this
  }
  _inherits(_default, _React$Component)
  return _createClass(_default, [
    {
      key: 'render',
      value: function render() {
        var props = this.props,
          state = this.state
        var buttonStyles = [
          styles.toolbarButton,
          props.dropDown && styles.dropDownButton,
          state.isPressed && styles.toolbarButtonActive,
          props.disabled && styles.disabled,
          props.style, // Additional custom styles
        ]
        var arrowStyles = [
          styles.arrowButtonInner,
          props.dropDown && styles.arrowButtonInnerVisible,
        ]
        return /*#__PURE__*/ _react.default.createElement(
          _reactNative.TouchableOpacity,
          {
            style: buttonStyles,
            onPress: this.handlePress,
            onPressIn: this.handlePressIn,
            onPressOut: this.handlePressOut,
            disabled: props.disabled,
            activeOpacity: props.disabled ? 1 : 0.7,
          },
          props.iconSource &&
            /*#__PURE__*/ _react.default.createElement(_reactNative.Image, {
              source: props.iconSource,
              style: styles.icon,
            }),
          props.dropDown &&
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.View,
              {
                style: arrowStyles,
              },
              /*#__PURE__*/ _react.default.createElement(
                _TriangleDownIcon.default,
                {
                  color: '#b6b6b6',
                  width: 30,
                  height: 30,
                },
              ),
            ),
        )
      },
    },
  ])
})(_react.default.Component))
