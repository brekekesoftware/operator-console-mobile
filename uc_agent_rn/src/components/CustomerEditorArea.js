import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ReactDOM from 'react-dom'
import ButtonIconic from './ButtonIconic.js'
import MenuBalloonDialog from './MenuBalloonDialog.js'
import MenuItem from './MenuItem.js'

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
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showingDialogVersion: null,
    }
  }
  componentDidMount() {
    const props = this.props
    const editorTextarea = ReactDOM.findDOMNode(this.refs['editorTextarea'])
    editorTextarea.focus()
  }
  componentWillUnmount() {
    const props = this.props
    props.uiData.removeHandler(this)
  }
  handleSendButtonClick(ev) {
    const props = this.props
    const editorTextarea = ReactDOM.findDOMNode(this.refs['editorTextarea'])
    props.uiData.fire(
      'editorSendButton_onClick',
      props.panelType,
      props.panelCode,
      editorTextarea,
      ev,
    )
  }
  handleOptionsLinkClick(ev) {
    const props = this.props
    if (props.uiData.showingDialogVersion !== this.state.showingDialogVersion) {
      this.setState({
        showingDialogVersion: ++props.uiData.showingDialogVersion,
      })
      ev.stopPropagation()
      props.uiData.fire('showingDialog_update')
    }
  }
  handleMenuOptionsItemClick(eventName, enabled, ev) {
    const props = this.props
    if (enabled) {
      props.uiData.fire(eventName, props.panelType, props.panelCode, ev)
    }
  }
  render() {
    const props = this.props
    const settings = props.uiData.ucUiStore.getChatClient().getSettings()
    const myUcCimUserType = int(props.uiData.ucUiStore.getUcCimUserType())
    const signedIn = props.uiData.ucUiStore.getSignInStatus() === 3
    const disabled = props.disabled || !signedIn
    let className = 'brEditorArea'
    let menuOptions = []
    if (props.withMenuOptions) {
      className += ' brWithMenuOptions'
    }
    if (props.uiData.configurations && props.uiData.configurations.sendButton) {
      className += ' brWithSendButton'
    }
    if (
      props.uiData.configurations &&
      props.uiData.configurations.menuOptions &&
      props.uiData.configurations.menuOptions.length
    ) {
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
              props.uiData.phoneSettings &&
              props.uiData.phoneSettings.call_target ===
                props.uiData.phoneSettings.customer_sip_user &&
              props.uiData.phoneSettings.customer_call_target ===
                props.uiData.phoneSettings.conf_ext
            ) ||
              props.uiData.ucUiStore
                .getChatClient()
                .getConference(props.uiData.ucUiStore.getGuestConfId()).assigned
                .user_id),
        },
        transcript: {
          eventName: 'editorReportMailLink_onClick',
          label: (
            <span>
              <span
                className={
                  'brEditorReportMailLinkIcon' +
                  ((settings &&
                    settings.optional_settings &&
                    settings.optional_settings.send_report_mail) ||
                  props.uiData.reportMailStatus[props.panelCode] === 2
                    ? ' br_bi_icon_check_svg'
                    : ' br_bi_icon_square_svg')
                }
              ></span>
              <span>{uawMsgs.LBL_EDITOR_REPORT_MAIL_LINK}</span>
            </span>
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
              className='brEditorOptionsItem'
              disabled={!optionInfoTable[s].enabled}
              onClick={this.handleMenuOptionsItemClick.bind(
                this,
                optionInfoTable[s].eventName,
                optionInfoTable[s].enabled,
              )}
            >
              {optionInfoTable[s].label}
            </MenuItem>
          )
        } else if (s === 'separator') {
          return <div key={i} className='brEditorOptionsSeparator'></div>
        } else {
          return <span key={i}></span>
        }
      })
    }
    if (disabled) {
      className += ' brDisabled'
    }
    return (
      <div className={className}>
        <textarea
          ref='editorTextarea'
          className='brEditorTextarea'
          placeholder={disabled ? '' : uawMsgs.LBL_EDITOR_TEXTAREA_PLACEHOLDER}
          onKeyDown={props.uiData.fire.bind(
            props.uiData,
            'editorTextarea_onKeyDown',
            props.panelType,
            props.panelCode,
            disabled,
          )}
        />
        <ButtonIconic
          className='brEditorSendButton br_bi_icon_chat_svg'
          title={uawMsgs.LBL_EDITOR_SEND_BUTTON_TOOLTIP}
          onClick={this.handleSendButtonClick.bind(this)}
          disabled={disabled}
        ></ButtonIconic>
        <button
          className='brEditorOptionsButton'
          title={uawMsgs.LBL_EDITOR_OPTIONS_LINK}
          onClick={this.handleOptionsLinkClick.bind(this)}
          disabled={!props.withMenuOptions}
        >
          <span
            className={
              'brEditorOptionsIcon' +
              (props.uiData.showingDialogVersion ===
              this.state.showingDialogVersion
                ? ' br_bi_icon_triangle_up_svg'
                : ' br_bi_icon_triangle_down_svg')
            }
          ></span>
        </button>
        <MenuBalloonDialog
          showing={
            props.uiData.showingDialogVersion ===
            this.state.showingDialogVersion
          }
          className='brEditorOptionsBalloon'
        >
          {menuOptions}
        </MenuBalloonDialog>
      </div>
    )
  }
}
