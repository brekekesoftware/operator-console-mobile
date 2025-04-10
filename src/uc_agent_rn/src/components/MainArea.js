import React from 'react'
import {
  View,
  StyleSheet,
  PanResponder,
  Animated,
  Platform,
} from 'react-native'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import MainTabs from './MainTabs.js'

/**
 * MainArea - React Native version
 * A component that manages a resizable tabbed area with splitters
 *
 * props.uiData - UI data object
 * props.uiData.mainAreaSplitters - Number of splitters (0, 1, or 2)
 * props.style - Additional style
 */
export default class MainArea extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      splitterRight: 0,
      splitterBottom: 0,
      mainAreaWidth: 0,
      mainAreaHeight: 0,
      isOverDrop: false,
      canDrop: false,
    }

    this.rightSplitterPosition = new Animated.ValueXY({ x: 0, y: 0 })
    this.bottomSplitterPosition = new Animated.ValueXY({ x: 0, y: 0 })

    this.rightSplitterPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        this.rightSplitterPosition.setOffset({
          x: this.rightSplitterPosition.x._value,
          y: 0,
        })
        this.rightSplitterPosition.setValue({ x: 0, y: 0 })
      },
      onPanResponderMove: (evt, gestureState) => {
        this.rightSplitterPosition.setValue({
          x: gestureState.dx,
          y: 0,
        })

        const newSplitterRight = this.state.splitterRight - gestureState.dx

        if (newSplitterRight >= 0) {
          this.setState({ splitterRight: newSplitterRight })
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        this.rightSplitterPosition.flattenOffset()

        this.checkAndUpdateSplitterBounds()
      },
    })

    this.bottomSplitterPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        this.bottomSplitterPosition.setOffset({
          x: 0,
          y: this.bottomSplitterPosition.y._value,
        })
        this.bottomSplitterPosition.setValue({ x: 0, y: 0 })
      },
      onPanResponderMove: (evt, gestureState) => {
        this.bottomSplitterPosition.setValue({
          x: 0,
          y: gestureState.dy,
        })

        const newSplitterBottom = this.state.splitterBottom - gestureState.dy

        if (newSplitterBottom >= 0) {
          this.setState({ splitterBottom: newSplitterBottom })
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        this.bottomSplitterPosition.flattenOffset()

        this.checkAndUpdateSplitterBounds()
      },
    })
  }

  componentDidMount() {
    this.checkAndUpdateSplitterBounds()
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.uiData.mainAreaSplitters !==
        this.props.uiData.mainAreaSplitters ||
      prevState.mainAreaWidth !== this.state.mainAreaWidth ||
      prevState.mainAreaHeight !== this.state.mainAreaHeight
    ) {
      this.checkAndUpdateSplitterBounds()
    }
  }

  onLayout = event => {
    const { width, height } = event.nativeEvent.layout

    if (
      this.state.mainAreaWidth !== width ||
      this.state.mainAreaHeight !== height
    ) {
      this.setState({
        mainAreaWidth: width,
        mainAreaHeight: height,
      })
    }
  }

  checkAndUpdateSplitterBounds() {
    const { mainAreaWidth, mainAreaHeight, splitterRight, splitterBottom } =
      this.state
    const { uiData } = this.props
    const newState = {}

    if (mainAreaWidth > 0 && mainAreaHeight > 0) {
      if (uiData.mainAreaSplitters === 1 || uiData.mainAreaSplitters === 2) {
        const minWidth = 240
        const minRight = Math.min(minWidth, mainAreaWidth / 2)
        const maxRight = mainAreaWidth - minRight

        if (splitterRight < minRight) {
          newState.splitterRight = minRight
        } else if (maxRight < splitterRight) {
          newState.splitterRight = maxRight
        }
      }

      if (uiData.mainAreaSplitters === 2) {
        const minHeight = 240
        const minBottom = Math.min(minHeight, mainAreaHeight / 2)
        const maxBottom = mainAreaHeight - minBottom

        if (splitterBottom < minBottom) {
          newState.splitterBottom = minBottom
        } else if (maxBottom < splitterBottom) {
          newState.splitterBottom = maxBottom
        }
      }
    }

    if (Object.keys(newState).length > 0) {
      this.setState(newState)
    }
  }

  renderWithTwoSplitters() {
    const { props } = this
    const { splitterRight, splitterBottom, isOverDrop, canDrop } = this.state

    return (
      <View
        style={[
          styles.mainArea,
          styles.splitters2,
          isOverDrop && canDrop && styles.isOverCanDrop,
          props.style,
        ]}
        onLayout={this.onLayout}
      >
        <View
          style={[
            styles.mainTabsArea,
            {
              position: 'absolute',
              right: 0,
              bottom: 0,
              height: splitterBottom + 1,
              width: splitterRight + 1,
            },
          ]}
        >
          <MainTabs uiData={props.uiData} position='se' />
        </View>

        <View
          style={[
            styles.mainTabsArea,
            {
              position: 'absolute',
              left: 0,
              bottom: 0,
              height: splitterBottom + 1,
              right: splitterRight,
            },
          ]}
        >
          <MainTabs uiData={props.uiData} position='south' />
        </View>

        <View
          style={[
            styles.mainTabsArea,
            {
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: splitterBottom,
              width: splitterRight + 1,
            },
          ]}
        >
          <MainTabs uiData={props.uiData} position='east' />
        </View>

        <View
          style={[
            styles.mainTabsArea,
            {
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: splitterBottom,
              right: splitterRight,
            },
          ]}
        >
          <MainTabs uiData={props.uiData} position='center' />
        </View>

        <Animated.View
          style={[
            styles.mainAreaSplitterRight,
            {
              right: splitterRight,
              transform: [{ translateX: this.rightSplitterPosition.x }],
            },
          ]}
          {...this.rightSplitterPanResponder.panHandlers}
        />

        <Animated.View
          style={[
            styles.mainAreaSplitterBottom,
            {
              bottom: splitterBottom,
              transform: [{ translateY: this.bottomSplitterPosition.y }],
            },
          ]}
          {...this.bottomSplitterPanResponder.panHandlers}
        />
      </View>
    )
  }

  renderWithOneSplitter() {
    const { props } = this
    const { splitterRight, isOverDrop, canDrop } = this.state

    return (
      <View
        style={[
          styles.mainArea,
          styles.splitters1,
          isOverDrop && canDrop && styles.isOverCanDrop,
          props.style,
        ]}
        onLayout={this.onLayout}
      >
        <View
          style={[
            styles.mainTabsArea,
            {
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: splitterRight + 1,
            },
          ]}
        >
          <MainTabs uiData={props.uiData} position='east se' />
        </View>
        <View
          style={[
            styles.mainTabsArea,
            {
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              right: splitterRight,
            },
          ]}
        >
          <MainTabs uiData={props.uiData} position='center south' />
        </View>
        <Animated.View
          style={[
            styles.mainAreaSplitterRight,
            {
              right: splitterRight,
              transform: [{ translateX: this.rightSplitterPosition.x }],
            },
          ]}
          {...this.rightSplitterPanResponder.panHandlers}
        />
      </View>
    )
  }

  renderWithNoSplitters() {
    const { props } = this
    const { isOverDrop, canDrop } = this.state

    return (
      <View
        style={[
          styles.mainArea,
          styles.splitters0,
          isOverDrop && canDrop && styles.isOverCanDrop,
          props.style,
        ]}
        onLayout={this.onLayout}
      >
        {/* Full area */}
        <View
          style={[
            styles.mainTabsArea,
            {
              position: 'absolute',
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
            },
          ]}
        >
          <MainTabs uiData={props.uiData} position='center east south se' />
        </View>
      </View>
    )
  }

  render() {
    const { uiData } = this.props

    if (uiData.mainAreaSplitters === 2) {
      return this.renderWithTwoSplitters()
    } else if (uiData.mainAreaSplitters === 1) {
      return this.renderWithOneSplitter()
    } else {
      return this.renderWithNoSplitters()
    }
  }
}

