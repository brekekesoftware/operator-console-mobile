import { Text, View } from 'react-native'
import type { ModalProps } from 'react-native-modal'
import RNModal from 'react-native-modal'

type Props = {
  children?: string | JSX.Element | JSX.Element[]
  open?: boolean
  onOk?: () => void
  onCancel?: () => void
  footer?: React.ReactNode
  title?: string
  width: number
} & Omit<ModalProps, 'children'>

export const Modal = ({
  children,
  open,
  footer,
  onOk,
  onCancel,
  title,
  style,
  width = 0,
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
    <RNModal
      {...props}
      isVisible={open}
      backdropColor='#b7b7b7'
      backdropOpacity={0.56}
      coverScreen
    >
      <View
        style={[
          { backgroundColor: 'white', padding: 20, alignSelf: 'center' },
          style,
        ]}
      >
        <View style={{ height: 50 }}>
          <Text
            style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}
          >
            {title}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          {typeof children === 'string' ? <Text>{children}</Text> : children}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          {footer ?? footerButtons.map(item => <Text>{item.text}</Text>)}
        </View>
      </View>
    </RNModal>
  )
}
