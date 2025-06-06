import React from 'react'
import { TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { int, string } from '../utilities/strings'

const colors = {
  borderDefault: '#dcdcd5',
  borderActive: '#4bc5de',
  backgroundDefault: '#f8f8f6',
  backgroundHover: '#ffffff',
  backgroundActive: '#ccccc2',
  backgroundDisabled: '#deded8',
}

const styles = StyleSheet.create({
  simpleButton: {
    borderWidth: 1,
    borderColor: colors.borderDefault,
    backgroundColor: colors.backgroundDefault,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowOpacity: 0,
        shadowRadius: 0,
      },
      android: {
        elevation: 0,
      },
    }),
  },
  buttonPressed: {
    borderColor: colors.borderActive,
    backgroundColor: colors.backgroundActive,
    ...Platform.select({
      ios: {
        shadowColor: colors.borderActive,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  disabled: {
    borderColor: colors.borderDefault,
    backgroundColor: colors.backgroundDisabled,
    opacity: 0.33,
  },
})

/**
 * SimpleButton
 * props.style - Additional custom styles
 * props.title - Button tooltip/accessibility label
 * props.disabled - Disable button
 * props.onPress - Press handler
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isPressed: false,
    }
  }

  handlePressIn = () => {
    if (!this.props.disabled) {
      this.setState({ isPressed: true })
    }
  }

  handlePressOut = () => {
    this.setState({ isPressed: false })
  }

  handlePress = () => {
    const { props } = this
    if (!props.disabled && props.onPress) {
      props.onPress()
    }
  }

  render() {
    const { props, state } = this
    const buttonStyles = [
      styles.simpleButton,
      state.isPressed && !props.disabled && styles.buttonPressed,
      props.disabled && styles.disabled,
      props.style, // Additional custom styles
    ]

    return (
      <TouchableOpacity
        style={buttonStyles}
        disabled={props.disabled}
        accessibilityLabel={string(props.title)}
        accessibilityHint={string(props.title)}
        onPressIn={this.handlePressIn}
        onPressOut={this.handlePressOut}
        onPress={this.handlePress}
        activeOpacity={props.disabled ? 1 : 0.7}
      >
        {props.children}
      </TouchableOpacity>
    )
  }
}
