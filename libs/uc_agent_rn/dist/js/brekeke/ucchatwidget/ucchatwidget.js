;(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory()
  } else {
    root.Brekeke = root.Brekeke || {}
    root.Brekeke.UCChatWidget = factory()
  }
})(this, function () {
  var ChatComponent = function () {
    this.initializeStatus = 0 // 0: none, 1: failed, 2: initializing, 3: initialized
    this.handlers = []
    this.logger = this
    this.ucUiAction = null
    this.ucUiStore = null
    this.uiDataTable = {}
    this.uiDataIdCounter = 0
    this.language = ''
  }

  //
  ChatComponent.prototype.log = function (level, content) {
    console.warn(level + '! ' + content)
  }

  /**
   * initComponent function
   * options
   * options.handler
   * options.loggerLevel
   * options.ucUiAction
   * options.ucUiStore
   * options.chatClient
   * options.language
   */
  ChatComponent.prototype.initComponent = function (options) {
    options = options || {}
    if (this.initializeStatus === 2 || this.initializeStatus === 3) {
      this.logger.log('warn', 'already initialized.')
      return
    }
    this.initializeStatus = 2
    // add handler
    if (options.handler) {
      this.addHandler(options.handler)
    }
    // load scripts
    this.loadScripts(
      function () {
        // init logger
        this.logger = new Brekeke.UCClient.Logger(options.loggerLevel || 'all')
        // init store
        if (options.ucUiAction) {
          this.ucUiAction = options.ucUiAction
        } else {
          this.ucUiAction = new Brekeke.UcUiAction()
        }
        if (options.ucUiStore) {
          this.ucUiStore = options.ucUiStore
        } else if (options.chatClient) {
          this.ucUiStore = new Brekeke.UcUiStore({
            logger: this.logger,
            ucUiAction: this.ucUiAction,
            chatClient: options.chatClient,
          })
        } else {
          this.ucUiStore = new Brekeke.UcUiStore({
            logger: this.logger,
            ucUiAction: this.ucUiAction,
          })
        }
        this.ucUiStore.addHandler(this)
        // init language
        this.language = string(options.language)
        this.loadLanguage()
        // initialized
        this.initializeStatus = 3
        this.fire('initialized', {})
      }.bind(this),
      function () {
        this.initializeStatus = 1
        this.fire('initFailed', {})
      }.bind(this),
    )
  }

  //
  ChatComponent.prototype.loadScripts = function (funcOK, funcError) {
    if (
      typeof Brekeke !== 'undefined' &&
      typeof Brekeke.UCAgentWidget !== 'undefined' &&
      typeof Brekeke.UCAgentWidget.uiData !== 'undefined' &&
      typeof Brekeke.UcUiAction !== 'undefined' &&
      typeof Brekeke.UcUiStore !== 'undefined' &&
      typeof Brekeke.UCClient !== 'undefined' &&
      typeof Brekeke.UCClient.Logger !== 'undefined'
    ) {
      if (typeof funcOK === 'function') {
        funcOK()
      }
    } else {
      var head =
        document.head ||
        document.getElementsByTagName('head')[0] ||
        document.body
      var script = document.createElement('script')
      script.async = 1
      script.setAttribute('charset', 'utf-8')
      script.src =
        CURRENT_SCRIPT_URL.DIR +
        '../ucagentwidget/ucagentwidget.js' +
        CURRENT_SCRIPT_URL.QUERY
      script.type = 'text/javascript'
      head.appendChild(script)
      var link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href =
        CURRENT_SCRIPT_URL.DIR +
        '../../../css/ucagentwidget.css' +
        CURRENT_SCRIPT_URL.QUERY
      link.type = 'text/css'
      head.appendChild(link)
      var onloadTimerCnt = 0
      var onloadTimer = setInterval(
        function () {
          onloadTimerCnt++
          if (
            typeof Brekeke !== 'undefined' &&
            typeof Brekeke.UCAgentWidget !== 'undefined' &&
            typeof Brekeke.UCAgentWidget.uiData !== 'undefined' &&
            typeof Brekeke.UcUiAction !== 'undefined' &&
            typeof Brekeke.UcUiStore !== 'undefined' &&
            typeof Brekeke.UCClient !== 'undefined' &&
            typeof Brekeke.UCClient.Logger !== 'undefined'
          ) {
            clearInterval(onloadTimer)
            if (typeof funcOK === 'function') {
              funcOK()
            }
          } else if (onloadTimerCnt >= 600) {
            clearInterval(onloadTimer)
            this.logger.log('warn', 'loading scripts timed out.')
            if (typeof funcError === 'function') {
              funcError()
            }
          }
        }.bind(this),
        100,
      )
    }
  }

  //
  ChatComponent.prototype.loadLanguage = function (funcOK) {
    var language = ''
    if (this.language) {
      language = this.language
    } else {
      var chatClient = this.ucUiStore && this.ucUiStore.chatClient
      if (chatClient) {
        var configProperties = chatClient.getConfigProperties()
        var settings = chatClient.getSettings()
        language = string(
          configProperties &&
            configProperties.optional_config &&
            configProperties.optional_config.language_setting,
        )
        if (language === 'user') {
          language = string(
            settings &&
              settings.optional_settings &&
              settings.optional_settings.user_language,
          )
        }
      }
    }
    if (!language || language === 'auto') {
      if (typeof navigator !== 'undefined') {
        language = (
          string(
            navigator.browserLanguage ||
              navigator.language ||
              navigator.userLanguage,
          ) + 'en'
        ).substr(0, 2)
      } else {
        language = 'en'
      }
    }
    if (language === 'en') {
      language = 'default'
    }
    Brekeke.UCAgentWidget.uawMsgs.loadLanguage(
      language,
      function (lang) {
        for (var uiDataId in this.uiDataTable) {
          this.uiDataTable[uiDataId].render()
        }
        this.logger.log('info', 'language=' + lang)
        if (typeof funcOK === 'function') {
          funcOK()
        }
      }.bind(this),
    )
  }

  /**
   * destroyComponent function
   * options
   * options.keepSignIn
   * options.keepStore
   */
  ChatComponent.prototype.destroyComponent = function (options) {
    options = options || {}
    // terminate uidata
    for (var uiDataId in this.uiDataTable) {
      this.uiDataTable[uiDataId].destroyApp()
    }
    this.uiDataTable = {}
    // terminate store
    if (this.ucUiAction && !options.keepSignIn) {
      this.ucUiAction.signOut()
    }
    if (this.ucUiStore && !options.keepStore) {
      this.ucUiStore.destroy()
    }
    if (this.ucUiStore) {
      this.ucUiStore.removeHandler(this)
    }
    this.ucUiStore = null
    this.ucUiAction = null
    // terminate
    this.logger = this
    this.handlers = []
    this.initializeStatus = 0
  }

  /**
   * addHandler function
   * handler
   */
  ChatComponent.prototype.addHandler = function (handler) {
    this.handlers.push(handler)
  }

  /**
   * removeHandler function
   * handler
   */
  ChatComponent.prototype.removeHandler = function (handler) {
    var index = this.handlers.indexOf(handler)
    if (index !== -1) {
      this.handlers.splice(index, 1)
    }
  }

  //
  ChatComponent.prototype.fire = function (eventName) {
    var argsArray = Array.prototype.slice.call(arguments, 1)
    this.logger.log(
      'debug',
      'ChatComponent.' +
        eventName +
        ' event fired. ' +
        argsArray
          .map(function (x) {
            return ' ' + stringify(x)
          })
          .join(),
    )
    this.handlers.forEach(function (handler) {
      if (handler && typeof handler[eventName] === 'function') {
        handler[eventName].apply(handler, argsArray)
      }
    })
  }

  /**
   * createPanel function
   * options
   * options.parent
   * options.panelType
   * options.tenant
   * options.user
   */
  ChatComponent.prototype.createPanel = function (options) {
    options = options || {}
    if (this.initializeStatus !== 3) {
      this.logger.log('warn', 'component not initialized.')
      return
    }
    var option = {}
    option.parentElement = options.parent
    option.ucUiAction = this.ucUiAction
    option.ucUiStore = this.ucUiStore
    option.configurations = options.configurations || {}
    if (options.panelType === 'CHAT') {
      option.staticPanel =
        'CHAT' +
        '_' +
        JSON.stringify({ tenant: options.tenant, user_id: options.user })
    }
    var uiData = new Brekeke.UCAgentWidget.uiData(option)
    var uiDataId = 'p' + ('0000000' + ++this.uiDataIdCounter).slice(-7)
    this.uiDataTable[uiDataId] = uiData
    uiData.render()
    return uiDataId
  }

  /**
   * destroyPanel function
   * options
   * options.panelId
   */
  ChatComponent.prototype.destroyPanel = function (options) {
    options = options || {}
    if (this.initializeStatus !== 3) {
      this.logger.log('warn', 'component not initialized.')
      return
    }
    var uiDataId = string(options.panelId)
    if (this.uiDataTable[uiDataId]) {
      this.uiDataTable[uiDataId].destroyApp()
      delete this.uiDataTable[uiDataId]
    }
  }

  /**
   * getUcUiAction function
   */
  ChatComponent.prototype.getUcUiAction = function () {
    return this.ucUiAction
  }

  /**
   * getUcUiStore function
   */
  ChatComponent.prototype.getUcUiStore = function () {
    return this.ucUiStore
  }

  /**
   * getChatClient function
   */
  ChatComponent.prototype.getChatClient = function () {
    return (this.ucUiStore && this.ucUiStore.chatClient) || null
  }

  /**
   * UcUiStore event handlers
   */
  ChatComponent.prototype.signedIn = function () {
    this.loadLanguage()
  }

  /**
   * Utility functions
   */
  var stringify = function (object) {
    var key, returnString

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
  var int = function (value) {
    return parseInt(value, 10) || 0
  }
  var string = function (value) {
    return String(value || value === 0 || value === false ? value : '')
  }
  var CURRENT_SCRIPT_REGEX = /(^|.*\/)(ucchatwidget.*\.js)(.*)/
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
    return {
      DIR: '',
      FILE: '',
      QUERY: '',
    }
  })(CURRENT_SCRIPT_REGEX)

  var UCChatWidget = {}
  UCChatWidget.ChatComponent = ChatComponent
  return UCChatWidget
})
