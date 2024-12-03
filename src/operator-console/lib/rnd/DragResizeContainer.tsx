import { PureComponent } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import { View } from 'react-native'

type Props = {
  style?: StyleProp<ViewStyle>
  onInit?: (d: { x: number; y: number; w: number; h: number }) => void
  children?: React.ReactNode
}

export class DragResizeContainer extends PureComponent<Props> {
  canvas: View | null = null

  render() {
    const { style, onInit, children } = this.props

    return (
      <View
        ref={view => {
          this.canvas = view
        }}
        style={style}
        onLayout={() => {
          this.canvas?.measure((fx, fy, w, h, x, y) => {
            onInit?.({
              x: 0,
              y: 0,
              w,
              h,
            })
          })
        }}
      >
        {children}
      </View>
    )
  }
}
