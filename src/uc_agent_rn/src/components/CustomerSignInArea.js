import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import CustomerSignInError from './CustomerSignInError.js'
import CustomerSignInProfinfoInputs from './CustomerSignInProfinfoInputs.js'
import CustomerSignInWebchatOptionsSelect from './CustomerSignInWebchatOptionsSelect.js'
import { LinearGradient } from 'react-native-linear-gradient'

/**
 * CustomerSignInArea - React Native version
 * A component for user sign-in area
 *
 * props.uiData - UI data object
 * props.uiData.ucUiStore - UI store
 * props.uiData.configurations - Configuration properties
 * props.uiData.signInButton_onClick - Sign-in button click handler
 */
export default props => {
  const isAutoSigning =
    props.uiData.configurations.autoSignIn &&
    props.uiData.ucUiStore.getSignInStatus() === 2

  if (isAutoSigning) {
    return null
  }

  const customSignInAreaStyle =
    props.uiData.configurations.signInFormStyles &&
    props.uiData.configurations.signInFormStyles.brSignInArea

  const customFormAreaStyle =
    props.uiData.configurations.signInFormStyles &&
    props.uiData.configurations.signInFormStyles.brSignInFormArea

  const customButtonStyle =
    props.uiData.configurations.signInFormStyles &&
    props.uiData.configurations.signInFormStyles.brSignInButton

  const handleSignIn = () => {
    props.uiData.fire('signInButton_onClick')
  }

  let buttonContent
  if (props.uiData.configurations.signInButtonInnerHTML) {
    // TODO: Add HTML support
    buttonContent = props.uiData.configurations.signInButtonInnerHTML.replace(
      /<[^>]*>/g,
      '',
    ) // Remove HTML tags for basic support
  } else {
    buttonContent =
      props.uiData.configurations.signInButtonLabel ||
      uawMsgs.LBL_SIGN_IN_BUTTON
  }

  return (
    <ScrollView
      style={[styles.signInArea, customSignInAreaStyle]}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={[styles.signInFormArea, customFormAreaStyle]}>
        <CustomerSignInError uiData={props.uiData} />
        <CustomerSignInProfinfoInputs uiData={props.uiData} />
        <CustomerSignInWebchatOptionsSelect uiData={props.uiData} />

        <TouchableOpacity
          style={[styles.buttonContainer, customButtonStyle]}
          onPress={handleSignIn}
          disabled={props.uiData.ucUiStore.getSignInStatus() === 2}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={[
              'rgba(255,255,255,0.35)',
              'rgba(255,255,255,0.25)',
              'rgba(255,255,255,0.1)',
            ]}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>{buttonContent}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const colors = {
  white: '#FFFFFF',
  buttonBorder: '#5fac3f',
  buttonBackground: '#6dbd4c',
  buttonHover: '#7bc85c',
  buttonActive: '#5aa63b',
}

const styles = StyleSheet.create({
  signInArea: {
    position: 'absolute',
    padding: 4,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.white,
  },
  scrollContent: {
    flexGrow: 1,
  },
  signInFormArea: {
    marginTop: 60,
  },
  buttonContainer: {
    alignSelf: 'center',
    width: 180,
    marginTop: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.buttonBorder,
    borderRadius: 1,
    overflow: 'hidden',
  },
  buttonGradient: {
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
  },
})
