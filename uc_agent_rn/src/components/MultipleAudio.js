import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ReactDOM from 'react-dom'

/**
 * MultipleAudio
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.phone
 * props.src
 * props.loop
 * props.playing
 * props.deviceId
 * props.localStoragePreferenceKey
 * props.className
 * props.audioClassName
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.lastDeviceId = null
    this.mustSetSinkId = false
    this.audioPlaying = false
    this.state = {
      sinkIds: [''],
    }
  }
  componentDidMount() {
    const props = this.props
    const deviceId = string(
      props.deviceId ||
        props.uiData.ucUiStore.getLocalStoragePreference({
          keyList: [props.localStoragePreferenceKey || 'bellAudioTarget'],
        })[0],
    )
    this.setSinkIdsState(deviceId)
    this.lastDeviceId = deviceId
  }
  componentDidUpdate() {
    const props = this.props
    const deviceId = string(
      props.deviceId ||
        props.uiData.ucUiStore.getLocalStoragePreference({
          keyList: [props.localStoragePreferenceKey || 'bellAudioTarget'],
        })[0],
    )
    if (deviceId !== this.lastDeviceId) {
      this.setSinkIdsState(deviceId)
      this.lastDeviceId = deviceId
    } else {
      this.setSinkIdAndPlay()
    }
  }
  setSinkIdsState(deviceId) {
    const props = this.props
    if (deviceId === '_all_devices') {
      if (
        typeof navigator !== 'undefined' &&
        navigator.mediaDevices &&
        navigator.mediaDevices.enumerateDevices
      ) {
        navigator.mediaDevices
          .enumerateDevices()
          .then(devices => {
            const audiooutputDeviceIds = devices
              .filter(
                device =>
                  device.kind === 'audiooutput' &&
                  device.deviceId !== 'default' &&
                  device.deviceId !== 'communications',
              )
              .map(device => string(device.deviceId))
            this.mustSetSinkId = true
            this.audioPlaying = false
            this.setState({
              sinkIds:
                audiooutputDeviceIds.length > 0 ? audiooutputDeviceIds : [''],
            })
          })
          .catch(error => {
            props.uiData.ucUiStore.getLogger().log('warn', error)
            this.mustSetSinkId = true
            this.audioPlaying = false
            this.setState({
              sinkIds: [''],
            })
          })
      } else {
        props.uiData.ucUiStore
          .getLogger()
          .log('warn', 'enumerateDevices() not supported.')
        this.mustSetSinkId = true
        this.audioPlaying = false
        this.setState({
          sinkIds: [''],
        })
      }
    } else {
      this.mustSetSinkId = true
      this.audioPlaying = false
      this.setState({
        sinkIds: [string(deviceId)],
      })
    }
  }
  setSinkIdAndPlay() {
    const props = this.props
    const node = ReactDOM.findDOMNode(this)
    if (node) {
      const children = node.children
      if (children && children.length === this.state.sinkIds.length) {
        this.state.sinkIds.forEach((sinkId, i) => {
          let playOrPauseFunc = () => {}
          if (props.playing && !this.audioPlaying) {
            // play
            playOrPauseFunc = () => {
              try {
                children[i]
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
                children[i].pause()
                children[i].currentTime = 0
              } catch (ex) {
                props.uiData.ucUiStore.getLogger().log('warn', ex)
              }
            }
          }
          if (this.mustSetSinkId && sinkId) {
            // setSinkId
            try {
              children[i]
                .setSinkId(string(sinkId))
                .then(playOrPauseFunc)
                .catch(error => {
                  props.uiData.ucUiStore.getLogger().log('warn', error)
                  if (
                    error &&
                    string(error.message).indexOf('permission') !== -1 &&
                    !this.mustSetSinkId &&
                    props.uiData.phone
                  ) {
                    this.mustSetSinkId = true
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
        })
      } else {
        props.uiData.ucUiStore
          .getLogger()
          .log(
            'warn',
            'setSinkId() error children.length=' +
              (children && children.length) +
              ' this.state.sinkIds.length=' +
              this.state.sinkIds.length,
          )
      }
    }
    this.mustSetSinkId = false
    this.audioPlaying = props.playing
  }
  render() {
    const props = this.props
    return (
      <span
        className={
          'brMultipleAudio' + (props.className ? ' ' + props.className : '')
        }
      >
        {this.state.sinkIds.map(sinkId => (
          <audio
            key={sinkId}
            className={
              'brMultipleAudioAudio' +
              (props.audioClassName ? ' ' + props.audioClassName : '')
            }
            src={props.src}
            loop={Boolean(props.loop)}
          ></audio>
        ))}
      </span>
    )
  }
}
