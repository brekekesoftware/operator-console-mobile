import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ButtonLabeled from './ButtonLabeled.js'
import { View } from 'react-native'

/**
 * ChatOptionButtons
 * props.uiData
 * props.uiData.configurations
 * props.uiData.chatOptionButtonsInfoCreator
 * props.uiData.chatOptionButtonsReplyWebchatButton_onClick
 * props.panelType
 * props.panelCode
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.buttonsInfo = []
  }
  render() {
    const props = this.props
    const configProperties = props.uiData.ucUiStore.getConfigProperties()

    // reply webchat button
    if (
      props.uiData.configurations &&
      props.uiData.configurations.replyWebchatButton &&
      props.panelType === 'CONFERENCE'
    ) {
      const chatHeaderInfo =
        props.uiData.ucUiStore.getChatHeaderInfo({
          chatType: props.panelType,
          chatCode: props.panelCode,
        }) || {}
      const conf_id = string(chatHeaderInfo.conf_id)
      let replyWebchatButton = this.buttonsInfo.find(
        buttonInfo => buttonInfo.buttonType === '_replyWebchatButton',
      )
      if (!replyWebchatButton) {
        this.buttonsInfo.push((replyWebchatButton = {}))
      }
      replyWebchatButton.buttonType = '_replyWebchatButton'
      replyWebchatButton.className = 'brReplyWebchatButton'
      replyWebchatButton.disabled = props.uiData.ucUiStore.getWebchatQueue({
        conf_id: conf_id,
      }).isTalking
      replyWebchatButton.hidden =
        !chatHeaderInfo.replyTypes ||
        !(
          (configProperties.optional_config &&
            configProperties.optional_config.awsl) ||
          []
        ).some(aws => aws.id === chatHeaderInfo.webchatServiceId && aws.senders)
      replyWebchatButton.vivid = true
      replyWebchatButton.title =
        uawMsgs.LBL_CHAT_OPTION_BUTTONS_REPLY_WEBCHAT_BUTTON_TOOLTIP
      replyWebchatButton.onClick = props.uiData.fire.bind(
        props.uiData,
        'chatOptionButtonsReplyWebchatButton_onClick',
        props.panelType,
        props.panelCode,
      )
      replyWebchatButton.children =
        uawMsgs.LBL_CHAT_OPTION_BUTTONS_REPLY_WEBCHAT_BUTTON
    }

    // customize (add / remove) buttons by uiData.chatOptionButtonsInfoCreator
    const ev = {
      panelType: props.panelType,
      panelCode: props.panelCode,
      buttonsInfo: this.buttonsInfo,
    }
    if (props.uiData.chatOptionButtonsInfoCreator) {
      props.uiData.chatOptionButtonsInfoCreator(ev)
    }

    if (!ev.buttonsInfo || !ev.buttonsInfo.length) {
      return null
    }

    return (
      <View style={{ paddingTop: 8, paddingBottom: 8, paddingLeft: 16 }}>
        {ev.buttonsInfo &&
          ev.buttonsInfo.map((buttonInfo, i) => {
            return (
              <ButtonLabeled
                key={i}
                disabled={Boolean(buttonInfo.disabled)}
                hidden={Boolean(buttonInfo.hidden)}
                progress={Boolean(buttonInfo.progress)}
                vivid={Boolean(buttonInfo.vivid)}
                ghost={Boolean(buttonInfo.ghost)}
                title={buttonInfo.title}
                style={[{ width: 80, marginRight: 8 }, buttonInfo.style]}
                onPress={buttonInfo.onClick}
              >
                {buttonInfo.children}
              </ButtonLabeled>
            )
          })}
      </View>
    )
  }
}
