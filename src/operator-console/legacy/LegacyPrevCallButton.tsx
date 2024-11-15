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
      className={
        clsx(
          'kbc-button kbc-button-fill-parent',
          currentCallIndex > 0 && 'kbc-button-danger-flash',
        ) as string
      }
    />
  )
}
