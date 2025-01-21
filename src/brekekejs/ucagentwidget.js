if (!window.Brekeke) {
  window.Brekeke = {}
}
var Brekeke = window.Brekeke

if (!Brekeke.UCAgentWidget) {
  Brekeke.UCAgentWidget = {}
}
var AgentComponent = function AgentComponent() {
  // data
  this.initializeStatus = 0
  this.option = {}
  this.handlers = []
  this._logger = null
  this.logQueue = []
  this.mainWindowHeartbeat = {}
  this.subWindow = null
  this.subWindowTimer = null
  this._chatClient = null
  this._ucUiAction = null
  this._ucUiStore = null
  this._dummyChatClient = null
  this._dummyUcUiAction = null
  this._dummyUcUiStore = null
  this.ucUiAction = null
  this.ucUiStore = null
  this._conferenceCaches = {}
  this.conferenceCaches = this._conferenceCaches
  this.elementsAddedToOwner = []
  this.mainWidgetUiData = null
  this.mainWidgetHandler = null
  this.iconUiDataTable = null
  this.iconHandler = null
  this.dialogUiDataTable = {}
  this.dialogHandler = null
  this.dialogWorkDataTable = {}
  this.dialogUcUiAction = null
  this.dialogUcUiStore = null
  this.popupFailedCount = 0
  this.chatTable = {}
  this.focusedChat = null
  this.workForReplyingFunctions = {}
  this.workForReplyingCounter = 0
  this.replyingContinuationInfos = []
  this.replyingWebchatInfos = {}
}

