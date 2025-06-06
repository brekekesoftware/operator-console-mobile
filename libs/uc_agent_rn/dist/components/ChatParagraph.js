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
var _constants = _interopRequireDefault(require('../utilities/constants'))
var _strings = require('../utilities/strings')
var _ChatMessageList = _interopRequireDefault(require('./ChatMessageList'))
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
var colors = {
  white: '#FFFFFF',
  isabelline: '#EEEEEE',
  platinum: '#E0E0E0',
  darkGray: '#9E9E9E',
  darkJungleGreen: '#212121',
  mediumTurquoise: '#4BC5DE',
}
var styles = _reactNative.StyleSheet.create({
  paragraph: {
    position: 'relative',
    minHeight: 64,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 72,
    paddingRight: 0,
  },
  paragraphHovered: {
    backgroundColor: colors.isabelline,
  },
  withTopicSplitter: {
    marginTop: 16,
  },
  topicSplitter: {
    position: 'absolute',
    left: 0,
    top: -16,
    right: 0,
    bottom: 0,
    height: 16,
  },
  topicSplitterDate: {
    position: 'relative',
    fontSize: 9,
    fontWeight: '400',
    lineHeight: 14.4,
    // 1.6 * 9
    letterSpacing: 1.3,
    color: colors.darkGray,
  },
  topicSplitterDateWithDate: {
    marginHorizontal: 8,
  },
  topicSplitterLine: {
    height: 1,
    flex: 1,
    backgroundColor: colors.platinum,
  },
  topicSplitterLineLeft: {},
  topicSplitterLineRight: {},
  messageImage: {
    position: 'absolute',
    left: 16,
    top: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  messageName: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 20.8,
    // 1.6 * 13
    letterSpacing: 0.3,
  },
  messageTime: {
    fontSize: 9,
    fontWeight: '400',
    lineHeight: 14.4,
    // 1.6 * 9
    letterSpacing: 1.3,
    paddingLeft: 26,
    color: colors.darkGray,
  },
  unreachedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: 26,
  },
  unreachedDotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageMailSubject: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 38.4,
    // 2.4 * 16
    letterSpacing: 0.3,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

/**
 * ChatParagraph
 * props.uiData
 * props.uiData.ucUiStore
 * props.panelType
 * props.panelCode
 * props.paragraph
 * props.paragraph.messageList
 * props.previousParagraph
 * props.isLast
 */
var _default = (exports.default = /*#__PURE__*/ (function (_React$Component) {
  function _default(props) {
    var _this
    _classCallCheck(this, _default)
    _this = _callSuper(this, _default, [props])
    _this.mailSubject = null
    _this.state = {
      isHovered: false,
    }
    _this.dot1Anim = new _reactNative.Animated.Value(0)
    _this.dot2Anim = new _reactNative.Animated.Value(0)
    _this.dot3Anim = new _reactNative.Animated.Value(0)
    return _this
  }
  _inherits(_default, _React$Component)
  return _createClass(_default, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.startUnreachedAnimation()
      },
    },
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        var firstMessage = this.props.paragraph.messageList[0]
        var unreached = Boolean(firstMessage && firstMessage.unreached)
        var prevFirstMessage = prevProps.paragraph.messageList[0]
        var prevUnreached = Boolean(
          prevFirstMessage && prevFirstMessage.unreached,
        )
        if (unreached !== prevUnreached) {
          this.startUnreachedAnimation()
        }
      },
    },
    {
      key: 'startUnreachedAnimation',
      value: function startUnreachedAnimation() {
        var firstMessage = this.props.paragraph.messageList[0]
        var unreached = Boolean(firstMessage && firstMessage.unreached)
        var errorType = (0, _strings.string)(
          firstMessage && firstMessage.errorType,
        )
        if (unreached && !errorType) {
          this.animateDot(this.dot1Anim, 1000)
          this.animateDot(this.dot2Anim, 1200)
          this.animateDot(this.dot3Anim, 1400)
        }
      },
    },
    {
      key: 'animateDot',
      value: function animateDot(animValue, delay) {
        _reactNative.Animated.loop(
          _reactNative.Animated.sequence([
            _reactNative.Animated.timing(animValue, {
              toValue: 0,
              duration: 0,
              useNativeDriver: false,
            }),
            _reactNative.Animated.delay(delay),
            _reactNative.Animated.timing(animValue, {
              toValue: 1,
              duration: 150,
              useNativeDriver: false,
            }),
            _reactNative.Animated.timing(animValue, {
              toValue: 1,
              duration: 1200,
              useNativeDriver: false,
            }),
            _reactNative.Animated.timing(animValue, {
              toValue: 0,
              duration: 150,
              useNativeDriver: false,
            }),
          ]),
        ).start()
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this2 = this
        var props = this.props
        var firstMessage = props.paragraph.messageList[0]
        var senderInfo = firstMessage && firstMessage.senderInfo
        var user =
          senderInfo && props.uiData.ucUiStore.getBuddyUserForUi(senderInfo)
        var user_name =
          firstMessage.conf_type === 'webchat'
            ? (0, _strings.string)(user && user.display_name)
            : (0, _strings.string)(user && user.name)
        var isMe = Boolean(user && user.isMe)
        var paragraphClassIndex = (0, _strings.int)(
          user && user.paragraphClassIndex,
        )
        var profile_image_url = (0, _strings.string)(
          user && user.profile_image_url,
        )
        var topic_id = (0, _strings.string)(
          firstMessage && firstMessage.topic_id,
        )
        var errorType = (0, _strings.string)(
          firstMessage && firstMessage.errorType,
        )
        var unreached = Boolean(firstMessage && firstMessage.unreached)
        var messageTimeValue = (0, _strings.int)(
          firstMessage && firstMessage.sentTimeValue,
        )
        var messageTime = (0, _strings.string)(
          messageTimeValue &&
            (0, _strings.formatMessageDateTime)(messageTimeValue),
        )
        var previousFirstMessage =
          props.previousParagraph &&
          props.previousParagraph.messageList &&
          props.previousParagraph.messageList[0]
        var previous_topic_id = (0, _strings.string)(
          previousFirstMessage && previousFirstMessage.topic_id,
        )
        var previousMessageTimeValue = (0, _strings.int)(
          previousFirstMessage && previousFirstMessage.sentTimeValue,
        )
        if (!this.mailSubject && this.mailSubject !== '') {
          this.mailSubject =
            firstMessage &&
            firstMessage.messageExtInfo &&
            firstMessage.messageExtInfo.mailSubject
          if (!this.mailSubject && this.mailSubject !== '') {
            if (props.panelType === 'CONFERENCE') {
              var conf_id = (
                props.uiData.ucUiStore.getChatHeaderInfo({
                  chatType: props.panelType,
                  chatCode: props.panelCode,
                }) || {}
              ).conf_id
              var conference =
                conf_id &&
                props.uiData.ucUiStore.getChatClient().getConference(conf_id)
              this.mailSubject = conference
                ? props.uiData.ucUiStore.getMailSubject(conference)
                : ''
            } else {
              this.mailSubject = ''
            }
          }
        }
        var showTopicSplitter =
          topic_id && previous_topic_id && topic_id !== previous_topic_id
        var showDateInSplitter =
          showTopicSplitter &&
          new Date(messageTimeValue).toDateString() !==
            new Date(previousMessageTimeValue).toDateString()
        var imageSource = null
        if (!profile_image_url) {
          imageSource = require('../images/noimage.png')
        } else if (
          profile_image_url.indexOf(
            _constants.default.PROFILE_IMAGE_URL_DOWNLOAD,
          ) === -1
        ) {
          imageSource = {
            uri: profile_image_url,
          }
        } else {
          imageSource = {
            uri: profile_image_url,
          }
        }
        var callResult = {}
        if (
          firstMessage &&
          firstMessage.ctype === _constants.default.CTYPE_CALL_RESULT
        ) {
          try {
            callResult = JSON.parse(firstMessage.messageText) || {}
          } catch (ex) {}
        }
        var showUnreachedAnimation = unreached && !errorType
        var paragraphStyles = [
          styles.paragraph,
          this.state.isHovered && styles.paragraphHovered,
          showTopicSplitter && styles.withTopicSplitter,
        ]

        // Dot animation colors
        var dot1Color = this.dot1Anim.interpolate({
          inputRange: [0, 1],
          outputRange: ['transparent', colors.mediumTurquoise],
        })
        var dot2Color = this.dot2Anim.interpolate({
          inputRange: [0, 1],
          outputRange: ['transparent', colors.mediumTurquoise],
        })
        var dot3Color = this.dot3Anim.interpolate({
          inputRange: [0, 1],
          outputRange: ['transparent', colors.mediumTurquoise],
        })
        console.log('#Duy Phan console showTopicSplitter', showTopicSplitter)
        return /*#__PURE__*/ _react.default.createElement(
          _reactNative.TouchableOpacity,
          {
            style: paragraphStyles,
            onPressIn: function onPressIn() {
              return _this2.setState({
                isHovered: true,
              })
            },
            onPressOut: function onPressOut() {
              return _this2.setState({
                isHovered: false,
              })
            },
            activeOpacity: 1,
          },
          showTopicSplitter &&
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.View,
              {
                style: styles.topicSplitter,
              },
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.View,
                {
                  style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                },
                /*#__PURE__*/ _react.default.createElement(_reactNative.View, {
                  style: [
                    styles.topicSplitterLine,
                    styles.topicSplitterLineLeft,
                  ],
                }),
                showDateInSplitter
                  ? /*#__PURE__*/ _react.default.createElement(
                      _reactNative.Text,
                      {
                        style: [
                          styles.topicSplitterDate,
                          styles.topicSplitterDateWithDate,
                        ],
                      },
                      (0, _strings.string)(
                        messageTimeValue &&
                          (0, _strings.formatMessageDate)(messageTimeValue),
                      ),
                    )
                  : null,
                /*#__PURE__*/ _react.default.createElement(_reactNative.View, {
                  style: [
                    styles.topicSplitterLine,
                    styles.topicSplitterLineRight,
                  ],
                }),
              ),
            ),
          !callResult.externalincoming &&
            /*#__PURE__*/ _react.default.createElement(_reactNative.Image, {
              source: imageSource,
              style: styles.messageImage,
            }),
          /*#__PURE__*/ _react.default.createElement(
            _reactNative.View,
            {
              style: styles.headerRow,
            },
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.Text,
              {
                style: styles.messageName,
              },
              !callResult.externalincoming ? user_name : '',
            ),
            showUnreachedAnimation
              ? /*#__PURE__*/ _react.default.createElement(
                  _reactNative.View,
                  {
                    style: styles.unreachedDotContainer,
                  },
                  /*#__PURE__*/ _react.default.createElement(
                    _reactNative.Animated.View,
                    {
                      style: [
                        styles.unreachedDot,
                        {
                          backgroundColor: dot1Color,
                        },
                      ],
                    },
                  ),
                  /*#__PURE__*/ _react.default.createElement(
                    _reactNative.Animated.View,
                    {
                      style: [
                        styles.unreachedDot,
                        {
                          backgroundColor: dot2Color,
                          marginLeft: 6,
                        },
                      ],
                    },
                  ),
                  /*#__PURE__*/ _react.default.createElement(
                    _reactNative.Animated.View,
                    {
                      style: [
                        styles.unreachedDot,
                        {
                          backgroundColor: dot3Color,
                          marginLeft: 6,
                        },
                      ],
                    },
                  ),
                )
              : /*#__PURE__*/ _react.default.createElement(
                  _reactNative.Text,
                  {
                    style: styles.messageTime,
                  },
                  messageTime,
                ),
          ),
          this.mailSubject &&
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.Text,
              {
                style: styles.messageMailSubject,
              },
              (0, _strings.string)(this.mailSubject),
            ),
          /*#__PURE__*/ _react.default.createElement(_ChatMessageList.default, {
            uiData: props.uiData,
            messageList: props.paragraph.messageList,
            isLast: props.isLast,
          }),
        )
      },
    },
  ])
})(_react.default.Component))
