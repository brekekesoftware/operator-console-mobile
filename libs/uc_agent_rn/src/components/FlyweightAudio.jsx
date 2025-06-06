import React from 'react'
import { View, StyleSheet } from 'react-native'
import Sound from 'react-native-sound'

/**
 * FlyweightAudio
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.phone
 * props.src
 * props.loop
 * props.playing
 * props.deviceId
 * props.localStoragePreferenceKey
 * props.className
 */
export default class FlyweightAudio extends React.Component {
  constructor(props) {
    super(props)
    this.audioPlaying = false
    this.sound = null
  }

  componentDidMount() {
    this.initSound()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.src !== this.props.src) {
      this.releaseSound()
      this.initSound()
    } else {
      this.play()
    }
  }

  componentWillUnmount() {
    this.releaseSound()
  }

  initSound() {
    const { props } = this
    Sound.setCategory('Playback')
    this.sound = new Sound(props.src, Sound.MAIN_BUNDLE, error => {
      if (error) {
        props.uiData.ucUiStore.getLogger().log('warn', error)
        return
      }
      if (props.loop) {
        this.sound.setNumberOfLoops(-1)
      }
      if (props.playing) {
        this.play()
      }
    })
  }

  releaseSound() {
    if (this.sound) {
      this.sound.release()
      this.sound = null
    }
    this.audioPlaying = false
  }

  play() {
    const { props } = this

    if (!this.sound) {
      return
    }

    if (props.playing && !this.audioPlaying) {
      try {
        this.sound.play(success => {
          if (!success) {
            props.uiData.ucUiStore
              .getLogger()
              .log('warn', 'Sound playback failed')
          }
        })
      } catch (ex) {
        props.uiData.ucUiStore.getLogger().log('warn', ex)
      }
    } else if (!props.playing && this.audioPlaying) {
      try {
        this.sound.stop()
        this.sound.setCurrentTime(0)
      } catch (ex) {
        props.uiData.ucUiStore.getLogger().log('warn', ex)
      }
    }

    if (props.loop && this.sound.getNumberOfLoops() !== -1) {
      this.sound.setNumberOfLoops(-1)
    } else if (!props.loop && this.sound.getNumberOfLoops() === -1) {
      this.sound.setNumberOfLoops(0)
    }

    this.audioPlaying = props.playing
  }

  render() {
    return <View style={styles.brFlyweightAudio} />
  }
}

const styles = StyleSheet.create({
  brFlyweightAudio: {
    width: 0,
    height: 0,
    opacity: 0,
  },
})
