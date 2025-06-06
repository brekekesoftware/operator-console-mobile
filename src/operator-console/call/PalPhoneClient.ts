import debounce from 'debounce'
import lodash from 'lodash'

import { Notification } from '../common/Notification'
import { i18n } from '../i18n'
import { PalWrapper } from '../lib/PalWrapper'
import { APhoneClient } from './APhoneClient'
import { PalCallInfos } from './PalCallInfos'

export class PalPhoneClient extends APhoneClient {
  _pal
  _PalWrapper
  _PalCallInfos
  lineEvents
  parkEvents
  statusEvents
  constructor(options) {
    super(options)
    this._pal = null
    this._PalWrapper = new PalWrapper()

    const options_ = { ...options }
    options_['phoneClient'] = this
    this._PalCallInfos = new PalCallInfos(options_)
  }

  /**
   *  overload method
   * @returns {boolean}
   */
  isPalReady() {
    return !!this._pal
  }

  /**
   *  overload method
   * @returns {*}
   */
  getCallInfos() {
    return this._PalCallInfos
  }

  /**
   *  overload method
   * @param tenant
   * @param user
   * @param talker_id
   * @returns {Promise<*>}
   */
  async bargeAsync(tenant, user, talker_id): Promise<any> {
    // !testit
    const iTalkerId = parseInt(talker_id)
    const options = {
      tenant,
      user,
      target: iTalkerId,
      listen: true,
      speak: false,
    }
    const promise = new Promise((resolve, reject) => {
      this._pal.barge(
        options,
        (res, obj) => {
          // !forbug //!check //!testit error message
          resolve(res)
        },
        err => {
          reject(err)
        },
      )
    })
    return promise
  }

  /**
   *  override mothod
   * @param options
   */

  initPhoneClient(options) {
    this.statusEvents = new Array()
    this.parkEvents = new Array()
    this.lineEvents = new Array()

    super.initPhoneClient(options)
    const onInitSuccessFunction = options['onInitSuccessFunction']
    const this_ = this
    const initPalWrapperOptions = {
      pbxHost: options.hostname,
      pbxPort: options.port,
      secure_login_password: false, // !important skip loading md5.js
      onInitFailFunction(ev) {
        console.error('Failed to init PalWrapper eventArg=' + ev)
        // !fixit call onInitFailFunction
      },
    }
    const successFunction = () => {
      const getPalOptions = {
        tenant: options.tenant,
        login_user: options.username,
        login_password: options.password,
        user: '*',
        line: '*',
        callrecording: 'self',
        voicemail: 'self',
        park: '*',
        status: true,
        registered: 'self',
        secure_login_password: false,
      }
      const pal = this_._PalWrapper.getPal(getPalOptions)
      pal.debugLevel = 2

      pal.onClose = function () {
        console.log('Pal closed.')
        // this_._PalWrapper.deinitPalWrapper();
        // this_.setState({isSigningin:false});
        this_._pal = null
      }
      pal.onError = function (err) {
        // !fixit pal login error bug
        console.error('Pal error occurred.', err)
        // pal.close();
      }

      // !fixit pal bug
      pal.login(
        (res, obj) => {
          const tenant = options.tenant
          const getExtensionsOptions = {
            tenant,
            pattern: '..*',
            limit: -1,
            type: 'user',
            property_names: ['name'],
            offset: 0,
          }
          pal.getExtensions(
            getExtensionsOptions,
            (res, obj) => {
              const oExtensions = res.map(([id, name]) => ({ id, name }))
              // this_.setState({isSigningin: false});
              this_._pal = pal
              onInitSuccessFunction(oExtensions)
            },
            error => {
              console.error('Faild to getExtensionProperties. error=', error)
              pal.close()
              // !fixit call oninitFailFunction
            },
          )
        },
        ev => {
          console.error('Faild to login. eventArg=', ev)
          pal.close()
          // !fixit call oninitFailFunction
        },
      )
      pal.notify_serverstatus = function (param) {
        pal.printDebug('*** serverstatus ***')
        pal.printDebug(param)
      }
      pal.notify_status = function (param) {
        pal.printDebug('*** status ***')
        pal.printDebug(param)
        this_.statusEvents.push(param)
        this_.flushStatusEvents()
        // last_talker_id = param.talker_id;
      }
      pal.notify_voicemail = function (param) {
        pal.printDebug('*** voicemail ***')
        pal.printDebug(param)
      }
      pal.notify_registered = function (param) {
        pal.printDebug('*** registered ***')
        pal.printDebug(param)
      }
      pal.notify_park = function (param) {
        pal.printDebug('*** park ***')
        pal.printDebug(param)
        this_.parkEvents.push(param)
        this_.flushParkEvents()
      }
      pal.notify_line = function (param) {
        pal.printDebug('*** line ***')
        pal.printDebug(param)
        this_.lineEvents.push(param)
        this_.flushLineEvents()
      }
      pal.notify_callrecording = function (param) {
        pal.printDebug('*** callrecording ***')
        pal.printDebug(param)
      }
      pal.notify_queue = function (param) {
        // !for PBX version 3.6 or later
        pal.printDebug('*** notify_queue ***')
        pal.printDebug(param)
      }
    }
    this._PalWrapper.initPalWrapper(initPalWrapperOptions)
    successFunction()
  }

