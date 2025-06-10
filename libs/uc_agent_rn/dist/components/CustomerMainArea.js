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
var _strings = require('../utilities/strings')
var _reactDom = _interopRequireDefault(require('react-dom'))
var _CustomerSignInArea = _interopRequireDefault(
  require('./CustomerSignInArea'),
)
var _CustomerChatArea = _interopRequireDefault(require('./CustomerChatArea'))
var _CustomerCallArea = _interopRequireDefault(require('./CustomerCallArea'))
var _CustomerEditorArea = _interopRequireDefault(
  require('./CustomerEditorArea'),
)
var _DndableSafe = _interopRequireDefault(require('./DndableSafe'))
var _jsxRuntime = require('react/jsx-runtime')
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
} /**
 * CustomerMainArea
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.configurations
 * props.uiData.mainArea_onDrop
 */
var _default = (exports.default = /*#__PURE__*/ (function (_React$Component) {
  function _default(props) {
    var _this
    _classCallCheck(this, _default)
    _this = _callSuper(this, _default, [props])
    _this.state = {
      editorAreaDisabled: false,
    }
    return _this
  }
  _inherits(_default, _React$Component)
  return _createClass(_default, [
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        var props = this.props
        var newState = {}
        var chatArea = _reactDom.default.findDOMNode(this.refs['chatArea'])
        if (
          chatArea &&
          chatArea.querySelector &&
          chatArea.querySelector(
            '.brReplyButton:not(.brDisabled):not(.brEnableEditor)',
          )
        ) {
          if (!this.state.editorAreaDisabled) {
            newState.editorAreaDisabled = true
          }
        } else {
          if (this.state.editorAreaDisabled) {
            newState.editorAreaDisabled = false
          }
        }
        if (Object.keys(newState).length) {
          this.setState(newState)
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        var props = this.props
        var myUcCimUserType = (0, _strings.int)(
          props.uiData.ucUiStore.getUcCimUserType(),
        )
        var conf_id = props.uiData.ucUiStore.getGuestConfId()
        var panelCode = (0, _strings.string)(
          props.uiData.ucUiStore.getChatCodeByConfId({
            conf_id: conf_id,
          }).chatCode,
        )
        var className = 'brMainArea'
        var withMenuOptions = false
        if (!conf_id) {
          return /*#__PURE__*/ (0, _jsxRuntime.jsx)('div', {
            className: className,
            children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
              _CustomerSignInArea.default,
              {
                uiData: props.uiData,
              },
            ),
          })
        } else {
          if (
            props.uiData.configurations &&
            props.uiData.configurations.menuOptions &&
            props.uiData.configurations.menuOptions.length
          ) {
            className += ' brWithMenuOptions'
            withMenuOptions = true
          }
          return /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_DndableSafe.default, {
            uiData: props.uiData,
            dndableClass:
              ((0, _strings.int)(
                props.uiData.ucUiStore.getOptionalSetting({
                  key: 'fsp',
                }),
              ) &
                myUcCimUserType) !==
              myUcCimUserType
                ? 'FileDndable'
                : '',
            className: className,
            onDrop: props.uiData.fire.bind(
              props.uiData,
              'mainArea_onDrop',
              'CONFERENCE',
              panelCode,
            ),
            children: [
              /*#__PURE__*/ (0, _jsxRuntime.jsx)(_CustomerCallArea.default, {
                uiData: props.uiData,
                withMenuOptions: withMenuOptions,
              }),
              /*#__PURE__*/ (0, _jsxRuntime.jsx)(_CustomerChatArea.default, {
                ref: 'chatArea',
                uiData: props.uiData,
                panelType: 'CONFERENCE',
                panelCode: panelCode,
                withMenuOptions: withMenuOptions,
              }),
              /*#__PURE__*/ (0, _jsxRuntime.jsx)(_CustomerEditorArea.default, {
                uiData: props.uiData,
                panelType: 'CONFERENCE',
                panelCode: panelCode,
                withMenuOptions: withMenuOptions,
                disabled: this.state.editorAreaDisabled,
              }),
            ],
          })
        }
      },
    },
  ])
})(_react.default.Component))
