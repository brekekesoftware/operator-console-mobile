'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _uawmsgs = _interopRequireDefault(require('../utilities/uawmsgs'))
var _SimpleButton = _interopRequireDefault(require('./SimpleButton'))
var _reactNative = require('react-native')
var _jsxRuntime = require('react/jsx-runtime')
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e }
}
/**
 * PanelHeaderDockButton
 * props.uiData
 * props.uiData.panelHeaderDockButton_onClick
 * props.panelType
 * props.panelCode
 * props.disabled
 */
var _default = (exports.default = function _default(props) {
  return /*#__PURE__*/ (0, _jsxRuntime.jsx)(_SimpleButton.default, {
    title: _uawmsgs.default.LBL_PANEL_HEADER_DOCK_BUTTON_TOOLTIP,
    disabled: props.disabled,
    onClick: props.uiData.fire.bind(
      props.uiData,
      'panelHeaderDockButton_onClick',
      props.panelType,
      props.panelCode,
    ),
    children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Image, {
      source: require('../images/panelheaderdock.png'),
    }),
  })
})
