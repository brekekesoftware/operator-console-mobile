import React from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
  Platform,
} from 'react-native'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import DropDownMenu from './DropDownMenu.js'
import MenuItem from './MenuItem.js'
import NameEmbeddedSpan from './NameEmbeddedSpan.js'
import TextBox from './TextBox.js'
import CheckIcon from '../icons/CheckIcon.js'
import SquareIcon from '../icons/SquareIcon.js'
import ErrorIcon from '../icons/ErrorIcon.js'
import CustomTextInput from './CustomTextInput.js'
const colors = {
  white: '#FFFFFF',
  whiteSmoke: '#F5F5F5',
  isabelline: '#EEEEEE',
  platinum: '#E0E0E0',
  darkGray: '#9E9E9E',
  darkJungleGreen: '#212121',
  portlandOrange: '#FF4526',
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    paddingHorizontal: 32,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#f8f8f8',
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 8,
    // width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tableCell: {
    padding: 4,
    flex: 1,
    // borderWidth: 1,
    // borderColor: 'blue',
  },
  tableCellLabel: {
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  tableCellContent: {
    flex: 1,
  },
  subjectInput: {
    width: '100%',
  },
  subjectErrorContainer: {
    width: 200,
    height: 0, // Will be animated
    overflow: 'hidden',
  },
  subjectErrorContainerVisible: {
    height: 20,
  },
  subjectError: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subjectErrorIcon: {
    width: 28,
    height: 0,
    marginRight: 4,
    tintColor: colors.portlandOrange,
  },
  subjectErrorIconVisible: {
    height: 20,
  },
  subjectErrorText: {
    fontSize: 11,
    fontWeight: '400',
    letterSpacing: 0.3,
    color: colors.portlandOrange,
    lineHeight: 20,
  },
  buddiesContainer: {
    width: 300,
    height: 200,
    borderWidth: 1,
    borderColor: colors.platinum,
    borderRadius: 4,
  },
  buddyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingLeft: 44,
    paddingRight: 12,
    flex: 1,
  },
  buddyItemDisabled: {
    color: colors.darkGray,
    backgroundColor: colors.whiteSmoke,
  },
  buddyItemHovered: {
    backgroundColor: colors.isabelline,
  },
  buddyItemHidden: {
    display: 'none',
  },
  buddyItemIcon: {
    position: 'absolute',
    left: 12,
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  buddyItemText: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 20.8, // 1.6 * 13
    letterSpacing: 0.3,
    color: colors.darkJungleGreen,
  },
  buddyItemTextDisabled: {
    color: colors.darkGray,
  },
})

