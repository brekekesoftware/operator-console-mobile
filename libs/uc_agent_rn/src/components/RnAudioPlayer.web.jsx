export const RnAudioPlayer = ({ source }) => (
  <audio autoPlay loop={false} src={source} muted={false} style={{ display: 'none' }} />
)
