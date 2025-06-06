'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _react = _interopRequireDefault(require('react'))
var _reactNative = require('react-native')
var _uawmsgs = _interopRequireDefault(require('../utilities/uawmsgs'))
var _constants = _interopRequireDefault(require('../utilities/constants'))
var _strings = require('../utilities/strings')
var _ButtonIconic = _interopRequireDefault(require('./ButtonIconic'))
var _ButtonLabeled = _interopRequireDefault(require('./ButtonLabeled'))
var _NameEmbeddedSpan = _interopRequireDefault(require('./NameEmbeddedSpan'))
var _TimerSpan = _interopRequireDefault(require('./TimerSpan'))
var _SimpleButton = _interopRequireDefault(require('./SimpleButton'))
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
 * WebchatQueueTable - React Native version
 * A component that displays webchat queue information in a table-like layout
 */
var WebchatQueueTable = (exports.default = /*#__PURE__*/ (function (
  _React$Component,
) {
  function WebchatQueueTable(props) {
    var _this
    _classCallCheck(this, WebchatQueueTable)
    _this = _callSuper(this, WebchatQueueTable, [props])
    _defineProperty(_this, 'onLayout', function (event) {
      var width = event.nativeEvent.layout.width
      if (width !== _this.state.containerWidth) {
        _this.setState(
          {
            containerWidth: width,
          },
          _this.checkAndUpdateColumnBounds,
        )
      }
    })
    var lastState = props.uiData.ucUiStore.getLocalStoragePreference({
      keyList: [
        props.resizerName + '_' + 'commandWidth',
        props.resizerName + '_' + 'agentWidth',
        props.resizerName + '_' + 'nameWidth',
      ],
    })
    _this.state = {
      commandWidth: (0, _strings.int)(lastState[0]) || 50,
      agentWidth: (0, _strings.int)(lastState[1]) || 70,
      nameWidth: (0, _strings.int)(lastState[2]) || 70,
      containerWidth: 0,
    }
    _this.commandPanResponder = _this.createColumnPanResponder('commandWidth')
    _this.agentPanResponder = _this.createColumnPanResponder('agentWidth')
    _this.namePanResponder = _this.createColumnPanResponder('nameWidth')
    return _this
  }
  _inherits(WebchatQueueTable, _React$Component)
  return _createClass(WebchatQueueTable, [
    {
      key: 'createColumnPanResponder',
      value: function createColumnPanResponder(columnKey) {
        var _this2 = this
        return _reactNative.PanResponder.create({
          onStartShouldSetPanResponder:
            function onStartShouldSetPanResponder() {
              return true
            },
          onMoveShouldSetPanResponder: function onMoveShouldSetPanResponder() {
            return true
          },
          onPanResponderGrant: function onPanResponderGrant() {
            _this2.startWidth = _this2.state[columnKey]
          },
          onPanResponderMove: function onPanResponderMove(evt, gestureState) {
            var newWidth = _this2.startWidth + gestureState.dx
            _this2.setState(_defineProperty({}, columnKey, newWidth))
          },
          onPanResponderRelease: function onPanResponderRelease() {
            _this2.props.uiData.ucUiAction.setLocalStoragePreference({
              keyValueList: [
                {
                  key: _this2.props.resizerName + '_' + columnKey,
                  value: (0, _strings.string)(_this2.state[columnKey]),
                },
              ],
            })
            _this2.checkAndUpdateColumnBounds()
          },
        })
      },
    },
    {
      key: 'checkAndUpdateColumnBounds',
      value: function checkAndUpdateColumnBounds() {
        var _this$state = this.state,
          containerWidth = _this$state.containerWidth,
          commandWidth = _this$state.commandWidth,
          agentWidth = _this$state.agentWidth,
          nameWidth = _this$state.nameWidth
        var bigStyle = this.props.bigStyle
        var newState = {}
        if (containerWidth > 0) {
          var commandWidthMin = bigStyle ? 100 : 50
          var commandWidthMax = bigStyle ? 190 : 50
          if (commandWidth < commandWidthMin) {
            newState.commandWidth = commandWidthMin
          } else if (commandWidth > commandWidthMax) {
            newState.commandWidth = commandWidthMax
          }
          var agentWidthMin = 50
          var agentWidthMax = 100
          if (agentWidth < agentWidthMin) {
            newState.agentWidth = agentWidthMin
          } else if (agentWidth > agentWidthMax) {
            newState.agentWidth = agentWidthMax
          }
          var nameWidthMin = 50
          var nameWidthMax = Math.max(
            nameWidthMin,
            containerWidth - commandWidthMin - agentWidthMin - 50,
          )
          if (nameWidth < nameWidthMin) {
            newState.nameWidth = nameWidthMin
          } else if (nameWidth > nameWidthMax) {
            newState.nameWidth = nameWidthMax
          }
        }
        if (Object.keys(newState).length > 0) {
          this.setState(newState)
        }
      },
    },
    {
      key: 'renderHeader',
      value: function renderHeader() {
        var _this$state2 = this.state,
          commandWidth = _this$state2.commandWidth,
          agentWidth = _this$state2.agentWidth,
          nameWidth = _this$state2.nameWidth
        return /*#__PURE__*/ _react.default.createElement(
          _reactNative.View,
          {
            style: styles.headerRow,
          },
          /*#__PURE__*/ _react.default.createElement(
            _reactNative.View,
            {
              style: [
                styles.headerCell,
                {
                  width: commandWidth,
                },
              ],
            },
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.View,
              _extends({}, this.commandPanResponder.panHandlers, {
                style: styles.resizeHandle,
              }),
            ),
          ),
          /*#__PURE__*/ _react.default.createElement(
            _reactNative.View,
            {
              style: [
                styles.headerCell,
                {
                  width: agentWidth,
                },
              ],
            },
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.Text,
              {
                style: styles.headerText,
              },
              _uawmsgs.default.LBL_WEBCHAT_QUEUE_TABLE_AGENT_COLUMN,
            ),
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.View,
              _extends({}, this.agentPanResponder.panHandlers, {
                style: styles.resizeHandle,
              }),
            ),
          ),
          /*#__PURE__*/ _react.default.createElement(
            _reactNative.View,
            {
              style: [
                styles.headerCell,
                {
                  width: nameWidth,
                },
              ],
            },
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.Text,
              {
                style: styles.headerText,
              },
              _uawmsgs.default.LBL_WEBCHAT_QUEUE_TABLE_NAME_COLUMN,
            ),
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.View,
              _extends({}, this.namePanResponder.panHandlers, {
                style: styles.resizeHandle,
              }),
            ),
          ),
          /*#__PURE__*/ _react.default.createElement(
            _reactNative.View,
            {
              style: styles.headerCell,
            },
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.Text,
              {
                style: styles.headerText,
              },
              _uawmsgs.default.LBL_WEBCHAT_QUEUE_TABLE_MESSAGE_COLUMN,
            ),
          ),
        )
      },
    },
    {
      key: 'renderQueueRow',
      value: function renderQueueRow(webchatQueue) {
        var _this$state3 = this.state,
          commandWidth = _this$state3.commandWidth,
          agentWidth = _this$state3.agentWidth,
          nameWidth = _this$state3.nameWidth
        var props = this.props
        var lines = Math.max(
          1,
          (0, _strings.int)(props.uiData.configurations.queueLines),
        )
        var agent = null
        if (webchatQueue.assigned.user_id) {
          agent = /*#__PURE__*/ _react.default.createElement(
            _NameEmbeddedSpan.default,
            {
              ucUiStore: props.uiData.ucUiStore,
              format: '{0}',
              title: '{0}',
              buddy: webchatQueue.assigned,
            },
          )
        } else if (
          webchatQueue.conf_status ===
          _constants.default.CONF_STATUS_INVITED_WEBCHAT
        ) {
          agent = /*#__PURE__*/ _react.default.createElement(
            _TimerSpan.default,
            {
              baseTime: webchatQueue.baseTime,
            },
          )
        }
        var profinfo = (0, _strings.string)(
          webchatQueue.webchatinfo.profinfo_formatted,
        )
        var profinfoLines = profinfo.split('\n').slice(0, lines)
        var messageTextLines = webchatQueue.messageList
          .slice(-lines)
          .map(function (msg) {
            return msg.ctype === _constants.default.CTYPE_TEXT
              ? (0, _strings.toPlainText)(msg.messageText)
              : ''
          })
          .filter(function (text) {
            return text
          })
        var messageFullText = webchatQueue.messageList.reduce(function (
          prev,
          curr,
        ) {
          return (
            prev +
            (curr.ctype === _constants.default.CTYPE_TEXT
              ? (0, _strings.toPlainText)(curr.messageText)
              : '') +
            '\n'
          )
        }, '')
        return /*#__PURE__*/ _react.default.createElement(
          _reactNative.View,
          {
            key: webchatQueue.conf_id,
            style: styles.row,
          },
          /*#__PURE__*/ _react.default.createElement(
            _reactNative.View,
            {
              style: [
                styles.cell,
                {
                  width: commandWidth,
                },
              ],
            },
            this.renderCommandButtons(webchatQueue),
          ),
          /*#__PURE__*/ _react.default.createElement(
            _reactNative.View,
            {
              style: [
                styles.cell,
                {
                  width: agentWidth,
                },
              ],
            },
            agent,
          ),
          /*#__PURE__*/ _react.default.createElement(
            _reactNative.View,
            {
              style: [
                styles.cell,
                {
                  width: nameWidth,
                },
              ],
            },
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.Text,
              {
                numberOfLines: lines,
                style: styles.profinfoText,
              },
              profinfoLines.join('\n'),
            ),
          ),
          /*#__PURE__*/ _react.default.createElement(
            _reactNative.View,
            {
              style: styles.cell,
            },
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.Text,
              {
                numberOfLines: lines,
                style: styles.messageText,
              },
              messageTextLines.join('\n'),
            ),
            this.renderHideButton(webchatQueue),
          ),
        )
      },
    },
    {
      key: 'renderCommandButtons',
      value: function renderCommandButtons(webchatQueue) {
        var props = this.props
        var isInvited =
          webchatQueue.conf_status ===
          _constants.default.CONF_STATUS_INVITED_WEBCHAT
        if (props.bigStyle) {
          return /*#__PURE__*/ _react.default.createElement(
            _reactNative.View,
            {
              style: styles.commandButtons,
            },
            /*#__PURE__*/ _react.default.createElement(
              _ButtonLabeled.default,
              {
                style: styles.commandButton,
                title: isInvited
                  ? _uawmsgs.default.LBL_WEBCHAT_ROOM_CHAT_BUTON_TOOLTIP
                  : _uawmsgs.default.LBL_WEBCHAT_ROOM_SHOW_BUTON_TOOLTIP,
                disabled:
                  !isInvited &&
                  webchatQueue.conf_status !==
                    _constants.default.CONF_STATUS_JOINED,
                vivid: isInvited,
                onPress: function onPress() {
                  return props.uiData.fire(
                    'webchatRoomChatButton_onClick',
                    webchatQueue.conf_id,
                  )
                },
              },
              isInvited
                ? _uawmsgs.default.LBL_WEBCHAT_ROOM_CHAT_BUTON
                : _uawmsgs.default.LBL_WEBCHAT_ROOM_SHOW_BUTON,
            ),
            /*#__PURE__*/ _react.default.createElement(
              _ButtonLabeled.default,
              {
                style: styles.commandButton,
                title: _uawmsgs.default.LBL_WEBCHAT_ROOM_JOIN_BUTON_TOOLTIP,
                disabled:
                  webchatQueue.conf_status !==
                  _constants.default.CONF_STATUS_INVITED,
                onPress: function onPress() {
                  return props.uiData.fire(
                    'webchatRoomJoinButton_onClick',
                    webchatQueue.conf_id,
                  )
                },
              },
              _uawmsgs.default.LBL_WEBCHAT_ROOM_JOIN_BUTON,
            ),
          )
        }
        return /*#__PURE__*/ _react.default.createElement(
          _reactNative.View,
          {
            style: styles.commandButtons,
          },
          /*#__PURE__*/ _react.default.createElement(
            _SimpleButton.default,
            {
              style: [
                styles.simpleButton,
                isInvited ? styles.chatButton : styles.showButton,
              ],
              title: isInvited
                ? _uawmsgs.default.LBL_WEBCHAT_ROOM_CHAT_BUTON_TOOLTIP
                : _uawmsgs.default.LBL_WEBCHAT_ROOM_SHOW_BUTON_TOOLTIP,
              disabled:
                !isInvited &&
                webchatQueue.conf_status !==
                  _constants.default.CONF_STATUS_JOINED,
              onPress: function onPress() {
                return props.uiData.fire(
                  'webchatRoomChatButton_onClick',
                  webchatQueue.conf_id,
                )
              },
            },
            isInvited
              ? /*#__PURE__*/ _react.default.createElement(Image, {
                  source: require('../images/webchatroomchat.png'),
                })
              : /*#__PURE__*/ _react.default.createElement(Image, {
                  source: require('../images/webchatroomshow.png'),
                }),
          ),
          /*#__PURE__*/ _react.default.createElement(
            _SimpleButton.default,
            {
              style: [styles.simpleButton, styles.joinButton],
              title: _uawmsgs.default.LBL_WEBCHAT_ROOM_JOIN_BUTON_TOOLTIP,
              disabled:
                webchatQueue.conf_status !==
                _constants.default.CONF_STATUS_INVITED,
              onPress: function onPress() {
                return props.uiData.fire(
                  'webchatRoomJoinButton_onClick',
                  webchatQueue.conf_id,
                )
              },
            },
            /*#__PURE__*/ _react.default.createElement(Image, {
              source: require('../images/webchatroomjoin.png'),
            }),
          ),
        )
      },
    },
    {
      key: 'renderHideButton',
      value: function renderHideButton(webchatQueue) {
        var props = this.props
        if (
          props.uiData.configurations.queueAll &&
          webchatQueue.conf_status === _constants.default.CONF_STATUS_INACTIVE
        ) {
          return /*#__PURE__*/ _react.default.createElement(
            _ButtonIconic.default,
            {
              style: styles.hideButton,
              iconName: 'close',
              title: _uawmsgs.default.LBL_WEBCHAT_ROOM_HIDE_BUTON_TOOLTIP,
              onPress: function onPress() {
                return props.uiData.fire(
                  'webchatRoomHideButton_onClick',
                  webchatQueue.conf_id,
                )
              },
            },
          )
        }
        return null
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this3 = this
        var props = this.props
        var queueList = props.uiData.ucUiStore.getWebchatQueueList()
        if (props.filter === 'INVITED_WEBCHAT') {
          queueList = queueList.filter(function (queue) {
            return (
              queue.conf_status ===
              _constants.default.CONF_STATUS_INVITED_WEBCHAT
            )
          })
        } else if (!props.uiData.configurations.queueAll) {
          queueList = queueList.filter(function (queue) {
            return (
              queue.conf_status !== _constants.default.CONF_STATUS_INACTIVE &&
              (queue.creator.conf_status ===
                _constants.default.CONF_STATUS_JOINED ||
                queue.creator.conf_status ===
                  _constants.default.CONF_STATUS_LEFT_UNANSWERED ||
                queue.from.conf_status ===
                  _constants.default.CONF_STATUS_JOINED ||
                queue.isTalking)
            )
          })
        }
        return /*#__PURE__*/ _react.default.createElement(
          _reactNative.View,
          {
            style: [
              styles.container,
              props.bigStyle && styles.bigStyle,
              props.resizerName && styles.columnResizable,
            ],
            onLayout: this.onLayout,
          },
          this.renderHeader(),
          /*#__PURE__*/ _react.default.createElement(
            _reactNative.ScrollView,
            null,
            queueList.map(function (queue) {
              return _this3.renderQueueRow(queue)
            }),
          ),
        )
      },
    },
  ])
})(_react.default.Component))
var colors = {
  platinum: '#E0E0E0',
  isabelline: '#EEEEEE',
  portlandOrange: '#FF4526',
}
var styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.platinum,
    borderBottomWidth: 1,
    borderBottomColor: colors.platinum,
    backgroundColor: '#FFFFFF',
  },
  headerCell: {
    position: 'relative',
    padding: 2,
    paddingHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  headerText: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 20.8,
    // 1.6 * 13
    letterSpacing: 0.3,
    textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
    height: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.platinum,
  },
  rowHover: {
    backgroundColor: colors.isabelline,
  },
  cell: {
    position: 'relative',
    padding: 2,
    paddingHorizontal: 4,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  cellText: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 20.8,
    letterSpacing: 0.3,
  },
  resizeHandle: {
    position: 'absolute',
    width: 16,
    height: '100%',
    right: -8,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  resizeHandleActive: {
    backgroundColor: colors.platinum,
  },
  commandButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  simpleButton: {
    width: 20,
    height: 20,
    marginRight: 2,
  },
  commandButton: {
    width: 80,
    margin: 4,
    marginLeft: 8,
  },
  agentIsMe: {
    color: colors.portlandOrange,
  },
  hideButton: {
    position: 'absolute',
    right: 4,
    top: '50%',
    transform: [
      {
        translateY: -10,
      },
    ],
  },
  bigStyle: {},
  commandColumn: {},
  bigStyleCommandColumn: {
    flexWrap: 'wrap',
  },
  columnResizable: {},
  messageText: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 20.8,
    letterSpacing: 0.3,
    color: '#424242',
  },
  profinfoText: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 20.8,
    letterSpacing: 0.3,
  },
})
