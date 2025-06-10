'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.RnAudioPlayer = void 0
var _reactNative = require('react-native')
var _reactNativeVideo = _interopRequireDefault(require('react-native-video'))
var _jsxRuntime = require('react/jsx-runtime')
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e }
}
var css = _reactNative.StyleSheet.create({
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    display: 'none',
  },
})
var RnAudioPlayer = (exports.RnAudioPlayer = function RnAudioPlayer(_ref) {
  var source = _ref.source
  return /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNativeVideo.default, {
    source: source,
    style: css.video,
  })
})
