import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import Errors from '../utilities/errors.js'

/**
 * CustomerSignInError
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.configurations
 * props.uiData.signInErrorMessage
 */
export default props => {
  return (
    <div
      className={
        'brSignInErrorArea' +
        (props.uiData.signInErrorMessage ? ' brWithErrorMessage' : '') +
        (props.uiData.ucUiStore.getSignInStatus() === 1
          ? ' brSignInFailed'
          : '') +
        ((props.uiData.ucUiStore.getLastSignOutReason() || {}).code ===
        Errors.ERROR_REENTER_CONF
          ? ' brErrorReenterConf'
          : '')
      }
      style={
        (props.uiData.configurations.signInFormStyles &&
          props.uiData.configurations.signInFormStyles.brSignInErrorArea) ||
        {}
      }
    >
      <span
        className='brSignInErrorMessage'
        style={
          (props.uiData.configurations.signInFormStyles &&
            props.uiData.configurations.signInFormStyles
              .brSignInErrorMessage) ||
          {}
        }
      >
        {props.uiData.signInErrorMessage || uawMsgs.MSG_SIGN_IN_FAILED}
      </span>
    </div>
  )
}
