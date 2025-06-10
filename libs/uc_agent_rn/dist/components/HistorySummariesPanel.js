'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _react = _interopRequireDefault(require('react'))
var _uawmsgs = _interopRequireDefault(require('../utilities/uawmsgs'))
var _constants = _interopRequireDefault(require('../utilities/constants'))
var _strings = require('../utilities/strings')
var _ButtonIconic = _interopRequireDefault(require('./ButtonIconic'))
var _DropDownMenu = _interopRequireDefault(require('./DropDownMenu'))
var _HistoryDetailArea = _interopRequireDefault(require('./HistoryDetailArea'))
var _MenuBalloonDialog = _interopRequireDefault(require('./MenuBalloonDialog'))
var _MenuItem = _interopRequireDefault(require('./MenuItem'))
var _NameEmbeddedSpan = _interopRequireDefault(require('./NameEmbeddedSpan'))
var _moment = _interopRequireDefault(require('moment'))
var _reactNative = require('react-native')
var _reactNativeDatePicker = _interopRequireDefault(
  require('react-native-date-picker'),
)
var _NewWindowIcon = _interopRequireDefault(require('../icons/NewWindowIcon'))
var _ReplyIcon = _interopRequireDefault(require('../icons/ReplyIcon'))
var _InternetIcon = _interopRequireDefault(require('../icons/InternetIcon'))
var _ConferenceForegroundSelectedIcon = _interopRequireDefault(
  require('../icons/ConferenceForegroundSelectedIcon'),
)
var _UserIcon = _interopRequireDefault(require('../icons/UserIcon'))
var _ChevronUpIcon = _interopRequireDefault(require('../icons/ChevronUpIcon'))
var _ChevronDownIcon = _interopRequireDefault(
  require('../icons/ChevronDownIcon'),
)
var _UploadIcon = _interopRequireDefault(require('../icons/UploadIcon'))
var _DownloadIcon = _interopRequireDefault(require('../icons/DownloadIcon'))
var _PhoneIcon = _interopRequireDefault(require('../icons/PhoneIcon'))
var _JobIcon = _interopRequireDefault(require('../icons/JobIcon'))
var _jsxRuntime = require('react/jsx-runtime')
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e }
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
 * HistorySummariesPanel
 * props.uiData
 * props.uiData.ucUiAction
 * props.uiData.ucUiStore
 * props.uiData.showingDialog_update
 * props.uiData.historySummariesPanelOpenDetailButton_onClick
 * props.uiData.historySummariesPanelContinuationButton_onClick
 * props.panelType
 * props.panelCode
 * props.withHeader
 */
