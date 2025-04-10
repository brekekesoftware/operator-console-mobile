import React from 'react'
import { StyleSheet, View } from 'react-native'

/**
 * BalloonDialog
 * props.shows
 * props.indicator
 * props.anchor
 */
export default props => {
  if (props.shows) {
    return (
      <View style={styles.brBalloonDialog}>
        <View
          style={[
            styles.brBalloonDialogInner,
            props.anchor === 'right'
              ? styles.brAnchorRight
              : styles.brAnchorLeft,
          ]}
        >
          <View style={styles.brBalloonDialogInnerInner}>{props.children}</View>
        </View>
      </View>
    )
  } else {
    return <View></View>
  }
}

const styles = StyleSheet.create({
  brBalloonDialog: {
    position: 'relative',
    left: 0,
    top: 8,
    width: 0,
    height: 0,
  },
  brBalloonDialogInner: {
    paddingTop: 8,
    position: 'absolute',
  },
  brBalloonDialogInnerInner: {
    padding: 0,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  brAnchorLeft: {
    left: 0,
  },
  brAnchorRight: {
    right: 0,
  },
})
