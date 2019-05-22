import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
import React from 'react';
import { AsyncStorage } from 'react-native';
import { createModelView } from 'redux-model';
import createId from 'shortid';

import * as routerUtils from '../../mobx/routerStore';
import { setCurrentAuthProfile } from './getset';
import UI from './ui';

class View extends React.Component {
  static contextTypes = {
    pbx: PropTypes.object.isRequired,
  };
  componentDidMount() {
    if (this.needToAuth()) {
      this.auth();
    }
  }
  componentDidUpdate() {
    if (this.needToAuth()) {
      this.authDebounced();
    }
  }
  async componentWillUnmount() {
    await AsyncStorage.removeItem('lastNotification');
    this.props.onStopped();
    this.context.pbx.disconnect();
    setCurrentAuthProfile(null);
  }

  needToAuth = () =>
    this.props.profile &&
    !this.props.started &&
    !this.props.success &&
    !this.props.failure;
  auth = () => {
    this.context.pbx.disconnect();
    this.props.onStarted();
    this.context.pbx
      .connect(this.props.profile)
      .then(this.onAuthSuccess)
      .catch(this.onAuthFailure);
  };
  authDebounced = debounce(this.auth, 5000, {
    maxWait: 60000,
  });

  onAuthSuccess = () => {
    setCurrentAuthProfile(this.props.profile);
    this.props.onSuccess();
  };
  onAuthFailure = err => {
    if (err && err.message) {
      this.props.showToast(err.message);
    }
    this.props.onFailure();
  };

  render() {
    return this.props.success ? null : (
      <UI
        retryable={this.props.retryable}
        failure={this.props.failure}
        abort={routerUtils.goToProfilesManage}
        retry={this.auth}
      />
    );
  }
}

const mapGetter = getter => state => {
  const profile = getter.auth.profile(state);
  if (!profile) {
    return { retryable: false, failure: true };
  }
  return {
    retryable: true,
    started: getter.auth.pbx.started(state),
    stopped: getter.auth.pbx.stopped(state),
    success: getter.auth.pbx.success(state),
    failure: getter.auth.pbx.failure(state),
    profile: {
      hostname: profile.pbxHostname,
      port: profile.pbxPort,
      tenant: profile.pbxTenant,
      username: profile.pbxUsername,
      password: profile.pbxPassword,
      turnEnabled: profile.pbxTurnEnabled,
      parks: profile.parks,
      accessToken: profile.accessToken,
    },
  };
};

const mapAction = action => emit => ({
  onStarted() {
    emit(action.auth.pbx.onStarted());
  },
  onSuccess() {
    emit(action.auth.pbx.onSuccess());
  },
  onFailure() {
    emit(action.auth.pbx.onFailure());
  },
  onStopped() {
    emit(action.auth.pbx.onStopped());
  },
  showToast(message) {
    emit(action.toasts.create({ id: createId(), message }));
  },
});

export default createModelView(mapGetter, mapAction)(View);
