'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _react = _interopRequireDefault(require('react'))
var _reactNative = require('react-native')
var _uawmsgs = _interopRequireDefault(require('../utilities/uawmsgs'))
var _strings = require('../utilities/strings')
var _DropDownMenu = _interopRequireDefault(require('./DropDownMenu'))
var _MenuItem = _interopRequireDefault(require('./MenuItem'))
var _TextBox = _interopRequireDefault(require('./TextBox'))
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
 * OutgoingWebchatForm
 * props.uiData
 * props.params
 */
var OutgoingWebchatForm = (exports.default = /*#__PURE__*/ (function (
  _React$Component,
) {
  function OutgoingWebchatForm(_props) {
    var _props$params2, _props$params3
    var _this
    _classCallCheck(this, OutgoingWebchatForm)
    _this = _callSuper(this, OutgoingWebchatForm, [_props])
    _defineProperty(
      _this,
      'handleOutgoingWebchatReplyTypeItemClick',
      function (replyType) {
        var _this2 = _this,
          props = _this2.props
        if (_this.state.replyType !== replyType) {
          var _props$params
          _this.setState({
            replyType: replyType,
            serviceId: (0, _strings.string)(
              props === null ||
                props === void 0 ||
                (_props$params = props.params) === null ||
                _props$params === void 0 ||
                (_props$params = _props$params.webchatServiceIds) === null ||
                _props$params === void 0 ||
                (_props$params = _props$params[replyType]) === null ||
                _props$params === void 0
                ? void 0
                : _props$params[0],
            ),
          })
        }
      },
    )
    _defineProperty(
      _this,
      'handleOutgoingWebchatServiceIdItemClick',
      function (serviceId) {
        if (_this.state.serviceId !== serviceId) {
          _this.setState({
            serviceId: serviceId,
          })
        }
      },
    )
    _defineProperty(
      _this,
      'handleOutgoingWebchatTextInputChange',
      function (text) {
        _this.setState({
          text: (0, _strings.string)(text),
        })
      },
    )
    var defaultReplyType = (0, _strings.string)(
      _props === null ||
        _props === void 0 ||
        (_props$params2 = _props.params) === null ||
        _props$params2 === void 0 ||
        (_props$params2 = _props$params2.replyTypes) === null ||
        _props$params2 === void 0
        ? void 0
        : _props$params2[0],
    )
    _this.state = {
      replyType: defaultReplyType,
      serviceId: (0, _strings.string)(
        _props === null ||
          _props === void 0 ||
          (_props$params3 = _props.params) === null ||
          _props$params3 === void 0 ||
          (_props$params3 = _props$params3.webchatServiceIds) === null ||
          _props$params3 === void 0 ||
          (_props$params3 = _props$params3[defaultReplyType]) === null ||
          _props$params3 === void 0
          ? void 0
          : _props$params3[0],
      ),
      text: '',
    }
    _this.outgoingWebchatTextInputRef = /*#__PURE__*/ _react.default.createRef()
    return _this
  }
  _inherits(OutgoingWebchatForm, _React$Component)
  return _createClass(OutgoingWebchatForm, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this3 = this
        setTimeout(function () {
          if (_this3.outgoingWebchatTextInputRef.current) {
            _this3.outgoingWebchatTextInputRef.current.focus()
          }
        }, 0)
      },
    },
    {
      key: 'render',
      value: function render() {
        var _props$params4,
          _props$params5,
          _this4 = this
        var props = this.props
        var replyTypes =
          (props === null ||
          props === void 0 ||
          (_props$params4 = props.params) === null ||
          _props$params4 === void 0
            ? void 0
            : _props$params4.replyTypes) || []
        var webchatServiceIds =
          (props === null ||
          props === void 0 ||
          (_props$params5 = props.params) === null ||
          _props$params5 === void 0 ||
          (_props$params5 = _props$params5.webchatServiceIds) === null ||
          _props$params5 === void 0
            ? void 0
            : _props$params5[this.state.replyType]) || []
        return /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
          style: styles.brOutgoingWebchatForm,
          children: /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.brOutgoingWebchatTable,
            children: [
              /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: styles.tableRow,
                children: [
                  /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.brOutgoingWebchatLabelCell,
                    children: _uawmsgs.default.LBL_OUTGOING_WEBCHAT_REPLY_TYPE,
                  }),
                  /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                    style: styles.brOutgoingWebchatInputCell,
                    children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                      _DropDownMenu.default,
                      {
                        uiData: props.uiData,
                        style: styles.brOutgoingWebchatReplyTypeMenu,
                        text: this.state.replyType,
                        children: replyTypes.map(function (replyType) {
                          return /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _MenuItem.default,
                            {
                              style: [
                                styles.brOutgoingWebchatFormMenuItem,
                                styles.brOutgoingWebchatReplyTypeItem,
                              ],
                              dropDown: true,
                              onPress: function onPress() {
                                return _this4.handleOutgoingWebchatReplyTypeItemClick(
                                  replyType,
                                )
                              },
                              children: replyType,
                            },
                            replyType,
                          )
                        }),
                      },
                    ),
                  }),
                ],
              }),
              webchatServiceIds.length >= 2 &&
                /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                  style: styles.tableRow,
                  children: [
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.brOutgoingWebchatLabelCell,
                      children:
                        _uawmsgs.default.LBL_OUTGOING_WEBCHAT_SERVICE_ID,
                    }),
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                      style: styles.brOutgoingWebchatInputCell,
                      children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                        _DropDownMenu.default,
                        {
                          uiData: props.uiData,
                          style: styles.brOutgoingWebchatServiceIdMenu,
                          text: this.state.serviceId,
                          children: webchatServiceIds.map(function (serviceId) {
                            return /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _MenuItem.default,
                              {
                                style: [
                                  styles.brOutgoingWebchatFormMenuItem,
                                  styles.brOutgoingWebchatServiceIdItem,
                                ],
                                dropDown: true,
                                onPress: function onPress() {
                                  return _this4.handleOutgoingWebchatServiceIdItemClick(
                                    serviceId,
                                  )
                                },
                                children: serviceId,
                              },
                              serviceId,
                            )
                          }),
                        },
                      ),
                    }),
                  ],
                }),
              /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                style: styles.tableRow,
                children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(_TextBox.default, {
                  ref: this.outgoingWebchatTextInputRef,
                  style: styles.brOutgoingWebchatTextInput,
                  value: this.state.text,
                  placeholder:
                    _uawmsgs.default.LBL_OUTGOING_WEBCHAT_TEXT_PLACEHOLDER,
                  autoCapitalize: 'none',
                  onChangeText: this.handleOutgoingWebchatTextInputChange,
                }),
              }),
            ],
          }),
        })
      },
    },
  ])
})(_react.default.Component))
var styles = _reactNative.StyleSheet.create({
  brOutgoingWebchatForm: {
    flex: 1,
    paddingTop: 8,
    paddingHorizontal: 32,
    backgroundColor: '#FFFFFF',
  },
  brOutgoingWebchatTable: {
    width: '100%',
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },
  brOutgoingWebchatLabelCell: {
    padding: 4,
    fontSize: 13 * (1 / 16),
    fontWeight: '500',
    letterSpacing: 0.3 * (1 / 16),
    minWidth: 80,
  },
  brOutgoingWebchatInputCell: {
    padding: 4,
    fontSize: 13 * (1 / 16),
    fontWeight: '500',
    letterSpacing: 0.3 * (1 / 16),
    flex: 1,
    minWidth: 80,
  },
  brOutgoingWebchatReplyTypeMenu: {
    minWidth: 150,
  },
  brOutgoingWebchatServiceIdMenu: {
    minWidth: 150,
  },
  brOutgoingWebchatTextInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 4,
    paddingHorizontal: 8,
    backgroundColor: '#FFFFFF',
  },
  brOutgoingWebchatFormMenuItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  brOutgoingWebchatReplyTypeItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  brOutgoingWebchatServiceIdItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
})
