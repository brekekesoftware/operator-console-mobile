import { CommonButton } from '../common/CommonButton'

export const LegacyTransferButton = props => (
  <CommonButton
    {...props}
    onPress={props.operatorConsoleAsParent.transferDialingCall()}
  />
)
