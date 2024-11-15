import { CommonButton } from '../common/CommonButton'

export const LegacyHoldCallButton = props => {
  const currentCallInfo = props.operatorConsoleAsParent
    .getPhoneClient()
    .getCallInfos()
    .getCurrentCallInfo()

  return (
    <CommonButton
      {...props}
      className='kbc-button kbc-button-fill-parent'
      onPress={
        !currentCallInfo ||
        !currentCallInfo.getIsAnswered() ||
        currentCallInfo.getIsHolding()
          ? undefined
          : props.context.holdCall
      }
    />
  )
}
