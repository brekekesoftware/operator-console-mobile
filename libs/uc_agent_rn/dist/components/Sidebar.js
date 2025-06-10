'use strict'

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
Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _react = _interopRequireDefault(require('react'))
var _uawmsgs = _interopRequireDefault(require('../utilities/uawmsgs'))
var _constants = _interopRequireDefault(require('../utilities/constants'))
var _strings = require('../utilities/strings')
var _ButtonIconic = _interopRequireDefault(require('./ButtonIconic'))
var _DndableSafe = _interopRequireDefault(require('./DndableSafe'))
var _MenuBalloonDialog = _interopRequireDefault(require('./MenuBalloonDialog'))
var _MenuItem = _interopRequireDefault(require('./MenuItem'))
var _NameEmbeddedSpan = _interopRequireDefault(require('./NameEmbeddedSpan'))
var _StatusIcon = _interopRequireDefault(require('./StatusIcon'))
var _TextBox = _interopRequireDefault(require('./TextBox'))
var _reactNative = require('react-native')
var _AboutIcon = _interopRequireDefault(require('../icons/AboutIcon'))
var _PhoneIcon = _interopRequireDefault(require('../icons/PhoneIcon'))
var _ConferenceForegroundSelectedIcon = _interopRequireDefault(
  require('../icons/ConferenceForegroundSelectedIcon'),
)
var _BroadcastingIcon = _interopRequireDefault(
  require('../icons/BroadcastingIcon'),
)
var _SendIcon = _interopRequireDefault(require('../icons/SendIcon'))
var _AddFolderIcon = _interopRequireDefault(require('../icons/AddFolderIcon'))
var _ListIcon = _interopRequireDefault(require('../icons/ListIcon'))
var _FiltrationIcon = _interopRequireDefault(require('../icons/FiltrationIcon'))
var _BinIcon = _interopRequireDefault(require('../icons/BinIcon'))
var _EditIcon = _interopRequireDefault(require('../icons/EditIcon'))
var _UserIcon = _interopRequireDefault(require('../icons/UserIcon'))
var _HistoryIcon = _interopRequireDefault(require('../icons/HistoryIcon'))
var _SettingsIcon = _interopRequireDefault(require('../icons/SettingsIcon'))
var _MoreIcon = _interopRequireDefault(require('../icons/MoreIcon'))
var _LogOutIcon = _interopRequireDefault(require('../icons/LogOutIcon'))
var _CheckIcon = _interopRequireDefault(require('../icons/CheckIcon'))
var _SquareIcon = _interopRequireDefault(require('../icons/SquareIcon'))
var _ChevronUpIcon = _interopRequireDefault(require('../icons/ChevronUpIcon'))
var _ChevronDownIcon = _interopRequireDefault(
  require('../icons/ChevronDownIcon'),
)
var _ChannelMosaic4Icon = _interopRequireDefault(
  require('../icons/ChannelMosaic4Icon'),
)
var _ChannelMosaic12Icon = _interopRequireDefault(
  require('../icons/ChannelMosaic12Icon'),
)
var _InternetIcon = _interopRequireDefault(require('../icons/InternetIcon'))
var _ChannelMosaic1Icon = _interopRequireDefault(
  require('../icons/ChannelMosaic1Icon'),
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
function _slicedToArray(r, e) {
  return (
    _arrayWithHoles(r) ||
    _iterableToArrayLimit(r, e) ||
    _unsupportedIterableToArray(r, e) ||
    _nonIterableRest()
  )
}
function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  )
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ('string' == typeof r) return _arrayLikeToArray(r, a)
    var t = {}.toString.call(r).slice(8, -1)
    return (
      'Object' === t && r.constructor && (t = r.constructor.name),
      'Map' === t || 'Set' === t
        ? Array.from(r)
        : 'Arguments' === t ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
          ? _arrayLikeToArray(r, a)
          : void 0
    )
  }
}
function _arrayLikeToArray(r, a) {
  ;(null == a || a > r.length) && (a = r.length)
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]
  return n
}
function _iterableToArrayLimit(r, l) {
  var t =
    null == r
      ? null
      : ('undefined' != typeof Symbol && r[Symbol.iterator]) || r['@@iterator']
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1
    try {
      if (((i = (t = t.call(r)).next), 0 === l)) {
        if (Object(t) !== t) return
        f = !1
      } else
        for (
          ;
          !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l);
          f = !0
        );
    } catch (r) {
      ;(o = !0), (n = r)
    } finally {
      try {
        if (!f && null != t.return && ((u = t.return()), Object(u) !== u))
          return
      } finally {
        if (o) throw n
      }
    }
    return a
  }
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r
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
} /**
 * Sidebar
 * props.uiData
 * props.uiData.ucUiAction
 * props.uiData.ucUiStore
 * props.uiData.configurations
 * props.uiData.runningAnimationTable
 * props.uiData.showingDialogVersion
 * props.uiData.mainAreaSplitters
 * props.uiData.currentSelectedTab
 * props.uiData.blinkingTabs
 * props.uiData.unscrolledTabs
 * props.uiData.showingDialog_update
 * props.uiData.sidebarBuddylistItem_onClick
 * props.uiData.sidebarBuddylistDndable_onDrop
 * props.uiData.sidebarBuddylistGroupTitle_onClick
 * props.uiData.sidebarBuddylistFilterOnlineOnlyCheckBox_onClick
 * props.uiData.sidebarBuddylistGroupRemoveDndable_onDrop
 * props.uiData.sidebarEditStatusDisplayButton_onClick
 * props.uiData.sidebarControlProfileStatusItem_onClick
 * props.uiData.sidebarPreferenceButton_onClick
 * props.uiData.sidebarHistoryButton_onClick
 * props.uiData.sidebarWebchatRequestsButton_onClick
 * props.uiData.sidebarServerPropertiesButton_onClick
 * props.uiData.sidebarAboutButton_onClick
 * props.uiData.sidebarCreateConferenceButton_onClick
 * props.uiData.sidebarSendBroadcastTextButton_onClick
 * props.uiData.sidebarExternalCallButton_onClick
 * props.uiData.sidebarCreateGroupButton_onClick
 * props.uiData.sidebarAreaSplitterItem_onClick
 * props.uiData.sidebarSignOutButton_onClick
 * props.style
 */
