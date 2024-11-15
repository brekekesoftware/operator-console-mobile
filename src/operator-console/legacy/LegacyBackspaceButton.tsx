import { CommonButton } from '../common/CommonButton'

export const LegacyBackspaceButton = props => (
  <CommonButton
    {...props}
    onClick={props.context.backspaceKeypadValue}
    className='kbc-button kbc-button-fill-parent'
  />
)
