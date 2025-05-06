import React from 'react'
import { View, StyleSheet, Dimensions, Animated, Text } from 'react-native'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
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
export default class ChatPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorAreaDisabled: false,
      chatAreaTop: 0,
      isScrolledToBottom: true,
      isPressed: false,
    }
    this.chatAreaRef = React.createRef()
    this.editorAreaRef = React.createRef()
    this.scrollAnimation = null
  }

  componentDidUpdate() {
    const hasActiveReplyButton =
      this.chatAreaRef.current?.hasActiveReplyButton?.()

    if (hasActiveReplyButton !== this.state.editorAreaDisabled) {
      this.setState({ editorAreaDisabled: hasActiveReplyButton })
    }
  }

  handleCallAreaResize = height => {
    const windowHeight = Dimensions.get('window').height
    const editorHeight = this.editorAreaRef.current?.getHeight() || 0

    if (height < windowHeight - editorHeight) {
      this.setState({ chatAreaTop: height })
    } else {
      this.setState({ chatAreaTop: 0 })
    }
  }

  handleChatAreaScrollToBottom = () => {
    if (this.chatAreaRef.current) {
      const chatArea = this.chatAreaRef.current
      const scrollHeight = chatArea.getScrollHeight()
      const currentOffset = chatArea.getScrollOffset()
      const visibleHeight = chatArea.getVisibleHeight()

      if (this.scrollAnimation) {
        this.scrollAnimation.stop()
      }

      const distance = scrollHeight - currentOffset - visibleHeight
      const duration = 300

      this.scrollAnimation = Animated.timing(
        new Animated.Value(currentOffset),
        {
          toValue: scrollHeight - visibleHeight,
          duration: duration,
          useNativeDriver: true,
        },
      )

      this.scrollAnimation.start()
    }
  }

  render() {
    const { props } = this
    const myUcCimUserType = int(props.uiData.ucUiStore.getUcCimUserType())
    const unread = int(
      props.uiData.blinkingTabs[props.panelType + '_' + props.panelCode] ||
        props.uiData.unscrolledTabs[props.panelType + '_' + props.panelCode],
    )

    const isDndEnabled =
      (int(props.uiData.ucUiStore.getOptionalSetting({ key: 'fsp' })) &
        myUcCimUserType) !==
      myUcCimUserType
    console.log('#Duy Phan console render ChatPanel')

    return (
      <DndableSafe
        uiData={props.uiData}
        dndableClass={isDndEnabled ? 'FileDndable' : ''}
        style={[
          styles.brChatPanel,
          this.state.isOver && this.state.canDrop && styles.brIsOverCanDrop,
        ]}
        onDrop={() =>
          props.uiData.fire(
            'chatPanel_onDrop',
            props.panelType,
            props.panelCode,
          )
        }
      >
        <View
          ref={this.chatAreaRef}
          style={[styles.chatArea, { top: this.state.chatAreaTop }]}
        >
          <ChatArea
            uiData={props.uiData}
            panelType={props.panelType}
            panelCode={props.panelCode}
            style={{ flex: 1 }}
          />
        </View>

        {!this.state.isScrolledToBottom && (
          <ButtonIconic
            style={[
              styles.brChatAreaScrollToBottomButton,
              unread && styles.brUnread,
              this.state.isPressed && styles.buttonActive,
            ]}
            iconName='arrow-down'
            title={uawMsgs.LBL_CHAT_AREA_SCROLL_TO_BOTTOM_BUTTON_TOOLTIP}
            onPress={this.handleChatAreaScrollToBottom}
            onPressIn={() => this.setState({ isPressed: true })}
            onPressOut={() => this.setState({ isPressed: false })}
          >
            {unread > 0 && (
              <View style={styles.brUnreadArea}>
                <Text style={styles.brUnreadInfo}>{unread}</Text>
              </View>
            )}
          </ButtonIconic>
        )}

        <EditorArea
          ref={this.editorAreaRef}
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
          onResize={this.handleCallAreaResize}
        />
      </DndableSafe>
    )
  }
}

const colors = {
  white: '#ffffff',
  medium_turquoise: '#4BC5DE',
}

const styles = StyleSheet.create({
  brChatPanel: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    // backgroundColor: 'red',
  },
  brIsOverCanDrop: {
    borderWidth: 3,
    borderColor: colors.medium_turquoise,
  },
  brChatAreaScrollToBottomButton: {
    position: 'absolute',
    right: 32,
    bottom: 96,
    width: 40,
    height: 40,
    borderWidth: 0,
    opacity: 0.2,
  },
  brUnread: {
    opacity: 1,
  },
  buttonActive: {
    opacity: 1,
  },
  brUnreadArea: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 16,
    height: 16,
    backgroundColor: colors.medium_turquoise,
    borderRadius: 8, // 50% of width/height
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  brUnreadInfo: {
    fontSize: 9,
    fontWeight: '400',
    lineHeight: 14.4, // 1.6 * 9
    letterSpacing: 1.3,
    color: colors.white,
    textAlign: 'center',
  },
  brHideSysmsg: {},
  chatArea: {
    position: 'absolute',
    padding: 4,
    left: 0,
    top: 0,
    right: 0,
    bottom: 70,
    // width: '100%',
    // height: '100%',
    // backgroundColor: 'blue',
    flex: 1,
  },
})
