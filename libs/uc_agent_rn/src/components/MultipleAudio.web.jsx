import React from 'react'
import { StyleSheet, View } from 'react-native'

/**
 * MultipleAudio - React Native version
 * A component that handles playing audio on multiple devices
 *
 * props.uiData - UI data object
 * props.uiData.ucUiStore - UI store
 * props.uiData.phone - Phone object
 * props.src - Source URL of the audio
 * props.loop - Whether to loop the audio
 * props.playing - Whether the audio should be playing
 * props.deviceId - Device ID to play audio on
 * props.localStoragePreferenceKey - Key for local storage preference
 * props.style - Additional styles
 */
export default class MultipleAudio extends React.Component {
  constructor(props) {
    super(props)
    this.lastDeviceId = null
    this.audioSounds = []
    this.audioPlaying = false
    this.state = {
      outputDevices: [null],
    }

  }

  

  render() {
    return <View style={[styles.multipleAudio, this.props.style]} />
  }
}

const styles = StyleSheet.create({
  multipleAudio: {
    width: 0,
    height: 0,
    opacity: 0,
    display: 'none'
  },
})
