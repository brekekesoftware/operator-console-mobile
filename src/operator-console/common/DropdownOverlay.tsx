import { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

type Props = {
  children?: string | JSX.Element | JSX.Element[]
  overlay?: React.ReactNode
}

export const DropdownOverlay = ({ children, overlay }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <View style={styles.dropdown}>
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
        {children}
      </TouchableOpacity>
      {isOpen && <View style={styles.overlay}>{overlay}</View>}
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
    top: 30,
    paddingVertical: 5,
    paddingHorizontal: 10,
    elevation: 3,
    borderRadius: 5,
    backgroundColor: 'white',
  },
})
