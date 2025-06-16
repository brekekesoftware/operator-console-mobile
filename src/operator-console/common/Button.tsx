import type { ButtonProps } from '@ant-design/react-native'
import { Button as Btn } from '@ant-design/react-native'
import type { ButtonPropsType } from '@ant-design/react-native/lib/button/PropsType'
import { Text } from 'react-native'

type Props = Omit<ButtonProps, 'type'> & {
  type?: ButtonPropsType['type'] | 'secondary' | 'success'
  shape?: 'circle'
  icon?: React.ReactNode
}
export const Button = ({ children, ...props }: Props) => {
  let color: string | undefined = ''
  let bgColor: string | undefined = ''
  switch (props.type) {
    case 'success': {
      color = '#ffffff'
      bgColor = '#5fac3f'
      break
    }
    case 'primary': {
      color = '#ffffff'
      bgColor = '#1677ff'
      break
    }
    default: {
      color = undefined
      bgColor = undefined
    }
  }
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
          minWidth: 100,
          height: 30,
          padding: 0,
          borderRadius: props.shape === 'circle' ? 25 : 5,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        },
        props.style,
      ]}
      styles={{ container: { pointerEvents: 'none' } }}
    >
      {typeof children === 'string' ? (
        <Text
          style={{
            color,
          }}
          disabled
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </Btn>
  )
}
