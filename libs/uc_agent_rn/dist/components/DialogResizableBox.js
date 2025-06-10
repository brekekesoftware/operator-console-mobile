'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.images = exports.default = void 0
var _react = _interopRequireDefault(require('react'))
var _strings = require('../utilities/strings')
var _reactNative = require('react-native')
var _reactNativeSvg = _interopRequireWildcard(require('react-native-svg'))
var _jsxRuntime = require('react/jsx-runtime')
function _interopRequireWildcard(e, t) {
  if ('function' == typeof WeakMap)
    var r = new WeakMap(),
      n = new WeakMap()
  return (_interopRequireWildcard = function _interopRequireWildcard(e, t) {
    if (!t && e && e.__esModule) return e
    var o,
      i,
      f = { __proto__: null, default: e }
    if (null === e || ('object' != _typeof(e) && 'function' != typeof e))
      return f
    if ((o = t ? n : r)) {
      if (o.has(e)) return o.get(e)
      o.set(e, f)
    }
    for (var _t in e)
      'default' !== _t &&
        {}.hasOwnProperty.call(e, _t) &&
        ((i =
          (o = Object.defineProperty) &&
          Object.getOwnPropertyDescriptor(e, _t)) &&
        (i.get || i.set)
          ? o(f, _t, i)
          : (f[_t] = e[_t]))
    return f
  })(e, t)
}
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
 * DialogResizableBox
 * props.style - replaces className
 * props.disabled
 * props.initialLeft
 * props.initialTop
 * props.initialWidth
 * props.initialHeight
 * props.resizableOpts
 * props.movable
 * props.draggableOptsToMove
 * props.modal
 * props.onStart
 * props.onStop
 */
