'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _react = _interopRequireDefault(require('react'))
var _reactNative = require('react-native')
var _uawmsgs = _interopRequireDefault(require('../utilities/uawmsgs'))
var _CustomerSignInError = _interopRequireDefault(
  require('./CustomerSignInError'),
)
var _CustomerSignInProfinfoInputs = _interopRequireDefault(
  require('./CustomerSignInProfinfoInputs'),
)
var _CustomerSignInWebchatOptionsSelect = _interopRequireDefault(
  require('./CustomerSignInWebchatOptionsSelect'),
)
var _reactNativeLinearGradient = require('react-native-linear-gradient')
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e }
}
/**
 * CustomerSignInArea - React Native version
 * A component for user sign-in area
 *
 * props.uiData - UI data object
 * props.uiData.ucUiStore - UI store
 * props.uiData.configurations - Configuration properties
 * props.uiData.signInButton_onClick - Sign-in button click handler
 */
var _default = (exports.default = function _default(props) {
  var isAutoSigning =
    props.uiData.configurations.autoSignIn &&
    props.uiData.ucUiStore.getSignInStatus() === 2
  if (isAutoSigning) {
    return null
  }
  var customSignInAreaStyle =
    props.uiData.configurations.signInFormStyles &&
    props.uiData.configurations.signInFormStyles.brSignInArea
  var customFormAreaStyle =
    props.uiData.configurations.signInFormStyles &&
    props.uiData.configurations.signInFormStyles.brSignInFormArea
  var customButtonStyle =
    props.uiData.configurations.signInFormStyles &&
    props.uiData.configurations.signInFormStyles.brSignInButton
  var handleSignIn = function handleSignIn() {
    props.uiData.fire('signInButton_onClick')
  }
  var buttonContent
  if (props.uiData.configurations.signInButtonInnerHTML) {
    // TODO: Add HTML support
    buttonContent = props.uiData.configurations.signInButtonInnerHTML.replace(
      /<[^>]*>/g,
      '',
    ) // Remove HTML tags for basic support
  } else {
    buttonContent =
      props.uiData.configurations.signInButtonLabel ||
      _uawmsgs.default.LBL_SIGN_IN_BUTTON
  }
  return /*#__PURE__*/ _react.default.createElement(
    _reactNative.ScrollView,
    {
      style: [styles.signInArea, customSignInAreaStyle],
      contentContainerStyle: styles.scrollContent,
    },
    /*#__PURE__*/ _react.default.createElement(
      _reactNative.View,
      {
        style: [styles.signInFormArea, customFormAreaStyle],
      },
      /*#__PURE__*/ _react.default.createElement(_CustomerSignInError.default, {
        uiData: props.uiData,
      }),
      /*#__PURE__*/ _react.default.createElement(
        _CustomerSignInProfinfoInputs.default,
        {
          uiData: props.uiData,
        },
      ),
      /*#__PURE__*/ _react.default.createElement(
        _CustomerSignInWebchatOptionsSelect.default,
        {
          uiData: props.uiData,
        },
      ),
      /*#__PURE__*/ _react.default.createElement(
        _reactNative.TouchableOpacity,
        {
          style: [styles.buttonContainer, customButtonStyle],
          onPress: handleSignIn,
          disabled: props.uiData.ucUiStore.getSignInStatus() === 2,
          activeOpacity: 0.7,
        },
        /*#__PURE__*/ _react.default.createElement(
          _reactNativeLinearGradient.LinearGradient,
          {
            colors: [
              'rgba(255,255,255,0.35)',
              'rgba(255,255,255,0.25)',
              'rgba(255,255,255,0.1)',
            ],
            style: styles.buttonGradient,
          },
          /*#__PURE__*/ _react.default.createElement(
            _reactNative.Text,
            {
              style: styles.buttonText,
            },
            buttonContent,
          ),
        ),
      ),
    ),
  )
})
var colors = {
  white: '#FFFFFF',
  buttonBorder: '#5fac3f',
  buttonBackground: '#6dbd4c',
  buttonHover: '#7bc85c',
  buttonActive: '#5aa63b',
}
var styles = _reactNative.StyleSheet.create({
  signInArea: {
    position: 'absolute',
    padding: 4,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.white,
  },
  scrollContent: {
    flexGrow: 1,
  },
  signInFormArea: {
    marginTop: 60,
  },
  buttonContainer: {
    alignSelf: 'center',
    width: 180,
    marginTop: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.buttonBorder,
    borderRadius: 1,
    overflow: 'hidden',
  },
  buttonGradient: {
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
  },
})
