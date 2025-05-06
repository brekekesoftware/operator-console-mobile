const {
  default: AsyncStorage,
} = require('@react-native-async-storage/async-storage')

;(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory({
      net: require('../net/jsonrpc.js'),
      UCClient: require('../ucclient/ucclient.js'),
    })
  } else {
    root.Brekeke = root.Brekeke || {}
    root.Brekeke.UcUiStore = factory(root.Brekeke)
  }
})(this, function (Brekeke) {
  /**
   * consts
   */
  var Constants = Brekeke.UCClient.Constants
  var UiConstants = {
    CHAT_CONTENT_SIZE: 5000,
    SEND_TYPING_INTERVAL: 3000,
    SHOW_TYPING_DURATION: 3200,
    SEARCH_PREV_NEXT_TEXTS_MAX: 20,
    DUMMY: null,
  }

  /**
   * UcUiStore class
   * option (optional)
   * option.logger (optional)
   * option.ucUiAction (optional)
   * option.chatClient (optional)
   */
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
    this.skipDummyTopicIdBroadcast = false

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

  /**
   * destroy function
   */
  UcUiStore.prototype.destroy = function () {
    if (this.chatClient) {
      this.chatClient.removeHandler(this)
    }
    if (this.ucUiAction) {
      this.ucUiAction.removeHandler(this)
      this.ucUiAction = null
    }
    this.objectURLList.forEach(function (objectURL) {
      return typeof URL !== 'undefined' && URL.revokeObjectURL(objectURL)
    })
    // this.logger = null;
    // this.chatClient = null;
    this.keyCounter = 0
    this.keyObjectTable = {}
    this.searchResultIdCounter = 0
    this.handlers = []
    this.signInStatus = 0
    this.signInOKCount = 0
    this.uncacheParam2 = 0
    this.diffClientServerTime = 0
    this.lastSignOutReason = { code: 1, message: '', reSignInTime: 0 }
    this.signInOption = null
    this.reSignInDelay = 0
    this.maxReSignInDelay = 0
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
    this.skipDummyTopicIdBroadcast = false
  }

  /**
   * addHandler function
   * handler
   */
  UcUiStore.prototype.addHandler = function (handler) {
    this.handlers.push(handler)
  }
  //
  UcUiStore.prototype.fire = function (eventName) {
    var _arguments = arguments

    this.handlers.forEach(function (handler) {
      if (handler[eventName]) {
        handler[eventName].apply(
          handler,
          Array.prototype.slice.call(_arguments, 1),
        )
      }
    })
  }
  //
  UcUiStore.prototype.render = function () {
    this.fire('render')
  }
  //
  UcUiStore.prototype.renderBsc = function () {
    var elapsed = Date.now() - this.lastRenderedTimeBsc
    this.logger.log(
      'debug',
      'UcUiStore.renderBsc elapsed=' +
        elapsed +
        ', tID=' +
        this.nextRenderingTimerBsc,
    )
    var optional_config = this.configPropertiesCache.optional_config || {}
    var renderingInterval =
      typeof optional_config.ribsc === 'string'
        ? int(optional_config.ribsc)
        : 200
    if (renderingInterval) {
      var remaining = renderingInterval - elapsed
      if (0 < elapsed && 0 < remaining) {
        if (!this.nextRenderingTimerBsc) {
          this.nextRenderingTimerBsc = setTimeout(
            this.renderBsc.bind(this),
            remaining,
          )
        }
        return
      }
    }
    this.lastRenderedTimeBsc = Date.now()
    this.nextRenderingTimerBsc = 0
    this.render()
  }

  /**
   * removeHandler function
   * handler
   */
  UcUiStore.prototype.removeHandler = function (handler) {
    var index = this.handlers.indexOf(handler)
    if (index !== -1) {
      this.handlers.splice(index, 1)
    }
  }

  // signIn
  // option
  // option.url
  // option.tenant
  // option.user
  // option.pass
  // option.reSignInDelay
  // option.maxReSignInDelay
  UcUiStore.prototype.signIn = function (option) {
    var _this = this

    if (this.signInStatus === 0 || this.signInStatus === 1) {
      this.signInStatus = 2
      this.signInOption = {}
      var signInOption = {}
      if (option) {
        this.signInOption = JSON.parse(JSON.stringify(option))
        signInOption = JSON.parse(JSON.stringify(option))
      }
      if (typeof signInOption.maxReSignInDelay !== 'undefined') {
        this.maxReSignInDelay = int(signInOption.maxReSignInDelay)
      }
      // load local storage preference
      if (typeof localStorage !== 'undefined' && localStorage.getItem) {
        var tenant = string(signInOption && signInOption.tenant)
        var t = signInOption && signInOption.isSingleTenant ? '' : tenant
        var u = string(signInOption && signInOption.user).split('?')[0]
        var userKey = encodeURIComponent(JSON.stringify([tenant, u])) // not t but tenant for compatibility with uc < 1.6
        var keys = localStorage.getItem(
          'UC.ucclientui.' + userKey + '.cookiePreferenceSaved',
        )
        if (keys) {
          if (keys === 'true') {
            // migrate from 1.1
            keys =
              'webRTCDisabled,webRTCTypeName,videoSource,audioSource,audioTarget,onlineOnly,buddylistOpenList,mutesMicrophone,mutesCamera'
          }
          string(keys)
            .split(',')
            .forEach(function (key) {
              if (key && key[key.length - 1] === '+') {
                _this.localStoragePreference[key] = string(
                  localStorage.getItem(key + t + '+' + u),
                ) // not tenant but t for compatibility with cim
              } else {
                _this.localStoragePreference[key] = string(
                  localStorage.getItem(
                    'UC.ucclientui.' + userKey + '.cookiePreference.' + key,
                  ),
                )
              }
            })
        }
      }
      var dtoken = null
      try {
        dtoken = JSON.parse(
          this.getLocalStoragePreference({ keyList: ['br+dtoken+'] })[0],
        )
      } catch (e) {}
      if (dtoken && dtoken.token) {
        signInOption.device_token = dtoken.token
      }
      if (!this.reSignInDelay) {
        // sign-in normally
        if (typeof signInOption.reSignInDelay !== 'undefined') {
          this.reSignInDelay = int(signInOption.reSignInDelay)
        } else {
          this.reSignInDelay = 1000
        }
        this.chatClient.signIn(
          signInOption,
          this.signIn_funcOK.bind(this),
          this.signIn_funcError.bind(this),
        )
      } else {
        // re-sign-in (timer counting now)
        if (typeof signInOption.reSignInDelay !== 'undefined') {
          this.reSignInDelay = int(signInOption.reSignInDelay)
        } else {
          if (
            this.maxReSignInDelay > 0 &&
            this.reSignInDelay === this.maxReSignInDelay
          ) {
          } else {
            this.reSignInDelay /= 2
          }
        }
        this.chatClient.signIn(
          signInOption,
          this.signIn_funcOK.bind(this),
          this.signIn_funcErrorWithTimer.bind(this),
        )
      }
      this.render()
    }
  }
  //
  UcUiStore.prototype.signIn_funcOK = function (ev) {
    var _this = this

    this.signInStatus = 3
    this.signInOKCount++
    this.configPropertiesCache = this.chatClient.getConfigProperties() || {}
    this.optionalSettingCache = {}
    this.lastStatus = this.chatClient.getStatus()
    if (ev.tstamp) {
      this.diffClientServerTime = +new Date() - ev.tstamp
    }
    // save device token
    var authResultInfo = this.chatClient.getAuthResultInfo() || {}
    if (
      authResultInfo.device_token_create_result &&
      authResultInfo.device_token_create_result.status === 'OK'
    ) {
      this.setLocalStoragePreference({
        keyValueList: [
          {
            key: 'br+dtoken+',
            value: JSON.stringify({
              token: authResultInfo.device_token_create_result.token,
              timestamp: ev.tstamp,
            }),
          },
        ],
      })
    } else if (
      authResultInfo.device_token_check_result &&
      authResultInfo.device_token_check_result.status === 'OK'
    ) {
      var dtoken = null
      try {
        dtoken = JSON.parse(
          this.getLocalStoragePreference({ keyList: ['br+dtoken+'] })[0],
        )
      } catch (e) {}
      if (dtoken && dtoken.token) {
        dtoken.timestamp = ev.tstamp
        this.setLocalStoragePreference({
          keyValueList: [{ key: 'br+dtoken+', value: JSON.stringify(dtoken) }],
        })
      }
    }
    // receive unread text
    var unread = true
    var usersToRecvMsgs = this.chatClient.getSignedInInfo().usersToRecvMsgs
    if (usersToRecvMsgs) {
      unread = false
      usersToRecvMsgs.forEach &&
        usersToRecvMsgs.forEach(function (u) {
          _this.clearChat({
            chatType: 'CHAT',
            chatCode: JSON.stringify({ tenant: u.tenant, user_id: u.user_id }),
          })
          if (u.property && u.property.unread) {
            unread = true
          }
        })
    }
    if (unread) {
      this.chatClient.receiveUnreadText(
        this.signIn_receiveUnreadText_funcOK.bind(this),
        null,
      )
    }
    // restore temporary buddies (on re-sign-in)
    var temporaryBuddies = []
    for (var tenant in this.buddyTable) {
      for (var user_id in this.buddyTable[tenant]) {
        if (this.buddyTable[tenant][user_id].isTemporaryBuddy) {
          temporaryBuddies.push({
            tenant: tenant,
            user_id: user_id,
          })
        }
      }
    }
    this.addChatClientBuddy(temporaryBuddies)
    this.refreshBuddyTable()
    this.fire('signedIn', ev)
    this.render()
  }
  //
  UcUiStore.prototype.signIn_funcError = function (ev) {
    this.signInStatus = 1
    if (ev.tstamp) {
      this.diffClientServerTime = +new Date() - ev.tstamp
    }
    this.reSignInDelay = 0
    this.lastSignOutReason = {
      code: ev.code,
      message: ev.message,
      reSignInTime: 0,
    }
    this.fire('signedOut', {
      reSignInDelay: 0,
      tstamp: +new Date() - this.diffClientServerTime,
    })
    this.render()
  }
  //
  UcUiStore.prototype.signIn_funcErrorWithTimer = function (ev) {
    var retryable =
      ev.code !== Brekeke.UCClient.Errors.ALREADY_SIGNED_IN &&
      ev.code !== Brekeke.UCClient.Errors.CANNOT_START_MFA &&
      ev.code !== Brekeke.UCClient.Errors.VERSION_INVALID
    this.signInStatus = 1
    if (ev.tstamp) {
      this.diffClientServerTime = +new Date() - ev.tstamp
    }
    if (retryable) {
      this.lastSignOutReason = {
        code: ev.code,
        message: ev.message,
        reSignInTime: +new Date() + this.reSignInDelay,
      }
      this.fire('signedOut', {
        reSignInDelay: this.reSignInDelay,
        tstamp: +new Date() - this.diffClientServerTime,
      })
      this.startReSignInTimer()
    } else {
      this.reSignInDelay = 0
      this.lastSignOutReason = {
        code: ev.code,
        message: ev.message,
        reSignInTime: 0,
      }
      this.fire('signedOut', {
        reSignInDelay: 0,
        tstamp: +new Date() - this.diffClientServerTime,
      })
    }
    this.render()
  }
  //
  UcUiStore.prototype.signIn_receiveUnreadText_funcOK = function (ev) {
    var _this = this

    var messageList = ev.messages.map(
      this.createMessageFromReceivedText.bind(this),
    )
    // show more link
    if (ev.hasMore) {
      var showmorelinkChatKeys = {}
      messageList.forEach(function (message) {
        message.chatKeys.forEach(function (chatKey) {
          showmorelinkChatKeys[chatKey] = true
        })
      })
      var showmorelinkOption = {
        chatKeys: Object.keys(showmorelinkChatKeys),
        unread: true,
      }
      this.addShowmorelinkToList(showmorelinkOption)
    }
    // add messages
    messageList.forEach(function (message) {
      // add to chat table
      _this.addMessageToList(message)
    })
    // read text
    var messageToNotify = null
    var toRead = ev.messages
      .filter(function (m) {
        return m.requires_read
      })
      .map(function (m) {
        messageToNotify = _this.createMessageFromReceivedText(m)
        return m.received_text_id
      })
    var readText =
      toRead.length > 0
        ? function () {
            setTimeout(
              _this.chatClient.readText.bind(_this.chatClient, toRead, null),
              _this.chatClient.getSettings().text_open_sec * 1000,
            )
          }
        : null
    // notification
    var evObj = null
    if (messageToNotify) {
      evObj = {
        chatKeys: messageToNotify.chatKeys,
        notificationProperties: {
          title: this.getBuddyUserForUi(messageToNotify.senderInfo).name,
          body: messageToNotify.messageText,
        },
        funcOnSelected: readText,
        notificationFunction: null,
      }
      this.fire('checkRequiresNotification', evObj)
    }
    if (evObj && evObj.notificationFunction) {
      evObj.notificationFunction()
    } else if (readText) {
      readText()
    }

    this.render()
  }
  //
  UcUiStore.prototype.startReSignInTimer = function () {
    var _this = this

    if (this.reSignInDelay <= 0) {
      return
    }
    if (this.reSignInTimer) {
      clearTimeout(this.reSignInTimer)
    }
    this.reSignInTimer = setTimeout(function () {
      if (_this.reSignInDelay <= 0) {
        return
      }
      if (_this.signInStatus !== 0 && _this.signInStatus !== 1) {
        return
      }
      _this.signInStatus = 2
      var signInOption = JSON.parse(JSON.stringify(_this.signInOption)) || {}
      if (_this.lastStatus) {
        signInOption.status = int(_this.lastStatus.status)
        signInOption.display = string(_this.lastStatus.display)
        signInOption.ui_customized_status =
          _this.lastStatus.ui_customized_status
      }
      signInOption.modest = true
      signInOption.recvMsgs = true
      var dtoken = null
      try {
        dtoken = JSON.parse(
          _this.getLocalStoragePreference({ keyList: ['br+dtoken+'] })[0],
        )
      } catch (e) {}
      if (dtoken && dtoken.token) {
        signInOption.device_token = dtoken.token
      } else {
      }
      signInOption.do_not_start_mfa = true
      _this.chatClient.signIn(
        signInOption,
        _this.signIn_funcOK.bind(_this),
        _this.signIn_funcErrorWithTimer.bind(_this),
      )
      _this.render()
    }, this.reSignInDelay)
    this.reSignInDelay *= 2
    if (
      this.maxReSignInDelay > 0 &&
      this.reSignInDelay > this.maxReSignInDelay
    ) {
      this.reSignInDelay = this.maxReSignInDelay
    }
  }

  // signInGuest
  // option
  // option.url
  // option.tenant
  // option.name
  // option.email
  // option.profinfo
  // option.reenterUserId
  // option.signInWebchatOptions
  // option.myProfileImageUrl
  UcUiStore.prototype.signInGuest = function (option) {
    var _this = this

    if (this.signInStatus === 0 || this.signInStatus === 1) {
      this.signInStatus = 2

      // create guest user
      var xhr = new XMLHttpRequest()
      var url =
        option.url +
        'uus?method=CGU&t=' +
        encodeURIComponent(encodeURIComponent(option.tenant)) +
        (option.name
          ? '&n=' + encodeURIComponent(encodeURIComponent(option.name))
          : '') +
        (option.email
          ? '&e=' + encodeURIComponent(encodeURIComponent(option.email))
          : '') +
        (option.profinfo
          ? '&p=' +
            encodeURIComponent(
              encodeURIComponent(JSON.stringify(option.profinfo)),
            )
          : '') +
        (option.reenterUserId
          ? '&rui=' +
            encodeURIComponent(encodeURIComponent(option.reenterUserId))
          : '')
      this.logger.log('debug', 'xhr post ' + url)
      xhr.open('POST', url, true)
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          _this.logger.log(
            'debug',
            'xhr response (' + xhr.status + ') ' + stringify(xhr.responseText),
          )
          if (xhr.status === 200) {
            var responseJson = null
            try {
              responseJson = JSON.parse(xhr.responseText)
            } catch (ex) {
              _this.logger.log(
                'warn',
                'JSON.parse error value=' + xhr.responseText + ', ex=' + ex,
              )
            }
            if (responseJson) {
              // sign-in
              _this.chatClient.signIn(
                {
                  url: option.url,
                  tenant: option.tenant,
                  user: string(responseJson.d),
                  pass: string(responseJson.w),
                  myProfileImageUrl: string(option.myProfileImageUrl),
                },
                function (ev) {
                  // funcOK
                  if (ev.tstamp) {
                    _this.diffClientServerTime = +new Date() - ev.tstamp
                  }
                  // enter webchat room
                  _this.chatClient.enterWebchatRoom(
                    option.signInWebchatOptions,
                    function (e) {
                      // funcOK
                      // set chatHeaderInfoTable
                      var chatType = 'CONFERENCE'
                      var chatCode =
                        string(e.conference.yyyymm) +
                        '_' +
                        string(e.conference.conf_id)
                      var chatKey = chatType + '_' + chatCode
                      if (!_this.chatHeaderInfoTable[chatKey]) {
                        _this.chatHeaderInfoTable[chatKey] = {}
                      }
                      _this.chatHeaderInfoTable[chatKey].conf_id = string(
                        e.conference.conf_id,
                      )
                      _this.getChatHeaderInfo({
                        chatType: chatType,
                        chatCode: chatCode,
                      }) // overwrite guest, yyyymm, etc.
                      // set guest_conf_id
                      _this.guest_conf_id = e.conference.conf_id
                      _this.reenter_user_id = string(option.reenterUserId)
                      _this.signInStatus = 3
                      _this.signInOKCount++
                      _this.configPropertiesCache =
                        _this.chatClient.getConfigProperties() || {}
                      _this.optionalSettingCache = {}
                      // add me to buddy table
                      _this.addToBuddyTable(_this.chatClient.getProfile())
                      // receive unreceived conference text
                      _this.chatClient.searchConferenceTexts(
                        {
                          conf_id: e.conference.conf_id,
                          yyyymm: e.conference.yyyymm,
                        },
                        function (ev) {
                          ev.logs.forEach(function (log) {
                            var messageFile = null
                            if (log.ctype === Constants.CTYPE_FILE_REQUEST) {
                              try {
                                messageFile = JSON.parse(log.content)
                                messageFile.receiverInfo = messageFile.target
                              } catch (e) {}
                            }
                            var message = {
                              chatKeys: [chatKey],
                              senderInfo: log.sender,
                              ctype: log.ctype,
                              messageText:
                                log.ctype === Constants.CTYPE_TEXT ||
                                log.ctype === Constants.CTYPE_CALL_RESULT
                                  ? string(log.content)
                                  : '',
                              messageObject: log.object,
                              errorType: '',
                              errorDetail: '',
                              messageFile: messageFile,
                              received_text_id: log.log_id,
                              topic_id: '',
                              conf_type: e.conference.conf_type,
                              replyEnabled: true,
                              unreached: false,
                              messageExtInfo: {
                                mailSubject: _this.getMailSubject(e.conference),
                              },
                              sentTimeValue: +parseDate(log.ltime),
                            }
                            _this.addMessageToList(message)
                          })
                          // add nonbuddy to chatClient immediately (do not subscribe)
                          var senders = Object.keys(ev.senders || {}).map(
                            function (key) {
                              return {
                                tenant: ev.senders[key].tenant,
                                user_id: ev.senders[key].user_id,
                                name: ev.senders[key].user_name,
                              }
                            },
                          )
                          _this.addChatClientBuddy(senders)
                          _this.render()
                        },
                        null,
                      )
                      _this.fire('signedIn')
                      _this.render()
                    },
                    function (e) {
                      // funcError
                      _this.logger.log(
                        'warn',
                        'chatClient.enterWebchatRoom error code=' +
                          e.code +
                          ', message=' +
                          e.message,
                      )
                      _this.signInStatus = 1
                      _this.lastSignOutReason = {
                        code: e.code,
                        message: e.message,
                        reSignInTime: 0,
                      }
                      _this.chatClient.signOut()
                      _this.fire('signedOut', {
                        reSignInDelay: 0,
                        tstamp: +new Date() - _this.diffClientServerTime,
                      })
                      _this.render()
                    },
                  )
                },
                function (e) {
                  // funcError
                  _this.logger.log(
                    'warn',
                    'chatClient.signIn error code=' +
                      e.code +
                      ', message=' +
                      e.message,
                  )
                  _this.signInStatus = 1
                  _this.lastSignOutReason = {
                    code: e.code,
                    message: e.message,
                    reSignInTime: 0,
                  }
                  _this.fire('signedOut', {
                    reSignInDelay: 0,
                    tstamp: +new Date() - _this.diffClientServerTime,
                  })
                  _this.render()
                },
              )
            } else {
              _this.logger.log('warn', 'responseJson=' + responseJson)
              _this.signInStatus = 1
              _this.lastSignOutReason = {
                code: -2000,
                message: 'responseJson=' + responseJson,
                reSignInTime: 0,
              }
              _this.fire('signedOut', {
                reSignInDelay: 0,
                tstamp: +new Date() - _this.diffClientServerTime,
              })
              _this.render()
            }
          } else {
            _this.logger.log('warn', 'status=' + xhr.status)
            _this.signInStatus = 1
            _this.lastSignOutReason = {
              code: -2000,
              message: 'status=' + xhr.status,
              reSignInTime: 0,
            }
            _this.fire('signedOut', {
              reSignInDelay: 0,
              tstamp: +new Date() - _this.diffClientServerTime,
            })
            _this.render()
          }
        }
      }
      xhr.send()
      this.render()
    }
  }

  // signOut
  UcUiStore.prototype.signOut = function (option) {
    if (this.signInStatus !== 0 && this.signInStatus !== 1) {
      this.signInStatus = 0
      this.reSignInDelay = 0
      if (this.reSignInTimer) {
        clearTimeout(this.reSignInTimer)
        this.reSignInTimer = null
      }
      this.lastSignOutReason = { code: 1, message: '', reSignInTime: 0 }
      this.addSignOutSysmsg()
      this.webchatQueueList = []
      this.chatClient.signOut(option && option.signOutOptions)
      this.fire('signedOut', {
        reSignInDelay: 0,
        tstamp: +new Date() - this.diffClientServerTime,
      })
      this.render()
    } else {
      if (this.reSignInDelay || this.reSignInTimer) {
        this.reSignInDelay = 0
        if (this.reSignInTimer) {
          clearTimeout(this.reSignInTimer)
          this.reSignInTimer = null
        }
        if (this.lastSignOutReason.reSignInTime) {
          this.lastSignOutReason.reSignInTime = 0
        }
        this.render()
      }
    }
  }
  //
  UcUiStore.prototype.addSignOutSysmsg = function () {
    var _this = this

    var profile = this.chatClient.getProfile()
    if (this.guest_conf_id) {
      // guest
      this.addSysmsgToList({
        chatKeys: [
          this.getChatCodeByConfId({ conf_id: this.guest_conf_id }).chatKey,
        ],
        sysmsgLevel: 'info',
        sysmsgType:
          this.signInStatus === 0 &&
          this.lastSignOutReason &&
          this.lastSignOutReason.reSignInTime
            ? 'MSG_CHAT_OFFLINE'
            : 'MSG_CHAT_CLOSED',
      })
    } else {
      // for joined conferences
      var chatKeys = this.webchatQueueList.reduce(function (p, webchatQueue) {
        var k = _this.getChatCodeByConfId({
          conf_id: webchatQueue.conf_id,
        }).chatKey
        if (
          _this.chatTable[k] &&
          _this.chatTable[k].memberList &&
          _this.chatTable[k].memberList.some(function (u) {
            return u.tenant === profile.tenant && u.user_id === profile.user_id
          })
        ) {
          p.push(k)
        }
        return p
      }, [])
      // remove me from memberList
      chatKeys.forEach(function (chatKey) {
        _this.chatTable[chatKey].memberList = _this.chatTable[
          chatKey
        ].memberList.filter(function (u) {
          return !(u.tenant === profile.tenant && u.user_id === profile.user_id)
        })
      })
      // show messages
      this.addSysmsgToList({
        chatKeys: chatKeys,
        sysmsgLevel: 'info',
        sysmsgType: 'MSG_CONFERENCE_ME_LEFT',
      })
    }
  }

  // clearChat
  UcUiStore.prototype.clearChat = function (option) {
    var _this = this
    if (!option) {
      return
    }
    var chatKey = option.chatType + '_' + option.chatCode
    this.chatTable[chatKey] &&
      this.chatTable[chatKey].chatList &&
      this.chatTable[chatKey].chatList.forEach(function (chat) {
        if (chat.type === 'paragraph') {
          chat.messageList &&
            chat.messageList.forEach(function (mes) {
              // destroy file data
              if (
                mes.messageFile &&
                (mes.messageFile.status === Constants.FILE_STATUS_UNACCEPTED ||
                  mes.messageFile.status === Constants.FILE_STATUS_TRANSFERRING)
              ) {
                _this.chatClient.cancelFile(
                  mes.messageFile.file_id,
                  function (ev) {
                    _this.logger.log(
                      'warn',
                      'chatClient.cancelFile error code=' +
                        ev.code +
                        ', message=' +
                        ev.message,
                    )
                  },
                )
              }
              // destroy image data
              if (
                mes.messageFile &&
                mes.messageFile.inlineImage &&
                mes.messageFile.inlineImage.url
              ) {
                var index = _this.objectURLList.indexOf(
                  mes.messageFile.inlineImage.url,
                )
                if (index !== -1) {
                  _this.objectURLList.splice(index, 1)
                  URL.revokeObjectURL(mes.messageFile.inlineImage.url)
                }
              }
              // destroy key object table entry
              delete _this.keyObjectTable[mes.key]
            })
        } else if (chat.type === 'showmorelink') {
          // destroy showmorelink
          if (
            _this.showmorelinkTable[chat.showmorelink_id] &&
            _this.showmorelinkTable[chat.showmorelink_id].chatKeys
          ) {
            var index =
              _this.showmorelinkTable[chat.showmorelink_id].chatKeys.indexOf(
                chatKey,
              )
            if (index !== -1) {
              _this.showmorelinkTable[chat.showmorelink_id].chatKeys.splice(
                index,
                1,
              )
              if (
                _this.showmorelinkTable[chat.showmorelink_id].chatKeys
                  .length === 0
              ) {
                delete _this.showmorelinkTable[chat.showmorelink_id]
              }
            }
          }
        }
        // destroy key object table entry
        delete _this.keyObjectTable[chat.key]
      })
    if (option.chatType === 'CHAT') {
      if (
        this.chatTable[chatKey] &&
        this.chatTable[chatKey].chatList &&
        this.chatClient.getBuddylist().user.some(function (u) {
          return (
            option.chatCode ===
            JSON.stringify({ tenant: u.tenant, user_id: u.user_id })
          )
        })
      ) {
        // destroy only chat list
        this.chatTable[chatKey].chatList.length = 0
        // create showmorelink
        this.addShowmorelinkToList({
          chatKeys: [chatKey],
          unread: false,
        })
        this.render()
        return
      }
    } else if (option.chatType === 'CONFERENCE') {
      var conf_id = this.getChatHeaderInfo(option).conf_id
      var conference = this.chatClient.getConference(conf_id)
      if (conference.conf_status !== Constants.CONF_STATUS_INACTIVE) {
        // TODO: yano destroy only chat list
        // TODO: yano create showmorelink
        this.render()
        return
      }
    }
    // destroy data
    delete this.unsentReplyMessagesTable[chatKey]
    // destroy search data
    if (this.searchWorkDataTable[chatKey]) {
      this.searchWorkDataTable[chatKey].clearing = true
    }
    delete this.searchConditionsTable[chatKey]
    delete this.searchWorkDataTable[chatKey]
    delete this.searchResultsTable[chatKey]
    // destroy chat header info
    delete this.chatHeaderInfoTable[chatKey]
    // destroy chat data
    delete this.chatTable[chatKey]
    this.render()
  }

  // refreshBuddyTable
  UcUiStore.prototype.refreshBuddyTable = function (option) {
    var _this = this
    for (var tenant in this.buddyTable) {
      for (var user_id in this.buddyTable[tenant]) {
        if (
          this.buddyTable[tenant][user_id].isMe ||
          this.buddyTable[tenant][user_id].isBuddy
        ) {
          delete this.buddyTable[tenant][user_id]
        }
      }
    }
    // add me to buddy table
    this.addToBuddyTable(this.chatClient.getProfile())
    // add buddies to buddy table
    this.chatClient.getBuddylist().user.forEach(function (p) {
      if (p.user_id) {
        _this.addToBuddyTable(p)
        // add new chat to chat table
        var chatKey =
          'CHAT' +
          '_' +
          JSON.stringify({ tenant: p.tenant, user_id: p.user_id })
        if (!_this.chatTable[chatKey]) {
          _this.chatTable[chatKey] = _this.newChatTableEntry(chatKey)
          _this.addShowmorelinkToList({
            chatKeys: [chatKey],
            unread: false,
          })
        }
      }
    })
    this.render()
  }

  // uncacheProfileImageUrl
  // option
  // option.minSignInOKCount
  UcUiStore.prototype.uncacheProfileImageUrl = function (option) {
    if (this.signInOKCount >= int(option && option.minSignInOKCount)) {
      if (option && option.uncacheParam2) {
        this.uncacheParam2 = int(option.uncacheParam2)
      }
      for (var tenant in this.buddyTable) {
        for (var user_id in this.buddyTable[tenant]) {
          if (this.buddyTable[tenant][user_id].profile_image_url) {
            this.buddyTable[tenant][user_id].profile_image_url =
              this.buddyTable[tenant][user_id].profile_image_url.replace(
                /&uncache=[0-9]+/g,
                '',
              ) +
              '&uncache=' +
              this.signInOKCount +
              this.uncacheParam2
          }
        }
      }
      this.render()
    }
  }

  // changeStatus
  // option
  // option.status
  // option.display
  // option.ui_customized_status
  UcUiStore.prototype.changeStatus = function (option) {
    var _this = this

    if (!option) {
      return
    }
    var status = this.chatClient.getStatus()
    if (typeof option.status !== 'undefined') {
      status.status = int(option.status)
    }
    if (typeof option.display !== 'undefined') {
      status.display = string(option.display)
    }
    if (typeof option.ui_customized_status !== 'undefined') {
      status.ui_customized_status = option.ui_customized_status
    }
    this.chatClient.changeStatus(
      status,
      function (ev) {
        _this.lastStatus = status
        _this.render()
      },
      function (ev) {
        _this.render()
      },
    )
    this.render()
  }

  /**
   * getBuddyUserForUi function
   * option
   * option.tenant
   * option.user_id
   */
  UcUiStore.prototype.getBuddyUserForUi = function (option) {
    if (!option) {
      option = {}
    }
    var profile = this.chatClient.getProfile()
    var tenant = string(option.tenant || profile.tenant)
    if (this.buddyTable[tenant] && this.buddyTable[tenant][option.user_id]) {
      return JSON.parse(JSON.stringify(this.buddyTable[tenant][option.user_id]))
    } else {
      return {
        tenant: tenant,
        user_id: string(option.user_id),
        chatCode: JSON.stringify({
          tenant: tenant,
          user_id: string(option.user_id),
        }),
        name: '',
        display_name: '',
        profile_image_url: '',
        paragraphClassIndex: 1, // TODO: yano test
        isMe: false,
        isBuddy: false,
        isTemporaryBuddy: false,
        buddyIndex: -1,
        group: '',
        groupIndex: -1,
      }
    }
  }
  //
  UcUiStore.prototype.addChatClientBuddy = function (buddyList) {
    var _this = this

    var profile = this.chatClient.getProfile()
    var allUsersTable = (this.chatClient.getAllUsers().user || []).reduce(
      function (a, c) {
        a[c.user_id] = c
        return a
      },
      {},
    )
    var newBuddyList = (buddyList || []).map(function (buddy) {
      var name = buddy.name
      if (
        !name &&
        (buddy.tenant === profile.tenant || !buddy.tenant) &&
        allUsersTable[buddy.user_id]
      ) {
        name = allUsersTable[buddy.user_id].user_name
      }
      if (name) {
        // add nonbuddy to chatClient immediately (do not subscribe)
        return {
          tenant: buddy.tenant,
          user_id: buddy.user_id,
          name: name,
          doNotSubscribe: true,
        }
      } else {
        // add buddy to chatClient
        return buddy
      }
    })
    this.chatClient.addTemporaryBuddy(newBuddyList, null, function (e) {
      return _this.logger.log(
        'warn',
        'chatClient.addTemporaryBuddy error code=' +
          e.code +
          ', message=' +
          e.message,
      )
    })
    newBuddyList.forEach(function (buddy) {
      if (buddy.doNotSubscribe) {
        // this.addToBuddyTable() immediately
        _this.addToBuddyTable(_this.chatClient.getBuddyUser(buddy))
      } else {
        // this.addToBuddyTable() in UcUiStore.prototype.buddyStatusChanged after subscribe
      }
    })
  }
  //
  UcUiStore.prototype.addToBuddyTable = function (u) {
    var profile = this.chatClient.getProfile()
    var settings = this.chatClient.getSettings()
    var buddylist = this.chatClient.getBuddylist()
    var isMe = u.tenant === profile.tenant && u.user_id === profile.user_id
    var buddyIndex = buddylist.user.findIndex(function (p) {
      return u.tenant === p.tenant && u.user_id === p.user_id
    })
    var isBuddy = buddyIndex !== -1
    var group = isBuddy ? string(buddylist.user[buddyIndex].group) : ''
    var groupIndex = buddylist.user.findIndex(function (p) {
      return group === p.id
    })
    var isTemporaryBuddy = false
    if (!isMe && !isBuddy) {
      // TODO: yano unsubscribe non-buddy whose status remains offline for long time
      //if (this.chatClient.getBuddyStatus(u).status === Constants.STATUS_OFFLINE) {
      //    // unsubscribe offline non-buddy
      //    this.chatClient.removeTemporaryBuddy([u], null, null);
      //} else {
      isTemporaryBuddy = true
      //}
    }

    if (!this.buddyTable[u.tenant]) {
      this.buddyTable[u.tenant] = {}
    }
    this.buddyTable[u.tenant][u.user_id] = {
      tenant: u.tenant,
      user_id: u.user_id,
      chatCode: JSON.stringify({ tenant: u.tenant, user_id: u.user_id }),
      name: u.name || u.user_id,
      display_name:
        (isMe &&
          profile.user_type !== Constants.USER_TYPE_TENANT_GUEST &&
          string(this.getOptionalSetting({ key: 'display_name' }))) ||
        u.name ||
        u.user_id,
      profile_image_url: u.profile_image_url,
      paragraphClassIndex: isMe ? 0 : 1, // TODO: yano test
      isMe: isMe,
      isBuddy: isBuddy,
      isTemporaryBuddy: isTemporaryBuddy,
      buddyIndex: buddyIndex,
      group: group,
      groupIndex: groupIndex,
    }
  }

  /**
   * getChatHeaderInfo function
   * option
   * option.chatType
   * option.chatCode
   */
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
            .filter(function (tag) {
              return (
                tag.tag_type === '_webchat' &&
                tag.tag_key === 'webchatServiceId'
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
        chatHeaderInfo.webchatContinuable = string(
          conference.conf_tags
            .filter(function (tag) {
              return (
                tag.tag_type === '_webchat' &&
                tag.tag_key === 'webchatContinuable'
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
        chatHeaderInfo.replyTypes = string(
          conference.conf_tags
            .filter(function (tag) {
              return tag.tag_type === '_webchat' && tag.tag_key === 'replyTypes'
            })
            .sort(function (tag1, tag2) {
              return tag1.tstamp - tag2.tstamp
            })
            .map(function (tag) {
              return tag.tag_value
            })
            .pop(),
        )
        chatHeaderInfo.editorTypes = string(
          conference.conf_tags
            .filter(function (tag) {
              return (
                tag.tag_type === '_webchat' && tag.tag_key === 'editorTypes'
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
        chatHeaderInfo.initialEditorType = string(
          conference.conf_tags
            .filter(function (tag) {
              return (
                tag.tag_type === '_webchat' &&
                tag.tag_key === 'initialEditorType'
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
        chatHeaderInfo.lastConfType = string(
          conference.conf_tags
            .filter(function (tag) {
              return (
                tag.tag_type === '_webchat' && tag.tag_key === 'lastConfType'
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
        chatHeaderInfo.nextDistributionType = string(
          conference.conf_tags
            .filter(function (tag) {
              return (
                tag.tag_type === '_webchat' &&
                tag.tag_key === 'nextDistributionType'
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
        chatHeaderInfo.nextDistributionTarget = string(
          conference.conf_tags
            .filter(function (tag) {
              return (
                tag.tag_type === '_webchat' &&
                tag.tag_key === 'nextDistributionTarget'
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
        chatHeaderInfo.originalWebchatId = string(
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
        chatHeaderInfo.subject = string(
          this.chatHeaderInfoTable[chatKey].subject,
        )
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
      // conference is not active any longer
      // keep this.chatHeaderInfoTable[chatKey]
    }
    // return clone
    return JSON.parse(JSON.stringify(this.chatHeaderInfoTable[chatKey]))
  }

  /**
   * getChatCodeByConfId function
   * option
   * option.conf_id
   * option.yyyymm
   */
  UcUiStore.prototype.getChatCodeByConfId = function (option) {
    for (var chatKey in this.chatHeaderInfoTable) {
      if (
        option &&
        option.conf_id &&
        this.chatHeaderInfoTable[chatKey].conf_id === option.conf_id &&
        (!option.yyyymm ||
          this.chatHeaderInfoTable[chatKey].yyyymm === option.yyyymm)
      ) {
        var chatType = chatKey.split('_')[0]
        var chatCode = chatKey.substr((chatType + '_').length)
        return {
          chatKey: chatKey,
          chatType: chatType,
          chatCode: chatCode,
        }
      }
    }
    return {
      chatKey: '',
      chatType: '',
      chatCode: '',
    }
  }

  // setDoNotContinue
  // option
  // option.chatType
  // option.chatCode
  UcUiStore.prototype.setDoNotContinue = function (option) {
    if (!option) {
      return
    }
    var chatKey = option.chatType + '_' + option.chatCode
    if (this.chatHeaderInfoTable[chatKey]) {
      this.chatHeaderInfoTable[chatKey].doNotContinue = true
    }
  }

  // createConference
  // option
  // option.subject
  // option.invite
  UcUiStore.prototype.createConference = function (option) {
    if (!option) {
      return
    }
    this.chatClient.createConference(
      option.subject,
      option.invite,
      this.createConference_funcOK.bind(this, option),
      this.createConference_funcError.bind(this, option),
    )
  }
  //
  UcUiStore.prototype.createConference_funcOK = function (option, ev) {
    this.chatClient.joinConference(
      ev.conference.conf_id,
      { invisible: false, exclusive: false },
      this.createConference_joinConference_funcOK.bind(
        this,
        ev.conference.conf_id,
        option,
      ),
      this.createConference_funcError.bind(this, option),
    )
  }
  //
  UcUiStore.prototype.createConference_funcError = function (option, ev) {
    this.logger.log(
      'warn',
      'chatClient.createConference error code=' +
        ev.code +
        ', message=' +
        ev.message,
    )
    this.fire('errorOccurred', {
      errorType: 'MSG_CREATE_CONFERENCE_FAILED',
      errorDetail: string(ev.message),
    })
  }
  //
  UcUiStore.prototype.createConference_joinConference_funcOK = function (
    conf_id,
    option,
    ev,
  ) {
    var _this = this

    var chatType = 'CONFERENCE'
    var chatCode =
      string(ev && ev.conference && ev.conference.yyyymm) +
      '_' +
      string(conf_id)
    var chatKey = chatType + '_' + chatCode
    if (!this.chatHeaderInfoTable[chatKey]) {
      this.chatHeaderInfoTable[chatKey] = {}
    }
    this.chatHeaderInfoTable[chatKey].conf_id = string(conf_id)
    this.getChatHeaderInfo({ chatType: chatType, chatCode: chatCode }) // overwrite guest, yyyymm, etc.
    this.fire('newConference', { chatType: chatType, chatCode: chatCode })
    option.invite &&
      option.invite.forEach &&
      option.invite.forEach(function (u) {
        _this.addSysmsgToList({
          chatKeys: [chatKey],
          sysmsgLevel: 'info',
          sysmsgType: 'MSG_CONFERENCE_INVITING',
          buddy: u,
        })
      })
    this.render()
  }

  // inviteToConference
  // option
  // option.conf_id
  // option.invite
  UcUiStore.prototype.inviteToConference = function (option) {
    if (!option) {
      return
    }
    this.chatClient.inviteToConference(
      option.conf_id,
      option.invite,
      this.inviteToConference_funcOK.bind(this, option),
      this.inviteToConference_funcError.bind(this, option),
    )
  }
  //
  UcUiStore.prototype.inviteToConference_funcOK = function (option, ev) {
    var _this = this

    option.invite &&
      option.invite.forEach &&
      option.invite.forEach(function (u) {
        _this.addSysmsgToList({
          chatKeys: [
            _this.getChatCodeByConfId({ conf_id: string(option.conf_id) })
              .chatKey,
          ],
          sysmsgLevel: 'info',
          sysmsgType: 'MSG_CONFERENCE_INVITING',
          buddy: u,
        })
      })
    this.render()
  }
  //
  UcUiStore.prototype.inviteToConference_funcError = function (option, ev) {
    this.logger.log(
      'warn',
      'chatClient.inviteToConference error code=' +
        ev.code +
        ', message=' +
        ev.message,
    )
    this.fire('errorOccurred', {
      errorType: 'MSG_INVITE_TO_CONFERENCE_FAILED',
      errorDetail: string(ev.message),
    })
  }

  // joinConference
  // option
  // option.conf_id
  // option.properties
  UcUiStore.prototype.joinConference = function (option) {
    this.joinWebchatRoom(option)
  }

  // leaveConference
  // option
  // option.conf_id
  // option.rejoinable
  UcUiStore.prototype.leaveConference = function (option) {
    this.leaveWebchatRoom(option)
  }

  // joinWebchatRoom
  // option
  // option.conf_id
  // option.properties
  UcUiStore.prototype.joinWebchatRoom = function (option) {
    if (!option) {
      return
    }
    var conf_id = option.conf_id
    if (this.confInJoinProcTable[conf_id]) {
      this.logger.log(
        'warn',
        'multiple call: UcUiStore.joinWebchatRoom() conf_id=' + conf_id,
      )
      return
    }
    var chatType = 'CONFERENCE'
    var chatCode = this.getChatCodeByConfId({ conf_id: conf_id }).chatCode
    // join
    this.chatClient.joinConference(
      conf_id,
      option.properties,
      this.joinWebchatRoom_funcOK.bind(this, option),
      this.joinWebchatRoom_funcError.bind(this, option, chatType, chatCode),
    )
    this.confInJoinProcTable[conf_id] = {}
    this.fire('newWebchat', { chatType: chatType, chatCode: chatCode })
    this.render()
  }
  //
  UcUiStore.prototype.joinWebchatRoom_funcOK = function (option, ev) {
    var _this = this
    var conf_id = ev.conference.conf_id
    var chatType = 'CONFERENCE'
    var chatCode = this.getChatCodeByConfId({ conf_id: conf_id }).chatCode
    var chatKey = chatType + '_' + chatCode
    delete this.confInJoinProcTable[conf_id]
    this.chatClient.searchConferenceTexts(
      { conf_id: conf_id, yyyymm: ev.conference.yyyymm },
      this.joinWebchatRoom_searchConferenceTexts_funcOK.bind(
        this,
        conf_id,
        ev.conference.conf_type,
      ),
      null,
    )
    if (
      option.properties &&
      option.properties.exclusive &&
      ev.conference.invite_properties.webchatfromguest &&
      ev.conference.invite_properties.webchatfromguest.acd_id
    ) {
      var tags = [
        {
          tag_key: 'acd',
          tag_value: ev.conference.invite_properties.webchatfromguest.acd_id,
          tag_type: '_webchat',
          permission: Constants.USER_TYPE_TENANT_USER,
        },
      ]
      if (
        this.configPropertiesCache.optional_config &&
        this.configPropertiesCache.optional_config.agent_group_id
      ) {
        tags.push({
          tag_key: 'agentGroupId',
          tag_value: this.configPropertiesCache.optional_config.agent_group_id,
          tag_type: '_webchat',
          permission: Constants.USER_TYPE_TENANT_USER,
        })
      }
      this.chatClient.updateTag(
        {
          attached_type: 'conf',
          attached_id: conf_id,
          yyyymm: ev.conference.yyyymm,
          adds: tags,
          removes: [],
        },
        null,
        null,
      )
    }

    // send unsent messages of replying
    if (this.unsentReplyMessagesTable[chatKey]) {
      this.unsentReplyMessagesTable[chatKey].forEach(function (message) {
        _this.chatClient.sendConferenceText(
          message.messageText,
          conf_id,
          function (ev) {
            // display sent time
            message.unreached = false
            message.sentTimeValue = +parseDate(ev.ltime)
            message.received_text_id = ev.text_id
            _this.render()
          },
          function (ev) {
            // display error
            _this.logger.log(
              'warn',
              'chatClient.sendConferenceText error code=' +
                ev.code +
                ', message=' +
                ev.message,
            )
            message.errorType = 'MSG_SEND_TEXT_ERROR'
            message.errorDetail = string(ev.message)
            _this.addSysmsgToList({
              chatKeys: [chatKey],
              sysmsgLevel: 'error',
              sysmsgType: 'MSG_SEND_TEXT_ERROR',
            })
            _this.render()
          },
        )
      })
      delete this.unsentReplyMessagesTable[chatKey]
    }

    // leave and reply unanswered webchat soon after joining
    this.leavingUnansweredWebchatConfId = null
    if (
      ev.conference.creator.conf_status ===
      Constants.CONF_STATUS_LEFT_UNANSWERED
    ) {
      this.leavingUnansweredWebchatConfId = conf_id
      this.leaveWebchatRoom({ conf_id: conf_id })
    }

    this.render()
  }
  //
  UcUiStore.prototype.joinWebchatRoom_funcError = function (
    option,
    chatType,
    chatCode,
    ev,
  ) {
    delete this.confInJoinProcTable[option.conf_id]
    // display error
    this.logger.log(
      'warn',
      'chatClient.joinConference error code=' +
        ev.code +
        ', message=' +
        ev.message,
    )
    this.addSysmsgToList({
      chatKeys: [chatType + '_' + chatCode],
      sysmsgLevel: 'error',
      sysmsgType: 'MSG_JOIN_CONFERENCE_ERROR',
    })
    this.fire('errorOccurred', {
      errorType: 'MSG_JOIN_CONFERENCE_FAILED',
      errorDetail: string(ev.message),
    })
    this.render()
  }
  //
  UcUiStore.prototype.joinWebchatRoom_searchConferenceTexts_funcOK = function (
    conf_id,
    conf_type,
    ev,
  ) {
    var _this = this

    var conference = this.chatClient.getConference(conf_id)
    ev.logs.forEach(function (log) {
      // message
      var messageFile = null
      if (log.ctype === Constants.CTYPE_FILE_REQUEST) {
        try {
          messageFile = JSON.parse(log.content)
          messageFile.receiverInfo = messageFile.target
        } catch (e) {}
      }
      var message = {
        chatKeys: [_this.getChatCodeByConfId({ conf_id: conf_id }).chatKey],
        senderInfo: log.sender,
        ctype: log.ctype,
        messageText:
          log.ctype === Constants.CTYPE_TEXT ||
          log.ctype === Constants.CTYPE_CALL_RESULT
            ? string(log.content)
            : '',
        messageObject: log.object,
        errorType: '',
        errorDetail: '',
        messageFile: messageFile,
        received_text_id: log.log_id,
        topic_id: '',
        conf_type: conf_type,
        replyEnabled: true,
        unreached: false,
        messageExtInfo: {
          mailSubject: _this.getMailSubject(conference),
        },
        sentTimeValue: +parseDate(log.ltime),
      }
      // add to webchat queue
      var webchatQueue = _this.webchatQueueList.find(function (element) {
        return element.conf_id === conf_id
      })
      if (webchatQueue && webchatQueue.messageList) {
        if (
          !webchatQueue.messageList.some(function (mes) {
            return (
              mes &&
              mes.received_text_id &&
              mes.received_text_id === message.received_text_id
            )
          })
        ) {
          webchatQueue.messageList.push(message)
        }
      }
      // add to chat table
      _this.addMessageToList(message)
    })
    // add nonbuddy to chatClient immediately (do not subscribe)
    var senders = Object.keys(ev.senders || {}).map(function (key) {
      return {
        tenant: ev.senders[key].tenant,
        user_id: ev.senders[key].user_id,
        name: ev.senders[key].user_name,
      }
    })
    this.addChatClientBuddy(senders)
    this.render()
  }

  // leaveWebchatRoom
  // option
  // option.conf_id
  // option.rejoinable
  UcUiStore.prototype.leaveWebchatRoom = function (option) {
    if (!option) {
      return
    }
    var conf_id = option.conf_id
    var conference = this.chatClient.getConference(conf_id)
    this.chatClient.leaveConference(
      option,
      this.leaveWebchatRoom_funcOK.bind(this, conference),
      this.leaveWebchatRoom_funcError.bind(this, conference),
    )
  }
  //
  UcUiStore.prototype.leaveWebchatRoom_funcOK = function (conference, ev) {
    var profile = this.chatClient.getProfile()
    var settings = this.chatClient.getSettings()
    var chatType = 'CONFERENCE'
    var chatCode = this.getChatCodeByConfId({
      conf_id: conference.conf_id,
    }).chatCode
    var chatKey = chatType + '_' + chatCode
    if (this.chatTable[chatKey] && this.chatTable[chatKey].memberList) {
      this.chatTable[chatKey].memberList = this.chatTable[
        chatKey
      ].memberList.filter(function (u) {
        return !(u.tenant === profile.tenant && u.user_id === profile.user_id)
      })
      this.addSysmsgToList({
        chatKeys: [chatKey],
        sysmsgLevel: 'info',
        sysmsgType: 'MSG_CONFERENCE_ME_LEFT',
      })
    }
    if (conference.conf_type === 'webchat') {
      if (ev.closes) {
        var index = this.webchatQueueList.findIndex(function (webchatQueue) {
          return webchatQueue.conf_id === conference.conf_id
        })
        if (index !== -1) {
          var webchatQueue = conference
          webchatQueue.conf_status = Constants.CONF_STATUS_INACTIVE
          webchatQueue.messageList = this.webchatQueueList[index].messageList
          webchatQueue.baseTime = this.webchatQueueList[index].baseTime
          this.webchatQueueList[index] = webchatQueue
        }
      }
    }
    this.fire('webchatLeft', {
      chatType: chatType,
      chatCode: chatCode,
      tstamp: int(ev.tstamp),
    })
    if (this.leavingUnansweredWebchatConfId === conference.conf_id) {
      this.leavingUnansweredWebchatConfId = null
      this.fire('unansweredWebchatLeft', {
        chatType: chatType,
        chatCode: chatCode,
        tstamp: int(ev.tstamp),
      })
    }
    this.render()
  }
  //
  UcUiStore.prototype.leaveWebchatRoom_funcError = function (conference, ev) {
    // display error
    this.logger.log(
      'warn',
      'chatClient.leaveConference error code=' +
        ev.code +
        ', message=' +
        ev.message,
    )
    this.addSysmsgToList({
      chatKeys: [
        this.getChatCodeByConfId({ conf_id: conference.conf_id }).chatKey,
      ],
      sysmsgLevel: 'error',
      sysmsgType: 'MSG_LEAVE_CONFERENCE_ERROR',
    })
    this.fire('errorOccurred', {
      errorType: 'MSG_LEAVE_CONFERENCE_FAILED',
      errorDetail: string(ev.message),
    })
    this.render()
  }

  // kickOutOfWebchatRoom
  // option
  // option.conf_id
  UcUiStore.prototype.kickOutOfWebchatRoom = function (option) {
    var _this = this

    if (!option) {
      return
    }
    var conf_id = option.conf_id
    var conference = this.chatClient.getConference(conf_id)
    conference.user.forEach(function (u) {
      if (
        u.conf_status === Constants.CONF_STATUS_JOINED &&
        !(
          u.tenant === conference.creator.tenant &&
          u.user_id === conference.creator.user_id
        ) &&
        _this.buddyTable[u.tenant] &&
        _this.buddyTable[u.tenant][u.user_id] &&
        _this.buddyTable[u.tenant][u.user_id].isTemporaryBuddy
      ) {
        _this.chatClient.kickOutOfConference(
          { conf_id: conf_id, tenant: u.tenant, user_id: u.user_id },
          null,
          null,
        )
      }
    })
    if (conference.creator.conf_status === Constants.CONF_STATUS_JOINED) {
      this.chatClient.kickOutOfConference(
        {
          conf_id: conf_id,
          tenant: conference.creator.tenant,
          user_id: conference.creator.user_id,
        },
        null,
        this.kickOutOfWebchatRoom_funcError.bind(this, conference),
      )
    }
  }
  //
  UcUiStore.prototype.kickOutOfWebchatRoom_funcError = function (
    conference,
    ev,
  ) {
    // display error
    this.logger.log(
      'warn',
      'chatClient.kickOutOfConference error code=' +
        ev.code +
        ', message=' +
        ev.message,
    )
    this.addSysmsgToList({
      chatKeys: [
        this.getChatCodeByConfId({ conf_id: conference.conf_id }).chatKey,
      ],
      sysmsgLevel: 'error',
      sysmsgType: 'MSG_LEAVE_CONFERENCE_ERROR',
    })
    this.render()
  }

  // clearWebchatQueue
  UcUiStore.prototype.clearWebchatQueue = function (option) {
    if (!option) {
      return
    }
    var index = this.webchatQueueList.findIndex(function (webchatQueue) {
      return (
        webchatQueue.conf_id === option.conf_id &&
        webchatQueue.conf_status === Constants.CONF_STATUS_INACTIVE
      )
    })
    if (index !== -1) {
      this.webchatQueueList.splice(index, 1)
      this.render()
    }
  }

  // sendText
  // option
  // option.chatType
  // option.chatCode
  // option.text
  // option.isRichText
  UcUiStore.prototype.sendText = function (option) {
    var _this = this

    if (!option) {
      return
    }
    var text = option.isRichText ? option.text : escapeHTML(option.text)
    var chatKey = option.chatType + '_' + option.chatCode
    var chatHeaderInfo = this.getChatHeaderInfo(option)
    var conf_id = chatHeaderInfo.conf_id

    if (text.length > UiConstants.CHAT_CONTENT_SIZE) {
      this.logger.log('warn', 'message too long length=' + text.length)
      this.addSysmsgToList({
        chatKeys: [chatKey],
        sysmsgLevel: 'error',
        sysmsgType: 'MSG_TOO_LONG',
      })
      this.render()
      return
    }

    // display message
    var conference = null
    if (option.chatType === 'CONFERENCE') {
      conference = this.chatClient.getConference(conf_id)
    }
    var message = this.addMessageToList({
      chatKeys: [chatKey],
      senderInfo: this.chatClient.getProfile(),
      ctype: Constants.CTYPE_TEXT,
      messageText: text,
      messageObject: undefined,
      errorType: '',
      errorDetail: '',
      messageFile: null,
      received_text_id: '',
      topic_id: '',
      conf_type: string(conference && conference.conf_type),
      replyEnabled: false,
      unreached: true,
      messageExtInfo: {
        mailSubject: this.getMailSubject(conference),
      },
      sentTimeValue: +new Date(),
    })

    if (option.chatType === 'CONFERENCE') {
      var profile = this.chatClient.getProfile()
      conference = conference || this.chatClient.getConference(conf_id)
      var nextDistributionTarget = chatHeaderInfo.nextDistributionTarget
      var joinedCount = conference.user.filter(function (u) {
        return u.conf_status === Constants.CONF_STATUS_JOINED
      }).length
      if (
        nextDistributionTarget === profile.user_id &&
        !(
          conference.conf_status === Constants.CONF_STATUS_JOINED &&
          joinedCount >= 2
        )
      ) {
        // reply
        if (conference.conf_status === Constants.CONF_STATUS_JOINED) {
          // leave old conference
          this.leaveWebchatRoom({ conf_id: conf_id })
        }
        if (!this.unsentReplyMessagesTable[chatKey]) {
          this.unsentReplyMessagesTable[chatKey] = []
          // invite guest
          if (chatHeaderInfo.selectedReplyType) {
            var continuation_code =
              this.getChatClient().publishContinuationCode({
                yyyymm: chatHeaderInfo.yyyymm,
                conf_id: chatHeaderInfo.conf_id,
              })
            this.chatClient.inviteGuest(
              {
                conf_id: chatHeaderInfo.conf_id,
                yyyymm: chatHeaderInfo.yyyymm,
                selected_reply_type: chatHeaderInfo.selectedReplyType,
                continuation_code: continuation_code,
                optional_ev: {
                  agent_operation: 'reply',
                },
              },
              function (ev) {},
              function (ev) {
                // display error
                _this.logger.log(
                  'warn',
                  'chatClient.inviteGuest error code=' +
                    ev.code +
                    ', message=' +
                    ev.message,
                )
                message.errorType = 'MSG_SEND_TEXT_ERROR'
                message.errorDetail = string(ev.message)
                _this.addSysmsgToList({
                  chatKeys: [chatKey],
                  sysmsgLevel: 'error',
                  sysmsgType: 'MSG_SEND_TEXT_ERROR',
                })
                // never send
                delete _this.unsentReplyMessagesTable[chatKey]
                _this.render()
              },
            )
          }
        }
        this.unsentReplyMessagesTable[chatKey].push(message)
      } else {
        // send
        this.chatClient.sendConferenceText(
          text,
          conf_id,
          function (ev) {
            // display sent time
            message.unreached = false
            message.sentTimeValue = +parseDate(ev.ltime)
            message.received_text_id = ev.text_id
            // clear typing
            if (_this.lastSentTypingTimeTable[chatKey]) {
              delete _this.lastSentTypingTimeTable[chatKey]
            }
            _this.render()
          },
          function (ev) {
            // display error
            _this.logger.log(
              'warn',
              'chatClient.sendConferenceText error code=' +
                ev.code +
                ', message=' +
                ev.message,
            )
            message.errorType = 'MSG_SEND_TEXT_ERROR'
            message.errorDetail = string(ev.message)
            _this.addSysmsgToList({
              chatKeys: [chatKey],
              sysmsgLevel: 'error',
              sysmsgType: 'MSG_SEND_TEXT_ERROR',
            })
            _this.render()
          },
        )
      }
    } else if (option.chatType === 'CHAT') {
      try {
        var buddy = JSON.parse(option.chatCode)
        // send
        this.chatClient.sendText(
          text,
          buddy,
          function (ev) {
            // display sent time
            message.unreached = false
            message.sentTimeValue = +parseDate(ev.ltime)
            message.received_text_id = ev.text_id
            message.topic_id = ev.topic_id
            // clear typing
            if (_this.lastSentTypingTimeTable[chatKey]) {
              delete _this.lastSentTypingTimeTable[chatKey]
            }
            _this.render()
          },
          function (ev) {
            // display error
            _this.logger.log(
              'warn',
              'chatClient.sendText error code=' +
                ev.code +
                ', message=' +
                ev.message,
            )
            message.errorType = 'MSG_SEND_TEXT_ERROR'
            message.errorDetail = string(ev.message)
            _this.addSysmsgToList({
              chatKeys: [chatKey],
              sysmsgLevel: 'error',
              sysmsgType: 'MSG_SEND_TEXT_ERROR',
            })
            _this.render()
          },
        )
      } catch (e) {
        // display error
        this.logger.log('warn', 'exception occurred in sendText exception=' + e)
        message.errorType = 'MSG_SEND_TEXT_ERROR'
        message.errorDetail = string(e)
        this.addSysmsgToList({
          chatKeys: [chatKey],
          sysmsgLevel: 'error',
          sysmsgType: 'MSG_SEND_TEXT_ERROR',
        })
        this.render()
      }
    } else {
      message.unreached = false
    }
    this.render()
  }
  //
  UcUiStore.prototype.createMessageFromReceivedText = function (m) {
    // message
    var chatKeys = []
    var fileProps = null
    if (m.ctype === Constants.CTYPE_FILE_REQUEST) {
      try {
        fileProps = JSON.parse(m.text)
      } catch (e) {}
    }
    var conference = this.chatClient.getConference(m.conf_id)
    var message = {
      chatKeys: chatKeys,
      senderInfo: {
        tenant: string(m && m.sender && m.sender.tenant),
        user_id: string(m && m.sender && m.sender.user_id),
      },
      ctype: int(m.ctype),
      messageText:
        m.ctype === Constants.CTYPE_TEXT ||
        m.ctype === Constants.CTYPE_CALL_RESULT
          ? string(m.text)
          : '',
      messageObject: m.object,
      errorType: '',
      errorDetail: '',
      messageFile: fileProps && {
        file_id: string(fileProps.file_id),
        name: string(fileProps.name),
        size: string(fileProps.size),
        receiverInfo: {
          tenant: string(fileProps.target && fileProps.target.tenant),
          user_id: string(fileProps.target && fileProps.target.user_id),
        },
        status: Constants.FILE_STATUS_UNPREPARED,
        progress: 0,
        inlineImage: {
          loading: false,
          url: '',
        },
        messageFileError: '',
      },
      received_text_id: string(m.received_text_id),
      topic_id: string(m.topic_id),
      conf_type: conference.conf_type,
      replyEnabled: true,
      unreached: false,
      messageExtInfo: {
        mailSubject: this.getMailSubject(conference),
      },
      sentTimeValue: +parseDate(m.sent_ltime),
    }
    if (m.conf_id === null) {
      // buddy
      chatKeys.push('CHAT' + '_' + JSON.stringify(message.senderInfo))
    } else {
      // conference
      chatKeys.push(this.getChatCodeByConfId({ conf_id: m.conf_id }).chatKey)
    }
    return message
  }
  //
  UcUiStore.prototype.getMailSubject = function (conference) {
    return (
      string(
        conference &&
          conference.conf_tags &&
          conference.conf_tags.filter &&
          conference.conf_tags
            .filter(function (tag) {
              return (
                tag &&
                ((tag.tag_type === '_webchatext' &&
                  tag.tag_key === 'subject') ||
                  (tag.tag_type === '_conftag' &&
                    tag.tag_key === '_outgoing_email_subject'))
              )
            })
            .sort(function (tag1, tag2) {
              return tag1.tstamp - tag2.tstamp
            })
            .map(function (tag) {
              return tag.tag_value
            })
            .pop(),
      ) ||
      // null : mailSubject has not been obtained yet
      // '' :   mailSubject will never be obtained
      (conference &&
      conference.conf_status !== Constants.CONF_STATUS_INACTIVE &&
      conference.conf_type === 'webchat'
        ? null
        : '')
    )
  }
  //
  UcUiStore.prototype.addSysmsgToList = function (option, indexToInsertTable) {
    var _this = this

    var chatKeys = (option && option.chatKeys) || []
    var sysmsg = {
      key: string(++this.keyCounter),
      type: 'sysmsg',
      sysmsgLevel: string(option && option.sysmsgLevel),
      sysmsgType: string(option && option.sysmsgType),
      buddy: option.buddy || { tenant: '', user_id: '' },
      sysmsgData: string(option && option.sysmsgData),
    }
    this.keyObjectTable[sysmsg.key] = sysmsg

    if (!indexToInsertTable) {
      indexToInsertTable = {}
    }

    chatKeys.forEach(function (chatKey) {
      if (!_this.chatTable[chatKey]) {
        _this.chatTable[chatKey] = _this.newChatTableEntry(chatKey)
      }
      var chatList = _this.chatTable[chatKey].chatList
      if (!indexToInsertTable[chatKey] && indexToInsertTable[chatKey] !== 0) {
        indexToInsertTable[chatKey] = chatList.length
      }
      chatList.splice(indexToInsertTable[chatKey]++, 0, sysmsg)
    })
  }
  //
  UcUiStore.prototype.addMessageToList = function (option, indexToInsertTable) {
    var _this = this

    var chatKeys = (option && option.chatKeys) || []
    var messageFile = (option && option.messageFile) || {} // do not clone option.messageFile (keep reference)
    messageFile.file_id = string(messageFile.file_id)
    messageFile.name = string(messageFile.name)
    messageFile.size = int(messageFile.size)
    messageFile.receiverInfo = messageFile.receiverInfo || {}
    messageFile.receiverInfo.tenant = string(messageFile.receiverInfo.tenant)
    messageFile.receiverInfo.user_id = string(messageFile.receiverInfo.user_id)
    messageFile.status = int(messageFile.status)
    messageFile.progress = int(messageFile.progress)
    messageFile.inlineImage = messageFile.inlineImage || {}
    messageFile.inlineImage.loading = Boolean(messageFile.inlineImage.loading)
    messageFile.inlineImage.url = string(messageFile.inlineImage.url)
    messageFile.messageFileError = string(messageFile.messageFileError)
    var message = {
      key: string(++this.keyCounter),
      senderInfo: {
        tenant: string(option && option.senderInfo && option.senderInfo.tenant),
        user_id: string(
          option && option.senderInfo && option.senderInfo.user_id,
        ),
      },
      ctype: int(option && option.ctype),
      messageText: string(option && option.messageText),
      messageObject: option ? option.messageObject : undefined,
      errorType: string(option && option.errorType),
      errorDetail: string(option && option.errorDetail),
      messageFile: messageFile,
      received_text_id: string(option && option.received_text_id),
      topic_id: string(option && option.topic_id),
      conf_type: string(option && option.conf_type),
      replyEnabled: Boolean(option && option.replyEnabled),
      isBroadcast: Boolean(option && option.isBroadcast),
      unreached: Boolean(option && option.unreached),
      messageExtInfo: (option && option.messageExtInfo) || {},
      sentTimeValue: int(option && option.sentTimeValue),
    }
    this.keyObjectTable[message.key] = message

    if (!indexToInsertTable) {
      indexToInsertTable = {}
    }

    var eventArgs = []
    chatKeys.forEach(function (chatKey) {
      if (!_this.chatTable[chatKey]) {
        _this.chatTable[chatKey] = _this.newChatTableEntry(chatKey)
      }
      var chatList = _this.chatTable[chatKey].chatList
      var existing = chatList.some(function (chat) {
        return (
          chat &&
          chat.messageList &&
          chat.messageList.some(function (mes) {
            return (
              mes &&
              mes.received_text_id &&
              mes.received_text_id === message.received_text_id
            )
          })
        )
      })
      if (!existing) {
        var paragraph = null
        var sameNameSameTime = false
        if (!indexToInsertTable[chatKey] && indexToInsertTable[chatKey] !== 0) {
          indexToInsertTable[chatKey] = chatList.length
        }
        var lastParagraph = chatList[indexToInsertTable[chatKey] - 1]
        if (lastParagraph && lastParagraph.messageList) {
          var lastMessage =
            lastParagraph.messageList[lastParagraph.messageList.length - 1]
          if (lastMessage) {
            var t = message.sentTimeValue - lastMessage.sentTimeValue
            if (
              message.senderInfo.tenant === lastMessage.senderInfo.tenant &&
              message.senderInfo.user_id === lastMessage.senderInfo.user_id &&
              0 <= t &&
              t <= 30000
            ) {
              sameNameSameTime = true
            }
          }
        }
        if (sameNameSameTime) {
          paragraph = lastParagraph
        } else {
          paragraph = {
            key: string(++_this.keyCounter),
            type: 'paragraph',
            messageList: [],
          }
          _this.keyObjectTable[paragraph.key] = paragraph
          chatList.splice(indexToInsertTable[chatKey]++, 0, paragraph)
        }
        paragraph.messageList.push(message)

        var messageClone = {}
        try {
          messageClone = JSON.parse(JSON.stringify(message))
        } catch (e) {}
        eventArgs.push({
          chatType: chatKey.substr(0, chatKey.indexOf('_')),
          chatCode: chatKey.substr(chatKey.indexOf('_') + 1),
          message: messageClone,
        })
      }
    })

    eventArgs.forEach(function (e) {
      _this.fire('newMessage', e)
    })

    return message
  }
  //
  UcUiStore.prototype.addShowmorelinkToList = function (
    option,
    indexToInsertTable,
  ) {
    var _this = this

    var chatKeys = (option && option.chatKeys) || []
    var key = string(++this.keyCounter)
    var showmorelink_id = key
    var showmorelink = {
      key: key,
      type: 'showmorelink',
      showmorelink_id: showmorelink_id,
      unread: Boolean(option && option.unread),
    }
    this.keyObjectTable[showmorelink.key] = showmorelink
    this.showmorelinkTable[showmorelink_id] = {
      chatKeys: chatKeys,
      key: key,
      unread: Boolean(option && option.unread),
      condition_tenant: string(option && option.condition_tenant),
      condition_user_id: string(option && option.condition_user_id),
      next: Boolean(option && option.next),
      isRelatedConference: Boolean(option && option.isRelatedConference),
      condition_conf_id: string(option && option.condition_conf_id),
      condition_yyyymm: string(option && option.condition_yyyymm),
      condition_tstamp: string(option && option.condition_tstamp),
      nowReceiving: false,
      tried: false,
      errorType: '',
      errorDetail: '',
    }

    if (!indexToInsertTable) {
      indexToInsertTable = {}
    }

    chatKeys.forEach(function (chatKey) {
      if (!_this.chatTable[chatKey]) {
        _this.chatTable[chatKey] = _this.newChatTableEntry(chatKey)
      }
      var chatList = _this.chatTable[chatKey].chatList
      if (!indexToInsertTable[chatKey] && indexToInsertTable[chatKey] !== 0) {
        indexToInsertTable[chatKey] = chatList.length
      }
      var oldIndex = indexToInsertTable[chatKey] - 1
      if (
        chatList[oldIndex] &&
        chatList[oldIndex].type === 'showmorelink' &&
        _this.showmorelinkTable[chatList[oldIndex].showmorelink_id] &&
        _this.showmorelinkTable[chatList[oldIndex].showmorelink_id].chatKeys
          .length === 1 &&
        _this.showmorelinkTable[chatList[oldIndex].showmorelink_id]
          .chatKeys[0] === chatKey
      ) {
        // replace old showmorelink
        delete _this.showmorelinkTable[chatList[oldIndex].showmorelink_id]
        chatList.splice(oldIndex, 1, showmorelink)
        indexToInsertTable[chatKey]++
      } else {
        chatList.splice(indexToInsertTable[chatKey]++, 0, showmorelink)
      }
    })
  }
  // receiveMore
  // option
  // option.showmorelink_id
  // option.begin
  UcUiStore.prototype.receiveMore = function (option) {
    var _this = this

    if (!option) {
      return
    }
    var showmorelinkEntry = this.showmorelinkTable[option.showmorelink_id]
    if (!showmorelinkEntry || showmorelinkEntry.nowReceiving) {
      return
    }
    if (showmorelinkEntry.unread) {
      // receive more unread texts
      var receiveUnreceivedFunction_funcOK =
        function receiveUnreceivedFunction_funcOK(ev) {
          // funcOK
          var messageList = ev.messages.map(
            _this.createMessageFromReceivedText.bind(_this),
          )
          var indexToInsertTable = {}
          delete _this.showmorelinkTable[option.showmorelink_id]
          // delete old show more link
          showmorelinkEntry.chatKeys.forEach(function (chatKey) {
            var index = _this.chatTable[chatKey].chatList.findIndex(
              function (p) {
                return p.key === showmorelinkEntry.key
              },
            )
            if (index !== -1) {
              _this.chatTable[chatKey].chatList.splice(index, 1)
              indexToInsertTable[chatKey] = index
            }
          })
          // add show more link
          if (ev.hasMore) {
            var newShowmorelinkChatKeys = {}
            messageList.forEach(function (message) {
              message.chatKeys.forEach(function (chatKey) {
                newShowmorelinkChatKeys[chatKey] = true
              })
            })
            var newShowmorelinkOption = {
              chatKeys: Object.keys(newShowmorelinkChatKeys),
              unread: true,
            }
            _this.addShowmorelinkToList(
              newShowmorelinkOption,
              indexToInsertTable,
            )
          } else {
            Object.keys(indexToInsertTable).forEach(function (chatKey) {
              if (indexToInsertTable[chatKey] === 0) {
                var chatType = chatKey.split('_')[0]
                var chatCode = chatKey.substr((chatType + '_').length)
                if (chatType === 'CHAT') {
                  if (
                    _this.chatClient.getBuddylist().user.some(function (u) {
                      return (
                        chatCode ===
                        JSON.stringify({ tenant: u.tenant, user_id: u.user_id })
                      )
                    })
                  ) {
                    _this.addShowmorelinkToList(
                      {
                        chatKeys: [chatKey],
                        unread: false,
                      },
                      indexToInsertTable,
                    )
                  }
                }
              }
            })
          }
          // add messages
          messageList.forEach(function (message) {
            // add to chat table
            _this.addMessageToList(message, indexToInsertTable)
          })
          // read text
          var toRead = ev.messages
            .filter(function (m) {
              return m.requires_read
            })
            .map(function (m) {
              return m.received_text_id
            })
          if (toRead.length > 0) {
            _this.chatClient.readText(toRead, null)
          }
          _this.render()
        }
      var receiveUnreceivedFunction_funcError = function (ev) {
        // funcError
        _this.logger.log(
          'warn',
          'receiveUnreceivedFunction_funcError code=' +
            ev.code +
            ', message=' +
            ev.message,
        )
        showmorelinkEntry.nowReceiving = false
        showmorelinkEntry.errorType = 'MSG_RECEIVE_MORE_UNREAD_TEXTS_FAILED'
        showmorelinkEntry.errorDetail = ev.message
        _this.render()
      }
      // start receiving
      showmorelinkEntry.nowReceiving = true
      showmorelinkEntry.tried = true
      showmorelinkEntry.errorType = ''
      showmorelinkEntry.errorDetail = ''
      this.chatClient.receiveUnreadText(
        receiveUnreceivedFunction_funcOK,
        receiveUnreceivedFunction_funcError,
      )
    } else if (!showmorelinkEntry.isRelatedConference) {
      // receive more already-read texts
      showmorelinkEntry.chatKeys.some(function (chatKey) {
        var chatType = chatKey.split('_')[0]
        var chatCode = chatKey.substr((chatType + '_').length)
        var condition = { max: UiConstants.SEARCH_PREV_NEXT_TEXTS_MAX + 1 }
        if (showmorelinkEntry.condition_user_id) {
          condition.tenant = string(showmorelinkEntry.condition_tenant)
          condition.user_id = string(showmorelinkEntry.condition_user_id)
        } else if (chatType === 'CHAT' || chatType === 'HISTORYDETAIL') {
          var buddy = undefined
          try {
            buddy = JSON.parse(chatCode)
          } catch (e) {
            _this.logger.log('warn', 'exception occurred exception=' + e)
          }
          if (!buddy) {
            return false
          }
          condition.tenant = buddy.tenant
          condition.user_id = buddy.user_id
        } else {
          return false
        }
        if (showmorelinkEntry.next) {
          var begin = null
          _this.chatTable[chatKey].chatList.some(function (chat) {
            if (
              chat &&
              chat.messageList &&
              chat.messageList[chat.messageList.length - 1] &&
              chat.messageList[chat.messageList.length - 1].sentTimeValue
            ) {
              begin =
                chat.messageList[chat.messageList.length - 1].sentTimeValue
              return false
            }
          })
          condition.begin = begin
          condition.asc = true
        } else {
          var end = null
          _this.chatTable[chatKey].chatList.some(function (chat) {
            if (
              chat &&
              chat.messageList &&
              chat.messageList[0] &&
              chat.messageList[0].sentTimeValue
            ) {
              end = chat.messageList[0].sentTimeValue
              return true
            }
          })
          condition.end = end
        }
        var doNotDelete = false
        if (option.begin && !showmorelinkEntry.tried) {
          doNotDelete = true
          condition.begin = Math.max(int(condition.begin), int(option.begin))
        }
        // start receiving
        showmorelinkEntry.nowReceiving = true
        showmorelinkEntry.tried = true
        showmorelinkEntry.errorType = ''
        showmorelinkEntry.errorDetail = ''
        _this.chatClient.searchTexts(
          condition,
          function (ev) {
            // funcOK
            if (!_this.chatTable[chatKey]) {
              _this.logger.log(
                'info',
                'already destroyed chatTable[' +
                  chatKey +
                  '] after chatClient.searchTexts',
              )
              return
            }
            var messageList = ev.logs.map(function (log) {
              var messageFile = null
              if (log.ctype === Constants.CTYPE_FILE_REQUEST) {
                try {
                  messageFile = JSON.parse(log.content)
                  messageFile.receiverInfo = messageFile.target
                } catch (e) {}
              }
              return {
                chatKeys: [chatKey],
                senderInfo: log.sender,
                ctype: log.ctype,
                messageText:
                  log.ctype === Constants.CTYPE_TEXT ||
                  log.ctype === Constants.CTYPE_CALL_RESULT
                    ? string(log.content)
                    : '',
                messageObject: log.object,
                errorType: '',
                errorDetail: '',
                messageFile: messageFile,
                received_text_id: log.log_id,
                topic_id: log.topic_id,
                conf_type: '',
                replyEnabled: false,
                unreached: false,
                messageExtInfo: {
                  mailSubject: _this.getMailSubject(),
                },
                sentTimeValue: +parseDate(log.ltime),
              }
            })
            if (!showmorelinkEntry.next) {
              messageList.reverse()
            }
            var indexToInsertTable = {}
            var mustIncrementIndex = false
            if (messageList.length > UiConstants.SEARCH_PREV_NEXT_TEXTS_MAX) {
              // has more
              showmorelinkEntry.nowReceiving = false
              if (showmorelinkEntry.next) {
                messageList.pop()
                indexToInsertTable[chatKey] =
                  _this.chatTable[chatKey].chatList.length - 1
              } else {
                messageList.shift()
                indexToInsertTable[chatKey] = 1
              }
            } else if (doNotDelete) {
              // might has more
              showmorelinkEntry.nowReceiving = false
              if (showmorelinkEntry.next) {
                indexToInsertTable[chatKey] =
                  _this.chatTable[chatKey].chatList.length - 1
              } else {
                indexToInsertTable[chatKey] = 1
              }
            } else {
              // no more
              delete _this.showmorelinkTable[option.showmorelink_id]
              if (showmorelinkEntry.next) {
                _this.chatTable[chatKey].chatList.pop()
                indexToInsertTable[chatKey] = null
              } else {
                _this.chatTable[chatKey].chatList.shift()
                indexToInsertTable[chatKey] = 0
              }
            }
            // add messages
            messageList.forEach(function (message) {
              // add to chat table
              _this.addMessageToList(message, indexToInsertTable)
            })
            _this.render()
          },
          function (ev) {
            // funcError
            _this.logger.log(
              'warn',
              'chatClient.searchTexts error code=' +
                ev.code +
                ', message=' +
                ev.message,
            )
            showmorelinkEntry.nowReceiving = false
            showmorelinkEntry.errorType = 'MSG_RECEIVE_MORE_TEXTS_FAILED'
            showmorelinkEntry.errorDetail = ev.message
            _this.render()
          },
        )
        return true
      })
    } else {
      // receive more related conference
      showmorelinkEntry.chatKeys.some(function (chatKey) {
        var chatType = chatKey.split('_')[0]
        var chatCode = chatKey.substr((chatType + '_').length)
        var condition = {
          conf_id: showmorelinkEntry.condition_conf_id,
          yyyymm: showmorelinkEntry.condition_yyyymm,
        }
        if (showmorelinkEntry.next) {
          condition.begin = showmorelinkEntry.condition_tstamp
          condition.asc = true
        } else {
          condition.end = showmorelinkEntry.condition_tstamp
          condition.asc = false
        }
        // start receiving
        showmorelinkEntry.nowReceiving = true
        showmorelinkEntry.tried = true
        showmorelinkEntry.errorType = ''
        showmorelinkEntry.errorDetail = ''
        _this.chatClient.searchRelatedConferenceTexts(
          condition,
          function (ev) {
            // funcOK
            if (!_this.chatTable[chatKey]) {
              _this.logger.log(
                'info',
                'already destroyed chatTable[' +
                  chatKey +
                  '] after chatClient.searchRelatedConferenceTexts',
              )
              return
            }
            var messageList = ev.logs.map(function (log) {
              var messageFile = null
              if (log.ctype === Constants.CTYPE_FILE_REQUEST) {
                try {
                  messageFile = JSON.parse(log.content)
                  messageFile.receiverInfo = messageFile.target
                } catch (e) {}
              }
              return {
                chatKeys: [chatKey],
                senderInfo: log.sender,
                ctype: log.ctype,
                messageText:
                  log.ctype === Constants.CTYPE_TEXT ||
                  log.ctype === Constants.CTYPE_CALL_RESULT
                    ? string(log.content)
                    : '',
                messageObject: log.object,
                errorType: '',
                errorDetail: '',
                messageFile: messageFile,
                received_text_id: log.log_id,
                topic_id: log.topic_id,
                conf_type: '',
                replyEnabled: false,
                unreached: false,
                messageExtInfo: {
                  mailSubject: _this.getMailSubject(),
                },
                sentTimeValue: +parseDate(log.ltime),
              }
            })
            var indexToInsertTable = {}
            var mustIncrementIndex = false
            if (
              ev.conference &&
              ev.conference.conf_id &&
              (showmorelinkEntry.next || !ev.conference.relation_origin_tag_key)
            ) {
              // might has more
              showmorelinkEntry.nowReceiving = false
              showmorelinkEntry.condition_conf_id = ev.conference.conf_id
              showmorelinkEntry.condition_yyyymm = ev.conference.yyyymm
              showmorelinkEntry.condition_tstamp = ev.conference.tstamp
              if (showmorelinkEntry.next) {
                indexToInsertTable[chatKey] =
                  _this.chatTable[chatKey].chatList.length - 1
              } else {
                indexToInsertTable[chatKey] = 1
              }
            } else {
              // no more
              delete _this.showmorelinkTable[option.showmorelink_id]
              if (showmorelinkEntry.next) {
                _this.chatTable[chatKey].chatList.pop()
                indexToInsertTable[chatKey] = null
              } else {
                _this.chatTable[chatKey].chatList.shift()
                indexToInsertTable[chatKey] = 0
              }
            }
            // add messages
            messageList.forEach(function (message) {
              // add to chat table
              _this.addMessageToList(message, indexToInsertTable)
            })
            _this.render()
          },
          function (ev) {
            // funcError
            _this.logger.log(
              'warn',
              'chatClient.searchRelatedConferenceTexts error code=' +
                ev.code +
                ', message=' +
                ev.message,
            )
            showmorelinkEntry.nowReceiving = false
            showmorelinkEntry.errorType = 'MSG_RECEIVE_MORE_TEXTS_FAILED'
            showmorelinkEntry.errorDetail = ev.message
            _this.render()
          },
        )
        return true
      })
    }
  }
  //
  UcUiStore.prototype.newChatTableEntry = function (chatKey) {
    var chatType = chatKey.split('_')[0]
    var chatCode = chatKey.substr((chatType + '_').length)
    var profile = this.chatClient.getProfile()
    if (chatType === 'CHAT') {
      var buddy
      try {
        buddy = JSON.parse(chatCode)
      } catch (e) {
        this.logger.log('warn', 'exception occurred exception=' + e)
        buddy = {}
      }
      return {
        chatType: chatType,
        chatCode: chatCode,
        chatList: [],
        memberList: [
          {
            tenant: profile.tenant,
            user_id: profile.user_id,
          },
          {
            tenant: buddy.tenant,
            user_id: buddy.user_id,
          },
        ],
        typingBuddy: {},
      }
    } else {
      return {
        chatType: chatType,
        chatCode: chatCode,
        chatList: [],
        memberList: [],
        typingBuddy: {},
      }
    }
  }
  // changeMessageText
  // option
  // option.key
  // option.messageText
  UcUiStore.prototype.changeMessageText = function (option) {
    if (!option) {
      return
    }
    var message = this.keyObjectTable[option.key]
    if (!message) {
      return
    }
    message.messageText = string(option.messageText)
    this.render()
  }

  // sendBroadcastText
  // option
  // option.target
  // option.text
  // option.isRichText
  UcUiStore.prototype.sendBroadcastText = function (option) {
    var _this = this

    if (!option || !option.target || !option.target.length) {
      return
    }
    var text = option.isRichText ? option.text : escapeHTML(option.text)
    var chatKeys = option.target.map(function (t) {
      return (
        'CHAT' +
        '_' +
        JSON.stringify({ tenant: string(t.tenant), user_id: string(t.user_id) })
      )
    })

    if (text.length > UiConstants.CHAT_CONTENT_SIZE) {
      this.logger.log('warn', 'message too long length=' + text.length)
      this.addSysmsgToList({
        chatKeys: chatKeys,
        sysmsgLevel: 'error',
        sysmsgType: 'MSG_TOO_LONG',
      })
      this.render()
      return
    }

    // display message
    var message = this.addMessageToList({
      chatKeys: chatKeys,
      senderInfo: this.chatClient.getProfile(),
      ctype: Constants.CTYPE_TEXT,
      messageText: text,
      messageObject: undefined,
      errorType: '',
      errorDetail: '',
      messageFile: null,
      received_text_id: '',
      topic_id: '',
      conf_type: '',
      replyEnabled: false,
      isBroadcast: true,
      unreached: true,
      messageExtInfo: {
        mailSubject: this.getMailSubject(),
      },
      sentTimeValue: +new Date(),
    })

    // send
    try {
      this.chatClient.sendBroadcastText(
        text,
        option.target,
        function (ev) {
          // display sent time
          message.unreached = false
          message.sentTimeValue = +parseDate(ev.ltime)
          message.received_text_id = ev.text_id
          if (!_this.skipDummyTopicIdBroadcast) {
            message.topic_id = string(((ev.topic_ids || [])[0] || {}).topic_id) // dummy
          }
          _this.render()
        },
        function (ev) {
          // display error
          _this.logger.log(
            'warn',
            'chatClient.sendBroadcastText error code=' +
              ev.code +
              ', message=' +
              ev.message,
          )
          message.errorType = 'MSG_SEND_TEXT_ERROR'
          message.errorDetail = string(ev.message)
          _this.addSysmsgToList({
            chatKeys: chatKeys,
            sysmsgLevel: 'error',
            sysmsgType: 'MSG_SEND_TEXT_ERROR',
          })
          _this.render()
        },
      )
    } catch (e) {
      // display error
      this.logger.log(
        'warn',
        'exception occurred in sendBroadcastText exception=' + e,
      )
      message.errorType = 'MSG_SEND_TEXT_ERROR'
      message.errorDetail = string(e)
      this.addSysmsgToList({
        chatKeys: chatKeys,
        sysmsgLevel: 'error',
        sysmsgType: 'MSG_SEND_TEXT_ERROR',
      })
      this.render()
    }
    this.render()
  }

  // sendTyping
  // option
  // option.chatType
  // option.chatCode
  UcUiStore.prototype.sendTyping = function (option) {
    var _this = this

    if (!option) {
      return
    }
    var chatKey = option.chatType + '_' + option.chatCode
    var conf_id = this.getChatHeaderInfo(option).conf_id

    var now = new Date().getTime()
    if (
      !this.lastSentTypingTimeTable[chatKey] ||
      now >=
        this.lastSentTypingTimeTable[chatKey] + UiConstants.SEND_TYPING_INTERVAL
    ) {
      this.lastSentTypingTimeTable[chatKey] = now

      if (option.chatType === 'CONFERENCE') {
        var profile = this.chatClient.getProfile()
        var conference = this.chatClient.getConference(conf_id)
        if (conference.conf_status === Constants.CONF_STATUS_JOINED) {
          conference.user.forEach(function (u) {
            if (u.conf_status === Constants.CONF_STATUS_JOINED) {
              if (
                u.tenant !== profile.tenant ||
                u.user_id !== profile.user_id
              ) {
                _this.chatClient.sendTyping(u, null, function (e) {
                  return _this.logger.log(
                    'warn',
                    'chatClient.sendTyping error code=' +
                      e.code +
                      ', message=' +
                      e.message,
                  )
                })
              }
            }
          })
        }
      } else if (option.chatType === 'CHAT') {
        try {
          var buddy = JSON.parse(option.chatCode)
          this.chatClient.sendTyping(buddy, null, function (e) {
            return _this.logger.log(
              'warn',
              'chatClient.sendTyping error code=' +
                e.code +
                ', message=' +
                e.message,
            )
          })
        } catch (e) {
          this.logger.log(
            'warn',
            'exception occurred in sendTyping exception=' + e,
          )
        }
      }
    }
  }

  // sendCustomClientEvent
  // option
  // option.chatType
  // option.chatCode
  // option.client_param
  // option.sysmsg
  UcUiStore.prototype.sendCustomClientEvent = function (option) {
    var _this = this

    if (!option) {
      return
    }
    var chatKey = option.chatType + '_' + option.chatCode
    var conf_id = this.getChatHeaderInfo(option).conf_id

    if (option.chatType === 'CONFERENCE') {
      var profile = this.chatClient.getProfile()
      var conference = this.chatClient.getConference(conf_id)
      if (conference.conf_status === Constants.CONF_STATUS_JOINED) {
        var client_param = option.client_param
        if (client_param && typeof client_param.conf_id === 'undefined') {
          client_param = Object.assign({}, client_param)
          client_param.conf_id = conf_id
        }
        conference.user.forEach(function (u) {
          if (u.conf_status === Constants.CONF_STATUS_JOINED) {
            if (u.tenant !== profile.tenant || u.user_id !== profile.user_id) {
              _this.chatClient.sendCustomClientEvent(
                u,
                client_param,
                null,
                function (e) {
                  return _this.logger.log(
                    'warn',
                    'chatClient.sendCustomClientEvent error code=' +
                      e.code +
                      ', message=' +
                      e.message,
                  )
                },
              )
            }
          }
        })
      }
    } else if (option.chatType === 'CHAT') {
      try {
        var buddy = JSON.parse(option.chatCode)
        this.chatClient.sendCustomClientEvent(
          buddy,
          option.client_param,
          null,
          function (e) {
            return _this.logger.log(
              'warn',
              'chatClient.sendCustomClientEvent error code=' +
                e.code +
                ', message=' +
                e.message,
            )
          },
        )
      } catch (e) {
        this.logger.log(
          'warn',
          'exception occurred in sendCustomClientEvent exception=' + e,
        )
      }
    }

    var sysmsg =
      typeof option.sysmsg !== 'undefined'
        ? option.sysmsg
        : { sysmsgLevel: 'info', sysmsgType: 'sysSendCustomClientEvent' }
    if (sysmsg) {
      this.addSysmsgChat({
        chatType: option.chatType,
        chatCode: option.chatCode,
        sysmsg: sysmsg,
      })
    }
  }

  // sendFiles
  // option
  // option.chatType
  // option.chatCode
  // option.files
  UcUiStore.prototype.sendFiles = function (option) {
    var _this = this

    if (!option) {
      return
    }
    var chatKey = option.chatType + '_' + option.chatCode
    var conf_id = this.getChatHeaderInfo(option).conf_id
    if (!option.files || !option.files.length) {
      // display error
      this.logger.log('warn', 'empty files')
      this.addSysmsgToList({
        chatKeys: [chatKey],
        sysmsgLevel: 'error',
        sysmsgType: 'MSG_SEND_FILE_ERROR',
      })
      this.render()
      return
    }
    var profile = this.chatClient.getProfile()
    var settings = this.chatClient.getSettings()

    // determine target
    var target = null
    var conference = null
    if (option.chatType === 'CONFERENCE') {
      conference = this.chatClient.getConference(conf_id)
      var memberList = conference.user
      if (
        conference.conf_status === Constants.CONF_STATUS_JOINED &&
        memberList.length >= 2
      ) {
        //// except me
        //for (var i = 0; i < memberList.length; i++) {
        //    if (memberList[i].tenant === profile.tenant && memberList[i].user_id === profile.user_id) {
        //        memberList.splice(i, 1);
        //        break;
        //    }
        //}
        //// to guest if exists
        //if (conference.conf_type === 'webchat' && memberList.some(function (member) {
        //    return member.tenant === conference.creator.tenant && member.user_id === conference.creator.user_id;
        //})) {
        //    target = {
        //        tenant: conference.creator.tenant,
        //        user_id: conference.creator.user_id,
        //        conf_id: conf_id
        //    };
        //}
        //// to agent who most recently spoke
        //if (!target) {
        //    var chatList = this.chatTable[chatKey] && this.chatTable[chatKey].chatList || [];
        //    for (var _i = chatList.length - 1; _i >= 0; _i--) {
        //        var chat = chatList[_i];
        //        if (chat && chat.type === 'paragraph' && chat.messageList && chat.messageList[0] && chat.messageList[0].senderInfo) {
        //            var senderInfo = chat.messageList[0].senderInfo;
        //            if (memberList.some(function (member) {
        //                return member.tenant === senderInfo.tenant && member.user_id === senderInfo.user_id;
        //            })) {
        //                target = {
        //                    tenant: senderInfo.tenant,
        //                    user_id: senderInfo.user_id,
        //                    conf_id: conf_id
        //                };
        //                break;
        //            }
        //        }
        //    }
        //}
        //// to the first agent if no one spoke
        //if (!target) {
        //    target = {
        //        tenant: memberList[0].tenant,
        //        user_id: memberList[0].user_id,
        //        conf_id: conf_id
        //    };
        //}
        target = { conf_id: conf_id }
      } else {
        this.logger.log(
          'warn',
          'cannot send files to this conference conf_id=' +
            conf_id +
            ', conference.conf_status=' +
            conference.conf_status +
            ', memberList.length=' +
            memberList.length,
        )
      }
    } else if (option.chatType === 'CHAT') {
      try {
        target = JSON.parse(option.chatCode)
      } catch (ex) {
        this.logger.log(
          'warn',
          'JSON.parse error text=' + option.chatCode + ', ex=' + ex,
        )
      }
    }
    if (!target) {
      // display error
      this.logger.log('warn', 'empty target')
      this.addSysmsgToList({
        chatKeys: [chatKey],
        sysmsgLevel: 'error',
        sysmsgType: 'MSG_SEND_FILE_ERROR',
      })
      this.render()
      return
    }

    // display message for each file
    var messageFiles = []
    var messages = []
    Array.prototype.forEach.call(option.files, function (f, i) {
      var name = string(f && f.name)
      var size = int(f && f.size)
      // create message file info
      messageFiles[i] = {
        file_id: '',
        name: name,
        size: size,
        receiverInfo: {
          tenant: string(target.tenant),
          user_id: string(target.user_id),
        },
        status: Constants.FILE_STATUS_UNACCEPTED,
        progress: 0,
        inlineImage: {
          loading: false,
          url: '',
        },
        messageFileError: '',
      }
      // inline image
      if (size > 0) {
        var ext = name.substr(name.lastIndexOf('.') + 1).toLowerCase()
        if (
          ext === 'png' ||
          ext === 'jpg' ||
          ext === 'jpeg' ||
          ext === 'gif' ||
          ext === 'bmp'
        ) {
          if (
            !(
              settings.optional_settings &&
              settings.optional_settings.image_file_transfer === 'file'
            ) &&
            typeof Blob !== 'undefined' &&
            typeof URL !== 'undefined'
          ) {
            // create objectURL of inline image
            _this.objectURLList.push(
              (messageFiles[i].inlineImage.url = URL.createObjectURL(f)),
            )
          }
        }
      }
      // display message
      messages[i] = _this.addMessageToList({
        chatKeys: [chatKey],
        senderInfo: profile,
        ctype: Constants.CTYPE_FILE_REQUEST,
        messageText: '',
        messageObject: undefined,
        errorType: '',
        errorDetail: '',
        messageFile: messageFiles[i],
        received_text_id: '',
        topic_id: '',
        conf_type: string(conference && conference.conf_type),
        replyEnabled: false,
        unreached: true,
        messageExtInfo: {
          mailSubject: _this.getMailSubject(conference),
        },
        sentTimeValue: +new Date(),
      })
    })

    // send files
    this.chatClient.sendFiles(
      target,
      option.files,
      function (ev) {
        ev.infoList.forEach(function (info, i) {
          // change message file info
          messageFiles[i].file_id = info.fileInfo.file_id
          messageFiles[i].status = info.fileInfo.status
          messageFiles[i].progress = info.fileInfo.progress
          if (info.fileInfos && info.fileInfos.length >= 2) {
            messageFiles[i].multiReceiversInfo = []
            info.fileInfos.forEach(function (fileInfo) {
              messageFiles[i].multiReceiversInfo.push({
                tenant: string(fileInfo.target && fileInfo.target.tenant),
                user_id: string(fileInfo.target && fileInfo.target.user_id),
                file_id: string(fileInfo.file_id),
                status: int(fileInfo.status),
                progress: int(fileInfo.progress),
              })
              // save message file info
              _this.activeMessageFileTable[fileInfo.file_id] = messageFiles[i]
            })
          } else {
            // save message file info
            _this.activeMessageFileTable[info.fileInfo.file_id] =
              messageFiles[i]
          }
          // display sent time
          messages[i].unreached = false
          messages[i].sentTimeValue = +parseDate(info.ltime)
          messages[i].received_text_id = info.text_id
          messages[i].topic_id = info.topic_id
        })
        _this.render()
      },
      function (ev) {
        // display error
        _this.logger.log(
          'warn',
          'chatClient.sendFiles error code=' +
            ev.code +
            ', message=' +
            ev.message,
        )
        messages.forEach(function (message) {
          message.errorType = 'MSG_SEND_FILE_ERROR'
          message.errorDetail = string(ev.message)
        })
        _this.addSysmsgToList({
          chatKeys: [chatKey],
          sysmsgLevel: 'error',
          sysmsgType: 'MSG_SEND_FILE_ERROR',
        })
        _this.render()
      },
    )
  }

  // acceptFile
  // option
  // option.file_id
  // option.form
  UcUiStore.prototype.acceptFile = function (option) {
    var _this = this

    if (!option) {
      return
    }
    this.chatClient.acceptFile(option.file_id, option.form, function (ev) {
      // error
      _this.logger.log(
        'warn',
        'chatClient.acceptFile error code=' +
          ev.code +
          ', message=' +
          ev.message,
      )
      if (_this.activeMessageFileTable[option.file_id]) {
        _this.activeMessageFileTable[option.file_id].messageFileError = string(
          ev.message,
        )
      }
      _this.render()
    })
  }

  // sendCallResult
  // option
  // option.chatType
  // option.chatCode
  // option.text
  UcUiStore.prototype.sendCallResult = function (option) {
    var _this = this

    if (!option) {
      return
    }
    var text = string(option.text)
    var chatKey = option.chatType + '_' + option.chatCode
    var conf_id = this.getChatHeaderInfo(option).conf_id

    if (text.length > UiConstants.CHAT_CONTENT_SIZE) {
      this.logger.log('warn', 'message too long length=' + text.length)
      this.addSysmsgToList({
        chatKeys: [chatKey],
        sysmsgLevel: 'error',
        sysmsgType: 'MSG_TOO_LONG',
      })
      this.render()
      return
    }

    // display message
    var conference = null
    if (option.chatType === 'CONFERENCE') {
      conference = this.chatClient.getConference(conf_id)
    }
    var message = this.addMessageToList({
      chatKeys: [chatKey],
      senderInfo: this.chatClient.getProfile(),
      ctype: Constants.CTYPE_CALL_RESULT,
      messageText: text,
      messageObject: undefined,
      errorType: '',
      errorDetail: '',
      messageFile: null,
      received_text_id: '',
      topic_id: '',
      conf_type: string(conference && conference.conf_type),
      replyEnabled: false,
      unreached: true,
      messageExtInfo: {
        mailSubject: this.getMailSubject(conference),
      },
      sentTimeValue: +new Date(),
    })

    if (option.chatType === 'CONFERENCE') {
      // send
      this.chatClient.sendCallResult(
        { conf_id: conf_id },
        text,
        function (ev) {
          // display sent time
          message.unreached = false
          message.sentTimeValue = +parseDate(ev.ltime)
          // clear typing
          if (_this.lastSentTypingTimeTable[chatKey]) {
            delete _this.lastSentTypingTimeTable[chatKey]
          }
          _this.render()
        },
        function (ev) {
          // display error
          _this.logger.log(
            'warn',
            'chatClient.sendCallResult error code=' +
              ev.code +
              ', message=' +
              ev.message,
          )
          message.errorType = 'MSG_SEND_TEXT_ERROR'
          message.errorDetail = string(ev.message)
          _this.addSysmsgToList({
            chatKeys: [chatKey],
            sysmsgLevel: 'error',
            sysmsgType: 'MSG_SEND_TEXT_ERROR',
          })
          _this.render()
        },
      )
    } else if (option.chatType === 'CHAT') {
      try {
        var buddy = JSON.parse(option.chatCode)
        // send
        this.chatClient.sendCallResult(
          buddy,
          text,
          function (ev) {
            // display sent time
            message.unreached = false
            message.sentTimeValue = +parseDate(ev.ltime)
            message.received_text_id = ev.text_id
            message.topic_id = ev.topic_id
            // clear typing
            if (_this.lastSentTypingTimeTable[chatKey]) {
              delete _this.lastSentTypingTimeTable[chatKey]
            }
            _this.render()
          },
          function (ev) {
            // display error
            _this.logger.log(
              'warn',
              'chatClient.sendCallResult error code=' +
                ev.code +
                ', message=' +
                ev.message,
            )
            message.errorType = 'MSG_SEND_TEXT_ERROR'
            message.errorDetail = string(ev.message)
            _this.addSysmsgToList({
              chatKeys: [chatKey],
              sysmsgLevel: 'error',
              sysmsgType: 'MSG_SEND_TEXT_ERROR',
            })
            _this.render()
          },
        )
      } catch (e) {
        // display error
        this.logger.log(
          'warn',
          'exception occurred in sendCallResult exception=' + e,
        )
        message.errorType = 'MSG_SEND_TEXT_ERROR'
        message.errorDetail = string(e)
        this.addSysmsgToList({
          chatKeys: [chatKey],
          sysmsgLevel: 'error',
          sysmsgType: 'MSG_SEND_TEXT_ERROR',
        })
        this.render()
      }
    } else {
      message.unreached = false
    }
    this.render()
  }

  // sendObject
  // option
  // option.chatType
  // option.chatCode
  // option.object
  UcUiStore.prototype.sendObject = function (option) {
    var _this = this

    if (!option) {
      return
    }
    var chatKey = option.chatType + '_' + option.chatCode
    var conf_id = this.getChatHeaderInfo(option).conf_id

    // display message
    var conference = null
    if (option.chatType === 'CONFERENCE') {
      conference = this.chatClient.getConference(conf_id)
    }
    var message = this.addMessageToList({
      chatKeys: [chatKey],
      senderInfo: this.chatClient.getProfile(),
      ctype: Constants.CTYPE_OBJECT,
      messageText: '',
      messageObject: option.object,
      errorType: '',
      errorDetail: '',
      messageFile: null,
      received_text_id: '',
      topic_id: '',
      conf_type: string(conference && conference.conf_type),
      replyEnabled: false,
      unreached: true,
      messageExtInfo: {
        mailSubject: this.getMailSubject(conference),
      },
      sentTimeValue: +new Date(),
    })

    if (option.chatType === 'CONFERENCE') {
      // send
      this.chatClient.sendObject(
        { conf_id: conf_id },
        option.object,
        function (ev) {
          // display sent time
          message.unreached = false
          message.sentTimeValue = +parseDate(ev.ltime)
          // clear typing
          if (_this.lastSentTypingTimeTable[chatKey]) {
            delete _this.lastSentTypingTimeTable[chatKey]
          }
          _this.render()
        },
        function (ev) {
          // display error
          _this.logger.log(
            'warn',
            'chatClient.sendObject error code=' +
              ev.code +
              ', message=' +
              ev.message,
          )
          message.errorType = 'MSG_SEND_TEXT_ERROR'
          message.errorDetail = string(ev.message)
          _this.addSysmsgToList({
            chatKeys: [chatKey],
            sysmsgLevel: 'error',
            sysmsgType: 'MSG_SEND_TEXT_ERROR',
          })
          _this.render()
        },
      )
    } else if (option.chatType === 'CHAT') {
      try {
        var buddy = JSON.parse(option.chatCode)
        // send
        this.chatClient.sendObject(
          buddy,
          option.object,
          function (ev) {
            // display sent time
            message.unreached = false
            message.sentTimeValue = +parseDate(ev.ltime)
            message.received_text_id = ev.text_id
            message.topic_id = ev.topic_id
            // clear typing
            if (_this.lastSentTypingTimeTable[chatKey]) {
              delete _this.lastSentTypingTimeTable[chatKey]
            }
            _this.render()
          },
          function (ev) {
            // display error
            _this.logger.log(
              'warn',
              'chatClient.sendObject error code=' +
                ev.code +
                ', message=' +
                ev.message,
            )
            message.errorType = 'MSG_SEND_TEXT_ERROR'
            message.errorDetail = string(ev.message)
            _this.addSysmsgToList({
              chatKeys: [chatKey],
              sysmsgLevel: 'error',
              sysmsgType: 'MSG_SEND_TEXT_ERROR',
            })
            _this.render()
          },
        )
      } catch (e) {
        // display error
        this.logger.log(
          'warn',
          'exception occurred in sendObject exception=' + e,
        )
        message.errorType = 'MSG_SEND_TEXT_ERROR'
        message.errorDetail = string(e)
        this.addSysmsgToList({
          chatKeys: [chatKey],
          sysmsgLevel: 'error',
          sysmsgType: 'MSG_SEND_TEXT_ERROR',
        })
        this.render()
      }
    } else {
      message.unreached = false
    }
    this.render()
  }

  // addSysmsgChat
  // option
  // option.chatType
  // option.chatCode
  // option.sysmsg
  UcUiStore.prototype.addSysmsgChat = function (option) {
    option &&
      this.addSysmsgToList({
        chatKeys: [option.chatType + '_' + option.chatCode],
        sysmsgLevel: string(option.sysmsg && option.sysmsg.sysmsgLevel),
        sysmsgType: string(option.sysmsg && option.sysmsg.sysmsgType),
        buddy: string(option.sysmsg && option.sysmsg.buddy),
        sysmsgData: string(option.sysmsg && option.sysmsg.sysmsgData),
      })
    this.render()
  }

  /**
   * getLogger function
   */
  UcUiStore.prototype.getLogger = function () {
    return this.logger
  }

  /**
   * getChatClient function
   */
  UcUiStore.prototype.getChatClient = function () {
    return this.chatClient
  }

  /**
   * getSignInStatus function
   */
  UcUiStore.prototype.getSignInStatus = function () {
    return this.signInStatus
  }

  /**
   * getSignInOption function
   */
  UcUiStore.prototype.getSignInOption = function () {
    return JSON.parse(JSON.stringify(this.signInOption))
  }

  /**
   * getLastStatus function
   */
  UcUiStore.prototype.getLastStatus = function () {
    return JSON.parse(JSON.stringify(this.lastStatus))
  }

  /**
   * getLastSignOutReason function
   */
  UcUiStore.prototype.getLastSignOutReason = function () {
    return JSON.parse(JSON.stringify(this.lastSignOutReason))
  }

  /**
   * getGuestConfId function
   */
  UcUiStore.prototype.getGuestConfId = function () {
    return this.guest_conf_id
  }

  /**
   * getReenterUserId function
   */
  UcUiStore.prototype.getReenterUserId = function () {
    return this.reenter_user_id
  }

  /**
   * getBuddyTable function
   */
  UcUiStore.prototype.getBuddyTable = function () {
    return JSON.parse(JSON.stringify(this.buddyTable))
  }

  /**
   * getWebchatQueueList function
   */
  UcUiStore.prototype.getWebchatQueueList = function () {
    return this.webchatQueueList.map(this.getWebchatQueue.bind(this))
  }

  /**
   * getWebchatQueue function
   * option
   * option.conf_id
   */
  UcUiStore.prototype.getWebchatQueue = function (option) {
    var _this = this
    var webchatQueue = option || {}
    if (this.webchatQueueList.indexOf(webchatQueue) === -1) {
      webchatQueue = this.webchatQueueList.find(function (q) {
        return q.conf_id === webchatQueue.conf_id
      })
    }
    var conference = this.chatClient.getConference(
      webchatQueue && webchatQueue.conf_id,
    )
    if (
      conference.conf_status === Constants.CONF_STATUS_INACTIVE &&
      webchatQueue
    ) {
      webchatQueue.conf_status = Constants.CONF_STATUS_INACTIVE
      webchatQueue.from.conf_status = Constants.CONF_STATUS_INACTIVE
      webchatQueue.creator.conf_status = Constants.CONF_STATUS_INACTIVE
      webchatQueue.assigned.conf_status = Constants.CONF_STATUS_INACTIVE
    } else {
      conference.messageList = (webchatQueue && webchatQueue.messageList) || []
      conference.baseTime = (webchatQueue && webchatQueue.baseTime) || 0
      webchatQueue = conference
    }
    webchatQueue = JSON.parse(JSON.stringify(webchatQueue))
    webchatQueue.isTalking =
      conference.conf_status === Constants.CONF_STATUS_JOINED &&
      (conference.creator.conf_status === Constants.CONF_STATUS_JOINED ||
        conference.user.some(function (u) {
          return (
            u.conf_status === Constants.CONF_STATUS_JOINED &&
            _this.buddyTable[u.tenant] &&
            _this.buddyTable[u.tenant][u.user_id] &&
            _this.buddyTable[u.tenant][u.user_id].isTemporaryBuddy
          )
        }))
    return webchatQueue
  }

  /**
   * getChatTable function
   */
  UcUiStore.prototype.getChatTable = function () {
    var _this = this
    var table = {}
    Object.keys(this.chatTable).forEach(function (chatKey) {
      table[chatKey] = {
        chatType: _this.chatTable[chatKey].chatType,
        chatCode: _this.chatTable[chatKey].chatCode,
      }
    })
    return table
  }

  /**
   * getChatList function
   * option
   * option.chatType
   * option.chatCode
   */
  UcUiStore.prototype.getChatList = function (option) {
    if (!option) {
      return []
    }
    var chatKey = option.chatType + '_' + option.chatCode
    var chatTableEntry = this.chatTable[chatKey]
    return (
      (chatTableEntry && JSON.parse(JSON.stringify(chatTableEntry.chatList))) ||
      []
    )
  }

  /**
   * getMemberList function
   * option
   * option.chatType
   * option.chatCode
   */
  UcUiStore.prototype.getMemberList = function (option) {
    if (!option) {
      return []
    }
    var chatKey = option.chatType + '_' + option.chatCode
    var chatTableEntry = this.chatTable[chatKey]
    return (
      (chatTableEntry &&
        JSON.parse(JSON.stringify(chatTableEntry.memberList))) ||
      []
    )
  }

  /**
   * getTypingBuddy function
   * option
   * option.chatType
   * option.chatCode
   */
  UcUiStore.prototype.getTypingBuddy = function (option) {
    var typingBuddy = {
      tenant: '',
      user_id: '',
    }
    if (!option) {
      return typingBuddy
    }
    var chatKey = option.chatType + '_' + option.chatCode
    var chatTableEntry = this.chatTable[chatKey]
    if (
      chatTableEntry &&
      chatTableEntry.typingBuddy &&
      chatTableEntry.typingBuddy.time &&
      chatTableEntry.typingBuddy.time + UiConstants.SHOW_TYPING_DURATION >
        +new Date()
    ) {
      typingBuddy.tenant = chatTableEntry.typingBuddy.tenant
      typingBuddy.user_id = chatTableEntry.typingBuddy.user_id
    }
    return typingBuddy
  }

  /**
   * getShowmorelinkTable function
   */
  UcUiStore.prototype.getShowmorelinkTable = function () {
    return JSON.parse(JSON.stringify(this.showmorelinkTable))
  }

  /**
   * getConfInJoinProcTable function
   */
  UcUiStore.prototype.getConfInJoinProcTable = function () {
    return JSON.parse(JSON.stringify(this.confInJoinProcTable))
  }

  /**
   * getSearchConditions function
   * option
   * option.chatType
   * option.chatCode
   */
  UcUiStore.prototype.getSearchConditions = function (option) {
    if (!option) {
      return []
    }
    var chatKey = option.chatType + '_' + option.chatCode
    var searchConditionsTableEntry = this.searchConditionsTable[chatKey]
    return (
      (searchConditionsTableEntry &&
        JSON.parse(JSON.stringify(searchConditionsTableEntry))) ||
      []
    )
  }

  // setSearchConditions
  // option
  // option.chatType
  // option.chatCode
  // option.searchConditions
  UcUiStore.prototype.setSearchConditions = function (option) {
    if (!option) {
      return
    }
    var chatKey = option.chatType + '_' + option.chatCode
    var searchConditionsOrgJson = JSON.stringify(
      this.searchConditionsTable[chatKey] || [],
    )
    this.searchConditionsTable[chatKey] = (option.searchConditions || []).map(
      function (c) {
        return {
          conditionKey: string(c.conditionKey),
          conditionValue: string(c.conditionValue),
          conditionLabel: string(c.conditionLabel),
          options: (c.options || []).map(function (o) {
            return {
              optionValue: string(o.optionValue),
              optionLabel: string(o.optionLabel),
            }
          }),
          defaultValue:
            typeof c.defaultValue === 'undefined' || c.defaultValue === null
              ? null
              : string(c.defaultValue),
          hidden: Boolean(c.hidden),
        }
      },
    )
    var searchConditionsNewJson = JSON.stringify(
      this.searchConditionsTable[chatKey] || [],
    )
    if (searchConditionsNewJson !== searchConditionsOrgJson) {
      this.fire('searchConditionsChanged', {
        chatType: option.chatType,
        chatCode: option.chatCode,
        searchConditions: JSON.parse(searchConditionsNewJson),
      })
      this.render()
    }
  }

  // doSearch
  // option
  // option.chatType
  // option.chatCode
  // option.searchMore
  // option.emphasize
  // option.queueing
  UcUiStore.prototype.doSearch = function (option) {
    var _this = this
    var condition
    if (!option) {
      return
    }
    var chatKey = option.chatType + '_' + option.chatCode
    var searchWorkData = (this.searchWorkDataTable[chatKey] =
      this.searchWorkDataTable[chatKey] || {})
    if (searchWorkData.searching) {
      if (option.queueing) {
        this.logger.log('info', 'adding to searchQueue chatKey=' + chatKey)
        searchWorkData.searchQueue = [option]
        return
      } else {
        this.logger.log('warn', 'now searching chatKey=' + chatKey)
        return
      }
    }
    if (option.searchMore) {
      if (!searchWorkData.conditionForSearchMore) {
        this.logger.log('warn', 'not found conditionForSearchMore')
        return
      }
      condition = searchWorkData.conditionForSearchMore
    } else {
      this.searchResultsTable[chatKey] = []
    }
    var searchResultsTableEntry = this.searchResultsTable[chatKey]
    searchWorkData.searching = true
    searchWorkData.conditionForSearchMore = null
    delete searchWorkData.errorType
    delete searchWorkData.errorDetail
    this.fire('searchResultChanged', {
      chatType: option.chatType,
      chatCode: option.chatCode,
      searching: Boolean(searchWorkData.searching),
      hasMore: Boolean(searchWorkData.conditionForSearchMore),
      searchResultIds: searchResultsTableEntry.map(function (searchResult) {
        return string(searchResult.searchResultId)
      }),
    })
    this.render()
    // start search process
    if (!option.searchMore) {
      condition = { tags: [], user_id_me: '', max: 10 }
      var searchConditionsTableEntry = this.searchConditionsTable[chatKey] || []
      searchConditionsTableEntry.forEach(function (searchCondition) {
        if (searchCondition.conditionKey === '_content') {
          condition.content = string(searchCondition.conditionValue)
        } else if (searchCondition.conditionKey === '_any') {
          condition.any = string(searchCondition.conditionValue)
        } else if (searchCondition.conditionKey === '_datetime') {
          var beginEnd = string(searchCondition.conditionValue).split('-')
          if (beginEnd[0]) {
            condition.begin = beginEnd[0]
          }
          if (beginEnd[1]) {
            condition.end = beginEnd[1]
          }
        } else if (searchCondition.conditionKey === '_webchatIds') {
          if (searchCondition.conditionValue) {
            condition.conf_id = string(searchCondition.conditionValue)
              .split(',')
              .filter(function (webchatId) {
                return webchatId.indexOf('_') !== -1
              })
              .map(function (webchatId) {
                var s = webchatId.split('_')
                return {
                  conf_id: string(s[1]),
                  yyyymm: string(s[0]),
                }
              })
          }
        } else if (searchCondition.conditionKey === '_onlyMe') {
          if (searchCondition.conditionValue === '1') {
            condition.user_id_me = _this.chatClient.getProfile().user_id
          } else if (searchCondition.conditionValue === '2') {
            condition.user_id_me = null
          }
        } else if (searchCondition.conditionKey === '_tenant') {
          condition.tenant_me = string(searchCondition.conditionValue)
        } else if (searchCondition.conditionKey === '_chatType') {
          if (searchCondition.conditionValue) {
            condition.conf_type = string(searchCondition.conditionValue).split(
              ',',
            )
          }
        } else if (searchCondition.conditionKey === '_userId') {
          condition.user_id = string(searchCondition.conditionValue)
        } else if (searchCondition.conditionKey === '_name') {
          condition.name = string(searchCondition.conditionValue)
        } else if (searchCondition.conditionKey === '_mediaType') {
          if (searchCondition.conditionValue) {
            condition.tags.push({
              tag_key: 'mediaType',
              tag_value: string(searchCondition.conditionValue),
              tag_type: '_webchat',
            })
          }
        } else if (searchCondition.conditionKey === '_webchatServiceId') {
          if (searchCondition.conditionValue) {
            condition.tags.push({
              tag_key: 'webchatServiceId',
              tag_value: string(searchCondition.conditionValue),
              tag_type: '_webchat',
            })
          }
        } else if (searchCondition.conditionKey === '_webchatServiceCode') {
          if (searchCondition.conditionValue) {
            condition.tags.push({
              tag_key: 'webchatServiceCode',
              tag_value: string(searchCondition.conditionValue),
              tag_type: '_webchat',
            })
          }
        } else if (searchCondition.conditionKey === '_acd') {
          if (searchCondition.conditionValue) {
            condition.tags.push({
              tag_key: 'acd',
              tag_value: string(searchCondition.conditionValue),
              tag_type: '_webchat',
            })
          }
        } else if (searchCondition.conditionKey === '_contactId') {
          if (searchCondition.conditionValue) {
            condition.tags.push({
              tag_key: 'contactId',
              tag_value: string(searchCondition.conditionValue),
              tag_type: '_webchat',
            })
          }
        } else if (searchCondition.conditionKey === '_projectId') {
          if (searchCondition.conditionValue) {
            condition.tags.push({
              tag_key: 'projectId',
              tag_value: string(searchCondition.conditionValue),
              tag_type: '_webchat',
            })
          }
        } else if (searchCondition.conditionKey === '_maxResultCount') {
          condition.max = int(searchCondition.conditionValue) || condition.max
        } else {
          if (searchCondition.conditionKey && searchCondition.conditionValue) {
            condition.tags.push({
              tag_key: string(searchCondition.conditionKey),
              tag_value: string(searchCondition.conditionValue),
              tag_type: '_webchatext',
            })
          }
        }
      })
    }
    var keywordStr = string(condition.content || condition.any)
    var keywordRegExps = []
    if (option.emphasize) {
      keywordRegExps = keywordStr
        .split(' ')
        .filter(function (keyword, index, array) {
          return keyword && array.indexOf(keyword) === index
        })
        .sort(function (keyword1, keyword2) {
          return keyword2.length - keyword1.length
        })
        .map(function (keyword) {
          return new RegExp(
            '(' + keyword.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1') + ')',
            'gi',
          )
        })
    }
    this.chatClient.searchTopicsByCondition(
      condition,
      function (ev) {
        var countForSearchMore = 0
        if (searchWorkData.clearing) {
          searchResultsTableEntry.length = 0
          searchWorkData.clearing = false
        } else {
          if (ev && ev.topics && ev.topics.forEach) {
            ev.topics.forEach(function (topic) {
              if (topic && topic.peer) {
                // check existing
                if (
                  !searchResultsTableEntry.some(function (searchResult) {
                    return searchResult._topic_id === string(topic.topic_id)
                  })
                ) {
                  var topicContent = '?'
                  if (topic.ctype === Constants.CTYPE_TEXT) {
                    topicContent = string(topic.content).replace(/<[^>]*>/g, '')
                  } else if (topic.ctype === Constants.CTYPE_FILE_REQUEST) {
                    try {
                      topicContent = string(JSON.parse(topic.content).name)
                    } catch (e) {
                      topicContent = ''
                    }
                  } else if (topic.ctype === Constants.CTYPE_CALL_RESULT) {
                    topicContent = ''
                  } else if (topic.ctype === Constants.CTYPE_OBJECT) {
                    topicContent = ''
                  } else if (topic.ctype === Constants.CTYPE_CONF_START) {
                    topicContent = ''
                  }
                  // emphasize keywords
                  var emphCtrlCharCands = ['@', '#', '_']
                  for (var i = 0; i < emphCtrlCharCands.length; i++) {
                    var emphCtrlChar = emphCtrlCharCands[i]
                    if (
                      keywordStr.indexOf(emphCtrlChar) === -1 &&
                      topicContent.indexOf(emphCtrlChar) === -1
                    ) {
                      keywordRegExps.forEach(function (keywordRegExp) {
                        topicContent = topicContent.replace(
                          keywordRegExp,
                          emphCtrlChar + emphCtrlChar + '$1' + emphCtrlChar,
                        )
                      })
                      topicContent = topicContent.replace(
                        new RegExp(emphCtrlChar + emphCtrlChar, 'g'),
                        '<span class="brEmphasized">',
                      )
                      topicContent = topicContent.replace(
                        new RegExp(emphCtrlChar, 'g'),
                        '</span>',
                      )
                      break
                    }
                  }
                  // add marks to topicContent
                  if (topic.ctype === Constants.CTYPE_FILE_REQUEST) {
                    topicContent =
                      '<span class="brFileRequest"></span>' + topicContent
                  } else if (topic.ctype === Constants.CTYPE_CALL_RESULT) {
                    topicContent =
                      '<span class="brCallResult"></span>' + topicContent
                  } else if (topic.ctype === Constants.CTYPE_OBJECT) {
                    topicContent =
                      '<span class="brObject"></span>' + topicContent
                  }
                  // create result entry
                  var yyyymm =
                    string(topic.ltime).substr(0, 4) +
                    string(topic.ltime).substr(5, 2)
                  searchResultsTableEntry.push({
                    searchResultId:
                      'r' +
                      ('0000000' + ++_this.searchResultIdCounter).slice(-7),
                    webchatId: topic.peer.conf_id
                      ? yyyymm + '_' + string(topic.peer.conf_id)
                      : '',
                    chatType: string(topic.peer.conf_type),
                    assignedTenant: string(
                      topic.peer.conf_properties &&
                        topic.peer.conf_properties.assigned &&
                        topic.peer.conf_properties.assigned.tenant,
                    ),
                    assignedUserId: string(
                      topic.peer.conf_properties &&
                        topic.peer.conf_properties.assigned &&
                        topic.peer.conf_properties.assigned.user_id,
                    ),
                    customerTenant: string(
                      topic.peer.creator && topic.peer.creator.tenant,
                    ),
                    customerUserId: string(
                      topic.peer.creator && topic.peer.creator.user_id,
                    ),
                    customerName: string(
                      topic.peer.creator && topic.peer.creator.user_name,
                    ),
                    customerEmail: string(
                      topic.peer.creator && topic.peer.creator.user_email,
                    ),
                    customerNote: JSON.stringify(
                      (topic.peer.creator &&
                        topic.peer.creator.user_properties &&
                        topic.peer.creator.user_properties.settings &&
                        topic.peer.creator.user_properties.settings
                          .optional_settings &&
                        topic.peer.creator.user_properties.settings
                          .optional_settings.profinfo) ||
                        {},
                    ),
                    mediaType: string(
                      topic.tags &&
                        topic.tags
                          .filter(function (tag) {
                            return (
                              tag.tag_type === '_webchat' &&
                              tag.tag_key === 'mediaType'
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
                    webchatServiceId: string(
                      topic.peer.conf_properties &&
                        topic.peer.conf_properties.webchat_service_id,
                    ),
                    webchatContinuable: string(
                      topic.tags &&
                        topic.tags
                          .filter(function (tag) {
                            return (
                              tag.tag_type === '_webchat' &&
                              tag.tag_key === 'webchatContinuable'
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
                    replyTypes: string(
                      topic.tags &&
                        topic.tags
                          .filter(function (tag) {
                            return (
                              tag.tag_type === '_webchat' &&
                              tag.tag_key === 'replyTypes'
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
                    editorTypes: string(
                      topic.tags &&
                        topic.tags
                          .filter(function (tag) {
                            return (
                              tag.tag_type === '_webchat' &&
                              tag.tag_key === 'editorTypes'
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
                    initialEditorType: string(
                      topic.tags &&
                        topic.tags
                          .filter(function (tag) {
                            return (
                              tag.tag_type === '_webchat' &&
                              tag.tag_key === 'initialEditorType'
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
                    lastConfType: string(
                      topic.tags &&
                        topic.tags
                          .filter(function (tag) {
                            return (
                              tag.tag_type === '_webchat' &&
                              tag.tag_key === 'lastConfType'
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
                    nextDistributionType: string(
                      topic.tags &&
                        topic.tags
                          .filter(function (tag) {
                            return (
                              tag.tag_type === '_webchat' &&
                              tag.tag_key === 'nextDistributionType'
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
                    nextDistributionTarget: string(
                      topic.tags &&
                        topic.tags
                          .filter(function (tag) {
                            return (
                              tag.tag_type === '_webchat' &&
                              tag.tag_key === 'nextDistributionTarget'
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
                    originalWebchatId: string(
                      topic.tags &&
                        topic.tags
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
                    ),
                    mailSubject: string(
                      topic.tags &&
                        topic.tags
                          .filter(function (tag) {
                            return (
                              (tag.tag_type === '_webchatext' &&
                                tag.tag_key === 'subject') ||
                              (tag.tag_type === '_conftag' &&
                                tag.tag_key === '_outgoing_email_subject')
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
                    webchatServiceCode: string(
                      topic.tags &&
                        topic.tags
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
                    acd: string(
                      topic.tags &&
                        topic.tags
                          .filter(function (tag) {
                            return (
                              tag.tag_type === '_webchat' &&
                              tag.tag_key === 'acd'
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
                    contactId: string(
                      topic.tags &&
                        topic.tags
                          .filter(function (tag) {
                            return (
                              tag.tag_type === '_webchat' &&
                              tag.tag_key === 'contactId'
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
                    projectId: string(
                      topic.tags &&
                        topic.tags
                          .filter(function (tag) {
                            return (
                              tag.tag_type === '_webchat' &&
                              tag.tag_key === 'projectId'
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
                    extWebchatInfo:
                      (topic.tags &&
                        topic.tags
                          .filter(function (tag) {
                            return tag.tag_type === '_webchatext'
                          })
                          .sort(function (tag1, tag2) {
                            return tag1.tstamp - tag2.tstamp
                          })
                          .reduce(function (extWebchatInfo, tag) {
                            extWebchatInfo[tag.tag_key] = tag.tag_value
                            return extWebchatInfo
                          }, {})) ||
                      {},
                    customerStartTime: int(
                      topic.peer.conf_created_tstamp || topic.tstamp,
                    ),
                    summary: topicContent,
                    selected: false,
                    _expanded: false,
                    _topic_id: string(topic.topic_id),
                    _conf_id: string(topic.peer.conf_id),
                    _searchtoken: string(topic.searchtoken),
                    _profinfoFormatted: string(
                      topic.tags &&
                        topic.tags
                          .filter(function (tag) {
                            return (
                              tag.tag_type === '_webchat' &&
                              tag.tag_key === 'profinfoFormatted'
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
                    _yyyymm: yyyymm,
                    _relation:
                      (topic.tags &&
                        topic.tags
                          .filter(function (tag) {
                            return tag.tag_type === '_relation'
                          })
                          .sort(function (tag1, tag2) {
                            return tag1.tstamp - tag2.tstamp
                          })
                          .reduce(function (_relation, tag) {
                            _relation[tag.tag_key] = tag.tag_value
                            return _relation
                          }, {})) ||
                      {},
                    _relationOrigin:
                      (topic.tags &&
                        topic.tags
                          .filter(function (tag) {
                            return tag.tag_type === '_relationOrigin'
                          })
                          .sort(function (tag1, tag2) {
                            return tag1.tstamp - tag2.tstamp
                          })
                          .reduce(function (_relationOrigin, tag) {
                            _relationOrigin[tag.tag_key] = tag.tag_value
                            return _relationOrigin
                          }, {})) ||
                      {},
                    _topic: topic,
                  })
                }
              } else {
                _this.logger.log(
                  'warn',
                  'chatClient.searchTopicsByCondition return invalid topic.peer',
                )
              }
              if (ev && ev.hasMore && topic && ev.hasMore === topic.tstamp) {
                countForSearchMore++
              }
            })
            if (ev && ev.hasMore) {
              condition.end = int(ev.hasMore)
              condition.max += countForSearchMore
              searchWorkData.conditionForSearchMore = condition
            }
          } else {
            _this.logger.log(
              'warn',
              'chatClient.searchTopicsByCondition return invalid ev.topics',
            )
          }
        }
        searchWorkData.searching = false
        if (searchWorkData.searchQueue && searchWorkData.searchQueue.length) {
          setTimeout(
            _this.doSearch.bind(_this, searchWorkData.searchQueue.shift()),
            0,
          )
        }
        _this.fire('searchResultChanged', {
          chatType: option.chatType,
          chatCode: option.chatCode,
          searching: Boolean(searchWorkData.searching),
          hasMore: Boolean(searchWorkData.conditionForSearchMore),
          searchResultIds: searchResultsTableEntry.map(function (searchResult) {
            return string(searchResult.searchResultId)
          }),
        })
        _this.render()
      },
      function (ev) {
        _this.logger.log(
          'warn',
          'chatClient.searchTopicsByCondition error code=' +
            ev.code +
            ', message=' +
            ev.message,
        )
        if (searchWorkData.clearing) {
          searchResultsTableEntry.length = 0
          searchWorkData.clearing = false
        }
        searchWorkData.searching = false
        searchWorkData.errorType = 'MSG_SEARCH_TOPICS_FAILED'
        searchWorkData.errorDetail = string(ev.message)
        if (searchWorkData.searchQueue && searchWorkData.searchQueue.length) {
          setTimeout(
            _this.doSearch.bind(_this, searchWorkData.searchQueue.shift()),
            0,
          )
        }
        _this.fire('searchResultChanged', {
          chatType: option.chatType,
          chatCode: option.chatCode,
          searching: Boolean(searchWorkData.searching),
          hasMore: Boolean(searchWorkData.conditionForSearchMore),
          searchResultIds: searchResultsTableEntry.map(function (searchResult) {
            return string(searchResult.searchResultId)
          }),
        })
        _this.render()
      },
    )
  }

  /**
   * getSearchWorkData function
   * option
   * option.chatType
   * option.chatCode
   */
  UcUiStore.prototype.getSearchWorkData = function (option) {
    var searchWorkData = {
      searching: false,
      hasMore: false,
      clearing: false,
    }
    if (option) {
      var chatKey = option.chatType + '_' + option.chatCode
      if (this.searchWorkDataTable[chatKey]) {
        searchWorkData.searching = Boolean(
          this.searchWorkDataTable[chatKey].searching,
        )
        searchWorkData.hasMore = Boolean(
          this.searchWorkDataTable[chatKey].conditionForSearchMore,
        )
        searchWorkData.clearing = Boolean(
          this.searchWorkDataTable[chatKey].clearing,
        )
        if (
          typeof this.searchWorkDataTable[chatKey].errorType !== 'undefined'
        ) {
          searchWorkData.errorType = this.searchWorkDataTable[chatKey].errorType
        }
        if (
          typeof this.searchWorkDataTable[chatKey].errorDetail !== 'undefined'
        ) {
          searchWorkData.errorDetail =
            this.searchWorkDataTable[chatKey].errorDetail
        }
      }
    }
    return searchWorkData
  }

  /**
   * getSearchResults function
   * option
   * option.chatType
   * option.chatCode
   * option.searchResultIds
   */
  UcUiStore.prototype.getSearchResults = function (option) {
    if (!option) {
      return []
    }
    var chatKey = option.chatType + '_' + option.chatCode
    var searchResultsTableEntry = this.searchResultsTable[chatKey]
    if (!searchResultsTableEntry) {
      return []
    }
    var searchResultIds =
      typeof option.searchResultIds === 'string'
        ? option.searchResultIds.split(',')
        : option.searchResultIds ||
          {
            /* dummy object for getting all */
          }
    if (typeof searchResultIds.indexOf === 'function') {
      searchResultsTableEntry = searchResultsTableEntry.filter(
        function (searchResult) {
          return searchResultIds.indexOf(searchResult.searchResultId) !== -1
        },
      )
    }
    return JSON.parse(JSON.stringify(searchResultsTableEntry))
  }

  // selectSearchResult
  // option
  // option.chatType
  // option.chatCode
  // option.selectIds
  // option.unselectIds
  // option.reverseIds
  UcUiStore.prototype.selectSearchResult = function (option) {
    if (!option) {
      return
    }
    var chatKey = option.chatType + '_' + option.chatCode
    var searchResultsTableEntry = this.searchResultsTable[chatKey]
    if (!searchResultsTableEntry) {
      return
    }
    var selectIds =
      typeof option.selectIds === 'string'
        ? option.selectIds.split(',')
        : option.selectIds ||
          {
            /* dummy object for getting all */
          }
    var selectSearchResultsTableEntry = searchResultsTableEntry.filter(
      function (searchResult) {
        return (
          !searchResult.selected &&
          (typeof selectIds.indexOf !== 'function' ||
            selectIds.indexOf(searchResult.searchResultId) !== -1)
        )
      },
    )
    var selectedSearchResultIds = selectSearchResultsTableEntry.map(
      function (searchResult) {
        searchResult.selected = true
        return searchResult.searchResultId
      },
    )
    var unselectIds =
      typeof option.unselectIds === 'string'
        ? option.unselectIds.split(',')
        : option.unselectIds ||
          {
            /* dummy object for getting all */
          }
    var unselectSearchResultsTableEntry = searchResultsTableEntry.filter(
      function (searchResult) {
        return (
          searchResult.selected &&
          (typeof unselectIds.indexOf !== 'function' ||
            unselectIds.indexOf(searchResult.searchResultId) !== -1)
        )
      },
    )
    var unselectedSearchResultIds = unselectSearchResultsTableEntry.map(
      function (searchResult) {
        searchResult.selected = false
        return searchResult.searchResultId
      },
    )
    var reverseIds =
      typeof option.reverseIds === 'string'
        ? option.reverseIds.split(',')
        : option.reverseIds ||
          {
            /* dummy object for getting all */
          }
    var reverseSearchResultsTableEntry = searchResultsTableEntry
    if (typeof reverseIds.indexOf === 'function') {
      reverseSearchResultsTableEntry = searchResultsTableEntry.filter(
        function (searchResult) {
          return reverseIds.indexOf(searchResult.searchResultId) !== -1
        },
      )
    }
    reverseSearchResultsTableEntry.forEach(function (searchResult) {
      if (searchResult.selected) {
        searchResult.selected = false
        unselectedSearchResultIds.push(searchResult.searchResultId)
      } else {
        searchResult.selected = true
        selectedSearchResultIds.push(searchResult.searchResultId)
      }
    })
    this.fire('searchResultSelected', {
      chatType: option.chatType,
      chatCode: option.chatCode,
      selectedSearchResultIds: selectedSearchResultIds,
      unselectedSearchResultIds: unselectedSearchResultIds,
    })
    this.render()
  }

  // expandSearchResult
  // option
  // option.chatType
  // option.chatCode
  // option.searchResultIds
  UcUiStore.prototype.expandSearchResult = function (option) {
    var _this = this
    if (!option) {
      return
    }
    var chatKey = option.chatType + '_' + option.chatCode
    var searchResultsTableEntry = this.searchResultsTable[chatKey]
    if (!searchResultsTableEntry) {
      return
    }
    var searchResultIds =
      typeof option.searchResultIds === 'string'
        ? option.searchResultIds.split(',')
        : option.searchResultIds ||
          {
            /* dummy object for getting all */
          }
    if (typeof searchResultIds.indexOf === 'function') {
      searchResultsTableEntry = searchResultsTableEntry.filter(
        function (searchResult) {
          return searchResultIds.indexOf(searchResult.searchResultId) !== -1
        },
      )
    }
    searchResultsTableEntry.forEach(function (searchResult) {
      searchResult._expanded = !Boolean(searchResult._expanded)
      if (searchResult._expanded) {
        var chatKey = 'SEARCHRESULTDETAIL' + '_' + searchResult.searchResultId
        if (!_this.chatTable[chatKey]) {
          _this.chatTable[chatKey] = _this.newChatTableEntry(chatKey)
          _this.chatHeaderInfoTable[chatKey] = {
            title: searchResult.customerName,
            guest: {
              tenant: searchResult.customerTenant,
              user_id: searchResult.customerUserId,
            },
            guestProfinfo: searchResult._profinfoFormatted,
            confType: searchResult.chatType,
            webchatContinuable: searchResult.webchatContinuable,
            replyTypes: searchResult.replyTypes,
            editorTypes: searchResult.editorTypes,
            initialEditorType: searchResult.initialEditorType,
            lastConfType: searchResult.lastConfType,
            nextDistributionType: searchResult.nextDistributionType,
            nextDistributionTarget: searchResult.nextDistributionTarget,
            originalWebchatId: searchResult.originalWebchatId,
            yyyymm: searchResult._yyyymm,
          }
          var functionName = searchResult._conf_id
            ? 'searchConferenceTexts'
            : 'searchTopicTexts'
          var argument = searchResult._conf_id
            ? {
                conf_id: searchResult._conf_id,
                topic_id: searchResult._topic_id,
                searchtoken: searchResult._searchtoken,
              }
            : searchResult._topic_id
          _this.chatClient[functionName](
            argument,
            function (ev) {
              if (ev && ev.logs && ev.logs.forEach) {
                ev.logs.forEach(function (log) {
                  var messageFile = null
                  if (log.ctype === Constants.CTYPE_FILE_REQUEST) {
                    try {
                      messageFile = JSON.parse(log.content)
                      messageFile.receiverInfo = messageFile.target
                    } catch (e) {}
                  }
                  _this.addMessageToList({
                    chatKeys: [chatKey],
                    senderInfo: log.sender,
                    ctype: log.ctype,
                    messageText:
                      log.ctype === Constants.CTYPE_TEXT ||
                      log.ctype === Constants.CTYPE_CALL_RESULT
                        ? string(log.content)
                        : '',
                    messageObject: log.object,
                    errorType: '',
                    errorDetail: '',
                    messageFile: messageFile,
                    received_text_id: log.log_id,
                    topic_id: searchResult._topic_id,
                    conf_type: '',
                    replyEnabled: false,
                    unreached: false,
                    messageExtInfo: {
                      mailSubject: searchResult.mailSubject,
                    },
                    sentTimeValue: +parseDate(log.ltime),
                  })
                  if (log.sender) {
                    // TODO: yano test
                    if (
                      !_this.buddyTable[log.sender.tenant] ||
                      !_this.buddyTable[log.sender.tenant][log.sender.user_id]
                    ) {
                      log.sender.name = log.sender.user_name // for name
                      log.sender.profile_image_url = string(
                        searchResult._topic &&
                          searchResult._topic.tags &&
                          searchResult._topic.tags
                            .filter(function (tag) {
                              return (
                                tag.tag_type === '_webchat' &&
                                tag.tag_key === 'myProfileImageUrl' &&
                                tag.tenant === log.sender.tenant &&
                                tag.user_id === log.sender.user_id
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
                      _this.addToBuddyTable(log.sender) // TODO: yano add sender user info
                    }
                  }
                })
                if (
                  option.chatType === 'HISTORYSUMMARIES' &&
                  !searchResult._conf_id
                ) {
                  // add showmorelink
                  const indexToInsertTable = {}
                  indexToInsertTable[chatKey] = 0
                  _this.addShowmorelinkToList(
                    {
                      chatKeys: [chatKey],
                      condition_tenant:
                        searchResult._topic &&
                        searchResult._topic.peer &&
                        searchResult._topic.peer.tenant,
                      condition_user_id:
                        searchResult._topic &&
                        searchResult._topic.peer &&
                        searchResult._topic.peer.user_id,
                    },
                    indexToInsertTable,
                  )
                  _this.addShowmorelinkToList({
                    chatKeys: [chatKey],
                    condition_tenant:
                      searchResult._topic &&
                      searchResult._topic.peer &&
                      searchResult._topic.peer.tenant,
                    condition_user_id:
                      searchResult._topic &&
                      searchResult._topic.peer &&
                      searchResult._topic.peer.user_id,
                    next: true,
                  })
                } else if (
                  option.chatType === 'HISTORYSUMMARIES' &&
                  searchResult._conf_id &&
                  Object.keys(searchResult._relation).length
                ) {
                  // add showmorelink of related conference
                  const indexToInsertTable = {}
                  indexToInsertTable[chatKey] = 0
                  if (!Object.keys(searchResult._relationOrigin).length) {
                    _this.addShowmorelinkToList(
                      {
                        chatKeys: [chatKey],
                        isRelatedConference: true,
                        condition_conf_id: searchResult._conf_id,
                        condition_yyyymm: searchResult._yyyymm,
                        condition_tstamp: searchResult.customerStartTime,
                      },
                      indexToInsertTable,
                    )
                  }
                  _this.addShowmorelinkToList({
                    chatKeys: [chatKey],
                    isRelatedConference: true,
                    condition_conf_id: searchResult._conf_id,
                    condition_yyyymm: searchResult._yyyymm,
                    condition_tstamp: searchResult.customerStartTime,
                    next: true,
                  })
                }
              } else {
                _this.logger.log(
                  'warn',
                  'chatClient.' + functionName + ' return invalid ev.logs',
                )
              }
              _this.render()
            },
            function (ev) {
              _this.logger.log(
                'warn',
                'chatClient.' +
                  functionName +
                  ' error code=' +
                  ev.code +
                  ', message=' +
                  ev.message,
              )
              _this.render()
            },
          )
        }
      }
    })
    this.render()
  }

  // clearSearchResults
  // option
  // option.chatType
  // option.chatCode
  UcUiStore.prototype.clearSearchResults = function (option) {
    var _this = this
    if (!option) {
      return
    }
    var chatKey = option.chatType + '_' + option.chatCode
    var searchWorkData = this.searchWorkDataTable[chatKey] || {}
    searchWorkData.searchQueue = []
    if (searchWorkData.searching) {
      searchWorkData.clearing = true
      return
    }
    searchWorkData.conditionForSearchMore = null
    delete searchWorkData.errorType
    delete searchWorkData.errorDetail
    var searchResultsTableEntry = this.searchResultsTable[chatKey]
    if (!searchResultsTableEntry || !searchResultsTableEntry.length) {
      return
    }
    searchResultsTableEntry.forEach(function (searchResult) {
      var chatKey = 'SEARCHRESULTDETAIL' + '_' + searchResult.searchResultId
      delete _this.chatHeaderInfoTable[chatKey]
      delete _this.chatTable[chatKey]
    })
    this.searchResultsTable[chatKey] = []
    this.fire('searchResultChanged', {
      chatType: option.chatType,
      chatCode: option.chatCode,
      searching: false,
      hasMore: false,
      searchResultIds: [],
    })
    this.render()
  }

  // copyChatList
  // option
  // option.chatTypeSource
  // option.chatCodeSource
  // option.chatTypeTarget
  // option.chatCodeTarget
  // option.doNotOverwrite
  UcUiStore.prototype.copyChatList = function (option) {
    var _this = this
    if (!option) {
      return
    }
    var chatKeySource = option.chatTypeSource + '_' + option.chatCodeSource
    var chatKeyTarget = option.chatTypeTarget + '_' + option.chatCodeTarget
    if (!this.chatTable[chatKeyTarget]) {
      this.chatTable[chatKeyTarget] = this.newChatTableEntry(chatKeyTarget)
    } else if (option.doNotOverwrite) {
      this.logger.log('info', 'option.doNotOverwrite')
      return
    }
    this.chatTable[chatKeyTarget].chatList =
      (this.chatTable[chatKeySource] &&
        JSON.parse(JSON.stringify(this.chatTable[chatKeySource].chatList))) ||
      []
    // re-number showmorelink_id
    this.chatTable[chatKeyTarget].chatList.forEach(function (chat) {
      if (chat.type === 'showmorelink') {
        if (_this.showmorelinkTable[chat.showmorelink_id]) {
          var key = string(++_this.keyCounter)
          var showmorelink_id = key
          _this.showmorelinkTable[showmorelink_id] = {
            chatKeys: [chatKeyTarget],
            key: key,
            unread: _this.showmorelinkTable[chat.showmorelink_id].unread,
            condition_tenant:
              _this.showmorelinkTable[chat.showmorelink_id].condition_tenant,
            condition_user_id:
              _this.showmorelinkTable[chat.showmorelink_id].condition_user_id,
            next: _this.showmorelinkTable[chat.showmorelink_id].next,
            isRelatedConference:
              _this.showmorelinkTable[chat.showmorelink_id].isRelatedConference,
            condition_conf_id:
              _this.showmorelinkTable[chat.showmorelink_id].condition_conf_id,
            condition_yyyymm:
              _this.showmorelinkTable[chat.showmorelink_id].condition_yyyymm,
            condition_tstamp:
              _this.showmorelinkTable[chat.showmorelink_id].condition_tstamp,
            nowReceiving: false,
            tried: false,
            errorType: '',
            errorDetail: '',
          }
          chat.key = key
          chat.showmorelink_id = showmorelink_id
        }
      }
    })
    this.render()
  }

  // createConferenceChatHeaderFromSearchResult
  // option
  // option.chatType
  // option.chatCode
  // option.searchResultId
  UcUiStore.prototype.createConferenceChatHeaderFromSearchResult = function (
    option,
  ) {
    var searchResult =
      (option &&
        this.getSearchResults({
          chatType: option.chatType,
          chatCode: option.chatCode,
          searchResultIds: option.searchResultId
            ? [option.searchResultId]
            : option.searchResultIds,
        })[0]) ||
      {}
    var chatType = 'CONFERENCE'
    var chatCode =
      string(searchResult._yyyymm) + '_' + string(searchResult._conf_id)
    var chatKey = chatType + '_' + chatCode
    if (!this.chatHeaderInfoTable[chatKey]) {
      this.chatHeaderInfoTable[chatKey] = {}
    }
    this.chatHeaderInfoTable[chatKey].conf_id = string(searchResult._conf_id)
    if (searchResult.chatType === 'webchat') {
      this.chatHeaderInfoTable[chatKey].title = string(
        searchResult.customerName || searchResult.customerUserId,
      )
      if (!this.chatHeaderInfoTable[chatKey].guest) {
        this.chatHeaderInfoTable[chatKey].guest = {}
      }
      this.chatHeaderInfoTable[chatKey].guest.tenant = string(
        searchResult.customerTenant,
      )
      this.chatHeaderInfoTable[chatKey].guest.user_id = string(
        searchResult.customerUserId,
      )
      this.chatHeaderInfoTable[chatKey].guestProfinfo = string(
        searchResult._profinfoFormatted,
      )
      this.chatHeaderInfoTable[chatKey].confType = string(searchResult.chatType)
      this.chatHeaderInfoTable[chatKey].webchatContinuable = string(
        searchResult.webchatContinuable,
      )
      this.chatHeaderInfoTable[chatKey].replyTypes = string(
        searchResult.replyTypes,
      )
      this.chatHeaderInfoTable[chatKey].editorTypes = string(
        searchResult.editorTypes,
      )
      this.chatHeaderInfoTable[chatKey].initialEditorType = string(
        searchResult.initialEditorType,
      )
      this.chatHeaderInfoTable[chatKey].lastConfType = string(
        searchResult.lastConfType,
      )
      this.chatHeaderInfoTable[chatKey].originalWebchatId = string(
        searchResult.originalWebchatId,
      )
      this.chatHeaderInfoTable[chatKey].yyyymm = string(searchResult._yyyymm)
    }
  }

  // selectReplyType
  // option
  // option.chatType
  // option.chatCode
  // option.replyType
  // option.nextDistributionType
  // option.nextDistributionTarget
  UcUiStore.prototype.selectReplyType = function (option) {
    if (!option) {
      return
    }
    var chatKey = option.chatType + '_' + option.chatCode
    if (this.chatHeaderInfoTable[chatKey]) {
      if (
        typeof option.replyType !== 'undefined' &&
        option.replyType !== null
      ) {
        this.chatHeaderInfoTable[chatKey].selectedReplyType = string(
          option.replyType,
        )
      }
      if (
        typeof option.nextDistributionType !== 'undefined' &&
        option.nextDistributionType !== null
      ) {
        this.chatHeaderInfoTable[chatKey].nextDistributionType = string(
          option.nextDistributionType,
        )
      }
      if (
        typeof option.nextDistributionTarget !== 'undefined' &&
        option.nextDistributionTarget !== null
      ) {
        this.chatHeaderInfoTable[chatKey].nextDistributionTarget = string(
          option.nextDistributionTarget,
        )
      }
    }
    this.addSysmsgToList({
      chatKeys: [chatKey],
      sysmsgLevel: 'info',
      sysmsgType: 'MSG_CONFERENCE_REPLY',
    })
    this.render()
  }

  // setLocalStoragePreference
  // option
  // option.keyValueList
  UcUiStore.prototype.setLocalStoragePreference = function (option) {
    var _this = this

    var tenant = string(this.signInOption && this.signInOption.tenant)
    var t = this.signInOption && this.signInOption.isSingleTenant ? '' : tenant
    var u = string(this.signInOption && this.signInOption.user).split('?')[0]
    var userKey = encodeURIComponent(JSON.stringify([tenant, u])) // not t but tenant for compatibility with uc < 1.6
    ;((option && option.keyValueList) || []).forEach(function (kvp) {
      var key = string(kvp && kvp.key)
      var value = string(kvp && kvp.value)
      _this.localStoragePreference[key] = value
      try {
        if (key && key[key.length - 1] === '+') {
          AsyncStorage.setItem(key + t + '+' + u, value) // not tenant but t for compatibility with cim
        } else {
          AsyncStorage.setItem(
            'UC.ucclientui.' + userKey + '.cookiePreference.' + key,
            value,
          )
        }
      } catch (ex) {
        _this.logger.log(
          'warn',
          'localStorage.setItem error key=' + key + ', ex=' + ex,
        )
      }
    })
    try {
      AsyncStorage.setItem(
        'UC.ucclientui.' + userKey + '.cookiePreferenceSaved',
        Object.keys(this.localStoragePreference).join(','),
      )
    } catch (ex) {
      this.logger.log('warn', 'localStorage.setItem error ex=' + ex)
    }
  }

  /**
   * getLocalStoragePreference function
   * option
   * option.keyList
   */
  UcUiStore.prototype.getLocalStoragePreference = function (option) {
    var _this = this

    return ((option && option.keyList) || []).map(function (key) {
      return string(_this.localStoragePreference[string(key)])
    })
  }

  /**
   * getConfigProperties function
   */
  UcUiStore.prototype.getConfigProperties = function () {
    return JSON.parse(JSON.stringify(this.configPropertiesCache))
  }

  /**
   * getOptionalSetting function
   * option
   * option.key
   */
  UcUiStore.prototype.getOptionalSetting = function (option) {
    var key = string(option && option.key)
    if (this.signInStatus === 3) {
      var settings = this.chatClient.getSettings() || {}
      var optional_settings = settings.optional_settings || {}
      var optional_config = this.configPropertiesCache.optional_config || {}
      if (
        optional_config[key + '_locked'] ||
        typeof optional_settings[key] === 'undefined'
      ) {
        this.optionalSettingCache[key] = optional_config[key]
      } else {
        this.optionalSettingCache[key] = optional_settings[key]
      }
    }
    return this.optionalSettingCache[key]
  }

  /**
   * getUcCimUserType function
   * option
   * option.key
   */
  UcUiStore.prototype.getUcCimUserType = function () {
    if (this.signInStatus === 3) {
      var ucUserType = (this.chatClient.getProfile() || {}).user_type
      var cimUserType = (this.chatClient.getSignedInInfo() || {}).cimUserType
      var myUcCimUserType = 1
      if (ucUserType === Constants.USER_TYPE_SYSTEM_ADMIN) {
        myUcCimUserType = 64
      } else if (ucUserType === Constants.USER_TYPE_TENANT_ADMIN) {
        myUcCimUserType = 32
      } else if (cimUserType === '1' || cimUserType === 1) {
        myUcCimUserType = 16
      } else if (cimUserType === '0' || cimUserType === 0) {
        myUcCimUserType = 8
      } else if (cimUserType === '2' || cimUserType === 2) {
        myUcCimUserType = 4
      } else if (ucUserType === Constants.USER_TYPE_TENANT_USER) {
        myUcCimUserType = 2
      }
      this.optionalSettingCache['_ucCimUserType'] = myUcCimUserType
    }
    return int(this.optionalSettingCache['_ucCimUserType'])
  }

  /**
   * events from chatClient
   */
  UcUiStore.prototype.forcedSignOut = function (ev) {
    var retryable =
      ev.code !== Brekeke.UCClient.Errors.UPDATE_STARTED &&
      ev.code !== Brekeke.UCClient.Errors.PLEONASTIC_LOGIN
    this.signInStatus = 0
    this.lastSignOutReason = {
      code: ev.code,
      message: ev.message,
      reSignInTime: retryable ? +new Date() + this.reSignInDelay : 0,
    }
    this.addSignOutSysmsg()
    this.webchatQueueList = []
    if (retryable) {
      this.fire('signedOut', {
        reSignInDelay: this.reSignInDelay,
        tstamp: +new Date() - this.diffClientServerTime,
      })
      this.startReSignInTimer()
    } else {
      this.reSignInDelay = 0
      this.fire('signedOut', {
        reSignInDelay: 0,
        tstamp: +new Date() - this.diffClientServerTime,
      })
    }
    this.render()
  }
  //
  UcUiStore.prototype.buddyStatusChanged = function (ev) {
    this.addToBuddyTable(ev)
    this.renderBsc()
  }
  //
  UcUiStore.prototype.receivedText = function (ev) {
    var _this = this

    // message
    var message = this.createMessageFromReceivedText(ev)

    if (ev.conf_id === null) {
      // buddy
      // add to chat table
      this.addMessageToList(message)
    } else {
      // conference
      var conference = this.chatClient.getConference(ev.conf_id)
      if (conference.invite_properties.webchatfromguest) {
        // webchat
        // add to webchat queue
        var webchatQueue = this.webchatQueueList.find(function (element) {
          return element.conf_id === ev.conf_id
        })
        if (webchatQueue && webchatQueue.messageList) {
          if (
            !webchatQueue.messageList.some(function (mes) {
              return (
                mes &&
                mes.received_text_id &&
                mes.received_text_id === message.received_text_id
              )
            })
          ) {
            webchatQueue.messageList.push(message)
          }
        }
        if (conference.conf_status === Constants.CONF_STATUS_JOINED) {
          // joined
          // add to chat table
          this.addMessageToList(message)
        }
      } else {
        // add to chat table
        this.addMessageToList(message)
      }
    }

    // hide typing
    for (var chatKey in this.chatTable) {
      if (
        this.chatTable[chatKey].typingBuddy.tenant === ev.sender.tenant &&
        this.chatTable[chatKey].typingBuddy.user_id === ev.sender.user_id
      ) {
        this.chatTable[chatKey].typingBuddy = {}
      }
    }

    // read text
    var readText = ev.requires_read
      ? function () {
          setTimeout(
            _this.chatClient.readText.bind(
              _this.chatClient,
              [ev.received_text_id],
              null,
            ),
            _this.chatClient.getSettings().text_open_sec * 1000,
          )
        }
      : null

    // notification
    var evObj = {
      chatKeys: message.chatKeys,
      notificationProperties: {
        title: this.getBuddyUserForUi(ev.sender).name,
        body: message.messageText,
      },
      funcOnSelected: readText,
      notificationFunction: null,
      mustScroll: true,
    }
    if (ev.ctype === Constants.CTYPE_CALL_RESULT) {
      var callResult = {}
      try {
        callResult = JSON.parse(message.messageText) || {}
      } catch (ex) {}
      if (callResult.talklen === 0) {
        evObj.doNotBlink = true
        evObj.missedCall = true
        evObj.notificationProperties.body = ''
        this.fire('checkRequiresNotification', evObj)
      }
    } else {
      this.fire('checkRequiresNotification', evObj)
    }
    if (evObj.notificationFunction) {
      evObj.notificationFunction()
    } else if (readText) {
      readText()
    }

    this.addChatClientBuddy([ev.sender])
    this.render()
  }
  //
  UcUiStore.prototype.receivedTyping = function (ev) {
    // show typing
    for (var chatKey in this.chatTable) {
      if (
        this.chatTable[chatKey].memberList.find(function (u) {
          return u.tenant === ev.tenant && u.user_id === ev.user_id
        })
      ) {
        this.chatTable[chatKey].typingBuddy = {
          tenant: ev.tenant,
          user_id: ev.user_id,
          time: +new Date(),
        }
      }
    }

    // timer
    setTimeout(this.render.bind(this), UiConstants.SHOW_TYPING_DURATION + 100)
    this.render()
  }
  //
  UcUiStore.prototype.invitedToConference = function (ev) {
    if (ev.conference.invite_properties.webchatfromguest) {
      if (
        !this.webchatQueueList.find(function (element) {
          return element.conf_id === ev.conference.conf_id
        })
      ) {
        var webchatQueue = ev.conference
        webchatQueue.messageList = []
        webchatQueue.baseTime =
          ev.conference.created_tstamp + this.diffClientServerTime
        this.webchatQueueList.push(webchatQueue)
      }

      var lastChatOfContinuation = {}
      if (ev.conference.invite_properties.continuation_info) {
        lastChatOfContinuation = this.getChatCodeByConfId({
          conf_id: ev.conference.invite_properties.continuation_info.conf_id,
          yyyymm: ev.conference.invite_properties.continuation_info.yyyymm,
        })
        if (
          this.chatHeaderInfoTable[lastChatOfContinuation.chatKey] &&
          this.chatHeaderInfoTable[lastChatOfContinuation.chatKey].doNotContinue
        ) {
          lastChatOfContinuation = {}
        }
      }

      if (
        ev.conference.conf_status === Constants.CONF_STATUS_INVITED_WEBCHAT &&
        !ev.conference.invite_properties.rwq &&
        !lastChatOfContinuation.chatCode
      ) {
        // notification
        var evObj = {
          webchatNotification: true,
          continuation_info: ev.conference.invite_properties.continuation_info,
          notificationProperties: {
            title: ev.conference.webchatinfo.description,
            body: '',
          },
          notificationFunction: null,
        }
        this.fire('checkRequiresNotification', evObj)
        if (evObj.notificationFunction) {
          evObj.notificationFunction()
        }
      }

      this.chatClient.peekWebchatConferenceText(
        { conf_id: ev.conference.conf_id },
        this.invitedToConference_peekWebchatConferenceText_funcOK.bind(this),
        null,
      )

      // add nonbuddy to chatClient immediately (do not subscribe)
      this.addChatClientBuddy(ev.conference.user)

      var chatType = lastChatOfContinuation.chatType || 'CONFERENCE'
      var chatCode =
        lastChatOfContinuation.chatCode ||
        string(ev.conference.yyyymm) + '_' + string(ev.conference.conf_id)
      var chatKey = chatType + '_' + chatCode
      if (!this.chatHeaderInfoTable[chatKey]) {
        this.chatHeaderInfoTable[chatKey] = {}
      }
      this.chatHeaderInfoTable[chatKey].conf_id = string(ev.conference.conf_id)
      this.getChatHeaderInfo({ chatType: chatType, chatCode: chatCode }) // overwrite guest, yyyymm, etc.
      this.fire('newConference', { chatType: chatType, chatCode: chatCode })

      if (
        ev.conference.conf_status === Constants.CONF_STATUS_INVITED &&
        ev.conference.invite_properties.webchatfromguest.fromuser
      ) {
        // notification
        var evObj = {
          chatKeys: [chatKey],
          notificationProperties: {
            title: this.getBuddyUserForUi(ev.conference.from).name,
            body: ev.conference.subject,
          },
          notificationFunction: null,
        }
        this.fire('checkRequiresNotification', evObj)
        if (evObj.notificationFunction) {
          evObj.notificationFunction()
        }
      }

      if (ev.conference.conf_status === Constants.CONF_STATUS_INVITED_WEBCHAT) {
        if (lastChatOfContinuation.chatCode) {
          // continuation conference
          this.joinWebchatRoom({
            conf_id: string(ev.conference.conf_id),
            properties: { invisible: false, exclusive: true },
          })
        } else if (
          int(ev.conference.webchatinfo.auto_answer) &
          (1 << int(this.chatClient.getStatus().status))
        ) {
          // auto answer
          this.joinWebchatRoom({
            conf_id: string(ev.conference.conf_id),
            properties: { invisible: false, exclusive: true },
          })
        }
      }
    } else {
      this.addChatClientBuddy(ev.conference.user)

      var chatType = 'CONFERENCE'
      var chatCode =
        string(ev.conference.yyyymm) + '_' + string(ev.conference.conf_id)
      var chatKey = chatType + '_' + chatCode
      if (!this.chatHeaderInfoTable[chatKey]) {
        this.chatHeaderInfoTable[chatKey] = {}
      }
      this.chatHeaderInfoTable[chatKey].conf_id = string(ev.conference.conf_id)
      this.getChatHeaderInfo({ chatType: chatType, chatCode: chatCode }) // overwrite guest, yyyymm, etc.
      this.fire('newConference', { chatType: chatType, chatCode: chatCode })

      if (!ev.conference.invite_properties.rejoinable) {
        this.addSysmsgToList({
          chatKeys: [chatKey],
          sysmsgLevel: 'info',
          sysmsgType: 'MSG_CONFERENCE_INVITED',
          buddy: ev.conference.from,
        })

        if (ev.conference.conf_status === Constants.CONF_STATUS_INVITED) {
          // notification
          var evObj = {
            chatKeys: [chatKey],
            notificationProperties: {
              title: this.getBuddyUserForUi(ev.conference.from).name,
              body: ev.conference.subject,
            },
            notificationFunction: null,
          }
          this.fire('checkRequiresNotification', evObj)
          if (evObj.notificationFunction) {
            evObj.notificationFunction()
          }
        }
      }
    }

    this.render()
  }
  //
  UcUiStore.prototype.invitedToConference_peekWebchatConferenceText_funcOK =
    function (ev) {
      var _this = this

      ev.messages.forEach(function (m) {
        // message
        var message = _this.createMessageFromReceivedText(m)
        // add to webchat queue
        var webchatQueue = _this.webchatQueueList.find(function (element) {
          return element.conf_id === m.conf_id
        })
        if (webchatQueue && webchatQueue.messageList) {
          if (
            !webchatQueue.messageList.some(function (mes) {
              return (
                mes &&
                mes.received_text_id &&
                mes.received_text_id === message.received_text_id
              )
            })
          ) {
            webchatQueue.messageList.push(message)
          }
        }
      })
      this.render()
    }
  //
  UcUiStore.prototype.conferenceMemberChanged = function (ev) {
    var settings = this.chatClient.getSettings()
    if (ev.conference.conf_type === 'webchat') {
      var index = this.webchatQueueList.findIndex(function (element) {
        return element.conf_id === ev.conference.conf_id
      })
      if (index !== -1) {
        if (ev.conference.conf_status === Constants.CONF_STATUS_INACTIVE) {
          // remove queue
          var webchatQueue = ev.conference
          webchatQueue.messageList = this.webchatQueueList[index].messageList
          webchatQueue.baseTime = this.webchatQueueList[index].baseTime
          this.webchatQueueList[index] = webchatQueue
        }
      }
    }

    this.conferenceMemberChanged_updateMemberList(ev.conference.conf_id)

    this.render()
  }
  //
  UcUiStore.prototype.conferenceMemberChanged_updateMemberList = function (
    conf_id,
  ) {
    var _this = this

    var profile = this.chatClient.getProfile()
    var conference = this.chatClient.getConference(conf_id)
    if (
      conference.conf_status !== Constants.CONF_STATUS_JOINED &&
      conference.conf_status !== Constants.CONF_STATUS_INACTIVE
    ) {
      return
    }
    if (
      conference.conf_status === Constants.CONF_STATUS_INACTIVE &&
      profile.user_type === Constants.USER_TYPE_TENANT_GUEST
    ) {
      setTimeout(this.signOut.bind(this), 1000) // sign-out after buddyStatusChanged of message
    }
    var chatKey = this.getChatCodeByConfId({ conf_id: conf_id }).chatKey
    if (!chatKey) {
      chatKey = 'CONFERENCE' + '_' + conference.yyyymm + '_' + conf_id
    }
    if (!this.chatTable[chatKey]) {
      if (conference.conf_status === Constants.CONF_STATUS_INACTIVE) {
        return
      }
      this.chatTable[chatKey] = this.newChatTableEntry(chatKey)
    }
    var confMemberListOrg = this.chatTable[chatKey].memberList.concat()
    var confMemberList = conference.user.concat()
    var leftUsers = confMemberListOrg.filter(function (uo) {
      return (
        uo.conf_status === Constants.CONF_STATUS_JOINED &&
        confMemberList.find(function (u) {
          return (
            uo.tenant === u.tenant &&
            uo.user_id === u.user_id &&
            u.conf_status === Constants.CONF_STATUS_JOINED
          )
        }) === undefined
      )
    })
    leftUsers.sort(function (u1, u2) {
      if (u1.tenant === profile.tenant && u1.user_id === profile.user_id) {
        return 1
      } else if (
        u2.tenant === profile.tenant &&
        u2.user_id === profile.user_id
      ) {
        return -1
      } else {
        return 0
      }
    })
    leftUsers.forEach(function (u) {
      if (u.tenant === profile.tenant && u.user_id === profile.user_id) {
        // me
        if (profile.user_type !== Constants.USER_TYPE_TENANT_GUEST) {
          _this.addSysmsgToList({
            chatKeys: [chatKey],
            sysmsgLevel: 'info',
            sysmsgType: 'MSG_CONFERENCE_ME_LEFT',
          })
        }
      } else if (string(u.user_id)[0] !== '#') {
        // non-guest
        _this.addSysmsgToList({
          chatKeys: [chatKey],
          sysmsgLevel: 'info',
          sysmsgType: 'MSG_CONFERENCE_MEMBER_LEFT',
          buddy: u,
        })
      } else {
        // guest
        if (
          confMemberList.filter(function (u2) {
            return (
              u2.conf_status === Constants.CONF_STATUS_JOINED &&
              string(u2.name || u2.user_id) === string(u.name || u.user_id)
            )
          }).length === 0
        ) {
          // 1 -> 0
          _this.addSysmsgToList({
            chatKeys: [chatKey],
            sysmsgLevel: 'info',
            sysmsgType: 'MSG_CONFERENCE_MEMBER_OFFLINE',
            buddy: u,
          })
        }
      }
    })
    var joinedUsers = confMemberList.filter(function (u) {
      return (
        u.conf_status === Constants.CONF_STATUS_JOINED &&
        confMemberListOrg.find(function (uo) {
          return (
            uo.tenant === u.tenant &&
            uo.user_id === u.user_id &&
            uo.conf_status === Constants.CONF_STATUS_JOINED
          )
        }) === undefined
      )
    })
    joinedUsers.sort(function (u1, u2) {
      if (u1.tenant === profile.tenant && u1.user_id === profile.user_id) {
        return 1
      } else if (
        u2.tenant === profile.tenant &&
        u2.user_id === profile.user_id
      ) {
        return -1
      } else {
        return 0
      }
    })
    this.addChatClientBuddy(joinedUsers)
    joinedUsers.forEach(function (u) {
      if (u.tenant === profile.tenant && u.user_id === profile.user_id) {
        // me
        _this.addSysmsgToList({
          chatKeys: [chatKey],
          sysmsgLevel: 'info',
          sysmsgType: 'MSG_CONFERENCE_ME_JOINED',
        })
      } else if (string(u.user_id)[0] !== '#') {
        // non-guest
        _this.addSysmsgToList({
          chatKeys: [chatKey],
          sysmsgLevel: 'info',
          sysmsgType: 'MSG_CONFERENCE_MEMBER_JOINED',
          buddy: u,
        })
      } else {
        // guest
        if (u.reenter_user_id) {
          // reenter
          if (
            confMemberListOrg.filter(function (u2) {
              return (
                u2.conf_status === Constants.CONF_STATUS_JOINED &&
                string(u2.name || u2.user_id) === string(u.name || u.user_id)
              )
            }).length === 0
          ) {
            // 0 -> 1
            _this.addSysmsgToList({
              chatKeys: [chatKey],
              sysmsgLevel: 'info',
              sysmsgType: 'MSG_CONFERENCE_MEMBER_ONLINE',
              buddy: u,
            })
          }
        } else {
          // new guest
          _this.addSysmsgToList({
            chatKeys: [chatKey],
            sysmsgLevel: 'info',
            sysmsgType: 'MSG_CONFERENCE_MEMBER_JOINED',
            buddy: u,
          })
        }
      }
    })

    this.chatTable[chatKey].memberList = confMemberList
  }
  //
  UcUiStore.prototype.extConfInfoChanged = function (ev) {}
  //
  UcUiStore.prototype.fileReceived = function (ev) {
    var _this = this

    var settings = this.chatClient.getSettings()
    var file_id = ev.fileInfo.file_id
    // create message file info
    var messageFile = (this.activeMessageFileTable[file_id] = {
      file_id: file_id,
      name: ev.fileInfo.name,
      size: ev.fileInfo.size,
      receiverInfo: this.chatClient.getProfile(),
      status: ev.fileInfo.status,
      progress: ev.fileInfo.progress,
      inlineImage: {
        loading: false,
        url: '',
      },
      messageFileError: '',
    })
    // inline image
    var ext = ev.fileInfo.name
      .substr(ev.fileInfo.name.lastIndexOf('.') + 1)
      .toLowerCase()
    if (
      ext === 'png' ||
      ext === 'jpg' ||
      ext === 'jpeg' ||
      ext === 'gif' ||
      ext === 'bmp'
    ) {
      if (
        !(
          settings.optional_settings &&
          settings.optional_settings.image_file_transfer === 'file'
        ) &&
        typeof Blob !== 'undefined' &&
        typeof URL !== 'undefined' &&
        typeof XMLHttpRequest !== 'undefined'
      ) {
        messageFile.inlineImage.loading = true
        var xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 1) {
            xhr.responseType = 'blob'
          } else if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              // create objectURL of inline image
              _this.objectURLList.push(
                (messageFile.inlineImage.url = URL.createObjectURL(
                  xhr.response,
                )),
              )
            } else {
              // error
              _this.logger.log('warn', 'xhr error status=' + xhr.status)
              messageFile.messageFileError = 'xhr error status=' + xhr.status
            }
            messageFile.inlineImage.loading = false
            _this.render()
          }
        }
        this.chatClient.acceptFileWithXhr(file_id, xhr, function (ev) {
          // error
          _this.logger.log(
            'warn',
            'chatClient.acceptFileWithXhr error code=' +
              ev.code +
              ', message=' +
              ev.message,
          )
          messageFile.messageFileError = string(ev.message)
        })
      }
    }
    // message
    var conference = null
    if (ev.conf_id) {
      conference = this.chatClient.getConference(ev.conf_id)
    }
    var message = {
      chatKeys: [
        ev.conf_id
          ? this.getChatCodeByConfId({ conf_id: ev.conf_id }).chatKey
          : 'CHAT' + '_' + JSON.stringify(ev.fileInfo.target),
      ],
      senderInfo: ev.fileInfo.target,
      ctype: Constants.CTYPE_FILE_REQUEST,
      messageText: '',
      messageObject: undefined,
      errorType: '',
      errorDetail: '',
      messageFile: messageFile,
      received_text_id: ev.text_id,
      topic_id: ev.topic_id,
      conf_type: string(conference && conference.conf_type),
      replyEnabled: false,
      unreached: false,
      messageExtInfo: {
        mailSubject: this.getMailSubject(conference),
      },
      sentTimeValue: +parseDate(ev.sent_ltime),
    }

    if (ev.conf_id === null) {
      // buddy
      // add to chat table
      this.addMessageToList(message)
    } else {
      // conference
      conference = conference || this.chatClient.getConference(ev.conf_id)
      if (conference.invite_properties.webchatfromguest) {
        // webchat
        if (conference.conf_status === Constants.CONF_STATUS_JOINED) {
          // joined
          // add to chat table
          this.addMessageToList(message)
        }
      } else {
        // add to chat table
        this.addMessageToList(message)
      }
    }

    // notification
    var evObj = {
      chatKeys: message.chatKeys,
      notificationProperties: {
        title: this.getBuddyUserForUi(ev.fileInfo.target).name,
        body: message.messageText,
      },
      funcOnSelected: null,
      notificationFunction: null,
      mustScroll: true,
    }
    this.fire('checkRequiresNotification', evObj)
    if (evObj.notificationFunction) {
      evObj.notificationFunction()
    }

    this.addChatClientBuddy([ev.fileInfo.target])
    this.render()
  }
  //
  UcUiStore.prototype.fileInfoChanged = function (ev) {
    if (this.activeMessageFileTable[ev.fileInfo.file_id]) {
      // change message file info
      if (
        !this.activeMessageFileTable[ev.fileInfo.file_id].multiReceiversInfo
      ) {
        this.activeMessageFileTable[ev.fileInfo.file_id].status =
          ev.fileInfo.status
        this.activeMessageFileTable[ev.fileInfo.file_id].progress =
          ev.fileInfo.progress
      } else {
        var prepared = false
        var accepted = false
        var incompleted = false
        var localCancel = false
        var error = false
        var sum = 0
        this.activeMessageFileTable[
          ev.fileInfo.file_id
        ].multiReceiversInfo.forEach(function (info) {
          if (ev.fileInfo.file_id === info.file_id) {
            info.status = ev.fileInfo.status
            info.progress = ev.fileInfo.progress
          }
          if (info.status !== Constants.FILE_STATUS_UNPREPARED) {
            prepared = true
          }
          if (info.status !== Constants.FILE_STATUS_UNACCEPTED) {
            accepted = true
          }
          if (info.status !== Constants.FILE_STATUS_COMPLETED) {
            incompleted = true
          }
          if (info.status === Constants.FILE_STATUS_LOCAL_CANCEL) {
            localCancel = true
          }
          if (info.status === Constants.FILE_STATUS_ERROR) {
            error = true
          }
          sum += info.progress
        })
        this.activeMessageFileTable[ev.fileInfo.file_id].status = error
          ? Constants.FILE_STATUS_ERROR
          : localCancel
            ? Constants.FILE_STATUS_LOCAL_CANCEL
            : !prepared
              ? Constants.FILE_STATUS_UNPREPARED
              : !accepted
                ? Constants.FILE_STATUS_UNACCEPTED
                : !incompleted
                  ? Constants.FILE_STATUS_COMPLETED
                  : Constants.FILE_STATUS_TRANSFERRING
        this.activeMessageFileTable[ev.fileInfo.file_id].progress = int(
          sum /
            this.activeMessageFileTable[ev.fileInfo.file_id].multiReceiversInfo
              .length,
        )
      }
      this.render()
    }
  }
  //
  UcUiStore.prototype.fileTerminated = function (ev) {
    this.fileInfoChanged(ev)
    // delete message file info cache
    delete this.activeMessageFileTable[ev.fileInfo.file_id]
  }
  //
  UcUiStore.prototype.objectReceived = function (ev) {
    this.receivedText(ev)
  }
  //
  UcUiStore.prototype.confLeaveReceived = function (ev) {
    if (ev.conf_id !== null) {
      var chatKey = this.getChatCodeByConfId({ conf_id: ev.conf_id }).chatKey
      if (chatKey) {
        this.addSysmsgToList({
          chatKeys: [chatKey],
          sysmsgLevel: 'info',
          sysmsgType: 'MSG_CONFERENCE_MEMBER_LEFT',
          buddy: ev.sender,
        })
      }
    }
  }

  /**
   * Utility functions
   */
  var int = function int(value) {
    return parseInt(value, 10) || 0
  }
  var string = function string(value) {
    return String(value || value === 0 || value === false ? value : '')
  }
  var stringify = function stringify(object) {
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
  // polyfill
  if (!Array.prototype.find) {
    Array.prototype.find = function (predicate) {
      if (this === null) {
        throw new TypeError('Array.prototype.find called on null or undefined')
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function')
      }
      var list = Object(this)
      var length = list.length >>> 0
      var thisArg = arguments[1]
      var value

      for (var i = 0; i < length; i++) {
        value = list[i]
        if (predicate.call(thisArg, value, i, list)) {
          return value
        }
      }
      return undefined
    }
  }
  if (!Array.prototype.findIndex) {
    Array.prototype.findIndex = function (predicate) {
      if (this === null) {
        throw new TypeError(
          'Array.prototype.findIndex called on null or undefined',
        )
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function')
      }
      var list = Object(this)
      var length = list.length >>> 0
      var thisArg = arguments[1]
      var value

      for (var i = 0; i < length; i++) {
        value = list[i]
        if (predicate.call(thisArg, value, i, list)) {
          return i
        }
      }
      return -1
    }
  }

  /**
   * global object
   */
  UcUiStore.UiConstants = UiConstants
  /**
   * export global object
   */
  return UcUiStore
})
