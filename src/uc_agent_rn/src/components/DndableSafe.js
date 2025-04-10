import React from 'react'
import { View, StyleSheet, TouchableOpacity, Button } from 'react-native'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import Dndable from './Dndable.js'
import FileDndable from './FileDndable.js'
import { PanResponder } from 'react-native'

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
      isDragging: false,
      isOver: false,
    }

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: this.handleDragStart,
      onPanResponderMove: this.handleDragMove,
      onPanResponderRelease: this.handleDragEnd,
      onPanResponderTerminate: this.handleDragEnd,
    })
  }

  handleDragStart = (e, gestureState) => {
    const { dragSourceInfo } = this.props
    this.setState({ isDragging: true })

    // Notify parent of drag start
    if (this.props.onDragStart) {
      this.props.onDragStart({
        dragSourceInfo,
      })
    }
  }

  handleDragMove = (e, gestureState) => {
    if (this.props.onDragOver) {
      this.props.onDragOver({
        dragSourceInfo: this.props.dragSourceInfo,
      })
    }
  }

  handleDragEnd = (e, gestureState) => {
    const { onDrop, onCheckCanDrop, dragSourceInfo } = this.props

    this.setState({ isDragging: false })

    if (onCheckCanDrop) {
      const canDrop = onCheckCanDrop({
        dragSourceInfo,
      })

      if (canDrop && onDrop) {
        onDrop({
          dragSourceInfo,
        })
      }
    }
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
    const { isDragging, isOver } = this.state

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
            style={[
              styles.dndableSafe,
              props.style,
              isDragging && styles.dragging,
              isOver && styles.over,
              props.canDrop && styles.canDrop,
            ]}
            onDrop={props.onDrop}
            onClick={props.onClick}
            {...this.panResponder.panHandlers}
          >
            {props.children}
          </FileDndable>
        )
      } else {
        return (
          <Dndable
            style={[
              styles.dndableSafe,
              props.style,
              isDragging && styles.dragging,
              isOver && styles.over,
              props.canDrop && styles.canDrop,
            ]}
            dragSourceInfo={props.dragSourceInfo}
            onCheckCanDrop={props.onCheckCanDrop}
            onDrop={props.onDrop}
            onClick={props.onClick}
            {...this.panResponder.panHandlers}
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
  dndableSafe: {},
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
  },
  dragging: {
    opacity: 0.5,
  },
  over: {
    backgroundColor: '#f0f0f0',
  },
  canDrop: {
    borderWidth: 2,
    borderColor: '#40E0D0', // @medium_turquoise
  },
  brBuddylistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  // TODO: Remove this if not use
  brWithColor: {},
  brWithIcon: {},
  brCallStatus: {},
  brConferenceStatus: {},
  brConferenceStatusWebchat: {},
  brSelected: {
    backgroundColor: '#eeeeee',
  },
  brOffline: {
    opacity: 0.5,
  },
  brBuddylistItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brCallStatusIcon: {
    width: 16,
    height: 16,
    marginHorizontal: 4,
  },
  brConferenceStatusIcon: {
    width: 16,
    height: 16,
    marginHorizontal: 4,
  },
  brConferenceStatusWebchatIcon: {
    width: 16,
    height: 16,
    marginHorizontal: 4,
  },
  brBuddylistItemInfo: {
    fontSize: 13,
    color: '#212121',
  },
  brBuddylistItemMessage: {
    marginTop: 4,
  },
  brBuddylistItemTime: {
    marginTop: 2,
    fontSize: 12,
    color: '#9e9e9e',
  },
  brBuddylistItemMarker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#40E0D0',
    marginHorizontal: 4,
  },
  brBuddylistItemUnread: {
    backgroundColor: '#ff4526',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  brHidden: {
    display: 'none',
  },
  brBuddylistItemImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 8,
  },
  brNoImage: {
    backgroundColor: '#eeeeee',
  },
  brMyProfileImageUrl: {
    borderWidth: 2,
    borderColor: '#40E0D0',
  },
  brBuddylistItemStatusIcon: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
})
