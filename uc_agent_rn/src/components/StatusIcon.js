import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'

/**
 * StatusIcon
 * props.className
 * props.status
 * props.degree
 */
export default props => {
  return (
    <span
      className={
        'brStatusIcon brIconStatus' +
        int(props.status) +
        (props.className ? ' ' + props.className : '')
      }
      style={
        props.degree && props.status
          ? {
              backgroundImage:
                'conic-gradient(white ' +
                props.degree +
                'deg, transparent ' +
                props.degree +
                'deg)',
            }
          : {}
      }
    ></span>
  )
}
