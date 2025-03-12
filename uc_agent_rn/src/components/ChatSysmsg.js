import React from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import NameEmbeddedSpan from './NameEmbeddedSpan.js'

const colors = {
  darkGray: '#9E9E9E',
  portlandOrange: '#FF4526',
}

const styles = StyleSheet.create({
  sysmsg: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 20.8, // 1.6 * 13
    letterSpacing: 0.3,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 16,
    paddingRight: 0,
    color: colors.darkGray,
  },
  error: {
    color: colors.portlandOrange,
  },
  hidden: {
    lineHeight: 0,
    height: 0,
    padding: 0,
    overflow: 'hidden',
  },
})

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
export default class extends React.Component {
  constructor(props) {
    super(props)

    this.animatedHeight = new Animated.Value(this.shouldBeHidden() ? 0 : 1)
    this.animatedOpacity = new Animated.Value(this.shouldBeHidden() ? 0 : 1)
  }

  componentDidMount() {
    this.handleAnimation()
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.sysmsg.sysmsgType !== this.props.sysmsg.sysmsgType ||
      (prevProps.nextChat &&
        this.props.nextChat &&
        prevProps.nextChat.type !== this.props.nextChat.type) ||
      (prevProps.nextChat &&
        this.props.nextChat &&
        prevProps.nextChat.sysmsgType !== this.props.nextChat.sysmsgType)
    ) {
      this.handleAnimation()
    }
  }

  shouldBeHidden() {
    const { props } = this

    if (props.sysmsg.sysmsgType === 'MSG_CONFERENCE_MEMBER_OFFLINE') {
      if (
        props.nextChat &&
        props.nextChat.type === 'sysmsg' &&
        props.nextChat.sysmsgType === 'MSG_CONFERENCE_MEMBER_ONLINE'
      ) {
        return true
      }
    }

    if (
      props.sysmsg.sysmsgType === 'MSG_CONFERENCE_MEMBER_ONLINE' &&
      props.prevChat &&
      props.prevChat.type === 'sysmsg' &&
      props.prevChat.sysmsgType === 'MSG_CONFERENCE_MEMBER_OFFLINE'
    ) {
      return true
    }

    return false
  }

  handleAnimation() {
    const { props } = this

    if (
      props.sysmsg.sysmsgType === 'MSG_CONFERENCE_MEMBER_OFFLINE' &&
      !props.nextChat
    ) {
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(this.animatedHeight, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }),
          Animated.timing(this.animatedOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }),
        ]).start()
      }, 3000)
    }
  }

  render() {
    const { props } = this
    const isError = props.sysmsg.sysmsgLevel === 'error'
    const isConferenceMemberOffline =
      props.sysmsg.sysmsgType === 'MSG_CONFERENCE_MEMBER_OFFLINE'
    const isConferenceMemberOnline =
      props.sysmsg.sysmsgType === 'MSG_CONFERENCE_MEMBER_ONLINE'
    const isEndOfChatList = !props.nextChat
    const isBeforeOnline =
      props.nextChat &&
      props.nextChat.type === 'sysmsg' &&
      props.nextChat.sysmsgType === 'MSG_CONFERENCE_MEMBER_ONLINE'

    const shouldHide = this.shouldBeHidden()

    const containerStyles = [
      styles.sysmsg,
      isError && styles.error,
      shouldHide && styles.hidden,
    ]

    const animatedStyles = {
      height: this.animatedHeight.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 30],
      }),
      opacity: this.animatedOpacity,
    }

    let animationDelay = null
    if (props.uiData.configurations.sysmsgDelay) {
      animationDelay = props.uiData.configurations.sysmsgDelay
    }

    const format = uawMsgs[props.sysmsg.sysmsgType] || '{0}'

    return (
      <Animated.View style={[containerStyles, animatedStyles]}>
        {props.sysmsg.sysmsgData ? (
          <Text>{format.split('{0}').join(props.sysmsg.sysmsgData)}</Text>
        ) : (
          <NameEmbeddedSpan
            ucUiStore={props.uiData.ucUiStore}
            format={format}
            buddy={props.sysmsg.buddy}
          />
        )}
      </Animated.View>
    )
  }
}
