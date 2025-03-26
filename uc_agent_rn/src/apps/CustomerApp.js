import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import WidgetBody from '../components/WidgetBody.js'
import CustomerMainArea from '../components/CustomerMainArea.js'
import { View } from 'react-native'

/**
 * CustomerApp
 * props.uiData
 */
class CustomerApp extends React.Component {
  render() {
    const props = this.props
    return (
      <View>
        <WidgetBody
          uiData={props.uiData}
          modalOverlayClassName='brUCCustomerApp'
        >
          <CustomerMainArea uiData={props.uiData} />
        </WidgetBody>
      </View>
    )
  }
}

export default CustomerApp
