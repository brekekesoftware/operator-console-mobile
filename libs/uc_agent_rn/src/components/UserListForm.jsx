import React from 'react'
import uawMsgs from '../utilities/uawmsgs'
import Constants from '../utilities/constants'
import { int, string } from '../utilities/strings'
import ReactDOM from 'react-dom'
import ButtonIconic from './ButtonIconic'
import ButtonLabeled from './ButtonLabeled'
import DndableSafe from './DndableSafe'
import DropDownMenu from './DropDownMenu'
import MenuBalloonDialog from './MenuBalloonDialog'
import MenuItem from './MenuItem'
import TextBox from './TextBox'
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native'
import AddFolderIcon from '../icons/AddFolderIcon'
import MoreIcon from '../icons/MoreIcon'
import ChevronUpIcon from '../icons/ChevronUpIcon'
import ChevronDownIcon from '../icons/ChevronDownIcon'
import CheckIcon from '../icons/CheckIcon'
import SquareIcon from '../icons/SquareIcon'

/**
 * UserListForm
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.showingDialogVersion
 * props.uiData.showingDialog_update
 * props.params
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.userListCreateGroupInputRef = React.createRef()
    const buddylist = JSON.parse(
      JSON.stringify((props && props.params && props.params.buddylist) || {}),
    )
    this.state = {
      buddylist: buddylist,
      usedCount: (buddylist.user || []).filter(
        buddylist.screened
          ? buddy => buddy && buddy.user_id && !buddy.delete
          : buddy => buddy && buddy.user_id,
      ).length,
      saveOrder: false,
      selectedSortOrderKey: '_name',
      expandedGroupIds: {},
      groupMenuShowingDialogVersion: null,
      groupMenuShowingDialogId: null,
      createGroupShowingDialogVersion: null,
    }
  }
  handleUserListAllUsersCheckClick(ev) {
    const props = this.props
    if (props.params && props.params.allUsersCheckDisabled) {
      return
    }
    const buddylist = this.state.buddylist
    buddylist.screened = !Boolean(buddylist.screened)
    this.setState({
      buddylist: buddylist,
      usedCount: (buddylist.user || []).filter(
        buddylist.screened
          ? buddy => buddy && buddy.user_id && !buddy.delete
          : buddy => buddy && buddy.user_id,
      ).length,
    })
  }
  handleUserListSaveOrderCheckClick(ev) {
    const props = this.props
    if (props.params && props.params.buddy_mode === Constants.BUDDY_MODE_AUTO) {
      return
    }
    const saveOrder = !Boolean(this.state.saveOrder)
    const selectedSortOrderKey = saveOrder ? '_group' : '_name'
    this.setState({
      saveOrder: saveOrder,
      selectedSortOrderKey: selectedSortOrderKey,
    })
  }
  handleUserListSortOrderGroupCheckClick(ev) {
    const props = this.props
    this.setState({
      selectedSortOrderKey:
        this.state.selectedSortOrderKey === '_group' ? '_name' : '_group',
    })
  }
  handleUserListSortOrderItemClick(key, ev) {
    const props = this.props
    this.setState({
      selectedSortOrderKey: key,
    })
  }
  handleUserListDrop(dropTargetInfo, ev) {
    const props = this.props
    if (!(dropTargetInfo && ev && ev.dragSourceInfo)) {
      props.uiData.ucUiStore
        .getLogger()
        .log('warn', 'invalid dragSourceInfo, dropTargetInfo')
      return
    }
    if (
      !(this.state.saveOrder && this.state.selectedSortOrderKey === '_group')
    ) {
      props.uiData.ucUiStore
        .getLogger()
        .log('warn', 'invalid saveOrder, selectedSortOrderKey')
      return
    }
    // parameters
    const dragSourceInfoType = ev.dragSourceInfo.dragSourceInfoType
    const dragSourceInfoCode = ev.dragSourceInfo.dragSourceInfoCode
    const dropTargetInfoType = dropTargetInfo.dropTargetInfoType
    const dropTargetInfoCode = dropTargetInfo.dropTargetInfoCode

    // get buddylist
    const buddylist = this.state.buddylist
    const buddies = buddylist.user
    if (!buddies || !buddies.length) {
      props.uiData.ucUiStore.getLogger().log('warn', 'buddylist.user is empty')
      return
    }

    // get sourceBuddy, targetBuddy
    let sourceIndex = -1
    let sourceBuddy = null
    let targetIndex = -1
    let targetBuddy = null
    let sourcePredicate = null
    if (dragSourceInfoType === 'userListBuddyItem') {
      try {
        const dragSourceInfoCodeObject = JSON.parse(dragSourceInfoCode) || {}
        sourcePredicate = buddy =>
          buddy &&
          buddy.user_id &&
          buddy.tenant === dragSourceInfoCodeObject.tenant &&
          buddy.user_id === dragSourceInfoCodeObject.user_id
      } catch (ex) {}
    } else if (dragSourceInfoType === 'userListGroupArea') {
      sourcePredicate = buddy =>
        buddy && buddy.id && buddy.id === dragSourceInfoCode
    }
    let targetPredicate = null
    if (dropTargetInfoType === 'userListBuddyItem') {
      try {
        const dropTargetInfoCodeObject = JSON.parse(dropTargetInfoCode) || {}
        targetPredicate = buddy =>
          buddy &&
          buddy.user_id &&
          buddy.tenant === dropTargetInfoCodeObject.tenant &&
          buddy.user_id === dropTargetInfoCodeObject.user_id
      } catch (ex) {}
    } else if (dropTargetInfoType === 'userListGroupArea') {
      targetPredicate = buddy =>
        buddy && buddy.id && buddy.id === dropTargetInfoCode
    }
    buddies.forEach((buddy, index) => {
      if (sourcePredicate && sourcePredicate(buddy)) {
        sourceIndex = index
        sourcePredicate = null
      }
      if (targetPredicate && targetPredicate(buddy)) {
        targetIndex = index
        targetPredicate = null
      }
    })
    sourceBuddy = buddies[sourceIndex]
    if (!sourceBuddy) {
      props.uiData.ucUiStore.getLogger().log('warn', 'sourceBuddy not found')
      return
    }
    targetBuddy = buddies[targetIndex]
    if (!targetBuddy) {
      if (
        dragSourceInfoType === 'userListBuddyItem' &&
        dropTargetInfoType === 'userListGroupArea'
      ) {
        targetBuddy = { id: '' } // root group
      } else {
        props.uiData.ucUiStore.getLogger().log('warn', 'targetBuddy not found')
        return
      }
    }

    // edit buddylist
    if (
      (dragSourceInfoType === 'userListBuddyItem' &&
        dropTargetInfoType === 'userListBuddyItem') ||
      (dragSourceInfoType === 'userListGroupArea' &&
        dropTargetInfoType === 'userListGroupArea')
    ) {
      if (sourceIndex < targetIndex) {
        // drag downward
        const newTargetIndex = targetIndex - 1 // after remove source
        if (sourceBuddy.group === targetBuddy.group) {
          // drag downward in the same group
          // move sourceBuddy after targetBuddy
          buddylist.user.splice(
            newTargetIndex + 1,
            0,
            buddylist.user.splice(sourceIndex, 1)[0],
          )
        } else {
          // drag downward to another group
          // move sourceBuddy before targetBuddy
          buddylist.user.splice(
            newTargetIndex,
            0,
            buddylist.user.splice(sourceIndex, 1)[0],
          )
        }
      } else {
        // drag upward
        // move sourceBuddy before targetBuddy
        buddylist.user.splice(
          targetIndex,
          0,
          buddylist.user.splice(sourceIndex, 1)[0],
        )
      }
      sourceBuddy.group = targetBuddy.group
    } else if (
      dragSourceInfoType === 'userListBuddyItem' &&
      dropTargetInfoType === 'userListGroupArea'
    ) {
      // move sourceBuddy to the last child of targetBuddy
      buddylist.user.push(buddylist.user.splice(sourceIndex, 1)[0])
      sourceBuddy.group = targetBuddy.id
    }

    // render buddylist
    this.setState({
      buddylist: buddylist,
    })
  }
  handleUserListBuddyItemClick(buddy, ev) {
    const props = this.props
    const buddylist = this.state.buddylist
    if (buddylist.screened) {
      ;(buddylist.user || []).some(b => {
        if (b && b.tenant === buddy.tenant && b.user_id === buddy.user_id) {
          if (b.delete) {
            delete b.delete
          } else {
            b.delete = true
          }
          return true
        }
      })
      this.setState({
        buddylist: buddylist,
        usedCount: (buddylist.user || []).filter(
          buddylist.screened
            ? buddy => buddy && buddy.user_id && !buddy.delete
            : buddy => buddy && buddy.user_id,
        ).length,
      })
    }
  }
  handleUserListGroupItemClick(buddy, ev) {
    const props = this.props
    const expandedGroupIds = this.state.expandedGroupIds
    const id = buddy && buddy.id
    if (expandedGroupIds[id]) {
      delete expandedGroupIds[id]
    } else {
      expandedGroupIds[id] = true
    }
    this.setState({ expandedGroupIds: expandedGroupIds })
  }
  handleUserListGroupMenuButtonClick(buddy, ev) {
    const props = this.props
    const id = buddy && buddy.id
    if (
      props.uiData.showingDialogVersion !==
        this.state.groupMenuShowingDialogVersion ||
      id !== this.state.groupMenuShowingDialogId
    ) {
      this.setState({
        groupMenuShowingDialogVersion: ++props.uiData.showingDialogVersion,
        groupMenuShowingDialogId: id,
      })
      ev.stopPropagation()
      props.uiData.fire('showingDialog_update')
    }
  }
  handleUserListGroupCheckAllMenuItemClick(buddies, check, ev) {
    const props = this.props
    const buddylist = this.state.buddylist
    if (buddylist.screened) {
      buddies.some(buddy => {
        if (buddy.user_id) {
          ;(buddylist.user || []).some(b => {
            if (b && b.tenant === buddy.tenant && b.user_id === buddy.user_id) {
              if (check) {
                delete b.delete
              } else {
                b.delete = true
              }
              return true
            }
          })
        } else {
          return true // next group
        }
      })
      this.setState({
        buddylist: buddylist,
        usedCount: (buddylist.user || []).filter(
          buddylist.screened
            ? buddy => buddy && buddy.user_id && !buddy.delete
            : buddy => buddy && buddy.user_id,
        ).length,
      })
    }
  }
  handleUserListGroupRemoveGroupMenuItemClick(id, ev) {
    const props = this.props
    if (
      !(this.state.saveOrder && this.state.selectedSortOrderKey === '_group')
    ) {
      return
    }
    const buddylist = this.state.buddylist
    for (
      let i = int(buddylist && buddylist.user && buddylist.user.length) - 1;
      i >= 0;
      i--
    ) {
      if (buddylist.user[i].id === id) {
        buddylist.user.splice(i, 1)
      } else if (buddylist.user[i].group === id) {
        buddylist.user[i].group = ''
      }
    }
    this.setState({
      buddylist: buddylist,
    })
  }
  handleUserListCreateGroupButtonClick(ev) {
    const props = this.props
    if (
      props.uiData.showingDialogVersion !==
      this.state.createGroupShowingDialogVersion
    ) {
      this.setState({
        createGroupShowingDialogVersion: ++props.uiData.showingDialogVersion,
      })
      ev.stopPropagation()
      props.uiData.fire('showingDialog_update')

      setTimeout(() => {
        if (this.userListCreateGroupInputRef.current) {
          this.userListCreateGroupInputRef.current.focus()
        }
      }, 0)
    }
  }
  handleUserListCreateGroupInputKeyDown(ev) {
    const props = this.props
    if (ev && ev.keyCode === 13 && !ev.shiftKey) {
      this.handleUserListCreateGroupSubmitButtonClick(ev)
      ev.stopPropagation()
    } else if (ev && ev.keyCode === 27 && !ev.shiftKey) {
      this.setState({
        createGroupShowingDialogVersion: null,
      })
      ev.stopPropagation()
    }
  }
  handleUserListCreateGroupSubmitButtonClick(ev) {
    const props = this.props
    const input = this.userListCreateGroupInputRef.current
    const id = string(input && input.value)
    const buddylist = this.state.buddylist
    if (
      this.state.saveOrder &&
      this.state.selectedSortOrderKey === '_group' &&
      id &&
      !buddylist.user.some(buddy => buddy && buddy.id === id)
    ) {
      buddylist.user.push({
        id: id,
        name: id,
        group: '',
      })
      this.setState({
        buddylist: buddylist,
        createGroupShowingDialogVersion: null,
      })
      if (input) {
        input.clear()
      }
    } else {
      setTimeout(() => {
        if (input) {
          input.focus()
        }
      }, 0)
    }
  }
  sortBuddylist(buddies, sortOrderKey) {
    const props = this.props
    if (sortOrderKey === '_name') {
      buddies = buddies.sort((a, b) => {
        const name_a = string(a && (a.name || a.user_id))
        const name_b = string(b && (b.name || b.user_id))
        return name_a.localeCompare(name_b)
      })
    } else if (sortOrderKey === '_user_id') {
      buddies = buddies.sort((a, b) => {
        const user_id_a = string(a && a.user_id)
        const user_id_b = string(b && b.user_id)
        return user_id_a.localeCompare(user_id_b)
      })
    } else if (sortOrderKey === '_group') {
      const groupPositions = {}
      buddies = buddies.sort((a, b) => {
        const group_a = a && a.user_id ? string(a.group) : string(a && a.id)
        groupPositions[group_a] =
          groupPositions[group_a] ||
          buddies.findIndex(g => g.id === group_a) + 1 ||
          buddies.length + 1
        const group_b = b && b.user_id ? string(b.group) : string(b && b.id)
        groupPositions[group_b] =
          groupPositions[group_b] ||
          buddies.findIndex(g => g.id === group_b) + 1 ||
          buddies.length + 1
        if (groupPositions[group_a] !== groupPositions[group_b]) {
          return groupPositions[group_a] - groupPositions[group_b]
        } else {
          return !a.user_id && b.user_id ? -1 : a.user_id && !b.user_id ? 1 : 0
        }
      })
    } else {
      const buddiesOrg =
        ((props && props.params && props.params.buddylist) || {}).user || []
      const orgPositions = {}
      buddies = buddies.sort((a, b) => {
        const key_a = a && a.user_id + a.id
        orgPositions[key_a] =
          orgPositions[key_a] ||
          buddiesOrg.findIndex(
            buddy => (buddy && buddy.user_id + buddy.id) === key_a,
          ) + 1 ||
          buddiesOrg.length + 1
        const key_b = b && b.user_id + b.id
        orgPositions[key_b] =
          orgPositions[key_b] ||
          buddiesOrg.findIndex(
            buddy => (buddy && buddy.user_id + buddy.id) === key_b,
          ) + 1 ||
          buddiesOrg.length + 1
        return orgPositions[key_a] - orgPositions[key_b]
      })
    }
    return buddies
  }
  render() {
    const props = this.props
    const nameDisplayMode = int(
      props.uiData.ucUiStore.getOptionalSetting({ key: ['name_display_mode'] }),
    )

    const sortOrders = []
    sortOrders.push({ key: '', label: uawMsgs.LBL_USER_LIST_SORT_ORDER_NONE })
    sortOrders.push({
      key: '_name',
      label: uawMsgs.LBL_USER_LIST_SORT_ORDER_NAME,
    })
    if (nameDisplayMode === 1) {
      sortOrders.push({
        key: '_user_id',
        label: uawMsgs.LBL_USER_LIST_SORT_ORDER_USER_ID,
      })
    }
    sortOrders.push({
      key: '_group',
      label: uawMsgs.LBL_USER_LIST_SORT_ORDER_GROUP,
    })

    let buddies = (this.state.buddylist.user || []).concat()
    const groupUserCountTable = {}
    if (this.state.selectedSortOrderKey !== '_group') {
      buddies = buddies.filter(buddy => {
        return buddy.user_id
      })
      buddies = this.sortBuddylist(buddies, this.state.selectedSortOrderKey)
    } else {
      buddies = buddies.concat({
        id: '',
        name: uawMsgs.LBL_USER_LIST_NO_GROUP,
        group: '',
      })
      buddies = this.sortBuddylist(buddies, this.state.selectedSortOrderKey)
      let activeCount = 0
      let totalCount = 0
      buddies.reduceRight((a, buddy) => {
        if (buddy && buddy.user_id) {
          if (!buddy.delete) {
            activeCount++
          }
          totalCount++
        } else if (buddy) {
          groupUserCountTable[buddy.id] = {
            activeCount: activeCount,
            totalCount: totalCount,
          }
          activeCount = 0
          totalCount = 0
        }
      }, null)
    }

    let currentGroupId = null

    return (
      <View
        style={[
          styles.brUserListForm,
          styles[`brBuddyMode${int(props.params && props.params.buddy_mode)}`],
          this.state.buddylist.screened && styles.brScreened,
          this.state.saveOrder && styles.brSaveOrder,
        ]}
      >
        <View style={styles.brUserListTable}>
          <View style={styles.brUserListAllUsersCheck}>
            <TouchableOpacity
              style={[
                styles.brUserListAllUsersCheck,
                props.params?.allUsersCheckDisabled && styles.brDisabled,
                props.params?.allUsersCheckHidden && styles.brHidden,
              ]}
              onPress={this.handleUserListAllUsersCheckClick.bind(this)}
              disabled={props.params?.allUsersCheckDisabled}
            >
              <View style={styles.brUserListAllUsersCheckIcon}>
                {this.state.buddylist.screened ? (
                  <SquareIcon
                    color={this.state.buddylist.screened ? null : 'white'}
                  />
                ) : (
                  <CheckIcon
                    color={this.state.buddylist.screened ? null : 'white'}
                  />
                )}
              </View>
              <Text style={styles.brUserListAllUsersCheckLabel}>
                {uawMsgs.LBL_USER_LIST_ALL_USERS_CHECK}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.brUserListSaveOrderCheck}>
            <TouchableOpacity
              style={styles.brUserListSaveOrderCheck}
              onPress={this.handleUserListSaveOrderCheckClick.bind(this)}
            >
              <View style={styles.brUserListSaveOrderCheckIcon}>
                {this.state.saveOrder ? (
                  <CheckIcon color={this.state.saveOrder ? null : 'white'} />
                ) : (
                  <SquareIcon color={this.state.saveOrder ? null : 'white'} />
                )}
              </View>
              <Text style={styles.brUserListSaveOrderCheckLabel}>
                {uawMsgs.LBL_USER_LIST_SAVE_ORDER_CHECK}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.brUserListSortOrderGroupCheck}
              onPress={this.handleUserListSortOrderGroupCheckClick.bind(this)}
            >
              <View style={styles.brUserListSortOrderGroupCheckIcon}>
                {this.state.selectedSortOrderKey === '_group' ? (
                  <CheckIcon
                    color={
                      this.state.selectedSortOrderKey === '_group'
                        ? null
                        : 'white'
                    }
                  />
                ) : (
                  <SquareIcon
                    color={
                      this.state.selectedSortOrderKey === '_group'
                        ? null
                        : 'white'
                    }
                  />
                )}
              </View>
              <Text style={styles.brUserListSortOrderGroupCheckLabel}>
                {uawMsgs.LBL_USER_LIST_SORT_ORDER_GROUP_CHECK}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.brUserListCaptionArea}>
            <Text>{uawMsgs.LBL_USER_LIST_CAPTION}</Text>
          </View>
          <View style={styles.brUserListCapacityArea}>
            <Text style={styles.brUserListCapacityLabel}>
              {uawMsgs.LBL_USER_LIST_CAPACITY}
            </Text>
            <View style={styles.brUserListCapacityValue}>
              <Text
                style={[
                  styles.brUserListCapacityUsed,
                  this.state.usedCount > props.params.buddy_max &&
                    styles.brOver,
                ]}
              >
                {this.state.usedCount}
              </Text>
              <Text> / </Text>
              <Text style={styles.brUserListCapacityMax}>
                {props.params.buddy_max}
              </Text>
            </View>
          </View>

          <ScrollView style={styles.brUserListBuddies}>
            {buddies.map((buddy, i) => {
              if (buddy && buddy.user_id) {
                const key = JSON.stringify({
                  tenant: buddy.tenant,
                  user_id: buddy.user_id,
                })
                const label =
                  (buddy.name || buddy.user_id) +
                  (nameDisplayMode === 1 ? ` (${buddy.user_id})` : '')

                return (
                  <DndableSafe
                    key={key}
                    uiData={props.uiData}
                    style={[
                      styles.brUserListBuddyItem,
                      this.state.selectedSortOrderKey === '_group' &&
                        !this.state.expandedGroupIds[currentGroupId] &&
                        styles.brCollapsed,
                      { zIndex: buddies.length - 1 },
                    ]}
                    dragSourceInfo={{
                      dragSourceInfoType: 'userListBuddyItem',
                      dragSourceInfoCode: key,
                    }}
                    onCheckCanDrop={ev =>
                      this.state.saveOrder &&
                      this.state.selectedSortOrderKey === '_group' &&
                      ev.dragSourceInfo &&
                      ev.dragSourceInfo.dragSourceInfoType ===
                        'userListBuddyItem' &&
                      ev.dragSourceInfo.dragSourceInfoCode !== key
                    }
                    onDrop={this.handleUserListDrop.bind(this, {
                      dropTargetInfoType: 'userListBuddyItem',
                      dropTargetInfoCode: key,
                    })}
                    onPress={this.handleUserListBuddyItemClick.bind(
                      this,
                      buddy,
                    )}
                  >
                    <View style={styles.brUserListBuddyItemIcon}>
                      {this.state.buddylist.screened && buddy.delete ? (
                        <SquareIcon
                          color={
                            this.state.buddylist.screened && buddy.delete
                              ? null
                              : 'white'
                          }
                        />
                      ) : (
                        <CheckIcon
                          color={
                            this.state.buddylist.screened && buddy.delete
                              ? null
                              : 'white'
                          }
                        />
                      )}
                    </View>
                    <Text
                      style={styles.brUserListBuddyItemLabel}
                      numberOfLines={1}
                    >
                      {label}
                    </Text>
                  </DndableSafe>
                )
              } else if (buddy) {
                currentGroupId = buddy.id
                return (
                  <DndableSafe
                    key={currentGroupId}
                    uiData={props.uiData}
                    style={[
                      styles.brUserListGroupArea,
                      buddy.id && styles.brGroupId,
                      { zIndex: buddies.length - i },
                    ]}
                    dragSourceInfo={{
                      dragSourceInfoType: 'userListGroupArea',
                      dragSourceInfoCode: buddy.id,
                    }}
                    onCheckCanDrop={ev =>
                      this.state.saveOrder &&
                      this.state.selectedSortOrderKey === '_group' &&
                      ev.dragSourceInfo &&
                      (ev.dragSourceInfo.dragSourceInfoType ===
                        'userListBuddyItem' ||
                        (ev.dragSourceInfo.dragSourceInfoType ===
                          'userListGroupArea' &&
                          ev.dragSourceInfo.dragSourceInfoCode !== buddy.id &&
                          ev.dragSourceInfo.dragSourceInfoCode &&
                          buddy.id))
                    }
                    onDrop={this.handleUserListDrop.bind(this, {
                      dropTargetInfoType: 'userListGroupArea',
                      dropTargetInfoCode: buddy.id,
                    })}
                  >
                    <View style={styles.brUserListGroupMenuArea}>
                      <ButtonIconic
                        style={styles.brUserListGroupMenuButton}
                        iconSource={<MoreIcon />}
                        onPress={this.handleUserListGroupMenuButtonClick.bind(
                          this,
                          buddy,
                        )}
                      >
                        <MenuBalloonDialog
                          showing={
                            props.uiData.showingDialogVersion ===
                              this.state.groupMenuShowingDialogVersion &&
                            buddy.id === this.state.groupMenuShowingDialogId
                          }
                          style={styles.brUserListGroupMenuBalloonDialog}
                        >
                          <MenuItem
                            style={[
                              styles.brUserListGroupMenuItem,
                              styles.brCheckAll,
                            ]}
                            disabled={!this.state.buddylist.screened}
                            onPress={this.handleUserListGroupCheckAllMenuItemClick.bind(
                              this,
                              buddies.slice(i + 1),
                              true,
                            )}
                          >
                            {uawMsgs.LBL_USER_LIST_GROUP_CHECK_ALL_MENU}
                          </MenuItem>
                          <MenuItem
                            style={[
                              styles.brUserListGroupMenuItem,
                              styles.brUncheckAll,
                            ]}
                            disabled={!this.state.buddylist.screened}
                            onPress={this.handleUserListGroupCheckAllMenuItemClick.bind(
                              this,
                              buddies.slice(i + 1),
                              false,
                            )}
                          >
                            {uawMsgs.LBL_USER_LIST_GROUP_UNCHECK_ALL_MENU}
                          </MenuItem>
                          <MenuItem
                            style={[
                              styles.brUserListGroupMenuItem,
                              styles.brRemoveGroup,
                            ]}
                            disabled={!(this.state.saveOrder && buddy.id)}
                            onPress={this.handleUserListGroupRemoveGroupMenuItemClick.bind(
                              this,
                              buddy.id,
                            )}
                          >
                            {uawMsgs.LBL_USER_LIST_GROUP_REMOVE_GROUP_MENU}
                          </MenuItem>
                        </MenuBalloonDialog>
                      </ButtonIconic>
                    </View>
                    <TouchableOpacity
                      style={styles.brUserListGroupItem}
                      onPress={this.handleUserListGroupItemClick.bind(
                        this,
                        buddy,
                      )}
                    >
                      <View style={styles.brGroupIcon}>
                        {this.state.expandedGroupIds[buddy.id] ? (
                          <ChevronUpIcon />
                        ) : (
                          <ChevronDownIcon />
                        )}
                      </View>
                      <Text>
                        {string(
                          groupUserCountTable[buddy.id] &&
                            buddy.name +
                              ' ' +
                              (this.state.buddylist.screened
                                ? groupUserCountTable[buddy.id].activeCount
                                : groupUserCountTable[buddy.id].totalCount) +
                              '/' +
                              groupUserCountTable[buddy.id].totalCount,
                        )}
                      </Text>
                    </TouchableOpacity>
                  </DndableSafe>
                )
              }
              return <View key={i} />
            })}
          </ScrollView>
        </View>

        {this.state.saveOrder &&
          this.state.selectedSortOrderKey === '_group' && (
            <ButtonIconic
              style={styles.brUserListCreateGroupButton}
              iconSource={<AddFolderIcon />}
              onPress={this.handleUserListCreateGroupButtonClick.bind(this)}
            />
          )}

        <MenuBalloonDialog
          showing={
            props.uiData.showingDialogVersion ===
            this.state.createGroupShowingDialogVersion
          }
          style={styles.brUserListCreateGroupBalloonDialog}
        >
          <TextBox
            ref={this.userListCreateGroupInputRef}
            style={styles.brUserListCreateGroupInput}
            placeholder={uawMsgs.LBL_USER_LIST_CREATE_GROUP_INPUT_PLACEHOLDER}
            onKeyPress={this.handleUserListCreateGroupInputKeyDown.bind(this)}
          />
          <ButtonLabeled
            style={styles.brUserListCreateGroupSubmitButton}
            onPress={this.handleUserListCreateGroupSubmitButtonClick.bind(this)}
          >
            {uawMsgs.LBL_USER_LIST_CREATE_GROUP_SUBMIT_BUTTON}
          </ButtonLabeled>
        </MenuBalloonDialog>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  brUserListForm: {
    position: 'relative',
    padding: 8,
    paddingHorizontal: 32,
  },
  brUserListTable: {
    padding: 4,
    fontSize: 13 * (1 / 16),
    fontWeight: '500',
    letterSpacing: 0.3 * (1 / 16),
  },
  brUserListAllUsersCheck: {
    fontSize: 13 * (1 / 16),
    fontWeight: '400',
    lineHeight: 1.6,
    letterSpacing: 0.3 * (1 / 16),
    color: '#212121',
    flexWrap: 'nowrap',
  },
  brDisabled: {
    color: '#9e9e9e',
  },
  brHidden: {
    display: 'none',
  },
  brUserListAllUsersCheckIcon: {
    paddingLeft: 40,
  },
  brUserListSaveOrderCheck: {
    fontSize: 13 * (1 / 16),
    fontWeight: '400',
    lineHeight: 1.6,
    letterSpacing: 0.3 * (1 / 16),
    color: '#212121',
    flexWrap: 'nowrap',
  },
  brUserListSaveOrderCheckIcon: {
    paddingLeft: 40,
  },
  brUserListSortOrderGroupCheck: {
    fontSize: 13 * (1 / 16),
    fontWeight: '400',
    lineHeight: 1.6,
    letterSpacing: 0.3 * (1 / 16),
    color: '#212121',
    flexWrap: 'nowrap',
  },
  brUserListSortOrderGroupCheckIcon: {
    paddingLeft: 40,
  },
  brUserListCapacityArea: {
    alignSelf: 'flex-end',
  },
  brUserListCapacityLabel: {
    paddingLeft: 20,
    paddingRight: 4,
  },
  brUserListCapacityValue: {
    width: 60,
    textAlign: 'right',
    fontSize: 13 * (1 / 16),
    fontWeight: '400',
    lineHeight: 1.6,
    letterSpacing: 0.3 * (1 / 16),
    color: '#212121',
  },
  brUserListCapacityUsed: {
    color: '#212121',
  },
  brOver: {
    color: '#ff4526',
    fontWeight: '500',
  },
  brUserListBuddies: {
    width: 300,
    height: 200,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
  },
  brUserListBuddyItem: {
    padding: 8,
    paddingRight: 12,
    fontSize: 13 * (1 / 16),
    fontWeight: '400',
    lineHeight: 1.6,
    letterSpacing: 0.3 * (1 / 16),
    color: '#212121',
    flexWrap: 'nowrap',
  },
  brCollapsed: {
    opacity: 0,
    height: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  brIsOver: {
    borderWidth: 3,
    borderColor: '#48d1cc',
  },
  brUserListBuddyItemIcon: {
    paddingLeft: 44,
  },
  brUserListGroupArea: {
    position: 'relative',
  },
  brUserListGroupMenuArea: {
    zIndex: 1,
    height: 0,
  },
  brUserListGroupMenuButton: {
    position: 'absolute',
    left: 238,
    width: 24,
    height: 24,
    transform: [{ translateY: -12 }],
  },
  brUserListGroupMenuBalloonDialog: {
    position: 'absolute',
    right: 0,
    top: 24,
  },
  brUserListGroupItem: {
    zIndex: 0,
    padding: 8,
    paddingHorizontal: 12,
    fontSize: 9 * (1 / 16),
    fontWeight: '400',
    lineHeight: 1.6,
    letterSpacing: 1.3 * (1 / 16),
    color: '#9e9e9e',
    flexWrap: 'nowrap',
  },
  brUserListCreateGroupButton: {
    position: 'absolute',
    right: 40,
    top: 40,
  },
  brUserListCreateGroupBalloonDialog: {
    position: 'absolute',
    zIndex: 9999,
    right: 40,
    top: 72,
    padding: 8,
  },
  brUserListCreateGroupInput: {
    marginBottom: 8,
  },
  brUserListBuddyItemHover: {
    backgroundColor: '#eeeeee',
  },
  brUserListGroupItemHover: {
    backgroundColor: '#eeeeee',
  },
  brBuddyMode1: {},
  brScreened: {},
  brSaveOrder: {},
  brUserListAllUsersCheckLabel: {
    fontSize: 14,
  },
  brUserListCaptionArea: {
    flex: 1,
  },
  brUserListCapacityValue: {
    flexDirection: 'row',
  },
  brUserListCapacityMax: {},
})
