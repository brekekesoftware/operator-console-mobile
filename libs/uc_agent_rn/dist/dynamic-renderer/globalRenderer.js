'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.setGlobalRenderer = exports.renderToGlobal = void 0
var _react = _interopRequireDefault(require('react'))
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e }
}
var _renderTo = null
var setGlobalRenderer = (exports.setGlobalRenderer = function setGlobalRenderer(
  fn,
) {
  _renderTo = fn
})
var renderToGlobal = (exports.renderToGlobal = function renderToGlobal(
  viewId,
  Component,
) {
  var props =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {}
  if (!_renderTo) {
    console.warn('[DynamicRenderer] renderTo is not initialized!')
    return
  }
  var element = Component
    ? /*#__PURE__*/ _react.default.createElement(Component, props)
    : null
  _renderTo(viewId, element)
})