AgentComponent.prototype.initComponent = function (option) {
  var _this48 = this

  if (this.initializeStatus !== 0) {
    return
  }
  this.initializeStatus = 1
  var defaultConsoleLogType = 0
  try {
    defaultConsoleLogType = localStorage.getItem(
      'UC.ucagentwidget.agentcomponent.defaultconsolelogtype',
    )
  } catch (e) {}
  // init option
  option = option || {}
  this.option = {}
  this.option.iconParents = option.iconParents || {}
  this.option.ownerDocument = option.ownerDocument || document
  this.option.loggerLevel = option.loggerLevel || 'all'
  this.option.consoleLogType =
    (0, _strings.int)(option.consoleLogType || defaultConsoleLogType) || 2
  this.option.widgetParent = option.widgetParent || null
  this.option.offline = false
  this.option.language = option.language || ''
  this.option.configurations = option.configurations || {}
  // default values of configurations
  if (!('tabCloseCancelable' in this.option.configurations)) {
    this.option.configurations['tabCloseCancelable'] = true
  }
  if (!('sendButton' in this.option.configurations)) {
    this.option.configurations['sendButton'] = true
  }
  if (!('doNotReplyUnanswered' in this.option.configurations)) {
    this.option.configurations['doNotReplyUnanswered'] = true
  }
  if (!('replyWebchatButton' in this.option.configurations)) {
    this.option.configurations['replyWebchatButton'] = true
  }
  if (!('headerButtons' in this.option.configurations)) {
    this.option.configurations['headerButtons'] = ['invite', 'file']
  }
  if (!('withMenuOptions' in this.option.configurations)) {
    this.option.configurations['withMenuOptions'] = true
  }
  this.option.signInOption = {}
  // add handler
  if (option.handler) {
    this.addHandler(option.handler)
  }
  // init logger
  this._logger = new Brekeke.UCClient.Logger(
    this.option.loggerLevel,
    this.option.consoleLogType === 1 ? () => true : null,
  )
  // init language
  if (!this.option.language || this.option.language === 'auto') {
    this.option.language = (
      (0, _strings.string)(
        navigator.browserLanguage ||
          navigator.language ||
          navigator.userLanguage,
      ) + 'en'
    ).substr(0, 2)
  }
  if (this.option.language === 'en') {
    this.option.language = 'default'
  }
  _uawmsgs2.default.loadLanguage(
    this.option.language,
    this.languageLoaded.bind(this),
  )
  // init css
  if (
    this.option.ownerDocument &&
    this.option.ownerDocument.head &&
    this.option.ownerDocument.createElement
  ) {
    this.elementsAddedToOwner = this.elementsAddedToOwner.concat(
      ['../../../css/react-datepicker.css'].map(url => {
        var link = _this48.option.ownerDocument.createElement('link')
        link.rel = 'stylesheet'
        link.href =
          _currentscript2.default.DIR + url + _currentscript2.default.QUERY
        _this48.option.ownerDocument.head.appendChild(link)
        return link
      }),
    )
  }
  // init main widget
  this.mainWidgetUiData = null
  this.mainWidgetHandler = {
    tabOpened: this.subWindowTabOpened.bind(this),
    tabClosing: this.subWindowTabClosing.bind(this),
    tabClosed: this.subWindowTabClosed.bind(this),
    tabSelected: this.subWindowTabSelected.bind(this),
    webchatQueueButton_onClick:
      this.subWindowWebchatQueueButton_onClick.bind(this),
    webchatPickupButton_onClick:
      this.subWindowWebchatPickupButton_onClick.bind(this),
    webchatDropButton_onClick:
      this.subWindowWebchatDropButton_onClick.bind(this),
    buddylistButton_onClick: this.subWindowBuddylistButton_onClick.bind(this),
    chatOptionButtonsReplyWebchatButton_onClick:
      this.subWindowChatOptionButtonsReplyWebchatButton_onClick.bind(this),
  }
  // init dummy icon uiData (init real icon uiData after startUCClient)
  this.iconUiDataTable = {}
  this.iconHandler = {
    webchatQueueButton_onClick: this.iconWebchatQueueButton_onClick.bind(this),
    webchatPickupButton_onClick:
      this.iconWebchatPickupButton_onClick.bind(this),
    webchatRoomChatButton_onClick:
      this.iconWebchatRoomChatButton_onClick.bind(this),
    webchatRoomJoinButton_onClick:
      this.iconWebchatRoomJoinButton_onClick.bind(this),
    searchDialogButton_onClick: this.iconSearchDialogButton_onClick.bind(this),
  }
  this._dummyChatClient = new Brekeke.UCClient.ChatClient(
    this._logger,
    this.option.consoleLogType === 3 ? {} : { report_console_categories: '' },
  )
  this._dummyUcUiAction = new UcUiAction() // dummy, do not link to UcUiStore
  this._dummyUcUiStore = new UcUiStore({
    logger: this._logger,
    ucUiAction: null,
    chatClient: this._dummyChatClient,
  }) // dummy, never sign-in
  for (var iconName in this.option.iconParents) {
    var iconUiData = new uiData({
      parentElement: this.option.iconParents[iconName],
      ucUiAction: this._dummyUcUiAction,
      ucUiStore: this._dummyUcUiStore,
      agentComponentInstance: this,
      ownerDocument: this.option.ownerDocument,
      configurations: this.option.configurations,
      webchatNotificationTarget: false,
      iconName,
      iconDisabled: true,
      handler: this.iconHandler,
    })
    this.iconUiDataTable[iconName] = iconUiData
    iconUiData.render()
  }
  // init dialogs
  this.dialogHandler = {
    dialogCloseButton_onClick: this.dialogDialogCloseButton_onClick.bind(this),
    dialogHideButton_onClick: this.dialogDialogHideButton_onClick.bind(this),
    dialogButton_onClick: this.dialogDialogButton_onClick.bind(this),
    dialogResizableBox_onStop: this.dialogDialogResizableBox_onStop.bind(this),
    splitterTop_onChange: this.dialogSplitterTop_onChange.bind(this),
  }
  this.dialogUcUiAction = new UcUiAction()
  this.dialogUcUiStore = new UcUiStore({
    logger: this._logger,
    ucUiAction: this.dialogUcUiAction,
  })
  this.dialogUcUiStore.addHandler({
    searchConditionsChanged:
      this.dialogUcUiStore_searchConditionsChanged.bind(this),
    searchResultChanged: this.dialogUcUiStore_searchResultChanged.bind(this),
    searchResultSelected: this.dialogUcUiStore_searchResultSelected.bind(this),
  })
}

