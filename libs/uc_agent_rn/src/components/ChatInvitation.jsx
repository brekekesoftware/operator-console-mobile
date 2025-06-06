import { View, StyleSheet, Text } from 'react-native'
import uawMsgs from '../utilities/uawmsgs'
import Constants from '../utilities/constants'
import { string } from '../utilities/strings'
import ButtonLabeled from './ButtonLabeled'

/**
 * ChatInvitation
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.chatInvitationJoinButton_onClick
 * props.uiData.chatInvitationRejectButton_onClick
 * props.panelType
 * props.panelCode
 */
export default props => {
  const conf_id =
    props.panelType === 'CONFERENCE' &&
    string(
      props.uiData.ucUiStore.getChatHeaderInfo({
        chatType: props.panelType,
        chatCode: props.panelCode,
      }).conf_id,
    )
  const conference =
    conf_id && props.uiData.ucUiStore.getChatClient().getConference(conf_id)

  if (
    !conference ||
    conference.conf_status !== Constants.CONF_STATUS_INVITED ||
    props.uiData.ucUiStore.getConfInJoinProcTable()[conf_id]
  ) {
    return null
  }

  if (conference.invite_properties && conference.invite_properties.rejoinable) {
    return (
      <View style={styles.brChatInvitationVisible}>
        <ButtonLabeled
          style={styles.brJoinButton}
          vivid={true}
          title={uawMsgs.LBL_CONFERENCE_REJOIN_BUTTON_TOOLTIP}
          onPress={() =>
            props.uiData.fire(
              'chatInvitationJoinButton_onClick',
              props.panelType,
              props.panelCode,
            )
          }
        >
          <Text style={styles.brTextButton}>
            {uawMsgs.LBL_CONFERENCE_REJOIN_BUTTON}
          </Text>
        </ButtonLabeled>
      </View>
    )
  }

  return (
    <View style={styles.brChatInvitationVisible}>
      <ButtonLabeled
        style={styles.brJoinButton}
        vivid={true}
        title={uawMsgs.LBL_CONFERENCE_JOIN_BUTTON_TOOLTIP}
        onPress={() =>
          props.uiData.fire(
            'chatInvitationJoinButton_onClick',
            props.panelType,
            props.panelCode,
          )
        }
      >
        <Text style={styles.brTextButton}>
          {uawMsgs.LBL_CONFERENCE_JOIN_BUTTON}
        </Text>
      </ButtonLabeled>
      <ButtonLabeled
        style={styles.brRejectButton}
        title={uawMsgs.LBL_CONFERENCE_REJECT_BUTTON_TOOLTIP}
        onPress={() =>
          props.uiData.fire(
            'chatInvitationRejectButton_onClick',
            props.panelType,
            props.panelCode,
          )
        }
      >
        <Text style={styles.brTextButton}>
          {uawMsgs.LBL_CONFERENCE_REJECT_BUTTON}
        </Text>
      </ButtonLabeled>
    </View>
  )
}

const styles = StyleSheet.create({
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
