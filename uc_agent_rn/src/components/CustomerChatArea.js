import React from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ButtonLabeled from './ButtonLabeled.js'
import ChatTyping from './ChatTyping.js'
import ChatList from './ChatList.js'

const colors = {
  transparent: 'transparent',
  platinum: '#E5E5E5',
  whiteSmoke: '#F5F5F5',
  white: '#FFFFFF',
}

const styles = StyleSheet.create({
  chatArea: {
    position: 'absolute',
    padding: 4,
    left: 0,
    top: 0,
    right: 0,
    bottom: 70,
    backgroundColor: 'transparent',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  hidden: {
    display: 'none',
  },
  withMenuOptions: {
    // Add specific styles for menu options if needed
  },
  casualChatArea: {
    // Add specific styles for casual chat if needed
  },
})

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
    this.scrollViewRef = React.createRef()
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
    this.checkAndScrollToBottom()
  }

  checkAndScrollToBottom = () => {
    if (this.scrollViewRef.current && this.shouldScrollBottom > 0) {
      this.scrollViewRef.current.scrollToEnd({ animated: false })
    }
  }

  handleScroll = event => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent
    const paddingToBottom = 100
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom

    this.shouldScrollBottom = isCloseToBottom ? contentSize.height : 0
  }

  handlePress = () => {
    const { props } = this
    if (+new Date() - this.state.swipedTime > 500) {
      props.uiData.fire('chatArea_onClick', props.panelType, props.panelCode)
    }
  }

  handleTouchStart = event => {
    const touch = event.nativeEvent.touches[0]
    this.setState({
      touchStartX: touch.pageX,
      touchStartY: touch.pageY,
      touchStartTime: +new Date(),
      touchMoveX: touch.pageX,
      touchMoveY: touch.pageY,
    })
  }

  handleTouchMove = event => {
    const touch = event.nativeEvent.touches[0]
    this.setState({
      touchMoveX: touch.pageX,
      touchMoveY: touch.pageY,
    })
  }

  handleTouchEnd = () => {
    const { props } = this
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
        )
      } else if (-200 < dY && dY < -24) {
        this.setState({ swipedTime: nowTime })
        props.uiData.fire(
          'chatArea_onSwipedUp',
          props.panelType,
          props.panelCode,
        )
      }
    }
  }

  render() {
    const { props } = this
    const containerStyles = [
      styles.chatArea,
      props.withMenuOptions && styles.withMenuOptions,
      props.uiData.configurations?.casualChat && styles.casualChatArea,
    ]

    const showReconnectButton =
      props.uiData.ucUiStore.getSignInStatus() === 0 &&
      (props.uiData.ucUiStore.getLastSignOutReason() || {}).reSignInTime

    return (
      <View style={containerStyles}>
        <ScrollView
          ref={this.scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          onScroll={this.handleScroll}
          scrollEventThrottle={16}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
        >
          <TouchableWithoutFeedback onPress={this.handlePress}>
            <View>
              <ChatList
                uiData={props.uiData}
                panelType={props.panelType}
                panelCode={props.panelCode}
              />
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>

        <ButtonLabeled
          hidden={!showReconnectButton}
          vivid={true}
          title={uawMsgs.LBL_CUSTOMER_CHAT_RECONNECT_BUTTON_TOOLTIP}
          onPress={() =>
            props.uiData.fire(
              'customerChatReconnectButton_onClick',
              props.panelType,
              props.panelCode,
            )
          }
        >
          {uawMsgs.LBL_CUSTOMER_CHAT_RECONNECT_BUTTON}
        </ButtonLabeled>

        <ChatTyping
          uiData={props.uiData}
          panelType={props.panelType}
          panelCode={props.panelCode}
        />
      </View>
    )
  }
}
