import React from 'react'

/**
 * CallAudio
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.phone
 * props.sessionId
 * props.streamMarker
 * props.isLocal
 * props.deviceId
 * props.style - Renamed from className for React Native
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.sound = null
    this.state = {
      isPlaying: false,
    }
  }


  render() {
    return null
  }
}
