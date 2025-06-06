import React from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import uawMsgs from '../utilities/uawmsgs'
import { int, string } from '../utilities/strings'
import DropDownMenu from './DropDownMenu'
import MenuItem from './MenuItem'
import NameEmbeddedSpan from './NameEmbeddedSpan'

/**
 * BroadcastForm
 * props.uiData
 * props.uiData.ucUiAction
 * props.uiData.ucUiStore
 * props.params
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.initialSelectedBuddyTable = {}
    let mutableSelectedBuddyTable = {}
    let broadcastMark = true
    try {
      const localStoragePreference =
        props.uiData.ucUiStore.getLocalStoragePreference({
          keyList: ['broadcastSelectedBuddyTable', 'broadcastMark'],
        })
      if (localStoragePreference[1] === 'false') {
        broadcastMark = false
      }
      let stringSelectedBuddyTable = localStoragePreference[0]
      this.initialSelectedBuddyTable = JSON.parse(stringSelectedBuddyTable)
      mutableSelectedBuddyTable = JSON.parse(stringSelectedBuddyTable)
    } catch (ex) {}
    this.state = {
      text: '',
      selectedGroupName: '',
      selectedBuddyTable: mutableSelectedBuddyTable,
      broadcastMark: broadcastMark,
    }
    this.textInputRef = React.createRef()
  }

  componentDidMount() {
    // Focus the text input after a short delay
    setTimeout(() => {
      this.textInputRef.current?.focus()
    }, 100)
  }

  componentWillUnmount() {
    const props = this.props
    props.uiData.ucUiAction.setLocalStoragePreference({
      keyValueList: [
        {
          key: 'broadcastSelectedBuddyTable',
          value: JSON.stringify(this.state.selectedBuddyTable),
        },
        { key: 'broadcastMark', value: string(this.state.broadcastMark) },
      ],
    })
  }

  handleBroadcastGroupItemClick(groupName) {
    const props = this.props
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

    // Focus the text input
    setTimeout(() => {
      this.textInputRef.current?.focus()
    }, 100)
  }

  handleBroadcastMarkCheckClick() {
    this.setState({
      broadcastMark: !this.state.broadcastMark,
    })
  }

  handleBroadcastBuddyItemClick(buddy) {
    const selectedBuddyTable = this.state.selectedBuddyTable
    if (!selectedBuddyTable[buddy.tenant]) {
      selectedBuddyTable[buddy.tenant] = {}
    }
    if (!selectedBuddyTable[buddy.tenant][buddy.user_id]) {
      selectedBuddyTable[buddy.tenant][buddy.user_id] = true
    } else {
      delete selectedBuddyTable[buddy.tenant][buddy.user_id]
    }
    this.setState({ selectedBuddyTable: selectedBuddyTable })

    // Focus the text input
    setTimeout(() => {
      this.textInputRef.current?.focus()
    }, 100)
  }

  handleBroadcastTextChange(text) {
    this.setState({ text })
  }

  handleBroadcastTextSubmit() {
    const props = this.props
    try {
      // Simulate clicking the OK button in the modal
      if (props.onSubmit) {
        props.onSubmit(this.state.text)
      }
    } catch (ex) {
      props.uiData.ucUiStore.getLogger().log('warn', ex)
    }
  }

  render() {
    const props = this.props
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
          ((this.initialSelectedBuddyTable[buddyTable[key2].tenant] || {})[key2]
            ? 1
            : 0) -
            ((this.initialSelectedBuddyTable[buddyTable[key1].tenant] || {})[
              key1
            ]
              ? 1
              : 0) ||
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
        }
      })

    return (
      <View style={styles.brBroadcastForm}>
        <View style={styles.brBroadcastTable}>
          <View style={styles.row}>
            <Text style={styles.label}>{uawMsgs.LBL_BROADCAST_GROUP}</Text>
            <View style={styles.dropdownContainer}>
              <DropDownMenu
                uiData={props.uiData}
                style={styles.brBroadcastGroupMenu}
                text={
                  this.state.selectedGroupName ||
                  uawMsgs.LBL_BROADCAST_GROUP_NONE
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
                      style={styles.brBroadcastFormMenuItem}
                      dropDown={true}
                      onPress={() =>
                        this.handleBroadcastGroupItemClick(groupName)
                      }
                    >
                      {groupName || uawMsgs.LBL_BROADCAST_GROUP_NONE}
                    </MenuItem>
                  ))}
              </DropDownMenu>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.brBroadcastBuddiesCaptionArea}>
              <Text style={styles.caption}>
                {uawMsgs.LBL_BROADCAST_BUDDIES}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.brBroadcastMarkArea}
              onPress={() => this.handleBroadcastMarkCheckClick()}
            >
              <View style={styles.brBroadcastMarkCheck}>
                <View
                  style={[
                    styles.checkIcon,
                    this.state.broadcastMark && styles.checkIconSelected,
                  ]}
                />
                <Text style={styles.checkText}>
                  {uawMsgs.LBL_BROADCAST_MARK_CHECK_CAPTION}
                </Text>
                <View
                  style={styles.broadcastIcon}
                  accessibilityLabel={uawMsgs.LBL_BROADCAST_MARK_ICON_TOOLTIP}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <ScrollView style={styles.brBroadcastBuddies}>
              {buddies.map(buddy => (
                <TouchableOpacity
                  key={JSON.stringify({
                    tenant: buddy.tenant,
                    user_id: buddy.user_id,
                  })}
                  style={[
                    styles.brBroadcastBuddyItem,
                    buddy.selected && styles.brBroadcastBuddyItemSelected,
                  ]}
                  onPress={() => this.handleBroadcastBuddyItemClick(buddy)}
                >
                  <NameEmbeddedSpan
                    ucUiStore={props.uiData.ucUiStore}
                    format='{0}'
                    title='{0}'
                    buddy={buddy}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.row}>
            <View style={styles.brBroadcastTextArea}>
              <TextInput
                ref={this.textInputRef}
                style={styles.brBroadcastTextInput}
                placeholder={uawMsgs.LBL_BROADCAST_TEXT_TEXTAREA_PLACEHOLDER}
                value={this.state.text}
                onChangeText={text => this.handleBroadcastTextChange(text)}
                onSubmitEditing={() => this.handleBroadcastTextSubmit()}
                multiline
                textAlignVertical='top'
              />
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  brBroadcastForm: {
    padding: 8,
    paddingHorizontal: 32,
    paddingBottom: 0,
  },
  brBroadcastTable: {
    flex: 1,
  },
  row: {
    padding: 4,
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.3,
    color: '#333',
  },
  dropdownContainer: {
    maxHeight: 300, // From brMenuBalloonDialog
  },
  brBroadcastGroupMenu: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
  },
  brBroadcastFormMenuItem: {
    padding: 8,
  },
  brBroadcastBuddiesCaptionArea: {
    marginBottom: 8,
  },
  caption: {
    fontSize: 13,
    color: '#333',
  },
  brBroadcastMarkArea: {
    alignSelf: 'flex-end', // Equivalent to float: right
  },
  brBroadcastMarkCheck: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 24, // 1.6 * 16
    letterSpacing: 0.3,
    color: '#1A2B2B', // @dark_jungle_green
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkIcon: {
    width: 24,
    height: 24,
    marginLeft: 40, // padding-left equivalent
    marginRight: 8,
  },
  checkIconSelected: {
    backgroundColor: '#007AFF',
  },
  broadcastIcon: {
    width: 24,
    height: 24,
    marginLeft: 40, // padding-left equivalent
  },
  brBroadcastBuddies: {
    width: 300,
    height: 200,
    borderWidth: 1,
    borderColor: '#E5E5E5', // @platinum
    borderRadius: 4,
  },
  brBroadcastBuddyItem: {
    paddingVertical: 8,
    paddingLeft: 44,
    paddingRight: 12,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 24, // 1.6 * 16
    letterSpacing: 0.3,
    color: '#1A2B2B', // @dark_jungle_green
  },
  brBroadcastBuddyItemSelected: {
    backgroundColor: '#F5F5F5', // @isabelline
  },
  brBroadcastTextArea: {
    width: 300,
    height: 70,
    borderWidth: 1,
    borderColor: '#E5E5E5', // @platinum
  },
  brBroadcastTextInput: {
    width: '100%',
    height: '100%',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 24, // 1.6 * 16
    letterSpacing: 0.3,
    padding: 8,
    backgroundColor: 'transparent',
    color: '#333',
  },
  brBroadcastTextInputFocused: {
    borderWidth: 2,
    borderColor: '#40E0D0', // @medium_turquoise
  },
  placeholder: {
    color: '#666666', // @dark_gray
  },
})
