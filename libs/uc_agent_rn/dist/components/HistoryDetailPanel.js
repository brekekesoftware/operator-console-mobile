import React from 'react'
import { View, StyleSheet } from 'react-native'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import HistoryDetailArea from './HistoryDetailArea.js'

/**
 * HistoryDetailPanel - React Native version
 * A panel component for displaying history details
 *
 * props.uiData - UI data object
 * props.panelType - Type of panel
 * props.panelCode - Code for panel identification
 */
export default class HistoryDetailPanel extends React.Component {
  render() {
    const props = this.props

    return (
      <View style={styles.historyDetailPanel}>
        <HistoryDetailArea
          style={styles.historyDetailArea}
          uiData={props.uiData}
          panelType={props.panelType}
          panelCode={props.panelCode}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  historyDetailPanel: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  historyDetailArea: {
    maxHeight: '100%',
    height: '100%',
    padding: 4,
  },
})
