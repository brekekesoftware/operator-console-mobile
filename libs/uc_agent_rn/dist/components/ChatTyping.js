'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _reactNative = require('react-native')
var _uawmsgs = _interopRequireDefault(require('../utilities/uawmsgs'))
var _NameEmbeddedSpan = _interopRequireDefault(require('./NameEmbeddedSpan'))
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e }
}
var colors = {
  darkGray: '#666666',
}
var styles = _reactNative.StyleSheet.create({
  chatTyping: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 20.8,
    // 1.6 * 13
    letterSpacing: 0.3,
    paddingLeft: 16,
    color: colors.darkGray,
  },
  emptySpace: {
    height: 20.8,
  },
})

/**
 * ChatTyping
 * props.uiData
 * props.uiData.ucUiStore
 * props.panelType
 * props.panelCode
 */
var _default = (exports.default = function _default(props) {
  var typingBuddy = props.uiData.ucUiStore.getTypingBuddy({
    chatType: props.panelType,
    chatCode: props.panelCode,
  })
  if (typingBuddy && typingBuddy.user_id) {
    return /*#__PURE__*/ React.createElement(
      _reactNative.View,
      {
        style: styles.chatTyping,
      },
      /*#__PURE__*/ React.createElement(_NameEmbeddedSpan.default, {
        ucUiStore: props.uiData.ucUiStore,
        format: _uawmsgs.default.MSG_TYPING,
        buddy: typingBuddy,
      }),
    )
  } else {
    return /*#__PURE__*/ React.createElement(
      _reactNative.View,
      {
        style: [styles.chatTyping, styles.emptySpace],
      },
      /*#__PURE__*/ React.createElement(_reactNative.Text, null, '\xA0'),
    )
  }
})
