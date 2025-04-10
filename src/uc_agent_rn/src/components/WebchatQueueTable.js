import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  PanResponder,
  Animated,
  TouchableOpacity,
} from 'react-native'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ButtonIconic from './ButtonIconic.js'
import ButtonLabeled from './ButtonLabeled.js'
import NameEmbeddedSpan from './NameEmbeddedSpan.js'
import TimerSpan from './TimerSpan.js'
import SimpleButton from './SimpleButton.js'
import { toPlainText } from '../utilities/strings.js'

/**
 * WebchatQueueTable - React Native version
 * A component that displays webchat queue information in a table-like layout
 */
export default class WebchatQueueTable extends React.Component {
  constructor(props) {
    super(props)

    const lastState = props.uiData.ucUiStore.getLocalStoragePreference({
      keyList: [
        props.resizerName + '_' + 'commandWidth',
        props.resizerName + '_' + 'agentWidth',
        props.resizerName + '_' + 'nameWidth',
      ],
    })

    this.state = {
      commandWidth: int(lastState[0]) || 50,
      agentWidth: int(lastState[1]) || 70,
      nameWidth: int(lastState[2]) || 70,
      containerWidth: 0,
    }

    this.commandPanResponder = this.createColumnPanResponder('commandWidth')
    this.agentPanResponder = this.createColumnPanResponder('agentWidth')
    this.namePanResponder = this.createColumnPanResponder('nameWidth')
  }

