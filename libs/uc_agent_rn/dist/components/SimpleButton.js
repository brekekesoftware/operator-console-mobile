'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _react = _interopRequireDefault(require('react'))
var _reactNative = require('react-native')
var _strings = require('../utilities/strings')
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
  borderDefault: '#dcdcd5',
  borderActive: '#4bc5de',
  backgroundDefault: '#f8f8f6',
  backgroundHover: '#ffffff',
  backgroundActive: '#ccccc2',
  backgroundDisabled: '#deded8',
}
var styles = _reactNative.StyleSheet.create({
  simpleButton: _objectSpread(
    {
      borderWidth: 1,
      borderColor: colors.borderDefault,
      backgroundColor: colors.backgroundDefault,
      alignItems: 'center',
      justifyContent: 'center',
    },
    _reactNative.Platform.select({
      ios: {
        shadowOpacity: 0,
        shadowRadius: 0,
      },
      android: {
        elevation: 0,
      },
    }),
  ),
  buttonPressed: _objectSpread(
    {
      borderColor: colors.borderActive,
      backgroundColor: colors.backgroundActive,
    },
    _reactNative.Platform.select({
      ios: {
        shadowColor: colors.borderActive,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  ),
  disabled: {
    borderColor: colors.borderDefault,
    backgroundColor: colors.backgroundDisabled,
    opacity: 0.33,
  },
})

/**
 * SimpleButton
 * props.style - Additional custom styles
 * props.title - Button tooltip/accessibility label
 * props.disabled - Disable button
 * props.onPress - Press handler
 */
var _default = (exports.default = /*#__PURE__*/ (function (_React$Component) {
  function _default(_props) {
    var _this
    _classCallCheck(this, _default)
    _this = _callSuper(this, _default, [_props])
    _defineProperty(_this, 'handlePressIn', function () {
      if (!_this.props.disabled) {
        _this.setState({
          isPressed: true,
        })
      }
    })
    _defineProperty(_this, 'handlePressOut', function () {
      _this.setState({
        isPressed: false,
      })
    })
    _defineProperty(_this, 'handlePress', function () {
      var _this2 = _this,
        props = _this2.props
      if (!props.disabled && props.onPress) {
        props.onPress()
      }
    })
    _this.state = {
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
          styles.simpleButton,
          state.isPressed && !props.disabled && styles.buttonPressed,
          props.disabled && styles.disabled,
          props.style, // Additional custom styles
        ]
        return /*#__PURE__*/ (0, _jsxRuntime.jsx)(
          _reactNative.TouchableOpacity,
          {
            style: buttonStyles,
            disabled: props.disabled,
            accessibilityLabel: (0, _strings.string)(props.title),
            accessibilityHint: (0, _strings.string)(props.title),
            onPressIn: this.handlePressIn,
            onPressOut: this.handlePressOut,
            onPress: this.handlePress,
            activeOpacity: props.disabled ? 1 : 0.7,
            children: props.children,
          },
        )
      },
    },
  ])
})(_react.default.Component))