const colors = {
  mediumTurquoise: '#4BC5DE',
  white: '#FFFFFF',
}

const styles = StyleSheet.create({
  mainArea: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  splitters0: {},
  splitters1: {},
  splitters2: {},
  isOverCanDrop: {
    borderWidth: 3,
    borderColor: colors.mediumTurquoise,
  },
  mainTabsArea: {
    backgroundColor: colors.white,
  },
  mainAreaSplitterRight: {
    position: 'absolute',
    width: 8,
    top: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 5,
    marginRight: -4,
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
  },
  mainAreaSplitterBottom: {
    position: 'absolute',
    height: 8,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    zIndex: 5,
    marginBottom: -4,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  callArea: {
    zIndex: 1,
  },
  chatArea: {
    zIndex: 0,
  },
  chatAreaWithContractedCallArea: {
    top: 48,
  },
  chatAreaWithExpandedCallArea: {
    top: 48,
  },
  chatAreaWithExpandedVideoLarge: {
    top: '50%',
  },
  chatAreaWithExpandedVideoSmall: {
    top: 144,
  },
  chatAreaWithIncomingProgress: {
    opacity: 0.4,
    left: -4,
    right: -4,
    top: 44,
    bottom: 66,
    padding: 8,
  },
  editorArea: {
    zIndex: 2,
  },
})
