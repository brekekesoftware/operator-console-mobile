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
;(function (root, factory) {
  if (
    (typeof module === 'undefined' ? 'undefined' : _typeof(module)) ===
      'object' &&
    module.exports
  ) {
    module.exports = factory()
  } else {
    root.Brekeke = root.Brekeke || {}
    root.Brekeke.UCLogTexts = factory()
  }
})(void 0, function () {
  var UCLogTexts = {}
  UCLogTexts.startLoadingTexts = function (options) {
    if (!options) {
      console.warn('invalid parameter in UCLogTexts.startLoadingTexts()')
      return
    }
    if (
      typeof Brekeke !== 'undefined' &&
      typeof Brekeke.UCAgentWidget !== 'undefined' &&
      typeof Brekeke.UCAgentWidget.uiData !== 'undefined' &&
      typeof Brekeke.UcUiAction !== 'undefined' &&
      typeof Brekeke.UcUiStore !== 'undefined' &&
      typeof Brekeke.UCClient !== 'undefined' &&
      typeof Brekeke.UCClient.Logger !== 'undefined'
    ) {
      loadTexts(options)
    } else {
      var head =
        document.head ||
        document.getElementsByTagName('head')[0] ||
        document.body
      var script = document.createElement('script')
      script.async = 1
      script.setAttribute('charset', 'utf-8')
      script.src =
        options.ucUrl +
        '/js/brekeke/ucagentwidget/ucagentwidget.min.js?' +
        options.cacheBust
      script.type = 'text/javascript'
      head.appendChild(script)
      var onloadTimerCnt = 0
      var onloadTimer = setInterval(function () {
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
          loadTexts(options)
        } else if (onloadTimerCnt >= 600) {
          clearInterval(onloadTimer)
          console.warn('onloadTimerCnt=' + onloadTimerCnt)
        }
      }, 100)
    }
  }
  var loadTexts = function loadTexts(options) {
    var logger = new Brekeke.UCClient.Logger('all')
    logger.log('debug', options)
    var parent = document.querySelector(
      '.brUCLogTextsParent[data-brekeke-uc-parent-tag="' +
        options.parentTag +
        '"]',
    )
    if (!parent) {
      logger.log(
        'warn',
        'parentTag "' + options.parentTag + '" not found in loadTexts()',
      )
      return
    }
    var panelType = 'CONFERENCE'
    var panelCode = 'singleton'
    var panelKey = panelType + '_' + panelCode
    var ucUiAction = new Brekeke.UcUiAction()
    var ucUiStore = new Brekeke.UcUiStore({
      logger: logger,
      ucUiAction: ucUiAction,
    })
    var customer = {}
    var ud = new Brekeke.UCAgentWidget.uiData({
      parentElement: parent,
      ucUiAction: ucUiAction,
      ucUiStore: ucUiStore,
      configurations: {
        moreMessages: true,
        iconicShowmorelink: true,
      },
      chatOnly: panelKey,
    })
    UCLogTexts.ucUiStoreInstance = ucUiStore // for debug
    UCLogTexts.uiDataInstance = ud // for debug

    var _onreadystatechange = function onreadystatechange(data) {
      if (this.readyState == 4) {
        if (this.status == 200) {
          var responseText = this.responseText
          logger.log('debug', responseText)
          var result = {}
          try {
            result = JSON.parse(responseText) || {}
          } catch (e) {
            logger.log('warn', e)
          }
          var logs = result.logs || []
          var senders = result.senders || {}
          var tags = result.tags || []
          var confprops = result.confprops || {} // before receiveMore
          var conference = result.conference || {} // after receiveMore
          var showmorelink =
            data && ucUiStore.showmorelinkTable[data.showmorelink_id]
          for (var i = 0; i < logs.length; i++) {
            var log = logs[i]
            var messageFile = null
            var messageObject = undefined
            if (log.ctype === Brekeke.UCClient.Constants.CTYPE_FILE_REQUEST) {
              try {
                messageFile = JSON.parse(log.content)
                messageFile.receiverInfo = messageFile.target
              } catch (e) {}
            }
            if (log.ctype === Brekeke.UCClient.Constants.CTYPE_OBJECT) {
              try {
                messageObject = JSON.parse(log.content)
              } catch (e) {}
            }
            var indexToInsertTable = {}
            if (showmorelink) {
              if (!showmorelink.next) {
                indexToInsertTable[panelKey] = i === 0 ? 1 : 2
              } else {
                indexToInsertTable[panelKey] =
                  ucUiStore.getChatList({
                    chatType: panelType,
                    chatCode: panelCode,
                  }).length - 1
              }
            }
            ucUiStore.addMessageToList(
              {
                chatKeys: [panelKey],
                senderInfo: senders[log.sender],
                ctype: log.ctype,
                messageText:
                  log.ctype === Brekeke.UCClient.Constants.CTYPE_TEXT ||
                  log.ctype === Brekeke.UCClient.Constants.CTYPE_CALL_RESULT
                    ? log.content
                    : '',
                messageObject: messageObject,
                errorType: '',
                errorDetail: '',
                messageFile: messageFile,
                received_text_id: log.log_id,
                topic_id: string(conference.conf_id || confprops.conf_id),
                conf_type: '',
                messageExtInfo: {
                  mailSubject: string(
                    tags
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
                },
                sentTimeValue: +parseDate(log.ltime),
              },
              indexToInsertTable,
            )
          }
          var customerOrg = customer
          for (var key in senders) {
            // TODO: yano test
            var sender = senders[key]
            sender.name = sender.user_name // for name
            if (
              Brekeke.UCClient.CryptoJS.MD5(sender.user_id).toString() ===
                options.agentIdMD5 &&
              Brekeke.UCClient.CryptoJS.MD5(sender.tenant).toString() ===
                options.tenantMD5
            ) {
              ucUiStore.chatClient._tenant = sender.tenant // for isMe
              ucUiStore.chatClient._user_id = sender.user_id // for isMe
            }
            if (
              sender.user_type ===
              Brekeke.UCClient.Constants.USER_TYPE_TENANT_GUEST
            ) {
              customer = sender
            }
            ucUiStore.addToBuddyTable(sender) // TODO: yano add sender user info
          }
          if (!customerOrg.user_id) {
            ucUiStore.chatHeaderInfoTable[panelKey] = {
              title: string(customer.user_name),
              guest: {
                tenant: string(customer.tenant),
                user_id: string(customer.user_id),
              },
              guestProfinfo: string(
                tags
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
            }
          }

          // add showmorelink
          var relation =
            tags
              .filter(function (tag) {
                return tag.tag_type === '_relation'
              })
              .sort(function (tag1, tag2) {
                return tag1.tstamp - tag2.tstamp
              })
              .reduce(function (relation, tag) {
                relation[tag.tag_key] = tag.tag_value
                return relation
              }, {}) || {}
          var relationOrigin =
            tags
              .filter(function (tag) {
                return tag.tag_type === '_relationOrigin'
              })
              .sort(function (tag1, tag2) {
                return tag1.tstamp - tag2.tstamp
              })
              .reduce(function (relationOrigin, tag) {
                relationOrigin[tag.tag_key] = tag.tag_value
                return relationOrigin
              }, {}) || {}
          if (showmorelink) {
            if (!showmorelink.next) {
              if (conference.conf_id && !Object.keys(relationOrigin).length) {
                // update showmorelink
                showmorelink.nowReceiving = false
                showmorelink.condition_conf_id = conference.conf_id
                showmorelink.condition_yyyymm = conference.yyyymm
                showmorelink.condition_tstamp = conference.tstamp
              } else {
                // remove showmorelink
                delete ucUiStore.showmorelinkTable[data.showmorelink_id]
                ucUiStore.chatTable[panelKey].chatList.shift()
              }
            } else {
              if (conference.conf_id) {
                // update showmorelink
                showmorelink.nowReceiving = false
                showmorelink.condition_conf_id = conference.conf_id
                showmorelink.condition_yyyymm = conference.yyyymm
                showmorelink.condition_tstamp = conference.tstamp
              } else {
                // remove showmorelink
                delete ucUiStore.showmorelinkTable[data.showmorelink_id]
                ucUiStore.chatTable[panelKey].chatList.pop()
              }
            }
          } else {
            if (Object.keys(relation).length) {
              var indexToInsertTable2 = {}
              indexToInsertTable2[panelKey] = 0
              if (!Object.keys(relationOrigin).length) {
                ucUiStore.addShowmorelinkToList(
                  {
                    chatKeys: [panelKey],
                    isRelatedConference: true,
                    condition_conf_id: string(confprops.conf_id),
                    condition_yyyymm: string(confprops.yyyymm),
                    condition_tstamp: int(confprops.ltime),
                  },
                  indexToInsertTable2,
                )
              }
              ucUiStore.addShowmorelinkToList({
                chatKeys: [panelKey],
                isRelatedConference: true,
                condition_conf_id: string(confprops.conf_id),
                condition_yyyymm: string(confprops.yyyymm),
                condition_tstamp: int(confprops.ltime),
                next: true,
              })
              // override receiveMore()
              ucUiStore.receiveMore = function (option) {
                var showmorelink =
                  option && ucUiStore.showmorelinkTable[option.showmorelink_id]
                if (
                  showmorelink &&
                  showmorelink.isRelatedConference &&
                  !showmorelink.nowReceiving
                ) {
                  showmorelink.nowReceiving = true
                  var condition = {
                    conf_id: showmorelink.condition_conf_id,
                    yyyymm: showmorelink.condition_yyyymm,
                  }
                  if (showmorelink.next) {
                    condition.begin = showmorelink.condition_tstamp
                    condition.asc = true
                  } else {
                    condition.end = showmorelink.condition_tstamp
                    condition.asc = false
                  }
                  var xhr2 = new XMLHttpRequest()
                  xhr2.open(
                    'POST',
                    options.ucUrl +
                      '/uus?method=texts&withtags=1&withprofimage=1&param=' +
                      options.param +
                      '&srctp=' +
                      encodeURIComponent(JSON.stringify(condition)),
                  )
                  xhr2.onreadystatechange = _onreadystatechange.bind(xhr2, {
                    showmorelink_id: option.showmorelink_id,
                  })
                  xhr2.send()
                  ud.render()
                }
              }
            }
          }
          ud.render()
        } else {
          logger.log('warn', this.status)
        }
      } else {
      }
    }
    var xhr = new XMLHttpRequest()
    xhr.open(
      'POST',
      options.ucUrl +
        '/uus?method=texts&withtags=1&withconfprops=1&withprofimage=1&param=' +
        options.param,
    )
    xhr.onreadystatechange = _onreadystatechange.bind(xhr, {})
    xhr.send()
  }
  var int = function int(value) {
    return parseInt(value, 10) || 0
  }
  var string = function string(value) {
    return String(value || value === 0 || value === false ? value : '')
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
  return UCLogTexts
})
