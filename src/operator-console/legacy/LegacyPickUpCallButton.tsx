import { CommonButton } from '../common/CommonButton'

export const LegacyPickUpCallButton = props => {
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
        const bIsIncoming = currentCallInfo.getIsIncoming()
        if (!bIsIncoming) {
          return
        }
        const bIsAnswered = currentCallInfo.getIsAnswered()
        if (bIsAnswered) {
          return
        }

        props.context.answerCall()
      }}
    />
  )
}
