import { UccacAc } from './UccacAc'

// !require script ucchatwidget.js
export class Uccac {
  _state: number
  _isUcagentwidgetJsLoading: boolean
  _isUccacUtilJsLoading: boolean
  _uccacMaxNo: number
  _ucUrl: string | null = null
  _onInitFailFunctionForUser
  _onInitSuccessFunctionForUser
  _UccacAcs: { [key: string]: UccacAc }
  constructor() {
    this._state = UCCAC_UCCAC_STATES.deinit
    this._isUcagentwidgetJsLoading = false
    this._isUccacUtilJsLoading = false
    this._UccacAcs = {}
    this._uccacMaxNo = -1
  }

  _initScripts() {
    this._state = UCCAC_UCCAC_STATES.init
    this._onInitSuccessFunctionForUser()
  }

  init(options) {
    if (this._state !== UCCAC_UCCAC_STATES.deinit) {
      return false
    }

    this._state = UCCAC_UCCAC_STATES.initing
    const ucUrl = options['ucUrl']

    this._ucUrl = ucUrl
    this._onInitFailFunctionForUser = options['onInitFailFunction']
    this._onInitSuccessFunctionForUser = options['onInitSuccessFunction']

    this._initScripts()
    return true
  }

  getUcurl() {
    return this._ucUrl
  }

  addUccacAc() {
    if (this._state !== UCCAC_UCCAC_STATES.init) {
      return null
    }

    this._uccacMaxNo++
    const uccacAc = new UccacAc(this, this._uccacMaxNo)
    this._UccacAcs[uccacAc.getUccacAcNo()] = uccacAc
    return uccacAc
  }

  getUccacAc(uccacAcNo) {
    const uccacAc = this._UccacAcs[uccacAcNo]
    return uccacAc
  }

  deinitAndRemoveUccacAc(uccacAcNo) {
    const uccacAc = this.getUccacAc(uccacAcNo)
    if (!uccacAc) {
      return false
    }
    uccacAc.deinit()
    delete this._UccacAcs[uccacAcNo]
    return true
  }

  // deinit( options ) {
  deinit() {
    if (this._state !== UCCAC_UCCAC_STATES.init) {
      return false
    }

    this._state = UCCAC_UCCAC_STATES.deiniting

    const ents = Object.entries(this._UccacAcs)
    ents.forEach(([uccacAcNo, uccacAc], index) => {
      uccacAc.deinit()
    })

    // clear
    for (const uccacAcNo in this._UccacAcs) {
      delete this._UccacAcs[uccacAcNo]
    }
    this._ucUrl = null
    this._onInitFailFunctionForUser = null
    this._onInitSuccessFunctionForUser = null
    this._state = UCCAC_UCCAC_STATES.deinit

    return true
  }

  getState() {
    return this._state
  }
}

const UCCAC_UCCAC_STATES = {
  deinit: 0,
  deiniting: 1,
  initing: 2,
  init: 3,
}
