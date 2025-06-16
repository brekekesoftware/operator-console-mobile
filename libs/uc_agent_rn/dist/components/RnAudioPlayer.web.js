'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.RnAudioPlayer = void 0
var _jsxRuntime = require('react/jsx-runtime')
var RnAudioPlayer = (exports.RnAudioPlayer = function RnAudioPlayer(_ref) {
  var source = _ref.source
  return /*#__PURE__*/ (0, _jsxRuntime.jsx)('audio', {
    autoPlay: true,
    loop: false,
    src: source,
    muted: false,
    style: {
      display: 'none',
    },
  })
})
