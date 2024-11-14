import { StyleSheet } from 'react-native'

const commonStyles = StyleSheet.create({
  commonLed: {
    margin: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
  },
})

export const OperatorConsoleStyles = StyleSheet.create({
  'led-red': {
    ...commonStyles.commonLed,
    backgroundColor: '#F00',
  },
  'led-yellow': {
    ...commonStyles.commonLed,
    backgroundColor: '#FF0',
  },
  'led-green': {
    ...commonStyles.commonLed,
    backgroundColor: '#ABFF00',
  },
  'led-blue': {
    ...commonStyles.commonLed,
    backgroundColor: '#24E0FF',
  },
  'led-grey': {
    ...commonStyles.commonLed,
    backgroundColor: '#24E0FF',
  },
  'led-box-text': {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 16,
  },
})
