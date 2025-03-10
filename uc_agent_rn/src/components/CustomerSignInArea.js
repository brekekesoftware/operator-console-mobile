import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import CustomerSignInError from './CustomerSignInError.js'
import CustomerSignInProfinfoInputs from './CustomerSignInProfinfoInputs.js'
import CustomerSignInWebchatOptionsSelect from './CustomerSignInWebchatOptionsSelect.js'

/**
 * CustomerSignInArea
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.configurations
 * props.uiData.signInButton_onClick
 */
export default props => {
  return (
    <div
      className={
        'brSignInArea' +
        (props.uiData.configurations.autoSignIn &&
        props.uiData.ucUiStore.getSignInStatus() === 2
          ? ' brAutoSigning'
          : '')
      }
      style={
        (props.uiData.configurations.signInFormStyles &&
          props.uiData.configurations.signInFormStyles.brSignInArea) ||
        {}
      }
    >
      <div
        className='brSignInFormArea'
        style={
          (props.uiData.configurations.signInFormStyles &&
            props.uiData.configurations.signInFormStyles.brSignInFormArea) ||
          {}
        }
      >
        <CustomerSignInError uiData={props.uiData} />
        <CustomerSignInProfinfoInputs uiData={props.uiData} />
        <CustomerSignInWebchatOptionsSelect uiData={props.uiData} />
        <button
          className='brSignInButton'
          style={
            (props.uiData.configurations.signInFormStyles &&
              props.uiData.configurations.signInFormStyles.brSignInButton) ||
            {}
          }
          disabled={props.uiData.ucUiStore.getSignInStatus() === 2}
          onClick={props.uiData.fire.bind(props.uiData, 'signInButton_onClick')}
        >
          {props.uiData.configurations.signInButtonInnerHTML ? (
            <span
              dangerouslySetInnerHTML={{
                __html: props.uiData.configurations.signInButtonInnerHTML,
              }}
            />
          ) : (
            props.uiData.configurations.signInButtonLabel ||
            uawMsgs.LBL_SIGN_IN_BUTTON
          )}
        </button>
      </div>
    </div>
  )
}
