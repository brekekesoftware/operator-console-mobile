import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ReactDOM from 'react-dom'
import Draggable from 'react-draggable'
import ButtonIconic from './ButtonIconic.js'
import ButtonLabeled from './ButtonLabeled.js'
import NameEmbeddedSpan from './NameEmbeddedSpan.js'
import TimerSpan from './TimerSpan.js'
import SimpleButton from './SimpleButton.js'
import { toPlainText } from '../utilities/strings.js'

/**
 * WebchatQueueTable
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.configurations
 * props.uiData.webchatRoomChatButton_onClick
 * props.uiData.webchatRoomJoinButton_onClick
 * props.filter
 * props.bigStyle
 * props.resizerName
 */
export default class extends React.Component {
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
    }
  }
  componentDidMount() {
    this.componentDidUpdate()
  }
  componentDidUpdate() {
    const props = this.props
    const newState = {}
    const node = ReactDOM.findDOMNode(this)
    if (node && node.clientWidth) {
      const commandWidthMin = props.bigStyle ? 100 : 50
      const commandWidthMax = props.bigStyle ? 190 : 50
      const agentWidthMin = 50
      const agentWidthMax = 100
      const nameWidthMin = 50
      const nameWidthMax = Math.max(
        nameWidthMin,
        node.clientWidth - commandWidthMin - agentWidthMin - 50,
      )
      if (this.state.commandWidth < commandWidthMin) {
        newState.commandWidth = commandWidthMin
      } else if (this.state.commandWidth > commandWidthMax) {
        newState.commandWidth = commandWidthMax
      }
      if (this.state.agentWidth < agentWidthMin) {
        newState.agentWidth = agentWidthMin
      } else if (this.state.agentWidth > agentWidthMax) {
        newState.agentWidth = agentWidthMax
      }
      if (this.state.nameWidth < nameWidthMin) {
        newState.nameWidth = nameWidthMin
      } else if (this.state.nameWidth > nameWidthMax) {
        newState.nameWidth = nameWidthMax
      }
    }
    if (Object.keys(newState).length) {
      this.setState(newState)
    }
  }
  handleDrag(key, ev, ui) {
    const props = this.props
    const newState = {}
    newState[key] = this.state[key] + ui.deltaX
    this.setState(newState)
  }
  handleStop(key, ev, ui) {
    const props = this.props
    props.uiData.ucUiAction.setLocalStoragePreference({
      keyValueList: [
        { key: props.resizerName + '_' + key, value: string(this.state[key]) },
      ],
    })
  }
  render() {
    const props = this.props
    let queueList = props.uiData.ucUiStore.getWebchatQueueList()
    if (props.filter === 'INVITED_WEBCHAT') {
      queueList = queueList.filter(webchatQueue => {
        return (
          webchatQueue.conf_status === Constants.CONF_STATUS_INVITED_WEBCHAT
        )
      })
    } else if (!props.uiData.configurations.queueAll) {
      queueList = queueList.filter(webchatQueue => {
        return (
          webchatQueue.conf_status !== Constants.CONF_STATUS_INACTIVE &&
          (webchatQueue.creator.conf_status === Constants.CONF_STATUS_JOINED ||
            webchatQueue.creator.conf_status ===
              Constants.CONF_STATUS_LEFT_UNANSWERED ||
            webchatQueue.from.conf_status === Constants.CONF_STATUS_JOINED ||
            webchatQueue.isTalking)
        )
      })
    }
    const queueTrs = queueList.map(webchatQueue => {
      const lines = Math.max(1, int(props.uiData.configurations.queueLines))
      let agent = ''
      if (webchatQueue.assigned.user_id) {
        agent = (
          <NameEmbeddedSpan
            ucUiStore={props.uiData.ucUiStore}
            format={'{0}'}
            title={'{0}'}
            buddy={webchatQueue.assigned}
          />
        )
      } else if (
        webchatQueue.conf_status === Constants.CONF_STATUS_INVITED_WEBCHAT
      ) {
        agent = <TimerSpan baseTime={webchatQueue.baseTime} />
      }
      const profinfo = string(webchatQueue.webchatinfo.profinfo_formatted)
      const profinfoLines = profinfo
        .split('\n')
        .slice(0, lines)
        .map((currentValue, index) => (
          <span key={index}>
            {index > 0 ? <br /> : ''}
            {currentValue}
          </span>
        ))
      let messageTextLines = []
      let messageFullText = ''
      if (webchatQueue.messageList.length > 0) {
        messageTextLines = webchatQueue.messageList
          .slice(
            Math.max(0, webchatQueue.messageList.length - lines),
            webchatQueue.messageList.length,
          )
          .map((currentValue, index) => (
            <span key={index}>
              {index > 0 ? <br /> : ''}
              {currentValue.ctype === Constants.CTYPE_TEXT
                ? toPlainText(currentValue.messageText)
                : ''}
            </span>
          ))
        messageFullText = webchatQueue.messageList.reduce(
          (previousValue, currentValue) =>
            previousValue +
            (currentValue.ctype === Constants.CTYPE_TEXT
              ? toPlainText(currentValue.messageText)
              : '') +
            ' \n',
          '',
        )
      }
      if (props.uiData.configurations.queueAll) {
        messageTextLines.push(
          <ButtonIconic
            key='webchatRoomHideButton'
            className='brWebchatRoomHideButton br_bi_icon_close_svg'
            hidden={webchatQueue.conf_status !== Constants.CONF_STATUS_INACTIVE}
            title={uawMsgs.LBL_WEBCHAT_ROOM_HIDE_BUTON_TOOLTIP}
            onClick={props.uiData.fire.bind(
              props.uiData,
              'webchatRoomHideButton_onClick',
              webchatQueue.conf_id,
            )}
          />,
        )
      }
      const commandButtons = [
        props.bigStyle ? (
          <ButtonLabeled
            key='webchatRoomChatButton'
            className='brCommandButton'
            title={
              webchatQueue.conf_status === Constants.CONF_STATUS_INVITED_WEBCHAT
                ? uawMsgs.LBL_WEBCHAT_ROOM_CHAT_BUTON_TOOLTIP
                : uawMsgs.LBL_WEBCHAT_ROOM_SHOW_BUTON_TOOLTIP
            }
            disabled={
              webchatQueue.conf_status !==
                Constants.CONF_STATUS_INVITED_WEBCHAT &&
              webchatQueue.conf_status !== Constants.CONF_STATUS_JOINED
            }
            vivid={
              webchatQueue.conf_status === Constants.CONF_STATUS_INVITED_WEBCHAT
            }
            onClick={props.uiData.fire.bind(
              props.uiData,
              'webchatRoomChatButton_onClick',
              webchatQueue.conf_id,
            )}
          >
            {webchatQueue.conf_status === Constants.CONF_STATUS_INVITED_WEBCHAT
              ? uawMsgs.LBL_WEBCHAT_ROOM_CHAT_BUTON
              : uawMsgs.LBL_WEBCHAT_ROOM_SHOW_BUTON}
          </ButtonLabeled>
        ) : (
          <SimpleButton
            key='webchatRoomChatButton'
            className={
              webchatQueue.conf_status === Constants.CONF_STATUS_INVITED_WEBCHAT
                ? 'brWebchatRoomChatButton'
                : 'brWebchatRoomShowButton'
            }
            title={
              webchatQueue.conf_status === Constants.CONF_STATUS_INVITED_WEBCHAT
                ? uawMsgs.LBL_WEBCHAT_ROOM_CHAT_BUTON_TOOLTIP
                : uawMsgs.LBL_WEBCHAT_ROOM_SHOW_BUTON_TOOLTIP
            }
            disabled={
              webchatQueue.conf_status !==
                Constants.CONF_STATUS_INVITED_WEBCHAT &&
              webchatQueue.conf_status !== Constants.CONF_STATUS_JOINED
            }
            onClick={props.uiData.fire.bind(
              props.uiData,
              'webchatRoomChatButton_onClick',
              webchatQueue.conf_id,
            )}
          ></SimpleButton>
        ),
        props.bigStyle ? (
          <ButtonLabeled
            key='webchatRoomJoinButton'
            className='brCommandButton'
            title={uawMsgs.LBL_WEBCHAT_ROOM_JOIN_BUTON_TOOLTIP}
            disabled={
              webchatQueue.conf_status !== Constants.CONF_STATUS_INVITED
            }
            onClick={props.uiData.fire.bind(
              props.uiData,
              'webchatRoomJoinButton_onClick',
              webchatQueue.conf_id,
            )}
          >
            {uawMsgs.LBL_WEBCHAT_ROOM_JOIN_BUTON}
          </ButtonLabeled>
        ) : (
          <SimpleButton
            key='webchatRoomJoinButton'
            className='brWebchatRoomJoinButton'
            title={uawMsgs.LBL_WEBCHAT_ROOM_JOIN_BUTON_TOOLTIP}
            disabled={
              webchatQueue.conf_status !== Constants.CONF_STATUS_INVITED
            }
            onClick={props.uiData.fire.bind(
              props.uiData,
              'webchatRoomJoinButton_onClick',
              webchatQueue.conf_id,
            )}
          ></SimpleButton>
        ),
      ]
      return (
        <tr key={webchatQueue.conf_id}>
          <td
            className='brCommandColumn'
            style={{ width: this.state.commandWidth + 'px' }}
          >
            {commandButtons}
            <Draggable
              axis='x'
              position={{ x: this.state.commandWidth, y: 0 }}
              onDrag={this.handleDrag.bind(this, 'commandWidth')}
              onStop={this.handleStop.bind(this, 'commandWidth')}
            >
              <div className='brSplitter'></div>
            </Draggable>
          </td>
          <td
            className='brAgentColumn'
            style={{ width: this.state.agentWidth + 'px' }}
          >
            {agent}
            <Draggable
              axis='x'
              position={{ x: this.state.agentWidth, y: 0 }}
              onDrag={this.handleDrag.bind(this, 'agentWidth')}
              onStop={this.handleStop.bind(this, 'agentWidth')}
            >
              <div className='brSplitter'></div>
            </Draggable>
          </td>
          <td
            className='brNameColumn'
            style={{ width: this.state.nameWidth + 'px' }}
          >
            <span title={profinfo}>{profinfoLines}</span>
            <Draggable
              axis='x'
              position={{ x: this.state.nameWidth, y: 0 }}
              onDrag={this.handleDrag.bind(this, 'nameWidth')}
              onStop={this.handleStop.bind(this, 'nameWidth')}
            >
              <div className='brSplitter'></div>
            </Draggable>
          </td>
          <td className='brMessageColumn' title={messageFullText}>
            {messageTextLines}
          </td>
        </tr>
      )
    })
    return (
      <table
        className={
          'brWebchatQueueTable' +
          (props.bigStyle ? ' brBigStyle' : '') +
          (props.resizerName ? ' brColumnResizable' : '')
        }
      >
        <thead>
          <tr>
            <th
              className='brCommandColumn'
              style={{ width: this.state.commandWidth + 'px' }}
            >
              <Draggable
                axis='x'
                position={{ x: this.state.commandWidth, y: 0 }}
                onDrag={this.handleDrag.bind(this, 'commandWidth')}
                onStop={this.handleStop.bind(this, 'commandWidth')}
              >
                <div className='brSplitter'></div>
              </Draggable>
            </th>
            <th
              className='brAgentColumn'
              style={{ width: this.state.agentWidth + 'px' }}
            >
              {uawMsgs.LBL_WEBCHAT_QUEUE_TABLE_AGENT_COLUMN}
              <Draggable
                axis='x'
                position={{ x: this.state.agentWidth, y: 0 }}
                onDrag={this.handleDrag.bind(this, 'agentWidth')}
                onStop={this.handleStop.bind(this, 'agentWidth')}
              >
                <div className='brSplitter'></div>
              </Draggable>
            </th>
            <th
              className='brNameColumn'
              style={{ width: this.state.nameWidth + 'px' }}
            >
              {uawMsgs.LBL_WEBCHAT_QUEUE_TABLE_NAME_COLUMN}
              <Draggable
                axis='x'
                position={{ x: this.state.nameWidth, y: 0 }}
                onDrag={this.handleDrag.bind(this, 'nameWidth')}
                onStop={this.handleStop.bind(this, 'nameWidth')}
              >
                <div className='brSplitter'></div>
              </Draggable>
            </th>
            <th className='brMessageColumn'>
              {uawMsgs.LBL_WEBCHAT_QUEUE_TABLE_MESSAGE_COLUMN}
            </th>
          </tr>
        </thead>
        <tbody>{queueTrs}</tbody>
      </table>
    )
  }
}
