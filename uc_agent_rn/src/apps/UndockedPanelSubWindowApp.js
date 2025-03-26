import React from 'react'
import { View, StyleSheet } from 'react-native'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import WidgetBody from '../components/WidgetBody.js'
import PanelArea from '../components/PanelArea.js'
import CURRENT_SCRIPT_URL from '../utilities/currentscript.js'
import { RnAudioPlayer } from '../components/RnAudioPlayer.js'

/**
 * UndockedPanelSubWindowApp
 * props.uiData
 * props.panelType
 * props.panelCode
 */
class UndockedPanelSubWindowApp extends React.Component {
  render() {
    const { uiData, panelType, panelCode } = this.props

    return (
      <View style={[styles.brUCAgentApp, styles.brUndockedPanelSubWindowApp]}>
        <WidgetBody uiData={uiData} modalOverlayStyle={styles.brUCAgentApp}>
          <RnAudioPlayer
            audioStyle={styles.brBellAudio}
            src={CURRENT_SCRIPT_URL.DIR + '../../../sounds/bell.mp3'}
          />
          <PanelArea
            uiData={uiData}
            panelType={panelType}
            panelCode={panelCode}
          />
        </WidgetBody>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  brUCAgentApp: {
    flex: 1,
    backgroundColor: 'white',
  },
  brUndockedPanelSubWindowApp: {
    flex: 1,
  },
  brBellAudio: {
    // Audio styling if needed
  },
})

export default UndockedPanelSubWindowApp
