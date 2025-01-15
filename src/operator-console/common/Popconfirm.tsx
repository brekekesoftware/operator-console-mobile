import { useState } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { IconWarning, IconWarningSmall } from '../icons'
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
  popStyle?: StyleProp<ViewStyle>
}
export const Popconfirm = ({
  children,
  okText,
  cancelText,
  description,
  title,
  open = false,
  onOpenChange,
  onCancel,
  onConfirm,
  popStyle,
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
        <View style={[styles.pop, popStyle]}>
          <View style={styles.content}>
            <View style={styles.text}>
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
              >
                <View>{IconWarningSmall}</View>
                <Text style={styles.title}>{title}</Text>
              </View>
              {!!description && <Text style={styles.desc}>{description}</Text>}
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
    overflow: 'visible',
  },
  pop: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    top: 30,
    width: 160,
    flex: 1,
    flexDirection: 'column',
    padding: 8,
    elevation: 3,
    backgroundColor: 'white',
    borderRadius: 8,
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
    marginTop: 10,
  },
  button: {
    minWidth: 40,
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
    marginTop: 10,
  },
})
