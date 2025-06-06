import { View, ScrollView, StyleSheet } from 'react-native'
import WebchatQueueTable from './WebchatQueueTable'

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