var _default = (exports.default = /*#__PURE__*/ (function (_React$Component) {
  function _default(props) {
    var _this
    _classCallCheck(this, _default)
    _this = _callSuper(this, _default, [props])
    // componentDidUpdate() {
    //   if (this.historySummariesAreaRef.current) {
    //     this.historySummariesAreaRef.current.measure((x, y, width, height) => {
    //       if (this.state.areaHeight !== height) {
    //         this.setState({ areaHeight: height })
    //         return
    //       }
    //       this.checkAndSearchMore()
    //     })
    //   }
    // }
    _defineProperty(
      _this,
      'handleContentSizeChange',
      function (contentWidth, height) {
        _this.setState({
          areaHeight: height,
        })
      },
    )
    _defineProperty(_this, 'handleHistorySummariesAreaScroll', function () {
      _this.checkAndSearchMore()
    })
    _defineProperty(
      _this,
      'handleHistorySummaryExpandButtonClick',
      function (searchResultId) {
        _this.props.uiData.ucUiAction.expandSearchResult({
          chatType: _this.props.panelType,
          chatCode: _this.props.panelCode,
          searchResultIds: [searchResultId],
        })
      },
    )
    _defineProperty(
      _this,
      'handleHistoryReplyWebchatButtonClick',
      function (searchResultId, ev) {
        if (
          _this.props.uiData.showingDialogVersion !==
            _this.state.showingReplyDialogVersion ||
          searchResultId !== _this.state.showingReplyDialogSearchResultId
        ) {
          _this.setState({
            showingReplyDialogVersion: ++_this.props.uiData
              .showingDialogVersion,
            showingReplyDialogSearchResultId: searchResultId,
          })
          _this.props.uiData.fire('showingDialog_update')
        }
      },
    )
    _defineProperty(
      _this,
      'handleSearchConditionsDatePickerChange',
      function (isEnd, moment) {
        var searchConditions =
          _this.props.uiData.ucUiStore.getSearchConditions({
            chatType: _this.props.panelType,
            chatCode: _this.props.panelCode,
          }) || []
        if (
          !searchConditions.some(function (condition) {
            if (condition.conditionKey === '_datetime') {
              var startEnd = (0, _strings.string)(
                condition.conditionValue,
              ).split('-')
              if (!isEnd) {
                startEnd[0] = (0, _strings.string)(
                  moment && moment.startOf('day').valueOf(),
                )
                startEnd[1] = (0, _strings.string)(startEnd[1])
              } else {
                startEnd[0] = (0, _strings.string)(startEnd[0])
                startEnd[1] = (0, _strings.string)(
                  moment && moment.endOf('day').valueOf(),
                )
              }
              condition.conditionValue = startEnd.join('-')
              return true
            }
            return false
          })
        ) {
          searchConditions.push({
            conditionKey: '_datetime',
            conditionValue: isEnd
              ? '-' +
                (0, _strings.string)(moment && moment.endOf('day').valueOf())
              : (0, _strings.string)(
                  moment && moment.startOf('day').valueOf(),
                ) + '-',
          })
        }
        _this.props.uiData.ucUiAction.setSearchConditions({
          chatType: _this.props.panelType,
          chatCode: _this.props.panelCode,
          searchConditions: searchConditions,
        })
        _this.props.uiData.ucUiAction.doSearch({
          chatType: _this.props.panelType,
          chatCode: _this.props.panelCode,
          emphasize: true,
          queueing: true,
        })
      },
    )
    _defineProperty(
      _this,
      'handleSearchConditionsWebchatItemClick',
      function (index) {
        var searchConditions =
          _this.props.uiData.ucUiStore.getSearchConditions({
            chatType: _this.props.panelType,
            chatCode: _this.props.panelCode,
          }) || []
        _this.props.uiData.ucUiAction.setSearchConditions({
          chatType: _this.props.panelType,
          chatCode: _this.props.panelCode,
          searchConditions: searchConditions
            .filter(function (condition) {
              return (
                condition.conditionKey !== '_onlyMe' &&
                condition.conditionKey !== '_chatType'
              )
            })
            .concat(
              index === 1
                ? {
                    conditionKey: '_chatType',
                    conditionValue: 'webchat',
                  }
                : {
                    conditionKey: '_onlyMe',
                    conditionValue: '2',
                  },
            ),
        })
        _this.props.uiData.ucUiAction.doSearch({
          chatType: _this.props.panelType,
          chatCode: _this.props.panelCode,
          emphasize: true,
          queueing: true,
        })
      },
    )
    _defineProperty(_this, 'checkAndSearchMore', function () {
      if (
        _this.historySummariesAreaRef.current &&
        _this.historyProgressRef.current
      ) {
        _this.historySummariesAreaRef.current.measure(
          function (x, y, width, height, pageX, pageY) {
            _this.historyProgressRef.current.measure(
              function (x2, y2, width2, height2) {
                var scrollInfo = {
                  scrollTop: pageY,
                  scrollHeight: height,
                  offsetHeight: height2,
                }
                if (
                  scrollInfo.scrollTop >
                  scrollInfo.scrollHeight - scrollInfo.offsetHeight - height2
                ) {
                  var searchWorkData =
                    _this.props.uiData.ucUiStore.getSearchWorkData({
                      chatType: _this.props.panelType,
                      chatCode: _this.props.panelCode,
                    }) || {}
                  if (searchWorkData.hasMore && !searchWorkData.searching) {
                    _this.props.uiData.ucUiAction.doSearch({
                      chatType: _this.props.panelType,
                      chatCode: _this.props.panelCode,
                      searchMore: true,
                      emphasize: true,
                    })
                  }
                }
              },
            )
          },
        )
      }
    })
    _defineProperty(_this, 'startProgressAnimation', function () {
      _reactNative.Animated.loop(
        _reactNative.Animated.sequence([
          _reactNative.Animated.timing(_this.progressAnimation, {
            toValue: 1,
            duration: 1500,
            easing: _reactNative.Easing.linear,
            useNativeDriver: true,
          }),
        ]),
      ).start()
    })
    _defineProperty(_this, 'convertSummary', function (summary, isMe) {
      var parts = summary.split(/(<span[^>]*>.*?<\/span>)/g)
      return /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
        style: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        children: parts.map(function (part, index) {
          if (!part) return null
          if (!part.trim()) return null
          console.log('#Duy Phan console part', part)
          if (part.startsWith('<span')) {
            var content = part.replace(/<span[^>]*>|<\/span>/g, '')
            var isEmphasized = /class="[^"]*brEmphasized[^"]*"/.test(part)
            var isFileRequest = /class="[^"]*brFileRequest[^"]*"/.test(part)
            var isCallResult = /class="[^"]*brCallResult[^"]*"/.test(part)
            var isObject = /class="[^"]*brObject[^"]*"/.test(part)
            if (isEmphasized) {
              return /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                _reactNative.Text,
                {
                  style: styles.brEmphasized,
                  children: content,
                },
                index,
              )
            }
            if (isFileRequest) {
              return /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
                children: [
                  isMe
                    ? /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                        _UploadIcon.default,
                        {},
                      )
                    : /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                        _DownloadIcon.default,
                        {},
                      ),
                  /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                    children: content,
                  }),
                ],
              })
            }
            if (isCallResult) {
              return /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
                children: [
                  /*#__PURE__*/ (0, _jsxRuntime.jsx)(_PhoneIcon.default, {}),
                  /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                    children: content,
                  }),
                ],
              })
            }
            if (isObject) {
              return /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
                children: [
                  /*#__PURE__*/ (0, _jsxRuntime.jsx)(_JobIcon.default, {}),
                  /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                    children: content,
                  }),
                ],
              })
            }
          } else {
            return /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
              children: part,
            })
          }
        }),
      })
    })
    _this.state = {
      areaHeight: 0,
      showingReplyDialogVersion: null,
      showingReplyDialogSearchResultId: null,
    }
    _this.historySummariesAreaRef = /*#__PURE__*/ _react.default.createRef()
    _this.historyProgressRef = /*#__PURE__*/ _react.default.createRef()
    _this.progressAnimation = new _reactNative.Animated.Value(0)
    return _this
  }
  _inherits(_default, _React$Component)
  return _createClass(_default, [
    {
      key: 'render',
      value: function render() {
        var _this2 = this
        var props = this.props
        console.log('#Duy Phan console areaHeight', this.state.areaHeight)
        var configProperties = props.uiData.ucUiStore.getConfigProperties()
        var searchConditions =
          props.uiData.ucUiStore.getSearchConditions({
            chatType: props.panelType,
            chatCode: props.panelCode,
          }) || []
        var searchResults =
          props.uiData.ucUiStore.getSearchResults({
            chatType: props.panelType,
            chatCode: props.panelCode,
          }) || []
        var searchWorkData =
          props.uiData.ucUiStore.getSearchWorkData({
            chatType: props.panelType,
            chatCode: props.panelCode,
          }) || {}
        var profile_image_url = ''
        // results
        var entries = searchResults.map(function (searchResult) {
          var replyOptions = []
          var replyTypes = (0, _strings.string)(searchResult.replyTypes).split(
            ',',
          )
          if (
            'TRUE' ===
            (0, _strings.string)(searchResult.webchatContinuable).toUpperCase()
          ) {
            replyOptions.push({
              className: 'brManualContinuation',
              event: props.uiData.fire.bind(
                props.uiData,
                'historySummariesPanelContinuationButton_onClick',
                props.panelType,
                props.panelCode,
                searchResult.searchResultId,
                '',
              ),
              label:
                _uawmsgs.default.LBL_HISTORY_REPLY_MANUAL_CONTINUATION_MENU,
            })
          }
          if (
            (
              (configProperties.optional_config &&
                configProperties.optional_config.awsl) ||
              []
            ).some(function (aws) {
              return aws.id === searchResult.webchatServiceId && aws.senders
            })
          ) {
            replyTypes.forEach(function (replyType, i) {
              if (replyType) {
                replyOptions.push({
                  className: 'brContinuation',
                  event: props.uiData.fire.bind(
                    props.uiData,
                    'historySummariesPanelContinuationButton_onClick',
                    props.panelType,
                    props.panelCode,
                    searchResult.searchResultId,
                    replyType,
                  ),
                  label: replyType,
                })
              }
            })
          }
          return /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
            _reactNative.View,
            {
              style: styles.brHistorySummaryEntry,
              children: [
                /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                  style: styles.brHistoryOpenDetailArea,
                  children: [
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_ButtonIconic.default, {
                      style: styles.brHistoryOpenDetailButton,
                      iconSource: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                        _NewWindowIcon.default,
                        {},
                      ),
                      accessibilityLabel:
                        _uawmsgs.default.LBL_HISTORY_OPEN_DETAIL_BUTTON_TOOLTIP,
                      onPress: props.uiData.fire.bind(
                        props.uiData,
                        'historySummariesPanelOpenDetailButton_onClick',
                        props.panelType,
                        props.panelCode,
                        searchResult.searchResultId,
                        searchResult._topic && searchResult._topic.peer,
                        searchResult.chatType === 'webchat'
                          ? (0, _strings.string)(searchResult.customerName)
                          : searchResult.chatType === 'userchatconf'
                            ? (0, _strings.string)(
                                searchResult._topic &&
                                  searchResult._topic.peer &&
                                  searchResult._topic.peer.subject,
                              )
                            : (0, _strings.string)(
                                searchResult._topic &&
                                  searchResult._topic.peer &&
                                  (searchResult._topic.peer.user_name ||
                                    searchResult._topic.peer.user_id),
                              ),
                      ),
                    }),
                    replyOptions.length > 0 &&
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                        _ButtonIconic.default,
                        {
                          style: styles.brHistoryReplyWebchatButton,
                          iconSource: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _ReplyIcon.default,
                            {},
                          ),
                          accessibilityLabel:
                            _uawmsgs.default.LBL_HISTORY_REPLY_BUTTON_TOOLTIP,
                          onPress:
                            replyOptions.length === 1
                              ? replyOptions[0].event
                              : function () {
                                  return _this2.handleHistoryReplyWebchatButtonClick(
                                    searchResult.searchResultId,
                                  )
                                },
                        },
                      ),
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                      _MenuBalloonDialog.default,
                      {
                        style: styles.brHistoryReplyWebchatBalloonDialog,
                        showing:
                          props.uiData.showingDialogVersion ===
                            _this2.state.showingReplyDialogVersion &&
                          searchResult.searchResultId ===
                            _this2.state.showingReplyDialogSearchResultId,
                        children: replyOptions.map(function (option, i) {
                          return /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _MenuItem.default,
                            {
                              style: [
                                styles.brHistoryReplyWebchatMenuItem,
                                styles[option.className],
                              ],
                              accessibilityLabel: option.label,
                              onPress: option.event,
                              children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                _reactNative.Text,
                                {
                                  children: option.label,
                                },
                              ),
                            },
                            i,
                          )
                        }),
                      },
                    ),
                  ],
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                  style: [
                    styles.brHistorySummary,
                    searchResult._expanded && styles.brExpanded,
                  ],
                  // onClick={
                  //   searchResult._expanded
                  //     ? () => {}
                  //     : this.handleHistorySummaryExpandButtonClick.bind(
                  //         this,
                  //         searchResult.searchResultId,
                  //       )
                  // }
                  children: [
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                      style: [
                        {
                          flexDirection: 'row',
                          position: 'relative',
                        },
                      ],
                      children: /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                        _reactNative.View,
                        {
                          style: {
                            alignItems: 'flex-start',
                            gap: 3,
                          },
                          children: [
                            /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                              _reactNative.View,
                              {
                                style: {
                                  flexDirection: 'row',
                                },
                                children: [
                                  /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                    _reactNative.Text,
                                    {
                                      style: styles.brHistorySummaryName,
                                      children:
                                        searchResult.chatType === 'webchat'
                                          ? (0, _strings.string)(
                                              searchResult.customerName,
                                            )
                                          : searchResult.chatType ===
                                              'userchatconf'
                                            ? (0, _strings.string)(
                                                searchResult._topic &&
                                                  searchResult._topic.peer &&
                                                  searchResult._topic.peer
                                                    .subject,
                                              )
                                            : (0, _strings.string)(
                                                searchResult._topic &&
                                                  searchResult._topic.peer &&
                                                  (searchResult._topic.peer
                                                    .user_name ||
                                                    searchResult._topic.peer
                                                      .user_id),
                                              ),
                                    },
                                  ),
                                  /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                    _reactNative.Text,
                                    {
                                      style: styles.brHistorySummaryTime,
                                      children: searchResult.customerStartTime
                                        ? (0, _strings.formatMessageDateTime)(
                                            searchResult.customerStartTime,
                                          )
                                        : '',
                                    },
                                  ),
                                ],
                              },
                            ),
                            searchResult._profinfoFormatted
                              ? /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                  _reactNative.Text,
                                  {
                                    style: styles.brHistorySummaryProfinfo,
                                    children: (0, _strings.string)(
                                      searchResult._profinfoFormatted,
                                    ),
                                  },
                                )
                              : null,
                            (searchResult.chatType === 'webchat' &&
                              searchResult._topic &&
                              searchResult.customerTenant ===
                                searchResult._topic.content_sender_tenant &&
                              searchResult.customerUserId ===
                                searchResult._topic.content_sender_user_id) ||
                            (searchResult.chatType === '' &&
                              searchResult._topic &&
                              searchResult._topic.peer &&
                              searchResult._topic.peer.tenant ===
                                searchResult._topic.content_sender_tenant &&
                              searchResult._topic.peer.user_id ===
                                searchResult._topic.content_sender_user_id)
                              ? null
                              : /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                  _reactNative.Text,
                                  {
                                    children: (0, _strings.string)(
                                      (
                                        (searchResult._topic &&
                                          props.uiData.ucUiStore.getBuddyUserForUi(
                                            {
                                              tenant:
                                                searchResult._topic
                                                  .content_sender_tenant,
                                              user_id:
                                                searchResult._topic
                                                  .content_sender_user_id,
                                            },
                                          )) ||
                                        {}
                                      ).name,
                                    ),
                                  },
                                ),
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _reactNative.Text,
                              {
                                style: styles.brHistorySummarySummary,
                                children: _this2.convertSummary(
                                  searchResult.summary,
                                  (
                                    (searchResult._topic &&
                                      props.uiData.ucUiStore.getBuddyUserForUi({
                                        tenant:
                                          searchResult._topic
                                            .content_sender_tenant,
                                        user_id:
                                          searchResult._topic
                                            .content_sender_user_id,
                                      })) ||
                                    {}
                                  ).isMe,
                                ),
                              },
                            ),
                          ],
                        },
                      ),
                    }),
                    searchResult._expanded &&
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                        style: styles.brHistorySummaryMarker,
                      }),
                    searchResult.chatType === 'webchat'
                      ? ((profile_image_url = (0, _strings.string)(
                          searchResult._topic &&
                            searchResult._topic.tags &&
                            searchResult._topic.tags
                              .filter(function (tag) {
                                return (
                                  tag.tag_type === '_webchat' &&
                                  tag.tag_key === 'myProfileImageUrl'
                                )
                              })
                              .sort(function (tag1, tag2) {
                                return tag1.tstamp - tag2.tstamp
                              })
                              .map(function (tag) {
                                return tag.tag_value
                              })
                              .pop(),
                        )) &&
                          false) ||
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                          style: [
                            styles.brHistorySummaryImage,
                            profile_image_url
                              ? (0, _strings.string)(profile_image_url).indexOf(
                                  _constants.default.PROFILE_IMAGE_URL_DOWNLOAD,
                                ) === -1
                                ? styles.brMyProfileImageUrl
                                : {}
                              : styles.brWithIcon,
                          ],
                          children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _reactNative.View,
                            {
                              style: styles.brIcon,
                              children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                _InternetIcon.default,
                                {},
                              ),
                            },
                          ),
                        })
                      : searchResult.chatType === 'userchatconf'
                        ? /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _reactNative.View,
                            {
                              style: styles.brHistorySummaryImage,
                              children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                _reactNative.View,
                                {
                                  style: styles.brIcon,
                                  children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                    _ConferenceForegroundSelectedIcon.default,
                                    {},
                                  ),
                                },
                              ),
                            },
                          )
                        : ((profile_image_url = (0, _strings.string)(
                            (
                              props.uiData.ucUiStore.getBuddyUserForUi(
                                searchResult._topic && searchResult._topic.peer,
                              ) || {}
                            ).profile_image_url,
                          )) &&
                            false) ||
                          /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _reactNative.View,
                            {
                              style: [
                                styles.brHistorySummaryImage,
                                profile_image_url
                                  ? (0, _strings.string)(
                                      profile_image_url,
                                    ).indexOf(
                                      _constants.default
                                        .PROFILE_IMAGE_URL_DOWNLOAD,
                                    ) === -1
                                    ? styles.brMyProfileImageUrl
                                    : {}
                                  : styles.brNoImage,
                              ],
                              children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                _reactNative.Image,
                                {
                                  source: {
                                    uri: profile_image_url,
                                  },
                                  style: styles.brHistorySummaryImage,
                                },
                              ),
                            },
                          ),
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_ButtonIconic.default, {
                      style: styles.brHistorySummaryExpandButton,
                      iconSource: searchResult._expanded
                        ? /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _ChevronUpIcon.default,
                            {},
                          )
                        : /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _ChevronDownIcon.default,
                            {},
                          ),
                      accessibilityLabel:
                        _uawmsgs.default.LBL_HISTORY_SUMMARY_EXPAND_BUTTON,
                      onPress:
                        _this2.handleHistorySummaryExpandButtonClick.bind(
                          _this2,
                          searchResult.searchResultId,
                        ),
                    }),
                    searchResult._expanded &&
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                        style: {
                          flex: 1,
                        },
                        children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                          _HistoryDetailArea.default,
                          {
                            uiData: props.uiData,
                            hasMore: searchWorkData.hasMore,
                            panelType: 'SEARCHRESULTDETAIL',
                            panelCode: searchResult.searchResultId,
                          },
                        ),
                      }),
                  ],
                }),
              ],
            },
            (0, _strings.string)(searchResult.searchResultId),
          )
        })
        // conditions
        var conditions = {
          _datetime: {},
          _onlyMe: {},
          _chatType: {},
        }
        searchConditions.forEach(function (condition) {
          return (conditions[condition.conditionKey] = condition)
        })
        var startEnd = (0, _strings.string)(
          conditions._datetime.conditionValue,
        ).split('-')
        var startMoment = startEnd[0]
          ? (0, _moment.default)((0, _strings.int)(startEnd[0]))
          : null
        var endMoment = startEnd[1]
          ? (0, _moment.default)((0, _strings.int)(startEnd[1]))
          : null
        console.log('#Duy Phan console count expands', entries.length)
        return /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: [
            styles.brHistorySummariesPanel,
            props.withHeader && styles.brWithHeader,
          ],
          children: [
            /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.ScrollView, {
              ref: this.historySummariesAreaRef,
              style: [
                styles.brHistorySummariesArea,
                props.uiData.currentSelectedTab ===
                  props.panelType + '_' + props.panelCode && styles.brSelected,
                searchResults.some(function (result) {
                  return result._expanded
                }) && styles.brDetailClosed,
                searchWorkData.searching && styles.brSearching,
                searchWorkData.hasMore && styles.brHasMore,
                searchWorkData.errorType && styles.brError,
              ],
              contentContainerStyle: [
                entries.length === 0 && styles.brNoEntries,
              ],
              onScroll: this.handleHistorySummariesAreaScroll,
              onContentSizeChange: this.handleContentSizeChange,
              nestedScrollEnabled: true,
              children: [
                entries.length > 0 &&
                  /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                    style: [
                      styles.brHistorySummariesAreaMarker,
                      {
                        height: this.state.areaHeight,
                      },
                    ],
                  }),
                /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                  style: styles.brHistorySummariesList,
                  children: [
                    entries,
                    entries.length === 0 &&
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                        style: styles.brHistoryNoResults,
                        children: _uawmsgs.default.LBL_HISTORY_NO_RESULTS,
                      }),
                    searchWorkData.errorType &&
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                        style: styles.brHistoryError,
                        children:
                          (_uawmsgs.default[searchWorkData.errorType] ||
                            searchWorkData.errorType) +
                          (searchWorkData.errorDetail
                            ? ' ('.concat(searchWorkData.errorDetail, ')')
                            : ''),
                      }),
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                      ref: this.historyProgressRef,
                      style: styles.brHistoryProgress,
                      children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                        _reactNative.Animated.View,
                        {
                          style: [
                            styles.brHistoryProgressInner,
                            {
                              transform: [
                                {
                                  rotate: this.progressAnimation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0deg', '360deg'],
                                  }),
                                },
                              ],
                            },
                          ],
                        },
                      ),
                    }),
                  ],
                }),
              ],
            }),
            props.withHeader &&
              /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: styles.brHistorySummariesHeader,
                children: [
                  /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.brHistorySummariesHeaderDateLabel,
                    children: _uawmsgs.default.LBL_HISTORY_DATE,
                  }),
                  /*#__PURE__*/ (0, _jsxRuntime.jsx)(CustomDatePicker, {
                    style: [styles.brSearchConditionsDatePicker],
                    value: startMoment ? startMoment.toDate() : null,
                    onChange: function onChange(date) {
                      _this2.handleSearchConditionsDatePickerChange(
                        false,
                        date ? (0, _moment.default)(date) : null,
                      )
                    },
                  }),
                  /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                    style: styles.brHistorySummariesHeaderDateSeparator,
                    children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                      _reactNative.Text,
                      {
                        children: '-',
                      },
                    ),
                  }),
                  /*#__PURE__*/ (0, _jsxRuntime.jsx)(CustomDatePicker, {
                    style: [styles.brSearchConditionsDatePicker],
                    value: endMoment ? endMoment.toDate() : null,
                    onChange: function onChange(date) {
                      _this2.handleSearchConditionsDatePickerChange(
                        true,
                        date ? (0, _moment.default)(date) : null,
                      )
                    },
                  }),
                  /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_DropDownMenu.default, {
                    uiData: props.uiData,
                    style: styles.brSearchConditionsWebchatMenu,
                    dialogStyle: {
                      minWidth: 160,
                      left: 16,
                      top: 32,
                    },
                    dia: true,
                    text:
                      (0, _strings.string)(
                        conditions._onlyMe.conditionValue,
                      ) === '2'
                        ? _uawmsgs.default.LBL_HISTORY_YOUR_CHATS
                        : (0, _strings.string)(
                              conditions._chatType.conditionValue,
                            ) === 'webchat'
                          ? _uawmsgs.default.LBL_HISTORY_WEBCHATS
                          : '',
                    children: [
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_MenuItem.default, {
                        style: styles.brSearchConditionsWebchatItem,
                        dropDown: true,
                        onPress:
                          this.handleSearchConditionsWebchatItemClick.bind(
                            this,
                            0,
                          ),
                        children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                          _reactNative.Text,
                          {
                            children: _uawmsgs.default.LBL_HISTORY_YOUR_CHATS,
                          },
                        ),
                      }),
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_MenuItem.default, {
                        style: styles.brSearchConditionsWebchatItem,
                        dropDown: true,
                        onPress:
                          this.handleSearchConditionsWebchatItemClick.bind(
                            this,
                            1,
                          ),
                        children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                          _reactNative.Text,
                          {
                            children: _uawmsgs.default.LBL_HISTORY_WEBCHATS,
                          },
                        ),
                      }),
                    ],
                  }),
                ],
              }),
          ],
        })
      },
    },
  ])
})(_react.default.Component))
var CustomDatePicker = function CustomDatePicker(_ref) {
  var value = _ref.value,
    onChange = _ref.onChange,
    style = _ref.style
  var _React$useState = _react.default.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    show = _React$useState2[0],
    setShow = _React$useState2[1]
  var displayDate = value
    ? (0, _moment.default)(value).format('YYYY-MM-DD')
    : 'Select date'
  return /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: style,
    children: [
      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          return setShow(true)
        },
        style: styles.datePickerButton,
        children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
          style: styles.datePickerButtonText,
          children: displayDate,
        }),
      }),
      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNativeDatePicker.default, {
        date: value || new Date(),
        open: show,
        mode: 'date',
        modal: true,
        onConfirm: function onConfirm(selectedDate) {
          setShow(false)
          onChange(selectedDate)
        },
        onCancel: function onCancel() {
          return setShow(false)
        },
      }),
    ],
  })
}
var styles = _reactNative.StyleSheet.create({
  brHistorySummariesPanel: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  brHistorySummariesArea: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    padding: 4,
    backgroundColor: '#F5F5F5',
  },
  brWithHeader: {
    paddingTop: 48,
  },
  brSelected: {
    backgroundColor: '#FFFFFF',
  },
  brDetailClosed: {
    backgroundColor: '#FFFFFF',
  },
  brHistorySummariesAreaMarker: {
    position: 'absolute',
    width: 40,
    borderRightWidth: 1,
    borderRightColor: '#F0F0F0',
    marginLeft: -4,
    marginTop: -4,
  },
  brHistorySummaryEntry: {
    position: 'relative',
  },
  brHistoryOpenDetailArea: {
    position: 'relative',
    zIndex: 1,
    height: 0,
  },
  brHistoryOpenDetailButton: {
    position: 'absolute',
    right: 48,
    width: 32,
    top: 8,
    height: 32,
  },
  brHistoryReplyWebchatButton: {
    position: 'absolute',
    right: 88,
    width: 32,
    top: 8,
    height: 32,
  },
  brHistoryReplyWebchatBalloonDialog: {
    position: 'absolute',
    right: 120,
    top: 8,
  },
  brHistorySummary: {
    position: 'relative',
    minHeight: 64,
    flexDirection: 'column',
    zIndex: 0,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 65,
    // backgroundColor: 'blue',
  },
  brExpanded: {
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
  },
  brHistorySummaryMarker: {
    position: 'absolute',
    left: -8,
    width: 37,
    top: -1,
    bottom: -1,
    borderRightWidth: 2,
    borderRightColor: '#40E0D0',
    backgroundColor: '#F5F5F5',
  },
  brHistorySummaryImage: {
    position: 'absolute',
    left: 4,
    top: 7,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  brNoImage: {
    backgroundColor: '#F5F5F5',
  },
  brMyProfileImageUrl: {
    backgroundColor: 'transparent',
  },
  brWithIcon: {
    backgroundColor: '#E5E5E5',
  },
  brIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    opacity: 4.79,
  },
  brHistorySummaryName: {
    fontSize: 13,
    fontWeight: '500',
    // lineHeight: 1.6 * 13,
    letterSpacing: 0.3,
  },
  brHistorySummaryProfinfo: {
    fontSize: 9,
    fontWeight: '400',
    // lineHeight: 1.6 * 9,
    letterSpacing: 1.3,
    paddingLeft: 26,
    color: '#666666',
  },
  brHistorySummaryTime: {
    fontSize: 9,
    fontWeight: '400',
    // lineHeight: 1.6 * 9,
    letterSpacing: 1.3,
    paddingLeft: 26,
    color: '#666666',
  },
  brHistorySummarySenderName: {
    fontSize: 13,
    fontWeight: '500',
    // lineHeight: 1.6 * 13,
    letterSpacing: 0.3,
  },
  brHistorySummarySummary: {
    fontSize: 13,
    fontWeight: '400',
    // lineHeight: 1.6 * 13,
    letterSpacing: 0.3,
    paddingVertical: 1,
  },
  brHistorySummariesHeader: {
    position: 'absolute',
    right: 0,
    width: '100%',
    top: -1,
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    paddingRight: 16,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    zIndex: 0,
  },
  brHistorySummariesHeaderDateLabel: {
    paddingRight: 16,
    fontSize: 16,
    fontWeight: '400',
    // lineHeight: 1.6 * 16,
    letterSpacing: 0.3,
  },
  brHistorySummariesHeaderDateSeparator: {
    paddingHorizontal: 8,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 1.6 * 16,
    letterSpacing: 0.3,
  },
  brSearchConditionsDatePicker: {
    width: 120,
    height: 32,
    paddingLeft: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 4,
    fontSize: 13,
    fontWeight: '400',
    letterSpacing: 0.3,
    color: '#1A2421',
  },
  brSearchConditionsStartDatePicker: {
    right: 300,
  },
  brSearchConditionsEndDatePicker: {
    right: 50,
  },
  brSearchConditionsWebchatMenu: {
    width: 160,
    marginLeft: 16,
    // alignItems: 'flex-start',
  },
  brHistoryProgress: {
    height: 28,
    alignItems: 'center',
    display: 'none',
  },
  brHistoryProgressInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#40E0D0',
  },
  brEmphasized: {
    fontWeight: 'bold',
    color: '#40E0D0',
  },
  brHistoryDetailArea: {
    overflow: 'hidden',
    maxHeight: 0,
  },
  brHistoryDetailAreaExpanded: {
    maxHeight: '50%',
  },
  brNoEntries: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  brSearching: {
    opacity: 0.5,
  },
  brHasMore: {
    paddingBottom: 32,
  },
  brError: {
    backgroundColor: '#FFE4E1',
  },
  brHistorySummariesList: {
    padding: 8,
  },
  brHistoryNoResults: {
    textAlign: 'center',
    padding: 16,
    marginTop: 30,
    color: '#666666',
  },
  brHistoryError: {
    padding: 16,
    color: '#FF0000',
  },
  brManualContinuation: {
    backgroundColor: '#82C341', // @mantis color
  },
  brContinuation: {
    backgroundColor: '#4CAF50', // @green color
  },
  brHistorySummaryExpandDummy: {
    height: 32,
  },
  brHistorySummaryExpandButton: {
    position: 'absolute',
    right: 8,
    top: 8,
    width: 32,
    height: 32,
    // backgroundColor: '#82C341',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brHistoryReplyWebchatMenuItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  datePickerButton: {
    height: 32,
    // paddingHorizontal: 8,
    // backgroundColor: '#FFFFFF',
    // borderWidth: 1,
    // borderColor: '#E5E5E5',
    // borderRadius: 4,
    justifyContent: 'center',
  },
  datePickerButtonText: {
    fontSize: 14,
    color: '#212121',
  },
  datePickerIOS: {
    height: 120,
    width: 320,
  },
})
