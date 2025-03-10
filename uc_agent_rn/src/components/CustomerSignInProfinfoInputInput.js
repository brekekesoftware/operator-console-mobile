import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'

/**
 * CustomerSignInProfinfoInputInput
 * props.uiData
 * props.uiData.configurations
 * props.uiData.signInProfinfoInputsValue
 * props.uiData.signInProfileInfoInputInput_onChange
 * props.profinfoInput
 */
export default props => {
  return (
    <input
      type='text'
      className='brSignInProfinfoInputInput'
      style={
        (props.uiData.configurations.signInFormStyles &&
          props.uiData.configurations.signInFormStyles
            .brSignInProfinfoInputInput) ||
        {}
      }
      value={string(
        props.uiData.signInProfinfoInputsValue[props.profinfoInput.key],
      )}
      placeholder={props.profinfoInput.placeholder}
      autoCapitalize={props.profinfoInput.autoCapitalize}
      onChange={props.uiData.fire.bind(
        props.uiData,
        'signInProfileInfoInputInput_onChange',
        props.profinfoInput,
      )}
    />
  )
}
