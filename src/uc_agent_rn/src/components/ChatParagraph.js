import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Platform,
} from 'react-native'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ChatMessageList from './ChatMessageList.js'
import {
  formatMessageDate,
  formatMessageDateTime,
} from '../utilities/strings.js'

const colors = {
  white: '#FFFFFF',
  isabelline: '#EEEEEE',
  platinum: '#E0E0E0',
  darkGray: '#9E9E9E',
  darkJungleGreen: '#212121',
  mediumTurquoise: '#4BC5DE',
}

const styles = StyleSheet.create({
  paragraph: {
    position: 'relative',
    minHeight: 64,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 72,
    paddingRight: 0,
  },
  paragraphHovered: {
    backgroundColor: colors.isabelline,
  },
  withTopicSplitter: {
    marginTop: 16,
  },
  topicSplitter: {
    position: 'absolute',
    left: 0,
    top: -16,
    right: 0,
    bottom: 0,
    height: 16,
  },
  topicSplitterDate: {
    position: 'relative',
    fontSize: 9,
    fontWeight: '400',
    lineHeight: 14.4, // 1.6 * 9
    letterSpacing: 1.3,
    color: colors.darkGray,
  },
  topicSplitterDateWithDate: {
    marginHorizontal: 8,
  },
  topicSplitterLine: {
    height: 1,
    flex: 1,
    backgroundColor: colors.platinum,
  },
  topicSplitterLineLeft: {},
  topicSplitterLineRight: {},
  messageImage: {
    position: 'absolute',
    left: 16,
    top: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  messageName: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 20.8, // 1.6 * 13
    letterSpacing: 0.3,
  },
  messageTime: {
    fontSize: 9,
    fontWeight: '400',
    lineHeight: 14.4, // 1.6 * 9
    letterSpacing: 1.3,
    paddingLeft: 26,
    color: colors.darkGray,
  },
  unreachedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: 26,
  },
  unreachedDotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageMailSubject: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 38.4, // 2.4 * 16
    letterSpacing: 0.3,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

/**
 * ChatParagraph
 * props.uiData
 * props.uiData.ucUiStore
 * props.panelType
 * props.panelCode
 * props.paragraph
 * props.paragraph.messageList
 * props.previousParagraph
 * props.isLast
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.mailSubject = null
    this.state = {
      isHovered: false,
    }

    this.dot1Anim = new Animated.Value(0)
    this.dot2Anim = new Animated.Value(0)
    this.dot3Anim = new Animated.Value(0)
  }

  componentDidMount() {
    this.startUnreachedAnimation()
  }

  componentDidUpdate(prevProps) {
    const firstMessage = this.props.paragraph.messageList[0]
    const unreached = Boolean(firstMessage && firstMessage.unreached)
    const prevFirstMessage = prevProps.paragraph.messageList[0]
    const prevUnreached = Boolean(
      prevFirstMessage && prevFirstMessage.unreached,
    )

    if (unreached !== prevUnreached) {
      this.startUnreachedAnimation()
    }
  }

  startUnreachedAnimation() {
    const firstMessage = this.props.paragraph.messageList[0]
    const unreached = Boolean(firstMessage && firstMessage.unreached)
    const errorType = string(firstMessage && firstMessage.errorType)

    if (unreached && !errorType) {
      this.animateDot(this.dot1Anim, 1000)
      this.animateDot(this.dot2Anim, 1200)
      this.animateDot(this.dot3Anim, 1400)
    }
  }

  animateDot(animValue, delay) {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animValue, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false,
        }),
        Animated.delay(delay),
        Animated.timing(animValue, {
          toValue: 1,
          duration: 150,
          useNativeDriver: false,
        }),
        Animated.timing(animValue, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: false,
        }),
        Animated.timing(animValue, {
          toValue: 0,
          duration: 150,
          useNativeDriver: false,
        }),
      ]),
    ).start()
  }

  render() {
    const { props } = this
    const firstMessage = props.paragraph.messageList[0]
    const senderInfo = firstMessage && firstMessage.senderInfo
    const user =
      senderInfo && props.uiData.ucUiStore.getBuddyUserForUi(senderInfo)
    const user_name =
      firstMessage.conf_type === 'webchat'
        ? string(user && user.display_name)
        : string(user && user.name)
    const isMe = Boolean(user && user.isMe)
    const paragraphClassIndex = int(user && user.paragraphClassIndex)
    const profile_image_url = string(user && user.profile_image_url)
    const topic_id = string(firstMessage && firstMessage.topic_id)
    const errorType = string(firstMessage && firstMessage.errorType)
    const unreached = Boolean(firstMessage && firstMessage.unreached)
    const messageTimeValue = int(firstMessage && firstMessage.sentTimeValue)
    const messageTime = string(
      messageTimeValue && formatMessageDateTime(messageTimeValue),
    )
    const previousFirstMessage =
      props.previousParagraph &&
      props.previousParagraph.messageList &&
      props.previousParagraph.messageList[0]
    const previous_topic_id = string(
      previousFirstMessage && previousFirstMessage.topic_id,
    )
    const previousMessageTimeValue = int(
      previousFirstMessage && previousFirstMessage.sentTimeValue,
    )

    if (!this.mailSubject && this.mailSubject !== '') {
      this.mailSubject =
        firstMessage &&
        firstMessage.messageExtInfo &&
        firstMessage.messageExtInfo.mailSubject
      if (!this.mailSubject && this.mailSubject !== '') {
        if (props.panelType === 'CONFERENCE') {
          const conf_id = (
            props.uiData.ucUiStore.getChatHeaderInfo({
              chatType: props.panelType,
              chatCode: props.panelCode,
            }) || {}
          ).conf_id
          const conference =
            conf_id &&
            props.uiData.ucUiStore.getChatClient().getConference(conf_id)
          this.mailSubject = conference
            ? props.uiData.ucUiStore.getMailSubject(conference)
            : ''
        } else {
          this.mailSubject = ''
        }
      }
    }

    const showTopicSplitter =
      topic_id && previous_topic_id && topic_id !== previous_topic_id
    const showDateInSplitter =
      showTopicSplitter &&
      new Date(messageTimeValue).toDateString() !==
        new Date(previousMessageTimeValue).toDateString()

    let imageSource = null
    if (!profile_image_url) {
      imageSource = require('../images/noimage.png')
    } else if (
      profile_image_url.indexOf(Constants.PROFILE_IMAGE_URL_DOWNLOAD) === -1
    ) {
      imageSource = { uri: profile_image_url }
    } else {
      imageSource = { uri: profile_image_url }
    }

    let callResult = {}
    if (firstMessage && firstMessage.ctype === Constants.CTYPE_CALL_RESULT) {
      try {
        callResult = JSON.parse(firstMessage.messageText) || {}
      } catch (ex) {}
    }

    const showUnreachedAnimation = unreached && !errorType

    const paragraphStyles = [
      styles.paragraph,
      this.state.isHovered && styles.paragraphHovered,
      showTopicSplitter && styles.withTopicSplitter,
    ]

    // Dot animation colors
    const dot1Color = this.dot1Anim.interpolate({
      inputRange: [0, 1],
      outputRange: ['transparent', colors.mediumTurquoise],
    })
    const dot2Color = this.dot2Anim.interpolate({
      inputRange: [0, 1],
      outputRange: ['transparent', colors.mediumTurquoise],
    })
    const dot3Color = this.dot3Anim.interpolate({
      inputRange: [0, 1],
      outputRange: ['transparent', colors.mediumTurquoise],
    })
    console.log('#Duy Phan console showTopicSplitter', showTopicSplitter)

    return (
      <TouchableOpacity
        style={paragraphStyles}
        onPressIn={() => this.setState({ isHovered: true })}
        onPressOut={() => this.setState({ isHovered: false })}
        activeOpacity={1}
      >
        {showTopicSplitter && (
          <View style={styles.topicSplitter}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <View
                style={[styles.topicSplitterLine, styles.topicSplitterLineLeft]}
              />
              {showDateInSplitter ? (
                <Text
                  style={[
                    styles.topicSplitterDate,
                    styles.topicSplitterDateWithDate,
                  ]}
                >
                  {string(
                    messageTimeValue && formatMessageDate(messageTimeValue),
                  )}
                </Text>
              ) : null}
              <View
                style={[
                  styles.topicSplitterLine,
                  styles.topicSplitterLineRight,
                ]}
              />
            </View>
          </View>
        )}

        {!callResult.externalincoming && (
          <Image source={imageSource} style={styles.messageImage} />
        )}

        <View style={styles.headerRow}>
          <Text style={styles.messageName}>
            {!callResult.externalincoming ? user_name : ''}
          </Text>

          {showUnreachedAnimation ? (
            <View style={styles.unreachedDotContainer}>
              <Animated.View
                style={[styles.unreachedDot, { backgroundColor: dot1Color }]}
              />
              <Animated.View
                style={[
                  styles.unreachedDot,
                  { backgroundColor: dot2Color, marginLeft: 6 },
                ]}
              />
              <Animated.View
                style={[
                  styles.unreachedDot,
                  { backgroundColor: dot3Color, marginLeft: 6 },
                ]}
              />
            </View>
          ) : (
            <Text style={styles.messageTime}>{messageTime}</Text>
          )}
        </View>

        {this.mailSubject && (
          <Text style={styles.messageMailSubject}>
            {string(this.mailSubject)}
          </Text>
        )}

        <ChatMessageList
          uiData={props.uiData}
          messageList={props.paragraph.messageList}
          isLast={props.isLast}
        />
      </TouchableOpacity>
    )
  }
}