  createColumnPanResponder(columnKey) {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        this.startWidth = this.state[columnKey]
      },
      onPanResponderMove: (evt, gestureState) => {
        const newWidth = this.startWidth + gestureState.dx
        this.setState({ [columnKey]: newWidth })
      },
      onPanResponderRelease: () => {
        this.props.uiData.ucUiAction.setLocalStoragePreference({
          keyValueList: [
            {
              key: this.props.resizerName + '_' + columnKey,
              value: string(this.state[columnKey]),
            },
          ],
        })
        this.checkAndUpdateColumnBounds()
      },
    })
  }

  onLayout = event => {
    const { width } = event.nativeEvent.layout
    if (width !== this.state.containerWidth) {
      this.setState({ containerWidth: width }, this.checkAndUpdateColumnBounds)
    }
  }

  checkAndUpdateColumnBounds() {
    const { containerWidth, commandWidth, agentWidth, nameWidth } = this.state
    const { bigStyle } = this.props
    const newState = {}

    if (containerWidth > 0) {
      const commandWidthMin = bigStyle ? 100 : 50
      const commandWidthMax = bigStyle ? 190 : 50
      if (commandWidth < commandWidthMin) {
        newState.commandWidth = commandWidthMin
      } else if (commandWidth > commandWidthMax) {
        newState.commandWidth = commandWidthMax
      }

      const agentWidthMin = 50
      const agentWidthMax = 100
      if (agentWidth < agentWidthMin) {
        newState.agentWidth = agentWidthMin
      } else if (agentWidth > agentWidthMax) {
        newState.agentWidth = agentWidthMax
      }

      const nameWidthMin = 50
      const nameWidthMax = Math.max(
        nameWidthMin,
        containerWidth - commandWidthMin - agentWidthMin - 50,
      )
      if (nameWidth < nameWidthMin) {
        newState.nameWidth = nameWidthMin
      } else if (nameWidth > nameWidthMax) {
        newState.nameWidth = nameWidthMax
      }
    }

    if (Object.keys(newState).length > 0) {
      this.setState(newState)
    }
  }

  renderHeader() {
    const { commandWidth, agentWidth, nameWidth } = this.state

    return (
      <View style={styles.headerRow}>
        <View style={[styles.headerCell, { width: commandWidth }]}>
          <View
            {...this.commandPanResponder.panHandlers}
            style={styles.resizeHandle}
          />
        </View>

        <View style={[styles.headerCell, { width: agentWidth }]}>
          <Text style={styles.headerText}>
            {uawMsgs.LBL_WEBCHAT_QUEUE_TABLE_AGENT_COLUMN}
          </Text>
          <View
            {...this.agentPanResponder.panHandlers}
            style={styles.resizeHandle}
          />
        </View>

        <View style={[styles.headerCell, { width: nameWidth }]}>
          <Text style={styles.headerText}>
            {uawMsgs.LBL_WEBCHAT_QUEUE_TABLE_NAME_COLUMN}
          </Text>
          <View
            {...this.namePanResponder.panHandlers}
            style={styles.resizeHandle}
          />
        </View>

        <View style={styles.headerCell}>
          <Text style={styles.headerText}>
            {uawMsgs.LBL_WEBCHAT_QUEUE_TABLE_MESSAGE_COLUMN}
          </Text>
        </View>
      </View>
    )
  }

  renderQueueRow(webchatQueue) {
    const { commandWidth, agentWidth, nameWidth } = this.state
    const { props } = this
    const lines = Math.max(1, int(props.uiData.configurations.queueLines))

    let agent = null
    if (webchatQueue.assigned.user_id) {
      agent = (
        <NameEmbeddedSpan
          ucUiStore={props.uiData.ucUiStore}
          format='{0}'
          title='{0}'
          buddy={webchatQueue.assigned}
        />
      )
    } else if (
      webchatQueue.conf_status === Constants.CONF_STATUS_INVITED_WEBCHAT
    ) {
      agent = <TimerSpan baseTime={webchatQueue.baseTime} />
    }

    const profinfo = string(webchatQueue.webchatinfo.profinfo_formatted)
    const profinfoLines = profinfo.split('\n').slice(0, lines)

    const messageTextLines = webchatQueue.messageList
      .slice(-lines)
      .map(msg =>
        msg.ctype === Constants.CTYPE_TEXT ? toPlainText(msg.messageText) : '',
      )
      .filter(text => text)

    const messageFullText = webchatQueue.messageList.reduce(
      (prev, curr) =>
        prev +
        (curr.ctype === Constants.CTYPE_TEXT
          ? toPlainText(curr.messageText)
          : '') +
        '\n',
      '',
    )

    return (
      <View key={webchatQueue.conf_id} style={styles.row}>
        <View style={[styles.cell, { width: commandWidth }]}>
          {this.renderCommandButtons(webchatQueue)}
        </View>

        <View style={[styles.cell, { width: agentWidth }]}>{agent}</View>

        <View style={[styles.cell, { width: nameWidth }]}>
          <Text numberOfLines={lines} style={styles.profinfoText}>
            {profinfoLines.join('\n')}
          </Text>
        </View>

        <View style={styles.cell}>
          <Text numberOfLines={lines} style={styles.messageText}>
            {messageTextLines.join('\n')}
          </Text>
          {this.renderHideButton(webchatQueue)}
        </View>
      </View>
    )
  }

  renderCommandButtons(webchatQueue) {
    const { props } = this
    const isInvited =
      webchatQueue.conf_status === Constants.CONF_STATUS_INVITED_WEBCHAT

    if (props.bigStyle) {
      return (
        <View style={styles.commandButtons}>
          <ButtonLabeled
            style={styles.commandButton}
            title={
              isInvited
                ? uawMsgs.LBL_WEBCHAT_ROOM_CHAT_BUTON_TOOLTIP
                : uawMsgs.LBL_WEBCHAT_ROOM_SHOW_BUTON_TOOLTIP
            }
            disabled={
              !isInvited &&
              webchatQueue.conf_status !== Constants.CONF_STATUS_JOINED
            }
            vivid={isInvited}
            onPress={() =>
              props.uiData.fire(
                'webchatRoomChatButton_onClick',
                webchatQueue.conf_id,
              )
            }
          >
            {isInvited
              ? uawMsgs.LBL_WEBCHAT_ROOM_CHAT_BUTON
              : uawMsgs.LBL_WEBCHAT_ROOM_SHOW_BUTON}
          </ButtonLabeled>

          <ButtonLabeled
            style={styles.commandButton}
            title={uawMsgs.LBL_WEBCHAT_ROOM_JOIN_BUTON_TOOLTIP}
            disabled={
              webchatQueue.conf_status !== Constants.CONF_STATUS_INVITED
            }
            onPress={() =>
              props.uiData.fire(
                'webchatRoomJoinButton_onClick',
                webchatQueue.conf_id,
              )
            }
          >
            {uawMsgs.LBL_WEBCHAT_ROOM_JOIN_BUTON}
          </ButtonLabeled>
        </View>
      )
    }

    return (
      <View style={styles.commandButtons}>
        <SimpleButton
          style={[
            styles.simpleButton,
            isInvited ? styles.chatButton : styles.showButton,
          ]}
          title={
            isInvited
              ? uawMsgs.LBL_WEBCHAT_ROOM_CHAT_BUTON_TOOLTIP
              : uawMsgs.LBL_WEBCHAT_ROOM_SHOW_BUTON_TOOLTIP
          }
          disabled={
            !isInvited &&
            webchatQueue.conf_status !== Constants.CONF_STATUS_JOINED
          }
          onPress={() =>
            props.uiData.fire(
              'webchatRoomChatButton_onClick',
              webchatQueue.conf_id,
            )
          }
        >
          {isInvited ? (
            <Image source={require('../images/webchatroomchat.png')} />
          ) : (
            <Image source={require('../images/webchatroomshow.png')} />
          )}
        </SimpleButton>

        <SimpleButton
          style={[styles.simpleButton, styles.joinButton]}
          title={uawMsgs.LBL_WEBCHAT_ROOM_JOIN_BUTON_TOOLTIP}
          disabled={webchatQueue.conf_status !== Constants.CONF_STATUS_INVITED}
          onPress={() =>
            props.uiData.fire(
              'webchatRoomJoinButton_onClick',
              webchatQueue.conf_id,
            )
          }
        >
          <Image source={require('../images/webchatroomjoin.png')} />
        </SimpleButton>
      </View>
    )
  }

  renderHideButton(webchatQueue) {
    const { props } = this
    if (
      props.uiData.configurations.queueAll &&
      webchatQueue.conf_status === Constants.CONF_STATUS_INACTIVE
    ) {
      return (
        <ButtonIconic
          style={styles.hideButton}
          iconName='close'
          title={uawMsgs.LBL_WEBCHAT_ROOM_HIDE_BUTON_TOOLTIP}
          onPress={() =>
            props.uiData.fire(
              'webchatRoomHideButton_onClick',
              webchatQueue.conf_id,
            )
          }
        />
      )
    }
    return null
  }

  render() {
    const { props } = this
    let queueList = props.uiData.ucUiStore.getWebchatQueueList()

    if (props.filter === 'INVITED_WEBCHAT') {
      queueList = queueList.filter(
        queue => queue.conf_status === Constants.CONF_STATUS_INVITED_WEBCHAT,
      )
    } else if (!props.uiData.configurations.queueAll) {
      queueList = queueList.filter(
        queue =>
          queue.conf_status !== Constants.CONF_STATUS_INACTIVE &&
          (queue.creator.conf_status === Constants.CONF_STATUS_JOINED ||
            queue.creator.conf_status ===
              Constants.CONF_STATUS_LEFT_UNANSWERED ||
            queue.from.conf_status === Constants.CONF_STATUS_JOINED ||
            queue.isTalking),
      )
    }

    return (
      <View
        style={[
          styles.container,
          props.bigStyle && styles.bigStyle,
          props.resizerName && styles.columnResizable,
        ]}
        onLayout={this.onLayout}
      >
        {this.renderHeader()}
        <ScrollView>
          {queueList.map(queue => this.renderQueueRow(queue))}
        </ScrollView>
      </View>
    )
  }
}

