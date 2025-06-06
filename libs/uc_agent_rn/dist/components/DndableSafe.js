'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _react = _interopRequireDefault(require('react'))
var _reactNative = require('react-native')
var _Dndable = _interopRequireDefault(require('./Dndable'))
var _FileDndable = _interopRequireDefault(require('./FileDndable'))
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
function _regenerator() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e,
    t,
    r = 'function' == typeof Symbol ? Symbol : {},
    n = r.iterator || '@@iterator',
    o = r.toStringTag || '@@toStringTag'
  function i(r, n, o, i) {
    var c = n && n.prototype instanceof Generator ? n : Generator,
      u = Object.create(c.prototype)
    return (
      _regeneratorDefine2(
        u,
        '_invoke',
        (function (r, n, o) {
          var i,
            c,
            u,
            f = 0,
            p = o || [],
            y = !1,
            G = {
              p: 0,
              n: 0,
              v: e,
              a: d,
              f: d.bind(e, 4),
              d: function d(t, r) {
                return (i = t), (c = 0), (u = e), (G.n = r), a
              },
            }
          function d(r, n) {
            for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) {
              var o,
                i = p[t],
                d = G.p,
                l = i[2]
              r > 3
                ? (o = l === n) &&
                  ((c = i[4] || 3),
                  (u = i[5] === e ? i[3] : i[5]),
                  (i[4] = 3),
                  (i[5] = e))
                : i[0] <= d &&
                  ((o = r < 2 && d < i[1])
                    ? ((c = 0), (G.v = n), (G.n = i[1]))
                    : d < l &&
                      (o = r < 3 || i[0] > n || n > l) &&
                      ((i[4] = r), (i[5] = n), (G.n = l), (c = 0)))
            }
            if (o || r > 1) return a
            throw ((y = !0), n)
          }
          return function (o, p, l) {
            if (f > 1) throw TypeError('Generator is already running')
            for (
              y && 1 === p && d(p, l), c = p, u = l;
              (t = c < 2 ? e : u) || !y;

            ) {
              i ||
                (c
                  ? c < 3
                    ? (c > 1 && (G.n = -1), d(c, u))
                    : (G.n = u)
                  : (G.v = u))
              try {
                if (((f = 2), i)) {
                  if ((c || (o = 'next'), (t = i[o]))) {
                    if (!(t = t.call(i, u)))
                      throw TypeError('iterator result is not an object')
                    if (!t.done) return t
                    ;(u = t.value), c < 2 && (c = 0)
                  } else
                    1 === c && (t = i.return) && t.call(i),
                      c < 2 &&
                        ((u = TypeError(
                          "The iterator does not provide a '" + o + "' method",
                        )),
                        (c = 1))
                  i = e
                } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break
              } catch (t) {
                ;(i = e), (c = 1), (u = t)
              } finally {
                f = 1
              }
            }
            return { value: t, done: y }
          }
        })(r, o, i),
        !0,
      ),
      u
    )
  }
  var a = {}
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  t = Object.getPrototypeOf
  var c = [][n]
      ? t(t([][n]()))
      : (_regeneratorDefine2((t = {}), n, function () {
          return this
        }),
        t),
    u =
      (GeneratorFunctionPrototype.prototype =
      Generator.prototype =
        Object.create(c))
  function f(e) {
    return (
      Object.setPrototypeOf
        ? Object.setPrototypeOf(e, GeneratorFunctionPrototype)
        : ((e.__proto__ = GeneratorFunctionPrototype),
          _regeneratorDefine2(e, o, 'GeneratorFunction')),
      (e.prototype = Object.create(u)),
      e
    )
  }
  return (
    (GeneratorFunction.prototype = GeneratorFunctionPrototype),
    _regeneratorDefine2(u, 'constructor', GeneratorFunctionPrototype),
    _regeneratorDefine2(
      GeneratorFunctionPrototype,
      'constructor',
      GeneratorFunction,
    ),
    (GeneratorFunction.displayName = 'GeneratorFunction'),
    _regeneratorDefine2(GeneratorFunctionPrototype, o, 'GeneratorFunction'),
    _regeneratorDefine2(u),
    _regeneratorDefine2(u, o, 'Generator'),
    _regeneratorDefine2(u, n, function () {
      return this
    }),
    _regeneratorDefine2(u, 'toString', function () {
      return '[object Generator]'
    }),
    (_regenerator = function _regenerator() {
      return { w: i, m: f }
    })()
  )
}
function _regeneratorDefine2(e, r, n, t) {
  var i = Object.defineProperty
  try {
    i({}, '', {})
  } catch (e) {
    i = 0
  }
  ;(_regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) {
    if (r)
      i
        ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t })
        : (e[r] = n)
    else {
      var o = function o(r, n) {
        _regeneratorDefine2(e, r, function (e) {
          return this._invoke(r, n, e)
        })
      }
      o('next', 0), o('throw', 1), o('return', 2)
    }
  }),
    _regeneratorDefine2(e, r, n, t)
}
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value
  } catch (n) {
    return void e(n)
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o)
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments
    return new Promise(function (r, o) {
      var a = n.apply(t, e)
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, 'next', n)
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, 'throw', n)
      }
      _next(void 0)
    })
  }
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
 * DndableSafe - React Native version
 * A wrapper component that provides safe drag and drop functionality
 *
 * props.uiData - UI data object
 * props.uiData.ownerDocument - Document object
 * props.uiData.uiDataId - UI data ID
 * props.dndableClass - Class name for the dndable component
 * props.style - Additional styles for the component
 * props.dragSourceInfo - Information about the drag source
 * props.onCheckCanDrop - Function to check if dropping is allowed
 * props.onDrop - Function called when item is dropped
 * props.onClick - Function called when item is clicked/pressed
 */
