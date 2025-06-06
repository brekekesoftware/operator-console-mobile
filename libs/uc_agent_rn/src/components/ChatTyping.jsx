import { View, Text, StyleSheet } from 'react-native'
import uawMsgs from '../utilities/uawmsgs'
import NameEmbeddedSpan from './NameEmbeddedSpan'

const colors = {
  darkGray: '#666666',
}

const styles = StyleSheet.create({
  chatTyping: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 20.8, // 1.6 * 13
    letterSpacing: 0.3,
    paddingLeft: 16,
    color: colors.darkGray,
  },
  emptySpace: {
    height: 20.8,
  },
})

/**
 * ChatTyping
 * props.uiData
 * props.uiData.ucUiStore
 * props.panelType
 * props.panelCode
 */
export default props => {
  const typingBuddy = props.uiData.ucUiStore.getTypingBuddy({
    chatType: props.panelType,
    chatCode: props.panelCode,
  })

  if (typingBuddy && typingBuddy.user_id) {
    return (
      <View style={styles.chatTyping}>
        <NameEmbeddedSpan
          ucUiStore={props.uiData.ucUiStore}
          format={uawMsgs.MSG_TYPING}
          buddy={typingBuddy}
        />
      </View>
    )
  } else {
    return (
      <View style={[styles.chatTyping, styles.emptySpace]}>
        <Text>{'\u00A0'}</Text>
      </View>
    )
  }
}
