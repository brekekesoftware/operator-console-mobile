import type { ReactNode } from 'react'
import { Component, createRef } from 'react'
import type {
  PanResponderGestureState,
  PanResponderInstance,
  StyleProp,
  ViewStyle,
} from 'react-native'
import { PanResponder, View } from 'react-native'

type Props = {
  children?: React.ReactNode
  onDragStart?: (d: { x: number; y: number; px: number; py: number }) => void
  onDrag?: (d: [number, number]) => void
  onDragEnd?: (d: [number, number], g: PanResponderGestureState) => void
  style?: StyleProp<ViewStyle>
}

type State = {
  w: number
  h: number
  x: number
  y: number
  isSelected: boolean
}

export class Draggable extends Component<Props, State> {
  _panResponder: PanResponderInstance
  position
  refDrag

  constructor(props) {
    super(props)

    this.state = {
      w: 100,
      h: 100,
      x: 0,
      y: 0,
      isSelected: false,
    }

    this.refDrag = createRef()

    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (event, gestureState) => true,
      onStartShouldSetPanResponderCapture: (event, gestureState) => true,
      onMoveShouldSetPanResponder: (event, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (event, gestureState) => true,

      onPanResponderGrant: (event, gestureState) => {
        const { onDragStart } = this.props

        this.position = {
          x: 0,
          y: 0,
        }

        this.onDragStart?.([0, 0])
      },
      onPanResponderMove: (event, gestureState) => {
        this.onDrag?.([
          gestureState.dx - this.position.x,
          gestureState.dy - this.position.y,
        ])

        this.position = {
          x: gestureState.dx,
          y: gestureState.dy,
        }
      },
      onPanResponderTerminationRequest: (event, gestureState) => true,
      onPanResponderRelease: (event, gestureState) => {
        this.onDragEnd?.([gestureState.moveX, gestureState.moveY], gestureState)
      },
      onPanResponderTerminate: (event, gestureState) => {},
      onShouldBlockNativeResponder: (event, gestureState) => true,
    })
  }

  onDragStart = coord => {
    const { onDragStart } = this.props
    this.refDrag.measure((fx, fy, width, height, px, py) => {
      onDragStart?.({ x: this.state.x, y: this.state.y, px, py })
    })
    this.setState(() => ({
      isSelected: true,
    }))
  }

  onDrag = coord => {
    const { onDrag } = this.props

    this.setState(() => {
      const newX = this.state.x + coord[0]
      const newY = this.state.y + coord[1]
      const nS = { ...this.state }

      nS.x = newX
      nS.y = newY

      onDrag?.([nS.x, nS.y])
      return nS
    })
  }

  onDragEnd = (coord, gestureState) => {
    const { onDragEnd } = this.props
    this.refDrag.measure((fx, fy, width, height, px, py) => {
      if (onDragEnd !== null) {
        onDragEnd?.([px, py], gestureState)
      }

      this.setState(prev => ({
        ...prev,
        x: 0,
        y: 0,
        isSelected: false,
      }))
    })
  }

  render(): ReactNode {
    const { x, y, w, h, isSelected } = this.state
    return (
      <>
        {/* {isSelected && (
          <View
            style={[
              {
                // position: 'relative',
                left: 0,
                top: 0,
                width: w,
                height: h,
                backgroundColor: 'red',
                zIndex: -1
              },
              this.props.style,
            ]}
          >
            {this.props.children}
          </View>
        )} */}
        <View
          style={[
            {
              // position: 'absolute',
              left: x,
              top: y,
              width: w,
              height: h,
              zIndex: isSelected ? 9999 : undefined,
              // backgroundColor: 'yellow'
            },
            this.props.style,
          ]}
          {...this._panResponder.panHandlers}
          ref={r => (this.refDrag = r)}
        >
          {this.props.children}
        </View>
      </>
    )
  }
}
