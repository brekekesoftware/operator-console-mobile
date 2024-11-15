import { CommonButton } from '../common/CommonButton'

export const LegacyNoAnswerButton = props => (
  <CommonButton {...props} onPress={props.context.toggleAutoRejectIncoming} />
)
