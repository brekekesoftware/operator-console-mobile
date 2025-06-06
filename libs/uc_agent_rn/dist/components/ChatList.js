'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _react = _interopRequireDefault(require('react'))
var _reactNative = require('react-native')
var _uawmsgs = _interopRequireDefault(require('../utilities/uawmsgs'))
var _strings = require('../utilities/strings')
var _ChatSysmsg = _interopRequireDefault(require('./ChatSysmsg'))
var _ChatParagraph = _interopRequireDefault(require('./ChatParagraph'))
var _ChatShowmorelink = _interopRequireDefault(require('./ChatShowmorelink'))
var _uiconstants = _interopRequireDefault(require('../utilities/uiconstants'))
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
function _regenerator() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e,
    t,
    r = 'function' == typeof Symbol ? Symbol : {},
    n = r.iterator || '@@iterator',
    o = r.toStringTag || '@@toStringTag'
  function i(r, n, o, i) {
    var c = n && n.prototype instanceof Generator ? n : Generator,
      u = Object.create(c.prototype)
    return (
      _regeneratorDefine2(
        u,
        '_invoke',
        (function (r, n, o) {
          var i,
            c,
            u,
            f = 0,
            p = o || [],
            y = !1,
            G = {
              p: 0,
              n: 0,
              v: e,
              a: d,
              f: d.bind(e, 4),
              d: function d(t, r) {
                return (i = t), (c = 0), (u = e), (G.n = r), a
              },
            }
          function d(r, n) {
            for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) {
              var o,
                i = p[t],
                d = G.p,
                l = i[2]
              r > 3
                ? (o = l === n) &&
                  ((c = i[4] || 3),
                  (u = i[5] === e ? i[3] : i[5]),
                  (i[4] = 3),
                  (i[5] = e))
                : i[0] <= d &&
                  ((o = r < 2 && d < i[1])
                    ? ((c = 0), (G.v = n), (G.n = i[1]))
                    : d < l &&
                      (o = r < 3 || i[0] > n || n > l) &&
                      ((i[4] = r), (i[5] = n), (G.n = l), (c = 0)))
            }
            if (o || r > 1) return a
            throw ((y = !0), n)
          }
          return function (o, p, l) {
            if (f > 1) throw TypeError('Generator is already running')
            for (
              y && 1 === p && d(p, l), c = p, u = l;
              (t = c < 2 ? e : u) || !y;

            ) {
              i ||
                (c
                  ? c < 3
                    ? (c > 1 && (G.n = -1), d(c, u))
                    : (G.n = u)
                  : (G.v = u))
              try {
                if (((f = 2), i)) {
                  if ((c || (o = 'next'), (t = i[o]))) {
                    if (!(t = t.call(i, u)))
                      throw TypeError('iterator result is not an object')
                    if (!t.done) return t
                    ;(u = t.value), c < 2 && (c = 0)
                  } else
                    1 === c && (t = i.return) && t.call(i),
                      c < 2 &&
                        ((u = TypeError(
                          "The iterator does not provide a '" + o + "' method",
                        )),
                        (c = 1))
                  i = e
                } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break
              } catch (t) {
                ;(i = e), (c = 1), (u = t)
              } finally {
                f = 1
              }
            }
            return { value: t, done: y }
          }
        })(r, o, i),
        !0,
      ),
      u
    )
  }
  var a = {}
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  t = Object.getPrototypeOf
  var c = [][n]
      ? t(t([][n]()))
      : (_regeneratorDefine2((t = {}), n, function () {
          return this
        }),
        t),
    u =
      (GeneratorFunctionPrototype.prototype =
      Generator.prototype =
        Object.create(c))
  function f(e) {
    return (
      Object.setPrototypeOf
        ? Object.setPrototypeOf(e, GeneratorFunctionPrototype)
        : ((e.__proto__ = GeneratorFunctionPrototype),
          _regeneratorDefine2(e, o, 'GeneratorFunction')),
      (e.prototype = Object.create(u)),
      e
    )
  }
  return (
    (GeneratorFunction.prototype = GeneratorFunctionPrototype),
    _regeneratorDefine2(u, 'constructor', GeneratorFunctionPrototype),
    _regeneratorDefine2(
      GeneratorFunctionPrototype,
      'constructor',
      GeneratorFunction,
    ),
    (GeneratorFunction.displayName = 'GeneratorFunction'),
    _regeneratorDefine2(GeneratorFunctionPrototype, o, 'GeneratorFunction'),
    _regeneratorDefine2(u),
    _regeneratorDefine2(u, o, 'Generator'),
    _regeneratorDefine2(u, n, function () {
      return this
    }),
    _regeneratorDefine2(u, 'toString', function () {
      return '[object Generator]'
    }),
    (_regenerator = function _regenerator() {
      return { w: i, m: f }
    })()
  )
}
function _regeneratorDefine2(e, r, n, t) {
  var i = Object.defineProperty
  try {
    i({}, '', {})
  } catch (e) {
    i = 0
  }
  ;(_regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) {
    if (r)
      i
        ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t })
        : (e[r] = n)
    else {
      var o = function o(r, n) {
        _regeneratorDefine2(e, r, function (e) {
          return this._invoke(r, n, e)
        })
      }
      o('next', 0), o('throw', 1), o('return', 2)
    }
  }),
    _regeneratorDefine2(e, r, n, t)
}
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value
  } catch (n) {
    return void e(n)
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o)
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments
    return new Promise(function (r, o) {
      var a = n.apply(t, e)
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, 'next', n)
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, 'throw', n)
      }
      _next(void 0)
    })
  }
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
 * ChatList
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.configurations
 * props.uiData.chatListOpenDetailLink_onClick
 * props.panelType
 * props.panelCode
 * props.onScrollRequested
 */
