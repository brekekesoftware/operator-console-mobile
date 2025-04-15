import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import WebchatQueueTable from './WebchatQueueTable.js'
import ToolbarButton from './ToolbarButton.js'
import BalloonDialog from './BalloonDialog.js'
import DialogResizableBox from './DialogResizableBox.js'

const colors = {
  mantis: '#74C365', // Color for link
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  icon: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },
  iconOverlay: {
    position: 'absolute',
    right: 2,
    bottom: 2,
    width: 16,
    height: 16,
    zIndex: 1,
  },
  progressOverlay: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 20,
    height: 20,
    zIndex: 1,
  },
  resizableBox: {
    paddingBottom: 17,
  },
  resizableHandle: {
    bottom: -2,
    right: -2,
  },
  webchatQueueInBalloon: {
    width: '100%',
    height: '100%',
    // ScrollView will handle overflow
  },
  showAllLink: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 24, // 1.6 * 15
    letterSpacing: 0.3,
    color: colors.mantis,
  },
  overlayImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
})

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

  handleWebchatQueueButtonPress = () => {
    const { props } = this
    if (props.uiData.showingDialogVersion !== this.state.showingDialogVersion) {
      this.setState({
        showingDialogVersion: ++props.uiData.showingDialogVersion,
      })
      props.uiData.fire('showingDialog_update')
      props.uiData.fire('webchatQueueButton_onClick', { visible: true })
    } else {
      props.uiData.fire('webchatQueueButton_onClick', { visible: false })
      props.uiData.window_onclick()
    }
  }

  getIconSource = iconClass => {
    switch (iconClass) {
      case 'brIconWebchatQueueWarning':
        return require('../images/webchatqueue_warning.gif')
      case 'brIconWebchatQueueAlert':
        return require('../images/webchatqueue_alert.gif')
      case 'brIconWebchatQueueStarting':
      case 'brIconWebchatQueueOffline':
      default:
        return require('../images/webchatqueue.png')
    }
  }

  render() {
    const { props } = this
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
            ? 'brIconWebchatQueueAlert'
            : waitingCount >= 1
              ? 'brIconWebchatQueueWarning'
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
    console.log(
      '#Duy Phan console this.state.showingDialogVersion',
      this.state.showingDialogVersion,
      props.uiData.showingDialogVersion,
    )
    return (
      <View style={styles.container}>
        <BalloonDialog
          shows={
            props.uiData.showingDialogVersion ===
            this.state.showingDialogVersion
          }
          indicator={true}
          anchor='left'
        >
          <DialogResizableBox
            style={styles.resizableBox}
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
            <View style={styles.webchatQueueInBalloon}>
              <WebchatQueueTable
                uiData={props.uiData}
                filter={
                  props.uiData.configurations.queuePanel
                    ? 'INVITED_WEBCHAT'
                    : null
                }
                resizerName='webchatQueueInBalloon'
              />
            </View>
            {props.uiData.configurations.queuePanel && (
              <TouchableOpacity
                style={styles.showAllLink}
                onPress={() =>
                  props.uiData.fire('webchatQueueShowAllLink_onClick')
                }
              >
                <Text>{uawMsgs.LBL_WEBCHAT_QUEUE_SHOW_ALL_LINK}</Text>
              </TouchableOpacity>
            )}
          </DialogResizableBox>
        </BalloonDialog>

        <View>
          <ToolbarButton
            iconSource={this.getIconSource(iconClass)}
            title={title}
            disabled={props.disabled}
            dropDown={true}
            onPress={this.handleWebchatQueueButtonPress}
          />
          {iconClass === 'brIconWebchatQueueStarting' && (
            <View style={styles.progressOverlay}>
              <Image
                style={styles.overlayImage}
                source={require('../images/progress.gif')}
              />
            </View>
          )}
          {iconClass === 'brIconWebchatQueueOffline' && (
            <View style={styles.iconOverlay}>
              <Image
                style={styles.overlayImage}
                source={require('../images/delete.png')}
              />
            </View>
          )}
        </View>
      </View>
    )
  }
}
