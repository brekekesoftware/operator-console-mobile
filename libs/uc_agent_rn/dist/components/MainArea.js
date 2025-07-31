'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _react = _interopRequireDefault(require('react'))
var _reactNative = require('react-native')
var _MainTabs = _interopRequireDefault(require('./MainTabs'))
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
} /**
 * MainArea - React Native version
 * A component that manages a resizable tabbed area with splitters
 *
 * props.uiData - UI data object
 * props.uiData.mainAreaSplitters - Number of splitters (0, 1, or 2)
 * props.style - Additional style
 */
var MainArea = (exports.default = /*#__PURE__*/ (function (_React$Component) {
  function MainArea(props) {
    var _this
    _classCallCheck(this, MainArea)
    _this = _callSuper(this, MainArea, [props])
    _defineProperty(_this, 'onLayout', function (event) {
      var _event$nativeEvent$la = event.nativeEvent.layout,
        width = _event$nativeEvent$la.width,
        height = _event$nativeEvent$la.height
      console.log('#Duy Phan console width', width, height)
      if (
        _this.state.mainAreaWidth !== width ||
        _this.state.mainAreaHeight !== height
      ) {
        _this.setState({
          mainAreaWidth: width,
          mainAreaHeight: height,
        })
      }
    })
    _this.state = {
      splitterRight: 0,
      splitterBottom: 0,
      mainAreaWidth: 0,
      mainAreaHeight: 0,
      isOverDrop: false,
      canDrop: false,
    }
    _this.rightSplitterPosition = new _reactNative.Animated.ValueXY({
      x: 0,
      y: 0,
    })
    _this.bottomSplitterPosition = new _reactNative.Animated.ValueXY({
      x: 0,
      y: 0,
    })
    _this.rightSplitterPanResponder = _reactNative.PanResponder.create({
      onStartShouldSetPanResponder: function onStartShouldSetPanResponder() {
        return true
      },
      onStartShouldSetPanResponderCapture:
        function onStartShouldSetPanResponderCapture() {
          return true
        },
      onMoveShouldSetPanResponder: function onMoveShouldSetPanResponder() {
        return true
      },
      onMoveShouldSetPanResponderCapture:
        function onMoveShouldSetPanResponderCapture() {
          return true
        },
      onPanResponderGrant: function onPanResponderGrant(evt, gestureState) {
        _this.rightSplitterPosition.setOffset({
          x: _this.rightSplitterPosition.x._value,
          y: 0,
        })
        _this.rightSplitterPosition.setValue({
          x: 0,
          y: 0,
        })
      },
      onPanResponderMove: function onPanResponderMove(evt, gestureState) {
        _this.rightSplitterPosition.setValue({
          x: gestureState.dx,
          y: 0,
        })
        var newSplitterRight = _this.state.splitterRight - gestureState.dx
        if (newSplitterRight >= 0) {
          _this.setState({
            splitterRight: newSplitterRight,
          })
        }
      },
      onPanResponderRelease: function onPanResponderRelease(evt, gestureState) {
        _this.rightSplitterPosition.flattenOffset()
        _this.checkAndUpdateSplitterBounds()
      },
    })
    _this.bottomSplitterPanResponder = _reactNative.PanResponder.create({
      onStartShouldSetPanResponder: function onStartShouldSetPanResponder() {
        return true
      },
      onStartShouldSetPanResponderCapture:
        function onStartShouldSetPanResponderCapture() {
          return true
        },
      onMoveShouldSetPanResponder: function onMoveShouldSetPanResponder() {
        return true
      },
      onMoveShouldSetPanResponderCapture:
        function onMoveShouldSetPanResponderCapture() {
          return true
        },
      onPanResponderGrant: function onPanResponderGrant(evt, gestureState) {
        _this.bottomSplitterPosition.setOffset({
          x: 0,
          y: _this.bottomSplitterPosition.y._value,
        })
        _this.bottomSplitterPosition.setValue({
          x: 0,
          y: 0,
        })
      },
      onPanResponderMove: function onPanResponderMove(evt, gestureState) {
        _this.bottomSplitterPosition.setValue({
          x: 0,
          y: gestureState.dy,
        })
        var newSplitterBottom = _this.state.splitterBottom - gestureState.dy
        if (newSplitterBottom >= 0) {
          _this.setState({
            splitterBottom: newSplitterBottom,
          })
        }
      },
      onPanResponderRelease: function onPanResponderRelease(evt, gestureState) {
        _this.bottomSplitterPosition.flattenOffset()
        _this.checkAndUpdateSplitterBounds()
      },
    })
    return _this
  }
  _inherits(MainArea, _React$Component)
  return _createClass(MainArea, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.checkAndUpdateSplitterBounds()
      },
    },
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps, prevState) {
        if (
          prevProps.uiData.mainAreaSplitters !==
            this.props.uiData.mainAreaSplitters ||
          prevState.mainAreaWidth !== this.state.mainAreaWidth ||
          prevState.mainAreaHeight !== this.state.mainAreaHeight
        ) {
          this.checkAndUpdateSplitterBounds()
        }
      },
    },
    {
      key: 'checkAndUpdateSplitterBounds',
      value: function checkAndUpdateSplitterBounds() {
        var _this$state = this.state,
          mainAreaWidth = _this$state.mainAreaWidth,
          mainAreaHeight = _this$state.mainAreaHeight,
          splitterRight = _this$state.splitterRight,
          splitterBottom = _this$state.splitterBottom
        var uiData = this.props.uiData
        var newState = {}
        if (mainAreaWidth > 0 && mainAreaHeight > 0) {
          if (
            uiData.mainAreaSplitters === 1 ||
            uiData.mainAreaSplitters === 2
          ) {
            var minWidth = 240
            var minRight = Math.min(minWidth, mainAreaWidth / 2)
            var maxRight = mainAreaWidth - minRight
            if (splitterRight < minRight) {
              newState.splitterRight = minRight
            } else if (maxRight < splitterRight) {
              newState.splitterRight = maxRight
            }
          }
          if (uiData.mainAreaSplitters === 2) {
            var minHeight = 240
            var minBottom = Math.min(minHeight, mainAreaHeight / 2)
            var maxBottom = mainAreaHeight - minBottom
            if (splitterBottom < minBottom) {
              newState.splitterBottom = minBottom
            } else if (maxBottom < splitterBottom) {
              newState.splitterBottom = maxBottom
            }
          }
        }
        if (Object.keys(newState).length > 0) {
          console.log('#Duy Phan console newState spliter', newState)
          this.setState(newState)
        }
      },
    },
    {
      key: 'renderWithTwoSplitters',
      value: function renderWithTwoSplitters() {
        var props = this.props
        var _this$state2 = this.state,
          splitterRight = _this$state2.splitterRight,
          splitterBottom = _this$state2.splitterBottom,
          isOverDrop = _this$state2.isOverDrop,
          canDrop = _this$state2.canDrop
        console.log('#Duy Phan console split', splitterRight, splitterBottom)
        return /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: [
            styles.mainArea,
            styles.splitters2,
            isOverDrop && canDrop && styles.isOverCanDrop,
            props.style,
          ],
          onLayout: this.onLayout,
          children: [
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
              style: [
                styles.mainTabsArea,
                {
                  position: 'absolute',
                  right: 0,
                  bottom: 0,
                  height: splitterBottom + 1,
                  width: splitterRight + 1,
                },
              ],
              children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(_MainTabs.default, {
                uiData: props.uiData,
                position: 'se',
              }),
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
              style: [
                styles.mainTabsArea,
                {
                  position: 'absolute',
                  left: 0,
                  bottom: 0,
                  height: splitterBottom + 1,
                  right: splitterRight,
                },
              ],
              children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(_MainTabs.default, {
                uiData: props.uiData,
                position: 'south',
              }),
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
              style: [
                styles.mainTabsArea,
                {
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  bottom: splitterBottom,
                  width: splitterRight + 1,
                },
              ],
              children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(_MainTabs.default, {
                uiData: props.uiData,
                position: 'east',
              }),
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
              style: [
                styles.mainTabsArea,
                {
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: splitterBottom,
                  right: splitterRight,
                },
              ],
              children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(_MainTabs.default, {
                uiData: props.uiData,
                position: 'center',
              }),
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
              _reactNative.Animated.View,
              _objectSpread(
                {
                  style: [
                    styles.mainAreaSplitterRight,
                    {
                      right: splitterRight,
                      transform: [
                        {
                          translateX: this.rightSplitterPosition.x,
                        },
                      ],
                    },
                  ],
                },
                this.rightSplitterPanResponder.panHandlers,
              ),
            ),
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
              _reactNative.Animated.View,
              _objectSpread(
                {
                  style: [
                    styles.mainAreaSplitterBottom,
                    {
                      bottom: splitterBottom,
                      transform: [
                        {
                          translateY: this.bottomSplitterPosition.y,
                        },
                      ],
                    },
                  ],
                },
                this.bottomSplitterPanResponder.panHandlers,
              ),
            ),
          ],
        })
      },
    },
    {
      key: 'renderWithOneSplitter',
      value: function renderWithOneSplitter() {
        var props = this.props
        var _this$state3 = this.state,
          splitterRight = _this$state3.splitterRight,
          isOverDrop = _this$state3.isOverDrop,
          canDrop = _this$state3.canDrop
        return /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: [
            styles.mainArea,
            styles.splitters1,
            isOverDrop && canDrop && styles.isOverCanDrop,
            props.style,
          ],
          onLayout: this.onLayout,
          children: [
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
              style: [
                styles.mainTabsArea,
                {
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  bottom: 0,
                  width: splitterRight + 1,
                },
              ],
              children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(_MainTabs.default, {
                uiData: props.uiData,
                position: 'east se',
              }),
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
              style: [
                styles.mainTabsArea,
                {
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  right: splitterRight,
                },
              ],
              children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(_MainTabs.default, {
                uiData: props.uiData,
                position: 'center south',
              }),
            }),
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
              _reactNative.Animated.View,
              _objectSpread(
                {
                  style: [
                    styles.mainAreaSplitterRight,
                    {
                      right: splitterRight,
                      transform: [
                        {
                          translateX: this.rightSplitterPosition.x,
                        },
                      ],
                    },
                  ],
                },
                this.rightSplitterPanResponder.panHandlers,
              ),
            ),
          ],
        })
      },
    },
    {
      key: 'renderWithNoSplitters',
      value: function renderWithNoSplitters() {
        var props = this.props
        var _this$state4 = this.state,
          isOverDrop = _this$state4.isOverDrop,
          canDrop = _this$state4.canDrop
        return /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
          style: [
            styles.mainArea,
            styles.splitters0,
            isOverDrop && canDrop && styles.isOverCanDrop,
            props.style,
          ],
          onLayout: this.onLayout,
          children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
            style: [
              styles.mainTabsArea,
              {
                position: 'absolute',
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
              },
            ],
            pointerEvents: 'box-none',
            onTouchEnd: function onTouchEnd() {
              console.log('#Duy Phan console onTouchEnd2')
            },
            children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(_MainTabs.default, {
              uiData: props.uiData,
              position: 'center east south se',
            }),
          }),
        })
      },
    },
    {
      key: 'render',
      value: function render() {
        var uiData = this.props.uiData
        if (uiData.mainAreaSplitters === 2) {
          return this.renderWithTwoSplitters()
        } else if (uiData.mainAreaSplitters === 1) {
          return this.renderWithOneSplitter()
        } else {
          return this.renderWithNoSplitters()
        }
      },
    },
  ])
})(_react.default.Component))
var colors = {
  mediumTurquoise: '#4BC5DE',
  white: '#FFFFFF',
}
var styles = _reactNative.StyleSheet.create({
  mainArea: {
    position: 'absolute',
    left: 0,
    top: 49,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    // width: 200,
    // height: 200,
    backgroundColor: colors.white,
  },
  splitters0: {},
  splitters1: {},
  splitters2: {},
  isOverCanDrop: {
    borderWidth: 3,
    borderColor: colors.mediumTurquoise,
  },
  mainTabsArea: {
    backgroundColor: colors.white,
  },
  mainAreaSplitterRight: {
    position: 'absolute',
    width: 8,
    top: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 5,
    marginRight: -4,
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
  },
  mainAreaSplitterBottom: {
    position: 'absolute',
    height: 8,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    zIndex: 5,
    marginBottom: -4,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  callArea: {
    zIndex: 1,
  },
  chatArea: {
    zIndex: 0,
  },
  chatAreaWithContractedCallArea: {
    top: 48,
  },
  chatAreaWithExpandedCallArea: {
    top: 48,
  },
  chatAreaWithExpandedVideoLarge: {
    top: '50%',
  },
  chatAreaWithExpandedVideoSmall: {
    top: 144,
  },
  chatAreaWithIncomingProgress: {
    opacity: 0.4,
    left: -4,
    right: -4,
    top: 44,
    bottom: 66,
    padding: 8,
  },
  editorArea: {
    zIndex: 2,
  },
})
