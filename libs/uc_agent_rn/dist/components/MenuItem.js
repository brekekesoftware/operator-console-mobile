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
/*
 * props.style - Additional styles for the component
 * props.textStyle - Additional styles for the text
 * props.disabled - Whether the menu item is disabled
 * props.hidden - Whether the menu item is hidden
 * props.dropDown - Whether the menu item is in a dropdown
 * props.onPress - Function called when the item is pressed
 */
var MenuItem = (exports.default = /*#__PURE__*/ (function (_React$Component) {
  function MenuItem() {
    var _this
    _classCallCheck(this, MenuItem)
    for (
      var _len = arguments.length, args = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key]
    }
    _this = _callSuper(this, MenuItem, [].concat(args))
    _defineProperty(_this, 'handlePress', function () {
      var _this$props = _this.props,
        disabled = _this$props.disabled,
        onPress = _this$props.onPress
      if (!disabled && typeof onPress === 'function') {
        onPress()
      }
    })
    return _this
  }
  _inherits(MenuItem, _React$Component)
  return _createClass(MenuItem, [
    {
      key: 'extractTitle',
      value: function extractTitle() {
        var children = this.props.children
        var title = ''
        if (typeof children === 'string') {
          title = children
        } else if (
          children &&
          children.props &&
          typeof children.props.children === 'string'
        ) {
          title = children.props.children
        } else if (children && typeof children.forEach === 'function') {
          children.forEach(function (child) {
            if (typeof child === 'string' && child) {
              title = child
            } else if (
              child &&
              child.props &&
              typeof child.props.children === 'string' &&
              child.props.children
            ) {
              title = child.props.children
            }
          })
        }
        return title
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this$props2 = this.props,
          children = _this$props2.children,
          style = _this$props2.style,
          textStyle = _this$props2.textStyle,
          disabled = _this$props2.disabled,
          hidden = _this$props2.hidden,
          dropDown = _this$props2.dropDown
        if (hidden) {
          return null
        }
        var containerStyles = [
          styles.menuItem,
          disabled && styles.disabled,
          dropDown && styles.dropDown,
          style,
        ]
        // console.log('#Duy Phan console disabled',disabled)

        return /*#__PURE__*/ _react.default.createElement(
          _reactNative.TouchableOpacity,
          {
            style: containerStyles,
            onPress: this.handlePress,
            // activeOpacity={!disabled ? 1 : 0.7}
            // activeOpacity={0}
            disabled: disabled,
            accessibilityLabel: this.extractTitle(),
          },
          typeof children === 'string'
            ? /*#__PURE__*/ _react.default.createElement(
                _reactNative.Text,
                null,
                children,
              )
            : children,
        )
      },
    },
  ])
})(_react.default.Component))
var colors = {
  white: '#FFFFFF',
  isabelline: '#EEEEEE',
  darkGray: '#9E9E9E',
  darkJungleGreen: '#212121',
}
var styles = _reactNative.StyleSheet.create({
  menuItem: {
    padding: 10,
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0.3,
    color: colors.darkJungleGreen,
  },
  disabled: {
    color: colors.darkGray,
    opacity: 0.7,
  },
  dropDown: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  pressed: {
    backgroundColor: colors.isabelline,
  },
  disabledPressed: {
    backgroundColor: colors.white,
  },
})
