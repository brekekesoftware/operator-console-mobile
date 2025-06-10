'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _react = _interopRequireDefault(require('react'))
var _uawmsgs = _interopRequireDefault(require('../utilities/uawmsgs'))
var _strings = require('../utilities/strings')
var _ChatParagraph = _interopRequireDefault(require('./ChatParagraph'))
var _reactNative = require('react-native')
var _ChevronUpIcon = _interopRequireDefault(require('../icons/ChevronUpIcon'))
var _ChevronDownIcon = _interopRequireDefault(
  require('../icons/ChevronDownIcon'),
)
var _ErrorIcon = _interopRequireDefault(require('../icons/ErrorIcon'))
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
 * HistoryDetailArea
 * props.uiData
 * props.uiData.ucUiAction
 * props.uiData.ucUiStore
 * props.uiData.selectedButNotFocusedTab
 * props.panelType
 * props.panelCode
 */
var colors = {
  white: '#FFFFFF',
  platinum: '#E0E0E0',
  isabelline: '#EEEEEE',
  mediumTurquoise: '#4BC5DE',
  darkGray: '#9E9E9E',
  errorColor: '#FF4526',
}
var _default = (exports.default = /*#__PURE__*/ (function (_React$Component) {
  function _default(_props) {
    var _this
    _classCallCheck(this, _default)
    _this = _callSuper(this, _default, [_props])
    _defineProperty(_this, 'handleScroll', function (event) {
      var _event$nativeEvent = event.nativeEvent,
        contentOffset = _event$nativeEvent.contentOffset,
        layoutMeasurement = _event$nativeEvent.layoutMeasurement,
        contentSize = _event$nativeEvent.contentSize
      _this.lastScrollTop = contentOffset.y
      if (contentOffset.y < _this.lastScrollTop) {
        _this.scrolledUpwardManuallyFirst = true
      }
      _this.checkAndSearchMore()
    })
    _defineProperty(_this, 'checkAndSearchMore', function () {
      var props = _this.props
      if (!_this.autoReceiveMore) {
        return
      }
      if (_this.scrolledUpwardManuallyFirst) {
        if (_this.soonAfterScrollTop === 1) {
          _this.soonAfterScrollTop = 2
          return
        } else if (_this.soonAfterScrollTop === 2) {
          _this.soonAfterScrollTop = 0
          return
        }
      } else {
        _this.soonAfterScrollTop = 0
      }
      var showmorelinkTable = props.uiData.ucUiStore.getShowmorelinkTable()
      var lastShowmorelinkEntry =
        showmorelinkTable[_this.last_showmorelink_id] || {}
      var firstShowmorelinkEntry =
        showmorelinkTable[_this.first_showmorelink_id] || {}
      if (_this.scrollViewRef.current) {
        _this.scrollViewRef.current.measure(
          function (x, y, width, height, pageX, pageY) {
            var scrollViewHeight = height
            var contentHeight = _this.scrollViewRef.current.contentHeight
            var scrollY = _this.lastScrollTop
            if (
              scrollY > contentHeight - scrollViewHeight - 50 &&
              !lastShowmorelinkEntry.errorType
            ) {
              _this.handleShowmorelinkClick(_this.last_showmorelink_id)
            } else if (scrollY < 50 && !firstShowmorelinkEntry.errorType) {
              _this.handleShowmorelinkClick(_this.first_showmorelink_id, 0)
            }
          },
        )
      }
    })
    _defineProperty(
      _this,
      'handleShowmorelinkClick',
      function (showmorelink_id, index) {
        var props = _this.props
        if (index === 0) {
          var chatList = props.uiData.ucUiStore.getChatList({
            chatType: props.panelType,
            chatCode: props.panelCode,
          })
          if (chatList.length >= 2 && chatList[0].type === 'showmorelink') {
            _this.secondNodeKey = chatList[1].key
          }
        }
        props.uiData.ucUiAction.receiveMore({
          showmorelink_id: showmorelink_id,
        })
      },
    )
    _this.scrolledFirst = false
    _this.firstShowmorelinkNodeKey = ''
    _this.first_showmorelink_id = ''
    _this.lastShowmorelinkNodeKey = ''
    _this.last_showmorelink_id = ''
    _this.firstScrollNodeKey = ''
    _this.secondNodeKey = ''
    _this.secondNodeTop = 0
    _this.soonAfterScrollTop = 0
    _this.scrolledUpwardManuallyFirst = false
    _this.lastScrollTop = 0
    _this.scrollViewRef = /*#__PURE__*/ _react.default.createRef()
    if (_props.panelType === 'HISTORYDETAIL') {
      _this.autoReceiveMore = true
      var user_id = null
      try {
        user_id = (0, _strings.string)(
          (JSON.parse(_props.panelCode) || {}).user_id,
        )
      } catch (e) {}
      if (user_id) {
        var displayPeriod =
          (0, _strings.int)(
            _props.uiData.ucUiStore.getOptionalSetting({
              key: 'display_period',
            }),
          ) || 15
        var now = new Date()
        var today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        _this.displayPeriodBegin = +today - (displayPeriod - 1) * 86400000
      } else {
        _this.displayPeriodBegin = 0
      }
    } else {
      _this.autoReceiveMore = false
    }
    return _this
  }
  _inherits(_default, _React$Component)
  return _createClass(_default, [
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        var props = this.props
        if (
          props.uiData.selectedButNotFocusedTab ===
          props.panelType + '_' + props.panelCode
        ) {
          if (this.scrollViewRef.current) {
            // this.scrollViewRef.current.focus()
            props.uiData.selectedButNotFocusedTab = ''
          }
        }
        this.checkAndSearchMore()
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this2 = this
        var props = this.props
        var chatNodes = []
        var previousParagraph = null
        this.firstShowmorelinkNodeKey = ''
        this.lastShowmorelinkNodeKey = ''
        props.uiData.ucUiStore
          .getChatList({
            chatType: props.panelType,
            chatCode: props.panelCode,
          })
          .forEach(function (chat, index) {
            if (chat.type === 'paragraph') {
              if (_this2.displayPeriodBegin && !_this2.firstScrollNodeKey) {
                var messageList = chat.messageList
                var lastMessage =
                  messageList && messageList[messageList.length - 1]
                var lastSentTimeValue = lastMessage && lastMessage.sentTimeValue
                if (
                  lastSentTimeValue &&
                  lastSentTimeValue >= _this2.displayPeriodBegin
                ) {
                  _this2.firstScrollNodeKey = (previousParagraph || chat).key
                }
              }
              chatNodes.push(
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                  _ChatParagraph.default,
                  {
                    ref: chat.key,
                    uiData: props.uiData,
                    panelType: props.panelType,
                    panelCode: props.panelCode,
                    paragraph: chat,
                    previousParagraph: previousParagraph,
                  },
                  chat.key,
                ),
              )
              previousParagraph = chat
            } else if (chat.type === 'showmorelink') {
              if (index === 0) {
                _this2.firstShowmorelinkNodeKey = chat.key
                _this2.first_showmorelink_id = chat.showmorelink_id
              } else {
                _this2.lastShowmorelinkNodeKey = chat.key
                _this2.last_showmorelink_id = chat.showmorelink_id
              }
              var showmorelinkEntry =
                props.uiData.ucUiStore.getShowmorelinkTable()[
                  chat.showmorelink_id
                ] || {}
              var isClickable =
                !_this2.autoReceiveMore && !showmorelinkEntry.nowReceiving
              var isError = showmorelinkEntry.errorType
              var isProgress = !isClickable && !isError
              var errorTitle =
                (_uawmsgs.default[showmorelinkEntry.errorType] ||
                  showmorelinkEntry.errorType) +
                (showmorelinkEntry.errorDetail
                  ? ' (' + showmorelinkEntry.errorDetail + ')'
                  : '')
              var icon = null
              if (isClickable) {
                icon = /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                  style: styles.showmorelinkIcon,
                  children:
                    index === 0
                      ? /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                          _ChevronUpIcon.default,
                          {
                            color: colors.darkGray,
                          },
                        )
                      : /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                          _ChevronDownIcon.default,
                          {
                            color: colors.darkGray,
                          },
                        ),
                })
              } else if (isError) {
                icon = /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                  style: styles.showmorelinkIcon,
                  children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                    _ErrorIcon.default,
                    {
                      color: colors.errorColor,
                    },
                  ),
                })
              } else if (isProgress && _this2.props.hasMore) {
                icon = /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                  style: styles.loadingSpinnerContainer,
                  children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                    _reactNative.ActivityIndicator,
                    {
                      size: 'small',
                      color: colors.mediumTurquoise,
                    },
                  ),
                })
              }
              chatNodes.push(
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                  _reactNative.TouchableOpacity,
                  {
                    ref: chat.key,
                    style: [
                      styles.showMoreLink,
                      !_this2.autoReceiveMore &&
                        !showmorelinkEntry.nowReceiving &&
                        styles.clickable,
                      showmorelinkEntry.errorType && styles.error,
                      showmorelinkEntry.nowReceiving && styles.progress,
                    ],
                    onPress: function onPress() {
                      return _this2.handleShowmorelinkClick(
                        chat.showmorelink_id,
                        index,
                      )
                    },
                    disabled: showmorelinkEntry.nowReceiving,
                    children: icon,
                  },
                  chat.key,
                ),
              )
            }
          })
        return /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.ScrollView, {
          ref: this.scrollViewRef,
          style: [
            styles.historyDetailArea,
            this.autoReceiveMore && styles.autoReceiveMore,
          ],
          onScroll: this.handleScroll,
          scrollEventThrottle: 16,
          nestedScrollEnabled: true,
          children: chatNodes,
        })
      },
    },
  ])
})(_react.default.Component))
var styles = _reactNative.StyleSheet.create({
  historyDetailArea: {
    flex: 1,
  },
  autoReceiveMore: {
    // backgroundColor: '#F5F5F5',
  },
  showMoreLink: {
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  showmorelinkIcon: {
    width: 24,
    height: 24,
  },
  clickable: {
    // backgroundColor: '#E5E5E5',
  },
  error: {
    // backgroundColor: '#FFE4E1',
  },
  progress: {
    // backgroundColor: '#F0F0F0',
  },
  showMoreLinkInner: {
    width: 20,
    height: 20,
    // borderRadius: 10,
    // backgroundColor: '#40E0D0',
  },
  loadingSpinnerContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
