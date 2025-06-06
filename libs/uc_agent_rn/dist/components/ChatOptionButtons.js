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
var _strings = require('../utilities/strings')
var _ButtonLabeled = _interopRequireDefault(require('./ButtonLabeled'))
var _reactNative = require('react-native')
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
 * ChatOptionButtons
 * props.uiData
 * props.uiData.configurations
 * props.uiData.chatOptionButtonsInfoCreator
 * props.uiData.chatOptionButtonsReplyWebchatButton_onClick
 * props.panelType
 * props.panelCode
 */
var _default = (exports.default = /*#__PURE__*/ (function (_React$Component) {
  function _default(props) {
    var _this
    _classCallCheck(this, _default)
    _this = _callSuper(this, _default, [props])
    _this.buttonsInfo = []
    return _this
  }
  _inherits(_default, _React$Component)
  return _createClass(_default, [
    {
      key: 'render',
      value: function render() {
        var props = this.props
        var configProperties = props.uiData.ucUiStore.getConfigProperties()

        // reply webchat button
        if (
          props.uiData.configurations &&
          props.uiData.configurations.replyWebchatButton &&
          props.panelType === 'CONFERENCE'
        ) {
          var chatHeaderInfo =
            props.uiData.ucUiStore.getChatHeaderInfo({
              chatType: props.panelType,
              chatCode: props.panelCode,
            }) || {}
          var conf_id = (0, _strings.string)(chatHeaderInfo.conf_id)
          var replyWebchatButton = this.buttonsInfo.find(function (buttonInfo) {
            return buttonInfo.buttonType === '_replyWebchatButton'
          })
          if (!replyWebchatButton) {
            this.buttonsInfo.push((replyWebchatButton = {}))
          }
          replyWebchatButton.buttonType = '_replyWebchatButton'
          replyWebchatButton.className = 'brReplyWebchatButton'
          replyWebchatButton.disabled = props.uiData.ucUiStore.getWebchatQueue({
            conf_id: conf_id,
          }).isTalking
          replyWebchatButton.hidden =
            !chatHeaderInfo.replyTypes ||
            !(
              (configProperties.optional_config &&
                configProperties.optional_config.awsl) ||
              []
            ).some(function (aws) {
              return aws.id === chatHeaderInfo.webchatServiceId && aws.senders
            })
          replyWebchatButton.vivid = true
          replyWebchatButton.title =
            _uawmsgs.default.LBL_CHAT_OPTION_BUTTONS_REPLY_WEBCHAT_BUTTON_TOOLTIP
          replyWebchatButton.onClick = props.uiData.fire.bind(
            props.uiData,
            'chatOptionButtonsReplyWebchatButton_onClick',
            props.panelType,
            props.panelCode,
          )
          replyWebchatButton.children =
            _uawmsgs.default.LBL_CHAT_OPTION_BUTTONS_REPLY_WEBCHAT_BUTTON
        }

        // customize (add / remove) buttons by uiData.chatOptionButtonsInfoCreator
        var ev = {
          panelType: props.panelType,
          panelCode: props.panelCode,
          buttonsInfo: this.buttonsInfo,
        }
        if (props.uiData.chatOptionButtonsInfoCreator) {
          props.uiData.chatOptionButtonsInfoCreator(ev)
        }
        if (!ev.buttonsInfo || !ev.buttonsInfo.length) {
          return null
        }
        return /*#__PURE__*/ _react.default.createElement(
          _reactNative.View,
          {
            style: {
              paddingTop: 8,
              paddingBottom: 8,
              paddingLeft: 16,
            },
          },
          ev.buttonsInfo &&
            ev.buttonsInfo.map(function (buttonInfo, i) {
              return /*#__PURE__*/ _react.default.createElement(
                _ButtonLabeled.default,
                {
                  key: i,
                  disabled: Boolean(buttonInfo.disabled),
                  hidden: Boolean(buttonInfo.hidden),
                  progress: Boolean(buttonInfo.progress),
                  vivid: Boolean(buttonInfo.vivid),
                  ghost: Boolean(buttonInfo.ghost),
                  title: buttonInfo.title,
                  style: [
                    {
                      width: 80,
                      marginRight: 8,
                    },
                    buttonInfo.style,
                  ],
                  onPress: buttonInfo.onClick,
                },
                typeof buttonInfo.children === 'string'
                  ? /*#__PURE__*/ _react.default.createElement(
                      _reactNative.Text,
                      {
                        style: {
                          color: '#ffffff',
                          fontWeight: 'bold',
                        },
                      },
                      buttonInfo.children,
                    )
                  : buttonInfo.children,
              )
            }),
        )
      },
    },
  ])
})(_react.default.Component))
