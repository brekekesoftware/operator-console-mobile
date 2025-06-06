import uawMsgs from '../utilities/uawmsgs'
import SimpleButton from './SimpleButton'
import { Image } from 'react-native'

/**
 * PanelHeaderHideButton
 * props.uiData
 * props.uiData.panelHeaderHideButton_onClick
 * props.panelType
 * props.panelCode
 * props.disabled
 */
export default props => {
  return (
    <SimpleButton
      title={uawMsgs.LBL_PANEL_HEADER_HIDE_BUTTON_TOOLTIP}
      disabled={props.disabled}
      onPress={props.uiData.fire.bind(
        props.uiData,
        'panelHeaderHideButton_onClick',
        props.panelType,
        props.panelCode,
      )}
    >
      <Image source={require('../images/panelheaderhide.png')} />
    </SimpleButton>
  )
}
