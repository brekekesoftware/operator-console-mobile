import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

/**
 * ButtonLabeled
 * props.className
 * props.disabled
 * props.hidden
 * props.progress
 * props.vivid
 * props.ghost
 * props.title
 * props.style
 * props.onPress
 */
export default class extends React.Component {
  handleClick(ev) {
    const props = this.props
    if (!props.disabled) {
      if (typeof props.onPress === 'function') {
        props.onPress(ev)
      }
    }
  }
  render() {
    const props = this.props
    return (
      <TouchableOpacity
        className={
          'brButtonLabeled' +
          (props.disabled ? ' brDisabled' : '') +
          (props.hidden ? ' brHidden' : '') +
          (props.progress ? ' brProgress' : '') +
          (props.vivid ? ' brVivid' : '') +
          (props.ghost ? ' brGhost' : '') +
          (props.className ? ' ' + props.className : '')
        }
        // title={props.title}
        style={[
          styles.brButtonLabeled,
          props.disabled && styles.brDisabled,
          props.progress && styles.brProgress,
          props.vivid && styles.brVivid,
          props.ghost && styles.brGhost,
          props.style,
        ]}
        onPress={this.handleClick.bind(this)}
      >
        {props.children}
      </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  brButtonLabeled: {
    height: 32,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: '#212121',
  },
  brDisabled: {
    backgroundColor: '#bdbdbd',
  },
  brHidden: {
    display: 'none',
  },
  brVivid: {
    backgroundColor: '#5fac3f',
  },
  brGhost: {
    backgroundColor: 'transparent',
  },
  brProgress: {},
})
