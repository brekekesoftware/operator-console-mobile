import type { TextStyle, TouchableOpacityProps, ViewStyle } from 'react-native'
import { Text, TouchableOpacity } from 'react-native'

type Props = {
  children?: string | JSX.Element | JSX.Element[]
  style?: ViewStyle
  textStyle?: TextStyle
} & TouchableOpacityProps

export const WidgetButton = ({
  style,
  children,
  textStyle,
  ...rest
}: Props) => (
  <TouchableOpacity
    {...rest}
    style={[
      {
        // marginBottom: 7,
        // marginRight: 4,
        // marginLeft: 4,
        // marginTop: 4,
        backgroundColor: 'white',
        borderStyle: 'solid',
        borderColor: 'rgb(229.5, 229.5, 229.5)',
        borderWidth: 1,
        elevation: 3,
        borderRadius: 8,
        flex: 1,
        width: '100%',
        height: '100%',
      },
      style,
    ]}
  >
    {typeof children === 'string' ? (
      <Text
        style={[
          {
            fontFamily:
              'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            fontWeight: '400',
            textAlign: 'left',
          },
          textStyle,
        ]}
      >
        {children}
      </Text>
    ) : (
      children
    )}
  </TouchableOpacity>
)
