import { CommonButton } from '../common/CommonButton'

export const LegacyToggleRecordingButton = props => (
  <CommonButton
    {...props}
    onPress={props.context.toggleCallRecording()}
    className={clsx(
      'kbc-button kbc-button-fill-parent',
      props.currentCallInfo?.getIsRecording() && 'kbc-button-danger',
    )}
  />
)
