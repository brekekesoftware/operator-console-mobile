'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _react = _interopRequireDefault(require('react'))
var _reactNative = require('react-native')
var _constants = _interopRequireDefault(require('../utilities/constants'))
var _DownloadIcon = _interopRequireDefault(require('../icons/DownloadIcon'))
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
} // import RNFetchBlob from 'rn-fetch-blob'
var colors = {
  darkGray: '#9e9e9e',
  mantis: '#74C365',
  isabellineTp: 'rgba(0, 0, 0, 0.065)',
}
var styles = _reactNative.StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    padding: 4,
  },
  downloadButtonEnabled: {
    color: colors.mantis,
  },
  downloadButtonPressed: _objectSpread(
    {
      backgroundColor: colors.isabellineTp,
    },
    _reactNative.Platform.select({
      ios: {
        shadowColor: colors.isabellineTp,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  ),
  downloadButtonUnclickable: {
    opacity: 0.5,
  },
  icon: {
    width: 24,
    height: 20,
    marginRight: 4,
    resizeMode: 'contain',
  },
  iconDisabled: {
    opacity: 0.5,
  },
  fileName: {
    color: colors.darkGray,
  },
  fileNameEnabled: {
    color: colors.mantis,
  },
})

/**
 * ChatFileDownloadButton
 * props.uiData
 * props.uiData.ucUiAction
 * props.message
 * props.message.messageFile
 */
var _default = (exports.default = /*#__PURE__*/ (function (_React$Component) {
  function _default(_props) {
    var _this
    _classCallCheck(this, _default)
    _this = _callSuper(this, _default, [_props])
    _defineProperty(
      _this,
      'checkPermission',
      /*#__PURE__*/ _asyncToGenerator(
        /*#__PURE__*/ _regenerator().m(function _callee() {
          var granted, _t
          return _regenerator().w(
            function (_context) {
              while (1)
                switch (_context.n) {
                  case 0:
                    if (!(_reactNative.Platform.OS === 'android')) {
                      _context.n = 4
                      break
                    }
                    _context.p = 1
                    _context.n = 2
                    return _reactNative.PermissionsAndroid.request(
                      _reactNative.PermissionsAndroid.PERMISSIONS
                        .WRITE_EXTERNAL_STORAGE,
                      {
                        title: 'Storage Permission Required',
                        message:
                          'App needs access to your storage to download files',
                      },
                    )
                  case 2:
                    granted = _context.v
                    return _context.a(
                      2,
                      granted ===
                        _reactNative.PermissionsAndroid.RESULTS.GRANTED,
                    )
                  case 3:
                    _context.p = 3
                    _t = _context.v
                    console.warn(_t)
                    return _context.a(2, false)
                  case 4:
                    return _context.a(2, true)
                  case 5:
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
    _defineProperty(
      _this,
      'downloadFile',
      /*#__PURE__*/ (function () {
        var _ref2 = _asyncToGenerator(
          /*#__PURE__*/ _regenerator().m(function _callee2(url, fileName) {
            return _regenerator().w(function (_context2) {
              while (1)
                switch (_context2.n) {
                  case 0:
                    return _context2.a(2)
                }
            }, _callee2)
          }),
        )
        return function (_x, _x2) {
          return _ref2.apply(this, arguments)
        }
      })(),
    )
    _defineProperty(
      _this,
      'handleDownload',
      /*#__PURE__*/ _asyncToGenerator(
        /*#__PURE__*/ _regenerator().m(function _callee3() {
          var _this2, props, messageFile, hasPermission
          return _regenerator().w(function (_context3) {
            while (1)
              switch (_context3.n) {
                case 0:
                  ;(_this2 = _this), (props = _this2.props)
                  messageFile = props.message.messageFile
                  if (
                    !(
                      _this.state.clicked ||
                      messageFile.status !==
                        _constants.default.FILE_STATUS_UNACCEPTED
                    )
                  ) {
                    _context3.n = 1
                    break
                  }
                  _this.setState({
                    clicked: true,
                  })
                  return _context3.a(2)
                case 1:
                  _this.setState({
                    clicked: true,
                  })
                  if (
                    !(messageFile.inlineImage && messageFile.inlineImage.url)
                  ) {
                    _context3.n = 4
                    break
                  }
                  _context3.n = 2
                  return _this.checkPermission()
                case 2:
                  hasPermission = _context3.v
                  if (!hasPermission) {
                    _context3.n = 3
                    break
                  }
                  _context3.n = 3
                  return _this.downloadFile(
                    messageFile.inlineImage.url,
                    messageFile.name,
                  )
                case 3:
                  _context3.n = 5
                  break
                case 4:
                  props.uiData.ucUiAction.acceptFile({
                    file_id: messageFile.file_id,
                  })
                case 5:
                  return _context3.a(2)
              }
          }, _callee3)
        }),
      ),
    )
    _defineProperty(_this, 'handlePressIn', function () {
      _this.setState({
        isPressed: true,
      })
    })
    _defineProperty(_this, 'handlePressOut', function () {
      _this.setState({
        isPressed: false,
      })
    })
    _this.state = {
      clicked: false,
      isPressed: false,
    }
    return _this
  }
  _inherits(_default, _React$Component)
  return _createClass(_default, [
    {
      key: 'render',
      value: function render() {
        var _messageFile$inlineIm
        var props = this.props
        var messageFile = props.message.messageFile
        var _this$state = this.state,
          clicked = _this$state.clicked,
          isPressed = _this$state.isPressed
        var isEnabled =
          messageFile.status === _constants.default.FILE_STATUS_UNACCEPTED ||
          (messageFile.inlineImage && messageFile.inlineImage.url)
        var isUnclickable =
          ((_messageFile$inlineIm = messageFile.inlineImage) === null ||
          _messageFile$inlineIm === void 0
            ? void 0
            : _messageFile$inlineIm.url) && clicked
        var buttonStyles = [
          styles.downloadButton,
          isEnabled && styles.downloadButtonEnabled,
          isPressed && styles.downloadButtonPressed,
          isUnclickable && styles.downloadButtonUnclickable,
        ]
        var iconStyles = [styles.icon, !isEnabled && styles.iconDisabled]
        var textStyles = [styles.fileName, isEnabled && styles.fileNameEnabled]
        return /*#__PURE__*/ _react.default.createElement(
          _reactNative.View,
          {
            style: styles.container,
          },
          /*#__PURE__*/ _react.default.createElement(
            _reactNative.TouchableOpacity,
            {
              onPress: this.handleDownload,
              onPressIn: this.handlePressIn,
              onPressOut: this.handlePressOut,
              disabled: !isEnabled || isUnclickable,
              style: buttonStyles,
            },
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.View,
              {
                style: iconStyles,
              },
              /*#__PURE__*/ _react.default.createElement(
                _DownloadIcon.default,
                null,
              ),
            ),
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.Text,
              {
                style: textStyles,
                numberOfLines: 1,
              },
              messageFile.name,
            ),
          ),
        )
      },
    },
  ])
})(_react.default.Component))
