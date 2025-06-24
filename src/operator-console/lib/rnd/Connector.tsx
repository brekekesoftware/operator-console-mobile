import { Component } from 'react'
import type { GestureResponderEvent, PanResponderInstance } from 'react-native'
import { PanResponder, TouchableOpacity, View } from 'react-native'

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
  onPress?: (event: GestureResponderEvent) => void
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
      onStartShouldSetPanResponderCapture: (event, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
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
        event.preventDefault()
        event.stopPropagation()
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
      onPanResponderTerminate: (event, gestureState) => {
        const { onEnd } = this.props
        onEnd?.([gestureState.moveX, gestureState.moveY])
      },
      onShouldBlockNativeResponder: (event, gestureState) => true,
    })
  }

  render() {
    const { x, y, size, type, onPress } = this.props

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

    const isCenter = type === CONNECTOR_CENTER

    return (
      <View
        style={
          isCenter
            ? {
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                bottom: 0,
              }
            : {
                position: 'absolute',
                left: x,
                top: y,
                width: size,
                height: size,
              }
        }
        {...this._panResponder.panHandlers}
      >
        {isCenter ? (
          <TouchableOpacity
            style={{ width: '100%', height: '100%' }}
            onPress={onPress}
          >
            <View style={{ flex: 1 }}></View>
          </TouchableOpacity>
        ) : (
          icon
        )}
      </View>
    )
  }
}
