import { View, Text, StyleSheet } from 'react-native'
import uawMsgs from '../utilities/uawmsgs'
import { string } from '../utilities/strings'

/**
 * CustomerSignInError - React Native version
 * A component that displays sign-in error messages
 *
 * props.uiData - UI data object
 * props.uiData.ucUiStore - UI store
 * props.uiData.configurations - Configuration properties
 */
export default props => {
  const errorMessage = string(props.uiData.ucUiStore.getSignInErrorMessage())

  const hasErrorMessage = errorMessage.length > 0
  const hasSignInFailed = props.uiData.ucUiStore.isSignInFailed()
  const isErrorReenterConf = props.uiData.ucUiStore.isErrorReenterConf()

  const showErrorArea =
    hasErrorMessage || (hasSignInFailed && !isErrorReenterConf)

  if (!showErrorArea) {
    return null
  }

  const customStyle =
    props.uiData.configurations.signInFormStyles &&
    props.uiData.configurations.signInFormStyles.brSignInErrorArea

  const customMessageStyle =
    props.uiData.configurations.signInFormStyles &&
    props.uiData.configurations.signInFormStyles.brSignInErrorMessage

  return (
    <View
      style={[
        styles.signInErrorArea,
        hasErrorMessage && styles.withErrorMessage,
        hasSignInFailed && styles.signInFailed,
        hasSignInFailed && isErrorReenterConf && styles.errorReenterConf,
        customStyle,
      ]}
    >
      <Text style={[styles.signInErrorMessage, customMessageStyle]}>
        {errorMessage || uawMsgs.MSG_SIGN_IN_FAILED}
      </Text>
    </View>
  )
}

const colors = {
  errorBorder: '#bb7755',
  errorText: '#bb7755',
}

const styles = StyleSheet.create({
  signInErrorArea: {
    margin: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  withErrorMessage: {},
  signInFailed: {},
  errorReenterConf: {},
  signInErrorMessage: {
    borderWidth: 1,
    borderColor: colors.errorBorder,
    color: colors.errorText,
    marginHorizontal: 8,
    paddingVertical: 3,
    paddingHorizontal: 8,
    fontWeight: 'bold',
  },
})
