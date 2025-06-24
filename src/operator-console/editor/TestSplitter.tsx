import React, { useRef, useState } from 'react'
import { Dimensions, PanResponder, StyleSheet, View } from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width
const SPLITTER_WIDTH = 10
const MIN_WIDTH = 50

export default function TestSplitter() {
  const [leftWidth, setLeftWidth] = useState(SCREEN_WIDTH / 2)
  const panX = useRef(leftWidth)

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {},
      onPanResponderMove: (evt, gestureState) => {
        const newLeftWidth = panX.current + gestureState.dx
        //  panX.current = newLeftWidth
        // Đảm bảo không nhỏ hơn min hoặc vượt quá max
        // if (
        //   newLeftWidth >= MIN_WIDTH &&
        //   newLeftWidth <= SCREEN_WIDTH - MIN_WIDTH
        // ) {
        console.log('#Duy Phan console newLeftWidth', newLeftWidth)
        setLeftWidth(newLeftWidth)
        // }
      },
      onPanResponderRelease: (evt, gestureState) => {
        console.log('#Duy Phan console leftWidth', leftWidth)
        // panX.current = leftWidth // cập nhật lại vị trí mới cho lần kéo sau
      },
    }),
  ).current

  return (
    <View style={styles.container}>
      <View
        style={[styles.pane, { width: leftWidth, backgroundColor: '#add8e6' }]}
      />

      <View style={styles.splitter} {...panResponder.panHandlers} />

      <View style={[styles.pane, { flex: 1, backgroundColor: '#f08080' }]} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  pane: {
    height: '100%',
  },
  splitter: {
    width: SPLITTER_WIDTH,
    backgroundColor: '#999',
    cursor: 'ew-resize', // sẽ hoạt động trên web
    zIndex: 10,
  },
})
