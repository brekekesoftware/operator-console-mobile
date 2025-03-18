import React from 'react'
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import * as DocumentPicker from 'expo-document-picker'
import * as FileSystem from 'expo-file-system'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'

/**
 * FileDndable - React Native version
 * A component that handles file selection functionality
 *
 * props.style - Additional styles for the component
 * props.onDrop - Function called when files are selected
 * props.onClick - Function called when component is clicked/pressed
 */
export default class FileDndable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isActive: false,
    }
  }

  handlePress = async () => {
    const { onDrop, onClick } = this.props

    // Handle regular click if provided
    if (onClick) {
      onClick()
    }

    // If onDrop is provided, handle file selection
    if (onDrop) {
      try {
        // Show document picker
        const result = await DocumentPicker.getDocumentAsync({
          type: '*/*',
          copyToCacheDirectory: true,
          multiple: true,
        })

        if (
          result.type === 'success' ||
          (result.assets && result.assets.length > 0)
        ) {
          // Process selected files
          const files = result.assets || [result]

          // Create file objects similar to web File API
          const fileObjects = await Promise.all(
            files.map(async file => {
              // Get file info
              const fileInfo = await FileSystem.getInfoAsync(file.uri)

              return {
                name: file.name,
                size: fileInfo.size,
                type: file.mimeType,
                uri: file.uri,
                // Add methods to read file if needed
                async text() {
                  return await FileSystem.readAsStringAsync(file.uri)
                },
                async arrayBuffer() {
                  const base64 = await FileSystem.readAsStringAsync(file.uri, {
                    encoding: FileSystem.EncodingType.Base64,
                  })
                  return Buffer.from(base64, 'base64')
                },
              }
            }),
          )

          // Create event object similar to drop event
          const dropEvent = {
            preventDefault: () => {},
            stopPropagation: () => {},
            dataTransfer: {
              files: fileObjects,
            },
          }

          // Call onDrop with the event
          onDrop(dropEvent)
        }
      } catch (error) {
        console.error('Error picking document', error)
      }
    }
  }

  render() {
    const { style, children } = this.props
    const { isActive } = this.state

    return (
      <TouchableOpacity
        style={[styles.fileDndable, isActive && styles.active, style]}
        onPress={this.handlePress}
      >
        {children}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  fileDndable: {
    // Base styles
  },
  active: {
    borderWidth: 2,
    borderColor: '#4BC5DE', // medium_turquoise
    borderStyle: 'dashed',
    backgroundColor: 'rgba(75, 197, 222, 0.1)', // Light version of medium_turquoise
  },
})