AgentComponent.prototype.addHandler = function (handler) {
  this.handlers.push(handler)
}

AgentComponent.prototype.removeHandler = function (handler) {
  var index = this.handlers.indexOf(handler)
  if (index !== -1) {
    this.handlers.splice(index, 1)
  }
}

var UcUiAction = function UcUiAction(option) {
  this.handlers = []
}

var UcUiStore = function UcUiStore(option) {
  // data
  this.logger = null
  this.ucUiAction = null
  this.chatClient = null
  this.keyCounter = 0
  this.keyObjectTable = {}
  this.searchResultIdCounter = 0
  this.handlers = []
  this.signInStatus = 0 // 0:signed-out 1:sign-in-failed 2:signing-in 3:signed-in
  this.signInOKCount = 0
  this.uncacheParam2 = 0
  this.diffClientServerTime = 0
  this.lastSignOutReason = { code: 1, message: '', reSignInTime: 0 }
  this.signInOption = null
  this.lastStatus = null
  this.reSignInDelay = 0
  this.maxReSignInDelay = 0
  this.reSignInTimer = null
  this.guest_conf_id = ''
  this.reenter_user_id = ''
  this.buddyTable = {}
  this.webchatQueueList = []
  this.chatTable = {}
  this.chatHeaderInfoTable = {}
  this.showmorelinkTable = {}
  this.lastSentTypingTimeTable = {}
  this.activeMessageFileTable = {}
  this.objectURLList = []
  this.confInJoinProcTable = {}
  this.searchConditionsTable = {}
  this.searchWorkDataTable = {}
  this.searchResultsTable = {}
  this.unsentReplyMessagesTable = {}
  this.localStoragePreference = {}
  this.configPropertiesCache = {}
  this.optionalSettingCache = {}
  this.leavingUnansweredWebchatConfId = null
  this.lastRenderedTimeBsc = 0
  this.nextRenderingTimerBsc = 0

  // init
  if (!option) {
    option = {}
  }
  if (option.logger) {
    this.logger = option.logger
  } else {
    this.logger = new Brekeke.UCClient.Logger('all')
  }
  if (option.ucUiAction && option.ucUiAction.addHandler) {
    this.ucUiAction = option.ucUiAction
    this.ucUiAction.addHandler(this)
  }
  if (option.chatClient) {
    this.chatClient = option.chatClient
  } else {
    this.chatClient = new Brekeke.UCClient.ChatClient(this.logger)
  }
  this.chatClient.addHandler(this)
}
UcUiStore.prototype.addHandler = function (handler) {
  this.handlers.push(handler)
}

