import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import WebchatQueueTable from './WebchatQueueTable.js'

const styles = StyleSheet.create({
  webchatQueuePanel: {
    width: '100%',
    height: '100%',
  },
  scrollView: {
    flex: 1,
  },
})

/**
 * WebchatQueuePanel
 * props.uiData - UI data for the webchat queue
 */
export default function WebchatQueuePanel(props) {
  return (
    <View style={styles.webchatQueuePanel}>
      <ScrollView
        style={styles.scrollView}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={true}
      >
        <WebchatQueueTable
          uiData={props.uiData}
          bigStyle={true}
          resizerName='webchatQueuePanel'
        />
      </ScrollView>
    </View>
  )
}
