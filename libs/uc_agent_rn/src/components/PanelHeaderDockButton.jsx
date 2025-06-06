import uawMsgs from '../utilities/uawmsgs'
import SimpleButton from './SimpleButton'
import { Image } from 'react-native'

/**
 * PanelHeaderDockButton
 * props.uiData
 * props.uiData.panelHeaderDockButton_onClick
 * props.panelType
 * props.panelCode
 * props.disabled
 */
export default props => {
  return (
    <SimpleButton
      title={uawMsgs.LBL_PANEL_HEADER_DOCK_BUTTON_TOOLTIP}
      disabled={props.disabled}
      onClick={props.uiData.fire.bind(
        props.uiData,
        'panelHeaderDockButton_onClick',
        props.panelType,
        props.panelCode,
      )}
    >
      <Image source={require('../images/panelheaderdock.png')} />
    </SimpleButton>
  )
}
