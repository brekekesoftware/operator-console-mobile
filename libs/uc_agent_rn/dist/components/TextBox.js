import React from 'react'
import { TextInput, StyleSheet, Platform, Keyboard } from 'react-native'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'

// Define colors based on variables from CSS
const colors = {
  platinum: '#dcdcd5',
  mediumTurquoise: '#40E0D0',
  darkJungleGreen: '#1A1A1A',
  darkGray: '#A9A9A9',
  whiteSmoke: '#F5F5F5',
}

const styles = StyleSheet.create({
  textBox: {
    width: 200,
    height: 35,
    paddingLeft: 12,
    borderWidth: 1,
    borderColor: colors.platinum,
    borderRadius: 4,
    fontSize: 13,
    fontWeight: '400',
    letterSpacing: 0.3,
    color: colors.darkJungleGreen,
    ...Platform.select({
      ios: {
        fontFamily: 'System',
      },
      android: {
        fontFamily: 'Roboto',
      },
      web: {
        fontFamily: 'inherit',
      },
    }),
  },
  textBoxFocused: {
    borderColor: colors.mediumTurquoise,
    ...Platform.select({
      ios: {
        shadowColor: colors.mediumTurquoise,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
      },
      android: {
        // elevation: 2,
        borderWidth: 2,
      },
    }),
  },
  textBoxDisabled: {
    color: colors.darkGray,
    backgroundColor: colors.whiteSmoke,
  },
  hidden: {
    display: 'none',
  },
})

/**
 * TextBox
 * props.style - Additional custom styles
 * props.value - Input value
 * props.disabled - Disable input
 * props.hidden - Hide input
 * props.type - Input type (only for web)
 * props.placeholder - Placeholder text
 * props.autoCapitalize - Auto capitalize behavior
 * props.onChangeText - Text change handler
 * props.onBlur - Blur handler
 * props.onKeyPress - Key press handler
 */
class TextBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFocused: false,
    }
  }

  handleFocus = () => {
    this.setState({ isFocused: true })
  }

  handleBlur = event => {
    console.log('TextBox onBlur triggered')
    this.setState({ isFocused: false })
    if (this.props.onBlur) {
      this.props.onBlur(event)
    }
  }

  handleKeyPress = event => {
    if (this.props.onKeyDown) {
      // Convert React Native key event to web format
      const webEvent = {
        key: event.nativeEvent.key,
        keyCode: event.nativeEvent.keyCode,
        shiftKey: false, // Add if needed
        preventDefault: () => {},
        stopPropagation: () => {},
      }
      this.props.onKeyDown(webEvent)
    }
  }

  focus() {
    if (this.input) {
      this.input.focus()
    }
  }

  clear() {
    if (this.input) {
      this.input.clear()
    }
  }

  render() {
    const { props, state } = this
    const inputStyles = [
      styles.textBox,
      state.isFocused && styles.textBoxFocused,
      props.disabled && styles.textBoxDisabled,
      props.hidden && styles.hidden,
      props.style,
    ]

    // Handle web-specific props
    const webProps = Platform.select({
      web: {
        type: props.type || 'text',
      },
      default: {},
    })

    return (
      <TextInput
        ref={input => (this.input = input)}
        style={inputStyles}
        value={props.value}
        editable={!props.disabled}
        placeholder={props.placeholder || ''}
        autoCapitalize={props.autoCapitalize || 'none'}
        onChangeText={
          props.onChange
            ? text => props.onChange({ target: { value: text } })
            : undefined
        }
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyPress={this.handleKeyPress}
        blurOnSubmit={false}
        onEndEditing={() => {
          Keyboard.dismiss()
          // this.handleBlur()
        }}
        {...webProps}
      />
    )
  }
}

export default React.forwardRef((props, ref) => {
  return <TextBox {...props} ref={ref} />
})
