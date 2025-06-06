'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _uawmsgs = _interopRequireDefault(require('../utilities/uawmsgs'))
var _SimpleButton = _interopRequireDefault(require('./SimpleButton'))
var _reactNative = require('react-native')
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e }
}
/**
 * PanelHeaderHideButton
 * props.uiData
 * props.uiData.panelHeaderHideButton_onClick
 * props.panelType
 * props.panelCode
 * props.disabled
 */
var _default = (exports.default = function _default(props) {
  return /*#__PURE__*/ React.createElement(
    _SimpleButton.default,
    {
      title: _uawmsgs.default.LBL_PANEL_HEADER_HIDE_BUTTON_TOOLTIP,
      disabled: props.disabled,
      onPress: props.uiData.fire.bind(
        props.uiData,
        'panelHeaderHideButton_onClick',
        props.panelType,
        props.panelCode,
      ),
    },
    /*#__PURE__*/ React.createElement(_reactNative.Image, {
      source: require('../images/panelheaderhide.png'),
    }),
  )
})
