import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ButtonIconic from './ButtonIconic.js'
import MenuBalloonDialog from './MenuBalloonDialog.js'
import MenuItem from './MenuItem.js'
import TextBox from './TextBox.js'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  PanResponder,
  Animated,
} from 'react-native'

/**
 * EditorArea
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.phone
 * props.uiData.panelSessionTable
 * props.uiData.configurations
 * props.uiData.showingDialogVersion
 * props.uiData.showingDialog_update
 * props.uiData.currentSelectedTab
 * props.uiData.selectedButNotFocusedTab
 * props.uiData.editorTextarea_onKeyDown
 * props.uiData.editorSendButton_onClick
 * props.uiData.panelHeaderLeaveButton_onClick
 * props.uiData.panelHeaderInviteButton_onClick
 * props.uiData.panelHeaderFileButton_onClick
 * props.uiData.panelHeaderVoiceButton_onClick
 * props.uiData.panelHeaderVideoButton_onClick
 * props.uiData.panelHeaderScreenButton_onClick
 * props.uiData.panelHeaderContinuationMenuItem_onClick
 * props.panelType
 * props.panelCode
 * props.disabled
 * props.hidden
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.currentEditorType = ''
    this.hidden = false
    this.state = {
      showingDialogVersion: null,
      showingReplyDialogVersion: null,
      replyDialogStyle: {},
      selectedEditorType: '',
      showingChangeEditorTypeDialogVersion: null,
      changeEditorTypeDialogStyle: {},
      splitterHeight: 10000,
      editorHeight: 0,
    }
    this.editorTextareaRef = React.createRef()
    this.setupPanResponder()
  }

  setupPanResponder() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        this.handleSplitterHeightDrag(gestureState.dy)
      },
      onPanResponderRelease: () => {
        this.handleSplitterHeightStop()
      },
    })
  }

  componentDidMount() {
    if (this.editorTextareaRef.current && !this.props.disabled) {
      this.editorTextareaRef.current.focus()
      if (
        this.props.uiData.selectedButNotFocusedTab ===
        this.props.panelType + '_' + this.props.panelCode
      ) {
        this.props.uiData.selectedButNotFocusedTab = ''
      }
    }
  }

  componentDidUpdate() {
    const { props } = this
    const isEmail = this.currentEditorType === 'Email'

    if (
      props.uiData.selectedButNotFocusedTab ===
      props.panelType + '_' + props.panelCode
    ) {
      if (this.editorTextareaRef.current && !props.disabled) {
        this.editorTextareaRef.current.focus()
        props.uiData.selectedButNotFocusedTab = ''
      }
    }

    // Handle layout updates
    if (isEmail && this.state.editorHeight) {
      if (this.state.splitterHeight !== 0) {
        this.setState({ splitterHeight: 0 })
      }
    }
  }

  handleSplitterHeightDrag = deltaY => {
    const isEmail = this.currentEditorType === 'Email'
    let splitterHeight =
      this.state.splitterHeight === 10000 && isEmail
        ? int(
            this.props.uiData.ucUiStore.getLocalStoragePreference({
              keyList: ['emailSplitterHeight'],
            })[0],
          )
        : this.state.splitterHeight

    splitterHeight = Math.min(0, splitterHeight + deltaY)
    splitterHeight = Math.max(70 - this.state.editorHeight, splitterHeight)
    splitterHeight = Math.min(0, splitterHeight)

    this.setState({ splitterHeight })
  }

  handleSplitterHeightStop = () => {
    this.props.uiData.ucUiAction.setLocalStoragePreference({
      keyValueList: [
        {
          key: 'emailSplitterHeight',
          value: string(this.state.splitterHeight),
        },
      ],
    })
  }

  handleSendButtonClick = () => {
    const { props } = this
    const isEmail = this.currentEditorType === 'Email'

    props.uiData.fire(
      'editorSendButton_onClick',
      props.panelType,
      props.panelCode,
      this.editorTextareaRef.current,
      this.subjectTextBoxRef.current,
      isEmail,
    )
  }

  handleOptionsLinkClick = () => {
    if (
      this.props.uiData.showingDialogVersion !== this.state.showingDialogVersion
    ) {
      this.setState({
        showingDialogVersion: ++this.props.uiData.showingDialogVersion,
      })
      this.props.uiData.fire('showingDialog_update')
    }
  }

  handleReplyWebchatMenuClick = () => {
    const { props } = this
    if (
      props.uiData.showingDialogVersion !== this.state.showingDialogVersion ||
      props.uiData.showingDialogVersion !== this.state.showingReplyDialogVersion
    ) {
      props.uiData.showingDialogVersion++

      this.setState({
        showingDialogVersion: props.uiData.showingDialogVersion,
        showingReplyDialogVersion: props.uiData.showingDialogVersion,
      })

      props.uiData.fire('showingDialog_update')
    }
  }

  handleChangeEditorTypeMenuClick = () => {
    const { props } = this
    if (
      props.uiData.showingDialogVersion !== this.state.showingDialogVersion ||
      props.uiData.showingDialogVersion !==
        this.state.showingChangeEditorTypeDialogVersion
    ) {
      props.uiData.showingDialogVersion++

      this.setState({
        showingDialogVersion: props.uiData.showingDialogVersion,
        showingChangeEditorTypeDialogVersion: props.uiData.showingDialogVersion,
      })

      props.uiData.fire('showingDialog_update')
    }
  }

  render() {
    const { props } = this
    const configProperties = props.uiData.ucUiStore.getConfigProperties()
    const myUcCimUserType = int(props.uiData.ucUiStore.getUcCimUserType())
    const chatHeaderInfo =
      props.uiData.ucUiStore.getChatHeaderInfo({
        chatType: props.panelType,
        chatCode: props.panelCode,
      }) || {}

    const editorTypes = string(
      chatHeaderInfo.editorTypes ||
        props.uiData.ucUiStore.getOptionalSetting({ key: ['editor_types'] }) ||
        '_',
    ).split(',')

    const initialEditorType = string(
      chatHeaderInfo.initialEditorType ||
        props.uiData.ucUiStore.getOptionalSetting({
          key: ['initial_editor_type'],
        }) ||
        '',
    )

    this.currentEditorType =
      this.state.selectedEditorType ||
      this.currentEditorType ||
      editorTypes.find(t => t === initialEditorType) ||
      editorTypes[0]

    const isEmail = this.currentEditorType === 'Email'
    const panelSession =
      props.uiData.panelSessionTable?.[props.panelType + '_' + props.panelCode]
    const session =
      panelSession?.sessionId &&
      props.uiData.phone?.getSession(panelSession.sessionId)

    // Build menu options
    const menuOptions = this.buildMenuOptions(
      chatHeaderInfo,
      isEmail,
      panelSession,
      myUcCimUserType,
    )

    return (
      <View
        style={[
          styles.brEditorArea,
          styles[`brEditorType${this.currentEditorType}`],
          props.uiData.currentSelectedTab ===
            props.panelType + '_' + props.panelCode && styles.brSelected,
          (props.uiData.configurations?.sendButton || isEmail) &&
            styles.brWithSendButton,
          props.uiData.configurations?.withMenuOptions &&
            styles.brWithMenuOptions,
          isEmail &&
            chatHeaderInfo.lastConfType === 'emptylast' &&
            styles.brMaximized,
          this.hidden && styles.brHidden,
          props.disabled && styles.brDisabled,
          isEmail &&
            !chatHeaderInfo.originalWebchatId &&
            styles.brWithSubjectTextBox,
        ]}
      >
        <TextBox
          ref={this.subjectTextBoxRef}
          style={styles.brSubjectTextBox}
          placeholder={uawMsgs.LBL_EDITOR_SUBJECT_PLACEHOLDER}
          disabled={props.disabled}
        />

        <View style={styles.brEditorTextareaContainer}>
          <TextInput
            ref={this.editorTextareaRef}
            style={styles.brEditorTextarea}
            multiline
            placeholder={
              props.disabled || isEmail
                ? ''
                : uawMsgs.LBL_EDITOR_TEXTAREA_PLACEHOLDER
            }
            onKeyPress={event =>
              props.uiData.fire(
                'editorTextarea_onKeyDown',
                props.panelType,
                props.panelCode,
                props.disabled,
                isEmail,
                event,
              )
            }
            editable={!props.disabled}
          />
        </View>

        <Animated.View
          {...this.panResponder.panHandlers}
          style={[
            styles.brSplitterHeight,
            isEmail && chatHeaderInfo.lastConfType === 'webchat'
              ? {}
              : styles.brHidden,
            {
              transform: [
                { translateY: Math.min(0, this.state.splitterHeight) },
              ],
            },
          ]}
        />

        <ButtonIconic
          style={[
            styles.brEditorSendButton,
            isEmail ? styles.brEmailSendButton : styles.brChatSendButton,
          ]}
          iconSource={isEmail ? icons.send : icons.chat}
          accessibilityLabel={uawMsgs.LBL_EDITOR_SEND_BUTTON_TOOLTIP}
          disabled={props.disabled}
          onPress={this.handleSendButtonClick}
        />

        <TouchableOpacity
          style={styles.brEditorOptionsButton}
          accessibilityLabel={uawMsgs.LBL_EDITOR_OPTIONS_LINK}
          onPress={this.handleOptionsLinkClick}
        >
          <Image
            source={
              this.state.showingDialogVersion ===
              props.uiData.showingDialogVersion
                ? icons.triangleUp
                : icons.triangleDown
            }
            style={styles.brEditorOptionsIcon}
          />
        </TouchableOpacity>

        <MenuBalloonDialog
          ref={this.editorOptionsBalloonRef}
          showing={
            props.uiData.showingDialogVersion ===
            this.state.showingDialogVersion
          }
          style={styles.brEditorOptionsBalloon}
        >
          {menuOptions.map((option, i) => (
            <MenuItem
              key={i}
              style={[styles.brEditorOptionsItem, styles[option.iconClass]]}
              disabled={!option.enabled}
              onPress={
                option.event ||
                (() =>
                  props.uiData.fire(
                    option.eventName,
                    props.panelType,
                    props.panelCode,
                  ))
              }
            >
              <Text>{option.label}</Text>
            </MenuItem>
          ))}
        </MenuBalloonDialog>

        {/* Reply Dialog */}
        <MenuBalloonDialog
          showing={
            props.uiData.showingDialogVersion ===
              this.state.showingDialogVersion &&
            props.uiData.showingDialogVersion ===
              this.state.showingReplyDialogVersion
          }
          style={[
            styles.brEditorOptionsReplyWebchatBalloon,
            this.state.replyDialogStyle,
          ]}
        >
          {this.buildReplyOptions().map((option, i) => (
            <MenuItem
              key={i}
              style={[
                styles.brEditorOptionsReplyWebchatMenuItem,
                styles[option.className],
              ]}
              onPress={option.event}
            >
              <Text>{option.label}</Text>
            </MenuItem>
          ))}
        </MenuBalloonDialog>

        {/* Editor Type Dialog */}
        <MenuBalloonDialog
          showing={
            props.uiData.showingDialogVersion ===
              this.state.showingDialogVersion &&
            props.uiData.showingDialogVersion ===
              this.state.showingChangeEditorTypeDialogVersion
          }
          style={[
            styles.brEditorOptionsChangeEditorTypeBalloon,
            this.state.changeEditorTypeDialogStyle,
          ]}
        >
          {editorTypes.map((type, i) => (
            <MenuItem
              key={i}
              style={[
                styles.brEditorOptionsChangeEditorTypeMenuItem,
                styles[`brEditorType${type}`],
              ]}
              onPress={() => this.setState({ selectedEditorType: type })}
            >
              <Text>{uawMsgs[`LBL_EDITOR_TYPE_${type}`] || type}</Text>
            </MenuItem>
          ))}
        </MenuBalloonDialog>
      </View>
    )
  }

  buildMenuOptions(chatHeaderInfo, isEmail, panelSession, myUcCimUserType) {
    const { props } = this
    let menuOptions = []

    if (props.panelType === 'CONFERENCE') {
      const conf_id = string(chatHeaderInfo.conf_id)
      const conference = props.uiData.ucUiStore
        .getChatClient()
        .getConference(conf_id)
      const joinedCount = conference.user.filter(
        u => u.conf_status === Constants.CONF_STATUS_JOINED,
      ).length

      menuOptions = this.buildConferenceMenuOptions(
        conference,
        joinedCount,
        chatHeaderInfo,
        panelSession,
      )
    } else if (props.panelType === 'CHAT') {
      menuOptions = this.buildChatMenuOptions(panelSession)
    } else if (props.panelType === 'EXTERNALCALL') {
      this.hidden = true
    }

    // Filter based on configurations
    if (props.uiData.configurations.headerButtons) {
      menuOptions = menuOptions.filter(
        option =>
          !option.headerButtonName ||
          props.uiData.configurations.headerButtons.includes(
            option.headerButtonName,
          ),
      )
    }

    // Filter file option based on permissions
    if (
      (int(props.uiData.ucUiStore.getOptionalSetting({ key: 'fsp' })) &
        myUcCimUserType) ===
      myUcCimUserType
    ) {
      menuOptions = menuOptions.filter(
        option => option.headerButtonName !== 'file',
      )
    }

    return menuOptions
  }

  buildConferenceMenuOptions(
    conference,
    joinedCount,
    chatHeaderInfo,
    panelSession,
  ) {
    const { props } = this
    const replyOptions = this.buildReplyOptions(chatHeaderInfo)

    let options = [
      {
        headerButtonName: 'leave',
        label: uawMsgs.LBL_EDITOR_LEAVE_LINK,
        iconSource: icons.logOut,
        eventName: 'panelHeaderLeaveButton_onClick',
        enabled: conference.conf_status === Constants.CONF_STATUS_JOINED,
      },
      {
        headerButtonName: 'invite',
        label: uawMsgs.LBL_EDITOR_INVITE_LINK,
        iconSource: icons.envelope,
        eventName: 'panelHeaderInviteButton_onClick',
        enabled: this.checkInviteEnabled(conference, chatHeaderInfo),
      },
      // ... other options
    ]

    if (chatHeaderInfo.confType === 'webchat' && replyOptions.length) {
      options.splice(1, 0, {
        headerButtonName: 'reply',
        label: uawMsgs.LBL_EDITOR_REPLY_LINK,
        iconSource: icons.reply,
        event:
          replyOptions.length === 1
            ? replyOptions[0].event
            : this.handleReplyWebchatMenuClick,
        enabled: true,
      })
    }

    return options
  }

  buildChatMenuOptions(panelSession) {
    return [
      {
        headerButtonName: 'file',
        label: uawMsgs.LBL_EDITOR_FILE_LINK,
        iconSource: icons.upload,
        eventName: 'panelHeaderFileButton_onClick',
        enabled: true,
      },
      // ... other chat options
    ]
  }
}

