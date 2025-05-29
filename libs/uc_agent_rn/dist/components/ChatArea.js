import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ChatTyping from './ChatTyping.js'
import ChatInvitation from './ChatInvitation.js'
import ChatList from './ChatList.js'
import ChatOptionButtons from './ChatOptionButtons.js'

/**
 * ChatArea
 * props.uiData
 * props.uiData.currentSelectedTab
 * props.uiData.chatArea_onScrolledToBottomChanged
 * props.panelType
 * props.panelCode
 * props.style
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.scrollViewRef = React.createRef()
    this.scrolledFirst = false
    this.shouldScrollBottom = 0
    this.state = {
      scrolledToBottom: false,
      contentHeight: 0,
      scrollViewHeight: 0,
    }
  }

  componentDidUpdate() {
    if (!this.scrolledFirst || 0 < this.shouldScrollBottom) {
      this.scrollToBottom()
    }
    this.checkScrolledToBottom()
  }

  scrollToBottom(animated = true) {
    if (this.scrollViewRef.current) {
      this.scrollViewRef.current.scrollToEnd({ animated })
    }
  }

  checkScrolledToBottom() {
    const { contentHeight, scrollViewHeight } = this.state
    if (!contentHeight || !scrollViewHeight) return

    const isAtBottom = contentHeight - scrollViewHeight <= 100

    if (isAtBottom !== this.state.scrolledToBottom) {
      this.setState({ scrolledToBottom: isAtBottom })
      this.props.uiData.fire(
        'chatArea_onScrolledToBottomChanged',
        this.props.panelType,
        this.props.panelCode,
        isAtBottom,
      )
    }
  }

  handleScroll = event => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent

    if (
      !this.scrolledFirst &&
      contentOffset.y + layoutMeasurement.height !== contentSize.height
    ) {
      this.scrolledFirst = true
    }

    // Update heights for bottom check
    this.setState(
      {
        contentHeight: contentSize.height,
        scrollViewHeight: layoutMeasurement.height,
      },
      () => {
        this.checkScrolledToBottom()
      },
    )

    // Notify ChatList of scroll position
    if (this.chatListRef && this.chatListRef.parentScrolled) {
      this.chatListRef.parentScrolled({ top: contentOffset.y })
    }
  }

  handleChatListScrollRequested = ev => {
    if (ev && ev.top && this.scrollViewRef.current) {
      this.scrollViewRef.current.scrollTo({
        y: ev.top,
        animated: true,
      })
    }
  }

  render() {
    const props = this.props
    const isSelected =
      props.uiData.currentSelectedTab ===
      props.panelType + '_' + props.panelCode

    return (
      <ScrollView
        ref={this.scrollViewRef}
        style={[
          styles.brChatArea,
          isSelected && styles.brSelected,
          props.hidden && styles.brHidden,
          props.style,
        ]}
        onScroll={this.handleScroll}
        // contentContainerStyle={{ flexGrow: 1 }}
        // scrollEventThrottle={16}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled
      >
        <ChatList
          ref={ref => (this.chatListRef = ref)}
          uiData={props.uiData}
          panelType={props.panelType}
          panelCode={props.panelCode}
          onScrollRequested={this.handleChatListScrollRequested}
        />
        <ChatInvitation
          uiData={props.uiData}
          panelType={props.panelType}
          panelCode={props.panelCode}
        />
        <ChatOptionButtons
          uiData={props.uiData}
          panelType={props.panelType}
          panelCode={props.panelCode}
        />
        <ChatTyping
          uiData={props.uiData}
          panelType={props.panelType}
          panelCode={props.panelCode}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  brChatArea: {
    flex: 1,
  },
  brSelected: {},
  brHidden: {
    display: 'none',
  },
})
