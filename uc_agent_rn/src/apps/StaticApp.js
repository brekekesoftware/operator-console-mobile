import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import ChatPanel from '../components/ChatPanel.js'
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

export default DragDropContext(HTML5Backend)(StaticApp)
