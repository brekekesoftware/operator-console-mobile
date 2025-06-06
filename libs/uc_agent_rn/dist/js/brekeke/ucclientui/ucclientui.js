'use strict'
function _typeof(o) {
  '@babel/helpers - typeof'
  return (
    (_typeof =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (o) {
            return typeof o
          }
        : function (o) {
            return o &&
              'function' == typeof Symbol &&
              o.constructor === Symbol &&
              o !== Symbol.prototype
              ? 'symbol'
              : typeof o
          }),
    _typeof(o)
  )
}
/*
 * require dojo.js
 * require jsonrpc.js
 * require jssip-3.2.15.js
 * require webrtcclient.js
 * require webnotification.js
 * require ucclient.js
 */ if (!window.Brekeke) {
  window.Brekeke = {}
}
/*
 * Instance Brekeke.UCClientUI
 */ if (!window.Brekeke.UCClientUI) {
  window.Brekeke.UCClientUI = {}
}
;(function (UCClientUI) {
  /*
   * Variables
   */ // ChatClient
  var chatClient = null // Phone
  var phone = null // logger
  var logger = null // UCMessages
  var ucMsgs = null // Errors
  var Errors = null // Constants
  var Constants = null // BrFrame
  var brFrame = null // BrLogin
  var brLogin = null // side pane
  var sidePaneWidget = null // buddylist tree
  var treeBuddylist = null // buddylist tree store
  var storeBuddylist = null
  var storeBuddylistIdCount = 0 // buddylist filter
  var buddylistFilter = ''
  var buddylistOnlineOnly = false // menu resizer
  var menuResizer = null // message bar
  var messageBar = null // splittable panel
  var panelSplittable = null
  var splitDirection = ''
  var panelsSplittableChild = [] // tab panels
  var PanelTabConstructor = null
  var panelsTab = []
  var lastAddedPanelTabIndex = 0 // tab child panels
  var PanelTabChildConstructor = null
  var PanelChatConstructor = null
  var PanelWebchatQueueConstructor = null
  var PanelPreferenceConstructor = null
  var PanelHistoryConstructor = null
  var PanelHistorySearchConstructor = null
  var PanelServerSettingsConstructor = null
  var PanelBlockListSettingsConstructor = null
  var PanelUserManagementConstructor = null
  var PanelTenantTableConstructor = null
  var PanelTenantPropertyConstructor = null
  var PanelTenantSettingsConstructor = null
  var PanelAdvancedSettingsConstructor = null
  var PanelSoftwareUpdateConstructor = null
  var PanelActivateLicenseConstructor = null
  var panelKeyCounter = 0 // chat panels
  var panelsChat = {} // chat message lists
  var messageListsChat = {} // sent message
  var sentMessageIdCounter = 0 // typing
  var lastSentTypingTimeTable = {}
  var hideTypingTimerTable = {} // active panel
  var activePanelKey = ''
  var readTextOnReSignInPanelKeys = [] // conference panels
  var panelsConference = {} // conference message lists
  var messageListsConference = {} // broadcast panels
  var panelsBroadcast = {} // broadcast users table
  var broadcastUsersTable = {} // broadcast message lists
  var messageListsBroadcast = {} // parameters of displaying message
  var senderKeyToParagraphClass = []
  var smileyAsciiToHtml = []
  var urlRegExp = null
  var urlRegExpNG = null // file table
  var fileTable = {} // external call panels
  var panelsExternalCall = {} // call panel table
  var sessionPanelTable = {}
  var outgoingCallPanelTable = {}
  var outgoingPreScreenSharingPanelTable = {} // broadcast calls table
  var broadcastCallsTable = {} // video or audio in playing now
  var playingPlayers = [] // initial phone options
  var phoneDefaultOptions = null // phone options customized by webrtc type
  var callOptions = null // sound only stream
  var soundOnlyStream = null // webchat queue panels
  var panelsWebchatQueue = {} // webchat queue data
  var webchatQueueWorkData = {} // webchat queue list
  var webchatQueueList = [] // preference panel
  var panelsPreference = {} // preference data
  var preferenceWorkData = {} // history panel
  var panelsHistory = {} // history search condition data
  var searchConditionHistory = {} // topic lists
  var topicListsHistory = {} // server settings panel
  var panelsServerSettings = {} // server settings data
  var serverSettingsWorkData = {}
  var recordAuthChecked = false // block list settings panel
  var panelsBlockListSettings = {} // user management panel
  var panelsUserManagement = {} // user management data
  var userManagementWorkData = {} // tenant table panel
  var panelsTenantTable = {} // tenant table data
  var tenantTableWorkData = {} // tenant property panel
  var panelsTenantProperty = {} // tenant property data
  var tenantPropertyWorkData = {} // tenant settings panel
  var panelsTenantSettings = {} // tenant settings data
  var tenantSettingsWorkData = {} // advanced settings panel
  var panelsAdvancedSettings = {} // software update panel
  var panelsSoftwareUpdate = {} // activate license panel
  var panelsActivateLicense = {} // twitter settings panel
  var panelsTwitterSettings = {} // facebook settings panel
  var panelsFacebookSettings = {} // line settings panel
  var panelsLineSettings = {} // watson settings panel
  var panelsWatsonSettings = {} // email settings panel
  var panelsEmailSettings = {} // guest settings panel
  var panelsGuestSettings = {} // highlight
  var highlightObject = null // notification
  var notificationObjects = [] // lamp
  var lampObject = null // timer
  var securityCheckTimer = null
  var securityOkTime = 0
  var securityNgCount = 0 // status
  var signedIn = false
  var signedInTime = 0
  var phoneRegistered = false
  var phoneReregistering = false
  var myStatus = { status: 0, display: '' } // cookiePreference
  var cookiePreference = {
    webRTCDisabled: '',
    webRTCTypeName: '',
    headerDisplayOnCall: '',
    mainVideoWidth: '',
    mainVideoHeight: '',
    thumbnailVideoWidth: '',
    thumbnailVideoHeight: '',
    thumbnailPosition: '',
    thumbnailFrameRate: '',
    videoSource: '',
    audioSource: '',
    audioTarget: '',
    shareScreenEnabled: '',
    shareScreenMediaSource: '',
    shareScreenMute: '',
    shareScreenExtensionId: '',
    onlineOnly: '',
    buddylistOpenList: '',
    mutesMicrophone: '',
    mutesCamera: '',
  } // sign-in parameters
  var mySignInParams = {
    tenant: '',
    user: '',
    pass: '',
    admin_mode: false,
    pver: '',
    forceAjax: false,
    servlet: false,
  }
  /*
   * Constants
   */ var CURRENT_SCRIPT_REGEX = /(^|.*\/)(ucclientui\.js)(.*)/
  var CURRENT_SCRIPT_URL = (function (regex) {
    if (document.currentScript) {
      var match = document.currentScript.src.match(regex)
      if (match) {
        return {
          DIR: match[1] || '',
          FILE: match[2] || '',
          QUERY: match[3] || '',
        }
      }
    }
    var scripts = document.getElementsByTagName('script')
    for (var i = scripts.length - 1; i >= 0; i--) {
      var match = scripts[i].src.match(regex)
      if (match) {
        return {
          DIR: match[1] || '',
          FILE: match[2] || '',
          QUERY: match[3] || '',
        }
      }
    }
    return { DIR: '', FILE: '', QUERY: '' }
  })(CURRENT_SCRIPT_REGEX)
  var REGEX_SPECIAL_CHARS_REGEX = /([.*+?^=!:${}()|\[\]\/\\])/g
  var ROOT_GROUP_ID = ''
  var TAG_WHITE_LIST = ['#TEXT']
  var TAG_BLACK_LIST = ['#COMMENT', 'SCRIPT', 'A']
  var SENDER_KEY_ME = 'me'
  var PARAGRAPH_CLASSES = [
    'brUCParagraph0',
    'brUCParagraph1',
    'brUCParagraph2',
    'brUCParagraph3',
    'brUCParagraph4',
    'brUCParagraph5',
    'brUCParagraph6',
    'brUCParagraph7',
    'brUCParagraph8',
    'brUCParagraph9',
    'brUCParagraph10',
    'brUCParagraph11',
    'brUCParagraph12',
  ]
  var MENU_ITEM_STATUS_DISPLAY_LENGTH = 10
  var SHOW_MORE_BUDDYLIST = 30
  var CHAT_CONTENT_SIZE = 5000
  var SEND_TYPING_INTERVAL = 3000
  var SHOW_TYPING_DURATION = 3200
  var MIN_MAIN_VIDEO_HEIGHT = 60
  var DEFAULT_MAIN_VIDEO_HEIGHT_FACTOR = 40 / 100 // 40% of panel height
  var DEFAULT_THUMBNAIL_VIDEO_HEIGHT = 60
  var DEFAULT_VIDEO_RATIO = 4 / 3
  var DEFAULT_SHARE_SCREEN_FRAME_RATE = 5
  var SEARCH_TOPICS_MAX = 10
  var SEARCH_PREV_NEXT_TEXTS_MAX = 20
  var SEARCH_DAYS_MESSAGES_MAX = 1000
  var WEBCHAT_QUEUE_LINES = undefined
  var PASSWORD_PLACEHOLDER = '**********'
  var NOTIFICATION_DURATION_CHROME = 5000
  var NOTIFICATION_DURATION_FIREFOX = 3000
  /*
   * Public function initialize
   */ UCClientUI.initialize = function (initializeParams, funcOK) {
    // pre-load all modules
    require([
      'brekeke/frame/BrFrame',
      'dijit/Dialog',
      'dijit/DropDownMenu',
      'dijit/Editor',
      'dijit/Menu',
      'dijit/MenuItem',
      'dijit/Tree',
      'dijit/_TemplatedMixin',
      'dijit/_WidgetsInTemplateMixin',
      'dijit/_editor/plugins/FontChoice',
      'dijit/form/Button',
      'dijit/form/CheckBox',
      'dijit/form/DateTextBox',
      'dijit/form/DropDownButton',
      'dijit/form/RadioButton',
      'dijit/form/TextBox',
      'dijit/layout/BorderContainer',
      'dijit/layout/ContentPane',
      'dijit/layout/TabContainer',
      'dijit/registry',
      'dijit/tree/ObjectStoreModel',
      'dijit/tree/dndSource',
      'dojo/_base/declare',
      'dojo/_base/event',
      'dojo/_base/fx',
      'dojo/NodeList-traverse',
      'dojo/aspect',
      'dojo/cookie',
      'dojo/dnd/Moveable',
      'dojo/dnd/Mover',
      'dojo/dnd/Source',
      'dojo/dnd/Target',
      'dojo/dom-construct',
      'dojo/dom-geometry',
      'dojo/on',
      'dojo/store/Memory',
      'dojo/store/Observable',
      'dojo/text!' +
        CURRENT_SCRIPT_URL.DIR +
        'templates/brucpanelactivatelicense.html',
      'dojo/text!' +
        CURRENT_SCRIPT_URL.DIR +
        'templates/brucpaneladvancedsettings.html',
      'dojo/text!' + CURRENT_SCRIPT_URL.DIR + 'templates/brucpanelchat.html',
      'dojo/text!' + CURRENT_SCRIPT_URL.DIR + 'templates/brucpanelhistory.html',
      'dojo/text!' +
        CURRENT_SCRIPT_URL.DIR +
        'templates/brucpanelhistorysearch.html',
      'dojo/text!' +
        CURRENT_SCRIPT_URL.DIR +
        'templates/brucpanelpreference.html',
      'dojo/text!' +
        CURRENT_SCRIPT_URL.DIR +
        'templates/brucpanelserversettings.html',
      'dojo/text!' +
        CURRENT_SCRIPT_URL.DIR +
        'templates/brucpanelsoftwareupdate.html',
      'dojo/text!' +
        CURRENT_SCRIPT_URL.DIR +
        'templates/brucpaneltenantproperty.html',
      'dojo/text!' +
        CURRENT_SCRIPT_URL.DIR +
        'templates/brucpaneltenantsettings.html',
      'dojo/text!' +
        CURRENT_SCRIPT_URL.DIR +
        'templates/brucpaneltenanttable.html',
      'dojo/text!' +
        CURRENT_SCRIPT_URL.DIR +
        'templates/brucpanelwebchatqueue.html',
      'dojo/text!' + CURRENT_SCRIPT_URL.DIR + 'templates/brucsidepane.html',
      'dojox/editor/plugins/Smiley',
      'dojox/editor/plugins/TextColor',
      'dojox/editor/plugins/_SmileyPalette',
    ], function () {
      // logger
      logger = new Brekeke.UCClient.Logger('all')
      var phoneLogger =
        Brekeke.WebrtcClient &&
        new Brekeke.WebrtcClient.Logger('debug', null, false) // UCMessages
      ucMsgs = Brekeke.UCClientUI.UCMessages_en // default language
      for (var key in Brekeke.UCClientUI.UCMessages) {
        // current language
        ucMsgs[key] = Brekeke.UCClientUI.UCMessages[key]
      } // Errors
      Errors = Brekeke.UCClient.Errors // Constants
      Constants = Brekeke.UCClient.Constants // BrLogin
      brLogin = initializeParams.brLogin
      if (brLogin.bcAuthPBX && brLogin.mustGetMT) {
        logger.log('warn', 'pbx server is not ready')
      } // initialize ChatClient
      chatClient = new Brekeke.UCClient.ChatClient(logger)
      chatClient.setEventListeners({
        forcedSignOut: chatClient_onForcedSignOut,
        buddyStatusChanged: chatClient_onBuddyStatusChanged,
        receivedText: chatClient_onReceivedText,
        receivedTyping: chatClient_onReceivedTyping,
        invitedToConference: chatClient_onInvitedToConference,
        conferenceMemberChanged: chatClient_onConferenceMemberChanged,
        fileReceived: chatClient_onFileReceived,
        fileInfoChanged: chatClient_onFileInfoChanged,
        fileTerminated: chatClient_onFileTerminated,
        objectReceived: chatClient_onReceivedText,
        receivedCustomClientEvent: chatClient_onReceivedCustomClientEvent,
        notifiedUserSearch: chatClient_onNotifiedUserSearch,
        notifiedUserDelete: chatClient_onNotifiedUserDelete,
        debugLogFilePrepared: chatClient_onDebugLogFilePrepared,
      }) // initialize Phone
      phone = new Brekeke.WebrtcClient.Phone({
        logLevel: 'debug',
        logger: phoneLogger,
        analyserMode: 1,
      })
      phone.addEventListener('phoneStatusChanged', phone_onPhoneStatusChanged)
      phone.addEventListener('sessionCreated', phone_onSessionCreated)
      phone.addEventListener(
        'sessionStatusChanged',
        phone_onSessionStatusChanged,
      )
      phone.addEventListener(
        'videoClientSessionCreated',
        phone_onVideoClientSessionCreated,
      )
      phone.addEventListener(
        'videoClientSessionEnded',
        phone_onVideoClientSessionEnded,
      )
      phone.addEventListener(
        'remoteUserOptionsChanged',
        phone_onRemoteUserOptionsChanged,
      )
      phone.addEventListener('rtcErrorOccurred', phone_onRtcErrorOccurred) // initialize BrFrame
      initBrFrame(funcOK)
    })
  }
  /*
   * Public function signIn
   */ UCClientUI.signIn = function (signInParams) {
    require(['dojo/cookie'], function (cookie) {
      if (!chatClient) {
        return
      } // re-initialize variables
      signedIn = false
      phoneRegistered = false
      myStatus = { status: Constants.STATUS_OFFLINE, display: '' }
      mySignInParams = clone(signInParams)
      switch (getQueryParameters()['websocket_mode']) {
        case '0':
          mySignInParams.forceAjax = false
          mySignInParams.servlet = false
          break
        case '1':
          mySignInParams.forceAjax = false
          mySignInParams.servlet = true
          break
        case '2':
          mySignInParams.forceAjax = true
          mySignInParams.servlet = false
          break
        default:
          break
      } // get device token from local storage
      var device_token = null
      try {
        device_token = JSON.parse(
          localStorage.getItem(
            'br+dtoken+' +
              (mySignInParams && mySignInParams.isSingleTenant
                ? ''
                : mySignInParams.tenant) +
              '+' +
              string(mySignInParams && mySignInParams.user).split('?')[0],
          ),
        ).token
      } catch (e) {} // sign-in
      chatClient.signIn(
        location.host,
        location.pathname.split('/')[1],
        mySignInParams.tenant,
        mySignInParams.user,
        mySignInParams.pass,
        {
          usePhone: false,
          useHttps: location.protocol.indexOf('https') >= 0,
          status: mySignInParams.admin_mode ? 0 : null,
          admin_mode: mySignInParams.admin_mode,
          pver: mySignInParams.pver,
          device_token: device_token,
          do_not_start_mfa: true,
          forceAjax: mySignInParams.forceAjax,
          servlet: mySignInParams.servlet,
        },
        function (ev) {
          // funcOK
          var profile = chatClient.getProfile()
          var settings = chatClient.getSettings()
          var configProperties = chatClient.getConfigProperties() // check language
          var language = string(
            configProperties.optional_config &&
              configProperties.optional_config.language_setting,
          )
          if (language === 'user') {
            language = string(
              settings.optional_settings &&
                settings.optional_settings.user_language,
            )
          }
          var lastLanguage = string(
            cookie(brLogin.appname + '.brlogin.language'),
          )
          if (language !== lastLanguage) {
            cookie(brLogin.appname + '.brlogin.language', language, {
              expires: 365,
            })
            if (language !== brLogin.loadedLanguage) {
              // reload to change language
              cookie(
                brLogin.appname + '.brlogin.temporarytenant',
                mySignInParams.tenant,
                { expires: 1 },
              )
              cookie(
                brLogin.appname + '.brlogin.temporaryuser',
                mySignInParams.user,
                { expires: 1 },
              )
              cookie(
                brLogin.appname + '.brlogin.temporarypass',
                mySignInParams.pass,
                { expires: 1 },
              )
              if (mySignInParams.admin_mode) {
                cookie(
                  brLogin.appname + '.brlogin.temporary_admin_mode',
                  'true',
                  { expires: 1 },
                )
              }
              chatClient.signOut()
              disposeOnSignOut()
              window.location.reload()
              return
            }
          } // initial status
          signedIn = true
          signedInTime = new Date().getTime()
          phoneRegistered = false
          myStatus.status = chatClient.getStatus().status // init senderKeyToParagraphClass
          senderKeyToParagraphClass = []
          senderKeyToParagraphClass.push(SENDER_KEY_ME)
          var buddylist = chatClient.getBuddylist()
          for (var i = 0; i < buddylist.user.length; i++) {
            var buddy = buddylist.user[i]
            if (buddy.user_id) {
              senderKeyToParagraphClass.push(
                JSON.stringify({
                  tenant: buddy.tenant,
                  user_id: buddy.user_id,
                }),
              )
            }
          } // load cookie preference
          loadCookiePreference()
          buddylistOnlineOnly = cookiePreference.onlineOnly === 'true'
          sidePaneWidget.checkBoxOnlineOnly.set('checked', buddylistOnlineOnly) // hide BrLogin
          brLogin.setVisible(false) // show BrFrame
          displayUserType()
          brFrame.setVisible(true)
          displayProfiles()
          displaySplittable()
          brFrame.updateView() // request permission of notification
          permitNotification() // sa
          if (profile.user_type === Constants.USER_TYPE_SYSTEM_ADMIN) {
            openServerSettings(null, null, true)
            if (brLogin.bcAuthPBX && brLogin.mustGetMT) {
              // pbx server is not ready (hide tenant props)
            } else if (brLogin.multitenant) {
              openTenantTable(null, null, false)
            } else {
              openTenantProperty(brLogin.stDefaultTenant, null, null, false)
            }
            if (brLogin.logoPath && brLogin.hideProductComp !== 'true') {
              brFrame.sidemenu.logo.style.backgroundImage = ''
            }
          } // lamp
          if (
            configProperties.optional_config &&
            configProperties.optional_config.change_lamp
          ) {
            lampObject = {
              profile: profile,
              status: myStatus.status,
              alert: null,
              jingle: null,
              windowFocused: false,
              panelSelected: false, // changeLamp: eval(configProperties.optional_config.change_lamp),
              // TODO: check this params
            }
            lampObject.changeLamp(lampObject)
          } // timer
          if (
            window.location.protocol.indexOf('https') >= 0 &&
            configProperties.optional_config &&
            configProperties.optional_config.secure_domain &&
            window.location.hostname !==
              configProperties.optional_config.secure_domain
          ) {
            securityCheckTimer = setInterval(
              securityCheckTimerTick,
              configProperties.optional_config.security_check_timer_interval ||
                60000,
            )
          } // beforeunload
          window.addEventListener('beforeunload', window_onbeforeunload)
          window.addEventListener('unload', window_onunload) // receive unread text
          if (
            profile.user_type !== Constants.USER_TYPE_SYSTEM_ADMIN &&
            !mySignInParams.admin_mode
          ) {
            chatClient.receiveUnreadText(showUnreadText, null)
          } // open webchat conference
          if (profile.user_type === Constants.USER_TYPE_TENANT_GUEST) {
            chatClient.enterWebchatRoom(
              {
                properties: {
                  webchat_service_id:
                    getQueryParameters()['webchat_service_id'] || null, // TODO: yano test
                  acd_id: getQueryParameters()['acd_id'] || null, // TODO: yano test
                },
              },
              function (ev) {
                openConference(ev.conference.conf_id, null, null, true)
              },
              function (ev) {},
            )
          } // start WebRTC
          if (phone) {
            startWebRTC(true)
          }
        },
        function (ev) {
          // funcError
          logger.log(
            'warn',
            'chatClient.signIn error code: ' +
              ev.code +
              ', message: ' +
              ev.message,
          )
          if (ev.code === Errors.LOGIN_FAILED) {
            brLogin.showMessage(ucMsgs.MSG_AUTHENTICATION_FAILED)
          } else if (ev.code === Errors.IP_NOT_ALLOWED) {
            brLogin.showMessage(ucMsgs.MSG_IP_NOT_ALLOWED)
          } else if (
            ev.code === Errors.OVER_MAX_LOGIN_COUNT ||
            ev.code === Errors.OVER_MAX_TENANT_LOGIN_COUNT
          ) {
            brLogin.showMessage(ucMsgs.MSG_OVER_MAX_LOGIN_COUNT)
          } else if (ev.code === Errors.VERSION_INVALID) {
            brLogin.showMessage(ucMsgs.MSG_VERSION_INVALID)
          } else {
            brLogin.showMessage(
              ucMsgs.MSG_SIGN_IN_FAILED +
                ' (' +
                ev.code +
                ' ' +
                ev.message +
                ')',
            )
          }
          brLogin.set('disabled', false)
          brLogin.domNode.style.display = ''
          brLogin.wpassword.focusNode.select()
          if (mySignInParams.hrefOnSignInError) {
            window.location.href = formatStr(
              mySignInParams.hrefOnSignInError,
              encodeURIComponent(ev.message),
            )
          }
        },
      )
    })
  }
  /*
   * Function initBrFrame
   */ var initBrFrame = function initBrFrame(funcOK) {
    require([
      'dojo/dom-construct',
      'dojo/_base/declare',
      'dijit/layout/ContentPane',
      'dijit/_TemplatedMixin',
      'dijit/_WidgetsInTemplateMixin',
      'brekeke/frame/BrFrame',
      'dojo/store/Memory',
      'dojo/store/Observable',
      'dijit/tree/ObjectStoreModel',
      'dijit/Tree',
      'dijit/tree/dndSource',
      'dijit/Menu',
      'dijit/MenuItem',
      'dijit/layout/BorderContainer',
      'dijit/layout/TabContainer',
      'dojo/dnd/Moveable',
      'dojo/dnd/Mover',
      'dojox/editor/plugins/_SmileyPalette',
      'dojo/text!' + CURRENT_SCRIPT_URL.DIR + 'templates/brucsidepane.html',
      'dojo/text!' + CURRENT_SCRIPT_URL.DIR + 'templates/brucpanelchat.html',
      'dojo/text!' +
        CURRENT_SCRIPT_URL.DIR +
        'templates/brucpanelwebchatqueue.html',
      'dojo/text!' +
        CURRENT_SCRIPT_URL.DIR +
        'templates/brucpanelpreference.html',
      'dojo/text!' + CURRENT_SCRIPT_URL.DIR + 'templates/brucpanelhistory.html',
      'dojo/text!' +
        CURRENT_SCRIPT_URL.DIR +
        'templates/brucpanelhistorysearch.html',
      'dojo/text!' +
        CURRENT_SCRIPT_URL.DIR +
        'templates/brucpanelserversettings.html',
      'dojo/text!' +
        CURRENT_SCRIPT_URL.DIR +
        'templates/brucpanelblocklistsettings.html',
      'dojo/text!' +
        CURRENT_SCRIPT_URL.DIR +
        'templates/brucpanelusermanagement.html',
      'dojo/text!' +
        CURRENT_SCRIPT_URL.DIR +
        'templates/brucpaneltenanttable.html',
      'dojo/text!' +
        CURRENT_SCRIPT_URL.DIR +
        'templates/brucpaneltenantproperty.html',
      'dojo/text!' +
        CURRENT_SCRIPT_URL.DIR +
        'templates/brucpaneltenantsettings.html',
      'dojo/text!' +
        CURRENT_SCRIPT_URL.DIR +
        'templates/brucpaneladvancedsettings.html',
      'dojo/text!' +
        CURRENT_SCRIPT_URL.DIR +
        'templates/brucpanelsoftwareupdate.html',
      'dojo/text!' +
        CURRENT_SCRIPT_URL.DIR +
        'templates/brucpanelactivatelicense.html', // pre-load for _WidgetsInTemplateMixin
      'dijit/form/DropDownButton',
      'dijit/DropDownMenu',
      'dijit/form/TextBox',
      'dijit/form/Button',
      'dijit/form/CheckBox',
      'dijit/Editor',
      'dojox/editor/plugins/Smiley',
      'dojox/editor/plugins/TextColor',
      'dijit/_editor/plugins/FontChoice',
      'dijit/form/RadioButton',
      'dijit/form/DateTextBox',
    ], function (
      domConstruct,
      declare,
      ContentPane,
      _TemplatedMixin,
      _WidgetsInTemplateMixin,
      BrFrame,
      Memory,
      Observable,
      ObjectStoreModel,
      Tree,
      dndSource,
      Menu,
      MenuItem,
      BorderContainer,
      TabContainer,
      Moveable,
      Mover,
      _SmileyPalette,
      brUCSidePaneHtml,
      brUCPanelChatHtml,
      brUCPanelWebchatQueueHtml,
      brUCPanelPreferenceHtml,
      brUCPanelHistoryHtml,
      brUCPanelHistorySearchHtml,
      brUCPanelServerSettingsHtml,
      brUCPanelBlockListSettingsHtml,
      brUCPanelUserManagementHtml,
      brUCPanelTenantTableHtml,
      brUCPanelTenantPropertyHtml,
      brUCPanelTenantSettingsHtml,
      brUCPanelAdvancedSettingsHtml,
      brUCPanelSoftwareUpdateHtml,
      brUCPanelActivateLicenseHtml,
    ) {
      // create BrFrame
      brFrame = new BrFrame({
        id: 'brFrameRoot',
        sidemenuSettingsMenuSelected: brFrame_sidemenuSettingsMenuSelected,
        afterUpdateView: brFrame_afterUpdateView,
        _onSideMenuHandleClick: brFrame_onSideMenuHandleClick,
      })
      brFrame.set('sidemenuwidth', 258)
      brFrame.placeAt(document.body)
      brFrame.set('statusbar', false)
      brFrame.set('iframe', false)
      brFrame.setVisible(false)
      brFrame.startup() // side menu
      var sidemenu = brFrame.sidemenu // product name
      sidemenu.set('productshortname', brLogin.appname)
      sidemenu.set('productname', brLogin.productname.title)
      if (brLogin.logoPath) {
        sidemenu.logo.style.backgroundImage = 'url(' + brLogin.logoPath + ')'
      } // hide handle
      brFrame.menuhandle.style.visibility = 'hidden' //brFrame.sidemenuhandle.style.zIndex = 99999;
      // create side pane
      var SidePaneWidgetConstructor = declare(
        [ContentPane, _TemplatedMixin, _WidgetsInTemplateMixin],
        { ucMsgs: ucMsgs, templateString: brUCSidePaneHtml },
      )
      sidePaneWidget = new SidePaneWidgetConstructor({
        id: 'sidePaneWidget',
        category_id: 'sidePaneWidget',
        isMenuCategory: true,
      })
      sidemenu.addChild(sidePaneWidget)
      sidePaneWidget.startup()
      for (var i = 0; i < MENU_ITEM_STATUS_DISPLAY_LENGTH; i++) {
        var arrowCellNode = dojo.query(
          '.dijitMenuArrowCell',
          sidePaneWidget['menuItemDisplay' + i].domNode,
        )
        if (arrowCellNode[0]) {
          arrowCellNode[0].title =
            ucMsgs.BTN_DELETE_STATUS_DISPLAY_HISTORY_TOOLTIP
        }
      }
      dojo.connect(sidePaneWidget, 'onMouseEnter', sidePaneWidget_onMouseEnter)
      dojo.connect(sidePaneWidget, 'onMouseLeave', sidePaneWidget_onMouseLeave)
      dojo.connect(
        sidePaneWidget.menuItemStatusOffline,
        'onClick',
        menuItemStatus_onClick,
      )
      dojo.connect(
        sidePaneWidget.menuItemStatusAvailable,
        'onClick',
        menuItemStatus_onClick,
      )
      dojo.connect(
        sidePaneWidget.menuItemStatusBusy,
        'onClick',
        menuItemStatus_onClick,
      )
      dojo.connect(
        sidePaneWidget.textBoxDisplay,
        'onBlur',
        textBoxDisplay_onBlur,
      )
      dojo.connect(sidePaneWidget.textBoxDisplay, 'onKeyDown', keyDownUtil.save)
      dojo.connect(
        sidePaneWidget.textBoxDisplay,
        'onKeyUp',
        textBoxDisplay_onKeyUp,
      )
      dojo.connect(
        sidePaneWidget.textBoxDisplay,
        'onInput',
        textBoxDisplay_onInput,
      )
      dojo.connect(
        sidePaneWidget.menuItemDisplayEmpty,
        'onClick',
        menuItemDisplayEmpty_onClick,
      )
      for (var i = 0; i < MENU_ITEM_STATUS_DISPLAY_LENGTH; i++) {
        dojo.connect(
          sidePaneWidget['menuItemDisplay' + i],
          'onClick',
          menuItemDisplay_onClick,
        )
      }
      dojo.connect(
        sidePaneWidget.buttonAddBuddy,
        'onClick',
        buttonAddBuddy_onClick,
      )
      dojo.connect(
        sidePaneWidget.buttonAddGroup,
        'onClick',
        buttonAddGroup_onClick,
      )
      dojo.connect(
        sidePaneWidget.buttonConference,
        'onClick',
        buttonConference_onClick,
      )
      dojo.connect(
        sidePaneWidget.buttonBroadcast,
        'onClick',
        buttonBroadcast_onClick,
      )
      dojo.connect(
        sidePaneWidget.buttonMakeCall,
        'onClick',
        buttonMakeCall_onClick,
      )
      dojo.connect(
        sidePaneWidget.buttonSplitUpDown,
        'onClick',
        buttonSplitUpDown_onClick,
      )
      dojo.connect(
        sidePaneWidget.buttonSplitLeftRight,
        'onClick',
        buttonSplitLeftRight_onClick,
      )
      dojo.connect(sidePaneWidget.textBoxFilter, 'onBlur', textBoxFilter_onBlur)
      dojo.connect(
        sidePaneWidget.textBoxFilter,
        'onKeyUp',
        textBoxFilter_onKeyUp,
      )
      dojo.connect(
        sidePaneWidget.checkBoxOnlineOnly,
        'onChange',
        checkBoxOnlineOnly_onChange,
      ) // create buddylist tree
      storeBuddylist = new Memory({
        data: [
          { id: ROOT_GROUP_ID }, // root of tree
        ],
        getChildren: storeBuddylist_getChildren,
      }) // Wrap the store in Observable so that updates to the store are reflected to the Tree
      storeBuddylist = Observable(storeBuddylist)
      var model = new ObjectStoreModel({
        store: storeBuddylist,
        query: { id: ROOT_GROUP_ID },
      })
      var dndSourceBuddylist = declare([dndSource], {
        singular: true,
        copyState: dndSourceBuddylist_copyState,
        checkItemAcceptance: dndSourceBuddylist_checkItemAcceptance,
        onDndDrop: dndSourceBuddylist_onDndDrop,
      })
      treeBuddylist = new Tree({
        id: 'treeBuddylist',
        model: model,
        dndController: dndSourceBuddylist,
        betweenThreshold: 5,
        showRoot: false,
        autoExpand: true,
        openOnClick: true,
        _nodePixelIndent: 0,
        getIconClass: treeBuddylist_getIconClass,
        getTooltip: treeBuddylist_getTooltip,
        onClick: treeBuddylist_onClick,
        onOpen: treeBuddylist_onOpen,
        onClose: treeBuddylist_onClose,
      })
      treeBuddylist.placeAt(sidePaneWidget.panelBuddylist)
      treeBuddylist.startup() // create buddylist tree context menu
      var MenuBuddylistConstructor = declare([Menu], {
        _openMyself: menuBuddylist_openMyself,
      })
      var menuBuddylist = new MenuBuddylistConstructor({
        targetNodeIds: ['treeBuddylist'],
        selector: '.dijitTreeNode',
      })
      menuBuddylist.addChild(
        new MenuItem({
          id: 'menuBuddylistOpenChat',
          label: ucMsgs.CTX_OPEN_CHAT,
          onClick: menuItemBuddylist_onClick,
        }),
      )
      menuBuddylist.addChild(
        new MenuItem({
          id: 'menuBuddylistInviteToConference',
          label: ucMsgs.CTX_INVITE_TO_CONFERENCE,
          onClick: menuItemBuddylist_onClick,
        }),
      )
      menuBuddylist.addChild(
        new MenuItem({
          id: 'menuBuddylistSendFile',
          label: ucMsgs.CTX_SEND_FILE,
          onClick: menuItemBuddylist_onClick,
        }),
      )
      menuBuddylist.addChild(
        new MenuItem({
          id: 'menuBuddylistVoiceCall',
          label: ucMsgs.CTX_VOICE_CALL,
          onClick: menuItemBuddylist_onClick,
        }),
      )
      menuBuddylist.addChild(
        new MenuItem({
          id: 'menuBuddylistVideoCall',
          label: ucMsgs.CTX_VIDEO_CALL,
          onClick: menuItemBuddylist_onClick,
        }),
      )
      menuBuddylist.addChild(
        new MenuItem({
          id: 'menuBuddylistRemoveGroup',
          label: ucMsgs.CTX_REMOVE_GROUP,
          onClick: menuItemBuddylist_onClick,
        }),
      )
      menuBuddylist.startup() // menu resizer
      menuResizer = new ContentPane({
        id: 'menuResizer',
        class: 'brUCMenuResizer',
        content: '<div class="brUCMenuResizerThumb"></div>',
      })
      brFrame.domNode.parentNode.insertBefore(
        menuResizer.domNode,
        brFrame.domNode,
      )
      menuResizer.startup()
      menuResizer.domNode.style.display = 'none'
      var menuResizerMover = declare([Mover], {
        onMouseMove: menuResizerMover_onMouseMove,
      })
      var menuResizerMoveable = new Moveable(menuResizer.domNode, {
        mover: menuResizerMover,
      })
      dojo.connect(
        menuResizerMoveable,
        'onMoveStop',
        menuResizerMoveable_onMoveStop,
      ) // message bar
      messageBar = messageBar_create(domConstruct) // create splittable panel
      panelSplittable = new BorderContainer({
        id: 'panelSplittable',
        liveSplitters: false,
      })
      panelSplittable.placeAt(brFrame.containerNode)
      panelSplittable.startup() // declare tab panel class
      PanelTabConstructor = declare([TabContainer], {
        dndTarget: null,
        dndSource: null,
        dndIdentifierCount: 0,
        dndTargetIdentifier: null,
        tabOrderInitialized: false,
        postCreate: panelTab_postCreate,
        destroy: panelTab_destroy,
        addChild: panelTab_addChild,
        removeChild: panelTab_removeChild,
        selectChild: panelTab_selectChild,
      }) // declare tab child panel class
      PanelTabChildConstructor = declare([ContentPane], {
        tabOrder: 0,
        panelType: '',
        panelKey: '',
        closable: true,
        selectedEvents: null,
        onClose: PanelTabChild_onClose,
        registerSelectedEvent: PanelTabChild_registerSelectedEvent,
      }) // declare chat panel class (inherits from PanelTabChildConstructor)
      PanelChatConstructor = declare(
        [PanelTabChildConstructor, _TemplatedMixin, _WidgetsInTemplateMixin],
        {
          ucMsgs: ucMsgs,
          templateString: brUCPanelChatHtml,
          handlers: null,
          dndTargets: [],
          temporaryProperties: null,
          buddies: null,
          postCreate: panelChat_postCreate,
          destroy: panelChat_destroy,
          onAddedToTab: panelChat_onAddedToTab,
          onRemovingFromTab: panelChat_onRemovingFromTab,
        },
      ) // declare webchat queue panel class (inherits from PanelTabChildConstructor)
      PanelWebchatQueueConstructor = declare(
        [PanelTabChildConstructor, _TemplatedMixin, _WidgetsInTemplateMixin],
        {
          ucMsgs: ucMsgs,
          templateString: brUCPanelWebchatQueueHtml,
          handlers: null,
          postCreate: panelWebchatQueue_postCreate,
          destroy: panelWebchatQueue_destroy,
        },
      ) // declare preference panel class (inherits from PanelTabChildConstructor)
      PanelPreferenceConstructor = declare(
        [PanelTabChildConstructor, _TemplatedMixin, _WidgetsInTemplateMixin],
        {
          ucMsgs: ucMsgs,
          templateString: brUCPanelPreferenceHtml,
          handlers: null,
          radioButtonUserLanguageList: {},
          postCreate: panelPreference_postCreate,
          destroy: panelPreference_destroy,
        },
      ) // declare history panel class (inherits from PanelTabChildConstructor)
      PanelHistoryConstructor = declare(
        [PanelTabChildConstructor, _TemplatedMixin, _WidgetsInTemplateMixin],
        {
          templateString: brUCPanelHistoryHtml,
          handlers: null,
          postCreate: panelHistory_postCreate,
          destroy: panelHistory_destroy,
        },
      ) // declare history panel class (inherits from PanelTabChildConstructor)
      PanelHistorySearchConstructor = declare(
        [PanelTabChildConstructor, _TemplatedMixin, _WidgetsInTemplateMixin],
        {
          ucMsgs: ucMsgs,
          templateString: brUCPanelHistorySearchHtml,
          handlers: null,
          temporaryProperties: null,
          postCreate: panelHistorySearch_postCreate,
          destroy: panelHistorySearch_destroy,
          onAddedToTab: panelHistorySearch_onAddedToTab,
          onRemovingFromTab: panelHistorySearch_onRemovingFromTab,
        },
      ) // declare server settings panel class (inherits from PanelTabChildConstructor)
      PanelServerSettingsConstructor = declare(
        [PanelTabChildConstructor, _TemplatedMixin, _WidgetsInTemplateMixin],
        {
          ucMsgs: ucMsgs,
          templateString: brUCPanelServerSettingsHtml,
          handlers: null,
          postCreate: panelServerSettings_postCreate,
          destroy: panelServerSettings_destroy,
        },
      ) // declare block list settings panel class (inherits from PanelTabChildConstructor)
      PanelBlockListSettingsConstructor = declare(
        [PanelTabChildConstructor, _TemplatedMixin, _WidgetsInTemplateMixin],
        {
          ucMsgs: ucMsgs,
          templateString: brUCPanelBlockListSettingsHtml,
          handlers: null,
          postCreate: panelBlockListSettings_postCreate,
          destroy: panelBlockListSettings_destroy,
        },
      ) // declare user management panel class (inherits from PanelTabChildConstructor)
      PanelUserManagementConstructor = declare(
        [PanelTabChildConstructor, _TemplatedMixin, _WidgetsInTemplateMixin],
        {
          ucMsgs: ucMsgs,
          templateString: brUCPanelUserManagementHtml,
          handlers: null,
          postCreate: panelUserManagement_postCreate,
          destroy: panelUserManagement_destroy,
        },
      ) // declare tenant settings panel class (inherits from PanelTabChildConstructor)
      PanelTenantTableConstructor = declare(
        [PanelTabChildConstructor, _TemplatedMixin, _WidgetsInTemplateMixin],
        {
          ucMsgs: ucMsgs,
          templateString: brUCPanelTenantTableHtml,
          handlers: null,
          postCreate: panelTenantTable_postCreate,
          destroy: panelTenantTable_destroy,
        },
      ) // declare tenant settings panel class (inherits from PanelTabChildConstructor)
      PanelTenantPropertyConstructor = declare(
        [PanelTabChildConstructor, _TemplatedMixin, _WidgetsInTemplateMixin],
        {
          ucMsgs: ucMsgs,
          templateString: brUCPanelTenantPropertyHtml,
          handlers: null,
          radioButtonLanguageSettingList: {},
          postCreate: panelTenantProperty_postCreate,
          destroy: panelTenantProperty_destroy,
        },
      ) // declare tenant settings panel class (inherits from PanelTabChildConstructor)
      PanelTenantSettingsConstructor = declare(
        [PanelTabChildConstructor, _TemplatedMixin, _WidgetsInTemplateMixin],
        {
          ucMsgs: ucMsgs,
          templateString: brUCPanelTenantSettingsHtml,
          handlers: null,
          postCreate: panelTenantSettings_postCreate,
          destroy: panelTenantSettings_destroy,
        },
      ) // declare advanced settings panel class (inherits from PanelTabChildConstructor)
      PanelAdvancedSettingsConstructor = declare(
        [PanelTabChildConstructor, _TemplatedMixin, _WidgetsInTemplateMixin],
        {
          ucMsgs: ucMsgs,
          templateString: brUCPanelAdvancedSettingsHtml,
          handlers: null,
          postCreate: panelAdvancedSettings_postCreate,
          destroy: panelAdvancedSettings_destroy,
        },
      ) // declare software update panel class (inherits from PanelTabChildConstructor)
      PanelSoftwareUpdateConstructor = declare(
        [PanelTabChildConstructor, _TemplatedMixin, _WidgetsInTemplateMixin],
        {
          templateString: brUCPanelSoftwareUpdateHtml,
          handlers: null,
          postCreate: panelSoftwareUpdate_postCreate,
          destroy: panelSoftwareUpdate_destroy,
        },
      ) // declare activate license panel class (inherits from PanelTabChildConstructor)
      PanelActivateLicenseConstructor = declare(
        [PanelTabChildConstructor, _TemplatedMixin, _WidgetsInTemplateMixin],
        {
          templateString: brUCPanelActivateLicenseHtml,
          handlers: null,
          postCreate: panelActivateLicense_postCreate,
          destroy: panelActivateLicense_destroy,
        },
      ) // audios
      domConstruct.place(
        domConstruct.toDom(
          '<audio id="audioBell" src="' +
            CURRENT_SCRIPT_URL.DIR +
            'resources/sounds/bell.mp3"></audio>',
        ),
        brFrame.domNode,
        'after',
      )
      domConstruct.place(
        domConstruct.toDom(
          '<audio id="audioRing" src="' +
            CURRENT_SCRIPT_URL.DIR +
            'resources/sounds/ring.mp3" loop></audio>',
        ),
        brFrame.domNode,
        'after',
      )
      domConstruct.place(
        domConstruct.toDom(
          '<audio id="audioRingback" src="' +
            CURRENT_SCRIPT_URL.DIR +
            'resources/sounds/ringback.mp3" loop></audio>',
        ),
        brFrame.domNode,
        'after',
      )
      domConstruct.place(
        domConstruct.toDom(
          '<audio id="audioTerminated" src="' +
            CURRENT_SCRIPT_URL.DIR +
            'resources/sounds/terminated.mp3"></audio>',
        ),
        brFrame.domNode,
        'after',
      ) // canvas
      domConstruct.place(
        domConstruct.toDom(
          '<canvas id="canvasSoundOnly" style="display: none;"></canvas>',
        ),
        brFrame.domNode,
        'after',
      ) // window
      window.onfocus = window_onfocus
      window.onclick = window_onclickFirst // parameters of displaying message
      senderKeyToParagraphClass.push(SENDER_KEY_ME)
      for (var n in _SmileyPalette.Emoticon.ascii) {
        smileyAsciiToHtml.push({
          regex: new RegExp(
            ('[' + _SmileyPalette.Emoticon.ascii[n] + ']').replace(
              REGEX_SPECIAL_CHARS_REGEX,
              '\\$1',
            ),
            'g',
          ),
          html: _SmileyPalette.Emoticon.fromAscii(
            _SmileyPalette.Emoticon.ascii[n],
          ).imgHtml(),
        })
      }
      urlRegExp = new RegExp(
        "https?://[\\w!#\\$%&'\\(\\)\\*\\+,\\-\\./:;=\\?@~]+",
        'g',
      )
      urlRegExpNG = new RegExp(
        '"https?://[\\w!#\\$%&\'\\(\\)\\*\\+,\\-\\./:;=\\?@~]+',
        'g',
      )
      if (funcOK) {
        funcOK()
      }
    })
  }
  /*
   * Function loadCookiePreference
   */ var loadCookiePreference = function loadCookiePreference() {
    var profile = chatClient.getProfile()
    var userKey = encodeURIComponent(
      JSON.stringify([profile.tenant, profile.user_id]),
    )
    if (typeof localStorage !== 'undefined') {
      if (
        localStorage.getItem(
          brLogin.appname + '.ucclientui.' + userKey + '.cookiePreferenceSaved',
        )
      ) {
        for (var key in cookiePreference) {
          var value = localStorage.getItem(
            brLogin.appname +
              '.ucclientui.' +
              userKey +
              '.cookiePreference.' +
              key,
          )
          cookiePreference[key] = value || cookiePreference[key]
        }
        return
      }
    }
    require(['dojo/cookie'], function (cookie) {
      for (var key in cookiePreference) {
        var value = cookie(
          brLogin.appname +
            '.ucclientui.' +
            userKey +
            '.cookiePreference.' +
            key,
        )
        cookiePreference[key] = value || cookiePreference[key]
      }
    })
  }
  /*
   * Function saveCookiePreference
   */ var saveCookiePreference = function saveCookiePreference() {
    var profile = chatClient.getProfile()
    var userKey = encodeURIComponent(
      JSON.stringify([profile.tenant, profile.user_id]),
    )
    if (typeof localStorage !== 'undefined') {
      try {
        for (var key in cookiePreference) {
          localStorage.setItem(
            brLogin.appname +
              '.ucclientui.' +
              userKey +
              '.cookiePreference.' +
              key,
            cookiePreference[key],
          )
        }
        localStorage.getItem(
          brLogin.appname + '.ucclientui.' + userKey + '.cookiePreferenceSaved',
        ) ||
          localStorage.setItem(
            brLogin.appname +
              '.ucclientui.' +
              userKey +
              '.cookiePreferenceSaved',
            'true',
          )
        require(['dojo/cookie'], function (cookie) {
          for (var key in cookiePreference) {
            cookie(
              brLogin.appname +
                '.ucclientui.' +
                userKey +
                '.cookiePreference.' +
                key,
              null,
              { expires: -1 },
            )
          }
        })
        return
      } catch (e) {
        logger.log('warn', e)
        localStorage.removeItem(
          brLogin.appname + '.ucclientui.' + userKey + '.cookiePreferenceSaved',
        )
      }
    }
    require(['dojo/cookie'], function (cookie) {
      for (var key in cookiePreference) {
        cookie(
          brLogin.appname +
            '.ucclientui.' +
            userKey +
            '.cookiePreference.' +
            key,
          cookiePreference[key],
          { expires: 365 },
        )
      }
    })
  }
  /*
   * Function displayUserType
   */ var displayUserType = function displayUserType() {
    var profile = chatClient.getProfile()
    var configProperties = chatClient.getConfigProperties()
    var settingsMenuData = []
    if (profile.user_type === Constants.USER_TYPE_SYSTEM_ADMIN) {
      settingsMenuData.push({
        label: ucMsgs.MNU_SERVER_SETTINGS,
        id: 'menuItemServerSettings',
      })
      settingsMenuData.push(
        brLogin.multitenant
          ? { label: ucMsgs.MNU_TENANT_SETTINGS, id: 'menuItemTenantSettings' }
          : {
              label: ucMsgs.MNU_TENANT_PROPERTIES,
              id: 'menuItemTenantProperty',
            },
      )
      settingsMenuData.push({
        label: ucMsgs.MNU_ADVANCED_SETTINGS,
        id: 'menuItemAdvancedSettings',
      })
      settingsMenuData.push({
        label: ucMsgs.MNU_UPDATE_SOFTWARE,
        id: 'menuItemSoftwareUpdate',
      })
      settingsMenuData.push({
        label: ucMsgs.MNU_ACTIVATE_LICENSE,
        id: 'menuItemActivateLicense',
      })
      if (
        !brLogin.multitenant &&
        configProperties.optional_config &&
        string(configProperties.optional_config.social_option).indexOf('T1') !==
          -1
      ) {
        settingsMenuData.push({
          label: formatStr(ucMsgs.MNU_SOCIAL_SETTINGS, 'Twitter'),
          id: 'menuItemTwitterSettings',
        })
      }
      if (
        !brLogin.multitenant &&
        configProperties.optional_config &&
        string(configProperties.optional_config.social_option).indexOf('F1') !==
          -1
      ) {
        settingsMenuData.push({
          label: formatStr(ucMsgs.MNU_SOCIAL_SETTINGS, 'Facebook'),
          id: 'menuItemFacebookSettings',
        })
      }
      if (
        !brLogin.multitenant &&
        configProperties.optional_config &&
        string(configProperties.optional_config.social_option).indexOf('L1') !==
          -1
      ) {
        settingsMenuData.push({
          label: formatStr(ucMsgs.MNU_SOCIAL_SETTINGS, 'LINE'),
          id: 'menuItemLineSettings',
        })
      }
      if (
        !brLogin.multitenant &&
        configProperties.optional_config &&
        string(configProperties.optional_config.social_option).indexOf('B1') !==
          -1
      ) {
        settingsMenuData.push({
          label: formatStr(ucMsgs.MNU_SOCIAL_SETTINGS, 'Chatbot'),
          id: 'menuItemWatsonSettings',
        })
      }
      if (
        !brLogin.multitenant &&
        configProperties.optional_config &&
        string(configProperties.optional_config.social_option).indexOf('M1') !==
          -1
      ) {
        settingsMenuData.push({
          label: formatStr(ucMsgs.MNU_SOCIAL_SETTINGS, 'Email'),
          id: 'menuItemEmailSettings',
        })
      }
      if (
        !brLogin.multitenant &&
        configProperties.optional_config &&
        string(configProperties.optional_config.social_option).indexOf('G1') !==
          -1
      ) {
        settingsMenuData.push({
          label: formatStr(ucMsgs.MNU_SOCIAL_SETTINGS, 'Guest channel'),
          id: 'menuItemGuestSettings',
        })
      }
      if (
        brLogin.hideProduct !== 'true' ||
        brLogin.hideProductComp !== 'true'
      ) {
        settingsMenuData.push({
          label: formatStr(ucMsgs.MNU_ABOUT, brLogin.productname.title),
          id: 'menuItemAbout',
        })
      }
      settingsMenuData.push({ type: 'separator' })
      settingsMenuData.push({
        label: ucMsgs.MNU_SIGN_OUT,
        id: 'menuItemSignOut',
      })
      dojo.addClass(brFrame.domNode, 'brUCFrameAdmin')
      dojo.removeClass(brFrame.domNode, 'brUCFrameGuest')
    } else if (profile.user_type === Constants.USER_TYPE_TENANT_GUEST) {
      if (brLogin.hideProduct !== 'true') {
        settingsMenuData.push({
          label: formatStr(ucMsgs.MNU_ABOUT, brLogin.productname.title),
          id: 'menuItemAbout',
        })
      }
      settingsMenuData.push({ type: 'separator' })
      settingsMenuData.push({
        label: ucMsgs.MNU_SIGN_OUT,
        id: 'menuItemSignOut',
      })
      dojo.removeClass(brFrame.domNode, 'brUCFrameAdmin')
      dojo.addClass(brFrame.domNode, 'brUCFrameGuest')
    } else if (profile.user_type === Constants.USER_TYPE_TENANT_ADMIN) {
      if (!mySignInParams.admin_mode) {
        settingsMenuData.push({
          label: ucMsgs.MNU_PREFERENCE,
          id: 'menuItemPreference',
        })
        settingsMenuData.push({
          label: ucMsgs.MNU_HISTORY,
          id: 'menuItemHistorySearch',
        })
      }
      if (
        !mySignInParams.admin_mode &&
        configProperties.webchat_enabled === 'true'
      ) {
        settingsMenuData.push({
          label: ucMsgs.MNU_WEBCHAT_REQUESTS,
          id: 'menuItemWebchatQueue',
        })
      }
      settingsMenuData.push({
        label: ucMsgs.MNU_SERVER_PROPERTIES,
        id: 'menuItemTenantProperty',
      })
      if (
        configProperties.optional_config &&
        string(configProperties.optional_config.social_option).indexOf('T1') !==
          -1
      ) {
        settingsMenuData.push({
          label: formatStr(ucMsgs.MNU_SOCIAL_SETTINGS, 'Twitter'),
          id: 'menuItemTwitterSettings',
        })
      }
      if (
        configProperties.optional_config &&
        string(configProperties.optional_config.social_option).indexOf('F1') !==
          -1
      ) {
        settingsMenuData.push({
          label: formatStr(ucMsgs.MNU_SOCIAL_SETTINGS, 'Facebook'),
          id: 'menuItemFacebookSettings',
        })
      }
      if (
        configProperties.optional_config &&
        string(configProperties.optional_config.social_option).indexOf('L1') !==
          -1
      ) {
        settingsMenuData.push({
          label: formatStr(ucMsgs.MNU_SOCIAL_SETTINGS, 'LINE'),
          id: 'menuItemLineSettings',
        })
      }
      if (
        configProperties.optional_config &&
        string(configProperties.optional_config.social_option).indexOf('B1') !==
          -1
      ) {
        settingsMenuData.push({
          label: formatStr(ucMsgs.MNU_SOCIAL_SETTINGS, 'Chatbot'),
          id: 'menuItemWatsonSettings',
        })
      }
      if (
        configProperties.optional_config &&
        string(configProperties.optional_config.social_option).indexOf('M1') !==
          -1
      ) {
        settingsMenuData.push({
          label: formatStr(ucMsgs.MNU_SOCIAL_SETTINGS, 'Email'),
          id: 'menuItemEmailSettings',
        })
      }
      if (
        configProperties.optional_config &&
        string(configProperties.optional_config.social_option).indexOf('G1') !==
          -1
      ) {
        settingsMenuData.push({
          label: formatStr(ucMsgs.MNU_SOCIAL_SETTINGS, 'Guest channel'),
          id: 'menuItemGuestSettings',
        })
      }
      if (brLogin.hideProduct !== 'true') {
        settingsMenuData.push({
          label: formatStr(ucMsgs.MNU_ABOUT, brLogin.productname.title),
          id: 'menuItemAbout',
        })
      }
      settingsMenuData.push({ type: 'separator' })
      settingsMenuData.push({
        label: ucMsgs.MNU_SIGN_OUT,
        id: 'menuItemSignOut',
      })
      if (mySignInParams.admin_mode) {
        dojo.addClass(brFrame.domNode, 'brUCFrameAdmin')
      } else {
        dojo.removeClass(brFrame.domNode, 'brUCFrameAdmin')
      }
      dojo.removeClass(brFrame.domNode, 'brUCFrameGuest')
    } else {
      settingsMenuData.push({
        label: ucMsgs.MNU_PREFERENCE,
        id: 'menuItemPreference',
      })
      settingsMenuData.push({
        label: ucMsgs.MNU_HISTORY,
        id: 'menuItemHistorySearch',
      })
      if (configProperties.webchat_enabled === 'true') {
        settingsMenuData.push({
          label: ucMsgs.MNU_WEBCHAT_REQUESTS,
          id: 'menuItemWebchatQueue',
        })
      }
      if (brLogin.hideProduct !== 'true') {
        settingsMenuData.push({
          label: formatStr(ucMsgs.MNU_ABOUT, brLogin.productname.title),
          id: 'menuItemAbout',
        })
      }
      settingsMenuData.push({ type: 'separator' })
      settingsMenuData.push({
        label: ucMsgs.MNU_SIGN_OUT,
        id: 'menuItemSignOut',
      })
      dojo.removeClass(brFrame.domNode, 'brUCFrameAdmin')
      dojo.removeClass(brFrame.domNode, 'brUCFrameGuest')
    }
    brFrame.sidemenu.setSettingsMenuData(settingsMenuData)
  }
  /*
   * Function displaySplittable
   */ var displaySplittable = function displaySplittable() {
    require(['dijit/layout/BorderContainer'], function (BorderContainer) {
      // create new tab panels
      var newPanelsTab = []
      var newPanelsSplittableChild = []
      if (splitDirection === 'updown') {
        newPanelsTab[0] = new PanelTabConstructor({
          region: 'center',
          splitter: true,
          moveTo: [0, 2],
        })
        newPanelsTab[1] = new PanelTabConstructor({
          region: 'bottom',
          splitter: true,
          style: 'height: 50%',
          moveTo: [1, 3],
        })
      } else if (splitDirection === 'leftright') {
        newPanelsTab[0] = new PanelTabConstructor({
          region: 'center',
          splitter: true,
          moveTo: [0, 1],
        })
        newPanelsTab[1] = new PanelTabConstructor({
          region: 'right',
          splitter: true,
          style: 'width: 50%',
          moveTo: [2, 3],
        })
      } else if (splitDirection === 'leftright updown') {
        newPanelsSplittableChild[0] = new BorderContainer({
          liveSplitters: false,
          region: 'center',
          splitter: true,
        })
        newPanelsSplittableChild[1] = new BorderContainer({
          liveSplitters: false,
          region: 'right',
          splitter: true,
          style: 'width: 50%',
        })
        newPanelsTab[0] = new PanelTabConstructor({
          region: 'center',
          splitter: true,
          moveTo: [0],
        })
        newPanelsSplittableChild[0].addChild(newPanelsTab[0])
        newPanelsTab[1] = new PanelTabConstructor({
          region: 'bottom',
          splitter: true,
          style: 'height: 50%',
          moveTo: [1],
        })
        newPanelsSplittableChild[0].addChild(newPanelsTab[1])
        newPanelsTab[2] = new PanelTabConstructor({
          region: 'center',
          splitter: true,
          moveTo: [2],
        })
        newPanelsSplittableChild[1].addChild(newPanelsTab[2])
        newPanelsTab[3] = new PanelTabConstructor({
          region: 'bottom',
          splitter: true,
          style: 'height: 50%',
          moveTo: [3],
        })
        newPanelsSplittableChild[1].addChild(newPanelsTab[3])
      } else {
        newPanelsTab[0] = new PanelTabConstructor({
          region: 'center',
          moveTo: [0, 1, 2, 3],
        })
      } // remove children from old tab panels
      var movingChildren = [[], [], [], []]
      var selectedChildren = []
      for (var i = 0; i < panelsTab.length; i++) {
        var moveTo = panelsTab[i].moveTo
        var children = panelsTab[i].getChildren()
        for (var j = 0; j < children.length; j++) {
          var movingTo = moveTo[j % moveTo.length]
          if (splitDirection === 'leftright' && panelsTab.length !== 1) {
            // 0|2     0|1
            // -+- -->  |
            // 1|3     0|1
            movingTo = int(movingTo / 2)
          } else {
            // 0|2     0|2    0 0    0 0
            // -+- --> -+- or --- or
            // 1|3     1|3    1 1    0 0
            movingTo = movingTo % newPanelsTab.length
          }
          movingChildren[movingTo].push(children[j])
          if (children[j].selected) {
            selectedChildren.push(children[j])
          }
          panelsTab[i].removeChild(children[j])
        }
      } // delete old tab panels
      while (panelsTab.length > 0) {
        var p = panelsTab.pop()
        p.getParent().removeChild(p)
        p.destroy()
      } // delete old splittable panels
      while (panelsSplittableChild.length > 0) {
        var p = panelsSplittableChild.pop()
        p.getParent().removeChild(p)
        p.destroy()
      } // display new splittable panels
      for (var i = 0; i < newPanelsSplittableChild.length; i++) {
        panelSplittable.addChild(newPanelsSplittableChild[i])
        newPanelsSplittableChild[i].startup()
        panelsSplittableChild[i] = newPanelsSplittableChild[i]
      } // display new tab panels
      for (var i = 0; i < newPanelsTab.length; i++) {
        if (!newPanelsTab[i].domNode.parentNode) {
          panelSplittable.addChild(newPanelsTab[i])
        }
        newPanelsTab[i].startup()
        panelsTab[i] = newPanelsTab[i]
      }
      lastAddedPanelTabIndex = panelsTab.length - 1 // move children to new tab panels
      for (var i = 0; i < newPanelsTab.length; i++) {
        var newChildren = movingChildren[i] // sort by tab order
        newChildren.sort(function (a, b) {
          return a.tabOrder - b.tabOrder
        })
        for (var j = 0; j < newChildren.length; j++) {
          newPanelsTab[i].addChild(newChildren[j])
        }
        newPanelsTab[i].tabOrderInitialized = true
      } // re-select children
      for (var i = selectedChildren.length - 1; i >= 0; i--) {
        selectedChildren[i].getParent().selectChild(selectedChildren[i])
      }
    })
  }
  /*
   * Function displayProfiles
   */ var displayProfiles = function displayProfiles() {
    // display name
    displayName() // display status
    displayStatus()
    displayMenuItemStatusDisplay() // display tool bar
    displayTool() // display buddylist
    displayBuddylist(true) // display buddy status on panel (for re-sign-in)
    var buddylist = chatClient.getBuddylist()
    for (var i = 0; i < buddylist.user.length; i++) {
      var buddy = buddylist.user[i]
      displayBuddyStatus(buddy.tenant, buddy.user_id)
    }
  }
  /*
   * Function displayName
   */ var displayName = function displayName() {
    var profile = chatClient.getProfile()
    sidePaneWidget.labelName.innerHTML = mySignInParams.admin_mode
      ? escapeHTML(string(profile.user_id).split('?')[0])
      : escapeHTML(profile.name || profile.user_id)
  }
  /*
   * Function displayStatus
   */ var displayStatus = function displayStatus() {
    var iconClass = getStatusIconClass(myStatus.status)
    var statusStr =
      myStatus.status === Constants.STATUS_OFFLINE
        ? ucMsgs.CMN_OWN_STATUS_STRING_INVISIBLE
        : myStatus.status === Constants.STATUS_AVAILABLE
          ? ucMsgs.CMN_OWN_STATUS_STRING_AVAILABLE
          : myStatus.status === Constants.STATUS_IDLE
            ? ucMsgs.CMN_OWN_STATUS_STRING_IDLE
            : myStatus.status === Constants.STATUS_BUSY
              ? ucMsgs.CMN_OWN_STATUS_STRING_BUSY
              : ''
    sidePaneWidget.dropDownButtonStatus.set('label', statusStr)
    var iconNode = dojo.query(
      '.dijitIcon',
      sidePaneWidget.dropDownButtonStatus.domNode,
    )
    iconNode.removeClass(sidePaneWidget.dropDownButtonStatus.iconClass)
    iconNode.addClass(iconClass)
    sidePaneWidget.dropDownButtonStatus.iconClass = iconClass
    sidePaneWidget.dropDownButtonStatus.set('disabled', false)
    sidePaneWidget.textBoxDisplay.set('value', myStatus.display)
    sidePaneWidget.textBoxDisplay.set('disabled', false)
    sidePaneWidget.dropDownButtonDisplay.set('disabled', false) // display on chat panel
    var profile = chatClient.getProfile()
    for (var key in panelsChat) {
      var buddy = {}
      try {
        buddy = JSON.parse(key)
      } catch (e) {
        logger.log('error', 'failed to parse key==' + key)
        continue
      }
      displayStatusWarning(buddy.tenant, buddy.user_id)
    } // display on conference panel
    for (var conf_id in panelsConference) {
      displayBuddyStatusOnConference(profile.tenant, profile.user_id, conf_id)
    } // display lamp
    if (lampObject) {
      lampObject.status = myStatus.status
      lampObject.changeLamp(lampObject)
    }
  }
  /*
   * Function displayTool
   */ var displayTool = function displayTool() {
    var configProperties = chatClient.getConfigProperties()
    sidePaneWidget.buttonAddBuddy.domNode.style.display =
      configProperties.buddy_mode === Constants.BUDDY_MODE_MANUAL ? '' : 'none'
    sidePaneWidget.buttonAddGroup.domNode.style.display =
      configProperties.buddy_mode === Constants.BUDDY_MODE_AUTO ? 'none' : ''
  }
  /*
   * Function displayBuddylist
   */ var displayBuddylist = function displayBuddylist(refreshOrder) {
    var buddylist = chatClient.getBuddylist()
    var configProperties = chatClient.getConfigProperties()
    var groupUserCount = {}
    var updatedIds = {}
    var buddylistShownCountTable = {}
    var buddylistOpenTable = {}
    if (refreshOrder) {
      // delete all buddy items from storeBuddylist
      var allItems = storeBuddylist.query(function (object) {
        // not root
        return object.id !== ROOT_GROUP_ID
      })
      allItems.forEach(function (object) {
        // memory children length and isExpanded before delete
        if (!object.user_id && !object.showMore) {
          // group
          var groupTreeNode = treeBuddylist.getNodesByItem(
            storeBuddylist.get(object.id),
          )
          if (groupTreeNode[0]) {
            buddylistShownCountTable[object.id] =
              groupTreeNode[0].getChildren().length - 1
            buddylistOpenTable[object.id] = groupTreeNode[0].isExpanded
          }
        }
      })
      allItems.forEach(function (object) {
        // delete
        storeBuddylist.remove(object.id)
      }) // load isExpanded from cookie
      var buddylistOpenList = cookiePreference.buddylistOpenList.split(',')
      for (var i = 0; i < buddylistOpenList.length; i++) {
        buddylistOpenTable[buddylistOpenList[i]] = true
      }
    }
    for (var i = 0; i < buddylist.user.length; i++) {
      var buddy = buddylist.user[i]
      var item = null
      if (buddy.user_id) {
        // user
        item = storeBuddylist.query({
          user_id: buddy.user_id,
          tenant: buddy.tenant,
        })[0]
      } else {
        // group
        item = storeBuddylist.get(buddy.id)
      }
      if (!item) {
        if (buddy.group === ROOT_GROUP_ID) {
          // directly under root
          // insert item to storeBuddylist
          var id = buddy.id || ++storeBuddylistIdCount
          storeBuddylist.add(buddy, { id: id })
          item = storeBuddylist.get(id)
        } else {
          // insert or redisplay "show more" to storeBuddylist
          var id = 'SHOW_MORE' + buddy.group
          var showMoreItem = storeBuddylist.get(id)
          if (!showMoreItem) {
            storeBuddylist.add(
              {
                id: id,
                name: ucMsgs.LBL_SHOW_MORE_ITEM,
                group: buddy.group,
                showMore: true,
                shown: false,
              },
              { id: id },
            )
            showMoreItem = storeBuddylist.get(id)
          }
          if (showMoreItem) {
            var showMoreTreeNode = treeBuddylist.getNodesByItem(showMoreItem)
            if (showMoreTreeNode[0]) {
              dojo.addClass(showMoreTreeNode[0].domNode, 'brUCTreeNodeShowMore')
              showMoreTreeNode[0].domNode.style.display = ''
              storeBuddylist.notify(showMoreItem, id)
            } else {
              logger.log('error', 'not found showMoreTreeNode')
            }
          }
        }
      }
      if (buddy.user_id) {
        // user
        // buddy status
        var buddyStatus = chatClient.getBuddyStatus({
          tenant: buddy.tenant,
          user_id: buddy.user_id,
        }) // filter
        var displays = true
        if (buddylistFilter) {
          if (
            (buddy.name || buddy.user_id)
              .toLowerCase()
              .indexOf(buddylistFilter.toLowerCase()) === -1
          ) {
            displays = false
          }
        }
        if (buddylistOnlineOnly) {
          if (buddyStatus.status === Constants.STATUS_OFFLINE) {
            displays = false
          }
        } // update item of storeBuddylist
        if (item) {
          // update name
          item.name = string(buddy.name || buddy.user_id)
          if (
            (configProperties.optional_config &&
              configProperties.optional_config.name_display_mode === 1) ||
            getQueryParameters()['test11'] == '1'
          ) {
            // TODO: yano test
            item.name += ' (' + buddy.user_id + ')'
          } // update buddy status
          var iconClass = getStatusIconClass(buddyStatus.status)
          var iconNode = dojo.query(
            '.brUCTreeIcon',
            treeBuddylist.getNodesByItem(item)[0].domNode,
          )
          if (iconNode) {
            iconNode
              .removeClass('brUCIconOffline')
              .removeClass('brUCIconAvailable')
              .removeClass('brUCIconIdle')
              .removeClass('brUCIconBusy')
              .addClass(iconClass)
          } else {
            logger.log(
              'error',
              'not found .brUCTreeIcon of user_id==' + buddy.user_id,
            )
          } // update buddy status display
          if (buddyStatus.display) {
            item.name += ' - ' + buddyStatus.display
          } // emphasize active (editor-focused) buddy
          var labelNode = dojo.query(
            '.dijitTreeLabel',
            treeBuddylist.getNodesByItem(item)[0].domNode,
          )
          if (labelNode) {
            var panelKey = JSON.stringify({
              tenant: buddy.tenant,
              user_id: buddy.user_id,
            })
            if (panelsChat[panelKey] && activePanelKey === panelKey) {
              // panel-opened && editor-focused
              labelNode.addClass('brUCTreeLabelStrong')
            } else {
              labelNode.removeClass('brUCTreeLabelStrong')
            }
          } else {
            logger.log(
              'error',
              'not found .dijitTreeLabel of user_id==' + buddy.user_id,
            )
          } // update buddy profile image
          var expandoNode = dojo.query(
            '.dijitTreeExpando',
            treeBuddylist.getNodesByItem(item)[0].domNode,
          )
          if (expandoNode && expandoNode[0]) {
            var style = expandoNode[0].style
            style.width = '37px'
            style.height = '32px'
            style.backgroundSize = '32px 32px'
            style.backgroundPosition = 'right center'
            style.backgroundRepeat = 'no-repeat'
            style.backgroundImage = 'url(' + buddy.profile_image_url + ')'
          } else {
            logger.log(
              'error',
              'not found .dijitTreeExpando of user_id==' + buddy.user_id,
            )
          } // display or not
          var treeNode = treeBuddylist.getNodesByItem(item)
          if (treeNode[0]) {
            treeNode[0].domNode.style.display = displays ? '' : 'none'
          } else {
            logger.log(
              'error',
              'not found treeNode of user_id==' + buddy.user_id,
            )
          }
          storeBuddylist.notify(item, item.id)
          updatedIds[item.id] = true
        } // group online/total user count
        if (!groupUserCount[buddy.group]) {
          groupUserCount[buddy.group] = { online: 0, total: 0 }
        }
        if (displays) {
          groupUserCount[buddy.group].total++
          if (buddyStatus.status !== Constants.STATUS_OFFLINE) {
            groupUserCount[buddy.group].online++
          }
        }
      } else {
        // group
        // update item of storeBuddylist
        if (item) {
          // update name
          item.name = string(buddy.name)
          dojo.addClass(
            treeBuddylist.getNodesByItem(item)[0].domNode,
            'brUCTreeNodeGroup',
          )
          storeBuddylist.notify(item, item.id)
          updatedIds[item.id] = true
        }
      }
    } // display group online/total user count
    for (var i = 0; i < buddylist.user.length; i++) {
      var buddy = buddylist.user[i]
      if (!buddy.user_id) {
        // group
        var item = storeBuddylist.get(buddy.id)
        if (!groupUserCount[buddy.id]) {
          groupUserCount[buddy.id] = { online: 0, total: 0 }
        }
        item.name +=
          ' ' +
          groupUserCount[buddy.id].online +
          '/' +
          groupUserCount[buddy.id].total
        storeBuddylist.notify(item, item.id)
      }
    } // delete item from storeBuddylist
    var itemsToDelete = storeBuddylist.query(function (object) {
      // not updated && not root && not show more
      return (
        updatedIds[object.id] !== true &&
        object.id !== ROOT_GROUP_ID &&
        object.showMore !== true
      )
    })
    itemsToDelete.forEach(function (object) {
      storeBuddylist.remove(object.id)
    })
    if (refreshOrder) {
      // expand or collapse
      var itemsToExpand = storeBuddylist.query(function (object) {
        return object.showMore === true
      })
      itemsToExpand.forEach(function (object) {
        showMoreBuddylist(
          object,
          SHOW_MORE_BUDDYLIST *
            (Math.ceil(
              buddylistShownCountTable[object.group] / SHOW_MORE_BUDDYLIST,
            ) || 1),
        )
        if (buddylistOpenTable[object.group]) {
          treeBuddylist
            .getNodesByItem(storeBuddylist.get(object.group))[0]
            .expand()
        } else {
          treeBuddylist
            .getNodesByItem(storeBuddylist.get(object.group))[0]
            .collapse()
        }
      })
      saveBuddylistOpenList()
    }
  }
  /*
   * Function showMoreBuddylist
   */ var showMoreBuddylist = function showMoreBuddylist(
    showMoreItem,
    maxCount,
  ) {
    var buddylist = chatClient.getBuddylist()
    var insertCount = 0
    var hasMore = false
    for (var i = 0; i < buddylist.user.length; i++) {
      var buddy = buddylist.user[i]
      var item = null
      if (buddy.user_id) {
        // user
        item = storeBuddylist.query({
          user_id: buddy.user_id,
          tenant: buddy.tenant,
        })[0]
      } else {
        item = storeBuddylist.get(buddy.id)
      }
      if (!item) {
        if (buddy.group === showMoreItem.group) {
          if (insertCount < maxCount) {
            // insert item to storeBuddylist
            var id = buddy.id || ++storeBuddylistIdCount
            storeBuddylist.add(buddy, { id: id })
            item = storeBuddylist.get(id)
            insertCount++
          } else {
            hasMore = true
            break
          }
        }
      }
    }
    if (hasMore) {
      storeBuddylist.remove(showMoreItem.id)
      storeBuddylist.add(showMoreItem, { id: showMoreItem.id })
    } else {
      var showMoreTreeNode = treeBuddylist.getNodesByItem(showMoreItem)
      if (showMoreTreeNode[0]) {
        showMoreTreeNode[0].domNode.style.display = 'none'
      } else {
        logger.log('error', 'not found showMoreTreeNode')
      }
    }
    showMoreItem.shown = true
    displayBuddylist(false)
    saveBuddylistOpenList()
  }
  /*
   * Function saveBuddylistOpenList
   */ var saveBuddylistOpenList = function saveBuddylistOpenList() {
    if (signedIn) {
      var buddylistOpenList = []
      var allItems = storeBuddylist.query(function (object) {
        // not root
        return object.id !== ROOT_GROUP_ID
      })
      allItems.forEach(function (object) {
        // memory children isExpanded
        if (!object.user_id && !object.showMore) {
          // group
          var groupTreeNode = treeBuddylist.getNodesByItem(
            storeBuddylist.get(object.id),
          )
          if (groupTreeNode[0] && groupTreeNode[0].isExpanded) {
            buddylistOpenList.push(object.id)
          }
        }
      })
      cookiePreference.buddylistOpenList = buddylistOpenList.join(',')
      saveCookiePreference()
    }
  }
  /*
   * Function signOut
   */ var signOut = function signOut() {
    require(['dojo/cookie'], function (cookie) {
      cookie(brLogin.appname + '.brlogin.signedout', true, { expires: 1 })
      phone.stopWebRTC(true)
      chatClient.signOut()
      signedIn = false
      phoneRegistered = false
      window.removeEventListener('beforeunload', window_onbeforeunload)
      window.removeEventListener('unload', window_onunload)
      if (lampObject) {
        lampObject.status = Constants.STATUS_OFFLINE
        lampObject.changeLamp(lampObject)
      }
      if (securityCheckTimer) {
        clearInterval(securityCheckTimer)
        securityCheckTimer = null
      }
      disposeOnSignOut()
      if (mySignInParams.admin_mode) {
        try {
          if (!localStorage.getItem('UC.ucindex.temporaryuser')) {
            localStorage.setItem(
              'UC.ucindex.temporaryuser',
              JSON.stringify({ time: +new Date() - 60000 }),
            )
          }
        } catch (e) {}
      }
      window.location.reload()
    })
  }
  /*
   * Function disposeOnSignOut
   */ var disposeOnSignOut = function disposeOnSignOut() {
    // dispose ChatClient
    chatClient.setEventListeners({
      forcedSignOut: null,
      buddyStatusChanged: null,
      receivedText: null,
      receivedTyping: null,
      invitedToConference: null,
      conferenceMemberChanged: null,
      fileReceived: null,
      fileInfoChanged: null,
      fileTerminated: null,
      objectReceived: null,
      phoneStatusChanged: null,
      callReceived: null,
      callInfoChanged: null,
      callTerminated: null,
      receivedCustomClientEvent: null,
      notifiedUserSearch: null,
      notifiedUserDelete: null,
      debugLogFilePrepared: null,
    })
    chatClient = null
  }
  /*
   * Function createGroup
   */ var createGroup = function createGroup(group_id) {
    if (!group_id) {
      return
    }
    var buddylist = chatClient.getBuddylist()
    var configProperties = chatClient.getConfigProperties()
    if (configProperties.buddy_mode === Constants.BUDDY_MODE_AUTO) {
      logger.log('error', 'invalid buddy_mode==' + configProperties.buddy_mode)
      return
    }
    for (var i = 0; i < buddylist.user.length; i++) {
      if (buddylist.user[i].id === group_id) {
        windowAlert(
          ucMsgs.CMN_ALERT,
          formatStr(ucMsgs.MSG_GROUP_EXISTS, group_id),
        )
        return
      }
    }
    buddylist.user.push({ id: group_id, name: group_id, group: ROOT_GROUP_ID })
    chatClient.saveProperties(
      null,
      null,
      buddylist,
      function (ev) {
        displayBuddylist(true)
      },
      function (ev) {
        logger.log(
          'warn',
          'chatClient.saveProperties error code: ' +
            ev.code +
            ', message: ' +
            ev.message,
        )
        windowAlert(
          ucMsgs.CMN_ALERT,
          ucMsgs.MSG_CREATE_GROUP_FAILED +
            ' (' +
            ev.code +
            ' ' +
            ev.message +
            ')',
        )
      },
    )
  }
  /*
   * Function removeGroup
   */ var removeGroup = function removeGroup(group_id) {
    if (!group_id) {
      return
    }
    var buddylist = chatClient.getBuddylist()
    var configProperties = chatClient.getConfigProperties()
    if (configProperties.buddy_mode === Constants.BUDDY_MODE_AUTO) {
      logger.log('error', 'invalid buddy_mode==' + configProperties.buddy_mode)
      return
    }
    var index = -1
    for (var i = 0; i < buddylist.user.length; i++) {
      if (buddylist.user[i].group === group_id) {
        windowAlert(
          ucMsgs.CMN_ALERT,
          formatStr(ucMsgs.MSG_GROUP_NOT_EMPTY, group_id),
        )
        return
      }
      if (buddylist.user[i].id === group_id) {
        index = i
      }
    }
    if (index === -1) {
      logger.log('error', 'not found group of group_id==' + group_id)
      return
    }
    buddylist.user.splice(index, 1)
    chatClient.saveProperties(
      null,
      null,
      buddylist,
      function (ev) {
        displayBuddylist(true)
      },
      function (ev) {
        logger.log(
          'warn',
          'chatClient.saveProperties error code: ' +
            ev.code +
            ', message: ' +
            ev.message,
        )
        windowAlert(
          ucMsgs.CMN_ALERT,
          ucMsgs.MSG_REMOVE_GROUP_FAILED +
            ' (' +
            ev.code +
            ' ' +
            ev.message +
            ')',
        )
      },
    )
  }
  /*
   * Function moveBuddy
   */ var moveBuddy = function moveBuddy(target, source, position) {
    var buddylist = chatClient.getBuddylist()
    var configProperties = chatClient.getConfigProperties()
    if (configProperties.buddy_mode === Constants.BUDDY_MODE_AUTO) {
      logger.log('error', 'invalid buddy_mode==' + configProperties.buddy_mode)
      return
    }
    var sourceIndex = -1
    for (var i = 0; i < buddylist.user.length; i++) {
      if (
        source.user_id &&
        source.user_id === buddylist.user[i].user_id &&
        source.tenant === buddylist.user[i].tenant
      ) {
        sourceIndex = i
        break
      }
      if (source.id && source.id === buddylist.user[i].id) {
        sourceIndex = i
        break
      }
    }
    if (sourceIndex === -1) {
      logger.log('error', 'source not found')
      return
    }
    var sourceBuddy = buddylist.user[sourceIndex]
    buddylist.user.splice(sourceIndex, 1)
    var targetIndex = -1
    for (var i = 0; i < buddylist.user.length; i++) {
      if (
        target.user_id &&
        target.user_id === buddylist.user[i].user_id &&
        target.tenant === buddylist.user[i].tenant
      ) {
        targetIndex = i
        break
      }
      if (!target.user_id && target.id === buddylist.user[i].id) {
        targetIndex = i
        break
      }
    }
    if (targetIndex === -1) {
      logger.log('error', 'target not found')
      return
    }
    var targetBuddy = buddylist.user[targetIndex]
    if (position === 'before') {
      sourceBuddy.group = targetBuddy.group
      buddylist.user.splice(targetIndex, 0, sourceBuddy)
    } else if (position === 'after') {
      sourceBuddy.group = targetBuddy.group
      buddylist.user.splice(targetIndex + 1, 0, sourceBuddy)
    } else if (position === 'over') {
      if (targetBuddy.user_id) {
        logger.log('error', 'position is over but target is a user')
        return
      }
      sourceBuddy.group = targetBuddy.id
      buddylist.user.splice(buddylist.user.length, 0, sourceBuddy)
    } else {
      logger.log('error', 'invalid position==' + position)
      return
    }
    chatClient.saveProperties(
      null,
      null,
      buddylist,
      function (ev) {
        displayBuddylist(true)
      },
      function (ev) {
        logger.log(
          'warn',
          'chatClient.saveProperties error code: ' +
            ev.code +
            ', message: ' +
            ev.message,
        )
        windowAlert(
          ucMsgs.CMN_ALERT,
          ucMsgs.MSG_MOVE_BUDDY_FAILED +
            ' (' +
            ev.code +
            ' ' +
            ev.message +
            ')',
        )
      },
    )
  }
  /*
   * Function changeStatus
   */ var changeStatus = function changeStatus(status, display) {
    // changeStatus
    chatClient.changeStatus(
      status,
      display,
      function (ev) {
        // funcOK
        myStatus.status = status
        myStatus.display = display
        displayStatus()
      },
      function (ev) {
        // funcError
        logger.log(
          'warn',
          'changeStatus error code: ' + ev.code + ', message: ' + ev.message,
        )
        displayStatus()
      },
    )
  }
  /*
   * memoryStatusDisplay
   */ var memoryStatusDisplay = function memoryStatusDisplay(display) {
    if (!display) {
      return
    }
    var settings = chatClient.getSettings()
    if (!settings.optional_settings) {
      settings.optional_settings = {}
    }
    if (!settings.optional_settings.status_display_history) {
      settings.optional_settings.status_display_history = []
    }
    var index =
      settings.optional_settings.status_display_history.indexOf(display)
    if (index === 0) {
      return
    } else if (index >= 1) {
      settings.optional_settings.status_display_history.splice(index, 1)
    }
    settings.optional_settings.status_display_history.unshift(display)
    while (
      settings.optional_settings.status_display_history.length >
      MENU_ITEM_STATUS_DISPLAY_LENGTH
    ) {
      settings.optional_settings.status_display_history.pop()
    }
    chatClient.saveProperties(
      null,
      settings,
      null,
      displayMenuItemStatusDisplay,
      null,
    )
  }
  /*
   * displayMenuItemStatusDisplay
   */ var displayMenuItemStatusDisplay =
    function displayMenuItemStatusDisplay() {
      var settings = chatClient.getSettings()
      var status_display_history =
        (settings.optional_settings &&
          settings.optional_settings.status_display_history) ||
        []
      for (var i = 0; i < MENU_ITEM_STATUS_DISPLAY_LENGTH; i++) {
        if (i < status_display_history.length) {
          sidePaneWidget['menuItemDisplay' + i].set(
            'label',
            escapeHTML(status_display_history[i]),
          )
          sidePaneWidget['menuItemDisplay' + i].domNode.style.display = ''
        } else {
          sidePaneWidget['menuItemDisplay' + i].domNode.style.display = 'none'
        }
      }
    }
  /*
   * Function openChat
   */ var openChat = function openChat(
    tenant,
    user_id,
    panelTab,
    insertIndex,
    onTop,
  ) {
    var buddy = { tenant: tenant, user_id: user_id }
    var key = JSON.stringify(buddy)
    var panel = null
    if (!panelsChat[key]) {
      // create panel
      var buddyStatus = chatClient.getBuddyStatus(buddy)
      panel = new PanelChatConstructor()
      openNewTab(panel, panelTab, insertIndex, 'CHAT', key)
      panel.panelChatHeaderBuddyHint.style.display = 'none'
      panel.panelChatHeaderDialPad.style.display = 'none'
      panel.buttonLeaveConference.domNode.style.display = 'none'
      if (!cookiePreference.shareScreenEnabled) {
        panel.buttonShareScreen.domNode.style.display = 'none'
      }
      panel.panelChatCall.domNode.style.display = 'none'
      panel.panelChatCall._splitterWidget.domNode.style.visibility = 'hidden'
      panel.panelChatConferenceInvited.domNode.style.display = 'none'
      panel.panelChatWarningFooter.domNode.style.display = 'none'
      panel.resize()
      panelsChat[key] = panel
      addBuddiesOnPanel(panel, [buddy])
      displayBuddyStatus(tenant, user_id)
    } else {
      // existing panel
      panel = panelsChat[key]
      if (
        panelTab &&
        (panel.getParent() !== panelTab || insertIndex !== null)
      ) {
        // move panel
        panel.getParent().removeChild(panel)
        panelTab.addChild(panel, insertIndex)
      }
    }
    enableButtons(panel)
    if (onTop) {
      panel.getParent().selectChild(panel)
      setTimeout(function () {
        if (panel && panel.editorSendText && panel.editorSendText.focus) {
          panel.editorSendText.focus()
        }
      }, 0)
    }
    return panel
  }
  /*
   * Function openConference
   */ var openConference = function openConference(
    conf_id,
    panelTab,
    insertIndex,
    onTop,
  ) {
    var key = conf_id
    var panel = null
    var conference = chatClient.getConference(conf_id)
    if (!panelsConference[key]) {
      // create panel
      panel = new PanelChatConstructor({
        dndTargets: [{ query: '.brUCPanelChatHeaderBuddies' }], // register dnd targets
      })
      openNewTab(panel, panelTab, insertIndex, 'CONFERENCE', key)
      panel.panelChatHeaderBuddyInfo.style.display = 'none'
      panel.panelChatHeaderDialPad.style.display = 'none'
      dojo.removeClass(panel.buttonSendFile.domNode, 'brUCButtonLeft')
      dojo.addClass(panel.buttonSendFile.domNode, 'brUCButtonMiddle')
      if (!cookiePreference.shareScreenEnabled) {
        panel.buttonShareScreen.domNode.style.display = 'none'
      }
      panel.panelChatCall.domNode.style.display = 'none'
      panel.panelChatCall._splitterWidget.domNode.style.visibility = 'hidden'
      panel.panelChatConferenceInvited.domNode.style.display = 'none'
      panel.panelChatShowMessages.domNode.style.display = 'none'
      panel.panelChatWarningFooter.domNode.style.display = 'none'
      panel.resize()
      panelsConference[key] = panel
      displayConference(key)
    } else {
      // existing panel
      panel = panelsConference[key]
      if (
        panelTab &&
        (panel.getParent() !== panelTab || insertIndex !== null)
      ) {
        // move panel
        panel.getParent().removeChild(panel)
        panelTab.addChild(panel, insertIndex)
      }
      displayConference(key)
    }
    if (onTop) {
      panel.getParent().selectChild(panel)
      setTimeout(function () {
        if (panel && panel.editorSendText && panel.editorSendText.focus) {
          panel.editorSendText.focus()
        }
      }, 0)
    }
    return panel
  }
  /*
   * Function openBroadcast
   */ var openBroadcast = function openBroadcast(panelTab, insertIndex, onTop) {
    // create panel
    var panel = new PanelChatConstructor({
      dndTargets: [{ query: '.brUCPanelChatHeaderBuddies' }], // register dnd targets
    })
    openNewTab(panel, panelTab, insertIndex, 'BROADCAST', null)
    panel.panelChatHeaderBuddyHint.innerHTML = ucMsgs.LBL_DND_BUDDIES
    panel.panelChatHeaderBuddyInfo.style.display = 'none'
    panel.panelChatHeaderDialPad.style.display = 'none'
    panel.buttonLeaveConference.domNode.style.display = 'none'
    panel.buttonShareScreen.domNode.style.display = 'none'
    panel.panelChatCall.domNode.style.display = 'none'
    panel.panelChatCall._splitterWidget.domNode.style.visibility = 'hidden'
    panel.panelChatConferenceInvited.domNode.style.display = 'none'
    panel.panelChatShowMessages.domNode.style.display = 'none'
    panel.panelChatWarningFooter.domNode.style.display = 'none'
    panel.set('title', ucMsgs.TAB_BROADCAST)
    panel.resize()
    panelsBroadcast[panel.panelKey] = panel
    broadcastUsersTable[panel.panelKey] = []
    displayBroadcast(panel)
    if (onTop) {
      panel.getParent().selectChild(panel)
    }
    return panel
  }
  /*
   * Function openExternalCall
   */ var openExternalCall = function openExternalCall(
    target,
    title,
    panelTab,
    insertIndex,
    onTop,
  ) {
    // create panel
    var panel = new PanelChatConstructor()
    openNewTab(panel, panelTab, insertIndex, 'EXTERNALCALL', null)
    panel.panelChatHeaderBuddyHint.style.display = 'none'
    panel.panelChatHeaderBuddyInfo.style.display = 'none'
    panel.buttonLeaveConference.domNode.style.display = 'none'
    panel.buttonShareScreen.domNode.style.display = 'none'
    panel.panelChatCall.domNode.style.display = 'none'
    panel.panelChatCall._splitterWidget.domNode.style.visibility = 'hidden'
    panel.buttonMovePanelChatCall.style.display = 'none'
    panel.panelChatConferenceInvited.domNode.style.display = 'none'
    panel.panelChatShowMessages.domNode.style.display = 'none'
    panel.panelChatFooter.domNode.style.display = 'none'
    panel.panelChatFooter._splitterWidget.domNode.style.display = 'none'
    panel.panelChatWarningFooter.domNode.style.display = 'none'
    panel.resize()
    panelsExternalCall[panel.panelKey] = panel
    panel.textBoxHeaderTarget.attr('value', target)
    displayExternalCallTarget(panel, title)
    if (onTop) {
      panel.getParent().selectChild(panel)
      panel.textBoxHeaderTarget.focus()
    }
    return panel
  }
  /*
   * Function openWebchatQueue
   */ var openWebchatQueue = function openWebchatQueue(
    panelTab,
    insertIndex,
    onTop,
  ) {
    var panel = null
    if (Object.keys(panelsWebchatQueue).length === 0) {
      // create panel
      var panel = new PanelWebchatQueueConstructor()
      openNewTab(panel, panelTab, insertIndex, 'WEBCHATQUEUE', null)
      panel.set('title', ucMsgs.TAB_WEBCHAT_REQUESTS)
      panelsWebchatQueue[panel.panelKey] = panel
    } else {
      // existing panel
      panel = panelsWebchatQueue[Object.keys(panelsWebchatQueue)[0]]
      if (
        panelTab &&
        (panel.getParent() !== panelTab || insertIndex !== null)
      ) {
        // move panel
        panel.getParent().removeChild(panel)
        panelTab.addChild(panel, insertIndex)
      }
    }
    if (onTop) {
      panel.getParent().selectChild(panel)
    }
    return panel
  }
  /*
   * Function openPreference
   */ var openPreference = function openPreference(
    panelTab,
    insertIndex,
    onTop,
  ) {
    var panel = null
    if (Object.keys(panelsPreference).length === 0) {
      var profile = chatClient.getProfile()
      var settings = chatClient.getSettings()
      var configProperties = chatClient.getConfigProperties() // create panel
      panel = new PanelPreferenceConstructor()
      openNewTab(panel, panelTab, insertIndex, 'PREFERENCE', null)
      if (getBrowser() !== 'Chrome' && getBrowser() !== 'Firefox') {
        panel.trThumbnailFrameRate.style.display = 'none'
        panel.trVideoSource.style.display = 'none'
      }
      if (
        getBrowser() === 'IE' ||
        (configProperties.optional_config &&
          configProperties.optional_config.screen_sharing_mode === 1)
      ) {
        panel.trShareScreenEnabled.style.display = 'none'
      }
      if (getBrowser() !== 'Firefox') {
        panel.spanShareScreenFirefox.style.display = 'none'
      }
      if (getBrowser() !== 'Chrome') {
        panel.spanShareScreenChrome.style.display = 'none'
      }
      if (getBrowser() === 'IE') {
        panel.trImageFileTransfer.style.display = 'none'
      }
      if (
        string(
          configProperties.optional_config &&
            configProperties.optional_config.language_setting,
        ) !== 'user'
      ) {
        panel.trUserLanguage.style.display = 'none'
      }
      if (
        !(
          configProperties.optional_config &&
          configProperties.optional_config.webchat_licensed
        )
      ) {
        panel.trCategoryWebchatSettings.style.display = 'none'
        panel.trDisplayName.style.display = 'none'
        panel.trAutoCloseRequest.style.display = 'none'
      }
      panel.set('title', ucMsgs.TAB_PREFERENCE) // init preference data
      preferenceWorkData[panel.panelKey] = {}
      preferenceWorkData[panel.panelKey].initial_status =
        settings.initial_status
      preferenceWorkData[panel.panelKey].thumbnailPosition =
        cookiePreference.thumbnailPosition
      preferenceWorkData[panel.panelKey].imageFileTransfer = string(
        settings.optional_settings &&
          settings.optional_settings.image_file_transfer,
      )
      preferenceWorkData[panel.panelKey].profileImageUploading = false
      preferenceWorkData[panel.panelKey].profileImageTo = ''
      preferenceWorkData[panel.panelKey].webRTCTypeName =
        cookiePreference.webRTCTypeName
      preferenceWorkData[panel.panelKey].videoSource =
        cookiePreference.videoSource
      preferenceWorkData[panel.panelKey].webnotif_status = string(
        settings.optional_settings &&
          settings.optional_settings.webnotif_status,
      )
      preferenceWorkData[panel.panelKey].webnotif_timeout = int(
        settings.optional_settings &&
          settings.optional_settings.webnotif_timeout,
      )
      preferenceWorkData[panel.panelKey].sending_confirmation = Boolean(
        settings.optional_settings &&
          settings.optional_settings.sending_confirmation,
      )
      preferenceWorkData[panel.panelKey].user_language = string(
        settings.optional_settings && settings.optional_settings.user_language,
      )
      panel.radioButtonUserLanguageList = {}
      require(['dijit/form/RadioButton', 'dijit/MenuItem'], function (
        RadioButton,
        MenuItem,
      ) {
        // create radio buttons
        var valid_languages = string(
          configProperties.optional_config &&
            configProperties.optional_config.valid_languages,
        ).split(',')
        for (var i = 0; i < valid_languages.length; i++) {
          var language = valid_languages[i]
          var label = document.createElement('label')
          var input = document.createElement('input')
          input.type = 'radio'
          input.name = panel.radioButtonUserLanguageAuto.name
          input.value = language
          label.className = panel.labelUserLanguageAuto.className
          label.innerHTML = escapeHTML(
            ucMsgs['CMN_LANGUAGE_' + language.toUpperCase()] || language,
          )
          label.insertBefore(input, label.firstChild)
          panel.tdUserLanguage.appendChild(document.createTextNode(' '))
          panel.tdUserLanguage.appendChild(label)
          var radioButton = new RadioButton(
            { checked: false, value: input.value, name: input.name },
            input,
          )
          radioButton.startup()
          panel.handlers.push(
            dojo.connect(
              radioButton,
              'onChange',
              getFuncApply(
                panelPreference_radioButtonUserLanguageChange,
                panel,
              ),
            ),
          )
          panel.radioButtonUserLanguageList[language] = radioButton
        } // create menu items of webrtc type
        var webrtc_types = []
        try {
          webrtc_types =
            JSON.parse(
              configProperties.optional_config &&
                configProperties.optional_config.webrtc_types,
            ) || []
        } catch (e) {
          logger.log('warn', 'failed to parse webrtc_types ' + e)
        }
        webrtc_types = [{}].concat(webrtc_types)
        for (var i = 0; i < webrtc_types.length; i++) {
          var item = new MenuItem({
            label:
              i === 0
                ? ucMsgs.LBL_WEBRTC_TYPE_STANDARD
                : string(webrtc_types[i].name),
            onClick: function onClick() {
              preferenceWorkData[panel.panelKey].webRTCTypeName =
                this.get('value')
              panel.dropDownButtonWebRTCType.set('label', this.label)
            },
          })
          item.set('value', string(webrtc_types[i].name))
          panel.dropDownMenuWebRTCType.addChild(item)
        } // display preference data
        displayPreference(panel)
        panel.imgProfileImage.style.backgroundImage = 'url(./img/progress.gif)' // cache progress.gif
        panel.imgProfileImage.setAttribute('data-brekeke-uc-url', '')
        setTimeout(function () {
          panel.imgProfileImage.style.backgroundImage =
            'url(' + profile.profile_image_url + ')'
          panel.imgProfileImage.setAttribute(
            'data-brekeke-uc-url',
            profile.profile_image_url + '&SIZE=ORIGINAL',
          )
        }, 100)
      })
      panelsPreference[panel.panelKey] = panel
    } else {
      // existing panel
      panel = panelsPreference[Object.keys(panelsPreference)[0]]
      if (
        panelTab &&
        (panel.getParent() !== panelTab || insertIndex !== null)
      ) {
        // move panel
        panel.getParent().removeChild(panel)
        panelTab.addChild(panel, insertIndex)
      }
    }
    if (onTop) {
      panel.getParent().selectChild(panel)
    }
    return panel
  }
  /*
   * Function openHistory
   */ var openHistory = function openHistory(panelTab, insertIndex, onTop) {
    // create panel
    var panel = new PanelHistoryConstructor()
    openNewTab(panel, panelTab, insertIndex, 'HISTORY', null)
    panel.set('title', ucMsgs.TAB_HISTORY)
    panelsHistory[panel.panelKey] = panel
    if (onTop) {
      panel.getParent().selectChild(panel)
    }
    return panel
  }
  /*
   * Function openHistorySearch
   */ var openHistorySearch = function openHistorySearch(
    panelTab,
    insertIndex,
    onTop,
    user,
    search,
  ) {
    // create panel
    var panel = new PanelHistorySearchConstructor()
    openNewTab(panel, panelTab, insertIndex, 'HISTORYSEARCH', null)
    panel.panelTopics.style.display = 'none'
    panel.buttonShowMore.domNode.style.display = 'none'
    panel.set('title', ucMsgs.TAB_HISTORY) // init search condition data
    var user_id = null
    if (user && user.user_id) {
      user_id = user.user_id
    }
    searchConditionHistory[panel.panelKey] = {
      searching: false,
      user: user_id,
      advanced: false,
      condition: null,
    }
    panelsHistory[panel.panelKey] = panel
    if (onTop) {
      panel.getParent().selectChild(panel)
      panel.textBoxConditionSimple.focus()
    }
    if (user_id) {
      // default label
      panel.dropDownButtonConditionSimpleUser.set(
        'label',
        chatClient.getBuddyUser(user).name || user_id,
      )
      panel.dropDownButtonConditionSimpleUser.set(
        'title',
        chatClient.getBuddyUser(user).name || user_id,
      )
    } // init menu items
    require(['dijit/MenuItem'], function (MenuItem) {
      var buddylist = chatClient.getBuddylist()
      var index = 1
      for (var i = 0; i < buddylist.user.length; i++) {
        var buddy = buddylist.user[i]
        if (buddy.user_id) {
          var item = new MenuItem({ label: buddy.name || buddy.user_id })
          panel.dropDownMenuConditionSimpleUser.addChild(item, index++)
          var thisArg = {
            panelKey: panel.panelKey,
            tenant: buddy.tenant,
            user_id: buddy.user_id,
            name: buddy.name || buddy.user_id,
          }
          panel.handlers.push(
            dojo.connect(
              item,
              'onClick',
              getFuncApply(
                panelHistorySearchMenuItemConditionSimpleUser_click,
                thisArg,
              ),
            ),
          )
          if (buddy.user_id === searchConditionHistory[panel.panelKey].user) {
            panel.dropDownButtonConditionSimpleUser.set(
              'label',
              buddy.name || buddy.user_id,
            )
            panel.dropDownButtonConditionSimpleUser.set(
              'title',
              buddy.name || buddy.user_id,
            )
          }
        }
      }
    })
    setTimeout(function () {
      searchTopicsSimple(panel)
    }, 0)
    return panel
  }
  /*
   * Function openServerSettings
   */ var openServerSettings = function openServerSettings(
    panelTab,
    insertIndex,
    onTop,
  ) {
    var panel = null
    if (Object.keys(panelsServerSettings).length === 0) {
      var configProperties = chatClient.getConfigProperties() // create panel
      panel = new PanelServerSettingsConstructor()
      openNewTab(panel, panelTab, insertIndex, 'SERVERSETTINGS', null)
      panel.buttonSaveServerSettings.set('disabled', true)
      panel.set('closable', false)
      panel.set('title', ucMsgs.TAB_SERVER_SETTINGS)
      serverSettingsWorkData[panel.panelKey] = {}
      var valid_languages = string(
        configProperties.optional_config &&
          configProperties.optional_config.valid_languages,
      ).split(',')
      for (var i = 0; i < valid_languages.length; i++) {
        var language = valid_languages[i]
        var option = document.createElement('option')
        option.value = language
        option.innerHTML = escapeHTML(
          ucMsgs['CMN_LANGUAGE_' + language.toUpperCase()] || language,
        )
        panel.sa_language.appendChild(option)
      }
      panelsServerSettings[panel.panelKey] = panel
      chatClient.loadSystemProperties(
        function (ev) {
          // funcOK
          ;(serverSettingsWorkData[panel.panelKey] =
            serverSettingsWorkData[panel.panelKey] || {}).systemProperties =
            ev.systemProperties
          ;(serverSettingsWorkData[panel.panelKey] =
            serverSettingsWorkData[panel.panelKey] || {}).systemPropertiesOrg =
            JSON.parse(JSON.stringify(ev.systemProperties))
          displayServerSettings(panel)
          panel.buttonSaveServerSettings.set('disabled', false)
        },
        function (ev) {
          // funcError
          logger.log(
            'warn',
            'loadSystemProperties error code: ' +
              ev.code +
              ', message: ' +
              ev.message,
          )
        },
      )
    } else {
      // existing panel
      panel = panelsServerSettings[Object.keys(panelsServerSettings)[0]]
      if (
        panelTab &&
        (panel.getParent() !== panelTab || insertIndex !== null)
      ) {
        // move panel
        panel.getParent().removeChild(panel)
        panelTab.addChild(panel, insertIndex)
      }
    }
    if (onTop) {
      panel.getParent().selectChild(panel)
    }
    return panel
  }
  /*
   * Function openBlockListSettings
   */ var openBlockListSettings = function openBlockListSettings(
    panelTab,
    insertIndex,
    onTop,
  ) {
    var panel = null
    if (Object.keys(panelsBlockListSettings).length === 0) {
      // create panel
      panel = new PanelBlockListSettingsConstructor()
      openNewTab(panel, panelTab, insertIndex, 'BLOCKLISTSETTINGS', null)
      panel.buttonSaveBlockListSettings.set('disabled', true)
      panel.set('closable', false)
      panel.set('title', ucMsgs.TAB_BLOCK_LIST_SETTINGS)
      panelsBlockListSettings[panel.panelKey] = panel
      chatClient.loadBlockListSettings(
        function (ev) {
          // funcOK
          panel.ip_reverse_proxy.value = string(ev.blocklist.ip_reverse_proxy)
          panel.reverse_proxy_header_name_for_real_ip.value = string(
            ev.blocklist.reverse_proxy_header_name_for_real_ip,
          )
          panel.reverse_proxy_header_value_format.value = string(
            ev.blocklist.reverse_proxy_header_value_format,
          )
          panel.reverse_proxy_header_name_for_remote_protocol.value = string(
            ev.blocklist.reverse_proxy_header_name_for_remote_protocol,
          )
          panel.reverse_proxy_header_value_format_for_remote_protocol.value =
            string(
              ev.blocklist
                .reverse_proxy_header_value_format_for_remote_protocol,
            )
          panel.count_fail.value = string(int(ev.blocklist.count_fail))
          panel.time_forget.value = string(
            Math.ceil(int(ev.blocklist.time_forget) / 1000),
          )
          panel.time_recover.value = string(
            Math.ceil(int(ev.blocklist.time_recover) / 1000),
          )
          panel.block_notification_url.value = string(
            ev.blocklist.block_notification_url,
          )
          ;(ev.blocklist.blocked || [])
            .sort(function (a, b) {
              return int(a.time) - int(b.time)
            })
            .forEach(function (entry, index) {
              if (entry.ip) {
                var tr = document.createElement('tr')
                tr.setAttribute('data-brekeke-uc-index', string(index))
                var td1 = document.createElement('td')
                td1.innerHTML = escapeHTML(string(entry.ip))
                tr.appendChild(td1)
                var td2 = document.createElement('td')
                td2.innerHTML = escapeHTML(
                  stringifyDate(new Date(int(entry.time))),
                )
                tr.appendChild(td2)
                var tdDelete = document.createElement('td')
                var buttonDelete = document.createElement('input')
                buttonDelete.setAttribute(
                  'data-brekeke-uc-index',
                  string(index),
                )
                buttonDelete.type = 'image'
                buttonDelete.src = 'img/delete.png'
                buttonDelete.alt = 'Delete'
                buttonDelete.title = 'Delete'
                tdDelete.appendChild(buttonDelete)
                tr.appendChild(tdDelete)
                panel.tbodyBlockList.appendChild(tr) // register event
                panel.handlers.push(
                  dojo.connect(
                    buttonDelete,
                    'click',
                    getFuncApply(panelBlockListSettingsButtonDelete_click, {
                      panel: panel,
                      ip: string(entry.ip),
                      index: index,
                    }),
                  ),
                )
              }
            })
          panel.buttonSaveBlockListSettings.set('disabled', false)
        },
        function (ev) {
          // funcError
          logger.log(
            'warn',
            'loadBlockListSettings error code: ' +
              ev.code +
              ', message: ' +
              ev.message,
          )
        },
      )
    } else {
      // existing panel
      panel = panelsBlockListSettings[Object.keys(panelsBlockListSettings)[0]]
      if (
        panelTab &&
        (panel.getParent() !== panelTab || insertIndex !== null)
      ) {
        // move panel
        panel.getParent().removeChild(panel)
        panelTab.addChild(panel, insertIndex)
      }
    }
    if (onTop) {
      panel.getParent().selectChild(panel)
    }
    return panel
  }
  /*
   * Function openUserManagement
   */ var openUserManagement = function openUserManagement(
    panelTab,
    insertIndex,
    onTop,
  ) {
    var panel = null
    if (Object.keys(panelsUserManagement).length === 0) {
      // create panel
      panel = new PanelUserManagementConstructor()
      openNewTab(panel, panelTab, insertIndex, 'USERMANAGEMENT', null)
      panel.set('closable', false)
      panel.set('title', ucMsgs.TAB_USER_MANAGEMENT)
      panelsUserManagement[panel.panelKey] = panel
    } else {
      // existing panel
      panel = panelsUserManagement[Object.keys(panelsUserManagement)[0]]
      if (
        panelTab &&
        (panel.getParent() !== panelTab || insertIndex !== null)
      ) {
        // move panel
        panel.getParent().removeChild(panel)
        panelTab.addChild(panel, insertIndex)
      }
    }
    if (onTop) {
      panel.getParent().selectChild(panel)
    }
    return panel
  }
  /*
   * Function openTenantTable
   */ var openTenantTable = function openTenantTable(
    panelTab,
    insertIndex,
    onTop,
  ) {
    var panel = null
    if (Object.keys(panelsTenantTable).length === 0) {
      // create panel
      panel = new PanelTenantTableConstructor()
      openNewTab(panel, panelTab, insertIndex, 'TENANTTABLE', null)
      panel.set('closable', false)
      panel.set('title', ucMsgs.TAB_TENANT_SETTINGS)
      tenantTableWorkData[panel.panelKey] = {}
      panelsTenantTable[panel.panelKey] = panel
      chatClient.loadTenantProperties(
        function (ev) {
          // funcOK
          tenantTableWorkData[panel.panelKey] = ev.tenantProperties
          displayTenantTable(panel)
        },
        function (ev) {
          // funcError
          logger.log(
            'warn',
            'loadTenantProperties error code: ' +
              ev.code +
              ', message: ' +
              ev.message,
          )
          panel.spanMessage.innerHTML =
            ucMsgs.MSG_LOAD_TENANT_FAILED +
            ' (' +
            ev.code +
            ' ' +
            ev.message +
            ')'
          panel.spanMessage.style.display = 'inline-block'
        },
      )
    } else {
      // existing panel
      panel = panelsTenantTable[Object.keys(panelsTenantTable)[0]]
      if (
        panelTab &&
        (panel.getParent() !== panelTab || insertIndex !== null)
      ) {
        // move panel
        panel.getParent().removeChild(panel)
        panelTab.addChild(panel, insertIndex)
      }
    }
    if (onTop) {
      panel.getParent().selectChild(panel)
    }
    return panel
  }
  /*
   * Function openTenantProperty
   */ var openTenantProperty = function openTenantProperty(
    tenant,
    panelTab,
    insertIndex,
    onTop,
  ) {
    var key = tenant
    var panel = null
    if (!panelsTenantProperty[key]) {
      var configProperties = chatClient.getConfigProperties() // create panel
      panel = new PanelTenantPropertyConstructor()
      openNewTab(panel, panelTab, insertIndex, 'TENANTPROPERTY', key)
      panel.set(
        'closable',
        chatClient.getProfile().user_type !==
          Constants.USER_TYPE_SYSTEM_ADMIN && !mySignInParams.admin_mode,
      )
      var nameSuffix = toUtf16HexStr(key)
      panel.radioButtonLanguageSettingAuto.set(
        'name',
        'radioButtonLanguageSetting' + nameSuffix,
      )
      panel.radioButtonLanguageSettingUser.set(
        'name',
        'radioButtonLanguageSetting' + nameSuffix,
      )
      panel.radioButtonWebchatEnabledOn.set(
        'name',
        'radioButtonWebchatEnabled' + nameSuffix,
      )
      panel.radioButtonWebchatEnabledOff.set(
        'name',
        'radioButtonWebchatEnabled' + nameSuffix,
      )
      panel.radioButtonPNEnabledOn.set(
        'name',
        'radioButtonPNEnabled' + nameSuffix,
      )
      panel.radioButtonPNEnabledOff.set(
        'name',
        'radioButtonPNEnabled' + nameSuffix,
      )
      if (
        brLogin.multitenant &&
        chatClient.getProfile().user_type === Constants.USER_TYPE_SYSTEM_ADMIN
      ) {
        panel.set('title', tenant)
      } else {
        panel.trCategoryResource.style.display = 'none'
        panel.trMaxLogin.style.display = 'none'
        panel.trLimitGuest.style.display = 'none'
        panel.set('title', ucMsgs.TAB_TENANT_PROPERTIES)
      }
      if (
        int(
          configProperties.optional_config &&
            configProperties.optional_config.buddy_max_locked,
        ) % 2
      ) {
        panel.trUcTenantBuddyMax.style.display = 'none'
      }
      if (
        !(
          configProperties.optional_config &&
          configProperties.optional_config.webchat_licensed
        )
      ) {
        panel.trLimitGuest.style.display = 'none'
        panel.trCategoryWebchat.style.display = 'none'
        panel.trWebchatEnabled.style.display = 'none'
      }
      if (
        !(
          configProperties.optional_config &&
          configProperties.optional_config.pn_licensed
        )
      ) {
        panel.trPNEnabled.style.display = 'none'
      }
      if (
        int(
          configProperties.optional_config &&
            configProperties.optional_config.send_report_mail_locked,
        ) % 2
      ) {
        panel.trSendReportMail.style.display = 'none'
      }
      if (
        int(
          configProperties.optional_config &&
            configProperties.optional_config.status_options_enabled_locked,
        ) % 2
      ) {
        panel.trStatusOptions.style.display = 'none'
      }
      if (
        int(
          configProperties.optional_config &&
            configProperties.optional_config.display_name_locked,
        ) % 2
      ) {
        panel.trDisplayName.style.display = 'none'
      }
      if (
        int(
          configProperties.optional_config &&
            configProperties.optional_config.sending_confirmation_locked,
        ) % 2
      ) {
        panel.trSendingConfirmation.style.display = 'none'
      }
      if (
        int(
          configProperties.optional_config &&
            configProperties.optional_config.name_display_mode_locked,
        ) % 2
      ) {
        panel.trNameDisplayMode.style.display = 'none'
      }
      if (
        int(
          configProperties.optional_config &&
            configProperties.optional_config.notify_call_status_locked,
        ) % 2
      ) {
        panel.trNotifyCallStatus.style.display = 'none'
      }
      if (
        int(
          configProperties.optional_config &&
            configProperties.optional_config.notify_conf_status_locked,
        ) % 2
      ) {
        panel.trNotifyConfStatus.style.display = 'none'
      }
      if (
        int(
          configProperties.optional_config &&
            configProperties.optional_config.dtmf_shortcut_locked,
        ) % 2
      ) {
        panel.trDtmfShortcut.style.display = 'none'
      }
      if (
        int(
          configProperties.optional_config &&
            configProperties.optional_config.display_period_locked,
        ) % 2
      ) {
        panel.trDisplayPeriod.style.display = 'none'
      }
      if (
        int(
          configProperties.optional_config &&
            configProperties.optional_config.chat_bg_color_locked,
        ) % 2
      ) {
        panel.trChatBgColor.style.display = 'none'
      }
      if (
        int(
          configProperties.optional_config &&
            configProperties.optional_config.dbgopt_locked,
        ) % 2
      ) {
        panel.trDbgopt.style.display = 'none'
      }
      if (
        int(
          configProperties.optional_config &&
            configProperties.optional_config.fsp_locked,
        ) % 2
      ) {
        panel.trFileSendingPermission.style.display = 'none'
      }
      if (
        int(
          configProperties.optional_config &&
            configProperties.optional_config.fsms_locked,
        ) % 2
      ) {
        panel.trFileSendingMaxSize.style.display = 'none'
      }
      if (
        int(
          configProperties.optional_config &&
            configProperties.optional_config.fsna_locked,
        ) % 2
      ) {
        panel.trFileSendingNameAllowed.style.display = 'none'
      }
      if (
        int(
          configProperties.optional_config &&
            configProperties.optional_config.client_script_locked,
        ) % 2
      ) {
        panel.trCategoryClientScript.style.display = 'none'
        panel.trClientScript.style.display = 'none'
      }
      if (
        !(
          configProperties.optional_config &&
          configProperties.optional_config.customize_t_schedules
        )
      ) {
        if (
          (configProperties.optional_config &&
            configProperties.optional_config.customize_t_schedules) !== ''
        ) {
          panel.trCategoryCustomizeT.style.display = 'none'
        } else {
          panel.trCustomizeTError.style.display = ''
        }
        panel.trCustomizeTs.style.display = 'none'
      }
      tenantPropertyWorkData[panel.panelKey] = {}
      panelsTenantProperty[panel.panelKey] = panel
      panel.radioButtonLanguageSettingList = {}
      require(['dijit/form/RadioButton'], function (RadioButton) {
        var valid_languages = string(
          configProperties.optional_config &&
            configProperties.optional_config.valid_languages,
        ).split(',')
        for (var i = 0; i < valid_languages.length; i++) {
          var language = valid_languages[i]
          var label = document.createElement('label')
          var input = document.createElement('input')
          input.type = 'radio'
          input.name = panel.radioButtonLanguageSettingAuto.name
          input.value = language
          label.className = panel.labelLanguageSettingAuto.className
          label.innerHTML = escapeHTML(
            ucMsgs['CMN_LANGUAGE_' + language.toUpperCase()] || language,
          )
          label.insertBefore(input, label.firstChild)
          panel.tdLanguageSetting.appendChild(document.createTextNode(' '))
          panel.tdLanguageSetting.appendChild(label)
          var radioButton = new RadioButton(
            { checked: false, value: input.value, name: input.name },
            input,
          )
          radioButton.startup()
          panel.handlers.push(
            dojo.connect(
              radioButton,
              'onChange',
              getFuncApply(
                panelTenantProperty_radioButtonLanguageSettingChange,
                panel,
              ),
            ),
          )
          panel.radioButtonLanguageSettingList[language] = radioButton
        }
        chatClient.loadTenantProperties(
          function (ev) {
            // funcOK
            if (ev.tenantProperties[tenant]) {
              tenantPropertyWorkData[panel.panelKey] =
                ev.tenantProperties[tenant]
              if (
                !(
                  configProperties.optional_config &&
                  configProperties.optional_config.webchat_licensed
                )
              ) {
                tenantPropertyWorkData[panel.panelKey].webchat_enabled = 'false'
              }
            }
            displayTenantProperty(panel)
            panel.imgAutoMessageDefaultImage.style.backgroundImage =
              'url(./img/progress.gif)' // cache progress.gif
            panel.imgAutoMessageDefaultImage.setAttribute(
              'data-brekeke-uc-url',
              '',
            )
            displayAutoMessageImages(panel)
          },
          function (ev) {
            // funcError
            logger.log(
              'warn',
              'loadTenantProperties error code: ' +
                ev.code +
                ', message: ' +
                ev.message,
            )
            panel.spanMessage.innerHTML =
              ucMsgs.MSG_LOAD_TENANT_PROPERTY_FAILED +
              ' (' +
              ev.code +
              ' ' +
              ev.message +
              ')'
            panel.spanMessage.style.display = 'inline-block'
          },
        )
      })
    } else {
      // existing panel
      panel = panelsTenantProperty[key]
      if (
        panelTab &&
        (panel.getParent() !== panelTab || insertIndex !== null)
      ) {
        // move panel
        panel.getParent().removeChild(panel)
        panelTab.addChild(panel, insertIndex)
      }
    }
    if (onTop) {
      panel.getParent().selectChild(panel)
    }
    return panel
  }
  /*
   * Function openTenantSettings
   */ var openTenantSettings = function openTenantSettings(
    panelTab,
    insertIndex,
    onTop,
  ) {
    var panel = null
    if (Object.keys(panelsTenantSettings).length === 0) {
      // create panel
      panel = new PanelTenantSettingsConstructor()
      openNewTab(panel, panelTab, insertIndex, 'TENANTSETTINGS', null)
      panel.buttonSaveTenantSettings.set('disabled', true)
      panel.set('closable', false)
      panel.set('title', ucMsgs.TAB_TENANT_SETTINGS)
      tenantSettingsWorkData[panel.panelKey] = {}
      panelsTenantSettings[panel.panelKey] = panel
      chatClient.loadTenantSettings(
        function (ev) {
          // funcOK
          tenantSettingsWorkData[panel.panelKey] = ev.tenantSettings
          displayTenantSettings(panel)
          panel.buttonSaveTenantSettings.set('disabled', false)
        },
        function (ev) {
          // funcError
          logger.log(
            'warn',
            'loadTenantSettings error code: ' +
              ev.code +
              ', message: ' +
              ev.message,
          )
        },
      )
    } else {
      // existing panel
      panel = panelsTenantSettings[Object.keys(panelsTenantSettings)[0]]
      if (
        panelTab &&
        (panel.getParent() !== panelTab || insertIndex !== null)
      ) {
        // move panel
        panel.getParent().removeChild(panel)
        panelTab.addChild(panel, insertIndex)
      }
    }
    if (onTop) {
      panel.getParent().selectChild(panel)
    }
    return panel
  }
  /*
   * Function openAdvancedSettings
   */ var openAdvancedSettings = function openAdvancedSettings(
    panelTab,
    insertIndex,
    onTop,
  ) {
    var panel = null
    if (Object.keys(panelsAdvancedSettings).length === 0) {
      // create panel
      panel = new PanelAdvancedSettingsConstructor()
      openNewTab(panel, panelTab, insertIndex, 'ADVANCEDSETTINGS', null)
      panel.buttonSaveAdvancedSettings.set('disabled', true)
      panel.set('closable', false)
      panel.set('title', ucMsgs.TAB_ADVANCED_SETTINGS)
      panelsAdvancedSettings[panel.panelKey] = panel
      chatClient.loadAdvancedSettings(
        function (ev) {
          // funcOK
          panel.advanced_settings.value = ev.advancedSettings
          panel.buttonSaveAdvancedSettings.set('disabled', false)
        },
        function (ev) {
          // funcError
          logger.log(
            'warn',
            'loadAdvancedSettings error code: ' +
              ev.code +
              ', message: ' +
              ev.message,
          )
        },
      )
    } else {
      // existing panel
      panel = panelsAdvancedSettings[Object.keys(panelsAdvancedSettings)[0]]
      if (
        panelTab &&
        (panel.getParent() !== panelTab || insertIndex !== null)
      ) {
        // move panel
        panel.getParent().removeChild(panel)
        panelTab.addChild(panel, insertIndex)
      }
    }
    if (onTop) {
      panel.getParent().selectChild(panel)
    }
    return panel
  }
  /*
   * Function openSoftwareUpdate
   */ var openSoftwareUpdate = function openSoftwareUpdate(
    panelTab,
    insertIndex,
    onTop,
  ) {
    var panel = null
    if (Object.keys(panelsSoftwareUpdate).length === 0) {
      // create panel
      panel = new PanelSoftwareUpdateConstructor()
      openNewTab(panel, panelTab, insertIndex, 'SOFTWAREUPDATE', null)
      panel.set('closable', false)
      panel.set('title', ucMsgs.TAB_UPDATE_SOFTWARE)
      panel.iframeSoftwareUpdate.src =
        '/' + location.pathname.split('/')[1] + '/update.jsp'
      panelsSoftwareUpdate[panel.panelKey] = panel
    } else {
      // existing panel
      panel = panelsSoftwareUpdate[Object.keys(panelsSoftwareUpdate)[0]]
      if (
        panelTab &&
        (panel.getParent() !== panelTab || insertIndex !== null)
      ) {
        // move panel
        panel.getParent().removeChild(panel)
        panelTab.addChild(panel, insertIndex)
      }
    }
    if (onTop) {
      panel.getParent().selectChild(panel)
    }
    return panel
  }
  /*
   * Function openActivateLicense
   */ var openActivateLicense = function openActivateLicense(
    panelTab,
    insertIndex,
    onTop,
  ) {
    var panel = null
    if (Object.keys(panelsActivateLicense).length === 0) {
      // create panel
      panel = new PanelActivateLicenseConstructor()
      openNewTab(panel, panelTab, insertIndex, 'ACTIVATELICENSE', null)
      panel.set('closable', false)
      panel.set('title', ucMsgs.TAB_ACTIVATE_LICENSE)
      panel.iframeActivateLicense.src =
        '/' + location.pathname.split('/')[1] + '/license.jsp'
      panelsActivateLicense[panel.panelKey] = panel
    } else {
      // existing panel
      panel = panelsActivateLicense[Object.keys(panelsActivateLicense)[0]]
      if (
        panelTab &&
        (panel.getParent() !== panelTab || insertIndex !== null)
      ) {
        // move panel
        panel.getParent().removeChild(panel)
        panelTab.addChild(panel, insertIndex)
      }
    }
    if (onTop) {
      panel.getParent().selectChild(panel)
    }
    return panel
  }
  /*
   * Function openTwitterSettings
   */ var openTwitterSettings = function openTwitterSettings(
    tenant,
    panelTab,
    insertIndex,
    onTop,
  ) {
    var key = string(tenant || '/')
    var panel = null
    if (!panelsTwitterSettings[key]) {
      // create panel
      panel = new PanelTabChildConstructor()
      openNewTab(panel, panelTab, insertIndex, 'TWITTERSETTINGS', key)
      panel.set('closable', false)
      panel.set('title', formatStr(ucMsgs.TAB_SOCIAL_SETTINGS, 'Twitter'))
      var node = document.createElement('div')
      node.className = 'brUCSocialSettingsArea'
      panel.domNode.appendChild(node)
      var hr = document.createElement('hr')
      hr.className = 'brUCHrCancelSocialSettings'
      panel.domNode.appendChild(hr)
      var button = document.createElement('button')
      button.className = 'brUCButtonCancelSocialSettings'
      button.innerHTML = 'Close'
      button.addEventListener('click', _closeTab.bind(this, panel))
      panel.domNode.appendChild(button)
      chatClient.createSocialToken(
        { social: 'twitter', tenant: tenant },
        function (ev) {
          var sa =
            chatClient.getProfile().user_type ===
            Constants.USER_TYPE_SYSTEM_ADMIN
          if (ev && ev.result) {
            if (!tenant) {
              Brekeke.ucconnect.twitter_settings.start(
                ev.result,
                node,
                undefined,
                undefined,
                undefined,
                sa,
                chatClient,
              )
            } else {
              Brekeke.ucconnect.twitter_settings.start(
                ev.result,
                node,
                undefined,
                true,
                string(tenant),
                sa,
                chatClient,
              )
            }
          } else {
            logger.log(
              'warn',
              'chatClient.createSocialToken returned invalid result: ' +
                (ev && ev.result),
            )
          }
        },
        function (ev) {
          logger.log(
            'warn',
            'chatClient.createSocialToken error code: ' +
              ev.code +
              ', message: ' +
              ev.message,
          )
        },
      )
      panelsTwitterSettings[panel.panelKey] = panel
    } else {
      // existing panel
      panel = panelsTwitterSettings[key]
      if (
        panelTab &&
        (panel.getParent() !== panelTab || insertIndex !== null)
      ) {
        // move panel
        panel.getParent().removeChild(panel)
        panelTab.addChild(panel, insertIndex)
      }
    }
    if (onTop) {
      panel.getParent().selectChild(panel)
    }
    return panel
  }
  /*
   * Function openFacebookSettings
   */ var openFacebookSettings = function openFacebookSettings(
    tenant,
    panelTab,
    insertIndex,
    onTop,
  ) {
    var key = string(tenant || '/')
    var panel = null
    if (!panelsFacebookSettings[key]) {
      // create panel
      panel = new PanelTabChildConstructor()
      openNewTab(panel, panelTab, insertIndex, 'FACEBOOKSETTINGS', key)
      panel.set('closable', false)
      panel.set('title', formatStr(ucMsgs.TAB_SOCIAL_SETTINGS, 'Facebook'))
      var node = document.createElement('div')
      node.className = 'brUCSocialSettingsArea'
      panel.domNode.appendChild(node)
      var hr = document.createElement('hr')
      hr.className = 'brUCHrCancelSocialSettings'
      panel.domNode.appendChild(hr)
      var button = document.createElement('button')
      button.className = 'brUCButtonCancelSocialSettings'
      button.innerHTML = 'Close'
      button.addEventListener('click', _closeTab.bind(this, panel))
      panel.domNode.appendChild(button)
      chatClient.createSocialToken(
        { social: 'facebook', tenant: tenant },
        function (ev) {
          var sa =
            chatClient.getProfile().user_type ===
            Constants.USER_TYPE_SYSTEM_ADMIN
          if (ev && ev.result) {
            if (!tenant) {
              Brekeke.ucconnect.facebook_settings.start(
                ev.result,
                node,
                undefined,
                undefined,
                undefined,
                sa,
                chatClient,
              )
            } else {
              Brekeke.ucconnect.facebook_settings.start(
                ev.result,
                node,
                undefined,
                true,
                string(tenant),
                sa,
                chatClient,
              )
            }
          } else {
            logger.log(
              'warn',
              'chatClient.createSocialToken returned invalid result: ' +
                (ev && ev.result),
            )
          }
        },
        function (ev) {
          logger.log(
            'warn',
            'chatClient.createSocialToken error code: ' +
              ev.code +
              ', message: ' +
              ev.message,
          )
        },
      )
      panelsFacebookSettings[panel.panelKey] = panel
    } else {
      // existing panel
      panel = panelsFacebookSettings[key]
      if (
        panelTab &&
        (panel.getParent() !== panelTab || insertIndex !== null)
      ) {
        // move panel
        panel.getParent().removeChild(panel)
        panelTab.addChild(panel, insertIndex)
      }
    }
    if (onTop) {
      panel.getParent().selectChild(panel)
    }
    return panel
  }
  /*
   * Function openLineSettings
   */ var openLineSettings = function openLineSettings(
    tenant,
    panelTab,
    insertIndex,
    onTop,
  ) {
    var key = string(tenant || '/')
    var panel = null
    if (!panelsLineSettings[key]) {
      // create panel
      panel = new PanelTabChildConstructor()
      openNewTab(panel, panelTab, insertIndex, 'LINESETTINGS', key)
      panel.set('closable', false)
      panel.set('title', formatStr(ucMsgs.TAB_SOCIAL_SETTINGS, 'LINE'))
      var node = document.createElement('div')
      node.className = 'brUCSocialSettingsArea'
      panel.domNode.appendChild(node)
      var hr = document.createElement('hr')
      hr.className = 'brUCHrCancelSocialSettings'
      panel.domNode.appendChild(hr)
      var button = document.createElement('button')
      button.className = 'brUCButtonCancelSocialSettings'
      button.innerHTML = 'Close'
      button.addEventListener('click', _closeTab.bind(this, panel))
      panel.domNode.appendChild(button)
      chatClient.createSocialToken(
        { social: 'line', tenant: tenant },
        function (ev) {
          var sa =
            chatClient.getProfile().user_type ===
            Constants.USER_TYPE_SYSTEM_ADMIN
          if (ev && ev.result) {
            if (!tenant) {
              Brekeke.ucconnect.line_settings.start(
                ev.result,
                node,
                undefined,
                undefined,
                undefined,
                sa,
                chatClient,
              )
            } else {
              Brekeke.ucconnect.line_settings.start(
                ev.result,
                node,
                undefined,
                true,
                string(tenant),
                sa,
                chatClient,
              )
            }
          } else {
            logger.log(
              'warn',
              'chatClient.createSocialToken returned invalid result: ' +
                (ev && ev.result),
            )
          }
        },
        function (ev) {
          logger.log(
            'warn',
            'chatClient.createSocialToken error code: ' +
              ev.code +
              ', message: ' +
              ev.message,
          )
        },
      )
      panelsLineSettings[panel.panelKey] = panel
    } else {
      // existing panel
      panel = panelsLineSettings[key]
      if (
        panelTab &&
        (panel.getParent() !== panelTab || insertIndex !== null)
      ) {
        // move panel
        panel.getParent().removeChild(panel)
        panelTab.addChild(panel, insertIndex)
      }
    }
    if (onTop) {
      panel.getParent().selectChild(panel)
    }
    return panel
  }
  /*
   * Function openWatsonSettings
   */ var openWatsonSettings = function openWatsonSettings(
    tenant,
    panelTab,
    insertIndex,
    onTop,
  ) {
    var key = string(tenant || '/')
    var panel = null
    if (!panelsWatsonSettings[key]) {
      // create panel
      panel = new PanelTabChildConstructor()
      openNewTab(panel, panelTab, insertIndex, 'WATSONSETTINGS', key)
      panel.set('closable', false)
      panel.set('title', formatStr(ucMsgs.TAB_SOCIAL_SETTINGS, 'Chatbot'))
      var node = document.createElement('div')
      node.className = 'brUCSocialSettingsArea'
      panel.domNode.appendChild(node)
      var hr = document.createElement('hr')
      hr.className = 'brUCHrCancelSocialSettings'
      panel.domNode.appendChild(hr)
      var button = document.createElement('button')
      button.className = 'brUCButtonCancelSocialSettings'
      button.innerHTML = 'Close'
      button.addEventListener('click', _closeTab.bind(this, panel))
      panel.domNode.appendChild(button)
      chatClient.createSocialToken(
        { social: 'bot', tenant: tenant },
        function (ev) {
          var sa =
            chatClient.getProfile().user_type ===
            Constants.USER_TYPE_SYSTEM_ADMIN
          if (ev && ev.result) {
            if (!tenant) {
              Brekeke.ucconnect.bot_settings.start(
                ev.result,
                node,
                undefined,
                undefined,
                undefined,
                sa,
                chatClient,
              )
            } else {
              Brekeke.ucconnect.bot_settings.start(
                ev.result,
                node,
                undefined,
                true,
                string(tenant),
                sa,
                chatClient,
              )
            }
          } else {
            logger.log(
              'warn',
              'chatClient.createSocialToken returned invalid result: ' +
                (ev && ev.result),
            )
          }
        },
        function (ev) {
          logger.log(
            'warn',
            'chatClient.createSocialToken error code: ' +
              ev.code +
              ', message: ' +
              ev.message,
          )
        },
      )
      panelsWatsonSettings[panel.panelKey] = panel
    } else {
      // existing panel
      panel = panelsWatsonSettings[key]
      if (
        panelTab &&
        (panel.getParent() !== panelTab || insertIndex !== null)
      ) {
        // move panel
        panel.getParent().removeChild(panel)
        panelTab.addChild(panel, insertIndex)
      }
    }
    if (onTop) {
      panel.getParent().selectChild(panel)
    }
    return panel
  }
  /*
   * Function openEmailSettings
   */ var openEmailSettings = function openEmailSettings(
    tenant,
    panelTab,
    insertIndex,
    onTop,
  ) {
    var key = string(tenant || '/')
    var panel = null
    if (!panelsEmailSettings[key]) {
      // create panel
      panel = new PanelTabChildConstructor()
      openNewTab(panel, panelTab, insertIndex, 'EMAILSETTINGS', key)
      panel.set('closable', false)
      panel.set('title', formatStr(ucMsgs.TAB_SOCIAL_SETTINGS, 'Email'))
      var node = document.createElement('div')
      node.className = 'brUCSocialSettingsArea'
      panel.domNode.appendChild(node)
      var hr = document.createElement('hr')
      hr.className = 'brUCHrCancelSocialSettings'
      panel.domNode.appendChild(hr)
      var button = document.createElement('button')
      button.className = 'brUCButtonCancelSocialSettings'
      button.innerHTML = 'Close'
      button.addEventListener('click', _closeTab.bind(this, panel))
      panel.domNode.appendChild(button)
      chatClient.createSocialToken(
        { social: 'email', tenant: tenant },
        function (ev) {
          var sa =
            chatClient.getProfile().user_type ===
            Constants.USER_TYPE_SYSTEM_ADMIN
          if (ev && ev.result) {
            if (!tenant) {
              Brekeke.ucconnect.email_settings.start(
                ev.result,
                node,
                undefined,
                undefined,
                undefined,
                sa,
                chatClient,
              )
            } else {
              Brekeke.ucconnect.email_settings.start(
                ev.result,
                node,
                undefined,
                true,
                string(tenant),
                sa,
                chatClient,
              )
            }
          } else {
            logger.log(
              'warn',
              'chatClient.createSocialToken returned invalid result: ' +
                (ev && ev.result),
            )
          }
        },
        function (ev) {
          logger.log(
            'warn',
            'chatClient.createSocialToken error code: ' +
              ev.code +
              ', message: ' +
              ev.message,
          )
        },
      )
      panelsEmailSettings[panel.panelKey] = panel
    } else {
      // existing panel
      panel = panelsEmailSettings[key]
      if (
        panelTab &&
        (panel.getParent() !== panelTab || insertIndex !== null)
      ) {
        // move panel
        panel.getParent().removeChild(panel)
        panelTab.addChild(panel, insertIndex)
      }
    }
    if (onTop) {
      panel.getParent().selectChild(panel)
    }
    return panel
  }
  /*
   * Function openGuestSettings
   */ var openGuestSettings = function openGuestSettings(
    tenant,
    panelTab,
    insertIndex,
    onTop,
  ) {
    var key = string(tenant || '/')
    var panel = null
    if (!panelsGuestSettings[key]) {
      // create panel
      panel = new PanelTabChildConstructor()
      openNewTab(panel, panelTab, insertIndex, 'GUESTSETTINGS', key)
      panel.set('closable', false)
      panel.set('title', formatStr(ucMsgs.TAB_SOCIAL_SETTINGS, 'Guest channel'))
      var node = document.createElement('div')
      node.className = 'brUCSocialSettingsArea'
      panel.domNode.appendChild(node)
      var hr = document.createElement('hr')
      hr.className = 'brUCHrCancelSocialSettings'
      panel.domNode.appendChild(hr)
      var button = document.createElement('button')
      button.className = 'brUCButtonCancelSocialSettings'
      button.innerHTML = 'Close'
      button.addEventListener('click', _closeTab.bind(this, panel))
      panel.domNode.appendChild(button)
      chatClient.createSocialToken(
        { social: 'guest', tenant: tenant },
        function (ev) {
          var sa =
            chatClient.getProfile().user_type ===
            Constants.USER_TYPE_SYSTEM_ADMIN
          if (ev && ev.result) {
            if (!tenant) {
              Brekeke.ucconnect.guest_settings.start(
                ev.result,
                node,
                undefined,
                undefined,
                undefined,
                sa,
                chatClient,
              )
            } else {
              Brekeke.ucconnect.guest_settings.start(
                ev.result,
                node,
                undefined,
                true,
                string(tenant),
                sa,
                chatClient,
              )
            }
          } else {
            logger.log(
              'warn',
              'chatClient.createSocialToken returned invalid result: ' +
                (ev && ev.result),
            )
          }
        },
        function (ev) {
          logger.log(
            'warn',
            'chatClient.createSocialToken error code: ' +
              ev.code +
              ', message: ' +
              ev.message,
          )
        },
      )
      panelsGuestSettings[panel.panelKey] = panel
    } else {
      // existing panel
      panel = panelsGuestSettings[key]
      if (
        panelTab &&
        (panel.getParent() !== panelTab || insertIndex !== null)
      ) {
        // move panel
        panel.getParent().removeChild(panel)
        panelTab.addChild(panel, insertIndex)
      }
    }
    if (onTop) {
      panel.getParent().selectChild(panel)
    }
    return panel
  }
  /*
   * Function openNewTab
   */ var openNewTab = function openNewTab(
    panel,
    panelTab,
    insertIndex,
    panelType,
    panelKey,
  ) {
    if (!panelTab) {
      lastAddedPanelTabIndex = getEmptiestPanelTabIndex()
      panelTab = panelsTab[lastAddedPanelTabIndex]
    }
    panelTab.addChild(panel, insertIndex)
    panel.panelType = panelType
    panel.panelKey = panelKey || 'panel' + ++panelKeyCounter
    panel.startup()
  }
  /*
   * Function closeTab
   */ var _closeTab = function closeTab(panel, count) {
    count = int(count)
    if (panel.panelType === 'CONFERENCE') {
      if (count === 0) {
        if (
          chatClient.getConference(panel.panelKey).conf_status ===
          Constants.CONF_STATUS_JOINED
        ) {
          windowConfirm(
            ucMsgs.LBL_LEAVE_CONFERENCE_TITLE,
            ucMsgs.MSG_LEAVE_CONFERENCE_CONFIRM + '<br />',
            _closeTab.bind(window, panel, count + 1),
          )
          return
        }
      }
    }
    if (getSessionFromPanel(panel.panelType, panel.panelKey)) {
      // clear call and wait until closing
      clearCall(panel)
      if (count < 100) {
        setTimeout(_closeTab.bind(window, panel, count + 1), 100)
      }
      return
    } // TODO: yano broadcast
    if (
      panel.panelType === 'BROADCAST' &&
      broadcastCallsTable[panel.panelKey]
    ) {
      // clear call and wait until closing
      clearCall(panel)
      if (count < 100) {
        setTimeout(_closeTab.bind(window, panel, count + 1), 100)
      }
      return
    }
    if (panel.panelType === 'WEBCHATQUEUE') {
      if (webchatQueueList.length) {
        return
      }
    }
    var filesToDelete = []
    if (panel.panelType === 'CHAT') {
      // cancel file transfer and wait
      var uncanceled = false
      for (var file_id in fileTable) {
        if (fileTable[file_id].panelKey === panel.panelKey) {
          if (
            fileTable[file_id].fileInfo.status ===
              Constants.FILE_STATUS_UNACCEPTED ||
            fileTable[file_id].fileInfo.status ===
              Constants.FILE_STATUS_TRANSFERRING
          ) {
            cancelFile(file_id, true)
            uncanceled = true
          }
          filesToDelete.push(file_id)
        }
      }
      if (uncanceled && count < 101) {
        setTimeout(_closeTab.bind(window, panel, count + 1), 100)
        return
      }
    }
    panel.selectedEvents = null
    if (activePanelKey === panel.panelKey) {
      activePanelKey = ''
    }
    if (panel.panelType === 'CHAT') {
      if (!panelsChat[panel.panelKey]) {
        // already closed
        return
      } // remove buddies
      removeBuddiesOnPanel(panel) // clear message list
      if (messageListsChat[panel.panelKey]) {
        delete messageListsChat[panel.panelKey]
      } // clear typing
      if (lastSentTypingTimeTable[panel.panelKey]) {
        delete lastSentTypingTimeTable[panel.panelKey]
      } // clear file data
      for (var i = 0; i < filesToDelete.length; i++) {
        var file_id = filesToDelete[i]
        var events = fileTable[file_id].events
        for (var j = 0; j < events.length; j++) {
          events[j].remove()
        }
        if (
          fileTable[file_id].inlineImage &&
          fileTable[file_id].inlineImage.url
        ) {
          window.URL.revokeObjectURL(fileTable[file_id].inlineImage.url)
        }
        delete fileTable[file_id]
      } // delete
      delete panelsChat[panel.panelKey] // display
      displayBuddylist(false)
    } else if (panel.panelType === 'CONFERENCE') {
      if (!panelsConference[panel.panelKey]) {
        // already closed
        return
      } // remove buddies
      removeBuddiesOnPanel(panel) // clear message list
      if (messageListsConference[panel.panelKey]) {
        delete messageListsConference[panel.panelKey]
      }
      var conference = chatClient.getConference(panel.panelKey)
      if (
        (!conference.invite_properties.webchatfromguest &&
          conference.conf_status !== Constants.CONF_STATUS_INACTIVE) ||
        conference.conf_status === Constants.CONF_STATUS_JOINED
      ) {
        // leave conference
        leaveConference(panel.panelKey, false)
      } // delete
      delete panelsConference[panel.panelKey]
    } else if (panel.panelType === 'BROADCAST') {
      if (!panelsBroadcast[panel.panelKey]) {
        // already closed
        return
      } // remove buddies
      removeBuddiesOnPanel(panel) // clear message list
      if (messageListsBroadcast[panel.panelKey]) {
        delete messageListsBroadcast[panel.panelKey]
      } // delete
      if (broadcastUsersTable[panel.panelKey]) {
        for (var i = 0; i < broadcastUsersTable[panel.panelKey].length; i++) {
          if (broadcastUsersTable[panel.panelKey][i].connection) {
            broadcastUsersTable[panel.panelKey][i].connection.remove()
          }
        }
        delete broadcastUsersTable[panel.panelKey]
      }
      delete panelsBroadcast[panel.panelKey]
    } else if (panel.panelType === 'EXTERNALCALL') {
      if (!panelsExternalCall[panel.panelKey]) {
        // already closed
        return
      } // delete
      delete panelsExternalCall[panel.panelKey]
    } else if (panel.panelType === 'WEBCHATQUEUE') {
      if (!panelsWebchatQueue[panel.panelKey]) {
        // already closed
        return
      } // clear work data
      if (webchatQueueWorkData[panel.panelKey]) {
        for (var conf_id in webchatQueueWorkData[panel.panelKey]) {
          for (
            var i = 0;
            i <
            webchatQueueWorkData[panel.panelKey][conf_id].connections.length;
            i++
          ) {
            webchatQueueWorkData[panel.panelKey][conf_id].connections[
              i
            ].remove()
          }
        }
        delete webchatQueueWorkData[panel.panelKey]
      } // delete
      delete panelsWebchatQueue[panel.panelKey]
    } else if (panel.panelType === 'PREFERENCE') {
      if (!panelsPreference[panel.panelKey]) {
        // already closed
        return
      } // cancel uploaded profile image
      chatClient.cancelProfileImage() // stop stream
      stopVideoSourceStream(panel) // clear work data
      delete preferenceWorkData[panel.panelKey] // delete
      delete panelsPreference[panel.panelKey]
    } else if (panel.panelType === 'HISTORY') {
      if (!panelsHistory[panel.panelKey]) {
        // already closed
        return
      } // delete
      delete panelsHistory[panel.panelKey]
    } else if (panel.panelType === 'HISTORYSEARCH') {
      if (!panelsHistory[panel.panelKey]) {
        // already closed
        return
      } // clear search condition data
      delete searchConditionHistory[panel.panelKey] // clear topic list
      clearTopicList(panel) // delete
      delete panelsHistory[panel.panelKey]
    } else if (panel.panelType === 'SERVERSETTINGS') {
      if (!panelsServerSettings[panel.panelKey]) {
        // already closed
        return
      } // clear work data
      if (
        serverSettingsWorkData[panel.panelKey] &&
        serverSettingsWorkData[panel.panelKey].timer
      ) {
        clearInterval(serverSettingsWorkData[panel.panelKey].timer)
      }
      delete serverSettingsWorkData[panel.panelKey] // delete
      delete panelsServerSettings[panel.panelKey]
    } else if (panel.panelType === 'BLOCKLISTSETTINGS') {
      if (!panelsBlockListSettings[panel.panelKey]) {
        // already closed
        return
      } // delete
      delete panelsBlockListSettings[panel.panelKey]
    } else if (panel.panelType === 'USERMANAGEMENT') {
      if (!panelsUserManagement[panel.panelKey]) {
        // already closed
        return
      } // delete
      delete panelsUserManagement[panel.panelKey]
    } else if (panel.panelType === 'TENANTTABLE') {
      if (!panelsTenantTable[panel.panelKey]) {
        // already closed
        return
      } // clear work data
      delete tenantTableWorkData[panel.panelKey] // delete
      delete panelsTenantTable[panel.panelKey]
    } else if (panel.panelType === 'TENANTPROPERTY') {
      if (!panelsTenantProperty[panel.panelKey]) {
        // already closed
        return
      } // cancel uploaded profile image
      chatClient.cancelProfileImage() // clear work data
      delete tenantPropertyWorkData[panel.panelKey] // delete
      delete panelsTenantProperty[panel.panelKey]
    } else if (panel.panelType === 'TENANTSETTINGS') {
      if (!panelsTenantSettings[panel.panelKey]) {
        // already closed
        return
      } // clear work data
      delete tenantSettingsWorkData[panel.panelKey] // delete
      delete panelsTenantSettings[panel.panelKey]
    } else if (panel.panelType === 'ADVANCEDSETTINGS') {
      if (!panelsAdvancedSettings[panel.panelKey]) {
        // already closed
        return
      } // delete
      delete panelsAdvancedSettings[panel.panelKey]
    } else if (panel.panelType === 'SOFTWAREUPDATE') {
      if (!panelsSoftwareUpdate[panel.panelKey]) {
        // already closed
        return
      } // delete
      delete panelsSoftwareUpdate[panel.panelKey]
    } else if (panel.panelType === 'ACTIVATELICENSE') {
      if (!panelsActivateLicense[panel.panelKey]) {
        // already closed
        return
      } // delete
      delete panelsActivateLicense[panel.panelKey]
    } else if (panel.panelType === 'TWITTERSETTINGS') {
      if (!panelsTwitterSettings[panel.panelKey]) {
        // already closed
        return
      } // delete
      delete panelsTwitterSettings[panel.panelKey]
    } else if (panel.panelType === 'FACEBOOKSETTINGS') {
      if (!panelsFacebookSettings[panel.panelKey]) {
        // already closed
        return
      } // delete
      delete panelsFacebookSettings[panel.panelKey]
    } else if (panel.panelType === 'LINESETTINGS') {
      if (!panelsLineSettings[panel.panelKey]) {
        // already closed
        return
      } // delete
      delete panelsLineSettings[panel.panelKey]
    } else if (panel.panelType === 'WATSONSETTINGS') {
      if (!panelsWatsonSettings[panel.panelKey]) {
        // already closed
        return
      } // delete
      delete panelsWatsonSettings[panel.panelKey]
    } else if (panel.panelType === 'EMAILSETTINGS') {
      if (!panelsEmailSettings[panel.panelKey]) {
        // already closed
        return
      } // delete
      delete panelsEmailSettings[panel.panelKey]
    } else if (panel.panelType === 'GUESTSETTINGS') {
      if (!panelsGuestSettings[panel.panelKey]) {
        // already closed
        return
      } // delete
      delete panelsGuestSettings[panel.panelKey]
    } else {
      logger.log('error', 'unknown panel.panelType==' + panel.panelType)
      return
    }
    panel.getParent().removeChild(panel)
    panel.destroy()
  }
  /*
   * Function addBuddiesOnPanel
   */ var addBuddiesOnPanel = function addBuddiesOnPanel(panel, buddies) {
    var profile = chatClient.getProfile()
    if (!panel.buddies) {
      panel.buddies = {}
    }
    var buddyList = []
    if (buddies && buddies.length) {
      for (var i = 0; i < buddies.length; i++) {
        if (buddies[i] && buddies[i].tenant && buddies[i].user_id) {
          var buddy = { tenant: buddies[i].tenant, user_id: buddies[i].user_id }
          if (
            buddy.tenant === profile.tenant &&
            buddy.user_id === profile.user_id
          ) {
            // except me
            continue
          }
          var key = JSON.stringify(buddy)
          panel.buddies[key] = true
          buddyList.push(buddy)
        }
      }
    }
    if (buddyList.length > 0) {
      chatClient.addTemporaryBuddy(buddyList, null, function (ev) {
        logger.log(
          'warn',
          'chatClient.addTemporaryBuddy error code: ' +
            ev.code +
            ', message: ' +
            ev.message,
        )
      })
    }
  }
  /*
   * Function removeBuddiesOnPanel
   */ var removeBuddiesOnPanel = function removeBuddiesOnPanel(panel) {
    if (!panel.buddies) {
      return
    }
    var buddies = panel.buddies // clear
    panel.buddies = {} // buddies existing on other panels
    var existingBuddies = {}
    var panels = [panelsChat, panelsConference, panelsBroadcast]
    for (var i = 0; i < panels.length; i++) {
      for (var key in panels[i]) {
        var p = panels[i][key]
        if (p.buddies) {
          for (var k in p.buddies) {
            if (p.buddies[k]) {
              existingBuddies[k] = true
            }
          }
        }
      }
    } // remove buddies not existing
    var buddyList = []
    for (var key in buddies) {
      if (!existingBuddies[key]) {
        var buddy = {}
        try {
          buddy = JSON.parse(key)
        } catch (e) {
          logger.log('error', 'failed to parse key==' + key)
          continue
        }
        buddyList.push(buddy)
      }
    }
    if (buddyList.length > 0) {
      chatClient.removeTemporaryBuddy(buddyList, null, function (ev) {
        logger.log(
          'warn',
          'chatClient.removeTemporaryBuddy error code: ' +
            ev.code +
            ', message: ' +
            ev.message,
        )
      })
    }
  }
  /*
   * Function restoreTemporaryBuddies
   */ var restoreTemporaryBuddies = function restoreTemporaryBuddies() {
    var buddyList = []
    var panels = [panelsChat, panelsConference, panelsBroadcast]
    for (var i = 0; i < panels.length; i++) {
      for (var key in panels[i]) {
        var p = panels[i][key]
        if (p.buddies) {
          for (var k in p.buddies) {
            if (p.buddies[k]) {
              try {
                buddyList.push(JSON.parse(k))
              } catch (e) {
                logger.log('error', 'failed to parse key==' + k)
                continue
              }
            }
          }
        }
      }
    }
    if (buddyList.length > 0) {
      chatClient.addTemporaryBuddy(buddyList, null, function (ev) {
        logger.log(
          'warn',
          'chatClient.addTemporaryBuddy error code: ' +
            ev.code +
            ', message: ' +
            ev.message,
        )
      })
    }
  }
  /*
   * Function displayBuddyStatus
   */ var displayBuddyStatus = function displayBuddyStatus(tenant, user_id) {
    var b = { tenant: tenant, user_id: user_id }
    var buddy = chatClient.getBuddyUser(b)
    var buddyStatus = chatClient.getBuddyStatus(b)
    var buddyName = escapeHTML(buddy.name || buddy.user_id)
    var key = JSON.stringify(b)
    var panel = panelsChat[key]
    if (panel) {
      // tab title (name, status)
      panel.set('title', buddyName)
      panel.set(
        'iconClass',
        'brUCChatTabIcon' + ' ' + getStatusIconClass(buddyStatus.status),
      ) // chat header (status, name, display)
      var displayNodes = dojo.query(
        '.brUCDisplay',
        panel.panelChatHeaderBuddyInfo,
      )
      if (displayNodes && displayNodes[0]) {
        displayNodes[0].innerHTML =
          '<span class="brUCDisplayName">' +
          buddyName +
          escapeHTML(buddyStatus.display ? ' - ' + buddyStatus.display : '') +
          '</span>'
        var iconClass = getStatusIconClass(buddyStatus.status)
        displayNodes
          .removeClass('brUCIconOffline')
          .removeClass('brUCIconAvailable')
          .removeClass('brUCIconIdle')
          .removeClass('brUCIconBusy')
          .addClass(iconClass)
      } else {
        logger.log('error', 'not found .brUCDisplay of user_id==' + user_id)
      } // chat header (profile image)
      var imageNodes = dojo.query(
        '.brUCProfileImage',
        panel.panelChatHeaderBuddyInfo,
      )
      if (imageNodes && imageNodes[0]) {
        imageNodes[0].style.backgroundSize = '32px 32px'
        imageNodes[0].style.backgroundPosition = 'center center'
        imageNodes[0].style.backgroundRepeat = 'no-repeat'
        imageNodes[0].style.backgroundImage =
          'url(' + buddy.profile_image_url + ')'
      } else {
        logger.log(
          'error',
          'not found .brUCProfileImage of user_id==' + user_id,
        )
      } // others (name)
      var userNameNodes = dojo.query(
        '.brUCUserName[data-brekeke-uc-tenant=' +
          tenant +
          '][data-brekeke-uc-user-id=' +
          user_id +
          ']',
        panel.domNode,
      )
      for (var i = 0; i < userNameNodes.length; i++) {
        userNameNodes[i].innerHTML = buddyName
      }
    } else {
      // chat panel not opened
    } // display warning
    displayStatusWarning(buddy.tenant, buddy.user_id) // display on conference panel
    for (var conf_id in panelsConference) {
      displayBuddyStatusOnConference(buddy.tenant, buddy.user_id, conf_id)
    } // display on broadcast panel
    for (var panelKey in panelsBroadcast) {
      displayBuddyStatusOnBroadcast(
        buddy.tenant,
        buddy.user_id,
        panelsBroadcast[panelKey],
      )
    }
  }
  /*
   * Function displayStatusWarning
   */ var displayStatusWarning = function displayStatusWarning(
    tenant,
    user_id,
  ) {
    var b = { tenant: tenant, user_id: user_id }
    var buddy = chatClient.getBuddyUser(b)
    var buddyStatus = chatClient.getBuddyStatus(b)
    var buddyName = escapeHTML(buddy.name || buddy.user_id)
    var key = JSON.stringify(b)
    var panel = panelsChat[key]
    if (panel) {
      // warning
      var warning = ''
      var iconClass = ''
      if (myStatus.status === Constants.STATUS_OFFLINE) {
        warning = formatStr(ucMsgs.MSG_ME_OFFLINE, buddyName)
        iconClass = getStatusIconClass(myStatus.status)
      } else if (myStatus.status === Constants.STATUS_BUSY) {
        warning = formatStr(ucMsgs.MSG_ME_BUSY, buddyName)
        iconClass = getStatusIconClass(myStatus.status)
      } else if (buddyStatus.status === Constants.STATUS_OFFLINE) {
        warning = formatStr(ucMsgs.MSG_BUDDY_OFFLINE, buddyName)
        iconClass = getStatusIconClass(buddyStatus.status)
      } else if (buddyStatus.status === Constants.STATUS_BUSY) {
        warning = formatStr(ucMsgs.MSG_BUDDY_BUSY, buddyName)
        iconClass = getStatusIconClass(buddyStatus.status)
      }
      if (warning) {
        panel.spanWarningFooter.innerHTML = warning
        dojo.removeClass(
          panel.imgWarningFooter,
          'brUCIconOffline brUCIconAvailable brUCIconIdle brUCIconBusy',
        )
        if (iconClass) {
          dojo.addClass(panel.imgWarningFooter, iconClass)
        }
        if (panel.panelChatWarningFooter.domNode.style.display !== 'block') {
          panel.panelChatWarningFooter.domNode.style.display = 'block'
          panel.resize()
        }
      } else {
        if (panel.panelChatWarningFooter.domNode.style.display !== 'none') {
          panel.panelChatWarningFooter.domNode.style.display = 'none'
          panel.resize()
        }
      }
    }
  }
  /*
   * Function displayConference
   */ var displayConference = function displayConference(conf_id) {
    var conference = chatClient.getConference(conf_id)
    var profile = chatClient.getProfile()
    if (panelsConference[conf_id]) {
      addBuddiesOnPanel(panelsConference[conf_id], conference.user)
      require(['dojo/dom-construct'], function (domConstruct) {
        // enable buttons
        enableButtons(panelsConference[conf_id])
        if (
          conference.conf_status === Constants.CONF_STATUS_INVITED &&
          panelsConference[conf_id].panelChatConferenceInvited.domNode.style
            .display === 'none'
        ) {
          panelsConference[
            conf_id
          ].panelChatConferenceInvited.domNode.style.display = 'block'
          panelsConference[conf_id].resize()
        } else if (
          conference.conf_status !== Constants.CONF_STATUS_INVITED &&
          panelsConference[conf_id].panelChatConferenceInvited.domNode.style
            .display !== 'none'
        ) {
          panelsConference[
            conf_id
          ].panelChatConferenceInvited.domNode.style.display = 'none'
          panelsConference[conf_id].resize()
        }
        if (conference.conf_status === Constants.CONF_STATUS_INACTIVE) {
          // left conference
          dojo
            .query(
              '.brUCDisplayMe',
              panelsConference[conf_id].panelChatHeaderBuddies.domNode,
            )
            .addClass('brUCDisplayLeaved') // freeze
          return
        } else {
          dojo
            .query(
              '.brUCDisplayMe',
              panelsConference[conf_id].panelChatHeaderBuddies.domNode,
            )
            .removeClass('brUCDisplayLeaved')
        } // subject
        panelsConference[conf_id].set(
          'title',
          escapeHTML(
            conference.conf_type === 'webchat'
              ? conference.creator.user_name || conference.creator.user_id
              : conference.subject,
          ),
        ) // remove old buddy list
        var oldUsers = {}
        var oldInfoNodes = dojo.query(
          '.brUCPanelChatHeaderBuddyInfo',
          panelsConference[conf_id].panelChatHeaderBuddies.domNode,
        )
        for (var i = 0; i < oldInfoNodes.length; i++) {
          if (!oldInfoNodes[i].hasAttribute('data-dojo-attach-point')) {
            oldUsers[
              JSON.stringify({
                tenant: oldInfoNodes[i].getAttribute('data-brekeke-uc-tenant'),
                user_id: oldInfoNodes[i].getAttribute(
                  'data-brekeke-uc-user-id',
                ),
              })
            ] = { displayNode: dojo.query('.brUCDisplay', oldInfoNodes[i])[0] }
            domConstruct.destroy(oldInfoNodes[i])
          }
        } // add new buddy list
        var users = conference.user
        for (var i = 0; i < users.length; i++) {
          // copy from panelChatHeaderBuddyInfo
          var infoNode =
            panelsConference[conf_id].panelChatHeaderBuddyInfo.cloneNode(true)
          infoNode.style.display = 'block'
          infoNode.removeAttribute('data-dojo-attach-point')
          infoNode.setAttribute('data-brekeke-uc-tenant', users[i].tenant)
          infoNode.setAttribute('data-brekeke-uc-user-id', users[i].user_id)
          domConstruct.place(
            infoNode,
            panelsConference[conf_id].panelChatHeaderBuddies.domNode,
            'last',
          ) // conf_status
          var displayNodes = dojo.query('.brUCDisplay', infoNode)
          if (displayNodes && displayNodes[0]) {
            if (users[i].conf_status === Constants.CONF_STATUS_INVITED) {
              displayNodes.addClass('brUCDisplayInvited')
            }
            if (users[i].user_id === profile.user_id) {
              displayNodes.addClass('brUCDisplayMe')
            }
          } else {
            logger.log('error', 'not found .brUCDisplay')
          }
          displayBuddyStatusOnConference(
            users[i].tenant,
            users[i].user_id,
            conf_id,
          )
          delete oldUsers[
            JSON.stringify({
              tenant: users[i].tenant,
              user_id: users[i].user_id,
            })
          ]
        }
        for (var oldUserStr in oldUsers) {
          var oldUser = JSON.parse(oldUserStr) // copy from panelChatHeaderBuddyInfo
          var infoNode =
            panelsConference[conf_id].panelChatHeaderBuddyInfo.cloneNode(true)
          infoNode.style.display = 'block'
          infoNode.removeAttribute('data-dojo-attach-point')
          infoNode.setAttribute('data-brekeke-uc-tenant', oldUser.tenant)
          infoNode.setAttribute('data-brekeke-uc-user-id', oldUser.user_id)
          domConstruct.place(
            infoNode,
            panelsConference[conf_id].panelChatHeaderBuddies.domNode,
            'last',
          ) // conf_status
          var displayNodes = dojo.query('.brUCDisplay', infoNode)
          if (displayNodes && displayNodes[0]) {
            displayNodes.addClass(
              (oldUsers[oldUserStr].displayNode &&
                oldUsers[oldUserStr].displayNode.className) ||
                'brUCDisplay',
            )
            displayNodes.addClass('brUCDisplayLeaved')
          } else {
            logger.log('error', 'not found .brUCDisplay')
          }
          displayBuddyStatusOnConference(
            oldUser.tenant,
            oldUser.user_id,
            conf_id,
          )
        }
        panelsConference[conf_id].resize()
      })
    } else {
      logger.log('info', 'not found panel of conf_id==' + conf_id)
    }
  }
  /*
   * displayBuddyStatusOnConference
   */ var displayBuddyStatusOnConference =
    function displayBuddyStatusOnConference(tenant, user_id, conf_id) {
      var conference = chatClient.getConference(conf_id)
      var profile = chatClient.getProfile()
      var settings = chatClient.getSettings()
      var buddy = null
      var buddyStatus = null
      if (tenant === profile.tenant && user_id === profile.user_id) {
        // me
        buddy = profile
        if (
          conference.conf_type === 'webchat' &&
          settings.optional_settings &&
          settings.optional_settings.display_name
        ) {
          buddy.name = settings.optional_settings.display_name
        }
        buddyStatus = myStatus
      } else {
        // buddy
        var b = { tenant: tenant, user_id: user_id }
        buddy = chatClient.getBuddyUser(b)
        buddyStatus = chatClient.getBuddyStatus(b)
      }
      if (panelsConference[conf_id]) {
        var infoNodes = dojo.query(
          '[data-brekeke-uc-tenant=' +
            tenant +
            '][data-brekeke-uc-user-id=' +
            user_id +
            ']',
          panelsConference[conf_id].panelChatHeaderBuddies.domNode,
        )
        if (infoNodes && infoNodes[0]) {
          // chat header (status, name, display)
          var displayNodes = dojo.query('.brUCDisplay', infoNodes[0])
          if (displayNodes && displayNodes[0]) {
            Brekeke.UCClientUI.textSelect =
              Brekeke.UCClientUI.textSelect ||
              function (obj) {
                var range, sel
                if (window.getSelection) {
                  range = document.createRange()
                  range.setStart(obj.firstChild, 0)
                  range.setEnd(obj.firstChild, obj.firstChild.nodeValue.length)
                  sel = getSelection()
                  sel.removeAllRanges()
                  sel.addRange(range)
                }
              }
            if (conference.conf_status === Constants.CONF_STATUS_INACTIVE) {
              // freezed
            } else if (
              conference.conf_type === 'webchat' &&
              buddy.tenant === conference.creator.tenant &&
              buddy.user_id === conference.creator.user_id
            ) {
              var profinfo = string(conference.webchatinfo.profinfo_formatted)
              var profinfo_2rows = profinfo.split('\n')
              if (profinfo_2rows[1]) {
                displayNodes[0].innerHTML =
                  '<span class="brUCDisplayName brUCDisplayGuest" style="top: -7px;" title="' +
                  escapeHTML(profinfo) +
                  '"><span onclick="Brekeke.UCClientUI.textSelect(this);">' +
                  escapeHTML(
                    profinfo_2rows[0] +
                      (buddyStatus.display ? ' - ' + buddyStatus.display : ''),
                  ) +
                  '</span><br /><span onclick="Brekeke.UCClientUI.textSelect(this);">' +
                  escapeHTML(profinfo_2rows[1]) +
                  '</span></span>'
              } else {
                displayNodes[0].innerHTML =
                  '<span class="brUCDisplayName brUCDisplayGuest" title="' +
                  escapeHTML(profinfo) +
                  '"><span onclick="Brekeke.UCClientUI.textSelect(this);">' +
                  escapeHTML(
                    profinfo_2rows[0] +
                      (buddyStatus.display ? ' - ' + buddyStatus.display : ''),
                  ) +
                  '</span></span>'
              }
            } else if (conference.conf_type === 'webchat') {
              displayNodes[0].innerHTML =
                '<span class="brUCDisplayName"><span onclick="Brekeke.UCClientUI.textSelect(this);">' +
                escapeHTML(buddy.name || buddy.user_id) +
                '</span></span>'
            } else {
              displayNodes[0].innerHTML =
                '<span class="brUCDisplayName"><span onclick="Brekeke.UCClientUI.textSelect(this);">' +
                escapeHTML(
                  (buddy.name || buddy.user_id) +
                    (buddyStatus.display ? ' - ' + buddyStatus.display : ''),
                ) +
                '</span></span>'
            }
            var iconClass = getStatusIconClass(buddyStatus.status)
            displayNodes
              .removeClass('brUCIconOffline')
              .removeClass('brUCIconAvailable')
              .removeClass('brUCIconIdle')
              .removeClass('brUCIconBusy')
              .addClass(iconClass)
          } else {
            logger.log('error', 'not found .brUCDisplay')
          } // chat header (profile image)
          var imageNodes = dojo.query('.brUCProfileImage', infoNodes[0])
          if (imageNodes && imageNodes[0]) {
            imageNodes[0].style.backgroundSize = '32px 32px'
            imageNodes[0].style.backgroundPosition = 'center center'
            imageNodes[0].style.backgroundRepeat = 'no-repeat'
            imageNodes[0].style.backgroundImage =
              'url(' + buddy.profile_image_url + ')'
          } else {
            logger.log('error', 'not found .brUCProfileImage')
          } // others (name)
          var userNameNodes = dojo.query(
            '.brUCUserName[data-brekeke-uc-tenant=' +
              tenant +
              '][data-brekeke-uc-user-id=' +
              user_id +
              ']',
            panelsConference[conf_id].domNode,
          )
          for (var i = 0; i < userNameNodes.length; i++) {
            userNameNodes[i].innerHTML = escapeHTML(buddy.name || buddy.user_id)
          }
        }
      } else {
        logger.log('error', 'not found panel of conf_id==' + conf_id)
      }
    }
  /*
   * displayProfinfoOnConference
   */ var displayProfinfoOnConference = function displayProfinfoOnConference(
    conf_id,
  ) {
    var conference = chatClient.getConference(conf_id)
    if (panelsConference[conf_id]) {
      var senderKey = JSON.stringify({
        tenant: conference.creator.tenant,
        user_id: conference.creator.user_id,
      })
      var paragraphClassIndex = senderKeyToParagraphClass.indexOf(senderKey)
      if (paragraphClassIndex === -1) {
        senderKeyToParagraphClass.push(senderKey)
        paragraphClassIndex = senderKeyToParagraphClass.indexOf(senderKey)
      }
      var paragraphClass =
        PARAGRAPH_CLASSES[paragraphClassIndex % PARAGRAPH_CLASSES.length]
      dojo.addClass(panelsConference[conf_id].panelProfinfo, paragraphClass)
      panelsConference[conf_id].areaProfinfo.innerHTML = escapeHTML(
        conference.webchatinfo.profinfo_formatted,
      )
      panelsConference[conf_id].panelProfinfo.style.display = 'block'
    }
  }
  /*
   * Function displayBroadcast
   */ var displayBroadcast = function displayBroadcast(panel) {
    if (broadcastUsersTable[panel.panelKey]) {
      addBuddiesOnPanel(panel, broadcastUsersTable[panel.panelKey])
      require([
        'dojo/dom-construct',
        'dijit/form/CheckBox',
        'dojo/on',
      ], function (domConstruct, CheckBox, on) {
        // enable buttons
        enableButtons(panel) // remove old buddy list
        var oldInfoNodes = dojo.query(
          '.brUCPanelChatHeaderBuddyInfo',
          panel.panelChatHeaderBuddies.domNode,
        )
        for (var i = 0; i < oldInfoNodes.length; i++) {
          if (!oldInfoNodes[i].hasAttribute('data-dojo-attach-point')) {
            domConstruct.destroy(oldInfoNodes[i])
          }
        } // add new buddy list
        for (var i = 0; i < broadcastUsersTable[panel.panelKey].length; i++) {
          // copy from panelChatHeaderBuddyInfo
          var infoNode = panel.panelChatHeaderBuddyInfo.cloneNode(true)
          infoNode.style.display = 'block'
          infoNode.removeAttribute('data-dojo-attach-point')
          infoNode.setAttribute(
            'data-brekeke-uc-tenant',
            broadcastUsersTable[panel.panelKey][i].tenant,
          )
          infoNode.setAttribute(
            'data-brekeke-uc-user-id',
            broadcastUsersTable[panel.panelKey][i].user_id,
          )
          domConstruct.place(
            infoNode,
            panel.panelChatHeaderBuddies.domNode,
            'last',
          ) // check box
          var displayNodes = dojo.query('.brUCDisplay', infoNode)
          if (displayNodes && displayNodes[0]) {
            if (!broadcastUsersTable[panel.panelKey][i].checked) {
              displayNodes.addClass('brUCDisplayUnchecked')
            }
            var inputDom = domConstruct.toDom('<input />')
            var labelDom = domConstruct.toDom('<label></label>')
            domConstruct.place(labelDom, infoNode, 'last')
            domConstruct.place(inputDom, labelDom, 'first')
            domConstruct.place(displayNodes[0], labelDom, 'last')
            var broadcastCheckBox = new CheckBox(
              {
                value: JSON.stringify({
                  panelKey: panel.panelKey,
                  tenant: broadcastUsersTable[panel.panelKey][i].tenant,
                  user_id: broadcastUsersTable[panel.panelKey][i].user_id,
                }),
                checked: broadcastUsersTable[panel.panelKey][i].checked,
              },
              inputDom,
            )
            broadcastCheckBox.startup()
            if (broadcastUsersTable[panel.panelKey][i].connection) {
              broadcastUsersTable[panel.panelKey][i].connection.remove()
            }
            broadcastUsersTable[panel.panelKey][i].connection = on(
              broadcastCheckBox,
              'change',
              panelChatBroadcastCheckBox_change,
            )
          } else {
            logger.log('error', 'not found .brUCDisplay')
          }
          displayBuddyStatusOnBroadcast(
            broadcastUsersTable[panel.panelKey][i].tenant,
            broadcastUsersTable[panel.panelKey][i].user_id,
            panel,
          )
        }
        panel.resize()
      })
    } else {
      logger.log('error', 'empty broadcastUsersTable[' + panel.panelKey + ']')
    }
  }
  /*
   * displayBuddyStatusOnBroadcast
   */ var displayBuddyStatusOnBroadcast =
    function displayBuddyStatusOnBroadcast(tenant, user_id, panel) {
      var b = { tenant: tenant, user_id: user_id }
      var buddy = chatClient.getBuddyUser(b)
      var buddyStatus = chatClient.getBuddyStatus(b)
      var infoNodes = dojo.query(
        '[data-brekeke-uc-tenant=' +
          tenant +
          '][data-brekeke-uc-user-id=' +
          user_id +
          ']',
        panel.panelChatHeaderBuddies.domNode,
      )
      if (infoNodes && infoNodes[0]) {
        // chat header (status, name, display)
        var displayNodes = dojo.query('.brUCDisplay', infoNodes[0])
        if (displayNodes && displayNodes[0]) {
          displayNodes[0].innerHTML =
            '<span class="brUCDisplayName">' +
            escapeHTML(
              (buddy.name || buddy.user_id) +
                (buddyStatus.display ? ' - ' + buddyStatus.display : ''),
            ) +
            '</span>'
          var iconClass = getStatusIconClass(buddyStatus.status)
          displayNodes
            .removeClass('brUCIconOffline')
            .removeClass('brUCIconAvailable')
            .removeClass('brUCIconIdle')
            .removeClass('brUCIconBusy')
            .addClass(iconClass)
        } else {
          logger.log('error', 'not found .brUCDisplay')
        } // chat header (profile image)
        var imageNodes = dojo.query('.brUCProfileImage', infoNodes[0])
        if (imageNodes && imageNodes[0]) {
          imageNodes[0].style.backgroundSize = '32px 32px'
          imageNodes[0].style.backgroundPosition = 'center center'
          imageNodes[0].style.backgroundRepeat = 'no-repeat'
          imageNodes[0].style.backgroundImage =
            'url(' + buddy.profile_image_url + ')'
        } else {
          logger.log('error', 'not found .brUCProfileImage')
        } // others (name)
        var userNameNodes = dojo.query(
          '.brUCUserName[data-brekeke-uc-tenant=' +
            tenant +
            '][data-brekeke-uc-user-id=' +
            user_id +
            ']',
          panel.domNode,
        )
        for (var i = 0; i < userNameNodes.length; i++) {
          userNameNodes[i].innerHTML = escapeHTML(buddy.name || buddy.user_id)
        }
      }
    }
  /*
   * Function enableButtons
   */ var enableButtons = function enableButtons(panel) {
    var profile = chatClient.getProfile()
    var session = getSessionFromPanel(panel.panelType, panel.panelKey)
    var withVideo = session && session.withVideo
    if (panel.panelType === 'CHAT') {
      panel.buttonSendText.setDisabled(false)
      panel.buttonJoinConference.setDisabled(true)
      panel.buttonRejectConference.setDisabled(true)
      panel.buttonLeaveConference.setDisabled(true)
      panel.buttonSendFile.setDisabled(false)
      panel.buttonShareScreen.setDisabled(
        Boolean(withVideo) || !phoneRegistered || getCallControlMode() === 1,
      )
      panel.buttonVoiceCall.setDisabled(
        Boolean(session) || (!phoneRegistered && getCallControlMode() !== 1),
      )
      panel.buttonVideoCall.setDisabled(
        Boolean(withVideo) || !phoneRegistered || getCallControlMode() === 1,
      )
      panel.buttonShareScreen.set(
        'title',
        phoneRegistered
          ? ucMsgs.BTN_SHARE_SCREEN_TOOLTIP
          : ucMsgs.MSG_SIP_FAILED,
      )
      panel.buttonVoiceCall.set(
        'title',
        phoneRegistered ? ucMsgs.BTN_VOICE_CALL_TOOLTIP : ucMsgs.MSG_SIP_FAILED,
      )
      panel.buttonVideoCall.set(
        'title',
        phoneRegistered ? ucMsgs.BTN_VIDEO_CALL_TOOLTIP : ucMsgs.MSG_SIP_FAILED,
      )
    } else if (panel.panelType === 'CONFERENCE') {
      var conference = chatClient.getConference(panel.panelKey)
      if (conference.conf_status === Constants.CONF_STATUS_INVITED) {
        panel.buttonSendText.setDisabled(true)
        panel.buttonJoinConference.setDisabled(false)
        panel.buttonRejectConference.setDisabled(false)
        panel.buttonLeaveConference.setDisabled(false)
        panel.buttonSendFile.setDisabled(true)
        panel.buttonShareScreen.setDisabled(true)
        panel.buttonVoiceCall.setDisabled(true)
        panel.buttonVideoCall.setDisabled(true)
      } else if (conference.conf_status === Constants.CONF_STATUS_JOINED) {
        var count = 0
        for (var i = 0; i < conference.user.length; i++) {
          if (conference.user[i].conf_status === Constants.CONF_STATUS_JOINED) {
            count++
          }
        }
        if (
          conference.conf_type === 'webchat' &&
          conference.creator.tenant === profile.tenant &&
          conference.creator.user_id === profile.user_id
        ) {
          count++
        }
        panel.buttonSendText.setDisabled(count < 2)
        panel.buttonJoinConference.setDisabled(true)
        panel.buttonRejectConference.setDisabled(true)
        panel.buttonLeaveConference.setDisabled(false)
        panel.buttonSendFile.setDisabled(false)
        panel.buttonShareScreen.setDisabled(
          Boolean(withVideo) || !phoneRegistered || getCallControlMode() === 1,
        )
        panel.buttonVoiceCall.setDisabled(
          Boolean(session) || (!phoneRegistered && getCallControlMode() !== 1),
        )
        panel.buttonVideoCall.setDisabled(
          Boolean(withVideo) || !phoneRegistered || getCallControlMode() === 1,
        )
      } else {
        panel.buttonSendText.setDisabled(true)
        panel.buttonJoinConference.setDisabled(true)
        panel.buttonRejectConference.setDisabled(true)
        panel.buttonLeaveConference.setDisabled(true)
        panel.buttonSendFile.setDisabled(true)
        panel.buttonShareScreen.setDisabled(true)
        panel.buttonVoiceCall.setDisabled(true)
        panel.buttonVideoCall.setDisabled(true)
      }
      panel.buttonShareScreen.set(
        'title',
        phoneRegistered
          ? ucMsgs.BTN_SHARE_SCREEN_TOOLTIP
          : ucMsgs.MSG_SIP_FAILED,
      )
      panel.buttonVoiceCall.set(
        'title',
        phoneRegistered ? ucMsgs.BTN_VOICE_CALL_TOOLTIP : ucMsgs.MSG_SIP_FAILED,
      )
      panel.buttonVideoCall.set(
        'title',
        phoneRegistered ? ucMsgs.BTN_VIDEO_CALL_TOOLTIP : ucMsgs.MSG_SIP_FAILED,
      )
    } else if (panel.panelType === 'BROADCAST') {
      var count = 0
      if (broadcastUsersTable[panel.panelKey]) {
        for (var i = 0; i < broadcastUsersTable[panel.panelKey].length; i++) {
          if (broadcastUsersTable[panel.panelKey][i].checked) {
            count++
          }
        }
      }
      panel.buttonSendText.setDisabled(count < 1)
      panel.buttonSendFile.setDisabled(true) // TODO: yano broadcast
      //panel.buttonShareScreen.setDisabled(count < 1 || Boolean(broadcastCallsTable[panel.panelKey]) || !phoneRegistered || getCallControlMode() === 1);
      //panel.buttonVoiceCall.setDisabled(count < 1 || Boolean(broadcastCallsTable[panel.panelKey]) || !phoneRegistered || getCallControlMode() === 1);
      //panel.buttonVideoCall.setDisabled(count < 1 || Boolean(broadcastCallsTable[panel.panelKey]) || !phoneRegistered || getCallControlMode() === 1);
      panel.buttonShareScreen.setDisabled(true)
      panel.buttonVoiceCall.setDisabled(true)
      panel.buttonVideoCall.setDisabled(true)
      panel.buttonShareScreen.set(
        'title',
        phoneRegistered
          ? ucMsgs.BTN_SHARE_SCREEN_TOOLTIP
          : ucMsgs.MSG_SIP_FAILED,
      )
      panel.buttonVoiceCall.set(
        'title',
        phoneRegistered ? ucMsgs.BTN_VOICE_CALL_TOOLTIP : ucMsgs.MSG_SIP_FAILED,
      )
      panel.buttonVideoCall.set(
        'title',
        phoneRegistered ? ucMsgs.BTN_VIDEO_CALL_TOOLTIP : ucMsgs.MSG_SIP_FAILED,
      )
    } else if (panel.panelType === 'EXTERNALCALL') {
      var target = panel.textBoxHeaderTarget.attr('value')
      panel.buttonSendText.setDisabled(true)
      panel.buttonJoinConference.setDisabled(true)
      panel.buttonRejectConference.setDisabled(true)
      panel.buttonLeaveConference.setDisabled(true)
      panel.buttonSendFile.setDisabled(true)
      panel.buttonShareScreen.setDisabled(
        Boolean(withVideo) ||
          target === '' ||
          !phoneRegistered ||
          getCallControlMode() === 1,
      )
      panel.buttonVoiceCall.setDisabled(
        Boolean(session) ||
          target === '' ||
          (!phoneRegistered && getCallControlMode() !== 1),
      )
      panel.buttonVideoCall.setDisabled(
        Boolean(withVideo) ||
          target === '' ||
          !phoneRegistered ||
          getCallControlMode() === 1,
      )
      panel.buttonShareScreen.set(
        'title',
        phoneRegistered
          ? ucMsgs.BTN_SHARE_SCREEN_TOOLTIP
          : ucMsgs.MSG_SIP_FAILED,
      )
      panel.buttonVoiceCall.set(
        'title',
        phoneRegistered ? ucMsgs.BTN_VOICE_CALL_TOOLTIP : ucMsgs.MSG_SIP_FAILED,
      )
      panel.buttonVideoCall.set(
        'title',
        phoneRegistered ? ucMsgs.BTN_VIDEO_CALL_TOOLTIP : ucMsgs.MSG_SIP_FAILED,
      )
    } else {
      logger.log('error', 'unknown panel.panelType==' + panel.panelType)
    }
  }
  /*
   * Function sendText
   */ var sendText = function sendText(panel) {
    var inputText = string(panel.editorSendText.attr('value'))
    var text = removeTag(inputText, false)
    if (!text) {
      return
    }
    if (text.length > CHAT_CONTENT_SIZE) {
      windowAlert(
        ucMsgs.CMN_ALERT,
        ucMsgs.MSG_SEND_TEXT_FAILED + '<br />' + ucMsgs.MSG_TOO_LONG + '<br />',
      )
      return
    }
    panel.editorSendText.set('value', '')
    panel.editorSendText.focus()
    var sentMessageId = string(sentMessageIdCounter++)
    var displayed = false
    var errored = false
    if (panel.panelType === 'CHAT') {
      var target = {}
      try {
        target = JSON.parse(panel.panelKey)
      } catch (e) {
        logger.log('error', 'failed to parse panel.panelKey==' + panel.panelKey)
        return
      }
      if (!target.user_id) {
        logger.log(
          'error',
          'empty user_id of panel.panelKey==' + panel.panelKey,
        )
        return
      } // send text to buddy
      chatClient.sendText(
        text,
        target,
        function (ev) {
          // funcOK
          // display sent time
          updateSentTimeDisplayMessage(panel, sentMessageId, ev.ltime) // clear typing
          if (lastSentTypingTimeTable[panel.panelKey]) {
            delete lastSentTypingTimeTable[panel.panelKey]
          }
        },
        function (ev) {
          // funcError
          if (displayed) {
            displayMessageError(
              panel,
              sentMessageId,
              ucMsgs.MSG_SEND_TEXT_FAILED + '\n' + ev.message,
            )
          }
          errored = true
          logger.log(
            'warn',
            'chatClient.sendText error code: ' +
              ev.code +
              ', message: ' +
              ev.message,
          )
          windowAlert(
            ucMsgs.CMN_ALERT,
            ucMsgs.MSG_SEND_TEXT_FAILED +
              ' (' +
              ev.code +
              ' ' +
              ev.message +
              ')',
          )
        },
      )
      if (!errored) {
        // display message
        var message = {
          senderInfo: chatClient.getProfile(),
          text: text,
          sentMessageId: sentMessageId,
          received_text_id: '',
          file_id: '',
          sentTimeValue: new Date(),
          sentTimeDisplay: '',
        }
        addMessageToList(message, panel)
        displayed = true
      }
    } else if (panel.panelType === 'CONFERENCE') {
      var conf_id = panel.panelKey
      var senderInfo = chatClient.getProfile()
      var settings = chatClient.getSettings()
      if (
        chatClient.getConference(conf_id).conf_type === 'webchat' &&
        settings.optional_settings &&
        settings.optional_settings.display_name
      ) {
        senderInfo.name = settings.optional_settings.display_name
      } // send text to conference
      chatClient.sendConferenceText(
        text,
        conf_id,
        function (ev) {
          // funcOK
          // display sent time
          updateSentTimeDisplayMessage(panel, sentMessageId, ev.ltime) // clear typing
          if (lastSentTypingTimeTable[panel.panelKey]) {
            delete lastSentTypingTimeTable[panel.panelKey]
          }
        },
        function (ev) {
          // funcError
          if (displayed) {
            displayMessageError(
              panel,
              sentMessageId,
              ucMsgs.MSG_SEND_TEXT_FAILED + '\n' + ev.message,
            )
          }
          errored = true
          logger.log(
            'warn',
            'chatClient.sendConferenceText error code: ' +
              ev.code +
              ', message: ' +
              ev.message,
          )
          windowAlert(
            ucMsgs.CMN_ALERT,
            ucMsgs.MSG_SEND_TEXT_FAILED +
              ' (' +
              ev.code +
              ' ' +
              ev.message +
              ')',
          )
        },
      )
      if (!errored) {
        // display message
        var message = {
          senderInfo: senderInfo,
          text: text,
          sentMessageId: sentMessageId,
          received_text_id: '',
          file_id: '',
          sentTimeValue: new Date(),
          sentTimeDisplay: '',
        }
        addMessageToList(message, panel)
        displayed = true
      }
    } else if (panel.panelType === 'BROADCAST') {
      if (!broadcastUsersTable[panel.panelKey]) {
        logger.log('error', 'empty broadcastUsersTable[' + panel.panelKey + ']')
        return
      }
      var target = []
      for (var i = 0; i < broadcastUsersTable[panel.panelKey].length; i++) {
        if (broadcastUsersTable[panel.panelKey][i].checked) {
          target.push({
            tenant: broadcastUsersTable[panel.panelKey][i].tenant,
            user_id: broadcastUsersTable[panel.panelKey][i].user_id,
          })
        }
      } // send broadcast text
      chatClient.sendBroadcastText(
        text,
        target,
        function (ev) {
          // funcOK
          // display sent time
          updateSentTimeDisplayMessage(panel, sentMessageId, ev.ltime)
          for (var i = 0; i < target.length; i++) {
            var chatPanelKey = JSON.stringify(target[i])
            if (panelsChat[chatPanelKey]) {
              updateSentTimeDisplayMessage(
                panelsChat[chatPanelKey],
                sentMessageId,
                ev.ltime,
              )
            }
          } // clear typing
          if (lastSentTypingTimeTable[panel.panelKey]) {
            delete lastSentTypingTimeTable[panel.panelKey]
          }
        },
        function (ev) {
          // funcError
          if (displayed) {
            displayMessageError(
              panel,
              sentMessageId,
              ucMsgs.MSG_SEND_TEXT_FAILED + '\n' + ev.message,
            )
            for (var i = 0; i < target.length; i++) {
              var chatPanelKey = JSON.stringify(target[i])
              if (panelsChat[chatPanelKey]) {
                displayMessageError(
                  panelsChat[chatPanelKey],
                  sentMessageId,
                  ucMsgs.MSG_SEND_TEXT_FAILED + '\n' + ev.message,
                )
              }
            }
          }
          errored = true
          logger.log(
            'warn',
            'chatClient.sendBroadcastText error code: ' +
              ev.code +
              ', message: ' +
              ev.message,
          )
          windowAlert(
            ucMsgs.CMN_ALERT,
            ucMsgs.MSG_SEND_TEXT_FAILED +
              ' (' +
              ev.code +
              ' ' +
              ev.message +
              ')',
          )
        },
      )
      if (!errored) {
        // display message
        var message = {
          senderInfo: chatClient.getProfile(),
          text: text,
          sentMessageId: sentMessageId,
          received_text_id: '',
          file_id: '',
          sentTimeValue: new Date(),
          sentTimeDisplay: '',
        }
        addMessageToList(message, panel) // display message also on chat panel
        for (var i = 0; i < target.length; i++) {
          var chatPanelKey = JSON.stringify(target[i])
          if (panelsChat[chatPanelKey]) {
            addMessageToList(message, panelsChat[chatPanelKey])
          }
        }
        displayed = true
      }
    } else {
      logger.log('error', 'unknown panel.panelType==' + panel.panelType)
    }
  }
  /*
   * Function removeTag
   */ var removeTag = function removeTag(text, plain) {
    var fragment = document.createDocumentFragment()
    var div = document.createElement('div')
    fragment.appendChild(div)
    div.innerHTML = text
    var _remove = function remove(parent) {
      var child = parent.firstChild
      while (child) {
        if (
          child.nodeName &&
          ((plain &&
            TAG_WHITE_LIST.indexOf(child.nodeName.toUpperCase()) === -1) ||
            (!plain &&
              TAG_BLACK_LIST.indexOf(child.nodeName.toUpperCase()) >= 0))
        ) {
          while (child.lastChild) {
            parent.insertBefore(child.lastChild, child.nextSibling)
          }
          var nextChild = child.nextSibling
          parent.removeChild(child)
          child = nextChild
        } else {
          _remove(child)
          child = child.nextSibling
        }
      }
    }
    _remove(div)
    return div.innerHTML
  }
  /*
   * Function addMessageToList
   */ var addMessageToList = function addMessageToList(message, panel) {
    var messageList = null
    if (panel.panelType === 'CHAT') {
      messageList = messageListsChat[panel.panelKey]
      if (!messageList) {
        messageList = messageListsChat[panel.panelKey] = []
      }
    } else if (panel.panelType === 'CONFERENCE') {
      messageList = messageListsConference[panel.panelKey]
      if (!messageList) {
        messageList = messageListsConference[panel.panelKey] = []
      }
    } else if (panel.panelType === 'BROADCAST') {
      messageList = messageListsBroadcast[panel.panelKey]
      if (!messageList) {
        messageList = messageListsBroadcast[panel.panelKey] = []
      }
    } else {
      logger.log('error', 'unknown panel.panelType==' + panel.panelType)
      return
    }
    messageList.push(message)
    displayMessage(
      messageList,
      true,
      panel.panelMessages,
      panel.panelChatList.domNode,
      false,
    )
  }
  /*
   * Function showUnreadText
   */ var showUnreadText = function showUnreadText(ev) {
    require(['dojo/dom-construct'], function (domConstruct) {
      var toRead = []
      var panel = null
      for (var i = ev.messages.length - 1; i >= 0; i--) {
        var m = ev.messages[i] // open panel
        panel = openChat(m.sender.tenant, m.sender.user_id, null, null, true)
        if (!panel) {
          logger.log('error', 'not found panel of user_id==' + m.sender.user_id)
          continue
        } // display message
        var message = {
          senderInfo: m.sender,
          text:
            m.ctype === Constants.CTYPE_FILE_REQUEST
              ? createStaticFileArea(m.text, m.sender)
              : m.text,
          sentMessageId: '',
          received_text_id: m.received_text_id,
          file_id: '',
          sentTimeValue: parseDate(m.sent_ltime),
          sentTimeDisplay: m.sent_ltime,
        }
        var messageList = messageListsChat[panel.panelKey]
        if (!messageList) {
          messageList = messageListsChat[panel.panelKey] = []
        }
        messageList.unshift(message)
        displayMessage(
          messageList,
          false,
          panel.panelMessages,
          panel.panelChatList.domNode,
          true,
        )
        if (m.requires_read) {
          toRead.push(m.received_text_id)
        }
      } // read text
      if (toRead.length > 0) {
        chatClient.readText(toRead, function (ev) {
          logger.log(
            'warn',
            'chatClient.readText error code: ' +
              ev.code +
              ', message: ' +
              ev.message,
          )
        })
      } // show more
      if (ev.hasMore) {
        if (panel) {
          var html =
            '<div class="brUCPanelShowMore"><a href="javascript:void(0)">' +
            ucMsgs.LBL_SHOW_MORE +
            '</a></div>'
          var dom = domConstruct.toDom(html)
          domConstruct.place(dom, panel.panelMessages, 'first')
          var a = dojo.query('a', dom)[0]
          panel.handlers.push(dojo.connect(a, 'click', panelChatShowMore_click))
        } else {
          logger.log('error', 'not found panel')
        }
      }
    })
  }
  /*
   * Function showUnreadTextOnReSignIn
   */ var showUnreadTextOnReSignIn = function showUnreadTextOnReSignIn(ev) {
    require(['dojo/dom-construct'], function (domConstruct) {
      var toRead = []
      var panelsToDisplayMessage = {}
      var panel = null
      for (var i = 0; i < ev.messages.length; i++) {
        var m = ev.messages[i] // open panel
        panel = openChat(m.sender.tenant, m.sender.user_id, null, null, true)
        if (!panel) {
          logger.log('error', 'not found panel of user_id==' + m.sender.user_id)
          continue
        } // add message to list
        var message = {
          senderInfo: m.sender,
          text:
            m.ctype === Constants.CTYPE_FILE_REQUEST
              ? createStaticFileArea(m.text, m.sender)
              : m.text,
          sentMessageId: '',
          received_text_id: m.received_text_id,
          file_id: '',
          sentTimeValue: parseDate(m.sent_ltime),
          sentTimeDisplay: m.sent_ltime,
        }
        if (!messageListsChat[panel.panelKey]) {
          messageListsChat[panel.panelKey] = []
        }
        var existing = false
        for (var j = 0; j < messageListsChat[panel.panelKey].length; j++) {
          if (
            m.received_text_id ===
            messageListsChat[panel.panelKey][j].received_text_id
          ) {
            existing = true
            break
          }
        }
        if (
          !existing &&
          readTextOnReSignInPanelKeys.indexOf(panel.panelKey) === -1
        ) {
          messageListsChat[panel.panelKey].push(message)
          panelsToDisplayMessage[panel.panelKey] = panel
        }
        if (m.requires_read) {
          toRead.push(m.received_text_id)
        }
      } // read text
      if (toRead.length > 0) {
        chatClient.readText(toRead, function (ev) {
          logger.log(
            'warn',
            'chatClient.readText error code: ' +
              ev.code +
              ', message: ' +
              ev.message,
          )
        })
      } // display message
      for (var key in panelsToDisplayMessage) {
        panel = panelsToDisplayMessage[key] // sort messages
        var messageList = messageListsChat[panel.panelKey]
        messageList.sort(function (a, b) {
          return a.sentTimeValue.getTime() - b.sentTimeValue.getTime()
        }) // clear messages html
        panel.panelMessages.innerHTML = ''
        messageListsChat[panel.panelKey] = [] // display
        for (var i = 0; i < messageList.length; i++) {
          messageListsChat[panel.panelKey].push(messageList[i])
          displayMessage(
            messageListsChat[panel.panelKey],
            true,
            panel.panelMessages,
            panel.panelChatList.domNode,
            true,
          )
        }
      } // show more
      if (ev.hasMore) {
        if (panel) {
          var html =
            '<div class="brUCPanelShowMore"><a href="javascript:void(0)">' +
            ucMsgs.LBL_SHOW_MORE +
            '</a></div>'
          var dom = domConstruct.toDom(html)
          domConstruct.place(dom, panel.panelMessages, 'last')
          var a = dojo.query('a', dom)[0]
          panel.handlers.push(
            dojo.connect(a, 'click', panelChatShowMoreOnReSignIn_click),
          )
          panel.getParent().selectChild(panel)
        } else {
          logger.log('error', 'not found panel')
        }
      }
    })
  }
  /*
   * Function showUnreceivedConferenceTextOnJoinWebchatRoom
   */ var showUnreceivedConferenceTextOnJoinWebchatRoom =
    function showUnreceivedConferenceTextOnJoinWebchatRoom(ev) {
      require(['dojo/dom-construct'], function (domConstruct) {
        var panel = null
        var conf_id = null
        for (var i = ev.messages.length - 1; i >= 0; i--) {
          var m = ev.messages[i]
          conf_id = m.conf_id
          if (conf_id) {
            panel = openConference(conf_id, null, null, true)
            if (!panel) {
              logger.log('error', 'not found panel of conf_id==' + conf_id)
              continue
            } // display message
            var message = {
              senderInfo: m.sender,
              text:
                m.ctype === Constants.CTYPE_FILE_REQUEST
                  ? createStaticFileArea(m.text, m.sender)
                  : m.text,
              sentMessageId: '',
              received_text_id: m.received_text_id,
              file_id: '',
              sentTimeValue: parseDate(m.sent_ltime),
              sentTimeDisplay: m.sent_ltime,
            }
            var messageList = messageListsConference[panel.panelKey]
            if (!messageList) {
              messageList = messageListsConference[panel.panelKey] = []
            }
            messageList.unshift(message)
            displayMessage(
              messageList,
              false,
              panel.panelMessages,
              panel.panelChatList.domNode,
              true,
            )
          }
        } // show more
        if (ev.hasMore) {
          if (panel && conf_id) {
            var html =
              '<div class="brUCPanelShowMore"><a href="javascript:void(0)" data-brekeke-uc-conf-id="' +
              conf_id +
              '">' +
              ucMsgs.LBL_SHOW_MORE +
              '</a></div>'
            var dom = domConstruct.toDom(html)
            domConstruct.place(dom, panel.panelMessages, 'first')
            var a = dojo.query('a', dom)[0]
            panel.handlers.push(
              dojo.connect(
                a,
                'click',
                panelChatShowMoreOnJoinWebchatRoom_click,
              ),
            )
          } else {
            logger.log('error', 'not found panel')
          }
        }
      })
    }
  /*
   * Function showUnreceivedConferenceTextOnInvitedToConference
   */ var showUnreceivedConferenceTextOnInvitedToConference =
    function showUnreceivedConferenceTextOnInvitedToConference(ev) {
      for (var i = 0; i < ev.messages.length; i++) {
        var m = ev.messages[i]
        var message = {
          senderInfo: m.sender,
          text:
            m.ctype === Constants.CTYPE_FILE_REQUEST
              ? createStaticFileArea(m.text, m.sender)
              : m.text,
          sentMessageId: '',
          received_text_id: m.received_text_id,
          file_id: '',
          sentTimeValue: parseDate(m.sent_ltime),
          sentTimeDisplay: m.sent_ltime,
        }
        addMessageToWebchatQueue(m.conf_id, message)
      }
    }
  /*
   * Function showDaysMessages
   */ var showDaysMessages = function showDaysMessages(panel, days) {
    var now = new Date()
    var begin =
      new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0,
        0,
      ).getTime() -
      (days - 1) * 86400000
    var end = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59,
      999,
    ).getTime()
    showHistoricalMessages(panel, begin, end, true)
  }
  /*
   * Function showHistoricalMessages
   */ var showHistoricalMessages = function showHistoricalMessages(
    panel,
    begin,
    end,
    clears,
    funcOK,
  ) {
    if (panel.panelType !== 'CHAT') {
      logger.log('error', 'unknown panel.panelType==' + panel.panelType)
      return
    }
    var target = {}
    try {
      target = JSON.parse(panel.panelKey)
    } catch (e) {
      logger.log('error', 'failed to parse panel.panelKey==' + panel.panelKey)
      return
    }
    if (panel.imgShowMessages.style.visibility === 'visible') {
      // now searching
      return
    }
    panel.imgShowMessages.style.visibility = 'visible'
    chatClient.searchTexts(
      {
        tenant: target.tenant,
        user_id: target.user_id,
        begin: begin,
        end: end,
        asc: true,
        max: SEARCH_DAYS_MESSAGES_MAX,
      },
      function (ev) {
        if (clears) {
          // clear messages html
          panel.panelMessages.innerHTML = ''
          messageListsChat[panel.panelKey] = []
        }
        if (!messageListsChat[panel.panelKey]) {
          messageListsChat[panel.panelKey] = []
        } // add messages html
        var messageList = messageListsChat[panel.panelKey]
        for (var i = 0; i < ev.logs.length; i++) {
          var log = ev.logs[i]
          var message = createMessageInTopic(log)
          messageList.push(message)
          displayMessage(
            messageList,
            true,
            panel.panelMessages,
            panel.panelChatList.domNode,
            true,
          )
        }
        panel.imgShowMessages.style.visibility = 'hidden'
        if (funcOK) {
          funcOK()
        }
      },
      function (ev) {
        logger.log(
          'warn',
          'chatClient.searchTexts error code: ' +
            ev.code +
            ', message: ' +
            ev.message,
        )
        windowAlert(
          ucMsgs.CMN_ALERT,
          ucMsgs.MSG_SEARCH_FAILED + ' (' + ev.code + ' ' + ev.message + ')',
        )
        panel.imgShowMessages.style.visibility = 'hidden'
      },
    )
  }
  /*
   * Function displayMessage
   */ var displayMessage = function displayMessage(
    messageList,
    displayLast,
    div,
    scrollDiv,
    showsDate,
  ) {
    var index = 0
    if (displayLast) {
      index = messageList.length - 1
    }
    if (messageList.length === 0) {
      logger.log('error', 'empty messageList')
      return
    }
    var message = messageList[index]
    var profile = chatClient.getProfile()
    var senderKey = SENDER_KEY_ME
    var senderName = ''
    var senderProfinfo = ''
    if (
      profile.tenant === message.senderInfo.tenant &&
      profile.user_id === message.senderInfo.user_id
    ) {
      senderName = message.senderInfo.name || profile.name || profile.user_id
    } else {
      senderKey = JSON.stringify({
        tenant: message.senderInfo.tenant,
        user_id: message.senderInfo.user_id,
      })
      if (message.senderInfo.user_type === Constants.USER_TYPE_TENANT_GUEST) {
        // history of guest
        senderName =
          message.senderInfo.user_name + ' ' + message.senderInfo.user_email
        senderProfinfo = message.senderInfo.user_profinfo
      } else {
        senderName =
          chatClient.getBuddyUser(message.senderInfo).name ||
          message.senderInfo.user_id
      }
    }
    require(['dojo/dom-construct'], function (domConstruct) {
      // get or create paragraph
      var paragraph = null
      var sameNameSameTime = false
      if (
        displayLast &&
        index > 0 &&
        messageList[index - 1].senderInfo.tenant ===
          messageList[index].senderInfo.tenant &&
        messageList[index - 1].senderInfo.user_id ===
          messageList[index].senderInfo.user_id
      ) {
        var paragraphs = dojo.query('> .brUCChatParagraph', div)
        if (paragraphs.length > 0) {
          paragraph = paragraphs[paragraphs.length - 1]
          var t =
            messageList[index].sentTimeValue.getTime() -
            messageList[index - 1].sentTimeValue.getTime()
          if (0 <= t && t <= 30000) {
            sameNameSameTime = true
          }
        }
      }
      if (
        !displayLast &&
        messageList.length > 1 &&
        messageList[1].senderInfo.tenant === messageList[0].senderInfo.tenant &&
        messageList[1].senderInfo.user_id === messageList[0].senderInfo.user_id
      ) {
        var paragraphs = dojo.query('> .brUCChatParagraph', div)
        if (paragraphs.length > 0) {
          paragraph = paragraphs[0]
          var t =
            messageList[1].sentTimeValue.getTime() -
            messageList[0].sentTimeValue.getTime()
          if (0 <= t && t <= 30000) {
            sameNameSameTime = true
          }
        }
      }
      if (paragraph === null) {
        var paragraphClassIndex = senderKeyToParagraphClass.indexOf(senderKey)
        if (paragraphClassIndex === -1) {
          senderKeyToParagraphClass.push(senderKey)
          paragraphClassIndex = senderKeyToParagraphClass.indexOf(senderKey)
        }
        var paragraphClass =
          PARAGRAPH_CLASSES[paragraphClassIndex % PARAGRAPH_CLASSES.length]
        var paragraphHtml =
          '<div data-brekeke-uc-sender-key="' +
          encodeURIComponent(senderKey) +
          '" class="brUCChatParagraph ' +
          paragraphClass +
          '"></div>'
        paragraph = domConstruct.toDom(paragraphHtml)
        domConstruct.place(paragraph, div, displayLast ? 'last' : 'first')
      }
      var messageName = escapeHTML(senderName)
      var messageProfinfo = escapeHTML(senderProfinfo)
      var messageTime = showsDate
        ? formatMessageDateTime(message.sentTimeDisplay)
        : formatTime(message.sentTimeDisplay)
      var messageText = message.text // smiley ascii to html
      for (var i = 0; i < smileyAsciiToHtml.length; i++) {
        messageText = messageText.replace(
          smileyAsciiToHtml[i].regex,
          smileyAsciiToHtml[i].html,
        )
      } // url to link
      if (urlRegExp && urlRegExpNG) {
        if (!messageText.match(urlRegExpNG)) {
          messageText = messageText.replace(
            urlRegExp,
            '<a href="$&" target="_blank">$&</a>',
          )
        }
      } // file area
      if (message.file_id) {
        messageText =
          '<span data-brekeke-uc-file-id="' +
          message.file_id +
          '" class="brUCChatMessageFileArea"></span>'
      } // create message
      if (!sameNameSameTime) {
        var messageHtml =
          '<div data-brekeke-uc-sent-message-id="' +
          message.sentMessageId +
          '" class="brUCChatMessage">\n'
        messageHtml +=
          '<div data-brekeke-uc-tenant="' +
          message.senderInfo.tenant +
          '" data-brekeke-uc-user-id="' +
          message.senderInfo.user_id +
          '" class="brUCUserName brUCChatMessageName" title="' +
          messageProfinfo +
          '">' +
          messageName +
          '</div>\n'
        messageHtml +=
          '<div class="brUCChatMessageTime">' + messageTime + '</div>\n'
        messageHtml +=
          '<div class="brUCChatMessageText">' + messageText + '</div>\n'
        messageHtml += '</div>\n'
        domConstruct.place(
          domConstruct.toDom(messageHtml),
          paragraph,
          displayLast ? 'last' : 'first',
        )
      } else if (displayLast) {
        var messageHtml =
          '<div data-brekeke-uc-sent-message-id="' +
          message.sentMessageId +
          '" class="brUCChatMessage">\n'
        messageHtml +=
          '<div class="brUCChatMessageText">' + messageText + '</div>\n'
        messageHtml += '</div>\n'
        domConstruct.place(domConstruct.toDom(messageHtml), paragraph, 'last')
      } else {
        var org = dojo.query('.brUCChatMessageName', paragraph)
        domConstruct.destroy(org[0])
        org = dojo.query('.brUCChatMessageTime', paragraph)
        domConstruct.destroy(org[0])
        var messageHtml =
          '<div data-brekeke-uc-sent-message-id="' +
          message.sentMessageId +
          '" class="brUCChatMessage">\n'
        messageHtml +=
          '<div data-brekeke-uc-tenant="' +
          message.senderInfo.tenant +
          '" data-brekeke-uc-user-id="' +
          message.senderInfo.user_id +
          '" class="brUCUserName brUCChatMessageName" title="' +
          messageProfinfo +
          '">' +
          messageName +
          '</div>\n'
        messageHtml +=
          '<div class="brUCChatMessageTime">' + messageTime + '</div>\n'
        messageHtml +=
          '<div class="brUCChatMessageText">' + messageText + '</div>\n'
        messageHtml += '</div>\n'
        domConstruct.place(domConstruct.toDom(messageHtml), paragraph, 'first')
      }
      if (message.file_id) {
        displayFile(message.file_id)
      } // scroll
      if (scrollDiv) {
        scrollDiv.scrollTop = scrollDiv.scrollHeight
      }
    })
  }
  /*
   * Function displayMessageError
   */ var displayMessageError = function displayMessageError(
    panel,
    sentMessageId,
    msg,
  ) {
    require(['dojo/dom-construct'], function (domConstruct) {
      var messageAreas = dojo.query(
        '[data-brekeke-uc-sent-message-id=' + sentMessageId + ']',
        panel.panelMessages,
      )
      for (var i = 0; i < messageAreas.length; i++) {
        var textAreas = dojo.query('.brUCChatMessageText', messageAreas[i])
        for (var j = 0; j < textAreas.length; j++) {
          domConstruct.place(
            domConstruct.toDom(
              '<span class="brUCChatMessageTextError" title="' +
                msg +
                '"></span>',
            ),
            textAreas[j],
            'first',
          )
        }
      }
    })
  }
  /*
   * Function updateSentTimeDisplayMessage
   */ var updateSentTimeDisplayMessage = function updateSentTimeDisplayMessage(
    panel,
    sentMessageId,
    sentTimeDisplay,
  ) {
    var messageList =
      (panel.panelType === 'CHAT'
        ? messageListsChat
        : panel.panelType === 'CONFERENCE'
          ? messageListsConference
          : panel.panelType === 'BROADCAST'
            ? messageListsBroadcast
            : {})[panel.panelKey] || []
    for (var i = 0; i < messageList.length; i++) {
      if (messageList[i].sentMessageId === sentMessageId) {
        messageList[i].sentTimeDisplay = sentTimeDisplay
      }
    }
    var messageAreas = dojo.query(
      '[data-brekeke-uc-sent-message-id=' + sentMessageId + ']',
      panel.panelMessages,
    )
    for (var i = 0; i < messageAreas.length; i++) {
      var timeAreas = dojo.query('.brUCChatMessageTime', messageAreas[i])
      for (var j = 0; j < timeAreas.length; j++) {
        timeAreas[j].innerHTML = formatTime(sentTimeDisplay)
      }
    }
  }
  /*
   * Function displayBroadcastCheckedMessage
   */ var displayBroadcastCheckedMessage =
    function displayBroadcastCheckedMessage(panel) {
      if (broadcastUsersTable[panel.panelKey]) {
        for (var i = 0; i < broadcastUsersTable[panel.panelKey].length; i++) {
          var senderKey = JSON.stringify({
            tenant: broadcastUsersTable[panel.panelKey][i].tenant,
            user_id: broadcastUsersTable[panel.panelKey][i].user_id,
          })
          var paragraphs = dojo.query(
            '[data-brekeke-uc-sender-key=' +
              encodeURIComponent(senderKey) +
              ']',
            panel.panelMessages,
          )
          if (paragraphs && paragraphs.length && paragraphs[0]) {
            for (var j = 0; j < paragraphs.length; j++) {
              paragraphs[j].style.display = broadcastUsersTable[panel.panelKey][
                i
              ].checked
                ? 'block'
                : 'none'
            }
          }
        }
      }
    }
  /*
   * Function readText
   */ var readText = function readText(received_text_id) {
    chatClient.readText([received_text_id], function (ev) {
      logger.log(
        'warn',
        'chatClient.readText error code: ' +
          ev.code +
          ', message: ' +
          ev.message,
      )
    })
  }
  /*
   * Function sendTyping
   */ var sendTyping = function sendTyping(panel) {
    var now = new Date().getTime()
    if (
      !lastSentTypingTimeTable[panel.panelKey] ||
      now >= lastSentTypingTimeTable[panel.panelKey] + SEND_TYPING_INTERVAL
    ) {
      lastSentTypingTimeTable[panel.panelKey] = now
      if (panel.panelType === 'CHAT') {
        var target = {}
        try {
          target = JSON.parse(panel.panelKey)
        } catch (e) {
          logger.log(
            'error',
            'failed to parse panel.panelKey==' + panel.panelKey,
          )
          return
        }
        if (!target.user_id) {
          logger.log(
            'error',
            'empty user_id of panel.panelKey==' + panel.panelKey,
          )
          return
        }
        chatClient.sendTyping(target, null, function (ev) {
          logger.log(
            'warn',
            'chatClient.sendTyping error code: ' +
              ev.code +
              ', message: ' +
              ev.message,
          )
        })
      } else if (panel.panelType === 'CONFERENCE') {
        var profile = chatClient.getProfile()
        var conference = chatClient.getConference(panel.panelKey)
        if (conference.conf_status === Constants.CONF_STATUS_JOINED) {
          for (var i = 0; i < conference.user.length; i++) {
            if (
              conference.user[i].conf_status === Constants.CONF_STATUS_JOINED
            ) {
              var target = {
                tenant: conference.user[i].tenant,
                user_id: conference.user[i].user_id,
              }
              if (
                target.tenant !== profile.tenant ||
                target.user_id !== profile.user_id
              ) {
                chatClient.sendTyping(target, null, function (ev) {
                  logger.log(
                    'warn',
                    'chatClient.sendTyping error code: ' +
                      ev.code +
                      ', message: ' +
                      ev.message,
                  )
                })
              }
            }
          }
        }
      } else if (panel.panelType === 'BROADCAST') {
        if (!broadcastUsersTable[panel.panelKey]) {
          logger.log(
            'error',
            'empty broadcastUsersTable[' + panel.panelKey + ']',
          )
          return
        }
        for (var i = 0; i < broadcastUsersTable[panel.panelKey].length; i++) {
          if (broadcastUsersTable[panel.panelKey][i].checked) {
            var target = {
              tenant: broadcastUsersTable[panel.panelKey][i].tenant,
              user_id: broadcastUsersTable[panel.panelKey][i].user_id,
            }
            chatClient.sendTyping(target, null, function (ev) {
              logger.log(
                'warn',
                'chatClient.sendTyping error code: ' +
                  ev.code +
                  ', message: ' +
                  ev.message,
              )
            })
          }
        }
      }
    }
  }
  /*
   * Function showTyping
   */ var showTyping = function showTyping(buddy) {
    var key = JSON.stringify({ tenant: buddy.tenant, user_id: buddy.user_id }) // timer
    if (!hideTypingTimerTable[key]) {
      hideTypingTimerTable[key] = []
    }
    hideTypingTimerTable[key].push(
      setTimeout(function () {
        if (hideTypingTimerTable[key]) {
          hideTypingTimerTable[key].pop()
          if (hideTypingTimerTable[key].length === 0) {
            hideTyping(buddy)
          }
        }
      }, SHOW_TYPING_DURATION),
    ) // show
    require(['dojo/dom-construct'], function (domConstruct) {
      // html
      var html =
        '<span data-brekeke-uc-tenant="' +
        buddy.tenant +
        '" data-brekeke-uc-user-id="' +
        buddy.user_id +
        '">' +
        formatStr(
          ucMsgs.LBL_IS_TYPING,
          chatClient.getBuddyUser(buddy).name || buddy.user_id,
        ) +
        '<br /></span>' // add to chat panel
      var panel = panelsChat[key]
      if (panel) {
        var existings = dojo.query(
          '[data-brekeke-uc-tenant=' +
            buddy.tenant +
            '][data-brekeke-uc-user-id=' +
            buddy.user_id +
            ']',
          panel.panelTyping,
        )
        if (!existings.length) {
          var dom = domConstruct.toDom(html)
          domConstruct.place(dom, panel.panelTyping, 'last')
        }
      } // add to conference panel
      for (var conf_id in panelsConference) {
        var conference = chatClient.getConference(conf_id)
        if (conference.conf_status === Constants.CONF_STATUS_JOINED) {
          for (var i = 0; i < conference.user.length; i++) {
            if (
              conference.user[i].conf_status === Constants.CONF_STATUS_JOINED &&
              conference.user[i].tenant === buddy.tenant &&
              conference.user[i].user_id === buddy.user_id
            ) {
              var panel = panelsConference[conf_id]
              if (panel) {
                var existings = dojo.query(
                  '[data-brekeke-uc-tenant=' +
                    buddy.tenant +
                    '][data-brekeke-uc-user-id=' +
                    buddy.user_id +
                    ']',
                  panel.panelTyping,
                )
                if (!existings.length) {
                  var dom = domConstruct.toDom(html)
                  domConstruct.place(dom, panel.panelTyping, 'last')
                }
              }
            }
          }
        }
      } // add to broadcast panel
      for (var broadcastPanelKey in panelsBroadcast) {
        if (broadcastUsersTable[broadcastPanelKey]) {
          for (
            var i = 0;
            i < broadcastUsersTable[broadcastPanelKey].length;
            i++
          ) {
            if (
              broadcastUsersTable[broadcastPanelKey][i].checked &&
              broadcastUsersTable[broadcastPanelKey][i].tenant ===
                buddy.tenant &&
              broadcastUsersTable[broadcastPanelKey][i].user_id ===
                buddy.user_id
            ) {
              var panel = panelsBroadcast[broadcastPanelKey]
              if (panel) {
                var existings = dojo.query(
                  '[data-brekeke-uc-tenant=' +
                    buddy.tenant +
                    '][data-brekeke-uc-user-id=' +
                    buddy.user_id +
                    ']',
                  panel.panelTyping,
                )
                if (!existings.length) {
                  var dom = domConstruct.toDom(html)
                  domConstruct.place(dom, panel.panelTyping, 'last')
                }
              }
            }
          }
        }
      }
    })
  }
  /*
   * Function hideTyping
   */ var hideTyping = function hideTyping(buddy) {
    var key = JSON.stringify({ tenant: buddy.tenant, user_id: buddy.user_id })
    if (hideTypingTimerTable[key]) {
      while (hideTypingTimerTable[key].length > 0) {
        clearTimeout(hideTypingTimerTable[key].pop())
      }
      delete hideTypingTimerTable[key] // hide
      require(['dojo/dom-construct'], function (domConstruct) {
        // remove from chat panel
        var panel = panelsChat[key]
        if (panel) {
          var existings = dojo.query(
            '[data-brekeke-uc-tenant=' +
              buddy.tenant +
              '][data-brekeke-uc-user-id=' +
              buddy.user_id +
              ']',
            panel.panelTyping,
          )
          for (var i = 0; i < existings.length; i++) {
            domConstruct.destroy(existings[i])
          }
        } // remove from conference panel
        for (var conf_id in panelsConference) {
          var panel = panelsConference[conf_id]
          if (panel) {
            var existings = dojo.query(
              '[data-brekeke-uc-tenant=' +
                buddy.tenant +
                '][data-brekeke-uc-user-id=' +
                buddy.user_id +
                ']',
              panel.panelTyping,
            )
            for (var i = 0; i < existings.length; i++) {
              domConstruct.destroy(existings[i])
            }
          }
        } // remove from broadcast panel
        for (var broadcastPanelKey in panelsBroadcast) {
          var panel = panelsBroadcast[broadcastPanelKey]
          if (panel) {
            var existings = dojo.query(
              '[data-brekeke-uc-tenant=' +
                buddy.tenant +
                '][data-brekeke-uc-user-id=' +
                buddy.user_id +
                ']',
              panel.panelTyping,
            )
            for (var i = 0; i < existings.length; i++) {
              domConstruct.destroy(existings[i])
            }
          }
        }
      })
    }
  }
  /*
   * Function createConference
   */ var createConference = function createConference(subject, invite) {
    if (!subject) {
      return
    }
    if (!invite) {
      invite = []
    } // create conference
    chatClient.createConference(
      subject,
      invite,
      function (ev) {
        // funcOK
        // join conference
        chatClient.joinConference(
          ev.conference.conf_id,
          { invisible: false, exclusive: false },
          function (ev) {
            // funcOK
            // open conference
            openConference(ev.conference.conf_id, null, null, true)
          },
          function (ev) {
            // funcError
            logger.log(
              'warn',
              'chatClient.joinConference error code: ' +
                ev.code +
                ', message: ' +
                ev.message,
            )
            windowAlert(
              ucMsgs.CMN_ALERT,
              ucMsgs.MSG_JOIN_CONFERENCE_FAILED +
                ' (' +
                ev.code +
                ' ' +
                ev.message +
                ')',
            )
          },
        )
      },
      function (ev) {
        // funcError
        logger.log(
          'warn',
          'chatClient.createConference error code: ' +
            ev.code +
            ', message: ' +
            ev.message,
        )
        windowAlert(
          ucMsgs.CMN_ALERT,
          ucMsgs.MSG_CREATE_CONFERENCE_FAILED +
            ' (' +
            ev.code +
            ' ' +
            ev.message +
            ')',
        )
      },
    )
  }
  /*
   * Function joinConference
   */ var joinConference = function joinConference(conf_id) {
    var conference = chatClient.getConference(conf_id)
    if (conference.conf_status !== Constants.CONF_STATUS_INVITED) {
      logger.log('error', 'cannot join conf_status==' + conference.conf_status)
      return
    } // join conference
    chatClient.joinConference(
      conf_id,
      { invisible: false, exclusive: false },
      function (ev) {
        // funcOK
        if (conference.conf_type === 'webchat') {
          displayWebchatQueueInfo(conf_id)
        } // display conference
        //displayConference(ev.conference.conf_id); // displayConference in chatClient_onConferenceMemberChanged
      },
      function (ev) {
        // funcError
        logger.log(
          'warn',
          'chatClient.joinConference error code: ' +
            ev.code +
            ', message: ' +
            ev.message,
        )
        windowAlert(
          ucMsgs.CMN_ALERT,
          ucMsgs.MSG_JOIN_CONFERENCE_FAILED +
            ' (' +
            ev.code +
            ' ' +
            ev.message +
            ')',
        )
      },
    )
  }
  /*
   * Function leaveConference
   */ var leaveConference = function leaveConference(conf_id, refresh) {
    var conferenceOrg = chatClient.getConference(conf_id)
    var panel = panelsConference[conf_id]
    if (panel) {
      clearCall(panel)
    } // leave conference
    chatClient.leaveConference(
      { conf_id: conf_id },
      function (ev) {
        // funcOK
        if (refresh) {
          // display conference
          displayConference(conf_id)
        }
        if (conferenceOrg.conf_type === 'webchat') {
          if (ev.closes) {
            removeWebchatQueue(conf_id)
          }
        }
      },
      function (ev) {
        // funcError
        logger.log(
          'warn',
          'chatClient.leaveConference error code: ' +
            ev.code +
            ', message: ' +
            ev.message,
        )
        windowAlert(
          ucMsgs.CMN_ALERT,
          ucMsgs.MSG_LEAVE_CONFERENCE_FAILED +
            ' (' +
            ev.code +
            ' ' +
            ev.message +
            ')',
        )
      },
    )
  }
  /*
   * Function inviteToConference
   */ var inviteToConference = function inviteToConference(conf_id, invite) {
    var conference = chatClient.getConference(conf_id)
    if (conference.conf_status !== Constants.CONF_STATUS_JOINED) {
      logger.log(
        'error',
        'cannot invite to conference of conf_id==' +
          conf_id +
          ', conf_status==' +
          conference.conf_status,
      )
      return
    } // invite to conference
    chatClient.inviteToConference(
      conf_id,
      invite,
      function (ev) {
        // funcOK
        // display conference
        displayConference(conf_id)
      },
      function (ev) {
        // funcError
        logger.log(
          'warn',
          'chatClient.inviteToConference error code: ' +
            ev.code +
            ', message: ' +
            ev.message,
        )
        windowAlert(
          ucMsgs.CMN_ALERT,
          ucMsgs.MSG_INVITE_TO_CONFERENCE_FAILED +
            ' (' +
            ev.code +
            ' ' +
            ev.message +
            ')',
        )
      },
    )
  }
  /*
   * Function checkInvitationAcceptance
   */ var checkInvitationAcceptance = function checkInvitationAcceptance(
    items,
    conf_id,
  ) {
    var invite = [] // get buddies from dnd items
    var buddySet = {}
    var buddylist = chatClient.getBuddylist()
    try {
      for (var i = 0; i < items.length; i++) {
        var item = items[i]
        if (item) {
          if (item.user_id) {
            // user
            buddySet[
              JSON.stringify({ tenant: item.tenant, user_id: item.user_id })
            ] = true
          } else if (!item.showMore) {
            // group
            for (var j = 0; j < buddylist.user.length; j++) {
              var buddy = buddylist.user[j]
              if (buddy.group === item.id && buddy.user_id) {
                buddySet[
                  JSON.stringify({
                    tenant: buddy.tenant,
                    user_id: buddy.user_id,
                  })
                ] = true
              }
            }
          }
        }
      }
    } catch (e) {
      logger.log('error', e.message)
      return invite
    } // check conference status and users
    var conference = chatClient.getConference(conf_id)
    if (conference.conf_status !== Constants.CONF_STATUS_JOINED) {
      return invite // i am not joined
    }
    for (var key in buddySet) {
      var buddy = JSON.parse(key)
      var ok = true
      if (
        chatClient.getBuddyStatus(buddy).status === Constants.STATUS_OFFLINE
      ) {
        ok = false // buddy is offline
      } else {
        for (var i = 0; i < conference.user.length; i++) {
          var user = conference.user[i]
          if (buddy.tenant === user.tenant && buddy.user_id === user.user_id) {
            ok = false // buddy is already invited
            break
          }
        }
      }
      if (ok) {
        invite.push(buddy)
      }
    }
    return invite
  }
  /*
   * Function inputFile
   */ var inputFile = function inputFile(panel) {
    if (panel.panelType !== 'CHAT' && panel.panelType !== 'CONFERENCE') {
      return
    }
    if (window.FormData) {
      // FormData enabled
      panel.inputHeaderFileForm.setAttribute('multiple', '')
    } else {
      for (var file_id in fileTable) {
        if (
          fileTable[file_id].panelKey === panel.panelKey &&
          (fileTable[file_id].fileInfo.status ===
            Constants.FILE_STATUS_UNACCEPTED ||
            fileTable[file_id].fileInfo.status ===
              Constants.FILE_STATUS_TRANSFERRING)
        ) {
          // already sending
          windowAlert(ucMsgs.CMN_ALERT, ucMsgs.MSG_MULTIPLE_SENDING)
          return
        }
      }
    } // input file
    panel.formHeaderFileForm.reset()
    if (getBrowser() === 'IE') {
      require(['dijit/Dialog', 'dijit/form/Button'], function (Dialog, Button) {
        var dia = new Dialog({
          title: ucMsgs.BTN_DIALOG_SEND_FILE,
          content: '<div class="brUCPanelChatHeaderFileFormDialog"></div>',
          closable: false,
        })
        dia.addChild(
          new Button({
            label: ucMsgs.CMN_CANCEL,
            onClick: function onClick() {
              panel.panelChatHeaderFileForm.appendChild(
                panel.formHeaderFileForm,
              )
              dia.destroy()
            },
          }),
        )
        var div = dojo.query(
          '.brUCPanelChatHeaderFileFormDialog',
          dia.containerNode,
        )[0]
        div.appendChild(panel.formHeaderFileForm)
        dia.show()
      })
    } else {
      panel.inputHeaderFileForm.click()
    }
  }
  /*
   * Function sendFile
   */ var sendFile = function sendFile(panel) {
    if (getBrowser() === 'IE') {
      require(['dijit/registry'], function (registry) {
        var dia = registry.getEnclosingWidget(
          panel.formHeaderFileForm.parentNode,
        )
        panel.panelChatHeaderFileForm.appendChild(panel.formHeaderFileForm)
        dia.destroy()
      })
    }
    var target = {}
    if (panel.panelType === 'CHAT') {
      try {
        target = JSON.parse(panel.panelKey)
      } catch (e) {
        logger.log('error', 'failed to parse panel.panelKey==' + panel.panelKey)
        return
      }
      if (!target.user_id) {
        logger.log(
          'error',
          'empty user_id of panel.panelKey==' + panel.panelKey,
        )
        return
      }
    } else if (panel.panelType === 'CONFERENCE') {
      var conference = chatClient.getConference(panel.panelKey)
      if (conference.conf_status === Constants.CONF_STATUS_JOINED) {
        target = { conf_id: conference.conf_id }
      } else {
        logger.log(
          'error',
          'invalid conference panel.panelKey==' + panel.panelKey,
        )
        return
      }
    } else {
      logger.log('error', 'empty user_id of panel.panelKey==' + panel.panelKey)
      return
    }
    var files = panel.inputHeaderFileForm.files
    if (window.File && window.FormData) {
      // File API and FormData enabled
      if (files && files.length) {
        // send file
        chatClient.sendFiles(
          target,
          files,
          function (ev) {
            for (var i = 0; i < ev.infoList.length; i++) {
              var info = ev.infoList[i]
              for (var j = 0; j < info.fileInfos.length; j++) {
                var file_id = info.fileInfos[j].file_id
                fileTable[file_id] = {
                  fileInfo: info.fileInfos[j],
                  panelType: panel.panelType,
                  panelKey: panel.panelKey,
                  events: [],
                  inlineImage:
                    j === 0
                      ? getInlineImage(info.fileInfos[j], files[i])
                      : null,
                } // display message
                var message = {
                  senderInfo: chatClient.getProfile(),
                  text: '',
                  sentMessageId: '',
                  received_text_id: '',
                  file_id: file_id,
                  sentTimeValue: parseDate(info.ltime),
                  sentTimeDisplay: info.ltime,
                }
                addMessageToList(message, panel)
              }
            }
          },
          function (ev) {
            logger.log(
              'warn',
              'chatClient.sendFiles error code: ' +
                ev.code +
                ', message: ' +
                ev.message,
            )
            windowAlert(
              ucMsgs.CMN_ALERT,
              ucMsgs.MSG_SEND_FILE_FAILED +
                ' (' +
                ev.code +
                ' ' +
                ev.message +
                ')',
            )
          },
        )
      }
    } else {
      if (panel.inputHeaderFileForm.value) {
        if (target.user_id) {
          // send file
          chatClient.sendFile(
            target,
            panel.inputHeaderFileForm,
            function (ev) {
              var file_id = ev.fileInfo.file_id
              fileTable[file_id] = {
                fileInfo: ev.fileInfo,
                panelType: panel.panelType,
                panelKey: panel.panelKey,
                events: [],
                inlineImage: null,
              } // display message
              var message = {
                senderInfo: chatClient.getProfile(),
                text: '',
                sentMessageId: '',
                received_text_id: '',
                file_id: file_id,
                sentTimeValue: parseDate(ev.ltime),
                sentTimeDisplay: ev.ltime,
              }
              addMessageToList(message, panel)
            },
            function (ev) {
              logger.log(
                'warn',
                'chatClient.sendFile error code: ' +
                  ev.code +
                  ', message: ' +
                  ev.message,
              )
              windowAlert(
                ucMsgs.CMN_ALERT,
                ucMsgs.MSG_SEND_FILE_FAILED +
                  ' (' +
                  ev.code +
                  ' ' +
                  ev.message +
                  ')',
              )
            },
          )
        } else {
          logger.log(
            'error',
            'empty user_id of panel.panelKey==' + panel.panelKey,
          )
          return
        }
      }
    }
  }
  /*
   * Function dropFile
   */ var dropFile = function dropFile(panel, files) {
    if (panel.panelType !== 'CHAT' && panel.panelType !== 'CONFERENCE') {
      return
    }
    var target = {}
    if (panel.panelType === 'CHAT') {
      try {
        target = JSON.parse(panel.panelKey)
      } catch (e) {
        logger.log('error', 'failed to parse panel.panelKey==' + panel.panelKey)
        return
      }
      if (!target.user_id) {
        logger.log(
          'error',
          'empty user_id of panel.panelKey==' + panel.panelKey,
        )
        return
      }
    } else if (panel.panelType === 'CONFERENCE') {
      var conference = chatClient.getConference(panel.panelKey)
      if (conference.conf_status === Constants.CONF_STATUS_JOINED) {
        target = { conf_id: conference.conf_id }
      } else {
        logger.log(
          'error',
          'invalid conference panel.panelKey==' + panel.panelKey,
        )
        return
      }
    } else {
      logger.log('error', 'empty user_id of panel.panelKey==' + panel.panelKey)
      return
    }
    if (window.File && window.FormData) {
      // File API and FormData enabled
      if (files && files.length) {
        // send file
        chatClient.sendFiles(
          target,
          files,
          function (ev) {
            for (var i = 0; i < ev.infoList.length; i++) {
              var info = ev.infoList[i]
              for (var j = 0; j < info.fileInfos.length; j++) {
                var file_id = info.fileInfos[j].file_id
                fileTable[file_id] = {
                  fileInfo: info.fileInfos[j],
                  panelType: panel.panelType,
                  panelKey: panel.panelKey,
                  events: [],
                  inlineImage:
                    j === 0
                      ? getInlineImage(info.fileInfos[j], files[i])
                      : null,
                } // display message
                var message = {
                  senderInfo: chatClient.getProfile(),
                  text: '',
                  sentMessageId: '',
                  received_text_id: '',
                  file_id: file_id,
                  sentTimeValue: parseDate(info.ltime),
                  sentTimeDisplay: info.ltime,
                }
                addMessageToList(message, panel)
              }
            }
          },
          function (ev) {
            logger.log(
              'warn',
              'chatClient.sendFiles error code: ' +
                ev.code +
                ', message: ' +
                ev.message,
            )
            windowAlert(
              ucMsgs.CMN_ALERT,
              ucMsgs.MSG_SEND_FILE_FAILED +
                ' (' +
                ev.code +
                ' ' +
                ev.message +
                ')',
            )
          },
        )
      }
    }
  }
  /*
   * Function getInlineImage
   */ var getInlineImage = function getInlineImage(fileInfo, file) {
    var settings = chatClient.getSettings()
    if (
      !(
        settings.optional_settings &&
        settings.optional_settings.image_file_transfer === 'file'
      ) &&
      getBrowser() !== 'IE' &&
      window.URL
    ) {
      // check file type
      var ext = fileInfo.name
        .substr(fileInfo.name.lastIndexOf('.') + 1)
        .toLowerCase()
      if (
        ext === 'png' ||
        ext === 'jpg' ||
        ext === 'jpeg' ||
        ext === 'gif' ||
        ext === 'bmp'
      ) {
        if (fileInfo.isUpload) {
          // check uploading file
          if (file && file.size !== 0) {
            // get url
            return { url: window.URL.createObjectURL(file) }
          }
          return null
        } else {
          // start downloading file with xhr
          var file_id = fileInfo.file_id
          var xhr = new XMLHttpRequest()
          xhr.file_id = file_id
          xhr.responseType = 'blob'
          xhr.onload = panelChatInlineImageXhr_onload
          chatClient.acceptFileWithXhr(file_id, xhr, function (ev) {
            logger.log(
              'warn',
              'chatClient.acceptFile error code: ' +
                ev.code +
                ', message: ' +
                ev.message,
            )
          }) // get url after download (xhr.onload)
          return { url: '' }
        }
      }
    }
    return null
  }
  /*
   * Function acceptFile
   */ var acceptFile = function acceptFile(file_id) {
    var key = fileTable[file_id].panelKey
    var panel = (
      fileTable[file_id].panelType === 'CHAT'
        ? panelsChat
        : fileTable[file_id].panelType === 'CONFERENCE'
          ? panelsConference
          : {}
    )[key]
    if (panel) {
      var fileArea = dojo.query(
        '[data-brekeke-uc-file-id=' + file_id + ']',
        panel.panelMessages,
      )[0]
      if (fileArea) {
        var acceptButton = dojo.query(
          '[data-brekeke-uc-accept-file-id]',
          fileArea,
        )[0]
        acceptButton.style.visibility = 'hidden'
        var formArea = dojo.query(
          '.brUCChatMessageFileDownloadFormArea',
          fileArea,
        )[0]
        formArea.innerHTML =
          '<form target="iframe_' +
          file_id +
          '"></form><iframe name="iframe_' +
          file_id +
          '"></iframe>'
        var form = dojo.query('form', formArea)[0] // accept file
        chatClient.acceptFile(file_id, form, function (ev) {
          logger.log(
            'warn',
            'chatClient.acceptFile error code: ' +
              ev.code +
              ', message: ' +
              ev.message,
          )
          windowAlert(
            ucMsgs.CMN_ALERT,
            ucMsgs.MSG_DOWNLOAD_FILE_FAILED +
              ' (' +
              ev.code +
              ' ' +
              ev.message +
              ')',
          )
        })
      }
    }
  }
  /*
   * Function cancelFile
   */ var cancelFile = function cancelFile(file_id, quiet) {
    var key = fileTable[file_id].panelKey
    var panel = (
      fileTable[file_id].panelType === 'CHAT'
        ? panelsChat
        : fileTable[file_id].panelType === 'CONFERENCE'
          ? panelsConference
          : {}
    )[key]
    if (panel) {
      var fileArea = dojo.query(
        '[data-brekeke-uc-file-id=' + file_id + ']',
        panel.panelMessages,
      )[0]
      if (fileArea) {
        var cancelButton = dojo.query(
          '[data-brekeke-uc-cancel-file-id]',
          fileArea,
        )[0]
        cancelButton.style.visibility = 'hidden'
      }
    } // cancel file
    chatClient.cancelFile(file_id, function (ev) {
      logger.log(
        'warn',
        'chatClient.cancelFile error code: ' +
          ev.code +
          ', message: ' +
          ev.message,
      )
      if (!quiet) {
        windowAlert(
          ucMsgs.CMN_ALERT,
          ucMsgs.MSG_CANCEL_FILE_FAILED +
            ' (' +
            ev.code +
            ' ' +
            ev.message +
            ')',
        )
      }
    })
  }
  /*
   * Function displayFile
   */ var displayFile = function displayFile(file_id) {
    require(['dojo/on'], function (on) {
      var fileInfo = fileTable[file_id].fileInfo
      var key = fileTable[file_id].panelKey
      var panel = (
        fileTable[file_id].panelType === 'CHAT'
          ? panelsChat
          : fileTable[file_id].panelType === 'CONFERENCE'
            ? panelsConference
            : {}
      )[key]
      if (!panel) {
        return
      }
      var fileArea = dojo.query(
        '[data-brekeke-uc-file-id=' + file_id + ']',
        panel.panelMessages,
      )[0]
      if (!fileArea) {
        return
      }
      if (!dojo.query('table', fileArea)[0]) {
        // create table
        fileArea.innerHTML =
          '\
                    <table class="brUCChatMessageFileTable">\n\
                        <tr>\n\
                            <td rowspan="3" class="brUCChatMessageFileTd1">\n\
                                <span class="brUCChatMessageFileDownloadFormArea"></span>\n\
                                <span class="brUCChatMessageFileImage"></span>\n\
                            </td>\n\
                            <td class="brUCChatMessageFileTd2">' +
          ucMsgs.LBL_FILE +
          '</td>\n\
                            <td>\n\
                                <span class="brUCChatMessageFileName"></span> <span class="brUCChatMessageFileSize"></span>\n\
                            </td>\n\
                        </tr>\n\
                        <tr class="brUCChatMessageFileTrProgress">\n\
                            <td class="brUCChatMessageFileTd2">' +
          ucMsgs.LBL_STATUS +
          '</td>\n\
                            <td>\n\
                                <progress max="100" value="0" class="brUCChatMessageFileProgress brUCProgressFile"></progress> <span class="brUCChatMessageFileStatus"></span>\n\
                            </td>\n\
                        </tr>\n\
                        <tr class="brUCChatMessageFileTrButtons">\n\
                            <td colspan="2">\n\
                                <button data-brekeke-uc-accept-file-id="' +
          file_id +
          '" class="brUCSimpleButton brUCButtonFile">' +
          ucMsgs.BTN_DOWNLOAD_FILE +
          '</button>\n\
                                <button data-brekeke-uc-cancel-file-id="' +
          file_id +
          '" class="brUCSimpleButton brUCButtonFile">' +
          ucMsgs.BTN_CANCEL_FILE +
          '</button>\n\
                                <a href="javascript:void(0)" target="_blank" class="brUCChatMessageFileLink brUCSimpleButton brUCLinkFile">' +
          ucMsgs.BTN_SAVE_IMAGE_FILE +
          '</a>\n\
                            </td>\n\
                        </tr>\n\
                        <tr class="brUCChatMessageFileTrImg">\n\
                            <td colspan="3">\n\
                                <img class="brUCChatMessageFileImg brUCImgFile" />\n\
                            </td>\n\
                        </tr>\n\
                    </table>\n\
                ' // button event
        fileTable[file_id].events.push(
          on(
            dojo.query('[data-brekeke-uc-accept-file-id]', fileArea)[0],
            'click',
            panelChatAcceptFile_click,
          ),
        )
        fileTable[file_id].events.push(
          on(
            dojo.query('[data-brekeke-uc-cancel-file-id]', fileArea)[0],
            'click',
            panelChatCancelFile_click,
          ),
        )
      } // display values
      dojo
        .query('.brUCChatMessageFileImage', fileArea)
        .removeClass('brUCIconFileUpload')
        .removeClass('brUCIconFileDownload')
        .addClass(
          fileInfo.isUpload ? 'brUCIconFileUpload' : 'brUCIconFileDownload',
        )
      dojo.query('.brUCChatMessageFileName', fileArea)[0].innerHTML =
        escapeHTML(fileInfo.name)
      dojo.query('.brUCChatMessageFileSize', fileArea)[0].innerHTML =
        formatFileSize(fileInfo.size)
      dojo.query('.brUCChatMessageFileStatus', fileArea)[0].innerHTML =
        (function () {
          var statusMsg = ''
          var name = escapeHTML(
            chatClient.getBuddyUser(fileInfo.target).name ||
              fileInfo.target.user_id,
          )
          name =
            '<span data-brekeke-uc-tenant="' +
            fileInfo.target.tenant +
            '" data-brekeke-uc-user-id="' +
            fileInfo.target.user_id +
            '" class="brUCUserName">' +
            name +
            '</span>'
          if (
            fileTable[file_id].panelType === 'CONFERENCE' &&
            fileInfo.isUpload
          ) {
            statusMsg += '(' + name + ') '
          }
          if (fileInfo.status === Constants.FILE_STATUS_UNACCEPTED) {
            statusMsg += ucMsgs.LBL_FILE_STATUS_REQUESTING
          } else if (fileInfo.status === Constants.FILE_STATUS_TRANSFERRING) {
            statusMsg +=
              ucMsgs.LBL_FILE_STATUS_TRANSFERRING +
              ' (' +
              fileInfo.progress +
              '%)'
          } else if (fileInfo.status === Constants.FILE_STATUS_COMPLETED) {
            statusMsg +=
              ucMsgs.LBL_FILE_STATUS_COMPLETED + ' (' + fileInfo.progress + '%)'
          } else if (fileInfo.status === Constants.FILE_STATUS_LOCAL_CANCEL) {
            var profile = chatClient.getProfile()
            var myName = escapeHTML(profile.name || profile.user_id)
            myName =
              '<span data-brekeke-uc-tenant="' +
              profile.tenant +
              '" data-brekeke-uc-user-id="' +
              profile.user_id +
              '" class="brUCUserName">' +
              myName +
              '</span>'
            statusMsg +=
              formatStr(ucMsgs.LBL_FILE_STATUS_CANCELED, myName) +
              ' (' +
              fileInfo.progress +
              '%)'
          } else if (fileInfo.status === Constants.FILE_STATUS_REMOTE_CANCEL) {
            statusMsg +=
              formatStr(ucMsgs.LBL_FILE_STATUS_CANCELED, name) +
              ' (' +
              fileInfo.progress +
              '%)'
          } else if (fileInfo.status === Constants.FILE_STATUS_ERROR) {
            statusMsg +=
              ucMsgs.LBL_FILE_STATUS_ERROR + ' (' + fileInfo.progress + '%)'
          } else {
            statusMsg += ucMsgs.LBL_FILE_STATUS_UNKNOWN
          }
          return statusMsg
        })()
      dojo.query('.brUCChatMessageFileProgress', fileArea)[0].value =
        fileInfo.status === Constants.FILE_STATUS_TRANSFERRING ||
        fileInfo.status === Constants.FILE_STATUS_COMPLETED
          ? fileInfo.progress
          : 0 // display buttons
      var iconTd = dojo.query('.brUCChatMessageFileTd1', fileArea)[0]
      var progressTr = dojo.query('.brUCChatMessageFileTrProgress', fileArea)[0]
      var buttonsTr = dojo.query('.brUCChatMessageFileTrButtons', fileArea)[0]
      var acceptButton = dojo.query(
        '[data-brekeke-uc-accept-file-id]',
        fileArea,
      )[0]
      var cancelButton = dojo.query(
        '[data-brekeke-uc-cancel-file-id]',
        fileArea,
      )[0]
      var saveImageButton = dojo.query('.brUCChatMessageFileLink', fileArea)[0]
      var imgTr = dojo.query('.brUCChatMessageFileTrImg', fileArea)[0]
      var img = dojo.query('.brUCChatMessageFileImg', fileArea)[0]
      if (!fileTable[file_id].inlineImage) {
        // file
        if (
          fileInfo.status === Constants.FILE_STATUS_UNACCEPTED ||
          fileInfo.status === Constants.FILE_STATUS_TRANSFERRING
        ) {
          buttonsTr.style.display = 'table-row'
          if (fileInfo.isUpload) {
            acceptButton.style.display = 'none'
          } else if (fileInfo.status === Constants.FILE_STATUS_UNACCEPTED) {
            acceptButton.style.display = 'inline-block'
            acceptButton.style.visibility = 'visible'
          } else {
            acceptButton.style.display = 'inline-block'
            acceptButton.style.visibility = 'hidden'
          }
        } else {
          buttonsTr.style.display = 'none'
        }
        saveImageButton.style.display = 'none'
        imgTr.style.display = 'none'
      } else {
        // inline image
        if (fileInfo.isUpload) {
          // upload
          acceptButton.style.display = 'none'
          if (
            fileInfo.status === Constants.FILE_STATUS_UNACCEPTED ||
            fileInfo.status === Constants.FILE_STATUS_TRANSFERRING
          ) {
            cancelButton.style.display = 'inline-block'
          } else {
            cancelButton.style.display = 'none'
          }
          saveImageButton.style.display = 'none'
          img.src = fileTable[file_id].inlineImage.url
        } else {
          // download
          iconTd.rowSpan = 2
          if (
            fileInfo.status === Constants.FILE_STATUS_COMPLETED &&
            fileTable[file_id].inlineImage.url
          ) {
            progressTr.style.display = 'none'
            buttonsTr.style.display = 'table-row'
            acceptButton.style.display = 'none'
            cancelButton.style.display = 'none'
            saveImageButton.style.display = 'inline-block'
            saveImageButton.href = fileTable[file_id].inlineImage.url
            saveImageButton.download = fileInfo.name
          } else {
            progressTr.style.display = 'table-row'
            buttonsTr.style.display = 'none'
          }
          if (
            fileInfo.status === Constants.FILE_STATUS_UNACCEPTED ||
            fileInfo.status === Constants.FILE_STATUS_TRANSFERRING ||
            fileInfo.status === Constants.FILE_STATUS_COMPLETED
          ) {
            imgTr.style.display = 'table-row'
            if (fileTable[file_id].inlineImage.url) {
              img.src = fileTable[file_id].inlineImage.url
            } else {
              img.src = './img/progress.gif'
            }
          } else {
            imgTr.style.display = 'none'
          }
        }
      }
    })
  }
  /*
   * Function createStaticFileArea
   */ var createStaticFileArea = function createStaticFileArea(text, sender) {
    var profile = chatClient.getProfile()
    var fileProps = {}
    try {
      fileProps = JSON.parse(text)
    } catch (e) {}
    var isUpload
    var isThirdParty
    if (fileProps.target) {
      if (
        profile.tenant === sender.tenant &&
        profile.user_id === sender.user_id
      ) {
        isUpload = true
        isThirdParty = false
      } else if (
        (profile.tenant === fileProps.target.tenant &&
          profile.user_id === fileProps.target.user_id) ||
        (fileProps.additionals && fileProps.additionals.length)
      ) {
        isUpload = false
        isThirdParty = false
      } else {
        isUpload = true
        isThirdParty = true
      }
    } else {
      if (
        profile.tenant === sender.tenant &&
        profile.user_id === sender.user_id
      ) {
        isUpload = true
        isThirdParty = false
      } else {
        isUpload = false
        isThirdParty = false
      }
    }
    return (
      '<span class="brUCChatMessageFileArea">\n\
            <table class="brUCChatMessageFileTable">\n\
                <tr>\n\
                    <td class="brUCChatMessageFileTd1">\n\
                        <span class="brUCChatMessageFileImage ' +
      (isUpload ? 'brUCIconFileUpload' : 'brUCIconFileDownload') +
      '"></span>\n\
                    </td>\n\
                    <td class="brUCChatMessageFileTd2">' +
      ucMsgs.LBL_FILE +
      '</td>\n\
                    <td>\n\
                        <span class="brUCChatMessageFileName">' +
      string(fileProps.name) +
      '</span>\n\
                        <span class="brUCChatMessageFileSize">' +
      (isThirdParty ? '' : formatFileSize(fileProps.size)) +
      '</span>\n\
                    </td>\n\
                </tr>\n\
            </table>\n\
        </span>'
    )
  }
  /*
   * Function startWebRTC
   */ var startWebRTC = function startWebRTC(first) {
    var profile = chatClient.getProfile()
    var configProperties = chatClient.getConfigProperties()
    if (
      profile.user_type === Constants.USER_TYPE_SYSTEM_ADMIN ||
      mySignInParams.admin_mode
    ) {
      return
    }
    var lastSignedInTime = signedInTime
    if (cookiePreference.webRTCDisabled) {
      return
    }
    var webRTCTypeOptions = {}
    if (cookiePreference.webRTCTypeName) {
      var webrtc_types = []
      try {
        webrtc_types =
          JSON.parse(
            configProperties.optional_config &&
              configProperties.optional_config.webrtc_types,
          ) || []
      } catch (e) {
        logger.log('warn', 'failed to parse webrtc_types ' + e)
      }
      webrtc_types = [].concat(webrtc_types)
      for (var i = 0; i < webrtc_types.length; i++) {
        if (webrtc_types[i].name === cookiePreference.webRTCTypeName) {
          try {
            webRTCTypeOptions = JSON.parse(webrtc_types[i].options) || {}
          } catch (e) {
            logger.log(
              'warn',
              'failed to parse webrtc_types[i].options==' +
                webrtc_types[i].options +
                ' ' +
                e,
            )
          }
        }
      }
    }
    var loadPhoneProperties_funcOK = function loadPhoneProperties_funcOK(ev) {
      if (cookiePreference.webRTCDisabled) {
        logger.log('info', 'cookiePreference.webRTCDisabled turned false')
        return
      }
      if (lastSignedInTime !== signedInTime) {
        logger.log('info', 're-signed-in before start webrtc')
        return
      }
      if (ev.phone_prop) {
        try {
          var phone_prop = JSON.parse(ev.phone_prop)
          for (var k in phone_prop) {
            phone[k] = phone_prop[k]
          }
        } catch (e) {
          logger.log('warn', e)
        }
      }
      try {
        callOptions = webRTCTypeOptions.callOptions
        var configuration = webRTCTypeOptions.configuration || {}
        configuration.host = string(ev.sip_host || location.host.split(':')[0])
        configuration.port = int(
          location.protocol.indexOf('https') >= 0
            ? ev.sip_wss_port
            : ev.sip_ws_port,
        )
        configuration.tls = location.protocol.indexOf('https') >= 0
        configuration.user = string(ev.pnumber)
        configuration.auth = string(ev.authorization)
        configuration.useVideoClient = true
        configuration.register_expires = int(ev.register_expires)
        configuration.userAgent = string(ev.user_agent)
        phone.startWebRTC(configuration)
      } catch (e) {
        logger.log('error', e)
      }
    }
    chatClient.loadPhoneProperties(
      { force: false },
      loadPhoneProperties_funcOK,
      function (ev) {
        logger.log(
          'warn',
          'chatClient.loadPhoneProperties error code: ' +
            ev.code +
            ', message: ' +
            ev.message,
        )
        if (first && ev.code === Errors.WEBRTC_PERMANENTLY_UNAVAILABLE) {
          require(['dijit/Dialog', 'dijit/form/Button'], function (
            Dialog,
            Button,
          ) {
            var dia = new Dialog({
              title: ucMsgs.CMN_ALERT,
              content:
                ucMsgs.MSG_WEBRTC_UNAVAILABLE_1 +
                '<br />' +
                ucMsgs.MSG_WEBRTC_UNAVAILABLE_2 +
                '<br />',
              closable: false,
            })
            var dia_ok = function dia_ok(e) {
              dia.destroy()
              chatClient.loadPhoneProperties(
                { force: true },
                loadPhoneProperties_funcOK,
                function (ev) {
                  logger.log(
                    'warn',
                    'chatClient.loadPhoneProperties error code: ' +
                      ev.code +
                      ', message: ' +
                      ev.message,
                  )
                },
              )
            }
            var dia_cancel = function dia_cancel(e) {
              dia.destroy()
              chatClient.loadPhoneProperties(
                { force: false },
                loadPhoneProperties_funcOK,
                function (ev) {
                  logger.log(
                    'warn',
                    'chatClient.loadPhoneProperties error code: ' +
                      ev.code +
                      ', message: ' +
                      ev.message,
                  )
                },
              )
            }
            var dia_never = function dia_never(e) {
              dia.destroy()
              cookiePreference.webRTCDisabled = 'true'
              saveCookiePreference()
              if (Object.keys(panelsPreference).length !== 0) {
                displayPreference(
                  panelsPreference[Object.keys(panelsPreference)[0]],
                )
              }
            }
            var keyUp = function keyUp(e) {
              if (e.keyCode === 13) {
                dia_ok()
              } else if (e.keyCode === 27) {
                dia_cancel()
              }
            }
            dia.addChild(
              new Button({
                label: ucMsgs.BTN_ADD_PHONE_ID_YES,
                onClick: dia_ok,
                onKeyUp: keyUp,
              }),
            )
            dia.addChild(
              new Button({
                label: ucMsgs.BTN_ADD_PHONE_ID_NO,
                onClick: dia_cancel,
                onKeyDown: function onKeyDown(e) {
                  if (e.keyCode === 13) {
                    e.cancelBubble = true
                  }
                },
                onKeyUp: keyUp,
              }),
            )
            dia.addChild(
              new Button({
                label: ucMsgs.BTN_ADD_PHONE_ID_NEVER,
                onClick: dia_never,
                onKeyDown: function onKeyDown(e) {
                  if (e.keyCode === 13) {
                    e.cancelBubble = true
                  }
                },
                onKeyUp: keyUp,
              }),
            )
            dia.show()
          })
        } else {
          logger.log('info', 'retrying chatClient.loadPhoneProperties') // retry once after 10 sec
          setTimeout(
            chatClient.loadPhoneProperties.bind(
              chatClient,
              { force: false },
              loadPhoneProperties_funcOK,
              function (ev) {
                logger.log(
                  'warn',
                  'chatClient.loadPhoneProperties error code: ' +
                    ev.code +
                    ', message: ' +
                    ev.message,
                )
              },
            ),
            10000,
          )
        }
      },
    )
  }
  /*
   * Function displayExternalCallTarget
   */ var displayExternalCallTarget = function displayExternalCallTarget(
    panel,
    title,
  ) {
    // subject
    if (!title) {
      title =
        panel.textBoxHeaderTarget.attr('value') || ucMsgs.TAB_TARGET_NOT_ENTERED
    }
    panel.set('title', escapeHTML(title))
    enableButtons(panel)
  }
  /*
   * Function makeShareScreenCall
   */ var makeShareScreenCall = function makeShareScreenCall(panel) {
    if (!cookiePreference.shareScreenEnabled) {
      return
    }
    var session = getSessionFromPanel(panel.panelType, panel.panelKey)
    var target = null
    if (panel.panelType === 'CHAT') {
      var buddy = null
      try {
        buddy = JSON.parse(panel.panelKey)
      } catch (e) {
        logger.log('error', 'failed to parse panel.panelKey==' + panel.panelKey)
        return
      }
      target = buddy && buddy.user_id
      if (!target) {
        logger.log(
          'error',
          'empty user_id of panel.panelKey==' + panel.panelKey,
        )
        return
      }
      if (
        outgoingCallPanelTable[target] &&
        outgoingCallPanelTable[target].timestamp > +new Date() - 10000
      ) {
        logger.log('warn', 'already dialing')
        return
      }
      if (session) {
        if (!session.withVideo) {
          // add video session to existing audio call
          phone.setWithVideo(
            session.sessionId,
            true,
            getScreenVideoOptions(),
            editExInfo(session.exInfo, 'put', 'sharescreen', 'true'),
          )
          enableButtons(panel)
          return
        } else {
          logger.log('warn', 'already calling')
          return
        }
      }
    } else if (panel.panelType === 'CONFERENCE') {
      target = chatClient.PREFIX_CONFERENCE_EXTENSION + panel.panelKey
      if (
        outgoingCallPanelTable[target] &&
        outgoingCallPanelTable[target].timestamp > +new Date() - 10000
      ) {
        logger.log('warn', 'already dialing')
        return
      }
      if (session) {
        if (!session.withVideo) {
          // add video session to existing audio call
          phone.setWithVideo(
            session.sessionId,
            true,
            getScreenVideoOptions(),
            editExInfo(session.exInfo, 'put', 'sharescreen', 'true'),
          )
          enableButtons(panel)
          return
        } else {
          logger.log('warn', 'already calling')
          return
        }
      }
    } else {
      logger.log('error', 'unknown panel.panelType==' + panel.panelType)
      return
    } // memorize
    outgoingCallPanelTable[target] = {
      panelType: panel.panelType,
      panelKey: panel.panelKey,
      timestamp: +new Date(),
    } // make call
    phone.makeCall(
      target,
      getDefaultOptions(false, false),
      true,
      getScreenVideoOptions(),
      editExInfo(phone.defaultOptions.exInfo, 'put', 'sharescreen', 'true'),
    )
  }
  /*
   * Function makeShareScreenCallChrome
   */ var makeShareScreenCallChrome = function makeShareScreenCallChrome(
    panel,
  ) {
    if (!cookiePreference.shareScreenEnabled) {
      return
    }
    if (getBrowser() !== 'Chrome') {
      logger.log('error', 'unsupported browser')
      windowAlert(
        ucMsgs.CMN_ALERT,
        ucMsgs.MSG_MAKE_CALL_FAILED +
          '<br />' +
          ucMsgs.MSG_MAKE_CALL_UNSUPPORTED +
          '<br />',
      )
      return
    }
    var session = getSessionFromPanel(panel.panelType, panel.panelKey)
    var target = null
    if (panel.panelType === 'CHAT') {
      var buddy = null
      try {
        buddy = JSON.parse(panel.panelKey)
      } catch (e) {
        logger.log('error', 'failed to parse panel.panelKey==' + panel.panelKey)
        return
      }
      target = buddy && buddy.user_id
      if (!target) {
        logger.log(
          'error',
          'empty user_id of panel.panelKey==' + panel.panelKey,
        )
        return
      }
      if (
        outgoingCallPanelTable[target] &&
        outgoingCallPanelTable[target].timestamp > +new Date() - 10000
      ) {
        logger.log('warn', 'already dialing')
        return
      }
      if (session) {
        if (!session.withVideo) {
          // memorize
          outgoingPreScreenSharingPanelTable[target] = {
            panelType: panel.panelType,
            panelKey: panel.panelKey,
          } // add pre-screen-sharing video session to existing audio call
          phone.setWithVideo(
            session.sessionId,
            true,
            getNormalVideoOptions(),
            editExInfo(session.exInfo, 'put', 'sharescreen', 'true'),
          )
          enableButtons(panel)
          return
        } else {
          logger.log('warn', 'already calling')
          return
        }
      }
    } else if (panel.panelType === 'CONFERENCE') {
      logger.log('error', 'unsupported browser')
      windowAlert(
        ucMsgs.CMN_ALERT,
        ucMsgs.MSG_MAKE_CALL_FAILED +
          '<br />' +
          ucMsgs.MSG_MAKE_CALL_UNSUPPORTED +
          '<br />',
      )
      return
    } else {
      logger.log('error', 'unknown panel.panelType==' + panel.panelType)
      return
    } // memorize
    outgoingCallPanelTable[target] = {
      panelType: panel.panelType,
      panelKey: panel.panelKey,
      timestamp: +new Date(),
    }
    outgoingPreScreenSharingPanelTable[target] = {
      panelType: panel.panelType,
      panelKey: panel.panelKey,
    } // make pre-screen-sharing call
    phone.makeCall(
      target,
      getDefaultOptions(false, false),
      true,
      getNormalVideoOptions(),
      editExInfo(phone.defaultOptions.exInfo, 'put', 'sharescreen', 'true'),
    )
  }
  /*
   * Function createShareScreenSession
   */ var createShareScreenSession = function createShareScreenSession(
    panel,
    session,
    preScreenSharingVideoClientSession,
  ) {
    if (!cookiePreference.shareScreenEnabled) {
      logger.log('error', '!cookiePreference.shareScreenEnabled')
      return
    }
    if (getBrowser() !== 'Chrome') {
      logger.log('error', 'unsupported browser')
      return
    }
    var user_id = preScreenSharingVideoClientSession.user // terminate pre-screen-sharing video session
    delete outgoingPreScreenSharingPanelTable[
      session.rtcSession.remote_identity.uri.user
    ]
    preScreenSharingVideoClientSession.rtcSession.terminate() // get screen media
    try {
      chrome.runtime.sendMessage(
        cookiePreference.shareScreenExtensionId,
        { sources: 'screen,window' },
        function (response) {
          if (response && response.mediaid) {
            // add screen-sharing video session
            phone.makeAdditionalVideoCall(
              session.sessionId,
              getScreenVideoOptionsChrome(response.mediaid),
              [user_id],
            )
          } else {
            logger.log('warn', response)
            logger.log('warn', response && response.mediaid)
            windowAlert(
              ucMsgs.CMN_ALERT,
              ucMsgs.MSG_MAKE_CALL_FAILED +
                '<br />Invalid response from chrome.runtime.sendMessage<br />',
            )
            session.rtcSession.terminate()
          }
        },
      )
    } catch (e) {
      logger.log('error', e.message)
      windowAlert(
        ucMsgs.CMN_ALERT,
        ucMsgs.MSG_MAKE_CALL_FAILED +
          '<br />chrome.runtime.sendMessage error<br />',
      )
      session.rtcSession.terminate()
    }
  }
  /*
   * Function makeCall
   */ var makeCall = function makeCall(panel, video) {
    var session = getSessionFromPanel(panel.panelType, panel.panelKey)
    var target = null
    var videoOptions = null
    var exInfoTable = {}
    var profile = chatClient.getProfile()
    if (panel.panelType === 'CHAT') {
      var buddy = null
      try {
        buddy = JSON.parse(panel.panelKey)
      } catch (e) {
        logger.log('error', 'failed to parse panel.panelKey==' + panel.panelKey)
        return
      }
      target = buddy && buddy.user_id
      if (!target) {
        logger.log(
          'error',
          'empty user_id of panel.panelKey==' + panel.panelKey,
        )
        return
      }
      if (
        outgoingCallPanelTable[target] &&
        outgoingCallPanelTable[target].timestamp > +new Date() - 10000
      ) {
        logger.log('warn', 'already dialing')
        return
      }
      if (video) {
        videoOptions = getNormalVideoOptions()
      }
      if (session) {
        if (!session.withVideo) {
          if (video) {
            // add video session to existing audio call
            phone.setWithVideo(session.sessionId, true, videoOptions)
            enableButtons(panel)
            return
          } else {
            logger.log('warn', 'already calling')
            return
          }
        } else {
          logger.log('warn', 'already calling')
          return
        }
      }
    } else if (panel.panelType === 'CONFERENCE') {
      target = chatClient.PREFIX_CONFERENCE_EXTENSION + panel.panelKey
      if (
        outgoingCallPanelTable[target] &&
        outgoingCallPanelTable[target].timestamp > +new Date() - 10000
      ) {
        logger.log('warn', 'already dialing')
        return
      }
      if (video) {
        if (cookiePreference.thumbnailFrameRate) {
          videoOptions = getNormalVideoOptions(
            null,
            cookiePreference.thumbnailFrameRate,
          )
          exInfoTable['economythumbnail'] = 'true'
        } else {
          videoOptions = getNormalVideoOptions()
        }
      }
      if (session) {
        if (!session.withVideo) {
          if (video) {
            // add video session to existing audio call
            phone.setWithVideo(
              session.sessionId,
              true,
              videoOptions,
              editExInfo(session.exInfo, 'putall', exInfoTable),
            )
            enableButtons(panel)
            return
          } else {
            logger.log('warn', 'already calling')
            return
          }
        } else {
          logger.log('warn', 'already calling')
          return
        }
      }
    } else if (panel.panelType === 'BROADCAST') {
      if (session) {
        logger.log('warn', 'already calling')
        return
      }
      if (!broadcastUsersTable[panel.panelKey]) {
        logger.log('error', 'empty broadcastUsersTable[' + panel.panelKey + ']')
        return
      } // TODO: yano broadcast call
      return
    } else if (panel.panelType === 'EXTERNALCALL') {
      if (session) {
        logger.log('warn', 'already calling')
        return
      }
      target = panel.textBoxHeaderTarget.attr('value')
      if (
        outgoingCallPanelTable[target] &&
        outgoingCallPanelTable[target].timestamp > +new Date() - 10000
      ) {
        logger.log('warn', 'already dialing')
        return
      }
      if (video) {
        videoOptions = getNormalVideoOptions()
      }
    } else {
      logger.log('error', 'unknown panel.panelType==' + panel.panelType)
      return
    }
    if (getCallControlMode() === 1) {
      // make call by 3pcc
      // TODO: yano delete test
      var xhr = new XMLHttpRequest()
      xhr.open(
        'POST',
        location.protocol +
          '//' +
          location.host +
          '/pbx/3pcc?tenant=' +
          profile.tenant +
          '&from=' +
          profile.user_id +
          '&to=' +
          (target.user_id ||
            target.address ||
            chatClient.PREFIX_CONFERENCE_EXTENSION + target.conf_id) +
          '&type=2',
      )
      xhr.send()
    } else {
      // memorize
      outgoingCallPanelTable[target] = {
        panelType: panel.panelType,
        panelKey: panel.panelKey,
        timestamp: +new Date(),
      } // make call
      phone.makeCall(
        target,
        getDefaultOptions(false, false),
        video,
        videoOptions,
        editExInfo(phone.defaultOptions.exInfo, 'putall', exInfoTable),
      )
    }
  }
  /*
   * Function answerCall
   */ var answerCall = function answerCall(panel, withVideo) {
    var session = getSessionFromPanel(panel.panelType, panel.panelKey)
    if (!session) {
      logger.log('error', 'not found call of panel.panelKey==' + panel.panelKey)
      return
    } // answer call
    if (withVideo) {
      if (session.sessionStatus === 'progress') {
        phone.answer(
          session.sessionId,
          getDefaultOptions(false, true),
          true,
          getNormalVideoOptions(),
        )
        enableButtons(panel)
      } else if (session.sessionStatus === 'connected') {
        phone.setWithVideo(session.sessionId, true, getNormalVideoOptions())
        enableButtons(panel)
      } else {
        logger.log('warn', 'already answered')
        return
      }
    } else {
      if (session.sessionStatus === 'progress') {
        phone.answer(
          session.sessionId,
          getDefaultOptions(false, true),
          false,
          null,
        )
      } else {
        logger.log('warn', 'already answered')
        return
      }
    } // stop ring
    document.getElementById('audioRing').pause() // stop lamp
    if (lampObject) {
      lampObject.alert = null
      lampObject.changeLamp(lampObject)
    } // stop blinking
    dojo.removeClass(panel.controlButton.titleNode, 'brUCBackgroundBlinking')
  }
  /*
   * Function clearCall
   */ var clearCall = function clearCall(panel) {
    if (panel.panelType === 'BROADCAST') {
      // TODO: yano broadcast
      //if (!broadcastCallsTable[panel.panelKey]) {
      //    return;
      //}
      //for (var i = broadcastCallsTable[panel.panelKey].calls.length - 1; i >= 0; i--) {
      //    // clear call
      //    chatClient.clearCall(broadcastCallsTable[panel.panelKey].calls[i]);
      //}
    } else {
      var session = getSessionFromPanel(panel.panelType, panel.panelKey)
      if (!session || !session.rtcSession) {
        return
      } // clear call
      session.rtcSession.terminate()
    }
  }
  /*
   * Function muteMicrophone
   */ var muteMicrophone = function muteMicrophone(panel) {
    if (panel.panelType === 'BROADCAST') {
      // TODO: yano broadcast
      //if (!broadcastCallsTable[panel.panelKey] || !broadcastCallsTable[panel.panelKey].calls[0]) {
      //    return;
      //}
      //
      //var muted = !chatClient.getCallInfo(broadcastCallsTable[panel.panelKey].calls[0]).microphoneMuted;
      //cookiePreference.mutesMicrophone = muted ? "true" : "";
      //saveCookiePreference();
      //for (var i = 0; i < broadcastCallsTable[panel.panelKey].calls.length; i++) {
      //    chatClient.muteMicrophone(broadcastCallsTable[panel.panelKey].calls[i], muted);
      //}
      //
      //displayCall(broadcastCallsTable[panel.panelKey].calls[0]);
    } else {
      var session = getSessionFromPanel(panel.panelType, panel.panelKey)
      if (!session || !session.rtcSession) {
        return
      }
      var muted = !session.muted.main
      cookiePreference.mutesMicrophone = muted ? 'true' : ''
      saveCookiePreference()
      phone.setMuted({ main: muted }, session.sessionId)
      displayCall(session.sessionId)
    }
  }
  /*
   * Function muteCamera
   */ var muteCamera = function muteCamera(panel) {
    var profile = chatClient.getProfile()
    if (panel.panelType === 'BROADCAST') {
      // TODO: yano broadcast
      //if (!broadcastCallsTable[panel.panelKey] || !broadcastCallsTable[panel.panelKey].calls[0]) {
      //    return;
      //}
      //
      //var muted = !chatClient.getCallInfo(broadcastCallsTable[panel.panelKey].calls[0]).cameraMuted;
      //cookiePreference.mutesCamera = muted ? "true" : "";
      //saveCookiePreference();
      //for (var i = 0; i < broadcastCallsTable[panel.panelKey].calls.length; i++) {
      //    chatClient.muteCamera(broadcastCallsTable[panel.panelKey].calls[i], muted);
      //}
      //
      //displayCall(broadcastCallsTable[panel.panelKey].calls[0]);
    } else {
      var session = getSessionFromPanel(panel.panelType, panel.panelKey)
      if (!session || !session.rtcSession) {
        return
      }
      var muted = !session.muted.videoClient
      cookiePreference.mutesCamera = muted ? 'true' : ''
      saveCookiePreference()
      phone.setMuted({ videoClient: muted }, session.sessionId)
      if (session.videoClientSessionTable) {
        for (var videoClientSessionId in session.videoClientSessionTable) {
          var videoClientSession =
            session.videoClientSessionTable[videoClientSessionId]
          if (videoClientSession.rtcSession) {
            var viewer =
              videoClientSession.rtcSession &&
              videoClientSession.rtcSession.request &&
              videoClientSession.rtcSession.request.getHeader &&
              videoClientSession.rtcSession.request.getHeader('X-UC-VIEWER')
            if (viewer === profile.user_id) {
              // viewing main video call (always muted)
              videoClientSession.rtcSession.mute({ video: true })
            }
          }
        }
      }
      displayCall(session.sessionId)
    }
  }
  /*
   * Function enumerateDevices
   */ var enumerateDevices = function enumerateDevices(panel, kind) {
    var kinds = kind ? [kind] : ['audioinput', 'videoinput', 'audiooutput']
    var dropDownMenuKeys = {
      audioinput: 'dropDownMenuChangeDevAI',
      videoinput: 'dropDownMenuChangeDevVI',
      audiooutput: 'dropDownMenuChangeDevAO',
    }
    var dropDownButtonKeys = {
      audioinput: 'dropDownButtonChangeDevAI',
      videoinput: 'dropDownButtonChangeDevVI',
      audiooutput: 'dropDownButtonChangeDevAO',
    }
    var cookieKeys = {
      audioinput: 'audioSource',
      videoinput: 'videoSource',
      audiooutput: 'audioTarget',
    }
    require(['dijit/MenuItem'], function (MenuItem) {
      kinds.forEach(function (kind) {
        var dropDownMenu = panel[dropDownMenuKeys[kind]]
        var dropDownButton = panel[dropDownButtonKeys[kind]]
        var currentValue = cookiePreference[cookieKeys[kind]] // remove old items
        var children = dropDownMenu.getChildren()
        for (var i = 0; i < children.length; i++) {
          panel.removeChild(children[i])
          children[i].destroy()
        } // add menu item of "auto"
        var item = new MenuItem({
          label: ucMsgs.LBL_DEVICE_AUTO,
          onClick: selectDevice.bind(
            this,
            panel,
            kind,
            '',
            ucMsgs.LBL_DEVICE_AUTO,
          ),
        })
        dropDownMenu.addChild(item)
        if (dropDownButton && !currentValue) {
          dropDownButton.set('label', item.label)
          dropDownButton.set('title', item.label)
        }
        if (kind === 'videoinput') {
          // add menu item of "sound only"
          item = new MenuItem({
            label: ucMsgs.LBL_DEVICE_SOUND_ONLY,
            onClick: selectDevice.bind(
              this,
              panel,
              kind,
              'sound_only',
              ucMsgs.LBL_DEVICE_SOUND_ONLY,
            ),
          })
          dropDownMenu.addChild(item)
          if (dropDownButton && currentValue === 'sound_only') {
            dropDownButton.set('label', item.label)
            dropDownButton.set('title', item.label)
          }
        }
      }) // get devices
      if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
        navigator.mediaDevices
          .enumerateDevices()
          .then(function (devices) {
            devices.forEach(function (device) {
              if (kinds.indexOf(device.kind) !== -1) {
                var dropDownMenu = panel[dropDownMenuKeys[device.kind]]
                var dropDownButton = panel[dropDownButtonKeys[device.kind]]
                var currentValue = cookiePreference[cookieKeys[device.kind]] // add menu item
                var label =
                  device.label ||
                  device.kind + ' #' + dropDownMenu.getChildren().length
                var item = new MenuItem({
                  label: label,
                  onClick: selectDevice.bind(
                    this,
                    panel,
                    device.kind,
                    device.deviceId,
                    label,
                  ),
                })
                dropDownMenu.addChild(item)
                if (dropDownButton && currentValue === device.deviceId) {
                  dropDownButton.set('label', item.label)
                  dropDownButton.set('title', item.label)
                }
              }
            })
          })
          .catch(function (error) {
            logger.log(
              'warn',
              'enumerateDevices() failed: ' + stringifyError(error),
            )
          })
      } else {
        logger.log('warn', 'enumerateDevices() not supported.')
      }
    })
  }
  /*
   * Function selectDevice
   */ var selectDevice = function selectDevice(panel, kind, deviceId, label) {
    deviceId = string(deviceId)
    if (kind === 'audioinput') {
      if (label) {
        panel.dropDownButtonChangeDevAI.set('label', string(label))
        panel.dropDownButtonChangeDevAI.set('title', string(label))
      }
      if (cookiePreference.audioSource !== deviceId) {
        cookiePreference.audioSource = deviceId
        saveCookiePreference()
      }
      var session = getSessionFromPanel(panel.panelType, panel.panelKey)
      if (session) {
        phone.reconnectMicrophone(
          session.sessionId,
          getDefaultOptions(
            false,
            session.rtcSession && session.rtcSession.direction !== 'outgoing',
          ),
        )
      }
    } else if (kind === 'videoinput') {
      if (label) {
        panel.dropDownButtonChangeDevVI.set('label', string(label))
        panel.dropDownButtonChangeDevVI.set('title', string(label))
      }
      if (cookiePreference.videoSource !== deviceId) {
        cookiePreference.videoSource = deviceId
        saveCookiePreference()
      }
      var session = getSessionFromPanel(panel.panelType, panel.panelKey)
      if (session && session.withVideo) {
        phone.setWithVideo(session.sessionId, false)
        phone.setWithVideo(
          session.sessionId,
          true,
          getNormalVideoOptions(
            null,
            panel.panelType === 'CONFERENCE'
              ? cookiePreference.thumbnailFrameRate
              : null,
          ),
        )
      }
    } else if (kind === 'audiooutput') {
      if (panel.audioRemote.setSinkId) {
        panel.audioRemote
          .setSinkId(deviceId)
          .then(function () {})
          .catch(function (error) {
            logger.log('warn', 'setSinkId() failed: ' + stringifyError(error))
          })
      } else {
        logger.log('warn', 'setSinkId() not supported.')
      }
      if (label) {
        panel.dropDownButtonChangeDevAO.set('label', string(label))
        panel.dropDownButtonChangeDevAO.set('title', string(label))
      }
      if (cookiePreference.audioTarget !== deviceId) {
        cookiePreference.audioTarget = deviceId
        saveCookiePreference()
      }
    }
  }
  /*
   * Function fullscreen
   */ var fullscreen = function fullscreen(panel) {
    // full screen
    var v = panel.videoRemote
    ;(
      v.requestFullscreen ||
      v.webkitRequestFullScreen ||
      v.mozRequestFullScreen ||
      v.msRequestFullscreen ||
      function () {}
    ).call(v)
  }
  /*
   * Function holdCall
   */ var holdCall = function holdCall(panel) {
    var session = getSessionFromPanel(panel.panelType, panel.panelKey)
    if (session && sessionPanelTable[session.sessionId]) {
      if (!sessionPanelTable[session.sessionId].holded) {
        sessionPanelTable[session.sessionId].holded = true
        sessionPanelTable[session.sessionId].transferring = false
        phone.sendDTMF('#9', session.sessionId)
      } else {
        sessionPanelTable[session.sessionId].holded = false
        sessionPanelTable[session.sessionId].transferring = false
        phone.sendDTMF('*', session.sessionId)
      }
      displayCall(session.sessionId)
    }
  }
  /*
   * Function transferCall
   */ var transferCall = function transferCall(panel, target) {
    var session = getSessionFromPanel(panel.panelType, panel.panelKey)
    if (session && sessionPanelTable[session.sessionId]) {
      if (
        sessionPanelTable[session.sessionId].holded &&
        !sessionPanelTable[session.sessionId].transferring &&
        target
      ) {
        sessionPanelTable[session.sessionId].holded = false
        sessionPanelTable[session.sessionId].transferring = true
        phone.sendDTMF(target + '#', session.sessionId)
        displayCall(session.sessionId)
      }
    }
  }
  /*
   * Function conferenceTransfer
   */ var conferenceTransfer = function conferenceTransfer(panel) {
    var session = getSessionFromPanel(panel.panelType, panel.panelKey)
    if (session && sessionPanelTable[session.sessionId]) {
      if (sessionPanelTable[session.sessionId].transferring) {
        sessionPanelTable[session.sessionId].transferring = false
        phone.sendDTMF('#0', session.sessionId)
        displayCall(session.sessionId)
        panel.dropDownButtonShowTransferMenu.closeDropDown(false)
      }
    }
  }
  /*
   * Function enumerateTransferUsers
   */ var enumerateTransferUsers = function enumerateTransferUsers(panel) {
    var configProperties = chatClient.getConfigProperties()
    require(['dijit/MenuItem'], function (MenuItem) {
      // remove old items
      var children = panel.dropDownMenuTransferUser.getChildren()
      for (var i = 0; i < children.length; i++) {
        panel.removeChild(children[i])
        children[i].destroy()
      } // add menu items
      var buddylist = chatClient.getBuddylist()
      for (var i = 0; i < buddylist.user.length; i++) {
        var buddy = buddylist.user[i]
        if (buddy.user_id) {
          var buddyStatus = chatClient.getBuddyStatus(buddy)
          if (
            configProperties.optional_config.dtmf_shortcut & 4 ||
            buddyStatus.status !== Constants.STATUS_OFFLINE
          ) {
            var buddyName = buddy.name || buddy.user_id
            var item = new MenuItem({
              label: buddyName,
              iconClass:
                'brUCMenuItemIcon ' + getStatusIconClass(buddyStatus.status),
              onClick: selectTransferUser.bind(
                this,
                panel,
                buddy.user_id,
                buddyName,
              ),
            })
            panel.dropDownMenuTransferUser.addChild(item)
          }
        }
      }
    })
  }
  /*
   * Function selectTransferUser
   */ var selectTransferUser = function selectTransferUser(
    panel,
    target,
    label,
  ) {
    panel.dropDownButtonTransferUser.set('value', target)
    panel.dropDownButtonTransferUser.set('label', label)
    panel.dropDownButtonTransferUser.set('title', label)
  }
  /*
   * Function showCall
   */ var _showCall = function showCall(sessionId, panel, count) {
    count = int(count)
    if (getSessionFromPanel(panel.panelType, panel.panelKey)) {
      if (count < 100) {
        // wait until closing previous call
        setTimeout(function () {
          _showCall(sessionId, panel, count + 1)
        }, 100)
      } else {
        logger.log('warn', 'previous call not closed')
      }
      return
    }
    var session = phone.getSession(sessionId)
    if (!session) {
      // already terminated
      return
    } // register sessionId panel relation
    sessionPanelTable[sessionId] = {
      panelType: panel.panelType,
      panelKey: panel.panelKey,
      connections: [],
      cameraError: false,
      holded: false,
      transferring: false,
      analyserTimer: setInterval(
        displayMicrophoneLevel.bind(this, sessionId),
        100,
      ),
    }
    showCallInit(sessionId, panel, sessionPanelTable[sessionId].connections)
    if (session.rtcSession && session.rtcSession.direction !== 'outgoing') {
      showCallIncomingMessage(sessionId, panel)
    }
  }
  /*
   * Function showCallBroadcast
   */ var _showCallBroadcast = function showCallBroadcast(
    call_id,
    panel,
    withVideo,
    withAudio,
  ) {
    if (broadcastCallsTable[panel.panelKey]) {
      // wait until closing previous call
      setTimeout(function () {
        _showCallBroadcast(call_id, panel, withVideo, withAudio)
      }, 100)
      return
    }
    var callInfo = chatClient.getCallInfo(call_id)
    if (callInfo.status === Constants.CALL_STATUS_TERMINATED) {
      // already terminated
      return
    } // register call_id panel relation
    broadcastCallsTable[panel.panelKey] = {
      calls: [call_id],
      withVideo: withVideo,
      withAudio: withAudio,
      connections: [],
    }
    showCallInit(
      call_id,
      panel,
      broadcastCallsTable[panel.panelKey].connections,
    )
  }
  /*
   * Function showCallInit
   */ var showCallInit = function showCallInit(sessionId, panel, connections) {
    require(['dojo/dom-geometry', 'dojo/on', 'dojo/aspect'], function (
      domGeometry,
      on,
      aspect,
    ) {
      // register events
      var dialPadButtons = dojo.query(
        '[data-brekeke-uc-tone]',
        panel.dropDownMenuDialPad.domNode,
      )
      for (var i = 0; i < dialPadButtons.length; i++) {
        var tone = dialPadButtons[i].getAttribute('data-brekeke-uc-tone')
        connections.push(
          on(
            dialPadButtons[i],
            'click',
            getFuncApply(panelChatDialPad_click, { panel: panel, tone: tone }),
          ),
        )
      }
      connections.push(
        on(
          panel.buttonMovePanelChatCall,
          'click',
          getFuncApply(panelChat_buttonMovePanelChatCallClick, panel),
        ),
      )
      connections.push(
        aspect.after(
          panel.panelChatCall._splitterWidget,
          '_startDrag',
          getFuncApply(panelChat_panelChatCallSplitterWidgetStartDrag, panel),
        ),
      ) // enable buttons
      enableButtons(panel) // move panel chat call
      if (cookiePreference.headerDisplayOnCall === 'none') {
        panel.panelChatHeader.domNode.style.display = 'none'
        dojo.removeClass(panel.buttonMovePanelChatCall, 'brUCIconMoveUp')
        dojo.addClass(panel.buttonMovePanelChatCall, 'brUCIconMoveDown')
      } else {
        panel.panelChatHeader.domNode.style.display = 'block'
        dojo.removeClass(panel.buttonMovePanelChatCall, 'brUCIconMoveDown')
        dojo.addClass(panel.buttonMovePanelChatCall, 'brUCIconMoveUp')
      } // initial video size
      var resizeTryCount = 0
      var _resizeFunc = function resizeFunc() {
        if (!phone.getSession(sessionId)) {
          // terminated
          return
        }
        var panelHeight = domGeometry.position(panel.domNode).h
        if (panelHeight > 0) {
          var remainHeight = panelHeight
          remainHeight -= domGeometry.position(panel.panelChatHeader.domNode).h
          remainHeight -= domGeometry.position(
            panel.panelChatShowMessages.domNode,
          ).h
          remainHeight -= domGeometry.position(panel.panelChatFooter.domNode).h
          remainHeight -= domGeometry.position(
            panel.panelChatWarningFooter.domNode,
          ).h
          remainHeight -= 80
          if (remainHeight < MIN_MAIN_VIDEO_HEIGHT) {
            remainHeight = MIN_MAIN_VIDEO_HEIGHT
          }
          var mainVideoHeight = int(cookiePreference.mainVideoHeight)
          if (mainVideoHeight <= 0) {
            mainVideoHeight = int(
              panelHeight * DEFAULT_MAIN_VIDEO_HEIGHT_FACTOR,
            )
          }
          if (mainVideoHeight > remainHeight) {
            mainVideoHeight = remainHeight
          }
          resizeVideoRemote(panel, mainVideoHeight, false)
        } else {
          if (resizeTryCount === 0) {
            resizeVideoRemote(panel, MIN_MAIN_VIDEO_HEIGHT, false)
          }
          if (resizeTryCount < 600) {
            resizeTryCount++
            setTimeout(_resizeFunc, 100)
          }
        }
      }
      _resizeFunc() // devices
      enumerateDevices(panel, null)
      selectDevice(panel, 'audiooutput', cookiePreference.audioTarget, null) // text
      panel.textBoxTransferTarget.attr('value', '')
      panel.dropDownButtonTransferUser.attr('value', '')
      panel.dropDownButtonTransferUser.attr('label', '')
      panel.dropDownButtonTransferUser.attr('title', '')
      panel.areaDialPadLog.innerHTML = '' // display call
      displayCall(sessionId) // animation
      showCallAnimation(panel)
    })
  }
  /*
   * Function showCallAnimation
   */ var showCallAnimation = function showCallAnimation(panel) {
    require(['dojo/dom-geometry', 'dojo/_base/fx'], function (domGeometry, fx) {
      panel.panelChatCall.domNode.style.display = 'block'
      var panelChatHeaderHeight = domGeometry.position(
        panel.panelChatHeader.domNode,
      ).h
      var panelChatCallHeight = domGeometry.position(
        panel.panelChatCall.domNode,
      ).h
      var panelChatListHeight = domGeometry.position(
        panel.panelChatList.domNode,
      ).h
      if (panel.panelType === 'EXTERNALCALL') {
        fx.animateProperty({
          node: panel.panelChatHeader.domNode,
          duration: brFrame.durationAnime,
          properties: { top: { start: 0, end: -panelChatHeaderHeight } },
        }).play()
        fx.animateProperty({
          node: panel.panelChatCall.domNode,
          duration: brFrame.durationAnime,
          properties: { top: { start: -panelChatCallHeight, end: 0 } },
        }).play()
        fx.animateProperty({
          node: panel.panelChatList.domNode,
          duration: brFrame.durationAnime,
          properties: {
            top: { start: panelChatHeaderHeight, end: panelChatCallHeight },
            height: {
              start: panelChatListHeight,
              end:
                panelChatListHeight +
                panelChatHeaderHeight -
                panelChatCallHeight,
            },
          },
          onEnd: function onEnd() {
            panel.panelChatHeader.domNode.style.display = 'none'
            panel.resize()
          },
        }).play()
      } else {
        fx.animateProperty({
          node: panel.panelChatCall.domNode,
          duration: brFrame.durationAnime,
          properties: {
            top: {
              start: panelChatHeaderHeight - panelChatCallHeight,
              end: panelChatHeaderHeight,
            },
          },
        }).play()
        fx.animateProperty({
          node: panel.panelChatList.domNode,
          duration: brFrame.durationAnime,
          properties: {
            top: {
              start: panelChatHeaderHeight,
              end: panelChatHeaderHeight + panelChatCallHeight,
            },
            height: {
              start: panelChatListHeight,
              end: panelChatListHeight - panelChatCallHeight,
            },
          },
          onEnd: function onEnd() {
            panel.resize()
          },
        }).play()
      }
    })
  }
  /*
   * Function showCallIncomingMessage
   */ var showCallIncomingMessage = function showCallIncomingMessage(
    sessionId,
    panel,
  ) {
    var session = phone.getSession(sessionId)
    if (
      !session ||
      !session.rtcSession ||
      session.rtcSession.direction === 'outgoing' ||
      session.sessionStatus === 'connected'
    ) {
      return
    }
    var remoteUserOptions =
      session.remoteUserOptionsTable &&
      session.remoteUserOptionsTable[
        session.rtcSession && session.rtcSession.remote_identity.uri.user
      ]
    var target = {}
    if (panel.panelType === 'CHAT') {
      try {
        target = JSON.parse(panel.panelKey)
      } catch (e) {
        logger.log('error', 'failed to parse panel.panelKey==' + panel.panelKey)
      }
    } else if (panel.panelType === 'EXTERNALCALL') {
      target.address = session.rtcSession.remote_identity.uri.user
    } // ring
    document.getElementById('audioRing').play() // lamp
    if (lampObject) {
      lampObject.alert = {
        panelKey: panel.panelKey,
        reason: 'call',
        buddy: target,
      }
      lampObject.changeLamp(lampObject)
    } // start blinking
    dojo.addClass(panel.controlButton.titleNode, 'brUCBackgroundBlinking') // highlight
    var title = ''
    if (target.user_id) {
      title = chatClient.getBuddyUser(target).name || target.user_id
    } else if (target.address) {
      title = target.address
    }
    var message =
      remoteUserOptions &&
      editExInfo(remoteUserOptions.exInfo, 'get', 'sharescreen') === 'true'
        ? ucMsgs.LBL_INCOMING_SCREEN_HIGHLIGHT
        : ucMsgs.LBL_INCOMING_CALL_HIGHLIGHT
    if (!document.hasFocus()) {
      startHighlight(title + ': ' + message)
    } // notification
    if (!document.hasFocus()) {
      startNotification(
        title,
        message,
        chatClient.getBuddyUser(target).profile_image_url,
        function () {
          if (panel && panel.getParent) {
            panel.getParent().selectChild(panel)
          }
        },
        null,
      )
    }
  }
  /*
   * Function hideCall
   */ var hideCall = function hideCall(panel, session) {
    require([
      'dojo/dom-construct',
      'dojo/dom-geometry',
      'dojo/_base/fx',
    ], function (domConstruct, domGeometry, fx) {
      var sessionId = null
      if (session) {
        sessionId = session.sessionId
      } // exit full screen
      ;(
        document.exitFullscreen ||
        document.webkitExitFullscreen ||
        document.mozCancelFullScreen ||
        document.msExitFullscreen ||
        function () {}
      ).call(document) // stop video
      var existings = dojo.query(
        '[data-brekeke-uc-stream-user-id]',
        panel.panelChatCall.domNode,
      )
      for (var i = 0; i < existings.length; i++) {
        var video = dojo.query('video', existings[i])[0]
        stopPlayer(video)
        domConstruct.destroy(existings[i])
      }
      stopPlayer(panel.audioRemote)
      stopPlayer(panel.videoRemote)
      stopPlayer(panel.videoLocal) // stop ring
      document.getElementById('audioRing').pause()
      document.getElementById('audioRingback').pause() // stop lamp
      if (lampObject) {
        lampObject.alert = null
        lampObject.changeLamp(lampObject)
      } // stop blinking
      dojo.removeClass(panel.controlButton.titleNode, 'brUCBackgroundBlinking') // stop highlight
      stopHighlight() // stop notification
      stopNotification() // ring
      document.getElementById('audioTerminated').play() // close dropdown menu
      panel.dropDownButtonChangeDevAI.closeDropDown(false)
      panel.dropDownButtonChangeDevVI.closeDropDown(false)
      panel.dropDownButtonChangeDevAO.closeDropDown(false)
      panel.dropDownButtonShowMicrophoneMenu.closeDropDown(false)
      panel.dropDownButtonShowCameraMenu.closeDropDown(false)
      panel.dropDownButtonShowTransferMenu.closeDropDown(false)
      panel.dropDownButtonShowDialPad.closeDropDown(false) // unregister events
      if (panel.panelType === 'BROADCAST') {
        // TODO: yano broadcast
        //for (var i = 0; i < broadcastCallsTable[panel.panelKey].connections.length; i++) {
        //    broadcastCallsTable[panel.panelKey].connections[i].remove();
        //}
      } else if (sessionId) {
        for (
          var i = 0;
          i < sessionPanelTable[sessionId].connections.length;
          i++
        ) {
          sessionPanelTable[sessionId].connections[i].remove()
        }
        clearInterval(sessionPanelTable[sessionId].analyserTimer)
      } // hide splitter
      panel.panelChatCall._splitterWidget.domNode.style.visibility = 'hidden' // show terminated message
      panel.trChatCallTerminatedMessage.style.display = 'table-row'
      panel.trChatCallIncomingButtons.style.display = 'none'
      panel.trChatCallTalkingButtons.style.display = 'none'
      setTimeout(function () {
        // animation
        var panelChatHeaderHeight = domGeometry.position(
          panel.panelChatHeader.domNode,
        ).h
        var panelChatCallHeight = domGeometry.position(
          panel.panelChatCall.domNode,
        ).h
        var panelChatListHeight = domGeometry.position(
          panel.panelChatList.domNode,
        ).h
        fx.animateProperty({
          node: panel.panelChatCall.domNode,
          duration: brFrame.durationAnime,
          properties: {
            top: {
              start: panelChatHeaderHeight,
              end: panelChatHeaderHeight - panelChatCallHeight,
            },
          },
        }).play()
        fx.animateProperty({
          node: panel.panelChatList.domNode,
          duration: brFrame.durationAnime,
          properties: {
            top: {
              start: panelChatHeaderHeight + panelChatCallHeight,
              end: panelChatHeaderHeight,
            },
            height: {
              start: panelChatListHeight,
              end: panelChatListHeight + panelChatCallHeight,
            },
          },
          onEnd: function onEnd() {
            dojo.removeClass(panel.buttonMovePanelChatCall, 'brUCIconMoveDown')
            dojo.addClass(panel.buttonMovePanelChatCall, 'brUCIconMoveUp')
            panel.panelChatCall.domNode.style.display = 'none'
            panel.panelChatHeader.domNode.style.display = 'block'
            panel.resize() // unregister sessionId panel relation
            if (panel.panelType === 'BROADCAST') {
              // TODO: yano broadcast
              //delete broadcastCallsTable[panel.panelKey];
            } else if (sessionId) {
              delete sessionPanelTable[sessionId]
            } // enable buttons
            enableButtons(panel)
          },
        }).play()
      }, 1000)
    })
  }
  /*
   * Function getPanelFromSession
   */ var getPanelFromSession = function getPanelFromSession(sessionId) {
    if (sessionPanelTable[sessionId]) {
      if (sessionPanelTable[sessionId].panelType === 'CHAT') {
        return panelsChat[sessionPanelTable[sessionId].panelKey]
      } else if (sessionPanelTable[sessionId].panelType === 'CONFERENCE') {
        return panelsConference[sessionPanelTable[sessionId].panelKey]
      } else if (sessionPanelTable[sessionId].panelType === 'EXTERNALCALL') {
        return panelsExternalCall[sessionPanelTable[sessionId].panelKey]
      } else {
        return null
      }
    } else {
      // TODO: yano broadcast
      return null
    }
  }
  /*
   * Function getSessionFromPanel
   */ var getSessionFromPanel = function getSessionFromPanel(
    panelType,
    panelKey,
  ) {
    for (var sessionId in sessionPanelTable) {
      if (
        sessionPanelTable[sessionId].panelType === panelType &&
        sessionPanelTable[sessionId].panelKey === panelKey
      ) {
        return phone.getSession(sessionId) || {}
      }
    }
    return null
  }
  /*
   * Function movePanelChatCall
   */ var movePanelChatCall = function movePanelChatCall(panel) {
    require(['dojo/dom-geometry', 'dojo/_base/fx'], function (domGeometry, fx) {
      if (panel.panelChatHeader.domNode.style.display === 'none') {
        cookiePreference.headerDisplayOnCall = ''
        saveCookiePreference() // animation
        panel.panelChatHeader.domNode.style.display = 'block'
        var panelChatHeaderHeight = domGeometry.position(
          panel.panelChatHeader.domNode,
        ).h
        var panelChatCallHeight = domGeometry.position(
          panel.panelChatCall.domNode,
        ).h
        var panelChatListHeight = domGeometry.position(
          panel.panelChatList.domNode,
        ).h
        fx.animateProperty({
          node: panel.panelChatHeader.domNode,
          duration: brFrame.durationAnime,
          properties: { top: { start: -panelChatHeaderHeight, end: 0 } },
        }).play()
        fx.animateProperty({
          node: panel.panelChatCall.domNode,
          duration: brFrame.durationAnime,
          properties: { top: { start: 0, end: panelChatHeaderHeight } },
        }).play()
        fx.animateProperty({
          node: panel.panelChatList.domNode,
          duration: brFrame.durationAnime,
          properties: {
            top: {
              start: panelChatCallHeight,
              end: panelChatHeaderHeight + panelChatCallHeight,
            },
            height: {
              start: panelChatListHeight,
              end: panelChatListHeight - panelChatHeaderHeight,
            },
          },
          onEnd: function onEnd() {
            dojo.removeClass(panel.buttonMovePanelChatCall, 'brUCIconMoveDown')
            dojo.addClass(panel.buttonMovePanelChatCall, 'brUCIconMoveUp')
            panel.resize()
          },
        }).play()
      } else {
        cookiePreference.headerDisplayOnCall = 'none'
        saveCookiePreference() // animation
        var panelChatHeaderHeight = domGeometry.position(
          panel.panelChatHeader.domNode,
        ).h
        var panelChatCallHeight = domGeometry.position(
          panel.panelChatCall.domNode,
        ).h
        var panelChatListHeight = domGeometry.position(
          panel.panelChatList.domNode,
        ).h
        fx.animateProperty({
          node: panel.panelChatHeader.domNode,
          duration: brFrame.durationAnime,
          properties: { top: { start: 0, end: -panelChatHeaderHeight } },
        }).play()
        fx.animateProperty({
          node: panel.panelChatCall.domNode,
          duration: brFrame.durationAnime,
          properties: { top: { start: panelChatHeaderHeight, end: 0 } },
        }).play()
        fx.animateProperty({
          node: panel.panelChatList.domNode,
          duration: brFrame.durationAnime,
          properties: {
            top: {
              start: panelChatHeaderHeight + panelChatCallHeight,
              end: panelChatCallHeight,
            },
            height: {
              start: panelChatListHeight,
              end: panelChatListHeight + panelChatHeaderHeight,
            },
          },
          onEnd: function onEnd() {
            panel.panelChatHeader.domNode.style.display = 'none'
            dojo.removeClass(panel.buttonMovePanelChatCall, 'brUCIconMoveUp')
            dojo.addClass(panel.buttonMovePanelChatCall, 'brUCIconMoveDown')
            panel.resize()
          },
        }).play()
      }
    })
  }
  /*
   * Function resizePanelChatCall
   */ var resizePanelChatCall = function resizePanelChatCall(
    panel,
    diffHeight,
  ) {
    require(['dojo/dom-geometry'], function (domGeometry) {
      var oldVideoHeight = domGeometry.position(panel.videoRemote).h
      var newVideoHeight = oldVideoHeight + diffHeight
      resizeVideoRemote(panel, newVideoHeight, true)
      panel.panelChatCall.domNode.style.height = 'auto'
      panel.resize()
    })
  }
  /*
   * Function resizeVideoRemote
   */ var resizeVideoRemote = function resizeVideoRemote(
    panel,
    videoHeight,
    saves,
  ) {
    require(['dojo/dom-geometry'], function (domGeometry) {
      var ratio = DEFAULT_VIDEO_RATIO
      var mainVideoWidth = int(cookiePreference.mainVideoWidth)
      var mainVideoHeight = int(cookiePreference.mainVideoHeight)
      if (mainVideoWidth > 0 && mainVideoHeight > 0) {
        ratio = mainVideoWidth / mainVideoHeight
      }
      var panelChatCallWidth =
        domGeometry.position(panel.panelChatCall.domNode).w ||
        domGeometry.position(panel.domNode).w
      var h = videoHeight
      var w = int(h * ratio)
      if (w > panelChatCallWidth - 100) {
        w = panelChatCallWidth - 100
        h = int(w / ratio)
      }
      if (h < MIN_MAIN_VIDEO_HEIGHT) {
        h = MIN_MAIN_VIDEO_HEIGHT
        w = int(h * ratio)
      }
      panel.videoRemote.style.width = w + 'px'
      panel.videoRemote.style.height = h + 'px'
      if (saves) {
        cookiePreference.mainVideoWidth = w
        cookiePreference.mainVideoHeight = h
        saveCookiePreference()
      }
    })
  }
  /*
   * Function displayCall
   */ var displayCall = function displayCall(sessionId) {
    var profile = chatClient.getProfile()
    var configProperties = chatClient.getConfigProperties()
    var session = phone.getSession(sessionId) || {}
    var panel = getPanelFromSession(sessionId)
    if (!panel) {
      // before call panel has been shown
      return
    }
    var remoteUserOptions =
      session.remoteUserOptionsTable &&
      session.remoteUserOptionsTable[
        session.rtcSession && session.rtcSession.remote_identity.uri.user
      ] // tr visible / invisible
    panel.trChatCallIncomingMessage.style.display =
      session.rtcSession &&
      session.rtcSession.direction !== 'outgoing' &&
      (session.sessionStatus === 'dialing' ||
        session.sessionStatus === 'progress')
        ? 'table-row'
        : 'none'
    panel.trChatCallTerminatedMessage.style.display =
      session.sessionStatus === 'dialing' ||
      session.sessionStatus === 'progress' ||
      session.sessionStatus === 'connected'
        ? 'none'
        : 'table-row'
    panel.trChatCallIncomingButtons.style.display =
      session.rtcSession &&
      ((session.rtcSession.direction !== 'outgoing' &&
        (session.sessionStatus === 'dialing' ||
          session.sessionStatus === 'progress')) ||
        (!session.withVideo && session.remoteWithVideo))
        ? 'table-row'
        : 'none'
    panel.trChatCallTalkingButtons.style.display =
      session.sessionStatus === 'connected' ||
      (session.rtcSession &&
        session.rtcSession.direction === 'outgoing' &&
        (session.sessionStatus === 'dialing' ||
          session.sessionStatus === 'progress'))
        ? 'table-row'
        : 'none'
    panel.trChatCallVideo.style.display = session.withVideo
      ? 'table-row'
      : 'none'
    panel.trChatCallThumbnail.style.display =
      session.withVideo &&
      panel.panelType === 'CONFERENCE' &&
      cookiePreference.thumbnailPosition === 'bottom'
        ? 'table-row'
        : 'none'
    panel.trChatCallAudience.style.display =
      panel.panelType === 'BROADCAST' ||
      (session.rtcSession &&
        session.rtcSession.direction === 'outgoing' &&
        (session.sessionStatus === 'dialing' ||
          session.sessionStatus === 'progress'))
        ? 'table-row'
        : 'none' // visibilities
    panel.panelChatCall._splitterWidget.domNode.style.visibility =
      session.withVideo ? 'visible' : 'hidden'
    panel.videoLocal.style.visibility =
      panel.panelType === 'BROADCAST' ? 'hidden' : 'visible' // TODO: yano broadcast incoming
    // text
    panel.tdChatCallIncomingMessage.innerHTML =
      remoteUserOptions &&
      editExInfo(remoteUserOptions.exInfo, 'get', 'sharescreen') === 'true'
        ? ucMsgs.LBL_INCOMING_SCREEN
        : ucMsgs.LBL_INCOMING_CALL // size
    var thumbnailVideoWidth = int(cookiePreference.thumbnailVideoWidth)
    var thumbnailVideoHeight = int(cookiePreference.thumbnailVideoHeight)
    if (thumbnailVideoWidth > 0 && thumbnailVideoHeight > 0) {
      panel.videoLocal.style.width = thumbnailVideoWidth + 'px'
      panel.videoLocal.style.height = thumbnailVideoHeight + 'px'
    } else {
      panel.videoLocal.style.width =
        int(DEFAULT_THUMBNAIL_VIDEO_HEIGHT * DEFAULT_VIDEO_RATIO) + 'px'
      panel.videoLocal.style.height = DEFAULT_THUMBNAIL_VIDEO_HEIGHT + 'px'
    } // button enable / disable
    panel.buttonAnswerAudio.setDisabled(
      !(
        session.rtcSession &&
        session.rtcSession.direction !== 'outgoing' &&
        (session.sessionStatus === 'dialing' ||
          session.sessionStatus === 'progress')
      ),
    )
    panel.buttonAnswerVideo.setDisabled(
      !(session.rtcSession && !session.withVideo && session.remoteWithVideo),
    )
    panel.buttonDeclineCall.setDisabled(
      !(
        session.rtcSession &&
        session.rtcSession.direction !== 'outgoing' &&
        (session.sessionStatus === 'dialing' ||
          session.sessionStatus === 'progress')
      ),
    )
    panel.buttonMuteMicrophone.setDisabled(!true) // TODO: yano broadcast incoming
    panel.buttonMuteMicrophoneInMenu.setDisabled(!true) // TODO: yano broadcast incoming
    panel.buttonMuteCamera.setDisabled(!true) // TODO: yano broadcast incoming
    panel.buttonMuteCameraInMenu.setDisabled(!true) // TODO: yano broadcast incoming
    panel.dropDownButtonChangeDevVI.setDisabled(
      editExInfo(session.exInfo, 'get', 'sharescreen') === 'true',
    )
    panel.buttonFullscreen.setDisabled(!session.withVideo)
    panel.buttonTransferTarget.setDisabled(
      !(
        sessionPanelTable[sessionId] &&
        !sessionPanelTable[sessionId].transferring
      ),
    )
    panel.buttonTransferUser.setDisabled(
      !(
        sessionPanelTable[sessionId] &&
        !sessionPanelTable[sessionId].transferring
      ),
    )
    panel.buttonCompleteTransfer.setDisabled(
      !(
        sessionPanelTable[sessionId] &&
        sessionPanelTable[sessionId].transferring
      ),
    )
    panel.buttonConferenceTransfer.setDisabled(
      !(
        sessionPanelTable[sessionId] &&
        sessionPanelTable[sessionId].transferring
      ),
    )
    panel.buttonCancelTransfer.setDisabled(
      !(
        sessionPanelTable[sessionId] &&
        sessionPanelTable[sessionId].transferring
      ),
    )
    panel.buttonHoldCall.setDisabled(
      session.sessionStatus === 'dialing' ||
        session.sessionStatus === 'progress',
    )
    panel.dropDownButtonShowDialPad.setDisabled(!true) // TODO: yano broadcast incoming
    // hold
    if (
      configProperties.optional_config &&
      configProperties.optional_config.dtmf_shortcut % 4 >= 1
    ) {
      dojo.addClass(panel.trChatCallTalkingButtons, 'brUCWithHoldButton')
    } else {
      dojo.removeClass(panel.trChatCallTalkingButtons, 'brUCWithHoldButton')
    }
    if (sessionPanelTable[sessionId] && sessionPanelTable[sessionId].holded) {
      dojo.addClass(panel.buttonHoldCall.iconNode, 'brUCCallButtonPushed')
    } else {
      dojo.removeClass(panel.buttonHoldCall.iconNode, 'brUCCallButtonPushed')
    }
    if (
      configProperties.optional_config &&
      configProperties.optional_config.dtmf_shortcut % 4 >= 2 &&
      sessionPanelTable[sessionId] &&
      (sessionPanelTable[sessionId].holded ||
        sessionPanelTable[sessionId].transferring)
    ) {
      dojo.addClass(panel.trChatCallTalkingButtons, 'brUCWithTransferButton')
    } else {
      dojo.removeClass(panel.trChatCallTalkingButtons, 'brUCWithTransferButton')
    }
    if (
      configProperties.optional_config &&
      configProperties.optional_config.dtmf_shortcut % 4 >= 3
    ) {
      dojo.addClass(panel.areaTransferMenu, 'brUCWithConferenceTransferButton')
    } else {
      dojo.removeClass(
        panel.areaTransferMenu,
        'brUCWithConferenceTransferButton',
      )
    } // muted
    if (true) {
      // ver 1.1.6.8
      dojo.addClass(panel.trChatCallTalkingButtons, 'brUCWithDeviceMenu')
    }
    if (session.muted && session.muted.main) {
      dojo.addClass(panel.buttonMuteMicrophone.iconNode, 'brUCCallButtonPushed')
      dojo.addClass(
        panel.dropDownButtonShowMicrophoneMenu.iconNode,
        'brUCCallButtonPushed',
      )
      dojo.addClass(
        panel.buttonMuteMicrophoneInMenu.iconNode,
        'brUCCallButtonPushed',
      )
    } else {
      dojo.removeClass(
        panel.buttonMuteMicrophone.iconNode,
        'brUCCallButtonPushed',
      )
      dojo.removeClass(
        panel.dropDownButtonShowMicrophoneMenu.iconNode,
        'brUCCallButtonPushed',
      )
      dojo.removeClass(
        panel.buttonMuteMicrophoneInMenu.iconNode,
        'brUCCallButtonPushed',
      )
    }
    if (session.muted && session.muted.videoClient) {
      dojo.addClass(panel.buttonMuteCamera.iconNode, 'brUCCallButtonPushed')
      dojo.addClass(
        panel.dropDownButtonShowCameraMenu.iconNode,
        'brUCCallButtonPushed',
      )
      dojo.addClass(
        panel.buttonMuteCameraInMenu.iconNode,
        'brUCCallButtonPushed',
      )
    } else {
      dojo.removeClass(panel.buttonMuteCamera.iconNode, 'brUCCallButtonPushed')
      dojo.removeClass(
        panel.dropDownButtonShowCameraMenu.iconNode,
        'brUCCallButtonPushed',
      )
      dojo.removeClass(
        panel.buttonMuteCameraInMenu.iconNode,
        'brUCCallButtonPushed',
      )
    } // display streams on video, audio
    if (panel.panelType === 'CHAT' || panel.panelType === 'EXTERNALCALL') {
      if (session.remoteStreamObject) {
        document.getElementById('audioRingback').pause()
        startPlayer(panel.audioRemote, session.remoteStreamObject)
      } else if (
        session.rtcSession &&
        session.rtcSession.direction === 'outgoing' &&
        session.sessionStatus === 'progress'
      ) {
        document.getElementById('audioRingback').play()
      } else {
        document.getElementById('audioRingback').pause()
      }
      if (session.videoClientSessionTable) {
        for (var videoClientSessionId in session.videoClientSessionTable) {
          var videoClientSession =
            session.videoClientSessionTable[videoClientSessionId]
          if (videoClientSession.remoteStreamObject) {
            startPlayer(
              panel.videoRemote,
              videoClientSession.remoteStreamObject,
            )
            break
          }
        }
      }
      if (session.localVideoStreamObject) {
        startPlayer(panel.videoLocal, session.localVideoStreamObject)
      } else {
        stopPlayer(panel.videoLocal)
      }
    } else if (panel.panelType === 'CONFERENCE') {
      require(['dojo/dom-construct', 'dojo/on'], function (domConstruct, on) {
        var tdThumbnail, thumbnailClass, placePos, nameDelimiter
        if (cookiePreference.thumbnailPosition === 'bottom') {
          tdThumbnail = panel.tdChatCallThumbnail
          thumbnailClass = 'brUCPanelThumbnailBottom'
          placePos = 'last'
          nameDelimiter = '<br />'
        } else {
          tdThumbnail = panel.tdChatCallLocalVideo
          thumbnailClass = 'brUCPanelThumbnail'
          placePos = 'first'
          nameDelimiter = ''
        } // check video sessions
        if (session.videoClientSessionTable) {
          for (var videoClientSessionId in session.videoClientSessionTable) {
            var videoClientSession =
              session.videoClientSessionTable[videoClientSessionId]
            var buddy = chatClient.getBuddyUser({
              user_id: videoClientSession.user,
            })
            var viewer =
              videoClientSession.rtcSession &&
              videoClientSession.rtcSession.request &&
              videoClientSession.rtcSession.request.getHeader &&
              videoClientSession.rtcSession.request.getHeader('X-UC-VIEWER')
            if (viewer === profile.user_id) {
              // viewing main video call
              if (videoClientSession.remoteStreamObject) {
                // play main video
                startPlayer(
                  panel.videoRemote,
                  videoClientSession.remoteStreamObject,
                )
              }
            } else if (viewer) {
              // outgoing main video call
            } else {
              var video = dojo.query(
                '[data-brekeke-uc-stream-tenant=' +
                  buddy.tenant +
                  '][data-brekeke-uc-stream-user-id=' +
                  buddy.user_id +
                  '] video',
                tdThumbnail,
              )[0]
              if (!video) {
                // create new thumbnail
                var thumbnailDom = domConstruct.toDom(
                  '\n\
                                    <div data-brekeke-uc-stream-tenant="' +
                    buddy.tenant +
                    '" data-brekeke-uc-stream-user-id="' +
                    buddy.user_id +
                    '" class="' +
                    thumbnailClass +
                    '">\n\
                                        <video class="brUCVideoThumbnail" muted></video><span class="brUCAreaThumbnailSoundOnly"></span>' +
                    nameDelimiter +
                    '\n\
                                        <span data-brekeke-uc-tenant="' +
                    buddy.tenant +
                    '" data-brekeke-uc-user-id="' +
                    buddy.user_id +
                    '" class="brUCUserName">' +
                    escapeHTML(buddy.name || buddy.user_id) +
                    '</span>\n\
                                    </div>',
                )
                domConstruct.place(thumbnailDom, tdThumbnail, placePos)
                video = dojo.query(
                  '[data-brekeke-uc-stream-tenant=' +
                    buddy.tenant +
                    '][data-brekeke-uc-stream-user-id=' +
                    buddy.user_id +
                    '] video',
                  tdThumbnail,
                )[0]
                var thumbnailVideoWidth = int(
                  cookiePreference.thumbnailVideoWidth,
                )
                var thumbnailVideoHeight = int(
                  cookiePreference.thumbnailVideoHeight,
                )
                if (thumbnailVideoWidth > 0 && thumbnailVideoHeight > 0) {
                  video.style.width = thumbnailVideoWidth + 'px'
                  video.style.height = thumbnailVideoHeight + 'px'
                } else {
                  video.style.width =
                    int(DEFAULT_THUMBNAIL_VIDEO_HEIGHT * DEFAULT_VIDEO_RATIO) +
                    'px'
                  video.style.height = DEFAULT_THUMBNAIL_VIDEO_HEIGHT + 'px'
                } // register thumbnail click event
                var thisArg = {
                  panelKey: panel.panelKey,
                  tenant: buddy.tenant,
                  user_id: buddy.user_id,
                }
                sessionPanelTable[sessionId].connections.push(
                  on(
                    video,
                    'click',
                    getFuncApply(panelChatThumbnail_click, thisArg),
                  ),
                )
              }
              if (videoClientSession.remoteStreamObject) {
                // play thumbnail video
                startPlayer(video, videoClientSession.remoteStreamObject)
              }
            }
          }
        } // check audio session
        if (session.remoteStreamObject) {
          // play audio
          startPlayer(panel.audioRemote, session.remoteStreamObject)
        } // check existing thumbnails
        var existings = dojo.query(
          '[data-brekeke-uc-stream-tenant][data-brekeke-uc-stream-user-id]',
          panel.panelChatCall.domNode,
        )
        for (var i = 0; i < existings.length; i++) {
          var user_id = existings[i].getAttribute(
            'data-brekeke-uc-stream-user-id',
          )
          var found = false
          if (session.videoClientSessionTable) {
            for (var videoClientSessionId in session.videoClientSessionTable) {
              var videoClientSession =
                session.videoClientSessionTable[videoClientSessionId]
              if (videoClientSession.user === user_id) {
                found = true
                break
              }
            }
          }
          if (!found) {
            // delete old thumbnail
            var video = dojo.query('video', existings[i])[0]
            stopPlayer(video)
            domConstruct.destroy(existings[i])
          }
        } // check local video session
        if (session.localVideoStreamObject) {
          startPlayer(panel.videoLocal, session.localVideoStreamObject)
        } else {
          stopPlayer(panel.videoLocal)
        }
      })
    } else if (panel.panelType === 'BROADCAST') {
      // TODO: yano broadcast
    }
    panel.resize()
  }
  /*
   * Function displayMicrophoneLevel
   */ var displayMicrophoneLevel = function displayMicrophoneLevel(sessionId) {
    var session = phone.getSession(sessionId) || {}
    var panel = getPanelFromSession(sessionId)
    if (!panel) {
      // before call panel has been shown
      return
    }
    var val = 0
    if (session.analyser && !session.muted.main) {
      var dataArray = new Uint8Array(session.analyser.fftSize)
      session.analyser.getByteTimeDomainData(dataArray)
      var sum = 0
      for (var i = 0; i < dataArray.length; i++) {
        sum += Math.abs(dataArray[i] - 128)
      }
      val = Math.round(sum / dataArray.length)
    }
    panel.progressMicrophoneLevel.value = Math.min(100, val * 2)
  }
  /*
   * Function startPlayer
   */ var startPlayer = function startPlayer(player, src) {
    if (_typeof(src) === 'object') {
      player.srcObject = src
    } else {
      player.src = src
    }
    logger.log(
      'debug',
      'HTMLMediaElement.play() starting className=' +
        player.className +
        ', src=' +
        src,
    )
    var promise = player.play()
    promise &&
      promise.then &&
      promise.then(
        function () {
          logger.log(
            'debug',
            'HTMLMediaElement.play() fulfilled className=' +
              player.className +
              ', src=' +
              src,
          )
        },
        function (err) {
          logger.log(
            'debug',
            'HTMLMediaElement.play() rejected className=' +
              player.className +
              ', src=' +
              src +
              ', err=' +
              err,
          )
        },
      )
    for (var i = 0; i < playingPlayers.length; i++) {
      if (player === playingPlayers[i]) {
        return
      }
    }
    playingPlayers.push(player)
  }
  /*
   * Function stopPlayer
   */ var stopPlayer = function stopPlayer(player) {
    player.pause()
    player.removeAttribute('src')
    player.srcObject = null
    player.load()
    for (var i = playingPlayers.length - 1; i >= 0; i--) {
      if (player === playingPlayers[i]) {
        playingPlayers.splice(i, 1)
      }
    }
  }
  /*
   * Function requestMainVideoCall
   */ var requestMainVideoCall = function requestMainVideoCall(
    panel,
    tenant,
    user_id,
  ) {
    var profile = chatClient.getProfile()
    var session = getSessionFromPanel(panel.panelType, panel.panelKey)
    if (!session) {
      logger.log('warn', 'already terminated')
      return
    }
    var exInfo = session.exInfo
    var remoteUserOptions =
      session.remoteUserOptionsTable && session.remoteUserOptionsTable[user_id]
    var economyThumbnail =
      editExInfo(
        remoteUserOptions && remoteUserOptions.exInfo,
        'get',
        'economythumbnail',
      ) === 'true'
    var thumbnailStream = null // clear old main video call
    if (session.videoClientSessionTable) {
      for (var videoClientSessionId in session.videoClientSessionTable) {
        var videoClientSession =
          session.videoClientSessionTable[videoClientSessionId]
        var viewer =
          videoClientSession.rtcSession &&
          videoClientSession.rtcSession.request &&
          videoClientSession.rtcSession.request.getHeader &&
          videoClientSession.rtcSession.request.getHeader('X-UC-VIEWER')
        if (viewer === profile.user_id) {
          videoClientSession.rtcSession.terminate()
        } else if (videoClientSession.user === user_id) {
          thumbnailStream = videoClientSession.remoteStreamObject
        }
      }
    }
    stopPlayer(panel.videoRemote)
    exInfo = editExInfo(exInfo, 'remove', 'requestmainvideo')
    exInfo = editExInfo(exInfo, 'remove', 'ucctime')
    if (economyThumbnail) {
      // request high quality main video call
      exInfo = editExInfo(exInfo, 'put', 'requestmainvideo', user_id)
      exInfo = editExInfo(exInfo, 'put', 'ucctime', +new Date()) // to occur remoteUserOptionsChanged on peer
    } else if (thumbnailStream) {
      // copy thumbnail stream to main video
      startPlayer(panel.videoRemote, thumbnailStream)
    }
    if (exInfo !== session.exInfo) {
      phone.setWithVideo(session.sessionId, null, null, exInfo)
    }
  }
  /*
   * Function makeMainVideoSession
   */ var makeMainVideoSession = function makeMainVideoSession(
    sessionId,
    user_id,
  ) {
    var session = phone.getSession(sessionId)
    if (!session) {
      logger.log('warn', 'already terminated')
      return
    } // check main video session exists
    if (session.videoClientSessionTable) {
      for (var videoClientSessionId in session.videoClientSessionTable) {
        var videoClientSession =
          session.videoClientSessionTable[videoClientSessionId]
        var viewer =
          videoClientSession.rtcSession &&
          videoClientSession.rtcSession.request &&
          videoClientSession.rtcSession.request.getHeader &&
          videoClientSession.rtcSession.request.getHeader('X-UC-VIEWER')
        if (viewer === user_id) {
          return
        }
      }
    } // make main video session
    phone.makeAdditionalVideoCall(
      sessionId,
      editExInfo(session.exInfo, 'get', 'sharescreen') === 'true'
        ? getScreenVideoOptions(user_id)
        : getNormalVideoOptions(user_id),
      [user_id],
    )
  }
  /*
   * displayWebchatQueue
   */ var displayWebchatQueue = function displayWebchatQueue(
    panel,
    updated_conf_id,
  ) {
    require(['dojo/dom-construct', 'dojo/on'], function (domConstruct, on) {
      for (var i = 0; i < webchatQueueList.length; i++) {
        var webchatQueue = webchatQueueList[i]
        var conf_id = webchatQueue.conf_id
        var conference = chatClient.getConference(conf_id)
        var created_time = string(conference.created_time)
        var profinfo = string(conference.webchatinfo.profinfo_formatted)
        var profinfo_2rows = profinfo
          .split('\n')
          .slice(0, WEBCHAT_QUEUE_LINES)
          .join('\n')
        if (
          !dojo.query(
            '[data-brekeke-uc-conf-id=' + conf_id + ']',
            panel.panelWebchatRooms,
          )[0]
        ) {
          // create webchat room html
          var webchatRoomHtml =
            '<div data-brekeke-uc-conf-id="' +
            conf_id +
            '" class="brUCChatWebchatRoom">\n'
          webchatRoomHtml +=
            '<div class="brUCChatWebchatRoomChat" title=""><button class="brUCChatWebchatRoomChatButton brUCSimpleButton" title="' +
            ucMsgs.BTN_CHAT_WEBCHAT_ROOM_TOOLTIP +
            '"><span class="brUCChatWebchatRoomChatIcon"></span><span class="brUCChatWebchatRoomChatText">' +
            ucMsgs.BTN_CHAT_WEBCHAT_ROOM +
            '</span></button><span class="brUCChatWebchatRoomAgent"></span></div>\n'
          webchatRoomHtml +=
            '<div class="brUCChatWebchatRoomJoin" title=""><button class="brUCChatWebchatRoomJoinButton brUCSimpleButton" title="' +
            ucMsgs.BTN_JOIN_WEBCHAT_ROOM_TOOLTIP +
            '"><span class="brUCChatWebchatRoomJoinIcon"></span><span class="brUCChatWebchatRoomJoinText">' +
            ucMsgs.BTN_JOIN_WEBCHAT_ROOM +
            '</span></button><span class="brUCChatWebchatRoomAlreadyClosed">' +
            ucMsgs.LBL_WEBCHAT_ROOM_ALREADY_CLOSED +
            '</span></div>\n'
          webchatRoomHtml +=
            '<div class="brUCChatWebchatRoomReject" title=""><button class="brUCChatWebchatRoomRejectButton brUCSimpleButton" title="' +
            ucMsgs.BTN_REJECT_WEBCHAT_ROOM_TOOLTIP +
            '"><span class="brUCChatWebchatRoomRejectIcon"></span></button></div>\n'
          webchatRoomHtml +=
            '<div class="brUCChatWebchatRoomTime" title="' +
            escapeHTML(created_time) +
            '">' +
            escapeHTML(formatTime(created_time)) +
            '</div>\n'
          webchatRoomHtml +=
            '<div class="brUCChatWebchatRoomPeer" title="' +
            escapeHTML(profinfo) +
            '">' +
            escapeHTML(profinfo_2rows) +
            '</div>\n'
          webchatRoomHtml +=
            '<div class="brUCChatWebchatRoomContent" title=""></div>\n'
          webchatRoomHtml +=
            '<img class="brUCChatWebchatRoomHideButton" src="img/delete.png" alt="' +
            ucMsgs.BTN_HIDE_WEBCHAT_ROOM +
            '" title="' +
            ucMsgs.BTN_HIDE_WEBCHAT_ROOM_TOOLTIP +
            '" />\n'
          webchatRoomHtml += '</div>'
          var webchatRoomDom = domConstruct.toDom(webchatRoomHtml)
          panel.panelWebchatRooms.style.display = 'block'
          domConstruct.place(webchatRoomDom, panel.panelWebchatRooms, 'last') // scroll
          panel.panelChatList.domNode.scrollTop =
            panel.panelChatList.domNode.scrollHeight // register event listeners
          var chatButton = dojo.query(
            '.brUCChatWebchatRoomChatButton',
            webchatRoomDom,
          )[0]
          var joinButton = dojo.query(
            '.brUCChatWebchatRoomJoinButton',
            webchatRoomDom,
          )[0]
          var rejectButton = dojo.query(
            '.brUCChatWebchatRoomRejectButton',
            webchatRoomDom,
          )[0]
          var hideButton = dojo.query(
            '.brUCChatWebchatRoomHideButton',
            webchatRoomDom,
          )[0]
          if (!webchatQueueWorkData[panel.panelKey]) {
            webchatQueueWorkData[panel.panelKey] = {}
          }
          webchatQueueWorkData[panel.panelKey][conf_id] = {
            connections: [
              on(
                chatButton,
                'click',
                getFuncApply(panelWebchatQueueWebchatRoomChat_click, {
                  panelKey: panel.panelKey,
                  conf_id: conf_id,
                }),
              ),
              on(
                joinButton,
                'click',
                getFuncApply(panelWebchatQueueWebchatRoomJoin_click, {
                  panelKey: panel.panelKey,
                  conf_id: conf_id,
                }),
              ),
              on(
                rejectButton,
                'click',
                getFuncApply(panelWebchatQueueWebchatRoomReject_click, {
                  panelKey: panel.panelKey,
                  conf_id: conf_id,
                }),
              ),
              on(
                hideButton,
                'click',
                getFuncApply(panelWebchatQueueWebchatRoomHide_click, {
                  panelKey: panel.panelKey,
                  conf_id: conf_id,
                }),
              ),
            ],
          }
        } else if (conf_id !== updated_conf_id) {
          continue
        }
        webchatQueue.panelKeySet[panel.panelKey] = true // display info
        displayWebchatQueueInfo(conf_id, i) // display message
        displayWebchatQueueMessage(conf_id, i)
      }
    })
  }
  /*
   * displayWebchatQueueInfo
   */ var displayWebchatQueueInfo = function displayWebchatQueueInfo(
    conf_id,
    index,
  ) {
    if (!index && index !== 0) {
      for (var i = 0; i < webchatQueueList.length; i++) {
        if (webchatQueueList[i].conf_id === conf_id) {
          index = i
          break
        }
      }
      if (!index && index !== 0) {
        logger.log('info', 'not found webchat room of conf_id==' + conf_id)
        return
      }
    }
    var webchatQueue = webchatQueueList[index]
    var conference = chatClient.getConference(conf_id)
    var profile = chatClient.getProfile()
    var agent = escapeHTML(
      (conference.assigned.tenant === profile.tenant &&
      conference.assigned.user_id === profile.user_id
        ? profile.name
        : chatClient.getBuddyUser(conference.assigned).name) ||
        conference.assigned.user_id,
    ) // display
    for (var panelKey in webchatQueue.panelKeySet) {
      var agentDom = dojo.query(
        '[data-brekeke-uc-conf-id=' + conf_id + '] .brUCChatWebchatRoomAgent',
        panelsWebchatQueue[panelKey].panelWebchatRooms,
      )[0]
      var chatDom = dojo.query(
        '[data-brekeke-uc-conf-id=' + conf_id + '] .brUCChatWebchatRoomChat',
        panelsWebchatQueue[panelKey].panelWebchatRooms,
      )[0]
      var chatButtonDom = dojo.query(
        '[data-brekeke-uc-conf-id=' +
          conf_id +
          '] .brUCChatWebchatRoomChatButton',
        panelsWebchatQueue[panelKey].panelWebchatRooms,
      )[0]
      var joinButtonDom = dojo.query(
        '[data-brekeke-uc-conf-id=' +
          conf_id +
          '] .brUCChatWebchatRoomJoinButton',
        panelsWebchatQueue[panelKey].panelWebchatRooms,
      )[0]
      var alreadyClosedDom = dojo.query(
        '[data-brekeke-uc-conf-id=' +
          conf_id +
          '] .brUCChatWebchatRoomAlreadyClosed',
        panelsWebchatQueue[panelKey].panelWebchatRooms,
      )[0]
      var hideButtonDom = dojo.query(
        '[data-brekeke-uc-conf-id=' +
          conf_id +
          '] .brUCChatWebchatRoomHideButton',
        panelsWebchatQueue[panelKey].panelWebchatRooms,
      )[0]
      if (conference.conf_status === Constants.CONF_STATUS_INVITED_WEBCHAT) {
        agentDom.innerHTML = ''
        chatDom.title = ''
        chatButtonDom.style.display = ''
        chatButtonDom.disabled = false
        joinButtonDom.style.display = ''
        joinButtonDom.disabled = true
        alreadyClosedDom.style.display = 'none'
        hideButtonDom.style.display = 'none'
      } else if (conference.conf_status === Constants.CONF_STATUS_INVITED) {
        agentDom.innerHTML = agent
        chatDom.title = agent
        chatButtonDom.style.display = 'none'
        chatButtonDom.disabled = true
        joinButtonDom.style.display = ''
        joinButtonDom.disabled = false
        alreadyClosedDom.style.display = 'none'
        hideButtonDom.style.display = 'none'
      } else if (conference.conf_status === Constants.CONF_STATUS_JOINED) {
        agentDom.innerHTML = agent
        chatDom.title = agent
        chatButtonDom.style.display = 'none'
        chatButtonDom.disabled = true
        joinButtonDom.style.display = ''
        joinButtonDom.disabled = true
        alreadyClosedDom.style.display = 'none'
        hideButtonDom.style.display = 'none'
      } else {
        agentDom.innerHTML = agent
        chatDom.title = agent
        chatButtonDom.style.display = 'none'
        chatButtonDom.disabled = true
        joinButtonDom.style.display = ''
        joinButtonDom.disabled = true
        alreadyClosedDom.style.display = 'none'
        hideButtonDom.style.display = 'none'
      }
      if (
        dojo.query(
          '.brUCChatWebchatRoomChatButton:enabled',
          panelsWebchatQueue[panelKey].panelWebchatRooms,
        ).length === 0
      ) {
        // stop blinking
        dojo.removeClass(
          panelsWebchatQueue[panelKey].controlButton.titleNode,
          'brUCBackgroundBlinking',
        )
      }
    }
  }
  /*
   * removeWebchatQueue
   */ var removeWebchatQueue = function removeWebchatQueue(conf_id) {
    var settings = chatClient.getSettings()
    var index = -1
    for (var i = 0; i < webchatQueueList.length; i++) {
      if (webchatQueueList[i].conf_id === conf_id) {
        index = i
        break
      }
    }
    if (index === -1) {
      logger.log('info', 'not found webchat room of conf_id==' + conf_id)
      return false
    }
    var webchatQueue = webchatQueueList[index]
    for (var panelKey in webchatQueue.panelKeySet) {
      if (
        settings.optional_settings &&
        settings.optional_settings.auto_close_request
      ) {
        if (
          webchatQueueWorkData[panelKey] &&
          webchatQueueWorkData[panelKey][conf_id]
        ) {
          for (
            var i = 0;
            i < webchatQueueWorkData[panelKey][conf_id].connections.length;
            i++
          ) {
            webchatQueueWorkData[panelKey][conf_id].connections[i].remove()
          }
        }
      }
      var webchatRoomDom = dojo.query(
        '[data-brekeke-uc-conf-id=' + conf_id + ']',
        panelsWebchatQueue[panelKey].panelWebchatRooms,
      )[0]
      if (webchatRoomDom) {
        var chatButton = dojo.query(
          '.brUCChatWebchatRoomChatButton',
          webchatRoomDom,
        )[0]
        var joinButton = dojo.query(
          '.brUCChatWebchatRoomJoinButton',
          webchatRoomDom,
        )[0]
        var rejectButton = dojo.query(
          '.brUCChatWebchatRoomRejectButton',
          webchatRoomDom,
        )[0]
        var alreadyClosed = dojo.query(
          '.brUCChatWebchatRoomAlreadyClosed',
          webchatRoomDom,
        )[0]
        var hideButton = dojo.query(
          '.brUCChatWebchatRoomHideButton',
          webchatRoomDom,
        )[0]
        var alreadyDisabled = 0
        if (chatButton) {
          if (chatButton.disabled) {
            alreadyDisabled++
          } else {
            chatButton.disabled = true
          }
        }
        if (joinButton) {
          if (joinButton.disabled) {
            alreadyDisabled++
          } else {
            joinButton.disabled = true
          }
        }
        if (rejectButton && !rejectButton.disabled) {
          rejectButton.disabled = true
        }
        if (
          dojo.query(
            '.brUCChatWebchatRoomChatButton:enabled',
            panelsWebchatQueue[panelKey].panelWebchatRooms,
          ).length === 0
        ) {
          // stop blinking
          dojo.removeClass(
            panelsWebchatQueue[panelKey].controlButton.titleNode,
            'brUCBackgroundBlinking',
          )
        }
        if (
          settings.optional_settings &&
          settings.optional_settings.auto_close_request
        ) {
          setTimeout(
            removeWebchatQueueAnimation,
            alreadyDisabled === 2 ? 0 : 2000,
            conf_id,
            panelKey,
          )
        } else {
          if (joinButton) {
            joinButton.style.display = 'none'
          }
          if (alreadyClosed) {
            alreadyClosed.style.display = ''
          }
          if (hideButton) {
            hideButton.style.display = ''
          }
        }
      }
    }
    return webchatQueueList.splice(index, 1)
  }
  /*
   * removeWebchatQueueAnimation
   */ var removeWebchatQueueAnimation = function removeWebchatQueueAnimation(
    conf_id,
    panelKey,
  ) {
    require(['dojo/dom-geometry', 'dojo/_base/fx'], function (domGeometry, fx) {
      if (!panelsWebchatQueue[panelKey]) {
        return
      }
      var webchatRoomDom = dojo.query(
        '[data-brekeke-uc-conf-id=' + conf_id + ']',
        panelsWebchatQueue[panelKey].panelWebchatRooms,
      )[0]
      if (webchatRoomDom) {
        var h = domGeometry.position(webchatRoomDom).h
        fx.animateProperty({
          node: webchatRoomDom,
          duration: brFrame.durationAnime,
          properties: { height: { start: h, end: 0 } },
          onEnd: function onEnd(node) {
            if (!panelsWebchatQueue[panelKey]) {
              return
            }
            panelsWebchatQueue[panelKey].panelWebchatRooms.removeChild(node)
            displayWebchatQueue(panelsWebchatQueue[panelKey], null)
          },
        }).play()
      }
    })
  }
  /*
   * addMessageToWebchatQueue
   */ var addMessageToWebchatQueue = function addMessageToWebchatQueue(
    conf_id,
    message,
  ) {
    var index = -1
    for (var i = 0; i < webchatQueueList.length; i++) {
      if (webchatQueueList[i].conf_id === conf_id) {
        index = i
        break
      }
    }
    if (index === -1) {
      logger.log('info', 'not found webchat room of conf_id==' + conf_id)
      return false
    }
    var webchatQueue = webchatQueueList[index] // add to message list
    webchatQueue.messageList.push(message) // display message
    displayWebchatQueueMessage(conf_id, index)
    return true
  }
  /*
   * displayWebchatQueueMessage
   */ var displayWebchatQueueMessage = function displayWebchatQueueMessage(
    conf_id,
    index,
  ) {
    var webchatQueue = webchatQueueList[index] // message text
    var messageText = ''
    var messageFullText = ''
    if (webchatQueue.messageList.length > 0) {
      messageText = removeTag(
        webchatQueue.messageList[webchatQueue.messageList.length - 1].text,
        true,
      )
      messageFullText = removeTag(
        webchatQueue.messageList.reduce(function (previousValue, currentValue) {
          return previousValue + currentValue.text + ' \n'
        }, ''),
        true,
      ) // smiley ascii to html
      for (var i = 0; i < smileyAsciiToHtml.length; i++) {
        messageText = messageText.replace(
          smileyAsciiToHtml[i].regex,
          smileyAsciiToHtml[i].html,
        )
      }
    } // display message
    for (var panelKey in webchatQueue.panelKeySet) {
      var dom = dojo.query(
        '[data-brekeke-uc-conf-id=' + conf_id + '] .brUCChatWebchatRoomContent',
        panelsWebchatQueue[panelKey].panelWebchatRooms,
      )[0]
      if (dom) {
        dom.innerHTML = messageText
        dom.title = messageFullText
      }
    }
  }
  /*
   * Function showProfileImage
   */ var showProfileImage = function showProfileImage(url) {
    if (typeof url !== 'string') {
      return
    }
    var up = url.split('?')
    var form = document.createElement('form')
    form.action = up[0]
    form.target = '_blank'
    form.method = 'post'
    if (up[1]) {
      var pairs = up[1].split('&')
      for (var i = 0; i < pairs.length; i++) {
        var kv = pairs[i].split('=')
        var input = document.createElement('input')
        input.setAttribute('name', decodeURIComponent(kv[0]))
        input.setAttribute('value', decodeURIComponent(kv[1]))
        form.appendChild(input)
      }
    }
    var body = document.getElementsByTagName('body')[0]
    body.appendChild(form)
    form.submit()
    body.removeChild(form)
  }
  /*
   * Function inputProfileImage
   */ var inputProfileImage = function inputProfileImage(panel) {
    if (preferenceWorkData[panel.panelKey].profileImageUploading) {
      return
    } // input file
    panel.formProfileImageForm.reset()
    if (getBrowser() === 'IE') {
      require(['dijit/Dialog', 'dijit/form/Button'], function (Dialog, Button) {
        var dia = new Dialog({
          title: ucMsgs.BTN_DIALOG_SELECT_PROFILE_IMAGE,
          content:
            '<div class="brUCPanelPreferenceProfileImageFormDialog"></div>',
          closable: false,
        })
        dia.addChild(
          new Button({
            label: ucMsgs.CMN_CANCEL,
            onClick: function onClick() {
              panel.panelPreferenceProfileImageForm.appendChild(
                panel.formProfileImageForm,
              )
              dia.destroy()
            },
          }),
        )
        var div = dojo.query(
          '.brUCPanelPreferenceProfileImageFormDialog',
          dia.containerNode,
        )[0]
        div.appendChild(panel.formProfileImageForm)
        dia.show()
      })
    } else {
      panel.inputProfileImageForm.click()
    }
  }
  /*
   * Function uploadProfileImage
   */ var uploadProfileImage = function uploadProfileImage(panel) {
    if (getBrowser() === 'IE') {
      require(['dijit/registry'], function (registry) {
        var dia = registry.getEnclosingWidget(
          panel.formProfileImageForm.parentNode,
        )
        panel.panelPreferenceProfileImageForm.appendChild(
          panel.formProfileImageForm,
        )
        dia.destroy()
      })
    }
    if (panel.inputProfileImageForm.value) {
      preferenceWorkData[panel.panelKey].profileImageUploading = true
      panel.imgProfileImage.style.backgroundImage = 'url(./img/progress.gif)'
      panel.imgProfileImage.setAttribute('data-brekeke-uc-url', '') // upload profile image
      chatClient.uploadProfileImage(
        panel.inputProfileImageForm,
        function (ev) {
          // funcOK
          preferenceWorkData[panel.panelKey].profileImageUploading = false
          preferenceWorkData[panel.panelKey].profileImageTo = 'SAVE'
          panel.imgProfileImage.style.backgroundImage = 'url(' + ev.url + ')'
          panel.imgProfileImage.setAttribute(
            'data-brekeke-uc-url',
            ev.url + '&SIZE=ORIGINAL',
          )
        },
        function (ev) {
          // funcError
          preferenceWorkData[panel.panelKey].profileImageUploading = false
          preferenceWorkData[panel.panelKey].profileImageTo = ''
          var url = chatClient.getProfile().profile_image_url
          panel.imgProfileImage.style.backgroundImage = 'url(' + url + ')'
          panel.imgProfileImage.setAttribute(
            'data-brekeke-uc-url',
            url + '&SIZE=ORIGINAL',
          )
          logger.log(
            'warn',
            'chatClient.uploadProfileImage error code: ' +
              ev.code +
              ', message: ' +
              ev.message,
          )
          windowAlert(
            ucMsgs.CMN_ALERT,
            ucMsgs.MSG_UPLOAD_PROFILE_IMAGE_FAILED +
              ' (' +
              ev.code +
              ' ' +
              ev.message +
              ')',
          )
        },
      )
    }
  }
  /*
   * Function savePreference
   */ var savePreference = function savePreference(panel) {
    if (preferenceWorkData[panel.panelKey].profileImageUploading) {
      windowAlert(ucMsgs.CMN_ALERT, ucMsgs.MSG_SAVE_PREFERENCE_TRANSFERRING)
      return
    } // get and check values
    var webRTCDisabled = panel.checkBoxWebRTCEnabled.checked ? '' : 'true'
    var mainVideoWidth = ''
    var mainVideoHeight = ''
    if (panel.radioButtonMainVideoDisplaySizeManual.checked) {
      mainVideoWidth = panel.textBoxMainVideoWidth.attr('value')
      if (int(mainVideoWidth) <= 0) {
        windowAlert(ucMsgs.CMN_ALERT, ucMsgs.MSG_SAVE_PREFERENCE_MAIN_WIDTH)
        return
      }
      mainVideoHeight = panel.textBoxMainVideoHeight.attr('value')
      if (int(mainVideoHeight) < MIN_MAIN_VIDEO_HEIGHT) {
        windowAlert(ucMsgs.CMN_ALERT, ucMsgs.MSG_SAVE_PREFERENCE_MAIN_HEIGHT)
        return
      }
    }
    var thumbnailVideoWidth = ''
    var thumbnailVideoHeight = ''
    if (panel.radioButtonThumbnailVideoDisplaySizeManual.checked) {
      thumbnailVideoWidth = panel.textBoxThumbnailVideoWidth.attr('value')
      if (int(thumbnailVideoWidth) <= 0) {
        windowAlert(
          ucMsgs.CMN_ALERT,
          ucMsgs.MSG_SAVE_PREFERENCE_THUMBNAIL_WIDTH,
        )
        return
      }
      thumbnailVideoHeight = panel.textBoxThumbnailVideoHeight.attr('value')
      if (int(thumbnailVideoHeight) <= 0) {
        windowAlert(
          ucMsgs.CMN_ALERT,
          ucMsgs.MSG_SAVE_PREFERENCE_THUMBNAIL_HEIGHT,
        )
        return
      }
    }
    var thumbnailFrameRate = panel.textBoxThumbnailFrameRate.attr('value')
    if (int(thumbnailFrameRate) <= 0 && thumbnailFrameRate) {
      try {
        JSON.parse(thumbnailFrameRate)
      } catch (e) {
        windowAlert(ucMsgs.CMN_ALERT, ucMsgs.MSG_SAVE_PREFERENCE_FRAME_RATE)
        return
      }
    }
    var shareScreenEnabled = panel.checkBoxShareScreenEnabled.checked
      ? 'true'
      : ''
    var shareScreenMediaSource = panel.checkBoxShareScreenMediaSource.checked
      ? ''
      : 'window'
    var shareScreenMute = panel.checkBoxShareScreenMute.checked ? '' : 'true'
    var shareScreenExtensionId =
      panel.textBoxShareScreenExtensionId.attr('value')
    panel.buttonSavePreference.setDisabled(true)
    var settings = chatClient.getSettings()
    settings.initial_status = preferenceWorkData[panel.panelKey].initial_status
    if (!settings.optional_settings) {
      settings.optional_settings = {}
    }
    settings.optional_settings.image_file_transfer =
      preferenceWorkData[panel.panelKey].imageFileTransfer
    settings.optional_settings.webnotif_status =
      preferenceWorkData[panel.panelKey].webnotif_status
    settings.optional_settings.webnotif_timeout =
      settings.optional_settings.webnotif_status === 'manual'
        ? preferenceWorkData[panel.panelKey].webnotif_timeout
        : 0
    settings.optional_settings.display_name =
      panel.textBoxDisplayName.attr('value')
    settings.optional_settings.auto_close_request = Boolean(
      panel.checkBoxAutoCloseRequest.checked,
    )
    settings.optional_settings.sending_confirmation = Boolean(
      panel.checkBoxSendingConfirmation.checked,
    )
    settings.optional_settings.user_language = string(
      preferenceWorkData[panel.panelKey].user_language,
    )
    panel.spanMessage.style.display = 'none' // save properties
    chatClient.saveProperties(
      null,
      settings,
      null,
      function (ev) {
        // funcOK
        // save cookie preference
        cookiePreference.webRTCDisabled = webRTCDisabled
        cookiePreference.webRTCTypeName =
          preferenceWorkData[panel.panelKey].webRTCTypeName
        cookiePreference.mainVideoWidth = mainVideoWidth
        cookiePreference.mainVideoHeight = mainVideoHeight
        cookiePreference.thumbnailVideoWidth = thumbnailVideoWidth
        cookiePreference.thumbnailVideoHeight = thumbnailVideoHeight
        cookiePreference.thumbnailPosition =
          preferenceWorkData[panel.panelKey].thumbnailPosition
        cookiePreference.thumbnailFrameRate = thumbnailFrameRate
        cookiePreference.videoSource =
          preferenceWorkData[panel.panelKey].videoSource
        cookiePreference.shareScreenEnabled = shareScreenEnabled
        cookiePreference.shareScreenMediaSource = shareScreenMediaSource
        cookiePreference.shareScreenMute = shareScreenMute
        cookiePreference.shareScreenExtensionId = shareScreenExtensionId
        saveCookiePreference() // save auto sign-in
        var autoSignIn = panel.checkBoxAutoSignIn.checked
        require(['dojo/cookie'], function (cookie) {
          if (autoSignIn) {
            cookie(brLogin.appname + '.brlogin.autosignin', true, {
              expires: 365,
            })
            cookie(brLogin.appname + '.brlogin.rememberme', 'on', {
              expires: 365,
            })
            cookie(
              brLogin.appname + '.brlogin.user',
              brLogin.wuser.get('value') || '',
              { expires: 365 },
            )
            cookie(
              brLogin.appname + '.brlogin.password',
              brLogin.wpassword.get('value') || '',
              { expires: 365 },
            )
            cookie(
              brLogin.appname + '.brlogin.tenant',
              brLogin.wtenant.get('value') || '',
              { expires: 365 },
            )
          } else {
            if (cookie(brLogin.appname + '.brlogin.autosignin')) {
              cookie(brLogin.appname + '.brlogin.autosignin', null, {
                expires: -1,
              })
              cookie(brLogin.appname + '.brlogin.rememberme', null, {
                expires: -1,
              })
              cookie(brLogin.appname + '.brlogin.user', null, { expires: -1 })
              cookie(brLogin.appname + '.brlogin.password', null, {
                expires: -1,
              })
              cookie(brLogin.appname + '.brlogin.tenant', null, { expires: -1 })
            }
          }
        }) // save profile image
        if (preferenceWorkData[panel.panelKey].profileImageTo === 'SAVE') {
          chatClient.saveProfileImage(function () {
            var url = chatClient.getProfile().profile_image_url
            panel.imgProfileImage.style.backgroundImage = 'url(' + url + ')'
            panel.imgProfileImage.setAttribute(
              'data-brekeke-uc-url',
              url + '&SIZE=ORIGINAL',
            )
            displayStatus()
          }, null)
        } else if (
          preferenceWorkData[panel.panelKey].profileImageTo === 'DELETE'
        ) {
          chatClient.deleteProfileImage(displayStatus, null)
        } else {
          displayStatus()
        }
        preferenceWorkData[panel.panelKey].profileImageTo = '' // stop video
        stopVideoSourceStream(panel)
        panel.spanMessage.innerHTML =
          ucMsgs.MSG_SAVE_PREFERENCE_SUCCESSFUL +
          ' ' +
          formatTimeNowWithSecond()
        panel.spanMessage.style.display = 'inline-block'
        panel.panelPreferenceTable.domNode.scrollTop = 0
        panel.buttonSavePreference.setDisabled(false)
        if (phoneRegistered) {
          phoneReregistering = true
          phone.stopWebRTC(false) // startWebRTC in phone_onPhoneStatusChanged
        } else {
          startWebRTC(true)
        }
      },
      function (ev) {
        // funcError
        logger.log(
          'warn',
          'chatClient.saveProperties error code: ' +
            ev.code +
            ', message: ' +
            ev.message,
        )
        panel.spanMessage.innerHTML =
          ucMsgs.MSG_SAVE_PREFERENCE_FAILED +
          ' (' +
          ev.code +
          ' ' +
          ev.message +
          ')'
        panel.spanMessage.style.display = 'inline-block'
        panel.panelPreferenceTable.domNode.scrollTop = 0
        panel.buttonSavePreference.setDisabled(false)
      },
    )
  }
  /*
   * Function displayPreference
   */ var displayPreference = function displayPreference(panel) {
    var settings = chatClient.getSettings() // initial status
    displayInitialStatus(panel) // main video height
    var mainVideoWidth = int(cookiePreference.mainVideoWidth)
    var mainVideoHeight = int(cookiePreference.mainVideoHeight)
    if (mainVideoWidth > 0 && mainVideoHeight > 0) {
      panel.radioButtonMainVideoDisplaySizeManual.setChecked(true)
      panel.textBoxMainVideoWidth.set('value', string(mainVideoWidth))
      panel.textBoxMainVideoHeight.set('value', string(mainVideoHeight))
    } else {
      panel.radioButtonMainVideoDisplaySizeAuto.setChecked(true)
      panel.textBoxMainVideoWidth.setDisabled(true)
      panel.textBoxMainVideoHeight.setDisabled(true)
    } // thumbnail video height
    var thumbnailVideoWidth = int(cookiePreference.thumbnailVideoWidth)
    var thumbnailVideoHeight = int(cookiePreference.thumbnailVideoHeight)
    if (thumbnailVideoWidth > 0 && thumbnailVideoHeight > 0) {
      panel.radioButtonThumbnailVideoDisplaySizeManual.setChecked(true)
      panel.textBoxThumbnailVideoWidth.set('value', string(thumbnailVideoWidth))
      panel.textBoxThumbnailVideoHeight.set(
        'value',
        string(thumbnailVideoHeight),
      )
    } else {
      panel.radioButtonThumbnailVideoDisplaySizeAuto.setChecked(true)
      panel.textBoxThumbnailVideoWidth.setDisabled(true)
      panel.textBoxThumbnailVideoHeight.setDisabled(true)
    } // thumbnail position
    if (preferenceWorkData[panel.panelKey].thumbnailPosition === 'bottom') {
      panel.radioButtonThumbnailPositionBottom.setChecked(true)
    } else {
      panel.radioButtonThumbnailPositionRight.setChecked(true)
    } // imageFile transfer
    if (preferenceWorkData[panel.panelKey].imageFileTransfer === 'file') {
      panel.radioButtonImageFileTransferFile.setChecked(true)
    } else {
      panel.radioButtonImageFileTransferInline.setChecked(true)
    } // webnotif
    if (preferenceWorkData[panel.panelKey].webnotif_status === 'off') {
      panel.radioButtonWebnotifTimeoutOff.setChecked(true)
      panel.textBoxWebnotifTimeoutSec.setDisabled(true)
    } else if (
      preferenceWorkData[panel.panelKey].webnotif_status === 'manual'
    ) {
      panel.radioButtonWebnotifTimeoutManual.setChecked(true)
      panel.textBoxWebnotifTimeoutSec.set(
        'value',
        string(
          int(preferenceWorkData[panel.panelKey].webnotif_timeout) / 1000 || '',
        ),
      )
    } else {
      panel.radioButtonWebnotifTimeoutAuto.setChecked(true)
      panel.textBoxWebnotifTimeoutSec.setDisabled(true)
    }
    panel.checkBoxSendingConfirmation.set(
      'checked',
      Boolean(preferenceWorkData[panel.panelKey].sending_confirmation),
    )
    panel.textBoxDisplayName.set(
      'value',
      string(
        settings.optional_settings && settings.optional_settings.display_name,
      ),
    )
    panel.checkBoxAutoCloseRequest.set(
      'checked',
      Boolean(
        settings.optional_settings &&
          settings.optional_settings.auto_close_request,
      ),
    ) // auto sign-in
    require(['dojo/cookie'], function (cookie) {
      if (
        cookie(brLogin.appname + '.brlogin.autosignin') &&
        cookie(brLogin.appname + '.brlogin.user')
      ) {
        panel.checkBoxAutoSignIn.set('checked', true)
      } else {
        panel.checkBoxAutoSignIn.set('checked', false)
      }
    }) // auto start
    if (getQueryParameters()['mode'] === 'autostart') {
      panel.spanAutoStartEnabled.innerHTML = ucMsgs.LBL_AUTO_START_ENABLED
    } else {
      panel.spanAutoStartEnabled.innerHTML =
        ucMsgs.LBL_AUTO_START_DISABLED +
        '<br /><a href="/' +
        location.pathname.split('/')[1] +
        '/css?UC=1" target="_blank">' +
        ucMsgs.LBL_AUTO_START_DOWNLOAD +
        '</a>'
    } // webrtc
    panel.checkBoxWebRTCEnabled.set(
      'checked',
      !Boolean(cookiePreference.webRTCDisabled),
    ) // webrtc type
    panel.dropDownMenuWebRTCType.getChildren().forEach(function (item, i) {
      if (
        i === 0 ||
        preferenceWorkData[panel.panelKey].webRTCTypeName === item.get('value')
      ) {
        panel.dropDownButtonWebRTCType.set('label', item.label)
      }
    }) // thumbnail frame rate
    panel.textBoxThumbnailFrameRate.set(
      'value',
      string(cookiePreference.thumbnailFrameRate),
    ) // video source
    if (getBrowser() === 'Chrome' || getBrowser() === 'Firefox') {
      // remove old items
      var children = panel.dropDownMenuVideoSource.getChildren()
      for (var i = 0; i < children.length; i++) {
        panel.removeChild(children[i])
        children[i].destroy()
      }
      require(['dijit/MenuItem'], function (MenuItem) {
        // add menu item of "auto"
        var item = new MenuItem({
          label: ucMsgs.LBL_VIDEO_SOURCE_AUTO,
          onClick: function onClick() {
            preferenceWorkData[panel.panelKey].videoSource = this.get('value')
            panel.dropDownButtonVideoSource.set('label', this.label) // stop video
            stopVideoSourceStream(panel)
          },
        })
        item.set('value', '')
        panel.dropDownMenuVideoSource.addChild(item)
        panel.dropDownButtonVideoSource.set('label', item.label) // add menu item of "sound only"
        item = new MenuItem({
          label: ucMsgs.LBL_VIDEO_SOURCE_SOUND_ONLY,
          onClick: function onClick() {
            preferenceWorkData[panel.panelKey].videoSource = this.get('value')
            panel.dropDownButtonVideoSource.set('label', this.label) // stop video
            stopVideoSourceStream(panel)
          },
        })
        item.set('value', 'sound_only')
        panel.dropDownMenuVideoSource.addChild(item)
        if (
          preferenceWorkData[panel.panelKey].videoSource === item.get('value')
        ) {
          panel.dropDownButtonVideoSource.set('label', item.label)
        } // try getUserMedia
        var getUserMedia =
          navigator.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia ||
          navigator.msGetUserMedia
        if (getUserMedia) {
          getUserMedia.call(
            navigator,
            { audio: false, video: true },
            function (stream) {
              stream.getTracks()[0].stop() // get cameras
              if (
                navigator.mediaDevices &&
                navigator.mediaDevices.enumerateDevices
              ) {
                navigator.mediaDevices
                  .enumerateDevices()
                  .then(function (sourceInfos) {
                    for (var i = 0; i < sourceInfos.length; i++) {
                      var sourceInfo = sourceInfos[i]
                      if (sourceInfo.kind === 'videoinput') {
                        // add menu item of the camera
                        var item = new MenuItem({
                          label:
                            sourceInfo.label ||
                            formatStr(
                              ucMsgs.LBL_VIDEO_SOURCE_CAMERA,
                              panel.dropDownMenuVideoSource.getChildren()
                                .length,
                            ),
                          onClick: function onClick() {
                            preferenceWorkData[panel.panelKey].videoSource =
                              this.get('value')
                            panel.dropDownButtonVideoSource.set(
                              'label',
                              this.label,
                            )
                            panel.dropDownButtonVideoSource.set(
                              'disabled',
                              true,
                            ) // start video
                            stopVideoSourceStream(panel)
                            setTimeout(function () {
                              getUserMedia.call(
                                navigator,
                                {
                                  audio: false,
                                  video: {
                                    deviceId:
                                      preferenceWorkData[panel.panelKey]
                                        .videoSource,
                                  },
                                },
                                function (stream) {
                                  preferenceWorkData[
                                    panel.panelKey
                                  ].videoSourceStream = stream
                                  try {
                                    panel.videoVideoSource.srcObject = stream
                                  } catch (e) {
                                    logger.log('warn', e)
                                    try {
                                      preferenceWorkData[
                                        panel.panelKey
                                      ].videoSourceStreamURL =
                                        window.URL.createObjectURL(stream)
                                      panel.videoVideoSource.src =
                                        preferenceWorkData[
                                          panel.panelKey
                                        ].videoSourceStreamURL
                                    } catch (e) {
                                      logger.log('warn', e)
                                    }
                                  }
                                  panel.dropDownButtonVideoSource.set(
                                    'disabled',
                                    false,
                                  )
                                },
                                function () {
                                  try {
                                    panel.videoVideoSource.srcObject = null
                                  } catch (e) {
                                    logger.log('warn', e)
                                  }
                                  try {
                                    panel.videoVideoSource.src = ''
                                  } catch (e) {
                                    logger.log('warn', e)
                                  }
                                  panel.dropDownButtonVideoSource.set(
                                    'disabled',
                                    false,
                                  )
                                },
                              )
                            }, 1000)
                          },
                        })
                        item.set('value', sourceInfo.deviceId)
                        panel.dropDownMenuVideoSource.addChild(item)
                        if (
                          preferenceWorkData[panel.panelKey].videoSource ===
                          sourceInfo.deviceId
                        ) {
                          panel.dropDownButtonVideoSource.set(
                            'label',
                            item.label,
                          )
                        }
                      }
                    }
                  })
                  .catch(function (error) {
                    logger.log(
                      'info',
                      'enumerateDevices() failed: ' + stringifyError(error),
                    )
                  })
              }
            },
            function (error) {
              logger.log(
                'info',
                'getUserMedia() failed: ' + stringifyError(error),
              )
            },
          )
        }
      })
    } // share screen enabled
    panel.checkBoxShareScreenEnabled.set(
      'checked',
      Boolean(cookiePreference.shareScreenEnabled),
    )
    panel.checkBoxShareScreenMediaSource.set(
      'checked',
      cookiePreference.shareScreenMediaSource !== 'window',
    )
    panel.checkBoxShareScreenMediaSource.setDisabled(
      !Boolean(cookiePreference.shareScreenEnabled),
    )
    panel.checkBoxShareScreenMute.set(
      'checked',
      !Boolean(cookiePreference.shareScreenMute),
    )
    panel.checkBoxShareScreenMute.setDisabled(
      !Boolean(cookiePreference.shareScreenEnabled),
    )
    panel.textBoxShareScreenExtensionId.set(
      'value',
      cookiePreference.shareScreenExtensionId,
    )
    panel.aShareScreenDownload.href =
      '/' + location.pathname.split('/')[1] + '/eps' // user language
    var language = string(preferenceWorkData[panel.panelKey].user_language)
    if (!panel.radioButtonUserLanguageList[language]) {
      language = ''
    }
    panel.radioButtonUserLanguageAuto.setChecked(language === '')
    for (var l in panel.radioButtonUserLanguageList) {
      panel.radioButtonUserLanguageList[l].setChecked(language === l)
    }
  }
  /*
   * Function displayInitialStatus
   */ var displayInitialStatus = function displayInitialStatus(panel) {
    var iconClass = getStatusIconClass(
      preferenceWorkData[panel.panelKey].initial_status,
    )
    var statusStr =
      preferenceWorkData[panel.panelKey].initial_status ===
      Constants.STATUS_OFFLINE
        ? ucMsgs.CMN_OWN_STATUS_STRING_INVISIBLE
        : preferenceWorkData[panel.panelKey].initial_status ===
            Constants.STATUS_AVAILABLE
          ? ucMsgs.CMN_OWN_STATUS_STRING_AVAILABLE
          : preferenceWorkData[panel.panelKey].initial_status ===
              Constants.STATUS_IDLE
            ? ucMsgs.CMN_OWN_STATUS_STRING_IDLE
            : preferenceWorkData[panel.panelKey].initial_status ===
                Constants.STATUS_BUSY
              ? ucMsgs.CMN_OWN_STATUS_STRING_BUSY
              : ''
    panel.dropDownButtonInitialStatus.set('label', statusStr)
    var iconNode = dojo.query(
      '.dijitIcon',
      panel.dropDownButtonInitialStatus.domNode,
    )
    iconNode.removeClass(panel.dropDownButtonInitialStatus.iconClass)
    iconNode.addClass(iconClass)
    panel.dropDownButtonInitialStatus.iconClass = iconClass
  }
  /*
   * Function stopVideoSourceStream
   */ var stopVideoSourceStream = function stopVideoSourceStream(panel) {
    // stop video
    if (preferenceWorkData[panel.panelKey].videoSourceStream) {
      preferenceWorkData[panel.panelKey].videoSourceStream.getTracks()[0].stop()
    }
    preferenceWorkData[panel.panelKey].videoSourceStream = null
    if (preferenceWorkData[panel.panelKey].videoSourceStreamURL) {
      window.URL.revokeObjectURL(
        preferenceWorkData[panel.panelKey].videoSourceStreamURL,
      )
    }
    preferenceWorkData[panel.panelKey].videoSourceStreamURL = null
    try {
      panel.videoVideoSource.srcObject = null
    } catch (e) {
      logger.log('warn', e)
    }
    try {
      panel.videoVideoSource.src = ''
    } catch (e) {
      logger.log('warn', e)
    }
  }
  /*
   * Function searchTopics
   */ var searchTopics = function searchTopics(panel) {
    var date = panel.dateTextBoxSearchTopics.attr('value')
    if (!date || !date.getTime || !date.getTime()) {
      logger.log('info', 'Invalid date')
      return
    } // disable date text box
    panel.dateTextBoxSearchTopics.attr('disabled', true)
    panel.imgSearchTopics.style.visibility = 'visible' // search topics
    chatClient.searchTopicsByDate(
      date,
      function (ev) {
        // funcOK
        // clear topics html
        panel.tableHistoryHeaderTopics.innerHTML = ''
        if (ev.topics.length === 0) {
          // no data
          var tr = document.createElement('tr')
          tr.innerHTML = '<td>No data</td>'
          panel.tableHistoryHeaderTopics.appendChild(tr)
        }
        for (var i = 0; i < ev.topics.length; i++) {
          var topic = ev.topics[i] // add topics html
          var tr = document.createElement('tr')
          var td = document.createElement('td')
          var button = document.createElement('button')
          if (topic.conf_id) {
            tr.innerHTML =
              '<td>Conference:</td><td>' + escapeHTML(topic.subject) + '</td>'
          } else {
            tr.innerHTML =
              '<td>User:</td><td>' +
              escapeHTML(topic.user_name || topic.user_id) +
              '</td>'
          }
          button.innerHTML = 'Show logs'
          td.appendChild(button)
          tr.appendChild(td)
          panel.tableHistoryHeaderTopics.appendChild(tr) // register event
          panel.handlers.push(
            dojo.connect(
              button,
              'click',
              getFuncApply(panelHistoryButtonSearchLogs_click, {
                panel: panel,
                topic_id: topic.topic_id,
              }),
            ),
          )
        } // enable date text box
        panel.dateTextBoxSearchTopics.attr('disabled', false)
        panel.imgSearchTopics.style.visibility = 'hidden'
      },
      function (ev) {
        // funcError
        logger.log(
          'warn',
          'chatClient.searchTopicsByDate error code: ' +
            ev.code +
            ', message: ' +
            ev.message,
        )
        windowAlert(
          ucMsgs.CMN_ALERT,
          'Failed to search.' + ' (' + ev.code + ' ' + ev.message + ')',
        ) // enable date text box
        panel.dateTextBoxSearchTopics.attr('disabled', false)
        panel.imgSearchTopics.style.visibility = 'hidden'
      },
    )
  }
  /*
   * Function searchLogs
   */ var searchLogs = function searchLogs(panel, topic_id) {
    // disable buttons
    dojo
      .query('button', panel.tableHistoryHeaderTopics)
      .forEach(function (button) {
        button.disabled = true
      })
    panel.imgSearchTopics.style.visibility = 'visible' // search logs
    chatClient.searchLogsByTopic(
      topic_id,
      function (ev) {
        // funcOK
        // clear messages html
        panel.panelMessages.innerHTML = '' // create messages html
        var messageList = []
        var profile = chatClient.getProfile()
        for (var i = 0; i < ev.logs.length; i++) {
          var log = ev.logs[i]
          messageList.push({
            senderInfo: log.sender,
            text: log.content,
            sentMessageId: '',
            received_text_id: '',
            file_id: '',
            sentTimeValue: parseDate(log.ltime),
            sentTimeDisplay: log.ltime,
          })
          displayMessage(messageList, true, panel.panelMessages, null, false)
        } // enable buttons
        dojo
          .query('button', panel.tableHistoryHeaderTopics)
          .forEach(function (button) {
            button.disabled = false
          })
        panel.imgSearchTopics.style.visibility = 'hidden'
      },
      function (ev) {
        // funcError
        logger.log(
          'warn',
          'chatClient.searchLogsByTopic error code: ' +
            ev.code +
            ', message: ' +
            ev.message,
        )
        windowAlert(
          ucMsgs.CMN_ALERT,
          'Failed to search.' + ' (' + ev.code + ' ' + ev.message + ')',
        ) // enable buttons
        dojo
          .query('button', panel.tableHistoryHeaderTopics)
          .forEach(function (button) {
            button.disabled = false
          })
        panel.imgSearchTopics.style.visibility = 'hidden'
      },
    )
  }
  /*
   * Function searchTopicsSimple
   */ var searchTopicsSimple = function searchTopicsSimple(panel) {
    // check now searching
    if (
      !searchConditionHistory[panel.panelKey] ||
      searchConditionHistory[panel.panelKey].searching
    ) {
      return
    } // construct condition
    var name = searchConditionHistory[panel.panelKey].user
      ? [searchConditionHistory[panel.panelKey].user]
      : []
    var any = []
    var conditionSimpleValue = panel.textBoxConditionSimple.attr('value')
    var conditionSimpleArray = conditionSimpleValue.split(' ')
    for (var i = 0; i < conditionSimpleArray.length; i++) {
      if (conditionSimpleArray[i] !== '') {
        any.push(conditionSimpleArray[i])
      }
    }
    var condition = { any: any, name: name, max: SEARCH_TOPICS_MAX }
    searchTopicsByCondition(panel, condition)
  }
  /*
   * Function searchTopicsAdvanced
   */ var searchTopicsAdvanced = function searchTopicsAdvanced(panel) {
    // check now searching
    if (
      !searchConditionHistory[panel.panelKey] ||
      searchConditionHistory[panel.panelKey].searching
    ) {
      return
    } // construct condition
    var content = []
    var ary = panel.textBoxAdvancedContent.attr('value').split(' ')
    for (var i = 0; i < ary.length; i++) {
      if (ary[i] !== '') {
        content.push(ary[i])
      }
    }
    var name = panel.textBoxAdvancedName.attr('value')
    if (name) {
      name = [name]
    } else {
      name = []
    }
    var subject = panel.textBoxAdvancedSubject.attr('value')
    if (subject) {
      subject = [subject]
    } else {
      subject = []
    }
    var begin = panel.dateTextBoxAdvancedBegin.attr('value')
    if (begin && begin.getTime) {
      begin = begin.getTime()
    } else {
      begin = null
    }
    var end = panel.dateTextBoxAdvancedEnd.attr('value')
    if (end && end.getTime) {
      end = end.getTime() + 86399999
    } else {
      end = null
    }
    var condition = {
      content: content,
      name: name,
      subject: subject,
      begin: begin,
      end: end,
      max: SEARCH_TOPICS_MAX,
    }
    searchTopicsByCondition(panel, condition)
  }
  /*
   * Function searchTopicsByCondition
   */ var searchTopicsByCondition = function searchTopicsByCondition(
    panel,
    condition,
  ) {
    if (
      !searchConditionHistory[panel.panelKey] ||
      searchConditionHistory[panel.panelKey].searching
    ) {
      return
    }
    searchConditionHistory[panel.panelKey].searching = true
    panel.panelNowSearchingTopics.style.display = 'block'
    panel.panelChatList.domNode.scrollTop = 0
    chatClient.searchTopicsByCondition(
      condition,
      function (ev) {
        // funcOK
        if (!searchConditionHistory[panel.panelKey]) {
          // panel closed
          return
        }
        searchConditionHistory[panel.panelKey].searching = false
        searchConditionHistory[panel.panelKey].condition = condition
        searchConditionHistory[panel.panelKey].condition.end =
          ev.topics.length > 0 ? ev.topics[ev.topics.length - 1].ltime : null
        searchConditionHistory[panel.panelKey].condition.max =
          SEARCH_TOPICS_MAX + 1
        panel.panelNowSearchingTopics.style.display = 'none'
        clearTopicList(panel)
        panel.buttonShowMore.domNode.style.display = ev.hasMore
          ? 'inline-block'
          : 'none'
        panel.panelSearchTopicsError.style.display = 'none'
        displayTopicList(ev.topics, panel, condition)
        if (!ev.topics.length) {
          panel.panelTopics.innerHTML = ucMsgs.LBL_SEARCH_NO_RESULTS
          panel.panelTopics.style.display = 'block'
        }
      },
      function (ev) {
        // funcError
        if (searchConditionHistory[panel.panelKey]) {
          searchConditionHistory[panel.panelKey].searching = false
          panel.panelNowSearchingTopics.style.display = 'none'
          panel.panelSearchTopicsError.style.display = 'block'
          panel.panelSearchTopicsError.innerHTML =
            ucMsgs.MSG_SEARCH_TOPICS_FAILED +
            ' (' +
            ev.code +
            ' ' +
            ev.message +
            ')'
        }
        logger.log(
          'warn',
          'chatClient.searchTopicsByCondition error code: ' +
            ev.code +
            ', message: ' +
            ev.message,
        )
      },
    )
  }
  /*
   * Function searchTopicsShowMore
   */ var searchTopicsShowMore = function searchTopicsShowMore(panel) {
    // check now searching
    if (
      !searchConditionHistory[panel.panelKey] ||
      searchConditionHistory[panel.panelKey].searching ||
      !searchConditionHistory[panel.panelKey].condition
    ) {
      return
    } // get last condition
    var condition = searchConditionHistory[panel.panelKey].condition
    searchConditionHistory[panel.panelKey].searching = true
    panel.panelNowSearchingTopicsMore.style.display = 'block'
    chatClient.searchTopicsByCondition(
      condition,
      function (ev) {
        // funcOK
        if (!searchConditionHistory[panel.panelKey]) {
          // panel closed
          return
        }
        searchConditionHistory[panel.panelKey].searching = false
        searchConditionHistory[panel.panelKey].condition = condition
        searchConditionHistory[panel.panelKey].condition.end =
          ev.topics.length > 0 ? ev.topics[ev.topics.length - 1].ltime : null
        searchConditionHistory[panel.panelKey].condition.max =
          SEARCH_TOPICS_MAX + 1
        panel.panelNowSearchingTopicsMore.style.display = 'none'
        panel.buttonShowMore.domNode.style.display = ev.hasMore
          ? 'inline-block'
          : 'none'
        panel.panelSearchTopicsError.style.display = 'none'
        displayTopicList(ev.topics, panel, condition)
      },
      function (ev) {
        // funcError
        if (searchConditionHistory[panel.panelKey]) {
          searchConditionHistory[panel.panelKey].searching = false
          panel.panelNowSearchingTopicsMore.style.display = 'none'
          panel.panelSearchTopicsError.style.display = 'block'
          panel.panelSearchTopicsError.innerHTML =
            ucMsgs.MSG_SEARCH_TOPICS_FAILED +
            ' (' +
            ev.code +
            ' ' +
            ev.message +
            ')'
        }
        logger.log(
          'warn',
          'chatClient.searchTopicsByCondition error code: ' +
            ev.code +
            ', message: ' +
            ev.message,
        )
      },
    )
  }
  /*
   * Function displayTopicList
   */ var displayTopicList = function displayTopicList(
    topicList,
    panel,
    condition,
  ) {
    require(['dojo/dom-construct', 'dojo/on'], function (domConstruct, on) {
      var keyword = (condition.content || []).concat(condition.any || [])
      keyword.sort(function (a, b) {
        return a.length - b.length
      })
      var keywordRegex = []
      for (var i = 0; i < keyword.length; i++) {
        if (i === 0) {
          if (keyword[i] === '') {
            continue
          }
        } else {
          if (keyword[i] === keyword[i - 1]) {
            continue
          }
        }
        keywordRegex.push(
          new RegExp(
            '(' + keyword[i].replace(REGEX_SPECIAL_CHARS_REGEX, '\\$1') + ')',
            'gi',
          ),
        )
      }
      for (var i = 0; i < topicList.length; i++) {
        var topic = topicList[i]
        if (
          dojo.query(
            '[data-brekeke-uc-topic-id=' + topic.topic_id + ']',
            panel.panelTopics,
          )[0]
        ) {
          continue
        }
        var topicPeer
        if (topic.peer.conf_id) {
          topicPeer = escapeHTML(
            topic.peer.conf_type === 'webchat'
              ? topic.peer.creator.user_name
              : topic.peer.subject,
          )
        } else {
          topicPeer = escapeHTML(topic.peer.user_name || topic.peer.user_id)
        }
        var topicTime = formatTopicDate(topic.ltime)
        var topicContent = ''
        var topicContentTitle = ''
        if (topic.ctype === Constants.CTYPE_FILE_REQUEST) {
          try {
            var fileProps = JSON.parse(topic.content)
            topicContent = escapeHTML(fileProps.name)
            topicContentTitle = topicContent
          } catch (e) {}
        } else {
          topicContent = removeTag(topic.content, true)
          topicContentTitle = escapeHTML(topicContent)
        } // smiley ascii to html
        for (var j = 0; j < smileyAsciiToHtml.length; j++) {
          topicContent = topicContent.replace(
            smileyAsciiToHtml[j].regex,
            smileyAsciiToHtml[j].html,
          )
        } // emphasize keywords
        for (var j = 0; j < keywordRegex.length; j++) {
          topicContent = topicContent.replace(
            keywordRegex[j],
            '<span class="brUCEmphasized">$1</span>',
          )
        } // create topic html
        var topicHtml =
          '<div data-brekeke-uc-topic-id="' +
          topic.topic_id +
          '" class="brUCChatTopic">\n'
        topicHtml += '<div class="brUCChatTopicTime">' + topicTime + '</div>\n'
        topicHtml += '<div class="brUCChatTopicPeer" title="' + topicPeer + '">'
        if (topic.peer.conf_id) {
          topicHtml += '<span class="brUCChatTopicConfImage"></span>'
        }
        topicHtml += topicPeer
        topicHtml += '</div>\n'
        topicHtml +=
          '<div class="brUCChatTopicContent" title="' +
          topicContentTitle +
          '">' +
          topicContent +
          '</div>\n'
        topicHtml += '</div>'
        var topicDom = domConstruct.toDom(topicHtml)
        panel.panelTopics.style.display = 'block'
        domConstruct.place(topicDom, panel.panelTopics, 'last') // set attribute
        if (topic.peer.conf_id) {
          topicDom.setAttribute('data-brekeke-uc-conf-id', topic.peer.conf_id)
        } else {
          topicDom.setAttribute('data-brekeke-uc-tenant', topic.peer.tenant)
          topicDom.setAttribute('data-brekeke-uc-user-id', topic.peer.user_id)
        } // scroll
        panel.panelChatList.domNode.scrollTop =
          panel.panelChatList.domNode.scrollHeight // add to topic list
        if (!topicListsHistory[panel.panelKey]) {
          topicListsHistory[panel.panelKey] = {}
        }
        topicListsHistory[panel.panelKey][topic.topic_id] = {
          topic: topic,
          connections: [
            on(
              topicDom,
              'click',
              getFuncApply(panelHistorySearchTopic_click, {
                panelKey: panel.panelKey,
                topic_id: topic.topic_id,
              }),
            ),
          ],
        }
      }
    })
  }
  /*
   * Function openTopic
   */ var openTopic = function openTopic(panel, topic_id) {
    require([
      'dojo/dom-construct',
      'dojo/on',
      'dojo/NodeList-traverse',
    ], function (domConstruct, on) {
      // check opened
      var opened = false
      var topicNodes = dojo.query(
        '[data-brekeke-uc-topic-id=' + topic_id + ']',
        panel.panelTopics,
      )
      if (!topicNodes[0]) {
        return
      }
      var topicTextsNodes = topicNodes.next()
      if (
        topicTextsNodes[0] &&
        topicTextsNodes[0].className.indexOf('brUCChatTopicTexts') >= 0
      ) {
        if (topicTextsNodes[0].style.display === 'none') {
          // show
          topicTextsNodes[0].style.display = 'block'
        } else {
          var errorNodes = dojo.query(
            '.brUCPanelSearchTopicTextsError',
            topicTextsNodes[0],
          )
          if (!errorNodes[0]) {
            // hide
            topicTextsNodes[0].style.display = 'none'
          } else {
            // close
            domConstruct.destroy(topicTextsNodes[0])
          }
        }
      } else {
        // check now searching
        if (
          !searchConditionHistory[panel.panelKey] ||
          searchConditionHistory[panel.panelKey].searching
        ) {
          return
        }
        searchConditionHistory[panel.panelKey].searching = true // open
        var topicTextsDiv = domConstruct.toDom(
          '<div data-brekeke-uc-texts-topic-id="' +
            topic_id +
            '" class="brUCChatTopicTexts"></div>',
        )
        domConstruct.place(topicTextsDiv, topicNodes[0], 'after')
        var nowSearchingDiv = domConstruct.toDom(
          '<div class="brUCPanelNowSearchingTopicTexts"></div>',
        )
        domConstruct.place(nowSearchingDiv, topicTextsDiv, 'first') // get texts
        var fun = chatClient.searchTopicTexts
        var arg1 = topic_id
        var conf_id = topicNodes[0].getAttribute('data-brekeke-uc-conf-id')
        if (conf_id) {
          //fun = chatClient.searchConferenceTexts;
          //arg1 = { conf_id: conf_id, topic_id: topic_id };
        }
        fun.call(
          chatClient,
          arg1,
          function (ev) {
            // funcOK
            if (!searchConditionHistory[panel.panelKey]) {
              // panel closed
              return
            }
            searchConditionHistory[panel.panelKey].searching = false
            domConstruct.destroy(nowSearchingDiv) // create messages html
            var messageList = []
            for (var i = 0; i < ev.logs.length; i++) {
              var log = ev.logs[i]
              var message = createMessageInTopic(log)
              messageList.push(message)
              displayMessage(messageList, true, topicTextsDiv, null, true)
            } // create previous/next messages link
            if (ev.logs.length > 0) {
              var prevLink = domConstruct.toDom(
                '<div class="brUCLinkPrevTopic" title="' +
                  ucMsgs.BTN_SEARCH_PREV_TOPIC_TOOLTIP +
                  '"><div class="brUCLinkTopicThumb"></div></div>',
              )
              domConstruct.place(prevLink, topicTextsDiv, 'first')
              topicNodes[0].setAttribute(
                'data-brekeke-uc-end',
                parseDate(ev.logs[0].ltime).getTime(),
              )
              var prevConnection = on(
                prevLink,
                'click',
                getFuncApply(panelHistorySearchPrevLink_click, {
                  panelKey: panel.panelKey,
                  topic_id: topic_id,
                }),
              )
              topicListsHistory[panel.panelKey][topic_id].connections.push(
                prevConnection,
              )
              var nextLink = domConstruct.toDom(
                '<div class="brUCLinkNextTopic" title="' +
                  ucMsgs.BTN_SEARCH_NEXT_TOPIC_TOOLTIP +
                  '"><div class="brUCLinkTopicThumb"></div></div>',
              )
              domConstruct.place(nextLink, topicTextsDiv, 'last')
              topicNodes[0].setAttribute(
                'data-brekeke-uc-begin',
                parseDate(ev.logs[ev.logs.length - 1].ltime).getTime(),
              )
              var nextConnection = on(
                nextLink,
                'click',
                getFuncApply(panelHistorySearchNextLink_click, {
                  panelKey: panel.panelKey,
                  topic_id: topic_id,
                }),
              )
              topicListsHistory[panel.panelKey][topic_id].connections.push(
                nextConnection,
              )
            }
          },
          function (ev) {
            // funcError
            if (searchConditionHistory[panel.panelKey]) {
              searchConditionHistory[panel.panelKey].searching = false
              domConstruct.destroy(nowSearchingDiv)
              domConstruct.place(
                domConstruct.toDom(
                  '<div class="brUCPanelSearchTopicTextsError brUCPanelSearchError">' +
                    ucMsgs.MSG_SEARCH_TOPIC_TEXTS_FAILED +
                    ' (' +
                    ev.code +
                    ')</div>',
                ),
                topicTextsDiv,
                'first',
              )
            }
            logger.log(
              'warn',
              'chatClient.searchTopicTexts error code: ' +
                ev.code +
                ', message: ' +
                ev.message,
            )
          },
        )
      }
    })
  }
  /*
   * Function searchPrevNextTopic
   */ var searchPrevNextTopic = function searchPrevNextTopic(
    panel,
    topic_id,
    next,
  ) {
    require([
      'dojo/dom-construct',
      'dojo/on',
      'dojo/NodeList-traverse',
    ], function (domConstruct, on) {
      // check now searching
      if (
        !searchConditionHistory[panel.panelKey] ||
        searchConditionHistory[panel.panelKey].searching
      ) {
        return
      }
      var topicNodes = dojo.query(
        '[data-brekeke-uc-topic-id=' + topic_id + ']',
        panel.panelTopics,
      )
      if (!topicNodes[0]) {
        return
      }
      var topicTextsDiv = dojo.query(
        '[data-brekeke-uc-texts-topic-id=' + topic_id + ']',
        panel.panelTopics,
      )[0]
      if (!topicTextsDiv) {
        return
      }
      var condition = {
        tenant: topicNodes[0].getAttribute('data-brekeke-uc-tenant'),
        user_id: topicNodes[0].getAttribute('data-brekeke-uc-user-id'),
        conf_id: topicNodes[0].getAttribute('data-brekeke-uc-conf-id'),
        begin: next
          ? int(topicNodes[0].getAttribute('data-brekeke-uc-begin'))
          : null,
        end: next
          ? null
          : int(topicNodes[0].getAttribute('data-brekeke-uc-end')),
        asc: next,
        max: SEARCH_PREV_NEXT_TEXTS_MAX + 1,
      }
      searchConditionHistory[panel.panelKey].searching = true
      var nowSearchingDiv = domConstruct.toDom(
        '<div class="brUCPanelNowSearchingTopicTexts"></div>',
      )
      domConstruct.place(
        nowSearchingDiv,
        topicTextsDiv,
        next ? 'last' : 'first',
      )
      chatClient.searchTexts(
        condition,
        function (ev) {
          // funcOK
          if (!searchConditionHistory[panel.panelKey]) {
            // panel closed
            return
          }
          searchConditionHistory[panel.panelKey].searching = false
          domConstruct.destroy(nowSearchingDiv) // create messages html
          var messageList = []
          for (var i = 0; i < ev.logs.length; i++) {
            var log = ev.logs[i]
            if (
              dojo.query(
                '[data-brekeke-uc-log-id=' + log.log_id + ']',
                topicTextsDiv,
              )[0]
            ) {
              continue
            }
            var message = createMessageInTopic(log)
            if (next) {
              messageList.push(message)
              displayMessage(messageList, true, topicTextsDiv, null, true)
            } else {
              messageList.unshift(message)
              displayMessage(messageList, false, topicTextsDiv, null, true)
            }
          } // update previous/next messages link condition
          if (ev.logs.length > 0) {
            if (next) {
              topicNodes[0].setAttribute(
                'data-brekeke-uc-begin',
                parseDate(ev.logs[ev.logs.length - 1].ltime).getTime(),
              )
            } else {
              topicNodes[0].setAttribute(
                'data-brekeke-uc-end',
                parseDate(ev.logs[ev.logs.length - 1].ltime).getTime(),
              )
            }
          }
        },
        function (ev) {
          // funcError
          if (searchConditionHistory[panel.panelKey]) {
            searchConditionHistory[panel.panelKey].searching = false
            domConstruct.destroy(nowSearchingDiv)
            domConstruct.place(
              domConstruct.toDom(
                '<div class="brUCPanelSearchError">' +
                  ucMsgs.MSG_SEARCH_TOPIC_TEXTS_FAILED +
                  ' (' +
                  ev.code +
                  ')</div>',
              ),
              topicTextsDiv,
              next ? 'last' : 'first',
            )
          }
          logger.log(
            'warn',
            'chatClient.searchTexts error code: ' +
              ev.code +
              ', message: ' +
              ev.message,
          )
        },
      )
    })
  }
  /*
   * Function createMessageInTopic
   */ var createMessageInTopic = function createMessageInTopic(log) {
    var profile = chatClient.getProfile()
    var logContent
    if (log.ctype === Constants.CTYPE_FILE_REQUEST) {
      logContent = createStaticFileArea(log.content, log.sender)
    } else {
      logContent = log.content
    }
    var text =
      logContent +
      '<input type="hidden" data-brekeke-uc-log-id="' +
      log.log_id +
      '" />'
    var message = {
      senderInfo: log.sender,
      text: text,
      sentMessageId: '',
      received_text_id: '',
      file_id: '',
      sentTimeValue: parseDate(log.ltime),
      sentTimeDisplay: log.ltime,
    }
    return message
  }
  /*
   * Function clearTopicList
   */ var clearTopicList = function clearTopicList(panel) {
    // clear topic list
    if (topicListsHistory[panel.panelKey]) {
      var topicList = topicListsHistory[panel.panelKey]
      for (var i in topicList) {
        for (var j = 0; j < topicList[i].connections.length; j++) {
          topicList[i].connections[j].remove()
        }
      }
      delete topicListsHistory[panel.panelKey]
    }
    panel.panelTopics.innerHTML = ''
    panel.panelTopics.style.display = 'none'
    panel.buttonShowMore.domNode.style.display = 'none'
  }
  /*
   * Function saveServerSettings
   */ var saveServerSettings = function saveServerSettings(panel) {
    var systemProperties =
      serverSettingsWorkData[panel.panelKey] &&
      serverSettingsWorkData[panel.panelKey].systemProperties
    if (!systemProperties) {
      return
    }
    var systemPropertiesOrg =
      (serverSettingsWorkData[panel.panelKey] &&
        serverSettingsWorkData[panel.panelKey].systemPropertiesOrg) ||
      {}
    if (
      int(panel.db_port.value) <= 0 ||
      int(panel.pbx_port.value) <= 0 ||
      int(panel.sip_ws_port.value) <= 0 ||
      int(panel.sip_wss_port.value) <= 0
    ) {
      panel.spanMessage.innerHTML = ucMsgs.MSG_SAVE_SERVER_PORT
      panel.spanMessage.style.display = 'inline-block'
      panel.panelServerSettingsTable.domNode.scrollTop = 0
      panel.buttonDummy.focus()
      return
    }
    if (panel.sa_password.value !== panel.sa_password_confirm.value) {
      panel.spanMessage.innerHTML = ucMsgs.MSG_SAVE_SERVER_PASSWORD
      panel.spanMessage.style.display = 'inline-block'
      panel.panelServerSettingsTable.domNode.scrollTop = 0
      panel.buttonDummy.focus()
      return
    }
    panel.buttonSaveServerSettings.set('disabled', true)
    systemProperties.misc.ip_allowed = panel.ip_allowed.value
    systemProperties.misc.buddy_mode = panel.buddy_mode.value
    systemProperties.misc.send_report_mail = panel.send_report_mail.value
    systemProperties.misc.rmtbl_month = int(panel.rmtbl_month.value)
    if (panel.sa_password.value !== PASSWORD_PLACEHOLDER) {
      systemProperties.misc.sa_password = panel.sa_password.value
    }
    systemProperties.misc.sa_language = panel.sa_language.value
    systemProperties.misc.admin_mode_enabled = panel.admin_mode_enabled.value
    systemProperties.misc.admin_mode_id_enabled =
      panel.admin_mode_id_enabled.value
    systemProperties.db.product = int(panel.db_product.value)
    systemProperties.db.host = panel.db_host.value
    systemProperties.db.port = int(panel.db_port.value)
    systemProperties.db.schema = panel.db_schema.value
    systemProperties.db.user = panel.db_user.value
    if (panel.db_product.value === '1') {
      systemProperties.db.password = ''
      systemProperties.db.hsqldb_stopped = panel.db_hsqldb_stopped.value
    } else if (panel.db_password.value !== PASSWORD_PLACEHOLDER) {
      systemProperties.db.password = panel.db_password.value
    }
    systemProperties.db.additional_options = panel.db_additional_options.value
    systemProperties.db.table_definition_ver =
      panel.db_table_definition_ver.value
    systemProperties.db.config_db = panel.db_config_db.value
    systemProperties.db.skip_task = Boolean(
      systemPropertiesOrg.db &&
        systemProperties.db.product === systemPropertiesOrg.db.product &&
        systemProperties.db.host === systemPropertiesOrg.db.host &&
        systemProperties.db.port === systemPropertiesOrg.db.port &&
        systemProperties.db.schema === systemPropertiesOrg.db.schema &&
        systemProperties.db.user === systemPropertiesOrg.db.user &&
        systemProperties.db.password === systemPropertiesOrg.db.password &&
        systemProperties.db.additional_options ===
          systemPropertiesOrg.db.additional_options &&
        !panel.db_not_skip_task.checked,
    )
    systemProperties.pbx.host = panel.pbx_host.value
    systemProperties.pbx.port = int(panel.pbx_port.value)
    if (panel.pbx_password.value !== PASSWORD_PLACEHOLDER) {
      systemProperties.pbx.login_password = panel.pbx_password.value
    }
    systemProperties.pbx.sip_host = panel.sip_host.value
    systemProperties.pbx.sip_ws_port = panel.sip_ws_port.value
    systemProperties.pbx.sip_wss_port = panel.sip_wss_port.value
    systemProperties.cim.cim_url = panel.cim_url.value
    systemProperties.cim.cim_my_url = panel.cim_my_url.value
    systemProperties.log.log_size = int(panel.log_size.value)
    systemProperties.log.log_category_server = Boolean(
      panel.log_category_server.checked,
    )
    systemProperties.log.log_category_client = Boolean(
      panel.log_category_client.checked,
    )
    systemProperties.log.log_category_guest = Boolean(
      panel.log_category_guest.checked,
    )
    panel.spanMessage.style.display = 'none'
    panel.progressServerSettings.style.display = 'block'
    chatClient.saveSystemProperties(
      systemProperties,
      function (ev) {
        // funcOK
        var result = (ev && ev.result) || {}
        chatClient.loadSystemProperties(
          function (ev) {
            // funcOK
            ;(serverSettingsWorkData[panel.panelKey] =
              serverSettingsWorkData[panel.panelKey] || {}).systemProperties =
              ev.systemProperties
            ;(serverSettingsWorkData[panel.panelKey] =
              serverSettingsWorkData[panel.panelKey] ||
              {}).systemPropertiesOrg = JSON.parse(
              JSON.stringify(ev.systemProperties),
            )
            displayServerSettings(panel)
          },
          function (ev) {
            // funcError
            logger.log(
              'warn',
              'loadSystemProperties error code: ' +
                ev.code +
                ', message: ' +
                ev.message,
            )
          },
        )
        var messageHTML =
          ucMsgs.MSG_SAVE_SERVER_SUCCESSFUL + ' ' + formatTimeNowWithSecond()
        if (result.ecode_db !== 1) {
          messageHTML += '<br />Database connection is not established.'
        }
        if (result.ecode_pbx !== 1) {
          messageHTML += '<br />PBX connection is not established.'
        }
        if (result.saved !== 1) {
          messageHTML += '<br />Warning: ' + escapeHTML(JSON.stringify(result))
        }
        panel.spanMessage.innerHTML = messageHTML
        panel.spanMessage.style.display = 'inline-block'
        panel.progressServerSettings.style.display = 'none'
        panel.panelServerSettingsTable.domNode.scrollTop = 0
        panel.buttonDummy.focus()
        panel.buttonSaveServerSettings.set('disabled', false)
      },
      function (ev) {
        // funcError
        logger.log(
          'warn',
          'saveSystemProperties error code: ' +
            ev.code +
            ', message: ' +
            ev.message,
        )
        panel.spanMessage.innerHTML =
          ucMsgs.MSG_SAVE_SERVER_FAILED +
          ' (' +
          ev.code +
          ' ' +
          ev.message +
          ')'
        panel.spanMessage.style.display = 'inline-block'
        panel.progressServerSettings.style.display = 'none'
        panel.panelServerSettingsTable.domNode.scrollTop = 0
        panel.buttonDummy.focus()
        panel.buttonSaveServerSettings.set('disabled', false)
      },
    )
  }
  /*
   * Function displayServerSettings
   */ var displayServerSettings = function displayServerSettings(panel) {
    var configProperties = chatClient.getConfigProperties()
    var signedInInfo = chatClient.getSignedInInfo()
    var systemProperties =
      serverSettingsWorkData[panel.panelKey] &&
      serverSettingsWorkData[panel.panelKey].systemProperties
    if (!systemProperties) {
      return
    }
    panel.ip_allowed.value = systemProperties.misc.ip_allowed
    panel.buddy_mode.value = systemProperties.misc.buddy_mode
    panel.send_report_mail.value = systemProperties.misc.send_report_mail
    panel.rmtbl_month.value =
      systemProperties.misc.rmtbl_month === 0
        ? ''
        : systemProperties.misc.rmtbl_month
    panel.sa_password.value = PASSWORD_PLACEHOLDER
    panel.sa_password_confirm.value = PASSWORD_PLACEHOLDER
    panel.sa_language.value = systemProperties.misc.sa_language || ''
    panel.admin_mode_enabled.value = systemProperties.misc.admin_mode_enabled
    panel.admin_mode_id_enabled.value =
      systemProperties.misc.admin_mode_id_enabled
    panel.admin_mode_id_enabled.disabled =
      panel.admin_mode_enabled.value !== 'true'
    panel.db_product.value = systemProperties.db.product
    panel.db_host.value = systemProperties.db.host
    panel.db_port.value = systemProperties.db.port
    panel.db_schema.value = systemProperties.db.schema
    panel.db_user.value = systemProperties.db.user
    panel.db_password.value =
      panel.db_product.value === '1' ? '' : PASSWORD_PLACEHOLDER
    panel.db_additional_options.value = systemProperties.db.additional_options
    panel.db_table_definition_ver.innerHTML = ''
    ;(string(systemProperties.db.table_definitions) || '0.0.0')
      .split(',')
      .forEach(function (table_definition) {
        var option = document.createElement('option')
        option.value = table_definition
        option.innerHTML = escapeHTML(table_definition)
        option.selected =
          systemProperties.db.table_definition_ver === table_definition
        panel.db_table_definition_ver.appendChild(option)
      })
    panel.db_hsqldb_stopped.value = string(systemProperties.db.hsqldb_stopped)
    panel.db_config_db.value = string(systemProperties.db.config_db)
    panel.db_not_skip_task.set('checked', false)
    panel.pbx_host.value = systemProperties.pbx.host
    panel.pbx_port.value = systemProperties.pbx.port
    panel.pbx_password.value = PASSWORD_PLACEHOLDER
    panel.sip_host.value = systemProperties.pbx.sip_host
    panel.sip_ws_port.value = systemProperties.pbx.sip_ws_port
    panel.sip_wss_port.value = systemProperties.pbx.sip_wss_port
    panel.cim_url.value = systemProperties.cim.cim_url
    panel.cim_my_url.value = systemProperties.cim.cim_my_url
    panel.log_size.disabled = systemProperties.log.log_config_permission === 0
    panel.log_size.value =
      systemProperties.log.log_size === 0 ? '' : systemProperties.log.log_size
    panel.log_category_server.set(
      'checked',
      Boolean(systemProperties.log.log_category_server),
    )
    panel.log_category_client.set(
      'checked',
      Boolean(systemProperties.log.log_category_client),
    )
    panel.log_category_guest.set(
      'checked',
      Boolean(systemProperties.log.log_category_guest),
    )
    if (panel.db_product.value === '1') {
      panel.db_schema.disabled = true
      panel.db_user.disabled = true
      panel.db_password.disabled = true
      if (
        string(
          serverSettingsWorkData[panel.panelKey] &&
            serverSettingsWorkData[panel.panelKey].systemProperties &&
            serverSettingsWorkData[panel.panelKey].systemProperties.db.product,
        ) === '1' &&
        string(
          serverSettingsWorkData[panel.panelKey].systemProperties.db
            .hsqldb_stopped,
        )
      ) {
        panel.db_hsqldb_stopped.disabled = false
        if (panel.db_hsqldb_stopped.value === 'true') {
          panel.db_hsqldb_stopped.style.color = 'red'
        } else {
          panel.db_hsqldb_stopped.style.color = ''
        }
      } else {
        panel.db_hsqldb_stopped.disabled = true
        panel.db_hsqldb_stopped.style.color = ''
      }
      panel.db_config_db.disabled = true
      if (
        configProperties.optional_config &&
        configProperties.optional_config.inst_ver
      ) {
        panel.db_product.disabled = true
      } else {
        panel.db_product.disabled = false
      }
    } else {
      panel.db_schema.disabled = false
      panel.db_user.disabled = false
      panel.db_password.disabled = false
      panel.db_hsqldb_stopped.disabled = true
      panel.db_hsqldb_stopped.style.color = ''
      if (signedInInfo && signedInInfo.recordAuth === -2) {
        panel.db_hsqldb_stopped.value = 'true'
      }
      if (
        panel.db_config_db.value === 'true' ||
        (configProperties.optional_config &&
          configProperties.optional_config.inst_ver) ||
        (signedInInfo && signedInInfo.recordAuth === -2)
      ) {
        panel.db_config_db.disabled = true
        panel.db_product.disabled = true
      } else {
        panel.db_config_db.disabled = false
        panel.db_product.disabled = false
      }
    }
    if (!recordAuthChecked) {
      if (
        signedInInfo &&
        signedInInfo.recordAuth === -1 &&
        panel.db_product.value !== '1'
      ) {
        // mysql connection not established
        panelServerSettings_dbInitializeMysqlClick.call(panel)
      }
      recordAuthChecked = true
    }
    displayServerSettingsLogdownload(panel)
  }
  /*
   * Function displayServerSettingsLogdownload
   */ var displayServerSettingsLogdownload =
    function displayServerSettingsLogdownload(panel) {
      if (!serverSettingsWorkData[panel.panelKey]) {
        return
      }
      if (!serverSettingsWorkData[panel.panelKey].debug_log_id) {
        panel.buttonLogdownloadPrepare.set('disabled', false)
        panel.buttonLogdownloadCancel.set('disabled', true)
        panel.spanLogdownloadFiles.innerHTML = ''
        panel.spanLogdownloadDownloading.style.display = 'none'
      } else {
        panel.buttonLogdownloadPrepare.set('disabled', true)
        panel.buttonLogdownloadCancel.set('disabled', false)
        panel.spanLogdownloadFiles.innerHTML = ''
        panel.spanLogdownloadDownloading.style.display = 'inline-block'
        panel.spanLogdownloadDownloading.style.visibility = 'visible'
        if (serverSettingsWorkData[panel.panelKey].debug_log_files) {
          for (
            var i = 0;
            i < serverSettingsWorkData[panel.panelKey].debug_log_files.length;
            i++
          ) {
            var debug_log_file =
              serverSettingsWorkData[panel.panelKey].debug_log_files[i]
            if (debug_log_file.error === null) {
              panel.spanLogdownloadFiles.innerHTML +=
                '<form method="post" action="/' +
                location.pathname.split('/')[1] +
                '/lcs" target="_blank" class="brUCFormLogdownloadFiles">' +
                '<a href="javascript:void(0)" onclick="this.parentNode.submit();" class="brUCLinkLogdownloadFiles">' +
                formatStr(
                  ucMsgs.BTN_LOGDOWNLOAD_FILE_TOOLTIP,
                  debug_log_file.index,
                ) +
                '</a>' +
                '<input type="hidden" name="debug_log_id" value="' +
                debug_log_file.debug_log_id +
                '" />' +
                '<input type="hidden" name="debug_log_file_id" value="' +
                debug_log_file.debug_log_file_id +
                '" />' +
                '<input type="hidden" name="chat_session_token" value="' +
                encodeURIComponent(chatClient.getChatSessionToken()) +
                '" />' +
                '</form>'
            } else {
              panel.spanLogdownloadFiles.innerHTML +=
                '<a href="javascript:alert(\'download error: ' +
                debug_log_file.error +
                '\')">' +
                formatStr(ucMsgs.BTN_LOGDOWNLOAD_FILE_TOOLTIP, i + 1) +
                '</a> '
            }
            if (!debug_log_file.has_more) {
              panel.spanLogdownloadDownloading.style.visibility = 'hidden'
            }
          }
        }
      }
    }
  /*
   * Function prepareDebugLog
   */ var prepareDebugLog = function prepareDebugLog(panel) {
    if (!serverSettingsWorkData[panel.panelKey]) {
      return
    }
    if (serverSettingsWorkData[panel.panelKey].debug_log_id) {
      return
    }
    panel.buttonLogdownloadPrepare.set('disabled', true) //var xhr = new XMLHttpRequest();
    //xhr.open("POST", location.protocol + "//" + location.host + "/" + location.pathname.split("/")[1] + "/lcs?keep_session=" + chatClient.getProfile().user_id);
    //xhr.onreadystatechange = function() {
    //    if (xhr.readyState === 4) {
    //        if (xhr.status === 200) {
    //            var lastKeepSessionTime = +new Date();
    chatClient.prepareDebugLog(
      { days: panel.logdownload_period.value },
      function (ev) {
        // funcOK
        serverSettingsWorkData[panel.panelKey] =
          serverSettingsWorkData[panel.panelKey] || {}
        serverSettingsWorkData[panel.panelKey].debug_log_id = ev.debug_log_id
        serverSettingsWorkData[panel.panelKey].debug_log_files = [] //                    if (serverSettingsWorkData[panel.panelKey].timer) {
        //                        clearInterval(serverSettingsWorkData[panel.panelKey].timer);
        //                    }
        //                    serverSettingsWorkData[panel.panelKey].timer = setInterval(function() {
        //                        var now = +new Date();
        //                        if (now - lastKeepSessionTime > 600000 && signedIn) {
        //                            var xhr = new XMLHttpRequest();
        //                            xhr.open("POST", location.protocol + "//" + location.host + "/" + location.pathname.split("/")[1] + "/lcs?keep_session=" + chatClient.getProfile().user_id);
        //                            xhr.send();
        //                            lastKeepSessionTime = now;
        //                        }
        //                    }, 1000);
        displayServerSettingsLogdownload(panel)
      },
      function (ev) {
        // funcError
        logger.log(
          'warn',
          'prepareDebugLog error code: ' + ev.code + ', message: ' + ev.message,
        )
        windowAlert(
          ucMsgs.CMN_ALERT,
          'prepareDebugLog error (' + ev.code + ' ' + ev.message + ')',
        )
        displayServerSettingsLogdownload(panel)
      },
    ) //        } else {
    //            logger.log("warn", "lcs?keep_session error status: " + xhr.status);
    //            windowAlert(ucMsgs.CMN_ALERT, "Session expired. Please re-login.");
    //            displayServerSettingsLogdownload(panel);
    //        }
    //    }
    //};
    //xhr.send();
  }
  /*
   * Function cancelDebugLog
   */ var cancelDebugLog = function cancelDebugLog(panel) {
    if (!serverSettingsWorkData[panel.panelKey]) {
      return
    }
    if (!serverSettingsWorkData[panel.panelKey].debug_log_id) {
      return
    }
    chatClient.cancelDebugLog(
      { debug_log_id: serverSettingsWorkData[panel.panelKey].debug_log_id },
      function (ev) {
        // funcOK
        if (serverSettingsWorkData[panel.panelKey]) {
          delete serverSettingsWorkData[panel.panelKey].debug_log_id
          delete serverSettingsWorkData[panel.panelKey].debug_log_files
          if (serverSettingsWorkData[panel.panelKey].timer) {
            clearInterval(serverSettingsWorkData[panel.panelKey].timer)
            delete serverSettingsWorkData[panel.panelKey].timer
          }
        }
        displayServerSettingsLogdownload(panel)
      },
      function (ev) {
        // funcError
        logger.log(
          'warn',
          'cancelDebugLog error code: ' + ev.code + ', message: ' + ev.message,
        )
        windowAlert(
          ucMsgs.CMN_ALERT,
          'cancelDebugLog error (' + ev.code + ' ' + ev.message + ')',
        )
        displayServerSettingsLogdownload(panel)
      },
    )
  }
  /*
   * Function saveBlockListSettings
   */ var saveBlockListSettings = function saveBlockListSettings(panel) {
    panel.buttonSaveBlockListSettings.set('disabled', true)
    panel.spanMessage.style.display = 'none'
    chatClient.saveBlockListSettings(
      {
        ip_reverse_proxy: panel.ip_reverse_proxy.value,
        reverse_proxy_header_name_for_real_ip:
          panel.reverse_proxy_header_name_for_real_ip.value,
        reverse_proxy_header_value_format:
          panel.reverse_proxy_header_value_format.value,
        reverse_proxy_header_name_for_remote_protocol:
          panel.reverse_proxy_header_name_for_remote_protocol.value,
        reverse_proxy_header_value_format_for_remote_protocol:
          panel.reverse_proxy_header_value_format_for_remote_protocol.value,
        count_fail: panel.count_fail.value,
        time_forget: panel.time_forget.value + '000',
        time_recover: panel.time_recover.value + '000',
        block_notification_url: panel.block_notification_url.value,
      },
      function (ev) {
        // funcOK
        chatClient.loadBlockListSettings(
          function (ev) {
            // funcOK
            panel.ip_reverse_proxy.value = string(ev.blocklist.ip_reverse_proxy)
            panel.reverse_proxy_header_name_for_real_ip.value = string(
              ev.blocklist.reverse_proxy_header_name_for_real_ip,
            )
            panel.reverse_proxy_header_value_format.value = string(
              ev.blocklist.reverse_proxy_header_value_format,
            )
            panel.reverse_proxy_header_name_for_remote_protocol.value = string(
              ev.blocklist.reverse_proxy_header_name_for_remote_protocol,
            )
            panel.reverse_proxy_header_value_format_for_remote_protocol.value =
              string(
                ev.blocklist
                  .reverse_proxy_header_value_format_for_remote_protocol,
              )
            panel.count_fail.value = string(int(ev.blocklist.count_fail))
            panel.time_forget.value = string(
              Math.ceil(int(ev.blocklist.time_forget) / 1000),
            )
            panel.time_recover.value = string(
              Math.ceil(int(ev.blocklist.time_recover) / 1000),
            )
            panel.block_notification_url.value = string(
              ev.blocklist.block_notification_url,
            )
          },
          function (ev) {
            // funcError
            logger.log(
              'warn',
              'loadBlockListSettings error code: ' +
                ev.code +
                ', message: ' +
                ev.message,
            )
          },
        )
        panel.spanMessage.innerHTML =
          'Successfully saved. ' + formatTimeNowWithSecond()
        panel.spanMessage.style.display = 'inline-block'
        panel.panelBlockListSettingsTable.domNode.scrollTop = 0
        panel.buttonSaveBlockListSettings.set('disabled', false)
      },
      function (ev) {
        // funcError
        logger.log(
          'warn',
          'saveBlockListSettings error code: ' +
            ev.code +
            ', message: ' +
            ev.message,
        )
        panel.spanMessage.innerHTML =
          'Failed to save settings. (' + ev.code + ' ' + ev.message + ')'
        panel.spanMessage.style.display = 'inline-block'
        panel.panelBlockListSettingsTable.domNode.scrollTop = 0
        panel.buttonSaveBlockListSettings.set('disabled', false)
      },
    )
  }
  /*
   * Function saveTenantSettings
   */ var saveTenantSettings = function saveTenantSettings(panel) {
    var tenantSettings = tenantSettingsWorkData[panel.panelKey]
    if (!tenantSettings) {
      return
    }
    var total = 0
    for (var tenant in tenantSettings) {
      if (tenantSettings[tenant].enabled) {
        var limit = int(tenantSettings[tenant].limit)
        if (
          limit < 0 ||
          string(tenantSettings[tenant].limit) !== string(limit)
        ) {
          windowAlert(ucMsgs.CMN_ALERT, ucMsgs.MSG_SAVE_TENANT_INVALID)
          return
        }
        total += limit
      }
    }
    if (brLogin.limiter >= 1 && total > brLogin.limiter) {
      windowAlert(ucMsgs.CMN_ALERT, ucMsgs.MSG_SAVE_TENANT_MAX_LOGIN)
      return
    }
    panel.buttonSaveTenantSettings.set('disabled', true)
    for (var tenant in tenantSettings) {
      tenantSettings[tenant].limit = int(tenantSettings[tenant].limit)
    }
    panel.spanMessage.style.display = 'none'
    chatClient.saveTenantSettings(
      tenantSettings,
      function (ev) {
        // funcOK
        chatClient.loadTenantSettings(
          function (ev) {
            // funcOK
            tenantSettingsWorkData[panel.panelKey] = ev.tenantSettings
            displayTenantSettings(panel)
          },
          function (ev) {
            // funcError
            logger.log(
              'warn',
              'loadTenantSettings error code: ' +
                ev.code +
                ', message: ' +
                ev.message,
            )
          },
        )
        panel.spanMessage.innerHTML =
          ucMsgs.MSG_SAVE_TENANT_SUCCESSFUL + ' ' + formatTimeNowWithSecond()
        panel.spanMessage.style.display = 'inline-block'
        panel.panelTenantSettingsTable.domNode.scrollTop = 0
        panel.buttonSaveTenantSettings.set('disabled', false)
      },
      function (ev) {
        // funcError
        logger.log(
          'warn',
          'saveTenantSettings error code: ' +
            ev.code +
            ', message: ' +
            ev.message,
        )
        panel.spanMessage.innerHTML =
          ucMsgs.MSG_SAVE_TENANT_FAILED +
          ' (' +
          ev.code +
          ' ' +
          ev.message +
          ')'
        panel.spanMessage.style.display = 'inline-block'
        panel.panelTenantSettingsTable.domNode.scrollTop = 0
        panel.buttonSaveTenantSettings.set('disabled', false)
      },
    )
  }
  /*
   * Function displayTenantTable
   */ var displayTenantTable = function displayTenantTable(panel) {
    var configProperties = chatClient.getConfigProperties()
    var tenantProperties = tenantTableWorkData[panel.panelKey]
    panel.tbodyTenantList.innerHTML = ''
    var total = 0
    var keys = Object.keys(tenantProperties)
    keys.sort()
    for (var i = 0; i < keys.length; i++) {
      var tenant = keys[i]
      var properties = tenantProperties[tenant]
      if (properties.tenantDeleted === '1') {
        continue
      }
      var limit = int(properties.limit)
      var tr = document.createElement('tr')
      if (tenant === brLogin.stDefaultTenant) {
        tr.style.display = 'none'
      }
      var td1 = document.createElement('td')
      var linkTenant = document.createElement('a')
      linkTenant.href = 'javascript:void(0)'
      linkTenant.innerHTML = escapeHTML(tenant)
      td1.appendChild(linkTenant)
      tr.appendChild(td1)
      var tdMaxLoginUsers = document.createElement('td')
      tdMaxLoginUsers.innerHTML = escapeHTML(limit)
      tr.appendChild(tdMaxLoginUsers)
      var tdSocial = document.createElement('td')
      var linkTwitter = null
      if (
        configProperties.optional_config &&
        string(configProperties.optional_config.social_option).indexOf('T1') !==
          -1
      ) {
        linkTwitter = document.createElement('a')
        linkTwitter.href = 'javascript:void(0)'
        linkTwitter.innerHTML = escapeHTML('Twitter')
        tdSocial.appendChild(linkTwitter)
      }
      var linkFacebook = null
      if (
        configProperties.optional_config &&
        string(configProperties.optional_config.social_option).indexOf('F1') !==
          -1
      ) {
        linkFacebook = document.createElement('a')
        linkFacebook.href = 'javascript:void(0)'
        linkFacebook.innerHTML = escapeHTML('Facebook')
        tdSocial.appendChild(linkFacebook)
      }
      var linkLine = null
      if (
        configProperties.optional_config &&
        string(configProperties.optional_config.social_option).indexOf('L1') !==
          -1
      ) {
        linkLine = document.createElement('a')
        linkLine.href = 'javascript:void(0)'
        linkLine.innerHTML = escapeHTML('LINE')
        tdSocial.appendChild(linkLine)
      }
      var linkWatson = null
      if (
        configProperties.optional_config &&
        string(configProperties.optional_config.social_option).indexOf('B1') !==
          -1
      ) {
        linkWatson = document.createElement('a')
        linkWatson.href = 'javascript:void(0)'
        linkWatson.innerHTML = escapeHTML('Chatbot')
        tdSocial.appendChild(linkWatson)
      }
      var linkEmail = null
      if (
        configProperties.optional_config &&
        string(configProperties.optional_config.social_option).indexOf('M1') !==
          -1
      ) {
        linkEmail = document.createElement('a')
        linkEmail.href = 'javascript:void(0)'
        linkEmail.innerHTML = escapeHTML('Email')
        tdSocial.appendChild(linkEmail)
      }
      var linkGuest = null
      if (
        configProperties.optional_config &&
        string(configProperties.optional_config.social_option).indexOf('G1') !==
          -1
      ) {
        linkGuest = document.createElement('a')
        linkGuest.href = 'javascript:void(0)'
        linkGuest.innerHTML = escapeHTML('Guest channel')
        tdSocial.appendChild(linkGuest)
      }
      tr.appendChild(tdSocial)
      var tdDelete = document.createElement('td')
      var buttonDelete = document.createElement('input')
      buttonDelete.type = 'image'
      buttonDelete.src = 'img/delete.png'
      buttonDelete.alt = 'Delete'
      buttonDelete.title = 'Delete'
      tdDelete.appendChild(buttonDelete)
      tr.appendChild(tdDelete)
      panel.tbodyTenantList.appendChild(tr) // register event
      panel.handlers.push(
        dojo.connect(
          linkTenant,
          'click',
          getFuncApply(panelTenantTableLinkTenant_click, {
            panel: panel,
            tenant: tenant,
          }),
        ),
      )
      if (linkTwitter) {
        panel.handlers.push(
          dojo.connect(
            linkTwitter,
            'click',
            getFuncApply(panelTenantTableLinkTwitter_click, {
              panel: panel,
              tenant: tenant,
            }),
          ),
        )
      }
      if (linkFacebook) {
        panel.handlers.push(
          dojo.connect(
            linkFacebook,
            'click',
            getFuncApply(panelTenantTableLinkFacebook_click, {
              panel: panel,
              tenant: tenant,
            }),
          ),
        )
      }
      if (linkLine) {
        panel.handlers.push(
          dojo.connect(
            linkLine,
            'click',
            getFuncApply(panelTenantTableLinkLine_click, {
              panel: panel,
              tenant: tenant,
            }),
          ),
        )
      }
      if (linkWatson) {
        panel.handlers.push(
          dojo.connect(
            linkWatson,
            'click',
            getFuncApply(panelTenantTableLinkWatson_click, {
              panel: panel,
              tenant: tenant,
            }),
          ),
        )
      }
      if (linkEmail) {
        panel.handlers.push(
          dojo.connect(
            linkEmail,
            'click',
            getFuncApply(panelTenantTableLinkEmail_click, {
              panel: panel,
              tenant: tenant,
            }),
          ),
        )
      }
      if (linkGuest) {
        panel.handlers.push(
          dojo.connect(
            linkGuest,
            'click',
            getFuncApply(panelTenantTableLinkGuest_click, {
              panel: panel,
              tenant: tenant,
            }),
          ),
        )
      }
      panel.handlers.push(
        dojo.connect(
          buttonDelete,
          'click',
          getFuncApply(panelTenantTableButtonDelete_click, {
            panel: panel,
            tenant: tenant,
          }),
        ),
      )
      total += limit
    }
    panel.spanTotalMaxLoginUsers.innerHTML = total
  }
  /*
   * Function saveTenantProperty
   */ var saveTenantProperty = function saveTenantProperty(panel) {
    var configProperties = chatClient.getConfigProperties()
    var tenant = panel.panelKey
    var tenantProperty = tenantPropertyWorkData[panel.panelKey]
    if (!tenantProperty) {
      return
    }
    if (tenantProperty.imageUploading) {
      windowAlert(
        ucMsgs.CMN_ALERT,
        ucMsgs.MSG_SAVE_TENANT_PROPERTY_TRANSFERRING,
      )
      return
    }
    panel.buttonSaveTenantProperty.set('disabled', true) // set values to tenantProperty
    tenantProperty.limit = panel.max_login.value
    tenantProperty.limit_guest = panel.limit_guest.value
    if (
      int(
        configProperties.optional_config &&
          configProperties.optional_config.buddy_max_locked,
      ) %
        2 ===
      0
    ) {
      tenantProperty.buddy_max = string(panel.inputUcTenantBuddyMax.value)
    }
    if (tenantProperty.webrtc_types) {
      var webRTCTypeTrNodes = dojo.query('tr', panel.tbodyWebRTCTypes)
      for (var i = 0; i < tenantProperty.webrtc_types.length; i++) {
        if (webRTCTypeTrNodes[i]) {
          var inputs = dojo.query('.brUCWebRTCTypeInput', webRTCTypeTrNodes[i])
          tenantProperty.webrtc_types[i].description = inputs[1].value
          tenantProperty.webrtc_types[i].options = inputs[2].value
        }
      }
    }
    tenantProperty.webrtc_type_name = string(panel.inputWebRTCTypeName.value)
    tenantProperty.webrtc_type_name_locked = !Boolean(
      panel.checkBoxWebRTCTypeNameUnlocked.checked,
    )
    if (tenantProperty.webchat_services) {
      for (var service_id in tenantProperty.webchat_services) {
        var trNodes = dojo.query(
          '[data-brekeke-uc-service-id=' + service_id + ']',
          panel.tbodyWebchatServices,
        )
        if (trNodes[0]) {
          var tr = trNodes[0]
          var tds = Array.prototype.slice.call(tr.childNodes)
          var inputs = tds.map(function (td) {
            return td.childNodes[0]
          })
          tenantProperty.webchat_services[service_id] = {
            description: inputs[1].value,
            distribution_type: inputs[2].value,
            distribution_target: inputs[3].value,
            created: tenantProperty.webchat_services[service_id].created,
          }
          var options = {}
          try {
            options = JSON.parse(inputs[4].value)
          } catch (e) {
            var errMsg =
              (e && e.toString && e.toString()) || (e && e.message) || e
            logger.log('warn', errMsg)
            panel.spanMessage.innerHTML =
              ucMsgs.MSG_SAVE_TENANT_PROPERTY_FAILED + ' (' + errMsg + ')'
            panel.spanMessage.style.display = 'inline-block'
            panel.panelTenantPropertyTable.domNode.scrollTop = 0
            panel.buttonDummy.focus()
            panel.buttonSaveTenantProperty.set('disabled', false)
            return
          }
          for (var optionKey in options) {
            tenantProperty.webchat_services[service_id][optionKey] =
              options[optionKey]
          }
        }
      }
    }
    if (tenantProperty.auto_messages) {
      for (var auto_message_id in tenantProperty.auto_messages) {
        var trNodes = dojo.query(
          '[data-brekeke-uc-auto-message-id=' + auto_message_id + ']',
          panel.tbodyAutoMessages,
        )
        if (trNodes[0]) {
          var inputs = dojo.query('.brUCAutoMessageInput', trNodes[0])
          tenantProperty.auto_messages[auto_message_id] = {
            name: inputs[0].value,
            message: inputs[1].value,
            created: tenantProperty.auto_messages[auto_message_id].created,
          }
        }
      }
    }
    if (tenantProperty.webchat_widgets) {
      var widgetTrNodes = dojo.query('tr', panel.tbodyWebchatWidgets)
      for (var i = 0; i < tenantProperty.webchat_widgets.length; i++) {
        if (widgetTrNodes[i]) {
          var inputs = dojo.query('.brUCWebchatWidgetInput', widgetTrNodes[i])
          tenantProperty.webchat_widgets[i].chatServerUrl = inputs[0].value
          tenantProperty.webchat_widgets[i].widgetServerUrl = inputs[0].value
          tenantProperty.webchat_widgets[i].description = inputs[1].value
          tenantProperty.webchat_widgets[i].service_id = inputs[2].value
          tenantProperty.webchat_widgets[i].widget_type = inputs[3].value
          tenantProperty.webchat_widgets[i].options = inputs[4].value
        }
      }
    }
    if (tenantProperty.lamp_types) {
      var lampTypeTrNodes = dojo.query('tr', panel.tbodyLampTypes)
      for (var i = 0; i < tenantProperty.lamp_types.length; i++) {
        if (lampTypeTrNodes[i]) {
          var inputs = dojo.query('.brUCLampTypeInput', lampTypeTrNodes[i])
          tenantProperty.lamp_types[i].description = inputs[1].value
          tenantProperty.lamp_types[i].options = inputs[2].value
        }
      }
    }
    if (tenantProperty.pn_enabled === 'true') {
      var pn_options
      try {
        pn_options = JSON.parse(panel.textAreaPNOptions.attr('value'))
      } catch (e) {
        var errMsg = (e && e.toString && e.toString()) || (e && e.message) || e
        logger.log('warn', errMsg)
        panel.spanMessage.innerHTML =
          ucMsgs.MSG_SAVE_TENANT_PROPERTY_FAILED + ' (' + errMsg + ')'
        panel.spanMessage.style.display = 'inline-block'
        panel.panelTenantPropertyTable.domNode.scrollTop = 0
        panel.buttonDummy.focus()
        panel.buttonSaveTenantProperty.set('disabled', false)
        return
      }
      tenantProperty.pn_options = pn_options
    }
    if (
      int(
        configProperties.optional_config &&
          configProperties.optional_config.send_report_mail_locked,
      ) %
        2 ===
      0
    ) {
      tenantProperty.send_report_mail_unlocked = Boolean(
        panel.checkBoxSendReportMailUnlocked.checked,
      )
    }
    if (
      int(
        configProperties.optional_config &&
          configProperties.optional_config.status_options_enabled_locked,
      ) %
        2 ===
      0
    ) {
      if (panel.inputStatusOptions.value) {
        try {
          tenantProperty.status_options = JSON.parse(
            panel.inputStatusOptions.value,
          )
        } catch (e) {
          var errMsg =
            (e && e.toString && e.toString()) || (e && e.message) || e
          logger.log('warn', errMsg)
          panel.spanMessage.innerHTML =
            ucMsgs.MSG_SAVE_TENANT_PROPERTY_FAILED + ' (' + errMsg + ')'
          panel.spanMessage.style.display = 'inline-block'
          panel.panelTenantPropertyTable.domNode.scrollTop = 0
          panel.buttonDummy.focus()
          panel.buttonSaveTenantProperty.set('disabled', false)
          return
        }
      } else {
        delete tenantProperty.status_options // cannot save null in saveTenantProperties()
      }
      tenantProperty.status_options_enabled_unlocked = Boolean(
        panel.checkBoxStatusOptionsUnlocked.checked,
      )
    }
    if (
      int(
        configProperties.optional_config &&
          configProperties.optional_config.display_name_locked,
      ) %
        2 ===
      0
    ) {
      tenantProperty.display_name = string(panel.inputDisplayName.value)
      tenantProperty.display_name_locked = !Boolean(
        panel.checkBoxDisplayNameUnlocked.checked,
      )
    }
    if (
      int(
        configProperties.optional_config &&
          configProperties.optional_config.sending_confirmation_locked,
      ) %
        2 ===
      0
    ) {
      tenantProperty.sending_confirmation = Boolean(
        panel.checkBoxSendingConfirmation.checked,
      )
      tenantProperty.sending_confirmation_unlocked = Boolean(
        panel.checkBoxSendingConfirmationUnlocked.checked,
      )
    }
    if (
      int(
        configProperties.optional_config &&
          configProperties.optional_config.name_display_mode_locked,
      ) %
        2 ===
      0
    ) {
      tenantProperty.name_display_mode = panel.checkBoxNameDisplayMode.checked
        ? 1
        : 0
      tenantProperty.name_display_mode_unlocked = Boolean(
        panel.checkBoxNameDisplayModeUnlocked.checked,
      )
    }
    if (
      int(
        configProperties.optional_config &&
          configProperties.optional_config.notify_call_status_locked,
      ) %
        2 ===
      0
    ) {
      tenantProperty.notify_call_status = Boolean(
        panel.checkBoxNotifyCallStatus.checked,
      )
      tenantProperty.notify_call_status_unlocked = Boolean(
        panel.checkBoxNotifyCallStatusUnlocked.checked,
      )
    }
    if (
      int(
        configProperties.optional_config &&
          configProperties.optional_config.notify_conf_status_locked,
      ) %
        2 ===
      0
    ) {
      tenantProperty.notify_conf_status = Boolean(
        panel.checkBoxNotifyConfStatus.checked,
      )
      tenantProperty.notify_conf_status_unlocked = Boolean(
        panel.checkBoxNotifyConfStatusUnlocked.checked,
      )
    }
    if (
      int(
        configProperties.optional_config &&
          configProperties.optional_config.dtmf_shortcut_locked,
      ) %
        2 ===
      0
    ) {
      tenantProperty.dtmf_shortcut = panel.checkBoxDtmfShortcut0.checked ? 1 : 0
      tenantProperty.dtmf_shortcut += panel.checkBoxDtmfShortcut1.checked
        ? 2
        : 0
      tenantProperty.dtmf_shortcut += panel.checkBoxDtmfShortcut2.checked
        ? 4
        : 0
      tenantProperty.dtmf_shortcut += panel.checkBoxDtmfShortcut3.checked
        ? 8
        : 0
      tenantProperty.dtmf_shortcut_unlocked = Boolean(
        panel.checkBoxDtmfShortcutUnlocked.checked,
      )
    }
    if (
      int(
        configProperties.optional_config &&
          configProperties.optional_config.display_period_locked,
      ) %
        2 ===
      0
    ) {
      var strDisplayPeriod = string(panel.inputDisplayPeriod.value)
      var intDisplayPeriod = int(strDisplayPeriod)
      if (intDisplayPeriod >= 1 || strDisplayPeriod === '') {
        tenantProperty.display_period = intDisplayPeriod
      } else {
        var errMsg = 'Invalid display period value'
        logger.log('warn', errMsg)
        panel.spanMessage.innerHTML =
          ucMsgs.MSG_SAVE_TENANT_PROPERTY_FAILED + ' (' + errMsg + ')'
        panel.spanMessage.style.display = 'inline-block'
        panel.panelTenantPropertyTable.domNode.scrollTop = 0
        panel.buttonDummy.focus()
        panel.buttonSaveTenantProperty.set('disabled', false)
        return
      }
      tenantProperty.display_period_unlocked = Boolean(
        panel.checkBoxDisplayPeriodUnlocked.checked,
      )
    }
    if (
      int(
        configProperties.optional_config &&
          configProperties.optional_config.chat_bg_color_locked,
      ) %
        2 ===
      0
    ) {
      tenantProperty.chat_bg_color = string(
        panel.textAreaChatBgColor.attr('value'),
      )
      tenantProperty.chat_bg_color_unlocked = Boolean(
        panel.checkBoxChatBgColorUnlocked.checked,
      )
    }
    if (
      int(
        configProperties.optional_config &&
          configProperties.optional_config.dbgopt_locked,
      ) %
        2 ===
      0
    ) {
      var strDbgopt = string(panel.inputDbgopt.value)
      var intDbgopt = int(strDbgopt)
      if (intDbgopt >= 1 || strDbgopt === '') {
        tenantProperty.dbgopt = intDbgopt
      } else {
        var errMsg = 'Invalid debug options value'
        logger.log('warn', errMsg)
        panel.spanMessage.innerHTML =
          ucMsgs.MSG_SAVE_TENANT_PROPERTY_FAILED + ' (' + errMsg + ')'
        panel.spanMessage.style.display = 'inline-block'
        panel.panelTenantPropertyTable.domNode.scrollTop = 0
        panel.buttonDummy.focus()
        panel.buttonSaveTenantProperty.set('disabled', false)
        return
      }
      tenantProperty.dbgopt_unlocked = Boolean(
        panel.checkBoxDbgoptUnlocked.checked,
      )
    }
    if (
      int(
        configProperties.optional_config &&
          configProperties.optional_config.fsp_locked,
      ) %
        2 ===
      0
    ) {
      tenantProperty.file_sending_permission = panel
        .checkBoxFileSendingPermission98.checked
        ? 0
        : 98
      tenantProperty.file_sending_permission += panel
        .checkBoxFileSendingPermission28.checked
        ? 0
        : 28
      tenantProperty.file_sending_permission += panel
        .checkBoxFileSendingPermission1.checked
        ? 0
        : 1
    }
    if (
      int(
        configProperties.optional_config &&
          configProperties.optional_config.fsms_locked,
      ) %
        2 ===
      0
    ) {
      tenantProperty.file_sending_max_size = string(
        panel.inputFileSendingMaxSize.value,
      )
    }
    if (
      int(
        configProperties.optional_config &&
          configProperties.optional_config.fsna_locked,
      ) %
        2 ===
      0
    ) {
      tenantProperty.file_sending_name_allowed = string(
        panel.inputFileSendingNameAllowed.value,
      )
    }
    if (
      int(
        configProperties.optional_config &&
          configProperties.optional_config.client_script_locked,
      ) %
        2 ===
      0
    ) {
      tenantProperty.client_script = panel.textAreaClientScript.attr('value')
    }
    if (tenantProperty.customize_ts) {
      var customizeTTrNodes = dojo.query('tr', panel.tbodyCustomizeTs)
      for (var i = 0; i < tenantProperty.customize_ts.length; i++) {
        if (customizeTTrNodes[i]) {
          var inputs = dojo.query('.brUCCustomizeTInput', customizeTTrNodes[i])
          tenantProperty.customize_ts[i].schedule = inputs[1].value
          tenantProperty.customize_ts[i].service = inputs[2].value
          tenantProperty.customize_ts[i].message = inputs[3].value
          tenantProperty.customize_ts[i].message2 = inputs[4].value
        }
      }
    }
    var imageTo = tenantProperty.imageTo
    delete tenantProperty.imageTo
    panel.spanMessage.style.display = 'none' // save
    var tenantProperties = {}
    tenantProperties[tenant] = tenantProperty
    chatClient.saveTenantProperties(
      tenantProperties,
      function (ev) {
        // funcOK
        chatClient.loadTenantProperties(
          function (ev) {
            // funcOK
            tenantPropertyWorkData[panel.panelKey] = ev.tenantProperties[tenant]
            displayTenantProperty(panel)
            var tenantTablePanelKey = Object.keys(panelsTenantTable)[0]
            if (tenantTablePanelKey) {
              tenantTableWorkData[tenantTablePanelKey] = ev.tenantProperties
              displayTenantTable(panelsTenantTable[tenantTablePanelKey])
            }
          },
          function (ev) {
            // funcError
            logger.log(
              'warn',
              'loadTenantProperties error code: ' +
                ev.code +
                ', message: ' +
                ev.message,
            )
          },
        )
        panel.spanMessage.innerHTML =
          ucMsgs.MSG_SAVE_TENANT_PROPERTY_SUCCESSFUL +
          ' ' +
          formatTimeNowWithSecond()
        panel.spanMessage.style.display = 'inline-block'
        panel.panelTenantPropertyTable.domNode.scrollTop = 0
        panel.buttonDummy.focus()
        panel.buttonSaveTenantProperty.set('disabled', false)
      },
      function (ev) {
        // funcError
        logger.log(
          'warn',
          'saveTenantProperties error code: ' +
            ev.code +
            ', message: ' +
            ev.message,
        )
        panel.spanMessage.innerHTML =
          ucMsgs.MSG_SAVE_TENANT_PROPERTY_FAILED +
          ' (' +
          ev.code +
          ' ' +
          ev.message +
          ')'
        panel.spanMessage.style.display = 'inline-block'
        panel.panelTenantPropertyTable.domNode.scrollTop = 0
        panel.buttonDummy.focus()
        panel.buttonSaveTenantProperty.set('disabled', false)
      },
    ) // save profile images
    if (imageTo) {
      var user_ids = Object.keys(imageTo)
      var finishedCount = 0
      var funcFinished = function funcFinished() {
        finishedCount++
        if (finishedCount === user_ids.length) {
          displayAutoMessageImages(panel)
          var selectNodes = dojo.query(
            'select.brUCAutoMessageImage',
            panel.tbodyAutoMessages,
          )
          for (var i = 0; i < selectNodes.length; i++) {
            selectNodes[i].value = ''
          }
        }
      }
      for (var i = 0; i < user_ids.length; i++) {
        var user_id = user_ids[i]
        if (imageTo[user_id] === 'SAVE') {
          chatClient.saveProfileImage(
            { tenant: tenant, user_id: user_id },
            funcFinished,
            funcFinished,
          )
        } else if (imageTo[user_id] === 'DELETE') {
          chatClient.deleteProfileImage(
            { tenant: tenant, user_id: user_id },
            funcFinished,
            funcFinished,
          )
        } else {
          funcFinished()
        }
      }
    }
  }
  /*
   * Function displayTenantProperty
   */ var displayTenantProperty = function displayTenantProperty(panel) {
    var configProperties = chatClient.getConfigProperties()
    var tenantProperty = tenantPropertyWorkData[panel.panelKey] || {}
    panel.max_login.value = int(tenantProperty.limit)
    panel.limit_guest.value = string(tenantProperty.limit_guest)
    var language = string(tenantProperty.language_setting)
    if (
      language !== 'user' &&
      !panel.radioButtonLanguageSettingList[language]
    ) {
      language = ''
    }
    panel.radioButtonLanguageSettingAuto.setChecked(language === '')
    panel.radioButtonLanguageSettingUser.setChecked(language === 'user')
    for (var l in panel.radioButtonLanguageSettingList) {
      panel.radioButtonLanguageSettingList[l].setChecked(language === l)
    }
    panel.inputUcTenantBuddyMax.value = string(
      typeof tenantProperty.buddy_max === 'undefined'
        ? configProperties.optional_config &&
            configProperties.optional_config.buddy_max
        : tenantProperty.buddy_max,
    )
    var webRTCTypes = tenantProperty.webrtc_types || []
    var webRTCTypeTrNodes = dojo.query('tr', panel.tbodyWebRTCTypes)
    for (var i = 0; i < webRTCTypes.length; i++) {
      var webRTCType = webRTCTypes[i]
      var inputs
      if (i >= webRTCTypeTrNodes.length) {
        inputs = createWebRTCTypeTr(panel, webRTCType.name)
      } else {
        inputs = dojo.query('.brUCWebRTCTypeInput', webRTCTypeTrNodes[i])
      }
      inputs[1].value = string(webRTCType.description)
      inputs[2].value = string(webRTCType.options)
      var optionElement = document.createElement('option')
      optionElement.innerHTML = escapeHTML(webRTCType.name)
      optionElement.value = string(webRTCType.name)
      panel.selectWebRTCTypeName.appendChild(optionElement)
    }
    panel.inputWebRTCTypeName.value = string(
      typeof tenantProperty.webrtc_type_name === 'undefined'
        ? configProperties.optional_config &&
            configProperties.optional_config.webrtc_type_name
        : tenantProperty.webrtc_type_name,
    )
    panel.checkBoxWebRTCTypeNameUnlocked.set(
      'checked',
      !Boolean(tenantProperty.webrtc_type_name_locked),
    )
    if (string(tenantProperty.webchat_enabled).toLowerCase() === 'true') {
      panel.radioButtonWebchatEnabledOff.setChecked(false)
      panel.radioButtonWebchatEnabledOn.setChecked(true)
      panel.trWebchatServices.style.display = ''
      panel.trWebchatWidgets.style.display = ''
      panel.trAutoMessages.style.display = ''
      panel.trAutoMessageDefaultImage.style.display = ''
    } else {
      panel.radioButtonWebchatEnabledOn.setChecked(false)
      panel.radioButtonWebchatEnabledOff.setChecked(true)
      panel.trWebchatServices.style.display = 'none'
      panel.trWebchatWidgets.style.display = 'none'
      panel.trAutoMessages.style.display = 'none'
      panel.trAutoMessageDefaultImage.style.display = 'none'
    }
    var webchatServices = tenantProperty.webchat_services || {}
    var keys = Object.keys(webchatServices)
    keys.sort(function (a, b) {
      return int(webchatServices[a].created) - int(webchatServices[b].created)
    })
    for (var i = 0; i < keys.length; i++) {
      var service_id = keys[i]
      var trNodes = dojo.query(
        '[data-brekeke-uc-service-id=' + service_id + ']',
        panel.tbodyWebchatServices,
      )
      var inputs
      if (!trNodes[0]) {
        inputs = createWebchatServiceTr(panel, service_id)
      } else {
        var tr = trNodes[0]
        var tds = Array.prototype.slice.call(tr.childNodes)
        inputs = tds.map(function (td) {
          return td.childNodes[0]
        })
      }
      var service = webchatServices[service_id]
      inputs[1].value = string(service.description)
      inputs[2].value = string(service.distribution_type)
      inputs[3].value = string(service.distribution_target)
      var options = {}
      for (var optionKey in service) {
        if (
          optionKey !== 'description' &&
          optionKey !== 'distribution_type' &&
          optionKey !== 'distribution_target' &&
          optionKey !== 'created'
        ) {
          options[optionKey] = service[optionKey]
        }
      }
      inputs[4].value = JSON.stringify(options)
    }
    var autoMessages = tenantProperty.auto_messages || {}
    var autoMessageKeys = Object.keys(autoMessages)
    autoMessageKeys.sort(function (a, b) {
      return int(autoMessages[a].created) - int(autoMessages[b].created)
    })
    for (var i = 0; i < autoMessageKeys.length; i++) {
      var auto_message_id = autoMessageKeys[i]
      var trNodes = dojo.query(
        '[data-brekeke-uc-auto-message-id=' + auto_message_id + ']',
        panel.tbodyAutoMessages,
      )
      var inputs
      if (!trNodes[0]) {
        inputs = createAutoMessageTr(panel, auto_message_id)
      } else {
        inputs = dojo.query('.brUCAutoMessageInput', trNodes[0])
      }
      var autoMessage = autoMessages[auto_message_id]
      inputs[0].value = string(autoMessage.name)
      inputs[1].value = string(autoMessage.message)
    }
    var webchatWidgets = tenantProperty.webchat_widgets || []
    var widgetTrNodes = dojo.query('tr', panel.tbodyWebchatWidgets)
    for (var i = 0; i < webchatWidgets.length; i++) {
      var inputs
      if (i >= widgetTrNodes.length) {
        inputs = createWebchatWidgetTr(panel)
      } else {
        inputs = dojo.query('.brUCWebchatWidgetInput', widgetTrNodes[i])
      }
      var widget = webchatWidgets[i]
      inputs[0].value = string(widget.chatServerUrl)
      inputs[1].value = string(widget.description)
      inputs[2].value = string(widget.service_id)
      inputs[3].value = string(widget.widget_type) || '2'
      inputs[4].value = string(widget.options)
      ;(
        dojo.query(
          'button.brUCPublishWebchatWidget',
          panel.tbodyWebchatWidgets,
        )[i] || {}
      ).innerHTML = widget.widget_type === '1' ? 'URL' : 'HTML'
    }
    var lampTypes = tenantProperty.lamp_types || []
    var lampTypeTrNodes = dojo.query('tr', panel.tbodyLampTypes)
    for (var i = 0; i < lampTypes.length; i++) {
      var lampType = lampTypes[i]
      var inputs
      if (i >= lampTypeTrNodes.length) {
        inputs = createLampTypeTr(panel, lampType.name)
      } else {
        inputs = dojo.query('.brUCLampTypeInput', lampTypeTrNodes[i])
      }
      inputs[1].value = string(lampType.description)
      inputs[2].value = string(lampType.options)
    }
    if (string(tenantProperty.pn_enabled).toLowerCase() === 'true') {
      panel.radioButtonPNEnabledOff.setChecked(false)
      panel.radioButtonPNEnabledOn.setChecked(true)
      panel.trPNOptions.style.display = ''
    } else {
      panel.radioButtonPNEnabledOn.setChecked(false)
      panel.radioButtonPNEnabledOff.setChecked(true)
      panel.trPNOptions.style.display = 'none'
    }
    panel.textAreaPNOptions.set(
      'value',
      string(JSON.stringify(tenantProperty.pn_options, null, 2)),
    )
    var optional_config =
      typeof tenantProperty.status_options === 'undefined'
        ? configProperties.optional_config &&
          configProperties.optional_config.status_options
        : tenantProperty.status_options
    panel.checkBoxSendReportMailUnlocked.set(
      'checked',
      Boolean(tenantProperty.send_report_mail_unlocked),
    )
    panel.inputStatusOptions.value = optional_config
      ? JSON.stringify(optional_config)
      : ''
    panel.checkBoxStatusOptionsUnlocked.set(
      'checked',
      Boolean(tenantProperty.status_options_enabled_unlocked),
    )
    panel.inputDisplayName.value = string(
      typeof tenantProperty.display_name === 'undefined'
        ? configProperties.optional_config &&
            configProperties.optional_config.display_name
        : tenantProperty.display_name,
    )
    panel.checkBoxDisplayNameUnlocked.set(
      'checked',
      !Boolean(tenantProperty.display_name_locked),
    )
    panel.checkBoxSendingConfirmation.set(
      'checked',
      Boolean(
        typeof tenantProperty.sending_confirmation === 'undefined'
          ? configProperties.optional_config &&
              configProperties.optional_config.sending_confirmation
          : tenantProperty.sending_confirmation,
      ),
    )
    panel.checkBoxSendingConfirmationUnlocked.set(
      'checked',
      Boolean(tenantProperty.sending_confirmation_unlocked),
    )
    panel.checkBoxNameDisplayMode.set(
      'checked',
      int(
        typeof tenantProperty.name_display_mode === 'undefined'
          ? configProperties.optional_config &&
              configProperties.optional_config.name_display_mode
          : tenantProperty.name_display_mode,
      ) === 1,
    )
    panel.checkBoxNameDisplayModeUnlocked.set(
      'checked',
      Boolean(tenantProperty.name_display_mode_unlocked),
    )
    panel.checkBoxNotifyCallStatus.set(
      'checked',
      Boolean(
        typeof tenantProperty.notify_call_status === 'undefined'
          ? configProperties.optional_config &&
              configProperties.optional_config.notify_call_status
          : tenantProperty.notify_call_status,
      ),
    )
    panel.checkBoxNotifyCallStatusUnlocked.set(
      'checked',
      Boolean(tenantProperty.notify_call_status_unlocked),
    )
    panel.checkBoxNotifyConfStatus.set(
      'checked',
      Boolean(
        typeof tenantProperty.notify_conf_status === 'undefined'
          ? configProperties.optional_config &&
              configProperties.optional_config.notify_conf_status
          : tenantProperty.notify_conf_status,
      ),
    )
    panel.checkBoxNotifyConfStatusUnlocked.set(
      'checked',
      Boolean(tenantProperty.notify_conf_status_unlocked),
    )
    var dtmf_shortcut = int(
      typeof tenantProperty.dtmf_shortcut === 'undefined'
        ? configProperties.optional_config &&
            configProperties.optional_config.dtmf_shortcut
        : tenantProperty.dtmf_shortcut,
    )
    panel.checkBoxDtmfShortcut0.set('checked', dtmf_shortcut & 1)
    panel.checkBoxDtmfShortcut1.set('checked', dtmf_shortcut & 2)
    panel.checkBoxDtmfShortcut2.set('checked', dtmf_shortcut & 4)
    panel.checkBoxDtmfShortcut3.set('checked', dtmf_shortcut & 8)
    panel.checkBoxDtmfShortcutUnlocked.set(
      'checked',
      Boolean(tenantProperty.dtmf_shortcut_unlocked),
    )
    panel.inputDisplayPeriod.value = string(
      int(
        typeof tenantProperty.display_period === 'undefined'
          ? configProperties.optional_config &&
              configProperties.optional_config.display_period
          : tenantProperty.display_period,
      ) || '',
    )
    panel.checkBoxDisplayPeriodUnlocked.set(
      'checked',
      Boolean(tenantProperty.display_period_unlocked),
    )
    panel.textAreaChatBgColor.set(
      'value',
      string(
        typeof tenantProperty.chat_bg_color === 'undefined'
          ? configProperties.optional_config &&
              configProperties.optional_config.chat_bg_color
          : tenantProperty.chat_bg_color,
      ),
    )
    panel.checkBoxChatBgColorUnlocked.set(
      'checked',
      Boolean(tenantProperty.chat_bg_color_unlocked),
    )
    panel.inputDbgopt.value = string(
      int(
        typeof tenantProperty.dbgopt === 'undefined'
          ? configProperties.optional_config &&
              configProperties.optional_config.dbgopt
          : tenantProperty.dbgopt,
      ) || '',
    )
    panel.checkBoxDbgoptUnlocked.set(
      'checked',
      Boolean(tenantProperty.dbgopt_unlocked),
    )
    var file_sending_permission = int(
      typeof tenantProperty.file_sending_permission === 'undefined'
        ? configProperties.optional_config &&
            configProperties.optional_config.fsp
        : tenantProperty.file_sending_permission,
    )
    panel.checkBoxFileSendingPermission98.set(
      'checked',
      !Boolean(file_sending_permission & 98),
    )
    panel.checkBoxFileSendingPermission28.set(
      'checked',
      !Boolean(file_sending_permission & 28),
    )
    panel.checkBoxFileSendingPermission1.set(
      'checked',
      !Boolean(file_sending_permission & 1),
    )
    panel.inputFileSendingMaxSize.value = string(
      typeof tenantProperty.file_sending_max_size === 'undefined'
        ? configProperties.optional_config &&
            configProperties.optional_config.fsms
        : tenantProperty.file_sending_max_size,
    )
    panel.inputFileSendingNameAllowed.value = string(
      typeof tenantProperty.file_sending_name_allowed === 'undefined'
        ? configProperties.optional_config &&
            configProperties.optional_config.fsna
        : tenantProperty.file_sending_name_allowed,
    )
    panel.textAreaClientScript.set(
      'value',
      string(tenantProperty.client_script),
    )
    var customizeTs = tenantProperty.customize_ts || []
    var customizeTTrNodes = dojo.query('tr', panel.tbodyCustomizeTs)
    for (var i = 0; i < customizeTs.length; i++) {
      var inputs
      if (i >= customizeTTrNodes.length) {
        inputs = createCustomizeTTr(panel)
      } else {
        inputs = dojo.query('.brUCCustomizeTInput', customizeTTrNodes[i])
      }
      var customizeT = customizeTs[i]
      inputs[0].value = string(i + 1)
      inputs[1].value = string(customizeT.schedule)
      inputs[2].value = string(customizeT.service)
      inputs[3].value = string(customizeT.message)
      inputs[4].value = string(customizeT.message2)
    }
  }
  /*
   * Function createWebRTCTypeTr
   */ var createWebRTCTypeTr = function createWebRTCTypeTr(panel, name) {
    var inputs = []
    var tr = document.createElement('tr')
    var tdName = document.createElement('td')
    tdName.className = 'brUCWebRTCTypeName'
    inputs[0] = document.createElement('span')
    inputs[0].className = 'brUCWebRTCTypeInput'
    inputs[0].innerHTML = escapeHTML(name)
    tdName.appendChild(inputs[0])
    tr.appendChild(tdName)
    var tdDescription = document.createElement('td')
    tdDescription.className = 'brUCWebRTCTypeDescription'
    inputs[1] = document.createElement('input')
    inputs[1].className = 'brUCWebRTCTypeInput'
    inputs[1].type = 'text'
    tdDescription.appendChild(inputs[1])
    tr.appendChild(tdDescription)
    var tdOptions = document.createElement('td')
    tdOptions.className = 'brUCWebRTCTypeOptions'
    inputs[2] = document.createElement('textarea')
    inputs[2].className = 'brUCWebRTCTypeInput'
    inputs[2].rows = '3'
    tdOptions.appendChild(inputs[2])
    tr.appendChild(tdOptions)
    var tdDelete = document.createElement('td')
    tdDelete.className = 'brUCDeleteWebRTCType'
    var inputDelete = document.createElement('input')
    inputDelete.className = 'brUCDeleteWebRTCType'
    inputDelete.type = 'image'
    inputDelete.src = 'img/delete.png'
    inputDelete.alt = 'Delete'
    inputDelete.title = 'Delete'
    tdDelete.appendChild(inputDelete)
    tr.appendChild(tdDelete)
    panel.tbodyWebRTCTypes.appendChild(tr) // register event
    panel.handlers.push(
      dojo.connect(
        inputDelete,
        'click',
        getFuncApply(panelTenantPropertyButtonDeleteWebRTCType_click, {
          panel: panel,
        }),
      ),
    )
    return inputs
  }
  /*
   * Function displayAutoMessageImages
   */ var displayAutoMessageImages = function displayAutoMessageImages(panel) {
    var tenant = panel.panelKey
    var tenantProperty = tenantPropertyWorkData[tenant] || {}
    var autoMessages = tenantProperty.auto_messages || {}
    var autoMessageKeys = Object.keys(autoMessages)
    autoMessageKeys.push('')
    var buddies = autoMessageKeys.map(function (auto_message_id) {
      return { tenant: tenant, user_id: '##m#' + auto_message_id }
    })
    chatClient.addTemporaryBuddy(
      buddies,
      function () {
        for (var i = 0; i < autoMessageKeys.length; i++) {
          var auto_message_id = autoMessageKeys[i]
          var img = null
          if (auto_message_id) {
            var trNodes = dojo.query(
              '[data-brekeke-uc-auto-message-id=' + auto_message_id + ']',
              panel.tbodyAutoMessages,
            )
            if (trNodes[0]) {
              img = dojo.query('span.brUCAutoMessageImageImage', trNodes[0])[0]
            }
          } else {
            img = panel.imgAutoMessageDefaultImage
          }
          if (img) {
            var url =
              chatClient.getBuddyUser(buddies[i]).profile_image_url +
              '&cachebust=' +
              +new Date()
            img.style.backgroundImage = 'url(' + url + ')'
            img.setAttribute('data-brekeke-uc-url', url + '&SIZE=ORIGINAL')
          }
        }
      },
      null,
    )
  }
  /*
   * Function createWebchatServiceTr
   */ var createWebchatServiceTr = function createWebchatServiceTr(
    panel,
    service_id,
  ) {
    var tr = document.createElement('tr')
    tr.setAttribute('data-brekeke-uc-service-id', service_id)
    var inputs = [
      document.createElement('span'),
      document.createElement('input'),
      document.createElement('select'),
      document.createElement('input'),
      document.createElement('textarea'),
      document.createElement('input'),
    ]
    inputs[0].innerHTML = escapeHTML(service_id)
    inputs[1].type = 'text'
    var options = [
      ['Users', '0'],
      ['ACDs', '1'],
    ]
    options.forEach(function (o) {
      var option = document.createElement('option')
      option.innerHTML = escapeHTML(o[0])
      option.value = o[1]
      inputs[2].appendChild(option)
    })
    inputs[3].type = 'text'
    inputs[4].rows = '2'
    inputs[5].className = 'brUCDeleteWebchatService'
    inputs[5].type = 'image'
    inputs[5].src = 'img/delete.png'
    inputs[5].alt = 'Delete'
    inputs[5].title = 'Delete'
    var tds = inputs.map(function (inp) {
      var td = document.createElement('td')
      td.appendChild(inp)
      tr.appendChild(td)
      return td
    })
    panel.tbodyWebchatServices.appendChild(tr) // register event
    panel.handlers.push(
      dojo.connect(
        inputs[5],
        'click',
        getFuncApply(panelTenantPropertyButtonDeleteWebchatService_click, {
          panel: panel,
          service_id: service_id,
        }),
      ),
    )
    return inputs
  }
  /*
   * Function createAutoMessageTr
   */ var createAutoMessageTr = function createAutoMessageTr(
    panel,
    auto_message_id,
  ) {
    var tenant = panel.panelKey
    var inputs = []
    var tr = document.createElement('tr')
    tr.setAttribute('data-brekeke-uc-auto-message-id', auto_message_id)
    var tdAutoMessageId = document.createElement('td')
    tdAutoMessageId.className = 'brUCAutoMessageId'
    tdAutoMessageId.innerHTML = escapeHTML(auto_message_id)
    tr.appendChild(tdAutoMessageId)
    var tdAutoMessageName = document.createElement('td')
    tdAutoMessageName.className = 'brUCAutoMessageName'
    inputs[0] = document.createElement('input')
    inputs[0].className = 'brUCAutoMessageInput'
    inputs[0].type = 'text'
    tdAutoMessageName.appendChild(inputs[0])
    tr.appendChild(tdAutoMessageName)
    var tdAutoMessageMessage = document.createElement('td')
    tdAutoMessageMessage.className = 'brUCAutoMessageMessage'
    inputs[1] = document.createElement('textarea')
    inputs[1].className = 'brUCAutoMessageInput'
    inputs[1].rows = '2'
    tdAutoMessageMessage.appendChild(inputs[1])
    tr.appendChild(tdAutoMessageMessage)
    var tdAutoMessageImage = document.createElement('td')
    tdAutoMessageImage.className = 'brUCAutoMessageImage'
    var selectAutoMessageImage = document.createElement('select')
    selectAutoMessageImage.className = 'brUCAutoMessageImage'
    var optionNone = document.createElement('option')
    optionNone.innerHTML = ''
    optionNone.value = ''
    selectAutoMessageImage.appendChild(optionNone)
    var optionDefault = document.createElement('option')
    optionDefault.innerHTML = ucMsgs.LBL_AUTO_MESSAGE_IMAGE_DEFAULT
    optionDefault.value = 'DEFAULT'
    selectAutoMessageImage.appendChild(optionDefault)
    var optionSelect = document.createElement('option')
    optionSelect.innerHTML = ucMsgs.LBL_AUTO_MESSAGE_IMAGE_SELECT
    optionSelect.value = 'SELECT'
    selectAutoMessageImage.appendChild(optionSelect)
    tdAutoMessageImage.appendChild(selectAutoMessageImage)
    tr.appendChild(tdAutoMessageImage)
    var tdAutoMessageImageImage = document.createElement('td')
    tdAutoMessageImageImage.className = 'brUCAutoMessageImageImage'
    var spanAutoMessageImageImage = document.createElement('span')
    spanAutoMessageImageImage.className = 'brUCAutoMessageImageImage'
    var url =
      chatClient.getBuddyUser({ tenant: tenant, user_id: '##m#' })
        .profile_image_url +
      '&cachebust=' +
      +new Date()
    spanAutoMessageImageImage.style.backgroundImage = 'url(' + url + ')'
    spanAutoMessageImageImage.setAttribute(
      'data-brekeke-uc-url',
      url + '&SIZE=ORIGINAL',
    )
    tdAutoMessageImageImage.appendChild(spanAutoMessageImageImage)
    tr.appendChild(tdAutoMessageImageImage)
    var tdDelete = document.createElement('td')
    tdDelete.className = 'brUCDeleteAutoMessage'
    var inputDelete = document.createElement('input')
    inputDelete.className = 'brUCDeleteAutoMessage'
    inputDelete.type = 'image'
    inputDelete.src = 'img/delete.png'
    inputDelete.alt = 'Delete'
    inputDelete.title = 'Delete'
    tdDelete.appendChild(inputDelete)
    tr.appendChild(tdDelete)
    panel.tbodyAutoMessages.appendChild(tr) // register event
    panel.handlers.push(
      dojo.connect(
        inputDelete,
        'click',
        getFuncApply(panelTenantPropertyButtonDeleteAutoMessage_click, {
          panel: panel,
          auto_message_id: auto_message_id,
        }),
      ),
    )
    panel.handlers.push(
      dojo.connect(
        selectAutoMessageImage,
        'change',
        getFuncApply(panelTenantPropertySelectAutoMessageImage_change, {
          panel: panel,
          auto_message_id: auto_message_id,
        }),
      ),
    )
    panel.handlers.push(
      dojo.connect(
        spanAutoMessageImageImage,
        'click',
        getFuncApply(panelTenantPropertySpanAutoMessageImageImage_click, {
          panel: panel,
          auto_message_id: auto_message_id,
        }),
      ),
    )
    return inputs
  }
  /*
   * Function inputAutoMessageImage
   */ var inputAutoMessageImage = function inputAutoMessageImage(
    panel,
    auto_message_id,
  ) {
    var tenant = panel.panelKey
    if (!tenantPropertyWorkData[tenant]) {
      return
    }
    if (tenantPropertyWorkData[tenant].imageUploading) {
      return
    }
    panel.inputAutoMessageImageForm.setAttribute(
      'data-brekeke-uc-auto-message-id',
      auto_message_id,
    ) // input file
    panel.formAutoMessageImageForm.reset()
    if (getBrowser() === 'IE') {
      windowAlert(
        ucMsgs.CMN_ALERT,
        'This function is not supported by your browser.',
      )
    } else {
      panel.inputAutoMessageImageForm.click()
    }
  }
  /*
   * Function uploadAutoMessageImage
   */ var uploadAutoMessageImage = function uploadAutoMessageImage(panel) {
    var tenant = panel.panelKey
    if (!tenantPropertyWorkData[tenant]) {
      return
    }
    if (!panel.inputAutoMessageImageForm.value) {
      return
    }
    var auto_message_id = panel.inputAutoMessageImageForm.getAttribute(
      'data-brekeke-uc-auto-message-id',
    )
    if (typeof auto_message_id !== 'string') {
      return
    }
    var user_id = '##m#' + auto_message_id
    tenantPropertyWorkData[tenant].imageUploading = user_id
    var img = null
    if (auto_message_id) {
      var trNodes = dojo.query(
        '[data-brekeke-uc-auto-message-id=' + auto_message_id + ']',
        panel.tbodyAutoMessages,
      )
      if (trNodes[0]) {
        img = dojo.query('span.brUCAutoMessageImageImage', trNodes[0])[0]
      }
    } else {
      img = panel.imgAutoMessageDefaultImage
    }
    if (img) {
      img.style.backgroundImage = 'url(./img/progress.gif)'
      img.setAttribute('data-brekeke-uc-url', '')
    } // upload profile image
    chatClient.uploadProfileImage(
      {
        tenant: tenant,
        user_id: user_id,
        input: panel.inputAutoMessageImageForm,
      },
      function (ev) {
        // funcOK
        if (!tenantPropertyWorkData[tenant]) {
          return
        }
        delete tenantPropertyWorkData[tenant].imageUploading
        if (!tenantPropertyWorkData[tenant].imageTo) {
          tenantPropertyWorkData[tenant].imageTo = {}
        }
        tenantPropertyWorkData[tenant].imageTo[user_id] = 'SAVE'
        if (img) {
          img.style.backgroundImage = 'url(' + ev.url + ')'
          img.setAttribute('data-brekeke-uc-url', ev.url + '&SIZE=ORIGINAL')
        }
      },
      function (ev) {
        // funcError
        logger.log(
          'warn',
          'chatClient.uploadProfileImage error code: ' +
            ev.code +
            ', message: ' +
            ev.message,
        )
        if (!tenantPropertyWorkData[tenant]) {
          return
        }
        delete tenantPropertyWorkData[tenant].imageUploading
        if (tenantPropertyWorkData[tenant].imageTo) {
          delete tenantPropertyWorkData[tenant].imageTo[user_id]
        }
        if (img) {
          var url =
            chatClient.getBuddyUser({ tenant: tenant, user_id: user_id })
              .profile_image_url +
            '&cachebust=' +
            +new Date()
          img.style.backgroundImage = 'url(' + url + ')'
          img.setAttribute('data-brekeke-uc-url', url + '&SIZE=ORIGINAL')
        }
        windowAlert(
          ucMsgs.CMN_ALERT,
          ucMsgs.MSG_UPLOAD_AUTO_MESSAGE_IMAGE_FAILED +
            ' (' +
            ev.code +
            ' ' +
            ev.message +
            ')',
        )
      },
    )
  }
  /*
   * Function createWebchatWidgetTr
   */ var createWebchatWidgetTr = function createWebchatWidgetTr(panel) {
    var inputs = []
    var tr = document.createElement('tr')
    var tdUrls = document.createElement('td')
    tdUrls.className = 'brUCWebchatWidgetUrls'
    inputs[0] = document.createElement('input')
    inputs[0].className = 'brUCWebchatWidgetInput'
    inputs[0].type = 'text'
    tdUrls.appendChild(inputs[0])
    tdUrls.appendChild(document.createElement('br'))
    inputs[1] = document.createElement('input')
    inputs[1].className = 'brUCWebchatWidgetInput'
    inputs[1].type = 'text'
    tdUrls.appendChild(inputs[1])
    tr.appendChild(tdUrls)
    var tdService = document.createElement('td')
    tdService.className = 'brUCWebchatWidgetService'
    inputs[2] = document.createElement('input')
    inputs[2].className = 'brUCWebchatWidgetInput'
    inputs[2].type = 'text'
    tdService.appendChild(inputs[2])
    var selectService = document.createElement('select')
    selectService.className = 'brUCWebchatWidgetSelectService'
    selectService.appendChild(document.createElement('option'))
    for (var service_id in (tenantPropertyWorkData[panel.panelKey] || {})
      .webchat_services || {}) {
      var option = document.createElement('option')
      option.innerHTML = escapeHTML(service_id)
      option.value = service_id
      selectService.appendChild(option)
    }
    selectService.value = ''
    tdService.appendChild(selectService)
    tdService.appendChild(document.createElement('br'))
    inputs[3] = document.createElement('select')
    inputs[3].className = 'brUCWebchatWidgetInput brUCWebchatWidgetSelectType'
    var optionEmbedded = document.createElement('option')
    optionEmbedded.innerHTML = 'Embedded'
    optionEmbedded.value = '2'
    inputs[3].appendChild(optionEmbedded)
    var optionPage = document.createElement('option')
    optionPage.innerHTML = 'Page'
    optionPage.value = '1'
    inputs[3].appendChild(optionPage)
    var optionPopUp = document.createElement('option')
    optionPopUp.innerHTML = 'Pop-up'
    optionPopUp.value = '0'
    inputs[3].appendChild(optionPopUp)
    tdService.appendChild(inputs[3])
    tr.appendChild(tdService)
    var tdOptions = document.createElement('td')
    tdOptions.className = 'brUCWebchatWidgetOptions'
    inputs[4] = document.createElement('textarea')
    inputs[4].className = 'brUCWebchatWidgetInput'
    inputs[4].rows = '3'
    tdOptions.appendChild(inputs[4])
    tr.appendChild(tdOptions)
    var tdPublish = document.createElement('td')
    tdPublish.className = 'brUCPublishWebchatWidget'
    var inputPublish = document.createElement('button')
    inputPublish.className = 'brUCPublishWebchatWidget'
    inputPublish.innerHTML = 'HTML'
    tdPublish.appendChild(inputPublish)
    tr.appendChild(tdPublish)
    var tdDelete = document.createElement('td')
    tdDelete.className = 'brUCDeleteWebchatWidget'
    var inputDelete = document.createElement('input')
    inputDelete.className = 'brUCDeleteWebchatWidget'
    inputDelete.type = 'image'
    inputDelete.src = 'img/delete.png'
    inputDelete.alt = 'Delete'
    inputDelete.title = 'Delete'
    tdDelete.appendChild(inputDelete)
    tr.appendChild(tdDelete)
    panel.tbodyWebchatWidgets.appendChild(tr) // register event
    panel.handlers.push(
      dojo.connect(
        inputPublish,
        'click',
        getFuncApply(panelTenantPropertyButtonPublishWebchatWidget_click, {
          panel: panel,
        }),
      ),
    )
    panel.handlers.push(
      dojo.connect(
        inputDelete,
        'click',
        getFuncApply(panelTenantPropertyButtonDeleteWebchatWidget_click, {
          panel: panel,
        }),
      ),
    )
    panel.handlers.push(
      dojo.connect(
        selectService,
        'change',
        getFuncApply(panelTenantPropertyWebchatWidgetSelectService_change, {
          panel: panel,
        }),
      ),
    )
    panel.handlers.push(
      dojo.connect(
        inputs[3],
        'change',
        getFuncApply(panelTenantPropertyWebchatWidgetSelectType_change, {
          panel: panel,
        }),
      ),
    )
    return inputs
  }
  /*
   * Function publishWebchatWidget
   */ var publishWebchatWidget = function publishWebchatWidget(panel, index) {
    var tenant = panel.panelKey
    var widget =
      tenantPropertyWorkData[panel.panelKey] &&
      tenantPropertyWorkData[panel.panelKey].webchat_widgets &&
      tenantPropertyWorkData[panel.panelKey].webchat_widgets[index]
    if (!widget) {
      windowAlert(ucMsgs.CMN_ALERT, 'Widget not found.')
      return
    }
    var widgetTrNodes = dojo.query('tr', panel.tbodyWebchatWidgets)
    if (widgetTrNodes[index]) {
      var inputs = dojo.query('.brUCWebchatWidgetInput', widgetTrNodes[index])
      widget.chatServerUrl = inputs[0].value
      widget.widgetServerUrl = inputs[0].value
      widget.description = inputs[1].value
      widget.service_id = inputs[2].value
      widget.widget_type = inputs[3].value
      widget.options = inputs[4].value
    } else {
      windowAlert(ucMsgs.CMN_ALERT, 'Widget node not found.')
      return
    }
    var esc = function esc(str) {
      return string(str).replace(/\\/g, '\\\\').replace(/'/g, "\\'")
    }
    var cacheBust = +new Date()
    var code = ''
    if (widget.webchat_widget_id && widget.widget_type === '1') {
      code +=
        esc(widget.chatServerUrl) +
        'wws?t=' +
        esc(tenant) +
        '&w=' +
        esc(widget.webchat_widget_id)
    } else if (widget.webchat_widget_id) {
      code += '<script>(function(){'
      code +=
        "var a=document.createElement('script');var m=document.getElementsByTagName('script')[0];a.async=1;a.setAttribute('charset','utf-8');a.src='" +
        esc(widget.chatServerUrl) +
        'wws?t=' +
        esc(tenant) +
        '&w=' +
        esc(widget.webchat_widget_id) +
        "';a.type='text/javascript';m.parentNode.insertBefore(a,m);})();</script>"
    } else {
      // for widget created in ver <= 1.1.2.2
      code += '<script>window.$brUCClientSidetabOption||(function(){'
      code += "var t='" + esc(tenant) + "';"
      code += "var u='" + esc(widget.chatServerUrl) + "';"
      code += "var w='" + esc(widget.widgetServerUrl) + "';"
      code +=
        'var option=window.$brUCClientSidetabOption={sidetabStyle:{},widgetProps:{url:w,cacheBust:' +
        cacheBust +
        '},initOption:{configurations:{},signInParams:{url:u,tenant:t}}};'
      if (widget.service_id) {
        var valueJson = JSON.stringify({
          properties: { webchat_service_id: widget.service_id },
        })
        code +=
          "option.initOption.configurations.webchatOptions=[{label:' ',value:'" +
          valueJson +
          "'}];"
      }
      code += widget.options
      code +=
        "var a=document.createElement('script');var m=document.getElementsByTagName('script')[0];a.async=1;a.setAttribute('charset','utf-8');a.src=w+'js/brekeke/ucclientsidetab/ucclientsidetab.js?'+option.widgetProps.cacheBust;a.type='text/javascript';m.parentNode.insertBefore(a,m);})();</script>"
    }
    require(['dijit/Dialog', 'dijit/form/SimpleTextarea'], function (
      Dialog,
      SimpleTextarea,
    ) {
      var dia = new Dialog({ closable: true })
      dia.addChild(
        new SimpleTextarea({
          value: code,
          readOnly: true,
          style:
            'width:' +
            window.innerWidth / 2 +
            'px;height:' +
            window.innerHeight / 2 +
            'px;',
          onClick: function onClick() {
            this && this.textbox && this.textbox.select && this.textbox.select()
          },
        }),
      )
      dia.show()
    })
  }
  /*
   * Function createLampTypeTr
   */ var createLampTypeTr = function createLampTypeTr(panel, name) {
    var inputs = []
    var tr = document.createElement('tr')
    var tdName = document.createElement('td')
    tdName.className = 'brUCLampTypeName'
    inputs[0] = document.createElement('span')
    inputs[0].className = 'brUCLampTypeInput'
    inputs[0].innerHTML = escapeHTML(name)
    tdName.appendChild(inputs[0])
    tr.appendChild(tdName)
    var tdDescription = document.createElement('td')
    tdDescription.className = 'brUCLampTypeDescription'
    inputs[1] = document.createElement('input')
    inputs[1].className = 'brUCLampTypeInput'
    inputs[1].type = 'text'
    tdDescription.appendChild(inputs[1])
    tr.appendChild(tdDescription)
    var tdOptions = document.createElement('td')
    tdOptions.className = 'brUCLampTypeOptions'
    inputs[2] = document.createElement('textarea')
    inputs[2].className = 'brUCLampTypeInput'
    inputs[2].rows = '3'
    tdOptions.appendChild(inputs[2])
    tr.appendChild(tdOptions)
    var tdDelete = document.createElement('td')
    tdDelete.className = 'brUCDeleteLampType'
    var inputDelete = document.createElement('input')
    inputDelete.className = 'brUCDeleteLampType'
    inputDelete.type = 'image'
    inputDelete.src = 'img/delete.png'
    inputDelete.alt = 'Delete'
    inputDelete.title = 'Delete'
    tdDelete.appendChild(inputDelete)
    tr.appendChild(tdDelete)
    panel.tbodyLampTypes.appendChild(tr) // register event
    panel.handlers.push(
      dojo.connect(
        inputDelete,
        'click',
        getFuncApply(panelTenantPropertyButtonDeleteLampType_click, {
          panel: panel,
        }),
      ),
    )
    return inputs
  }
  /*
   * Function createCustomizeTTr
   */ var createCustomizeTTr = function createCustomizeTTr(panel) {
    var configProperties = chatClient.getConfigProperties()
    var schedules = string(
      configProperties.optional_config &&
        configProperties.optional_config.customize_t_schedules,
    ).split('\n')
    var inputs = []
    var tr = document.createElement('tr')
    var tdIdx = document.createElement('td')
    tdIdx.className = 'brUCCustomizeTIdx'
    var olIdx = document.createElement('ol')
    inputs[0] = document.createElement('li')
    inputs[0].className = 'brUCCustomizeTInput'
    olIdx.appendChild(inputs[0])
    tdIdx.appendChild(olIdx)
    tr.appendChild(tdIdx)
    var tdSchedule = document.createElement('td')
    tdSchedule.className = 'brUCCustomizeTSchedule'
    inputs[1] = document.createElement('select')
    inputs[1].className = 'brUCCustomizeTInput'
    tdSchedule.appendChild(inputs[1])
    for (var i = 0; i < (schedules.length - 1) / 2; i++) {
      var option = document.createElement('option')
      option.innerHTML = schedules[i * 2 + 1]
      option.value = schedules[i * 2]
      inputs[1].appendChild(option)
    }
    tr.appendChild(tdSchedule)
    var tdService = document.createElement('td')
    tdService.className = 'brUCCustomizeService'
    inputs[2] = document.createElement('select')
    inputs[2].className = 'brUCCustomizeTInput'
    tdService.appendChild(inputs[2])
    var optionOff = document.createElement('option')
    optionOff.innerHTML = 'off'
    optionOff.value = '0'
    inputs[2].appendChild(optionOff)
    var optionOn = document.createElement('option')
    optionOn.innerHTML = 'on'
    optionOn.value = '1'
    inputs[2].appendChild(optionOn)
    tr.appendChild(tdService)
    var tdMessage = document.createElement('td')
    tdMessage.className = 'brUCCustomizeTMessage'
    inputs[3] = document.createElement('textarea')
    inputs[3].className = 'brUCCustomizeTInput'
    inputs[3].rows = '4'
    inputs[3].cols = '70'
    tdMessage.appendChild(inputs[3])
    tdMessage.appendChild(document.createElement('br'))
    inputs[4] = document.createElement('textarea')
    inputs[4].className = 'brUCCustomizeTInput'
    inputs[4].rows = '4'
    inputs[4].cols = '70'
    tdMessage.appendChild(inputs[4])
    tr.appendChild(tdMessage)
    var tdDelete = document.createElement('td')
    tdDelete.className = 'brUCDeleteCustomizeT'
    var inputDelete = document.createElement('input')
    inputDelete.className = 'brUCDeleteCustomizeT'
    inputDelete.type = 'image'
    inputDelete.src = 'img/delete.png'
    inputDelete.alt = 'Delete'
    inputDelete.title = 'Delete'
    tdDelete.appendChild(inputDelete)
    tr.appendChild(tdDelete)
    panel.tbodyCustomizeTs.appendChild(tr) // register event
    panel.handlers.push(
      dojo.connect(
        inputDelete,
        'click',
        getFuncApply(panelTenantPropertyButtonDeleteCustomizeT_click, {
          panel: panel,
        }),
      ),
    )
    return inputs
  }
  /*
   * Function displayTenantSettings
   */ var displayTenantSettings = function displayTenantSettings(panel) {
    var tenantSettings = tenantSettingsWorkData[panel.panelKey]
    panel.tbodyTenantList.innerHTML = ''
    var keys = Object.keys(tenantSettings)
    keys.sort()
    for (var i = 0; i < keys.length; i++) {
      var tenant = keys[i]
      var setting = tenantSettings[tenant]
      if (!setting.enabled) {
        continue
      }
      var tr = document.createElement('tr')
      var td1 = document.createElement('td')
      td1.innerHTML = escapeHTML(tenant)
      tr.appendChild(td1)
      var tdMaxLoginUsers = document.createElement('td')
      var textBoxMaxLoginUsers = document.createElement('input')
      textBoxMaxLoginUsers.type = 'text'
      textBoxMaxLoginUsers.value = string(setting.limit)
      tdMaxLoginUsers.appendChild(textBoxMaxLoginUsers)
      tr.appendChild(tdMaxLoginUsers)
      var tdDelete = document.createElement('td')
      var buttonDelete = document.createElement('input')
      buttonDelete.type = 'image'
      buttonDelete.src = 'img/delete.png'
      buttonDelete.alt = 'Delete'
      buttonDelete.title = 'Delete'
      tdDelete.appendChild(buttonDelete)
      tr.appendChild(tdDelete)
      panel.tbodyTenantList.appendChild(tr) // register event
      panel.handlers.push(
        dojo.connect(
          textBoxMaxLoginUsers,
          'blur',
          panelTenantSettingsTextBoxMaxLoginUsers_blur_getFunc(panel, tenant),
        ),
      )
      panel.handlers.push(
        dojo.connect(
          buttonDelete,
          'click',
          panelTenantSettingsButtonDelete_click_getFunc(panel, tenant),
        ),
      )
    }
    displayTotalMaxLoginUsers(panel)
  }
  /*
   * Function displayTotalMaxLoginUsers
   */ var displayTotalMaxLoginUsers = function displayTotalMaxLoginUsers(
    panel,
  ) {
    var tenantSettings = tenantSettingsWorkData[panel.panelKey]
    var total = 0
    for (var tenant in tenantSettings) {
      if (tenantSettings[tenant].enabled) {
        var limit = int(tenantSettings[tenant].limit)
        if (
          limit < 0 ||
          string(tenantSettings[tenant].limit) !== string(limit)
        ) {
          panel.spanTotalMaxLoginUsers.innerHTML = ucMsgs.LBL_MAX_LOGIN_INVALID
          return
        }
        total += limit
      }
    }
    panel.spanTotalMaxLoginUsers.innerHTML = total
  }
  /*
   * Function saveAdvancedSettings
   */ var saveAdvancedSettings = function saveAdvancedSettings(panel) {
    panel.buttonSaveAdvancedSettings.set('disabled', true)
    panel.spanMessage.style.display = 'none'
    chatClient.saveAdvancedSettings(
      panel.advanced_settings.value,
      function (ev) {
        // funcOK
        chatClient.loadAdvancedSettings(
          function (ev) {
            // funcOK
            panel.advanced_settings.value = ev.advancedSettings
          },
          function (ev) {
            // funcError
            logger.log(
              'warn',
              'loadAdvancedSettings error code: ' +
                ev.code +
                ', message: ' +
                ev.message,
            )
          },
        )
        panel.spanMessage.innerHTML =
          ucMsgs.MSG_SAVE_ADVANCED_SUCCESSFUL + ' ' + formatTimeNowWithSecond()
        panel.spanMessage.style.display = 'inline-block'
        panel.panelAdvancedSettingsTable.domNode.scrollTop = 0
        panel.buttonSaveAdvancedSettings.set('disabled', false)
      },
      function (ev) {
        // funcError
        logger.log(
          'warn',
          'saveAdvancedSettings error code: ' +
            ev.code +
            ', message: ' +
            ev.message,
        )
        panel.spanMessage.innerHTML =
          ucMsgs.MSG_SAVE_ADVANCED_FAILED +
          ' (' +
          ev.code +
          ' ' +
          ev.message +
          ')'
        panel.spanMessage.style.display = 'inline-block'
        panel.panelAdvancedSettingsTable.domNode.scrollTop = 0
        panel.buttonSaveAdvancedSettings.set('disabled', false)
      },
    )
  }
  /*
   * Function blinkingUntilSelecting
   */ var blinkingUntilSelecting = function blinkingUntilSelecting(
    panel,
    onSelect,
  ) {
    // blink tab until selecting
    if (panel.attr('selected')) {
      // panel selected
      if (onSelect) {
        // raise event now without blinking
        onSelect({ alreadySelected: true })
      }
    } else {
      // panel not selected
      // start blinking
      dojo.addClass(panel.controlButton.titleNode, 'brUCBackgroundBlinking') // stop blinking on selected
      panel.registerSelectedEvent(function () {
        // stop blinking
        dojo.removeClass(
          panel.controlButton.titleNode,
          'brUCBackgroundBlinking',
        )
      })
      if (onSelect) {
        // raise event on selected
        panel.registerSelectedEvent(
          onSelect.bind(this, { alreadySelected: false }),
        )
      }
    }
  }
  /*
   * Function startHighlight
   */ var startHighlight = function startHighlight(message) {
    // scroll message on browser title bar
    if (highlightObject !== null) {
      stopHighlight()
    }
    var body = message.length <= 40 ? message : message.substr(0, 37) + '...'
    var orgTitle = document.title
    var index = 0
    var funcHighlight = function funcHighlight() {
      if (highlightObject === null) {
        return
      }
      document.title = body.substr(index) //index++;
      //if (index > body.length - 5) {
      //    index = 0;
      //}
      //
      //highlightObject.timer = setTimeout(funcHighlight, 200);
    }
    highlightObject = {
      orgTitle: orgTitle,
      timer: setTimeout(funcHighlight, 200),
    }
  }
  /*
   * Function stopHighlight
   */ var stopHighlight = function stopHighlight() {
    if (highlightObject !== null) {
      clearTimeout(highlightObject.timer)
      document.title = highlightObject.orgTitle
      highlightObject = null
    }
  }
  /*
   * Function permitNotification
   */ var permitNotification = function permitNotification() {
    if (Brekeke.WebNotification) {
      Brekeke.WebNotification.requestPermission({
        callback: function callback(result) {
          logger.log(
            'info',
            'WebNotification.requestPermission result=' + result,
          )
        },
      })
    } else {
      logger.log('info', 'not found Brekeke.WebNotification')
    }
  }
  /*
   * Function startNotification
   */ var startNotification = function startNotification(
    title,
    message,
    icon,
    onClickNotification,
    onStopNotification,
  ) {
    if (Brekeke.WebNotification) {
      // show notification popup on desktop (near task bar)
      stopNotification()
      var body = message.length <= 40 ? message : message.substr(0, 37) + '...'
      var settings = chatClient.getSettings()
      if (
        settings.optional_settings &&
        settings.optional_settings.webnotif_status === 'off'
      ) {
        return
      }
      var webnotif_timeout =
        (settings.optional_settings &&
          settings.optional_settings.webnotif_status === 'manual' &&
          int(settings.optional_settings.webnotif_timeout)) ||
        chatClient.getConfigProperties().webnotif_timeout ||
        86400000
      var browser = getBrowser()
      notificationObjects.push(
        Brekeke.WebNotification.showNotification({
          timeout: webnotif_timeout,
          interval:
            browser === 'Firefox'
              ? NOTIFICATION_DURATION_FIREFOX
              : NOTIFICATION_DURATION_CHROME,
          title: title,
          body: body,
          icon: icon,
          noisiness: 1,
          onclick: function onclick() {
            if (!document.hasFocus()) {
              window.focus()
            }
            if (onClickNotification) {
              onClickNotification()
            }
            stopNotification()
          },
          onclose: onStopNotification,
        }),
      )
    } else {
      logger.log('info', 'not found Brekeke.WebNotification')
    }
  }
  /*
   * Function stopNotification
   */ var stopNotification = function stopNotification() {
    if (Brekeke.WebNotification) {
      var notificationObject
      while ((notificationObject = notificationObjects.pop())) {
        Brekeke.WebNotification.closeNotification({
          notificationId: notificationObject,
        })
      }
    } else {
      logger.log('info', 'not found Brekeke.WebNotification')
    }
  }
  /*
   * GUI event listeners
   */ var brFrame_sidemenuSettingsMenuSelected =
    function brFrame_sidemenuSettingsMenuSelected(id) {
      var profile = chatClient.getProfile()
      if (id === 'menuItemPreference') {
        openPreference(null, null, true)
      } else if (id === 'menuItemHistory') {
        openHistory(null, null, true)
      } else if (id === 'menuItemHistorySearch') {
        openHistorySearch(null, null, true, null, true)
      } else if (id === 'menuItemWebchatQueue') {
        displayWebchatQueue(openWebchatQueue(null, null, true), null)
      } else if (id === 'menuItemServerSettings') {
        openServerSettings(null, null, true)
      } else if (id === 'menuItemTenantSettings') {
        openTenantTable(null, null, true)
      } else if (id === 'menuItemTenantProperty') {
        if (brLogin.bcAuthPBX && brLogin.mustGetMT) {
          windowAlert(ucMsgs.CMN_ALERT, 'pbx server is not ready')
        } else {
          openTenantProperty(
            chatClient.getProfile().tenant || brLogin.stDefaultTenant,
            null,
            null,
            true,
          )
        }
      } else if (id === 'menuItemAdvancedSettings') {
        openAdvancedSettings(null, null, true)
      } else if (id === 'menuItemSoftwareUpdate') {
        openSoftwareUpdate(null, null, true)
      } else if (id === 'menuItemActivateLicense') {
        openActivateLicense(null, null, true)
      } else if (id === 'menuItemTwitterSettings') {
        if (brLogin.bcAuthPBX && brLogin.mustGetMT) {
          windowAlert(ucMsgs.CMN_ALERT, 'pbx server is not ready')
        } else {
          openTwitterSettings(
            (brLogin.multitenant && profile.tenant) || null,
            null,
            null,
            true,
          )
        }
      } else if (id === 'menuItemFacebookSettings') {
        if (brLogin.bcAuthPBX && brLogin.mustGetMT) {
          windowAlert(ucMsgs.CMN_ALERT, 'pbx server is not ready')
        } else {
          openFacebookSettings(
            (brLogin.multitenant && profile.tenant) || null,
            null,
            null,
            true,
          )
        }
      } else if (id === 'menuItemLineSettings') {
        if (brLogin.bcAuthPBX && brLogin.mustGetMT) {
          windowAlert(ucMsgs.CMN_ALERT, 'pbx server is not ready')
        } else {
          openLineSettings(
            (brLogin.multitenant && profile.tenant) || null,
            null,
            null,
            true,
          )
        }
      } else if (id === 'menuItemWatsonSettings') {
        if (brLogin.bcAuthPBX && brLogin.mustGetMT) {
          windowAlert(ucMsgs.CMN_ALERT, 'pbx server is not ready')
        } else {
          openWatsonSettings(
            (brLogin.multitenant && profile.tenant) || null,
            null,
            null,
            true,
          )
        }
      } else if (id === 'menuItemEmailSettings') {
        if (brLogin.bcAuthPBX && brLogin.mustGetMT) {
          windowAlert(ucMsgs.CMN_ALERT, 'pbx server is not ready')
        } else {
          openEmailSettings(
            (brLogin.multitenant && profile.tenant) || null,
            null,
            null,
            true,
          )
        }
      } else if (id === 'menuItemGuestSettings') {
        if (brLogin.bcAuthPBX && brLogin.mustGetMT) {
          windowAlert(ucMsgs.CMN_ALERT, 'pbx server is not ready')
        } else {
          openGuestSettings(
            (brLogin.multitenant && profile.tenant) || null,
            null,
            null,
            true,
          )
        }
      } else if (id === 'menuItemAbout') {
        windowAlert(
          formatStr(ucMsgs.LBL_ABOUT_TITLE, brLogin.productname.title),
          brLogin.about,
        )
      } else if (id === 'menuItemSignOut') {
        signOut()
      } else {
        logger.log(
          'error',
          'brFrame_sidemenuSettingsMenuSelected called by id==' + id,
        )
      }
    }
  var brFrame_afterUpdateView = function brFrame_afterUpdateView() {
    if (panelSplittable) {
      panelSplittable.domNode.style.width =
        document.body.offsetWidth -
        (this._sidemenuOpenStatus ? this.sidemenu.width : 0) +
        'px'
      panelSplittable.domNode.style.height = document.body.offsetHeight + 'px'
      panelSplittable.resize()
    }
    if (sidePaneWidget) {
      if (this._sidemenuOpenStatus) {
        brFrame.sidemenu.resize()
      }
    }
    if (menuResizer) {
      if (this._sidemenuOpenStatus && this.domNode.style.display !== 'none') {
        menuResizer.domNode.style.display = ''
        menuResizer.domNode.style.left = this.sidemenu.width + 'px'
        menuResizer.domNode.style.top = '0px'
        menuResizer.domNode.style.height = document.body.offsetHeight + 'px'
      } else {
        menuResizer.domNode.style.display = 'none'
      }
    }
  }
  var brFrame_onSideMenuHandleClick = function brFrame_onSideMenuHandleClick() {
    menuResizer.domNode.style.display = 'none'
    this.toggle()
  }
  var sidePaneWidget_onMouseEnter = function sidePaneWidget_onMouseEnter() {
    sidePaneWidget.domNode.style.overflowY = 'auto'
  }
  var sidePaneWidget_onMouseLeave = function sidePaneWidget_onMouseLeave() {
    sidePaneWidget.domNode.style.overflowY = 'hidden'
    var sidemenuwidth = menuResizer.domNode.offsetLeft
    brFrame.set('sidemenuwidth', sidemenuwidth + 1)
    brFrame.updateView()
    brFrame.set('sidemenuwidth', sidemenuwidth)
    brFrame.updateView()
  }
  var menuItemStatus_onClick = function menuItemStatus_onClick() {
    var status
    if (this === sidePaneWidget.menuItemStatusOffline) {
      status = Constants.STATUS_OFFLINE
    } else if (this === sidePaneWidget.menuItemStatusAvailable) {
      status = Constants.STATUS_AVAILABLE
    } else if (this === sidePaneWidget.menuItemStatusBusy) {
      status = Constants.STATUS_BUSY
    } else {
      logger.log('error', 'menuItemStatus_onClick called by unknown element')
      return
    }
    if (status !== myStatus.status) {
      if (status === Constants.STATUS_OFFLINE) {
        for (var conf_id in panelsConference) {
          var conference = chatClient.getConference(conf_id)
          if (
            conference.conf_status !== Constants.CONF_STATUS_INACTIVE &&
            conference.conf_type !== 'webchat'
          ) {
            // leave conference
            leaveConference(conf_id, true)
          }
        }
      }
      changeStatus(status, '')
    }
  }
  var textBoxDisplay_onBlur = function textBoxDisplay_onBlur() {
    if (this.attr('value') !== myStatus.display) {
      var display = this.attr('value')
      changeStatus(myStatus.status, display)
      memoryStatusDisplay(display)
    }
  }
  var textBoxDisplay_onKeyUp = function textBoxDisplay_onKeyUp(e) {
    var downedKey = keyDownUtil.getKey()
    if (e.keyCode === 13 && downedKey === 13) {
      if (this.attr('value') !== myStatus.display) {
        var display = this.attr('value')
        changeStatus(myStatus.status, display)
        memoryStatusDisplay(display)
      }
    }
  }
  var textBoxDisplay_onInput = function textBoxDisplay_onInput(e) {
    this.brLastInputTime = +new Date()
    setTimeout(
      getFuncApply(function () {
        if (this.focused && this.brLastInputTime + 4500 <= +new Date()) {
          sidePaneWidget.buttonDummy.focus()
        }
      }, this),
      5000,
    )
  }
  var menuItemDisplayEmpty_onClick = function menuItemDisplayEmpty_onClick() {
    if (myStatus.display !== '') {
      changeStatus(myStatus.status, '')
    }
  }
  var menuItemDisplay_onClick = function menuItemDisplay_onClick(e) {
    var settings = chatClient.getSettings()
    var index = int(
      this.dojoAttachPoint &&
        this.dojoAttachPoint.substr('menuItemDisplay'.length),
    )
    if (
      e.target &&
      e.target.className &&
      e.target.className.indexOf('dijitMenuArrowCell') !== -1
    ) {
      // delete
      settings.optional_settings &&
        settings.optional_settings.status_display_history &&
        settings.optional_settings.status_display_history.splice(index, 1)
      chatClient.saveProperties(
        null,
        settings,
        null,
        displayMenuItemStatusDisplay,
        null,
      )
      sidePaneWidget.dropDownButtonDisplay.openDropDown()
    } else {
      // change status display
      var display =
        settings.optional_settings &&
        settings.optional_settings.status_display_history &&
        settings.optional_settings.status_display_history[index]
      if (display) {
        if (display !== myStatus.display) {
          changeStatus(myStatus.status, display)
          memoryStatusDisplay(display)
        }
      }
    }
  }
  var buttonAddBuddy_onClick = function buttonAddBuddy_onClick() {
    sidePaneWidget.buttonDummy.focus()
  }
  var buttonAddGroup_onClick = function buttonAddGroup_onClick() {
    sidePaneWidget.buttonDummy.focus()
    windowPrompt(
      ucMsgs.LBL_ADD_GROUP_TITLE,
      '',
      ucMsgs.LBL_ADD_GROUP_NAME,
      '',
      function (name) {
        createGroup(name)
      },
      null,
    )
  }
  var buttonConference_onClick = function buttonConference_onClick() {
    sidePaneWidget.buttonDummy.focus()
    windowPrompt(
      ucMsgs.LBL_CREATE_CONFERENCE_TITLE,
      '',
      ucMsgs.LBL_CREATE_CONFERENCE_SUBJECT,
      '',
      function (subject) {
        var invite = []
        createConference(subject, invite)
      },
      null,
    )
  }
  var buttonBroadcast_onClick = function buttonBroadcast_onClick() {
    sidePaneWidget.buttonDummy.focus()
    openBroadcast(null, null, true)
  }
  var buttonMakeCall_onClick = function buttonMakeCall_onClick() {
    sidePaneWidget.buttonDummy.focus()
    openExternalCall('', null, null, null, true)
  }
  var buttonSplitUpDown_onClick = function buttonSplitUpDown_onClick() {
    sidePaneWidget.buttonDummy.focus()
    var icon = dojo.query(
      '.brUCButtonIconTool',
      sidePaneWidget.buttonSplitUpDown.domNode,
    )
    if (splitDirection === 'leftright updown') {
      splitDirection = 'leftright'
      icon.removeClass('brUCButtonIconToolPushed')
    } else if (splitDirection === 'updown') {
      splitDirection = ''
      icon.removeClass('brUCButtonIconToolPushed')
    } else if (splitDirection === 'leftright') {
      splitDirection = 'leftright updown'
      icon.addClass('brUCButtonIconToolPushed')
    } else {
      splitDirection = 'updown'
      icon.addClass('brUCButtonIconToolPushed')
    }
    displaySplittable()
  }
  var buttonSplitLeftRight_onClick = function buttonSplitLeftRight_onClick() {
    sidePaneWidget.buttonDummy.focus()
    var icon = dojo.query(
      '.brUCButtonIconTool',
      sidePaneWidget.buttonSplitLeftRight.domNode,
    )
    if (splitDirection === 'leftright updown') {
      splitDirection = 'updown'
      icon.removeClass('brUCButtonIconToolPushed')
    } else if (splitDirection === 'leftright') {
      splitDirection = ''
      icon.removeClass('brUCButtonIconToolPushed')
    } else if (splitDirection === 'updown') {
      splitDirection = 'leftright updown'
      icon.addClass('brUCButtonIconToolPushed')
    } else {
      splitDirection = 'leftright'
      icon.addClass('brUCButtonIconToolPushed')
    }
    displaySplittable()
  }
  var textBoxFilter_onBlur = function textBoxFilter_onBlur() {
    if (this.attr('value') !== buddylistFilter) {
      buddylistFilter = this.attr('value')
      displayBuddylist(false)
    }
  }
  var textBoxFilter_onKeyUp = function textBoxFilter_onKeyUp(e) {
    if (this.attr('value') !== buddylistFilter) {
      buddylistFilter = this.attr('value')
      displayBuddylist(false)
    }
  }
  var checkBoxOnlineOnly_onChange = function checkBoxOnlineOnly_onChange(e) {
    if (e !== buddylistOnlineOnly) {
      buddylistOnlineOnly = e
      cookiePreference.onlineOnly = e ? 'true' : ''
      saveCookiePreference()
      displayBuddylist(false)
    }
  }
  var storeBuddylist_getChildren = function storeBuddylist_getChildren(object) {
    return this.query({ group: object.id })
  }
  var dndSourceBuddylist_copyState = function dndSourceBuddylist_copyState(
    keyPressed,
  ) {
    // ignore control key
    return false
  }
  var dndSourceBuddylist_checkItemAcceptance =
    function dndSourceBuddylist_checkItemAcceptance(target, source, position) {
      if (source.panelTab) {
        // dragged from tab panel
        return false // do not drop to buddylist tree
      }
      if (
        chatClient.getConfigProperties().buddy_mode ===
        Constants.BUDDY_MODE_AUTO
      ) {
        return false
      }
      var targetItem = null
      var sourceIsUser = false
      var sourceIsGroup = false
      try {
        targetItem = require('dijit/registry').getEnclosingWidget(target).item
        for (var id in source.selection) {
          if (source.selection[id].item && source.selection[id].item.user_id) {
            // user
            sourceIsUser = true
          } else if (
            source.selection[id].item &&
            !source.selection[id].item.showMore
          ) {
            // group
            sourceIsGroup = true
          }
        }
      } catch (e) {
        logger.log('error', e.message)
        return false
      }
      if (!sourceIsUser && !sourceIsGroup) {
        // source is not including user or group
        return false // do not drop
      }
      if (sourceIsUser && sourceIsGroup) {
        // source is including both user and group
        return false // do not drop
      }
      if (targetItem) {
        if (position === 'before' || position === 'after') {
          if (sourceIsUser) {
            // source is user
            if (targetItem.user_id) {
              // target is user
              return true
            } else if (!targetItem.showMore) {
              // target is group
              return true
            }
          } else {
            // source is group
            if (targetItem.user_id) {
              // target is user
              if (targetItem.group === ROOT_GROUP_ID) {
                // directly under root
                return true
              }
            } else if (!targetItem.showMore) {
              // target is group
              if (targetItem.group === ROOT_GROUP_ID) {
                // directly under root
                return true
              }
            }
          }
        } else if (position === 'over') {
          if (sourceIsUser) {
            // source is user
            if (!targetItem.user_id && !targetItem.showMore) {
              // target is group
              return true
            }
          }
        }
      }
      return false
    }
  var dndSourceBuddylist_onDndDrop = function dndSourceBuddylist_onDndDrop(
    source,
    nodes,
    copy,
    target,
  ) {
    var targetItem = null
    var position = null
    if (source.targetAnchor) {
      targetItem = source.targetAnchor.item
    }
    if (source.dropPosition) {
      position = source.dropPosition.toLowerCase()
    }
    this.onDndCancel()
    if (this !== target) {
      return
    }
    if (targetItem && position) {
      require(['dijit/registry'], function (registry) {
        var iBegin = 0
        var iEnd = nodes.length - 1
        var iIncrement = 1
        if (position === 'before') {
          iBegin = nodes.length - 1
          iEnd = 0
          iIncrement = -1
        }
        for (var i = iBegin; i !== iEnd + iIncrement; i += iIncrement) {
          var sourceWidget = registry.getEnclosingWidget(nodes[i])
          if (sourceWidget) {
            var sourceItem = sourceWidget.item
            if (sourceItem) {
              moveBuddy(targetItem, sourceItem, position)
            }
          }
        }
      })
    }
  }
  var treeBuddylist_getIconClass = function treeBuddylist_getIconClass(
    item,
    opened,
  ) {
    var iconClass = 'brUCTreeIcon'
    if (!item.user_id && !item.showMore) {
      // group
      if (opened) {
        iconClass += ' brUCIconFolderOpened'
      } else {
        iconClass += ' brUCIconFolderClosed'
      }
    }
    if (item.showMore) {
      // show more
      iconClass += ' brUCIconShowMoreItem'
    }
    return iconClass
  }
  var treeBuddylist_getTooltip = function treeBuddylist_getTooltip(item) {
    return string(item && item.name)
  }
  var treeBuddylist_onClick = function treeBuddylist_onClick(item, node, evt) {
    if (item.user_id) {
      // user
      openChat(item.tenant, item.user_id, null, null, true)
    } else if (item.showMore) {
      // show more
      showMoreBuddylist(item, SHOW_MORE_BUDDYLIST)
    }
  }
  var treeBuddylist_onOpen = function treeBuddylist_onOpen(item, node) {
    saveBuddylistOpenList()
  }
  var treeBuddylist_onClose = function treeBuddylist_onClose(item, node) {
    saveBuddylistOpenList()
  }
  var menuBuddylist_openMyself = function menuBuddylist_openMyself() {
    this.inherited(arguments)
    var self = this
    require(['dijit/registry'], function (registry) {
      var configProperties = chatClient.getConfigProperties()
      var item = registry.byNode(self.currentTarget).item
      var children = self.getChildren()
      for (var i = 0; i < children.length; i++) {
        var child = children[i]
        var visible = true
        var enabled = true
        if (child.id === 'menuBuddylistOpenChat') {
          visible = true
          enabled = true
        } else if (child.id === 'menuBuddylistInviteToConference') {
          visible = true
          enabled = false // check if the item can be invited to any conferences
          for (var conf_id in panelsConference) {
            var invite = checkInvitationAcceptance([item], conf_id)
            if (invite.length > 0) {
              enabled = true
              break
            }
          }
        } else if (child.id === 'menuBuddylistSendFile') {
          visible = Boolean(item.user_id)
          enabled = true
        } else if (child.id === 'menuBuddylistVoiceCall') {
          visible = Boolean(item.user_id)
          enabled = true
        } else if (child.id === 'menuBuddylistVideoCall') {
          visible = Boolean(item.user_id)
          enabled = getCallControlMode() !== 1
        } else if (child.id === 'menuBuddylistRemoveGroup') {
          visible =
            !Boolean(item.user_id) &&
            configProperties.buddy_mode !== Constants.BUDDY_MODE_AUTO
          enabled = true
        }
        if (item.showMore) {
          // show more
          enabled = false
        }
        child.domNode.style.display = visible ? '' : 'none'
        child.attr('disabled', !enabled)
      }
    })
  }
  var menuItemBuddylist_onClick = function menuItemBuddylist_onClick() {
    var child = this
    require(['dijit/registry'], function (registry) {
      var item = registry.byNode(child.getParent().currentTarget).item
      if (child.id === 'menuBuddylistOpenChat') {
        if (item.user_id) {
          // user
          openChat(item.tenant, item.user_id, null, null, true)
        } else if (!item.showMore) {
          // group
          var buddylist = chatClient.getBuddylist()
          var onTop = true
          for (var i = 0; i < buddylist.user.length; i++) {
            if (
              buddylist.user[i].group === item.id &&
              buddylist.user[i].user_id
            ) {
              openChat(
                buddylist.user[i].tenant,
                buddylist.user[i].user_id,
                null,
                null,
                onTop,
              )
              onTop = false
            }
          }
        }
      } else if (child.id === 'menuBuddylistInviteToConference') {
        var invite = []
        if (item.user_id) {
          // user
          invite.push({ tenant: item.tenant, user_id: item.user_id })
        } else if (!item.showMore) {
          // group
          var buddylist = chatClient.getBuddylist()
          for (var i = 0; i < buddylist.user.length; i++) {
            if (
              buddylist.user[i].group === item.id &&
              buddylist.user[i].user_id
            ) {
              invite.push({
                tenant: buddylist.user[i].tenant,
                user_id: buddylist.user[i].user_id,
              })
            }
          }
        }
        for (var conf_id in panelsConference) {
          var invite = checkInvitationAcceptance([item], conf_id)
          if (invite.length > 0) {
            // invite
            inviteToConference(conf_id, invite)
          }
        }
      } else if (child.id === 'menuBuddylistSendFile') {
        if (item.user_id) {
          // user
          var panel = openChat(item.tenant, item.user_id, null, null, true)
          inputFile(panel)
        }
      } else if (child.id === 'menuBuddylistVoiceCall') {
        if (item.user_id) {
          // user
          var panel = openChat(item.tenant, item.user_id, null, null, true)
          makeCall(panel, false)
        }
      } else if (child.id === 'menuBuddylistVideoCall') {
        if (item.user_id) {
          // user
          var panel = openChat(item.tenant, item.user_id, null, null, true)
          makeCall(panel, true)
        }
      } else if (child.id === 'menuBuddylistRemoveGroup') {
        if (!item.user_id && !item.showMore) {
          // group
          removeGroup(item.id)
        }
      }
    })
  }
  var menuResizerMover_onMouseMove = function menuResizerMover_onMouseMove(e) {
    var m = this.marginBox
    var l = m.l + e.pageX
    if (150 <= l && l <= document.body.offsetWidth - 150) {
      this.host.onMove(this, { l: l, t: 0 })
    }
    require(['dojo/_base/event'], function (event) {
      event.stop(e)
    })
  }
  var menuResizerMoveable_onMoveStop = function menuResizerMoveable_onMoveStop(
    e,
  ) {
    brFrame.set('sidemenuwidth', menuResizer.domNode.offsetLeft)
    brFrame.updateView()
  }
  var messageBar_create = function messageBar_create(domConstruct) {
    // message bar gui
    var dom = domConstruct.toDom(
      '<div class="brUCMessageBar"><img class="brUCMessageBarError" /><span></span><br /><a href="javascript:void(0)"></a><span></span> <a href="javascript:void(0)">' +
        ucMsgs.LBL_MESSAGE_BAR_STOP +
        '</a> <a href="javascript:void(0)">' +
        ucMsgs.LBL_MESSAGE_BAR_HIDE +
        '</a></div>',
    )
    dom.style.display = 'none'
    domConstruct.place(dom, brFrame.td_container, 'first')
    var linkGo = dojo.query('a', dom)[0]
    var msg1 = dojo.query('span', dom)[0]
    var msg2 = dojo.query('span', dom)[1]
    var linkStop = dojo.query('a', dom)[1]
    var linkHide = dojo.query('a', dom)[2]
    var btnShow = dojo.query('img', dom)[0]
    var auto1 = false
    var timeStart = 1
    var timeCur = 1
    var timer = null // cache image
    var dummyDom = domConstruct.toDom(
      '<div class="brUCMessageBar brUCMessageBarMinimized" style="height: 1px;"><img class="brUCMessageBarError" /><img src="img/disconnected.png" /></div>',
    )
    domConstruct.place(dummyDom, brLogin.domNode, 'last')
    setTimeout(function () {
      domConstruct.destroy(dummyDom)
    }, 100) // callback stub
    var callback = function callback(funcOK, funcError) {
      funcOK()
    } // click event
    var funcClick = function funcClick() {
      if (timer) {
        clearTimeout(timer)
      }
      linkGo.style.display = 'none'
      msg2.innerHTML = ucMsgs.LBL_MESSAGE_BAR_CONNECTING
      callback(
        function () {
          // funcOK
          dom.style.display = 'none'
        },
        function (msg) {
          // funcError
          if (msg) {
            msg1.innerHTML = msg
          }
          linkGo.style.display = 'inline'
          msg2.innerHTML = ''
          if (auto1) {
            // restart timer
            timeCur = timeStart
            msg2.innerHTML =
              ' ' + formatStr(ucMsgs.LBL_MESSAGE_BAR_TIME, timeCur)
            linkStop.style.display = 'inline'
            timer = setTimeout(_funcTimer, 1000)
          }
        },
      )
    }
    dojo.connect(linkGo, 'click', funcClick)
    dojo.connect(linkStop, 'click', function () {
      if (timer) {
        clearTimeout(timer)
      }
      if (msg2.innerHTML !== ucMsgs.LBL_MESSAGE_BAR_CONNECTING) {
        msg2.innerHTML = ''
      }
      linkStop.style.display = 'none'
      auto1 = false
    })
    dojo.connect(linkHide, 'click', function () {
      linkHide.style.display = 'none'
      btnShow.style.display = 'inline-block'
      dojo.addClass(dom, 'brUCMessageBarMinimized')
    })
    dojo.connect(btnShow, 'click', function () {
      linkHide.style.display = 'inline'
      btnShow.style.display = 'none'
      dojo.removeClass(dom, 'brUCMessageBarMinimized')
    }) // timer event
    var _funcTimer = function funcTimer() {
      timeCur--
      if (timeCur <= 0) {
        timeStart = Math.min(timeStart * 2, 300)
        funcClick()
      } else {
        msg2.innerHTML = ' ' + formatStr(ucMsgs.LBL_MESSAGE_BAR_TIME, timeCur)
        timer = setTimeout(_funcTimer, 1000)
      }
    } // messageBar object
    return {
      show: function show(msg, go, auto, func) {
        if (timer) {
          clearTimeout(timer)
        }
        msg1.innerHTML = msg
        linkGo.innerHTML = go
        linkGo.style.display = 'inline'
        msg2.innerHTML = ''
        linkStop.style.display = 'none'
        linkHide.style.display = 'inline'
        btnShow.style.display = 'none'
        dojo.removeClass(dom, 'brUCMessageBarMinimized')
        auto1 = auto
        callback = func
        if (auto1) {
          // start timer
          timeCur = timeStart
          msg2.innerHTML = ' ' + formatStr(ucMsgs.LBL_MESSAGE_BAR_TIME, timeCur)
          linkStop.style.display = 'inline'
          timer = setTimeout(_funcTimer, 1000)
        }
        dom.style.display = 'block'
      },
      hide: function hide() {
        if (timer) {
          clearTimeout(timer)
        }
        dom.style.display = 'none'
      },
      get auto() {
        return Boolean(auto1)
      },
      set auto(value) {
        if (value && !auto1) {
          timeCur = timeStart
          msg2.innerHTML = ' ' + formatStr(ucMsgs.LBL_MESSAGE_BAR_TIME, timeCur)
          linkStop.style.display = 'inline'
          timer = setTimeout(_funcTimer, 1000)
          auto1 = true
        } else if (!value && auto1) {
          if (timer) {
            clearTimeout(timer)
          }
          msg2.innerHTML = ''
          linkStop.style.display = 'none'
          auto1 = false
        }
      },
    }
  }
  var panelTab_postCreate = function panelTab_postCreate() {
    this.inherited(arguments)
    var self = this
    require([
      'dojo/dom-construct',
      'dojo/dnd/Target',
      'dojo/dnd/Source',
    ], function (domConstruct, Target, Source) {
      // dnd target (div appearing only when panel has no tab)
      var dndTargetDom = domConstruct.toDom(
        '<div style="width:100%; height:100%;"></div>',
      )
      domConstruct.place(dndTargetDom, self.containerNode, 'first')
      self.dndTarget = new Target(dndTargetDom, {
        panelTab: self,
        checkAcceptance: panelTabDndTarget_checkAcceptance,
        onDndDrop: panelTabDndTarget_onDndDrop,
      }) // dnd source (tablist)
      self.dndSource = new Source(self.tablist.containerNode, {
        panelTab: self,
        withHandles: false,
        horizontal: true,
        autoSync: true,
        singular: true,
        onDndStart: panelTabDndSource_onDndStart,
        checkAcceptance: panelTabDndSource_checkAcceptance,
        onDndDrop: panelTabDndSource_onDndDrop,
      })
    })
  }
  var panelTab_destroy = function panelTab_destroy() {
    this.dndSource.destroy()
    this.dndTarget.destroy()
    this.inherited(arguments)
  }
  var panelTab_addChild = function panelTab_addChild(child, insertIndex) {
    this.dndTarget.node.style.display = 'none'
    this.inherited(arguments)
    if (child.onAddedToTab) {
      child.onAddedToTab()
    }
    if (child.controlButton.domNode) {
      this.dndIdentifierCount++
      child.dndIdentifier = this.dndIdentifierCount
      child.controlButton.domNode.dndIdentifier = this.dndIdentifierCount
      dojo.addClass(child.controlButton.domNode, 'dojoDndItem')
      child.mouseEnterHandler = dojo.connect(
        child.controlButton,
        'onMouseEnter',
        panelTabChildControlButton_onMouseEnter,
      )
      child.mouseLeaveHandler = dojo.connect(
        child.controlButton,
        'onMouseLeave',
        panelTabChildControlButton_onMouseLeave,
      )
    } else {
      logger.log('error', 'not initialized domNode of controlButton')
    }
    if (this.tabOrderInitialized) {
      if (insertIndex || insertIndex === 0) {
        // inserted to the specified position
        // reset tab order of all children
        var children = this.getChildren()
        for (var i = 0; i < children.length; i++) {
          children[i].tabOrder = i + 1
        }
      } else {
        // added to the last position
        // set tab order of the added child
        var maxTabOrder = 0
        var children = this.getChildren()
        for (var i = 0; i < children.length; i++) {
          if (maxTabOrder < children[i].tabOrder) {
            maxTabOrder = children[i].tabOrder
          }
        }
        child.tabOrder = maxTabOrder + 1
      }
    }
  }
  var panelTab_removeChild = function panelTab_removeChild(page) {
    if (page.mouseEnterHandler) {
      dojo.disconnect(page.mouseEnterHandler)
    }
    if (page.mouseLeaveHandler) {
      dojo.disconnect(page.mouseLeaveHandler)
    }
    if (page.onRemovingFromTab) {
      page.onRemovingFromTab()
    }
    this.inherited(arguments)
    if (this.getChildren().length === 0) {
      this.dndTarget.node.style.display = 'block'
    }
  }
  var panelTab_selectChild = function panelTab_selectChild(page, animate) {
    this.inherited(arguments) // stop lamp
    if (
      lampObject &&
      lampObject.jingle &&
      lampObject.jingle.panelKey === page.panelKey
    ) {
      lampObject.panelSelected = true
      if (lampObject.windowFocused) {
        lampObject.jingle = null
        lampObject.changeLamp(lampObject)
      }
    } // fire selectedEvents
    if (page.selectedEvents && page.selectedEvents.length) {
      while (page.selectedEvents.length) {
        page.selectedEvents.pop()()
      }
    }
  }
  var panelTabDndTarget_checkAcceptance =
    function panelTabDndTarget_checkAcceptance(source, nodes) {
      if (!source.panelTab) {
        // dragged from buddylist tree
        var sourceIsUser = false
        var sourceIsGroup = false
        try {
          for (var id in source.selection) {
            if (
              source.selection[id].item &&
              source.selection[id].item.user_id
            ) {
              // user
              sourceIsUser = true
            } else if (
              source.selection[id].item &&
              !source.selection[id].item.showMore
            ) {
              // group
              sourceIsGroup = true
            }
          }
        } catch (e) {
          logger.log('error', e.message)
          return false
        }
        if (!sourceIsUser || sourceIsGroup) {
          // source must be only user
          return false
        }
      }
      if (this.panelTab.getChildren().length === 0) {
        // tab panel is empty
        return true
      } else {
        return false
      }
    }
  var panelTabDndTarget_onDndDrop = function panelTabDndTarget_onDndDrop(
    source,
    nodes,
    copy,
    target,
  ) {
    this.onDndCancel()
    if (this === target) {
      if (source.panelTab) {
        // dragged from tab panel
        for (var i = 0; i < nodes.length; i++) {
          var sourceChildren = source.panelTab.getChildren()
          var child = null
          for (var j = 0; j < sourceChildren.length; j++) {
            if (sourceChildren[j].dndIdentifier === nodes[i].dndIdentifier) {
              child = sourceChildren[j]
            }
          }
          if (child) {
            source.panelTab.removeChild(child)
            target.panelTab.addChild(child, null)
            target.panelTab.selectChild(child)
          }
        }
      } else {
        // dragged from buddylist tree
        try {
          for (var id in source.selection) {
            if (
              source.selection[id].item &&
              source.selection[id].item.user_id
            ) {
              // user
              openChat(
                source.selection[id].item.tenant,
                source.selection[id].item.user_id,
                target.panelTab,
                null,
                true,
              )
            }
          }
        } catch (e) {
          logger.log('error', e.message)
        }
      }
    }
  }
  var panelTabDndSource_onDndStart = function panelTabDndSource_onDndStart(
    source,
    nodes,
    copy,
  ) {
    if (this.autoSync) {
      this.sync()
    }
    if (this.isSource) {
      this._changeState(
        'Source',
        this == source ? (copy ? 'Copied' : 'Moved') : '',
      )
    }
    var accepted = this.accept && this.checkAcceptance(source, nodes)
    this._changeState('Target', accepted ? '' : 'Disabled')
    if (this == source) {
      dojo.dnd.Manager.manager().overSource(this)
    }
    this.isDragging = true
  }
  var panelTabDndSource_checkAcceptance =
    function panelTabDndSource_checkAcceptance(source, nodes) {
      if (
        chatClient.getProfile().user_type ===
          Constants.USER_TYPE_SYSTEM_ADMIN ||
        mySignInParams.admin_mode
      ) {
        // sa
        return false
      }
      if (!source.panelTab) {
        // dragged from buddylist tree
        var sourceIsUser = false
        var sourceIsGroup = false
        try {
          for (var id in source.selection) {
            if (
              source.selection[id].item &&
              source.selection[id].item.user_id
            ) {
              // user
              sourceIsUser = true
            } else if (
              source.selection[id].item &&
              !source.selection[id].item.showMore
            ) {
              // group
              sourceIsGroup = true
            }
          }
        } catch (e) {
          logger.log('error', e.message)
          return false
        }
        if (!sourceIsUser || sourceIsGroup) {
          // source must be only user
          return false
        }
      }
      return true
    }
  var panelTabDndSource_onDndDrop = function panelTabDndSource_onDndDrop(
    source,
    nodes,
    copy,
    target,
  ) {
    this.onDndCancel()
    if (this === target) {
      var targetIndex = null
      if (target.panelTab.dndTargetIdentifier !== null) {
        var targetChildren = target.panelTab.getChildren()
        for (var i = 0; i < targetChildren.length; i++) {
          if (
            targetChildren[i].dndIdentifier ===
            target.panelTab.dndTargetIdentifier
          ) {
            targetIndex = target.panelTab.getIndexOfChild(targetChildren[i])
            break
          }
        }
      }
      if (source.panelTab) {
        // dragged from tab panel
        for (var i = 0; i < nodes.length; i++) {
          var sourceChildren = source.panelTab.getChildren()
          var child = null
          for (var j = 0; j < sourceChildren.length; j++) {
            if (sourceChildren[j].dndIdentifier === nodes[i].dndIdentifier) {
              child = sourceChildren[j]
            }
          }
          if (child) {
            source.panelTab.removeChild(child)
            target.panelTab.addChild(child, targetIndex)
            target.panelTab.selectChild(child)
          }
        }
      } else {
        // dragged from buddylist tree
        try {
          for (var id in source.selection) {
            if (
              source.selection[id].item &&
              source.selection[id].item.user_id
            ) {
              // user
              openChat(
                source.selection[id].item.tenant,
                source.selection[id].item.user_id,
                target.panelTab,
                targetIndex,
                true,
              )
            }
          }
        } catch (e) {
          logger.log('error', e.message)
        }
      }
    }
  }
  var PanelTabChild_onClose = function PanelTabChild_onClose() {
    _closeTab(this)
    return false
  }
  var PanelTabChild_registerSelectedEvent =
    function PanelTabChild_registerSelectedEvent(event) {
      if (!this.selectedEvents) {
        this.selectedEvents = []
      }
      this.selectedEvents.push(event)
    }
  var panelTabChildControlButton_onMouseEnter =
    function panelTabChildControlButton_onMouseEnter() {
      this.page.getParent().dndTargetIdentifier = this.domNode.dndIdentifier
    }
  var panelTabChildControlButton_onMouseLeave =
    function panelTabChildControlButton_onMouseLeave() {
      this.page.getParent().dndTargetIdentifier = null
    }
  var panelChat_postCreate = function panelChat_postCreate() {
    var self = this
    this.inherited(arguments) // register event listeners
    this.handlers = [
      dojo.connect(this, 'resize', panelChat_resize),
      dojo.connect(
        this.buttonSendText,
        'onClick',
        getFuncApply(panelChat_buttonSendTextClick, this),
      ),
      dojo.connect(
        this.editorSendText,
        'onFocus',
        getFuncApply(panelChat_editorSendTextFocus, this),
      ),
      dojo.connect(
        this.editorSendText,
        'onBlur',
        getFuncApply(panelChat_editorSendTextBlur, this),
      ),
      dojo.connect(
        this.editorSendText,
        'onKeyDown',
        getFuncApply(panelChat_editorSendTextKeyDown, this),
      ),
      dojo.connect(
        this.editorSendText,
        'onKeyUp',
        getFuncApply(panelChat_editorSendTextKeyUp, this),
      ),
      dojo.connect(
        this.textBoxHeaderTarget,
        'onKeyUp',
        getFuncApply(panelChat_textBoxHeaderTargetKeyUp, this),
      ),
      dojo.connect(
        this.buttonHeaderTargetBackSpace,
        'click',
        getFuncApply(panelChat_buttonHeaderTargetBackSpaceClick, this),
      ),
      dojo.connect(
        this.buttonJoinConference,
        'onClick',
        getFuncApply(panelChat_buttonJoinConferenceClick, this),
      ),
      dojo.connect(
        this.buttonRejectConference,
        'onClick',
        getFuncApply(panelChat_buttonRejectConferenceClick, this),
      ),
      dojo.connect(
        this.buttonLeaveConference,
        'onClick',
        getFuncApply(panelChat_buttonLeaveConferenceClick, this),
      ),
      dojo.connect(
        this.buttonSendFile,
        'onClick',
        getFuncApply(panelChat_buttonSendFileClick, this),
      ),
      dojo.connect(
        this.inputHeaderFileForm,
        'change',
        getFuncApply(panelChat_inputHeaderFileFormChange, this),
      ),
      dojo.connect(
        this.buttonShareScreen,
        'onClick',
        getFuncApply(panelChat_buttonShareScreenClick, this),
      ),
      dojo.connect(
        this.buttonVoiceCall,
        'onClick',
        getFuncApply(panelChat_buttonVoiceCallClick, this),
      ),
      dojo.connect(
        this.buttonVideoCall,
        'onClick',
        getFuncApply(panelChat_buttonVideoCallClick, this),
      ),
      dojo.connect(
        this.buttonAnswerAudio,
        'onClick',
        getFuncApply(panelChat_buttonAnswerAudioClick, this),
      ),
      dojo.connect(
        this.buttonAnswerVideo,
        'onClick',
        getFuncApply(panelChat_buttonAnswerVideoClick, this),
      ),
      dojo.connect(
        this.buttonDeclineCall,
        'onClick',
        getFuncApply(panelChat_buttonDeclineCallClick, this),
      ),
      dojo.connect(
        this.buttonMuteMicrophone,
        'onClick',
        getFuncApply(panelChat_buttonMuteMicrophoneClick, this),
      ),
      dojo.connect(
        this.dropDownButtonChangeDevAI,
        'onClick',
        getFuncApply(panelChat_dropDownButtonChangeDevAIClick, this),
      ),
      dojo.connect(
        this.dropDownButtonChangeDevAO,
        'onClick',
        getFuncApply(panelChat_dropDownButtonChangeDevAOClick, this),
      ),
      dojo.connect(
        this.buttonMuteMicrophoneInMenu,
        'onClick',
        getFuncApply(panelChat_buttonMuteMicrophoneClick, this),
      ),
      dojo.connect(
        this.buttonMuteCamera,
        'onClick',
        getFuncApply(panelChat_buttonMuteCameraClick, this),
      ),
      dojo.connect(
        this.buttonMuteCameraInMenu,
        'onClick',
        getFuncApply(panelChat_buttonMuteCameraClick, this),
      ),
      dojo.connect(
        this.buttonFullscreen,
        'onClick',
        getFuncApply(panelChat_buttonFullscreenClick, this),
      ),
      dojo.connect(
        this.dropDownButtonShowTransferMenu,
        'onClick',
        getFuncApply(panelChat_dropDownButtonShowTransferMenuClick, this),
      ),
      dojo.connect(
        this.textBoxTransferTarget,
        'onKeyDown',
        getFuncApply(panelChat_textBoxTransferTargetKeyDown, this),
      ),
      dojo.connect(
        this.buttonTransferTarget,
        'onClick',
        getFuncApply(panelChat_buttonTransferTargetClick, this),
      ),
      dojo.connect(
        this.dropDownButtonTransferUser,
        'onClick',
        getFuncApply(panelChat_dropDownButtonTransferUserClick, this),
      ),
      dojo.connect(
        this.buttonTransferUser,
        'onClick',
        getFuncApply(panelChat_buttonTransferUserClick, this),
      ),
      dojo.connect(
        this.buttonCompleteTransfer,
        'onClick',
        getFuncApply(panelChat_buttonCompleteTransferClick, this),
      ),
      dojo.connect(
        this.buttonConferenceTransfer,
        'onClick',
        getFuncApply(panelChat_buttonConferenceTransferClick, this),
      ),
      dojo.connect(
        this.buttonCancelTransfer,
        'onClick',
        getFuncApply(panelChat_buttonCancelTransferClick, this),
      ),
      dojo.connect(
        this.buttonHoldCall,
        'onClick',
        getFuncApply(panelChat_buttonHoldCallClick, this),
      ),
      dojo.connect(
        this.buttonClearCall,
        'onClick',
        getFuncApply(panelChat_buttonClearCallClick, this),
      ),
      dojo.connect(
        this.videoRemote,
        'dblclick',
        getFuncApply(panelChat_videoRemoteDblclick, this),
      ),
      dojo.connect(
        this.buttonShowTodayMessages,
        'click',
        getFuncApply(panelChat_buttonShowTodayMessagesClick, this),
      ),
      dojo.connect(
        this.buttonShowYesterdayMessages,
        'click',
        getFuncApply(panelChat_buttonShowYesterdayMessagesClick, this),
      ),
      dojo.connect(
        this.buttonOpenHistory,
        'click',
        getFuncApply(panelChat_buttonOpenHistoryClick, this),
      ),
    ]
    if (window.File && window.FormData && getBrowser() !== 'IE') {
      // File API and FormData enabled
      this.handlers.push(
        dojo.connect(
          this.panelChatContainer.domNode,
          'onmousemove',
          getFuncApply(panelChat_panelChatContainerMouseMove, this),
        ),
      )
      this.handlers.push(
        dojo.connect(
          this.panelChatContainer.domNode,
          'ondragover',
          getFuncApply(panelChat_panelChatContainerDragOver, this),
        ),
      )
      this.handlers.push(
        dojo.connect(
          this.panelChatContainer.domNode,
          'ondrop',
          getFuncApply(panelChat_panelChatContainerDrop, this),
        ),
      )
    }
    var dialPadButtons = dojo.query(
      '[data-brekeke-uc-tone]',
      this.panelChatHeaderDialPad,
    )
    for (var i = 0; i < dialPadButtons.length; i++) {
      var tone = dialPadButtons[i].getAttribute('data-brekeke-uc-tone')
      this.handlers.push(
        dojo.connect(
          dialPadButtons[i],
          'click',
          getFuncApply(panelChatHeaderDialPad_click, {
            panel: this,
            tone: tone,
          }),
        ),
      )
    }
    var _initFooterSplitter = function initFooterSplitter() {
      if (self.panelChatFooter._splitterWidget) {
        require(['dojo/aspect'], function (aspect) {
          self.handlers.push(
            aspect.after(
              self.panelChatFooter._splitterWidget,
              '_startDrag',
              getFuncApply(
                panelChat_panelChatFooterSplitterWidgetStartDrag,
                self,
              ),
            ),
          )
        })
      } else {
        // wait until _splitterWidget is created
        setTimeout(_initFooterSplitter, 100)
      }
    }
    _initFooterSplitter() // register dnd targets
    if (this.dndTargets.length > 0) {
      require(['dojo/dnd/Target'], function (Target) {
        for (var i = 0; i < self.dndTargets.length; i++) {
          var nodes = dojo.query(self.dndTargets[i].query, self.domNode)
          if (nodes && nodes[0]) {
            self.dndTargets[i].target = new Target(nodes[0], {
              panelChat: self,
              checkAcceptance: panelChatDndTarget_checkAcceptance,
              onDndDrop: panelChatDndTarget_onDndDrop,
            })
          }
        }
      })
    }
  }
  var panelChat_destroy = function panelChat_destroy() {
    for (var i = 0; i < this.dndTargets.length; i++) {
      if (this.dndTargets[i].target) {
        this.dndTargets[i].target.destroy()
        delete this.dndTargets[i].target
      }
    }
    if (this.handlers && this.handlers.length) {
      for (var i = 0; i < this.handlers.length; i++) {
        dojo.disconnect(this.handlers[i])
      }
    }
    this.handlers = null
    this.inherited(arguments)
  }
  var panelChat_onAddedToTab = function panelChat_onAddedToTab() {
    // restore properties
    if (this.temporaryProperties) {
      this.getParent().selectChild(this)
      this.panelChatList.domNode.scrollTop = this.temporaryProperties.scrollTop
      this.editorSendText.attr('value', this.temporaryProperties.text)
    }
    this.temporaryProperties = null // replay players
    for (var i = 0; i < playingPlayers.length; i++) {
      if (this.domNode.contains(playingPlayers[i])) {
        playingPlayers[i].play()
      }
    }
  }
  var panelChat_onRemovingFromTab = function panelChat_onRemovingFromTab() {
    // save properties temporarily
    this.getParent().selectChild(this)
    this.temporaryProperties = {
      scrollTop: this.panelChatList.domNode.scrollTop,
      text: this.editorSendText.attr('value'),
    }
  }
  var panelChat_resize = function panelChat_resize() {
    // resize chat header height
    var buddyCount = dojo.query(
      '.brUCPanelChatHeaderBuddyInfo',
      this.panelChatHeaderBuddies.domNode,
    ).length
    if (buddyCount < 3) {
      this.panelChatHeader.resize({ h: 64 })
    } else if (buddyCount === 3) {
      this.panelChatHeader.resize({ h: 104 })
    } else {
      this.panelChatHeader.resize({ h: 144 })
    }
    if (this.panelType === 'EXTERNALCALL') {
      this.panelChatHeader.resize({ h: 144 })
    } // resize chat editor height
    this.panelChatFooter.resize({
      h:
        this.editorSendText.getHeaderHeight() +
        72 +
        int(this.editorSendText.myHeight),
    }) // resize container
    this.panelChatContainer.resize() // show send text button
    if (this.areaSendText.parentNode === this.panelChatFooter.domNode) {
      this.editorSendText.domNode.insertBefore(
        this.areaSendText,
        this.editorSendText.domNode.firstChild,
      )
      this.areaSendText.style.display = 'block'
    }
  }
  var panelChat_buttonSendTextClick = function panelChat_buttonSendTextClick() {
    sendText(this)
  }
  var panelChat_editorSendTextFocus = function panelChat_editorSendTextFocus() {
    // stop lamp
    if (lampObject && lampObject.jingle) {
      lampObject.windowFocused = true
      if (lampObject.jingle.panelKey === this.panelKey) {
        lampObject.panelSelected = true
      }
      if (lampObject.panelSelected) {
        lampObject.jingle = null
        lampObject.changeLamp(lampObject)
      }
    } // stop highlight
    if (highlightObject !== null) {
      stopHighlight()
    } // stop notification
    stopNotification()
    activePanelKey = this.panelKey
    displayBuddylist(false)
  }
  var panelChat_editorSendTextBlur = function panelChat_editorSendTextBlur() {
    if (activePanelKey === this.panelKey) {
      activePanelKey = ''
      displayBuddylist(false)
    }
  }
  var panelChat_editorSendTextKeyDown =
    function panelChat_editorSendTextKeyDown(e) {
      var panel = this
      if (e.keyCode === 13 && !e.shiftKey) {
        if (!this.buttonSendText.disabled) {
          var settings = chatClient.getSettings()
          if (
            settings.optional_settings &&
            settings.optional_settings.sending_confirmation
          ) {
            if (string(panel.editorSendText.attr('value'))) {
              sidePaneWidget.buttonDummy.focus()
              setTimeout(
                windowConfirm.bind(
                  window,
                  ucMsgs.LBL_SEND_TEXT_TITLE,
                  ucMsgs.MSG_SEND_TEXT_CONFIRM + '<br />',
                  sendText.bind(window, this),
                  panel.editorSendText.focus.bind(panel.editorSendText),
                ),
                100,
              )
            }
          } else {
            sendText(this)
          }
        }
        e.preventDefault()
      }
      if (e.keyCode === 38 && e.ctrlKey && !e.shiftKey) {
        this.panelChatList.domNode.scrollTop -= 40
        e.preventDefault()
      }
      if (e.keyCode === 40 && e.ctrlKey && !e.shiftKey) {
        this.panelChatList.domNode.scrollTop += 40
        e.preventDefault()
      }
    }
  var panelChat_editorSendTextKeyUp = function panelChat_editorSendTextKeyUp(
    e,
  ) {
    if (e.keyCode === 13 && !e.shiftKey) {
      // occured also on ime enter
      // do not sendText here
      e.preventDefault()
    } else if (
      [9, 16, 17, 18, 19, 27, 28, 29, 33, 34, 35, 36, 37, 38, 39, 40].indexOf(
        e.keyCode,
      ) < 0
    ) {
      sendTyping(this)
    }
  }
  var panelChat_textBoxHeaderTargetKeyUp =
    function panelChat_textBoxHeaderTargetKeyUp() {
      displayExternalCallTarget(this, null)
    }
  var panelChat_buttonHeaderTargetBackSpaceClick =
    function panelChat_buttonHeaderTargetBackSpaceClick() {
      var target = this.textBoxHeaderTarget.attr('value')
      if (target.length > 0) {
        this.textBoxHeaderTarget.attr(
          'value',
          target.substr(0, target.length - 1),
        )
      }
      this.textBoxHeaderTarget.focus()
      displayExternalCallTarget(this, null)
    }
  var panelChat_buttonJoinConferenceClick =
    function panelChat_buttonJoinConferenceClick() {
      if (this.panelType === 'CONFERENCE') {
        joinConference(this.panelKey)
      }
    }
  var panelChat_buttonRejectConferenceClick =
    function panelChat_buttonRejectConferenceClick() {
      if (this.panelType === 'CONFERENCE') {
        leaveConference(this.panelKey, true)
      }
    }
  var panelChat_buttonLeaveConferenceClick =
    function panelChat_buttonLeaveConferenceClick() {
      if (this.panelType === 'CONFERENCE') {
        windowConfirm(
          ucMsgs.LBL_LEAVE_CONFERENCE_TITLE,
          ucMsgs.MSG_LEAVE_CONFERENCE_CONFIRM + '<br />',
          leaveConference.bind(window, this.panelKey, true),
        )
      }
    }
  var panelChatBroadcastCheckBox_change =
    function panelChatBroadcastCheckBox_change() {
      var value = null
      try {
        value = JSON.parse(this.value)
      } catch (e) {
        logger.log('error', 'failed to parse value==' + this.value)
        return
      }
      if (broadcastUsersTable[value.panelKey]) {
        for (var i = 0; i < broadcastUsersTable[value.panelKey].length; i++) {
          if (
            broadcastUsersTable[value.panelKey][i].tenant === value.tenant &&
            broadcastUsersTable[value.panelKey][i].user_id === value.user_id
          ) {
            // change checked
            broadcastUsersTable[value.panelKey][i].checked = this.checked
            var displayNodes = dojo.query(
              '.brUCDisplay',
              this.domNode.parentNode,
            )
            if (displayNodes && displayNodes[0]) {
              if (this.checked) {
                displayNodes.removeClass('brUCDisplayUnchecked')
              } else {
                displayNodes.addClass('brUCDisplayUnchecked')
              }
            } else {
              logger.log('error', 'not found .brUCDisplay')
            } // make / clear call
            if (
              broadcastCallsTable[value.panelKey] &&
              broadcastCallsTable[value.panelKey].calls.length > 0
            ) {
              if (this.checked) {
                makeCall(
                  panelsBroadcast[value.panelKey],
                  broadcastCallsTable[value.panelKey].withVideo,
                )
              } else {
                for (
                  var j = 0;
                  j < broadcastCallsTable[value.panelKey].calls.length;
                  j++
                ) {
                  var callInfo = chatClient.getCallInfo(
                    broadcastCallsTable[value.panelKey].calls[j],
                  )
                  if (
                    callInfo.target.tenant === value.tenant &&
                    callInfo.target.user_id === value.user_id
                  ) {
                    chatClient.clearCall(
                      broadcastCallsTable[value.panelKey].calls[j],
                    )
                  }
                }
              }
            }
          }
        }
      } else {
        logger.log('error', 'empty broadcastUsersTable[' + value.panelKey + ']')
        return
      }
      displayBroadcastCheckedMessage(panelsBroadcast[value.panelKey])
      enableButtons(panelsBroadcast[value.panelKey])
    }
  var panelChat_buttonSendFileClick = function panelChat_buttonSendFileClick() {
    inputFile(this)
  }
  var panelChat_inputHeaderFileFormChange =
    function panelChat_inputHeaderFileFormChange() {
      sendFile(this)
    }
  var panelChatAcceptFile_click = function panelChatAcceptFile_click() {
    acceptFile(this.getAttribute('data-brekeke-uc-accept-file-id'))
  }
  var panelChatCancelFile_click = function panelChatCancelFile_click() {
    cancelFile(this.getAttribute('data-brekeke-uc-cancel-file-id'))
  }
  var panelChatInlineImageXhr_onload =
    function panelChatInlineImageXhr_onload() {
      var file_id = this.file_id
      fileTable[file_id].inlineImage.url = window.URL.createObjectURL(
        this.response,
      )
      displayFile(file_id)
    }
  var panelChat_buttonShareScreenClick =
    function panelChat_buttonShareScreenClick() {
      if (
        getBrowser() === 'Chrome' &&
        cookiePreference.shareScreenExtensionId
      ) {
        makeShareScreenCallChrome(this)
      } else {
        makeShareScreenCall(this)
      }
    }
  var panelChat_buttonVoiceCallClick =
    function panelChat_buttonVoiceCallClick() {
      makeCall(this, false)
    }
  var panelChat_buttonVideoCallClick =
    function panelChat_buttonVideoCallClick() {
      makeCall(this, true)
    }
  var panelChat_buttonAnswerAudioClick =
    function panelChat_buttonAnswerAudioClick() {
      answerCall(this, false)
    }
  var panelChat_buttonAnswerVideoClick =
    function panelChat_buttonAnswerVideoClick() {
      answerCall(this, true)
    }
  var panelChat_buttonDeclineCallClick =
    function panelChat_buttonDeclineCallClick() {
      clearCall(this)
    }
  var panelChat_buttonMuteMicrophoneClick =
    function panelChat_buttonMuteMicrophoneClick() {
      muteMicrophone(this)
    }
  var panelChat_dropDownButtonChangeDevAIClick =
    function panelChat_dropDownButtonChangeDevAIClick() {
      enumerateDevices(this, 'audioinput')
    }
  var panelChat_dropDownButtonChangeDevAOClick =
    function panelChat_dropDownButtonChangeDevAOClick() {
      enumerateDevices(this, 'audiooutput')
    }
  var panelChat_buttonMuteCameraClick =
    function panelChat_buttonMuteCameraClick() {
      muteCamera(this)
    }
  var panelChat_buttonFullscreenClick =
    function panelChat_buttonFullscreenClick() {
      fullscreen(this)
    }
  var panelChat_dropDownButtonShowTransferMenuClick =
    function panelChat_dropDownButtonShowTransferMenuClick() {
      this.textBoxTransferTarget.focus()
    }
  var panelChat_textBoxTransferTargetKeyDown =
    function panelChat_textBoxTransferTargetKeyDown(e) {
      if (e.keyCode === 13) {
        transferCall(this, this.textBoxTransferTarget.attr('value'))
      }
    }
  var panelChat_buttonTransferTargetClick =
    function panelChat_buttonTransferTargetClick() {
      transferCall(this, this.textBoxTransferTarget.attr('value'))
    }
  var panelChat_dropDownButtonTransferUserClick =
    function panelChat_dropDownButtonTransferUserClick() {
      enumerateTransferUsers(this)
    }
  var panelChat_buttonTransferUserClick =
    function panelChat_buttonTransferUserClick() {
      transferCall(this, this.dropDownButtonTransferUser.attr('value'))
    }
  var panelChat_buttonCompleteTransferClick =
    function panelChat_buttonCompleteTransferClick() {
      clearCall(this)
    }
  var panelChat_buttonConferenceTransferClick =
    function panelChat_buttonConferenceTransferClick() {
      conferenceTransfer(this)
    }
  var panelChat_buttonCancelTransferClick =
    function panelChat_buttonCancelTransferClick() {
      holdCall(this)
    }
  var panelChat_buttonHoldCallClick = function panelChat_buttonHoldCallClick() {
    holdCall(this)
  }
  var panelChat_buttonClearCallClick =
    function panelChat_buttonClearCallClick() {
      clearCall(this)
    }
  var panelChat_videoRemoteDblclick = function panelChat_videoRemoteDblclick() {
    fullscreen(this)
  }
  var panelChatHeaderDialPad_click = function panelChatHeaderDialPad_click() {
    this.panel.textBoxHeaderTarget.attr(
      'value',
      this.panel.textBoxHeaderTarget.attr('value') + this.tone,
    )
    this.panel.textBoxHeaderTarget.focus()
    displayExternalCallTarget(this.panel, null)
  }
  var panelChatDialPad_click = function panelChatDialPad_click() {
    if (this.panel.panelType === 'BROADCAST') {
      // TODO: yano broadcast
      //if (broadcastCallsTable[this.panel.panelKey]) {
      //    for (var i = 0; i < broadcastCallsTable[this.panel.panelKey].calls.length; i++) {
      //        chatClient.sendDTMF(broadcastCallsTable[this.panel.panelKey].calls[i], this.tone);
      //    }
      //}
    } else {
      var session = getSessionFromPanel(
        this.panel.panelType,
        this.panel.panelKey,
      )
      if (session) {
        var sessionId = session.sessionId
        phone.sendDTMF(this.tone, sessionId)
        this.panel.areaDialPadLog.innerHTML += this.tone
      }
    }
  }
  var panelChat_buttonMovePanelChatCallClick =
    function panelChat_buttonMovePanelChatCallClick() {
      movePanelChatCall(this)
    }
  var panelChat_panelChatCallSplitterWidgetStartDrag =
    function panelChat_panelChatCallSplitterWidgetStartDrag() {
      var panel = this
      require(['dojo/dom-geometry', 'dojo/aspect'], function (
        domGeometry,
        aspect,
      ) {
        var startHeight = domGeometry.position(panel.panelChatCall.domNode).h
        var connection = aspect.after(
          panel.panelChatCall._splitterWidget,
          '_stopDrag',
          function () {
            connection.remove()
            var stopHeight = domGeometry.position(panel.panelChatCall.domNode).h
            resizePanelChatCall(panel, stopHeight - startHeight)
          },
        )
      })
    }
  var panelChatThumbnail_click = function panelChatThumbnail_click() {
    requestMainVideoCall(
      panelsConference[this.panelKey],
      this.tenant,
      this.user_id,
    )
  }
  var panelChat_buttonShowTodayMessagesClick =
    function panelChat_buttonShowTodayMessagesClick() {
      showDaysMessages(this, 1)
    }
  var panelChat_buttonShowYesterdayMessagesClick =
    function panelChat_buttonShowYesterdayMessagesClick() {
      showDaysMessages(this, 2)
    }
  var panelChat_buttonOpenHistoryClick =
    function panelChat_buttonOpenHistoryClick() {
      try {
        target = JSON.parse(this.panelKey)
      } catch (e) {
        logger.log('error', 'failed to parse this.panelKey==' + this.panelKey)
        return
      }
      openHistorySearch(this.getParent(), null, true, target, true)
    }
  var panelChatShowMore_click = function panelChatShowMore_click() {
    this.style.display = 'none'
    chatClient.receiveUnreadText(showUnreadText, null)
  }
  var panelChatShowMoreOnReSignIn_click =
    function panelChatShowMoreOnReSignIn_click() {
      this.style.display = 'none'
      chatClient.receiveUnreadText(showUnreadTextOnReSignIn, null)
    }
  var panelChatShowMoreOnJoinWebchatRoom_click =
    function panelChatShowMoreOnJoinWebchatRoom_click() {
      this.style.display = 'none'
      chatClient.receiveUnreceivedConferenceText(
        { conf_id: this.getAttribute('data-brekeke-uc-conf-id') },
        showUnreceivedConferenceTextOnJoinWebchatRoom,
        null,
      )
    }
  var panelChat_panelChatContainerMouseMove =
    function panelChat_panelChatContainerMouseMove(e) {
      if (this.panelType === 'CHAT' || this.panelType === 'CONFERENCE') {
        if (
          this.editorSendText &&
          this.editorSendText.iframe &&
          this.editorSendText.iframe.style &&
          this.editorSendText.iframe.style.pointerEvents === 'none'
        ) {
          this.editorSendText.iframe.style.pointerEvents = 'auto'
        }
      }
    }
  var panelChat_panelChatContainerDragOver =
    function panelChat_panelChatContainerDragOver(e) {
      if (this.panelType === 'CHAT' || this.panelType === 'CONFERENCE') {
        if (
          this.editorSendText &&
          this.editorSendText.iframe &&
          this.editorSendText.iframe.style &&
          this.editorSendText.iframe.style.pointerEvents !== 'none'
        ) {
          this.editorSendText.iframe.style.pointerEvents = 'none'
        }
        e.preventDefault()
      }
    }
  var panelChat_panelChatContainerDrop =
    function panelChat_panelChatContainerDrop(e) {
      if (this.panelType === 'CHAT' || this.panelType === 'CONFERENCE') {
        dropFile(this, e.dataTransfer.files)
        if (
          this.editorSendText &&
          this.editorSendText.iframe &&
          this.editorSendText.iframe.style &&
          this.editorSendText.iframe.style.pointerEvents === 'none'
        ) {
          this.editorSendText.iframe.style.pointerEvents = 'auto'
        }
        e.preventDefault()
      }
    }
  var panelChat_panelChatFooterSplitterWidgetStartDrag =
    function panelChat_panelChatFooterSplitterWidgetStartDrag() {
      var panel = this
      require(['dojo/dom-geometry', 'dojo/aspect'], function (
        domGeometry,
        aspect,
      ) {
        panel.editorSendText.editorObject.style.visibility = 'hidden'
        var startHeight = domGeometry.position(panel.panelChatFooter.domNode).h
        var connection = aspect.after(
          panel.panelChatFooter._splitterWidget,
          '_stopDrag',
          function () {
            connection.remove()
            panel.editorSendText.editorObject.style.visibility = 'visible'
            var stopHeight = domGeometry.position(
              panel.panelChatFooter.domNode,
            ).h
            panel.editorSendText.myHeight =
              int(panel.editorSendText.myHeight) + stopHeight - startHeight
          },
        )
      })
    }
  var panelChatDndTarget_checkAcceptance =
    function panelChatDndTarget_checkAcceptance(source, nodes) {
      if (
        this.panelChat.panelType === 'CONFERENCE' &&
        dojo.hasClass(this.node, 'brUCPanelChatHeaderBuddies')
      ) {
        if (source.panelTab) {
          // dragged from tab panel
          return false
        } // only items dragged from buddylist tree can be dropped
        // check if any items can be invited to the conference
        var items = []
        for (var id in source.selection) {
          items.push(source.selection[id].item)
        }
        var invite = checkInvitationAcceptance(items, this.panelChat.panelKey)
        return invite.length > 0
      } else if (
        this.panelChat.panelType === 'BROADCAST' &&
        dojo.hasClass(this.node, 'brUCPanelChatHeaderBuddies')
      ) {
        if (source.panelTab) {
          // dragged from tab panel
          return false
        } // only items dragged from buddylist tree can be dropped
        var sourceUsers = []
        var buddylist = chatClient.getBuddylist()
        try {
          for (var id in source.selection) {
            var item = source.selection[id].item
            if (item) {
              if (item.user_id) {
                // user
                sourceUsers.push({ tenant: item.tenant, user_id: item.user_id })
              } else if (!item.showMore) {
                // group
                for (var i = 0; i < buddylist.user.length; i++) {
                  var buddy = buddylist.user[i]
                  if (buddy.group === item.id && buddy.user_id) {
                    sourceUsers.push({
                      tenant: buddy.tenant,
                      user_id: buddy.user_id,
                    })
                  }
                }
              }
            }
          }
        } catch (e) {
          logger.log('error', e.message)
          return false
        } // check added users
        var addedCount = 0
        for (var i = 0; i < sourceUsers.length; i++) {
          if (broadcastUsersTable[this.panelChat.panelKey]) {
            for (
              var j = 0;
              j < broadcastUsersTable[this.panelChat.panelKey].length;
              j++
            ) {
              if (
                sourceUsers[i].tenant ===
                  broadcastUsersTable[this.panelChat.panelKey][j].tenant &&
                sourceUsers[i].user_id ===
                  broadcastUsersTable[this.panelChat.panelKey][j].user_id
              ) {
                addedCount++ // already added
                break
              }
            }
          }
        }
        if (addedCount === sourceUsers.length) {
          return false
        } // drop (add) OK
        return true
      }
      return false
    }
  var panelChatDndTarget_onDndDrop = function panelChatDndTarget_onDndDrop(
    source,
    nodes,
    copy,
    target,
  ) {
    this.onDndCancel()
    if (this !== target) {
      return
    }
    if (
      this.panelChat.panelType === 'CONFERENCE' &&
      dojo.hasClass(this.node, 'brUCPanelChatHeaderBuddies')
    ) {
      var items = []
      for (var id in source.selection) {
        items.push(source.selection[id].item)
      }
      var invite = checkInvitationAcceptance(items, this.panelChat.panelKey)
      if (invite.length > 0) {
        // invite
        inviteToConference(this.panelChat.panelKey, invite)
      }
    } else if (
      this.panelChat.panelType === 'BROADCAST' &&
      dojo.hasClass(this.node, 'brUCPanelChatHeaderBuddies')
    ) {
      var sourceUsers = []
      var buddylist = chatClient.getBuddylist()
      try {
        for (var id in source.selection) {
          var item = source.selection[id].item
          if (item) {
            if (item.user_id) {
              // user
              sourceUsers.push({ tenant: item.tenant, user_id: item.user_id })
            } else if (!item.showMore) {
              // group
              for (var i = 0; i < buddylist.user.length; i++) {
                var buddy = buddylist.user[i]
                if (buddy.group === item.id && buddy.user_id) {
                  sourceUsers.push({
                    tenant: buddy.tenant,
                    user_id: buddy.user_id,
                  })
                }
              }
            }
          }
        }
      } catch (e) {
        logger.log('error', e.message)
      }
      for (var i = 0; i < sourceUsers.length; i++) {
        if (broadcastUsersTable[this.panelChat.panelKey]) {
          var added = false
          for (var j in broadcastUsersTable[this.panelChat.panelKey]) {
            if (
              sourceUsers[i].tenant ===
                broadcastUsersTable[this.panelChat.panelKey][j].tenant &&
              sourceUsers[i].user_id ===
                broadcastUsersTable[this.panelChat.panelKey][j].user_id
            ) {
              added = true
              break
            }
          }
          if (!added) {
            // add
            broadcastUsersTable[this.panelChat.panelKey].push({
              tenant: sourceUsers[i].tenant,
              user_id: sourceUsers[i].user_id,
              checked: true,
              connection: null,
            }) // make call
            if (
              broadcastCallsTable[this.panelChat.panelKey] &&
              broadcastCallsTable[this.panelChat.panelKey].calls.length > 0
            ) {
              makeCall(
                panelsBroadcast[this.panelChat.panelKey],
                broadcastCallsTable[this.panelChat.panelKey].withVideo,
              )
            }
          }
        }
      }
      displayBroadcast(this.panelChat)
    }
  }
  var panelWebchatQueue_postCreate = function panelWebchatQueue_postCreate() {
    this.inherited(arguments) // register event listeners
    this.handlers = []
  }
  var panelWebchatQueue_destroy = function panelWebchatQueue_destroy() {
    if (this.handlers && this.handlers.length) {
      for (var i = 0; i < this.handlers.length; i++) {
        dojo.disconnect(this.handlers[i])
      }
    }
    this.handlers = null
    this.inherited(arguments)
  }
  var panelWebchatQueueWebchatRoomChat_click =
    function panelWebchatQueueWebchatRoomChat_click() {
      var conf_id = this.conf_id
      chatClient.joinConference(
        conf_id,
        { invisible: false, exclusive: true },
        function (ev) {
          // funcOK
          var panel = openConference(conf_id, null, null, true)
          displayWebchatQueueInfo(conf_id)
          displayConference(ev.conference.conf_id)
          displayProfinfoOnConference(ev.conference.conf_id)
          chatClient.receiveUnreceivedConferenceText(
            { conf_id: conf_id },
            showUnreceivedConferenceTextOnJoinWebchatRoom,
            null,
          )
        },
        function (ev) {
          // funcError
          logger.log(
            'warn',
            'chatClient.joinConference error code: ' +
              ev.code +
              ', message: ' +
              ev.message,
          )
          windowAlert(
            ucMsgs.CMN_ALERT,
            ucMsgs.MSG_JOIN_CONFERENCE_FAILED +
              ' (' +
              ev.code +
              ' ' +
              ev.message +
              ')',
          )
        },
      )
    }
  var panelWebchatQueueWebchatRoomJoin_click =
    function panelWebchatQueueWebchatRoomJoin_click() {
      var conf_id = this.conf_id
      chatClient.joinConference(
        conf_id,
        { invisible: false, exclusive: false },
        function (ev) {
          // funcOK
          var panel = openConference(conf_id, null, null, true)
          displayWebchatQueueInfo(conf_id)
          displayConference(ev.conference.conf_id)
          displayProfinfoOnConference(ev.conference.conf_id)
          chatClient.receiveUnreceivedConferenceText(
            { conf_id: conf_id },
            showUnreceivedConferenceTextOnJoinWebchatRoom,
            null,
          )
        },
        function (ev) {
          // funcError
          logger.log(
            'warn',
            'chatClient.joinConference error code: ' +
              ev.code +
              ', message: ' +
              ev.message,
          )
          windowAlert(
            ucMsgs.CMN_ALERT,
            ucMsgs.MSG_JOIN_CONFERENCE_FAILED +
              ' (' +
              ev.code +
              ' ' +
              ev.message +
              ')',
          )
        },
      )
    }
  var panelWebchatQueueWebchatRoomReject_click =
    function panelWebchatQueueWebchatRoomReject_click() {
      leaveConference(this.conf_id)
      removeWebchatQueue(this.conf_id)
    }
  var panelWebchatQueueWebchatRoomHide_click =
    function panelWebchatQueueWebchatRoomHide_click() {
      if (
        webchatQueueWorkData[this.panelKey] &&
        webchatQueueWorkData[this.panelKey][this.conf_id]
      ) {
        for (
          var i = 0;
          i <
          webchatQueueWorkData[this.panelKey][this.conf_id].connections.length;
          i++
        ) {
          webchatQueueWorkData[this.panelKey][this.conf_id].connections[
            i
          ].remove()
        }
      }
      if (panelsWebchatQueue[this.panelKey]) {
        var webchatRoomDom = dojo.query(
          '[data-brekeke-uc-conf-id=' + this.conf_id + ']',
          panelsWebchatQueue[this.panelKey].panelWebchatRooms,
        )[0]
        panelsWebchatQueue[this.panelKey].panelWebchatRooms.removeChild(
          webchatRoomDom,
        )
      }
    }
  var panelPreference_postCreate = function panelPreference_postCreate() {
    this.inherited(arguments) // register event listeners
    this.handlers = [
      dojo.connect(
        this.menuItemStatusOffline,
        'onClick',
        getFuncApply(panelPreference_menuItemStatusOfflineClick, this),
      ),
      dojo.connect(
        this.menuItemStatusAvailable,
        'onClick',
        getFuncApply(panelPreference_menuItemStatusAvailableClick, this),
      ),
      dojo.connect(
        this.menuItemStatusBusy,
        'onClick',
        getFuncApply(panelPreference_menuItemStatusBusyClick, this),
      ),
      dojo.connect(
        this.radioButtonMainVideoDisplaySizeAuto,
        'onChange',
        getFuncApply(
          panelPreference_radioButtonMainVideoDisplaySizeAutoChange,
          this,
        ),
      ),
      dojo.connect(
        this.radioButtonThumbnailVideoDisplaySizeAuto,
        'onChange',
        getFuncApply(
          panelPreference_radioButtonThumbnailVideoDisplaySizeAutoChange,
          this,
        ),
      ),
      dojo.connect(
        this.radioButtonThumbnailPositionRight,
        'onChange',
        getFuncApply(panelPreference_radioButtonThumbnailPositionChange, this),
      ),
      dojo.connect(
        this.radioButtonThumbnailPositionBottom,
        'onChange',
        getFuncApply(panelPreference_radioButtonThumbnailPositionChange, this),
      ),
      dojo.connect(
        this.radioButtonImageFileTransferInline,
        'onChange',
        getFuncApply(panelPreference_radioButtonImageFileTransferChange, this),
      ),
      dojo.connect(
        this.radioButtonImageFileTransferFile,
        'onChange',
        getFuncApply(panelPreference_radioButtonImageFileTransferChange, this),
      ),
      dojo.connect(
        this.radioButtonWebnotifTimeoutOff,
        'onChange',
        getFuncApply(panelPreference_radioButtonWebnotifTimeoutChange, this),
      ),
      dojo.connect(
        this.radioButtonWebnotifTimeoutAuto,
        'onChange',
        getFuncApply(panelPreference_radioButtonWebnotifTimeoutChange, this),
      ),
      dojo.connect(
        this.radioButtonWebnotifTimeoutManual,
        'onChange',
        getFuncApply(panelPreference_radioButtonWebnotifTimeoutChange, this),
      ),
      dojo.connect(
        this.textBoxWebnotifTimeoutSec,
        'onChange',
        getFuncApply(panelPreference_textBoxWebnotifTimeoutSecChange, this),
      ),
      dojo.connect(
        this.imgProfileImage,
        'click',
        getFuncApply(panelPreference_imgProfileImageClick, this),
      ),
      dojo.connect(
        this.buttonUploadProfileImage,
        'onClick',
        getFuncApply(panelPreference_buttonUploadProfileImageClick, this),
      ),
      dojo.connect(
        this.inputProfileImageForm,
        'change',
        getFuncApply(panelPreference_inputProfileImageFormChange, this),
      ),
      dojo.connect(
        this.buttonDeleteProfileImage,
        'onClick',
        getFuncApply(panelPreference_buttonDeleteProfileImageClick, this),
      ),
      dojo.connect(
        this.radioButtonUserLanguageAuto,
        'onChange',
        getFuncApply(panelPreference_radioButtonUserLanguageChange, this),
      ),
      dojo.connect(
        this.checkBoxShareScreenEnabled,
        'onChange',
        getFuncApply(panelPreference_checkBoxShareScreenEnabledChange, this),
      ),
      dojo.connect(
        this.buttonSavePreference,
        'onClick',
        getFuncApply(panelPreference_buttonSavePreferenceClick, this),
      ),
      dojo.connect(
        this.buttonCancelPreference,
        'onClick',
        getFuncApply(panelPreference_buttonCancelPreferenceClick, this),
      ),
    ]
  }
  var panelPreference_destroy = function panelPreference_destroy() {
    if (this.handlers && this.handlers.length) {
      for (var i = 0; i < this.handlers.length; i++) {
        dojo.disconnect(this.handlers[i])
      }
    }
    this.handlers = null
    this.inherited(arguments)
  }
  var panelPreference_menuItemStatusOfflineClick =
    function panelPreference_menuItemStatusOfflineClick() {
      preferenceWorkData[this.panelKey].initial_status =
        Constants.STATUS_OFFLINE
      displayInitialStatus(this)
    }
  var panelPreference_menuItemStatusAvailableClick =
    function panelPreference_menuItemStatusAvailableClick() {
      preferenceWorkData[this.panelKey].initial_status =
        Constants.STATUS_AVAILABLE
      displayInitialStatus(this)
    }
  var panelPreference_menuItemStatusBusyClick =
    function panelPreference_menuItemStatusBusyClick() {
      preferenceWorkData[this.panelKey].initial_status = Constants.STATUS_BUSY
      displayInitialStatus(this)
    }
  var panelPreference_radioButtonMainVideoDisplaySizeAutoChange =
    function panelPreference_radioButtonMainVideoDisplaySizeAutoChange() {
      if (this.radioButtonMainVideoDisplaySizeAuto.checked) {
        this.textBoxMainVideoWidth.setDisabled(true)
        this.textBoxMainVideoHeight.setDisabled(true)
      } else {
        this.textBoxMainVideoWidth.setDisabled(false)
        this.textBoxMainVideoHeight.setDisabled(false)
        if (
          !this.textBoxMainVideoWidth.attr('value') &&
          !this.textBoxMainVideoHeight.attr('value')
        ) {
          var panel = this
          require(['dojo/dom-geometry'], function (domGeometry) {
            var panelHeight = domGeometry.position(panel.domNode).h
            var h = int(panelHeight * DEFAULT_MAIN_VIDEO_HEIGHT_FACTOR)
            panel.textBoxMainVideoWidth.set(
              'value',
              int(h * DEFAULT_VIDEO_RATIO),
            )
            panel.textBoxMainVideoHeight.set('value', h)
          })
        }
      }
    }
  var panelPreference_radioButtonThumbnailVideoDisplaySizeAutoChange =
    function panelPreference_radioButtonThumbnailVideoDisplaySizeAutoChange() {
      if (this.radioButtonThumbnailVideoDisplaySizeAuto.checked) {
        this.textBoxThumbnailVideoWidth.setDisabled(true)
        this.textBoxThumbnailVideoHeight.setDisabled(true)
      } else {
        this.textBoxThumbnailVideoWidth.setDisabled(false)
        this.textBoxThumbnailVideoHeight.setDisabled(false)
        if (
          !this.textBoxThumbnailVideoWidth.attr('value') &&
          !this.textBoxThumbnailVideoHeight.attr('value')
        ) {
          this.textBoxThumbnailVideoWidth.set(
            'value',
            int(DEFAULT_THUMBNAIL_VIDEO_HEIGHT * DEFAULT_VIDEO_RATIO),
          )
          this.textBoxThumbnailVideoHeight.set(
            'value',
            DEFAULT_THUMBNAIL_VIDEO_HEIGHT,
          )
        }
      }
    }
  var panelPreference_radioButtonThumbnailPositionChange =
    function panelPreference_radioButtonThumbnailPositionChange() {
      if (this.radioButtonThumbnailPositionRight.checked) {
        preferenceWorkData[this.panelKey].thumbnailPosition = ''
      } else {
        preferenceWorkData[this.panelKey].thumbnailPosition = 'bottom'
      }
    }
  var panelPreference_radioButtonImageFileTransferChange =
    function panelPreference_radioButtonImageFileTransferChange() {
      if (this.radioButtonImageFileTransferInline.checked) {
        preferenceWorkData[this.panelKey].imageFileTransfer = ''
      } else {
        preferenceWorkData[this.panelKey].imageFileTransfer = 'file'
      }
    }
  var panelPreference_radioButtonWebnotifTimeoutChange =
    function panelPreference_radioButtonWebnotifTimeoutChange() {
      if (this.radioButtonWebnotifTimeoutOff.checked) {
        preferenceWorkData[this.panelKey].webnotif_status = 'off'
        this.textBoxWebnotifTimeoutSec.setDisabled(true)
      } else if (this.radioButtonWebnotifTimeoutManual.checked) {
        preferenceWorkData[this.panelKey].webnotif_status = 'manual'
        this.textBoxWebnotifTimeoutSec.setDisabled(false)
        if (!preferenceWorkData[this.panelKey].webnotif_timeout) {
          preferenceWorkData[this.panelKey].webnotif_timeout =
            chatClient.getConfigProperties().webnotif_timeout
        }
        this.textBoxWebnotifTimeoutSec.set(
          'value',
          string(
            int(preferenceWorkData[this.panelKey].webnotif_timeout) / 1000 ||
              '',
          ),
        )
      } else {
        preferenceWorkData[this.panelKey].webnotif_status = ''
        this.textBoxWebnotifTimeoutSec.setDisabled(true)
      }
    }
  var panelPreference_textBoxWebnotifTimeoutSecChange =
    function panelPreference_textBoxWebnotifTimeoutSecChange() {
      preferenceWorkData[this.panelKey].webnotif_timeout =
        int(this.textBoxWebnotifTimeoutSec.attr('value')) * 1000
    }
  var panelPreference_imgProfileImageClick =
    function panelPreference_imgProfileImageClick() {
      showProfileImage(this.imgProfileImage.getAttribute('data-brekeke-uc-url'))
    }
  var panelPreference_buttonUploadProfileImageClick =
    function panelPreference_buttonUploadProfileImageClick() {
      inputProfileImage(this)
    }
  var panelPreference_inputProfileImageFormChange =
    function panelPreference_inputProfileImageFormChange() {
      uploadProfileImage(this)
    }
  var panelPreference_buttonDeleteProfileImageClick =
    function panelPreference_buttonDeleteProfileImageClick() {
      preferenceWorkData[this.panelKey].profileImageTo = 'DELETE'
      this.imgProfileImage.style.backgroundImage = 'url(./img/noimage.png)'
      this.imgProfileImage.setAttribute(
        'data-brekeke-uc-url',
        './img/noimage.png',
      )
    }
  var panelPreference_radioButtonUserLanguageChange =
    function panelPreference_radioButtonUserLanguageChange() {
      var panel = this
      if (this.radioButtonUserLanguageAuto.checked) {
        preferenceWorkData[this.panelKey].user_language = ''
      } else {
        for (var language in panel.radioButtonUserLanguageList) {
          if (panel.radioButtonUserLanguageList[language].checked) {
            preferenceWorkData[this.panelKey].user_language = language
            break
          }
        }
      }
    }
  var panelPreference_checkBoxShareScreenEnabledChange =
    function panelPreference_checkBoxShareScreenEnabledChange() {
      if (this.checkBoxShareScreenEnabled.checked) {
        this.checkBoxShareScreenMediaSource.setDisabled(false)
        this.checkBoxShareScreenMute.setDisabled(false)
      } else {
        this.checkBoxShareScreenMediaSource.setDisabled(true)
        this.checkBoxShareScreenMute.setDisabled(true)
      }
    }
  var panelPreference_buttonSavePreferenceClick =
    function panelPreference_buttonSavePreferenceClick() {
      savePreference(this)
    }
  var panelPreference_buttonCancelPreferenceClick =
    function panelPreference_buttonCancelPreferenceClick() {
      _closeTab(this)
    }
  var panelHistory_postCreate = function panelHistory_postCreate() {
    this.inherited(arguments) // register event listeners
    this.handlers = [
      dojo.connect(
        this.dateTextBoxSearchTopics,
        'onChange',
        getFuncApply(panelHistory_dateTextBoxSearchTopicsChange, this),
      ),
    ]
  }
  var panelHistory_destroy = function panelHistory_destroy() {
    if (this.handlers && this.handlers.length) {
      for (var i = 0; i < this.handlers.length; i++) {
        dojo.disconnect(this.handlers[i])
      }
    }
    this.handlers = null
    this.inherited(arguments)
  }
  var panelHistory_dateTextBoxSearchTopicsChange =
    function panelHistory_dateTextBoxSearchTopicsChange() {
      searchTopics(this)
    }
  var panelHistoryButtonSearchLogs_click =
    function panelHistoryButtonSearchLogs_click() {
      searchLogs(this.panel, this.topic_id)
    }
  var panelHistorySearch_postCreate = function panelHistorySearch_postCreate() {
    this.inherited(arguments) // register event listeners
    this.handlers = [
      dojo.connect(this, 'resize', panelHistorySearch_resize),
      dojo.connect(
        this.menuItemConditionSimpleAll,
        'onClick',
        getFuncApply(panelHistorySearch_menuItemConditionSimpleAllClick, this),
      ),
      dojo.connect(
        this.menuItemShowAdvanced,
        'onClick',
        getFuncApply(panelHistorySearch_menuItemShowAdvancedClick, this),
      ),
      dojo.connect(
        this.buttonSearchSimple,
        'onClick',
        getFuncApply(panelHistorySearch_buttonSearchSimpleClick, this),
      ),
      dojo.connect(this.textBoxConditionSimple, 'onKeyDown', keyDownUtil.save),
      dojo.connect(
        this.textBoxConditionSimple,
        'onKeyUp',
        getFuncApply(panelHistorySearch_textBoxConditionSimpleKeyUp, this),
      ),
      dojo.connect(
        this.buttonSearchAdvanced,
        'onClick',
        getFuncApply(panelHistorySearch_buttonSearchAdvancedClick, this),
      ),
      dojo.connect(this.textBoxAdvancedName, 'onKeyDown', keyDownUtil.save),
      dojo.connect(
        this.textBoxAdvancedName,
        'onKeyUp',
        getFuncApply(panelHistorySearch_textBoxAdvancedKeyUp, this),
      ),
      dojo.connect(this.textBoxAdvancedSubject, 'onKeyDown', keyDownUtil.save),
      dojo.connect(
        this.textBoxAdvancedSubject,
        'onKeyUp',
        getFuncApply(panelHistorySearch_textBoxAdvancedKeyUp, this),
      ),
      dojo.connect(
        this.dateTextBoxAdvancedBegin,
        'onKeyDown',
        keyDownUtil.save,
      ),
      dojo.connect(
        this.dateTextBoxAdvancedBegin,
        'onKeyUp',
        getFuncApply(panelHistorySearch_textBoxAdvancedKeyUp, this),
      ),
      dojo.connect(this.dateTextBoxAdvancedEnd, 'onKeyDown', keyDownUtil.save),
      dojo.connect(
        this.dateTextBoxAdvancedEnd,
        'onKeyUp',
        getFuncApply(panelHistorySearch_textBoxAdvancedKeyUp, this),
      ),
      dojo.connect(this.textBoxAdvancedContent, 'onKeyDown', keyDownUtil.save),
      dojo.connect(
        this.textBoxAdvancedContent,
        'onKeyUp',
        getFuncApply(panelHistorySearch_textBoxAdvancedKeyUp, this),
      ),
      dojo.connect(
        this.buttonCloseAdvanced,
        'onClick',
        getFuncApply(panelHistorySearch_buttonCloseAdvancedClick, this),
      ),
      dojo.connect(
        this.buttonShowMore,
        'onClick',
        getFuncApply(panelHistorySearch_buttonShowMoreClick, this),
      ),
    ]
  }
  var panelHistorySearch_destroy = function panelHistorySearch_destroy() {
    if (this.handlers && this.handlers.length) {
      for (var i = 0; i < this.handlers.length; i++) {
        dojo.disconnect(this.handlers[i])
      }
    }
    this.handlers = null
    this.inherited(arguments)
  }
  var panelHistorySearch_onAddedToTab =
    function panelHistorySearch_onAddedToTab() {
      // restore properties
      if (this.temporaryProperties) {
        this.getParent().selectChild(this)
        this.panelChatList.domNode.scrollTop =
          this.temporaryProperties.scrollTop
      }
      this.temporaryProperties = null
    }
  var panelHistorySearch_onRemovingFromTab =
    function panelHistorySearch_onRemovingFromTab() {
      // save properties temporarily
      this.getParent().selectChild(this)
      this.temporaryProperties = {
        scrollTop: this.panelChatList.domNode.scrollTop,
      }
    }
  var panelHistorySearch_resize = function panelHistorySearch_resize() {
    var panel = this // resize header height
    if (
      searchConditionHistory[panel.panelKey] &&
      searchConditionHistory[panel.panelKey].advanced
    ) {
      panel.panelHistorySearchHeader.resize({ h: 128 })
      panel.areaConditionAdvanced.style.display = 'block'
    } else {
      panel.panelHistorySearchHeader.resize({ h: 64 })
      panel.areaConditionAdvanced.style.display = 'none'
    }
    panel.panelHistorySearchContainer.resize()
  }
  var panelHistorySearch_menuItemConditionSimpleAllClick =
    function panelHistorySearch_menuItemConditionSimpleAllClick() {
      var panel = this
      if (
        !searchConditionHistory[panel.panelKey] ||
        searchConditionHistory[panel.panelKey].searching
      ) {
        return
      }
      panel.dropDownButtonConditionSimpleUser.set(
        'label',
        ucMsgs.LBL_SEARCH_ALL_USERS,
      )
      panel.dropDownButtonConditionSimpleUser.set(
        'title',
        ucMsgs.LBL_SEARCH_ALL_USERS,
      )
      searchConditionHistory[panel.panelKey].user = null
      searchTopicsSimple(panel)
    }
  var panelHistorySearchMenuItemConditionSimpleUser_click =
    function panelHistorySearchMenuItemConditionSimpleUser_click() {
      var panel = panelsHistory[this.panelKey]
      if (
        !searchConditionHistory[panel.panelKey] ||
        searchConditionHistory[panel.panelKey].searching
      ) {
        return
      }
      panel.dropDownButtonConditionSimpleUser.set('label', this.name)
      panel.dropDownButtonConditionSimpleUser.set('title', this.name)
      searchConditionHistory[panel.panelKey].user = this.user_id
      searchTopicsSimple(panel)
    }
  var panelHistorySearch_menuItemShowAdvancedClick =
    function panelHistorySearch_menuItemShowAdvancedClick() {
      var panel = this
      searchConditionHistory[panel.panelKey].advanced = true
      panel.resize()
      panel.textBoxAdvancedContent.focus()
    }
  var panelHistorySearch_buttonSearchSimpleClick =
    function panelHistorySearch_buttonSearchSimpleClick() {
      searchTopicsSimple(this)
    }
  var panelHistorySearch_textBoxConditionSimpleKeyUp =
    function panelHistorySearch_textBoxConditionSimpleKeyUp(e) {
      var downedKey = keyDownUtil.getKey()
      if (e.keyCode === 13 && downedKey === 13) {
        searchTopicsSimple(this)
      }
    }
  var panelHistorySearch_buttonSearchAdvancedClick =
    function panelHistorySearch_buttonSearchAdvancedClick() {
      searchTopicsAdvanced(this)
    }
  var panelHistorySearch_textBoxAdvancedKeyUp =
    function panelHistorySearch_textBoxAdvancedKeyUp(e) {
      var downedKey = keyDownUtil.getKey()
      if (e.keyCode === 13 && downedKey === 13) {
        searchTopicsAdvanced(this)
      }
    }
  var panelHistorySearch_buttonCloseAdvancedClick =
    function panelHistorySearch_buttonCloseAdvancedClick() {
      var panel = this
      searchConditionHistory[panel.panelKey].advanced = false
      panel.resize()
      panel.textBoxConditionSimple.focus()
    }
  var panelHistorySearch_buttonShowMoreClick =
    function panelHistorySearch_buttonShowMoreClick() {
      searchTopicsShowMore(this)
    }
  var panelHistorySearchTopic_click = function panelHistorySearchTopic_click() {
    openTopic(panelsHistory[this.panelKey], this.topic_id)
  }
  var panelHistorySearchPrevLink_click =
    function panelHistorySearchPrevLink_click() {
      searchPrevNextTopic(panelsHistory[this.panelKey], this.topic_id, false)
    }
  var panelHistorySearchNextLink_click =
    function panelHistorySearchNextLink_click() {
      searchPrevNextTopic(panelsHistory[this.panelKey], this.topic_id, true)
    }
  var panelServerSettings_postCreate =
    function panelServerSettings_postCreate() {
      this.inherited(arguments) // register event listeners
      this.handlers = [
        dojo.connect(
          this.admin_mode_enabled,
          'change',
          getFuncApply(panelServerSettings_adminModeEnabledChange, this),
        ),
        dojo.connect(
          this.block_list_settings,
          'click',
          getFuncApply(panelServerSettings_blockListSettingsClick, this),
        ),
        dojo.connect(
          this.user_management,
          'click',
          getFuncApply(panelServerSettings_userManagementClick, this),
        ),
        dojo.connect(
          this.db_product,
          'change',
          getFuncApply(panelServerSettings_dbProductChange, this),
        ),
        dojo.connect(
          this.db_initialize_mysql,
          'click',
          getFuncApply(panelServerSettings_dbInitializeMysqlClick, this),
        ),
        dojo.connect(
          this.db_hsqldb_stopped,
          'change',
          getFuncApply(panelServerSettings_dbHsqldbStoppedChange, this),
        ),
        dojo.connect(
          this.db_config_db,
          'change',
          getFuncApply(panelServerSettings_dbConfigDbChange, this),
        ),
        dojo.connect(
          this.buttonLogdownloadPrepare,
          'onClick',
          getFuncApply(panelServerSettings_buttonLogdownloadPrepareClick, this),
        ),
        dojo.connect(
          this.buttonLogdownloadCancel,
          'onClick',
          getFuncApply(panelServerSettings_buttonLogdownloadCancelClick, this),
        ),
        dojo.connect(
          this.buttonSaveServerSettings,
          'onClick',
          getFuncApply(panelServerSettings_buttonSaveServerSettingsClick, this),
        ),
        dojo.connect(
          this.buttonCancelServerSettings,
          'onClick',
          getFuncApply(
            panelServerSettings_buttonCancelServerSettingsClick,
            this,
          ),
        ),
      ]
    }
  var panelServerSettings_destroy = function panelServerSettings_destroy() {
    if (this.handlers && this.handlers.length) {
      for (var i = 0; i < this.handlers.length; i++) {
        dojo.disconnect(this.handlers[i])
      }
    }
    this.handlers = null
    this.inherited(arguments)
  }
  var panelServerSettings_adminModeEnabledChange =
    function panelServerSettings_adminModeEnabledChange() {
      var panel = this
      panel.admin_mode_id_enabled.disabled =
        panel.admin_mode_enabled.value !== 'true'
    }
  var panelServerSettings_blockListSettingsClick =
    function panelServerSettings_blockListSettingsClick() {
      openBlockListSettings(null, null, true)
    }
  var panelServerSettings_userManagementClick =
    function panelServerSettings_userManagementClick() {
      openUserManagement(null, null, true)
    }
  var panelServerSettings_dbProductChange =
    function panelServerSettings_dbProductChange() {
      var panel = this
      if (panel.db_product.value === '1') {
        panel.db_schema_org.value = panel.db_schema.value
        panel.db_user_org.value = panel.db_user.value
        panel.db_password_org.value = panel.db_password.value
        panel.db_schema.value = 'chat'
        panel.db_user.value = 'sa'
        panel.db_password.value = ''
        panel.db_schema.disabled = true
        panel.db_user.disabled = true
        panel.db_password.disabled = true
        if (
          string(
            serverSettingsWorkData[panel.panelKey] &&
              serverSettingsWorkData[panel.panelKey].systemProperties &&
              serverSettingsWorkData[panel.panelKey].systemProperties.db
                .product,
          ) === '1' &&
          string(
            serverSettingsWorkData[panel.panelKey].systemProperties.db
              .hsqldb_stopped,
          )
        ) {
          panel.db_hsqldb_stopped.disabled = false
          if (panel.db_hsqldb_stopped.value === 'true') {
            panel.db_hsqldb_stopped.style.color = 'red'
          } else {
            panel.db_hsqldb_stopped.style.color = ''
          }
        } else {
          panel.db_hsqldb_stopped.disabled = true
          panel.db_hsqldb_stopped.style.color = ''
        }
      } else {
        panel.db_schema.value = panel.db_schema_org.value
        panel.db_user.value = panel.db_user_org.value
        panel.db_password.value = panel.db_password_org.value
        panel.db_schema.disabled = false
        panel.db_user.disabled = false
        panel.db_password.disabled = false
        panel.db_hsqldb_stopped.disabled = true
        panel.db_hsqldb_stopped.style.color = ''
      }
    }
  var panelServerSettings_dbInitializeMysqlClick =
    function panelServerSettings_dbInitializeMysqlClick() {
      var panel = this
      require([
        'dijit/Dialog',
        'dijit/layout/ContentPane',
        'dijit/form/Button',
      ], function (Dialog, ContentPane, Button) {
        var keys = [
          'host',
          'port',
          'schema',
          'user',
          'password',
          'admin_user',
          'admin_password',
          'additional_options',
        ]
        var defaults = {
          host: 'localhost',
          port: '3306',
          schema: 'chat',
          user: 'chat',
        }
        var inputs = {}
        var checkboxSave = null
        var progress = null
        var options = {}
        var next_ignore_warnings = false
        var finalResult = null
        var task_id = null
        var dia = new Dialog({
          title: ucMsgs.LBL_DB_INITIALIZE_DIALOG,
          closable: false,
          onShow: function onShow(e) {
            dia.containerNode.style.textAlign = 'right'
            pane.domNode.style.textAlign = 'left'
            keys.forEach(function (key) {
              var div = document.createElement('div')
              div.style.whiteSpace = 'nowrap'
              div.style.lineHeight = '30px'
              pane.domNode.appendChild(div)
              var span = document.createElement('span')
              span.textContent =
                ucMsgs['LBL_DB_INITIALIZE_INPUT_' + key.toUpperCase()] || key
              span.style.display = 'inline-block'
              span.style.width = '200px'
              div.appendChild(span)
              var input = document.createElement('input')
              if (key.indexOf('password') !== -1) {
                input.type = 'password'
                input.value = ''
              } else {
                input.type = 'text'
                if (panel.db_product.value === '1' || !panel.db_schema.value) {
                  // hsqldb or uninitialized mysql
                  input.value = string(defaults[key])
                } else {
                  // mysql already initialized
                  input.value = string((panel['db_' + key] || {}).value)
                }
              }
              input.style.width =
                key === 'additional_options' ? '350px' : '150px'
              div.appendChild(input)
              inputs[key] = input
            })
            var div = document.createElement('div')
            div.style.whiteSpace = 'nowrap'
            div.style.lineHeight = '30px'
            pane.domNode.appendChild(div)
            checkboxSave = document.createElement('input')
            checkboxSave.id = 'checkbox_save_' + +new Date()
            checkboxSave.type = 'checkbox'
            checkboxSave.checked = true
            checkboxSave.style.display = 'none'
            div.appendChild(checkboxSave)
            var label = document.createElement('label')
            label.htmlFor = checkboxSave.id
            label.className = 'brUCLabelDbInitializeMysql'
            label.textContent = ucMsgs.LBL_DB_INITIALIZE_CHECKBOX_SAVE
            div.appendChild(label)
            var dummyCheckbox = document.createElement('span')
            dummyCheckbox.className = 'dijitCheckBox'
            label.insertBefore(dummyCheckbox, label.firstChild)
          },
        })
        var pane = new ContentPane({
          style:
            'width:' +
            Math.min(600, window.innerWidth / 2) +
            'px;height:' +
            window.innerHeight / 2 +
            'px;',
        })
        var okButton = new Button({
          label: ucMsgs.CMN_OK,
          onClick: function onClick(e) {
            if (!finalResult) {
              okButton.setDisabled(true)
              cancelButton.setDisabled(true)
              options = {}
              keys.forEach(function (key) {
                options[key] = inputs[key].value
                inputs[key].disabled = true
              })
              options['ignore_warnings'] = next_ignore_warnings
              next_ignore_warnings = false
              chatClient.createDatabase(
                options,
                function (ev) {
                  if (ev.status === 0) {
                    task_id = ev.task_id
                    progress = document.createElement('div')
                    progress.className = 'brUCPanelNowSearchingTopics'
                    progress.style.backgroundPosition = 'center'
                    progress.style.display = 'block'
                    pane.domNode.appendChild(progress)
                    pane.domNode.scrollTop = pane.domNode.scrollHeight
                  } else {
                    next_ignore_warnings = true
                    var div = document.createElement('div')
                    div.className = 'brUCSpanMessage'
                    div.style.display = 'block'
                    div.textContent =
                      ev.schema_count > 0
                        ? formatStr(
                            ucMsgs.MSG_DB_INITIALIZE_SCHEMA_EXISTS,
                            inputs['schema'].value,
                          )
                        : ev.user_count > 0
                          ? formatStr(
                              ucMsgs.MSG_DB_INITIALIZE_USER_EXISTS,
                              inputs['user'].value,
                            )
                          : formatStr(
                              ucMsgs.MSG_DB_INITIALIZE_WARNING,
                              JSON.stringify(ev),
                            )
                    pane.domNode.appendChild(div)
                    pane.domNode.scrollTop = pane.domNode.scrollHeight
                    okButton.setDisabled(false)
                    cancelButton.setDisabled(false)
                  }
                },
                function (ev) {
                  var div = document.createElement('div')
                  div.className = 'brUCSpanMessage'
                  div.style.display = 'block'
                  div.textContent = ev.message + ' (' + ev.code + ')'
                  pane.domNode.appendChild(div)
                  pane.domNode.scrollTop = pane.domNode.scrollHeight
                  okButton.setDisabled(false)
                  cancelButton.setDisabled(false)
                  keys.forEach(function (key) {
                    inputs[key].disabled = false
                  })
                },
              )
            } else {
              panel.db_product.value = '2'
              keys.forEach(function (key) {
                ;(panel['db_' + key] || {}).value = options[key]
              })
              panel.db_table_definition_ver.innerHTML = ''
              ;(string(finalResult.table_definitions) || '0.0.0')
                .split(',')
                .forEach(function (table_definition) {
                  var option = document.createElement('option')
                  option.value = table_definition
                  option.innerHTML = escapeHTML(table_definition)
                  option.selected =
                    finalResult.table_definition_ver === table_definition
                  panel.db_table_definition_ver.appendChild(option)
                })
              panel.db_schema.disabled = false
              panel.db_user.disabled = false
              panel.db_password.disabled = false
              panel.db_hsqldb_stopped.disabled = true
              panel.db_hsqldb_stopped.style.color = ''
              if (checkboxSave.checked) {
                // save
                panel.buttonSaveServerSettings.set('disabled', true)
                panel.spanMessage.style.display = 'none'
                panel.progressServerSettings.style.display = 'block'
                var db = {
                  product: 2,
                  host: options.host,
                  port: int(options.port),
                  schema: options.schema,
                  user: options.user,
                  password: options.password,
                  additional_options: options.additional_options,
                }
                chatClient.saveSystemProperties(
                  { type: 'db', db: db },
                  function (ev) {
                    // funcOK
                    var result = (ev && ev.result) || {}
                    serverSettingsWorkData[panel.panelKey] =
                      serverSettingsWorkData[panel.panelKey] || {}
                    serverSettingsWorkData[panel.panelKey].systemPropertiesOrg =
                      serverSettingsWorkData[panel.panelKey]
                        .systemPropertiesOrg || {}
                    serverSettingsWorkData[
                      panel.panelKey
                    ].systemPropertiesOrg.db =
                      serverSettingsWorkData[panel.panelKey].systemPropertiesOrg
                        .db || {}
                    Object.assign(
                      serverSettingsWorkData[panel.panelKey].systemPropertiesOrg
                        .db,
                      db,
                    )
                    var messageHTML =
                      ucMsgs.MSG_SAVE_SERVER_SUCCESSFUL_DB +
                      ' ' +
                      formatTimeNowWithSecond()
                    if (result.ecode_db !== 1) {
                      messageHTML +=
                        '<br />Database connection is not established.'
                    }
                    if (result.saved !== 1) {
                      messageHTML +=
                        '<br />Warning: ' + escapeHTML(JSON.stringify(result))
                    }
                    panel.spanMessage.innerHTML = messageHTML
                    panel.spanMessage.style.display = 'inline-block'
                    panel.progressServerSettings.style.display = 'none'
                    panel.panelServerSettingsTable.domNode.scrollTop = 0
                    panel.buttonDummy.focus()
                    panel.buttonSaveServerSettings.set('disabled', false)
                  },
                  function (ev) {
                    // funcError
                    logger.log(
                      'warn',
                      'saveSystemProperties error code: ' +
                        ev.code +
                        ', message: ' +
                        ev.message,
                    )
                    panel.spanMessage.innerHTML =
                      ucMsgs.MSG_SAVE_SERVER_FAILED +
                      ' (' +
                      ev.code +
                      ' ' +
                      ev.message +
                      ')'
                    panel.spanMessage.style.display = 'inline-block'
                    panel.progressServerSettings.style.display = 'none'
                    panel.panelServerSettingsTable.domNode.scrollTop = 0
                    panel.buttonDummy.focus()
                    panel.buttonSaveServerSettings.set('disabled', false)
                  },
                )
              }
              chatClient.removeHandler(handler)
              dia.destroy()
            }
          },
        })
        var cancelButton = new Button({
          label: ucMsgs.CMN_CANCEL,
          onClick: function onClick(e) {
            chatClient.removeHandler(handler)
            dia.destroy()
          },
        })
        var handler = {
          createDatabaseEnded: function createDatabaseEnded(ev) {
            if (ev && ev.task_id === task_id) {
              finalResult = ev
              if (progress) {
                progress.style.display = 'none'
              }
              var div = document.createElement('div')
              div.className = 'brUCSpanMessage'
              div.style.display = 'block'
              div.textContent = ev.error
                ? formatStr(ucMsgs.MSG_DB_INITIALIZE_ERROR, ev.error)
                : ucMsgs.MSG_DB_INITIALIZE_SUCCESSFUL
              pane.domNode.appendChild(div)
              pane.domNode.scrollTop = pane.domNode.scrollHeight
              okButton.setDisabled(false)
            }
          },
        }
        dia.addChild(pane)
        dia.addChild(okButton)
        dia.addChild(cancelButton)
        dia.show()
        chatClient.addHandler(handler)
      })
    }
  var panelServerSettings_dbHsqldbStoppedChange =
    function panelServerSettings_dbHsqldbStoppedChange() {
      var panel = this
      if (panel.db_hsqldb_stopped.value === 'true') {
        panel.db_hsqldb_stopped.style.color = 'red'
        windowAlert(ucMsgs.CMN_ALERT, ucMsgs.MSG_CHANGE_DB_HSQLDB_STOPPED_TRUE)
      } else {
        panel.db_hsqldb_stopped.style.color = ''
      }
    }
  var panelServerSettings_dbConfigDbChange =
    function panelServerSettings_dbConfigDbChange() {
      var panel = this
      if (panel.db_config_db.value === 'true') {
        windowAlert(ucMsgs.CMN_ALERT, ucMsgs.MSG_CHANGE_DB_CONFIG_DB_TRUE)
      }
    }
  var panelServerSettings_buttonLogdownloadPrepareClick =
    function panelServerSettings_buttonLogdownloadPrepareClick() {
      prepareDebugLog(this)
    }
  var panelServerSettings_buttonLogdownloadCancelClick =
    function panelServerSettings_buttonLogdownloadCancelClick() {
      cancelDebugLog(this)
    }
  var panelServerSettings_buttonSaveServerSettingsClick =
    function panelServerSettings_buttonSaveServerSettingsClick() {
      saveServerSettings(this)
    }
  var panelServerSettings_buttonCancelServerSettingsClick =
    function panelServerSettings_buttonCancelServerSettingsClick() {
      cancelDebugLog(this)
      _closeTab(this)
    }
  var panelBlockListSettings_postCreate =
    function panelBlockListSettings_postCreate() {
      this.inherited(arguments) // register event listeners
      this.handlers = [
        dojo.connect(
          this.refresh_block_list,
          'click',
          getFuncApply(panelBlockListSettings_refreshBlockListClick, this),
        ),
        dojo.connect(
          this.buttonSaveBlockListSettings,
          'onClick',
          getFuncApply(
            panelBlockListSettings_buttonSaveBlockListSettingsClick,
            this,
          ),
        ),
        dojo.connect(
          this.buttonCancelBlockListSettings,
          'onClick',
          getFuncApply(
            panelBlockListSettings_buttonCancelBlockListSettingsClick,
            this,
          ),
        ),
      ]
    }
  var panelBlockListSettings_destroy =
    function panelBlockListSettings_destroy() {
      if (this.handlers && this.handlers.length) {
        for (var i = 0; i < this.handlers.length; i++) {
          dojo.disconnect(this.handlers[i])
        }
      }
      this.handlers = null
      this.inherited(arguments)
    }
  var panelBlockListSettingsButtonDelete_click =
    function panelBlockListSettingsButtonDelete_click() {
      var panel = this.panel
      var ip = this.ip
      var index = this.index
      windowConfirm(
        'Delete',
        'Are you sure you want to delete "' +
          ip +
          '" from the block list?' +
          '<br />',
        function () {
          var tr = dojo.query(
            'tr[data-brekeke-uc-index=' + index + ']',
            panel.tbodyBlockList,
          )[0]
          var buttonDelete = dojo.query(
            'input[data-brekeke-uc-index=' + index + ']',
            panel.tbodyBlockList,
          )[0]
          buttonDelete &&
            buttonDelete.style &&
            (buttonDelete.style.pointerEvents = 'none')
          chatClient.removeBlockedAddress(
            { ip: ip },
            function (ev) {
              // funcOK
              panel.spanMessage.innerHTML =
                'Successfully deleted "' +
                ip +
                '" from the block list. ' +
                formatTimeNowWithSecond()
              panel.spanMessage.style.display = 'inline-block'
              panel.panelBlockListSettingsTable.domNode.scrollTop = 0
              tr && tr.style && (tr.style.display = 'none')
            },
            function (ev) {
              // funcError
              logger.log(
                'warn',
                'removeBlockedAddress error code: ' +
                  ev.code +
                  ', message: ' +
                  ev.message,
              )
              panel.spanMessage.innerHTML =
                'Failed to delete "' +
                ip +
                '". (' +
                ev.code +
                ' ' +
                ev.message +
                ')'
              panel.spanMessage.style.display = 'inline-block'
              panel.panelBlockListSettingsTable.domNode.scrollTop = 0
              buttonDelete &&
                buttonDelete.style &&
                (buttonDelete.style.pointerEvents = '')
            },
          )
        },
      )
    }
  var panelBlockListSettings_refreshBlockListClick =
    function panelBlockListSettings_refreshBlockListClick() {
      var panel = this
      panel &&
        panel.refresh_block_list &&
        panel.refresh_block_list.style &&
        (panel.refresh_block_list.style.pointerEvents = 'none')
      chatClient.loadBlockListSettings(
        function (ev) {
          // funcOK
          var oldTrs = dojo.query('tr', panel.tbodyBlockList)
          for (var i = oldTrs.length - 1; i >= 0; i--) {
            panel.tbodyBlockList.removeChild(oldTrs[i])
          }
          ;(ev.blocklist.blocked || [])
            .sort(function (a, b) {
              return int(a.time) - int(b.time)
            })
            .forEach(function (entry, index) {
              if (entry.ip) {
                var tr = document.createElement('tr')
                tr.setAttribute('data-brekeke-uc-index', string(index))
                var td1 = document.createElement('td')
                td1.innerHTML = escapeHTML(string(entry.ip))
                tr.appendChild(td1)
                var td2 = document.createElement('td')
                td2.innerHTML = escapeHTML(
                  stringifyDate(new Date(int(entry.time))),
                )
                tr.appendChild(td2)
                var tdDelete = document.createElement('td')
                var buttonDelete = document.createElement('input')
                buttonDelete.setAttribute(
                  'data-brekeke-uc-index',
                  string(index),
                )
                buttonDelete.type = 'image'
                buttonDelete.src = 'img/delete.png'
                buttonDelete.alt = 'Delete'
                buttonDelete.title = 'Delete'
                tdDelete.appendChild(buttonDelete)
                tr.appendChild(tdDelete)
                panel.tbodyBlockList.appendChild(tr) // register event
                panel.handlers.push(
                  dojo.connect(
                    buttonDelete,
                    'click',
                    getFuncApply(panelBlockListSettingsButtonDelete_click, {
                      panel: panel,
                      ip: string(entry.ip),
                      index: index,
                    }),
                  ),
                )
              }
            })
          panel &&
            panel.refresh_block_list &&
            panel.refresh_block_list.style &&
            (panel.refresh_block_list.style.pointerEvents = '')
        },
        function (ev) {
          // funcError
          logger.log(
            'warn',
            'loadBlockListSettings error code: ' +
              ev.code +
              ', message: ' +
              ev.message,
          )
          panel &&
            panel.refresh_block_list &&
            panel.refresh_block_list.style &&
            (panel.refresh_block_list.style.pointerEvents = '')
        },
      )
    }
  var panelBlockListSettings_buttonSaveBlockListSettingsClick =
    function panelBlockListSettings_buttonSaveBlockListSettingsClick() {
      saveBlockListSettings(this)
    }
  var panelBlockListSettings_buttonCancelBlockListSettingsClick =
    function panelBlockListSettings_buttonCancelBlockListSettingsClick() {
      _closeTab(this)
    }
  var panelUserManagement_postCreate =
    function panelUserManagement_postCreate() {
      this.inherited(arguments) // register event listeners
      this.handlers = [
        dojo.connect(
          this.buttonStartUserSearch,
          'onClick',
          getFuncApply(panelUserManagement_buttonStartUserSearchClick, this),
        ),
        dojo.connect(
          this.buttonCancelUserSearch,
          'onClick',
          getFuncApply(panelUserManagement_buttonCancelUserSearchClick, this),
        ),
        dojo.connect(
          this.buttonMoveRightDeleteUserData,
          'onClick',
          getFuncApply(
            panelUserManagement_buttonMoveRightDeleteUserDataClick,
            this,
          ),
        ),
        dojo.connect(
          this.buttonMoveLeftDeleteUserData,
          'onClick',
          getFuncApply(
            panelUserManagement_buttonMoveLeftDeleteUserDataClick,
            this,
          ),
        ),
        dojo.connect(
          this.checkBoxAutoSelectDeleteUserData,
          'onChange',
          getFuncApply(
            panelUserManagement_checkBoxAutoSelectDeleteUserDataChange,
            this,
          ),
        ),
        dojo.connect(
          this.buttonStartUserDelete,
          'onClick',
          getFuncApply(panelUserManagement_buttonStartUserDeleteClick, this),
        ),
        dojo.connect(
          this.buttonCancelUserManagement,
          'onClick',
          getFuncApply(
            panelUserManagement_buttonCancelUserManagementClick,
            this,
          ),
        ),
      ]
    }
  var panelUserManagement_destroy = function panelUserManagement_destroy() {
    if (this.handlers && this.handlers.length) {
      for (var i = 0; i < this.handlers.length; i++) {
        dojo.disconnect(this.handlers[i])
      }
    }
    this.handlers = null
    this.inherited(arguments)
  }
  var panelUserManagement_buttonStartUserSearchClick =
    function panelUserManagement_buttonStartUserSearchClick() {
      var panel = this
      if (
        userManagementWorkData[panel.panelKey] &&
        userManagementWorkData[panel.panelKey].user_search_id
      ) {
        logger.log('warn', 'UserSearch already started')
        return
      }
      panel.buttonStartUserSearch.set('disabled', true)
      panel.buttonStartUserDelete.set('disabled', true)
      panel.buttonCancelUserSearch.set('disabled', false)
      while (panel.selectUsersNotToDelete.firstChild) {
        panel.selectUsersNotToDelete.removeChild(
          panel.selectUsersNotToDelete.lastChild,
        )
      }
      while (panel.selectUsersToDelete.firstChild) {
        panel.selectUsersToDelete.removeChild(
          panel.selectUsersToDelete.lastChild,
        )
      }
      panel.spanProgressUserSearch.innerHTML = '0%'
      panel.areaProgressUserSearch.style.display = 'block'
      chatClient.startUserSearch(
        {
          tenant: panel.inputStartUserSearchTenant.value || null,
          user_id: panel.inputStartUserSearchUserId.value
            ? string(panel.inputStartUserSearchUserId.value) + '%'
            : null,
        },
        function (ev) {
          // funcOK
          userManagementWorkData[panel.panelKey] =
            userManagementWorkData[panel.panelKey] || {}
          userManagementWorkData[panel.panelKey].user_search_id =
            ev.user_search_id
        },
        function (ev) {
          // funcError
          logger.log(
            'warn',
            'startUserSearch error code: ' +
              ev.code +
              ', message: ' +
              ev.message,
          )
          windowAlert(
            ucMsgs.CMN_ALERT,
            'startUserSearch error (' + ev.code + ' ' + ev.message + ')',
          )
          panel.buttonStartUserSearch.set('disabled', false)
          panel.areaProgressUserSearch.style.display = 'none'
        },
      )
    }
  var panelUserManagement_buttonCancelUserSearchClick =
    function panelUserManagement_buttonCancelUserSearchClick() {
      var panel = this
      if (
        !userManagementWorkData[panel.panelKey] ||
        !userManagementWorkData[panel.panelKey].user_search_id
      ) {
        logger.log('warn', 'UserSearch already stopped')
        return
      }
      panel.buttonCancelUserSearch.set('disabled', true)
      chatClient.cancelUserSearch({
        user_search_id: userManagementWorkData[panel.panelKey].user_search_id,
      })
    }
  var panelUserManagement_buttonMoveRightDeleteUserDataClick =
    function panelUserManagement_buttonMoveRightDeleteUserDataClick() {
      var panel = this
      var selectedOptions = Array.prototype.slice.call(
        panel.selectUsersNotToDelete.selectedOptions,
      )
      for (var i = 0; i < selectedOptions.length; i++) {
        panelUserManagementSelectUsers_appendChild(
          panel.selectUsersToDelete,
          panel.selectUsersNotToDelete.removeChild(selectedOptions[i]),
        )
        panel.buttonStartUserDelete.set('disabled', false)
      }
    }
  var panelUserManagement_buttonMoveLeftDeleteUserDataClick =
    function panelUserManagement_buttonMoveLeftDeleteUserDataClick() {
      var panel = this
      var selectedOptions = Array.prototype.slice.call(
        panel.selectUsersToDelete.selectedOptions,
      )
      for (var i = 0; i < selectedOptions.length; i++) {
        panelUserManagementSelectUsers_appendChild(
          panel.selectUsersNotToDelete,
          panel.selectUsersToDelete.removeChild(selectedOptions[i]),
        )
      }
    }
  var panelUserManagementSelectUsers_appendChild =
    function panelUserManagementSelectUsers_appendChild(selectUsers, newNode) {
      // sort automatically
      for (var i = 0; i < selectUsers.childNodes.length; i++) {
        if (newNode.value < selectUsers.childNodes[i].value) {
          selectUsers.insertBefore(newNode, selectUsers.childNodes[i])
          return
        }
      }
      selectUsers.appendChild(newNode)
    }
  var panelUserManagement_checkBoxAutoSelectDeleteUserDataChange =
    function panelUserManagement_checkBoxAutoSelectDeleteUserDataChange(
      checked,
    ) {
      var panel = this
      if (checked) {
        for (
          var i = 0;
          i < panel.selectUsersNotToDelete.childNodes.length;
          i++
        ) {
          panel.selectUsersNotToDelete.childNodes[i].selected =
            panel.selectUsersNotToDelete.childNodes[i].getAttribute(
              'data-brekeke-uc-pbx',
            ) === 'false'
        }
      }
    }
  var panelUserManagement_buttonStartUserDeleteClick =
    function panelUserManagement_buttonStartUserDeleteClick() {
      var panel = this
      if (
        userManagementWorkData[panel.panelKey] &&
        userManagementWorkData[panel.panelKey].user_delete_id
      ) {
        logger.log('warn', 'UserDelete already started')
        return
      }
      var users = []
      var tenants = []
      for (var i = 0; i < panel.selectUsersToDelete.childNodes.length; i++) {
        var value = string(panel.selectUsersToDelete.childNodes[i].value)
        if (value) {
          var index = value.indexOf('.')
          if (index === -1) {
            users.push({ tenant: value })
            tenants.push(value)
          } else {
            users.push({
              tenant: value.substring(0, index),
              user_id: value.substring(index + 1),
            })
          }
        }
      }
      if (users.length === 0) {
        windowAlert(ucMsgs.CMN_ALERT, ucMsgs.MSG_START_USER_DELETE_EMPTY)
        return
      }
      var startUserDeleteFunc = function startUserDeleteFunc() {
        panel.buttonStartUserDelete.set('disabled', true)
        panel.buttonStartUserSearch.set('disabled', true)
        panel.spanProgressUserDelete.style.display = 'inline-block'
        chatClient.startUserDelete(
          { users: users },
          function (ev) {
            // funcOK
            userManagementWorkData[panel.panelKey] =
              userManagementWorkData[panel.panelKey] || {}
            userManagementWorkData[panel.panelKey].user_delete_id =
              ev.user_delete_id
          },
          function (ev) {
            // funcError
            logger.log(
              'warn',
              'startUserDelete error code: ' +
                ev.code +
                ', message: ' +
                ev.message,
            )
            windowAlert(
              ucMsgs.CMN_ALERT,
              'startUserDelete error (' + ev.code + ' ' + ev.message + ')',
            )
            panel.buttonStartUserSearch.set('disabled', false)
            panel.spanProgressUserDelete.style.display = 'none'
          },
        )
      }
      var usersList = users
        .map(function (u) {
          return u.tenant + '.' + (u.user_id || '*')
        })
        .join('<br />')
      if (tenants.length >= 1) {
        windowConfirm(
          ucMsgs.LBL_START_USER_DELETE_TITLE,
          ucMsgs.MSG_START_USER_DELETE_CONFIRM +
            '<br /><br />' +
            usersList +
            '<br /><br />',
          function () {
            windowConfirm(
              ucMsgs.LBL_START_USER_DELETE_TITLE,
              ucMsgs.MSG_START_USER_DELETE_TENANT_CONFIRM +
                '<br /><br />' +
                tenants.join('<br />') +
                '<br /><br />',
              startUserDeleteFunc,
            )
          },
        )
      } else {
        windowConfirm(
          ucMsgs.LBL_START_USER_DELETE_TITLE,
          ucMsgs.MSG_START_USER_DELETE_CONFIRM +
            '<br /><br />' +
            usersList +
            '<br /><br />',
          startUserDeleteFunc,
        )
      }
    }
  var panelUserManagement_buttonCancelUserManagementClick =
    function panelUserManagement_buttonCancelUserManagementClick() {
      _closeTab(this)
    }
  var panelTenantTable_postCreate = function panelTenantTable_postCreate() {
    this.inherited(arguments) // register event listeners
    this.handlers = [
      dojo.connect(
        this.buttonNewTenant,
        'onClick',
        getFuncApply(panelTenantTable_buttonNewTenantClick, this),
      ),
      dojo.connect(
        this.buttonPbxTenant,
        'onClick',
        getFuncApply(panelTenantTable_buttonPbxTenantClick, this),
      ),
      dojo.connect(
        this.buttonCancelTenantTable,
        'onClick',
        getFuncApply(panelTenantTable_buttonCancelTenantTableClick, this),
      ),
    ]
  }
  var panelTenantTable_destroy = function panelTenantTable_destroy() {
    if (this.handlers && this.handlers.length) {
      for (var i = 0; i < this.handlers.length; i++) {
        dojo.disconnect(this.handlers[i])
      }
    }
    this.handlers = null
    this.inherited(arguments)
  }
  var panelTenantTable_buttonNewTenantClick =
    function panelTenantTable_buttonNewTenantClick() {
      var panel = this
      windowPrompt(
        ucMsgs.LBL_NEW_TENANT_TITLE,
        '',
        ucMsgs.LBL_NEW_TENANT_NAME,
        '',
        function (tenant) {
          if (tenant !== '') {
            if (
              tenantTableWorkData[panel.panelKey][tenant] &&
              tenantTableWorkData[panel.panelKey][tenant].tenantDeleted !== '1'
            ) {
              // already exists
              panel.spanMessage.innerHTML =
                ucMsgs.MSG_SAVE_TENANT_FAILED + ' (Already exists)'
              panel.spanMessage.style.display = 'inline-block'
              panel.panelTenantTableTable.domNode.scrollTop = 0
            } else {
              panel.spanMessage.style.display = 'none'
              chatClient.createTenantProperties(
                tenant,
                function (ev) {
                  // funcOK
                  chatClient.loadTenantProperties(
                    function (ev) {
                      // funcOK
                      tenantTableWorkData[panel.panelKey] = ev.tenantProperties
                      displayTenantTable(panel)
                    },
                    function (ev) {
                      // funcError
                      logger.log(
                        'warn',
                        'loadTenantProperties error code: ' +
                          ev.code +
                          ', message: ' +
                          ev.message,
                      )
                    },
                  )
                  openTenantProperty(tenant, null, null, true)
                },
                function (ev) {
                  // funcError
                  logger.log(
                    'warn',
                    'createTenantProperties error code: ' +
                      ev.code +
                      ', message: ' +
                      ev.message,
                  )
                  panel.spanMessage.innerHTML =
                    ucMsgs.MSG_SAVE_TENANT_FAILED +
                    ' (' +
                    ev.code +
                    ' ' +
                    ev.message +
                    ')'
                  panel.spanMessage.style.display = 'inline-block'
                  panel.panelTenantTableTable.domNode.scrollTop = 0
                },
              )
            }
          }
        },
      )
    }
  var panelTenantTable_buttonPbxTenantClick =
    function panelTenantTable_buttonPbxTenantClick() {
      var panel = this
      windowConfirm(
        ucMsgs.LBL_LOAD_TENANT_TITLE,
        ucMsgs.MSG_LOAD_TENANT_CONFIRM + '<br />',
        function () {
          panel.spanMessage.style.display = 'none'
          chatClient.createTenantListFromPbx(
            function (ev) {
              // funcOK
              tenantTableWorkData[panel.panelKey] = ev.tenantProperties
              displayTenantTable(panel)
            },
            function (ev) {
              // funcError
              logger.log(
                'warn',
                'createTenantListFromPbx error code: ' +
                  ev.code +
                  ', message: ' +
                  ev.message,
              )
              panel.spanMessage.innerHTML =
                ucMsgs.MSG_SAVE_TENANT_FAILED +
                ' (' +
                ev.code +
                ' ' +
                ev.message +
                ')'
              panel.spanMessage.style.display = 'inline-block'
              panel.panelTenantTableTable.domNode.scrollTop = 0
            },
          )
        },
      )
    }
  var panelTenantTable_buttonCancelTenantTableClick =
    function panelTenantTable_buttonCancelTenantTableClick() {
      _closeTab(this)
    }
  var panelTenantTableLinkTenant_click =
    function panelTenantTableLinkTenant_click() {
      openTenantProperty(this.tenant, null, null, true)
    }
  var panelTenantTableLinkTwitter_click =
    function panelTenantTableLinkTwitter_click() {
      openTwitterSettings(this.tenant, null, null, true)
    }
  var panelTenantTableLinkFacebook_click =
    function panelTenantTableLinkFacebook_click() {
      openFacebookSettings(this.tenant, null, null, true)
    }
  var panelTenantTableLinkLine_click =
    function panelTenantTableLinkLine_click() {
      openLineSettings(this.tenant, null, null, true)
    }
  var panelTenantTableLinkWatson_click =
    function panelTenantTableLinkWatson_click() {
      openWatsonSettings(this.tenant, null, null, true)
    }
  var panelTenantTableLinkEmail_click =
    function panelTenantTableLinkEmail_click() {
      openEmailSettings(this.tenant, null, null, true)
    }
  var panelTenantTableLinkGuest_click =
    function panelTenantTableLinkGuest_click() {
      openGuestSettings(this.tenant, null, null, true)
    }
  var panelTenantTableButtonDelete_click =
    function panelTenantTableButtonDelete_click() {
      var panel = this.panel
      var tenant = this.tenant
      windowConfirm(
        ucMsgs.LBL_DELETE_TENANT_TITLE,
        ucMsgs.MSG_DELETE_TENANT_CONFIRM + '<br />',
        function () {
          if (tenantTableWorkData[panel.panelKey][tenant]) {
            tenantTableWorkData[panel.panelKey][tenant].tenantDeleted = '1'
            panel.spanMessage.style.display = 'none'
            var tenantProperties = {}
            tenantProperties[tenant] =
              tenantTableWorkData[panel.panelKey][tenant]
            chatClient.saveTenantProperties(
              tenantProperties,
              function (ev) {
                // funcOK
                chatClient.loadTenantProperties(
                  function (ev) {
                    // funcOK
                    tenantTableWorkData[panel.panelKey] = ev.tenantProperties
                    displayTenantTable(panel)
                    if (panelsTenantProperty[tenant]) {
                      _closeTab(panelsTenantProperty[tenant])
                    }
                  },
                  function (ev) {
                    // funcError
                    logger.log(
                      'warn',
                      'loadTenantProperties error code: ' +
                        ev.code +
                        ', message: ' +
                        ev.message,
                    )
                  },
                )
              },
              function (ev) {
                // funcError
                logger.log(
                  'warn',
                  'saveTenantProperties error code: ' +
                    ev.code +
                    ', message: ' +
                    ev.message,
                )
                panel.spanMessage.innerHTML =
                  ucMsgs.MSG_SAVE_TENANT_FAILED +
                  ' (' +
                  ev.code +
                  ' ' +
                  ev.message +
                  ')'
                panel.spanMessage.style.display = 'inline-block'
                panel.panelTenantTableTable.domNode.scrollTop = 0
              },
            )
          } else {
            logger.log(
              'error',
              'not found tenantTableWorkData of tenant==' + tenant,
            )
          }
        },
      )
    }
  var panelTenantProperty_postCreate =
    function panelTenantProperty_postCreate() {
      this.inherited(arguments) // register event listeners
      this.handlers = [
        dojo.connect(
          this.radioButtonLanguageSettingAuto,
          'onChange',
          getFuncApply(
            panelTenantProperty_radioButtonLanguageSettingChange,
            this,
          ),
        ),
        dojo.connect(
          this.radioButtonLanguageSettingUser,
          'onChange',
          getFuncApply(
            panelTenantProperty_radioButtonLanguageSettingChange,
            this,
          ),
        ),
        dojo.connect(
          this.buttonNewWebRTCType,
          'onClick',
          getFuncApply(panelTenantProperty_buttonNewWebRTCTypeClick, this),
        ),
        dojo.connect(
          this.selectWebRTCTypeName,
          'change',
          getFuncApply(panelTenantProperty_selectWebRTCTypeNameChange, this),
        ),
        dojo.connect(
          this.radioButtonWebchatEnabledOn,
          'onChange',
          getFuncApply(
            panelTenantProperty_radioButtonWebchatEnabledChange,
            this,
          ),
        ),
        dojo.connect(
          this.radioButtonWebchatEnabledOff,
          'onChange',
          getFuncApply(
            panelTenantProperty_radioButtonWebchatEnabledChange,
            this,
          ),
        ),
        dojo.connect(
          this.buttonNewWebchatService,
          'onClick',
          getFuncApply(panelTenantProperty_buttonNewWebchatServiceClick, this),
        ),
        dojo.connect(
          this.buttonNewAutoMessage,
          'onClick',
          getFuncApply(panelTenantProperty_buttonNewAutoMessageClick, this),
        ),
        dojo.connect(
          this.imgAutoMessageDefaultImage,
          'click',
          getFuncApply(
            panelTenantProperty_imgAutoMessageDefaultImageClick,
            this,
          ),
        ),
        dojo.connect(
          this.buttonUploadAutoMessageDefaultImage,
          'onClick',
          getFuncApply(
            panelTenantProperty_buttonUploadAutoMessageDefaultImageClick,
            this,
          ),
        ),
        dojo.connect(
          this.inputAutoMessageImageForm,
          'change',
          getFuncApply(
            panelTenantProperty_inputAutoMessageImageFormChange,
            this,
          ),
        ),
        dojo.connect(
          this.buttonDeleteAutoMessageDefaultImage,
          'onClick',
          getFuncApply(
            panelTenantProperty_buttonDeleteAutoMessageDefaultImageClick,
            this,
          ),
        ),
        dojo.connect(
          this.buttonNewWebchatWidget,
          'onClick',
          getFuncApply(panelTenantProperty_buttonNewWebchatWidgetClick, this),
        ),
        dojo.connect(
          this.buttonNewLampType,
          'onClick',
          getFuncApply(panelTenantProperty_buttonNewLampTypeClick, this),
        ),
        dojo.connect(
          this.radioButtonPNEnabledOn,
          'onChange',
          getFuncApply(panelTenantProperty_radioButtonPNEnabledChange, this),
        ),
        dojo.connect(
          this.radioButtonPNEnabledOff,
          'onChange',
          getFuncApply(panelTenantProperty_radioButtonPNEnabledChange, this),
        ),
        dojo.connect(
          this.buttonNewCustomizeT,
          'onClick',
          getFuncApply(panelTenantProperty_buttonNewCustomizeTClick, this),
        ),
        dojo.connect(
          this.buttonSaveTenantProperty,
          'onClick',
          getFuncApply(panelTenantProperty_buttonSaveTenantPropertyClick, this),
        ),
        dojo.connect(
          this.buttonCancelTenantProperty,
          'onClick',
          getFuncApply(
            panelTenantProperty_buttonCancelTenantPropertyClick,
            this,
          ),
        ),
      ]
    }
  var panelTenantProperty_destroy = function panelTenantProperty_destroy() {
    if (this.handlers && this.handlers.length) {
      for (var i = 0; i < this.handlers.length; i++) {
        dojo.disconnect(this.handlers[i])
      }
    }
    this.handlers = null
    this.inherited(arguments)
  }
  var panelTenantProperty_radioButtonLanguageSettingChange =
    function panelTenantProperty_radioButtonLanguageSettingChange() {
      var panel = this
      if (panel.radioButtonLanguageSettingAuto.checked) {
        tenantPropertyWorkData[panel.panelKey].language_setting = ''
      } else if (panel.radioButtonLanguageSettingUser.checked) {
        tenantPropertyWorkData[panel.panelKey].language_setting = 'user'
      } else {
        for (var language in panel.radioButtonLanguageSettingList) {
          if (panel.radioButtonLanguageSettingList[language].checked) {
            tenantPropertyWorkData[panel.panelKey].language_setting = language
            break
          }
        }
      }
    }
  var panelTenantProperty_buttonNewWebRTCTypeClick =
    function panelTenantProperty_buttonNewWebRTCTypeClick() {
      var panel = this
      windowPrompt(
        ucMsgs.LBL_NEW_WEBRTC_TYPE_TITLE,
        '',
        ucMsgs.LBL_NEW_WEBRTC_TYPE_PLACEHOLDER,
        '',
        function (type_name) {
          if (type_name !== '') {
            if (!tenantPropertyWorkData[panel.panelKey].webrtc_types) {
              tenantPropertyWorkData[panel.panelKey].webrtc_types = []
            }
            var webrtc_type = {
              name: type_name,
              description: '',
              options: '',
              created: +new Date(),
            }
            tenantPropertyWorkData[panel.panelKey].webrtc_types.push(
              webrtc_type,
            )
            var inputs = createWebRTCTypeTr(panel, webrtc_type.name)
            inputs[1].value = string(webrtc_type.description)
            inputs[2].value = string(webrtc_type.options)
            var optionElement = document.createElement('option')
            optionElement.innerHTML = escapeHTML(webrtc_type.name)
            optionElement.value = string(webrtc_type.name)
            panel.selectWebRTCTypeName.appendChild(optionElement)
          }
        },
      )
    }
  var panelTenantProperty_selectWebRTCTypeNameChange =
    function panelTenantProperty_selectWebRTCTypeNameChange(e) {
      if (!e.target.value) {
        return
      }
      e.target.previousSibling.value = e.target.value.trim()
      e.target.value = ''
    }
  var panelTenantProperty_radioButtonWebchatEnabledChange =
    function panelTenantProperty_radioButtonWebchatEnabledChange() {
      var panel = this
      if (panel.radioButtonWebchatEnabledOn.checked) {
        tenantPropertyWorkData[panel.panelKey].webchat_enabled = 'true'
        panel.trWebchatServices.style.display = ''
        panel.trWebchatWidgets.style.display = ''
        panel.trAutoMessages.style.display = ''
        panel.trAutoMessageDefaultImage.style.display = ''
      } else {
        tenantPropertyWorkData[panel.panelKey].webchat_enabled = 'false'
        panel.trWebchatServices.style.display = 'none'
        panel.trWebchatWidgets.style.display = 'none'
        panel.trAutoMessages.style.display = 'none'
        panel.trAutoMessageDefaultImage.style.display = 'none'
      }
    }
  var panelTenantProperty_buttonNewWebchatServiceClick =
    function panelTenantProperty_buttonNewWebchatServiceClick() {
      var panel = this
      windowPrompt(
        ucMsgs.LBL_NEW_WEBCHAT_SERVICE_TITLE,
        '',
        ucMsgs.LBL_NEW_WEBCHAT_SERVICE_PLACEHOLDER,
        '',
        function (service_id) {
          if (service_id !== '') {
            if (!tenantPropertyWorkData[panel.panelKey].webchat_services) {
              tenantPropertyWorkData[panel.panelKey].webchat_services = {}
            }
            if (
              !tenantPropertyWorkData[panel.panelKey].webchat_services[
                service_id
              ]
            ) {
              var service = (tenantPropertyWorkData[
                panel.panelKey
              ].webchat_services[service_id] = {
                description: '',
                distribution_type: '0',
                distribution_target: '',
                created: +new Date(),
              })
              var inputs = createWebchatServiceTr(panel, service_id)
              inputs[1].value = string(service.description)
              inputs[2].value = string(service.distribution_type)
              inputs[3].value = string(service.distribution_target)
              inputs[4].value = JSON.stringify({})
              var selectNodes = dojo.query(
                '.brUCWebchatWidgetSelectService',
                panel.tbodyWebchatWidgets,
              )
              for (var i = 0; i < selectNodes.length; i++) {
                var option = document.createElement('option')
                option.innerHTML = escapeHTML(service_id)
                option.value = service_id
                selectNodes[i].appendChild(option)
              }
            }
          }
        },
      )
    }
  var panelTenantProperty_buttonNewAutoMessageClick =
    function panelTenantProperty_buttonNewAutoMessageClick() {
      var panel = this
      windowPrompt(
        ucMsgs.LBL_NEW_AUTO_MESSAGE_TITLE,
        '',
        ucMsgs.LBL_NEW_AUTO_MESSAGE_PLACEHOLDER,
        '',
        function (auto_message_id) {
          if (auto_message_id !== '') {
            if (!tenantPropertyWorkData[panel.panelKey].auto_messages) {
              tenantPropertyWorkData[panel.panelKey].auto_messages = {}
            }
            if (
              !tenantPropertyWorkData[panel.panelKey].auto_messages[
                auto_message_id
              ]
            ) {
              var autoMessage = (tenantPropertyWorkData[
                panel.panelKey
              ].auto_messages[auto_message_id] = {
                name: '',
                message: '',
                created: +new Date(),
              })
              var inputs = createAutoMessageTr(panel, auto_message_id)
              inputs[0].value = string(autoMessage.name)
              inputs[1].value = string(autoMessage.message)
            }
          }
        },
      )
    }
  var panelTenantProperty_imgAutoMessageDefaultImageClick =
    function panelTenantProperty_imgAutoMessageDefaultImageClick() {
      showProfileImage(
        this.imgAutoMessageDefaultImage.getAttribute('data-brekeke-uc-url'),
      )
    }
  var panelTenantProperty_buttonUploadAutoMessageDefaultImageClick =
    function panelTenantProperty_buttonUploadAutoMessageDefaultImageClick() {
      inputAutoMessageImage(this, '')
    }
  var panelTenantProperty_inputAutoMessageImageFormChange =
    function panelTenantProperty_inputAutoMessageImageFormChange() {
      uploadAutoMessageImage(this)
    }
  var panelTenantProperty_buttonDeleteAutoMessageDefaultImageClick =
    function panelTenantProperty_buttonDeleteAutoMessageDefaultImageClick() {
      if (!tenantPropertyWorkData[this.panelKey]) {
        return
      }
      if (!tenantPropertyWorkData[this.panelKey].imageTo) {
        tenantPropertyWorkData[this.panelKey].imageTo = {}
      }
      tenantPropertyWorkData[this.panelKey].imageTo['##m#'] = 'DELETE'
      this.imgAutoMessageDefaultImage.style.backgroundImage =
        'url(./img/noimage.png)'
      this.imgAutoMessageDefaultImage.setAttribute(
        'data-brekeke-uc-url',
        './img/noimage.png',
      )
    }
  var panelTenantProperty_buttonNewWebchatWidgetClick =
    function panelTenantProperty_buttonNewWebchatWidgetClick() {
      var panel = this
      chatClient.getServerTime(
        function (ev) {
          if (!tenantPropertyWorkData[panel.panelKey].webchat_widgets) {
            tenantPropertyWorkData[panel.panelKey].webchat_widgets = []
          }
          var widget = {
            webchat_widget_id: Brekeke.UCClient.CryptoJS.MD5(
              ev.tstamp + ':' + new Date().getTime(),
            ).toString(),
            chatServerUrl:
              location.protocol +
              '//' +
              location.host +
              '/' +
              location.pathname.split('/')[1] +
              '/',
            widgetServerUrl:
              location.protocol +
              '//' +
              location.host +
              '/' +
              location.pathname.split('/')[1] +
              '/',
            description: '',
            service_id: '',
            widget_type: '2',
            options: '',
          }
          tenantPropertyWorkData[panel.panelKey].webchat_widgets.push(widget)
          var inputs = createWebchatWidgetTr(panel)
          inputs[0].value = string(widget.chatServerUrl)
          inputs[1].value = string(widget.description)
          inputs[2].value = string(widget.service_id)
          inputs[3].value = string(widget.widget_type)
          inputs[4].value = string(widget.options)
        },
        function (ev) {
          logger.log(
            'warn',
            'getServerTime error code: ' + ev.code + ', message: ' + ev.message,
          )
        },
      )
    }
  var panelTenantProperty_buttonNewLampTypeClick =
    function panelTenantProperty_buttonNewLampTypeClick() {
      var panel = this
      windowPrompt(
        ucMsgs.LBL_NEW_LAMP_TYPE_TITLE,
        '',
        ucMsgs.LBL_NEW_LAMP_TYPE_PLACEHOLDER,
        '',
        function (type_name) {
          if (type_name !== '') {
            if (!tenantPropertyWorkData[panel.panelKey].lamp_types) {
              tenantPropertyWorkData[panel.panelKey].lamp_types = []
            }
            var lamp_type = {
              name: type_name,
              description: '',
              options: '',
              created: +new Date(),
            }
            tenantPropertyWorkData[panel.panelKey].lamp_types.push(lamp_type)
            var inputs = createLampTypeTr(panel, lamp_type.name)
            inputs[1].value = string(lamp_type.description)
            inputs[2].value = string(lamp_type.options)
          }
        },
      )
    }
  var panelTenantProperty_radioButtonPNEnabledChange =
    function panelTenantProperty_radioButtonPNEnabledChange() {
      var panel = this
      if (panel.radioButtonPNEnabledOn.checked) {
        tenantPropertyWorkData[panel.panelKey].pn_enabled = 'true'
        panel.trPNOptions.style.display = ''
        if (!panel.textAreaPNOptions.attr('value')) {
          // set default value
          panel.textAreaPNOptions.set(
            'value',
            JSON.stringify(
              [
                {
                  condition: { connected: false, ctype: 1 },
                  notify: { message: 'Message from %7$s: %1$.20s' },
                },
              ],
              null,
              2,
            ),
          )
        }
      } else {
        tenantPropertyWorkData[panel.panelKey].pn_enabled = 'false'
        panel.trPNOptions.style.display = 'none'
      }
    }
  var panelTenantProperty_buttonNewCustomizeTClick =
    function panelTenantProperty_buttonNewCustomizeTClick() {
      var panel = this
      var configProperties = chatClient.getConfigProperties()
      var schedules = string(
        configProperties.optional_config &&
          configProperties.optional_config.customize_t_schedules,
      ).split('\n')
      if (!tenantPropertyWorkData[panel.panelKey].customize_ts) {
        tenantPropertyWorkData[panel.panelKey].customize_ts = []
      }
      var customizeT = { schedule: schedules[0], service: '0', message: '' }
      tenantPropertyWorkData[panel.panelKey].customize_ts.push(customizeT)
      var inputs = createCustomizeTTr(panel)
      inputs[0].value = string(
        tenantPropertyWorkData[panel.panelKey].customize_ts.length,
      )
      inputs[1].value = string(customizeT.schedule)
      inputs[2].value = string(customizeT.service)
      inputs[3].value = string(customizeT.message)
    }
  var panelTenantProperty_buttonSaveTenantPropertyClick =
    function panelTenantProperty_buttonSaveTenantPropertyClick() {
      saveTenantProperty(this)
    }
  var panelTenantProperty_buttonCancelTenantPropertyClick =
    function panelTenantProperty_buttonCancelTenantPropertyClick() {
      _closeTab(this)
    }
  var panelTenantPropertyButtonDeleteWebRTCType_click =
    function panelTenantPropertyButtonDeleteWebRTCType_click(e) {
      var panel = this.panel
      var deleteNodes = dojo.query(
        'input.brUCDeleteWebRTCType',
        panel.tbodyWebRTCTypes,
      )
      var index = deleteNodes.indexOf(e.target)
      if (index !== -1) {
        if (
          tenantPropertyWorkData[panel.panelKey] &&
          tenantPropertyWorkData[panel.panelKey].webrtc_types
        ) {
          tenantPropertyWorkData[panel.panelKey].webrtc_types.splice(index, 1)
        }
        var trNodes = dojo.query('tr', panel.tbodyWebRTCTypes)
        if (trNodes[index]) {
          panel.tbodyWebRTCTypes.removeChild(trNodes[index])
        }
      }
    }
  var panelTenantPropertyButtonDeleteWebchatService_click =
    function panelTenantPropertyButtonDeleteWebchatService_click() {
      var panel = this.panel
      var service_id = this.service_id
      if (
        tenantPropertyWorkData[panel.panelKey] &&
        tenantPropertyWorkData[panel.panelKey].webchat_services
      ) {
        delete tenantPropertyWorkData[panel.panelKey].webchat_services[
          service_id
        ]
      }
      var trNodes = dojo.query(
        '[data-brekeke-uc-service-id=' + service_id + ']',
        panel.tbodyWebchatServices,
      )
      if (trNodes[0]) {
        panel.tbodyWebchatServices.removeChild(trNodes[0])
      }
    }
  var panelTenantPropertyButtonDeleteAutoMessage_click =
    function panelTenantPropertyButtonDeleteAutoMessage_click() {
      var panel = this.panel
      var auto_message_id = this.auto_message_id
      if (
        tenantPropertyWorkData[panel.panelKey] &&
        tenantPropertyWorkData[panel.panelKey].auto_messages
      ) {
        delete tenantPropertyWorkData[panel.panelKey].auto_messages[
          auto_message_id
        ]
      }
      if (tenantPropertyWorkData[panel.panelKey]) {
        if (!tenantPropertyWorkData[panel.panelKey].imageTo) {
          tenantPropertyWorkData[panel.panelKey].imageTo = {}
        }
        tenantPropertyWorkData[panel.panelKey].imageTo[
          '##m#' + auto_message_id
        ] = 'DELETE'
      }
      var trNodes = dojo.query(
        '[data-brekeke-uc-auto-message-id=' + auto_message_id + ']',
        panel.tbodyAutoMessages,
      )
      if (trNodes[0]) {
        panel.tbodyAutoMessages.removeChild(trNodes[0])
      }
    }
  var panelTenantPropertySelectAutoMessageImage_change =
    function panelTenantPropertySelectAutoMessageImage_change(e) {
      var panel = this.panel
      var auto_message_id = this.auto_message_id
      var tenant = panel.panelKey
      var user_id = '##m#' + auto_message_id
      if (!tenantPropertyWorkData[tenant]) {
        return
      }
      if (e && e.target && e.target.value === 'SELECT') {
        inputAutoMessageImage(panel, auto_message_id)
      } else if (e && e.target && e.target.value === 'DEFAULT') {
        if (!tenantPropertyWorkData[panel.panelKey].imageTo) {
          tenantPropertyWorkData[panel.panelKey].imageTo = {}
        }
        tenantPropertyWorkData[panel.panelKey].imageTo[user_id] = 'DELETE'
        var trNodes = dojo.query(
          '[data-brekeke-uc-auto-message-id=' + auto_message_id + ']',
          panel.tbodyAutoMessages,
        )
        if (trNodes[0]) {
          var img = dojo.query('span.brUCAutoMessageImageImage', trNodes[0])[0]
          if (img) {
            var url =
              chatClient.getBuddyUser({ tenant: tenant, user_id: '##m#' })
                .profile_image_url +
              '&cachebust=' +
              +new Date()
            img.style.backgroundImage = 'url(' + url + ')'
            img.setAttribute('data-brekeke-uc-url', url + '&SIZE=ORIGINAL')
          }
        }
      } else {
        if (
          tenantPropertyWorkData[tenant] &&
          tenantPropertyWorkData[tenant].imageTo
        ) {
          delete tenantPropertyWorkData[tenant].imageTo[user_id]
        }
        var trNodes = dojo.query(
          '[data-brekeke-uc-auto-message-id=' + auto_message_id + ']',
          panel.tbodyAutoMessages,
        )
        if (trNodes[0]) {
          var img = dojo.query('span.brUCAutoMessageImageImage', trNodes[0])[0]
          if (img) {
            var url =
              chatClient.getBuddyUser({ tenant: tenant, user_id: user_id })
                .profile_image_url +
              '&cachebust=' +
              +new Date()
            img.style.backgroundImage = 'url(' + url + ')'
            img.setAttribute('data-brekeke-uc-url', url + '&SIZE=ORIGINAL')
          }
        }
      }
    }
  var panelTenantPropertySpanAutoMessageImageImage_click =
    function panelTenantPropertySpanAutoMessageImageImage_click(e) {
      showProfileImage(
        e &&
          e.target &&
          e.target.getAttribute &&
          e.target.getAttribute('data-brekeke-uc-url'),
      )
    }
  var panelTenantPropertyButtonPublishWebchatWidget_click =
    function panelTenantPropertyButtonPublishWebchatWidget_click(e) {
      var panel = this.panel
      var publishNodes = dojo.query(
        'button.brUCPublishWebchatWidget',
        panel.tbodyWebchatWidgets,
      )
      var index = publishNodes.indexOf(e.target)
      if (index !== -1) {
        publishWebchatWidget(panel, index)
      }
    }
  var panelTenantPropertyButtonDeleteWebchatWidget_click =
    function panelTenantPropertyButtonDeleteWebchatWidget_click(e) {
      var panel = this.panel
      var deleteNodes = dojo.query(
        'input.brUCDeleteWebchatWidget',
        panel.tbodyWebchatWidgets,
      )
      var index = deleteNodes.indexOf(e.target)
      if (index !== -1) {
        if (
          tenantPropertyWorkData[panel.panelKey] &&
          tenantPropertyWorkData[panel.panelKey].webchat_widgets
        ) {
          tenantPropertyWorkData[panel.panelKey].webchat_widgets.splice(
            index,
            1,
          )
        }
        var trNodes = dojo.query('tr', panel.tbodyWebchatWidgets)
        if (trNodes[index]) {
          panel.tbodyWebchatWidgets.removeChild(trNodes[index])
        }
      }
    }
  var panelTenantPropertyWebchatWidgetSelectService_change =
    function panelTenantPropertyWebchatWidgetSelectService_change(e) {
      if (!e.target.value) {
        return
      }
      e.target.previousSibling.value = e.target.value
      e.target.value = ''
    }
  var panelTenantPropertyWebchatWidgetSelectType_change =
    function panelTenantPropertyWebchatWidgetSelectType_change(e) {
      var panel = this.panel
      var typeNodes = dojo.query(
        '.brUCWebchatWidgetSelectType',
        panel.tbodyWebchatWidgets,
      )
      var index = typeNodes.indexOf(e.target)
      if (index !== -1) {
        if (
          tenantPropertyWorkData[panel.panelKey] &&
          tenantPropertyWorkData[panel.panelKey].webchat_widgets
        ) {
          if (
            !tenantPropertyWorkData[panel.panelKey].webchat_widgets[index]
              .webchat_widget_id &&
            e.target.value === '1'
          ) {
            chatClient.getServerTime(
              function (ev) {
                tenantPropertyWorkData[panel.panelKey].webchat_widgets[
                  index
                ].webchat_widget_id = Brekeke.UCClient.CryptoJS.MD5(
                  ev.tstamp + ':' + new Date().getTime(),
                ).toString()
              },
              function (ev) {
                logger.log(
                  'warn',
                  'getServerTime error code: ' +
                    ev.code +
                    ', message: ' +
                    ev.message,
                )
              },
            )
          }
        }
        var publishNodes = dojo.query(
          'button.brUCPublishWebchatWidget',
          panel.tbodyWebchatWidgets,
        )
        if (publishNodes[index]) {
          publishNodes[index].innerHTML =
            e.target.value === '1' ? 'URL' : 'HTML'
        }
      }
    }
  var panelTenantPropertyButtonDeleteLampType_click =
    function panelTenantPropertyButtonDeleteLampType_click(e) {
      var panel = this.panel
      var deleteNodes = dojo.query(
        'input.brUCDeleteLampType',
        panel.tbodyLampTypes,
      )
      var index = deleteNodes.indexOf(e.target)
      if (index !== -1) {
        if (
          tenantPropertyWorkData[panel.panelKey] &&
          tenantPropertyWorkData[panel.panelKey].lamp_types
        ) {
          tenantPropertyWorkData[panel.panelKey].lamp_types.splice(index, 1)
        }
        var trNodes = dojo.query('tr', panel.tbodyLampTypes)
        if (trNodes[index]) {
          panel.tbodyLampTypes.removeChild(trNodes[index])
        }
      }
    }
  var panelTenantPropertyButtonDeleteCustomizeT_click =
    function panelTenantPropertyButtonDeleteCustomizeT_click(e) {
      var panel = this.panel
      var deleteNodes = dojo.query(
        'input.brUCDeleteCustomizeT',
        panel.tbodyCustomizeTs,
      )
      var index = deleteNodes.indexOf(e.target)
      if (index !== -1) {
        if (
          tenantPropertyWorkData[panel.panelKey] &&
          tenantPropertyWorkData[panel.panelKey].customize_ts
        ) {
          tenantPropertyWorkData[panel.panelKey].customize_ts.splice(index, 1)
        }
        var trNodes = dojo.query('tr', panel.tbodyCustomizeTs)
        if (trNodes[index]) {
          panel.tbodyCustomizeTs.removeChild(trNodes[index])
        }
      }
      var idxNodes = dojo.query(
        'li.brUCCustomizeTInput',
        panel.tbodyCustomizeTs,
      )
      for (var i = 0; i < idxNodes.length; i++) {
        idxNodes[i].value = string(i + 1)
      }
    }
  var panelTenantSettings_postCreate =
    function panelTenantSettings_postCreate() {
      this.inherited(arguments) // register event listeners
      this.handlers = [
        dojo.connect(
          this.buttonNewTenant,
          'onClick',
          getFuncApply(panelTenantSettings_buttonNewTenantClick, this),
        ),
        dojo.connect(
          this.buttonPbxTenant,
          'onClick',
          getFuncApply(panelTenantSettings_buttonPbxTenantClick, this),
        ),
        dojo.connect(
          this.buttonSaveTenantSettings,
          'onClick',
          getFuncApply(panelTenantSettings_buttonSaveTenantSettingsClick, this),
        ),
        dojo.connect(
          this.buttonCancelTenantSettings,
          'onClick',
          getFuncApply(
            panelTenantSettings_buttonCancelTenantSettingsClick,
            this,
          ),
        ),
      ]
    }
  var panelTenantSettings_destroy = function panelTenantSettings_destroy() {
    if (this.handlers && this.handlers.length) {
      for (var i = 0; i < this.handlers.length; i++) {
        dojo.disconnect(this.handlers[i])
      }
    }
    this.handlers = null
    this.inherited(arguments)
  }
  var panelTenantSettings_buttonNewTenantClick =
    function panelTenantSettings_buttonNewTenantClick() {
      var panel = this
      windowPrompt(
        ucMsgs.LBL_NEW_TENANT_TITLE,
        '',
        ucMsgs.LBL_NEW_TENANT_NAME,
        '',
        function (tenant) {
          if (tenant !== '') {
            tenantSettingsWorkData[panel.panelKey][tenant] = {
              limit: 0,
              enabled: true,
            }
            displayTenantSettings(panel)
          }
        },
      )
    }
  var panelTenantSettings_buttonPbxTenantClick =
    function panelTenantSettings_buttonPbxTenantClick() {
      var panel = this
      windowConfirm(
        ucMsgs.LBL_LOAD_TENANT_TITLE,
        ucMsgs.MSG_LOAD_TENANT_CONFIRM + '<br />',
        function () {
          panel.buttonSaveTenantSettings.set('disabled', true)
          chatClient.loadTenantListFromPbx(
            function (ev) {
              // funcOK
              var tenantList = ev.tenantList
              var tenantSettings = tenantSettingsWorkData[panel.panelKey]
              for (var i = 0; i < tenantList.length; i++) {
                var tenant = tenantList[i]
                if (
                  !tenantSettings[tenant] ||
                  !tenantSettings[tenant].enabled
                ) {
                  tenantSettings[tenant] = { limit: 0, enabled: true }
                }
              }
              for (var tenant in tenantSettings) {
                if (tenantList.indexOf(tenant) < 0) {
                  tenantSettings[tenant].enabled = false
                }
              }
              displayTenantSettings(panel)
              panel.buttonSaveTenantSettings.set('disabled', false)
            },
            function (ev) {
              // funcError
              logger.log(
                'warn',
                'loadTenantList error code: ' +
                  ev.code +
                  ', message: ' +
                  ev.message,
              )
              windowAlert(
                ucMsgs.CMN_ALERT,
                ucMsgs.MSG_LOAD_TENANT_FAILED +
                  ' (' +
                  ev.code +
                  ' ' +
                  ev.message +
                  ')',
              )
              panel.buttonSaveTenantSettings.set('disabled', false)
            },
          )
        },
      )
    }
  var panelTenantSettings_buttonSaveTenantSettingsClick =
    function panelTenantSettings_buttonSaveTenantSettingsClick() {
      saveTenantSettings(this)
    }
  var panelTenantSettings_buttonCancelTenantSettingsClick =
    function panelTenantSettings_buttonCancelTenantSettingsClick() {
      _closeTab(this)
    }
  var panelTenantSettingsTextBoxMaxLoginUsers_blur_getFunc =
    function panelTenantSettingsTextBoxMaxLoginUsers_blur_getFunc(
      panel,
      tenant,
    ) {
      return function () {
        tenantSettingsWorkData[panel.panelKey][tenant].limit = this.value
        displayTotalMaxLoginUsers(panel)
      }
    }
  var panelTenantSettingsButtonDelete_click_getFunc =
    function panelTenantSettingsButtonDelete_click_getFunc(panel, tenant) {
      return function () {
        var self = this
        windowConfirm(
          ucMsgs.LBL_DELETE_TENANT_TITLE,
          ucMsgs.MSG_DELETE_TENANT_CONFIRM + '<br />',
          function () {
            tenantSettingsWorkData[panel.panelKey][tenant].enabled = false
            panel.tbodyTenantList.removeChild(self.parentNode.parentNode)
            displayTotalMaxLoginUsers(panel)
          },
        )
      }
    }
  var panelAdvancedSettings_postCreate =
    function panelAdvancedSettings_postCreate() {
      this.inherited(arguments) // register event listeners
      this.handlers = [
        dojo.connect(
          this.buttonSaveAdvancedSettings,
          'onClick',
          getFuncApply(
            panelAdvancedSettings_buttonSaveAdvancedSettingsClick,
            this,
          ),
        ),
        dojo.connect(
          this.buttonCancelAdvancedSettings,
          'onClick',
          getFuncApply(
            panelAdvancedSettings_buttonCancelAdvancedSettingsClick,
            this,
          ),
        ),
      ]
    }
  var panelAdvancedSettings_destroy = function panelAdvancedSettings_destroy() {
    if (this.handlers && this.handlers.length) {
      for (var i = 0; i < this.handlers.length; i++) {
        dojo.disconnect(this.handlers[i])
      }
    }
    this.handlers = null
    this.inherited(arguments)
  }
  var panelAdvancedSettings_buttonSaveAdvancedSettingsClick =
    function panelAdvancedSettings_buttonSaveAdvancedSettingsClick() {
      saveAdvancedSettings(this)
    }
  var panelAdvancedSettings_buttonCancelAdvancedSettingsClick =
    function panelAdvancedSettings_buttonCancelAdvancedSettingsClick() {
      _closeTab(this)
    }
  var panelSoftwareUpdate_postCreate =
    function panelSoftwareUpdate_postCreate() {
      this.inherited(arguments) // register event listeners
      this.handlers = [
        dojo.connect(
          this.buttonSoftwareUpdate,
          'click',
          getFuncApply(panelSoftwareUpdate_buttonSoftwareUpdateClick, this),
        ),
      ]
    }
  var panelSoftwareUpdate_destroy = function panelSoftwareUpdate_destroy() {
    if (this.handlers && this.handlers.length) {
      for (var i = 0; i < this.handlers.length; i++) {
        dojo.disconnect(this.handlers[i])
      }
    }
    this.handlers = null
    this.inherited(arguments)
  }
  var panelSoftwareUpdate_buttonSoftwareUpdateClick =
    function panelSoftwareUpdate_buttonSoftwareUpdateClick() {
      _closeTab(this)
    }
  var panelActivateLicense_postCreate =
    function panelActivateLicense_postCreate() {
      this.inherited(arguments) // register event listeners
      this.handlers = [
        dojo.connect(
          this.buttonActivateLicense,
          'click',
          getFuncApply(panelActivateLicense_buttonActivateLicenseClick, this),
        ),
      ]
    }
  var panelActivateLicense_destroy = function panelActivateLicense_destroy() {
    if (this.handlers && this.handlers.length) {
      for (var i = 0; i < this.handlers.length; i++) {
        dojo.disconnect(this.handlers[i])
      }
    }
    this.handlers = null
    this.inherited(arguments)
  }
  var panelActivateLicense_buttonActivateLicenseClick =
    function panelActivateLicense_buttonActivateLicenseClick() {
      var activated = this.buttonActivateLicense.value === true.toString()
      if (activated) {
        signOut()
      } else {
        _closeTab(this)
      }
    }
  var window_onfocus = function window_onfocus() {
    // stop lamp
    if (lampObject && lampObject.jingle) {
      lampObject.windowFocused = true
      if (lampObject.panelSelected) {
        lampObject.jingle = null
        lampObject.changeLamp(lampObject)
      }
    } // stop highlight
    if (highlightObject !== null) {
      stopHighlight()
    } // stop notification
    stopNotification()
  }
  var window_onclickFirst = function window_onclickFirst() {
    document.getElementById('audioBell').load()
    document.getElementById('audioRing').load()
    document.getElementById('audioRingback').load()
    document.getElementById('audioTerminated').load()
    window.onclick = window_onclick
  }
  var window_onclick = function window_onclick() {}
  var window_onbeforeunload = function window_onbeforeunload(e) {
    e.returnValue = ' '
  }
  var window_onunload = function window_onunload(e) {
    if (lampObject) {
      lampObject.status = Constants.STATUS_OFFLINE
      lampObject.changeLamp(lampObject)
    }
    chatClient.signOut()
  }
  var securityCheckTimerTick = function securityCheckTimerTick() {
    var configProperties = chatClient.getConfigProperties()
    if (
      +new Date() -
        securityOkTime +
        ((configProperties.optional_config &&
          configProperties.optional_config.security_check_timer_interval) ||
          60000) /
          2 >=
      ((configProperties.optional_config &&
        configProperties.optional_config.security_check_interval) ||
        3600000)
    ) {
      if (securityNgCount >= 3) {
        clearInterval(securityCheckTimer)
        securityCheckTimer = null
        logger.log('warn', 'securityNgCount: ' + securityNgCount)
        messageBar.show(
          formatStr(
            ucMsgs.MSG_SECURITY_CHECK_NG,
            window.location.protocol + '//' + window.location.host,
          ),
          ucMsgs.LBL_MESSAGE_BAR_SIGN_IN,
          false,
          function (funcOK, funcError) {
            signOut()
            funcOK()
          },
        )
        return
      }
      var xhr = new XMLHttpRequest()
      xhr.open('HEAD', window.location.href)
      xhr.onreadystatechange = function () {
        if (this.readyState === this.DONE) {
          if (this.status !== 0) {
            logger.log('debug', 'status: ' + this.status)
            securityOkTime = +new Date()
            securityNgCount = 0
          } else {
            logger.log('warn', 'status: ' + this.status)
          }
        }
      }
      logger.log('debug', 'HEAD ' + window.location.href)
      xhr.send()
      securityNgCount++
    }
  }
  /*
   * ChatClient event listeners
   */ var chatClient_onForcedSignOut = function chatClient_onForcedSignOut(ev) {
    logger.log(
      'warn',
      'forcedSignOut code: ' + ev.code + ', message: ' + ev.message,
    )
    require(['dojo/dom-construct', 'dojo/on'], function (domConstruct, on) {
      var signOutTime = new Date().getTime()
      phone.stopWebRTC(false) // org status
      var statusOrg = myStatus.status
      var displayOrg = myStatus.display // status
      signedIn = false
      phoneRegistered = false
      myStatus.status = Constants.STATUS_OFFLINE
      displayStatus()
      sidePaneWidget.dropDownButtonStatus.set(
        'label',
        ucMsgs.CMN_OWN_STATUS_STRING_OFFLINE,
      )
      sidePaneWidget.dropDownButtonStatus.set('disabled', true)
      sidePaneWidget.textBoxDisplay.set('disabled', true)
      sidePaneWidget.dropDownButtonDisplay.set('disabled', true) // conferences
      for (var conf_id in panelsConference) {
        enableButtons(panelsConference[conf_id])
        if (
          panelsConference[conf_id].panelChatConferenceInvited.domNode.style
            .display !== 'none'
        ) {
          panelsConference[
            conf_id
          ].panelChatConferenceInvited.domNode.style.display = 'none'
          panelsConference[conf_id].resize()
        }
        dojo
          .query(
            '.brUCDisplayMe',
            panelsConference[conf_id].panelChatHeaderBuddies.domNode,
          )
          .addClass('brUCDisplayLeaved')
      } // webchat
      while (
        webchatQueueList.length > 0 &&
        removeWebchatQueue(webchatQueueList[0].conf_id)
      ) {}
      window.removeEventListener('beforeunload', window_onbeforeunload)
      window.removeEventListener('unload', window_onunload)
      if (securityCheckTimer) {
        clearInterval(securityCheckTimer)
        securityCheckTimer = null
      } // message bar
      if (ev.code === Errors.UPDATE_STARTED) {
        // update started
        if (Object.keys(panelsSoftwareUpdate).length === 0) {
          messageBar.show(
            ucMsgs.MSG_SIGNED_OUT_MAINTENANCE +
              '<br />' +
              ucMsgs.MSG_SIGNED_OUT_DISCONNECTED,
            ucMsgs.LBL_MESSAGE_BAR_SIGN_IN,
            false,
            function (funcOK, funcError) {
              signOut()
              funcOK()
            },
          )
        }
      } else {
        var auto, msg, modest
        if (ev.code === Errors.PLEONASTIC_LOGIN) {
          // pleonastic login
          auto = false
          msg = ucMsgs.MSG_SIGNED_OUT_PLEONASTIC
        } else {
          auto = true
          msg = ucMsgs.MSG_SIGNED_OUT_DISCONNECTED
        }
        messageBar.show(
          msg,
          ucMsgs.LBL_MESSAGE_BAR_RETRY,
          auto,
          function (funcOK, funcError) {
            chatClient.signOut() // re-initialize variables
            signedIn = false
            phoneRegistered = false
            myStatus = { status: Constants.STATUS_OFFLINE, display: '' } // get device token from local storage
            var device_token = null
            try {
              device_token = JSON.parse(
                localStorage.getItem(
                  'br+dtoken+' +
                    (mySignInParams && mySignInParams.isSingleTenant
                      ? ''
                      : mySignInParams.tenant) +
                    '+' +
                    string(mySignInParams && mySignInParams.user).split('?')[0],
                ),
              ).token
            } catch (e) {} // sign-in
            chatClient.signIn(
              location.host,
              location.pathname.split('/')[1],
              mySignInParams.tenant,
              mySignInParams.user,
              mySignInParams.pass,
              {
                usePhone: false,
                useHttps: location.protocol.indexOf('https') >= 0,
                status: statusOrg,
                display: displayOrg,
                admin_mode: mySignInParams.admin_mode,
                modest: messageBar.auto,
                pver: mySignInParams.pver,
                device_token: device_token,
                do_not_start_mfa: true,
                forceAjax: mySignInParams.forceAjax,
                servlet: mySignInParams.servlet,
              },
              function (ev) {
                // funcOK
                var reSignInTime = new Date().getTime()
                var profile = chatClient.getProfile()
                var configProperties = chatClient.getConfigProperties() // initial status
                signedIn = true
                signedInTime = new Date().getTime()
                phoneRegistered = false
                myStatus.status = statusOrg
                myStatus.display = displayOrg // show BrFrame
                displayUserType()
                brFrame.setVisible(true)
                displayProfiles()
                displaySplittable()
                brFrame.updateView() // TODO: yano lamp
                // timer
                if (
                  window.location.protocol.indexOf('https') >= 0 &&
                  configProperties.optional_config &&
                  configProperties.optional_config.secure_domain &&
                  window.location.hostname !==
                    configProperties.optional_config.secure_domain
                ) {
                  securityCheckTimer = setInterval(
                    securityCheckTimerTick,
                    configProperties.optional_config
                      .security_check_timer_interval || 60000,
                  )
                } // beforeunload
                window.addEventListener('beforeunload', window_onbeforeunload)
                window.addEventListener('unload', window_onunload) // restore temporary buddies
                restoreTemporaryBuddies() // receive unread text
                if (
                  profile.user_type !== Constants.USER_TYPE_SYSTEM_ADMIN &&
                  !mySignInParams.admin_mode
                ) {
                  var unreadTextOnReSignInPanelKeys = Object.keys(panelsChat)
                  readTextOnReSignInPanelKeys = []
                  var _receiveFunc = function receiveFunc() {
                    var panelKey = unreadTextOnReSignInPanelKeys.pop()
                    if (panelKey) {
                      readTextOnReSignInPanelKeys.push(panelKey)
                      showHistoricalMessages(
                        panelsChat[panelKey],
                        signOutTime,
                        reSignInTime,
                        false,
                        _receiveFunc,
                      )
                    } else {
                      chatClient.receiveUnreadText(
                        showUnreadTextOnReSignIn,
                        null,
                      )
                    }
                  }
                  _receiveFunc()
                } // open webchat conference
                if (profile.user_type === Constants.USER_TYPE_TENANT_GUEST) {
                  chatClient.enterWebchatRoom(
                    {
                      properties: {
                        webchat_service_id:
                          getQueryParameters()['webchat_service_id'] || null, // TODO: yano test
                        acd_id: getQueryParameters()['acd_id'] || null, // TODO: yano test
                      },
                    },
                    function (ev) {
                      openConference(ev.conference.conf_id, null, null, true)
                    },
                    function (ev) {},
                  )
                } // start WebRTC
                if (phone) {
                  startWebRTC(false)
                } // destroy message bar
                funcOK() // stop notification
                stopNotification()
              },
              function (ev) {
                // funcError
                logger.log(
                  'warn',
                  'chatClient.signIn error code: ' +
                    ev.code +
                    ', message: ' +
                    ev.message,
                )
                if (ev.code === Errors.ALREADY_SIGNED_IN) {
                  messageBar.auto = false
                  funcError(ucMsgs.MSG_SIGNED_OUT_PLEONASTIC)
                } else if (ev.code === Errors.VERSION_INVALID) {
                  // destroy message bar
                  funcOK() // reshow message bar
                  messageBar.show(
                    ucMsgs.MSG_SIGNED_OUT_MAINTENANCE,
                    ucMsgs.LBL_MESSAGE_BAR_SIGN_IN,
                    false,
                    function (funcOK, funcError) {
                      signOut()
                      funcOK()
                    },
                  )
                } else if (ev.code === Errors.CANNOT_START_MFA) {
                  // destroy message bar
                  funcOK() // reshow message bar
                  messageBar.show(
                    ucMsgs.MSG_SIGNED_OUT_DISCONNECTED +
                      Errors.CANNOT_START_MFA,
                    ucMsgs.LBL_MESSAGE_BAR_SIGN_IN,
                    false,
                    function (funcOK, funcError) {
                      signOut()
                      funcOK()
                    },
                  )
                } else {
                  funcError()
                }
              },
            )
          },
        )
      } // notification
      if (!document.hasFocus()) {
        startNotification(
          brLogin.productname.title,
          ucMsgs.MSG_SIGNED_OUT_DISCONNECTED,
          'img/disconnected.png',
          null,
          null,
        )
      }
    })
  }
  var chatClient_onBuddyStatusChanged = (function () {
    var buddyStatusDisplayQueue = []
    var lastDisplayTime = 0
    var displayTimer = null
    var displayFunc = function displayFunc() {
      lastDisplayTime = +new Date()
      displayTimer = null
      if (buddyStatusDisplayQueue.length > 0) {
        var createdNewBuddy = buddyStatusDisplayQueue.some(function (b) {
          return !storeBuddylist.query({
            user_id: b.user_id,
            tenant: b.tenant,
          })[0]
        })
        displayBuddylist(createdNewBuddy)
        var buddy
        while ((buddy = buddyStatusDisplayQueue.shift())) {
          displayBuddyStatus(buddy.tenant, buddy.user_id)
        }
      }
    }
    return function (ev) {
      buddyStatusDisplayQueue.push({ tenant: ev.tenant, user_id: ev.user_id })
      var now = +new Date()
      if (!displayTimer) {
        displayTimer = setTimeout(
          displayFunc,
          Math.max(0, lastDisplayTime + 1000 - now),
        )
      }
    }
  })()
  var chatClient_onReceivedText = function chatClient_onReceivedText(ev) {
    // message
    var message = {
      senderInfo: ev.sender,
      text:
        ev.ctype === Constants.CTYPE_FILE_REQUEST
          ? createStaticFileArea(ev.text, ev.sender)
          : ev.text,
      sentMessageId: '',
      received_text_id: ev.received_text_id,
      file_id: '',
      sentTimeValue: parseDate(ev.sent_ltime),
      sentTimeDisplay: ev.sent_ltime,
    } // open panel
    var panel = null
    var conference = {}
    if (ev.conf_id === null) {
      // buddy
      panel = openChat(ev.sender.tenant, ev.sender.user_id, null, null, false)
      if (!panel) {
        logger.log('error', 'not found panel of user_id==' + ev.sender.user_id)
        return
      }
    } else {
      // conference
      conference = chatClient.getConference(ev.conf_id)
      if (
        conference.invite_properties.webchatfromguest &&
        (conference.conf_status === Constants.CONF_STATUS_INVITED ||
          conference.conf_status === Constants.CONF_STATUS_INVITED_WEBCHAT)
      ) {
        // webchat
        // add to webchat queue
        addMessageToWebchatQueue(ev.conf_id, message) // do not display to chat panel
        return
      } else {
        panel = panelsConference[ev.conf_id]
        if (!panel) {
          logger.log('error', 'not found panel of conf_id==' + ev.conf_id)
          return
        }
      }
    } // display message
    addMessageToList(message, panel)
    var broadcastPanelSelected = false
    if (ev.conf_id === null) {
      // display message also on broadcast panel
      for (var broadcastPanelKey in panelsBroadcast) {
        if (broadcastUsersTable[broadcastPanelKey]) {
          for (
            var i = 0;
            i < broadcastUsersTable[broadcastPanelKey].length;
            i++
          ) {
            if (
              broadcastUsersTable[broadcastPanelKey][i].tenant ===
                ev.sender.tenant &&
              broadcastUsersTable[broadcastPanelKey][i].user_id ===
                ev.sender.user_id
            ) {
              addMessageToList(message, panelsBroadcast[broadcastPanelKey])
              displayBroadcastCheckedMessage(panelsBroadcast[broadcastPanelKey])
              if (panelsBroadcast[broadcastPanelKey].attr('selected')) {
                broadcastPanelSelected = true
              }
              break
            }
          }
        }
      }
    } // hide typing
    hideTyping({ tenant: ev.sender.tenant, user_id: ev.sender.user_id }) // ring bell
    if (!panel.attr('selected') || !document.hasFocus()) {
      document.getElementById('audioBell').play()
    } // lamp
    if (lampObject) {
      if (!panel.attr('selected') || !document.hasFocus()) {
        lampObject.jingle = {
          panelKey: panel.panelKey,
          reason: 'text',
          buddy: ev.sender,
        }
        lampObject.windowFocused = Boolean(document.hasFocus())
        lampObject.panelSelected = Boolean(panel.attr('selected'))
        lampObject.changeLamp(lampObject)
      }
    } // blinking
    if (!broadcastPanelSelected) {
      blinkingUntilSelecting(panel, function (ev2) {
        // start read timer on selected
        if (ev.requires_read) {
          // after settings.text_open_sec
          setTimeout(function () {
            // notify that the message was read
            readText(ev.received_text_id)
          }, chatClient.getSettings().text_open_sec * 1000)
        }
        if (!ev2.alreadySelected) {
          setTimeout(function () {
            if (panel && panel.editorSendText && panel.editorSendText.focus) {
              panel.editorSendText.focus()
            }
          }, 0)
        }
        if (panel && panel.panelChatList && panel.panelChatList.domNode) {
          panel.panelChatList.domNode.scrollTop =
            panel.panelChatList.domNode.scrollHeight
        }
      })
    } else {
      if (ev.requires_read) {
        // after settings.text_open_sec
        setTimeout(function () {
          // notify that the message was read
          readText(ev.received_text_id)
        }, chatClient.getSettings().text_open_sec * 1000)
      }
    } // highlight
    var buddyName = chatClient.getBuddyUser(ev.sender).name || ev.sender.user_id
    var plainText =
      ev.ctype === Constants.CTYPE_FILE_REQUEST ? '' : toPlainText(ev.text)
    var highlightMessage = buddyName + ': ' + plainText
    if (!document.hasFocus()) {
      startHighlight(highlightMessage)
    } // notification
    if (!document.hasFocus()) {
      startNotification(
        buddyName,
        plainText,
        chatClient.getBuddyUser(ev.sender).profile_image_url,
        function () {
          if (panel && panel.getParent) {
            panel.getParent().selectChild(panel)
            setTimeout(function () {
              if (panel && panel.editorSendText && panel.editorSendText.focus) {
                panel.editorSendText.focus()
              }
            }, 100)
          }
        },
        null,
      )
    }
  }
  var chatClient_onReceivedTyping = function chatClient_onReceivedTyping(ev) {
    showTyping({ tenant: ev.tenant, user_id: ev.user_id })
  }
  var chatClient_onInvitedToConference =
    function chatClient_onInvitedToConference(ev) {
      var panel
      var panelAlt = null
      if (ev.conference.invite_properties.webchatfromguest) {
        panel = openWebchatQueue(null, null, false)
        var existing = false
        for (var i = 0; i < webchatQueueList.length; i++) {
          if (webchatQueueList[i].conf_id === ev.conference.conf_id) {
            existing = true
            break
          }
        }
        if (!existing) {
          webchatQueueList.push({
            conf_id: ev.conference.conf_id,
            panelKeySet: {},
            messageList: [],
          })
        }
        displayWebchatQueue(panel, ev.conference.conf_id)
        chatClient.receiveUnreceivedConferenceText(
          {
            conf_id: ev.conference.conf_id,
            conf_status: Constants.CONF_STATUS_INVITED_WEBCHAT,
          },
          showUnreceivedConferenceTextOnInvitedToConference,
          null,
        )
        panelAlt = panelsConference[ev.conference.conf_id]
      } else {
        if (myStatus.status === Constants.STATUS_OFFLINE) {
          leaveConference(ev.conference.conf_id, false)
          return
        }
        panel = openConference(ev.conference.conf_id, null, null, false)
      } // ring bell
      if (
        !(panel.attr('selected') || (panelAlt && panelAlt.attr('selected'))) ||
        !document.hasFocus()
      ) {
        document.getElementById('audioBell').play()
      } // lamp
      if (lampObject) {
        if (
          !(
            panel.attr('selected') ||
            (panelAlt && panelAlt.attr('selected'))
          ) ||
          !document.hasFocus()
        ) {
          lampObject.jingle = {
            panelKey: panel.panelKey,
            reason: 'conference',
            buddy: ev.conference.from,
          }
          lampObject.windowFocused = Boolean(document.hasFocus())
          lampObject.panelSelected = Boolean(
            panel.attr('selected') || (panelAlt && panelAlt.attr('selected')),
          )
          lampObject.changeLamp(lampObject)
        }
      } // blinking
      if (!(panelAlt && panelAlt.attr('selected'))) {
        blinkingUntilSelecting(panel, null)
      } // highlight
      if (!document.hasFocus()) {
        startHighlight(ev.conference.subject)
      } // notification
      var buddyName = ''
      if (ev.conference.invite_properties.webchatfromguest) {
        buddyName = string(ev.conference.webchatinfo.description)
      } else {
        buddyName =
          chatClient.getBuddyUser(ev.conference.from).name ||
          ev.conference.from.user_id
      }
      if (!document.hasFocus()) {
        startNotification(
          buddyName,
          ev.conference.subject,
          chatClient.getBuddyUser(ev.conference.from).profile_image_url,
          function () {
            if (panel && panel.getParent) {
              panel.getParent().selectChild(panel)
            }
          },
          null,
        )
      }
    }
  var chatClient_onConferenceMemberChanged =
    function chatClient_onConferenceMemberChanged(ev) {
      if (ev.conference.conf_status === Constants.CONF_STATUS_INACTIVE) {
        var panel = panelsConference[ev.conference.conf_id]
        if (panel) {
          clearCall(panel)
        }
      }
      if (ev.conference.conf_type === 'webchat') {
        if (
          ev.conference.conf_status === Constants.CONF_STATUS_INACTIVE ||
          ev.conference.creator.conf_status !== Constants.CONF_STATUS_JOINED
        ) {
          removeWebchatQueue(ev.conference.conf_id)
        } else if (
          ev.conference.conf_status === Constants.CONF_STATUS_INVITED
        ) {
          var panel = openWebchatQueue(null, null, false)
          displayWebchatQueue(panel, ev.conference.conf_id)
        }
      }
      displayConference(ev.conference.conf_id)
    }
  var chatClient_onFileReceived = function chatClient_onFileReceived(ev) {
    // open panel
    var panel = null
    if (ev.conf_id === null) {
      // buddy
      panel = openChat(
        ev.fileInfo.target.tenant,
        ev.fileInfo.target.user_id,
        null,
        null,
        false,
      )
      if (!panel) {
        logger.log(
          'error',
          'not found panel of user_id==' + ev.fileInfo.target.user_id,
        )
        return
      }
    } else {
      // conference
      panel = panelsConference[ev.conf_id]
      if (!panel) {
        logger.log('error', 'not found panel of conf_id==' + ev.conf_id)
        return
      }
    }
    var file_id = ev.fileInfo.file_id
    fileTable[file_id] = {
      fileInfo: ev.fileInfo,
      panelType: panel.panelType,
      panelKey: panel.panelKey,
      events: [],
      inlineImage: getInlineImage(ev.fileInfo, null),
    } // display message
    var message = {
      senderInfo: ev.fileInfo.target,
      text: '',
      sentMessageId: '',
      received_text_id: '',
      file_id: file_id,
      sentTimeValue: parseDate(ev.sent_ltime),
      sentTimeDisplay: ev.sent_ltime,
    }
    addMessageToList(message, panel) // ring bell
    if (!panel.attr('selected') || !document.hasFocus()) {
      document.getElementById('audioBell').play()
    } // lamp
    if (lampObject) {
      if (!panel.attr('selected') || !document.hasFocus()) {
        lampObject.jingle = {
          panelKey: panel.panelKey,
          reason: 'file',
          buddy: ev.fileInfo.target,
        }
        lampObject.windowFocused = Boolean(document.hasFocus())
        lampObject.panelSelected = Boolean(panel.attr('selected'))
        lampObject.changeLamp(lampObject)
      }
    } // blinking
    blinkingUntilSelecting(panel, function (ev2) {
      if (!ev2.alreadySelected) {
        setTimeout(function () {
          if (panel && panel.editorSendText && panel.editorSendText.focus) {
            panel.editorSendText.focus()
          }
        }, 0)
      }
      if (panel && panel.panelChatList && panel.panelChatList.domNode) {
        panel.panelChatList.domNode.scrollTop =
          panel.panelChatList.domNode.scrollHeight
      }
    }) // highlight
    var buddyName =
      chatClient.getBuddyUser(ev.fileInfo.target).name ||
      ev.fileInfo.target.user_id
    var plainText = ev.fileInfo.name
    var highlightMessage = buddyName + ': ' + plainText
    if (!document.hasFocus()) {
      startHighlight(highlightMessage)
    } // notification
    if (!document.hasFocus()) {
      startNotification(
        buddyName,
        plainText,
        chatClient.getBuddyUser(ev.fileInfo.target).profile_image_url,
        function () {
          if (panel && panel.getParent) {
            panel.getParent().selectChild(panel)
            setTimeout(function () {
              if (panel && panel.editorSendText && panel.editorSendText.focus) {
                panel.editorSendText.focus()
              }
            }, 100)
          }
        },
        null,
      )
    }
  }
  var chatClient_onFileInfoChanged = function chatClient_onFileInfoChanged(ev) {
    var file_id = ev.fileInfo.file_id
    fileTable[file_id].fileInfo = ev.fileInfo
    displayFile(file_id)
  }
  var chatClient_onFileTerminated = function chatClient_onFileTerminated(ev) {
    var file_id = ev.fileInfo.file_id
    fileTable[file_id].fileInfo = ev.fileInfo
    displayFile(file_id)
  }
  var chatClient_onReceivedCustomClientEvent =
    function chatClient_onReceivedCustomClientEvent(ev) {}
  var chatClient_onNotifiedUserSearch =
    function chatClient_onNotifiedUserSearch(ev) {
      for (var panelKey in userManagementWorkData) {
        var panel = panelsUserManagement[panelKey]
        if (
          panel &&
          userManagementWorkData[panelKey].user_search_id === ev.user_search_id
        ) {
          if (ev.new_users) {
            for (var i = 0; i < ev.new_users.length; i++) {
              var user = ev.new_users[i] || {}
              var option = document.createElement('option')
              option.value =
                user.tenant + (user.user_id ? '.' + user.user_id : '')
              option.innerHTML = escapeHTML(
                (brLogin.multitenant || user.tenant ? user.tenant + '.' : '') +
                  (user.user_id || '*'),
              )
              option.title =
                (user.pbx ? '' : '[!] ') +
                (brLogin.multitenant || user.tenant ? user.tenant + '.' : '') +
                (user.user_id || '*')
              option.className = 'brUCPbx' + user.pbx
              option.selected =
                panel.checkBoxAutoSelectDeleteUserData.checked && !user.pbx
              option.setAttribute('data-brekeke-uc-pbx', user.pbx)
              panelUserManagementSelectUsers_appendChild(
                panel.selectUsersNotToDelete,
                option,
              )
            }
          }
          panel.spanProgressUserSearch.innerHTML = ev.progress + '%'
          if (ev.finished) {
            panel.buttonStartUserSearch.set('disabled', false)
            panel.areaProgressUserSearch.style.display = 'none'
            delete userManagementWorkData[panelKey].user_search_id
          }
        }
      }
      if (ev.error) {
        logger.log('warn', 'notifiedUserSearch error (' + ev.error + ')')
      }
      if (ev.finished && ev.error) {
        windowAlert(
          ucMsgs.CMN_ALERT,
          'notifiedUserSearch error (' + ev.error + ')',
        )
      } else if (ev.finished && ev.canceled) {
        windowAlert(ucMsgs.CMN_ALERT, ucMsgs.MSG_NOTIFIED_USER_SEARCH_CANCELED)
      }
    }
  var chatClient_onNotifiedUserDelete =
    function chatClient_onNotifiedUserDelete(ev) {
      for (var panelKey in userManagementWorkData) {
        var panel = panelsUserManagement[panelKey]
        if (
          panel &&
          userManagementWorkData[panelKey].user_delete_id === ev.user_delete_id
        ) {
          panel.spanProgressUserDelete.innerHTML = ev.progress + '%'
          if (ev.finished) {
            panel.buttonStartUserSearch.set('disabled', false)
            panel.spanProgressUserDelete.style.display = 'none'
            delete userManagementWorkData[panelKey].user_delete_id
          }
        }
      }
      if (ev.error) {
        logger.log('warn', 'notifiedUserDelete error (' + ev.error + ')')
      }
      if (ev.finished) {
        windowAlert(
          ucMsgs.LBL_NOTIFIED_USER_DELETE_TITLE,
          ucMsgs.MSG_NOTIFIED_USER_DELETE_FINISHED +
            (ev.error
              ? '<br /><br /><br />' +
                ucMsgs.MSG_NOTIFIED_USER_DELETE_ERROR +
                '<br /><br /><pre>' +
                ev.error +
                '</pre><br />'
              : ''),
        )
      }
    }
  var chatClient_onDebugLogFilePrepared =
    function chatClient_onDebugLogFilePrepared(ev) {
      for (var panelKey in serverSettingsWorkData) {
        if (serverSettingsWorkData[panelKey].debug_log_id === ev.debug_log_id) {
          ;(serverSettingsWorkData[panelKey].debug_log_files =
            serverSettingsWorkData[panelKey].debug_log_files || []).push(ev)
          if (panelsServerSettings[panelKey]) {
            displayServerSettingsLogdownload(panelsServerSettings[panelKey])
          }
        }
      }
    }
  /*
   * Phone event listeners
   */ var phone_onPhoneStatusChanged = (function () {
    var onError = null
    return function (ev) {
      if (!signedIn) {
        return
      }
      if (ev.phoneStatus === 'started') {
        phoneRegistered = true
        onError = null
      } else if (ev.phoneStatus === 'stopped') {
        var phoneRegisteredOrg = phoneRegistered
        phoneRegistered = false
        if (phoneReregistering) {
          phoneReregistering = false
          startWebRTC(true)
        } else if (phoneRegisteredOrg || !onError) {
          // re-register timer
          var time = 8000
          var _reregisterFunc = function reregisterFunc() {
            setTimeout(
              function () {
                onError = _reregisterFunc
                startWebRTC(false)
              },
              time + Math.floor(Math.random() * 4000),
            )
            time *= 2
          }
          _reregisterFunc()
        } else {
          onError()
          onError = null
        }
      } // enableButtons
      var panels = [
        panelsChat,
        panelsConference,
        panelsBroadcast,
        panelsExternalCall,
      ]
      for (var i = 0; i < panels.length; i++) {
        for (var key in panels[i]) {
          var panel = panels[i][key]
          enableButtons(panel)
        }
      }
    }
  })()
  var phone_onSessionCreated = function phone_onSessionCreated(ev) {
    var address = ev.rtcSession.remote_identity.uri.user
    if (ev.rtcSession.direction === 'outgoing') {
      var p = outgoingCallPanelTable[address]
      if (!p) {
        logger.log(
          'warn',
          'outgoing session without makeCall: address=' + address,
        )
        ev.rtcSession.terminate()
        return
      }
      delete outgoingCallPanelTable[address]
      var panel =
        p.panelType === 'CHAT'
          ? panelsChat[p.panelKey]
          : p.panelType === 'CONFERENCE'
            ? panelsConference[p.panelKey]
            : p.panelType === 'BROADCAST'
              ? panelsBroadcast[p.panelKey]
              : p.panelType === 'EXTERNALCALL'
                ? panelsExternalCall[p.panelKey]
                : null
      if (!panel) {
        logger.log(
          'warn',
          'outgoing session without panel: address=' +
            address +
            ', panelType=' +
            p.panelType +
            ', panelKey=' +
            p.panelKey,
        )
        ev.rtcSession.terminate()
        return
      }
      if (editExInfo(ev.exInfo, 'get', 'sharescreen') === 'true') {
        if (cookiePreference.shareScreenMute) {
          // mute outgoing screen-sharing
          phone.setMuted({ main: true }, ev.sessionId)
        }
      }
      _showCall(ev.sessionId, panel)
    } else {
      var tenant = null
      var user_id = null
      var buddylist = chatClient.getBuddylist()
      if (address !== '') {
        for (var i = 0; i < buddylist.user.length; i++) {
          var buddyExtension = string(buddylist.user[i].user_id)
          if (address === buddyExtension) {
            tenant = buddylist.user[i].tenant
            user_id = buddylist.user[i].user_id
            break
          }
        }
      }
      var panel = null
      if (user_id !== null) {
        panel = openChat(tenant, user_id, null, null, false)
        if (!panel) {
          logger.log('error', 'not found panel of user_id==' + user_id)
          return
        }
      } else {
        if (address !== '') {
          for (var panelKey in panelsExternalCall) {
            if (
              address ===
              panelsExternalCall[panelKey].textBoxHeaderTarget.attr('value')
            ) {
              panel = panelsExternalCall[panelKey]
              break
            }
          }
        }
        var title =
          (ev.incomingMessage &&
            ev.incomingMessage.from &&
            ev.incomingMessage.from.display_name) ||
          null
        if (panel) {
          displayExternalCallTarget(panel, title)
        } else {
          panel = openExternalCall(address, title, null, null, false)
        }
        if (!panel) {
          logger.log('error', 'cannot open external call panel')
          return
        }
      }
      if (
        ev.remoteUserOptionsTable[address] &&
        editExInfo(
          ev.remoteUserOptionsTable[address].exInfo,
          'get',
          'sharescreen',
        ) === 'true'
      ) {
        if (cookiePreference.shareScreenMute) {
          // mute incoming screen-sharing
          phone.setMuted({ main: true, videoClient: true }, ev.sessionId)
        }
      } // show call panel
      _showCall(ev.sessionId, panel)
    }
  }
  var phone_onSessionStatusChanged = function phone_onSessionStatusChanged(ev) {
    var address = ev.rtcSession.remote_identity.uri.user // display call
    displayCall(ev.sessionId) // hide call panel
    if (ev.sessionStatus === 'terminated') {
      delete outgoingPreScreenSharingPanelTable[address]
      var panel = getPanelFromSession(ev.sessionId)
      if (!panel) {
        // terminated before call panel has been shown
        return
      }
      hideCall(panel, ev)
    }
  }
  var phone_onVideoClientSessionCreated =
    function phone_onVideoClientSessionCreated(ev) {
      var profile = chatClient.getProfile()
      var session = phone.getSession(ev.sessionId)
      var videoClientSession =
        session && session.videoClientSessionTable[ev.videoClientSessionId] // mute viewing main video call
      var viewer =
        videoClientSession &&
        videoClientSession.rtcSession &&
        videoClientSession.rtcSession.request &&
        videoClientSession.rtcSession.request.getHeader &&
        videoClientSession.rtcSession.request.getHeader('X-UC-VIEWER')
      if (viewer === profile.user_id && !session.shareStream) {
        videoClientSession.rtcSession.mute({ video: true })
      } // create screen-sharing video session instead of pre-screen-sharing video session
      if (session && session.rtcSession) {
        var p =
          outgoingPreScreenSharingPanelTable[
            session.rtcSession.remote_identity.uri.user
          ]
        if (p) {
          createShareScreenSession(p, session, videoClientSession)
        }
      } // display call
      displayCall(ev.sessionId)
    }
  var phone_onVideoClientSessionEnded =
    function phone_onVideoClientSessionEnded(ev) {
      // display call
      displayCall(ev.sessionId)
    }
  var phone_onRemoteUserOptionsChanged =
    function phone_onRemoteUserOptionsChanged(ev) {
      var profile = chatClient.getProfile()
      for (var u in ev.remoteUserOptionsTable) {
        if (
          editExInfo(
            ev.remoteUserOptionsTable[u].exInfo,
            'get',
            'requestmainvideo',
          ) === profile.user_id
        ) {
          makeMainVideoSession(ev.sessionId, u)
        }
      } // display call
      displayCall(ev.sessionId)
    }
  var phone_onRtcErrorOccurred = function phone_onRtcErrorOccurred(ev) {
    if (ev.target) {
      // makeCall error
      delete outgoingCallPanelTable[ev.target]
      delete outgoingPreScreenSharingPanelTable[ev.target]
      windowAlert(
        ucMsgs.CMN_ALERT,
        ucMsgs.MSG_MAKE_CALL_FAILED +
          '<br />' +
          escapeHTML(stringifyError(ev.error)) +
          '<br />(from ' +
          ev.from +
          ')<br />',
      )
    } else if (ev.sessionId) {
      var session = phone.getSession(ev.sessionId)
      if (session && session.sessionStatus === 'progress') {
        // answer error
        windowAlert(
          ucMsgs.CMN_ALERT,
          ucMsgs.MSG_MAKE_CALL_FAILED +
            '<br />' +
            escapeHTML(stringifyError(ev.error)) +
            '<br />(from ' +
            ev.from +
            ')<br />',
        )
      } else {
        // camera error
        if (sessionPanelTable[ev.sessionId]) {
          if (!sessionPanelTable[ev.sessionId].cameraError) {
            sessionPanelTable[ev.sessionId].cameraError = true
            windowAlert(
              ucMsgs.CMN_ALERT,
              ucMsgs.MSG_MAKE_CALL_FAILED +
                '<br />' +
                escapeHTML(stringifyError(ev.error)) +
                '<br />(from ' +
                ev.from +
                ')<br />',
            )
          }
        }
      }
    }
  }
  /*
   * GUI utility functions
   */ var windowAlert = function windowAlert(title, msg, funcOK) {
    require(['dijit/Dialog', 'dijit/form/Button'], function (Dialog, Button) {
      var dia = new Dialog({ title: title, content: msg, closable: false })
      dia.addChild(
        new Button({
          label: ucMsgs.CMN_OK,
          onClick: function onClick(e) {
            dia.destroy()
            if (funcOK) {
              funcOK()
            }
          },
        }),
      )
      dia.show()
    })
  }
  var windowConfirm = function windowConfirm(title, msg, funcOK, funcCancel) {
    require(['dijit/Dialog', 'dijit/form/Button'], function (Dialog, Button) {
      var dia = new Dialog({ title: title, content: msg, closable: false })
      var dia_ok = function dia_ok(e) {
        dia.destroy()
        if (funcOK) {
          funcOK()
        }
      }
      var dia_cancel = function dia_cancel(e) {
        dia.destroy()
        if (funcCancel) {
          funcCancel()
        }
      }
      var keyUp = function keyUp(e) {
        if (e.keyCode === 13) {
          dia_ok()
        } else if (e.keyCode === 27) {
          dia_cancel()
        }
      }
      dia.addChild(
        new Button({ label: ucMsgs.CMN_OK, onClick: dia_ok, onKeyUp: keyUp }),
      )
      dia.addChild(
        new Button({
          label: ucMsgs.CMN_CANCEL,
          onClick: dia_cancel,
          onKeyDown: function onKeyDown(e) {
            if (e.keyCode === 13) {
              e.cancelBubble = true
            }
          },
          onKeyUp: keyUp,
        }),
      )
      dia.show()
    })
  }
  var windowPrompt = function windowPrompt(
    title,
    msg,
    placeHolder,
    defaultValue,
    funcOK,
    funcCancel,
  ) {
    require([
      'dijit/Dialog',
      'dijit/form/TextBox',
      'dijit/form/Button',
    ], function (Dialog, TextBox, Button) {
      var dia = new Dialog({ title: title, content: msg, closable: false })
      var dia_ok = function dia_ok(e) {
        var val = sbj.attr('value')
        dia.destroy()
        if (funcOK) {
          funcOK(val)
        }
      }
      var dia_cancel = function dia_cancel(e) {
        dia.destroy()
        if (funcCancel) {
          funcCancel()
        }
      }
      var sbj = new TextBox({
        placeHolder: placeHolder,
        onKeyDown: keyDownUtil.save,
        onKeyUp: function onKeyUp(e) {
          var downedKey = keyDownUtil.getKey()
          if (e.keyCode === 13 && downedKey === 13) {
            dia_ok()
          } else if (e.keyCode === 27) {
            dia_cancel()
          }
        },
      })
      dia.addChild(sbj)
      dia.addChild(new Button({ label: ucMsgs.CMN_OK, onClick: dia_ok }))
      dia.addChild(
        new Button({ label: ucMsgs.CMN_CANCEL, onClick: dia_cancel }),
      )
      dia.show()
    })
  }
  var getEmptiestPanelTabIndex = function getEmptiestPanelTabIndex() {
    var panelTabIndex = 0
    var minChildrenCount = -1
    for (var i = 0; i < panelsTab.length; i++) {
      var challengeIndex = (lastAddedPanelTabIndex + 1 + i) % panelsTab.length
      var childrenCount = panelsTab[challengeIndex].getChildren().length
      if (minChildrenCount === -1 || childrenCount < minChildrenCount) {
        panelTabIndex = challengeIndex
        minChildrenCount = childrenCount
      }
    }
    return panelTabIndex
  }
  var getStatusIconClass = function getStatusIconClass(status) {
    var iconClass = ''
    if (status === Constants.STATUS_OFFLINE) {
      iconClass = 'brUCIconOffline'
    } else if (status === Constants.STATUS_AVAILABLE) {
      iconClass = 'brUCIconAvailable'
    } else if (status === Constants.STATUS_IDLE) {
      iconClass = 'brUCIconIdle'
    } else if (status === Constants.STATUS_BUSY) {
      iconClass = 'brUCIconBusy'
    } else {
      logger.log('error', 'invalid status==' + status)
    }
    return iconClass
  }
  var getDefaultOptions = function getDefaultOptions(isVideo, isAnswer) {
    if (!phoneDefaultOptions) {
      try {
        phoneDefaultOptions = JSON.parse(JSON.stringify(phone.defaultOptions))
      } catch (e) {
        phoneDefaultOptions = {}
      }
      if (!phoneDefaultOptions.main) {
        phoneDefaultOptions.main = {}
      }
      if (!phoneDefaultOptions.main.call) {
        phoneDefaultOptions.main.call = {}
      }
      if (!phoneDefaultOptions.main.call.mediaConstraints) {
        phoneDefaultOptions.main.call.mediaConstraints = {
          audio: true,
          video: false,
        }
      }
      if (!phoneDefaultOptions.main.answer) {
        phoneDefaultOptions.main.answer = {}
      }
      if (!phoneDefaultOptions.main.answer.mediaConstraints) {
        phoneDefaultOptions.main.answer.mediaConstraints = {
          audio: true,
          video: false,
        }
      }
      if (!phoneDefaultOptions.videoOptions) {
        phoneDefaultOptions.videoOptions = {}
      }
      if (!phoneDefaultOptions.videoOptions.call) {
        phoneDefaultOptions.videoOptions.call = {}
      }
      if (!phoneDefaultOptions.videoOptions.call.mediaConstraints) {
        phoneDefaultOptions.videoOptions.call.mediaConstraints = {
          audio: false,
          video: true,
        }
      }
      if (!phoneDefaultOptions.videoOptions.answer) {
        phoneDefaultOptions.videoOptions.answer = {}
      }
      if (!phoneDefaultOptions.videoOptions.answer.mediaConstraints) {
        phoneDefaultOptions.videoOptions.answer.mediaConstraints = {
          audio: false,
          video: true,
        }
      }
    }
    if (isVideo) {
      var videoOptions = JSON.parse(
        JSON.stringify(phoneDefaultOptions.videoOptions),
      )
      _deepAssign(videoOptions.call, callOptions)
      _deepAssign(videoOptions.answer, callOptions)
      return videoOptions
    } else if (isAnswer) {
      var answer = JSON.parse(JSON.stringify(phoneDefaultOptions.main.answer))
      _deepAssign(answer, callOptions)
      answer.mediaConstraints.audio = cookiePreference.audioSource
        ? { deviceId: cookiePreference.audioSource }
        : true
      return answer
    } else {
      var call = JSON.parse(JSON.stringify(phoneDefaultOptions.main.call))
      _deepAssign(call, callOptions)
      call.mediaConstraints.audio = cookiePreference.audioSource
        ? { deviceId: cookiePreference.audioSource }
        : true
      return call
    }
  }
  var getNormalVideoOptions = function getNormalVideoOptions(
    mainVideoViewerUser,
    thumbnailFrameRate,
  ) {
    var videoOptions = getDefaultOptions(true)
    var video = {}
    if (cookiePreference.videoSource === 'sound_only') {
      if (!soundOnlyStream) {
        var canvasSoundOnly = document.getElementById('canvasSoundOnly')
        canvasSoundOnly.width = 80
        canvasSoundOnly.height = 60
        var context = canvasSoundOnly.getContext('2d')
        context.fillStyle = '#041008'
        context.fillRect(0, 0, 80, 60)
        soundOnlyStream = canvasSoundOnly.captureStream(0)
      }
      videoOptions.call.mediaStream = videoOptions.answer.mediaStream =
        soundOnlyStream
    } else if (cookiePreference.videoSource) {
      video.deviceId = cookiePreference.videoSource
    }
    if (int(thumbnailFrameRate) > 0) {
      video.frameRate = int(thumbnailFrameRate)
    } else if (thumbnailFrameRate) {
      try {
        var videoProps = JSON.parse(thumbnailFrameRate)
        for (var key in videoProps) {
          video[key] = videoProps[key]
        }
      } catch (e) {}
    }
    if (Object.keys(video).length > 0) {
      videoOptions.call.mediaConstraints.video =
        videoOptions.answer.mediaConstraints.video = video
    }
    if (mainVideoViewerUser) {
      videoOptions.call.extraHeaders = ['X-UC-VIEWER: ' + mainVideoViewerUser]
    }
    return videoOptions
  }
  var getScreenVideoOptions = function getScreenVideoOptions(
    mainVideoViewerUser,
  ) {
    var videoOptions = getDefaultOptions(true)
    if (getBrowser() === 'Firefox') {
      videoOptions.call.mediaConstraints.video =
        videoOptions.answer.mediaConstraints.video = {
          mediaSource: cookiePreference.shareScreenMediaSource || 'screen',
        }
    } else {
      videoOptions.screenCapture = true
    }
    videoOptions.shareStream = true
    if (mainVideoViewerUser) {
      videoOptions.call.extraHeaders = ['X-UC-VIEWER: ' + mainVideoViewerUser]
    }
    return videoOptions
  }
  var getScreenVideoOptionsChrome = function getScreenVideoOptionsChrome(
    chromeMediaSourceId,
  ) {
    var videoOptions = getDefaultOptions(true)
    videoOptions.call.mediaConstraints.video =
      videoOptions.answer.mediaConstraints.video = {
        mandatory: {
          maxFrameRate: DEFAULT_SHARE_SCREEN_FRAME_RATE,
          maxWidth: window.screen.width,
          maxHeight: window.screen.height,
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: chromeMediaSourceId,
        },
      }
    return videoOptions
  }
  var getCallControlMode = function getCallControlMode() {
    var controlMode
    controlMode = getQueryParameters()['test12']
    if (controlMode) {
      return int(controlMode)
    } // TODO: yano test
    var configProperties = chatClient.getConfigProperties()
    controlMode = int(
      configProperties.optional_config &&
        configProperties.optional_config.call_control_mode,
    )
    return controlMode
  }
  /*
   * Utility functions
   */ var int = function int(value) {
    return parseInt(value, 10) || 0
  }
  var string = function string(value) {
    return String(value || value === 0 || value === false ? value : '')
  }
  var stringify = function stringify(object) {
    var key, returnString
    if (object && _typeof(object) === 'object') {
      returnString = ''
      for (key in object) {
        returnString += string(key) + ': ' + string(object[key]) + ', '
      }
      if (returnString.length > 2) {
        returnString = returnString.substr(0, returnString.length - 2)
      }
      return returnString
    } else {
      return string(object)
    }
  }
  var stringifyError = function stringifyError(object) {
    var key, returnString
    if (object && _typeof(object) === 'object') {
      if (typeof object.toString === 'function') {
        return object.toString()
      }
      returnString = ''
      for (key in object) {
        returnString += string(key) + ': ' + string(object[key]) + ', '
      }
      if (returnString.length > 2) {
        returnString = returnString.substr(0, returnString.length - 2)
      }
      return returnString
    } else {
      return string(object)
    }
  }
  var toUtf16HexStr = function toUtf16HexStr(str) {
    var s = string(str)
    var r = ''
    for (var i = 0; i < s.length; i++) {
      r += ('000' + s.charCodeAt(i).toString(16)).slice(-4)
    }
    return r
  }
  var escapeHTML = function escapeHTML(str) {
    return string(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
  }
  var unescapeHTML = function unescapeHTML(str) {
    return string(str)
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
  }
  var formatStr = function formatStr(fmt, a) {
    var rep_fn = undefined
    if (_typeof(a) === 'object') {
      rep_fn = function rep_fn(m, k) {
        return a[k]
      }
    } else {
      var args = arguments
      rep_fn = function rep_fn(m, k) {
        return args[parseInt(k) + 1]
      }
    }
    return fmt.replace(/\{(\w+)\}/g, rep_fn)
  }
  var formatFileSize = function formatFileSize(value) {
    value = int(value)
    var valueString
    try {
      valueString = value.toLocaleString()
    } catch (e) {
      valueString = string(value)
    }
    if (value === 1) {
      return formatStr(ucMsgs.CMN_FILESIZE_BYTE, valueString)
    } else if (value < 1024) {
      return formatStr(ucMsgs.CMN_FILESIZE_BYTES, valueString)
    } else if (value < 1024 * 1024) {
      return formatStr(
        ucMsgs.CMN_FILESIZE_KILOBYTES,
        (value / 1024).toFixed(1),
        valueString,
      )
    } else if (value < 1024 * 1024 * 1024) {
      return formatStr(
        ucMsgs.CMN_FILESIZE_MEGABYTES,
        (value / 1024 / 1024).toFixed(1),
        valueString,
      )
    } else {
      return formatStr(
        ucMsgs.CMN_FILESIZE_GIGABYTES,
        (value / 1024 / 1024 / 1024).toFixed(1),
        valueString,
      )
    }
  }
  var formatTime = function formatTime(time) {
    var hour = parseInt(time.substr(11, 2), 10)
    var minute = parseInt(time.substr(14, 2), 10)
    if (isNaN(hour) || isNaN(minute)) {
      return ''
    }
    var hour12 = ((hour + 11) % 12) + 1
    var ampm = hour < 12 ? ucMsgs.CMN_AM_STR : ucMsgs.CMN_PM_STR
    return formatStr(
      ucMsgs.CMN_FORMAT_TIME,
      ('0' + hour).slice(-2),
      ('0' + hour12).slice(-2),
      ('0' + minute).slice(-2),
      ampm,
    )
  }
  var formatTimeNowWithSecond = function formatTimeNowWithSecond(now) {
    now = now || new Date()
    var hour = now.getHours()
    var minute = now.getMinutes()
    var second = now.getSeconds()
    var hour12 = ((hour + 11) % 12) + 1
    var ampm = hour < 12 ? ucMsgs.CMN_AM_STR : ucMsgs.CMN_PM_STR
    return formatStr(
      ucMsgs.CMN_FORMAT_TIME_WITH_SECOND,
      ('0' + hour).slice(-2),
      ('0' + hour12).slice(-2),
      ('0' + minute).slice(-2),
      ampm,
      ('0' + second).slice(-2),
    )
  }
  var formatMessageDateTime = function formatMessageDateTime(time) {
    var now = new Date()
    var yesterday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 1,
    )
    var year = parseInt(time.substr(0, 4), 10)
    var month = parseInt(time.substr(5, 2), 10) - 1
    var day = parseInt(time.substr(8, 2), 10)
    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      return ''
    }
    if (
      year === now.getFullYear() &&
      month === now.getMonth() &&
      day === now.getDate()
    ) {
      // today
      return formatTime(time)
    }
    if (
      year === yesterday.getFullYear() &&
      month === yesterday.getMonth() &&
      day === yesterday.getDate()
    ) {
      // yesterday
      return ucMsgs.CMN_YESTERDAY + ' ' + formatTime(time)
    }
    var monthStr =
      month === 0
        ? ucMsgs.CMN_MONTH_STR_01
        : month === 1
          ? ucMsgs.CMN_MONTH_STR_02
          : month === 2
            ? ucMsgs.CMN_MONTH_STR_03
            : month === 3
              ? ucMsgs.CMN_MONTH_STR_04
              : month === 4
                ? ucMsgs.CMN_MONTH_STR_05
                : month === 5
                  ? ucMsgs.CMN_MONTH_STR_06
                  : month === 6
                    ? ucMsgs.CMN_MONTH_STR_07
                    : month === 7
                      ? ucMsgs.CMN_MONTH_STR_08
                      : month === 8
                        ? ucMsgs.CMN_MONTH_STR_09
                        : month === 9
                          ? ucMsgs.CMN_MONTH_STR_10
                          : month === 10
                            ? ucMsgs.CMN_MONTH_STR_11
                            : month === 11
                              ? ucMsgs.CMN_MONTH_STR_12
                              : ''
    if (year === now.getFullYear()) {
      // this year
      return (
        formatStr(ucMsgs.CMN_FORMAT_DATE, year, month + 1, day, monthStr) +
        ' ' +
        formatTime(time)
      )
    } else {
      return (
        formatStr(
          ucMsgs.CMN_FORMAT_DATE_WITH_YEAR,
          year,
          month + 1,
          day,
          monthStr,
        ) +
        ' ' +
        formatTime(time)
      )
    }
  }
  var formatTopicDate = function formatTopicDate(time) {
    var now = new Date()
    var year = int(time.substr(0, 4))
    var month = int(time.substr(5, 2)) - 1
    var day = int(time.substr(8, 2))
    if (
      year === now.getFullYear() &&
      month === now.getMonth() &&
      day === now.getDate()
    ) {
      // today
      return formatTime(time)
    }
    var monthStr =
      month === 0
        ? ucMsgs.CMN_MONTH_STR_01
        : month === 1
          ? ucMsgs.CMN_MONTH_STR_02
          : month === 2
            ? ucMsgs.CMN_MONTH_STR_03
            : month === 3
              ? ucMsgs.CMN_MONTH_STR_04
              : month === 4
                ? ucMsgs.CMN_MONTH_STR_05
                : month === 5
                  ? ucMsgs.CMN_MONTH_STR_06
                  : month === 6
                    ? ucMsgs.CMN_MONTH_STR_07
                    : month === 7
                      ? ucMsgs.CMN_MONTH_STR_08
                      : month === 8
                        ? ucMsgs.CMN_MONTH_STR_09
                        : month === 9
                          ? ucMsgs.CMN_MONTH_STR_10
                          : month === 10
                            ? ucMsgs.CMN_MONTH_STR_11
                            : month === 11
                              ? ucMsgs.CMN_MONTH_STR_12
                              : ''
    if (year === now.getFullYear()) {
      // this year
      return formatStr(ucMsgs.CMN_FORMAT_DATE, year, month + 1, day, monthStr)
    } else {
      return string(year)
    }
  }
  var stringifyDate = function stringifyDate(date) {
    // for api
    return (
      date.getFullYear() +
      '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + date.getDate()).slice(-2) +
      ' ' +
      ('0' + date.getHours()).slice(-2) +
      ':' +
      ('0' + date.getMinutes()).slice(-2) +
      ':' +
      ('0' + date.getSeconds()).slice(-2)
    )
  }
  var parseDate = function parseDate(str) {
    var d = new Date(
      int(str.substr(0, 4)),
      int(str.substr(5, 2)) - 1,
      int(str.substr(8, 2)),
      int(str.substr(11, 2)),
      int(str.substr(14, 2)),
      int(str.substr(17, 2)),
    )
    return d
  }
  var getFuncApply = function getFuncApply(func, thisArg) {
    return function () {
      func.apply(thisArg, arguments)
    }
  }
  var clone = function clone(object) {
    var key, returnObject
    if (object && _typeof(object) === 'object') {
      // memberwise clone (shallow copy)
      returnObject = {}
      for (key in object) {
        returnObject[key] = object[key]
      }
      return returnObject
    } else {
      return object
    }
  }
  var _deepAssign = function deepAssign(target, object) {
    var key
    if (object && _typeof(object) === 'object') {
      for (key in object) {
        if (Array.isArray(object[key])) {
          target[key] = []
          _deepAssign(target[key], object[key])
        } else if (_typeof(object[key]) === 'object') {
          target[key] = {}
          _deepAssign(target[key], object[key])
        } else {
          target[key] = object[key]
        }
      }
    }
  }
  var toPlainText = function toPlainText(html) {
    return unescapeHTML(html.replace(/<[^>]*>/g, ''))
  }
  var editExInfo = function editExInfo(exInfo, operation, param1, param2) {
    var exInfoMap = {}
    string(exInfo)
      .split(';')
      .forEach(function (s) {
        var kv = s.split('=')
        try {
          var k = decodeURIComponent(kv[0])
          var v = decodeURIComponent(kv[1] || '')
          if (k) {
            exInfoMap[k] = v
          }
        } catch (e) {}
      })
    if (operation === 'get') {
      return exInfoMap[string(param1)]
    } else if (operation === 'put') {
      exInfoMap[string(param1)] = string(param2)
    } else if (operation === 'putall') {
      for (var i in param1 || {}) {
        exInfoMap[string(i)] = string(param1[i])
      }
    } else if (operation === 'remove') {
      delete exInfoMap[string(param1)]
    } else {
      return exInfo
    }
    var r = ''
    for (var i in exInfoMap) {
      if (r !== '') {
        r += ';'
      }
      r += encodeURIComponent(i)
      if (exInfoMap[i]) {
        r += '=' + encodeURIComponent(exInfoMap[i])
      }
    }
    return r
  }
  var keyDownUtil = (function () {
    var downedKey = null
    return {
      save: function save(e) {
        downedKey = e.keyCode
      },
      getKey: function getKey() {
        var key = downedKey
        downedKey = null
        return key
      },
    }
  })()
  var getInternetExplorerVersion = (function () {
    var rv = -1
    if (navigator.appName == 'Microsoft Internet Explorer') {
      var ua = navigator.userAgent
      var re = new RegExp('MSIE ([0-9]{1,}[.0-9]{0,})')
      if (re.exec(ua) != null) rv = parseFloat(RegExp.$1)
    } else if (navigator.appName == 'Netscape') {
      var ua = navigator.userAgent
      var re = new RegExp('Trident/.*rv:([0-9]{1,}[.0-9]{0,})')
      if (re.exec(ua) != null) rv = parseFloat(RegExp.$1)
    }
    return function () {
      return rv
    }
  })()
  var getBrowser = (function () {
    var browser = ''
    var chk_ie = getInternetExplorerVersion()
    if (chk_ie === -1) {
      // not IE
      var ua = navigator.userAgent
      if (ua.indexOf('Chrome') !== -1) {
        browser = 'Chrome'
      } else if (ua.indexOf('Firefox') !== -1) {
        browser = 'Firefox'
      } else {
        browser = ''
      }
    } else {
      browser = 'IE'
    }
    return function () {
      return browser
    }
  })()
  var getQueryParameters = (function () {
    var result = {}
    var queryString = window.location.search
    if (queryString) {
      var index = queryString.indexOf('?')
      if (index >= 0) {
        queryString = queryString.substr(index + 1)
      }
      var parameters = queryString.split('&')
      for (var i = 0; i < parameters.length; i++) {
        var kv = parameters[i].split('=')
        if (kv.length === 2) {
          var key = decodeURIComponent(kv[0])
          var value = decodeURIComponent(kv[1])
          result[key] = value
        }
      }
    }
    return function () {
      return result
    }
  })()
})(window.Brekeke.UCClientUI)
