import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import SimpleButton from './SimpleButton.js'

/**
 * PanelHeaderRejoinButton
 * props.uiData
 * props.uiData.panelHeaderRejoinButton_onClick
 * props.panelType
 * props.panelCode
 * props.disabled
 */
export default props => {
  return (
    <SimpleButton
      className='brPanelHeaderRejoinButton'
      title={uawMsgs.LBL_PANEL_HEADER_REJOIN_BUTTON_TOOLTIP}
      disabled={props.disabled}
      onClick={props.uiData.fire.bind(
        props.uiData,
        'panelHeaderRejoinButton_onClick',
        props.panelType,
        props.panelCode,
      )}
    ></SimpleButton>
  )
}
