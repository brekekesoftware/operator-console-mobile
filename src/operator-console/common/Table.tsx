import React, { Component } from 'react'
import type { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'

const sum = arr => arr.reduce((acc, n) => acc + n, 0)

type TProps = {
  style?: StyleProp<ViewStyle>
  children?:
    | string
    | JSX.Element
    | JSX.Element[]
    | (() => JSX.Element)
    | React.ReactNode
}

type DProps = string | React.ReactNode

type RProps = {
  style?: ViewStyle
  textStyle?: TextStyle
  data?: Array<DProps>
  widthArr?: Array<number>
  height?: number
  flexArr?: Array<number>
  heightArr?: Array<number>
}

type CProps = {
  style?: ViewStyle
  textStyle?: TextStyle
  width?: number
  data?: Array<DProps>
  heightArr?: Array<number>
  widthArr?: Array<number>
  flex?: number
  flexArr?: Array<number>
}

type CeProps = {
  style?: StyleProp<ViewStyle>
  textStyle?: TextStyle
  flex?: ViewStyle['flex']
  height?: ViewStyle['height']
  width?: ViewStyle['width']
  data?: DProps
  children?:
    | string
    | JSX.Element
    | JSX.Element[]
    | (() => JSX.Element)
    | React.ReactNode
}
export class Table extends Component<TProps> {
  _renderChildren(props) {
    return React.Children.map(props.children, child =>
      React.cloneElement(
        child,
        props.borderStyle && child.type.displayName !== 'ScrollView'
          ? { borderStyle: props.borderStyle }
          : {},
      ),
    )
  }

  render() {
    const { style } = this.props
    const borderLeftWidth = (style && style.borderWidth) || 0
    const borderBottomWidth = borderLeftWidth
    const borderColor = (style && style.borderColor) || '#000'

    return (
      <View
        style={[
          this.props.style,
          {
            borderLeftWidth,
            borderBottomWidth,
            borderColor,
          },
        ]}
      >
        {this._renderChildren(this.props)}
      </View>
    )
  }
}

export class TableWrapper extends Component<TProps> {
  _renderChildren(props) {
    return React.Children.map(props.children, child =>
      React.cloneElement(
        child,
        props.borderStyle ? { borderStyle: props.borderStyle } : {},
      ),
    )
  }

  render() {
    const { style } = this.props
    return (
      <View style={[{ flexDirection: 'row' }, style]}>
        {this._renderChildren(this.props)}
      </View>
    )
  }
}

export class Row extends Component<RProps> {
  render() {
    const { data, style, widthArr, height, flexArr, textStyle, ...props } =
      this.props
    const width = widthArr ? sum(widthArr) : 0

    return data ? (
      <View
        style={[height && { height }, width && { width }, styles.row, style]}
      >
        {data.map((item, i) => {
          const flex = flexArr && flexArr[i]
          const wth = widthArr && widthArr[i]
          return (
            <Cell
              key={i}
              data={item}
              width={wth}
              height={height}
              flex={flex}
              textStyle={textStyle}
              {...props}
            />
          )
        })}
      </View>
    ) : null
  }
}

export class Rows extends Component<RProps> {
  render() {
    const { data, style, widthArr, heightArr, flexArr, textStyle, ...props } =
      this.props
    const flex = flexArr ? sum(flexArr) : 0
    const width = widthArr ? sum(widthArr) : 0

    return data ? (
      <View style={[flex && { flex }, width && { width }]}>
        {data.map((item, i) => {
          const height = heightArr && heightArr[i]
          return (
            <Row
              key={i}
              data={item}
              widthArr={widthArr}
              height={height}
              flexArr={flexArr}
              style={style}
              textStyle={textStyle}
              {...props}
            />
          )
        })}
      </View>
    ) : null
  }
}

export class Col extends Component<CProps> {
  render() {
    const { data, style, width, heightArr, flex, textStyle, ...props } =
      this.props

    return data ? (
      <View style={[width ? { width } : { flex: 1 }, { flex }, style]}>
        {data.map((item, i) => {
          const height = heightArr && heightArr[i]
          return (
            <Cell
              key={i}
              data={item}
              width={width}
              height={height}
              textStyle={textStyle}
              {...props}
            />
          )
        })}
      </View>
    ) : null
  }
}

export class Cols extends Component<CProps> {
  render() {
    const { data, style, widthArr, heightArr, flexArr, textStyle, ...props } =
      this.props
    const width = widthArr ? sum(widthArr) : 0

    return data ? (
      <View style={[styles.cols, width && { width }]}>
        {data.map((item, i) => {
          const flex = flexArr && flexArr[i]
          const wth = widthArr && widthArr[i]
          return (
            <Col
              key={i}
              data={item}
              width={wth}
              heightArr={heightArr}
              flex={flex}
              style={style}
              textStyle={textStyle}
              {...props}
            />
          )
        })}
      </View>
    ) : null
  }
}

export class Cell extends Component<CeProps> {
  render() {
    const { data, width, height, flex, style, textStyle, children, ...p } =
      this.props
    const textDom = children ? (
      typeof children === 'string' ? (
        <Text style={[textStyle, { textAlign: 'center' }]}>{children}</Text>
      ) : (
        children
      )
    ) : React.isValidElement(data) ? (
      data
    ) : (
      <Text style={[textStyle, , { textAlign: 'center' }]} {...p}>
        {data}
      </Text>
    )
    const borderTopWidth = (style && style.borderWidth) || undefined
    const borderRightWidth = borderTopWidth
    const borderColor = (style && style.borderColor) || '#000'

    return (
      <View
        style={[
          {
            borderTopWidth,
            borderRightWidth,
            borderColor,
            padding: 10,
          },
          styles.cell,
          {
            width,
            height,
            flex,
          },
          !width && !flex && !height ? { flex: 1 } : {},
          style,
        ]}
      >
        {textDom}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
  cols: { flexDirection: 'row' },
  cell: { justifyContent: 'center' },
  text: { backgroundColor: 'transparent' },
})
