import { CommonButton } from '../common/CommonButton'

export const LegacyLineButton = props => {
  const callInfos = props.operatorConsoleAsParent
    .getPhoneClient()
    .getCallInfos()
  const {
    myParksStatus = {},
    linesStatus = {},
    parksStatus = {},
    loginUser,
  } = props.context
  const { line_talker, room_id, status } = linesStatus[props.line] || {}
  let light = ''
  if (status === 'on') {
    const callInfo = room_id
      ? callInfos.getCallInfoWherePbxRoomIdEqual(room_id)
      : null
    const park = parksStatus[props.line]

    if (line_talker === loginUser?.pbxUsername) {
      light = 'kbc-button-success-flash'
    } else if (park) {
      light = myParksStatus[props.line]
        ? 'kbc-button-success-flash-slow'
        : 'kbc-button-danger-flash-slow'
    } else if (callInfo) {
      if (callInfo?.getIsIncoming() && !callInfo?.getIsAnswered()) {
        light = 'kbc-button-danger-flash'
      } else {
        light = 'kbc-button-success'
      }
    } else {
      light = 'kbc-button-danger'
    }
  }

  return (
    <CommonButton
      {...props}
      onPress={() => props.context.handleLine(props.line)}
      className={clsx('kbc-button kbc-button-fill-parent', light)}
    />
  )
}
