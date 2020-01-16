import { mdiMagnify, mdiPhone, mdiVideo } from '@mdi/js';
import { observer } from 'mobx-react';
import moment from 'moment';
import React from 'react';

import UserItem from '../-contact/UserItem';
import sip from '../api/sip';
import g from '../global';
import authStore from '../global/authStore';
import callStore from '../global/callStore';
import contactStore from '../global/contactStore';
import Field from '../shared/Field';
import Layout from '../shared/Layout';

@observer
class PageCallRecents extends React.Component {
  isMatchUser = call => {
    if (call.partyNumber.includes(contactStore.callSearchRecents)) {
      return call.id;
    }
  };

  callVoice = userId => {
    sip.createSession(userId);
    g.goToPageCallManage();
  };
  callVideo = userId => {
    sip.createSession(userId, {
      videoEnabled: true,
    });
    g.goToPageCallManage();
  };

  getAvatar = id => {
    const ucUser = contactStore.getUCUser(id) || {};
    return {
      id: id,
      avatar: ucUser.avatar,
    };
  };
  getMatchedCalls = () => {
    const calls =
      authStore.currentProfile.recentCalls?.filter(this.isMatchUser) || [];
    const today = moment().format(`MMM D`);
    const normalizedCalls = calls.reduce((arr, c) => {
      if (
        typeof c.created !== `string` ||
        (c.created.length !== 13 && c.created.length !== 14)
      ) {
        return arr;
      }
      arr.push({ ...c, created: c.created.replace(` - ${today}`, ``) });
      return arr;
    }, []);
    if (calls.length !== normalizedCalls.length) {
      setTimeout(() => {
        // Can not update observable while rendering
        g.upsertProfile({
          id: authStore.signedInId,
          recentCalls: normalizedCalls,
        });
      });
    }
    return normalizedCalls;
  };

  render() {
    const calls = this.getMatchedCalls();
    return (
      <Layout
        description="Recent voicemails and calls"
        menu="call"
        subMenu="recents"
        title="Recents"
      >
        <Field
          icon={mdiMagnify}
          label="SEARCH NAME, PHONE NUMBER ..."
          onValueChange={v => {
            contactStore.callSearchRecents = v;
          }}
          value={contactStore.callSearchRecents}
        />
        <Field isGroup label={`VOICEMAILS (${callStore.newVoicemailCount})`} />
        <Field isGroup label={`RECENT CALLS (${calls.length})`} />
        {calls.map((c, i) => (
          <UserItem
            iconFuncs={[
              () => this.callVideo(c.partyNumber),
              () => this.callVoice(c.partyNumber),
            ]}
            icons={[mdiVideo, mdiPhone]}
            isRecentCall
            key={i}
            {...this.getAvatar(c.partyNumber)}
            {...c}
          />
        ))}
      </Layout>
    );
  }
}

export default PageCallRecents;
