'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _react = _interopRequireDefault(require('react'))
var _reactNative = require('react-native')
var _MenuBalloonDialog = _interopRequireDefault(require('./MenuBalloonDialog'))
var _TriangleUpIcon = _interopRequireDefault(require('../icons/TriangleUpIcon'))
var _TriangleDownIcon = _interopRequireDefault(
  require('../icons/TriangleDownIcon'),
)
var _jsxRuntime = require('react/jsx-runtime')
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e }
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
 * DropDownMenu - React Native version
 * A dropdown menu component
 *
 * props.uiData - UI data object
 * props.uiData.showingDialogVersion - Dialog version for tracking open/closed state
 * props.uiData.showingDialog_update - Dialog update handler
 * props.style - Additional styles for the component
 * props.dialogStyle - Additional styles for the dialog
 * props.disabled - Whether the dropdown is disabled
 * props.hidden - Whether the dropdown is hidden
 * props.text - The text to display in the dropdown
 * props.onClick - Function called when the dropdown is clicked
 * props.onShowingDialogUpdate - Function called when the dialog visibility updates
 */
var DropDownMenu = (exports.default = /*#__PURE__*/ (function (
  _React$Component,
) {
  function DropDownMenu(_props) {
    var _this
    _classCallCheck(this, DropDownMenu)
    _this = _callSuper(this, DropDownMenu, [_props])
    _defineProperty(_this, 'handlePress', function () {
      var _this2 = _this,
        props = _this2.props
      if (props.disabled) {
        return
      }
      if (
        props.uiData.showingDialogVersion !== _this.state.showingDialogVersion
      ) {
        _this.setState(
          {
            showingDialogVersion: ++props.uiData.showingDialogVersion,
          },
          function () {
            _this.measureDropdownPosition()
            if (typeof props.onShowingDialogUpdate === 'function') {
              props.onShowingDialogUpdate()
            }
            props.uiData.fire('showingDialog_update')
          },
        )
      } else {
        _this.setState({
          showingDialogVersion: null,
          isVisible: false,
        })
        props.uiData.window_onclick()
      }
      if (typeof props.onClick === 'function') {
        props.onClick()
      }
    })
    _this.state = {
      showingDialogVersion: null,
      dialogPosition: {
        x: 0,
        y: 0,
        width: 0,
      },
      isVisible: false,
    }
    _this.dropdownRef = /*#__PURE__*/ _react.default.createRef()
    return _this
  }
  _inherits(DropDownMenu, _React$Component)
  return _createClass(DropDownMenu, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.measureDropdownPosition()
      },
    },
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        if (this.isDialogShowing() !== this.wasDialogShowing(prevProps)) {
          this.measureDropdownPosition()
          // Animate the transition
          _reactNative.LayoutAnimation.configureNext(
            _reactNative.LayoutAnimation.Presets.easeInEaseOut,
          )
        }
      },
    },
    {
      key: 'measureDropdownPosition',
      value: function measureDropdownPosition() {
        var _this3 = this
        if (this.dropdownRef.current) {
          this.dropdownRef.current.measure(
            function (x, y, width, height, pageX, pageY) {
              var _Dimensions$get = _reactNative.Dimensions.get('window'),
                screenWidth = _Dimensions$get.width,
                screenHeight = _Dimensions$get.height

              // Calculate position to ensure dropdown stays within screen bounds
              var dialogY = pageY + height
              var dialogX = pageX

              // Check if dropdown would go below screen
              if (dialogY + 200 > screenHeight) {
                // Assuming max dropdown height of 200
                dialogY = pageY - 200 // Show above the button
              }

              // Check if dropdown would go beyond right edge
              if (dialogX + width > screenWidth) {
                dialogX = screenWidth - width - 10 // Add some padding
              }
              _this3.setState({
                dialogPosition: {
                  x: dialogX,
                  y: dialogY,
                  width: width,
                },
                isVisible: _this3.isDialogShowing(),
              })
            },
          )
        }
      },
    },
    {
      key: 'isDialogShowing',
      value: function isDialogShowing() {
        return (
          this.props.uiData.showingDialogVersion ===
            this.state.showingDialogVersion && !this.props.hidden
        )
      },
    },
    {
      key: 'wasDialogShowing',
      value: function wasDialogShowing(prevProps) {
        return (
          prevProps.uiData.showingDialogVersion ===
            this.state.showingDialogVersion && !prevProps.hidden
        )
      },
    },
    {
      key: 'extractTitle',
      value: function extractTitle() {
        var text = this.props.text
        var title = ''
        if (typeof text === 'string') {
          title = text
        } else if (
          text &&
          text.props &&
          typeof text.props.children === 'string'
        ) {
          title = text.props.children
        } else if (
          text &&
          text.props &&
          text.props.children &&
          typeof text.props.children.forEach === 'function'
        ) {
          text.props.children.forEach(function (child) {
            if (typeof child === 'string' && child) {
              title = child
            }
          })
        }
        return title
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this4 = this
        var props = this.props,
          state = this.state
        var isShowing = this.isDialogShowing()
        console.log('#Duy Phan console isShowing', state)
        if (props.hidden) {
          return null
        }
        return /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.container,
          children: [
            /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
              ref: this.dropdownRef,
              style: [
                styles.dropDownMenu,
                isShowing && styles.focus,
                props.disabled && styles.disabled,
                props.style,
              ],
              onPress: this.handlePress,
              disabled: props.disabled,
              accessibilityLabel: this.extractTitle(),
              activeOpacity: props.disabled ? 1 : 0.7,
              children: [
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: [
                    styles.dropDownText,
                    props.disabled && styles.disabledText,
                  ],
                  numberOfLines: 1,
                  ellipsizeMode: 'tail',
                  children: props.text,
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                  style: styles.iconContainer,
                  children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                    _reactNative.View,
                    {
                      style: styles.icon,
                      children: isShowing
                        ? /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _TriangleUpIcon.default,
                            {
                              width: 18,
                              height: 18,
                              color: '#000000',
                            },
                          )
                        : /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _TriangleDownIcon.default,
                            {
                              width: 18,
                              height: 18,
                              color: '#000000',
                            },
                          ),
                    },
                  ),
                }),
              ],
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(_MenuBalloonDialog.default, {
              showing: isShowing,
              style: [
                styles.dialog,
                {
                  position: 'absolute',
                  // left: state.dialogPosition.x,
                  top: 30,
                  left: 0,
                  minWidth: state.dialogPosition.width,
                  zIndex: isShowing ? 9999 : 0,
                  // zIndex: 0
                },
                props.dialogStyle,
              ],
              onClick: function onClick() {
                return _this4.setState({
                  showingDialogVersion: null,
                  isVisible: false,
                })
              },
              children: props.children,
            }),
          ],
        })
      },
    },
  ])
})(_react.default.Component)) // Define colors from CSS variables
var colors = {
  mediumTurquoise: '#4BC5DE',
  // @medium_turquoise
  white: '#FFFFFF',
  // @white
  whiteSmoke: '#F5F5F5',
  // @white_smoke
  platinum: '#e0e0e0',
  // @platinum
  darkGray: '#9E9E9E',
  // @dark_gray
  darkJungleGreen: '#212121', // @dark_jungle_green
}
var styles = _reactNative.StyleSheet.create({
  container: {
    position: 'relative',
  },
  dropDownMenu: {
    position: 'relative',
    width: 200,
    height: 32,
    paddingLeft: 16,
    paddingRight: 16,
    borderWidth: 1,
    borderColor: colors.platinum,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  dropDownText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '400',
    letterSpacing: 0.3,
    color: colors.darkJungleGreen,
  },
  iconContainer: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 12,
    height: 12,
    tintColor: colors.darkJungleGreen,
  },
  focus: _objectSpread(
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
        elevation: 2,
      },
    }),
  ),
  disabled: {
    backgroundColor: colors.whiteSmoke,
  },
  disabledText: {
    color: colors.darkGray,
  },
  dialog: _objectSpread(
    {
      backgroundColor: colors.white,
      borderRadius: 4,
    },
    _reactNative.Platform.select({
      ios: {
        shadowColor: colors.darkJungleGreen,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  ),
})
