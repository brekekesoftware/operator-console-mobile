'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _uawmsgs = _interopRequireDefault(require('../utilities/uawmsgs'))
var _constants = _interopRequireDefault(require('../utilities/constants'))
var _strings = require('../utilities/strings')
var _ToolbarButton = _interopRequireDefault(require('./ToolbarButton'))
var _widgetconstants = _interopRequireDefault(
  require('../utilities/widgetconstants'),
)
var _reactNative = require('react-native')
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e }
}
/**
 * WebchatDropButton
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.currentSelectedTab
 * props.uiData.webchatDropButton_onClick
 * props.disabled
 */
var _default = (exports.default = function _default(props) {
  var enabled = false
  var panel = (0, _strings.parsePanelKey)(props.uiData.currentSelectedTab)
  if (panel.panelType === 'CONFERENCE') {
    var conf_id = (0, _strings.string)(
      props.uiData.ucUiStore.getChatHeaderInfo({
        chatType: panel.panelType,
        chatCode: panel.panelCode,
      }).conf_id,
    )
    var conference = props.uiData.ucUiStore
      .getChatClient()
      .getConference(conf_id)
    //const isTalking = conference.conf_type === 'webchat' ?
    //    props.uiData.ucUiStore.getWebchatQueue({ conf_id: conf_id }).isTalking :
    //    conference.conf_status === Constants.CONF_STATUS_JOINED;
    if (
      conference.conf_status ===
      _constants.default.CONF_STATUS_JOINED /* isTalking */
    ) {
      enabled = true
    }
  }
  return /*#__PURE__*/ React.createElement(
    _reactNative.View,
    null,
    /*#__PURE__*/ React.createElement(_ToolbarButton.default, {
      iconSource: require('../images/webchatdrop.png'),
      title: _uawmsgs.default.LBL_WEBCHAT_DROP_BUTON_TOOLTIP,
      clickableInterval: _widgetconstants.default.CLICKABLE_INTERVAL,
      disabled: props.disabled || !enabled,
      onPress: props.uiData.fire.bind(
        props.uiData,
        'webchatDropButton_onClick',
        {},
      ),
    }),
  )
})
