import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import WebchatQueueTable from './WebchatQueueTable.js'
import ToolbarButton from './ToolbarButton.js'
import BalloonDialog from './BalloonDialog.js'
import DialogResizableBox from './DialogResizableBox.js'

/**
 * WebchatQueueButton
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.configurations
 * props.uiData.showingDialogVersion
 * props.uiData.dialogSizeTable
 * props.uiData.showingDialog_update
 * props.uiData.webchatQueueButton_onClick
 * props.uiData.webchatQueueShowAllLink_onClick
 * props.uiData.webchatQueueResizableBox_onResizeStop
 * props.disabled
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showingDialogVersion: null,
    }
  }
  handleWebchatQueueButtonClick(ev) {
    const props = this.props
    if (props.uiData.showingDialogVersion !== this.state.showingDialogVersion) {
      this.setState({
        showingDialogVersion: ++props.uiData.showingDialogVersion,
      })
      ev.stopPropagation()
      props.uiData.fire('showingDialog_update')
      props.uiData.fire('webchatQueueButton_onClick', { visible: true }, ev)
    } else {
      props.uiData.fire('webchatQueueButton_onClick', { visible: false }, ev)
    }
  }
  render() {
    const props = this.props
    const waitingCount = props.uiData.ucUiStore
      .getWebchatQueueList()
      .filter(webchatQueue => {
        const conf_id = webchatQueue.conf_id
        const conference = props.uiData.ucUiStore
          .getChatClient()
          .getConference(conf_id)
        return conference.conf_status === Constants.CONF_STATUS_INVITED_WEBCHAT
      }).length
    const signInStatus = props.uiData.ucUiStore.getSignInStatus()
    const lastSignOutReason = props.uiData.ucUiStore.getLastSignOutReason()
    const iconClass =
      signInStatus <= 1
        ? 'brIconWebchatQueueOffline'
        : signInStatus === 2
          ? 'brIconWebchatQueueStarting'
          : waitingCount >= 2
            ? 'brIconWebchatQueueAlert' // TODO: yano threshold
            : waitingCount >= 1
              ? 'brIconWebchatQueueWarning' // TODO: yano threshold
              : 'brIconWebchatQueue'
    const title =
      signInStatus === 2
        ? uawMsgs.LBL_WEBCHAT_QUEUE_BUTON_STARTING_TOOLTIP
        : signInStatus <= 1 && lastSignOutReason.message
          ? lastSignOutReason.message + '(' + lastSignOutReason.code + ')'
          : signInStatus <= 1
            ? uawMsgs.LBL_WEBCHAT_QUEUE_BUTON_OFFLINE_TOOLTIP
            : uawMsgs.LBL_WEBCHAT_QUEUE_BUTON_TOOLTIP
    if (!props.uiData.dialogSizeTable['webchatqueue']) {
      props.uiData.dialogSizeTable['webchatqueue'] = {
        width: 270,
        height: 90,
      }
    }
    return (
      <span className='brWebchatQueueButton'>
        <BalloonDialog
          shows={
            props.uiData.showingDialogVersion ===
            this.state.showingDialogVersion
          }
          indicator={true}
          anchor='left'
        >
          <DialogResizableBox
            className='brWebchatQueueResizableBox'
            initialWidth={props.uiData.dialogSizeTable['webchatqueue'].width}
            initialHeight={props.uiData.dialogSizeTable['webchatqueue'].height}
            resizableOpts={{
              minConstraints: [200, 50],
              maxConstraints: [600, 600],
            }}
            ownerDocument={props.uiData.ownerDocument}
            onStop={props.uiData.fire.bind(
              props.uiData,
              'webchatQueueResizableBox_onResizeStop',
            )}
          >
            <div className='brWebchatQueueInBalloon'>
              <WebchatQueueTable
                uiData={props.uiData}
                filter={
                  props.uiData.configurations.queuePanel
                    ? 'INVITED_WEBCHAT'
                    : null
                }
                resizerName='webchatQueueInBalloon'
              />
            </div>
            <a
              className='brWebchatQueueShowAllLink'
              href='javascript:void(0)'
              style={
                props.uiData.configurations.queuePanel
                  ? {}
                  : { display: 'none' }
              }
              title={uawMsgs.LBL_WEBCHAT_QUEUE_SHOW_ALL_LINK_TOOLTIP}
              onClick={props.uiData.fire.bind(
                props.uiData,
                'webchatQueueShowAllLink_onClick',
              )}
            >
              {uawMsgs.LBL_WEBCHAT_QUEUE_SHOW_ALL_LINK}
            </a>
          </DialogResizableBox>
        </BalloonDialog>
        <ToolbarButton
          iconClassName={iconClass}
          title={title}
          disabled={props.disabled}
          dropDown={true}
          onClick={this.handleWebchatQueueButtonClick.bind(this)}
        />
      </span>
    )
  }
}
