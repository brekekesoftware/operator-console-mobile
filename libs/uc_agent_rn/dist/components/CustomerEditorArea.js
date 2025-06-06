'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _react = _interopRequireDefault(require('react'))
var _reactNative = require('react-native')
var _uawmsgs = _interopRequireDefault(require('../utilities/uawmsgs'))
var _strings = require('../utilities/strings')
var _ButtonIconic = _interopRequireDefault(require('./ButtonIconic'))
var _MenuBalloonDialog = _interopRequireDefault(require('./MenuBalloonDialog'))
var _MenuItem = _interopRequireDefault(require('./MenuItem'))
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
}
/**
 * CustomerEditorArea
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.phoneSettings
 * props.uiData.configurations
 * props.uiData.showingDialogVersion
 * props.uiData.showingDialog_update
 * props.uiData.reportMailStatus
 * props.uiData.reportEmailAddress
 * props.uiData.editorEditEmailLink_onClick
 * props.uiData.editorEndChatLink_onClick
 * props.uiData.editorMakeCallLink_onClick
 * props.uiData.editorReportMailLink_onClick
 * props.uiData.editorSendButton_onClick
 * props.uiData.editorSendFileLink_onClick
 * props.uiData.editorTextarea_onKeyDown
 * props.panelType
 * props.panelCode
 * props.withMenuOptions
 * props.disabled
 */
