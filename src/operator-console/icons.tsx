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
export const IconArrowUp = props => (
  <RnIcon
    path='M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z'
    {...props}
  />
)
export const IconArrowDown = props => (
  <RnIcon
    path='M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z'
    {...props}
  />
)
export const IconDrag = () => (
  <RnIcon path='M22.67,12L18.18,16.5L15.67,14L17.65,12L15.67,10.04L18.18,7.53L22.67,12M12,1.33L16.47,5.82L13.96,8.33L12,6.35L10,8.33L7.5,5.82L12,1.33M12,22.67L7.53,18.18L10.04,15.67L12,17.65L14,15.67L16.5,18.18L12,22.67M1.33,12L5.82,7.5L8.33,10L6.35,12L8.33,13.96L5.82,16.47L1.33,12M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10Z' />
)
export const IconResizeHorizontal = () => (
  <RnIcon path='M18,16V13H15V22H13V2H15V11H18V8L22,12L18,16M2,12L6,16V13H9V22H11V2H9V11H6V8L2,12Z' />
)
export const IconResizeVertical = () => (
  <RnIcon path='M8,18H11V15H2V13H22V15H13V18H16L12,22L8,18M12,2L8,6H11V9H2V11H22V9H13V6H16L12,2Z' />
)
