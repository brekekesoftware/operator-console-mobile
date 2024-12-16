import type { BrekekeOperatorConsole } from '../OperatorConsole'

export class ExtensionsStatus {
  _operatorConsoleAsParent: BrekekeOperatorConsole
  constructor(operatorConsoleAsParent: BrekekeOperatorConsole) {
    this._operatorConsoleAsParent = operatorConsoleAsParent
    // this.__ExtensionsStatuses = {};
    // this._OnSetExtensionStatusCallbacks = [];
    // this._OnDeleteExtensionStatusCallbacks = [];
  }

  getOperatorConsoleAsParent() {
    return this._operatorConsoleAsParent
  }

  // onFlushExtensionStatusEvents( operatorConsoleAsCaller, statusEvents ){
  //     for( let i = 0; i < statusEvents.length; i++ ){
  //         const statusEvent = statusEvents[i];
  //         this._onFlushExtensionStatusEvent( statusEvent );
  //     }
  // }

  // _onFlushExtensionStatusEvent( statusEvent ){
  //     let isDisconnect = false;
  //     switch (statusEvent.status) {
  //         case '-1':
  //             isDisconnect = true;
  //         break;
  //     }
  //     const path = `${statusEvent.user}.callStatus.${statusEvent.talker_id}`
  //
  //     for( let i = 0; i < this._OnBeginExtensionStatusEventCallbacks.length; i++ ){
  //         const func = this._OnBeginExtensionStatusEventCallbacks[i];
  //         func( this, path );
  //     }
  //
  //     if ( isDisconnect ) {
  //         deleteProperty( this.__ExtensionsStatuses,  path );
  //     } else {
  //         setProperty( this.__ExtensionsStatuses, path, statusEvent.status);
  //     }
  // }

  onDeleteExtensionStatusProperty(
    operatorConsoleAsCaller,
    extensionsStatus,
    propertyPath,
    statusString,
    extensionStatusEvent,
  ) {
    // const extensionId = ExtensionsStatus._getExtensionIdByPropertyPath( propertyPath );
    const extensionId = extensionStatusEvent.user
    const talkerId = extensionStatusEvent.talker_id
    console.log(
      '#Duy Phan console extensionsStatus',
      extensionsStatus,
      extensionId,
    )
    // const bRemoved = Object.hasOwn(  extensionsStatus, extensionId ) === false || Object.keys( extensionsStatus[extensionId] ).length === 0 || Object.keys( extensionsStatus[extensionId]["callStatus"] ).length === 0;
    const bRemoved =
      Object.prototype.hasOwnProperty.call(extensionsStatus, extensionId) ===
        false ||
      Object.keys(extensionsStatus[extensionId]).length === 0 ||
      Object.prototype.hasOwnProperty.call(
        extensionsStatus[extensionId]['callStatus'],
        talkerId,
      ) === false
    // const bRemoved = !extensionsStatus?.[extensionId] || extensionsStatus?.[extensionId].length
    if (bRemoved) {
      this._operatorConsoleAsParent
        .getCampon()
        .onDeleteExtensionStatusFromExtensionsStatus(
          this,
          extensionId,
          talkerId,
        )
    }
  }

  onSetExtensionStatusProperty(
    operatorConsoleAsCaller,
    extensionsStatus,
    propertyPath,
    statusString,
    extensionStatusEvent,
  ) {
    // const extensionId = ExtensionsStatus._getExtensionIdByPropertyPath( propertyPath );
    // this._operatorConsoleAsParent.getCampon().onSetExtensionStatusFromExtensionsStatus( this, extensionId );
  }

  static _getExtensionIdByPropertyPath(propertyPath) {
    const index = propertyPath.indexOf('.')
    const user = propertyPath.substring(0, index)
    return user
  }

  // isBusyByExtensionId( extId ){
  //     const b = Object.hasOwn( this.__ExtensionsStatuses, extId );
  //     return b;
  // }
}
