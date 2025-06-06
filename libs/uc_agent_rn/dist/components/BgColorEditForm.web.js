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
var FileSystem = _interopRequireWildcard(require('react-native-fs'))
var Sharing = _interopRequireWildcard(require('react-native-share'))
var _uawmsgs = _interopRequireDefault(require('../utilities/uawmsgs'))
var _strings = require('../utilities/strings')
var _ButtonIconic = _interopRequireDefault(require('./ButtonIconic'))
var _DropDownMenu = _interopRequireDefault(require('./DropDownMenu'))
var _DndableSafe = _interopRequireDefault(require('./DndableSafe'))
var _MenuItem = _interopRequireDefault(require('./MenuItem'))
var _TextBox = _interopRequireDefault(require('./TextBox'))
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
    for (var _t2 in e)
      'default' !== _t2 &&
        {}.hasOwnProperty.call(e, _t2) &&
        ((i =
          (o = Object.defineProperty) &&
          Object.getOwnPropertyDescriptor(e, _t2)) &&
        (i.get || i.set)
          ? o(f, _t2, i)
          : (f[_t2] = e[_t2]))
    return f
  })(e, t)
}
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e }
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
 * BgColorEditForm
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.configurations
 * props.uiData.showingDialogVersion
 * props.uiData.preferenceWorkTable
 * props.params
 */
