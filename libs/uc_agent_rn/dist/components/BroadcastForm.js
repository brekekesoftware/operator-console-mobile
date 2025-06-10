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
var _reactNative = require('react-native')
var _uawmsgs = _interopRequireDefault(require('../utilities/uawmsgs'))
var _strings = require('../utilities/strings')
var _DropDownMenu = _interopRequireDefault(require('./DropDownMenu'))
var _MenuItem = _interopRequireDefault(require('./MenuItem'))
var _NameEmbeddedSpan = _interopRequireDefault(require('./NameEmbeddedSpan'))
var _jsxRuntime = require('react/jsx-runtime')
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
} /**
 * BroadcastForm
 * props.uiData
 * props.uiData.ucUiAction
 * props.uiData.ucUiStore
 * props.params
 */
var _default = (exports.default = /*#__PURE__*/ (function (_React$Component) {
  function _default(props) {
    var _this
    _classCallCheck(this, _default)
    _this = _callSuper(this, _default, [props])
    _this.initialSelectedBuddyTable = {}
    var mutableSelectedBuddyTable = {}
    var broadcastMark = true
    try {
      var localStoragePreference =
        props.uiData.ucUiStore.getLocalStoragePreference({
          keyList: ['broadcastSelectedBuddyTable', 'broadcastMark'],
        })
      if (localStoragePreference[1] === 'false') {
        broadcastMark = false
      }
      var stringSelectedBuddyTable = localStoragePreference[0]
      _this.initialSelectedBuddyTable = JSON.parse(stringSelectedBuddyTable)
      mutableSelectedBuddyTable = JSON.parse(stringSelectedBuddyTable)
    } catch (ex) {}
    _this.state = {
      text: '',
      selectedGroupName: '',
      selectedBuddyTable: mutableSelectedBuddyTable,
      broadcastMark: broadcastMark,
    }
    _this.textInputRef = /*#__PURE__*/ _react.default.createRef()
    return _this
  }
  _inherits(_default, _React$Component)
  return _createClass(_default, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this2 = this
        // Focus the text input after a short delay
        setTimeout(function () {
          var _this2$textInputRef$c
          ;(_this2$textInputRef$c = _this2.textInputRef.current) === null ||
            _this2$textInputRef$c === void 0 ||
            _this2$textInputRef$c.focus()
        }, 100)
      },
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        var props = this.props
        props.uiData.ucUiAction.setLocalStoragePreference({
          keyValueList: [
            {
              key: 'broadcastSelectedBuddyTable',
              value: JSON.stringify(this.state.selectedBuddyTable),
            },
            {
              key: 'broadcastMark',
              value: (0, _strings.string)(this.state.broadcastMark),
            },
          ],
        })
      },
    },
    {
      key: 'handleBroadcastGroupItemClick',
      value: function handleBroadcastGroupItemClick(groupName) {
        var _this3 = this
        var props = this.props
        var profile = props.uiData.ucUiStore.getChatClient().getProfile()
        var buddyTable =
          props.uiData.ucUiStore.getBuddyTable()[profile.tenant] || {}
        var selectedBuddyTable = {}
        Object.keys(buddyTable).forEach(function (key) {
          var buddy = buddyTable[key]
          if (
            !buddy.isMe &&
            buddy.isBuddy &&
            !buddy.isTemporaryBuddy &&
            buddy.group === groupName &&
            groupName
          ) {
            if (!selectedBuddyTable[buddy.tenant]) {
              selectedBuddyTable[buddy.tenant] = {}
            }
            selectedBuddyTable[buddy.tenant][buddy.user_id] = true
          }
        })
        this.setState({
          selectedGroupName: groupName,
          selectedBuddyTable: selectedBuddyTable,
        })

        // Focus the text input
        setTimeout(function () {
          var _this3$textInputRef$c
          ;(_this3$textInputRef$c = _this3.textInputRef.current) === null ||
            _this3$textInputRef$c === void 0 ||
            _this3$textInputRef$c.focus()
        }, 100)
      },
    },
    {
      key: 'handleBroadcastMarkCheckClick',
      value: function handleBroadcastMarkCheckClick() {
        this.setState({
          broadcastMark: !this.state.broadcastMark,
        })
      },
    },
    {
      key: 'handleBroadcastBuddyItemClick',
      value: function handleBroadcastBuddyItemClick(buddy) {
        var _this4 = this
        var selectedBuddyTable = this.state.selectedBuddyTable
        if (!selectedBuddyTable[buddy.tenant]) {
          selectedBuddyTable[buddy.tenant] = {}
        }
        if (!selectedBuddyTable[buddy.tenant][buddy.user_id]) {
          selectedBuddyTable[buddy.tenant][buddy.user_id] = true
        } else {
          delete selectedBuddyTable[buddy.tenant][buddy.user_id]
        }
        this.setState({
          selectedBuddyTable: selectedBuddyTable,
        })

        // Focus the text input
        setTimeout(function () {
          var _this4$textInputRef$c
          ;(_this4$textInputRef$c = _this4.textInputRef.current) === null ||
            _this4$textInputRef$c === void 0 ||
            _this4$textInputRef$c.focus()
        }, 100)
      },
    },
    {
      key: 'handleBroadcastTextChange',
      value: function handleBroadcastTextChange(text) {
        this.setState({
          text: text,
        })
      },
    },
    {
      key: 'handleBroadcastTextSubmit',
      value: function handleBroadcastTextSubmit() {
        var props = this.props
        try {
          // Simulate clicking the OK button in the modal
          if (props.onSubmit) {
            props.onSubmit(this.state.text)
          }
        } catch (ex) {
          props.uiData.ucUiStore.getLogger().log('warn', ex)
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this5 = this
        var props = this.props
        var profile = props.uiData.ucUiStore.getChatClient().getProfile()
        var buddyTable =
          props.uiData.ucUiStore.getBuddyTable()[profile.tenant] || {}
        var groupTable = {}
        groupTable[''] = -1
        var buddies = Object.keys(buddyTable)
          .filter(function (key) {
            return (
              !buddyTable[key].isMe &&
              buddyTable[key].isBuddy &&
              !buddyTable[key].isTemporaryBuddy
            )
          })
          .sort(function (key1, key2) {
            return (
              ((_this5.initialSelectedBuddyTable[buddyTable[key2].tenant] ||
                {})[key2]
                ? 1
                : 0) -
                ((_this5.initialSelectedBuddyTable[buddyTable[key1].tenant] ||
                  {})[key1]
                  ? 1
                  : 0) ||
              (buddyTable[key1].groupIndex >>> 0) -
                (buddyTable[key2].groupIndex >>> 0) ||
              (0, _strings.int)(buddyTable[key1].buddyIndex) -
                (0, _strings.int)(buddyTable[key2].buddyIndex)
            )
          })
          .map(function (key) {
            var buddy = buddyTable[key]
            var groupName = (0, _strings.string)(buddy.group)
            if (groupName && !groupTable[groupName]) {
              groupTable[groupName] = (0, _strings.int)(buddy.groupIndex)
            }
            return {
              tenant: buddy.tenant,
              user_id: buddy.user_id,
              selected:
                _this5.state.selectedBuddyTable &&
                _this5.state.selectedBuddyTable[buddy.tenant] &&
                _this5.state.selectedBuddyTable[buddy.tenant][buddy.user_id],
            }
          })
        return /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
          style: styles.brBroadcastForm,
          children: /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.brBroadcastTable,
            children: [
              /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: styles.row,
                children: [
                  /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                    style: styles.label,
                    children: _uawmsgs.default.LBL_BROADCAST_GROUP,
                  }),
                  /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                    style: styles.dropdownContainer,
                    children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                      _DropDownMenu.default,
                      {
                        uiData: props.uiData,
                        style: styles.brBroadcastGroupMenu,
                        text:
                          this.state.selectedGroupName ||
                          _uawmsgs.default.LBL_BROADCAST_GROUP_NONE,
                        children: Object.keys(groupTable)
                          .sort(function (groupName1, groupName2) {
                            return (
                              groupTable[groupName1] - groupTable[groupName2]
                            )
                          })
                          .map(function (groupName) {
                            return /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _MenuItem.default,
                              {
                                style: styles.brBroadcastFormMenuItem,
                                dropDown: true,
                                onPress: function onPress() {
                                  return _this5.handleBroadcastGroupItemClick(
                                    groupName,
                                  )
                                },
                                children:
                                  groupName ||
                                  _uawmsgs.default.LBL_BROADCAST_GROUP_NONE,
                              },
                              groupName,
                            )
                          }),
                      },
                    ),
                  }),
                ],
              }),
              /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: styles.row,
                children: [
                  /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                    style: styles.brBroadcastBuddiesCaptionArea,
                    children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                      _reactNative.Text,
                      {
                        style: styles.caption,
                        children: _uawmsgs.default.LBL_BROADCAST_BUDDIES,
                      },
                    ),
                  }),
                  /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                    _reactNative.TouchableOpacity,
                    {
                      style: styles.brBroadcastMarkArea,
                      onPress: function onPress() {
                        return _this5.handleBroadcastMarkCheckClick()
                      },
                      children: /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                        _reactNative.View,
                        {
                          style: styles.brBroadcastMarkCheck,
                          children: [
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _reactNative.View,
                              {
                                style: [
                                  styles.checkIcon,
                                  this.state.broadcastMark &&
                                    styles.checkIconSelected,
                                ],
                              },
                            ),
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _reactNative.Text,
                              {
                                style: styles.checkText,
                                children:
                                  _uawmsgs.default
                                    .LBL_BROADCAST_MARK_CHECK_CAPTION,
                              },
                            ),
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _reactNative.View,
                              {
                                style: styles.broadcastIcon,
                                accessibilityLabel:
                                  _uawmsgs.default
                                    .LBL_BROADCAST_MARK_ICON_TOOLTIP,
                              },
                            ),
                          ],
                        },
                      ),
                    },
                  ),
                ],
              }),
              /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                style: styles.row,
                children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                  _reactNative.ScrollView,
                  {
                    style: styles.brBroadcastBuddies,
                    children: buddies.map(function (buddy) {
                      return /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                        _reactNative.TouchableOpacity,
                        {
                          style: [
                            styles.brBroadcastBuddyItem,
                            buddy.selected &&
                              styles.brBroadcastBuddyItemSelected,
                          ],
                          onPress: function onPress() {
                            return _this5.handleBroadcastBuddyItemClick(buddy)
                          },
                          children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _NameEmbeddedSpan.default,
                            {
                              ucUiStore: props.uiData.ucUiStore,
                              format: '{0}',
                              title: '{0}',
                              buddy: buddy,
                            },
                          ),
                        },
                        JSON.stringify({
                          tenant: buddy.tenant,
                          user_id: buddy.user_id,
                        }),
                      )
                    }),
                  },
                ),
              }),
              /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                style: styles.row,
                children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                  _reactNative.View,
                  {
                    style: styles.brBroadcastTextArea,
                    children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                      _reactNative.TextInput,
                      {
                        ref: this.textInputRef,
                        style: styles.brBroadcastTextInput,
                        placeholder:
                          _uawmsgs.default
                            .LBL_BROADCAST_TEXT_TEXTAREA_PLACEHOLDER,
                        value: this.state.text,
                        onChangeText: function onChangeText(text) {
                          return _this5.handleBroadcastTextChange(text)
                        },
                        onSubmitEditing: function onSubmitEditing() {
                          return _this5.handleBroadcastTextSubmit()
                        },
                        multiline: true,
                        textAlignVertical: 'top',
                      },
                    ),
                  },
                ),
              }),
            ],
          }),
        })
      },
    },
  ])
})(_react.default.Component))
var styles = _reactNative.StyleSheet.create({
  brBroadcastForm: {
    padding: 8,
    paddingHorizontal: 32,
    paddingBottom: 0,
  },
  brBroadcastTable: {
    flex: 1,
  },
  row: {
    padding: 4,
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.3,
    color: '#333',
  },
  dropdownContainer: {
    maxHeight: 300, // From brMenuBalloonDialog
  },
  brBroadcastGroupMenu: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
  },
  brBroadcastFormMenuItem: {
    padding: 8,
  },
  brBroadcastBuddiesCaptionArea: {
    marginBottom: 8,
  },
  caption: {
    fontSize: 13,
    color: '#333',
  },
  brBroadcastMarkArea: {
    alignSelf: 'flex-end', // Equivalent to float: right
  },
  brBroadcastMarkCheck: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 24,
    // 1.6 * 16
    letterSpacing: 0.3,
    color: '#1A2B2B',
    // @dark_jungle_green
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkIcon: {
    width: 24,
    height: 24,
    marginLeft: 40,
    // padding-left equivalent
    marginRight: 8,
  },
  checkIconSelected: {
    backgroundColor: '#007AFF',
  },
  broadcastIcon: {
    width: 24,
    height: 24,
    marginLeft: 40, // padding-left equivalent
  },
  brBroadcastBuddies: {
    width: 300,
    height: 200,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    // @platinum
    borderRadius: 4,
  },
  brBroadcastBuddyItem: {
    paddingVertical: 8,
    paddingLeft: 44,
    paddingRight: 12,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 24,
    // 1.6 * 16
    letterSpacing: 0.3,
    color: '#1A2B2B', // @dark_jungle_green
  },
  brBroadcastBuddyItemSelected: {
    backgroundColor: '#F5F5F5', // @isabelline
  },
  brBroadcastTextArea: {
    width: 300,
    height: 70,
    borderWidth: 1,
    borderColor: '#E5E5E5', // @platinum
  },
  brBroadcastTextInput: {
    width: '100%',
    height: '100%',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 24,
    // 1.6 * 16
    letterSpacing: 0.3,
    padding: 8,
    backgroundColor: 'transparent',
    color: '#333',
  },
  brBroadcastTextInputFocused: {
    borderWidth: 2,
    borderColor: '#40E0D0', // @medium_turquoise
  },
  placeholder: {
    color: '#666666', // @dark_gray
  },
})
