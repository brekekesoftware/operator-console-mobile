export const RnAudioPlayer = ({ source }) => (
  <audio autoPlay loop src={source} muted={false} style={{ display: 'none' }} />
)
