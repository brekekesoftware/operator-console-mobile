import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { ACallInfo } from '../call/ACallInfo'
import { CommonButton } from '../common/CommonButton'
import { i18n } from '../i18n'
import { BrekekeOperatorConsole } from '../OperatorConsole'

export const LegacyOneTouchDialButton = props => {
  if (!props.context) {
    return (
      <CommonButton
        {...props}
        childNode={
          props.icon ? (
            <FontAwesomeIcon size='lg' icon={props.icon} />
          ) : (
            props.label
          )
        }
        className='kbc-button kbc-button-fill-parent'
      />
    )
  } else {
    const { widget, setDialingAndMakeCall } = props.context
    const number = widget.number

    return (
      <CommonButton
        {...props}
        onPress={() => {
          let onetouchdialMode = widget.onetouchdialMode
          if (!onetouchdialMode) {
            onetouchdialMode = 'callOnly' // !default
          }

          const currentCallInfo = props.operatorConsoleAsParent
            .getPhoneClient()
            .getCallInfos()
            .getCurrentCallInfo()
          if (!!currentCallInfo) {
            // transfer?
            const callStatus = currentCallInfo.getCallStatus()
            const canTransferByCallStatus =
              callStatus == ACallInfo.CALL_STATUSES.holding ||
              callStatus === ACallInfo.CALL_STATUSES.talking
            if (canTransferByCallStatus === true) {
              const canTransferByOnetouchdialMode =
                onetouchdialMode === 'attendedTransferOrCall' ||
                onetouchdialMode === 'blindTransferOrCall' ||
                onetouchdialMode === 'attendedTransferOnly' ||
                onetouchdialMode === 'blindTransferOnly'
              if (canTransferByOnetouchdialMode === true) {
                // const talkerId = currentCallInfo.getPbxTalkerId();
                // const tenant = operatorConsoleAsParent.getLoggedinTenant();
                const mode =
                  onetouchdialMode === 'blindTransferOrCall' ||
                  onetouchdialMode === 'blindTransferOnly'
                    ? 'blind'
                    : undefined // use attended
                props.operatorConsoleAsParent.transferCall(
                  number,
                  mode,
                  currentCallInfo,
                )
                return
              }
            }
          }

          // call
          if (
            onetouchdialMode !== 'attendedTransferOnly' &&
            onetouchdialMode !== 'blindTransferOnly'
          ) {
            if (currentCallInfo) {
              const callStatus = currentCallInfo.getCallStatus()
              if (callStatus === ACallInfo.CALL_STATUSES.talking) {
                const timelimit =
                  Date.now() +
                  BrekekeOperatorConsole.WAIT_HOLD_TIMELIMIT_MILLIS_AT_ONETOUCHDIAL
                const func = function (callInfoAsCaller) {
                  const removed = currentCallInfo.removeOnHoldFunction(func)
                  if (Date.now() > timelimit) {
                    Notification.error({
                      message:
                        i18n.t('failedToHoldCallAtOneTouchDial') + '\r\n' + e,
                      duration: 0,
                    })
                    return
                  }
                  setDialingAndMakeCall(number, props.context)
                }
                currentCallInfo.addOnHoldFunction(func)
                currentCallInfo.toggleHoldWithCheck()
                return
              }
            }
            setDialingAndMakeCall(number, props.context)
          }
        }}
        className='kbc-button kbc-button-fill-parent'
      />
    )
  }
}