var DndableSafe = (exports.default = /*#__PURE__*/ (function (
  _React$Component,
) {
  function DndableSafe(_props) {
    var _this
    _classCallCheck(this, DndableSafe)
    _this = _callSuper(this, DndableSafe, [_props])

    // Check if we're in a React Native environment
    _defineProperty(_this, 'handleDragStart', function (e, gestureState) {
      var dragSourceInfo = _this.props.dragSourceInfo
      _this.setState({
        isDragging: true,
      })

      // Notify parent of drag start
      if (_this.props.onDragStart) {
        _this.props.onDragStart({
          dragSourceInfo: dragSourceInfo,
        })
      }
    })
    _defineProperty(_this, 'handleDragMove', function (e, gestureState) {
      if (_this.props.onDragOver) {
        _this.props.onDragOver({
          dragSourceInfo: _this.props.dragSourceInfo,
        })
      }
    })
    _defineProperty(_this, 'handleDragEnd', function (e, gestureState) {
      var _this$props = _this.props,
        onDrop = _this$props.onDrop,
        onCheckCanDrop = _this$props.onCheckCanDrop,
        dragSourceInfo = _this$props.dragSourceInfo
      _this.setState({
        isDragging: false,
      })
      if (onCheckCanDrop) {
        var canDrop = onCheckCanDrop({
          dragSourceInfo: dragSourceInfo,
        })
        if (canDrop && onDrop) {
          onDrop({
            dragSourceInfo: dragSourceInfo,
          })
        }
      }
    })
    _defineProperty(_this, 'handlePress', function (ev) {
      var props = _this.props
      if (typeof props.onClick === 'function') {
        props.onClick(ev)
      }
    })
    // This method handles file selection directly
    _defineProperty(
      _this,
      'handleFileSelect',
      /*#__PURE__*/ _asyncToGenerator(
        /*#__PURE__*/ _regenerator().m(function _callee() {
          var fileDndable, mockEvent, _t
          return _regenerator().w(
            function (_context) {
              while (1)
                switch (_context.n) {
                  case 0:
                    if (!(typeof _this.props.onDrop !== 'function')) {
                      _context.n = 1
                      break
                    }
                    return _context.a(2)
                  case 1:
                    _context.p = 1
                    // Use the FileDndable implementation to handle file selection
                    fileDndable = new _FileDndable.default({}) // Create a mock event with the necessary properties
                    mockEvent = {
                      preventDefault: function preventDefault() {},
                      stopPropagation: function stopPropagation() {},
                    } // Call the FileDndable's handlePress method to select files
                    // and it will call our onDrop with the appropriate event object
                    _context.n = 2
                    return fileDndable.handlePress({
                      onDrop: _this.props.onDrop,
                      onClick: function onClick() {}, // Empty function to prevent double click handling
                    })
                  case 2:
                    _context.n = 4
                    break
                  case 3:
                    _context.p = 3
                    _t = _context.v
                    console.error('Error handling file selection:', _t)
                  case 4:
                    return _context.a(2)
                }
            },
            _callee,
            null,
            [[1, 3]],
          )
        }),
      ),
    )
    _this.isReactNative = true
    _this.state = {
      isDragging: false,
      isOver: false,
    }
    _this.panResponder = _reactNative.PanResponder.create({
      onStartShouldSetPanResponder: function onStartShouldSetPanResponder() {
        return true
      },
      onMoveShouldSetPanResponder: function onMoveShouldSetPanResponder() {
        return true
      },
      onPanResponderGrant: _this.handleDragStart,
      onPanResponderMove: _this.handleDragMove,
      onPanResponderRelease: _this.handleDragEnd,
      onPanResponderTerminate: _this.handleDragEnd,
    })
    return _this
  }
  _inherits(DndableSafe, _React$Component)
  return _createClass(DndableSafe, [
    {
      key: 'render',
      value: function render() {
        var props = this.props
        var _this$state = this.state,
          isDragging = _this$state.isDragging,
          isOver = _this$state.isOver

        // Check if drag and drop is enabled
        var dndEnabled =
          props.uiData &&
          props.uiData.uiDataId &&
          global.$brUCDndEnabledApp === props.uiData.uiDataId
        console.log('#Duy Phan console dndEnabled', dndEnabled)
        if (dndEnabled) {
          // Use the appropriate Dndable component
          if (props.dndableClass === 'FileDndable') {
            return /*#__PURE__*/ _react.default.createElement(
              _FileDndable.default,
              _extends(
                {
                  style: [
                    styles.dndableSafe,
                    props.style,
                    isDragging && styles.dragging,
                    isOver && styles.over,
                    props.canDrop && styles.canDrop,
                  ],
                  onDrop: props.onDrop,
                  onClick: props.onClick,
                },
                this.panResponder.panHandlers,
              ),
              props.children,
            )
          } else {
            return /*#__PURE__*/ _react.default.createElement(
              _Dndable.default,
              _extends(
                {
                  style: [
                    styles.dndableSafe,
                    props.style,
                    isDragging && styles.dragging,
                    isOver && styles.over,
                    props.canDrop && styles.canDrop,
                  ],
                  dragSourceInfo: props.dragSourceInfo,
                  onCheckCanDrop: props.onCheckCanDrop,
                  onDrop: props.onDrop,
                  onClick: props.onClick,
                },
                this.panResponder.panHandlers,
              ),
              props.children,
            )
          }
        } else {
          // Fallback for when drag and drop is not enabled
          // In legacy mode, we still need to handle file drops
          return /*#__PURE__*/ _react.default.createElement(
            _reactNative.View,
            {
              style: [styles.dndableSafe, styles.legacy, props.style],
            },
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.TouchableOpacity,
              {
                style: styles.touchableArea,
                onPress: this.handlePress,
              },
              props.children,
            ),
          )
        }
      },
    },
  ])
})(_react.default.Component))
var styles = _reactNative.StyleSheet.create({
  dndableSafe: {},
  legacy: {
    position: 'relative',
  },
  touchableArea: {
    width: '100%',
    height: '100%',
  },
  dropZone: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  dragging: {
    opacity: 0.5,
  },
  over: {
    backgroundColor: '#f0f0f0',
  },
  canDrop: {
    borderWidth: 2,
    borderColor: '#40E0D0', // @medium_turquoise
  },
  brBuddylistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  // TODO: Remove this if not use
  brWithColor: {},
  brWithIcon: {},
  brCallStatus: {},
  brConferenceStatus: {},
  brConferenceStatusWebchat: {},
  brSelected: {
    backgroundColor: '#eeeeee',
  },
  brOffline: {
    opacity: 0.5,
  },
  brBuddylistItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brCallStatusIcon: {
    width: 16,
    height: 16,
    marginHorizontal: 4,
  },
  brConferenceStatusIcon: {
    width: 16,
    height: 16,
    marginHorizontal: 4,
  },
  brConferenceStatusWebchatIcon: {
    width: 16,
    height: 16,
    marginHorizontal: 4,
  },
  brBuddylistItemInfo: {
    fontSize: 13,
    color: '#212121',
  },
  brBuddylistItemMessage: {
    marginTop: 4,
  },
  brBuddylistItemTime: {
    marginTop: 2,
    fontSize: 12,
    color: '#9e9e9e',
  },
  brBuddylistItemMarker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#40E0D0',
    marginHorizontal: 4,
  },
  brBuddylistItemUnread: {
    backgroundColor: '#ff4526',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  brHidden: {
    display: 'none',
  },
  brBuddylistItemImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 8,
  },
  brNoImage: {
    backgroundColor: '#eeeeee',
  },
  brMyProfileImageUrl: {
    borderWidth: 2,
    borderColor: '#40E0D0',
  },
  brBuddylistItemStatusIcon: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
})
