'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _react = _interopRequireDefault(require('react'))
var _reactNative = require('react-native')
var _uawmsgs = _interopRequireDefault(require('../utilities/uawmsgs'))
var _strings = require('../utilities/strings')
var _ButtonIconic = _interopRequireDefault(require('./ButtonIconic'))
var _TextBox = _interopRequireDefault(require('./TextBox'))
var _DownloadIcon = _interopRequireDefault(require('../icons/DownloadIcon'))
var _CloseIcon = _interopRequireDefault(require('../icons/CloseIcon'))
var _EditIcon = _interopRequireDefault(require('../icons/EditIcon'))
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
}
var colors = {
  white: '#FFFFFF',
  platinum: '#E0E0E0',
  darkJungleGreen: '#212121',
  isabelline: '#EEEEEE',
}
var styles = _reactNative.StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    paddingVertical: 8,
  },
  tableCell: {
    padding: 4,
  },
  cellText: {
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  inputArea: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: 300,
  },
  useLaterButton: {
    position: 'absolute',
    right: 37,
    display: 'none', // Note: Will handle this in render logic
  },
  clearButton: {
    position: 'absolute',
    right: 1,
  },
  itemsContainer: {
    width: 300,
    height: 200,
    borderWidth: 1,
    borderColor: colors.platinum,
    borderRadius: 4,
  },
  scrollView: {
    flex: 1,
  },
  item: {
    position: 'relative',
    paddingVertical: 8,
    paddingLeft: 12,
    paddingRight: 44,
    backgroundColor: colors.white,
  },
  itemHovered: {
    backgroundColor: colors.isabelline,
  },
  itemText: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 20.8,
    // 1.6 * 13
    letterSpacing: 0.3,
    color: colors.darkJungleGreen,
  },
  editButton: {
    position: 'absolute',
    right: 36,
    top: '50%',
    transform: [
      {
        translateY: -12,
      },
    ],
  },
  deleteButton: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: [
      {
        translateY: -12,
      },
    ],
  },
})

/**
 * StatusDisplayForm
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.statusDisplayUseLaterButton_onClick
 * props.uiData.statusDisplayItemDeleteButton_onClick
 * props.params
 */
