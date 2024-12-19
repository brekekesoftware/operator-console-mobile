import { View } from '@ant-design/react-native'
import type { ViewStyle } from 'react-native'
import { Image, StyleSheet, Text } from 'react-native'

type Props = {
  image?: string | null
  description?: React.ReactElement | string
  style?: ViewStyle
}
export const Empty = ({ style, description, image }: Props) => (
  <View style={[styles.empty, style]}>
    {typeof description === 'string' ? <Text>{description}</Text> : description}
    <Image source={{ uri: image ?? '' }} />
  </View>
)

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
