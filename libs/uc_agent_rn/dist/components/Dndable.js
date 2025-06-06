'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = exports.DndableSafe = void 0
var _react = _interopRequireDefault(require('react'))
var _reactNative = require('react-native')
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
function _createForOfIteratorHelper(r, e) {
  var t =
    ('undefined' != typeof Symbol && r[Symbol.iterator]) || r['@@iterator']
  if (!t) {
    if (
      Array.isArray(r) ||
      (t = _unsupportedIterableToArray(r)) ||
      (e && r && 'number' == typeof r.length)
    ) {
      t && (r = t)
      var _n = 0,
        F = function F() {}
      return {
        s: F,
        n: function n() {
          return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }
        },
        e: function e(r) {
          throw r
        },
        f: F,
      }
    }
    throw new TypeError(
      'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
    )
  }
  var o,
    a = !0,
    u = !1
  return {
    s: function s() {
      t = t.call(r)
    },
    n: function n() {
      var r = t.next()
      return (a = r.done), r
    },
    e: function e(r) {
      ;(u = !0), (o = r)
    },
    f: function f() {
      try {
        a || null == t.return || t.return()
      } finally {
        if (u) throw o
      }
    },
  }
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ('string' == typeof r) return _arrayLikeToArray(r, a)
    var t = {}.toString.call(r).slice(8, -1)
    return (
      'Object' === t && r.constructor && (t = r.constructor.name),
      'Map' === t || 'Set' === t
        ? Array.from(r)
        : 'Arguments' === t ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
          ? _arrayLikeToArray(r, a)
          : void 0
    )
  }
}
function _arrayLikeToArray(r, a) {
  ;(null == a || a > r.length) && (a = r.length)
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]
  return n
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
 * Dndable - React Native version
 * A component that supports drag and drop functionality
 *
 * props.style - Additional styles for the component
 * props.dragSourceInfo - Information about the drag source
 * props.onCheckCanDrop - Function to check if dropping is allowed
 * props.onDrop - Function called when item is dropped
 * props.onClick - Function called when item is clicked/pressed
 */