  // statusEvents = [];
  flushStatusEvents = debounce(() => {
    console.log('pal.notify_status', this.statusEvents)
    this._flushStatusEvents()
    // this._flushLineStatusEvents();
    this.statusEvents = []
  }, 250)
  // statusEvents = [];
  // flushStatusEvents = () => {
  //     console.log('pal.notify_status', this.statusEvents);
  //     this._flushExtensionStatusEvents();
  //     //this._flushLineStatusEvents();
  //     this.statusEvents = [];
  // };

  _flushStatusEvents() {
    const extensionsStatus = {
      ...this._OperatorConsoleAsParent.getExtensionsStatus(),
    }
    let monitoringExtension =
      this._OperatorConsoleAsParent.getMonitoringExtension()

    for (const e of this.statusEvents) {
      // this.old_notify_status && this.old_notify_status(e)
      this._PalCallInfos.onFlushPalNofityStatusEventByPalPhoneClient(e)

      let status = 'hanging'
      switch (e.status) {
        case '14':
        case '2':
        case '36':
          status = 'talking'
          break
        case '35':
          status = 'holding'
          break
        case '-1':
          status = 'hanging'
          break
        case '1':
          status = 'calling'
          break
        case '65':
          status = 'ringing'
          break
        default:
          break
      }

      // //!temp
      // const callById = this.state.callById;
      // const call = Object.values(this.state.callById).find(
      //     (call) => {
      //         //const b = call.pbxRoomId === e.room_id && call.pbxTalkerId === e.talker_id;
      //         const b = call.pbxRoomId === e.room_id;
      //         if( call.pbxRoomId ){
      //             console.log( "//!temp call.pbxRoomId=" + call.pbxRoomId );
      //         }
      //         return b;
      //     }
      // );
      // if( call ) {
      //     const callIndex = this.state.callIds.indexOf(call.id);
      //     const temp = 0; //!temp
      // }

      const path = `${e.user}.callStatus.${e.talker_id}`
      if (status === 'hanging') {
        lodash.unset(extensionsStatus, path)
        if (e.user === monitoringExtension) {
          monitoringExtension = ''
        }
        this._OperatorConsoleAsParent
          .getExtensionsStatusInstance()
          .onDeleteExtensionStatusProperty(
            this,
            extensionsStatus,
            path,
            status,
            e,
          ) // !bad //!fixit
      } else {
        lodash.set(extensionsStatus, path, status)
        this._OperatorConsoleAsParent
          .getExtensionsStatusInstance()
          .onSetExtensionStatusProperty(this, extensionsStatus, path, status, e) // !bad //!fixit
      }

      // const options = {
      //     event : e
      // }
      // this._OperatorConsoleAsParent.onPalNotifyStatus(options);   //!bad //!fixit
    }

    this._OperatorConsoleAsParent.setExtensionsStatusAndMonitoringExtension(
      extensionsStatus,
      monitoringExtension,
    )
  }

