import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ToolbarButton from './ToolbarButton.js'
import WidgetConstants from '../utilities/widgetconstants.js'
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
        onClick={props.uiData.fire.bind(
          props.uiData,
          'searchDialogButton_onClick',
          {},
        )}
      />
    </View>
  )
}
