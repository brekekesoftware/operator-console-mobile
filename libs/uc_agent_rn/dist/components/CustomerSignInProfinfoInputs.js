'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _reactNative = require('react-native')
var _strings = require('../utilities/strings')
var _CustomerSignInProfinfoInputSelect = _interopRequireDefault(
  require('./CustomerSignInProfinfoInputSelect'),
)
var _CustomerSignInProfinfoInputInput = _interopRequireDefault(
  require('./CustomerSignInProfinfoInputInput'),
)
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e }
}
/**
 * CustomerSignInProfinfoInputs
 * props.uiData
 * props.uiData.configurations
 */
var _default = (exports.default = function _default(props) {
  if (
    props.uiData.configurations.profinfoInputs &&
    props.uiData.configurations.profinfoInputs.length
  ) {
    var _props$uiData$configu,
      _props$uiData$configu2,
      _props$uiData$configu3,
      _props$uiData$configu4
    // Get custom styles from configurations
    var areaStyles =
      ((_props$uiData$configu =
        props.uiData.configurations.signInFormStyles) === null ||
      _props$uiData$configu === void 0
        ? void 0
        : _props$uiData$configu.brSignInProfinfoInputsArea) || {}
    var labelStyles =
      ((_props$uiData$configu2 =
        props.uiData.configurations.signInFormStyles) === null ||
      _props$uiData$configu2 === void 0
        ? void 0
        : _props$uiData$configu2.brSignInProfinfoInputsLabel) || {}
    var inputAreaStyles =
      ((_props$uiData$configu3 =
        props.uiData.configurations.signInFormStyles) === null ||
      _props$uiData$configu3 === void 0
        ? void 0
        : _props$uiData$configu3.brSignInProfinfoInputArea) || {}
    var inputLabelStyles =
      ((_props$uiData$configu4 =
        props.uiData.configurations.signInFormStyles) === null ||
      _props$uiData$configu4 === void 0
        ? void 0
        : _props$uiData$configu4.brSignInProfinfoInputLabel) || {}
    return /*#__PURE__*/ React.createElement(
      _reactNative.View,
      {
        style: [styles.brSignInProfinfoInputsArea, areaStyles],
      },
      /*#__PURE__*/ React.createElement(
        _reactNative.Text,
        {
          style: [styles.brSignInProfinfoInputsLabel, labelStyles],
        },
        props.uiData.configurations.profinfoInputsInnerHTML
          ? props.uiData.configurations.profinfoInputsInnerHTML.replace(
              /<[^>]*>/g,
              '',
            )
          : (0, _strings.string)(
              props.uiData.configurations.profinfoInputsLabel,
            ),
      ),
      props.uiData.configurations.profinfoInputs.map(function (o) {
        return /*#__PURE__*/ React.createElement(
          _reactNative.View,
          {
            key: o.key,
            style: [styles.brSignInProfinfoInputArea, inputAreaStyles],
          },
          /*#__PURE__*/ React.createElement(
            _reactNative.View,
            {
              style: styles.labelContainer,
            },
            /*#__PURE__*/ React.createElement(
              _reactNative.Text,
              {
                style: [styles.brSignInProfinfoInputLabel, inputLabelStyles],
              },
              o.innerHTML
                ? o.innerHTML.replace(/<[^>]*>/g, '')
                : (0, _strings.string)(o.label),
            ),
            o.mandatory &&
              /*#__PURE__*/ React.createElement(
                _reactNative.Text,
                {
                  style: styles.mandatoryIndicator,
                },
                '*',
              ),
          ),
          o.options && o.options.length
            ? /*#__PURE__*/ React.createElement(
                _CustomerSignInProfinfoInputSelect.default,
                {
                  uiData: props.uiData,
                  profinfoInput: o,
                },
              )
            : /*#__PURE__*/ React.createElement(
                _CustomerSignInProfinfoInputInput.default,
                {
                  uiData: props.uiData,
                  profinfoInput: o,
                },
              ),
        )
      }),
    )
  } else {
    return null
  }
})
var styles = _reactNative.StyleSheet.create({
  brSignInProfinfoInputsArea: {
    width: 180,
    marginVertical: 8,
    marginHorizontal: 'auto',
    alignSelf: 'center',
  },
  brSignInProfinfoInputsLabel: {
    width: 180,
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  brSignInProfinfoInputArea: {
    width: 180,
    marginVertical: 8,
    marginHorizontal: 'auto',
    alignItems: 'center',
    alignSelf: 'center',
  },
  labelContainer: {
    width: 180,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  brSignInProfinfoInputLabel: {
    width: 180,
    textAlign: 'left',
    fontSize: 16,
    color: '#333',
  },
  mandatoryIndicator: {
    color: '#bb7755',
    marginLeft: 2,
    fontSize: 16,
  },
})
