'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _uawmsgs = _interopRequireDefault(require('../utilities/uawmsgs'))
var _constants = _interopRequireDefault(require('../utilities/constants'))
var _ToolbarButton = _interopRequireDefault(require('./ToolbarButton'))
var _widgetconstants = _interopRequireDefault(
  require('../utilities/widgetconstants'),
)
var _reactNative = require('react-native')
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e }
}
/**
 * WebchatPickupButton
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.webchatPickupButton_onClick
 * props.disabled
 */
var _default = (exports.default = function _default(props) {
  var waitingCount = props.uiData.ucUiStore
    .getWebchatQueueList()
    .filter(function (webchatQueue) {
      var conf_id = webchatQueue.conf_id
      var conference = props.uiData.ucUiStore
        .getChatClient()
        .getConference(conf_id)
      return (
        conference.conf_status ===
        _constants.default.CONF_STATUS_INVITED_WEBCHAT
      )
    }).length
  return /*#__PURE__*/ React.createElement(
    _reactNative.View,
    null,
    /*#__PURE__*/ React.createElement(_ToolbarButton.default, {
      iconSource: require('../images/webchatpickup.png'),
      title: _uawmsgs.default.LBL_WEBCHAT_PICKUP_BUTON_TOOLTIP,
      clickableInterval: _widgetconstants.default.CLICKABLE_INTERVAL,
      disabled: props.disabled || waitingCount === 0,
      onPress: props.uiData.fire.bind(
        props.uiData,
        'webchatPickupButton_onClick',
        {},
      ),
    }),
  )
})
