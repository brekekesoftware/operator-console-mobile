import React from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native'
import uawMsgs from '../utilities/uawmsgs'
import { int } from '../utilities/strings'
import NameEmbeddedSpan from './NameEmbeddedSpan'
import StatusIcon from './StatusIcon'
import ToolbarButton from './ToolbarButton'
import BalloonDialog from './BalloonDialog'

/**
 * BuddylistButton
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.showingDialogVersion
 * props.uiData.showingDialog_update
 * props.uiData.buddylistButton_onClick
 * props.uiData.buddylistBuddy_onClick
 * props.disabled
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showingDialogVersion: null,
    }
  }

  handleBuddylistButtonClick(ev) {
    const props = this.props
    if (props.uiData.showingDialogVersion !== this.state.showingDialogVersion) {
      this.setState({
        showingDialogVersion: ++props.uiData.showingDialogVersion,
      })
      props.uiData.fire('showingDialog_update')
      props.uiData.fire('buddylistButton_onClick', { visible: true }, ev)
    } else {
      props.uiData.fire('buddylistButton_onClick', { visible: false }, ev)
      props.uiData.window_onclick()
    }
  }

  render() {
    const props = this.props
    const profile = props.uiData.ucUiStore.getChatClient().getProfile()
    const buddyTable =
      props.uiData.ucUiStore.getBuddyTable()[profile.tenant] || {}
    const myUcCimUserType = int(props.uiData.ucUiStore.getUcCimUserType())
    const filteredBuddyList = []

    for (let user_id in buddyTable) {
      if (
        !buddyTable[user_id].isMe &&
        buddyTable[user_id].isBuddy &&
        !buddyTable[user_id].isTemporaryBuddy
      ) {
        filteredBuddyList.push(buddyTable[user_id])
      }
    }

    const buddyNodes = filteredBuddyList.sort().map(buddy => {
      const currentBuddyStatus = props.uiData.getCurrentBuddyStatus(buddy) || {}
      console.log('#Duy Phan console buddy', buddy)
      return (
        <TouchableOpacity
          key={buddy.user_id}
          style={styles.brBuddylistBuddy}
          onPress={() => props.uiData.fire('buddylistBuddy_onClick', buddy)}
        >
          <View style={styles.buddyContent}>
            <StatusIcon
              style={styles.brStatusIcon}
              status={currentBuddyStatus.status}
              degree={currentBuddyStatus.degree}
            />
            <NameEmbeddedSpan
              style={styles.brNameEmbeddedSpan}
              ucUiStore={props.uiData.ucUiStore}
              format='{0}'
              title='{0}'
              buddy={buddy}
            />
          </View>
        </TouchableOpacity>
      )
    })

    return (
      <View style={styles.brBuddylistButton}>
        <BalloonDialog
          shows={
            props.uiData.showingDialogVersion ===
            this.state.showingDialogVersion
          }
          anchor='left'
        >
          <ScrollView style={styles.brBuddylistArea}>{buddyNodes}</ScrollView>
        </BalloonDialog>
        <ToolbarButton
          iconStyle={styles.brIconBuddylist}
          iconSource={require('../images/buddylist.png')}
          title={uawMsgs.LBL_BUDDYLIST_BUTON_TOOLTIP}
          disabled={
            props.disabled ||
            buddyNodes.length === 0 ||
            (int(
              props.uiData.ucUiStore.getOptionalSetting({
                key: 'buddylist_button_type',
              }),
            ) &
              myUcCimUserType) ===
              myUcCimUserType
          }
          dropDown={true}
          onPress={this.handleBuddylistButtonClick.bind(this)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  brBuddylistButton: {
    // Container styles
    zIndex: 1,
  },
  brIconBuddylist: {
    // We'll need to import the image using require
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  brBuddylistArea: {
    // maxHeight: '50%', // 50vh converted to percentage
  },
  brBuddylistBuddy: {
    padding: 14,
    paddingHorizontal: 16,
  },
  buddyContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brStatusIcon: {
    ...Platform.select({
      ios: {
        height: 10,
        width: 10,
      },
      android: {
        height: 10,
        width: 10,
      },
      web: {
        marginRight: 5,
      },
    }),
  },
  brNameEmbeddedSpan: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 24, // 1.6 * 15
    letterSpacing: 0.3,
    color: '#1A2B2B', // @dark_jungle_green
  },
  // Pressed state to simulate hover
  brBuddylistBuddyPressed: {
    backgroundColor: '#F5F5F5', // @isabelline
  },
})
