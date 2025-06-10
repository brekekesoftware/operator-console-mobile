'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _reactNative = require('react-native')
var _uawmsgs = _interopRequireDefault(require('../utilities/uawmsgs'))
var _strings = require('../utilities/strings')
var _jsxRuntime = require('react/jsx-runtime')
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e }
}
/**
 * CustomerSignInError - React Native version
 * A component that displays sign-in error messages
 *
 * props.uiData - UI data object
 * props.uiData.ucUiStore - UI store
 * props.uiData.configurations - Configuration properties
 */
var _default = (exports.default = function _default(props) {
  var errorMessage = (0, _strings.string)(
    props.uiData.ucUiStore.getSignInErrorMessage(),
  )
  var hasErrorMessage = errorMessage.length > 0
  var hasSignInFailed = props.uiData.ucUiStore.isSignInFailed()
  var isErrorReenterConf = props.uiData.ucUiStore.isErrorReenterConf()
  var showErrorArea =
    hasErrorMessage || (hasSignInFailed && !isErrorReenterConf)
  if (!showErrorArea) {
    return null
  }
  var customStyle =
    props.uiData.configurations.signInFormStyles &&
    props.uiData.configurations.signInFormStyles.brSignInErrorArea
  var customMessageStyle =
    props.uiData.configurations.signInFormStyles &&
    props.uiData.configurations.signInFormStyles.brSignInErrorMessage
  return /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
    style: [
      styles.signInErrorArea,
      hasErrorMessage && styles.withErrorMessage,
      hasSignInFailed && styles.signInFailed,
      hasSignInFailed && isErrorReenterConf && styles.errorReenterConf,
      customStyle,
    ],
    children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
      style: [styles.signInErrorMessage, customMessageStyle],
      children: errorMessage || _uawmsgs.default.MSG_SIGN_IN_FAILED,
    }),
  })
})
var colors = {
  errorBorder: '#bb7755',
  errorText: '#bb7755',
}
var styles = _reactNative.StyleSheet.create({
  signInErrorArea: {
    margin: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  withErrorMessage: {},
  signInFailed: {},
  errorReenterConf: {},
  signInErrorMessage: {
    borderWidth: 1,
    borderColor: colors.errorBorder,
    color: colors.errorText,
    marginHorizontal: 8,
    paddingVertical: 3,
    paddingHorizontal: 8,
    fontWeight: 'bold',
  },
})
