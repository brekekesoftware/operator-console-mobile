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
var _DndableSafe = _interopRequireDefault(require('./DndableSafe'))
var _MenuBalloonDialog = _interopRequireDefault(require('./MenuBalloonDialog'))
var _MenuItem = _interopRequireDefault(require('./MenuItem'))
var _PanelArea = _interopRequireDefault(require('./PanelArea'))
var _StatusIcon = _interopRequireDefault(require('./StatusIcon'))
var _animate = _interopRequireDefault(require('../utilities/animate'))
var _reactNative = require('react-native')
var _TriangleDownIcon = _interopRequireDefault(
  require('../icons/TriangleDownIcon'),
)
var _CancelIcon = _interopRequireDefault(require('../icons/CancelIcon'))
var _reactNativeDraggableFlatlist = _interopRequireWildcard(
  require('react-native-draggable-flatlist'),
)
function _interopRequireWildcard(e, t) {
  if ('function' == typeof WeakMap)
    var r = new WeakMap(),
      n = new WeakMap()
  return (_interopRequireWildcard = function _interopRequireWildcard(e, t) {
    if (!t && e && e.__esModule) return e
    var o,
      i,
      f = { __proto__: null, default: e }
    if (null === e || ('object' != _typeof(e) && 'function' != typeof e))
      return f
    if ((o = t ? n : r)) {
      if (o.has(e)) return o.get(e)
      o.set(e, f)
    }
    for (var _t in e)
      'default' !== _t &&
        {}.hasOwnProperty.call(e, _t) &&
        ((i =
          (o = Object.defineProperty) &&
          Object.getOwnPropertyDescriptor(e, _t)) &&
        (i.get || i.set)
          ? o(f, _t, i)
          : (f[_t] = e[_t]))
    return f
  })(e, t)
}
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
 * MainTabs
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.showingDialogVersion
 * props.uiData.showingDialog_update
 * props.uiData.mainAreaSplitters
 * props.uiData.mainPanelList
 * props.uiData.currentSelectedTab
 * props.uiData.backgroundTabs
 * props.uiData.blinkingTabs
 * props.uiData.funcOnSelectedQueue
 * props.uiData.externalCallWorkTable
 * props.uiData.historyDetailWorkTable
 * props.uiData.mainArea_handleSelect
 * props.uiData.tabMenuItem_onClick
 * props.uiData.tabLinkHideButton_onClick
 * props.uiData.tabLinkMoveHContextMenuItem_onClick
 * props.uiData.tabLinkMoveVContextMenuItem_onClick
 * props.uiData.mainTabsDndable_onDrop
 * props.position
 */