var _default = (exports.default = /*#__PURE__*/ (function (_React$Component) {
  function _default(props) {
    var _this
    _classCallCheck(this, _default)
    _this = _callSuper(this, _default, [props])
    _this.exportObjectURL = null
    _this.mustScroll = false
    _this.state = {
      editCount: 0,
      nowEditing: null,
      editingType: '',
      editingFormat: '',
      editingData: '',
      editingColor: '',
      editingCustomColor: '',
      scrollToEnd: false,
    }
    _this.scrollViewRef = /*#__PURE__*/ _react.default.createRef()
    _this.entriesRef = /*#__PURE__*/ _react.default.createRef()
    return _this
  }
  _inherits(_default, _React$Component)
  return _createClass(_default, [
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        if (this.mustScroll) {
          this.mustScroll = false
          if (this.entriesRef.current) {
            var scrollView = this.entriesRef.current
            scrollView.measure(function (x, y, width, height, pageX, pageY) {
              scrollView.scrollTo({
                y: height,
                animated: true,
              })
            })
          }
        }
        if (this.state.scrollToEnd) {
          if (this.entriesRef.current) {
            this.entriesRef.current.scrollToEnd({
              animated: true,
            })
          }
          this.setState({
            scrollToEnd: false,
          })
        }
      },
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        // Remove URL.revokeObjectURL since it's not needed in React Native
      },
    },
    {
      key: 'getFormat',
      value: function getFormat(bgInfo) {
        var props = this.props
        var type = (0, _strings.string)(bgInfo && bgInfo.type)
        var data = (0, _strings.string)(bgInfo && bgInfo.data)
        if (
          type === 'subject' ||
          type === 'group' ||
          type === 'user_id' ||
          type === 'name'
        ) {
          if (data[0] === '^') {
            if (data[data.length - 1] === '$') {
              return 'exact'
            } else {
              return 'forward'
            }
          } else {
            if (data[data.length - 1] === '$') {
              return 'backward'
            } else {
              return 'partial'
            }
          }
        } else {
          return data
        }
      },
    },
    {
      key: 'getData',
      value: function getData(bgInfo) {
        var props = this.props
        var data = (0, _strings.string)(bgInfo && bgInfo.data)
        if (bgInfo.type === 'conf_type') {
          data = ''
        } else if (
          bgInfo.type === 'subject' ||
          bgInfo.type === 'group' ||
          bgInfo.type === 'user_id' ||
          bgInfo.type === 'name'
        ) {
          if (data[0] === '^') {
            data = data.substring(1)
          }
          if (data[data.length - 1] === '$') {
            data = data.substring(0, data.length - 1)
          }
        }
        return data
      },
    },
    {
      key: 'localizeType',
      value: function localizeType(type) {
        if (type === 'conf_type') {
          return _uawmsgs.default.LBL_PREFERENCE_CHAT_BG_COLOR_TYPE_CONF_TYPE
        } else if (type === 'subject') {
          return _uawmsgs.default.LBL_PREFERENCE_CHAT_BG_COLOR_TYPE_SUBJECT
        } else if (type === 'group') {
          return _uawmsgs.default.LBL_PREFERENCE_CHAT_BG_COLOR_TYPE_GROUP
        } else if (type === 'user_id') {
          return _uawmsgs.default.LBL_PREFERENCE_CHAT_BG_COLOR_TYPE_USER_ID
        } else if (type === 'name') {
          return _uawmsgs.default.LBL_PREFERENCE_CHAT_BG_COLOR_TYPE_NAME
        } else if (type === 'tag') {
          return _uawmsgs.default.LBL_PREFERENCE_CHAT_BG_COLOR_TYPE_TAG
        } else {
          return type
        }
      },
    },
    {
      key: 'localizeFormat',
      value: function localizeFormat(format) {
        if (format === 'exact') {
          return _uawmsgs.default.LBL_PREFERENCE_CHAT_BG_COLOR_FORMAT_EXACT
        } else if (format === 'forward') {
          return _uawmsgs.default.LBL_PREFERENCE_CHAT_BG_COLOR_FORMAT_FORWARD
        } else if (format === 'backward') {
          return _uawmsgs.default.LBL_PREFERENCE_CHAT_BG_COLOR_FORMAT_BACKWARD
        } else if (format === 'partial') {
          return _uawmsgs.default.LBL_PREFERENCE_CHAT_BG_COLOR_FORMAT_PARTIAL
        } else if (format === '^userchatconf$') {
          return _uawmsgs.default
            .LBL_PREFERENCE_CHAT_BG_COLOR_FORMAT_USERCHATCONF
        } else if (format === '^webchat$') {
          return _uawmsgs.default.LBL_PREFERENCE_CHAT_BG_COLOR_FORMAT_WEBCHAT
        } else {
          return format
        }
      },
    },
    {
      key: 'handleBgColorEditAddButtonClick',
      value: function handleBgColorEditAddButtonClick(ev) {
        var props = this.props

        // stop editing
        if (this.state.nowEditing !== null) {
          this.handleBgColorEditEntryItemEditButtonClick(this.state.nowEditing)
        }

        // work
        var preferenceWork =
          props.uiData.preferenceWorkTable &&
          props.uiData.preferenceWorkTable[
            props.params && props.params.panelCode
          ]
        var chatBgColorObject = null
        try {
          chatBgColorObject = JSON.parse(preferenceWork.chatBgColor)
        } catch (ex) {
          props.uiData.ucUiStore.getLogger().log('warn', ex)
          return
        }
        if (
          !chatBgColorObject ||
          !chatBgColorObject.list ||
          !chatBgColorObject.list.splice
        ) {
          props.uiData.ucUiStore
            .getLogger()
            .log('warn', 'empty chatBgColorObject.list')
          return
        }

        // change
        var bgInfo = {
          type: 'conf_type',
          data: '^userchatconf$',
          color: '#ffffff',
        }
        chatBgColorObject.list.push(bgInfo)
        preferenceWork.chatBgColor = JSON.stringify(chatBgColorObject)

        // start editing
        this.setState({
          nowEditing: chatBgColorObject.list.length - 1,
          editingType: bgInfo.type,
          editingFormat: this.getFormat(bgInfo),
          editingData: this.getData(bgInfo),
          editingColor: bgInfo.color,
          editingCustomColor: '',
          editCount: this.state.editCount + 1,
        })

        // scroll
        this.mustScroll = true
      },
    },
    {
      key: 'handleBgColorEditImportButtonClick',
      value: (function () {
        var _handleBgColorEditImportButtonClick = _asyncToGenerator(
          /*#__PURE__*/ _regenerator().m(function _callee() {
            var props
            return _regenerator().w(
              function (_context) {
                while (1)
                  switch (_context.n) {
                    case 0:
                      props = this.props // stop editing
                      if (this.state.nowEditing !== null) {
                        this.handleBgColorEditEntryItemEditButtonClick(
                          this.state.nowEditing,
                        )
                      }

                    // TODO: Handle if it need on web
                    // try {
                    //   // Pick document
                    //   const result = await DocumentPicker.pick({
                    //     type: [DocumentPicker.types.allFiles],
                    //   })

                    //   // Read file content
                    //   const fileContent = await FileSystem.readFile(result[0].uri)
                    //   this.handleImportedContent(fileContent)
                    // } catch (err) {
                    //   if (!DocumentPicker.isCancel(err)) {
                    //     props.uiData.ucUiStore.getLogger().log('warn', err)
                    //   }
                    // }
                    case 1:
                      return _context.a(2)
                  }
              },
              _callee,
              this,
            )
          }),
        )
        function handleBgColorEditImportButtonClick() {
          return _handleBgColorEditImportButtonClick.apply(this, arguments)
        }
        return handleBgColorEditImportButtonClick
      })(),
    },
    {
      key: 'handleImportedContent',
      value: function handleImportedContent(content) {
        var props = this.props
        try {
          // Parse and validate JSON
          var chatBgColorImportedObject = JSON.parse(content)
          chatBgColorImportedObject.list.forEach(function (element) {
            return element.type.toString()
          })

          // Update preference work
          var preferenceWork =
            props.uiData.preferenceWorkTable &&
            props.uiData.preferenceWorkTable[
              props.params && props.params.panelCode
            ]
          if (!preferenceWork || !preferenceWork.chatBgColor) {
            props.uiData.ucUiStore
              .getLogger()
              .log('warn', 'empty preferenceWork.chatBgColor')
            return
          }
          preferenceWork.chatBgColor = content
          this.setState({
            editCount: this.state.editCount + 1,
          })
        } catch (ex) {
          props.uiData.ucUiStore.getLogger().log('warn', ex)
        }
      },
    },
    {
      key: 'handleBgColorEditExportButtonClick',
      value: (function () {
        var _handleBgColorEditExportButtonClick = _asyncToGenerator(
          /*#__PURE__*/ _regenerator().m(function _callee2() {
            var props, preferenceWork, fileName, path, _t
            return _regenerator().w(
              function (_context2) {
                while (1)
                  switch (_context2.n) {
                    case 0:
                      props = this.props // stop editing
                      if (this.state.nowEditing !== null) {
                        this.handleBgColorEditEntryItemEditButtonClick(
                          this.state.nowEditing,
                        )
                      }
                      _context2.p = 1
                      preferenceWork =
                        props.uiData.preferenceWorkTable &&
                        props.uiData.preferenceWorkTable[
                          props.params && props.params.panelCode
                        ]
                      if (!(!preferenceWork || !preferenceWork.chatBgColor)) {
                        _context2.n = 2
                        break
                      }
                      props.uiData.ucUiStore
                        .getLogger()
                        .log('warn', 'empty preferenceWork.chatBgColor')
                      return _context2.a(2)
                    case 2:
                      // Create temporary file
                      fileName = 'chatbgcolor_' + Date.now() + '.dat'
                      path = ''
                        .concat(FileSystem.TemporaryDirectoryPath, '/')
                        .concat(fileName)
                      _context2.n = 3
                      return FileSystem.writeFile(
                        path,
                        preferenceWork.chatBgColor,
                        'utf8',
                      )
                    case 3:
                      _context2.n = 4
                      return Sharing.open({
                        url: 'file://'.concat(path),
                        type: 'text/plain',
                        filename: fileName,
                      })
                    case 4:
                      _context2.n = 5
                      return FileSystem.unlink(path)
                    case 5:
                      _context2.n = 7
                      break
                    case 6:
                      _context2.p = 6
                      _t = _context2.v
                      props.uiData.ucUiStore.getLogger().log('warn', _t)
                    case 7:
                      return _context2.a(2)
                  }
              },
              _callee2,
              this,
              [[1, 6]],
            )
          }),
        )
        function handleBgColorEditExportButtonClick() {
          return _handleBgColorEditExportButtonClick.apply(this, arguments)
        }
        return handleBgColorEditExportButtonClick
      })(),
    },
    {
      key: 'handleBgColorEditDrop',
      value: function handleBgColorEditDrop(dropTargetInfo, ev) {
        var props = this.props
        if (!(dropTargetInfo && ev && ev.dragSourceInfo)) {
          props.uiData.ucUiStore
            .getLogger()
            .log('warn', 'invalid dragSourceInfo, dropTargetInfo')
          return
        }
        // parameters
        var dragSourceInfoType = ev.dragSourceInfo.dragSourceInfoType
        var dragSourceInfoCode = ev.dragSourceInfo.dragSourceInfoCode
        var dropTargetInfoType = dropTargetInfo.dropTargetInfoType
        var dropTargetInfoCode = dropTargetInfo.dropTargetInfoCode
        if (
          dragSourceInfoType !== 'bgColorEditEntryItem' ||
          dropTargetInfoType !== 'bgColorEditEntryItem'
        ) {
          props.uiData.ucUiStore
            .getLogger()
            .log('warn', 'invalid dragSourceInfoType, dropTargetInfoType')
          return
        }

        // work
        var preferenceWork =
          props.uiData.preferenceWorkTable &&
          props.uiData.preferenceWorkTable[
            props.params && props.params.panelCode
          ]
        var chatBgColorObject = null
        try {
          chatBgColorObject = JSON.parse(preferenceWork.chatBgColor)
        } catch (ex) {
          props.uiData.ucUiStore.getLogger().log('warn', ex)
          return
        }
        if (
          !chatBgColorObject ||
          !chatBgColorObject.list ||
          !chatBgColorObject.list.splice
        ) {
          props.uiData.ucUiStore
            .getLogger()
            .log('warn', 'empty chatBgColorObject.list')
          return
        }

        // change
        var item = chatBgColorObject.list.splice(dragSourceInfoCode, 1)[0]
        chatBgColorObject.list.splice(dropTargetInfoCode, 0, item)
        preferenceWork.chatBgColor = JSON.stringify(chatBgColorObject)

        // render
        this.setState({
          editCount: this.state.editCount + 1,
        })
      },
    },
    {
      key: 'handleBgColorEditEntryItemTypeMenuItemClick',
      value: function handleBgColorEditEntryItemTypeMenuItemClick(type, ev) {
        var props = this.props
        if (
          type === 'conf_type' &&
          ['^userchatconf$', '^webchat$'].indexOf(this.state.editingFormat) ===
            -1
        ) {
          this.setState({
            editingType: type,
            editingFormat: '^userchatconf$',
          })
        } else if (
          type !== 'conf_type' &&
          ['exact', 'forward', 'backward', 'partial'].indexOf(
            this.state.editingFormat,
          ) === -1
        ) {
          this.setState({
            editingType: type,
            editingFormat: 'exact',
          })
        } else {
          this.setState({
            editingType: type,
          })
        }
      },
    },
    {
      key: 'handleBgColorEditEntryItemFormatMenuItemClick',
      value: function handleBgColorEditEntryItemFormatMenuItemClick(
        format,
        ev,
      ) {
        var props = this.props
        this.setState({
          editingFormat: format,
        })
      },
    },
    {
      key: 'handleBgColorEditEntryItemDataInputChange',
      value: function handleBgColorEditEntryItemDataInputChange(ev) {
        var props = this.props
        this.setState({
          editingData: (0, _strings.string)(ev.target.value),
        })
      },
    },
    {
      key: 'handleBgColorEditEntryItemColorMenuItemClick',
      value: function handleBgColorEditEntryItemColorMenuItemClick(color, ev) {
        var props = this.props
        this.setState({
          editingColor: color,
        })
      },
    },
    {
      key: 'handleBgColorEditEntryItemColorMenuItemCustomColorColorClick',
      value:
        function handleBgColorEditEntryItemColorMenuItemCustomColorColorClick(
          ev,
        ) {
          var props = this.props
          this.setState({
            editingColor: this.state.editingCustomColor,
          })
          props.uiData.showingDialogVersion++
        },
    },
    {
      key: 'handleBgColorEditEntryItemColorMenuItemCustomColorInputChange',
      value:
        function handleBgColorEditEntryItemColorMenuItemCustomColorInputChange(
          ev,
        ) {
          var props = this.props
          this.setState({
            editingCustomColor: (0, _strings.string)(ev.target.value),
          })
        },
    },
    {
      key: 'handleBgColorEditEntryItemColorMenuItemCustomColorInputKeyDown',
      value:
        function handleBgColorEditEntryItemColorMenuItemCustomColorInputKeyDown(
          ev,
        ) {
          var props = this.props
          if (ev && ev.keyCode === 13 && !ev.shiftKey) {
            this.setState({
              editingColor: this.state.editingCustomColor,
            })
            props.uiData.showingDialogVersion++
            ev.stopPropagation()
          }
        },
    },
    {
      key: 'handleBgColorEditEntryItemEditButtonClick',
      value: function handleBgColorEditEntryItemEditButtonClick(i, ev) {
        var props = this.props

        // work
        var preferenceWork =
          props.uiData.preferenceWorkTable &&
          props.uiData.preferenceWorkTable[
            props.params && props.params.panelCode
          ]
        var chatBgColorObject = null
        try {
          chatBgColorObject = JSON.parse(preferenceWork.chatBgColor)
        } catch (ex) {
          props.uiData.ucUiStore.getLogger().log('warn', ex)
          return
        }
        if (
          !chatBgColorObject ||
          !chatBgColorObject.list ||
          !chatBgColorObject.list.splice
        ) {
          props.uiData.ucUiStore
            .getLogger()
            .log('warn', 'empty chatBgColorObject.list')
          return
        }
        var bgInfo = chatBgColorObject.list[i]
        if (!bgInfo) {
          props.uiData.ucUiStore.getLogger().log('warn', 'empty bgInfo')
          return
        }

        // start / stop editing
        if (this.state.nowEditing !== i) {
          this.setState({
            nowEditing: i,
            editingType: bgInfo.type,
            editingFormat: this.getFormat(bgInfo),
            editingData: this.getData(bgInfo),
            editingColor: bgInfo.color,
            editingCustomColor: '',
          })
        } else {
          // change
          var type = (0, _strings.string)(this.state.editingType)
          var format = (0, _strings.string)(this.state.editingFormat)
          var data = (0, _strings.string)(this.state.editingData)
          var color = (0, _strings.string)(this.state.editingColor)
          if (type === 'conf_type') {
            data = format
          } else if (
            type === 'subject' ||
            type === 'group' ||
            type === 'user_id' ||
            type === 'name'
          ) {
            if (format === 'exact' || format === 'forward') {
              data = '^' + data
            }
            if (format === 'exact' || format === 'backward') {
              data = data + '$'
            }
          }
          bgInfo.type = type
          bgInfo.data = data
          bgInfo.color = color
          preferenceWork.chatBgColor = JSON.stringify(chatBgColorObject)
          this.setState({
            nowEditing: null,
            editCount: this.state.editCount + 1,
          })
        }
      },
    },
    {
      key: 'handleBgColorEditEntryItemDeleteButtonClick',
      value: function handleBgColorEditEntryItemDeleteButtonClick(i, ev) {
        var props = this.props

        // work
        var preferenceWork =
          props.uiData.preferenceWorkTable &&
          props.uiData.preferenceWorkTable[
            props.params && props.params.panelCode
          ]
        var chatBgColorObject = null
        try {
          chatBgColorObject = JSON.parse(preferenceWork.chatBgColor)
        } catch (ex) {
          props.uiData.ucUiStore.getLogger().log('warn', ex)
          return
        }
        if (
          !chatBgColorObject ||
          !chatBgColorObject.list ||
          !chatBgColorObject.list.splice
        ) {
          props.uiData.ucUiStore
            .getLogger()
            .log('warn', 'empty chatBgColorObject.list')
          return
        }

        // change
        chatBgColorObject.list.splice(i, 1)
        preferenceWork.chatBgColor = JSON.stringify(chatBgColorObject)

        // render
        this.setState({
          editCount: this.state.editCount + 1,
        })
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this2 = this
        var props = this.props
        var preferenceWork =
          (props.uiData.preferenceWorkTable &&
            props.uiData.preferenceWorkTable[
              props.params && props.params.panelCode
            ]) ||
          {}
        var chatBgColorList = []
        try {
          chatBgColorList = [].concat(
            JSON.parse((0, _strings.string)(preferenceWork.chatBgColor) || '{}')
              .list || [],
          )
        } catch (ex) {
          props.uiData.ucUiStore.getLogger().log('warn', ex)
        }
        var colorCands = [
          '#fcf8ff',
          '#f8faff',
          '#f8ffff',
          '#f8fff8',
          '#fefff6',
          '#fffbf6',
          '#fff8fa',
        ]
        if (
          props.uiData.configurations &&
          props.uiData.configurations.colorCands
        ) {
          try {
            colorCands = JSON.parse(props.uiData.configurations.colorCands)
          } catch (ex) {
            props.uiData.ucUiStore.getLogger().log('warn', ex)
          }
        }
        chatBgColorList
          .slice()
          .reverse()
          .forEach(function (bgInfo) {
            if (
              bgInfo &&
              bgInfo.color &&
              colorCands.indexOf(bgInfo.color) === -1
            ) {
              colorCands.unshift(bgInfo.color)
            }
          })
        return /*#__PURE__*/ _react.default.createElement(
          _reactNative.View,
          {
            style: styles.brBgColorEditForm,
          },
          /*#__PURE__*/ _react.default.createElement(
            _reactNative.View,
            {
              style: styles.brBgColorEditButtons,
            },
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.TouchableOpacity,
              {
                style: [styles.brBgColorEditButton, styles.addButton],
                onPress: this.handleBgColorEditAddButtonClick.bind(this),
              },
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.Text,
                null,
                '+',
              ),
            ),
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.TouchableOpacity,
              {
                style: [styles.brBgColorEditButton, styles.importButton],
                onPress: this.handleBgColorEditImportButtonClick.bind(this),
              },
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.Text,
                null,
                '\u2191',
              ),
            ),
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.TouchableOpacity,
              {
                style: [styles.brBgColorEditButton, styles.exportButton],
                onPress: this.handleBgColorEditExportButtonClick.bind(this),
              },
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.Text,
                null,
                '\u2193',
              ),
            ),
          ),
          /*#__PURE__*/ _react.default.createElement(
            _reactNative.ScrollView,
            {
              ref: this.entriesRef,
              style: styles.brBgColorEditEntries,
              showsVerticalScrollIndicator: true,
              onContentSizeChange: function onContentSizeChange() {
                if (_this2.mustScroll) {
                  var _this2$entriesRef$cur
                  ;(_this2$entriesRef$cur = _this2.entriesRef.current) ===
                    null ||
                    _this2$entriesRef$cur === void 0 ||
                    _this2$entriesRef$cur.scrollToEnd({
                      animated: true,
                    })
                }
              },
            },
            chatBgColorList.map(function (element, i) {
              var bgInfo = element || {}
              if (_this2.state.nowEditing !== i) {
                return /*#__PURE__*/ _react.default.createElement(
                  _reactNative.View,
                  {
                    key: i,
                    style: styles.brBgColorEditEntryItem,
                  },
                  /*#__PURE__*/ _react.default.createElement(
                    _DndableSafe.default,
                    {
                      uiData: props.uiData,
                      className:
                        'brBgColorEditEntryItem brBgInfoType_' + bgInfo.type,
                      dragSourceInfo: {
                        dragSourceInfoType: 'bgColorEditEntryItem',
                        dragSourceInfoCode: i,
                      },
                      onCheckCanDrop: function onCheckCanDrop(ev) {
                        return (
                          _this2.state.nowEditing === null &&
                          ev.dragSourceInfo &&
                          ev.dragSourceInfo.dragSourceInfoType ===
                            'bgColorEditEntryItem' &&
                          ev.dragSourceInfo.dragSourceInfoCode !== i
                        )
                      },
                      onDrop: _this2.handleBgColorEditDrop.bind(_this2, {
                        dropTargetInfoType: 'bgColorEditEntryItem',
                        dropTargetInfoCode: i,
                      }),
                    },
                    /*#__PURE__*/ _react.default.createElement(
                      _reactNative.View,
                      {
                        style: styles.brBgColorEditEntryItemArea,
                      },
                      /*#__PURE__*/ _react.default.createElement(
                        _reactNative.View,
                        {
                          style: styles.brBgColorEditEntryItemLabelArea,
                        },
                        /*#__PURE__*/ _react.default.createElement(
                          _reactNative.Text,
                          {
                            style: styles.brBgColorEditEntryItemType,
                          },
                          _this2.localizeType(bgInfo.type),
                        ),
                        /*#__PURE__*/ _react.default.createElement(
                          _reactNative.Text,
                          {
                            style: styles.brBr1,
                          },
                        ),
                        /*#__PURE__*/ _react.default.createElement(
                          _reactNative.Text,
                          {
                            style: styles.brBgColorEditEntryItemFormat,
                          },
                          _this2.localizeFormat(_this2.getFormat(bgInfo)),
                        ),
                        /*#__PURE__*/ _react.default.createElement(
                          _reactNative.Text,
                          {
                            style: styles.brBr2,
                          },
                        ),
                        /*#__PURE__*/ _react.default.createElement(
                          _reactNative.Text,
                          {
                            style: styles.brBgColorEditEntryItemData,
                          },
                          _this2.getData(bgInfo),
                        ),
                      ),
                      /*#__PURE__*/ _react.default.createElement(
                        _reactNative.View,
                        {
                          style: styles.brBgColorEditEntryItemColorContainer,
                        },
                        /*#__PURE__*/ _react.default.createElement(
                          _reactNative.View,
                          {
                            style: [
                              styles.colorSwatch,
                              {
                                backgroundColor: bgInfo.color,
                              },
                            ],
                          },
                        ),
                      ),
                      /*#__PURE__*/ _react.default.createElement(
                        _reactNative.TouchableOpacity,
                        {
                          style: styles.editButton,
                          onPress:
                            _this2.handleBgColorEditEntryItemEditButtonClick.bind(
                              _this2,
                              i,
                            ),
                        },
                        /*#__PURE__*/ _react.default.createElement(
                          _reactNative.Text,
                          {
                            style: styles.editButtonText,
                          },
                          '\u270E',
                        ),
                      ),
                      /*#__PURE__*/ _react.default.createElement(
                        _reactNative.TouchableOpacity,
                        {
                          style: styles.deleteButton,
                          onPress:
                            _this2.handleBgColorEditEntryItemDeleteButtonClick.bind(
                              _this2,
                              i,
                            ),
                        },
                        /*#__PURE__*/ _react.default.createElement(
                          _reactNative.Text,
                          {
                            style: styles.deleteButtonText,
                          },
                          '\u2717',
                        ),
                      ),
                    ),
                  ),
                )
              } else {
                return /*#__PURE__*/ _react.default.createElement(
                  _reactNative.View,
                  {
                    key: i,
                    style: styles.brBgColorEditEntryItem,
                  },
                  /*#__PURE__*/ _react.default.createElement(
                    _reactNative.View,
                    {
                      style: styles.brBgColorEditEntryItemArea,
                    },
                    /*#__PURE__*/ _react.default.createElement(
                      _reactNative.View,
                      {
                        style: styles.brBgColorEditEntryItemInputArea,
                      },
                      /*#__PURE__*/ _react.default.createElement(
                        _DropDownMenu.default,
                        {
                          uiData: props.uiData,
                          className: 'brBgColorEditEntryItemTypeMenu',
                          dialogClassName: 'brBgColorEditEntryItemDialog',
                          text: _this2.localizeType(_this2.state.editingType),
                        },
                        [
                          'conf_type',
                          'subject',
                          'group',
                          'user_id',
                          'name',
                          'tag',
                        ].map(function (type) {
                          return /*#__PURE__*/ _react.default.createElement(
                            _MenuItem.default,
                            {
                              key: type,
                              className: 'brBgColorEditEntryItemTypeMenuItem',
                              dropDown: true,
                              onClick:
                                _this2.handleBgColorEditEntryItemTypeMenuItemClick.bind(
                                  _this2,
                                  type,
                                ),
                            },
                            _this2.localizeType(type),
                          )
                        }),
                      ),
                      /*#__PURE__*/ _react.default.createElement(
                        _reactNative.Text,
                        {
                          style: styles.brBr1,
                        },
                      ),
                      /*#__PURE__*/ _react.default.createElement(
                        _DropDownMenu.default,
                        {
                          uiData: props.uiData,
                          className: 'brBgColorEditEntryItemFormatMenu',
                          dialogClassName: 'brBgColorEditEntryItemDialog',
                          text: _this2.localizeFormat(
                            _this2.state.editingFormat,
                          ),
                        },
                        (_this2.state.editingType === 'conf_type'
                          ? ['^userchatconf$', '^webchat$']
                          : ['exact', 'forward', 'backward', 'partial']
                        ).map(function (format) {
                          return /*#__PURE__*/ _react.default.createElement(
                            _MenuItem.default,
                            {
                              key: format,
                              className: 'brBgColorEditEntryItemFormatMenuItem',
                              dropDown: true,
                              onClick:
                                _this2.handleBgColorEditEntryItemFormatMenuItemClick.bind(
                                  _this2,
                                  format,
                                ),
                            },
                            _this2.localizeFormat(format),
                          )
                        }),
                      ),
                      /*#__PURE__*/ _react.default.createElement(
                        _reactNative.Text,
                        {
                          style: styles.brBr2,
                        },
                      ),
                      /*#__PURE__*/ _react.default.createElement(
                        _TextBox.default,
                        {
                          className: 'brBgColorEditEntryItemDataInput',
                          value: _this2.state.editingData,
                          onChange:
                            _this2.handleBgColorEditEntryItemDataInputChange.bind(
                              _this2,
                            ),
                        },
                      ),
                      /*#__PURE__*/ _react.default.createElement(
                        _DropDownMenu.default,
                        {
                          uiData: props.uiData,
                          className: 'brBgColorEditEntryItemColorMenu',
                          dialogClassName: 'brBgColorEditEntryItemDialog',
                          text: /*#__PURE__*/ _react.default.createElement(
                            _reactNative.View,
                            {
                              style: styles.colorSwatch,
                            },
                          ),
                        },
                        colorCands.map(function (color) {
                          return /*#__PURE__*/ _react.default.createElement(
                            _MenuItem.default,
                            {
                              key: color,
                              className: 'brBgColorEditEntryItemColorMenuItem',
                              dropDown: true,
                              onClick:
                                _this2.handleBgColorEditEntryItemColorMenuItemClick.bind(
                                  _this2,
                                  color,
                                ),
                            },
                            /*#__PURE__*/ _react.default.createElement(
                              _reactNative.View,
                              {
                                style: [
                                  styles.colorSwatch,
                                  {
                                    backgroundColor: color,
                                  },
                                ],
                              },
                            ),
                          )
                        }),
                        /*#__PURE__*/ _react.default.createElement(
                          _MenuItem.default,
                          {
                            className: 'brBgColorEditEntryItemColorMenuItem',
                            dropDown: true,
                          },
                          /*#__PURE__*/ _react.default.createElement(
                            _reactNative.TouchableOpacity,
                            {
                              style: styles.colorMenuItem,
                              onPress:
                                _this2.handleBgColorEditEntryItemColorMenuItemCustomColorColorClick.bind(
                                  _this2,
                                ),
                            },
                            /*#__PURE__*/ _react.default.createElement(
                              _reactNative.View,
                              {
                                style: styles.colorMenuItemColor,
                              },
                            ),
                          ),
                          /*#__PURE__*/ _react.default.createElement(
                            _TextBox.default,
                            {
                              className:
                                'brBgColorEditEntryItemColorMenuItemCustomColorInput',
                              value: _this2.state.editingCustomColor,
                              onChange:
                                _this2.handleBgColorEditEntryItemColorMenuItemCustomColorInputChange.bind(
                                  _this2,
                                ),
                              onKeyDown:
                                _this2.handleBgColorEditEntryItemColorMenuItemCustomColorInputKeyDown.bind(
                                  _this2,
                                ),
                            },
                          ),
                        ),
                      ),
                    ),
                    /*#__PURE__*/ _react.default.createElement(
                      _reactNative.TouchableOpacity,
                      {
                        style: styles.editButton,
                        onPress:
                          _this2.handleBgColorEditEntryItemEditButtonClick.bind(
                            _this2,
                            i,
                          ),
                      },
                      /*#__PURE__*/ _react.default.createElement(
                        _reactNative.Text,
                        {
                          style: styles.editButtonText,
                        },
                        '\u270E',
                      ),
                    ),
                  ),
                )
              }
            }),
          ),
        )
      },
    },
  ])
})(_react.default.Component))
var styles = _reactNative.StyleSheet.create({
  brBgColorEditForm: {
    padding: 8,
    paddingHorizontal: 32,
  },
  brBgColorEditButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 4,
  },
  brBgColorEditButton: {
    marginLeft: 8,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  brBgColorEditEntries: {
    width: 300,
    height: 200,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    // @platinum equivalent
    borderRadius: 4,
  },
  brBgColorEditEntryItem: {
    position: 'relative',
    paddingVertical: 8,
    paddingLeft: 12,
    paddingRight: 116,
    fontSize: 13,
    fontWeight: '400',
    letterSpacing: 0.3,
  },
  brBgColorEditEntryItemArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brBgColorEditEntryItemLabelArea: {
    flexDirection: 'column',
  },
  brBgColorEditEntryItemType: {
    fontSize: 13,
    color: '#1A2B2B',
    // @dark_jungle_green equivalent
    letterSpacing: 0.3,
  },
  brBr1: {
    marginBottom: 4,
  },
  brBgColorEditEntryItemFormat: {
    fontSize: 13,
    color: '#1A2B2B',
    // @dark_jungle_green equivalent
    letterSpacing: 0.3,
  },
  brBr2: {
    marginBottom: 4,
  },
  brBgColorEditEntryItemData: {
    fontSize: 13,
    color: '#1A2B2B',
    // @dark_jungle_green equivalent
    letterSpacing: 0.3,
  },
  brBgColorEditEntryItemColorContainer: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    position: 'absolute',
    right: 76,
  },
  colorSwatch: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    position: 'absolute',
    right: 76,
  },
  editButton: {
    position: 'absolute',
    right: 36,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    position: 'absolute',
    right: 0,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  deleteButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  brBgColorEditEntryItemInputArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brBgColorEditEntryItemColorMenu: {
    marginLeft: 8,
  },
  brBgColorEditEntryItemColorMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brBgColorEditEntryItemColorMenuItemColor: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginRight: 8,
  },
  brBgColorEditEntryItemColorMenuItemLabel: {
    fontSize: 13,
    color: '#1A2B2B',
    // @dark_jungle_green equivalent
    letterSpacing: 0.3,
  },
  brBgColorEditEntryItemColorMenuItemCustomColorColor: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginRight: 8,
  },
  brBgColorEditEntryItemColorMenuItemCustomColorInput: {
    flex: 1,
  },
  colorMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorMenuItemColor: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginRight: 8,
  },
  // Add more styles as needed...
})
