import React from 'react'
import { View, Text, Animated, StyleSheet, Platform } from 'react-native'
import uawMsgs from '../utilities/uawmsgs'
import Constants from '../utilities/constants'
import ButtonIconic from './ButtonIconic'
import StatusIcon from './StatusIcon'
import OokIcon from '../icons/OokIcon'
import CloseIcon from '../icons/CloseIcon'
const colors = {
  white: '#FFFFFF',
  platinum: '#E5E5E5',
  darkJungleGreen: '#1F2937',
  darkGray: '#666666',
}

const styles = StyleSheet.create({
  statusbar: {
    position: 'relative',
    width: 240,
    height: 48,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: colors.white,
    ...Platform.select({
      ios: {
        shadowColor: colors.platinum,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  statusbarMessage: {
    position: 'absolute',
    left: 24,
    right: 200,
    top: '50%',
    transform: [{ translateY: -12 }], // Approximate -50% for the content height
  },
  statusbarMessageHeader: {
    marginRight: 8,
    color: colors.darkJungleGreen,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 20.8, // 1.6 * 13
    letterSpacing: 0.3,
  },
  statusbarMessageStatusIconArea: {
    position: 'relative',
    width: 12,
    height: 12,
    marginRight: 8,
  },
  statusbarMessageStatusIcon: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  statusbarMessageStatusChecked: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    tintColor: colors.white, // Equivalent to filter: brightness(0) invert(100%)
  },
  statusbarMessageStatusLabel: {
    marginRight: 8,
    color: colors.darkJungleGreen,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 20.8,
    letterSpacing: 0.3,
  },
  statusbarMessageStatusDisplay: {
    fontSize: 9,
    fontWeight: '400',
    lineHeight: 14.4, // 1.6 * 9
    letterSpacing: 1.3,
    color: colors.darkGray,
  },
  statusbarCloseButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 16,
    height: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

/**
 * Statusbar
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.runningAnimationTable
 * props.uiData.statusbarCloseButton_onClick
 * props.style - Style object for the statusbar
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.fadeAnim = new Animated.Value(0)
  }

  componentDidUpdate(prevProps) {
    const { props } = this
    const signInStatus = props.uiData.ucUiStore.getSignInStatus()
    const statusMe = props.uiData.ucUiStore.getChatClient().getStatus()
    const shouldAnimate =
      signInStatus === 3 &&
      (statusMe.status !== Constants.STATUS_AVAILABLE || statusMe.display) &&
      props.uiData.runningAnimationTable['statusbar']

    if (shouldAnimate) {
      this.startAnimation()
    }
  }

  startAnimation() {
    this.fadeAnim.setValue(0.9)
    Animated.sequence([
      Animated.delay(2000),
      Animated.timing(this.fadeAnim, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start()
  }

  render() {
    const { props } = this
    const signInStatus = props.uiData.ucUiStore.getSignInStatus()
    const statusMe = props.uiData.ucUiStore.getChatClient().getStatus()
    const shouldShow =
      signInStatus === 3 &&
      (statusMe.status !== Constants.STATUS_AVAILABLE || statusMe.display) &&
      props.uiData.runningAnimationTable['statusbar']

    if (!shouldShow) {
      return null
    }

    return (
      <Animated.View
        style={[styles.statusbar, { opacity: this.fadeAnim }, this.props.style]}
      >
        <View style={styles.statusbarMessage}>
          <View style={styles.row}>
            <Text style={styles.statusbarMessageHeader}>
              {uawMsgs.MSG_STATUSBAR_MESSAGE_HEADER}
            </Text>
            <View style={styles.statusbarMessageStatusIconArea}>
              <StatusIcon
                style={styles.statusbarMessageStatusIcon}
                status={statusMe.status}
              />
              <View style={styles.statusbarMessageStatusChecked}>
                <OokIcon />
              </View>
            </View>
            <Text style={styles.statusbarMessageStatusLabel}>
              {statusMe.status === Constants.STATUS_AVAILABLE
                ? uawMsgs.CMN_OWN_STATUS_STRING_AVAILABLE
                : statusMe.status === Constants.STATUS_OFFLINE
                  ? uawMsgs.CMN_OWN_STATUS_STRING_INVISIBLE
                  : statusMe.status === Constants.STATUS_BUSY
                    ? uawMsgs.CMN_OWN_STATUS_STRING_BUSY
                    : ''}
            </Text>
            <Text style={styles.statusbarMessageStatusDisplay}>
              {statusMe.display}
            </Text>
          </View>
        </View>
        <ButtonIconic
          style={styles.statusbarCloseButton}
          iconSource={<CloseIcon />}
          title={uawMsgs.CMN_CLOSE}
          onPress={() => props.uiData.fire('statusbarCloseButton_onClick')}
        />
      </Animated.View>
    )
  }
}
