import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import NameEmbeddedSpan from './NameEmbeddedSpan.js'

/**
 * ChatSysmsg
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.configurations
 * props.sysmsg
 * props.sysmsg.sysmsgLevel
 * props.sysmsg.sysmsgType
 * props.sysmsg.buddy
 * props.sysmsg.sysmsgData
 * props.nextChat
 */
export default class extends React.Component {
  render() {
    const props = this.props
    let className = 'brChatSysmsg'
    if (props.sysmsg.sysmsgLevel === 'error') {
      className += ' brChatError'
    }
    if (props.sysmsg.sysmsgType === 'MSG_CONFERENCE_MEMBER_OFFLINE') {
      className += ' brConferenceMemberOffline'
    }
    if (props.sysmsg.sysmsgType === 'MSG_CONFERENCE_MEMBER_ONLINE') {
      className += ' brConferenceMemberOnline'
    }
    if (!props.nextChat) {
      className += ' brEndOfChatList'
    } else if (
      props.nextChat.type === 'sysmsg' &&
      props.nextChat.sysmsgType === 'MSG_CONFERENCE_MEMBER_ONLINE'
    ) {
      className += ' brBeforeOnline'
    }
    const style = {}
    if (props.uiData.configurations.sysmsgDelay) {
      style.animationDelay = props.uiData.configurations.sysmsgDelay
    }
    const format = uawMsgs[props.sysmsg.sysmsgType] || '{0}'
    return (
      <div className={className} style={style}>
        {props.sysmsg.sysmsgData ? (
          format.split('{0}').join(props.sysmsg.sysmsgData)
        ) : (
          <NameEmbeddedSpan
            ucUiStore={props.uiData.ucUiStore}
            format={format}
            buddy={props.sysmsg.buddy}
          />
        )}
      </div>
    )
  }
}
