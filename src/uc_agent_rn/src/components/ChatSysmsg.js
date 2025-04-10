import React from 'react'
import { View, Text, Animated, StyleSheet } from 'react-native'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import NameEmbeddedSpan from './NameEmbeddedSpan.js'

const colors = {
  dark_gray: '#9e9e9e',
  portland_orange: '#ff4526',
}

/**
 * ChatSysmsg
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.configurations
 * props.sysmsg
 * props.sysmsg.sysmsgLevel
 * props.sysmsg.sysmsgType
 * props.sysmsg.buddy
 * props.sysmsg.sysmsgData
 * props.nextChat
 */
export default class ChatSysmsg extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      animation: new Animated.Value(0),
    }
  }

  componentDidMount() {
    if (this.shouldAnimate()) {
      const delay = this.props.uiData.configurations.sysmsgDelay || 3000
      setTimeout(() => {
        Animated.timing(this.state.animation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }).start()
      }, delay)
    }
  }

  shouldAnimate() {
    const { props } = this
    return (
      props.sysmsg.sysmsgType === 'MSG_CONFERENCE_MEMBER_OFFLINE' &&
      (!props.nextChat ||
        (props.nextChat.type === 'sysmsg' &&
          props.nextChat.sysmsgType === 'MSG_CONFERENCE_MEMBER_ONLINE'))
    )
  }

  render() {
    const { props } = this
    const isError = props.sysmsg.sysmsgLevel === 'error'
    const isOffline =
      props.sysmsg.sysmsgType === 'MSG_CONFERENCE_MEMBER_OFFLINE'
    const isOnline = props.sysmsg.sysmsgType === 'MSG_CONFERENCE_MEMBER_ONLINE'
    const isEndOfList = !props.nextChat
    const isBeforeOnline =
      props.nextChat?.type === 'sysmsg' &&
      props.nextChat?.sysmsgType === 'MSG_CONFERENCE_MEMBER_ONLINE'

    const format = uawMsgs[props.sysmsg.sysmsgType] || '{0}'

    const animatedStyle = this.shouldAnimate()
      ? {
          height: this.state.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 24],
          }),
          paddingTop: this.state.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 4],
          }),
          paddingBottom: this.state.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 4],
          }),
          paddingLeft: this.state.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 16],
          }),
        }
      : {}

    return (
      <Animated.View style={[styles.brChatSysmsg, animatedStyle]}>
        <Text
          style={[
            styles.sysmsgText,
            isError && styles.brChatError,
            isOffline && isBeforeOnline && styles.brBeforeOnline,
            isOnline &&
              isBeforeOnline &&
              styles.brConferenceMemberOnlineCollapsed,
          ]}
        >
          {props.sysmsg.sysmsgData ? (
            format.split('{0}').join(props.sysmsg.sysmsgData)
          ) : (
            <NameEmbeddedSpan
              ucUiStore={props.uiData.ucUiStore}
              format={format}
              buddy={props.sysmsg.buddy}
            />
          )}
        </Text>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  brChatSysmsg: {
    overflow: 'hidden',
  },
  sysmsgText: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 20.8, // 1.6 * 13
    letterSpacing: 0.3,
    paddingVertical: 4,
    paddingLeft: 16,
    color: colors.dark_gray,
  },
  brChatError: {
    color: colors.portland_orange,
  },
  brBeforeOnline: {
    height: 0,
    paddingVertical: 0,
    paddingLeft: 0,
    overflow: 'hidden',
  },
  brConferenceMemberOnlineCollapsed: {
    height: 0,
    paddingVertical: 0,
    paddingLeft: 0,
    overflow: 'hidden',
  },
})
