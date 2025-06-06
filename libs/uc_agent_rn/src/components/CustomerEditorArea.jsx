import React from 'react'
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native'
import uawMsgs from '../utilities/uawmsgs'
import { int } from '../utilities/strings'
import ButtonIconic from './ButtonIconic'
import MenuBalloonDialog from './MenuBalloonDialog'
import MenuItem from './MenuItem'

/**
 * CustomerEditorArea
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.phoneSettings
 * props.uiData.configurations
 * props.uiData.showingDialogVersion
 * props.uiData.showingDialog_update
 * props.uiData.reportMailStatus
 * props.uiData.reportEmailAddress
 * props.uiData.editorEditEmailLink_onClick
 * props.uiData.editorEndChatLink_onClick
 * props.uiData.editorMakeCallLink_onClick
 * props.uiData.editorReportMailLink_onClick
 * props.uiData.editorSendButton_onClick
 * props.uiData.editorSendFileLink_onClick
 * props.uiData.editorTextarea_onKeyDown
 * props.panelType
 * props.panelCode
 * props.withMenuOptions
 * props.disabled
 */
export default class CustomerEditorArea extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showingDialogVersion: null,
    }
    this.editorTextarea = React.createRef()
  }

  componentDidMount() {
    if (this.editorTextarea.current) {
      this.editorTextarea.current.focus()
    }
  }

  componentWillUnmount() {
    this.props.uiData.removeHandler(this)
  }

  handleSendButtonPress = () => {
    const { props } = this
    props.uiData.fire(
      'editorSendButton_onClick',
      props.panelType,
      props.panelCode,
      this.editorTextarea.current,
    )
  }

  handleOptionsPress = () => {
    const { props } = this
    if (props.uiData.showingDialogVersion !== this.state.showingDialogVersion) {
      this.setState({
        showingDialogVersion: ++props.uiData.showingDialogVersion,
      })
      props.uiData.fire('showingDialog_update')
    }
  }

  handleMenuOptionsItemPress = (eventName, enabled) => {
    const { props } = this
    if (enabled) {
      props.uiData.fire(eventName, props.panelType, props.panelCode)
    }
  }

  render() {
    const { props } = this
    const settings = props.uiData.ucUiStore.getChatClient().getSettings()
    const myUcCimUserType = int(props.uiData.ucUiStore.getUcCimUserType())
    const signedIn = props.uiData.ucUiStore.getSignInStatus() === 3
    const disabled = props.disabled || !signedIn

    let containerStyle = [
      styles.brEditorArea,
      props.withMenuOptions && styles.brWithMenuOptions,
      props.uiData.configurations?.sendButton && styles.brWithSendButton,
      disabled && styles.brDisabled,
    ]

    let menuOptions = []
    if (props.uiData.configurations?.menuOptions?.length) {
      const optionInfoTable = {
        end: {
          eventName: 'editorEndChatLink_onClick',
          label: uawMsgs.LBL_EDITOR_END_CHAT_LINK,
          enabled: signedIn,
        },
        file: {
          eventName: 'editorSendFileLink_onClick',
          label: uawMsgs.LBL_EDITOR_SEND_FILE_LINK,
          enabled: signedIn,
        },
        call: {
          eventName: 'editorMakeCallLink_onClick',
          label: uawMsgs.LBL_EDITOR_MAKE_CALL_LINK,
          enabled:
            signedIn &&
            (!(
              props.uiData.phoneSettings?.call_target ===
                props.uiData.phoneSettings?.customer_sip_user &&
              props.uiData.phoneSettings?.customer_call_target ===
                props.uiData.phoneSettings?.conf_ext
            ) ||
              props.uiData.ucUiStore
                .getChatClient()
                .getConference(props.uiData.ucUiStore.getGuestConfId()).assigned
                .user_id),
        },
        transcript: {
          eventName: 'editorReportMailLink_onClick',
          label: (
            <View style={styles.transcriptLabel}>
              <View
                style={[
                  styles.reportMailIcon,
                  (settings?.optional_settings?.send_report_mail ||
                    props.uiData.reportMailStatus[props.panelCode] === 2) &&
                    styles.reportMailIconChecked,
                ]}
              />
              <Text>{uawMsgs.LBL_EDITOR_REPORT_MAIL_LINK}</Text>
            </View>
          ),
          enabled:
            signedIn || props.uiData.reportMailStatus[props.panelCode] !== 2,
        },
      }

      if (props.uiData.reportEmailAddress) {
        optionInfoTable['email'] = {
          eventName: 'editorEditEmailLink_onClick',
          label: props.uiData.reportEmailAddress,
          enabled:
            signedIn || props.uiData.reportMailStatus[props.panelCode] !== 2,
        }
      }

      if (
        (int(props.uiData.ucUiStore.getOptionalSetting({ key: 'fsp' })) &
          myUcCimUserType) ===
        myUcCimUserType
      ) {
        delete optionInfoTable.file
      }

      menuOptions = props.uiData.configurations.menuOptions.map((s, i) => {
        if (optionInfoTable[s]) {
          return (
            <MenuItem
              key={i}
              style={styles.brEditorOptionsItem}
              disabled={!optionInfoTable[s].enabled}
              onPress={() =>
                this.handleMenuOptionsItemPress(
                  optionInfoTable[s].eventName,
                  optionInfoTable[s].enabled,
                )
              }
            >
              {optionInfoTable[s].label}
            </MenuItem>
          )
        } else if (s === 'separator') {
          return <View key={i} style={styles.brEditorOptionsSeparator} />
        }
        return null
      })
    }

    return (
      <View style={containerStyle}>
        <TextInput
          ref={this.editorTextarea}
          style={styles.brEditorTextarea}
          multiline
          placeholder={disabled ? '' : uawMsgs.LBL_EDITOR_TEXTAREA_PLACEHOLDER}
          onKeyPress={e =>
            props.uiData.fire(
              'editorTextarea_onKeyDown',
              props.panelType,
              props.panelCode,
              disabled,
              e,
            )
          }
          editable={!disabled}
        />

        <ButtonIconic
          style={styles.brEditorSendButton}
          iconName='chat'
          title={uawMsgs.LBL_EDITOR_SEND_BUTTON_TOOLTIP}
          onPress={this.handleSendButtonPress}
          disabled={disabled}
        />

        <TouchableOpacity
          style={styles.brEditorOptionsButton}
          onPress={this.handleOptionsPress}
          disabled={!props.withMenuOptions}
        >
          <View
            style={[
              styles.brEditorOptionsIcon,
              props.uiData.showingDialogVersion ===
              this.state.showingDialogVersion
                ? styles.iconUp
                : styles.iconDown,
            ]}
          />
        </TouchableOpacity>

        <MenuBalloonDialog
          showing={
            props.uiData.showingDialogVersion ===
            this.state.showingDialogVersion
          }
          style={styles.brEditorOptionsBalloon}
        >
          {menuOptions}
        </MenuBalloonDialog>
      </View>
    )
  }
}

