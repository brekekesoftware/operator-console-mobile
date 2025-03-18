import React from 'react'
import {
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Platform,
  Linking,
} from 'react-native'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import Icon from './Icon'
// TODO: Add icon component

/**
 * ChatFileDownloadLargeButton - React Native version
 * A button component for file downloads in chat
 *
 * props.uiData - UI data object
 * props.uiData.ucUiAction - UI actions
 * props.message - Message object
 * props.message.messageFile - File details
 */
export default class ChatFileDownloadLargeButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clicked: false,
      animationValue: new Animated.Value(-32),
    }

    this.animation1 = Animated.timing(this.state.animationValue, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    })

    this.animation2 = Animated.loop(
      Animated.timing(this.state.animationValue, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
    )
  }

  componentDidMount() {
    this.updateAnimation()
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.message.messageFile.status !==
        this.props.message.messageFile.status ||
      prevProps.message.messageFile.progress !==
        this.props.message.messageFile.progress
    ) {
      this.updateAnimation()
    }
  }

  componentWillUnmount() {
    this.animation1.stop()
    this.animation2.stop()
  }

  updateAnimation = () => {
    const { message } = this.props

    this.state.animationValue.setValue(-32)

    if (message.messageFile.status === Constants.FILE_STATUS_TRANSFERRING) {
      if (message.messageFile.progress === 0) {
        this.animation1.start()
      } else if (message.messageFile.progress <= 98) {
        this.animation2.start()
      }
    }
  }

  handlePress = () => {
    const { message, uiData } = this.props

    if (
      this.state.clicked ||
      message.messageFile.status !== Constants.FILE_STATUS_UNACCEPTED
    ) {
      this.setState({ clicked: true })
      return
    }

    this.setState({ clicked: true })

    uiData.ucUiAction.acceptFile({
      file_id: message.messageFile.file_id,

      onDownloadUrl: url => {
        if (url) {
          Linking.openURL(url).catch(err => {
            console.error('Error opening file download URL:', err)
          })
        }
      },
    })
  }

  render() {
    const { message } = this.props
    const fileStatus = message.messageFile.status
    const isEnabled =
      fileStatus === Constants.FILE_STATUS_UNACCEPTED && !this.state.clicked
    const isReadonly = fileStatus === Constants.FILE_STATUS_TRANSFERRING
    const progress = message.messageFile.progress || 0

    if (!isEnabled && !isReadonly) {
      return null
    }

    const tooltipText = isEnabled
      ? message.messageFile.name
      : uawMsgs.LBL_CHAT_FILE_ICON_TOOLTIP

    return (
      <TouchableOpacity
        style={[
          styles.chatFileDownloadLargeButton,
          isEnabled && styles.enabled,
          isReadonly && styles.readonly,
        ]}
        onPress={isEnabled ? this.handlePress : null}
        disabled={!isEnabled}
        accessibilityLabel={tooltipText}
        activeOpacity={isEnabled ? 0.7 : 1}
      >
        <View style={styles.iconContainer}>
          <Icon style={styles.fileIcon} name='file' />

          <Animated.View
            style={[
              styles.iconInner,
              { transform: [{ translateY: this.state.animationValue }] },
            ]}
          >
            <Icon name='download' style={styles.downloadIcon} />
          </Animated.View>
        </View>
      </TouchableOpacity>
    )
  }
}

const colors = {
  isabellineTp: 'rgba(0, 0, 0, 0.065)', // @isabelline_tp
}

const styles = StyleSheet.create({
  chatFileDownloadLargeButton: {
    position: 'relative',
    width: 48,
    height: 48,
    borderRadius: 4,
  },
  enabled: {},
  readonly: {
    opacity: 0.8,
  },
  iconContainer: {
    position: 'relative',
    left: 8,
    top: 8,
    width: 32,
    height: 32,
    overflow: 'hidden',
  },
  fileIcon: {
    width: 32,
    height: 32,
  },
  iconInner: {
    position: 'absolute',
    left: 0,
    width: 32,
    height: 96,
  },
  downloadIcon: {
    width: 32,
    height: 32,
  },
  pressed: {
    backgroundColor: colors.isabellineTp,
  },
})
