import { CommonButton } from '../common/CommonButton'

export const LegacyQuickCallButton = props => (
  <CommonButton
    {...props}
    className={clsx(
      'kbc-button kbc-button-fill-parent',
      props.context.widget &&
        props.context.currentScreenQuickCallWidget === props.context.widget &&
        'kbc-button-danger',
    )}
    onPress={() => props.context?.toggleQuickCallScreen(props.context.widget)}
  />
)