/**
 * ConferenceInviteForm
 * props.uiData
 * props.uiData.ucUiStore
 * props.params
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      subject: uawMsgs.LBL_CONFERENCE_INVITE_SUBJECT_NONE,
      subjectError: '',
      selectedGroupName: '',
      selectedBuddyTable: {},
      hoveredBuddyIndex: null,
    }

    this.errorHeight = new Animated.Value(0)
    this.errorIconHeight = new Animated.Value(0)

    this.textInputRef = React.createRef()
  }

  componentDidMount() {
    // setTimeout(() => {
    //   if (this.textInputRef.current) {
    //     // this.textInputRef.current.focus()
    //     // this.textInputRef.current.select()
    //   }
    // }, 100)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.subjectError !== this.state.subjectError) {
      Animated.parallel([
        Animated.timing(this.errorHeight, {
          toValue: this.state.subjectError ? 20 : 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(this.errorIconHeight, {
          toValue: this.state.subjectError ? 20 : 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start()
    }
  }

  handleSubjectChange = text => {
    this.setState({ subject: string(text) })
  }

  handleSubjectBlur = () => {
    const newState = { subject: this.state.subject }
    if (!newState.subject) {
      newState.subjectError = uawMsgs.MSG_CONFERENCE_INVITE_SUBJECT_REQUIRED
    } else if (this.state.subjectError) {
      newState.subjectError = ''
    }
    this.setState(newState)
  }

  handleSubjectKeyPress = event => {
    if (event.nativeEvent.key === 'Enter') {
      const newState = { subject: this.state.subject }
      if (!newState.subject) {
        newState.subjectError = uawMsgs.MSG_CONFERENCE_INVITE_SUBJECT_REQUIRED
      } else if (this.state.subjectError) {
        newState.subjectError = ''
      }
      this.setState(newState)
    }
  }

  handleGroupSelect = groupName => {
    const { props } = this
    const profile = props.uiData.ucUiStore.getChatClient().getProfile()
    const buddyTable =
      props.uiData.ucUiStore.getBuddyTable()[profile.tenant] || {}
    const selectedBuddyTable = {}

    Object.keys(buddyTable).forEach(key => {
      const buddy = buddyTable[key]
      if (
        !buddy.isMe &&
        buddy.isBuddy &&
        !buddy.isTemporaryBuddy &&
        buddy.group === groupName &&
        groupName
      ) {
        if (!selectedBuddyTable[buddy.tenant]) {
          selectedBuddyTable[buddy.tenant] = {}
        }
        selectedBuddyTable[buddy.tenant][buddy.user_id] = true
      }
    })

    this.setState({
      selectedGroupName: groupName,
      selectedBuddyTable: selectedBuddyTable,
    })
  }

  handleBuddySelect = buddy => {
    const selectedBuddyTable = { ...this.state.selectedBuddyTable }

    if (!selectedBuddyTable[buddy.tenant]) {
      selectedBuddyTable[buddy.tenant] = {}
    }

    if (!selectedBuddyTable[buddy.tenant][buddy.user_id]) {
      selectedBuddyTable[buddy.tenant][buddy.user_id] = true
    } else {
      delete selectedBuddyTable[buddy.tenant][buddy.user_id]
    }

    this.setState({ selectedBuddyTable })
  }

  render() {
    const { props } = this
    const conference =
      props.params &&
      props.params.panelType === 'CONFERENCE' &&
      props.uiData.ucUiStore.getChatClient().getConference(
        string(
          props.uiData.ucUiStore.getChatHeaderInfo({
            chatType: props.params.panelType,
            chatCode: props.params.panelCode,
          }).conf_id,
        ),
      )

    const profile = props.uiData.ucUiStore.getChatClient().getProfile()
    const buddyTable =
      props.uiData.ucUiStore.getBuddyTable()[profile.tenant] || {}
    const groupTable = {}
    groupTable[''] = -1

    const buddies = Object.keys(buddyTable)
      .filter(
        key =>
          !buddyTable[key].isMe &&
          buddyTable[key].isBuddy &&
          !buddyTable[key].isTemporaryBuddy,
      )
      .sort(
        (key1, key2) =>
          (buddyTable[key1].groupIndex >>> 0) -
            (buddyTable[key2].groupIndex >>> 0) ||
          int(buddyTable[key1].buddyIndex) - int(buddyTable[key2].buddyIndex),
      )
      .map(key => {
        const buddy = buddyTable[key]
        const groupName = string(buddy.group)
        if (groupName && !groupTable[groupName]) {
          groupTable[groupName] = int(buddy.groupIndex)
        }
        return {
          tenant: buddy.tenant,
          user_id: buddy.user_id,
          selected:
            this.state.selectedBuddyTable &&
            this.state.selectedBuddyTable[buddy.tenant] &&
            this.state.selectedBuddyTable[buddy.tenant][buddy.user_id],
          disabled:
            conference &&
            conference.user.some(
              u =>
                u.tenant === buddy.tenant &&
                u.user_id === buddy.user_id &&
                (u.conf_status === Constants.CONF_STATUS_INVITED ||
                  u.conf_status === Constants.CONF_STATUS_JOINED),
            ),
          hidden:
            props.uiData.ucUiStore.getChatClient().getBuddyStatus(buddy)
              .status === Constants.STATUS_OFFLINE,
        }
      })

    return (
      <View style={styles.container}>
        <View style={styles.tableRow}>
          <View style={styles.tableCell}>
            <Text style={styles.tableCellLabel}>
              {uawMsgs.LBL_CONFERENCE_INVITE_SUBJECT}
            </Text>
          </View>
          <View style={styles.tableCellContent}>
            <CustomTextInput
              ref={this.textInputRef}
              style={styles.subjectInput}
              value={conference ? conference.subject : this.state.subject}
              disabled={conference}
              onChangeText={this.handleSubjectChange}
              onBlur={this.handleSubjectBlur}
              onKeyPress={this.handleSubjectKeyPress}
            />
            <Animated.View
              style={[
                styles.subjectErrorContainer,
                { height: this.errorHeight },
              ]}
            >
              <View style={styles.subjectError}>
                {/* <Animated.Image
                  source={require('../images/error.png')}
                  style={[
                    styles.subjectErrorIcon,
                    { height: this.errorIconHeight },
                  ]}
                /> */}
                <View style={styles.subjectErrorIcon}>
                  <ErrorIcon />
                </View>
                <Text style={styles.subjectErrorText}>
                  {this.state.subjectError}
                </Text>
              </View>
            </Animated.View>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCell}>
            <Text style={styles.tableCellLabel}>
              {uawMsgs.LBL_CONFERENCE_INVITE_GROUP}
            </Text>
          </View>
          <View style={styles.tableCellContent}>
            <DropDownMenu
              uiData={props.uiData}
              disabled={conference}
              text={
                conference
                  ? ''
                  : this.state.selectedGroupName ||
                    uawMsgs.LBL_CONFERENCE_INVITE_GROUP_NONE
              }
            >
              {Object.keys(groupTable)
                .sort(
                  (groupName1, groupName2) =>
                    groupTable[groupName1] - groupTable[groupName2],
                )
                .map(groupName => (
                  <MenuItem
                    key={groupName}
                    dropDown={true}
                    onPress={() => this.handleGroupSelect(groupName)}
                  >
                    <Text>
                      {groupName || uawMsgs.LBL_CONFERENCE_INVITE_GROUP_NONE}
                    </Text>
                  </MenuItem>
                ))}
            </DropDownMenu>
          </View>
        </View>

        {/* Buddies Label Row */}
        <View style={styles.tableRow}>
          <View style={styles.tableCell}>
            <Text style={styles.tableCellLabel}>
              {uawMsgs.LBL_CONFERENCE_INVITE_BUDDIES}
            </Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCellContent}>
            <ScrollView style={styles.buddiesContainer}>
              {buddies.map((buddy, index) => (
                <TouchableOpacity
                  key={JSON.stringify({
                    tenant: buddy.tenant,
                    user_id: buddy.user_id,
                  })}
                  style={[
                    styles.buddyItem,
                    buddy.hidden && styles.buddyItemHidden,
                    buddy.disabled && styles.buddyItemDisabled,
                    !buddy.disabled &&
                      this.state.hoveredBuddyIndex === index &&
                      styles.buddyItemHovered,
                  ]}
                  onPress={() => {
                    if (!buddy.disabled) {
                      this.handleBuddySelect({
                        tenant: buddy.tenant,
                        user_id: buddy.user_id,
                      })
                    }
                  }}
                  onPressIn={() => this.setState({ hoveredBuddyIndex: index })}
                  onPressOut={() => this.setState({ hoveredBuddyIndex: null })}
                  disabled={buddy.disabled}
                >
                  <View style={styles.buddyItemTextContainer}>
                    {buddy.selected || buddy.disabled ? (
                      <CheckIcon />
                    ) : (
                      <SquareIcon />
                    )}
                  </View>
                  <NameEmbeddedSpan
                    ucUiStore={props.uiData.ucUiStore}
                    format={'{0}'}
                    title={'{0}'}
                    buddy={buddy}
                    textStyle={[
                      styles.buddyItemText,
                      buddy.disabled && styles.buddyItemTextDisabled,
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    )
  }
}
