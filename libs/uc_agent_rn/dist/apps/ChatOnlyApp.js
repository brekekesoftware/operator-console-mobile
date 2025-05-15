import React from 'react'
import ChatArea from '../components/ChatArea.js'
import { View } from 'react-native'

/**
 * ChatOnlyApp
 * props.uiData
 * props.panelType
 * props.panelCode
 */
class ChatOnlyApp extends React.Component {
  render() {
    const props = this.props
    return (
      <View>
        <ChatArea
          uiData={props.uiData}
          panelType={props.panelType}
          panelCode={props.panelCode}
          style={{ bottom: 0 }}
        />
      </View>
    )
  }
}

export default ChatOnlyApp
