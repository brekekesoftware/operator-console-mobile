// api was a component but had been rewritten to a listener
import '../api'

import NetInfo from '@react-native-community/netinfo'
import { debounce } from 'lodash'
import { reaction, runInAction } from 'mobx'
import { observer } from 'mobx-react'
import { useEffect } from 'react'
import { AppState, Platform, StyleSheet, Text, View } from 'react-native'
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import SplashScreen from 'react-native-splash-screen'
import { ToastProvider } from 'react-native-toast-notifications'
import { ViewRegistryProvider } from 'uc_agent_rn'

import { sip } from '../api/sip'
import { SyncPnToken } from '../api/syncPnToken'
import { getWebRootIdProps } from '../embed/polyfill'
import { IconError, IconSuccess, IconWarning } from '../operator-console/icons'
import { OCMain } from '../operator-console/OCMain'
import { accountStore, getLastSignedInId } from '../stores/accountStore'
import {
  isFirstRunFromLocalStorage,
  saveFirstRunToLocalStorage,
} from '../stores/appStore'
import { authPBX } from '../stores/AuthPBX'
import { authSIP } from '../stores/AuthSIP'
import { getAuthStore } from '../stores/authStore'
import { authUC } from '../stores/AuthUC'
import { getCallStore } from '../stores/callStore'
import { chatStore } from '../stores/chatStore'
import { contactStore } from '../stores/contactStore'
import { intl } from '../stores/intl'
import { intlStore } from '../stores/intlStore'
import { Nav } from '../stores/Nav'
import { RnAlert } from '../stores/RnAlert'
import { RnAlertRoot } from '../stores/RnAlertRoot'
import { RnStacker } from '../stores/RnStacker'
import { userStore } from '../stores/userStore'
import { BackgroundTimer } from '../utils/BackgroundTimer'
import { setupCallKeepEvents } from '../utils/callkeep'
import { checkPermForCall, permForCall } from '../utils/permissions'
import { PushNotification } from '../utils/PushNotification'
import { registerOnUnhandledError } from '../utils/registerOnUnhandledError'
import { waitTimeout } from '../utils/waitTimeout'
import { webPromptPermission } from '../utils/webPromptPermission'
import { CallNotify } from './CallNotify'
import { AudioPlayer, RnStatusBar } from './Rn'
import { v } from './variables'

const initApp = async () => {
  await intlStore.wait()
  const s = getAuthStore()
  const cs = getCallStore()
  const nav = Nav()
  const pnToken = SyncPnToken()

  const checkHasCallOrWakeFromPN = () =>
    Object.keys(cs.callkeepMap).length ||
    sip.phone?.getSessionCount() ||
    cs.calls.length ||
    s.sipPn.sipAuth
  const hasCallOrWakeFromPN = checkHasCallOrWakeFromPN()

  const autoLogin = async () => {
    if (!(await checkPermForCall())) {
      nav.goToPageAccountSignIn()
      return
    }
    const d = await getLastSignedInId(true)
    const a = await accountStore.findByUniqueId(d.id)
    if (d.autoSignInBrekekePhone && (await s.signIn(a, true))) {
      console.log('App navigated by auto signin')
      // already navigated
    } else {
      // skip move to page index if there is no account
      const screen = RnStacker.stacks[RnStacker.stacks.length - 1]
      const ca = accountStore.accounts.length
      if (!ca && screen && screen.name === 'PageAccountCreate') {
        return
      }
      nav.goToPageIndex()
    }
  }

  registerOnUnhandledError(unexpectedErr => {
    // must wrap in setTimeout avoid mobx error state change when rendering
    BackgroundTimer.setTimeout(() => RnAlert.error({ unexpectedErr }), 300)
    return false
  })

  AppState.addEventListener('change', async () => {
    if (AppState.currentState !== 'active') {
      return
    }

    s.resetFailureState()
    cs.onCallKeepAction()
    pnToken.syncForAllAccounts()
    if (checkHasCallOrWakeFromPN() || (await s.handleUrlParams())) {
      return
    }
    if (
      !hasCallOrWakeFromPN &&
      s.signedInId &&
      !(await checkPermForCall(
        false,
        s.getCurrentAccount()?.pushNotificationEnabled,
      ))
    ) {
      s.signOut()
      return
    }
    // with ios when wakekup app, currentState will be 'unknown' first then 'active'
    // https://github.com/facebook/react-native-website/issues/273
    if (Platform.OS !== 'ios') {
      return
    }
    await autoLogin()
  })

  NetInfo.addEventListener(({ isConnected }) => {
    if (s.hasInternetConnected === isConnected) {
      return
    }
    s.hasInternetConnected = isConnected
    if (!isConnected) {
      return
    }
    s.resetFailureState()
    authPBX.auth()
    authSIP.auth()
    authUC.auth()
  })

  if (Platform.OS === 'web') {
    if (window._BrekekePhoneWebRoot) {
      webPromptPermission()
    }
    // with ios when wakekup app, currentState will be 'unknown' first then 'active'
    // https://github.com/facebook/react-native-website/issues/273
  } else if (
    (AppState.currentState === 'active' ||
      AppState.currentState === 'unknown') &&
    !hasCallOrWakeFromPN
  ) {
    if (!(await isFirstRunFromLocalStorage())) {
      // TODO: app will hang up if use await here
      permForCall(true)
      saveFirstRunToLocalStorage()
    }
  }

  setupCallKeepEvents()

  await accountStore.loadAccountsFromLocalStorage()

  const onAuthUpdate = debounce(() => {
    nav.goToPageIndex()
    chatStore.clearStore()
    contactStore.clearStore()
    userStore.clearStore()
    if (s.signedInId) {
      s.resetFailureState()
      authPBX.auth()
      authSIP.auth()
      authUC.auth()
    } else {
      authPBX.dispose()
      authSIP.dispose()
      authUC.dispose()
    }
  }, 17)
  const clearReaction = reaction(() => s.signedInId, onAuthUpdate)
  void clearReaction
  if (await s.handleUrlParams()) {
    console.log('App navigated by url params')
    // already navigated
  } else if (
    // only auto sign in if app active mean user open app intentionally
    // other cases like wakeup via push we should not auto sign in
    Platform.OS !== 'web' &&
    AppState.currentState === 'active' &&
    !hasCallOrWakeFromPN
  ) {
    await autoLogin()
  } else {
    nav.goToPageIndex()
  }

  if (AppState.currentState === 'active') {
    pnToken.syncForAllAccounts()
  }
}

