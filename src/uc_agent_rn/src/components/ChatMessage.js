import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Linking,
} from 'react-native'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ButtonIconic from './ButtonIconic.js'
import NameEmbeddedSpan from './NameEmbeddedSpan.js'
import ChatFileDownloadButton from './ChatFileDownloadButton.js'
import ChatFileDownloadLargeButton from './ChatFileDownloadLargeButton.js'
import { formatStr, formatFileSize, formatTime } from '../utilities/strings.js'
import PhoneIcon from '../icons/PhoneIcon.js'
import CloseIcon from '../icons/CloseIcon.js'
import ErrorIcon from '../icons/ErrorIcon.js'
import FileIcon from '../icons/FileIcon.js'
const urlRegExp = new RegExp(
  "https?://[\\w!#\\$%&'\\(\\)\\*\\+,\\-\\./:;=\\?@~]+",
  'g',
)
const urlRegExpNG = new RegExp(
  '"https?://[\\w!#\\$%&\'\\(\\)\\*\\+,\\-\\./:;=\\?@~]+',
  'g',
)

/**
 * ChatMessage
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.configurations
 * props.uiData.chatFileOpenInNewWindowButton_onClick
 * props.uiData.chatFileCancelButton_onClick
 * props.uiData.chatInlineImage_onClick
 * props.uiData.chatInlineImage_onLoad
 * props.message
 * props.message.senderInfo
 * props.message.ctype
 * props.message.messageText
 * props.message.errorType
 * props.message.errorDetail
 * props.message.messageFile
 * props.message.replyEnabled
 * props.message.sentTimeValue
 * props.isLastOfLast
 */
export default class ChatMessage extends React.Component {
  renderTextContent(messageText) {
    // Convert URLs to clickable links
    const parts = messageText.split(urlRegExp)
    const matches = messageText.match(urlRegExp) || []

    return parts.reduce((acc, part, index) => {
      acc.push(<Text key={`text-${index}`}>{part}</Text>)
      if (matches[index]) {
        acc.push(
          <TouchableOpacity
            key={`link-${index}`}
            onPress={() => Linking.openURL(matches[index])}
          >
            <Text style={styles.chatUrlLink}>{matches[index]}</Text>
          </TouchableOpacity>,
        )
      }
      return acc
    }, [])
  }

