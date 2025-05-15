import React from 'react'
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
