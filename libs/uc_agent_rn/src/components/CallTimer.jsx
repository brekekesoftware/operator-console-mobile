import React from 'react'
import { int, string } from '../utilities/strings'
import { StyleSheet, Text } from 'react-native'

/**
 * CallTimer
 * props.startTime
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      secondsElapsed: 0,
    }
  }
  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 500)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  tick() {
    const props = this.props
    if (props.startTime) {
      this.setState({
        secondsElapsed: int((+new Date() - int(props.startTime)) / 1000),
      })
    } else if (this.state.secondsElapsed) {
      this.setState({ secondsElapsed: 0 })
    }
  }
  render() {
    const props = this.props
    if (props.startTime) {
      return (
        <Text style={styles.brCallTimer}>
          {(this.state.secondsElapsed < 600 ? '0' : '') +
            int(this.state.secondsElapsed / 60) +
            ':' +
            ('0' + (this.state.secondsElapsed % 60)).slice(-2)}
        </Text>
      )
    } else {
      return <Text style={styles.brCallTimer}></Text>
    }
  }
}

const styles = StyleSheet.create({
  brCallTimer: {
    color: 'white',
    fontSize: 13,
    fontWeight: '400',
  },
})
