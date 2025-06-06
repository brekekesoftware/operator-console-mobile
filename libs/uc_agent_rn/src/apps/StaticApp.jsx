import React from 'react'
import ChatPanel from '../components/ChatPanel'
import { View } from 'react-native'

/**
 * StaticApp
 * props.uiData
 * props.panelType
 * props.panelCode
 */
class StaticApp extends React.Component {
  render() {
    const props = this.props
    return (
      <View>
        <ChatPanel
          uiData={props.uiData}
          panelType={props.panelType}
          panelCode={props.panelCode}
        />
      </View>
    )
  }
}

export default StaticApp
