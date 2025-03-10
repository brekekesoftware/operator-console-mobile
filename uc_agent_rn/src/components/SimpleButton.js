import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'

/**
 * SimpleButton
 * props.className
 * props.title
 * props.disabled
 * props.onClick
 */
export default class extends React.Component {
  handleClick(ev) {
    const props = this.props
    if (!props.disabled && props.onClick) {
      props.onClick(ev)
    }
  }
  render() {
    const props = this.props
    const className =
      'brSimpleButton' +
      (props.disabled ? ' brDisabled' : '') +
      (props.className ? ' ' + props.className : '')
    return (
      <button
        className={className}
        title={string(props.title)}
        disabled={Boolean(props.disabled)}
        onClick={this.handleClick.bind(this)}
      ></button>
    )
  }
}
