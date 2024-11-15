import { CommonButton } from '../common/CommonButton'
import { BrekekeOperatorConsole } from '../OperatorConsole'

export const LegacyAutoDialButton = props => {
  const isRedColor =
    props.context.showAutoDialWidgets &&
    BrekekeOperatorConsole._getIndexFromArray(
      props.context.showAutoDialWidgets,
      props.context.widget,
    ) !== -1

  return (
    <CommonButton
      {...props}
      className={clsx(
        'kbc-button kbc-button-fill-parent',
        isRedColor && 'kbc-button-danger',
      )}
      onPress={() => props.context?.onClickAutoDial(props.context.widget)}
    />
  )
}