var colors = {
  whiteSmoke: '#F5F5F5',
  mediumTurquoise: '#4BC5DE',
}
var _default = (exports.default = /*#__PURE__*/ (function (_React$Component) {
  function _default(_props) {
    var _this
    _classCallCheck(this, _default)
    _this = _callSuper(this, _default, [_props])
    _defineProperty(_this, 'handleTabSelect', function (tabId) {
      _this.setState({
        activeTab: tabId,
      })
      _this.props.uiData.fire('mainArea_handleSelect', tabId)
    })
    _defineProperty(_this, 'handleDragStart', function () {
      _this.setState({
        isDragging: true,
      })
      // if (this.mainTabLinksRef.current) {
      //   this.mainTabLinksRef.current.setNativeProps({ scrollEnabled: false })
      // }
    })
    _defineProperty(_this, 'handleDragEnd', function (_ref) {
      var data = _ref.data
      var props = _this.props
      _this.setState({
        isDragging: false,
      })

      // if (this.mainTabLinksRef.current) {
      //   this.mainTabLinksRef.current.setNativeProps({ scrollEnabled: true })
      // }

      var newPanelList = data
        .map(function (item) {
          return props.uiData.mainPanelList.find(function (panel) {
            return panel.panelType + '_' + panel.panelCode === item.key
          })
        })
        .filter(Boolean)
      if (newPanelList.length === props.uiData.mainPanelList.length) {
        props.uiData.mainPanelList = newPanelList
        _this.forceUpdate()
      }
    })
    _defineProperty(_this, 'renderItem', function (_ref2) {
      var _props$uiData$blinkin, _this$animationRefs$k, _item$bgColorTable
      var item = _ref2.item,
        index = _ref2.index,
        drag = _ref2.drag,
        isActive = _ref2.isActive
      var props = _this.props
      var key = item.key
      var isBlinking =
        (_props$uiData$blinkin = props.uiData.blinkingTabs) === null ||
        _props$uiData$blinkin === void 0
          ? void 0
          : _props$uiData$blinkin[key]
      console.log('#Duy Phan console isBlinking', isBlinking)
      var backgroundColor = isBlinking
        ? (_this$animationRefs$k = _this.animationRefs[key]) === null ||
          _this$animationRefs$k === void 0
          ? void 0
          : _this$animationRefs$k.interpolate({
              inputRange: [0, 1],
              outputRange: [colors.whiteSmoke, colors.mediumTurquoise],
            })
        : undefined
      return /*#__PURE__*/ _react.default.createElement(
        _reactNativeDraggableFlatlist.ScaleDecorator,
        null,
        /*#__PURE__*/ _react.default.createElement(
          _reactNative.TouchableOpacity,
          {
            ref: _this.tabRefs[key],
            key: 'span_' + key,
            onPress: function onPress() {
              return _this.handleTabSelect(key)
            },
            onLongPress: drag,
            // delayLongPress={150}
            activeOpacity: 1,
            style: [
              styles.brMainTabLinkSpan,
              // this.state.activeTab === key ? styles.brSelected : {},
              // item.bgColorTable?.[key] && { backgroundColor: item.bgColorTable[key] },
              // isActive && styles.dragging,
            ],
          },
          /*#__PURE__*/ _react.default.createElement(
            _reactNative.Animated.View,
            {
              style: [
                styles.tabLink,
                _this.state.activeTab === key
                  ? styles.tabLinkActiveSelected
                  : {},
                ((_item$bgColorTable = item.bgColorTable) === null ||
                _item$bgColorTable === void 0
                  ? void 0
                  : _item$bgColorTable[key]) && {
                  backgroundColor: item.bgColorTable[key],
                },
                isActive && styles.dragging,
                isBlinking && {
                  backgroundColor: backgroundColor,
                },
              ],
            },
            /*#__PURE__*/ _react.default.createElement(_StatusIcon.default, {
              status: item.status,
              degree: item.degree,
            }),
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.Text,
              {
                style: styles.brTabLinkTitle,
                numberOfLines: 1,
                ellipsizeMode: 'tail',
              },
              item.tabTitle || '\u2002',
            ),
            /*#__PURE__*/ _react.default.createElement(
              _ButtonIconic.default,
              // style={{marginLeft: 2, width: 18, height: 18}}
              {
                title: _uawmsgs.default.LBL_TAB_LINK_HIDE_BUTTON_TOOLTIP,
                onPress: props.uiData.fire.bind(
                  props.uiData,
                  'tabLinkHideButton_onClick',
                  item.panel.panelType,
                  item.panel.panelCode,
                ),
                iconSource: /*#__PURE__*/ _react.default.createElement(
                  _CancelIcon.default,
                  null,
                ),
              },
            ),
          ),
        ),
      )
    })
    _this.currentFrontTab = ''
    _this.mainTabContentClicking = 0
    _this.state = {
      tabMenuShowingDialogVersion: null,
      tabLinkContextMenuShowingDialogVersion: null,
      tabDndableLeft: 0,
      showsTabMenu: false,
      blinksTabMenu: false,
      mainTabLinkContextMenuBalloonDialogStyle: {},
      mainTabLinkContextMenuPanelType: '',
      mainTabLinkContextMenuPanelCode: '',
      activeTab: _props.uiData.currentSelectedTab || '',
      isDragging: false,
    }
    _this.mainTabLinksRef = /*#__PURE__*/ _react.default.createRef()
    _this.mainTabsRef = /*#__PURE__*/ _react.default.createRef()
    _this.tabRefs = {}
    _this.animationRefs = {}
    return _this
  }
  _inherits(_default, _React$Component)
  return _createClass(_default, [
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        var _prevProps$uiData,
          _prevProps$uiData2,
          _props$uiData,
          _this2 = this,
          _prevProps$uiData3
        var props = this.props
        console.log(
          '#Duy Phan console currentSelectedTab',
          props.uiData.currentSelectedTab,
          prevProps === null ||
            prevProps === void 0 ||
            (_prevProps$uiData = prevProps.uiData) === null ||
            _prevProps$uiData === void 0
            ? void 0
            : _prevProps$uiData.currentSelectedTab,
        )
        if (
          (prevProps === null ||
          prevProps === void 0 ||
          (_prevProps$uiData2 = prevProps.uiData) === null ||
          _prevProps$uiData2 === void 0
            ? void 0
            : _prevProps$uiData2.currentSelectedTab) !==
          (props === null ||
          props === void 0 ||
          (_props$uiData = props.uiData) === null ||
          _props$uiData === void 0
            ? void 0
            : _props$uiData.currentSelectedTab)
        ) {
          this.setState({
            activeTab: props.uiData.currentSelectedTab || '',
          })
        }
        if (this.mainTabLinksRef.current) {
          var newState = {}
          var selectedTabRef = this.tabRefs[this.currentFrontTab]
          if (selectedTabRef && selectedTabRef.current) {
            selectedTabRef.current.measure(
              function (x, y, width, height, pageX, pageY) {
                if (_this2.mainTabLinksRef.current) {
                  _this2.mainTabLinksRef.current.scrollTo({
                    x: Math.max(0, pageX - 20),
                    animated: true,
                  })
                }
              },
            )
          }
          if (this.mainTabLinksRef.current) {
            this.mainTabLinksRef.current.measure(
              function (x, y, width, height, pageX, pageY) {
                var containerWidth = width
                var totalTabWidth = 0
                Object.keys(_this2.tabRefs).forEach(function (key) {
                  var tabRef = _this2.tabRefs[key]
                  if (tabRef && tabRef.current) {
                    totalTabWidth += 100
                  }
                })
                if (totalTabWidth > containerWidth) {
                  if (!_this2.state.showsTabMenu) {
                    newState.showsTabMenu = true
                  }
                  if (_this2.state.tabDndableLeft !== containerWidth) {
                    newState.tabDndableLeft = containerWidth
                  }
                } else {
                  if (_this2.state.showsTabMenu) {
                    newState.showsTabMenu = false
                  }
                  if (_this2.state.tabDndableLeft !== totalTabWidth) {
                    newState.tabDndableLeft = totalTabWidth
                  }
                }
                if (
                  totalTabWidth > containerWidth &&
                  Object.keys(props.uiData.blinkingTabs).some(function (key) {
                    var tabRef = _this2.tabRefs[key]
                    if (tabRef && tabRef.current) {
                      return true
                    }
                    return false
                  })
                ) {
                  if (!_this2.state.blinksTabMenu) {
                    newState.blinksTabMenu = true
                  }
                } else {
                  if (_this2.state.blinksTabMenu) {
                    newState.blinksTabMenu = false
                  }
                }
                if (Object.keys(newState).length) {
                  _this2.setState(newState)
                  console.log('#Duy Phan console newState', newState)
                }
              },
            )
          }
        }
        var newBlinkingTabs = this.props.uiData.blinkingTabs || {}
        var prevBlinkingTabs =
          (prevProps === null ||
          prevProps === void 0 ||
          (_prevProps$uiData3 = prevProps.uiData) === null ||
          _prevProps$uiData3 === void 0
            ? void 0
            : _prevProps$uiData3.blinkingTabs) || {}

        // Stop animations for removed tabs
        Object.keys(prevBlinkingTabs).forEach(function (key) {
          if (!newBlinkingTabs[key] && _this2.animationRefs[key]) {
            _this2.animationRefs[key].stopAnimation()
            delete _this2.animationRefs[key]
          }
        })

        // Handle new blinking tabs

        console.log(
          '#Duy Phan console newBlinkingTabs',
          newBlinkingTabs,
          prevBlinkingTabs,
        )
        Object.keys(newBlinkingTabs).forEach(function (key) {
          var animations = _objectSpread({}, _this2.animationRefs)
          animations[key] = new _reactNative.Animated.Value(0)
          _this2.animationRefs[key] = animations[key]
          _this2.startBlinkingAnimation(key)
        })
      },
    },
    {
      key: 'startBlinkingAnimation',
      value: function startBlinkingAnimation(key) {
        var animation = this.animationRefs[key]
        console.log('#Duy Phan console animation', animation)
        if (!animation) return
        _reactNative.Animated.loop(
          _reactNative.Animated.sequence([
            _reactNative.Animated.timing(animation, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: false,
            }),
            _reactNative.Animated.timing(animation, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: false,
            }),
          ]),
        ).start()
      },
    },
    {
      key: 'handleMainTabLinkSpanContextMenu',
      value: function handleMainTabLinkSpanContextMenu(
        panelType,
        panelCode,
        ev,
      ) {
        var _this3 = this
        var props = this.props
        if (this.mainTabsRef.current) {
          this.mainTabsRef.current.measure(
            function (x, y, width, height, pageX, pageY) {
              var mainTabLinkContextMenuBalloonDialogStyle = {
                top: ev.nativeEvent.pageY - pageY,
              }
              if (ev.nativeEvent.pageX < pageX + width / 2) {
                mainTabLinkContextMenuBalloonDialogStyle.left =
                  ev.nativeEvent.pageX - pageX
              } else {
                mainTabLinkContextMenuBalloonDialogStyle.right =
                  pageX + width - ev.nativeEvent.pageX
              }
              if (
                props.uiData.showingDialogVersion !==
                _this3.state.tabLinkContextMenuShowingDialogVersion
              ) {
                _this3.setState({
                  tabLinkContextMenuShowingDialogVersion: ++props.uiData
                    .showingDialogVersion,
                  mainTabLinkContextMenuBalloonDialogStyle:
                    mainTabLinkContextMenuBalloonDialogStyle,
                  mainTabLinkContextMenuPanelType: panelType,
                  mainTabLinkContextMenuPanelCode: panelCode,
                })
                props.uiData.fire('showingDialog_update')
              } else {
                _this3.setState({
                  mainTabLinkContextMenuBalloonDialogStyle:
                    mainTabLinkContextMenuBalloonDialogStyle,
                  mainTabLinkContextMenuPanelType: panelType,
                  mainTabLinkContextMenuPanelCode: panelCode,
                })
              }
            },
          )
        }
      },
    },
    {
      key: 'handleMainTabMenuClick',
      value: function handleMainTabMenuClick(ev) {
        var props = this.props
        if (
          props.uiData.showingDialogVersion !==
          this.state.tabMenuShowingDialogVersion
        ) {
          this.setState({
            tabMenuShowingDialogVersion: ++props.uiData.showingDialogVersion,
          })
          props.uiData.fire('showingDialog_update')
        } else {
          props.uiData.window_onclick()
        }
      },
    },
    {
      key: 'handleMainTabContentTouchStart',
      value: function handleMainTabContentTouchStart(ev) {
        this.mainTabContentClicking = ev.nativeEvent.pageX
      },
    },
    {
      key: 'handleMainTabContentTouchEnd',
      value: function handleMainTabContentTouchEnd(ev) {
        var _this4 = this
        var props = this.props
        if (
          this.mainTabContentClicking === ev.nativeEvent.pageX &&
          props.uiData.mainPanelList.some(function (panel) {
            return (
              (0, _strings.string)(props.position).indexOf(
                (0, _strings.string)(panel.position),
              ) !== -1 &&
              panel.panelType + '_' + panel.panelCode ===
                _this4.currentFrontTab &&
              _this4.currentFrontTab !== props.uiData.currentSelectedTab
            )
          })
        ) {
          props.uiData.fire('mainArea_handleSelect', this.currentFrontTab)
        }
        this.mainTabContentClicking = 0
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this5 = this
        var props = this.props
        var tabLinkList = []
        var tabMenuItemList = []
        var tabContentList = []
        var frontTab = ''
        var lastFrontTab = ''
        var hasSelectedTab = false
        var isIE = false
        var chatBgColorList = []
        try {
          chatBgColorList = [].concat(
            JSON.parse(
              (0, _strings.string)(
                props.uiData.ucUiStore.getOptionalSetting({
                  key: 'chat_bg_color',
                }),
              ) || '{}',
            ).list || [],
          )
        } catch (ex) {
          props.uiData.ucUiStore.getLogger().log('warn', ex)
        }
        var bgColorTable = {}
        props.uiData.mainPanelList
          .filter(function (panel) {
            return (
              (0, _strings.string)(props.position).indexOf(
                (0, _strings.string)(panel.position),
              ) !== -1
            )
          })
          .forEach(function (panel) {
            var key = panel.panelType + '_' + panel.panelCode
            var chatHeaderInfo = props.uiData.ucUiStore.getChatHeaderInfo({
              chatType: panel.panelType,
              chatCode: panel.panelCode,
            })
            var buddyUserForUi = {}
            var status = 32767
            var degree = undefined
            var tabTitle = ''
            var tabTitleTitle = ''
            if (key === props.uiData.currentSelectedTab) {
              frontTab = key
              hasSelectedTab = true
            } else if (key === _this5.currentFrontTab && !hasSelectedTab) {
              frontTab = key
            } else if (!frontTab) {
              frontTab = key
            }
            if (key === _this5.currentFrontTab) {
              lastFrontTab = key
            }
            if (panel.panelType === 'CHAT') {
              try {
                var buddy = JSON.parse(panel.panelCode)
                buddyUserForUi =
                  props.uiData.ucUiStore.getBuddyUserForUi(buddy) || {}
                if (buddyUserForUi.isBuddy) {
                  var currentBuddyStatus =
                    props.uiData.getCurrentBuddyStatus(buddy) || {}
                  status = currentBuddyStatus.status
                  degree = currentBuddyStatus.degree
                }
              } catch (e) {}
              tabTitle = tabTitleTitle = chatHeaderInfo.title
            } else if (panel.panelType === 'CONFERENCE') {
              var conf_id = (0, _strings.string)(
                props.uiData.ucUiStore.getChatHeaderInfo({
                  chatType: panel.panelType,
                  chatCode: panel.panelCode,
                }).conf_id,
              )
              var conference = props.uiData.ucUiStore
                .getChatClient()
                .getConference(conf_id)
              var isTalking =
                conference.conf_type === 'webchat'
                  ? props.uiData.ucUiStore.getWebchatQueue({
                      conf_id: conf_id,
                    }).isTalking
                  : conference.conf_status ===
                    _constants.default.CONF_STATUS_JOINED
              if (isTalking) {
                status = _constants.default.STATUS_AVAILABLE
              } else {
                status = _constants.default.STATUS_OFFLINE
              }
              tabTitle = chatHeaderInfo.title
              tabTitleTitle =
                chatHeaderInfo.title + '\n' + chatHeaderInfo.guestProfinfo
            } else if (panel.panelType === 'PREFERENCE') {
              tabTitle = tabTitleTitle = _uawmsgs.default.TAB_PREFERENCE
            } else if (panel.panelType === 'WEBCHATQUEUE') {
              tabTitle = tabTitleTitle = _uawmsgs.default.TAB_WEBCHATQUEUE
            } else if (panel.panelType === 'EXTERNALCALL') {
              tabTitle = tabTitleTitle = (0, _strings.string)(
                (props.uiData.externalCallWorkTable &&
                  props.uiData.externalCallWorkTable[panel.panelCode] &&
                  props.uiData.externalCallWorkTable[panel.panelCode]
                    .display_name) ||
                  panel.panelCode,
              )
            } else if (panel.panelType === 'HISTORYSUMMARIES') {
              tabTitle = tabTitleTitle = _uawmsgs.default.TAB_HISTORYSUMMARIES
            } else if (panel.panelType === 'HISTORYDETAIL') {
              tabTitle = tabTitleTitle =
                _uawmsgs.default.TAB_HISTORYDETAIL +
                (0, _strings.string)(
                  (
                    (props.uiData.historyDetailWorkTable &&
                      props.uiData.historyDetailWorkTable[panel.panelCode]) ||
                    {}
                  ).historyDetailName,
                )
            }
            try {
              chatBgColorList.some(function (element) {
                var bgInfo = element || {}
                if (bgInfo.type === 'conf_type') {
                  if (panel.panelType === 'CONFERENCE') {
                    if (new RegExp(bgInfo.data).test(chatHeaderInfo.confType)) {
                      bgColorTable[key] = bgInfo.color
                      return true
                    }
                  }
                } else if (bgInfo.type === 'subject') {
                  if (panel.panelType === 'CONFERENCE') {
                    if (new RegExp(bgInfo.data).test(chatHeaderInfo.subject)) {
                      bgColorTable[key] = bgInfo.color
                      return true
                    }
                  }
                } else if (bgInfo.type === 'group') {
                  if (panel.panelType === 'CHAT') {
                    if (new RegExp(bgInfo.data).test(buddyUserForUi.group)) {
                      bgColorTable[key] = bgInfo.color
                      return true
                    }
                  }
                } else if (bgInfo.type === 'user_id') {
                  if (panel.panelType === 'CHAT') {
                    if (new RegExp(bgInfo.data).test(buddyUserForUi.user_id)) {
                      bgColorTable[key] = bgInfo.color
                      return true
                    }
                  }
                } else if (bgInfo.type === 'name') {
                  if (panel.panelType === 'CHAT') {
                    if (new RegExp(bgInfo.data).test(buddyUserForUi.name)) {
                      bgColorTable[key] = bgInfo.color
                      return true
                    }
                  }
                } else if (bgInfo.type === 'tag') {
                  var dataArray = (0, _strings.string)(bgInfo.data).split('|')
                  var tagTypeData = dataArray.shift()
                  var tagKeyData = dataArray.shift()
                  var tagValueData = dataArray.join('|')
                  if (panel.panelType === 'CONFERENCE') {
                    if (
                      (chatHeaderInfo.conf_tags || []).some(function (tag) {
                        return (
                          tagTypeData === tag.tag_type &&
                          tagKeyData === tag.tag_key &&
                          new RegExp(tagValueData).test(tag.tag_value)
                        )
                      })
                    ) {
                      bgColorTable[key] = bgInfo.color
                      return true
                    }
                  }
                }
              })
            } catch (ex) {
              props.uiData.ucUiStore.getLogger().log('warn', ex)
            }
            var dndInfoCode = (0, _strings.string)(props.position) + '|' + key
            if (!_this5.tabRefs[key]) {
              _this5.tabRefs[key] = /*#__PURE__*/ _react.default.createRef()
            }
            console.log('#Duy Phan console status user', status)
            tabLinkList.push({
              key: key,
              status: status,
              degree: degree,
              tabTitle: tabTitle,
              panel: panel,
              dndInfoCode: dndInfoCode,
              bgColorTable: bgColorTable,
            })
            tabMenuItemList.push(
              /*#__PURE__*/ _react.default.createElement(
                _MenuItem.default,
                {
                  key: key,
                  className:
                    'brMainTabMenuItem' +
                    (props.uiData.blinkingTabs[key] ? ' brBlinking' : '') +
                    (key === props.uiData.currentSelectedTab
                      ? ' brSelected'
                      : ''),
                  style: _objectSpread(
                    {
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                    },
                    key === _this5.state.activeTab ? styles.brSelected : {},
                  ),
                  onPress: function onPress() {
                    props.uiData.fire.bind(
                      props.uiData,
                      'tabMenuItem_onClick',
                      panel.panelType,
                      panel.panelCode,
                    )
                    _this5.setState({
                      activeTab: key,
                    })
                  },
                },
                /*#__PURE__*/ _react.default.createElement(
                  _StatusIcon.default,
                  {
                    status: status,
                    degree: degree,
                  },
                ),
                /*#__PURE__*/ _react.default.createElement(
                  _reactNative.Text,
                  {
                    style: styles.brMainTabMenuItemTitle,
                    numberOfLines: 1,
                  },
                  tabTitle || '\u2002',
                ),
              ),
            )
            console.log(
              '#Duy Phan console renderPanelArea',
              _this5.state.activeTab === key,
            )
            tabContentList.push(
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.View,
                {
                  key: key,
                  style: [
                    styles.tabContent,
                    _this5.state.activeTab === key
                      ? styles.tabContentActive
                      : styles.tabContentInactive,
                  ],
                },
                /*#__PURE__*/ _react.default.createElement(_PanelArea.default, {
                  uiData: props.uiData,
                  panelType: panel.panelType,
                  panelCode: panel.panelCode,
                }),
              ),
            )
          })
        if (props.uiData.backgroundTabs[frontTab]) {
          delete props.uiData.backgroundTabs[frontTab]
        }
        if (
          lastFrontTab &&
          lastFrontTab !== frontTab &&
          !props.uiData.backgroundTabs[lastFrontTab]
        ) {
          props.uiData.backgroundTabs[lastFrontTab] = {
            time: Date.now(),
          }
        }
        this.currentFrontTab = frontTab
        console.log('#Duy Phan console tabContentList', tabContentList.length)
        return /*#__PURE__*/ _react.default.createElement(
          _reactNative.View,
          {
            ref: this.mainTabsRef,
            style: [styles.brMainTabs],
            // pointerEvents='box-none'
          },
          /*#__PURE__*/ _react.default.createElement(
            _reactNative.TouchableOpacity,
            {
              style: [
                styles.brMainTabMenu,
                this.state.showsTabMenu ? {} : styles.brMainTabMenuHidden,
                this.state.blinksTabMenu ? styles.brMainTabMenuBlinking : {},
              ],
              onPress: this.state.showsTabMenu
                ? this.handleMainTabMenuClick.bind(this)
                : function () {},
            },
            /*#__PURE__*/ _react.default.createElement(
              _TriangleDownIcon.default,
              null,
            ),
          ),
          /*#__PURE__*/ _react.default.createElement(
            _reactNative.View,
            {
              style: [
                styles.brMainTabContent,
                hasSelectedTab && bgColorTable[frontTab]
                  ? {
                      backgroundColor: bgColorTable[frontTab],
                    }
                  : {},
              ],
              onTouchStart: this.handleMainTabContentTouchStart.bind(this),
              onTouchEnd: this.handleMainTabContentTouchEnd.bind(this),
              pointerEvents: 'box-none',
            },
            tabContentList,
          ),
          /*#__PURE__*/ _react.default.createElement(
            _reactNative.ScrollView,
            {
              ref: this.mainTabLinksRef,
              style: styles.brMainTabLinks,
              horizontal: true,
              showsHorizontalScrollIndicator: false,
              onContentSizeChange: function onContentSizeChange() {
                return _this5.componentDidUpdate()
              },
              scrollEnabled: !this.state.isDragging,
              bounces: false,
              decelerationRate: 'fast',
            },
            /*#__PURE__*/ _react.default.createElement(
              _reactNativeDraggableFlatlist.default,
              {
                data: tabLinkList,
                keyExtractor: function keyExtractor(item) {
                  return item.key
                },
                renderItem: this.renderItem,
                horizontal: true,
                onDragStart: this.handleDragStart,
                onDragEnd: this.handleDragEnd,
                activationDistance: 15,
                containerStyle: styles.draggableList,
                scrollEnabled: false,
                dragHitSlop: {
                  top: 10,
                  bottom: 10,
                  left: 15,
                  right: 15,
                },
              },
            ),
          ),
          /*#__PURE__*/ _react.default.createElement(
            _MenuBalloonDialog.default,
            {
              showing:
                props.uiData.showingDialogVersion ===
                this.state.tabMenuShowingDialogVersion,
              style: styles.brMainTabMenuBalloonDialog,
            },
            tabMenuItemList,
          ),
          /*#__PURE__*/ _react.default.createElement(
            _MenuBalloonDialog.default,
            {
              showing:
                props.uiData.showingDialogVersion ===
                this.state.tabLinkContextMenuShowingDialogVersion,
              className: 'brMainTabLinkContextMenuBalloonDialog',
              style: this.state.mainTabLinkContextMenuBalloonDialogStyle,
            },
            /*#__PURE__*/ _react.default.createElement(
              _MenuItem.default,
              {
                className: 'brMainTabLinkContextMenuItem',
                onPress: props.uiData.fire.bind(
                  props.uiData,
                  'tabLinkHideButton_onClick',
                  this.state.mainTabLinkContextMenuPanelType,
                  this.state.mainTabLinkContextMenuPanelCode,
                ),
              },
              _uawmsgs.default.LBL_TAB_LINK_HIDE_MENU,
            ),
            /*#__PURE__*/ _react.default.createElement(
              _MenuItem.default,
              {
                className:
                  'brMainTabLinkContextMenuItem brTabLinkMoveHContextMenuItem',
                hidden: props.uiData.mainAreaSplitters === 0,
                onPress: props.uiData.fire.bind(
                  props.uiData,
                  'tabLinkMoveHContextMenuItem_onClick',
                  this.state.mainTabLinkContextMenuPanelType,
                  this.state.mainTabLinkContextMenuPanelCode,
                ),
              },
              (0, _strings.string)(props.position).indexOf('east') !== -1 ||
                (0, _strings.string)(props.position).indexOf('se') !== -1
                ? _uawmsgs.default.LBL_TAB_LINK_MOVE_LEFT_MENU
                : _uawmsgs.default.LBL_TAB_LINK_MOVE_RIGHT_MENU,
            ),
            /*#__PURE__*/ _react.default.createElement(
              _MenuItem.default,
              {
                className:
                  'brMainTabLinkContextMenuItem brTabLinkMoveVContextMenuItem',
                hidden: props.uiData.mainAreaSplitters !== 2,
                onPress: props.uiData.fire.bind(
                  props.uiData,
                  'tabLinkMoveVContextMenuItem_onClick',
                  this.state.mainTabLinkContextMenuPanelType,
                  this.state.mainTabLinkContextMenuPanelCode,
                ),
              },
              (0, _strings.string)(props.position).indexOf('south') !== -1 ||
                (0, _strings.string)(props.position).indexOf('se') !== -1
                ? _uawmsgs.default.LBL_TAB_LINK_MOVE_UP_MENU
                : _uawmsgs.default.LBL_TAB_LINK_MOVE_DOWN_MENU,
            ),
          ),
        )
      },
    },
  ])
})(_react.default.Component))
var styles = _reactNative.StyleSheet.create({
  brMainTabs: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  brMainTabsSelected: {},
  brMainTabLinks: {
    position: 'absolute',
    left: 0,
    top: 15,
    right: 23,
    height: 25,
  },
  brMainTabLinkSpan: {
    paddingLeft: 5,
    paddingRight: 1,
  },
  brMainTabLinkSpanFirst: {
    marginLeft: 1,
  },
  tabLink: {
    position: 'relative',
    marginRight: -1,
    height: 25,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: 0,
    paddingHorizontal: 8,
    backgroundColor: '#F6F6F6',
    color: '#666666',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabLinkActive: {
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  tabLinkActiveSelected: {
    backgroundColor: '#FFFFFF',
    color: '#1A2B2B',
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  tabContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  tabContentActive: {
    display: 'flex',
  },
  tabContentInactive: {
    display: 'none',
  },
  brStatusIcon: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  brTabLinkTitle: {
    maxWidth: 80,
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 17.6,
    letterSpacing: 0.3,
    marginLeft: 5,
  },
  brTabLinkHideButton: {
    width: 18,
    height: 18,
    marginLeft: 2,
  },
  brMainTabMenu: {
    position: 'absolute',
    right: 0,
    top: 14,
    width: 27,
    height: 25,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: '#F6F6F6',
  },
  brMainTabMenuHidden: {
    display: 'none',
  },
  brMainTabMenuBlinking: {},
  brMainTabMenuBalloonDialog: {
    position: 'absolute',
    right: 15,
    top: 39,
    // maxWidth: '90%',
    zIndex: 9999,
  },
  brMainTabMenuItemSelected: {
    borderLeftWidth: 3,
    borderLeftColor: '#48D1CC',
  },
  brMainTabMenuItemTitle: {
    fontSize: 13,
  },
  brMainTabLinkContextMenuBalloonDialog: {
    position: 'absolute',
    zIndex: 9999,
  },
  brMainTabLinksLastDndable: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 14,
    height: 25,
  },
  brMainTabLinksLastDndableCanDrop: {
    display: 'block',
  },
  brMainTabLinksLastDndableIsOverCanDrop: {
    borderWidth: 3,
    borderColor: '#48D1CC',
  },
  brMainTabContent: {
    position: 'absolute',
    width: '100%',
    top: 39,
    bottom: 0,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#FFFFFF',
  },
  brMainTabContentSelected: {
    backgroundColor: '#FFFFFF',
  },
  brSelected: {
    borderLeftWidth: 2,
    borderLeftColor: '#4bc5de',
  },
  draggableList: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 2,
  },
  dragging: {
    opacity: 0.7,
    elevation: 5,
    zIndex: 999,
    transform: [
      {
        scale: 1.05,
      },
    ],
  },
})
