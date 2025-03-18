import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'

/**
 * Licensebar - React Native version
 * A component that displays license information
 *
 * props.uiData - UI data object
 * props.uiData.configurations - Configuration properties
 * props.uiData.licenseMessageAppx - Additional license message
 */
export default class Licensebar extends React.Component {
  render() {
    const props = this.props

    const isHidden = !(
      props.uiData.configurations.licenseMessage ||
      props.uiData.licenseMessageAppx
    )

    if (isHidden) {
      return null
    }

    return (
      <View style={styles.licensebar}>
        <Text
          style={styles.licensebarMessage}
          numberOfLines={2}
          ellipsizeMode='tail'
        >
          {props.uiData.configurations.licenseMessage +
            ' ' +
            props.uiData.licenseMessageAppx}
        </Text>
      </View>
    )
  }
}

const colors = {
  white: '#FFFFFF',
  platinum: '#E5E5E5',
  portlandOrange: '#FF5A5F',
}

const styles = StyleSheet.create({
  licensebar: {
    width: 240,
    height: 48,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: colors.white,
    shadowColor: colors.platinum,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    pointerEvents: 'none',
    opacity: 0.5,
  },
  licensebarMessage: {
    position: 'absolute',
    left: 24,
    right: 200,
    top: '50%',
    transform: [{ translateY: -8 }],
    color: colors.portlandOrange,
    fontSize: (13 / 16) * 16,
    lineHeight: 1.6 * ((13 / 16) * 16),
    letterSpacing: (0.3 / 16) * 16,
  },
})
