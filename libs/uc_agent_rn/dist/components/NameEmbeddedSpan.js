'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _reactNative = require('react-native')
var _strings = require('../utilities/strings')
/*
 * props.ucUiStore - UI store for getting user information
 * props.format - Format string with {0} placeholder for user name
 * props.title - Title string with {0} placeholder for user name
 * props.buddy - Buddy object containing user information
 * props.style - Additional styles
 */
var NameEmbeddedSpan = function NameEmbeddedSpan(props) {
  var format = (0, _strings.string)(props.format)
  var title = (0, _strings.string)(props.title)
  var messages = format.split('{0}')
  var titleMessages = title.split('{0}')
  var user = props.buddy && props.ucUiStore.getBuddyUserForUi(props.buddy)
  var user_name = (0, _strings.string)(user && user.name)
  var stylesToApply = [styles.nameEmbeddedSpan]
  if (user && user.isMe) {
    stylesToApply.push(styles.isMe)
  }
  if (user && user.isBuddy) {
    stylesToApply.push(styles.isBuddy)
  }
  if (user && user.isTemporaryBuddy) {
    stylesToApply.push(styles.isTemporaryBuddy)
  }
  if (props.style) {
    stylesToApply.push(props.style)
  }
  return /*#__PURE__*/ React.createElement(
    _reactNative.Text,
    {
      style: stylesToApply,
      accessibilityHint: titleMessages.join(user_name),
    },
    messages.join(user_name),
  )
}
var colors = {
  portlandOrange: '#FF4526', // @portland_orange
}
var styles = _reactNative.StyleSheet.create({
  nameEmbeddedSpan: {},
  isMe: {
    color: colors.portlandOrange,
  },
  isBuddy: {},
  isTemporaryBuddy: {},
})
var _default = (exports.default = NameEmbeddedSpan)