var _default = (exports.default = /*#__PURE__*/ (function (_React$Component) {
  function _default(props) {
    var _this
    _classCallCheck(this, _default)
    _this = _callSuper(this, _default, [props])
    _defineProperty(_this, 'handleInputChange', function (text) {
      _this.setState({
        inputValue: (0, _strings.string)(text),
      })
    })
    _defineProperty(_this, 'handleUseLaterPress', function () {
      var item = (0, _strings.string)(_this.state.inputValue)
      _this.setState({
        inputValue: '',
      })
      _this.props.uiData.fire('statusDisplayUseLaterButton_onClick', item)
      setTimeout(function () {
        if (_this.inputRef.current) {
          _this.inputRef.current.focus()
        }
      }, 100)
    })
    _defineProperty(_this, 'handleClearPress', function () {
      _this.setState({
        inputValue: '',
      })
      setTimeout(function () {
        if (_this.inputRef.current) {
          _this.inputRef.current.focus()
        }
      }, 100)
    })
    _defineProperty(_this, 'handleItemPress', function (item) {
      _this.setState(
        {
          inputValue: (0, _strings.string)(item),
        },
        function () {
          if (_this.props.onOkPress) {
            _this.props.onOkPress()
          }
        },
      )
    })
    _defineProperty(_this, 'handleItemEdit', function (item, event) {
      _this.setState({
        inputValue: (0, _strings.string)(item),
      })
      _this.props.uiData.fire('statusDisplayItemDeleteButton_onClick', item)
      setTimeout(function () {
        if (_this.inputRef.current) {
          _this.inputRef.current.focus()
          // Note: setSelectionRange equivalent should be handled in TextBox component
        }
      }, 100)
    })
    _defineProperty(_this, 'handleItemDelete', function (item, event) {
      _this.props.uiData.fire('statusDisplayItemDeleteButton_onClick', item)
    })
    _this.state = {
      inputValue: '',
      hoveredItemIndex: null,
    }
    _this.inputRef = /*#__PURE__*/ _react.default.createRef()
    return _this
  }
  _inherits(_default, _React$Component)
  return _createClass(_default, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this2 = this
        var statusMe = this.props.uiData.ucUiStore.getChatClient().getStatus()
        if (statusMe.display) {
          this.setState({
            inputValue: (0, _strings.string)(statusMe.display),
          })
        }
        setTimeout(function () {
          if (_this2.inputRef.current) {
            _this2.inputRef.current.focus()
            _this2.inputRef.current.select()
          }
        }, 100)
      },
    },
    {
      key: 'render',
      value: function render() {
        var _settings$optional_se,
          _this3 = this
        var settings = this.props.uiData.ucUiStore.getChatClient().getSettings()
        var statusDisplayHistory =
          (settings === null ||
          settings === void 0 ||
          (_settings$optional_se = settings.optional_settings) === null ||
          _settings$optional_se === void 0
            ? void 0
            : _settings$optional_se.status_display_history) || []
        return /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.container,
          children: [
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
              style: styles.tableCell,
              children: /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: styles.inputArea,
                children: [
                  /*#__PURE__*/ (0, _jsxRuntime.jsx)(_TextBox.default, {
                    ref: this.inputRef,
                    style: styles.input,
                    value: this.state.inputValue,
                    onChangeText: this.handleInputChange,
                  }),
                  /*#__PURE__*/ (0, _jsxRuntime.jsx)(_ButtonIconic.default, {
                    style: styles.useLaterButton,
                    iconSource: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                      _DownloadIcon.default,
                      {},
                    ),
                    title:
                      _uawmsgs.default
                        .LBL_STATUS_DISPLAY_USE_LATER_BUTTON_TOOLTIP,
                    onPress: this.handleUseLaterPress,
                  }),
                  /*#__PURE__*/ (0, _jsxRuntime.jsx)(_ButtonIconic.default, {
                    style: styles.clearButton,
                    iconSource: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                      _CloseIcon.default,
                      {},
                    ),
                    title:
                      _uawmsgs.default.LBL_STATUS_DISPLAY_CLEAR_BUTTON_TOOLTIP,
                    onPress: this.handleClearPress,
                  }),
                ],
              }),
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
              style: styles.tableCell,
              children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                style: styles.itemsContainer,
                children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                  _reactNative.ScrollView,
                  {
                    style: styles.scrollView,
                    children: statusDisplayHistory.map(function (item, i) {
                      return /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                        _reactNative.TouchableOpacity,
                        {
                          style: [
                            styles.item,
                            _this3.state.hoveredItemIndex === i &&
                              styles.itemHovered,
                          ],
                          onPress: function onPress() {
                            return _this3.handleItemPress(item)
                          },
                          onPressIn: function onPressIn() {
                            return _this3.setState({
                              hoveredItemIndex: i,
                            })
                          },
                          onPressOut: function onPressOut() {
                            return _this3.setState({
                              hoveredItemIndex: null,
                            })
                          },
                          children: [
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _reactNative.Text,
                              {
                                style: styles.itemText,
                                numberOfLines: 1,
                                children: item,
                              },
                            ),
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _ButtonIconic.default,
                              {
                                style: styles.editButton,
                                iconSource: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                  _EditIcon.default,
                                  {},
                                ),
                                title:
                                  _uawmsgs.default
                                    .LBL_STATUS_DISPLAY_ITEM_EDIT_BUTTON_TOOLTIP,
                                onPress: function onPress() {
                                  return _this3.handleItemEdit(item)
                                },
                              },
                            ),
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _ButtonIconic.default,
                              {
                                style: styles.deleteButton,
                                iconSource: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                  _CloseIcon.default,
                                  {},
                                ),
                                title:
                                  _uawmsgs.default
                                    .LBL_STATUS_DISPLAY_ITEM_DELETE_BUTTON_TOOLTIP,
                                onPress: function onPress() {
                                  return _this3.handleItemDelete(item)
                                },
                              },
                            ),
                          ],
                        },
                        i,
                      )
                    }),
                  },
                ),
              }),
            }),
          ],
        })
      },
    },
  ])
})(_react.default.Component))
