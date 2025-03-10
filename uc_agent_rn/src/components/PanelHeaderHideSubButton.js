import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import SimpleButton from './SimpleButton.js'

/**
 * PanelHeaderHideSubButton
 * props.uiData
 * props.uiData.panelHeaderHideSubButton_onClick
 * props.panelType
 * props.panelCode
 * props.disabled
 */
export default props => {
  return (
    <SimpleButton
      className='brPanelHeaderHideSubButton'
      title={uawMsgs.LBL_PANEL_HEADER_HIDE_SUB_BUTTON_TOOLTIP}
      disabled={props.disabled}
      onClick={props.uiData.fire.bind(
        props.uiData,
        'panelHeaderHideSubButton_onClick',
        props.panelType,
        props.panelCode,
      )}
    ></SimpleButton>
  )
}
