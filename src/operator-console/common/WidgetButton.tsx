import type { TextStyle, TouchableOpacityProps, ViewStyle } from 'react-native'
import { Text, TouchableOpacity } from 'react-native'

type Props = {
  children?: string | JSX.Element | JSX.Element[]
  style?: ViewStyle
  textStyle?: TextStyle
} & TouchableOpacityProps

export const WidgetButton = ({ style, children, textStyle }: Props) => (
  <TouchableOpacity
    style={[
      {
        width: 60,
        height: 60,
        marginBottom: 7,
        marginRight: 4,
        marginLeft: 4,
        marginTop: 4,
        backgroundColor: 'white',
        borderStyle: 'solid',
        borderColor: 'rgb(229.5, 229.5, 229.5)',
        borderWidth: 1,
        elevation: 3,
        borderRadius: 8,
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
