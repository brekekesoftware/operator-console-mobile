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
var _CallArea = _interopRequireDefault(require('./CallArea'))
var _ChatArea = _interopRequireDefault(require('./ChatArea'))
var _DndableSafe = _interopRequireDefault(require('./DndableSafe'))
var _EditorArea = _interopRequireDefault(require('./EditorArea'))
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
 * ChatPanel
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.blinkingTabs
 * props.uiData.unscrolledTabs
 * props.uiData.chatPanel_onDrop
 * props.panelType
 * props.panelCode
 */
var ChatPanel = (exports.default = /*#__PURE__*/ (function (_React$Component) {
  function ChatPanel(props) {
    var _this
    _classCallCheck(this, ChatPanel)
    _this = _callSuper(this, ChatPanel, [props])
    _defineProperty(_this, 'handleCallAreaResize', function (height) {
      var _this$editorAreaRef$c
      var windowHeight = _reactNative.Dimensions.get('window').height
      var editorHeight =
        ((_this$editorAreaRef$c = _this.editorAreaRef.current) === null ||
        _this$editorAreaRef$c === void 0
          ? void 0
          : _this$editorAreaRef$c.getHeight()) || 0
      if (height < windowHeight - editorHeight) {
        _this.setState({
          chatAreaTop: height,
        })
      } else {
        _this.setState({
          chatAreaTop: 0,
        })
      }
    })
    _defineProperty(_this, 'handleChatAreaScrollToBottom', function () {
      if (_this.chatAreaRef.current) {
        var chatArea = _this.chatAreaRef.current
        var scrollHeight = chatArea.getScrollHeight()
        var currentOffset = chatArea.getScrollOffset()
        var visibleHeight = chatArea.getVisibleHeight()
        if (_this.scrollAnimation) {
          _this.scrollAnimation.stop()
        }
        var distance = scrollHeight - currentOffset - visibleHeight
        var duration = 300
        _this.scrollAnimation = _reactNative.Animated.timing(
          new _reactNative.Animated.Value(currentOffset),
          {
            toValue: scrollHeight - visibleHeight,
            duration: duration,
            useNativeDriver: true,
          },
        )
        _this.scrollAnimation.start()
      }
    })
    _this.state = {
      editorAreaDisabled: false,
      chatAreaTop: 0,
      isScrolledToBottom: true,
      isPressed: false,
    }
    _this.chatAreaRef = /*#__PURE__*/ _react.default.createRef()
    _this.editorAreaRef = /*#__PURE__*/ _react.default.createRef()
    _this.scrollAnimation = null
    return _this
  }
  _inherits(ChatPanel, _React$Component)
  return _createClass(ChatPanel, [
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        var _this$chatAreaRef$cur, _this$chatAreaRef$cur2
        var hasActiveReplyButton =
          (_this$chatAreaRef$cur = this.chatAreaRef.current) === null ||
          _this$chatAreaRef$cur === void 0 ||
          (_this$chatAreaRef$cur2 =
            _this$chatAreaRef$cur.hasActiveReplyButton) === null ||
          _this$chatAreaRef$cur2 === void 0
            ? void 0
            : _this$chatAreaRef$cur2.call(_this$chatAreaRef$cur)
        if (hasActiveReplyButton !== this.state.editorAreaDisabled) {
          this.setState({
            editorAreaDisabled: hasActiveReplyButton,
          })
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this2 = this
        var props = this.props
        var myUcCimUserType = (0, _strings.int)(
          props.uiData.ucUiStore.getUcCimUserType(),
        )
        var unread = (0, _strings.int)(
          props.uiData.blinkingTabs[props.panelType + '_' + props.panelCode] ||
            props.uiData.unscrolledTabs[
              props.panelType + '_' + props.panelCode
            ],
        )
        var isDndEnabled =
          ((0, _strings.int)(
            props.uiData.ucUiStore.getOptionalSetting({
              key: 'fsp',
            }),
          ) &
            myUcCimUserType) !==
          myUcCimUserType
        console.log('#Duy Phan console render ChatPanel')
        return /*#__PURE__*/ _react.default.createElement(
          _reactNative.View,
          {
            style: [styles.brChatPanel],
          },
          /*#__PURE__*/ _react.default.createElement(
            _reactNative.View,
            {
              ref: this.chatAreaRef,
              style: [
                styles.chatArea,
                {
                  top: this.state.chatAreaTop,
                },
              ],
            },
            /*#__PURE__*/ _react.default.createElement(_ChatArea.default, {
              uiData: props.uiData,
              panelType: props.panelType,
              panelCode: props.panelCode,
              style: {
                flex: 1,
              },
            }),
          ),
          !this.state.isScrolledToBottom &&
            /*#__PURE__*/ _react.default.createElement(
              _ButtonIconic.default,
              {
                style: [
                  styles.brChatAreaScrollToBottomButton,
                  unread && styles.brUnread,
                  this.state.isPressed && styles.buttonActive,
                ],
                iconName: 'arrow-down',
                title:
                  _uawmsgs.default
                    .LBL_CHAT_AREA_SCROLL_TO_BOTTOM_BUTTON_TOOLTIP,
                onPress: this.handleChatAreaScrollToBottom,
                onPressIn: function onPressIn() {
                  return _this2.setState({
                    isPressed: true,
                  })
                },
                onPressOut: function onPressOut() {
                  return _this2.setState({
                    isPressed: false,
                  })
                },
              },
              unread > 0 &&
                /*#__PURE__*/ _react.default.createElement(
                  _reactNative.View,
                  {
                    style: styles.brUnreadArea,
                  },
                  /*#__PURE__*/ _react.default.createElement(
                    _reactNative.Text,
                    {
                      style: styles.brUnreadInfo,
                    },
                    unread,
                  ),
                ),
            ),
          /*#__PURE__*/ _react.default.createElement(_EditorArea.default, {
            ref: this.editorAreaRef,
            uiData: props.uiData,
            panelType: props.panelType,
            panelCode: props.panelCode,
            disabled: this.state.editorAreaDisabled,
          }),
          /*#__PURE__*/ _react.default.createElement(_CallArea.default, {
            ref: 'callArea',
            uiData: props.uiData,
            panelType: props.panelType,
            panelCode: props.panelCode,
            onResize: this.handleCallAreaResize,
          }),
        )
      },
    },
  ])
})(_react.default.Component))
var colors = {
  white: '#ffffff',
  medium_turquoise: '#4BC5DE',
}
var styles = _reactNative.StyleSheet.create({
  brChatPanel: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  brIsOverCanDrop: {
    borderWidth: 3,
    borderColor: colors.medium_turquoise,
  },
  brChatAreaScrollToBottomButton: {
    position: 'absolute',
    right: 32,
    bottom: 96,
    width: 40,
    height: 40,
    borderWidth: 0,
    opacity: 0.2,
  },
  brUnread: {
    opacity: 1,
  },
  buttonActive: {
    opacity: 1,
  },
  brUnreadArea: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 16,
    height: 16,
    backgroundColor: colors.medium_turquoise,
    borderRadius: 8,
    // 50% of width/height
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  brUnreadInfo: {
    fontSize: 9,
    fontWeight: '400',
    lineHeight: 14.4,
    // 1.6 * 9
    letterSpacing: 1.3,
    color: colors.white,
    textAlign: 'center',
  },
  brHideSysmsg: {},
  chatArea: {
    position: 'absolute',
    padding: 4,
    left: 0,
    top: 0,
    right: 0,
    bottom: 70,
    // width: '100%',
    // height: '100%',
    // backgroundColor: 'blue',
    flex: 1,
  },
})
