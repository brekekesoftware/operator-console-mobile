'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _react = _interopRequireDefault(require('react'))
var _reactNative = require('react-native')
var _uawmsgs = _interopRequireDefault(require('../utilities/uawmsgs'))
var _constants = _interopRequireDefault(require('../utilities/constants'))
var _WebchatQueueTable = _interopRequireDefault(require('./WebchatQueueTable'))
var _ToolbarButton = _interopRequireDefault(require('./ToolbarButton'))
var _BalloonDialog = _interopRequireDefault(require('./BalloonDialog'))
var _DialogResizableBox = _interopRequireDefault(
  require('./DialogResizableBox'),
)
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
}
var colors = {
  mantis: '#74C365', // Color for link
}
var styles = _reactNative.StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1,
  },
  icon: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },
  iconOverlay: {
    position: 'absolute',
    right: 2,
    bottom: 2,
    width: 16,
    height: 16,
    zIndex: 1,
  },
  progressOverlay: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 20,
    height: 20,
    zIndex: 1,
  },
  resizableBox: {
    paddingBottom: 17,
  },
  resizableHandle: {
    bottom: -2,
    right: -2,
  },
  webchatQueueInBalloon: {
    width: '100%',
    height: '100%',
    // ScrollView will handle overflow
  },
  showAllLink: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    fontSize: 13,
    fontWeight: '400',
    letterSpacing: 0.3,
    color: colors.mantis,
  },
  overlayImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
})

/**
 * WebchatQueueButton
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.configurations
 * props.uiData.showingDialogVersion
 * props.uiData.dialogSizeTable
 * props.uiData.showingDialog_update
 * props.uiData.webchatQueueButton_onClick
 * props.uiData.webchatQueueShowAllLink_onClick
 * props.uiData.webchatQueueResizableBox_onResizeStop
 * props.disabled
 */
