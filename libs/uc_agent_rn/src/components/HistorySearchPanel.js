import React from 'react'
import { View, StyleSheet, PanResponder, Dimensions, Text } from 'react-native'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import SearchConditionsArea from './SearchConditionsArea.js'
import SearchResultsArea from './SearchResultsArea.js'

/**
 * HistorySearchPanel
 * props.uiData
 * props.uiData.splitterTop_onChange
 * props.panelType
 * props.panelCode
 * props.panelOption
 * props.selectable
 * props.allSelectable
 * props.checkBox
 * props.emphasize
 */
export default class HistorySearchPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      splitterTop: 0,
      panelHeight: 0,
      isDragging: false,
    }
    this.upperPanelRef = React.createRef()
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: () => false,
      onPanResponderGrant: () => {
        this.setState({ isDragging: true })
      },
      onPanResponderMove: (evt, gestureState) => {
        evt.stopPropagation()
        const dampingFactor = 0.3
        const newTop = Math.max(
          0,
          Math.min(
            this.state.splitterTop + gestureState.dy * dampingFactor,
            this.state.panelHeight * 0.9,
          ),
        )
        this.setState({ splitterTop: newTop })
        this.props.uiData.fire(
          'splitterTop_onChange',
          this.props.panelType,
          this.props.panelCode,
          newTop,
        )
      },
      onPanResponderRelease: () => {
        this.setState({ isDragging: false })
      },
      onPanResponderTerminate: () => {
        this.setState({ isDragging: false })
      },
      onShouldBlockNativeResponder: () => false,
      onResponderTerminationRequest: () => false,
    })
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.panelHeight !== this.state.panelHeight) {
      const panelHeight = this.state.panelHeight
      const maxInitialTop = (panelHeight * 7) / 10

      let initialTop = maxInitialTop
      if (
        this.props.panelOption &&
        typeof this.props.panelOption.initialSplitterTop === 'number'
      ) {
        initialTop = Math.min(
          this.props.panelOption.initialSplitterTop,
          maxInitialTop,
        )
      } else {
        this.upperPanelRef.current.measure(
          (x, y, width, height, pageX, pageY) => {
            console.log('#Duy Phan console height', height)
            initialTop = Math.min(height + 4, maxInitialTop)
          },
        )
      }
      console.log('#Duy Phan console initialTop', initialTop)
      this.setState({
        splitterTop: initialTop,
        // panelHeight: panelHeight,
      })
    }
  }

  onLayout = event => {
    const { height } = event.nativeEvent.layout
    this.setState({ panelHeight: height })
  }

  render() {
    const { props } = this
    const { splitterTop, isDragging } = this.state

    return (
      <View style={styles.brHistorySearchPanel} onLayout={this.onLayout}>
        <View
          style={[styles.brHistorySearchPanelUpper, { height: splitterTop }]}
          ref={this.upperPanelRef}
        >
          <SearchConditionsArea
            uiData={props.uiData}
            panelType={props.panelType}
            panelCode={props.panelCode}
          />
        </View>

        <View
          {...this.panResponder.panHandlers}
          style={[
            styles.brHistorySearchPanelSplitter,
            isDragging && styles.brHistorySearchPanelSplitterActive,
            { top: splitterTop },
          ]}
          onStartShouldSetResponder={() => true}
          onResponderTerminationRequest={() => false}
        >
          <View
            style={[
              styles.brHistorySearchPanelSplitterThumb,
              isDragging && styles.brHistorySearchPanelSplitterThumbActive,
            ]}
          />
        </View>

        <View
          style={[styles.brHistorySearchPanelLower, { top: splitterTop + 10 }]}
        >
          <SearchResultsArea
            uiData={props.uiData}
            panelType={props.panelType}
            panelCode={props.panelCode}
            selectable={Boolean(props.selectable)}
            allSelectable={Boolean(props.allSelectable)}
            checkBox={Boolean(props.checkBox)}
            emphasize={Boolean(props.emphasize)}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  brHistorySearchPanel: {
    // position: 'absolute',
    // left: 8,
    // top: 8,
    // right: 8,
    // bottom: 8,
    backgroundColor: '#ffffff',
    // width: '100%',
    // height: '100%',
    // width: 500,
    // height: 400,
    flex: 1,
  },
  brHistorySearchPanelUpper: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    backgroundColor: '#ffffff',
    zIndex: 1,
  },
  brHistorySearchPanelLower: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ffffff',
    zIndex: 1,
  },
  brHistorySearchPanelSplitter: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 10,
    backgroundColor: '#ffffff',
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#dcdcd5',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  brHistorySearchPanelSplitterActive: {
    backgroundColor: '#dcdcd5',
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 3,
  },
  brHistorySearchPanelSplitterThumb: {
    position: 'absolute',
    left: '49%',
    width: 19,
    height: 1,
    top: 5,
    backgroundColor: '#dcdcd5',
  },
  brHistorySearchPanelSplitterThumbActive: {
    backgroundColor: '#ffffff',
  },
})
