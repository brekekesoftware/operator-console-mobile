'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _ChatMessage = _interopRequireDefault(require('./ChatMessage'))
var _reactNative = require('react-native')
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
    return /*#__PURE__*/ React.createElement(_ChatMessage.default, {
      key: message.key,
      uiData: props.uiData,
      message: message,
      isLastOfLast: props.isLast && index === array.length - 1,
    })
  })
  console.log('#Duy Phan console messageNodes', messageNodes.length)
  return /*#__PURE__*/ React.createElement(
    _reactNative.View,
    null,
    messageNodes,
  )
})
