import { StyleSheet, View } from 'react-native'

import { i18n } from '../i18n'

export const NotePreview = () => (
  <View style={styles.container}>{i18n.t('Note')}</View>
)

const styles = StyleSheet.create({
  container: {
    borderRadius: 3,
    overflow: 'hidden',
    width: '100%',
    height: '100%',
  },
})
