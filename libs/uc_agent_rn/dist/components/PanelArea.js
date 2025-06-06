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
var _reactNative = require('react-native')
var _ButtonIconic = _interopRequireDefault(require('./ButtonIconic'))
var _DndableSafe = _interopRequireDefault(require('./DndableSafe'))
var _DropDownMenu = _interopRequireDefault(require('./DropDownMenu'))
var _MenuBalloonDialog = _interopRequireDefault(require('./MenuBalloonDialog'))
var _MenuItem = _interopRequireDefault(require('./MenuItem'))
var _NameEmbeddedSpan = _interopRequireDefault(require('./NameEmbeddedSpan'))
var _TextBox = _interopRequireDefault(require('./TextBox'))
var _PanelHeaderHideButton = _interopRequireDefault(
  require('./PanelHeaderHideButton'),
)
var _PanelHeaderUndockButton = _interopRequireDefault(
  require('./PanelHeaderUndockButton'),
)
var _PanelHeaderHideSubButton = _interopRequireDefault(
  require('./PanelHeaderHideSubButton'),
)
var _PanelHeaderDockButton = _interopRequireDefault(
  require('./PanelHeaderDockButton'),
)
var _PanelHeaderCloseChatButton = _interopRequireDefault(
  require('./PanelHeaderCloseChatButton'),
)
var _PanelHeaderRejoinButton = _interopRequireDefault(
  require('./PanelHeaderRejoinButton'),
)
var _ChatPanel = _interopRequireDefault(require('./ChatPanel'))
var _PreferencePanel = _interopRequireDefault(require('./PreferencePanel'))
var _WebchatQueuePanel = _interopRequireDefault(require('./WebchatQueuePanel'))
var _HistorySearchPanel = _interopRequireDefault(
  require('./HistorySearchPanel'),
)
var _HistorySummariesPanel = _interopRequireDefault(
  require('./HistorySummariesPanel'),
)
var _HistoryDetailPanel = _interopRequireDefault(
  require('./HistoryDetailPanel'),
)
var _ChevronDownIcon = _interopRequireDefault(
  require('../icons/ChevronDownIcon'),
)
var _ChevronUpIcon = _interopRequireDefault(require('../icons/ChevronUpIcon'))
var _SearchIcon = _interopRequireDefault(require('../icons/SearchIcon'))
var _CustomTextInput = _interopRequireDefault(require('./CustomTextInput'))
var _UploadIcon = _interopRequireDefault(require('../icons/UploadIcon'))
var _PhoneIcon = _interopRequireDefault(require('../icons/PhoneIcon'))
var _VideoCallIcon = _interopRequireDefault(require('../icons/VideoCallIcon'))
var _ChannelMosaic1Icon = _interopRequireDefault(
  require('../icons/ChannelMosaic1Icon'),
)
var _EnvelopeIcon = _interopRequireDefault(require('../icons/EnvelopeIcon'))
var _LogOutIcon = _interopRequireDefault(require('../icons/LogOutIcon'))
var _ReplyIcon = _interopRequireDefault(require('../icons/ReplyIcon'))
var _HistoryIcon = _interopRequireDefault(require('../icons/HistoryIcon'))
var _ChatIcon = _interopRequireDefault(require('../icons/ChatIcon'))
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e }
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
}
/**
 * PanelArea
 * props.uiData
 * props.uiData.ucUiAction
 * props.uiData.ucUiStore
 * props.uiData.phone
 * props.uiData.panelSessionTable
 * props.uiData.configurations
 * props.uiData.showingDialogVersion
 * props.uiData.currentSelectedTab
 * props.uiData.historyDetailWorkTable
 * props.uiData.preferenceWorkTable
 * props.uiData.isSubWindow
 * props.uiData.showingDialog_update
 * props.uiData.panelHeaderLeaveButton_onClick
 * props.uiData.panelHeaderInviteButton_onClick
 * props.uiData.panelHeaderFileButton_onClick
 * props.uiData.panelHeaderVoiceButton_onClick
 * props.uiData.panelHeaderVideoButton_onClick
 * props.uiData.panelHeaderScreenButton_onClick
 * props.uiData.panelHeaderContinuationMenuItem_onClick
 * props.uiData.panelHeaderInviteDndable_onCheckCanDrop
 * props.uiData.panelHeaderInviteDndable_onDrop
 * props.panelType
 * props.panelCode
 */
