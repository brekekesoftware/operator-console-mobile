'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _reactNative = require('react-native')
var _strings = require('../utilities/strings.js')
var _jsxRuntime = require('react/jsx-runtime')
/**
 * CustomerSignInProfinfoInputInput - React Native version
 * A text input component for sign-in profile information
 *
 * props.uiData - UI data object
 * props.uiData.configurations - Configuration properties
 * props.uiData.signInProfinfoInputsValue - Input values
 * props.uiData.signInProfileInfoInputInput_onChange - Change handler
 * props.profinfoInput - Profile info input configuration
 */
var _default = (exports.default = function _default(props) {
  var handleChangeText = function handleChangeText(text) {
    var event = {
      target: {
        value: text,
      },
    }
    props.uiData.fire(
      'signInProfileInfoInputInput_onChange',
      props.profinfoInput,
      event,
    )
  }
  var inputValue = (0, _strings.string)(
    props.uiData.signInProfinfoInputsValue[props.profinfoInput.key],
  )
  var customStyle =
    props.uiData.configurations.signInFormStyles &&
    props.uiData.configurations.signInFormStyles.brSignInProfinfoInputInput
  return /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.TextInput, {
    style: [styles.signInProfinfoInputInput, customStyle],
    value: inputValue,
    placeholder: props.profinfoInput.placeholder,
    autoCapitalize: props.profinfoInput.autoCapitalize || 'none',
    onChangeText: handleChangeText,
    autoCorrect: false,
    underlineColorAndroid: 'transparent',
  })
})
var styles = _reactNative.StyleSheet.create({
  signInProfinfoInputInput: {
    width: 180,
    height: 40,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
})
