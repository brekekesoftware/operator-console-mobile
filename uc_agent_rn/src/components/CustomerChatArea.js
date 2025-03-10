import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ReactDOM from 'react-dom'
import ButtonLabeled from './ButtonLabeled.js'
import ChatTyping from './ChatTyping.js'
import ChatList from './ChatList.js'

/**
 * CustomerChatArea
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.configurations
 * props.uiData.chatArea_onClick
 * props.uiData.chatArea_onSwipedDown
 * props.uiData.chatArea_onSwipedUp
 * props.uiData.customerChatReconnectButton_onClick
 * props.panelType
 * props.panelCode
 * props.withMenuOptions
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.shouldScrollBottom = 0
    this.state = {
      touchStartX: 0,
      touchStartY: 0,
      touchStartTime: 0,
      touchMoveX: 0,
      touchMoveY: 0,
      swipedTime: 0,
    }
  }
  componentDidUpdate() {
    const props = this.props
    const node = ReactDOM.findDOMNode(this)
    if (node) {
      if (
        0 < this.shouldScrollBottom &&
        this.shouldScrollBottom < node.scrollHeight
      ) {
        node.scrollTop = node.scrollHeight
      }
    }
    this.checkScrolledToBottom()
  }
  checkScrolledToBottom() {
    const props = this.props
    const node = ReactDOM.findDOMNode(this)
    if (node) {
      if (node.scrollTop + node.offsetHeight >= node.scrollHeight - 100) {
        this.shouldScrollBottom = node.scrollHeight
      } else {
        this.shouldScrollBottom = 0
      }
    }
  }
  handleScroll(ev) {
    const props = this.props
    this.checkScrolledToBottom()
  }
  handleEvent(ev) {
    const props = this.props
    if (ev.type === 'click') {
      if (+new Date() - this.state.swipedTime > 500) {
        props.uiData.fire(
          'chatArea_onClick',
          props.panelType,
          props.panelCode,
          ev,
        )
      }
    } else if (ev.type === 'touchstart') {
      if (ev.touches && ev.touches[0]) {
        this.setState({
          touchStartX: ev.touches[0].pageX,
          touchStartY: ev.touches[0].pageY,
          touchStartTime: +new Date(),
          touchMoveX: ev.touches[0].pageX,
          touchMoveY: ev.touches[0].pageY,
        })
      }
    } else if (ev.type === 'touchmove') {
      if (ev.touches && ev.changedTouches[0]) {
        this.setState({
          touchMoveX: ev.changedTouches[0].pageX,
          touchMoveY: ev.changedTouches[0].pageY,
        })
      }
    } else if (ev.type === 'touchend') {
      const nowTime = +new Date()
      const dTime = nowTime - this.state.touchStartTime
      const dY = this.state.touchMoveY - this.state.touchStartY
      if (dTime < 1000) {
        if (24 < dY && dY < 200) {
          this.setState({ swipedTime: nowTime })
          props.uiData.fire(
            'chatArea_onSwipedDown',
            props.panelType,
            props.panelCode,
            ev,
          )
        } else if (-200 < dY && dY < -24) {
          this.setState({ swipedTime: nowTime })
          props.uiData.fire(
            'chatArea_onSwipedUp',
            props.panelType,
            props.panelCode,
            ev,
          )
        }
      }
    }
  }
  render() {
    const props = this.props
    let className = 'brChatArea'
    if (props.withMenuOptions) {
      className += ' brWithMenuOptions'
    }
    if (props.uiData.configurations && props.uiData.configurations.casualChat) {
      className += ' brCasualChatArea'
    }
    return (
      <div
        className={className}
        onClick={this.handleEvent.bind(this)}
        onTouchStart={this.handleEvent.bind(this)}
        onTouchMove={this.handleEvent.bind(this)}
        onTouchEnd={this.handleEvent.bind(this)}
        onScroll={this.handleScroll.bind(this)}
      >
        <ChatList
          uiData={props.uiData}
          panelType={props.panelType}
          panelCode={props.panelCode}
        />
        <ButtonLabeled
          className='brCustomerChatReconnectButton'
          hidden={
            !(
              props.uiData.ucUiStore.getSignInStatus() === 0 &&
              (props.uiData.ucUiStore.getLastSignOutReason() || {}).reSignInTime
            )
          }
          vivid={true}
          title={uawMsgs.LBL_CUSTOMER_CHAT_RECONNECT_BUTTON_TOOLTIP}
          onClick={props.uiData.fire.bind(
            props.uiData,
            'customerChatReconnectButton_onClick',
            props.panelType,
            props.panelCode,
          )}
        >
          {uawMsgs.LBL_CUSTOMER_CHAT_RECONNECT_BUTTON}
        </ButtonLabeled>
        <ChatTyping
          uiData={props.uiData}
          panelType={props.panelType}
          panelCode={props.panelCode}
        />
      </div>
    )
  }
}
