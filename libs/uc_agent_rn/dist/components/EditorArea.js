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
var _MenuBalloonDialog = _interopRequireDefault(require('./MenuBalloonDialog'))
var _MenuItem = _interopRequireDefault(require('./MenuItem'))
var _TextBox = _interopRequireDefault(require('./TextBox'))
var _LogOutIcon = _interopRequireDefault(require('../icons/LogOutIcon'))
var _EnvelopeIcon = _interopRequireDefault(require('../icons/EnvelopeIcon'))
var _UploadIcon = _interopRequireDefault(require('../icons/UploadIcon'))
var _ReplyIcon = _interopRequireDefault(require('../icons/ReplyIcon'))
var _EditIcon = _interopRequireDefault(require('../icons/EditIcon'))
var _HistoryIcon = _interopRequireDefault(require('../icons/HistoryIcon'))
var _ChannelMosaic1Icon = _interopRequireDefault(
  require('../icons/ChannelMosaic1Icon'),
)
var _PhoneIcon = _interopRequireDefault(require('../icons/PhoneIcon'))
var _VideoCallIcon = _interopRequireDefault(require('../icons/VideoCallIcon'))
var _TriangleUpIcon = _interopRequireDefault(require('../icons/TriangleUpIcon'))
var _TriangleDownIcon = _interopRequireDefault(
  require('../icons/TriangleDownIcon'),
)
var _SendIcon = _interopRequireDefault(require('../icons/SendIcon'))
var _ChatIcon = _interopRequireDefault(require('../icons/ChatIcon'))
var _CustomTextInput = _interopRequireDefault(require('./CustomTextInput'))
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
 * EditorArea
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.phone
 * props.uiData.panelSessionTable
 * props.uiData.configurations
 * props.uiData.showingDialogVersion
 * props.uiData.showingDialog_update
 * props.uiData.currentSelectedTab
 * props.uiData.selectedButNotFocusedTab
 * props.uiData.editorTextarea_onKeyDown
 * props.uiData.editorSendButton_onClick
 * props.uiData.panelHeaderLeaveButton_onClick
 * props.uiData.panelHeaderInviteButton_onClick
 * props.uiData.panelHeaderFileButton_onClick
 * props.uiData.panelHeaderVoiceButton_onClick
 * props.uiData.panelHeaderVideoButton_onClick
 * props.uiData.panelHeaderScreenButton_onClick
 * props.uiData.panelHeaderContinuationMenuItem_onClick
 * props.panelType
 * props.panelCode
 * props.disabled
 * props.hidden
 */
