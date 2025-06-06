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
    module.exports = factory({})
  } else {
    root.Brekeke = root.Brekeke || {}
    root.Brekeke.UcUiAction = factory(root.Brekeke)
  }
})(void 0, function (Brekeke) {
  /**
   * UcUiAction class
   */
  var UcUiAction = function UcUiAction(option) {
    this.handlers = []
  }

  /**
   * addHandler function
   * handler
   */
  UcUiAction.prototype.addHandler = function (handler) {
    this.handlers.push(handler)
  }
  //
  UcUiAction.prototype.fire = function (eventName) {
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

  /**
   * removeHandler function
   * handler
   */
  UcUiAction.prototype.removeHandler = function (handler) {
    var index = this.handlers.indexOf(handler)
    if (index !== -1) {
      this.handlers.splice(index, 1)
    }
  }

  /**
   * signIn function
   * option
   * option.url
   * option.tenant
   * option.user
   * option.pass
   * option.reSignInDelay
   * option.maxReSignInDelay
   */
  UcUiAction.prototype.signIn = function (option) {
    this.fire('signIn', option)
  }

  /**
   * signInGuest function
   * option
   * option.url
   * option.tenant
   * option.name
   * option.email
   * option.profinfo
   * option.reenterUserId
   * option.signInWebchatOptions
   * option.myProfileImageUrl
   */
  UcUiAction.prototype.signInGuest = function (option) {
    this.fire('signInGuest', option)
  }

  /**
   * signOut function
   * option (optional)
   */
  UcUiAction.prototype.signOut = function (option) {
    this.fire('signOut', option)
  }

  /**
   * clearChat function
   * option
   * option.chatType
   * option.chatCode
   */
  UcUiAction.prototype.clearChat = function (option) {
    this.fire('clearChat', option)
  }

  /**
   * refreshBuddyTable function
   * option
   */
  UcUiAction.prototype.refreshBuddyTable = function (option) {
    this.fire('refreshBuddyTable', option)
  }

  /**
   * uncacheProfileImageUrl function
   * option
   * option.minSignInOKCount
   */
  UcUiAction.prototype.uncacheProfileImageUrl = function (option) {
    this.fire('uncacheProfileImageUrl', option)
  }

  /**
   * changeStatus function
   * option
   * option.status
   * option.display
   * option.ui_customized_status
   */
  UcUiAction.prototype.changeStatus = function (option) {
    this.fire('changeStatus', option)
  }

  /**
   * createConference function
   * option
   * option.subject
   * option.invite
   */
  UcUiAction.prototype.createConference = function (option) {
    this.fire('createConference', option)
  }

  /**
   * inviteToConference function
   * option
   * option.conf_id
   * option.invite
   */
  UcUiAction.prototype.inviteToConference = function (option) {
    this.fire('inviteToConference', option)
  }

  /**
   * joinConference function
   * option
   * option.conf_id
   * option.properties
   */
  UcUiAction.prototype.joinConference = function (option) {
    this.fire('joinConference', option)
  }

  /**
   * leaveConference function
   * option
   * option.conf_id
   * option.rejoinable
   */
  UcUiAction.prototype.leaveConference = function (option) {
    this.fire('leaveConference', option)
  }

  /**
   * joinWebchatRoom function
   * option
   * option.conf_id
   * option.properties
   */
  UcUiAction.prototype.joinWebchatRoom = function (option) {
    this.fire('joinWebchatRoom', option)
  }

  /**
   * leaveWebchatRoom function
   * option
   * option.conf_id
   * option.rejoinable
   */
  UcUiAction.prototype.leaveWebchatRoom = function (option) {
    this.fire('leaveWebchatRoom', option)
  }

  /**
   * kickOutOfWebchatRoom function
   * option
   * option.conf_id
   */
  UcUiAction.prototype.kickOutOfWebchatRoom = function (option) {
    this.fire('kickOutOfWebchatRoom', option)
  }

  /**
   * clearWebchatQueue function
   * option
   * option.conf_id
   */
  UcUiAction.prototype.clearWebchatQueue = function (option) {
    this.fire('clearWebchatQueue', option)
  }

  /**
   * sendText function
   * option
   * option.chatType
   * option.chatCode
   * option.text
   * option.isRichText
   */
  UcUiAction.prototype.sendText = function (option) {
    this.fire('sendText', option)
  }

  /**
   * sendBroadcastText function
   * option
   * option.target
   * option.text
   * option.isRichText
   */
  UcUiAction.prototype.sendBroadcastText = function (option) {
    this.fire('sendBroadcastText', option)
  }

  /**
   * sendTyping function
   * option
   * option.chatType
   * option.chatCode
   */
  UcUiAction.prototype.sendTyping = function (option) {
    this.fire('sendTyping', option)
  }

  /**
   * sendCustomClientEvent function
   * option
   * option.chatType
   * option.chatCode
   * option.client_param
   * option.sysmsg
   */
  UcUiAction.prototype.sendCustomClientEvent = function (option) {
    this.fire('sendCustomClientEvent', option)
  }

  /**
   * sendFiles function
   * option
   * option.chatType
   * option.chatCode
   * option.files
   */
  UcUiAction.prototype.sendFiles = function (option) {
    this.fire('sendFiles', option)
  }

  /**
   * acceptFile function
   * option
   * option.file_id
   * option.form
   */
  UcUiAction.prototype.acceptFile = function (option) {
    this.fire('acceptFile', option)
  }

  /**
   * sendCallResult function
   * option
   * option.chatType
   * option.chatCode
   * option.text
   */
  UcUiAction.prototype.sendCallResult = function (option) {
    this.fire('sendCallResult', option)
  }

  /**
   * sendObject function
   * option
   * option.chatType
   * option.chatCode
   * option.object
   */
  UcUiAction.prototype.sendObject = function (option) {
    this.fire('sendObject', option)
  }

  /**
   * addSysmsgChat function
   * option
   * option.chatType
   * option.chatCode
   * option.sysmsg
   */
  UcUiAction.prototype.addSysmsgChat = function (option) {
    this.fire('addSysmsgChat', option)
  }

  /**
   * receiveMore function
   * option
   * option.showmorelink_id
   * option.begin
   */
  UcUiAction.prototype.receiveMore = function (option) {
    this.fire('receiveMore', option)
  }

  /**
   * changeMessageText function
   * option
   * option.key
   * option.messageText
   */
  UcUiAction.prototype.changeMessageText = function (option) {
    this.fire('changeMessageText', option)
  }

  /**
   * setSearchConditions function
   * option
   * option.chatType
   * option.chatCode
   * option.searchConditions
   */
  UcUiAction.prototype.setSearchConditions = function (option) {
    this.fire('setSearchConditions', option)
  }

  /**
   * doSearch function
   * option
   * option.chatType
   * option.chatCode
   * option.searchMore
   * option.emphasize
   * option.queueing
   */
  UcUiAction.prototype.doSearch = function (option) {
    this.fire('doSearch', option)
  }

  /**
   * selectSearchResult function
   * option
   * option.chatType
   * option.chatCode
   * option.selectIds
   * option.unselectIds
   * option.reverseIds
   */
  UcUiAction.prototype.selectSearchResult = function (option) {
    this.fire('selectSearchResult', option)
  }

  /**
   * expandSearchResult function
   * option
   * option.chatType
   * option.chatCode
   * option.searchResultIds
   */
  UcUiAction.prototype.expandSearchResult = function (option) {
    this.fire('expandSearchResult', option)
  }

  /**
   * clearSearchResults function
   * option
   * option.chatType
   * option.chatCode
   */
  UcUiAction.prototype.clearSearchResults = function (option) {
    this.fire('clearSearchResults', option)
  }

  /**
   * copyChatList function
   * option
   * option.chatTypeSource
   * option.chatCodeSource
   * option.chatTypeTarget
   * option.chatCodeTarget
   * option.doNotOverwrite
   */
  UcUiAction.prototype.copyChatList = function (option) {
    this.fire('copyChatList', option)
  }

  /**
   * createConferenceChatHeaderFromSearchResult function
   * option
   * option.chatType
   * option.chatCode
   * option.searchResultId
   */
  UcUiAction.prototype.createConferenceChatHeaderFromSearchResult = function (
    option,
  ) {
    this.fire('createConferenceChatHeaderFromSearchResult', option)
  }

  /**
   * selectReplyType function
   * option
   * option.chatType
   * option.chatCode
   * option.replyType
   * option.nextDistributionType
   * option.nextDistributionTarget
   */
  UcUiAction.prototype.selectReplyType = function (option) {
    this.fire('selectReplyType', option)
  }

  /**
   * setLocalStoragePreference function
   * option
   * option.list
   */
  UcUiAction.prototype.setLocalStoragePreference = function (option) {
    this.fire('setLocalStoragePreference', option)
  }

  /**
   * export global object
   */
  return UcUiAction
})