  render() {
    const { props } = this
    const profile = props.uiData.ucUiStore.getChatClient().getProfile()

    const messageContainerStyle = [
      styles.brChatMessage,
      props.isLastOfLast && styles.lastOfLast,
    ]

    if (
      props.message.ctype === Constants.CTYPE_FILE_REQUEST &&
      props.message.messageFile
    ) {
      messageContainerStyle.push(styles.chatFileMessage)
      if (
        props.message.messageFile.status ===
          Constants.FILE_STATUS_LOCAL_CANCEL ||
        props.message.messageFile.status === Constants.FILE_STATUS_REMOTE_CANCEL
      ) {
        messageContainerStyle.push(styles.chatFileMessageCanceled)
      }
    }

    const renderMessageContent = () => {
      const elements = []
      console.log('#Duy Phan console props.message.ctype', props.message.ctype)
      // Error message
      if (props.message.errorType) {
        elements.push(
          <View key='error' style={styles.chatMessageError}>
            <View style={styles.errorIcon}>
              <ErrorIcon color={colors.errorColor} />
            </View>
          </View>,
        )
      }

      // Text message
      if (props.message.ctype === Constants.CTYPE_TEXT) {
        elements.push(
          <View key='text' style={styles.textContainer}>
            {this.renderTextContent(props.message.messageText)}
          </View>,
        )
      }

      // File message
      else if (
        props.message.ctype === Constants.CTYPE_FILE_REQUEST &&
        props.message.messageFile
      ) {
        const file = props.message.messageFile

        // File icon and name
        elements.push(
          <View key='file' style={styles.fileContainer}>
            <View style={styles.fileIcon}>
              <FileIcon />
            </View>
            <Text style={styles.fileName}>{file.name}</Text>
          </View>,
        )

        // File size and progress
        if (file.status !== Constants.FILE_STATUS_UNPREPARED) {
          elements.push(
            <Text key='size' style={styles.fileSize}>
              {formatFileSize(file.size)}
              {(file.progress < 10 ? ' ' : '') + ' (' + file.progress + '%)'}
            </Text>,
          )
        }

        // Preview image
        if (file.inlineImage && file.inlineImage.url) {
          elements.push(
            <TouchableOpacity
              key='preview'
              style={styles.inlineImageArea}
              onPress={() =>
                props.uiData.fire(
                  'chatInlineImage_onClick',
                  file.inlineImage.url,
                )
              }
            >
              <Image
                source={{ uri: file.inlineImage.url }}
                style={styles.inlineImage}
                onLoad={() => props.uiData.fire('chatInlineImage_onLoad', file)}
              />
            </TouchableOpacity>,
          )
        }
      }

      // Call result
      else if (props.message.ctype === Constants.CTYPE_CALL_RESULT) {
        let callResult = {}
        try {
          callResult = JSON.parse(props.message.messageText) || {}
        } catch (ex) {}

        const senderUser =
          (!callResult.externalincoming &&
            props.uiData.ucUiStore.getBuddyUserForUi(
              props.message.senderInfo,
            )) ||
          {}
        const min = Math.floor(int(callResult.talklen) / 60000)
        const sec =
          0 < callResult.talklen && callResult.talklen < 1000
            ? 1
            : Math.floor((int(callResult.talklen) % 60000) / 1000)

        elements.push(
          <View key='callResult' style={styles.callResultContainer}>
            <View
              style={[
                styles.callResultIcon,
                senderUser.isMe ? null : styles.callResultIconIncoming,
                !callResult.talklen && styles.callResultIconMissed,
              ]}
            >
              <View style={styles.phoneIcon}>
                <PhoneIcon />
              </View>
              {!callResult.talklen && (
                <View style={styles.missedCallIcon}>
                  <CloseIcon />
                </View>
              )}
            </View>
            <Text style={styles.callResultTime}>
              {string(
                props.message.sentTimeValue &&
                  formatTime(
                    int(props.message.sentTimeValue) - int(callResult.talklen),
                  ),
              )}
            </Text>
            <Text style={styles.callResultDirection}>
              {senderUser.isMe
                ? callResult.talklen
                  ? uawMsgs.LBL_CHAT_CALL_RESULT_DIRECTION_OUTGOING
                  : uawMsgs.LBL_CHAT_CALL_RESULT_DIRECTION_OUTGOING_MISSED
                : callResult.talklen
                  ? uawMsgs.LBL_CHAT_CALL_RESULT_DIRECTION_INCOMING
                  : uawMsgs.LBL_CHAT_CALL_RESULT_DIRECTION_INCOMING_MISSED}
            </Text>
            <Text style={styles.callResultLength}>
              {min > 0
                ? formatStr(uawMsgs.LBL_CHAT_CALL_RESULT_LENGTH_MIN, min, sec)
                : sec > 0
                  ? formatStr(uawMsgs.LBL_CHAT_CALL_RESULT_LENGTH_SEC, sec)
                  : ''}
            </Text>
          </View>,
        )
      }

      return elements
    }

    return <View style={messageContainerStyle}>{renderMessageContent()}</View>
  }
}

const styles = StyleSheet.create({
  brChatMessage: {
    fontSize: 13,
    fontWeight: '400',
    // lineHeight: 20.8, // 1.6 * 13
    letterSpacing: 0.3,
    paddingVertical: 1,
    paddingHorizontal: 0,
    // height: 64,
  },
  chatMessageError: {
    width: 24,
    height: 20,
    marginRight: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorIcon: {
    width: 24,
    height: 20,
    tintColor: '#FF4D4F',
  },
  chatUrlLink: {
    color: '#74C365', // @mantis
  },
  chatFileMessage: {
    color: '#666666', // @dark_gray
  },
  chatFileMessageCanceled: {
    textDecorationLine: 'line-through',
  },
  fileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileIcon: {
    width: 24,
    height: 20,
    marginRight: 4,
    tintColor: '#666666',
  },
  fileName: {
    flex: 1,
  },
  fileSize: {
    marginTop: 4,
  },
  inlineImageArea: {
    minHeight: 64,
    marginTop: 8,
  },
  inlineImage: {
    width: 64,
    height: 64,
    borderRadius: 4,
  },
  callResultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  callResultIcon: {
    width: 24,
    height: 20,
    marginRight: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callResultIconIncoming: {
    transform: [{ scaleX: -1 }],
  },
  callResultIconMissed: {
    tintColor: '#FF4D4F',
  },
  phoneIcon: {
    width: 24,
    height: 20,
  },
  missedCallIcon: {
    position: 'absolute',
    width: 10,
    height: 10,
    left: 10,
    top: 2,
  },
  callResultTime: {
    marginRight: 12,
    color: '#666666',
  },
  callResultDirection: {
    marginRight: 12,
    color: '#666666',
  },
  callResultLength: {
    marginRight: 12,
    color: '#666666',
  },
  textContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  lastOfLast: {},
})
