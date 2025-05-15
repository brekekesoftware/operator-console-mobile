import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ChatSysmsg from './ChatSysmsg.js'
import ChatParagraph from './ChatParagraph.js'
import ChatShowmorelink from './ChatShowmorelink.js'
import UiConstants from '../utilities/uiconstants.js'

/**
 * ChatList
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.configurations
 * props.uiData.chatListOpenDetailLink_onClick
 * props.panelType
 * props.panelCode
 * props.onScrollRequested
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.firstShowmorelinkNodeKey = ''
    this.secondNodeKey = ''
    this.secondNodeTop = 0
    this.soonAfterScrollTop = 0
    this.scrolledUpwardManuallyFirst = false
    this.lastScrollTop = 0
    this.nodeLayouts = {}

    // Add refs object to store multiple refs
    this.refs = {}
  }

  measureNode = key => {
    return new Promise(resolve => {
      if (this.refs[key] && this.refs[key].measure) {
        this.refs[key].measure((x, y, width, height, pageX, pageY) => {
          resolve({ top: pageY, height })
        })
      } else {
        resolve(null)
      }
    })
  }

  async componentDidUpdate() {
    const props = this.props
    if (this.secondNodeKey) {
      const chatList = props.uiData.ucUiStore.getChatList({
        chatType: props.panelType,
        chatCode: props.panelCode,
      })

      if (chatList[1] && chatList[1].key === this.secondNodeKey) {
        // not added yet
      } else {
        const layout = await this.measureNode(this.secondNodeKey)
        if (layout) {
          this.soonAfterScrollTop = 1
          if (typeof props.onScrollRequested === 'function') {
            props.onScrollRequested({ top: layout.top - this.secondNodeTop })
          }
        }
        this.secondNodeKey = ''
      }
    }
  }

  async savePositionBeforeReceiveMore() {
    const props = this.props
    if (this.firstShowmorelinkNodeKey) {
      const chatList = props.uiData.ucUiStore.getChatList({
        chatType: props.panelType,
        chatCode: props.panelCode,
      })

      if (chatList.length >= 2 && chatList[0].type === 'showmorelink') {
        const layout = await this.measureNode(chatList[1].key)
        if (layout) {
          this.secondNodeKey = chatList[1].key
          this.secondNodeTop = layout.top
        }
      }
    }
  }

  handleLayout = (key, event) => {
    const { y, height } = event.nativeEvent.layout
    this.nodeLayouts[key] = { top: y, height }
  }

  parentScrolled = ev => {
    const props = this.props
    if (ev.top < this.lastScrollTop) {
      this.scrolledUpwardManuallyFirst = true
    }
    this.lastScrollTop = ev.top

    if (this.scrolledUpwardManuallyFirst) {
      if (this.soonAfterScrollTop === 1) {
        this.soonAfterScrollTop = 2
        return
      } else if (this.soonAfterScrollTop === 2) {
        this.soonAfterScrollTop = 0
        return
      }
    } else {
      this.soonAfterScrollTop = 0
    }

    const chatShowmorelink =
      this.firstShowmorelinkNodeKey && this.refs[this.firstShowmorelinkNodeKey]
    if (
      ev &&
      chatShowmorelink &&
      ev.top < 40 &&
      !props.uiData.configurations.iconicShowmorelink
    ) {
      chatShowmorelink.handleClick && chatShowmorelink.handleClick()
    }
  }

  render() {
    const props = this.props
    const chatNodes = []
    let previousParagraph = null
    this.firstShowmorelinkNodeKey = ''
    let displayPeriodBegin = 0
    let filtered = false
    let messageCount = 0
    let showmorelinkTried = false

    if (
      props.uiData.configurations.displayPeriodEnabled &&
      props.panelType === 'CHAT'
    ) {
      const displayPeriod =
        int(
          props.uiData.ucUiStore.getOptionalSetting({ key: 'display_period' }),
        ) || 15
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      displayPeriodBegin = +today - (displayPeriod - 1) * 86400000
    }

    props.uiData.ucUiStore
      .getChatList({
        chatType: props.panelType,
        chatCode: props.panelCode,
      })
      .forEach((chat, index, array) => {
        if (chat.type === 'sysmsg') {
          chatNodes.push(
            <ChatSysmsg
              key={chat.key}
              ref={ref => (this.refs[chat.key] = ref)}
              uiData={props.uiData}
              sysmsg={chat}
              nextChat={array[index + 1]}
            />,
          )
        } else if (chat.type === 'paragraph') {
          let paragraphFiltered = false
          if (displayPeriodBegin) {
            const messageList = chat.messageList
            const lastMessage =
              messageList && messageList[messageList.length - 1]
            const lastSentTimeValue = lastMessage && lastMessage.sentTimeValue
            if (lastSentTimeValue && lastSentTimeValue < displayPeriodBegin) {
              paragraphFiltered = true
              filtered = true
            }
          }
          if (!paragraphFiltered) {
            chatNodes.push(
              <ChatParagraph
                key={chat.key}
                ref={ref => (this.refs[chat.key] = ref)}
                uiData={props.uiData}
                panelType={props.panelType}
                panelCode={props.panelCode}
                paragraph={chat}
                previousParagraph={previousParagraph}
                isLast={index === array.length - 1}
              />,
            )
            previousParagraph = chat
          }
          messageCount += int(chat.messageList && chat.messageList.length)
        } else if (chat.type === 'showmorelink') {
          if (index === 0) {
            this.firstShowmorelinkNodeKey = chat.key
          }
          const showmorelinkEntry =
            props.uiData.ucUiStore.getShowmorelinkTable()[
              chat.showmorelink_id
            ] || {}
          if (!showmorelinkEntry.nowReceiving && showmorelinkEntry.tried) {
            showmorelinkTried = true
          }
          chatNodes.push(
            <ChatShowmorelink
              key={chat.key}
              ref={ref => (this.refs[chat.key] = ref)}
              uiData={props.uiData}
              showmorelink={chat}
              isFirst={index === 0}
              isIconicShowmorelink={
                props.uiData.configurations.iconicShowmorelink
              }
              begin={displayPeriodBegin}
              onClick={this.savePositionBeforeReceiveMore.bind(this)}
            />,
          )
        }
      })

    const isFiltered =
      filtered ||
      (displayPeriodBegin &&
        messageCount < UiConstants.SEARCH_PREV_NEXT_TEXTS_MAX &&
        showmorelinkTried)
    console.log('#Duy Phan console chatNodes', chatNodes.length)

    return (
      <View style={styles.brChatList}>
        {!!isFiltered && (
          <TouchableOpacity
            style={styles.brChatListOpenDetailLink}
            onPress={() =>
              props.uiData.fire(
                'chatListOpenDetailLink_onClick',
                props.panelType,
                props.panelCode,
              )
            }
            activeOpacity={0.7}
          >
            <Text style={styles.brChatListOpenDetailLinkText}>
              {uawMsgs.LBL_CHAT_LIST_OPEN_DETAIL_LINK_CONTENT}
            </Text>
          </TouchableOpacity>
        )}
        {chatNodes.map(node => (
          <View
            key={node.key}
            ref={ref => (this.refs[node.key] = ref)}
            onLayout={event => this.handleLayout(node.key, event)}
          >
            {node}
          </View>
        ))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  brChatList: {
    flex: 1,
    width: '100%',
  },
  brChatListOpenDetailLink: {
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brChatListOpenDetailLinkText: {
    color: '#74C365',
    fontSize: 13,
    fontWeight: '400',
    letterSpacing: 0.3,
  },
  brChatListOpenDetailLinkPressed: {
    backgroundColor: '#F5F5F5',
  },
})
