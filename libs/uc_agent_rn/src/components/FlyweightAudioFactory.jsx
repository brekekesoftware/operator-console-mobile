import React from 'react'
import { View, StyleSheet } from 'react-native'
import Sound from 'react-native-sound'

/**
 * FlyweightAudioFactory - React Native version
 * A component for preloading audio resources
 *
 * props.srcs - Array of audio source URLs
 * props.className - Additional class name for the component (not used in RN)
 * props.audioClassName - Additional class name for the audio elements (not used in RN)
 */
export default class FlyweightAudioFactory extends React.Component {
  constructor(props) {
    super(props)
    this.soundObjects = []

    Sound.setCategory('Playback')
  }

  componentDidMount() {
    this.loadAudios()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.srcs !== this.props.srcs) {
      this.releaseAudios()
      this.loadAudios()
    }
  }

  componentWillUnmount() {
    this.releaseAudios()
  }

  loadAudios() {
    const { srcs } = this.props

    if (!srcs || !Array.isArray(srcs)) {
      return
    }

    srcs.forEach((src, index) => {
      const sound = new Sound(src, null, error => {
        if (error) {
          console.warn(`Failed to load sound ${src}:`, error)
          return
        }
      })

      this.soundObjects[index] = sound
    })
  }

  releaseAudios() {
    this.soundObjects.forEach(sound => {
      if (sound) {
        sound.release()
      }
    })
    this.soundObjects = []
  }

  static getAudio(src) {
    return null
  }

  render() {
    return <View style={styles.container} />
  }
}

const styles = StyleSheet.create({
  container: {
    width: 0,
    height: 0,
    opacity: 0,
    position: 'absolute',
  },
})
