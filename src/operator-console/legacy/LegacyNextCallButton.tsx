import { CommonButton } from '../common/CommonButton'

export const LegacyNextCallButton = props => {
  // const { currentCallIndex, callIds = [] } = context;
  const callInfos = props.operatorConsoleAsParent
    .getPhoneClient()
    .getCallInfos()
  const currentCallIndex = callInfos.getCurrentCallIndex()
  const callInfoCount = callInfos.getCallInfoCount()

  return (
    <CommonButton
      {...props}
      className={clsx(
        'kbc-button kbc-button-fill-parent',
        currentCallIndex < callInfoCount - 1 && 'kbc-button-danger-flash',
      )}
      onPress={
        !callInfoCount || currentCallIndex === callInfoCount - 1
          ? undefined
          : props.context.switchCallDown
      }
    />
  )
}
