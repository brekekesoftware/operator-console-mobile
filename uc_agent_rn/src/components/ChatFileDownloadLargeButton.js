import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ReactDOM from 'react-dom'

/**
 * ChatFileDownloadLargeButton
 * props.uiData
 * props.uiData.ucUiAction
 * props.message
 * props.message.messageFile
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clicked: false,
    }
  }
  handleClick(ev) {
    const props = this.props
    if (
      this.state.clicked ||
      props.message.messageFile.status !== Constants.FILE_STATUS_UNACCEPTED
    ) {
      this.setState({ clicked: true })
      return
    }
    this.setState({ clicked: true })
    // acceptFile
    props.uiData.ucUiAction.acceptFile({
      file_id: props.message.messageFile.file_id,
      form: ReactDOM.findDOMNode(this.refs.form),
    })
    this.render()
  }
  render() {
    const props = this.props
    let className = 'brChatFileDownloadLargeButton'
    let title = uawMsgs.LBL_CHAT_FILE_ICON_TOOLTIP
    let onClick = null
    if (props.message.messageFile.status === Constants.FILE_STATUS_UNACCEPTED) {
      if (!this.state.clicked) {
        className += ' brEnabled brCancelChatAreaClick'
        title = props.message.messageFile.name
        onClick = this.handleClick.bind(this)
      }
    } else if (
      props.message.messageFile.status === Constants.FILE_STATUS_TRANSFERRING
    ) {
      className += ' brReadonly'
      if (props.message.messageFile.progress === 0) {
        className += ' brAnimation1'
      } else if (props.message.messageFile.progress <= 98) {
        className += ' brAnimation2'
      }
    }
    return (
      <span className={className} title={title} onClick={onClick}>
        <span className='brChatFileDownloadLargeButtonIcon br_bi_icon_file_svg'>
          <span className='brChatFileDownloadLargeButtonIconInner br_bi_icon_download_svg'></span>
        </span>
        <span style={{ display: 'none' }}>
          <form
            ref='form'
            target={'iframe_' + props.message.messageFile.file_id}
          ></form>
          <iframe name={'iframe_' + props.message.messageFile.file_id}></iframe>
        </span>
      </span>
    )
  }
}
