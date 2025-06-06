import React from 'react'
import { StyleSheet, View } from 'react-native'

/**
 * CallVideo
 * props.uiData
 * props.uiData.phone
 * props.sessionId
 * props.videoClientSessionId
 * props.streamMarker
 * props.isLocal
 * props.style - Additional styles
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stream: null,
    }
  }

  componentDidMount() {
    this.updateVideoStream()
  }

  componentDidUpdate(prevProps) {
    const props = this.props
    if (
      !prevProps ||
      props.sessionId !== prevProps.sessionId ||
      props.videoClientSessionId !== prevProps.videoClientSessionId ||
      props.streamMarker !== prevProps.streamMarker
    ) {
      this.updateVideoStream()
    }
  }

  updateVideoStream() {
    const props = this.props
    let stream = null

    if (props.uiData.phone) {
      const session =
        props.uiData.phone && props.uiData.phone.getSession(props.sessionId)
      if (session) {
        if (props.isLocal) {
          stream = session.localVideoStreamObject || null
        } else if (
          session.videoClientSessionTable &&
          session.videoClientSessionTable[props.videoClientSessionId]
        ) {
          stream =
            session.videoClientSessionTable[props.videoClientSessionId]
              .remoteStreamObject || null
        }
      }
    }

    this.setState({ stream })
  }

  render() {
    const { style } = this.props
    const { stream } = this.state

    if (!stream) {
      return <View style={[styles.brCallVideo, style]} />
    }

    return (
      <video
        streamURL={stream}
        style={[styles.brCallVideo, style, {objectFit: 'cover'}]}
      />
    )
  }
}

const styles = StyleSheet.create({
  brCallVideo: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
})
