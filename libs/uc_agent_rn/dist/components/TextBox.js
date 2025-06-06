'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _react = _interopRequireDefault(require('react'))
var _reactNative = require('react-native')
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
function _extends() {
  return (
    (_extends = Object.assign
      ? Object.assign.bind()
      : function (n) {
          for (var e = 1; e < arguments.length; e++) {
            var t = arguments[e]
            for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r])
          }
          return n
        }),
    _extends.apply(null, arguments)
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
// Define colors based on variables from CSS
var colors = {
  platinum: '#dcdcd5',
  mediumTurquoise: '#40E0D0',
  darkJungleGreen: '#1A1A1A',
  darkGray: '#A9A9A9',
  whiteSmoke: '#F5F5F5',
}
var styles = _reactNative.StyleSheet.create({
  textBox: _objectSpread(
    {
      width: 200,
      height: 35,
      paddingLeft: 12,
      borderWidth: 1,
      borderColor: colors.platinum,
      borderRadius: 4,
      fontSize: 12,
      fontWeight: '400',
      letterSpacing: 0.3,
      color: colors.darkJungleGreen,
    },
    _reactNative.Platform.select({
      ios: {
        fontFamily: 'System',
      },
      android: {
        fontFamily: 'Roboto',
      },
      web: {
        fontFamily: 'inherit',
      },
    }),
  ),
  textBoxFocused: _objectSpread(
    {
      borderColor: colors.mediumTurquoise,
    },
    _reactNative.Platform.select({
      ios: {
        shadowColor: colors.mediumTurquoise,
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 1,
      },
      android: {
        // elevation: 2,
        borderWidth: 2,
      },
    }),
  ),
  textBoxDisabled: {
    color: colors.darkGray,
    backgroundColor: colors.whiteSmoke,
  },
  hidden: {
    display: 'none',
  },
})

/**
 * TextBox
 * props.style - Additional custom styles
 * props.value - Input value
 * props.disabled - Disable input
 * props.hidden - Hide input
 * props.type - Input type (only for web)
 * props.placeholder - Placeholder text
 * props.autoCapitalize - Auto capitalize behavior
 * props.onChangeText - Text change handler
 * props.onBlur - Blur handler
 * props.onKeyPress - Key press handler
 */
var TextBox = /*#__PURE__*/ (function (_React$Component) {
  function TextBox(props) {
    var _this
    _classCallCheck(this, TextBox)
    _this = _callSuper(this, TextBox, [props])
    _defineProperty(_this, 'handleFocus', function () {
      _this.setState({
        isFocused: true,
      })
    })
    _defineProperty(_this, 'handleBlur', function (event) {
      console.log('TextBox onBlur triggered')
      _this.setState({
        isFocused: false,
      })
      if (_this.props.onBlur) {
        _this.props.onBlur(event)
      }
    })
    _defineProperty(_this, 'handleKeyPress', function (event) {
      if (_this.props.onKeyDown) {
        // Convert React Native key event to web format
        var webEvent = {
          key: event.nativeEvent.key,
          keyCode: event.nativeEvent.keyCode,
          shiftKey: false,
          // Add if needed
          preventDefault: function preventDefault() {},
          stopPropagation: function stopPropagation() {},
        }
        _this.props.onKeyDown(webEvent)
      }
    })
    _this.state = {
      isFocused: false,
    }
    return _this
  }
  _inherits(TextBox, _React$Component)
  return _createClass(TextBox, [
    {
      key: 'focus',
      value: function focus() {
        if (this.input) {
          this.input.focus()
        }
      },
    },
    {
      key: 'clear',
      value: function clear() {
        if (this.input) {
          this.input.clear()
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this2 = this
        var props = this.props,
          state = this.state
        var inputStyles = [
          styles.textBox,
          state.isFocused && styles.textBoxFocused,
          props.disabled && styles.textBoxDisabled,
          props.hidden && styles.hidden,
          props.style,
        ]

        // Handle web-specific props
        var webProps = _reactNative.Platform.select({
          web: {
            type: props.type || 'text',
          },
          default: {},
        })
        return /*#__PURE__*/ _react.default.createElement(
          _reactNative.TextInput,
          _extends(
            {
              ref: function ref(input) {
                return (_this2.input = input)
              },
              style: inputStyles,
              value: props.value,
              editable: !props.disabled,
              placeholder: props.placeholder || '',
              autoCapitalize: props.autoCapitalize || 'none',
              onChangeText: props.onChange
                ? function (text) {
                    return props.onChange({
                      target: {
                        value: text,
                      },
                    })
                  }
                : undefined,
              onFocus: this.handleFocus,
              onBlur: this.handleBlur,
              onKeyPress: this.handleKeyPress,
              blurOnSubmit: false,
              onEndEditing: function onEndEditing() {
                _reactNative.Keyboard.dismiss()
                // this.handleBlur()
              },
            },
            webProps,
          ),
        )
      },
    },
  ])
})(_react.default.Component)
var _default = (exports.default = /*#__PURE__*/ _react.default.forwardRef(
  function (props, ref) {
    return /*#__PURE__*/ _react.default.createElement(
      TextBox,
      _extends({}, props, {
        ref: ref,
      }),
    )
  },
))
