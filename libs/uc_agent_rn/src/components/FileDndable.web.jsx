import React from 'react'
import { TouchableOpacity, StyleSheet, } from 'react-native'
// import DocumentPicker from 'react-native-document-picker'
import RNFS from 'react-native-fs'

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
    if (onClick) {
      onClick()
    }

    //TODO: Handle if it need on web

    // if (onDrop) {
    //   try {
    //     const results = await DocumentPicker.pickMultiple({
    //       type: [DocumentPicker.types.allFiles],
    //       allowMultiSelection: true,
    //     })

    //     if (results && results.length > 0) {
    //       const fileObjects = await Promise.all(
    //         results.map(async file => {
    //           let fileContent = null
    //           try {
    //             fileContent = await RNFS.readFile(file.uri)
    //           } catch (err) {
    //             console.error('Error reading file:', err)
    //           }

    //           return {
    //             name: file.name,
    //             size: file.size,
    //             type: file.type,
    //             uri: file.uri,
    //             async text() {
    //               try {
    //                 return await RNFS.readFile(file.uri, 'utf8')
    //               } catch (err) {
    //                 console.error('Error reading file as text:', err)
    //                 return ''
    //               }
    //             },
    //             async arrayBuffer() {
    //               try {
    //                 const base64 = await RNFS.readFile(file.uri, 'base64')
    //                 return Buffer.from(base64, 'base64')
    //               } catch (err) {
    //                 console.error('Error reading file as array buffer:', err)
    //                 return new ArrayBuffer(0)
    //               }
    //             },
    //           }
    //         }),
    //       )

    //       const dropEvent = {
    //         preventDefault: () => {},
    //         stopPropagation: () => {},
    //         dataTransfer: {
    //           files: fileObjects,
    //         },
    //       }

    //       onDrop(dropEvent)
    //     }
    //   } catch (error) {
    //     if (!DocumentPicker.isCancel(error)) {
    //       console.error('Error picking document111:', error)
    //     }
    //   }
    // }
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
    // borderStyle: 'dashed',
    backgroundColor: 'rgba(75, 197, 222, 0.1)', // Light version of medium_turquoise
  },
})
