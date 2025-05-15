import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import SimpleButton from './SimpleButton.js'
import { Image } from 'react-native'

/**
 * PanelHeaderUndockButton
 * props.uiData
 * props.uiData.panelHeaderUndockButton_onClick
 * props.panelType
 * props.panelCode
 * props.disabled
 */
export default props => {
  return (
    <SimpleButton
      title={uawMsgs.LBL_PANEL_HEADER_UNDOCK_BUTTON_TOOLTIP}
      disabled={props.disabled}
      onClick={props.uiData.fire.bind(
        props.uiData,
        'panelHeaderUndockButton_onClick',
        props.panelType,
        props.panelCode,
      )}
    >
      <Image source={require('../images/panelheaderundock.png')} />
    </SimpleButton>
  )
}
