// Material Design Icons v6.5.95

import {
  mdiKeyboard,
  mdiPhoneIncoming,
  mdiPhoneOutgoing,
} from '../assets/icons'
import { RnIcon } from '../components/RnIcon'

export const IconKeyboard = <RnIcon path={mdiKeyboard} />
export const IconPhoneIncoming = <RnIcon path={mdiPhoneIncoming} />
export const IconPhoneOutgoing = <RnIcon path={mdiPhoneOutgoing} />
export const IconWarning = (
  <RnIcon path='M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z' />
)
export const IconArrowUp = () => (
  <RnIcon path='M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z' />
)
export const IconArrowDown = () => (
  <RnIcon path='M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z' />
)
