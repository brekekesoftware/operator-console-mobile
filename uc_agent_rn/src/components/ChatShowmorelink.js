import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'

/**
 * ChatShowmorelink
 * props.uiData
 * props.uiData.ucUiAction
 * props.uiData.ucUiStore
 * props.uiData.configurations
 * props.showmorelink
 * props.showmorelink.showmorelink_id
 * props.showmorelink.unread
 * props.isFirst
 * props.isIconicShowmorelink
 * props.begin
 * props.onClick
 */
export default class extends React.Component {
  handleClick(ev) {
    const props = this.props
    if (
      !(ev && ev.button >= 0) &&
      (
        props.uiData.ucUiStore.getShowmorelinkTable()[
          props.showmorelink.showmorelink_id
        ] || {}
      ).errorType
    ) {
      // auto (not mouse) and error
      return
    }
    if (typeof props.onClick === 'function') {
      props.onClick(ev)
    }
    // receiveMore
    props.uiData.ucUiAction.receiveMore({
      showmorelink_id: props.showmorelink.showmorelink_id,
      begin: props.begin,
    })
    this.render()
  }
  render() {
    const props = this.props
    const showmorelinkEntry =
      props.uiData.ucUiStore.getShowmorelinkTable()[
        props.showmorelink.showmorelink_id
      ] || {}
    let className = 'brChatShowmorelink'
    if (props.showmorelink.unread) {
      className += ' brChatUnread'
    }
    if (props.isFirst) {
      className += ' brFirst'
    }
    if (props.isIconicShowmorelink) {
      className += ' brIconicShowmorelink'
    }
    if (showmorelinkEntry.nowReceiving) {
      className += ' brProgress'
    }
    if (showmorelinkEntry.errorType) {
      className += ' brError br_bi_icon_error_svg'
    }
    if (
      props.isIconicShowmorelink &&
      !showmorelinkEntry.nowReceiving &&
      !showmorelinkEntry.errorType
    ) {
      className += props.isFirst
        ? ' br_bi_icon_chevron_up_svg'
        : ' br_bi_icon_chevron_down_svg'
    }
    if (props.uiData.configurations.moreMessages) {
      return (
        <div
          className={className}
          title={
            (uawMsgs[showmorelinkEntry.errorType] ||
              showmorelinkEntry.errorType) +
            (showmorelinkEntry.errorDetail
              ? ' (' + showmorelinkEntry.errorDetail + ')'
              : '')
          }
        >
          <a
            className='brChatShowmorelinkLink brCancelChatAreaClick'
            href='javascript:void(0)'
            onClick={this.handleClick.bind(this)}
          >
            {uawMsgs.LBL_CHAT_SHOWMORELINK_CONTENT}
          </a>
          <span className='brChatUnreadContent'>
            {uawMsgs.LBL_CHAT_UNREAD_CONTENT}
          </span>
          <div className='brChatShowmorelinkInner' />
        </div>
      )
    } else {
      return <div></div>
    }
  }
}
