import type { ButtonProps } from '@ant-design/react-native'
import { Button as Btn } from '@ant-design/react-native'
import type { ButtonPropsType } from '@ant-design/react-native/lib/button/PropsType'

type Props = Omit<ButtonProps, 'type'> & {
  type?: ButtonPropsType['type'] | 'secondary' | 'success'
  shape?: 'circle'
  icon?: React.ReactNode
}
export const Button = (props: Props) => {
  const color = props.type === 'success' ? '#ffffff' : undefined
  const bgColor = props.type === 'success' ? '#40742a' : undefined
  return (
    <Btn
      {...props}
      type={
        ['secondary', 'success'].includes(props.type ?? '')
          ? undefined
          : (props.type as any)
      }
      style={[
        {
          backgroundColor: bgColor,
          borderRadius: props.shape === 'circle' ? 25 : undefined,
        },
        props.style,
      ]}
    >
      {props.icon}
    </Btn>
  )
}
