import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ButtonLabeled from './ButtonLabeled.js'
import Errors from '../utilities/errors.js'
import { formatStr } from '../utilities/strings.js'

/**
 * Messagebar
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.ownerDocument
 * props.uiData.messagebarCancelButton_onClick
 * props.uiData.messagebarReloadButton_onClick
 * props.uiData.messagebarRetryButton_onClick
 */
export default class extends React.Component {
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
  handleDragOver(ev) {
    const props = this.props
    if (!this.state.someDragging) {
      this.setState({ someDragging: true })
      setTimeout(this.checkDragEnd.bind(this), 1000)
    }
  }
  checkDragEnd() {
    const props = this.props
    if (this.state.someDragging) {
      if (
        props.uiData.ownerDocument &&
        props.uiData.ownerDocument.querySelector &&
        props.uiData.ownerDocument.querySelector('.brCanDrop')
      ) {
        setTimeout(this.checkDragEnd.bind(this), 1000)
      } else {
        this.setState({ someDragging: false })
      }
    }
  }
  render() {
    const props = this.props
    const signInStatus = props.uiData.ucUiStore.getSignInStatus()
    const lastSignOutReason = props.uiData.ucUiStore.getLastSignOutReason()
    return (
      <div
        className={
          'brMessagebar' +
          (signInStatus === 3 || lastSignOutReason.code === 1
            ? ' brHidden'
            : '') +
          (this.state.someDragging ? ' brSomeDragging' : '')
        }
        onDragOver={this.handleDragOver.bind(this)}
      >
        <span className='brMessagebarMessage'>
          {(lastSignOutReason.code === Errors.UPDATE_STARTED ||
          lastSignOutReason.code === Errors.VERSION_INVALID
            ? uawMsgs.MSG_MESSAGEBAR_MAINTENANCE
            : lastSignOutReason.code === Errors.PLEONASTIC_LOGIN ||
                lastSignOutReason.code === Errors.ALREADY_SIGNED_IN
              ? uawMsgs.MSG_MESSAGEBAR_PLEONASTIC
              : lastSignOutReason.code === Errors.CANNOT_START_MFA
                ? uawMsgs.MSG_MESSAGEBAR_MFA
                : uawMsgs.MSG_MESSAGEBAR_DISCONNECTED) +
            ' ' +
            (signInStatus === 2
              ? uawMsgs.MSG_MESSAGEBAR_CONNECTING
              : this.state.secondsElapsed
                ? formatStr(
                    uawMsgs.MSG_MESSAGEBAR_RETRY,
                    this.state.secondsElapsed,
                  )
                : '')}
        </span>
        <ButtonLabeled
          className='brMessagebarButton brMessagebarCancelButton'
          hidden={
            !(
              (signInStatus === 0 || signInStatus === 1) &&
              this.state.secondsElapsed
            )
          }
          title={uawMsgs.LBL_MESSAGEBAR_CANCEL_BUTTON_TOOLTIP}
          onClick={props.uiData.fire.bind(
            props.uiData,
            'messagebarCancelButton_onClick',
          )}
        >
          {uawMsgs.LBL_MESSAGEBAR_CANCEL_BUTTON}
        </ButtonLabeled>
        <ButtonLabeled
          className='brMessagebarButton brMessagebarReloadButton'
          hidden={
            !(
              (signInStatus === 0 || signInStatus === 1) &&
              (lastSignOutReason.code === Errors.UPDATE_STARTED ||
                lastSignOutReason.code === Errors.VERSION_INVALID ||
                lastSignOutReason.code === Errors.CANNOT_START_MFA)
            )
          }
          title={uawMsgs.LBL_MESSAGEBAR_RELOAD_BUTTON_TOOLTIP}
          onClick={props.uiData.fire.bind(
            props.uiData,
            'messagebarReloadButton_onClick',
          )}
        >
          {uawMsgs.LBL_MESSAGEBAR_RELOAD_BUTTON}
        </ButtonLabeled>
        <ButtonLabeled
          className='brMessagebarButton brMessagebarRetryButton'
          hidden={
            !(
              (signInStatus === 0 || signInStatus === 1) &&
              !(
                lastSignOutReason.code === Errors.UPDATE_STARTED ||
                lastSignOutReason.code === Errors.VERSION_INVALID ||
                lastSignOutReason.code === Errors.CANNOT_START_MFA
              )
            )
          }
          title={uawMsgs.LBL_MESSAGEBAR_RETRY_BUTTON_TOOLTIP}
          onClick={props.uiData.fire.bind(
            props.uiData,
            'messagebarRetryButton_onClick',
          )}
        >
          {uawMsgs.LBL_MESSAGEBAR_RETRY_BUTTON}
        </ButtonLabeled>
      </div>
    )
  }
}
