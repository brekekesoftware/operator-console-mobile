'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _react = _interopRequireDefault(require('react'))
var _reactNative = require('react-native')
var _ChatTyping = _interopRequireDefault(require('./ChatTyping'))
var _ChatInvitation = _interopRequireDefault(require('./ChatInvitation'))
var _ChatList = _interopRequireDefault(require('./ChatList'))
var _ChatOptionButtons = _interopRequireDefault(require('./ChatOptionButtons'))
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
/**
 * ChatArea
 * props.uiData
 * props.uiData.currentSelectedTab
 * props.uiData.chatArea_onScrolledToBottomChanged
 * props.panelType
 * props.panelCode
 * props.style
 */
var _default = (exports.default = /*#__PURE__*/ (function (_React$Component) {
  function _default(props) {
    var _this
    _classCallCheck(this, _default)
    _this = _callSuper(this, _default, [props])
    _defineProperty(_this, 'handleScroll', function (event) {
      var _event$nativeEvent = event.nativeEvent,
        contentOffset = _event$nativeEvent.contentOffset,
        contentSize = _event$nativeEvent.contentSize,
        layoutMeasurement = _event$nativeEvent.layoutMeasurement
      if (
        !_this.scrolledFirst &&
        contentOffset.y + layoutMeasurement.height !== contentSize.height
      ) {
        _this.scrolledFirst = true
      }

      // Update heights for bottom check
      _this.setState(
        {
          contentHeight: contentSize.height,
          scrollViewHeight: layoutMeasurement.height,
        },
        function () {
          _this.checkScrolledToBottom()
        },
      )

      // Notify ChatList of scroll position
      if (_this.chatListRef && _this.chatListRef.parentScrolled) {
        _this.chatListRef.parentScrolled({
          top: contentOffset.y,
        })
      }
    })
    _defineProperty(_this, 'handleChatListScrollRequested', function (ev) {
      if (ev && ev.top && _this.scrollViewRef.current) {
        _this.scrollViewRef.current.scrollTo({
          y: ev.top,
          animated: true,
        })
      }
    })
    _this.scrollViewRef = /*#__PURE__*/ _react.default.createRef()
    _this.scrolledFirst = false
    _this.shouldScrollBottom = 0
    _this.state = {
      scrolledToBottom: false,
      contentHeight: 0,
      scrollViewHeight: 0,
    }
    return _this
  }
  _inherits(_default, _React$Component)
  return _createClass(_default, [
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        if (!this.scrolledFirst || 0 < this.shouldScrollBottom) {
          this.scrollToBottom()
        }
        this.checkScrolledToBottom()
      },
    },
    {
      key: 'scrollToBottom',
      value: function scrollToBottom() {
        var animated =
          arguments.length > 0 && arguments[0] !== undefined
            ? arguments[0]
            : true
        if (this.scrollViewRef.current) {
          this.scrollViewRef.current.scrollToEnd({
            animated: animated,
          })
        }
      },
    },
    {
      key: 'checkScrolledToBottom',
      value: function checkScrolledToBottom() {
        var _this$state = this.state,
          contentHeight = _this$state.contentHeight,
          scrollViewHeight = _this$state.scrollViewHeight
        if (!contentHeight || !scrollViewHeight) return
        var isAtBottom = contentHeight - scrollViewHeight <= 100
        if (isAtBottom !== this.state.scrolledToBottom) {
          this.setState({
            scrolledToBottom: isAtBottom,
          })
          this.props.uiData.fire(
            'chatArea_onScrolledToBottomChanged',
            this.props.panelType,
            this.props.panelCode,
            isAtBottom,
          )
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this2 = this
        var props = this.props
        var isSelected =
          props.uiData.currentSelectedTab ===
          props.panelType + '_' + props.panelCode
        return /*#__PURE__*/ _react.default.createElement(
          _reactNative.ScrollView,
          {
            ref: this.scrollViewRef,
            style: [
              styles.brChatArea,
              isSelected && styles.brSelected,
              props.hidden && styles.brHidden,
              props.style,
            ],
            onScroll: this.handleScroll,
            // contentContainerStyle={{ flexGrow: 1 }}
            // scrollEventThrottle={16}
            showsVerticalScrollIndicator: true,
            showsHorizontalScrollIndicator: false,
            nestedScrollEnabled: true,
          },
          /*#__PURE__*/ _react.default.createElement(_ChatList.default, {
            ref: function ref(_ref) {
              return (_this2.chatListRef = _ref)
            },
            uiData: props.uiData,
            panelType: props.panelType,
            panelCode: props.panelCode,
            onScrollRequested: this.handleChatListScrollRequested,
          }),
          /*#__PURE__*/ _react.default.createElement(_ChatInvitation.default, {
            uiData: props.uiData,
            panelType: props.panelType,
            panelCode: props.panelCode,
          }),
          /*#__PURE__*/ _react.default.createElement(
            _ChatOptionButtons.default,
            {
              uiData: props.uiData,
              panelType: props.panelType,
              panelCode: props.panelCode,
            },
          ),
          /*#__PURE__*/ _react.default.createElement(_ChatTyping.default, {
            uiData: props.uiData,
            panelType: props.panelType,
            panelCode: props.panelCode,
          }),
        )
      },
    },
  ])
})(_react.default.Component))
var styles = _reactNative.StyleSheet.create({
  brChatArea: {
    flex: 1,
  },
  brSelected: {},
  brHidden: {
    display: 'none',
  },
})
