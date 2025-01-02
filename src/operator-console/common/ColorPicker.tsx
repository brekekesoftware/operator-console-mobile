import { View } from 'react-native'
import type { ColorPickerProps } from 'react-native-wheel-color-picker'
import ColorPickerRN, {
  colorKit,
  HueSlider,
  OpacitySlider,
  Panel1,
  Preview,
} from 'reanimated-color-picker'
import type { rgbT } from 'reanimated-color-picker/lib/typescript/colorKit/types'

type Props = Omit<ColorPickerProps, 'onColorChangeComplete' | 'color'> & {
  isDefault?: boolean
  color?: string | { rgb: rgbT }
  onColorChangeComplete?: (c: { rgb: rgbT } | { hex: string } | null) => void
  type?: 'rgb' | 'hex'
}

export const ColorPicker = ({
  isDefault = false,
  type = 'rgb',
  ...props
}: Props) => {
  let fColor
  if (props.color) {
    fColor =
      typeof props.color === 'string'
        ? props.color
        : colorKit.RGB(props.color.rgb).string()
  } else {
    fColor = undefined
  }

  const changeColor = v => {
    props.onColorChangeComplete?.(
      type === 'rgb'
        ? { rgb: colorKit.RGB(v).object(true) }
        : { hex: colorKit.HEX(v).toString() },
    )
  }
  return isDefault ? (
    <ColorPickerRN
      style={{ flex: 1, gap: 20 }}
      value={fColor}
      onComplete={e => changeColor(e.hex)}
    >
      <Preview />
      <Panel1 />
      <HueSlider />
      <OpacitySlider />
      {/* <Swatches /> */}
    </ColorPickerRN>
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
      <ColorPickerRN
        style={{ flex: 1, gap: 20 }}
        value={fColor}
        onComplete={e => changeColor(e.hex)}
        thumbSize={25}
        boundedThumb
      >
        <Preview />
        <Panel1 />
        <HueSlider />
        <OpacitySlider />
        {/* <Swatches /> */}
      </ColorPickerRN>
    </View>
  )
}
