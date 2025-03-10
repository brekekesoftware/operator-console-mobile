import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ReactDOM from 'react-dom'
import DropDownMenu from './DropDownMenu.js'
import MenuItem from './MenuItem.js'
import TextBox from './TextBox.js'

/**
 * OutgoingWebchatForm
 * props.uiData
 * props.params
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    const defaultReplyType = string(
      props &&
        props.params &&
        props.params.replyTypes &&
        props.params.replyTypes[0],
    )
    this.state = {
      replyType: defaultReplyType,
      serviceId: string(
        props &&
          props.params &&
          props.params.webchatServiceIds &&
          props.params.webchatServiceIds[defaultReplyType] &&
          props.params.webchatServiceIds[defaultReplyType][0],
      ),
      text: '',
    }
  }
  componentDidMount() {
    const props = this.props
    const outgoingWebchatTextInput = ReactDOM.findDOMNode(
      this.refs['outgoingWebchatTextInput'],
    )
    setTimeout(() => {
      outgoingWebchatTextInput.focus()
    }, 0)
  }
  handleOutgoingWebchatReplyTypeItemClick(replyType, ev) {
    const props = this.props
    if (this.state.replyType !== replyType) {
      this.setState({
        replyType: replyType,
        serviceId: string(
          props &&
            props.params &&
            props.params.webchatServiceIds &&
            props.params.webchatServiceIds[replyType] &&
            props.params.webchatServiceIds[replyType][0],
        ),
      })
    }
  }
  handleOutgoingWebchatServiceIdItemClick(serviceId, ev) {
    const props = this.props
    if (this.state.serviceId !== serviceId) {
      this.setState({
        serviceId: serviceId,
      })
    }
  }
  handleOutgoingWebchatTextInputChange(ev) {
    const props = this.props
    this.setState({ text: string(ev.target.value) })
  }
  render() {
    const props = this.props
    const replyTypes = (props && props.params && props.params.replyTypes) || []
    const webchatServiceIds =
      (props &&
        props.params &&
        props.params.webchatServiceIds &&
        props.params.webchatServiceIds[this.state.replyType]) ||
      []
    return (
      <div className='brOutgoingWebchatForm'>
        <table className='brOutgoingWebchatTable'>
          <tbody>
            <tr>
              <td>{uawMsgs.LBL_OUTGOING_WEBCHAT_REPLY_TYPE}</td>
              <td>
                <DropDownMenu
                  uiData={props.uiData}
                  className='brOutgoingWebchatReplyTypeMenu'
                  text={this.state.replyType}
                >
                  {replyTypes.map(replyType => (
                    <MenuItem
                      key={replyType}
                      className='brOutgoingWebchatFormMenuItem brOutgoingWebchatReplyTypeItem'
                      dropDown={true}
                      onClick={this.handleOutgoingWebchatReplyTypeItemClick.bind(
                        this,
                        replyType,
                      )}
                    >
                      {replyType}
                    </MenuItem>
                  ))}
                </DropDownMenu>
              </td>
            </tr>
            <tr style={webchatServiceIds.length < 2 ? { display: 'none' } : {}}>
              <td>{uawMsgs.LBL_OUTGOING_WEBCHAT_SERVICE_ID}</td>
              <td>
                <DropDownMenu
                  uiData={props.uiData}
                  className='brOutgoingWebchatServiceIdMenu'
                  text={this.state.serviceId}
                >
                  {webchatServiceIds.map(serviceId => (
                    <MenuItem
                      key={serviceId}
                      className='brOutgoingWebchatFormMenuItem brOutgoingWebchatServiceIdItem'
                      dropDown={true}
                      onClick={this.handleOutgoingWebchatServiceIdItemClick.bind(
                        this,
                        serviceId,
                      )}
                    >
                      {serviceId}
                    </MenuItem>
                  ))}
                </DropDownMenu>
              </td>
            </tr>
            <tr>
              <td colSpan='2'>
                <TextBox
                  ref='outgoingWebchatTextInput'
                  className='brOutgoingWebchatTextInput'
                  value={this.state.text}
                  type='text'
                  placeholder={uawMsgs.LBL_OUTGOING_WEBCHAT_TEXT_PLACEHOLDER}
                  autoCapitalize='off'
                  onChange={this.handleOutgoingWebchatTextInputChange.bind(
                    this,
                  )}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
