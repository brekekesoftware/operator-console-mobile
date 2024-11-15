import { CommonButton } from '../common/CommonButton'

export const LegacyMonitorDialingExtensionButton = props => (
  <CommonButton
    {...props}
    onPress={props.context.monitorDialingExtension}
    className='kbc-button kbc-button-fill-parent'
  />
)