var Dndable = (exports.default = /*#__PURE__*/ (function (_React$Component) {
  function Dndable(props) {
    var _this
    _classCallCheck(this, Dndable)
    _this = _callSuper(this, Dndable, [props])
    _defineProperty(_this, 'handlePress', function () {
      if (_this.props.onClick && !_this.state.isDragging) {
        _this.props.onClick()
      }
    })
    _this.state = {
      isDragging: false,
      isOver: false,
      canDrop: false,
      pan: new _reactNative.Animated.ValueXY(),
      opacity: new _reactNative.Animated.Value(1),
      dropTargets: [],
    }
    if (!global.dropTargets) {
      global.dropTargets = []
    }
    _this.panResponder = _reactNative.PanResponder.create({
      onStartShouldSetPanResponder: function onStartShouldSetPanResponder(
        evt,
        gestureState,
      ) {
        return !!_this.props.dragSourceInfo
      },
      onStartShouldSetPanResponderCapture:
        function onStartShouldSetPanResponderCapture(evt, gestureState) {
          return false
        },
      onMoveShouldSetPanResponder: function onMoveShouldSetPanResponder(
        evt,
        gestureState,
      ) {
        return !!_this.props.dragSourceInfo
      },
      onMoveShouldSetPanResponderCapture:
        function onMoveShouldSetPanResponderCapture(evt, gestureState) {
          return false
        },
      onPanResponderGrant: function onPanResponderGrant(evt, gestureState) {
        _this.state.pan.setOffset({
          x: _this.state.pan.x._value,
          y: _this.state.pan.y._value,
        })
        _this.state.pan.setValue({
          x: 0,
          y: 0,
        })
        _this.setState({
          isDragging: true,
        })
        _reactNative.Animated.timing(_this.state.opacity, {
          toValue: 0.7,
          duration: 100,
          useNativeDriver: true,
        }).start()
      },
      onPanResponderMove: function onPanResponderMove(evt, gestureState) {
        _reactNative.Animated.event(
          [
            null,
            {
              dx: _this.state.pan.x,
              dy: _this.state.pan.y,
            },
          ],
          {
            useNativeDriver: false,
          },
        )(evt, gestureState)
        _this.checkDropTargets(gestureState)
      },
      onPanResponderRelease: function onPanResponderRelease(evt, gestureState) {
        _this.state.pan.flattenOffset()
        _reactNative.Animated.timing(_this.state.opacity, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }).start()
        var dropTarget = _this.findDropTarget(gestureState)
        if (dropTarget && dropTarget.canDrop) {
          if (dropTarget.onDrop) {
            dropTarget.onDrop({
              dragSourceInfo: _this.props.dragSourceInfo,
              didDrop: true,
            })
          }
        }
        _reactNative.Animated.spring(_this.state.pan, {
          toValue: {
            x: 0,
            y: 0,
          },
          friction: 5,
          useNativeDriver: true,
        }).start(function () {
          _this.setState({
            isDragging: false,
            isOver: false,
            canDrop: false,
          })
        })
      },
      onPanResponderTerminate: function onPanResponderTerminate(
        evt,
        gestureState,
      ) {
        _reactNative.Animated.parallel([
          _reactNative.Animated.timing(_this.state.opacity, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
          _reactNative.Animated.spring(_this.state.pan, {
            toValue: {
              x: 0,
              y: 0,
            },
            friction: 5,
            useNativeDriver: true,
          }),
        ]).start(function () {
          _this.setState({
            isDragging: false,
            isOver: false,
            canDrop: false,
          })
        })
      },
    })
    return _this
  }
  _inherits(Dndable, _React$Component)
  return _createClass(Dndable, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        if (this.props.onCheckCanDrop || this.props.onDrop) {
          this.dropTargetId = Date.now() + Math.random()
          global.dropTargets.push({
            id: this.dropTargetId,
            ref: this,
            onCheckCanDrop: this.props.onCheckCanDrop,
            onDrop: this.props.onDrop,
            measure: this.measure.bind(this),
          })
        }
      },
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        var _this2 = this
        if (this.dropTargetId) {
          var index = global.dropTargets.findIndex(function (dt) {
            return dt.id === _this2.dropTargetId
          })
          if (index !== -1) {
            global.dropTargets.splice(index, 1)
          }
        }
      },
    },
    {
      key: 'measure',
      value: function measure(callback) {
        if (this.viewRef) {
          this.viewRef.measure(callback)
        }
      },
    },
    {
      key: 'checkDropTargets',
      value: function checkDropTargets(gestureState) {
        var _this3 = this
        // Get current position
        var moveX = gestureState.moveX,
          moveY = gestureState.moveY

        // Check all registered drop targets
        var foundTarget = false
        global.dropTargets.forEach(function (target) {
          if (target.ref === _this3) return // Skip self

          target.measure(function (fx, fy, width, height, px, py) {
            var isOver =
              moveX >= px &&
              moveX <= px + width &&
              moveY >= py &&
              moveY <= py + height
            var canDrop = false
            if (isOver && target.onCheckCanDrop) {
              canDrop = target.onCheckCanDrop({
                dragSourceInfo: _this3.props.dragSourceInfo,
              })
            }
            if (target.ref) {
              target.ref.setState({
                isOver: isOver,
                canDrop: canDrop,
              })
            }
            if (isOver && canDrop) {
              foundTarget = true
            }
          })
        })
        return foundTarget
      },
    },
    {
      key: 'findDropTarget',
      value: function findDropTarget(gestureState) {
        var moveX = gestureState.moveX,
          moveY = gestureState.moveY
        var _iterator = _createForOfIteratorHelper(global.dropTargets),
          _step
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var target = _step.value
            if (target.ref === this) continue
            if (target.ref.state.isOver && target.ref.state.canDrop) {
              return target
            }
          }
        } catch (err) {
          _iterator.e(err)
        } finally {
          _iterator.f()
        }
        return null
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this4 = this
        var _this$state = this.state,
          pan = _this$state.pan,
          opacity = _this$state.opacity,
          isDragging = _this$state.isDragging,
          isOver = _this$state.isOver,
          canDrop = _this$state.canDrop
        var _this$props = this.props,
          style = _this$props.style,
          children = _this$props.children
        var containerStyles = [
          styles.dndable,
          isDragging && styles.isDragging,
          isOver && styles.isOver,
          canDrop && styles.canDrop,
          style,
        ]
        var animatedStyles = {
          transform: pan.getTranslateTransform(),
          opacity: opacity,
        }
        return /*#__PURE__*/ _react.default.createElement(
          _reactNative.Animated.View,
          _extends(
            {
              ref: function ref(_ref) {
                return (_this4.viewRef = _ref)
              },
              style: [containerStyles, isDragging ? animatedStyles : null],
            },
            this.panResponder.panHandlers,
            {
              onStartShouldSetResponder: function onStartShouldSetResponder() {
                return true
              },
              onResponderRelease: this.handlePress,
            },
          ),
          children,
        )
      },
    },
  ])
})(_react.default.Component))
var DndableSafe = (exports.DndableSafe = /*#__PURE__*/ (function (
  _React$Component2,
) {
  function DndableSafe() {
    _classCallCheck(this, DndableSafe)
    return _callSuper(this, DndableSafe, arguments)
  }
  _inherits(DndableSafe, _React$Component2)
  return _createClass(DndableSafe, [
    {
      key: 'render',
      value: function render() {
        return /*#__PURE__*/ _react.default.createElement(
          _reactNative.View,
          {
            style: [styles.dndable, this.props.style],
            onTouchEnd: this.props.onClick,
          },
          this.props.children,
        )
      },
    },
  ])
})(_react.default.Component))
var styles = _reactNative.StyleSheet.create({
  dndable: {
    // Base styles
  },
  isDragging: {
    elevation: 5,
    zIndex: 999,
  },
  isOver: {
    backgroundColor: 'rgba(75, 197, 222, 0.1)', // Light version of medium_turquoise
  },
  canDrop: {
    borderWidth: 3,
    borderColor: '#4BC5DE', // medium_turquoise
  },
})
