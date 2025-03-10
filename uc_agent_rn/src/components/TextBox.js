import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'

/**
 * TextBox
 * props.className
 * props.value
 * props.disabled
 * props.hidden
 * props.type
 * props.placeholder
 * props.autoCapitalize
 * props.style
 * props.onChange
 * props.onBlur
 * props.onKeyDown
 */
export default class extends React.Component {
  render() {
    const props = this.props
    return (
      <input
        className={
          'brTextBox' +
          (props.hidden ? ' brHidden' : '') +
          (props.className ? ' ' + props.className : '')
        }
        value={props.value}
        disabled={props.disabled}
        type={props.type || 'text'}
        placeholder={props.placeholder || ''}
        autoCapitalize={props.autoCapitalize}
        style={props.style || {}}
        onChange={props.onChange}
        onBlur={props.onBlur}
        onKeyDown={props.onKeyDown}
      />
    )
  }
}
