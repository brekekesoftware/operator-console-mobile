import React from 'react'
import { View, StyleSheet, Animated } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

/**
 * CallMicrophoneLevel
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.phone
 * props.analyser
 * props.sessionId
 * props.style - Additional styles
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.errorInTick = null
    this.state = {
      level: 0,
    }
    this.indicatorPosition = new Animated.Value(0)
  }

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 100)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  tick() {
    const props = this.props
    let analyser = props.analyser

    if (!analyser && props.sessionId) {
      const session =
        props.uiData.phone && props.uiData.phone.getSession(props.sessionId)
      if (
        session &&
        session.analyser &&
        !(session.muted && session.muted.main)
      ) {
        analyser = session.analyser
      }
    }

    if (analyser) {
      if (analyser.getByteTimeDomainData && typeof Uint8Array !== 'undefined') {
        const dataArray = new Uint8Array(analyser.fftSize)
        analyser.getByteTimeDomainData(dataArray)

        let sum = 0
        for (let i = 0; i < dataArray.length; i++) {
          sum += Math.abs(dataArray[i] - 128)
        }

        const val = (sum * 10) / dataArray.length
        let level = val

        if (val > 350) {
          level = (val - 350) / 37.2 + 75
        } else if (val > 100) {
          level = (val - 100) / 10 + 50
        } else if (val > 25) {
          level = (val - 25) / 3 + 25
        }

        const finalLevel = Math.min(100, Math.ceil(level))
        this.setState({ level: finalLevel })

        // Animate the indicator position
        Animated.spring(this.indicatorPosition, {
          toValue: finalLevel,
          useNativeDriver: false,
          tension: 40,
          friction: 7,
        }).start()
      } else {
        if (!this.errorInTick) {
          this.errorInTick =
            'analyser error getByteTimeDomainData=' +
            analyser.getByteTimeDomainData
          props.uiData.ucUiStore.getLogger().log('warn', this.errorInTick)
        }
        this.setState({ level: 100 })
        this.indicatorPosition.setValue(100)
      }
    } else {
      this.setState({ level: 0 })
      this.indicatorPosition.setValue(0)
    }
  }

  render() {
    const indicatorLeft = this.indicatorPosition.interpolate({
      inputRange: [0, 100],
      outputRange: ['100%', '0%'],
    })

    return (
      <View style={[styles.brCallMicrophoneLevel, this.props.style]}>
        <LinearGradient
          style={styles.brCallMicrophoneLevelBackground}
          colors={['#80ff80', '#ffff80', '#ff8080']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
        <Animated.View
          style={[
            styles.brCallMicrophoneLevelIndicator,
            { left: indicatorLeft },
          ]}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  brCallMicrophoneLevel: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  brCallMicrophoneLevelBackground: {
    position: 'absolute',
    left: '0%',
    right: '0%',
    top: '0%',
    bottom: '0%',
  },
  brCallMicrophoneLevelIndicator: {
    position: 'absolute',
    right: '0%',
    top: '0%',
    bottom: '0%',
    backgroundColor: '#FFFFFF', // @white
  },
})
