'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _uawmsgs = _interopRequireDefault(require('../utilities/uawmsgs'))
var _ToolbarButton = _interopRequireDefault(require('./ToolbarButton'))
var _widgetconstants = _interopRequireDefault(
  require('../utilities/widgetconstants'),
)
var _reactNative = require('react-native')
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e }
}
/**
 * SearchDialogButton
 * props.uiData
 * props.uiData.searchDialogButton_onClick
 * props.disabled
 */
var _default = (exports.default = function _default(props) {
  return /*#__PURE__*/ React.createElement(
    _reactNative.View,
    null,
    /*#__PURE__*/ React.createElement(_ToolbarButton.default, {
      iconSource: require('../images/searchdialog.png'),
      title: _uawmsgs.default.LBL_SEARCH_DIALOG_BUTTON_TOOLTIP,
      clickableInterval: _widgetconstants.default.CLICKABLE_INTERVAL,
      disabled: props.disabled,
      onPress: props.uiData.fire.bind(
        props.uiData,
        'searchDialogButton_onClick',
        {},
      ),
    }),
  )
})