const colors = {
  platinum: '#E0E0E0',
  isabelline: '#EEEEEE',
  portlandOrange: '#FF4526',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.platinum,
    borderBottomWidth: 1,
    borderBottomColor: colors.platinum,
    backgroundColor: '#FFFFFF',
  },
  headerCell: {
    position: 'relative',
    padding: 2,
    paddingHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  headerText: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 20.8, // 1.6 * 13
    letterSpacing: 0.3,
    textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
    height: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.platinum,
  },
  rowHover: {
    backgroundColor: colors.isabelline,
  },
  cell: {
    position: 'relative',
    padding: 2,
    paddingHorizontal: 4,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  cellText: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 20.8,
    letterSpacing: 0.3,
  },
  resizeHandle: {
    position: 'absolute',
    width: 16,
    height: '100%',
    right: -8,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  resizeHandleActive: {
    backgroundColor: colors.platinum,
  },
  commandButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  simpleButton: {
    width: 20,
    height: 20,
    marginRight: 2,
  },
  commandButton: {
    width: 80,
    margin: 4,
    marginLeft: 8,
  },
  agentIsMe: {
    color: colors.portlandOrange,
  },
  hideButton: {
    position: 'absolute',
    right: 4,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  bigStyle: {},
  commandColumn: {},
  bigStyleCommandColumn: {
    flexWrap: 'wrap',
  },
  columnResizable: {},
  messageText: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 20.8,
    letterSpacing: 0.3,
    color: '#424242',
  },
  profinfoText: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 20.8,
    letterSpacing: 0.3,
  },
})
