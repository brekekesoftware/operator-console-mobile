import React from 'react'
import { View, StyleSheet } from 'react-native'
import WidgetBody from '../components/WidgetBody'
import PanelArea from '../components/PanelArea'
import { RnAudioPlayer } from '../components/RnAudioPlayer'

const sound = require('../sounds/bell.mp3')

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
          <RnAudioPlayer audioStyle={styles.brBellAudio} src={sound} />
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