var _default = (exports.default = /*#__PURE__*/ (function (_React$Component) {
  function _default(_props) {
    var _this
    _classCallCheck(this, _default)
    _this = _callSuper(this, _default, [_props])
    _defineProperty(_this, 'handleWebchatQueueButtonPress', function () {
      var _this2 = _this,
        props = _this2.props
      if (
        props.uiData.showingDialogVersion !== _this.state.showingDialogVersion
      ) {
        _this.setState({
          showingDialogVersion: ++props.uiData.showingDialogVersion,
        })
        props.uiData.fire('showingDialog_update')
        props.uiData.fire('webchatQueueButton_onClick', {
          visible: true,
        })
      } else {
        props.uiData.fire('webchatQueueButton_onClick', {
          visible: false,
        })
        props.uiData.window_onclick()
      }
    })
    _defineProperty(_this, 'getIconSource', function (iconClass) {
      switch (iconClass) {
        case 'brIconWebchatQueueWarning':
          return require('../images/webchatqueue_warning.gif')
        case 'brIconWebchatQueueAlert':
          return require('../images/webchatqueue_alert.gif')
        case 'brIconWebchatQueueStarting':
        case 'brIconWebchatQueueOffline':
        default:
          return require('../images/webchatqueue.png')
      }
    })
    _this.state = {
      showingDialogVersion: null,
    }
    return _this
  }
  _inherits(_default, _React$Component)
  return _createClass(_default, [
    {
      key: 'render',
      value: function render() {
        var props = this.props
        var waitingCount = props.uiData.ucUiStore
          .getWebchatQueueList()
          .filter(function (webchatQueue) {
            var conf_id = webchatQueue.conf_id
            var conference = props.uiData.ucUiStore
              .getChatClient()
              .getConference(conf_id)
            return (
              conference.conf_status ===
              _constants.default.CONF_STATUS_INVITED_WEBCHAT
            )
          }).length
        var signInStatus = props.uiData.ucUiStore.getSignInStatus()
        var lastSignOutReason = props.uiData.ucUiStore.getLastSignOutReason()
        var iconClass =
          signInStatus <= 1
            ? 'brIconWebchatQueueOffline'
            : signInStatus === 2
              ? 'brIconWebchatQueueStarting'
              : waitingCount >= 2
                ? 'brIconWebchatQueueAlert'
                : waitingCount >= 1
                  ? 'brIconWebchatQueueWarning'
                  : 'brIconWebchatQueue'
        var title =
          signInStatus === 2
            ? _uawmsgs.default.LBL_WEBCHAT_QUEUE_BUTON_STARTING_TOOLTIP
            : signInStatus <= 1 && lastSignOutReason.message
              ? lastSignOutReason.message + '(' + lastSignOutReason.code + ')'
              : signInStatus <= 1
                ? _uawmsgs.default.LBL_WEBCHAT_QUEUE_BUTON_OFFLINE_TOOLTIP
                : _uawmsgs.default.LBL_WEBCHAT_QUEUE_BUTON_TOOLTIP
        if (!props.uiData.dialogSizeTable['webchatqueue']) {
          props.uiData.dialogSizeTable['webchatqueue'] = {
            width: 270,
            height: 90,
          }
        }
        console.log(
          '#Duy Phan console this.state.showingDialogVersion',
          this.state.showingDialogVersion,
          props.uiData.showingDialogVersion,
        )
        return /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.container,
          children: [
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(_BalloonDialog.default, {
              shows:
                props.uiData.showingDialogVersion ===
                this.state.showingDialogVersion,
              indicator: true,
              anchor: 'left',
              children: /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                _DialogResizableBox.default,
                {
                  style: styles.resizableBox,
                  initialWidth:
                    props.uiData.dialogSizeTable['webchatqueue'].width,
                  initialHeight:
                    props.uiData.dialogSizeTable['webchatqueue'].height,
                  resizableOpts: {
                    minConstraints: [200, 50],
                    maxConstraints: [600, 600],
                  },
                  ownerDocument: props.uiData.ownerDocument,
                  onStop: props.uiData.fire.bind(
                    props.uiData,
                    'webchatQueueResizableBox_onResizeStop',
                  ),
                  children: [
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                      style: styles.webchatQueueInBalloon,
                      children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                        _WebchatQueueTable.default,
                        {
                          uiData: props.uiData,
                          filter: props.uiData.configurations.queuePanel
                            ? 'INVITED_WEBCHAT'
                            : null,
                          resizerName: 'webchatQueueInBalloon',
                        },
                      ),
                    }),
                    props.uiData.configurations.queuePanel &&
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                        _reactNative.TouchableOpacity,
                        {
                          style: styles.showAllLink,
                          onPress: function onPress() {
                            return props.uiData.fire(
                              'webchatQueueShowAllLink_onClick',
                            )
                          },
                          children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _reactNative.Text,
                            {
                              children:
                                _uawmsgs.default
                                  .LBL_WEBCHAT_QUEUE_SHOW_ALL_LINK,
                            },
                          ),
                        },
                      ),
                  ],
                },
              ),
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
              children: [
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(_ToolbarButton.default, {
                  iconSource: this.getIconSource(iconClass),
                  title: title,
                  disabled: props.disabled,
                  dropDown: true,
                  onPress: this.handleWebchatQueueButtonPress,
                }),
                iconClass === 'brIconWebchatQueueStarting' &&
                  /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                    style: styles.progressOverlay,
                    children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                      _reactNative.Image,
                      {
                        style: styles.overlayImage,
                        source: require('../images/progress.gif'),
                      },
                    ),
                  }),
                iconClass === 'brIconWebchatQueueOffline' &&
                  /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                    style: styles.iconOverlay,
                    children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                      _reactNative.Image,
                      {
                        style: styles.overlayImage,
                        source: require('../images/delete.png'),
                      },
                    ),
                  }),
              ],
            }),
          ],
        })
      },
    },
  ])
})(_react.default.Component))
