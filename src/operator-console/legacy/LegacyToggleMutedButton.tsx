import { CommonButton } from '../common/CommonButton'

export const LegacyToggleMutedButton = props => {
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
        currentCallInfo?.getIsMuted() && 'kbc-button-danger',
      )}
      onPress={!currentCallInfo ? undefined : props.context.toggleCallMuted}
    />
  )
}
