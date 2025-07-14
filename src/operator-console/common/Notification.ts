// import { Toast } from '@ant-design/react-native'

import { Toast } from 'react-native-toast-notifications'

export const Notification = {
  ...Toast,
  info: ({ message, duration }: { message: string; duration?: number }) => {
    setTimeout(() => {
      Toast.show(message, {
        type: 'info',
      })
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
    Toast.show(message, {
      duration,
      type: 'error',
    })
  },
  warning: ({ message, duration }: { message: string; duration?: number }) => {
    setTimeout(() => {
      Toast.show(message, {
        duration,
        type: 'warning',
      })
    }, 0)
  },
  success: ({ message, duration }: { message: string; duration?: number }) => {
    setTimeout(() => {
      Toast.show(message, {
        type: 'success',
        duration,
      })
    }, 0)
  },
}