var _default = (exports.default = /*#__PURE__*/ (function (_React$Component) {
  function _default(props) {
    var _this
    _classCallCheck(this, _default)
    _this = _callSuper(this, _default, [props])
    _defineProperty(_this, 'holdTimeout', null)
    _defineProperty(_this, 'handleResizeStart', function () {
      if (typeof _this.props.onStart === 'function') {
        _this.props.onStart(_this.state.currentRect)
      }
    })
    _defineProperty(_this, 'handleResizeStop', function (ev, data) {
      var _data$size$width, _data$size, _data$size$height, _data$size2
      var newRect = _objectSpread(
        _objectSpread({}, _this.state.currentRect),
        {},
        {
          width:
            (_data$size$width =
              data === null ||
              data === void 0 ||
              (_data$size = data.size) === null ||
              _data$size === void 0
                ? void 0
                : _data$size.width) !== null && _data$size$width !== void 0
              ? _data$size$width
              : _this.state.currentRect.width,
          height:
            (_data$size$height =
              data === null ||
              data === void 0 ||
              (_data$size2 = data.size) === null ||
              _data$size2 === void 0
                ? void 0
                : _data$size2.height) !== null && _data$size$height !== void 0
              ? _data$size$height
              : _this.state.currentRect.height,
        },
      )
      _this.setState({
        currentRect: newRect,
      })
      if (typeof _this.props.onStop === 'function') {
        _this.props.onStop(newRect)
      }
    })
    _defineProperty(_this, 'handleStartDraggable', function () {
      if (typeof _this.props.onStart === 'function') {
        _this.props.onStart(_this.state.currentRect)
      }
    })
    _defineProperty(_this, 'handleStopDraggable', function (ev, data) {
      var newRect = _objectSpread(
        _objectSpread({}, _this.state.currentRect),
        {},
        {
          left:
            data !== null && data !== void 0 && data.x
              ? (0, _strings.int)(_this.props.initialLeft) + data.x
              : _this.state.currentRect.left,
          top:
            data !== null && data !== void 0 && data.y
              ? (0, _strings.int)(_this.props.initialTop) + data.y
              : _this.state.currentRect.top,
        },
      )
      _this.setState({
        currentRect: newRect,
      })
      if (typeof _this.props.onStop === 'function') {
        _this.props.onStop(newRect)
      }
    })
    var _Dimensions$get = _reactNative.Dimensions.get('window'),
      screenWidth = _Dimensions$get.width,
      screenHeight = _Dimensions$get.height
    _this.state = {
      pan: new _reactNative.Animated.ValueXY(),
      size: new _reactNative.Animated.ValueXY({
        x: (0, _strings.int)(props.initialWidth),
        y: (0, _strings.int)(props.initialHeight),
      }),
      currentRect: {
        left: (0, _strings.int)(props.initialLeft),
        top: (0, _strings.int)(props.initialTop),
        width: (0, _strings.int)(props.initialWidth),
        height: (0, _strings.int)(props.initialHeight),
      },
      isResizing: false,
      isDragging: false,
      screenWidth: screenWidth,
      screenHeight: screenHeight,
      canDrag: false,
    }
    _this.setupPanResponders()
    return _this
  }
  _inherits(_default, _React$Component)
  return _createClass(_default, [
    {
      key: 'setupPanResponders',
      value: function setupPanResponders() {
        var _this2 = this
        // Pan responder for moving
        this.movePanResponder = _reactNative.PanResponder.create({
          onMoveShouldSetPanResponder: function onMoveShouldSetPanResponder() {
            return _this2.props.movable && !_this2.props.disabled
          },
          onPanResponderGrant: function onPanResponderGrant() {
            _this2.state.pan.setOffset({
              x: _this2.state.pan.x._value,
              y: _this2.state.pan.y._value,
            })
            _this2.state.pan.setValue({
              x: 0,
              y: 0,
            })
            _this2.setState({
              isDragging: true,
            })
            _this2.handleStartDraggable()
          },
          onPanResponderMove: function onPanResponderMove(e, gesture) {
            _reactNative.Animated.event(
              [
                null,
                {
                  dx: _this2.state.pan.x,
                  dy: _this2.state.pan.y,
                },
              ],
              {
                useNativeDriver: false,
              },
            )(e, gesture)
          },
          onPanResponderRelease: function onPanResponderRelease(e, gesture) {
            _this2.state.pan.flattenOffset()
            _this2.setState({
              isDragging: false,
            })
            _this2.handleStopDraggable(e, {
              x: gesture.dx,
              y: gesture.dy,
            })
          },
          onPanResponderTerminate: function onPanResponderTerminate(
            e,
            gesture,
          ) {
            _this2.state.pan.flattenOffset()
            _this2.setState({
              isDragging: false,
            })
            _this2.handleStopDraggable(e, {
              x: gesture.dx,
              y: gesture.dy,
            })
          },
        })

        // Pan responder for resizing
        this.resizePanResponder = _reactNative.PanResponder.create({
          onStartShouldSetPanResponder:
            function onStartShouldSetPanResponder() {
              return false
            },
          onMoveShouldSetPanResponder: function onMoveShouldSetPanResponder(
            evt,
            gestureState,
          ) {
            return !_this2.props.disabled
          },
          onPanResponderGrant: function onPanResponderGrant() {
            _this2.setState({
              isResizing: true,
            })
            _this2.handleResizeStart()
          },
          onPanResponderMove: function onPanResponderMove(e, gesture) {
            var _resizableOpts$minCon,
              _resizableOpts$minCon2,
              _resizableOpts$minCon3,
              _resizableOpts$minCon4,
              _resizableOpts$maxCon,
              _resizableOpts$maxCon2,
              _resizableOpts$maxCon3,
              _resizableOpts$maxCon4
            var resizableOpts = _this2.props.resizableOpts
            var _this2$state = _this2.state,
              screenWidth = _this2$state.screenWidth,
              screenHeight = _this2$state.screenHeight
            var newWidth = _this2.state.currentRect.width + gesture.dx
            var newHeight = _this2.state.currentRect.height + gesture.dy
            var minWidth =
              (_resizableOpts$minCon =
                resizableOpts === null ||
                resizableOpts === void 0 ||
                (_resizableOpts$minCon2 = resizableOpts.minConstraints) ===
                  null ||
                _resizableOpts$minCon2 === void 0
                  ? void 0
                  : _resizableOpts$minCon2[0]) !== null &&
              _resizableOpts$minCon !== void 0
                ? _resizableOpts$minCon
                : 200
            var minHeight =
              (_resizableOpts$minCon3 =
                resizableOpts === null ||
                resizableOpts === void 0 ||
                (_resizableOpts$minCon4 = resizableOpts.minConstraints) ===
                  null ||
                _resizableOpts$minCon4 === void 0
                  ? void 0
                  : _resizableOpts$minCon4[1]) !== null &&
              _resizableOpts$minCon3 !== void 0
                ? _resizableOpts$minCon3
                : 200
            var maxWidth = Math.min(
              screenWidth - _this2.state.currentRect.left - 20,
              (_resizableOpts$maxCon =
                resizableOpts === null ||
                resizableOpts === void 0 ||
                (_resizableOpts$maxCon2 = resizableOpts.maxConstraints) ===
                  null ||
                _resizableOpts$maxCon2 === void 0
                  ? void 0
                  : _resizableOpts$maxCon2[0]) !== null &&
                _resizableOpts$maxCon !== void 0
                ? _resizableOpts$maxCon
                : screenWidth,
            )
            var maxHeight = Math.min(
              screenHeight - _this2.state.currentRect.top - 20,
              (_resizableOpts$maxCon3 =
                resizableOpts === null ||
                resizableOpts === void 0 ||
                (_resizableOpts$maxCon4 = resizableOpts.maxConstraints) ===
                  null ||
                _resizableOpts$maxCon4 === void 0
                  ? void 0
                  : _resizableOpts$maxCon4[1]) !== null &&
                _resizableOpts$maxCon3 !== void 0
                ? _resizableOpts$maxCon3
                : screenHeight,
            )
            var width = Math.max(minWidth, Math.min(newWidth, maxWidth))
            var height = Math.max(minHeight, Math.min(newHeight, maxHeight))
            _this2.state.size.setValue({
              x: width,
              y: height,
            })
          },
          onPanResponderRelease: function onPanResponderRelease(e, gesture) {
            _this2.setState({
              isResizing: false,
            })
            _this2.handleResizeStop(e, {
              size: {
                width: _this2.state.size.x._value,
                height: _this2.state.size.y._value,
              },
            })
          },
          onPanResponderTerminate: function onPanResponderTerminate(
            e,
            gesture,
          ) {
            _this2.setState({
              isResizing: false,
            })
            _this2.handleResizeStop(e, {
              size: {
                width: _this2.state.size.x._value,
                height: _this2.state.size.y._value,
              },
            })
          },
        })
      },
    },
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        if (
          prevProps.initialWidth !== this.props.initialWidth ||
          prevProps.initialHeight !== this.props.initialHeight
        ) {
          this.setState({
            size: new _reactNative.Animated.ValueXY({
              x: (0, _strings.int)(this.props.initialWidth),
              y: (0, _strings.int)(this.props.initialHeight),
            }),
            currentRect: {
              left: (0, _strings.int)(this.props.initialLeft),
              top: (0, _strings.int)(this.props.initialTop),
              width: (0, _strings.int)(this.props.initialWidth),
              height: (0, _strings.int)(this.props.initialHeight),
            },
          })
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        var props = this.props
        var _this$state = this.state,
          pan = _this$state.pan,
          size = _this$state.size
        var contents = /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
          _reactNative.Animated.View,
          {
            style: [
              styles.brDialogResizableBoxResizable,
              props.disabled && styles.brDisabled,
              {
                width: size.x,
                height: size.y,
              },
            ],
            children: [
              props.children,
              !props.disabled &&
                /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
                  children: [
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                      _reactNative.View,
                      _objectSpread(
                        _objectSpread(
                          {
                            style: styles.resizeHandle,
                          },
                          this.resizePanResponder.panHandlers,
                        ),
                        {},
                        {
                          children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _reactNative.Image,
                            {
                              source: images.resize,
                              style: styles.resizeHandleImage,
                            },
                          ),
                        },
                      ),
                    ),
                    props.movable &&
                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                        _reactNative.View,
                        _objectSpread(
                          _objectSpread(
                            {
                              style: styles.dragHandle,
                            },
                            this.movePanResponder.panHandlers,
                          ),
                          {},
                          {
                            children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              DragIcon,
                              {},
                            ),
                          },
                        ),
                      ),
                  ],
                }),
            ],
          },
        )
        if (props.movable) {
          contents = /*#__PURE__*/ (0, _jsxRuntime.jsx)(
            _reactNative.Animated.View,
            {
              style: [
                styles.brDialogResizableBoxMovable,
                {
                  transform: pan.getTranslateTransform(),
                  left: (0, _strings.int)(props.initialLeft),
                  top: (0, _strings.int)(props.initialTop),
                },
              ],
              children: contents,
            },
          )
        }
        if (props.modal) {
          contents = /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
            style: styles.brDialogResizableBoxModal,
            children: contents,
          })
        }
        return /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
          style: [styles.container, props.style],
          children: contents,
        })
      },
    },
  ])
})(_react.default.Component))
var DragIcon = function DragIcon() {
  return /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
    children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNativeSvg.default, {
      height: 24,
      viewBox: '0 0 24 24',
      width: 24,
      children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNativeSvg.Path, {
        d: 'M22.67,12L18.18,16.5L15.67,14L17.65,12L15.67,10.04L18.18,7.53L22.67,12M12,1.33L16.47,5.82L13.96,8.33L12,6.35L10,8.33L7.5,5.82L12,1.33M12,22.67L7.53,18.18L10.04,15.67L12,17.65L14,15.67L16.5,18.18L12,22.67M1.33,12L5.82,7.5L8.33,10L6.35,12L8.33,13.96L5.82,16.47L1.33,12M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10Z',
        fill: '#b6b6b6',
      }),
    }),
  })
}
var styles = _reactNative.StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#ffffff',
  },
  brDialogResizableBoxResizable: {
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flex: 1,
  },
  brDisabled: {
    opacity: 0.5,
  },
  brDialogResizableBoxMovable: {
    position: 'absolute',
    minWidth: 500,
    minHeight: 400,
    flex: 1,
  },
  brDialogResizableBoxModal: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resizeHandle: {
    position: 'absolute',
    width: 24,
    height: 24,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  resizeHandleImage: {
    width: 13,
    height: 13,
    resizeMode: 'contain',
    opacity: 0.7,
  },
  resizeHandleHidden: {
    display: 'none',
  },
  dragHandle: {
    position: 'absolute',
    width: 20,
    height: 20,
    top: 0,
    left: -20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  dragHandleImage: {
    width: 13,
    height: 13,
    resizeMode: 'contain',
    opacity: 0.7,
  },
})
var images = (exports.images = {
  resize: require('../images/resize.png'),
})
