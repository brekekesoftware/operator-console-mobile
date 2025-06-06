import React from 'react'
import WidgetBody from '../components/WidgetBody'
import MainArea from '../components/MainArea'
import WebchatQueueButton from '../components/WebchatQueueButton'
import WebchatPickupButton from '../components/WebchatPickupButton'
import WebchatDropButton from '../components/WebchatDropButton'
import BuddylistButton from '../components/BuddylistButton'
import Toolbar from '../components/Toolbar'
import { View } from 'react-native'
import { RnAudioPlayer } from '../components/RnAudioPlayer'

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
