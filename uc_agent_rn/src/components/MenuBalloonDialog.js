import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'

/**
 * MenuBalloonDialog
 * props.showing
 * props.className
 * props.style
 * props.onClick
 */
export default class extends React.Component {
  handleClick(ev) {
    const props = this.props
    if (typeof props.onClick === 'function') {
      props.onClick(ev)
    }
    if (
      ev &&
      !(
        ev.target &&
        ev.target.matches &&
        ev.target.matches('.brMenuItem,.brMenuItem *')
      )
    ) {
      ev.stopPropagation()
    }
  }
  render() {
    const props = this.props
    return (
      <div
        className={
          'brMenuBalloonDialog' +
          (props.showing ? '' : ' brHidden') +
          (props.className ? ' ' + props.className : '')
        }
        style={props.style || {}}
        onClick={this.handleClick.bind(this)}
      >
        {props.children}
      </div>
    )
  }
}
