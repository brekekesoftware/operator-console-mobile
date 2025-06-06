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
var _BgColorEditForm = _interopRequireDefault(require('./BgColorEditForm'))
var _BroadcastForm = _interopRequireDefault(require('./BroadcastForm'))
var _ButtonLabeled = _interopRequireDefault(require('./ButtonLabeled'))
var _ConferenceInviteForm = _interopRequireDefault(
  require('./ConferenceInviteForm'),
)
var _ConfirmForm = _interopRequireDefault(require('./ConfirmForm'))
var _DropDownMenu = _interopRequireDefault(require('./DropDownMenu'))
var _MenuItem = _interopRequireDefault(require('./MenuItem'))
var _OutgoingWebchatForm = _interopRequireDefault(
  require('./OutgoingWebchatForm'),
)
var _StatusDisplayForm = _interopRequireDefault(require('./StatusDisplayForm'))
var _UserListForm = _interopRequireDefault(require('./UserListForm'))
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
 * WidgetBody - React Native version
 * A component that displays modal dialogs and content
 */
var WidgetBody = (exports.default = /*#__PURE__*/ (function (_React$Component) {
  function WidgetBody(_props) {
    var _this
    _classCallCheck(this, WidgetBody)
    _this = _callSuper(this, WidgetBody, [_props])
    _defineProperty(_this, 'handleModalShow', function () {
      // if (this.okButtonRef) {
      //   this.okButtonRef?.focus()
      // }
    })
    _defineProperty(_this, 'handleModalTableKeyDown', function (ev) {
      var _this2 = _this,
        props = _this2.props
      var modalInfo = props.uiData.modalInfo

      // TODO: Handle enter/escape in native way if needed
    })
    _defineProperty(_this, 'handleModalCheckBoxClick', function () {
      var _this3 = _this,
        props = _this3.props
      var modalInfo = props.uiData.modalInfo
      if (modalInfo) {
        modalInfo.checkBoxChecked = !modalInfo.checkBoxChecked
        _this.forceUpdate()
      }
    })
    _defineProperty(_this, 'handleModalMenuItemClick', function (index) {
      var _modalInfo$selectItem
      var _this4 = _this,
        props = _this4.props
      var modalInfo = props.uiData.modalInfo
      if (
        modalInfo !== null &&
        modalInfo !== void 0 &&
        (_modalInfo$selectItem = modalInfo.selectItemList) !== null &&
        _modalInfo$selectItem !== void 0 &&
        _modalInfo$selectItem.length
      ) {
        modalInfo.selectItemList.forEach(function (item, i) {
          item.selected = i === index
        })
        _this.forceUpdate()
      }
    })
    _defineProperty(_this, 'handleModalOKButtonClick', function () {
      var _this5 = _this,
        props = _this5.props
      props.uiData.fire('modalOk_onClick', _this.contentRef)
    })
    _defineProperty(_this, 'handleModalCancelButtonClick', function () {
      var _this6 = _this,
        props = _this6.props
      props.uiData.fire('modalCancel_onClick', _this.contentRef)
    })
    _defineProperty(_this, 'handleModalThirdButtonClick', function () {
      var _this7 = _this,
        props = _this7.props
      props.uiData.fire('modalThirdButton_onClick', _this.contentRef)
    })
    _defineProperty(_this, 'onModalContentLayout', function (event) {
      var height = event.nativeEvent.layout.height
      if (height !== _this.state.modalContentHeight) {
        _this.setState({
          modalContentHeight: height,
        })
        _reactNative.Animated.timing(_this.state.modalHeight, {
          toValue: height,
          duration: 200,
          useNativeDriver: false,
        }).start()
      }
    })
    _this.state = {
      modalHeight: new _reactNative.Animated.Value(120),
      modalContentHeight: 120,
    }
    return _this
  }
  _inherits(WidgetBody, _React$Component)
  return _createClass(WidgetBody, [
    {
      key: 'renderModalContent',
      value: function renderModalContent() {
        var _this8 = this,
          _modalInfo$contentPar
        var props = this.props
        var modalInfo = props.uiData.modalInfo
        if (!modalInfo) return null
        switch (modalInfo.contentClass) {
          case 'ConferenceInviteForm':
            return /*#__PURE__*/ _react.default.createElement(
              _ConferenceInviteForm.default,
              {
                ref: function ref(_ref) {
                  return (_this8.contentRef = _ref)
                },
                uiData: props.uiData,
                params: modalInfo.contentParams,
              },
            )
          case 'BroadcastForm':
            return /*#__PURE__*/ _react.default.createElement(
              _BroadcastForm.default,
              {
                ref: function ref(_ref2) {
                  return (_this8.contentRef = _ref2)
                },
                uiData: props.uiData,
                params: modalInfo.contentParams,
              },
            )
          case 'BgColorEditForm':
            return /*#__PURE__*/ _react.default.createElement(
              _BgColorEditForm.default,
              {
                ref: function ref(_ref3) {
                  return (_this8.contentRef = _ref3)
                },
                uiData: props.uiData,
                params: modalInfo.contentParams,
              },
            )
          case 'ConfirmForm':
            return /*#__PURE__*/ _react.default.createElement(
              _ConfirmForm.default,
              {
                ref: function ref(_ref4) {
                  return (_this8.contentRef = _ref4)
                },
                uiData: props.uiData,
                params: modalInfo.contentParams,
              },
            )
          case 'OutgoingWebchatForm':
            return /*#__PURE__*/ _react.default.createElement(
              _OutgoingWebchatForm.default,
              {
                ref: function ref(_ref5) {
                  return (_this8.contentRef = _ref5)
                },
                uiData: props.uiData,
                params: modalInfo.contentParams,
              },
            )
          case 'StatusDisplayForm':
            return /*#__PURE__*/ _react.default.createElement(
              _StatusDisplayForm.default,
              {
                ref: function ref(_ref6) {
                  return (_this8.contentRef = _ref6)
                },
                uiData: props.uiData,
                params: modalInfo.contentParams,
              },
            )
          case 'UserListForm':
            return /*#__PURE__*/ _react.default.createElement(
              _UserListForm.default,
              {
                ref: function ref(_ref7) {
                  return (_this8.contentRef = _ref7)
                },
                uiData: props.uiData,
                params: modalInfo.contentParams,
              },
            )
          default:
            if (
              (_modalInfo$contentPar = modalInfo.contentParams) !== null &&
              _modalInfo$contentPar !== void 0 &&
              _modalInfo$contentPar.content
            ) {
              return /*#__PURE__*/ _react.default.createElement(
                _reactNative.View,
                {
                  ref: function ref(_ref8) {
                    return (_this8.contentRef = _ref8)
                  },
                },
                modalInfo.contentParams.content,
              )
            }
            return /*#__PURE__*/ _react.default.createElement(
              _reactNative.View,
              {
                ref: function ref(_ref9) {
                  return (_this8.contentRef = _ref9)
                },
              },
            )
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        var _modalInfo$selectItem2,
          _modalInfo$selectItem3,
          _this9 = this
        var props = this.props
        var modalInfo = props.uiData.modalInfo
        var content = this.renderModalContent()
        return /*#__PURE__*/ _react.default.createElement(
          _reactNative.View,
          {
            style: [styles.widgetBody, props.style],
            onTouchEnd: function onTouchEnd() {
              return props.uiData.fire('widgetBody_onClick')
            },
            // pointerEvents='box-none'
          },
          /*#__PURE__*/ _react.default.createElement(
            _reactNative.Modal,
            {
              visible: modalInfo !== null,
              transparent: true,
              onShow: this.handleModalShow,
              animationType: 'fade',
            },
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.View,
              {
                style: [
                  styles.modalOverlay,
                  props.modalOverlayClassName &&
                    styles[props.modalOverlayClassName],
                  (modalInfo === null || modalInfo === void 0
                    ? void 0
                    : modalInfo.overlayClassName) &&
                    styles[modalInfo.overlayClassName],
                ],
              },
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.Animated.View,
                {
                  style: [
                    styles.modal,
                    (modalInfo === null || modalInfo === void 0
                      ? void 0
                      : modalInfo.modalClassName) &&
                      styles[modalInfo.modalClassName],
                    {
                      height: this.state.modalHeight,
                    },
                    modalInfo === null || modalInfo === void 0
                      ? void 0
                      : modalInfo.modalStyle,
                  ],
                },
                /*#__PURE__*/ _react.default.createElement(
                  _reactNative.View,
                  {
                    style: [
                      styles.modalTable,
                      (modalInfo === null || modalInfo === void 0
                        ? void 0
                        : modalInfo.tableClassName) &&
                        styles[modalInfo.tableClassName],
                      (modalInfo === null || modalInfo === void 0
                        ? void 0
                        : modalInfo.expandInlineImage) &&
                        styles.expandInlineImage,
                    ],
                    onLayout: this.onModalContentLayout,
                  },
                  /*#__PURE__*/ _react.default.createElement(
                    _reactNative.Text,
                    {
                      style: styles.modalTitle,
                    },
                    modalInfo === null || modalInfo === void 0
                      ? void 0
                      : modalInfo.title,
                  ),
                  /*#__PURE__*/ _react.default.createElement(
                    _reactNative.View,
                    {
                      style: styles.modalContent,
                    },
                    content,
                  ),
                  /*#__PURE__*/ _react.default.createElement(
                    _reactNative.ScrollView,
                    {
                      style: styles.modalMessage,
                    },
                    (modalInfo === null || modalInfo === void 0
                      ? void 0
                      : modalInfo.message) &&
                      (modalInfo.asHTML
                        ? /*#__PURE__*/ _react.default.createElement(
                            _reactNative.Text,
                            null,
                            modalInfo.message,
                          ) // TODO: Handle HTML content
                        : /*#__PURE__*/ _react.default.createElement(
                            _reactNative.Text,
                            null,
                            modalInfo.message,
                          )),
                    (modalInfo === null || modalInfo === void 0
                      ? void 0
                      : modalInfo.checkBoxLabel) &&
                      /*#__PURE__*/ _react.default.createElement(
                        _reactNative.TouchableOpacity,
                        {
                          style: styles.modalCheckBox,
                          onPress: this.handleModalCheckBoxClick,
                        },
                        /*#__PURE__*/ _react.default.createElement(
                          _reactNative.Text,
                          null,
                          modalInfo.checkBoxLabel,
                        ),
                      ),
                    (modalInfo === null ||
                    modalInfo === void 0 ||
                    (_modalInfo$selectItem2 = modalInfo.selectItemList) ===
                      null ||
                    _modalInfo$selectItem2 === void 0
                      ? void 0
                      : _modalInfo$selectItem2.length) > 0 &&
                      /*#__PURE__*/ _react.default.createElement(
                        _DropDownMenu.default,
                        {
                          uiData: props.uiData,
                          style: styles.modalMenu,
                          text: (0, _strings.string)(
                            (_modalInfo$selectItem3 =
                              modalInfo.selectItemList.find(function (item) {
                                return item.selected
                              })) === null || _modalInfo$selectItem3 === void 0
                              ? void 0
                              : _modalInfo$selectItem3.label,
                          ),
                        },
                        modalInfo.selectItemList.map(function (item, i) {
                          return /*#__PURE__*/ _react.default.createElement(
                            _MenuItem.default,
                            {
                              key: i,
                              dropDown: true,
                              onPress: function onPress() {
                                return _this9.handleModalMenuItemClick(i)
                              },
                            },
                            /*#__PURE__*/ _react.default.createElement(
                              _reactNative.Text,
                              null,
                              item.label,
                            ),
                          )
                        }),
                      ),
                  ),
                  /*#__PURE__*/ _react.default.createElement(
                    _reactNative.View,
                    {
                      style: {
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                      },
                    },
                    /*#__PURE__*/ _react.default.createElement(
                      _ButtonLabeled.default,
                      {
                        ref: function ref(_ref0) {
                          return (_this9.okButtonRef = _ref0)
                        },
                        style: [
                          styles.modalOKButton,
                          (modalInfo === null || modalInfo === void 0
                            ? void 0
                            : modalInfo.okClassName) &&
                            styles[modalInfo.okClassName],
                        ],
                        vivid: true,
                        title:
                          (modalInfo === null || modalInfo === void 0
                            ? void 0
                            : modalInfo.okCaption) || _uawmsgs.default.CMN_OK,
                        onPress: this.handleModalOKButtonClick,
                      },
                      /*#__PURE__*/ _react.default.createElement(
                        _reactNative.Text,
                        {
                          style: {
                            color: '#ffffff',
                            fontWeight: 'bold',
                          },
                        },
                        (modalInfo === null || modalInfo === void 0
                          ? void 0
                          : modalInfo.okCaption) || _uawmsgs.default.CMN_OK,
                      ),
                    ),
                    (modalInfo === null || modalInfo === void 0
                      ? void 0
                      : modalInfo.cancelable) &&
                      /*#__PURE__*/ _react.default.createElement(
                        _ButtonLabeled.default,
                        {
                          style: [
                            styles.modalCancelButton,
                            (modalInfo === null || modalInfo === void 0
                              ? void 0
                              : modalInfo.cancelClassName) &&
                              styles[modalInfo.cancelClassName],
                          ],
                          title:
                            (modalInfo === null || modalInfo === void 0
                              ? void 0
                              : modalInfo.cancelCaption) ||
                            _uawmsgs.default.CMN_CANCEL,
                          onPress: this.handleModalCancelButtonClick,
                        },
                        /*#__PURE__*/ _react.default.createElement(
                          _reactNative.Text,
                          {
                            style: {
                              color: '#ffffff',
                              fontWeight: 'bold',
                            },
                          },
                          (modalInfo === null || modalInfo === void 0
                            ? void 0
                            : modalInfo.cancelCaption) ||
                            _uawmsgs.default.CMN_CANCEL,
                        ),
                      ),
                    (modalInfo === null || modalInfo === void 0
                      ? void 0
                      : modalInfo.thirdButton) &&
                      /*#__PURE__*/ _react.default.createElement(
                        _ButtonLabeled.default,
                        {
                          style: [
                            styles.modalThirdButtonButton,
                            (modalInfo === null || modalInfo === void 0
                              ? void 0
                              : modalInfo.thirdButtonClassName) &&
                              styles[modalInfo.thirdButtonClassName],
                          ],
                          title:
                            (modalInfo === null || modalInfo === void 0
                              ? void 0
                              : modalInfo.thirdButtonCaption) ||
                            _uawmsgs.default.CMN_CLOSE,
                          onPress: this.handleModalThirdButtonClick,
                        },
                        /*#__PURE__*/ _react.default.createElement(
                          _reactNative.Text,
                          {
                            style: {
                              color: '#ffffff',
                              fontWeight: 'bold',
                            },
                          },
                          (modalInfo === null || modalInfo === void 0
                            ? void 0
                            : modalInfo.thirdButtonCaption) ||
                            _uawmsgs.default.CMN_CLOSE,
                        ),
                      ),
                  ),
                ),
              ),
            ),
          ),
          props.children,
        )
      },
    },
  ])
})(_react.default.Component)) // Define colors from CSS variables
var colors = {
  white: '#FFFFFF',
  platinum: '#E0E0E0',
  darkGray: '#9E9E9E',
  darkJungleGreen: '#212121',
}
var styles = _reactNative.StyleSheet.create({
  widgetBody: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.white,
    height: 'auto',
  },
  modalOverlay: {
    position: 'absolute',
    zIndex: 9999,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
  modal: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
    width: '100%',
  },
  modalTable: _objectSpread(
    _objectSpread(
      {
        margin: 'auto',
        // maxHeight: 120,
        borderRadius: 4,
        backgroundColor: colors.white,
      },
      _reactNative.Platform.select({
        ios: {
          shadowColor: colors.platinum,
          shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowOpacity: 1,
          shadowRadius: 4,
        },
        android: {
          elevation: 4,
        },
      }),
    ),
    {},
    {
      margin: 50,
    },
  ),
  modalTitle: {
    height: 56,
    padding: 21,
    paddingBottom: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    fontSize: 16,
    fontWeight: '400',
    // lineHeight: 25.6,
    letterSpacing: 0.3,
  },
  modalMessage: {
    maxHeight: _reactNative.Dimensions.get('window').height * 0.4,
    borderBottomWidth: 1,
    borderBottomColor: colors.platinum,
    padding: 24,
    paddingTop: 0,
  },
  modalMessageText: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 20.8,
    letterSpacing: 0.3,
    color: colors.darkGray,
  },
  modalCheckBox: {
    marginTop: 8,
    paddingLeft: 32,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 20.8,
    letterSpacing: 0.3,
    color: colors.darkJungleGreen,
  },
  modalMenu: {
    display: 'flex',
  },
  modalOKButton: {
    minWidth: 80,
    margin: 16,
  },
  modalCancelButton: {
    minWidth: 80,
    margin: 16,
    marginLeft: -8,
  },
  modalThirdButtonButton: {
    minWidth: 80,
    margin: 16,
    marginLeft: -8,
  },
  expandInlineImage: _objectSpread(
    {},
    _reactNative.Platform.select({
      ios: {
        shadowColor: 'transparent',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0,
        shadowRadius: 0,
      },
      android: {
        elevation: 0,
      },
    }),
  ),
  hidden: {
    display: 'none',
  },
  modalContent: {},
})
