import type { InputProps } from '@ant-design/react-native'
import { Input as AntdInput } from '@ant-design/react-native'
import type { Ref } from 'react'
import { forwardRef, useImperativeHandle, useState } from 'react'

export const Input = forwardRef(
  (props: InputProps, ref: Ref<{ getValue: () => string }>) => {
    const [value, setValue] = useState(props.defaultValue || props.value)

    const onChange = (e: string) => {
      setValue(e)
      props.onChangeText?.(e)
    }

    useImperativeHandle(ref, () => ({
      getValue: () => value || '',
      setValue: v => {
        setValue(v)
      },
    }))

    return (
      <AntdInput
        {...props}
        value={value}
        defaultValue={props.defaultValue}
        onChangeText={onChange}
        style={[
          {
            borderRadius: 4,
            borderColor: '#e0e0e0',
            borderWidth: 1,
            backgroundColor: 'white',
            paddingLeft: 10,
          },
          props.style,
        ]}
      />
    )
  },
)
