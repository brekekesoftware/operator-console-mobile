import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'

/**
 * NameEmbeddedSpan
 * props.ucUiStore
 * props.format
 * props.title
 * props.buddy
 */
export default props => {
  const format = string(props.format)
  const title = string(props.title)
  const messages = format.split('{0}')
  const titleMessages = title.split('{0}')
  const user = props.buddy && props.ucUiStore.getBuddyUserForUi(props.buddy)
  const user_name = string(user && user.name)
  let className = 'brNameEmbeddedSpan'
  if (user && user.isMe) {
    className += ' brIsMe'
  }
  if (user && user.isBuddy) {
    className += ' brIsBuddy'
  }
  if (user && user.isTemporaryBuddy) {
    className += ' brIsTemporaryBuddy'
  }
  return (
    <span className={className} title={titleMessages.join(user_name)}>
      {messages.join(user_name)}
    </span>
  )
}
