'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _react = _interopRequireDefault(require('react'))
var _reactNative = require('react-native')
var _SearchConditionsArea = _interopRequireDefault(
  require('./SearchConditionsArea'),
)
var _SearchResultsArea = _interopRequireDefault(require('./SearchResultsArea'))
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
function _extends() {
  return (
    (_extends = Object.assign
      ? Object.assign.bind()
      : function (n) {
          for (var e = 1; e < arguments.length; e++) {
            var t = arguments[e]
            for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r])
          }
          return n
        }),
    _extends.apply(null, arguments)
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
 * HistorySearchPanel
 * props.uiData
 * props.uiData.splitterTop_onChange
 * props.panelType
 * props.panelCode
 * props.panelOption
 * props.selectable
 * props.allSelectable
 * props.checkBox
 * props.emphasize
 */
var HistorySearchPanel = (exports.default = /*#__PURE__*/ (function (
  _React$Component,
) {
  function HistorySearchPanel(props) {
    var _this
    _classCallCheck(this, HistorySearchPanel)
    _this = _callSuper(this, HistorySearchPanel, [props])
    _defineProperty(_this, 'onLayout', function (event) {
      var height = event.nativeEvent.layout.height
      _this.setState({
        panelHeight: height,
      })
    })
    _this.state = {
      splitterTop: 0,
      panelHeight: 0,
      isDragging: false,
    }
    _this.upperPanelRef = /*#__PURE__*/ _react.default.createRef()
    _this.panResponder = _reactNative.PanResponder.create({
      onStartShouldSetPanResponder: function onStartShouldSetPanResponder() {
        return true
      },
      onStartShouldSetPanResponderCapture:
        function onStartShouldSetPanResponderCapture() {
          return false
        },
      onMoveShouldSetPanResponder: function onMoveShouldSetPanResponder(
        evt,
        gestureState,
      ) {
        return true
      },
      onMoveShouldSetPanResponderCapture:
        function onMoveShouldSetPanResponderCapture() {
          return false
        },
      onPanResponderGrant: function onPanResponderGrant() {
        _this.setState({
          isDragging: true,
        })
      },
      onPanResponderMove: function onPanResponderMove(evt, gestureState) {
        evt.stopPropagation()
        var dampingFactor = 0.3
        var newTop = Math.max(
          0,
          Math.min(
            _this.state.splitterTop + gestureState.dy * dampingFactor,
            _this.state.panelHeight * 0.9,
          ),
        )
        _this.setState({
          splitterTop: newTop,
        })
        _this.props.uiData.fire(
          'splitterTop_onChange',
          _this.props.panelType,
          _this.props.panelCode,
          newTop,
        )
      },
      onPanResponderRelease: function onPanResponderRelease() {
        _this.setState({
          isDragging: false,
        })
      },
      onPanResponderTerminate: function onPanResponderTerminate() {
        _this.setState({
          isDragging: false,
        })
      },
      onShouldBlockNativeResponder: function onShouldBlockNativeResponder() {
        return false
      },
      onResponderTerminationRequest: function onResponderTerminationRequest() {
        return false
      },
    })
    return _this
  }
  _inherits(HistorySearchPanel, _React$Component)
  return _createClass(HistorySearchPanel, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {},
    },
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.panelHeight !== this.state.panelHeight) {
          var panelHeight = this.state.panelHeight
          var maxInitialTop = (panelHeight * 7) / 10
          var initialTop = maxInitialTop
          if (
            this.props.panelOption &&
            typeof this.props.panelOption.initialSplitterTop === 'number'
          ) {
            initialTop = Math.min(
              this.props.panelOption.initialSplitterTop,
              maxInitialTop,
            )
          } else {
            this.upperPanelRef.current.measure(
              function (x, y, width, height, pageX, pageY) {
                console.log('#Duy Phan console height', height)
                initialTop = Math.min(height + 4, maxInitialTop)
              },
            )
          }
          console.log('#Duy Phan console initialTop', initialTop)
          this.setState({
            splitterTop: initialTop,
            // panelHeight: panelHeight,
          })
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        var props = this.props
        var _this$state = this.state,
          splitterTop = _this$state.splitterTop,
          isDragging = _this$state.isDragging
        return /*#__PURE__*/ _react.default.createElement(
          _reactNative.View,
          {
            style: styles.brHistorySearchPanel,
            onLayout: this.onLayout,
          },
          /*#__PURE__*/ _react.default.createElement(
            _reactNative.View,
            {
              style: [
                styles.brHistorySearchPanelUpper,
                {
                  height: splitterTop,
                },
              ],
              ref: this.upperPanelRef,
            },
            /*#__PURE__*/ _react.default.createElement(
              _SearchConditionsArea.default,
              {
                uiData: props.uiData,
                panelType: props.panelType,
                panelCode: props.panelCode,
              },
            ),
          ),
          /*#__PURE__*/ _react.default.createElement(
            _reactNative.View,
            _extends({}, this.panResponder.panHandlers, {
              style: [
                styles.brHistorySearchPanelSplitter,
                isDragging && styles.brHistorySearchPanelSplitterActive,
                {
                  top: splitterTop,
                },
              ],
              onStartShouldSetResponder: function onStartShouldSetResponder() {
                return true
              },
              onResponderTerminationRequest:
                function onResponderTerminationRequest() {
                  return false
                },
            }),
            /*#__PURE__*/ _react.default.createElement(_reactNative.View, {
              style: [
                styles.brHistorySearchPanelSplitterThumb,
                isDragging && styles.brHistorySearchPanelSplitterThumbActive,
              ],
            }),
          ),
          /*#__PURE__*/ _react.default.createElement(
            _reactNative.View,
            {
              style: [
                styles.brHistorySearchPanelLower,
                {
                  top: splitterTop + 10,
                },
              ],
            },
            /*#__PURE__*/ _react.default.createElement(
              _SearchResultsArea.default,
              {
                uiData: props.uiData,
                panelType: props.panelType,
                panelCode: props.panelCode,
                selectable: Boolean(props.selectable),
                allSelectable: Boolean(props.allSelectable),
                checkBox: Boolean(props.checkBox),
                emphasize: Boolean(props.emphasize),
              },
            ),
          ),
        )
      },
    },
  ])
})(_react.default.Component))
var styles = _reactNative.StyleSheet.create({
  brHistorySearchPanel: {
    // position: 'absolute',
    // left: 8,
    // top: 8,
    // right: 8,
    // bottom: 8,
    backgroundColor: '#ffffff',
    // width: '100%',
    // height: '100%',
    // width: 500,
    // height: 400,
    flex: 1,
  },
  brHistorySearchPanelUpper: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    backgroundColor: '#ffffff',
    zIndex: 1,
  },
  brHistorySearchPanelLower: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ffffff',
    zIndex: 1,
  },
  brHistorySearchPanelSplitter: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 10,
    backgroundColor: '#ffffff',
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#dcdcd5',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  brHistorySearchPanelSplitterActive: {
    backgroundColor: '#dcdcd5',
    shadowColor: '#ffffff',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 3,
  },
  brHistorySearchPanelSplitterThumb: {
    position: 'absolute',
    left: '49%',
    width: 19,
    height: 1,
    top: 5,
    backgroundColor: '#dcdcd5',
  },
  brHistorySearchPanelSplitterThumbActive: {
    backgroundColor: '#ffffff',
  },
})
