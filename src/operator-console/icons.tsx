// Material Design Icons v6.5.95

import {
  mdiKeyboard,
  mdiPhoneIncoming,
  mdiPhoneOutgoing,
} from '../assets/icons'
import { RnIcon } from '../components/RnIcon'

export const IconKeyboard = <RnIcon path={mdiKeyboard} />
export const IconPhoneIncoming = <RnIcon path={mdiPhoneIncoming} size={24} />
export const IconPhoneOutgoing = <RnIcon path={mdiPhoneOutgoing} size={24} />
export const IconWarning = (
  <RnIcon
    color='#faad14'
    path='M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z'
  />
)
export const IconWarningSmall = (
  <RnIcon
    color='#faad14'
    size={17}
    path='M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z'
  />
)
export const IconSuccess = (
  <RnIcon
    color='#5fac3f'
    path='M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z'
  />
)
export const IconInfo = (
  <RnIcon path='M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z' />
)
export const IconError = (
  <RnIcon
    color='red'
    path='M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z'
  />
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
export const IconArrowRight = props => (
  <RnIcon
    path='M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z'
    {...props}
  />
)
