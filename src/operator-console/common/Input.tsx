import type { InputProps } from '@ant-design/react-native'
import { Input as AntdInput } from '@ant-design/react-native'

export const Input = (props: InputProps) => (
  <AntdInput
    {...props}
    style={[
      { borderRadius: 4, borderColor: '#efefef', borderWidth: 1 },
      props.style,
    ]}
  />
)
