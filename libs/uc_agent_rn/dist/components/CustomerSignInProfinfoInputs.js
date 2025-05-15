import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import CustomerSignInProfinfoInputSelect from './CustomerSignInProfinfoInputSelect.js'
import CustomerSignInProfinfoInputInput from './CustomerSignInProfinfoInputInput.js'

/**
 * CustomerSignInProfinfoInputs
 * props.uiData
 * props.uiData.configurations
 */
export default props => {
  if (
    props.uiData.configurations.profinfoInputs &&
    props.uiData.configurations.profinfoInputs.length
  ) {
    // Get custom styles from configurations
    const areaStyles =
      props.uiData.configurations.signInFormStyles
        ?.brSignInProfinfoInputsArea || {}
    const labelStyles =
      props.uiData.configurations.signInFormStyles
        ?.brSignInProfinfoInputsLabel || {}
    const inputAreaStyles =
      props.uiData.configurations.signInFormStyles?.brSignInProfinfoInputArea ||
      {}
    const inputLabelStyles =
      props.uiData.configurations.signInFormStyles
        ?.brSignInProfinfoInputLabel || {}

    return (
      <View style={[styles.brSignInProfinfoInputsArea, areaStyles]}>
        <Text style={[styles.brSignInProfinfoInputsLabel, labelStyles]}>
          {props.uiData.configurations.profinfoInputsInnerHTML
            ? props.uiData.configurations.profinfoInputsInnerHTML.replace(
                /<[^>]*>/g,
                '',
              )
            : string(props.uiData.configurations.profinfoInputsLabel)}
        </Text>

        {props.uiData.configurations.profinfoInputs.map(o => (
          <View
            key={o.key}
            style={[styles.brSignInProfinfoInputArea, inputAreaStyles]}
          >
            <View style={styles.labelContainer}>
              <Text
                style={[styles.brSignInProfinfoInputLabel, inputLabelStyles]}
              >
                {o.innerHTML
                  ? o.innerHTML.replace(/<[^>]*>/g, '')
                  : string(o.label)}
              </Text>
              {o.mandatory && <Text style={styles.mandatoryIndicator}>*</Text>}
            </View>

            {o.options && o.options.length ? (
              <CustomerSignInProfinfoInputSelect
                uiData={props.uiData}
                profinfoInput={o}
              />
            ) : (
              <CustomerSignInProfinfoInputInput
                uiData={props.uiData}
                profinfoInput={o}
              />
            )}
          </View>
        ))}
      </View>
    )
  } else {
    return null
  }
}

const styles = StyleSheet.create({
  brSignInProfinfoInputsArea: {
    width: 180,
    marginVertical: 8,
    marginHorizontal: 'auto',
    alignSelf: 'center',
  },
  brSignInProfinfoInputsLabel: {
    width: 180,
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  brSignInProfinfoInputArea: {
    width: 180,
    marginVertical: 8,
    marginHorizontal: 'auto',
    alignItems: 'center',
    alignSelf: 'center',
  },
  labelContainer: {
    width: 180,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  brSignInProfinfoInputLabel: {
    width: 180,
    textAlign: 'left',
    fontSize: 16,
    color: '#333',
  },
  mandatoryIndicator: {
    color: '#bb7755',
    marginLeft: 2,
    fontSize: 16,
  },
})
