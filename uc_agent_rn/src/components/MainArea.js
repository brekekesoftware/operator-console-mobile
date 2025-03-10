import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ReactDOM from 'react-dom'
import Draggable from 'react-draggable'
import MainTabs from './MainTabs.js'

/**
 * MainArea
 * props.uiData
 * props.uiData.mainAreaSplitters
 * props.className
 * props.style
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      splitterRight: 0,
      splitterBottom: 0,
    }
  }
  componentDidMount() {
    this.componentDidUpdate()
  }
  componentDidUpdate() {
    const props = this.props
    const newState = {}
    const mainArea = ReactDOM.findDOMNode(this.refs['mainArea'])
    if (mainArea && mainArea.clientWidth && mainArea.clientHeight) {
      if (
        props.uiData.mainAreaSplitters === 1 ||
        props.uiData.mainAreaSplitters === 2
      ) {
        const minWidth = 240
        const minRight = Math.min(minWidth, mainArea.clientWidth / 2)
        const maxRight = mainArea.clientWidth - minRight
        if (this.state.splitterRight < minRight) {
          newState.splitterRight = minRight
        } else if (maxRight < this.state.splitterRight) {
          newState.splitterRight = maxRight
        }
      }
      if (props.uiData.mainAreaSplitters === 2) {
        const minHeight = 240
        const minBottom = Math.min(minHeight, mainArea.clientHeight / 2)
        const maxBottom = mainArea.clientHeight - minBottom
        if (this.state.splitterBottom < minBottom) {
          newState.splitterBottom = minBottom
        } else if (maxBottom < this.state.splitterBottom) {
          newState.splitterBottom = maxBottom
        }
      }
    }
    if (Object.keys(newState).length) {
      this.setState(newState)
    }
  }
  handleRightDrag(ev, ui) {
    const props = this.props
    const splitterRight = this.state.splitterRight - ui.deltaX
    this.setState({ splitterRight: splitterRight })
  }
  handleBottomDrag(ev, ui) {
    const props = this.props
    const splitterBottom = this.state.splitterBottom - ui.deltaY
    this.setState({ splitterBottom: splitterBottom })
  }
  render() {
    const props = this.props
    if (props.uiData.mainAreaSplitters === 2) {
      return (
        <div
          className={
            'brMainArea brSplitters2' +
            (props.className ? ' ' + props.className : '')
          }
          style={props.style || {}}
          ref='mainArea'
        >
          <div
            className='brMainTabsArea brSe'
            style={{
              position: 'absolute',
              right: '0px',
              bottom: '0px',
              height: this.state.splitterBottom + 1 + 'px',
              width: this.state.splitterRight + 1 + 'px',
            }}
          >
            <MainTabs uiData={props.uiData} position='se' />
          </div>
          <div
            className='brMainTabsArea brSouth'
            style={{
              position: 'absolute',
              left: '0px',
              bottom: '0px',
              height: this.state.splitterBottom + 1 + 'px',
              right: this.state.splitterRight + 'px',
            }}
          >
            <MainTabs uiData={props.uiData} position='south' />
          </div>
          <div
            className='brMainTabsArea brEast'
            style={{
              position: 'absolute',
              right: '0px',
              top: '0px',
              bottom: this.state.splitterBottom + 'px',
              width: this.state.splitterRight + 1 + 'px',
            }}
          >
            <MainTabs uiData={props.uiData} position='east' />
          </div>
          <div
            className='brMainTabsArea brCenter'
            style={{
              position: 'absolute',
              left: '0px',
              top: '0px',
              bottom: this.state.splitterBottom + 'px',
              right: this.state.splitterRight + 'px',
            }}
          >
            <MainTabs uiData={props.uiData} position='center' />
          </div>
          <Draggable
            axis='x'
            bounds='parent'
            position={{ x: -this.state.splitterRight, y: 0 }}
            onDrag={this.handleRightDrag.bind(this)}
          >
            <div className='brMainAreaSplitterRight'></div>
          </Draggable>
          <Draggable
            axis='y'
            bounds='parent'
            position={{ x: 0, y: -this.state.splitterBottom }}
            onDrag={this.handleBottomDrag.bind(this)}
          >
            <div className='brMainAreaSplitterBottom'></div>
          </Draggable>
        </div>
      )
    } else if (props.uiData.mainAreaSplitters === 1) {
      return (
        <div
          className={
            'brMainArea brSplitters1' +
            (props.className ? ' ' + props.className : '')
          }
          style={props.style || {}}
          ref='mainArea'
        >
          <div
            className='brMainTabsArea brEast'
            style={{
              position: 'absolute',
              right: '0px',
              top: '0px',
              bottom: '0px',
              width: this.state.splitterRight + 1 + 'px',
            }}
          >
            <MainTabs uiData={props.uiData} position='east se' />
          </div>
          <div
            className='brMainTabsArea brCenter'
            style={{
              position: 'absolute',
              left: '0px',
              top: '0px',
              bottom: '0px',
              right: this.state.splitterRight + 'px',
            }}
          >
            <MainTabs uiData={props.uiData} position='center south' />
          </div>
          <Draggable
            axis='x'
            bounds='parent'
            position={{ x: -this.state.splitterRight, y: 0 }}
            onDrag={this.handleRightDrag.bind(this)}
          >
            <div className='brMainAreaSplitterRight'></div>
          </Draggable>
        </div>
      )
    } else {
      return (
        <div
          className={
            'brMainArea brSplitters0' +
            (props.className ? ' ' + props.className : '')
          }
          style={props.style || {}}
          ref='mainArea'
        >
          <div
            className='brMainTabsArea brCenter'
            style={{
              position: 'absolute',
              left: '0px',
              top: '0px',
              right: '0px',
              bottom: '0px',
            }}
          >
            <MainTabs uiData={props.uiData} position='center east south se' />
          </div>
        </div>
      )
    }
  }
}
