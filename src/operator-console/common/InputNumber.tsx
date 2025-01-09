import type { InputProps } from '@ant-design/react-native'
import { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { IconArrowDown, IconArrowUp } from '../icons'
import { Input } from './Input'

type Props = {
  value?: number
  onStep?: (v: number) => void
  min?: string | number
  max?: string | number
  step?: number | string
  onChange?: (v: number) => void
} & Omit<InputProps, 'value' | 'onChange'>
export const InputNumber = ({
  value,
  onStep,
  onChange,
  step = 1,
  min,
  max,
  ...props
}: Props) => {
  const [v, setV] = useState(value ?? 0)
  const stepFinal = Number(step)
  const increase = () => {
    setV(n => {
      if (max && Number(max) === n) {
        return n
      }
      onStep?.(n + stepFinal)
      onChange?.(n + stepFinal)
      return n + stepFinal
    })
  }
  const decrease = () => {
    setV(n => {
      if (min && Number(min) === n) {
        return n
      }
      onStep?.(n - stepFinal)
      onChange?.(n - stepFinal)
      return n - stepFinal
    })
  }

  const onChange1 = (t: string) => {
    setV(Number(t))
    onChange?.(Number(t))
  }
  return (
    <Input
      {...props}
      value={String(v || '')}
      onChangeText={onChange1}
      style={[
        {
          height: 40,
        },
        props.style,
      ]}
      type='decimal-pad'
      suffix={
        <View style={styles.suffix}>
          <TouchableOpacity
            style={[styles.btn, styles.increaseBtn]}
            onPress={increase}
          >
            <IconArrowUp size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={decrease}>
            <IconArrowDown size={20} />
          </TouchableOpacity>
        </View>
      }
    />
  )
}

const styles = StyleSheet.create({
  suffix: {
    flexDirection: 'column',
    width: 40,
    height: 40,
    borderLeftWidth: 1,
    borderColor: '#d9d9d9',
  },
  btn: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  increaseBtn: {
    borderBottomWidth: 1,
    borderColor: '#d9d9d9',
  },
})
