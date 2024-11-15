import { CommonButton } from '../common/CommonButton'

export const LegacyThreeWayCallButton = props => (
  <CommonButton
    {...props}
    className='kbc-button kbc-button-fill-parent'
    onPress={props.context.joinConversation}
  />
)