const styles = StyleSheet.create({
  brEditorArea: {
    position: 'absolute',
    padding: 0,
    paddingBottom: 1,
    width: '100%',
    height: 64,
    left: 0,
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5', // @platinum
    backgroundColor: '#FFFFFF',
  },

  brSelected: {
    borderColor: '#82C341',
    borderWidth: 1,
  },

  brWithSendButton: {
    paddingRight: 40,
  },

  brWithMenuOptions: {
    paddingRight: 80,
  },

  brMaximized: {
    flex: 1,
  },

  brHidden: {
    display: 'none',
  },

  brDisabled: {
    opacity: 0.5,
  },

  brWithSubjectTextBox: {
    paddingTop: 40,
  },

  brSubjectTextBox: {
    height: 32,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 4,
    marginBottom: 8,
  },

  brEditorTextareaContainer: {
    flex: 1,
  },

  brEditorTextarea: {
    width: '100%',
    height: '100%',
    fontFamily: 'inherit',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 1.6 * 13,
    letterSpacing: 0.3,
    borderWidth: 0,
    paddingTop: 16,
    paddingBottom: 8,
    paddingLeft: 80,
    paddingRight: 8,
    backgroundColor: 'transparent',
  },

  brEditorTextareaDisabled: {
    color: '#666666', // @dark_gray
  },

  brEditorTextareaFocused: {
    borderWidth: 2,
    borderColor: '#40E0D0', // @medium_turquoise
  },

  brEditorTextareaDisabledFocused: {
    borderWidth: 0,
  },

  brEditorTextareaPlaceholder: {
    color: '#666666', // @dark_gray
  },

  brEditorSendButton: {
    display: 'none',
    position: 'absolute',
    right: 16,
    top: 16,
    borderWidth: 0,
    opacity: 0.2,
  },

  brEditorSendButtonActive: {
    opacity: 1,
  },

  brEditorSendButtonDisabled: {
    opacity: 1,
    backgroundColor: 'transparent',
  },

  brEditorSendButtonDisabledCircle: {
    position: 'absolute',
    left: 4,
    top: 4,
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#1A2421', // @dark_jungle_green
    borderRadius: 10,
  },

  brEditorSendButtonDisabledLine: {
    position: 'absolute',
    left: 6,
    top: 14,
    width: 20,
    height: 2,
    borderTopWidth: 1,
    borderTopColor: '#FFFFFF', // @white
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF', // @white
    backgroundColor: '#1A2421', // @dark_jungle_green
    transform: [{ rotate: '45deg' }],
  },

  brEditorOptionsButton: {
    position: 'absolute',
    width: 40,
    height: 40,
    left: 20,
    top: 8,
    borderWidth: 0,
    borderRadius: 4,
    backgroundColor: '#82C341', // @mantis
    // Note: Linear gradient not directly available in RN
    // Using a solid color instead
    shadowColor: '#82C341',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 5,
  },

  brEditorOptionsButtonHover: {
    backgroundColor: '#4CAF50', // @green
    shadowColor: '#4CAF50',
  },

  brEditorOptionsButtonActive: {
    backgroundColor: '#378B29', // @sap_green
    shadowColor: '#378B29',
  },

  brEditorOptionsButtonDisabled: {
    backgroundColor: '#A6A6A6', // @disabled_gray
    shadowColor: '#A6A6A6',
  },

  brEditorOptionsIcon: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    // Note: brightness/invert filters not available in RN
    // Use tintColor instead
    tintColor: '#FFFFFF',
  },

  brEditorOptionsBalloon: {
    position: 'absolute',
    left: 20,
    bottom: 56,
  },

  brEditorOptionsItem: {
    padding: 14,
    paddingHorizontal: 16,
  },

  brEditorReportMailLinkIcon: {
    width: 20,
    height: 16,
    marginLeft: -4,
  },

  brEditorReportMailLinkIconDisabled: {
    opacity: 5.73, // Approximation of brightness filter
  },

  brEditorOptionsSeparator: {
    marginVertical: 2,
    marginHorizontal: 10,
    height: 1,
    backgroundColor: '#E5E5E5', // @platinum
  },

  brSplitterHeight: {
    height: 4,
    backgroundColor: '#E5E5E5',
    width: '100%',
  },

  brEditorOptionsReplyWebchatBalloon: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  brEditorOptionsReplyWebchatMenuItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },

  brEditorOptionsChangeEditorTypeBalloon: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  brEditorOptionsChangeEditorTypeMenuItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },

  // Icon classes converted to styles
  br_bi_icon_log_out_svg: {
    // Add icon specific styles
  },
  br_bi_icon_envelope_svg: {
    // Add icon specific styles
  },
  // ... other icon styles
})

export const icons = {
  send: require('../assets/icons/send.png'),
  chat: require('../assets/icons/chat.png'),
  triangleUp: require('../assets/icons/triangle-up.png'),
  triangleDown: require('../assets/icons/triangle-down.png'),
  logOut: require('../assets/icons/log-out.png'),
  envelope: require('../assets/icons/envelope.png'),
  upload: require('../assets/icons/upload.png'),
  reply: require('../assets/icons/reply.png'),
  // ... add other icons
}
