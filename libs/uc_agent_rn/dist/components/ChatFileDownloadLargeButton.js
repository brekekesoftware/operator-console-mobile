'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _react = _interopRequireDefault(require('react'))
var _reactNative = require('react-native')
var _uawmsgs = _interopRequireDefault(require('../utilities/uawmsgs'))
var _constants = _interopRequireDefault(require('../utilities/constants'))
var _DownloadIcon = _interopRequireDefault(require('../icons/DownloadIcon'))
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
} // import Icon from './Icon'
// TODO: Add icon component
/**
 * ChatFileDownloadLargeButton - React Native version
 * A button component for file downloads in chat
 *
 * props.uiData - UI data object
 * props.uiData.ucUiAction - UI actions
 * props.message - Message object
 * props.message.messageFile - File details
 */
var ChatFileDownloadLargeButton = (exports.default = /*#__PURE__*/ (function (
  _React$Component,
) {
  function ChatFileDownloadLargeButton(props) {
    var _this
    _classCallCheck(this, ChatFileDownloadLargeButton)
    _this = _callSuper(this, ChatFileDownloadLargeButton, [props])
    _defineProperty(_this, 'updateAnimation', function () {
      var message = _this.props.message
      _this.state.animationValue.setValue(-32)
      if (
        message.messageFile.status ===
        _constants.default.FILE_STATUS_TRANSFERRING
      ) {
        if (message.messageFile.progress === 0) {
          _this.animation1.start()
        } else if (message.messageFile.progress <= 98) {
          _this.animation2.start()
        }
      }
    })
    _defineProperty(_this, 'handlePress', function () {
      var _this$props = _this.props,
        message = _this$props.message,
        uiData = _this$props.uiData
      if (
        _this.state.clicked ||
        message.messageFile.status !== _constants.default.FILE_STATUS_UNACCEPTED
      ) {
        _this.setState({
          clicked: true,
        })
        return
      }
      _this.setState({
        clicked: true,
      })
      uiData.ucUiAction.acceptFile({
        file_id: message.messageFile.file_id,
        onDownloadUrl: function onDownloadUrl(url) {
          if (url) {
            _reactNative.Linking.openURL(url).catch(function (err) {
              console.error('Error opening file download URL:', err)
            })
          }
        },
      })
    })
    _this.state = {
      clicked: false,
      animationValue: new _reactNative.Animated.Value(-32),
    }
    _this.animation1 = _reactNative.Animated.timing(
      _this.state.animationValue,
      {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      },
    )
    _this.animation2 = _reactNative.Animated.loop(
      _reactNative.Animated.timing(_this.state.animationValue, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
    )
    return _this
  }
  _inherits(ChatFileDownloadLargeButton, _React$Component)
  return _createClass(ChatFileDownloadLargeButton, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.updateAnimation()
      },
    },
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        if (
          prevProps.message.messageFile.status !==
            this.props.message.messageFile.status ||
          prevProps.message.messageFile.progress !==
            this.props.message.messageFile.progress
        ) {
          this.updateAnimation()
        }
      },
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.animation1.stop()
        this.animation2.stop()
      },
    },
    {
      key: 'render',
      value: function render() {
        var message = this.props.message
        var fileStatus = message.messageFile.status
        var isEnabled =
          fileStatus === _constants.default.FILE_STATUS_UNACCEPTED &&
          !this.state.clicked
        var isReadonly =
          fileStatus === _constants.default.FILE_STATUS_TRANSFERRING
        var progress = message.messageFile.progress || 0
        if (!isEnabled && !isReadonly) {
          return null
        }
        var tooltipText = isEnabled
          ? message.messageFile.name
          : _uawmsgs.default.LBL_CHAT_FILE_ICON_TOOLTIP
        return /*#__PURE__*/ (0, _jsxRuntime.jsx)(
          _reactNative.TouchableOpacity,
          {
            style: [
              styles.chatFileDownloadLargeButton,
              isEnabled && styles.enabled,
              isReadonly && styles.readonly,
            ],
            onPress: isEnabled ? this.handlePress : null,
            disabled: !isEnabled,
            accessibilityLabel: tooltipText,
            activeOpacity: isEnabled ? 0.7 : 1,
            children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
              style: styles.iconContainer,
              children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                _reactNative.Animated.View,
                {
                  style: [
                    styles.iconInner,
                    {
                      transform: [
                        {
                          translateY: this.state.animationValue,
                        },
                      ],
                    },
                  ],
                  children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                    _reactNative.View,
                    {
                      style: styles.downloadIcon,
                      children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                        _DownloadIcon.default,
                        {},
                      ),
                    },
                  ),
                },
              ),
            }),
          },
        )
      },
    },
  ])
})(_react.default.Component))
var colors = {
  isabellineTp: 'rgba(0, 0, 0, 0.065)', // @isabelline_tp
}
var styles = _reactNative.StyleSheet.create({
  chatFileDownloadLargeButton: {
    position: 'relative',
    width: 48,
    height: 48,
    borderRadius: 4,
  },
  enabled: {},
  readonly: {
    opacity: 0.8,
  },
  iconContainer: {
    position: 'relative',
    left: 8,
    top: 8,
    width: 32,
    height: 32,
    overflow: 'hidden',
  },
  fileIcon: {
    width: 32,
    height: 32,
  },
  iconInner: {
    position: 'absolute',
    left: 0,
    width: 32,
    height: 96,
  },
  downloadIcon: {
    width: 32,
    height: 32,
  },
  pressed: {
    backgroundColor: colors.isabellineTp,
  },
})
