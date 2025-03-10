import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import { ResizableBox } from 'react-resizable'
import Draggable from 'react-draggable'

/**
 * DialogResizableBox
 * props.className
 * props.ownerDocument
 * props.disabled
 * props.initialLeft
 * props.initialTop
 * props.initialWidth
 * props.initialHeight
 * props.resizableOpts
 * props.movable
 * props.draggableOptsToMove
 * props.modal
 * props.onStart
 * props.onStop
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      iframeOrgStyles: [],
      currentRect: {
        left: int(props.initialLeft),
        top: int(props.initialTop),
        width: int(props.initialWidth),
        height: int(props.initialHeight),
      },
    }
  }
  componentWillUnmount() {
    const props = this.props
    this.restoreIframeEvents()
  }
  handleResizeStart(ev) {
    const props = this.props
    this.disableIframeEvents()
    if (typeof props.onStart === 'function') {
      props.onStart(this.state.currentRect, arguments)
    }
  }
  handleResizeStop(ev, data) {
    const props = this.props
    this.restoreIframeEvents()
    const newRect = {
      left: this.state.currentRect.left,
      top: this.state.currentRect.top,
      width:
        data && data.size && typeof data.size.width === 'number'
          ? data.size.width
          : this.state.currentRect.width,
      height:
        data && data.size && typeof data.size.height === 'number'
          ? data.size.height
          : this.state.currentRect.height,
    }
    this.setState({ currentRect: newRect })
    if (typeof props.onStop === 'function') {
      props.onStop(newRect, arguments)
    }
  }
  handleClick(ev) {
    const props = this.props
    this.restoreIframeEvents()
  }
  handleStartDraggable(ev) {
    const props = this.props
    this.disableIframeEvents()
    if (typeof props.onStart === 'function') {
      props.onStart(this.state.currentRect, arguments)
    }
  }
  handleStopDraggable(ev, data) {
    const props = this.props
    this.restoreIframeEvents()
    const newRect = {
      left:
        data && typeof data.x === 'number'
          ? int(props.initialLeft) + data.x
          : this.state.currentRect.left,
      top:
        data && typeof data.y === 'number'
          ? int(props.initialTop) + data.y
          : this.state.currentRect.top,
      width: this.state.currentRect.width,
      height: this.state.currentRect.height,
    }
    this.setState({ currentRect: newRect })
    if (typeof props.onStop === 'function') {
      props.onStop(newRect, arguments)
    }
  }
  disableIframeEvents() {
    const props = this.props
    if (
      props.ownerDocument &&
      typeof props.ownerDocument.getElementsByTagName === 'function'
    ) {
      const iframes = props.ownerDocument.getElementsByTagName('iframe')
      if (iframes && iframes.length) {
        this.restoreIframeEvents()
        this.setState({
          iframeOrgStyles: Array.prototype.map.call(iframes, iframe => {
            const orgStyle = {}
            if (iframe && iframe.style) {
              orgStyle.propertyName = 'pointerEvents'
              orgStyle.orgValue = iframe.style.pointerEvents
              orgStyle.element = iframe
              iframe.style.pointerEvents = 'none'
            }
            return orgStyle
          }),
        })
      }
    }
  }
  restoreIframeEvents() {
    const props = this.props
    if (this.state.iframeOrgStyles) {
      this.state.iframeOrgStyles.forEach(orgStyle => {
        if (orgStyle.element && orgStyle.element.style) {
          orgStyle.element.style[orgStyle.propertyName] = orgStyle.orgValue
        }
      })
      this.setState({ iframeOrgStyles: [] })
    }
  }
  render() {
    const props = this.props
    const className =
      'brDialogResizableBoxResizable' + (props.disabled ? ' brDisabled' : '')
    let contents = (
      <ResizableBox
        className={className}
        width={int(props.initialWidth)}
        height={int(props.initialHeight)}
        onResizeStart={this.handleResizeStart.bind(this)}
        onResizeStop={this.handleResizeStop.bind(this)}
        onClick={this.handleClick.bind(this)}
        {...props.resizableOpts}
      >
        {props.children}
      </ResizableBox>
    )
    if (props.movable) {
      contents = (
        <Draggable
          onStart={this.handleStartDraggable.bind(this)}
          onStop={this.handleStopDraggable.bind(this)}
          {...props.draggableOptsToMove}
        >
          <div
            className='brDialogResizableBoxMovable'
            style={{
              position: 'fixed',
              left: int(props.initialLeft) + 'px',
              top: int(props.initialTop) + 'px',
            }}
          >
            {contents}
          </div>
        </Draggable>
      )
    }
    if (props.modal) {
      contents = (
        <div
          className='brDialogResizableBoxModal'
          style={{
            position: 'fixed',
            left: '0px',
            top: '0px',
            width: '100%',
            height: '100%',
          }}
        >
          {contents}
        </div>
      )
    }
    return <div className={props.className}>{contents}</div>
  }
}
