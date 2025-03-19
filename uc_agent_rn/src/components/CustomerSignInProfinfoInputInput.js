import React from 'react'
import { TextInput, StyleSheet } from 'react-native'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'

/**
 * CustomerSignInProfinfoInputInput - React Native version
 * A text input component for sign-in profile information
 *
 * props.uiData - UI data object
 * props.uiData.configurations - Configuration properties
 * props.uiData.signInProfinfoInputsValue - Input values
 * props.uiData.signInProfileInfoInputInput_onChange - Change handler
 * props.profinfoInput - Profile info input configuration
 */
export default props => {
  const handleChangeText = text => {
    const event = {
      target: {
        value: text,
      },
    }

    props.uiData.fire(
      'signInProfileInfoInputInput_onChange',
      props.profinfoInput,
      event,
    )
  }

  const inputValue = string(
    props.uiData.signInProfinfoInputsValue[props.profinfoInput.key],
  )

  const customStyle =
    props.uiData.configurations.signInFormStyles &&
    props.uiData.configurations.signInFormStyles.brSignInProfinfoInputInput

  return (
    <TextInput
      style={[styles.signInProfinfoInputInput, customStyle]}
      value={inputValue}
      placeholder={props.profinfoInput.placeholder}
      autoCapitalize={props.profinfoInput.autoCapitalize || 'none'}
      onChangeText={handleChangeText}
      autoCorrect={false}
      underlineColorAndroid='transparent'
    />
  )
}

const styles = StyleSheet.create({
  signInProfinfoInputInput: {
    width: 180,
    height: 40,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
})
