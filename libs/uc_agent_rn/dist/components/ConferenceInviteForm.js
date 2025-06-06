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
var _DropDownMenu = _interopRequireDefault(require('./DropDownMenu'))
var _MenuItem = _interopRequireDefault(require('./MenuItem'))
var _NameEmbeddedSpan = _interopRequireDefault(require('./NameEmbeddedSpan'))
var _TextBox = _interopRequireDefault(require('./TextBox'))
var _CheckIcon = _interopRequireDefault(require('../icons/CheckIcon'))
var _SquareIcon = _interopRequireDefault(require('../icons/SquareIcon'))
var _ErrorIcon = _interopRequireDefault(require('../icons/ErrorIcon'))
var _CustomTextInput = _interopRequireDefault(require('./CustomTextInput'))
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
var colors = {
  white: '#FFFFFF',
  whiteSmoke: '#F5F5F5',
  isabelline: '#EEEEEE',
  platinum: '#E0E0E0',
  darkGray: '#9E9E9E',
  darkJungleGreen: '#212121',
  portlandOrange: '#FF4526',
}
var styles = _reactNative.StyleSheet.create({
  container: {
    padding: 8,
    paddingHorizontal: 32,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#f8f8f8',
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 8,
    // width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tableCell: {
    padding: 4,
    flex: 1,
    // borderWidth: 1,
    // borderColor: 'blue',
  },
  tableCellLabel: {
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  tableCellContent: {
    flex: 1,
  },
  subjectInput: {
    width: '100%',
  },
  subjectErrorContainer: {
    width: 200,
    height: 0,
    // Will be animated
    overflow: 'hidden',
  },
  subjectErrorContainerVisible: {
    height: 20,
  },
  subjectError: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subjectErrorIcon: {
    width: 28,
    height: 0,
    marginRight: 4,
    tintColor: colors.portlandOrange,
  },
  subjectErrorIconVisible: {
    height: 20,
  },
  subjectErrorText: {
    fontSize: 11,
    fontWeight: '400',
    letterSpacing: 0.3,
    color: colors.portlandOrange,
    lineHeight: 20,
  },
  buddiesContainer: {
    width: 300,
    height: 200,
    borderWidth: 1,
    borderColor: colors.platinum,
    borderRadius: 4,
  },
  buddyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingLeft: 44,
    paddingRight: 12,
    flex: 1,
  },
  buddyItemDisabled: {
    color: colors.darkGray,
    backgroundColor: colors.whiteSmoke,
  },
  buddyItemHovered: {
    backgroundColor: colors.isabelline,
  },
  buddyItemHidden: {
    display: 'none',
  },
  buddyItemIcon: {
    position: 'absolute',
    left: 12,
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  buddyItemText: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 20.8,
    // 1.6 * 13
    letterSpacing: 0.3,
    color: colors.darkJungleGreen,
  },
  buddyItemTextDisabled: {
    color: colors.darkGray,
  },
})

/**
 * ConferenceInviteForm
 * props.uiData
 * props.uiData.ucUiStore
 * props.params
 */
