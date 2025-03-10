import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ReactDOM from 'react-dom'

/**
 * ChatFileDownloadButton
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
    let linkClassName = 'brChatFileDownloadButtonLink'
    let linkHref = null
    let linkTitle = ''
    let linkDownload = null
    let linkOnClick = null
    let iconClassName = 'brChatFileDownloadButtonIcon br_bi_icon_download_svg'
    let iconTitle = uawMsgs.LBL_CHAT_FILE_ICON_TOOLTIP
    if (props.message.messageFile.status === Constants.FILE_STATUS_UNACCEPTED) {
      if (!this.state.clicked) {
        linkClassName += ' brEnabled brCancelChatAreaClick'
        linkHref = 'javascript:void(0)'
        linkTitle = props.message.messageFile.name
        linkOnClick = this.handleClick.bind(this)
        iconClassName += ' brEnabled brCancelChatAreaClick'
        iconTitle = props.message.messageFile.name
      }
    } else if (
      props.message.messageFile.inlineImage &&
      props.message.messageFile.inlineImage.url
    ) {
      if (!this.state.clicked) {
        linkClassName += ' brEnabled brCancelChatAreaClick'
        linkTitle = props.message.messageFile.name
        iconClassName += ' brEnabled brCancelChatAreaClick'
        iconTitle = props.message.messageFile.name
      } else {
        linkClassName += ' brUnclickable'
      }
      linkHref = props.message.messageFile.inlineImage.url
      linkDownload = props.message.messageFile.name
      linkOnClick = this.handleClick.bind(this)
    }
    return (
      <span className='brChatFileDownloadButton'>
        <a
          className={linkClassName}
          href={linkHref}
          title={linkTitle}
          download={linkDownload}
          onClick={linkOnClick}
        >
          <span className={iconClassName} title={iconTitle}></span>
          {props.message.messageFile.name}
        </a>
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
