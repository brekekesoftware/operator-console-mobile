'use strict'

var _react = _interopRequireDefault(require('react'))
var _reactNative = require('react-native')
var _uawmsgs = _interopRequireDefault(require('./utilities/uawmsgs'))
var _constants = _interopRequireDefault(require('./utilities/constants'))
var _strings = require('./utilities/strings')
var _currentscript = _interopRequireDefault(
  require('./utilities/currentscript'),
)
require('./utilities/polyfills')
var _App = _interopRequireDefault(require('./apps/App'))
var _UCApp = _interopRequireDefault(require('./apps/UCApp'))
var _IconApp = _interopRequireDefault(require('./apps/IconApp'))
var _DialogApp = _interopRequireDefault(require('./apps/DialogApp'))
var _StaticApp = _interopRequireDefault(require('./apps/StaticApp'))
var _ChatOnlyApp = _interopRequireDefault(require('./apps/ChatOnlyApp'))
var _UndockedPanelSubWindowApp = _interopRequireDefault(
  require('./apps/UndockedPanelSubWindowApp'),
)
var _asyncStorage = _interopRequireDefault(
  require('@react-native-async-storage/async-storage'),
)
var _index = require('./dynamic-renderer/index')
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e }
}
function _regenerator() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e,
    t,
    r = 'function' == typeof Symbol ? Symbol : {},
    n = r.iterator || '@@iterator',
    o = r.toStringTag || '@@toStringTag'
  function i(r, n, o, i) {
    var c = n && n.prototype instanceof Generator ? n : Generator,
      u = Object.create(c.prototype)
    return (
      _regeneratorDefine2(
        u,
        '_invoke',
        (function (r, n, o) {
          var i,
            c,
            u,
            f = 0,
            p = o || [],
            y = !1,
            G = {
              p: 0,
              n: 0,
              v: e,
              a: d,
              f: d.bind(e, 4),
              d: function d(t, r) {
                return (i = t), (c = 0), (u = e), (G.n = r), a
              },
            }
          function d(r, n) {
            for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) {
              var o,
                i = p[t],
                d = G.p,
                l = i[2]
              r > 3
                ? (o = l === n) &&
                  ((c = i[4] || 3),
                  (u = i[5] === e ? i[3] : i[5]),
                  (i[4] = 3),
                  (i[5] = e))
                : i[0] <= d &&
                  ((o = r < 2 && d < i[1])
                    ? ((c = 0), (G.v = n), (G.n = i[1]))
                    : d < l &&
                      (o = r < 3 || i[0] > n || n > l) &&
                      ((i[4] = r), (i[5] = n), (G.n = l), (c = 0)))
            }
            if (o || r > 1) return a
            throw ((y = !0), n)
          }
          return function (o, p, l) {
            if (f > 1) throw TypeError('Generator is already running')
            for (
              y && 1 === p && d(p, l), c = p, u = l;
              (t = c < 2 ? e : u) || !y;

            ) {
              i ||
                (c
                  ? c < 3
                    ? (c > 1 && (G.n = -1), d(c, u))
                    : (G.n = u)
                  : (G.v = u))
              try {
                if (((f = 2), i)) {
                  if ((c || (o = 'next'), (t = i[o]))) {
                    if (!(t = t.call(i, u)))
                      throw TypeError('iterator result is not an object')
                    if (!t.done) return t
                    ;(u = t.value), c < 2 && (c = 0)
                  } else
                    1 === c && (t = i.return) && t.call(i),
                      c < 2 &&
                        ((u = TypeError(
                          "The iterator does not provide a '" + o + "' method",
                        )),
                        (c = 1))
                  i = e
                } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break
              } catch (t) {
                ;(i = e), (c = 1), (u = t)
              } finally {
                f = 1
              }
            }
            return { value: t, done: y }
          }
        })(r, o, i),
        !0,
      ),
      u
    )
  }
  var a = {}
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  t = Object.getPrototypeOf
  var c = [][n]
      ? t(t([][n]()))
      : (_regeneratorDefine2((t = {}), n, function () {
          return this
        }),
        t),
    u =
      (GeneratorFunctionPrototype.prototype =
      Generator.prototype =
        Object.create(c))
  function f(e) {
    return (
      Object.setPrototypeOf
        ? Object.setPrototypeOf(e, GeneratorFunctionPrototype)
        : ((e.__proto__ = GeneratorFunctionPrototype),
          _regeneratorDefine2(e, o, 'GeneratorFunction')),
      (e.prototype = Object.create(u)),
      e
    )
  }
  return (
    (GeneratorFunction.prototype = GeneratorFunctionPrototype),
    _regeneratorDefine2(u, 'constructor', GeneratorFunctionPrototype),
    _regeneratorDefine2(
      GeneratorFunctionPrototype,
      'constructor',
      GeneratorFunction,
    ),
    (GeneratorFunction.displayName = 'GeneratorFunction'),
    _regeneratorDefine2(GeneratorFunctionPrototype, o, 'GeneratorFunction'),
    _regeneratorDefine2(u),
    _regeneratorDefine2(u, o, 'Generator'),
    _regeneratorDefine2(u, n, function () {
      return this
    }),
    _regeneratorDefine2(u, 'toString', function () {
      return '[object Generator]'
    }),
    (_regenerator = function _regenerator() {
      return { w: i, m: f }
    })()
  )
}
function _regeneratorDefine2(e, r, n, t) {
  var i = Object.defineProperty
  try {
    i({}, '', {})
  } catch (e) {
    i = 0
  }
  ;(_regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) {
    if (r)
      i
        ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t })
        : (e[r] = n)
    else {
      var o = function o(r, n) {
        _regeneratorDefine2(e, r, function (e) {
          return this._invoke(r, n, e)
        })
      }
      o('next', 0), o('throw', 1), o('return', 2)
    }
  }),
    _regeneratorDefine2(e, r, n, t)
}
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value
  } catch (n) {
    return void e(n)
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o)
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments
    return new Promise(function (r, o) {
      var a = n.apply(t, e)
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, 'next', n)
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, 'throw', n)
      }
      _next(void 0)
    })
  }
}
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
var Brekeke = (window.BLIB = window.Brekeke = window.Brekeke || {})
Brekeke.UCClient =
  Brekeke.UCClient || require('./js/brekeke/ucclient/ucclient.js')
Brekeke.WebNotification =
  Brekeke.WebNotification ||
  require('./js/brekeke/webnotification/webnotification')
var UcUiAction = (Brekeke.UcUiAction =
  Brekeke.UcUiAction || require('./js/brekeke/ucuiaction/ucuiaction'))
var UcUiStore = (Brekeke.UcUiStore =
  Brekeke.UcUiStore || require('./js/brekeke/ucuistore/ucuistore'))
_currentscript.default.init()
_uawmsgs.default.init(_currentscript.default)

/**
 * uiData class
 * option (optional)
 * option.parentElement
 * option.ucUiAction
 * option.ucUiStore
 * option.agentComponentInstance (optional)
 * option.phone (optional)
 * option.ownerDocument (optional)
 * option.configurations (optional)
 * option.webchatNotificationTarget (optional)
 * option.dndEnabled (optional)
 * option.isUC (optional)
 * option.iconName (optional)
 * option.iconDisabled (optional)
 * option.dialogPanel (optional)
 * option.dialogOption (optional)
 * option.staticPanel (optional)
 * option.chatOnly (optional)
 * option.chatOptionButtonsInfoCreator (optional)
 * option.bindsFunctions (optional)
 * option.urlFuncBeforeRender (optional)
 * option.timeoutFuncBeforeRender (optional)
 * option.handler (optional)
 */
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
  this.backgroundTabs = {}
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
  this.autoRenderingTimer = 0
  this.currentBuddyStatusCache = {}
  this.outgoingContinuationInfos = []

  // init
  if (option) {
    this.initApp(option)
  }
}

/**
 * initApp function
 * option
 * option.parentElement
 * option.ucUiAction
 * option.ucUiStore
 * option.agentComponentInstance (optional);
 * option.phone (optional)
 * option.ownerDocument (optional)
 * option.configurations (optional)
 * option.webchatNotificationTarget (optional)
 * option.dndEnabled (optional)
 * option.isUC (optional)
 * option.iconName (optional)
 * option.iconDisabled (optional)
 * option.dialogPanel (optional)
 * option.dialogOption (optional)
 * option.staticPanel (optional)
 * option.chatOnly (optional)
 * option.chatOptionButtonsInfoCreator (optional)
 * option.bindsFunctions (optional)
 * option.urlFuncBeforeRender (optional)
 * option.timeoutFuncBeforeRender (optional)
 * option.handler (optional)
 */
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
  if (this.dndEnabled && !global.$brUCDndEnabledApp) {
    // you can use DropTarget in only one uiData in a window (dndEnabled will be ingored in 2nd or later uiData)
    global.$brUCDndEnabledApp = this.uiDataId
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
  this.autoRenderingTimer = setInterval(
    this.autoRenderingTimerFunc.bind(this),
    this.configurations.autoRenderingTimerDelay || 60000,
  )
  if (option.bindsFunctions) {
    Brekeke.UcUiAction.BoundFunctions = {}
    Object.keys(Brekeke.UcUiAction.prototype).forEach(function (funcName) {
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
                .then(function () {
                  _this.timeRender = 0
                })
                .catch(function () {
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
    this.timeRender =
      Date.now() + ((0, _strings.int)(option.timeoutFuncBeforeRender) || 10000)
    xhr.send()
  }
  this.initPhone(option)
}

/**
 * initPhone function
 * option
 * option.phone (optional)
 */
uiData.prototype.initPhone = function (option) {
  var _this2 = this
  if (!this.ucUiStore) {
    return
  }
  if (this.phone) {
    this.ucUiStore.getLogger().log('info', 'phone is already initialized')
    return
  }
  if (option && option.phone) {
    alert(1)
    this.phone = option.phone
    ;[
      'phoneStatusChanged',
      'sessionCreated',
      'sessionRejected',
      'sessionStatusChanged',
      'videoClientSessionCreated',
      'videoClientSessionEnded',
      'remoteUserOptionsChanged',
      'rtcErrorOccurred',
      'icegatheringstatechange',
      'iceconnectionstatechange',
    ].forEach(function (eventName) {
      _this2.phoneEventIds[eventName] = _this2.phone.addEventListener(
        eventName,
        _this2[eventName].bind(_this2),
      )
    })
    console.log('#Duy Phan console initPhone', !this.ucUiStore)
    this.startupPhone()
  }
}

/**
 * destroyApp function
 */
uiData.prototype.destroyApp = function () {
  var _this3 = this
  var parentElement =
    typeof this.parentElement === 'string' ? this.parentElement : null
  if (this.ownerDocument) {
    parentElement =
      typeof this.parentElement === 'string' ? this.parentElement : null
    this.addedEventListeners = []
    if (
      global.$brUCDndEnabledApp &&
      global.$brUCDndEnabledApp === this.uiDataId
    ) {
      delete global.$brUCDndEnabledApp
    }
    this.ownerDocument = null
  }
  console.log('#Duy Phan console destroyApp', parentElement)
  if (parentElement) {
    ;(0, _index.renderToView)(parentElement, null)
  }
  this.shutdownPhone()
  this.panelSessionTable = {}
  Object.keys(this.phoneEventIds).forEach(function (eventName) {
    _this3.phone.removeEventListener(eventName, _this3.phoneEventIds[eventName])
    delete _this3.phoneEventIds[eventName]
  })
  this.phone = null
  clearInterval(this.autoRenderingTimer)
  this.autoRenderingTimer = 0
  this.currentBuddyStatusCache = {}
  this.agentComponentInstance = null
  if (this.ucUiStore) {
    for (var panelCode in this.unansweredWebchatsToKick) {
      // delete webchat queue of unanswered webchat for other agents
      this.ucUiStore
        .getChatClient()
        .kickOutOfConference(this.unansweredWebchatsToKick[panelCode])
    }
    this.ucUiStore.getChatClient().removeHandler(this.chatClientHandlers)
    this.ucUiStore.removeHandler(this)
    this.ucUiStore = null
  }
  this.unansweredWebchatsToKick = {}
  this.chatClientHandlers = null
  this.ucUiAction = null
  this.handlers = []
  this.parentElement = null
}

/**
 * addHandler function
 * handler
 */
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

//
uiData.prototype.fire = function (eventName) {
  var _arguments = arguments
  var result
  if (
    [
      'editorTextarea_onKeyDown',
      'splitterTop_onChange',
      'panelHeaderInviteDndable_onCheckCanDrop',
    ].indexOf(eventName) === -1
  ) {
    try {
      this.ucUiStore
        .getLogger()
        .log(
          'debug',
          'uiData.fire eventName=' +
            eventName +
            ', arguments=' +
            Array.prototype.join.call(arguments),
        )
    } catch (ex) {
      try {
        console.debug('uiData.fire eventName=' + eventName + ', ex=' + ex)
      } catch (ex) {}
    }
  }
  this.handlers.forEach(function (handler) {
    if (handler[eventName]) {
      result = handler[eventName].apply(
        handler,
        Array.prototype.slice.call(_arguments, 1),
      )
    }
  })
  return result
}

/**
 * render function
 */
uiData.prototype.render = function () {
  if (
    this.timeRender &&
    (this.timeRender < 0 || Date.now() < this.timeRender)
  ) {
    setTimeout(
      this.render.bind(this),
      (0, _strings.int)(this.intervalCheckTimeRender) || 100,
    )
    return
  }
  var elapsed = Date.now() - this.lastRenderedTime
  try {
    this.ucUiStore
      .getLogger()
      .log(
        'debug',
        'uiData.render elapsed=' + elapsed + ', tID=' + this.nextRenderingTimer,
      )
  } catch (ex) {}
  if (this.configurations.renderingInterval) {
    var remaining =
      (0, _strings.int)(this.configurations.renderingInterval) - elapsed
    if (0 < elapsed && 0 < remaining) {
      if (!this.nextRenderingTimer) {
        this.nextRenderingTimer = setTimeout(this.render.bind(this), remaining)
      }
      return
    }
  }
  this.lastRenderedTime = Date.now()
  this.nextRenderingTimer = 0
  var parentElement =
    typeof this.parentElement === 'string' ? this.parentElement : null
  if (this.iconName === 'webchatqueue') {
    var signInStatus = this.ucUiStore.getSignInStatus()
    console.log('#Duy Phan console signInStatus', signInStatus)
  }
  if (parentElement) {
    if (this.iconName) {
      ;(0, _index.renderToView)(parentElement, _IconApp.default, {
        uiData: this,
        iconName: this.iconName,
        iconDisabled: this.iconDisabled,
      })
    } else if (this.dialogPanel) {
      ;(0, _index.renderToView)(parentElement, _DialogApp.default, {
        uiData: this,
        panelType: this.dialogPanel.panelType,
        panelCode: this.dialogPanel.panelCode,
        dialogOption: this.dialogOption,
      })
    } else if (this.staticPanel) {
      ;(0, _index.renderToView)(parentElement, _StaticApp.default, {
        uiData: this,
        panelType: this.staticPanel.panelType,
        panelCode: this.staticPanel.panelCode,
      })
    } else if (this.chatOnly) {
      ;(0, _index.renderToView)(parentElement, _ChatOnlyApp.default, {
        uiData: this,
        panelType: this.chatOnly.panelType,
        panelCode: this.chatOnly.panelCode,
      })
    } else if (this.isSubWindow) {
      ;(0, _index.renderToView)(
        parentElement,
        _UndockedPanelSubWindowApp.default,
        {
          uiData: this,
          panelType: this.subWindowPanelType,
          panelCode: this.subWindowPanelCode,
        },
      )
    } else if (this.isUC) {
      ;(0, _index.renderToView)(parentElement, _UCApp.default, {
        uiData: this,
      })
    } else {
      ;(0, _index.renderToView)(parentElement, _App.default, {
        uiData: this,
      })
    }
  }
  this.changeLamp()
}

//
uiData.prototype.changeLamp = function () {
  var _this4 = this
  if (!this.configurations.lampEnabled) {
    return
  }
  var lampTypeOptions = this.getlampTypeOptions()
  var statusMe = this.ucUiStore.getChatClient().getStatus()
  var sessionTable = (this.phone && this.phone.getSessionTable()) || {}
  var blinkingCount = Object.keys(this.blinkingTabs).reduce(function (a, k) {
    return a + _this4.blinkingTabs[k]
  }, 0)
  var maxNotificationId = Object.keys(this.showingNotificationTable).reduce(
    function (a, k) {
      return Math.max(a, k)
    },
    0,
  )
  if (
    maxNotificationId === 0 &&
    this.lastLampObject &&
    this.lastLampObject.maxNotificationId !== 0 &&
    this.ownerDocument &&
    !this.ownerDocument.hasFocus()
  ) {
    maxNotificationId = this.lastLampObject.maxNotificationId
  }
  if (blinkingCount === 0 && maxNotificationId === 0) {
  } else if (this.lastLampObject) {
    blinkingCount = Math.max(blinkingCount, this.lastLampObject.blinkingCount)
    maxNotificationId = Math.max(
      maxNotificationId,
      this.lastLampObject.maxNotificationId,
    )
  }
  var lampObject = {
    lampTypeOptions: lampTypeOptions,
    status: statusMe.status,
    sessionActive: Object.keys(sessionTable).length > 0,
    incomingProgress: Object.keys(sessionTable).some(function (k) {
      return (
        sessionTable[k] &&
        sessionTable[k].rtcSession &&
        sessionTable[k].rtcSession.direction === 'incoming' &&
        sessionTable[k].sessionStatus === 'progress' &&
        !sessionTable[k].answering
      )
    }),
    blinkingCount: blinkingCount,
    maxNotificationId: maxNotificationId,
  }
  if (
    !this.lastLampObject ||
    JSON.stringify(this.lastLampObject) !== JSON.stringify(lampObject)
  ) {
    if (lampTypeOptions.lampPort) {
      this.changeLampBusylight(lampObject)
    } else if (
      this.lastLampObject &&
      this.lastLampObject.lampTypeOptions &&
      this.lastLampObject.lampTypeOptions.lampPort
    ) {
      this.changeLampBusylight({}) // turn off
    }
    this.lastLampObject = lampObject
  }
}

//
uiData.prototype.changeLampBusylight = function (lampObject) {
  this.ucUiStore
    .getLogger()
    .log('info', 'changeLampBusylight' + JSON.stringify(lampObject))
  var lampTypeOptions =
    lampObject &&
    lampObject.lampTypeOptions &&
    lampObject.lampTypeOptions.lampPort
      ? lampObject.lampTypeOptions
      : (this.lastLampObject && this.lastLampObject.lampTypeOptions) || {}
  var baseColor = '0,0,0'
  if (lampObject.status === _constants.default.STATUS_AVAILABLE) {
    baseColor = '0,0,10'
  } else if (lampObject.status === _constants.default.STATUS_BUSY) {
    baseColor = '10,0,0'
  }
  var path
  if (lampObject.incomingProgress) {
    if (lampTypeOptions.silent) {
      path = 'Light?p=' + baseColor
    } else {
      path = 'File?p=scenarios/uc_tel.json,' + baseColor
    }
  } else if (lampObject.sessionActive) {
    path = 'Light?p=' + baseColor
  } else if (lampObject.blinkingCount > 0 || lampObject.maxNotificationId > 0) {
    if (lampTypeOptions.silent) {
      path = 'Light?p=' + baseColor
    } else {
      path = 'File?p=scenarios/uc_chat.json,' + baseColor
    }
  } else {
    path = 'Light?p=' + baseColor
  }
  var elm = document.getElementById('busylight_dummy_img')
  if (!elm) {
    elm = document.createElement('img')
    elm.id = 'busylight_dummy_img'
    elm.style.position = 'absolute'
    elm.style.left = '0px'
    elm.style.top = '0px'
    elm.style.width = '1px'
    elm.style.height = '1px'
    elm.style.zIndex = '0'
    document.body.appendChild(elm)
  }
  elm.src =
    (lampTypeOptions.lampProtocol || 'http:') +
    '//' +
    (lampTypeOptions.lampHostname || '127.0.0.1') +
    ':' +
    (lampTypeOptions.lampPort || '17225') +
    '/' +
    path +
    '&' +
    +new Date()
}

//
uiData.prototype.autoRenderingTimerFunc = function () {
  var _this5 = this
  var now = Date.now()
  if (
    Object.keys(this.currentBuddyStatusCache).some(function (key) {
      return _this5.currentBuddyStatusCache[key].expiration <= now
    })
  ) {
    this.render()
  }
}

//
uiData.prototype.getCurrentBuddyStatus = function (buddy) {
  buddy = buddy || {}
  var key = JSON.stringify({
    tenant: buddy.tenant,
    user_id: buddy.user_id,
  })
  var buddyStatus = this.ucUiStore.getChatClient().getBuddyStatus(buddy)
  if (buddyStatus.disconnected_tstamp) {
    var now = Date.now()
    if (
      !this.currentBuddyStatusCache[key] ||
      this.currentBuddyStatusCache[key].expiration <= now
    ) {
      var recentlyOnlineStatusTime = (0, _strings.int)(
        this.ucUiStore.getOptionalSetting({
          key: ['recently_online_status_time'],
        }),
      )
      var recentlyOnlineStatusSteps = Math.max(
        1,
        (0, _strings.int)(
          this.ucUiStore.getOptionalSetting({
            key: ['recently_online_status_steps'],
          }),
        ),
      )
      var elapsed = now - buddyStatus.disconnected_tstamp
      if (0 < recentlyOnlineStatusTime && elapsed < recentlyOnlineStatusTime) {
        var sectorIndex = Math.floor(
          (elapsed * recentlyOnlineStatusSteps) / recentlyOnlineStatusTime,
        )
        buddyStatus.status = buddyStatus.disconnected_status
        buddyStatus.display = buddyStatus.disconnected_display
        buddyStatus.degree =
          ((sectorIndex + 1) * 360) / recentlyOnlineStatusSteps
        buddyStatus.expiration =
          buddyStatus.disconnected_tstamp +
          ((sectorIndex + 1) * recentlyOnlineStatusTime) /
            recentlyOnlineStatusSteps
      }
      this.currentBuddyStatusCache[key] = buddyStatus
    }
    return this.currentBuddyStatusCache[key]
  } else {
    delete this.currentBuddyStatusCache[key]
    return buddyStatus
  }
}

/**
 * updateTab function
 * option
 * option.open
 * option.close
 * option.select
 */
uiData.prototype.updateTab = function (option) {
  var _this6 = this
  var openedTab = null
  var closedTab = null
  var selectedTab = null
  if (option) {
    if (option.open) {
      if (
        !this.mainPanelList.find(function (p) {
          return (
            p.panelType === option.open.panelType &&
            p.panelCode === option.open.panelCode
          )
        })
      ) {
        var sourcePanelKey = option.open.sourcePanelType
          ? option.open.sourcePanelType + '_' + option.open.sourcePanelCode
          : this.currentSelectedTab
        var sourcePanelIndex = this.mainPanelList.findIndex(function (p) {
          return p.panelType + '_' + p.panelCode === sourcePanelKey
        })
        this.mainPanelList.splice(sourcePanelIndex + 1, 0, {
          panelType: option.open.panelType,
          panelCode: option.open.panelCode,
          position: option.open.sourcePanelType
            ? (0, _strings.string)(
                (this.mainPanelList[sourcePanelIndex] &&
                  this.mainPanelList[sourcePanelIndex].position) ||
                  'center',
              )
            : 'center',
        })
        openedTab = option.open.panelType + '_' + option.open.panelCode
      }
    }
    if (option.close) {
      var index = this.mainPanelList.findIndex(function (p) {
        return (
          p.panelType === option.close.panelType &&
          p.panelCode === option.close.panelCode
        )
      })
      if (index !== -1) {
        this.mainPanelList.splice(index, 1)
        closedTab = option.close.panelType + '_' + option.close.panelCode
      }
    }
    if (option.select) {
      this.nextSelectedTab =
        option.select.panelType + '_' + option.select.panelCode
    }
  }
  var firstKey = ''
  var currentKey = ''
  var lastKey = ''
  var nextKey = ''
  this.mainPanelList.forEach(function (panel) {
    var key = panel.panelType + '_' + panel.panelCode
    if (!firstKey) {
      firstKey = key
    }
    if (_this6.currentSelectedTab === key) {
      currentKey = key
    }
    if (_this6.lastSelectedTab === key) {
      lastKey = key
    }
    if (_this6.nextSelectedTab === key) {
      nextKey = key
      _this6.nextSelectedTab = ''
    }
  })
  var keyToSelect = nextKey || currentKey || lastKey || firstKey
  if (this.currentSelectedTab !== keyToSelect) {
    this.lastSelectedTab = this.currentSelectedTab
    this.currentSelectedTab = keyToSelect
    selectedTab = this.currentSelectedTab
    this.currentSelectedTabScrolledToBottom = true
    if (this.unscrolledTabs && this.unscrolledTabs[keyToSelect]) {
      delete this.unscrolledTabs[keyToSelect]
      if (this.funcOnScrolledQueues[keyToSelect]) {
        var funcOnScrolled
        while (
          (funcOnScrolled = this.funcOnScrolledQueues[keyToSelect].shift())
        ) {
          funcOnScrolled()
          this.ucUiStore
            .getLogger()
            .log(
              'debug',
              'dbg u1898 7 ' +
                (this.ucUiStore.getChatClient() || {})._user_id +
                ' funcOnScrolledQueues["' +
                keyToSelect +
                '"].shift() at updateTab()',
            )
        }
      }
    }
  }
  if (this.blinkingTabs && this.blinkingTabs[this.currentSelectedTab]) {
    delete this.blinkingTabs[this.currentSelectedTab]
    var funcOnSelected
    while ((funcOnSelected = this.funcOnSelectedQueue.shift())) {
      funcOnSelected()
      this.ucUiStore
        .getLogger()
        .log(
          'debug',
          'dbg u1898 1 ' +
            (this.ucUiStore.getChatClient() || {})._user_id +
            ' funcOnSelectedQueue.shift() at updateTab()',
        )
    }
  }
  if (selectedTab) {
    this.selectedButNotFocusedTab = selectedTab
  }
  if (openedTab || closedTab || selectedTab) {
    this.render()
  }
  if (openedTab) {
    this.fire('tabOpened', {
      panelKey: openedTab,
    })
    this.ucUiAction.refreshBuddyTable()
  }
  if (closedTab) {
    this.fire('tabClosed', {
      panelKey: closedTab,
    })
  }
  if (selectedTab) {
    this.fire('tabSelected', {
      panelKey: selectedTab,
    })
    this.discardBackgroundTabs()
  }
}

//
uiData.prototype.discardBackgroundTabs = function () {
  var _this7 = this
  var nonDiscardedCount =
    typeof this.configurations.nonDiscardedCount !== 'undefined'
      ? (0, _strings.int)(this.configurations.nonDiscardedCount)
      : 4
  if (this.mainPanelList.length <= nonDiscardedCount) {
    return
  }
  var discardingTime =
    typeof this.configurations.discardingTime !== 'undefined'
      ? (0, _strings.int)(this.configurations.discardingTime)
      : 10800000
  var candidates = []
  Object.keys(this.backgroundTabs).forEach(function (key) {
    var panel = _this7.mainPanelList.find(function (p) {
      return p.panelType + '_' + p.panelCode === key
    })
    if (!panel) {
      delete _this7.backgroundTabs[key]
      return
    }
    if (panel.panelType !== 'CHAT') {
      return
    }
    if (Date.now() - _this7.backgroundTabs[key].time < discardingTime) {
      return
    }
    candidates.push({
      key: key,
      time: _this7.backgroundTabs[key].time,
      panel: panel,
    })
  })
  candidates
    .sort(function (a, b) {
      return a.time - b.time
    })
    .slice(0, this.mainPanelList.length - nonDiscardedCount)
    .forEach(function (a) {
      if (!_this7.backgroundTabs[a.key].discarded) {
        _this7.ucUiAction.clearChat({
          chatType: a.panel.panelType,
          chatCode: a.panel.panelCode,
        })
        _this7.backgroundTabs[a.key].discarded = true
        _this7.ucUiStore
          .getLogger()
          .log('debug', 'discarded: ' + a.panel.panelCode)
      }
    })
}

/**
 * showModal function
 * option
 */
uiData.prototype.showModal = function (option) {
  if (this.modalInfo) {
    this.ucUiStore
      .getLogger()
      .log('info', 'showModal() waiting for the previous dialog to close...')
    if (this.modalInfo.onCancel) {
      this.ucUiStore.getLogger().log('info', 'showModal() onCancel()')
      this.modalInfo.onCancel({})
    }
    this.modalInfo = null
    this.render()
    setTimeout(this.showModal.bind(this, option), 0)
    return
  }
  this.modalInfo = {
    title: option && option.title,
    contentClass: option && option.contentClass,
    contentParams: option && option.contentParams,
    tableClassName: option && option.tableClassName,
    modalClassName: option && option.modalClassName,
    overlayClassName: option && option.overlayClassName,
    modalStyle: option && option.modalStyle,
    message: option && option.message,
    asHTML: option && option.asHTML,
    checkBoxLabel: option && option.checkBoxLabel,
    checkBoxChecked: Boolean(option && option.checkBoxChecked),
    selectItemList: option && option.selectItemList,
    cancelable: Boolean(option && option.cancelable),
    thirdButton: Boolean(option && option.thirdButton),
    cancelByThirdButton: Boolean(option && option.cancelByThirdButton),
    okCaption: option && option.okCaption,
    cancelCaption: option && option.cancelCaption,
    thirdButtonCaption: option && option.thirdButtonCaption,
    okClassName: option && option.okClassName,
    cancelClassName: option && option.cancelClassName,
    thirdButtonClassName: option && option.thirdButtonClassName,
    onOk: (option && option.onOk) || null,
    onCancel: (option && option.onCancel) || null,
    onThirdButton: (option && option.onThirdButton) || null,
  }
  this.ucUiStore
    .getLogger()
    .log(
      'info',
      'showModal() contentClass=' +
        this.modalInfo.contentClass +
        ' message=' +
        this.modalInfo.message,
    )
  this.render()
}

//
uiData.prototype.showModalSessionWarning = function (
  panelKey,
  warningMessageKey,
  warningMessageValue,
) {
  var _this8 = this
  var warningMessages = this.panelSessionTable[panelKey]
    ? this.panelSessionTable[panelKey].warningMessages ||
      (this.panelSessionTable[panelKey].warningMessages = {})
    : {}
  if (!warningMessages[warningMessageKey]) {
    warningMessages[warningMessageKey] = ''
  }
  warningMessages[warningMessageKey] +=
    (0, _strings.string)(warningMessageValue) + '\n'
  var audioResettable =
    (warningMessages.MSG_CALL_RTC_ERROR ||
      warningMessages.MSG_CALL_RTC_ANSWER_ERROR ||
      warningMessages.MSG_CALL_RTC_MICROPHONE_ERROR) &&
    this.ucUiStore.getLocalStoragePreference({
      keyList: ['audioSource'],
    })[0]
  var videoResettable =
    warningMessages.MSG_CALL_RTC_CAMERA_ERROR &&
    this.ucUiStore.getLocalStoragePreference({
      keyList: ['videoSource'],
    })[0]
  this.showModal({
    title: _uawmsgs.default.CMN_ALERT,
    message: Object.keys(warningMessages).reduce(function (a, key) {
      return a + _uawmsgs.default[key] + '\n' + warningMessages[key]
    }, ''),
    checkBoxLabel:
      audioResettable || videoResettable
        ? _uawmsgs.default.LBL_CALL_RTC_ERROR_CHECK
        : '',
    onOk: function onOk(ev) {
      if (_this8.panelSessionTable[panelKey]) {
        _this8.panelSessionTable[panelKey].warningMessages = {}
      }
      if (ev && ev.modalInfo && ev.modalInfo.checkBoxChecked) {
        var keyValueList = []
        if (audioResettable) {
          keyValueList.push({
            key: 'audioSource',
            value: '',
          })
        }
        if (videoResettable) {
          keyValueList.push({
            key: 'videoSource',
            value: '',
          })
        }
        _this8.ucUiAction.setLocalStoragePreference({
          keyValueList: keyValueList,
        })
        _this8.setPhoneDefaultOptions()
      }
    },
  })
}

//
uiData.prototype.closeAllshowingDialogs = function () {
  this.showingDialogVersion++
}

//
uiData.prototype.startAnimation = function (
  animationName,
  duration,
  overridable,
) {
  if (this.runningAnimationTable[animationName]) {
    if (overridable) {
      this.stopAnimation(animationName)
      setTimeout(
        this.startAnimation.bind(this, animationName, duration, overridable),
        0,
      )
    }
    return
  }
  this.runningAnimationTable[animationName] = {
    timer: setTimeout(this.stopAnimation.bind(this, animationName), duration),
  }
  this.render()
}

//
uiData.prototype.stopAnimation = function (animationName) {
  if (this.runningAnimationTable[animationName]) {
    clearTimeout(this.runningAnimationTable[animationName].timer)
    delete this.runningAnimationTable[animationName]
    this.render()
  }
}

//
uiData.prototype.loadLanguage = function () {
  if (!this.configurations.languageLoadable) {
    return
  }
  var settings = this.ucUiStore.getChatClient().getSettings()
  var configProperties = this.ucUiStore.getConfigProperties()
  var languageSetting = (0, _strings.string)(
    configProperties.optional_config &&
      configProperties.optional_config.language_setting,
  )
  var userLanguage =
    languageSetting === 'user'
      ? (0, _strings.string)(
          settings.optional_settings &&
            settings.optional_settings.user_language,
        )
      : languageSetting
  var lang
  if (!userLanguage || userLanguage === 'auto') {
    if (typeof navigator !== 'undefined') {
      lang = (
        (0, _strings.string)(
          navigator.browserLanguage ||
            navigator.language ||
            navigator.userLanguage,
        ) + 'en'
      ).substr(0, 2)
    } else {
      lang = 'en'
    }
  } else {
    lang = userLanguage
  }
  if (lang === 'en') {
    lang = 'default'
  }
  _uawmsgs.default.loadLanguage(lang, this.render.bind(this))
  // save to exos for ChatReport
  this.ucUiStore.getChatClient().setExosProperty('current_lang', lang)
  // save to localStorage for ucindex
  try {
    _asyncStorage.default.setItem('UC.ucindex.lang', lang)
  } catch (ex) {
    this.ucUiStore
      .getLogger()
      .log('warn', 'localStorage.setItem error ex=' + ex)
  }
}

//
uiData.prototype.getAgentComponentInstance = function () {
  return (
    this.agentComponentInstance ||
    (Brekeke.UCAgentWidgetSubWindow &&
      Brekeke.UCAgentWidgetSubWindow.AgentComponentInstanceOfMainWindow) ||
    null
  )
}

//
uiData.prototype.startupPhone = function () {
  var _this9 = this
  this.phoneWillRestart = false
  if (!this.phone) {
    this.ucUiStore.getLogger().log('info', 'empty phone')
    return
  }
  if (this.phoneIsActive) {
    this.ucUiStore.getLogger().log('info', 'phone is already active')
    return
  }
  if (this.phone.getPhoneStatus() === 'stopping') {
    this.ucUiStore.getLogger().log('info', 'phone will restart after stop')
    this.phoneWillRestart = true
    return
  }
  if (this.phone.getPhoneStatus() !== 'stopped') {
    this.ucUiStore
      .getLogger()
      .log('info', 'phoneStatus is ' + this.phone.getPhoneStatus())
    return
  }
  if (this.ucUiStore.getSignInStatus() !== 3) {
    this.ucUiStore.getLogger().log('info', 'not signed in at startupPhone')
    return
  }
  if (
    this.ucUiStore.getLocalStoragePreference({
      keyList: ['webRTCDisabled'],
    })[0]
  ) {
    this.ucUiStore.getLogger().log('info', 'webRTCDisabled')
    return
  }
  if (
    this.ucUiStore.getChatClient().getProfile().user_type ===
    _constants.default.USER_TYPE_SYSTEM_ADMIN
  ) {
    this.ucUiStore
      .getLogger()
      .log('info', 'system admin user cannot use webrtc')
    return
  }
  this.phoneIsActive = true
  this.registerPhone(
    false,
    this.showModal.bind(this, {
      // onPermanentlyUnavailable
      title: _uawmsgs.default.CMN_ALERT,
      message:
        _uawmsgs.default.MSG_WEBRTC_UNAVAILABLE_1 +
        '\n' +
        _uawmsgs.default.MSG_WEBRTC_UNAVAILABLE_2,
      cancelable: true,
      thirdButton: true,
      okCaption: _uawmsgs.default.LBL_WEBRTC_UNAVAILABLE_YES,
      cancelCaption: _uawmsgs.default.LBL_WEBRTC_UNAVAILABLE_NO,
      thirdButtonCaption: _uawmsgs.default.LBL_WEBRTC_UNAVAILABLE_NEVER,
      onOk: this.registerPhone.bind(this, true, null),
      // retry registration (force to add phone id)
      onCancel: this.registerPhone.bind(this, false, null),
      // retry registration
      onThirdButton: function onThirdButton(ev) {
        _this9.ucUiAction.setLocalStoragePreference({
          keyValueList: [
            {
              key: 'webRTCDisabled',
              value: 'true',
            },
          ],
        })
        _this9.shutdownPhone()
      },
    }),
  )
}

//
uiData.prototype.shutdownPhone = function () {
  this.phoneIsActive = false
  this.phoneWillRestart = false
  if (!this.phone) {
    this.ucUiStore.getLogger().log('info', 'empty phone')
    return
  }
  this.phone.stopWebRTC(false)
}

//
uiData.prototype.registerPhone = function (force, onPermanentlyUnavailable) {
  var _this0 = this
  if (!this.phone) {
    this.ucUiStore.getLogger().log('info', 'empty phone')
    return
  }
  if (!this.phoneIsActive) {
    this.ucUiStore.getLogger().log('info', 'phone is inactive')
    return
  }
  if (this.phone.getPhoneStatus() !== 'stopped') {
    this.ucUiStore
      .getLogger()
      .log('info', 'phoneStatus is ' + this.phone.getPhoneStatus())
    return
  }
  if (this.phonePropertiesLoading) {
    this.ucUiStore
      .getLogger()
      .log('info', 'phone properties loading is already in process')
    return
  }
  this.phonePropertiesLoading = true
  this.ucUiStore.getChatClient().loadPhoneProperties(
    {
      force: force,
    },
    function (ev) {
      _this0.phonePropertiesLoading = false
      if (!_this0.phoneIsActive) {
        _this0.ucUiStore.getLogger().log('info', 'phone is inactive')
        return
      }
      if (_this0.phone.getPhoneStatus() !== 'stopped') {
        _this0.ucUiStore
          .getLogger()
          .log('info', 'phoneStatus is ' + _this0.phone.getPhoneStatus())
        return
      }
      if (ev.phone_prop) {
        var phone_prop = {}
        try {
          phone_prop = JSON.parse(ev.phone_prop) || {}
          Object.keys(phone_prop).forEach(function (k) {
            return (_this0.phone[k] = phone_prop[k])
          })
        } catch (ex) {
          _this0.ucUiStore.getLogger().log('warn', ex)
        }
      }
      var webRTCTypeOptions = _this0.setPhoneDefaultOptions()
      var configuration = webRTCTypeOptions.configuration || {}
      try {
        configuration.host =
          (0, _strings.string)(ev.sip_host) ||
          new URL(_this0.ucUiStore.getSignInOption().url).hostname
      } catch (ex) {
        _this0.ucUiStore.getLogger().log('warn', ex)
      }
      configuration.tls = !(
        _this0.ownerDocument.defaultView &&
        _this0.ownerDocument.defaultView.location &&
        _this0.ownerDocument.defaultView.location.protocol === 'http:'
      )
      configuration.port = (0, _strings.int)(
        configuration.tls ? ev.sip_wss_port : ev.sip_ws_port,
      )
      configuration.user = (0, _strings.string)(ev.pnumber)
      configuration.password = (0, _strings.string)(ev.password)
      configuration.auth = (0, _strings.string)(ev.authorization)
      configuration.useVideoClient = true
      configuration.register_expires = (0, _strings.int)(ev.register_expires)
      configuration.userAgent = (0, _strings.string)(ev.user_agent)
      if (
        typeof configuration.socketKeepAlive === 'undefined' &&
        typeof _this0.configurations.socketKeepAlive !== 'undefined'
      ) {
        configuration.socketKeepAlive = (0, _strings.int)(
          _this0.configurations.socketKeepAlive,
        )
      }
      try {
        _this0.phone.startWebRTC(configuration)
      } catch (ex) {
        _this0.ucUiStore.getLogger().log('warn', ex)
        // retry registration
        setTimeout(
          _this0.registerPhone.bind(_this0, false, null),
          (_this0.phoneRegisterDelay = Math.min(
            (_this0.phoneRegisterDelay + 500) * 2,
            300000,
          )),
        )
        _this0.ucUiStore
          .getLogger()
          .log(
            'info',
            'retrying registration in ' + _this0.phoneRegisterDelay + 'ms',
          )
      }
    },
    function (ev) {
      _this0.ucUiStore
        .getLogger()
        .log(
          'warn',
          'chatClient.loadPhoneProperties error code=' +
            ev.code +
            ', message=' +
            ev.message,
        )
      _this0.phonePropertiesLoading = false
      if (!_this0.phoneIsActive) {
        _this0.ucUiStore.getLogger().log('info', 'phone is inactive')
        return
      }
      if (
        ev.code === Brekeke.UCClient.Errors.WEBRTC_PERMANENTLY_UNAVAILABLE &&
        onPermanentlyUnavailable
      ) {
        onPermanentlyUnavailable()
      } else {
        // retry registration
        setTimeout(
          _this0.registerPhone.bind(_this0, false, null),
          (_this0.phoneRegisterDelay = Math.min(
            (_this0.phoneRegisterDelay + 500) * 2,
            300000,
          )),
        )
        _this0.ucUiStore
          .getLogger()
          .log(
            'info',
            'retrying registration in ' + _this0.phoneRegisterDelay + 'ms',
          )
      }
    },
  )
}

//
uiData.prototype.notifyCallStatus = function () {
  var _this1 = this
  var callStatus =
    this.ucUiStore.getOptionalSetting({
      key: 'notify_call_status',
    }) &&
    this.phone &&
    this.phone.getSessionCount() >= 1
      ? 1
      : 0
  var conferenceStatus = (0, _strings.int)(
    this.ucUiStore.getOptionalSetting({
      key: 'notify_conf_status',
    }) &&
      Object.values(this.ucUiStore.getChatTable()).reduce(function (
        accumulator,
        currentValue,
      ) {
        var chatHeaderInfo = _this1.ucUiStore.getChatHeaderInfo(currentValue)
        var conference =
          chatHeaderInfo.conf_id &&
          _this1.ucUiStore.getChatClient().getConference(chatHeaderInfo.conf_id)
        if (
          conference &&
          conference.conf_status === _constants.default.CONF_STATUS_JOINED &&
          conference.user.filter(function (u) {
            return u.conf_status === _constants.default.CONF_STATUS_JOINED
          }).length >= 2
        ) {
          return accumulator + (conference.conf_type === 'webchat' ? 100 : 1)
        } else {
          return accumulator
        }
      }, 0),
  )
  var statusOrg = this.ucUiStore.getChatClient().getStatus()
  var callStatusOrg = (0, _strings.int)(
    statusOrg &&
      statusOrg.ui_customized_status &&
      statusOrg.ui_customized_status.callStatus,
  )
  var conferenceStatusOrg = (0, _strings.int)(
    statusOrg &&
      statusOrg.ui_customized_status &&
      statusOrg.ui_customized_status.conferenceStatus,
  )
  if (
    callStatus !== callStatusOrg ||
    conferenceStatus !== conferenceStatusOrg
  ) {
    var ui_customized_status = statusOrg.ui_customized_status || {}
    ui_customized_status.callStatus = callStatus
    ui_customized_status.conferenceStatus = conferenceStatus
    this.ucUiAction.changeStatus({
      ui_customized_status: ui_customized_status,
    })
  }
}

//
uiData.prototype.makeCall = function (panelType, panelCode, isVideo, isScreen) {
  var panelKey = panelType + '_' + panelCode
  var profile = this.ucUiStore.getChatClient().getProfile()
  var dontMakeVideo = new RegExp(
    '^' +
      this.ucUiStore.getLocalStoragePreference({
        keyList: ['noVideoMode'],
      })[0] +
      '$',
  ).test(panelType)
  if (!this.phone) {
    this.ucUiStore.getLogger().log('warn', 'empty phone')
    return
  }
  if (this.phone.getPhoneStatus() !== 'started') {
    this.ucUiStore
      .getLogger()
      .log('warn', 'phoneStatus is ' + this.phone.getPhoneStatus())
    return
  }
  if (this.panelSessionTable[panelKey]) {
    // session already exists
    this.ucUiStore.getLogger().log('warn', 'already calling')
    return
  }
  var target
  if (panelType === 'CHAT') {
    var buddy
    try {
      buddy = JSON.parse(panelCode) || {}
    } catch (ex) {
      this.ucUiStore
        .getLogger()
        .log('warn', 'failed to parse panelCode=' + panelCode)
      return
    }
    if (buddy.tenant !== profile.tenant) {
      this.ucUiStore
        .getLogger()
        .log('warn', 'cannot call to buddy of tenant=' + buddy.tenant)
      return
    }
    target = (0, _strings.string)(buddy.user_id)
  } else if (panelType === 'CONFERENCE') {
    var conference = this.ucUiStore.getChatClient().getConference(
      (0, _strings.string)(
        this.ucUiStore.getChatHeaderInfo({
          chatType: panelType,
          chatCode: panelCode,
        }).conf_id,
      ),
    )
    if (conference.webchatinfo && conference.webchatinfo.call_target) {
      target = (0, _strings.string)(conference.webchatinfo.call_target)
    } else {
      target = (0, _strings.string)(conference.conf_ext)
    }
  } else if (panelType === 'EXTERNALCALL') {
    target = (0, _strings.string)(panelCode)
  }
  if (!target) {
    this.ucUiStore.getLogger().log('warn', 'empty target')
    return
  }
  this.panelSessionTable[panelKey] = {
    sessionId: '',
    target: target,
    isVideo: isVideo,
    isScreen: isScreen,
    cameraMuted: !isVideo || isScreen,
    holded: false,
    transferring: false,
    iceConnectedOnce: false,
    videoIceConnectedOnce: false,
    warningMessages: {},
  }
  this.phone.makeCall(
    target,
    null,
    isVideo,
    this.getVideoOptions(panelKey),
    JSON.stringify({
      soundOnly: !Boolean(isVideo),
    }),
  )
}

//
uiData.prototype.getVideoOptions = function (panelKey) {
  var isVideo = (this.panelSessionTable[panelKey] || {}).isVideo
  var isScreen = (this.panelSessionTable[panelKey] || {}).isScreen
  var videoOptions = {
    call: Object.assign(
      {},
      this.phone &&
        this.phone.defaultOptions &&
        this.phone.defaultOptions.videoOptions &&
        this.phone.defaultOptions.videoOptions.call,
    ),
    answer: Object.assign(
      {},
      this.phone &&
        this.phone.defaultOptions &&
        this.phone.defaultOptions.videoOptions &&
        this.phone.defaultOptions.videoOptions.answer,
    ),
    shareStream: true,
    screenCapture: Boolean(isScreen),
  }
  if (
    !isVideo ||
    this.ucUiStore.getLocalStoragePreference({
      keyList: ['videoSource'],
    })[0] === 'sound_only'
  ) {
    var canvasSoundOnly = this.ownerDocument.querySelector('canvas.brSoundOnly')
    if (!canvasSoundOnly) {
      canvasSoundOnly = this.ownerDocument.createElement('canvas')
      canvasSoundOnly.className = 'brSoundOnly'
      canvasSoundOnly.style.display = 'none'
      canvasSoundOnly.width = 80
      canvasSoundOnly.height = 60
      this.ownerDocument.body.appendChild(canvasSoundOnly)
    }
    if (!this.soundOnlyStream) {
      var context = canvasSoundOnly.getContext('2d')
      context.fillStyle = '#041008'
      context.fillRect(0, 0, 80, 60)
      this.soundOnlyStream = canvasSoundOnly.captureStream(0)
    }
    videoOptions.call.mediaStream = videoOptions.answer.mediaStream =
      this.soundOnlyStream
  }
  return videoOptions
}

//
uiData.prototype.sendDTMF = function (tones, sessionId, options) {
  var defaultOptions = undefined
  try {
    defaultOptions = JSON.parse(
      this.ucUiStore.getOptionalSetting({
        key: ['send_dtmf_options'],
      }),
    )
  } catch (ex) {}
  if (defaultOptions) {
    if (options) {
      options = Object.assign(defaultOptions, options)
    } else {
      options = defaultOptions
    }
  }
  this.phone.sendDTMF(tones, sessionId, options)
}

//
uiData.prototype.setPhoneDefaultOptions = function () {
  var configProperties = this.ucUiStore.getConfigProperties()
  // get preference
  var localStoragePreference = this.ucUiStore.getLocalStoragePreference({
    keyList: ['webRTCTypeName', 'audioSource', 'videoSource'],
  })
  var webRTCTypeName = (0, _strings.string)(localStoragePreference[0])
  var audioSource = (0, _strings.string)(localStoragePreference[1])
  var videoSource = (0, _strings.string)(localStoragePreference[2])
  // get webrtc type name
  if (
    !webRTCTypeName ||
    (configProperties.optional_config &&
      configProperties.optional_config.webrtc_type_name_locked)
  ) {
    webRTCTypeName = (0, _strings.string)(
      this.ucUiStore.getOptionalSetting({
        key: 'webrtc_type_name',
      }),
    )
  }
  // get webrtc type options
  var webRTCTypeOptions = {}
  var webRTCTypes = this.getWebRTCTypes()
  var webRTCType = webRTCTypes.find(function (type) {
    return type.name === webRTCTypeName
  })
  if (webRTCType) {
    try {
      webRTCTypeOptions = JSON.parse(webRTCType.options) || {}
    } catch (ex) {
      this.ucUiStore.getLogger().log('warn', ex)
    }
  }
  if (!this.phone) {
    this.ucUiStore.getLogger().log('warn', 'empty phone')
    return webRTCTypeOptions
  }
  // set default call options
  var callOptions = webRTCTypeOptions.callOptions || {}
  this.phone.setDefaultCallOptions(callOptions)
  // set deviceId
  if (!this.phone.defaultOptions) {
    this.phone.defaultOptions = {}
  }
  if (!this.phone.defaultOptions.main) {
    this.phone.defaultOptions.main = {}
  }
  if (!this.phone.defaultOptions.main.call) {
    this.phone.defaultOptions.main.call = {}
  }
  if (!this.phone.defaultOptions.main.call.mediaConstraints) {
    this.phone.defaultOptions.main.call.mediaConstraints = {}
  }
  if (audioSource) {
    if (
      !this.phone.defaultOptions.main.call.mediaConstraints.audio ||
      _typeof(this.phone.defaultOptions.main.call.mediaConstraints.audio) !==
        'object'
    ) {
      this.phone.defaultOptions.main.call.mediaConstraints.audio = {}
    }
    this.phone.defaultOptions.main.call.mediaConstraints.audio.deviceId =
      audioSource
  } else {
    if (!this.phone.defaultOptions.main.call.mediaConstraints.audio) {
      this.phone.defaultOptions.main.call.mediaConstraints.audio = true
    } else if (
      this.phone.defaultOptions.main.call.mediaConstraints.audio.deviceId
    ) {
      delete this.phone.defaultOptions.main.call.mediaConstraints.audio.deviceId
    }
  }
  if (!this.phone.defaultOptions.main.answer) {
    this.phone.defaultOptions.main.answer = {}
  }
  if (!this.phone.defaultOptions.main.answer.mediaConstraints) {
    this.phone.defaultOptions.main.answer.mediaConstraints = {}
  }
  if (audioSource) {
    if (
      !this.phone.defaultOptions.main.answer.mediaConstraints.audio ||
      _typeof(this.phone.defaultOptions.main.answer.mediaConstraints.audio) !==
        'object'
    ) {
      this.phone.defaultOptions.main.answer.mediaConstraints.audio = {}
    }
    this.phone.defaultOptions.main.answer.mediaConstraints.audio.deviceId =
      audioSource
  } else {
    if (!this.phone.defaultOptions.main.answer.mediaConstraints.audio) {
      this.phone.defaultOptions.main.answer.mediaConstraints.audio = true
    } else if (
      this.phone.defaultOptions.main.answer.mediaConstraints.audio.deviceId
    ) {
      delete this.phone.defaultOptions.main.answer.mediaConstraints.audio
        .deviceId
    }
  }
  if (!this.phone.defaultOptions.videoOptions) {
    this.phone.defaultOptions.videoOptions = {}
  }
  if (!this.phone.defaultOptions.videoOptions.call) {
    this.phone.defaultOptions.videoOptions.call = {}
  }
  if (!this.phone.defaultOptions.videoOptions.call.mediaConstraints) {
    this.phone.defaultOptions.videoOptions.call.mediaConstraints = {}
  }
  if (videoSource && videoSource !== 'sound_only') {
    if (
      !this.phone.defaultOptions.videoOptions.call.mediaConstraints.video ||
      _typeof(
        this.phone.defaultOptions.videoOptions.call.mediaConstraints.video,
      ) !== 'object'
    ) {
      this.phone.defaultOptions.videoOptions.call.mediaConstraints.video = {}
    }
    this.phone.defaultOptions.videoOptions.call.mediaConstraints.video.deviceId =
      videoSource
  } else {
    if (!this.phone.defaultOptions.videoOptions.call.mediaConstraints.video) {
      this.phone.defaultOptions.videoOptions.call.mediaConstraints.video = true
    } else if (
      this.phone.defaultOptions.videoOptions.call.mediaConstraints.video
        .deviceId
    ) {
      delete this.phone.defaultOptions.videoOptions.call.mediaConstraints.video
        .deviceId
    }
  }
  if (!this.phone.defaultOptions.videoOptions.answer) {
    this.phone.defaultOptions.videoOptions.answer = {}
  }
  if (!this.phone.defaultOptions.videoOptions.answer.mediaConstraints) {
    this.phone.defaultOptions.videoOptions.answer.mediaConstraints = {}
  }
  if (videoSource && videoSource !== 'sound_only') {
    if (
      !this.phone.defaultOptions.videoOptions.answer.mediaConstraints.video ||
      _typeof(
        this.phone.defaultOptions.videoOptions.answer.mediaConstraints.video,
      ) !== 'object'
    ) {
      this.phone.defaultOptions.videoOptions.answer.mediaConstraints.video = {}
    }
    this.phone.defaultOptions.videoOptions.answer.mediaConstraints.video.deviceId =
      videoSource
  } else {
    if (!this.phone.defaultOptions.videoOptions.answer.mediaConstraints.video) {
      this.phone.defaultOptions.videoOptions.answer.mediaConstraints.video = true
    } else if (
      this.phone.defaultOptions.videoOptions.answer.mediaConstraints.video
        .deviceId
    ) {
      delete this.phone.defaultOptions.videoOptions.answer.mediaConstraints
        .video.deviceId
    }
  }
  // return webrtc type options
  return webRTCTypeOptions
}

//
uiData.prototype.getWebRTCTypes = function () {
  var configProperties = this.ucUiStore.getConfigProperties()
  var webRTCTypes = []
  try {
    webRTCTypes =
      (configProperties.optional_config &&
        configProperties.optional_config.webrtc_types &&
        JSON.parse(configProperties.optional_config.webrtc_types)) ||
      []
  } catch (ex) {
    this.ucUiStore.getLogger().log('warn', ex)
  }
  return webRTCTypes
}

//
uiData.prototype.getlampTypeOptions = function () {
  var lampTypeName
  if (
    this.preferenceWorkTable['static'] &&
    this.preferenceWorkTable['static'].lampTypeTestingNow
  ) {
    lampTypeName = (0, _strings.string)(
      this.preferenceWorkTable['static'].lampTypeName,
    )
  } else {
    lampTypeName = (0, _strings.string)(
      this.ucUiStore.getLocalStoragePreference({
        keyList: ['lampTypeName'],
      })[0],
    )
    if (
      this.ucUiStore.getOptionalSetting({
        key: 'status_options_enabled',
      })
    ) {
      var statusOptions =
        this.ucUiStore.getOptionalSetting({
          key: 'status_options',
        }) || []
      var statusMe = this.ucUiStore.getChatClient().getStatus()
      var statusOption = statusOptions[statusMe.status] || {}
      if (typeof statusOption.lampTypeName !== 'undefined') {
        lampTypeName = statusOption.lampTypeName
      }
    }
  }
  var lampTypes = this.getlampTypes()
  var lampType = lampTypes.find(function (type) {
    return type.name === lampTypeName
  })
  if (lampType) {
    try {
      return JSON.parse(lampType.options) || {}
    } catch (ex) {
      this.ucUiStore.getLogger().log('warn', ex)
    }
  }
  return {}
}

//
uiData.prototype.getlampTypes = function () {
  var configProperties = this.ucUiStore.getConfigProperties()
  var types = []
  try {
    types =
      (configProperties.optional_config &&
        configProperties.optional_config.lamp_types &&
        JSON.parse(configProperties.optional_config.lamp_types)) ||
      []
  } catch (ex) {
    this.ucUiStore.getLogger().log('warn', ex)
  }
  types.unshift({
    name: '_silent',
    options: '{"silent": true}',
  })
  types.unshift({
    name: '',
    options: '{}',
  })
  return types
}
uiData.prototype.sendTextFromEditor = function (
  panelType,
  panelCode,
  editorTextarea,
  subjectTextBox,
  isEmail,
) {
  var _this10 = this
  if (editorTextarea && editorTextarea.getValue()) {
    var text = (0, _strings.string)(editorTextarea.getValue())
    var isRichText = false
    if (text.substring(0, '/html '.length) === '/html ') {
      text = text.substring('/html '.length)
      isRichText = true
    }
    var subject = (0, _strings.string)(
      subjectTextBox && subjectTextBox.getValue(),
    )
    var sendTextFuncInner = function sendTextFuncInner() {
      _this10.ucUiAction.sendText({
        chatType: panelType,
        chatCode: panelCode,
        text: text,
        isRichText: isRichText,
      })
      editorTextarea.setValue('')
      editorTextarea.focus()
      _this10.render()
    }
    var sendTextFunc =
      isEmail && panelType === 'CONFERENCE' && subject
        ? function () {
            var chatHeaderInfo = _this10.ucUiStore.getChatHeaderInfo({
              chatType: panelType,
              chatCode: panelCode,
            })
            _this10.ucUiStore.getChatClient().updateTag(
              {
                attached_type: 'conf',
                attached_id: (0, _strings.string)(chatHeaderInfo.conf_id),
                yyyymm: (0, _strings.string)(chatHeaderInfo.yyyymm),
                adds: [
                  {
                    tag_key: '_outgoing_email_subject',
                    tag_value: subject,
                    tag_type: '_conftag',
                    permission: _constants.default.USER_TYPE_TENANT_GUEST,
                  },
                ],
              },
              sendTextFuncInner,
              sendTextFuncInner,
            )
          }
        : sendTextFuncInner
    if (
      this.ucUiStore.getOptionalSetting({
        key: 'sending_confirmation',
      })
    ) {
      this.showModal({
        title: _uawmsgs.default.MSG_SEND_TEXT_CONFIRM_TITLE,
        message: _uawmsgs.default.MSG_SEND_TEXT_CONFIRM,
        cancelable: true,
        onOk: sendTextFunc,
        onCancel: editorTextarea.focus.bind(editorTextarea),
      })
    } else {
      sendTextFunc()
    }
  }
}
uiData.prototype.replyContinuation = function (
  yyyymm,
  conf_id,
  replyType,
  originalWebchatId,
  invitesSoon,
  nextWebchatTags,
) {
  var _this11 = this
  return new Promise(function (resolve, reject) {
    var profile = _this11.ucUiStore.getChatClient().getProfile()
    var conference = _this11.ucUiStore.getChatClient().getConference(conf_id)

    // update tag of next distribution
    var adds = [
      {
        tag_key: 'replyingCode',
        tag_value: profile.user_id,
        tag_type: '_webchat',
        permission: _constants.default.USER_TYPE_TENANT_USER,
        unoverwritable: '_FOR_REPLYING_CODE',
      },
      {
        tag_key: 'nextDistributionType',
        tag_value: '0',
        tag_type: '_webchat',
        permission: _constants.default.USER_TYPE_TENANT_USER,
      },
      {
        tag_key: 'nextDistributionTarget',
        tag_value: profile.user_id,
        tag_type: '_webchat',
        permission: _constants.default.USER_TYPE_TENANT_USER,
      },
      {
        tag_key: 'nextWebchatTags',
        tag_value: JSON.stringify(nextWebchatTags || []),
        tag_type: '_webchat',
        permission: _constants.default.USER_TYPE_TENANT_USER,
      },
      {
        tag_key: 'selectedReplyType',
        tag_value: replyType,
        tag_type: '_webchat',
        permission: _constants.default.USER_TYPE_TENANT_USER,
      },
    ]
    if (!originalWebchatId) {
      adds.push({
        tag_key: '_originalWebchatId',
        tag_value: yyyymm + '_' + conf_id,
        tag_type: '_relation',
        permission: _constants.default.USER_TYPE_TENANT_USER,
      })
      adds.push({
        tag_key: '_originalWebchatId',
        tag_value: yyyymm + '_' + conf_id,
        tag_type: '_relationOrigin',
        permission: _constants.default.USER_TYPE_TENANT_USER,
      })
    }
    _this11.ucUiStore.getChatClient().updateTag(
      {
        attached_type: 'conf',
        attached_id: conf_id,
        yyyymm: yyyymm,
        adds: adds,
        removes: [],
      },
      function (ev) {
        if (!ev.warnings) {
          if (!invitesSoon) {
            var panelCode = (0, _strings.string)(
              _this11.ucUiStore.getChatCodeByConfId({
                conf_id: conf_id,
              }).chatCode,
            )
            // store selected reply type
            _this11.ucUiAction.selectReplyType({
              chatType: 'CONFERENCE',
              chatCode: panelCode,
              replyType: replyType,
              nextDistributionType: '0',
              nextDistributionTarget: profile.user_id,
            })

            // show conference panel
            _this11.updateTab({
              open: {
                panelType: 'CONFERENCE',
                panelCode: panelCode,
              },
              select: {
                panelType: 'CONFERENCE',
                panelCode: (0, _strings.string)(
                  _this11.ucUiStore.getChatCodeByConfId({
                    conf_id: conf_id,
                  }).chatCode,
                ),
              },
            })
          }
          if (replyType === '' || invitesSoon) {
            // publish continuation code
            var continuation_code = _this11.ucUiStore
              .getChatClient()
              .publishContinuationCode({
                yyyymm: yyyymm,
                conf_id: conf_id,
              })
            _this11.ucUiStore
              .getLogger()
              .log('debug', 'published continuation_code=' + continuation_code)
            if (replyType === '') {
              // show continuation code
              _this11.showModal({
                title:
                  _uawmsgs.default.MSG_REPLY_MANUAL_CONTINUATION_DIALOG_TITLE,
                message:
                  '<input type="text" value="' +
                  continuation_code +
                  '" class="brTextBox brReplyReentryCode" readonly onfocus="this.select();" />',
                asHTML: true,
              })
              resolve({})
            } else {
              // invite guest
              _this11.ucUiStore.getChatClient().inviteGuest(
                {
                  conf_id: conf_id,
                  yyyymm: yyyymm,
                  selected_reply_type: replyType,
                  continuation_code: continuation_code,
                  optional_ev: {
                    agent_operation: 'reply',
                  },
                },
                function (ev) {
                  resolve({})
                },
                function (ev) {
                  _this11.ucUiStore
                    .getLogger()
                    .log(
                      'warn',
                      'chatClient.inviteGuest error code=' +
                        ev.code +
                        ', message=' +
                        ev.message,
                    )
                  _this11.showModal({
                    title: _uawmsgs.default.CMN_ALERT,
                    message:
                      'Failed to reply.' +
                      '\n(' +
                      ev.code +
                      ' ' +
                      ev.message +
                      ')',
                  })
                  reject(
                    new Error(
                      'chatClient.inviteGuest error code=' +
                        ev.code +
                        ', message=' +
                        ev.message,
                    ),
                  )
                },
              )
            }
          } else {
            resolve({})
          }
        } else {
          // updateTag partially failed
          _this11.ucUiStore
            .getLogger()
            .log('warn', 'updateTag partially failed. ' + ev.warnings)
          _this11.showModal({
            title: _uawmsgs.default.CMN_ALERT,
            message:
              'Failed to reply.' +
              '\n(' +
              ((0, _strings.string)(ev.warnings).indexOf(
                'Cannot overwrite until ',
              ) !== -1
                ? 'Being replied by another user'
                : ev.warnings) +
              ')',
          })
          reject(new Error('updateTag partially failed. ' + ev.warnings))
        }
      },
      function (ev) {
        // updateTag totally failed
        _this11.ucUiStore
          .getLogger()
          .log(
            'warn',
            'updateTag totally failed. code=' +
              ev.code +
              ', message=' +
              ev.message,
          )
        _this11.showModal({
          title: _uawmsgs.default.CMN_ALERT,
          message:
            'Failed to reply.' + '\n(' + ev.code + ' ' + ev.message + ')',
        })
        reject(
          new Error(
            'updateTag totally failed. code=' +
              ev.code +
              ', message=' +
              ev.message,
          ),
        )
      },
    )
  })
}

// events from ui
uiData.prototype.window_onfocus = function () {
  Object.keys(this.showingNotificationTable).forEach(function (notificationId) {
    Brekeke.WebNotification.closeNotification({
      notificationId: notificationId,
      reason: 'window_onfocus',
    })
  })
  // animation
  this.startAnimation('controlstatusdisplay', 4000, false)
  var statusMe = this.ucUiStore.getChatClient().getStatus()
  if (
    statusMe.status !== _constants.default.STATUS_AVAILABLE ||
    statusMe.display
  ) {
    this.startAnimation('statusbar', 4000, false)
  }
}
uiData.prototype.window_onclick = function () {
  if (+new Date() > this.dialogResizeStopTime + 100) {
    // ignore click event immediately after resize
    this.closeAllshowingDialogs()
  }
  Object.keys(this.showingNotificationTable).forEach(function (notificationId) {
    Brekeke.WebNotification.closeNotification({
      notificationId: notificationId,
      reason: 'window_onclick',
    })
  })
  this.render()
}
uiData.prototype.window_onblur = function () {
  this.closeAllshowingDialogs()
  this.render()
}
uiData.prototype.window_onresize = function () {
  this.render()
}
uiData.prototype.window_onunload = function () {
  if (
    this.lastLampObject &&
    this.lastLampObject.lampTypeOptions &&
    this.lastLampObject.lampTypeOptions.lampPort
  ) {
    this.changeLampBusylight({}) // turn off busylight
  }
  if (this.phone) {
    this.phone.stopWebRTC(true)
  }
}
uiData.prototype.showingDialog_update = function () {
  this.render()
}
uiData.prototype.widgetBody_onClick = function (ev) {}
uiData.prototype.modalOk_onClick = function (content, ev) {
  if (this.modalInfo && this.modalInfo.onOk) {
    var ev2 = {
      content: content,
      closes: true,
      modalInfo: this.modalInfo,
    }
    this.modalInfo.onOk(ev2)
    if (!ev2.closes) {
      return
    }
  }
  this.modalInfo = null
  this.render()
}
uiData.prototype.modalCancel_onClick = function (content, ev) {
  if (this.modalInfo && this.modalInfo.onCancel) {
    var ev2 = {
      content: content,
      closes: true,
      modalInfo: this.modalInfo,
    }
    this.modalInfo.onCancel(ev2)
    if (!ev2.closes) {
      return
    }
  }
  this.modalInfo = null
  this.render()
}
uiData.prototype.modalThirdButton_onClick = function (content, ev) {
  if (this.modalInfo && this.modalInfo.onThirdButton) {
    var ev2 = {
      content: content,
      closes: true,
      modalInfo: this.modalInfo,
    }
    this.modalInfo.onThirdButton(ev2)
    if (!ev2.closes) {
      return
    }
  }
  this.modalInfo = null
  this.render()
}
uiData.prototype.sidebarBuddylistFilterOnlineOnlyCheckBox_onClick = function (
  ev,
) {
  this.ucUiAction.setLocalStoragePreference({
    keyValueList: [
      {
        key: 'onlineOnly',
        value: this.ucUiStore.getLocalStoragePreference({
          keyList: ['onlineOnly'],
        })[0]
          ? ''
          : 'true',
      },
    ],
  })
  this.render()
}
uiData.prototype.sidebarBuddylistGroupTitle_onClick = function (groupName, ev) {
  if (!groupName) {
    return
  }
  var buddylistOpenList = this.ucUiStore
    .getLocalStoragePreference({
      keyList: ['buddylistOpenList'],
    })[0]
    .split(',')
  var i = buddylistOpenList.indexOf(groupName)
  if (i !== -1) {
    buddylistOpenList.splice(i, 1)
  } else {
    buddylistOpenList.push(groupName)
  }
  this.ucUiAction.setLocalStoragePreference({
    keyValueList: [
      {
        key: 'buddylistOpenList',
        value: buddylistOpenList.join(','),
      },
    ],
  })
  this.render()
}
uiData.prototype.sidebarBuddylistItem_onClick = function (buddy, ev) {
  var panelType = 'CHAT'
  var panelCode = JSON.stringify({
    tenant: buddy.tenant,
    user_id: buddy.user_id,
  })
  this.updateTab({
    open: {
      panelType: panelType,
      panelCode: panelCode,
    },
    select: {
      panelType: panelType,
      panelCode: panelCode,
    },
  })
}
uiData.prototype.sidebarBuddylistDndable_onDrop = function (
  dropTargetInfo,
  ev,
) {
  if (!dropTargetInfo || !ev || !ev.dragSourceInfo) {
    this.ucUiStore
      .getLogger()
      .log('warn', 'invalid dragSourceInfo, dropTargetInfo')
    return
  }
  var configProperties = this.ucUiStore.getConfigProperties()
  if (configProperties.buddy_mode === _constants.default.BUDDY_MODE_AUTO) {
    this.ucUiStore.getLogger().log('warn', 'invalid buddy_mode')
    return
  }
  // parameters
  var dragSourceInfoType = ev.dragSourceInfo.dragSourceInfoType
  var dragSourceInfoCode = ev.dragSourceInfo.dragSourceInfoCode
  var dropTargetInfoType = dropTargetInfo.dropTargetInfoType
  var dropTargetInfoCode = dropTargetInfo.dropTargetInfoCode

  // get buddylist
  var buddylist = this.ucUiStore.getChatClient().getBuddylist()
  var buddies = buddylist.user
  if (!buddies || !buddies.length) {
    this.ucUiStore
      .getLogger()
      .log(
        'warn',
        'this.ucUiStore.getChatClient().getBuddylist().user is empty',
      )
    return
  }

  // get sourceBuddy, targetBuddy
  var sourceIndex = -1
  var sourceBuddy = null
  var targetIndex = -1
  var targetBuddy = null
  var sourcePredicate = null
  if (dragSourceInfoType === 'buddylistItem') {
    try {
      var dragSourceInfoCodeObject = JSON.parse(dragSourceInfoCode) || {}
      sourcePredicate = function sourcePredicate(buddy) {
        return (
          buddy &&
          buddy.user_id &&
          buddy.tenant === dragSourceInfoCodeObject.tenant &&
          buddy.user_id === dragSourceInfoCodeObject.user_id
        )
      }
    } catch (ex) {}
  } else if (dragSourceInfoType === 'buddylistGroupTitle') {
    sourcePredicate = function sourcePredicate(buddy) {
      return buddy && buddy.id && buddy.id === dragSourceInfoCode
    }
  }
  var targetPredicate = null
  if (dropTargetInfoType === 'buddylistItem') {
    try {
      var dropTargetInfoCodeObject = JSON.parse(dropTargetInfoCode) || {}
      targetPredicate = function targetPredicate(buddy) {
        return (
          buddy &&
          buddy.user_id &&
          buddy.tenant === dropTargetInfoCodeObject.tenant &&
          buddy.user_id === dropTargetInfoCodeObject.user_id
        )
      }
    } catch (ex) {}
  } else if (dropTargetInfoType === 'buddylistGroupTitle') {
    targetPredicate = function targetPredicate(buddy) {
      return buddy && buddy.id && buddy.id === dropTargetInfoCode
    }
  }
  buddies.forEach(function (buddy, index) {
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
    this.ucUiStore.getLogger().log('warn', 'sourceBuddy not found')
    return
  }
  targetBuddy = buddies[targetIndex]
  if (!targetBuddy) {
    if (
      dragSourceInfoType === 'buddylistItem' &&
      dropTargetInfoType === 'buddylistGroupTitle'
    ) {
      targetBuddy = {
        id: '',
      } // root group
    } else {
      this.ucUiStore.getLogger().log('warn', 'targetBuddy not found')
      return
    }
  }

  // edit buddylist
  if (
    (dragSourceInfoType === 'buddylistItem' &&
      dropTargetInfoType === 'buddylistItem') ||
    (dragSourceInfoType === 'buddylistGroupTitle' &&
      dropTargetInfoType === 'buddylistGroupTitle')
  ) {
    if (sourceIndex < targetIndex) {
      // drag downward
      var newTargetIndex = targetIndex - 1 // after remove source
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
    dragSourceInfoType === 'buddylistItem' &&
    dropTargetInfoType === 'buddylistGroupTitle'
  ) {
    // move sourceBuddy to the last child of targetBuddy
    buddylist.user.push(buddylist.user.splice(sourceIndex, 1)[0])
    sourceBuddy.group = targetBuddy.id
  }

  // save buddylist
  this.ucUiStore
    .getChatClient()
    .saveProperties(
      null,
      null,
      buddylist,
      this.ucUiAction.refreshBuddyTable.bind(this.ucUiAction),
      null,
    )
}
uiData.prototype.sidebarBuddylistGroupRemoveDndable_onDrop = function (ev) {
  if (
    !ev ||
    !ev.dragSourceInfo ||
    ev.dragSourceInfo.dragSourceInfoType !== 'buddylistGroupTitle' ||
    !ev.dragSourceInfo.dragSourceInfoCode
  ) {
    this.ucUiStore.getLogger().log('warn', 'invalid dragSourceInfo')
    return
  }
  var configProperties = this.ucUiStore.getConfigProperties()
  if (configProperties.buddy_mode === _constants.default.BUDDY_MODE_AUTO) {
    this.ucUiStore.getLogger().log('warn', 'invalid buddy_mode')
    return
  }
  var id = (0, _strings.string)(ev.dragSourceInfo.dragSourceInfoCode)

  // get buddylist
  var buddylist = this.ucUiStore.getChatClient().getBuddylist()
  if (!buddylist || !buddylist.user || !buddylist.user.length) {
    this.ucUiStore
      .getLogger()
      .log(
        'warn',
        'this.ucUiStore.getChatClient().getBuddylist().user is empty',
      )
    return
  }

  // edit buddylist
  for (var i = buddylist.user.length - 1; i >= 0; i--) {
    if (buddylist.user[i].id === id) {
      buddylist.user.splice(i, 1)
    } else if (buddylist.user[i].group === id) {
      buddylist.user[i].group = ''
    }
  }

  // save buddylist
  this.showModal({
    title: _uawmsgs.default.MSG_REMOVE_GROUP_CONFIRM_TITLE,
    message: _uawmsgs.default.MSG_REMOVE_GROUP_CONFIRM,
    cancelable: true,
    onOk: this.ucUiStore
      .getChatClient()
      .saveProperties.bind(
        this.ucUiStore.getChatClient(),
        null,
        null,
        buddylist,
        this.ucUiAction.refreshBuddyTable.bind(this.ucUiAction),
        null,
      ),
  })
}
uiData.prototype.sidebarControlProfile_onMouseEnter = function (ev) {
  // animation
  this.startAnimation('controlstatusdisplay', 4000, false)
}
uiData.prototype.sidebarEditStatusDisplayButton_onClick = function (ev) {
  var _this12 = this
  this.closeAllshowingDialogs()
  this.showModal({
    title: _uawmsgs.default.MSG_STATUS_DISPLAY_DIALOG_TITLE,
    contentClass: 'StatusDisplayForm',
    cancelable: true,
    onOk: function onOk(ev) {
      var display = (0, _strings.string)(
        ev && ev.content && ev.content.state && ev.content.state.inputValue,
      )
      // change
      _this12.ucUiAction.changeStatus({
        display: display,
      })
      // add to history
      if (display) {
        var MENU_ITEM_STATUS_DISPLAY_LENGTH = 10
        var settings = _this12.ucUiStore.getChatClient().getSettings()
        if (!settings.optional_settings) {
          settings.optional_settings = {}
        }
        if (!settings.optional_settings.status_display_history) {
          settings.optional_settings.status_display_history = []
        }
        var index =
          settings.optional_settings.status_display_history.indexOf(display)
        if (index !== 0) {
          if (index >= 1) {
            // bring to top
            settings.optional_settings.status_display_history.splice(index, 1)
          }
          settings.optional_settings.status_display_history.unshift(display)
          while (
            settings.optional_settings.status_display_history.length >
            MENU_ITEM_STATUS_DISPLAY_LENGTH
          ) {
            // remove oldest one
            settings.optional_settings.status_display_history.pop()
          }
          _this12.ucUiStore
            .getChatClient()
            .saveProperties(null, settings, null, null, null)
        }
      }
      // animation
      _this12.startAnimation('controlstatusdisplay', 4000, true)
    },
  })
}
uiData.prototype.statusDisplayUseLaterButton_onClick = function (display, ev) {
  // add to history
  if (!display) {
    return
  }
  var MENU_ITEM_STATUS_DISPLAY_LENGTH = 10
  var settings = this.ucUiStore.getChatClient().getSettings()
  if (!settings.optional_settings) {
    settings.optional_settings = {}
  }
  if (!settings.optional_settings.status_display_history) {
    settings.optional_settings.status_display_history = []
  }
  var index = settings.optional_settings.status_display_history.indexOf(display)
  if (index !== 0) {
    if (index >= 1) {
      // bring to top
      settings.optional_settings.status_display_history.splice(index, 1)
    }
    settings.optional_settings.status_display_history.unshift(display)
    while (
      settings.optional_settings.status_display_history.length >
      MENU_ITEM_STATUS_DISPLAY_LENGTH
    ) {
      // remove oldest one
      settings.optional_settings.status_display_history.pop()
    }
    this.ucUiStore
      .getChatClient()
      .saveProperties(null, settings, null, this.render.bind(this), null)
  }
}
uiData.prototype.statusDisplayItemDeleteButton_onClick = function (
  display,
  ev,
) {
  // remove from history
  if (!display) {
    return
  }
  var settings = this.ucUiStore.getChatClient().getSettings()
  if (
    !settings.optional_settings ||
    !settings.optional_settings.status_display_history
  ) {
    return
  }
  var index = settings.optional_settings.status_display_history.indexOf(display)
  if (index === -1) {
    return
  }
  settings.optional_settings.status_display_history.splice(index, 1)
  this.ucUiStore
    .getChatClient()
    .saveProperties(null, settings, null, this.render.bind(this), null)
}
uiData.prototype.sidebarControlProfileStatusItem_onClick = function (
  status,
  ev,
) {
  this.ucUiAction.changeStatus({
    status: status,
    display: '',
  })
}
uiData.prototype.sidebarPreferenceButton_onClick = function (ev) {
  var panelType = 'PREFERENCE'
  var panelCode = 'static'
  if (!this.preferenceWorkTable[panelCode]) {
    // if not opened
    // load preference
    if (this.ucUiStore.getSignInStatus() !== 3) {
      this.showModal({
        title: _uawmsgs.default.CMN_ALERT,
        message: _uawmsgs.default.MSG_PREFERENCE_LOAD_FAILED,
      })
      return
    }
    var profile = this.ucUiStore.getChatClient().getProfile()
    var settings = this.ucUiStore.getChatClient().getSettings()
    var configProperties = this.ucUiStore.getConfigProperties()
    var userMe = this.ucUiStore.getBuddyUserForUi(profile)
    this.preferenceWorkTable[panelCode] = {}
    this.preferenceWorkTable[panelCode].initialStatus = settings.initial_status
    this.preferenceWorkTable[panelCode].statusOptionsEnabled = Boolean(
      this.ucUiStore.getOptionalSetting({
        key: 'status_options_enabled',
      }),
    )
    this.preferenceWorkTable[panelCode].statusOptionsEnabledLocked = Boolean(
      configProperties.optional_config &&
        configProperties.optional_config.status_options_enabled_locked,
    )
    this.preferenceWorkTable[panelCode].statusOptions =
      this.ucUiStore.getOptionalSetting({
        key: 'status_options',
      }) || []
    this.preferenceWorkTable[panelCode].profileImageUrl =
      userMe.profile_image_url
    this.preferenceWorkTable[panelCode].profileImageUploading = false
    this.preferenceWorkTable[panelCode].profileImageTo = ''
    if (
      (0, _strings.string)(
        configProperties.optional_config &&
          configProperties.optional_config.language_setting,
      ) === 'user'
    ) {
      this.preferenceWorkTable[panelCode].userLanguage = (0, _strings.string)(
        settings.optional_settings && settings.optional_settings.user_language,
      )
      this.preferenceWorkTable[panelCode].languageDisabled = false
    } else {
      this.preferenceWorkTable[panelCode].userLanguage = (0, _strings.string)(
        configProperties.optional_config &&
          configProperties.optional_config.language_setting,
      )
      this.preferenceWorkTable[panelCode].languageDisabled = true
    }
    this.preferenceWorkTable[panelCode].validLanguages =
      (configProperties.optional_config &&
        configProperties.optional_config.valid_languages &&
        (0, _strings.string)(
          configProperties.optional_config.valid_languages,
        ).split(',')) ||
      []
    this.preferenceWorkTable[panelCode].loginPasswordPlaceholder = '**********'
    this.preferenceWorkTable[panelCode].loginPassword =
      this.preferenceWorkTable[panelCode].loginPasswordPlaceholder
    this.preferenceWorkTable[panelCode].loginPasswordConfirm =
      this.preferenceWorkTable[panelCode].loginPasswordPlaceholder
    this.preferenceWorkTable[panelCode].loginPasswordLocked = !new RegExp(
      this.configurations.loginPasswordEnabledTenant || '^$',
    ).test(profile.tenant)
    this.preferenceWorkTable[panelCode].displayName = (0, _strings.string)(
      this.ucUiStore.getOptionalSetting({
        key: 'display_name',
      }),
    )
    this.preferenceWorkTable[panelCode].displayNameLocked = Boolean(
      configProperties.optional_config &&
        configProperties.optional_config.display_name_locked,
    )
    if ((0, _strings.string)(configProperties.webchat_enabled) !== 'true') {
      this.preferenceWorkTable[panelCode].displayNameLocked = true
    }
    this.preferenceWorkTable[panelCode].sendingConfirmation = Boolean(
      this.ucUiStore.getOptionalSetting({
        key: 'sending_confirmation',
      }),
    )
    this.preferenceWorkTable[panelCode].sendingConfirmationLocked = Boolean(
      configProperties.optional_config &&
        configProperties.optional_config.sending_confirmation_locked,
    )
    this.preferenceWorkTable[panelCode].nameDisplayMode = (0, _strings.int)(
      this.ucUiStore.getOptionalSetting({
        key: 'name_display_mode',
      }),
    )
    this.preferenceWorkTable[panelCode].nameDisplayModeLocked = Boolean(
      configProperties.optional_config &&
        configProperties.optional_config.name_display_mode_locked,
    )
    this.preferenceWorkTable[panelCode].notifyCallStatus = Boolean(
      this.ucUiStore.getOptionalSetting({
        key: 'notify_call_status',
      }),
    )
    this.preferenceWorkTable[panelCode].notifyCallStatusLocked = Boolean(
      configProperties.optional_config &&
        configProperties.optional_config.notify_call_status_locked,
    )
    this.preferenceWorkTable[panelCode].notifyConfStatus = Boolean(
      this.ucUiStore.getOptionalSetting({
        key: 'notify_conf_status',
      }),
    )
    this.preferenceWorkTable[panelCode].notifyConfStatusLocked = Boolean(
      configProperties.optional_config &&
        configProperties.optional_config.notify_conf_status_locked,
    )
    this.preferenceWorkTable[panelCode].dtmfShortcut = (0, _strings.int)(
      this.ucUiStore.getOptionalSetting({
        key: 'dtmf_shortcut',
      }),
    )
    this.preferenceWorkTable[panelCode].dtmfShortcutLocked = Boolean(
      configProperties.optional_config &&
        configProperties.optional_config.dtmf_shortcut_locked,
    )
    this.preferenceWorkTable[panelCode].displayPeriod =
      (0, _strings.int)(
        this.ucUiStore.getOptionalSetting({
          key: 'display_period',
        }),
      ) || 15
    this.preferenceWorkTable[panelCode].displayPeriodLocked = Boolean(
      configProperties.optional_config &&
        configProperties.optional_config.display_period_locked,
    )
    this.preferenceWorkTable[panelCode].chatBgColor = (0, _strings.string)(
      this.ucUiStore.getOptionalSetting({
        key: 'chat_bg_color',
      }),
    )
    this.preferenceWorkTable[panelCode].chatBgColorLocked = Boolean(
      configProperties.optional_config &&
        configProperties.optional_config.chat_bg_color_locked,
    )
    this.preferenceWorkTable[panelCode].chatBgColorBk = (0, _strings.string)(
      this.ucUiStore.getOptionalSetting({
        key: 'chat_bg_color_bk',
      }),
    )
    this.preferenceWorkTable[panelCode].dbgopt = (0, _strings.string)(
      (0, _strings.int)(
        this.ucUiStore.getOptionalSetting({
          key: 'dbgopt',
        }),
      ) || '',
    )
    this.preferenceWorkTable[panelCode].dbgoptLocked = Boolean(
      configProperties.optional_config &&
        configProperties.optional_config.dbgopt_locked,
    )
    this.preferenceWorkTable[panelCode].autoSignIn = Boolean(
      this.ucUiStore.getLocalStoragePreference({
        keyList: ['autoSignIn'],
      })[0],
    )
    this.preferenceWorkTable[panelCode].webRTCDisabled = Boolean(
      this.ucUiStore.getLocalStoragePreference({
        keyList: ['webRTCDisabled'],
      })[0],
    )
    this.preferenceWorkTable[panelCode].tenantWebRTCTypeName = (0,
    _strings.string)(
      this.ucUiStore.getOptionalSetting({
        key: 'webrtc_type_name',
      }),
    )
    this.preferenceWorkTable[panelCode].tenantWebRTCTypeNameLocked = Boolean(
      configProperties.optional_config &&
        configProperties.optional_config.webrtc_type_name_locked,
    )
    this.preferenceWorkTable[panelCode].webRTCTypeName = (0, _strings.string)(
      this.ucUiStore.getLocalStoragePreference({
        keyList: ['webRTCTypeName'],
      })[0],
    )
    this.preferenceWorkTable[panelCode].webRTCTypes = this.getWebRTCTypes()
    this.preferenceWorkTable[panelCode].noVideoMode = (0, _strings.string)(
      this.ucUiStore.getLocalStoragePreference({
        keyList: ['noVideoMode'],
      })[0],
    )
    this.preferenceWorkTable[panelCode].audioSource = (0, _strings.string)(
      this.ucUiStore.getLocalStoragePreference({
        keyList: ['audioSource'],
      })[0],
    )
    this.preferenceWorkTable[panelCode].audioTarget = (0, _strings.string)(
      this.ucUiStore.getLocalStoragePreference({
        keyList: ['audioTarget'],
      })[0],
    )
    this.preferenceWorkTable[panelCode].videoSource = (0, _strings.string)(
      this.ucUiStore.getLocalStoragePreference({
        keyList: ['videoSource'],
      })[0],
    )
    this.preferenceWorkTable[panelCode].lampTypeName = (0, _strings.string)(
      this.ucUiStore.getLocalStoragePreference({
        keyList: ['lampTypeName'],
      })[0],
    )
    this.preferenceWorkTable[panelCode].lampTypes = this.getlampTypes()
    this.preferenceWorkTable[panelCode].bellAudioTarget = (0, _strings.string)(
      this.ucUiStore.getLocalStoragePreference({
        keyList: ['bellAudioTarget'],
      })[0],
    )
  }
  this.updateTab({
    open: {
      panelType: panelType,
      panelCode: panelCode,
    },
    select: {
      panelType: panelType,
      panelCode: panelCode,
    },
  })
}
uiData.prototype.sidebarHistoryButton_onClick = function (ev) {
  var panelType = 'HISTORYSUMMARIES'
  var panelCode = (0, _strings.string)(++this.panelCodeCounter)
  this.ucUiAction.setSearchConditions({
    chatType: panelType,
    chatCode: panelCode,
    searchConditions: [
      {
        conditionKey: '_onlyMe',
        conditionValue: '2',
      },
    ],
  })
  this.ucUiAction.doSearch({
    chatType: panelType,
    chatCode: panelCode,
    emphasize: true,
  })
  this.updateTab({
    open: {
      panelType: panelType,
      panelCode: panelCode,
    },
    select: {
      panelType: panelType,
      panelCode: panelCode,
    },
  })
}
uiData.prototype.sidebarWebchatRequestsButton_onClick = function (ev) {
  var panelType = 'WEBCHATQUEUE'
  var panelCode = 'static'
  this.updateTab({
    open: {
      panelType: panelType,
      panelCode: panelCode,
    },
    select: {
      panelType: panelType,
      panelCode: panelCode,
    },
  })
}
uiData.prototype.sidebarServerPropertiesButton_onClick = function (ev) {}
uiData.prototype.sidebarAboutButton_onClick = function (ev) {
  this.showModal({
    title: (0, _strings.formatStr)(
      _uawmsgs.default.MSG_ABOUT_DIALOG_TITLE,
      this.configurations.productName || 'UC',
    ),
    message: this.configurations.licenseInfo,
    asHTML: true,
  })
}
uiData.prototype.sidebarCreateConferenceButton_onClick = function (ev) {
  var _this13 = this
  this.showModal({
    title: _uawmsgs.default.MSG_CREATE_CONFERENCE_DIALOG_TITLE,
    contentClass: 'ConferenceInviteForm',
    cancelable: true,
    onOk: function onOk(ev) {
      if (
        ev &&
        ev.content &&
        ev.content.state &&
        ev.content.state.subject &&
        ev.content.state.selectedBuddyTable
      ) {
        _this13.ucUiStore
          .getLogger()
          .log('debug', 'ev.content.state=' + JSON.stringify(ev.content.state))
        var invite = []
        Object.keys(ev.content.state.selectedBuddyTable).forEach(
          function (tenant) {
            if (ev.content.state.selectedBuddyTable[tenant]) {
              Object.keys(ev.content.state.selectedBuddyTable[tenant]).forEach(
                function (user_id) {
                  if (ev.content.state.selectedBuddyTable[tenant][user_id]) {
                    if (
                      _this13.ucUiStore.getChatClient().getBuddyStatus({
                        tenant: tenant,
                        user_id: user_id,
                      }).status !== _constants.default.STATUS_OFFLINE
                    ) {
                      invite.push({
                        tenant: tenant,
                        user_id: user_id,
                      })
                    }
                  }
                },
              )
            }
          },
        )
        // createConference after dialog closed
        setTimeout(
          _this13.ucUiAction.createConference.bind(_this13.ucUiAction, {
            subject: ev.content.state.subject,
            invite: invite,
          }),
          0,
        )
      } else if (ev) {
        ev.closes = false
      }
    },
  })
}
uiData.prototype.sidebarSendBroadcastTextButton_onClick = function (ev) {
  var _this14 = this
  this.showModal({
    title: _uawmsgs.default.MSG_SEND_BROADCAST_TEXT_DIALOG_TITLE,
    contentClass: 'BroadcastForm',
    cancelable: true,
    onOk: function onOk(ev) {
      if (
        ev &&
        ev.content &&
        ev.content.state &&
        ev.content.state.text &&
        ev.content.state.selectedBuddyTable
      ) {
        var target = []
        Object.keys(ev.content.state.selectedBuddyTable).forEach(
          function (tenant) {
            if (ev.content.state.selectedBuddyTable[tenant]) {
              Object.keys(ev.content.state.selectedBuddyTable[tenant]).forEach(
                function (user_id) {
                  if (ev.content.state.selectedBuddyTable[tenant][user_id]) {
                    target.push({
                      tenant: tenant,
                      user_id: user_id,
                    })
                  }
                },
              )
            }
          },
        )
        if (target.length) {
          // sendBroadcastText after dialog closed
          setTimeout(
            _this14.ucUiAction.sendBroadcastText.bind(_this14.ucUiAction, {
              target: target,
              text:
                (ev.content.state.broadcastMark
                  ? '<span class="brBroadcastMark br_bi_icon_broadcasting_svg" title="' +
                    _uawmsgs.default.LBL_CHAT_BROADCAST_MARK_TOOLTIP +
                    '"></span>'
                  : '') + (0, _strings.escapeHTML)(ev.content.state.text),
              isRichText: true,
            }),
            0,
          )
        } else {
          ev.closes = false
        }
      } else if (ev) {
        ev.closes = false
      }
    },
  })
}
uiData.prototype.sidebarExternalCallButton_onClick = function (ev) {
  var _this15 = this
  this.showModal({
    title: _uawmsgs.default.MSG_EXTERNAL_CALL_DIALOG_TITLE,
    contentClass: 'ConfirmForm',
    contentParams: {
      placeholder: _uawmsgs.default.MSG_EXTERNAL_CALL_DIALOG_PLACEHOLDER,
      autoCapitalize: 'off',
    },
    cancelable: true,
    thirdButton: true,
    cancelByThirdButton: true,
    okCaption: _uawmsgs.default.LBL_EXTERNAL_CALL_DIALOG_OPEN,
    cancelCaption: _uawmsgs.default.LBL_EXTERNAL_CALL_DIALOG_CALL,
    thirdButtonCaption: _uawmsgs.default.CMN_CANCEL,
    cancelClassName: 'brVivid',
    onOk: function onOk(ev) {
      var text = (0, _strings.string)(
        ev && ev.content && ev.content.state && ev.content.state.text,
      )
      if (text) {
        var panelCode = text.replace(/[\(\)-]/g, '')
        if (panelCode !== text) {
          if (!_this15.externalCallWorkTable[panelCode]) {
            _this15.externalCallWorkTable[panelCode] = {}
          }
          _this15.externalCallWorkTable[panelCode].display_name = text
        }
        _this15.ucUiStore
          .getLogger()
          .log('debug', 'open EXTERNALCALL call=false text=' + text)
        _this15.updateTab({
          open: {
            panelType: 'EXTERNALCALL',
            panelCode: panelCode,
          },
          select: {
            panelType: 'EXTERNALCALL',
            panelCode: panelCode,
          },
        })
      } else if (ev) {
        ev.closes = false
      }
    },
    onCancel: function onCancel(ev) {
      var text = (0, _strings.string)(
        ev && ev.content && ev.content.state && ev.content.state.text,
      )
      if (text) {
        var panelCode = text.replace(/[\(\)-]/g, '')
        if (panelCode !== text) {
          if (!_this15.externalCallWorkTable[panelCode]) {
            _this15.externalCallWorkTable[panelCode] = {}
          }
          _this15.externalCallWorkTable[panelCode].display_name = text
        }
        _this15.ucUiStore
          .getLogger()
          .log('debug', 'open EXTERNALCALL call=true text=' + text)
        _this15.updateTab({
          open: {
            panelType: 'EXTERNALCALL',
            panelCode: panelCode,
          },
          select: {
            panelType: 'EXTERNALCALL',
            panelCode: panelCode,
          },
        })
        _this15.makeCall('EXTERNALCALL', panelCode, false, false)
      } else if (ev) {
        ev.closes = false
      }
    },
  })
}
uiData.prototype.sidebarOutgoingWebchatButton_onClick = function (ev) {
  var _this16 = this
  var configProperties = this.ucUiStore.getConfigProperties()
  var contentParams = {
    replyTypes: [],
    webchatServiceIds: {},
  }
  ;(
    (configProperties.optional_config &&
      configProperties.optional_config.awsl) ||
    []
  ).forEach(function (aws) {
    if (!aws.og || aws.og.disabled || !aws.senders) {
      return
    }
    ;(aws.og.reply_types || []).forEach(function (replyType) {
      if (contentParams.replyTypes.indexOf(replyType) === -1) {
        contentParams.replyTypes.push(replyType)
      }
      if (!contentParams.webchatServiceIds[replyType]) {
        contentParams.webchatServiceIds[replyType] = []
      }
      contentParams.webchatServiceIds[replyType].push(aws.id)
    })
  })
  this.ucUiStore
    .getLogger()
    .log(
      'debug',
      'OutgoingWebchatForm contentParams=' + JSON.stringify(contentParams),
    )
  if (!contentParams.replyTypes.length) {
    this.showModal({
      title: _uawmsgs.default.CMN_ALERT,
      message: 'Failed to load the webchat service list.',
    })
    return
  }
  this.showModal({
    title: _uawmsgs.default.MSG_OUTGOING_WEBCHAT_DIALOG_TITLE,
    contentClass: 'OutgoingWebchatForm',
    contentParams: contentParams,
    cancelable: true,
    okCaption: _uawmsgs.default.LBL_OUTGOING_WEBCHAT_DIALOG_OPEN,
    onOk: function onOk(ev) {
      _this16.ucUiStore
        .getLogger()
        .log(
          'debug',
          'OutgoingWebchatForm onOk state=' +
            JSON.stringify(ev && ev.content && ev.content.state),
        )
      if (
        !ev ||
        !ev.content ||
        !ev.content.state ||
        !ev.content.state.serviceId
      ) {
        _this16.showModal({
          title: _uawmsgs.default.CMN_ALERT,
          message: 'Empty serviceId.',
        })
        return
      }
      var replyType = (0, _strings.string)(ev.content.state.replyType)
      var serviceId = (0, _strings.string)(ev.content.state.serviceId)
      var text = (0, _strings.string)(ev.content.state.text)
      var isEmail = replyType.toUpperCase() === 'EMAIL'
      var email = isEmail ? text : ''
      var guest_address = text
      var outgoingId = 'uiData' + Date.now()
      _this16.ucUiStore.getChatClient().createOutgoingWebchat(
        {
          replyType: replyType,
          email: email,
          outgoingId: outgoingId,
        },
        function (ev) {
          var replyType = ev.replyType
          var conf_id = ev.conf_id
          var yyyymm = ev.yyyymm

          // publish continuation code
          var continuation_code = _this16.ucUiStore
            .getChatClient()
            .publishContinuationCode({
              yyyymm: yyyymm,
              conf_id: conf_id,
            })
          _this16.ucUiStore
            .getLogger()
            .log('debug', 'published continuation_code=' + continuation_code)

          // memory continuation info
          var outgoingContinuationInfo = {
            conf_id: conf_id,
            yyyymm: yyyymm,
            replyTime: +new Date(),
          }
          _this16.outgoingContinuationInfos.push(outgoingContinuationInfo)
          setTimeout(function () {
            while (
              _this16.outgoingContinuationInfos[0] &&
              _this16.outgoingContinuationInfos[0].replyTime + 60000 <
                +new Date()
            ) {
              var info = _this16.outgoingContinuationInfos.shift()
              _this16._logger.log(
                'warn',
                'outgoing timeout ' + JSON.stringify(info),
              )
            }
          }, 60000 + 1000)
          if (replyType === '') {
            _this16.ucUiStore
              .getLogger()
              .log('warn', 'Empty replyType. (Not implemented)')
            _this16.showModal({
              title: _uawmsgs.default.CMN_ALERT,
              message: 'Empty replyType.',
            })
          } else {
            // invite guest
            var optional_ev = {
              agent_operation: 'create',
              guest_user_name: text,
              guest_user_email: email,
              webchat_service_id: serviceId,
            }
            if (guest_address) {
              optional_ev.guest_address = guest_address
            }
            _this16.ucUiStore.getChatClient().inviteGuest(
              {
                conf_id: conf_id,
                yyyymm: yyyymm,
                selected_reply_type: replyType,
                continuation_code: continuation_code,
                optional_ev: optional_ev,
              },
              function (ev) {},
              function (ev) {
                _this16.ucUiStore
                  .getLogger()
                  .log(
                    'warn',
                    'chatClient.inviteGuest error code=' +
                      ev.code +
                      ', message=' +
                      ev.message,
                  )
                _this16.showModal({
                  title: _uawmsgs.default.CMN_ALERT,
                  message:
                    'chatClient.inviteGuest error code=' +
                    ev.code +
                    ', message=' +
                    ev.message,
                })
              },
            )
          }
        },
        function (ev) {
          _this16.ucUiStore
            .getLogger()
            .log(
              'warn',
              'chatClient.createOutgoingWebchat error code=' +
                ev.code +
                ', message=' +
                ev.message,
            )
          _this16.showModal({
            title: _uawmsgs.default.CMN_ALERT,
            message:
              'chatClient.createOutgoingWebchat error code=' +
              ev.code +
              ', message=' +
              ev.message,
          })
        },
      )
    },
  })
}
uiData.prototype.sidebarCreateGroupButton_onClick = function (ev) {
  var _this17 = this
  var configProperties = this.ucUiStore.getConfigProperties()
  if (configProperties.buddy_mode === _constants.default.BUDDY_MODE_AUTO) {
    this.ucUiStore.getLogger().log('warn', 'invalid buddy_mode')
    return
  }
  this.showModal({
    title: _uawmsgs.default.MSG_CREATE_GROUP_DIALOG_TITLE,
    contentClass: 'ConfirmForm',
    contentParams: {
      placeholder: _uawmsgs.default.MSG_CREATE_GROUP_DIALOG_PLACEHOLDER,
    },
    cancelable: true,
    onOk: function onOk(ev) {
      var id = (0, _strings.string)(
        ev && ev.content && ev.content.state && ev.content.state.text,
      )
      if (id) {
        var buddylist = _this17.ucUiStore.getChatClient().getBuddylist()
        if (
          !buddylist ||
          !buddylist.user ||
          !buddylist.user.some ||
          !buddylist.user.push
        ) {
          _this17.ucUiStore
            .getLogger()
            .log(
              'warn',
              'this.ucUiStore.getChatClient().getBuddylist().user is invalid',
            )
          return
        }
        if (
          buddylist.user.some(function (buddy) {
            return buddy && buddy.id === id
          })
        ) {
          _this17.ucUiStore.getLogger().log('info', 'duplicate group id=' + id)
          return
        }
        buddylist.user.push({
          id: id,
          name: id,
          group: '',
        })
        _this17.ucUiStore
          .getChatClient()
          .saveProperties(
            null,
            null,
            buddylist,
            _this17.ucUiAction.refreshBuddyTable.bind(_this17.ucUiAction),
            null,
          )
      } else if (ev) {
        ev.closes = false
      }
    },
  })
}
uiData.prototype.sidebarUserListButton_onClick = function (ev) {
  var _this18 = this
  var profile = this.ucUiStore.getChatClient().getProfile()
  var configProperties = this.ucUiStore.getConfigProperties()
  var allUsers = this.ucUiStore.getChatClient().getAllUsers()
  var currentBuddylist = this.ucUiStore.getChatClient().getBuddylist()
  var contentParams = {
    buddylist: this.ucUiStore.getChatClient().getBuddylist({
      type: 'saved',
    }),
    buddy_max: (0, _strings.int)(
      this.ucUiStore.getOptionalSetting({
        key: 'buddy_max',
      }),
    ),
  }
  if (
    this.ucUiStore.getSignInStatus() !== 3 ||
    !profile ||
    !allUsers ||
    !allUsers.user ||
    !contentParams.buddylist ||
    !contentParams.buddylist.user
  ) {
    this.showModal({
      title: _uawmsgs.default.CMN_ALERT,
      message: 'Failed to load the user list.',
    })
    return
  }
  allUsers.user.forEach(function (u) {
    var tenant = profile.tenant // u.tenant is undefined
    if (u.disabledBuddy) {
      return
    }
    if (u.user_id === profile.user_id) {
      // except myself
      return
    }
    if (
      contentParams.buddylist.user.find(function (b) {
        return b.tenant === tenant && b.user_id === u.user_id
      })
    ) {
      // already exists
      return
    }
    contentParams.buddylist.user.push({
      user_id: u.user_id,
      tenant: tenant,
      name: u.user_name,
      group:
        configProperties.buddy_mode === _constants.default.BUDDY_MODE_AUTO
          ? u.user_group
          : '',
      delete: !currentBuddylist.user.find(function (b) {
        return b.tenant === tenant && b.user_id === u.user_id
      }),
    })
  })
  contentParams.buddy_mode = configProperties.buddy_mode
  if (configProperties.buddy_mode === _constants.default.BUDDY_MODE_MANUAL) {
    contentParams.buddylist.screened = true
    contentParams.allUsersCheckDisabled = true
    contentParams.allUsersCheckHidden = true
  }
  if (
    contentParams.buddy_max <
    contentParams.buddylist.user.filter(function (buddy) {
      return buddy && buddy.user_id
    }).length
  ) {
    contentParams.buddylist.screened = true
    contentParams.allUsersCheckDisabled = true
  }
  this.showModal({
    title: _uawmsgs.default.MSG_USER_LIST_DIALOG_TITLE,
    contentClass: 'UserListForm',
    contentParams: contentParams,
    cancelable: true,
    onOk: function onOk(ev) {
      var newBuddylist =
        ev && ev.content && ev.content.state && ev.content.state.buddylist
      if (newBuddylist && newBuddylist.user) {
        if (ev.content.state.usedCount <= contentParams.buddy_max) {
          if (!ev.content.state.saveOrder) {
            // do not save edited order (update only buddy.delete: true / false)
            var editedBuddies = newBuddylist.user
            newBuddylist.user = JSON.parse(
              JSON.stringify(contentParams.buddylist.user),
            )
            newBuddylist.user.forEach(function (buddy) {
              if (buddy.user_id) {
                var editedBuddy = editedBuddies.find(function (editedBuddy) {
                  return buddy.user_id === editedBuddy.user_id
                })
                if (editedBuddy) {
                  buddy.delete = editedBuddy.delete
                }
              }
            })
          }
          _this18.ucUiStore.getChatClient().saveProperties(
            null,
            null,
            newBuddylist,
            _this18.ucUiAction.refreshBuddyTable.bind(_this18.ucUiAction),
            _this18.showModal.bind(_this18, {
              title: _uawmsgs.default.CMN_ALERT,
              message: 'Failed to save the user list. (saveProperties)',
            }),
          )
        } else if (ev) {
          ev.closes = false
        }
      } else {
        _this18.showModal({
          title: _uawmsgs.default.CMN_ALERT,
          message: 'Failed to save the user list.',
        })
      }
    },
  })
}
uiData.prototype.sidebarAreaSplitterItem_onClick = function (
  mainAreaSplitters,
  ev,
) {
  var _this19 = this
  this.mainAreaSplitters = mainAreaSplitters
  this.mainPanelList.forEach(function (panel) {
    var key = panel.panelType + '_' + panel.panelCode
    if (!_this19.backgroundTabs[key]) {
      _this19.backgroundTabs[key] = {
        time: Date.now(),
      }
    }
  })
  this.render()
}
uiData.prototype.sidebarSignOutButton_onClick = function (ev) {
  var _this20 = this
  var joinings = this.mainPanelList
    .map(function (panel) {
      if (panel.panelType === 'CONFERENCE') {
        var chatHeaderInfo = _this20.ucUiStore.getChatHeaderInfo({
          chatType: panel.panelType,
          chatCode: panel.panelCode,
        })
        var conf_id = (0, _strings.string)(chatHeaderInfo.conf_id)
        var conference = _this20.ucUiStore
          .getChatClient()
          .getConference(conf_id)
        if (
          conference.conf_status === _constants.default.CONF_STATUS_JOINED &&
          conference.conf_type !== 'webchat'
        ) {
          return conf_id
        }
      }
    })
    .filter(function (p) {
      return p
    })
  var onOk = function onOk() {
    for (var panelCode in _this20.unansweredWebchatsToKick) {
      // delete webchat queue of unanswered webchat for other agents
      _this20.ucUiStore
        .getChatClient()
        .kickOutOfConference(_this20.unansweredWebchatsToKick[panelCode])
    }
    _this20.unansweredWebchatsToKick = {}
    _this20.ucUiAction.signOut()
    _this20.fire('reload', {})
  }
  if (joinings.length) {
    var _onSecondButton = function onSecondButton() {
      // leave conferences with rejoinable: true
      var conf_id = joinings.pop()
      if (conf_id) {
        // recursive
        _this20.ucUiStore.getChatClient().leaveConference(
          {
            conf_id: conf_id,
            rejoinable: true,
          },
          _onSecondButton,
          _onSecondButton,
        )
      } else {
        // sign out
        onOk()
      }
    }
    this.showModal({
      title: _uawmsgs.default.MSG_SIGN_OUT_CONFIRM_TITLE,
      message: _uawmsgs.default.MSG_LEAVE_CONFERENCE_CONFIRM,
      cancelable: true,
      thirdButton: true,
      cancelByThirdButton: true,
      cancelCaption: _uawmsgs.default.LBL_EDITOR_LEAVE_REJOINABLE_BUTTON,
      thirdButtonCaption: _uawmsgs.default.CMN_CANCEL,
      cancelClassName: 'brVivid',
      onOk: onOk,
      onCancel: _onSecondButton,
    })
  } else {
    this.showModal({
      title: _uawmsgs.default.MSG_SIGN_OUT_CONFIRM_TITLE,
      message: _uawmsgs.default.MSG_SIGN_OUT_CONFIRM,
      cancelable: true,
      onOk: onOk,
    })
  }
}
uiData.prototype.messagebarCancelButton_onClick = function (ev) {
  this.ucUiAction.signOut()
}
uiData.prototype.messagebarReloadButton_onClick = function (ev) {
  this.fire('reload', {})
}
uiData.prototype.messagebarRetryButton_onClick = function (ev) {
  var signInOption = this.ucUiStore.getSignInOption()
  var lastStatus = this.ucUiStore.getLastStatus()
  if (lastStatus) {
    signInOption.status = lastStatus.status
    signInOption.display = lastStatus.display
    signInOption.ui_customized_status = lastStatus.ui_customized_status
  }
  signInOption.recvMsgs = true
  signInOption.do_not_start_mfa = true
  this.ucUiAction.signIn(signInOption)
}
uiData.prototype.statusbarCloseButton_onClick = function (ev) {
  this.stopAnimation('statusbar')
}
uiData.prototype.incomingbarPanelLink_onClick = function (
  panelType,
  panelCode,
  ev,
) {
  this.updateTab({
    select: {
      panelType: panelType,
      panelCode: panelCode,
    },
  })
  this.render()
}
uiData.prototype.mainArea_handleSelect = function (panelKey) {
  if (
    this.mainPanelList.some(function (p) {
      return p.panelType + '_' + p.panelCode === panelKey
    })
  ) {
    this.updateTab({
      select: (0, _strings.parsePanelKey)(panelKey),
    })
    this.render()
  }
}
uiData.prototype.tabMenuItem_onClick = function (panelType, panelCode, ev) {
  this.closeAllshowingDialogs()
  this.updateTab({
    select: {
      panelType: panelType,
      panelCode: panelCode,
    },
  })
  this.render()
}
uiData.prototype.tabLinkHideButton_onClick = function (
  panelType,
  panelCode,
  ev,
) {
  this.closeTab({
    panelType: panelType,
    panelCode: panelCode,
    ev: ev,
  })
}
uiData.prototype.closeTab = function (option) {
  var _this21 = this
  var panelType = (0, _strings.string)(option && option.panelType)
  var panelCode = (0, _strings.string)(option && option.panelCode)
  var ev = (option && option.ev) || {}
  var showModal =
    option && option.force === true
      ? function (o) {
          return o.onOk()
        }
      : option && option.force === false
        ? function () {}
        : this.showModal.bind(this)
  var profile = this.ucUiStore.getChatClient().getProfile()
  var funcConfirmClosable = function funcConfirmClosable(funcOnClosableOk) {
    if (_this21.configurations.tabCloseCancelable) {
      var continueEvent = function continueEvent(result) {
        if (result) {
          funcOnClosableOk()
        }
      }
      _this21.fire('tabClosing', {
        panelKey: panelType + '_' + panelCode,
        continueEvent: continueEvent,
      })
    } else {
      funcOnClosableOk()
    }
  }
  var funcClose = function funcClose() {
    _this21.updateTab({
      close: {
        panelType: panelType,
        panelCode: panelCode,
      },
    })
    if (panelType === 'PREFERENCE') {
      _this21.ucUiStore.getChatClient().cancelProfileImage()
      delete _this21.preferenceWorkTable[panelCode]
    } else if (panelType === 'HISTORYSUMMARIES') {
      _this21.ucUiAction.clearSearchResults({
        chatType: panelType,
        chatCode: panelCode,
      })
      _this21.ucUiAction.setSearchConditions({
        chatType: panelType,
        chatCode: panelCode,
        searchConditions: [],
      })
    } else if (panelType === 'HISTORYDETAIL') {
      _this21.ucUiAction.clearChat({
        chatType: panelType,
        chatCode: panelCode,
      })
      delete _this21.historyDetailWorkTable[panelCode]
    } else if (panelType === 'EXTERNALCALL') {
      delete _this21.externalCallWorkTable[panelCode]
    } else if (panelType === 'CHAT') {
      _this21.ucUiAction.clearChat({
        chatType: panelType,
        chatCode: panelCode,
      })
    } else if (panelType === 'CONFERENCE') {
      _this21.ucUiAction.clearChat({
        chatType: panelType,
        chatCode: panelCode,
      })
      if (_this21.unansweredWebchatsToKick[panelCode]) {
        // delete webchat queue of unanswered webchat for other agents
        _this21.ucUiStore
          .getChatClient()
          .kickOutOfConference(_this21.unansweredWebchatsToKick[panelCode])
        delete _this21.unansweredWebchatsToKick[panelCode]
      }
    }
    if (panelType !== 'CHAT') {
      delete _this21.blinkingTabs[panelType + '_' + panelCode]
      delete _this21.unscrolledTabs[panelType + '_' + panelCode]
    }
    if (_this21.panelSessionTable[panelType + '_' + panelCode]) {
      _this21.callHangUpButton_onClick(panelType, panelCode, ev)
    }
  }
  if (panelType === 'CONFERENCE') {
    var chatHeaderInfo = this.ucUiStore.getChatHeaderInfo({
      chatType: panelType,
      chatCode: panelCode,
    })
    var conf_id = (0, _strings.string)(chatHeaderInfo.conf_id)
    var conference = this.ucUiStore.getChatClient().getConference(conf_id)
    var isReplying = chatHeaderInfo.nextDistributionTarget === profile.user_id
    if (conference.conf_status === _constants.default.CONF_STATUS_JOINED) {
      if (conference.conf_type === 'webchat') {
        // confirm modal -> confirm tabClosing event -> leave webchat -> close tab
        showModal({
          title: _uawmsgs.default.MSG_CLOSE_TALKING_WEBCHAT_CONFIRM_TITLE,
          message: _uawmsgs.default.MSG_CLOSE_TALKING_WEBCHAT_CONFIRM,
          cancelable: true,
          onOk: funcConfirmClosable.bind(this, function () {
            _this21.ucUiAction.leaveWebchatRoom({
              conf_id: conf_id,
            })
            _this21.funcOnWebchatLeft[panelCode] = funcClose
          }),
        })
        //if (this.ucUiStore.getWebchatQueue({ conf_id: conf_id }).isTalking || isReplying) {
        //    // confirm modal -> confirm tabClosing event -> kick out -> leave webchat -> close tab
        //    showModal({
        //        title: uawMsgs.MSG_CLOSE_TALKING_WEBCHAT_CONFIRM_TITLE,
        //        message: uawMsgs.MSG_CLOSE_TALKING_WEBCHAT_CONFIRM,
        //        cancelable: true,
        //        onOk: funcConfirmClosable.bind(this, () => {
        //            this.ucUiAction.kickOutOfWebchatRoom({
        //                conf_id: conf_id
        //            });
        //            this.ucUiAction.leaveWebchatRoom({
        //                conf_id: conf_id
        //            });
        //            this.funcOnWebchatLeft[panelCode] = funcClose;
        //        })
        //    });
        //} else {
        //    // confirm tabClosing event -> leave webchat -> close tab
        //    funcConfirmClosable(() => {
        //        this.ucUiAction.leaveWebchatRoom({
        //            conf_id: conf_id
        //        });
        //        this.funcOnWebchatLeft[panelCode] = funcClose;
        //    });
        //}
      } else {
        // confirm modal -> confirm tabClosing event -> leave conference -> close tab
        showModal({
          title: _uawmsgs.default.MSG_LEAVE_CONFERENCE_CONFIRM_TITLE,
          message: _uawmsgs.default.MSG_LEAVE_CONFERENCE_CONFIRM,
          cancelable: true,
          onOk: funcConfirmClosable.bind(this, function () {
            _this21.ucUiAction.leaveConference({
              conf_id: conf_id,
            })
            funcClose()
          }),
        })
      }
    } else if (
      conference.conf_status === _constants.default.CONF_STATUS_INVITED
    ) {
      if (isReplying) {
        // confirm modal -> confirm tabClosing event -> reject conference -> close tab
        showModal({
          title: _uawmsgs.default.MSG_LEAVE_CONFERENCE_CONFIRM_TITLE,
          message: _uawmsgs.default.MSG_LEAVE_CONFERENCE_CONFIRM,
          cancelable: true,
          onOk: funcConfirmClosable.bind(this, function () {
            _this21.ucUiAction.leaveConference({
              conf_id: conf_id,
            })
            funcClose()
          }),
        })
      } else {
        // confirm modal -> confirm tabClosing event -> reject conference -> close tab
        showModal({
          title: _uawmsgs.default.MSG_LEAVE_CONFERENCE_CONFIRM_TITLE,
          message: _uawmsgs.default.MSG_LEAVE_CONFERENCE_CONFIRM,
          cancelable: true,
          onOk: funcConfirmClosable.bind(this, function () {
            _this21.ucUiAction.leaveConference({
              conf_id: conf_id,
            })
            funcClose()
          }),
        })
      }
    } else {
      if (isReplying) {
        // confirm modal -> confirm tabClosing event -> close tab
        showModal({
          title: _uawmsgs.default.MSG_LEAVE_CONFERENCE_CONFIRM_TITLE,
          message: _uawmsgs.default.MSG_LEAVE_CONFERENCE_CONFIRM,
          cancelable: true,
          onOk: funcConfirmClosable.bind(this, funcClose),
        })
      } else {
        // confirm tabClosing event -> close tab
        funcConfirmClosable(funcClose)
      }
    }
  } else {
    // confirm tabClosing event -> close tab
    funcConfirmClosable(funcClose)
  }
}
uiData.prototype.tabLinkMoveHContextMenuItem_onClick = function (
  panelType,
  panelCode,
  ev,
) {
  var panel = this.mainPanelList.find(function (p) {
    return p.panelType === panelType && p.panelCode === panelCode
  })
  if (panel.position === 'center') {
    panel.position = 'east'
  } else if (panel.position === 'east') {
    panel.position = 'center'
  } else if (panel.position === 'south') {
    panel.position = 'se'
  } else if (panel.position === 'se') {
    panel.position = 'south'
  }
  this.render()
}
uiData.prototype.tabLinkMoveVContextMenuItem_onClick = function (
  panelType,
  panelCode,
  ev,
) {
  var panel = this.mainPanelList.find(function (p) {
    return p.panelType === panelType && p.panelCode === panelCode
  })
  if (panel.position === 'center') {
    panel.position = 'south'
  } else if (panel.position === 'south') {
    panel.position = 'center'
  } else if (panel.position === 'east') {
    panel.position = 'se'
  } else if (panel.position === 'se') {
    panel.position = 'east'
  }
  this.render()
}
uiData.prototype.mainTabsDndable_onDrop = function (dropTargetInfo, ev) {
  if (!dropTargetInfo || !ev || !ev.dragSourceInfo) {
    this.ucUiStore
      .getLogger()
      .log('warn', 'invalid dragSourceInfo, dropTargetInfo')
    return
  }
  // parameters
  var dragSourceInfoType = ev.dragSourceInfo.dragSourceInfoType
  var dragSourceInfoCode = ev.dragSourceInfo.dragSourceInfoCode
  var dropTargetInfoType = dropTargetInfo.dropTargetInfoType
  var dropTargetInfoCode = dropTargetInfo.dropTargetInfoCode

  // get sourcePanel, targetPanel
  var sourceIndex = -1
  var sourcePanel = null
  var sourceMainTabsPosition = ''
  var targetIndex = -1
  var targetPanel = null
  var targetMainTabsPosition = ''
  if (dragSourceInfoType === 'mainTabLinkSpan') {
    try {
      var dragSourceInfoCodeArray = (0, _strings.string)(
        dragSourceInfoCode,
      ).split('|')
      sourceIndex = this.mainPanelList.findIndex(function (p) {
        return p.panelType + '_' + p.panelCode === dragSourceInfoCodeArray[1]
      })
      sourcePanel = this.mainPanelList[sourceIndex]
      sourceMainTabsPosition = dragSourceInfoCodeArray[0]
    } catch (ex) {}
  }
  if (dropTargetInfoType === 'mainTabLinkSpan') {
    try {
      var dropTargetInfoCodeArray = (0, _strings.string)(
        dropTargetInfoCode,
      ).split('|')
      targetIndex = this.mainPanelList.findIndex(function (p) {
        return p.panelType + '_' + p.panelCode === dropTargetInfoCodeArray[1]
      })
      targetPanel = this.mainPanelList[targetIndex]
      targetMainTabsPosition = dropTargetInfoCodeArray[0]
    } catch (ex) {}
  } else if (dropTargetInfoType === 'mainTabLinksLast') {
    targetPanel = {} // dummy
    targetMainTabsPosition = (0, _strings.string)(dropTargetInfoCode)
  }
  if (
    !sourcePanel ||
    !sourceMainTabsPosition ||
    !targetPanel ||
    !targetMainTabsPosition
  ) {
    this.ucUiStore.getLogger().log('warn', 'panel not found')
    return
  }

  // move sourcePanel
  if (
    dragSourceInfoType === 'mainTabLinkSpan' &&
    dropTargetInfoType === 'mainTabLinkSpan'
  ) {
    if (sourceIndex < targetIndex) {
      // drag downward
      var newTargetIndex = targetIndex - 1 // after remove source
      if (sourceMainTabsPosition === targetMainTabsPosition) {
        // drag downward in the same group
        // move sourcePanel after targetPanel
        this.mainPanelList.splice(
          newTargetIndex + 1,
          0,
          this.mainPanelList.splice(sourceIndex, 1)[0],
        )
      } else {
        // drag downward to another group
        // move sourcePanel before targetPanel
        this.mainPanelList.splice(
          newTargetIndex,
          0,
          this.mainPanelList.splice(sourceIndex, 1)[0],
        )
      }
    } else {
      // drag upward
      // move sourcePanel before targetPanel
      this.mainPanelList.splice(
        targetIndex,
        0,
        this.mainPanelList.splice(sourceIndex, 1)[0],
      )
    }
    if (sourceMainTabsPosition !== targetMainTabsPosition) {
      sourcePanel.position = targetPanel.position
    }
  } else if (
    dragSourceInfoType === 'mainTabLinkSpan' &&
    dropTargetInfoType === 'mainTabLinksLast'
  ) {
    // move sourcePanel to the last child of targetMainTabsPosition
    this.mainPanelList.push(this.mainPanelList.splice(sourceIndex, 1)[0])
    sourcePanel.position = targetMainTabsPosition.split(' ')[0]
  }

  // select sourcePanel
  this.closeAllshowingDialogs()
  this.updateTab({
    select: {
      panelType: sourcePanel.panelType,
      panelCode: sourcePanel.panelCode,
    },
  })
  this.render()
}
uiData.prototype.panelHeaderKickButton_onClick = function (
  panelType,
  panelCode,
  ev,
) {
  if (panelType === 'CONFERENCE') {
    var conf_id = (0, _strings.string)(
      this.ucUiStore.getChatHeaderInfo({
        chatType: panelType,
        chatCode: panelCode,
      }).conf_id,
    )
    var conference = this.ucUiStore.getChatClient().getConference(conf_id)
    if (conference.conf_type === 'webchat') {
      this.showModal({
        title: _uawmsgs.default.MSG_KICK_TALKING_WEBCHAT_CONFIRM_TITLE,
        message: _uawmsgs.default.MSG_KICK_TALKING_WEBCHAT_CONFIRM,
        cancelable: true,
        onOk: this.ucUiAction.kickOutOfWebchatRoom.bind(this.ucUiAction, {
          conf_id: conf_id,
        }),
      })
    }
  }
}
uiData.prototype.panelHeaderLeaveButton_onClick = function (
  panelType,
  panelCode,
  ev,
) {
  if (panelType === 'CONFERENCE') {
    var conf_id = (0, _strings.string)(
      this.ucUiStore.getChatHeaderInfo({
        chatType: panelType,
        chatCode: panelCode,
      }).conf_id,
    )
    var conference = this.ucUiStore.getChatClient().getConference(conf_id)
    if (conference.conf_type === 'webchat') {
      this.showModal({
        title: _uawmsgs.default.MSG_LEAVE_CONFERENCE_CONFIRM_TITLE,
        message: _uawmsgs.default.MSG_LEAVE_CONFERENCE_CONFIRM,
        cancelable: true,
        onOk: this.ucUiAction.leaveWebchatRoom.bind(this.ucUiAction, {
          conf_id: conf_id,
        }),
      })
    } else {
      this.showModal({
        title: _uawmsgs.default.MSG_LEAVE_CONFERENCE_CONFIRM_TITLE,
        message: _uawmsgs.default.MSG_LEAVE_CONFERENCE_CONFIRM,
        cancelable: true,
        thirdButton: true,
        cancelByThirdButton: true,
        cancelCaption: _uawmsgs.default.LBL_EDITOR_LEAVE_REJOINABLE_BUTTON,
        thirdButtonCaption: _uawmsgs.default.CMN_CANCEL,
        cancelClassName: 'brVivid',
        onOk: this.ucUiAction.leaveConference.bind(this.ucUiAction, {
          conf_id: conf_id,
        }),
        onCancel: this.ucUiAction.leaveConference.bind(this.ucUiAction, {
          conf_id: conf_id,
          rejoinable: true,
        }),
      })
    }
  }
}
uiData.prototype.panelHeaderInviteButton_onClick = function (
  panelType,
  panelCode,
  ev,
) {
  var _this22 = this
  this.showModal({
    title: _uawmsgs.default.MSG_INVITE_TO_CONFERENCE_DIALOG_TITLE,
    contentClass: 'ConferenceInviteForm',
    contentParams: {
      panelType: panelType,
      panelCode: panelCode,
    },
    cancelable: true,
    onOk: function onOk(ev) {
      if (
        ev &&
        ev.content &&
        ev.content.state &&
        ev.content.state.selectedBuddyTable
      ) {
        var invite = []
        Object.keys(ev.content.state.selectedBuddyTable).forEach(
          function (tenant) {
            if (ev.content.state.selectedBuddyTable[tenant]) {
              Object.keys(ev.content.state.selectedBuddyTable[tenant]).forEach(
                function (user_id) {
                  if (ev.content.state.selectedBuddyTable[tenant][user_id]) {
                    if (
                      _this22.ucUiStore.getChatClient().getBuddyStatus({
                        tenant: tenant,
                        user_id: user_id,
                      }).status !== _constants.default.STATUS_OFFLINE
                    ) {
                      invite.push({
                        tenant: tenant,
                        user_id: user_id,
                      })
                    }
                  }
                },
              )
            }
          },
        )
        if (invite.length) {
          // inviteToConference after dialog closed
          setTimeout(
            _this22.ucUiAction.inviteToConference.bind(_this22.ucUiAction, {
              conf_id: (0, _strings.string)(
                _this22.ucUiStore.getChatHeaderInfo({
                  chatType: panelType,
                  chatCode: panelCode,
                }).conf_id,
              ),
              invite: invite,
            }),
            0,
          )
        }
      } else if (ev) {
        ev.closes = false
      }
    },
  })
}
uiData.prototype.panelHeaderInviteDndable_onCheckCanDrop = function (
  panelType,
  panelCode,
  ev,
) {
  if (panelType === 'CONFERENCE') {
    var conf_id = (0, _strings.string)(
      this.ucUiStore.getChatHeaderInfo({
        chatType: panelType,
        chatCode: panelCode,
      }).conf_id,
    )
    var conference = this.ucUiStore.getChatClient().getConference(conf_id)
    var myUcCimUserType = (0, _strings.int)(this.ucUiStore.getUcCimUserType())
    if (
      conference &&
      conference.conf_status === _constants.default.CONF_STATUS_JOINED &&
      (conference.conf_type !== 'webchat' ||
        (-(0, _strings.int)(
          (conference.webchatinfo &&
            (0, _strings.string)(conference.webchatinfo.invite_button_type)) ||
            '-98',
        ) &
          myUcCimUserType) ===
          myUcCimUserType)
    ) {
      if (
        ev &&
        ev.dragSourceInfo &&
        ev.dragSourceInfo.dragSourceInfoType === 'buddylistItem'
      ) {
        var buddy = null
        try {
          buddy = JSON.parse(ev.dragSourceInfo.dragSourceInfoCode)
        } catch (ex) {}
        if (
          buddy &&
          this.ucUiStore.getChatClient().getBuddyStatus(buddy).status !==
            _constants.default.STATUS_OFFLINE &&
          !conference.user.some(function (u) {
            return (
              u.tenant === buddy.tenant &&
              u.user_id === buddy.user_id &&
              (u.conf_status === _constants.default.CONF_STATUS_INVITED ||
                u.conf_status === _constants.default.CONF_STATUS_JOINED)
            )
          })
        ) {
          return true
        }
      } else if (
        ev &&
        ev.dragSourceInfo &&
        ev.dragSourceInfo.dragSourceInfoType === 'buddylistGroupTitle'
      ) {
        // TODO: yano check if conference already has group tag
        var group_id = (0, _strings.string)(
          ev.dragSourceInfo.dragSourceInfoCode,
        )
        if (
          group_id &&
          conference.user.length === 1 // TODO: yano test
        ) {
          return true
        }
      }
    }
  }
  return false
}
uiData.prototype.panelHeaderInviteDndable_onDrop = function (
  panelType,
  panelCode,
  ev,
) {
  var _this23 = this
  if (panelType === 'CONFERENCE') {
    var conf_id = (0, _strings.string)(
      this.ucUiStore.getChatHeaderInfo({
        chatType: panelType,
        chatCode: panelCode,
      }).conf_id,
    )
    var conference = this.ucUiStore.getChatClient().getConference(conf_id)
    var myUcCimUserType = (0, _strings.int)(this.ucUiStore.getUcCimUserType())
    if (
      conference &&
      conference.conf_status === _constants.default.CONF_STATUS_JOINED &&
      (conference.conf_type !== 'webchat' ||
        (-(0, _strings.int)(
          (conference.webchatinfo &&
            (0, _strings.string)(conference.webchatinfo.invite_button_type)) ||
            '-98',
        ) &
          myUcCimUserType) ===
          myUcCimUserType)
    ) {
      if (
        ev &&
        ev.dragSourceInfo &&
        ev.dragSourceInfo.dragSourceInfoType === 'buddylistItem'
      ) {
        var buddy = null
        try {
          buddy = JSON.parse(ev.dragSourceInfo.dragSourceInfoCode)
        } catch (ex) {}
        if (
          buddy &&
          this.ucUiStore.getChatClient().getBuddyStatus(buddy).status !==
            _constants.default.STATUS_OFFLINE &&
          !conference.user.some(function (u) {
            return (
              u.tenant === buddy.tenant &&
              u.user_id === buddy.user_id &&
              (u.conf_status === _constants.default.CONF_STATUS_INVITED ||
                u.conf_status === _constants.default.CONF_STATUS_JOINED)
            )
          })
        ) {
          this.ucUiAction.inviteToConference({
            conf_id: conf_id,
            invite: [buddy],
          })
        }
      } else if (
        ev &&
        ev.dragSourceInfo &&
        ev.dragSourceInfo.dragSourceInfoType === 'buddylistGroupTitle'
      ) {
        // TODO: yano check if conference already has group tag
        var group = (0, _strings.string)(ev.dragSourceInfo.dragSourceInfoCode)
        if (
          group &&
          conference.user.length === 1 // TODO: yano test
        ) {
          var invite = []
          var profile = this.ucUiStore.getChatClient().getProfile()
          var buddyTable = this.ucUiStore.getBuddyTable()[profile.tenant] || {}
          Object.keys(buddyTable).forEach(function (key) {
            var buddy = buddyTable[key]
            if (
              !buddy.isMe &&
              buddy.isBuddy &&
              !buddy.isTemporaryBuddy &&
              buddy.group === group &&
              group &&
              _this23.ucUiStore.getChatClient().getBuddyStatus(buddy).status !==
                _constants.default.STATUS_OFFLINE &&
              !conference.user.some(function (u) {
                return (
                  u.tenant === buddy.tenant &&
                  u.user_id === buddy.user_id &&
                  (u.conf_status === _constants.default.CONF_STATUS_INVITED ||
                    u.conf_status === _constants.default.CONF_STATUS_JOINED)
                )
              })
            ) {
              invite.push(buddy)
            }
          })
          if (invite.length) {
            this.ucUiAction.inviteToConference({
              conf_id: conf_id,
              invite: invite,
            })
          } else {
            this.ucUiStore.getLogger().log('info', 'empty invite')
          }
        }
      }
    }
  }
}
uiData.prototype.panelHeaderFileButton_onClick = function (
  panelType,
  panelCode,
  ev,
) {
  var _this24 = this
  var myUcCimUserType = (0, _strings.int)(this.ucUiStore.getUcCimUserType())
  if (
    ((0, _strings.int)(
      this.ucUiStore.getOptionalSetting({
        key: 'fsp',
      }),
    ) &
      myUcCimUserType) ===
    myUcCimUserType
  ) {
    this.ucUiStore
      .getLogger()
      .log('warn', 'invalid fsp in panelHeaderFileButton_onClick')
    return
  }
  if (_reactNative.Platform.OS !== 'web') {
    // Import DocumentPicker from react-native-document-picker
    var DocumentPicker = require('react-native-document-picker').default

    // Launch document picker
    DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
      allowMultiSelection: true,
    })
      .then(function (results) {
        console.log('#Duy Phan console results', results)
        if (results && results.length > 0) {
          // Convert DocumentPicker results to File objects
          var files = results.map(function (result) {
            // Create a File-like object from the document picker result
            return {
              uri: result.uri,
              name: result.name,
              type: result.type,
              size: result.size,
              // Add a method to get the file content as a blob
              // blob: async () => {
              //   try {
              //     const RNFS = require('react-native-fs')
              //     const fileContent = await RNFS.readFile(result.uri, 'base64')
              //     const blob = new Blob([fileContent], { type: result.type })
              //     return blob
              //   } catch (error) {
              //     this.ucUiStore
              //       .getLogger()
              //       .log('error', 'Error reading file: ' + error)
              //     return null
              //   }
              // },
            }
          })
          console.log('#Duy Phan console 222222', files)

          // Send the files
          _this24.ucUiAction.sendFiles({
            chatType: panelType,
            chatCode: panelCode,
            files: files,
          })
          console.log('#Duy Phan console files done')
        } else {
          _this24.ucUiStore.getLogger().log('info', 'No files selected')
        }
      })
      .catch(function (err) {
        if (DocumentPicker.isCancel(err)) {
          // User cancelled the picker
          _this24.ucUiStore
            .getLogger()
            .log('info', 'User cancelled file picker')
        } else {
          // Error occurred
          _this24.ucUiStore
            .getLogger()
            .log('error', 'Error picking files: ' + err)
        }
      })
  }
}
uiData.prototype.panelHeaderVoiceButton_onClick = function (
  panelType,
  panelCode,
  ev,
) {
  this.makeCall(panelType, panelCode, false, false)
}
uiData.prototype.panelHeaderVideoButton_onClick = function (
  panelType,
  panelCode,
  ev,
) {
  console.log('#Duy Phan console panelHeaderVideoButton_onClick')
  this.makeCall(panelType, panelCode, true, false)
}
uiData.prototype.panelHeaderScreenButton_onClick = function (
  panelType,
  panelCode,
  ev,
) {
  this.makeCall(panelType, panelCode, true, true)
}
uiData.prototype.panelHeaderHistoryButton_onClick = function (
  panelType,
  panelCode,
  ev,
) {
  if (panelType === 'CHAT' || panelType === 'HISTORYDETAIL') {
    var profile = this.ucUiStore.getChatClient().getProfile()
    var buddy
    try {
      buddy =
        JSON.parse(
          panelType === 'HISTORYDETAIL'
            ? this.historyDetailWorkTable[panelCode].chatPanelCode
            : panelCode,
        ) || {}
    } catch (ex) {
      this.ucUiStore
        .getLogger()
        .log('warn', 'failed to parse panelCode=' + panelCode)
      return
    }
    if (buddy.tenant !== profile.tenant) {
      this.ucUiStore
        .getLogger()
        .log('warn', 'cannot open history of buddy of tenant=' + buddy.tenant)
      return
    }
    var newPanelType = 'HISTORYSUMMARIES'
    var newPanelCode = (0, _strings.string)(++this.panelCodeCounter)
    this.ucUiAction.setSearchConditions({
      chatType: newPanelType,
      chatCode: newPanelCode,
      searchConditions: [
        {
          conditionKey: '_onlyMe',
          conditionValue: '2',
        },
        {
          conditionKey: '_userId',
          conditionValue: (0, _strings.string)(buddy.user_id),
        },
      ],
    })
    this.ucUiAction.doSearch({
      chatType: newPanelType,
      chatCode: newPanelCode,
      emphasize: true,
    })
    this.updateTab({
      open: {
        panelType: newPanelType,
        panelCode: newPanelCode,
        sourcePanelType: panelType,
        sourcePanelCode: panelCode,
      },
      select: {
        panelType: newPanelType,
        panelCode: newPanelCode,
      },
    })
  }
}
uiData.prototype.panelHeaderChatButton_onClick = function (
  panelType,
  panelCode,
  ev,
) {
  console.log(
    '#Duy Phan console panelHeaderChatButton_onClick',
    panelType,
    panelCode,
  )
  if (panelType === 'HISTORYDETAIL') {
    if (
      this.historyDetailWorkTable[panelCode] &&
      this.historyDetailWorkTable[panelCode].chatPanelCode
    ) {
      this.updateTab({
        open: {
          panelType: 'CHAT',
          panelCode: this.historyDetailWorkTable[panelCode].chatPanelCode,
          sourcePanelType: panelType,
          sourcePanelCode: panelCode,
        },
        select: {
          panelType: 'CHAT',
          panelCode: this.historyDetailWorkTable[panelCode].chatPanelCode,
        },
      })
    }
  }
}
uiData.prototype.panelHeaderContinuationMenuItem_onClick = function (
  panelType,
  panelCode,
  replyType,
  ev,
) {
  var chatHeaderInfo = this.ucUiStore.getChatHeaderInfo({
    chatType: panelType,
    chatCode: panelCode,
  })
  this.replyContinuation(
    chatHeaderInfo.yyyymm,
    chatHeaderInfo.conf_id,
    replyType,
    chatHeaderInfo.originalWebchatId,
    false,
    null,
  )
}
uiData.prototype.panelHeaderUndockButton_onClick = function (
  panelType,
  panelCode,
  ev,
) {
  this.updateTab({
    close: {
      panelType: panelType,
      panelCode: panelCode,
    },
  })
  var subWindow = this.subWindowList.find(function (p) {
    return p.panelType === panelType && p.panelCode === panelCode
  })
  if (subWindow) {
    subWindow.window.focus()
    return
  }
  var win = window.open(
    '',
    panelType + '_' + panelCode,
    'width=300, height=400',
  )
  if (win) {
    var chatTitle =
      panelType === 'WEBCHATQUEUE'
        ? _uawmsgs.default.TAB_WEBCHATQUEUE
        : this.ucUiStore.getChatHeaderInfo({
            chatType: panelType,
            chatCode: panelCode,
          }).title
    win.document.open()
    win.document.write('<!doctype html>')
    win.document.write('<html>')
    win.document.write('<head>')
    win.document.write('<meta charset="utf-8">')
    win.document.write('<title>')
    win.document.write((0, _strings.escapeHTML)(chatTitle))
    win.document.write('</title>')
    win.document.write(
      '<link rel="stylesheet" href="' +
        _currentscript.default.DIR +
        '../../../css/ucagentwidget.css' +
        _currentscript.default.QUERY +
        '" />',
    )
    win.document.write(
      '<link rel="stylesheet" href="' +
        _currentscript.default.DIR +
        '../../../css/react-datepicker.css' +
        _currentscript.default.QUERY +
        '" />',
    )
    win.document.write('</head>')
    win.document.write('<body>')
    win.document.write('<div id="content">')
    win.document.write('</div>')
    win.document.write('</body>')
    win.document.write('</html>')
    win.document.close()
    win.addEventListener(
      'unload',
      this.subwindow_unload.bind(this, panelType, panelCode),
    )
    var ud = new uiData({
      parentElement: 'content',
      ucUiAction: this.ucUiAction,
      ucUiStore: this.ucUiStore,
      ownerDocument: win.document,
      configurations: this.configurations,
    })
    ud.mainPanelList.push({
      panelType: panelType,
      panelCode: panelCode,
      position: 'center',
    })
    ud.currentSelectedTab = panelType + '_' + panelCode
    ud.isSubWindow = true
    ud.subWindowPanelType = panelType
    ud.subWindowPanelCode = panelCode
    this.subWindowList.push({
      panelType: panelType,
      panelCode: panelCode,
      window: win,
      uiData: ud,
    })
    ud.render()
  } else {
    this.ucUiStore.getLogger().log('warn', 'window.open error')
  }
}
uiData.prototype.subwindow_unload = function (panelType, panelCode, ev) {
  var index = this.subWindowList.findIndex(function (p) {
    return p.panelType === panelType && p.panelCode === panelCode
  })
  if (index !== -1) {
    this.subWindowList[index].uiData.destroyApp()
    this.subWindowList.splice(index, 1)
  }
  var win =
    ev.target &&
    ev.target.ownerDocument &&
    (ev.target.ownerDocument.defaultView ||
      ev.target.ownerDocument.parentWindow)
  if (
    ev.target &&
    (ev.target.brDockFlag ||
      (ev.target.defaultView || ev.target.parentWindow || {}).brDockFlag)
  ) {
    this.updateTab({
      open: {
        panelType: panelType,
        panelCode: panelCode,
      },
      select: {
        panelType: panelType,
        panelCode: panelCode,
      },
    })
  }
}
uiData.prototype.panelHeaderHideButton_onClick = function (
  panelType,
  panelCode,
  ev,
) {
  if (this.configurations.tabCloseCancelable) {
    var doCloseFunc = {
      func: this.updateTab.bind(this, {
        close: {
          panelType: panelType,
          panelCode: panelCode,
        },
      }),
    }
    var continueEvent = function continueEvent(result) {
      if (result) {
        if (doCloseFunc.func) {
          doCloseFunc.func()
          doCloseFunc.func = null
        }
      }
    }
    this.fire('tabClosing', {
      panelKey: panelType + '_' + panelCode,
      continueEvent: continueEvent,
    })
  } else {
    this.updateTab({
      close: {
        panelType: panelType,
        panelCode: panelCode,
      },
    })
  }
}
uiData.prototype.panelHeaderDockButton_onClick = function (
  panelType,
  panelCode,
  ev,
) {
  // this is sub window
  var win =
    ev.target &&
    ev.target.ownerDocument &&
    (ev.target.ownerDocument.defaultView ||
      ev.target.ownerDocument.parentWindow)
  if (win) {
    win.brDockFlag = true
    win.close()
  }
}
uiData.prototype.panelHeaderHideSubButton_onClick = function (
  panelType,
  panelCode,
  ev,
) {
  // this is sub window
  var win =
    ev.target &&
    ev.target.ownerDocument &&
    (ev.target.ownerDocument.defaultView ||
      ev.target.ownerDocument.parentWindow)
  if (win) {
    win.close()
  }
}
uiData.prototype.panelHeaderCloseChatButton_onClick = function (
  panelType,
  panelCode,
  ev,
) {
  if (panelType === 'CONFERENCE') {
    this.showModal({
      title: _uawmsgs.default.MSG_CLOSE_CHAT_CONFIRM_TITLE,
      message: _uawmsgs.default.MSG_CLOSE_CHAT_CONFIRM,
      cancelable: true,
      onOk: this.ucUiAction.leaveWebchatRoom.bind(this.ucUiAction, {
        conf_id: (0, _strings.string)(
          this.ucUiStore.getChatHeaderInfo({
            chatType: panelType,
            chatCode: panelCode,
          }).conf_id,
        ),
      }),
    })
  }
}
uiData.prototype.panelHeaderRejoinButton_onClick = function (
  panelType,
  panelCode,
  ev,
) {
  this.ucUiAction.joinWebchatRoom({
    conf_id: (0, _strings.string)(
      this.ucUiStore.getChatHeaderInfo({
        chatType: panelType,
        chatCode: panelCode,
      }).conf_id,
    ),
    properties: {
      invisible: false,
      exclusive: false,
    },
  })
}
uiData.prototype.chatPanel_onDrop = function (panelType, panelCode, ev) {
  var myUcCimUserType = (0, _strings.int)(this.ucUiStore.getUcCimUserType())
  if (
    ((0, _strings.int)(
      this.ucUiStore.getOptionalSetting({
        key: 'fsp',
      }),
    ) &
      myUcCimUserType) ===
    myUcCimUserType
  ) {
    this.ucUiStore.getLogger().log('warn', 'invalid fsp in chatPanel_onDrop')
    return
  }
  var files =
    (ev && ev.files) || (ev && ev.dataTransfer && ev.dataTransfer.files)
  if (files && files.length) {
    this.ucUiAction.sendFiles({
      chatType: panelType,
      chatCode: panelCode,
      files: files,
    })
  } else {
    this.ucUiStore.getLogger().log('warn', 'empty files')
  }
}
uiData.prototype.chatArea_onScrolledToBottomChanged = function (
  panelType,
  panelCode,
  scrolledToBottom,
) {
  var panelKey = panelType + '_' + panelCode
  if (this.currentSelectedTab === panelKey) {
    this.currentSelectedTabScrolledToBottom = scrolledToBottom
    if (
      scrolledToBottom &&
      this.unscrolledTabs &&
      this.unscrolledTabs[panelKey]
    ) {
      delete this.unscrolledTabs[panelKey]
      if (this.funcOnScrolledQueues[panelKey]) {
        var funcOnScrolled
        while ((funcOnScrolled = this.funcOnScrolledQueues[panelKey].shift())) {
          funcOnScrolled()
          this.ucUiStore
            .getLogger()
            .log(
              'debug',
              'dbg u1898 2 ' +
                (this.ucUiStore.getChatClient() || {})._user_id +
                ' funcOnScrolledQueues["' +
                panelKey +
                '"].shift() at chatArea_onScrolledToBottomChanged()',
            )
        }
      }
      this.render()
    }
  }
}
uiData.prototype.chatInvitationJoinButton_onClick = function (
  panelType,
  panelCode,
  ev,
) {
  if (panelType === 'CONFERENCE') {
    this.ucUiAction.joinConference({
      conf_id: (0, _strings.string)(
        this.ucUiStore.getChatHeaderInfo({
          chatType: panelType,
          chatCode: panelCode,
        }).conf_id,
      ),
    })
  }
}
uiData.prototype.chatInvitationRejectButton_onClick = function (
  panelType,
  panelCode,
  ev,
) {
  if (panelType === 'CONFERENCE') {
    this.ucUiAction.leaveConference({
      conf_id: (0, _strings.string)(
        this.ucUiStore.getChatHeaderInfo({
          chatType: panelType,
          chatCode: panelCode,
        }).conf_id,
      ),
    })
  }
}
uiData.prototype.chatListOpenDetailLink_onClick = function (
  panelType,
  panelCode,
  ev,
) {
  var newPanelType = 'HISTORYDETAIL'
  var newPanelCode = panelCode
  this.historyDetailWorkTable[newPanelCode] = {
    chatPanelCode: panelCode,
    historyDetailName: (0, _strings.string)(
      (
        this.ucUiStore.getChatHeaderInfo({
          chatType: panelType,
          chatCode: panelCode,
        }) || {}
      ).title,
    ),
  }
  this.ucUiAction.copyChatList({
    chatTypeSource: panelType,
    chatCodeSource: panelCode,
    chatTypeTarget: newPanelType,
    chatCodeTarget: newPanelCode,
    doNotOverwrite: true,
  })
  this.updateTab({
    open: {
      panelType: newPanelType,
      panelCode: newPanelCode,
      sourcePanelType: panelType,
      sourcePanelCode: panelCode,
    },
    select: {
      panelType: newPanelType,
      panelCode: newPanelCode,
    },
  })
}
uiData.prototype.chatFileOpenInNewWindowButton_onClick = function (url, ev) {
  var _this25 = this
  // convert to data uri scheme (internet explorer cannot display img from blob url scheme on another window)
  if (
    typeof Blob !== 'undefined' &&
    typeof XMLHttpRequest !== 'undefined' &&
    typeof FileReader !== 'undefined'
  ) {
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 1) {
        xhr.responseType = 'blob'
      } else if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var fileReader = new window.FileReader()
          fileReader.onload = function () {
            // open new window and display full size image
            var url = (0, _strings.string)(
              _this25.ownerDocument.defaultView &&
                _this25.ownerDocument.defaultView.location &&
                _this25.ownerDocument.defaultView.location.href,
            )
            url += (url.indexOf('?') === -1 ? '?' : '&') + 'image'
            var win = window.open(url, null)
            if (win) {
              setTimeout(function () {
                win.document.open()
                win.document.write(
                  '<!doctype html><html><body><img src="' +
                    fileReader.result +
                    '"></body></html>',
                )
                win.document.close()
              }, 0)
            } else {
              _this25.ucUiStore.getLogger().log('warn', 'window.open error')
            }
          }
          fileReader.readAsDataURL(xhr.response)
        }
      }
    }
    xhr.open('GET', url)
    xhr.send()
  }
}
uiData.prototype.chatFileCancelButton_onClick = function (messageFile, ev) {
  var _this26 = this
  this.showModal({
    title: _uawmsgs.default.MSG_FILE_CANCEL_CONFIRM_TITLE,
    message: _uawmsgs.default.MSG_FILE_CANCEL_CONFIRM,
    cancelable: true,
    onOk: function onOk() {
      if (!messageFile.multiReceiversInfo) {
        _this26.ucUiStore.getChatClient().cancelFile(messageFile.file_id, null)
      } else {
        messageFile.multiReceiversInfo.forEach(function (info) {
          _this26.ucUiStore.getChatClient().cancelFile(info.file_id, null)
        })
      }
    },
  })
}
uiData.prototype.chatInlineImage_onClick = function (url, ev) {
  var _this27 = this
  var style = {
    margin: '8px',
  }
  var imageWidth = ev && ev.target && ev.target.naturalWidth
  var imageHeight = ev && ev.target && ev.target.naturalHeight
  var clientWidth =
    this.ownerDocument &&
    this.ownerDocument.documentElement &&
    this.ownerDocument.documentElement.clientWidth
  var clientHeight =
    this.ownerDocument &&
    this.ownerDocument.documentElement &&
    this.ownerDocument.documentElement.clientHeight
  var chatArea =
    ev && ev.target && ev.target.closest && ev.target.closest('.brChatArea')
  var editorArea =
    chatArea &&
    chatArea.parentElement &&
    chatArea.parentElement.querySelector &&
    chatArea.parentElement.querySelector('.brEditorArea')
  var clickableHeight =
    clientHeight -
      (
        (editorArea &&
          editorArea.getBoundingClientRect &&
          editorArea.getBoundingClientRect()) || {
          top: clientHeight,
        }
      ).top || 0
  var maxWidth = clientWidth - 16
  var maxHeight = clientHeight - clickableHeight - 28
  if (imageWidth > 0 && imageHeight > 0 && maxWidth > 0 && maxHeight > 0) {
    if (imageWidth < maxWidth && imageHeight < maxHeight) {
      style.width = imageWidth + 'px'
      style.height = imageHeight + 'px'
    } else if (imageHeight * maxWidth < imageWidth * maxHeight) {
      style.width = maxWidth + 'px'
      style.height = (imageHeight * maxWidth) / imageWidth + 'px'
    } else {
      style.width = (imageWidth * maxHeight) / imageHeight + 'px'
      style.height = maxHeight + 'px'
    }
  } else {
    style.maxWidth = '100vw'
    style.maxHeight = '100vh'
  }
  this.ucUiStore
    .getLogger()
    .log(
      'info',
      'chatInlineImage_onClick imageWidth=' +
        imageWidth +
        ' imageHeight=' +
        imageHeight +
        ' clientWidth=' +
        clientWidth +
        ' clientHeight=' +
        clientHeight +
        ' clickableHeight=' +
        clickableHeight,
    )
  this.showModal({
    tableClassName: 'brExpandInlineImage',
    modalStyle: {
      overlay: {
        backgroundColor: 'rgba(128, 128, 128, 0.5)',
        bottom: clickableHeight + 'px',
        cursor: 'zoom-out',
      },
    },
    contentParams: {
      content: '<img src={url} style={style} />',
      // TODO: Check and update this element
    },
  })
  var currentModalInfo = this.modalInfo
  var count = 0
  var _funcSetListener = function funcSetListener() {
    var overlay = _this27.ownerDocument.querySelector(
      '.brWidgetBodyModalOverlay',
    )
    if (overlay) {
      overlay.addEventListener(
        'click',
        function () {
          if (_this27.modalInfo === currentModalInfo) {
            _this27.modalInfo = null
            _this27.render()
          }
        },
        {
          once: true,
        },
      )
    } else if (count < 50) {
      setTimeout(_funcSetListener, 100)
    } else {
      _this27.ucUiStore
        .getLogger()
        .log('warn', 'funcSetListener count=' + count)
      _this27.modalInfo = null
      _this27.render()
    }
  }
  setTimeout(_funcSetListener, 100)
}
uiData.prototype.chatInlineImage_onLoad = function (messageFile, ev) {
  this.render()
}
uiData.prototype.editorTextarea_onKeyDown = function (
  panelType,
  panelCode,
  disabled,
  isEmail,
  ev,
) {
  if (!isEmail) {
    if (ev.keyCode === 13 && !ev.shiftKey) {
      if (!disabled) {
        this.sendTextFromEditor(panelType, panelCode, ev.target, null, isEmail)
      }
      ev.preventDefault()
    } else if (
      /* [9, 16, 17, 18, 19, 27, 28, 29, 33, 34, 35, 36, 37, 38, 39, 40].indexOf(ev.keyCode) < 0 */ ((48 <=
        ev.keyCode &&
        ev.keyCode <= 90) ||
        ev.keyCode === 229) &&
      !ev.ctrlKey
    ) {
      if (!disabled) {
        this.ucUiAction.sendTyping({
          chatType: panelType,
          chatCode: panelCode,
        })
        if (ev.target && ev.target.value === '') {
          var statusMe = this.ucUiStore.getChatClient().getStatus()
          if (
            statusMe.status !== _constants.default.STATUS_AVAILABLE ||
            statusMe.display
          ) {
            this.startAnimation('statusbar', 4000, false)
          }
        }
      }
    }
  }
}
uiData.prototype.editorSendButton_onClick = function (
  panelType,
  panelCode,
  editorTextarea,
  subjectTextBox,
  isEmail,
  ev,
) {
  var value = editorTextarea.getValue()
  if (value) {
    this.sendTextFromEditor(
      panelType,
      panelCode,
      editorTextarea,
      subjectTextBox,
      isEmail,
    )
  } else {
    editorTextarea.focus()
  }
}
uiData.prototype.callAnswerButton_onClick = function (
  panelType,
  panelCode,
  isVideo,
  ev,
) {
  var panelKey = panelType + '_' + panelCode
  var dontMakeVideo = new RegExp(
    '^' +
      this.ucUiStore.getLocalStoragePreference({
        keyList: ['noVideoMode'],
      })[0] +
      '$',
  ).test(panelType)
  if (!this.phone) {
    this.ucUiStore.getLogger().log('warn', 'empty phone')
    return
  }
  if (!this.panelSessionTable[panelKey]) {
    this.ucUiStore
      .getLogger()
      .log('warn', 'empty this.panelSessionTable["' + panelKey + '"]')
    return
  }
  var session = this.phone.getSession(
    this.panelSessionTable[panelKey].sessionId,
  )
  if (!session) {
    this.ucUiStore.getLogger().log('warn', 'empty session')
    return
  }
  var newWithVideo =
    isVideo ||
    (!dontMakeVideo &&
      session.remoteUserOptionsTable &&
      Object.keys(session.remoteUserOptionsTable).some(function (user) {
        var remoteSoundOnly = false
        try {
          remoteSoundOnly = JSON.parse(
            session.remoteUserOptionsTable[user].exInfo,
          ).soundOnly
        } catch (ex) {}
        return (
          session.remoteUserOptionsTable[user] &&
          session.remoteUserOptionsTable[user].withVideo &&
          !remoteSoundOnly
        )
      }))
  this.panelSessionTable[panelKey].isVideo = isVideo
  if (isVideo) {
    this.panelSessionTable[panelKey].cameraMuted = false
    this.phone.setMuted(
      {
        videoClient:
          this.panelSessionTable[panelKey].cameraMuted &&
          !this.panelSessionTable[panelKey].isScreen,
      },
      session.sessionId,
    )
  }
  this.phone.answer(
    session.sessionId,
    null,
    newWithVideo,
    this.getVideoOptions(panelKey),
    JSON.stringify({
      soundOnly: !Boolean(isVideo),
    }),
  )
  this.updateTab({
    select: {
      panelType: panelType,
      panelCode: panelCode,
    },
  })
}
uiData.prototype.callAreaTheaterButton_onClick = function (
  panelType,
  panelCode,
  ev,
) {
  this.ucUiAction.setLocalStoragePreference({
    keyValueList: [
      {
        key: 'callAreaTheater',
        value: this.ucUiStore.getLocalStoragePreference({
          keyList: ['callAreaTheater'],
        })[0]
          ? ''
          : 'true',
      },
    ],
  })
  this.render()
}
uiData.prototype.callTransferButton_onClick = function (
  panelType,
  panelCode,
  target,
  ev,
) {
  var panelKey = panelType + '_' + panelCode
  if (!this.phone) {
    this.ucUiStore.getLogger().log('warn', 'empty phone')
    return
  }
  if (!this.panelSessionTable[panelKey]) {
    this.ucUiStore
      .getLogger()
      .log('warn', 'empty this.panelSessionTable["' + panelKey + '"]')
    return
  }
  if (!this.panelSessionTable[panelKey].holded) {
    this.ucUiStore
      .getLogger()
      .log('warn', 'not holded this.panelSessionTable["' + panelKey + '"]')
    return
  }
  if (this.panelSessionTable[panelKey].transferring) {
    this.ucUiStore
      .getLogger()
      .log(
        'warn',
        'already transferring this.panelSessionTable["' + panelKey + '"]',
      )
    return
  }
  if (!target) {
    this.ucUiStore.getLogger().log('warn', 'empty target')
    return
  }
  this.panelSessionTable[panelKey].holded = false
  this.panelSessionTable[panelKey].transferring = true
  this.sendDTMF(target + '#', this.panelSessionTable[panelKey].sessionId, {
    disableOscillator: this.configurations.dtmfShortcutDisableOscillator,
  })
  this.render()
}
uiData.prototype.callTransferConferenceButton_onClick = function (
  panelType,
  panelCode,
  ev,
) {
  var panelKey = panelType + '_' + panelCode
  if (!this.phone) {
    this.ucUiStore.getLogger().log('warn', 'empty phone')
    return
  }
  if (!this.panelSessionTable[panelKey]) {
    this.ucUiStore
      .getLogger()
      .log('warn', 'empty this.panelSessionTable["' + panelKey + '"]')
    return
  }
  if (!this.panelSessionTable[panelKey].transferring) {
    this.ucUiStore
      .getLogger()
      .log(
        'warn',
        'not transferring this.panelSessionTable["' + panelKey + '"]',
      )
    return
  }
  this.panelSessionTable[panelKey].transferring = false
  this.sendDTMF('#0', this.panelSessionTable[panelKey].sessionId, {
    disableOscillator: this.configurations.dtmfShortcutDisableOscillator,
  })
  this.closeAllshowingDialogs()
  this.render()
}
uiData.prototype.callHoldButton_onClick = function (panelType, panelCode, ev) {
  var panelKey = panelType + '_' + panelCode
  if (!this.phone) {
    this.ucUiStore.getLogger().log('warn', 'empty phone')
    return
  }
  if (!this.panelSessionTable[panelKey]) {
    this.ucUiStore
      .getLogger()
      .log('warn', 'empty this.panelSessionTable["' + panelKey + '"]')
    return
  }
  if (!this.panelSessionTable[panelKey].holded) {
    this.panelSessionTable[panelKey].holded = true
    this.panelSessionTable[panelKey].transferring = false
    this.sendDTMF('#9', this.panelSessionTable[panelKey].sessionId, {
      disableOscillator: this.configurations.dtmfShortcutDisableOscillator,
    })
  } else {
    this.panelSessionTable[panelKey].holded = false
    this.panelSessionTable[panelKey].transferring = false
    this.sendDTMF('*', this.panelSessionTable[panelKey].sessionId, {
      disableOscillator: this.configurations.dtmfShortcutDisableOscillator,
    })
  }
  this.closeAllshowingDialogs()
  this.render()
}
uiData.prototype.callDtmfButton_onClick = function (
  panelType,
  panelCode,
  tone,
  ev,
) {
  var panelKey = panelType + '_' + panelCode
  if (!this.phone) {
    this.ucUiStore.getLogger().log('warn', 'empty phone')
    return
  }
  if (!this.panelSessionTable[panelKey]) {
    this.ucUiStore
      .getLogger()
      .log('warn', 'empty this.panelSessionTable["' + panelKey + '"]')
    return
  }
  this.sendDTMF(tone, this.panelSessionTable[panelKey].sessionId)
}
uiData.prototype.callAreaChangeDeviceMenuItem_onClick = function (
  panelType,
  panelCode,
  device,
  ev,
) {
  var panelKey = panelType + '_' + panelCode
  if (!this.phone) {
    this.ucUiStore.getLogger().log('warn', 'empty phone')
    return
  }
  if (!this.panelSessionTable[panelKey]) {
    this.ucUiStore
      .getLogger()
      .log('warn', 'empty this.panelSessionTable["' + panelKey + '"]')
    return
  }
  var session = this.phone.getSession(
    this.panelSessionTable[panelKey].sessionId,
  )
  if (!session) {
    this.ucUiStore.getLogger().log('warn', 'empty session')
    return
  }
  if (!device) {
    this.ucUiStore.getLogger().log('warn', 'empty device')
    return
  }
  if (device.kind === 'videoinput') {
    this.ucUiAction.setLocalStoragePreference({
      keyValueList: [
        {
          key: 'videoSource',
          value: (0, _strings.string)(device.deviceId),
        },
      ],
    })
    this.setPhoneDefaultOptions()
    if (this.panelSessionTable[panelKey].isVideo) {
      this.phone.setWithVideo(session.sessionId, false)
      this.phone.setWithVideo(
        session.sessionId,
        true,
        this.getVideoOptions(panelKey),
        JSON.stringify({
          soundOnly: false,
        }),
      )
    }
  } else if (device.kind === 'audioinput') {
    this.ucUiAction.setLocalStoragePreference({
      keyValueList: [
        {
          key: 'audioSource',
          value: (0, _strings.string)(device.deviceId),
        },
      ],
    })
    this.setPhoneDefaultOptions()
    this.phone.reconnectMicrophone(session.sessionId)
  } else if (device.kind === 'audiooutput') {
    this.ucUiAction.setLocalStoragePreference({
      keyValueList: [
        {
          key: 'audioTarget',
          value: (0, _strings.string)(device.deviceId),
        },
      ],
    })
  } else {
    this.ucUiStore.getLogger().log('warn', 'invalid device.kind=' + device.kind)
    return
  }
  this.render()
}
uiData.prototype.callMuteButton_onClick = function (
  panelType,
  panelCode,
  prop,
  ev,
) {
  var panelKey = panelType + '_' + panelCode
  if (!this.phone) {
    this.ucUiStore.getLogger().log('warn', 'empty phone')
    return
  }
  if (!this.panelSessionTable[panelKey]) {
    this.ucUiStore
      .getLogger()
      .log('warn', 'empty this.panelSessionTable["' + panelKey + '"]')
    return
  }
  var session = this.phone.getSession(
    this.panelSessionTable[panelKey].sessionId,
  )
  if (!session) {
    this.ucUiStore.getLogger().log('warn', 'empty session')
    return
  }
  if (!session.muted) {
    this.ucUiStore.getLogger().log('warn', 'empty session.muted')
    return
  }
  var muted = {}
  muted[prop] = !Boolean(session.muted[prop])
  this.phone.setMuted(muted, session.sessionId)
  this.render()
}
uiData.prototype.callCameraMuteButton_onClick = function (
  panelType,
  panelCode,
  ev,
) {
  var panelKey = panelType + '_' + panelCode
  if (!this.phone) {
    this.ucUiStore.getLogger().log('warn', 'empty phone')
    return
  }
  if (!this.panelSessionTable[panelKey]) {
    this.ucUiStore
      .getLogger()
      .log('warn', 'empty this.panelSessionTable["' + panelKey + '"]')
    return
  }
  var session = this.phone.getSession(
    this.panelSessionTable[panelKey].sessionId,
  )
  if (!session) {
    this.ucUiStore.getLogger().log('warn', 'empty session')
    return
  }
  if (!session.muted) {
    this.ucUiStore.getLogger().log('warn', 'empty session.muted')
    return
  }

  // toggle cameraMuted
  this.panelSessionTable[panelKey].cameraMuted = !Boolean(
    this.panelSessionTable[panelKey].cameraMuted,
  )
  if (!this.panelSessionTable[panelKey].isVideo) {
    // change video on
    this.panelSessionTable[panelKey].isVideo = true

    // disconnect existing sound-only video session
    if (session.withVideo) {
      this.phone.setWithVideo(session.sessionId, false)
    }
    // set muted of video client
    this.phone.setMuted(
      {
        videoClient:
          this.panelSessionTable[panelKey].cameraMuted &&
          !this.panelSessionTable[panelKey].isScreen,
      },
      session.sessionId,
    )
    // start video session
    this.phone.setWithVideo(
      session.sessionId,
      true,
      this.getVideoOptions(panelKey),
      JSON.stringify({
        soundOnly: false,
      }),
    )
  } else {
    // set muted of video client
    this.phone.setMuted(
      {
        videoClient:
          this.panelSessionTable[panelKey].cameraMuted &&
          !this.panelSessionTable[panelKey].isScreen,
      },
      session.sessionId,
    )
  }
  this.render()
}
uiData.prototype.callScreenToggleButton_onClick = function (
  panelType,
  panelCode,
  ev,
) {
  var panelKey = panelType + '_' + panelCode
  if (!this.phone) {
    this.ucUiStore.getLogger().log('warn', 'empty phone')
    return
  }
  if (this.phone.getPhoneStatus() !== 'started') {
    this.ucUiStore
      .getLogger()
      .log('warn', 'phoneStatus is ' + this.phone.getPhoneStatus())
    return
  }
  if (!this.panelSessionTable[panelKey]) {
    this.ucUiStore
      .getLogger()
      .log('warn', 'empty this.panelSessionTable["' + panelKey + '"]')
    return
  }
  var session = this.phone.getSession(
    this.panelSessionTable[panelKey].sessionId,
  )
  if (!session) {
    this.ucUiStore.getLogger().log('warn', 'empty session')
    return
  }
  if (session.sessionStatus !== 'connected') {
    this.ucUiStore
      .getLogger()
      .log('warn', 'sessionStatus is ' + session.sessionStatus)
    return
  }

  // change video on and toggle screen on / off
  this.panelSessionTable[panelKey].isVideo = true
  this.panelSessionTable[panelKey].isScreen = !Boolean(
    this.panelSessionTable[panelKey].isScreen,
  )

  // disconnect existing video session
  if (session.withVideo) {
    this.phone.setWithVideo(session.sessionId, false)
  }
  // set muted of video client
  this.phone.setMuted(
    {
      videoClient:
        this.panelSessionTable[panelKey].cameraMuted &&
        !this.panelSessionTable[panelKey].isScreen,
    },
    session.sessionId,
  )
  // start video session
  this.phone.setWithVideo(
    session.sessionId,
    true,
    this.getVideoOptions(panelKey),
    JSON.stringify({
      soundOnly: false,
    }),
  )
}
uiData.prototype.callVideoRefreshButton_onClick = function (
  panelType,
  panelCode,
  ev,
) {
  var panelKey = panelType + '_' + panelCode
  if (!this.phone) {
    this.ucUiStore.getLogger().log('warn', 'empty phone')
    return
  }
  if (this.phone.getPhoneStatus() !== 'started') {
    this.ucUiStore
      .getLogger()
      .log('warn', 'phoneStatus is ' + this.phone.getPhoneStatus())
    return
  }
  if (!this.panelSessionTable[panelKey]) {
    this.ucUiStore
      .getLogger()
      .log('warn', 'empty this.panelSessionTable["' + panelKey + '"]')
    return
  }
  var session = this.phone.getSession(
    this.panelSessionTable[panelKey].sessionId,
  )
  if (!session) {
    this.ucUiStore.getLogger().log('warn', 'empty session')
    return
  }
  if (session.sessionStatus !== 'connected') {
    this.ucUiStore
      .getLogger()
      .log('warn', 'sessionStatus is ' + session.sessionStatus)
    return
  }
  if (!session.withVideo) {
    this.ucUiStore.getLogger().log('warn', 'withVideo is falsy')
    return
  }

  // disconnect existing video session
  this.phone.setWithVideo(session.sessionId, false)
  // restart video session
  this.phone.setWithVideo(
    session.sessionId,
    true,
    this.getVideoOptions(panelKey),
    JSON.stringify({
      soundOnly: !Boolean(this.panelSessionTable[panelKey].isVideo),
    }),
  )
}
uiData.prototype.callHangUpButton_onClick = function (
  panelType,
  panelCode,
  ev,
) {
  var panelKey = panelType + '_' + panelCode
  if (!this.phone) {
    this.ucUiStore.getLogger().log('warn', 'empty phone')
    return
  }
  if (!this.panelSessionTable[panelKey]) {
    this.ucUiStore
      .getLogger()
      .log('warn', 'empty this.panelSessionTable["' + panelKey + '"]')
    return
  }
  var session = this.phone.getSession(
    this.panelSessionTable[panelKey].sessionId,
  )
  if (!session) {
    // outgoing session not created yet
    this.ucUiStore.getLogger().log('info', 'empty session')
    delete this.panelSessionTable[panelKey]
    // terminate session at sessionCreated or rtcErrorOccurred
    return
  }
  if (!session.rtcSession || !session.rtcSession.terminate) {
    this.ucUiStore.getLogger().log('warn', 'empty session.rtcSession.terminate')
    return
  }
  session.rtcSession.terminate()
}
uiData.prototype.historySummariesPanelOpenDetailButton_onClick = function (
  panelType,
  panelCode,
  searchResultId,
  peer,
  historyDetailName,
  ev,
) {
  var _this28 = this
  var newPanelType = 'HISTORYDETAIL'
  var newPanelCode = (0, _strings.string)(++this.panelCodeCounter)
  this.historyDetailWorkTable[newPanelCode] = {
    chatPanelCode:
      peer && peer.user_id
        ? JSON.stringify({
            tenant: (0, _strings.string)(peer.tenant),
            user_id: (0, _strings.string)(peer.user_id),
          })
        : '',
    historyDetailName: historyDetailName,
  }
  if (
    this.ucUiStore.getChatList({
      chatType: 'SEARCHRESULTDETAIL',
      chatCode: searchResultId,
    }).length
  ) {
    this.ucUiAction.copyChatList({
      chatTypeSource: 'SEARCHRESULTDETAIL',
      chatCodeSource: searchResultId,
      chatTypeTarget: newPanelType,
      chatCodeTarget: newPanelCode,
    })
    this.updateTab({
      open: {
        panelType: newPanelType,
        panelCode: newPanelCode,
        sourcePanelType: panelType,
        sourcePanelCode: panelCode,
      },
      select: {
        panelType: newPanelType,
        panelCode: newPanelCode,
      },
    })
  } else {
    this.updateTab({
      open: {
        panelType: newPanelType,
        panelCode: newPanelCode,
        sourcePanelType: panelType,
        sourcePanelCode: panelCode,
      },
      select: {
        panelType: newPanelType,
        panelCode: newPanelCode,
      },
    })
    this.ucUiAction.expandSearchResult({
      chatType: panelType,
      chatCode: panelCode,
      searchResultIds: [searchResultId],
    })
    this.ucUiAction.expandSearchResult({
      chatType: panelType,
      chatCode: panelCode,
      searchResultIds: [searchResultId],
    })
    var count = 0
    var _funcCopy = function funcCopy() {
      if (
        _this28.ucUiStore.getChatList({
          chatType: 'SEARCHRESULTDETAIL',
          chatCode: searchResultId,
        }).length
      ) {
        _this28.ucUiAction.copyChatList({
          chatTypeSource: 'SEARCHRESULTDETAIL',
          chatCodeSource: searchResultId,
          chatTypeTarget: newPanelType,
          chatCodeTarget: newPanelCode,
        })
      } else if (count < 20) {
        setTimeout(_funcCopy, 100 * ++count)
      }
    }
    setTimeout(_funcCopy, 0)
  }
}
uiData.prototype.historySummariesPanelContinuationButton_onClick = function (
  panelType,
  panelCode,
  searchResultId,
  replyType,
  ev,
) {
  var _this29 = this
  var profile = this.ucUiStore.getChatClient().getProfile()
  var searchResult =
    this.ucUiStore.getSearchResults({
      chatType: panelType,
      chatCode: panelCode,
      searchResultIds: [searchResultId],
    })[0] || {}
  var chatCode = this.ucUiStore.getChatCodeByConfId({
    conf_id: searchResult._conf_id,
    yyyymm: searchResult._yyyymm,
  }).chatCode
  if (!chatCode) {
    this.ucUiAction.createConferenceChatHeaderFromSearchResult({
      chatType: panelType,
      chatCode: panelCode,
      searchResultId: searchResultId,
    })
    chatCode = this.ucUiStore.getChatCodeByConfId({
      conf_id: searchResult._conf_id,
      yyyymm: searchResult._yyyymm,
    }).chatCode
  }
  if (
    !this.ucUiStore.getChatList({
      chatType: 'CONFERENCE',
      chatCode: chatCode,
    }).length
  ) {
    if (
      this.ucUiStore.getChatList({
        chatType: 'SEARCHRESULTDETAIL',
        chatCode: searchResultId,
      }).length
    ) {
      this.ucUiAction.copyChatList({
        chatTypeSource: 'SEARCHRESULTDETAIL',
        chatCodeSource: searchResultId,
        chatTypeTarget: 'CONFERENCE',
        chatCodeTarget: chatCode,
      })
    } else {
      this.ucUiAction.expandSearchResult({
        chatType: panelType,
        chatCode: panelCode,
        searchResultIds: [searchResultId],
      })
      this.ucUiAction.expandSearchResult({
        chatType: panelType,
        chatCode: panelCode,
        searchResultIds: [searchResultId],
      })
      var count = 0
      var _funcCopy2 = function funcCopy() {
        if (
          _this29.ucUiStore.getChatList({
            chatType: 'SEARCHRESULTDETAIL',
            chatCode: searchResultId,
          }).length
        ) {
          _this29.ucUiAction.copyChatList({
            chatTypeSource: 'SEARCHRESULTDETAIL',
            chatCodeSource: searchResultId,
            chatTypeTarget: 'CONFERENCE',
            chatCodeTarget: chatCode,
          })
        } else if (count < 20) {
          setTimeout(_funcCopy2, 100 * ++count)
        }
      }
      setTimeout(_funcCopy2, 0)
    }
  }
  this.replyContinuation(
    searchResult._yyyymm,
    searchResult._conf_id,
    replyType,
    searchResult.originalWebchatId,
    false,
    null,
  )
}
uiData.prototype.preferenceProfileImagePreview_onClick = function (
  panelType,
  panelCode,
  ev,
) {
  var _this30 = this
  if (!this.preferenceWorkTable[panelCode]) {
    this.ucUiStore
      .getLogger()
      .log('warn', 'empty preferenceWorkTable["' + panelCode + '"]')
    return
  }
  if (this.preferenceWorkTable[panelCode].profileImageUploading) {
    this.ucUiStore
      .getLogger()
      .log(
        'info',
        'this.preferenceWorkTable["' +
          panelCode +
          '"].profileImageUploading is true',
      )
    return
  }
  if (
    !this.preferenceWorkTable[panelCode].profileImageUrl ||
    this.preferenceWorkTable[panelCode].profileImageTo === 'DELETE'
  ) {
    this.ucUiStore.getLogger().log('info', 'no image')
    return
  }
  var url = (0, _strings.string)(
    this.preferenceWorkTable[panelCode].profileImageUrl,
  ).replace('&SIZE=40', '&SIZE=ORIGINAL')
  // convert to data uri scheme (internet explorer cannot display img from blob url scheme on another window)
  if (
    typeof Blob !== 'undefined' &&
    typeof XMLHttpRequest !== 'undefined' &&
    typeof FileReader !== 'undefined'
  ) {
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 1) {
        xhr.responseType = 'blob'
      } else if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var fileReader = new window.FileReader()
          fileReader.onload = function () {
            // open new window and display full size image
            var url = (0, _strings.string)(
              _this30.ownerDocument.defaultView &&
                _this30.ownerDocument.defaultView.location &&
                _this30.ownerDocument.defaultView.location.href,
            )
            url += (url.indexOf('?') === -1 ? '?' : '&') + 'image'
            var win = window.open(url, null)
            if (win) {
              setTimeout(function () {
                win.document.open()
                win.document.write(
                  '<!doctype html><html><body><img src="' +
                    fileReader.result +
                    '"></body></html>',
                )
                win.document.close()
              }, 0)
            } else {
              _this30.ucUiStore.getLogger().log('warn', 'window.open error')
            }
          }
          fileReader.readAsDataURL(xhr.response)
        }
      }
    }
    xhr.open('GET', url)
    xhr.send()
  }
}
uiData.prototype.preferenceProfileImageUploadInput_onChange = function (
  panelType,
  panelCode,
  ev,
) {
  var _this31 = this
  if (!this.preferenceWorkTable[panelCode]) {
    this.ucUiStore
      .getLogger()
      .log('warn', 'empty preferenceWorkTable["' + panelCode + '"]')
    return
  }
  if (this.preferenceWorkTable[panelCode].profileImageUploading) {
    this.ucUiStore
      .getLogger()
      .log(
        'info',
        'this.preferenceWorkTable["' +
          panelCode +
          '"].profileImageUploading is true',
      )
    return
  }
  var input = ev && ev.target
  if (!input || !input.value) {
    this.ucUiStore.getLogger().log('info', 'empty input.value')
    return
  }
  this.preferenceWorkTable[panelCode].profileImageUploading = true
  this.ucUiStore.getChatClient().uploadProfileImage(
    ev.target,
    function (ev) {
      input.value = ''
      _this31.preferenceWorkTable[panelCode].profileImageUrl = ev.url
      _this31.preferenceWorkTable[panelCode].profileImageUploading = false
      _this31.preferenceWorkTable[panelCode].profileImageTo = 'SAVE'
      _this31.render()
    },
    function (ev) {
      _this31.ucUiStore
        .getLogger()
        .log(
          'warn',
          'chatClient.uploadProfileImage error code=' +
            ev.code +
            ', message=' +
            ev.message,
        )
      input.value = ''
      var profile = _this31.ucUiStore.getChatClient().getProfile()
      var userMe = _this31.ucUiStore.getBuddyUserForUi(profile)
      _this31.preferenceWorkTable[panelCode].profileImageUrl =
        userMe.profile_image_url
      _this31.preferenceWorkTable[panelCode].profileImageUploading = false
      _this31.preferenceWorkTable[panelCode].profileImageTo = ''
      _this31.showModal({
        title: _uawmsgs.default.CMN_ALERT,
        message:
          _uawmsgs.default.MSG_PREFERENCE_PROFILE_IMAGE_UPLOAD_FAILED +
          '\n(' +
          ev.code +
          ' ' +
          ev.message +
          ')',
      })
    },
  )
  this.render()
}
uiData.prototype.preferenceChatBgColorStandard_onClick = function (
  panelType,
  panelCode,
  ev,
) {
  if (!this.preferenceWorkTable[panelCode]) {
    this.ucUiStore
      .getLogger()
      .log('warn', 'empty preferenceWorkTable["' + panelCode + '"]')
    return
  }
  if (this.preferenceWorkTable[panelCode].chatBgColor) {
    this.preferenceWorkTable[panelCode].chatBgColorBk =
      this.preferenceWorkTable[panelCode].chatBgColor
  }
  this.preferenceWorkTable[panelCode].chatBgColor = ''
  this.render()
}
uiData.prototype.preferenceChatBgColorCustom_onClick = function (
  panelType,
  panelCode,
  ev,
) {
  var _this32 = this
  if (!this.preferenceWorkTable[panelCode]) {
    this.ucUiStore
      .getLogger()
      .log('warn', 'empty preferenceWorkTable["' + panelCode + '"]')
    return
  }
  if (this.preferenceWorkTable[panelCode].chatBgColor) {
    this.preferenceWorkTable[panelCode].chatBgColorBk =
      this.preferenceWorkTable[panelCode].chatBgColor
  } else {
    this.preferenceWorkTable[panelCode].chatBgColor =
      this.preferenceWorkTable[panelCode].chatBgColorBk || '{ "list": [] }'
  }
  this.showModal({
    title: _uawmsgs.default.MSG_PREFERENCE_CHAT_BG_COLOR_EDIT_DIALOG_TITLE,
    contentClass: 'BgColorEditForm',
    contentParams: {
      panelCode: panelCode,
    },
    cancelable: true,
    onOk: function onOk(ev) {
      if (
        ev &&
        ev.content &&
        ev.content.state &&
        ev.content.state.nowEditing !== null
      ) {
        ev.content.handleBgColorEditEntryItemEditButtonClick(
          ev.content.state.nowEditing,
        )
      }
      _this32.render()
    },
    onCancel: function onCancel(ev) {
      _this32.preferenceWorkTable[panelCode].chatBgColor =
        _this32.preferenceWorkTable[panelCode].chatBgColorBk
      _this32.render()
    },
  })
}
uiData.prototype.preferenceLampTypeTestTimer_onTick = function (
  panelType,
  panelCode,
) {
  var _this33 = this
  if (!this.preferenceWorkTable[panelCode]) {
    this.ucUiStore
      .getLogger()
      .log('warn', 'empty preferenceWorkTable["' + panelCode + '"]')
    return
  }
  this.ucUiStore.getLogger().log('debug', 'lamp type test notification started')
  this.preferenceWorkTable[panelCode].lampTypeTestingNow = true
  var evObj = {
    chatKeys: [panelType + '_' + panelCode],
    notificationProperties: {
      title: _uawmsgs.default.MSG_PREFERENCE_LAMP_TYPE_TEST_NOTIFICATION_TITLE,
      body: _uawmsgs.default.MSG_PREFERENCE_LAMP_TYPE_TEST_NOTIFICATION_BODY,
    },
    funcOnSelected: function funcOnSelected() {
      _this33.render()
      setTimeout(function () {
        _this33.ucUiStore
          .getLogger()
          .log('debug', 'lamp type test notification stopped')
        if (
          _this33.preferenceWorkTable[panelCode] &&
          _this33.preferenceWorkTable[panelCode].lampTypeTestingNow
        ) {
          _this33.preferenceWorkTable[panelCode].lampTypeTestingNow = false
        }
      }, 0)
    },
  }
  this.checkRequiresNotification(evObj)
  if (evObj.notificationFunction) {
    evObj.notificationFunction()
  }
  this.render()
}
uiData.prototype.preferenceSaveButton_onClick = function (
  panelType,
  panelCode,
  ev,
) {
  var _this34 = this
  // save preference
  if (!this.preferenceWorkTable[panelCode]) {
    this.ucUiStore
      .getLogger()
      .log('warn', 'empty preferenceWorkTable["' + panelCode + '"]')
    return
  }
  if (this.preferenceWorkTable[panelCode].nowSaving) {
    this.ucUiStore
      .getLogger()
      .log(
        'info',
        'this.preferenceWorkTable["' + panelCode + '"].nowSaving is true',
      )
    return
  }
  if (this.preferenceWorkTable[panelCode].profileImageUploading) {
    this.ucUiStore
      .getLogger()
      .log(
        'info',
        'this.preferenceWorkTable["' +
          panelCode +
          '"].profileImageUploading is true',
      )
    this.preferenceWorkTable[panelCode].saveMessage =
      _uawmsgs.default.MSG_PREFERENCE_SAVE_FAILED +
      ' (' +
      _uawmsgs.default.MSG_PREFERENCE_SAVE_TRANSFERRING +
      ')'
    this.render()
    return
  }

  // check validity
  if (!this.preferenceWorkTable[panelCode].loginPasswordLocked) {
    if (
      this.preferenceWorkTable[panelCode].loginPassword !==
      this.preferenceWorkTable[panelCode].loginPasswordConfirm
    ) {
      this.ucUiStore
        .getLogger()
        .log('info', 'The passwords you typed did not match')
      this.preferenceWorkTable[panelCode].saveMessage =
        _uawmsgs.default.MSG_PREFERENCE_SAVE_FAILED +
        ' (The passwords you typed did not match)'
      this.render()
      return
    }
    if (!this.preferenceWorkTable[panelCode].loginPassword) {
      this.ucUiStore.getLogger().log('info', 'Invalid login password value')
      this.preferenceWorkTable[panelCode].saveMessage =
        _uawmsgs.default.MSG_PREFERENCE_SAVE_FAILED +
        ' (Invalid login password value)'
      this.render()
      return
    }
  }
  if (!this.preferenceWorkTable[panelCode].displayPeriodLocked) {
    if (
      (0, _strings.int)(this.preferenceWorkTable[panelCode].displayPeriod) < 1
    ) {
      this.ucUiStore.getLogger().log('info', 'Invalid display period value')
      this.preferenceWorkTable[panelCode].saveMessage =
        _uawmsgs.default.MSG_PREFERENCE_SAVE_FAILED +
        ' (Invalid display period value)'
      this.render()
      return
    }
  }
  if (!this.preferenceWorkTable[panelCode].chatBgColorLocked) {
    if (this.preferenceWorkTable[panelCode].chatBgColor) {
      try {
        JSON.parse(this.preferenceWorkTable[panelCode].chatBgColor)
      } catch (ex) {
        this.ucUiStore.getLogger().log('warn', ex)
        this.ucUiStore.getLogger().log('info', 'Invalid chat bg color value')
        this.preferenceWorkTable[panelCode].saveMessage =
          _uawmsgs.default.MSG_PREFERENCE_SAVE_FAILED +
          ' (Invalid chat bg color value)'
        this.render()
        return
      }
    }
  }
  if (!this.preferenceWorkTable[panelCode].dbgoptLocked) {
    if (
      (0, _strings.int)(this.preferenceWorkTable[panelCode].dbgopt) < 1 &&
      (0, _strings.string)(this.preferenceWorkTable[panelCode].dbgopt) !== ''
    ) {
      this.ucUiStore.getLogger().log('info', 'Invalid debug options value')
      this.preferenceWorkTable[panelCode].saveMessage =
        _uawmsgs.default.MSG_PREFERENCE_SAVE_FAILED +
        ' (Invalid debug options value)'
      this.render()
      return
    }
  }
  if (this.ucUiStore.getSignInStatus() !== 3) {
    this.ucUiStore
      .getLogger()
      .log('info', 'not signed-in at preferenceSaveButton_onClick')
    this.preferenceWorkTable[panelCode].saveMessage =
      _uawmsgs.default.MSG_PREFERENCE_SAVE_FAILED
    this.render()
    return
  }
  var localStoragePreferenceOrg = this.ucUiStore.getLocalStoragePreference({
    keyList: ['webRTCDisabled', 'webRTCTypeName'],
  })
  var webRTCDisabledOrg = Boolean(localStoragePreferenceOrg[0])
  var webRTCTypeNameOrg = (0, _strings.string)(localStoragePreferenceOrg[1])
  if (
    this.phone &&
    this.phone.getSessionCount &&
    this.phone.getSessionCount() &&
    (this.preferenceWorkTable[panelCode].webRTCDisabled ||
      webRTCTypeNameOrg !== this.preferenceWorkTable[panelCode].webRTCTypeName)
  ) {
    this.ucUiStore
      .getLogger()
      .log('info', 'now calling at preferenceSaveButton_onClick')
    this.preferenceWorkTable[panelCode].saveMessage =
      _uawmsgs.default.MSG_PREFERENCE_SAVE_FAILED +
      ' (' +
      _uawmsgs.default.MSG_PREFERENCE_SAVE_CALLING +
      ')'
    this.render()
    return
  }
  this.preferenceWorkTable[panelCode].nowSaving = true
  this.preferenceWorkTable[panelCode].lampTypeTestingNow = false
  var profile = this.ucUiStore.getChatClient().getProfile()
  var settings = this.ucUiStore.getChatClient().getSettings()
  if (!settings.optional_settings) {
    settings.optional_settings = {}
  }
  settings.initial_status = this.preferenceWorkTable[panelCode].initialStatus
  if (!this.preferenceWorkTable[panelCode].statusOptionsEnabledLocked) {
    settings.optional_settings.status_options_enabled = Boolean(
      this.preferenceWorkTable[panelCode].statusOptionsEnabled,
    )
  }
  if (!this.preferenceWorkTable[panelCode].statusOptionsEnabledLocked) {
    settings.optional_settings.status_options =
      this.preferenceWorkTable[panelCode].statusOptions
  }
  if (!this.preferenceWorkTable[panelCode].languageDisabled) {
    settings.optional_settings.user_language =
      this.preferenceWorkTable[panelCode].userLanguage
  }
  if (
    !this.preferenceWorkTable[panelCode].loginPasswordLocked &&
    this.preferenceWorkTable[panelCode].loginPassword !==
      this.preferenceWorkTable[panelCode].loginPasswordPlaceholder
  ) {
    profile.password = (0, _strings.string)(
      this.preferenceWorkTable[panelCode].loginPassword,
    )
  }
  if (!this.preferenceWorkTable[panelCode].displayNameLocked) {
    settings.optional_settings.display_name = (0, _strings.string)(
      this.preferenceWorkTable[panelCode].displayName,
    )
  }
  if (!this.preferenceWorkTable[panelCode].sendingConfirmationLocked) {
    settings.optional_settings.sending_confirmation = Boolean(
      this.preferenceWorkTable[panelCode].sendingConfirmation,
    )
  }
  if (!this.preferenceWorkTable[panelCode].nameDisplayModeLocked) {
    settings.optional_settings.name_display_mode = (0, _strings.int)(
      this.preferenceWorkTable[panelCode].nameDisplayMode,
    )
  }
  if (!this.preferenceWorkTable[panelCode].notifyCallStatusLocked) {
    settings.optional_settings.notify_call_status = Boolean(
      this.preferenceWorkTable[panelCode].notifyCallStatus,
    )
  }
  if (!this.preferenceWorkTable[panelCode].notifyConfStatusLocked) {
    settings.optional_settings.notify_conf_status = Boolean(
      this.preferenceWorkTable[panelCode].notifyConfStatus,
    )
  }
  if (!this.preferenceWorkTable[panelCode].dtmfShortcutLocked) {
    settings.optional_settings.dtmf_shortcut = (0, _strings.int)(
      this.preferenceWorkTable[panelCode].dtmfShortcut,
    )
  }
  if (!this.preferenceWorkTable[panelCode].displayPeriodLocked) {
    settings.optional_settings.display_period = (0, _strings.int)(
      this.preferenceWorkTable[panelCode].displayPeriod,
    )
  }
  if (!this.preferenceWorkTable[panelCode].chatBgColorLocked) {
    settings.optional_settings.chat_bg_color = (0, _strings.string)(
      this.preferenceWorkTable[panelCode].chatBgColor,
    )
    settings.optional_settings.chat_bg_color_bk = (0, _strings.string)(
      this.preferenceWorkTable[panelCode].chatBgColorBk,
    )
  }
  if (!this.preferenceWorkTable[panelCode].dbgoptLocked) {
    settings.optional_settings.dbgopt = (0, _strings.int)(
      this.preferenceWorkTable[panelCode].dbgopt,
    )
  }
  this.preferenceWorkTable[panelCode].saveMessage = ''
  this.ucUiStore.getChatClient().saveProperties(
    profile,
    settings,
    null,
    function (ev) {
      // save to localStorage
      _this34.ucUiAction.setLocalStoragePreference({
        keyValueList: [
          {
            key: 'autoSignIn',
            value: _this34.preferenceWorkTable[panelCode].autoSignIn
              ? 'true'
              : '',
          },
          {
            key: 'webRTCDisabled',
            value: _this34.preferenceWorkTable[panelCode].webRTCDisabled
              ? 'true'
              : '',
          },
          {
            key: 'webRTCTypeName',
            value: (0, _strings.string)(
              _this34.preferenceWorkTable[panelCode].webRTCTypeName,
            ),
          },
          {
            key: 'noVideoMode',
            value: (0, _strings.string)(
              _this34.preferenceWorkTable[panelCode].noVideoMode,
            ),
          },
          {
            key: 'audioSource',
            value: (0, _strings.string)(
              _this34.preferenceWorkTable[panelCode].audioSource,
            ),
          },
          {
            key: 'audioTarget',
            value: (0, _strings.string)(
              _this34.preferenceWorkTable[panelCode].audioTarget,
            ),
          },
          {
            key: 'videoSource',
            value: (0, _strings.string)(
              _this34.preferenceWorkTable[panelCode].videoSource,
            ),
          },
          {
            key: 'lampTypeName',
            value: (0, _strings.string)(
              _this34.preferenceWorkTable[panelCode].lampTypeName,
            ),
          },
          {
            key: 'bellAudioTarget',
            value: (0, _strings.string)(
              _this34.preferenceWorkTable[panelCode].bellAudioTarget,
            ),
          },
        ],
      })
      // save to localStorage for ucindex
      if (_this34.preferenceWorkTable[panelCode].autoSignIn) {
        try {
          var signInOption = _this34.ucUiStore.getSignInOption()
          _asyncStorage.default.setItem('UC.ucindex.rememberme', 'on')
          _asyncStorage.default.setItem('UC.ucindex.user', signInOption.user)
          _asyncStorage.default.setItem('UC.ucindex.pass', signInOption.pass)
          _asyncStorage.default.setItem(
            'UC.ucindex.tenant',
            signInOption.tenant,
          )
        } catch (ex) {
          _this34.ucUiStore
            .getLogger()
            .log('warn', 'localStorage.setItem error ex=' + ex)
        }
      }
      // reload language
      _this34.loadLanguage()
      // re-init WebRTC
      if (_this34.preferenceWorkTable[panelCode].webRTCDisabled) {
        if (!webRTCDisabledOrg) {
          _this34.shutdownPhone()
        }
      } else {
        if (webRTCDisabledOrg) {
          _this34.startupPhone()
        } else if (
          webRTCTypeNameOrg !==
          _this34.preferenceWorkTable[panelCode].webRTCTypeName
        ) {
          _this34.shutdownPhone()
          _this34.startupPhone()
        } else {
          _this34.setPhoneDefaultOptions()
        }
      }
      // re-notify status
      _this34.notifyCallStatus()
      var successfulFunc = function successfulFunc() {
        _this34.preferenceWorkTable[panelCode].saveMessage =
          _uawmsgs.default.MSG_PREFERENCE_SAVE_SUCCESSFUL +
          ' ' +
          (0, _strings.formatTime)()
        var profile = _this34.ucUiStore.getChatClient().getProfile()
        _this34.ucUiStore.addToBuddyTable(profile)
        var userMe = _this34.ucUiStore.getBuddyUserForUi(profile)
        _this34.preferenceWorkTable[panelCode].profileImageUrl =
          userMe.profile_image_url
        _this34.preferenceWorkTable[panelCode].profileImageTo = ''
        _this34.preferenceWorkTable[panelCode].nowSaving = false
        _this34.render()
      }
      // save profile image
      if (_this34.preferenceWorkTable[panelCode].profileImageTo === 'SAVE') {
        _this34.ucUiStore
          .getChatClient()
          .saveProfileImage({}, successfulFunc, function (ev) {
            _this34.ucUiStore
              .getLogger()
              .log(
                'warn',
                'chatClient.saveProfileImage error code=' +
                  ev.code +
                  ', message=' +
                  ev.message,
              )
            _this34.preferenceWorkTable[panelCode].saveMessage =
              _uawmsgs.default.MSG_PREFERENCE_SAVE_FAILED +
              ' (' +
              ev.code +
              ' ' +
              ev.message +
              ')'
            _this34.preferenceWorkTable[panelCode].nowSaving = false
            _this34.render()
          })
      } else if (
        _this34.preferenceWorkTable[panelCode].profileImageTo === 'DELETE'
      ) {
        _this34.ucUiStore
          .getChatClient()
          .deleteProfileImage({}, successfulFunc, function (ev) {
            _this34.ucUiStore
              .getLogger()
              .log(
                'warn',
                'chatClient.deleteProfileImage error code=' +
                  ev.code +
                  ', message=' +
                  ev.message,
              )
            _this34.preferenceWorkTable[panelCode].saveMessage =
              _uawmsgs.default.MSG_PREFERENCE_SAVE_FAILED +
              ' (' +
              ev.code +
              ' ' +
              ev.message +
              ')'
            _this34.preferenceWorkTable[panelCode].nowSaving = false
            _this34.render()
          })
      } else {
        successfulFunc()
      }
    },
    function (ev) {
      _this34.ucUiStore
        .getLogger()
        .log(
          'warn',
          'chatClient.saveProperties error code=' +
            ev.code +
            ', message=' +
            ev.message,
        )
      _this34.preferenceWorkTable[panelCode].saveMessage =
        _uawmsgs.default.MSG_PREFERENCE_SAVE_FAILED +
        ' (' +
        ev.code +
        ' ' +
        ev.message +
        ')'
      _this34.preferenceWorkTable[panelCode].nowSaving = false
      _this34.render()
    },
  )
  this.render()
}
uiData.prototype.webchatQueueShowAllLink_onClick = function (ev) {
  var panelType = 'WEBCHATQUEUE'
  var panelCode = 'static'
  this.closeAllshowingDialogs()
  var subWindow = this.subWindowList.find(function (p) {
    return p.panelType === panelType && p.panelCode === panelCode
  })
  if (subWindow) {
    subWindow.window.focus()
    this.render()
  } else if (
    this.iconName ||
    this.dialogPanel ||
    this.staticPanel ||
    this.chatOnly ||
    this.isSubWindow
  ) {
    this.render()
  } else {
    this.updateTab({
      open: {
        panelType: panelType,
        panelCode: panelCode,
      },
      select: {
        panelType: panelType,
        panelCode: panelCode,
      },
    })
  }
}
uiData.prototype.webchatQueueResizableBox_onResizeStop = function (rect) {
  this.dialogResizeStopTime = +new Date()
  this.dialogSizeTable['webchatqueue'] = {
    width: rect.width,
    height: rect.height,
  }
}
uiData.prototype.webchatPickupButton_onClick = function (data, ev) {
  var _this35 = this
  var webchatQueue = this.ucUiStore
    .getWebchatQueueList()
    .find(function (webchatQueue) {
      var conf_id = webchatQueue.conf_id
      var conference = _this35.ucUiStore.getChatClient().getConference(conf_id)
      return (
        conference.conf_status ===
        _constants.default.CONF_STATUS_INVITED_WEBCHAT
      )
    })
  if (webchatQueue) {
    var conf_id = webchatQueue.conf_id
    data.conf_id = conf_id
    this.ucUiAction.joinWebchatRoom({
      conf_id: conf_id,
      properties: {
        invisible: false,
        exclusive: true,
      },
    })
    this.updateTab({
      select: {
        panelType: 'CONFERENCE',
        panelCode: (0, _strings.string)(
          this.ucUiStore.getChatCodeByConfId({
            conf_id: conf_id,
          }).chatCode,
        ),
      },
    })
    this.render()
  }
}
uiData.prototype.webchatRoomChatButton_onClick = function (conf_id, ev) {
  var panelType = 'CONFERENCE'
  var panelCode = (0, _strings.string)(
    this.ucUiStore.getChatCodeByConfId({
      conf_id: conf_id,
    }).chatCode,
  )
  this.closeAllshowingDialogs()
  var conference = this.ucUiStore.getChatClient().getConference(conf_id)
  if (
    conference.conf_status === _constants.default.CONF_STATUS_INVITED_WEBCHAT
  ) {
    this.ucUiAction.joinWebchatRoom({
      conf_id: conf_id,
      properties: {
        invisible: false,
        exclusive: true,
      },
    })
    this.updateTab({
      select: {
        panelType: panelType,
        panelCode: panelCode,
      },
    })
  } else if (conference.conf_status === _constants.default.CONF_STATUS_JOINED) {
    var subWindow = this.subWindowList.find(function (p) {
      return p.panelType === panelType && p.panelCode === panelCode
    })
    if (subWindow) {
      subWindow.window.focus()
      this.render()
    } else if (
      this.iconName ||
      this.dialogPanel ||
      this.staticPanel ||
      this.chatOnly ||
      this.isSubWindow
    ) {
      this.render()
    } else {
      this.updateTab({
        open: {
          panelType: panelType,
          panelCode: panelCode,
        },
        select: {
          panelType: panelType,
          panelCode: panelCode,
        },
      })
    }
  }
}
uiData.prototype.webchatRoomJoinButton_onClick = function (conf_id, ev) {
  var panelType = 'CONFERENCE'
  var panelCode = (0, _strings.string)(
    this.ucUiStore.getChatCodeByConfId({
      conf_id: conf_id,
    }).chatCode,
  )
  this.ucUiAction.joinWebchatRoom({
    conf_id: conf_id,
    properties: {
      invisible: false,
      exclusive: false,
    },
  })
  var subWindow = this.subWindowList.find(function (p) {
    return p.panelType === panelType && p.panelCode === panelCode
  })
  if (subWindow) {
    subWindow.window.focus()
  }
  this.closeAllshowingDialogs()
  this.updateTab({
    select: {
      panelType: 'CONFERENCE',
      panelCode: panelCode,
    },
  })
  this.render()
}
uiData.prototype.webchatDropButton_onClick = function (data, ev) {
  var panel = (0, _strings.parsePanelKey)(this.currentSelectedTab)
  if (panel.panelType === 'CONFERENCE') {
    var conf_id = (0, _strings.string)(
      this.ucUiStore.getChatHeaderInfo({
        chatType: panel.panelType,
        chatCode: panel.panelCode,
      }).conf_id,
    )
    var conference = this.ucUiStore.getChatClient().getConference(conf_id)
    if (conference.conf_status === _constants.default.CONF_STATUS_JOINED) {
      this.showModal({
        title: _uawmsgs.default.MSG_DROP_TALKING_WEBCHAT_CONFIRM_TITLE,
        message: _uawmsgs.default.MSG_DROP_TALKING_WEBCHAT_CONFIRM,
        cancelable: true,
        onOk: this.ucUiAction.leaveConference.bind(this.ucUiAction, {
          conf_id: conf_id,
        }),
      })
    }
  }
}
uiData.prototype.webchatRoomHideButton_onClick = function (conf_id, ev) {
  this.ucUiAction.clearWebchatQueue({
    conf_id: conf_id,
  })
}
uiData.prototype.buddylistBuddy_onClick = function (buddy, ev) {
  var panelType = 'CHAT'
  var panelCode = JSON.stringify({
    tenant: buddy.tenant,
    user_id: buddy.user_id,
  })
  this.closeAllshowingDialogs()
  var subWindow = this.subWindowList.find(function (p) {
    return p.panelType === panelType && p.panelCode === panelCode
  })
  if (subWindow) {
    subWindow.window.focus()
    this.render()
  } else if (
    this.iconName ||
    this.dialogPanel ||
    this.staticPanel ||
    this.chatOnly ||
    this.isSubWindow
  ) {
    this.render()
  } else {
    this.updateTab({
      open: {
        panelType: panelType,
        panelCode: panelCode,
      },
      select: {
        panelType: panelType,
        panelCode: panelCode,
      },
    })
  }
}
// events from UcUiStore
uiData.prototype.signedIn = function () {
  this.notifiedSignedOut = false
  var signedInInfo = this.ucUiStore.getChatClient().getSignedInInfo()
  if (signedInInfo.localMode === 1) {
    this.licenseMessageAppx = 'localhost'
  } else if (signedInInfo.localMode === 2) {
    this.ucUiAction.signOut()
  }
  // load language
  this.loadLanguage()
  // init WebRTC
  this.startupPhone()
  // notify status
  this.notifyCallStatus()
}
uiData.prototype.signedOut = function () {
  this.shutdownPhone()
  var lastSignOutReason = this.ucUiStore.getLastSignOutReason()
  if (lastSignOutReason.code !== 1 && !this.notifiedSignedOut) {
    // notification
    var evObj = {
      chatKeys: [],
      nonPanelNotification: true,
      notificationProperties: {
        title: 'UC',
        body: _uawmsgs.default.MSG_MESSAGEBAR_DISCONNECTED,
        bellAudioClass: '__DO_NOT_RING_BELL__',
        noisiness: 0,
      },
    }
    this.checkRequiresNotification(evObj)
    if (evObj.notificationFunction) {
      evObj.notificationFunction()
    }
    this.notifiedSignedOut = true
  }
}
uiData.prototype.errorOccurred = function (ev) {
  if (ev) {
    this.showModal({
      title: _uawmsgs.default.CMN_ALERT,
      message:
        _uawmsgs.default[ev.errorType] +
        (ev.errorDetail ? '\n(' + ev.errorDetail + ')' : ''),
    })
  }
}
uiData.prototype.newMessage = function (ev) {
  if (
    ev &&
    ev.message &&
    !ev.message.isBroadcast &&
    ev.chatType !== 'SEARCHRESULTDETAIL'
  ) {
    if (
      !this.iconName &&
      !this.dialogPanel &&
      !this.staticPanel &&
      !this.chatOnly &&
      !this.isSubWindow
    ) {
      if (
        !this.subWindowList.find(function (p) {
          return p.panelType === ev.chatType && p.panelCode === ev.chatCode
        })
      ) {
        this.updateTab({
          open: {
            panelType: ev.chatType,
            panelCode: ev.chatCode,
          },
        })
      }
    }
  }
}
uiData.prototype.newConference = function (ev) {
  if (ev) {
    var conf_id = (0, _strings.string)(
      this.ucUiStore.getChatHeaderInfo(ev).conf_id,
    )
    var conference = this.ucUiStore.getChatClient().getConference(conf_id)
    var isWebchat =
      conference.invite_properties &&
      conference.invite_properties.webchatfromguest
    var isWebchatFromGuest =
      isWebchat && !conference.invite_properties.webchatfromguest.fromuser
    var profile = this.ucUiStore.getChatClient().getProfile()
    if (
      isWebchat &&
      conference.conf_status !== _constants.default.CONF_STATUS_INACTIVE
    ) {
      var continuationInfo =
        (conference.invite_properties &&
          conference.invite_properties.continuation_info) ||
        {}
      var outgoingContinuationInfo = null
      this.outgoingContinuationInfos = this.outgoingContinuationInfos.filter(
        function (info) {
          if (
            info.conf_id === continuationInfo.conf_id &&
            info.yyyymm === continuationInfo.yyyymm
          ) {
            outgoingContinuationInfo = info
            return false
          }
          return true
        },
      )
      if (outgoingContinuationInfo) {
        // answer automatically
        this.ucUiAction.joinWebchatRoom({
          conf_id: conf_id,
          properties: {
            invisible: false,
            exclusive: true,
          },
        })
      } else if (
        !this.iconName &&
        !this.dialogPanel &&
        !this.staticPanel &&
        !this.chatOnly &&
        !this.isSubWindow
      ) {
        if (this.configurations.queuePanel) {
          if (
            !this.subWindowList.find(function (p) {
              return p.panelType === 'WEBCHATQUEUE' && p.panelCode === 'static'
            })
          ) {
            this.updateTab({
              open: {
                panelType: 'WEBCHATQUEUE',
                panelCode: 'static',
              },
            })
          }
        }
      }
    }
    if (
      (!isWebchatFromGuest &&
        conference.conf_status === _constants.default.CONF_STATUS_INVITED) ||
      conference.conf_status === _constants.default.CONF_STATUS_JOINED
    ) {
      if (
        !this.iconName &&
        !this.dialogPanel &&
        !this.staticPanel &&
        !this.chatOnly &&
        !this.isSubWindow
      ) {
        if (
          !this.subWindowList.find(function (p) {
            return p.panelType === ev.chatType && p.panelCode === ev.chatCode
          })
        ) {
          if (
            conference.from &&
            profile &&
            conference.from.tenant === profile.tenant &&
            conference.from.user_id === profile.user_id
          ) {
            this.updateTab({
              open: {
                panelType: ev.chatType,
                panelCode: ev.chatCode,
              },
              select: {
                panelType: ev.chatType,
                panelCode: ev.chatCode,
              },
            })
          } else {
            this.updateTab({
              open: {
                panelType: ev.chatType,
                panelCode: ev.chatCode,
              },
            })
          }
        }
      }
    }
    if (this.unansweredWebchatsToKick[ev.chatCode]) {
      // delete webchat queue of unanswered webchat for other agents
      this.ucUiStore
        .getChatClient()
        .kickOutOfConference(this.unansweredWebchatsToKick[ev.chatCode])
      delete this.unansweredWebchatsToKick[ev.chatCode]
    }
  }
}
uiData.prototype.newWebchat = function (ev) {
  if (ev) {
    if (
      !this.iconName &&
      !this.dialogPanel &&
      !this.staticPanel &&
      !this.chatOnly &&
      !this.isSubWindow
    ) {
      if (
        !this.subWindowList.find(function (p) {
          return p.panelType === ev.chatType && p.panelCode === ev.chatCode
        })
      ) {
        this.updateTab({
          open: {
            panelType: ev.chatType,
            panelCode: ev.chatCode,
            sourcePanelType: 'WEBCHATQUEUE',
            sourcePanelCode: 'static',
          },
        })
      }
    }
  }
}
uiData.prototype.webchatLeft = function (ev) {
  if (ev) {
    if (
      ev.chatType === 'CONFERENCE' &&
      typeof this.funcOnWebchatLeft[ev.chatCode] === 'function'
    ) {
      this.funcOnWebchatLeft[ev.chatCode]()
      delete this.funcOnWebchatLeft[ev.chatCode]
    }
  }
  this.notifyCallStatus()
}
uiData.prototype.unansweredWebchatLeft = function (ev) {
  var configProperties = this.ucUiStore.getConfigProperties()
  if (ev) {
    if (
      !this.iconName &&
      !this.dialogPanel &&
      !this.staticPanel &&
      !this.chatOnly &&
      !this.isSubWindow
    ) {
      var chatHeaderInfo = this.ucUiStore.getChatHeaderInfo({
        chatType: ev.chatType,
        chatCode: ev.chatCode,
      })
      if (this.configurations.doNotReplyUnanswered) {
        // do not reply, do not continue by replying
        this.ucUiStore.setDoNotContinue({
          chatType: ev.chatType,
          chatCode: ev.chatCode,
        })
        // just delete webchat queue
        this.ucUiStore.getChatClient().kickOutOfConference({
          conf_id: (0, _strings.string)(chatHeaderInfo.conf_id),
          tenant: (0, _strings.string)(
            chatHeaderInfo.guest && chatHeaderInfo.guest.tenant,
          ),
          user_id: (0, _strings.string)(
            chatHeaderInfo.guest && chatHeaderInfo.guest.user_id,
          ),
        })
      } else {
        // reply automatically
        if (
          'TRUE' ===
          (0, _strings.string)(chatHeaderInfo.webchatContinuable).toUpperCase()
        ) {
          if (!chatHeaderInfo.replyTypes) {
            this.replyContinuation(
              chatHeaderInfo.yyyymm,
              chatHeaderInfo.conf_id,
              '',
              chatHeaderInfo.originalWebchatId,
              false,
              null,
            )
          }
        } else {
          if (
            chatHeaderInfo.replyTypes &&
            chatHeaderInfo.replyTypes.indexOf(',') === -1
          ) {
            if (
              (
                (configProperties.optional_config &&
                  configProperties.optional_config.awsl) ||
                []
              ).some(function (aws) {
                return aws.id === chatHeaderInfo.webchatServiceId && aws.senders
              })
            ) {
              this.replyContinuation(
                chatHeaderInfo.yyyymm,
                chatHeaderInfo.conf_id,
                chatHeaderInfo.replyTypes,
                chatHeaderInfo.originalWebchatId,
                false,
                null,
              )
            } else {
              this.ucUiStore
                .getLogger()
                .log(
                  'debug',
                  'cannot reply automatically (check senders of webchatServiceId=' +
                    chatHeaderInfo.webchatServiceId +
                    ')',
                )
            }
          }
        }
        // keep information to delete webchat queue
        this.unansweredWebchatsToKick[ev.chatCode] = {
          conf_id: (0, _strings.string)(chatHeaderInfo.conf_id),
          tenant: (0, _strings.string)(
            chatHeaderInfo.guest && chatHeaderInfo.guest.tenant,
          ),
          user_id: (0, _strings.string)(
            chatHeaderInfo.guest && chatHeaderInfo.guest.user_id,
          ),
        }
      }
    }
  }
}
uiData.prototype.checkRequiresNotification = function (evObj) {
  var _this36 = this
  // const doc = this.ownerDocument
  // Not use ownerDocument
  if (evObj) {
    var chatKeys = (evObj && evObj.chatKeys) || []
    var lampTypeOptions = this.getlampTypeOptions()
    if (
      this.currentSelectedTabScrolledToBottom &&
      chatKeys.indexOf(this.currentSelectedTab) >= 0 &&
      !(
        this.phone &&
        (this.phone.getSession() || {}).withVideo &&
        this.ucUiStore.getLocalStoragePreference({
          keyList: ['callAreaTheater'],
        })[0]
      )
    ) {
      // no need to notify (document has focus and panel is selected and not fullscreened)
      evObj.notificationFunction = function () {
        if (evObj.funcOnSelected) {
          evObj.funcOnSelected()
          _this36.ucUiStore
            .getLogger()
            .log(
              'debug',
              'dbg u1898 3 ' +
                (_this36.ucUiStore.getChatClient() || {})._user_id +
                ' evObj.funcOnSelected() at evObj.notificationFunction()',
            )
        }
      }
    } else if (!evObj.notificationFunction) {
      // notification function not prepared yet
      // check panel exists
      var panelToNotify = null
      var _loop = function _loop(i) {
        panelToNotify = _this36.mainPanelList.find(function (p) {
          return p.panelType + '_' + p.panelCode === chatKeys[i]
        })
        if (panelToNotify) {
          return 1 // break
        }
      }
      for (var i = 0; i < chatKeys.length; i++) {
        if (_loop(i)) break
      }
      if (
        !panelToNotify &&
        evObj.webchatNotification &&
        this.webchatNotificationTarget &&
        this.configurations.queuePanel
      ) {
        panelToNotify = {
          panelType: 'WEBCHATQUEUE',
          panelCode: 'static',
        }
      }
      if (
        panelToNotify ||
        (evObj.webchatNotification && this.webchatNotificationTarget) ||
        evObj.nonPanelNotification
      ) {
        // must notify
        evObj.notificationFunction = function () {
          // ring bell
          /* TODO: Implement audios */
          // if (
          //   this.configurations.ringsBell &&
          //   (!lampTypeOptions.silent || lampTypeOptions.bell === true) &&
          //   lampTypeOptions.bell !== false
          // ) {
          //   const audios = doc.getElementsByClassName(
          //     (evObj.notificationProperties &&
          //       evObj.notificationProperties.bellAudioClass) ||
          //       'brBellAudio',
          //   )
          //   if (audios && audios.length > 0) {
          //     Array.prototype.forEach.call(audios, (audio, index) => {
          //       this.ucUiStore
          //         .getLogger()
          //         .log('debug', 'dbg u2384 1 ' + index + ' ' + Date.now())
          //       const promise = audio.play && audio.play()
          //       if (promise && promise.then) {
          //         promise
          //           .then(value => {
          //             this.ucUiStore
          //               .getLogger()
          //               .log(
          //                 'debug',
          //                 'dbg u2384 2 ' +
          //                   index +
          //                   ' ' +
          //                   Date.now() +
          //                   ' ' +
          //                   value,
          //               )
          //           })
          //           .catch(reason => {
          //             this.ucUiStore
          //               .getLogger()
          //               .log(
          //                 'debug',
          //                 'dbg u2384 3 ' +
          //                   index +
          //                   ' ' +
          //                   Date.now() +
          //                   ' ' +
          //                   reason,
          //               )
          //           })
          //       } else {
          //         this.ucUiStore
          //           .getLogger()
          //           .log('debug', 'dbg u2384 4 ' + index + ' ' + Date.now())
          //       }
          //     })
          //   } else {
          //     this.ucUiStore
          //       .getLogger()
          //       .log(
          //         'info',
          //         'brBellAudio not found: ' +
          //           (evObj.notificationProperties &&
          //             evObj.notificationProperties.bellAudioClass),
          //       )
          //   }
          // }
          if (
            evObj.notificationProperties &&
            (!lampTypeOptions.silent ||
              lampTypeOptions.notification === true) &&
            lampTypeOptions.notification !== false
          ) {
            // web notification
            var skipsWebNotification = false
            if (evObj.webchatNotification && evObj.continuation_info) {
              skipsWebNotification |= (
                (_this36.getAgentComponentInstance() || {})
                  .replyingContinuationInfos || []
              ).some(function (info) {
                return (
                  info.conf_id === evObj.continuation_info.conf_id &&
                  info.yyyymm === evObj.continuation_info.yyyymm
                )
              })
            }
            var settings = _this36.ucUiStore.getChatClient().getSettings()
            skipsWebNotification |=
              settings.optional_settings &&
              settings.optional_settings.webnotif_status === 'off'
            if (!skipsWebNotification) {
              if (Brekeke.WebNotification) {
                try {
                  if (!evObj.notificationProperties.dontClear) {
                    Brekeke.WebNotification.closeNotification({
                      reason: 'clear_old_notifications',
                    })
                  }
                  // const notificationId =
                  //   Brekeke.WebNotification.showNotification({
                  //     document: doc,
                  //     //timeout: (settings.optional_settings && settings.optional_settings.webnotif_status === "manual" && int(settings.optional_settings.webnotif_timeout)) ||
                  //     //    this.ucUiStore.getConfigProperties().webnotif_timeout,
                  //     title: string(evObj.notificationProperties.title),
                  //     body: truncateWithEllipsis(
                  //       evObj.missedCall
                  //         ? uawMsgs.MSG_CALL_MISSED_NOTIFICATION
                  //         : toPlainText(evObj.notificationProperties.body),
                  //       40,
                  //     ),
                  //     icon:
                  //       string(evObj.notificationProperties.icon) ||
                  //       string(
                  //         (doc.querySelector("link[rel*='icon']") || {}).href,
                  //       ),
                  //     noisiness: int(
                  //       typeof evObj.notificationProperties.noisiness !==
                  //         'undefined'
                  //         ? evObj.notificationProperties.noisiness
                  //         : 1,
                  //     ),
                  //     onclick: ev => {
                  //       // if (
                  //       //   !doc.hasFocus() &&
                  //       //   doc.defaultView &&
                  //       //   doc.defaultView.focus
                  //       // ) {
                  //       //   doc.defaultView.focus()
                  //       // }
                  //       if (panelToNotify) {
                  //         this.updateTab({
                  //           select: {
                  //             panelType: panelToNotify.panelType,
                  //             panelCode: panelToNotify.panelCode,
                  //           },
                  //         })
                  //       }
                  //       Brekeke.WebNotification.closeNotification({
                  //         notificationId: ev.notificationId,
                  //         reason: 'notification_onclick',
                  //       })
                  //       this.render()
                  //     },
                  //     onclose: ev => {
                  //       delete this.showingNotificationTable[ev.notificationId]
                  //       this.changeLamp()
                  //     },
                  //     debug: e => {
                  //       if (this.configurations.webNotificationDebug) {
                  //         this.ucUiStore
                  //           .getLogger()
                  //           .log(
                  //             this.configurations.webNotificationDebug,
                  //             (this.ucUiStore.getChatClient() || {})._user_id +
                  //               ' ' +
                  //               e,
                  //           )
                  //       }
                  //     },
                  //   })
                  // this.showingNotificationTable[notificationId] = true
                } catch (ex) {
                  _this36.ucUiStore.getLogger().log('warn', ex)
                }
              } else {
                _this36.ucUiStore
                  .getLogger()
                  .log('warn', 'Brekeke.WebNotification not found')
              }
            }
          }
          if (
            panelToNotify &&
            !evObj.doNotBlink &&
            _this36.currentSelectedTab !==
              panelToNotify.panelType + '_' + panelToNotify.panelCode
          ) {
            // blinking
            if (
              _this36.blinkingTabs[
                panelToNotify.panelType + '_' + panelToNotify.panelCode
              ]
            ) {
              _this36.blinkingTabs[
                panelToNotify.panelType + '_' + panelToNotify.panelCode
              ]++
            } else {
              _this36.blinkingTabs[
                panelToNotify.panelType + '_' + panelToNotify.panelCode
              ] = 1
            }
            if (evObj.funcOnSelected) {
              _this36.funcOnSelectedQueue.push(evObj.funcOnSelected)
              _this36.ucUiStore
                .getLogger()
                .log(
                  'debug',
                  'dbg u1898 4 ' +
                    (_this36.ucUiStore.getChatClient() || {})._user_id +
                    ' funcOnSelectedQueue.push() at checkRequiresNotification()',
                )
            }
          } else if (
            panelToNotify &&
            evObj.mustScroll &&
            _this36.currentSelectedTab ===
              panelToNotify.panelType + '_' + panelToNotify.panelCode &&
            !_this36.currentSelectedTabScrolledToBottom
          ) {
            // unscrolled
            if (
              _this36.unscrolledTabs[
                panelToNotify.panelType + '_' + panelToNotify.panelCode
              ]
            ) {
              _this36.unscrolledTabs[
                panelToNotify.panelType + '_' + panelToNotify.panelCode
              ]++
            } else {
              _this36.unscrolledTabs[
                panelToNotify.panelType + '_' + panelToNotify.panelCode
              ] = 1
            }
            if (evObj.funcOnSelected) {
              if (
                !_this36.funcOnScrolledQueues[
                  panelToNotify.panelType + '_' + panelToNotify.panelCode
                ]
              ) {
                _this36.funcOnScrolledQueues[
                  panelToNotify.panelType + '_' + panelToNotify.panelCode
                ] = []
              }
              _this36.funcOnScrolledQueues[
                panelToNotify.panelType + '_' + panelToNotify.panelCode
              ].push(evObj.funcOnSelected)
              _this36.ucUiStore
                .getLogger()
                .log(
                  'debug',
                  'dbg u1898 5 ' +
                    (_this36.ucUiStore.getChatClient() || {})._user_id +
                    ' funcOnScrolledQueues["' +
                    panelToNotify.panelType +
                    '_' +
                    panelToNotify.panelCode +
                    '"].push() at checkRequiresNotification()',
                )
            }
          } else {
            if (evObj.funcOnSelected) {
              evObj.funcOnSelected()
              _this36.ucUiStore
                .getLogger()
                .log(
                  'debug',
                  'dbg u1898 6 ' +
                    (_this36.ucUiStore.getChatClient() || {})._user_id +
                    ' evObj.funcOnSelected() at checkRequiresNotification()',
                )
            }
          }
        }
      }
    } else {
      // notification already prepared for another uidata
    }
  } else {
    this.ucUiStore.getLogger().log('warn', 'checkRequiresNotification error')
  }
  this.changeLamp()
}
// events from ChatClient
uiData.prototype.chatClient_conferenceMemberChanged = function (ev) {
  this.notifyCallStatus()
  if (
    !this.iconName &&
    !this.dialogPanel &&
    !this.staticPanel &&
    !this.chatOnly &&
    !this.isSubWindow &&
    this.configurations &&
    this.configurations.doNotReplyUnanswered &&
    ev &&
    ev.conference &&
    ev.conference.conf_status === _constants.default.CONF_STATUS_INACTIVE
  ) {
    // do not reply, do not continue by replying
    this.ucUiStore.setDoNotContinue({
      chatType: 'CONFERENCE',
      chatCode: this.ucUiStore.getChatCodeByConfId({
        conf_id: ev.conference.conf_id,
        yyyymm: ev.conference.yyyymm,
      }).chatCode,
    })
  }
}
// events from Phone
uiData.prototype.phoneStatusChanged = function (ev) {
  this.ucUiStore
    .getLogger()
    .log(
      'info',
      'phone.phoneStatusChanged phoneStatus=' +
        ev.phoneStatus +
        ', from=' +
        ev.from +
        ', reason=' +
        ev.reason +
        ', response=' +
        ev.response,
    )
  if (ev.phoneStatus === 'started') {
    this.phoneRegisterDelay = 0
  } else if (ev.phoneStatus === 'stopped') {
    if (this.phoneWillRestart) {
      this.ucUiStore.getLogger().log('info', 'phone is restarting')
      this.startupPhone()
    } else if (ev.from !== '') {
      // abnormal
      // retry registration
      setTimeout(
        this.registerPhone.bind(this, false, null),
        (this.phoneRegisterDelay = Math.min(
          (this.phoneRegisterDelay + 500) * 2,
          300000,
        )),
      )
      this.ucUiStore
        .getLogger()
        .log(
          'info',
          'retrying registration in ' + this.phoneRegisterDelay + 'ms',
        )
    }
  }
  this.render()
}
uiData.prototype.sessionCreated = function (ev) {
  var _this37 = this
  var session = ev
  var rtcSession = session && session.rtcSession
  if (rtcSession) {
    var address = (0, _strings.string)(
      rtcSession.remote_identity &&
        rtcSession.remote_identity.uri &&
        rtcSession.remote_identity.uri.user,
    )
    if (rtcSession.direction === 'outgoing') {
      // outgoing
      var foundPanelKey = null
      if (address) {
        foundPanelKey = Object.keys(this.panelSessionTable).filter(
          function (panelKey) {
            return (
              _this37.panelSessionTable[panelKey].target === address &&
              !_this37.panelSessionTable[panelKey].sessionId
            )
          },
        )[0]
      }
      if (foundPanelKey) {
        this.panelSessionTable[foundPanelKey].sessionId = (0, _strings.string)(
          session.sessionId,
        )
        this.phone.setMuted(
          {
            videoClient:
              this.panelSessionTable[foundPanelKey].cameraMuted &&
              !this.panelSessionTable[foundPanelKey].isScreen,
          },
          session.sessionId,
        )
      } else {
        this.ucUiStore
          .getLogger()
          .log('info', 'outgoing session without makeCall: address=' + address)
        rtcSession.terminate()
        return
      }
    } else {
      // incoming
      var buddy, panelType, panelCode, webchatQueue, fromDisplay
      var display_name = (0, _strings.string)(
        session.incomingMessage &&
          session.incomingMessage.from &&
          session.incomingMessage.from.display_name,
      )
      fromDisplay =
        display_name && display_name !== address
          ? address + ' ' + '(' + display_name + ')'
          : address
      if (
        (buddy =
          address &&
          (this.ucUiStore.getChatClient().getBuddylist().user || []).find(
            function (b) {
              return address === (0, _strings.string)(b && b.user_id)
            },
          ))
      ) {
        panelType = 'CHAT'
        panelCode = JSON.stringify({
          tenant: (0, _strings.string)(buddy.tenant),
          user_id: (0, _strings.string)(buddy.user_id),
        })
        fromDisplay =
          this.ucUiStore.getBuddyUserForUi(buddy).name || fromDisplay
      } else if (
        (webchatQueue =
          address &&
          this.ucUiStore.getWebchatQueueList().find(function (q) {
            return (
              address ===
                (0, _strings.string)(
                  q.webchatinfo && q.webchatinfo.call_target,
                ) && q.conf_status !== _constants.default.CONF_STATUS_INACTIVE
            )
          }))
      ) {
        panelType = 'CONFERENCE'
        panelCode = (0, _strings.string)(
          this.ucUiStore.getChatCodeByConfId({
            conf_id: webchatQueue.conf_id,
          }).chatCode,
        )
      } else {
        panelType = 'EXTERNALCALL'
        panelCode = (0, _strings.string)(address)
      }
      var panelKey = panelType + '_' + panelCode
      if (this.panelSessionTable[panelKey]) {
        this.ucUiStore
          .getLogger()
          .log('info', 'terminating duplicate session: address=' + address)
        setTimeout(rtcSession.terminate.bind(rtcSession), 0)
        return
      }
      this.panelSessionTable[panelKey] = {
        sessionId: (0, _strings.string)(session.sessionId),
        target: '',
        isVideo: false,
        isScreen: false,
        cameraMuted: true,
        holded: false,
        transferring: false,
        iceConnectedOnce: false,
        videoIceConnectedOnce: false,
        warningMessages: {},
      }
      this.phone.setMuted(
        {
          videoClient:
            this.panelSessionTable[panelKey].cameraMuted &&
            !this.panelSessionTable[panelKey].isScreen,
        },
        session.sessionId,
      )
      if (panelType === 'EXTERNALCALL') {
        if (!this.externalCallWorkTable[panelCode]) {
          this.externalCallWorkTable[panelCode] = {}
        }
        this.externalCallWorkTable[panelCode].display_name = display_name
      }
      // open tab
      this.updateTab({
        open: {
          panelType: panelType,
          panelCode: panelCode,
        },
      })
      // notification
      var evObj = {
        chatKeys: [panelKey],
        notificationProperties: {
          title: fromDisplay,
          body: session.remoteWithVideo
            ? _uawmsgs.default.MSG_CALL_NOTIFICATION_WITH_VIDEO
            : _uawmsgs.default.MSG_CALL_NOTIFICATION,
          bellAudioClass: '__DO_NOT_RING_BELL__',
          noisiness: 0,
        },
      }
      this.checkRequiresNotification(evObj)
      if (evObj.notificationFunction) {
        evObj.notificationFunction()
      }
    }
  }
  this.notifyCallStatus()
  this.render()
}
uiData.prototype.sessionRejected = function (ev) {
  var _this38 = this
  var session = ev
  var rtcSession = session && session.rtcSession
  if (rtcSession) {
    var address = (0, _strings.string)(
      rtcSession.remote_identity &&
        rtcSession.remote_identity.uri &&
        rtcSession.remote_identity.uri.user,
    )
    if (rtcSession.direction === 'outgoing') {
      // outgoing
      if (address) {
        Object.keys(this.panelSessionTable)
          .filter(function (panelKey) {
            return (
              _this38.panelSessionTable[panelKey].target === address &&
              !_this38.panelSessionTable[panelKey].sessionId
            )
          })
          .forEach(function (panelKey) {
            return delete _this38.panelSessionTable[panelKey]
          })
      }
    } else {
      // incoming
      var panelType, panelCode, fromDisplay
      var display_name = (0, _strings.string)(
        session.incomingMessage &&
          session.incomingMessage.from &&
          session.incomingMessage.from.display_name,
      )
      fromDisplay =
        display_name && display_name !== address
          ? address + ' ' + '(' + display_name + ')'
          : address
      if (
        address &&
        (this.ucUiStore.getChatClient().getBuddylist().user || []).find(
          function (b) {
            return address === (0, _strings.string)(b && b.user_id)
          },
        )
      ) {
        // CHAT
        return
      } else if (
        address &&
        this.ucUiStore.getWebchatQueueList().find(function (q) {
          return (
            address ===
              (0, _strings.string)(
                q.webchatinfo && q.webchatinfo.call_target,
              ) && q.conf_status !== _constants.default.CONF_STATUS_INACTIVE
          )
        })
      ) {
        // CONFERENCE
        return
      } else {
        // EXTERNALCALL
        panelType = 'EXTERNALCALL'
        panelCode = (0, _strings.string)(address)
      }
      var panelKey = panelType + '_' + panelCode
      if (panelType === 'EXTERNALCALL') {
        if (!this.externalCallWorkTable[panelCode]) {
          this.externalCallWorkTable[panelCode] = {}
        }
        this.externalCallWorkTable[panelCode].display_name = display_name
      }
      // open tab
      this.updateTab({
        open: {
          panelType: panelType,
          panelCode: panelCode,
        },
      })
      // notification
      var evObj = {
        chatKeys: [panelKey],
        notificationProperties: {
          title: fromDisplay,
          body: _uawmsgs.default.MSG_CALL_MISSED_NOTIFICATION,
        },
      }
      this.checkRequiresNotification(evObj)
      if (evObj.notificationFunction) {
        evObj.notificationFunction()
      }
      // add call result (only to local chatList if chatType === 'EXTERNALCALL')
      if (panelType === 'EXTERNALCALL') {
        this.ucUiAction.sendCallResult({
          chatType: panelType,
          chatCode: panelCode,
          text: JSON.stringify({
            talklen: 0,
            externalincoming: true,
          }),
        })
      }
    }
  }
  this.render()
}
uiData.prototype.sessionStatusChanged = function (ev) {
  var _this39 = this
  var session = ev
  var rtcSession = session && session.rtcSession
  if (session && session.sessionStatus === 'terminated') {
    Object.keys(this.panelSessionTable)
      .filter(function (panelKey) {
        return (
          _this39.panelSessionTable[panelKey].sessionId === session.sessionId
        )
      })
      .forEach(function (panelKey) {
        var panel = (0, _strings.parsePanelKey)(panelKey)
        if (
          rtcSession &&
          rtcSession.direction === 'outgoing' &&
          (panel.panelType === 'CHAT' || panel.panelType === 'CONFERENCE')
        ) {
          // send call result
          _this39.ucUiAction.sendCallResult({
            chatType: panel.panelType,
            chatCode: panel.panelCode,
            text: JSON.stringify({
              talklen:
                (0, _strings.int)(+rtcSession.end_time) -
                (0, _strings.int)(+rtcSession.start_time),
            }),
          })
        } else if (rtcSession && panel.panelType === 'EXTERNALCALL') {
          // add call result (only to local chatList if chatType === 'EXTERNALCALL')
          _this39.ucUiAction.sendCallResult({
            chatType: panel.panelType,
            chatCode: panel.panelCode,
            text: JSON.stringify({
              talklen:
                (0, _strings.int)(+rtcSession.end_time) -
                (0, _strings.int)(+rtcSession.start_time),
              externalincoming: rtcSession.direction !== 'outgoing',
            }),
          })
        }
        if (
          (0, _strings.int)(
            _this39.ucUiStore.getOptionalSetting({
              key: 'dbgopt',
            }),
          ) %
            2 ===
          1
        ) {
          if (session.incomingMessage) {
            if (session.incomingMessage.status_code >= 400) {
              _this39.ucUiAction.addSysmsgChat({
                chatType: panel.panelType,
                chatCode: panel.panelCode,
                sysmsg: {
                  sysmsgLevel: 'info',
                  sysmsgData:
                    session.incomingMessage.status_code +
                    ' ' +
                    session.incomingMessage.reason_phrase,
                },
              })
            } else if (
              session.incomingMessage.method === 'CANCEL' ||
              session.incomingMessage.method === 'BYE'
            ) {
              var reasonHeaders =
                session.incomingMessage.getHeaders &&
                session.incomingMessage.getHeaders('Reason')
              if (reasonHeaders && reasonHeaders.length) {
                _this39.ucUiAction.addSysmsgChat({
                  chatType: panel.panelType,
                  chatCode: panel.panelCode,
                  sysmsg: {
                    sysmsgLevel: 'info',
                    sysmsgData: reasonHeaders
                      .map(function (h) {
                        return 'Reason: ' + h
                      })
                      .join('\n'),
                  },
                })
              }
            }
          }
        }
        // delete
        delete _this39.panelSessionTable[panelKey]
      })
    this.notifyCallStatus()
  }
  this.render()
}
uiData.prototype.videoClientSessionCreated = function (ev) {
  var _this40 = this
  var session = this.phone && this.phone.getSession(ev && ev.sessionId)
  if (session) {
    Object.keys(this.panelSessionTable)
      .filter(function (panelKey) {
        return (
          _this40.panelSessionTable[panelKey].sessionId === session.sessionId
        )
      })
      .forEach(function (panelKey) {
        if (_this40.panelSessionTable[panelKey].isScreen) {
          var tracks =
            session.localVideoStreamObject &&
            session.localVideoStreamObject.getVideoTracks &&
            session.localVideoStreamObject.getVideoTracks()
          var track = tracks && tracks[0]
          if (track) {
            track.onended = function () {
              if (_this40.panelSessionTable[panelKey]) {
                var _session = _this40.phone.getSession(
                  _this40.panelSessionTable[panelKey].sessionId,
                )
                if (_session && _session.sessionStatus === 'connected') {
                  if (_this40.panelSessionTable[panelKey].isScreen) {
                    // change screen off
                    _this40.panelSessionTable[panelKey].isScreen = false
                    // disconnect existing video session
                    _this40.phone.setWithVideo(_session.sessionId, false)
                    // set muted of video client
                    _this40.phone.setMuted(
                      {
                        videoClient:
                          _this40.panelSessionTable[panelKey].cameraMuted &&
                          !_this40.panelSessionTable[panelKey].isScreen,
                      },
                      _session.sessionId,
                    )
                    // start video session
                    _this40.phone.setWithVideo(
                      _session.sessionId,
                      true,
                      _this40.getVideoOptions(panelKey),
                      JSON.stringify({
                        soundOnly: false,
                      }),
                    )
                  }
                }
              }
            }
          }
        }
      })
  }
  this.render()
}
uiData.prototype.videoClientSessionEnded = function (ev) {
  this.render()
}
uiData.prototype.remoteUserOptionsChanged = function (ev) {
  var _this41 = this
  var session = ev
  if (session) {
    Object.keys(this.panelSessionTable)
      .filter(function (panelKey) {
        return (
          _this41.panelSessionTable[panelKey].sessionId === session.sessionId
        )
      })
      .forEach(function (panelKey) {
        // sound only
        if (!_this41.panelSessionTable[panelKey].isVideo) {
          var panel = (0, _strings.parsePanelKey)(panelKey)
          var panelType = (0, _strings.string)(panel && panel.panelType)
          var dontMakeVideo = new RegExp(
            '^' +
              _this41.ucUiStore.getLocalStoragePreference({
                keyList: ['noVideoMode'],
              })[0] +
              '$',
          ).test(panelType)
          var newWithVideo =
            !dontMakeVideo &&
            session.remoteUserOptionsTable &&
            Object.keys(session.remoteUserOptionsTable).some(function (user) {
              var remoteSoundOnly = false
              try {
                remoteSoundOnly = JSON.parse(
                  session.remoteUserOptionsTable[user].exInfo,
                ).soundOnly
              } catch (ex) {}
              return (
                session.remoteUserOptionsTable[user] &&
                session.remoteUserOptionsTable[user].withVideo &&
                !remoteSoundOnly
              )
            })
          if (session.withVideo !== newWithVideo) {
            _this41.phone.setWithVideo(
              session.sessionId,
              newWithVideo,
              _this41.getVideoOptions(panelKey),
              JSON.stringify({
                soundOnly: true,
              }),
            )
          }
        }
      })
  }
  this.render()
}
uiData.prototype.rtcErrorOccurred = function (ev) {
  var _this42 = this
  this.ucUiStore
    .getLogger()
    .log(
      'warn',
      'phone.rtcErrorOccurred sessionId=' +
        (ev &&
          ev.sessionId +
            ', target=' +
            ev.target +
            ', options=' +
            ev.options +
            ', client=' +
            ev.client +
            ', from=' +
            ev.from +
            ', error=' +
            ev.error),
    )
  var isVideo = ev && ev.client === 'video'
  var panelKey = null
  var warningMessageKey = null
  if (ev && ev.target && !ev.sessionId) {
    // makeCall error
    Object.keys(this.panelSessionTable)
      .filter(function (panelKey) {
        return (
          _this42.panelSessionTable[panelKey].target === ev.target &&
          !_this42.panelSessionTable[panelKey].sessionId
        )
      })
      .forEach(function (panelKey) {
        return delete _this42.panelSessionTable[panelKey]
      })
    warningMessageKey = 'MSG_CALL_RTC_ERROR'
  } else if (ev && ev.sessionId) {
    panelKey = Object.keys(this.panelSessionTable)
      .filter(function (panelKey) {
        return _this42.panelSessionTable[panelKey].sessionId === ev.sessionId
      })
      .pop()
    var session = this.phone && this.phone.getSession(ev.sessionId)
    if (session && session.sessionStatus === 'progress') {
      // answer error
      warningMessageKey = 'MSG_CALL_RTC_ANSWER_ERROR'
    } else if (isVideo) {
      // camera error
      warningMessageKey = 'MSG_CALL_RTC_CAMERA_ERROR'
    } else {
      // microphone error
      warningMessageKey = 'MSG_CALL_RTC_MICROPHONE_ERROR'
    }
  }
  if (warningMessageKey !== null) {
    this.ucUiStore.getLogger().log('warn', warningMessageKey)
    this.showModalSessionWarning(
      panelKey,
      warningMessageKey,
      ev.error + '\n(from ' + ev.from + ')',
    )
  }
  this.render()
}
uiData.prototype.icegatheringstatechange = function (ev) {
  var _this43 = this
  var sessionId = (0, _strings.string)(ev && ev.sessionId)
  var panelKey =
    sessionId &&
    Object.keys(this.panelSessionTable)
      .filter(function (panelKey) {
        return _this43.panelSessionTable[panelKey].sessionId === sessionId
      })
      .pop()
  var iceGatheringState = (0, _strings.string)(ev && ev.iceGatheringState)
  var videoClientSessionId = (0, _strings.string)(ev && ev.videoClientSessionId)
  var iceGatheringWarning1 = (0, _strings.string)(
    this.configurations.iceGatheringWarning,
  )
    .split('|')[0]
    .split(',')
  var iceGatheringWarning2 = (
    (0, _strings.string)(this.configurations.iceGatheringWarning).split(
      '|',
    )[1] || ''
  ).split(',')
  if (!sessionId || !iceGatheringState) {
    return
  }
  if (!videoClientSessionId) {
    if (iceGatheringWarning1.indexOf(iceGatheringState) !== -1) {
      this.ucUiStore
        .getLogger()
        .log(
          'warn',
          'Please check for network problems. [audio] iceGatheringState=' +
            iceGatheringState,
        )
      this.showModalSessionWarning(
        panelKey,
        'MSG_CALL_NETWORK_WARNING',
        '[audio] iceGatheringState=' + iceGatheringState,
      )
    } else if (
      iceGatheringWarning2.indexOf(iceGatheringState) !== -1 &&
      this.panelSessionTable[panelKey] &&
      !this.panelSessionTable[panelKey].iceConnectedOnce
    ) {
      this.ucUiStore
        .getLogger()
        .log(
          'warn',
          'Please check for network problems. [audio] iceGatheringState=' +
            iceGatheringState,
        )
      this.showModalSessionWarning(
        panelKey,
        'MSG_CALL_NETWORK_WARNING',
        '[audio] iceGatheringState=' + iceGatheringState,
      )
    }
  } else {
    if (iceGatheringWarning1.indexOf(iceGatheringState) !== -1) {
      this.ucUiStore
        .getLogger()
        .log(
          'warn',
          'Please check for network problems. [video] iceGatheringState=' +
            iceGatheringState,
        )
      this.showModalSessionWarning(
        panelKey,
        'MSG_CALL_NETWORK_WARNING',
        '[video] iceGatheringState=' + iceGatheringState,
      )
    } else if (
      iceGatheringWarning2.indexOf(iceGatheringState) !== -1 &&
      this.panelSessionTable[panelKey] &&
      !this.panelSessionTable[panelKey].videoIceConnectedOnce
    ) {
      this.ucUiStore
        .getLogger()
        .log(
          'warn',
          'Please check for network problems. [video] iceGatheringState=' +
            iceGatheringState,
        )
      this.showModalSessionWarning(
        panelKey,
        'MSG_CALL_NETWORK_WARNING',
        '[video] iceGatheringState=' + iceGatheringState,
      )
    }
  }
}
uiData.prototype.iceconnectionstatechange = function (ev) {
  var _this44 = this
  var sessionId = (0, _strings.string)(ev && ev.sessionId)
  var panelKey =
    sessionId &&
    Object.keys(this.panelSessionTable)
      .filter(function (panelKey) {
        return _this44.panelSessionTable[panelKey].sessionId === sessionId
      })
      .pop()
  var iceConnectionState = (0, _strings.string)(ev && ev.iceConnectionState)
  var videoClientSessionId = (0, _strings.string)(ev && ev.videoClientSessionId)
  var iceConnectionWarning1 = (0, _strings.string)(
    this.configurations.iceConnectionWarning,
  )
    .split('|')[0]
    .split(',')
  var iceConnectionWarning2 = (
    (0, _strings.string)(this.configurations.iceConnectionWarning).split(
      '|',
    )[1] || ''
  ).split(',')
  if (!sessionId || !iceConnectionState) {
    return
  }
  if (!videoClientSessionId) {
    if (iceConnectionWarning1.indexOf(iceConnectionState) !== -1) {
      this.ucUiStore
        .getLogger()
        .log(
          'warn',
          'Please check for network problems. [audio] iceConnectionState=' +
            iceConnectionState,
        )
      this.showModalSessionWarning(
        panelKey,
        'MSG_CALL_NETWORK_WARNING',
        '[audio] iceConnectionState=' + iceConnectionState,
      )
    } else if (
      iceConnectionWarning2.indexOf(iceConnectionState) !== -1 &&
      this.panelSessionTable[panelKey] &&
      !this.panelSessionTable[panelKey].iceConnectedOnce
    ) {
      this.ucUiStore
        .getLogger()
        .log(
          'warn',
          'Please check for network problems. [audio] iceConnectionState=' +
            iceConnectionState,
        )
      this.showModalSessionWarning(
        panelKey,
        'MSG_CALL_NETWORK_WARNING',
        '[audio] iceConnectionState=' + iceConnectionState,
      )
    }
    if (
      iceConnectionState === 'connected' &&
      this.panelSessionTable[panelKey] &&
      !this.panelSessionTable[panelKey].iceConnectedOnce
    ) {
      this.panelSessionTable[panelKey].iceConnectedOnce = true
    }
  } else {
    if (iceConnectionWarning1.indexOf(iceConnectionState) !== -1) {
      this.ucUiStore
        .getLogger()
        .log(
          'warn',
          'Please check for network problems. [video] iceConnectionState=' +
            iceConnectionState,
        )
      this.showModalSessionWarning(
        panelKey,
        'MSG_CALL_NETWORK_WARNING',
        '[video] iceConnectionState=' + iceConnectionState,
      )
    } else if (
      iceConnectionWarning2.indexOf(iceConnectionState) !== -1 &&
      this.panelSessionTable[panelKey] &&
      !this.panelSessionTable[panelKey].videoIceConnectedOnce
    ) {
      this.ucUiStore
        .getLogger()
        .log(
          'warn',
          'Please check for network problems. [video] iceConnectionState=' +
            iceConnectionState,
        )
      this.showModalSessionWarning(
        panelKey,
        'MSG_CALL_NETWORK_WARNING',
        '[video] iceConnectionState=' + iceConnectionState,
      )
    }
    if (
      iceConnectionState === 'connected' &&
      this.panelSessionTable[panelKey] &&
      !this.panelSessionTable[panelKey].videoIceConnectedOnce
    ) {
      this.panelSessionTable[panelKey].videoIceConnectedOnce = true
    }
  }
}

/**
 * AgentComponent class
 */
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
  this.subWindowStatus = 0
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

/**
 * initComponent function
 * option
 * option.widgetParent (optional)
 * option.iconParents (optional)
 * option.ownerDocument (optional)
 * option.loggerLevel (optional)
 * option.consoleLogType (optional)
 * option.language (optional)
 * option.configurations (optional)
 * option.handler (optional)
 */
AgentComponent.prototype.initComponent = function (option) {
  if (this.initializeStatus !== 0) {
    return
  }
  this.initializeStatus = 1
  var defaultConsoleLogType = 0
  try {
    // defaultConsoleLogType = await RnAsyncStorage.getItem(
    //   'UC.ucagentwidget.agentcomponent.defaultconsolelogtype',
    // )
  } catch (e) {}
  // init option
  option = option || {}
  this.option = {}
  this.option.iconParents = option.iconParents || {}
  this.option.loggerLevel = option.loggerLevel || 'all'
  this.option.consoleLogType =
    (0, _strings.int)(option.consoleLogType || defaultConsoleLogType) || 2
  this.option.widgetParent = option.widgetParent || null
  this.option.offline = false
  this.option.language = option.language || ''
  this.option.configurations = option.configurations || {}
  console.log('#Duy Phan option.configurations', this.option.configurations)
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
  // TODO: Remove this once we have a way to set headerButtons
  if (!('headerButtons' in this.option.configurations)) {
    this.option.configurations['headerButtons'] = [
      'invite',
      'file',
      'leave',
      'chat',
      'history',
    ]
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
    this.option.consoleLogType === 1
      ? function () {
          return true
        }
      : null,
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
  _uawmsgs.default.loadLanguage(
    this.option.language,
    this.languageLoaded.bind(this),
  )
  // TODO: Check css and move to stylesheet
  //  init css
  //   if (
  //     this.option.ownerDocument &&
  //     this.option.ownerDocument.head &&
  //     this.option.ownerDocument.createElement
  //   ) {
  //     this.elementsAddedToOwner = this.elementsAddedToOwner.concat(
  //       ['../../../css/react-datepicker.css'].map(url => {
  //         const link = this.option.ownerDocument.createElement('link')
  //         link.rel = 'stylesheet'
  //         link.href = CURRENT_SCRIPT_URL.DIR + url + CURRENT_SCRIPT_URL.QUERY
  //         this.option.ownerDocument.head.appendChild(link)
  //         return link
  //       }),
  //     )
  //   }
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
    this.option.consoleLogType === 3
      ? {}
      : {
          report_console_categories: '',
        },
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
      configurations: this.option.configurations,
      webchatNotificationTarget: false,
      iconName: iconName,
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

/**
 * destroyComponent function
 */
AgentComponent.prototype.destroyComponent = function () {
  this.replyingWebchatInfos = {}
  this.replyingContinuationInfos = []
  this.workForReplyingCounter = 0
  this.workForReplyingFunctions = {}
  this.focusedChat = null
  this.chatTable = {}
  this.popupFailedCount = 0
  // terminate dialogs
  for (var dialogName in this.dialogUiDataTable) {
    this.dialogUiDataTable[dialogName].destroyApp()
    try {
    } catch (e) {
      try {
        this._logger.log('warn', e)
      } catch (e) {}
    }
  }
  this.dialogUiDataTable = {}
  this.dialogWorkDataTable = {}
  if (this.dialogUcUiAction) {
    this.dialogUcUiAction.signOut()
  }
  if (this.dialogUcUiStore) {
    this.dialogUcUiStore.destroy()
  }
  this.dialogUcUiStore = null
  this.dialogUcUiAction = null
  this.dialogHandler = null
  // terminate icon uiData
  if (this.iconUiDataTable) {
    for (var iconName in this.iconUiDataTable) {
      this.iconUiDataTable[iconName].destroyApp()
    }
  }
  this.iconUiDataTable = null
  this.iconHandler = null
  // terminate main widget uiData
  if (this.mainWidgetUiData) {
    this.mainWidgetUiData.destroyApp()
  }
  this.mainWidgetUiData = null
  this.mainWidgetHandler = null
  // terminate ucUiStore
  this.ucUiStore = null
  this.ucUiAction = null
  this._dummyUcUiStore = null
  this._dummyUcUiAction = null
  this._dummyChatClient = null
  if (this._ucUiAction) {
    this._ucUiAction.signOut()
  }
  if (this._ucUiStore) {
    this._ucUiStore.destroy()
  }
  this._ucUiStore = null
  this._ucUiAction = null
  if (this._chatClient) {
    this._chatClient.signOut()
  }
  this._chatClient = null
  this._conferenceCaches = {}
  this.conferenceCaches = this._conferenceCaches
  // remove elements
  this.elementsAddedToOwner.forEach(function (element) {
    try {
      element.parentNode.removeChild(element)
    } catch (e) {}
  })
  this.elementsAddedToOwner = []
  // stop timer
  if (this.subWindowTimer) {
    clearInterval(this.subWindowTimer)
  }
  this.subWindowTimer = null
  this.subWindow = null
  if (this.mainWindowHeartbeat.timer) {
    clearInterval(this.mainWindowHeartbeat.timer)
  }
  this.mainWindowHeartbeat.status = 'DEAD'
  this.mainWindowHeartbeat = {}
  // dequeue all logQueue
  this.logQueuedLog()
  this._logger = null
  this.handlers = []
  this.option = {}
  this.initializeStatus = 0
}

/**
 * startUCClient function
 * option
 * option.widgetParent (optional)
 * option.offline (optional)
 * option.signInOption (optional)
 */
AgentComponent.prototype.startUCClient = function (option) {
  if (this.initializeStatus !== 1) {
    return
  }
  this.initializeStatus = 2
  // init option
  option = option || {}
  this.option.widgetParent =
    typeof option.widgetParent !== 'undefined'
      ? option.widgetParent
      : this.option.widgetParent
  this.option.offline = Boolean(option.offline)
  this.option.signInOption = {}
  if (option.signInOption) {
    try {
      this.option.signInOption = JSON.parse(JSON.stringify(option.signInOption))
    } catch (e) {}
  }
  if (option.offline) {
    this.option.signInOption.status = _constants.default.STATUS_OFFLINE
  }
  if (typeof this.option.signInOption.auth_timeout === 'undefined') {
    this.option.signInOption.auth_timeout = 5000
  }
  // use sub window or not
  if (!this.option.widgetParent && !this.option.offline) {
    this.subWindowStatus = 0
    Brekeke.UCAgentWidget.startingUCData = {}
    // start timer
    this.mainWindowHeartbeat = {
      timer: setInterval(
        this.heartBeatMainWindow.bind(this),
        this.MAIN_WINDOW_HEARTBEAT_DELAY_DEF,
      ),
      timestamp: +new Date(),
      status: 'ALIVE',
      nextSelectedTab: '',
      nextCloseTab: null,
      requestsTabOpenedEvents: true,
      mustReplyContinuation: null,
      mustShowModal: null,
    }
    this.subWindowTimer = setInterval(
      this.checkAndShowSubWindow.bind(this),
      this.SUB_WINDOW_TIMER_DELAY_DEF,
    )
    // do not init UcUiStore here (init UcUiStore in SubWindowModule.onload after init sub window)
  } else {
    // init UcUiStore
    this._ucUiAction = new UcUiAction()
    if (this.option.offline) {
      this._chatClient = new OfflineChatClient(this._logger)
      this._ucUiStore = new UcUiStore({
        logger: this._logger,
        ucUiAction: this._ucUiAction,
        chatClient: this._chatClient,
      })
    } else {
      this._ucUiStore = new UcUiStore({
        logger: this._logger,
        ucUiAction: this._ucUiAction,
      })
    }
    this.ucUiAction = this._ucUiAction
    this.ucUiStore = this._ucUiStore
    this._conferenceCaches = {}
    this.conferenceCaches = this._conferenceCaches
    this._ucUiStore.addHandler({
      signedIn: this.ucUiStore_signedIn.bind(this),
      signedOut: this.ucUiStore_signedOut.bind(this),
      webchatLeft: this.ucUiStore_webchatLeft.bind(this),
      searchResultChanged: this.ucUiStore_searchResultChanged.bind(this),
    })
    this._ucUiStore.getChatClient().addHandler({
      conferenceMemberChanged:
        this.chatClient_conferenceMemberChanged.bind(this),
      confTagUpdated: this.chatClient_confTagUpdated.bind(this),
    })
    this._ucUiAction.signIn(this.option.signInOption)
    console.log('#Duy Phan console startUCClient', this.option.widgetParent)
    if (this.option.widgetParent && !this.option.offline) {
      // init main widget uiData
      var signInOptionUrl = (0, _strings.string)(this.option.signInOption.url)
      this.mainWidgetUiData = new uiData({
        parentElement: this.option.widgetParent,
        ucUiAction: this.ucUiAction,
        ucUiStore: this.ucUiStore,
        agentComponentInstance: this,
        configurations: this.option.configurations,
        dndEnabled: true,
        bindsFunctions: true,
        urlFuncBeforeRender:
          signInOptionUrl +
          (signInOptionUrl.endsWith('/') ? '' : '/') +
          'wws?t=' +
          encodeURIComponent(this.option.signInOption.tenant) +
          '&u=' +
          encodeURIComponent(this.option.signInOption.user.split('?')[0]),
        handler: this.mainWidgetHandler,
      })
    }
    // update icon uiData
    this.updateIconUiData()
  }

  // init static dialog
  if (!this.option.offline) {
    this.dialogUcUiAction.setSearchConditions({
      chatType: 'HISTORYSEARCH',
      chatCode: '_static',
      searchConditions: [
        {
          conditionKey: '_content',
          defaultValue: '',
        },
        {
          conditionKey: '_datetime',
          defaultValue: '',
        },
        {
          conditionKey: '_onlyMe',
          conditionValue: '1',
          hidden: true,
        },
      ],
    })
  }
}

/**
 * stopUCClient function
 */
AgentComponent.prototype.stopUCClient = function () {
  if (this.initializeStatus !== 2) {
    return
  }
  this.focusedChat = null
  this.chatTable = {}
  this.popupFailedCount = 0
  // update icon uiData
  this.ucUiAction = this._dummyUcUiAction
  this.ucUiStore = this._dummyUcUiStore
  this.updateIconUiData()
  // terminate main widget uiData
  if (this.mainWidgetUiData) {
    this.mainWidgetUiData.destroyApp()
  }
  this.mainWidgetUiData = null
  // terminate ucUiStore
  this.ucUiStore = null
  this.ucUiAction = null
  if (this._ucUiAction) {
    this._ucUiAction.signOut()
  }
  if (this._ucUiStore) {
    this._ucUiStore.destroy()
  }
  this._ucUiStore = null
  this._ucUiAction = null
  if (this._chatClient) {
    this._chatClient.signOut()
  }
  this._chatClient = null
  this._conferenceCaches = {}
  this.conferenceCaches = this._conferenceCaches
  // stop timer
  if (this.subWindowTimer) {
    clearInterval(this.subWindowTimer)
  }
  this.subWindowTimer = null
  this.subWindow = null
  if (this.mainWindowHeartbeat.timer) {
    clearInterval(this.mainWindowHeartbeat.timer)
  }
  this.mainWindowHeartbeat.status = 'DEAD'
  this.mainWindowHeartbeat = {}
  // dequeue all logQueue
  this.logQueuedLog()
  this.initializeStatus = 1
  // close static dialog
  this.hideSearchDialog({
    dialogName: '_static',
    destroy: true,
  })
}

/**
 * addHandler function
 * handler
 */
AgentComponent.prototype.addHandler = function (handler) {
  this.handlers.push(handler)
}

/**
 * removeHandler function
 * handler
 */
AgentComponent.prototype.removeHandler = function (handler) {
  var index = this.handlers.indexOf(handler)
  if (index !== -1) {
    this.handlers.splice(index, 1)
  }
}

//
AgentComponent.prototype.fire = function (eventName) {
  var _arguments2 = arguments
  this.handlers.forEach(function (handler) {
    if (handler[eventName]) {
      handler[eventName].apply(
        handler,
        Array.prototype.slice.call(_arguments2, 1),
      )
    }
  })
}

/**
 * getWebchat function
 * webchatId
 */
AgentComponent.prototype.getWebchat = function (webchatId) {
  var conf_id = webchatId.substr(webchatId.indexOf('_') + 1)
  if (this.chatTable[conf_id]) {
    try {
      return JSON.parse(JSON.stringify(this.chatTable[conf_id]))
    } catch (e) {
      return null
    }
  } else {
    return null
  }
}
//
AgentComponent.prototype.newChat = function (conf_id) {
  var conference =
    this.ucUiStore &&
    this.ucUiStore.getChatClient() &&
    this.ucUiStore.getChatClient().getConference(conf_id)
  var conferenceCache
  if (
    conference &&
    conference.conf_status &&
    conference.conf_status !== _constants.default.CONF_STATUS_INACTIVE
  ) {
    conferenceCache = this.cacheConference(conf_id, {
      conference: conference,
    })
  } else {
    conferenceCache =
      (this.conferenceCaches && this.conferenceCaches[conf_id]) || {}
    conference = conferenceCache.conference || conference || {}
  }
  var yyyymm = conference.yyyymm
  if (!yyyymm) {
    var now = new Date()
    yyyymm = now.getFullYear() + ('0' + (now.getMonth() + 1)).slice(-2)
  }
  var isTalking =
    conference.conf_type === 'webchat'
      ? this.ucUiStore &&
        this.ucUiStore.getWebchatQueue({
          conf_id: conf_id,
        }).isTalking
      : conference.conf_status === _constants.default.CONF_STATUS_JOINED
  var webchatId = yyyymm + '_' + conf_id
  var lastConfType = (0, _strings.string)(
    conference.conf_tags &&
      conference.conf_tags
        .filter(function (tag) {
          return tag.tag_type === '_webchat' && tag.tag_key === 'lastConfType'
        })
        .sort(function (tag1, tag2) {
          return tag1.tstamp - tag2.tstamp
        })
        .map(function (tag) {
          return tag.tag_value
        })
        .pop(),
  )
  this.chatTable[conf_id] = {
    webchatId: webchatId,
    chatType: (0, _strings.string)(conference.conf_type),
    customerName: (0, _strings.string)(
      conference.creator && conference.creator.user_name,
    ),
    customerEmail: (0, _strings.string)(conference.webchatinfo.email),
    customerNote: (0, _strings.string)(conference.webchatinfo.profinfo_json),
    mediaType: (0, _strings.string)(
      conference.conf_tags &&
        conference.conf_tags
          .filter(function (tag) {
            return tag.tag_type === '_webchat' && tag.tag_key === 'mediaType'
          })
          .sort(function (tag1, tag2) {
            return tag1.tstamp - tag2.tstamp
          })
          .map(function (tag) {
            return tag.tag_value
          })
          .pop(),
    ),
    isOutgoing: lastConfType === 'emptylast' || lastConfType === 'webchat',
    originalWebchatId:
      lastConfType === 'webchat'
        ? (0, _strings.string)(
            conference.conf_tags &&
              conference.conf_tags
                .filter(function (tag) {
                  return (
                    tag.tag_type === '_relation' &&
                    tag.tag_key === '_originalWebchatId'
                  )
                })
                .sort(function (tag1, tag2) {
                  return tag1.tstamp - tag2.tstamp
                })
                .map(function (tag) {
                  return tag.tag_value
                })
                .pop(),
          )
        : '',
    outgoingId: (0, _strings.string)(
      conference.conf_tags &&
        conference.conf_tags
          .filter(function (tag) {
            return tag.tag_type === '_webchat' && tag.tag_key === 'outgoingId'
          })
          .sort(function (tag1, tag2) {
            return tag1.tstamp - tag2.tstamp
          })
          .map(function (tag) {
            return tag.tag_value
          })
          .pop(),
    ),
    appUrl: (0, _strings.string)(conference.webchatinfo.app_url),
    primaryAppInfo:
      conference.webchatinfo.primary_app_info &&
      _typeof(conference.webchatinfo.primary_app_info) === 'object'
        ? conference.webchatinfo.primary_app_info
        : {},
    secondaryAppInfo:
      conference.webchatinfo.secondary_app_info &&
      _typeof(conference.webchatinfo.secondary_app_info) === 'object'
        ? conference.webchatinfo.secondary_app_info
        : {},
    webchatServiceId: (0, _strings.string)(
      conference.webchatinfo.webchat_service_id,
    ),
    webchatServiceCode: (0, _strings.string)(
      conference.conf_tags &&
        conference.conf_tags
          .filter(function (tag) {
            return (
              tag.tag_type === '_webchat' &&
              tag.tag_key === 'webchatServiceCode'
            )
          })
          .sort(function (tag1, tag2) {
            return tag1.tstamp - tag2.tstamp
          })
          .map(function (tag) {
            return tag.tag_value
          })
          .pop(),
    ),
    acd: (0, _strings.string)(
      conference.invite_properties.webchatfromguest &&
        conference.invite_properties.webchatfromguest.acd_id,
    ),
    contactId: (0, _strings.string)(
      conference.conf_tags &&
        conference.conf_tags
          .filter(function (tag) {
            return tag.tag_type === '_webchat' && tag.tag_key === 'contactId'
          })
          .sort(function (tag1, tag2) {
            return tag1.tstamp - tag2.tstamp
          })
          .map(function (tag) {
            return tag.tag_value
          })
          .pop(),
    ),
    projectId: (0, _strings.string)(
      conference.conf_tags &&
        conference.conf_tags
          .filter(function (tag) {
            return tag.tag_type === '_webchat' && tag.tag_key === 'projectId'
          })
          .sort(function (tag1, tag2) {
            return tag1.tstamp - tag2.tstamp
          })
          .map(function (tag) {
            return tag.tag_value
          })
          .pop(),
    ),
    extWebchatInfo:
      (conference.conf_tags &&
        conference.conf_tags
          .filter(function (tag) {
            return (
              tag.tag_type === '_webchatext' ||
              tag.tag_type === '_webchatcustomer'
            )
          })
          .sort(function (tag1, tag2) {
            return tag1.tstamp - tag2.tstamp
          })
          .reduce(function (extWebchatInfo, tag) {
            extWebchatInfo[tag.tag_key] = tag.tag_value
            return extWebchatInfo
          }, {})) ||
      {},
    callEnabled: Boolean(conference.webchatinfo.call_enabled),
    callTarget: (0, _strings.string)(conference.webchatinfo.call_target),
    startTime: (0, _strings.int)(conferenceCache.startTime),
    firstStartTime: (0, _strings.int)(conferenceCache.firstStartTime),
    stateUpdateTime: (0, _strings.int)(conferenceCache.stateUpdateTime),
    customerStartTime: (0, _strings.int)(conference.created_tstamp),
    opened: true,
    webchatState: isTalking ? this.WEBCHAT_STATE_TALK : this.WEBCHAT_STATE_NONE,
  }
  return webchatId
}
//
AgentComponent.prototype.cacheConference = function (conf_id, data) {
  var _this45 = this
  if (!this.conferenceCaches) {
    this.conferenceCaches = {}
  }
  if (!this.conferenceCaches[conf_id]) {
    this.conferenceCaches[conf_id] = {}
  }
  data &&
    Object.keys(data).forEach(function (key) {
      _this45.conferenceCaches[conf_id][key] = data[key]
    })
  return this.conferenceCaches[conf_id]
}

/**
 * getOpenedWebchats function
 */
AgentComponent.prototype.getOpenedWebchats = function () {
  var openedChats = []
  if (this.chatTable) {
    for (var conf_id in this.chatTable) {
      if (this.chatTable[conf_id].opened) {
        try {
          openedChats.push(JSON.parse(JSON.stringify(this.chatTable[conf_id])))
        } catch (e) {}
      }
    }
  }
  return openedChats
}

/**
 * focusWebchat function
 * webchatId
 */
AgentComponent.prototype.focusWebchat = function (webchatId) {
  var conf_id = webchatId.substr(webchatId.indexOf('_') + 1)
  if (this.chatTable[conf_id] && this.chatTable[conf_id].opened) {
    this.focusWebchatInner(conf_id, false)
  }
}

/**
 * closeWebchat function
 * webchatId
 * option
 */
AgentComponent.prototype.closeWebchat = function (webchatId, option) {
  var conf_id = webchatId.substr(webchatId.indexOf('_') + 1)
  if (this.chatTable[conf_id] && this.chatTable[conf_id].opened) {
    // close
    if (!this.option.offline) {
      if (!this.option.widgetParent) {
        this.mainWindowHeartbeat.nextCloseTab = {
          panelType: 'CONFERENCE',
          panelCode: (0, _strings.string)(
            this.ucUiStore &&
              this.ucUiStore.getChatCodeByConfId({
                conf_id: conf_id,
              }).chatCode,
          ),
          force: (option && option.force) || false,
        }
      } else if (this.mainWidgetUiData) {
        this.mainWidgetUiData.closeTab({
          panelType: 'CONFERENCE',
          panelCode: (0, _strings.string)(
            this.ucUiStore &&
              this.ucUiStore.getChatCodeByConfId({
                conf_id: conf_id,
              }).chatCode,
          ),
          force: (option && option.force) || false,
        })
        this.mainWidgetUiData.render()
      }
    }
  }
}

/**
 * changeWebchatInfo function
 * webchatId
 * properties
 */
AgentComponent.prototype.changeWebchatInfo = function (webchatId, properties) {
  var conf_id = webchatId.substr(webchatId.indexOf('_') + 1)
  if (this.chatTable[conf_id] && this.chatTable[conf_id].opened) {
    if (this.ucUiStore && this.ucUiStore.getChatClient()) {
      var conference = this.ucUiStore.getChatClient().getConference(conf_id)
      var conf_tags_org = conference.conf_tags || []
      var adds = []
      var removes = []
      if (properties && typeof properties.contactId !== 'undefined') {
        adds.push({
          tag_key: 'contactId',
          tag_value: (0, _strings.string)(properties.contactId),
          tag_type: '_webchat',
          permission: _constants.default.USER_TYPE_TENANT_USER,
        })
        conf_tags_org.forEach(function (tag_org) {
          if (
            tag_org.tag_key === 'contactId' &&
            tag_org.tag_type === '_webchat'
          ) {
            removes.push({
              tag_id: tag_org.tag_id,
            })
          }
        })
      }
      if (properties && typeof properties.projectId !== 'undefined') {
        adds.push({
          tag_key: 'projectId',
          tag_value: (0, _strings.string)(properties.projectId),
          tag_type: '_webchat',
          permission: _constants.default.USER_TYPE_TENANT_USER,
        })
        conf_tags_org.forEach(function (tag_org) {
          if (
            tag_org.tag_key === 'projectId' &&
            tag_org.tag_type === '_webchat'
          ) {
            removes.push({
              tag_id: tag_org.tag_id,
            })
          }
        })
      }
      if (adds.length || removes.length) {
        this.ucUiStore.getChatClient().updateTag(
          {
            attached_type: 'conf',
            attached_id: conf_id,
            yyyymm: webchatId.substr(0, 6),
            adds: adds,
            removes: removes,
          },
          null,
          null,
        )
      }
    }
  }
}

/**
 * changeExtWebchatInfo function
 * webchatId
 * properties
 */
AgentComponent.prototype.changeExtWebchatInfo = function (
  webchatId,
  properties,
) {
  var conf_id = webchatId.substr(webchatId.indexOf('_') + 1)
  if (this.chatTable[conf_id] && this.chatTable[conf_id].opened) {
    if (this.ucUiStore && this.ucUiStore.getChatClient()) {
      var conference = this.ucUiStore.getChatClient().getConference(conf_id)
      var conf_tags_org = conference.conf_tags || []
      var adds = []
      var removes = []
      if (properties) {
        Object.keys(properties).forEach(function (key) {
          adds.push({
            tag_key: (0, _strings.string)(key),
            tag_value: (0, _strings.string)(properties[key]),
            tag_type: '_webchatext',
            permission: _constants.default.USER_TYPE_TENANT_USER,
          })
        })
        conf_tags_org.forEach(function (tag_org) {
          if (
            tag_org.tag_key in properties &&
            tag_org.tag_type === '_webchatext'
          ) {
            removes.push({
              tag_id: tag_org.tag_id,
            })
          }
        })
      }
      if (adds.length || removes.length) {
        this.ucUiStore.getChatClient().updateTag(
          {
            attached_type: 'conf',
            attached_id: conf_id,
            yyyymm: webchatId.substr(0, 6),
            adds: adds,
            removes: removes,
          },
          null,
          null,
        )
      }
    }
  }
}

/**
 * showSearchDialog function
 * option
 */
AgentComponent.prototype.showSearchDialog = function (option) {
  option = option || {}
  var dialogName = (0, _strings.string)(option.dialogName)
  var visibleOrg = Boolean(this.dialogUiDataTable[dialogName])
  if (!this.dialogUcUiStore) {
    this._logger.log('warn', 'dialogUcUiStore not initialized')
    return
  }
  if (this.dialogUiDataTable[dialogName]) {
    this.dialogUiDataTable[dialogName].destroyApp()
  }
  //   const parentElement = this.option.ownerDocument.createElement('div')
  //   this.option.ownerDocument.body.appendChild(parentElement)
  var parentElement = 'dialogPanel_top'
  var dialogOption = (0, _strings.clone)(option)
  if (!this.dialogWorkDataTable[dialogName]) {
    this.dialogWorkDataTable[dialogName] = {}
  }
  if (!this.dialogWorkDataTable[dialogName].rect) {
    this.dialogWorkDataTable[dialogName].rect = {}
  }
  if (typeof dialogOption.initialLeft === 'number') {
    this.dialogWorkDataTable[dialogName].rect.left = dialogOption.initialLeft
  } else {
    dialogOption.initialLeft = this.dialogWorkDataTable[dialogName].rect.left
  }
  if (typeof dialogOption.initialTop === 'number') {
    this.dialogWorkDataTable[dialogName].rect.top = dialogOption.initialTop
  } else {
    dialogOption.initialTop = this.dialogWorkDataTable[dialogName].rect.top
  }
  if (typeof dialogOption.initialWidth === 'number') {
    this.dialogWorkDataTable[dialogName].rect.width = dialogOption.initialWidth
  } else {
    dialogOption.initialWidth = this.dialogWorkDataTable[dialogName].rect.width
  }
  if (typeof dialogOption.initialHeight === 'number') {
    this.dialogWorkDataTable[dialogName].rect.height =
      dialogOption.initialHeight
  } else {
    dialogOption.initialHeight =
      this.dialogWorkDataTable[dialogName].rect.height
  }
  if (
    dialogOption.panelOption &&
    typeof dialogOption.panelOption.initialSplitterTop === 'number'
  ) {
    this.dialogWorkDataTable[dialogName].splitterTop =
      dialogOption.panelOption.initialSplitterTop
  } else {
    dialogOption.panelOption =
      (0, _strings.clone)(dialogOption.panelOption) || {}
    dialogOption.panelOption.initialSplitterTop =
      this.dialogWorkDataTable[dialogName].splitterTop
  }
  var dialogUiData = new uiData({
    parentElement: parentElement,
    ucUiAction: this.dialogUcUiAction,
    ucUiStore: this.dialogUcUiStore,
    agentComponentInstance: this,
    dialogPanel: 'HISTORYSEARCH' + '_' + dialogName,
    dialogOption: dialogOption,
    handler: this.dialogHandler,
  })
  this.dialogUiDataTable[dialogName] = dialogUiData
  dialogUiData.render()
  if (!visibleOrg) {
    // raise searchDialogChanged event
    this.fire('searchDialogChanged', {
      dialogName: dialogName,
      visible: true,
    })
  }
  // TODO: yano test
  if (this.ucUiStore) {
    this.dialogUcUiStore.chatClient = this.ucUiStore.chatClient
    this.dialogUcUiStore.buddyTable = this.ucUiStore.buddyTable
  }
}

/**
 * hideSearchDialog function
 * option
 */
AgentComponent.prototype.hideSearchDialog = function (option) {
  option = option || {}
  var dialogName = (0, _strings.string)(option.dialogName)
  var visibleOrg = Boolean(this.dialogUiDataTable[dialogName])
  if (!this.dialogUcUiStore || !this.dialogUcUiAction) {
    this._logger.log('warn', 'dialogUcUiStore not initialized')
    return
  }
  if (this.dialogUiDataTable[dialogName]) {
    this.dialogUiDataTable[dialogName].destroyApp()
    delete this.dialogUiDataTable[dialogName]
  }
  if (option.clear) {
    this.dialogUcUiAction.clearSearchResults({
      chatType: 'HISTORYSEARCH',
      chatCode: dialogName,
    })
    var searchConditions = this.dialogUcUiStore.getSearchConditions({
      chatType: 'HISTORYSEARCH',
      chatCode: dialogName,
    })
    var searchConditionsNew = searchConditions.map(function (searchCondition) {
      if (typeof searchCondition.defaultValue === 'string') {
        searchCondition.conditionValue = searchCondition.defaultValue
      }
      return searchCondition
    })
    this.dialogUcUiAction.setSearchConditions({
      chatType: 'HISTORYSEARCH',
      chatCode: dialogName,
      searchConditions: searchConditionsNew,
    })
  } else if (option.destroy) {
    this.dialogUcUiAction.clearSearchResults({
      chatType: 'HISTORYSEARCH',
      chatCode: dialogName,
    })
    this.dialogUcUiAction.setSearchConditions({
      chatType: 'HISTORYSEARCH',
      chatCode: dialogName,
      searchConditions: [],
    })
    this.dialogUcUiAction.clearChat({
      chatType: 'HISTORYSEARCH',
      chatCode: dialogName,
    })
    delete this.dialogWorkDataTable[dialogName]
  }
  if (visibleOrg) {
    // raise searchDialogChanged event
    this.fire('searchDialogChanged', {
      dialogName: dialogName,
      visible: false,
    })
  }
}

/**
 * getSearchConditions function
 * option
 */
AgentComponent.prototype.getSearchConditions = function (option) {
  option = option || {}
  var dialogName = (0, _strings.string)(option.dialogName)
  return (
    (this.dialogUcUiStore &&
      this.dialogUcUiStore.getSearchConditions({
        chatType: 'HISTORYSEARCH',
        chatCode: dialogName,
      })) ||
    []
  )
}

/**
 * setSearchConditions function
 * option
 */
AgentComponent.prototype.setSearchConditions = function (option) {
  option = option || {}
  var dialogName = (0, _strings.string)(option.dialogName)
  var searchConditions = option.searchConditions || []
  if (!this.dialogUcUiStore || !this.dialogUcUiAction) {
    this._logger.log('warn', 'dialogUcUiStore not initialized')
    return
  }
  this.dialogUcUiAction.setSearchConditions({
    chatType: 'HISTORYSEARCH',
    chatCode: dialogName,
    searchConditions: searchConditions,
  })
}

/**
 * doSearch function
 * option
 */
AgentComponent.prototype.doSearch = function (option) {
  option = option || {}
  var dialogName = (0, _strings.string)(option.dialogName)
  var searchMore = Boolean(option.searchMore)
  if (!this.dialogUcUiStore || !this.dialogUcUiAction) {
    this._logger.log('warn', 'dialogUcUiStore not initialized')
    return
  }
  // TODO: yano test
  if (this.ucUiStore) {
    this.dialogUcUiStore.chatClient = this.ucUiStore.chatClient
  }
  this.dialogUcUiAction.doSearch({
    chatType: 'HISTORYSEARCH',
    chatCode: dialogName,
    searchMore: searchMore,
    emphasize: true,
  })
}

/**
 * getSearchResults function
 * option
 */
AgentComponent.prototype.getSearchResults = function (option) {
  option = option || {}
  var dialogName = (0, _strings.string)(option.dialogName)
  return (
    (this.dialogUcUiStore &&
      this.dialogUcUiStore.getSearchResults({
        chatType: 'HISTORYSEARCH',
        chatCode: dialogName,
        searchResultIds: option.searchResultIds,
      })) ||
    []
  )
}

/**
 * replyWebchat function
 * webchatId
 * option
 */
AgentComponent.prototype.replyWebchat = function (webchatId, option) {
  var _this46 = this
  return new Promise(function (resolve, reject) {
    if (!webchatId) {
      _this46._logger.log('warn', 'empty webchatId')
      return reject(new Error('empty webchatId'))
    }
    if (_this46.option.offline) {
      _this46._logger.log('warn', 'cannot reply (offline)')
      return reject(new Error('cannot reply (offline)'))
    }
    if (!_this46.ucUiStore || !_this46.ucUiAction) {
      _this46._logger.log('warn', 'cannot reply (uc client not started)')
      return reject(new Error('cannot reply (uc client not started)'))
    }
    if (_this46.option.widgetParent && !_this46.mainWidgetUiData) {
      _this46._logger.log('warn', 'cannot reply (uc widget not started)')
      return reject(new Error('cannot reply (uc widget not started)'))
    }

    // memory webchat info
    _this46.replyingWebchatInfos[webchatId] = {
      replyTime: +new Date(),
    }

    // get (search) webchat information
    var workChatType = 'WORKFORREPLYING'
    var workChatCode = (0, _strings.string)(++_this46.workForReplyingCounter)
    _this46.ucUiAction.setSearchConditions({
      chatType: workChatType,
      chatCode: workChatCode,
      searchConditions: [
        {
          conditionKey: '_webchatIds',
          conditionValue: webchatId,
        },
        {
          conditionKey: '_chatType',
          conditionValue: 'webchat',
        },
      ],
    })
    _this46.workForReplyingFunctions[workChatCode] = function (ev) {
      // searchResultChanged event handler
      if (!ev.searching) {
        var configProperties = _this46.ucUiStore.getConfigProperties()
        var searchResult = _this46.ucUiStore.getSearchResults(ev)[0] || {}
        if (
          (
            (configProperties.optional_config &&
              configProperties.optional_config.awsl) ||
            []
          ).some(function (aws) {
            return aws.id === searchResult.webchatServiceId && aws.senders
          })
        ) {
          var replyType = null
          if (option && typeof option.replyType !== 'undefined') {
            if (option.replyType !== '') {
              if (
                (0, _strings.string)(searchResult.replyTypes)
                  .split(',')
                  .indexOf(option.replyType) !== -1
              ) {
                replyType = option.replyType
              }
            } else {
              if (
                'TRUE' ===
                (0, _strings.string)(
                  searchResult.webchatContinuable,
                ).toUpperCase()
              ) {
                replyType = ''
              }
            }
          } else {
            if (searchResult.replyTypes) {
              replyType = (0, _strings.string)(searchResult.replyTypes).split(
                ',',
              )[0]
            } else {
              if (
                'TRUE' ===
                (0, _strings.string)(
                  searchResult.webchatContinuable,
                ).toUpperCase()
              ) {
                replyType = ''
              }
            }
          }
          if (replyType !== null) {
            // if replyable
            // get detail (chatList) of searchResult
            _this46.ucUiAction.expandSearchResult({
              chatType: workChatType,
              chatCode: workChatCode,
              searchResultIds: [searchResult.searchResultId],
            })
            // memory continuation info
            var replyingContinuationInfo = {
              conf_id: searchResult._conf_id,
              yyyymm: searchResult._yyyymm,
              searchResultId: searchResult.searchResultId,
              replyTime: +new Date(),
              resolve: resolve,
              reject: reject,
            }
            _this46.replyingContinuationInfos.push(replyingContinuationInfo)
            setTimeout(function () {
              while (
                _this46.replyingContinuationInfos[0] &&
                _this46.replyingContinuationInfos[0].replyTime + 60000 <
                  +new Date()
              ) {
                var info = _this46.replyingContinuationInfos.shift()
                _this46._logger.log(
                  'warn',
                  'replying timeout ' + JSON.stringify(info),
                )
                info.reject &&
                  info.reject(
                    new Error('replying timeout ' + JSON.stringify(info)),
                  )
              }
            }, 60000 + 1000)
            // reply continuation
            if (!_this46.option.offline) {
              var nextWebchatTags = []
              if (
                option &&
                option.webchatInfo &&
                typeof option.webchatInfo.contactId !== 'undefined'
              ) {
                nextWebchatTags.push({
                  tag_key: 'contactId',
                  tag_value: (0, _strings.string)(option.webchatInfo.contactId),
                  tag_type: '_webchat',
                  permission: _constants.default.USER_TYPE_TENANT_USER,
                })
              }
              if (
                option &&
                option.webchatInfo &&
                typeof option.webchatInfo.projectId !== 'undefined'
              ) {
                nextWebchatTags.push({
                  tag_key: 'projectId',
                  tag_value: (0, _strings.string)(option.webchatInfo.projectId),
                  tag_type: '_webchat',
                  permission: _constants.default.USER_TYPE_TENANT_USER,
                })
              }
              if (option && option.extWebchatInfo) {
                Object.keys(option.extWebchatInfo).forEach(function (key) {
                  nextWebchatTags.push({
                    tag_key: (0, _strings.string)(key),
                    tag_value: (0, _strings.string)(option.extWebchatInfo[key]),
                    tag_type: '_webchatext',
                    permission: _constants.default.USER_TYPE_TENANT_USER,
                  })
                })
              }
              if (option && option.outgoingId) {
                nextWebchatTags.push({
                  tag_key: 'outgoingId',
                  tag_value: (0, _strings.string)(option.outgoingId),
                  tag_type: '_webchat',
                  permission: _constants.default.USER_TYPE_TENANT_USER,
                })
              }
              if (!_this46.option.widgetParent) {
                _this46.mainWindowHeartbeat.mustReplyContinuation = {
                  searchResult: searchResult,
                  replyType: replyType,
                  nextWebchatTags: nextWebchatTags,
                  resolve: resolve,
                  reject: reject,
                }
              } else if (_this46.mainWidgetUiData) {
                _this46.mainWidgetUiData
                  .replyContinuation(
                    searchResult._yyyymm,
                    searchResult._conf_id,
                    replyType,
                    searchResult.originalWebchatId,
                    true,
                    nextWebchatTags,
                  )
                  .catch(reject)
              }
            } else {
              _this46._logger.log(
                'warn',
                'cannot reply (offline after searchResultChanged)',
              )
              reject(
                new Error('cannot reply (offline after searchResultChanged)'),
              )
            }
          } else {
            _this46._logger.log(
              'warn',
              'cannot reply (replyType not found) : ' +
                webchatId +
                ', ' +
                (option && JSON.stringify(option)),
            )
            if (!_this46.option.widgetParent && !_this46.option.offline) {
              _this46.mainWindowHeartbeat.mustShowModal = {
                title: _uawmsgs.default.CMN_ALERT,
                message: 'cannot reply (replyType not found) : ' + webchatId,
              }
            } else if (_this46.mainWidgetUiData) {
              _this46.mainWidgetUiData.showModal({
                title: _uawmsgs.default.CMN_ALERT,
                message: 'cannot reply (replyType not found) : ' + webchatId,
              })
            }
            reject(
              new Error(
                'cannot reply (replyType not found) : ' +
                  webchatId +
                  ', ' +
                  (option && JSON.stringify(option)),
              ),
            )
          }
        } else {
          _this46._logger.log(
            'warn',
            'cannot reply (check senders of webchatServiceId=' +
              searchResult.webchatServiceId +
              ') : ' +
              webchatId +
              ', ' +
              (option && JSON.stringify(option)),
          )
          if (!_this46.option.widgetParent && !_this46.option.offline) {
            _this46.mainWindowHeartbeat.mustShowModal = {
              title: _uawmsgs.default.CMN_ALERT,
              message:
                'cannot reply (check senders of webchatServiceId=' +
                searchResult.webchatServiceId +
                ') : ' +
                webchatId,
            }
          } else if (_this46.mainWidgetUiData) {
            _this46.mainWidgetUiData.showModal({
              title: _uawmsgs.default.CMN_ALERT,
              message:
                'cannot reply (check senders of webchatServiceId=' +
                searchResult.webchatServiceId +
                ') : ' +
                webchatId,
            })
          }
          reject(
            new Error(
              'cannot reply (check senders of webchatServiceId=' +
                searchResult.webchatServiceId +
                ') : ' +
                webchatId +
                ', ' +
                (option && JSON.stringify(option)),
            ),
          )
        }
        return true
      }
    }
    _this46.ucUiAction.doSearch({
      chatType: workChatType,
      chatCode: workChatCode,
    })
  })
}

/**
 * createOutgoingWebchat function
 * option
 */
AgentComponent.prototype.createOutgoingWebchat = function (option) {
  var _this47 = this
  return new Promise(function (resolve, reject) {
    if (_this47.option.offline) {
      _this47._logger.log('warn', 'cannot create outgoing webchat (offline)')
      return reject(new Error('cannot create outgoing webchat (offline)'))
    }
    if (!_this47.ucUiStore || !_this47.ucUiAction) {
      _this47._logger.log(
        'warn',
        'cannot create outgoing webchat (uc client not started)',
      )
      return reject(
        new Error('cannot create outgoing webchat (uc client not started)'),
      )
    }
    if (_this47.option.widgetParent && !_this47.mainWidgetUiData) {
      _this47._logger.log(
        'warn',
        'cannot create outgoing webchat (uc widget not started)',
      )
      return reject(
        new Error('cannot create outgoing webchat (uc widget not started)'),
      )
    }
    _this47.ucUiStore.getChatClient().createOutgoingWebchat(
      option,
      function (ev) {
        var replyType = ev.replyType
        var conf_id = ev.conf_id
        var yyyymm = ev.yyyymm
        var configProperties = _this47.ucUiStore.getConfigProperties()

        // publish continuation code
        var continuation_code = _this47.ucUiStore
          .getChatClient()
          .publishContinuationCode({
            yyyymm: yyyymm,
            conf_id: conf_id,
          })
        _this47.ucUiStore
          .getLogger()
          .log('debug', 'published continuation_code=' + continuation_code)

        // memory continuation info
        var replyingContinuationInfo = {
          conf_id: conf_id,
          yyyymm: yyyymm,
          searchResultId: null,
          replyTime: +new Date(),
          resolve: resolve,
          reject: reject,
        }
        _this47.replyingContinuationInfos.push(replyingContinuationInfo)
        setTimeout(function () {
          while (
            _this47.replyingContinuationInfos[0] &&
            _this47.replyingContinuationInfos[0].replyTime + 60000 < +new Date()
          ) {
            var info = _this47.replyingContinuationInfos.shift()
            _this47._logger.log(
              'warn',
              'replying timeout ' + JSON.stringify(info),
            )
            info.reject &&
              info.reject(new Error('replying timeout ' + JSON.stringify(info)))
          }
        }, 60000 + 1000)
        if (replyType === '') {
          // show continuation code
          if (!_this47.option.widgetParent && !_this47.option.offline) {
            _this47.mainWindowHeartbeat.mustShowModal = {
              title:
                _uawmsgs.default.MSG_REPLY_MANUAL_CONTINUATION_DIALOG_TITLE,
              message:
                '<input type="text" value="' +
                continuation_code +
                '" class="brTextBox brReplyReentryCode" readonly onfocus="this.select();" />',
              asHTML: true,
            }
          } else if (_this47.mainWidgetUiData) {
            _this47.mainWidgetUiData.showModal({
              title:
                _uawmsgs.default.MSG_REPLY_MANUAL_CONTINUATION_DIALOG_TITLE,
              message:
                '<input type="text" value="' +
                continuation_code +
                '" class="brTextBox brReplyReentryCode" readonly onfocus="this.select();" />',
              asHTML: true,
            })
          }
          resolve({})
        } else {
          // invite guest
          var optional_ev = {
            agent_operation: 'create',
          }
          if (option && option.optional_ev) {
            for (var key in option.optional_ev) {
              optional_ev[key] = option.optional_ev[key]
            }
          }
          if (!optional_ev.guest_user_name && option && option.name) {
            optional_ev.guest_user_name = option.name
          }
          if (!optional_ev.guest_user_email && option && option.email) {
            optional_ev.guest_user_email = option.email
          }
          if (
            !optional_ev.webchat_service_id &&
            option &&
            option.webchatServiceId
          ) {
            optional_ev.webchat_service_id = option.webchatServiceId
          }
          var inviteGuestFunc = function inviteGuestFunc() {
            _this47.ucUiStore.getChatClient().inviteGuest(
              {
                conf_id: conf_id,
                yyyymm: yyyymm,
                selected_reply_type: replyType,
                continuation_code: continuation_code,
                optional_ev: optional_ev,
              },
              function (ev) {},
              function (ev) {
                _this47.ucUiStore
                  .getLogger()
                  .log(
                    'warn',
                    'chatClient.inviteGuest error code=' +
                      ev.code +
                      ', message=' +
                      ev.message,
                  )
                if (!_this47.option.widgetParent && !_this47.option.offline) {
                  _this47.mainWindowHeartbeat.mustShowModal = {
                    title: _uawmsgs.default.CMN_ALERT,
                    message:
                      'Failed to reply.' +
                      '\n(' +
                      ev.code +
                      ' ' +
                      ev.message +
                      ')',
                  }
                } else if (_this47.mainWidgetUiData) {
                  _this47.mainWidgetUiData.showModal({
                    title: _uawmsgs.default.CMN_ALERT,
                    message:
                      'Failed to reply.' +
                      '\n(' +
                      ev.code +
                      ' ' +
                      ev.message +
                      ')',
                  })
                }
                reject(
                  new Error(
                    'chatClient.inviteGuest error code=' +
                      ev.code +
                      ', message=' +
                      ev.message,
                  ),
                )
              },
            )
          }
          if (!optional_ev.webchat_service_id) {
            var awsl = (
              (configProperties &&
                configProperties.optional_config &&
                configProperties.optional_config.awsl) ||
              []
            ).filter(function (aws) {
              if (aws.og && aws.og.disabled) {
                return false
              }
              if (!aws.senders) {
                return false
              }
              if (option && option.acd) {
                if (
                  aws.type === '1' &&
                  (0, _strings.string)(aws.senders)
                    .split(',')
                    .indexOf(option.acd) !== -1
                ) {
                  return true
                }
                return false
              }
              return true
            })
            if (awsl.length === 1) {
              optional_ev.webchat_service_id = (0, _strings.string)(awsl[0].id)
              inviteGuestFunc()
            } else if (awsl.length > 1) {
              _this47.ucUiStore
                .getLogger()
                .log('info', 'ambiguous webchat_service_id')
              if (!_this47.option.widgetParent && !_this47.option.offline) {
                _this47.mainWindowHeartbeat.mustShowModal = {
                  title: _uawmsgs.default.CMN_ALERT,
                  message: _uawmsgs.default.MSG_CREATE_OUTGOING_AMBIGUOUS,
                  selectItemList: awsl.map(function (aws, i) {
                    return {
                      label: aws.id + (aws.descr ? ' (' + aws.descr + ')' : ''),
                      selected: i === 0,
                      id: aws.id,
                    }
                  }),
                  cancelable: true,
                  onOk: function onOk(ev) {
                    optional_ev.webchat_service_id =
                      ev.modalInfo &&
                      ev.modalInfo.selectItemList &&
                      ev.modalInfo.selectItemList.filter &&
                      ev.modalInfo.selectItemList
                        .filter(function (item) {
                          return item.selected
                        })
                        .map(function (item) {
                          return item.id
                        })
                        .pop()
                    inviteGuestFunc()
                  },
                  onCancel: function onCancel(ev) {
                    _this47.ucUiStore
                      .getLogger()
                      .log('info', 'CREATE_OUTGOING_AMBIGUOUS onCancel')
                    reject(new Error('CREATE_OUTGOING_AMBIGUOUS onCancel'))
                  },
                }
              } else if (_this47.mainWidgetUiData) {
                _this47.mainWidgetUiData.showModal({
                  title: _uawmsgs.default.CMN_ALERT,
                  message: _uawmsgs.default.MSG_CREATE_OUTGOING_AMBIGUOUS,
                  selectItemList: awsl.map(function (aws, i) {
                    return {
                      label: aws.id + (aws.descr ? ' (' + aws.descr + ')' : ''),
                      selected: i === 0,
                      id: aws.id,
                    }
                  }),
                  cancelable: true,
                  onOk: function onOk(ev) {
                    optional_ev.webchat_service_id =
                      ev.modalInfo &&
                      ev.modalInfo.selectItemList &&
                      ev.modalInfo.selectItemList.filter &&
                      ev.modalInfo.selectItemList
                        .filter(function (item) {
                          return item.selected
                        })
                        .map(function (item) {
                          return item.id
                        })
                        .pop()
                    inviteGuestFunc()
                  },
                  onCancel: function onCancel(ev) {
                    _this47.ucUiStore
                      .getLogger()
                      .log('info', 'CREATE_OUTGOING_AMBIGUOUS onCancel')
                    reject(new Error('CREATE_OUTGOING_AMBIGUOUS onCancel'))
                  },
                })
              }
            } else {
              _this47.ucUiStore
                .getLogger()
                .log('warn', 'no webchat services for outgoing')
              if (!_this47.option.widgetParent && !_this47.option.offline) {
                _this47.mainWindowHeartbeat.mustShowModal = {
                  title: _uawmsgs.default.CMN_ALERT,
                  message:
                    'Failed to reply.' + '\n(no webchat services for outgoing)',
                }
              } else if (_this47.mainWidgetUiData) {
                _this47.mainWidgetUiData.showModal({
                  title: _uawmsgs.default.CMN_ALERT,
                  message:
                    'Failed to reply.' + '\n(no webchat services for outgoing)',
                })
              }
              reject(new Error('no webchat services for outgoing'))
            }
          } else {
            inviteGuestFunc()
          }
        }
      },
      function (ev) {
        _this47._logger.log(
          'warn',
          'chatClient.createOutgoingWebchat error code=' +
            ev.code +
            ', message=' +
            ev.message,
        )
        if (!_this47.option.widgetParent && !_this47.option.offline) {
          _this47.mainWindowHeartbeat.mustShowModal = {
            title: _uawmsgs.default.CMN_ALERT,
            message:
              'chatClient.createOutgoingWebchat error code=' +
              ev.code +
              ', message=' +
              ev.message,
          }
        } else if (_this47.mainWidgetUiData) {
          _this47.mainWidgetUiData.showModal({
            title: _uawmsgs.default.CMN_ALERT,
            message:
              'chatClient.createOutgoingWebchat error code=' +
              ev.code +
              ', message=' +
              ev.message,
          })
        }
        reject(
          new Error(
            'chatClient.createOutgoingWebchat error code=' +
              ev.code +
              ', message=' +
              ev.message,
          ),
        )
      },
    )
  })
}

/**
 * getOutgoingWebchatServices function
 * option
 */
AgentComponent.prototype.getOutgoingWebchatServices = function (option) {
  return (
    (
      ((this.ucUiStore && this.ucUiStore.getConfigProperties()) || {})
        .optional_config || {}
    ).awsl || []
  )
    .filter(function (aws) {
      if (aws.og && aws.og.disabled) {
        return false
      }
      if (!aws.senders) {
        return false
      }
      if (option && option.acds) {
        if (
          aws.type !== '1' ||
          !(0, _strings.string)(aws.senders)
            .split(',')
            .some(function (acd) {
              return Array.prototype.indexOf.call(option.acds, acd) !== -1
            })
        ) {
          return false
        }
      }
      if (option && option.replyTypes) {
        if (
          aws.og &&
          aws.og.reply_types &&
          !Array.prototype.some.call(aws.og.reply_types, function (reply_type) {
            return Array.prototype.some.call(
              option.replyTypes,
              function (replyType) {
                return (
                  (0, _strings.string)(replyType).toUpperCase() ===
                  (0, _strings.string)(reply_type).toUpperCase()
                )
              },
            )
          })
        ) {
          return false
        }
      }
      return true
    })
    .map(function (aws) {
      return {
        webchatServiceId: (0, _strings.string)(aws.id),
        description: (0, _strings.string)(aws.descr),
        type: (0, _strings.string)(aws.type),
        target: (0, _strings.string)(aws.target),
        senders: (0, _strings.string)(aws.senders),
        acds:
          aws.type === '1' ? (0, _strings.string)(aws.senders).split(',') : [],
        replyTypes: (aws.og && aws.og.reply_types) || null,
      }
    })
}

//
AgentComponent.prototype.heartBeatMainWindow = function () {
  this.mainWindowHeartbeat.timestamp = +new Date()
  this.logQueuedLog()
}

//
AgentComponent.prototype.checkAndShowSubWindow =
  /*#__PURE__*/ _asyncToGenerator(
    /*#__PURE__*/ _regenerator().m(function _callee() {
      var windowName,
        windowBox,
        windowBoxStr,
        newWindowBox,
        windowFeatures,
        writableSubwindow,
        meta,
        script,
        _t,
        _t2,
        _t3,
        _t4,
        _t5
      return _regenerator().w(
        function (_context) {
          while (1)
            switch (_context.n) {
              case 0:
                if (!(this.initializeStatus !== 2)) {
                  _context.n = 1
                  break
                }
                return _context.a(2)
              case 1:
                windowName =
                  'UC_' +
                  JSON.stringify({
                    tenant: (0, _strings.string)(
                      (this.option.signInOption || {}).tenant,
                    ),
                    user_id: (0, _strings.string)(
                      (this.option.signInOption || {}).user,
                    ),
                  })
                windowBox = {
                  l: 0,
                  t: 0,
                  w: 300,
                  h: 400,
                }
                _context.p = 2
                windowBoxStr = ''
                _context.p = 3
                _context.n = 4
                return _asyncStorage.default.getItem(
                  'UC.ucagentwidget.agentcomponent.subwindowbox',
                )
              case 4:
                windowBoxStr = _context.v
                _context.n = 6
                break
              case 5:
                _context.p = 5
                _t = _context.v
              case 6:
                if (!windowBoxStr) {
                  // windowBoxStr = cookie('brekeke.ucagentwidget.agentcomponent.subwindowbox')
                }
                if (windowBoxStr) {
                  newWindowBox = JSON.parse(windowBoxStr)
                  if (newWindowBox) {
                    windowBox.l =
                      typeof newWindowBox.l === 'number'
                        ? newWindowBox.l
                        : windowBox.l
                    windowBox.t =
                      typeof newWindowBox.t === 'number'
                        ? newWindowBox.t
                        : windowBox.t
                    windowBox.w =
                      typeof newWindowBox.w === 'number'
                        ? newWindowBox.w
                        : windowBox.w
                    windowBox.h =
                      typeof newWindowBox.h === 'number'
                        ? newWindowBox.h
                        : windowBox.h
                  }
                }
                _context.n = 8
                break
              case 7:
                _context.p = 7
                _t2 = _context.v
              case 8:
                windowFeatures = (0, _strings.formatStr)(
                  'width={0}, height={1}, left={2}, top={3}',
                  windowBox.w,
                  windowBox.h,
                  windowBox.l,
                  windowBox.t,
                )
                if (
                  !this.subWindow &&
                  Brekeke.UCAgentWidget.startingUCData &&
                  Brekeke.UCAgentWidget.startingUCData.subWindowAlive
                ) {
                  // reconnect new main window to existing sub window
                  this.subWindow =
                    Brekeke.UCAgentWidget.startingUCData.subWindowAlive
                  // do not call subWindowConnected here (call subWindowConnected in SubWindowModule.checkMainWindowAlive after set ucUiStore, ...)
                } else if (!this.subWindow || this.subWindow.closed) {
                  // call subWindowDisconnected
                  this.subWindowDisconnected()
                  // open new sub window
                  this.subWindow = window.open('', windowName, windowFeatures)
                  // do not call subWindowConnected here (call subWindowConnected in SubWindowModule.onload after init sub window)
                }
                delete Brekeke.UCAgentWidget.startingUCData
                if (
                  !(
                    !this.subWindow ||
                    !this.subWindow.location ||
                    !this.subWindow.document
                  )
                ) {
                  _context.n = 9
                  break
                }
                this.popupFailedCount++
                this._logger.log(
                  'info',
                  (0, _strings.formatStr)(
                    'window.open failed ({0})',
                    this.popupFailedCount,
                  ),
                )
                if (this.popupFailedCount === 3) {
                  this._logger.log('warn', 'window.open may be blocked')
                  // raise errorOccurred event
                  this.fire('errorOccurred', {
                    errorCode: this.ERROR_POPUP_BLOCKED,
                    errorMessage: _uawmsgs.default.MSG_ERROR_POPUP_BLOCKED,
                  })
                }
                _context.n = 15
                break
              case 9:
                if (!(this.subWindow.location.href === 'about:blank')) {
                  _context.n = 14
                  break
                }
                // init sub window
                this.subWindow.Brekeke = {
                  UCAgentWidgetSubWindow: {
                    AgentComponentInstanceOfMainWindow: this,
                    WindowBox: windowBox,
                    WindowTitle: _uawmsgs.default.LBL_SUB_WINDOW_MODULE_TITLE,
                  },
                }
                writableSubwindow = 0
                _context.p = 10
                _t3 = _strings.int
                _context.n = 11
                return _asyncStorage.default.getItem(
                  'UC.ucagentwidget.agentcomponent.writablesubwindow',
                )
              case 11:
                _t4 = _context.v
                writableSubwindow = _t3(_t4)
                _context.n = 13
                break
              case 12:
                _context.p = 12
                _t5 = _context.v
              case 13:
                if (writableSubwindow === 1) {
                  this.subWindow.document.open()
                  this.subWindow.document.write('<!doctype html>')
                  this.subWindow.document.write('<html>')
                  this.subWindow.document.write('<head>')
                  this.subWindow.document.write('<meta charset="utf-8">')
                  this.subWindow.document.write('<title>')
                  this.subWindow.document.write('.')
                  this.subWindow.document.write('</title>')
                  this.subWindow.document.write(
                    '<link rel="stylesheet" href="' +
                      _currentscript.default.DIR +
                      '../../../css/ucagentwidget.css' +
                      _currentscript.default.QUERY +
                      '" />',
                  )
                  this.subWindow.document.write(
                    '<link rel="stylesheet" href="' +
                      _currentscript.default.DIR +
                      '../../../css/react-datepicker.css' +
                      _currentscript.default.QUERY +
                      '" />',
                  )
                  this.subWindow.document.write('</head>')
                  this.subWindow.document.write('<body>')
                  this.subWindow.document.write('<div id="content">')
                  this.subWindow.document.write('</div>')
                  this.subWindow.document.write(
                    '<script charset="utf-8" src="' +
                      _currentscript.default.DIR +
                      _currentscript.default.FILE +
                      _currentscript.default.QUERY +
                      '"></script>',
                  )
                  this.subWindow.document.write('<script>')
                  this.subWindow.document.write(
                    'var subWindowModule = new Brekeke.UCAgentWidget.SubWindowModule();',
                  )
                  this.subWindow.document.write('</script>')
                  this.subWindow.document.write('</body>')
                  this.subWindow.document.write('</html>')
                  this.subWindow.document.close()
                } else {
                  this.subWindow.document.open() // this.subWindow.location.href to be same as main window
                  this.subWindow.document.close()
                  meta = this.subWindow.document.createElement('meta')
                  meta.setAttribute('charset', 'utf-8')
                  this.subWindow.document.head.appendChild(meta)
                  script = this.subWindow.document.createElement('script')
                  script.async = 1
                  script.setAttribute('charset', 'utf-8')
                  script.src =
                    _currentscript.default.DIR +
                    _currentscript.default.FILE +
                    '?newsubwindowmodule' +
                    (_currentscript.default.QUERY &&
                    _currentscript.default.QUERY[0] === '?'
                      ? '&' + _currentscript.default.QUERY.substring(1)
                      : '')
                  this.subWindow.document.body.appendChild(script)
                }
                _context.n = 15
                break
              case 14:
                // sub window already initialized
                // update main window reference
                this.subWindow.Brekeke.UCAgentWidgetSubWindow.AgentComponentInstanceOfMainWindow =
                  this
              case 15:
                return _context.a(2)
            }
        },
        _callee,
        this,
        [
          [10, 12],
          [3, 5],
          [2, 7],
        ],
      )
    }),
  )

//
AgentComponent.prototype.subWindowConnected = function () {
  if (!this.subWindowStatus) {
    this.subWindowStatus = 1
    // raise subWindowConnected event
    this.fire('subWindowConnected', {
      isSigned: Boolean(
        this.ucUiStore && this.ucUiStore.getSignInStatus() === 3,
      ),
    })
  }
}

//
AgentComponent.prototype.subWindowDisconnected = function () {
  if (this.subWindowStatus) {
    this.subWindowStatus = 0
    // raise subWindowDisconnected event
    this.fire('subWindowDisconnected', {})
  }
}

//
AgentComponent.prototype.updateIconUiData = function () {
  // terminate and init icon uiData if ucUiStore changed
  if (this.iconUiDataTable && !this.option.offline) {
    var webchatNotificationTarget = true
    for (var iconName in this.iconUiDataTable) {
      var iconUiDataOrg = this.iconUiDataTable[iconName]
      if (iconUiDataOrg.ucUiStore !== this.ucUiStore) {
        var iconUiData = new uiData({
          parentElement: iconUiDataOrg.parentElement,
          ucUiAction: this.ucUiAction,
          ucUiStore: this.ucUiStore,
          agentComponentInstance: this,
          configurations: iconUiDataOrg.configurations,
          webchatNotificationTarget: webchatNotificationTarget,
          iconName: iconName,
          iconDisabled: this.ucUiStore === this._dummyUcUiStore,
          handler: this.iconHandler,
        })
        webchatNotificationTarget = false
        this.iconUiDataTable[iconName] = iconUiData
        iconUiDataOrg.destroyApp()
        iconUiData.render()
        console.log('#Duy Phan console render iconUiData')
      }
    }
  }
}

//
AgentComponent.prototype.logQueuedLog = function () {
  // output log from sub window
  var args
  while ((args = this.logQueue.shift())) {
    if (this._logger) {
      this._logger.outputLog(
        args.level,
        args.content,
        args.stackTrace,
        args.date,
      )
    }
  }
}

//
AgentComponent.prototype.languageLoaded = function (lang) {
  if (this.iconUiDataTable) {
    for (var iconName in this.iconUiDataTable) {
      this.iconUiDataTable[iconName].render()
    }
  }
  if (this._logger) {
    this._logger.log('info', 'language=' + lang)
  }
}

// events from UcUiStore
AgentComponent.prototype.ucUiStore_signedIn = function (ev) {
  var configProperties =
    this && this.ucUiStore && this.ucUiStore.getConfigProperties()
  var dclt = (0, _strings.string)(
    configProperties &&
      configProperties.optional_config &&
      configProperties.optional_config.dclt,
  )
  try {
    if (dclt) {
      _asyncStorage.default.setItem(
        'UC.ucagentwidget.agentcomponent.defaultconsolelogtype',
        dclt,
      )
    } else {
      _asyncStorage.default.removeItem(
        'UC.ucagentwidget.agentcomponent.defaultconsolelogtype',
      )
    }
  } catch (e) {}
  // raise signedIn event
  this.fire(
    'signedIn',
    Object.assign(
      {
        signInOption: this.option.signInOption,
      },
      ev,
    ),
  )
}
AgentComponent.prototype.ucUiStore_signedOut = function (ev) {
  if (this.chatTable) {
    for (var conf_id in this.chatTable) {
      if (this.chatTable[conf_id].webchatState !== this.WEBCHAT_STATE_NONE) {
        this.chatTable[conf_id].webchatState = this.WEBCHAT_STATE_NONE
        this.chatTable[conf_id].stateUpdateTime = (0, _strings.int)(ev.tstamp)
        this.cacheConference(conf_id, {
          stateUpdateTime: this.chatTable[conf_id].stateUpdateTime,
        })
        // raise webchatStateChanged event
        this.fire(
          'webchatStateChanged',
          this.getWebchat(this.chatTable[conf_id].webchatId),
        )
      }
    }
  }
  // raise signedOut event
  this.fire('signedOut', ev)
}
AgentComponent.prototype.ucUiStore_webchatLeft = function (ev) {
  if (ev.chatType === 'CONFERENCE') {
    var conf_id = (0, _strings.string)(
      this.ucUiStore && this.ucUiStore.getChatHeaderInfo(ev).conf_id,
    )
    if (conf_id && this.chatTable[conf_id]) {
      if (this.chatTable[conf_id].webchatState !== this.WEBCHAT_STATE_NONE) {
        this.chatTable[conf_id].webchatState = this.WEBCHAT_STATE_NONE
        this.chatTable[conf_id].stateUpdateTime = (0, _strings.int)(ev.tstamp)
        this.cacheConference(conf_id, {
          stateUpdateTime: this.chatTable[conf_id].stateUpdateTime,
        })
        // raise webchatStateChanged event
        this.fire(
          'webchatStateChanged',
          this.getWebchat(this.chatTable[conf_id].webchatId),
        )
      }
    }
  }
}
AgentComponent.prototype.ucUiStore_searchResultChanged = function (ev) {
  if (ev.chatType === 'WORKFORREPLYING') {
    if (this.workForReplyingFunctions[ev.chatCode]) {
      if (this.workForReplyingFunctions[ev.chatCode](ev)) {
        delete this.workForReplyingFunctions[ev.chatCode]
      }
    }
  }
}

// events from ChatClient
AgentComponent.prototype.chatClient_conferenceMemberChanged = function (ev) {
  var conference = ev && ev.conference
  var conf_id = conference && conference.conf_id
  if (conf_id && this.chatTable[conf_id]) {
    var webchatId = this.chatTable[conf_id].webchatId
    var isTalking =
      conference.conf_type === 'webchat'
        ? (this.ucUiStore &&
            this.ucUiStore.getWebchatQueue({
              conf_id: conf_id,
            }).isTalking) ||
          (conference.creator &&
            conference.creator.conf_status ===
              _constants.default.CONF_STATUS_LEFT_UNANSWERED)
        : conference.conf_status === _constants.default.CONF_STATUS_JOINED
    if (
      isTalking &&
      this.chatTable[conf_id].webchatState !== this.WEBCHAT_STATE_TALK
    ) {
      this.chatTable[conf_id].webchatState = this.WEBCHAT_STATE_TALK
      this.chatTable[conf_id].startTime = (0, _strings.int)(ev.tstamp)
      if (!this.chatTable[conf_id].firstStartTime) {
        this.chatTable[conf_id].firstStartTime =
          this.chatTable[conf_id].startTime
      }
      this.chatTable[conf_id].stateUpdateTime = (0, _strings.int)(ev.tstamp)
      this.cacheConference(conf_id, {
        conference: conference,
        startTime: this.chatTable[conf_id].startTime,
        firstStartTime: this.chatTable[conf_id].firstStartTime,
        stateUpdateTime: this.chatTable[conf_id].stateUpdateTime,
      })
      // raise webchatStarted event
      this.fire('webchatStarted', this.getWebchat(webchatId))
      // raise webchatStateChanged event
      this.fire('webchatStateChanged', this.getWebchat(webchatId))
    } else if (
      !isTalking &&
      this.chatTable[conf_id].webchatState !== this.WEBCHAT_STATE_NONE
    ) {
      this.chatTable[conf_id].webchatState = this.WEBCHAT_STATE_NONE
      this.chatTable[conf_id].stateUpdateTime = (0, _strings.int)(ev.tstamp)
      this.cacheConference(conf_id, {
        conference: conference,
        stateUpdateTime: this.chatTable[conf_id].stateUpdateTime,
      })
      // raise webchatStateChanged event
      this.fire('webchatStateChanged', this.getWebchat(webchatId))
    }
  }
}
AgentComponent.prototype.chatClient_confTagUpdated = function (ev) {
  var conference = ev && ev.conference
  var conf_id = conference && conference.conf_id
  if (conf_id && this.chatTable[conf_id]) {
    var webchatId = this.chatTable[conf_id].webchatId
    var webchatJsonStrOrg = JSON.stringify(this.chatTable[conf_id])
    var lastConfType = (0, _strings.string)(
      conference.conf_tags &&
        conference.conf_tags
          .filter(function (tag) {
            return tag.tag_type === '_webchat' && tag.tag_key === 'lastConfType'
          })
          .sort(function (tag1, tag2) {
            return tag1.tstamp - tag2.tstamp
          })
          .map(function (tag) {
            return tag.tag_value
          })
          .pop(),
    )
    this.chatTable[conf_id].mediaType = (0, _strings.string)(
      conference.conf_tags &&
        conference.conf_tags
          .filter(function (tag) {
            return tag.tag_type === '_webchat' && tag.tag_key === 'mediaType'
          })
          .sort(function (tag1, tag2) {
            return tag1.tstamp - tag2.tstamp
          })
          .map(function (tag) {
            return tag.tag_value
          })
          .pop(),
    )
    this.chatTable[conf_id].isOutgoing =
      lastConfType === 'emptylast' || lastConfType === 'webchat'
    this.chatTable[conf_id].originalWebchatId =
      lastConfType === 'webchat'
        ? (0, _strings.string)(
            conference.conf_tags &&
              conference.conf_tags
                .filter(function (tag) {
                  return (
                    tag.tag_type === '_relation' &&
                    tag.tag_key === '_originalWebchatId'
                  )
                })
                .sort(function (tag1, tag2) {
                  return tag1.tstamp - tag2.tstamp
                })
                .map(function (tag) {
                  return tag.tag_value
                })
                .pop(),
          )
        : ''
    this.chatTable[conf_id].contactId = (0, _strings.string)(
      conference.conf_tags &&
        conference.conf_tags
          .filter(function (tag) {
            return tag.tag_type === '_webchat' && tag.tag_key === 'contactId'
          })
          .sort(function (tag1, tag2) {
            return tag1.tstamp - tag2.tstamp
          })
          .map(function (tag) {
            return tag.tag_value
          })
          .pop(),
    )
    this.chatTable[conf_id].projectId = (0, _strings.string)(
      conference.conf_tags &&
        conference.conf_tags
          .filter(function (tag) {
            return tag.tag_type === '_webchat' && tag.tag_key === 'projectId'
          })
          .sort(function (tag1, tag2) {
            return tag1.tstamp - tag2.tstamp
          })
          .map(function (tag) {
            return tag.tag_value
          })
          .pop(),
    )
    this.chatTable[conf_id].extWebchatInfo =
      (conference.conf_tags &&
        conference.conf_tags
          .filter(function (tag) {
            return (
              tag.tag_type === '_webchatext' ||
              tag.tag_type === '_webchatcustomer'
            )
          })
          .sort(function (tag1, tag2) {
            return tag1.tstamp - tag2.tstamp
          })
          .reduce(function (extWebchatInfo, tag) {
            extWebchatInfo[tag.tag_key] = tag.tag_value
            return extWebchatInfo
          }, {})) ||
      {}
    this.cacheConference(conf_id, {
      conference: conference,
    })
    if (webchatJsonStrOrg !== JSON.stringify(this.chatTable[conf_id])) {
      // raise webchatInfoChanged event
      this.fire('webchatInfoChanged', this.getWebchat(webchatId))
    }
  }
  if (
    conf_id &&
    conference.conf_status === _constants.default.CONF_STATUS_INVITED_WEBCHAT &&
    conference.conf_tags &&
    conference.conf_tags.filter(function (tag) {
      return tag.tag_type === '_webchat' && tag.tag_key === 'mediaType'
    }).length
  ) {
    var continuationInfoStr = (0, _strings.string)(
      conference.conf_tags &&
        conference.conf_tags
          .filter(function (tag) {
            return (
              tag.tag_type === '_webchat' && tag.tag_key === 'continuationInfo'
            )
          })
          .sort(function (tag1, tag2) {
            return tag1.tstamp - tag2.tstamp
          })
          .map(function (tag) {
            return tag.tag_value
          })
          .pop(),
    )
    var continuationInfo = {}
    try {
      continuationInfo = JSON.parse(continuationInfoStr)
    } catch (e) {}
    if (continuationInfo.conf_id) {
      var replyingContinuationInfo = null
      this.replyingContinuationInfos = this.replyingContinuationInfos.filter(
        function (info) {
          if (
            info.conf_id === continuationInfo.conf_id &&
            info.yyyymm === continuationInfo.yyyymm
          ) {
            replyingContinuationInfo = info
            return false
          }
          return true
        },
      )
      if (replyingContinuationInfo) {
        // show last chatList
        if (replyingContinuationInfo.searchResultId) {
          this.ucUiAction.copyChatList({
            chatTypeSource: 'SEARCHRESULTDETAIL',
            chatCodeSource: replyingContinuationInfo.searchResultId,
            chatTypeTarget: 'CONFERENCE',
            chatCodeTarget: (0, _strings.string)(
              this.ucUiStore.getChatCodeByConfId({
                conf_id: conf_id,
              }).chatCode,
            ),
          })
        }
        // answer automatically
        this.ucUiAction.joinWebchatRoom({
          conf_id: conf_id,
          properties: {
            invisible: false,
            exclusive: true,
          },
        })
        this.focusWebchatInner(conf_id, true)
        // fulfill promise
        if (replyingContinuationInfo.resolve) {
          replyingContinuationInfo.resolve({})
        }
      }
    }
  }
}

// events from icon uiData
AgentComponent.prototype.iconWebchatQueueButton_onClick = function (data, ev) {
  this.fire('iconClicked', {
    iconName: 'webchatqueue',
    iconPosition: 'tool',
    data: data,
  })
}
AgentComponent.prototype.iconWebchatPickupButton_onClick = function (
  data,
  ev,
  retry,
) {
  if (!retry) {
    this.fire('iconClicked', {
      iconName: 'webchatpickup',
      iconPosition: 'tool',
      data: {},
    })
  }
  if (data && data.conf_id) {
    this.focusWebchatInner(data.conf_id, true)
  } else if (!retry) {
    setTimeout(
      this.iconWebchatPickupButton_onClick.bind(this, data, ev, true),
      100,
    )
  }
}
AgentComponent.prototype.iconWebchatRoomChatButton_onClick = function (
  conf_id,
  ev,
) {
  this.focusWebchatInner(conf_id, true)
}
AgentComponent.prototype.iconWebchatRoomJoinButton_onClick = function (
  conf_id,
  ev,
) {
  this.focusWebchatInner(conf_id, true)
}
AgentComponent.prototype.focusWebchatInner = function (
  conf_id,
  focusesSubWindow,
) {
  this.focusedChat = conf_id
  var webchatId
  var webchat
  if (!this.chatTable[conf_id]) {
    webchatId = this.newChat(conf_id)
    webchat = this.getWebchat(webchatId)
    // raise webchatCreated event
    this.fire('webchatCreated', webchat)
    // raise webchatOpened event
    this.fire('webchatOpened', webchat)
  } else {
    webchatId = this.chatTable[conf_id].webchatId
    if (!this.chatTable[conf_id].opened) {
      this.chatTable[conf_id].opened = true
      webchat = this.getWebchat(webchatId)
      // raise webchatOpened event
      this.fire('webchatOpened', webchat)
    } else {
      webchat = this.getWebchat(webchatId)
    }
  }
  // raise webchatFocused event
  this.fire('webchatFocused', webchat)
  if (!this.option.offline) {
    if (!this.option.widgetParent) {
      // focus sub window tab
      if (focusesSubWindow && this.subWindow && this.subWindow.focus) {
        this.subWindow.focus()
      }
      this.mainWindowHeartbeat.nextSelectedTab =
        'CONFERENCE' +
        '_' +
        (0, _strings.string)(
          this.ucUiStore &&
            this.ucUiStore.getChatCodeByConfId({
              conf_id: conf_id,
            }).chatCode,
        )
    } else if (this.mainWidgetUiData) {
      this.mainWidgetUiData.updateTab({
        select: {
          panelType: 'CONFERENCE',
          panelCode: (0, _strings.string)(
            this.ucUiStore &&
              this.ucUiStore.getChatCodeByConfId({
                conf_id: conf_id,
              }).chatCode,
          ),
        },
      })
      this.mainWidgetUiData.render()
    }
  }
}
AgentComponent.prototype.iconSearchDialogButton_onClick = function (data, ev) {
  this.fire('iconClicked', {
    iconName: 'search',
    iconPosition: 'tool',
    data: {
      visible: Boolean(!this.dialogUiDataTable['_static']),
    },
  })
  if (!this.dialogUiDataTable['_static']) {
    this.showSearchDialog({
      dialogName: '_static',
      resizable: true,
      draggable: true,
      closeable: true,
      hideable: true,
      selectable: false,
      allSelectable: false,
      emphasize: true,
      title: _uawmsgs.default.LBL_SEARCH_DIALOG_TITLE,
    })
  } else {
    this.hideSearchDialog({
      dialogName: '_static',
    })
  }
}

// events from sub window or main widget uiData
AgentComponent.prototype.subWindowTabOpened = function (ev, alreadyOpened) {
  if (ev) {
    var panel = (0, _strings.parsePanelKey)(ev.panelKey)
    if (panel.panelType === 'CONFERENCE') {
      var conf_id = (0, _strings.string)(
        this.ucUiStore &&
          this.ucUiStore.getChatHeaderInfo({
            chatType: panel.panelType,
            chatCode: panel.panelCode,
          }).conf_id,
      )
      var webchatId
      var webchat
      if (!this.chatTable[conf_id]) {
        webchatId = this.newChat(conf_id)
        webchat = this.getWebchat(webchatId)
        // raise webchatCreated event
        this.fire('webchatCreated', webchat)
        if (!alreadyOpened) {
          // raise webchatOpened event
          this.fire('webchatOpened', webchat)
        }
        // close old webchat panel after replying webchat has finished successfully
        if (this.replyingWebchatInfos[webchat.originalWebchatId]) {
          delete this.replyingWebchatInfos[webchat.originalWebchatId]
          this.closeWebchat(webchat.originalWebchatId)
        }
      } else if (!this.chatTable[conf_id].opened) {
        webchatId = this.chatTable[conf_id].webchatId
        this.chatTable[conf_id].opened = true
        webchat = this.getWebchat(webchatId)
        // raise webchatOpened event
        this.fire('webchatOpened', webchat)
      }
    }
  }
}
AgentComponent.prototype.subWindowTabClosing = function (ev) {
  if (ev) {
    var panel = (0, _strings.parsePanelKey)(ev.panelKey)
    if (panel.panelType === 'CONFERENCE') {
      var conf_id = (0, _strings.string)(
        this.ucUiStore &&
          this.ucUiStore.getChatHeaderInfo({
            chatType: panel.panelType,
            chatCode: panel.panelCode,
          }).conf_id,
      )
      if (this.chatTable[conf_id]) {
        // raise webchatClosing event
        this.fire(
          'webchatClosing',
          this.getWebchat(this.chatTable[conf_id].webchatId),
          ev.continueEvent,
        )
      } else {
        ev.continueEvent(true)
      }
    } else {
      ev.continueEvent(true)
    }
  }
}
AgentComponent.prototype.subWindowTabClosed = function (ev) {
  if (ev) {
    var panel = (0, _strings.parsePanelKey)(ev.panelKey)
    if (panel.panelType === 'CONFERENCE') {
      var conf_id = (0, _strings.string)(
        this.ucUiStore &&
          this.ucUiStore.getChatHeaderInfo({
            chatType: panel.panelType,
            chatCode: panel.panelCode,
          }).conf_id,
      )
      if (this.chatTable[conf_id]) {
        if (this.focusedChat === conf_id) {
          this.focusedChat = null
        }
        this.chatTable[conf_id].opened = false
        // raise webchatClosed event
        this.fire(
          'webchatClosed',
          this.getWebchat(this.chatTable[conf_id].webchatId),
        )
        delete this.chatTable[conf_id]
        if (this.conferenceCaches && this.conferenceCaches[conf_id]) {
          delete this.conferenceCaches[conf_id]
        }
      }
    }
  }
}
AgentComponent.prototype.subWindowTabSelected = function (ev) {
  if (ev) {
    var panel = (0, _strings.parsePanelKey)(ev.panelKey)
    if (panel.panelType === 'CONFERENCE') {
      var conf_id = (0, _strings.string)(
        this.ucUiStore &&
          this.ucUiStore.getChatHeaderInfo({
            chatType: panel.panelType,
            chatCode: panel.panelCode,
          }).conf_id,
      )
      if (this.chatTable[conf_id]) {
        if (this.focusedChat !== conf_id) {
          this.focusedChat = conf_id
          // raise webchatFocused event
          this.fire(
            'webchatFocused',
            this.getWebchat(this.chatTable[conf_id].webchatId),
          )
        }
      } else {
        this.focusedChat = null
      }
    } else {
      this.focusedChat = null
    }
  }
}
AgentComponent.prototype.subWindowWebchatQueueButton_onClick = function (
  data,
  ev,
) {
  this.fire('iconClicked', {
    iconName: 'webchatqueue',
    iconPosition: this.option.widgetParent ? 'main' : 'sub',
    data: data,
  })
}
AgentComponent.prototype.subWindowWebchatPickupButton_onClick = function (
  data,
  ev,
) {
  this.fire('iconClicked', {
    iconName: 'webchatpickup',
    iconPosition: this.option.widgetParent ? 'main' : 'sub',
    data: {},
  })
}
AgentComponent.prototype.subWindowWebchatDropButton_onClick = function (
  data,
  ev,
) {
  this.fire('iconClicked', {
    iconName: 'webchatdrop',
    iconPosition: this.option.widgetParent ? 'main' : 'sub',
    data: data,
  })
}
AgentComponent.prototype.subWindowBuddylistButton_onClick = function (
  data,
  ev,
) {
  this.fire('iconClicked', {
    iconName: 'buddylist',
    iconPosition: this.option.widgetParent ? 'main' : 'sub',
    data: data,
  })
}
AgentComponent.prototype.subWindowChatOptionButtonsReplyWebchatButton_onClick =
  function (panelType, panelCode, ev) {
    var option = {}
    var chatHeaderInfo =
      (this.ucUiStore &&
        this.ucUiStore.getChatHeaderInfo({
          chatType: panelType,
          chatCode: panelCode,
        })) ||
      {}
    var webchatId = chatHeaderInfo.yyyymm + '_' + chatHeaderInfo.conf_id
    if (
      this.replyingWebchatInfos[webchatId] &&
      +new Date() < this.replyingWebchatInfos[webchatId].replyTime + 10000
    ) {
      this._logger.log('warn', 'Processing, please wait.')
      if (!this.option.widgetParent && !this.option.offline) {
        this.mainWindowHeartbeat.mustShowModal = {
          title: _uawmsgs.default.CMN_ALERT,
          message: 'Processing, please wait.',
        }
      } else if (this.mainWidgetUiData) {
        this.mainWidgetUiData.showModal({
          title: _uawmsgs.default.CMN_ALERT,
          message: 'Processing, please wait.',
        })
      }
      return
    }
    var e = {
      webchatId: webchatId,
      cancel: false,
      option: option,
    }
    this.fire('replyButtonClicked', e, this.replyWebchat.bind(this, webchatId))
    if (!e.cancel) {
      this.replyWebchat(webchatId, e.option)
    }
  }

// events from dialog uiData
AgentComponent.prototype.dialogDialogCloseButton_onClick = function (
  panelType,
  panelCode,
  ev,
) {
  if (panelType === 'HISTORYSEARCH') {
    setTimeout(
      this.hideSearchDialog.bind(this, {
        dialogName: panelCode,
        clear: true,
      }),
      0,
    )
  }
}
AgentComponent.prototype.dialogDialogHideButton_onClick = function (
  panelType,
  panelCode,
  ev,
) {
  if (panelType === 'HISTORYSEARCH') {
    setTimeout(
      this.hideSearchDialog.bind(this, {
        dialogName: panelCode,
      }),
      0,
    )
  }
}
AgentComponent.prototype.dialogDialogButton_onClick = function (
  panelType,
  panelCode,
  name,
  ev,
) {
  if (panelType === 'HISTORYSEARCH') {
    setTimeout(
      this.fire.bind(this, 'searchDialogButtonClicked', {
        dialogName: panelCode,
        buttonName: name,
      }),
      0,
    )
  }
}
AgentComponent.prototype.dialogDialogResizableBox_onStop = function (
  panelType,
  panelCode,
  rect,
) {
  if (panelType === 'HISTORYSEARCH') {
    var dialogName = panelCode
    if (!this.dialogWorkDataTable[dialogName]) {
      this.dialogWorkDataTable[dialogName] = {}
    }
    this.dialogWorkDataTable[dialogName].rect = rect
  }
}
AgentComponent.prototype.dialogSplitterTop_onChange = function (
  panelType,
  panelCode,
  splitterTop,
) {
  if (panelType === 'HISTORYSEARCH') {
    var dialogName = panelCode
    if (!this.dialogWorkDataTable[dialogName]) {
      this.dialogWorkDataTable[dialogName] = {}
    }
    this.dialogWorkDataTable[dialogName].splitterTop = splitterTop
  }
}

// events from dialog UcUiStore
AgentComponent.prototype.dialogUcUiStore_searchConditionsChanged = function (
  ev,
) {
  // raise searchConditionsChanged event
  this.fire('searchConditionsChanged', {
    dialogName: ev.chatCode,
    searchConditions: ev.searchConditions,
  })
}
AgentComponent.prototype.dialogUcUiStore_searchResultChanged = function (ev) {
  // raise searchResultChanged event
  this.fire('searchResultChanged', {
    dialogName: ev.chatCode,
    searching: ev.searching,
    hasMore: ev.hasMore,
    searchResultIds: ev.searchResultIds,
  })
}
AgentComponent.prototype.dialogUcUiStore_searchResultSelected = function (ev) {
  // raise searchResultSelected event
  this.fire('searchResultSelected', {
    dialogName: ev.chatCode,
    selectedSearchResultIds: ev.selectedSearchResultIds,
    unselectedSearchResultIds: ev.unselectedSearchResultIds,
  })
}

/**
 * consts
 */
AgentComponent.prototype.ERROR_POPUP_BLOCKED = 550
AgentComponent.prototype.WEBCHAT_STATE_NONE = 0
AgentComponent.prototype.WEBCHAT_STATE_TALK = 10
AgentComponent.prototype.MAIN_WINDOW_HEARTBEAT_DELAY_DEF = 100
AgentComponent.prototype.SUB_WINDOW_CHECK_MAIN_DELAY_DEF = 10
AgentComponent.prototype.SUB_WINDOW_TIMEOUT_DEF = 10000
AgentComponent.prototype.SUB_WINDOW_TIMER_DELAY_DEF = 1000

/**
 * SubWindowModule class
 */
var SubWindowModule = function SubWindowModule() {
  this._loaded = false
  this._timer = null
  this._logger = null
  this._ucUiAction = null
  this._ucUiStore = null
  this._conferenceCaches = {}
  this._diffWindowBox = null
  this.uiData = null
  this.alertsBeforeUnload = true
  window.addEventListener('load', this.onload.bind(this))
  window.addEventListener('beforeunload', this.onbeforeunload.bind(this))
  window.addEventListener('unload', this.onunload.bind(this))
}
SubWindowModule.prototype.onload = function () {
  if (this._loaded) {
    return
  }
  this._loaded = true
  var agentComponent =
    Brekeke.UCAgentWidgetSubWindow.AgentComponentInstanceOfMainWindow
  if (agentComponent) {
    var option = agentComponent.option || {}
    // main window life/death monitoring timer
    this._timer = setInterval(
      this.checkMainWindowAlive.bind(this),
      agentComponent.SUB_WINDOW_CHECK_MAIN_DELAY_DEF,
    )
    // init logger
    this._logger = new Brekeke.UCClient.Logger(
      option.loggerLevel,
      this.logFunction.bind(this),
    )
    // init language
    _uawmsgs.default.loadLanguage(
      option.language,
      this.languageLoaded.bind(this),
    )
    // init UcUiStore
    this._ucUiAction = new UcUiAction()
    this._ucUiStore = new UcUiStore({
      logger: this._logger,
      ucUiAction: this._ucUiAction,
    })
    agentComponent.ucUiAction = this._ucUiAction
    agentComponent.ucUiStore = this._ucUiStore
    this._conferenceCaches = {}
    agentComponent.conferenceCaches = this._conferenceCaches
    agentComponent.subWindowConnected()
    // sign-in
    this._ucUiStore.addHandler({
      signedIn: this.ucUiStore_signedIn.bind(this),
      signedOut: this.ucUiStore_signedOut.bind(this),
      webchatLeft: this.ucUiStore_webchatLeft.bind(this),
      searchResultChanged: this.ucUiStore_searchResultChanged.bind(this),
    })
    this._ucUiStore.getChatClient().addHandler({
      conferenceMemberChanged:
        this.chatClient_conferenceMemberChanged.bind(this),
      confTagUpdated: this.chatClient_confTagUpdated.bind(this),
    })
    var signInOption = option.signInOption || {}
    this._ucUiAction.signIn(signInOption)
    // update icon uiData of main window
    agentComponent.updateIconUiData()
    // init uiData
    var signInOptionUrl = (0, _strings.string)(signInOption.url)
    this.uiData = new uiData({
      parentElement: 'content',
      ucUiAction: agentComponent.ucUiAction,
      ucUiStore: agentComponent.ucUiStore,
      agentComponentInstance: null,
      // do not memory the instance now (to get a living AgentComponentInstanceOfMainWindow every time in getAgentComponentInstance())
      configurations: option.configurations,
      dndEnabled: true,
      bindsFunctions: true,
      urlFuncBeforeRender:
        signInOptionUrl +
        (signInOptionUrl.endsWith('/') ? '' : '/') +
        'wws?t=' +
        encodeURIComponent(signInOption.tenant) +
        '&u=' +
        encodeURIComponent(signInOption.user.split('?')[0]),
      handler: this,
    })
    this.uiData.render()
    // check window size
    if (
      Brekeke.UCAgentWidgetSubWindow.WindowBox &&
      document.documentElement &&
      document.documentElement.clientWidth &&
      document.documentElement.clientHeight
    ) {
      this._diffWindowBox = {
        w:
          Brekeke.UCAgentWidgetSubWindow.WindowBox.w -
          document.documentElement.clientWidth,
        h:
          Brekeke.UCAgentWidgetSubWindow.WindowBox.h -
          document.documentElement.clientHeight,
      }
      this._logger.log('info', {
        WindowBox: Brekeke.UCAgentWidgetSubWindow.WindowBox,
        _diffWindowBox: this._diffWindowBox,
      })
    }
    // window title
    if (Brekeke.UCAgentWidgetSubWindow.WindowTitle) {
      document.title = Brekeke.UCAgentWidgetSubWindow.WindowTitle
    }
  }
}
SubWindowModule.prototype.onbeforeunload = function (e) {
  // save position and size of window
  try {
    var windowBoxStr = JSON.stringify({
      l:
        window.screenX +
        (0, _strings.int)(this._diffWindowBox && this._diffWindowBox.l),
      t:
        window.screenY +
        (0, _strings.int)(this._diffWindowBox && this._diffWindowBox.t),
      w:
        document.documentElement.clientWidth +
        (0, _strings.int)(this._diffWindowBox && this._diffWindowBox.w),
      h:
        document.documentElement.clientHeight +
        (0, _strings.int)(this._diffWindowBox && this._diffWindowBox.h),
    })
    try {
      _asyncStorage.default.setItem(
        'UC.ucagentwidget.agentcomponent.subwindowbox',
        windowBoxStr,
      )
      // cookie('brekeke.ucagentwidget.agentcomponent.subwindowbox', null, {
      //   expires: -1,
      // })
    } catch (e) {
      // cookie(
      //   'brekeke.ucagentwidget.agentcomponent.subwindowbox',
      //   windowBoxStr,
      //   { expires: 365 },
      // )
    }
  } catch (e) {}
  if (this.alertsBeforeUnload) {
    e.returnValue = ' '
  }
}
SubWindowModule.prototype.onunload = function () {
  var agentComponent =
    Brekeke.UCAgentWidgetSubWindow.AgentComponentInstanceOfMainWindow
  // raise tab closed event to main window
  if (this.uiData && agentComponent && agentComponent.subWindowTabClosed) {
    this.uiData.mainPanelList.forEach(function (panel) {
      agentComponent.subWindowTabClosed({
        panelKey: panel.panelType + '_' + panel.panelCode,
      })
    })
  }
  // terminate uiData
  if (this.uiData) {
    this.uiData.destroyApp()
  }
  this.uiData = null
  // terminate UcUiStore
  if (this._ucUiAction) {
    this._ucUiAction.signOut()
  }
  if (this._ucUiStore) {
    this._ucUiStore.destroy()
  }
  this._ucUiStore = null
  this._ucUiAction = null
  this._conferenceCaches = {}
  this._diffWindowBox = null
  if (agentComponent) {
    agentComponent.ucUiStore = null
    agentComponent.ucUiAction = null
    agentComponent.conferenceCaches = this._conferenceCaches
    agentComponent.subWindowDisconnected()
  }
  this._logger = null
  if (this._timer) {
    clearInterval(this._timer)
  }
}
SubWindowModule.prototype.checkMainWindowAlive = function () {
  var agentComponent =
    Brekeke.UCAgentWidgetSubWindow.AgentComponentInstanceOfMainWindow
  if (
    agentComponent &&
    agentComponent.mainWindowHeartbeat &&
    agentComponent.mainWindowHeartbeat.status === 'ALIVE' &&
    agentComponent.mainWindowHeartbeat.timestamp +
      agentComponent.SUB_WINDOW_TIMEOUT_DEF >
      +new Date()
  ) {
    // main window is alive
    // update UcUiStore of main window
    agentComponent.ucUiAction = this._ucUiAction
    agentComponent.ucUiStore = this._ucUiStore
    agentComponent.conferenceCaches = this._conferenceCaches
    agentComponent.subWindowConnected()
    // update icon uiData of main window
    agentComponent.updateIconUiData()
    // update selected tab of sub window
    if (this.uiData && agentComponent.mainWindowHeartbeat.nextSelectedTab) {
      var panelKey = agentComponent.mainWindowHeartbeat.nextSelectedTab
      agentComponent.mainWindowHeartbeat.nextSelectedTab = ''
      this.uiData.updateTab({
        select: (0, _strings.parsePanelKey)(panelKey),
      })
      this.uiData.render()
    }
    if (this.uiData && agentComponent.mainWindowHeartbeat.nextCloseTab) {
      var closeTabOption = agentComponent.mainWindowHeartbeat.nextCloseTab
      agentComponent.mainWindowHeartbeat.nextCloseTab = null
      this.uiData.closeTab(closeTabOption)
    }
    if (
      this.uiData &&
      agentComponent.subWindowTabOpened &&
      agentComponent.mainWindowHeartbeat.requestsTabOpenedEvents
    ) {
      agentComponent.mainWindowHeartbeat.requestsTabOpenedEvents = false
      this.uiData.mainPanelList.forEach(function (panel) {
        agentComponent.subWindowTabOpened(
          {
            panelKey: panel.panelType + '_' + panel.panelCode,
          },
          true,
        )
      })
    }
    if (
      this.uiData &&
      agentComponent.mainWindowHeartbeat.mustReplyContinuation
    ) {
      var searchResult =
        agentComponent.mainWindowHeartbeat.mustReplyContinuation.searchResult
      var replyType =
        agentComponent.mainWindowHeartbeat.mustReplyContinuation.replyType
      var nextWebchatTags =
        agentComponent.mainWindowHeartbeat.mustReplyContinuation.nextWebchatTags
      var resolve =
        agentComponent.mainWindowHeartbeat.mustReplyContinuation.resolve
      var reject =
        agentComponent.mainWindowHeartbeat.mustReplyContinuation.reject
      agentComponent.mainWindowHeartbeat.mustReplyContinuation = null
      if (searchResult) {
        var promise = this.uiData.replyContinuation(
          searchResult._yyyymm,
          searchResult._conf_id,
          replyType,
          searchResult.originalWebchatId,
          true,
          nextWebchatTags,
        )
        if (reject) {
          promise.catch(reject)
        }
        this.uiData.render()
      }
    }
    if (this.uiData && agentComponent.mainWindowHeartbeat.mustShowModal) {
      this.uiData.showModal(agentComponent.mainWindowHeartbeat.mustShowModal)
      agentComponent.mainWindowHeartbeat.mustShowModal = null
    }
    if (
      window.opener &&
      window.opener.Brekeke &&
      window.opener.Brekeke.UCAgentWidget &&
      window.opener.Brekeke.UCAgentWidget.startingUCData
    ) {
      // for reloaded main window
      window.opener.Brekeke.UCAgentWidget.startingUCData.subWindowAlive = window
    }
  } else if (
    agentComponent &&
    agentComponent.mainWindowHeartbeat &&
    agentComponent.mainWindowHeartbeat.status === 'ALIVE' &&
    agentComponent.option &&
    agentComponent.option.ownerDocument &&
    agentComponent.option.ownerDocument.defaultView
  ) {
    // main window is suspended
    if (
      window.opener &&
      window.opener.Brekeke &&
      window.opener.Brekeke.UCAgentWidget &&
      window.opener.Brekeke.UCAgentWidget.startingUCData
    ) {
      // for reloaded main window
      window.opener.Brekeke.UCAgentWidget.startingUCData.subWindowAlive = window
    }
    // wait
  } else {
    // main window is dead
    // close me
    this.alertsBeforeUnload = false
    window.close()
  }
}
SubWindowModule.prototype.logFunction = function (
  level,
  content,
  stackTrace,
  date,
) {
  var agentComponent =
    Brekeke.UCAgentWidgetSubWindow.AgentComponentInstanceOfMainWindow
  if (agentComponent && agentComponent.logQueue) {
    // enqueue logQueue in main window
    agentComponent.logQueue.push({
      level: level,
      content: content,
      stackTrace: stackTrace,
      date: date,
    })
  }
  // output to also this window
  return false
}
SubWindowModule.prototype.languageLoaded = function (lang) {
  if (this.uiData) {
    this.uiData.render()
  }
}
// events from UcUiStore
SubWindowModule.prototype.ucUiStore_signedIn = function (ev) {
  var agentComponent =
    Brekeke.UCAgentWidgetSubWindow.AgentComponentInstanceOfMainWindow
  if (agentComponent && agentComponent.ucUiStore_signedIn) {
    agentComponent.ucUiStore_signedIn(ev)
  }
}
SubWindowModule.prototype.ucUiStore_signedOut = function (ev) {
  var agentComponent =
    Brekeke.UCAgentWidgetSubWindow.AgentComponentInstanceOfMainWindow
  if (agentComponent && agentComponent.ucUiStore_signedOut) {
    agentComponent.ucUiStore_signedOut(ev)
  }
}
SubWindowModule.prototype.ucUiStore_webchatLeft = function (ev) {
  var agentComponent =
    Brekeke.UCAgentWidgetSubWindow.AgentComponentInstanceOfMainWindow
  if (agentComponent && agentComponent.ucUiStore_webchatLeft) {
    agentComponent.ucUiStore_webchatLeft(ev)
  }
}
SubWindowModule.prototype.ucUiStore_searchResultChanged = function (ev) {
  var agentComponent =
    Brekeke.UCAgentWidgetSubWindow.AgentComponentInstanceOfMainWindow
  if (agentComponent && agentComponent.ucUiStore_searchResultChanged) {
    agentComponent.ucUiStore_searchResultChanged(ev)
  }
}
// events from ChatClient
SubWindowModule.prototype.chatClient_conferenceMemberChanged = function (ev) {
  var agentComponent =
    Brekeke.UCAgentWidgetSubWindow.AgentComponentInstanceOfMainWindow
  if (agentComponent && agentComponent.chatClient_conferenceMemberChanged) {
    agentComponent.chatClient_conferenceMemberChanged(ev)
  }
}
SubWindowModule.prototype.chatClient_confTagUpdated = function (ev) {
  var agentComponent =
    Brekeke.UCAgentWidgetSubWindow.AgentComponentInstanceOfMainWindow
  if (agentComponent && agentComponent.chatClient_confTagUpdated) {
    agentComponent.chatClient_confTagUpdated(ev)
  }
}
// events from uiData
SubWindowModule.prototype.tabOpened = function (ev) {
  var agentComponent =
    Brekeke.UCAgentWidgetSubWindow.AgentComponentInstanceOfMainWindow
  if (agentComponent && agentComponent.subWindowTabOpened) {
    agentComponent.subWindowTabOpened(ev, false)
  }
}
SubWindowModule.prototype.tabClosing = function (ev) {
  var agentComponent =
    Brekeke.UCAgentWidgetSubWindow.AgentComponentInstanceOfMainWindow
  if (agentComponent && agentComponent.subWindowTabClosing) {
    agentComponent.subWindowTabClosing(ev)
  }
}
SubWindowModule.prototype.tabClosed = function (ev) {
  var agentComponent =
    Brekeke.UCAgentWidgetSubWindow.AgentComponentInstanceOfMainWindow
  if (agentComponent && agentComponent.subWindowTabClosed) {
    agentComponent.subWindowTabClosed(ev)
  }
}
SubWindowModule.prototype.tabSelected = function (ev) {
  var agentComponent =
    Brekeke.UCAgentWidgetSubWindow.AgentComponentInstanceOfMainWindow
  if (agentComponent && agentComponent.subWindowTabSelected) {
    agentComponent.subWindowTabSelected(ev)
  }
}
SubWindowModule.prototype.webchatQueueButton_onClick = function (data, ev) {
  var agentComponent =
    Brekeke.UCAgentWidgetSubWindow.AgentComponentInstanceOfMainWindow
  if (agentComponent && agentComponent.subWindowWebchatQueueButton_onClick) {
    agentComponent.subWindowWebchatQueueButton_onClick(data, ev)
  }
}
SubWindowModule.prototype.webchatPickupButton_onClick = function (data, ev) {
  var agentComponent =
    Brekeke.UCAgentWidgetSubWindow.AgentComponentInstanceOfMainWindow
  if (agentComponent && agentComponent.subWindowWebchatPickupButton_onClick) {
    agentComponent.subWindowWebchatPickupButton_onClick(data, ev)
  }
}
SubWindowModule.prototype.webchatDropButton_onClick = function (data, ev) {
  var agentComponent =
    Brekeke.UCAgentWidgetSubWindow.AgentComponentInstanceOfMainWindow
  if (agentComponent && agentComponent.subWindowWebchatDropButton_onClick) {
    agentComponent.subWindowWebchatDropButton_onClick(data, ev)
  }
}
SubWindowModule.prototype.buddylistButton_onClick = function (data, ev) {
  var agentComponent =
    Brekeke.UCAgentWidgetSubWindow.AgentComponentInstanceOfMainWindow
  if (agentComponent && agentComponent.subWindowBuddylistButton_onClick) {
    agentComponent.subWindowBuddylistButton_onClick(data, ev)
  }
}
SubWindowModule.prototype.chatOptionButtonsReplyWebchatButton_onClick =
  function (panelType, panelCode, ev) {
    var agentComponent =
      Brekeke.UCAgentWidgetSubWindow.AgentComponentInstanceOfMainWindow
    if (
      agentComponent &&
      agentComponent.subWindowChatOptionButtonsReplyWebchatButton_onClick
    ) {
      agentComponent.subWindowChatOptionButtonsReplyWebchatButton_onClick(
        panelType,
        panelCode,
        ev,
      )
    }
  }
if (
  (0, _strings.string)(_currentscript.default.QUERY).indexOf(
    '?newsubwindowmodule',
  ) === 0
) {
  var linkWidget = document.createElement('link')
  linkWidget.rel = 'stylesheet'
  linkWidget.href =
    _currentscript.default.DIR +
    '../../../css/ucagentwidget.css' +
    _currentscript.default.QUERY
  document.head.appendChild(linkWidget)
  var linkPicker = document.createElement('link')
  linkPicker.rel = 'stylesheet'
  linkPicker.href =
    _currentscript.default.DIR +
    '../../../css/react-datepicker.css' +
    _currentscript.default.QUERY
  document.head.appendChild(linkPicker)
  var divContent = document.createElement('div')
  divContent.id = 'content'
  document.body.appendChild(divContent)
  window.subWindowModule = new SubWindowModule()
  setTimeout(window.subWindowModule.onload.bind(window.subWindowModule), 0)
}

/**
 * OfflineChatClient class
 */
var OfflineChatClient = function OfflineChatClient(logger) {
  Brekeke.UCClient.ChatClient.apply(this, arguments)
  this._offlineCurrentTenant = null
  this._offlineSignInArgumentsOrg = null
}
OfflineChatClient.prototype = Object.create(
  Brekeke.UCClient.ChatClient.prototype,
  {
    constructor: {
      value: OfflineChatClient,
      enumerable: false,
    },
  },
)
OfflineChatClient.prototype.signIn = function (
  host,
  path,
  tenant,
  user,
  pass,
  option,
  funcOK,
  funcError,
) {
  this._offlineAgentComponent = true
  var newArguments = Array.prototype.concat.call(arguments)
  if (host && !user && !pass && !option && !funcOK && !funcError) {
    // memory sign-in parameters
    this._offlineSignInArgumentsOrg = [(0, _strings.clone)(host)]
    // empty tenant
    var newHost = (0, _strings.clone)(host)
    newArguments[0] = newHost
    newHost.tenant = ''
    this._offlineCurrentTenant = ''
    // dummy user
    newHost.user = '###' + newHost.user
  } else {
    // memory sign-in parameters
    this._offlineSignInArgumentsOrg = [
      host,
      path,
      tenant,
      user,
      pass,
      (0, _strings.clone)(option),
    ]
    // empty tenant
    newArguments[2] = ''
    this._offlineCurrentTenant = ''
    // dummy user
    newArguments[3] = '###' + newArguments[3]
  }
  Brekeke.UCClient.ChatClient.prototype.signIn.apply(this, newArguments)
}
OfflineChatClient.prototype.searchTopicsByCondition = function (
  condition,
  funcOK,
  funcError,
) {
  var _this48 = this
  if (
    this._offlineSignInArgumentsOrg &&
    this._offlineSignInArgumentsOrg.length
  ) {
    var tenantOrg = (0, _strings.string)(
      this._offlineSignInArgumentsOrg.length === 1
        ? (this._offlineSignInArgumentsOrg[0] || {}).tenant
        : this._offlineSignInArgumentsOrg[2],
    )
    var tenantMe =
      (condition && condition.tenant_me && condition.tenant_me) ||
      tenantOrg ||
      this._offlineCurrentTenant
    if (tenantMe !== this._offlineCurrentTenant) {
      // re-sign-in to tenant for searching
      if (this._signInStatus === 2 || this._signInStatus === 3) {
        Brekeke.UCClient.ChatClient.prototype.signOut.call(this)
      }
      var signInArguments = this._offlineSignInArgumentsOrg.concat()
      if (signInArguments.length === 1) {
        signInArguments[0] = (0, _strings.clone)(signInArguments[0])
        signInArguments[0].tenant = (0, _strings.string)(tenantMe)
      } else {
        signInArguments[2] = (0, _strings.string)(tenantMe)
      }
      signInArguments.push(function (ev) {
        // funcOK of signIn
        // search
        Brekeke.UCClient.ChatClient.prototype.searchTopicsByCondition.call(
          _this48,
          condition,
          funcOK,
          funcError,
        )
      })
      signInArguments.push(funcError) // funcError of signIn
      this._offlineCurrentTenant = (0, _strings.string)(tenantMe)
      Brekeke.UCClient.ChatClient.prototype.signIn.apply(this, signInArguments)
      return
    }
  }
  Brekeke.UCClient.ChatClient.prototype.searchTopicsByCondition.call(
    this,
    condition,
    funcOK,
    funcError,
  )
}

/**
 * global object
 */
Brekeke.UCAgentWidget = {}
/**
 * uiData global class
 */
Brekeke.UCAgentWidget.uiData = uiData
/**
 * uawMsgs global object
 */
Brekeke.UCAgentWidget.uawMsgs = _uawmsgs.default
/**
 * AgentComponent global class
 */
Brekeke.UCAgentWidget.AgentComponent = AgentComponent
/**
 * SubWindowModule global class
 */
Brekeke.UCAgentWidget.SubWindowModule = SubWindowModule
/**
 * export global object
 */
module.exports = Brekeke.UCAgentWidget
