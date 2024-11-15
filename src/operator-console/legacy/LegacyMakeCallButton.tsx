import { CommonButton } from '../common/CommonButton'

export const LegacyMakeCallButton = props => (
  <CommonButton
    {...props}
    className='kbc-button kbc-button-fill-parent'
    onPress={() => {
      if (props.operatorConsoleAsParent.getIsDTMFInput() !== true) {
        props.context.makeCallWithShortDial(props.context)
      }
    }}
  />
)
