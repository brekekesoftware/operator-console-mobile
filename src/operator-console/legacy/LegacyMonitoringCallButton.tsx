import { CommonButton } from '../common/CommonButton'

export const LegacyMonitoringCallButton = props => (
  <CommonButton
    {...props}
    className={clsx(
      'kbc-button kbc-button-fill-parent',
      !!props.context.monitoringExtension && 'kbc-button-danger',
    )}
  />
)
