import React from 'react'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'

/*
 * props.style - Additional styles for the component
 * props.textStyle - Additional styles for the text
 * props.disabled - Whether the menu item is disabled
 * props.hidden - Whether the menu item is hidden
 * props.dropDown - Whether the menu item is in a dropdown
 * props.onPress - Function called when the item is pressed
 */
export default class MenuItem extends React.Component {
  handlePress = () => {
    const { disabled, onPress } = this.props

    if (!disabled && typeof onPress === 'function') {
      onPress()
    }
  }

  extractTitle() {
    const { children } = this.props
    let title = ''

    if (typeof children === 'string') {
      title = children
    } else if (
      children &&
      children.props &&
      typeof children.props.children === 'string'
    ) {
      title = children.props.children
    } else if (children && typeof children.forEach === 'function') {
      children.forEach(child => {
        if (typeof child === 'string' && child) {
          title = child
        } else if (
          child &&
          child.props &&
          typeof child.props.children === 'string' &&
          child.props.children
        ) {
          title = child.props.children
        }
      })
    }

    return title
  }

  render() {
    const { children, style, textStyle, disabled, hidden, dropDown } =
      this.props

    if (hidden) {
      return null
    }

    const containerStyles = [
      styles.menuItem,
      disabled && styles.disabled,
      dropDown && styles.dropDown,
      style,
    ]
    // console.log('#Duy Phan console disabled',disabled)

    return (
      <TouchableOpacity
        style={containerStyles}
        onPress={this.handlePress}
        // activeOpacity={!disabled ? 1 : 0.7}
        // activeOpacity={0}
        disabled={disabled}
        accessibilityLabel={this.extractTitle()}
      >
        {typeof children === 'string' ? <Text>{children}</Text> : children}
      </TouchableOpacity>
    )
  }
}

const colors = {
  white: '#FFFFFF',
  isabelline: '#EEEEEE',
  darkGray: '#9E9E9E',
  darkJungleGreen: '#212121',
}

const styles = StyleSheet.create({
  menuItem: {
    padding: 10,
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0.3 * (16 / 16),
    color: colors.darkJungleGreen,
  },
  disabled: {
    color: colors.darkGray,
    opacity: 0.7,
  },
  dropDown: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  pressed: {
    backgroundColor: colors.isabelline,
  },
  disabledPressed: {
    backgroundColor: colors.white,
  },
})
