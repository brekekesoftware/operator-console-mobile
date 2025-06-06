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
var _strings = require('../utilities/strings')
var _ChatPanel = _interopRequireDefault(require('../components/ChatPanel'))
var _WebchatQueuePanel = _interopRequireDefault(
  require('../components/WebchatQueuePanel'),
)
var _HistorySearchPanel = _interopRequireDefault(
  require('../components/HistorySearchPanel'),
)
var _DialogResizableBox = _interopRequireDefault(
  require('../components/DialogResizableBox'),
)
var _dialogCloseIcon = _interopRequireDefault(
  require('../images/dialogCloseIcon.png'),
)
var _dialoghide = _interopRequireDefault(require('../images/dialoghide.png'))
var _reactNativeLinearGradient = _interopRequireDefault(
  require('react-native-linear-gradient'),
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
/**
 * DialogApp
 * props.uiData
 * props.uiData.dialogCloseButton_onClick
 * props.uiData.dialogHideButton_onClick
 * props.uiData.dialogButton_onClick
 * props.uiData.dialogResizableBox_onStop
 * props.panelType
 * props.panelCode
 * props.dialogOption
 */
var DialogApp = /*#__PURE__*/ (function (_React$Component) {
  function DialogApp(props) {
    var _this
    _classCallCheck(this, DialogApp)
    _this = _callSuper(this, DialogApp, [props])
    _this.state = {
      initialLeft: null,
      initialTop: null,
      initialWidth: null,
      initialHeight: null,
      width: 0,
      height: 0,
    }
    return _this
  }
  _inherits(DialogApp, _React$Component)
  return _createClass(DialogApp, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this$props$dialogOpt = this.props.dialogOption,
          option = _this$props$dialogOpt === void 0 ? {} : _this$props$dialogOpt
        var _Dimensions$get = _reactNative.Dimensions.get('window'),
          innerWidth = _Dimensions$get.width,
          innerHeight = _Dimensions$get.height
        var initialWidth =
          typeof option.initialWidth === 'number'
            ? Math.min(option.initialWidth, innerWidth)
            : innerWidth / 2
        var initialHeight =
          typeof option.initialHeight === 'number'
            ? Math.min(option.initialHeight, innerHeight)
            : innerHeight / 2
        var initialLeft =
          typeof option.initialLeft === 'number'
            ? Math.min(option.initialLeft, innerWidth - initialWidth)
            : innerWidth / 4
        var initialTop =
          typeof option.initialTop === 'number'
            ? Math.min(option.initialTop, innerHeight - initialHeight)
            : innerHeight / 4
        this.setState({
          initialLeft: initialLeft,
          initialTop: initialTop,
          initialWidth: initialWidth,
          initialHeight: initialHeight,
          width: innerWidth,
          height: innerHeight,
        })
      },
    },
    {
      key: 'render',
      value: function render() {
        var _option$buttons, _option$buttons2
        var _this$props = this.props,
          uiData = _this$props.uiData,
          panelType = _this$props.panelType,
          panelCode = _this$props.panelCode,
          _this$props$dialogOpt2 = _this$props.dialogOption,
          option =
            _this$props$dialogOpt2 === void 0 ? {} : _this$props$dialogOpt2
        var contents = null
        console.log('#Duy Phan console panelType', panelType)
        if (panelType === 'CONFERENCE' || panelType === 'CHAT') {
          contents = /*#__PURE__*/ _react.default.createElement(
            _ChatPanel.default,
            {
              uiData: uiData,
              panelType: panelType,
              panelCode: panelCode,
            },
          )
        } else if (panelType === 'WEBCHATQUEUE') {
          contents = /*#__PURE__*/ _react.default.createElement(
            _WebchatQueuePanel.default,
            {
              uiData: uiData,
            },
          )
        } else if (panelType === 'HISTORYSEARCH') {
          contents = /*#__PURE__*/ _react.default.createElement(
            _HistorySearchPanel.default,
            {
              uiData: uiData,
              panelType: panelType,
              panelCode: panelCode,
              panelOption: option.panelOption,
              selectable: Boolean(option.selectable),
              allSelectable: Boolean(option.allSelectable),
              checkBox: Boolean(option.checkBox),
              emphasize: Boolean(option.emphasize),
            },
          )
        }
        var contentStyle = [
          styles.brDialogContent,
          ((_option$buttons = option.buttons) === null ||
          _option$buttons === void 0
            ? void 0
            : _option$buttons.length) && styles.brWithButtons,
        ]
        return /*#__PURE__*/ _react.default.createElement(
          _react.default.Fragment,
          null,
          /*#__PURE__*/ _react.default.createElement(
            _DialogResizableBox.default,
            {
              style: [
                styles.brUCAgentApp,
                styles.brDialogApp,
                styles.brDialogAppDialogResizableBox,
                {
                  width: this.state.width,
                  height: this.state.height,
                },
              ],
              disabled: !option.resizable,
              initialLeft: this.state.initialLeft,
              initialTop: this.state.initialTop,
              initialWidth: this.state.initialWidth,
              initialHeight: this.state.initialHeight,
              resizableOpts: {
                minConstraints: [500, 400],
              },
              movable: true,
              draggableOptsToMove: {
                handle: 'brDraggable',
              },
              modal: option.modal,
              onStop: function onStop() {
                return uiData.fire(
                  'dialogResizableBox_onStop',
                  panelType,
                  panelCode,
                )
              },
            },
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.View,
              {
                style: {
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  position: 'relative',
                },
              },
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.View,
                {
                  style: [
                    styles.brDialogTitle,
                    option.draggable && styles.brDraggable,
                  ],
                },
                /*#__PURE__*/ _react.default.createElement(
                  _reactNative.Text,
                  {
                    style: {
                      flex: 1,
                    },
                  },
                  (0, _strings.string)(option.title),
                ),
                /*#__PURE__*/ _react.default.createElement(
                  _reactNative.TouchableOpacity,
                  {
                    style: [
                      styles.brDialogCloseButton,
                      !option.closeable && styles.brHidden,
                    ],
                    onPress: function onPress() {
                      return uiData.fire(
                        'dialogCloseButton_onClick',
                        panelType,
                        panelCode,
                      )
                    },
                  },
                  /*#__PURE__*/ _react.default.createElement(
                    _reactNative.Image,
                    {
                      source: _dialogCloseIcon.default,
                      style: {
                        width: 21,
                        height: 15,
                      },
                    },
                  ),
                ),
                /*#__PURE__*/ _react.default.createElement(
                  _reactNative.TouchableOpacity,
                  {
                    style: [
                      styles.brDialogHideButton,
                      !option.hideable && styles.brHidden,
                    ],
                    onPress: function onPress() {
                      return uiData.fire(
                        'dialogHideButton_onClick',
                        panelType,
                        panelCode,
                      )
                    },
                  },
                  /*#__PURE__*/ _react.default.createElement(
                    _reactNative.Image,
                    {
                      source: _dialoghide.default,
                      style: {
                        width: 21,
                        height: 15,
                      },
                    },
                  ),
                ),
              ),
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.View,
                {
                  style: styles.brDialogButtons,
                },
                (_option$buttons2 = option.buttons) === null ||
                  _option$buttons2 === void 0
                  ? void 0
                  : _option$buttons2.map(function (button, i) {
                      return /*#__PURE__*/ _react.default.createElement(
                        _reactNative.Pressable,
                        {
                          key: i,
                          onPress: function onPress() {
                            return uiData.fire(
                              'dialogButton_onClick',
                              panelType,
                              panelCode,
                              button.name,
                            )
                          },
                          style: function style(_ref) {
                            var pressed = _ref.pressed
                            return [
                              styles.brDialogButtonWrapper,
                              pressed && styles.brDialogButtonActive,
                            ]
                          },
                        },
                        /*#__PURE__*/ _react.default.createElement(
                          _reactNativeLinearGradient.default,
                          {
                            colors: pressed
                              ? ['#FFFFFF1A', '#FFFFFF73', '#FFFFFFA6']
                              : ['#FFFFFFA6', '#FFFFFF73', '#FFFFFF1A'],
                            style: styles.brDialogButton,
                          },
                          /*#__PURE__*/ _react.default.createElement(
                            _reactNative.Text,
                            {
                              style: [
                                styles.brDialogButtonText,
                                pressed && styles.brDialogButtonTextActive,
                              ],
                            },
                            (0, _strings.string)(button.caption),
                          ),
                        ),
                      )
                    }),
              ),
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.View,
                {
                  style: contentStyle,
                },
                contents,
              ),
            ),
          ),
        )
      },
    },
  ])
})(_react.default.Component)
var styles = _reactNative.StyleSheet.create({
  brUCAgentApp: {
    flex: 1,
  },
  brDialogApp: {
    fontSize: 12,
    position: 'relative',
  },
  brDialogAppDialogResizableBox: {
    position: 'absolute',
    left: 0,
    backgroundColor: 'transparent',
    shadowColor: '#ddd',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
  },
  brDialogTitle: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    height: 24,
    borderWidth: 1,
    borderColor: '#dcdcd5',
    borderBottomWidth: 0,
    paddingLeft: 12,
    backgroundColor: '#f2f3ef',
    lineHeight: 24,
    fontWeight: 'bold',
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    minWidth: 500,
  },
  brDraggable: {},
  brDialogCloseButton: {
    width: 21,
    height: 15,
    marginTop: 5,
    marginRight: 5,
    marginBottom: 4,
  },
  brDialogCloseButtonHover: {},
  brDialogCloseButtonActive: {},
  brDialogHideButton: {
    width: 21,
    height: 15,
    marginTop: 5,
    marginRight: 5,
    marginBottom: 4,
  },
  brHidden: {
    display: 'none',
  },
  brDialogContent: {
    position: 'absolute',
    left: 0,
    top: 24,
    right: 0,
    bottom: 0,
    borderWidth: 1,
    borderColor: '#dcdcd5',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    // width: 500,
    // minWidth: 500,
    // minHeight: 400,
    flex: 1,
  },
  brWithButtons: {
    bottom: 40,
    borderBottomColor: 'white',
  },
  brDialogButtons: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: '#dcdcd5',
    borderTopColor: 'white',
    backgroundColor: 'white',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  brDialogButtonWrapper: {
    marginHorizontal: 4,
  },
  brDialogButton: {
    height: 30,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#dcdcd5',
    backgroundColor: '#f8f8f6',
    borderRadius: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brDialogButtonText: {
    color: '#888169',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  brDialogButtonTextActive: {
    color: '#685947',
  },
  brDialogButtonActive: {
    backgroundColor: '#ccccc2',
  },
})
var _default = (exports.default = DialogApp)
