import type { ModalProps } from '@ant-design/react-native/lib/modal/Modal'
import AntmModal from '@ant-design/react-native/lib/modal/Modal'
import { Text, View } from 'react-native'

type Props = {
  children?: string | JSX.Element | JSX.Element[]
  open?: boolean
  onOk?: () => void
  onCancel?: () => void
  footer?: React.ReactNode
  title?: string
} & Omit<ModalProps, 'footer' | 'visible'>

export const Modal = ({
  children,
  open,
  footer,
  onOk,
  onCancel,
  title,
  ...props
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
      {...props}
      visible={open}
      footer={!footer ? footerButtons : undefined}
      title={title}
      modalType='modal'
      transparent
      bodyStyle={{ flex: 1 }}
    >
      <View style={{ flex: 1 }}>
        {typeof children === 'string' ? <Text>{children}</Text> : children}
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        {footer}
      </View>
    </AntmModal>
  )
}