UcUiStore.prototype.getChatHeaderInfo = function (option) {
  var chatHeaderInfo = {
    conf_id: '',
    title: '',
    guest: {
      tenant: '',
      user_id: '',
    },
    guestProfinfo: '',
    confType: '',
    webchatServiceId: '',
    webchatContinuable: '',
    replyTypes: '',
    editorTypes: '',
    initialEditorType: '',
    lastConfType: '',
    nextDistributionType: '',
    nextDistributionTarget: '',
    originalWebchatId: '',
    selectedReplyType: '',
    yyyymm: '',
  }
  if (!option) {
    return chatHeaderInfo
  }
  var chatKey = option.chatType + '_' + option.chatCode
  if (option.chatType === 'CONFERENCE') {
    var conf_id = string(
      this.chatHeaderInfoTable[chatKey] &&
        this.chatHeaderInfoTable[chatKey].conf_id,
    )
    var conference = this.chatClient.getConference(conf_id)
    if (conference.conf_type === 'webchat') {
      var user = this.getBuddyUserForUi(conference.creator)
      chatHeaderInfo.conf_id = conf_id
      chatHeaderInfo.title = string(
        (user && user.name) ||
          conference.creator.user_name ||
          conference.creator.user_id,
      )
      chatHeaderInfo.guest.tenant = conference.creator.tenant
      chatHeaderInfo.guest.user_id = conference.creator.user_id
      chatHeaderInfo.guestProfinfo = string(
        conference.webchatinfo.profinfo_formatted,
      )
      chatHeaderInfo.confType = string(conference.conf_type)
      chatHeaderInfo.webchatServiceId = string(
        conference.conf_tags
          .filter(
            tag =>
              tag.tag_type === '_webchat' && tag.tag_key === 'webchatServiceId',
          )
          .sort((tag1, tag2) => tag1.tstamp - tag2.tstamp)
          .map(tag => tag.tag_value)
          .pop(),
      )
      chatHeaderInfo.webchatContinuable = string(
        conference.conf_tags
          .filter(
            tag =>
              tag.tag_type === '_webchat' &&
              tag.tag_key === 'webchatContinuable',
          )
          .sort((tag1, tag2) => tag1.tstamp - tag2.tstamp)
          .map(tag => tag.tag_value)
          .pop(),
      )
      chatHeaderInfo.replyTypes = string(
        conference.conf_tags
          .filter(
            tag => tag.tag_type === '_webchat' && tag.tag_key === 'replyTypes',
          )
          .sort((tag1, tag2) => tag1.tstamp - tag2.tstamp)
          .map(tag => tag.tag_value)
          .pop(),
      )
      chatHeaderInfo.editorTypes = string(
        conference.conf_tags
          .filter(
            tag => tag.tag_type === '_webchat' && tag.tag_key === 'editorTypes',
          )
          .sort((tag1, tag2) => tag1.tstamp - tag2.tstamp)
          .map(tag => tag.tag_value)
          .pop(),
      )
      chatHeaderInfo.initialEditorType = string(
        conference.conf_tags
          .filter(
            tag =>
              tag.tag_type === '_webchat' &&
              tag.tag_key === 'initialEditorType',
          )
          .sort((tag1, tag2) => tag1.tstamp - tag2.tstamp)
          .map(tag => tag.tag_value)
          .pop(),
      )
      chatHeaderInfo.lastConfType = string(
        conference.conf_tags
          .filter(
            tag =>
              tag.tag_type === '_webchat' && tag.tag_key === 'lastConfType',
          )
          .sort((tag1, tag2) => tag1.tstamp - tag2.tstamp)
          .map(tag => tag.tag_value)
          .pop(),
      )
      chatHeaderInfo.nextDistributionType = string(
        conference.conf_tags
          .filter(
            tag =>
              tag.tag_type === '_webchat' &&
              tag.tag_key === 'nextDistributionType',
          )
          .sort((tag1, tag2) => tag1.tstamp - tag2.tstamp)
          .map(tag => tag.tag_value)
          .pop(),
      )
      chatHeaderInfo.nextDistributionTarget = string(
        conference.conf_tags
          .filter(
            tag =>
              tag.tag_type === '_webchat' &&
              tag.tag_key === 'nextDistributionTarget',
          )
          .sort((tag1, tag2) => tag1.tstamp - tag2.tstamp)
          .map(tag => tag.tag_value)
          .pop(),
      )
      chatHeaderInfo.originalWebchatId = string(
        conference.conf_tags
          .filter(
            tag =>
              tag.tag_type === '_relation' &&
              tag.tag_key === '_originalWebchatId',
          )
          .sort((tag1, tag2) => tag1.tstamp - tag2.tstamp)
          .map(tag => tag.tag_value)
          .pop(),
      )
      chatHeaderInfo.selectedReplyType = string(
        this.chatHeaderInfoTable[chatKey] &&
          this.chatHeaderInfoTable[chatKey].selectedReplyType,
      )
      chatHeaderInfo.yyyymm = string(conference.yyyymm)
    } else {
      chatHeaderInfo.conf_id = conf_id
      chatHeaderInfo.title = conference.subject
      chatHeaderInfo.confType = string(conference.conf_type)
      chatHeaderInfo.yyyymm = string(conference.yyyymm)
    }
    if (conference.conf_status !== Constants.CONF_STATUS_INACTIVE) {
      chatHeaderInfo.conf_tags = conference.conf_tags
      chatHeaderInfo.subject = conference.subject
    } else if (this.chatHeaderInfoTable[chatKey]) {
      chatHeaderInfo.conf_tags =
        this.chatHeaderInfoTable[chatKey].conf_tags || []
      chatHeaderInfo.subject = string(this.chatHeaderInfoTable[chatKey].subject)
    } else {
      chatHeaderInfo.conf_tags = []
      chatHeaderInfo.subject = ''
    }
  } else if (option.chatType === 'CHAT') {
    try {
      var buddy = JSON.parse(option.chatCode)
      var _user = this.getBuddyUserForUi(buddy)
      chatHeaderInfo.title = string(_user && _user.name)
    } catch (e) {}
  }
  // save chatHeaderInfo
  if (
    chatHeaderInfo.title ||
    chatHeaderInfo.guest.user_id ||
    chatHeaderInfo.guestProfinfo ||
    chatHeaderInfo.confType ||
    chatHeaderInfo.webchatServiceId ||
    chatHeaderInfo.webchatContinuable ||
    chatHeaderInfo.replyTypes ||
    chatHeaderInfo.editorTypes ||
    chatHeaderInfo.initialEditorType ||
    chatHeaderInfo.lastConfType ||
    chatHeaderInfo.nextDistributionType ||
    chatHeaderInfo.nextDistributionTarget ||
    chatHeaderInfo.originalWebchatId ||
    chatHeaderInfo.selectedReplyType ||
    chatHeaderInfo.yyyymm
  ) {
    // conference is active (or buddy is found)
    this.chatHeaderInfoTable[chatKey] = chatHeaderInfo
  } else if (!this.chatHeaderInfoTable[chatKey]) {
    // conference is not active (or argument is invalid)
    return chatHeaderInfo
  } else {
  }
  // conference is not active any longer
  // keep this.chatHeaderInfoTable[chatKey]

  // return clone
  return JSON.parse(JSON.stringify(this.chatHeaderInfoTable[chatKey]))
}

