import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ReactDOM from 'react-dom'

/**
 * FlyweightAudioFactory
 * props.srcs
 * props.className
 * props.audioClassName
 */
export default class extends React.Component {
  render() {
    const props = this.props
    return (
      <div
        className={
          'brFlyweightAudioFactory' +
          (props.className ? ' ' + props.className : '')
        }
      >
        {Array.prototype.map.call(props.srcs || [], (src, i) => (
          <audio
            key={i}
            className={
              'brFlyweightAudioAudio' +
              (props.audioClassName ? ' ' + props.audioClassName : '')
            }
            src={src}
          ></audio>
        ))}
      </div>
    )
  }
}
