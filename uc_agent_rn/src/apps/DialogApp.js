import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ChatPanel from '../components/ChatPanel.js'
import WebchatQueuePanel from '../components/WebchatQueuePanel.js'
import HistorySearchPanel from '../components/HistorySearchPanel.js'
import DialogResizableBox from '../components/DialogResizableBox.js'
import dialogCloseIcon from '../images/dialogCloseIcon.png'
import dialogHideIcon from '../images/dialoghide.png'
import LinearGradient from 'react-native-linear-gradient'

/**
 * DialogApp
 * props.uiData
 * props.uiData.dialogCloseButton_onClick
 * props.uiData.dialogHideButton_onClick
 * props.uiData.dialogButton_onClick
 * props.uiData.dialogResizableBox_onStop
 * props.panelType
 * props.panelCode
 * props.dialogOption
 */
class DialogApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      initialLeft: null,
      initialTop: null,
      initialWidth: null,
      initialHeight: null,
    }
  }

  componentDidMount() {
    const { dialogOption: option = {} } = this.props
    const { width: innerWidth, height: innerHeight } = Dimensions.get('window')

    const initialWidth =
      typeof option.initialWidth === 'number'
        ? Math.min(option.initialWidth, innerWidth)
        : innerWidth / 2

    const initialHeight =
      typeof option.initialHeight === 'number'
        ? Math.min(option.initialHeight, innerHeight)
        : innerHeight / 2

    const initialLeft =
      typeof option.initialLeft === 'number'
        ? Math.min(option.initialLeft, innerWidth - initialWidth)
        : innerWidth / 4

    const initialTop =
      typeof option.initialTop === 'number'
        ? Math.min(option.initialTop, innerHeight - initialHeight)
        : innerHeight / 4

    this.setState({
      initialLeft,
      initialTop,
      initialWidth,
      initialHeight,
    })
  }

  render() {
    const {
      uiData,
      panelType,
      panelCode,
      dialogOption: option = {},
    } = this.props
    let contents = null

    if (panelType === 'CONFERENCE' || panelType === 'CHAT') {
      contents = (
        <ChatPanel
          uiData={uiData}
          panelType={panelType}
          panelCode={panelCode}
        />
      )
    } else if (panelType === 'WEBCHATQUEUE') {
      contents = <WebchatQueuePanel uiData={uiData} />
    } else if (panelType === 'HISTORYSEARCH') {
      contents = (
        <HistorySearchPanel
          uiData={uiData}
          panelType={panelType}
          panelCode={panelCode}
          panelOption={option.panelOption}
          selectable={Boolean(option.selectable)}
          allSelectable={Boolean(option.allSelectable)}
          checkBox={Boolean(option.checkBox)}
          emphasize={Boolean(option.emphasize)}
        />
      )
    }

    const contentStyle = [
      styles.brDialogContent,
      option.buttons?.length && styles.brWithButtons,
    ]

    return (
      <DialogResizableBox
        style={[
          styles.brUCAgentApp,
          styles.brDialogApp,
          styles.brDialogAppDialogResizableBox,
        ]}
        disabled={!option.resizable}
        initialLeft={this.state.initialLeft}
        initialTop={this.state.initialTop}
        initialWidth={this.state.initialWidth}
        initialHeight={this.state.initialHeight}
        resizableOpts={{ minConstraints: [100, 100] }}
        movable={true}
        draggableOptsToMove={{ handle: 'brDraggable' }}
        modal={option.modal}
        onStop={() =>
          uiData.fire('dialogResizableBox_onStop', panelType, panelCode)
        }
      >
        <View
          style={[styles.brDialogTitle, option.draggable && styles.brDraggable]}
        >
          <Text>{string(option.title)}</Text>
          <TouchableOpacity
            style={[
              styles.brDialogCloseButton,
              !option.closeable && styles.brHidden,
            ]}
            onPress={() =>
              uiData.fire('dialogCloseButton_onClick', panelType, panelCode)
            }
          >
            <Image source={dialogCloseIcon} style={{ width: 21, height: 15 }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.brDialogHideButton,
              !option.hideable && styles.brHidden,
            ]}
            onPress={() =>
              uiData.fire('dialogHideButton_onClick', panelType, panelCode)
            }
          >
            <Image source={dialogHideIcon} style={{ width: 21, height: 15 }} />
          </TouchableOpacity>
        </View>

        <View style={styles.brDialogButtons}>
          {option.buttons?.map((button, i) => (
            <Pressable
              key={i}
              onPress={() =>
                uiData.fire(
                  'dialogButton_onClick',
                  panelType,
                  panelCode,
                  button.name,
                )
              }
              style={({ pressed }) => [
                styles.brDialogButtonWrapper,
                pressed && styles.brDialogButtonActive,
              ]}
            >
              <LinearGradient
                colors={
                  pressed
                    ? [
                        'rgba(255,255,255,0.1)',
                        'rgba(255,255,255,0.45)',
                        'rgba(255,255,255,0.65)',
                      ]
                    : [
                        'rgba(255,255,255,0.65)',
                        'rgba(255,255,255,0.45)',
                        'rgba(255,255,255,0.1)',
                      ]
                }
                style={styles.brDialogButton}
              >
                <Text
                  style={[
                    styles.brDialogButtonText,
                    pressed && styles.brDialogButtonTextActive,
                  ]}
                >
                  {string(button.caption)}
                </Text>
              </LinearGradient>
            </Pressable>
          ))}
        </View>

        <View style={contentStyle}>{contents}</View>
      </DialogResizableBox>
    )
  }
}

const styles = StyleSheet.create({
  brUCAgentApp: {
    flex: 1,
  },
  brDialogApp: {
    fontSize: 12,
    position: 'relative',
  },
  brDialogAppDialogResizableBox: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'white',
    shadowColor: '#ddd',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
  },
  brDialogTitle: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    height: 24,
    borderWidth: 1,
    borderColor: '#dcdcd5',
    borderBottomWidth: 0,
    paddingLeft: 12,
    backgroundColor: '#f2f3ef',
    lineHeight: 24,
    fontWeight: 'bold',
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brDraggable: {},
  brDialogCloseButton: {
    width: 21,
    height: 15,
    marginTop: 5,
    marginRight: 5,
    marginBottom: 4,
  },
  brDialogCloseButtonHover: {},
  brDialogCloseButtonActive: {},
  brDialogHideButton: {
    width: 21,
    height: 15,
    marginTop: 5,
    marginRight: 5,
    marginBottom: 4,
  },
  brHidden: {
    display: 'none',
  },
  brDialogContent: {
    position: 'absolute',
    left: 0,
    top: 24,
    right: 0,
    bottom: 0,
    borderWidth: 1,
    borderColor: '#dcdcd5',
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  brWithButtons: {
    bottom: 40,
    borderBottomColor: 'white',
  },
  brDialogButtons: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 40,
    borderWidth: 1,
    borderColor: '#dcdcd5',
    borderTopColor: 'white',
    backgroundColor: 'white',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  brDialogButtonWrapper: {
    marginHorizontal: 4,
  },
  brDialogButton: {
    height: 30,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#dcdcd5',
    backgroundColor: '#f8f8f6',
    borderRadius: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brDialogButtonText: {
    color: '#888169',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  brDialogButtonTextActive: {
    color: '#685947',
  },
  brDialogButtonActive: {
    backgroundColor: '#ccccc2',
  },
})

export default DialogApp
