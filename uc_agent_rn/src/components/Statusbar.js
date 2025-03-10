import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ButtonIconic from './ButtonIconic.js'
import StatusIcon from './StatusIcon.js'

/**
 * Statusbar
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.runningAnimationTable
 * props.uiData.statusbarCloseButton_onClick
 */
export default class extends React.Component {
  render() {
    const props = this.props
    const signInStatus = props.uiData.ucUiStore.getSignInStatus()
    const statusMe = props.uiData.ucUiStore.getChatClient().getStatus()
    return (
      <div
        className={
          'brStatusbar' +
          (signInStatus === 3 &&
          (statusMe.status !== Constants.STATUS_AVAILABLE ||
            statusMe.display) &&
          props.uiData.runningAnimationTable['statusbar']
            ? ' brAnimation'
            : '')
        }
      >
        <span className='brStatusbarMessage'>
          <span className='brStatusbarMessageHeader'>
            {uawMsgs.MSG_STATUSBAR_MESSAGE_HEADER}
          </span>
          <span className='brStatusbarMessageStatusIconArea'>
            <StatusIcon
              className='brStatusbarMessageStatusIcon'
              status={statusMe.status}
            />
            <div className='brStatusbarMessageStatusChecked br_bi_icon_ook_svg' />
          </span>
          <span className='brStatusbarMessageStatusLabel'>
            {statusMe.status === Constants.STATUS_AVAILABLE
              ? uawMsgs.CMN_OWN_STATUS_STRING_AVAILABLE
              : statusMe.status === Constants.STATUS_OFFLINE
                ? uawMsgs.CMN_OWN_STATUS_STRING_INVISIBLE
                : statusMe.status === Constants.STATUS_BUSY
                  ? uawMsgs.CMN_OWN_STATUS_STRING_BUSY
                  : ''}
          </span>
          <span className='brStatusbarMessageStatusDisplay'>
            {statusMe.display}
          </span>
        </span>
        <ButtonIconic
          className='brStatusbarCloseButton br_bi_icon_close_svg'
          title={uawMsgs.CMN_CLOSE}
          onClick={props.uiData.fire.bind(
            props.uiData,
            'statusbarCloseButton_onClick',
          )}
        ></ButtonIconic>
      </div>
    )
  }
}
