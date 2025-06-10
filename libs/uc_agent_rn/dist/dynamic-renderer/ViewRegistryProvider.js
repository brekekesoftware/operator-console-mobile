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
exports.useViewRenderer = exports.ViewRegistryProvider = void 0
var _react = _interopRequireWildcard(require('react'))
var _globalRenderer = require('./globalRenderer')
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
var ViewRegistryContext = /*#__PURE__*/ (0, _react.createContext)(null)
var ViewRegistryProvider = (exports.ViewRegistryProvider =
  function ViewRegistryProvider(_ref) {
    var children = _ref.children
    var registry = (0, _react.useRef)(new Map())
    var register = function register(id, setChild) {
      registry.current.set(id, setChild)
    }
    var unregister = function unregister(id) {
      registry.current.delete(id)
    }
    var renderTo = function renderTo(id, element) {
      var setChild = registry.current.get(id)
      if (setChild) {
        setChild(function () {
          return element
        })
      } else {
        console.warn('[DynamicRenderer] can not find view "'.concat(id, '"'))
      }
    }
    ;(0, _react.useEffect)(function () {
      ;(0, _globalRenderer.setGlobalRenderer)(renderTo)
    }, [])
    return /*#__PURE__*/ (0, _jsxRuntime.jsx)(ViewRegistryContext.Provider, {
      value: {
        register: register,
        unregister: unregister,
        renderTo: renderTo,
      },
      children: children,
    })
  })
var useViewRenderer = (exports.useViewRenderer = function useViewRenderer() {
  var context = (0, _react.useContext)(ViewRegistryContext)
  if (!context) {
    throw new Error(
      'useViewRenderer must be used within a ViewRegistryProvider',
    )
  }
  return context
})