var _default = (exports.default = /*#__PURE__*/ (function (_React$Component) {
  function _default(props) {
    var _this
    _classCallCheck(this, _default)
    _this = _callSuper(this, _default, [props])
    _this.currentEditorType = ''
    _this.hidden = false
    _this.state = {
      showingDialogVersion: null,
      showingReplyDialogVersion: null,
      replyDialogStyle: {},
      selectedEditorType: '',
      showingChangeEditorTypeDialogVersion: null,
      changeEditorTypeDialogStyle: {},
      splitterHeight: 10000,
    }
    _this.editorTextareaRef = /*#__PURE__*/ _react.default.createRef()
    _this.subjectTextBoxRef = /*#__PURE__*/ _react.default.createRef()
    _this.editorOptionsBalloonRef = /*#__PURE__*/ _react.default.createRef()
    _this.editorAreaRef = /*#__PURE__*/ _react.default.createRef()

    // Create animated value for splitter position
    _this.splitterPosition = new _reactNative.Animated.Value(0)

    // Initialize pan responder for drag functionality
    _this.panResponder = _reactNative.PanResponder.create({
      onStartShouldSetPanResponder: function onStartShouldSetPanResponder() {
        return true
      },
      onMoveShouldSetPanResponder: function onMoveShouldSetPanResponder() {
        return true
      },
      onPanResponderGrant: function onPanResponderGrant() {
        // Store the current position when touch starts
        _this.splitterPosition.setOffset(_this.splitterPosition._value)
        _this.splitterPosition.setValue(0)
      },
      onPanResponderMove: function onPanResponderMove(evt, gestureState) {
        // Update position based on drag
        _this.splitterPosition.setValue(gestureState.dy)
      },
      onPanResponderRelease: function onPanResponderRelease() {
        // Flatten the offset into the value
        _this.splitterPosition.flattenOffset()

        // Get the current position
        var currentPosition = _this.splitterPosition._value

        // Calculate new splitter height
        var newSplitterHeight = _this.state.splitterHeight + currentPosition

        // Apply constraints
        var props = _this.props
        if (_this.editorTextareaRef.current) {
          _this.editorTextareaRef.current.measure(
            function (x, y, width, height, pageX, pageY) {
              var parentHeight =
                props.uiData.ucUiStore.getChatClient().getProfile().height || 0
              newSplitterHeight = Math.max(70 - parentHeight, newSplitterHeight)
              newSplitterHeight = Math.min(0, newSplitterHeight)

              // Update state with new height
              _this.setState({
                splitterHeight: newSplitterHeight,
              })

              // Save to preferences
              props.uiData.ucUiAction.setLocalStoragePreference({
                keyValueList: [
                  {
                    key: 'emailSplitterHeight',
                    value: (0, _strings.string)(newSplitterHeight),
                  },
                ],
              })
            },
          )
        }
      },
    })
    return _this
  }
  _inherits(_default, _React$Component)
  return _createClass(_default, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var props = this.props
        if (this.editorTextareaRef.current && !props.disabled) {
          // this.editorTextareaRef.current.focus()
          if (
            props.uiData.selectedButNotFocusedTab ===
            props.panelType + '_' + props.panelCode
          ) {
            props.uiData.selectedButNotFocusedTab = ''
          }
        }

        // Set initial splitter position
        var isEmail = this.currentEditorType === 'Email'
        var splitterHeight =
          this.state.splitterHeight === 10000 && isEmail
            ? (0, _strings.int)(
                props.uiData.ucUiStore.getLocalStoragePreference({
                  keyList: ['emailSplitterHeight'],
                })[0],
              )
            : this.state.splitterHeight
        splitterHeight = Math.min(0, splitterHeight)
        this.splitterPosition.setValue(splitterHeight)
      },
    },
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps, prevState) {
        var props = this.props
        var isEmail = this.currentEditorType === 'Email'
        if (
          props.uiData.selectedButNotFocusedTab ===
          props.panelType + '_' + props.panelCode
        ) {
          if (this.editorTextareaRef.current && !props.disabled) {
            // this.editorTextareaRef.current.focus()
            props.uiData.selectedButNotFocusedTab = ''
          }
        }

        // if (this.editorTextareaRef.current) {
        //     this.editorTextareaRef.current.measure((x, y, width, height, pageX, pageY) => {
        //         const editorHeight = height;
        //         const parentHeight = props.uiData.ucUiStore.getChatClient().getProfile().height || 0;
        //         const chatArea = props.uiData.ucUiStore.getChatClient().getChatArea();
        //         const chatAreaScrollToBottomButton = props.uiData.ucUiStore.getChatClient().getChatAreaScrollToBottomButton();

        //         if (this.hidden) {
        //             if (chatArea) {
        //                 chatArea.style = { bottom: 0 };
        //             }
        //             if (chatAreaScrollToBottomButton) {
        //                 chatAreaScrollToBottomButton.style = { bottom: 26 };
        //             }
        //         } else if (isEmail && editorHeight) {
        //             if (parentHeight < editorHeight && this.state.splitterHeight) {
        //                 this.setState({ splitterHeight: 0 });
        //                 return;
        //             }
        //             if (chatArea) {
        //                 chatArea.style = { bottom: editorHeight };
        //             }
        //             if (chatAreaScrollToBottomButton) {
        //                 chatAreaScrollToBottomButton.style = { bottom: editorHeight + 26 };
        //             }
        //         }
        //     });
        // }

        // Update splitter position when state changes
        if (prevState.splitterHeight !== this.state.splitterHeight) {
          this.splitterPosition.setValue(this.state.splitterHeight)
        }
      },
    },
    {
      key: 'handleSplitterHeightDrag',
      value: function handleSplitterHeightDrag(ev, ui) {
        // This method is kept for compatibility but the actual drag is handled by PanResponder
      },
    },
    {
      key: 'handleSplitterHeightStop',
      value: function handleSplitterHeightStop() {
        // This method is kept for compatibility but the actual stop is handled by PanResponder
      },
    },
    {
      key: 'handleSendButtonClick',
      value: function handleSendButtonClick(ev) {
        var props = this.props
        var isEmail = this.currentEditorType === 'Email'
        props.uiData.fire(
          'editorSendButton_onClick',
          props.panelType,
          props.panelCode,
          this.editorTextareaRef.current,
          this.subjectTextBoxRef.current,
          isEmail,
          ev,
        )
      },
    },
    {
      key: 'handleOptionsLinkClick',
      value: function handleOptionsLinkClick(ev) {
        var props = this.props
        console.log(
          '#Duy Phan console onpress1',
          props.uiData.showingDialogVersion !== this.state.showingDialogVersion,
        )
        if (
          props.uiData.showingDialogVersion !== this.state.showingDialogVersion
        ) {
          this.setState({
            showingDialogVersion: ++props.uiData.showingDialogVersion,
          })
          // ev.stopPropagation()
          props.uiData.fire('showingDialog_update')
        } else {
          props.uiData.window_onclick()
        }
      },
    },
    {
      key: 'handleReplyWebchatMenuClick',
      value: function handleReplyWebchatMenuClick(ev) {
        var _this2 = this
        var props = this.props
        if (
          props.uiData.showingDialogVersion !==
            this.state.showingDialogVersion ||
          props.uiData.showingDialogVersion !==
            this.state.showingReplyDialogVersion
        ) {
          props.uiData.showingDialogVersion++
          var replyDialogStyle = {}
          if (this.editorTextareaRef.current) {
            this.editorTextareaRef.current.measure(
              function (x, y, width, height, pageX, pageY) {
                var editorAreaRect = {
                  left: pageX,
                  top: pageY,
                  width: width,
                  height: height,
                }
                var editorOptionsBalloon =
                  _this2.editorOptionsBalloonRef.current
                var replyWebchatMenuRect =
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
                if (editorAreaRect && replyWebchatMenuRect) {
                  replyDialogStyle.left =
                    (editorOptionsBalloon || replyWebchatMenuRect).right -
                    editorAreaRect.left
                  replyDialogStyle.top =
                    replyWebchatMenuRect.top - editorAreaRect.top
                }
                _this2.setState({
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
      key: 'handleChangeEditorTypeMenuClick',
      value: function handleChangeEditorTypeMenuClick(ev) {
        var _this3 = this
        var props = this.props
        if (
          props.uiData.showingDialogVersion !==
            this.state.showingDialogVersion ||
          props.uiData.showingDialogVersion !==
            this.state.showingChangeEditorTypeDialogVersion
        ) {
          props.uiData.showingDialogVersion++
          var changeEditorTypeDialogStyle = {}
          if (this.editorTextareaRef.current) {
            this.editorTextareaRef.current.measure(
              function (x, y, width, height, pageX, pageY) {
                var editorAreaRect = {
                  left: pageX,
                  top: pageY,
                  width: width,
                  height: height,
                }
                var editorOptionsBalloon =
                  _this3.editorOptionsBalloonRef.current
                var changeEditorTypeMenuRect =
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
                if (editorAreaRect && changeEditorTypeMenuRect) {
                  changeEditorTypeDialogStyle.position = 'absolute'
                  changeEditorTypeDialogStyle.left =
                    (editorOptionsBalloon || changeEditorTypeMenuRect).right -
                    editorAreaRect.left
                  changeEditorTypeDialogStyle.bottom =
                    editorAreaRect.bottom - changeEditorTypeMenuRect.bottom
                }
                _this3.setState({
                  showingDialogVersion: props.uiData.showingDialogVersion,
                  showingChangeEditorTypeDialogVersion:
                    props.uiData.showingDialogVersion,
                  changeEditorTypeDialogStyle: changeEditorTypeDialogStyle,
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
      key: 'render',
      value: function render() {
        var _this4 = this
        var props = this.props
        var profile = props.uiData.ucUiStore.getChatClient().getProfile()
        var configProperties = props.uiData.ucUiStore.getConfigProperties()
        var myUcCimUserType = (0, _strings.int)(
          props.uiData.ucUiStore.getUcCimUserType(),
        )
        var chatHeaderInfo =
          props.uiData.ucUiStore.getChatHeaderInfo({
            chatType: props.panelType,
            chatCode: props.panelCode,
          }) || {}
        var editorTypes = (0, _strings.string)(
          chatHeaderInfo.editorTypes ||
            props.uiData.ucUiStore.getOptionalSetting({
              key: ['editor_types'],
            }) ||
            '_',
        ).split(',')
        var initialEditorType = (0, _strings.string)(
          chatHeaderInfo.initialEditorType ||
            props.uiData.ucUiStore.getOptionalSetting({
              key: ['initial_editor_type'],
            }) ||
            '',
        )
        this.currentEditorType =
          this.state.selectedEditorType ||
          this.currentEditorType ||
          editorTypes.find(function (t) {
            return t === initialEditorType
          }) ||
          editorTypes[0]
        var isEmail = this.currentEditorType === 'Email'
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
        var className = 'brEditorArea brEditorType' + this.currentEditorType
        var splitterHeight =
          this.state.splitterHeight === 10000 && isEmail
            ? (0, _strings.int)(
                props.uiData.ucUiStore.getLocalStoragePreference({
                  keyList: ['emailSplitterHeight'],
                })[0],
              )
            : this.state.splitterHeight
        var disabled = props.disabled
        this.hidden = props.hidden
        var menuOptions = []
        var replyOptions = []
        if (
          props.uiData.currentSelectedTab ===
          props.panelType + '_' + props.panelCode
        ) {
          className += ' brSelected'
        }
        if (
          (props.uiData.configurations &&
            props.uiData.configurations.sendButton) ||
          isEmail
        ) {
          className += ' brWithSendButton'
        }
        if (
          props.uiData.configurations &&
          props.uiData.configurations.withMenuOptions
        ) {
          className += ' brWithMenuOptions'
        }
        if (isEmail && chatHeaderInfo.lastConfType === 'emptylast') {
          className += ' brMaximized'
        }
        if (props.panelType === 'CONFERENCE') {
          var conf_id = (0, _strings.string)(chatHeaderInfo.conf_id)
          var conference = props.uiData.ucUiStore
            .getChatClient()
            .getConference(conf_id)
          var joinedCount = conference.user.filter(function (u) {
            return u.conf_status === _constants.default.CONF_STATUS_JOINED
          }).length
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
              label: _uawmsgs.default.LBL_EDITOR_REPLY_MANUAL_CONTINUATION_MENU,
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
          var mustDisable = !(
            (conference.conf_status === _constants.default.CONF_STATUS_JOINED &&
              joinedCount >= 2) ||
            chatHeaderInfo.nextDistributionTarget === profile.user_id
          )
          if (mustDisable) {
            disabled = true
          }
          if (isEmail && (!chatHeaderInfo.lastConfType || mustDisable)) {
            this.hidden = true
          }
          menuOptions = [
            {
              headerButtonName: 'leave',
              label: _uawmsgs.default.LBL_EDITOR_LEAVE_LINK,
              iconClass: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                _LogOutIcon.default,
                {},
              ),
              eventName: 'panelHeaderLeaveButton_onClick',
              enabled:
                conference.conf_status ===
                _constants.default.CONF_STATUS_JOINED,
            },
            {
              headerButtonName: 'invite',
              label: _uawmsgs.default.LBL_EDITOR_INVITE_LINK,
              iconClass: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                _EnvelopeIcon.default,
                {},
              ),
              eventName: 'panelHeaderInviteButton_onClick',
              enabled:
                conference.conf_status ===
                  _constants.default.CONF_STATUS_JOINED &&
                (chatHeaderInfo.confType !== 'webchat' ||
                  (-(0, _strings.int)(
                    (conference.webchatinfo &&
                      (0, _strings.string)(
                        conference.webchatinfo.invite_button_type,
                      )) ||
                      '-98',
                  ) &
                    myUcCimUserType) ===
                    myUcCimUserType),
            },
            {
              headerButtonName: 'file',
              label: _uawmsgs.default.LBL_EDITOR_FILE_LINK,
              iconClass: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                _UploadIcon.default,
                {},
              ),
              eventName: 'panelHeaderFileButton_onClick',
              enabled:
                conference.conf_status ===
                  _constants.default.CONF_STATUS_JOINED && joinedCount >= 2,
            },
            {
              headerButtonName: 'voice',
              label: _uawmsgs.default.LBL_EDITOR_VOICE_LINK,
              iconClass: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                _PhoneIcon.default,
                {},
              ),
              eventName: 'panelHeaderVoiceButton_onClick',
              enabled:
                conference.conf_status ===
                  _constants.default.CONF_STATUS_JOINED &&
                props.uiData.phone &&
                props.uiData.phone.getPhoneStatus() === 'started' &&
                !panelSession,
            },
            {
              headerButtonName: 'video',
              label: _uawmsgs.default.LBL_EDITOR_VIDEO_LINK,
              iconClass: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                _VideoCallIcon.default,
                {},
              ),
              eventName: 'panelHeaderVideoButton_onClick',
              enabled:
                conference.conf_status ===
                  _constants.default.CONF_STATUS_JOINED &&
                props.uiData.phone &&
                props.uiData.phone.getPhoneStatus() === 'started' &&
                !panelSession,
            },
            {
              headerButtonName: 'screen',
              label: _uawmsgs.default.LBL_EDITOR_SCREEN_LINK,
              iconClass: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                _ChannelMosaic1Icon.default,
                {},
              ),
              eventName: 'panelHeaderScreenButton_onClick',
              enabled:
                conference.conf_status ===
                  _constants.default.CONF_STATUS_JOINED &&
                props.uiData.phone &&
                props.uiData.phone.getPhoneStatus() === 'started' &&
                !panelSession,
            },
          ]
          if (chatHeaderInfo.confType === 'webchat') {
            menuOptions.splice(1, 0, {
              headerButtonName: 'reply',
              label: _uawmsgs.default.LBL_EDITOR_REPLY_LINK,
              iconClass: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                _ReplyIcon.default,
                {},
              ),
              event:
                replyOptions.length === 1
                  ? replyOptions[0].event
                  : this.handleReplyWebchatMenuClick.bind(this),
              enabled: replyOptions.length,
            })
          }
          if (
            isEmail &&
            !chatHeaderInfo.originalWebchatId &&
            props.uiData.ucUiStore.getChatClient().getConferenceTag({
              conf_id: conf_id,
              tag_key: '_outgoing_email_id',
            })
          ) {
            className += ' brWithSubjectTextBox'
          }
        } else if (props.panelType === 'CHAT') {
          menuOptions = [
            {
              headerButtonName: 'file',
              label: _uawmsgs.default.LBL_EDITOR_FILE_LINK,
              iconClass: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                _UploadIcon.default,
                {},
              ),
              eventName: 'panelHeaderFileButton_onClick',
              enabled: true,
            },
            {
              headerButtonName: 'voice',
              label: _uawmsgs.default.LBL_EDITOR_VOICE_LINK,
              iconClass: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                _PhoneIcon.default,
                {},
              ),
              eventName: 'panelHeaderVoiceButton_onClick',
              enabled:
                props.uiData.phone &&
                props.uiData.phone.getPhoneStatus() === 'started' &&
                !panelSession,
            },
            {
              headerButtonName: 'video',
              label: _uawmsgs.default.LBL_EDITOR_VIDEO_LINK,
              iconClass: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                _VideoCallIcon.default,
                {},
              ),
              eventName: 'panelHeaderVideoButton_onClick',
              enabled:
                props.uiData.phone &&
                props.uiData.phone.getPhoneStatus() === 'started' &&
                !panelSession,
            },
            {
              headerButtonName: 'screen',
              label: _uawmsgs.default.LBL_EDITOR_SCREEN_LINK,
              iconClass: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                _ChannelMosaic1Icon.default,
                {},
              ),
              eventName: 'panelHeaderScreenButton_onClick',
              enabled:
                props.uiData.phone &&
                props.uiData.phone.getPhoneStatus() === 'started' &&
                !panelSession,
            },
            {
              headerButtonName: 'history',
              label: _uawmsgs.default.LBL_EDITOR_HISTORY_LINK,
              iconClass: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                _HistoryIcon.default,
                {},
              ),
              eventName: 'panelHeaderHistoryButton_onClick',
              enabled: true,
            },
          ]
        } else if (props.panelType === 'EXTERNALCALL') {
          this.hidden = true
        }
        if (this.hidden) {
          className += ' brHidden'
        }
        if (disabled) {
          className += ' brDisabled'
        }
        if (editorTypes.length >= 2) {
          menuOptions.push({
            label: 'Change editor',
            iconClass: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
              _EditIcon.default,
              {},
            ),
            event: this.handleChangeEditorTypeMenuClick.bind(this),
            enabled: true,
          })
        }
        if (props.uiData.configurations.headerButtons) {
          menuOptions = menuOptions.filter(function (s) {
            return (
              !s.headerButtonName ||
              props.uiData.configurations.headerButtons.indexOf(
                s.headerButtonName,
              ) !== -1
            )
          })
        }
        if (
          ((0, _strings.int)(
            props.uiData.ucUiStore.getOptionalSetting({
              key: 'fsp',
            }),
          ) &
            myUcCimUserType) ===
          myUcCimUserType
        ) {
          menuOptions = menuOptions.filter(function (s) {
            return s.headerButtonName !== 'file'
          })
        }
        if (menuOptions.length) {
          className += ' brMenuOptionsLength'
        }
        console.log('#Duy Phan console check cond', disabled)
        return /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: [
            styles[className.split(' ')[0]],
            styles[className.split(' ')[1]],
            props.uiData.currentSelectedTab ===
            props.panelType + '_' + props.panelCode
              ? styles.brSelected
              : null,
            (props.uiData.configurations &&
              props.uiData.configurations.sendButton) ||
            isEmail
              ? styles.brWithSendButton
              : null,
            props.uiData.configurations &&
            props.uiData.configurations.withMenuOptions
              ? styles.brWithMenuOptions
              : null,
            isEmail && chatHeaderInfo.lastConfType === 'emptylast'
              ? styles.brMaximized
              : null,
            this.hidden ? styles.brHidden : null,
            disabled ? styles.brDisabled : null,
            menuOptions.length ? styles.brMenuOptionsLength : null,
            isEmail && chatHeaderInfo.lastConfType === 'webchat'
              ? {
                  height: 70 - Math.min(0, splitterHeight),
                }
              : {},
            // { zIndex: 100 },
          ],
          ref: this.editorAreaRef,
          onTouchEnd: function onTouchEnd() {
            console.log('#Duy Phan console onTouchEnd3')
          },
          children: [
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(_CustomTextInput.default, {
              ref: this.subjectTextBoxRef,
              style: styles.brSubjectTextBox,
              placeholder: _uawmsgs.default.LBL_EDITOR_SUBJECT_PLACEHOLDER,
              disabled: disabled,
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
              style: styles.brEditorTextareaContainer,
              children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                _CustomTextInput.default,
                {
                  ref: this.editorTextareaRef,
                  style: styles.brEditorTextarea,
                  placeholder:
                    disabled || isEmail
                      ? ''
                      : _uawmsgs.default.LBL_EDITOR_TEXTAREA_PLACEHOLDER,
                  onKeyPress: function onKeyPress(e) {
                    var r = _this4.editorTextareaRef.current
                    props.uiData.fire(
                      'editorTextarea_onKeyDown',
                      props.panelType,
                      props.panelCode,
                      disabled,
                      isEmail,
                      r,
                      e,
                    )
                  },
                  multiline: true,
                },
              ),
            }),
            isEmail &&
              chatHeaderInfo.lastConfType === 'webchat' &&
              /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                _reactNative.Animated.View,
                _objectSpread(
                  {
                    style: [
                      styles.brSplitterHeight,
                      {
                        transform: [
                          {
                            translateY: this.splitterPosition,
                          },
                        ],
                      },
                    ],
                  },
                  this.panResponder.panHandlers,
                ),
              ),
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(_ButtonIconic.default, {
              style: [styles.brEditorSendButton],
              title: _uawmsgs.default.LBL_EDITOR_SEND_BUTTON_TOOLTIP,
              iconSource: isEmail
                ? /*#__PURE__*/ (0, _jsxRuntime.jsx)(_SendIcon.default, {})
                : /*#__PURE__*/ (0, _jsxRuntime.jsx)(_ChatIcon.default, {
                    color: '#b9b9b9',
                  }),
              disabled: disabled,
              onPress: this.handleSendButtonClick.bind(this),
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
              style: styles.brEditorOptionsButton,
              onPress: this.handleOptionsLinkClick.bind(this),
              pointerEvents: 'auto',
              children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                style: [styles.brEditorOptionsIcon],
                children:
                  props.uiData.showingDialogVersion ===
                  this.state.showingDialogVersion
                    ? /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                        _TriangleUpIcon.default,
                        {
                          color: '#ffffff',
                          width: 30,
                          height: 30,
                        },
                      )
                    : /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                        _TriangleDownIcon.default,
                        {
                          color: '#ffffff',
                          width: 30,
                          height: 30,
                        },
                      ),
              }),
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(_MenuBalloonDialog.default, {
              ref: this.editorOptionsBalloonRef,
              showing:
                props.uiData.showingDialogVersion ===
                this.state.showingDialogVersion,
              style: styles.brEditorOptionsBalloon,
              onPress: this.handleOptionsLinkClick.bind(this),
              children: menuOptions.map(function (s, i) {
                return /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                  _MenuItem.default,
                  {
                    style: [styles.brEditorOptionsItem],
                    disabled: !s.enabled,
                    onPress:
                      s.event ||
                      props.uiData.fire.bind(
                        props.uiData,
                        s.eventName,
                        props.panelType,
                        props.panelCode,
                      ),
                    children: [
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                        style: {
                          marginRight: 10,
                        },
                        children: s.iconClass,
                      }),
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                        children: s.label,
                      }),
                    ],
                  },
                  i,
                )
              }),
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(_MenuBalloonDialog.default, {
              showing:
                props.uiData.showingDialogVersion ===
                  this.state.showingDialogVersion &&
                props.uiData.showingDialogVersion ===
                  this.state.showingReplyDialogVersion,
              style: [
                styles.brEditorOptionsReplyWebchatBalloon,
                this.state.replyDialogStyle,
              ],
              children: replyOptions.map(function (s, i) {
                return /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                  _MenuItem.default,
                  {
                    style: [
                      styles.brEditorOptionsReplyWebchatMenuItem,
                      styles[s.className],
                    ],
                    onPress: s.event,
                    children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                      _reactNative.Text,
                      {
                        children: s.label,
                      },
                    ),
                  },
                  i,
                )
              }),
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(_MenuBalloonDialog.default, {
              showing:
                props.uiData.showingDialogVersion ===
                  this.state.showingDialogVersion &&
                props.uiData.showingDialogVersion ===
                  this.state.showingChangeEditorTypeDialogVersion,
              style: [
                styles.brEditorOptionsChangeEditorTypeBalloon,
                this.state.changeEditorTypeDialogStyle,
              ],
              children: editorTypes.map(function (t, i) {
                return /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                  _MenuItem.default,
                  {
                    style: [
                      styles.brEditorOptionsChangeEditorTypeMenuItem,
                      styles['brEditorType' + t],
                    ],
                    onPress: function onPress() {
                      return _this4.setState({
                        selectedEditorType: t,
                      })
                    },
                    children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                      _reactNative.Text,
                      {
                        children: _uawmsgs.default['LBL_EDITOR_TYPE_' + t] || t,
                      },
                    ),
                  },
                  i,
                )
              }),
            }),
          ],
        })
      },
    },
  ])
})(_react.default.Component))
var styles = _reactNative.StyleSheet.create({
  // Main editor area
  brEditorArea: {
    position: 'absolute',
    padding: 0,
    paddingBottom: 1,
    width: '100%',
    height: 70,
    left: 0,
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  brHidden: {
    display: 'none',
  },
  brMaximized: {
    height: '100%',
  },
  brSelected: {
    backgroundColor: '@white',
  },
  // Subject text box
  brSubjectTextBox: {
    display: 'none',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: 32,
    borderRadius: 0,
  },
  brWithSubjectTextBox: {
    // This is a modifier class, will be applied conditionally
  },
  // Editor textarea container
  brEditorTextareaContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  // Editor textarea
  brEditorTextarea: {
    // position: 'absolute',
    width: '100%',
    height: '100%',
    fontFamily: undefined,
    // Will inherit from parent
    fontSize: 13,
    fontWeight: '400',
    // lineHeight: 1.6,
    letterSpacing: 0.3,
    borderWidth: 0,
    padding: 8,
    marginLeft: 80,
  },
  brWithMenuOptions: {
    // This is a modifier class, will be applied conditionally
  },
  brMenuOptionsLength: {
    // This is a modifier class, will be applied conditionally
  },
  brDisabled: {
    color: '@dark_gray',
  },
  // Splitter height
  brSplitterHeight: {
    position: 'absolute',
    width: '100%',
    height: 8,
    left: 0,
    bottom: 60,
    // cursor: 'row-resize', // Not applicable in RN
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Editor send button
  brEditorSendButton: {
    // display: 'none',
    position: 'absolute',
    right: 16,
    bottom: 18,
    // borderWidth: 0,
    // opacity: 0.2,
  },
  brWithSendButton: {
    // This is a modifier class, will be applied conditionally
  },
  // Editor options button
  brEditorOptionsButton: {
    // display: 'none',
    position: 'absolute',
    width: 40,
    height: 40,
    left: 20,
    bottom: 17,
    borderWidth: 0,
    borderRadius: 4,
    backgroundColor: '#5fac3f',
    // boxShadow: '0px 0px 20px -10px @mantis', // Will be handled differently in RN
  },
  // Editor options icon
  brEditorOptionsIcon: {
    display: 'flex',
    // position: 'absolute',
    // left: 0,
    // top: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Editor options balloon
  brEditorOptionsBalloon: {
    position: 'absolute',
    left: 20,
    bottom: 58,
    // zIndex: 9999,
  },
  // Editor options item
  brEditorOptionsItem: {
    flexDirection: 'row',
    paddingHorizontal: 6,
    alignItems: 'center',
    // backgroundRepeat: 'no-repeat', // Will be handled differently in RN
    // backgroundPosition: '8px center', // Will be handled differently in RN
  },
  // Editor options separator
  brEditorOptionsSeparator: {
    margin: 2,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '@platinum',
    borderStyle: 'inset',
  },
  // Editor options reply webchat balloon
  brEditorOptionsReplyWebchatBalloon: {
    position: 'absolute',
  },
  // Editor options change editor type balloon
  brEditorOptionsChangeEditorTypeBalloon: {
    position: 'absolute',
  },
  // Editor options change editor type menu item
  brEditorOptionsChangeEditorTypeMenuItem: {
    paddingLeft: 46,
  },
  // Icon classes
  br_bi_icon_log_out_svg: {
    // Icon styles will be handled differently in RN
  },
  br_bi_icon_envelope_svg: {
    // Icon styles will be handled differently in RN
  },
  br_bi_icon_upload_svg: {
    // Icon styles will be handled differently in RN
  },
  br_bi_icon_phone_svg: {
    // Icon styles will be handled differently in RN
  },
  br_bi_icon_video_call_svg: {
    // Icon styles will be handled differently in RN
  },
  br_bi_icon_channel_mosaic_1_svg: {
    // Icon styles will be handled differently in RN
  },
  br_bi_icon_history_svg: {
    // Icon styles will be handled differently in RN
  },
  br_bi_icon_reply_svg: {
    // Icon styles will be handled differently in RN
  },
  br_bi_icon_edit_svg: {
    // Icon styles will be handled differently in RN
  },
  br_bi_icon_triangle_up_svg: {
    // Icon styles will be handled differently in RN
  },
  br_bi_icon_triangle_down_svg: {
    // Icon styles will be handled differently in RN
  },
  br_bi_icon_send_svg: {
    // Icon styles will be handled differently in RN
  },
  br_bi_icon_chat_svg: {
    // Icon styles will be handled differently in RN
  },
  // Editor type classes
  brEditorTypeEmail: {
    // Editor type specific styles
  },
  brEditorTypeChat: {
    // Editor type specific styles
  },
  // Reply options classes
  brManualContinuation: {
    // Reply option specific styles
  },
  brContinuation: {
    // Reply option specific styles
  },
})
