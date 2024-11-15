import { ACallInfo } from '../call/ACallInfo'
import { CommonButton } from '../common/CommonButton'

export const LegacyHangUpCallButton = props => {
  const currentCallInfo = props.operatorConsoleAsParent
    .getPhoneClient()
    .getCallInfos()
    .getCurrentCallInfo()

  let bDisabled
  if (currentCallInfo) {
    const callStatus = currentCallInfo.getCallStatus()
    const bHolding = callStatus === ACallInfo.CALL_STATUSES.holding
    if (bHolding === true) {
      bDisabled = true
    } else {
      bDisabled = false
    }
  } else {
    bDisabled = false
  }

  return (
    <CommonButton
      {...props}
      disabled={bDisabled}
      className='kbc-button kbc-button-fill-parent'
      onPress={() => {
        if (!currentCallInfo) {
          return
        }
        props.context.hangUpCall()
      }}
    />
  )
}