var _default = (exports.default = /*#__PURE__*/ (function (_React$Component) {
  function _default(_props) {
    var _this
    _classCallCheck(this, _default)
    _this = _callSuper(this, _default, [_props])
    _defineProperty(_this, 'measureNode', function (key) {
      return new Promise(function (resolve) {
        if (_this.refs[key] && _this.refs[key].measure) {
          _this.refs[key].measure(function (x, y, width, height, pageX, pageY) {
            resolve({
              top: pageY,
              height: height,
            })
          })
        } else {
          resolve(null)
        }
      })
    })
    _defineProperty(_this, 'handleLayout', function (key, event) {
      var _event$nativeEvent$la = event.nativeEvent.layout,
        y = _event$nativeEvent$la.y,
        height = _event$nativeEvent$la.height
      _this.nodeLayouts[key] = {
        top: y,
        height: height,
      }
    })
    _defineProperty(_this, 'parentScrolled', function (ev) {
      var props = _this.props
      if (ev.top < _this.lastScrollTop) {
        _this.scrolledUpwardManuallyFirst = true
      }
      _this.lastScrollTop = ev.top
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
      var chatShowmorelink =
        _this.firstShowmorelinkNodeKey &&
        _this.refs[_this.firstShowmorelinkNodeKey]
      if (
        ev &&
        chatShowmorelink &&
        ev.top < 40 &&
        !props.uiData.configurations.iconicShowmorelink
      ) {
        chatShowmorelink.handleClick && chatShowmorelink.handleClick()
      }
    })
    _this.firstShowmorelinkNodeKey = ''
    _this.secondNodeKey = ''
    _this.secondNodeTop = 0
    _this.soonAfterScrollTop = 0
    _this.scrolledUpwardManuallyFirst = false
    _this.lastScrollTop = 0
    _this.nodeLayouts = {}

    // Add refs object to store multiple refs
    _this.refs = {}
    return _this
  }
  _inherits(_default, _React$Component)
  return _createClass(_default, [
    {
      key: 'componentDidUpdate',
      value: (function () {
        var _componentDidUpdate = _asyncToGenerator(
          /*#__PURE__*/ _regenerator().m(function _callee() {
            var props, chatList, layout
            return _regenerator().w(
              function (_context) {
                while (1)
                  switch (_context.n) {
                    case 0:
                      props = this.props
                      if (!this.secondNodeKey) {
                        _context.n = 3
                        break
                      }
                      chatList = props.uiData.ucUiStore.getChatList({
                        chatType: props.panelType,
                        chatCode: props.panelCode,
                      })
                      if (
                        !(chatList[1] && chatList[1].key === this.secondNodeKey)
                      ) {
                        _context.n = 1
                        break
                      }
                      _context.n = 3
                      break
                    case 1:
                      _context.n = 2
                      return this.measureNode(this.secondNodeKey)
                    case 2:
                      layout = _context.v
                      if (layout) {
                        this.soonAfterScrollTop = 1
                        if (typeof props.onScrollRequested === 'function') {
                          props.onScrollRequested({
                            top: layout.top - this.secondNodeTop,
                          })
                        }
                      }
                      this.secondNodeKey = ''
                    case 3:
                      return _context.a(2)
                  }
              },
              _callee,
              this,
            )
          }),
        )
        function componentDidUpdate() {
          return _componentDidUpdate.apply(this, arguments)
        }
        return componentDidUpdate
      })(),
    },
    {
      key: 'savePositionBeforeReceiveMore',
      value: (function () {
        var _savePositionBeforeReceiveMore = _asyncToGenerator(
          /*#__PURE__*/ _regenerator().m(function _callee2() {
            var props, chatList, layout
            return _regenerator().w(
              function (_context2) {
                while (1)
                  switch (_context2.n) {
                    case 0:
                      props = this.props
                      if (!this.firstShowmorelinkNodeKey) {
                        _context2.n = 2
                        break
                      }
                      chatList = props.uiData.ucUiStore.getChatList({
                        chatType: props.panelType,
                        chatCode: props.panelCode,
                      })
                      if (
                        !(
                          chatList.length >= 2 &&
                          chatList[0].type === 'showmorelink'
                        )
                      ) {
                        _context2.n = 2
                        break
                      }
                      _context2.n = 1
                      return this.measureNode(chatList[1].key)
                    case 1:
                      layout = _context2.v
                      if (layout) {
                        this.secondNodeKey = chatList[1].key
                        this.secondNodeTop = layout.top
                      }
                    case 2:
                      return _context2.a(2)
                  }
              },
              _callee2,
              this,
            )
          }),
        )
        function savePositionBeforeReceiveMore() {
          return _savePositionBeforeReceiveMore.apply(this, arguments)
        }
        return savePositionBeforeReceiveMore
      })(),
    },
    {
      key: 'render',
      value: function render() {
        var _this2 = this
        var props = this.props
        var chatNodes = []
        var previousParagraph = null
        this.firstShowmorelinkNodeKey = ''
        var displayPeriodBegin = 0
        var filtered = false
        var messageCount = 0
        var showmorelinkTried = false
        if (
          props.uiData.configurations.displayPeriodEnabled &&
          props.panelType === 'CHAT'
        ) {
          var displayPeriod =
            (0, _strings.int)(
              props.uiData.ucUiStore.getOptionalSetting({
                key: 'display_period',
              }),
            ) || 15
          var now = new Date()
          var today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
          displayPeriodBegin = +today - (displayPeriod - 1) * 86400000
        }
        props.uiData.ucUiStore
          .getChatList({
            chatType: props.panelType,
            chatCode: props.panelCode,
          })
          .forEach(function (chat, index, array) {
            if (chat.type === 'sysmsg') {
              chatNodes.push(
                /*#__PURE__*/ _react.default.createElement(
                  _ChatSysmsg.default,
                  {
                    key: chat.key,
                    ref: function ref(_ref) {
                      return (_this2.refs[chat.key] = _ref)
                    },
                    uiData: props.uiData,
                    sysmsg: chat,
                    nextChat: array[index + 1],
                  },
                ),
              )
            } else if (chat.type === 'paragraph') {
              var paragraphFiltered = false
              if (displayPeriodBegin) {
                var messageList = chat.messageList
                var lastMessage =
                  messageList && messageList[messageList.length - 1]
                var lastSentTimeValue = lastMessage && lastMessage.sentTimeValue
                if (
                  lastSentTimeValue &&
                  lastSentTimeValue < displayPeriodBegin
                ) {
                  paragraphFiltered = true
                  filtered = true
                }
              }
              if (!paragraphFiltered) {
                chatNodes.push(
                  /*#__PURE__*/ _react.default.createElement(
                    _ChatParagraph.default,
                    {
                      key: chat.key,
                      ref: function ref(_ref2) {
                        return (_this2.refs[chat.key] = _ref2)
                      },
                      uiData: props.uiData,
                      panelType: props.panelType,
                      panelCode: props.panelCode,
                      paragraph: chat,
                      previousParagraph: previousParagraph,
                      isLast: index === array.length - 1,
                    },
                  ),
                )
                previousParagraph = chat
              }
              messageCount += (0, _strings.int)(
                chat.messageList && chat.messageList.length,
              )
            } else if (chat.type === 'showmorelink') {
              if (index === 0) {
                _this2.firstShowmorelinkNodeKey = chat.key
              }
              var showmorelinkEntry =
                props.uiData.ucUiStore.getShowmorelinkTable()[
                  chat.showmorelink_id
                ] || {}
              if (!showmorelinkEntry.nowReceiving && showmorelinkEntry.tried) {
                showmorelinkTried = true
              }
              chatNodes.push(
                /*#__PURE__*/ _react.default.createElement(
                  _ChatShowmorelink.default,
                  {
                    key: chat.key,
                    ref: function ref(_ref3) {
                      return (_this2.refs[chat.key] = _ref3)
                    },
                    uiData: props.uiData,
                    showmorelink: chat,
                    isFirst: index === 0,
                    isIconicShowmorelink:
                      props.uiData.configurations.iconicShowmorelink,
                    begin: displayPeriodBegin,
                    onClick: _this2.savePositionBeforeReceiveMore.bind(_this2),
                  },
                ),
              )
            }
          })
        var isFiltered =
          filtered ||
          (displayPeriodBegin &&
            messageCount < _uiconstants.default.SEARCH_PREV_NEXT_TEXTS_MAX &&
            showmorelinkTried)
        console.log('#Duy Phan console chatNodes', chatNodes.length)
        return /*#__PURE__*/ _react.default.createElement(
          _reactNative.View,
          {
            style: styles.brChatList,
          },
          !!isFiltered &&
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.TouchableOpacity,
              {
                style: styles.brChatListOpenDetailLink,
                onPress: function onPress() {
                  return props.uiData.fire(
                    'chatListOpenDetailLink_onClick',
                    props.panelType,
                    props.panelCode,
                  )
                },
                activeOpacity: 0.7,
              },
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.Text,
                {
                  style: styles.brChatListOpenDetailLinkText,
                },
                _uawmsgs.default.LBL_CHAT_LIST_OPEN_DETAIL_LINK_CONTENT,
              ),
            ),
          chatNodes.map(function (node) {
            return /*#__PURE__*/ _react.default.createElement(
              _reactNative.View,
              {
                key: node.key,
                ref: function ref(_ref4) {
                  return (_this2.refs[node.key] = _ref4)
                },
                onLayout: function onLayout(event) {
                  return _this2.handleLayout(node.key, event)
                },
              },
              node,
            )
          }),
        )
      },
    },
  ])
})(_react.default.Component))
var styles = _reactNative.StyleSheet.create({
  brChatList: {
    flex: 1,
    width: '100%',
  },
  brChatListOpenDetailLink: {
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brChatListOpenDetailLinkText: {
    color: '#74C365',
    fontSize: 13,
    fontWeight: '400',
    letterSpacing: 0.3,
  },
  brChatListOpenDetailLinkPressed: {
    backgroundColor: '#F5F5F5',
  },
})
