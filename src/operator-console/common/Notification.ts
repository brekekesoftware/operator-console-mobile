import { Toast } from '@ant-design/react-native'

import { IconWarning } from '../icons'

export const Notification = {
  ...Toast,
  info: ({ message, duration }: { message: string; duration?: number }) => {
    Toast.info(message, duration)
  },
  error: ({ message, duration }: { message: string; duration?: number }) => {
    Toast.fail(message, duration)
  },
  warning: ({ message, duration }: { message: string; duration?: number }) => {
    Toast.show(
      {
        icon: IconWarning,
        content: message,
      },
      duration,
    )
  },
  success: ({ message, duration }: { message: string; duration?: number }) => {
    Toast.success(message, duration)
  },
}
