import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import Dndable from './Dndable.js'
import FileDndable from './FileDndable.js'

/**
 * DndableSafe
 * props.uiData
 * props.uiData.ownerDocument
 * props.uiData.uiDataId
 * props.dndableClass
 * props.className
 * props.style
 * props.dragSourceInfo
 * props.onCheckCanDrop
 * props.onDrop
 * props.onClick
 */
export default class extends React.Component {
  handleLegacyDragOver(ev) {
    const props = this.props
    if (ev && ev.preventDefault) {
      ev.preventDefault()
    }
  }
  handleLegacyDrop(ev) {
    const props = this.props
    if (ev && ev.preventDefault) {
      ev.preventDefault()
    }
    if (typeof props.onDrop === 'function') {
      props.onDrop(ev)
    }
  }
  handleLegacyClick(ev) {
    const props = this.props
    if (typeof props.onClick === 'function') {
      props.onClick(ev)
    }
  }
  render() {
    const props = this.props
    if (
      props.uiData &&
      props.uiData.ownerDocument &&
      props.uiData.ownerDocument.defaultView &&
      props.uiData.ownerDocument.defaultView.$brUCDndEnabledApp &&
      props.uiData.ownerDocument.defaultView.$brUCDndEnabledApp ===
        props.uiData.uiDataId
    ) {
      // react-dnd is enabled
      if (props.dndableClass === 'FileDndable') {
        return (
          <FileDndable
            className={
              'brDndableSafe' + (props.className ? ' ' + props.className : '')
            }
            style={props.style}
            onDrop={props.onDrop}
            onClick={props.onClick}
          >
            {props.children}
          </FileDndable>
        )
      } else {
        return (
          <Dndable
            className={
              'brDndableSafe' + (props.className ? ' ' + props.className : '')
            }
            style={props.style}
            dragSourceInfo={props.dragSourceInfo}
            onCheckCanDrop={props.onCheckCanDrop}
            onDrop={props.onDrop}
            onClick={props.onClick}
          >
            {props.children}
          </Dndable>
        )
      }
    } else {
      // legacy (only able to drop files without effects)
      return (
        <div
          className={
            'brDndableSafe brLegacy' +
            (props.className ? ' ' + props.className : '')
          }
          style={props.style || {}}
          onDragOver={this.handleLegacyDragOver.bind(this)}
          onDrop={this.handleLegacyDrop.bind(this)}
          onClick={this.handleLegacyClick.bind(this)}
        >
          {props.children}
        </div>
      )
    }
  }
}
