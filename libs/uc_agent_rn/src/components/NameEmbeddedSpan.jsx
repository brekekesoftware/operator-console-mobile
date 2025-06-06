import { Text, StyleSheet } from 'react-native'
import { string } from '../utilities/strings'

/*
 * props.ucUiStore - UI store for getting user information
 * props.format - Format string with {0} placeholder for user name
 * props.title - Title string with {0} placeholder for user name
 * props.buddy - Buddy object containing user information
 * props.style - Additional styles
 */
const NameEmbeddedSpan = props => {
  const format = string(props.format)
  const title = string(props.title)
  const messages = format.split('{0}')
  const titleMessages = title.split('{0}')
  const user = props.buddy && props.ucUiStore.getBuddyUserForUi(props.buddy)
  const user_name = string(user && user.name)

  const stylesToApply = [styles.nameEmbeddedSpan]

  if (user && user.isMe) {
    stylesToApply.push(styles.isMe)
  }

  if (user && user.isBuddy) {
    stylesToApply.push(styles.isBuddy)
  }

  if (user && user.isTemporaryBuddy) {
    stylesToApply.push(styles.isTemporaryBuddy)
  }

  if (props.style) {
    stylesToApply.push(props.style)
  }

  return (
    <Text
      style={stylesToApply}
      accessibilityHint={titleMessages.join(user_name)}
    >
      {messages.join(user_name)}
    </Text>
  )
}

const colors = {
  portlandOrange: '#FF4526', // @portland_orange
}

const styles = StyleSheet.create({
  nameEmbeddedSpan: {},
  isMe: {
    color: colors.portlandOrange,
  },
  isBuddy: {},
  isTemporaryBuddy: {},
})

export default NameEmbeddedSpan
