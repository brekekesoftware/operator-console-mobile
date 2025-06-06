import { StyleSheet } from 'react-native'
import Video from 'react-native-video'

const css = StyleSheet.create({
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    display: 'none',
  },
})
export const RnAudioPlayer = ({ source }) => (
  <Video source={source} style={css.video} />
)