var uiData = function uiData(option) {
  // data
  this.parentElement = null
  this.handlers = []
  this.ucUiAction = null
  this.ucUiStore = null
  this.chatClientHandlers = null
  this.agentComponentInstance = null
  this.phone = null
  this.phoneEventIds = {}
  this.phoneIsActive = false
  this.phoneWillRestart = false
  this.phonePropertiesLoading = false
  this.phoneRegisterDelay = 0
  this.soundOnlyStream = null
  this.panelSessionTable = {}
  this.ownerDocument = null
  this.configurations = {}
  this.webchatNotificationTarget = false
  this.dndEnabled = false
  this.uiDataId = ''
  this.lastLampObject = {}
  this.licenseMessageAppx = ''
  this.runningAnimationTable = {}
  this.showingDialogVersion = 0
  this.dialogResizeStopTime = 0
  this.showingNotificationTable = {}
  this.modalInfo = null
  this.dialogSizeTable = {}
  this.mainAreaSplitters = 0
  this.mainPanelList = []
  this.currentSelectedTab = ''
  this.lastSelectedTab = ''
  this.nextSelectedTab = ''
  this.selectedButNotFocusedTab = ''
  this.blinkingTabs = {}
  this.funcOnSelectedQueue = []
  this.currentSelectedTabScrolledToBottom = false
  this.unscrolledTabs = {}
  this.funcOnScrolledQueues = {}
  this.notifiedSignedOut = false
  this.externalCallWorkTable = {}
  this.historyDetailWorkTable = {}
  this.preferenceWorkTable = {}
  this.panelCodeCounter = 0
  this.subWindowList = []
  this.isSubWindow = false
  this.subWindowPanelType = ''
  this.subWindowPanelCode = ''
  this.addedEventListeners = {}
  this.isUC = false
  this.iconName = ''
  this.iconDisabled = false
  this.dialogPanel = null
  this.dialogOption = {}
  this.staticPanel = null
  this.chatOnly = null
  this.chatOptionButtonsInfoCreator = null
  this.funcOnWebchatLeft = {}
  this.unansweredWebchatsToKick = {}
  this.timeRender = 0
  this.intervalCheckTimeRender = 0
  this.lastRenderedTime = 0
  this.nextRenderingTimer = 0
  this.outgoingContinuationInfos = []

  // init
  if (option) {
    this.initApp(option)
  }
}

