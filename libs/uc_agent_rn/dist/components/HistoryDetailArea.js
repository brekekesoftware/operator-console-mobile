import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ChatParagraph from './ChatParagraph.js'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Animated,
  ActivityIndicator,
} from 'react-native'
import ChevronUpIcon from '../icons/ChevronUpIcon.js'
import ChevronDownIcon from '../icons/ChevronDownIcon.js'
import ErrorIcon from '../icons/ErrorIcon.js'

/**
 * HistoryDetailArea
 * props.uiData
 * props.uiData.ucUiAction
 * props.uiData.ucUiStore
 * props.uiData.selectedButNotFocusedTab
 * props.panelType
 * props.panelCode
 */

const colors = {
  white: '#FFFFFF',
  platinum: '#E0E0E0',
  isabelline: '#EEEEEE',
  mediumTurquoise: '#4BC5DE',
  darkGray: '#9E9E9E',
  errorColor: '#FF4526',
}
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
    this.scrollViewRef = React.createRef()

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
    if (
      props.uiData.selectedButNotFocusedTab ===
      props.panelType + '_' + props.panelCode
    ) {
      if (this.scrollViewRef.current) {
        // this.scrollViewRef.current.focus()
        props.uiData.selectedButNotFocusedTab = ''
      }
    }
    this.checkAndSearchMore()
  }

  handleScroll = event => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent
    this.lastScrollTop = contentOffset.y

    if (contentOffset.y < this.lastScrollTop) {
      this.scrolledUpwardManuallyFirst = true
    }

    this.checkAndSearchMore()
  }

  checkAndSearchMore = () => {
    const props = this.props
    if (!this.autoReceiveMore) {
      return
    }

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

    const showmorelinkTable = props.uiData.ucUiStore.getShowmorelinkTable()
    const lastShowmorelinkEntry =
      showmorelinkTable[this.last_showmorelink_id] || {}
    const firstShowmorelinkEntry =
      showmorelinkTable[this.first_showmorelink_id] || {}

    if (this.scrollViewRef.current) {
      this.scrollViewRef.current.measure(
        (x, y, width, height, pageX, pageY) => {
          const scrollViewHeight = height
          const contentHeight = this.scrollViewRef.current.contentHeight
          const scrollY = this.lastScrollTop

          if (
            scrollY > contentHeight - scrollViewHeight - 50 &&
            !lastShowmorelinkEntry.errorType
          ) {
            this.handleShowmorelinkClick(this.last_showmorelink_id)
          } else if (scrollY < 50 && !firstShowmorelinkEntry.errorType) {
            this.handleShowmorelinkClick(this.first_showmorelink_id, 0)
          }
        },
      )
    }
  }

  handleShowmorelinkClick = (showmorelink_id, index) => {
    const props = this.props
    if (index === 0) {
      const chatList = props.uiData.ucUiStore.getChatList({
        chatType: props.panelType,
        chatCode: props.panelCode,
      })
      if (chatList.length >= 2 && chatList[0].type === 'showmorelink') {
        this.secondNodeKey = chatList[1].key
      }
    }
    props.uiData.ucUiAction.receiveMore({
      showmorelink_id: showmorelink_id,
    })
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
          const isClickable =
            !this.autoReceiveMore && !showmorelinkEntry.nowReceiving
          const isError = showmorelinkEntry.errorType
          const isProgress = !isClickable && !isError

          const errorTitle =
            (uawMsgs[showmorelinkEntry.errorType] ||
              showmorelinkEntry.errorType) +
            (showmorelinkEntry.errorDetail
              ? ' (' + showmorelinkEntry.errorDetail + ')'
              : '')

          let icon = null

          if (isClickable) {
            icon = (
              <View style={styles.showmorelinkIcon}>
                {index === 0 ? (
                  <ChevronUpIcon color={colors.darkGray} />
                ) : (
                  <ChevronDownIcon color={colors.darkGray} />
                )}
              </View>
            )
          } else if (isError) {
            icon = (
              <View style={styles.showmorelinkIcon}>
                <ErrorIcon color={colors.errorColor} />
              </View>
            )
          } else if (isProgress && this.props.hasMore) {
            icon = (
              <View style={styles.loadingSpinnerContainer}>
                <ActivityIndicator
                  size='small'
                  color={colors.mediumTurquoise}
                />
              </View>
            )
          }

          chatNodes.push(
            <TouchableOpacity
              key={chat.key}
              ref={chat.key}
              style={[
                styles.showMoreLink,
                !this.autoReceiveMore &&
                  !showmorelinkEntry.nowReceiving &&
                  styles.clickable,
                showmorelinkEntry.errorType && styles.error,
                showmorelinkEntry.nowReceiving && styles.progress,
              ]}
              onPress={() =>
                this.handleShowmorelinkClick(chat.showmorelink_id, index)
              }
              disabled={showmorelinkEntry.nowReceiving}
            >
              {icon}
            </TouchableOpacity>,
          )
        }
      })

    return (
      <ScrollView
        ref={this.scrollViewRef}
        style={[
          styles.historyDetailArea,
          this.autoReceiveMore && styles.autoReceiveMore,
        ]}
        onScroll={this.handleScroll}
        scrollEventThrottle={16}
      >
        {chatNodes}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  historyDetailArea: {
    flex: 1,
  },
  autoReceiveMore: {
    // backgroundColor: '#F5F5F5',
  },
  showMoreLink: {
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  showmorelinkIcon: {
    width: 24,
    height: 24,
  },
  clickable: {
    // backgroundColor: '#E5E5E5',
  },
  error: {
    // backgroundColor: '#FFE4E1',
  },
  progress: {
    // backgroundColor: '#F0F0F0',
  },
  showMoreLinkInner: {
    width: 20,
    height: 20,
    // borderRadius: 10,
    // backgroundColor: '#40E0D0',
  },
  loadingSpinnerContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
