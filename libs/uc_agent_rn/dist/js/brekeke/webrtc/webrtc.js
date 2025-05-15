/*
 * require jssip/jssip-0.4.2.js
 */

if (!Brekeke) {
  var Brekeke = {}
}

/*
 * Instance Brekeke.webrtc
 * Provides WebRTC user agent classes.
 */
Brekeke.webrtc = {}

/*
 * Class Brekeke.webrtc.Phone
 */
;(function (webrtc) {
  var Phone

  /*
   * Phone constructor
   */
  Phone = function () {
    /*
     * Properties
     */
    this.videoConstraints = true
    /*
     * Private fields
     */
    this._myPhone = null
    this._callSessionTable = {}
    this._callSessionIdCounter = 0
    this._options = {}
    this._stun_servers = []
    this._turn_servers = []
  }
  /*
   * Phone prototype
   */
  Phone.prototype = {
    /*
     * Function initPhone
     * Initializes WebRTC user agent.
     *
     * @param {Function} onRegistered e = { data: data }
     * @param {Function} onPhoneError e = { event: event, data: data }
     * @param {Function} onSessionCreated e = { callSession: callSession }
     * @param {Function} onStatusChanged e = { callSession: callSession }
     */
    initPhone: function (
      configuration,
      onRegistered,
      onPhoneError,
      onSessionCreated,
      onStatusChanged,
      options,
    ) {
      if (this._myPhone) {
        throw new Error('Phone already initialized.')
      }
      var self = this
      this._options = options || {}
      if (this._options.iceOnlyVideo) {
        // hack jssip-0.4.2.js
        JsSIP.UA.configuration_skeleton.stun_servers.writable = true
        JsSIP.UA.configuration_skeleton.turn_servers.writable = true
      }
      if (this._options.userAgent) {
        JsSIP.C.USER_AGENT = this._options.userAgent
      }
      this._myPhone = new JsSIP.UA(configuration)
      if (this._options.registratorExtraHeaders) {
        this._myPhone.registrator.setExtraHeaders(
          this._options.registratorExtraHeaders,
        )
      }
      this._myPhone.on('newRTCSession', function (e) {
        var callSessionId = self._callSessionIdCounter++
        var callSession = new Brekeke.webrtc.CallSession(
          self,
          e,
          callSessionId,
          onStatusChanged,
        )
        self._callSessionTable[callSessionId] = callSession
        if (onSessionCreated) {
          onSessionCreated({
            callSession: callSession,
          })
        }
      })
      this._myPhone.on('registered', function (e) {
        self._stun_servers = self._myPhone.configuration.stun_servers
        self._turn_servers = self._myPhone.configuration.turn_servers
        if (onRegistered) {
          onRegistered({
            data: e.data || {},
          })
        }
      })
      this._myPhone.on('registrationFailed', function (e) {
        if (onPhoneError) {
          onPhoneError({
            event: 'registrationFailed',
            data: e.data || {},
          })
        }
      })
      this._myPhone.on('unregistered', function (e) {
        if (onPhoneError) {
          onPhoneError({
            event: 'unregistered',
            data: e.data || {},
          })
        }
      })
      if (this._options.iceOnlyVideo) {
        // hack jssip-0.4.2.js
        this._myPhone.on('newTransaction', function (e) {
          if (
            e.data &&
            e.data.transaction &&
            e.data.transaction.request &&
            e.data.transaction.request.body
          ) {
            if (e.data.transaction.request.body.indexOf('m=audio') >= 0) {
              self._myPhone.configuration.stun_servers = []
              self._myPhone.configuration.turn_servers = []
            } else {
              self._myPhone.configuration.stun_servers = self._stun_servers
              self._myPhone.configuration.turn_servers = self._turn_servers
            }
          }
        })
      }
      this._myPhone.start()

      this._callSessionTable = {}
      this._callSessionIdCounter = 0
    },
    /*
     * Function finalizePhone
     * Finalizes WebRTC user agent.
     */
    finalizePhone: function () {
      if (this._myPhone) {
        this._myPhone.unregister()
        this._myPhone.stop()
      }
      this._myPhone = null
      this._callSessionTable = {}
      this._callSessionIdCounter = 0
    },
    /*
     * Function makeCall
     */
    makeCall: function (target, mediaConstraints, extraHeaders, sessionOption) {
      if (!this._myPhone) {
        return
      }
      if (mediaConstraints === true) {
        mediaConstraints = { audio: true, video: this.videoConstraints }
      } else if (!mediaConstraints) {
        mediaConstraints = { audio: true, video: false }
      }
      var session = new JsSIP.RTCSession(this._myPhone) // jssip-0.4.2.js: OK, jssip-0.5.0.js: NG
      session.brMediaConstraints = mediaConstraints
      session.brCallSessionOption = sessionOption
      session.connect(target, {
        //this._myPhone.call(target, {
        mediaConstraints: mediaConstraints,
        RTCConstraints: { optional: [{ DtlsSrtpKeyAgreement: 'true' }] },
        extraHeaders: extraHeaders,
        stun_servers:
          this._options.iceOnlyVideo && mediaConstraints.audio
            ? []
            : this._stun_servers,
        turn_servers:
          this._options.iceOnlyVideo && mediaConstraints.audio
            ? []
            : this._turn_servers,
      })
    },
    /*
     * Function getCallSession
     */
    getCallSession: function (id) {
      return this._callSessionTable[id]
    },
    /*
     * Function getCallSessionsCount
     */
    getCallSessionsCount: function () {
      return Object.keys(this._callSessionTable).length
    },
    /*
     * Function getCallSessionTable
     */
    getCallSessionTable: function () {
      var callSessionTable = {}
      for (var id in this._callSessionTable) {
        callSessionTable[id] = this._callSessionTable[id]
      }
      return callSessionTable
    },
  }

  webrtc.Phone = Phone
})(Brekeke.webrtc)

