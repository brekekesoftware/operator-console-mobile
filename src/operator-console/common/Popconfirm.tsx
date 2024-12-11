import { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { Button } from './Button'

type Props = {
  title: string
  onConfirm?: () => void
  okText?: string
  cancelText?: string
  children: string | JSX.Element | JSX.Element[]
  description?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onCancel?: () => void
}
export const Popconfirm = ({
  children,
  okText,
  cancelText,
  description = 'Are you sure?',
  title,
  open = false,
  onOpenChange,
  onCancel,
  onConfirm,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <View style={styles.main}>
      <TouchableOpacity
        onPress={() => {
          if (!onOpenChange) {
            setIsOpen(!isOpen)
          }
          onOpenChange?.(!isOpen)
        }}
      >
        {children}
      </TouchableOpacity>

      {(isOpen || open) && (
        <View style={styles.pop}>
          <View style={styles.content}>
            <View style={styles.text}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.desc}>{description}</Text>
            </View>
          </View>
          <View style={styles.buttons}>
            <Button
              style={styles.button}
              onPress={() => {
                onCancel?.()
                setIsOpen(!isOpen)
              }}
            >
              <Text>{cancelText}</Text>
            </Button>
            <Button
              type='primary'
              style={styles.button}
              onPress={() => {
                onConfirm?.()
                setIsOpen(!isOpen)
              }}
            >
              {okText}
            </Button>
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    position: 'relative',
  },
  pop: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    top: 30,
    width: 240,
    height: 150,
    flexDirection: 'column',
    padding: 8,
    elevation: 3,
    backgroundColor: 'white',
  },
  content: {
    flexDirection: 'row',
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
  },
  button: {
    width: 60,
    height: 30,
  },
  text: {
    flexDirection: 'column',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  desc: {
    fontSize: 13,
    marginTop: 15,
  },
})
