import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import { DragSource, DropTarget } from 'react-dnd'

const dragSourceSpec = {
  beginDrag(props) {
    return {
      dragSourceInfo: props.dragSourceInfo,
    }
  },
  canDrag(props) {
    return props.dragSourceInfo
  },
}

function dragSourceCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    item: monitor.getItem(),
  }
}

const dropTargetSpec = {
  canDrop(props, monitor) {
    const item = props.item || {}
    const ev = {
      dragSourceInfo: item.dragSourceInfo,
    }
    return typeof props.onCheckCanDrop === 'function'
      ? props.onCheckCanDrop(ev)
      : false
  },
  drop(props, monitor) {
    const item = props.item || {}
    const ev = {
      dragSourceInfo: item.dragSourceInfo,
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
 * Dndable
 * props.className
 * props.style
 * props.dragSourceInfo
 * props.onCheckCanDrop
 * props.onDrop
 * props.onClick
 */
class Dndable extends React.Component {
  handleClick(ev) {
    const props = this.props
    if (typeof props.onClick === 'function') {
      props.onClick(ev)
    }
  }
  render() {
    const props = this.props
    return props.connectDragSource(
      props.connectDropTarget(
        <div
          className={
            'brDndable' +
            (props.isDragging ? ' brIsDragging' : '') +
            (props.isOver ? ' brIsOver' : '') +
            (props.canDrop ? ' brCanDrop' : '') +
            (props.className ? ' ' + props.className : '')
          }
          style={props.style || {}}
          onClick={this.handleClick.bind(this)}
        >
          {props.children}
        </div>,
      ),
    )
  }
}

export default DragSource(
  'DND_TYPE_DNDABLE',
  dragSourceSpec,
  dragSourceCollect,
)(DropTarget('DND_TYPE_DNDABLE', dropTargetSpec, dropTargetCollect)(Dndable))
