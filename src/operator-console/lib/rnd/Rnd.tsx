import type React from 'react'
import { Component } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import { TouchableWithoutFeedback, View } from 'react-native'

import {
  Connector,
  CONNECTOR_BOTTOM_LEFT,
  CONNECTOR_BOTTOM_MIDDLE,
  CONNECTOR_BOTTOM_RIGHT,
  CONNECTOR_CENTER,
  CONNECTOR_MIDDLE_LEFT,
  CONNECTOR_MIDDLE_RIGHT,
  CONNECTOR_TOP_LEFT,
  CONNECTOR_TOP_MIDDLE,
  CONNECTOR_TOP_RIGHT,
} from './Connector'

export const AXIS_X = 'x'
export const AXIS_Y = 'y'
export const AXIS_ALL = 'all'

const CONNECTOR_SIZE = 14
const DEFAULT_Z_INDEX = 1

type Props = {
  x?: number
  y?: number
  w?: number
  h?: number
  minW?: number
  minH?: number
  axis?: string
  limitation: {
    x: number
    y: number
    w: number
    h: number
  }
  isDisabled?: boolean
  isDraggable?: boolean
  isResizable?: boolean
  connectors?: Array<any>
  onPress?: (e: any) => void
  onDragStart?: (e: [number, number]) => void
  onDrag?: (e: [number, number]) => void
  onDragEnd?: (e: [number, number]) => void
  onResizeStart?: (e: [number, number]) => void
  onResize?: (e: [number, number]) => void
  onResizeEnd?: (e: { x: number; y: number; h: number; w: number }) => void
  zIndex?: number
  children?: React.ReactNode | string | JSX.Element | JSX.Element[]
  grid?: [number, number]
  style?: StyleProp<ViewStyle>
}

type State = {
  isSelected: boolean
  x: number
  y: number
  w: number
  h: number
  isShowConnector: boolean
}

export class Rnd extends Component<Props, State> {
  connectorsMap: {
    [key: string]: {
      calculateX: (width: number) => number
      calculateY: (height: number) => number
      onStart: (e: [number, number]) => void
      onMove: (e: [number, number]) => void
      onEnd: (e: [number, number]) => void
    }
  }

  constructor(props) {
    super(props)

    const { x = 0, y = 0, w = 100, h = 100, minW = 50, minH = 50 } = this.props

    this.state = {
      isSelected: false,
      x,
      y,
      w: w < minW ? minW : w,
      h: h < minH ? minH : h,
      isShowConnector: false,
    }

    this.connectorsMap = {}

    this.connectorsMap[CONNECTOR_TOP_LEFT] = {
      calculateX: width => 0,
      calculateY: height => 0,
      onStart: this.onResizeStart,
      onMove: this.onResizeTL,
      onEnd: this.onResizeEnd,
    }

    this.connectorsMap[CONNECTOR_TOP_MIDDLE] = {
      calculateX: width => width / 2 - CONNECTOR_SIZE / 2,
      calculateY: height => 0,
      onStart: this.onResizeStart,
      onMove: this.onResizeTM,
      onEnd: this.onResizeEnd,
    }

    this.connectorsMap[CONNECTOR_TOP_RIGHT] = {
      calculateX: width => width - CONNECTOR_SIZE,
      calculateY: height => 0,
      onStart: this.onResizeStart,
      onMove: this.onResizeTR,
      onEnd: this.onResizeEnd,
    }

    this.connectorsMap[CONNECTOR_MIDDLE_RIGHT] = {
      calculateX: width => width - CONNECTOR_SIZE,
      calculateY: height => height / 2 - CONNECTOR_SIZE / 2,
      onStart: this.onResizeStart,
      onMove: this.onResizeMR,
      onEnd: this.onResizeEnd,
    }

    this.connectorsMap[CONNECTOR_BOTTOM_RIGHT] = {
      calculateX: width => width - CONNECTOR_SIZE,
      calculateY: height => height - CONNECTOR_SIZE,
      onStart: this.onResizeStart,
      onMove: this.onResizeBR,
      onEnd: this.onResizeEnd,
    }

    this.connectorsMap[CONNECTOR_BOTTOM_MIDDLE] = {
      calculateX: width => width / 2 - CONNECTOR_SIZE / 2,
      calculateY: height => height - CONNECTOR_SIZE,
      onStart: this.onResizeStart,
      onMove: this.onResizeBM,
      onEnd: this.onResizeEnd,
    }

    this.connectorsMap[CONNECTOR_BOTTOM_LEFT] = {
      calculateX: width => 0,
      calculateY: height => height - CONNECTOR_SIZE,
      onStart: this.onResizeStart,
      onMove: this.onResizeBL,
      onEnd: this.onResizeEnd,
    }

    this.connectorsMap[CONNECTOR_MIDDLE_LEFT] = {
      calculateX: width => 0,
      calculateY: height => height / 2 - CONNECTOR_SIZE / 2,
      onStart: this.onResizeStart,
      onMove: this.onResizeML,
      onEnd: this.onResizeEnd,
    }

    this.connectorsMap[CONNECTOR_CENTER] = {
      calculateX: width => width / 2 - CONNECTOR_SIZE / 2,
      calculateY: height => height / 2 - CONNECTOR_SIZE / 2,
      onStart: this.onDragStart,
      onMove: this.onDrag,
      onEnd: this.onDragEnd,
    }
  }

