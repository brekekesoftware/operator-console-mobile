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
var _NameEmbeddedSpan = _interopRequireDefault(require('./NameEmbeddedSpan'))
var _StatusIcon = _interopRequireDefault(require('./StatusIcon'))
var _ToolbarButton = _interopRequireDefault(require('./ToolbarButton'))
var _BalloonDialog = _interopRequireDefault(require('./BalloonDialog'))
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
 * BuddylistButton
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.showingDialogVersion
 * props.uiData.showingDialog_update
 * props.uiData.buddylistButton_onClick
 * props.uiData.buddylistBuddy_onClick
 * props.disabled
 */
var _default = (exports.default = /*#__PURE__*/ (function (_React$Component) {
  function _default(props) {
    var _this
    _classCallCheck(this, _default)
    _this = _callSuper(this, _default, [props])
    _this.state = {
      showingDialogVersion: null,
    }
    return _this
  }
  _inherits(_default, _React$Component)
  return _createClass(_default, [
    {
      key: 'handleBuddylistButtonClick',
      value: function handleBuddylistButtonClick(ev) {
        var props = this.props
        if (
          props.uiData.showingDialogVersion !== this.state.showingDialogVersion
        ) {
          this.setState({
            showingDialogVersion: ++props.uiData.showingDialogVersion,
          })
          props.uiData.fire('showingDialog_update')
          props.uiData.fire(
            'buddylistButton_onClick',
            {
              visible: true,
            },
            ev,
          )
        } else {
          props.uiData.fire(
            'buddylistButton_onClick',
            {
              visible: false,
            },
            ev,
          )
          props.uiData.window_onclick()
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        var props = this.props
        var profile = props.uiData.ucUiStore.getChatClient().getProfile()
        var buddyTable =
          props.uiData.ucUiStore.getBuddyTable()[profile.tenant] || {}
        var myUcCimUserType = (0, _strings.int)(
          props.uiData.ucUiStore.getUcCimUserType(),
        )
        var filteredBuddyList = []
        for (var user_id in buddyTable) {
          if (
            !buddyTable[user_id].isMe &&
            buddyTable[user_id].isBuddy &&
            !buddyTable[user_id].isTemporaryBuddy
          ) {
            filteredBuddyList.push(buddyTable[user_id])
          }
        }
        var buddyNodes = filteredBuddyList.sort().map(function (buddy) {
          var currentBuddyStatus =
            props.uiData.getCurrentBuddyStatus(buddy) || {}
          console.log('#Duy Phan console buddy', buddy)
          return /*#__PURE__*/ (0, _jsxRuntime.jsx)(
            _reactNative.TouchableOpacity,
            {
              style: styles.brBuddylistBuddy,
              onPress: function onPress() {
                return props.uiData.fire('buddylistBuddy_onClick', buddy)
              },
              children: /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: styles.buddyContent,
                children: [
                  /*#__PURE__*/ (0, _jsxRuntime.jsx)(_StatusIcon.default, {
                    style: styles.brStatusIcon,
                    status: currentBuddyStatus.status,
                    degree: currentBuddyStatus.degree,
                  }),
                  /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                    _NameEmbeddedSpan.default,
                    {
                      style: styles.brNameEmbeddedSpan,
                      ucUiStore: props.uiData.ucUiStore,
                      format: '{0}',
                      title: '{0}',
                      buddy: buddy,
                    },
                  ),
                ],
              }),
            },
            buddy.user_id,
          )
        })
        return /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.brBuddylistButton,
          children: [
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(_BalloonDialog.default, {
              shows:
                props.uiData.showingDialogVersion ===
                this.state.showingDialogVersion,
              anchor: 'left',
              children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                _reactNative.ScrollView,
                {
                  style: styles.brBuddylistArea,
                  children: buddyNodes,
                },
              ),
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(_ToolbarButton.default, {
              iconStyle: styles.brIconBuddylist,
              iconSource: require('../images/buddylist.png'),
              title: _uawmsgs.default.LBL_BUDDYLIST_BUTON_TOOLTIP,
              disabled:
                props.disabled ||
                buddyNodes.length === 0 ||
                ((0, _strings.int)(
                  props.uiData.ucUiStore.getOptionalSetting({
                    key: 'buddylist_button_type',
                  }),
                ) &
                  myUcCimUserType) ===
                  myUcCimUserType,
              dropDown: true,
              onPress: this.handleBuddylistButtonClick.bind(this),
            }),
          ],
        })
      },
    },
  ])
})(_react.default.Component))
var styles = _reactNative.StyleSheet.create({
  brBuddylistButton: {
    // Container styles
    zIndex: 1,
  },
  brIconBuddylist: {
    // We'll need to import the image using require
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  brBuddylistArea: {
    // maxHeight: '50%', // 50vh converted to percentage
  },
  brBuddylistBuddy: {
    padding: 14,
    paddingHorizontal: 16,
  },
  buddyContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brStatusIcon: _objectSpread(
    {},
    _reactNative.Platform.select({
      ios: {
        height: 10,
        width: 10,
        marginRight: 5,
      },
      android: {
        height: 10,
        width: 10,
        marginRight: 5,
      },
      web: {
        marginRight: 5,
      },
    }),
  ),
  brNameEmbeddedSpan: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 24,
    // 1.6 * 15
    letterSpacing: 0.3,
    color: '#1A2B2B', // @dark_jungle_green
  },
  // Pressed state to simulate hover
  brBuddylistBuddyPressed: {
    backgroundColor: '#F5F5F5', // @isabelline
  },
})
