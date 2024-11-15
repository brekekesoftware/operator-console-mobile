import { CommonButton } from '../common/CommonButton'

export const LegacyUnholdCallButton = props => {
  // const { currentCallIndex, callIds = [], callById = {} } = context;
  // const currentCall = callById[callIds[currentCallIndex]];
  const currentCallInfo = props.operatorConsoleAsParent
    .getPhoneClient()
    .getCallInfos()
    .getCurrentCallInfo()

  return (
    <CommonButton
      {...props}
      className='kbc-button kbc-button-fill-parent'
      onPress={() => {
        if (!currentCallInfo) {
          return
        }
        const bHolding = currentCallInfo.getIsHolding()
        if (!bHolding) {
          return
        }
        props.context.resumeCall()
      }}
    />
  )
}
