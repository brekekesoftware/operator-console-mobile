import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ReactDOM from 'react-dom'
import ButtonIconic from './ButtonIconic.js'
import ButtonLabeled from './ButtonLabeled.js'
import TextBox from './TextBox.js'

/**
 * StatusDisplayForm
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.statusDisplayUseLaterButton_onClick
 * props.uiData.statusDisplayItemDeleteButton_onClick
 * props.params
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
    }
  }
  componentDidMount() {
    const props = this.props
    const statusMe = props.uiData.ucUiStore.getChatClient().getStatus()
    if (statusMe.display) {
      this.setState({ inputValue: string(statusMe.display) })
    }
    const statusDisplayInput = ReactDOM.findDOMNode(
      this.refs['statusDisplayInput'],
    )
    setTimeout(() => {
      statusDisplayInput.focus()
      statusDisplayInput.select()
    }, 0)
  }
  handleStatusDisplayInputChange(ev) {
    const props = this.props
    this.setState({ inputValue: string(ev.target.value) })
  }
  handleStatusDisplayUseLaterButtonClick(ev) {
    const props = this.props
    const item = string(this.state.inputValue)
    this.setState({ inputValue: '' })
    const statusDisplayInput = ReactDOM.findDOMNode(
      this.refs['statusDisplayInput'],
    )
    setTimeout(() => {
      statusDisplayInput.focus()
    }, 0)
    props.uiData.fire('statusDisplayUseLaterButton_onClick', item)
  }
  handleStatusDisplayClearButtonClick(ev) {
    const props = this.props
    this.setState({ inputValue: '' })
    const statusDisplayInput = ReactDOM.findDOMNode(
      this.refs['statusDisplayInput'],
    )
    setTimeout(() => {
      statusDisplayInput.focus()
    }, 0)
  }
  handleStatusDisplayItemClick(item, ev) {
    const props = this.props
    this.setState({ inputValue: string(item) })
    setTimeout(() => {
      const node = ReactDOM.findDOMNode(this)
      const button =
        node &&
        node.ownerDocument &&
        node.ownerDocument.querySelector &&
        node.ownerDocument.querySelector('button.brModalOKButton')
      if (button && typeof button.click === 'function') {
        button.click()
      }
    }, 0)
  }
  handleStatusDisplayItemEditButtonClick(item, ev) {
    const props = this.props
    ev.stopPropagation()
    this.setState({ inputValue: string(item) })
    const statusDisplayInput = ReactDOM.findDOMNode(
      this.refs['statusDisplayInput'],
    )
    setTimeout(() => {
      statusDisplayInput.focus()
      statusDisplayInput.setSelectionRange(
        string(item).length,
        string(item).length,
      )
    }, 0)
    props.uiData.fire('statusDisplayItemDeleteButton_onClick', item)
  }
  handleStatusDisplayItemDeleteButtonClick(item, ev) {
    const props = this.props
    ev.stopPropagation()
    props.uiData.fire('statusDisplayItemDeleteButton_onClick', item)
  }
  render() {
    const props = this.props
    const settings = props.uiData.ucUiStore.getChatClient().getSettings()
    return (
      <div className='brStatusDisplayForm'>
        <table className='brStatusDisplayTable'>
          <tbody>
            <tr>
              <td>
                <div className='brStatusDisplayInputArea'>
                  <TextBox
                    ref='statusDisplayInput'
                    type='text'
                    className='brStatusDisplayInput'
                    value={this.state.inputValue}
                    onChange={this.handleStatusDisplayInputChange.bind(this)}
                  />
                  <ButtonIconic
                    className='brStatusDisplayUseLaterButton br_bi_icon_download_svg'
                    title={uawMsgs.LBL_STATUS_DISPLAY_USE_LATER_BUTTON_TOOLTIP}
                    onClick={this.handleStatusDisplayUseLaterButtonClick.bind(
                      this,
                    )}
                  />
                  <ButtonIconic
                    className='brStatusDisplayClearButton br_bi_icon_close_svg'
                    title={uawMsgs.LBL_STATUS_DISPLAY_CLEAR_BUTTON_TOOLTIP}
                    onClick={this.handleStatusDisplayClearButtonClick.bind(
                      this,
                    )}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className='brStatusDisplayItems'>
                  {(
                    (settings &&
                      settings.optional_settings &&
                      settings.optional_settings.status_display_history) ||
                    []
                  ).map((item, i) => (
                    <div
                      key={i}
                      className='brStatusDisplayItem'
                      onClick={this.handleStatusDisplayItemClick.bind(
                        this,
                        item,
                      )}
                    >
                      {item}
                      <ButtonIconic
                        className='brStatusDisplayItemEditButton br_bi_icon_edit_svg'
                        title={
                          uawMsgs.LBL_STATUS_DISPLAY_ITEM_EDIT_BUTTON_TOOLTIP
                        }
                        onClick={this.handleStatusDisplayItemEditButtonClick.bind(
                          this,
                          item,
                        )}
                      />
                      <ButtonIconic
                        className='brStatusDisplayItemDeleteButton br_bi_icon_close_svg'
                        title={
                          uawMsgs.LBL_STATUS_DISPLAY_ITEM_DELETE_BUTTON_TOOLTIP
                        }
                        onClick={this.handleStatusDisplayItemDeleteButtonClick.bind(
                          this,
                          item,
                        )}
                      />
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