var _default = (exports.default = /*#__PURE__*/ (function (_React$Component) {
  function _default(props) {
    var _this
    _classCallCheck(this, _default)
    _this = _callSuper(this, _default, [props])
    _this.state = {
      showingDialogVersion: null,
      showingReplyDialogVersion: null,
      replyDialogStyle: {},
      headerButtonsCollapsible: false,
      headerSearchConditionsWidth: 0,
      headerSearchConditionsContentCache: null,
      headerSearchConditionsUserGroupOpen:
        props.uiData.ucUiStore.getLocalStoragePreference({
          keyList: ['buddylistOpenList'],
        })[0],
      historySummariesWithHeader: false,
    }
    _this.panelHeaderAreaRef = /*#__PURE__*/ _react.default.createRef()
    _this.panelHeaderTitleRef = /*#__PURE__*/ _react.default.createRef()
    _this.panelHeaderInfoRef = /*#__PURE__*/ _react.default.createRef()
    _this.panelHeaderMembersRef = /*#__PURE__*/ _react.default.createRef()
    _this.panelHeaderButtonsAreaRef = /*#__PURE__*/ _react.default.createRef()
    _this.headerSearchConditionsContentInputRef =
      /*#__PURE__*/ _react.default.createRef()
    _this.panelHeaderSearchConditionsRef =
      /*#__PURE__*/ _react.default.createRef()
    return _this
  }
  _inherits(_default, _React$Component)
  return _createClass(_default, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var props = this.props
        if (
          this.headerSearchConditionsContentInputRef.current &&
          this.headerSearchConditionsContentInputRef.current.focus
        ) {
          this.headerSearchConditionsContentInputRef.current.focus()
        }
      },
    },
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        var _this2 = this
        var props = this.props
        var newState = {}
        if (this.panelHeaderAreaRef.current) {
          this.panelHeaderAreaRef.current.measure(
            function (x, y, width, height, pageX, pageY) {
              var widthOfArea = width
              if (typeof widthOfArea === 'number' && widthOfArea > 0) {
                var rightOfTexts = null
                if (_this2.panelHeaderMembersRef.current) {
                  _this2.panelHeaderMembersRef.current.measure(
                    function (x, y, width, height, pageX, pageY) {
                      rightOfTexts = (0, _strings.int)(pageX + width)
                    },
                  )
                } else if (_this2.panelHeaderInfoRef.current) {
                  _this2.panelHeaderInfoRef.current.measure(
                    function (x, y, width, height, pageX, pageY) {
                      rightOfTexts = (0, _strings.int)(pageX + width)
                    },
                  )
                } else if (_this2.panelHeaderTitleRef.current) {
                  _this2.panelHeaderTitleRef.current.measure(
                    function (x, y, width, height, pageX, pageY) {
                      rightOfTexts = (0, _strings.int)(pageX + width)
                    },
                  )
                }
                if (typeof rightOfTexts === 'number') {
                  var leftOfButtons = null
                  if (_this2.panelHeaderButtonsAreaRef.current) {
                    _this2.panelHeaderButtonsAreaRef.current.measure(
                      function (x, y, width, height, pageX, pageY) {
                        leftOfButtons =
                          (widthOfArea - (0, _strings.int)(width)) / 2
                      },
                    )
                  }
                  if (typeof leftOfButtons === 'number') {
                    if (
                      leftOfButtons < rightOfTexts &&
                      !_this2.state.headerButtonsCollapsible
                    ) {
                      newState.headerButtonsCollapsible = true
                    } else if (
                      leftOfButtons >= rightOfTexts &&
                      _this2.state.headerButtonsCollapsible
                    ) {
                      newState.headerButtonsCollapsible = false
                    }
                  }
                  if (
                    _this2.state.headerSearchConditionsWidth !==
                    widthOfArea - rightOfTexts
                  ) {
                    newState.headerSearchConditionsWidth =
                      widthOfArea - rightOfTexts
                  }
                }
              }
              if (Object.keys(newState).length) {
                _this2.setState(newState)
                console.log('#Duy Phan console newState2', newState)
              }
            },
          )
        }
      },
    },
    {
      key: 'handlePanelHeaderButtonsMenuClick',
      value: function handlePanelHeaderButtonsMenuClick(ev) {
        var props = this.props
        if (
          props.uiData.showingDialogVersion !== this.state.showingDialogVersion
        ) {
          this.setState({
            showingDialogVersion: ++props.uiData.showingDialogVersion,
          })
          ev.stopPropagation()
          props.uiData.fire('showingDialog_update')
        }
      },
    },
    {
      key: 'handleReplyWebchatButtonClick',
      value: function handleReplyWebchatButtonClick(ev) {
        var _this3 = this
        var props = this.props
        if (
          props.uiData.showingDialogVersion !==
            this.state.showingDialogVersion ||
          props.uiData.showingDialogVersion !==
            this.state.showingReplyDialogVersion
        ) {
          props.uiData.showingDialogVersion++
          var replyDialogStyle = {}
          if (this.panelHeaderAreaRef.current) {
            this.panelHeaderAreaRef.current.measure(
              function (x, y, width, height, pageX, pageY) {
                var panelHeaderAreaRect = {
                  left: pageX,
                  top: pageY,
                  width: width,
                  height: height,
                }
                var replyWebchatButtonRect =
                  ev && ev.target && ev.target.measure
                    ? ev.target.measure(
                        function (x, y, width, height, pageX, pageY) {
                          return {
                            left: pageX,
                            top: pageY,
                            width: width,
                            height: height,
                          }
                        },
                      )
                    : null
                if (panelHeaderAreaRect && replyWebchatButtonRect) {
                  replyDialogStyle.left =
                    replyWebchatButtonRect.left - panelHeaderAreaRect.left
                  replyDialogStyle.top =
                    replyWebchatButtonRect.top +
                    replyWebchatButtonRect.height -
                    panelHeaderAreaRect.top
                }
                _this3.setState({
                  showingDialogVersion: props.uiData.showingDialogVersion,
                  showingReplyDialogVersion: props.uiData.showingDialogVersion,
                  replyDialogStyle: replyDialogStyle,
                })
                ev.stopPropagation()
                props.uiData.fire('showingDialog_update')
              },
            )
          }
        }
      },
    },
    {
      key: 'handleHeaderSearchConditionsDetailButtonClick',
      value: function handleHeaderSearchConditionsDetailButtonClick(ev) {
        var props = this.props
        this.setState({
          historySummariesWithHeader: !this.state.historySummariesWithHeader,
        })
      },
    },
    {
      key: 'handleHeaderSearchConditionsContentInputChange',
      value: function handleHeaderSearchConditionsContentInputChange(ev) {
        var props = this.props
        console.log('#Duy Phan console ev', ev)
        // cache value to state not to store (do not render uiData)
        this.setState({
          headerSearchConditionsContentCache: (0, _strings.string)(
            ev.target.value,
          ),
        })
      },
    },
    {
      key: 'handleHeaderSearchConditionsContentInputBlur',
      value: function handleHeaderSearchConditionsContentInputBlur(ev) {
        var props = this.props
        // save value to store
        console.log('#Duy Phan console  ev.target.value', ev)
        // this.setSearchCondition('_any', string(ev.target.value))
        // clear cached value in state
        this.setState({
          headerSearchConditionsContentCache: null,
        })
      },
    },
    {
      key: 'handleHeaderSearchConditionsContentInputKeyDown',
      value: function handleHeaderSearchConditionsContentInputKeyDown(ev) {
        var props = this.props
        if (
          ev &&
          ev.nativeEvent &&
          ev.nativeEvent.key === 'Enter' &&
          !ev.nativeEvent.shiftKey
        ) {
          // save value to store
          this.setSearchCondition(
            '_any',
            (0, _strings.string)(ev && ev.nativeEvent && ev.nativeEvent.text),
          )
          // clear cached value in state
          this.setState({
            headerSearchConditionsContentCache: null,
          })
          // do search
          props.uiData.ucUiAction.doSearch({
            chatType: props.panelType,
            chatCode: props.panelCode,
            emphasize: true,
            queueing: true,
          })
        }
      },
    },
    {
      key: 'handleHeaderSearchConditionsSearchButtonClick',
      value: function handleHeaderSearchConditionsSearchButtonClick(ev) {
        var props = this.props
        this.setSearchCondition(
          '_any',
          (0, _strings.string)(this.state.headerSearchConditionsContentCache),
        )
        // do search
        props.uiData.ucUiAction.doSearch({
          chatType: props.panelType,
          chatCode: props.panelCode,
          emphasize: true,
          queueing: true,
        })
      },
    },
    {
      key: 'handleHeaderSearchConditionsUserGroupClick',
      value: function handleHeaderSearchConditionsUserGroupClick(
        groupName,
        ev,
      ) {
        var props = this.props
        if (
          (0, _strings.string)(ev && ev.target && ev.target.className).indexOf(
            'brHeaderSearchConditionsUserGroup',
          ) !== -1
        ) {
          if (
            this.state.headerSearchConditionsUserGroupOpen
              .split(',')
              .indexOf(groupName) !== -1
          ) {
            this.setState({
              headerSearchConditionsUserGroupOpen:
                this.state.headerSearchConditionsUserGroupOpen
                  .split(',')
                  .filter(function (g) {
                    return g !== groupName
                  })
                  .join(','),
            })
          } else {
            this.setState({
              headerSearchConditionsUserGroupOpen: this.state
                .headerSearchConditionsUserGroupOpen
                ? this.state.headerSearchConditionsUserGroupOpen +
                  ',' +
                  groupName
                : groupName,
            })
          }
        }
      },
    },
    {
      key: 'handleHeaderSearchConditionsUserItemClick',
      value: function handleHeaderSearchConditionsUserItemClick(user_id, ev) {
        var props = this.props
        this.setSearchCondition('_userId', user_id)
        props.uiData.ucUiAction.doSearch({
          chatType: props.panelType,
          chatCode: props.panelCode,
          emphasize: true,
          queueing: true,
        })
      },
    },
    {
      key: 'handleHeaderSearchConditionsUserAllClick',
      value: function handleHeaderSearchConditionsUserAllClick(ev) {
        var props = this.props
        var searchConditions =
          props.uiData.ucUiStore.getSearchConditions({
            chatType: props.panelType,
            chatCode: props.panelCode,
          }) || []
        props.uiData.ucUiAction.setSearchConditions({
          chatType: props.panelType,
          chatCode: props.panelCode,
          searchConditions: searchConditions.filter(function (condition) {
            return condition.conditionKey !== '_userId'
          }),
        })
        props.uiData.ucUiAction.doSearch({
          chatType: props.panelType,
          chatCode: props.panelCode,
          emphasize: true,
          queueing: true,
        })
      },
    },
    {
      key: 'setSearchCondition',
      value: function setSearchCondition(conditionKey, conditionValue) {
        var props = this.props
        var searchConditions =
          props.uiData.ucUiStore.getSearchConditions({
            chatType: props.panelType,
            chatCode: props.panelCode,
          }) || []
        if (
          !searchConditions.some(function (condition) {
            return (
              condition.conditionKey === conditionKey &&
              ((condition.conditionValue = conditionValue) || true)
            )
          })
        ) {
          searchConditions.push({
            conditionKey: conditionKey,
            conditionValue: conditionValue,
          })
        }
        props.uiData.ucUiAction.setSearchConditions({
          chatType: props.panelType,
          chatCode: props.panelCode,
          searchConditions: searchConditions,
        })
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this4 = this
        console.log(
          '#Duy Phan console   this.state.headerSearchConditionsContentCache',
          this.state.headerSearchConditionsContentCache,
        )
        var props = this.props
        var profile = props.uiData.ucUiStore.getChatClient().getProfile()
        var configProperties = props.uiData.ucUiStore.getConfigProperties()
        var myUcCimUserType = (0, _strings.int)(
          props.uiData.ucUiStore.getUcCimUserType(),
        )
        var panelSession =
          props.uiData.panelSessionTable &&
          props.uiData.panelSessionTable[
            props.panelType + '_' + props.panelCode
          ]
        var session =
          panelSession &&
          panelSession.sessionId &&
          props.uiData.phone &&
          props.uiData.phone.getSession(panelSession.sessionId)
        var panelTypeClassName = ''
        var headerTitle = ''
        var headerInfo = ''
        var headerMembers = []
        var headerMembersTitle = ''
        var headerButtons = []
        var replyOptions = []
        var headerSimpleButtons = []
        var headerSearchConditions = ''
        var contents = ''
        if (props.panelType === 'CONFERENCE') {
          panelTypeClassName = 'brConference'
          var conf_id = (0, _strings.string)(
            props.uiData.ucUiStore.getChatHeaderInfo({
              chatType: props.panelType,
              chatCode: props.panelCode,
            }).conf_id,
          )
          var conference = props.uiData.ucUiStore
            .getChatClient()
            .getConference(conf_id)
          var joinedCount = conference.user.filter(function (u) {
            return u.conf_status === _constants.default.CONF_STATUS_JOINED
          }).length
          var chatHeaderInfo =
            props.uiData.ucUiStore.getChatHeaderInfo({
              chatType: props.panelType,
              chatCode: props.panelCode,
            }) || {}
          var replyTypes = (0, _strings.string)(
            chatHeaderInfo.replyTypes,
          ).split(',')
          if (
            'TRUE' ===
            (0, _strings.string)(
              chatHeaderInfo.webchatContinuable,
            ).toUpperCase()
          ) {
            replyOptions.push({
              className: 'brManualContinuation',
              event: props.uiData.fire.bind(
                props.uiData,
                'panelHeaderContinuationMenuItem_onClick',
                props.panelType,
                props.panelCode,
                '',
              ),
              label:
                _uawmsgs.default
                  .LBL_PANEL_HEADER_REPLY_MANUAL_CONTINUATION_MENU,
            })
          }
          if (
            !props.uiData.ucUiStore.getWebchatQueue({
              conf_id: conf_id,
            }).isTalking &&
            (
              (configProperties.optional_config &&
                configProperties.optional_config.awsl) ||
              []
            ).some(function (aws) {
              return aws.id === chatHeaderInfo.webchatServiceId && aws.senders
            })
          ) {
            replyTypes.forEach(function (replyType, i) {
              if (replyType) {
                replyOptions.push({
                  className: 'brContinuation',
                  event: props.uiData.fire.bind(
                    props.uiData,
                    'panelHeaderContinuationMenuItem_onClick',
                    props.panelType,
                    props.panelCode,
                    replyType,
                  ),
                  label: replyType,
                })
              }
            })
          }
          if (chatHeaderInfo.guest && chatHeaderInfo.guest.user_id) {
            headerTitle = (0, _strings.string)(chatHeaderInfo.title)
            headerInfo = (0, _strings.string)(chatHeaderInfo.guestProfinfo)
          } else {
            headerMembers = props.uiData.ucUiStore
              .getMemberList({
                chatType: props.panelType,
                chatCode: props.panelCode,
              })
              .map(function (member, i) {
                return /*#__PURE__*/ _react.default.createElement(
                  _reactNative.Text,
                  {
                    key: i,
                    style: [
                      styles.brConfStatus1,
                      {
                        color:
                          (
                            conference.user.find(function (u) {
                              return (
                                u.tenant === member.tenant &&
                                u.user_id === member.user_id
                              )
                            }) || {}
                          ).conf_status === '1'
                            ? '#E5E5E5'
                            : undefined,
                      },
                    ],
                  },
                  props.uiData.ucUiStore.getBuddyUserForUi(member).name + '\n',
                )
              })
            headerMembersTitle = props.uiData.ucUiStore
              .getMemberList({
                chatType: props.panelType,
                chatCode: props.panelCode,
              })
              .reduce(function (a, member) {
                return (
                  a +
                  props.uiData.ucUiStore.getBuddyUserForUi(member).name +
                  '\n'
                )
              }, chatHeaderInfo.title + '\n\n')
          }
          if (
            !(
              props.uiData.configurations.headerButtons &&
              props.uiData.configurations.headerButtons.indexOf('leave') === -1
            )
          ) {
            headerButtons.push(
              /*#__PURE__*/ _react.default.createElement(
                _ButtonIconic.default,
                {
                  key: 'leave',
                  style: styles.brPanelHeaderButton,
                  disabled:
                    conference.conf_status !==
                    _constants.default.CONF_STATUS_JOINED,
                  title: _uawmsgs.default.LBL_PANEL_HEADER_LEAVE_BUTTON_TOOLTIP,
                  onPress: props.uiData.fire.bind(
                    props.uiData,
                    'panelHeaderLeaveButton_onClick',
                    props.panelType,
                    props.panelCode,
                  ),
                  iconSource: /*#__PURE__*/ _react.default.createElement(
                    _LogOutIcon.default,
                    {
                      color: '#ffffff',
                    },
                  ),
                },
              ),
            )
          }
          if (chatHeaderInfo.confType === 'webchat') {
            panelTypeClassName += ' brWebchat'
            if (
              !(
                props.uiData.configurations.headerButtons &&
                props.uiData.configurations.headerButtons.indexOf('reply') ===
                  -1
              )
            ) {
              headerButtons.push(
                /*#__PURE__*/ _react.default.createElement(
                  _ButtonIconic.default,
                  {
                    key: 'reply',
                    style: styles.brPanelHeaderButton,
                    disabled: !replyOptions.length,
                    title:
                      _uawmsgs.default.LBL_PANEL_HEADER_REPLY_BUTTON_TOOLTIP,
                    onPress:
                      replyOptions.length === 1
                        ? replyOptions[0].event
                        : this.handleReplyWebchatButtonClick.bind(this),
                    iconSource: /*#__PURE__*/ _react.default.createElement(
                      _ReplyIcon.default,
                      {
                        color: '#ffffff',
                      },
                    ),
                  },
                ),
              )
            }
          }
          if (
            !(
              props.uiData.configurations.headerButtons &&
              props.uiData.configurations.headerButtons.indexOf('invite') === -1
            )
          ) {
            headerButtons.push(
              /*#__PURE__*/ _react.default.createElement(
                _ButtonIconic.default,
                {
                  key: 'invite',
                  style: styles.brPanelHeaderButton,
                  disabled:
                    conference.conf_status !==
                      _constants.default.CONF_STATUS_JOINED ||
                    (chatHeaderInfo.confType === 'webchat' &&
                      (-(0, _strings.int)(
                        (conference.webchatinfo &&
                          (0, _strings.string)(
                            conference.webchatinfo.invite_button_type,
                          )) ||
                          '-98',
                      ) &
                        myUcCimUserType) !==
                        myUcCimUserType),
                  title:
                    _uawmsgs.default.LBL_PANEL_HEADER_INVITE_BUTTON_TOOLTIP,
                  onPress: props.uiData.fire.bind(
                    props.uiData,
                    'panelHeaderInviteButton_onClick',
                    props.panelType,
                    props.panelCode,
                  ),
                  iconSource: /*#__PURE__*/ _react.default.createElement(
                    _EnvelopeIcon.default,
                    {
                      color: '#ffffff',
                    },
                  ),
                },
              ),
            )
          }
          if (
            ((0, _strings.int)(
              props.uiData.ucUiStore.getOptionalSetting({
                key: 'fsp',
              }),
            ) &
              myUcCimUserType) !==
            myUcCimUserType
          ) {
            if (
              !(
                props.uiData.configurations.headerButtons &&
                props.uiData.configurations.headerButtons.indexOf('file') === -1
              )
            ) {
              headerButtons.push(
                /*#__PURE__*/ _react.default.createElement(
                  _ButtonIconic.default,
                  {
                    key: 'file',
                    style: styles.brPanelHeaderButton,
                    disabled:
                      conference.conf_status !==
                        _constants.default.CONF_STATUS_JOINED ||
                      joinedCount < 2,
                    title:
                      _uawmsgs.default.LBL_PANEL_HEADER_FILE_BUTTON_TOOLTIP,
                    onPress: props.uiData.fire.bind(
                      props.uiData,
                      'panelHeaderFileButton_onClick',
                      props.panelType,
                      props.panelCode,
                    ),
                    iconSource: /*#__PURE__*/ _react.default.createElement(
                      _UploadIcon.default,
                      {
                        color: '#ffffff',
                      },
                    ),
                  },
                ),
              )
            }
          }
          if (
            !(
              props.uiData.configurations.headerButtons &&
              props.uiData.configurations.headerButtons.indexOf('voice') === -1
            )
          ) {
            headerButtons.push(
              /*#__PURE__*/ _react.default.createElement(
                _ButtonIconic.default,
                {
                  key: 'voice',
                  style: styles.brPanelHeaderButton,
                  disabled:
                    conference.conf_status !==
                      _constants.default.CONF_STATUS_JOINED ||
                    !props.uiData.phone ||
                    props.uiData.phone.getPhoneStatus() !== 'started' ||
                    panelSession,
                  title: _uawmsgs.default.LBL_PANEL_HEADER_VOICE_BUTTON_TOOLTIP,
                  onPress: props.uiData.fire.bind(
                    props.uiData,
                    'panelHeaderVoiceButton_onClick',
                    props.panelType,
                    props.panelCode,
                  ),
                  iconSource: /*#__PURE__*/ _react.default.createElement(
                    _PhoneIcon.default,
                    {
                      color: '#ffffff',
                    },
                  ),
                },
              ),
            )
          }
          if (
            !(
              props.uiData.configurations.headerButtons &&
              props.uiData.configurations.headerButtons.indexOf('video') === -1
            )
          ) {
            headerButtons.push(
              /*#__PURE__*/ _react.default.createElement(
                _ButtonIconic.default,
                {
                  key: 'video',
                  style: styles.brPanelHeaderButton,
                  disabled:
                    conference.conf_status !==
                      _constants.default.CONF_STATUS_JOINED ||
                    !props.uiData.phone ||
                    props.uiData.phone.getPhoneStatus() !== 'started' ||
                    panelSession,
                  title: _uawmsgs.default.LBL_PANEL_HEADER_VIDEO_BUTTON_TOOLTIP,
                  onPress: props.uiData.fire.bind(
                    props.uiData,
                    'panelHeaderVideoButton_onClick',
                    props.panelType,
                    props.panelCode,
                  ),
                  iconSource: /*#__PURE__*/ _react.default.createElement(
                    _VideoCallIcon.default,
                    {
                      color: '#ffffff',
                    },
                  ),
                },
              ),
            )
          }
          if (
            !(
              props.uiData.configurations.headerButtons &&
              props.uiData.configurations.headerButtons.indexOf('screen') === -1
            )
          ) {
            headerButtons.push(
              /*#__PURE__*/ _react.default.createElement(
                _ButtonIconic.default,
                {
                  key: 'screen',
                  style: styles.brPanelHeaderButton,
                  disabled:
                    conference.conf_status !==
                      _constants.default.CONF_STATUS_JOINED ||
                    !props.uiData.phone ||
                    props.uiData.phone.getPhoneStatus() !== 'started' ||
                    panelSession,
                  title:
                    _uawmsgs.default.LBL_PANEL_HEADER_SCREEN_BUTTON_TOOLTIP,
                  onPress: props.uiData.fire.bind(
                    props.uiData,
                    'panelHeaderScreenButton_onClick',
                    props.panelType,
                    props.panelCode,
                  ),
                  iconSource: /*#__PURE__*/ _react.default.createElement(
                    _ChannelMosaic1Icon.default,
                    {
                      color: '#ffffff',
                    },
                  ),
                },
              ),
            )
          }
          if (!props.uiData.isSubWindow) {
            headerSimpleButtons.unshift(
              /*#__PURE__*/ _react.default.createElement(
                _PanelHeaderHideButton.default,
                {
                  key: 'hide',
                  uiData: props.uiData,
                  panelType: props.panelType,
                  panelCode: props.panelCode,
                  disabled:
                    !props.uiData.configurations.hideable &&
                    conference.conf_status ===
                      _constants.default.CONF_STATUS_JOINED,
                },
              ),
            )
            if (props.uiData.configurations.undockable) {
              headerSimpleButtons.unshift(
                /*#__PURE__*/ _react.default.createElement(
                  _PanelHeaderUndockButton.default,
                  {
                    key: 'undock',
                    uiData: props.uiData,
                    panelType: props.panelType,
                    panelCode: props.panelCode,
                  },
                ),
              )
            }
          } else {
            headerSimpleButtons.unshift(
              /*#__PURE__*/ _react.default.createElement(
                _PanelHeaderHideSubButton.default,
                {
                  key: 'hidesub',
                  uiData: props.uiData,
                  panelType: props.panelType,
                  panelCode: props.panelCode,
                  disabled:
                    !props.uiData.configurations.hideable &&
                    conference.conf_status ===
                      _constants.default.CONF_STATUS_JOINED,
                },
              ),
            )
            if (props.uiData.configurations.undockable) {
              headerSimpleButtons.unshift(
                /*#__PURE__*/ _react.default.createElement(
                  _PanelHeaderDockButton.default,
                  {
                    key: 'dock',
                    uiData: props.uiData,
                    panelType: props.panelType,
                    panelCode: props.panelCode,
                  },
                ),
              )
            }
          }
          headerSimpleButtons.unshift(
            /*#__PURE__*/ _react.default.createElement(
              _PanelHeaderCloseChatButton.default,
              {
                key: 'closechat',
                uiData: props.uiData,
                panelType: props.panelType,
                panelCode: props.panelCode,
                disabled:
                  conference.conf_status !==
                  _constants.default.CONF_STATUS_JOINED,
              },
            ),
          )
          headerSimpleButtons.unshift(
            /*#__PURE__*/ _react.default.createElement(
              _PanelHeaderRejoinButton.default,
              {
                key: 'rejoin',
                uiData: props.uiData,
                panelType: props.panelType,
                panelCode: props.panelCode,
                disabled:
                  conference.conf_status !==
                  _constants.default.CONF_STATUS_INVITED,
              },
            ),
          )
          contents = /*#__PURE__*/ _react.default.createElement(
            _ChatPanel.default,
            {
              uiData: props.uiData,
              panelType: props.panelType,
              panelCode: props.panelCode,
            },
          )
        } else if (props.panelType === 'CHAT') {
          console.log(
            '#Duy Phan console configurations',
            props.uiData.configurations,
          )
          panelTypeClassName = 'brChat'
          var _chatHeaderInfo =
            props.uiData.ucUiStore.getChatHeaderInfo({
              chatType: props.panelType,
              chatCode: props.panelCode,
            }) || {}
          headerTitle = (0, _strings.string)(_chatHeaderInfo.title)
          try {
            headerInfo = (0, _strings.string)(
              props.uiData.getCurrentBuddyStatus(JSON.parse(props.panelCode))
                .display,
            )
          } catch (e) {}
          if (
            ((0, _strings.int)(
              props.uiData.ucUiStore.getOptionalSetting({
                key: 'fsp',
              }),
            ) &
              myUcCimUserType) !==
            myUcCimUserType
          ) {
            if (
              !(
                props.uiData.configurations.headerButtons &&
                props.uiData.configurations.headerButtons.indexOf('file') === -1
              )
            ) {
              headerButtons.push(
                /*#__PURE__*/ _react.default.createElement(
                  _ButtonIconic.default,
                  {
                    key: 'file',
                    style: styles.brPanelHeaderButton,
                    title:
                      _uawmsgs.default.LBL_PANEL_HEADER_FILE_BUTTON_TOOLTIP,
                    onPress: props.uiData.fire.bind(
                      props.uiData,
                      'panelHeaderFileButton_onClick',
                      props.panelType,
                      props.panelCode,
                    ),
                    iconSource: /*#__PURE__*/ _react.default.createElement(
                      _UploadIcon.default,
                      {
                        color: '#ffffff',
                      },
                    ),
                  },
                ),
              )
            }
          }
          if (
            !(
              props.uiData.configurations.headerButtons &&
              props.uiData.configurations.headerButtons.indexOf('voice') === -1
            )
          ) {
            headerButtons.push(
              /*#__PURE__*/ _react.default.createElement(
                _ButtonIconic.default,
                {
                  key: 'voice',
                  style: styles.brPanelHeaderButton,
                  disabled:
                    !props.uiData.phone ||
                    props.uiData.phone.getPhoneStatus() !== 'started' ||
                    panelSession,
                  title: _uawmsgs.default.LBL_PANEL_HEADER_VOICE_BUTTON_TOOLTIP,
                  onPress: props.uiData.fire.bind(
                    props.uiData,
                    'panelHeaderVoiceButton_onClick',
                    props.panelType,
                    props.panelCode,
                  ),
                  iconSource: /*#__PURE__*/ _react.default.createElement(
                    _PhoneIcon.default,
                    {
                      color: '#ffffff',
                    },
                  ),
                },
              ),
            )
          }
          if (
            !(
              props.uiData.configurations.headerButtons &&
              props.uiData.configurations.headerButtons.indexOf('video') === -1
            )
          ) {
            headerButtons.push(
              /*#__PURE__*/ _react.default.createElement(
                _ButtonIconic.default,
                {
                  key: 'video',
                  style: styles.brPanelHeaderButton,
                  disabled:
                    !props.uiData.phone ||
                    props.uiData.phone.getPhoneStatus() !== 'started' ||
                    panelSession,
                  title: _uawmsgs.default.LBL_PANEL_HEADER_VIDEO_BUTTON_TOOLTIP,
                  onPress: props.uiData.fire.bind(
                    props.uiData,
                    'panelHeaderVideoButton_onClick',
                    props.panelType,
                    props.panelCode,
                  ),
                  iconSource: /*#__PURE__*/ _react.default.createElement(
                    _VideoCallIcon.default,
                    {
                      color: '#ffffff',
                    },
                  ),
                },
              ),
            )
          }
          if (
            !(
              props.uiData.configurations.headerButtons &&
              props.uiData.configurations.headerButtons.indexOf('screen') === -1
            )
          ) {
            headerButtons.push(
              /*#__PURE__*/ _react.default.createElement(
                _ButtonIconic.default,
                {
                  key: 'screen',
                  style: styles.brPanelHeaderButton,
                  disabled:
                    !props.uiData.phone ||
                    props.uiData.phone.getPhoneStatus() !== 'started' ||
                    panelSession,
                  title:
                    _uawmsgs.default.LBL_PANEL_HEADER_SCREEN_BUTTON_TOOLTIP,
                  onPress: props.uiData.fire.bind(
                    props.uiData,
                    'panelHeaderScreenButton_onClick',
                    props.panelType,
                    props.panelCode,
                  ),
                  iconSource: /*#__PURE__*/ _react.default.createElement(
                    _ChannelMosaic1Icon.default,
                    {
                      color: '#ffffff',
                    },
                  ),
                },
              ),
            )
          }
          if (
            !(
              props.uiData.configurations.headerButtons &&
              props.uiData.configurations.headerButtons.indexOf('history') ===
                -1
            )
          ) {
            headerButtons.push(
              /*#__PURE__*/ _react.default.createElement(
                _ButtonIconic.default,
                {
                  key: 'history',
                  style: styles.brPanelHeaderButton,
                  title:
                    _uawmsgs.default.LBL_PANEL_HEADER_HISTORY_BUTTON_TOOLTIP,
                  onPress: props.uiData.fire.bind(
                    props.uiData,
                    'panelHeaderHistoryButton_onClick',
                    props.panelType,
                    props.panelCode,
                  ),
                  iconSource: /*#__PURE__*/ _react.default.createElement(
                    _HistoryIcon.default,
                    {
                      color: '#ffffff',
                    },
                  ),
                },
              ),
            )
          }
          if (!props.uiData.isSubWindow) {
            headerSimpleButtons.unshift(
              /*#__PURE__*/ _react.default.createElement(
                _PanelHeaderHideButton.default,
                {
                  key: 'hide',
                  uiData: props.uiData,
                  panelType: props.panelType,
                  panelCode: props.panelCode,
                },
              ),
            )
            if (props.uiData.configurations.undockable) {
              headerSimpleButtons.unshift(
                /*#__PURE__*/ _react.default.createElement(
                  _PanelHeaderUndockButton.default,
                  {
                    key: 'undock',
                    uiData: props.uiData,
                    panelType: props.panelType,
                    panelCode: props.panelCode,
                  },
                ),
              )
            }
          } else {
            headerSimpleButtons.unshift(
              /*#__PURE__*/ _react.default.createElement(
                _PanelHeaderHideSubButton.default,
                {
                  key: 'hidesub',
                  uiData: props.uiData,
                  panelType: props.panelType,
                  panelCode: props.panelCode,
                },
              ),
            )
            if (props.uiData.configurations.undockable) {
              headerSimpleButtons.unshift(
                /*#__PURE__*/ _react.default.createElement(
                  _PanelHeaderDockButton.default,
                  {
                    key: 'dock',
                    uiData: props.uiData,
                    panelType: props.panelType,
                    panelCode: props.panelCode,
                  },
                ),
              )
            }
          }
          contents = /*#__PURE__*/ _react.default.createElement(
            _ChatPanel.default,
            {
              uiData: props.uiData,
              panelType: props.panelType,
              panelCode: props.panelCode,
            },
          )
        } else if (props.panelType === 'EXTERNALCALL') {
          panelTypeClassName = 'brExternalCall'
          headerTitle = props.panelCode
          if (
            !(
              props.uiData.configurations.headerButtons &&
              props.uiData.configurations.headerButtons.indexOf('voice') === -1
            )
          ) {
            headerButtons.push(
              /*#__PURE__*/ _react.default.createElement(
                _ButtonIconic.default,
                {
                  key: 'voice',
                  style: styles.brPanelHeaderButton,
                  disabled:
                    !props.uiData.phone ||
                    props.uiData.phone.getPhoneStatus() !== 'started' ||
                    panelSession,
                  title: _uawmsgs.default.LBL_PANEL_HEADER_VOICE_BUTTON_TOOLTIP,
                  onPress: props.uiData.fire.bind(
                    props.uiData,
                    'panelHeaderVoiceButton_onClick',
                    props.panelType,
                    props.panelCode,
                  ),
                  iconSource: /*#__PURE__*/ _react.default.createElement(
                    _PhoneIcon.default,
                    {
                      color: '#ffffff',
                    },
                  ),
                },
              ),
            )
          }
          if (
            !(
              props.uiData.configurations.headerButtons &&
              props.uiData.configurations.headerButtons.indexOf('video') === -1
            )
          ) {
            headerButtons.push(
              /*#__PURE__*/ _react.default.createElement(
                _ButtonIconic.default,
                {
                  key: 'video',
                  style: styles.brPanelHeaderButton,
                  disabled:
                    !props.uiData.phone ||
                    props.uiData.phone.getPhoneStatus() !== 'started' ||
                    panelSession,
                  title: _uawmsgs.default.LBL_PANEL_HEADER_VIDEO_BUTTON_TOOLTIP,
                  onPress: props.uiData.fire.bind(
                    props.uiData,
                    'panelHeaderVideoButton_onClick',
                    props.panelType,
                    props.panelCode,
                  ),
                  iconSource: /*#__PURE__*/ _react.default.createElement(
                    _VideoCallIcon.default,
                    {
                      color: '#ffffff',
                    },
                  ),
                },
              ),
            )
          }
          if (
            !(
              props.uiData.configurations.headerButtons &&
              props.uiData.configurations.headerButtons.indexOf('screen') === -1
            )
          ) {
            headerButtons.push(
              /*#__PURE__*/ _react.default.createElement(
                _ButtonIconic.default,
                {
                  key: 'screen',
                  style: styles.brPanelHeaderButton,
                  disabled:
                    !props.uiData.phone ||
                    props.uiData.phone.getPhoneStatus() !== 'started' ||
                    panelSession,
                  title:
                    _uawmsgs.default.LBL_PANEL_HEADER_SCREEN_BUTTON_TOOLTIP,
                  onPress: props.uiData.fire.bind(
                    props.uiData,
                    'panelHeaderScreenButton_onClick',
                    props.panelType,
                    props.panelCode,
                  ),
                  iconSource: /*#__PURE__*/ _react.default.createElement(
                    _ChannelMosaic1Icon.default,
                    {
                      color: '#ffffff',
                    },
                  ),
                },
              ),
            )
          }
          contents = /*#__PURE__*/ _react.default.createElement(
            _ChatPanel.default,
            {
              uiData: props.uiData,
              panelType: props.panelType,
              panelCode: props.panelCode,
            },
          )
        } else if (props.panelType === 'PREFERENCE') {
          panelTypeClassName = 'brPreference'
          headerTitle = _uawmsgs.default.LBL_PANEL_HEADER_PREFERENCE_TITLE
          headerInfo = (0, _strings.string)(
            (
              (props.uiData.preferenceWorkTable &&
                props.uiData.preferenceWorkTable[props.panelCode]) ||
              {}
            ).saveMessage,
          )
          contents = /*#__PURE__*/ _react.default.createElement(
            _PreferencePanel.default,
            {
              uiData: props.uiData,
              panelType: props.panelType,
              panelCode: props.panelCode,
            },
          )
        } else if (props.panelType === 'WEBCHATQUEUE') {
          panelTypeClassName = 'brWebchatQueue'
          headerTitle = _uawmsgs.default.TAB_WEBCHATQUEUE
          headerSimpleButtons.unshift(
            /*#__PURE__*/ _react.default.createElement(
              _PanelHeaderHideButton.default,
              {
                key: 'hide',
                uiData: props.uiData,
                panelType: props.panelType,
                panelCode: props.panelCode,
              },
            ),
          )
          contents = /*#__PURE__*/ _react.default.createElement(
            _WebchatQueuePanel.default,
            {
              uiData: props.uiData,
            },
          )
        } else if (props.panelType === 'HISTORYSEARCH') {
          panelTypeClassName = 'brHistorySearch'
          contents = /*#__PURE__*/ _react.default.createElement(
            _HistorySearchPanel.default,
            {
              uiData: props.uiData,
              panelType: props.panelType,
              panelCode: props.panelCode,
            },
          )
        } else if (props.panelType === 'HISTORYSUMMARIES') {
          panelTypeClassName = 'brHistorySummaries'
          headerTitle = _uawmsgs.default.LBL_PANEL_HEADER_HISTORYSUMMARIES_TITLE
          var searchConditions =
            props.uiData.ucUiStore.getSearchConditions({
              chatType: props.panelType,
              chatCode: props.panelCode,
            }) || []
          var conditions = {
            _any: {},
            _userId: {},
          }
          searchConditions.forEach(function (condition) {
            return (conditions[condition.conditionKey] = condition)
          })
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
          buddies.forEach(function (buddy) {
            var groupName = (0, _strings.string)(buddy.group)
            if (!groupTable[groupName]) {
              groupTable[groupName] = {
                groupIndex: (0, _strings.int)(buddy.groupIndex),
                buddyNodes: [],
              }
            }
            if (
              !groupName ||
              _this4.state.headerSearchConditionsUserGroupOpen
                .split(',')
                .indexOf(groupName) !== -1
            ) {
              groupTable[groupName].buddyNodes.push(
                /*#__PURE__*/ _react.default.createElement(
                  _MenuItem.default,
                  {
                    key: JSON.stringify({
                      tenant: buddy.tenant,
                      user_id: buddy.user_id,
                    }),
                    style: styles.brHeaderSearchConditionsUserItem,
                    dropDown: true,
                    onPress:
                      _this4.handleHeaderSearchConditionsUserItemClick.bind(
                        _this4,
                        buddy.user_id,
                      ),
                  },
                  /*#__PURE__*/ _react.default.createElement(
                    _NameEmbeddedSpan.default,
                    {
                      ucUiStore: props.uiData.ucUiStore,
                      format: '{0}',
                      title: '{0}',
                      buddy: buddy,
                    },
                  ),
                ),
              )
            }
          })
          headerSearchConditions = /*#__PURE__*/ _react.default.createElement(
            _reactNative.View,
            {
              style: {
                position: 'relative',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                height: '100%',
                marginLeft: 5,
              },
            },
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.View,
              {
                style: styles.brHeaderSearchConditionsContentArea,
              },
              /*#__PURE__*/ _react.default.createElement(_TextBox.default, {
                ref: this.headerSearchConditionsContentInputRef,
                style: styles.brHeaderSearchConditionsContentInput,
                value:
                  this.state.headerSearchConditionsContentCache === null
                    ? (0, _strings.string)(conditions._any.conditionValue)
                    : this.state.headerSearchConditionsContentCache,
                placeholder:
                  _uawmsgs.default.LBL_PANEL_HEADER_SEARCH_INPUT_PLACEHOLDER,
                onChange:
                  this.handleHeaderSearchConditionsContentInputChange.bind(
                    this,
                  ),
                // onBlur={this.handleHeaderSearchConditionsContentInputBlur.bind(
                //   this,
                // )}
              }),
              /*#__PURE__*/ _react.default.createElement(
                _ButtonIconic.default,
                {
                  style: styles.brHeaderSearchConditionsSearchButton,
                  title:
                    _uawmsgs.default.LBL_PANEL_HEADER_SEARCH_BUTTON_TOOLTIP,
                  iconSource: /*#__PURE__*/ _react.default.createElement(
                    _SearchIcon.default,
                    {
                      width: 20,
                      height: 20,
                    },
                  ),
                  onPress:
                    this.handleHeaderSearchConditionsSearchButtonClick.bind(
                      this,
                    ),
                },
              ),
            ),
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.View,
              {
                style: styles.brHeaderSearchConditionsUserArea,
              },
              /*#__PURE__*/ _react.default.createElement(
                _DropDownMenu.default,
                {
                  uiData: props.uiData,
                  style: styles.brHeaderSearchConditionsUserMenu,
                  dialogStyle: styles.brPanelAreaDialog,
                  text: conditions._userId.conditionValue
                    ? (0, _strings.string)(
                        (buddyTable[conditions._userId.conditionValue] || {})
                          .name || conditions._userId.conditionValue,
                      )
                    : _uawmsgs.default.LBL_PANEL_HEADER_SEARCH_USER_ALL,
                },
                /*#__PURE__*/ _react.default.createElement(
                  _MenuItem.default,
                  {
                    style: styles.brHeaderSearchConditionsUserItem,
                    dropDown: true,
                    onPress:
                      this.handleHeaderSearchConditionsUserAllClick.bind(this),
                  },
                  _uawmsgs.default.LBL_PANEL_HEADER_SEARCH_USER_ALL,
                ),
                Object.keys(groupTable)
                  .sort(function (groupName1, groupName2) {
                    return (
                      (groupTable[groupName1].groupIndex >>> 0) -
                      (groupTable[groupName2].groupIndex >>> 0)
                    )
                  })
                  .map(function (groupName) {
                    return /*#__PURE__*/ _react.default.createElement(
                      _reactNative.View,
                      {
                        key: groupName,
                        style: [
                          styles.brHeaderSearchConditionsUserGroup,
                          groupName ? styles.brGroupName : null,
                        ],
                        title: groupName,
                        onPress:
                          _this4.handleHeaderSearchConditionsUserGroupClick.bind(
                            _this4,
                            groupName,
                          ),
                      },
                      /*#__PURE__*/ _react.default.createElement(
                        _reactNative.View,
                        {
                          style: [
                            styles.brHeaderSearchConditionsUserGroupIcon,
                            _this4.state.headerSearchConditionsUserGroupOpen
                              .split(',')
                              .indexOf(groupName) !== -1
                              ? styles.br_bi_icon_chevron_up_svg
                              : styles.br_bi_icon_chevron_down_svg,
                          ],
                        },
                      ),
                      /*#__PURE__*/ _react.default.createElement(
                        _reactNative.Text,
                        {
                          style: styles.brHeaderSearchConditionsUserGroupName,
                        },
                        groupName,
                      ),
                      groupTable[groupName].buddyNodes,
                    )
                  }),
              ),
            ),
            /*#__PURE__*/ _react.default.createElement(_reactNative.View, {
              style: {
                flex: 1,
              },
            }),
            /*#__PURE__*/ _react.default.createElement(_ButtonIconic.default, {
              style: [styles.brHeaderSearchConditionsDetailButton],
              title:
                _uawmsgs.default.LBL_PANEL_HEADER_SEARCH_DETAIL_BUTTON_TOOLTIP,
              onPress:
                this.handleHeaderSearchConditionsDetailButtonClick.bind(this),
              iconSource: this.state.historySummariesWithHeader
                ? /*#__PURE__*/ _react.default.createElement(
                    _ChevronUpIcon.default,
                    null,
                  )
                : /*#__PURE__*/ _react.default.createElement(
                    _ChevronDownIcon.default,
                    null,
                  ),
            }),
          )
          contents = /*#__PURE__*/ _react.default.createElement(
            _HistorySummariesPanel.default,
            {
              uiData: props.uiData,
              panelType: props.panelType,
              panelCode: props.panelCode,
              withHeader: this.state.historySummariesWithHeader,
            },
          )
        } else if (props.panelType === 'HISTORYDETAIL') {
          panelTypeClassName = 'brHistoryDetail'
          headerTitle =
            _uawmsgs.default.LBL_PANEL_HEADER_HISTORYDETAIL_TITLE +
            (0, _strings.string)(
              (
                (props.uiData.historyDetailWorkTable &&
                  props.uiData.historyDetailWorkTable[props.panelCode]) ||
                {}
              ).historyDetailName,
            )
          var isBuddy = false
          try {
            isBuddy = props.uiData.ucUiStore.getBuddyUserForUi(
              JSON.parse(
                (props.uiData.historyDetailWorkTable &&
                  props.uiData.historyDetailWorkTable[props.panelCode] &&
                  props.uiData.historyDetailWorkTable[props.panelCode]
                    .chatPanelCode) ||
                  '{}',
              ),
            ).isBuddy
          } catch (e) {}
          if (
            !(
              props.uiData.configurations.headerButtons &&
              props.uiData.configurations.headerButtons.indexOf('chat') === -1
            )
          ) {
            headerButtons.push(
              /*#__PURE__*/ _react.default.createElement(
                _ButtonIconic.default,
                {
                  key: 'chat',
                  style: styles.brPanelHeaderButton,
                  disabled: !isBuddy,
                  title: _uawmsgs.default.LBL_PANEL_HEADER_CHAT_BUTTON_TOOLTIP,
                  onPress: props.uiData.fire.bind(
                    props.uiData,
                    'panelHeaderChatButton_onClick',
                    props.panelType,
                    props.panelCode,
                  ),
                  iconSource: /*#__PURE__*/ _react.default.createElement(
                    _ChatIcon.default,
                    {
                      color: '#ffffff',
                    },
                  ),
                },
              ),
            )
          }
          if (
            !(
              props.uiData.configurations.headerButtons &&
              props.uiData.configurations.headerButtons.indexOf('history') ===
                -1
            )
          ) {
            headerButtons.push(
              /*#__PURE__*/ _react.default.createElement(
                _ButtonIconic.default,
                {
                  key: 'history',
                  style: styles.brPanelHeaderButton,
                  disabled: !(
                    props.uiData.historyDetailWorkTable &&
                    props.uiData.historyDetailWorkTable[props.panelCode] &&
                    props.uiData.historyDetailWorkTable[props.panelCode]
                      .chatPanelCode
                  ),
                  title:
                    _uawmsgs.default.LBL_PANEL_HEADER_HISTORY_BUTTON_TOOLTIP,
                  onPress: props.uiData.fire.bind(
                    props.uiData,
                    'panelHeaderHistoryButton_onClick',
                    props.panelType,
                    props.panelCode,
                  ),
                  iconSource: /*#__PURE__*/ _react.default.createElement(
                    _HistoryIcon.default,
                    {
                      color: '#ffffff',
                    },
                  ),
                },
              ),
            )
          }
          contents = /*#__PURE__*/ _react.default.createElement(
            _HistoryDetailPanel.default,
            {
              uiData: props.uiData,
              panelType: props.panelType,
              panelCode: props.panelCode,
            },
          )
        }
        return /*#__PURE__*/ _react.default.createElement(
          _reactNative.View,
          {
            ref: this.panelHeaderAreaRef,
            style: [
              styles.brPanelArea,
              styles[panelTypeClassName],
              props.uiData.currentSelectedTab ===
              props.panelType + '_' + props.panelCode
                ? styles.brSelected
                : null,
              this.state.headerButtonsCollapsible
                ? styles.brHeaderButtonsCollapsible
                : null,
              // props.uiData.configurations.headerButtonsVisible
              //   ? styles.brHeaderButtonsVisible
              //   : null,
            ],
          },
          /*#__PURE__*/ _react.default.createElement(
            _reactNative.View,
            {
              style: [
                styles.brPanelAreaInner,
                props.panelType === 'CONFERENCE' || props.panelType === 'CHAT'
                  ? {
                      zIndex: 1,
                    }
                  : {},
              ],
            },
            contents,
          ),
          /*#__PURE__*/ _react.default.createElement(
            _reactNative.View,
            {
              ref: this.panelHeaderAreaRef,
              style: [
                styles.brPanelHeaderArea,
                props.panelType === 'HISTORYSEARCH'
                  ? {
                      zIndex: 1,
                    }
                  : {},
              ],
            },
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.Text,
              {
                ref: this.panelHeaderTitleRef,
                style: [
                  styles.brPanelHeaderTitle,
                  headerTitle ? null : styles.brPanelHeaderTitleHidden,
                ],
                numberOfLines: 1,
                // ellipsizeMode='tail'
              },
              headerTitle,
            ),
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.Text,
              {
                ref: this.panelHeaderInfoRef,
                style: [
                  styles.brPanelHeaderInfo,
                  headerInfo ? null : styles.brPanelHeaderInfoHidden,
                  props.panelType === 'PREFERENCE'
                    ? styles.brPreferencePanelHeaderInfo
                    : null,
                ],
                numberOfLines: 1,
                ellipsizeMode: 'tail',
              },
              headerInfo,
            ),
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.View,
              {
                ref: this.panelHeaderMembersRef,
                style: [
                  styles.brPanelHeaderMembers,
                  headerMembers.length
                    ? null
                    : styles.brPanelHeaderMembersHidden,
                ],
              },
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.ScrollView,
                // horizontal
                {
                  showsHorizontalScrollIndicator: false,
                  contentContainerStyle: styles.headerMembersScrollContent,
                  nestedScrollEnabled: true,
                },
                headerMembers,
              ),
            ),
            props.uiData.configurations.headerButtonsVisible &&
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.View,
                {
                  ref: this.panelHeaderButtonsAreaRef,
                  style: styles.brPanelHeaderButtonsArea,
                },
                /*#__PURE__*/ _react.default.createElement(
                  _reactNative.View,
                  {
                    style: {
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      flex: 1,
                    },
                  },
                  headerButtons,
                ),
              ),
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.TouchableOpacity,
              {
                style: [
                  styles.brPanelHeaderButtonsMenu,
                  headerButtons.length ? null : styles.brHidden,
                ],
                onPress: this.handlePanelHeaderButtonsMenuClick.bind(this),
              },
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.View,
                {
                  style: [
                    styles.brPanelHeaderButtonsBalloonDialog,
                    props.uiData.showingDialogVersion ===
                    this.state.showingDialogVersion
                      ? null
                      : styles.brPanelHeaderButtonsBalloonDialogHidden,
                  ],
                },
                headerButtons,
              ),
            ),
            /*#__PURE__*/ _react.default.createElement(
              _MenuBalloonDialog.default,
              {
                style: [
                  styles.brReplyWebchatBalloonDialog,
                  this.state.replyDialogStyle,
                ],
                showing:
                  props.uiData.showingDialogVersion ===
                    this.state.showingDialogVersion &&
                  props.uiData.showingDialogVersion ===
                    this.state.showingReplyDialogVersion,
              },
              replyOptions.map(function (s, i) {
                return /*#__PURE__*/ _react.default.createElement(
                  _MenuItem.default,
                  {
                    key: i,
                    style: [styles.brReplyWebchatMenuItem, styles[s.className]],
                    onPress: s.event,
                  },
                  s.label,
                )
              }),
            ),
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.View,
              {
                style: [
                  styles.brPanelHeaderSimpleButtonsArea,
                  props.uiData.configurations.panelHeader
                    ? styles.brPanelHeaderSimpleButtonsAreaVisible
                    : null,
                ],
              },
              headerSimpleButtons,
            ),
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.View,
              {
                ref: this.panelHeaderSearchConditionsRef,
                style: [
                  styles.brHeaderSearchConditions,
                  headerSearchConditions
                    ? null
                    : styles.brHeaderSearchConditionsHidden,
                  // { width: this.state.headerSearchConditionsWidth },
                ],
              },
              headerSearchConditions,
            ),
          ),
        )
      },
    },
  ])
})(_react.default.Component))
var styles = _reactNative.StyleSheet.create({
  brPanelArea: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    // flex: 1
  },
  brPanelHeaderArea: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    // zIndex: 0,
  },
  brPanelHeaderTitle: {
    maxHeight: '100%',
    paddingLeft: 22,
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.3,
  },
  brPanelHeaderTitleHidden: {
    display: 'none',
  },
  brPanelHeaderInfo: {
    maxHeight: '100%',
    paddingLeft: 26,
    fontSize: 9,
    fontWeight: '400',
    letterSpacing: 1.3,
    color: '#666666', // @dark_gray
  },
  brPanelHeaderInfoHidden: {
    display: 'none',
  },
  brPreferencePanelHeaderInfo: {
    marginLeft: 16,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
    borderWidth: 1,
    borderColor: '#FF5A1F',
    // @portland_orange
    color: '#FF5A1F',
    // @portland_orange
    fontSize: 13,
    fontWeight: '400',
    letterSpacing: 0.3,
  },
  brPanelHeaderMembers: {
    paddingHorizontal: 3,
    maxWidth: '100%',
    overflow: 'hidden',
    paddingLeft: 22,
    fontSize: 9,
    fontWeight: '400',
    maxHeight: '100%',
    color: '#666666', // @dark_gray
  },
  headerMembersScrollContent: {
    paddingRight: 8,
  },
  brPanelHeaderMembersHidden: {
    display: 'none',
  },
  brConfStatus1: {
    color: '#E5E5E5', // @platinum
  },
  brPanelHeaderButtonsArea: {
    position: 'absolute',
    left: '30%',
    top: '25%',
    bottom: 0,
    right: 0,
    height: 32,
  },
  brHeaderButtonsVisible: {
    height: 32,
  },
  brPanelHeaderButton: {
    marginHorizontal: 2,
    backgroundColor: '#7AC142', // @mantis
  },
  brPanelHeaderButtonDisabled: {
    backgroundColor: '#CCCCCC', // @disabled_gray
  },
  brPanelHeaderButtonKick: {
    backgroundColor: '#FF5A1F', // @portland_orange
  },
  brPanelHeaderButtonIcon: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    tintColor: '#FFFFFF',
  },
  brPanelHeaderButtonsMenu: {
    position: 'absolute',
    right: 8,
    top: '50%',
    transform: [
      {
        translateY: -16,
      },
    ], // Half of the default button height
  },
  brPanelHeaderButtonsBalloonDialog: {
    position: 'absolute',
    right: -4,
    top: 36,
    height: 40,
    padding: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    shadowColor: '#E5E5E5',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  brPanelHeaderButtonsBalloonDialogHidden: {
    display: 'none',
  },
  brReplyWebchatBalloonDialog: {
    position: 'absolute',
  },
  brPanelHeaderSimpleButtonsArea: {
    position: 'absolute',
    right: 2,
    top: '50%',
    height: 20,
    transform: [
      {
        translateY: -10,
      },
    ],
    // Half of the height
    display: 'none',
  },
  brPanelHeaderSimpleButtonsAreaVisible: {
    display: 'flex',
  },
  brSimpleButton: {
    width: 20,
    height: 20,
    marginLeft: 2,
  },
  brHeaderSearchConditions: {
    maxWidth: 600,
    height: 42,
    // zIndex: 100,
  },
  brHeaderSearchConditionsHidden: {
    display: 'none',
  },
  brHeaderSearchConditionsDetailButton: {
    width: 32,
    height: 32,
  },
  brHeaderSearchConditionsContentArea: {
    minWidth: 120,
    width: 120,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  brHeaderSearchConditionsContentInput: {
    // minWidth: 100,
    // width: 100,
    flex: 1,
    paddingLeft: 8,
    // height: 32,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  brHeaderSearchConditionsSearchButton: {
    position: 'absolute',
    right: 5,
    width: 32,
    top: 2,
    height: 32,
    opacity: 0.2,
  },
  brHeaderSearchConditionsUserArea: {
    // position: 'absolute',
    // left: 12,
    width: 120,
    // top: 5,
    height: 32,
    // zIndex: 20
  },
  brHeaderSearchConditionsUserMenu: {
    // position: 'absolute',
    // left: 0,
    // width: '100%',
    // top: 0,
    // height: '100%',
    width: 120,
    // zIndex: 20
  },
  brHeaderSearchConditionsUserGroup: {
    position: 'relative',
    minWidth: 80,
  },
  brGroupName: {
    paddingTop: 24,
  },
  brHeaderSearchConditionsUserGroupIcon: {
    position: 'absolute',
    right: 4,
    width: 16,
    top: 4,
    height: 16,
  },
  brHeaderSearchConditionsUserGroupName: {
    position: 'absolute',
    left: 0,
    width: '100%',
    top: 0,
    height: 24,
    fontSize: 9,
    fontWeight: '400',
    letterSpacing: 1.3,
    paddingLeft: 8,
    color: '#666666', // @dark_gray
  },
  brPanelHeaderInviteDndable: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  brPanelHeaderInviteDndableCanDrop: {
    display: 'flex',
  },
  brPanelHeaderInviteDndableIsOver: {
    borderWidth: 3,
    borderColor: '#48C9B0', // @medium_turquoise
  },
  brPanelAreaInner: {
    position: 'absolute',
    left: 0,
    top: 56,
    bottom: 0,
    width: '100%',
    // zIndex: 1
  },
  brHidden: {
    display: 'none',
  },
  brPanelAreaDialog: {
    zIndex: 100,
    top: 32,
  },
})
