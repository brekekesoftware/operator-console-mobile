import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import { DropTarget } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'

const dropTargetSpec = {
  canDrop(props, monitor) {
    // Browser doesn't allow reading "files" until the drop event.
    return true
  },
  drop(props, monitor) {
    const ev = {
      files:
        ((monitor && monitor.getItem && monitor.getItem()) || {}).files || [],
      didDrop: Boolean(monitor && monitor.didDrop && monitor.didDrop()),
    }
    if (typeof props.onDrop === 'function') {
      props.onDrop(ev)
    }
  },
}

function dropTargetCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }
}

/**
 * FileDndable
 * props.className
 * props.style
 * props.onDrop
 * props.onClick
 */
class FileDndable extends React.Component {
  handleClick(ev) {
    const props = this.props
    if (typeof props.onClick === 'function') {
      props.onClick(ev)
    }
  }
  render() {
    const props = this.props
    return props.connectDropTarget(
      <div
        className={
          'brFileDndable' +
          (props.isOver ? ' brIsOver' : '') +
          (props.canDrop ? ' brCanDrop' : '') +
          (props.className ? ' ' + props.className : '')
        }
        style={props.style || {}}
        onClick={this.handleClick.bind(this)}
      >
        {props.children}
      </div>,
    )
  }
}

export default DropTarget(
  NativeTypes.FILE,
  dropTargetSpec,
  dropTargetCollect,
)(FileDndable)
