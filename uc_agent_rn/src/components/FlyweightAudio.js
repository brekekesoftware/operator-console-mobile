import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ReactDOM from 'react-dom'
import { formatStr } from '../utilities/strings.js'

/**
 * FlyweightAudio
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.phone
 * props.uiData.ownerDocument
 * props.src
 * props.loop
 * props.playing
 * props.deviceId
 * props.localStoragePreferenceKey
 * props.className
 * props.selectors
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.audioDeviceId = ''
    this.audioPlaying = false
  }
  componentDidMount() {
    const props = this.props
    this.play()
  }
  componentDidUpdate() {
    const props = this.props
    this.play()
  }
  play() {
    const props = this.props
    const node = (props.uiData.ownerDocument &&
      props.uiData.ownerDocument.querySelector &&
      props.uiData.ownerDocument.querySelector(
        formatStr(
          props.selectors || ".brFlyweightAudioAudio[src='{0}']",
          props.src,
        ),
      )) || {
      play: () => {
        throw 'not found flyweight audio audio src=' + props.src
      },
      pause: () => {},
    }
    let playOrPauseFunc = () => {}
    if (props.playing && !this.audioPlaying) {
      // play
      playOrPauseFunc = () => {
        try {
          node
            .play()
            .then(() => {})
            .catch(error => {
              props.uiData.ucUiStore.getLogger().log('warn', error)
            })
        } catch (ex) {
          props.uiData.ucUiStore.getLogger().log('warn', ex)
        }
      }
    } else if (!props.playing && this.audioPlaying) {
      // pause
      playOrPauseFunc = () => {
        try {
          node.pause()
          node.currentTime = 0
        } catch (ex) {
          props.uiData.ucUiStore.getLogger().log('warn', ex)
        }
      }
    }
    if (props.loop && !node.loop) {
      node.loop = true
    } else if (!props.loop && node.loop) {
      node.loop = false
    }
    const deviceId = string(
      props.deviceId ||
        props.uiData.ucUiStore.getLocalStoragePreference({
          keyList: [props.localStoragePreferenceKey || 'bellAudioTarget'],
        })[0],
    )
    if (deviceId !== this.audioDeviceId) {
      // setSinkId
      try {
        node
          .setSinkId(deviceId)
          .then(playOrPauseFunc)
          .catch(error => {
            props.uiData.ucUiStore.getLogger().log('warn', error)
            if (
              error &&
              string(error.message).indexOf('permission') !== -1 &&
              this.audioDeviceId &&
              props.uiData.phone
            ) {
              this.audioDeviceId = ''
              props.uiData.phone.checkUserMedia()
            }
            playOrPauseFunc()
          })
      } catch (ex) {
        props.uiData.ucUiStore.getLogger().log('warn', ex)
        playOrPauseFunc()
      }
    } else {
      playOrPauseFunc()
    }
    this.audioDeviceId = deviceId
    this.audioPlaying = props.playing
  }
  render() {
    const props = this.props
    return (
      <div
        className={
          'brFlyweightAudio' + (props.className ? ' ' + props.className : '')
        }
      ></div>
    )
  }
}
