import { Toast } from '@ant-design/react-native'

import { IconWarning } from '../icons'

Toast.config({
  position: 'top',
  styles: {
    container: {
      zIndex: 9999999,
    },
  },
})

export const Notification = {
  ...Toast,
  info: ({ message, duration }: { message: string; duration?: number }) => {
    setTimeout(() => {
      Toast.info(message, duration)
    })
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
    setTimeout(() => {
      if (content) {
        Toast.fail({ content }, duration)
      } else {
        Toast.fail(message, duration)
      }
    }, 0)
  },
  warning: ({ message, duration }: { message: string; duration?: number }) => {
    setTimeout(() => {
      Toast.show(
        {
          icon: IconWarning,
          content: message,
          stackable: false,
          position: 'top',
          mask: false,
        },
        duration,
      )
    }, 0)
  },
  success: ({ message, duration }: { message: string; duration?: number }) => {
    setTimeout(() => {
      Toast.success(message, duration)
    }, 0)
  },
}