uiData.prototype.initApp = function (option) {
  var _this = this

  if (
    !option ||
    !option.parentElement ||
    !option.ucUiAction ||
    !option.ucUiStore
  ) {
    throw new Error('invalid argument')
  }
  this.parentElement = option.parentElement
  this.addHandler(this)
  if (option.handler) {
    this.addHandler(option.handler)
  }
  this.ownerDocument = option.ownerDocument || document
  if (option.webchatNotificationTarget && Brekeke.WebNotification) {
    Brekeke.WebNotification.requestPermission({
      document: this.ownerDocument,
      callback: function callback(result) {
        option.ucUiStore
          .getLogger()
          .log(
            result === 'granted' ? 'info' : 'warn',
            'WebNotification.requestPermission result=' + result,
          )
      },
    })
  }
  var win = this.ownerDocument.defaultView
  if (win) {
    var eventListenersToAdd = [
      {
        target: win,
        type: 'focus',
        listener: this.window_onfocus.bind(this),
      },
      {
        target: win,
        type: 'click',
        listener: this.window_onclick.bind(this),
      },
      {
        target: win,
        type: 'blur',
        listener: this.window_onblur.bind(this),
      },
      {
        target: win,
        type: 'resize',
        listener: this.window_onresize.bind(this),
      },
      {
        target: win,
        type: 'unload',
        listener: this.window_onunload.bind(this),
      },
    ]
    eventListenersToAdd.forEach(eventListener => {
      if (
        eventListener.target &&
        typeof eventListener.target.addEventListener === 'function'
      ) {
        eventListener.target.addEventListener(
          eventListener.type,
          eventListener.listener,
        )
      }
    })
    this.addedEventListeners = eventListenersToAdd
  }
  this.ucUiAction = option.ucUiAction
  this.ucUiStore = option.ucUiStore
  this.ucUiStore.addHandler(this)
  this.chatClientHandlers = {
    conferenceMemberChanged: this.chatClient_conferenceMemberChanged.bind(this),
  }
  this.ucUiStore.getChatClient().addHandler(this.chatClientHandlers)
  this.agentComponentInstance = option.agentComponentInstance
  this.configurations = option.configurations || {}
  this.webchatNotificationTarget = Boolean(option.webchatNotificationTarget)
  this.dndEnabled = Boolean(option.dndEnabled)
  this.uiDataId = new Date().getTime().toString(36) + Math.random().toString(36)
  if (
    this.dndEnabled &&
    this.ownerDocument.defaultView &&
    !this.ownerDocument.defaultView.$brUCDndEnabledApp
  ) {
    // you can use DropTarget in only one uiData in a window (dndEnabled will be ingored in 2nd or later uiData)
    this.ownerDocument.defaultView.$brUCDndEnabledApp = this.uiDataId
  }
  this.isUC = Boolean(option.isUC)
  this.iconName = (0, _strings.string)(option.iconName)
  this.iconDisabled = Boolean(option.iconDisabled)
  this.dialogPanel = option.dialogPanel
    ? (0, _strings.parsePanelKey)(option.dialogPanel)
    : null
  this.dialogOption = option.dialogOption || {}
  this.staticPanel = option.staticPanel
    ? (0, _strings.parsePanelKey)(option.staticPanel)
    : null
  this.chatOnly = option.chatOnly
    ? (0, _strings.parsePanelKey)(option.chatOnly)
    : null
  this.chatOptionButtonsInfoCreator =
    option.chatOptionButtonsInfoCreator || null

  if (option.bindsFunctions) {
    Brekeke.UcUiAction.BoundFunctions = {}
    Object.keys(Brekeke.UcUiAction.prototype).forEach(funcName => {
      Brekeke.UcUiAction.BoundFunctions[funcName] = function (option, event) {
        var currentTarget = (event && event.currentTarget) || {}
        var className = (0, _strings.string)(currentTarget.className)
        _this.ucUiStore
          .getLogger()
          .log(
            'debug',
            'bound function called funcName=' +
              funcName +
              ', className=' +
              className,
          )
        if (
          className.indexOf('brDisabled') !== -1 &&
          className.indexOf('brDisabledNot') === -1
        ) {
          return
        }
        var panel = (0, _strings.parsePanelKey)(_this.currentSelectedTab)
        _this.ucUiAction[funcName](
          Object.assign(
            {
              chatType: panel.panelType,
              chatCode: panel.panelCode,
              conf_id: (0, _strings.string)(
                _this.ucUiStore.getChatHeaderInfo({
                  chatType: panel.panelType,
                  chatCode: panel.panelCode,
                }).conf_id,
              ),
            },
            option,
          ),
        )
      }
    })
  }

  if (option.urlFuncBeforeRender) {
    ;(function () {
      var xhr = new XMLHttpRequest()
      xhr.open('POST', option.urlFuncBeforeRender)
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          try {
            if (xhr.status === 200) {
              _this.ucUiStore
                .getLogger()
                .log('info', 'urlFuncBeforeRender status=' + xhr.status)
              var funcBeforeRender = new Function('uiData', xhr.responseText)
              var result = funcBeforeRender(_this)
              if (result && result.then) {
                result
                  .then(() => {
                    _this.timeRender = 0
                  })
                  .catch(() => {
                    _this.timeRender = 0
                  })
              } else {
                _this.timeRender = 0
              }
            } else {
              _this.ucUiStore
                .getLogger()
                .log('warn', 'urlFuncBeforeRender status=' + xhr.status)
              _this.timeRender = 0
            }
          } catch (ex) {
            _this.ucUiStore.getLogger().log('warn', ex)
            _this.timeRender = 0
          }
        }
      }
      _this.timeRender =
        Date.now() +
        ((0, _strings.int)(option.timeoutFuncBeforeRender) || 10000)
      xhr.send()
    })()
  }

  this.initPhone(option)
}
uiData.prototype.addHandler = function (handler) {
  this.handlers.push(handler)
}

