import type { FC } from 'react'
import { StyleSheet } from 'react-native'
import type { LinearGradientProps } from 'react-native-linear-gradient'
import LinearGradient from 'react-native-linear-gradient'

const css = StyleSheet.create({
  BrekekeGradient: {
    height: '100%',
  },
})

export type NoteGradientProps = Omit<LinearGradientProps, 'colors'>
export const NoteGradient: FC<NoteGradientProps> = props => (
  <LinearGradient
    {...props}
    colors={['#F9EFAF', '#F7E98D']}
    style={[css.BrekekeGradient, props.style]}
  />
)