var _default = (exports.default = /*#__PURE__*/ (function (_React$Component) {
  function _default(_props) {
    var _this
    _classCallCheck(this, _default)
    _this = _callSuper(this, _default, [_props])
    _defineProperty(_this, 'handleSubjectChange', function (text) {
      _this.setState({
        subject: (0, _strings.string)(text),
      })
    })
    _defineProperty(_this, 'handleSubjectBlur', function () {
      var newState = {
        subject: _this.state.subject,
      }
      if (!newState.subject) {
        newState.subjectError =
          _uawmsgs.default.MSG_CONFERENCE_INVITE_SUBJECT_REQUIRED
      } else if (_this.state.subjectError) {
        newState.subjectError = ''
      }
      _this.setState(newState)
    })
    _defineProperty(_this, 'handleSubjectKeyPress', function (event) {
      if (event.nativeEvent.key === 'Enter') {
        var newState = {
          subject: _this.state.subject,
        }
        if (!newState.subject) {
          newState.subjectError =
            _uawmsgs.default.MSG_CONFERENCE_INVITE_SUBJECT_REQUIRED
        } else if (_this.state.subjectError) {
          newState.subjectError = ''
        }
        _this.setState(newState)
      }
    })
    _defineProperty(_this, 'handleGroupSelect', function (groupName) {
      var _this2 = _this,
        props = _this2.props
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
      _this.setState({
        selectedGroupName: groupName,
        selectedBuddyTable: selectedBuddyTable,
      })
    })
    _defineProperty(_this, 'handleBuddySelect', function (buddy) {
      var selectedBuddyTable = _objectSpread({}, _this.state.selectedBuddyTable)
      if (!selectedBuddyTable[buddy.tenant]) {
        selectedBuddyTable[buddy.tenant] = {}
      }
      if (!selectedBuddyTable[buddy.tenant][buddy.user_id]) {
        selectedBuddyTable[buddy.tenant][buddy.user_id] = true
      } else {
        delete selectedBuddyTable[buddy.tenant][buddy.user_id]
      }
      _this.setState({
        selectedBuddyTable: selectedBuddyTable,
      })
    })
    _this.state = {
      subject: _uawmsgs.default.LBL_CONFERENCE_INVITE_SUBJECT_NONE,
      subjectError: '',
      selectedGroupName: '',
      selectedBuddyTable: {},
      hoveredBuddyIndex: null,
    }
    _this.errorHeight = new _reactNative.Animated.Value(0)
    _this.errorIconHeight = new _reactNative.Animated.Value(0)
    _this.textInputRef = /*#__PURE__*/ _react.default.createRef()
    return _this
  }
  _inherits(_default, _React$Component)
  return _createClass(_default, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        // setTimeout(() => {
        //   if (this.textInputRef.current) {
        //     // this.textInputRef.current.focus()
        //     // this.textInputRef.current.select()
        //   }
        // }, 100)
      },
    },
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps, prevState) {
        if (prevState.subjectError !== this.state.subjectError) {
          _reactNative.Animated.parallel([
            _reactNative.Animated.timing(this.errorHeight, {
              toValue: this.state.subjectError ? 20 : 0,
              duration: 300,
              useNativeDriver: false,
            }),
            _reactNative.Animated.timing(this.errorIconHeight, {
              toValue: this.state.subjectError ? 20 : 0,
              duration: 300,
              useNativeDriver: false,
            }),
          ]).start()
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this3 = this
        var props = this.props
        var conference =
          props.params &&
          props.params.panelType === 'CONFERENCE' &&
          props.uiData.ucUiStore.getChatClient().getConference(
            (0, _strings.string)(
              props.uiData.ucUiStore.getChatHeaderInfo({
                chatType: props.params.panelType,
                chatCode: props.params.panelCode,
              }).conf_id,
            ),
          )
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
                _this3.state.selectedBuddyTable &&
                _this3.state.selectedBuddyTable[buddy.tenant] &&
                _this3.state.selectedBuddyTable[buddy.tenant][buddy.user_id],
              disabled:
                conference &&
                conference.user.some(function (u) {
                  return (
                    u.tenant === buddy.tenant &&
                    u.user_id === buddy.user_id &&
                    (u.conf_status === _constants.default.CONF_STATUS_INVITED ||
                      u.conf_status === _constants.default.CONF_STATUS_JOINED)
                  )
                }),
              hidden:
                props.uiData.ucUiStore.getChatClient().getBuddyStatus(buddy)
                  .status === _constants.default.STATUS_OFFLINE,
            }
          })
        return /*#__PURE__*/ _react.default.createElement(
          _reactNative.View,
          {
            style: styles.container,
          },
          /*#__PURE__*/ _react.default.createElement(
            _reactNative.View,
            {
              style: styles.tableRow,
            },
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.View,
              {
                style: styles.tableCell,
              },
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.Text,
                {
                  style: styles.tableCellLabel,
                },
                _uawmsgs.default.LBL_CONFERENCE_INVITE_SUBJECT,
              ),
            ),
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.View,
              {
                style: styles.tableCellContent,
              },
              /*#__PURE__*/ _react.default.createElement(
                _CustomTextInput.default,
                {
                  ref: this.textInputRef,
                  style: styles.subjectInput,
                  value: conference ? conference.subject : this.state.subject,
                  disabled: conference,
                  onChangeText: this.handleSubjectChange,
                  onBlur: this.handleSubjectBlur,
                  onKeyPress: this.handleSubjectKeyPress,
                },
              ),
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.Animated.View,
                {
                  style: [
                    styles.subjectErrorContainer,
                    {
                      height: this.errorHeight,
                    },
                  ],
                },
                /*#__PURE__*/ _react.default.createElement(
                  _reactNative.View,
                  {
                    style: styles.subjectError,
                  },
                  /*#__PURE__*/ _react.default.createElement(
                    _reactNative.View,
                    {
                      style: styles.subjectErrorIcon,
                    },
                    /*#__PURE__*/ _react.default.createElement(
                      _ErrorIcon.default,
                      null,
                    ),
                  ),
                  /*#__PURE__*/ _react.default.createElement(
                    _reactNative.Text,
                    {
                      style: styles.subjectErrorText,
                    },
                    this.state.subjectError,
                  ),
                ),
              ),
            ),
          ),
          /*#__PURE__*/ _react.default.createElement(
            _reactNative.View,
            {
              style: styles.tableRow,
            },
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.View,
              {
                style: styles.tableCell,
              },
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.Text,
                {
                  style: styles.tableCellLabel,
                },
                _uawmsgs.default.LBL_CONFERENCE_INVITE_GROUP,
              ),
            ),
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.View,
              {
                style: styles.tableCellContent,
              },
              /*#__PURE__*/ _react.default.createElement(
                _DropDownMenu.default,
                {
                  uiData: props.uiData,
                  disabled: !!conference,
                  text: conference
                    ? ''
                    : this.state.selectedGroupName ||
                      _uawmsgs.default.LBL_CONFERENCE_INVITE_GROUP_NONE,
                },
                Object.keys(groupTable)
                  .sort(function (groupName1, groupName2) {
                    return groupTable[groupName1] - groupTable[groupName2]
                  })
                  .map(function (groupName) {
                    return /*#__PURE__*/ _react.default.createElement(
                      _MenuItem.default,
                      {
                        key: groupName,
                        dropDown: true,
                        onPress: function onPress() {
                          return _this3.handleGroupSelect(groupName)
                        },
                      },
                      /*#__PURE__*/ _react.default.createElement(
                        _reactNative.Text,
                        null,
                        groupName ||
                          _uawmsgs.default.LBL_CONFERENCE_INVITE_GROUP_NONE,
                      ),
                    )
                  }),
              ),
            ),
          ),
          /*#__PURE__*/ _react.default.createElement(
            _reactNative.View,
            {
              style: styles.tableRow,
            },
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.View,
              {
                style: styles.tableCell,
              },
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.Text,
                {
                  style: styles.tableCellLabel,
                },
                _uawmsgs.default.LBL_CONFERENCE_INVITE_BUDDIES,
              ),
            ),
          ),
          /*#__PURE__*/ _react.default.createElement(
            _reactNative.View,
            {
              style: styles.tableRow,
            },
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.View,
              {
                style: styles.tableCellContent,
              },
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.ScrollView,
                {
                  style: styles.buddiesContainer,
                },
                buddies.map(function (buddy, index) {
                  return /*#__PURE__*/ _react.default.createElement(
                    _reactNative.TouchableOpacity,
                    {
                      key: JSON.stringify({
                        tenant: buddy.tenant,
                        user_id: buddy.user_id,
                      }),
                      style: [
                        styles.buddyItem,
                        buddy.hidden && styles.buddyItemHidden,
                        buddy.disabled && styles.buddyItemDisabled,
                        !buddy.disabled &&
                          _this3.state.hoveredBuddyIndex === index &&
                          styles.buddyItemHovered,
                      ],
                      onPress: function onPress() {
                        if (!buddy.disabled) {
                          _this3.handleBuddySelect({
                            tenant: buddy.tenant,
                            user_id: buddy.user_id,
                          })
                        }
                      },
                      onPressIn: function onPressIn() {
                        return _this3.setState({
                          hoveredBuddyIndex: index,
                        })
                      },
                      onPressOut: function onPressOut() {
                        return _this3.setState({
                          hoveredBuddyIndex: null,
                        })
                      },
                      disabled: buddy.disabled,
                    },
                    /*#__PURE__*/ _react.default.createElement(
                      _reactNative.View,
                      {
                        style: styles.buddyItemTextContainer,
                      },
                      buddy.selected || buddy.disabled
                        ? /*#__PURE__*/ _react.default.createElement(
                            _CheckIcon.default,
                            null,
                          )
                        : /*#__PURE__*/ _react.default.createElement(
                            _SquareIcon.default,
                            null,
                          ),
                    ),
                    /*#__PURE__*/ _react.default.createElement(
                      _NameEmbeddedSpan.default,
                      {
                        ucUiStore: props.uiData.ucUiStore,
                        format: '{0}',
                        title: '{0}',
                        buddy: buddy,
                        textStyle: [
                          styles.buddyItemText,
                          buddy.disabled && styles.buddyItemTextDisabled,
                        ],
                      },
                    ),
                  )
                }),
              ),
            ),
          ),
        )
      },
    },
  ])
})(_react.default.Component))
