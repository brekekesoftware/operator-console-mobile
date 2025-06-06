import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import uawMsgs from '../utilities/uawmsgs'
import { int } from '../utilities/strings'
import ButtonLabeled from './ButtonLabeled'
import Errors from '../utilities/errors'
import { formatStr } from '../utilities/strings'

/**
 * Messagebar - React Native version
 * A component that displays connection status messages and actions
 *
 * props.uiData - UI data object
 * props.uiData.ucUiStore - UI store
 * props.uiData.ownerDocument - Document object
 * props.uiData.messagebarCancelButton_onClick - Cancel button click handler
 * props.uiData.messagebarReloadButton_onClick - Reload button click handler
 * props.uiData.messagebarRetryButton_onClick - Retry button click handler
 * props.style - Additional styles
 */
export default class Messagebar extends React.Component {
  constructor(props) {
    super(props)
    this.interval = null
    this.state = {
      someDragging: false,
      secondsElapsed: 0,
    }
  }

  componentDidUpdate() {
    const props = this.props
    const signInStatus = props.uiData.ucUiStore.getSignInStatus()
    const lastSignOutReason = props.uiData.ucUiStore.getLastSignOutReason()
    const reSignInTime = int(
      (signInStatus === 0 || signInStatus === 1) &&
        lastSignOutReason.reSignInTime,
    )

    if (reSignInTime) {
      if (!this.interval) {
        this.interval = setInterval(this.tick.bind(this), 500)
      }
    } else {
      if (this.interval) {
        clearInterval(this.interval)
        this.interval = null
      }
      if (this.state.secondsElapsed) {
        this.setState({ secondsElapsed: 0 })
      }
    }
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
  }

  tick() {
    const props = this.props
    const signInStatus = props.uiData.ucUiStore.getSignInStatus()
    const lastSignOutReason = props.uiData.ucUiStore.getLastSignOutReason()
    const reSignInTime = int(
      (signInStatus === 0 || signInStatus === 1) &&
        lastSignOutReason.reSignInTime,
    )

    if (reSignInTime) {
      this.setState({
        secondsElapsed: int((999 + reSignInTime - +new Date()) / 1000),
      })
    } else if (this.state.secondsElapsed) {
      this.setState({ secondsElapsed: 0 })
    }
  }

  handleDrag = () => {
    if (!this.state.someDragging) {
      this.setState({ someDragging: true })
      setTimeout(this.checkDragEnd, 1000)
    }
  }

  checkDragEnd = () => {
    if (this.state.someDragging) {
      this.setState({ someDragging: false })
    }
  }

