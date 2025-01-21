import type { FC } from 'react'
import { useState } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { RnText } from '../../components/RnText'
import { RnTouchableOpacity } from '../../components/RnTouchableOpacity'
import { IconArrowRight } from '../icons'
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
  child?: any
}

export const Item: FC<DropdownItemProps> = ({
  title,
  onPress,
  disabled = false,
  child,
}: DropdownItemProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const renderChild = () => {
    if (!child || !isOpen) {
      return null
    }
    return (
      <View style={styles.overlayChild}>
        {child?.map(c => {
          if (typeof c.label === 'string') {
            return (
              <RnTouchableOpacity
                onPress={() => {
                  onPress?.()
                  setIsOpen(!isOpen)
                }}
                style={styles.container}
                disabled={disabled}
                key={c.key}
              >
                <RnText>{title}</RnText>
              </RnTouchableOpacity>
            )
          }
          return c.label
        })}
      </View>
    )
  }
  return (
    <RnTouchableOpacity
      onPress={() => {
        onPress?.()
        setIsOpen(!isOpen)
      }}
      style={styles.container}
      disabled={disabled}
    >
      <RnText>{title}</RnText>
      <View style={{ flex: 1 }}></View>
      {!!child && (
        <View>
          <IconArrowRight size={18} />
        </View>
      )}
      {renderChild()}
    </RnTouchableOpacity>
  )
}

export const DropdownMenu = ({ children, menu, style }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <View style={[styles.dropdown, style]}>
      <TouchableOpacity
        onPress={() => {
          setIsOpen(!isOpen)
        }}
        activeOpacity={1}
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
                  onPress={() => {
                    if (!m.children) {
                      setIsOpen(false)
                    }

                    menu.onPress?.(m.key)
                  }}
                  key={m.key}
                  child={m.children}
                />
              )
            }
            return (
              <RnTouchableOpacity
                style={styles.container}
                onPress={() => {
                  setIsOpen(false)
                  menu.onPress?.(m.key)
                }}
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
    borderColor: '#e0e0e0',
    borderStyle: 'solid',
    padding: 20,
    minWidth: 200,
    shadowColor: '#e0e0e0',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  container: {
    paddingVertical: 5,
    position: 'relative',
    flexDirection: 'row',
  },
  overlayChild: {
    position: 'absolute',
    left: -120,
    minWidth: 100,
    width: 100,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderStyle: 'solid',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    zIndex: 11,
    shadowColor: '#e0e0e0',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
})
