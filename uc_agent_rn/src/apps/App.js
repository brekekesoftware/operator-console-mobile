import React from 'react'
import uawMsgs from '../1/uawmsgs.js'
import Constants from '../1/constants.js'
import { int, string } from '../1/strings.js'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import WidgetBody from '../components/WidgetBody.js'
import MainArea from '../components/MainArea.js'
import WebchatQueueButton from '../components/WebchatQueueButton.js'
import WebchatPickupButton from '../components/WebchatPickupButton.js'
import WebchatDropButton from '../components/WebchatDropButton.js'
import BuddylistButton from '../components/BuddylistButton.js'
import Toolbar from '../components/Toolbar.js'
import CURRENT_SCRIPT_URL from '../1/currentscript.js'
import { View } from 'react-native'

/**
 * App
 * props.uiData
 */
class App extends React.Component {
  render() {
    const props = this.props
    return (
      <View className='brUCAgentApp'>
        <WidgetBody uiData={props.uiData} modalOverlayClassName='brUCAgentApp'>
          <audio
            className='brBellAudio'
            src={CURRENT_SCRIPT_URL.DIR + '../../../sounds/bell.mp3'}
          ></audio>
          <MainArea className='brWithToolbar' uiData={props.uiData} />
          <Toolbar>
            <WebchatQueueButton uiData={props.uiData} disabled={false} />
            <WebchatPickupButton uiData={props.uiData} disabled={false} />
            <WebchatDropButton uiData={props.uiData} disabled={false} />
            <BuddylistButton uiData={props.uiData} disabled={false} />
          </Toolbar>
        </WidgetBody>
      </View>
    )
  }
}

export default DragDropContext(HTML5Backend)(App)
