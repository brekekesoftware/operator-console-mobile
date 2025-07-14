import React from 'react'
import uawMsgs from '../utilities/uawmsgs'
import Constants from '../utilities/constants'
import { int, string } from '../utilities/strings'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  findNodeHandle,
  UIManager,
  NativeModules,
  PanResponder,
  Animated,
} from 'react-native'
import ButtonIconic from './ButtonIconic'
import MenuBalloonDialog from './MenuBalloonDialog'
import MenuItem from './MenuItem'
import TextBox from './TextBox'
import LogOutIcon from '../icons/LogOutIcon'
import EnvelopeIcon from '../icons/EnvelopeIcon'
import UploadIcon from '../icons/UploadIcon'
import ReplyIcon from '../icons/ReplyIcon'
import EditIcon from '../icons/EditIcon'
import HistoryIcon from '../icons/HistoryIcon'
import ChannelMosaic1Icon from '../icons/ChannelMosaic1Icon'
import PhoneIcon from '../icons/PhoneIcon'
import VideoCallIcon from '../icons/VideoCallIcon'
import TriangleUpIcon from '../icons/TriangleUpIcon'
import TriangleDownIcon from '../icons/TriangleDownIcon'
import SendIcon from '../icons/SendIcon'
import ChatIcon from '../icons/ChatIcon'
import CustomTextInput from './CustomTextInput'
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
    }
    this.editorTextareaRef = React.createRef()
    this.subjectTextBoxRef = React.createRef()
    this.editorOptionsBalloonRef = React.createRef()
    this.editorAreaRef = React.createRef()

    // Create animated value for splitter position
    this.splitterPosition = new Animated.Value(0)

    // Initialize pan responder for drag functionality
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        // Store the current position when touch starts
        this.splitterPosition.setOffset(this.splitterPosition._value)
        this.splitterPosition.setValue(0)
      },
      onPanResponderMove: (evt, gestureState) => {
        // Update position based on drag
        this.splitterPosition.setValue(gestureState.dy)
      },
      onPanResponderRelease: () => {
        // Flatten the offset into the value
        this.splitterPosition.flattenOffset()

        // Get the current position
        const currentPosition = this.splitterPosition._value

        // Calculate new splitter height
        let newSplitterHeight = this.state.splitterHeight + currentPosition

        // Apply constraints
        const props = this.props
        if (this.editorTextareaRef.current) {
          this.editorTextareaRef.current.measure(
            (x, y, width, height, pageX, pageY) => {
              const parentHeight =
                props.uiData.ucUiStore.getChatClient().getProfile().height || 0
              newSplitterHeight = Math.max(70 - parentHeight, newSplitterHeight)
              newSplitterHeight = Math.min(0, newSplitterHeight)

              // Update state with new height
              this.setState({ splitterHeight: newSplitterHeight })

              // Save to preferences
              props.uiData.ucUiAction.setLocalStoragePreference({
                keyValueList: [
                  {
                    key: 'emailSplitterHeight',
                    value: string(newSplitterHeight),
                  },
                ],
              })
            },
          )
        }
      },
    })
  }

  componentDidMount() {
    const props = this.props
    if (this.editorTextareaRef.current && !props.disabled) {
      // this.editorTextareaRef.current.focus()
      if (
        props.uiData.selectedButNotFocusedTab ===
        props.panelType + '_' + props.panelCode
      ) {
        props.uiData.selectedButNotFocusedTab = ''
      }
    }

    // Set initial splitter position
    const isEmail = this.currentEditorType === 'Email'
    let splitterHeight =
      this.state.splitterHeight === 10000 && isEmail
        ? int(
            props.uiData.ucUiStore.getLocalStoragePreference({
              keyList: ['emailSplitterHeight'],
            })[0],
          )
        : this.state.splitterHeight
    splitterHeight = Math.min(0, splitterHeight)
    this.splitterPosition.setValue(splitterHeight)
  }

  componentDidUpdate(prevProps, prevState) {
    const props = this.props
    const isEmail = this.currentEditorType === 'Email'
    if (
      props.uiData.selectedButNotFocusedTab ===
      props.panelType + '_' + props.panelCode
    ) {
      if (this.editorTextareaRef.current && !props.disabled) {
        // this.editorTextareaRef.current.focus()
        props.uiData.selectedButNotFocusedTab = ''
      }
    }

    // if (this.editorTextareaRef.current) {
    //     this.editorTextareaRef.current.measure((x, y, width, height, pageX, pageY) => {
    //         const editorHeight = height;
    //         const parentHeight = props.uiData.ucUiStore.getChatClient().getProfile().height || 0;
    //         const chatArea = props.uiData.ucUiStore.getChatClient().getChatArea();
    //         const chatAreaScrollToBottomButton = props.uiData.ucUiStore.getChatClient().getChatAreaScrollToBottomButton();

    //         if (this.hidden) {
    //             if (chatArea) {
    //                 chatArea.style = { bottom: 0 };
    //             }
    //             if (chatAreaScrollToBottomButton) {
    //                 chatAreaScrollToBottomButton.style = { bottom: 26 };
    //             }
    //         } else if (isEmail && editorHeight) {
    //             if (parentHeight < editorHeight && this.state.splitterHeight) {
    //                 this.setState({ splitterHeight: 0 });
    //                 return;
    //             }
    //             if (chatArea) {
    //                 chatArea.style = { bottom: editorHeight };
    //             }
    //             if (chatAreaScrollToBottomButton) {
    //                 chatAreaScrollToBottomButton.style = { bottom: editorHeight + 26 };
    //             }
    //         }
    //     });
    // }

    // Update splitter position when state changes
    if (prevState.splitterHeight !== this.state.splitterHeight) {
      this.splitterPosition.setValue(this.state.splitterHeight)
    }
  }

  handleSplitterHeightDrag(ev, ui) {
    // This method is kept for compatibility but the actual drag is handled by PanResponder
  }

  handleSplitterHeightStop() {
    // This method is kept for compatibility but the actual stop is handled by PanResponder
  }

  handleSendButtonClick(ev) {
    const props = this.props
    const isEmail = this.currentEditorType === 'Email'
    props.uiData.fire(
      'editorSendButton_onClick',
      props.panelType,
      props.panelCode,
      this.editorTextareaRef.current,
      this.subjectTextBoxRef.current,
      isEmail,
      ev,
    )
  }

  handleOptionsLinkClick(ev) {
    const props = this.props
    console.log(
      '#Duy Phan console onpress1',
      props.uiData.showingDialogVersion !== this.state.showingDialogVersion,
    )
    if (props.uiData.showingDialogVersion !== this.state.showingDialogVersion) {
      this.setState({
        showingDialogVersion: ++props.uiData.showingDialogVersion,
      })
      // ev.stopPropagation()
      props.uiData.fire('showingDialog_update')
    } else {
      props.uiData.window_onclick()
    }
  }

  handleReplyWebchatMenuClick(ev) {
    const props = this.props
    if (
      props.uiData.showingDialogVersion !== this.state.showingDialogVersion ||
      props.uiData.showingDialogVersion !== this.state.showingReplyDialogVersion
    ) {
      props.uiData.showingDialogVersion++
      const replyDialogStyle = {}

      if (this.editorTextareaRef.current) {
        this.editorTextareaRef.current.measure(
          (x, y, width, height, pageX, pageY) => {
            const editorAreaRect = { left: pageX, top: pageY, width, height }
            const editorOptionsBalloon = this.editorOptionsBalloonRef.current
            const replyWebchatMenuRect =
              ev && ev.target && ev.target.measure
                ? ev.target.measure((x, y, width, height, pageX, pageY) => ({
                    left: pageX,
                    top: pageY,
                    width,
                    height,
                  }))
                : null

            if (editorAreaRect && replyWebchatMenuRect) {
              replyDialogStyle.left =
                (editorOptionsBalloon || replyWebchatMenuRect).right -
                editorAreaRect.left
              replyDialogStyle.top =
                replyWebchatMenuRect.top - editorAreaRect.top
            }

            this.setState({
              showingDialogVersion: props.uiData.showingDialogVersion,
              showingReplyDialogVersion: props.uiData.showingDialogVersion,
              replyDialogStyle: replyDialogStyle,
            })
            ev.stopPropagation()
            props.uiData.fire('showingDialog_update')
          },
        )
      }
    }
  }

  handleChangeEditorTypeMenuClick(ev) {
    const props = this.props
    if (
      props.uiData.showingDialogVersion !== this.state.showingDialogVersion ||
      props.uiData.showingDialogVersion !==
        this.state.showingChangeEditorTypeDialogVersion
    ) {
      props.uiData.showingDialogVersion++
      const changeEditorTypeDialogStyle = {}

      if (this.editorTextareaRef.current) {
        this.editorTextareaRef.current.measure(
          (x, y, width, height, pageX, pageY) => {
            const editorAreaRect = { left: pageX, top: pageY, width, height }
            const editorOptionsBalloon = this.editorOptionsBalloonRef.current
            const changeEditorTypeMenuRect =
              ev && ev.target && ev.target.measure
                ? ev.target.measure((x, y, width, height, pageX, pageY) => ({
                    left: pageX,
                    top: pageY,
                    width,
                    height,
                  }))
                : null

            if (editorAreaRect && changeEditorTypeMenuRect) {
              changeEditorTypeDialogStyle.position = 'absolute'
              changeEditorTypeDialogStyle.left =
                (editorOptionsBalloon || changeEditorTypeMenuRect).right -
                editorAreaRect.left
              changeEditorTypeDialogStyle.bottom =
                editorAreaRect.bottom - changeEditorTypeMenuRect.bottom
            }

            this.setState({
              showingDialogVersion: props.uiData.showingDialogVersion,
              showingChangeEditorTypeDialogVersion:
                props.uiData.showingDialogVersion,
              changeEditorTypeDialogStyle: changeEditorTypeDialogStyle,
            })
            ev.stopPropagation()
            props.uiData.fire('showingDialog_update')
          },
        )
      }
    }
  }

  render() {
    const props = this.props
    const profile = props.uiData.ucUiStore.getChatClient().getProfile()
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
      props.uiData.panelSessionTable &&
      props.uiData.panelSessionTable[props.panelType + '_' + props.panelCode]
    const session =
      panelSession &&
      panelSession.sessionId &&
      props.uiData.phone &&
      props.uiData.phone.getSession(panelSession.sessionId)
    let className = 'brEditorArea brEditorType' + this.currentEditorType
    let splitterHeight =
      this.state.splitterHeight === 10000 && isEmail
        ? int(
            props.uiData.ucUiStore.getLocalStoragePreference({
              keyList: ['emailSplitterHeight'],
            })[0],
          )
        : this.state.splitterHeight
    let disabled = props.disabled
    this.hidden = props.hidden
    let menuOptions = []
    const replyOptions = []

    if (
      props.uiData.currentSelectedTab ===
      props.panelType + '_' + props.panelCode
    ) {
      className += ' brSelected'
    }
    if (
      (props.uiData.configurations && props.uiData.configurations.sendButton) ||
      isEmail
    ) {
      className += ' brWithSendButton'
    }
    if (
      props.uiData.configurations &&
      props.uiData.configurations.withMenuOptions
    ) {
      className += ' brWithMenuOptions'
    }
    if (isEmail && chatHeaderInfo.lastConfType === 'emptylast') {
      className += ' brMaximized'
    }

    if (props.panelType === 'CONFERENCE') {
      const conf_id = string(chatHeaderInfo.conf_id)
      const conference = props.uiData.ucUiStore
        .getChatClient()
        .getConference(conf_id)
      const joinedCount = conference.user.filter(
        u => u.conf_status === Constants.CONF_STATUS_JOINED,
      ).length
      const replyTypes = string(chatHeaderInfo.replyTypes).split(',')

      if ('TRUE' === string(chatHeaderInfo.webchatContinuable).toUpperCase()) {
        replyOptions.push({
          className: 'brManualContinuation',
          event: props.uiData.fire.bind(
            props.uiData,
            'panelHeaderContinuationMenuItem_onClick',
            props.panelType,
            props.panelCode,
            '',
          ),
          label: uawMsgs.LBL_EDITOR_REPLY_MANUAL_CONTINUATION_MENU,
        })
      }

      if (
        !props.uiData.ucUiStore.getWebchatQueue({ conf_id: conf_id })
          .isTalking &&
        (
          (configProperties.optional_config &&
            configProperties.optional_config.awsl) ||
          []
        ).some(aws => aws.id === chatHeaderInfo.webchatServiceId && aws.senders)
      ) {
        replyTypes.forEach((replyType, i) => {
          if (replyType) {
            replyOptions.push({
              className: 'brContinuation',
              event: props.uiData.fire.bind(
                props.uiData,
                'panelHeaderContinuationMenuItem_onClick',
                props.panelType,
                props.panelCode,
                replyType,
              ),
              label: replyType,
            })
          }
        })
      }

      const mustDisable = !(
        (conference.conf_status === Constants.CONF_STATUS_JOINED &&
          joinedCount >= 2) ||
        chatHeaderInfo.nextDistributionTarget === profile.user_id
      )
      if (mustDisable) {
        disabled = true
      }
      if (isEmail && (!chatHeaderInfo.lastConfType || mustDisable)) {
        this.hidden = true
      }

      menuOptions = [
        {
          headerButtonName: 'leave',
          label: uawMsgs.LBL_EDITOR_LEAVE_LINK,
          iconClass: <LogOutIcon />,
          eventName: 'panelHeaderLeaveButton_onClick',
          enabled: conference.conf_status === Constants.CONF_STATUS_JOINED,
        },
        {
          headerButtonName: 'invite',
          label: uawMsgs.LBL_EDITOR_INVITE_LINK,
          iconClass: <EnvelopeIcon />,
          eventName: 'panelHeaderInviteButton_onClick',
          enabled:
            conference.conf_status === Constants.CONF_STATUS_JOINED &&
            (chatHeaderInfo.confType !== 'webchat' ||
              (-int(
                (conference.webchatinfo &&
                  string(conference.webchatinfo.invite_button_type)) ||
                  '-98',
              ) &
                myUcCimUserType) ===
                myUcCimUserType),
        },
        {
          headerButtonName: 'file',
          label: uawMsgs.LBL_EDITOR_FILE_LINK,
          iconClass: <UploadIcon />,
          eventName: 'panelHeaderFileButton_onClick',
          enabled:
            conference.conf_status === Constants.CONF_STATUS_JOINED &&
            joinedCount >= 2,
        },
        {
          headerButtonName: 'voice',
          label: uawMsgs.LBL_EDITOR_VOICE_LINK,
          iconClass: <PhoneIcon />,
          eventName: 'panelHeaderVoiceButton_onClick',
          enabled:
            conference.conf_status === Constants.CONF_STATUS_JOINED &&
            props.uiData.phone &&
            props.uiData.phone.getPhoneStatus() === 'started' &&
            !panelSession,
        },
        {
          headerButtonName: 'video',
          label: uawMsgs.LBL_EDITOR_VIDEO_LINK,
          iconClass: <VideoCallIcon />,
          eventName: 'panelHeaderVideoButton_onClick',
          enabled:
            conference.conf_status === Constants.CONF_STATUS_JOINED &&
            props.uiData.phone &&
            props.uiData.phone.getPhoneStatus() === 'started' &&
            !panelSession,
        },
        {
          headerButtonName: 'screen',
          label: uawMsgs.LBL_EDITOR_SCREEN_LINK,
          iconClass: <ChannelMosaic1Icon />,
          eventName: 'panelHeaderScreenButton_onClick',
          enabled:
            conference.conf_status === Constants.CONF_STATUS_JOINED &&
            props.uiData.phone &&
            props.uiData.phone.getPhoneStatus() === 'started' &&
            !panelSession,
        },
      ]

      if (chatHeaderInfo.confType === 'webchat') {
        menuOptions.splice(1, 0, {
          headerButtonName: 'reply',
          label: uawMsgs.LBL_EDITOR_REPLY_LINK,
          iconClass: <ReplyIcon />,
          event:
            replyOptions.length === 1
              ? replyOptions[0].event
              : this.handleReplyWebchatMenuClick.bind(this),
          enabled: replyOptions.length,
        })
      }

      if (
        isEmail &&
        !chatHeaderInfo.originalWebchatId &&
        props.uiData.ucUiStore
          .getChatClient()
          .getConferenceTag({ conf_id: conf_id, tag_key: '_outgoing_email_id' })
      ) {
        className += ' brWithSubjectTextBox'
      }
    } else if (props.panelType === 'CHAT') {
      menuOptions = [
        {
          headerButtonName: 'file',
          label: uawMsgs.LBL_EDITOR_FILE_LINK,
          iconClass: <UploadIcon />,
          eventName: 'panelHeaderFileButton_onClick',
          enabled: true,
        },
        {
          headerButtonName: 'voice',
          label: uawMsgs.LBL_EDITOR_VOICE_LINK,
          iconClass: <PhoneIcon />,
          eventName: 'panelHeaderVoiceButton_onClick',
          enabled:
            props.uiData.phone &&
            props.uiData.phone.getPhoneStatus() === 'started' &&
            !panelSession,
        },
        {
          headerButtonName: 'video',
          label: uawMsgs.LBL_EDITOR_VIDEO_LINK,
          iconClass: <VideoCallIcon />,
          eventName: 'panelHeaderVideoButton_onClick',
          enabled:
            props.uiData.phone &&
            props.uiData.phone.getPhoneStatus() === 'started' &&
            !panelSession,
        },
        {
          headerButtonName: 'screen',
          label: uawMsgs.LBL_EDITOR_SCREEN_LINK,
          iconClass: <ChannelMosaic1Icon />,
          eventName: 'panelHeaderScreenButton_onClick',
          enabled:
            props.uiData.phone &&
            props.uiData.phone.getPhoneStatus() === 'started' &&
            !panelSession,
        },
        {
          headerButtonName: 'history',
          label: uawMsgs.LBL_EDITOR_HISTORY_LINK,
          iconClass: <HistoryIcon />,
          eventName: 'panelHeaderHistoryButton_onClick',
          enabled: true,
        },
      ]
    } else if (props.panelType === 'EXTERNALCALL') {
      this.hidden = true
    }

    if (this.hidden) {
      className += ' brHidden'
    }
    if (disabled) {
      className += ' brDisabled'
    }

    if (editorTypes.length >= 2) {
      menuOptions.push({
        label: 'Change editor',
        iconClass: <EditIcon />,
        event: this.handleChangeEditorTypeMenuClick.bind(this),
        enabled: true,
      })
    }

    if (props.uiData.configurations.headerButtons) {
      menuOptions = menuOptions.filter(
        s =>
          !s.headerButtonName ||
          props.uiData.configurations.headerButtons.indexOf(
            s.headerButtonName,
          ) !== -1,
      )
    }

    if (
      (int(props.uiData.ucUiStore.getOptionalSetting({ key: 'fsp' })) &
        myUcCimUserType) ===
      myUcCimUserType
    ) {
      menuOptions = menuOptions.filter(s => s.headerButtonName !== 'file')
    }

    if (menuOptions.length) {
      className += ' brMenuOptionsLength'
    }

    console.log('#Duy Phan console check cond', disabled)
    return (
      <View
        style={[
          styles[className.split(' ')[0]],
          styles[className.split(' ')[1]],
          props.uiData.currentSelectedTab ===
          props.panelType + '_' + props.panelCode
            ? styles.brSelected
            : null,
          (props.uiData.configurations &&
            props.uiData.configurations.sendButton) ||
          isEmail
            ? styles.brWithSendButton
            : null,
          props.uiData.configurations &&
          props.uiData.configurations.withMenuOptions
            ? styles.brWithMenuOptions
            : null,
          isEmail && chatHeaderInfo.lastConfType === 'emptylast'
            ? styles.brMaximized
            : null,
          this.hidden ? styles.brHidden : null,
          disabled ? styles.brDisabled : null,
          menuOptions.length ? styles.brMenuOptionsLength : null,
          isEmail && chatHeaderInfo.lastConfType === 'webchat'
            ? { height: 70 - Math.min(0, splitterHeight) }
            : {},
          // { zIndex: 100 },
        ]}
        ref={this.editorAreaRef}
        onTouchEnd={() => {
          console.log('#Duy Phan console onTouchEnd3')
        }}
      >
        <CustomTextInput
          ref={this.subjectTextBoxRef}
          style={styles.brSubjectTextBox}
          placeholder={uawMsgs.LBL_EDITOR_SUBJECT_PLACEHOLDER}
          disabled={disabled}
        />
        <View style={styles.brEditorTextareaContainer}>
          <CustomTextInput
            ref={this.editorTextareaRef}
            style={styles.brEditorTextarea}
            placeholder={
              disabled || isEmail ? '' : uawMsgs.LBL_EDITOR_TEXTAREA_PLACEHOLDER
            }
            onKeyPress={e => {
              const r = this.editorTextareaRef.current
              props.uiData.fire(
                'editorTextarea_onKeyDown',
                props.panelType,
                props.panelCode,
                disabled,
                isEmail,
                r,
                e,
              )
            }}
            multiline
          />
        </View>

        {/* Draggable Splitter */}
        {isEmail && chatHeaderInfo.lastConfType === 'webchat' && (
          <Animated.View
            style={[
              styles.brSplitterHeight,
              { transform: [{ translateY: this.splitterPosition }] },
            ]}
            {...this.panResponder.panHandlers}
          />
        )}

        <ButtonIconic
          style={[styles.brEditorSendButton]}
          title={uawMsgs.LBL_EDITOR_SEND_BUTTON_TOOLTIP}
          iconSource={isEmail ? <SendIcon /> : <ChatIcon color='#b9b9b9' />}
          disabled={disabled}
          onPress={this.handleSendButtonClick.bind(this)}
        />
        <TouchableOpacity
          style={styles.brEditorOptionsButton}
          onPress={this.handleOptionsLinkClick.bind(this)}
          pointerEvents='auto'
        >
          <View style={[styles.brEditorOptionsIcon]}>
            {props.uiData.showingDialogVersion ===
            this.state.showingDialogVersion ? (
              <TriangleUpIcon color='#ffffff' width={30} height={30} />
            ) : (
              <TriangleDownIcon color='#ffffff' width={30} height={30} />
            )}
          </View>
        </TouchableOpacity>
        <MenuBalloonDialog
          ref={this.editorOptionsBalloonRef}
          showing={
            props.uiData.showingDialogVersion ===
            this.state.showingDialogVersion
          }
          style={styles.brEditorOptionsBalloon}
          onPress={this.handleOptionsLinkClick.bind(this)}
        >
          {menuOptions.map((s, i) => (
            <MenuItem
              key={i}
              style={[styles.brEditorOptionsItem]}
              disabled={!s.enabled}
              onPress={
                s.event ||
                props.uiData.fire.bind(
                  props.uiData,
                  s.eventName,
                  props.panelType,
                  props.panelCode,
                )
              }
            >
              <View style={{ marginRight: 10 }}>{s.iconClass}</View>
              <Text>{s.label}</Text>
            </MenuItem>
          ))}
        </MenuBalloonDialog>
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
          {replyOptions.map((s, i) => (
            <MenuItem
              key={i}
              style={[
                styles.brEditorOptionsReplyWebchatMenuItem,
                styles[s.className],
              ]}
              onPress={s.event}
            >
              <Text>{s.label}</Text>
            </MenuItem>
          ))}
        </MenuBalloonDialog>
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
          {editorTypes.map((t, i) => (
            <MenuItem
              key={i}
              style={[
                styles.brEditorOptionsChangeEditorTypeMenuItem,
                styles['brEditorType' + t],
              ]}
              onPress={() => this.setState({ selectedEditorType: t })}
            >
              <Text>{uawMsgs['LBL_EDITOR_TYPE_' + t] || t}</Text>
            </MenuItem>
          ))}
        </MenuBalloonDialog>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  // Main editor area
  brEditorArea: {
    position: 'absolute',
    padding: 0,
    paddingBottom: 1,
    width: '100%',
    height: 70,
    left: 0,
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  brHidden: {
    display: 'none',
  },
  brMaximized: {
    height: '100%',
  },
  brSelected: {
    backgroundColor: '@white',
  },

  // Subject text box
  brSubjectTextBox: {
    display: 'none',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: 32,
    borderRadius: 0,
  },
  brWithSubjectTextBox: {
    // This is a modifier class, will be applied conditionally
  },

  // Editor textarea container
  brEditorTextareaContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },

  // Editor textarea
  brEditorTextarea: {
    // position: 'absolute',
    width: '100%',
    height: '100%',
    fontFamily: undefined, // Will inherit from parent
    fontSize: 13,
    fontWeight: '400',
    // lineHeight: 1.6,
    letterSpacing: 0.3,
    borderWidth: 0,
    padding: 8,
    marginLeft: 80,
  },
  brWithMenuOptions: {
    // This is a modifier class, will be applied conditionally
  },
  brMenuOptionsLength: {
    // This is a modifier class, will be applied conditionally
  },
  brDisabled: {
    color: '@dark_gray',
  },

  // Splitter height
  brSplitterHeight: {
    position: 'absolute',
    width: '100%',
    height: 8,
    left: 0,
    bottom: 60,
    // cursor: 'row-resize', // Not applicable in RN
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Editor send button
  brEditorSendButton: {
    // display: 'none',
    position: 'absolute',
    right: 16,
    bottom: 18,
    // borderWidth: 0,
    // opacity: 0.2,
  },
  brWithSendButton: {
    // This is a modifier class, will be applied conditionally
  },

  // Editor options button
  brEditorOptionsButton: {
    // display: 'none',
    position: 'absolute',
    width: 40,
    height: 40,
    left: 20,
    bottom: 17,
    borderWidth: 0,
    borderRadius: 4,
    backgroundColor: '#5fac3f',
    // boxShadow: '0px 0px 20px -10px @mantis', // Will be handled differently in RN
  },

  // Editor options icon
  brEditorOptionsIcon: {
    display: 'flex',
    // position: 'absolute',
    // left: 0,
    // top: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Editor options balloon
  brEditorOptionsBalloon: {
    position: 'absolute',
    left: 20,
    bottom: 58,
    // zIndex: 9999,
  },

  // Editor options item
  brEditorOptionsItem: {
    flexDirection: 'row',
    paddingHorizontal: 6,
    alignItems: 'center',
    // backgroundRepeat: 'no-repeat', // Will be handled differently in RN
    // backgroundPosition: '8px center', // Will be handled differently in RN
  },

  // Editor options separator
  brEditorOptionsSeparator: {
    margin: 2,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '@platinum',
    borderStyle: 'inset',
  },

  // Editor options reply webchat balloon
  brEditorOptionsReplyWebchatBalloon: {
    position: 'absolute',
  },

  // Editor options change editor type balloon
  brEditorOptionsChangeEditorTypeBalloon: {
    position: 'absolute',
  },

  // Editor options change editor type menu item
  brEditorOptionsChangeEditorTypeMenuItem: {
    paddingLeft: 46,
  },

  // Icon classes
  br_bi_icon_log_out_svg: {
    // Icon styles will be handled differently in RN
  },
  br_bi_icon_envelope_svg: {
    // Icon styles will be handled differently in RN
  },
  br_bi_icon_upload_svg: {
    // Icon styles will be handled differently in RN
  },
  br_bi_icon_phone_svg: {
    // Icon styles will be handled differently in RN
  },
  br_bi_icon_video_call_svg: {
    // Icon styles will be handled differently in RN
  },
  br_bi_icon_channel_mosaic_1_svg: {
    // Icon styles will be handled differently in RN
  },
  br_bi_icon_history_svg: {
    // Icon styles will be handled differently in RN
  },
  br_bi_icon_reply_svg: {
    // Icon styles will be handled differently in RN
  },
  br_bi_icon_edit_svg: {
    // Icon styles will be handled differently in RN
  },
  br_bi_icon_triangle_up_svg: {
    // Icon styles will be handled differently in RN
  },
  br_bi_icon_triangle_down_svg: {
    // Icon styles will be handled differently in RN
  },
  br_bi_icon_send_svg: {
    // Icon styles will be handled differently in RN
  },
  br_bi_icon_chat_svg: {
    // Icon styles will be handled differently in RN
  },

  // Editor type classes
  brEditorTypeEmail: {
    // Editor type specific styles
  },
  brEditorTypeChat: {
    // Editor type specific styles
  },

  // Reply options classes
  brManualContinuation: {
    // Reply option specific styles
  },
  brContinuation: {
    // Reply option specific styles
  },
})
