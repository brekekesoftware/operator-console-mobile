import uawMsgs from '../utilities/uawmsgs'
import SimpleButton from './SimpleButton'
import { Image } from 'react-native'

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
      title={uawMsgs.LBL_PANEL_HEADER_HIDE_SUB_BUTTON_TOOLTIP}
      disabled={props.disabled}
      onClick={props.uiData.fire.bind(
        props.uiData,
        'panelHeaderHideSubButton_onClick',
        props.panelType,
        props.panelCode,
      )}
    >
      <Image source={require('../images/panelheaderhide.png')} />
    </SimpleButton>
  )
}
