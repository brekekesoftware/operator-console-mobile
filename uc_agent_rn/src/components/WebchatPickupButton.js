import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ToolbarButton from './ToolbarButton.js'
import WidgetConstants from '../utilities/widgetconstants.js'
import { View } from 'react-native'

/**
 * WebchatPickupButton
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.webchatPickupButton_onClick
 * props.disabled
 */
export default props => {
  const waitingCount = props.uiData.ucUiStore
    .getWebchatQueueList()
    .filter(webchatQueue => {
      const conf_id = webchatQueue.conf_id
      const conference = props.uiData.ucUiStore
        .getChatClient()
        .getConference(conf_id)
      return conference.conf_status === Constants.CONF_STATUS_INVITED_WEBCHAT
    }).length
  return (
    <View>
      <ToolbarButton
        iconSource={require('../images/webchatpickup.png')}
        title={uawMsgs.LBL_WEBCHAT_PICKUP_BUTON_TOOLTIP}
        clickableInterval={WidgetConstants.CLICKABLE_INTERVAL}
        disabled={props.disabled || waitingCount === 0}
        onPress={props.uiData.fire.bind(
          props.uiData,
          'webchatPickupButton_onClick',
          {},
        )}
      />
    </View>
  )
}
