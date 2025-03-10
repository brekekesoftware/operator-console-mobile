import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'

/**
 * Licensebar
 * props.uiData
 * props.uiData.configurations
 * props.uiData.licenseMessageAppx
 */
export default class extends React.Component {
  render() {
    const props = this.props
    return (
      <div
        className={
          'brLicensebar' +
          (props.uiData.configurations.licenseMessage ||
          props.uiData.licenseMessageAppx
            ? ''
            : ' brHidden')
        }
      >
        <span className='brLicensebarMessage'>
          {props.uiData.configurations.licenseMessage +
            ' ' +
            props.uiData.licenseMessageAppx}
        </span>
      </div>
    )
  }
}