/*
 * Class Brekeke.webrtc.CallSession
 */
;(function (webrtc) {
  var CallSession

  /*
   * CallSession constructor
   */
  CallSession = function (phone, e, id, onStatusChanged) {
    /*
     * Private fields
     */
    this._phone = phone
    this._session = e.data.session
    this._status = e.data.originator === 'remote' ? 'incoming' : 'dialing'
    this._statusData = {}
    this._statusData[this._status] = e.data
    this._id = id
    this._option = e.data.session.brCallSessionOption || {}
    this._onStatusChanged = onStatusChanged
    this._mediaConstraints = e.data.session.brMediaConstraints || {
      audio: false,
      video: false,
    }
    if (
      e.data.originator === 'remote' &&
      e.data.request.body.indexOf('m=audio') >= 0
    ) {
      this._mediaConstraints.audio = true
    }
    if (
      e.data.originator === 'remote' &&
      e.data.request.body.indexOf('m=video') >= 0
    ) {
      this._mediaConstraints.video = this._phone.videoConstraints
    }

    /*
     * Initialize
     */
    var self = this
    this._session.on('accepted', function (e) {
      self._status = 'answered'
      self._statusData[self._status] = e.data
      self._fireStatusChangedEvent()
    })
    this._session.on('progress', function (e) {
      if (e.data.originator === 'remote') {
        self._status = 'in-progress'
        self._statusData[self._status] = e.data
        self._fireStatusChangedEvent()
      }
    })
    this._session.on('failed', function (e) {
      delete self._phone._callSessionTable[self._id]
      self._status = 'terminated'
      self._statusData[self._status] = e.data
      self._fireStatusChangedEvent()
    })
    this._session.on('ended', function (e) {
      delete self._phone._callSessionTable[self._id]
      self._status = 'terminated'
      self._statusData[self._status] = e.data
      self._fireStatusChangedEvent()
    })
  }
  /*
   * CallSession prototype
   */
  CallSession.prototype = {
    /*
     * Function answer
     */
    answer: function (mediaConstraints) {
      if (mediaConstraints) {
        this._mediaConstraints = {
          audio: mediaConstraints.audio || false,
          video: mediaConstraints.video || false,
        }
      }
      this._session.answer({
        mediaConstraints: this._mediaConstraints,
      })
      this._status = 'answering'
      this._fireStatusChangedEvent()
    },
    /*
     * Function hangUp
     */
    hangUp: function () {
      this._session.terminate()
    },
    /*
     * Function micOnOff (Obsolete)
     */
    micOnOff: function () {
      if (this._mediaConstraints.audio) {
        return (this._session.rtcMediaHandler.localMedia.getAudioTracks()[0].enabled =
          !this._session.rtcMediaHandler.localMedia.getAudioTracks()[0].enabled)
      } else {
        return false
      }
    },
    /*
     * Function muteMicrophone
     */
    muteMicrophone: function (muted) {
      if (muted) {
        this._session.mute({ audio: true, video: false })
      } else {
        this._session.unmute({ audio: true, video: false })
      }
    },
    /*
     * Function videoOnOff (Obsolete)
     */
    videoOnOff: function () {
      if (this._mediaConstraints.video) {
        return (this._session.rtcMediaHandler.localMedia.getVideoTracks()[0].enabled =
          !this._session.rtcMediaHandler.localMedia.getVideoTracks()[0].enabled)
      } else {
        return false
      }
    },
    /*
     * Function muteCamera
     */
    muteCamera: function (muted) {
      if (muted) {
        this._session.mute({ audio: false, video: true })
      } else {
        this._session.unmute({ audio: false, video: true })
      }
    },
    /*
     * Function sendDTMF
     */
    sendDTMF: function (tone) {
      this._session.sendDTMF(tone)
    },
    /*
     * Function getStatusData
     */
    getStatusData: function (status) {
      return this._statusData[status]
    },
    /*
     * Property id
     */
    get id() {
      return this._id
    },
    /*
     * Property mediaConstraints
     */
    get mediaConstraints() {
      return this._mediaConstraints
    },
    /*
     * Property peerUser
     */
    get peerUser() {
      // remote peer's user id (= remote PBX extension number)
      return this._session.remote_identity.uri.user
    },
    /*
     * Property direction
     */
    get direction() {
      return this._session.direction
    },
    /*
     * Property status
     */
    get status() {
      return this._status
    },
    /*
     * Property streamURL
     */
    get streamURL() {
      if (this._session.getRemoteStreams().length > 0) {
        return window.URL.createObjectURL(this._session.getRemoteStreams()[0])
      } else {
        return ''
      }
    },
    /*
     * Property localStreamURL
     */
    get localStreamURL() {
      if (this._session.getLocalStreams().length > 0) {
        return window.URL.createObjectURL(this._session.getLocalStreams()[0])
      } else {
        return ''
      }
    },
    /*
     * Property option
     */
    get option() {
      return this._option
    },
    /*
     * Event StatusChanged
     */
    setStatusChangedEventHandler: function (onStatusChanged) {
      this._onStatusChanged = onStatusChanged
    },
    _fireStatusChangedEvent: function () {
      if (this._onStatusChanged) {
        this._onStatusChanged({
          callSession: this,
        })
      }
    },
  }

  webrtc.CallSession = CallSession
})(Brekeke.webrtc)
