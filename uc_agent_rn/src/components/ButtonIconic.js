import React from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'

/**
 * ButtonIconic
 * props.style - Additional style for the button
 * props.disabled
 * props.hidden
 * props.title
 * props.onPress - Renamed from onClick for React Native
 */
export default class extends React.Component {
  handlePress = () => {
    const props = this.props
    if (!props.disabled && typeof props.onPress === 'function') {
      props.onPress()
    }
  }

  render() {
    const props = this.props

    if (props.hidden) {
      return null // Equivalent to display: none
    }

    return (
      <TouchableOpacity
        style={[
          styles.brButtonIconic,
          props.disabled && styles.brDisabled,
          props.style,
        ]}
        activeOpacity={props.disabled ? 1 : 0.7}
        onPress={this.handlePress}
        disabled={props.disabled}
        accessibilityLabel={props.title}
      >
        <View style={styles.iconContainer}>{props.children}</View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  brButtonIconic: {
    width: 32,
    height: 32,
    backgroundColor: 'transparent',
    borderRadius: 16, // 50% of width/height
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // Ensures content stays within border radius
  },
  iconContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  // Note: hover state is simulated by TouchableOpacity's activeOpacity
  brDisabled: {
    opacity: 0, // Equivalent to visibility: hidden
  },
  // Active state styles - applied via pressable state
  pressed: {
    backgroundColor: 'rgba(245, 245, 245, 0.8)', // @isabelline_tp
    borderWidth: 1,
    borderColor: '#E5E5E5', // @platinum
  },
})
