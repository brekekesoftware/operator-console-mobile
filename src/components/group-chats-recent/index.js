import { computed } from 'mobx';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';

import chatStore from '../../mobx/chatStore';
import contactStore from '../../mobx/contactStore';
import routerStore from '../../mobx/routerStore';
import arrToMap from '../../shared/arrToMap';
import stripTags from '../../shared/stripTags';
import Toast from '../../shared/Toast';
import UI from './ui';

const monthName = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const isToday = time => {
  const now = new Date();
  const beginOfToday = now.setHours(0, 0, 0, 0);
  const endOfTday = now.setHours(23, 59, 59, 999);
  return time >= beginOfToday && time <= endOfTday;
};

const formatTime = time => {
  time = new Date(time);
  const hour = time
    .getHours()
    .toString()
    .padStart(2, '0');
  const min = time
    .getMinutes()
    .toString()
    .padStart(2, '0');

  if (isToday(time)) return `${hour}:${min}`;

  const month = monthName[time.getMonth()];
  const day = time.getDate();
  return `${month} ${day} - ${hour}:${min}`;
};

const miniChatDuration = 60000;
const isMiniChat = (chat, prev = {}) =>
  chat.creator === prev.creator &&
  chat.created - prev.created < miniChatDuration;
const numberOfChatsPerLoad = 50;

@observer
@observer
class View extends React.Component {
  @computed get chatIds() {
    return (
      chatStore.messagesByThreadId[this.props.match.params.group] || []
    ).map(m => m.id);
  }
  @computed get chatById() {
    return arrToMap(
      chatStore.messagesByThreadId[this.props.match.params.group] || [],
      'id',
      m => m,
    );
  }
  static contextTypes = {
    uc: PropTypes.object.isRequired,
    sip: PropTypes.object.isRequired,
  };

  state = {
    target: '',
    loadingRecent: false,
    loadingMore: false,
    editingText: '',
  };

  componentDidMount() {
    const noChat = !this.chatIds.length;

    if (noChat) this.loadRecent();
  }

  render() {
    const g = chatStore.getGroup(this.props.match.params.group);
    return (
      <UI
        hasMore={this.chatIds.length > 0 && !this.state.loadingMore}
        groupName={g.name}
        members={g.members || []}
        resolveMember={this.resolveBuddy}
        loadingRecent={this.state.loadingRecent}
        loadingMore={this.state.loadingMore}
        chatIds={this.chatIds}
        resolveChat={this.resolveChat}
        editingText={this.state.editingText}
        setEditingText={this.setEditingText}
        submitEditingText={this.submitEditingText}
        loadMore={this.loadMore}
        back={routerStore.goToChatsRecent}
        leave={this.leave}
        invite={this.invite}
        callVoiceConference={this.callVoiceConference}
        callVideoConference={this.callVideoConference}
      />
    );
  }

  me = this.context.uc.me();

  resolveBuddy = creator => {
    if (creator === this.me.id) return this.me;
    return contactStore.getUCUser(creator) || {};
  };

  resolveChat = (id, index) => {
    const chat = this.chatById[id];
    const prev = this.chatById[this.chatIds[index - 1]] || {};
    const mini = isMiniChat(chat, prev);
    const created = formatTime(chat.created);
    const text = stripTags(chat.text);

    if (mini) {
      return {
        mini: true,
        created,
        text,
      };
    }

    const creator = this.resolveBuddy(chat.creator);
    const creatorName =
      !creator.name || creator.name.length === 0 ? creator.id : creator.name;

    return {
      creatorName: creatorName,
      creatorAvatar: creator.avatar,
      text,
      created,
    };
  };

  loadRecent() {
    const { uc } = this.context;

    const max = numberOfChatsPerLoad;

    const query = {
      max,
    };

    uc.getGroupChats(this.props.match.params.group, query)
      .then(this.onLoadRecentSuccess)
      .catch(this.onLoadRecentFailure);

    this.setState({
      loadingRecent: true,
    });
  }

  onLoadRecentSuccess = chats => {
    chatStore.pushMessages(this.props.match.params.group, chats.reverse());
    this.setState({
      loadingRecent: false,
    });
  };

  onLoadRecentFailure = err => {
    console.error(err);

    this.setState({
      loadingRecent: false,
    });

    Toast.error('Failed to get recent chats');
  };

  loadMore = () => {
    const { uc } = this.context;
    const oldestChat = this.chatById[this.chatIds[0]] || {};
    const oldestCreated = oldestChat.created || 0;
    const max = numberOfChatsPerLoad;
    const end = oldestCreated;

    const query = {
      max,
      end,
    };

    uc.getGroupChats(this.props.match.params.group, query)
      .then(this.onLoadMoreSuccess)
      .catch(this.onLoadMoreFailure);

    this.setState({
      loadingMore: true,
    });
  };

  onLoadMoreSuccess = chats => {
    chatStore.pushMessages(this.props.match.params.group, chats.reverse());
    this.setState({
      loadingMore: false,
    });
  };

  onLoadMoreFailure = err => {
    Toast.error('Failed to get more chats');
    console.error(err);

    this.setState({
      loadingMore: false,
    });
  };

  setEditingText = editingText => {
    this.setState({
      editingText,
    });
  };

  submitting = false;

  submitEditingText = () => {
    if (this.submitting) {
      return;
    }

    const txt = this.state.editingText.trim();

    if (!txt) {
      return;
    }

    this.submitting = true;

    this.context.uc
      .sendGroupChatText(this.props.group.id, txt)
      .then(this.onSubmitEditingTextSuccess)
      .catch(this.onSubmitEditingTextFailure)
      .then(() => {
        this.submitting = false;
      });
  };

  onSubmitEditingTextSuccess = chat => {
    chatStore.pushMessages(this.props.group.id, [chat]);

    this.setState({
      editingText: '',
    });
  };

  onSubmitEditingTextFailure = err => {
    console.error(err);
    Toast.error('Failed to send the message');
  };

  leave = () => {
    const { uc } = this.context;
    uc.leaveChatGroup(this.props.match.params.group)
      .then(this.onLeaveSuccess)
      .catch(this.onLeaveFailure);
  };

  onLeaveSuccess = () => {
    chatStore.removeGroup(this.props.match.params.group);
    routerStore.goToChatsRecent();
  };

  onLeaveFailure = err => {
    console.error(err);
    Toast.error('Failed to leave the group');
  };

  invite = () => {
    routerStore.goToChatGroupInvite(this.props.match.params.group);
  };

  call = (target, bVideoEnabled) => {
    const { sip } = this.context;

    sip.createSession(target, {
      videoEnabled: bVideoEnabled,
    });
  };

  callVoiceConference = () => {
    let target = this.props.match.params.group;
    if (!target.startsWith('uc')) {
      target = 'uc' + this.props.match.params.group;
    }
    this.call(target, false);
  };

  callVideoConference = () => {
    let target = this.props.match.params.group;
    if (!target.startsWith('uc')) {
      target = 'uc' + this.props.match.params.group;
    }
    this.call(target, true);
  };
}

export default View;
