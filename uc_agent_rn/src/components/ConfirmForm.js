import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ReactDOM from 'react-dom'
import TextBox from './TextBox.js'

/**
 * ConfirmForm
 * props.uiData
 * props.params
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: string(props.params && props.params.text),
    }
  }
  componentDidMount() {
    const props = this.props
    const confirmTextInput = ReactDOM.findDOMNode(this.refs['confirmTextInput'])
    setTimeout(() => {
      confirmTextInput.focus()
    }, 0)
  }
  handleConfirmTextInputChange(ev) {
    const props = this.props
    this.setState({ text: string(ev.target.value) })
  }
  render() {
    const props = this.props
    return (
      <div className='brConfirmForm'>
        <div className='brConfirmMessage'>
          {string(props.params && props.params.message)}
        </div>
        <TextBox
          ref='confirmTextInput'
          className='brConfirmTextInput'
          value={this.state.text}
          type='text'
          placeholder={string(props.params && props.params.placeholder)}
          autoCapitalize={props.params && props.params.autoCapitalize}
          onChange={this.handleConfirmTextInputChange.bind(this)}
        />
      </div>
    )
  }
}
