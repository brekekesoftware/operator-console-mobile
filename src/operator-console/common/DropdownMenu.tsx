import type { FC } from 'react'
import { useState } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { RnText } from '../../components/RnText'
import { RnTouchableOpacity } from '../../components/RnTouchableOpacity'
import { Divider } from './Divider'

type ChildMenuItem = {
  key: string | number
  label: string | React.ReactNode
  type?: 'divider' | 'item'
  children?: Array<ChildMenuItem>
}

type Props = {
  children?: string | JSX.Element | JSX.Element[]
  open?: boolean
  menu?: {
    items: Array<{
      key: string | number
      label: string | React.ReactNode
      type?: 'divider' | 'item'
      children?: Array<ChildMenuItem>
    }>
    onPress?: (key: string | number) => void
  }
  style?: StyleProp<ViewStyle>
}

export type DropdownItemProps = {
  title?: string
  onPress?: () => void
  disabled?: boolean
}

export const Item: FC<DropdownItemProps> = ({
  title,
  onPress,
  disabled = false,
}: DropdownItemProps) => (
  <RnTouchableOpacity
    onPress={onPress}
    style={styles.container}
    disabled={disabled}
  >
    <RnText>{title}</RnText>
  </RnTouchableOpacity>
)

export const DropdownMenu = ({ children, menu, style }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <View style={[styles.dropdown, style]}>
      <TouchableOpacity
        onPress={() => {
          setIsOpen(!isOpen)
        }}
      >
        {children}
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.overlay}>
          {menu?.items.map(m => {
            if (m.type === 'divider') {
              return <Divider key={m.key} />
            }
            if (typeof m.label === 'string') {
              return (
                <Item
                  title={m.label}
                  onPress={() => menu.onPress?.(m.key)}
                  key={m.key}
                />
              )
            }
            return (
              <RnTouchableOpacity
                style={styles.container}
                onPress={() => menu.onPress?.(m.key)}
                key={m.key}
              >
                {m.label}
              </RnTouchableOpacity>
            )
          })}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  dropdown: {
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    zIndex: 9999,
    top: 35,
    right: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#fefefe',
    borderStyle: 'solid',
    padding: 20,
    minWidth: 200,
  },
  container: {
    paddingVertical: 5,
  },
})
