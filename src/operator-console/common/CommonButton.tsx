import { Text, TouchableOpacity } from 'react-native'

import type { BrekekeOperatorConsole } from '../OperatorConsole'
import { getIconJsx } from '../OperatorConsole'
import { Util } from '../Util'

type Props = {
  operatorConsoleAsParent?: BrekekeOperatorConsole
  subtype: string
  icon: string
  label: string
  buttonFgColor: string
  buttonBgColor: string
  buttonOuterBorderRadius: number
  buttonOuterBorderThickness: number
  buttonOuterBorderColor: number
  context?: any
  onPress?: () => void
  className?: string
  disabled?: boolean
  childNode?: React.ReactNode
}

export const CommonButton = ({
  subtype,
  icon,
  label,
  buttonFgColor,
  buttonBgColor,
  buttonOuterBorderColor,
  buttonOuterBorderRadius,
  buttonOuterBorderThickness,
  onPress,
  className,
  disabled,
  childNode,
}: Props) => {
  const color = Util.isAntdRgbaProperty(buttonFgColor)
    ? Util.getRgbaCSSStringFromAntdColor(buttonFgColor)
    : ''
  const backgroundColor = Util.isAntdRgbaProperty(buttonBgColor)
    ? Util.getRgbaCSSStringFromAntdColor(buttonBgColor)
    : undefined
  const border =
    Util.isNumeric(buttonOuterBorderThickness) &&
    Util.isAntdRgbaProperty(buttonOuterBorderColor)

  const borderRadius = Util.isNumber(buttonOuterBorderRadius)
    ? buttonOuterBorderRadius
    : undefined
  const iconJsx = getIconJsx(icon, label)

  return (
    <TouchableOpacity
      style={{
        borderStyle: border ? 'solid' : undefined,
        borderWidth: border ? buttonOuterBorderThickness : undefined,
        borderColor: border
          ? Util.getRgbaCSSStringFromAntdColor(buttonOuterBorderColor)
          : undefined,
        borderRadius,
        backgroundColor,
      }}
      onPress={onPress}
      disabled={disabled}
    >
      {childNode ? (
        childNode
      ) : (
        <>
          <Text style={{ color }}>
            {`legacy_button_description.${subtype}`}
          </Text>
          {iconJsx}
        </>
      )}
    </TouchableOpacity>
  )
}