var CustomerEditorArea = (exports.default = /*#__PURE__*/ (function (
  _React$Component,
) {
  function CustomerEditorArea(_props) {
    var _this
    _classCallCheck(this, CustomerEditorArea)
    _this = _callSuper(this, CustomerEditorArea, [_props])
    _defineProperty(_this, 'handleSendButtonPress', function () {
      var _this2 = _this,
        props = _this2.props
      props.uiData.fire(
        'editorSendButton_onClick',
        props.panelType,
        props.panelCode,
        _this.editorTextarea.current,
      )
    })
    _defineProperty(_this, 'handleOptionsPress', function () {
      var _this3 = _this,
        props = _this3.props
      if (
        props.uiData.showingDialogVersion !== _this.state.showingDialogVersion
      ) {
        _this.setState({
          showingDialogVersion: ++props.uiData.showingDialogVersion,
        })
        props.uiData.fire('showingDialog_update')
      }
    })
    _defineProperty(
      _this,
      'handleMenuOptionsItemPress',
      function (eventName, enabled) {
        var _this4 = _this,
          props = _this4.props
        if (enabled) {
          props.uiData.fire(eventName, props.panelType, props.panelCode)
        }
      },
    )
    _this.state = {
      showingDialogVersion: null,
    }
    _this.editorTextarea = /*#__PURE__*/ _react.default.createRef()
    return _this
  }
  _inherits(CustomerEditorArea, _React$Component)
  return _createClass(CustomerEditorArea, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        if (this.editorTextarea.current) {
          this.editorTextarea.current.focus()
        }
      },
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.props.uiData.removeHandler(this)
      },
    },
    {
      key: 'render',
      value: function render() {
        var _props$uiData$configu,
          _props$uiData$configu2,
          _this5 = this
        var props = this.props
        var settings = props.uiData.ucUiStore.getChatClient().getSettings()
        var myUcCimUserType = (0, _strings.int)(
          props.uiData.ucUiStore.getUcCimUserType(),
        )
        var signedIn = props.uiData.ucUiStore.getSignInStatus() === 3
        var disabled = props.disabled || !signedIn
        var containerStyle = [
          styles.brEditorArea,
          props.withMenuOptions && styles.brWithMenuOptions,
          ((_props$uiData$configu = props.uiData.configurations) === null ||
          _props$uiData$configu === void 0
            ? void 0
            : _props$uiData$configu.sendButton) && styles.brWithSendButton,
          disabled && styles.brDisabled,
        ]
        var menuOptions = []
        if (
          (_props$uiData$configu2 = props.uiData.configurations) !== null &&
          _props$uiData$configu2 !== void 0 &&
          (_props$uiData$configu2 = _props$uiData$configu2.menuOptions) !==
            null &&
          _props$uiData$configu2 !== void 0 &&
          _props$uiData$configu2.length
        ) {
          var _props$uiData$phoneSe,
            _props$uiData$phoneSe2,
            _props$uiData$phoneSe3,
            _props$uiData$phoneSe4,
            _settings$optional_se
          var optionInfoTable = {
            end: {
              eventName: 'editorEndChatLink_onClick',
              label: _uawmsgs.default.LBL_EDITOR_END_CHAT_LINK,
              enabled: signedIn,
            },
            file: {
              eventName: 'editorSendFileLink_onClick',
              label: _uawmsgs.default.LBL_EDITOR_SEND_FILE_LINK,
              enabled: signedIn,
            },
            call: {
              eventName: 'editorMakeCallLink_onClick',
              label: _uawmsgs.default.LBL_EDITOR_MAKE_CALL_LINK,
              enabled:
                signedIn &&
                (!(
                  ((_props$uiData$phoneSe = props.uiData.phoneSettings) ===
                    null || _props$uiData$phoneSe === void 0
                    ? void 0
                    : _props$uiData$phoneSe.call_target) ===
                    ((_props$uiData$phoneSe2 = props.uiData.phoneSettings) ===
                      null || _props$uiData$phoneSe2 === void 0
                      ? void 0
                      : _props$uiData$phoneSe2.customer_sip_user) &&
                  ((_props$uiData$phoneSe3 = props.uiData.phoneSettings) ===
                    null || _props$uiData$phoneSe3 === void 0
                    ? void 0
                    : _props$uiData$phoneSe3.customer_call_target) ===
                    ((_props$uiData$phoneSe4 = props.uiData.phoneSettings) ===
                      null || _props$uiData$phoneSe4 === void 0
                      ? void 0
                      : _props$uiData$phoneSe4.conf_ext)
                ) ||
                  props.uiData.ucUiStore
                    .getChatClient()
                    .getConference(props.uiData.ucUiStore.getGuestConfId())
                    .assigned.user_id),
            },
            transcript: {
              eventName: 'editorReportMailLink_onClick',
              label: /*#__PURE__*/ _react.default.createElement(
                _reactNative.View,
                {
                  style: styles.transcriptLabel,
                },
                /*#__PURE__*/ _react.default.createElement(_reactNative.View, {
                  style: [
                    styles.reportMailIcon,
                    ((settings === null ||
                    settings === void 0 ||
                    (_settings$optional_se = settings.optional_settings) ===
                      null ||
                    _settings$optional_se === void 0
                      ? void 0
                      : _settings$optional_se.send_report_mail) ||
                      props.uiData.reportMailStatus[props.panelCode] === 2) &&
                      styles.reportMailIconChecked,
                  ],
                }),
                /*#__PURE__*/ _react.default.createElement(
                  _reactNative.Text,
                  null,
                  _uawmsgs.default.LBL_EDITOR_REPORT_MAIL_LINK,
                ),
              ),
              enabled:
                signedIn ||
                props.uiData.reportMailStatus[props.panelCode] !== 2,
            },
          }
          if (props.uiData.reportEmailAddress) {
            optionInfoTable['email'] = {
              eventName: 'editorEditEmailLink_onClick',
              label: props.uiData.reportEmailAddress,
              enabled:
                signedIn ||
                props.uiData.reportMailStatus[props.panelCode] !== 2,
            }
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
            delete optionInfoTable.file
          }
          menuOptions = props.uiData.configurations.menuOptions.map(
            function (s, i) {
              if (optionInfoTable[s]) {
                return /*#__PURE__*/ _react.default.createElement(
                  _MenuItem.default,
                  {
                    key: i,
                    style: styles.brEditorOptionsItem,
                    disabled: !optionInfoTable[s].enabled,
                    onPress: function onPress() {
                      return _this5.handleMenuOptionsItemPress(
                        optionInfoTable[s].eventName,
                        optionInfoTable[s].enabled,
                      )
                    },
                  },
                  optionInfoTable[s].label,
                )
              } else if (s === 'separator') {
                return /*#__PURE__*/ _react.default.createElement(
                  _reactNative.View,
                  {
                    key: i,
                    style: styles.brEditorOptionsSeparator,
                  },
                )
              }
              return null
            },
          )
        }
        return /*#__PURE__*/ _react.default.createElement(
          _reactNative.View,
          {
            style: containerStyle,
          },
          /*#__PURE__*/ _react.default.createElement(_reactNative.TextInput, {
            ref: this.editorTextarea,
            style: styles.brEditorTextarea,
            multiline: true,
            placeholder: disabled
              ? ''
              : _uawmsgs.default.LBL_EDITOR_TEXTAREA_PLACEHOLDER,
            onKeyPress: function onKeyPress(e) {
              return props.uiData.fire(
                'editorTextarea_onKeyDown',
                props.panelType,
                props.panelCode,
                disabled,
                e,
              )
            },
            editable: !disabled,
          }),
          /*#__PURE__*/ _react.default.createElement(_ButtonIconic.default, {
            style: styles.brEditorSendButton,
            iconName: 'chat',
            title: _uawmsgs.default.LBL_EDITOR_SEND_BUTTON_TOOLTIP,
            onPress: this.handleSendButtonPress,
            disabled: disabled,
          }),
          /*#__PURE__*/ _react.default.createElement(
            _reactNative.TouchableOpacity,
            {
              style: styles.brEditorOptionsButton,
              onPress: this.handleOptionsPress,
              disabled: !props.withMenuOptions,
            },
            /*#__PURE__*/ _react.default.createElement(_reactNative.View, {
              style: [
                styles.brEditorOptionsIcon,
                props.uiData.showingDialogVersion ===
                this.state.showingDialogVersion
                  ? styles.iconUp
                  : styles.iconDown,
              ],
            }),
          ),
          /*#__PURE__*/ _react.default.createElement(
            _MenuBalloonDialog.default,
            {
              showing:
                props.uiData.showingDialogVersion ===
                this.state.showingDialogVersion,
              style: styles.brEditorOptionsBalloon,
            },
            menuOptions,
          ),
        )
      },
    },
  ])
})(_react.default.Component))
var colors = {
  white: '#ffffff',
  snow: '#fafafa',
  white_smoke: '#f5f5f5',
  isabelline: '#eeeeee',
  isabelline_tp: 'rgba(0, 0, 0, 0.065)',
  platinum: '#e0e0e0',
  dark_gray: '#9e9e9e',
  dark_jungle_green: '#212121',
  portland_orange: '#ff4526',
  disabled_gray: '#bdbdbd',
  pressed_gray: '#9e9e9e',
  hover_gray: '#616161',
  hint_gray: '#424242',
  status_available: '#5fac3f',
  status_idle: '#f3c915',
  status_busy: '#ff4526',
  status_invisible: '#bdbdbd',
  medium_turquoise: '#4BC5DE',
  mantis: '#5fac3f',
  green: '#4c8a32',
  sap_green: '#2d521e',
}
var styles = _reactNative.StyleSheet.create(
  _defineProperty(
    _defineProperty(
      _defineProperty(
        _defineProperty(
          _defineProperty(
            _defineProperty(
              _defineProperty(
                _defineProperty(
                  _defineProperty(
                    {
                      brEditorArea: {
                        position: 'absolute',
                        padding: 0,
                        paddingBottom: 1,
                        width: '100%',
                        height: 64,
                        left: 0,
                        bottom: 0,
                        borderTopWidth: 1,
                        borderTopColor: colors.platinum,
                      },
                      brEditorTextarea: {
                        width: '100%',
                        height: '100%',
                        fontFamily: 'System',
                        fontSize: 13,
                        fontWeight: '400',
                        lineHeight: 20,
                        letterSpacing: 0.3,
                        borderWidth: 0,
                        paddingTop: 16,
                        paddingBottom: 8,
                        paddingLeft: 80,
                        paddingRight: 8,
                        backgroundColor: 'transparent',
                      },
                      brEditorTextareaDisabled: {
                        color: colors.dark_gray,
                      },
                      brEditorTextareaFocused: {
                        borderWidth: 2,
                        borderColor: colors.medium_turquoise,
                      },
                      brEditorTextareaDisabledFocused: {
                        borderWidth: 0,
                      },
                      brEditorTextareaPlaceholder: {
                        color: colors.dark_gray,
                      },
                      brEditorSendButton: {
                        display: 'none',
                        position: 'absolute',
                        right: 16,
                        top: 16,
                        borderWidth: 0,
                        opacity: 0.2,
                      },
                      brEditorSendButtonActive: {
                        opacity: 1,
                      },
                      brEditorSendButtonDisabled: {
                        backgroundColor: 'transparent',
                      },
                      brEditorSendButtonDisabledCircle: {
                        position: 'absolute',
                        left: 4,
                        top: 4,
                        width: 20,
                        height: 20,
                        borderWidth: 2,
                        borderColor: colors.dark_jungle_green,
                        borderRadius: 10,
                      },
                      brEditorSendButtonDisabledLine: {
                        position: 'absolute',
                        left: 6,
                        top: 14,
                        width: 20,
                        height: 2,
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        borderColor: colors.white,
                        backgroundColor: colors.dark_jungle_green,
                        transform: [
                          {
                            rotate: '45deg',
                          },
                        ],
                      },
                      brWithSendButton: {
                        display: 'flex',
                      },
                      brEditorOptionsButton: {
                        position: 'absolute',
                        width: 40,
                        height: 40,
                        left: 20,
                        top: 8,
                        borderWidth: 0,
                        borderRadius: 4,
                        backgroundColor: colors.mantis,
                        shadowColor: colors.mantis,
                        shadowOffset: {
                          width: 0,
                          height: 0,
                        },
                        shadowOpacity: 0.5,
                        shadowRadius: 10,
                        elevation: 5,
                      },
                      brEditorOptionsButtonHover: {
                        backgroundColor: colors.green,
                        shadowColor: colors.green,
                      },
                      brEditorOptionsButtonActive: {
                        backgroundColor: colors.sap_green,
                        shadowColor: colors.sap_green,
                      },
                      brEditorOptionsButtonDisabled: {
                        backgroundColor: colors.disabled_gray,
                        shadowColor: colors.disabled_gray,
                      },
                      brEditorOptionsIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        width: '100%',
                        height: '100%',
                        tintColor: colors.white,
                      },
                      brEditorOptionsBalloon: {
                        position: 'absolute',
                        left: 20,
                        bottom: 56,
                        backgroundColor: colors.white,
                        borderRadius: 4,
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,
                      },
                      brEditorOptionsItem: {
                        padding: 14,
                        paddingHorizontal: 16,
                      },
                      brEditorReportMailLinkIcon: {
                        width: 20,
                        height: 16,
                        marginRight: 4,
                      },
                      brEditorReportMailLinkIconDisabled: {
                        opacity: 0.2,
                      },
                      brEditorOptionsSeparator: {
                        marginVertical: 2,
                        marginHorizontal: 10,
                        height: 1,
                        backgroundColor: colors.platinum,
                      },
                    },
                    'brEditorOptionsButtonDisabled',
                    {
                      backgroundColor: colors.disabled_gray,
                      shadowColor: colors.disabled_gray,
                    },
                  ),
                  'brEditorOptionsSeparator',
                  {
                    marginVertical: 2,
                    marginHorizontal: 10,
                    height: 1,
                    backgroundColor: colors.platinum,
                  },
                ),
                'transcriptLabel',
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                },
              ),
              'reportMailIcon',
              {
                width: 16,
                height: 16,
                marginRight: 8,
                borderWidth: 1,
                borderColor: '#000',
              },
            ),
            'reportMailIconChecked',
            {
              backgroundColor: '#4CAF50',
            },
          ),
          'iconUp',
          {
            transform: [
              {
                rotate: '180deg',
              },
            ],
          },
        ),
        'iconDown',
        {
          transform: [
            {
              rotate: '0deg',
            },
          ],
        },
      ),
      'brEditorOptionsButtonDisabled',
      {
        backgroundColor: colors.disabled_gray,
        shadowColor: colors.disabled_gray,
      },
    ),
    'brEditorOptionsSeparator',
    {
      marginVertical: 2,
      marginHorizontal: 10,
      height: 1,
      backgroundColor: colors.platinum,
    },
  ),
)