/**
 * removeHandler function
 * handler
 */
uiData.prototype.removeHandler = function (handler) {
  var index = this.handlers.indexOf(handler)
  if (index !== -1) {
    this.handlers.splice(index, 1)
  }
}

AgentComponent.prototype.ERROR_POPUP_BLOCKED = 550
AgentComponent.prototype.WEBCHAT_STATE_NONE = 0
AgentComponent.prototype.WEBCHAT_STATE_TALK = 10
AgentComponent.prototype.MAIN_WINDOW_HEARTBEAT_DELAY_DEF = 100
AgentComponent.prototype.SUB_WINDOW_CHECK_MAIN_DELAY_DEF = 10
AgentComponent.prototype.SUB_WINDOW_TIMEOUT_DEF = 10000
AgentComponent.prototype.SUB_WINDOW_TIMER_DELAY_DEF = 1000

Brekeke.UCAgentWidget.AgentComponent = AgentComponent

var int = function int(value) {
  return parseInt(value, 10) || 0
}
var string = function string(value) {
  return String(value || value === 0 || value === false ? value : '')
}
var stringify = function stringify(object) {
  var key
  var returnString

  if (object && typeof object === 'object') {
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
var escapeHTML = function escapeHTML(str) {
  return string(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
var formatStr = function formatStr(fmt, a) {
  var rep_fn = undefined
  if (typeof a === 'object') {
    rep_fn = function rep_fn(m, k) {
      return a[k]
    }
  } else {
    var args = arguments
    rep_fn = function rep_fn(m, k) {
      return args[parseInt(k) + 1]
    }
  }
  return string(fmt).replace(/\{(\w+)\}/g, rep_fn)
}
var parseDate = function parseDate(str) {
  return new Date(
    int(str.substr(0, 4)),
    int(str.substr(5, 2)) - 1,
    int(str.substr(8, 2)),
    int(str.substr(11, 2)),
    int(str.substr(14, 2)),
    int(str.substr(17, 2)),
  )
}
