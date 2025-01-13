import RNFS from 'react-native-fs'

import { RnAsyncStorage } from '../../components/Rn'
import { CallHistory } from '../call/CallHistory'
import { CallHistory2 } from '../call/CallHistory2'
import { Notification } from '../common/Notification'
import { i18n } from '../i18n'
import type { LoginParams } from '../octypes'
import { OCUtil } from '../OCUtil'
import { QuickBusy_ver2 } from '../runtime/QuickBusy_ver2'
import { Util } from '../Util'
import { Campon } from './Campon'

export class SystemSettingsData {
  _OperatorConsoleAsParent
  _Data
  _camponTimeoutMillis
  constructor(operatorConsoleAsParent) {
    this._OperatorConsoleAsParent = operatorConsoleAsParent
    this._Data = {}
    this._setDefaultDatas()
  }

  getAutoDialMaxDisplayCount() {
    return this._Data.autoDialMaxSaveCount
  }

  getAutoDialMaxSaveCount() {
    return this._Data.autoDialMaxSaveCount
  }

  getQuickBusyClickToCall() {
    return this._Data.quickBusyClickToCall
  }

  getAutoDialRecentDisplayOrder() {
    return this._Data.autoDialRecentDisplayOrder
  }

  getAutoDialPhonebookName() {
    return this._Data.autoDialPhonebookName
  }

  /**
   *
   * @param eventArgs     const arg ={
   *             errorCode : UCCAC_UCCAC_INIT_ERRORS.loadResourceFailed,
   *             errorResourcePath : resourcePath,
   *             errorEvent:ev
   *         }
   * @private
   */
  _onBeginSetSystemSettingsDataFail(eventArgs, initFailFunction) {
    // for( let i = 0; i < eventArgs.length; i++ ){
    //     const ea = eventArgs[i];
    //     console.error("Failed to UC chat agent component initialization. errorCode=" + ea.errorCode + ",resourcePath=" + ea.errorResourcePath + ",errorEvent=" , ea.errorEvent );
    //     const message = i18n.t("FailedToUCCACInitialization") + " errorCode=" + ea.errorCode + ",resourcePath=" + ea.errorResourcePath + ",errorEvent=" + ea.errorEvent;
    //     Notification.error({message: message, duration:0 });
    // }
    initFailFunction(eventArgs)
  }

  _onBeginSetSystemSettingsDataSuccess(appData, initSuccessFunction) {
    // cache ringtone files
    const ringtoneInfos = appData.ringtoneInfos
    SystemSettingsData.cacheRingtones(ringtoneInfos)

    // !modify systemSettingsData
    this._Data.autoDialMaxDisplayCount = appData.autoDialMaxDisplayCount
    this._Data.autoDialMaxSaveCount = appData.autoDialMaxSaveCount
    this._Data.camponTimeoutSeconds = appData.camponTimeoutSeconds
    this._Data.shortDials = appData.shortDials
    this._Data.ringtoneInfos = appData.ringtoneInfos
    this._Data.quickBusyClickToCall = appData.quickBusyClickToCall
    this._Data.ucUrl = appData.ucUrl
    this._Data.ucChatAgentComponentEnabled = appData.ucChatAgentComponentEnabled
      ? '1'
      : '0'
    this._Data.phoneTerminal = appData.phoneTerminal
    this._Data.extensionScript = appData.extensionScript
    this._camponTimeoutMillis = appData.camponTimeoutSeconds * 1000
    this._Data.autoDialRecentDisplayOrder = appData.autoDialRecentDisplayOrder
    this._Data.autoDialPhonebookName = appData.autoDialPhonebookName
    initSuccessFunction()
  }

  _onBeginSetSystemSettingsData(
    appData,
    initSuccessFunction,
    initFailFunction,
  ) {
    const this_ = this
    const startInit =
      this._OperatorConsoleAsParent.onBeginSetSystemSettingsData(
        appData,
        this,
        () => {
          this_._onBeginSetSystemSettingsDataSuccess(
            appData,
            initSuccessFunction,
          )
        },
        e => {
          this_._onBeginSetSystemSettingsDataFail(e, initFailFunction)
        },
      )
    return startInit
  }

