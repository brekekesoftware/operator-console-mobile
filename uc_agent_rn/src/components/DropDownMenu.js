import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ReactDOM from 'react-dom'
import MenuBalloonDialog from './MenuBalloonDialog.js'

/**
 * DropDownMenu
 * props.uiData
 * props.uiData.showingDialogVersion
 * props.uiData.showingDialog_update
 * props.className
 * props.dialogClassName
 * props.disabled
 * props.hidden
 * props.style
 * props.text
 * props.onClick
 * props.onShowingDialogUpdate
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showingDialogVersion: null,
    }
  }
  componentDidUpdate() {
    const props = this.props
    const node = ReactDOM.findDOMNode(this)
    const nodeRect =
      node && node.getBoundingClientRect && node.getBoundingClientRect()
    const reactroot =
      node &&
      node.ownerDocument &&
      node.ownerDocument.querySelectorAll &&
      Array.prototype.filter.call(
        node.ownerDocument.querySelectorAll('[data-reactroot]'),
        r => r && r.contains && r.contains(node),
      )[0]
    const dropDownMenuBalloonDialog = ReactDOM.findDOMNode(
      this.refs['dropDownMenuBalloonDialog'],
    )
    if (
      node &&
      nodeRect &&
      reactroot &&
      dropDownMenuBalloonDialog &&
      dropDownMenuBalloonDialog.style
    ) {
      if (
        props.uiData.showingDialogVersion === this.state.showingDialogVersion
      ) {
        if (dropDownMenuBalloonDialog.parentNode === node) {
          reactroot.appendChild(node.removeChild(dropDownMenuBalloonDialog))
          dropDownMenuBalloonDialog.style.position = 'absolute'
          dropDownMenuBalloonDialog.style.left = nodeRect.left + 'px'
          dropDownMenuBalloonDialog.style.top =
            nodeRect.top + nodeRect.height + 'px'
          dropDownMenuBalloonDialog.style.minWidth = nodeRect.width + 'px'
          dropDownMenuBalloonDialog.style.zIndex = '9999'
        }
      } else {
        if (dropDownMenuBalloonDialog.parentNode === reactroot) {
          node.appendChild(reactroot.removeChild(dropDownMenuBalloonDialog))
          dropDownMenuBalloonDialog.style.position = 'absolute'
          dropDownMenuBalloonDialog.style.left = '0px'
          dropDownMenuBalloonDialog.style.top = nodeRect.height + 'px'
          dropDownMenuBalloonDialog.style.minWidth = '0px'
          dropDownMenuBalloonDialog.style.zIndex = '0'
        }
      }
    }
  }
  componentWillUnmount() {
    const props = this.props
    const node = ReactDOM.findDOMNode(this)
    const reactroot =
      node &&
      node.ownerDocument &&
      node.ownerDocument.querySelectorAll &&
      Array.prototype.filter.call(
        node.ownerDocument.querySelectorAll('[data-reactroot]'),
        r => r && r.contains && r.contains(node),
      )[0]
    const dropDownMenuBalloonDialog = ReactDOM.findDOMNode(
      this.refs['dropDownMenuBalloonDialog'],
    )
    if (node && reactroot && dropDownMenuBalloonDialog) {
      if (dropDownMenuBalloonDialog.parentNode === reactroot) {
        node.appendChild(reactroot.removeChild(dropDownMenuBalloonDialog))
      }
    }
  }
  handleClick(ev) {
    const props = this.props
    if (!props.disabled) {
      if (
        props.uiData.showingDialogVersion !== this.state.showingDialogVersion
      ) {
        this.setState({
          showingDialogVersion: ++props.uiData.showingDialogVersion,
        })
        if (typeof props.onShowingDialogUpdate === 'function') {
          props.onShowingDialogUpdate()
        }
        ev.stopPropagation()
        props.uiData.fire('showingDialog_update')
      } else {
        this.setState({ showingDialogVersion: null })
        ev.stopPropagation()
      }
      if (typeof props.onClick === 'function') {
        props.onClick(ev)
      }
    }
  }
  render() {
    const props = this.props
    let title = ''
    if (typeof props.text === 'string') {
      title = props.text
    } else if (
      props.text &&
      props.text.props &&
      typeof props.text.props.children === 'string'
    ) {
      title = props.text.props.children
    } else if (
      props.text &&
      props.text.props &&
      props.text.props.children &&
      typeof props.text.props.children.forEach === 'function'
    ) {
      props.text.props.children.forEach(child => {
        if (typeof child === 'string' && child) {
          title = child
        }
      })
    }
    return (
      <div
        className={
          'brDropDownMenu' +
          (props.uiData.showingDialogVersion === this.state.showingDialogVersion
            ? ' brFocus br_bi_icon_triangle_up_svg'
            : ' br_bi_icon_triangle_down_svg') +
          (props.disabled ? ' brDisabled' : '') +
          (props.hidden ? ' brHidden' : '') +
          (props.className ? ' ' + props.className : '')
        }
        style={props.style || {}}
        title={title}
        onClick={this.handleClick.bind(this)}
      >
        {props.text}
        <MenuBalloonDialog
          ref='dropDownMenuBalloonDialog'
          className={
            'brDropDownMenuBalloonDialog' +
            (props.dialogClassName ? ' ' + props.dialogClassName : '')
          }
          showing={
            props.uiData.showingDialogVersion ===
              this.state.showingDialogVersion && !props.hidden
          }
        >
          {props.children}
        </MenuBalloonDialog>
      </div>
    )
  }
}
