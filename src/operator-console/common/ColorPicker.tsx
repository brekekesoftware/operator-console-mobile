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
  onColorChangeComplete?: (c: { rgb: rgbT } | null) => void
}

export const ColorPicker = ({ isDefault = false, ...props }: Props) => {
  console.log('#Duy Phan console color', props.color)
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
    console.log('#Duy Phan console v', v)
    props.onColorChangeComplete?.({ rgb: colorKit.RGB(v).object(true) })
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
