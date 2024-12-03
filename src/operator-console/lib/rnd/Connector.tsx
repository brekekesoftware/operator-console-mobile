import { Component } from 'react'
import type { PanResponderInstance } from 'react-native'
import { PanResponder, View } from 'react-native'

import { IconDrag, IconResizeHorizontal, IconResizeVertical } from '../../icons'

export const CONNECTOR_TOP_LEFT = 'tl'
export const CONNECTOR_TOP_MIDDLE = 'tm'
export const CONNECTOR_TOP_RIGHT = 'tr'
export const CONNECTOR_MIDDLE_RIGHT = 'mr'
export const CONNECTOR_BOTTOM_RIGHT = 'br'
export const CONNECTOR_BOTTOM_MIDDLE = 'bm'
export const CONNECTOR_BOTTOM_LEFT = 'bl'
export const CONNECTOR_MIDDLE_LEFT = 'ml'
export const CONNECTOR_CENTER = 'c'

type Props = {
  onStart?: (arr: [number, number]) => void
  onMove?: (arr: [number, number]) => void
  onEnd?: (arr: [number, number]) => void
  x: number
  y: number
  size: number
  type: string
}

export class Connector extends Component<Props> {
  _panResponder: PanResponderInstance
  position: {
    x: number
    y: number
  }

  constructor(props) {
    super(props)

    this.position = {
      x: 0,
      y: 0,
    }

    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (event, gestureState) => true,
      onStartShouldSetPanResponderCapture: (event, gestureState) => true,
      onMoveShouldSetPanResponder: (event, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (event, gestureState) => true,

      onPanResponderGrant: (event, gestureState) => {
        const { onStart } = this.props

        this.position = {
          x: 0,
          y: 0,
        }

        onStart?.([0, 0])
      },
      onPanResponderMove: (event, gestureState) => {
        const { onMove } = this.props

        onMove?.([
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
        const { onEnd } = this.props

        onEnd?.([gestureState.moveX, gestureState.moveY])
      },
      onPanResponderTerminate: (event, gestureState) => {},
      onShouldBlockNativeResponder: (event, gestureState) => true,
    })
  }

  render() {
    const { x, y, size, type } = this.props

    let icon: any = null

    switch (type) {
      case CONNECTOR_MIDDLE_RIGHT:
      case CONNECTOR_MIDDLE_LEFT:
        icon = <IconResizeHorizontal />
        break
      case CONNECTOR_TOP_MIDDLE:
      case CONNECTOR_BOTTOM_MIDDLE:
        icon = <IconResizeVertical />
        break
      case CONNECTOR_CENTER:
        icon = <IconDrag />
        break
      default:
        icon = null
    }

    return (
      <View
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: size,
          height: size,
          // borderWidth: 2,
          // borderColor: 'black',
          // backgroundColor: 'white'
        }}
        {...this._panResponder.panHandlers}
      >
        {icon}
      </View>
    )
  }
}
