import type { InputProps } from '@ant-design/react-native'
import { Input } from '@ant-design/react-native'
import { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { IconArrowDown, IconArrowUp } from '../icons'

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
      return n + stepFinal
    })
  }
  const decrease = () => {
    setV(n => {
      if (min && Number(min) === n) {
        return n
      }
      onStep?.(n - stepFinal)
      return n - stepFinal
    })
  }
  return (
    <Input
      {...props}
      value={String(v || '')}
      onChange={e => e.target}
      type='number-pad'
      suffix={
        <View style={styles.suffix}>
          <TouchableOpacity style={styles.btn} onPress={increase}>
            <IconArrowUp />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={decrease}>
            <IconArrowDown />
          </TouchableOpacity>
        </View>
      }
    />
  )
}

const styles = StyleSheet.create({
  suffix: {
    flexDirection: 'column',
    width: 60,
    height: 60,
  },
  btn: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})