  onPress = event => {
    const { onPress } = this.props
    onPress?.(event)
    this.setState({
      isShowConnector: !this.state.isShowConnector,
    })
  }

  onResizeStart = coord => {
    const { onResizeStart } = this.props

    this.setState(() => ({
      isSelected: true,
    }))

    onResizeStart?.([this.state.x, this.state.y])
  }

  onResizeTL = coord => {
    const {
      minW = 50,
      minH = 50,
      axis = AXIS_ALL,
      isResizable = false,
      limitation,
      onResize,
    } = this.props

    if (!isResizable) {
      return
    }

    this.setState(() => {
      const newX = this.state.x + coord[0]
      const newY = this.state.y + coord[1]
      const newW = this.state.x + this.state.w - newX
      const newH = this.state.y + this.state.h - newY

      const nS = { ...this.state }

      if (newW >= minW && axis != AXIS_Y) {
        if (limitation.x <= newX) {
          nS.w = newW
          nS.x = newX
        }
      }

      if (newH >= minH && axis != AXIS_X) {
        if (limitation.y <= newY) {
          nS.h = newH
          nS.y = newY
        }
      }

      if (onResize !== null) {
        onResize?.([nS.x, nS.y])
      }

      return nS
    })
  }

  onResizeTM = coord => {
    const {
      minH = 50,
      axis = AXIS_ALL,
      isResizable = false,
      limitation,
      onResize,
    } = this.props

    if (!isResizable) {
      return
    }

    this.setState(() => {
      const newY = this.state.y + coord[1]
      const newH = this.state.y + this.state.h - newY
      const nS = { ...this.state }

      if (newH >= minH && axis != AXIS_X) {
        if (limitation.y <= newY) {
          nS.h = newH
          nS.y = newY
        }
      }

      if (onResize !== null) {
        onResize?.([nS.x, nS.y])
      }

      return nS
    })
  }

  onResizeTR = coord => {
    const {
      minW = 50,
      minH = 50,
      axis = AXIS_ALL,
      isResizable = false,
      limitation,
      onResize,
    } = this.props

    if (!isResizable) {
      return
    }

    this.setState(() => {
      const newY = this.state.y + coord[1]
      const newW = this.state.w + coord[0]
      const newH = this.state.y + this.state.h - newY
      const nS = { ...this.state }

      if (newW >= minW && axis != AXIS_Y) {
        if (limitation.w >= this.state.x + newW) {
          nS.w = newW
        }
      }

      if (newH >= minH && axis != AXIS_X) {
        if (limitation.y <= newY) {
          nS.h = newH
          nS.y = newY
        }
      }

      if (onResize !== null) {
        onResize?.([nS.x, nS.y])
      }

      return nS
    })
  }

  onResizeMR = coord => {
    const {
      minW = 50,
      axis = AXIS_ALL,
      isResizable = false,
      limitation,
      onResize,
    } = this.props

    if (!isResizable) {
      return
    }

    this.setState(() => {
      const newW = this.state.w + coord[0]
      const nS = { ...this.state }

      if (newW >= minW && axis != AXIS_Y) {
        if (limitation.w >= this.state.x + newW) {
          nS.w = newW
        }
      }

      if (onResize !== null) {
        onResize?.([nS.x, nS.y])
      }

      return nS
    })
  }

  onResizeBR = coord => {
    const {
      minW = 50,
      minH = 50,
      axis = AXIS_ALL,
      isResizable,
      limitation,
      onResize,
    } = this.props

    if (!isResizable) {
      return
    }

    this.setState(() => {
      const newW = this.state.w + coord[0]
      const newH = this.state.h + coord[1]
      const nS = { ...this.state }

      if (newW >= minW && axis != AXIS_Y) {
        if (limitation.w >= this.state.x + newW) {
          nS.w = newW
        }
      }

      if (newH >= minH && axis != AXIS_X) {
        if (limitation.h >= this.state.y + newH) {
          nS.h = newH
        }
      }

      onResize?.([nS.x, nS.y])

      return nS
    })
  }

  onResizeBM = coord => {
    const {
      minH = 50,
      axis = AXIS_ALL,
      isResizable,
      limitation,
      onResize,
    } = this.props

    if (!isResizable) {
      return
    }

    this.setState(() => {
      const newH = this.state.h + coord[1]
      const nS = { ...this.state }

      if (newH >= minH && axis != AXIS_X) {
        if (limitation.h >= this.state.y + newH) {
          nS.h = newH
        }
      }

      if (onResize !== null) {
        onResize?.([nS.x, nS.y])
      }

      return nS
    })
  }

