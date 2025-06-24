import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react'
import { TextInput, View, StyleSheet, Platform } from 'react-native'

const CustomTextInput = forwardRef((props, ref) => {
  const internalRef = useRef(null)
  const [value, setValue] = useState('')

  useImperativeHandle(ref, () => ({
    focus: () => internalRef.current?.focus(),
    clear: () => {
      internalRef.current?.clear()
      setValue('')
    },
    setValue: val => {
      if (Platform.OS === 'web') {
        internalRef.current.value = val
      } else {
        internalRef.current?.setNativeProps({ text: val })
      }

      setValue(val)
    },
    getValue: () => value,
  }))

  return (
    <TextInput
      ref={internalRef}
      style={[styles.input, props.style]}
      value={value}
      onChangeText={setValue}
      {...props}
    />
  )
})

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 8,
    borderRadius: 6,
  },
})

export default CustomTextInput