let alreadyInitApp = false
PushNotification.register(async () => {
  if (alreadyInitApp) {
    return
  }
  alreadyInitApp = true
  await initApp().catch(console.error)
  await waitTimeout(100)
  runInAction(() => {
    accountStore.appInitDone = true
  })
})

const css = StyleSheet.create({
  App: {
    backgroundColor: v.bg,
  },
  App_Inner: {
    flex: 1,
  },
  App_ConnectionStatus: {
    backgroundColor: v.colors.warning,
  },
  App_ConnectionStatus__failure: {
    backgroundColor: v.colors.danger,
  },
  App_ConnectionStatusInner: {
    paddingHorizontal: 5,
    paddingTop: 4,
    paddingBottom: 5,
  },
  App_ConnectionStatusIncreaseTouchSize: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 30,
  },
  LoadingFullscreen: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#74bf53', // old color from design, not g.colors.primary
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export const App = observer(() => {
  useEffect(() => {
    if (Platform.OS !== 'web') {
      SplashScreen.hide()
    }
  }, [])

  const {
    isConnFailure,
    pbxConnectingOrFailure,
    sipConnectingOrFailure,
    ucConnectingOrFailure,
    ucLoginFromAnotherPlace,
    signedInId,
    resetFailureStateIncludeUcLoginFromAnotherPlace,
  } = getAuthStore()

  const serviceConnectingOrFailure = pbxConnectingOrFailure()
    ? 'PBX'
    : sipConnectingOrFailure()
      ? 'SIP'
      : ucConnectingOrFailure()
        ? 'UC'
        : ''
  const isFailure = isConnFailure()

  const connMessage =
    isFailure && ucLoginFromAnotherPlace
      ? intl`UC signed in from another location`
      : !serviceConnectingOrFailure
        ? ''
        : isFailure
          ? intl`${serviceConnectingOrFailure} connection failed`
          : intl`Connecting to ${serviceConnectingOrFailure}...`

  const cp = getAuthStore().listCustomPage[0]

  return (
    <View style={[StyleSheet.absoluteFill, css.App]} {...getWebRootIdProps()}>
      {chatStore.chatNotificationSoundRunning && <AudioPlayer />}
      <RnStatusBar />
      {/* {!!signedInId && !!connMessage && (
          <AnimatedSize
            style={[
              css.App_ConnectionStatus,
              isFailure && css.App_ConnectionStatus__failure,
            ]}
          >
            <RnTouchableOpacity
              style={css.App_ConnectionStatusInner}
              onPress={
                isFailure
                  ? resetFailureStateIncludeUcLoginFromAnotherPlace
                  : undefined
              }
            >
              <RnText small white>
                {connMessage}
              </RnText>
            </RnTouchableOpacity>
          </AnimatedSize>
        )} */}

      <CallNotify />
      {/* <CallBar />
      <CallVideos />
      <CallVoices />
      <ChatGroupInvite />
      <UnreadChatNoti /> */}

      {/* <View style={css.App_Inner}>
        <RnStackerRoot />
        <RenderAllCalls />
        {cp && <PageCustomPageView id={cp.id} />}
        <RnPickerRoot />
        <PhonebookAddItem />
        <RnAlertRoot />
        {isFailure && (
          <RnTouchableOpacity
            style={css.App_ConnectionStatusIncreaseTouchSize}
            onPress={resetFailureStateIncludeUcLoginFromAnotherPlace}
          />
        )}
      </View> */}
      {/* {Platform.OS === 'ios' && <KeyboardSpacer />} */}

      {/* {!accountStore.appInitDone && (
        <View style={css.LoadingFullscreen}>
          <ActivityIndicator size='large' color='white' />
        </View>
      )} */}
      <View style={css.App_Inner}>
        <RnAlertRoot />
        <AutocompleteDropdownContextProvider>
          <ToastProvider
            placement='top'
            successIcon={IconSuccess}
            warningIcon={IconWarning}
            style={{ flex: 1 }}
            renderToast={toast => {
              let icon
              switch (toast.type) {
                case 'success':
                  icon = IconSuccess
                  break
                case 'warning':
                  icon = IconWarning
                  break
                case 'error':
                  icon = IconError
                  break
                default:
                  break
              }
              return (
                <View
                  style={{
                    padding: 15,
                    backgroundColor: 'white',
                    elevation: 3,
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    borderColor: '#e0e0e0',
                    borderWidth: 1,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 5,
                    }}
                  >
                    <View>{icon}</View>
                    <Text>{toast.message}</Text>
                  </View>
                  {toast.data?.content}
                </View>
              )
            }}
          >
            <GestureHandlerRootView style={{ flex: 1 }}>
              <ViewRegistryProvider>
                <View style={{ flex: 1 }}>
                  <OCMain />
                </View>
              </ViewRegistryProvider>
            </GestureHandlerRootView>
          </ToastProvider>
        </AutocompleteDropdownContextProvider>
      </View>
    </View>
  )
})

// eslint-disable-next-line no-restricted-syntax
export default App
