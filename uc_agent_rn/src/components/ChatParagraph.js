import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ChatMessageList from './ChatMessageList.js'
import {
  formatMessageDate,
  formatMessageDateTime,
} from '../utilities/strings.js'

/**
 * ChatParagraph
 * props.uiData
 * props.uiData.ucUiStore
 * props.panelType
 * props.panelCode
 * props.paragraph
 * props.paragraph.messageList
 * props.previousParagraph
 * props.isLast
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.mailSubject = null
  }
  render() {
    const props = this.props
    const firstMessage = props.paragraph.messageList[0]
    const senderInfo = firstMessage && firstMessage.senderInfo
    const user =
      senderInfo && props.uiData.ucUiStore.getBuddyUserForUi(senderInfo)
    const user_name =
      firstMessage.conf_type === 'webchat'
        ? string(user && user.display_name)
        : string(user && user.name)
    const isMe = Boolean(user && user.isMe)
    const paragraphClassIndex = int(user && user.paragraphClassIndex)
    const profile_image_url = string(user && user.profile_image_url)
    const topic_id = string(firstMessage && firstMessage.topic_id)
    const errorType = string(firstMessage && firstMessage.errorType)
    const unreached = Boolean(firstMessage && firstMessage.unreached)
    const messageTimeValue = int(firstMessage && firstMessage.sentTimeValue)
    const messageTime = string(
      messageTimeValue && formatMessageDateTime(messageTimeValue),
    )
    const previousFirstMessage =
      props.previousParagraph &&
      props.previousParagraph.messageList &&
      props.previousParagraph.messageList[0]
    const previous_topic_id = string(
      previousFirstMessage && previousFirstMessage.topic_id,
    )
    const previousMessageTimeValue = int(
      previousFirstMessage && previousFirstMessage.sentTimeValue,
    )
    if (!this.mailSubject && this.mailSubject !== '') {
      this.mailSubject =
        firstMessage &&
        firstMessage.messageExtInfo &&
        firstMessage.messageExtInfo.mailSubject
      if (!this.mailSubject && this.mailSubject !== '') {
        if (props.panelType === 'CONFERENCE') {
          const conf_id = (
            props.uiData.ucUiStore.getChatHeaderInfo({
              chatType: props.panelType,
              chatCode: props.panelCode,
            }) || {}
          ).conf_id
          const conference =
            conf_id &&
            props.uiData.ucUiStore.getChatClient().getConference(conf_id)
          this.mailSubject = conference
            ? props.uiData.ucUiStore.getMailSubject(conference)
            : ''
        } else {
          this.mailSubject = ''
        }
      }
    }
    let className = 'brChatParagraph brParagraph' + paragraphClassIndex
    if (isMe) {
      className += ' brIsMe'
    }
    if (errorType) {
      className += ' brHasError'
    }
    if (unreached) {
      className += ' brUnreached'
    }
    let topicSplitter = ''
    if (topic_id && previous_topic_id && topic_id !== previous_topic_id) {
      className += ' brWithTopicSplitter'
      if (
        new Date(messageTimeValue).toDateString() !==
        new Date(previousMessageTimeValue).toDateString()
      ) {
        topicSplitter = (
          <div className='brTopicSplitter'>
            <span className='brTopicSplitterDate brWithDate'>
              {string(messageTimeValue && formatMessageDate(messageTimeValue))}
            </span>
          </div>
        )
      } else {
        topicSplitter = (
          <div className='brTopicSplitter'>
            <span className='brTopicSplitterDate'></span>
          </div>
        )
      }
    }
    let callResult = {}
    if (firstMessage && firstMessage.ctype === Constants.CTYPE_CALL_RESULT) {
      try {
        callResult = JSON.parse(firstMessage.messageText) || {}
      } catch (ex) {}
    }
    return (
      <div className={className}>
        {topicSplitter}
        <div
          className={
            'brChatMessageImage' +
            (!callResult.externalincoming && profile_image_url
              ? ''
              : ' brNoImage') +
            (profile_image_url &&
            string(profile_image_url).indexOf(
              Constants.PROFILE_IMAGE_URL_DOWNLOAD,
            ) === -1
              ? ' brMyProfileImageUrl'
              : '')
          }
          title={!callResult.externalincoming ? user_name : ''}
          style={
            !callResult.externalincoming && profile_image_url
              ? { backgroundImage: 'url(' + profile_image_url + ')' }
              : {}
          }
        />
        <div className='brChatMessageName'>
          {!callResult.externalincoming ? user_name : ''}
        </div>
        <span> </span>
        <div className='brChatMessageTime'>{messageTime}</div>
        <div className='brChatMessageMailSubject'>
          {string(this.mailSubject)}
        </div>
        <ChatMessageList
          uiData={props.uiData}
          messageList={props.paragraph.messageList}
          isLast={props.isLast}
        />
      </div>
    )
  }
}
