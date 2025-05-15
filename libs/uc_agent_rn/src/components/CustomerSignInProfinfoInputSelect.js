import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import { Picker } from '@react-native-picker/picker'

/**
 * CustomerSignInProfinfoInputSelect
 * props.uiData
 * props.uiData.configurations
 * props.uiData.signInProfinfoInputsValue
 * props.uiData.signInProfileInfoInputSelect_onChange
 * props.profinfoInput
 */
export default props => {
  const configStyles =
    props.uiData.configurations.signInFormStyles?.brSignInProfinfoInputSelect ||
    {}

  const customStyles = StyleSheet.create({
    dynamic: {
      width: configStyles.width || 180,
      height: configStyles.height,
      backgroundColor: configStyles.backgroundColor,
      color: configStyles.color,
      marginTop: configStyles.marginTop,
      marginBottom: configStyles.marginBottom,
      marginLeft: configStyles.marginLeft,
      marginRight: configStyles.marginRight,
      paddingTop: configStyles.paddingTop,
      paddingBottom: configStyles.paddingBottom,
      paddingLeft: configStyles.paddingLeft,
      paddingRight: configStyles.paddingRight,
    },
  })

  return (
    <View style={[styles.container, customStyles.dynamic]}>
      <Picker
        style={styles.picker}
        selectedValue={string(
          props.uiData.signInProfinfoInputsValue[props.profinfoInput.key],
        )}
        onValueChange={itemValue => {
          props.uiData.fire('signInProfileInfoInputSelect_onChange', {
            ...props.profinfoInput,
            value: itemValue,
          })
        }}
        mode='dropdown'
      >
        {props.profinfoInput.options.map(o => (
          <Picker.Item key={o} label={o} value={o} style={styles.pickerItem} />
        ))}
      </Picker>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 180, // Default width from LESS
    overflow: 'hidden',
    borderRadius: 4,
    ...Platform.select({
      ios: {
        backgroundColor: '#fff',
      },
      android: {
        backgroundColor: 'transparent',
      },
    }),
  },
  picker: {
    width: '100%',
    height: Platform.select({
      ios: 40,
      android: 50,
    }),
    color: '#000',
  },
  pickerItem: {
    fontSize: 16,
    color: '#000',
  },
})