  flushLineEvents = debounce(() => {
    console.log('pal.notify_line', this.lineEvents)

    const linesStatus = { ...this._OperatorConsoleAsParent.getLinesStatus() }
    let usingLine = this._OperatorConsoleAsParent.getUsingLine()

    for (const e of this.lineEvents) {
      if (e.status == 'on') {
        linesStatus[e.line] = e
      } else if (e.status == 'off') {
        lodash.unset(linesStatus, e.line)
        usingLine = usingLine === e.line ? '' : usingLine
      }
    }

    this._OperatorConsoleAsParent.setLinesStatusAndUsingLine(
      linesStatus,
      usingLine,
    )
    this.lineEvents = []
  }, 250)

  // parkEvents = [];
  flushParkEvents = debounce(() => {
    console.log('pal.notify_park', this.parkEvents)

    const parksStatus = { ...this._OperatorConsoleAsParent.getParksStatus() }
    const myParksStatus = {
      ...this._OperatorConsoleAsParent.getMyParksStatus(),
    }

    for (const e of this.parkEvents) {
      if (e.status == 'on') {
        parksStatus[e.park] = e
      } else if (e.status == 'off') {
        lodash.unset(parksStatus, e.park)
        lodash.unset(myParksStatus, e.park)
      }

      this._OperatorConsoleAsParent.setParksStatusAndMyParksStatus(
        parksStatus,
        myParksStatus,
      )
      this.parkEvents = []
    }
  }, 250)

  onDisconnectByPalCallInfo(callInfoAsCaller) {
    const callId = callInfoAsCaller.getCallId()
    this.getCallInfos().onEndCallByPhoneClient(callId)
  }

  /**
   *  override method
   */
  deinitPhoneClient() {
    if (this._pal) {
      this._pal.close()
    }
    this._PalWrapper.deinitPalWrapper()
    super.deinitPhoneClient()
  }

  /**
   *  overload method
   * @param tenant
   * @param dialing
   * @param talkerId
   * @param mode
   * @returns {Promise<*>}
   */
  async transferAsync(tenant, dialing, talkerId, mode): Promise<any> {
    // !testit
    const options = {
      user: dialing,
      tid: talkerId,
      mode,
    }
    if (tenant !== undefined && tenant !== null) {
      options['tenant'] = tenant
    }
    const promise = new Promise((resolve, reject) => {
      this._pal.transfer(
        options,
        (res, obj) => {
          // !forbug //!check //!testit error message
          resolve(res)
        },
        err => {
          reject(err)
        },
      )
    })
    return promise
  }

  /**
   *  overload method
   * @param tenant
   * @param talker_id
   * @param signal
   */
  sendDTMF(tenant, talker_id, signal) {
    const sendDTMFOptions = {
      signal,
      tenant,
      talker_id,
    }

    this._pal.sendDTMF(
      sendDTMFOptions,
      (res, obj) => {},
      err => {
        console.error('Failed to send DTMF err=', err)
        Notification.error({
          message: i18n.t('failedToSendDTMF') + '\r\n' + err,
          duration: 0,
        })
      },
    )
  }

  /**
   *  overload method
   * @param tenant
   * @param talkerId
   * @param number
   * @returns {Promise<*>}
   */
  async parkAsync(tenant, talkerId, number): Promise<any> {
    const options = {
      tenant,
      tid: talkerId,
      number,
    }

    const promise = new Promise((resolve, reject) => {
      this._pal.park(
        options,
        (res, obj) => {
          // !forbug //!check //!testit error message
          resolve(res)
        },
        err => {
          reject(err)
        },
      )
    })
    return promise
  }

