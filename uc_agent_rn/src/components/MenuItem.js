import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'

/**
 * MenuItem
 * props.className
 * props.disabled
 * props.hidden
 * props.dropDown
 * props.style
 * props.onClick
 */
export default class extends React.Component {
  handleClick(ev) {
    const props = this.props
    if (!props.disabled) {
      if (typeof props.onClick === 'function') {
        props.onClick(ev)
      }
    }
  }
  render() {
    const props = this.props
    let title = ''
    if (typeof props.children === 'string') {
      title = props.children
    } else if (
      props.children &&
      props.children.props &&
      typeof props.children.props.children === 'string'
    ) {
      title = props.children.props.children
    } else if (props.children && typeof props.children.forEach === 'function') {
      props.children.forEach(child => {
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
    return (
      <div
        className={
          'brMenuItem' +
          (props.disabled ? ' brDisabled' : '') +
          (props.hidden ? ' brHidden' : '') +
          (props.dropDown ? ' brDropDown' : '') +
          (props.className ? ' ' + props.className : '')
        }
        style={props.style || {}}
        title={title}
        onClick={this.handleClick.bind(this)}
      >
        {props.children}
      </div>
    )
  }
}