  render() {
    const props = this.props
    const signInStatus = props.uiData.ucUiStore.getSignInStatus()
    const lastSignOutReason = props.uiData.ucUiStore.getLastSignOutReason()

    const isHidden = signInStatus === 3 || lastSignOutReason.code === 1

    if (isHidden) {
      return null
    }

    let messageText = ''

    if (
      lastSignOutReason.code === Errors.UPDATE_STARTED ||
      lastSignOutReason.code === Errors.VERSION_INVALID
    ) {
      messageText = uawMsgs.MSG_MESSAGEBAR_MAINTENANCE
    } else if (
      lastSignOutReason.code === Errors.PLEONASTIC_LOGIN ||
      lastSignOutReason.code === Errors.ALREADY_SIGNED_IN
    ) {
      messageText = uawMsgs.MSG_MESSAGEBAR_PLEONASTIC
    } else if (lastSignOutReason.code === Errors.CANNOT_START_MFA) {
      messageText = uawMsgs.MSG_MESSAGEBAR_MFA
    } else {
      messageText = uawMsgs.MSG_MESSAGEBAR_DISCONNECTED
    }

    if (signInStatus === 2) {
      messageText += ' ' + uawMsgs.MSG_MESSAGEBAR_CONNECTING
    } else if (this.state.secondsElapsed) {
      messageText +=
        ' ' + formatStr(uawMsgs.MSG_MESSAGEBAR_RETRY, this.state.secondsElapsed)
    }

    const showCancelButton =
      (signInStatus === 0 || signInStatus === 1) && this.state.secondsElapsed

    const showReloadButton =
      (signInStatus === 0 || signInStatus === 1) &&
      (lastSignOutReason.code === Errors.UPDATE_STARTED ||
        lastSignOutReason.code === Errors.VERSION_INVALID ||
        lastSignOutReason.code === Errors.CANNOT_START_MFA)

    const showRetryButton =
      (signInStatus === 0 || signInStatus === 1) &&
      !(
        lastSignOutReason.code === Errors.UPDATE_STARTED ||
        lastSignOutReason.code === Errors.VERSION_INVALID ||
        lastSignOutReason.code === Errors.CANNOT_START_MFA
      )

    return (
      <View
        style={[
          styles.messagebar,
          this.state.someDragging && styles.someDragging,
          props.style,
        ]}
      >
        <Text style={styles.messagebarMessage}>{messageText}</Text>

        {showCancelButton && (
          <ButtonLabeled
            style={[styles.messagebarButton, styles.cancelButton]}
            title={uawMsgs.LBL_MESSAGEBAR_CANCEL_BUTTON_TOOLTIP}
            onClick={props.uiData.fire.bind(
              props.uiData,
              'messagebarCancelButton_onClick',
            )}
          >
            {uawMsgs.LBL_MESSAGEBAR_CANCEL_BUTTON}
          </ButtonLabeled>
        )}

        {showReloadButton && (
          <ButtonLabeled
            style={[styles.messagebarButton, styles.reloadButton]}
            title={uawMsgs.LBL_MESSAGEBAR_RELOAD_BUTTON_TOOLTIP}
            onClick={props.uiData.fire.bind(
              props.uiData,
              'messagebarReloadButton_onClick',
            )}
          >
            {uawMsgs.LBL_MESSAGEBAR_RELOAD_BUTTON}
          </ButtonLabeled>
        )}

        {showRetryButton && (
          <ButtonLabeled
            style={[styles.messagebarButton, styles.retryButton]}
            title={uawMsgs.LBL_MESSAGEBAR_RETRY_BUTTON_TOOLTIP}
            onClick={props.uiData.fire.bind(
              props.uiData,
              'messagebarRetryButton_onClick',
            )}
          >
            {uawMsgs.LBL_MESSAGEBAR_RETRY_BUTTON}
          </ButtonLabeled>
        )}
      </View>
    )
  }
}

// Define colors from CSS variables
const colors = {
  mediumTurquoise: '#4BC5DE', // @medium_turquoise
  white: '#FFFFFF', // @white
  darkJungleGreen: '#212121', // @dark_jungle_green
  isabelline: '#EEEEEE', // @isabelline
  platinum: '#E0E0E0', // @platinum
  snow: '#FAFAFA', // @snow
  whiteSmoke: '#F5F5F5', // @white_smoke
  darkGray: '#9E9E9E', // @dark_gray
  portlandOrange: '#FF4526', // @portland_orange
}

const styles = StyleSheet.create({
  messagebar: {
    width: 240,
    height: 48,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: colors.mediumTurquoise,
    shadowColor: colors.platinum,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
  },
  someDragging: {
    pointerEvents: 'none',
  },
  messagebarMessage: {
    position: 'absolute',
    left: 24,
    right: 200,
    top: '50%',
    transform: [{ translateY: -10 }],
    color: colors.white,
    fontSize: (13 * 16) / 16,
    fontWeight: '400',
    lineHeight: 1.6 * ((13 * 16) / 16),
    letterSpacing: (0.3 * 16) / 16,
  },
  messagebarButton: {
    position: 'absolute',
    width: 88,
    top: 12,
    height: 24,
    color: colors.darkJungleGreen,
    backgroundColor: colors.white,
  },
  cancelButton: {
    right: 112,
  },
  reloadButton: {
    right: 12,
  },
  retryButton: {
    right: 12,
  },
})
