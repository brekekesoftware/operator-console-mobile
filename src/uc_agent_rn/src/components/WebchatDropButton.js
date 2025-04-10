import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ToolbarButton from './ToolbarButton.js'
import { parsePanelKey } from '../utilities/strings.js'
import WidgetConstants from '../utilities/widgetconstants.js'
import { View } from 'react-native'

/**
 * WebchatDropButton
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.currentSelectedTab
 * props.uiData.webchatDropButton_onClick
 * props.disabled
 */
export default props => {
  let enabled = false
  const panel = parsePanelKey(props.uiData.currentSelectedTab)
  if (panel.panelType === 'CONFERENCE') {
    const conf_id = string(
      props.uiData.ucUiStore.getChatHeaderInfo({
        chatType: panel.panelType,
        chatCode: panel.panelCode,
      }).conf_id,
    )
    const conference = props.uiData.ucUiStore
      .getChatClient()
      .getConference(conf_id)
    //const isTalking = conference.conf_type === 'webchat' ?
    //    props.uiData.ucUiStore.getWebchatQueue({ conf_id: conf_id }).isTalking :
    //    conference.conf_status === Constants.CONF_STATUS_JOINED;
    if (
      conference.conf_status === Constants.CONF_STATUS_JOINED /* isTalking */
    ) {
      enabled = true
    }
  }
  return (
    <View>
      <ToolbarButton
        iconSource={require('../images/webchatdrop.png')}
        title={uawMsgs.LBL_WEBCHAT_DROP_BUTON_TOOLTIP}
        clickableInterval={WidgetConstants.CLICKABLE_INTERVAL}
        disabled={props.disabled || !enabled}
        onPress={props.uiData.fire.bind(
          props.uiData,
          'webchatDropButton_onClick',
          {},
        )}
      />
    </View>
  )
}