  onResizeBL = coord => {
    const {
      minW = 50,
      minH = 50,
      axis = AXIS_ALL,
      isResizable,
      limitation,
      onResize,
    } = this.props

    if (!isResizable) {
      return
    }

    this.setState(() => {
      const newX = this.state.x + coord[0]
      const newW = this.state.x + this.state.w - newX
      const newH = this.state.h + coord[1]
      const nS = { ...this.state }

      if (newW >= minW && axis != AXIS_Y) {
        if (limitation.x <= newX) {
          nS.w = newW
          nS.x = newX
        }
      }

      if (newH >= minH && axis != AXIS_X) {
        if (nS.y + newH <= limitation.h) {
          nS.h = newH
        }
      }

      onResize?.([nS.x, nS.y])

      return nS
    })
  }

  snapToGrid = (
    grid: [number, number],
    pendingX: number,
    pendingY: number,
  ): [number, number] => {
    const x = Math.round(pendingX / grid[0]) * grid[0]
    const y = Math.round(pendingY / grid[1]) * grid[1]
    return [x, y]
  }

  onResizeML = coord => {
    const {
      minW = 50,
      axis = AXIS_ALL,
      isResizable,
      limitation,
      onResize,
    } = this.props

    if (!isResizable) {
      return
    }

    this.setState(() => {
      const newX = this.state.x + coord[0]
      const newW = this.state.x + this.state.w - newX
      const nS = { ...this.state }

      if (newW >= minW && axis != AXIS_Y) {
        if (limitation.x <= newX) {
          nS.w = newW
          nS.x = newX
        }
      }

      onResize?.([nS.x, nS.y])

      return nS
    })
  }

  /**
   * Handle resize end event.
   * @param {Array} coord - Press coordinate [x,y].
   */
  onResizeEnd = coord => {
    const { onResizeEnd } = this.props

    this.setState(() => ({
      isSelected: false,
    }))

    if (onResizeEnd !== null) {
      onResizeEnd?.({
        x: this.state.x,
        y: this.state.y,
        w: this.state.w,
        h: this.state.h,
      })
    }
  }

  onDragStart = coord => {
    const { onDragStart } = this.props

    this.setState(() => ({
      isSelected: true,
    }))

    onDragStart?.([this.state.x, this.state.y])
  }

  onDrag = coord => {
    const {
      axis = AXIS_ALL,
      isDraggable,
      limitation,
      onDrag,
      grid = [10, 10],
    } = this.props

    if (!isDraggable) {
      return
    }

    this.setState(() => {
      const newX = this.state.x + coord[0]
      const newY = this.state.y + coord[1]
      const nS = { ...this.state }

      if (axis != AXIS_Y) {
        if (limitation.x <= newX && limitation.w >= newX + this.state.w) {
          nS.x = newX
        }
      }

      if (axis != AXIS_X) {
        if (limitation.y <= newY && limitation.h >= newY + this.state.h) {
          nS.y = newY
        }
      }

      const deltaX = coord[0] || 0
      const deltaY = coord[1] || 0

      const [newDX, newDY] = this.snapToGrid(grid, deltaX, deltaY)

      if (!deltaX && !deltaY) {
        return
      } else {
        nS.x = this.state.x + newDX
        nS.y = this.state.y + newDY
      }
      onDrag?.([nS.x, nS.y])

      return nS
    })
  }

  onDragEnd = coord => {
    const { onDragEnd } = this.props

    this.setState(() => ({
      isSelected: false,
    }))

    if (onDragEnd !== null) {
      onDragEnd?.([this.state.x, this.state.y])
    }
  }

  renderConnectors = () => {
    const { connectors = [] } = this.props

    const { w, h } = this.state

    return connectors.map(connectorType => (
      <Connector
        key={connectorType}
        type={connectorType}
        size={CONNECTOR_SIZE}
        x={this.connectorsMap[connectorType].calculateX(w)}
        y={this.connectorsMap[connectorType].calculateY(h)}
        onStart={this.connectorsMap[connectorType].onStart}
        onMove={this.connectorsMap[connectorType].onMove}
        onEnd={this.connectorsMap[connectorType].onEnd}
      />
    ))
  }

  render() {
    const { children, isDisabled, zIndex = DEFAULT_Z_INDEX, style } = this.props

    const { x, y, w, h, isSelected, isShowConnector } = this.state

    return (
      <View
        style={[
          style,
          {
            position: 'absolute',
            left: x,
            top: y,
            width: w,
            height: h,
            padding: CONNECTOR_SIZE / 2,
            zIndex: isSelected ? zIndex + 1 : zIndex,
          },
        ]}
      >
        <TouchableWithoutFeedback onPress={this.onPress}>
          <View
            style={{
              width: '100%',
              height: '100%',
              opacity: isSelected ? 0.7 : 1,
            }}
          >
            {children}
          </View>
        </TouchableWithoutFeedback>

        {isDisabled || !isShowConnector ? null : this.renderConnectors()}
      </View>
    )
  }
}
