import { StyleSheet, Text, View } from 'react-native'

export const Divider = ({
  children,
}: {
  children?: string | JSX.Element | JSX.Element[]
}) => {
  if (children) {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            flex: 1,
            height: 0.5,
            backgroundColor: 'rgba(5, 5, 5, 0.06)',
          }}
        />
        <View>
          {typeof children === 'string' ? (
            <Text style={{ width: 50, textAlign: 'center' }}>{children}</Text>
          ) : (
            children
          )}
        </View>
        <View
          style={{
            flex: 1,
            height: 0.5,
            backgroundColor: 'rgba(5, 5, 5, 0.06)',
          }}
        />
      </View>
    )
  }
  return <View style={styles.lineStyle} />
}

const styles = StyleSheet.create({
  lineStyle: {
    borderWidth: 0.5,
    borderColor: 'rgba(5, 5, 5, 0.06)',
    marginVertical: 10,
  },
})
