import type { InputProps } from '@ant-design/react-native'
import { Input as AntdInput } from '@ant-design/react-native'
import type { Ref } from 'react'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

export const Input = forwardRef(
  (props: InputProps, ref: Ref<{ getValue: () => string }>) => {
    const [value, setValue] = useState(props.defaultValue || props.value)

    // useEffect(() => {
    //   setValue(props.value)
    // },[props.value])

    const onChange = (e: string) => {
      setValue(e)

      props.onChangeText?.(e)
    }

    useImperativeHandle(ref, () => ({
      getValue: () => value ?? '',
    }))

    return (
      <AntdInput
        {...props}
        value={value}
        onChangeText={onChange}
        style={[
          { borderRadius: 4, borderColor: '#efefef', borderWidth: 1 },
          props.style,
        ]}
      />
    )
  },
)
