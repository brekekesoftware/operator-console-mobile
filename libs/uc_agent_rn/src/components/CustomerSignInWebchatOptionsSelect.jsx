import { View, Text, TextInput, StyleSheet, Platform } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { string } from '../utilities/strings'

/**
 * CustomerSignInWebchatOptionsSelect
 * props.uiData
 * props.uiData.configurations
 * props.uiData.signInWebchatOptionsSelectIndex
 * props.uiData.signInWebchatOptionsInputValue
 * props.uiData.signInWebchatOptionsSelect_onChange
 * props.uiData.signInWebchatOptionsInput_onChange
 */
export default props => {
  if (
    props.uiData.configurations.webchatOptions &&
    props.uiData.configurations.webchatOptions.length
  ) {
    const op = props.uiData.configurations.webchatOptions.find(
      (o, index) => index === props.uiData.signInWebchatOptionsSelectIndex,
    )

    const areaStyles =
      props.uiData.configurations.signInFormStyles
        ?.brSignInWebchatOptionsArea || {}
    const labelStyles =
      props.uiData.configurations.signInFormStyles
        ?.brSignInWebchatOptionsLabel || {}
    const selectStyles =
      props.uiData.configurations.signInFormStyles
        ?.brSignInWebchatOptionsSelect || {}
    const inputStyles =
      props.uiData.configurations.signInFormStyles
        ?.brSignInWebchatOptionsInput || {}

    if (props.uiData.configurations.webchatOptions.length < 2) {
      return null
    }

    return (
      <View
        style={[
          styles.brSignInWebchatOptionsArea,
          props.uiData.configurations.webchatOptions.length >= 2
            ? styles.brWebchatOptionsMandatory
            : styles.brWebchatOptionsFixed,
          areaStyles,
        ]}
      >
        <View style={styles.labelContainer}>
          <Text style={[styles.brSignInWebchatOptionsLabel, labelStyles]}>
            {props.uiData.configurations.webchatOptionsInnerHTML
              ? props.uiData.configurations.webchatOptionsInnerHTML.replace(
                  /<[^>]*>/g,
                  '',
                )
              : string(props.uiData.configurations.webchatOptionsLabel)}
          </Text>
          {props.uiData.configurations.webchatOptions.length >= 2 && (
            <Text style={styles.mandatoryIndicator}>*</Text>
          )}
        </View>

        <View style={styles.pickerContainer}>
          <Picker
            style={[styles.brSignInWebchatOptionsSelect, selectStyles]}
            selectedValue={props.uiData.signInWebchatOptionsSelectIndex}
            onValueChange={itemValue => {
              props.uiData.fire('signInWebchatOptionsSelect_onChange', {
                target: { value: itemValue },
              })
            }}
          >
            {props.uiData.configurations.webchatOptions.map((o, index) => (
              <Picker.Item
                key={index}
                label={
                  o.innerHTML
                    ? o.innerHTML.replace(/<[^>]*>/g, '')
                    : string(o.label)
                }
                value={index}
              />
            ))}
          </Picker>
        </View>

        {op && op.value && op.value.indexOf('{0}') !== -1 && (
          <TextInput
            style={[styles.brSignInWebchatOptionsInput, inputStyles]}
            value={props.uiData.signInWebchatOptionsInputValue}
            onChangeText={text => {
              props.uiData.fire('signInWebchatOptionsInput_onChange', {
                target: { value: text },
              })
            }}
          />
        )}
      </View>
    )
  } else {
    return null
  }
}

const styles = StyleSheet.create({
  brSignInWebchatOptionsArea: {
    width: 180,
    marginVertical: 8,
    marginHorizontal: 'auto',
    alignItems: 'center',
    backgroundColor: '#fff',
    alignSelf: 'center',
  },
  brWebchatOptionsFixed: {
    display: 'none',
  },
  brWebchatOptionsMandatory: {},
  labelContainer: {
    width: 180,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  brSignInWebchatOptionsLabel: {
    width: 180,
    fontSize: 16,
    color: '#333',
    textAlign: 'left',
    marginBottom: 8,
  },
  mandatoryIndicator: {
    color: '#bb7755',
    marginLeft: 2,
    fontSize: 16,
  },
  pickerContainer: {
    width: 180,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#fff',
    marginBottom: 10,
    ...Platform.select({
      ios: {
        height: 40,
      },
      android: {
        height: 50,
      },
    }),
  },
  brSignInWebchatOptionsSelect: {
    width: 180,
    ...Platform.select({
      ios: {
        height: 40,
      },
      android: {
        height: 50,
      },
    }),
  },
  brSignInWebchatOptionsInput: {
    width: 180,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    color: '#333',
    fontSize: 16,
  },
})
