import React from 'react'
import { View, StyleSheet } from 'react-native'
import HistoryDetailArea from './HistoryDetailArea'

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
