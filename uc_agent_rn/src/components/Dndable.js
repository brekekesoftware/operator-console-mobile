import React from 'react'
import {
  View,
  PanResponder,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'

/**
 * Dndable - React Native version
 * A component that supports drag and drop functionality
 *
 * props.style - Additional styles for the component
 * props.dragSourceInfo - Information about the drag source
 * props.onCheckCanDrop - Function to check if dropping is allowed
 * props.onDrop - Function called when item is dropped
 * props.onClick - Function called when item is clicked/pressed
 */
export default class Dndable extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isDragging: false,
      isOver: false,
      canDrop: false,
      pan: new Animated.ValueXY(),
      opacity: new Animated.Value(1),
      dropTargets: [],
    }

    if (!global.dropTargets) {
      global.dropTargets = []
    }

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) =>
        !!this.props.dragSourceInfo,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) =>
        !!this.props.dragSourceInfo,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,

      onPanResponderGrant: (evt, gestureState) => {
        this.state.pan.setOffset({
          x: this.state.pan.x._value,
          y: this.state.pan.y._value,
        })
        this.state.pan.setValue({ x: 0, y: 0 })

        this.setState({ isDragging: true })

        Animated.timing(this.state.opacity, {
          toValue: 0.7,
          duration: 100,
          useNativeDriver: true,
        }).start()
      },

      onPanResponderMove: (evt, gestureState) => {
        Animated.event([null, { dx: this.state.pan.x, dy: this.state.pan.y }], {
          useNativeDriver: false,
        })(evt, gestureState)

        this.checkDropTargets(gestureState)
      },

      onPanResponderRelease: (evt, gestureState) => {
        this.state.pan.flattenOffset()

        Animated.timing(this.state.opacity, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }).start()

        const dropTarget = this.findDropTarget(gestureState)
        if (dropTarget && dropTarget.canDrop) {
          if (dropTarget.onDrop) {
            dropTarget.onDrop({
              dragSourceInfo: this.props.dragSourceInfo,
              didDrop: true,
            })
          }
        }

        Animated.spring(this.state.pan, {
          toValue: { x: 0, y: 0 },
          friction: 5,
          useNativeDriver: true,
        }).start(() => {
          this.setState({
            isDragging: false,
            isOver: false,
            canDrop: false,
          })
        })
      },

      onPanResponderTerminate: (evt, gestureState) => {
        Animated.parallel([
          Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.spring(this.state.pan, {
            toValue: { x: 0, y: 0 },
            friction: 5,
            useNativeDriver: true,
          }),
        ]).start(() => {
          this.setState({
            isDragging: false,
            isOver: false,
            canDrop: false,
          })
        })
      },
    })
  }

  componentDidMount() {
    if (this.props.onCheckCanDrop || this.props.onDrop) {
      this.dropTargetId = Date.now() + Math.random()
      global.dropTargets.push({
        id: this.dropTargetId,
        ref: this,
        onCheckCanDrop: this.props.onCheckCanDrop,
        onDrop: this.props.onDrop,
        measure: this.measure.bind(this),
      })
    }
  }

  componentWillUnmount() {
    if (this.dropTargetId) {
      const index = global.dropTargets.findIndex(
        dt => dt.id === this.dropTargetId,
      )
      if (index !== -1) {
        global.dropTargets.splice(index, 1)
      }
    }
  }

  measure(callback) {
    if (this.viewRef) {
      this.viewRef.measure(callback)
    }
  }

  checkDropTargets(gestureState) {
    // Get current position
    const { moveX, moveY } = gestureState

    // Check all registered drop targets
    let foundTarget = false
    global.dropTargets.forEach(target => {
      if (target.ref === this) return // Skip self

      target.measure((fx, fy, width, height, px, py) => {
        const isOver =
          moveX >= px &&
          moveX <= px + width &&
          moveY >= py &&
          moveY <= py + height

        let canDrop = false
        if (isOver && target.onCheckCanDrop) {
          canDrop = target.onCheckCanDrop({
            dragSourceInfo: this.props.dragSourceInfo,
          })
        }

        if (target.ref) {
          target.ref.setState({ isOver, canDrop })
        }

        if (isOver && canDrop) {
          foundTarget = true
        }
      })
    })

    return foundTarget
  }

  findDropTarget(gestureState) {
    const { moveX, moveY } = gestureState

    for (const target of global.dropTargets) {
      if (target.ref === this) continue

      if (target.ref.state.isOver && target.ref.state.canDrop) {
        return target
      }
    }

    return null
  }

  handlePress = () => {
    if (this.props.onClick && !this.state.isDragging) {
      this.props.onClick()
    }
  }

  render() {
    const { pan, opacity, isDragging, isOver, canDrop } = this.state
    const { style, children } = this.props

    const containerStyles = [
      styles.dndable,
      isDragging && styles.isDragging,
      isOver && styles.isOver,
      canDrop && styles.canDrop,
      style,
    ]

    const animatedStyles = {
      transform: pan.getTranslateTransform(),
      opacity: opacity,
    }

    return (
      <Animated.View
        ref={ref => (this.viewRef = ref)}
        style={[containerStyles, isDragging ? animatedStyles : null]}
        {...this.panResponder.panHandlers}
        onStartShouldSetResponder={() => true}
        onResponderRelease={this.handlePress}
      >
        {children}
      </Animated.View>
    )
  }
}

export class DndableSafe extends React.Component {
  render() {
    return (
      <View
        style={[styles.dndable, this.props.style]}
        onTouchEnd={this.props.onClick}
      >
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  dndable: {
    // Base styles
  },
  isDragging: {
    elevation: 5,
    zIndex: 999,
  },
  isOver: {
    backgroundColor: 'rgba(75, 197, 222, 0.1)', // Light version of medium_turquoise
  },
  canDrop: {
    borderWidth: 3,
    borderColor: '#4BC5DE', // medium_turquoise
  },
})
