import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import NameEmbeddedSpan from './NameEmbeddedSpan.js'

/**
 * ChatTyping
 * props.uiData
 * props.uiData.ucUiStore
 * props.panelType
 * props.panelCode
 */
export default props => {
  const typingBuddy = props.uiData.ucUiStore.getTypingBuddy({
    chatType: props.panelType,
    chatCode: props.panelCode,
  })
  if (typingBuddy && typingBuddy.user_id) {
    return (
      <div className='brChatTyping brVisible'>
        <NameEmbeddedSpan
          ucUiStore={props.uiData.ucUiStore}
          format={uawMsgs.MSG_TYPING}
          buddy={typingBuddy}
        />
      </div>
    )
  } else {
    return (
      <div className='brChatTyping'>
        {String.fromCharCode(160) /* &nbsp; */}
      </div>
    )
  }
}
