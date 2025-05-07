import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import {
  View,
  PanResponder,
  Animated,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native'

/**
 * DialogResizableBox
 * props.style - replaces className
 * props.disabled
 * props.initialLeft
 * props.initialTop
 * props.initialWidth
 * props.initialHeight
 * props.resizableOpts
 * props.movable
 * props.draggableOptsToMove
 * props.modal
 * props.onStart
 * props.onStop
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    const { width: screenWidth, height: screenHeight } =
      Dimensions.get('window')

    this.state = {
      pan: new Animated.ValueXY(),
      size: new Animated.ValueXY({
        x: int(props.initialWidth),
        y: int(props.initialHeight),
      }),
      currentRect: {
        left: int(props.initialLeft),
        top: int(props.initialTop),
        width: int(props.initialWidth),
        height: int(props.initialHeight),
      },
      isResizing: false,
      isDragging: false,
      screenWidth,
      screenHeight,
    }

    this.setupPanResponders()
  }

  setupPanResponders() {
    // Pan responder for moving
    this.movePanResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () =>
        this.props.movable && !this.props.disabled,
      onPanResponderGrant: () => {
        this.state.pan.setOffset({
          x: this.state.pan.x._value,
          y: this.state.pan.y._value,
        })
        this.state.pan.setValue({ x: 0, y: 0 })
        this.setState({ isDragging: true })
        this.handleStartDraggable()
      },
      onPanResponderMove: Animated.event(
        [null, { dx: this.state.pan.x, dy: this.state.pan.y }],
        { useNativeDriver: false },
      ),
      onPanResponderRelease: (e, gesture) => {
        this.state.pan.flattenOffset()
        this.setState({ isDragging: false })
        this.handleStopDraggable(e, {
          x: gesture.dx,
          y: gesture.dy,
        })
      },
    })

    // Pan responder for resizing
    this.resizePanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return (
          !this.props.disabled &&
          (Math.abs(gestureState.dx) > 2 || Math.abs(gestureState.dy) > 2)
        )
      },
      onPanResponderGrant: () => {
        this.state.size.setOffset({
          x: this.state.size.x._value,
          y: this.state.size.y._value,
        })
        this.setState({ isResizing: true })
        this.handleResizeStart()
      },
      onPanResponderMove: (e, gesture) => {
        const { resizableOpts } = this.props
        const { screenWidth, screenHeight } = this.state

        // Calculate new dimensions
        const newWidth = this.state.currentRect.width + gesture.dx
        const newHeight = this.state.currentRect.height + gesture.dy

        // Get min constraints from props or use defaults
        const minWidth = resizableOpts?.minConstraints?.[0] ?? 100
        const minHeight = resizableOpts?.minConstraints?.[1] ?? 100

        // Calculate max constraints considering screen size
        const maxWidth = Math.min(
          screenWidth - this.state.currentRect.left - 20,
          resizableOpts?.maxConstraints?.[0] ?? screenWidth,
        )
        const maxHeight = Math.min(
          screenHeight - this.state.currentRect.top - 20,
          resizableOpts?.maxConstraints?.[1] ?? screenHeight,
        )

        // Apply constraints
        const width = Math.min(Math.max(newWidth, minWidth), maxWidth)
        const height = Math.min(Math.max(newHeight, minHeight), maxHeight)

        // Use Animated.spring for smooth resizing with adjusted parameters
        Animated.parallel([
          Animated.spring(this.state.size.x, {
            toValue: width,
            useNativeDriver: false,
            friction: 12, // Increased friction for slower movement
            tension: 20, // Reduced tension for gentler spring
            velocity: 0, // Start from rest
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 0.01,
          }),
          Animated.spring(this.state.size.y, {
            toValue: height,
            useNativeDriver: false,
            friction: 12, // Increased friction for slower movement
            tension: 20, // Reduced tension for gentler spring
            velocity: 0, // Start from rest
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 0.01,
          }),
        ]).start()
      },
      onPanResponderRelease: (e, gesture) => {
        this.state.size.flattenOffset()
        this.setState({ isResizing: false })
        this.handleResizeStop(e, {
          size: {
            width: this.state.size.x._value,
            height: this.state.size.y._value,
          },
        })
      },
    })
  }

  handleResizeStart = () => {
    if (typeof this.props.onStart === 'function') {
      this.props.onStart(this.state.currentRect)
    }
  }

  handleResizeStop = (ev, data) => {
    const newRect = {
      ...this.state.currentRect,
      width: data?.size?.width ?? this.state.currentRect.width,
      height: data?.size?.height ?? this.state.currentRect.height,
    }
    this.setState({ currentRect: newRect })
    if (typeof this.props.onStop === 'function') {
      this.props.onStop(newRect)
    }
  }

  handleStartDraggable = () => {
    if (typeof this.props.onStart === 'function') {
      this.props.onStart(this.state.currentRect)
    }
  }

  handleStopDraggable = (ev, data) => {
    const newRect = {
      ...this.state.currentRect,
      left: data?.x
        ? int(this.props.initialLeft) + data.x
        : this.state.currentRect.left,
      top: data?.y
        ? int(this.props.initialTop) + data.y
        : this.state.currentRect.top,
    }
    this.setState({ currentRect: newRect })
    if (typeof this.props.onStop === 'function') {
      this.props.onStop(newRect)
    }
  }

  render() {
    const { props } = this
    const { pan, size } = this.state

    let contents = (
      <Animated.View
        style={[
          styles.brDialogResizableBoxResizable,
          props.disabled && styles.brDisabled,
          {
            width: size.x,
            height: size.y,
          },
        ]}
      >
        {props.children}
        {!props.disabled && (
          <View
            style={styles.resizeHandle}
            {...this.resizePanResponder.panHandlers}
          >
            <Image source={images.resize} style={styles.resizeHandleImage} />
          </View>
        )}
      </Animated.View>
    )

    if (props.movable) {
      contents = (
        <Animated.View
          style={[
            styles.brDialogResizableBoxMovable,
            {
              transform: pan.getTranslateTransform(),
              left: int(props.initialLeft),
              top: int(props.initialTop),
            },
          ]}
          {...this.movePanResponder.panHandlers}
        >
          {contents}
        </Animated.View>
      )
    }

    if (props.modal) {
      contents = (
        <View style={styles.brDialogResizableBoxModal}>{contents}</View>
      )
    }

    return <View style={[styles.container, props.style]}>{contents}</View>
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#ffffff',
  },

  brDialogResizableBoxResizable: {
    position: 'relative',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flex: 1,
    // width: '100%',
    // height: '100%',
  },

  brDisabled: {
    opacity: 0.5,
  },

  brDialogResizableBoxMovable: {
    position: 'absolute',
    backgroundColor: 'white',
    width: 500,
    height: 400,
    flex: 1,
  },

  brDialogResizableBoxModal: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  resizeHandle: {
    position: 'absolute',
    width: 13,
    height: 13,
    bottom: 2,
    right: 2,
  },

  resizeHandleImage: {
    width: 13,
    height: 13,
    resizeMode: 'contain',
  },

  resizeHandleHidden: {
    display: 'none',
  },
})

export const images = {
  resize: require('../images/resize.png'),
}
