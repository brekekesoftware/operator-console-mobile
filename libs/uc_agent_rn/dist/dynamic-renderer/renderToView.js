'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.renderToView = void 0
var _globalRenderer = require('./globalRenderer')
var renderToView = (exports.renderToView = function renderToView(
  viewId,
  Component,
) {
  var props =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {}
  ;(0, _globalRenderer.renderToGlobal)(viewId, Component, props)
})