var _default = (exports.default = /*#__PURE__*/ (function (_React$Component) {
  function _default(props) {
    var _this
    _classCallCheck(this, _default)
    _this = _callSuper(this, _default, [props])
    _this.interval = null
    _this.delay = 0
    _this.collapsibleControlButtonsCount = 0

    // Add refs
    _this.controlProfileRef = /*#__PURE__*/ _react.default.createRef()
    _this.areaSplitterButtonRef = /*#__PURE__*/ _react.default.createRef()
    _this.signOutButtonRef = /*#__PURE__*/ _react.default.createRef()
    _this.state = {
      buddylistFilterShowingDialogVersion: null,
      controlProfileShowingDialogVersion: null,
      areaSplitterShowingDialogVersion: null,
      controlButtonsCollapsedMenuShowingDialogVersion: null,
      buddylistFilterInputValue: '',
      controlButtonsCollapsedCount: 0,
    }
    _this.statusDisplayAnim = new _reactNative.Animated.Value(0)
    return _this
  }
  _inherits(_default, _React$Component)
  return _createClass(_default, [
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        var _this2 = this
        var props = this.props
        var newState = {}

        // Get measurements using onLayout
        Promise.all([
          new Promise(function (resolve) {
            if (_this2.controlProfileRef.current) {
              _this2.controlProfileRef.current.measure(
                function (x, y, width, height, pageX, pageY) {
                  resolve(pageY) // This is equivalent to offsetTop
                },
              )
            } else {
              resolve(0)
            }
          }),
          new Promise(function (resolve) {
            if (_this2.areaSplitterButtonRef.current) {
              _this2.areaSplitterButtonRef.current.measure(
                function (x, y, width, height, pageX, pageY) {
                  resolve(pageY + height) // This is equivalent to offsetTop + offsetHeight
                },
              )
            } else {
              resolve(0)
            }
          }),
          new Promise(function (resolve) {
            if (_this2.signOutButtonRef.current) {
              _this2.signOutButtonRef.current.measure(
                function (x, y, width, height, pageX, pageY) {
                  resolve(pageY + height) // This is equivalent to offsetTop + offsetHeight
                },
              )
            } else {
              resolve(0)
            }
          }),
        ]).then(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 3),
            controlProfileY1 = _ref2[0],
            areaSplitterButtonY2 = _ref2[1],
            signOutButtonY2 = _ref2[2]
          if (
            controlProfileY1 - signOutButtonY2 < 0 &&
            _this2.state.controlButtonsCollapsedCount <
              _this2.collapsibleControlButtonsCount - 1
          ) {
            newState.controlButtonsCollapsedCount =
              _this2.state.controlButtonsCollapsedCount + 1
          } else if (
            controlProfileY1 - signOutButtonY2 >=
              signOutButtonY2 - areaSplitterButtonY2 &&
            _this2.state.controlButtonsCollapsedCount > 0
          ) {
            newState.controlButtonsCollapsedCount =
              _this2.state.controlButtonsCollapsedCount - 1
          }
          if (Object.keys(newState).length) {
            _this2.setState(newState)
          }
        })
        if (this.interval) {
          clearInterval(this.interval)
          this.interval = null
        }
        if (this.delay) {
          this.interval = setInterval(this.setState.bind(this, {}), this.delay)
        }
      },
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (this.interval) {
          clearInterval(this.interval)
          this.interval = null
        }
      },
    },
    {
      key: 'handleBuddylistFilterInputTextBoxChange',
      value: function handleBuddylistFilterInputTextBoxChange(ev) {
        var props = this.props
        this.setState({
          buddylistFilterInputValue: (0, _strings.string)(ev.target.value),
        })
      },
    },
    {
      key: 'handleBuddylistFilterButtonClick',
      value: function handleBuddylistFilterButtonClick(ev) {
        var props = this.props
        if (
          props.uiData.showingDialogVersion !==
          this.state.buddylistFilterShowingDialogVersion
        ) {
          this.setState({
            buddylistFilterShowingDialogVersion: ++props.uiData
              .showingDialogVersion,
          })
          ev.stopPropagation()
          props.uiData.fire('showingDialog_update')
        }
      },
    },
    {
      key: 'handleControlProfileClick',
      value: function handleControlProfileClick(ev) {
        var props = this.props
        if (
          props.uiData.showingDialogVersion !==
          this.state.controlProfileShowingDialogVersion
        ) {
          this.setState({
            controlProfileShowingDialogVersion: ++props.uiData
              .showingDialogVersion,
          })
          ev.stopPropagation()
          props.uiData.fire('showingDialog_update')
        }
        props.uiData.ucUiAction.uncacheProfileImageUrl({
          minSignInOKCount: 2,
        })
      },
    },
    {
      key: 'handleControlProfileBalloonDialogClick',
      value: function handleControlProfileBalloonDialogClick(ev) {
        var props = this.props
        if (
          ev &&
          ev.target &&
          ev.target.matches &&
          ev.target.matches(
            '.brControlProfileStatusItem,.brControlProfileStatusItem *',
          )
        ) {
          ev.stopPropagation()
        }
      },
    },
    {
      key: 'handleControlButtonsCollapsedMenuButtonClick',
      value: function handleControlButtonsCollapsedMenuButtonClick(ev) {
        var props = this.props
        if (
          props.uiData.showingDialogVersion !==
          this.state.controlButtonsCollapsedMenuShowingDialogVersion
        ) {
          this.setState({
            controlButtonsCollapsedMenuShowingDialogVersion: ++props.uiData
              .showingDialogVersion,
          })
          ev.stopPropagation()
          props.uiData.fire('showingDialog_update')
        }
      },
    },
    {
      key: 'handleAreaSplitterButtonClick',
      value: function handleAreaSplitterButtonClick(ev) {
        var props = this.props
        if (
          props.uiData.showingDialogVersion !==
          this.state.areaSplitterShowingDialogVersion
        ) {
          this.setState({
            areaSplitterShowingDialogVersion: ++props.uiData
              .showingDialogVersion,
          })
          ev.stopPropagation()
          props.uiData.fire('showingDialog_update')
        }
      },
    },
    {
      key: 'animateStatusDisplay',
      value: function animateStatusDisplay() {
        _reactNative.Animated.sequence([
          _reactNative.Animated.timing(this.statusDisplayAnim, {
            toValue: -30,
            duration: 1000,
            useNativeDriver: true,
          }),
          _reactNative.Animated.delay(1000),
          _reactNative.Animated.timing(this.statusDisplayAnim, {
            toValue: -60,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]).start()
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this3 = this,
          _configProperties$opt
        var props = this.props
        var profile = props.uiData.ucUiStore.getChatClient().getProfile()
        var buddylist = props.uiData.ucUiStore.getChatClient().getBuddylist()
        var configProperties = props.uiData.ucUiStore.getConfigProperties()
        var userMe = props.uiData.ucUiStore.getBuddyUserForUi(profile)
        var statusMe = props.uiData.ucUiStore.getChatClient().getStatus()
        var statusList =
          props.uiData.ucUiStore.getSignInStatus() === 3
            ? [
                {
                  status: _constants.default.STATUS_AVAILABLE,
                  label: _uawmsgs.default.CMN_OWN_STATUS_STRING_AVAILABLE,
                },
                {
                  status: _constants.default.STATUS_OFFLINE,
                  label: _uawmsgs.default.CMN_OWN_STATUS_STRING_INVISIBLE,
                },
                {
                  status: _constants.default.STATUS_BUSY,
                  label: _uawmsgs.default.CMN_OWN_STATUS_STRING_BUSY,
                },
              ]
            : [
                {
                  status: _constants.default.STATUS_OFFLINE,
                  label: _uawmsgs.default.CMN_OWN_STATUS_STRING_OFFLINE,
                },
              ]
        var BUDDYLIST_ITEM_HEIGHT = 58
        var nameDisplayMode = (0, _strings.int)(
          props.uiData.ucUiStore.getOptionalSetting({
            key: ['name_display_mode'],
          }),
        )
        var displayCallStatus = (0, _strings.int)(
          props.uiData.ucUiStore.getOptionalSetting({
            key: ['display_call_status'],
          }),
        )
        var onlineOnly = props.uiData.ucUiStore.getLocalStoragePreference({
          keyList: ['onlineOnly'],
        })[0]
        var buddylistOpenList = props.uiData.ucUiStore
          .getLocalStoragePreference({
            keyList: ['buddylistOpenList'],
          })[0]
          .split(',')
        var buddyTable =
          props.uiData.ucUiStore.getBuddyTable()[profile.tenant] || {}
        var buddies = Object.keys(buddyTable)
          .map(function (key) {
            return buddyTable[key]
          })
          .filter(function (buddy) {
            return !buddy.isMe && buddy.isBuddy && !buddy.isTemporaryBuddy
          })
          .sort(function (buddy1, buddy2) {
            return (
              (0, _strings.int)(buddy1.buddyIndex) -
              (0, _strings.int)(buddy2.buddyIndex)
            )
          })
        var groupTable = {}
        this.delay = 0
        buddies.forEach(function (buddy) {
          var _status$ui_customized,
            _status$ui_customized2,
            _status$ui_customized3,
            _status$ui_customized4
          var groupName = (0, _strings.string)(buddy.group)
          if (!groupTable[groupName]) {
            groupTable[groupName] = {
              groupIndex: (0, _strings.int)(buddy.groupIndex),
              buddyNodes: [],
              height: 0,
              onlines: 0,
            }
          }
          var panelCode = JSON.stringify({
            tenant: buddy.tenant,
            user_id: buddy.user_id,
          })
          var selected =
            props.uiData.currentSelectedTab === 'CHAT' + '_' + panelCode
          var user = props.uiData.ucUiStore.getBuddyUserForUi(buddy) || {}
          var status = props.uiData.getCurrentBuddyStatus(buddy) || {}
          var height = BUDDYLIST_ITEM_HEIGHT
          if (
            onlineOnly &&
            status.status === _constants.default.STATUS_OFFLINE
          ) {
            height = 0
          }
          if (
            _this3.state.buddylistFilterInputValue &&
            (0, _strings.string)(user.name)
              .toLowerCase()
              .indexOf(
                (0, _strings.string)(
                  _this3.state.buddylistFilterInputValue,
                ).toLowerCase(),
              ) === -1
          ) {
            height = 0
          }
          var messageObject =
            (
              (
                props.uiData.ucUiStore
                  .getChatList({
                    chatType: 'CHAT',
                    chatCode: panelCode,
                  })
                  .filter(function (chat) {
                    return chat.type === 'paragraph'
                  })
                  .pop() || {}
              ).messageList || []
            ).pop() || {} // TODO: yano
          var message = ''
          if (messageObject.ctype === _constants.default.CTYPE_FILE_REQUEST) {
            message = (0, _strings.string)(
              messageObject.messageFile && messageObject.messageFile.name,
            )
          } else if (
            messageObject.ctype === _constants.default.CTYPE_CALL_RESULT
          ) {
            try {
              var callResult = JSON.parse(messageObject.messageText) || {}
              var senderUser =
                (!callResult.externalincoming &&
                  props.uiData.ucUiStore.getBuddyUserForUi(
                    messageObject.senderInfo,
                  )) ||
                {}
              var min = Math.floor(
                (0, _strings.int)(callResult.talklen) / 60000,
              )
              var sec =
                0 < callResult.talklen && callResult.talklen < 1000
                  ? 1
                  : Math.floor(
                      ((0, _strings.int)(callResult.talklen) % 60000) / 1000,
                    )
              if (senderUser.isMe || callResult.talklen) {
                message =
                  _uawmsgs.default.LBL_SIDEBAR_BUDDYLIST_ITEM_CALL + ' \xA0 '
                message +=
                  min > 0
                    ? (0, _strings.formatStr)(
                        _uawmsgs.default
                          .LBL_SIDEBAR_BUDDYLIST_ITEM_CALL_RESULT_LENGTH_MIN,
                        min,
                        sec,
                      )
                    : (0, _strings.formatStr)(
                        _uawmsgs.default
                          .LBL_SIDEBAR_BUDDYLIST_ITEM_CALL_RESULT_LENGTH_SEC,
                        sec,
                      )
              } else {
                message =
                  _uawmsgs.default
                    .LBL_SIDEBAR_BUDDYLIST_ITEM_CALL_RESULT_DIRECTION_INCOMING_MISSED
              }
            } catch (ex) {}
          } else if (messageObject.ctype === _constants.default.CTYPE_OBJECT) {
          } else {
            message = (0, _strings.toPlainText)(messageObject.messageText)
          }
          var time = ''
          if (messageObject.sentTimeValue) {
            var timeValue = +new Date() - messageObject.sentTimeValue
            if (timeValue < 60000) {
              time = ''
              if (!_this3.delay || _this3.delay > 60000) {
                _this3.delay = 60000
              }
            } else if (timeValue < 3600000) {
              time = (0, _strings.formatStr)(
                _uawmsgs.default.CMN_FORMAT_MINUTES_AGO,
                (0, _strings.int)(timeValue / 60000),
              )
              if (!_this3.delay || _this3.delay > 60000) {
                _this3.delay = 60000
              }
            } else if (timeValue < 86400000) {
              time = (0, _strings.formatStr)(
                _uawmsgs.default.CMN_FORMAT_HOURS_AGO,
                (0, _strings.int)(timeValue / 3600000),
              )
              if (!_this3.delay || _this3.delay > 3600000) {
                _this3.delay = 3600000
              }
            } else {
              var sentTimeDate = new Date(messageObject.sentTimeValue)
              var year = sentTimeDate.getFullYear()
              var monthNum = sentTimeDate.getMonth() + 1
              var day = sentTimeDate.getDate()
              time = (0, _strings.formatStr)(
                _uawmsgs.default.CMN_FORMAT_DATE,
                year,
                monthNum,
                day,
                _uawmsgs.default['CMN_MONTH_STR_' + ('0' + monthNum).slice(-2)],
              )
            }
          }
          var unread =
            (0, _strings.int)(
              props.uiData.blinkingTabs['CHAT' + '_' + panelCode],
            ) +
            (0, _strings.int)(
              props.uiData.unscrolledTabs['CHAT' + '_' + panelCode],
            )
          if (!groupName || buddylistOpenList.indexOf(groupName) !== -1) {
            groupTable[groupName].height += height
          }
          if (status.status !== _constants.default.STATUS_OFFLINE) {
            groupTable[groupName].onlines++
          }
          groupTable[groupName].buddyNodes.push(
            /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
              _DndableSafe.default,
              {
                uiData: props.uiData,
                style: [
                  styles.brBuddylistItem,
                  displayCallStatus & 1 && styles.brWithColor,
                  displayCallStatus & 2 && styles.brWithIcon,
                  ((_status$ui_customized = status.ui_customized_status) ===
                    null || _status$ui_customized === void 0
                    ? void 0
                    : _status$ui_customized.callStatus) > 0 &&
                    styles.brCallStatus,
                  ((_status$ui_customized2 = status.ui_customized_status) ===
                    null || _status$ui_customized2 === void 0
                    ? void 0
                    : _status$ui_customized2.conferenceStatus) >= 1 &&
                    ((_status$ui_customized3 = status.ui_customized_status) ===
                      null || _status$ui_customized3 === void 0
                      ? void 0
                      : _status$ui_customized3.conferenceStatus) < 100 &&
                    styles.brConferenceStatus,
                  ((_status$ui_customized4 = status.ui_customized_status) ===
                    null || _status$ui_customized4 === void 0
                    ? void 0
                    : _status$ui_customized4.conferenceStatus) >= 100 &&
                    styles.brConferenceStatusWebchat,
                  selected && styles.brSelected,
                  status.status === _constants.default.STATUS_OFFLINE &&
                    styles.brOffline,
                  {
                    height: height,
                  },
                ],
                dragSourceInfo: {
                  dragSourceInfoType: 'buddylistItem',
                  dragSourceInfoCode: panelCode,
                },
                onCheckCanDrop: function onCheckCanDrop(ev) {
                  return (
                    configProperties.buddy_mode !==
                      _constants.default.BUDDY_MODE_AUTO &&
                    ev.dragSourceInfo &&
                    ev.dragSourceInfo.dragSourceInfoType === 'buddylistItem' &&
                    ev.dragSourceInfo.dragSourceInfoCode !== panelCode
                  )
                },
                onDrop: function onDrop() {
                  return props.uiData.fire('sidebarBuddylistDndable_onDrop', {
                    dropTargetInfoType: 'buddylistItem',
                    dropTargetInfoCode: panelCode,
                  })
                },
                onPress: function onPress() {
                  return props.uiData.fire('sidebarBuddylistItem_onClick', {
                    tenant: buddy.tenant,
                    user_id: buddy.user_id,
                  })
                },
                children: [
                  /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                    style: styles.brBuddylistItemHeader,
                    children: [
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                        _NameEmbeddedSpan.default,
                        {
                          ucUiStore: props.uiData.ucUiStore,
                          format: '{0}'.concat(
                            nameDisplayMode === 1
                              ? ' ('.concat(buddy.user_id, ')')
                              : '',
                          ),
                          title: '{0}'
                            .concat(
                              nameDisplayMode === 1
                                ? ' ('.concat(buddy.user_id, ') ')
                                : ' ',
                            )
                            .concat((0, _strings.string)(status.display)),
                          buddy: buddy,
                        },
                      ),
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_PhoneIcon.default, {
                        width: 16,
                        height: 16,
                      }),
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                        style: {
                          marginHorizontal: 4,
                        },
                        children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                          _ConferenceForegroundSelectedIcon.default,
                          {
                            width: 16,
                            height: 16,
                          },
                        ),
                      }),
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                        style: {
                          marginHorizontal: 4,
                        },
                        children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                          _InternetIcon.default,
                          {
                            width: 16,
                            height: 16,
                          },
                        ),
                      }),
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                        style: styles.brBuddylistItemInfo,
                        accessibilityLabel: (0, _strings.string)(
                          status.display,
                        ),
                        children: (0, _strings.string)(status.display),
                      }),
                    ],
                  }),
                  /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                    style: styles.brBuddylistItemMessage,
                    children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                      _reactNative.Text,
                      {
                        style: styles.brBuddylistItemInfo,
                        accessibilityLabel: message,
                        numberOfLines: 1,
                        children: message,
                      },
                    ),
                  }),
                  /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                    style: styles.brBuddylistItemTime,
                    children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                      _reactNative.Text,
                      {
                        style: styles.brBuddylistItemInfo,
                        accessibilityLabel: (0, _strings.formatMessageDateTime)(
                          messageObject.sentTimeValue,
                        ),
                        children: time,
                      },
                    ),
                  }),
                  /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                    style: styles.brBuddylistItemMarker,
                  }),
                  unread
                    ? /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                        style: styles.brBuddylistItemUnread,
                        children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                          _reactNative.Text,
                          {
                            style: styles.brBuddylistItemInfo,
                            children: unread,
                          },
                        ),
                      })
                    : null,
                  /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                    _reactNative.TouchableOpacity,
                    {
                      style: [
                        styles.brBuddylistItemImage,
                        !buddy.profile_image_url && styles.brNoImage,
                        buddy.profile_image_url &&
                          (0, _strings.string)(buddy.profile_image_url).indexOf(
                            _constants.default.PROFILE_IMAGE_URL_DOWNLOAD,
                          ) === -1 &&
                          styles.brMyProfileImageUrl,
                        status.status === _constants.default.STATUS_OFFLINE &&
                          styles.brOffline,
                      ],
                      accessibilityLabel: (0, _strings.string)(user.name),
                      onPress: function onPress() {
                        return props.uiData.ucUiAction.uncacheProfileImageUrl({
                          minSignInOKCount: 1,
                          uncacheParam2: (0, _strings.int)(
                            Date.now() / 3600000,
                          ),
                        })
                      },
                      children:
                        buddy.profile_image_url &&
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Image, {
                          source: {
                            uri: buddy.profile_image_url,
                          },
                          style: styles.profileImage,
                        }),
                    },
                  ),
                  /*#__PURE__*/ (0, _jsxRuntime.jsx)(_StatusIcon.default, {
                    style: styles.brBuddylistItemStatusIcon,
                    status: status.status,
                    degree: status.degree,
                  }),
                ],
              },
              panelCode,
            ),
          )
        })
        ;[
          {
            id: '',
          },
        ]
          .concat(buddylist.user)
          .forEach(function (buddy, index) {
            if (
              buddy &&
              typeof buddy.id === 'string' &&
              !groupTable[buddy.id]
            ) {
              // add empty group
              groupTable[buddy.id] = {
                groupIndex: index - 1,
                buddyNodes: [],
                height: 0,
                onlines: 0,
              }
            }
          })
        var groupNodes = Object.keys(groupTable)
          .sort(function (groupName1, groupName2) {
            return (
              (groupTable[groupName1].groupIndex >>> 0) -
              (groupTable[groupName2].groupIndex >>> 0)
            )
          })
          .map(function (groupName) {
            return /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
              _reactNative.View,
              {
                style: styles.brBuddylistGroup,
                children: [
                  /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_DndableSafe.default, {
                    uiData: props.uiData,
                    style: [
                      styles.brBuddylistGroupTitle,
                      groupName && styles.brGroupName,
                    ],
                    dragSourceInfo: {
                      dragSourceInfoType: 'buddylistGroupTitle',
                      dragSourceInfoCode: groupName,
                    },
                    onCheckCanDrop: function onCheckCanDrop(ev) {
                      return (
                        configProperties.buddy_mode !==
                          _constants.default.BUDDY_MODE_AUTO &&
                        ev.dragSourceInfo &&
                        (ev.dragSourceInfo.dragSourceInfoType ===
                          'buddylistItem' ||
                          (ev.dragSourceInfo.dragSourceInfoType ===
                            'buddylistGroupTitle' &&
                            ev.dragSourceInfo.dragSourceInfoCode !==
                              groupName &&
                            ev.dragSourceInfo.dragSourceInfoCode &&
                            groupName))
                      )
                    },
                    onDrop: function onDrop() {
                      return props.uiData.fire(
                        'sidebarBuddylistDndable_onDrop',
                        {
                          dropTargetInfoType: 'buddylistGroupTitle',
                          dropTargetInfoCode: groupName,
                        },
                      )
                    },
                    onPress: function onPress() {
                      return props.uiData.fire(
                        'sidebarBuddylistGroupTitle_onClick',
                        groupName,
                      )
                    },
                    children: [
                      /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                        style: styles.brBuddylistGroupLabel,
                        children: [
                          /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _reactNative.Text,
                            {
                              style: styles.brBuddylistGroupName,
                              children: groupName,
                            },
                          ),
                          /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _reactNative.Text,
                            {
                              style: styles.brBuddylistGroupOnlines,
                              children: groupTable[groupName].buddyNodes.length
                                ? ' '
                                    .concat(groupTable[groupName].onlines, '/')
                                    .concat(
                                      groupTable[groupName].buddyNodes.length,
                                    )
                                : '',
                            },
                          ),
                        ],
                      }),
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                        style: {
                          marginLeft: 4,
                        },
                        children:
                          buddylistOpenList.indexOf(groupName) !== -1
                            ? /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                _ChevronUpIcon.default,
                                {
                                  width: 16,
                                  height: 16,
                                },
                              )
                            : /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                _ChevronDownIcon.default,
                                {
                                  width: 16,
                                  height: 16,
                                },
                              ),
                      }),
                    ],
                  }),
                  /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                    style: [
                      styles.brBuddylistItems,
                      {
                        height: groupTable[groupName].height,
                      },
                    ],
                    children: groupTable[groupName].buddyNodes,
                  }),
                ],
              },
              groupName,
            )
          })
        var collapsibleControlButtons = [
          /*#__PURE__*/ (0, _jsxRuntime.jsx)(
            _ButtonIconic.default,
            {
              style: [styles.brControlButton, styles.brCreateConferenceButton],
              iconSource: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                _ConferenceForegroundSelectedIcon.default,
                {},
              ),
              accessibilityLabel:
                _uawmsgs.default.LBL_SIDEBAR_CREATE_CONFERENCE_BUTTON_TOOLTIP,
              onPress: function onPress() {
                return props.uiData.fire(
                  'sidebarCreateConferenceButton_onClick',
                )
              },
            },
            'createConferenceButton',
          ),
          /*#__PURE__*/ (0, _jsxRuntime.jsx)(
            _ButtonIconic.default,
            {
              style: [styles.brControlButton, styles.brSendBroadcastTextButton],
              iconSource: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                _BroadcastingIcon.default,
                {},
              ),
              accessibilityLabel:
                _uawmsgs.default.LBL_SIDEBAR_SEND_BROADCAST_TEXT_BUTTON_TOOLTIP,
              onPress: function onPress() {
                return props.uiData.fire(
                  'sidebarSendBroadcastTextButton_onClick',
                )
              },
            },
            'sendBroadcastTextButton',
          ),
          /*#__PURE__*/ (0, _jsxRuntime.jsx)(
            _ButtonIconic.default,
            {
              style: [styles.brControlButton, styles.brExternalCallButton],
              iconSource: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                _PhoneIcon.default,
                {
                  width: 16,
                  height: 16,
                },
              ),
              accessibilityLabel:
                _uawmsgs.default.LBL_SIDEBAR_EXTERNAL_CALL_BUTTON_TOOLTIP,
              onPress: function onPress() {
                return props.uiData.fire('sidebarExternalCallButton_onClick')
              },
            },
            'externalCallButton',
          ),
        ]
        if (
          (
            (configProperties === null ||
            configProperties === void 0 ||
            (_configProperties$opt = configProperties.optional_config) ===
              null ||
            _configProperties$opt === void 0
              ? void 0
              : _configProperties$opt.awsl) || []
          ).some(function (aws) {
            var _aws$og$reply_types
            return (
              aws.og &&
              !aws.og.disabled &&
              ((_aws$og$reply_types = aws.og.reply_types) === null ||
              _aws$og$reply_types === void 0
                ? void 0
                : _aws$og$reply_types.length) &&
              aws.senders
            )
          })
        ) {
          collapsibleControlButtons.push(
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
              _ButtonIconic.default,
              {
                style: [styles.brControlButton, styles.brOutgoingWebchatButton],
                iconSource: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                  _SendIcon.default,
                  {},
                ),
                accessibilityLabel:
                  _uawmsgs.default.LBL_SIDEBAR_OUTGOING_WEBCHAT_BUTTON_TOOLTIP,
                onPress: function onPress() {
                  return props.uiData.fire(
                    'sidebarOutgoingWebchatButton_onClick',
                  )
                },
              },
              'outgoingWebchatButton',
            ),
          )
        }
        if (
          configProperties.buddy_mode !== _constants.default.BUDDY_MODE_AUTO
        ) {
          collapsibleControlButtons.push(
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
              _ButtonIconic.default,
              {
                style: [styles.brControlButton, styles.brCreateGroupButton],
                iconSource: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                  _AddFolderIcon.default,
                  {},
                ),
                accessibilityLabel:
                  _uawmsgs.default.LBL_SIDEBAR_CREATE_GROUP_BUTTON_TOOLTIP,
                onPress: function onPress() {
                  return props.uiData.fire('sidebarCreateGroupButton_onClick')
                },
              },
              'createGroupButton',
            ),
          )
        }
        var userListButtonType = (0, _strings.int)(
          props.uiData.configurations.userListButtonType,
        )
        var allUsersCount = (
          (props.uiData.ucUiStore.getChatClient().getAllUsers() || {}).user ||
          []
        ).filter(function (u) {
          return !u.disabledBuddy && u.user_id !== profile.user_id
        }).length
        var buddy_max = (0, _strings.int)(
          props.uiData.ucUiStore.getOptionalSetting({
            key: 'buddy_max',
          }),
        )
        if (
          !(
            userListButtonType === 2 ||
            (userListButtonType === 1 &&
              configProperties.buddy_mode !==
                _constants.default.BUDDY_MODE_MANUAL &&
              !buddylist.screened &&
              allUsersCount <= buddy_max)
          )
        ) {
          collapsibleControlButtons.push(
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
              _ButtonIconic.default,
              {
                style: [
                  styles.brControlButton,
                  styles.brUserListButton,
                  statusMe.status !== _constants.default.STATUS_OFFLINE &&
                    !buddylist.screened &&
                    allUsersCount > buddy_max &&
                    styles.brOver,
                ],
                iconSource: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                  _ListIcon.default,
                  {},
                ),
                accessibilityLabel:
                  _uawmsgs.default.LBL_SIDEBAR_USER_LIST_BUTTON_TOOLTIP,
                onPress: function onPress() {
                  return props.uiData.fire('sidebarUserListButton_onClick')
                },
              },
              'userListButton',
            ),
          )
        }
        this.collapsibleControlButtonsCount = collapsibleControlButtons.length
        return /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: [
            styles.brSidebar,
            this.state.controlButtonsCollapsedCount &&
              styles.brControlButtonsCollapsible,
            this.state.controlButtonsCollapsedCount &&
              _objectSpread(
                {},
                styles[
                  'brControlButtonsCollapsedCount'.concat(
                    this.state.controlButtonsCollapsedCount,
                  )
                ],
              ),
            props.style,
          ],
          children: [
            /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.brBuddylistbar,
              children: [
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                  style: styles.brBuddylist,
                  children: groupNodes,
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                  style: styles.brBuddylistFilterArea,
                  children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                    _TextBox.default,
                    {
                      style: styles.brBuddylistFilterInput,
                      value: this.state.buddylistFilterInputValue,
                      placeholder:
                        _uawmsgs.default
                          .LBL_SIDEBAR_BUDDYLIST_FILTER_INPUT_PLACEHOLDER,
                      onChangeText: function onChangeText(text) {
                        return _this3.setState({
                          buddylistFilterInputValue: (0, _strings.string)(text),
                        })
                      },
                    },
                  ),
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(_ButtonIconic.default, {
                  style: styles.brBuddylistFilterButton,
                  iconSource: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                    _FiltrationIcon.default,
                    {},
                  ),
                  accessibilityLabel:
                    _uawmsgs.default
                      .LBL_SIDEBAR_BUDDYLIST_FILTER_BUTTON_TOOLTIP,
                  onPress: this.handleBuddylistFilterButtonClick.bind(this),
                  children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                    _MenuBalloonDialog.default,
                    {
                      showing:
                        props.uiData.showingDialogVersion ===
                        this.state.buddylistFilterShowingDialogVersion,
                      style: styles.brBuddylistFilterBalloonDialog,
                      children: /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                        _reactNative.TouchableOpacity,
                        {
                          style: [
                            styles.brBuddylistFilterOnlineOnlyCheckBox,
                            onlineOnly ? styles.brChecked : styles.brUnchecked,
                          ],
                          onPress: function onPress() {
                            return props.uiData.fire(
                              'sidebarBuddylistFilterOnlineOnlyCheckBox_onClick',
                            )
                          },
                          children: [
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _reactNative.View,
                              {
                                style: {
                                  marginRight: 8,
                                },
                                children: onlineOnly
                                  ? /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                      _CheckIcon.default,
                                      {},
                                    )
                                  : /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                      _SquareIcon.default,
                                      {},
                                    ),
                              },
                            ),
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _reactNative.Text,
                              {
                                style: styles.checkboxLabel,
                                children:
                                  _uawmsgs.default.LBL_SIDEBAR_ONLINE_ONLY_ITEM,
                              },
                            ),
                          ],
                        },
                      ),
                    },
                  ),
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(_DndableSafe.default, {
                  uiData: props.uiData,
                  style: styles.brBuddylistGroupRemoveDndable,
                  iconSource: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                    _BinIcon.default,
                    {},
                  ),
                  onCheckCanDrop: function onCheckCanDrop(ev) {
                    return (
                      configProperties.buddy_mode !==
                        _constants.default.BUDDY_MODE_AUTO &&
                      ev.dragSourceInfo &&
                      ev.dragSourceInfo.dragSourceInfoType ===
                        'buddylistGroupTitle' &&
                      ev.dragSourceInfo.dragSourceInfoCode
                    )
                  },
                  onDrop: function onDrop() {
                    return props.uiData.fire(
                      'sidebarBuddylistGroupRemoveDndable_onDrop',
                    )
                  },
                }),
              ],
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.brControlbar,
              children: [
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Image, {
                  source:
                    (profile.user_type !==
                      _constants.default.USER_TYPE_SYSTEM_ADMIN ||
                      props.uiData.configurations.hideProductComp === 'true') &&
                    props.uiData.configurations.logoPath
                      ? {
                          uri: props.uiData.configurations.logoPath,
                        }
                      : require('../images/logo.png'),
                  style: styles.brControlLogo,
                  accessibilityLabel:
                    props.uiData.configurations.productShortName || 'UC',
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                  _reactNative.TouchableOpacity,
                  {
                    ref: this.controlProfileRef,
                    style: [
                      styles.brControlProfile,
                      !userMe.profile_image_url && styles.brNoImage,
                      userMe.profile_image_url &&
                        (0, _strings.string)(userMe.profile_image_url).indexOf(
                          _constants.default.PROFILE_IMAGE_URL_DOWNLOAD,
                        ) === -1 &&
                        styles.brMyProfileImageUrl,
                    ],
                    accessibilityLabel: userMe.name + ' ' + statusMe.display,
                    onPress: this.handleControlProfileClick.bind(this),
                    onPressIn: function onPressIn() {
                      return props.uiData.fire(
                        'sidebarControlProfile_onMouseEnter',
                      )
                    },
                    children: [
                      userMe.profile_image_url &&
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Image, {
                          source: {
                            uri: userMe.profile_image_url,
                          },
                          style: styles.profileImage,
                        }),
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_StatusIcon.default, {
                        style: styles.brControlProfileStatusIcon,
                        status: statusMe.status,
                      }),
                    ],
                  },
                ),
                /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                  _MenuBalloonDialog.default,
                  {
                    showing:
                      props.uiData.showingDialogVersion ===
                      this.state.controlProfileShowingDialogVersion,
                    style: styles.brControlProfileBalloonDialog,
                    onPress:
                      this.handleControlProfileBalloonDialogClick.bind(this),
                    children: [
                      /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                        style: styles.brControlProfileHeader,
                        children: [
                          /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _reactNative.Text,
                            {
                              style: styles.brControlProfileName,
                              children:
                                userMe.name +
                                (nameDisplayMode === 1
                                  ? ' ('.concat(profile.user_id, ') ')
                                  : ' '),
                            },
                          ),
                          /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _reactNative.Text,
                            {
                              style: styles.brControlProfileDisplay,
                              children: statusMe.display + ' ',
                            },
                          ),
                          /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _ButtonIconic.default,
                            {
                              style: [
                                styles.brEditStatusDisplay,
                                statusMe.status ===
                                  _constants.default.STATUS_OFFLINE &&
                                  styles.brHidden,
                              ],
                              iconSource: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                _EditIcon.default,
                                {},
                              ),
                              accessibilityLabel:
                                _uawmsgs.default
                                  .LBL_SIDEBAR_EDIT_STATUS_DISPLAY_BUTTON_TOOLTIP,
                              onPress: function onPress() {
                                return props.uiData.fire(
                                  'sidebarEditStatusDisplayButton_onClick',
                                )
                              },
                            },
                          ),
                        ],
                      }),
                      statusList.map(function (s) {
                        return /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                          _reactNative.TouchableOpacity,
                          {
                            style: styles.brControlProfileStatusItem,
                            onPress: function onPress() {
                              return props.uiData.fire(
                                'sidebarControlProfileStatusItem_onClick',
                                s.status,
                              )
                            },
                            children: [
                              /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                _StatusIcon.default,
                                {
                                  style:
                                    styles.brControlProfileStatusItemStatusIcon,
                                  status: s.status,
                                },
                              ),
                              /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                _reactNative.View,
                                {
                                  style: [
                                    styles.brControlProfileStatusItemChecked,
                                    s.status === statusMe.status
                                      ? styles.brIconOok
                                      : styles.brHidden,
                                  ],
                                  children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                    _CheckIcon.default,
                                    {},
                                  ),
                                },
                              ),
                              /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                _reactNative.Text,
                                {
                                  children: s.label,
                                },
                              ),
                            ],
                          },
                          s.status,
                        )
                      }),
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                        style: styles.brSeparator,
                      }),
                      /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                        _reactNative.TouchableOpacity,
                        {
                          style: [
                            styles.brControlProfileItem,
                            styles.brPreferenceButton,
                          ],
                          onPress: function onPress() {
                            return props.uiData.fire(
                              'sidebarPreferenceButton_onClick',
                            )
                          },
                          children: [
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _UserIcon.default,
                              {
                                width: 20,
                                height: 20,
                              },
                            ),
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _reactNative.Text,
                              {
                                children:
                                  _uawmsgs.default.LBL_SIDEBAR_PREFERENCE_ITEM,
                              },
                            ),
                          ],
                        },
                      ),
                      /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                        _reactNative.TouchableOpacity,
                        {
                          style: [
                            styles.brControlProfileItem,
                            styles.brHistoryButton,
                          ],
                          onPress: function onPress() {
                            return props.uiData.fire(
                              'sidebarHistoryButton_onClick',
                            )
                          },
                          children: [
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _reactNative.View,
                              {
                                style: styles.menuIcon,
                                children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                  _HistoryIcon.default,
                                  {
                                    width: 20,
                                    height: 20,
                                  },
                                ),
                              },
                            ),
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _reactNative.Text,
                              {
                                children:
                                  _uawmsgs.default.LBL_SIDEBAR_HISTORY_ITEM,
                              },
                            ),
                          ],
                        },
                      ),
                      /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                        _reactNative.TouchableOpacity,
                        {
                          style: [
                            styles.brControlProfileItem,
                            styles.brWebchatRequestsButton,
                          ],
                          onPress: function onPress() {
                            return props.uiData.fire(
                              'sidebarWebchatRequestsButton_onClick',
                            )
                          },
                          disabled: configProperties.webchat_enabled !== 'true',
                          children: [
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _reactNative.View,
                              {
                                style: {
                                  marginHorizontal: 4,
                                },
                                children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                  _InternetIcon.default,
                                  {
                                    width: 20,
                                    height: 20,
                                  },
                                ),
                              },
                            ),
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _reactNative.Text,
                              {
                                children:
                                  _uawmsgs.default
                                    .LBL_SIDEBAR_WEBCHAT_REQUESTS_ITEM,
                              },
                            ),
                          ],
                        },
                      ),
                      /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                        _reactNative.TouchableOpacity,
                        {
                          style: [
                            styles.brControlProfileItem,
                            styles.brServerPropertiesButton,
                          ],
                          onPress: function onPress() {
                            return props.uiData.fire(
                              'sidebarServerPropertiesButton_onClick',
                            )
                          },
                          disabled: true /* profile.user_type !== Constants.USER_TYPE_TENANT_ADMIN */,
                          children: [
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _reactNative.View,
                              {
                                style: styles.menuIcon,
                                children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                  _SettingsIcon.default,
                                  {
                                    width: 20,
                                    height: 20,
                                  },
                                ),
                              },
                            ),
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _reactNative.Text,
                              {
                                children:
                                  _uawmsgs.default
                                    .LBL_SIDEBAR_SERVER_PROPERTIES_ITEM,
                              },
                            ),
                          ],
                        },
                      ),
                      /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                        _reactNative.TouchableOpacity,
                        {
                          style: [
                            styles.brControlProfileItem,
                            styles.brAboutButton,
                          ],
                          onPress: function onPress() {
                            return props.uiData.fire(
                              'sidebarAboutButton_onClick',
                            )
                          },
                          disabled:
                            props.uiData.configurations.hideProduct ===
                              'true' &&
                            (profile.user_type !==
                              _constants.default.USER_TYPE_SYSTEM_ADMIN ||
                              props.uiData.configurations.hideProductComp ===
                                'true'),
                          children: [
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _AboutIcon.default,
                              {
                                width: 20,
                                height: 20,
                              },
                            ),
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _reactNative.Text,
                              {
                                children: (0, _strings.formatStr)(
                                  _uawmsgs.default.LBL_SIDEBAR_ABOUT_ITEM,
                                  props.uiData.configurations.productName ||
                                    'UC',
                                ),
                              },
                            ),
                          ],
                        },
                      ),
                    ],
                  },
                ),
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                  style: styles.brControlStatusDisplayArea,
                  children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                    _reactNative.Animated.Text,
                    {
                      style: [
                        styles.brControlStatusDisplayLabel,
                        props.uiData.runningAnimationTable[
                          'controlstatusdisplay'
                        ] && {
                          transform: [
                            {
                              rotate: '-90deg',
                            },
                            {
                              translateX: this.statusDisplayAnim,
                            },
                          ],
                        },
                      ],
                      children: statusMe.display,
                    },
                  ),
                }),
                this.state.controlButtonsCollapsedCount
                  ? collapsibleControlButtons.slice(
                      0,
                      -this.state.controlButtonsCollapsedCount - 1,
                    )
                  : collapsibleControlButtons,
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(_ButtonIconic.default, {
                  style: [
                    styles.brControlButton,
                    styles.brControlButtonsCollapsedMenuButton,
                    this.state.controlButtonsCollapsedCount === 0 &&
                      styles.brHidden,
                  ],
                  iconSource: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                    _MoreIcon.default,
                    {},
                  ),
                  accessibilityLabel:
                    _uawmsgs.default
                      .LBL_SIDEBAR_CONTROL_BUTTONS_COLLAPSED_MENU_BUTTON_TOOLTIP,
                  onPress:
                    this.handleControlButtonsCollapsedMenuButtonClick.bind(
                      this,
                    ),
                  children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                    _MenuBalloonDialog.default,
                    {
                      showing:
                        props.uiData.showingDialogVersion ===
                        this.state
                          .controlButtonsCollapsedMenuShowingDialogVersion,
                      style: styles.brControlButtonsCollapsedMenuBalloonDialog,
                      children: this.state.controlButtonsCollapsedCount
                        ? collapsibleControlButtons.slice(
                            -this.state.controlButtonsCollapsedCount - 1,
                          )
                        : [],
                    },
                  ),
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(_ButtonIconic.default, {
                  ref: this.areaSplitterButtonRef,
                  style: [
                    styles.brControlButton,
                    styles.brAreaSplitterButton,
                    props.uiData.mainAreaSplitters === 2 &&
                      styles.brIconChannelMosaic4,
                    props.uiData.mainAreaSplitters === 1 &&
                      styles.brIconChannelMosaic12,
                    props.uiData.mainAreaSplitters === 0 &&
                      styles.brIconChannelMosaic1,
                  ],
                  iconSource:
                    props.uiData.mainAreaSplitters === 2
                      ? /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                          _ChannelMosaic4Icon.default,
                          {},
                        )
                      : props.uiData.mainAreaSplitters === 1
                        ? /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _ChannelMosaic12Icon.default,
                            {},
                          )
                        : /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _ChannelMosaic1Icon.default,
                            {},
                          ),
                  accessibilityLabel:
                    _uawmsgs.default.LBL_SIDEBAR_AREA_SPLITTER_BUTTON_TOOLTIP,
                  onPress: this.handleAreaSplitterButtonClick.bind(this),
                  children: /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                    _MenuBalloonDialog.default,
                    {
                      showing:
                        props.uiData.showingDialogVersion ===
                        this.state.areaSplitterShowingDialogVersion,
                      style: styles.brAreaSplitterBalloonDialog,
                      children: [
                        /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                          _reactNative.TouchableOpacity,
                          {
                            style: [
                              styles.brAreaSplitterItem,
                              styles.brIconChannelMosaic1,
                            ],
                            onPress: function onPress() {
                              return props.uiData.fire(
                                'sidebarAreaSplitterItem_onClick',
                                0,
                              )
                            },
                            children: [
                              /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                _reactNative.View,
                                {
                                  style: styles.menuIcon,
                                  children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                    _ChannelMosaic1Icon.default,
                                    {},
                                  ),
                                },
                              ),
                              /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                _reactNative.Text,
                                {
                                  style: styles.menuItemText,
                                  children:
                                    _uawmsgs.default
                                      .LBL_SIDEBAR_AREA_SPLITTER_ITEM_0,
                                },
                              ),
                            ],
                          },
                        ),
                        /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                          _reactNative.TouchableOpacity,
                          {
                            style: [
                              styles.brAreaSplitterItem,
                              styles.brIconChannelMosaic12,
                            ],
                            onPress: function onPress() {
                              return props.uiData.fire(
                                'sidebarAreaSplitterItem_onClick',
                                1,
                              )
                            },
                            children: [
                              /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                _reactNative.View,
                                {
                                  style: styles.menuIcon,
                                  children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                    _ChannelMosaic12Icon.default,
                                    {},
                                  ),
                                },
                              ),
                              /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                _reactNative.Text,
                                {
                                  style: styles.menuItemText,
                                  children:
                                    _uawmsgs.default
                                      .LBL_SIDEBAR_AREA_SPLITTER_ITEM_1,
                                },
                              ),
                            ],
                          },
                        ),
                        /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                          _reactNative.TouchableOpacity,
                          {
                            style: [
                              styles.brAreaSplitterItem,
                              styles.brIconChannelMosaic4,
                            ],
                            onPress: function onPress() {
                              return props.uiData.fire(
                                'sidebarAreaSplitterItem_onClick',
                                2,
                              )
                            },
                            children: [
                              /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                _reactNative.View,
                                {
                                  style: styles.menuIcon,
                                  children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                    _ChannelMosaic4Icon.default,
                                    {},
                                  ),
                                },
                              ),
                              /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                _reactNative.Text,
                                {
                                  style: styles.menuItemText,
                                  children:
                                    _uawmsgs.default
                                      .LBL_SIDEBAR_AREA_SPLITTER_ITEM_2,
                                },
                              ),
                            ],
                          },
                        ),
                      ],
                    },
                  ),
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(_ButtonIconic.default, {
                  ref: this.signOutButtonRef,
                  style: [styles.brControlButton, styles.brSignOutButton],
                  iconSource: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                    _LogOutIcon.default,
                    {},
                  ),
                  accessibilityLabel:
                    _uawmsgs.default.LBL_SIDEBAR_SIGN_OUT_BUTTON_TOOLTIP,
                  onPress: function onPress() {
                    return props.uiData.fire('sidebarSignOutButton_onClick')
                  },
                }),
              ],
            }),
          ],
        })
      },
    },
  ])
})(_react.default.Component))
var styles = _reactNative.StyleSheet.create({
  brBuddylistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#ffffff',
  },
  // TODO: Remove this if not use
  brWithColor: {},
  brWithIcon: {},
  brCallStatus: {},
  brConferenceStatus: {},
  brConferenceStatusWebchat: {},
  brSelected: {
    backgroundColor: '#eeeeee',
  },
  brOffline: {
    opacity: 0.5,
  },
  brBuddylistItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  brCallStatusIcon: {
    width: 16,
    height: 16,
    marginHorizontal: 4,
  },
  brConferenceStatusIcon: {
    width: 16,
    height: 16,
    marginHorizontal: 4,
  },
  brConferenceStatusWebchatIcon: {
    width: 16,
    height: 16,
    marginHorizontal: 4,
  },
  brBuddylistItemInfo: {
    fontSize: 13,
    color: '#212121',
  },
  brBuddylistItemMessage: {
    marginTop: 4,
  },
  brBuddylistItemTime: {
    marginTop: 2,
    fontSize: 12,
    color: '#9e9e9e',
  },
  brBuddylistItemMarker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#40E0D0',
    marginHorizontal: 4,
  },
  brBuddylistItemUnread: {
    backgroundColor: '#ff4526',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  brBuddylistItemImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 8,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  brNoImage: {
    backgroundColor: '#eeeeee',
  },
  brMyProfileImageUrl: {
    borderWidth: 2,
    borderColor: '#40E0D0',
  },
  brBuddylistItemStatusIcon: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  brBuddylistGroup: {
    marginBottom: 8,
  },
  brBuddylistGroupTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
  },
  brGroupName: {
    backgroundColor: '#f5f5f5', // or whatever color you want for named groups
  },
  brBuddylistGroupLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  brBuddylistGroupName: {
    fontSize: 13,
    fontWeight: '500',
    color: '#212121',
  },
  brBuddylistGroupOnlines: {
    fontSize: 12,
    color: '#9e9e9e',
    marginLeft: 4,
  },
  brBuddylistGroupOpenIcon: {
    width: 16,
    height: 16,
    marginLeft: 8,
  },
  brBuddylistItems: {
    overflow: 'hidden', // This replaces the height animation from CSS
  },
  brControlButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
    borderRadius: 20,
    backgroundColor: '#ffffff',
  },
  brCreateConferenceButton: {
    // Add any specific styles for conference button
  },
  brSendBroadcastTextButton: {
    // Add any specific styles for broadcast button
  },
  brExternalCallButton: {
    // Add any specific styles for call button
  },
  brOutgoingWebchatButton: {
    // Add any specific styles for webchat button
  },
  brCreateGroupButton: {
    // Add any specific styles for group button
  },
  brUserListButton: {
    // Add any specific styles for user list button
  },
  brOver: {
    backgroundColor: '#ff4526',
  },
  brBuddylistbar: {
    flex: 1,
    flexDirection: 'column',
  },
  brBuddylistFilterArea: {
    padding: 8,
    backgroundColor: '#ffffff',
  },
  brBuddylistFilterInput: {
    height: 36,
    paddingHorizontal: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
  },
  brBuddylistFilterButton: {
    width: 32,
    height: 32,
    margin: 4,
  },
  brBuddylistFilterBalloonDialog: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  brBuddylistFilterOnlineOnlyCheckBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  checkboxIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#212121',
  },
  brBuddylistGroupRemoveDndable: {
    width: 32,
    height: 32,
    margin: 4,
  },
  brControlbar: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    padding: 8,
  },
  brControlLogo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  brControlProfile: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brControlProfileStatusIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  brChecked: {
    backgroundColor: '#e3f2fd',
  },
  brUnchecked: {
    backgroundColor: '#ffffff',
  },
  brSidebar: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  brControlButtonsCollapsible: {
    // Add styles for collapsed state
  },
  brControlButtonsCollapsedCount1: {
    // Styles for 1 collapsed button
  },
  brControlButtonsCollapsedCount2: {
    // Styles for 2 collapsed buttons
  },
  brControlProfileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  brControlProfileName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#212121',
  },
  brControlProfileDisplay: {
    fontSize: 13,
    color: '#757575',
    marginRight: 8,
  },
  brEditStatusDisplay: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brHidden: {
    display: 'none',
  },
  brControlProfileBalloonDialog: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  brControlProfileStatusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  brControlProfileStatusItemStatusIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  brControlProfileStatusItemChecked: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  brIconOok: {
    opacity: 1,
  },
  brSeparator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 8,
  },
  brControlProfileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  menuIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  brControlStatusDisplayArea: {
    padding: 8,
  },
  brControlStatusDisplayLabel: {
    fontSize: 13,
    color: '#212121',
  },
  brAnimation: {
    transform: [
      {
        rotate: '-90deg',
      },
      {
        translateX: 0, // Will need to be animated using Animated API
      },
    ],
  },
  brAreaSplitterBalloonDialog: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  brAreaSplitterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  menuItemText: {
    fontSize: 14,
    color: '#212121',
    marginLeft: 8,
  },
  brIconChannelMosaic1: {
    // Add specific styles if needed
  },
  brIconChannelMosaic12: {
    // Add specific styles if needed
  },
  brIconChannelMosaic4: {
    // Add specific styles if needed
  },
  brControlButtonsCollapsedMenuButton: {
    // Add specific styles for collapsed menu button
  },
  brAreaSplitterButton: {
    // Add specific styles for area splitter button
  },
  brSignOutButton: {
    // Add specific styles for sign out button
  },
})
