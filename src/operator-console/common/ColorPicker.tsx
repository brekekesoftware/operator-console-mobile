import { useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import type { ColorPickerProps } from 'react-native-wheel-color-picker'
import ColorPickerWheel from 'react-native-wheel-color-picker'

import { Util } from '../Util'

type Props = Omit<ColorPickerProps, 'onColorChangeComplete' | 'color'> & {
  isDefault?: boolean
  color?:
    | string
    | {
        rgb: {
          r: number
          g: number
          b: number
          a: number
        }
      }
    | null
  onColorChangeComplete?: (
    c: {
      rgb: {
        r: number
        g: number
        b: number
        a: number
      }
    } | null,
  ) => void
}

export const ColorPicker = ({ isDefault = false, ...props }: Props) => {
  const [c, setC] = useState(
    Util.isHex6(props.color)
      ? props.color
      : Util.RGBAToString(props.color as any),
  )

  const changeColor = v => {
    props.onColorChangeComplete?.(Util.getAntdRgbColorFromHex6(v))
  }
  return isDefault ? (
    <ColorPickerWheel
      {...props}
      onColorChange={cl => setC(cl)}
      onColorChangeComplete={changeColor}
      color={c}
    />
  ) : (
    <View
      style={{
        elevation: 3,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 4,
        margin: 4,
      }}
    >
      <ColorPickerWheel
        {...props}
        onColorChange={cl => setC(cl)}
        onColorChangeComplete={changeColor}
        color={c}
      />
    </View>
  )
}
