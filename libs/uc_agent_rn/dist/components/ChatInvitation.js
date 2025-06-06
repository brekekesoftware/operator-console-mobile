'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _reactNative = require('react-native')
var _uawmsgs = _interopRequireDefault(require('../utilities/uawmsgs'))
var _constants = _interopRequireDefault(require('../utilities/constants'))
var _strings = require('../utilities/strings')
var _ButtonLabeled = _interopRequireDefault(require('./ButtonLabeled'))
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e }
}
/**
 * ChatInvitation
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.chatInvitationJoinButton_onClick
 * props.uiData.chatInvitationRejectButton_onClick
 * props.panelType
 * props.panelCode
 */
var _default = (exports.default = function _default(props) {
  var conf_id =
    props.panelType === 'CONFERENCE' &&
    (0, _strings.string)(
      props.uiData.ucUiStore.getChatHeaderInfo({
        chatType: props.panelType,
        chatCode: props.panelCode,
      }).conf_id,
    )
  var conference =
    conf_id && props.uiData.ucUiStore.getChatClient().getConference(conf_id)
  if (
    !conference ||
    conference.conf_status !== _constants.default.CONF_STATUS_INVITED ||
    props.uiData.ucUiStore.getConfInJoinProcTable()[conf_id]
  ) {
    return null
  }
  if (conference.invite_properties && conference.invite_properties.rejoinable) {
    return /*#__PURE__*/ React.createElement(
      _reactNative.View,
      {
        style: styles.brChatInvitationVisible,
      },
      /*#__PURE__*/ React.createElement(
        _ButtonLabeled.default,
        {
          style: styles.brJoinButton,
          vivid: true,
          title: _uawmsgs.default.LBL_CONFERENCE_REJOIN_BUTTON_TOOLTIP,
          onPress: function onPress() {
            return props.uiData.fire(
              'chatInvitationJoinButton_onClick',
              props.panelType,
              props.panelCode,
            )
          },
        },
        /*#__PURE__*/ React.createElement(
          _reactNative.Text,
          {
            style: styles.brTextButton,
          },
          _uawmsgs.default.LBL_CONFERENCE_REJOIN_BUTTON,
        ),
      ),
    )
  }
  return /*#__PURE__*/ React.createElement(
    _reactNative.View,
    {
      style: styles.brChatInvitationVisible,
    },
    /*#__PURE__*/ React.createElement(
      _ButtonLabeled.default,
      {
        style: styles.brJoinButton,
        vivid: true,
        title: _uawmsgs.default.LBL_CONFERENCE_JOIN_BUTTON_TOOLTIP,
        onPress: function onPress() {
          return props.uiData.fire(
            'chatInvitationJoinButton_onClick',
            props.panelType,
            props.panelCode,
          )
        },
      },
      /*#__PURE__*/ React.createElement(
        _reactNative.Text,
        {
          style: styles.brTextButton,
        },
        _uawmsgs.default.LBL_CONFERENCE_JOIN_BUTTON,
      ),
    ),
    /*#__PURE__*/ React.createElement(
      _ButtonLabeled.default,
      {
        style: styles.brRejectButton,
        title: _uawmsgs.default.LBL_CONFERENCE_REJECT_BUTTON_TOOLTIP,
        onPress: function onPress() {
          return props.uiData.fire(
            'chatInvitationRejectButton_onClick',
            props.panelType,
            props.panelCode,
          )
        },
      },
      /*#__PURE__*/ React.createElement(
        _reactNative.Text,
        {
          style: styles.brTextButton,
        },
        _uawmsgs.default.LBL_CONFERENCE_REJECT_BUTTON,
      ),
    ),
  )
})
var styles = _reactNative.StyleSheet.create({
  brChatInvitationVisible: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingLeft: 16,
    paddingRight: 0,
  },
  brJoinButton: {
    minWidth: 80,
    marginRight: 8,
  },
  brRejectButton: {
    minWidth: 80,
    marginRight: 8,
  },
  brTextButton: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
})
