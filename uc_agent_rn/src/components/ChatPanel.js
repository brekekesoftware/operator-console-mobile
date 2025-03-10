import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ReactDOM from 'react-dom'
import ButtonIconic from './ButtonIconic.js'
import CallArea from './CallArea.js'
import ChatArea from './ChatArea.js'
import DndableSafe from './DndableSafe.js'
import EditorArea from './EditorArea.js'

/**
 * ChatPanel
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.blinkingTabs
 * props.uiData.unscrolledTabs
 * props.uiData.chatPanel_onDrop
 * props.panelType
 * props.panelCode
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorAreaDisabled: false,
    }
  }
  componentDidUpdate() {
    const props = this.props
    const newState = {}
    const chatArea = ReactDOM.findDOMNode(this.refs['chatArea'])
    if (
      chatArea &&
      chatArea.querySelector &&
      chatArea.querySelector(
        '.brReplyButton:not(.brDisabled):not(.brEnableEditor)',
      )
    ) {
      if (!this.state.editorAreaDisabled) {
        newState.editorAreaDisabled = true
      }
    } else {
      if (this.state.editorAreaDisabled) {
        newState.editorAreaDisabled = false
      }
    }
    if (Object.keys(newState).length) {
      this.setState(newState)
    }
  }
  handleCallAreaResize(ev) {
    const props = this.props
    const node = ReactDOM.findDOMNode(this)
    const chatArea = ReactDOM.findDOMNode(this.refs['chatArea'])
    const editorArea = ReactDOM.findDOMNode(this.refs['editorArea'])
    if (node && chatArea && chatArea.style && editorArea) {
      const callAreaHeight = int(ev.height)
      if (
        callAreaHeight <
        int(node.offsetHeight) - int(editorArea.offsetHeight)
      ) {
        chatArea.style.top = callAreaHeight + 'px'
      } else {
        chatArea.style.top = '0px'
      }
    }
  }
  handleChatAreaScrollToBottomButtonClick() {
    const props = this.props
    const chatArea = ReactDOM.findDOMNode(this.refs['chatArea'])
    if (chatArea) {
      const step =
        (chatArea.scrollHeight - chatArea.scrollTop - chatArea.offsetHeight) /
          10 +
        1
      const scrollInterval = setInterval(() => {
        if (
          chatArea.scrollTop + chatArea.offsetHeight <
          chatArea.scrollHeight
        ) {
          chatArea.scrollTop += step
        } else {
          clearInterval(scrollInterval)
        }
      }, 10)
    }
  }
  render() {
    const props = this.props
    const myUcCimUserType = int(props.uiData.ucUiStore.getUcCimUserType())
    const unread = int(
      props.uiData.blinkingTabs[props.panelType + '_' + props.panelCode] ||
        props.uiData.unscrolledTabs[props.panelType + '_' + props.panelCode],
    )
    return (
      <DndableSafe
        uiData={props.uiData}
        dndableClass={
          (int(props.uiData.ucUiStore.getOptionalSetting({ key: 'fsp' })) &
            myUcCimUserType) !==
          myUcCimUserType
            ? 'FileDndable'
            : ''
        }
        className='brChatPanel'
        onDrop={props.uiData.fire.bind(
          props.uiData,
          'chatPanel_onDrop',
          props.panelType,
          props.panelCode,
        )}
      >
        <ChatArea
          ref='chatArea'
          uiData={props.uiData}
          panelType={props.panelType}
          panelCode={props.panelCode}
        />
        <ButtonIconic
          className={
            'brChatAreaScrollToBottomButton br_bi_icon_arrow_down_svg' +
            (unread ? ' brUnread' : '')
          }
          title={uawMsgs.LBL_CHAT_AREA_SCROLL_TO_BOTTOM_BUTTON_TOOLTIP}
          onClick={this.handleChatAreaScrollToBottomButtonClick.bind(this)}
        >
          <div className='brUnreadArea'>
            <span className='brUnreadInfo'>{unread}</span>
          </div>
        </ButtonIconic>
        <EditorArea
          ref='editorArea'
          uiData={props.uiData}
          panelType={props.panelType}
          panelCode={props.panelCode}
          disabled={this.state.editorAreaDisabled}
        />
        <CallArea
          ref='callArea'
          uiData={props.uiData}
          panelType={props.panelType}
          panelCode={props.panelCode}
          onResize={this.handleCallAreaResize.bind(this)}
        />
      </DndableSafe>
    )
  }
}