  static async cacheRingtones(ringtoneInfos) {
    // cache ringtone files
    if (!ringtoneInfos || Array.isArray(ringtoneInfos) !== true) {
      return -1
    }
    if (ringtoneInfos.length === 0) {
      return 0
    }

    const sLastLoginAccount = await RnAsyncStorage.getItem('lastLoginAccount')

    if (sLastLoginAccount) {
      const lastLoginAccount: LoginParams = JSON.parse(sLastLoginAccount)

      if (
        !lastLoginAccount['pbxDirectoryName'] ||
        lastLoginAccount['pbxDirectoryName'].length === 0
      ) {
        lastLoginAccount['pbxDirectoryName'] = 'pbx'
      }

      const rootUrl = `https://${lastLoginAccount.hostname}:${lastLoginAccount.port}/${lastLoginAccount.pbxDirectoryName}/etc/operator-console`
      try {
        await Promise.all(
          ringtoneInfos.map(async ringtoneInfo => {
            const fileOrUrl = ringtoneInfo.ringtoneFilepathOrFileurl
            const fileUrl = OCUtil.getUrlStringFromPathOrUrl(fileOrUrl, rootUrl)
            console.log('#Duy Phan console fileUrl save', fileUrl, fileOrUrl)
            const httpStatus = await Util.getHeadResposneCodeByUrl(fileUrl)

            if (httpStatus !== 200) {
              console.error(
                'Failed to load ringtone audio file. fileUrl=' +
                  fileUrl +
                  ',httpStatusCode=' +
                  httpStatus,
              )
              Notification.error({
                message:
                  i18n.t('FailedToLoadRingtoneAudioFile') +
                  ',fileUrl=' +
                  fileUrl +
                  ',httpStatusCode=' +
                  httpStatus,
                duration: 0,
              })
            } else {
              const filename = fileUrl.split('/').pop()
              const filePath = `${RNFS.DocumentDirectoryPath}/${filename}`
              console.log('#Duy Phan console filePath', filePath)
              const isExist = RNFS.exists(filePath)
              console.log('#Duy Phan console isExist', isExist)
              // if (!isExist) {
              await RNFS.downloadFile({
                fromUrl: fileUrl,
                toFile: filePath,
              }).promise // cache audio file
              // }
            }
          }),
        )
        // Notification.success({ message: 'Ringtone already!' })
      } catch (e) {
        console.log('#Duy Phan console error', e)
      }
    }
  }

  setSystemSettingsDataData(appData, initSuccessFunction, initFailFunction) {
    appData = this._formatSystemSettingsAppData(appData)

    const startInit = this._onBeginSetSystemSettingsData(
      appData,
      initSuccessFunction,
      initFailFunction,
    )
    return startInit
  }

  getExtensionScript() {
    return this._Data.extensionScript
  }

  getData() {
    return this._Data
  }

  _setDefaultDatas() {
    this._camponTimeoutMillis = Campon.getDefaultCamponTimeoutMilliSeconds()

    this._Data.autoDialMaxDisplayCount = CallHistory.getDefaultMaxDisplayCount()
    this._Data.autoDialMaxSaveCount = CallHistory.getDefaultMaxSaveCount()
    this._Data.camponTimeoutMillis =
      Campon.getDefaultCamponTimeoutMilliSeconds()
    this._Data.camponTimeoutSeconds = this._camponTimeoutMillis / 1000
    this._Data.quickBusyClickToCall = true
    this._Data.shortDials = null
    this._Data.ringtoneInfos = null
    this._Data.ucUrl = ''
    this._Data.ucChatAgentComponentEnabled = false
    this._Data.extensionScript = ''
    this._Data.phoneTerminal = 'phoneTerminal_webphone'
    this._Data.autoDialRecentDisplayOrder =
      CallHistory2.RECENT_DISPLAY_ORDERS.CALL_OR_INCOMING_COUNT_DESC
    this._Data.autoDialPhonebookName = ''
  }

  getShortDials() {
    return this._Data.shortDials
  }

  getRingtoneInfos() {
    return this._Data.ringtoneInfos
  }

  getCamponTimeoutMillis() {
    return this._camponTimeoutMillis
  }

  getUcUrl() {
    return this._Data.ucUrl
  }

  getUcChatAgentComponentEnabled() {
    return this._Data.ucChatAgentComponentEnabled
  }

  getPhoneTerminal() {
    return this._Data.phoneTerminal
  }

  _formatSystemSettingsAppData(appData) {
    if (!appData) {
      appData = {}
    }
    appData.autoDialMaxDisplayCount = appData.autoDialMaxDisplayCount
      ? appData.autoDialMaxDisplayCount
      : CallHistory.getDefaultMaxDisplayCount()
    appData.autoDialMaxSaveCount = appData.autoDialMaxSaveCount
      ? appData.autoDialMaxSaveCount
      : CallHistory.getDefaultMaxSaveCount()
    appData.camponTimeoutSeconds = appData.camponTimeoutSeconds
      ? appData.camponTimeoutSeconds
      : Campon.getDefaultCamponTimeoutMilliSeconds()
    appData.shortDials = appData.shortDials ? appData.shortDials : null
    appData.ringtoneInfos = appData.ringtoneInfos ? appData.ringtoneInfos : null
    appData.quickBusyClickToCall = appData.quickBusyClickToCall
      ? appData.quickBusyClickToCall
      : QuickBusy_ver2.getDefaultQuickBusyClickToCall()
    appData.ucUrl = appData.ucUrl ? appData.ucUrl : ''
    appData.ucChatAgentComponentEnabled =
      appData.ucChatAgentComponentEnabled === true ? true : false
    appData.extensionScript = appData.extensionScript
      ? appData.extensionScript
      : ''
    appData.phoneTerminal = appData.phoneTerminal
      ? appData.phoneTerminal
      : 'phoneTerminal_webphone'
    appData.autoDialRecentDisplayOrder =
      CallHistory2.parseAutoDialRecentDisplayOrderForce(
        appData.autoDialRecentDisplayOrder,
      )
    appData.autoDialPhonebookName = appData.autoDialPhonebookName
      ? appData.autoDialPhonebookName
      : ''
    return appData
  }
}
