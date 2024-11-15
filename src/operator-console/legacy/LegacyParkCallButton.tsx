import { CommonButton } from '../common/CommonButton'

export const LegacyParkCallButton = props => {
  const { myParksStatus = {}, parksStatus = {} } = props.context
  const light = myParksStatus[props.number]
    ? 'kbc-button-success-flash-slow'
    : parksStatus[props.number]
      ? 'kbc-button-danger-flash-slow'
      : ''
  return (
    <CommonButton
      {...props}
      onPress={() => props.context?.handlePark(props.number)}
      className={clsx('kbc-button kbc-button-fill-parent', light)}
    />
  )
}
