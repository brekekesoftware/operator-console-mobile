import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ReactDOM from 'react-dom'
import ChatParagraph from './ChatParagraph.js'

/**
 * HistoryDetailArea
 * props.uiData
 * props.uiData.ucUiAction
 * props.uiData.ucUiStore
 * props.uiData.selectedButNotFocusedTab
 * props.panelType
 * props.panelCode
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.scrolledFirst = false
    this.firstShowmorelinkNodeKey = ''
    this.first_showmorelink_id = ''
    this.lastShowmorelinkNodeKey = ''
    this.last_showmorelink_id = ''
    this.firstScrollNodeKey = ''
    this.secondNodeKey = ''
    this.secondNodeTop = 0
    this.soonAfterScrollTop = 0
    this.scrolledUpwardManuallyFirst = false
    this.lastScrollTop = 0
    if (props.panelType === 'HISTORYDETAIL') {
      this.autoReceiveMore = true
      let user_id = null
      try {
        user_id = string((JSON.parse(props.panelCode) || {}).user_id)
      } catch (e) {}
      if (user_id) {
        const displayPeriod =
          int(
            props.uiData.ucUiStore.getOptionalSetting({
              key: 'display_period',
            }),
          ) || 15
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        this.displayPeriodBegin = +today - (displayPeriod - 1) * 86400000
      } else {
        this.displayPeriodBegin = 0
      }
    } else {
      this.autoReceiveMore = false
    }
  }
  componentDidUpdate() {
    const props = this.props
    const node = ReactDOM.findDOMNode(this)
    if (
      props.uiData.selectedButNotFocusedTab ===
      props.panelType + '_' + props.panelCode
    ) {
      if (node) {
        node.tabIndex = -1
        node.focus()
        props.uiData.selectedButNotFocusedTab = ''
      }
    }
    if (
      props.panelType === 'SEARCHRESULTDETAIL' &&
      this.firstShowmorelinkNodeKey &&
      !this.scrolledFirst
    ) {
      // scroll first (after showmorelink)
      const firstShowmorelink =
        this.firstShowmorelinkNodeKey &&
        this.refs[this.firstShowmorelinkNodeKey]
      const firstShowmorelinkNode =
        firstShowmorelink && ReactDOM.findDOMNode(firstShowmorelink)
      if (node && firstShowmorelinkNode && firstShowmorelinkNode.offsetHeight) {
        node.scrollTop = firstShowmorelinkNode.offsetHeight
        this.scrolledFirst = true
      }
    }
    if (this.firstScrollNodeKey && !this.scrolledFirst) {
      // scroll first (before first unfiltered paragraph)
      const firstScroll =
        this.firstScrollNodeKey && this.refs[this.firstScrollNodeKey]
      const firstScrollNode = firstScroll && ReactDOM.findDOMNode(firstScroll)
      if (node && firstScrollNode && firstScrollNode.offsetTop) {
        node.scrollTop = firstScrollNode.offsetTop
        this.scrolledFirst = true
      }
    }
    if (this.secondNodeKey) {
      const chatList = props.uiData.ucUiStore.getChatList({
        chatType: props.panelType,
        chatCode: props.panelCode,
      })
      if (chatList[1] && chatList[1].key === this.secondNodeKey) {
        // not added yet
      } else {
        const prevSecondNode = ReactDOM.findDOMNode(
          this.refs[this.secondNodeKey],
        )
        if (node && prevSecondNode) {
          this.soonAfterScrollTop = 1
          const rect = prevSecondNode.getBoundingClientRect()
          node.scrollTop += rect.top - this.secondNodeTop
        }
        this.secondNodeKey = ''
      }
    }
    this.checkAndSearchMore()
  }
  handleScroll(ev) {
    const props = this.props
    this.checkAndSearchMore()
  }
  checkAndSearchMore() {
    const props = this.props
    if (!this.autoReceiveMore) {
      return
    }
    const node = ReactDOM.findDOMNode(this)
    if (node && node.scrollTop < this.lastScrollTop) {
      this.scrolledUpwardManuallyFirst = true
    }
    this.lastScrollTop = node.scrollTop
    if (this.scrolledUpwardManuallyFirst) {
      if (this.soonAfterScrollTop === 1) {
        // scrolled to secondNodeTop -> can ignore
        this.soonAfterScrollTop = 2
        return
      } else if (this.soonAfterScrollTop === 2) {
        // might be scrolled to 0 by dnd -> must ignore
        this.soonAfterScrollTop = 0
        return
      }
    } else {
      this.soonAfterScrollTop = 0
    }
    const firstShowmorelink =
      this.firstShowmorelinkNodeKey && this.refs[this.firstShowmorelinkNodeKey]
    const firstShowmorelinkNode =
      firstShowmorelink && ReactDOM.findDOMNode(firstShowmorelink)
    const lastShowmorelink =
      this.lastShowmorelinkNodeKey && this.refs[this.lastShowmorelinkNodeKey]
    const lastShowmorelinkNode =
      lastShowmorelink && ReactDOM.findDOMNode(lastShowmorelink)
    if (
      node &&
      lastShowmorelinkNode &&
      lastShowmorelinkNode.offsetHeight > 0 &&
      node.scrollTop >
        node.scrollHeight -
          node.offsetHeight -
          lastShowmorelinkNode.offsetHeight &&
      !(
        props.uiData.ucUiStore.getShowmorelinkTable()[
          this.last_showmorelink_id
        ] || {}
      ).errorType
    ) {
      this.handleShowmorelinkClick(this.last_showmorelink_id)
    } else if (
      node &&
      firstShowmorelinkNode &&
      firstShowmorelinkNode.offsetHeight > 0 &&
      node.scrollTop < firstShowmorelinkNode.offsetHeight &&
      !(
        props.uiData.ucUiStore.getShowmorelinkTable()[
          this.first_showmorelink_id
        ] || {}
      ).errorType
    ) {
      this.handleShowmorelinkClick(this.first_showmorelink_id, 0)
    }
  }
  handleShowmorelinkClick(showmorelink_id, index, ev) {
    const props = this.props
    // save scroll position of secondNode
    if (index === 0) {
      const chatList = props.uiData.ucUiStore.getChatList({
        chatType: props.panelType,
        chatCode: props.panelCode,
      })
      if (chatList.length >= 2 && chatList[0].type === 'showmorelink') {
        const secondNode = ReactDOM.findDOMNode(this.refs[chatList[1].key])
        if (secondNode) {
          const rect = secondNode.getBoundingClientRect()
          this.secondNodeKey = chatList[1].key
          this.secondNodeTop = rect.top
        }
      }
    }
    // receiveMore
    props.uiData.ucUiAction.receiveMore({
      showmorelink_id: showmorelink_id,
    })
    this.render()
  }
  render() {
    const props = this.props
    const chatNodes = []
    let previousParagraph = null
    this.firstShowmorelinkNodeKey = ''
    this.lastShowmorelinkNodeKey = ''
    props.uiData.ucUiStore
      .getChatList({
        chatType: props.panelType,
        chatCode: props.panelCode,
      })
      .forEach((chat, index) => {
        if (chat.type === 'paragraph') {
          if (this.displayPeriodBegin && !this.firstScrollNodeKey) {
            const messageList = chat.messageList
            const lastMessage =
              messageList && messageList[messageList.length - 1]
            const lastSentTimeValue = lastMessage && lastMessage.sentTimeValue
            if (
              lastSentTimeValue &&
              lastSentTimeValue >= this.displayPeriodBegin
            ) {
              this.firstScrollNodeKey = (previousParagraph || chat).key
            }
          }
          chatNodes.push(
            <ChatParagraph
              key={chat.key}
              ref={chat.key}
              uiData={props.uiData}
              panelType={props.panelType}
              panelCode={props.panelCode}
              paragraph={chat}
              previousParagraph={previousParagraph}
            />,
          )
          previousParagraph = chat
        } else if (chat.type === 'showmorelink') {
          if (index === 0) {
            this.firstShowmorelinkNodeKey = chat.key
            this.first_showmorelink_id = chat.showmorelink_id
          } else {
            this.lastShowmorelinkNodeKey = chat.key
            this.last_showmorelink_id = chat.showmorelink_id
          }
          const showmorelinkEntry =
            props.uiData.ucUiStore.getShowmorelinkTable()[
              chat.showmorelink_id
            ] || {}
          chatNodes.push(
            <div
              key={chat.key}
              ref={chat.key}
              className={
                'brHistoryShowmorelink' +
                (!this.autoReceiveMore && !showmorelinkEntry.nowReceiving
                  ? ' brClickable' +
                    (index === 0
                      ? ' br_bi_icon_chevron_up_svg'
                      : ' br_bi_icon_chevron_down_svg')
                  : showmorelinkEntry.errorType
                    ? ' brError br_bi_icon_error_svg'
                    : ' brProgress')
              }
              title={
                (uawMsgs[showmorelinkEntry.errorType] ||
                  showmorelinkEntry.errorType) +
                (showmorelinkEntry.errorDetail
                  ? ' (' + showmorelinkEntry.errorDetail + ')'
                  : '')
              }
              onClick={this.handleShowmorelinkClick.bind(
                this,
                chat.showmorelink_id,
                index,
              )}
            >
              <div className='brHistoryShowmorelinkInner' />
            </div>,
          )
        }
      })
    return (
      <div
        className={
          'brHistoryDetailArea' +
          (this.autoReceiveMore ? ' brAutoReceiveMore' : '')
        }
        onScroll={this.handleScroll.bind(this)}
      >
        {chatNodes}
      </div>
    )
  }
}
