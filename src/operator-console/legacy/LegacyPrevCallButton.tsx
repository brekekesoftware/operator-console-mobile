import { CommonButton } from '../common/CommonButton'

export const LegacyPrevCallButton = props => {
  const callInfos = props.operatorConsoleAsParent
    .getPhoneClient()
    .getCallInfos()
  const currentCallIndex = callInfos.getCurrentCallIndex()
  const callInfoCount = callInfos.getCallInfoCount()

  return (
    <CommonButton
      {...props}
      onPress={
        !callInfoCount || currentCallIndex === 0
          ? undefined
          : props.context.switchCallUp
      }
      isFlash={currentCallIndex > 0}
    />
  )
}
