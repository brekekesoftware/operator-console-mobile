import uawMsgs from '../utilities/uawmsgs'
import ToolbarButton from './ToolbarButton'
import WidgetConstants from '../utilities/widgetconstants'
import { View } from 'react-native'

/**
 * SearchDialogButton
 * props.uiData
 * props.uiData.searchDialogButton_onClick
 * props.disabled
 */
export default props => {
  return (
    <View>
      <ToolbarButton
        iconSource={require('../images/searchdialog.png')}
        title={uawMsgs.LBL_SEARCH_DIALOG_BUTTON_TOOLTIP}
        clickableInterval={WidgetConstants.CLICKABLE_INTERVAL}
        disabled={props.disabled}
        onPress={props.uiData.fire.bind(
          props.uiData,
          'searchDialogButton_onClick',
          {},
        )}
      />
    </View>
  )
}
