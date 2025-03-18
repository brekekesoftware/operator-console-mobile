import React from 'react'
import { View, StyleSheet, TouchableOpacity, Button } from 'react-native'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import Dndable from './Dndable.js'
import FileDndable from './FileDndable.js'

/**
 * DndableSafe - React Native version
 * A wrapper component that provides safe drag and drop functionality
 *
 * props.uiData - UI data object
 * props.uiData.ownerDocument - Document object
 * props.uiData.uiDataId - UI data ID
 * props.dndableClass - Class name for the dndable component
 * props.style - Additional styles for the component
 * props.dragSourceInfo - Information about the drag source
 * props.onCheckCanDrop - Function to check if dropping is allowed
 * props.onDrop - Function called when item is dropped
 * props.onClick - Function called when item is clicked/pressed
 */
export default class DndableSafe extends React.Component {
  constructor(props) {
    super(props)

    // Check if we're in a React Native environment
    this.isReactNative = true

    this.state = {
      isDragOver: false,
    }
  }

  handleLegacyDragOver = ev => {
    // In React Native, we simulate dragOver with a state
    if (!this.state.isDragOver) {
      this.setState({ isDragOver: true })
    }

    // Prevent default behavior (equivalent to ev.preventDefault())
    return true
  }

  handleLegacyDrop = ev => {
    const props = this.props

    // Reset drag over state
    this.setState({ isDragOver: false })

    if (typeof props.onDrop === 'function') {
      props.onDrop(ev)
    }

    // Prevent default behavior (equivalent to ev.preventDefault())
    return true
  }

  handlePress = ev => {
    const props = this.props
    if (typeof props.onClick === 'function') {
      props.onClick(ev)
    }
  }

  // This method handles file selection directly
  handleFileSelect = async () => {
    // Only proceed if onDrop is provided
    if (typeof this.props.onDrop !== 'function') return

    try {
      // Use the FileDndable implementation to handle file selection
      const fileDndable = new FileDndable({})

      // Create a mock event with the necessary properties
      const mockEvent = {
        preventDefault: () => {},
        stopPropagation: () => {},
      }

      // Call the FileDndable's handlePress method to select files
      // and it will call our onDrop with the appropriate event object
      await fileDndable.handlePress({
        onDrop: this.props.onDrop,
        onClick: () => {}, // Empty function to prevent double click handling
      })
    } catch (error) {
      console.error('Error handling file selection:', error)
    }
  }

  render() {
    const props = this.props

    // Check if drag and drop is enabled
    const dndEnabled =
      props.uiData &&
      props.uiData.uiDataId &&
      global.reactNativeDndEnabled === props.uiData.uiDataId

    if (dndEnabled) {
      // Use the appropriate Dndable component
      if (props.dndableClass === 'FileDndable') {
        return (
          <FileDndable
            style={[styles.dndableSafe, props.style]}
            onDrop={props.onDrop}
            onClick={props.onClick}
          >
            {props.children}
          </FileDndable>
        )
      } else {
        return (
          <Dndable
            style={[styles.dndableSafe, props.style]}
            dragSourceInfo={props.dragSourceInfo}
            onCheckCanDrop={props.onCheckCanDrop}
            onDrop={props.onDrop}
            onClick={props.onClick}
          >
            {props.children}
          </Dndable>
        )
      }
    } else {
      // Fallback for when drag and drop is not enabled
      // In legacy mode, we still need to handle file drops
      return (
        <View style={[styles.dndableSafe, styles.legacy, props.style]}>
          <TouchableOpacity
            style={styles.touchableArea}
            onPress={this.handlePress}
          >
            {props.children}
          </TouchableOpacity>

          {/* Only show file selection button if onDrop is provided */}
          {props.onDrop && (
            <TouchableOpacity
              style={styles.dropZone}
              onPress={this.handleFileSelect}
            >
              {/* This is an invisible overlay that handles file drops */}
            </TouchableOpacity>
          )}
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  dndableSafe: {
    // Base styles for the component
  },
  legacy: {
    position: 'relative',
  },
  touchableArea: {
    width: '100%',
    height: '100%',
  },
  dropZone: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    // This overlay is invisible but captures touch events
    // for file selection when needed
  },
})
