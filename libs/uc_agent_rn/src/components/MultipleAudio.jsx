import React from 'react'
import { View, StyleSheet, Platform, PermissionsAndroid } from 'react-native'
import Sound from 'react-native-sound'
import { int, string } from '../utilities/strings'

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

    Sound.setCategory('Playback', true)
  }

  componentDidMount() {
    const props = this.props
    const deviceId = string(
      props.deviceId ||
        props.uiData.ucUiStore.getLocalStoragePreference({
          keyList: [props.localStoragePreferenceKey || 'bellAudioTarget'],
        })[0],
    )

    this.requestAudioPermission()

    this.setOutputDevices(deviceId)
    this.lastDeviceId = deviceId

    this.loadAudioSources()
  }

  componentDidUpdate(prevProps) {
    const props = this.props

    const deviceId = string(
      props.deviceId ||
        props.uiData.ucUiStore.getLocalStoragePreference({
          keyList: [props.localStoragePreferenceKey || 'bellAudioTarget'],
        })[0],
    )

    if (deviceId !== this.lastDeviceId) {
      this.setOutputDevices(deviceId)
      this.lastDeviceId = deviceId
      this.loadAudioSources()
    } else if (prevProps.src !== props.src) {
      this.loadAudioSources()
    } else if (prevProps.playing !== props.playing) {
      this.updatePlayback()
    }
  }

  componentWillUnmount() {
    this.unloadAudioSources()
  }

  async requestAudioPermission() {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Audio Permission',
            message:
              'App needs access to your microphone to handle audio devices',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        )

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          this.props.uiData.ucUiStore
            .getLogger()
            .log('warn', 'Audio permission not granted')
        }
      }
    } catch (error) {
      this.props.uiData.ucUiStore.getLogger().log('warn', error)
    }
  }

  setOutputDevices(deviceId) {
    const props = this.props

    try {
      this.unloadAudioSources()

      if (deviceId === '_all_devices' && Platform.OS === 'web') {
        if (
          typeof navigator !== 'undefined' &&
          navigator.mediaDevices &&
          navigator.mediaDevices.enumerateDevices
        ) {
          navigator.mediaDevices
            .enumerateDevices()
            .then(devices => {
              const audioOutputDevices = devices
                .filter(
                  device =>
                    device.kind === 'audiooutput' &&
                    device.deviceId !== 'default' &&
                    device.deviceId !== 'communications',
                )
                .map(device => device.deviceId)

              this.setState(
                {
                  outputDevices:
                    audioOutputDevices.length > 0 ? audioOutputDevices : [null],
                },
                () => {
                  this.loadAudioSources()
                },
              )
            })
            .catch(error => {
              props.uiData.ucUiStore.getLogger().log('warn', error)
              this.setState({ outputDevices: [null] }, () => {
                this.loadAudioSources()
              })
            })
        } else {
          props.uiData.ucUiStore
            .getLogger()
            .log('warn', 'enumerateDevices() not supported.')
          this.setState({ outputDevices: [null] }, () => {
            this.loadAudioSources()
          })
        }
      } else {
        // On mobile, can't select output device at the app level
        // so just use one audio channel
        // TODO: Add support for selecting output device on mobile
        this.setState(
          {
            outputDevices: [deviceId !== '' ? deviceId : null],
          },
          () => {
            this.loadAudioSources()
          },
        )
      }
    } catch (error) {
      props.uiData.ucUiStore.getLogger().log('warn', error)
      this.setState({ outputDevices: [null] }, () => {
        this.loadAudioSources()
      })
    }
  }

  loadAudioSources() {
    const props = this.props

    this.unloadAudioSources()
    this.audioSounds = []
    console.log('#Duy Phan console props.src', props.src)
    try {
      for (let i = 0; i < this.state.outputDevices.length; i++) {
        const sound = new Sound(props.src, null, error => {
          if (error) {
            // props.uiData.ucUiStore
            //   .getLogger()
            //   .log('warn', `Failed to load sound: ${error}`)
            console.log('#Duy Phan console error', error)
            return
          }

          sound.setNumberOfLoops(props.loop ? -1 : 0)

          this.updatePlayback()
        })

        this.audioSounds.push(sound)
      }
    } catch (error) {
      props.uiData.ucUiStore.getLogger().log('warn', error)
    }
  }

  unloadAudioSources() {
    try {
      for (const sound of this.audioSounds) {
        if (sound) {
          sound.stop()
          sound.release()
        }
      }
      this.audioSounds = []
      this.audioPlaying = false
    } catch (error) {
      this.props.uiData.ucUiStore.getLogger().log('warn', error)
    }
  }

  updatePlayback() {
    const props = this.props

    try {
      if (props.playing && !this.audioPlaying) {
        for (const sound of this.audioSounds) {
          if (sound) {
            sound.setCurrentTime(0)
            sound.play(success => {
              if (!success) {
                props.uiData.ucUiStore
                  .getLogger()
                  .log('warn', 'Audio playback failed')
              }
            })
          }
        }
        this.audioPlaying = true
      } else if (!props.playing && this.audioPlaying) {
        for (const sound of this.audioSounds) {
          if (sound) {
            sound.stop()
            sound.setCurrentTime(0)
          }
        }
        this.audioPlaying = false
      }
    } catch (error) {
      props.uiData.ucUiStore.getLogger().log('warn', error)
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
  },
})
