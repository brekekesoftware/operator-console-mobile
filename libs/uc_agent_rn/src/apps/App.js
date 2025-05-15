import React from 'react'
import WidgetBody from '../components/WidgetBody.js'
import MainArea from '../components/MainArea.js'
import WebchatQueueButton from '../components/WebchatQueueButton.js'
import WebchatPickupButton from '../components/WebchatPickupButton.js'
import WebchatDropButton from '../components/WebchatDropButton.js'
import BuddylistButton from '../components/BuddylistButton.js'
import Toolbar from '../components/Toolbar.js'
import CURRENT_SCRIPT_URL from '../utilities/currentscript.js'
import { View } from 'react-native'
import { RnAudioPlayer } from '../components/RnAudioPlayer.js'

const sound = require('../sounds/bell.mp3')

/**
 * App
 * props.uiData
 */
class App extends React.Component {
  render() {
    const props = this.props
    return (
      <View style={{ flex: 1 }}>
        <WidgetBody uiData={props.uiData} modalOverlayClassName='brUCAgentApp'>
          <RnAudioPlayer source={sound} />
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

export default App
