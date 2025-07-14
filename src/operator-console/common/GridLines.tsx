import React, { useEffect, useState } from 'react'
import type { ViewStyle } from 'react-native'
import { View } from 'react-native'

import { buildGridSvg } from './svgBuilder'

type GridLinesProps = {
  component?: React.ElementType
  style?: ViewStyle
  scale?: number
  cellWidth?: number
  cellHeight: number
  lineColor?: string
  strokeWidth?: number
  dashArray?: string
  cellWidth2?: number
  cellHeight2?: number
  lineColor2?: string
  strokeWidth2?: number
  dashArray2?: string
  format?: any
  orientation?: any
  children?: string | JSX.Element | JSX.Element[]
}

export const GridLines = React.forwardRef((props: GridLinesProps, ref) => {
  const {
    component = View,
    style,
    scale = 1,
    cellWidth = 60,
    cellHeight,
    lineColor = '#ccc',
    strokeWidth = 2,
    dashArray = '0',
    cellWidth2,
    cellHeight2,
    lineColor2 = '#ddd',
    strokeWidth2 = 1,
    dashArray2 = '0',
    format = 'A0',
    orientation,
    children,
    ...rest
  } = props
  const [bgContent, setBgContent] = useState<React.ReactNode | null>(null)
  const h = cellHeight || cellWidth
  const h2 = cellHeight2 || cellWidth2
  const ComponentProp = component

  useEffect(() => {
    setBgContent(
      buildGridSvg(
        cellWidth,
        h,
        lineColor,
        strokeWidth,
        dashArray,
        cellWidth2,
        h2,
        lineColor2,
        strokeWidth2,
        dashArray2,
        scale,
        format,
        orientation,
      ),
    )
  }, [
    cellWidth,
    h,
    lineColor,
    strokeWidth,
    dashArray,
    cellWidth2,
    h2,
    lineColor2,
    strokeWidth2,
    dashArray2,
    format,
    orientation,
    scale,
  ])

  return (
    <ComponentProp
      ref={ref}
      style={[
        style,
        {
          position: 'relative',
          overflow: 'hidden',
        },
      ]}
      {...rest}
    >
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
      >
        {bgContent}
      </View>
      <View
        style={{
          flex: 1,
          zIndex: 1,
        }}
      >
        {children}
      </View>
    </ComponentProp>
  )
})
