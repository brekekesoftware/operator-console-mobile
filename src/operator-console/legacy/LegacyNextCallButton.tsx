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
      onPress={
        !callInfoCount || currentCallIndex === callInfoCount - 1
          ? undefined
          : props.context.switchCallDown
      }
      isFlash={currentCallIndex < callInfoCount - 1}
    />
  )
}
