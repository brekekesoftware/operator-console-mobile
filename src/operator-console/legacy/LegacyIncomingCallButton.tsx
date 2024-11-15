import { CommonButton } from '../common/CommonButton'

export const LegacyIncomingCallButton = props => {
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
        currentCallInfo?.getIsIncoming() &&
          currentCallInfo?.getIsAnswered() &&
          !currentCallInfo?.getIsHolding() &&
          'kbc-button-danger',
      )} // !todo implement
    />
  )
}
