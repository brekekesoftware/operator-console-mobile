import React from 'react'
import {
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Platform,
} from 'react-native'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'

const styles = StyleSheet.create({
  toolbarButton: {
    width: 42,
    height: 38,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#c0c0c0',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0,
        shadowRadius: 4,
      },
      android: {
        elevation: 0,
      },
    }),
  },
  toolbarButtonActive: {
    borderColor: '#dcdcd5',
    backgroundColor: '#f0f0f0',
    ...Platform.select({
      ios: {
        shadowOpacity: 0.5,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  toolbarButtonHover: {
    borderColor: '#dcdcd5',
    backgroundColor: 'white',
  },
  disabled: {
    opacity: 0.33,
  },
  icon: {
    width: 40,
    height: 36,
    resizeMode: 'contain',
  },
  dropDownButton: {
    width: 57,
  },
  arrowButtonInner: {
    width: 15,
    height: 15,
    position: 'absolute',
    right: 0,
    display: 'none', // Initially hidden
  },
  arrowButtonInnerVisible: {
    display: 'flex', // Show when dropdown
  },
})

/**
 * ToolbarButton
 * props.style - Additional styles
 * props.iconSource - Image source for the icon
 * props.title - Button tooltip
 * props.clickableInterval - Minimum time between clicks
 * props.disabled - Disable button
 * props.dropDown - Show dropdown arrow
 * props.onPress - Press handler
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clickTime: 0,
      isPressed: false,
    }
  }

  handlePress = () => {
    const { props } = this
    if (!props.disabled && props.onPress) {
      const now = +new Date()
      if (
        !props.clickableInterval ||
        this.state.clickTime + int(props.clickableInterval) < now
      ) {
        this.setState({ clickTime: now })
        props.onPress()
      }
    }
  }

  handlePressIn = () => {
    this.setState({ isPressed: true })
  }

  handlePressOut = () => {
    this.setState({ isPressed: false })
  }

  render() {
    const { props, state } = this
    const buttonStyles = [
      styles.toolbarButton,
      props.dropDown && styles.dropDownButton,
      state.isPressed && styles.toolbarButtonActive,
      props.disabled && styles.disabled,
      props.style, // Additional custom styles
    ]

    const arrowStyles = [
      styles.arrowButtonInner,
      props.dropDown && styles.arrowButtonInnerVisible,
    ]

    return (
      <TouchableOpacity
        style={buttonStyles}
        onPress={this.handlePress}
        onPressIn={this.handlePressIn}
        onPressOut={this.handlePressOut}
        disabled={props.disabled}
        activeOpacity={props.disabled ? 1 : 0.7}
      >
        {props.iconSource && (
          <Image source={props.iconSource} style={styles.icon} />
        )}
        {props.dropDown && (
          <Image
            source={require('../images/buttonArrows.png')}
            style={arrowStyles}
          />
        )}
      </TouchableOpacity>
    )
  }
}
