import { SystemSettingsInfo } from './SystemSettingsInfo'

export class OCNoteInfo {
  _SystemSettingsInfo
  constructor(options) {
    const systemSettingsInfoOptions = {}
    this._SystemSettingsInfo = new SystemSettingsInfo(systemSettingsInfoOptions)
  }
}
