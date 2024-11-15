import { CommonButton } from '../common/CommonButton'

export const LegacyOutgoingCallButton = props => {
  // const { currentCallIndex, callIds = [], callById = {} } = context;
  // const currentCall = callById[callIds[currentCallIndex]];
  const currentCallInfo = props.operatorConsoleAsParent
    .getPhoneClient()
    .getCallInfos()
    .getCurrentCallInfo()
  return (
    <CommonButton
      {...props}
      className={clsx(
        'kbc-button kbc-button-fill-parent',
        !!currentCallInfo &&
          currentCallInfo?.getIsAnswered() &&
          !currentCallInfo?.getIsIncoming() &&
          !currentCallInfo?.getIsHolding() &&
          'kbc-button-danger',
      )}
    />
  )
}
