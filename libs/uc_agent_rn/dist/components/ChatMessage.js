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
var _NameEmbeddedSpan = _interopRequireDefault(require('./NameEmbeddedSpan'))
var _ChatFileDownloadButton = _interopRequireDefault(
  require('./ChatFileDownloadButton'),
)
var _ChatFileDownloadLargeButton = _interopRequireDefault(
  require('./ChatFileDownloadLargeButton'),
)
var _reactNative = require('react-native')
var _PhoneIcon = _interopRequireDefault(require('../icons/PhoneIcon'))
var _ErrorIcon = _interopRequireDefault(require('../icons/ErrorIcon'))
var _UploadIcon = _interopRequireDefault(require('../icons/UploadIcon'))
var _CancelIcon = _interopRequireDefault(require('../icons/CancelIcon'))
var _DownloadIcon = _interopRequireDefault(require('../icons/DownloadIcon'))
var _ExternallinkIcon = _interopRequireDefault(
  require('../icons/ExternallinkIcon'),
)
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
var urlRegExp = new RegExp(
  "https?://[\\w!#\\$%&'\\(\\)\\*\\+,\\-\\./:;=\\?@~]+",
  'g',
)
var urlRegExpNG = new RegExp(
  '"https?://[\\w!#\\$%&\'\\(\\)\\*\\+,\\-\\./:;=\\?@~]+',
  'g',
)
var colors = {
  mantis: '#74C365',
  darkGray: '#9e9e9e',
  errorColor: '#FF4D4F',
}

/**
 * ChatMessage
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.configurations
 * props.uiData.chatFileOpenInNewWindowButton_onClick
 * props.uiData.chatFileCancelButton_onClick
 * props.uiData.chatInlineImage_onClick
 * props.uiData.chatInlineImage_onLoad
 * props.message
 * props.message.senderInfo
 * props.message.ctype
 * props.message.messageText
 * props.message.errorType
 * props.message.errorDetail
 * props.message.messageFile
 * props.message.replyEnabled
 * props.message.sentTimeValue
 * props.isLastOfLast
 */
