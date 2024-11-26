import AntmModal from '@ant-design/react-native/lib/modal/Modal'
import { Text } from 'react-native'

type Props = {
  children?: string | JSX.Element | JSX.Element[]
  open?: boolean
  onOk?: () => void
  onCancel?: () => void
  footer?: React.ReactNode
  title?: string
}

export const Modal = ({
  children,
  open,
  footer,
  onOk,
  onCancel,
  title,
}: Props) => {
  const footerButtons = [
    {
      text: 'Cancel',
      onPress: () => {
        onOk?.()
      },
    },
    {
      text: 'Ok',
      onPress: () => {
        onCancel?.()
      },
    },
  ]
  return (
    <AntmModal
      visible={open}
      footer={!footer ? footerButtons : undefined}
      title={title}
    >
      {typeof children === 'string' ? <Text>{children}</Text> : children}
      {footer}
    </AntmModal>
  )
}