const colors = {
  white: '#ffffff',
  snow: '#fafafa',
  white_smoke: '#f5f5f5',
  isabelline: '#eeeeee',
  isabelline_tp: 'rgba(0, 0, 0, 0.065)',
  platinum: '#e0e0e0',
  dark_gray: '#9e9e9e',
  dark_jungle_green: '#212121',
  portland_orange: '#ff4526',
  disabled_gray: '#bdbdbd',
  pressed_gray: '#9e9e9e',
  hover_gray: '#616161',
  hint_gray: '#424242',
  status_available: '#5fac3f',
  status_idle: '#f3c915',
  status_busy: '#ff4526',
  status_invisible: '#bdbdbd',
  medium_turquoise: '#4BC5DE',
  mantis: '#5fac3f',
  green: '#4c8a32',
  sap_green: '#2d521e',
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
    borderTopColor: colors.platinum,
  },
  brEditorTextarea: {
    width: '100%',
    height: '100%',
    fontFamily: 'System',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.3,
    borderWidth: 0,
    paddingTop: 16,
    paddingBottom: 8,
    paddingLeft: 80,
    paddingRight: 8,
    backgroundColor: 'transparent',
  },
  brEditorTextareaDisabled: {
    color: colors.dark_gray,
  },
  brEditorTextareaFocused: {
    borderWidth: 2,
    borderColor: colors.medium_turquoise,
  },
  brEditorTextareaDisabledFocused: {
    borderWidth: 0,
  },
  brEditorTextareaPlaceholder: {
    color: colors.dark_gray,
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
    backgroundColor: 'transparent',
  },
  brEditorSendButtonDisabledCircle: {
    position: 'absolute',
    left: 4,
    top: 4,
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: colors.dark_jungle_green,
    borderRadius: 10,
  },
  brEditorSendButtonDisabledLine: {
    position: 'absolute',
    left: 6,
    top: 14,
    width: 20,
    height: 2,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.white,
    backgroundColor: colors.dark_jungle_green,
    transform: [{ rotate: '45deg' }],
  },
  brWithSendButton: {
    display: 'flex',
  },
  brEditorOptionsButton: {
    position: 'absolute',
    width: 40,
    height: 40,
    left: 20,
    top: 8,
    borderWidth: 0,
    borderRadius: 4,
    backgroundColor: colors.mantis,
    shadowColor: colors.mantis,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  brEditorOptionsButtonHover: {
    backgroundColor: colors.green,
    shadowColor: colors.green,
  },
  brEditorOptionsButtonActive: {
    backgroundColor: colors.sap_green,
    shadowColor: colors.sap_green,
  },
  brEditorOptionsButtonDisabled: {
    backgroundColor: colors.disabled_gray,
    shadowColor: colors.disabled_gray,
  },
  brEditorOptionsIcon: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    tintColor: colors.white,
  },
  brEditorOptionsBalloon: {
    position: 'absolute',
    left: 20,
    bottom: 56,
    backgroundColor: colors.white,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  brEditorOptionsItem: {
    padding: 14,
    paddingHorizontal: 16,
  },
  brEditorReportMailLinkIcon: {
    width: 20,
    height: 16,
    marginRight: 4,
  },
  brEditorReportMailLinkIconDisabled: {
    opacity: 0.2,
  },
  brEditorOptionsSeparator: {
    marginVertical: 2,
    marginHorizontal: 10,
    height: 1,
    backgroundColor: colors.platinum,
  },
  brEditorOptionsButtonDisabled: {
    backgroundColor: colors.disabled_gray,
    shadowColor: colors.disabled_gray,
  },
  brEditorOptionsSeparator: {
    marginVertical: 2,
    marginHorizontal: 10,
    height: 1,
    backgroundColor: colors.platinum,
  },
  transcriptLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reportMailIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#000',
  },
  reportMailIconChecked: {
    backgroundColor: '#4CAF50',
  },
  iconUp: {
    transform: [{ rotate: '180deg' }],
  },
  iconDown: {
    transform: [{ rotate: '0deg' }],
  },
  brEditorOptionsButtonDisabled: {
    backgroundColor: colors.disabled_gray,
    shadowColor: colors.disabled_gray,
  },
  brEditorOptionsSeparator: {
    marginVertical: 2,
    marginHorizontal: 10,
    height: 1,
    backgroundColor: colors.platinum,
  },
})
