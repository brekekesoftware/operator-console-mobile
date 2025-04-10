import React from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native'
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
 * props.iconSource - Icon source
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
      return null
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
        accessibilityLabel={props.accessibilityLabel}
      >
        <View style={styles.iconContainer}>
          {props.children || props.iconSource}
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  brButtonIconic: {
    width: 32,
    height: 32,
    backgroundColor: 'transparent',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  iconContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  brDisabled: {
    opacity: 0,
  },
  pressed: {
    backgroundColor: 'rgba(245, 245, 245, 0.8)', // @isabelline_tp
    borderWidth: 1,
    borderColor: '#E5E5E5', // @platinum
  },
})
