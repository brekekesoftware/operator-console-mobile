'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _react = _interopRequireDefault(require('react'))
var _reactNative = require('react-native')
var _uawmsgs = _interopRequireDefault(require('../utilities/uawmsgs'))
var _ButtonLabeled = _interopRequireDefault(require('./ButtonLabeled'))
var _ChatTyping = _interopRequireDefault(require('./ChatTyping'))
var _ChatList = _interopRequireDefault(require('./ChatList'))
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
  transparent: 'transparent',
  platinum: '#E5E5E5',
  whiteSmoke: '#F5F5F5',
  white: '#FFFFFF',
}
var styles = _reactNative.StyleSheet.create({
  chatArea: {
    position: 'absolute',
    padding: 4,
    left: 0,
    top: 0,
    right: 0,
    bottom: 70,
    backgroundColor: 'transparent',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  hidden: {
    display: 'none',
  },
  withMenuOptions: {
    // Add specific styles for menu options if needed
  },
  casualChatArea: {
    // Add specific styles for casual chat if needed
  },
})

/**
 * CustomerChatArea
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.configurations
 * props.uiData.chatArea_onClick
 * props.uiData.chatArea_onSwipedDown
 * props.uiData.chatArea_onSwipedUp
 * props.uiData.customerChatReconnectButton_onClick
 * props.panelType
 * props.panelCode
 * props.withMenuOptions
 */
var _default = (exports.default = /*#__PURE__*/ (function (_React$Component) {
  function _default(_props) {
    var _this
    _classCallCheck(this, _default)
    _this = _callSuper(this, _default, [_props])
    _defineProperty(_this, 'checkAndScrollToBottom', function () {
      if (_this.scrollViewRef.current && _this.shouldScrollBottom > 0) {
        _this.scrollViewRef.current.scrollToEnd({
          animated: false,
        })
      }
    })
    _defineProperty(_this, 'handleScroll', function (event) {
      var _event$nativeEvent = event.nativeEvent,
        layoutMeasurement = _event$nativeEvent.layoutMeasurement,
        contentOffset = _event$nativeEvent.contentOffset,
        contentSize = _event$nativeEvent.contentSize
      var paddingToBottom = 100
      var isCloseToBottom =
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom
      _this.shouldScrollBottom = isCloseToBottom ? contentSize.height : 0
    })
    _defineProperty(_this, 'handlePress', function () {
      var _this2 = _this,
        props = _this2.props
      if (+new Date() - _this.state.swipedTime > 500) {
        props.uiData.fire('chatArea_onClick', props.panelType, props.panelCode)
      }
    })
    _defineProperty(_this, 'handleTouchStart', function (event) {
      var touch = event.nativeEvent.touches[0]
      _this.setState({
        touchStartX: touch.pageX,
        touchStartY: touch.pageY,
        touchStartTime: +new Date(),
        touchMoveX: touch.pageX,
        touchMoveY: touch.pageY,
      })
    })
    _defineProperty(_this, 'handleTouchMove', function (event) {
      var touch = event.nativeEvent.touches[0]
      _this.setState({
        touchMoveX: touch.pageX,
        touchMoveY: touch.pageY,
      })
    })
    _defineProperty(_this, 'handleTouchEnd', function () {
      var _this3 = _this,
        props = _this3.props
      var nowTime = +new Date()
      var dTime = nowTime - _this.state.touchStartTime
      var dY = _this.state.touchMoveY - _this.state.touchStartY
      if (dTime < 1000) {
        if (24 < dY && dY < 200) {
          _this.setState({
            swipedTime: nowTime,
          })
          props.uiData.fire(
            'chatArea_onSwipedDown',
            props.panelType,
            props.panelCode,
          )
        } else if (-200 < dY && dY < -24) {
          _this.setState({
            swipedTime: nowTime,
          })
          props.uiData.fire(
            'chatArea_onSwipedUp',
            props.panelType,
            props.panelCode,
          )
        }
      }
    })
    _this.shouldScrollBottom = 0
    _this.scrollViewRef = /*#__PURE__*/ _react.default.createRef()
    _this.state = {
      touchStartX: 0,
      touchStartY: 0,
      touchStartTime: 0,
      touchMoveX: 0,
      touchMoveY: 0,
      swipedTime: 0,
    }
    return _this
  }
  _inherits(_default, _React$Component)
  return _createClass(_default, [
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        this.checkAndScrollToBottom()
      },
    },
    {
      key: 'render',
      value: function render() {
        var _props$uiData$configu
        var props = this.props
        var containerStyles = [
          styles.chatArea,
          props.withMenuOptions && styles.withMenuOptions,
          ((_props$uiData$configu = props.uiData.configurations) === null ||
          _props$uiData$configu === void 0
            ? void 0
            : _props$uiData$configu.casualChat) && styles.casualChatArea,
        ]
        var showReconnectButton =
          props.uiData.ucUiStore.getSignInStatus() === 0 &&
          (props.uiData.ucUiStore.getLastSignOutReason() || {}).reSignInTime
        return /*#__PURE__*/ _react.default.createElement(
          _reactNative.View,
          {
            style: containerStyles,
          },
          /*#__PURE__*/ _react.default.createElement(
            _reactNative.ScrollView,
            {
              ref: this.scrollViewRef,
              style: styles.scrollView,
              contentContainerStyle: styles.scrollContent,
              onScroll: this.handleScroll,
              scrollEventThrottle: 16,
              onTouchStart: this.handleTouchStart,
              onTouchMove: this.handleTouchMove,
              onTouchEnd: this.handleTouchEnd,
            },
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.TouchableWithoutFeedback,
              {
                onPress: this.handlePress,
              },
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.View,
                null,
                /*#__PURE__*/ _react.default.createElement(_ChatList.default, {
                  uiData: props.uiData,
                  panelType: props.panelType,
                  panelCode: props.panelCode,
                }),
              ),
            ),
          ),
          /*#__PURE__*/ _react.default.createElement(
            _ButtonLabeled.default,
            {
              hidden: !showReconnectButton,
              vivid: true,
              title:
                _uawmsgs.default.LBL_CUSTOMER_CHAT_RECONNECT_BUTTON_TOOLTIP,
              onPress: function onPress() {
                return props.uiData.fire(
                  'customerChatReconnectButton_onClick',
                  props.panelType,
                  props.panelCode,
                )
              },
            },
            _uawmsgs.default.LBL_CUSTOMER_CHAT_RECONNECT_BUTTON,
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
