import React from 'react'
import { Platform } from 'react-native'
import Sound from 'react-native-sound'

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

    // Enable playback in silence mode (iOS only)
    Sound.setCategory('Playback', true)
    // Set default audio output to speaker
    Sound.setMode('VideoChat')
  }

  componentDidMount() {
    this.setupAudio()
    this.play()
  }

  componentDidUpdate(prevProps) {
    const props = this.props

    if (
      !prevProps ||
      props.sessionId !== prevProps.sessionId ||
      props.streamMarker !== prevProps.streamMarker
    ) {
      this.play()
    } else if (!prevProps || props.deviceId !== prevProps.deviceId) {
      this.updateAudioOutput()
    }
  }

  componentWillUnmount() {
    this.cleanup()
  }

  setupAudio() {
    // Configure audio session
    if (Platform.OS === 'ios') {
      Sound.setCategory('PlayAndRecord')
    }
  }

  play() {
    const props = this.props
    let stream = null
    let url = ''

    // Cleanup previous sound instance
    this.cleanup()

    if (props.uiData.phone) {
      const session =
        props.uiData.phone && props.uiData.phone.getSession(props.sessionId)
      if (session) {
        if (props.isLocal) {
          stream = session.localStreamObject || null
          url = session.localStreamUrl || ''
        } else {
          stream = session.remoteStreamObject || null
          url = session.remoteStreamUrl || ''
        }
      }
    }

    try {
      if (url) {
        this.sound = new Sound(url, '', error => {
          if (error) {
            props.uiData.ucUiStore
              .getLogger()
              .log('warn', 'Failed to load sound', error)
            return
          }

          // Start playing the sound
          this.sound.play(success => {
            if (!success) {
              props.uiData.ucUiStore.getLogger().log('warn', 'Playback failed')
            }
            this.setState({ isPlaying: false })
          })

          this.setState({ isPlaying: true })
        })

        // Set volume and enable looping if needed
        this.sound.setVolume(1.0)
        // this.sound.setNumberOfLoops(-1); // Uncomment for infinite loop
      } else if (stream) {
        // For handling WebRTC streams, you might need to use react-native-webrtc
        // This would require additional implementation specific to your streaming setup
        props.uiData.ucUiStore
          .getLogger()
          .log('warn', 'Stream handling requires WebRTC implementation')
      }
    } catch (error) {
      props.uiData.ucUiStore.getLogger().log('warn', error)
    }
  }

  updateAudioOutput() {
    try {
      if (this.sound && Platform.OS === 'android') {
        // TODO: Implement audio output selection for Android
        // On Android, you can use the AudioManager to switch output
        // This requires a native module implementation
        // You might want to create a native module that interfaces with Android's AudioManager
        // or use an existing library that provides this functionality
      }
      // iOS handles audio routing through the system settings
    } catch (error) {
      this.props.uiData.ucUiStore.getLogger().log('warn', error)
    }
  }

  cleanup() {
    if (this.sound) {
      try {
        this.sound.stop()
        this.sound.release()
        this.sound = null
      } catch (error) {
        this.props.uiData.ucUiStore.getLogger().log('warn', error)
      }
    }
  }

  render() {
    return null
  }
}
