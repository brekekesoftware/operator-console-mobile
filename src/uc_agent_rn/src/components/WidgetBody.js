import React from 'react'
import {
  View,
  Modal,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Platform,
  Dimensions,
} from 'react-native'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
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
 * WidgetBody - React Native version
 * A component that displays modal dialogs and content
 */
export default class WidgetBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalHeight: new Animated.Value(120),
      modalContentHeight: 120,
    }
  }

  handleModalShow = () => {
    // if (this.okButtonRef) {
    //   this.okButtonRef?.focus()
    // }
  }

  handleModalTableKeyDown = ev => {
    const { props } = this
    const modalInfo = props.uiData.modalInfo

    // TODO: Handle enter/escape in native way if needed
  }

  handleModalCheckBoxClick = () => {
    const { props } = this
    const modalInfo = props.uiData.modalInfo
    if (modalInfo) {
      modalInfo.checkBoxChecked = !modalInfo.checkBoxChecked
      this.forceUpdate()
    }
  }

  handleModalMenuItemClick = index => {
    const { props } = this
    const modalInfo = props.uiData.modalInfo
    if (modalInfo?.selectItemList?.length) {
      modalInfo.selectItemList.forEach((item, i) => {
        item.selected = i === index
      })
      this.forceUpdate()
    }
  }

  handleModalOKButtonClick = () => {
    const { props } = this
    props.uiData.fire('modalOk_onClick', this.contentRef)
  }

  handleModalCancelButtonClick = () => {
    const { props } = this
    props.uiData.fire('modalCancel_onClick', this.contentRef)
  }

  handleModalThirdButtonClick = () => {
    const { props } = this
    props.uiData.fire('modalThirdButton_onClick', this.contentRef)
  }

  onModalContentLayout = event => {
    const { height } = event.nativeEvent.layout
    if (height !== this.state.modalContentHeight) {
      this.setState({ modalContentHeight: height })
      Animated.timing(this.state.modalHeight, {
        toValue: height,
        duration: 200,
        useNativeDriver: false,
      }).start()
    }
  }

  renderModalContent() {
    const { props } = this
    const modalInfo = props.uiData.modalInfo

    if (!modalInfo) return null

    switch (modalInfo.contentClass) {
      case 'ConferenceInviteForm':
        return (
          <ConferenceInviteForm
            ref={ref => (this.contentRef = ref)}
            uiData={props.uiData}
            params={modalInfo.contentParams}
          />
        )
      case 'BroadcastForm':
        return (
          <BroadcastForm
            ref={ref => (this.contentRef = ref)}
            uiData={props.uiData}
            params={modalInfo.contentParams}
          />
        )
      case 'BgColorEditForm':
        return (
          <BgColorEditForm
            ref={ref => (this.contentRef = ref)}
            uiData={props.uiData}
            params={modalInfo.contentParams}
          />
        )
      case 'ConfirmForm':
        return (
          <ConfirmForm
            ref={ref => (this.contentRef = ref)}
            uiData={props.uiData}
            params={modalInfo.contentParams}
          />
        )
      case 'OutgoingWebchatForm':
        return (
          <OutgoingWebchatForm
            ref={ref => (this.contentRef = ref)}
            uiData={props.uiData}
            params={modalInfo.contentParams}
          />
        )
      case 'StatusDisplayForm':
        return (
          <StatusDisplayForm
            ref={ref => (this.contentRef = ref)}
            uiData={props.uiData}
            params={modalInfo.contentParams}
          />
        )
      case 'UserListForm':
        return (
          <UserListForm
            ref={ref => (this.contentRef = ref)}
            uiData={props.uiData}
            params={modalInfo.contentParams}
          />
        )
      default:
        if (modalInfo.contentParams?.content) {
          return (
            <View ref={ref => (this.contentRef = ref)}>
              {modalInfo.contentParams.content}
            </View>
          )
        }
        return <View ref={ref => (this.contentRef = ref)} />
    }
  }

  render() {
    const { props } = this
    const modalInfo = props.uiData.modalInfo
    const content = this.renderModalContent()

    return (
      <View
        style={[styles.widgetBody, props.style]}
        onTouchEnd={() => props.uiData.fire('widgetBody_onClick')}
        // pointerEvents='box-none'
      >
        <Modal
          visible={modalInfo !== null}
          transparent={true}
          onShow={this.handleModalShow}
          animationType='fade'
        >
          <View
            style={[
              styles.modalOverlay,
              props.modalOverlayClassName &&
                styles[props.modalOverlayClassName],
              modalInfo?.overlayClassName && styles[modalInfo.overlayClassName],
            ]}
          >
            <Animated.View
              style={[
                styles.modal,
                modalInfo?.modalClassName && styles[modalInfo.modalClassName],
                { height: this.state.modalHeight },
                modalInfo?.modalStyle,
              ]}
            >
              <View
                style={[
                  styles.modalTable,
                  modalInfo?.tableClassName && styles[modalInfo.tableClassName],
                  modalInfo?.expandInlineImage && styles.expandInlineImage,
                ]}
                onLayout={this.onModalContentLayout}
              >
                <Text style={styles.modalTitle}>{modalInfo?.title}</Text>

                <View style={styles.modalContent}>{content}</View>

                <ScrollView style={styles.modalMessage}>
                  {modalInfo?.message &&
                    (modalInfo.asHTML ? (
                      <Text>{modalInfo.message}</Text> // TODO: Handle HTML content
                    ) : (
                      <Text>{modalInfo.message}</Text>
                    ))}

                  {modalInfo?.checkBoxLabel && (
                    <TouchableOpacity
                      style={styles.modalCheckBox}
                      onPress={this.handleModalCheckBoxClick}
                    >
                      <Text>{modalInfo.checkBoxLabel}</Text>
                    </TouchableOpacity>
                  )}

                  {modalInfo?.selectItemList?.length > 0 && (
                    <DropDownMenu
                      uiData={props.uiData}
                      style={styles.modalMenu}
                      text={string(
                        modalInfo.selectItemList.find(item => item.selected)
                          ?.label,
                      )}
                    >
                      {modalInfo.selectItemList.map((item, i) => (
                        <MenuItem
                          key={i}
                          dropDown={true}
                          onPress={() => this.handleModalMenuItemClick(i)}
                        >
                          <Text>{item.label}</Text>
                        </MenuItem>
                      ))}
                    </DropDownMenu>
                  )}
                </ScrollView>

                <View
                  style={{ flexDirection: 'row', justifyContent: 'flex-start' }}
                >
                  <ButtonLabeled
                    ref={ref => (this.okButtonRef = ref)}
                    style={[
                      styles.modalOKButton,
                      modalInfo?.okClassName && styles[modalInfo.okClassName],
                    ]}
                    vivid={true}
                    title={modalInfo?.okCaption || uawMsgs.CMN_OK}
                    onPress={this.handleModalOKButtonClick}
                  >
                    <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>
                      {modalInfo?.okCaption || uawMsgs.CMN_OK}
                    </Text>
                  </ButtonLabeled>

                  {modalInfo?.cancelable && (
                    <ButtonLabeled
                      style={[
                        styles.modalCancelButton,
                        modalInfo?.cancelClassName &&
                          styles[modalInfo.cancelClassName],
                      ]}
                      title={modalInfo?.cancelCaption || uawMsgs.CMN_CANCEL}
                      onPress={this.handleModalCancelButtonClick}
                    >
                      <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>
                        {modalInfo?.cancelCaption || uawMsgs.CMN_CANCEL}
                      </Text>
                    </ButtonLabeled>
                  )}

                  {modalInfo?.thirdButton && (
                    <ButtonLabeled
                      style={[
                        styles.modalThirdButtonButton,
                        modalInfo?.thirdButtonClassName &&
                          styles[modalInfo.thirdButtonClassName],
                      ]}
                      title={modalInfo?.thirdButtonCaption || uawMsgs.CMN_CLOSE}
                      onPress={this.handleModalThirdButtonClick}
                    >
                      <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>
                        {modalInfo?.thirdButtonCaption || uawMsgs.CMN_CLOSE}
                      </Text>
                    </ButtonLabeled>
                  )}
                </View>
              </View>
            </Animated.View>
          </View>
        </Modal>
        {props.children}
      </View>
    )
  }
}

