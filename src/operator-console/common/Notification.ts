import { Toast } from '@ant-design/react-native'

import { IconWarning } from '../icons'

export const Notification = {
  ...Toast,
  info: ({ message, duration }: { message: string; duration?: number }) => {
    Toast.info(message, duration)
  },
  error: ({
    message,
    duration,
    content,
  }: {
    message: string
    duration?: number
    content?: React.ReactNode
  }) => {
    if (content) {
      Toast.fail({ content }, duration)
    } else {
      Toast.fail(message, duration)
    }
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
