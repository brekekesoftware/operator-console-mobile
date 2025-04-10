import React from 'react'
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  Image,
  Platform,
} from 'react-native'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ChatParagraph from './ChatParagraph.js'
import ChevronUpIcon from '../icons/ChevronUpIcon.js'
import ChevronDownIcon from '../icons/ChevronDownIcon.js'
import ErrorIcon from '../icons/ErrorIcon.js'

/**
 * HistoryDetailArea - React Native version
 * A component that displays chat history details with loading indicators
 *
 * props.uiData - UI data object
 * props.uiData.ucUiAction - UI actions
 * props.uiData.ucUiStore - UI store
 * props.uiData.selectedButNotFocusedTab - Selected but not focused tab
 * props.panelType - Panel type
 * props.panelCode - Panel code
 * props.style - Additional styles
 */
export default class HistoryDetailArea extends React.Component {
  constructor(props) {
    super(props)

    this.scrollViewRef = React.createRef()
    this.paragraphRefs = {}

    this.spinnerAnimation = new Animated.Value(0)

    this.state = {
      firstShowmorelinkIndex: -1,
      lastShowmorelinkIndex: -1,
      firstParagraphKey: '',
      scrolledToFirst: false,
    }

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

    this.startSpinnerAnimation()
  }

  componentDidMount() {
    this.checkInitialScroll()
  }

  componentDidUpdate(prevProps) {
    const { props } = this

    if (
      props.uiData.selectedButNotFocusedTab ===
      props.panelType + '_' + props.panelCode
    ) {
      if (this.scrollViewRef.current) {
        this.scrollViewRef.current.focus()
        props.uiData.selectedButNotFocusedTab = ''
      }
    }

    this.checkInitialScroll()

    this.checkAndSearchMore()
  }

  startSpinnerAnimation() {
    Animated.loop(
      Animated.timing(this.spinnerAnimation, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start()
  }

  checkInitialScroll() {
    const { scrolledFirst, firstScrollNodeKey, firstShowmorelinkNodeKey } = this
    const { scrollViewRef } = this

    if (
      this.props.panelType === 'SEARCHRESULTDETAIL' &&
      firstShowmorelinkNodeKey &&
      !scrolledFirst &&
      scrollViewRef.current
    ) {
      this.scrolledFirst = true
    }

    if (firstScrollNodeKey && !scrolledFirst && scrollViewRef.current) {
      this.scrolledFirst = true
    }
  }

  handleScroll = event => {
    const scrollY = event.nativeEvent.contentOffset.y

    if (scrollY < this.lastScrollTop) {
      this.scrolledUpwardManuallyFirst = true
    }

    this.lastScrollTop = scrollY

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

    this.checkAndSearchMore()
  }

  checkAndSearchMore() {
    if (!this.autoReceiveMore) {
      return
    }

    const { scrollViewRef } = this

    if (scrollViewRef.current) {
      if (
        this.state.lastShowmorelinkIndex >= 0 &&
        !(
          this.props.uiData.ucUiStore.getShowmorelinkTable()[
            this.last_showmorelink_id
          ] || {}
        ).errorType
      ) {
      } else if (
        this.state.firstShowmorelinkIndex >= 0 &&
        !(
          this.props.uiData.ucUiStore.getShowmorelinkTable()[
            this.first_showmorelink_id
          ] || {}
        ).errorType
      ) {
      }
    }
  }

  handleShowmorelinkClick = (showmorelink_id, index) => {
    const { props } = this

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

  renderShowmorelink = (chat, index) => {
    const { props } = this

    if (index === 0) {
      this.firstShowmorelinkNodeKey = chat.key
      this.first_showmorelink_id = chat.showmorelink_id

      if (this.state.firstShowmorelinkIndex !== index) {
        this.setState({ firstShowmorelinkIndex: index })
      }
    } else {
      this.lastShowmorelinkNodeKey = chat.key
      this.last_showmorelink_id = chat.showmorelink_id

      if (this.state.lastShowmorelinkIndex !== index) {
        this.setState({ lastShowmorelinkIndex: index })
      }
    }

    const showmorelinkEntry =
      props.uiData.ucUiStore.getShowmorelinkTable()[chat.showmorelink_id] || {}

    const isClickable = !this.autoReceiveMore && !showmorelinkEntry.nowReceiving
    const isError = showmorelinkEntry.errorType
    const isProgress = !isClickable && !isError

    const errorTitle =
      (uawMsgs[showmorelinkEntry.errorType] || showmorelinkEntry.errorType) +
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
    } else if (isProgress) {
      icon = (
        <View style={styles.loadingSpinnerContainer}>
          <Animated.View
            style={[
              styles.loadingSpinner,
              {
                transform: [
                  {
                    rotate: this.spinnerAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg'],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>
      )
    }

    return (
      <TouchableOpacity
        key={chat.key}
        style={[
          styles.historyShowmorelink,
          isClickable && styles.clickable,
          isError && styles.error,
        ]}
        onPress={() =>
          isClickable &&
          this.handleShowmorelinkClick(chat.showmorelink_id, index)
        }
        disabled={!isClickable}
        activeOpacity={isClickable ? 0.7 : 1}
        accessibilityLabel={errorTitle}
      >
        {icon}
      </TouchableOpacity>
    )
  }

  render() {
    const { props } = this
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
              ref={ref => (this.paragraphRefs[chat.key] = ref)}
              uiData={props.uiData}
              panelType={props.panelType}
              panelCode={props.panelCode}
              paragraph={chat}
              previousParagraph={previousParagraph}
            />,
          )

          previousParagraph = chat
        } else if (chat.type === 'showmorelink') {
          chatNodes.push(this.renderShowmorelink(chat, index))
        }
      })

    return (
      <ScrollView
        ref={this.scrollViewRef}
        style={[
          styles.historyDetailArea,
          this.autoReceiveMore && styles.autoReceiveMore,
          props.style,
        ]}
        contentContainerStyle={styles.contentContainer}
        onScroll={this.handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={true}
        indicatorStyle='white'
      >
        {chatNodes}
      </ScrollView>
    )
  }
}

const colors = {
  white: '#FFFFFF', // @white
  platinum: '#E0E0E0', // @platinum
  isabelline: '#EEEEEE', // @isabelline
  mediumTurquoise: '#4BC5DE', // @medium_turquoise
  darkGray: '#9E9E9E', // @dark_gray
  errorColor: '#FF4526', // Based on portland_orange
}

const styles = StyleSheet.create({
  historyDetailArea: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 10,
  },
  autoReceiveMore: {},
  historyShowmorelink: {
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clickable: {},
  error: {},
  showmorelinkIcon: {
    width: 24,
    height: 24,
  },
  errorIcon: {
    tintColor: colors.errorColor,
  },
  loadingSpinnerContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingSpinner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.mediumTurquoise,
  },
})
