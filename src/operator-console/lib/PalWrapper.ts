if (CryptoJS === undefined) {
  var CryptoJS = undefined
}
export class PalWrapper {
  _state: number
  _pbxHost: string | null
  _pbxPort: string | null
  _pbxUrl: string | null = null
  _pbxUrlEndsWithSlash: string | null = null
  static PALWRAPPER_STATES = {
    deinit: 0,
    //    deiniting : 1,
    initing: 2,
    init: 3,
  }
  static PALWRAPPER_INIT_ERRORS = {
    loadResourceFailed: 1,
  }
  constructor() {
    this._state = PalWrapper.PALWRAPPER_STATES.deinit
    this._pbxHost = null
    this._pbxPort = null
  }

  getState() {
    return this._state
  }

  getPbxHost() {
    return this._pbxHost
  }

  getPbxPort() {
    return this._pbxPort
  }

  initPalWrapper(options) {
    if (this._state !== PalWrapper.PALWRAPPER_STATES.deinit) {
      console.log('#Duy Phan console deinit')
      return false
    }
    this._state = PalWrapper.PALWRAPPER_STATES.initing
    this._pbxHost = options['pbxHost']
    this._pbxPort = options['pbxPort']

    let pbxUrl = 'https://' + this._pbxHost
    if (this._pbxPort !== undefined) {
      pbxUrl += ':' + this._pbxPort
    }
    console.log('#Duy Phan console options', options)
    let pbxDirectoryName = options['pbxDirectoryName']
    if (!pbxDirectoryName || pbxDirectoryName.length === 0) {
      pbxDirectoryName = 'pbx' // !default
    }
    pbxUrl += '/' + pbxDirectoryName
    this._pbxUrl = pbxUrl
    this._pbxUrlEndsWithSlash = pbxUrl + '/'
    this._pbxUrlEndsWithSlash = this._pbxUrl + '/'

    return true
  }

  _deinitMain() {
    this._pbxHost = null
    this._pbxPort = null
    this._pbxUrl = null
    this._pbxUrlEndsWithSlash = null

    this._state = PalWrapper.PALWRAPPER_STATES.deinit
  }

  deinitPalWrapper() {
    if (this._state !== PalWrapper.PALWRAPPER_STATES.init) {
      return false
    }

    this._deinitMain()

    return true
  }

  getPal(options) {
    if (this._state !== PalWrapper.PALWRAPPER_STATES.init) {
      return null
    }

    const pal = this._getPal(options)
    return pal
  }

  _getPal(options) {
    let wsUri = this._pbxUrlEndsWithSlash + 'ws'
    const iProtocol = this._pbxUrlEndsWithSlash?.indexOf('://') ?? -1
    wsUri = wsUri.substring(iProtocol)
    if (
      this._pbxUrlEndsWithSlash?.startsWith('https:') ||
      this._pbxUrlEndsWithSlash?.startsWith('HTTPS:')
    ) {
      wsUri = 'wss' + wsUri
    } else {
      wsUri = 'ws' + wsUri
    }
    // !example wss://127.0.0.1:8443/pbx/ws
    const pal = window.Brekeke.pbx.getPal(wsUri, options)
    return pal
  }
}
