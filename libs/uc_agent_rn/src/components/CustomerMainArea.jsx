import React from 'react'
import { int, string } from '../utilities/strings'
import ReactDOM from 'react-dom'
import CustomerSignInArea from './CustomerSignInArea'
import CustomerChatArea from './CustomerChatArea'
import CustomerCallArea from './CustomerCallArea'
import CustomerEditorArea from './CustomerEditorArea'
import DndableSafe from './DndableSafe'

/**
 * CustomerMainArea
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.configurations
 * props.uiData.mainArea_onDrop
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorAreaDisabled: false,
    }
  }
  componentDidUpdate() {
    const props = this.props
    const newState = {}
    const chatArea = ReactDOM.findDOMNode(this.refs['chatArea'])
    if (
      chatArea &&
      chatArea.querySelector &&
      chatArea.querySelector(
        '.brReplyButton:not(.brDisabled):not(.brEnableEditor)',
      )
    ) {
      if (!this.state.editorAreaDisabled) {
        newState.editorAreaDisabled = true
      }
    } else {
      if (this.state.editorAreaDisabled) {
        newState.editorAreaDisabled = false
      }
    }
    if (Object.keys(newState).length) {
      this.setState(newState)
    }
  }
  render() {
    const props = this.props
    const myUcCimUserType = int(props.uiData.ucUiStore.getUcCimUserType())
    const conf_id = props.uiData.ucUiStore.getGuestConfId()
    const panelCode = string(
      props.uiData.ucUiStore.getChatCodeByConfId({ conf_id: conf_id }).chatCode,
    )
    let className = 'brMainArea'
    let withMenuOptions = false
    if (!conf_id) {
      return (
        <div className={className}>
          <CustomerSignInArea uiData={props.uiData} />
        </div>
      )
    } else {
      if (
        props.uiData.configurations &&
        props.uiData.configurations.menuOptions &&
        props.uiData.configurations.menuOptions.length
      ) {
        className += ' brWithMenuOptions'
        withMenuOptions = true
      }
      return (
        <DndableSafe
          uiData={props.uiData}
          dndableClass={
            (int(props.uiData.ucUiStore.getOptionalSetting({ key: 'fsp' })) &
              myUcCimUserType) !==
            myUcCimUserType
              ? 'FileDndable'
              : ''
          }
          className={className}
          onDrop={props.uiData.fire.bind(
            props.uiData,
            'mainArea_onDrop',
            'CONFERENCE',
            panelCode,
          )}
        >
          <CustomerCallArea
            uiData={props.uiData}
            withMenuOptions={withMenuOptions}
          />
          <CustomerChatArea
            ref='chatArea'
            uiData={props.uiData}
            panelType={'CONFERENCE'}
            panelCode={panelCode}
            withMenuOptions={withMenuOptions}
          />
          <CustomerEditorArea
            uiData={props.uiData}
            panelType={'CONFERENCE'}
            panelCode={panelCode}
            withMenuOptions={withMenuOptions}
            disabled={this.state.editorAreaDisabled}
          />
        </DndableSafe>
      )
    }
  }
}
