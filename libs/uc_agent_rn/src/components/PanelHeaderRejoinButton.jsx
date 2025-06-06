import uawMsgs from '../utilities/uawmsgs.js'
import SimpleButton from './SimpleButton'
import { Image } from 'react-native'

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
      title={uawMsgs.LBL_PANEL_HEADER_REJOIN_BUTTON_TOOLTIP}
      disabled={props.disabled}
      onClick={props.uiData.fire.bind(
        props.uiData,
        'panelHeaderRejoinButton_onClick',
        props.panelType,
        props.panelCode,
      )}
    >
      <Image source={require('../images/panelheaderrejoin.png')} />
    </SimpleButton>
  )
}
