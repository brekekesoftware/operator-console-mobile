import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'

/**
 * ToolbarButton
 * props.className
 * props.iconClassName
 * props.title
 * props.clickableInterval
 * props.disabled
 * props.dropDown
 * props.onClick
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clickTime: 0,
    }
  }
  handleClick(ev) {
    const props = this.props
    if (!props.disabled && props.onClick) {
      const now = +new Date()
      if (
        !props.clickableInterval ||
        this.state.clickTime + int(props.clickableInterval) < now
      ) {
        this.setState({ clickTime: now })
        props.onClick(ev)
      }
    }
  }
  render() {
    const props = this.props
    const className =
      'brToolbarButton' +
      (props.dropDown ? ' brToolbarDropDownButton' : '') +
      (props.disabled ? ' brDisabled' : '') +
      (props.className ? ' ' + props.className : '')
    const iconClassName =
      'brIcon' + (props.iconClassName ? ' ' + props.iconClassName : '')
    return (
      <span
        className={className}
        title={string(props.title)}
        onClick={this.handleClick.bind(this)}
      >
        <span className={iconClassName}></span>
        <span className='brArrowButtonInner'></span>
      </span>
    )
  }
}
