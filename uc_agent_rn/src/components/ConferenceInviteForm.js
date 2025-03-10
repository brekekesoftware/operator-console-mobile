import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ReactDOM from 'react-dom'
import DropDownMenu from './DropDownMenu.js'
import MenuItem from './MenuItem.js'
import NameEmbeddedSpan from './NameEmbeddedSpan.js'
import TextBox from './TextBox.js'

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
    }
  }
  componentDidMount() {
    const props = this.props
    const conferenceInviteSubjectInput = ReactDOM.findDOMNode(
      this.refs['conferenceInviteSubjectInput'],
    )
    setTimeout(() => {
      conferenceInviteSubjectInput.focus()
      conferenceInviteSubjectInput.select()
    }, 0)
  }
  handleConferenceInviteSubjectInputChange(ev) {
    const props = this.props
    this.setState({ subject: string(ev.target.value) })
  }
  handleConferenceInviteSubjectInputBlur(ev) {
    const props = this.props
    const newState = { subject: string(ev.target.value) }
    if (!newState.subject) {
      newState.subjectError = uawMsgs.MSG_CONFERENCE_INVITE_SUBJECT_REQUIRED
    } else if (this.state.subjectError) {
      newState.subjectError = ''
    }
    this.setState(newState)
  }
  handleConferenceInviteSubjectInputKeyDown(ev) {
    const props = this.props
    if (ev && ev.keyCode === 13 && !ev.shiftKey) {
      const newState = { subject: string(ev.target.value) }
      if (!newState.subject) {
        newState.subjectError = uawMsgs.MSG_CONFERENCE_INVITE_SUBJECT_REQUIRED
      } else if (this.state.subjectError) {
        newState.subjectError = ''
      }
      this.setState(newState)
    }
  }
  handleConferenceInviteGroupItemClick(groupName, ev) {
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
  }
  handleConferenceInviteBuddyItemClick(buddy, ev) {
    const props = this.props
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
  }
  render() {
    const props = this.props
    const conference =
      props.params &&
      props.params.panelType === 'CONFERENCE' &&
      props.uiData.ucUiStore
        .getChatClient()
        .getConference(
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
      <div className='brConferenceInviteForm'>
        <table className='brConferenceInviteTable'>
          <tbody>
            <tr>
              <td>{uawMsgs.LBL_CONFERENCE_INVITE_SUBJECT}</td>
              <td>
                <TextBox
                  ref='conferenceInviteSubjectInput'
                  type='text'
                  className='brConferenceInviteSubjectInput'
                  value={conference ? conference.subject : this.state.subject}
                  disabled={conference}
                  onChange={this.handleConferenceInviteSubjectInputChange.bind(
                    this,
                  )}
                  onBlur={this.handleConferenceInviteSubjectInputBlur.bind(
                    this,
                  )}
                  onKeyDown={this.handleConferenceInviteSubjectInputKeyDown.bind(
                    this,
                  )}
                />
                <div
                  className={
                    'brConferenceInviteSubjectError' +
                    (this.state.subjectError ? ' brError' : '')
                  }
                >
                  <span className='brConferenceInviteSubjectErrorIcon br_bi_icon_error_svg'></span>
                  {this.state.subjectError}
                </div>
              </td>
            </tr>
            <tr>
              <td>{uawMsgs.LBL_CONFERENCE_INVITE_GROUP}</td>
              <td>
                <DropDownMenu
                  uiData={props.uiData}
                  className='brConferenceInviteGroupMenu'
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
                        className='brConferenceInviteFormMenuItem brConferenceInviteGroupItem'
                        dropDown={true}
                        onClick={this.handleConferenceInviteGroupItemClick.bind(
                          this,
                          groupName,
                        )}
                      >
                        {groupName || uawMsgs.LBL_CONFERENCE_INVITE_GROUP_NONE}
                      </MenuItem>
                    ))}
                </DropDownMenu>
              </td>
            </tr>
            <tr>
              <td colSpan='2'>{uawMsgs.LBL_CONFERENCE_INVITE_BUDDIES}</td>
            </tr>
            <tr>
              <td colSpan='2'>
                <div className='brConferenceInviteBuddies'>
                  {buddies.map(buddy => (
                    <div
                      className={
                        'brConferenceInviteBuddyItem' +
                        (buddy.hidden ? ' brHidden' : '') +
                        (buddy.disabled ? ' brDisabled' : '') +
                        (buddy.selected || buddy.disabled
                          ? ' brSelected br_bi_icon_check_svg'
                          : ' br_bi_icon_square_svg')
                      }
                      key={JSON.stringify({
                        tenant: buddy.tenant,
                        user_id: buddy.user_id,
                      })}
                      onClick={
                        buddy.disabled
                          ? () => {}
                          : this.handleConferenceInviteBuddyItemClick.bind(
                              this,
                              { tenant: buddy.tenant, user_id: buddy.user_id },
                            )
                      }
                    >
                      <NameEmbeddedSpan
                        ucUiStore={props.uiData.ucUiStore}
                        format={'{0}'}
                        title={'{0}'}
                        buddy={buddy}
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
