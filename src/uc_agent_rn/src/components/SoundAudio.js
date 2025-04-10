import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ReactDOM from 'react-dom'
import FlyweightAudio from './FlyweightAudio.js'
import MultipleAudio from './MultipleAudio.js'

/**
 * SoundAudio
 * props.uiData
 * props.uiData.configurations
 * props.src
 * props.loop
 * props.playing
 * props.deviceId
 * props.localStoragePreferenceKey
 * props.className
 * props.audioClassName
 * props.selectors
 */
export default class extends React.Component {
  render() {
    const props = this.props
    const isSafari =
      typeof navigator !== 'undefined'
        ? new RegExp(
            (props.uiData.configurations &&
              props.uiData.configurations.uaForFlyweightAudio) ||
              '^(?=.*Safari)(?!.*Chrome).*$',
          ).test(navigator.userAgent)
        : false
    if (isSafari) {
      return (
        <FlyweightAudio
          uiData={props.uiData}
          src={props.src}
          loop={props.loop}
          playing={props.playing}
          deviceId={props.deviceId}
          localStoragePreferenceKey={props.localStoragePreferenceKey}
          className={props.className}
          selectors={props.selectors}
        />
      )
    } else {
      return (
        <MultipleAudio
          uiData={props.uiData}
          src={props.src}
          loop={props.loop}
          playing={props.playing}
          deviceId={props.deviceId}
          localStoragePreferenceKey={props.localStoragePreferenceKey}
          className={props.className}
          audioClassName={props.audioClassName}
        />
      )
    }
  }
}