var _default = (exports.default = /*#__PURE__*/ (function (_React$Component) {
  function _default() {
    _classCallCheck(this, _default)
    return _callSuper(this, _default, arguments)
  }
  _inherits(_default, _React$Component)
  return _createClass(_default, [
    {
      key: 'render',
      value: function render() {
        var props = this.props
        var profile = props.uiData.ucUiStore.getChatClient().getProfile()
        var messageStyle = [styles.brChatMessage]
        var chatMessageInnerElements = []
        if (props.message.ctype === _constants.default.CTYPE_TEXT) {
          // messageError
          if (props.message.errorType) {
            chatMessageInnerElements.push(
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.View,
                {
                  key: 'error',
                  style: styles.chatMessageError,
                },
                /*#__PURE__*/ _react.default.createElement(_reactNative.Image, {
                  source: require('../icons/ErrorIcon'),
                  style: styles.errorIcon,
                }),
              ),
            )
          }
          // messageText
          var messageText = props.message.messageText
          // url to link
          if (!messageText.match(urlRegExpNG)) {
            messageText = messageText.replace(urlRegExp, function (url) {
              return '<a href="'
                .concat(url, '" class="brChatUrlLink">')
                .concat(url, '</a>')
            })
          }
          // brReplyButton to brReplyButton brDisabled
          if (
            !props.message.replyEnabled ||
            (
              props.uiData.ucUiStore.getBuddyUserForUi(
                props.message.senderInfo,
              ) || {}
            ).isMe
          ) {
            messageText = messageText.replace(
              /class="[^"]*brReplyButton[^"]*/g,
              '$& brDisabled',
            )
          } else if (
            profile.user_type <
              (props.uiData.configurations.replyButtonEnabledUserType || 4) &&
            !props.isLastOfLast &&
            !props.uiData.configurations.replyButtonRepeatable
          ) {
            messageText = messageText.replace(
              /class="[^"]*brReplyButton[^"]*/g,
              '$& brDisabled',
            )
            messageText = messageText.replace(
              /class="[^"]*brAgent[^"]*brRepeatable[^"]*brDisabled/g,
              '$&Not',
            )
            messageText = messageText.replace(
              /class="[^"]*brRepeatable[^"]*brAgent[^"]*brDisabled/g,
              '$&Not',
            )
          } else if (
            profile.user_type <
            (props.uiData.configurations.replyButtonEnabledUserType || 4)
          ) {
            messageText = messageText.replace(
              /class="[^"]*brReplyButton[^"]*/g,
              '$& brDisabled',
            )
            messageText = messageText.replace(
              /class="[^"]*brAgent[^"]*brDisabled/g,
              '$&Not',
            )
          } else if (
            !props.isLastOfLast &&
            !props.uiData.configurations.replyButtonRepeatable
          ) {
            messageText = messageText.replace(
              /class="[^"]*brReplyButton[^"]*/g,
              '$& brDisabled',
            )
            messageText = messageText.replace(
              /class="[^"]*brRepeatable[^"]*brDisabled/g,
              '$&Not',
            )
          }
          chatMessageInnerElements.push(
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.Text,
              {
                key: 'text',
                style: styles.textContainer,
              },
              messageText.split('<br />').map(function (line, i) {
                return /*#__PURE__*/ _react.default.createElement(
                  _reactNative.Text,
                  {
                    key: i,
                  },
                  line.split(/<a[^>]*>([^<]*)<\/a>/).map(function (part, j) {
                    if (j % 2 === 1) {
                      return /*#__PURE__*/ _react.default.createElement(
                        _reactNative.Text,
                        {
                          key: j,
                          style: styles.chatUrlLink,
                          onPress: function onPress() {
                            return _reactNative.Linking.openURL(part)
                          },
                        },
                        part,
                      )
                    }
                    return part
                  }),
                  i < messageText.split('<br />').length - 1 && '\n',
                )
              }),
            ),
          )
        } else if (
          props.message.ctype === _constants.default.CTYPE_FILE_REQUEST &&
          props.message.messageFile
        ) {
          messageStyle.push(styles.chatFileMessage)
          if (
            props.message.messageFile.status ===
              _constants.default.FILE_STATUS_LOCAL_CANCEL ||
            props.message.messageFile.status ===
              _constants.default.FILE_STATUS_REMOTE_CANCEL
          ) {
            messageStyle.push(styles.chatFileMessageCanceled)
          }
          // messageError
          if (props.message.errorType) {
            chatMessageInnerElements.push(
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.View,
                {
                  key: 'error',
                  style: styles.chatMessageError,
                },
                /*#__PURE__*/ _react.default.createElement(
                  _reactNative.View,
                  {
                    style: styles.errorIcon,
                  },
                  /*#__PURE__*/ _react.default.createElement(
                    _ErrorIcon.default,
                    null,
                  ),
                ),
              ),
            )
          } else if (props.message.messageFile.messageFileError) {
            chatMessageInnerElements.push(
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.View,
                {
                  key: 'error',
                  style: styles.chatMessageError,
                },
                /*#__PURE__*/ _react.default.createElement(
                  _reactNative.View,
                  {
                    style: styles.errorIcon,
                  },
                  /*#__PURE__*/ _react.default.createElement(
                    _ErrorIcon.default,
                    null,
                  ),
                ),
              ),
            )
          } else if (
            props.message.messageFile.status ===
            _constants.default.FILE_STATUS_ERROR
          ) {
            chatMessageInnerElements.push(
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.View,
                {
                  key: 'error',
                  style: styles.chatMessageError,
                },
                /*#__PURE__*/ _react.default.createElement(
                  _reactNative.View,
                  {
                    style: styles.errorIcon,
                  },
                  /*#__PURE__*/ _react.default.createElement(
                    _ErrorIcon.default,
                    null,
                  ),
                ),
              ),
            )
          }
          // fileName
          if (
            props.uiData.ucUiStore.getBuddyUserForUi(
              props.message.messageFile.receiverInfo,
            ).isMe
          ) {
            // receiver is me
            if (
              props.message.messageFile.status !==
              _constants.default.FILE_STATUS_UNPREPARED
            ) {
              // file download button
              chatMessageInnerElements.push(
                /*#__PURE__*/ _react.default.createElement(
                  _ChatFileDownloadButton.default,
                  {
                    key: 'name',
                    uiData: props.uiData,
                    message: props.message,
                  },
                ),
              )
            } else {
              // display only file name
              chatMessageInnerElements.push(
                /*#__PURE__*/ _react.default.createElement(
                  _reactNative.View,
                  {
                    key: 'name',
                    style: styles.fileContainer,
                  },
                  /*#__PURE__*/ _react.default.createElement(
                    _reactNative.View,
                    {
                      style: styles.fileIcon,
                    },
                    /*#__PURE__*/ _react.default.createElement(
                      _DownloadIcon.default,
                      null,
                    ),
                  ),
                  /*#__PURE__*/ _react.default.createElement(
                    _reactNative.Text,
                    {
                      style: styles.fileName,
                    },
                    props.message.messageFile.name,
                  ),
                ),
              )
            }
          } else {
            // display file name with receiver
            chatMessageInnerElements.push(
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.View,
                {
                  key: 'name',
                  style: styles.fileContainer,
                },
                /*#__PURE__*/ _react.default.createElement(
                  _reactNative.View,
                  {
                    style: styles.fileIcon,
                  },
                  /*#__PURE__*/ _react.default.createElement(
                    _UploadIcon.default,
                    null,
                  ),
                ),
                /*#__PURE__*/ _react.default.createElement(
                  _reactNative.Text,
                  {
                    style: styles.fileName,
                  },
                  props.message.messageFile.name,
                ),
                /*#__PURE__*/ _react.default.createElement(
                  _NameEmbeddedSpan.default,
                  {
                    ucUiStore: props.uiData.ucUiStore,
                    format: ' \u2192 {0}',
                    buddy: props.message.messageFile.receiverInfo,
                  },
                ),
              ),
            )
          }
          // openInNewWindowButton
          if (
            props.message.messageFile.inlineImage &&
            props.message.messageFile.inlineImage.url
          ) {
            // chatMessageInnerElements.push(
            //   <ButtonIconic
            //     key='open'
            //     style={{ marginLeft: 8, width: 24, height: 24 }}
            //     title={uawMsgs.LBL_CHAT_FILE_FILE_OPEN_IN_NEW_WINDOW_BUTTON_TOOLTIP}
            //     iconSource={<ExternallinkIcon />}
            //     onPress={props.uiData.fire.bind(
            //       props.uiData,
            //       'chatFileOpenInNewWindowButton_onClick',
            //       props.message.messageFile.inlineImage.url,
            //     )}
            //   ></ButtonIconic>,
            // )
          }
          // fileSize
          if (
            props.message.messageFile.status !==
            _constants.default.FILE_STATUS_UNPREPARED
          ) {
            chatMessageInnerElements.push(
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.View,
                {
                  style: styles.fileSize,
                },
                /*#__PURE__*/ _react.default.createElement(
                  _reactNative.Text,
                  {
                    key: 'size',
                  },
                  (0, _strings.formatFileSize)(props.message.messageFile.size),
                  (props.message.messageFile.progress < 10 ? '\u2007' : '') +
                    // &numsp; (figure space)
                    ' (' +
                    props.message.messageFile.progress +
                    '%)',
                ),
                /*#__PURE__*/ _react.default.createElement(
                  _ButtonIconic.default,
                  {
                    key: 'cancelbutton',
                    style: {
                      marginLeft: 8,
                      width: 18,
                      height: 18,
                    },
                    hidden:
                      props.message.messageFile.status !==
                        _constants.default.FILE_STATUS_UNACCEPTED &&
                      props.message.messageFile.status !==
                        _constants.default.FILE_STATUS_TRANSFERRING,
                    iconSource: /*#__PURE__*/ _react.default.createElement(
                      _CancelIcon.default,
                      null,
                    ),
                    title: _uawmsgs.default.LBL_CHAT_FILE_CANCEL_BUTTON_TOOLTIP,
                    onPress: props.uiData.fire.bind(
                      props.uiData,
                      'chatFileCancelButton_onClick',
                      props.message.messageFile,
                    ),
                  },
                ),
              ),
            )
          }
          // inlineImage
          if (props.message.messageFile.inlineImage) {
            if (props.message.messageFile.inlineImage.url) {
              chatMessageInnerElements.push(
                /*#__PURE__*/ _react.default.createElement(
                  _reactNative.View,
                  {
                    key: 'inlineimage',
                    style: styles.inlineImageArea,
                  },
                  /*#__PURE__*/ _react.default.createElement(
                    _reactNative.TouchableOpacity,
                    {
                      onPress: function onPress() {
                        return props.uiData.fire(
                          props.uiData,
                          'chatInlineImage_onClick',
                          props.message.messageFile.inlineImage.url,
                        )
                      },
                    },
                    /*#__PURE__*/ _react.default.createElement(
                      _reactNative.Image,
                      {
                        source: {
                          uri: props.message.messageFile.inlineImage.url,
                        },
                        style: styles.inlineImage,
                        onLoad: function onLoad() {
                          return props.uiData.fire(
                            props.uiData,
                            'chatInlineImage_onLoad',
                            props.message.messageFile,
                          )
                        },
                      },
                    ),
                  ),
                ),
              )
            } else if (props.message.messageFile.inlineImage.loading) {
              chatMessageInnerElements.push(
                /*#__PURE__*/ _react.default.createElement(
                  _reactNative.View,
                  {
                    key: 'inlineimage',
                    style: styles.inlineImageArea,
                  },
                  /*#__PURE__*/ _react.default.createElement(
                    _reactNative.ActivityIndicator,
                    {
                      size: 'small',
                      color: colors.darkGray,
                    },
                  ),
                ),
              )
            }
          }
          // download large button
          if (
            props.uiData.ucUiStore.getBuddyUserForUi(
              props.message.messageFile.receiverInfo,
            ).isMe &&
            props.message.messageFile.status !==
              _constants.default.FILE_STATUS_UNPREPARED &&
            !(
              props.message.messageFile.inlineImage &&
              (props.message.messageFile.inlineImage.url ||
                props.message.messageFile.inlineImage.loading)
            )
          ) {
            chatMessageInnerElements.push(
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.View,
                {
                  key: 'downloadlargebutton',
                },
                /*#__PURE__*/ _react.default.createElement(
                  _ChatFileDownloadLargeButton.default,
                  {
                    uiData: props.uiData,
                    message: props.message,
                  },
                ),
              ),
            )
          }
        } else if (
          props.message.ctype === _constants.default.CTYPE_CALL_RESULT
        ) {
          var callResult = {}
          try {
            callResult = JSON.parse(props.message.messageText) || {}
          } catch (ex) {}
          var senderUser =
            (!callResult.externalincoming &&
              props.uiData.ucUiStore.getBuddyUserForUi(
                props.message.senderInfo,
              )) ||
            {}
          var min = Math.floor((0, _strings.int)(callResult.talklen) / 60000)
          var sec =
            0 < callResult.talklen && callResult.talklen < 1000
              ? 1
              : Math.floor(
                  ((0, _strings.int)(callResult.talklen) % 60000) / 1000,
                )
          // messageCallResultIcon
          messageStyle.push({
            flexDirection: 'row',
            alignItems: 'center',
          })
          chatMessageInnerElements.push(
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.View,
              {
                key: 'callresulticon',
                style: styles.callResultIcon,
              },
              /*#__PURE__*/ _react.default.createElement(
                _PhoneIcon.default,
                null,
              ),
            ),
          )
          // messageCallResultMessage
          chatMessageInnerElements.push(
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.View,
              {
                key: 'callresultmessage',
                style: {
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 6,
                },
              },
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.Text,
                {
                  style: styles.brResultMessageText,
                },
                (0, _strings.string)(
                  props.message.sentTimeValue &&
                    (0, _strings.formatTime)(
                      (0, _strings.int)(props.message.sentTimeValue) -
                        (0, _strings.int)(callResult.talklen),
                    ),
                ),
              ),
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.Text,
                {
                  style: styles.brResultMessageText,
                },
                senderUser.isMe
                  ? callResult.talklen
                    ? _uawmsgs.default.LBL_CHAT_CALL_RESULT_DIRECTION_OUTGOING
                    : _uawmsgs.default
                        .LBL_CHAT_CALL_RESULT_DIRECTION_OUTGOING_MISSED
                  : callResult.talklen
                    ? _uawmsgs.default.LBL_CHAT_CALL_RESULT_DIRECTION_INCOMING
                    : _uawmsgs.default
                        .LBL_CHAT_CALL_RESULT_DIRECTION_INCOMING_MISSED,
              ),
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.Text,
                {
                  style: styles.brResultMessageText,
                },
                min > 0
                  ? (0, _strings.formatStr)(
                      _uawmsgs.default.LBL_CHAT_CALL_RESULT_LENGTH_MIN,
                      min,
                      sec,
                    )
                  : sec > 0
                    ? (0, _strings.formatStr)(
                        _uawmsgs.default.LBL_CHAT_CALL_RESULT_LENGTH_SEC,
                        sec,
                      )
                    : '',
              ),
            ),
          )
        } else if (
          props.message.ctype === _constants.default.CTYPE_OBJECT &&
          props.message.messageText
        ) {
          // messageError
          if (props.message.errorType) {
            chatMessageInnerElements.push(
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.View,
                {
                  key: 'error',
                  style: styles.chatMessageError,
                },
                /*#__PURE__*/ _react.default.createElement(
                  _reactNative.View,
                  {
                    style: styles.errorIcon,
                  },
                  /*#__PURE__*/ _react.default.createElement(
                    _ErrorIcon.default,
                    null,
                  ),
                ),
              ),
            )
          }
          // messageText
          var _messageText = props.message.messageText
          chatMessageInnerElements.push(
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.Text,
              {
                key: 'text',
                style: styles.textContainer,
              },
              _messageText.split('<br />').map(function (line, i) {
                return /*#__PURE__*/ _react.default.createElement(
                  _reactNative.Text,
                  {
                    key: i,
                  },
                  line.split(/<a[^>]*>([^<]*)<\/a>/).map(function (part, j) {
                    if (j % 2 === 1) {
                      return /*#__PURE__*/ _react.default.createElement(
                        _reactNative.Text,
                        {
                          key: j,
                          style: styles.chatUrlLink,
                          onPress: function onPress() {
                            return _reactNative.Linking.openURL(part)
                          },
                        },
                        part,
                      )
                    }
                    return part
                  }),
                  i < _messageText.split('<br />').length - 1 && '\n',
                )
              }),
            ),
          )
        } else {
          // messageError
          chatMessageInnerElements.push(
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.View,
              {
                key: 'error',
                style: styles.chatMessageError,
              },
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.View,
                {
                  style: styles.errorIcon,
                },
                /*#__PURE__*/ _react.default.createElement(
                  _ErrorIcon.default,
                  null,
                ),
              ),
            ),
          )
        }
        return /*#__PURE__*/ _react.default.createElement(
          _reactNative.View,
          {
            style: [].concat(messageStyle, [
              props.isLastOfLast && styles.lastOfLast,
            ]),
          },
          chatMessageInnerElements,
        )
      },
    },
  ])
})(_react.default.Component))
var styles = _reactNative.StyleSheet.create({
  brChatMessage: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 20.8,
    // 1.6 * 13
    letterSpacing: 0.3,
    paddingVertical: 1,
    paddingHorizontal: 0,
  },
  chatMessageError: {
    width: 24,
    height: 20,
    marginRight: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorIcon: {
    width: 24,
    height: 20,
    tintColor: colors.errorColor,
  },
  chatUrlLink: {
    color: colors.mantis,
  },
  chatFileMessage: {
    color: colors.darkGray,
  },
  chatFileMessageCanceled: {
    textDecorationLine: 'line-through',
  },
  fileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileIcon: {
    width: 24,
    height: 20,
    marginRight: 4,
    tintColor: colors.darkGray,
  },
  fileName: {
    // flex: 1,
  },
  fileSize: {
    marginTop: 4,
    flexDirection: 'row',
    // alignItems: 'center',
    gap: 6,
  },
  inlineImageArea: {
    minHeight: 64,
    marginTop: 8,
  },
  inlineImage: {
    width: 64,
    height: 64,
    borderRadius: 4,
  },
  textContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  lastOfLast: {},
  brResultMessageText: {
    fontSize: 13,
    fontWeight: '400',
    letterSpacing: 0.3,
    paddingVertical: 1,
    paddingHorizontal: 0,
    color: colors.darkGray,
  },
})