// Define colors from CSS variables
const colors = {
  white: '#FFFFFF',
  platinum: '#E0E0E0',
  darkGray: '#9E9E9E',
  darkJungleGreen: '#212121',
}

const styles = StyleSheet.create({
  widgetBody: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.white,
    // width: 500,
    height: 'auto',
    // zIndex: 11,
  },
  modalOverlay: {
    position: 'absolute',
    zIndex: 9999,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
  modal: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
    width: '100%',
  },
  modalTable: {
    margin: 'auto',
    // maxHeight: 120,
    borderRadius: 4,
    backgroundColor: colors.white,
    ...Platform.select({
      ios: {
        shadowColor: colors.platinum,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
    margin: 50,
  },
  modalTitle: {
    height: 56,
    padding: 21,
    paddingBottom: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    fontSize: 16,
    fontWeight: '400',
    // lineHeight: 25.6,
    letterSpacing: 0.3,
  },
  modalMessage: {
    maxHeight: Dimensions.get('window').height * 0.4,
    borderBottomWidth: 1,
    borderBottomColor: colors.platinum,
    padding: 24,
    paddingTop: 0,
  },
  modalMessageText: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 20.8,
    letterSpacing: 0.3,
    color: colors.darkGray,
  },
  modalCheckBox: {
    marginTop: 8,
    paddingLeft: 32,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 20.8,
    letterSpacing: 0.3,
    color: colors.darkJungleGreen,
  },
  modalMenu: {
    display: 'flex',
  },
  modalOKButton: {
    minWidth: 80,
    margin: 16,
  },
  modalCancelButton: {
    minWidth: 80,
    margin: 16,
    marginLeft: -8,
  },
  modalThirdButtonButton: {
    minWidth: 80,
    margin: 16,
    marginLeft: -8,
  },
  expandInlineImage: {
    ...Platform.select({
      ios: {
        shadowColor: 'transparent',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
      },
      android: {
        elevation: 0,
      },
    }),
  },
  hidden: {
    display: 'none',
  },
  modalContent: {},
})
