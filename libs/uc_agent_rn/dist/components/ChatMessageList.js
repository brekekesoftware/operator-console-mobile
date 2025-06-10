'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _ChatMessage = _interopRequireDefault(require('./ChatMessage'))
var _reactNative = require('react-native')
var _jsxRuntime = require('react/jsx-runtime')
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e }
}
/**
 * ChatMessageList
 * props.uiData
 * props.uiData.ucUiStore
 * props.messageList
 * props.isLast
 */
var _default = (exports.default = function _default(props) {
  var messageNodes = props.messageList.map(function (message, index, array) {
    return /*#__PURE__*/ (0, _jsxRuntime.jsx)(
      _ChatMessage.default,
      {
        uiData: props.uiData,
        message: message,
        isLastOfLast: props.isLast && index === array.length - 1,
      },
      message.key,
    )
  })
  console.log('#Duy Phan console messageNodes', messageNodes.length)
  return /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
    children: messageNodes,
  })
})
