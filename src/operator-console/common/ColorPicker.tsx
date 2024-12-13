import { View } from 'react-native'
import type { ColorPickerProps } from 'react-native-wheel-color-picker'
import ColorPickerWheel from 'react-native-wheel-color-picker'

export const ColorPicker = ({
  isDefault = false,
  ...props
}: ColorPickerProps & { isDefault?: boolean }) =>
  isDefault ? (
    <ColorPickerWheel {...props} />
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
      <ColorPickerWheel {...props} />
    </View>
  )
