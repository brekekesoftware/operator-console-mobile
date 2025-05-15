import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ChatMessage from './ChatMessage.js'
import { View } from 'react-native'

/**
 * ChatMessageList
 * props.uiData
 * props.uiData.ucUiStore
 * props.messageList
 * props.isLast
 */
export default props => {
  const messageNodes = props.messageList.map((message, index, array) => (
    <ChatMessage
      key={message.key}
      uiData={props.uiData}
      message={message}
      isLastOfLast={props.isLast && index === array.length - 1}
    />
  ))
  console.log('#Duy Phan console messageNodes', messageNodes.length)
  return <View>{messageNodes}</View>
}