  /**
   *  overload method
   * @param line
   * @param status
   * @returns {Promise<*>}
   */
  async lineAsync(line, status): Promise<any> {
    const options = {
      line,
      status,
    }

    const promise = new Promise((resolve, reject) => {
      this._pal.line(
        options,
        (res, obj) => {
          resolve(res)
        },
        err => {
          reject(err)
        },
      )
    })
    return promise
  }

  // getAdminExtensionPropertiesPromise( tenant, extension ){
  //     const options = {
  //         tenant: tenant,
  //         extension: [ extension ],   //!testit array ok?
  //         property_names: ["admin"]
  //     };
  //     const promise = new Promise( (resolve, reject ) =>{
  //         this._pal.transfer(
  //             options,
  //             function( res, obj ){
  //                 //!forbug //!check //!testit error message
  //                 resolve(res);
  //             },
  //             function( err ){
  //                 reject( err );
  //             }
  //         );
  //     });
  //     return promise;
  // }

  /**
   *  overload method
   * @param sDialing
   * @param bUsingLine
   * @returns {boolean}
   */
  callByPhoneClient(sDialing, usingLine) {
    const user = this._OperatorConsoleAsParent.getLoggedinUsername()
    const options = {
      user,
      from: user,
      to: sDialing,
      type: '2',
      phone: PalPhoneClient.PHONE_INDEX.toString(),
      auto_answer: 'true',
    }
    if (usingLine) {
      options['line'] = usingLine // !forbug //!check //!testit
    }

    const promise = new Promise((resolve, reject) => {
      this._pal.makeCall(
        options,
        (res, obj) => {
          resolve(res)
        },
        err => {
          reject(err)
        },
      )
    })
    return promise
  }

  unhold(palCallInfo, onOkFunc, onErrorFunc) {
    const tenant = this._OperatorConsoleAsParent.getLoggedinTenant()
    const talkerId = palCallInfo.getPbxTalkerId()
    this._pal.unhold({ tenant, tid: talkerId }, onOkFunc, onErrorFunc)
  }

  hold(palCallInfo, onOkFunc, onErrorFunc) {
    const tenant = this._OperatorConsoleAsParent.getLoggedinTenant()
    const talkerId = palCallInfo.getPbxTalkerId()
    this._pal.hold({ tenant, tid: talkerId }, onOkFunc, onErrorFunc)
  }

  stopRecording(palCallInfo, onOkFunc, onErrorFunc) {
    const tenant = this._OperatorConsoleAsParent.getLoggedinTenant()
    const talkerId = palCallInfo.getPbxTalkerId()
    this._pal.stopRecording({ tenant, tid: talkerId }, onOkFunc, onErrorFunc)
  }

  startRecording(palCallInfo, onOkFunc, onErrorFunc) {
    const tenant = this._OperatorConsoleAsParent.getLoggedinTenant()
    const talkerId = palCallInfo.getPbxTalkerId()
    this._pal.startRecording({ tenant, tid: talkerId }, onOkFunc, onErrorFunc)
  }

  hangup(palCallInfo, onOkFunc, onErrorFunc) {
    const tenant = this._OperatorConsoleAsParent.getLoggedinTenant()
    const talkerId = palCallInfo.getPbxTalkerId()
    const options = { tid: talkerId }
    this._pal.disconnect(options, onOkFunc, onErrorFunc)
  }

  answerCall(palCallInfo, onOkFunc, onErrorFunc) {
    const tenant = this._OperatorConsoleAsParent.getLoggedinTenant()
    const talkerId = palCallInfo.getPbxTalkerId()
    const options = { tenant, talker_id: talkerId, action: 'talk' }
    this._pal.remoteControl(options, onOkFunc, onErrorFunc)
  }

  conference(palCallInfo, onOkFunc, onErrorFunc) {
    const tenant = this._OperatorConsoleAsParent.getLoggedinTenant()
    const talkerId = palCallInfo.getPbxTalkerId()
    const options = { tenant, talker_id: talkerId, action: 'talk' }
    this._pal.conference(options, onOkFunc, onErrorFunc)
  }

  static PHONE_INDEX = 1
}
