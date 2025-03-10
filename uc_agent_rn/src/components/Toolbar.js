import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'

/**
 * Toolbar
 */
export default props => {
  return <div className='brToolbar'>{props.children}</div>
}
