import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
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

export default DragDropContext(HTML5Backend)(ChatOnlyApp)
