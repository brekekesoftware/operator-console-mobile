import { CommonButton } from '../common/CommonButton'
import { _getQuickCallDialingBySymbol } from '../OperatorConsole'

export const LegacyKeypadButton = props => (
  <CommonButton
    {...props}
    onPress={() => {
      const sDialing = _getQuickCallDialingBySymbol(
        props.symbol,
        props.context.currentScreenQuickCallWidget,
      )
      if (sDialing) {
        props.context.setDialingAndMakeCall(sDialing, props.context)
      } else {
        props.context.appendKeypadValue(props.symbol)
      }
    }}
    className='kbc-button kbc-button-fill-parent'
  />
)
