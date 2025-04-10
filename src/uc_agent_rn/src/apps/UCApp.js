import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import WidgetBody from '../components/WidgetBody.js'
import FlyweightAudioFactory from '../components/FlyweightAudioFactory.js'
import Incomingbar from '../components/Incomingbar.js'
import Licensebar from '../components/Licensebar.js'
import MainArea from '../components/MainArea.js'
import Messagebar from '../components/Messagebar.js'
import MultipleAudio from '../components/MultipleAudio.js'
import Sidebar from '../components/Sidebar.js'
import Statusbar from '../components/Statusbar.js'
import CURRENT_SCRIPT_URL from '../utilities/currentscript.js'
import { PanGestureHandler } from 'react-native-gesture-handler'

const sound = require('../sounds/bell.mp3')

/**
 * UCApp
 * props.uiData
 */
class UCApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      splitterLeft: 300,
    }
  }
  componentDidMount() {
    this.componentDidUpdate()
  }
  componentDidUpdate() {
    const { width } = Dimensions.get('window')
    const newState = {}

    const minWidth = 240
    const minLeft = Math.min(minWidth, width / 2)
    const maxLeft = width - minLeft

    if (this.state.splitterLeft < minLeft) {
      newState.splitterLeft = minLeft
    } else if (maxLeft < this.state.splitterLeft) {
      newState.splitterLeft = maxLeft
    }

    if (Object.keys(newState).length) {
      this.setState(newState)
    }
  }
  handleLeftDrag = event => {
    const { translationX } = event.nativeEvent
    const splitterLeft = this.state.splitterLeft + translationX
    this.setState({ splitterLeft: splitterLeft })
  }
  render() {
    const { uiData } = this.props
    const soundFiles = '0123456789'
      .split('')
      .concat([
        'asterisk',
        'bell',
        'pound',
        'ring',
        'ringback',
        'ringlong',
        'silent',
        'terminated',
        'tone1',
      ])
      .map(s => CURRENT_SCRIPT_URL.DIR + '../sounds/' + s + '.mp3')

    return (
      <View style={styles.container}>
        <WidgetBody uiData={uiData} modalOverlayStyle={styles.modalOverlay}>
          <FlyweightAudioFactory srcs={soundFiles} />
          <MultipleAudio
            uiData={uiData}
            audioStyle={styles.bellAudio}
            src={sound}
          />
          <MainArea style={{ left: this.state.splitterLeft }} uiData={uiData} />
          <Sidebar
            uiData={uiData}
            style={{ width: this.state.splitterLeft + 1 }}
          />
          <PanGestureHandler onGestureEvent={this.handleLeftDrag}>
            <View
              style={[styles.splitterLeft, { left: this.state.splitterLeft }]}
            />
          </PanGestureHandler>
          <Licensebar uiData={uiData} style={styles.licensebar} />
          <Statusbar uiData={uiData} style={styles.statusbar} />
          <Incomingbar uiData={uiData} style={styles.incomingbar} />
          <Messagebar uiData={uiData} style={styles.messagebar} />
        </WidgetBody>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'white',
  },
  bellAudio: {},
  splitterLeft: {
    position: 'absolute',
    left: -2,
    width: 5,
    top: 0,
    bottom: 0,
    backgroundColor: '#e0e0e0',
    zIndex: 1000,
  },
  licensebar: {
    position: 'absolute',
    top: 50,
    left: 272,
    right: 32,
  },
  statusbar: {
    position: 'absolute',
    top: 50,
    left: 272,
    right: 32,
  },
  incomingbar: {
    position: 'absolute',
    top: 50,
    left: 272,
    right: 32,
  },
  messagebar: {
    position: 'absolute',
    top: 50,
    left: 272,
    right: 32,
  },
})

export default UCApp
