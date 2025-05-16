import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ButtonIconic from './ButtonIconic.js'
import NameEmbeddedSpan from './NameEmbeddedSpan.js'
import ChatFileDownloadButton from './ChatFileDownloadButton.js'
import ChatFileDownloadLargeButton from './ChatFileDownloadLargeButton.js'
import { formatStr, formatFileSize, formatTime } from '../utilities/strings.js'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native'
import PhoneIcon from '../icons/PhoneIcon.js'
import ErrorIcon from '../icons/ErrorIcon.js'
import UploadIcon from '../icons/UploadIcon.js'
import CancelIcon from '../icons/CancelIcon.js'
import DownloadIcon from '../icons/DownloadIcon.js'
import ExternallinkIcon from '../icons/ExternallinkIcon.js'
import { ActivityIndicator } from 'react-native'

const urlRegExp = new RegExp(
  "https?://[\\w!#\\$%&'\\(\\)\\*\\+,\\-\\./:;=\\?@~]+",
  'g',
)
const urlRegExpNG = new RegExp(
  '"https?://[\\w!#\\$%&\'\\(\\)\\*\\+,\\-\\./:;=\\?@~]+',
  'g',
)

const colors = {
  mantis: '#74C365',
  darkGray: '#9e9e9e',
  errorColor: '#FF4D4F',
}

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
export default class extends React.Component {
  render() {
    const props = this.props
    const profile = props.uiData.ucUiStore.getChatClient().getProfile()
    let messageStyle = [styles.brChatMessage]
    const chatMessageInnerElements = []
    if (props.message.ctype === Constants.CTYPE_TEXT) {
      // messageError
      if (props.message.errorType) {
        chatMessageInnerElements.push(
          <View key='error' style={styles.chatMessageError}>
            <Image
              source={require('../icons/ErrorIcon.js')}
              style={styles.errorIcon}
            />
          </View>,
        )
      }
      // messageText
      let messageText = props.message.messageText
      // url to link
      if (!messageText.match(urlRegExpNG)) {
        messageText = messageText.replace(
          urlRegExp,
          url => `<a href="${url}" class="brChatUrlLink">${url}</a>`,
        )
      }
      // brReplyButton to brReplyButton brDisabled
      if (
        !props.message.replyEnabled ||
        (
          props.uiData.ucUiStore.getBuddyUserForUi(props.message.senderInfo) ||
          {}
        ).isMe
      ) {
        messageText = messageText.replace(
          /class="[^"]*brReplyButton[^"]*/g,
          '$& brDisabled',
        )
      } else if (
        profile.user_type <
          (props.uiData.configurations.replyButtonEnabledUserType || 4) &&
        !props.isLastOfLast &&
        !props.uiData.configurations.replyButtonRepeatable
      ) {
        messageText = messageText.replace(
          /class="[^"]*brReplyButton[^"]*/g,
          '$& brDisabled',
        )
        messageText = messageText.replace(
          /class="[^"]*brAgent[^"]*brRepeatable[^"]*brDisabled/g,
          '$&Not',
        )
        messageText = messageText.replace(
          /class="[^"]*brRepeatable[^"]*brAgent[^"]*brDisabled/g,
          '$&Not',
        )
      } else if (
        profile.user_type <
        (props.uiData.configurations.replyButtonEnabledUserType || 4)
      ) {
        messageText = messageText.replace(
          /class="[^"]*brReplyButton[^"]*/g,
          '$& brDisabled',
        )
        messageText = messageText.replace(
          /class="[^"]*brAgent[^"]*brDisabled/g,
          '$&Not',
        )
      } else if (
        !props.isLastOfLast &&
        !props.uiData.configurations.replyButtonRepeatable
      ) {
        messageText = messageText.replace(
          /class="[^"]*brReplyButton[^"]*/g,
          '$& brDisabled',
        )
        messageText = messageText.replace(
          /class="[^"]*brRepeatable[^"]*brDisabled/g,
          '$&Not',
        )
      }
      chatMessageInnerElements.push(
        <Text key='text' style={styles.textContainer}>
          {messageText.split('<br />').map((line, i) => (
            <Text key={i}>
              {line.split(/<a[^>]*>([^<]*)<\/a>/).map((part, j) => {
                if (j % 2 === 1) {
                  return (
                    <Text
                      key={j}
                      style={styles.chatUrlLink}
                      onPress={() => Linking.openURL(part)}
                    >
                      {part}
                    </Text>
                  )
                }
                return part
              })}
              {i < messageText.split('<br />').length - 1 && '\n'}
            </Text>
          ))}
        </Text>,
      )
    } else if (
      props.message.ctype === Constants.CTYPE_FILE_REQUEST &&
      props.message.messageFile
    ) {
      messageStyle.push(styles.chatFileMessage)
      if (
        props.message.messageFile.status ===
          Constants.FILE_STATUS_LOCAL_CANCEL ||
        props.message.messageFile.status === Constants.FILE_STATUS_REMOTE_CANCEL
      ) {
        messageStyle.push(styles.chatFileMessageCanceled)
      }
      // messageError
      if (props.message.errorType) {
        chatMessageInnerElements.push(
          <View key='error' style={styles.chatMessageError}>
            <View style={styles.errorIcon}>
              <ErrorIcon />
            </View>
          </View>,
        )
      } else if (props.message.messageFile.messageFileError) {
        chatMessageInnerElements.push(
          <View key='error' style={styles.chatMessageError}>
            <View style={styles.errorIcon}>
              <ErrorIcon />
            </View>
          </View>,
        )
      } else if (
        props.message.messageFile.status === Constants.FILE_STATUS_ERROR
      ) {
        chatMessageInnerElements.push(
          <View key='error' style={styles.chatMessageError}>
            <View style={styles.errorIcon}>
              <ErrorIcon />
            </View>
          </View>,
        )
      }
      // fileName
      if (
        props.uiData.ucUiStore.getBuddyUserForUi(
          props.message.messageFile.receiverInfo,
        ).isMe
      ) {
        // receiver is me
        if (
          props.message.messageFile.status !== Constants.FILE_STATUS_UNPREPARED
        ) {
          // file download button
          chatMessageInnerElements.push(
            <ChatFileDownloadButton
              key='name'
              uiData={props.uiData}
              message={props.message}
            />,
          )
        } else {
          // display only file name
          chatMessageInnerElements.push(
            <View key='name' style={styles.fileContainer}>
              <View style={styles.fileIcon}>
                <DownloadIcon />
              </View>
              <Text style={styles.fileName}>
                {props.message.messageFile.name}
              </Text>
            </View>,
          )
        }
      } else {
        // display file name with receiver
        chatMessageInnerElements.push(
          <View key='name' style={styles.fileContainer}>
            <View style={styles.fileIcon}>
              <UploadIcon />
            </View>
            <Text style={styles.fileName}>
              {props.message.messageFile.name}
            </Text>
            <NameEmbeddedSpan
              ucUiStore={props.uiData.ucUiStore}
              format={' \u2192 {0}'}
              buddy={props.message.messageFile.receiverInfo}
            />
          </View>,
        )
      }
      // openInNewWindowButton
      if (
        props.message.messageFile.inlineImage &&
        props.message.messageFile.inlineImage.url
      ) {
        chatMessageInnerElements.push(
          <ButtonIconic
            key='open'
            style={{ marginLeft: 8, width: 24, height: 24 }}
            title={uawMsgs.LBL_CHAT_FILE_FILE_OPEN_IN_NEW_WINDOW_BUTTON_TOOLTIP}
            iconSource={<ExternallinkIcon />}
            onPress={props.uiData.fire.bind(
              props.uiData,
              'chatFileOpenInNewWindowButton_onClick',
              props.message.messageFile.inlineImage.url,
            )}
          ></ButtonIconic>,
        )
      }
      // fileSize
      if (
        props.message.messageFile.status !== Constants.FILE_STATUS_UNPREPARED
      ) {
        chatMessageInnerElements.push(
          <Text key='size' style={styles.fileSize}>
            {formatFileSize(props.message.messageFile.size)}
            {(props.message.messageFile.progress < 10 ? '\u2007' : '') + // &numsp; (figure space)
              ' (' +
              props.message.messageFile.progress +
              '%)'}
          </Text>,
        )
      }
      // cancelButton
      chatMessageInnerElements.push(
        <ButtonIconic
          key='cancelbutton'
          style={{ marginLeft: 8, width: 18, height: 18 }}
          hidden={
            props.message.messageFile.status !==
              Constants.FILE_STATUS_UNACCEPTED &&
            props.message.messageFile.status !==
              Constants.FILE_STATUS_TRANSFERRING
          }
          iconSource={<CancelIcon />}
          title={uawMsgs.LBL_CHAT_FILE_CANCEL_BUTTON_TOOLTIP}
          onPress={props.uiData.fire.bind(
            props.uiData,
            'chatFileCancelButton_onClick',
            props.message.messageFile,
          )}
        ></ButtonIconic>,
      )
      // inlineImage
      if (props.message.messageFile.inlineImage) {
        if (props.message.messageFile.inlineImage.url) {
          chatMessageInnerElements.push(
            <View key='inlineimage' style={styles.inlineImageArea}>
              <TouchableOpacity
                onPress={() =>
                  props.uiData.fire(
                    props.uiData,
                    'chatInlineImage_onClick',
                    props.message.messageFile.inlineImage.url,
                  )
                }
              >
                <Image
                  source={{ uri: props.message.messageFile.inlineImage.url }}
                  style={styles.inlineImage}
                  onLoad={() =>
                    props.uiData.fire(
                      props.uiData,
                      'chatInlineImage_onLoad',
                      props.message.messageFile,
                    )
                  }
                />
              </TouchableOpacity>
            </View>,
          )
        } else if (props.message.messageFile.inlineImage.loading) {
          chatMessageInnerElements.push(
            <View key='inlineimage' style={styles.inlineImageArea}>
              <ActivityIndicator size='small' color={colors.darkGray} />
            </View>,
          )
        }
      }
      // download large button
      if (
        props.uiData.ucUiStore.getBuddyUserForUi(
          props.message.messageFile.receiverInfo,
        ).isMe &&
        props.message.messageFile.status !== Constants.FILE_STATUS_UNPREPARED &&
        !(
          props.message.messageFile.inlineImage &&
          (props.message.messageFile.inlineImage.url ||
            props.message.messageFile.inlineImage.loading)
        )
      ) {
        chatMessageInnerElements.push(
          <View key='downloadlargebutton'>
            <ChatFileDownloadLargeButton
              uiData={props.uiData}
              message={props.message}
            />
          </View>,
        )
      }
    } else if (props.message.ctype === Constants.CTYPE_CALL_RESULT) {
      let callResult = {}
      try {
        callResult = JSON.parse(props.message.messageText) || {}
      } catch (ex) {}
      const senderUser =
        (!callResult.externalincoming &&
          props.uiData.ucUiStore.getBuddyUserForUi(props.message.senderInfo)) ||
        {}
      const min = Math.floor(int(callResult.talklen) / 60000)
      const sec =
        0 < callResult.talklen && callResult.talklen < 1000
          ? 1
          : Math.floor((int(callResult.talklen) % 60000) / 1000)
      // messageCallResultIcon
      messageStyle.push({ flexDirection: 'row', alignItems: 'center' })
      chatMessageInnerElements.push(
        <View key='callresulticon' style={styles.callResultIcon}>
          <PhoneIcon />
        </View>,
      )
      // messageCallResultMessage
      chatMessageInnerElements.push(
        <View
          key='callresultmessage'
          style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
        >
          <Text style={styles.brResultMessageText}>
            {string(
              props.message.sentTimeValue &&
                formatTime(
                  int(props.message.sentTimeValue) - int(callResult.talklen),
                ),
            )}
          </Text>
          <Text style={styles.brResultMessageText}>
            {senderUser.isMe
              ? callResult.talklen
                ? uawMsgs.LBL_CHAT_CALL_RESULT_DIRECTION_OUTGOING
                : uawMsgs.LBL_CHAT_CALL_RESULT_DIRECTION_OUTGOING_MISSED
              : callResult.talklen
                ? uawMsgs.LBL_CHAT_CALL_RESULT_DIRECTION_INCOMING
                : uawMsgs.LBL_CHAT_CALL_RESULT_DIRECTION_INCOMING_MISSED}
          </Text>
          <Text style={styles.brResultMessageText}>
            {min > 0
              ? formatStr(uawMsgs.LBL_CHAT_CALL_RESULT_LENGTH_MIN, min, sec)
              : sec > 0
                ? formatStr(uawMsgs.LBL_CHAT_CALL_RESULT_LENGTH_SEC, sec)
                : ''}
          </Text>
        </View>,
      )
    } else if (
      props.message.ctype === Constants.CTYPE_OBJECT &&
      props.message.messageText
    ) {
      // messageError
      if (props.message.errorType) {
        chatMessageInnerElements.push(
          <View key='error' style={styles.chatMessageError}>
            <View style={styles.errorIcon}>
              <ErrorIcon />
            </View>
          </View>,
        )
      }
      // messageText
      let messageText = props.message.messageText
      chatMessageInnerElements.push(
        <Text key='text' style={styles.textContainer}>
          {messageText.split('<br />').map((line, i) => (
            <Text key={i}>
              {line.split(/<a[^>]*>([^<]*)<\/a>/).map((part, j) => {
                if (j % 2 === 1) {
                  return (
                    <Text
                      key={j}
                      style={styles.chatUrlLink}
                      onPress={() => Linking.openURL(part)}
                    >
                      {part}
                    </Text>
                  )
                }
                return part
              })}
              {i < messageText.split('<br />').length - 1 && '\n'}
            </Text>
          ))}
        </Text>,
      )
    } else {
      // messageError
      chatMessageInnerElements.push(
        <View key='error' style={styles.chatMessageError}>
          <View style={styles.errorIcon}>
            <ErrorIcon />
          </View>
        </View>,
      )
    }
    return (
      <View style={[...messageStyle, props.isLastOfLast && styles.lastOfLast]}>
        {chatMessageInnerElements}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  brChatMessage: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 20.8, // 1.6 * 13
    letterSpacing: 0.3,
    paddingVertical: 1,
    paddingHorizontal: 0,
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
    tintColor: colors.errorColor,
  },
  chatUrlLink: {
    color: colors.mantis,
  },
  chatFileMessage: {
    color: colors.darkGray,
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
    tintColor: colors.darkGray,
  },
  fileName: {
    // flex: 1,
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
  textContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  lastOfLast: {},
  brResultMessageText: {
    fontSize: 13,
    fontWeight: '400',
    letterSpacing: 0.3,
    paddingVertical: 1,
    paddingHorizontal: 0,
    color: colors.darkGray,
  },
})
