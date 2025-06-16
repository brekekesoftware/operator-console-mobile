import React from 'react'
import { int } from '../utilities/strings'
import {
  View,
  PanResponder,
  Animated,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native'
import Svg, { Path } from 'react-native-svg'

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
      canDrag: false,
    }

    this.setupPanResponders()
  }
  holdTimeout = null

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
      onPanResponderMove: (e, gesture) => {
        e.stopPropagation()
        Animated.event([null, { dx: this.state.pan.x, dy: this.state.pan.y }], {
          useNativeDriver: false,
        })(e, gesture)
      },
      onPanResponderRelease: (e, gesture) => {
        this.state.pan.flattenOffset()
        this.setState({ isDragging: false })
        this.handleStopDraggable(e, {
          x: gesture.dx,
          y: gesture.dy,
        })
      },
      onPanResponderTerminate: (e, gesture) => {
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
        return !this.props.disabled
      },
      onPanResponderGrant: () => {
        this.setState({ isResizing: true })
        this.handleResizeStart()
      },
      onPanResponderMove: (e, gesture) => {
          e.stopPropagation()
        const { resizableOpts } = this.props
        const { screenWidth, screenHeight } = this.state

        const newWidth = this.state.currentRect.width + gesture.dx
        const newHeight = this.state.currentRect.height + gesture.dy

        const minWidth = resizableOpts?.minConstraints?.[0] ?? 200
        const minHeight = resizableOpts?.minConstraints?.[1] ?? 200

        const maxWidth = Math.min(
          screenWidth - this.state.currentRect.left - 20,
          resizableOpts?.maxConstraints?.[0] ?? screenWidth,
        )
        const maxHeight = Math.min(
          screenHeight - this.state.currentRect.top - 20,
          resizableOpts?.maxConstraints?.[1] ?? screenHeight,
        )

        const width = Math.max(minWidth, Math.min(newWidth, maxWidth))
        const height = Math.max(minHeight, Math.min(newHeight, maxHeight))

        this.state.size.setValue({ x: width, y: height })
      },
      onPanResponderRelease: (e, gesture) => {
        this.setState({ isResizing: false })
        this.handleResizeStop(e, {
          size: {
            width: this.state.size.x._value,
            height: this.state.size.y._value,
          },
        })
      },
      onPanResponderTerminate: (e, gesture) => {
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

  componentDidUpdate(prevProps) {
    if (
      prevProps.initialWidth !== this.props.initialWidth ||
      prevProps.initialHeight !== this.props.initialHeight
    ) {
      this.setState({
        size: new Animated.ValueXY({
          x: int(this.props.initialWidth),
          y: int(this.props.initialHeight),
        }),
        currentRect: {
          left: int(this.props.initialLeft),
          top: int(this.props.initialTop),
          width: int(this.props.initialWidth),
          height: int(this.props.initialHeight),
        },
      })
    }
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
          <>
            <View
              style={styles.resizeHandle}
              {...this.resizePanResponder.panHandlers}
            >
              <Image source={images.resize} style={styles.resizeHandleImage} />
            </View>
            {props.movable && (
              <View
                style={styles.dragHandle}
                {...this.movePanResponder.panHandlers}
              >
                <DragIcon />
              </View>
            )}
          </>
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

const DragIcon = () => {
  return (
    <View>
      <Svg height={24} viewBox={'0 0 24 24'} width={24}>
        <Path
          d={
            'M22.67,12L18.18,16.5L15.67,14L17.65,12L15.67,10.04L18.18,7.53L22.67,12M12,1.33L16.47,5.82L13.96,8.33L12,6.35L10,8.33L7.5,5.82L12,1.33M12,22.67L7.53,18.18L10.04,15.67L12,17.65L14,15.67L16.5,18.18L12,22.67M1.33,12L5.82,7.5L8.33,10L6.35,12L8.33,13.96L5.82,16.47L1.33,12M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10Z'
          }
          fill={'#b6b6b6'}
        />
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#ffffff',
  },

  brDialogResizableBoxResizable: {
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flex: 1,
  },

  brDisabled: {
    opacity: 0.5,
  },

  brDialogResizableBoxMovable: {
    position: 'absolute',
    minWidth: 500,
    minHeight: 400,
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
    width: 24,
    height: 24,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },

  resizeHandleImage: {
    width: 13,
    height: 13,
    resizeMode: 'contain',
    opacity: 0.7,
  },

  resizeHandleHidden: {
    display: 'none',
  },

  dragHandle: {
    position: 'absolute',
    width: 20,
    height: 20,
    top: 0,
    left: -20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },

  dragHandleImage: {
    width: 13,
    height: 13,
    resizeMode: 'contain',
    opacity: 0.7,
  },
})

export const images = {
  resize: require('../images/resize.png'),
}
