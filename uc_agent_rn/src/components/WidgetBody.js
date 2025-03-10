import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'
import BgColorEditForm from './BgColorEditForm.js'
import BroadcastForm from './BroadcastForm.js'
import ButtonLabeled from './ButtonLabeled.js'
import ConferenceInviteForm from './ConferenceInviteForm.js'
import ConfirmForm from './ConfirmForm.js'
import DropDownMenu from './DropDownMenu.js'
import MenuItem from './MenuItem.js'
import OutgoingWebchatForm from './OutgoingWebchatForm.js'
import StatusDisplayForm from './StatusDisplayForm.js'
import UserListForm from './UserListForm.js'

/**
 * WidgetBody
 * props.uiData
 * props.uiData.modalInfo
 * props.uiData.widgetBody_onClick
 * props.uiData.modalOk_onClick
 * props.uiData.modalCancel_onClick
 * props.uiData.modalThirdButton_onClick
 * props.modalOverlayClassName
 */
export default class extends React.Component {
  handleModalAfterOpen() {
    const modalTable = ReactDOM.findDOMNode(this.refs['modalTable'])
    if (
      modalTable &&
      modalTable.parentNode &&
      modalTable.parentNode.style &&
      modalTable.offsetHeight
    ) {
      modalTable.parentNode.style.height = modalTable.offsetHeight + 'px'
    }
    const modalOk = ReactDOM.findDOMNode(this.refs['modalOk'])
    if (modalOk && modalOk.focus) {
      modalOk.focus()
    }
  }
  handleModalTableKeyDown(ev) {
    const props = this.props
    const modalInfo = props.uiData.modalInfo
    if (ev && ev.keyCode === 13 && !ev.shiftKey) {
      props.uiData.fire('modalOk_onClick', this.refs['content'])
      ev.preventDefault()
    } else if (ev && ev.keyCode === 27 && !ev.shiftKey) {
      props.uiData.fire(
        modalInfo.cancelByThirdButton
          ? 'modalThirdButton_onClick'
          : 'modalCancel_onClick',
        this.refs['content'],
      )
      ev.preventDefault()
    }
  }
  handleModalCheckBoxClick(ev) {
    const props = this.props
    const modalInfo = props.uiData.modalInfo
    if (modalInfo) {
      modalInfo.checkBoxChecked = Boolean(!modalInfo.checkBoxChecked)
    }
    this.setState({})
  }
  handleModalMenuItemClick(index, ev) {
    const props = this.props
    const modalInfo = props.uiData.modalInfo
    if (
      modalInfo &&
      modalInfo.selectItemList &&
      modalInfo.selectItemList.length
    ) {
      for (let i = 0; i < modalInfo.selectItemList.length; i++) {
        modalInfo.selectItemList[i].selected = i === index
      }
    }
    this.setState({})
  }
  handleModalOKButtonClick(ev) {
    const props = this.props
    props.uiData.fire('modalOk_onClick', this.refs['content'])
  }
  handleModalCancelButtonClick(ev) {
    const props = this.props
    props.uiData.fire('modalCancel_onClick', this.refs['content'])
  }
  handleModalThirdButtonClick(ev) {
    const props = this.props
    props.uiData.fire('modalThirdButton_onClick', this.refs['content'])
  }
  render() {
    const props = this.props
    const modalInfo = props.uiData.modalInfo
    const content =
      modalInfo && modalInfo.contentClass === 'ConferenceInviteForm' ? (
        <ConferenceInviteForm
          ref='content'
          uiData={props.uiData}
          params={modalInfo.contentParams}
        />
      ) : modalInfo && modalInfo.contentClass === 'BroadcastForm' ? (
        <BroadcastForm
          ref='content'
          uiData={props.uiData}
          params={modalInfo.contentParams}
        />
      ) : modalInfo && modalInfo.contentClass === 'UserListForm' ? (
        <UserListForm
          ref='content'
          uiData={props.uiData}
          params={modalInfo.contentParams}
        />
      ) : modalInfo && modalInfo.contentClass === 'StatusDisplayForm' ? (
        <StatusDisplayForm
          ref='content'
          uiData={props.uiData}
          params={modalInfo.contentParams}
        />
      ) : modalInfo && modalInfo.contentClass === 'BgColorEditForm' ? (
        <BgColorEditForm
          ref='content'
          uiData={props.uiData}
          params={modalInfo.contentParams}
        />
      ) : modalInfo && modalInfo.contentClass === 'OutgoingWebchatForm' ? (
        <OutgoingWebchatForm
          ref='content'
          uiData={props.uiData}
          params={modalInfo.contentParams}
        />
      ) : modalInfo && modalInfo.contentClass === 'ConfirmForm' ? (
        <ConfirmForm
          ref='content'
          uiData={props.uiData}
          params={modalInfo.contentParams}
        />
      ) : modalInfo &&
        modalInfo.contentParams &&
        modalInfo.contentParams.content ? (
        <div ref='content'>{modalInfo.contentParams.content}</div>
      ) : (
        <div ref='content'></div>
      )
    return (
      <div
        className='brWidgetBody'
        onClick={props.uiData.fire.bind(props.uiData, 'widgetBody_onClick')}
      >
        <Modal
          className={
            'brWidgetBodyModal' +
            (modalInfo && modalInfo.modalClassName
              ? ' ' + modalInfo.modalClassName
              : '')
          }
          overlayClassName={
            'brWidgetBodyModalOverlay' +
            (props.modalOverlayClassName
              ? ' ' + props.modalOverlayClassName
              : '') +
            (modalInfo && modalInfo.overlayClassName
              ? ' ' + modalInfo.overlayClassName
              : '')
          }
          style={(modalInfo && modalInfo.modalStyle) || {}}
          isOpen={modalInfo !== null}
          onAfterOpen={this.handleModalAfterOpen.bind(this)}
        >
          <div
            ref='modalTable'
            className={
              'brModalTable' +
              (modalInfo && modalInfo.tableClassName
                ? ' ' + modalInfo.tableClassName
                : '')
            }
            onKeyDown={this.handleModalTableKeyDown.bind(this)}
          >
            <div className='brModalTitle'>{modalInfo && modalInfo.title}</div>
            <div className='brModalContent'>{content}</div>
            <div className='brModalMessage'>
              {(modalInfo &&
                (modalInfo.asHTML ? (
                  <span
                    dangerouslySetInnerHTML={{ __html: modalInfo.message }}
                  />
                ) : (
                  modalInfo.message
                ))) ||
                ''}
              <span
                className={
                  'brModalCheckBox' +
                  (modalInfo && modalInfo.checkBoxLabel
                    ? modalInfo.checkBoxChecked
                      ? ' br_bi_icon_check_svg'
                      : ' br_bi_icon_square_svg'
                    : ' brHidden')
                }
                onClick={this.handleModalCheckBoxClick.bind(this)}
              >
                {modalInfo && modalInfo.checkBoxLabel}
              </span>
              <DropDownMenu
                uiData={props.uiData}
                className='brModalMenu'
                hidden={
                  !(
                    modalInfo &&
                    modalInfo.selectItemList &&
                    modalInfo.selectItemList.length
                  )
                }
                text={string(
                  modalInfo &&
                    modalInfo.selectItemList &&
                    modalInfo.selectItemList.filter &&
                    modalInfo.selectItemList
                      .filter(item => item.selected)
                      .map(item => item.label)
                      .pop(),
                )}
              >
                {modalInfo &&
                  modalInfo.selectItemList &&
                  modalInfo.selectItemList.map &&
                  modalInfo.selectItemList.map((item, i) => (
                    <MenuItem
                      key={i}
                      dropDown={true}
                      onClick={this.handleModalMenuItemClick.bind(this, i)}
                    >
                      {item.label}
                    </MenuItem>
                  ))}
              </DropDownMenu>
            </div>
            <ButtonLabeled
              ref='modalOk'
              className={
                'brModalOKButton ' + string(modalInfo && modalInfo.okClassName)
              }
              vivid={true}
              title={(modalInfo && modalInfo.okCaption) || uawMsgs.CMN_OK}
              onClick={this.handleModalOKButtonClick.bind(this)}
            >
              {(modalInfo && modalInfo.okCaption) || uawMsgs.CMN_OK}
            </ButtonLabeled>
            <ButtonLabeled
              className={
                'brModalCancelButton ' +
                string(modalInfo && modalInfo.cancelClassName)
              }
              title={
                (modalInfo && modalInfo.cancelCaption) || uawMsgs.CMN_CANCEL
              }
              hidden={!(modalInfo && modalInfo.cancelable)}
              onClick={this.handleModalCancelButtonClick.bind(this)}
            >
              {(modalInfo && modalInfo.cancelCaption) || uawMsgs.CMN_CANCEL}
            </ButtonLabeled>
            <ButtonLabeled
              className={
                'brModalThirdButtonButton ' +
                string(modalInfo && modalInfo.thirdButtonClassName)
              }
              title={
                (modalInfo && modalInfo.thirdButtonCaption) || uawMsgs.CMN_CLOSE
              }
              hidden={!(modalInfo && modalInfo.thirdButton)}
              onClick={this.handleModalThirdButtonClick.bind(this)}
            >
              {(modalInfo && modalInfo.thirdButtonCaption) || uawMsgs.CMN_CLOSE}
            </ButtonLabeled>
          </div>
        </Modal>
        {props.children}
      </div>
    )
  }
}
